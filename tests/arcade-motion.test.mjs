import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const template = readFileSync(new URL('../layouts/arcade/list.html', import.meta.url), 'utf8');
const source = template.match(/<script>\s*([\s\S]*?)<\/script>/)[1];

function node(initial = {}) {
  const listeners = new Map();
  const classes = new Set();
  return Object.assign({
    style: { setProperty() {} },
    classList: {
      add: value => classes.add(value),
      remove: value => classes.delete(value),
      toggle: (value, force) => force ? classes.add(value) : classes.delete(value),
    },
    attributes: {},
    children: [],
    textContent: '',
    closest() { return null; },
    focus() {},
    setPointerCapture() {},
    getBoundingClientRect() { return { height: 67 }; },
    setAttribute(name, value) { this.attributes[name] = value; },
    appendChild(child) { this.children.push(child); },
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(listener);
    },
    dispatch(name, event = {}) {
      event.target ??= this;
      event.currentTarget ??= this;
      event.preventDefault ??= () => { event.prevented = true; };
      event.stopPropagation ??= () => {};
      for (const listener of listeners.get(name) ?? []) listener(event);
      return event;
    },
  }, initial);
}

function arcade({ reduced = false } = {}) {
  const elements = new Map();
  const getElement = id => {
    if (!elements.has(id)) elements.set(id, node());
    return elements.get(id);
  };
  const catalog = ['First game', 'Second game'].map((title, i) => ({
    title, genre: 'Arcade', summary: 'Demo', icon: '◇', tags: ['browser'],
    url: `/games/demo_${i}/`, accent: 'var(--cyan)',
  }));
  getElement('game-catalog').textContent = JSON.stringify(catalog);
  let draws = 0;
  const context = new Proxy({}, {
    get(_target, key) {
      if (key === 'clearRect') return () => { draws++; };
      if (key === 'createRadialGradient') return () => ({ addColorStop() {} });
      return () => {};
    },
  });
  getElement('bg').getContext = () => context;
  const modes = ['drift', 'void', 'pull', 'orbit', 'rain'].map(mode => node({ dataset: { mode } }));
  const motion = node({ matches: reduced });
  const document = node({
    hidden: false,
    body: node(),
    getElementById: getElement,
    createElement: () => node(),
    querySelector: () => getElement('top'),
    querySelectorAll: selector => selector === '.mode' ? modes : [],
  });
  const frames = new Map();
  let frameId = 0;
  let now = 0;
  const page = node({
    document,
    innerWidth: 1280,
    innerHeight: 720,
    devicePixelRatio: 1,
    performance: { now: () => now },
    matchMedia: () => motion,
    requestAnimationFrame: callback => { const id = ++frameId; frames.set(id, callback); return id; },
    cancelAnimationFrame: id => frames.delete(id),
    setTimeout: () => 1,
  });
  page.window = page;
  vm.runInNewContext(source, page, { filename: 'arcade.js' });
  return {
    page, document, frames, motion, getElement,
    get draws() { return draws; },
    setHidden(hidden) { document.hidden = hidden; document.dispatch('visibilitychange'); },
    setReduced(matches) { motion.matches = matches; motion.dispatch('change'); },
    tick() {
      now += 16;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(now));
    },
  };
}

test('arcade pauses drawing when hidden and keeps explicit pause across tab changes', () => {
  const app = arcade();
  assert.equal(app.frames.size, 1);
  app.tick();
  assert.ok(app.draws > 1);
  app.setHidden(true);
  assert.equal(app.frames.size, 0);
  app.setHidden(false);
  assert.equal(app.frames.size, 1);
  app.getElement('pause').dispatch('click');
  assert.equal(app.getElement('pause').attributes['aria-pressed'], 'true');
  assert.equal(app.getElement('pause-label').textContent, 'resume physics');
  assert.equal(app.frames.size, 0);
  app.setHidden(true);
  app.setHidden(false);
  assert.equal(app.frames.size, 0);
  app.getElement('pause').dispatch('click');
  assert.equal(app.frames.size, 1);
});

test('arcade starts still for reduced motion and responds to live preference changes', () => {
  const app = arcade({ reduced: true });
  assert.equal(app.frames.size, 0);
  assert.equal(app.getElement('pause').attributes['aria-pressed'], 'true');
  app.setHidden(true);
  app.setHidden(false);
  assert.equal(app.frames.size, 0);
  app.setReduced(false);
  assert.equal(app.frames.size, 1);
  app.setReduced(true);
  assert.equal(app.frames.size, 0);
});

test('paused arcade keeps direct links and dragging without starting physics', () => {
  const app = arcade({ reduced: true });
  const card = app.getElement('world').children[0];
  assert.equal(card.href, '/games/demo_0/');
  assert.equal(card.target, '_blank');
  assert.equal(card.dispatch('click', { detail: 1 }).prevented, undefined, 'normal clicks use native anchor navigation');
  const before = card.style.transform;
  card.dispatch('pointerdown', { button: 0, clientX: 200, clientY: 200, pointerId: 1 });
  app.page.dispatch('pointermove', { clientX: 250, clientY: 220 });
  app.page.dispatch('pointerup', { clientX: 250, clientY: 220, type: 'pointerup' });
  assert.notEqual(card.style.transform, before, 'dragging still moves the card');
  assert.equal(app.frames.size, 0, 'dragging must not restart continuous animation');
  assert.equal(card.dispatch('click', { detail: 1 }).prevented, true, 'a completed drag does not open a new tab');
  assert.equal(card.dispatch('click', { detail: 0 }).prevented, undefined, 'keyboard activation opens the link');
});

test('space on the pause button is left to native button activation', () => {
  const app = arcade();
  const button = app.getElement('pause');
  button.closest = () => button;
  const event = app.page.dispatch('keydown', { key: ' ', target: button });
  assert.equal(event.prevented, undefined, 'global shake shortcut must not swallow button Space');
});

test('pause shortcut works after focusing a card and ignores held keys and text fields', () => {
  const app = arcade();
  const card = app.getElement('world').children[0];
  card.closest = selector => selector === 'a, button' ? card : null;
  app.page.dispatch('keydown', { key: 'p', target: card });
  assert.equal(app.frames.size, 0, 'a focused game link must not disable the pause shortcut');
  app.page.dispatch('keydown', { key: 'p', repeat: true, target: card });
  assert.equal(app.frames.size, 0, 'holding P must not toggle repeatedly');
  app.page.dispatch('keydown', { key: 'p', ctrlKey: true, target: card });
  assert.equal(app.frames.size, 0, 'browser shortcuts must not change the game');
  const input = node();
  input.closest = selector => selector.includes('input') ? input : null;
  app.page.dispatch('keydown', { key: 'p', target: input });
  assert.equal(app.frames.size, 0, 'typing in a field must not change the game');
  app.page.dispatch('keydown', { key: 'p', target: card });
  assert.equal(app.frames.size, 1);
});
