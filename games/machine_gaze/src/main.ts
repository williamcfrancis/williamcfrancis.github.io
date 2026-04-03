import './style.css';
import { detectEdges } from './edges';
import { infernoColormap } from './colormap';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface ObjectResult {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
}

interface SegmentResult {
  label: string;
  score: number | null;
  maskData: Uint8Array;
  width: number;
  height: number;
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const MAX_SIZE = 1024;

const DEMO_IMAGES = [
  {
    thumb: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=220&q=60',
    full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1024&q=80',
    label: 'City Street',
  },
  {
    thumb: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=220&q=60',
    full: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1024&q=80',
    label: 'Dog in Park',
  },
  {
    thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=220&q=60',
    full: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1024&q=80',
    label: 'Kitchen',
  },
];

const ANNOTATIONS: Record<string, string> = {
  original:
    "This is what you see — a cohesive scene understood instantly. Your <em>visual cortex</em> dedicates 30% of your brain's total activity to achieve this effortless perception.",
  edges:
    'A robot has no concept of "things." It starts with <em>gradients</em> — where does brightness change sharply? These edges are all it has before higher reasoning kicks in.',
  depth:
    'This depth map was estimated from a <em>single 2D image</em> using a neural network trained on millions of stereo photo pairs. The robot has never seen this scene before, yet it can guess <em>distance</em>.',
  objects:
    '<em>DETR</em> (Detection Transformer) sees the photo as a set of 100 possible objects. Most slots are empty. The remaining few have labels and <em>confidence scores</em>. To the robot, your dog is "object #7, class: dog, confidence: 0.97."',
  segments:
    '<em>Panoptic segmentation</em> assigns every single pixel to either a "thing" (countable, like a person) or "stuff" (uncountable, like sky or grass). There is <em>no ambiguity</em> — every pixel belongs somewhere.',
};

const SEGMENT_PALETTE: [number, number, number][] = [
  [99, 210, 255],  [255, 107, 129], [78, 205, 196],  [255, 195, 113],
  [162, 155, 254], [0, 210, 180],   [255, 154, 162], [184, 233, 148],
  [250, 177, 210], [115, 192, 222], [255, 218, 121], [189, 147, 249],
  [255, 139, 94],  [128, 222, 234], [255, 171, 145], [149, 225, 211],
  [255, 205, 178], [167, 196, 255], [232, 183, 255], [179, 229, 252],
];

const STEP_LABELS = [
  'Detecting Edges',
  'Estimating Depth',
  'Finding Objects',
  'Segmenting Scene',
  'Compositing',
];

const SVG_NS = 'http://www.w3.org/2000/svg';

const EYE_SVG = `<svg class="eye-icon" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="cL"><rect x="0" y="0" width="100" height="100"/></clipPath>
    <clipPath id="cR"><rect x="100" y="0" width="100" height="100"/></clipPath>
    <radialGradient id="iG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38b2a0"/><stop offset="60%" stop-color="#1a6e5e"/><stop offset="100%" stop-color="#0d3830"/>
    </radialGradient>
  </defs>
  <path d="M10 50 Q100 -5 190 50 Q100 105 10 50Z" fill="none" stroke="rgba(78,205,196,0.4)" stroke-width="2.5"/>
  <g clip-path="url(#cL)">
    <circle cx="100" cy="50" r="26" fill="url(#iG)"/>
    <circle cx="100" cy="50" r="12" fill="#0b0d17"/>
    <circle cx="93" cy="42" r="4.5" fill="rgba(255,255,255,0.35)"/>
    <circle cx="89" cy="46" r="2" fill="rgba(255,255,255,0.18)"/>
  </g>
  <g clip-path="url(#cR)">
    <circle cx="100" cy="50" r="26" fill="none" stroke="#4ecdc4" stroke-width="1.5"/>
    <circle cx="100" cy="50" r="19" fill="none" stroke="#4ecdc4" stroke-width="0.6" stroke-dasharray="3 2.5"/>
    <circle cx="100" cy="50" r="12" fill="rgba(78,205,196,0.08)"/>
    <circle cx="100" cy="50" r="4" fill="#4ecdc4"/>
    <line x1="100" y1="24" x2="100" y2="76" stroke="#4ecdc4" stroke-width="0.4" opacity="0.35"/>
    <line x1="74" y1="50" x2="126" y2="50" stroke="#4ecdc4" stroke-width="0.4" opacity="0.35"/>
    <circle cx="113" cy="36" r="2" fill="#4ecdc4" opacity="0.7"/>
    <circle cx="117" cy="55" r="2" fill="#4ecdc4" opacity="0.7"/>
    <circle cx="109" cy="66" r="1.5" fill="#4ecdc4" opacity="0.6"/>
    <line x1="104" y1="47" x2="113" y2="36" stroke="#4ecdc4" stroke-width="0.5" opacity="0.45"/>
    <line x1="104" y1="52" x2="117" y2="55" stroke="#4ecdc4" stroke-width="0.5" opacity="0.45"/>
    <line x1="102" y1="54" x2="109" y2="66" stroke="#4ecdc4" stroke-width="0.5" opacity="0.4"/>
    <rect x="118" y="42" width="4" height="4" fill="none" stroke="#4ecdc4" stroke-width="0.6" rx="0.5"/>
    <rect x="106" y="29" width="3" height="3" fill="none" stroke="#4ecdc4" stroke-width="0.6" rx="0.5"/>
  </g>
</svg>`;

/* ═══════════════════════════════════════════
   APP ROOT
   ═══════════════════════════════════════════ */

const app = document.getElementById('app')!;

/* ═══════════════════════════════════════════
   PARTICLE BACKGROUND
   ═══════════════════════════════════════════ */

function startParticles(container: HTMLElement): () => void {
  const c = document.createElement('canvas');
  c.className = 'particles';
  container.insertBefore(c, container.firstChild);

  const ctx = c.getContext('2d')!;
  const dpr = Math.min(window.devicePixelRatio, 2);

  interface P { x: number; y: number; vx: number; vy: number; s: number; a: number }
  let ps: P[] = [];
  let W = 0, H = 0, raf = 0;

  function resize() {
    W = container.clientWidth;
    H = container.clientHeight;
    c.width = W * dpr;
    c.height = H * dpr;
    c.style.width = W + 'px';
    c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function init() {
    resize();
    const n = Math.min(80, Math.floor((W * H) / 14000));
    ps = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      s: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.25 + 0.08,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(78,205,196,${p.a})`;
      ctx.fill();
      for (let j = i + 1; j < ps.length; j++) {
        const q = ps[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16900) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(78,205,196,${0.055 * (1 - Math.sqrt(d2) / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(frame);
  }

  init();
  window.addEventListener('resize', resize);
  frame();
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); c.remove(); };
}

/* ═══════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════ */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}

function fitToCanvas(img: HTMLImageElement): HTMLCanvasElement {
  let { naturalWidth: w, naturalHeight: h } = img;
  if (Math.max(w, h) > MAX_SIZE) {
    const s = MAX_SIZE / Math.max(w, h);
    w = Math.round(w * s);
    h = Math.round(h * s);
  }
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  c.getContext('2d')!.drawImage(img, 0, 0, w, h);
  return c;
}

function makeThumbnail(src: HTMLCanvasElement, tw = 72, th = 48): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = tw; c.height = th;
  c.getContext('2d')!.drawImage(src, 0, 0, tw, th);
  return c;
}

async function fetchAsDataUrl(url: string): Promise<string> {
  const r = await fetch(url, { mode: 'cors' });
  const blob = await r.blob();
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/* ═══════════════════════════════════════════
   DRAG-AND-DROP
   ═══════════════════════════════════════════ */

let dropZone: HTMLElement | null = null;

function initDropZone() {
  if (dropZone) return;
  dropZone = document.createElement('div');
  dropZone.className = 'drop-zone';
  dropZone.innerHTML = `<div class="drop-zone-inner">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
    <p>Drop your photo here</p>
    <span>JPG, PNG, or WebP</span>
  </div>`;
  document.body.appendChild(dropZone);

  let dragCounter = 0;

  document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1) dropZone!.classList.add('visible');
  });
  document.addEventListener('dragleave', () => {
    dragCounter--;
    if (dragCounter <= 0) { dragCounter = 0; dropZone!.classList.remove('visible'); }
  });
  document.addEventListener('dragover', (e) => e.preventDefault());
  document.addEventListener('drop', async (e) => {
    e.preventDefault();
    dragCounter = 0;
    dropZone!.classList.remove('visible');
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = await fileToDataUrl(file);
      processImage(url);
    }
  });
}

/* ═══════════════════════════════════════════
   LANDING PHASE
   ═══════════════════════════════════════════ */

let stopParticles: (() => void) | null = null;

function showLanding() {
  app.innerHTML = '';
  initDropZone();

  const landing = document.createElement('div');
  landing.className = 'landing';
  landing.innerHTML = `
    <div class="landing-content">
      ${EYE_SVG}
      <h1>Machine Gaze</h1>
      <p class="subtitle">You see a photo. A robot sees geometry, probability, and math.</p>
      <div class="actions">
        <button class="btn btn-primary" id="btn-camera">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>Use your camera
        </button>
        <button class="btn btn-secondary" id="btn-file">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>Choose a photo
        </button>
        <input type="file" id="file-input" accept="image/*" hidden />
      </div>
      <div class="demos-section">
        <p class="demos-label">Or try a sample</p>
        <div class="demos-grid">
          ${DEMO_IMAGES.map((d, i) => `
            <button class="demo-thumb" data-idx="${i}">
              <img src="${d.thumb}" alt="${d.label}" crossorigin="anonymous" loading="lazy" />
              <span class="demo-label">${d.label}</span>
            </button>`).join('')}
        </div>
      </div>
    </div>`;

  app.appendChild(landing);
  stopParticles = startParticles(landing);

  document.getElementById('btn-camera')!.addEventListener('click', () => {
    stopParticles?.(); showCamera();
  });

  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  document.getElementById('btn-file')!.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    if (fileInput.files?.[0]) {
      stopParticles?.();
      processImage(await fileToDataUrl(fileInput.files[0]));
    }
  });

  landing.querySelectorAll<HTMLButtonElement>('.demo-thumb').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = Number(btn.dataset.idx);
      btn.classList.add('loading');
      try {
        const url = await fetchAsDataUrl(DEMO_IMAGES[idx].full);
        stopParticles?.();
        processImage(url);
      } catch {
        btn.classList.remove('loading');
      }
    });
  });
}

/* ═══════════════════════════════════════════
   CAMERA PHASE
   ═══════════════════════════════════════════ */

async function showCamera() {
  app.innerHTML = '';
  const view = document.createElement('div');
  view.className = 'camera-view';

  const video = document.createElement('video');
  video.autoplay = true; video.playsInline = true;

  const controls = document.createElement('div');
  controls.className = 'camera-controls';
  const captureBtn = document.createElement('button');
  captureBtn.className = 'btn-capture'; captureBtn.title = 'Take photo';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn-cancel'; cancelBtn.textContent = 'Cancel';
  controls.append(captureBtn, cancelBtn);
  view.append(video, controls);
  app.appendChild(view);

  let stream: MediaStream | null = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 960 } },
    });
    video.srcObject = stream;
  } catch { showLanding(); return; }

  captureBtn.addEventListener('click', () => {
    const c = document.createElement('canvas');
    c.width = video.videoWidth; c.height = video.videoHeight;
    c.getContext('2d')!.drawImage(video, 0, 0);
    stream?.getTracks().forEach((t) => t.stop());
    processImage(c.toDataURL('image/jpeg', 0.9));
  });
  cancelBtn.addEventListener('click', () => {
    stream?.getTracks().forEach((t) => t.stop());
    showLanding();
  });
}

/* ═══════════════════════════════════════════
   IMAGE ENTRY
   ═══════════════════════════════════════════ */

async function processImage(dataUrl: string) {
  const img = await loadImage(dataUrl);
  const imgCanvas = fitToCanvas(img);
  showProcessing(imgCanvas.toDataURL('image/jpeg', 0.9), imgCanvas);
}

/* ═══════════════════════════════════════════
   PROCESSING PHASE
   ═══════════════════════════════════════════ */

async function showProcessing(dataUrl: string, imgCanvas: HTMLCanvasElement) {
  app.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'processing';

  const bgImg = document.createElement('img');
  bgImg.className = 'processing-bg';
  bgImg.src = dataUrl;

  const scanline = document.createElement('div');
  scanline.className = 'scanline';

  const overlay = document.createElement('div');
  overlay.className = 'processing-overlay';

  const downloadBar = document.createElement('div');
  downloadBar.className = 'download-bar';
  downloadBar.style.display = 'none';
  downloadBar.innerHTML = `
    <p>Downloading AI models (~40 MB, cached for next time)</p>
    <div class="download-track"><div class="download-fill" id="dl-fill"></div></div>`;

  const timeline = document.createElement('div');
  timeline.className = 'timeline';

  const stepEls = STEP_LABELS.map((label) => {
    const el = document.createElement('div');
    el.className = 'timeline-step';
    el.innerHTML = `
      <div class="step-dot"><div class="step-dot-inner"></div></div>
      <div class="step-info">
        <span class="step-label">${label}</span>
        <span class="step-status">Waiting</span>
      </div>`;
    return el;
  });
  stepEls.forEach((s) => timeline.appendChild(s));
  overlay.append(downloadBar, timeline);
  root.append(bgImg, scanline, overlay);
  app.appendChild(root);

  const setStep = (i: number, state: 'waiting' | 'active' | 'done') => {
    stepEls[i].className = 'timeline-step' + (state !== 'waiting' ? ` ${state}` : '');
    const st = stepEls[i].querySelector('.step-status')!;
    st.textContent = state === 'active' ? 'Processing\u2026' : state === 'done' ? 'Complete' : 'Waiting';
  };

  setStep(0, 'active');
  await sleep(150);
  const ctx = imgCanvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
  const edgesData = detectEdges(imageData);
  setStep(0, 'done');
  await sleep(250);

  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

  interface TaskResults {
    depth: { depthData: Uint8Array; width: number; height: number } | null;
    objects: { objects: ObjectResult[] } | null;
    segments: { segments: SegmentResult[] } | null;
  }
  const results: TaskResults = { depth: null, objects: null, segments: null };
  const resolvers: Record<string, () => void> = {};
  const depthDone = new Promise<void>((r) => (resolvers.depth = r));
  const objectsDone = new Promise<void>((r) => (resolvers.objects = r));
  const segmentsDone = new Promise<void>((r) => (resolvers.segments = r));

  let dlShown = false;
  const dlFiles: Record<string, { loaded: number; total: number }> = {};

  worker.onmessage = (e: MessageEvent) => {
    const msg = e.data;
    if (msg.type === 'download-progress') {
      if (!dlShown) { downloadBar.style.display = 'block'; dlShown = true; }
      dlFiles[msg.file] = { loaded: msg.loaded, total: msg.total };
      let ld = 0, tt = 0;
      for (const f of Object.values(dlFiles)) { ld += f.loaded; tt += f.total; }
      const fill = document.getElementById('dl-fill');
      if (fill) fill.style.width = `${tt > 0 ? (ld / tt) * 100 : 0}%`;
    }
    if (msg.type === 'models-ready') downloadBar.style.display = 'none';
    if (msg.type === 'task-complete') {
      results[msg.task as keyof TaskResults] = msg.data;
      resolvers[msg.task]?.();
    }
    if (msg.type === 'error') { worker.terminate(); showError(msg.message); }
  };

  worker.postMessage({ type: 'process', imageDataUrl: dataUrl });

  setStep(1, 'active');
  await Promise.all([sleep(900), depthDone]);
  setStep(1, 'done'); await sleep(180);

  setStep(2, 'active');
  await Promise.all([sleep(900), objectsDone]);
  setStep(2, 'done'); await sleep(180);

  setStep(3, 'active');
  await Promise.all([sleep(900), segmentsDone]);
  setStep(3, 'done'); await sleep(220);

  setStep(4, 'active');
  await sleep(600);
  setStep(4, 'done');
  await sleep(350);

  worker.terminate();
  showExploration(imgCanvas, edgesData, results.depth!, results.objects!.objects, results.segments!.segments);
}

/* ═══════════════════════════════════════════
   ERROR
   ═══════════════════════════════════════════ */

function showError(message: string) {
  const el = document.createElement('div');
  el.className = 'error-overlay';
  el.innerHTML = `
    <p class="error-msg">Something went wrong</p>
    <p class="error-detail">${message}</p>
    <button class="btn btn-primary" id="err-retry">Try Again</button>`;
  app.appendChild(el);
  document.getElementById('err-retry')!.addEventListener('click', showLanding);
}

/* ═══════════════════════════════════════════
   EXPLORATION PHASE
   ═══════════════════════════════════════════ */

function showExploration(
  imgCanvas: HTMLCanvasElement,
  edgesData: ImageData,
  depthResult: { depthData: Uint8Array; width: number; height: number },
  objectsResult: ObjectResult[],
  segmentsResult: SegmentResult[],
) {
  app.innerHTML = '';
  const w = imgCanvas.width, h = imgCanvas.height;

  const root = document.createElement('div');
  root.className = 'exploration';

  /* ── Build canvases ── */
  const container = document.createElement('div');
  container.className = 'canvas-container';

  const stack = document.createElement('div');
  stack.className = 'canvas-stack';
  stack.style.aspectRatio = `${w} / ${h}`;

  const cOriginal = document.createElement('canvas');
  cOriginal.className = 'base-layer';
  cOriginal.width = w; cOriginal.height = h;
  cOriginal.getContext('2d')!.drawImage(imgCanvas, 0, 0);

  // Edge glow (blurred duplicate for bloom effect)
  const cEdgeGlow = document.createElement('canvas');
  cEdgeGlow.className = 'glow-layer';
  cEdgeGlow.width = w; cEdgeGlow.height = h;
  cEdgeGlow.getContext('2d')!.putImageData(edgesData, 0, 0);

  const cEdges = document.createElement('canvas');
  cEdges.width = w; cEdges.height = h;
  cEdges.getContext('2d')!.putImageData(edgesData, 0, 0);

  const cDepth = document.createElement('canvas');
  cDepth.width = w; cDepth.height = h;
  renderDepth(cDepth, depthResult, w, h);

  const cSegments = document.createElement('canvas');
  cSegments.width = w; cSegments.height = h;
  const idCanvas = document.createElement('canvas');
  idCanvas.width = w; idCanvas.height = h;
  renderSegments(cSegments, idCanvas, segmentsResult, w, h);

  const svgObjects = document.createElementNS(SVG_NS, 'svg');
  svgObjects.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svgObjects.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  renderObjects(svgObjects, objectsResult, w, h);

  // Pre-render objects to a canvas for comparison compositing
  const cObjectsRaster = document.createElement('canvas');
  cObjectsRaster.width = w; cObjectsRaster.height = h;
  rasterizeSvg(svgObjects, cObjectsRaster, w, h);

  stack.append(cOriginal, cEdgeGlow, cEdges, cDepth, cSegments, svgObjects);

  // Comparison overlay (hidden by default)
  const compDiv = document.createElement('div');
  compDiv.className = 'comparison';
  compDiv.style.display = 'none';

  const compOriginal = document.createElement('canvas');
  compOriginal.width = w; compOriginal.height = h;
  compOriginal.getContext('2d')!.drawImage(imgCanvas, 0, 0);

  const compMachine = document.createElement('canvas');
  compMachine.width = w; compMachine.height = h;

  const compDivider = document.createElement('div');
  compDivider.className = 'comp-divider';
  compDivider.innerHTML = `<div class="comp-handle">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l-5-7 5-7zm8 0v14l5-7-5-7z"/></svg>
  </div>`;

  const labelL = document.createElement('span');
  labelL.className = 'comp-label comp-label-left'; labelL.textContent = 'HUMAN';
  const labelR = document.createElement('span');
  labelR.className = 'comp-label comp-label-right'; labelR.textContent = 'MACHINE';

  compDiv.append(compOriginal, compMachine, compDivider, labelL, labelR);
  stack.appendChild(compDiv);
  container.appendChild(stack);

  /* ── Layer state ── */
  const allCanvases = {
    original: cOriginal,
    edges: cEdges,
    edgeGlow: cEdgeGlow,
    depth: cDepth,
    segments: cSegments,
    objects: svgObjects,
  };

  const layers: Record<string, { on: boolean }> = {
    original: { on: true },
    edges: { on: true },
    depth: { on: false },
    objects: { on: true },
    segments: { on: false },
  };

  let blend = 50;
  let comparisonActive = false;
  let compPos = 50;

  function updateVisibility() {
    const human = 1 - blend / 100;
    const machine = blend / 100;
    cOriginal.style.opacity = layers.original.on ? String(human) : '0';
    cEdgeGlow.style.opacity = layers.edges.on ? String(machine * 0.6) : '0';
    cEdges.style.opacity = layers.edges.on ? String(machine) : '0';
    cDepth.style.opacity = layers.depth.on ? String(machine * 0.75) : '0';
    cSegments.style.opacity = layers.segments.on ? String(machine * 0.5) : '0';
    svgObjects.style.opacity = layers.objects.on ? String(machine) : '0';
  }

  function renderComposite() {
    const ctx = compMachine.getContext('2d')!;
    ctx.clearRect(0, 0, w, h);
    const drawLayer = (c: HTMLCanvasElement, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.drawImage(c, 0, 0);
    };
    if (layers.depth.on) drawLayer(cDepth, 0.75);
    if (layers.segments.on) drawLayer(cSegments, 0.5);
    if (layers.edges.on) {
      drawLayer(cEdgeGlow, 0.5);
      drawLayer(cEdges, 1);
    }
    if (layers.objects.on) drawLayer(cObjectsRaster, 1);
    ctx.globalAlpha = 1;
  }

  function updateComparison() {
    compMachine.style.clipPath = `inset(0 0 0 ${compPos}%)`;
    compDivider.style.left = `${compPos}%`;
  }

  /* ── Stats bar ── */
  const statsBar = document.createElement('div');
  statsBar.className = 'stats-bar';
  const objCount = objectsResult.length;
  const segCount = segmentsResult.length;
  statsBar.innerHTML = `
    <span><span class="stat-value">${objCount}</span> object${objCount !== 1 ? 's' : ''} detected</span>
    <span class="stat-sep">&middot;</span>
    <span><span class="stat-value">${segCount}</span> segment${segCount !== 1 ? 's' : ''}</span>
    <span class="stat-sep">&middot;</span>
    <span>Depth estimated</span>`;

  /* ── Layer panel ── */
  const panel = document.createElement('div');
  panel.className = 'layer-panel';

  const layerDefs = [
    { key: 'original', label: 'Original', on: true, shortcut: '1',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      thumbSrc: cOriginal },
    { key: 'edges', label: 'Edges', on: true, shortcut: '2',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      thumbSrc: cEdges },
    { key: 'depth', label: 'Depth', on: false, shortcut: '3',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5 5-4.5 5L2 16l6-13z"/><path d="M15.5 9l3-3 4 6-4 7"/></svg>',
      thumbSrc: cDepth },
    { key: 'objects', label: 'Objects', on: true, shortcut: '4',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>',
      thumbSrc: cOriginal },
    { key: 'segments', label: 'Segments', on: false, shortcut: '5',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>',
      thumbSrc: cSegments },
  ];

  const checkboxes: Record<string, HTMLInputElement> = {};

  layerDefs.forEach(({ key, label, on, shortcut, thumbSrc }) => {
    const card = document.createElement('div');
    card.className = 'layer-card' + (on ? ' active-layer' : '');

    const thumb = makeThumbnail(thumbSrc);
    const thumbWrap = document.createElement('div');
    thumbWrap.className = 'layer-thumb';
    thumbWrap.appendChild(thumb);

    card.innerHTML = `
      <div class="layer-info">
        <span class="layer-label">${label}</span>
        <span class="layer-shortcut">${shortcut}</span>
      </div>
      <label class="toggle">
        <input type="checkbox" ${on ? 'checked' : ''} />
        <span class="toggle-slider"></span>
      </label>`;
    card.insertBefore(thumbWrap, card.firstChild);

    const cb = card.querySelector('input') as HTMLInputElement;
    checkboxes[key] = cb;

    const doToggle = () => {
      layers[key].on = cb.checked;
      card.classList.toggle('active-layer', cb.checked);
      updateVisibility();
      if (comparisonActive) renderComposite();
      if (cb.checked && ANNOTATIONS[key]) showAnnotation(ANNOTATIONS[key]);
      else hideAnnotation();
    };
    cb.addEventListener('change', doToggle);
    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.toggle')) return;
      cb.checked = !cb.checked; doToggle();
    });
    panel.appendChild(card);
  });

  /* ── Blend slider ── */
  const blendBar = document.createElement('div');
  blendBar.className = 'blend-bar';
  blendBar.innerHTML = `
    <span class="blend-label" id="bl-label">Hybrid</span>
    <input type="range" min="0" max="100" value="${blend}" class="blend-slider" id="bl-slider" />
    <div class="blend-endpoints"><span>Human</span><span>Machine</span></div>`;

  /* ── Annotation ── */
  const annotation = document.createElement('div');
  annotation.className = 'annotation';
  annotation.style.display = 'none';
  annotation.innerHTML = '<p></p>';

  function showAnnotation(html: string) {
    annotation.querySelector('p')!.innerHTML = html;
    annotation.style.display = 'block';
    annotation.style.animation = 'none';
    void annotation.offsetHeight;
    annotation.style.animation = 'slideUp 0.35s var(--ease-out)';
  }
  function hideAnnotation() { annotation.style.display = 'none'; }

  /* ── Segment tooltip ── */
  const tooltip = document.createElement('div');
  tooltip.className = 'segment-tooltip';
  tooltip.style.display = 'none';

  const idCtx = idCanvas.getContext('2d')!;
  stack.style.pointerEvents = 'auto';
  stack.addEventListener('mousemove', (e) => {
    if (!layers.segments.on || comparisonActive) { tooltip.style.display = 'none'; return; }
    const rect = stack.getBoundingClientRect();
    const px = Math.floor(((e.clientX - rect.left) / rect.width) * w);
    const py = Math.floor(((e.clientY - rect.top) / rect.height) * h);
    if (px < 0 || px >= w || py < 0 || py >= h) { tooltip.style.display = 'none'; return; }
    const pix = idCtx.getImageData(px, py, 1, 1).data;
    const idx = pix[0] - 1;
    if (idx >= 0 && idx < segmentsResult.length) {
      tooltip.textContent = segmentsResult[idx].label;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX + 14}px`;
      tooltip.style.top = `${e.clientY - 30}px`;
    } else { tooltip.style.display = 'none'; }
  });
  stack.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });

  /* ── Comparison drag ── */
  let compDragging = false;
  compDiv.addEventListener('pointerdown', (e) => {
    compDragging = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  });
  compDiv.addEventListener('pointermove', (e) => {
    if (!compDragging) return;
    const rect = compDiv.getBoundingClientRect();
    compPos = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    updateComparison();
  });
  compDiv.addEventListener('pointerup', () => { compDragging = false; });

  /* ── Top bar ── */
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = '\u2190 New Photo';
  backBtn.addEventListener('click', () => { cleanupKeyboard(); showLanding(); });

  const topRight = document.createElement('div');
  topRight.className = 'top-bar-right';

  const compareBtn = document.createElement('button');
  compareBtn.className = 'compare-btn';
  compareBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="8 6 4 12 8 18"/><polyline points="16 6 20 12 16 18"/></svg> Compare`;

  function toggleComparison() {
    comparisonActive = !comparisonActive;
    compareBtn.classList.toggle('active', comparisonActive);
    if (comparisonActive) {
      renderComposite();
      compDiv.style.display = 'block';
      updateComparison();
      blendBar.style.display = 'none';
      for (const c of Object.values(allCanvases)) {
        if (c instanceof HTMLCanvasElement || c instanceof SVGSVGElement) {
          (c as HTMLElement).style.opacity = '0';
        }
      }
      cOriginal.style.opacity = '0';
    } else {
      compDiv.style.display = 'none';
      blendBar.style.display = '';
      updateVisibility();
    }
  }
  compareBtn.addEventListener('click', toggleComparison);

  const shareBtn = document.createElement('button');
  shareBtn.className = 'share-btn';
  shareBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share`;
  shareBtn.addEventListener('click', () =>
    captureAndShare(w, h, cOriginal, cEdges, cDepth, cSegments, cObjectsRaster),
  );

  topRight.append(compareBtn, shareBtn);
  topBar.append(backBtn, topRight);

  /* ── Keyboard hint ── */
  const kbHint = document.createElement('div');
  kbHint.className = 'keyboard-hint';
  kbHint.innerHTML = 'Press <kbd>1</kbd>-<kbd>5</kbd> to toggle layers &middot; <kbd>C</kbd> to compare';

  /* ── Keyboard shortcuts ── */
  function onKeydown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key >= '1' && key <= '5') {
      const idx = Number(key) - 1;
      const layerKey = layerDefs[idx].key;
      const cb = checkboxes[layerKey];
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    }
    if (key === 'c') toggleComparison();
    if (key === 'escape' && comparisonActive) toggleComparison();
  }
  document.addEventListener('keydown', onKeydown);
  function cleanupKeyboard() { document.removeEventListener('keydown', onKeydown); }

  /* ── Assemble ── */
  root.append(container, panel, blendBar, annotation, topBar, tooltip, statsBar, kbHint);
  app.appendChild(root);

  /* ── Init slider ── */
  const slider = document.getElementById('bl-slider') as HTMLInputElement;
  const sliderLabel = document.getElementById('bl-label')!;
  slider.addEventListener('input', () => {
    blend = Number(slider.value);
    sliderLabel.textContent = blend <= 5 ? 'Human' : blend >= 95 ? 'Machine' : 'Hybrid';
    updateVisibility();
  });

  updateVisibility();
  showAnnotation(ANNOTATIONS.edges);
}

