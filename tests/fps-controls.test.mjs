import assert from 'node:assert/strict';
import test from 'node:test';
import { setImmediate as nextTurn } from 'node:timers/promises';
import { createFpsControls } from '../games/_shared/src/fps-controls.ts';

function element(tag = 'div') {
  const listeners = new Map();
  return {
    tagName: tag.toUpperCase(), children: [], attributes: {}, hidden: false,
    append(...children) { this.children.push(...children); },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus() { document.activeElement = this; },
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    fire(name, event = {}) {
      event.preventDefault ??= () => { event.prevented = true; };
      for (const callback of listeners.get(name) ?? []) callback(event);
      return event;
    },
  };
}

function fixture(t, request) {
  const oldDocument = globalThis.document;
  const oldWindow = globalThis.window;
  const doc = Object.assign(element(), {
    body: element('body'), hidden: false, pointerLockElement: null,
    createElement: element,
    exitPointerLock() {
      doc.pointerLockElement = null;
      doc.fire('pointerlockchange');
    },
  });
  const win = element();
  globalThis.document = doc;
  globalThis.window = win;
  const canvas = element('canvas');
  canvas.requestPointerLock = () => request?.(doc, canvas);
  const pauses = [];
  const look = [];
  const buttons = [];
  let resets = 0;
  const controls = createFpsControls({
    canvas, onPause: paused => pauses.push(paused),
    onLook: (x, y) => look.push([x, y]), onResetInput: () => { resets++; },
    onButtons: (held, pressed) => buttons.push([held, pressed]),
  });
  t.after(() => {
    controls.stop();
    if (oldDocument === undefined) delete globalThis.document;
    else globalThis.document = oldDocument;
    if (oldWindow === undefined) delete globalThis.window;
    else globalThis.window = oldWindow;
  });
  const [panel, hint] = doc.body.children;
  const [title, message, actions] = panel.children[0].children;
  const [drag, capture] = actions.children;
  return { doc, win, canvas, controls, panel, hint, title, message, drag, capture, pauses, look, buttons, get resets() { return resets; } };
}

test('a rejected mouse-capture promise pauses safely and offers working drag aim', async t => {
  const app = fixture(t, () => Promise.reject(new Error('Browser declined')));
  app.controls.start();
  await nextTurn();
  assert.equal(app.controls.active, false);
  assert.equal(app.pauses.at(-1), true);
  assert.equal(app.title.textContent, 'Mouse capture unavailable');
  assert.match(app.message.textContent, /game is paused/);
  assert.equal(app.panel.hidden, false);
  app.drag.fire('click');
  assert.equal(app.controls.dragMode, true);
  assert.equal(app.pauses.at(-1), false);
  assert.equal(app.hint.hidden, false);
  app.doc.fire('pointermove', { buttons: 1, clientX: 99, clientY: 99 });
  assert.deepEqual(app.look, [], 'aim only starts with a drag on the game canvas');
  app.canvas.fire('pointerdown', { button: 0, buttons: 1, clientX: 100, clientY: 100 });
  app.doc.fire('pointermove', { buttons: 1, clientX: 140, clientY: 85 });
  assert.deepEqual(app.look, [[40, -15]]);
  app.doc.fire('pointerup');
  app.doc.fire('pointermove', { buttons: 1, clientX: 200, clientY: 200 });
  assert.equal(app.look.length, 1);
});

