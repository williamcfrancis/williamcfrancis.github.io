(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) c(a);
  new MutationObserver((a) => {
    for (const t of a) if (t.type === "childList") for (const s of t.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && c(s);
  }).observe(document, { childList: true, subtree: true });
  function n(a) {
    const t = {};
    return a.integrity && (t.integrity = a.integrity), a.referrerPolicy && (t.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? t.credentials = "include" : a.crossOrigin === "anonymous" ? t.credentials = "omit" : t.credentials = "same-origin", t;
  }
  function c(a) {
    if (a.ep) return;
    a.ep = true;
    const t = n(a);
    fetch(a.href, t);
  }
})();
function Se(o) {
  const { width: e, height: n, data: c } = o, a = new Float32Array(e * n);
  for (let i = 0; i < e * n; i++) {
    const l = i * 4;
    a[i] = 0.299 * c[l] + 0.587 * c[l + 1] + 0.114 * c[l + 2];
  }
  const t = Ne(a, e, n), s = new Float32Array(e * n), d = new Float32Array(e * n), h = new Float32Array(e * n), p = new Float32Array(e * n);
  for (let i = 1; i < n - 1; i++) for (let l = 1; l < e - 1; l++) {
    const m = i * e + l, L = t[(i - 1) * e + (l - 1)], C = t[(i - 1) * e + l], v = t[(i - 1) * e + (l + 1)], S = t[i * e + (l - 1)], N = t[i * e + (l + 1)], R = t[(i + 1) * e + (l - 1)], U = t[(i + 1) * e + l], F = t[(i + 1) * e + (l + 1)];
    s[m] = -L + v - 2 * S + 2 * N - R + F, d[m] = -L - 2 * C - v + R + 2 * U + F, h[m] = Math.sqrt(s[m] * s[m] + d[m] * d[m]), p[m] = Math.atan2(d[m], s[m]);
  }
  const u = new Float32Array(e * n);
  for (let i = 1; i < n - 1; i++) for (let l = 1; l < e - 1; l++) {
    const m = i * e + l, L = (p[m] * 180 / Math.PI + 180) % 180;
    let C = 0, v = 0;
    L < 22.5 || L >= 157.5 ? (C = h[m - 1], v = h[m + 1]) : L < 67.5 ? (C = h[(i - 1) * e + (l + 1)], v = h[(i + 1) * e + (l - 1)]) : L < 112.5 ? (C = h[(i - 1) * e + l], v = h[(i + 1) * e + l]) : (C = h[(i - 1) * e + (l - 1)], v = h[(i + 1) * e + (l + 1)]), u[m] = h[m] >= C && h[m] >= v ? h[m] : 0;
  }
  let y = 0, r = 0;
  for (let i = 0; i < e * n; i++) u[i] > 0 && (y += u[i], r++);
  const g = r > 0 ? y / r : 50, f = g * 0.4, x = g * 1.1, E = new Uint8Array(e * n);
  for (let i = 0; i < e * n; i++) u[i] >= x ? E[i] = 2 : u[i] >= f && (E[i] = 1);
  const k = new Uint8Array(e * n), M = [];
  for (let i = 0; i < e * n; i++) E[i] === 2 && (k[i] = 255, M.push(i));
  for (; M.length > 0; ) {
    const i = M.pop(), l = i / e | 0, m = i % e;
    for (let L = -1; L <= 1; L++) for (let C = -1; C <= 1; C++) {
      const v = l + L, S = m + C;
      if (v >= 0 && v < n && S >= 0 && S < e) {
        const N = v * e + S;
        E[N] === 1 && k[N] === 0 && (k[N] = 255, M.push(N));
      }
    }
  }
  const A = new ImageData(e, n);
  for (let i = 0; i < e * n; i++) {
    const l = k[i];
    A.data[i * 4] = l, A.data[i * 4 + 1] = l, A.data[i * 4 + 2] = l, A.data[i * 4 + 3] = l;
  }
  return A;
}
function Ne(o, e, n) {
  const c = new Float32Array(e * n);
  for (let a = 1; a < n - 1; a++) for (let t = 1; t < e - 1; t++) c[a * e + t] = (o[(a - 1) * e + (t - 1)] + 2 * o[(a - 1) * e + t] + o[(a - 1) * e + (t + 1)] + 2 * o[a * e + (t - 1)] + 4 * o[a * e + t] + 2 * o[a * e + (t + 1)] + o[(a + 1) * e + (t - 1)] + 2 * o[(a + 1) * e + t] + o[(a + 1) * e + (t + 1)]) / 16;
  return c;
}
const W = [[0, 0, 0, 4], [0.071, 10, 7, 46], [0.143, 31, 12, 72], [0.214, 57, 15, 97], [0.286, 85, 15, 109], [0.357, 114, 25, 107], [0.429, 143, 37, 100], [0.5, 171, 51, 86], [0.571, 197, 69, 67], [0.643, 220, 91, 45], [0.714, 239, 120, 19], [0.786, 249, 153, 9], [0.857, 252, 190, 35], [0.929, 250, 226, 76], [1, 252, 255, 164]];
function Ae(o) {
  o = Math.max(0, Math.min(1, o));
  let e = 0;
  for (let r = 1; r < W.length; r++) {
    if (o <= W[r][0]) {
      e = r - 1;
      break;
    }
    e = r - 1;
  }
  const [n, c, a, t] = W[e], s = Math.min(e + 1, W.length - 1), [d, h, p, u] = W[s], y = d === n ? 0 : (o - n) / (d - n);
  return [Math.round(c + (h - c) * y), Math.round(a + (p - a) * y), Math.round(t + (u - t) * y)];
}
const ye = 1024, fe = [{ thumb: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=220&q=60", full: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1024&q=80", label: "City Street" }, { thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=220&q=60", full: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1024&q=80", label: "Dog in Park" }, { thumb: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=220&q=60", full: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1024&q=80", label: "Kitchen" }], ce = { original: "This is what you see \u2014 a cohesive scene understood instantly. Your <em>visual cortex</em> dedicates 30% of your brain's total activity to achieve this effortless perception.", edges: 'A robot has no concept of "things." It starts with <em>gradients</em> \u2014 where does brightness change sharply? These edges are all it has before higher reasoning kicks in.', depth: "This depth map was estimated from a <em>single 2D image</em> using a neural network trained on millions of stereo photo pairs. The robot has never seen this scene before, yet it can guess <em>distance</em>.", objects: '<em>DETR</em> (Detection Transformer) sees the photo as a set of 100 possible objects. Most slots are empty. The remaining few have labels and <em>confidence scores</em>. To the robot, your dog is "object #7, class: dog, confidence: 0.97."', segments: '<em>Panoptic segmentation</em> assigns every single pixel to either a "thing" (countable, like a person) or "stuff" (uncountable, like sky or grass). There is <em>no ambiguity</em> \u2014 every pixel belongs somewhere.' }, be = [[99, 210, 255], [255, 107, 129], [78, 205, 196], [255, 195, 113], [162, 155, 254], [0, 210, 180], [255, 154, 162], [184, 233, 148], [250, 177, 210], [115, 192, 222], [255, 218, 121], [189, 147, 249], [255, 139, 94], [128, 222, 234], [255, 171, 145], [149, 225, 211], [255, 205, 178], [167, 196, 255], [232, 183, 255], [179, 229, 252]], Ie = ["Detecting Edges", "Estimating Depth", "Finding Objects", "Segmenting Scene", "Compositing"], X = "http://www.w3.org/2000/svg", Te = `<svg class="eye-icon" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
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
</svg>`, H = document.getElementById("app");
function De(o) {
  const e = document.createElement("canvas");
  e.className = "particles", o.insertBefore(e, o.firstChild);
  const n = e.getContext("2d"), c = Math.min(window.devicePixelRatio, 2);
  let a = [], t = 0, s = 0, d = 0;
  function h() {
    t = o.clientWidth, s = o.clientHeight, e.width = t * c, e.height = s * c, e.style.width = t + "px", e.style.height = s + "px", n.setTransform(c, 0, 0, c, 0, 0);
  }
  function p() {
    h();
    const y = Math.min(80, Math.floor(t * s / 14e3));
    a = Array.from({ length: y }, () => ({ x: Math.random() * t, y: Math.random() * s, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, s: Math.random() * 1.5 + 0.5, a: Math.random() * 0.25 + 0.08 }));
  }
  function u() {
    n.clearRect(0, 0, t, s);
    for (let y = 0; y < a.length; y++) {
      const r = a[y];
      r.x += r.vx, r.y += r.vy, r.x < -10 && (r.x = t + 10), r.x > t + 10 && (r.x = -10), r.y < -10 && (r.y = s + 10), r.y > s + 10 && (r.y = -10), n.beginPath(), n.arc(r.x, r.y, r.s, 0, Math.PI * 2), n.fillStyle = `rgba(78,205,196,${r.a})`, n.fill();
      for (let g = y + 1; g < a.length; g++) {
        const f = a[g], x = r.x - f.x, E = r.y - f.y, k = x * x + E * E;
        k < 16900 && (n.beginPath(), n.moveTo(r.x, r.y), n.lineTo(f.x, f.y), n.strokeStyle = `rgba(78,205,196,${0.055 * (1 - Math.sqrt(k) / 130)})`, n.lineWidth = 0.5, n.stroke());
      }
    }
    d = requestAnimationFrame(u);
  }
  return p(), window.addEventListener("resize", h), u(), () => {
    cancelAnimationFrame(d), window.removeEventListener("resize", h), e.remove();
  };
}
function ve(o) {
  return new Promise((e, n) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => e(c), c.onerror = () => n(new Error("Failed to load image")), c.src = o;
  });
}
function Pe(o) {
  let { naturalWidth: e, naturalHeight: n } = o;
  if (Math.max(e, n) > ye) {
    const a = ye / Math.max(e, n);
    e = Math.round(e * a), n = Math.round(n * a);
  }
  const c = document.createElement("canvas");
  return c.width = e, c.height = n, c.getContext("2d").drawImage(o, 0, 0, e, n), c;
}
function Be(o, e = 72, n = 48) {
  const c = document.createElement("canvas");
  return c.width = e, c.height = n, c.getContext("2d").drawImage(o, 0, 0, e, n), c;
}
async function je(o) {
  const n = await (await fetch(o, { mode: "cors" })).blob();
  return new Promise((c, a) => {
    const t = new FileReader();
    t.onload = () => c(t.result), t.onerror = a, t.readAsDataURL(n);
  });
}
function we(o) {
  return new Promise((e, n) => {
    const c = new FileReader();
    c.onload = () => e(c.result), c.onerror = n, c.readAsDataURL(o);
  });
}
const B = (o) => new Promise((e) => setTimeout(e, o));
let $ = null;
function He() {
  if ($) return;
  $ = document.createElement("div"), $.className = "drop-zone", $.innerHTML = `<div class="drop-zone-inner">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
    <p>Drop your photo here</p>
    <span>JPG, PNG, or WebP</span>
  </div>`, document.body.appendChild($);
  let o = 0;
  document.addEventListener("dragenter", (e) => {
    e.preventDefault(), o++, o === 1 && $.classList.add("visible");
  }), document.addEventListener("dragleave", () => {
    o--, o <= 0 && (o = 0, $.classList.remove("visible"));
  }), document.addEventListener("dragover", (e) => e.preventDefault()), document.addEventListener("drop", async (e) => {
    var _a, _b;
    e.preventDefault(), o = 0, $.classList.remove("visible");
    const n = (_b = (_a = e.dataTransfer) == null ? void 0 : _a.files) == null ? void 0 : _b[0];
    if (n && n.type.startsWith("image/")) {
      const c = await we(n);
      Z(c);
    }
  });
}
let K = null;
function _() {
  H.innerHTML = "", He();
  const o = document.createElement("div");
  o.className = "landing", o.innerHTML = `
    <div class="landing-content">
      ${Te}
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
          ${fe.map((n, c) => `
            <button class="demo-thumb" data-idx="${c}">
              <img src="${n.thumb}" alt="${n.label}" crossorigin="anonymous" loading="lazy" />
              <span class="demo-label">${n.label}</span>
            </button>`).join("")}
        </div>
      </div>
    </div>`, H.appendChild(o), K = De(o), document.getElementById("btn-camera").addEventListener("click", () => {
    K == null ? void 0 : K(), $e();
  });
  const e = document.getElementById("file-input");
  document.getElementById("btn-file").addEventListener("click", () => e.click()), e.addEventListener("change", async () => {
    var _a;
    ((_a = e.files) == null ? void 0 : _a[0]) && (K == null ? void 0 : K(), Z(await we(e.files[0])));
  }), o.querySelectorAll(".demo-thumb").forEach((n) => {
    n.addEventListener("click", async () => {
      const c = Number(n.dataset.idx);
      n.classList.add("loading");
      try {
        const a = await je(fe[c].full);
        K == null ? void 0 : K(), Z(a);
      } catch {
        n.classList.remove("loading");
      }
    });
  });
}
async function $e() {
  H.innerHTML = "";
  const o = document.createElement("div");
  o.className = "camera-view";
  const e = document.createElement("video");
  e.autoplay = true, e.playsInline = true;
  const n = document.createElement("div");
  n.className = "camera-controls";
  const c = document.createElement("button");
  c.className = "btn-capture", c.title = "Take photo";
  const a = document.createElement("button");
  a.className = "btn-cancel", a.textContent = "Cancel", n.append(c, a), o.append(e, n), H.appendChild(o);
  let t = null;
  try {
    t = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } } }), e.srcObject = t;
  } catch {
    _();
    return;
  }
  c.addEventListener("click", () => {
    const s = document.createElement("canvas");
    s.width = e.videoWidth, s.height = e.videoHeight, s.getContext("2d").drawImage(e, 0, 0), t == null ? void 0 : t.getTracks().forEach((d) => d.stop()), Z(s.toDataURL("image/jpeg", 0.9));
  }), a.addEventListener("click", () => {
    t == null ? void 0 : t.getTracks().forEach((s) => s.stop()), _();
  });
}
async function Z(o) {
  const e = await ve(o), n = Pe(e);
  Oe(n.toDataURL("image/jpeg", 0.9), n);
}
async function Oe(o, e) {
  H.innerHTML = "";
  const n = document.createElement("div");
  n.className = "processing";
  const c = document.createElement("img");
  c.className = "processing-bg", c.src = o;
  const a = document.createElement("div");
  a.className = "scanline";
  const t = document.createElement("div");
  t.className = "processing-overlay";
  const s = document.createElement("div");
  s.className = "download-bar", s.style.display = "none", s.innerHTML = `
    <p>Downloading AI models (~40 MB, cached for next time)</p>
    <div class="download-track"><div class="download-fill" id="dl-fill"></div></div>`;
  const d = document.createElement("div");
  d.className = "timeline";
  const h = Ie.map((l) => {
    const m = document.createElement("div");
    return m.className = "timeline-step", m.innerHTML = `
      <div class="step-dot"><div class="step-dot-inner"></div></div>
      <div class="step-info">
        <span class="step-label">${l}</span>
        <span class="step-status">Waiting</span>
      </div>`, m;
  });
  h.forEach((l) => d.appendChild(l)), t.append(s, d), n.append(c, a, t), H.appendChild(n);
  const p = (l, m) => {
    h[l].className = "timeline-step" + (m !== "waiting" ? ` ${m}` : "");
    const L = h[l].querySelector(".step-status");
    L.textContent = m === "active" ? "Processing\u2026" : m === "done" ? "Complete" : "Waiting";
  };
  p(0, "active"), await B(150);
  const y = e.getContext("2d").getImageData(0, 0, e.width, e.height), r = Se(y);
  p(0, "done"), await B(250);
  const g = new Worker(new URL("/games/machine_gaze/assets/worker-D7EGx7oI.js", import.meta.url), { type: "module" }), f = { depth: null, objects: null, segments: null }, x = {}, E = new Promise((l) => x.depth = l), k = new Promise((l) => x.objects = l), M = new Promise((l) => x.segments = l);
  let A = false;
  const i = {};
  g.onmessage = (l) => {
    var _a;
    const m = l.data;
    if (m.type === "download-progress") {
      A || (s.style.display = "block", A = true), i[m.file] = { loaded: m.loaded, total: m.total };
      let L = 0, C = 0;
      for (const S of Object.values(i)) L += S.loaded, C += S.total;
      const v = document.getElementById("dl-fill");
      v && (v.style.width = `${C > 0 ? L / C * 100 : 0}%`);
    }
    m.type === "models-ready" && (s.style.display = "none"), m.type === "task-complete" && (f[m.task] = m.data, (_a = x[m.task]) == null ? void 0 : _a.call(x)), m.type === "error" && (g.terminate(), Re(m.message));
  }, g.postMessage({ type: "process", imageDataUrl: o }), p(1, "active"), await Promise.all([B(900), E]), p(1, "done"), await B(180), p(2, "active"), await Promise.all([B(900), k]), p(2, "done"), await B(180), p(3, "active"), await Promise.all([B(900), M]), p(3, "done"), await B(220), p(4, "active"), await B(600), p(4, "done"), await B(350), g.terminate(), Ue(e, r, f.depth, f.objects.objects, f.segments.segments);
}
function Re(o) {
  const e = document.createElement("div");
  e.className = "error-overlay", e.innerHTML = `
    <p class="error-msg">Something went wrong</p>
    <p class="error-detail">${o}</p>
    <button class="btn btn-primary" id="err-retry">Try Again</button>`, H.appendChild(e), document.getElementById("err-retry").addEventListener("click", _);
}
function Ue(o, e, n, c, a) {
  H.innerHTML = "";
  const t = o.width, s = o.height, d = document.createElement("div");
  d.className = "exploration";
  const h = document.createElement("div");
  h.className = "canvas-container";
  const p = document.createElement("div");
  p.className = "canvas-stack", p.style.aspectRatio = `${t} / ${s}`;
  const u = document.createElement("canvas");
  u.className = "base-layer", u.width = t, u.height = s, u.getContext("2d").drawImage(o, 0, 0);
  const y = document.createElement("canvas");
  y.className = "glow-layer", y.width = t, y.height = s, y.getContext("2d").putImageData(e, 0, 0);
  const r = document.createElement("canvas");
  r.width = t, r.height = s, r.getContext("2d").putImageData(e, 0, 0);
  const g = document.createElement("canvas");
  g.width = t, g.height = s, ze(g, n, t, s);
  const f = document.createElement("canvas");
  f.width = t, f.height = s;
  const x = document.createElement("canvas");
  x.width = t, x.height = s, Fe(f, x, a, t, s);
  const E = document.createElementNS(X, "svg");
  E.setAttribute("viewBox", `0 0 ${t} ${s}`), E.setAttribute("preserveAspectRatio", "xMidYMid meet"), Ge(E, c, t, s);
  const k = document.createElement("canvas");
  k.width = t, k.height = s, qe(E, k, t, s), p.append(u, y, r, g, f, E);
  const M = document.createElement("div");
  M.className = "comparison", M.style.display = "none";
  const A = document.createElement("canvas");
  A.width = t, A.height = s, A.getContext("2d").drawImage(o, 0, 0);
  const i = document.createElement("canvas");
  i.width = t, i.height = s;
  const l = document.createElement("div");
  l.className = "comp-divider", l.innerHTML = `<div class="comp-handle">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l-5-7 5-7zm8 0v14l5-7-5-7z"/></svg>
  </div>`;
  const m = document.createElement("span");
  m.className = "comp-label comp-label-left", m.textContent = "HUMAN";
  const L = document.createElement("span");
  L.className = "comp-label comp-label-right", L.textContent = "MACHINE", M.append(A, i, l, m, L), p.appendChild(M), h.appendChild(p);
  const C = { original: u, edges: r, edgeGlow: y, depth: g, segments: f, objects: E }, v = { original: { on: true }, edges: { on: true }, depth: { on: false }, objects: { on: true }, segments: { on: false } };
  let S = 50, N = false, R = 50;
  function U() {
    const b = 1 - S / 100, w = S / 100;
    u.style.opacity = v.original.on ? String(b) : "0", y.style.opacity = v.edges.on ? String(w * 0.6) : "0", r.style.opacity = v.edges.on ? String(w) : "0", g.style.opacity = v.depth.on ? String(w * 0.75) : "0", f.style.opacity = v.segments.on ? String(w * 0.5) : "0", E.style.opacity = v.objects.on ? String(w) : "0";
  }
  function F() {
    const b = i.getContext("2d");
    b.clearRect(0, 0, t, s);
    const w = (P, j) => {
      b.globalAlpha = j, b.drawImage(P, 0, 0);
    };
    v.depth.on && w(g, 0.75), v.segments.on && w(f, 0.5), v.edges.on && (w(y, 0.5), w(r, 1)), v.objects.on && w(k, 1), b.globalAlpha = 1;
  }
  function ie() {
    i.style.clipPath = `inset(0 0 0 ${R}%)`, l.style.left = `${R}%`;
  }
  const Q = document.createElement("div");
  Q.className = "stats-bar";
  const re = c.length, le = a.length;
  Q.innerHTML = `
    <span><span class="stat-value">${re}</span> object${re !== 1 ? "s" : ""} detected</span>
    <span class="stat-sep">&middot;</span>
    <span><span class="stat-value">${le}</span> segment${le !== 1 ? "s" : ""}</span>
    <span class="stat-sep">&middot;</span>
    <span>Depth estimated</span>`;
  const J = document.createElement("div");
  J.className = "layer-panel";
  const de = [{ key: "original", label: "Original", on: true, shortcut: "1", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', thumbSrc: u }, { key: "edges", label: "Edges", on: true, shortcut: "2", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', thumbSrc: r }, { key: "depth", label: "Depth", on: false, shortcut: "3", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5 5-4.5 5L2 16l6-13z"/><path d="M15.5 9l3-3 4 6-4 7"/></svg>', thumbSrc: g }, { key: "objects", label: "Objects", on: true, shortcut: "4", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>', thumbSrc: u }, { key: "segments", label: "Segments", on: false, shortcut: "5", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>', thumbSrc: f }], me = {};
  de.forEach(({ key: b, label: w, on: P, shortcut: j, thumbSrc: z }) => {
    const I = document.createElement("div");
    I.className = "layer-card" + (P ? " active-layer" : "");
    const Me = Be(z), se = document.createElement("div");
    se.className = "layer-thumb", se.appendChild(Me), I.innerHTML = `
      <div class="layer-info">
        <span class="layer-label">${w}</span>
        <span class="layer-shortcut">${j}</span>
      </div>
      <label class="toggle">
        <input type="checkbox" ${P ? "checked" : ""} />
        <span class="toggle-slider"></span>
      </label>`, I.insertBefore(se, I.firstChild);
    const O = I.querySelector("input");
    me[b] = O;
    const ue = () => {
      v[b].on = O.checked, I.classList.toggle("active-layer", O.checked), U(), N && F(), O.checked && ce[b] ? he(ce[b]) : xe();
    };
    O.addEventListener("change", ue), I.addEventListener("click", (Ce) => {
      Ce.target.closest(".toggle") || (O.checked = !O.checked, ue());
    }), J.appendChild(I);
  });
  const G = document.createElement("div");
  G.className = "blend-bar", G.innerHTML = `
    <span class="blend-label" id="bl-label">Hybrid</span>
    <input type="range" min="0" max="100" value="${S}" class="blend-slider" id="bl-slider" />
    <div class="blend-endpoints"><span>Human</span><span>Machine</span></div>`;
  const D = document.createElement("div");
  D.className = "annotation", D.style.display = "none", D.innerHTML = "<p></p>";
  function he(b) {
    D.querySelector("p").innerHTML = b, D.style.display = "block", D.style.animation = "none", D.offsetHeight, D.style.animation = "slideUp 0.35s var(--ease-out)";
  }
  function xe() {
    D.style.display = "none";
  }
  const T = document.createElement("div");
  T.className = "segment-tooltip", T.style.display = "none";
  const Ee = x.getContext("2d");
  p.style.pointerEvents = "auto", p.addEventListener("mousemove", (b) => {
    if (!v.segments.on || N) {
      T.style.display = "none";
      return;
    }
    const w = p.getBoundingClientRect(), P = Math.floor((b.clientX - w.left) / w.width * t), j = Math.floor((b.clientY - w.top) / w.height * s);
    if (P < 0 || P >= t || j < 0 || j >= s) {
      T.style.display = "none";
      return;
    }
    const I = Ee.getImageData(P, j, 1, 1).data[0] - 1;
    I >= 0 && I < a.length ? (T.textContent = a[I].label, T.style.display = "block", T.style.left = `${b.clientX + 14}px`, T.style.top = `${b.clientY - 30}px`) : T.style.display = "none";
  }), p.addEventListener("mouseleave", () => {
    T.style.display = "none";
  });
  let ee = false;
  M.addEventListener("pointerdown", (b) => {
    var _a, _b;
    ee = true, (_b = (_a = b.target).setPointerCapture) == null ? void 0 : _b.call(_a, b.pointerId);
  }), M.addEventListener("pointermove", (b) => {
    if (!ee) return;
    const w = M.getBoundingClientRect();
    R = Math.max(5, Math.min(95, (b.clientX - w.left) / w.width * 100)), ie();
  }), M.addEventListener("pointerup", () => {
    ee = false;
  });
  const te = document.createElement("div");
  te.className = "top-bar";
  const V = document.createElement("button");
  V.className = "back-btn", V.textContent = "\u2190 New Photo", V.addEventListener("click", () => {
    ke(), _();
  });
  const ne = document.createElement("div");
  ne.className = "top-bar-right";
  const q = document.createElement("button");
  q.className = "compare-btn", q.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><polyline points="8 6 4 12 8 18"/><polyline points="16 6 20 12 16 18"/></svg> Compare';
  function ae() {
    if (N = !N, q.classList.toggle("active", N), N) {
      F(), M.style.display = "block", ie(), G.style.display = "none";
      for (const b of Object.values(C)) (b instanceof HTMLCanvasElement || b instanceof SVGSVGElement) && (b.style.opacity = "0");
      u.style.opacity = "0";
    } else M.style.display = "none", G.style.display = "", U();
  }
  q.addEventListener("click", ae);
  const Y = document.createElement("button");
  Y.className = "share-btn", Y.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share', Y.addEventListener("click", () => We(t, s, u, r, g, f, k)), ne.append(q, Y), te.append(V, ne);
  const oe = document.createElement("div");
  oe.className = "keyboard-hint", oe.innerHTML = "Press <kbd>1</kbd>-<kbd>5</kbd> to toggle layers &middot; <kbd>C</kbd> to compare";
  function pe(b) {
    const w = b.key.toLowerCase();
    if (w >= "1" && w <= "5") {
      const P = Number(w) - 1, j = de[P].key, z = me[j];
      z.checked = !z.checked, z.dispatchEvent(new Event("change"));
    }
    w === "c" && ae(), w === "escape" && N && ae();
  }
  document.addEventListener("keydown", pe);
  function ke() {
    document.removeEventListener("keydown", pe);
  }
  d.append(h, J, G, D, te, T, Q, oe), H.appendChild(d);
  const ge = document.getElementById("bl-slider"), Le = document.getElementById("bl-label");
  ge.addEventListener("input", () => {
    S = Number(ge.value), Le.textContent = S <= 5 ? "Human" : S >= 95 ? "Machine" : "Hybrid", U();
  }), U(), he(ce.edges);
}
function ze(o, e, n, c) {
  const a = document.createElement("canvas");
  a.width = e.width, a.height = e.height;
  const t = a.getContext("2d"), s = t.createImageData(e.width, e.height);
  for (let d = 0; d < e.depthData.length; d++) {
    const h = 1 - e.depthData[d] / 255, [p, u, y] = Ae(h);
    s.data[d * 4] = p, s.data[d * 4 + 1] = u, s.data[d * 4 + 2] = y, s.data[d * 4 + 3] = 220;
  }
  t.putImageData(s, 0, 0), o.getContext("2d").drawImage(a, 0, 0, n, c);
}
function Fe(o, e, n, c, a) {
  const t = o.getContext("2d"), s = e.getContext("2d");
  n.forEach((d, h) => {
    const p = be[h % be.length], u = document.createElement("canvas");
    u.width = d.width, u.height = d.height;
    const y = u.getContext("2d"), r = y.createImageData(d.width, d.height), g = document.createElement("canvas");
    g.width = d.width, g.height = d.height;
    const f = g.getContext("2d"), x = f.createImageData(d.width, d.height);
    for (let E = 0; E < d.maskData.length; E++) if (d.maskData[E] > 128) {
      const k = E * 4;
      r.data[k] = p[0], r.data[k + 1] = p[1], r.data[k + 2] = p[2], r.data[k + 3] = 130, x.data[k] = h + 1, x.data[k + 3] = 255;
    }
    y.putImageData(r, 0, 0), t.drawImage(u, 0, 0, c, a), f.putImageData(x, 0, 0), s.drawImage(g, 0, 0, c, a);
  });
}
function Ge(o, e, n, c) {
  e.forEach((a) => {
    let { xmin: t, ymin: s, xmax: d, ymax: h } = a.box;
    d <= 1 && h <= 1 && (t *= n, d *= n, s *= c, h *= c);
    const p = d - t, u = h - s, y = `${a.label} ${a.score.toFixed(2)}`, r = y.length * 7 + 14, g = document.createElementNS(X, "rect");
    g.setAttribute("class", "bbox-label-bg"), g.setAttribute("x", String(t)), g.setAttribute("y", String(Math.max(0, s - 22))), g.setAttribute("width", String(r)), g.setAttribute("height", "20"), g.setAttribute("fill", "rgba(0,0,0,0.75)");
    const f = document.createElementNS(X, "rect");
    f.setAttribute("class", "bbox-rect"), f.setAttribute("x", String(t)), f.setAttribute("y", String(s)), f.setAttribute("width", String(p)), f.setAttribute("height", String(u));
    const x = document.createElementNS(X, "text");
    x.setAttribute("class", "bbox-label"), x.setAttribute("x", String(t + 7)), x.setAttribute("y", String(Math.max(14, s - 6))), x.textContent = y, o.append(g, f, x);
  });
}
async function qe(o, e, n, c) {
  try {
    const a = new XMLSerializer().serializeToString(o), t = new Blob([a], { type: "image/svg+xml;charset=utf-8" }), s = URL.createObjectURL(t), d = await ve(s);
    e.getContext("2d").drawImage(d, 0, 0, n, c), URL.revokeObjectURL(s);
  } catch {
  }
}
async function We(o, e, n, c, a, t, s) {
  var _a;
  const d = document.createElement("canvas");
  d.width = o, d.height = e;
  const h = d.getContext("2d");
  for (const g of [n, a, t, c, s]) {
    const f = parseFloat(g.style.opacity || "0");
    f > 0 && (h.globalAlpha = f, h.drawImage(g, 0, 0));
  }
  h.globalAlpha = 0.6, h.font = "600 11px Inter, sans-serif", h.fillStyle = "#ffffff", h.textAlign = "right", h.fillText("Machine Gaze \u2014 williamcfrancis.netlify.app", o - 14, e - 12);
  const p = await new Promise((g) => d.toBlob(g, "image/png"));
  if (!p) return;
  const u = new File([p], "machine-gaze.png", { type: "image/png" });
  if (navigator.share && ((_a = navigator.canShare) == null ? void 0 : _a.call(navigator, { files: [u] }))) try {
    await navigator.share({ files: [u], title: "Machine Gaze", text: "See the world through a robot's eyes" });
    return;
  } catch {
  }
  const y = URL.createObjectURL(p), r = document.createElement("a");
  r.href = y, r.download = "machine-gaze.png", r.click(), URL.revokeObjectURL(y);
}
_();
