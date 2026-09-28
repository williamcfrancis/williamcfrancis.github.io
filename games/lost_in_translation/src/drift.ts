import { scoreMeaningDrift, type MeaningScore } from './api';

export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }

  return dp[m][n];
}

function normalize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

export function wordOverlap(original: string, translated: string): number {
  const origWords = normalize(original);
  const transWords = new Set(normalize(translated));
  if (origWords.length === 0) return 0;
  const preserved = origWords.filter(w => transWords.has(w)).length;
  return preserved / origWords.length;
}

export function calculateDriftFallback(original: string, backTranslated: string): number {
  const overlap = wordOverlap(original, backTranslated);
  const maxLen = Math.max(original.length, backTranslated.length);
  const levDist =
    maxLen > 0
      ? levenshteinDistance(original.toLowerCase(), backTranslated.toLowerCase()) / maxLen
      : 0;

  const drift = 0.6 * (1 - overlap) + 0.4 * levDist;
  return Math.min(1, Math.max(0, drift));
}

export function compareWords(
  original: string,
  final: string,
): { word: string; preserved: boolean }[] {
  const finalWords = new Set(normalize(final));
  return original.split(/\s+/).map(word => ({
    word,
    preserved: finalWords.has(word.toLowerCase().replace(/[^\w]/g, '')),
  }));
}

function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

const MEANING_CACHE_KEY = 'lit_meaning_v1';
const MAX_MEANING_ENTRIES = 500;

interface MeaningCacheEntry extends MeaningScore {
  t: number;
}

function readMeaningCache(): Record<string, MeaningCacheEntry> {
  try {
    const raw = localStorage.getItem(MEANING_CACHE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    return cache && typeof cache === 'object' && !Array.isArray(cache) ? cache : {};
  } catch {
    return {};
  }
}

function writeMeaningCache(cache: Record<string, MeaningCacheEntry>): void {
  try {
    const entries = Object.entries(cache);
    if (entries.length > MAX_MEANING_ENTRIES) {
      const trimmed = entries
        .sort((a, b) => b[1].t - a[1].t)
        .slice(0, MAX_MEANING_ENTRIES);
      cache = Object.fromEntries(trimmed);
    }
    localStorage.setItem(MEANING_CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* storage full or unavailable */
  }
}

function meaningCacheKey(original: string, translation: string): string {
  return fnv1a(`${original.trim().toLowerCase()}\u0001${translation.trim().toLowerCase()}`);
}

export function getCachedMeaningScore(
  original: string,
  translation: string,
): MeaningScore | null {
  const cache = readMeaningCache();
  const entry = cache[meaningCacheKey(original, translation)];
  if (!entry || !Number.isFinite(entry.drift) || entry.drift < 0 || entry.drift > 1 || typeof entry.hint !== 'string') return null;
  return { drift: entry.drift, hint: entry.hint };
}

export function setCachedMeaningScore(
  original: string,
  translation: string,
  score: MeaningScore,
): void {
  const cache = readMeaningCache();
  cache[meaningCacheKey(original, translation)] = { ...score, t: Date.now() };
  writeMeaningCache(cache);
}

export async function calculateSemanticDrift(
  original: string,
  backTranslated: string,
): Promise<MeaningScore> {
  if (!backTranslated || !backTranslated.trim()) {
    return { drift: 0, hint: '' };
  }

  const cached = getCachedMeaningScore(original, backTranslated);
  if (cached) return cached;

  try {
    const [score] = await scoreMeaningDrift([{ original, translation: backTranslated }]);
    setCachedMeaningScore(original, backTranslated, score);
    return score;
  } catch (err) {
    console.warn('[drift] semantic scoring failed, using fallback:', err);
    return { drift: calculateDriftFallback(original, backTranslated), hint: '' };
  }
}
