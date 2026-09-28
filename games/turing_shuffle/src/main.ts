import './styles.css';
import type { Passage, UserAnswer, AggregateStats, GameHistory } from './types';
import passagePool from './passages.json';
import { selectPassages, generateInsight, getScoreTitle, analyzeConfidence, analyzeTimings, type GameInsight } from './game';
import { loadHistory, saveResult, getLastPassageIds } from './storage';
import { submitResults, fetchStats, communityStatsText } from './api';
import { shareScore } from './share';
import {
  initLatentField,
  setMode as setFieldMode,
  setBias as setFieldBias,
  setStreakActive,
  setReadingTarget,
  fieldPulse,
} from './latentField';
import { morphText } from './twinMorph';

/* ═══════ DOM & MEDIA ═══════ */

const app = document.getElementById('app')!;
const mqReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const fieldCanvas = document.getElementById('latent-field') as HTMLCanvasElement | null;
if (fieldCanvas) initLatentField(fieldCanvas);

/* ═══════ STATE ═══════ */

interface AppState {
  screen: 'landing' | 'game' | 'reveal';
  passages: Passage[];
  currentIndex: number;
  answers: UserAnswer[];
  submissionId: string;
  confidence: number;
  aggregateStats: AggregateStats | null;
  history: GameHistory;
  insight: GameInsight | null;
  passageStartTime: number;
  currentStreak: number;
  bestStreak: number;
  /** True while the Twin Reveal is on screen (between answer and next passage). */
  showingTwin: boolean;
  /** Number of twins seen this session — passed into the share image. */
  twinsSeen: number;
}

let state: AppState = {
  screen: 'landing',
  passages: [],
  currentIndex: 0,
  answers: [],
  submissionId: '',
  confidence: 75,
  aggregateStats: null,
  history: loadHistory(),
  insight: null,
  passageStartTime: 0,
  currentStreak: 0,
  bestStreak: 0,
  showingTwin: false,
  twinsSeen: 0,
};

let answerLocked = false;
let scoreAnimated = false;
let hoveredSide: 'human' | 'ai' | null = null;
let twinController: AbortController | null = null;

/* ═══════ CONSTANTS ═══════ */

const GENRE_COLORS: Record<string, string> = {
  diary: '#f97316',
  review: '#fbbf24',
  fiction: '#a78bfa',
  poem: '#f472b6',
  recipe: '#34d399',
  news: '#60a5fa',
  tweet: '#38bdf8',
  email: '#fb923c',
  wikipedia: '#94a3b8',
  instruction: '#2dd4bf',
  academic: '#818cf8',
};

/* ═══════ UTILITIES ═══════ */

function prefersReducedMotion(): boolean {
  return mqReducedMotion.matches;
}

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

function genrePillHtml(genre: string): string {
  const c = GENRE_COLORS[genre];
  const style = c ? ` style="color:${c}"` : '';
  return `<span class="genre-pill"${style}>${genre}</span>`;
}

function haptic(pattern: number | number[]): void {
  try { navigator.vibrate?.(pattern); } catch { /* unsupported */ }
}

/* ═══════ SCREEN TRANSITIONS ═══════ */

function transitionTo(renderFn: () => void): void {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    renderFn();
    focusFirst();
    return;
  }
  app.classList.add('transitioning');
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    renderFn();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        app.classList.remove('transitioning');
        focusFirst();
      });
    });
  }, 250);
}

function focusFirst(): void {
  const el = app.querySelector<HTMLElement>('button, [tabindex="0"]');
  el?.focus();
}

/* ═══════ SCORE ANIMATION ═══════ */

