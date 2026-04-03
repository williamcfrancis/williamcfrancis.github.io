import './styles.css';
import type { Passage, UserAnswer, AggregateStats, GameHistory } from './types';
import passagePool from './passages.json';
import { selectPassages, generateInsight, getScoreTitle, analyzeConfidence, analyzeTimings, type GameInsight } from './game';
import { loadHistory, saveResult, getLastPassageIds } from './storage';
import { submitResults, fetchStats } from './api';
import { shareScore } from './share';

const app = document.getElementById('app')!;

interface AppState {
  screen: 'landing' | 'game' | 'reveal';
  passages: Passage[];
  currentIndex: number;
  answers: UserAnswer[];
  confidence: number;
  aggregateStats: AggregateStats | null;
  history: GameHistory;
  insight: GameInsight | null;
  passageStartTime: number;
  currentStreak: number;
  bestStreak: number;
}

let state: AppState = {
  screen: 'landing',
  passages: [],
  currentIndex: 0,
  answers: [],
  confidence: 75,
  aggregateStats: null,
  history: loadHistory(),
  insight: null,
  passageStartTime: 0,
  currentStreak: 0,
  bestStreak: 0,
};

function init(): void {
  fetchStats().then((stats) => {
    state.aggregateStats = stats;
    if (state.screen === 'landing') renderLanding();
    if (state.screen === 'reveal') renderReveal();
  }).catch(() => {});

  renderLanding();
}

function startGame(): void {
  const lastIds = getLastPassageIds();
  state.passages = selectPassages(passagePool as Passage[], lastIds);
  state.currentIndex = 0;
  state.answers = [];
  state.confidence = 75;
  state.screen = 'game';
  state.insight = null;
  state.currentStreak = 0;
  state.bestStreak = 0;
  renderGame();
}

function submitAnswer(guess: 'human' | 'ai'): void {
  document.querySelectorAll('.btn-guess').forEach(b => {
    (b as HTMLButtonElement).disabled = true;
  });

  const passage = state.passages[state.currentIndex];
  const timeTaken = Date.now() - state.passageStartTime;
  const isCorrect = guess === passage.source;

  const answer: UserAnswer = {
    passageId: passage.id,
    guess,
    confidence: state.confidence,
    correct: isCorrect,
    timeTaken,
  };
  state.answers.push(answer);

  if (isCorrect) {
    state.currentStreak++;
    if (state.currentStreak > state.bestStreak) state.bestStreak = state.currentStreak;
  } else {
    state.currentStreak = 0;
  }

  showFeedback(isCorrect, passage.source);

  setTimeout(() => {
    state.currentIndex++;
    state.confidence = 75;
    if (state.currentIndex >= 10) {
      finishGame();
    } else {
      renderGame();
    }
  }, 900);
}

function showFeedback(correct: boolean, source: 'human' | 'ai'): void {
  const card = document.getElementById('passage-card');
  if (!card) return;

  const overlay = document.createElement('div');
  overlay.className = `feedback-overlay ${correct ? 'feedback-correct' : 'feedback-incorrect'}`;
  overlay.innerHTML = `
    <div class="feedback-icon">${correct ? '&#10003;' : '&#10007;'}</div>
    <div class="feedback-label">${correct ? 'Correct' : 'Wrong'}</div>
    <div class="feedback-source">It was <strong>${source === 'human' ? 'Human' : 'AI'}</strong></div>
  `;
  card.appendChild(overlay);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.add('show');
    });
  });

  const streakEl = document.getElementById('streak');
  if (correct && state.currentStreak >= 2 && streakEl) {
    streakEl.textContent = `\u{1F525} ${state.currentStreak} in a row`;
    streakEl.classList.remove('streak-hidden');
    streakEl.classList.add('streak-pop');
  } else if (!correct && streakEl && state.currentStreak === 0) {
    if (!streakEl.classList.contains('streak-hidden')) {
      streakEl.classList.add('streak-break');
      setTimeout(() => streakEl.classList.add('streak-hidden'), 300);
    }
  }
}