/* ═══════════════════════════════════════════
   RENDERING HELPERS
   ═══════════════════════════════════════════ */

function renderDepth(
  canvas: HTMLCanvasElement,
  depth: { depthData: Uint8Array; width: number; height: number },
  tw: number, th: number,
) {
  const tmp = document.createElement('canvas');
  tmp.width = depth.width; tmp.height = depth.height;
  const tCtx = tmp.getContext('2d')!;
  const img = tCtx.createImageData(depth.width, depth.height);
  for (let i = 0; i < depth.depthData.length; i++) {
    const t = 1 - depth.depthData[i] / 255;
    const [r, g, b] = infernoColormap(t);
    img.data[i * 4] = r;
    img.data[i * 4 + 1] = g;
    img.data[i * 4 + 2] = b;
    img.data[i * 4 + 3] = 220;
  }
  tCtx.putImageData(img, 0, 0);
  canvas.getContext('2d')!.drawImage(tmp, 0, 0, tw, th);
}

function renderSegments(
  segCanvas: HTMLCanvasElement, idCanvas: HTMLCanvasElement,
  segments: SegmentResult[], tw: number, th: number,
) {
  const sCtx = segCanvas.getContext('2d')!;
  const iCtx = idCanvas.getContext('2d')!;
  segments.forEach((seg, i) => {
    const color = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];
    const tmp = document.createElement('canvas');
    tmp.width = seg.width; tmp.height = seg.height;
    const tCtx = tmp.getContext('2d')!;
    const segImg = tCtx.createImageData(seg.width, seg.height);
    const tmpId = document.createElement('canvas');
    tmpId.width = seg.width; tmpId.height = seg.height;
    const tIdCtx = tmpId.getContext('2d')!;
    const idImg = tIdCtx.createImageData(seg.width, seg.height);
    for (let j = 0; j < seg.maskData.length; j++) {
      if (seg.maskData[j] > 128) {
        const p = j * 4;
        segImg.data[p] = color[0]; segImg.data[p + 1] = color[1];
        segImg.data[p + 2] = color[2]; segImg.data[p + 3] = 130;
        idImg.data[p] = i + 1; idImg.data[p + 3] = 255;
      }
    }
    tCtx.putImageData(segImg, 0, 0);
    sCtx.drawImage(tmp, 0, 0, tw, th);
    tIdCtx.putImageData(idImg, 0, 0);
    iCtx.drawImage(tmpId, 0, 0, tw, th);
  });
}

