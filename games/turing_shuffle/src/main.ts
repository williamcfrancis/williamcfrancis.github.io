import './styles.css';
import type { Passage, UserAnswer, AggregateStats, GameHistory } from './types';
import passagePool from './passages.json';
import { selectPassages, generateInsight, type GameInsight } from './game';
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
  renderGame();
}

function submitAnswer(guess: 'human' | 'ai'): void {
  const passage = state.passages[state.currentIndex];
  const answer: UserAnswer = {
    passageId: passage.id,
    guess,
    confidence: state.confidence,
    correct: guess === passage.source,
  };
  state.answers.push(answer);

  const btn = document.querySelector(
    guess === 'human' ? '.btn-human' : '.btn-ai',
  );
  btn?.classList.add('flash');

  setTimeout(() => {
    state.currentIndex++;
    state.confidence = 75;
    if (state.currentIndex >= 10) {
      finishGame();
    } else {
      renderGame();
    }
  }, 250);
}

async function finishGame(): Promise<void> {
  const score = state.answers.filter((a) => a.correct).length;
  state.insight = generateInsight(state.passages, state.answers);

  saveResult(state.passages, state.answers, score);
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
    historyHtml = `
      <div class="landing__history">
        You've played <strong>${h.totalGames}</strong> time${h.totalGames === 1 ? '' : 's'}.
        Lifetime accuracy: <strong>${accuracy}%</strong>.
        Best: <strong>${h.bestScore}/10</strong>.
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

  app.innerHTML = `
    <div class="game">
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${progress}%"></div>
      </div>
      <div class="progress-label">${state.currentIndex + 1} of 10</div>

      <div class="passage-card">
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
}

/* ═══════ REVEAL SCREEN ═══════ */

function renderReveal(): void {
  const score = state.answers.filter((a) => a.correct).length;
  const pct = (score / 10) * 100;
  const circumference = 2 * Math.PI * 66;
  const offset = circumference - (pct / 100) * circumference;
  const strokeColor = score >= 7 ? 'url(#grad-correct)' : score >= 4 ? 'url(#grad-warn)' : 'url(#grad-incorrect)';

  let percentileHtml = '';
  if (state.aggregateStats?.global && state.aggregateStats.global.totalGames > 0) {
    const avg = state.aggregateStats.global.averageScore;
    const percentile = Math.min(99, Math.max(1, Math.round(
      50 + (score - avg) * 15
    )));
    percentileHtml = `<p class="percentile">Better than ${percentile}% of visitors</p>`;
  }

  const breakdownHtml = state.passages.map((p, i) => {
    const a = state.answers[i];
    const isCorrect = a.correct;
    const icon = isCorrect ? '&#10003;' : '&#10007;';

    const sourceLabel = p.source === 'human' ? 'Human' : 'AI';
    const sourceMeta = p.source === 'human'
      ? (p.meta.author ? `<div class="reveal-card__meta">${escapeHtml(p.meta.author)}</div>` : '')
      : (p.meta.model
        ? `<div class="reveal-card__meta">${escapeHtml(p.meta.model)}${p.meta.prompt ? ' — Prompt: "' + escapeHtml(p.meta.prompt) + '"' : ''}</div>`
        : '');

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
              — Actually <span class="source-label" style="color:${p.source === 'human' ? 'var(--human-start)' : 'var(--ai-start)'}">${sourceLabel}</span>
            </div>
          </div>
        </div>
        <p class="reveal-card__text">${escapeHtml(p.text)}</p>
        <p class="reveal-card__explanation">${p.explanation}</p>
        ${sourceMeta}
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
        <h2 class="score-title">You got ${score} out of 10 correct</h2>
        ${percentileHtml}
      </div>

      ${insightHtml}

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

  // Animate score arc
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const arc = document.getElementById('score-arc');
      if (arc) arc.setAttribute('stroke-dashoffset', String(offset));
    });
  });

  // Expandable reveal cards
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

init();
