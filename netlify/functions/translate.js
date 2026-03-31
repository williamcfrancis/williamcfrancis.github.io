const requestCounts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 60;

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const timestamps = requestCounts.get(ip).filter(t => now - t < windowMs);
  requestCounts.set(ip, timestamps);

  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  return true;
}

export async function handler(event) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const ip =
    event.headers['x-forwarded-for'] ||
    event.headers['client-ip'] ||
    'unknown';

  if (!checkRateLimit(ip)) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Rate limit exceeded. Try again in a minute.' }),
    };
  }

  let text, sourceLang, targetLang;
  try {
    ({ text, sourceLang, targetLang } = JSON.parse(event.body));
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  if (!text || !sourceLang || !targetLang) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing required fields: text, sourceLang, targetLang' }),
    };
  }

  // Try Google Translate first
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        'https://translation.googleapis.com/language/translate/v2',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            key: apiKey,
            format: 'text',
          }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        const t = data.data.translations[0];
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            translatedText: t.translatedText,
            detectedSourceLanguage: t.detectedSourceLanguage || sourceLang,
          }),
        };
      }
      console.error('Google Translate returned', res.status);
    } catch (e) {
      console.error('Google Translate error:', e);
    }
  }

  // Fallback: MyMemory API (free, no key, 5000 chars/day)
  try {
    const encoded = encodeURIComponent(text.slice(0, 500));
    const langPair = `${sourceLang}|${targetLang}`;
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${langPair}`,
    );

    if (res.ok) {
      const data = await res.json();
      if (data.responseData?.translatedText) {
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            translatedText: data.responseData.translatedText,
            detectedSourceLanguage: sourceLang,
          }),
        };
      }
    }
  } catch (e) {
    console.error('MyMemory error:', e);
  }

  return {
    statusCode: 502,
    headers: corsHeaders,
    body: JSON.stringify({ error: 'All translation providers failed' }),
  };
}
