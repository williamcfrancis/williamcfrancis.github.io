import * as THREE from 'three';
import { ZoomManager, isInteractiveTarget } from './ZoomManager';
import { PerfMonitor } from './PerfMonitor';
import { Palette } from './Palette';
import { TransitionManager } from './TransitionManager';
import { AutoTour } from './AutoTour';
import { StarField } from './StarField';
import { NeuronLevel } from './levels/NeuronLevel';
import { LayerLevel } from './levels/LayerLevel';
import { BlockLevel } from './levels/BlockLevel';
import { TransformerLevel } from './levels/TransformerLevel';
import { ModelLevel } from './levels/ModelLevel';
import { LeapLevel } from './levels/LeapLevel';
import { GalaxyLevel } from './levels/GalaxyLevel';
import type { Level, LevelContext } from './levels/Level';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const threeCanvas = document.getElementById('three-canvas') as HTMLCanvasElement;
const overlayCanvas = document.getElementById('overlay-canvas') as HTMLCanvasElement;
const starCanvas = document.getElementById('star-canvas') as HTMLCanvasElement;
const ctx = overlayCanvas.getContext('2d')!;

const initialRatio = Math.min(window.devicePixelRatio, 2);
const renderer = new THREE.WebGLRenderer({
  canvas: threeCanvas,
  antialias: true,
  alpha: true,
  premultipliedAlpha: true,
});
renderer.setPixelRatio(initialRatio);
renderer.setClearColor(0x040812, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 5);

const perf = new PerfMonitor(initialRatio);
perf.onDownshift((tier, ratio) => {
  renderer.setPixelRatio(ratio);
  uiPerfIndicator.textContent = `Performance: Reduced (${ratio.toFixed(2)}×)`;
  uiPerfIndicator.classList.add('visible');
});
perf.onUpshift((tier, ratio) => {
  renderer.setPixelRatio(ratio);
  if (tier === 0) {
    uiPerfIndicator.classList.remove('visible');
  } else {
    uiPerfIndicator.textContent = `Performance: Auto (${ratio.toFixed(2)}×)`;
  }
});

const palette = new Palette();
palette.attach(document.getElementById('vignette-layer')!);

const zoomManager = new ZoomManager();
const autoTour = new AutoTour(zoomManager);
const transitionManager = new TransitionManager();
const starField = new StarField(starCanvas, 220, reducedMotion);

zoomManager.onUserInput(() => {
  if (autoTour.isActive()) autoTour.stop();
});

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  overlayCanvas.width = w * window.devicePixelRatio;
  overlayCanvas.height = h * window.devicePixelRatio;
  overlayCanvas.style.width = w + 'px';
  overlayCanvas.style.height = h + 'px';
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resize();
window.addEventListener('resize', resize);

const uiLabel = document.getElementById('level-label')!;
const uiSub = document.getElementById('sub-label')!;
const uiAnnotation = document.getElementById('annotation-box')!;
const uiCounter = document.getElementById('param-counter')!;
const uiParamValue = document.getElementById('param-value')!;
const uiActivationToggle = document.getElementById('activation-toggle')!;
const uiEquation = document.getElementById('equation-display')!;
const uiCompCards = document.getElementById('comparison-cards')!;
const uiBrainCompare = document.getElementById('brain-compare')!;
const uiScrollHint = document.getElementById('scroll-hint')!;
const uiLoading = document.getElementById('loading-screen')!;
const uiLoadingFill = document.getElementById('loading-fill')!;
const uiLoadingSub = document.getElementById('loading-sub')!;
const uiLayerEl = document.getElementById('ui-layer')!;
const uiPerfIndicator = document.getElementById('perf-indicator')!;
const uiScrubberFill = document.getElementById('scrubber-fill')!;
const uiPlayBtn = document.getElementById('play-btn')!;
const uiHelpBtn = document.getElementById('help-btn')!;
const uiHelpModal = document.getElementById('help-modal')!;
const uiReflectCard = document.getElementById('reflect-card')!;

let currentDisplayedParam = 0;
let targetParam = 0;
let perLevelTargetParam: number | null = null;
let perLevelSubLabel: string | null = null;
let annotationTimer = 0;
let prevLevel = -1;

const levelBounds = [
  { start: 0.0,  end: 0.17 },
  { start: 0.13, end: 0.30 },
  { start: 0.26, end: 0.44 },
  { start: 0.40, end: 0.58 },
  { start: 0.54, end: 0.73 },
  { start: 0.69, end: 0.875 },
  { start: 0.86, end: 1.0  },
];

