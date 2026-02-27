// Keep this list as the "global desired order" for observability/debugging.
// Runtime resolution may reorder/filter based on free-tier-safe defaults and
// model availability for the current API key.
const MODEL_PRIORITY = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-3-flash',
  'gemma-3-27b-it',
  'gemma-3-12b-it',
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile',
  'qwen/qwen3-32b',
  'mixtral-8x7b-32768',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
];

const FREE_TIER_SAFE_PRIORITY = [
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
];

const CONDITIONAL_PRIORITY = [
  'gemini-3-flash',
  'gemma-3-27b-it',
  'gemma-3-12b-it',
];

const GROQ_FREE_TIER_PRIORITY = [
  'openai/gpt-oss-120b',
  'llama-3.3-70b-versatile',
  'qwen/qwen3-32b',
  'mixtral-8x7b-32768',
  'openai/gpt-oss-20b',
  'llama-3.1-8b-instant',
];

const MODELS_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedModels = null;
let cachedGroqModels = null;

function listModelsEndpoint(apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
}

function buildEndpoint(model, apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

function buildGroqEndpoint() {
  return 'https://api.groq.com/openai/v1/chat/completions';
}

function listGroqModelsEndpoint() {
  return 'https://api.groq.com/openai/v1/models';
}

function isRateLimited(statusCode, errorText) {
  if (statusCode === 429) return true;
  const text = String(errorText || '').toLowerCase();
  return text.includes('rate limit') || text.includes('quota');
}

function normalizeModelName(name) {
  return String(name || '').replace(/^models\//, '');
}

function pickAvailableModelId(baseModel, availableModels) {
  const normalized = availableModels.map(normalizeModelName);
  if (normalized.includes(baseModel)) return baseModel;

  const prefixMatches = normalized.filter((m) => m.startsWith(`${baseModel}-`));
  if (prefixMatches.length === 0) return null;

  // Prefer the shortest suffix as a stable default (often -latest/-001 style).
  prefixMatches.sort((a, b) => a.length - b.length);
  return prefixMatches[0];
}

async function fetchAvailableModels(apiKey) {
  const now = Date.now();
  if (
    cachedModels
    && cachedModels.apiKey === apiKey
    && now - cachedModels.fetchedAt < MODELS_CACHE_TTL_MS
  ) {
    return cachedModels.models;
  }

  const res = await fetch(listModelsEndpoint(apiKey), {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`models.list failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const models = Array.isArray(data?.models) ? data.models : [];

  cachedModels = {
    apiKey,
    fetchedAt: now,
    models,
  };
  return models;
}

function modelSupportsGenerateContent(model) {
  const methods = Array.isArray(model?.supportedGenerationMethods)
    ? model.supportedGenerationMethods
    : [];
  if (methods.length === 0) return true;
  return methods.includes('generateContent');
}

function isLikelyTextModel(name) {
  const id = String(name || '').toLowerCase();
  const excludedSignals = [
    'embedding',
    'embed',
    'aqa',
    'vision',
    'imagen',
    'image',
    'tts',
    'speech',
    'transcribe',
    'whisper',
    'guard',
    'safeguard',
  ];
  return !excludedSignals.some((signal) => id.includes(signal));
}

async function resolveRuntimeModelOrder(apiKey) {
  try {
    const availableModelsRaw = await fetchAvailableModels(apiKey);
    const availableModels = availableModelsRaw
      .filter(modelSupportsGenerateContent)
      .map((m) => normalizeModelName(m?.name))
      .filter(Boolean);
    const desiredOrder = [...FREE_TIER_SAFE_PRIORITY, ...CONDITIONAL_PRIORITY];

    const resolved = desiredOrder
      .map((candidate) => pickAvailableModelId(candidate, availableModels))
      .filter(Boolean);

    const remaining = availableModels
      .filter(isLikelyTextModel)
      .filter((m) => !resolved.includes(m));

    // De-duplicate while preserving order.
    const unique = [...new Set([...resolved, ...remaining])];
    return unique.length > 0 ? unique : [...FREE_TIER_SAFE_PRIORITY];
  } catch {
    // If model listing fails, fall back to free-tier-safe defaults only.
    return [...FREE_TIER_SAFE_PRIORITY];
  }
}

async function fetchAvailableGroqModels(apiKey) {
  const now = Date.now();
  if (
    cachedGroqModels
    && cachedGroqModels.apiKey === apiKey
    && now - cachedGroqModels.fetchedAt < MODELS_CACHE_TTL_MS
  ) {
    return cachedGroqModels.models;
  }

  const res = await fetch(listGroqModelsEndpoint(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`groq.models.list failed (${res.status}): ${detail.slice(0, 200)}`);
  }

  const data = await res.json();
  const models = Array.isArray(data?.data)
    ? data.data.map((m) => String(m?.id || '')).filter(Boolean)
    : [];

  cachedGroqModels = {
    apiKey,
    fetchedAt: now,
    models,
  };
  return models;
}

async function resolveRuntimeGroqModelOrder(apiKey) {
  try {
    const availableModels = await fetchAvailableGroqModels(apiKey);
    const preferred = GROQ_FREE_TIER_PRIORITY.filter((model) => availableModels.includes(model));
    const remaining = availableModels
      .filter(isLikelyTextModel)
      .filter((m) => !preferred.includes(m));
    const unique = [...new Set([...preferred, ...remaining])];
    return unique.length > 0 ? unique : [...GROQ_FREE_TIER_PRIORITY];
  } catch {
    return [...GROQ_FREE_TIER_PRIORITY];
  }
}

async function generateWithModelFallback({
  apiKey,
  groqApiKey = process.env.GROQ_API_KEY,
  requestBodyFactory,
  attemptsPerModel = 1,
}) {
  const providerErrors = [];
  let sawGeminiRateLimit = false;

  const geminiOutcome = await generateWithGeminiFallback({
    apiKey,
    requestBodyFactory,
    attemptsPerModel,
  });
  if (geminiOutcome.ok) return geminiOutcome.result;

  providerErrors.push(...geminiOutcome.errors);
  sawGeminiRateLimit = geminiOutcome.sawRateLimit;

  if (sawGeminiRateLimit && groqApiKey) {
    const groqOutcome = await generateWithGroqFallback({
      apiKey: groqApiKey,
      requestBodyFactory,
      attemptsPerModel,
    });
    if (groqOutcome.ok) return groqOutcome.result;
    providerErrors.push(...groqOutcome.errors);
  }

  const error = new Error('All configured models failed');
  error.details = providerErrors;
  error.modelOrder = providerErrors.map((entry) => `${entry.provider}:${entry.model}`);
  throw error;
}

async function generateWithGeminiFallback({
  apiKey,
  requestBodyFactory,
  attemptsPerModel,
}) {
  const runtimeModelOrder = await resolveRuntimeModelOrder(apiKey);
  const errors = [];
  let sawRateLimit = false;

  for (const model of runtimeModelOrder) {
    for (let attempt = 0; attempt < attemptsPerModel; attempt += 1) {
      const endpoint = buildEndpoint(model, apiKey);
      const body = requestBodyFactory({ provider: 'gemini', model, attempt });

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const data = await res.json();
          return {
            ok: true,
            result: { data, model, attempt, errors },
          };
        }

        const detail = await res.text();
        const rateLimited = isRateLimited(res.status, detail);
        errors.push({
          provider: 'gemini',
          model,
          attempt,
          status: res.status,
          rateLimited,
          detail: detail.slice(0, 300),
        });
        if (rateLimited) sawRateLimit = true;

        // When rate-limited, immediately move to the next model.
        if (rateLimited) break;
      } catch (error) {
        errors.push({
          provider: 'gemini',
          model,
          attempt,
          status: 'network_error',
          rateLimited: false,
          detail: error?.message || String(error),
        });
      }
    }
  }

  return {
    ok: false,
    errors,
    sawRateLimit,
    modelOrder: runtimeModelOrder,
  };
}

function extractGeminiTextFromParts(parts) {
  if (!Array.isArray(parts)) return '';
  return parts
    .map((part) => (typeof part?.text === 'string' ? part.text : ''))
    .filter(Boolean)
    .join('\n')
    .trim();
}

function buildGroqRequestBody(geminiBody, model) {
  const systemInstruction = geminiBody?.systemInstruction || geminiBody?.system_instruction;
  const systemText = extractGeminiTextFromParts(systemInstruction?.parts);
  const userMessages = Array.isArray(geminiBody?.contents)
    ? geminiBody.contents
      .map((content) => extractGeminiTextFromParts(content?.parts))
      .filter(Boolean)
    : [];
  const generationConfig = geminiBody?.generationConfig || {};
  const wantsJson = String(generationConfig?.responseMimeType || '').toLowerCase() === 'application/json';

  const messages = [];
  if (systemText) messages.push({ role: 'system', content: systemText });
  userMessages.forEach((text) => messages.push({ role: 'user', content: text }));

  const body = {
    model,
    messages,
    temperature: typeof generationConfig?.temperature === 'number' ? generationConfig.temperature : 0.7,
    max_tokens: Number.isFinite(generationConfig?.maxOutputTokens) ? generationConfig.maxOutputTokens : 1024,
  };
  if (wantsJson) {
    body.response_format = { type: 'json_object' };
  }
  return body;
}

function normalizeGroqToGeminiShape(data) {
  const text = data?.choices?.[0]?.message?.content || '';
  return {
    candidates: [
      {
        content: {
          parts: [{ text }],
        },
      },
    ],
  };
}

async function generateWithGroqFallback({
  apiKey,
  requestBodyFactory,
  attemptsPerModel,
}) {
  const runtimeModelOrder = await resolveRuntimeGroqModelOrder(apiKey);
  const errors = [];

  for (const model of runtimeModelOrder) {
    for (let attempt = 0; attempt < attemptsPerModel; attempt += 1) {
      const endpoint = buildGroqEndpoint();
      const geminiLikeBody = requestBodyFactory({ provider: 'groq', model, attempt });
      const body = buildGroqRequestBody(geminiLikeBody, model);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const data = await res.json();
          return {
            ok: true,
            result: { data: normalizeGroqToGeminiShape(data), model, attempt, errors },
          };
        }

        const detail = await res.text();
        const rateLimited = isRateLimited(res.status, detail);
        errors.push({
          provider: 'groq',
          model,
          attempt,
          status: res.status,
          rateLimited,
          detail: detail.slice(0, 300),
        });

        if (rateLimited) break;
      } catch (error) {
        errors.push({
          provider: 'groq',
          model,
          attempt,
          status: 'network_error',
          rateLimited: false,
          detail: error?.message || String(error),
        });
      }
    }
  }

  return {
    ok: false,
    errors,
    sawRateLimit: errors.some((entry) => entry.rateLimited),
    modelOrder: runtimeModelOrder,
  };
}

module.exports = {
  MODEL_PRIORITY,
  generateWithModelFallback,
};
