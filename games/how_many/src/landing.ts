import {
  catalog,
  CATEGORIES,
  CatalogObject,
  searchCatalog,
  getById,
} from './catalog';
import { sfx } from './sounds';

function formatDimensions(obj: CatalogObject): string {
  const [w, h, d] = obj.dimensions;
  const fmt = (v: number): string => {
    if (v >= 9.46e15) return `${(v / 9.461e15).toFixed(1)} ly`;
    if (v >= 1e12) return `${(v / 1e9).toFixed(0)}B km`;
    if (v >= 1e9) return `${(v / 1e6).toLocaleString('en-US', { maximumFractionDigits: 0 })} km`;
    if (v >= 1e3) return `${(v / 1e3).toLocaleString('en-US', { maximumFractionDigits: 1 })} km`;
    if (v >= 1) return `${v.toFixed(2)} m`;
    if (v >= 0.01) return `${(v * 100).toFixed(1)} cm`;
    if (v >= 0.001) return `${(v * 1000).toFixed(1)} mm`;
    return `${(v * 1e6).toFixed(0)} μm`;
  };
  return `${fmt(w)} × ${fmt(h)} × ${fmt(d)}`;
}

interface CardState {
  selected: CatalogObject | null;
  searchEl: HTMLInputElement;
  gridEl: HTMLElement;
  previewEl: HTMLElement;
  onSelect: (obj: CatalogObject) => void;
}

