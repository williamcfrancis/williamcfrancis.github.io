import type { Language } from './types';
import { ALL_LANGUAGES, countryCodeToFlag } from './languages';

export function createCustomizePanel(
  container: HTMLElement,
  currentChain: Language[],
  onSave: (chain: Language[]) => void,
  onCancel: () => void,
): void {
  let chain = [...currentChain];

  function render() {
    container.innerHTML = `
      <div class="customize-panel">
        <div class="customize-header">
          <h2>Customize Language Chain</h2>
          <button class="close-btn" id="cust-close">\u2715</button>
        </div>
        <p class="customize-hint">
          Drag to reorder. First and last must be English. Minimum 5 languages.
        </p>
        <div class="chain-list" id="chain-list"></div>
        <div class="add-language">
          <select id="add-lang-select">
            <option value="">+ Add a language\u2026</option>
          </select>
        </div>
        <div class="customize-actions">
          <button class="btn-secondary" id="cust-cancel">Cancel</button>
          <button class="btn-primary" id="cust-save">Save chain (${chain.length} languages)</button>
        </div>
      </div>
    `;

    const list = container.querySelector('#chain-list') as HTMLElement;
    const select = container.querySelector('#add-lang-select') as HTMLSelectElement;

    chain.forEach((lang, idx) => {
      const isFixed = idx === 0 || idx === chain.length - 1;
      const item = document.createElement('div');
      item.className = 'chain-item' + (isFixed ? ' fixed' : '');
      item.draggable = !isFixed;
      item.dataset.index = String(idx);

      item.innerHTML = `
        <span class="drag-handle">${isFixed ? '' : '\u22EE\u22EE'}</span>
        <span class="ci-flag">${countryCodeToFlag(lang.countryCode)}</span>
        <span class="ci-name">${lang.name}</span>
        <span class="ci-native">${lang.nativeName}</span>
        ${isFixed ? '<span class="ci-fixed">fixed</span>' : `<button class="ci-remove" data-idx="${idx}">\u2715</button>`}
      `;
      list.appendChild(item);
    });

    const usedCodes = new Set(chain.map(l => l.code));
    ALL_LANGUAGES.filter(l => !usedCodes.has(l.code)).forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = `${countryCodeToFlag(lang.countryCode)} ${lang.name} (${lang.nativeName})`;
      select.appendChild(opt);
    });

    let dragIdx: number | null = null;

    list.addEventListener('dragstart', e => {
      const el = (e.target as HTMLElement).closest('.chain-item') as HTMLElement | null;
      if (!el) return;
      dragIdx = parseInt(el.dataset.index!);
      el.classList.add('dragging');
      e.dataTransfer!.effectAllowed = 'move';
    });

    list.addEventListener('dragend', e => {
      const el = (e.target as HTMLElement).closest('.chain-item') as HTMLElement | null;
      if (el) el.classList.remove('dragging');
      dragIdx = null;
      list.querySelectorAll('.chain-item').forEach(el => el.classList.remove('drag-over'));
    });

    list.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'move';
      const el = (e.target as HTMLElement).closest('.chain-item') as HTMLElement | null;
      if (!el) return;
      const targetIdx = parseInt(el.dataset.index!);
      if (targetIdx === 0 || targetIdx === chain.length - 1) return;
      list.querySelectorAll('.chain-item').forEach(el => el.classList.remove('drag-over'));
      el.classList.add('drag-over');
    });

    list.addEventListener('drop', e => {
      e.preventDefault();
      if (dragIdx === null) return;
      const el = (e.target as HTMLElement).closest('.chain-item') as HTMLElement | null;
      if (!el) return;
      const targetIdx = parseInt(el.dataset.index!);
      if (targetIdx === 0 || targetIdx === chain.length - 1) return;
      if (dragIdx === targetIdx) return;
      const [removed] = chain.splice(dragIdx, 1);
      chain.splice(targetIdx, 0, removed);
      render();
    });

    list.addEventListener('click', e => {
      const btn = (e.target as HTMLElement).closest('.ci-remove') as HTMLElement | null;
      if (!btn) return;
      if (chain.length <= 5) return;
      const idx = parseInt(btn.dataset.idx!);
      chain.splice(idx, 1);
      render();
    });

    select.addEventListener('change', () => {
      const code = select.value;
      if (!code) return;
      const lang = ALL_LANGUAGES.find(l => l.code === code);
      if (!lang) return;
      chain.splice(chain.length - 1, 0, lang);
      render();
    });

    container.querySelector('#cust-close')!.addEventListener('click', onCancel);
    container.querySelector('#cust-cancel')!.addEventListener('click', onCancel);
    container.querySelector('#cust-save')!.addEventListener('click', () => {
      if (chain.length < 5) return;
      onSave(chain);
    });
  }

  render();
}
