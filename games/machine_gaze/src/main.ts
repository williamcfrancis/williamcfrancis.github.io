import './style.css';
import { detectEdges } from './edges';
import { infernoColormap } from './colormap';

/* ═══════════════ Types ═══════════════ */

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

/* ═══════════════ Constants ═══════════════ */

const MAX_SIZE = 1024;

const DEMO_IMAGES = [
  {
    thumb:
      'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&q=60',
    full: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1024&q=80',
    label: 'City street',
  },
  {
    thumb:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60',
    full: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1024&q=80',
    label: 'Dog in park',
  },
  {
    thumb:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60',
    full: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1024&q=80',
    label: 'Kitchen',
  },
];

const ANNOTATIONS: Record<string, string> = {
  original:
    "This is what you see — a cohesive scene understood instantly. Your visual cortex dedicates 30% of your brain's total activity to achieve this effortless perception.",
  edges:
    'A robot has no concept of "things." It starts with gradients — where does brightness change sharply? These edges are all it has before higher reasoning kicks in.',
  depth:
    'This depth map was estimated from a single 2D image using a neural network trained on millions of stereo photo pairs. The robot has never seen this scene before, yet it can guess distance.',
  objects:
    'DETR (Detection Transformer) sees the photo as a set of 100 possible objects. Most slots are empty. The remaining few have labels and confidence scores. To the robot, your dog is "object #7, class: dog, confidence: 0.97."',
  segments:
    'Panoptic segmentation assigns every single pixel to either a "thing" (countable, like a person) or "stuff" (uncountable, like sky or grass). There is no ambiguity — every pixel belongs somewhere.',
};

const SEGMENT_PALETTE: [number, number, number][] = [
  [230, 25, 75],
  [60, 180, 75],
  [255, 225, 25],
  [0, 130, 200],
  [245, 130, 48],
  [145, 30, 180],
  [70, 240, 240],
  [240, 50, 230],
  [210, 245, 60],
  [250, 190, 212],
  [0, 128, 128],
  [220, 190, 255],
  [170, 110, 40],
  [255, 250, 200],
  [128, 0, 0],
  [170, 255, 195],
  [128, 128, 0],
  [255, 215, 180],
  [0, 0, 128],
  [128, 128, 128],
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
    <clipPath id="clipL"><rect x="0" y="0" width="100" height="100"/></clipPath>
    <clipPath id="clipR"><rect x="100" y="0" width="100" height="100"/></clipPath>
    <radialGradient id="irisG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#2a8c6e"/><stop offset="70%" stop-color="#1a5c4e"/><stop offset="100%" stop-color="#0d3330"/>
    </radialGradient>
  </defs>
  <path d="M10 50 Q100 -5 190 50 Q100 105 10 50Z" fill="none" stroke="rgba(78,205,196,0.5)" stroke-width="2"/>
  <g clip-path="url(#clipL)">
    <circle cx="100" cy="50" r="26" fill="url(#irisG)"/>
    <circle cx="100" cy="50" r="12" fill="#0b0d17"/>
    <circle cx="93" cy="42" r="4" fill="rgba(255,255,255,0.3)"/>
    <circle cx="90" cy="46" r="2" fill="rgba(255,255,255,0.15)"/>
  </g>
  <g clip-path="url(#clipR)">
    <circle cx="100" cy="50" r="26" fill="none" stroke="#4ecdc4" stroke-width="1.5"/>
    <circle cx="100" cy="50" r="19" fill="none" stroke="#4ecdc4" stroke-width="0.7" stroke-dasharray="3 2"/>
    <circle cx="100" cy="50" r="12" fill="rgba(78,205,196,0.1)"/>
    <circle cx="100" cy="50" r="4" fill="#4ecdc4"/>
    <line x1="100" y1="24" x2="100" y2="76" stroke="#4ecdc4" stroke-width="0.4" opacity="0.4"/>
    <line x1="74" y1="50" x2="126" y2="50" stroke="#4ecdc4" stroke-width="0.4" opacity="0.4"/>
    <circle cx="113" cy="36" r="2" fill="#4ecdc4" opacity="0.8"/>
    <circle cx="116" cy="56" r="2" fill="#4ecdc4" opacity="0.8"/>
    <circle cx="109" cy="66" r="2" fill="#4ecdc4" opacity="0.8"/>
    <line x1="104" y1="47" x2="113" y2="36" stroke="#4ecdc4" stroke-width="0.5" opacity="0.5"/>
    <line x1="104" y1="52" x2="116" y2="56" stroke="#4ecdc4" stroke-width="0.5" opacity="0.5"/>
    <line x1="102" y1="54" x2="109" y2="66" stroke="#4ecdc4" stroke-width="0.5" opacity="0.5"/>
    <rect x="117" y="42" width="4" height="4" fill="none" stroke="#4ecdc4" stroke-width="0.7" rx="0.5"/>
    <rect x="106" y="29" width="3" height="3" fill="none" stroke="#4ecdc4" stroke-width="0.7" rx="0.5"/>
  </g>
</svg>`;

/* ═══════════════ DOM root ═══════════════ */

const app = document.getElementById('app')!;

/* ═══════════════ Utilities ═══════════════ */

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
  c.width = w;
  c.height = h;
  c.getContext('2d')!.drawImage(img, 0, 0, w, h);
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

/* ═══════════════ LANDING ═══════════════ */

function showLanding() {
  app.innerHTML = '';

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
          </svg>
          Use your camera
        </button>
        <button class="btn btn-secondary" id="btn-file">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Choose a photo
        </button>
        <input type="file" id="file-input" accept="image/*" hidden />
      </div>
      <div>
        <p class="demos-label">Or try a sample:</p>
        <div class="demos-grid">
          ${DEMO_IMAGES.map(
            (d, i) => `
            <button class="demo-thumb" data-idx="${i}">
              <img src="${d.thumb}" alt="${d.label}" crossorigin="anonymous" />
            </button>`,
          ).join('')}
        </div>
      </div>
    </div>`;

  app.appendChild(landing);

  document
    .getElementById('btn-camera')!
    .addEventListener('click', showCamera);

  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  document
    .getElementById('btn-file')!
    .addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', async () => {
    if (fileInput.files?.[0]) {
      const url = await fileToDataUrl(fileInput.files[0]);
      processImage(url);
    }
  });

  landing.querySelectorAll<HTMLButtonElement>('.demo-thumb').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = Number(btn.dataset.idx);
      btn.style.opacity = '0.5';
      try {
        const url = await fetchAsDataUrl(DEMO_IMAGES[idx].full);
        processImage(url);
      } catch {
        btn.style.opacity = '1';
      }
    });
  });
}

