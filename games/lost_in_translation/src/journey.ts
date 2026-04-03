import type { Language, TranslationStep, TranslationChain } from './types';
import { countryCodeToFlag } from './languages';
import { translateText } from './api';
import { calculateDrift } from './drift';
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
  { threshold: 0.05, messages: ['Barely a scratch!', 'Rock solid.', 'Nailed it.'] },
  { threshold: 0.15, messages: ['Still holding up!', 'Minor wobble.', 'Close enough!'] },
  { threshold: 0.30, messages: ['Getting creative...', 'A little twist!', 'Hmmm, interesting.'] },
  { threshold: 0.50, messages: ['Wait, what?', 'Plot twist!', 'That escalated.', 'Oh no...'] },
  { threshold: 0.70, messages: ['It\'s mutating!', 'Unrecognizable!', 'Total chaos.'] },
  { threshold: 1.0, messages: ['A completely new sentence.', 'Reborn.', 'Lost forever.'] },
];

function getDriftReaction(drift: number): string {
  for (const tier of DRIFT_REACTIONS) {
    if (drift <= tier.threshold) {
      return tier.messages[Math.floor(Math.random() * tier.messages.length)];
    }
  }
  return DRIFT_REACTIONS[DRIFT_REACTIONS.length - 1].messages[0];
}

function getDriftEmoji(drift: number): string {
  if (drift <= 0.05) return '\u2728';
  if (drift <= 0.15) return '\uD83D\uDC4D';
  if (drift <= 0.30) return '\uD83E\uDD14';
  if (drift <= 0.50) return '\uD83D\uDE32';
  if (drift <= 0.70) return '\uD83E\uDD2F';
  return '\uD83D\uDCA5';
}

export function createJourneyScreen(
  container: HTMLElement,
  sentence: string,
  chain: Language[],
  onComplete: (result: TranslationChain) => void,
): void {
  const totalSteps = chain.length - 1;
  let cancelled = false;

  container.innerHTML = `
    <div class="journey">
      <div class="drift-meter">
        <div class="drift-label">
          <span id="drift-pct">0%</span> drift
        </div>
        <div class="drift-bar">
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
      </div>
    </div>
  `;

  const driftFill = container.querySelector('#drift-fill') as HTMLElement;
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

  const stepBuffer: TranslationStep[] = [];
  let producerDone = false;

  async function produce() {
    let currentText = sentence;

    for (let i = 0; i < totalSteps; i++) {
      if (cancelled) return;
      const src = chain[i];
      const tgt = chain[i + 1];

      try {
        const fwd = await translateText(currentText, src.code, tgt.code);
        currentText = fwd.translatedText;

        const step: TranslationStep = {
          language: tgt,
          text: currentText,
          transliteration: tgt.nonLatin ? safeRomanize(currentText) : undefined,
          backTranslation: '',
          driftScore: (i + 1) / totalSteps,
        };

        stepBuffer.push(step);

        translateText(currentText, tgt.code, 'en')
          .then(back => {
            step.backTranslation = back.translatedText;
            step.driftScore = calculateDrift(sentence, back.translatedText);
          })
          .catch(() => {});
      } catch (err) {
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

      while (stepBuffer.length <= i && !producerDone) {
        await sleep(150);
      }
      if (stepBuffer.length <= i) break;

      await animateStep(stepBuffer[i], i);
    }

    if (cancelled) return;
    await sleep(800);

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
    while (!step.backTranslation && Date.now() - start < maxWait) {
      await sleep(100);
    }
  }

  async function animateStep(step: TranslationStep, idx: number) {
    const station = container.querySelector(`#st-${idx + 1}`) as HTMLElement;
    const prevStation = container.querySelector(`#st-${idx}`) as HTMLElement;

    station.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    langFlag.textContent = countryCodeToFlag(step.language.countryCode);
    langName.textContent = step.language.name;
    stepBadge.textContent = `${idx + 1} / ${totalSteps}`;
    langFlag.classList.remove('bounce');
    void langFlag.offsetWidth;
    langFlag.classList.add('bounce');

    const node = station.querySelector('.station-node')!;
    node.classList.add('active');

    shimmer.classList.remove('hidden');
    ttext.classList.add('fading');
    translit.classList.add('hidden');
    backTrans.classList.add('hidden');

    await sleep(700);

    shimmer.classList.add('hidden');
    ttext.classList.remove('fading');
    ttext.dir = step.language.rtl ? 'rtl' : 'ltr';

    await typewriter(ttext, step.text);

    if (step.transliteration && step.transliteration !== step.text) {
      translit.textContent = step.transliteration;
      translit.classList.remove('hidden');
    }

    await waitForBackTranslation(step, 2000);

    if (step.backTranslation) {
      backTransText.textContent = '';
      backTrans.classList.remove('hidden');
      backTrans.classList.remove('back-trans-pop');
      void backTrans.offsetWidth;
      backTrans.classList.add('back-trans-pop');
      await typewriter(backTransText, `"${step.backTranslation}"`);
    }

    const drift = step.driftScore;
    driftFill.style.width = `${drift * 100}%`;
    driftPct.textContent = `${Math.round(drift * 100)}%`;

    if (drift < 0.33) {
      driftFill.style.background = '#4ecdc4';
    } else if (drift < 0.66) {
      driftFill.style.background = 'linear-gradient(90deg, #4ecdc4, #f7dc6f)';
    } else {
      driftFill.style.background = 'linear-gradient(90deg, #f7dc6f, #ff6b6b)';
    }

    const emoji = getDriftEmoji(drift);
    const reaction = getDriftReaction(drift);
    driftReaction.innerHTML = `<span class="reaction-emoji">${emoji}</span> ${escapeHtml(reaction)}`;
    driftReaction.classList.remove('hidden', 'reaction-pop');
    void driftReaction.offsetWidth;
    driftReaction.classList.add('reaction-pop');

    if (drift > 0.5) {
      spawnParticles(container.querySelector('.translation-display')!);
    }

    prevStation.classList.add('completed');
    const prevCheck = prevStation.querySelector('.station-check');
    if (prevCheck) prevCheck.classList.remove('hidden');

    node.classList.remove('active');
    node.classList.add('done');
    station.classList.add('completed');
    station.querySelector('.station-check')!.classList.remove('hidden');

    stepCounter.textContent = String(idx + 1);
    await sleep(800);
  }

  produce();
  consume();
}

function spawnParticles(parent: HTMLElement): void {
  const symbols = ['\u2728', '\uD83D\uDCAB', '\u2B50', '\uD83C\uDF1F', '\u26A1'];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement('span');
    p.className = 'drift-particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = `${20 + Math.random() * 60}%`;
    p.style.animationDelay = `${Math.random() * 0.4}s`;
    p.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 80}px`);
    parent.appendChild(p);
    setTimeout(() => p.remove(), 1500);
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
