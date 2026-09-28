import { mockStore } from './helpers/blob-store.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import passagePool from '../games/turing_shuffle/src/passages.json' with { type: 'json' };
import { fetchJson } from '../netlify/lib/http.js';
import { generateWithModelFallback, GEMINI_MODELS, GROQ_MODELS } from '../netlify/lib/llm.js';
import { createHandler as forgeHandler, parseWeapon } from '../netlify/lib/forge.js';
import { createHandler as scoreHandler, parseScores } from '../netlify/handlers/meaning-score.js';
import { createHandler as translationHandler, splitTranslationText } from '../netlify/handlers/translate.js';
import { createHandler as statsHandler, readStats } from '../netlify/functions/turing-stats.js';
import { createHandler as compileHandler, parseModifier } from '../netlify/handlers/compile.js';

const request = (body, method = 'POST') => new Request('https://test.invalid/api', {
  method, headers: { 'Content-Type': 'application/json' },
  ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
});
const validWeapon = '<speed: 1.2> <damage: 120> <scale: 1> <bounces: 2> <audio_freq: 500> <audio_type: sine>';
const gemini = text => Response.json({ candidates: [{ finishReason: 'STOP', content: { parts: [{ text }] } }] });
const llmOptions = { apiKey: 'mock-key', groqApiKey: '', requestBodyFactory: () => ({ contents: [{ parts: [{ text: 'test' }] }] }) };

test('provider deadline covers stalled response bodies and aborts upstream fetch', async () => {
  let signal;
  const start = Date.now();
  await assert.rejects(fetchJson('https://test.invalid', {}, {
    timeoutMs: 25,
    fetchImpl: async (_url, options) => {
      signal = options.signal;
      return { ok: true, json: () => new Promise(() => {}) };
    },
  }), error => error.status === 504);
  assert.equal(signal.aborted, true);
  assert.ok(Date.now() - start < 1000);
});

test('LLM overall deadline bounds a provider that ignores abort', async () => {
  const started = Date.now();
  let calls = 0;
  await assert.rejects(generateWithModelFallback({
    ...llmOptions, timeoutMs: 35, providerTimeoutMs: 100,
    fetchImpl: () => { calls += 1; return new Promise(() => {}); },
  }), error => error.status === 504);
  assert.equal(calls, 1);
  assert.ok(Date.now() - started < 1000);
});

test('LLM fallback uses only four approved model attempts with no model discovery', async () => {
  const attempted = [];
  await assert.rejects(generateWithModelFallback({
    ...llmOptions, groqApiKey: 'mock-groq',
    fetchImpl: async (url, options) => {
      assert.ok(!url.includes('mock-key'));
      attempted.push(url.includes('googleapis') ? url.split('/models/')[1].split(':')[0] : JSON.parse(options.body).model);
      return new Response('', { status: 429 });
    },
  }), error => error.status === 502);
  assert.deepEqual(attempted, [...GEMINI_MODELS, ...GROQ_MODELS]);
});

test('malformed successful model output is rejected before fallback succeeds', async () => {
  let calls = 0;
  const result = await generateWithModelFallback({
    ...llmOptions, validate: parseWeapon,
    fetchImpl: async () => gemini(++calls === 1 ? '<damage: 9999>' : validWeapon),
  });
  assert.equal(calls, 2);
  assert.equal(result.value, validWeapon);
});

test('blocked or truncated LLM outputs are rejected', async () => {
  await assert.rejects(generateWithModelFallback({
    ...llmOptions,
    fetchImpl: async () => Response.json({ candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: 'partial' }] } }] }),
  }), error => error.status === 502);
});

test('Groq-only credentials work and use a validated complete response', async () => {
  const output = await generateWithModelFallback({
    ...llmOptions, apiKey: '', groqApiKey: 'mock-groq', validate: parseWeapon,
    fetchImpl: async () => Response.json({ choices: [{ finish_reason: 'stop', message: { content: validWeapon } }] }),
  });
  assert.equal(output.value, validWeapon);
});

test('strict output validation rejects fabricated scores and malformed weapon parameters', () => {
  for (const drift of [null, '0.5', -1, 2]) assert.equal(parseScores(JSON.stringify({ scores: [{ drift, hint: '' }] }), 1), null);
  assert.equal(parseScores('{"scores":[]}', 1), null);
  assert.deepEqual(parseScores('{"scores":[{"drift":0.5,"hint":"changed subject"}]}', 1), [{ drift: 0.5, hint: 'changed subject' }]);
  assert.equal(parseWeapon(validWeapon.replace('120', '120.5')), null);
  assert.equal(parseWeapon(validWeapon + '<speed: 1>'), null);
  assert.equal(parseModifier('{}'), null);
  assert.equal(parseModifier('null'), null);
});

