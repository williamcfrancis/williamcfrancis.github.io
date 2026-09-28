import { createHandler } from '../../../../netlify/lib/forge.js';

export default createHandler();
export const config = {
  path: '/.netlify/functions/forge',
  rateLimit: { windowLimit: 12, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
