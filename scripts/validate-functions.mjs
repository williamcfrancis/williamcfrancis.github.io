import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import toml from 'toml';
import { repoRoot } from './games.mjs';

const endpoints = ['translate', 'meaning-score', 'forge', 'compile', 'turing-stats'];
const nativePath = name => `/.netlify/functions/${name}`;

function validPolicy(policy, limit) {
  return policy?.windowLimit === limit && policy?.windowSize === 60
    && Array.isArray(policy.aggregateBy)
    && [...policy.aggregateBy].sort().join(',') === 'domain,ip';
}

export function validateRedirectPolicies(config) {
  const rules = (config.redirects ?? []).filter(rule => rule.rate_limit);
  if (rules.length !== 1) return ['Netlify TOML must contain exactly one shared API rate-limit rule.'];
  const [rule] = rules;
  const policy = rule.rate_limit;
  const errors = [];
  if (rule.from !== '/.netlify/functions/*' || rule.to !== '/.netlify/functions/:splat'
    || rule.status !== 200 || rule.force === true || rule.conditions) {
    errors.push('The shared API rule must be an unconditional, non-forced native-function namespace self-rewrite.');
  }
  if (!validPolicy({ windowLimit: policy.window_limit, windowSize: policy.window_size, aggregateBy: policy.aggregate_by }, 120)) {
    errors.push('The shared API rule must allow 120 requests per 60 seconds, aggregated by IP and domain.');
  }
  return errors;
}

function readRedirectPolicies() {
  try { return validateRedirectPolicies(toml.parse(readFileSync(path.join(repoRoot, 'netlify.toml'), 'utf8'))); }
  catch (error) { return [`Invalid Netlify TOML: ${error.message}`]; }
}

function validatePolicies(functions) {
  const errors = readRedirectPolicies();
  if (functions.length !== endpoints.length || new Set(functions.map(fn => fn.name)).size !== endpoints.length) {
    errors.push('Public APIs must deploy exactly five native function entry points.');
  }
  for (const name of endpoints) {
    if (!functions.some(fn => fn.name === name)) errors.push(`Missing native function: ${name}`);
  }
  for (const fn of functions) {
    if (!endpoints.includes(fn.name)) errors.push(`Unexpected public function: ${fn.name}`);
    if (fn.routes.length !== 1 || fn.routes[0] !== nativePath(fn.name)) {
      errors.push(`${fn.name}: use exactly the literal route matching the native function filename`);
    }
    if (fn.name === 'turing-stats') {
      if (!validPolicy(fn.rateLimit, 60)) errors.push('turing-stats: missing or invalid 60-request native rate limit');
    } else if (fn.rateLimit) {
      errors.push(`${fn.name}: use the shared TOML API rate limit, not an additional function traffic rule`);
    }
  }
  return errors;
}

export async function validateSourceFunctions() {
  const directory = path.join(repoRoot, 'netlify/functions');
  const functions = [];
  const errors = [];
  for (const file of readdirSync(directory).filter(file => /\.(?:m?js)$/.test(file))) {
    const module = await import(pathToFileURL(path.join(directory, file)).href);
    if (typeof module.default !== 'function') errors.push(`${file}: missing native Request/Response handler`);
    functions.push({
      name: file.replace(/\.(?:m?js)$/, ''),
      rateLimit: module.config?.rateLimit,
      routes: [module.config?.path].flat().filter(Boolean),
    });
  }
  return [...errors, ...validatePolicies(functions)];
}

/** Validate native bundle metadata together with the checked-in redirect policy. */
export function validateBundleFunctions(bundle) {
  if (!Array.isArray(bundle)) return ['Expected the JSON array returned by zipFunctions.'];
  const errors = [];
  const functions = bundle.map(fn => {
    if (fn.runtimeAPIVersion !== 2 || fn.outputModuleFormat !== 'esm') {
      errors.push(`${fn.name}: expected the native ESM Netlify runtime`);
    }
    const action = fn.trafficRules?.action;
    const policy = action?.config?.rateLimitConfig;
    if (fn.name === 'turing-stats') {
      if (action?.type !== 'rate_limit' || policy?.algorithm !== 'sliding_window') {
        errors.push('turing-stats: Netlify did not emit the sliding-window traffic rule');
      }
    } else if (fn.trafficRules) errors.push(`${fn.name}: unexpected additional native traffic rule`);
    return {
      name: fn.name,
      rateLimit: policy && { ...policy, aggregateBy: action.config.aggregate?.keys?.map(key => key.type) },
      routes: (fn.routes || []).map(route => route.literal),
    };
  });
  const stats = bundle.find(fn => fn.name === 'turing-stats');
  if (!stats?.inputs?.some(file => file.replaceAll('\\', '/').endsWith('/games/turing_shuffle/src/passages.json'))) {
    errors.push('Quiz passage data is missing from the native function bundle.');
  }
  return [...errors, ...validatePolicies(functions)];
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length && (args[0] !== '--bundle-manifest' || args.length !== 2)) {
    throw new Error('Usage: node scripts/validate-functions.mjs [--bundle-manifest <zipFunctions-result.json>]');
  }
  const errors = args.length
    ? validateBundleFunctions(JSON.parse(readFileSync(args[1], 'utf8')))
    : await validateSourceFunctions();
  if (errors.length) {
    console.error(errors.map(error => `- ${error}`).join('\n'));
    process.exitCode = 1;
  } else console.log(`Validated five native API routes and two combined rate-limit policies${args.length ? ' in native bundle metadata and Netlify TOML' : ''}.`);
}
