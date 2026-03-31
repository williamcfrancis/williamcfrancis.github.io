(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) c(a);
  new MutationObserver((a) => {
    for (const t of a) if (t.type === "childList") for (const r of t.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && c(r);
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
function Q(s) {
  const { width: e, height: n, data: c } = s, a = new Float32Array(e * n);
  for (let o = 0; o < e * n; o++) {
    const i = o * 4;
    a[o] = 0.299 * c[i] + 0.587 * c[i + 1] + 0.114 * c[i + 2];
  }
  const t = Z(a, e, n), r = new Float32Array(e * n), d = new Float32Array(e * n), l = new Float32Array(e * n), w = new Float32Array(e * n);
  for (let o = 1; o < n - 1; o++) for (let i = 1; i < e - 1; i++) {
    const h = o * e + i, E = t[(o - 1) * e + (i - 1)], k = t[(o - 1) * e + i], b = t[(o - 1) * e + (i + 1)], T = t[o * e + (i - 1)], C = t[o * e + (i + 1)], B = t[(o + 1) * e + (i - 1)], P = t[(o + 1) * e + i], O = t[(o + 1) * e + (i + 1)];
    r[h] = -E + b - 2 * T + 2 * C - B + O, d[h] = -E - 2 * k - b + B + 2 * P + O, l[h] = Math.sqrt(r[h] * r[h] + d[h] * d[h]), w[h] = Math.atan2(d[h], r[h]);
  }
  const p = new Float32Array(e * n);
  for (let o = 1; o < n - 1; o++) for (let i = 1; i < e - 1; i++) {
    const h = o * e + i, E = (w[h] * 180 / Math.PI + 180) % 180;
    let k = 0, b = 0;
    E < 22.5 || E >= 157.5 ? (k = l[h - 1], b = l[h + 1]) : E < 67.5 ? (k = l[(o - 1) * e + (i + 1)], b = l[(o + 1) * e + (i - 1)]) : E < 112.5 ? (k = l[(o - 1) * e + i], b = l[(o + 1) * e + i]) : (k = l[(o - 1) * e + (i - 1)], b = l[(o + 1) * e + (i + 1)]), p[h] = l[h] >= k && l[h] >= b ? l[h] : 0;
  }
  let f = 0, m = 0;
  for (let o = 0; o < e * n; o++) p[o] > 0 && (f += p[o], m++);
  const g = m > 0 ? f / m : 50, u = g * 0.4, y = g * 1.1, x = new Uint8Array(e * n);
  for (let o = 0; o < e * n; o++) p[o] >= y ? x[o] = 2 : p[o] >= u && (x[o] = 1);
  const v = new Uint8Array(e * n), S = [];
  for (let o = 0; o < e * n; o++) x[o] === 2 && (v[o] = 255, S.push(o));
  for (; S.length > 0; ) {
    const o = S.pop(), i = o / e | 0, h = o % e;
    for (let E = -1; E <= 1; E++) for (let k = -1; k <= 1; k++) {
      const b = i + E, T = h + k;
      if (b >= 0 && b < n && T >= 0 && T < e) {
        const C = b * e + T;
        x[C] === 1 && v[C] === 0 && (v[C] = 255, S.push(C));
      }
    }
  }
  const L = new ImageData(e, n);
  for (let o = 0; o < e * n; o++) {
    const i = v[o];
    L.data[o * 4] = i, L.data[o * 4 + 1] = i, L.data[o * 4 + 2] = i, L.data[o * 4 + 3] = i;
  }
  return L;
}
function Z(s, e, n) {
  const c = new Float32Array(e * n);
  for (let a = 1; a < n - 1; a++) for (let t = 1; t < e - 1; t++) c[a * e + t] = (s[(a - 1) * e + (t - 1)] + 2 * s[(a - 1) * e + t] + s[(a - 1) * e + (t + 1)] + 2 * s[a * e + (t - 1)] + 4 * s[a * e + t] + 2 * s[a * e + (t + 1)] + s[(a + 1) * e + (t - 1)] + 2 * s[(a + 1) * e + t] + s[(a + 1) * e + (t + 1)]) / 16;
  return c;
}
const H = [[0, 0, 0, 4], [0.071, 10, 7, 46], [0.143, 31, 12, 72], [0.214, 57, 15, 97], [0.286, 85, 15, 109], [0.357, 114, 25, 107], [0.429, 143, 37, 100], [0.5, 171, 51, 86], [0.571, 197, 69, 67], [0.643, 220, 91, 45], [0.714, 239, 120, 19], [0.786, 249, 153, 9], [0.857, 252, 190, 35], [0.929, 250, 226, 76], [1, 252, 255, 164]];
function J(s) {
  s = Math.max(0, Math.min(1, s));
  let e = 0;
  for (let m = 1; m < H.length; m++) {
    if (s <= H[m][0]) {
      e = m - 1;
      break;
    }
    e = m - 1;
  }
  const [n, c, a, t] = H[e], r = Math.min(e + 1, H.length - 1), [d, l, w, p] = H[r], f = d === n ? 0 : (s - n) / (d - n);
  return [Math.round(c + (l - c) * f), Math.round(a + (w - a) * f), Math.round(t + (p - t) * f)];
}
const _ = 1024, Y = [{ thumb: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=200&q=60", full: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1024&q=80", label: "City street" }, { thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=60", full: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1024&q=80", label: "Dog in park" }, { thumb: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60", full: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1024&q=80", label: "Kitchen" }], q = { original: "This is what you see \u2014 a cohesive scene understood instantly. Your visual cortex dedicates 30% of your brain's total activity to achieve this effortless perception.", edges: 'A robot has no concept of "things." It starts with gradients \u2014 where does brightness change sharply? These edges are all it has before higher reasoning kicks in.', depth: "This depth map was estimated from a single 2D image using a neural network trained on millions of stereo photo pairs. The robot has never seen this scene before, yet it can guess distance.", objects: 'DETR (Detection Transformer) sees the photo as a set of 100 possible objects. Most slots are empty. The remaining few have labels and confidence scores. To the robot, your dog is "object #7, class: dog, confidence: 0.97."', segments: 'Panoptic segmentation assigns every single pixel to either a "thing" (countable, like a person) or "stuff" (uncountable, like sky or grass). There is no ambiguity \u2014 every pixel belongs somewhere.' }, W = [[230, 25, 75], [60, 180, 75], [255, 225, 25], [0, 130, 200], [245, 130, 48], [145, 30, 180], [70, 240, 240], [240, 50, 230], [210, 245, 60], [250, 190, 212], [0, 128, 128], [220, 190, 255], [170, 110, 40], [255, 250, 200], [128, 0, 0], [170, 255, 195], [128, 128, 0], [255, 215, 180], [0, 0, 128], [128, 128, 128]], ee = ["Detecting Edges", "Estimating Depth", "Finding Objects", "Segmenting Scene", "Compositing"], F = "http://www.w3.org/2000/svg", te = `<svg class="eye-icon" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
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
</svg>`, N = document.getElementById("app");
function V(s) {
  return new Promise((e, n) => {
    const c = new Image();
    c.crossOrigin = "anonymous", c.onload = () => e(c), c.onerror = () => n(new Error("Failed to load image")), c.src = s;
  });
}
function ne(s) {
  let { naturalWidth: e, naturalHeight: n } = s;
  if (Math.max(e, n) > _) {
    const a = _ / Math.max(e, n);
    e = Math.round(e * a), n = Math.round(n * a);
  }
  const c = document.createElement("canvas");
  return c.width = e, c.height = n, c.getContext("2d").drawImage(s, 0, 0, e, n), c;
}
async function oe(s) {
  const n = await (await fetch(s, { mode: "cors" })).blob();
  return new Promise((c, a) => {
    const t = new FileReader();
    t.onload = () => c(t.result), t.onerror = a, t.readAsDataURL(n);
  });
}
function ae(s) {
  return new Promise((e, n) => {
    const c = new FileReader();
    c.onload = () => e(c.result), c.onerror = n, c.readAsDataURL(s);
  });
}
const I = (s) => new Promise((e) => setTimeout(e, s));
function R() {
  N.innerHTML = "";
  const s = document.createElement("div");
  s.className = "landing", s.innerHTML = `
    <div class="landing-content">
      ${te}
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
          ${Y.map((n, c) => `
            <button class="demo-thumb" data-idx="${c}">
              <img src="${n.thumb}" alt="${n.label}" crossorigin="anonymous" />
            </button>`).join("")}
        </div>
      </div>
    </div>`, N.appendChild(s), document.getElementById("btn-camera").addEventListener("click", se);
  const e = document.getElementById("file-input");
  document.getElementById("btn-file").addEventListener("click", () => e.click()), e.addEventListener("change", async () => {
    var _a;
    if ((_a = e.files) == null ? void 0 : _a[0]) {
      const n = await ae(e.files[0]);
      z(n);
    }
  }), s.querySelectorAll(".demo-thumb").forEach((n) => {
    n.addEventListener("click", async () => {
      const c = Number(n.dataset.idx);
      n.style.opacity = "0.5";
      try {
        const a = await oe(Y[c].full);
        z(a);
      } catch {
        n.style.opacity = "1";
      }
    });
  });
}
async function se() {
  N.innerHTML = "";
  const s = document.createElement("div");
  s.className = "camera-view";
  const e = document.createElement("video");
  e.autoplay = true, e.playsInline = true;
  const n = document.createElement("div");
  n.className = "camera-controls";
  const c = document.createElement("button");
  c.className = "btn-capture", c.title = "Take photo";
  const a = document.createElement("button");
  a.className = "btn-cancel", a.textContent = "Cancel", n.append(c, a), s.append(e, n), N.appendChild(s);
  let t = null;
  try {
    t = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 960 } } }), e.srcObject = t;
  } catch {
    R();
    return;
  }
  c.addEventListener("click", () => {
    const r = document.createElement("canvas");
    r.width = e.videoWidth, r.height = e.videoHeight, r.getContext("2d").drawImage(e, 0, 0), t == null ? void 0 : t.getTracks().forEach((d) => d.stop()), z(r.toDataURL("image/jpeg", 0.9));
  }), a.addEventListener("click", () => {
    t == null ? void 0 : t.getTracks().forEach((r) => r.stop()), R();
  });
}
async function z(s) {
  const e = await V(s), n = ne(e), c = n.toDataURL("image/jpeg", 0.9);
  ce(c, n);
}
async function ce(s, e) {
  N.innerHTML = "";
  const n = document.createElement("div");
  n.className = "processing";
  const c = document.createElement("img");
  c.className = "processing-bg", c.src = s;
  const a = document.createElement("div");
  a.className = "processing-overlay";
  const t = document.createElement("div");
  t.className = "download-bar", t.style.display = "none", t.innerHTML = `
    <p>Downloading AI models (~40 MB, cached for next time)</p>
    <div class="download-track"><div class="download-fill" id="dl-fill"></div></div>`;
  const r = document.createElement("div");
  r.className = "timeline";
  const d = ee.map((o) => {
    const i = document.createElement("div");
    return i.className = "timeline-step", i.innerHTML = `
      <div class="step-dot"><div class="step-dot-inner"></div></div>
      <div class="step-info">
        <span class="step-label">${o}</span>
        <span class="step-status">Waiting</span>
      </div>`, i;
  });
  d.forEach((o) => r.appendChild(o)), a.append(t, r), n.append(c, a), N.appendChild(n);
  const l = (o, i) => {
    const h = d[o];
    h.className = "timeline-step" + (i !== "waiting" ? ` ${i}` : "");
    const E = h.querySelector(".step-status");
    E.textContent = i === "active" ? "Processing\u2026" : i === "done" ? "Complete" : "Waiting";
  };
  l(0, "active"), await I(150);
  const p = e.getContext("2d").getImageData(0, 0, e.width, e.height), f = Q(p);
  l(0, "done"), await I(250);
  const m = new Worker(new URL("/games/machine_gaze/assets/worker-D7EGx7oI.js", import.meta.url), { type: "module" }), g = { depth: null, objects: null, segments: null }, u = {}, y = new Promise((o) => u.depth = o), x = new Promise((o) => u.objects = o), v = new Promise((o) => u.segments = o);
  let S = false;
  const L = {};
  m.onmessage = (o) => {
    var _a;
    const i = o.data;
    if (i.type === "download-progress") {
      S || (t.style.display = "block", S = true), L[i.file] = { loaded: i.loaded, total: i.total };
      let h = 0, E = 0;
      for (const b of Object.values(L)) h += b.loaded, E += b.total;
      const k = document.getElementById("dl-fill");
      k && (k.style.width = `${E > 0 ? h / E * 100 : 0}%`);
    }
    if (i.type === "models-ready" && (t.style.display = "none"), i.type === "task-complete") {
      const h = i.task;
      g[h] = i.data, (_a = u[h]) == null ? void 0 : _a.call(u);
    }
    i.type === "error" && (m.terminate(), ie(i.message));
  }, m.postMessage({ type: "process", imageDataUrl: s }), l(1, "active"), await Promise.all([I(800), y]), l(1, "done"), await I(200), l(2, "active"), await Promise.all([I(800), x]), l(2, "done"), await I(200), l(3, "active"), await Promise.all([I(800), v]), l(3, "done"), await I(250), l(4, "active"), await I(700), l(4, "done"), await I(400), m.terminate(), re(e, f, g.depth, g.objects.objects, g.segments.segments);
}
function ie(s) {
  const e = document.createElement("div");
  e.className = "error-overlay", e.innerHTML = `
    <p class="error-msg">Something went wrong</p>
    <p class="error-detail">${s}</p>
    <button class="btn btn-primary" id="err-retry">Try Again</button>`, N.appendChild(e), document.getElementById("err-retry").addEventListener("click", R);
}
function re(s, e, n, c, a) {
  N.innerHTML = "";
  const t = s.width, r = s.height, d = document.createElement("div");
  d.className = "exploration";
  const l = document.createElement("div");
  l.className = "canvas-container";
  const w = document.createElement("div");
  w.className = "canvas-stack", w.style.aspectRatio = `${t} / ${r}`;
  const p = document.createElement("canvas");
  p.className = "base-layer", p.width = t, p.height = r, p.getContext("2d").drawImage(s, 0, 0);
  const f = document.createElement("canvas");
  f.width = t, f.height = r, f.getContext("2d").putImageData(e, 0, 0);
  const m = document.createElement("canvas");
  m.width = t, m.height = r, le(m, n, t, r);
  const g = document.createElement("canvas");
  g.width = t, g.height = r;
  const u = document.createElement("canvas");
  u.width = t, u.height = r, de(g, u, a, t, r);
  const y = document.createElementNS(F, "svg");
  y.setAttribute("viewBox", `0 0 ${t} ${r}`), y.setAttribute("preserveAspectRatio", "xMidYMid meet"), he(y, c, t, r), w.append(p, f, m, g, y), l.appendChild(w);
  const x = { original: { on: true, el: p }, edges: { on: true, el: f }, depth: { on: false, el: m }, objects: { on: true, el: y }, segments: { on: false, el: g } };
  let v = 50;
  function S() {
    const M = 1 - v / 100, A = v / 100;
    p.style.opacity = x.original.on ? String(M) : "0", f.style.opacity = x.edges.on ? String(A) : "0", m.style.opacity = x.depth.on ? String(A * 0.75) : "0", g.style.opacity = x.segments.on ? String(A * 0.55) : "0", y.style.opacity = x.objects.on ? String(A) : "0";
  }
  const L = document.createElement("div");
  L.className = "layer-panel", [{ key: "original", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>', label: "Original", on: true }, { key: "edges", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', label: "Edges", on: true }, { key: "depth", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5 5-4.5 5L2 16l6-13z"/><path d="M15.5 9l3-3 4 6-4 7"/></svg>', label: "Depth", on: false }, { key: "objects", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>', label: "Objects", on: true }, { key: "segments", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/></svg>', label: "Segments", on: false }].forEach(({ key: M, icon: A, label: U, on: $ }) => {
    const j = document.createElement("div");
    j.className = "layer-card", j.innerHTML = `
      <div class="layer-icon">${A}</div>
      <span class="layer-label">${U}</span>
      <label class="toggle">
        <input type="checkbox" ${$ ? "checked" : ""} />
        <span class="toggle-slider"></span>
      </label>`;
    const D = j.querySelector("input"), G = () => {
      x[M].on = D.checked, S(), D.checked && q[M] ? E(q[M]) : k();
    };
    D.addEventListener("change", G), j.addEventListener("click", (K) => {
      K.target.closest(".toggle") || (D.checked = !D.checked, G());
    }), L.appendChild(j);
  });
  const i = document.createElement("div");
  i.className = "blend-bar", i.innerHTML = `
    <span class="blend-label" id="bl-label">Hybrid</span>
    <input type="range" min="0" max="100" value="${v}" class="blend-slider" id="bl-slider" />
    <div class="blend-endpoints"><span>Human</span><span>Machine</span></div>`;
  const h = document.createElement("div");
  h.className = "annotation", h.style.display = "none", h.innerHTML = "<p></p>";
  function E(M) {
    h.querySelector("p").textContent = M, h.style.display = "block", h.style.animation = "none", h.offsetHeight, h.style.animation = "slideUp 0.3s var(--ease)";
  }
  function k() {
    h.style.display = "none";
  }
  const b = document.createElement("div");
  b.className = "segment-tooltip", b.style.display = "none";
  const T = u.getContext("2d");
  w.style.pointerEvents = "auto", w.addEventListener("mousemove", (M) => {
    if (!x.segments.on) {
      b.style.display = "none";
      return;
    }
    const A = w.getBoundingClientRect(), U = Math.floor((M.clientX - A.left) / A.width * t), $ = Math.floor((M.clientY - A.top) / A.height * r);
    if (U < 0 || U >= t || $ < 0 || $ >= r) {
      b.style.display = "none";
      return;
    }
    const D = T.getImageData(U, $, 1, 1).data[0] - 1;
    D >= 0 && D < a.length ? (b.textContent = a[D].label, b.style.display = "block", b.style.left = `${M.clientX + 12}px`, b.style.top = `${M.clientY - 28}px`) : b.style.display = "none";
  }), w.addEventListener("mouseleave", () => {
    b.style.display = "none";
  });
  const C = document.createElement("div");
  C.className = "top-bar";
  const B = document.createElement("button");
  B.className = "back-btn", B.textContent = "\u2190 New Photo", B.addEventListener("click", R);
  const P = document.createElement("button");
  P.className = "share-btn", P.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share', P.addEventListener("click", () => me(t, r, p, f, m, g, y)), C.append(B, P), d.append(l, L, i, h, C, b), N.appendChild(d);
  const O = document.getElementById("bl-slider"), X = document.getElementById("bl-label");
  O.addEventListener("input", () => {
    v = Number(O.value), X.textContent = v <= 5 ? "Human" : v >= 95 ? "Machine" : "Hybrid", S();
  }), S(), E(q.edges);
}
function le(s, e, n, c) {
  const a = document.createElement("canvas");
  a.width = e.width, a.height = e.height;
  const t = a.getContext("2d"), r = t.createImageData(e.width, e.height);
  for (let d = 0; d < e.depthData.length; d++) {
    const l = 1 - e.depthData[d] / 255, [w, p, f] = J(l);
    r.data[d * 4] = w, r.data[d * 4 + 1] = p, r.data[d * 4 + 2] = f, r.data[d * 4 + 3] = 220;
  }
  t.putImageData(r, 0, 0), s.getContext("2d").drawImage(a, 0, 0, n, c);
}
function de(s, e, n, c, a) {
  const t = s.getContext("2d"), r = e.getContext("2d");
  n.forEach((d, l) => {
    const w = W[l % W.length], p = document.createElement("canvas");
    p.width = d.width, p.height = d.height;
    const f = p.getContext("2d"), m = f.createImageData(d.width, d.height), g = document.createElement("canvas");
    g.width = d.width, g.height = d.height;
    const u = g.getContext("2d"), y = u.createImageData(d.width, d.height);
    for (let x = 0; x < d.maskData.length; x++) if (d.maskData[x] > 128) {
      const v = x * 4;
      m.data[v] = w[0], m.data[v + 1] = w[1], m.data[v + 2] = w[2], m.data[v + 3] = 140, y.data[v] = l + 1, y.data[v + 1] = 0, y.data[v + 2] = 0, y.data[v + 3] = 255;
    }
    f.putImageData(m, 0, 0), t.drawImage(p, 0, 0, c, a), u.putImageData(y, 0, 0), r.drawImage(g, 0, 0, c, a);
  });
}
function he(s, e, n, c) {
  e.forEach((a) => {
    let { xmin: t, ymin: r, xmax: d, ymax: l } = a.box;
    d <= 1 && l <= 1 && (t *= n, d *= n, r *= c, l *= c);
    const w = d - t, p = l - r, f = `${a.label} ${a.score.toFixed(2)}`, m = f.length * 7.2 + 12, g = document.createElementNS(F, "rect");
    g.setAttribute("class", "bbox-label-bg"), g.setAttribute("x", String(t)), g.setAttribute("y", String(Math.max(0, r - 22))), g.setAttribute("width", String(m)), g.setAttribute("height", "20"), g.setAttribute("fill", "rgba(0,0,0,0.72)");
    const u = document.createElementNS(F, "rect");
    u.setAttribute("class", "bbox-rect"), u.setAttribute("x", String(t)), u.setAttribute("y", String(r)), u.setAttribute("width", String(w)), u.setAttribute("height", String(p));
    const y = document.createElementNS(F, "text");
    y.setAttribute("class", "bbox-label"), y.setAttribute("x", String(t + 6)), y.setAttribute("y", String(Math.max(14, r - 6))), y.textContent = f, s.append(g, u, y);
  });
}
async function me(s, e, n, c, a, t, r) {
  var _a;
  const d = document.createElement("canvas");
  d.width = s, d.height = e;
  const l = d.getContext("2d");
  for (const u of [n, a, t, c]) {
    const y = parseFloat(u.style.opacity || "0");
    y > 0 && (l.globalAlpha = y, l.drawImage(u, 0, 0));
  }
  const w = parseFloat(r.style.opacity || "0");
  if (w > 0) try {
    const u = new XMLSerializer().serializeToString(r), y = new Blob([u], { type: "image/svg+xml;charset=utf-8" }), x = URL.createObjectURL(y), v = await V(x);
    l.globalAlpha = w, l.drawImage(v, 0, 0, s, e), URL.revokeObjectURL(x);
  } catch {
  }
  l.globalAlpha = 0.65, l.font = "12px Inter, sans-serif", l.fillStyle = "#ffffff", l.textAlign = "right", l.fillText("Machine Gaze \u2014 williamcfrancis.netlify.app", s - 12, e - 12);
  const p = await new Promise((u) => d.toBlob(u, "image/png"));
  if (!p) return;
  const f = new File([p], "machine-gaze.png", { type: "image/png" });
  if (navigator.share && ((_a = navigator.canShare) == null ? void 0 : _a.call(navigator, { files: [f] }))) try {
    await navigator.share({ files: [f], title: "Machine Gaze", text: "See the world through a robot's eyes" });
    return;
  } catch {
  }
  const m = URL.createObjectURL(p), g = document.createElement("a");
  g.href = m, g.download = "machine-gaze.png", g.click(), URL.revokeObjectURL(m);
}
R();
