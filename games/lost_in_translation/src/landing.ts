import type { Language } from './types';
import { DEFAULT_CHAIN, CHAOS_CHAIN, countryCodeToFlag } from './languages';
import { createCustomizePanel } from './customize';

const SUGGESTIONS = [
  'The early bird catches the worm',
  "I can't believe it's not butter",
  'To be or not to be, that is the question',
  'Whoever fights monsters should see to it that in the process they do not become a monster',
];

export function createLandingScreen(
  container: HTMLElement,
  onTranslate: (sentence: string, chain: Language[]) => void,
): void {
  let currentChain = [...DEFAULT_CHAIN];
  let chaosMode = false;

  container.innerHTML = `
    <div class="landing">
      <div class="landing-content">
        <h1 class="title">Lost in Translation</h1>
        <div class="input-wrapper">
          <textarea
            id="sentence-input"
            rows="2"
            maxlength="500"
            spellcheck="false"
            placeholder=""
          ></textarea>
          <div class="cursor-blink" id="fake-cursor"></div>
        </div>
        <p class="subtitle">
          Type a sentence. Watch it travel through 20 languages and back.
          See what survives.
        </p>
        <div class="actions">
          <button id="translate-btn" class="btn-primary" disabled>Translate</button>
          <button id="customize-btn" class="btn-secondary">Customize chain</button>
          <button id="chaos-btn" class="btn-chaos">
            <span class="chaos-icon">&#9760;</span> Chaos mode
          </button>
        </div>
        <div class="chain-preview" id="chain-preview"></div>
        <div class="suggestions">
          <p class="suggestions-label">Or try one of these:</p>
          <div class="suggestion-buttons" id="suggestion-buttons"></div>
        </div>
      </div>
      <div id="customize-overlay" class="customize-overlay hidden"></div>
    </div>
  `;

  const input = container.querySelector('#sentence-input') as HTMLTextAreaElement;
  const fakeCursor = container.querySelector('#fake-cursor') as HTMLElement;
  const translateBtn = container.querySelector('#translate-btn') as HTMLButtonElement;
  const customizeBtn = container.querySelector('#customize-btn') as HTMLButtonElement;
  const chaosBtn = container.querySelector('#chaos-btn') as HTMLButtonElement;
  const chainPreview = container.querySelector('#chain-preview') as HTMLElement;
  const suggestionsEl = container.querySelector('#suggestion-buttons') as HTMLElement;
  const overlay = container.querySelector('#customize-overlay') as HTMLElement;

  SUGGESTIONS.forEach(text => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-btn';
    btn.textContent = `"${text}"`;
    btn.addEventListener('click', () => {
      input.value = text;
      input.dispatchEvent(new Event('input'));
      input.focus();
    });
    suggestionsEl.appendChild(btn);
  });

  function updateChainPreview() {
    const chain = chaosMode ? CHAOS_CHAIN : currentChain;
    const flags = chain.map(
      l => `<span class="chain-flag" title="${l.name}">${countryCodeToFlag(l.countryCode)}</span>`,
    );
    chainPreview.innerHTML = flags.join('<span class="chain-arrow">\u2192</span>');
  }
  updateChainPreview();

  input.addEventListener('input', () => {
    const hasText = input.value.trim().length > 0;
    translateBtn.disabled = !hasText;
    fakeCursor.classList.toggle('hidden', hasText);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length === 0) fakeCursor.classList.remove('hidden');
  });

  input.addEventListener('blur', () => {
    if (input.value.trim().length === 0) fakeCursor.classList.remove('hidden');
  });

  input.focus();

  translateBtn.addEventListener('click', () => {
    const sentence = input.value.trim();
    if (!sentence) return;
    onTranslate(sentence, chaosMode ? [...CHAOS_CHAIN] : [...currentChain]);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      translateBtn.click();
    }
  });

  chaosBtn.addEventListener('click', () => {
    chaosMode = !chaosMode;
    chaosBtn.classList.toggle('active', chaosMode);
    chaosBtn.innerHTML = chaosMode
      ? '<span class="chaos-icon">&#9760;</span> Chaos mode ON (50 languages)'
      : '<span class="chaos-icon">&#9760;</span> Chaos mode';
    updateChainPreview();
  });

  customizeBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    createCustomizePanel(
      overlay,
      currentChain,
      newChain => {
        currentChain = newChain;
        chaosMode = false;
        chaosBtn.classList.remove('active');
        chaosBtn.innerHTML = '<span class="chaos-icon">&#9760;</span> Chaos mode';
        updateChainPreview();
        overlay.classList.add('hidden');
      },
      () => overlay.classList.add('hidden'),
    );
  });
}
