import './styles.css';
import { catalog, CatalogObject, CATEGORIES, getById } from './catalog';
import { calculate } from './calculator';
import { createLanding } from './landing';
import { ResultsScreen } from './results';
import { sfx } from './sounds';

const app = document.getElementById('app')!;

let currentScreen: 'landing' | 'results' = 'landing';
let landingUI: ReturnType<typeof createLanding> | null = null;
let resultsScreen: ResultsScreen | null = null;

/* ── Sound toggle ──────────────────────────────── */

const soundBtn = document.createElement('button');
soundBtn.className = 'sound-toggle' + (sfx.muted ? '' : ' on');
soundBtn.textContent = sfx.muted ? '🔇' : '🔊';
soundBtn.title = 'Toggle sound';
soundBtn.addEventListener('click', () => {
  sfx.muted = !sfx.muted;
  soundBtn.className = 'sound-toggle' + (sfx.muted ? '' : ' on');
  soundBtn.textContent = sfx.muted ? '🔇' : '🔊';
  if (!sfx.muted) sfx.click();
});
document.body.appendChild(soundBtn);

/* ── URL helpers ───────────────────────────────── */

function setUrlParams(small: string, large: string) {
  const url = new URL(window.location.href);
  url.searchParams.set('s', small);
  url.searchParams.set('l', large);
  window.history.pushState({}, '', url.toString());
}

function clearUrlParams() {
  const url = new URL(window.location.href);
  url.searchParams.delete('s');
  url.searchParams.delete('l');
  window.history.pushState({}, '', url.toString());
}

function readUrlParams(): { small: CatalogObject; large: CatalogObject } | null {
  const params = new URLSearchParams(window.location.search);
  const sId = params.get('s');
  const lId = params.get('l');
  if (!sId || !lId) return null;
  const s = getById(sId);
  const l = getById(lId);
  if (!s || !l) return null;
  return { small: s, large: l };
}

/* ── Screen transitions ────────────────────────── */

const TRANSITION_MS = 300;

function showLanding(pushState = true) {
  if (currentScreen === 'landing' && landingUI) return;

  const oldEl = resultsScreen ? app.querySelector('.results, .too-small') : null;
  resultsScreen?.destroy();
  resultsScreen = null;

  if (oldEl) {
    (oldEl as HTMLElement).classList.add('screen-exit');
    setTimeout(() => oldEl.remove(), TRANSITION_MS);
  }

  currentScreen = 'landing';

  const delay = oldEl ? 150 : 0;
  setTimeout(() => {
    landingUI = createLanding(app, {
      onCalculate: handleCalculate,
      onSurprise: handleSurprise,
    });
  }, delay);

  if (pushState) clearUrlParams();
}

function handleCalculate(small: CatalogObject, large: CatalogObject) {
  sfx.whoosh();
  showResults(calculate(small, large));
}

function showResults(result: ReturnType<typeof calculate>, pushState = true) {
  const landingEl = landingUI?.el;
  if (landingEl) {
    landingEl.classList.add('screen-exit');
    setTimeout(() => landingEl.remove(), TRANSITION_MS);
  }
  landingUI = null;

  resultsScreen?.destroy();
  currentScreen = 'results';

  const delay = landingEl ? 150 : 0;
  setTimeout(() => {
    resultsScreen = new ResultsScreen(app);
    resultsScreen.show(result, {
      onBack: () => showLanding(),
      onFlip: (newSmallId, newLargeId) => {
        const s = catalog.find((o) => o.id === newSmallId);
        const l = catalog.find((o) => o.id === newLargeId);
        if (s && l) {
          sfx.whoosh();
          showResults(calculate(s, l));
        }
      },
    });
  }, delay);

  if (pushState) setUrlParams(result.small.id, result.large.id);
}

function handleSurprise() {
  sfx.click();
  const catIds = CATEGORIES.map((c) => c.id);
  const smallCatIdx = Math.floor(Math.random() * 3);
  const largeCatIdx = smallCatIdx + 1 + Math.floor(Math.random() * (catIds.length - smallCatIdx - 1));

  const smallCat = catIds[Math.min(smallCatIdx, catIds.length - 1)];
  const largeCat = catIds[Math.min(largeCatIdx, catIds.length - 1)];

  const smalls = catalog.filter((o) => o.category === smallCat);
  const larges = catalog.filter((o) => o.category === largeCat);
  if (smalls.length === 0 || larges.length === 0) return;

  const small = smalls[Math.floor(Math.random() * smalls.length)];
  const large = larges[Math.floor(Math.random() * larges.length)];

  sfx.whoosh();
  showResults(calculate(small, large));
}

/* ── Keyboard shortcut ─────────────────────────── */

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && currentScreen === 'landing') {
    e.preventDefault();
    handleSurprise();
  }
});

/* ── Browser back/forward ──────────────────────── */

window.addEventListener('popstate', () => {
  const pair = readUrlParams();
  if (pair) {
    showResults(calculate(pair.small, pair.large), false);
  } else {
    showLanding(false);
  }
});

/* ── Init ──────────────────────────────────────── */

const initial = readUrlParams();
if (initial) {
  showResults(calculate(initial.small, initial.large), false);
} else {
  showLanding(false);
}
