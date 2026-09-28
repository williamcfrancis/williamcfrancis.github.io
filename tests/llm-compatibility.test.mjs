import test from 'node:test';
import assert from 'node:assert/strict';
import { extractText, generateWithModelFallback, GEMINI_MODELS, GROQ_MODELS } from '../netlify/lib/llm.js';

test('Gemini stable fallbacks use supported thinking levels without changing output limits or shared prompts', async () => {
  const prompt = {
    system_instruction: { parts: [{ text: 'Return JSON.' }] },
    contents: [{ parts: [{ text: 'Describe a game item.' }] }],
    generationConfig: {
      temperature: 0.1, topP: 0.8, topK: 10, maxOutputTokens: 256,
      responseMimeType: 'application/json', thinkingConfig: { thinkingBudget: 0 },
    },
  };
  const original = structuredClone(prompt);
  const attempts = [];
  const result = await generateWithModelFallback({
    apiKey: 'test-gemini', groqApiKey: 'test-groq', requestBodyFactory: () => prompt,
    fetchImpl: async (url, options) => {
      const body = JSON.parse(options.body);
      attempts.push({ url, body });
      if (url.includes('googleapis.com')) return new Response('', { status: 429 });
      return Response.json({ choices: [{ finish_reason: 'stop', message: { content: '{"ok":true}' } }] });
    },
  });
  assert.equal(result.value, '{"ok":true}');
  assert.equal(attempts.length, 3);
  for (const [index, level] of ['minimal', 'low'].entries()) {
    const { url, body } = attempts[index];
    assert.ok(url.endsWith(`/models/${GEMINI_MODELS[index]}:generateContent`));
    assert.deepEqual(body.generationConfig, {
      maxOutputTokens: 256, responseMimeType: 'application/json', thinkingConfig: { thinkingLevel: level },
    });
    assert.deepEqual(body.contents, original.contents);
    assert.deepEqual(body.system_instruction, original.system_instruction);
  }
  assert.equal(attempts[2].body.temperature, 0.1);
  assert.equal(attempts[2].body.max_tokens, undefined);
  assert.equal(attempts[2].body.max_completion_tokens, 1280);
  assert.equal(attempts[2].body.reasoning_effort, 'low');
  assert.equal(attempts[2].body.include_reasoning, false);
  assert.deepEqual(attempts[2].body.response_format, { type: 'json_object' });
  assert.equal(attempts[2].body.thinkingConfig, undefined);
  assert.deepEqual(prompt, original);
});

test('current Groq models retry truncated output and never validate reasoning as the result', async () => {
  const attempts = [];
  const validated = [];
  const result = await generateWithModelFallback({
    apiKey: '', groqApiKey: 'mock',
    requestBodyFactory: () => ({ contents: [{ parts: [{ text: 'Return JSON.' }] }], generationConfig: { maxOutputTokens: 20_000 } }),
    validate: text => { validated.push(text); return JSON.parse(text); },
    fetchImpl: async (_url, options) => {
      const body = JSON.parse(options.body);
      attempts.push(body);
      return Response.json({ choices: [{
        finish_reason: attempts.length === 1 ? 'length' : 'stop',
        message: { reasoning: 'private reasoning', content: attempts.length === 1 ? '{"partial":' : '{"ok":true}' },
      }] });
    },
  });
  assert.deepEqual(GROQ_MODELS, ['openai/gpt-oss-20b', 'openai/gpt-oss-120b']);
  assert.deepEqual(attempts.map(body => body.model), GROQ_MODELS);
  assert.ok(attempts.every(body => body.max_completion_tokens === 8192 && body.reasoning_effort === 'low' && body.include_reasoning === false));
  assert.deepEqual(validated, ['{"ok":true}']);
  assert.deepEqual(result.value, { ok: true });
});

test('Gemini reasoning text is excluded from the validated game output', () => {
  assert.equal(extractText({ candidates: [{ finishReason: 'STOP', content: { parts: [
    { thought: true, text: 'Internal reasoning.' }, { text: 'visible result' },
  ] } }] }), 'visible result');
});