function renderGrid(
  gridEl: HTMLElement,
  objects: CatalogObject[],
  selected: CatalogObject | null,
  onSelect: (obj: CatalogObject) => void,
) {
  gridEl.innerHTML = '';

  const grouped = new Map<string, CatalogObject[]>();
  for (const obj of objects) {
    const arr = grouped.get(obj.category) ?? [];
    arr.push(obj);
    grouped.set(obj.category, arr);
  }

  for (const cat of CATEGORIES) {
    const items = grouped.get(cat.id);
    if (!items || items.length === 0) continue;

    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = cat.label;
    gridEl.appendChild(header);

    for (const obj of items) {
      const item = document.createElement('div');
      item.className = 'object-item' + (selected?.id === obj.id ? ' selected' : '');

      item.innerHTML = `
        <span class="object-icon">${obj.icon}</span>
        <div class="object-info">
          <div class="object-name">${obj.name}</div>
          <div class="object-dims">${formatDimensions(obj)}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        sfx.click();
        onSelect(obj);
      });
      gridEl.appendChild(item);
    }
  }
}

function renderPreview(previewEl: HTMLElement, obj: CatalogObject | null) {
  if (!obj) {
    previewEl.style.display = 'none';
    return;
  }
  previewEl.style.display = 'flex';
  previewEl.innerHTML = `
    <span class="preview-icon">${obj.icon}</span>
    <div class="preview-details">
      <h3>${obj.name}</h3>
      <p>${formatDimensions(obj)}</p>
      <p class="preview-fun-fact">${obj.funFact}</p>
    </div>
  `;
}

function createCard(
  label: string,
  placeholder: string,
  defaultId: string | null,
  onChange: (obj: CatalogObject | null) => void,
): { el: HTMLElement; state: CardState } {
  const card = document.createElement('div');
  card.className = 'selection-card';

  const labelEl = document.createElement('div');
  labelEl.className = 'card-label';
  labelEl.textContent = label;
  card.appendChild(labelEl);

  const searchEl = document.createElement('input');
  searchEl.className = 'card-search';
  searchEl.type = 'text';
  searchEl.placeholder = placeholder;
  card.appendChild(searchEl);

  const gridEl = document.createElement('div');
  gridEl.className = 'object-grid';
  card.appendChild(gridEl);

  const previewEl = document.createElement('div');
  previewEl.className = 'card-preview';
  previewEl.style.display = 'none';
  card.appendChild(previewEl);

  const state: CardState = {
    selected: defaultId ? getById(defaultId) ?? null : null,
    searchEl,
    gridEl,
    previewEl,
    onSelect: () => {},
  };

  const doSelect = (obj: CatalogObject) => {
    state.selected = obj;
    renderGrid(gridEl, searchCatalog(searchEl.value), state.selected, doSelect);
    renderPreview(previewEl, obj);
    onChange(obj);
  };

  state.onSelect = doSelect;

  searchEl.addEventListener('input', () => {
    const results = searchCatalog(searchEl.value);
    renderGrid(gridEl, results, state.selected, doSelect);
  });

  renderGrid(gridEl, catalog, state.selected, doSelect);
  renderPreview(previewEl, state.selected);

  return { el: card, state };
}

/* ── Popular combos ────────────────────────────── */

const POPULAR_COMBOS = [
  { label: '🏀 Basketballs → 🚌 School Bus', small: 'basketball', large: 'school_bus' },
  { label: '🍬 M&Ms → 🏡 Tiny House', small: 'mm_candy', large: 'tiny_house' },
  { label: '⛳ Golf Balls → 🐘 Elephant', small: 'golf_ball', large: 'elephant' },
  { label: '🧱 Legos → 🚗 Car', small: 'lego_brick', large: 'sedan' },
  { label: '🌍 Earths → ☀️ Sun', small: 'earth', large: 'sun' },
];

/* ── Exports ───────────────────────────────────── */

export interface LandingCallbacks {
  onCalculate: (small: CatalogObject, large: CatalogObject) => void;
  onSurprise: () => void;
}

export function createLanding(
  container: HTMLElement,
  callbacks: LandingCallbacks,
): {
  el: HTMLElement;
  getSmall: () => CatalogObject | null;
  getLarge: () => CatalogObject | null;
  setSelections: (smallId: string, largeId: string) => void;
} {
  const landing = document.createElement('div');
  landing.className = 'landing screen-enter';

  const title = document.createElement('h1');
  title.className = 'landing-title';
  title.textContent = 'How Many?';
  landing.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'landing-subtitle';
  subtitle.textContent = 'Pick two objects and see how many of the smaller one fit inside the larger one.';
  landing.appendChild(subtitle);

  const row = document.createElement('div');
  row.className = 'cards-row';

  let selectedSmall: CatalogObject | null = null;
  let selectedLarge: CatalogObject | null = null;

  const updateBtn = () => {
    calcBtn.disabled = !(selectedSmall && selectedLarge);
  };

  const smallCard = createCard(
    '🔍 How many...',
    'Search objects...',
    'golf_ball',
    (obj) => {
      selectedSmall = obj;
      updateBtn();
    },
  );
  selectedSmall = smallCard.state.selected;

  const largeCard = createCard(
    '📦 ...fit in a...',
    'Search objects...',
    'boeing_747',
    (obj) => {
      selectedLarge = obj;
      updateBtn();
    },
  );
  selectedLarge = largeCard.state.selected;

  row.appendChild(smallCard.el);

  const arrow = document.createElement('div');
  arrow.className = 'flow-arrow';
  arrow.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>`;
  row.appendChild(arrow);

  row.appendChild(largeCard.el);
  landing.appendChild(row);

  /* ── Controls ─────────────────────────── */

  const controls = document.createElement('div');
  controls.className = 'landing-controls';

  const calcBtn = document.createElement('button');
  calcBtn.className = 'btn-calculate';
  calcBtn.textContent = 'Calculate!';
  calcBtn.disabled = !(selectedSmall && selectedLarge);
  calcBtn.addEventListener('click', () => {
    if (selectedSmall && selectedLarge) {
      callbacks.onCalculate(selectedSmall, selectedLarge);
    }
  });
  controls.appendChild(calcBtn);

  const surpriseBtn = document.createElement('button');
  surpriseBtn.className = 'btn-surprise';
  surpriseBtn.textContent = '🎲 Surprise Me';
  surpriseBtn.addEventListener('click', callbacks.onSurprise);
  controls.appendChild(surpriseBtn);

  landing.appendChild(controls);

  /* ── Popular combos ───────────────────── */

  const popularSection = document.createElement('div');
  popularSection.className = 'popular-combos';

  const popularLabel = document.createElement('span');
  popularLabel.className = 'popular-label';
  popularLabel.textContent = 'Try:';
  popularSection.appendChild(popularLabel);

  for (const combo of POPULAR_COMBOS) {
    const chip = document.createElement('button');
    chip.className = 'combo-chip';
    chip.textContent = combo.label;
    chip.addEventListener('click', () => {
      sfx.click();
      const s = getById(combo.small);
      const l = getById(combo.large);
      if (s && l) callbacks.onCalculate(s, l);
    });
    popularSection.appendChild(chip);
  }

  landing.appendChild(popularSection);
  container.appendChild(landing);

  const setSelections = (smallId: string, largeId: string) => {
    const s = getById(smallId);
    const l = getById(largeId);
    if (s) {
      selectedSmall = s;
      smallCard.state.selected = s;
      renderGrid(smallCard.state.gridEl, catalog, s, smallCard.state.onSelect);
      renderPreview(smallCard.state.previewEl, s);
    }
    if (l) {
      selectedLarge = l;
      largeCard.state.selected = l;
      renderGrid(largeCard.state.gridEl, catalog, l, largeCard.state.onSelect);
      renderPreview(largeCard.state.previewEl, l);
    }
    updateBtn();
  };

  return {
    el: landing,
    getSmall: () => selectedSmall,
    getLarge: () => selectedLarge,
    setSelections,
  };
}