test('chorded fire buttons track pointermove transitions and pointercancel clears input', t => {
  const app = fixture(t, () => { throw new Error('No capture'); });
  app.controls.start();
  app.drag.fire('click');
  app.canvas.fire('pointerdown', { pointerId: 1, buttons: 1, clientX: 10, clientY: 10 });
  app.doc.fire('pointermove', { pointerId: 1, buttons: 3, clientX: 20, clientY: 10 });
  app.doc.fire('pointermove', { pointerId: 1, buttons: 2, clientX: 30, clientY: 10 });
  app.doc.fire('pointermove', { pointerId: 1, buttons: 3, clientX: 40, clientY: 10 });
  app.doc.fire('pointerup', { pointerId: 1, buttons: 0 });
  assert.deepEqual(app.buttons, [[1, 1], [3, 2], [2, 0], [3, 1], [0, 0]],
    'secondary fire works while primary is held, and releasing either button updates independently');
  app.canvas.fire('pointerdown', { pointerId: 2, buttons: 1, clientX: 10, clientY: 10 });
  const resets = app.resets;
  app.doc.fire('pointercancel', { pointerId: 2 });
  assert.equal(app.resets, resets + 1);
  const lookCount = app.look.length;
  app.doc.fire('pointermove', { pointerId: 2, buttons: 1, clientX: 80, clientY: 10 });
  assert.equal(app.look.length, lookCount, 'cancelled drags cannot keep aiming or firing');
});

test('native capture preserves mouse look and releasing it pauses without losing the game', t => {
  const app = fixture(t, (doc, canvas) => {
    doc.pointerLockElement = canvas;
    doc.fire('pointerlockchange');
  });
  app.controls.start();
  assert.equal(app.controls.active, true);
  assert.equal(app.controls.dragMode, false);
  assert.equal(app.panel.hidden, true);
  app.doc.fire('pointermove', { movementX: 12, movementY: -8 });
  assert.deepEqual(app.look, [[12, -8]]);
  app.doc.exitPointerLock();
  assert.equal(app.controls.active, false);
  assert.match(app.message.textContent, /capture was released/);
  assert.equal(app.pauses.at(-1), true);
});

test('legacy capture errors, synchronous exceptions, and unavailable APIs are recoverable', t => {
  const app = fixture(t, () => { throw new Error('No capture'); });
  app.controls.start();
  assert.equal(app.title.textContent, 'Mouse capture unavailable');
  app.canvas.requestPointerLock = () => {};
  app.capture.fire('click');
  app.doc.fire('pointerlockerror');
  assert.equal(app.capture.disabled, false);
  assert.equal(app.controls.active, false);
  app.canvas.requestPointerLock = undefined;
  app.capture.fire('click');
  assert.equal(app.title.textContent, 'Mouse capture unavailable');
});

test('fallback pauses on P, blur, and visibility loss and restarts without capture', t => {
  let requests = 0;
  const app = fixture(t, () => { requests++; throw new Error('No capture'); });
  app.controls.start();
  app.drag.fire('click');
  app.doc.fire('keydown', { key: 'p' });
  assert.equal(app.controls.active, false);
  app.drag.fire('click');
  app.win.fire('blur');
  assert.equal(app.controls.active, false);
  app.drag.fire('click');
  app.doc.hidden = true;
  app.doc.fire('visibilitychange');
  assert.equal(app.controls.active, false);
  app.doc.hidden = false;
  app.doc.fire('visibilitychange');
  assert.equal(app.controls.active, false, 'returning to the tab must not resume combat automatically');
  app.controls.stop();
  app.controls.start();
  assert.equal(app.controls.dragMode, true);
  assert.equal(requests, 1, 'restart preserves the selected fallback');
});

test('late capture results cannot undo the chosen fallback or pause a newer retry', async t => {
  let rejectFirst;
  const app = fixture(t, () => new Promise((_resolve, reject) => { rejectFirst = reject; }));
  app.controls.start();
  app.drag.fire('click');
  app.doc.pointerLockElement = app.canvas;
  app.doc.fire('pointerlockchange');
  assert.equal(app.doc.pointerLockElement, null, 'late capture is released after fallback selection');
  assert.equal(app.controls.dragMode, true);
  app.canvas.requestPointerLock = () => {};
  app.hint.children[1].fire('click');
  rejectFirst(new Error('Old attempt failed'));
  await nextTurn();
  assert.equal(app.title.textContent, 'Mouse controls');
  assert.equal(app.capture.disabled, true, 'an old rejected promise must not cancel the current retry');
  app.controls.stop();
  app.doc.fire('pointerlockerror');
  assert.equal(app.panel.hidden, true, 'late errors cannot reopen controls after game over');
});
