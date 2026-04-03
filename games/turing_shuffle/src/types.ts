export interface Passage {
  id: string;
  text: string;
  source: 'human' | 'ai';
  genre: string;
  wordCount: number;
  difficulty: 1 | 2 | 3;
  explanation: string;
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