const annotations = [
  "The atom of every neural network. A weighted sum, a nonlinear function, an output. From GPT to AlphaFold, everything is built from these.",
  "Thirty-two neurons; one thousand and twenty-four connections. Each weight is a tiny dial. Training is the patient work of turning every dial until the outputs become useful.",
  "Attention is the idea that broke open the field. Every token in a sentence can look at every other token at once, and decide for itself what matters. This is one head — modern models run dozens at a time.",
  "GPT-2 stacks twelve of these. GPT-4 stacks hundreds. Early layers learn grammar. Middle layers learn meaning. Late layers learn what to say next.",
  "GPT-2, 2019. OpenAI initially declined to release it — \u201ctoo dangerous,\u201d they said. It could write a paragraph that almost made sense. Five years later, it is a toy.",
  "If GPT-2 were a studio apartment, GPT-4 would be a city. The scaling laws say: make it bigger, feed it more, and it grows smarter. No one fully understands why.",
  "And this is only the model. It says nothing of the data fed to it, the electricity it consumed, the people it borrowed from, or what happens when it is wrong. Scale is not understanding.",
];

const levelLabels = [
  { title: "The Neuron", sub: "" },
  { title: "The Layer", sub: "Dense Layer — 32 neurons, 1,024 connections" },
  { title: "The Block", sub: "One Attention Head — ~262K parameters" },
  { title: "The Transformer Layer", sub: "12 heads, ~7M parameters" },
  { title: "The Model", sub: "GPT-2 Small — 12 layers, 124M parameters" },
  { title: "The Leap", sub: "" },
  { title: "The Galaxy", sub: "1,000,000,000,000+" },
];

const paramCounts = [0, 1024, 262144, 7000000, 124000000, 175000000000, 1000000000000];

const levelContext: LevelContext = {
  scene, renderer, camera, ctx, canvas: overlayCanvas, perf, reducedMotion,
  setSubLabel: (text: string) => { perLevelSubLabel = text; },
  setParamTarget: (n: number) => { perLevelTargetParam = n; },
};

const levels: Level[] = [
  new NeuronLevel(),
  new LayerLevel(),
  new BlockLevel(),
  new TransformerLevel(),
  new ModelLevel(),
  new LeapLevel(),
  new GalaxyLevel(),
];

levels.forEach(l => l.init(levelContext));

function formatParamCount(n: number): string {
  if (n >= 1e12) return (n / 1e12).toFixed(1) + 'T';
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return n.toLocaleString();
  return n.toString();
}

function getActiveLevel(zoom: number): number {
  for (let i = levelBounds.length - 1; i >= 0; i--) {
    const mid = (levelBounds[i].start + levelBounds[i].end) / 2;
    if (zoom >= mid) return i;
  }
  return 0;
}

function getLevelOpacity(levelIdx: number, zoom: number): number {
  const b = levelBounds[levelIdx];
  const fadeZone = 0.04;

  if (zoom < b.start - 0.001) return 0;
  if (zoom > b.end + 0.001) return 0;

  let opacity = 1;

  if (levelIdx === 0) {
    if (zoom > b.end - fadeZone) {
      opacity = (b.end - zoom) / fadeZone;
    }
  } else if (levelIdx === levelBounds.length - 1) {
    if (zoom < b.start + fadeZone) {
      opacity = (zoom - b.start) / fadeZone;
    }
  } else {
    if (zoom < b.start + fadeZone) {
      opacity = Math.min(opacity, (zoom - b.start) / fadeZone);
    }
    if (zoom > b.end - fadeZone) {
      opacity = Math.min(opacity, (b.end - zoom) / fadeZone);
    }
  }

  return Math.max(0, Math.min(1, opacity));
}

const enteredLevels = new Set<number>();

function notifyEnterExit(zoom: number) {
  for (let i = 0; i < levels.length; i++) {
    const op = getLevelOpacity(i, zoom);
    const lvl = levels[i] as any;
    if (op > 0.001 && !enteredLevels.has(i)) {
      enteredLevels.add(i);
      if (typeof lvl.enter === 'function') lvl.enter();
    } else if (op <= 0.001 && enteredLevels.has(i)) {
      enteredLevels.delete(i);
      if (typeof lvl.exit === 'function') lvl.exit();
    }
  }
}

