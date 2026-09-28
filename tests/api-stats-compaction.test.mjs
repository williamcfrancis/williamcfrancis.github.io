import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mockStore } from './helpers/blob-store.mjs';
import { validateSubmission, selectStatsStore } from '../netlify/functions/turing-stats.js';
import { readStats, saveSubmission, HEAD_PREFIX, NODE_PREFIX, LEGACY_RECORD_PREFIX, RECORD_PREFIX, MIGRATION_MARKER, MIGRATION_DRAIN_MS } from '../netlify/lib/turing-stats-store.js';
import pool from '../games/turing_shuffle/src/passages.json' with { type: 'json' };

function game(id = randomUUID(), correct = true) {
  return validateSubmission({ submissionId: id, answers: pool.slice(0, 10).map(p => ({
    passageId: p.id, userGuess: correct ? p.source : p.source === 'human' ? 'ai' : 'human',
  })) });
}

async function finishMigration(store, options = {}) {
  for (let i = 0; i < 250; i += 1) {
    try { return await readStats(store, options); }
    catch (error) { if (error.code !== 'stats_rebuilding') throw error; }
  }
  assert.fail('Migration did not make bounded forward progress');
}

test('more than 5,000 old games migrate resumably and subsequent GET cost stays constant', async () => {
  const seed = {
    _global: { totalGames: 2, totalCorrect: 7, averageScore: 3.5 },
    _passages: { [pool[0].id]: { humanVotes: 2, aiVotes: 1 } },
  };
  const games = Array.from({ length: 6200 }, () => game());
  for (const g of games) seed[LEGACY_RECORD_PREFIX + g.submissionId] = g.record;
  const store = mockStore(seed);
  const options = { migrationRecords: 128, migrationPartitions: 16, partitionSize: 64 };
  await assert.rejects(readStats(store, options), error => error.code === 'stats_rebuilding');
  assert.ok([...store.entries.keys()].some(key => key.startsWith(HEAD_PREFIX)));
  const stats = await finishMigration(store, options);
  assert.equal(stats.global.totalGames, 6202);
  assert.equal(stats.global.totalCorrect, 62007);
  assert.equal(stats.global.averageScore, 62007 / 6202);
  assert.deepEqual(store.entries.get('_global'), seed._global);
  assert.deepEqual(store.entries.get('_passages'), seed._passages);
  store.resetCalls();
  assert.deepEqual(await readStats(store), stats);
  assert.deepEqual(store.calls, { get: 2, getWithMetadata: 16, setJSON: 0, list: 0 });

  // Replay migrated records while new records arrive, including identical simultaneous retries.
  const additional = Array.from({ length: 100 }, () => game());
  for (let offset = 0; offset < additional.length; offset += 20) {
    const batch = additional.slice(offset, offset + 20);
    await Promise.all([...batch, ...batch, games[offset]].map(g => saveSubmission(store, g.submissionId, g.record)));
  }
  store.resetCalls();
  const updated = await readStats(store);
  assert.equal(updated.global.totalGames, 6302);
  assert.equal(updated.global.totalCorrect, 63007);
  assert.deepEqual(store.calls, { get: 2, getWithMetadata: 16, setJSON: 0, list: 0 });
});

test('new writes also cross the old lifetime limit without a scan or record-count cliff', async () => {
  const store = mockStore();
  await readStats(store);
  for (let start = 0; start < 5104; start += 16) {
    const batch = Array.from({ length: 16 }, () => game());
    await Promise.all(batch.map(g => saveSubmission(store, g.submissionId, g.record)));
  }
  store.resetCalls();
  const result = await readStats(store);
  assert.equal(result.global.totalGames, 5104);
  assert.equal(result.global.totalCorrect, 51040);
  assert.deepEqual(store.calls, { get: 2, getWithMetadata: 16, setJSON: 0, list: 0 });
});

test('same-shard writers and a legacy-ID replay racing migration never lose or duplicate games', async () => {
  const previous = Array.from({ length: 90 }, () => game('a' + randomUUID().slice(1)));
  const seed = Object.fromEntries(previous.map(g => [LEGACY_RECORD_PREFIX + g.submissionId, g.record]));
  const store = mockStore(seed);
  const fresh = Array.from({ length: 48 }, () => game('a' + randomUUID().slice(1)));
  const operations = [...fresh, ...fresh, ...previous].map(g => saveSubmission(store, g.submissionId, g.record));
  operations.push(finishMigration(store, { migrationRecords: 20, partitionSize: 20, migrationPartitions: 20 }));
  await Promise.all(operations);
  const result = await readStats(store);
  assert.equal(result.global.totalGames, 138);
  assert.equal(result.global.totalCorrect, 1380);
  const conflict = game(previous[0].submissionId, false);
  await assert.rejects(saveSubmission(store, conflict.submissionId, conflict.record), error => error.status === 409);
  assert.equal((await readStats(store)).global.totalGames, 138);
});