function animateScoreCountUp(target: number): void {
  const el = document.getElementById('score-num');
  if (!el || target === 0 || prefersReducedMotion()) {
    if (el) el.textContent = String(target);
    return;
  }
  el.textContent = '0';
  const startTime = performance.now();
  const duration = 1500;

  function update(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el!.textContent = String(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ═══════ KEYBOARD ═══════ */

function adjustConfidence(delta: number): void {
  state.confidence = Math.max(50, Math.min(100, state.confidence + delta));
  const slider = document.getElementById('confidence') as HTMLInputElement | null;
  const valueEl = document.getElementById('conf-value');
  if (slider) slider.value = String(state.confidence);
  if (valueEl) valueEl.textContent = `${state.confidence}%`;
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.repeat || e.defaultPrevented) return;
  if ((e.key === 'Enter' || e.key === ' ') && e.target instanceof Element && e.target.closest('button, a, input, select, textarea')) return;
  if (e.target instanceof HTMLTextAreaElement) return;
  if (e.target instanceof HTMLInputElement && (e.target as HTMLInputElement).type === 'text') return;

  switch (state.screen) {
    case 'landing':
      if (e.key === 'Enter') { e.preventDefault(); startGame(); }
      break;
    case 'game':
      if (state.showingTwin) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advanceFromTwin(); }
        return;
      }
      if (answerLocked) return;
      if (e.key === 'h' || e.key === 'H' || e.key === '1') { e.preventDefault(); submitAnswer('human'); }
      else if (e.key === 'a' || e.key === 'A' || e.key === '2') { e.preventDefault(); submitAnswer('ai'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); adjustConfidence(-5); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); adjustConfidence(5); }
      break;
    case 'reveal':
      if (e.key === 'Enter') { e.preventDefault(); startGame(); }
      break;
  }
}

document.addEventListener('keydown', handleKeydown);

/* ═══════ CORE GAME LOGIC ═══════ */

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
  state.submissionId = crypto.randomUUID();
  state.confidence = 75;
  state.screen = 'game';
  state.insight = null;
  state.currentStreak = 0;
  state.bestStreak = 0;
  state.showingTwin = false;
  state.twinsSeen = 0;
  answerLocked = false;
  scoreAnimated = false;
  transitionTo(() => renderGame());
}

function submitAnswer(guess: 'human' | 'ai'): void {
  if (answerLocked) return;
  answerLocked = true;

  const btn = document.getElementById(guess === 'human' ? 'btn-human' : 'btn-ai');
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
    haptic(50);
  } else {
    state.currentStreak = 0;
    haptic([30, 50, 30]);
  }

  // Latent Field reaction: pulse from the button the user pressed
  if (btn) {
    const r = btn.getBoundingClientRect();
    fieldPulse(r.left + r.width / 2, r.top + r.height / 2, isCorrect ? 'correct' : 'incorrect');
  }
  setStreakActive(state.currentStreak >= 3);
  hoveredSide = null;
  setFieldBias(0, 'neutral');

  showFeedback(isCorrect, passage.source);

  // After feedback settles, transition into the Twin Reveal.
  setTimeout(() => beginTwinReveal(passage), 900);
}

/* ═══════ TWIN REVEAL ═══════ */

function beginTwinReveal(passage: Passage): void {
  twinController?.abort();
  const controller = new AbortController();
  twinController = controller;
  state.showingTwin = true;
  state.twinsSeen = Math.max(state.twinsSeen, state.currentIndex + 1);

  const game = app.querySelector<HTMLElement>('.game');
  const card = document.getElementById('passage-card');
  const textEl = card?.querySelector<HTMLElement>('.passage-text') ?? null;
  if (!game || !card || !textEl) return;

  game.classList.add('game--twin');

  // Fade out the existing feedback overlay.
  const overlay = document.querySelector<HTMLElement>('.feedback-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 300);
  }

  // "The twin" label, inserted above the passage card.
  const label = document.createElement('div');
  label.className = 'twin-label';
  label.innerHTML = '<span class="twin-label__bullet">↔</span> The twin';
  card.parentElement!.insertBefore(label, card);
  requestAnimationFrame(() => label.classList.add('show'));

  // Twin source badge next to the genre pill.
  const pill = card.querySelector('.genre-pill');
  if (pill) {
    const badge = document.createElement('span');
    badge.className = `twin-badge twin-badge--${passage.twinSource}`;
    badge.textContent = passage.twinSource === 'human' ? 'now reads as Human' : 'now reads as AI';
    pill.after(badge);
    requestAnimationFrame(() => badge.classList.add('show'));
  }

  // A11y: announce the twin to screen readers.
  const live = document.createElement('div');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.textContent = `Twin reveal — same idea written by the ${passage.twinSource === 'human' ? 'human' : 'AI'}: ${passage.twinText.substring(0, 160)}`;
  card.parentElement!.appendChild(live);
  setTimeout(() => live.remove(), 2000);

  // Latent Field: subtle pulse from the card center, tinted by the twin's source.
  const cardRect = card.getBoundingClientRect();
  fieldPulse(
    cardRect.left + cardRect.width / 2,
    cardRect.top + cardRect.height / 2,
    passage.twinSource === 'human' ? 'human' : 'ai',
  );

  // Run the morph.
  morphText(textEl, passage.text, passage.twinText, {
    duration: 1400,
    signal: controller.signal,
    onComplete: () => {
      if (!controller.signal.aborted && state.showingTwin && state.passages[state.currentIndex] === passage) renderTwinDiffStrip(passage);
    },
  });
}