async function finishGame(): Promise<void> {
  const score = state.answers.filter((a) => a.correct).length;
  state.insight = generateInsight(state.passages, state.answers);

  saveResult(state.passages, state.answers, score, state.bestStreak);
  state.history = loadHistory();

  state.screen = 'reveal';
  renderReveal();

  try {
    await submitResults(state.answers);
    const stats = await fetchStats();
    if (stats) {
      state.aggregateStats = stats;
      renderReveal();
    }
  } catch { /* graceful degradation */ }
}

/* ═══════ LANDING SCREEN ═══════ */

function renderLanding(): void {
  const h = state.history;
  const statsLine = state.aggregateStats?.global
    ? `Average score across all visitors: ${state.aggregateStats.global.averageScore.toFixed(1)} / 10`
    : 'Be the first to play.';

  let historyHtml = '';
  if (h.totalGames > 0) {
    const accuracy = ((h.totalCorrect / h.totalAnswered) * 100).toFixed(0);
    const streakStr = (h.bestStreak || 0) >= 2
      ? ` Best streak: <strong>${h.bestStreak}</strong> \u{1F525}`
      : '';
    historyHtml = `
      <div class="landing__history">
        You've played <strong>${h.totalGames}</strong> time${h.totalGames === 1 ? '' : 's'}.
        Lifetime accuracy: <strong>${accuracy}%</strong>.
        Best: <strong>${h.bestScore}/10</strong>.${streakStr}
      </div>
    `;
  }

  app.innerHTML = `
    <div class="landing">
      <h1 class="landing__title">The Turing Shuffle</h1>
      <div class="shuffle-animation">
        ${Array.from({ length: 10 }, () => '<div class="shuffle-card"></div>').join('')}
      </div>
      <p class="landing__subtitle">
        10 passages. Some are human. Some are AI.<br />
        Can you tell the difference?
      </p>
      <button class="btn-begin" id="btn-begin">Begin</button>
      <p class="landing__stat">${statsLine}</p>
      ${historyHtml}
    </div>
  `;

  document.getElementById('btn-begin')!.addEventListener('click', startGame);
}

/* ═══════ GAME SCREEN ═══════ */

