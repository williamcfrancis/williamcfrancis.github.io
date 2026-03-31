import type { UserAnswer, AggregateStats } from './types';

const API_BASE = '/.netlify/functions/turing-stats';

export async function submitResults(answers: UserAnswer[]): Promise<void> {
  const payload = answers.map((a) => ({
    passageId: a.passageId,
    userGuess: a.guess,
    confidence: a.confidence,
    correct: a.correct,
  }));

  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: payload }),
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
}

export async function fetchStats(): Promise<AggregateStats | null> {
  try {
    const res = await fetch(API_BASE, { method: 'GET' });
    if (!res.ok) return null;
    return (await res.json()) as AggregateStats;
  } catch {
    return null;
  }
}