/* ═══════════════ CAMERA ═══════════════ */

async function showCamera() {
  app.innerHTML = '';

  const view = document.createElement('div');
  view.className = 'camera-view';

  const video = document.createElement('video');
  video.autoplay = true;
  video.playsInline = true;

  const controls = document.createElement('div');
  controls.className = 'camera-controls';

  const captureBtn = document.createElement('button');
  captureBtn.className = 'btn-capture';
  captureBtn.title = 'Take photo';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn-cancel';
  cancelBtn.textContent = 'Cancel';

  controls.append(captureBtn, cancelBtn);
  view.append(video, controls);
  app.appendChild(view);

  let stream: MediaStream | null = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 960 },
      },
    });
    video.srcObject = stream;
  } catch {
    showLanding();
    return;
  }

  captureBtn.addEventListener('click', () => {
    const c = document.createElement('canvas');
    c.width = video.videoWidth;
    c.height = video.videoHeight;
    c.getContext('2d')!.drawImage(video, 0, 0);
    stream?.getTracks().forEach((t) => t.stop());
    processImage(c.toDataURL('image/jpeg', 0.9));
  });

  cancelBtn.addEventListener('click', () => {
    stream?.getTracks().forEach((t) => t.stop());
    showLanding();
  });
}

/* ═══════════════ IMAGE ENTRY POINT ═══════════════ */

async function processImage(dataUrl: string) {
  const img = await loadImage(dataUrl);
  const imgCanvas = fitToCanvas(img);
  const resizedUrl = imgCanvas.toDataURL('image/jpeg', 0.9);
  showProcessing(resizedUrl, imgCanvas);
}

/* ═══════════════ PROCESSING PHASE ═══════════════ */

