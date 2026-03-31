const { getStore } = require('@netlify/blobs');

function headers() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: headers(), body: '' };
  }

  const store = getStore('turing-shuffle-stats');

  if (event.httpMethod === 'GET') {
    try {
      const globalRaw = await store.get('_global', { type: 'json' });
      const global = globalRaw || { totalGames: 0, totalCorrect: 0, averageScore: 0 };

      const passagesRaw = await store.get('_passages', { type: 'json' });
      const passages = passagesRaw || {};

      return {
        statusCode: 200,
        headers: headers(),
        body: JSON.stringify({ global, passages }),
      };
    } catch (e) {
      console.error('[turing-stats] GET error:', e.message);
      return {
        statusCode: 200,
        headers: headers(),
        body: JSON.stringify({
          global: { totalGames: 0, totalCorrect: 0, averageScore: 0 },
          passages: {},
        }),
      };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const answers = body.answers;

      if (!Array.isArray(answers) || answers.length === 0) {
        return {
          statusCode: 400,
          headers: headers(),
          body: JSON.stringify({ error: 'Missing answers array' }),
        };
      }

      const globalRaw = await store.get('_global', { type: 'json' });
      const global = globalRaw || { totalGames: 0, totalCorrect: 0, averageScore: 0 };

      const passagesRaw = await store.get('_passages', { type: 'json' });
      const passages = passagesRaw || {};

      const correctCount = answers.filter((a) => a.correct).length;

      global.totalGames += 1;
      global.totalCorrect += correctCount;
      global.averageScore =
        global.totalGames > 0
          ? global.totalCorrect / global.totalGames
          : 0;

      for (const answer of answers) {
        const pid = answer.passageId;
        if (!pid) continue;

        if (!passages[pid]) {
          passages[pid] = { humanVotes: 0, aiVotes: 0 };
        }

        if (answer.userGuess === 'human') {
          passages[pid].humanVotes += 1;
        } else {
          passages[pid].aiVotes += 1;
        }
      }

      await store.setJSON('_global', global);
      await store.setJSON('_passages', passages);

      return {
        statusCode: 200,
        headers: headers(),
        body: JSON.stringify({ success: true }),
      };
    } catch (e) {
      console.error('[turing-stats] POST error:', e.message);
      return {
        statusCode: 500,
        headers: headers(),
        body: JSON.stringify({ error: 'Internal error' }),
      };
    }
  }

  return {
    statusCode: 405,
    headers: headers(),
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
