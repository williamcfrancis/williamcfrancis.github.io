import translate from '../handlers/translate.js';
import score from '../handlers/meaning-score.js';
import forge from '../handlers/forge.js';
import compile from '../handlers/compile.js';
import { json } from '../lib/http.js';

const handlers = new Map([
  ['/.netlify/functions/translate', translate],
  ['/.netlify/functions/meaning-score', score],
  ['/.netlify/functions/forge', forge],
  ['/.netlify/functions/compile', compile],
]);

export default async function handler(request, context) {
  const run = handlers.get(new URL(request.url).pathname.replace(/\/$/, ''));
  return run ? run(request, context) : json({ error: 'Not found', code: 'not_found' }, 404);
}

// One shared rule, plus the stats rule, fits Netlify's two-rule Free plan limit.
// Keep the original URLs so existing game builds continue to work.
export const config = {
  path: '/.netlify/functions/:endpoint(translate|meaning-score|forge|compile)',
  rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
