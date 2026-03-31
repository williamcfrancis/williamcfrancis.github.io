import type { Passage, UserAnswer } from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function selectPassages(
  pool: Passage[],
  lastIds: string[],
): Passage[] {
  const avoidSet = new Set(lastIds);
  let humanPool = pool.filter(
    (p) => p.source === 'human' && !avoidSet.has(p.id),
  );
  let aiPool = pool.filter(
    (p) => p.source === 'ai' && !avoidSet.has(p.id),
  );

  // Fallback if we've exhausted the avoid list
  if (humanPool.length < 5) humanPool = pool.filter((p) => p.source === 'human');
  if (aiPool.length < 5) aiPool = pool.filter((p) => p.source === 'ai');

  const selected: Passage[] = [];
  const usedIds = new Set<string>();

  function pick(from: Passage[]): Passage {
    const available = from.filter((p) => !usedIds.has(p.id));
    const p = pickRandom(available);
    usedIds.add(p.id);
    return p;
  }

  // Ensure at least one difficulty-3 from each category
  const hardHuman = humanPool.filter((p) => p.difficulty === 3);
  const hardAI = aiPool.filter((p) => p.difficulty === 3);

  if (hardHuman.length > 0) {
    const p = pickRandom(hardHuman);
    selected.push(p);
    usedIds.add(p.id);
  }
  if (hardAI.length > 0) {
    const p = pickRandom(hardAI);
    selected.push(p);
    usedIds.add(p.id);
  }

  // Fill remaining human slots
  const humanNeeded = 5 - selected.filter((p) => p.source === 'human').length;
  for (let i = 0; i < humanNeeded; i++) {
    selected.push(pick(humanPool));
  }

  // Fill remaining AI slots
  const aiNeeded = 5 - selected.filter((p) => p.source === 'ai').length;
  for (let i = 0; i < aiNeeded; i++) {
    selected.push(pick(aiPool));
  }

  // Verify genre diversity — at least 3 genres
  const genres = new Set(selected.map((p) => p.genre));
  if (genres.size < 3) {
    // Swap a duplicate-genre passage for one from an underrepresented genre
    const genreCounts = new Map<string, number>();
    for (const p of selected) {
      genreCounts.set(p.genre, (genreCounts.get(p.genre) || 0) + 1);
    }
    const overRepresented = [...genreCounts.entries()]
      .filter(([, c]) => c > 1)
      .sort((a, b) => b[1] - a[1]);

    if (overRepresented.length > 0) {
      const [genre] = overRepresented[0];
      const idx = selected.findIndex((p) => p.genre === genre);
      const otherGenrePool = pool.filter(
        (p) => !usedIds.has(p.id) && p.genre !== genre,
      );
      if (otherGenrePool.length > 0 && idx >= 0) {
        const replacement = pickRandom(otherGenrePool);
        selected[idx] = replacement;
        usedIds.add(replacement.id);
      }
    }
  }

  return shuffle(selected);
}

export interface GameInsight {
  primary: string;
  detail: string;
}

