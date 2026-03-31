import './styles.css';
import { catalog, CatalogObject, CATEGORIES } from './catalog';
import { calculate } from './calculator';
import { createLanding } from './landing';
import { ResultsScreen } from './results';

const app = document.getElementById('app')!;

let currentScreen: 'landing' | 'results' = 'landing';
let landingUI: ReturnType<typeof createLanding> | null = null;
let resultsScreen: ResultsScreen | null = null;

function showLanding() {
  resultsScreen?.destroy();
  resultsScreen = null;
  app.innerHTML = '';
  currentScreen = 'landing';

  landingUI = createLanding(app, {
    onCalculate: handleCalculate,
    onSurprise: handleSurprise,
  });
}

function handleCalculate(small: CatalogObject, large: CatalogObject) {
  showResults(calculate(small, large));
}

function showResults(result: ReturnType<typeof calculate>) {
  if (landingUI?.el.parentElement) {
    landingUI.el.parentElement.removeChild(landingUI.el);
  }
  landingUI = null;

  resultsScreen?.destroy();
  currentScreen = 'results';
  resultsScreen = new ResultsScreen(app);
  resultsScreen.show(result, {
    onBack: showLanding,
    onFlip: (newSmallId, newLargeId) => {
      const s = catalog.find((o) => o.id === newSmallId);
      const l = catalog.find((o) => o.id === newLargeId);
      if (s && l) {
        showResults(calculate(s, l));
      }
    },
  });
}

function handleSurprise() {
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

  showResults(calculate(small, large));
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && currentScreen === 'landing') {
    e.preventDefault();
    handleSurprise();
  }
});

showLanding();