function renderGame(): void {
  const p = state.passages[state.currentIndex];
  const progress = ((state.currentIndex) / 10) * 100;
  const streakVisible = state.currentStreak >= 2;

  app.innerHTML = `
    <div class="game">
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${progress}%"></div>
      </div>
      <div class="progress-label">${state.currentIndex + 1} of 10</div>

      <div class="streak-counter ${streakVisible ? '' : 'streak-hidden'}" id="streak">
        \u{1F525} ${state.currentStreak} in a row
      </div>

      <div class="passage-card" id="passage-card">
        <span class="genre-pill">${p.genre}</span>
        <p class="passage-text">${escapeHtml(p.text)}</p>
      </div>

      <div class="controls">
        <div class="confidence-row">
          <span class="confidence-label">Guessing</span>
          <input
            type="range"
            class="confidence-slider"
            id="confidence"
            min="50"
            max="100"
            value="${state.confidence}"
            step="1"
          />
          <span class="confidence-label">Certain</span>
        </div>

        <div class="buttons-row">
          <button class="btn-guess btn-human" id="btn-human">
            <span class="btn-icon">&#9998;</span>
            Human
          </button>
          <button class="btn-guess btn-ai" id="btn-ai">
            <span class="btn-icon">&#9881;</span>
            AI
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('confidence')!.addEventListener('input', (e) => {
    state.confidence = parseInt((e.target as HTMLInputElement).value, 10);
  });

  document.getElementById('btn-human')!.addEventListener('click', () => submitAnswer('human'));
  document.getElementById('btn-ai')!.addEventListener('click', () => submitAnswer('ai'));

  state.passageStartTime = Date.now();
}

/* ═══════ REVEAL SCREEN ═══════ */

function renderReveal(): void {
  const score = state.answers.filter((a) => a.correct).length;
  const pct = (score / 10) * 100;
  const circumference = 2 * Math.PI * 66;
  const offset = circumference - (pct / 100) * circumference;
  const strokeColor = score >= 7 ? 'url(#grad-correct)' : score >= 4 ? 'url(#grad-warn)' : 'url(#grad-incorrect)';

  const { title: scoreTitle, subtitle: scoreSubtitle } = getScoreTitle(score);

  let percentileHtml = '';
  if (state.aggregateStats?.global && state.aggregateStats.global.totalGames > 0) {
    const avg = state.aggregateStats.global.averageScore;
    const percentile = Math.min(99, Math.max(1, Math.round(
      50 + (score - avg) * 15
    )));
    percentileHtml = `<p class="percentile">Better than ${percentile}% of visitors</p>`;
  }

  const bestStreakHtml = state.bestStreak >= 2
    ? `<div class="best-streak">\u{1F525} Best streak: ${state.bestStreak} in a row</div>`
    : '';

  const confidence = analyzeConfidence(state.answers);
  const timings = analyzeTimings(state.answers);

  let confStatsHtml = '';
  if (confidence.highConfAccuracy !== null) {
    confStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When certain (80%+)</span>
        <span class="analysis-stat__value">${Math.round(confidence.highConfAccuracy * 100)}% right</span>
      </div>`;
  }
  if (confidence.lowConfAccuracy !== null) {
    confStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">When guessing (&lt;70%)</span>
        <span class="analysis-stat__value">${Math.round(confidence.lowConfAccuracy * 100)}% right</span>
      </div>`;
  }
  if (confidence.overconfidentCount > 0) {
    confStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Overconfident</span>
        <span class="analysis-stat__value">${confidence.overconfidentCount} time${confidence.overconfidentCount > 1 ? 's' : ''}</span>
      </div>`;
  }
  if (confidence.underconfidentCount > 0) {
    confStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Underconfident</span>
        <span class="analysis-stat__value">${confidence.underconfidentCount} time${confidence.underconfidentCount > 1 ? 's' : ''}</span>
      </div>`;
  }

  let timingStatsHtml = `
    <div class="analysis-stat">
      <span class="analysis-stat__label">Average per passage</span>
      <span class="analysis-stat__value">${formatTime(timings.avgTime)}</span>
    </div>`;
  if (timings.gutAccuracy !== null) {
    timingStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Gut instinct (&lt;5s)</span>
        <span class="analysis-stat__value">${Math.round(timings.gutAccuracy * 100)}% right</span>
      </div>`;
  }
  if (timings.deliberateAccuracy !== null) {
    timingStatsHtml += `
      <div class="analysis-stat">
        <span class="analysis-stat__label">Deliberated (&gt;15s)</span>
        <span class="analysis-stat__value">${Math.round(timings.deliberateAccuracy * 100)}% right</span>
      </div>`;
  }

  const analysisHtml = `
    <div class="analysis-grid">
      <div class="analysis-card">
        <div class="analysis-card__title">Confidence Calibration</div>
        ${confStatsHtml}
        <p class="analysis-card__summary">${escapeHtml(confidence.summary)}</p>
      </div>
      <div class="analysis-card">
        <div class="analysis-card__title">Timing Patterns</div>
        ${timingStatsHtml}
        <p class="analysis-card__summary">${escapeHtml(timings.summary)}</p>
      </div>
    </div>
  `;

  const breakdownHtml = state.passages.map((p, i) => {
    const a = state.answers[i];
    const isCorrect = a.correct;
    const icon = isCorrect ? '&#10003;' : '&#10007;';

    const sourceLabel = p.source === 'human' ? 'Human' : 'AI';
    const sourceMeta = p.source === 'human'
      ? (p.meta.author ? `<div class="reveal-card__meta">${escapeHtml(p.meta.author)}</div>` : '')
      : (p.meta.model
        ? `<div class="reveal-card__meta">${escapeHtml(p.meta.model)}${p.meta.prompt ? ' \u2014 Prompt: \u201C' + escapeHtml(p.meta.prompt) + '\u201D' : ''}</div>`
        : '');

    const difficultyStars = '\u2605'.repeat(p.difficulty) + '\u2606'.repeat(3 - p.difficulty);
    const timeStr = formatTime(a.timeTaken);
    const reactionClass = a.timeTaken < 5000 ? 'gut' : a.timeTaken > 15000 ? 'deliberate' : '';
    const reactionLabel = a.timeTaken < 5000 ? 'Gut instinct' : a.timeTaken > 15000 ? 'Deliberated' : '';

    let communityHtml = '';
    const passageStats = state.aggregateStats?.passages?.[p.id];
    if (passageStats) {
      const total = passageStats.humanVotes + passageStats.aiVotes;
      if (total > 0) {
        const hPct = Math.round((passageStats.humanVotes / total) * 100);
        const aPct = 100 - hPct;
        communityHtml = `
          <div class="community-bar">
            <div class="community-bar__human" style="width:${hPct}%"></div>
            <div class="community-bar__ai" style="width:${aPct}%"></div>
          </div>
          <div class="community-labels">
            <span>${hPct}% said Human</span>
            <span>${aPct}% said AI</span>
          </div>
        `;
      }
    }

    return `
      <div class="reveal-card ${isCorrect ? 'correct' : 'incorrect'}" data-idx="${i}">
        <div class="reveal-card__header">
          <div class="reveal-card__icon">${icon}</div>
          <div>
            <span class="genre-pill">${p.genre}</span>
            <div class="reveal-card__verdict">
              You said <strong>${a.guess === 'human' ? 'Human' : 'AI'}</strong>
              \u2014 Actually <span class="source-label" style="color:${p.source === 'human' ? 'var(--human-start)' : 'var(--ai-start)'}">${sourceLabel}</span>
            </div>
          </div>
        </div>
        <p class="reveal-card__text">${escapeHtml(p.text)}</p>
        <p class="reveal-card__explanation">${p.explanation}</p>
        ${sourceMeta}
        <div class="reveal-card__badges">
          <span class="difficulty-badge" title="Difficulty">${difficultyStars}</span>
          <span class="time-badge">${timeStr}</span>
          ${reactionLabel ? `<span class="reaction-badge ${reactionClass}">${reactionLabel}</span>` : ''}
        </div>
        ${communityHtml}
      </div>
    `;
  }).join('');

  const insight = state.insight;
  const insightHtml = insight ? `
    <div class="insight-section">
      <div class="insight-section__title">Your Pattern</div>
      <p class="insight-section__primary">${escapeHtml(insight.primary)}</p>
      <p class="insight-section__detail">${escapeHtml(insight.detail)}</p>
    </div>
  ` : '';

  app.innerHTML = `
    <div class="reveal">
      <div class="score-header">
        <div class="score-circle">
          <svg viewBox="0 0 140 140">
            <defs>
              <linearGradient id="grad-correct" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--ai-start)" />
                <stop offset="100%" stop-color="var(--ai-end)" />
              </linearGradient>
              <linearGradient id="grad-warn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fbbf24" />
                <stop offset="100%" stop-color="#f97316" />
              </linearGradient>
              <linearGradient id="grad-incorrect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f87171" />
                <stop offset="100%" stop-color="#fb923c" />
              </linearGradient>
            </defs>
            <circle class="score-circle__bg" cx="70" cy="70" r="66" />
            <circle
              class="score-circle__fill"
              cx="70" cy="70" r="66"
              stroke="${strokeColor}"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${circumference}"
              id="score-arc"
            />
          </svg>
          <div class="score-circle__text">
            <div class="score-number">${score}</div>
            <div class="score-label">out of 10</div>
          </div>
        </div>
        <div class="score-rank">
          <div class="score-rank__title">${escapeHtml(scoreTitle)}</div>
          <div class="score-rank__subtitle">${escapeHtml(scoreSubtitle)}</div>
        </div>
        <h2 class="score-title">You got ${score} out of 10 correct</h2>
        ${percentileHtml}
        ${bestStreakHtml}
      </div>

      ${insightHtml}

      ${analysisHtml}

      <div class="breakdown">
        <h3 class="breakdown__title">Passage Breakdown</h3>
        ${breakdownHtml}
      </div>

      <div class="actions">
        <button class="btn-action btn-play-again" id="btn-again">Play Again</button>
        <button class="btn-action btn-share" id="btn-share">Share Score</button>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const arc = document.getElementById('score-arc');
      if (arc) arc.setAttribute('stroke-dashoffset', String(offset));
    });
  });

  document.querySelectorAll('.reveal-card').forEach((card) => {
    card.addEventListener('click', () => card.classList.toggle('expanded'));
  });

  document.getElementById('btn-again')!.addEventListener('click', startGame);
  document.getElementById('btn-share')!.addEventListener('click', () => {
    shareScore(score, 10, state.answers);
  });
}

/* ═══════ HELPERS ═══════ */

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(ms: number): string {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const min = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  return `${min}m ${sec}s`;
}

init();
