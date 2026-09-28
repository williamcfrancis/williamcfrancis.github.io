import { apiHandler, ApiError, fetchJson, json, readJson, requireText } from '../lib/http.js';

// Includes every language offered by Lost in Translation, plus standard BCP-47 variants.
const LANGUAGE_CODE = /^[a-z]{2,3}(?:-[A-Za-z]{2,4})?$/;
const MAX_TEXT = 2000; // Leave room for expansion during long translation chains.

export function splitTranslationText(text, maxBytes = 500) {
  const chunks = [];
  let chunk = '';
  for (const character of text) {
    if (Buffer.byteLength(chunk + character, 'utf8') > maxBytes) {
      // Prefer a word boundary while preserving every source character.
      const boundaries = [...chunk.matchAll(/\s+/g)];
      const last = boundaries.at(-1);
      const splitAt = last && last.index > chunk.length / 2
        ? last.index + last[0].length : chunk.length;
      chunks.push(chunk.slice(0, splitAt));
      chunk = chunk.slice(splitAt);
    }
    chunk += character;
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

function validTranslation(text) {
  return typeof text === 'string' && text.trim().length > 0 && text.length <= MAX_TEXT;
}

export function createHandler({ fetchImpl = fetch, apiKey = process.env.GOOGLE_TRANSLATE_API_KEY, timeoutMs = 20_000 } = {}) {
  return apiHandler(async request => {
    const body = await readJson(request, 16_384);
    const text = requireText(body.text, 'text', MAX_TEXT);
    const sourceLang = requireText(body.sourceLang, 'sourceLang', 12);
    const targetLang = requireText(body.targetLang, 'targetLang', 12);
    if (!LANGUAGE_CODE.test(sourceLang) || !LANGUAGE_CODE.test(targetLang)) {
      throw new ApiError(400, 'invalid_input', 'Invalid source or target language code');
    }
    if (sourceLang === targetLang) return json({ translatedText: text, detectedSourceLanguage: sourceLang });
    const deadline = Date.now() + Math.min(timeoutMs, 20_000);
    const options = () => ({ fetchImpl, timeoutMs: Math.min(6000, deadline - Date.now()) });
    let timedOut = false;
    if (apiKey) {
      try {
        const data = await fetchJson('https://translation.googleapis.com/language/translate/v2', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: text, source: sourceLang, target: targetLang, key: apiKey, format: 'text' }),
        }, options());
        const translatedText = data?.data?.translations?.[0]?.translatedText;
        if (validTranslation(translatedText)) return json({ translatedText, detectedSourceLanguage: sourceLang });
      } catch (error) { timedOut ||= error.status === 504; }
    }
    // MyMemory's query is limited to 500 UTF-8 bytes. Translate all chunks;
    // never silently discard the end of the player's text.
    try {
      const chunks = splitTranslationText(text);
      const translated = [];
      for (let i = 0; i < chunks.length; i += 3) {
        const batch = await Promise.all(chunks.slice(i, i + 3).map(async chunk => {
          const query = new URLSearchParams({ q: chunk, langpair: `${sourceLang}|${targetLang}` });
          const data = await fetchJson(`https://api.mymemory.translated.net/get?${query}`, {}, options());
          const result = data?.responseData?.translatedText;
          if (Number(data?.responseStatus) !== 200 || data?.quotaFinished || !validTranslation(result)) {
            throw new ApiError(502, 'upstream_failure', 'Translation is temporarily unavailable');
          }
          return result;
        }));
        translated.push(...batch);
      }
      const translatedText = translated.reduce((result, chunk, i) => {
        const separator = i > 0 && /\s$/.test(chunks[i - 1]) && !/\s$/.test(result) && !/^\s/.test(chunk) ? ' ' : '';
        return result + separator + chunk;
      }, '');
      if (!validTranslation(translatedText)) throw new ApiError(502, 'upstream_failure', 'Translation exceeded the text limit');
      return json({ translatedText, detectedSourceLanguage: sourceLang });
    } catch (error) { timedOut ||= error.status === 504; }
    throw new ApiError(timedOut ? 504 : 502, timedOut ? 'upstream_timeout' : 'upstream_failure',
      timedOut ? 'Translation took too long. Please retry.' : 'Translation is temporarily unavailable. Please retry.');
  });
}

export default createHandler();
