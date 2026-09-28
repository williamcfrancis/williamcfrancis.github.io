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
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Translation failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export interface MeaningScore {
  drift: number;
  hint: string;
}

export async function scoreMeaningDrift(
  pairs: { original: string; translation: string }[],
): Promise<MeaningScore[]> {
  const response = await fetch('/.netlify/functions/meaning-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pairs }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Meaning scoring failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data?.scores) || data.scores.length !== pairs.length ||
      data.scores.some((score: MeaningScore) => !score || !Number.isFinite(score.drift) || score.drift < 0 || score.drift > 1 || typeof score.hint !== 'string')) {
    throw new Error('Malformed meaning-score response');
  }
  return data.scores;
}
