import gsap from 'gsap';
import { ACCENTS, EASE, REDUCED_MOTION } from './tokens';
import { IdleManager, IdleHook } from './idle';

// ════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════

const NS = 'http://www.w3.org/2000/svg';
const W = 800;
const H = 500;

function makeSVG(): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.style.width = '100%';
  svg.style.height = '100%';
  return svg;
}

function el(tag: string, attrs: Record<string, string | number>): SVGElement {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
  return e;
}

function txt(x: number, y: number, content: string, size: number, color = '#fff', anchor = 'middle', family = 'Inter, sans-serif'): SVGTextElement {
  const t = el('text', { x, y, fill: color, 'font-size': size, 'text-anchor': anchor, 'font-family': family }) as SVGTextElement;
  t.textContent = content;
  return t;
}

function makeCanvas(container: HTMLElement): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  return { canvas, ctx };
}

function drawScanLines(ctx: CanvasRenderingContext2D, alpha = 0.02) {
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
}

function svgBg(svg: SVGSVGElement, fill: string) {
  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill }));
}

function svgDefs(svg: SVGSVGElement): SVGElement {
  const d = el('defs', {});
  svg.appendChild(d);
  return d;
}

function addBlur(defs: SVGElement, id: string, dev: number) {
  const f = el('filter', { id, x: '-50%', y: '-50%', width: '200%', height: '200%' });
  f.appendChild(el('feGaussianBlur', { stdDeviation: dev }));
  defs.appendChild(f);
}

