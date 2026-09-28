import { createHash } from 'node:crypto';
import { ApiError, withDeadline } from './http.js';

export const SHARDS = '0123456789abcdef';
export const HEAD_PREFIX = 'stats/v2/heads/';
export const NODE_PREFIX = 'stats/v2/pages/';
export const LEGACY_RECORD_PREFIX = 'games/v1/';
export const RECORD_PREFIX = 'games/v2/';
export const MIGRATION_MARKER = 'stats/v2/legacy-drain';
export const MIGRATION_DRAIN_MS = 65_000;
export const LEAF_SIZE = 32;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const HASH = /^[0-9a-f]{64}$/;
const STORAGE_TIMEOUT_MS = 10_000;

function corrupt() { throw new ApiError(503, 'stats_storage_invalid', 'Community statistics are temporarily unavailable'); }
function count(value) {
  if (!Number.isSafeInteger(value) || value < 0) corrupt();
  return value;
}
function emptyTotals() { return { totalGames: 0, totalCorrect: 0, passages: {} }; }
function hash(value) { return createHash('sha256').update(JSON.stringify(value)).digest('hex'); }
function route(id) { return id.replaceAll('-', ''); }
function budget(timeoutMs) {
  const deadline = Date.now() + timeoutMs;
  return operation => withDeadline(operation, deadline - Date.now());
}
function emptyHead(shard) { return { version: 2, root: null, totals: emptyTotals(), pending: [shard] }; }

function validateTotals(totals) {
  if (!totals || !totals.passages || typeof totals.passages !== 'object' || Array.isArray(totals.passages)) corrupt();
  count(totals.totalGames);
  count(totals.totalCorrect);
  if (totals.totalCorrect > totals.totalGames * 10) corrupt();
  for (const [id, votes] of Object.entries(totals.passages)) {
    if (!id || id.length > 100 || ['__proto__', 'constructor', 'prototype'].includes(id) || !votes) corrupt();
    count(votes.humanVotes);
    count(votes.aiVotes);
  }
  return totals;
}

function validateHead(head, shard) {
  if (head?.version !== 2 || (head.root !== null && !HASH.test(head.root))
    || !Array.isArray(head.pending) || head.pending.length > 600
    || head.pending.some(p => typeof p !== 'string' || !p.startsWith(shard) || !/^[0-9a-f-]{1,36}$/.test(p))) corrupt();
  validateTotals(head.totals);
  if (Object.values(head.totals.passages).reduce((sum, votes) => sum + votes.humanVotes + votes.aiVotes, 0)
    !== head.totals.totalGames * 10) corrupt();
  if ((head.root === null) !== (head.totals.totalGames === 0)) corrupt();
  // A duplicated or overlapping migration partition could falsely mark a range complete.
  const pending = [...head.pending].sort();
  if (pending.some((p, i) => i && p.startsWith(pending[i - 1]))) corrupt();
  return head;
}

async function headSnapshot(store, shard, run) {
  const saved = await run(() => store.getWithMetadata(`${HEAD_PREFIX}${shard}`, { type: 'json', consistency: 'strong' }));
  if (saved && !saved.etag) corrupt();
  return { data: saved ? validateHead(saved.data, shard) : emptyHead(shard), etag: saved?.etag };
}

function validateRecord(record) {
  if (record?.schemaVersion !== 1 || !Array.isArray(record.answers) || record.answers.length !== 10
    || !Number.isInteger(record.score) || record.score < 0 || record.score > 10) corrupt();
  const seen = new Set();
  for (const answer of record.answers) {
    if (!answer || typeof answer.passageId !== 'string' || !answer.passageId || answer.passageId.length > 100
      || ['__proto__', 'constructor', 'prototype'].includes(answer.passageId)
      || seen.has(answer.passageId) || !['human', 'ai'].includes(answer.userGuess)) corrupt();
    seen.add(answer.passageId);
  }
  return record;
}

function addTotals(target, source) {
  target.totalGames = count(target.totalGames + source.totalGames);
  target.totalCorrect = count(target.totalCorrect + source.totalCorrect);
  for (const [id, votes] of Object.entries(source.passages)) {
    const item = Object.hasOwn(target.passages, id) ? target.passages[id]
      : (target.passages[id] = { humanVotes: 0, aiVotes: 0 });
    item.humanVotes = count(item.humanVotes + votes.humanVotes);
    item.aiVotes = count(item.aiVotes + votes.aiVotes);
  }
}

function addRecord(totals, record) {
  const delta = { totalGames: 1, totalCorrect: record.score, passages: {} };
  for (const answer of record.answers) {
    const votes = Object.hasOwn(delta.passages, answer.passageId) ? delta.passages[answer.passageId]
      : (delta.passages[answer.passageId] = { humanVotes: 0, aiVotes: 0 });
    votes[answer.userGuess === 'human' ? 'humanVotes' : 'aiVotes'] += 1;
  }
  addTotals(totals, delta);
}

