export interface Tell {
  /** A phrase from the passage's `text` (case-sensitive, exact match) that signals the source. */
  phrase: string;
  /** Which authorship the phrase points toward. */
  type: 'human' | 'ai';
  /** Optional one-line note shown in the Twin Reveal diff strip. */
  note?: string;
}

export interface Passage {
  id: string;
  text: string;
  source: 'human' | 'ai';
  genre: string;
  wordCount: number;
  difficulty: 1 | 2 | 3;
  explanation: string;
  /**
   * The twin: the same idea written by the opposite source. Shown after the
   * user answers — passage text morphs into this, revealing the contrast.
   */
  twinText: string;
  twinSource: 'human' | 'ai';
  /** 1–3 phrases from `text` that are the strongest authorship tells. */
  tells: Tell[];
  meta: {
    author?: string;
    model?: string;
    prompt?: string;
  };
}

export interface UserAnswer {
  passageId: string;
  guess: 'human' | 'ai';
  confidence: number;
  correct: boolean;
  timeTaken: number;
}

export interface GameResult {
  date: number;
  score: number;
  total: number;
  passageIds: string[];
  answers: UserAnswer[];
  bestStreak: number;
}

export interface GameHistory {
  totalGames: number;
  totalCorrect: number;
  totalAnswered: number;
  bestScore: number;
  bestStreak: number;
  results: GameResult[];
  passageMisses: Record<string, number>;
}

export interface AggregateStats {
  passages: Record<string, { humanVotes: number; aiVotes: number }>;
  global: {
    totalGames: number;
    totalCorrect: number;
    averageScore: number;
  };
}