function addDropShadow(defs: SVGElement, id: string, blur = 3, dy = 2, opacity = 0.45) {
  const f = el('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' });
  f.appendChild(el('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: blur }));
  f.appendChild(el('feOffset', { dx: 0, dy }));
  const ct = el('feComponentTransfer', {});
  const fa = el('feFuncA', { type: 'linear', slope: opacity });
  ct.appendChild(fa);
  f.appendChild(ct);
  const merge = el('feMerge', {});
  merge.appendChild(el('feMergeNode', {}));
  const mn2 = el('feMergeNode', {});
  mn2.setAttribute('in', 'SourceGraphic');
  merge.appendChild(mn2);
  f.appendChild(merge);
  defs.appendChild(f);
}

function hint(container: HTMLElement, text: string): HTMLElement {
  const h = document.createElement('div');
  h.className = 'vignette-hint';
  h.textContent = text;
  container.appendChild(h);
  return h;
}

function showHintAfter(h: HTMLElement, ms = 1800) {
  setTimeout(() => h.classList.add('show'), ms);
}

function registerIdle(levelId: number, section: HTMLElement, hook: IdleHook) {
  if (REDUCED_MOTION) return;
  IdleManager.register(levelId, hook, section);
}

// ════════════════════════════════════════════════════════════
// DISPATCHER
// ════════════════════════════════════════════════════════════

export function createVignette(levelId: number, container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const fns: Record<number, (c: HTMLElement, s: HTMLElement) => gsap.core.Timeline> = {
    1: thermostat, 2: cruiseControl, 3: roomba, 4: drone,
    5: warehouse, 6: selfDrivingL2, 7: selfDrivingL4, 8: surgicalRobot,
    9: marsRover, 10: starlink, 11: alphaFold, 12: vonNeumann,
  };
  return (fns[levelId] ?? fallback)(container, section);
}

function fallback(_c: HTMLElement, _s: HTMLElement): gsap.core.Timeline { return gsap.timeline(); }

// ════════════════════════════════════════════════════════════
// LEVEL 1 — THERMOSTAT
// Living thermostat: continuous sense → compare → act loop.
// Click anywhere on the dial to set a new target temperature.
// ════════════════════════════════════════════════════════════

function thermostat(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[0];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow1', 22);
  addBlur(defs, 'glow1s', 8);
  addDropShadow(defs, 'shadow1', 3, 2, 0.5);

  // Mercury gradient
  const mg = el('linearGradient', { id: 'mercuryG', x1: 0, y1: 0, x2: 0, y2: 1 });
  mg.appendChild(el('stop', { offset: '0%', 'stop-color': A.fill }));
  mg.appendChild(el('stop', { offset: '100%', 'stop-color': '#a83a16' }));
  defs.appendChild(mg);

  svgBg(svg, '#0e1025');
  // Floor line
  svg.appendChild(el('line', { x1: 0, y1: 425, x2: W, y2: 425, stroke: '#1a1d3a', 'stroke-width': 1 }));
  svg.appendChild(el('line', { x1: 0, y1: 426, x2: W, y2: 426, stroke: '#0a0c1c', 'stroke-width': 1 }));

  // ═══ Thermometer ═══
  const tg = el('g', { transform: 'translate(150, 60)', filter: 'url(#shadow1)' });
  tg.appendChild(el('rect', { x: 0, y: 0, width: 30, height: 260, rx: 15, fill: '#181a35', stroke: '#252850', 'stroke-width': 1 }));
  // Bulb with radial gradient
  const bulbG = el('radialGradient', { id: 'bulbG', cx: '40%', cy: '40%', r: '60%' });
  bulbG.appendChild(el('stop', { offset: '0%', 'stop-color': '#ffb37a' }));
  bulbG.appendChild(el('stop', { offset: '100%', 'stop-color': A.fill }));
  defs.appendChild(bulbG);
  tg.appendChild(el('circle', { cx: 15, cy: 290, r: 26, fill: 'url(#bulbG)' }));
  const mercury = el('rect', { x: 7, y: 200, width: 16, height: 60, rx: 8, fill: 'url(#mercuryG)' });
  tg.appendChild(mercury);
  for (let i = 0; i < 7; i++) {
    tg.appendChild(el('line', { x1: 32, y1: 18 + i * 38, x2: 44, y2: 18 + i * 38, stroke: '#3a3d65', 'stroke-width': 1 }));
  }
  const tempLabel = txt(15, -8, '68\u00b0F', 17, '#aab3cc', 'middle', 'JetBrains Mono, monospace');
  tg.appendChild(tempLabel);
  svg.appendChild(tg);

  // ═══ Controller (round dial) ═══
  const cx = 410, cy = 200, dR = 78;
  const cg = el('g', { transform: `translate(${cx}, ${cy})`, filter: 'url(#shadow1)' });
  // Dial body
  cg.appendChild(el('circle', { cx: 0, cy: 0, r: dR + 6, fill: '#0e1228', stroke: '#22264a', 'stroke-width': 1 }));
  cg.appendChild(el('circle', { cx: 0, cy: 0, r: dR, fill: '#141738', stroke: '#2c305c', 'stroke-width': 1.5 }));
  // Tick marks
  for (let i = 0; i <= 24; i++) {
    const a = -Math.PI * 0.85 + (i / 24) * Math.PI * 1.7;
    const inner = i % 6 === 0 ? dR - 14 : dR - 8;
    cg.appendChild(el('line', { x1: Math.cos(a) * (dR - 4), y1: Math.sin(a) * (dR - 4), x2: Math.cos(a) * inner, y2: Math.sin(a) * inner, stroke: i % 6 === 0 ? '#5a5e8a' : '#2c305c', 'stroke-width': i % 6 === 0 ? 1.5 : 1 }));
  }
  // Set-point marker
  const setNeedle = el('line', { x1: 0, y1: 0, x2: 0, y2: -(dR - 18), stroke: '#5fd9b0', 'stroke-width': 2, 'stroke-linecap': 'round' });
  cg.appendChild(setNeedle);
  // Actual-temp marker
  const actNeedle = el('line', { x1: 0, y1: 0, x2: 0, y2: -(dR - 22), stroke: A.fill, 'stroke-width': 3, 'stroke-linecap': 'round' });
  cg.appendChild(actNeedle);
  cg.appendChild(el('circle', { cx: 0, cy: 0, r: 5, fill: '#fff' }));
  const setLabel = txt(0, dR + 20, 'SET 68\u00B0', 9, '#5fd9b0', 'middle', 'JetBrains Mono, monospace');
  cg.appendChild(setLabel);
  const actLabel = txt(0, -dR - 16, '68\u00B0', 11, A.ink, 'middle', 'JetBrains Mono, monospace');
  cg.appendChild(actLabel);
  // Status LED
  const statusLED = el('circle', { cx: 0, cy: dR / 2 + 4, r: 4, fill: '#444' });
  cg.appendChild(statusLED);
  svg.appendChild(cg);

  // ═══ Radiator ═══
  const rg = el('g', { transform: 'translate(580, 158)', filter: 'url(#shadow1)' });
  for (let i = 0; i < 6; i++) {
    rg.appendChild(el('rect', { x: i * 24, y: 0, width: 16, height: 175, rx: 4, fill: '#1a1d38', stroke: '#2c305c', 'stroke-width': 1 }));
  }
  rg.appendChild(el('rect', { x: -4, y: -8, width: 156, height: 8, rx: 2, fill: '#22264a' }));
  rg.appendChild(el('rect', { x: -4, y: 175, width: 156, height: 8, rx: 2, fill: '#22264a' }));
  // Glow halo
  const radGlow = el('rect', { x: -25, y: -25, width: 184, height: 220, rx: 14, fill: A.fill, opacity: 0, filter: 'url(#glow1)' });
  rg.insertBefore(radGlow, rg.firstChild);
  // Heat shimmer (3 wavy lines)
  const heatLines: SVGElement[] = [];
  for (let i = 0; i < 3; i++) {
    const hl = el('path', { d: '', stroke: A.fill, 'stroke-width': 1, fill: 'none', opacity: 0 });
    rg.appendChild(hl);
    heatLines.push(hl);
  }
  svg.appendChild(rg);

  // ═══ Data flow lines ═══
  const line1 = el('line', { x1: 200, y1: 200, x2: 332, y2: 200, stroke: '#7cd1ff', 'stroke-width': 1.2, 'stroke-dasharray': '4 4', opacity: 0 });
  const line2 = el('line', { x1: 488, y1: 200, x2: 580, y2: 200, stroke: A.fill, 'stroke-width': 1.2, 'stroke-dasharray': '4 4', opacity: 0 });
  svg.appendChild(line1);
  svg.appendChild(line2);

  // ═══ Labels ═══
  svg.appendChild(txt(155, 410, 'SENSOR', 11, 'rgba(255,255,255,0.32)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(txt(410, 410, 'CONTROLLER', 11, 'rgba(255,255,255,0.32)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(txt(656, 410, 'ACTUATOR', 11, 'rgba(255,255,255,0.32)', 'middle', 'JetBrains Mono, monospace'));

  // ═══ Click-to-set hint ═══
  const h = hint(container, 'click dial to set target');
  showHintAfter(h, 2400);
  let userSet = 68;
  cg.style.cursor = 'pointer';
  (cg as SVGElement).style.pointerEvents = 'all';
  cg.addEventListener('click', (ev) => {
    const rect = svg.getBoundingClientRect();
    const sx = (ev.clientX - rect.left) * (W / rect.width) - cx;
    const sy = (ev.clientY - rect.top) * (H / rect.height) - cy;
    let a = Math.atan2(sy, sx); // -π..π
    // Map dial range -0.85π .. 0.85π → 50..86 °F
    let t = (a + Math.PI * 0.85) / (Math.PI * 1.7);
    t = Math.max(0, Math.min(1, t));
    userSet = Math.round(50 + t * 36);
    const ang = -Math.PI * 0.5 + (userSet - 50) / 36 * Math.PI * 1.7 - Math.PI * 0.85 + Math.PI * 0.5; // remap
    // Direct mapping: target angle in dial coords
    const ta = -Math.PI * 0.85 + ((userSet - 50) / 36) * Math.PI * 1.7;
    setNeedle.setAttribute('x2', String(Math.cos(ta - Math.PI / 2) * (dR - 18)));
    setNeedle.setAttribute('y2', String(Math.sin(ta - Math.PI / 2) * (dR - 18)));
    void ang;
    setLabel.textContent = `SET ${userSet}\u00B0`;
    h.classList.remove('show');
  });

  // ═══ Scrubbed timeline (fast pre-roll) ═══
  const tl = gsap.timeline();
  tl.to(mercury, { attr: { y: 220, height: 35 }, duration: 0.18, ease: EASE.standard })
    .call(() => { tempLabel.textContent = '62\u00b0F'; actLabel.textContent = '62\u00B0'; }, [], 0.06)
    .call(() => { tempLabel.textContent = '59\u00b0F'; actLabel.textContent = '59\u00B0'; }, [], 0.14)
    .to(line1, { opacity: 0.7, duration: 0.06 }, 0.16)
    .call(() => { (statusLED as SVGElement).setAttribute('fill', '#5fd9b0'); }, [], 0.2)
    .to(line2, { opacity: 0.7, duration: 0.06 }, 0.24)
    .to(radGlow, { attr: { opacity: 0.32 }, duration: 0.22, ease: EASE.entrance }, 0.28)
    .to(mercury, { attr: { y: 110, height: 145 }, duration: 0.34, ease: EASE.standard }, 0.32)
    .call(() => { tempLabel.textContent = '64\u00b0F'; actLabel.textContent = '64\u00B0'; }, [], 0.42)
    .call(() => { tempLabel.textContent = '68\u00b0F'; actLabel.textContent = '68\u00B0'; }, [], 0.52)
    .call(() => { tempLabel.textContent = '72\u00b0F'; actLabel.textContent = '72\u00B0'; }, [], 0.62)
    .to(line1, { opacity: 0.3, duration: 0.04 }, 0.66)
    .call(() => { (statusLED as SVGElement).setAttribute('fill', '#444'); }, [], 0.68)
    .to(radGlow, { attr: { opacity: 0 }, duration: 0.18 }, 0.7)
    .to(line2, { opacity: 0, duration: 0.1 }, 0.74)
    .to(line1, { opacity: 0, duration: 0.1 }, 0.78)
    .to(mercury, { attr: { y: 165, height: 90 }, duration: 0.16, ease: EASE.standard }, 0.82)
    .call(() => { tempLabel.textContent = '68\u00b0F'; actLabel.textContent = '68\u00B0'; }, [], 0.94);

  // ═══ Idle: continuous oscillation around userSet ═══
  let lastHeat = 0;
  registerIdle(1, section, (t) => {
    const target = userSet;
    const swing = 4;
    // PWM-like saw wave for room temperature
    const phase = (t * 0.18) % 1;
    const actual = target - swing * 0.5 + Math.sin(phase * Math.PI * 2) * swing * 0.55 + Math.sin(t * 0.08) * 0.6;
    tempLabel.textContent = `${Math.round(actual)}\u00b0F`;
    actLabel.textContent = `${Math.round(actual)}\u00B0`;
    // Mercury height: 50°F → y=240/h=20 ; 86°F → y=70/h=190
    const tNorm = Math.max(0, Math.min(1, (actual - 50) / 36));
    const mh = 20 + tNorm * 170;
    mercury.setAttribute('y', String(260 - mh));
    mercury.setAttribute('height', String(mh));
    // Actual needle on dial
    const ta = -Math.PI * 0.85 + tNorm * Math.PI * 1.7;
    actNeedle.setAttribute('x2', String(Math.cos(ta - Math.PI / 2) * (dR - 22)));
    actNeedle.setAttribute('y2', String(Math.sin(ta - Math.PI / 2) * (dR - 22)));
    // Heat decision
    const heatOn = actual < target - 0.5 ? 1 : actual > target + 0.5 ? 0 : lastHeat;
    lastHeat = heatOn;
    radGlow.setAttribute('opacity', String(heatOn ? 0.28 + Math.sin(t * 4) * 0.05 : 0));
    (statusLED as SVGElement).setAttribute('fill', heatOn ? '#5fd9b0' : '#444');
    line1.setAttribute('opacity', String(0.25 + Math.sin(t * 3) * 0.15));
    line2.setAttribute('opacity', String(heatOn ? 0.4 + Math.sin(t * 3 + 1) * 0.2 : 0.05));
    // Heat shimmer
    if (heatOn) {
      for (let i = 0; i < heatLines.length; i++) {
        const baseY = 25 + i * 50;
        let d = `M 0 ${baseY}`;
        for (let x = 0; x <= 148; x += 8) {
          const yy = baseY + Math.sin(x * 0.06 + t * 2 + i) * 2;
          d += ` L ${x} ${yy}`;
        }
        heatLines[i].setAttribute('d', d);
        heatLines[i].setAttribute('opacity', '0.18');
      }
    } else {
      for (const hl of heatLines) hl.setAttribute('opacity', '0');
    }
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 2 — CRUISE CONTROL
// Anchored car, scrolling road, shifting horizon for hills.
// Speedometer with overshoot. Set vs. actual readout.
// ════════════════════════════════════════════════════════════

function cruiseControl(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[1];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow2', 12);
  addDropShadow(defs, 'shadow2', 4, 4, 0.55);

  // Sky gradient
  const skyG = el('linearGradient', { id: 'skyG2', x1: 0, y1: 0, x2: 0, y2: 1 });
  skyG.appendChild(el('stop', { offset: '0%', 'stop-color': '#0d1129' }));
  skyG.appendChild(el('stop', { offset: '100%', 'stop-color': '#070914' }));
  defs.appendChild(skyG);

  svgBg(svg, '#070914');
  // Sky
  const sky = el('rect', { x: 0, y: 0, width: W, height: 320, fill: 'url(#skyG2)' });
  svg.appendChild(sky);

  // Distant hills (silhouette)
  const hillsBack = el('path', { d: 'M0,300 Q200,260 400,290 T800,275 L800,320 L0,320 Z', fill: '#0c1023', opacity: 0.7 });
  svg.appendChild(hillsBack);
  const hillsMid = el('path', { d: 'M0,310 Q150,285 350,305 T800,300 L800,320 L0,320 Z', fill: '#0e1126' });
  svg.appendChild(hillsMid);

  // Road
  const roadGroup = el('g', {});
  roadGroup.appendChild(el('rect', { x: 0, y: 320, width: W, height: 180, fill: '#101428' }));
  roadGroup.appendChild(el('line', { x1: 0, y1: 320, x2: W, y2: 320, stroke: '#222445', 'stroke-width': 1.5 }));
  roadGroup.appendChild(el('line', { x1: 0, y1: 322, x2: W, y2: 322, stroke: '#0c0e20', 'stroke-width': 1 }));
  // Lane dashes (translatable group)
  const dashG = el('g', {});
  for (let i = -1; i < 14; i++) {
    dashG.appendChild(el('rect', { x: i * 62, y: 415, width: 36, height: 4, rx: 2, fill: '#3a3d65', opacity: 0.6 }));
  }
  roadGroup.appendChild(dashG);
  svg.appendChild(roadGroup);

  // Car
  const carBaseY = 330;
  const carGroup = el('g', { transform: `translate(280, ${carBaseY})`, filter: 'url(#shadow2)' });
  // Car shadow
  carGroup.appendChild(el('ellipse', { cx: 80, cy: 86, rx: 70, ry: 8, fill: 'rgba(0,0,0,0.5)' }));
  // Body lower
  carGroup.appendChild(el('path', { d: 'M0,52 L18,32 L142,32 L160,52 L160,72 L0,72 Z', fill: '#2a2d4d', stroke: '#3a3d65', 'stroke-width': 1 }));
  // Cab/window
  carGroup.appendChild(el('path', { d: 'M22,32 L40,8 L120,8 L138,32 Z', fill: '#161830', stroke: '#3a3d65', 'stroke-width': 1 }));
  // Window glass highlight
  carGroup.appendChild(el('path', { d: 'M28,28 L42,12 L118,12 L132,28 Z', fill: 'rgba(120, 160, 220, 0.18)' }));
  // Wheels
  carGroup.appendChild(el('circle', { cx: 36, cy: 76, r: 13, fill: '#0a0a14', stroke: '#3a3d65', 'stroke-width': 2 }));
  carGroup.appendChild(el('circle', { cx: 124, cy: 76, r: 13, fill: '#0a0a14', stroke: '#3a3d65', 'stroke-width': 2 }));
  carGroup.appendChild(el('circle', { cx: 36, cy: 76, r: 5, fill: '#22264a' }));
  carGroup.appendChild(el('circle', { cx: 124, cy: 76, r: 5, fill: '#22264a' }));
  // Headlight glow
  const headlight = el('rect', { x: 156, y: 44, width: 8, height: 14, rx: 2, fill: '#ffd97a' });
  carGroup.appendChild(headlight);
  carGroup.appendChild(el('ellipse', { cx: 168, cy: 51, rx: 22, ry: 6, fill: '#ffd97a', opacity: 0.18, filter: 'url(#glow2)' }));
  // Engine glow on uphill
  const engineGlow = el('rect', { x: 24, y: 38, width: 100, height: 16, rx: 6, fill: A.fill, opacity: 0, filter: 'url(#glow2)' });
  carGroup.appendChild(engineGlow);
  svg.appendChild(carGroup);

  // ═══ Speedometer ═══
  const spx = 680, spy = 130;
  const sp = el('g', { transform: `translate(${spx}, ${spy})`, filter: 'url(#shadow2)' });
  sp.appendChild(el('circle', { cx: 0, cy: 0, r: 62, fill: 'rgba(0,0,0,0.55)', stroke: '#22264a', 'stroke-width': 1.5 }));
  sp.appendChild(el('circle', { cx: 0, cy: 0, r: 4, fill: '#fff' }));
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI * 0.8 + (i / 10) * Math.PI * 1.6;
    sp.appendChild(el('line', { x1: Math.cos(a) * 48, y1: Math.sin(a) * 48, x2: Math.cos(a) * 56, y2: Math.sin(a) * 56, stroke: i === 0 || i === 10 ? '#5a5e8a' : '#3a3d65', 'stroke-width': i % 2 === 0 ? 1.6 : 1 }));
  }
  // Set marker arc
  const setMarkerA = -Math.PI * 0.8 + 0.65 * Math.PI * 1.6;
  sp.appendChild(el('line', { x1: Math.cos(setMarkerA) * 44, y1: Math.sin(setMarkerA) * 44, x2: Math.cos(setMarkerA) * 58, y2: Math.sin(setMarkerA) * 58, stroke: '#5fd9b0', 'stroke-width': 2.5 }));
  // Needle
  const needle = el('line', { x1: 0, y1: 0, x2: Math.cos(setMarkerA) * 40, y2: Math.sin(setMarkerA) * 40, stroke: A.fill, 'stroke-width': 2.5, 'stroke-linecap': 'round' });
  sp.appendChild(needle);
  sp.appendChild(txt(0, 30, '65', 18, A.ink, 'middle', 'JetBrains Mono, monospace'));
  sp.appendChild(txt(0, 46, 'MPH', 8, '#5a5e8a'));
  svg.appendChild(sp);

  // SET / ACTUAL readout
  svg.appendChild(txt(680, 220, 'SET 65 \u00B7 ACT 65', 10, '#5fd9b0', 'middle', 'JetBrains Mono, monospace'));
  const sa = txt(680, 234, '', 9, A.ink, 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(sa);

  // Hill readout
  const hillLabel = txt(140, 290, '', 12, 'rgba(255,255,255,0.4)', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(hillLabel);

  // Horizon line that shifts on hills
  // Already in skyG; we can shift hillsBack/hillsMid for parallax horizon
  let setSpeed = 65, actualSpeed = 65;
  function setNeedle(speed: number) {
    const t = Math.max(0, Math.min(1, (speed - 0) / 100));
    const a = -Math.PI * 0.8 + t * Math.PI * 1.6;
    needle.setAttribute('x2', String(Math.cos(a) * 40));
    needle.setAttribute('y2', String(Math.sin(a) * 40));
  }

  const tl = gsap.timeline();
  tl.set(hillLabel, { textContent: 'flat road' })
    .to({}, { duration: 0.1 })
    .call(() => { hillLabel.textContent = '\u25b2 uphill \u2014 throttle up'; sa.textContent = '62 mph (closing)'; })
    .to(hillsBack, { attr: { d: 'M0,310 Q200,275 400,295 T800,290 L800,320 L0,320 Z' }, duration: 0.18, ease: EASE.standard }, 0.12)
    .to(hillsMid, { attr: { d: 'M0,316 Q150,290 350,310 T800,310 L800,320 L0,320 Z' }, duration: 0.18, ease: EASE.standard }, 0.12)
    .to(carGroup, { attr: { transform: 'translate(280, 326) rotate(-2.2 80 50)' }, duration: 0.18, ease: EASE.standard }, 0.14)
    .call(() => { setNeedle(58); }, [], 0.18)
    .to(engineGlow, { attr: { opacity: 0.55 }, duration: 0.16 }, 0.18)
    .call(() => { setNeedle(67); }, [], 0.32)  // overshoot
    .call(() => { setNeedle(65); sa.textContent = '65 mph (locked)'; }, [], 0.42)
    .to({}, { duration: 0.05 })
    .call(() => { hillLabel.textContent = '\u25bc downhill \u2014 ease off'; sa.textContent = '68 mph (braking)'; }, [], 0.5)
    .to(hillsBack, { attr: { d: 'M0,295 Q200,255 400,285 T800,265 L800,320 L0,320 Z' }, duration: 0.18, ease: EASE.standard }, 0.5)
    .to(hillsMid, { attr: { d: 'M0,308 Q150,282 350,302 T800,294 L800,320 L0,320 Z' }, duration: 0.18, ease: EASE.standard }, 0.5)
    .to(carGroup, { attr: { transform: 'translate(280, 332) rotate(2.2 80 50)' }, duration: 0.18, ease: EASE.standard }, 0.5)
    .call(() => { setNeedle(70); }, [], 0.55)
    .to(engineGlow, { attr: { opacity: 0 }, duration: 0.14 }, 0.54)
    .call(() => { setNeedle(65); sa.textContent = '65 mph (locked)'; }, [], 0.7)
    .to({}, { duration: 0.05 })
    .call(() => { hillLabel.textContent = 'flat road'; sa.textContent = '65 mph (cruise)'; }, [], 0.84)
    .to(hillsBack, { attr: { d: 'M0,300 Q200,260 400,290 T800,275 L800,320 L0,320 Z' }, duration: 0.16, ease: EASE.standard }, 0.84)
    .to(hillsMid, { attr: { d: 'M0,310 Q150,285 350,305 T800,300 L800,320 L0,320 Z' }, duration: 0.16, ease: EASE.standard }, 0.84)
    .to(carGroup, { attr: { transform: 'translate(280, 330) rotate(0 80 50)' }, duration: 0.14, ease: EASE.standard }, 0.84);

  // ═══ Idle: rolling road, gentle hill cycle ═══
  registerIdle(2, section, (t) => {
    const dx = -((t * 90) % 62);
    dashG.setAttribute('transform', `translate(${dx}, 0)`);
    // Slow hill oscillation
    const hill = Math.sin(t * 0.15);
    actualSpeed = setSpeed - hill * 4 + Math.sin(t * 0.3) * 0.6;
    setNeedle(actualSpeed);
    sa.textContent = `${Math.round(actualSpeed)} mph (cruise)`;
    // Slight horizon sway
    const yShift = hill * 2;
    hillsBack.setAttribute('transform', `translate(0, ${yShift})`);
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 3 — ROOMBA
// Top-down room with proper furniture, time-gradient trail.
// Click anywhere to drop new furniture.
// ════════════════════════════════════════════════════════════

function roomba(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[2];
  const { canvas, ctx } = makeCanvas(container);

  interface Furn { x: number; y: number; w: number; h: number; type: 'sofa' | 'chair' | 'table' | 'box' }
  const furniture: Furn[] = [
    { x: 180, y: 70, w: 130, h: 50, type: 'sofa' },
    { x: 540, y: 290, w: 90, h: 90, type: 'table' },
    { x: 100, y: 290, w: 60, h: 60, type: 'chair' },
    { x: 580, y: 80, w: 100, h: 50, type: 'box' },
  ];

  interface Pos { x: number; y: number; angle: number }
  let path: Pos[] = [];

  function recomputePath(seedX = 400, seedY = 250) {
    path = [];
    let rx = seedX, ry = seedY, ra = Math.random() * Math.PI * 2;
    const rR = 14;
    for (let i = 0; i < 720; i++) {
      const dx = Math.cos(ra) * 3, dy = Math.sin(ra) * 3;
      const nx = rx + dx, ny = ry + dy;
      let bumped = nx - rR < 40 || nx + rR > 760 || ny - rR < 40 || ny + rR > 460;
      if (!bumped) {
        for (const f of furniture) {
          if (nx + rR > f.x && nx - rR < f.x + f.w && ny + rR > f.y && ny - rR < f.y + f.h) { bumped = true; break; }
        }
      }
      if (bumped) ra += Math.PI * (0.3 + Math.random() * 0.9);
      else { rx = nx; ry = ny; ra += 0.018; }
      path.push({ x: rx, y: ry, angle: ra });
    }
  }
  recomputePath();

  const progress = { value: 0 };
  let idleStartLen = 0;
  let extraSteps = 0; // for idle motion past the scrub end

  function drawFurniture(f: Furn) {
    ctx.save();
    ctx.translate(f.x, f.y);
    ctx.fillStyle = '#1c1f3a';
    ctx.strokeStyle = '#2a2e58';
    ctx.lineWidth = 1.2;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    if (f.type === 'sofa') {
      // Couch with backrest and 3 cushions
      ctx.beginPath();
      ctx.roundRect(0, 0, f.w, f.h, 6);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#252850';
      ctx.beginPath(); ctx.roundRect(4, 4, f.w - 8, 12, 3); ctx.fill();
      const cw = (f.w - 14) / 3;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.roundRect(5 + i * (cw + 1), 18, cw, f.h - 22, 4);
        ctx.fill();
      }
    } else if (f.type === 'chair') {
      ctx.beginPath();
      ctx.roundRect(0, 0, f.w, f.h, 5);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#252850';
      ctx.beginPath(); ctx.roundRect(4, 4, f.w - 8, 14, 3); ctx.fill();
    } else if (f.type === 'table') {
      // Round-ish table
      ctx.beginPath();
      ctx.ellipse(f.w / 2, f.h / 2, f.w / 2 - 2, f.h / 2 - 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#3a3d65';
      ctx.beginPath();
      ctx.ellipse(f.w / 2, f.h / 2, f.w / 2 - 8, f.h / 2 - 8, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.roundRect(0, 0, f.w, f.h, 4);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function trailColor(frac: number): string {
    // teal → green
    const r = Math.round(20 + frac * 30);
    const g = Math.round(180 + frac * 25);
    const b = Math.round(180 - frac * 70);
    return `rgba(${r}, ${g}, ${b}, 0.07)`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Floor
    ctx.fillStyle = '#0a0c1a';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#0e1124';
    ctx.fillRect(40, 40, 720, 420);
    // Subtle floor pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.018)';
    ctx.lineWidth = 0.5;
    for (let y = 60; y < 460; y += 40) { ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(760, y); ctx.stroke(); }

    const totalLen = path.length;
    const trailEnd = Math.min(totalLen - 1, Math.floor(progress.value * totalLen) + extraSteps);

    // Cleaned trail (time-colored)
    for (let i = 0; i < trailEnd; i += 2) {
      const frac = i / totalLen;
      ctx.fillStyle = trailColor(frac);
      ctx.beginPath();
      ctx.arc(path[i].x, path[i].y, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    // Recent trail line (brighter)
    const recentStart = Math.max(0, trailEnd - 50);
    ctx.strokeStyle = 'rgba(120, 230, 180, 0.32)';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let i = recentStart; i < trailEnd; i++) {
      if (i === recentStart) ctx.moveTo(path[i].x, path[i].y);
      else ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Furniture
    for (const f of furniture) drawFurniture(f);

    // Walls
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#2a2d55';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 420);

    // Roomba
    if (trailEnd > 0) {
      const pos = path[Math.min(trailEnd - 1, totalLen - 1)];
      ctx.save();
      ctx.translate(pos.x, pos.y);
      // Glow halo
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      grd.addColorStop(0, 'rgba(52, 211, 153, 0.28)');
      grd.addColorStop(1, 'rgba(52, 211, 153, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();
      // Body
      ctx.fillStyle = '#1f2236';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      // Outer ring
      ctx.strokeStyle = A.fill;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();
      // Inner detail (top dish)
      ctx.fillStyle = '#2c3050';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      // Status LED ring
      const ledPulse = 0.6 + 0.4 * Math.sin(progress.value * 30 + extraSteps * 0.05);
      ctx.fillStyle = `rgba(120, 236, 191, ${ledPulse})`;
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fill();
      // Heading dot
      ctx.rotate(pos.angle);
      ctx.fillStyle = A.ink;
      ctx.beginPath();
      ctx.arc(11, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawScanLines(ctx, 0.012);

    // HUD
    const coverage = Math.min(100, Math.round((trailEnd / totalLen) * 96));
    ctx.fillStyle = 'rgba(120, 236, 191, 0.7)';
    ctx.font = 'bold 13px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Coverage: ${coverage}%`, 750, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.32)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`Furniture: ${furniture.length}`, 750, 48);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'none', onComplete: () => { idleStartLen = path.length; } });

  // ═══ Click to drop furniture ═══
  const h = hint(container, 'click to drop furniture');
  showHintAfter(h, 2400);
  canvas.style.cursor = 'crosshair';
  canvas.addEventListener('click', (ev) => {
    const rect = canvas.getBoundingClientRect();
    const x = (ev.clientX - rect.left) * (W / rect.width);
    const y = (ev.clientY - rect.top) * (H / rect.height);
    if (x < 60 || x > 740 || y < 60 || y > 440) return;
    const types: Furn['type'][] = ['chair', 'table', 'box'];
    const t = types[Math.floor(Math.random() * types.length)];
    const w = t === 'table' ? 80 : 60;
    const fh = t === 'table' ? 80 : 60;
    furniture.push({ x: x - w / 2, y: y - fh / 2, w, h: fh, type: t });
    recomputePath(x + 80, y);
    extraSteps = 0;
    h.classList.remove('show');
    draw();
  });

  // ═══ Idle: keep wandering ═══
  registerIdle(3, section, () => {
    extraSteps += 2;
    if (idleStartLen > 0 && extraSteps > path.length * 1.5) {
      extraSteps = Math.floor(path.length * 0.5);
      // re-seed path occasionally for variety
      if (Math.random() < 0.5) {
        const pos = path[path.length - 1];
        recomputePath(pos.x, pos.y);
      }
    }
    draw();
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 4 — DRONE
// Three parallax building layers, drone with rotor shimmer,
// continuous wind particles, GPS readout, occasional bird.
// ════════════════════════════════════════════════════════════

function drone(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[3];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow4', 14);
  addBlur(defs, 'glow4s', 6);
  addDropShadow(defs, 'shadow4', 4, 4, 0.55);
  // Building gradient
  const bg1 = el('linearGradient', { id: 'bldgG1', x1: 0, y1: 0, x2: 0, y2: 1 });
  bg1.appendChild(el('stop', { offset: '0%', 'stop-color': '#0a0c1d' }));
  bg1.appendChild(el('stop', { offset: '100%', 'stop-color': '#0d0f24' }));
  defs.appendChild(bg1);
  const bg2 = el('linearGradient', { id: 'bldgG2', x1: 0, y1: 0, x2: 0, y2: 1 });
  bg2.appendChild(el('stop', { offset: '0%', 'stop-color': '#0d0f25' }));
  bg2.appendChild(el('stop', { offset: '100%', 'stop-color': '#11132c' }));
  defs.appendChild(bg2);
  const bg3 = el('linearGradient', { id: 'bldgG3', x1: 0, y1: 0, x2: 0, y2: 1 });
  bg3.appendChild(el('stop', { offset: '0%', 'stop-color': '#11132e' }));
  bg3.appendChild(el('stop', { offset: '100%', 'stop-color': '#161836' }));
  defs.appendChild(bg3);

  svgBg(svg, '#040610');

  // Layer 3 (far, smallest, darkest)
  const layer3 = el('g', { opacity: 0.85 });
  for (let i = 0; i < 11; i++) {
    const bx = -10 + i * 75 + (i * 13) % 28;
    const bh = 25 + (i * 23) % 50;
    layer3.appendChild(el('rect', { x: bx, y: 380 - bh, width: 22 + (i * 7) % 18, height: bh + 120, fill: 'url(#bldgG1)', rx: 1 }));
  }
  svg.appendChild(layer3);

  // Layer 2 (middle)
  const layer2 = el('g', {});
  for (let i = 0; i < 9; i++) {
    const bx = 20 + i * 95 + (i * 17) % 30;
    const bh = 35 + (i * 37) % 70;
    layer2.appendChild(el('rect', { x: bx, y: 400 - bh, width: 28 + (i * 11) % 24, height: bh + 100, fill: 'url(#bldgG2)', rx: 2 }));
    // Window dots
    for (let r = 0; r < Math.floor(bh / 10); r++) {
      for (let c = 0; c < 3; c++) {
        if ((i + r + c) % 5 === 0) {
          layer2.appendChild(el('rect', { x: bx + 4 + c * 9, y: 400 - bh + 4 + r * 10, width: 3, height: 3, fill: '#3a3d65', opacity: 0.5 }));
        }
      }
    }
  }
  svg.appendChild(layer2);

  // Layer 1 (front, with aviation lights)
  const layer1 = el('g', {});
  for (let i = 0; i < 5; i++) {
    const bx = 60 + i * 175 + (i * 23) % 40;
    const bh = 70 + (i * 41) % 90;
    layer1.appendChild(el('rect', { x: bx, y: 420 - bh, width: 50 + (i * 13) % 28, height: bh + 80, fill: 'url(#bldgG3)', rx: 2 }));
  }
  // Aviation lights (red blinkers)
  const avLights: SVGElement[] = [];
  for (const [lx, ly] of [[180, 350], [430, 332], [600, 360]]) {
    const c = el('circle', { cx: lx, cy: ly, r: 2.5, fill: '#ff6b35', opacity: 0.7 });
    layer1.appendChild(c);
    avLights.push(c);
  }
  svg.appendChild(layer1);

  // Ground
  svg.appendChild(el('rect', { x: 0, y: 460, width: W, height: 40, fill: '#080a18' }));

  // ═══ Drone (3/4 top-down) ═══
  const dg = el('g', { transform: 'translate(370, 200)', filter: 'url(#shadow4)' });
  // Body
  dg.appendChild(el('rect', { x: -32, y: -7, width: 64, height: 14, rx: 4, fill: '#252845', stroke: '#3a3d65', 'stroke-width': 0.8 }));
  dg.appendChild(el('circle', { cx: 0, cy: 0, r: 6, fill: '#1a1d35' }));
  // GPS LED
  dg.appendChild(el('circle', { cx: 0, cy: 0, r: 2, fill: '#22c55e' }));
  // Arms
  dg.appendChild(el('line', { x1: -28, y1: 0, x2: -55, y2: -22, stroke: '#3a3d65', 'stroke-width': 2.5 }));
  dg.appendChild(el('line', { x1: 28, y1: 0, x2: 55, y2: -22, stroke: '#3a3d65', 'stroke-width': 2.5 }));
  dg.appendChild(el('line', { x1: -28, y1: 0, x2: -55, y2: 22, stroke: '#3a3d65', 'stroke-width': 2.5 }));
  dg.appendChild(el('line', { x1: 28, y1: 0, x2: 55, y2: 22, stroke: '#3a3d65', 'stroke-width': 2.5 }));
  // Rotor discs (animated radial gradients)
  const rotors: SVGElement[] = [];
  for (const [rx, ry] of [[-55, -22], [55, -22], [-55, 22], [55, 22]]) {
    const r = el('ellipse', { cx: rx, cy: ry, rx: 17, ry: 4, fill: 'rgba(124, 232, 245, 0.28)' });
    dg.appendChild(r);
    rotors.push(r);
    dg.appendChild(el('circle', { cx: rx, cy: ry, r: 3.5, fill: '#1a1d35', stroke: '#3a3d65', 'stroke-width': 0.6 }));
  }
  svg.appendChild(dg);

  // GPS readout panel (top-left)
  const gpsG = el('g', { transform: 'translate(28, 28)', opacity: 0.85 });
  gpsG.appendChild(el('rect', { x: 0, y: 0, width: 152, height: 50, rx: 4, fill: 'rgba(0,0,0,0.5)', stroke: 'rgba(34, 211, 238, 0.18)', 'stroke-width': 1 }));
  gpsG.appendChild(txt(8, 16, 'GPS LOCK', 9, '#22c55e', 'start', 'JetBrains Mono, monospace'));
  const gpsLat = txt(8, 30, 'lat 37.7749', 9, A.ink, 'start', 'JetBrains Mono, monospace');
  const gpsLon = txt(8, 42, 'lon -122.4194', 9, A.ink, 'start', 'JetBrains Mono, monospace');
  gpsG.appendChild(gpsLat);
  gpsG.appendChild(gpsLon);
  svg.appendChild(gpsG);

  // Wind particles (idle)
  interface WindP { x: number; y: number; vx: number; o: number }
  const winds: WindP[] = [];
  for (let i = 0; i < 12; i++) winds.push({ x: Math.random() * W, y: 100 + Math.random() * 200, vx: 0.5 + Math.random() * 1.2, o: 0.3 + Math.random() * 0.4 });
  const windG = el('g', { opacity: 0 });
  const windNodes: SVGElement[] = [];
  for (const w of winds) {
    const ln = el('line', { x1: w.x, y1: w.y, x2: w.x - 18, y2: w.y, stroke: '#7cd1ff', 'stroke-width': 1, opacity: w.o });
    windG.appendChild(ln);
    windNodes.push(ln);
  }
  svg.appendChild(windG);

  // Bird (obstacle)
  const birdG = el('g', { transform: 'translate(-50, 180)', opacity: 0 });
  birdG.appendChild(el('path', { d: 'M-8,0 Q-2,-5 0,0 Q2,-5 8,0 M-8,0 L0,3 L8,0', fill: 'none', stroke: '#888', 'stroke-width': 1.5, 'stroke-linecap': 'round' }));
  svg.appendChild(birdG);

  const tl = gsap.timeline();
  // Hover with subtle PID jitter
  tl.to(dg, { attr: { transform: 'translate(370, 196)' }, duration: 0.08, ease: EASE.standard })
    .to(dg, { attr: { transform: 'translate(370, 204)' }, duration: 0.08, ease: EASE.standard })
    .to(windG, { attr: { opacity: 0.7 }, duration: 0.05 }, 0.18)
    .to(dg, { attr: { transform: 'translate(415, 208)' }, duration: 0.1, ease: EASE.standard }, 0.2)
    .to(dg, { attr: { transform: 'translate(370, 200)' }, duration: 0.1, ease: EASE.standard }, 0.34)
    .to(windG, { attr: { opacity: 0 }, duration: 0.05 }, 0.44)
    .to(birdG, { attr: { opacity: 1, transform: 'translate(280, 175)' }, duration: 0.1 }, 0.54)
    .to(birdG, { attr: { transform: 'translate(420, 170)' }, duration: 0.18, ease: 'none' }, 0.62)
    .to(dg, { attr: { transform: 'translate(370, 145)' }, duration: 0.12, ease: EASE.standard }, 0.62)
    .to(birdG, { attr: { transform: 'translate(560, 168)' }, duration: 0.15, ease: 'none' }, 0.78)
    .to(birdG, { attr: { opacity: 0 }, duration: 0.06 }, 0.9)
    .to(dg, { attr: { transform: 'translate(370, 200)' }, duration: 0.1, ease: EASE.standard }, 0.88);

  // ═══ Idle: hover jitter + rotors + wind ═══
  let droneX = 370, droneY = 200;
  registerIdle(4, section, (t, dt) => {
    // PID hover jitter
    droneX += (370 - droneX) * 0.08 + (Math.sin(t * 7) - Math.cos(t * 5)) * 0.3;
    droneY += (200 - droneY) * 0.08 + (Math.sin(t * 9) - Math.cos(t * 11)) * 0.25;
    dg.setAttribute('transform', `translate(${droneX.toFixed(2)}, ${droneY.toFixed(2)})`);
    // Rotors shimmer
    for (let i = 0; i < rotors.length; i++) {
      const o = 0.18 + Math.abs(Math.sin(t * 22 + i)) * 0.32;
      rotors[i].setAttribute('fill', `rgba(124, 232, 245, ${o.toFixed(3)})`);
    }
    // Wind continues
    windG.setAttribute('opacity', String(0.35 + Math.sin(t * 0.3) * 0.15));
    for (let i = 0; i < winds.length; i++) {
      winds[i].x += winds[i].vx * dt * 60 * 0.6;
      if (winds[i].x > W + 20) winds[i].x = -20;
      windNodes[i].setAttribute('x1', String(winds[i].x));
      windNodes[i].setAttribute('x2', String(winds[i].x - 18));
    }
    // Aviation lights blink
    for (let i = 0; i < avLights.length; i++) {
      const phase = (t * 1.2 + i * 0.4) % 2;
      avLights[i].setAttribute('opacity', String(phase < 0.15 ? 1 : 0.25));
    }
    // Subtle GPS digit shimmer
    const dec = (Math.floor(t * 100) % 10);
    gpsLat.textContent = `lat 37.774${dec}`;
    gpsLon.textContent = `lon -122.4194`;
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 5 — WAREHOUSE ROBOTS
// Bots with heading triangles, trails, central planner pings.
// ════════════════════════════════════════════════════════════

function warehouse(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[4];
  const { ctx } = makeCanvas(container);
  const gridSize = 38, cols = 19, rows = 11, ox = 35, oy = 35;

  interface WP { x: number; y: number }
  interface Bot { path: WP[]; hl: boolean; col: string; carry: boolean }

  function gp(c: number, r: number): WP { return { x: ox + c * gridSize + gridSize / 2, y: oy + r * gridSize + gridSize / 2 }; }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  const bots: Bot[] = [
    { path: [gp(2, 2), gp(2, 8), gp(10, 8), gp(10, 3), gp(2, 3), gp(2, 2)], hl: true, col: A.fill, carry: true },
    { path: [gp(5, 1), gp(5, 5), gp(12, 5), gp(12, 1)], hl: false, col: '#4a4d75', carry: true },
    { path: [gp(15, 9), gp(15, 4), gp(8, 4), gp(8, 9)], hl: false, col: '#4a4d75', carry: false },
    { path: [gp(17, 2), gp(17, 7), gp(11, 7), gp(11, 2)], hl: false, col: '#4a4d75', carry: true },
    { path: [gp(1, 6), gp(7, 6), gp(7, 1), gp(1, 1)], hl: false, col: '#4a4d75', carry: false },
    { path: [gp(9, 9), gp(15, 9), gp(15, 2), gp(9, 2)], hl: false, col: '#4a4d75', carry: true },
    { path: [gp(3, 4), gp(3, 9), gp(13, 9), gp(13, 4)], hl: false, col: '#4a4d75', carry: false },
    { path: [gp(6, 3), gp(6, 7), gp(16, 7), gp(16, 3)], hl: false, col: '#4a4d75', carry: true },
  ];

  function getPos(bot: Bot, p: number): { x: number; y: number; angle: number } {
    const n = bot.path.length;
    const sf = p * n, si = Math.floor(sf) % n, st = sf - Math.floor(sf);
    const f = bot.path[si], to = bot.path[(si + 1) % n];
    const x = lerp(f.x, to.x, st), y = lerp(f.y, to.y, st);
    const angle = Math.atan2(to.y - f.y, to.x - f.x);
    return { x, y, angle };
  }

  const progress = { value: 0 };
  let idleT = 0;

  function draw(extraT = 0) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#06081a';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(ox + c * gridSize, oy); ctx.lineTo(ox + c * gridSize, oy + rows * gridSize); ctx.stroke(); }
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(ox, oy + r * gridSize); ctx.lineTo(ox + cols * gridSize, oy + r * gridSize); ctx.stroke(); }

    // Shelving
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (const [sc, sr, sw, sh] of [[4,1,2,3],[7,1,2,3],[10,5,2,3],[13,1,2,3],[4,6,2,3]]) {
      ctx.fillRect(ox + sc * gridSize + 3, oy + sr * gridSize + 3, sw * gridSize - 6, sh * gridSize - 6);
    }

    const p = (progress.value + extraT * 0.05) % 1;

    // Highlighted trail
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const pos = getPos(bots[0], i / steps);
      if (i === 0) ctx.moveTo(pos.x, pos.y); else ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Central planner box (top-left)
    const cpx = 14, cpy = 14, cpw = 100, cph = 24;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(cpx, cpy, cpw, cph, 4); ctx.fill(); ctx.stroke();
    ctx.fillStyle = A.ink;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PLANNER', cpx + 8, cpy + 16);
    // Activity dot
    ctx.fillStyle = `rgba(120, 220, 255, ${0.6 + 0.4 * Math.sin(extraT * 5)})`;
    ctx.beginPath();
    ctx.arc(cpx + cpw - 12, cpy + 12, 3, 0, Math.PI * 2);
    ctx.fill();

    for (let bi = 0; bi < bots.length; bi++) {
      const bot = bots[bi];
      const pos = getPos(bot, p);

      // Planner ping line (occasional)
      if (((Math.floor(extraT * 2) + bi) % 7) === 0) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.18)';
        ctx.lineWidth = 0.8;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(cpx + cpw / 2, cpy + cph);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Halo for highlighted bot
      if (bot.hl) {
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 22);
        grd.addColorStop(0, 'rgba(6, 182, 212, 0.32)');
        grd.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      // Body
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = bot.col;
      ctx.fillRect(-7, -7, 14, 14);
      ctx.shadowBlur = 0;
      // Heading triangle
      ctx.rotate(pos.angle);
      ctx.fillStyle = bot.hl ? A.ink : '#7c80a8';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(2, -3);
      ctx.lineTo(2, 3);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Carrying box (orange)
      if (bot.carry) {
        ctx.fillStyle = '#d97a3a';
        ctx.fillRect(pos.x - 4, pos.y - 11, 8, 5);
      }
    }

    drawScanLines(ctx, 0.012);

    ctx.fillStyle = 'rgba(120, 220, 255, 0.7)';
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Active robots: ${bots.length}`, 750, 24);
    ctx.fillStyle = 'rgba(255,255,255,0.36)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText('1,000+ per facility \u00b7 zero-collision design', 750, 42);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: () => draw() });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });

  registerIdle(5, section, (t) => {
    idleT = t;
    draw(idleT);
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 6 — SELF-DRIVING L2
// Detailed cars, L-bracket bounding boxes, steering-wheel
// "human required" icon, uncertainty heatmap on planned path.
// ════════════════════════════════════════════════════════════

function selfDrivingL2(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[5];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  const skyGrad = el('linearGradient', { id: 'sky6', x1: 0, y1: 0, x2: 0, y2: 1 });
  skyGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#181c34' }));
  skyGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#0a0c1a' }));
  defs.appendChild(skyGrad);
  addBlur(defs, 'glow6', 12);
  addDropShadow(defs, 'shadow6', 3, 3, 0.5);

  // Uncertainty gradient for planned path
  const uncG = el('linearGradient', { id: 'uncG', x1: 0, y1: 0, x2: 0, y2: 1 });
  uncG.appendChild(el('stop', { offset: '0%', 'stop-color': A.fill, 'stop-opacity': 0.05 }));
  uncG.appendChild(el('stop', { offset: '100%', 'stop-color': '#5fd9b0', 'stop-opacity': 0.4 }));
  defs.appendChild(uncG);

  svgBg(svg, '#0a0c1a');
  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: 250, fill: 'url(#sky6)' }));
  // Stars
  for (let i = 0; i < 30; i++) {
    svg.appendChild(el('circle', { cx: Math.random() * W, cy: Math.random() * 220, r: 0.7, fill: '#fff', opacity: 0.15 + Math.random() * 0.25 }));
  }
  // Distant city silhouette
  svg.appendChild(el('path', { d: 'M0,250 L40,230 L60,238 L90,220 L120,228 L150,210 L190,220 L220,232 L260,225 L290,235 L800,250 Z', fill: '#0c0e22' }));
  // Road
  svg.appendChild(el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#11132a' }));

  // Lane lines (drawn elements stored for idle animation)
  const laneL = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#252850', 'stroke-width': 2 });
  const laneR = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#252850', 'stroke-width': 2 });
  const laneM = el('g', {});
  for (let i = 0; i < 8; i++) {
    laneM.appendChild(el('rect', { x: 397, y: 270 + i * 32, width: 6, height: 16, rx: 2, fill: '#3a3d65' }));
  }
  svg.appendChild(laneL);
  svg.appendChild(laneR);
  svg.appendChild(laneM);

  // Cars (top-down silhouettes with lights)
  function makeCar(cx: number, cy: number, scale = 1, color = '#252845'): SVGElement {
    const g = el('g', { transform: `translate(${cx}, ${cy}) scale(${scale})`, filter: 'url(#shadow6)' });
    g.appendChild(el('rect', { x: -16, y: -10, width: 32, height: 20, rx: 4, fill: color, stroke: '#3a3d65', 'stroke-width': 0.8 }));
    g.appendChild(el('rect', { x: -10, y: -7, width: 20, height: 8, rx: 2, fill: '#0d0f24' }));
    // Headlights (front = -y direction in screen, but car heading down, so headlights at y=10)
    g.appendChild(el('circle', { cx: -10, cy: 9, r: 1.6, fill: '#ffe07a' }));
    g.appendChild(el('circle', { cx: 10, cy: 9, r: 1.6, fill: '#ffe07a' }));
    return g;
  }
  const cars = [
    { x: 380, y: 290, scale: 0.85 },
    { x: 437, y: 320, scale: 1.0 },
    { x: 330, y: 350, scale: 1.1 },
  ];
  for (const c of cars) svg.appendChild(makeCar(c.x, c.y, c.scale));

  // L-bracket bounding boxes around cars
  function makeBracket(cx: number, cy: number, w: number, h: number): SVGElement {
    const g = el('g', { opacity: 0 });
    const len = Math.min(w, h) * 0.35;
    const t = 1.8;
    const x1 = cx - w / 2, y1 = cy - h / 2, x2 = cx + w / 2, y2 = cy + h / 2;
    const corners = [
      [x1, y1, x1 + len, y1, x1, y1 + len],
      [x2, y1, x2 - len, y1, x2, y1 + len],
      [x1, y2, x1 + len, y2, x1, y2 - len],
      [x2, y2, x2 - len, y2, x2, y2 - len],
    ];
    for (const [px, py, ax, ay, bx, by] of corners) {
      g.appendChild(el('line', { x1: px, y1: py, x2: ax, y2: ay, stroke: A.fill, 'stroke-width': t, 'stroke-linecap': 'round' }));
      g.appendChild(el('line', { x1: px, y1: py, x2: bx, y2: by, stroke: A.fill, 'stroke-width': t, 'stroke-linecap': 'round' }));
    }
    return g;
  }
  const brackets: SVGElement[] = [];
  for (const c of cars) {
    const w = 38 * c.scale, h = 26 * c.scale;
    const b = makeBracket(c.x, c.y, w, h);
    svg.appendChild(b);
    brackets.push(b);
  }

  // Lane outline highlights
  const olL = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: A.fill, 'stroke-width': 2, opacity: 0 });
  const olR = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: A.fill, 'stroke-width': 2, opacity: 0 });
  svg.appendChild(olL);
  svg.appendChild(olR);

  // Planned path with widening uncertainty cone
  const pathCone = el('path', { d: 'M380,500 L420,500 L412,260 L388,260 Z', fill: 'url(#uncG)', opacity: 0 });
  svg.appendChild(pathCone);
  const pathCenter = el('path', { d: 'M400,500 C400,420 395,350 400,260', fill: 'none', stroke: '#5fd9b0', 'stroke-width': 2, 'stroke-dasharray': '6 4', opacity: 0 });
  svg.appendChild(pathCenter);

  // Steering wheel "human required" icon
  const badge = el('g', { transform: 'translate(685, 50)', opacity: 0 });
  badge.appendChild(el('rect', { x: -76, y: -22, width: 152, height: 42, rx: 8, fill: 'rgba(0,0,0,0.5)', stroke: A.fill, 'stroke-width': 1.2 }));
  // Steering wheel icon
  const swG = el('g', { transform: 'translate(-58, 0)' });
  swG.appendChild(el('circle', { cx: 0, cy: 0, r: 11, fill: 'none', stroke: A.fill, 'stroke-width': 1.6 }));
  swG.appendChild(el('circle', { cx: 0, cy: 0, r: 2.5, fill: A.fill }));
  swG.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: -8, stroke: A.fill, 'stroke-width': 1.6 }));
  swG.appendChild(el('line', { x1: 0, y1: 0, x2: -7, y2: 5, stroke: A.fill, 'stroke-width': 1.6 }));
  swG.appendChild(el('line', { x1: 0, y1: 0, x2: 7, y2: 5, stroke: A.fill, 'stroke-width': 1.6 }));
  badge.appendChild(swG);
  badge.appendChild(txt(8, -3, 'HANDS ON', 9, A.ink, 'middle', 'JetBrains Mono, monospace'));
  badge.appendChild(txt(8, 11, 'L2 SUPERVISION', 7, 'rgba(255,255,255,0.45)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(badge);

  const dataLabel = txt(400, 478, '', 10, A.ink, 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(dataLabel);

  const tl = gsap.timeline();
  tl.to({}, { duration: 0.06 })
    .to(brackets, { attr: { opacity: 1 }, duration: 0.1, stagger: 0.04, ease: EASE.entrance }, 0.06)
    .call(() => { dataLabel.textContent = 'detecting vehicles \u2014 3 tracks'; }, [], 0.1)
    .to([olL, olR], { attr: { opacity: 0.85 }, duration: 0.1, stagger: 0.04 }, 0.28)
    .call(() => { dataLabel.textContent = 'tracking lane boundaries'; }, [], 0.34)
    .to(pathCone, { attr: { opacity: 0.85 }, duration: 0.12 }, 0.46)
    .to(pathCenter, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.5)
    .call(() => { dataLabel.textContent = 'path planned \u2014 5s horizon \u2014 monitoring'; }, [], 0.56)
    .to(badge, { opacity: 1, duration: 0.1 }, 0.66);

  // ═══ Idle: lane dashes scroll, brackets pulse subtly ═══
  registerIdle(6, section, (t) => {
    const dy = (t * 90) % 32;
    laneM.setAttribute('transform', `translate(0, ${dy})`);
    // Subtle bracket pulse
    for (const b of brackets) {
      b.setAttribute('opacity', String(0.7 + Math.sin(t * 2) * 0.18));
    }
    // Steering wheel rotation
    swG.setAttribute('transform', `translate(-58, 0) rotate(${Math.sin(t * 0.8) * 12})`);
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 7 — SELF-DRIVING L4
// Concentric LiDAR scan rings, 3D wireframe boxes, agents
// with velocity vectors and probability cones.
// ════════════════════════════════════════════════════════════

function selfDrivingL4(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[6];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow7', 12);
  addDropShadow(defs, 'shadow7', 3, 3, 0.5);

  svgBg(svg, '#0a0c1a');
  // Subtle stars
  for (let i = 0; i < 25; i++) {
    svg.appendChild(el('circle', { cx: Math.random() * W, cy: Math.random() * 200, r: 0.7, fill: '#fff', opacity: 0.1 + Math.random() * 0.2 }));
  }
  // Road
  svg.appendChild(el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#11132a' }));
  // Lane outlines (calm green — the L7 accent)
  svg.appendChild(el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: A.fill, 'stroke-width': 2, opacity: 0.55 }));
  svg.appendChild(el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: A.fill, 'stroke-width': 2, opacity: 0.55 }));
  // Center dashes
  const centerDash = el('g', {});
  for (let i = 0; i < 8; i++) {
    centerDash.appendChild(el('rect', { x: 397, y: 270 + i * 32, width: 6, height: 16, rx: 2, fill: '#3a3d65' }));
  }
  svg.appendChild(centerDash);

  // Ego vehicle (where LiDAR scans from)
  const egoX = 400, egoY = 470;
  const ego = el('g', { transform: `translate(${egoX}, ${egoY})`, filter: 'url(#shadow7)' });
  ego.appendChild(el('rect', { x: -18, y: -12, width: 36, height: 22, rx: 4, fill: '#252845', stroke: '#3a3d65', 'stroke-width': 0.8 }));
  ego.appendChild(el('rect', { x: -12, y: -8, width: 24, height: 9, rx: 2, fill: '#0d0f24' }));
  ego.appendChild(el('circle', { cx: -10, cy: -10, r: 1.6, fill: '#ffe07a' }));
  ego.appendChild(el('circle', { cx: 10, cy: -10, r: 1.6, fill: '#ffe07a' }));
  // LiDAR mast
  ego.appendChild(el('rect', { x: -3, y: -16, width: 6, height: 6, rx: 1, fill: '#5fd9b0' }));
  svg.appendChild(ego);

  // ═══ LiDAR scan rings (concentric) ═══
  const lidarG = el('g', { opacity: 0, transform: `translate(${egoX}, ${egoY - 13})` });
  for (let r = 30; r <= 220; r += 22) {
    lidarG.appendChild(el('circle', { cx: 0, cy: 0, r, fill: 'none', stroke: '#a78bfa', 'stroke-width': 0.6, opacity: 0.18 }));
  }
  // Sample LiDAR returns (where rings hit objects)
  for (let i = 0; i < 60; i++) {
    const a = -Math.PI + Math.random() * Math.PI;
    const r = 30 + Math.random() * 200;
    lidarG.appendChild(el('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r * 0.7, r: 1.1, fill: '#c4b5fd', opacity: 0.35 + Math.random() * 0.5 }));
  }
  svg.appendChild(lidarG);

  // ═══ Detected agents — cars ═══
  function makeWireBox(cx: number, cy: number, w: number, h: number, depth = 6): SVGElement {
    const g = el('g', { opacity: 0 });
    // Front face
    g.appendChild(el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, fill: 'none', stroke: A.fill, 'stroke-width': 1.4 }));
    // Back face (offset for 3D)
    g.appendChild(el('rect', { x: cx - w / 2 + depth, y: cy - h / 2 - depth, width: w, height: h, fill: 'none', stroke: A.fill, 'stroke-width': 1.0, opacity: 0.65 }));
    // Connecting edges
    for (const [dx, dy] of [[-w / 2, -h / 2], [w / 2, -h / 2], [-w / 2, h / 2], [w / 2, h / 2]]) {
      g.appendChild(el('line', { x1: cx + dx, y1: cy + dy, x2: cx + dx + depth, y2: cy + dy - depth, stroke: A.fill, 'stroke-width': 0.9, opacity: 0.65 }));
    }
    return g;
  }

  const otherCars = [
    { x: 380, y: 290, w: 30, h: 20, sx: 365, sy: 280, sw: 30, sh: 20 },
    { x: 437, y: 320, w: 35, h: 22, sx: 420, sy: 310, sw: 35, sh: 22 },
  ];
  for (const c of otherCars) {
    svg.appendChild(el('rect', { x: c.sx, y: c.sy, width: c.sw, height: c.sh, rx: 3, fill: '#252845', stroke: '#3a3d65', 'stroke-width': 0.8 }));
  }
  const carBoxes = otherCars.map((c) => {
    const b = makeWireBox(c.x, c.y, c.w + 6, c.h + 6);
    svg.appendChild(b);
    return b;
  });

  // ═══ Pedestrian — top-down silhouette + velocity vector + probability cone ═══
  const pedX = 280, pedY = 360;
  // Cone (probability fan, widening forward)
  const pedCone = el('polygon', { points: `${pedX},${pedY} ${pedX - 25},${pedY - 50} ${pedX + 25},${pedY - 50}`, fill: 'rgba(251, 191, 36, 0.1)', stroke: '#fbbf24', 'stroke-width': 0.8, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(pedCone);
  // Pedestrian (top-down: oval body)
  const pedG = el('g', { transform: `translate(${pedX}, ${pedY})`, filter: 'url(#shadow7)' });
  pedG.appendChild(el('ellipse', { cx: 0, cy: 0, rx: 5, ry: 7, fill: '#aaa' }));
  pedG.appendChild(el('circle', { cx: 0, cy: -3, r: 3.5, fill: '#ddd' }));
  svg.appendChild(pedG);
  // Velocity arrow
  const pedArrow = el('g', { opacity: 0 });
  pedArrow.appendChild(el('line', { x1: pedX, y1: pedY - 8, x2: pedX, y2: pedY - 28, stroke: '#fbbf24', 'stroke-width': 1.5, 'stroke-linecap': 'round' }));
  pedArrow.appendChild(el('polygon', { points: `${pedX - 3},${pedY - 25} ${pedX},${pedY - 30} ${pedX + 3},${pedY - 25}`, fill: '#fbbf24' }));
  svg.appendChild(pedArrow);

  // ═══ Cyclist ═══
  const cyX = 510, cyY = 380;
  const cyCone = el('polygon', { points: `${cyX},${cyY} ${cyX - 20},${cyY - 70} ${cyX + 20},${cyY - 70}`, fill: 'rgba(34, 211, 238, 0.1)', stroke: '#22d3ee', 'stroke-width': 0.8, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(cyCone);
  const cyG = el('g', { transform: `translate(${cyX}, ${cyY})`, opacity: 0, filter: 'url(#shadow7)' });
  cyG.appendChild(el('ellipse', { cx: 0, cy: 0, rx: 4, ry: 8, fill: '#888' }));
  cyG.appendChild(el('circle', { cx: 0, cy: -10, r: 3, fill: '#bbb' }));
  cyG.appendChild(el('circle', { cx: 0, cy: 0, r: 12, fill: 'none', stroke: '#666', 'stroke-width': 0.8 }));
  svg.appendChild(cyG);

  // ═══ Status pill (calm) ═══
  const pill = el('g', { transform: 'translate(685, 50)', opacity: 0 });
  pill.appendChild(el('rect', { x: -82, y: -19, width: 164, height: 38, rx: 8, fill: 'rgba(16, 185, 129, 0.18)', stroke: A.fill, 'stroke-width': 1 }));
  pill.appendChild(el('circle', { cx: -64, cy: 0, r: 5, fill: A.fill }));
  pill.appendChild(txt(2, -3, 'L4 AUTONOMOUS', 9, A.ink, 'middle', 'JetBrains Mono, monospace'));
  pill.appendChild(txt(2, 10, 'no driver \u00b7 geofenced', 7, 'rgba(255,255,255,0.5)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(pill);

  const dataLabel = txt(400, 488, '', 10, A.ink, 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(dataLabel);

  const tl = gsap.timeline();
  tl.to(lidarG, { attr: { opacity: 0.6 }, duration: 0.16 }, 0.06)
    .call(() => { dataLabel.textContent = 'lidar scan \u00b7 360\u00B0 \u00b7 10 ms'; }, [], 0.1)
    .to(carBoxes, { attr: { opacity: 1 }, duration: 0.1, stagger: 0.05, ease: EASE.entrance }, 0.22)
    .call(() => { dataLabel.textContent = 'tracking 4 agents \u00b7 8s prediction'; }, [], 0.34)
    .to(pedArrow, { attr: { opacity: 1 }, duration: 0.08 }, 0.46)
    .to(pedCone, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.5)
    .to(cyG, { attr: { opacity: 1 }, duration: 0.08 }, 0.6)
    .to(cyCone, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.66)
    .to(pill, { attr: { opacity: 1 }, duration: 0.1 }, 0.78);

  // ═══ Click on a detected agent to highlight trajectory ═══
  const h = hint(container, 'click an agent to inspect');
  showHintAfter(h, 2400);
  function makeInspector(target: SVGElement, label: string) {
    target.style.cursor = 'pointer';
    target.style.pointerEvents = 'all';
    target.addEventListener('click', () => {
      dataLabel.textContent = label;
      gsap.to(target, { attr: { opacity: 0.4 }, duration: 0.15, yoyo: true, repeat: 1 });
      h.classList.remove('show');
    });
  }
  makeInspector(pedG, 'pedestrian \u00b7 1.2 m/s N \u00b7 P(cross)=0.62');
  makeInspector(cyG, 'cyclist \u00b7 5.8 m/s NW \u00b7 P(turn)=0.18');
  for (let i = 0; i < otherCars.length; i++) {
    makeInspector(carBoxes[i], `vehicle ${i + 1} \u00b7 12 m/s S \u00b7 lane-keep`);
  }

  // ═══ Idle: scan rings expand, agents drift, dashes scroll ═══
  registerIdle(7, section, (t) => {
    const scale = 1 + Math.sin(t * 0.8) * 0.04;
    lidarG.setAttribute('transform', `translate(${egoX}, ${egoY - 13}) scale(${scale.toFixed(3)})`);
    lidarG.setAttribute('opacity', String(0.45 + Math.sin(t * 1.1) * 0.1));
    // Pedestrian sway
    pedG.setAttribute('transform', `translate(${pedX + Math.sin(t * 0.7) * 4}, ${pedY + Math.sin(t * 0.5) * 2})`);
    // Center dashes scroll
    const dy = (t * 90) % 32;
    centerDash.setAttribute('transform', `translate(0, ${dy})`);
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 8 — SURGICAL ROBOT
// Articulated arms with joints, visible suture, larger tremor
// inset with axes, 5:1 motion-scaling caption.
// ════════════════════════════════════════════════════════════

function surgicalRobot(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[7];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'opGlow', 28);
  addDropShadow(defs, 'shadow8', 3, 3, 0.5);

  // Tissue gradient
  const tissueG = el('radialGradient', { id: 'tissueG', cx: '50%', cy: '50%', r: '60%' });
  tissueG.appendChild(el('stop', { offset: '0%', 'stop-color': '#3d1820' }));
  tissueG.appendChild(el('stop', { offset: '100%', 'stop-color': '#1a0a14' }));
  defs.appendChild(tissueG);

  svgBg(svg, '#070918');

  // Operating field glow + tissue
  svg.appendChild(el('ellipse', { cx: 400, cy: 320, rx: 150, ry: 56, fill: A.fill, opacity: 0.06, filter: 'url(#opGlow)' }));
  svg.appendChild(el('ellipse', { cx: 400, cy: 320, rx: 118, ry: 42, fill: 'url(#tissueG)', stroke: '#2a1530', 'stroke-width': 1 }));
  // Surgical incision line
  svg.appendChild(el('path', { d: 'M340,320 Q360,318 400,320 Q440,322 460,320', fill: 'none', stroke: '#a8334a', 'stroke-width': 1.4 }));

  // Sutures (curved knot path)
  const sutures = el('g', { opacity: 0, filter: 'url(#shadow8)' });
  for (let i = 0; i < 7; i++) {
    const sx = 348 + i * 17;
    const sutG = el('g', {});
    // Stitch line crossing the incision
    sutG.appendChild(el('path', { d: `M${sx - 2},313 Q${sx + 2},320 ${sx + 4},327`, fill: 'none', stroke: A.ink, 'stroke-width': 1.6, 'stroke-linecap': 'round' }));
    // Knot
    sutG.appendChild(el('circle', { cx: sx + 2, cy: 320, r: 1.6, fill: A.fill }));
    sutures.appendChild(sutG);
  }
  svg.appendChild(sutures);

  // ═══ Robot arms with joints ═══
  function makeArm(tx: number, mirror: boolean): { g: SVGElement; tip: SVGElement } {
    const g = el('g', { transform: `translate(${tx}, 80)`, filter: 'url(#shadow8)' });
    // Mount
    g.appendChild(el('rect', { x: -14, y: -10, width: 28, height: 12, rx: 3, fill: '#1c1f3a', stroke: '#3a3d65', 'stroke-width': 0.8 }));
    // Upper segment
    g.appendChild(el('rect', { x: -6, y: 0, width: 12, height: 88, rx: 5, fill: '#252845', stroke: '#3a3d65', 'stroke-width': 0.8 }));
    // Joint
    g.appendChild(el('circle', { cx: 0, cy: 88, r: 9, fill: '#1c1f3a', stroke: '#5a5e8a', 'stroke-width': 1 }));
    g.appendChild(el('circle', { cx: 0, cy: 88, r: 4, fill: A.fill }));
    // Lower segment (slightly angled inward toward field)
    const angle = mirror ? -8 : 8;
    g.appendChild(el('g', { transform: `rotate(${angle} 0 88)` }));
    const lower = el('g', { transform: `rotate(${angle} 0 88)` });
    lower.appendChild(el('rect', { x: -5, y: 88, width: 10, height: 88, rx: 4, fill: '#1c1f3a', stroke: '#3a3d65', 'stroke-width': 0.8 }));
    // Wrist joint
    lower.appendChild(el('circle', { cx: 0, cy: 176, r: 7, fill: '#1c1f3a', stroke: '#5a5e8a', 'stroke-width': 0.8 }));
    lower.appendChild(el('circle', { cx: 0, cy: 176, r: 3, fill: A.fill }));
    // Tool tips (forceps)
    const tip = el('g', {});
    tip.appendChild(el('line', { x1: -3, y1: 176, x2: -8, y2: 198, stroke: A.fill, 'stroke-width': 1.5 }));
    tip.appendChild(el('line', { x1: 3, y1: 176, x2: 8, y2: 198, stroke: A.fill, 'stroke-width': 1.5 }));
    lower.appendChild(tip);
    g.appendChild(lower);
    return { g, tip };
  }

  const arm1 = makeArm(260, false);
  const arm2 = makeArm(540, true);
  svg.appendChild(arm1.g);
  svg.appendChild(arm2.g);

  // ═══ Tremor inset (larger) ═══
  const inset = el('g', { transform: 'translate(40, 30)', opacity: 0 });
  inset.appendChild(el('rect', { x: 0, y: 0, width: 250, height: 130, rx: 8, fill: 'rgba(0,0,0,0.6)', stroke: '#22264a', 'stroke-width': 1 }));
  inset.appendChild(txt(125, 18, 'TREMOR FILTER \u00b7 1,000 Hz', 10, A.ink, 'middle', 'JetBrains Mono, monospace'));
  // Axes
  inset.appendChild(el('line', { x1: 22, y1: 110, x2: 232, y2: 110, stroke: '#3a3d65', 'stroke-width': 0.8 }));
  inset.appendChild(el('line', { x1: 22, y1: 30, x2: 22, y2: 110, stroke: '#3a3d65', 'stroke-width': 0.8 }));
  inset.appendChild(txt(125, 124, 'time \u2192', 8, '#5a5e8a', 'middle', 'JetBrains Mono, monospace'));
  inset.appendChild(txt(8, 70, '\u00b1 mm', 8, '#5a5e8a', 'middle', 'JetBrains Mono, monospace'));
  // Surgeon trace (jittery)
  let hp = 'M22,68';
  for (let i = 1; i <= 42; i++) hp += ` L${22 + i * 5},${68 + Math.sin(i * 1.1) * 12 + Math.sin(i * 4.2) * 4 + (Math.random() - 0.5) * 3}`;
  inset.appendChild(el('path', { d: hp, fill: 'none', stroke: '#ff8055', 'stroke-width': 1.4, opacity: 0.85 }));
  inset.appendChild(txt(28, 44, 'surgeon', 9, '#ff8055', 'start', 'JetBrains Mono, monospace'));
  // Robot trace (smooth)
  let rp = 'M22,68';
  for (let i = 1; i <= 42; i++) rp += ` L${22 + i * 5},${68 + Math.sin(i * 0.5) * 1.5}`;
  const rPath = el('path', { d: rp, fill: 'none', stroke: A.fill, 'stroke-width': 1.6 });
  inset.appendChild(rPath);
  inset.appendChild(txt(150, 88, 'robot', 9, A.fill, 'start', 'JetBrains Mono, monospace'));
  svg.appendChild(inset);

  // ═══ 5:1 scaling caption ═══
  const scaleCap = el('g', { transform: 'translate(620, 410)', opacity: 0 });
  scaleCap.appendChild(el('rect', { x: -90, y: -28, width: 180, height: 56, rx: 8, fill: 'rgba(0,0,0,0.55)', stroke: '#22264a', 'stroke-width': 1 }));
  scaleCap.appendChild(txt(0, -10, '5:1 motion scaling', 10, A.ink, 'middle', 'JetBrains Mono, monospace'));
  // Long bar (surgeon hand)
  scaleCap.appendChild(el('rect', { x: -78, y: 4, width: 50, height: 6, rx: 1.5, fill: '#ff8055' }));
  scaleCap.appendChild(txt(-53, 22, 'hand 5cm', 7, '#ff8055', 'middle', 'JetBrains Mono, monospace'));
  // Short bar (tool)
  scaleCap.appendChild(el('rect', { x: 28, y: 4, width: 10, height: 6, rx: 1.5, fill: A.fill }));
  scaleCap.appendChild(txt(33, 22, 'tool 1cm', 7, A.fill, 'middle', 'JetBrains Mono, monospace'));
  // Arrow
  scaleCap.appendChild(el('path', { d: 'M-26,7 L20,7 M14,3 L20,7 L14,11', fill: 'none', stroke: '#888', 'stroke-width': 1 }));
  svg.appendChild(scaleCap);

  // Magnification ring
  const magRing = el('circle', { cx: 400, cy: 320, r: 60, fill: 'none', stroke: 'rgba(96, 165, 250, 0.35)', 'stroke-width': 1.2, 'stroke-dasharray': '4 5', opacity: 0 });
  svg.appendChild(magRing);
  const magLabel = txt(400, 396, '10\u00d7 STEREO MAGNIFICATION', 9, A.ink, 'middle', 'JetBrains Mono, monospace');
  magLabel.setAttribute('opacity', '0');
  svg.appendChild(magLabel);

  const tl = gsap.timeline();
  tl.to(arm1.g, { attr: { transform: 'translate(320, 100)' }, duration: 0.18, ease: EASE.standard }, 0)
    .to(arm2.g, { attr: { transform: 'translate(480, 100)' }, duration: 0.18, ease: EASE.standard }, 0)
    .to(magRing, { attr: { opacity: 1 }, duration: 0.08 }, 0.2)
    .to(magLabel, { attr: { opacity: 1 }, duration: 0.08 }, 0.2)
    .to(arm2.g, { attr: { transform: 'translate(470, 95)' }, duration: 0.12, ease: EASE.standard }, 0.32)
    .to(arm2.g, { attr: { transform: 'translate(490, 102)' }, duration: 0.12, ease: EASE.standard }, 0.46)
    .to(sutures, { attr: { opacity: 1 }, duration: 0.14 }, 0.42)
    .to(inset, { attr: { opacity: 1 }, duration: 0.12 }, 0.6)
    .to(scaleCap, { attr: { opacity: 1 }, duration: 0.12 }, 0.74);

  // ═══ Idle: arms continue micro-suturing, robot trace slowly redraws ═══
  let baseT = 0;
  registerIdle(8, section, (t) => {
    baseT = t;
    const dx1 = Math.sin(t * 1.4) * 4;
    const dy1 = Math.sin(t * 0.9) * 2;
    arm1.g.setAttribute('transform', `translate(${320 + dx1}, ${100 + dy1})`);
    arm2.g.setAttribute('transform', `translate(${480 - dx1}, ${100 - dy1})`);
    // Slowly add jitter to surgeon path
    let hp2 = 'M22,68';
    for (let i = 1; i <= 42; i++) {
      hp2 += ` L${22 + i * 5},${68 + Math.sin(i * 1.1 + t) * 12 + Math.sin(i * 4.2 + t * 0.6) * 4}`;
    }
    void hp2;
    void baseT;
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 9 — MARS ROVER
// Layered Mars terrain, more rover detail, GSAP-based countdown
// (no setInterval), continuous Earth pulse and signal pulse.
// ════════════════════════════════════════════════════════════

function marsRover(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[8];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  // Mars sky gradient
  const mg = el('linearGradient', { id: 'marsG', x1: 0, y1: 0, x2: 0, y2: 1 });
  mg.appendChild(el('stop', { offset: '0%', 'stop-color': '#2a0a02' }));
  mg.appendChild(el('stop', { offset: '60%', 'stop-color': '#3a1408' }));
  mg.appendChild(el('stop', { offset: '100%', 'stop-color': '#1a0500' }));
  defs.appendChild(mg);
  addBlur(defs, 'marsGlow', 14);
  addDropShadow(defs, 'shadowM', 3, 3, 0.6);

  // Surface noise pattern
  const pat = el('pattern', { id: 'marsTex', width: 12, height: 12, patternUnits: 'userSpaceOnUse' });
  pat.appendChild(el('rect', { x: 0, y: 0, width: 12, height: 12, fill: '#3d1a0a' }));
  pat.appendChild(el('circle', { cx: 3, cy: 5, r: 1.2, fill: '#4a2010', opacity: 0.5 }));
  pat.appendChild(el('circle', { cx: 9, cy: 9, r: 0.9, fill: '#2a1004', opacity: 0.6 }));
  pat.appendChild(el('circle', { cx: 7, cy: 2, r: 0.6, fill: '#5a2410', opacity: 0.4 }));
  defs.appendChild(pat);

  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#marsG)' }));

  // Distant mountains
  svg.appendChild(el('path', { d: 'M0,330 L120,295 L180,310 L260,278 L340,300 L430,272 L520,302 L620,285 L720,308 L800,292 L800,360 L0,360 Z', fill: '#2a0e04', opacity: 0.9 }));
  // Mid mountains
  svg.appendChild(el('path', { d: 'M0,348 L80,320 L160,340 L240,316 L320,338 L400,320 L490,344 L580,326 L670,346 L800,330 L800,370 L0,370 Z', fill: '#341210' }));
  // Near terrain (textured)
  svg.appendChild(el('path', { d: 'M0,372 Q120,360 240,374 Q360,390 480,372 Q600,358 720,374 L800,378 L800,500 L0,500 Z', fill: 'url(#marsTex)' }));
  // Rocks
  for (const [cx, cy, rx, ry] of [[120, 388, 16, 8], [580, 376, 13, 6], [420, 384, 9, 5], [700, 380, 11, 6], [300, 386, 7, 4], [220, 410, 14, 6], [510, 420, 10, 5]]) {
    svg.appendChild(el('ellipse', { cx, cy, rx, ry, fill: '#4a1f0a', stroke: '#5a2410', 'stroke-width': 0.6 }));
  }

  // ═══ Rover (more detailed Perseverance-ish) ═══
  const rover = el('g', { transform: 'translate(250, 354)', filter: 'url(#shadowM)' });
  // Body
  rover.appendChild(el('rect', { x: -28, y: -22, width: 56, height: 18, rx: 4, fill: '#888', stroke: '#aaa', 'stroke-width': 0.6 }));
  // Solar/RTG knob
  rover.appendChild(el('rect', { x: -18, y: -28, width: 36, height: 6, rx: 1, fill: '#1e40af', stroke: '#2563eb', 'stroke-width': 0.5 }));
  // SuperCam mast
  rover.appendChild(el('line', { x1: -2, y1: -22, x2: -2, y2: -46, stroke: '#999', 'stroke-width': 1.6 }));
  // Mast head (sensor array)
  rover.appendChild(el('rect', { x: -10, y: -52, width: 18, height: 8, rx: 1.5, fill: '#aaa' }));
  rover.appendChild(el('circle', { cx: -3, cy: -48, r: 2.2, fill: A.fill }));
  rover.appendChild(el('circle', { cx: 4, cy: -48, r: 1.8, fill: '#444' }));
  // Sample tube cache
  rover.appendChild(el('rect', { x: 16, y: -8, width: 12, height: 8, rx: 1, fill: '#5a5a5a' }));
  // Wheels (6)
  for (const wx of [-22, -8, 6, 20]) {
    rover.appendChild(el('circle', { cx: wx, cy: 4, r: 6, fill: '#444', stroke: '#666', 'stroke-width': 1 }));
    rover.appendChild(el('circle', { cx: wx, cy: 4, r: 2.5, fill: '#222' }));
  }
  // Robotic arm folded
  rover.appendChild(el('path', { d: 'M-28,-12 L-42,-2 L-44,12', fill: 'none', stroke: '#888', 'stroke-width': 2, 'stroke-linecap': 'round' }));
  rover.appendChild(el('circle', { cx: -44, cy: 12, r: 2, fill: A.fill }));
  svg.appendChild(rover);

  // ═══ Signal elements ═══
  const sigPulses: SVGElement[] = [];
  const sigGroup = el('g', { opacity: 0 });
  sigGroup.appendChild(el('circle', { cx: 250, cy: 320, r: 3, fill: A.fill }));
  for (let i = 1; i <= 4; i++) {
    const c = el('circle', { cx: 250, cy: 320, r: 2 + i * 4, fill: 'none', stroke: A.fill, 'stroke-width': 0.8, opacity: 1 - i * 0.18 });
    sigGroup.appendChild(c);
    sigPulses.push(c);
  }
  svg.appendChild(sigGroup);

  const sigLine = el('line', { x1: 250, y1: 318, x2: 250, y2: 30, stroke: A.fill, 'stroke-width': 0.8, 'stroke-dasharray': '3 4', opacity: 0 });
  svg.appendChild(sigLine);

  const earthDot = el('circle', { cx: 250, cy: 28, r: 5, fill: '#3b82f6', opacity: 0 });
  svg.appendChild(earthDot);
  const earthGlow = el('circle', { cx: 250, cy: 28, r: 9, fill: 'none', stroke: '#3b82f6', 'stroke-width': 0.6, opacity: 0 });
  svg.appendChild(earthGlow);
  const earthLbl = txt(250, 14, 'EARTH', 8, '#3b82f6', 'middle', 'JetBrains Mono, monospace');
  earthLbl.setAttribute('opacity', '0');
  svg.appendChild(earthLbl);

  // Random signal delay for this session
  const delayMin = 4 + Math.floor(Math.random() * 20);
  const delaySec = Math.floor(Math.random() * 60);
  const cdText = txt(680, 50, '', 13, A.fill, 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(cdText);
  const statusText = txt(400, 478, '', 10, A.ink, 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(statusText);

  // ═══ Send-command button ═══
  const btn = el('g', { transform: 'translate(680, 432)', opacity: 0 });
  const btnBg = el('rect', { x: -68, y: -16, width: 136, height: 32, rx: 6, fill: 'rgba(249, 115, 22, 0.14)', stroke: A.fill, 'stroke-width': 1.2 });
  btn.appendChild(btnBg);
  btn.appendChild(txt(0, 5, 'SEND COMMAND', 10, A.fill, 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(btn);

  let sent = false;
  btn.style.cursor = 'pointer';
  (btn as SVGElement).style.pointerEvents = 'all';
  btn.addEventListener('mouseenter', () => {
    if (!sent) gsap.to(btnBg, { attr: { fill: 'rgba(249, 115, 22, 0.3)' }, duration: 0.2 });
  });
  btn.addEventListener('mouseleave', () => {
    if (!sent) gsap.to(btnBg, { attr: { fill: 'rgba(249, 115, 22, 0.14)' }, duration: 0.2 });
  });

  btn.addEventListener('click', () => {
    if (sent) return;
    sent = true;
    (btn as SVGElement).style.pointerEvents = 'none';
    gsap.to(btnBg, { attr: { opacity: 0.3 }, duration: 0.3 });

    const totalSec = delayMin * 60 + delaySec;
    const ctl = gsap.timeline();
    ctl.call(() => { statusText.textContent = 'transmitting command\u2026'; })
      .to(sigGroup, { opacity: 1, duration: 0.3 })
      // GSAP-driven countdown (frame-synced)
      .to({ s: totalSec }, {
        s: 0,
        duration: 2.4,
        ease: 'power1.in',
        onUpdate() {
          const v = (this as { targets: () => { s: number }[] }).targets()[0].s;
          const m = Math.floor(v / 60);
          const s = Math.floor(v % 60);
          cdText.textContent = `${m}m ${String(s).padStart(2, '0')}s`;
        },
      })
      .call(() => {
        cdText.textContent = 'received';
        statusText.textContent = 'executing: DRIVE_FORWARD 1 m';
      })
      .to(rover, { attr: { transform: 'translate(330, 354)' }, duration: 1.6, ease: EASE.standard });
  });

  const tl = gsap.timeline();
  tl.call(() => { statusText.textContent = 'Perseverance \u00b7 Sol\u00a01,547 \u00b7 Jezero Crater'; })
    .to(earthDot, { attr: { opacity: 0.85 }, duration: 0.08 }, 0.1)
    .to(earthGlow, { attr: { opacity: 0.5 }, duration: 0.08 }, 0.1)
    .to(earthLbl, { attr: { opacity: 0.55 }, duration: 0.08 }, 0.1)
    .to(sigLine, { attr: { opacity: 0.28 }, duration: 0.1 }, 0.22)
    .to(btn, { attr: { opacity: 1 }, duration: 0.1 }, 0.3)
    .call(() => { if (!sent) statusText.textContent = `signal delay: ${delayMin}m ${delaySec}s one-way`; }, [], 0.5)
    .to(sigGroup, { opacity: 1, duration: 0.04 }, 0.6)
    .call(() => { if (!sent) { cdText.textContent = `${delayMin}m ${delaySec}s`; } }, [], 0.6);

  // ═══ Idle: pulsing Earth, expanding signal pulses, rover micro-twitch ═══
  registerIdle(9, section, (t) => {
    earthGlow.setAttribute('r', String(8 + Math.sin(t * 1.2) * 3));
    earthGlow.setAttribute('opacity', String(0.3 + Math.abs(Math.sin(t * 1.2)) * 0.4));
    // Signal pulses expand and reset
    for (let i = 0; i < sigPulses.length; i++) {
      const phase = ((t * 0.6) + i * 0.22) % 1;
      sigPulses[i].setAttribute('r', String(2 + phase * 18));
      sigPulses[i].setAttribute('opacity', String((1 - phase) * 0.5));
    }
    // Rover wheel micro-rotation? rover sway
    if (!sent) {
      const sway = Math.sin(t * 0.3) * 0.4;
      rover.setAttribute('transform', `translate(${250 + sway}, 354)`);
    }
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 10 — STARLINK
// Earth with cloud noise, satellites with motion trails,
// laser flashes, debris with dodge maneuver.
// ════════════════════════════════════════════════════════════

function starlink(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[9];
  const { ctx } = makeCanvas(container);
  const ecx = 400, ecy = 360, eR = 110;

  interface Sat { oR: number; a: number; spd: number; tilt: number; trail: { x: number; y: number }[] }
  const maxS = 420;
  const sats: Sat[] = [];
  for (let i = 0; i < maxS; i++) {
    sats.push({
      oR: eR + 20 + Math.random() * 110,
      a: Math.random() * Math.PI * 2,
      spd: (0.25 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
      tilt: 0.35 + Math.random() * 0.25,
      trail: [],
    });
  }

  // Debris (red dots)
  interface Deb { oR: number; a: number; spd: number; tilt: number }
  const debris: Deb[] = [];
  for (let i = 0; i < 8; i++) {
    debris.push({ oR: eR + 35 + Math.random() * 90, a: Math.random() * Math.PI * 2, spd: (0.4 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1), tilt: 0.3 + Math.random() * 0.25 });
  }

  // Stars (deterministic)
  const bgStars: [number, number, number][] = [];
  let seed = 42;
  function rseed() { seed = (seed * 16807) % 2147483647; return seed; }
  for (let i = 0; i < 110; i++) {
    bgStars.push([rseed() % W, rseed() % H, 0.08 + (rseed() % 30) / 120]);
  }

  // Cloud noise points (offscreen pre-render to a tiny canvas? simpler: random dots once)
  const cloudPts: [number, number, number][] = [];
  for (let i = 0; i < 60; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * eR * 0.95;
    cloudPts.push([Math.cos(a) * r, Math.sin(a) * r, 0.02 + Math.random() * 0.06]);
  }

  // Continent silhouettes (very simplified)
  function drawEarth(t: number) {
    // Atmospheric rim
    const rim = ctx.createRadialGradient(ecx, ecy, eR - 5, ecx, ecy, eR + 30);
    rim.addColorStop(0, 'rgba(80, 140, 220, 0.5)');
    rim.addColorStop(0.4, 'rgba(40, 90, 180, 0.18)');
    rim.addColorStop(1, 'rgba(20, 50, 120, 0)');
    ctx.fillStyle = rim;
    ctx.beginPath(); ctx.arc(ecx, ecy, eR + 30, 0, Math.PI * 2); ctx.fill();

    // Earth disc
    const ef = ctx.createRadialGradient(ecx - 22, ecy - 22, 6, ecx, ecy, eR);
    ef.addColorStop(0, '#1e58a8');
    ef.addColorStop(0.45, '#0d2858');
    ef.addColorStop(0.85, '#08183a');
    ef.addColorStop(1, '#040b1e');
    ctx.fillStyle = ef;
    ctx.beginPath(); ctx.arc(ecx, ecy, eR, 0, Math.PI * 2); ctx.fill();

    // Continent splotches (very stylized)
    ctx.save();
    ctx.beginPath();
    ctx.arc(ecx, ecy, eR, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = 'rgba(34, 100, 60, 0.45)';
    ctx.beginPath();
    ctx.ellipse(ecx - 30, ecy - 18, 26, 18, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ecx + 30, ecy + 12, 22, 16, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(ecx + 5, ecy + 38, 18, 12, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Cloud points (drift slowly with t)
    const drift = (t * 4) % 360;
    for (const [cx, cy, op] of cloudPts) {
      ctx.fillStyle = `rgba(255,255,255,${op})`;
      ctx.fillRect(ecx + cx + drift * 0.05 - 1, ecy + cy - 1, 2, 2);
    }

    // Day/night terminator (a soft shadow on the east side)
    const term = ctx.createLinearGradient(ecx + eR - 40, ecy, ecx + eR + 10, ecy);
    term.addColorStop(0, 'rgba(0,0,0,0)');
    term.addColorStop(0.6, 'rgba(0,0,0,0.45)');
    term.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = term;
    ctx.beginPath(); ctx.arc(ecx, ecy, eR, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  const progress = { value: 0 };
  let tIdle = 0;
  let dodgeStart = -1;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#040410';
    ctx.fillRect(0, 0, W, H);

    // Stars with twinkle
    for (const [sx, sy, sb] of bgStars) {
      const tw = sb * (0.7 + 0.3 * Math.sin(tIdle * 2 + sx * 0.05));
      ctx.fillStyle = `rgba(255,255,255,${tw})`;
      ctx.fillRect(sx, sy, 1, 1);
    }

    drawEarth(tIdle);

    // Orbital reference rings
    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 0.5;
    for (const r of [eR + 25, eR + 55, eR + 90]) {
      ctx.beginPath(); ctx.ellipse(ecx, ecy, r, r * 0.4, 0, 0, Math.PI * 2); ctx.stroke();
    }

    const p = progress.value;
    const visN = Math.max(20, Math.floor(p * maxS));

    // Update + draw satellites
    for (let i = 0; i < visN; i++) {
      const s = sats[i];
      const a = s.a + tIdle * s.spd * 0.4 + p * s.spd * 1.2;
      const sx = ecx + Math.cos(a) * s.oR;
      const sy = ecy + Math.sin(a) * s.oR * s.tilt;
      // Hide satellites passing behind Earth
      if (Math.sin(a) > 0.3 && Math.hypot(sx - ecx, (sy - ecy) / s.tilt) < eR + 5) continue;

      // Trail
      s.trail.push({ x: sx, y: sy });
      if (s.trail.length > 12) s.trail.shift();
      if (s.trail.length > 3) {
        ctx.strokeStyle = 'rgba(180, 200, 255, 0.18)';
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let k = 0; k < s.trail.length; k++) {
          const tp = s.trail[k];
          if (k === 0) ctx.moveTo(tp.x, tp.y); else ctx.lineTo(tp.x, tp.y);
        }
        ctx.stroke();
      }

      const flash = Math.sin(tIdle * 4 + i * 1.7) > 0.95;
      if (flash) {
        ctx.fillStyle = 'rgba(180, 200, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = flash ? '#c4b5fd' : 'rgba(220, 230, 255, 0.7)';
      ctx.fillRect(sx - 0.8, sy - 0.8, 1.6, 1.6);

      // Laser cross-link: occasionally between near sats with line of sight
      if (i < visN - 1 && (i + Math.floor(tIdle * 2)) % 23 === 0) {
        const j = (i + 5) % visN;
        const sj = sats[j];
        const aj = sj.a + tIdle * sj.spd * 0.4 + p * sj.spd * 1.2;
        const jx = ecx + Math.cos(aj) * sj.oR;
        const jy = ecy + Math.sin(aj) * sj.oR * sj.tilt;
        const dist = Math.hypot(jx - sx, jy - sy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(180, 200, 255, ${0.45 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(jx, jy);
          ctx.stroke();
        }
      }
    }

    // Debris
    for (let i = 0; i < debris.length; i++) {
      const d = debris[i];
      const a = d.a + tIdle * d.spd * 0.4;
      const sx = ecx + Math.cos(a) * d.oR;
      const sy = ecy + Math.sin(a) * d.oR * d.tilt;
      ctx.fillStyle = 'rgba(255, 80, 80, 0.55)';
      ctx.fillRect(sx - 1, sy - 1, 2, 2);
    }

    // Dodge event (every ~15s)
    const dodgeCycle = (tIdle / 12) % 1;
    if (dodgeCycle < 0.15) {
      // Pick a satellite & flash a warning ring
      const idx = Math.floor((tIdle / 12) % maxS);
      const s = sats[idx % visN];
      if (s) {
        const a = s.a + tIdle * s.spd * 0.4 + p * s.spd * 1.2;
        const sx = ecx + Math.cos(a) * s.oR;
        const sy = ecy + Math.sin(a) * s.oR * s.tilt;
        ctx.strokeStyle = `rgba(255, 80, 80, ${0.6 * (1 - dodgeCycle / 0.15)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(sx, sy, 6 + dodgeCycle * 30, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    void dodgeStart;

    drawScanLines(ctx, 0.012);

    ctx.fillStyle = A.ink;
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    const visCount = Math.min(7500, Math.floor(p * 7500));
    ctx.fillText(`Active satellites: ${visCount.toLocaleString()}`, 770, 26);
    ctx.fillStyle = 'rgba(255, 100, 100, 0.55)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`Tracked debris: ${Math.min(35000, Math.floor(p * 35000)).toLocaleString()}`, 770, 44);
    ctx.fillStyle = 'rgba(180, 200, 255, 0.45)';
    ctx.fillText('autonomous coordination via laser ISL', 770, 62);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });

  registerIdle(10, section, (t) => {
    tIdle = t;
    draw();
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 11 — ALPHAFOLD
// Two-panel comparison with proper protein backbone (helices,
// sheets, coils), color-by-secondary-structure, time scrubbers.
// Click to flip panel emphasis.
// ════════════════════════════════════════════════════════════

function alphaFold(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[10];
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow11', 8);
  addDropShadow(defs, 'shadow11', 3, 2, 0.45);

  // Subtle molecular grid background
  const grid = el('pattern', { id: 'mgrid', width: 40, height: 40, patternUnits: 'userSpaceOnUse' });
  grid.appendChild(el('path', { d: 'M 40 0 L 0 0 0 40', fill: 'none', stroke: 'rgba(168, 85, 247, 0.05)', 'stroke-width': 0.5 }));
  defs.appendChild(grid);

  svgBg(svg, '#0a0418');
  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#mgrid)' }));

  // ═══ Two side-by-side panels ═══
  // Panel layout
  const panW = 365, panH = 320, panY = 40;

  // Left panel: lab (X-ray crystallography)
  const labPanX = 20;
  const labPan = el('g', { transform: `translate(${labPanX}, ${panY})` });
  labPan.appendChild(el('rect', { x: 0, y: 0, width: panW, height: panH, rx: 10, fill: 'rgba(255, 105, 60, 0.04)', stroke: 'rgba(255, 105, 60, 0.2)', 'stroke-width': 1 }));
  labPan.appendChild(txt(panW / 2, 22, 'LAB \u00b7 X-RAY CRYSTALLOGRAPHY', 10, '#ff8055', 'middle', 'JetBrains Mono, monospace'));
  // Diffraction pattern (concentric dot rings)
  const diffG = el('g', { transform: `translate(${panW / 2}, ${panH / 2 + 5})`, opacity: 0.35 });
  for (let r = 18; r <= 100; r += 14) {
    for (let i = 0; i < Math.floor(r / 3); i++) {
      const a = (i / Math.floor(r / 3)) * Math.PI * 2;
      const opacity = 0.3 + Math.random() * 0.5;
      diffG.appendChild(el('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1.2, fill: '#ff8055', opacity }));
    }
  }
  labPan.appendChild(diffG);
  labPan.appendChild(txt(panW / 2, panH - 30, 'months \u2192 years', 9, 'rgba(255, 105, 60, 0.65)', 'middle', 'JetBrains Mono, monospace'));
  // Lab time bar
  labPan.appendChild(el('rect', { x: 30, y: panH - 18, width: 305, height: 4, rx: 2, fill: 'rgba(255, 105, 60, 0.15)' }));
  const labTimeBar = el('rect', { x: 30, y: panH - 18, width: 0, height: 4, rx: 2, fill: '#ff8055' });
  labPan.appendChild(labTimeBar);
  svg.appendChild(labPan);

  // Right panel: AlphaFold
  const afPanX = 415;
  const afPan = el('g', { transform: `translate(${afPanX}, ${panY})`, filter: 'url(#shadow11)' });
  afPan.appendChild(el('rect', { x: 0, y: 0, width: panW, height: panH, rx: 10, fill: 'rgba(168, 85, 247, 0.04)', stroke: A.fill, 'stroke-width': 1.2 }));
  afPan.appendChild(txt(panW / 2, 22, 'ALPHAFOLD', 10, A.ink, 'middle', 'JetBrains Mono, monospace'));

  // Build a stylized protein backbone with secondary structure
  // Layout: a few alpha helices (spirals), a beta sheet (zig-zag), connecting coils.
  function genBackbone(): { x: number; y: number; struct: 'helix' | 'sheet' | 'coil' }[] {
    const pts: { x: number; y: number; struct: 'helix' | 'sheet' | 'coil' }[] = [];
    const cx = panW / 2, cy = panH / 2 + 5;
    // First helix (left)
    for (let i = 0; i < 18; i++) {
      const a = i * 0.7;
      const r = 14;
      pts.push({ x: cx - 70 + Math.cos(a) * r, y: cy - 40 + i * 3, struct: 'helix' });
    }
    // Coil down
    for (let i = 0; i < 6; i++) {
      pts.push({ x: cx - 70 + i * 5, y: cy + 18 + Math.sin(i * 0.7) * 3, struct: 'coil' });
    }
    // Beta sheet (zig-zag)
    for (let i = 0; i < 10; i++) {
      pts.push({ x: cx - 40 + i * 9, y: cy + 24 + (i % 2 ? -4 : 4), struct: 'sheet' });
    }
    // Coil
    for (let i = 0; i < 5; i++) {
      pts.push({ x: cx + 50 + i * 4, y: cy + 26 - i * 4, struct: 'coil' });
    }
    // Second helix (right)
    for (let i = 0; i < 16; i++) {
      const a = i * 0.7;
      const r = 12;
      pts.push({ x: cx + 70 + Math.cos(a) * r, y: cy + 5 - i * 3, struct: 'helix' });
    }
    return pts;
  }
  const backbonePts = genBackbone();
  const backbone = el('g', {});

  // Bonds (drawn first)
  const bondLines: SVGElement[] = [];
  for (let i = 1; i < backbonePts.length; i++) {
    const f = backbonePts[i - 1], t = backbonePts[i];
    const ln = el('line', { x1: f.x, y1: f.y, x2: t.x, y2: t.y, stroke: '#3a1e64', 'stroke-width': 1.5, opacity: 0 });
    backbone.appendChild(ln);
    bondLines.push(ln);
  }

  // Residues
  function structColor(s: 'helix' | 'sheet' | 'coil'): string {
    if (s === 'helix') return '#a855f7';
    if (s === 'sheet') return '#fbbf24';
    return '#22d3ee';
  }
  const resCircles: SVGElement[] = [];
  for (let i = 0; i < backbonePts.length; i++) {
    const p = backbonePts[i];
    const c = el('circle', { cx: p.x, cy: p.y, r: 3.5, fill: structColor(p.struct), stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 0.4, opacity: 0 });
    backbone.appendChild(c);
    resCircles.push(c);
  }
  afPan.appendChild(backbone);

  afPan.appendChild(txt(panW / 2, panH - 46, 'AlphaFold 3 \u00b7 ligands & nucleic acids', 8, 'rgba(168, 85, 247, 0.55)', 'middle', 'JetBrains Mono, monospace'));
  afPan.appendChild(txt(panW / 2, panH - 30, 'seconds \u2014 minutes', 9, A.ink, 'middle', 'JetBrains Mono, monospace'));
  afPan.appendChild(el('rect', { x: 30, y: panH - 18, width: 305, height: 4, rx: 2, fill: 'rgba(168, 85, 247, 0.15)' }));
  const afTimeBar = el('rect', { x: 30, y: panH - 18, width: 0, height: 4, rx: 2, fill: A.fill });
  afPan.appendChild(afTimeBar);
  // Legend
  const leg = el('g', { transform: `translate(${panW - 90}, ${panH - 70})` });
  for (const [i, s, lab] of [[0, 'helix', 'helix'], [1, 'sheet', 'sheet'], [2, 'coil', 'coil']] as [number, 'helix' | 'sheet' | 'coil', string][]) {
    leg.appendChild(el('circle', { cx: 0, cy: i * 12, r: 3, fill: structColor(s) }));
    leg.appendChild(txt(8, i * 12 + 3, lab, 7, 'rgba(255,255,255,0.5)', 'start', 'JetBrains Mono, monospace'));
  }
  afPan.appendChild(leg);
  svg.appendChild(afPan);

  // Bottom comparison labels
  svg.appendChild(txt(W / 2, panY + panH + 30, '\u2022 same protein, two methods \u2022', 9, 'rgba(255,255,255,0.4)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(txt(W / 2, panY + panH + 50, '200M+ predicted structures (as of 2026)', 11, A.ink, 'middle', 'JetBrains Mono, monospace'));

  const tl = gsap.timeline();
  // Reveal AlphaFold backbone fast
  resCircles.forEach((c, i) => tl.to(c, { attr: { opacity: 1 }, duration: 0.04, ease: EASE.entrance }, 0.05 + i * 0.005));
  bondLines.forEach((b, i) => tl.to(b, { attr: { opacity: 0.7 }, duration: 0.04, ease: EASE.entrance }, 0.05 + i * 0.005));
  tl.to(afTimeBar, { attr: { width: 305 }, duration: 0.18, ease: EASE.standard }, 0.45);
  tl.to(labTimeBar, { attr: { width: 12 }, duration: 0.5, ease: 'none' }, 0.45);

  // ═══ Click to flip emphasis ═══
  let labFocus = false;
  const h = hint(container, 'click a panel to compare');
  showHintAfter(h, 2400);
  function setFocus(lab: boolean) {
    if (lab) {
      labPan.setAttribute('opacity', '1');
      afPan.setAttribute('opacity', '0.45');
    } else {
      labPan.setAttribute('opacity', '0.45');
      afPan.setAttribute('opacity', '1');
    }
    h.classList.remove('show');
  }
  labPan.style.cursor = 'pointer';
  (labPan as SVGElement).style.pointerEvents = 'all';
  labPan.addEventListener('click', () => { labFocus = !labFocus; setFocus(labFocus); });
  afPan.style.cursor = 'pointer';
  (afPan as SVGElement).style.pointerEvents = 'all';
  afPan.addEventListener('click', () => { labFocus = false; setFocus(false); });
  setFocus(false);

  // ═══ Idle: backbone gently rotates, diffraction shimmers ═══
  const cx0 = panW / 2;
  registerIdle(11, section, (t) => {
    // Pseudo-rotate backbone by horizontally squishing
    const sq = 1 + Math.sin(t * 0.6) * 0.04;
    backbone.setAttribute('transform', `translate(${cx0 * (1 - sq)}, 0) scale(${sq}, 1)`);
    // Diffraction subtle shimmer
    diffG.setAttribute('opacity', String(0.3 + Math.sin(t * 1.4) * 0.1));
  });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 12 — VON NEUMANN PROBE
// Explicit replication events: probes arrive at stars, pause,
// split visibly into two children. Earth stays anchored.
// Logarithmic time counter.
// ════════════════════════════════════════════════════════════

function vonNeumann(container: HTMLElement, section: HTMLElement): gsap.core.Timeline {
  const A = ACCENTS[11];
  const { ctx } = makeCanvas(container);

  // Star field — these are destinations
  interface Star { x: number; y: number; b: number; lit: number }
  const stars: Star[] = [];
  let seed = 1729;
  function rseed() { seed = (seed * 16807) % 2147483647; return seed; }
  for (let i = 0; i < 220; i++) {
    stars.push({
      x: (rseed() % W),
      y: (rseed() % H),
      b: 0.06 + (rseed() % 30) / 130,
      lit: 0,
    });
  }

  interface PN { sx: number; sy: number; ex: number; ey: number; d: number; sp: number; arrived: number; children: PN[]; targetIdx: number }
  // Earth anchor
  const earthX = 80, earthY = 420;

  function nearestStar(x: number, y: number, exclude: Set<number>): { idx: number; star: Star } | null {
    let best = -1, bd = Infinity;
    for (let i = 0; i < stars.length; i++) {
      if (exclude.has(i)) continue;
      const dx = stars[i].x - x, dy = stars[i].y - y;
      const d = dx * dx + dy * dy;
      // Want some distance — at least 60px
      if (d < 3600) continue;
      if (d < bd) { bd = d; best = i; }
    }
    if (best < 0) return null;
    return { idx: best, star: stars[best] };
  }

  function build(x: number, y: number, d: number, sp: number, used: Set<number>): PN {
    const target = nearestStar(x, y, used);
    if (!target || d > 5) {
      // No suitable target → leaf
      return { sx: x, sy: y, ex: x + 30, ey: y - 30, d, sp, arrived: 1, children: [], targetIdx: -1 };
    }
    used.add(target.idx);
    const n: PN = { sx: x, sy: y, ex: target.star.x, ey: target.star.y, d, sp, arrived: 0, children: [], targetIdx: target.idx };
    if (d < 5) {
      const childSp = sp + (1 - sp) * 0.18;
      const lUsed = new Set(used);
      n.children.push(build(target.star.x, target.star.y, d + 1, childSp, lUsed));
      const rUsed = new Set(used);
      n.children.push(build(target.star.x, target.star.y, d + 1, childSp, rUsed));
    }
    return n;
  }

  const tree = build(earthX, earthY, 0, 0, new Set());
  const progress = { value: 0 };
  let tIdle = 0;

  function visit(n: PN, fn: (n: PN) => void) {
    fn(n);
    for (const c of n.children) visit(c, fn);
  }

  function drawNode(n: PN) {
    const p = Math.min(1, progress.value + tIdle * 0.005);
    if (p < n.sp) return;
    const localT = Math.min(1, (p - n.sp) / 0.05); // travel takes 0.05 of overall progress
    const dx = n.sx + (n.ex - n.sx) * localT;
    const dy = n.sy + (n.ey - n.sy) * localT;

    // Travel line (dim)
    ctx.strokeStyle = `rgba(251, 191, 36, ${Math.max(0.05, 0.35 - n.d * 0.05)})`;
    ctx.lineWidth = Math.max(0.5, 1.6 - n.d * 0.18);
    ctx.beginPath();
    ctx.moveTo(n.sx, n.sy);
    ctx.lineTo(dx, dy);
    ctx.stroke();

    // Probe head
    if (localT < 1) {
      ctx.fillStyle = '#fde68a';
      ctx.beginPath();
      ctx.arc(dx, dy, Math.max(1.2, 2.5 - n.d * 0.25), 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.fillStyle = `rgba(251, 191, 36, 0.35)`;
      ctx.beginPath();
      ctx.arc(dx, dy, Math.max(2, 5 - n.d * 0.4), 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Arrived — light up the destination star, draw replication burst
      n.arrived = Math.min(1, n.arrived + 0.05);
      if (n.targetIdx >= 0) stars[n.targetIdx].lit = Math.min(1, stars[n.targetIdx].lit + 0.04);
      // Burst
      const burstR = (1 - n.arrived) * 14 + 3;
      ctx.strokeStyle = `rgba(251, 191, 36, ${n.arrived * 0.6})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(n.ex, n.ey, burstR, 0, Math.PI * 2);
      ctx.stroke();
      // Two spawn dots fanning out (visual cue of replication)
      if (n.children.length === 2 && n.arrived > 0.5) {
        const fanT = Math.min(1, (n.arrived - 0.5) / 0.5);
        for (const c of n.children) {
          const fx = n.ex + (c.ex - n.ex) * 0.06 * fanT;
          const fy = n.ey + (c.ey - n.ey) * 0.06 * fanT;
          ctx.fillStyle = `rgba(251, 191, 36, ${fanT * 0.5})`;
          ctx.beginPath();
          ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // Recurse to children
      for (const c of n.children) drawNode(c);
    }
  }

  function logTime(p: number): string {
    const cp = Math.max(0, Math.min(1, p));
    if (cp < 0.001) return '0 years';
    const v = Math.pow(10, cp * 7); // up to 10^7
    if (v < 1000) return `${Math.floor(v).toLocaleString()} years`;
    if (v < 1_000_000) return `${(v / 1000).toFixed(1)}k years`;
    return `${(v / 1_000_000).toFixed(2)}M years`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#020208';
    ctx.fillRect(0, 0, W, H);

    // Stars (with twinkle)
    for (const s of stars) {
      const tw = s.b * (0.7 + 0.3 * Math.sin(tIdle * 1.5 + s.x * 0.04));
      const lit = s.lit;
      if (lit > 0) {
        // Glow halo
        ctx.fillStyle = `rgba(251, 191, 36, ${lit * 0.18})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 220, 120, ${tw + lit})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${tw})`;
      }
      ctx.fillRect(s.x, s.y, 1.2, 1.2);
    }

    // Earth (anchored)
    const eg = ctx.createRadialGradient(earthX, earthY, 0, earthX, earthY, 18);
    eg.addColorStop(0, '#3a8edd');
    eg.addColorStop(0.6, '#1955a8');
    eg.addColorStop(1, '#0a1530');
    ctx.fillStyle = eg;
    ctx.beginPath();
    ctx.arc(earthX, earthY, 14 + Math.sin(tIdle * 0.8) * 0.6, 0, Math.PI * 2);
    ctx.fill();
    // Atmosphere
    ctx.strokeStyle = `rgba(120, 180, 255, ${0.3 + Math.sin(tIdle * 0.8) * 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(earthX, earthY, 17, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(200, 220, 255, 0.55)';
    ctx.font = '9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Earth', earthX, earthY + 30);
    ctx.fillStyle = 'rgba(120, 180, 255, 0.4)';
    ctx.font = '7px JetBrains Mono, monospace';
    ctx.fillText('you are here', earthX, earthY + 42);

    // Tree
    drawNode(tree);

    // HUD
    const cappedT = Math.min(1, progress.value + tIdle * 0.005);
    let probeCount = 0, litCount = 0;
    visit(tree, (n) => { if (cappedT >= n.sp) probeCount++; });
    for (const s of stars) if (s.lit > 0.05) litCount++;

    drawScanLines(ctx, 0.008);

    ctx.fillStyle = A.ink;
    ctx.font = 'bold 12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Probes: ${probeCount}`, 770, 26);
    ctx.fillStyle = 'rgba(251, 191, 36, 0.55)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`Stars colonized: ${litCount}`, 770, 44);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`T + ${logTime(cappedT)}`, 770, 62);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'power1.in' });

  registerIdle(12, section, (t) => {
    tIdle = t;
    draw();
  });

  return tl;
}