test('Wizard compile preserves zero HP, clamps extremes, and rejects executable effect names', async () => {
  const handler = compileHandler({
    generate: async ({ requestBodyFactory, validate }) => {
      const schema = requestBodyFactory().generationConfig.responseSchema;
      const candidate = Object.fromEntries(schema.required.map(key => [key, schema.properties[key].type === 'NUMBER' ? 1 : '']));
      Object.assign(candidate, { name: 'Test relic', hp_bonus: 0, bullet_damage: 9000, bullet_bounces: -3,
        effect_code: 'alert(document.cookie)', bullet_homing: 0.5, steering: 1 });
      const value = validate(JSON.stringify(candidate));
      assert.ok(value);
      return { value };
    },
    fetchImpl: () => { throw new Error('Empty image prompts must not invoke image generation'); },
  });
  const response = await handler(request({ request: 'a plain wooden wand' }));
  assert.equal(response.status, 200);
  const { mod } = await response.json();
  assert.equal(mod.hp_bonus, 0);
  assert.equal(mod.bullet_damage, 3.5);
  assert.equal(mod.bullet_bounces, 0);
  assert.equal(mod.bullet_homing, 0);
  assert.equal(mod.steering, 0);
  assert.equal(mod.effect_code, 'glow');
});

test('Wizard icons use authenticated current endpoint and fall back for missing keys or unsafe/oversized bodies', async () => {
  const generate = async ({ requestBodyFactory, validate }) => {
    const schema = requestBodyFactory().generationConfig.responseSchema;
    const candidate = Object.fromEntries(schema.required.map(key => [key, schema.properties[key].type === 'NUMBER' ? 1 : '']));
    Object.assign(candidate, { name: 'Icon relic', weapon_image_prompt: 'golden wand' });
    return { value: validate(JSON.stringify(candidate)) };
  };
  let calls = 0;
  const invoke = async (imageApiKey, responseFactory) => {
    const handler = compileHandler({ generate, imageApiKey, fetchImpl: async (url, options) => {
      calls++;
      const parsed = new URL(url);
      assert.equal(parsed.origin, 'https://gen.pollinations.ai');
      assert.match(parsed.pathname, /^\/image\/golden%20wand/);
      assert.equal(parsed.searchParams.get('model'), 'flux');
      assert.equal(parsed.searchParams.has('key'), false);
      assert.equal(options.headers.Authorization, 'Bearer mock-image-key');
      return responseFactory();
    } });
    const response = await handler(request({ request: 'wand' }));
    assert.equal(response.status, 200);
    return (await response.json()).mod;
  };
  assert.equal((await invoke('', () => { throw new Error('Missing key must skip image calls'); })).weapon_image_url, null);
  assert.equal(calls, 0);
  const png = () => new Response(new Uint8Array([137, 80, 78, 71]), { headers: { 'Content-Type': 'image/png' } });
  assert.equal((await invoke('mock-image-key', png)).weapon_image_url, 'data:image/png;base64,iVBORw==');
  for (const responseFactory of [
    () => new Response('<svg onload="alert(1)"/>', { headers: { 'Content-Type': 'image/svg+xml' } }),
    () => new Response(new Uint8Array(512001), { headers: { 'Content-Type': 'image/png' } }),
    () => new Response('unavailable', { status: 503 }),
  ]) assert.equal((await invoke('mock-image-key', responseFactory)).weapon_image_url, null);
});

test('API validation rejects wrong types, oversized values and batches before calling providers', async () => {
  const unreachable = () => { throw new Error('Provider must not be called'); };
  for (const [handler, body] of [
    [forgeHandler(unreachable), { prompt: { value: 'bad' } }],
    [forgeHandler(unreachable), { prompt: 'x'.repeat(301) }],
    [scoreHandler(unreachable), { pairs: [{ original: '', translation: 'x' }] }],
    [scoreHandler(unreachable), { pairs: Array(31).fill({ original: 'x', translation: 'y' }) }],
    [compileHandler({ generate: unreachable }), { request: 'x', existingMods: [null] }],
    [translationHandler({ fetchImpl: unreachable }), { text: 'x', sourceLang: 'en|ja', targetLang: 'fr' }],
  ]) {
    const response = await handler(request(body));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).code, 'invalid_input');
  }
});

test('functions return consistent preflight, method, JSON, and size errors', async () => {
  const handler = forgeHandler();
  assert.equal((await handler(request(null, 'OPTIONS'))).status, 204);
  const method = await handler(request(null, 'GET'));
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('allow'), 'POST, OPTIONS');
  const invalid = await handler(new Request('https://test.invalid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' }));
  assert.equal(invalid.status, 400);
  const oversized = await handler(request({ prompt: 'x'.repeat(5000) }));
  assert.equal(oversized.status, 413);
  const wrongType = await handler(new Request('https://test.invalid', { method: 'POST', body: '{}' }));
  assert.equal(wrongType.status, 415);
});

test('translation preserves every Unicode character when splitting for fallback', async () => {
  const text = '日本語🙂 translated sentence '.repeat(40);
  const chunks = splitTranslationText(text);
  assert.equal(chunks.join(''), text);
  assert.ok(chunks.every(c => Buffer.byteLength(c, 'utf8') <= 500));
  const handler = translationHandler({ apiKey: '', fetchImpl: async url => Response.json({
    responseStatus: 200, responseData: { translatedText: new URL(url).searchParams.get('q') },
  }) });
  const response = await handler(request({ text, sourceLang: 'en', targetLang: 'ja' }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).translatedText, text.trim());
});

