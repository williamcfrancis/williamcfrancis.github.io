import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
function loadTS(path, context, imports = {}) {
  context.exports = {};
  context.require = name => {
    if (!(name in imports)) throw new Error(`Unexpected import ${name}`);
    return imports[name];
  };
  vm.runInContext(ts.transpileModule(read(path), { compilerOptions: {
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS,
  } }).outputText, context);
  return context.exports;
}

function element() {
  const children = new Map();
  const listeners = new Map();
  return {
    style: {}, dataset: {}, hidden: false, textContent: '', innerHTML: '', value: '',
    classList: { add() {}, remove() {}, toggle() {} },
    querySelector(selector) {
      if (!children.has(selector)) children.set(selector, element());
      return children.get(selector);
    },
    querySelectorAll() { return []; },
    addEventListener(type, callback) { listeners.set(type, callback); },
    removeEventListener(type) { listeners.delete(type); },
    fire(type, event = {}) { return listeners.get(type)?.(event); },
    setAttribute() {}, appendChild() {}, scrollIntoView() {}, getBoundingClientRect() { return { top: 0, left: 0, width: 100, height: 100 }; },
  };
}

test('narration cancellation stops pending voice loading and resolves active speech immediately', async () => {
  const timers = new Map();
  const events = new Map();
  const spoken = [];
  let voices = [];
  const context = vm.createContext({
    window: {
      matchMedia: () => ({ matches: false }),
      speechSynthesis: {
        getVoices: () => voices, addEventListener: (name, fn) => events.set(name, fn),
        removeEventListener: name => events.delete(name), cancel() {}, speak: utter => spoken.push(utter),
      },
    },
    localStorage: { getItem() { return null; }, setItem() {} },
    SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } },
    setTimeout: fn => { const id = Symbol(); timers.set(id, fn); return id; },
    clearTimeout: id => timers.delete(id),
  });
  const { journeyAudio: audio } = loadTS('games/lost_in_translation/src/audio.ts', context);
  audio.setEnabled(true);
  const pending = audio.speak('Old narration', 'en');
  audio.cancel();
  voices = [{ lang: 'en-US' }];
  events.get('voiceschanged')();
  await pending;
  assert.equal(spoken.length, 0, 'cancelling while voices load must not start speech later');
  const active = audio.speak('New narration', 'en');
  await Promise.resolve();
  assert.equal(spoken.length, 1);
  audio.cancel();
  await active;
  assert.equal(timers.size, 1, 'only the voice-loading fallback timer remains, no speech timeout');
});

test('skipping a translation journey waits for its semantic score before producing results', async () => {
  let finishScore;
  const score = new Promise(resolve => { finishScore = resolve; });
  const root = element();
  let result;
  const context = vm.createContext({
    console, document: Object.assign(element(), { createElement: element }), window: { matchMedia: () => ({ matches: true }) },
    setTimeout: fn => { queueMicrotask(fn); return 1; }, clearTimeout() {},
  });
  const { createJourneyScreen } = loadTS('games/lost_in_translation/src/journey.ts', context, {
    './languages': { countryCodeToFlag: () => '' },
    './api': { translateText: async () => ({ translatedText: 'Same meaning' }) },
    './drift': { calculateSemanticDrift: () => score, calculateDriftFallback: () => 0.4 },
    './audio': { journeyAudio: { isEnabled: () => false, isSupported: () => false, cancel() {} } },
    transliteration: { transliterate: text => text },
  });
  const chain = [{ code: 'fr', name: 'French' }, { code: 'en', name: 'English' }];
  createJourneyScreen(root, 'Original meaning', chain, value => { result = value; });
  root.querySelector('#skip-btn').fire('click');
  for (let i = 0; i < 20; i++) await Promise.resolve();
  assert.equal(result, undefined, 'provisional drift must not be published as the final score');
  finishScore({ drift: 0.12, hint: 'Meaning retained' });
  for (let i = 0; i < 20; i++) await Promise.resolve();
  assert.equal(result.totalDrift, 0.12);
  assert.equal(result.steps[0].driftHint, 'Meaning retained');
});