export function generateInsight(
  passages: Passage[],
  answers: UserAnswer[],
): GameInsight {
  let humanBias = 0;
  let aiBias = 0;
  const wrongByGenre = new Map<string, number>();
  let polishedFooled = 0;
  let specificityFooled = 0;
  let imperfectionFooled = 0;
  let aiCreativeMissed = 0;
  let aiFunctionalMissed = 0;

  const creativeGenres = new Set(['poem', 'fiction', 'diary', 'tweet']);
  const functionalGenres = new Set([
    'review',
    'recipe',
    'news',
    'wikipedia',
    'email',
    'instruction',
    'academic',
  ]);

  for (let i = 0; i < answers.length; i++) {
    const a = answers[i];
    const p = passages[i];

    if (a.guess === 'human') humanBias++;
    else aiBias++;

    if (!a.correct) {
      wrongByGenre.set(p.genre, (wrongByGenre.get(p.genre) || 0) + 1);

      if (p.source === 'human' && a.guess === 'ai' && p.difficulty >= 2) {
        polishedFooled++;
      }

      if (p.source === 'ai' && a.guess === 'human') {
        if (p.text.match(/street|avenue|road|plaza|1[0-9]{3}|200[0-9]|201[0-9]/i)) {
          specificityFooled++;
        }
        if (p.difficulty >= 2) {
          imperfectionFooled++;
        }
        if (creativeGenres.has(p.genre)) aiCreativeMissed++;
        if (functionalGenres.has(p.genre)) aiFunctionalMissed++;
      }
    }
  }

  const score = answers.filter((a) => a.correct).length;

  if (polishedFooled >= 2) {
    return {
      primary:
        'You consistently flagged polished writing as AI. But some humans are just… good writers.',
      detail:
        'Clean prose and well-structured sentences feel "too perfect" — but professional writers, editors, and journalists produce text like this daily. AI has made us suspicious of quality.',
    };
  }

  if (specificityFooled >= 2) {
    return {
      primary:
        'You trusted specificity. When a passage mentioned a real place or date, you assumed human. AI has learned to exploit this.',
      detail:
        'Planted details — street names, years, sensory descriptions — are the most effective trick in AI\'s arsenal. Real specificity comes from memory; fake specificity comes from training data.',
    };
  }

  if (imperfectionFooled >= 2) {
    return {
      primary:
        'You were fooled by imperfection. AI passages had deliberate "mistakes" — and you marked them as human.',
      detail:
        'Typos, run-on sentences, and hedging language ("I think", "maybe") were once reliable human signals. Now they\'re easily mimicked. The question is whether the imperfection feels organic or performed.',
    };
  }

  if (aiCreativeMissed > aiFunctionalMissed && aiCreativeMissed >= 2) {
    return {
      primary:
        'You caught AI in functional text but missed it in creative writing. AI poetry and fiction slipped past you.',
      detail:
        'Many people assume AI is worse at creative text than functional text. But modern models can produce convincing poems and diary entries — especially when prompted with emotional specificity.',
    };
  }

  if (aiFunctionalMissed > aiCreativeMissed && aiFunctionalMissed >= 2) {
    return {
      primary:
        'You caught every AI poem but missed the AI reviews. AI is better at functional text than creative text — and you knew it intuitively.',
      detail:
        'Reviews, instructions, and news excerpts are AI\'s comfort zone. The structured format and objective tone make it harder to spot the lack of genuine experience behind the words.',
    };
  }

  if (humanBias >= 7) {
    return {
      primary:
        'You leaned heavily toward "Human." You trust writers — but that trust was exploited.',
      detail: `You guessed "Human" ${humanBias} out of 10 times. In a world where AI text is increasingly common, a generous reading might be a liability.`,
    };
  }

  if (aiBias >= 7) {
    return {
      primary:
        'You leaned heavily toward "AI." You\'re suspicious of text — and sometimes that suspicion backfired.',
      detail: `You guessed "AI" ${aiBias} out of 10 times. Healthy skepticism is good, but over-suspicion can make you dismiss authentic human expression.`,
    };
  }

  if (score >= 9) {
    return {
      primary:
        'You have a remarkably calibrated sense for AI text. Very few visitors score this high.',
      detail:
        'Whether through intuition or analysis, you can distinguish the subtle patterns that separate human expression from machine generation. The question is: how long will that edge last?',
    };
  }

  if (score <= 3) {
    return {
      primary:
        'This is a humbling result — but that\'s the point. The line between human and AI writing is thinner than most people think.',
      detail:
        'Don\'t worry: most visitors struggle with these passages. They were specifically chosen to challenge assumptions. The real takeaway is what you learned about your own biases.',
    };
  }

  return {
    primary:
      'Your accuracy was middle-of-the-road — which means you\'re experiencing the same uncertainty as most visitors.',
    detail:
      'You got some right on instinct and some wrong despite confidence. The passages that fooled you reveal where your mental model of "AI writing" diverges from reality.',
  };
}