// Copy-on-write radix pages contain bounded ID -> immutable-record-digest entries.
// Every aggregate and its membership root are published in ONE conditional head write.
// Unpublished pages are harmless, so crashes never require a multi-key rollback.
function treeEditor(store, run) {
  const loaded = new Map();
  const created = new Map();
  async function read(ref, prefix) {
    if (!ref) return { kind: 'leaf', entries: {} };
    let page = created.get(ref) || loaded.get(ref);
    if (!page) {
      page = await run(() => store.get(`${NODE_PREFIX}${ref}`, { type: 'json', consistency: 'strong' }));
      if (!page || hash(page) !== ref) corrupt();
      loaded.set(ref, page);
    }
    if (page.kind === 'leaf') {
      if (!page.entries || typeof page.entries !== 'object' || Array.isArray(page.entries)
        || Object.keys(page.entries).length > LEAF_SIZE) corrupt();
      for (const [id, digest] of Object.entries(page.entries)) {
        if (!UUID.test(id) || !route(id).startsWith(prefix) || !HASH.test(digest)) corrupt();
      }
    } else if (page.kind === 'branch') {
      if (prefix.length >= 32 || !page.children || typeof page.children !== 'object'
        || Array.isArray(page.children) || Object.keys(page.children).length > 16) corrupt();
      for (const [digit, child] of Object.entries(page.children)) {
        if (!/^[0-9a-f]$/.test(digit) || !HASH.test(child)) corrupt();
      }
    } else corrupt();
    return page;
  }
  function remember(page) {
    const ref = hash(page);
    created.set(ref, page);
    return ref;
  }
  function build(entries, prefix) {
    const ids = Object.keys(entries).sort();
    if (ids.length <= LEAF_SIZE) return remember({ kind: 'leaf', entries: Object.fromEntries(ids.map(id => [id, entries[id]])) });
    if (prefix.length >= 32) corrupt();
    const groups = {};
    for (const id of ids) (groups[route(id)[prefix.length]] ||= {})[id] = entries[id];
    return remember({ kind: 'branch', children: Object.fromEntries(Object.keys(groups).sort()
      .map(digit => [digit, build(groups[digit], prefix + digit)])) });
  }
  async function insert(ref, prefix, id, digest) {
    const page = await read(ref, prefix);
    if (page.kind === 'leaf') {
      const previous = page.entries[id];
      if (previous) {
        if (previous !== digest) corrupt();
        return { ref, added: false };
      }
      return { ref: build({ ...page.entries, [id]: digest }, prefix), added: true };
    }
    const digit = route(id)[prefix.length];
    const child = await insert(page.children[digit], prefix + digit, id, digest);
    if (!child.added) return { ref, added: false };
    const children = { ...page.children, [digit]: child.ref };
    return { ref: remember({ kind: 'branch', children: Object.fromEntries(Object.keys(children).sort().map(k => [k, children[k]])) }), added: true };
  }
  async function flush(ref) {
    const page = created.get(ref);
    if (!page) return;
    if (page.kind === 'branch') await Promise.all(Object.values(page.children).map(flush));
    await run(() => store.setJSON(`${NODE_PREFIX}${ref}`, page, { onlyIfNew: true }));
    created.delete(ref);
  }
  return { insert, flush };
}

async function commit(store, shard, records, run, { partition, replacement = [] } = {}) {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const snapshot = await headSnapshot(store, shard, run);
    if (partition !== undefined && snapshot.data.pending[0] !== partition) return;
    const next = structuredClone(snapshot.data);
    const tree = treeEditor(store, run);
    let added = false;
    for (const { id, record } of records) {
      const updated = await tree.insert(next.root, shard, id, hash(record));
      next.root = updated.ref;
      if (updated.added) { addRecord(next.totals, record); added = true; }
    }
    if (partition !== undefined) next.pending = [...replacement, ...next.pending.slice(1)];
    if (!added && partition === undefined) return;
    validateHead(next, shard);
    await tree.flush(next.root);
    const result = await run(() => store.setJSON(`${HEAD_PREFIX}${shard}`, next,
      snapshot.etag ? { onlyIfMatch: snapshot.etag } : { onlyIfNew: true }));
    if (result.modified) return;
    // A competing request won. Re-read both membership and totals before retrying.
    await run(() => new Promise(resolve => setTimeout(resolve, Math.min(40, 2 + attempt * 2) * Math.random())));
  }
  throw new ApiError(503, 'stats_busy', 'Community statistics are busy. Please retry this submission.');
}

export async function saveSubmission(store, submissionId, incoming, { timeoutMs = STORAGE_TIMEOUT_MS } = {}) {
  const run = budget(timeoutMs);
  let record = await run(() => store.get(`${LEGACY_RECORD_PREFIX}${submissionId}`, { type: 'json', consistency: 'strong' }));
  let duplicate = Boolean(record);
  if (!record) {
    const written = await run(() => store.setJSON(`${RECORD_PREFIX}${submissionId}`, incoming, { onlyIfNew: true }));
    duplicate = !written.modified;
    record = written.modified ? incoming : await run(() => store.get(`${RECORD_PREFIX}${submissionId}`, { type: 'json', consistency: 'strong' }));
  }
  validateRecord(record);
  // Keep the original server score if passage labels later change; UUID identity is answers.
  if (JSON.stringify(record.answers) !== JSON.stringify(incoming.answers)) {
    throw new ApiError(409, 'submission_conflict', 'This submission ID was already used for different answers');
  }
  await commit(store, submissionId[0], [{ id: submissionId, record }], run);
  return { success: true, duplicate };
}

