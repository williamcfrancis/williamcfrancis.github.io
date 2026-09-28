import { getStore, getDeployStore } from '@netlify/blobs';
import passagePool from '../../games/turing_shuffle/src/passages.json' with { type: 'json' };
import { apiHandler, ApiError, json, readJson } from '../lib/http.js';
import { readStats, saveSubmission } from '../lib/turing-stats-store.js';
export { readStats } from '../lib/turing-stats-store.js';

const PASSAGES = new Map(passagePool.map(p => [p.id, p.source]));
const ROUND_LENGTH = 10;

export function validateSubmission(body) {
  if (typeof body.submissionId !== 'string'
    || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId)) {
    throw new ApiError(400, 'invalid_input', 'A UUID submissionId is required');
  }
  if (!Array.isArray(body.answers) || body.answers.length !== ROUND_LENGTH) {
    throw new ApiError(400, 'invalid_input', `Exactly ${ROUND_LENGTH} answers are required`);
  }
  const seen = new Set();
  const answers = body.answers.map(answer => {
    if (!answer || !PASSAGES.has(answer.passageId) || seen.has(answer.passageId)
      || !['human', 'ai'].includes(answer.userGuess)) {
      throw new ApiError(400, 'invalid_input', 'Answers must have unique known passage IDs and human or ai guesses');
    }
    seen.add(answer.passageId);
    return { passageId: answer.passageId, userGuess: answer.userGuess };
  }).sort((a, b) => a.passageId.localeCompare(b.passageId));
  return {
    submissionId: body.submissionId.toLowerCase(),
    record: { schemaVersion: 1, answers, score: answers.filter(a => PASSAGES.get(a.passageId) === a.userGuess).length },
  };
}

export function selectStatsStore(context, factories = { getStore, getDeployStore }) {
  // Trust Netlify's native context, not client headers or a guessed hostname.
  // Preview, branch, unpublished, and local deployments must never migrate live data.
  if (context?.deploy?.context === 'production' && context.deploy.published === true) {
    return factories.getStore({ name: 'turing-shuffle-stats', consistency: 'strong' });
  }
  return factories.getDeployStore({
    name: 'turing-shuffle-stats', consistency: 'strong',
    ...(context?.deploy?.id ? { deployID: context.deploy.id } : {}),
  });
}

export function createHandler(storeFactory = selectStatsStore) {
  return apiHandler(async (request, context) => {
    if (request.method === 'GET') {
      const stats = await readStats(storeFactory(context));
      return json(stats, 200, {
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      });
    }
    const { submissionId, record } = validateSubmission(await readJson(request));
    return json(await saveSubmission(storeFactory(context), submissionId, record));
  }, ['GET', 'POST']);
}

export default createHandler();
export const config = {
  path: '/.netlify/functions/turing-stats',
  rateLimit: { windowLimit: 60, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};
