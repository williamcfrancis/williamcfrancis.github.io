import type { TranslateResponse } from './types';

export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string,
): Promise<TranslateResponse> {
  const response = await fetch('/.netlify/functions/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, sourceLang, targetLang }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Translation failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}