function childPrefixes(prefix) {
  const offset = prefix.length;
  if (offset >= 36) corrupt();
  const digits = [8, 13, 18, 23].includes(offset) ? '-' : offset === 14 ? '4' : offset === 19 ? '89ab' : SHARDS;
  return [...digits].map(digit => prefix + digit);
}

async function inspectPartition(store, prefix, maxRecords, run) {
  const keys = [];
  const iterator = store.list({ prefix: `${LEGACY_RECORD_PREFIX}${prefix}`, paginate: true })[Symbol.asyncIterator]();
  while (true) {
    const page = await run(() => iterator.next());
    if (page.done) return keys;
    if (!Array.isArray(page.value?.blobs)) corrupt();
    for (const { key } of page.value.blobs) {
      const id = key.slice(LEGACY_RECORD_PREFIX.length);
      if (!key.startsWith(LEGACY_RECORD_PREFIX + prefix) || !UUID.test(id)) corrupt();
      keys.push(key);
      if (keys.length > maxRecords) return null;
    }
  }
}

export async function readStats(store, {
  timeoutMs = STORAGE_TIMEOUT_MS, migrationRecords = 512, migrationPartitions = 48, partitionSize = 128,
  now = Date.now,
} = {}) {
  const run = budget(timeoutMs);
  let remainingRecords = migrationRecords;
  let remainingPartitions = migrationPartitions;
  const heads = await Promise.all([...SHARDS].map(shard => headSnapshot(store, shard, run)));
  if (heads.some(head => head.data.pending.length)) {
    let marker = await run(() => store.get(MIGRATION_MARKER, { type: 'json', consistency: 'strong' }));
    if (!marker) {
      await run(() => store.setJSON(MIGRATION_MARKER, { startedAt: now() }, { onlyIfNew: true }));
      marker = await run(() => store.get(MIGRATION_MARKER, { type: 'json', consistency: 'strong' }));
    }
    if (!marker || !Number.isSafeInteger(marker.startedAt) || marker.startedAt < 0) corrupt();
    // Let requests in the retired writer drain before completing any v1 partition.
    // Netlify synchronous functions have a 60-second execution limit.
    if (now() < marker.startedAt + MIGRATION_DRAIN_MS) {
      throw new ApiError(503, 'stats_rebuilding', 'Community statistics are updating. Please retry shortly.');
    }
  }
  // v1 is frozen by this release. Its one-time traversal persists a disjoint prefix frontier.
  // A completed partition and its deduplicated contribution advance in the same CAS commit.
  for (let i = 0; i < SHARDS.length; i += 1) {
    const shard = SHARDS[i];
    while (heads[i].data.pending.length && remainingPartitions > 0 && remainingRecords > 0) {
      const prefix = heads[i].data.pending[0];
      remainingPartitions -= 1;
      const keys = await inspectPartition(store, prefix, Math.min(partitionSize, remainingRecords), run);
      if (keys === null) {
        await commit(store, shard, [], run, { partition: prefix, replacement: childPrefixes(prefix) });
      } else {
        const records = [];
        for (let offset = 0; offset < keys.length; offset += 16) {
          records.push(...await run(() => Promise.all(keys.slice(offset, offset + 16).map(async key => ({
            id: key.slice(LEGACY_RECORD_PREFIX.length),
            record: validateRecord(await store.get(key, { type: 'json', consistency: 'strong' })),
          })))));
        }
        remainingRecords -= records.length;
        await commit(store, shard, records, run, { partition: prefix });
      }
      heads[i] = await headSnapshot(store, shard, run);
    }
  }
  if (heads.some(head => head.data.pending.length)) {
    throw new ApiError(503, 'stats_rebuilding', 'Community statistics are updating. Please retry shortly.');
  }
  const [legacyGlobal, legacyPassages] = await run(() => Promise.all([
    store.get('_global', { type: 'json', consistency: 'strong' }),
    store.get('_passages', { type: 'json', consistency: 'strong' }),
  ]));
  if (legacyGlobal !== null && (typeof legacyGlobal !== 'object' || Array.isArray(legacyGlobal))) corrupt();
  const total = validateTotals({
    totalGames: legacyGlobal === null ? 0 : legacyGlobal.totalGames,
    totalCorrect: legacyGlobal === null ? 0 : legacyGlobal.totalCorrect,
    passages: legacyPassages ?? {},
  });
  for (const head of heads) addTotals(total, head.data.totals);
  return {
    global: { totalGames: total.totalGames, totalCorrect: total.totalCorrect,
      averageScore: total.totalGames ? total.totalCorrect / total.totalGames : 0 },
    passages: total.passages,
  };
}
