// Keep this list as the "global desired order" for observability/debugging.
// Runtime resolution may reorder/filter based on free-tier-safe defaults and
// model availability for the current API key.
const MODEL_PRIORITY = [
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gemma-3-27b-it',
  'gemma-3-12b-it',
];

const FREE_TIER_SAFE_PRIORITY = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
];

const CONDITIONAL_PRIORITY = [
  'gemini-3-flash',
  'gemma-3-27b-it',
  'gemma-3-12b-it',
];

const MODELS_CACHE_TTL_MS = 5 * 60 * 1000;
let cachedModels = null;

function listModelsEndpoint(apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
}

function buildEndpoint(model, apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
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
  const models = Array.isArray(data?.models)
    ? data.models.map((m) => normalizeModelName(m?.name)).filter(Boolean)
    : [];

  cachedModels = {
    apiKey,
    fetchedAt: now,
    models,
  };
  return models;
}

async function resolveRuntimeModelOrder(apiKey) {
  try {
    const availableModels = await fetchAvailableModels(apiKey);
    const desiredOrder = [...FREE_TIER_SAFE_PRIORITY, ...CONDITIONAL_PRIORITY];

    const resolved = desiredOrder
      .map((candidate) => pickAvailableModelId(candidate, availableModels))
      .filter(Boolean);

    // De-duplicate while preserving order.
    const unique = [...new Set(resolved)];
    return unique.length > 0 ? unique : [...FREE_TIER_SAFE_PRIORITY];
  } catch {
    // If model listing fails, fall back to free-tier-safe defaults only.
    return [...FREE_TIER_SAFE_PRIORITY];
  }
}

async function generateWithModelFallback({
  apiKey,
  requestBodyFactory,
  attemptsPerModel = 1,
}) {
  const runtimeModelOrder = await resolveRuntimeModelOrder(apiKey);
  const errors = [];

  for (const model of runtimeModelOrder) {
    for (let attempt = 0; attempt < attemptsPerModel; attempt += 1) {
      const endpoint = buildEndpoint(model, apiKey);
      const body = requestBodyFactory({ model, attempt });

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const data = await res.json();
          return { data, model, attempt, errors };
        }

        const detail = await res.text();
        const rateLimited = isRateLimited(res.status, detail);
        errors.push({
          model,
          attempt,
          status: res.status,
          rateLimited,
          detail: detail.slice(0, 300),
        });

        // When rate-limited, immediately move to the next model.
        if (rateLimited) break;
      } catch (error) {
        errors.push({
          model,
          attempt,
          status: 'network_error',
          rateLimited: false,
          detail: error?.message || String(error),
        });
      }
    }
  }

  const error = new Error('All configured models failed');
  error.details = errors;
  error.modelOrder = runtimeModelOrder;
  throw error;
}

module.exports = {
  MODEL_PRIORITY,
  generateWithModelFallback,
};