for (const failure of ['record', 'page', 'head-before', 'head-after']) {
  test(`a failure at ${failure} is recovered by retrying the original UUID`, async () => {
    let injected = false;
    const store = mockStore({}, {
      beforeSet(key) {
        if (!injected && ((failure === 'record' && key.startsWith(RECORD_PREFIX))
          || (failure === 'page' && key.startsWith(NODE_PREFIX))
          || (failure === 'head-before' && key.startsWith(HEAD_PREFIX)))) {
          injected = true; throw new Error('Simulated process/storage failure');
        }
      },
      afterSet(key) {
        if (!injected && failure === 'head-after' && key.startsWith(HEAD_PREFIX)) {
          injected = true; throw new Error('Write committed but acknowledgment was lost');
        }
      },
    });
    const g = game();
    await assert.rejects(saveSubmission(store, g.submissionId, g.record));
    assert.equal(injected, true);
    await saveSubmission(store, g.submissionId, g.record);
    await saveSubmission(store, g.submissionId, g.record);
    const stats = await readStats(store);
    assert.equal(stats.global.totalGames, 1);
    assert.equal(stats.global.totalCorrect, 10);
  });
}

test('migration resumes after durable progress and an ambiguous head-write failure', async () => {
  const games = Array.from({ length: 280 }, () => game());
  let commits = 0;
  let injected = false;
  const store = mockStore(Object.fromEntries(games.map(g => [LEGACY_RECORD_PREFIX + g.submissionId, g.record])), {
    afterSet(key) {
      if (key.startsWith(HEAD_PREFIX) && ++commits === 5 && !injected) {
        injected = true; throw new Error('Acknowledgment lost');
      }
    },
  });
  await assert.rejects(readStats(store), /Acknowledgment lost/);
  assert.equal(injected, true);
  const result = await finishMigration(store);
  assert.equal(result.global.totalGames, 280);
  assert.equal(result.global.totalCorrect, 2800);
});

test('a deadline after some partitions preserves progress without exposing partial totals', async () => {
  const games = Array.from({ length: 100 }, () => game());
  let fail = true;
  let visits = 0;
  const store = mockStore(Object.fromEntries(games.map(g => [LEGACY_RECORD_PREFIX + g.submissionId, g.record])), {
    beforeList() { if (fail && ++visits === 4) return new Promise(() => {}); },
  });
  await assert.rejects(readStats(store, { timeoutMs: 30 }), error => error.status === 504);
  assert.ok([...store.entries.keys()].some(key => key.startsWith(HEAD_PREFIX)));
  fail = false;
  const result = await finishMigration(store);
  assert.equal(result.global.totalGames, 100);
});

test('a corrupt legacy record prevents its partition from advancing or publishing false totals', async () => {
  const g = game();
  const store = mockStore({ [LEGACY_RECORD_PREFIX + g.submissionId]: { ...g.record, score: 50 } });
  await assert.rejects(readStats(store), error => error.code === 'stats_storage_invalid');
  store.entries.set(LEGACY_RECORD_PREFIX + g.submissionId, g.record);
  const stats = await finishMigration(store);
  assert.equal(stats.global.totalGames, 1);
});

test('invalid counters and altered immutable index pages fail explicitly', async () => {
  const store = mockStore();
  const g = game();
  await saveSubmission(store, g.submissionId, g.record);
  await readStats(store);
  const headKey = HEAD_PREFIX + g.submissionId[0];
  const original = structuredClone(store.entries.get(headKey));
  store.entries.get(headKey).totals.totalGames += 1;
  await assert.rejects(readStats(store), error => error.code === 'stats_storage_invalid');
  store.entries.set(headKey, original);
  const pageKey = NODE_PREFIX + original.root;
  store.entries.get(pageKey).entries[g.submissionId] = '0'.repeat(64);
  await assert.rejects(saveSubmission(store, g.submissionId, g.record), error => error.code === 'stats_storage_invalid');
});