async function showProcessing(dataUrl: string, imgCanvas: HTMLCanvasElement) {
  app.innerHTML = '';

  const root = document.createElement('div');
  root.className = 'processing';

  const bgImg = document.createElement('img');
  bgImg.className = 'processing-bg';
  bgImg.src = dataUrl;

  const overlay = document.createElement('div');
  overlay.className = 'processing-overlay';

  /* download bar */
  const downloadBar = document.createElement('div');
  downloadBar.className = 'download-bar';
  downloadBar.style.display = 'none';
  downloadBar.innerHTML = `
    <p>Downloading AI models (~40 MB, cached for next time)</p>
    <div class="download-track"><div class="download-fill" id="dl-fill"></div></div>`;

  /* timeline steps */
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
  root.append(bgImg, overlay);
  app.appendChild(root);

  const setStep = (i: number, state: 'waiting' | 'active' | 'done') => {
    const el = stepEls[i];
    el.className =
      'timeline-step' + (state !== 'waiting' ? ` ${state}` : '');
    const st = el.querySelector('.step-status')!;
    st.textContent =
      state === 'active'
        ? 'Processing\u2026'
        : state === 'done'
          ? 'Complete'
          : 'Waiting';
  };

  /* Step 1 — edge detection (synchronous, fast) */
  setStep(0, 'active');
  await sleep(150);

  const ctx = imgCanvas.getContext('2d')!;
  const imageData = ctx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);
  const edgesData = detectEdges(imageData);

  setStep(0, 'done');
  await sleep(250);

  /* Steps 2-4 — ML in a Web Worker */
  const worker = new Worker(new URL('./worker.ts', import.meta.url), {
    type: 'module',
  });

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
      if (!dlShown) {
        downloadBar.style.display = 'block';
        dlShown = true;
      }
      dlFiles[msg.file] = { loaded: msg.loaded, total: msg.total };
      let ld = 0;
      let tt = 0;
      for (const f of Object.values(dlFiles)) {
        ld += f.loaded;
        tt += f.total;
      }
      const fill = document.getElementById('dl-fill');
      if (fill) fill.style.width = `${tt > 0 ? (ld / tt) * 100 : 0}%`;
    }

    if (msg.type === 'models-ready') {
      downloadBar.style.display = 'none';
    }

    if (msg.type === 'task-complete') {
      const t = msg.task as keyof TaskResults;
      results[t] = msg.data;
      resolvers[t]?.();
    }

    if (msg.type === 'error') {
      worker.terminate();
      showError(msg.message);
    }
  };

  worker.postMessage({ type: 'process', imageDataUrl: dataUrl });

  /* Animate timeline sequentially, with minimum visible duration per step */
  setStep(1, 'active');
  await Promise.all([sleep(800), depthDone]);
  setStep(1, 'done');
  await sleep(200);

  setStep(2, 'active');
  await Promise.all([sleep(800), objectsDone]);
  setStep(2, 'done');
  await sleep(200);

  setStep(3, 'active');
  await Promise.all([sleep(800), segmentsDone]);
  setStep(3, 'done');
  await sleep(250);

  /* Step 5 — compositing */
  setStep(4, 'active');
  await sleep(700);
  setStep(4, 'done');
  await sleep(400);

  worker.terminate();

  showExploration(
    imgCanvas,
    edgesData,
    results.depth!,
    results.objects!.objects,
    results.segments!.segments,
  );
}

/* ═══════════════ ERROR ═══════════════ */

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

/* ═══════════════ EXPLORATION PHASE ═══════════════ */

