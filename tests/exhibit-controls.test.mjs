import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { AutoTour } from '../games/trillion_parameters/src/AutoTour.ts';
import { ZoomManager } from '../games/trillion_parameters/src/ZoomManager.ts';
import { ModelLevel } from '../games/trillion_parameters/src/levels/ModelLevel.ts';
import { LeapLevel } from '../games/trillion_parameters/src/levels/LeapLevel.ts';
import { GalaxyLevel } from '../games/trillion_parameters/src/levels/GalaxyLevel.ts';
import { IdleManagerImpl } from '../games/scale_of_autonomy/src/idle.ts';

function globals(t, values) {
  const originals = new Map(Object.keys(values).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  Object.assign(globalThis, values);
  t.after(() => {
    for (const [key, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
}

test('starting the full tour after a level shortcut still visits the galaxy', () => {
  let position = 0;
  const zoom = { getZoom: () => position, setTargetSilent: value => { position = value; } };
  const tour = new AutoTour(zoom);
  tour.flyTo(0.35);
  tour.tick(2);
  assert.equal(position, 0.35);
  assert.equal(tour.isActive(), false);
  tour.start();
  tour.tick(80);
  assert.equal(position, 0.92);
  assert.equal(tour.isActive(), false);
});

test('zoom preserves native slider controls and rejects non-finite URL targets', t => {
  const handlers = {};
  globals(t, { window: { addEventListener: (name, handler) => { handlers[name] = handler; } } });
  const zoom = new ZoomManager();
  const control = { closest: () => ({}) };
  const event = { target: control, key: 'ArrowUp', touches: [{ clientX: 0, clientY: 20 }],
    preventDefault: () => assert.fail('An interactive control must keep its default behavior') };
  handlers.keydown(event);
  handlers.touchstart(event);
  handlers.touchmove(event);
  handlers.wheel(event);
  assert.equal(zoom.getTargetZoom(), 0);
  zoom.setTargetSilent(0.4);
  zoom.setTargetSilent(NaN);
  zoom.setTarget(Infinity);
  assert.equal(zoom.getTargetZoom(), 0.4);
  handlers.keydown({ target: null, key: 'ArrowDown', preventDefault() {} });
  assert.ok(Math.abs(zoom.getTargetZoom() - 0.43) < 1e-12);
});

test('jumping out of a 3D level hides its scene group even without a final fade frame', t => {
  globals(t, { window: { addEventListener() {} }, document: { getElementById: () => null } });
  for (const Level of [ModelLevel, LeapLevel, GalaxyLevel]) {
    const scene = new THREE.Scene();
    const level = new Level();
    level.init({ scene, camera: new THREE.PerspectiveCamera(), perf: { tier: 2 }, reducedMotion: true,
      setSubLabel() {}, setParamTarget() {} });
    level.update(0.016, 0.5, 1);
    assert.equal(scene.children[0].visible, true, Level.name);
    level.exit();
    assert.equal(scene.children[0].visible, false, Level.name);
    scene.traverse(object => {
      object.geometry?.dispose();
      for (const material of [object.material].flat().filter(Boolean)) material.dispose();
    });
  }
});

test('idle animation follows the most visible section and stops after all sections leave', t => {
  let observe;
  let frame;
  globals(t, {
    IntersectionObserver: class { constructor(callback) { observe = callback; } observe() {} unobserve() {} },
    requestAnimationFrame: callback => { frame = callback; return 1; },
    cancelAnimationFrame() {},
  });
  const manager = new IdleManagerImpl();
  const ticks = [];
  const first = { id: 'level-1' };
  const second = { id: 'level-2' };
  manager.register(1, () => ticks.push(1), first);
  manager.register(2, () => ticks.push(2), second);
  manager.begin();
  observe([{ target: first, isIntersecting: true, intersectionRatio: 0.75 }]);
  frame(performance.now());
  observe([{ target: second, isIntersecting: true, intersectionRatio: 0.25 }]);
  frame(performance.now());
  observe([{ target: first, isIntersecting: false, intersectionRatio: 0 }]);
  frame(performance.now());
  observe([{ target: second, isIntersecting: false, intersectionRatio: 0 }]);
  frame(performance.now());
  assert.deepEqual(ticks, [1, 1, 2]);
  manager.stop();
});