function renderTwinDiffStrip(passage: Passage): void {
  const game = app.querySelector<HTMLElement>('.game');
  if (!game) return;

  const tellsHtml = passage.tells.map((t, i) => `
    <li class="tell tell--${t.type}" style="--tell-delay: ${i * 90}ms">
      <div class="tell__rule" aria-hidden="true"></div>
      <div class="tell__body">
        <div class="tell__phrase">&ldquo;${escapeHtml(t.phrase)}&rdquo;</div>
        ${t.note ? `<div class="tell__note">${escapeHtml(t.note)}</div>` : ''}
      </div>
    </li>
  `).join('');

  const strip = document.createElement('div');
  strip.className = 'diff-strip';
  strip.innerHTML = `
    <div class="diff-strip__title">What gave it away</div>
    <ul class="diff-strip__list" role="list">${tellsHtml}</ul>
  `;

  const isLast = state.currentIndex >= 9;
  const actions = document.createElement('div');
  actions.className = 'twin-actions';
  actions.innerHTML = `
    <button class="btn-continue" id="btn-continue" type="button" aria-label="${isLast ? 'See your results' : 'Continue to the next passage'}">
      <span class="btn-continue__label">${isLast ? 'See results' : 'Continue'}</span>
      <span class="btn-continue__arrow" aria-hidden="true">→</span>
      <span class="btn-continue__hint" aria-hidden="true">Space</span>
    </button>
  `;

  // Insert before the (now hidden) controls so layout is stable.
  const controls = game.querySelector('.controls');
  if (controls) {
    controls.before(strip);
    controls.before(actions);
  } else {
    game.appendChild(strip);
    game.appendChild(actions);
  }

  requestAnimationFrame(() => {
    strip.classList.add('show');
    actions.classList.add('show');
  });

  document.getElementById('btn-continue')!.addEventListener('click', advanceFromTwin);
  // Focus the continue button so Enter/Space immediately works without re-tab.
  setTimeout(() => document.getElementById('btn-continue')?.focus({ preventScroll: true }), 60);
}

function advanceFromTwin(): void {
  if (!state.showingTwin) return;
  state.showingTwin = false;
  twinController?.abort();
  twinController = null;
  answerLocked = false;
  state.currentIndex++;
  state.confidence = 75;
  if (state.currentIndex >= 10) {
    finishGame();
  } else {
    renderGame();
  }
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

  const dots = document.querySelectorAll('.step-dot');
  const currentDot = dots[state.currentIndex];
  if (currentDot) {
    currentDot.classList.remove('step-dot--active');
    currentDot.classList.add(correct ? 'step-dot--correct' : 'step-dot--incorrect');
  }

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
  const completedSubmissionId = state.submissionId;
  const score = state.answers.filter((a) => a.correct).length;
  state.insight = generateInsight(state.passages, state.answers);

  saveResult(state.passages, state.answers, score, state.bestStreak);
  state.history = loadHistory();

  state.screen = 'reveal';
  transitionTo(() => renderReveal());

  try {
    await submitResults(state.answers, completedSubmissionId);
    const stats = await fetchStats();
    if (stats) {
      state.aggregateStats = stats;
      if (state.screen === 'reveal' && state.submissionId === completedSubmissionId) renderReveal();
    }
  } catch { /* graceful degradation */ }
}

