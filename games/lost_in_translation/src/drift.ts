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

export function calculateDrift(original: string, backTranslated: string): number {
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
