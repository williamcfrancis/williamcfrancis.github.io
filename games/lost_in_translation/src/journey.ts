import type { Language, TranslationStep, TranslationChain } from './types';
import { countryCodeToFlag } from './languages';
import { translateText } from './api';
import { calculateSemanticDrift, calculateDriftFallback } from './drift';
import { journeyAudio } from './audio';
import { transliterate as romanize } from 'transliteration';

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

function escapeHtml(text: string): string {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

const DRIFT_REACTIONS: { threshold: number; messages: string[] }[] = [
  { threshold: 0.05, messages: ['The meaning holds.', 'Remarkably faithful.', 'Unchanged.'] },
  { threshold: 0.15, messages: ['A subtle shift.', 'Almost there.', 'Close, but not quite.'] },
  { threshold: 0.30, messages: ['The words are wandering.', 'A quiet reinterpretation.', 'Drifting.'] },
  { threshold: 0.50, messages: ['The meaning is splitting.', 'Something changed along the way.', 'A different story now.'] },
  { threshold: 0.70, messages: ['Barely recognizable.', 'The original is fading.', 'A new sentence is forming.'] },
  { threshold: 1.0, messages: ['An entirely new thought.', 'The original is a distant memory.', 'Completely transformed.'] },
];

function getDriftReaction(drift: number): string {
  for (const tier of DRIFT_REACTIONS) {
    if (drift <= tier.threshold) {
      return tier.messages[Math.floor(Math.random() * tier.messages.length)];
    }
  }
  return DRIFT_REACTIONS[DRIFT_REACTIONS.length - 1].messages[0];
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function createJourneyScreen(
  container: HTMLElement,
  sentence: string,
  chain: Language[],
  onComplete: (result: TranslationChain) => void,
  onCancel?: () => void,
): void {
  const totalSteps = chain.length - 1;
  let cancelled = false;
  let skipRequested = false;

  container.innerHTML = `
    <div class="journey" role="region" aria-label="Translation journey" aria-live="polite">
      <div class="drift-meter">
        <div class="drift-label">
          <span id="drift-pct">0%</span> drift
        </div>
        <div class="drift-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div class="drift-fill" id="drift-fill"></div>
        </div>
        <div class="drift-reaction hidden" id="drift-reaction"></div>
      </div>

      <div class="translation-display">
        <div class="current-lang" id="current-lang">
          <span class="lang-flag" id="lang-flag">${countryCodeToFlag(chain[0].countryCode)}</span>
          <span class="lang-name" id="lang-name">${chain[0].name}</span>
          <span class="step-badge" id="step-badge">START</span>
        </div>
        <div class="translation-text-wrapper">
          <div class="translation-text" id="ttext">${escapeHtml(sentence)}</div>
          <div class="shimmer-overlay hidden" id="shimmer"></div>
        </div>
        <div class="transliteration hidden" id="translit"></div>
        <div class="back-translation hidden" id="back-trans">
          <span class="back-trans-label">In English:</span>
          <span class="back-trans-text" id="back-trans-text"></span>
        </div>
      </div>

      <div class="station-track-wrapper">
        <div class="station-track" id="station-track">
          ${chain
            .map(
              (lang, i) => `
            <div class="station${i === 0 ? ' completed' : ''}" id="st-${i}">
              ${i > 0 ? '<div class="station-connector"></div>' : ''}
              <div class="station-node${i === 0 ? ' active done' : ''}">
                <span class="station-flag">${countryCodeToFlag(lang.countryCode)}</span>
                <span class="station-check${i === 0 ? '' : ' hidden'}">&#10003;</span>
              </div>
              <div class="station-label">${lang.name}</div>
            </div>`,
            )
            .join('')}
        </div>
      </div>

      <div class="journey-footer">
        <span id="step-counter">0</span> / ${totalSteps} translations
        <div class="journey-controls">
          <button class="btn-ghost btn-small btn-audio-toggle${journeyAudio.isEnabled() ? ' on' : ''}" id="audio-btn" aria-label="Toggle audio narration" aria-pressed="${journeyAudio.isEnabled()}" ${journeyAudio.isSupported() ? '' : 'hidden'}>
            <span class="audio-icon" aria-hidden="true">${journeyAudio.isEnabled() ? '\u{1F50A}' : '\u{1F507}'}</span>
            <span class="audio-label">${journeyAudio.isEnabled() ? 'Sound on' : 'Sound off'}</span>
          </button>
          <button class="btn-ghost btn-small" id="skip-btn" aria-label="Skip to results">Skip to end</button>
          <button class="btn-ghost btn-small" id="cancel-btn" aria-label="Cancel and go back">&larr; Cancel</button>
        </div>
      </div>

      <div class="journey-error hidden" id="journey-error" role="alert">
        <span class="error-text" id="error-text"></span>
        <button class="btn-small btn-secondary" id="retry-btn">Retry</button>
      </div>
    </div>
  `;

  const driftFill = container.querySelector('#drift-fill') as HTMLElement;
  const driftBar = container.querySelector('.drift-bar') as HTMLElement;
  const driftPct = container.querySelector('#drift-pct') as HTMLElement;
  const driftReaction = container.querySelector('#drift-reaction') as HTMLElement;
  const ttext = container.querySelector('#ttext') as HTMLElement;
  const shimmer = container.querySelector('#shimmer') as HTMLElement;
  const translit = container.querySelector('#translit') as HTMLElement;
  const backTrans = container.querySelector('#back-trans') as HTMLElement;
  const backTransText = container.querySelector('#back-trans-text') as HTMLElement;
  const langFlag = container.querySelector('#lang-flag') as HTMLElement;
  const langName = container.querySelector('#lang-name') as HTMLElement;
  const stepBadge = container.querySelector('#step-badge') as HTMLElement;
  const stepCounter = container.querySelector('#step-counter') as HTMLElement;
  const errorEl = container.querySelector('#journey-error') as HTMLElement;
  const errorText = container.querySelector('#error-text') as HTMLElement;

  const holdResolvers: (() => void)[] = [];

  container.querySelector('#cancel-btn')!.addEventListener('click', () => {
    cancelled = true;
    journeyAudio.cancel();
    retryResolve?.();
    holdResolvers.forEach(resolve => resolve());
    holdResolvers.length = 0;
    onCancel?.();
  });

  container.querySelector('#skip-btn')!.addEventListener('click', () => {
    skipRequested = true;
    journeyAudio.cancel();
    holdResolvers.forEach(resolve => resolve());
    holdResolvers.length = 0;
  });

  const audioBtn = container.querySelector('#audio-btn') as HTMLButtonElement | null;
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const next = !journeyAudio.isEnabled();
      journeyAudio.setEnabled(next);
      audioBtn.classList.toggle('on', next);
      audioBtn.setAttribute('aria-pressed', String(next));
      const icon = audioBtn.querySelector('.audio-icon');
      const label = audioBtn.querySelector('.audio-label');
      if (icon) icon.textContent = next ? '\u{1F50A}' : '\u{1F507}';
      if (label) label.textContent = next ? 'Sound on' : 'Sound off';
    });
  }

  const stepBuffer: TranslationStep[] = [];
  const driftJobs: Promise<unknown>[] = [];
  let producerDone = false;
  let retryResolve: (() => void) | null = null;

  function showError(msg: string): Promise<void> {
    return new Promise(resolve => {
      errorText.textContent = msg;
      errorEl.classList.remove('hidden');
      retryResolve = () => {
        errorEl.classList.add('hidden');
        resolve();
      };
    });
  }

  container.querySelector('#retry-btn')!.addEventListener('click', () => {
    retryResolve?.();
  });

  async function translateWithRetry(
    text: string, src: string, tgt: string, maxAttempts = 3,
  ) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      if (cancelled) throw new Error('cancelled');
      try {
        return await translateText(text, src, tgt);
      } catch (err) {
        if (attempt === maxAttempts) {
          await showError(`Translation failed. Check your connection.`);
          if (cancelled) throw new Error('cancelled');
          return translateText(text, src, tgt);
        }
        await sleep(1000 * attempt);
      }
    }
    throw new Error('unreachable');
  }

  async function produce() {
    let currentText = sentence;

    for (let i = 0; i < totalSteps; i++) {
      if (cancelled) return;
      const src = chain[i];
      const tgt = chain[i + 1];

      try {
        const fwd = await translateWithRetry(currentText, src.code, tgt.code);
        if (cancelled) return;
        currentText = fwd.translatedText;

        const step: TranslationStep = {
          language: tgt,
          text: currentText,
          transliteration: tgt.nonLatin ? safeRomanize(currentText) : undefined,
          backTranslation: '',
          driftScore: (i + 1) / totalSteps,
        };

        stepBuffer.push(step);

        if (tgt.code === 'en') {
          step.backTranslation = currentText;
          step.driftScore = calculateDriftFallback(sentence, currentText);
          driftJobs.push(calculateSemanticDrift(sentence, currentText)
            .then(score => {
              step.driftScore = score.drift;
              step.driftHint = score.hint;
            })
            .catch(() => {
              step.driftScore = calculateDriftFallback(sentence, step.text);
            }));
        } else {
          driftJobs.push(translateText(currentText, tgt.code, 'en')
            .then(async back => {
              step.backTranslation = back.translatedText;
              step.driftScore = calculateDriftFallback(sentence, back.translatedText);
              try {
                const score = await calculateSemanticDrift(sentence, back.translatedText);
                step.driftScore = score.drift;
                step.driftHint = score.hint;
              } catch {
                step.driftScore = calculateDriftFallback(sentence, back.translatedText);
              }
            })
            .catch(() => {}));
        }
      } catch (err) {
        if (cancelled) return;
        console.error(`Step ${i} failed:`, err);
        stepBuffer.push({
          language: tgt,
          text: currentText,
          backTranslation: '',
          driftScore: (i + 1) / totalSteps,
        });
      }
    }
    producerDone = true;
  }

  async function consume() {
    for (let i = 0; i < totalSteps; i++) {
      if (cancelled) return;

      while (stepBuffer.length <= i && !producerDone && !cancelled) {
        await sleep(150);
      }
      if (cancelled) return;
      if (stepBuffer.length <= i) break;

      if (skipRequested) {
        fastForwardStep(stepBuffer[i], i);
      } else {
        await animateStep(stepBuffer[i], i);
      }
    }

    if (cancelled) return;
    await sleep(skipRequested ? 200 : 800);
    // Scoring is parallel with the animation, but results must use settled
    // scores rather than the provisional step-progress value.
    await Promise.allSettled(driftJobs);
    if (cancelled) return;
    journeyAudio.cancel();

    const steps = stepBuffer.slice();
    onComplete({
      original: sentence,
      chain,
      steps,
      finalText: steps[steps.length - 1]?.text ?? sentence,
      totalDrift: steps[steps.length - 1]?.driftScore ?? 0,
      timestamp: Date.now(),
    });
  }

  async function waitForBackTranslation(step: TranslationStep, maxWait: number): Promise<void> {
    const start = Date.now();
    while (!step.backTranslation && Date.now() - start < maxWait && !cancelled && !skipRequested) {
      await sleep(100);
    }
  }

  function fastForwardStep(step: TranslationStep, idx: number) {
    const station = container.querySelector(`#st-${idx + 1}`) as HTMLElement;
    const prevStation = container.querySelector(`#st-${idx}`) as HTMLElement;
    const node = station.querySelector('.station-node')!;

    prevStation.classList.add('completed');
    const prevCheck = prevStation.querySelector('.station-check');
    if (prevCheck) prevCheck.classList.remove('hidden');
    node.classList.add('done');
    station.classList.add('completed');
    station.querySelector('.station-check')!.classList.remove('hidden');

    langFlag.textContent = countryCodeToFlag(step.language.countryCode);
    langName.textContent = step.language.name;
    stepBadge.textContent = `${idx + 1} / ${totalSteps}`;
    ttext.textContent = step.text;
    stepCounter.textContent = String(idx + 1);

    const drift = step.driftScore;
    driftFill.style.width = `${drift * 100}%`;
    driftPct.textContent = `${Math.round(drift * 100)}%`;
  }

  const isLastStepEnglish = chain[chain.length - 1]?.code === 'en';

  async function animateStep(step: TranslationStep, idx: number) {
    const station = container.querySelector(`#st-${idx + 1}`) as HTMLElement;
    const prevStation = container.querySelector(`#st-${idx}`) as HTMLElement;
    const isLastStep = idx === totalSteps - 1;
    const reduced = prefersReducedMotion();

    station.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    langFlag.textContent = countryCodeToFlag(step.language.countryCode);
    langName.textContent = step.language.name;
    stepBadge.textContent = `${idx + 1} / ${totalSteps}`;
    if (!reduced) {
      langFlag.classList.remove('bounce');
      void langFlag.offsetWidth;
      langFlag.classList.add('bounce');
    }

    const node = station.querySelector('.station-node')!;
    node.classList.add('active');

    shimmer.classList.remove('hidden');
    ttext.classList.add('fading');
    translit.classList.add('hidden');
    backTrans.classList.add('hidden');

    await sleep(reduced ? 200 : 700);

    shimmer.classList.add('hidden');
    ttext.classList.remove('fading');
    ttext.dir = step.language.rtl ? 'rtl' : 'ltr';

    if (reduced) {
      ttext.textContent = step.text;
    } else {
      await typewriter(ttext, step.text);
    }

    if (cancelled) return;
    if (!skipRequested && journeyAudio.isEnabled()) {
      journeyAudio.speak(step.text, step.language.code).catch(() => {});
    }

    if (step.transliteration && step.transliteration !== step.text) {
      translit.textContent = step.transliteration;
      translit.classList.remove('hidden');
    }

    const showBackTrans = !(isLastStep && isLastStepEnglish);
    if (showBackTrans) {
      await waitForBackTranslation(step, 2000);
      if (step.backTranslation) {
        backTransText.textContent = '';
        backTrans.classList.remove('hidden');
        backTrans.classList.remove('back-trans-pop');
        void backTrans.offsetWidth;
        backTrans.classList.add('back-trans-pop');
        if (reduced) {
          backTransText.textContent = `"${step.backTranslation}"`;
        } else {
          await typewriter(backTransText, `"${step.backTranslation}"`);
        }
        if (!cancelled && !skipRequested && journeyAudio.isEnabled()) {
          journeyAudio.speak(step.backTranslation, 'en').catch(() => {});
        }
      }
    }

    const drift = step.driftScore;
    driftFill.style.width = `${drift * 100}%`;
    driftBar.setAttribute('aria-valuenow', String(Math.round(drift * 100)));
    driftPct.textContent = `${Math.round(drift * 100)}%`;

    if (drift < 0.33) {
      driftFill.style.background = '#4ecdc4';
    } else if (drift < 0.66) {
      driftFill.style.background = 'linear-gradient(90deg, #4ecdc4, #f7dc6f)';
    } else {
      driftFill.style.background = 'linear-gradient(90deg, #f7dc6f, #ff6b6b)';
    }

    const reaction = getDriftReaction(drift);
    driftReaction.textContent = reaction;
    driftReaction.classList.remove('hidden', 'reaction-pop');
    void driftReaction.offsetWidth;
    driftReaction.classList.add('reaction-pop');

    if (drift > 0.4 && !reduced) {
      spawnOrbs(container.querySelector('.translation-display')!, drift);
    }

    prevStation.classList.add('completed');
    const prevCheck = prevStation.querySelector('.station-check');
    if (prevCheck) prevCheck.classList.remove('hidden');

    node.classList.remove('active');
    node.classList.add('done');
    station.classList.add('completed');
    station.querySelector('.station-check')!.classList.remove('hidden');

    stepCounter.textContent = String(idx + 1);
    const holdMs = computeReadingHold(step, showBackTrans, reduced);
    await holdWithSkip(holdMs);
  }

  function computeReadingHold(
    step: TranslationStep,
    showBackTrans: boolean,
    reduced: boolean,
  ): number {
    if (reduced) return 200;
    if (!showBackTrans || !step.backTranslation) return 800;
    const words = step.backTranslation.trim().split(/\s+/).length;
    return Math.min(5500, Math.max(2200, words * 280));
  }

  function holdWithSkip(ms: number): Promise<void> {
    if (ms <= 0 || cancelled || skipRequested) return Promise.resolve();

    return new Promise<void>(resolve => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        document.removeEventListener('keydown', onKey);
        backTrans.removeEventListener('click', onClick);
        const idx = holdResolvers.indexOf(finish);
        if (idx >= 0) holdResolvers.splice(idx, 1);
        resolve();
      };
      const onKey = (ev: KeyboardEvent) => {
        if ((ev.target as Element | null)?.closest('button, a, input, textarea, select')) return;
        if (ev.key === ' ' || ev.code === 'Space' || ev.key === 'Enter') {
          ev.preventDefault();
          finish();
        }
      };
      const onClick = () => finish();
      const timer = setTimeout(finish, ms);
      document.addEventListener('keydown', onKey);
      backTrans.addEventListener('click', onClick);
      holdResolvers.push(finish);
    });
  }

  produce();
  consume();
}

function spawnOrbs(parent: HTMLElement, drift: number): void {
  const count = drift > 0.7 ? 5 : 3;
  for (let i = 0; i < count; i++) {
    const orb = document.createElement('span');
    orb.className = 'drift-orb';
    orb.style.left = `${15 + Math.random() * 70}%`;
    orb.style.animationDelay = `${Math.random() * 0.5}s`;
    orb.style.setProperty('--orb-x', `${(Math.random() - 0.5) * 60}px`);
    const hue = drift > 0.7 ? '0' : '45';
    orb.style.setProperty('--orb-hue', hue);
    parent.appendChild(orb);
    setTimeout(() => orb.remove(), 1800);
  }
}

async function typewriter(el: HTMLElement, text: string): Promise<void> {
  el.textContent = '';
  const chars = [...text];
  const delay = Math.max(18, Math.min(55, 1000 / chars.length));

  for (const ch of chars) {
    el.textContent += ch;
    await sleep(delay);
  }
}

function safeRomanize(text: string): string | undefined {
  try {
    const result = romanize(text);
    return result !== text ? result : undefined;
  } catch {
    return undefined;
  }
}
