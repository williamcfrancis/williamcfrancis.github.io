import type { TranslationChain } from './types';
import { countryCodeToFlag } from './languages';
import { compareWords } from './drift';
import { shareResult, downloadShareImage, copyToClipboard } from './share';
import { saveToUrl, setCachedChain } from './storage';

function escapeHtml(s: string): string {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function getDriftVerdict(drift: number): { label: string; className: string } {
  if (drift === 0) return { label: 'Perfect preservation', className: 'verdict-perfect' };
  if (drift <= 15) return { label: 'Remarkably faithful', className: 'verdict-low' };
  if (drift <= 40) return { label: 'Noticeably altered', className: 'verdict-mid' };
  if (drift <= 70) return { label: 'Heavily distorted', className: 'verdict-high' };
  return { label: 'Completely transformed', className: 'verdict-extreme' };
}

export function createRevealScreen(
  container: HTMLElement,
  result: TranslationChain,
  onRestart: () => void,
): void {
  setCachedChain(result);
  saveToUrl(result);

  const drift = Math.round(result.totalDrift * 100);
  const words = compareWords(result.original, result.finalText);
  const isSingle = result.original.trim().split(/\s+/).length === 1;
  const isPerfect =
    result.original.toLowerCase().trim() === result.finalText.toLowerCase().trim();
  const verdict = getDriftVerdict(drift);

  const highlighted = words
    .map(
      ({ word, preserved }) =>
        `<span class="${preserved ? 'word-preserved' : 'word-changed'}">${escapeHtml(word)}</span>`,
    )
    .join(' ');

  let funFact = '';
  if (isSingle && result.steps.length > 0) {
    const interesting = result.steps.find(
      s =>
        s.backTranslation &&
        s.backTranslation.toLowerCase() !== result.original.toLowerCase(),
    );
    if (interesting?.backTranslation) {
      funFact = `&ldquo;${escapeHtml(result.original)}&rdquo; in ${interesting.language.name} translates to &ldquo;${escapeHtml(interesting.text)}&rdquo; which means &ldquo;${escapeHtml(interesting.backTranslation)}&rdquo; in English.`;
    }
  }

  container.innerHTML = `
    <div class="reveal" role="region" aria-label="Translation results">
      <div class="reveal-header">
        ${
          isPerfect
            ? `<div class="perfect-badge fade-in-up">Perfect translation</div>
               <p class="perfect-msg fade-in-up">This sentence survived ${result.chain.length - 1} languages unscathed. That is extremely rare.</p>`
            : ''
        }

        <div class="comparison-card fade-in-up">
          <div class="comp-label">Original</div>
          <div class="comp-original">&ldquo;${escapeHtml(result.original)}&rdquo;</div>

          <div class="flag-trail-mini" aria-label="${result.chain.length} languages traversed">
            ${result.chain.map(l => `<span title="${l.name}">${countryCodeToFlag(l.countryCode)}</span>`).join(' ')}
          </div>

          <div class="comp-label gold">After ${result.chain.length - 1} translations</div>
          <div class="comp-final">&ldquo;${escapeHtml(result.finalText)}&rdquo;</div>

          <div class="word-highlight">${highlighted}</div>

          <div class="drift-score-card">
            <div class="drift-number" id="drift-counter" aria-label="${drift} percent drift">0%</div>
            <div class="drift-caption">lost in translation</div>
            <div class="drift-verdict ${verdict.className}">${verdict.label}</div>
          </div>
        </div>

        ${isSingle && funFact ? `<div class="fun-fact fade-in-up">${funFact}</div>` : ''}
      </div>

      <div class="journey-timeline fade-in-up">
        <h3>The Journey</h3>
        <div class="timeline" id="timeline"></div>
      </div>

      <div class="share-section fade-in-up">
        <button class="btn-primary" id="share-btn">Share result</button>
        <button class="btn-secondary" id="copy-btn">Copy to clipboard</button>
        <button class="btn-secondary" id="dl-btn">Download as image</button>
        <button class="btn-ghost" id="restart-btn">&larr; Try another sentence</button>
      </div>
    </div>
  `;

  animateDriftCounter(
    container.querySelector('#drift-counter') as HTMLElement,
    drift,
  );

  const timeline = container.querySelector('#timeline')!;

  const origEntry = timelineEntry(
    countryCodeToFlag(result.chain[0].countryCode),
    result.chain[0].name,
    result.original,
    undefined,
    0,
    true,
  );
  timeline.appendChild(origEntry);

  result.steps.forEach((step) => {
    const isEnglishStep = step.language.code === 'en';
    timeline.appendChild(
      timelineEntry(
        countryCodeToFlag(step.language.countryCode),
        step.language.name,
        step.text,
        step.transliteration,
        step.driftScore,
        false,
        step.language.rtl,
        isEnglishStep ? undefined : step.backTranslation,
      ),
    );
  });

  const entries = timeline.querySelectorAll('.tl-entry');
  entries.forEach((el, i) => {
    (el as HTMLElement).style.animationDelay = `${i * 80}ms`;
  });

  container.querySelector('#share-btn')!.addEventListener('click', () => shareResult(result));

  container.querySelector('#copy-btn')!.addEventListener('click', async () => {
    const text = `"${result.original}" \u2192 "${result.finalText}" (${drift}% lost in translation)\n\nTry it: ${window.location.href}`;
    await copyToClipboard(text);
    const btn = container.querySelector('#copy-btn') as HTMLButtonElement;
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => (btn.textContent = original), 2000);
  });

  container.querySelector('#dl-btn')!.addEventListener('click', () =>
    downloadShareImage(result),
  );

  container.querySelector('#restart-btn')!.addEventListener('click', () => {
    window.history.replaceState(null, '', window.location.pathname);
    onRestart();
  });
}

function animateDriftCounter(el: HTMLElement, target: number): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = `${target}%`;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = `${current}%`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function timelineEntry(
  flag: string,
  langName: string,
  text: string,
  translit: string | undefined,
  drift: number,
  isOrig: boolean,
  rtl?: boolean,
  backTranslation?: string,
): HTMLElement {
  const el = document.createElement('div');
  el.className = `tl-entry${isOrig ? ' tl-original' : ''} fade-in-up`;

  const showBackTrans = !isOrig && backTranslation;
  const driftColor = drift > 0.66 ? '#ff6b6b' : drift > 0.33 ? '#f7dc6f' : '#4ecdc4';

  el.innerHTML = `
    <div class="tl-marker">
      <span class="tl-flag">${flag}</span>
      <div class="tl-line"></div>
    </div>
    <div class="tl-content">
      <div class="tl-lang">${langName}${isOrig ? ' (Original)' : ''}</div>
      <div class="tl-text" ${rtl ? 'dir="rtl"' : ''}>${escapeHtml(text)}</div>
      ${translit ? `<div class="tl-translit">${escapeHtml(translit)}</div>` : ''}
      ${showBackTrans ? `<div class="tl-back-translation">\u2192 English: &ldquo;${escapeHtml(backTranslation)}&rdquo;</div>` : ''}
      ${!isOrig ? `<div class="tl-drift" style="color:${driftColor}">${Math.round(drift * 100)}% drift</div>` : ''}
    </div>
  `;

  return el;
}