/* ═══════ LANDING SCREEN ═══════ */

function renderLanding(): void {
  const h = state.history;
  const statsLine = communityStatsText(state.aggregateStats);

  let historyHtml = '';
  if (h.totalGames > 0) {
    const accuracy = ((h.totalCorrect / h.totalAnswered) * 100).toFixed(0);
    historyHtml = `
      <div class="landing__history">
        <div class="landing__history-row">
          <span>Games played</span><strong>${h.totalGames}</strong>
        </div>
        <div class="landing__history-row">
          <span>Lifetime accuracy</span><strong>${accuracy}%</strong>
        </div>
        <div class="landing__history-row">
          <span>Best score</span><strong>${h.bestScore}/10</strong>
        </div>
        ${(h.bestStreak || 0) >= 2 ? `
        <div class="landing__history-row">
          <span>Best streak</span><strong>${h.bestStreak} \u{1F525}</strong>
        </div>` : ''}
      </div>
    `;
  }

  app.innerHTML = `
    <div class="landing">
      <h1 class="landing__title">The Turing Shuffle</h1>
      <div class="shuffle-animation" aria-hidden="true">
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

  setFieldMode('idle');
  setStreakActive(false);
  setFieldBias(0, 'neutral');
  hoveredSide = null;
}

/* ═══════ GAME SCREEN ═══════ */

function renderGame(): void {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

  const p = state.passages[state.currentIndex];
  const streakVisible = state.currentStreak >= 2;

  const stepDotsHtml = Array.from({ length: 10 }, (_, i) => {
    let cls = 'step-dot';
    if (i < state.currentIndex) {
      cls += state.answers[i].correct ? ' step-dot--correct' : ' step-dot--incorrect';
    } else if (i === state.currentIndex) {
      cls += ' step-dot--active';
    }
    return `<div class="${cls}"></div>`;
  }).join('');

  app.innerHTML = `
    <div class="game">
      <div class="game-header">
        <div class="step-dots" role="progressbar" aria-valuenow="${state.currentIndex + 1}" aria-valuemin="1" aria-valuemax="10" aria-label="Question ${state.currentIndex + 1} of 10">
          ${stepDotsHtml}
        </div>
        <div class="progress-label">${state.currentIndex + 1} of 10</div>
        <div class="streak-counter ${streakVisible ? '' : 'streak-hidden'}" id="streak">
          \u{1F525} ${state.currentStreak} in a row
        </div>
      </div>

      <div class="passage-card" id="passage-card">
        ${genrePillHtml(p.genre)}
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
            aria-label="Confidence level: ${state.confidence}%"
          />
          <span class="confidence-value" id="conf-value">${state.confidence}%</span>
          <span class="confidence-label">Certain</span>
        </div>

        <div class="buttons-row">
          <button class="btn-guess btn-human" id="btn-human">
            <span class="btn-icon">&#9998;</span>
            Human
            <kbd class="kbd-hint">H</kbd>
          </button>
          <button class="btn-guess btn-ai" id="btn-ai">
            <span class="btn-icon">&#9881;</span>
            AI
            <kbd class="kbd-hint">A</kbd>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('confidence')!.addEventListener('input', (e) => {
    state.confidence = parseInt((e.target as HTMLInputElement).value, 10);
    const valueEl = document.getElementById('conf-value');
    if (valueEl) valueEl.textContent = `${state.confidence}%`;
    if (hoveredSide) setFieldBias(state.confidence / 100, hoveredSide);
  });

  const humanBtn = document.getElementById('btn-human')!;
  const aiBtn = document.getElementById('btn-ai')!;
  humanBtn.addEventListener('click', () => submitAnswer('human'));
  aiBtn.addEventListener('click', () => submitAnswer('ai'));

  // Hover/focus bias — tilts the field toward the side the user is leaning,
  // intensity proportional to the confidence slider.
  const onEnterHuman = () => { hoveredSide = 'human'; setFieldBias(state.confidence / 100, 'human'); };
  const onEnterAi = () => { hoveredSide = 'ai'; setFieldBias(state.confidence / 100, 'ai'); };
  const onLeave = () => { hoveredSide = null; setFieldBias(0, 'neutral'); };
  humanBtn.addEventListener('mouseenter', onEnterHuman);
  humanBtn.addEventListener('focus', onEnterHuman);
  humanBtn.addEventListener('mouseleave', onLeave);
  humanBtn.addEventListener('blur', onLeave);
  aiBtn.addEventListener('mouseenter', onEnterAi);
  aiBtn.addEventListener('focus', onEnterAi);
  aiBtn.addEventListener('mouseleave', onLeave);
  aiBtn.addEventListener('blur', onLeave);

  // Latent Field: pull particles toward the passage card while reading.
  setFieldMode('reading');
  setStreakActive(state.currentStreak >= 3);
  setFieldBias(0, 'neutral');
  hoveredSide = null;
  requestAnimationFrame(() => {
    const card = document.getElementById('passage-card');
    if (card) {
      const r = card.getBoundingClientRect();
      setReadingTarget(r.left + r.width / 2, r.top + r.height / 2);
    }
  });

  state.passageStartTime = Date.now();
}

