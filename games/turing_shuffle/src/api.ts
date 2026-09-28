import type { UserAnswer, AggregateStats } from './types';

const API_BASE = '/.netlify/functions/turing-stats';

interface SubmissionOptions {
  fetchImpl?: typeof fetch;
  now?: () => number;
  sleep?: (ms: number) => Promise<void>;
  timeoutMs?: number;
}

export async function submitResults(answers: UserAnswer[], submissionId: string, options: SubmissionOptions = {}): Promise<void> {
  const payload = answers.map((a) => ({
    passageId: a.passageId,
    userGuess: a.guess,
  }));

  // Serialize once: ambiguous network failures must replay the SAME UUID and answers.
  const body = JSON.stringify({ submissionId, answers: payload });
  const fetchImpl = options.fetchImpl ?? fetch;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? (ms => new Promise(resolve => setTimeout(resolve, ms)));
  const deadline = now() + Math.min(options.timeoutMs ?? 20_000, 20_000);
  let lastError: unknown = new Error('Community statistics submission timed out');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const remaining = deadline - now();
    if (remaining <= 0) throw lastError;
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let response: Response | undefined;
    try {
      response = await Promise.race([
        fetchImpl(API_BASE, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal: controller.signal }),
        new Promise<never>((_, reject) => {
          timer = setTimeout(() => {
            controller.abort();
            reject(new Error('Community statistics submission timed out'));
          }, Math.min(12_000, remaining));
        }),
      ]);
    } catch (error) { lastError = error; }
    finally { clearTimeout(timer); }
    if (response?.ok) return;
    if (response) {
      lastError = new Error(`API error: ${response.status}`);
      if (response.status !== 429 && response.status < 500) throw lastError;
    }
    if (attempt === 2) throw lastError;
    let delay = 250 * 2 ** attempt;
    const retryAfter = response?.headers.get('Retry-After');
    if (retryAfter) {
      const seconds = Number(retryAfter);
      const serverDelay = Number.isFinite(seconds) ? seconds * 1000 : Date.parse(retryAfter) - now();
      if (Number.isFinite(serverDelay)) delay = Math.max(delay, serverDelay);
    }
    // Do not retry earlier than Retry-After or extend the overall 20-second budget.
    if (now() + delay >= deadline) throw lastError;
    await sleep(delay);
  }
}

export function communityStatsText(stats: AggregateStats | null): string {
  if (!stats) return 'Community statistics are temporarily unavailable.';
  if (stats.global.totalGames === 0) return 'Be the first to play.';
  return `Average score across all visitors: ${stats.global.averageScore.toFixed(1)} / 10`;
}

export async function fetchStats(): Promise<AggregateStats | null> {
  try {
    const res = await fetch(API_BASE, { method: 'GET', signal: AbortSignal.timeout(12_000) });
    if (!res.ok) return null;
    return (await res.json()) as AggregateStats;
  } catch {
    return null;
  }
}
