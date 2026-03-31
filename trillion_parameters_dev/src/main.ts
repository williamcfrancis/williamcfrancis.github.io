import * as THREE from 'three';
import { ZoomManager } from './ZoomManager';
import { NeuronLevel } from './levels/NeuronLevel';
import { LayerLevel } from './levels/LayerLevel';
import { BlockLevel } from './levels/BlockLevel';
import { TransformerLevel } from './levels/TransformerLevel';
import { ModelLevel } from './levels/ModelLevel';
import { LeapLevel } from './levels/LeapLevel';
import { GalaxyLevel } from './levels/GalaxyLevel';
import type { Level } from './levels/Level';

const threeCanvas = document.getElementById('three-canvas') as HTMLCanvasElement;
const overlayCanvas = document.getElementById('overlay-canvas') as HTMLCanvasElement;
const ctx = overlayCanvas.getContext('2d')!;

const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x040812, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, 5);

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

const zoomManager = new ZoomManager();

const levels: Level[] = [
  new NeuronLevel(ctx, overlayCanvas),
  new LayerLevel(ctx, overlayCanvas),
  new BlockLevel(ctx, overlayCanvas),
  new TransformerLevel(ctx, overlayCanvas),
  new ModelLevel(scene, renderer, camera),
  new LeapLevel(scene, renderer, camera),
  new GalaxyLevel(scene, renderer, camera),
];

const levelBounds = [
  { start: 0.0,  end: 0.17 },
  { start: 0.13, end: 0.30 },
  { start: 0.26, end: 0.44 },
  { start: 0.40, end: 0.58 },
  { start: 0.54, end: 0.73 },
  { start: 0.69, end: 0.88 },
  { start: 0.84, end: 1.0  },
];

const annotations = [
  "This is the fundamental unit of every neural network. A weighted sum, a nonlinear function, and an output. Everything from GPT to AlphaFold is made of these.",
  "A single layer of 32 neurons has 1,024 connections. Each connection has a learnable weight. Training is the process of adjusting every weight until the outputs are useful.",
  "Attention is the key insight behind Transformers. Instead of processing tokens one by one, every token can 'look at' every other token simultaneously and decide what's relevant. This single head is one of many working in parallel.",
  "GPT-2 has 12 of these stacked on top of each other. GPT-4 has hundreds. Each layer refines the representation — early layers handle syntax, later layers handle meaning.",
  "GPT-2 was released in 2019. OpenAI initially called it 'too dangerous to release.' It could write a coherent paragraph. Today, it's a toy.",
  "If GPT-2 were a studio apartment, GPT-4 would be a city. The scaling laws say: make it bigger, give it more data, and it gets smarter. No one fully understands why.",
  "And this is just the model. It says nothing about the data it was trained on, the energy it consumed, or what happens when it makes a mistake. Scale is not understanding.",
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

const uiLabel = document.getElementById('level-label')!;
const uiSub = document.getElementById('sub-label')!;
const uiAnnotation = document.getElementById('annotation-box')!;
const uiCounter = document.getElementById('param-counter')!;
const uiParamValue = document.getElementById('param-value')!;
const uiZoomThumb = document.getElementById('zoom-thumb')!;
const uiActivationToggle = document.getElementById('activation-toggle')!;
const uiEquation = document.getElementById('equation-display')!;
const uiCompCards = document.getElementById('comparison-cards')!;
const uiBrainCompare = document.getElementById('brain-compare')!;
const uiScrollHint = document.getElementById('scroll-hint')!;
const uiLoading = document.getElementById('loading-screen')!;
const uiLoadingFill = document.getElementById('loading-fill')!;

let currentDisplayedParam = 0;
let targetParam = 0;
let annotationTimer = 0;
let prevLevel = -1;
let scrollHintVisible = true;

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

levels.forEach(l => l.init());

uiLoadingFill.style.width = '100%';
setTimeout(() => {
  uiLoading.classList.add('hidden');
  setTimeout(() => { uiLoading.style.display = 'none'; }, 800);
}, 600);

let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  const zoom = zoomManager.getZoom();
  const activeLevel = getActiveLevel(zoom);

  if (scrollHintVisible && zoom > 0.02) {
    scrollHintVisible = false;
    uiScrollHint.style.opacity = '0';
  }

  uiZoomThumb.style.top = (zoom * 180) + 'px';

  const bgBlend = Math.min(1, zoom * 1.5);
  const bgR = Math.round(4 * (1 - bgBlend * 0.9));
  const bgG = Math.round(8 * (1 - bgBlend * 0.9));
  const bgB = Math.round(18 * (1 - bgBlend * 0.6));
  renderer.setClearColor(new THREE.Color(`rgb(${Math.max(0, bgR)},${Math.max(0, bgG)},${Math.max(0, bgB)})`), 1);

  if (activeLevel !== prevLevel) {
    prevLevel = activeLevel;
    annotationTimer = 0;

    const lbl = levelLabels[activeLevel];
    uiLabel.textContent = lbl.title;
    uiLabel.classList.add('visible');

    if (activeLevel === 5) {
      uiSub.textContent = "GPT-3 — 175B parameters (~1,400× GPT-2)";
      uiSub.classList.add('visible');
    } else {
      uiSub.textContent = lbl.sub;
      uiSub.classList.toggle('visible', !!lbl.sub);
    }

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

  if (activeLevel === 5) {
    const localZoom = (zoom - levelBounds[5].start) / (levelBounds[5].end - levelBounds[5].start);
    if (localZoom > 0.5) {
      uiSub.textContent = "GPT-4 (estimated) — ~1.8T parameters (~14,500× GPT-2)";
      targetParam = 1800000000000;
    } else {
      uiSub.textContent = "GPT-3 — 175B parameters (~1,400× GPT-2)";
      targetParam = 175000000000;
    }
  }

  annotationTimer += dt;
  if (annotationTimer > 2 && !uiAnnotation.classList.contains('visible')) {
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

  for (const obj of scene.children.slice()) {
    if ((obj as any)._levelObject) {
      scene.remove(obj);
    }
  }

  for (let i = 0; i < levels.length; i++) {
    const opacity = getLevelOpacity(i, zoom);
    if (opacity > 0.001) {
      const localZoom = (zoom - levelBounds[i].start) / (levelBounds[i].end - levelBounds[i].start);
      levels[i].update(dt, Math.max(0, Math.min(1, localZoom)), opacity);
      levels[i].render(opacity);
    }
  }

  renderer.render(scene, camera);
}

animate();
