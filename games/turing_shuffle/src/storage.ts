import type { GameHistory, GameResult, UserAnswer, Passage } from './types';

const STORAGE_KEY = 'turing_shuffle_history';
const LAST_IDS_KEY = 'turing_shuffle_last_ids';

function defaultHistory(): GameHistory {
  return {
    totalGames: 0,
    totalCorrect: 0,
    totalAnswered: 0,
    bestScore: 0,
    bestStreak: 0,
    results: [],
    passageMisses: {},
  };
}

export function loadHistory(): GameHistory {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultHistory();
    return JSON.parse(raw) as GameHistory;
  } catch {
    return defaultHistory();
  }
}

export function saveResult(
  passages: Passage[],
  answers: UserAnswer[],
  score: number,
  bestStreak: number,
): void {
  const history = loadHistory();
  const result: GameResult = {
    date: Date.now(),
    score,
    total: answers.length,
    passageIds: passages.map((p) => p.id),
    answers,
    bestStreak,
  };

  history.totalGames++;
  history.totalCorrect += score;
  history.totalAnswered += answers.length;
  if (score > history.bestScore) history.bestScore = score;
  if (bestStreak > (history.bestStreak || 0)) history.bestStreak = bestStreak;

  history.results.push(result);

  for (const a of answers) {
    if (!a.correct) {
      history.passageMisses[a.passageId] =
        (history.passageMisses[a.passageId] || 0) + 1;
    }
  }

  if (history.results.length > 50) {
    history.results = history.results.slice(-50);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  localStorage.setItem(
    LAST_IDS_KEY,
    JSON.stringify(passages.map((p) => p.id)),
  );
}

export function getLastPassageIds(): string[] {
  try {
    const raw = localStorage.getItem(LAST_IDS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}
