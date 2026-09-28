export function mockStore(seed = {}, hooks = {}) {
  // Unit fixtures represent a deployment whose old writers have already drained.
  const entries = new Map(Object.entries(structuredClone({ 'stats/v2/legacy-drain': { startedAt: 0 }, ...seed })));
  const versions = new Map([...entries.keys()].map(key => [key, 1]));
  const calls = { get: 0, getWithMetadata: 0, setJSON: 0, list: 0 };
  const etag = key => `"${versions.get(key)}"`;
  return {
    entries, calls,
    resetCalls() { for (const name of Object.keys(calls)) calls[name] = 0; },
    async get(key) {
      calls.get += 1;
      await hooks.beforeGet?.(key);
      return structuredClone(entries.get(key) ?? null);
    },
    async getWithMetadata(key) {
      calls.getWithMetadata += 1;
      await hooks.beforeGet?.(key);
      return entries.has(key) ? { data: structuredClone(entries.get(key)), etag: etag(key) } : null;
    },
    async setJSON(key, data, options) {
      calls.setJSON += 1;
      await hooks.beforeSet?.(key, data, options);
      if (options.onlyIfNew && entries.has(key)) return { modified: false };
      if (options.onlyIfMatch && (!entries.has(key) || etag(key) !== options.onlyIfMatch)) return { modified: false };
      if (!options.onlyIfNew && !options.onlyIfMatch) throw new Error('Unconditional writes are not permitted');
      entries.set(key, structuredClone(data));
      versions.set(key, (versions.get(key) || 0) + 1);
      await hooks.afterSet?.(key, data, options);
      return { modified: true, etag: etag(key) };
    },
    async *list({ prefix }) {
      // Deliberately do not sort: migration must not depend on listing order or cursors.
      const keys = [...entries.keys()].filter(key => key.startsWith(prefix));
      for (let i = 0; i < keys.length; i += 37) {
        calls.list += 1;
        await hooks.beforeList?.(prefix);
        yield { blobs: keys.slice(i, i + 37).map(key => ({ key })) };
      }
      if (!keys.length) { calls.list += 1; await hooks.beforeList?.(prefix); }
    },
  };
}