test('translation rejects quota errors inside successful HTTP responses', async () => {
  const handler = translationHandler({ apiKey: '', fetchImpl: async () => Response.json({
    responseStatus: 403, responseData: { translatedText: 'MYMEMORY WARNING: QUOTA EXCEEDED' },
  }) });
  assert.equal((await handler(request({ text: 'hello', sourceLang: 'en', targetLang: 'fr' }))).status, 502);
});

test('translation fallback respects the overall deadline', async () => {
  const handler = translationHandler({ apiKey: 'mock', timeoutMs: 30, fetchImpl: () => new Promise(() => {}) });
  assert.equal((await handler(request({ text: 'hello', sourceLang: 'en', targetLang: 'fr' }))).status, 504);
});

const submission = (id = randomUUID()) => ({
  submissionId: id,
  answers: passagePool.slice(0, 10).map(p => ({ passageId: p.id, userGuess: p.source, correct: false })),
});

test('concurrent submissions and retries preserve every game exactly once and retain legacy totals', async () => {
  const seed = { _global: { totalGames: 2, totalCorrect: 7, averageScore: 3.5 }, _passages: { [passagePool[0].id]: { humanVotes: 2, aiVotes: 1 } } };
  const store = mockStore(seed);
  const handler = statsHandler(() => store);
  const bodies = Array.from({ length: 40 }, () => submission());
  const results = await Promise.all([...bodies, ...bodies].map(body => handler(request(body))));
  assert.ok(results.every(r => r.status === 200));
  const payloads = await Promise.all(results.map(r => r.json()));
  assert.equal(payloads.filter(p => p.duplicate).length, 40);
  const stats = await readStats(store);
  assert.equal(stats.global.totalGames, 42);
  assert.equal(stats.global.totalCorrect, 407); // Client-provided correct:false is ignored.
  assert.equal(stats.global.averageScore, 407 / 42);
  const firstVotes = stats.passages[passagePool[0].id];
  assert.equal(firstVotes.humanVotes + firstVotes.aiVotes, 43);
  assert.deepEqual(store.entries.get('_global'), seed._global);
  assert.deepEqual(store.entries.get('_passages'), seed._passages);
});

test('reusing a submission ID for different guesses returns conflict without changing totals', async () => {
  const store = mockStore();
  const handler = statsHandler(() => store);
  const body = submission();
  assert.equal((await handler(request(body))).status, 200);
  body.answers[0].userGuess = body.answers[0].userGuess === 'human' ? 'ai' : 'human';
  assert.equal((await handler(request(body))).status, 409);
  assert.equal((await readStats(store)).global.totalCorrect, 10);
});

test('stats reject unknown IDs, duplicates, invalid guesses, wrong counts, and missing submission IDs', async () => {
  const bodies = [submission(), submission(), submission(), submission(), submission()];
  bodies[0].answers[0].passageId = '__proto__';
  bodies[1].answers[0].passageId = bodies[1].answers[1].passageId;
  bodies[2].answers[0].userGuess = 'maybe';
  bodies[3].answers.pop();
  delete bodies[4].submissionId;
  const handler = statsHandler(() => { throw new Error('Storage must not be reached'); });
  for (const body of bodies) assert.equal((await handler(request(body))).status, 400);
});

test('stats storage read deadlines are bounded', async () => {
  await assert.rejects(readStats({ getWithMetadata: () => new Promise(() => {}) }, { timeoutMs: 25 }), error => error.status === 504);
});

test('two deployed functions cover every public API within the Free plan rule allowance', async () => {
  const files = await readdir(new URL('../netlify/functions/', import.meta.url));
  assert.deepEqual(files.filter(f => f.endsWith('.js')).sort(), ['ai.js', 'turing-stats.js']);
  const expected = { ai: 120, 'turing-stats': 60 };
  for (const [name, limit] of Object.entries(expected)) {
    const module = await import(`../netlify/functions/${name}.js`);
    assert.equal(typeof module.default, 'function');
    assert.deepEqual(module.config.rateLimit, { windowLimit: limit, windowSize: 60, aggregateBy: ['ip', 'domain'] });
    const paths = name === 'ai' ? ['translate', 'meaning-score', 'forge', 'compile'].map(p => `/.netlify/functions/${p}`) : [module.config.path];
    for (const path of paths) {
      for (const suffix of ['', '/']) {
        const response = await module.default(new Request(`https://test.invalid${path}${suffix}`, { method: 'OPTIONS' }));
        assert.equal(response.status, 204);
      }
    }
  }
  const { config } = await import('../netlify/functions/ai.js');
  assert.equal(config.path, '/.netlify/functions/:endpoint(translate|meaning-score|forge|compile)');
  // Local tests verify deploy declarations. Actual edge enforcement needs a deploy preview.
  await assert.rejects(readFile(new URL('../netlify/functions/llm.js', import.meta.url)), { code: 'ENOENT' });
});
