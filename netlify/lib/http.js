export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(status === 204 ? null : JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      ...extraHeaders,
    },
  });
}

export function apiHandler(run, methods = ['POST']) {
  return async (request, context) => {
    const headers = { 'Access-Control-Allow-Methods': [...methods, 'OPTIONS'].join(', ') };
    if (request.method === 'OPTIONS') return json(null, 204, headers);
    if (!methods.includes(request.method)) {
      return json({ error: 'Method not allowed', code: 'method_not_allowed' }, 405, {
        ...headers, Allow: [...methods, 'OPTIONS'].join(', '),
      });
    }
    try {
      return await run(request, context);
    } catch (error) {
      if (error instanceof ApiError) {
        return json({ error: error.message, code: error.code }, error.status, headers);
      }
      // Provider responses and request text may contain private data or secrets.
      console.error('[public-api] Request failed:', error?.name || 'Error');
      return json({ error: 'Service temporarily unavailable', code: 'service_unavailable' }, 503, headers);
    }
  };
}

export async function readJson(request, maxBytes = 16_384) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) {
    throw new ApiError(415, 'unsupported_media_type', 'Use Content-Type: application/json');
  }
  if (Number(request.headers.get('content-length')) > maxBytes) {
    throw new ApiError(413, 'payload_too_large', 'Request body is too large');
  }
  const reader = request.body?.getReader();
  if (!reader) throw new ApiError(400, 'invalid_json', 'A JSON object is required');
  let bytes = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      throw new ApiError(413, 'payload_too_large', 'Request body is too large');
    }
    chunks.push(value);
  }
  let body;
  try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new ApiError(400, 'invalid_json', 'Invalid JSON body'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new ApiError(400, 'invalid_json', 'A JSON object is required');
  }
  return body;
}

export function requireText(value, name, maxLength) {
  if (typeof value !== 'string' || !value.trim() || value.length > maxLength) {
    throw new ApiError(400, 'invalid_input', `${name} must contain 1 to ${maxLength} characters`);
  }
  return value.trim();
}

// Enforce timeouts even if a mock, response body, or upstream ignores abort.
export async function withDeadline(operation, timeoutMs) {
  if (timeoutMs <= 0) throw new ApiError(504, 'upstream_timeout', 'The service took too long. Please retry.');
  const controller = new AbortController();
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(() => operation(controller.signal)),
      new Promise((_, reject) => {
        timer = setTimeout(() => {
          controller.abort();
          reject(new ApiError(504, 'upstream_timeout', 'The service took too long. Please retry.'));
        }, timeoutMs);
      }),
    ]);
  } finally { clearTimeout(timer); }
}

export async function fetchJson(url, options, { fetchImpl = fetch, timeoutMs = 6000 } = {}) {
  return withDeadline(async (signal) => {
    const response = await fetchImpl(url, { ...options, signal });
    if (!response.ok) {
      const error = new ApiError(502, 'upstream_failure', 'The provider is temporarily unavailable');
      error.upstreamStatus = response.status;
      throw error;
    }
    const data = await response.json();
    return data;
  }, timeoutMs);
}
