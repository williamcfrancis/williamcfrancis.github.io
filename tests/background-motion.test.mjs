import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const source = readFileSync(new URL('../static/js/webgl-fluid.js', import.meta.url), 'utf8');

function eventTarget(initial = {}) {
  const listeners = new Map();
  return Object.assign(initial, {
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(callback);
    },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback); },
    dispatch(name, event = {}) {
      for (const callback of listeners.get(name) ?? []) callback(event);
    },
  });
}

// Execute the actual vendor script. Only the browser/GPU boundary is mocked;
// draw counts catch render work continuing after visibility or motion changes.
function createFluidPage({ reduced = false, width = 1280, height = 720, dpr = 1, savedPanelState } = {}) {
  const frames = new Map();
  let nextFrame = 0;
  let draws = 0;
  const allocations = [];
  const motion = eventTarget({ matches: reduced });
  const canvas = { clientWidth: width, clientHeight: height, width: 0, height: 0 };
  const gl = new Proxy({}, {
    get(_target, name) {
      if (name === 'drawingBufferWidth') return canvas.width;
      if (name === 'drawingBufferHeight') return canvas.height;
      if (name === 'getExtension') return () => ({});
      if (name === 'getProgramParameter') return (_program, param) => param === 'ACTIVE_UNIFORMS' ? 0 : true;
      if (name === 'getShaderParameter') return () => true;
      if (name === 'checkFramebufferStatus') return () => 'FRAMEBUFFER_COMPLETE';
      if (name === 'drawElements') return () => { draws++; };
      if (name === 'texImage2D') return (...args) => { allocations.push(args.slice(3, 5)); };
      if (String(name).startsWith('create')) return () => ({});
      if (/^[A-Z_0-9]+$/.test(String(name))) return name;
      return () => {};
    },
  });
  canvas.getContext = () => gl;
  const document = eventTarget({
    hidden: false,
    getElementsByTagName: () => [canvas],
    getElementsByClassName: () => [],
    getElementById: () => null,
    createElement: () => ({ style: {} }),
  });
  let guiConfig;
  let panelClosed = false;
  const gui = {
    useLocalStorage: savedPanelState !== undefined,
    load: { closed: savedPanelState },
    add(config) {
      if ('SIM_RESOLUTION' in config) guiConfig = config;
      return gui;
    },
    addFolder: () => gui,
    addColor: () => gui,
    name: () => gui,
    onFinishChange: () => gui,
    step: () => gui,
    listen: () => gui,
    close: () => { panelClosed = true; },
    __li: { style: {} },
    domElement: { parentElement: { appendChild() {} } },
  };
  const page = eventTarget({
    document,
    navigator: { userAgent: 'test-browser' },
    devicePixelRatio: dpr,
    matchMedia: query => query.includes('reduced-motion') ? motion : { matches: width <= 720 },
    requestAnimationFrame: callback => { const id = ++nextFrame; frames.set(id, callback); return id; },
    cancelAnimationFrame: id => frames.delete(id),
    dat: { GUI: function () { return gui; } },
    Image: class {},
    console,
  });
  page.window = page;
  vm.runInNewContext(source, page, { filename: 'webgl-fluid.js' });
  return {
    page, document, canvas, motion, frames, allocations,
    get config() { return guiConfig; },
    get panelClosed() { return panelClosed; },
    get draws() { return draws; },
    tick() {
      const pending = [...frames];
      frames.clear();
      for (const [, callback] of pending) callback();
    },
    setHidden(hidden) { document.hidden = hidden; document.dispatch('visibilitychange'); },
    setReduced(matches) { motion.matches = matches; motion.dispatch('change', { matches }); },
  };
}

test('hidden background cancels all frame work and preserves the manual pause setting', () => {
  const fluid = createFluidPage();
  const initialDraws = fluid.draws;
  fluid.tick();
  assert.ok(fluid.draws > initialDraws, 'visible fluid draws normally');
  fluid.config.PAUSED = true; // equivalent to selecting the GUI pause checkbox
  fluid.setHidden(true);
  assert.equal(fluid.frames.size, 0);
  const hiddenDraws = fluid.draws;
  fluid.page.fluidSplatScreen(200, 200, 190, 190);
  fluid.tick();
  assert.equal(fluid.draws, hiddenDraws, 'hidden external splats do not dispatch GPU work');
  fluid.setHidden(false);
  assert.equal(fluid.config.PAUSED, true, 'tab return must not unpause the simulation');
  assert.equal(fluid.frames.size, 1);
  fluid.document.dispatch('visibilitychange');
  assert.equal(fluid.frames.size, 1, 'repeated visibility events do not duplicate the loop');
});

test('reduced motion survives visibility changes and responds to a live preference change', () => {
  const fluid = createFluidPage({ reduced: true });
  assert.equal(fluid.frames.size, 0);
  fluid.setHidden(true);
  fluid.setHidden(false);
  assert.equal(fluid.frames.size, 0, 'returning to the tab must not override reduced motion');
  const pausedDraws = fluid.draws;
  fluid.page.fluidSplatScreen(100, 100, 90, 90);
  assert.equal(fluid.draws, pausedDraws);
  fluid.setReduced(false);
  assert.equal(fluid.frames.size, 1);
  fluid.tick();
  assert.ok(fluid.draws > pausedDraws);
  fluid.setReduced(true);
  assert.equal(fluid.frames.size, 0, 'enabling reduced motion cancels the pending frame');
});

test('framebuffer bounds preserve desktop sizing and apply mobile defaults before allocation', () => {
  const desktop = createFluidPage();
  assert.equal(desktop.canvas.width, 1280);
  assert.equal(desktop.canvas.height, 720);
  assert.equal(desktop.config.DYE_RESOLUTION, 1024);
  assert.equal(desktop.panelClosed, false);
  const phone = createFluidPage({ width: 390, height: 844, dpr: 3 });
  assert.equal(phone.canvas.width, 780);
  assert.equal(phone.canvas.height, 1688);
  assert.equal(phone.config.SIM_RESOLUTION, 64);
  assert.equal(phone.config.DYE_RESOLUTION, 512);
  assert.equal(phone.panelClosed, true, 'small viewports start with collapsed controls');
  assert.ok(phone.allocations.some(([width, height]) => width === 512 && height > 512));
  const large = createFluidPage({ width: 7680, height: 4320, dpr: 2 });
  assert.ok(large.canvas.width * large.canvas.height <= 8294400);
  const savedPhone = createFluidPage({ width: 390, height: 844, savedPanelState: false });
  assert.equal(savedPhone.panelClosed, false, 'a saved open-panel choice overrides the mobile default');
});