transitionManager.on('levelChangeStart', () => {
  uiLayerEl.classList.add('transitioning');
  setTimeout(() => uiLayerEl.classList.remove('transitioning'), 600);
});

// URL state persistence
const hash = window.location.hash;
const hashMatch = hash.match(/z=([\d.]+)/);
if (hashMatch) {
  const z = Math.max(0, Math.min(1, parseFloat(hashMatch[1])));
  zoomManager.setTargetSilent(z);
}
let lastHashUpdate = 0;
function maybeUpdateHash(z: number, now: number) {
  if (now - lastHashUpdate < 200) return;
  lastHashUpdate = now;
  history.replaceState(null, '', `#z=${z.toFixed(3)}`);
}

// Scrubber click handlers
const scrubberLabels = document.querySelectorAll<HTMLElement>('.scrubber-label');
const levelCenters = [0.085, 0.215, 0.35, 0.49, 0.635, 0.785, 0.93];
scrubberLabels.forEach((el, idx) => {
  el.addEventListener('click', () => {
    autoTour.flyTo(levelCenters[idx], 4);
  });
});
const scrubberTrack = document.getElementById('scrubber-track');
scrubberTrack?.addEventListener('click', (e) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const t = (e.clientX - rect.left) / rect.width;
  zoomManager.setTarget(Math.max(0, Math.min(1, t)));
});

// Play button
function setPlayBtnState(active: boolean) {
  uiPlayBtn.classList.toggle('active', active);
  uiPlayBtn.textContent = active ? '⏸ Tour' : '▶ Tour';
}
uiPlayBtn.addEventListener('click', () => {
  if (autoTour.isActive()) {
    autoTour.stop();
  } else {
    autoTour.start();
  }
});
autoTour.onChange(setPlayBtnState);

// Help modal
uiHelpBtn.addEventListener('click', () => uiHelpModal.classList.add('visible'));
uiHelpModal.addEventListener('click', () => uiHelpModal.classList.remove('visible'));

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (isInteractiveTarget(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key >= '1' && e.key <= '7') {
    const idx = Number(e.key) - 1;
    autoTour.flyTo(levelCenters[idx], 4);
  } else if (e.key === ' ') {
    e.preventDefault();
    if (autoTour.isActive()) autoTour.stop();
    else autoTour.start();
  } else if (e.key === '?') {
    uiHelpModal.classList.toggle('visible');
  } else if (e.key === 'Escape') {
    uiHelpModal.classList.remove('visible');
  }
});

// Loading screen with shader pre-compile
uiLoadingFill.style.width = '60%';
uiLoadingSub.textContent = 'Compiling shaders…';
const compileStart = performance.now();
try {
  renderer.compile(scene, camera);
} catch {}
const compileMs = performance.now() - compileStart;
const minLoadingMs = 600;
const settle = Math.max(minLoadingMs - compileMs, 100);
setTimeout(() => {
  uiLoadingFill.style.width = '100%';
  setTimeout(() => {
    uiLoading.classList.add('hidden');
    setTimeout(() => { uiLoading.style.display = 'none'; }, 800);
  }, 200);
}, settle);

// Debug HUD
const isDebug = new URLSearchParams(window.location.search).get('debug') === '1';
let uiDebug: HTMLElement | null = null;
if (isDebug) {
  uiDebug = document.createElement('div');
  uiDebug.id = 'debug-hud';
  uiDebug.style.cssText = 'position:fixed;top:4px;right:6px;z-index:1000;font:600 11px JetBrains Mono,monospace;color:#a8e6cf;background:rgba(0,0,0,0.7);padding:6px 10px;border-radius:6px;line-height:1.4;pointer-events:none;';
  document.body.appendChild(uiDebug);
}