function showExploration(
  imgCanvas: HTMLCanvasElement,
  edgesData: ImageData,
  depthResult: { depthData: Uint8Array; width: number; height: number },
  objectsResult: ObjectResult[],
  segmentsResult: SegmentResult[],
) {
  app.innerHTML = '';

  const w = imgCanvas.width;
  const h = imgCanvas.height;

  /* ── root layout ── */
  const root = document.createElement('div');
  root.className = 'exploration';

  /* ── canvas stack ── */
  const container = document.createElement('div');
  container.className = 'canvas-container';

  const stack = document.createElement('div');
  stack.className = 'canvas-stack';
  stack.style.aspectRatio = `${w} / ${h}`;

  // original
  const cOriginal = document.createElement('canvas');
  cOriginal.className = 'base-layer';
  cOriginal.width = w;
  cOriginal.height = h;
  cOriginal.getContext('2d')!.drawImage(imgCanvas, 0, 0);

  // edges
  const cEdges = document.createElement('canvas');
  cEdges.width = w;
  cEdges.height = h;
  cEdges.getContext('2d')!.putImageData(edgesData, 0, 0);

  // depth
  const cDepth = document.createElement('canvas');
  cDepth.width = w;
  cDepth.height = h;
  renderDepth(cDepth, depthResult, w, h);

  // segments + hidden ID canvas for hit-testing
  const cSegments = document.createElement('canvas');
  cSegments.width = w;
  cSegments.height = h;
  const idCanvas = document.createElement('canvas');
  idCanvas.width = w;
  idCanvas.height = h;
  renderSegments(cSegments, idCanvas, segmentsResult, w, h);

  // object bounding boxes (SVG overlay)
  const svgObjects = document.createElementNS(SVG_NS, 'svg');
  svgObjects.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svgObjects.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  renderObjects(svgObjects, objectsResult, w, h);

  stack.append(cOriginal, cEdges, cDepth, cSegments, svgObjects);
  container.appendChild(stack);

  /* ── layer state ── */
  const layers: Record<
    string,
    { on: boolean; el: HTMLElement | SVGSVGElement }
  > = {
    original: { on: true, el: cOriginal },
    edges: { on: true, el: cEdges },
    depth: { on: false, el: cDepth },
    objects: { on: true, el: svgObjects },
    segments: { on: false, el: cSegments },
  };

  let blend = 50;

  function updateVisibility() {
    const human = 1 - blend / 100;
    const machine = blend / 100;
    cOriginal.style.opacity = layers.original.on ? String(human) : '0';
    cEdges.style.opacity = layers.edges.on ? String(machine) : '0';
    cDepth.style.opacity = layers.depth.on ? String(machine * 0.75) : '0';
    cSegments.style.opacity = layers.segments.on
      ? String(machine * 0.55)
      : '0';
    svgObjects.style.opacity = layers.objects.on ? String(machine) : '0';
  }

  /* ── layer panel ── */
  const panel = document.createElement('div');
  panel.className = 'layer-panel';

  const layerDefs = [
    {
      key: 'original',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      label: 'Original',
      on: true,
    },
    {
      key: 'edges',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      label: 'Edges',
      on: true,
    },
    {
      key: 'depth',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5 5-4.5 5L2 16l6-13z"/><path d="M15.5 9l3-3 4 6-4 7"/></svg>',
      label: 'Depth',
      on: false,
    },
    {
      key: 'objects',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>',
      label: 'Objects',
      on: true,
    },
    {
      key: 'segments',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>',
      label: 'Segments',
      on: false,
    },
  ];

  layerDefs.forEach(({ key, icon, label, on }) => {
    const card = document.createElement('div');
    card.className = 'layer-card';
    card.innerHTML = `
      <div class="layer-icon">${icon}</div>
      <span class="layer-label">${label}</span>
      <label class="toggle">
        <input type="checkbox" ${on ? 'checked' : ''} />
        <span class="toggle-slider"></span>
      </label>`;

    const cb = card.querySelector('input') as HTMLInputElement;

    const toggle = () => {
      layers[key].on = cb.checked;
      updateVisibility();
      if (cb.checked && ANNOTATIONS[key]) showAnnotation(ANNOTATIONS[key]);
      else hideAnnotation();
    };

    cb.addEventListener('change', toggle);
    card.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('.toggle')) return;
      cb.checked = !cb.checked;
      toggle();
    });

    panel.appendChild(card);
  });

  /* ── blend slider ── */
  const blendBar = document.createElement('div');
  blendBar.className = 'blend-bar';
  blendBar.innerHTML = `
    <span class="blend-label" id="bl-label">Hybrid</span>
    <input type="range" min="0" max="100" value="${blend}" class="blend-slider" id="bl-slider" />
    <div class="blend-endpoints"><span>Human</span><span>Machine</span></div>`;

  /* ── annotation ── */
  const annotation = document.createElement('div');
  annotation.className = 'annotation';
  annotation.style.display = 'none';
  annotation.innerHTML = '<p></p>';

  function showAnnotation(text: string) {
    annotation.querySelector('p')!.textContent = text;
    annotation.style.display = 'block';
    annotation.style.animation = 'none';
    void annotation.offsetHeight; // reflow
    annotation.style.animation = 'slideUp 0.3s var(--ease)';
  }
  function hideAnnotation() {
    annotation.style.display = 'none';
  }

  /* ── segment tooltip ── */
  const tooltip = document.createElement('div');
  tooltip.className = 'segment-tooltip';
  tooltip.style.display = 'none';

  const idCtx = idCanvas.getContext('2d')!;

  stack.style.pointerEvents = 'auto';
  stack.addEventListener('mousemove', (e) => {
    if (!layers.segments.on) {
      tooltip.style.display = 'none';
      return;
    }
    const rect = stack.getBoundingClientRect();
    const px = Math.floor(
      ((e.clientX - rect.left) / rect.width) * w,
    );
    const py = Math.floor(
      ((e.clientY - rect.top) / rect.height) * h,
    );
    if (px < 0 || px >= w || py < 0 || py >= h) {
      tooltip.style.display = 'none';
      return;
    }
    const pix = idCtx.getImageData(px, py, 1, 1).data;
    const idx = pix[0] - 1;
    if (idx >= 0 && idx < segmentsResult.length) {
      tooltip.textContent = segmentsResult[idx].label;
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX + 12}px`;
      tooltip.style.top = `${e.clientY - 28}px`;
    } else {
      tooltip.style.display = 'none';
    }
  });
  stack.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  /* ── top bar (back + share) ── */
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = '← New Photo';
  backBtn.addEventListener('click', showLanding);

  const shareBtn = document.createElement('button');
  shareBtn.className = 'share-btn';
  shareBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share`;
  shareBtn.addEventListener('click', () =>
    captureAndShare(w, h, cOriginal, cEdges, cDepth, cSegments, svgObjects),
  );

  topBar.append(backBtn, shareBtn);

  /* ── assemble ── */
  root.append(container, panel, blendBar, annotation, topBar, tooltip);
  app.appendChild(root);

  /* ── init slider ── */
  const slider = document.getElementById('bl-slider') as HTMLInputElement;
  const sliderLabel = document.getElementById('bl-label')!;

  slider.addEventListener('input', () => {
    blend = Number(slider.value);
    sliderLabel.textContent =
      blend <= 5 ? 'Human' : blend >= 95 ? 'Machine' : 'Hybrid';
    updateVisibility();
  });

  updateVisibility();
  showAnnotation(ANNOTATIONS.edges);
}

/* ═══════════════ Rendering helpers ═══════════════ */

function renderDepth(
  canvas: HTMLCanvasElement,
  depth: { depthData: Uint8Array; width: number; height: number },
  tw: number,
  th: number,
) {
  const tmp = document.createElement('canvas');
  tmp.width = depth.width;
  tmp.height = depth.height;
  const tCtx = tmp.getContext('2d')!;
  const img = tCtx.createImageData(depth.width, depth.height);

  for (let i = 0; i < depth.depthData.length; i++) {
    // Invert so close = warm, far = cool
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
  segCanvas: HTMLCanvasElement,
  idCanvas: HTMLCanvasElement,
  segments: SegmentResult[],
  tw: number,
  th: number,
) {
  const sCtx = segCanvas.getContext('2d')!;
  const iCtx = idCanvas.getContext('2d')!;

  segments.forEach((seg, i) => {
    const color = SEGMENT_PALETTE[i % SEGMENT_PALETTE.length];

    const tmp = document.createElement('canvas');
    tmp.width = seg.width;
    tmp.height = seg.height;
    const tCtx = tmp.getContext('2d')!;
    const segImg = tCtx.createImageData(seg.width, seg.height);

    const tmpId = document.createElement('canvas');
    tmpId.width = seg.width;
    tmpId.height = seg.height;
    const tIdCtx = tmpId.getContext('2d')!;
    const idImg = tIdCtx.createImageData(seg.width, seg.height);

    for (let j = 0; j < seg.maskData.length; j++) {
      if (seg.maskData[j] > 128) {
        const p = j * 4;
        segImg.data[p] = color[0];
        segImg.data[p + 1] = color[1];
        segImg.data[p + 2] = color[2];
        segImg.data[p + 3] = 140;

        idImg.data[p] = i + 1;
        idImg.data[p + 1] = 0;
        idImg.data[p + 2] = 0;
        idImg.data[p + 3] = 255;
      }
    }

    tCtx.putImageData(segImg, 0, 0);
    sCtx.drawImage(tmp, 0, 0, tw, th);

    tIdCtx.putImageData(idImg, 0, 0);
    iCtx.drawImage(tmpId, 0, 0, tw, th);
  });
}

function renderObjects(
  svg: SVGSVGElement,
  objects: ObjectResult[],
  imgW: number,
  imgH: number,
) {
  objects.forEach((obj) => {
    let { xmin, ymin, xmax, ymax } = obj.box;

    // Transformers.js may return normalised 0-1 coords
    if (xmax <= 1 && ymax <= 1) {
      xmin *= imgW;
      xmax *= imgW;
      ymin *= imgH;
      ymax *= imgH;
    }

    const bw = xmax - xmin;
    const bh = ymax - ymin;
    const labelText = `${obj.label} ${obj.score.toFixed(2)}`;
    const labelW = labelText.length * 7.2 + 12;

    const bg = document.createElementNS(SVG_NS, 'rect');
    bg.setAttribute('class', 'bbox-label-bg');
    bg.setAttribute('x', String(xmin));
    bg.setAttribute('y', String(Math.max(0, ymin - 22)));
    bg.setAttribute('width', String(labelW));
    bg.setAttribute('height', '20');
    bg.setAttribute('fill', 'rgba(0,0,0,0.72)');

    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'bbox-rect');
    rect.setAttribute('x', String(xmin));
    rect.setAttribute('y', String(ymin));
    rect.setAttribute('width', String(bw));
    rect.setAttribute('height', String(bh));

    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'bbox-label');
    text.setAttribute('x', String(xmin + 6));
    text.setAttribute('y', String(Math.max(14, ymin - 6)));
    text.textContent = labelText;

    svg.append(bg, rect, text);
  });
}

