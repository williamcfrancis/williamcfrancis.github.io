import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBundleFunctions, validateRedirectPolicies, validateSourceFunctions } from '../scripts/validate-functions.mjs';

const policy = () => ({
  from: '/.netlify/functions/*', to: '/.netlify/functions/:splat', status: 200,
  rate_limit: { window_limit: 120, window_size: 60, aggregate_by: ['ip', 'domain'] },
});
const bundles = () => ['translate', 'meaning-score', 'forge', 'compile', 'turing-stats'].map(name => ({
  name, runtimeAPIVersion: 2, outputModuleFormat: 'esm',
  routes: [{ literal: `/.netlify/functions/${name}` }],
  ...(name === 'turing-stats' ? {
    inputs: ['/repo/games/turing_shuffle/src/passages.json'],
    trafficRules: { action: { type: 'rate_limit', config: {
      rateLimitConfig: { windowLimit: 60, windowSize: 60, algorithm: 'sliding_window' },
      aggregate: { keys: [{ type: 'ip' }, { type: 'domain' }] },
    } } },
  } : {}),
}));

test('source functions expose each API at its exact native path', async () => {
  assert.deepEqual(await validateSourceFunctions(), []);
});

test('one namespace rule protects every native endpoint without changing routing', () => {
  assert.deepEqual(validateRedirectPolicies({ redirects: [policy()] }), []);
  for (const change of [
    { from: '/api/*' }, { to: '/.netlify/functions/ai' }, { status: 301 },
    { force: true }, { conditions: { Role: ['admin'] } },
    { rate_limit: { window_limit: 120, window_size: 60, aggregate_by: ['domain'] } },
  ]) assert.ok(validateRedirectPolicies({ redirects: [{ ...policy(), ...change }] }).length, JSON.stringify(change));
  assert.ok(validateRedirectPolicies({ redirects: [] }).length);
  assert.ok(validateRedirectPolicies({ redirects: [policy(), policy()] }).length);
});

test('native metadata has five literal routes and just the stats traffic rule', () => {
  assert.deepEqual(validateBundleFunctions(bundles()), []);
  const alias = bundles();
  alias[0].routes = [{ expression: '^/\\.netlify/functions/(translate|forge)$' }];
  assert.ok(validateBundleFunctions(alias).some(error => error.includes('literal route')));
  const renamed = bundles();
  renamed[0].name = 'ai';
  assert.ok(validateBundleFunctions(renamed).some(error => error.includes('Missing native function')));
  const extraRule = bundles();
  extraRule[0].trafficRules = extraRule[4].trafficRules;
  assert.ok(validateBundleFunctions(extraRule).some(error => error.includes('additional native traffic rule')));
  const missingRule = bundles();
  delete missingRule[4].trafficRules;
  assert.ok(validateBundleFunctions(missingRule).some(error => error.includes('sliding-window')));
});