let lastTime = performance.now();
let frameCounter = 0;

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  frameCounter++;

  perf.tick(dt);
  zoomManager.update(dt);
  autoTour.tick(dt);

  const zoom = zoomManager.getZoom();
  const activeLevel = getActiveLevel(zoom);

  transitionManager.tick(dt, activeLevel);
  starField.tick(dt, zoom);
  palette.applyTo(renderer, zoom);

  notifyEnterExit(zoom);

  // Scrubber
  uiScrubberFill.style.width = (zoom * 100) + '%';

  // URL hash
  maybeUpdateHash(zoom, now);

  if (zoom > 0.02 && uiScrollHint.style.opacity !== '0') {
    uiScrollHint.style.opacity = '0';
  }

  // Reflect card — the museum's closing thought, gated late so it doesn't
  // upstage the galaxy reveal. When it shows, the comparison cards and
  // brain-compare bow out so it stands alone.
  const showReflect = zoom > 0.97;
  uiReflectCard.classList.toggle('visible', showReflect);
  if (showReflect) {
    uiCompCards.classList.remove('visible');
    uiBrainCompare.style.opacity = '0';
    uiAnnotation.classList.remove('visible');
  }

  if (activeLevel !== prevLevel) {
    prevLevel = activeLevel;
    annotationTimer = 0;
    perLevelSubLabel = null;
    perLevelTargetParam = null;

    const lbl = levelLabels[activeLevel];
    uiLabel.textContent = lbl.title;
    uiLabel.classList.add('visible');

    uiSub.textContent = lbl.sub;
    uiSub.classList.toggle('visible', !!lbl.sub);

    uiAnnotation.classList.remove('visible');

    uiActivationToggle.classList.toggle('visible', activeLevel === 0);
    uiEquation.classList.toggle('visible', activeLevel === 0);

    targetParam = paramCounts[activeLevel];
    uiCounter.classList.toggle('visible', activeLevel >= 1);

    uiBrainCompare.style.opacity = activeLevel === 4 ? '1' : '0';

    if (activeLevel === 6) {
      uiCompCards.innerHTML = `
        <div class="comparison-card"><span class="card-icon">🏖️</span>If each parameter were a grain of sand: 10 Olympic swimming pools.</div>
        <div class="comparison-card"><span class="card-icon">⏱️</span>If you counted one parameter per second, it would take 31,700 years.</div>
        <div class="comparison-card"><span class="card-icon">✨</span>If each parameter were a star, this would be a small galaxy.</div>
      `;
      uiCompCards.classList.add('visible');
    } else {
      uiCompCards.classList.remove('visible');
    }
  }

  // Per-level overrides (e.g., LeapLevel sub-zoom)
  if (perLevelSubLabel !== null) {
    uiSub.textContent = perLevelSubLabel;
    uiSub.classList.add('visible');
  }
  if (perLevelTargetParam !== null) {
    targetParam = perLevelTargetParam;
  }

  annotationTimer += dt;
  if (!showReflect && annotationTimer > 2 && !uiAnnotation.classList.contains('visible')) {
    uiAnnotation.textContent = annotations[activeLevel];
    uiAnnotation.classList.add('visible');
  }

  if (currentDisplayedParam !== targetParam) {
    const diff = targetParam - currentDisplayedParam;
    const speed = Math.max(Math.abs(diff) * 3, 100);
    const step = Math.sign(diff) * Math.min(Math.abs(diff), speed * dt);
    if (Math.abs(diff) < 1) {
      currentDisplayedParam = targetParam;
    } else {
      currentDisplayedParam += step;
    }
    uiParamValue.textContent = formatParamCount(Math.round(currentDisplayedParam));
  }

  ctx.clearRect(0, 0, overlayCanvas.width / window.devicePixelRatio, overlayCanvas.height / window.devicePixelRatio);

  const isCanvas2D = (i: number) => i <= 3;

  for (let i = 0; i < levels.length; i++) {
    const opacity = getLevelOpacity(i, zoom);
    const updateThreshold = isCanvas2D(i) ? 0.05 : 0.001;
    if (opacity > updateThreshold) {
      const localZoom = (zoom - levelBounds[i].start) / (levelBounds[i].end - levelBounds[i].start);
      levels[i].update(dt, Math.max(0, Math.min(1, localZoom)), opacity);
      const renderThreshold = isCanvas2D(i) ? 0.02 : 0.001;
      if (opacity > renderThreshold) {
        levels[i].render(opacity);
      }
    }
  }

  renderer.render(scene, camera);

  if (uiDebug && (frameCounter % 15 === 0)) {
    const calls = (renderer.info.render as any).calls ?? renderer.info.render.calls;
    const tris = renderer.info.render.triangles;
    const pts = renderer.info.render.points ?? 0;
    uiDebug.innerHTML =
      `fps: ${perf.getAvgFps().toFixed(0)}<br>` +
      `dpr: ${perf.getRatioCap().toFixed(2)}<br>` +
      `lvl: ${activeLevel} z:${zoom.toFixed(3)}<br>` +
      `calls: ${calls}<br>` +
      `tris: ${tris}<br>` +
      `pts: ${pts}`;
  }
}

animate();
