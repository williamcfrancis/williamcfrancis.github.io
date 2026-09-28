// Explicitly opt in with a deployed site URL. These requests cannot generate AI
// output or write quiz statistics: every POST has an invalid, empty payload.
const target = process.argv[2];
if (!target) throw new Error('Usage: npm run smoke:live -- https://your-site.netlify.app');
const base = new URL(target);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password) {
  throw new Error('Provide an HTTP(S) site URL without credentials.');
}

const endpoints = ['translate', 'meaning-score', 'forge', 'compile', 'turing-stats'];
const results = await Promise.allSettled(endpoints.map(async endpoint => {
  const url = new URL(`/.netlify/functions/${endpoint}`, base);
  const preflight = await fetch(url, { method: 'OPTIONS', signal: AbortSignal.timeout(15_000) });
  if (preflight.status !== 204) throw new Error(`${endpoint}: OPTIONS returned ${preflight.status}, expected 204`);
  const invalid = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
    signal: AbortSignal.timeout(15_000),
  });
  if (invalid.status !== 400) throw new Error(`${endpoint}: empty POST returned ${invalid.status}, expected 400`);
  const body = await invalid.json();
  if (body.code !== 'invalid_input') throw new Error(`${endpoint}: missing invalid_input JSON error`);
  return `${endpoint}: preflight and invalid-input checks passed`;
}));

for (const result of results) {
  if (result.status === 'fulfilled') console.log(result.value);
  else { console.error(result.reason.message); process.exitCode = 1; }
}
if (!process.exitCode) console.log('All five deployed endpoints passed; no provider calls or statistics writes were made.');
