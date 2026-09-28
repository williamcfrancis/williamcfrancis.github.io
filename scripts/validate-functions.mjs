import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { repoRoot } from './games.mjs';

const endpoints = ['translate', 'meaning-score', 'forge', 'compile', 'turing-stats']
  .map(name => `/.netlify/functions/${name}`);

function validatePolicies(functions) {
  const errors = [];
  const protectedRoutes = functions.filter(fn => fn.rateLimit).flatMap(fn => fn.routes);
  if (protectedRoutes.length !== 2) errors.push('Public APIs must emit exactly two rate-limited routes to fit every Netlify plan.');
  for (const fn of functions) {
    if (!fn.rateLimit) { errors.push(`${fn.name}: missing platform rate limit`); continue; }
    if (fn.routes.length !== 1) errors.push(`${fn.name}: use a single route pattern, not separate aliases with separate rules`);
    const { windowLimit, windowSize, aggregateBy } = fn.rateLimit;
    if (!Number.isInteger(windowLimit) || windowLimit < 1 || windowLimit > 120
      || windowSize !== 60 || [...aggregateBy ?? []].sort().join(',') !== 'domain,ip') {
      errors.push(`${fn.name}: invalid per-IP, per-domain rate limit`);
    }
  }
  for (const endpoint of endpoints) {
    const matching = functions.filter(fn => fn.routes.some(route => route.test(endpoint)));
    if (matching.length !== 1) errors.push(`${endpoint}: expected one protected handler, found ${matching.length}`);
  }
  for (const endpoint of ['llm', 'ai', 'unknown']) {
    if (functions.some(fn => fn.routes.some(route => route.test(`/.netlify/functions/${endpoint}`)))) {
      errors.push(`Unexpected public helper route: ${endpoint}`);
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
    const paths = [module.config?.path].flat().filter(Boolean);
    functions.push({
      name: file,
      rateLimit: module.config?.rateLimit,
      routes: paths.map(route => {
        const pattern = new URLPattern({ pathname: route });
        return { test: pathname => pattern.test({ pathname }) };
      }),
    });
  }
  return [...errors, ...validatePolicies(functions)];
}

/** Validate the JSON result returned by Netlify's zipFunctions bundler. */
export function validateBundleFunctions(bundle) {
  if (!Array.isArray(bundle)) return ['Expected the JSON array returned by zipFunctions.'];
  const errors = [];
  const functions = bundle.map(fn => {
    if (fn.runtimeAPIVersion !== 2 || fn.outputModuleFormat !== 'esm') {
      errors.push(`${fn.name}: expected the native ESM Netlify runtime`);
    }
    const action = fn.trafficRules?.action;
    const policy = action?.config?.rateLimitConfig;
    if (action?.type !== 'rate_limit' || policy?.algorithm !== 'sliding_window') {
      errors.push(`${fn.name}: Netlify did not emit the sliding-window traffic rule`);
    }
    return {
      name: fn.name,
      rateLimit: policy && {
        ...policy,
        aggregateBy: action.config.aggregate?.keys?.map(key => key.type),
      },
      routes: (fn.routes || []).map(route => ({
        test: pathname => route.literal ? route.literal === pathname : new RegExp(route.expression).test(pathname),
      })),
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
  } else console.log(`Validated two protected API routes and all five endpoints${args.length ? ' in native bundle metadata' : ''}.`);
}
