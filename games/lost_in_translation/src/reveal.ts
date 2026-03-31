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
      funFact = `Fun fact: &ldquo;${escapeHtml(result.original)}&rdquo; in ${interesting.language.name} translates to &ldquo;${escapeHtml(interesting.text)}&rdquo; which means &ldquo;${escapeHtml(interesting.backTranslation)}&rdquo; in English!`;
    }
  }

  container.innerHTML = `
    <div class="reveal">
      <div class="reveal-header">
        ${
          isPerfect
            ? `<div class="perfect-badge">\uD83C\uDF89 Perfect translation!</div>
               <p class="perfect-msg">This sentence survived ${result.chain.length - 1} languages unscathed. That&rsquo;s extremely rare.</p>`
            : ''
        }

        <div class="comparison-card">
          <div class="comp-label">Original</div>
          <div class="comp-original">&ldquo;${escapeHtml(result.original)}&rdquo;</div>

          <div class="flag-trail-mini">
            ${result.chain.map(l => `<span title="${l.name}">${countryCodeToFlag(l.countryCode)}</span>`).join(' ')}
          </div>

          <div class="comp-label gold">After ${result.chain.length - 1} translations</div>
          <div class="comp-final">&ldquo;${escapeHtml(result.finalText)}&rdquo;</div>

          <div class="word-highlight">${highlighted}</div>

          <div class="drift-score-card">
            <div class="drift-number">${drift}%</div>
            <div class="drift-caption">lost in translation</div>
          </div>
        </div>

        ${isSingle && funFact ? `<div class="fun-fact">${funFact}</div>` : ''}
      </div>

      <div class="journey-timeline">
        <h3>The Journey</h3>
        <div class="timeline" id="timeline"></div>
      </div>

      <div class="share-section">
        <button class="btn-primary" id="share-btn">\uD83D\uDCE4 Share result</button>
        <button class="btn-secondary" id="copy-btn">\uD83D\uDCCB Copy to clipboard</button>
        <button class="btn-secondary" id="dl-btn">\uD83D\uDDBC Download as image</button>
        <button class="btn-ghost" id="restart-btn">\u2190 Try another sentence</button>
      </div>
    </div>
  `;

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

  result.steps.forEach((step, i) => {
    timeline.appendChild(
      timelineEntry(
        countryCodeToFlag(step.language.countryCode),
        step.language.name,
        step.text,
        step.transliteration,
        step.driftScore,
        false,
        step.language.rtl,
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
    btn.textContent = '\u2713 Copied!';
    setTimeout(() => (btn.textContent = '\uD83D\uDCCB Copy to clipboard'), 2000);
  });

  container.querySelector('#dl-btn')!.addEventListener('click', () =>
    downloadShareImage(result),
  );

  container.querySelector('#restart-btn')!.addEventListener('click', () => {
    window.history.replaceState(null, '', window.location.pathname);
    onRestart();
  });
}

function timelineEntry(
  flag: string,
  langName: string,
  text: string,
  translit: string | undefined,
  drift: number,
  isOrig: boolean,
  rtl?: boolean,
): HTMLElement {
  const el = document.createElement('div');
  el.className = `tl-entry${isOrig ? ' tl-original' : ''} fade-in-up`;

  el.innerHTML = `
    <div class="tl-marker">
      <span class="tl-flag">${flag}</span>
      <div class="tl-line"></div>
    </div>
    <div class="tl-content">
      <div class="tl-lang">${langName}${isOrig ? ' (Original)' : ''}</div>
      <div class="tl-text" ${rtl ? 'dir="rtl"' : ''}>${escapeHtml(text)}</div>
      ${translit ? `<div class="tl-translit">${escapeHtml(translit)}</div>` : ''}
      ${!isOrig ? `<div class="tl-drift" style="color:${drift > 0.66 ? '#ff6b6b' : drift > 0.33 ? '#f7dc6f' : '#4ecdc4'}">${Math.round(drift * 100)}% drift</div>` : ''}
    </div>
  `;

  return el;
}