/* ═══════ REVEAL SCREEN ═══════ */

function renderReveal(): void {
  setFieldMode('reveal');
  setStreakActive(false);
  setFieldBias(0, 'neutral');
  hoveredSide = null;

  const score = state.answers.filter((a) => a.correct).length;
  const pct = (score / 10) * 100;
  const circumference = 2 * Math.PI * 66;
  const offset = circumference - (pct / 100) * circumference;
  const strokeColor = score >= 7 ? 'url(#grad-correct)' : score >= 4 ? 'url(#grad-warn)' : 'url(#grad-incorrect)';
  const glowColor = score >= 7 ? 'rgba(45,212,191,0.25)' : score >= 4 ? 'rgba(251,191,36,0.25)' : 'rgba(248,113,113,0.25)';

  const { title: scoreTitle, subtitle: scoreSubtitle } = getScoreTitle(score);

  let percentileHtml = '';
  if (state.aggregateStats?.global && state.aggregateStats.global.totalGames > 0) {
    const avg = state.aggregateStats.global.averageScore;
    const percentile = Math.min(99, Math.max(1, Math.round(50 + (score - avg) * 15)));
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

  const rm = prefersReducedMotion();
  const breakdownHtml = state.passages.map((p, i) => {
    const a = state.answers[i];
    const isCorrect = a.correct;
    const icon = isCorrect ? '&#10003;' : '&#10007;';
    const delay = rm ? 0 : 0.06 * (i + 1);

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
      <div class="reveal-card ${isCorrect ? 'correct' : 'incorrect'}" data-idx="${i}" style="animation-delay:${delay}s">
        <div class="reveal-card__header">
          <div class="reveal-card__icon">${icon}</div>
          <div>
            ${genrePillHtml(p.genre)}
            <div class="reveal-card__verdict">
              You said <strong>${a.guess === 'human' ? 'Human' : 'AI'}</strong>
              \u2014 Actually <span class="source-label" style="color:${p.source === 'human' ? 'var(--human-start)' : 'var(--ai-start)'}">${sourceLabel}</span>
            </div>
          </div>
        </div>
        <p class="reveal-card__text">${escapeHtml(p.text)}</p>
        <div class="reveal-card__expand-hint">Tap to read more</div>
        <div class="reveal-card__details">
          <div>
            <p class="reveal-card__explanation">${p.explanation}</p>
            ${sourceMeta}
            <div class="reveal-card__badges">
              <span class="difficulty-badge" title="Difficulty">${difficultyStars}</span>
              <span class="time-badge">${timeStr}</span>
              ${reactionLabel ? `<span class="reaction-badge ${reactionClass}">${reactionLabel}</span>` : ''}
            </div>
            ${communityHtml}
          </div>
        </div>
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
        <div class="score-circle" style="filter:drop-shadow(0 0 14px ${glowColor})">
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
            <div class="score-number" id="score-num">${score}</div>
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

  if (!scoreAnimated) {
    scoreAnimated = true;
    animateScoreCountUp(score);
  }

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
    shareScore(score, 10, state.answers, state.twinsSeen);
  });
}

/* ═══════ INIT ═══════ */

init();
