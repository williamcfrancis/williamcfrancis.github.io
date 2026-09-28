import assert from 'node:assert/strict';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { zipFunctions } from '@netlify/zip-it-and-ship-it';
import { repoRoot } from './games.mjs';
import { validateBundleFunctions } from './validate-functions.mjs';

const output = path.resolve(repoRoot, '.build/functions');
if (path.dirname(output) !== path.join(repoRoot, '.build')) throw new Error('Invalid function output directory');
// Only replace this generated directory, never function source or deployment state.
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const bundles = await zipFunctions(path.join(repoRoot, 'netlify/functions'), output, {
  archiveFormat: 'none',
  basePath: repoRoot,
  config: { '*': { nodeBundler: 'esbuild', nodeVersion: '24' } },
});
writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(bundles, null, 2));
const errors = validateBundleFunctions(bundles);
assert.equal(errors.length, 0, errors.join('\n'));

const endpoints = ['translate', 'meaning-score', 'forge', 'compile', 'turing-stats'];
const handlers = new Map();
let forbiddenRequests = 0;
const originalFetch = globalThis.fetch;
// Invalid input must fail before any provider or Blobs request, even if the
// developer happens to have real credentials configured in their environment.
globalThis.fetch = async () => {
  forbiddenRequests++;
  throw new Error('Outbound requests are disabled during function build checks');
};

let checks = 0;
try {
  for (const bundle of bundles) {
    const relativeMain = path.relative(repoRoot, bundle.mainFile).replace(/\.[cm]?[jt]sx?$/, '.mjs');
    const entry = path.resolve(bundle.path, relativeMain);
    assert.ok(entry.startsWith(path.resolve(bundle.path) + path.sep) && existsSync(entry), `Missing packaged entry for ${bundle.name}`);
    const module = await import(pathToFileURL(entry).href);
    assert.equal(typeof module.default, 'function', `${bundle.name} must export a native handler`);
    handlers.set(bundle.name, module.default);
  }

  for (const endpoint of endpoints) {
    const handler = handlers.get(endpoint === 'turing-stats' ? 'turing-stats' : 'ai');
    for (const suffix of ['', '/']) {
      const url = `https://build-check.invalid/.netlify/functions/${endpoint}${suffix}`;
      const cases = [
        { method: 'OPTIONS', status: 204 },
        { method: 'PUT', status: 405, code: 'method_not_allowed' },
        { method: 'POST', type: 'text/plain', body: '{}', status: 415, code: 'unsupported_media_type' },
        { method: 'POST', type: 'application/json', body: '{', status: 400, code: 'invalid_json' },
        { method: 'POST', type: 'application/json', body: '{}', status: 400, code: 'invalid_input' },
      ];
      for (const check of cases) {
        const request = new Request(url, {
          method: check.method,
          ...(check.body !== undefined ? { body: check.body, headers: { 'Content-Type': check.type } } : {}),
        });
        let timer;
        try {
          await Promise.race([
            (async () => {
              const response = await handler(request, {});
              assert.equal(response.status, check.status, `${endpoint}${suffix} ${check.method}`);
              assert.equal(response.headers.get('access-control-allow-origin'), '*');
              assert.equal(response.headers.get('cache-control'), 'no-store');
              if (check.code) assert.equal((await response.json()).code, check.code);
            })(),
            new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`Packaged ${endpoint} did not reject invalid input promptly`)), 2000); }),
          ]);
          checks++;
        } finally { clearTimeout(timer); }
      }
    }
  }
  assert.equal(forbiddenRequests, 0, 'Invalid requests must never reach providers or storage');
} finally { globalThis.fetch = originalFetch; }

console.log(`Packaged ${bundles.length} Netlify functions; route/rate-limit metadata and ${checks} offline request checks passed.`);
