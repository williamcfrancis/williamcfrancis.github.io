const MODEL_PRIORITY = [
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gemma-3-27b-it',
  'gemma-3-12b-it',
];

function buildEndpoint(model, apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
}

function isRateLimited(statusCode, errorText) {
  if (statusCode === 429) return true;
  const text = String(errorText || '').toLowerCase();
  return text.includes('rate limit') || text.includes('quota');
}

async function generateWithModelFallback({
  apiKey,
  requestBodyFactory,
  attemptsPerModel = 1,
}) {
  const errors = [];

  for (const model of MODEL_PRIORITY) {
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
  throw error;
}

module.exports = {
  MODEL_PRIORITY,
  generateWithModelFallback,
};
