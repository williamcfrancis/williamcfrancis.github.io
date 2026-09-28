import { ApiError, fetchJson } from './http.js';

// Explicit allowlists: never discover and try every model visible to an API key.
// Verified against the stable-model catalog on 2026-09-26. Gemini 2.5 access
// is now limited to existing users; these defaults also work for new projects.
export const GEMINI_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.8-flash'];
// Groq retired the Llama defaults for standard accounts on 2026-08-16.
export const GROQ_MODELS = ['openai/gpt-oss-20b', 'openai/gpt-oss-120b'];
export const MAX_ATTEMPTS = 4;
export const OVERALL_TIMEOUT_MS = 20_000;
export const PROVIDER_TIMEOUT_MS = 6000;

export function extractText(data) {
  const candidate = data?.candidates?.[0];
  if (candidate?.finishReason && candidate.finishReason !== 'STOP') return '';
  return (candidate?.content?.parts || []).filter(p => !p.thought)
    .map(p => typeof p.text === 'string' ? p.text : '').join('').trim();
}

function geminiBody(body, model) {
  const generationConfig = { ...body.generationConfig };
  // Gemini 3 uses model-specific thinking levels. Do not forward the old
  // thinkingBudget: 0 or sampling overrides from the shared prompt factory.
  delete generationConfig.temperature;
  delete generationConfig.topP;
  delete generationConfig.topK;
  generationConfig.thinkingConfig = {
    thinkingLevel: model === 'gemini-3.5-flash-lite' ? 'minimal' : 'low',
  };
  return { ...body, generationConfig };
}

function groqBody(body, model) {
  const text = parts => (parts || []).map(p => p.text || '').join('\n');
  const system = text((body.system_instruction || body.systemInstruction)?.parts);
  const config = body.generationConfig || {};
  return {
    model,
    messages: [
      ...(system ? [{ role: 'system', content: system }] : []),
      ...(body.contents || []).map(c => ({ role: 'user', content: text(c.parts) })),
    ],
    temperature: config.temperature ?? 0.7,
    // GPT-OSS uses part of its completion budget for reasoning. Keep a bounded
    // allowance for that work instead of starving short JSON/flag responses.
    max_completion_tokens: Math.min(8192, (config.maxOutputTokens ?? 1024) + 1024),
    reasoning_effort: 'low',
    include_reasoning: false,
    ...(config.responseMimeType === 'application/json' ? { response_format: { type: 'json_object' } } : {}),
  };
}

export async function generateWithModelFallback({
  apiKey = process.env.GEMINI_API_KEY,
  groqApiKey = process.env.GROQ_API_KEY,
  requestBodyFactory,
  validate = text => text,
  fetchImpl = fetch,
  timeoutMs = OVERALL_TIMEOUT_MS,
  providerTimeoutMs = PROVIDER_TIMEOUT_MS,
}) {
  if (!apiKey && !groqApiKey) {
    throw new ApiError(503, 'service_unavailable', 'AI generation is not configured');
  }
  const deadline = Date.now() + Math.min(timeoutMs, OVERALL_TIMEOUT_MS);
  let timedOut = false;
  let attempts = 0;
  for (const [provider, key, models] of [
    ['gemini', apiKey, GEMINI_MODELS], ['groq', groqApiKey, GROQ_MODELS],
  ]) {
    if (!key) continue;
    for (const model of models) {
      if (attempts >= MAX_ATTEMPTS || Date.now() >= deadline) { timedOut ||= Date.now() >= deadline; break; }
      attempts += 1;
      const body = requestBodyFactory({ provider, model, attempt: attempts - 1 });
      const url = provider === 'gemini'
        ? `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
        : 'https://api.groq.com/openai/v1/chat/completions';
      try {
        const data = await fetchJson(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(provider === 'gemini'
            ? { 'x-goog-api-key': key } : { Authorization: `Bearer ${key}` }) },
          body: JSON.stringify(provider === 'gemini' ? geminiBody(body, model) : groqBody(body, model)),
        }, { fetchImpl, timeoutMs: Math.min(providerTimeoutMs, deadline - Date.now()) });
        const text = provider === 'gemini' ? extractText(data)
          : (data?.choices?.[0]?.finish_reason === 'stop' ? data?.choices?.[0]?.message?.content : '');
        if (typeof text !== 'string' || !text.trim() || text.length > 32_000) continue;
        const value = validate(text.trim());
        if (value !== null && value !== undefined && value !== false) return { value, model };
      } catch (error) {
        timedOut ||= error.status === 504;
        // An invalid credential/request will not improve on another model of the same provider.
        if ([400, 401, 403].includes(error.upstreamStatus)) break;
      }
    }
  }
  if (timedOut) throw new ApiError(504, 'upstream_timeout', 'AI generation took too long. Please retry.');
  throw new ApiError(502, 'upstream_failure', 'AI generation is temporarily unavailable. Please retry.');
}
