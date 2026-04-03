import './style.css';
import type { Language, TranslationChain } from './types';
import { createLandingScreen } from './landing';
import { createJourneyScreen } from './journey';
import { createRevealScreen } from './reveal';
import { loadFromUrl, getCachedChain } from './storage';

const app = document.getElementById('app')!;

const urlChain = loadFromUrl();
if (urlChain) {
  showReveal(urlChain);
} else {
  showLanding();
}

function showLanding() {
  app.innerHTML = '';
  createLandingScreen(app, (sentence: string, chain: Language[]) => {
    const cached = getCachedChain(sentence);
    if (
      cached &&
      cached.chain.length === chain.length &&
      cached.chain.every((l, i) => l.code === chain[i].code)
    ) {
      showReveal(cached);
    } else {
      showJourney(sentence, chain);
    }
  });
}

function showJourney(sentence: string, chain: Language[]) {
  app.innerHTML = '';
  createJourneyScreen(app, sentence, chain, result => {
    showReveal(result);
  }, () => {
    showLanding();
  });
}

function showReveal(result: TranslationChain) {
  app.innerHTML = '';
  createRevealScreen(app, result, () => {
    window.history.replaceState(null, '', window.location.pathname);
    showLanding();
  });
}