test('stopping replay or leaving results cannot resume the old narration sequence', async () => {
  const root = element();
  const spoken = [];
  let finishSpeech;
  const audio = {
    isSupported: () => true, isEnabled: () => true,
    speak: text => { spoken.push(text); return new Promise(resolve => { finishSpeech = resolve; }); },
    cancel: () => finishSpeech?.(),
  };
  const context = vm.createContext({
    document: { createElement: element },
    window: { matchMedia: () => ({ matches: true }), history: { replaceState() {} }, location: { pathname: '/' } },
    setTimeout: fn => { queueMicrotask(fn); return 1; },
  });
  const { createRevealScreen } = loadTS('games/lost_in_translation/src/reveal.ts', context, {
    './languages': { countryCodeToFlag: () => '' }, './drift': { compareWords: () => [] },
    './share': {}, './storage': { saveToUrl() {}, setCachedChain() {} }, './audio': { journeyAudio: audio },
  });
  const language = { code: 'en', name: 'English' };
  createRevealScreen(root, { original: 'Original', finalText: 'Final', totalDrift: 0.2, chain: [language, language], steps: [{ language, text: 'Final', driftScore: 0.2 }] }, () => {});
  const replay = root.querySelector('#replay-btn');
  const first = replay.fire('click');
  await replay.fire('click');
  await first;
  assert.deepEqual(spoken, ['Original']);
  const second = replay.fire('click');
  root.querySelector('#restart-btn').fire('click');
  await second;
  assert.deepEqual(spoken, ['Original', 'Original']);
});

function drumFixture() {
  const html = read('static/games/tongue_drum/index.html');
  const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const elements = new Map();
  const storage = new Map();
  const drawing = new Proxy({}, { get(target, key) {
    return target[key] ?? (() => ({ addColorStop() {} }));
  } });
  const doc = Object.assign(element(), {
    getElementById(id) {
      if (!elements.has(id)) {
        const el = element();
        el.getContext = () => drawing;
        el.clientWidth = 1200; el.clientHeight = 700;
        elements.set(id, el);
      }
      return elements.get(id);
    },
    createElement: () => element(),
    querySelector(selector) { return this.getElementById(selector); },
  });
  const context = vm.createContext({
    document: doc, window: { devicePixelRatio: 1, addEventListener() {} },
    localStorage: {
      getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key),
    },
    requestAnimationFrame() {}, confirm: () => true,
  });
  vm.runInContext(source, context);
  return { context, doc, storage, run: source => vm.runInContext(source, context) };
}

test('tongue drum reloads a saved layout and rejects invalid custom song data', () => {
  const app = drumFixture();
  const saved = app.run('JSON.stringify(DEFAULT_LAYOUT.slice().reverse())');
  app.storage.set('tongueDrum.layout', saved);
  assert.equal(app.run('JSON.stringify(loadLayout())'), saved);
  assert.throws(() => app.run('compileSong("D4:-1",100)'), /Invalid duration/);
  assert.throws(() => app.run('compileSong("C4:1",100)'), /Unknown note/);
  assert.throws(() => app.run('compileSong("D4:1",-100)'), /BPM/);
  assert.equal(app.run('compileSong("Fs4:0.5 _:1 D4:2",100).totalBeats'), 3.5);
});

test('tongue drum loops reset scheduling and pause rewinds scheduled-ahead notes', () => {
  const app = drumFixture();
  app.run('audioCtx = { currentTime: 10 }; ensureAudio = () => {}; autoPlaySound = false; startSong();');
  app.run('scheduledHead = fallingNotes.length; hits = fallingNotes.length; loop = true; audioCtx.currentTime = songStartTime + songEndAt; render();');
  assert.equal(app.run('scheduledHead'), 0);
  assert.equal(app.run('hits'), 0);
  assert.equal(app.run('fallingNotes.some(note => note.played)'), false);
  app.run('audioCtx.currentTime = songStartTime + 0.3; scheduledHead = 3; pauseSong();');
  assert.equal(app.run('scheduledHead'), 1, 'the note at 0.6s must be scheduled again after resume');
  assert.equal(app.run('playing'), false);
  const event = { code: 'Space', target: { closest: () => ({}) }, preventDefault() { throw new Error('button Space must stay native'); } };
  app.doc.fire('keydown', event);
  assert.equal(app.run('playing'), false);
});

test('all Turing twins and source clues match their declared passages', () => {
  const passages = JSON.parse(read('games/turing_shuffle/src/passages.json'));
  const ids = new Set();
  for (const passage of passages) {
    assert.ok(!ids.has(passage.id), `duplicate ${passage.id}`);
    ids.add(passage.id);
    assert.ok(passage.twinText?.trim(), `${passage.id} missing twin`);
    assert.equal(passage.twinSource, passage.source === 'human' ? 'ai' : 'human');
    assert.ok(passage.tells.length > 0);
    for (const tell of passage.tells) assert.ok(passage.text.includes(tell.phrase), `${passage.id} clue absent: ${tell.phrase}`);
  }
});