function renderObjects(svg: SVGSVGElement, objects: ObjectResult[], imgW: number, imgH: number) {
  objects.forEach((obj) => {
    let { xmin, ymin, xmax, ymax } = obj.box;
    if (xmax <= 1 && ymax <= 1) { xmin *= imgW; xmax *= imgW; ymin *= imgH; ymax *= imgH; }
    const bw = xmax - xmin, bh = ymax - ymin;
    const labelText = `${obj.label} ${obj.score.toFixed(2)}`;
    const labelW = labelText.length * 7 + 14;

    const bg = document.createElementNS(SVG_NS, 'rect');
    bg.setAttribute('class', 'bbox-label-bg');
    bg.setAttribute('x', String(xmin));
    bg.setAttribute('y', String(Math.max(0, ymin - 22)));
    bg.setAttribute('width', String(labelW));
    bg.setAttribute('height', '20');
    bg.setAttribute('fill', 'rgba(0,0,0,0.75)');

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'bbox-rect');
    rect.setAttribute('x', String(xmin));
    rect.setAttribute('y', String(ymin));
    rect.setAttribute('width', String(bw));
    rect.setAttribute('height', String(bh));

    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'bbox-label');
    text.setAttribute('x', String(xmin + 7));
    text.setAttribute('y', String(Math.max(14, ymin - 6)));
    text.textContent = labelText;
    svg.append(bg, rect, text);
  });
}

