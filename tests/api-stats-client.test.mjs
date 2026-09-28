import test from 'node:test';
import assert from 'node:assert/strict';
import { submitResults, communityStatsText } from '../games/turing_shuffle/src/api.ts';

const answers = [{ passageId: 'a', guess: 'human', correct: true, confidence: 90, timeTaken: 500 }];
const id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

test('quiz submission retries transient/network failures with identical serialized UUID and answers', async () => {
  const calls = [];
  await submitResults(answers, id, {
    fetchImpl: async (_url, options) => {
      calls.push(options.body);
      if (calls.length === 1) throw new TypeError('Network unavailable after send');
      if (calls.length === 2) return new Response('', { status: 503 });
      return Response.json({ success: true, duplicate: true });
    },
    sleep: async () => {},
  });
  assert.equal(calls.length, 3);
  assert.equal(new Set(calls).size, 1);
  assert.deepEqual(JSON.parse(calls[0]), { submissionId: id, answers: [{ passageId: 'a', userGuess: 'human' }] });
});

test('quiz submission never retries permanent 4xx failures', async () => {
  for (const status of [400, 401, 403, 404, 409, 413, 415]) {
    let calls = 0;
    await assert.rejects(submitResults(answers, id, {
      fetchImpl: async () => { calls += 1; return new Response('', { status }); },
      sleep: async () => assert.fail('Permanent failure must not delay/retry'),
    }), new RegExp(String(status)));
    assert.equal(calls, 1);
  }
});

test('429 Retry-After is honored within budget and prevents premature retry beyond budget', async () => {
  let calls = 0;
  let clock = 10000;
  const delays = [];
  await submitResults(answers, id, {
    fetchImpl: async () => ++calls === 1 ? new Response('', { status: 429, headers: { 'Retry-After': '2' } }) : Response.json({ success: true }),
    now: () => clock, sleep: async ms => { delays.push(ms); clock += ms; },
  });
  assert.deepEqual(delays, [2000]);
  calls = 0;
  await assert.rejects(submitResults(answers, id, {
    fetchImpl: async () => { calls += 1; return new Response('', { status: 429, headers: { 'Retry-After': '30' } }); },
    sleep: async () => assert.fail('Do not wait longer than the total budget'),
  }), /429/);
  assert.equal(calls, 1);
});

test('quiz retries stop after three responses and a stalled fetch respects the total deadline', async () => {
  let calls = 0;
  await assert.rejects(submitResults(answers, id, {
    fetchImpl: async () => { calls += 1; return new Response('', { status: 502 }); }, sleep: async () => {},
  }), /502/);
  assert.equal(calls, 3);
  let signal;
  const started = Date.now();
  await assert.rejects(submitResults(answers, id, {
    timeoutMs: 25,
    fetchImpl: (_url, options) => { signal = options.signal; return new Promise(() => {}); },
  }), /timed out/);
  assert.equal(signal.aborted, true);
  assert.ok(Date.now() - started < 1000);
});

test('unavailable community data is distinct from confirmed zero games', () => {
  assert.equal(communityStatsText(null), 'Community statistics are temporarily unavailable.');
  assert.equal(communityStatsText({ global: { totalGames: 0, totalCorrect: 0, averageScore: 0 }, passages: {} }), 'Be the first to play.');
  assert.equal(communityStatsText({ global: { totalGames: 2, totalCorrect: 13, averageScore: 6.5 }, passages: {} }), 'Average score across all visitors: 6.5 / 10');
});