/* ═══════════════ SHARE ═══════════════ */

async function captureAndShare(
  w: number,
  h: number,
  cOriginal: HTMLCanvasElement,
  cEdges: HTMLCanvasElement,
  cDepth: HTMLCanvasElement,
  cSegments: HTMLCanvasElement,
  svgObjects: SVGSVGElement,
) {
  const out = document.createElement('canvas');
  out.width = w;
  out.height = h;
  const ctx = out.getContext('2d')!;

  for (const c of [cOriginal, cDepth, cSegments, cEdges]) {
    const op = parseFloat(c.style.opacity || '0');
    if (op > 0) {
      ctx.globalAlpha = op;
      ctx.drawImage(c, 0, 0);
    }
  }

  // Render SVG objects layer
  const svgOp = parseFloat(svgObjects.style.opacity || '0');
  if (svgOp > 0) {
    try {
      const svgData = new XMLSerializer().serializeToString(svgObjects);
      const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
      });
      const svgUrl = URL.createObjectURL(svgBlob);
      const svgImg = await loadImage(svgUrl);
      ctx.globalAlpha = svgOp;
      ctx.drawImage(svgImg, 0, 0, w, h);
      URL.revokeObjectURL(svgUrl);
    } catch {
      /* SVG render failed, skip */
    }
  }

  // Watermark
  ctx.globalAlpha = 0.65;
  ctx.font = '12px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'right';
  ctx.fillText(
    'Machine Gaze — williamcfrancis.netlify.app',
    w - 12,
    h - 12,
  );

  const blob = await new Promise<Blob | null>((r) =>
    out.toBlob(r, 'image/png'),
  );
  if (!blob) return;

  const file = new File([blob], 'machine-gaze.png', { type: 'image/png' });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: 'Machine Gaze',
        text: "See the world through a robot's eyes",
      });
      return;
    } catch {
      /* user cancelled, fall through to download */
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'machine-gaze.png';
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════ INIT ═══════════════ */

showLanding();