test('malformed legacy aggregates are never silently reported as an empty community', async () => {
  const store = mockStore();
  assert.equal((await readStats(store)).global.totalGames, 0);
  for (const value of [false, 0, '', [], {}, { totalGames: 3 }, { totalGames: null, totalCorrect: 0 }]) {
    store.entries.set('_global', value);
    await assert.rejects(readStats(store), error => error.code === 'stats_storage_invalid');
  }
  store.entries.delete('_global');
  for (const value of [false, 0, '', []]) {
    store.entries.set('_passages', value);
    await assert.rejects(readStats(store), error => error.code === 'stats_storage_invalid');
  }
});

test('rollout waits for the retired writer to drain before freezing legacy partitions', async () => {
  const store = mockStore();
  store.entries.delete(MIGRATION_MARKER);
  let clock = 1_000_000;
  await assert.rejects(readStats(store, { now: () => clock }), error => error.code === 'stats_rebuilding');
  assert.equal([...store.entries.keys()].filter(key => key.startsWith(HEAD_PREFIX)).length, 0);
  const oldInflight = game();
  store.entries.set(LEGACY_RECORD_PREFIX + oldInflight.submissionId, oldInflight.record);
  clock += MIGRATION_DRAIN_MS;
  const result = await readStats(store, { now: () => clock });
  assert.equal(result.global.totalGames, 1);
});

test('prototype-sensitive passage IDs in legacy aggregates are rejected', async () => {
  const store = mockStore({ _passages: JSON.parse('{"__proto__":{"humanVotes":0,"aiVotes":0}}') });
  await assert.rejects(readStats(store), error => error.code === 'stats_storage_invalid');
  assert.equal(Object.prototype.humanVotes, undefined);
});

test('ordinary Object.prototype property names remain own vote entries without mutating prototypes', async () => {
  const g = game();
  g.record.answers[0].passageId = 'toString';
  g.record.answers[1].passageId = 'valueOf';
  const store = mockStore({ [LEGACY_RECORD_PREFIX + g.submissionId]: g.record });
  const stats = await readStats(store);
  assert.equal(stats.global.totalGames, 1);
  for (const id of ['toString', 'valueOf']) {
    assert.equal(Object.hasOwn(stats.passages, id), true);
    assert.equal(stats.passages[id].humanVotes + stats.passages[id].aiVotes, 1);
    assert.equal(Object.prototype[id].humanVotes, undefined);
    assert.equal(Object.prototype[id].aiVotes, undefined);
  }
  assert.deepEqual(await readStats(store), stats);
});

test('only the current published production deploy selects the legacy production store', () => {
  const calls = [];
  const factories = {
    getStore: options => { calls.push({ type: 'site', options }); return 'production'; },
    getDeployStore: options => { calls.push({ type: 'deploy', options }); return 'isolated'; },
  };
  assert.equal(selectStatsStore({ deploy: { context: 'production', published: true, id: 'prod-id' } }, factories), 'production');
  assert.deepEqual(calls[0], { type: 'site', options: { name: 'turing-shuffle-stats', consistency: 'strong' } });
  for (const context of ['deploy-preview', 'branch-deploy', 'dev', 'production']) {
    assert.equal(selectStatsStore({ deploy: { context, published: false, id: context } }, factories), 'isolated');
    assert.deepEqual(calls.at(-1), { type: 'deploy', options: { name: 'turing-shuffle-stats', consistency: 'strong', deployID: context } });
  }
  assert.equal(selectStatsStore({ deploy: { context: 'deploy-preview', published: true, id: 'preview' } }, factories), 'isolated');
  assert.equal(selectStatsStore(undefined, factories), 'isolated');
  assert.equal(calls.filter(call => call.type === 'site').length, 1);
});

test('page splits handle UUIDs with a long common prefix with bounded pages', async () => {
  const store = mockStore();
  for (let n = 0; n < 80; n += 1) {
    const g = game(`aaaaaaaa-aaaa-4aaa-8aaa-${n.toString(16).padStart(12, '0')}`);
    await saveSubmission(store, g.submissionId, g.record);
  }
  const result = await readStats(store);
  assert.equal(result.global.totalGames, 80);
  for (const [key, page] of store.entries) {
    if (key.startsWith(NODE_PREFIX)) {
      assert.ok(page.kind === 'leaf' ? Object.keys(page.entries).length <= 32 : Object.keys(page.children).length <= 16);
    }
  }
});