async function rasterizeSvg(svg: SVGSVGElement, canvas: HTMLCanvasElement, w: number, h: number) {
  try {
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = await loadImage(url);
    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);
    URL.revokeObjectURL(url);
  } catch { /* non-critical */ }
}

/* ═══════════════════════════════════════════
   SHARE
   ═══════════════════════════════════════════ */

async function captureAndShare(
  w: number, h: number,
  cOriginal: HTMLCanvasElement, cEdges: HTMLCanvasElement,
  cDepth: HTMLCanvasElement, cSegments: HTMLCanvasElement,
  cObjects: HTMLCanvasElement,
) {
  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  const ctx = out.getContext('2d')!;

  for (const c of [cOriginal, cDepth, cSegments, cEdges, cObjects]) {
    const op = parseFloat(c.style.opacity || '0');
    if (op > 0) { ctx.globalAlpha = op; ctx.drawImage(c, 0, 0); }
  }

  ctx.globalAlpha = 0.6;
  ctx.font = '600 11px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'right';
  ctx.fillText('Machine Gaze \u2014 williamcfrancis.netlify.app', w - 14, h - 12);

  const blob = await new Promise<Blob | null>((r) => out.toBlob(r, 'image/png'));
  if (!blob) return;

  const file = new File([blob], 'machine-gaze.png', { type: 'image/png' });
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'Machine Gaze', text: "See the world through a robot's eyes" }); return; }
    catch { /* cancelled */ }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'machine-gaze.png'; a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */

showLanding();
