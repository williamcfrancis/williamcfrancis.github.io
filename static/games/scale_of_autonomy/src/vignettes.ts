import gsap from 'gsap';

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

function drawScanLines(ctx: CanvasRenderingContext2D, alpha = 0.03) {
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  for (let y = 0; y < H; y += 4) {
    ctx.fillRect(0, y, W, 1);
  }
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

// ════════════════════════════════════════════════════════════
// DISPATCHER
// ════════════════════════════════════════════════════════════

export function createVignette(levelId: number, container: HTMLElement): gsap.core.Timeline {
  const fns: Record<number, (c: HTMLElement) => gsap.core.Timeline> = {
    1: thermostat, 2: cruiseControl, 3: roomba, 4: drone,
    5: warehouse, 6: selfDrivingL2, 7: selfDrivingL4, 8: surgicalRobot,
    9: marsRover, 10: starlink, 11: alphaFold, 12: vonNeumann,
  };
  return (fns[levelId] ?? fallback)(container);
}

function fallback(_c: HTMLElement): gsap.core.Timeline { return gsap.timeline(); }

// ════════════════════════════════════════════════════════════
// LEVEL 1 — THERMOSTAT
// ════════════════════════════════════════════════════════════

function thermostat(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow1', 18);

  svgBg(svg, '#0e1025');
  svg.appendChild(el('line', { x1: 0, y1: 400, x2: W, y2: 400, stroke: '#181a35', 'stroke-width': 1 }));

  // Thermometer
  const tg = el('g', { transform: 'translate(180, 70)' });
  tg.appendChild(el('rect', { x: 0, y: 0, width: 30, height: 250, rx: 15, fill: '#181a35', stroke: '#252850', 'stroke-width': 1 }));
  tg.appendChild(el('circle', { cx: 15, cy: 280, r: 26, fill: '#ff4444' }));
  const mercury = el('rect', { x: 7, y: 190, width: 16, height: 60, rx: 8, fill: '#ff4444' });
  tg.appendChild(mercury);
  for (let i = 0; i < 7; i++) tg.appendChild(el('line', { x1: 32, y1: 15 + i * 36, x2: 44, y2: 15 + i * 36, stroke: '#252850', 'stroke-width': 1 }));
  const tempLabel = txt(15, -12, '68\u00b0F', 17, '#8899bb', 'middle', 'JetBrains Mono, monospace');
  tg.appendChild(tempLabel);
  svg.appendChild(tg);

  // Switch
  const sg = el('g', { transform: 'translate(380, 150)' });
  sg.appendChild(el('rect', { x: 0, y: 0, width: 52, height: 96, rx: 26, fill: '#141630', stroke: '#252850', 'stroke-width': 1 }));
  const knob = el('circle', { cx: 26, cy: 68, r: 19, fill: '#444' });
  sg.appendChild(knob);
  const swLabel = txt(26, -12, 'OFF', 11, '#555', 'middle', 'JetBrains Mono, monospace');
  sg.appendChild(swLabel);
  svg.appendChild(sg);

  // Radiator
  const rg = el('g', { transform: 'translate(570, 150)' });
  for (let i = 0; i < 6; i++) rg.appendChild(el('rect', { x: i * 22, y: 0, width: 14, height: 170, rx: 4, fill: '#1a1d38', stroke: '#252850', 'stroke-width': 1 }));
  const radGlow = el('rect', { x: -15, y: -15, width: 160, height: 200, rx: 14, fill: '#ff4400', opacity: 0, filter: 'url(#glow1)' });
  rg.appendChild(radGlow);
  svg.appendChild(rg);

  // Data flow lines
  const line1 = el('line', { x1: 225, y1: 230, x2: 380, y2: 230, stroke: '#00d4ff', 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0 });
  const line2 = el('line', { x1: 432, y1: 230, x2: 570, y2: 230, stroke: '#ff6633', 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0 });
  svg.appendChild(line1);
  svg.appendChild(line2);

  // Labels
  svg.appendChild(txt(180, 390, 'SENSOR', 9, 'rgba(255,255,255,0.15)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(txt(406, 390, 'CONTROLLER', 9, 'rgba(255,255,255,0.15)', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(txt(600, 390, 'ACTUATOR', 9, 'rgba(255,255,255,0.15)', 'middle', 'JetBrains Mono, monospace'));

  const tl = gsap.timeline();

  tl.to(mercury, { attr: { y: 220, height: 30 }, duration: 0.15, ease: 'none' })
    .call(() => { tempLabel.textContent = '62\u00b0F'; }, [], 0.05)
    .call(() => { tempLabel.textContent = '59\u00b0F'; }, [], 0.12)
    .to(line1, { opacity: 0.6, duration: 0.04 }, 0.15)
    .to(knob, { attr: { cy: 28 }, duration: 0.04 }, 0.2)
    .call(() => { (knob as SVGElement).setAttribute('fill', '#4CAF50'); swLabel.textContent = 'ON'; }, [], 0.2)
    .to(line2, { opacity: 0.6, duration: 0.04 }, 0.24)
    .to(radGlow, { attr: { opacity: 0.2 }, duration: 0.2, ease: 'power2.in' }, 0.28)
    .to(mercury, { attr: { y: 110, height: 140 }, duration: 0.32, ease: 'none' }, 0.3)
    .call(() => { tempLabel.textContent = '64\u00b0F'; }, [], 0.4)
    .call(() => { tempLabel.textContent = '68\u00b0F'; }, [], 0.5)
    .call(() => { tempLabel.textContent = '72\u00b0F'; }, [], 0.6)
    .to(line1, { opacity: 0.3, duration: 0.03 }, 0.64)
    .to(knob, { attr: { cy: 68 }, duration: 0.04 }, 0.67)
    .call(() => { (knob as SVGElement).setAttribute('fill', '#444'); swLabel.textContent = 'OFF'; }, [], 0.67)
    .to(radGlow, { attr: { opacity: 0 }, duration: 0.15 }, 0.7)
    .to(line2, { opacity: 0, duration: 0.08 }, 0.72)
    .to(line1, { opacity: 0, duration: 0.08 }, 0.75)
    .to(mercury, { attr: { y: 165, height: 85 }, duration: 0.15, ease: 'none' }, 0.8)
    .call(() => { tempLabel.textContent = '68\u00b0F'; }, [], 0.9);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 2 — CRUISE CONTROL
// ════════════════════════════════════════════════════════════

function cruiseControl(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  addBlur(defs, 'glow2', 10);

  svgBg(svg, '#0a0c1a');

  const roadGroup = el('g', {});
  roadGroup.appendChild(el('rect', { x: 0, y: 300, width: W, height: 200, fill: '#151730' }));
  roadGroup.appendChild(el('line', { x1: 0, y1: 300, x2: W, y2: 300, stroke: '#222445', 'stroke-width': 2 }));
  for (let i = 0; i < 13; i++) roadGroup.appendChild(el('rect', { x: 20 + i * 62, y: 395, width: 36, height: 3, rx: 1.5, fill: '#2a2d50' }));
  svg.appendChild(roadGroup);

  const carGroup = el('g', { transform: 'translate(280, 308)' });
  carGroup.appendChild(el('rect', { x: 0, y: 22, width: 160, height: 48, rx: 8, fill: '#252845' }));
  carGroup.appendChild(el('rect', { x: 22, y: 2, width: 108, height: 28, rx: 6, fill: '#1e2040' }));
  carGroup.appendChild(el('circle', { cx: 36, cy: 72, r: 13, fill: '#111', stroke: '#333', 'stroke-width': 2 }));
  carGroup.appendChild(el('circle', { cx: 128, cy: 72, r: 13, fill: '#111', stroke: '#333', 'stroke-width': 2 }));
  carGroup.appendChild(el('rect', { x: 155, y: 30, width: 6, height: 10, rx: 2, fill: '#ffcc44', opacity: 0.7 }));
  const engineGlow = el('rect', { x: 25, y: 28, width: 90, height: 16, rx: 6, fill: '#3b82f6', opacity: 0, filter: 'url(#glow2)' });
  carGroup.appendChild(engineGlow);
  svg.appendChild(carGroup);

  // Speedometer
  const sp = el('g', { transform: 'translate(660, 130)' });
  sp.appendChild(el('circle', { cx: 0, cy: 0, r: 58, fill: 'rgba(0,0,0,0.3)', stroke: '#222445', 'stroke-width': 1.5 }));
  sp.appendChild(el('circle', { cx: 0, cy: 0, r: 4, fill: '#fff' }));
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI * 0.8 + (i / 10) * Math.PI * 1.6;
    sp.appendChild(el('line', { x1: Math.cos(a) * 46, y1: Math.sin(a) * 46, x2: Math.cos(a) * 52, y2: Math.sin(a) * 52, stroke: '#3a3d60', 'stroke-width': 1.5 }));
  }
  const na = -Math.PI * 0.8 + 0.65 * Math.PI * 1.6;
  sp.appendChild(el('line', { x1: 0, y1: 0, x2: Math.cos(na) * 38, y2: Math.sin(na) * 38, stroke: '#ff4444', 'stroke-width': 2, 'stroke-linecap': 'round' }));
  sp.appendChild(txt(0, 28, '65', 15, '#3b82f6', 'middle', 'JetBrains Mono, monospace'));
  sp.appendChild(txt(0, 44, 'MPH', 8, '#444'));
  svg.appendChild(sp);
  svg.appendChild(txt(660, 210, 'SET: 65 MPH', 10, '#4CAF50', 'middle', 'JetBrains Mono, monospace'));

  const hillLabel = txt(400, 275, '', 13, 'rgba(255,255,255,0.25)', 'middle');
  svg.appendChild(hillLabel);

  const tl = gsap.timeline();

  tl.set(hillLabel, { textContent: 'Flat road' })
    .to({}, { duration: 0.12 })
    .call(() => { hillLabel.textContent = '\u25b2 Uphill'; }, [], 0.14)
    .to(roadGroup, { attr: { transform: 'rotate(-4, 400, 400)' }, duration: 0.18, ease: 'power2.inOut' }, 0.14)
    .to(engineGlow, { attr: { opacity: 0.5 }, duration: 0.14 }, 0.18)
    .to({}, { duration: 0.14 })
    .call(() => { hillLabel.textContent = '\u25bc Downhill'; }, [], 0.48)
    .to(roadGroup, { attr: { transform: 'rotate(4, 400, 400)' }, duration: 0.18, ease: 'power2.inOut' }, 0.48)
    .to(engineGlow, { attr: { opacity: 0 }, duration: 0.14 }, 0.52)
    .to({}, { duration: 0.1 })
    .call(() => { hillLabel.textContent = 'Flat road'; }, [], 0.8)
    .to(roadGroup, { attr: { transform: 'rotate(0, 400, 400)' }, duration: 0.14, ease: 'power2.inOut' }, 0.8);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 3 — ROOMBA
// ════════════════════════════════════════════════════════════

function roomba(container: HTMLElement): gsap.core.Timeline {
  const { ctx } = makeCanvas(container);

  const furniture = [
    { x: 200, y: 80, w: 100, h: 60 },
    { x: 500, y: 300, w: 80, h: 80 },
    { x: 100, y: 300, w: 60, h: 100 },
    { x: 550, y: 80, w: 120, h: 50 },
  ];

  interface Pos { x: number; y: number; angle: number }
  const path: Pos[] = [];
  let rx = 400, ry = 250, ra = 0;
  const rR = 15;

  for (let i = 0; i < 700; i++) {
    const dx = Math.cos(ra) * 3, dy = Math.sin(ra) * 3;
    const nx = rx + dx, ny = ry + dy;
    let bumped = nx - rR < 40 || nx + rR > 760 || ny - rR < 40 || ny + rR > 460;
    if (!bumped) {
      for (const f of furniture) {
        if (nx + rR > f.x && nx - rR < f.x + f.w && ny + rR > f.y && ny - rR < f.y + f.h) { bumped = true; break; }
      }
    }
    if (bumped) { ra += Math.PI * (0.3 + Math.random() * 0.9); } else { rx = nx; ry = ny; ra += 0.02; }
    path.push({ x: rx, y: ry, angle: ra });
  }

  const progress = { value: 0 };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a0c1a';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#12142a';
    ctx.fillRect(40, 40, 720, 420);

    const trailEnd = Math.floor(progress.value * path.length);

    // Cleaned trail
    ctx.fillStyle = 'rgba(34, 197, 94, 0.035)';
    for (let i = 0; i < trailEnd; i += 2) {
      ctx.beginPath();
      ctx.arc(path[i].x, path[i].y, rR + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Recent trail (brighter)
    const recentStart = Math.max(0, trailEnd - 40);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = recentStart; i < trailEnd; i++) {
      if (i === recentStart) ctx.moveTo(path[i].x, path[i].y);
      else ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Furniture
    ctx.fillStyle = '#1a1d38';
    ctx.strokeStyle = '#252850';
    ctx.lineWidth = 1;
    for (const f of furniture) {
      ctx.beginPath();
      ctx.roundRect(f.x, f.y, f.w, f.h, 4);
      ctx.fill();
      ctx.stroke();
    }

    // Walls
    ctx.strokeStyle = '#2a2d55';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 420);

    // Roomba
    if (trailEnd > 0) {
      const pos = path[Math.min(trailEnd - 1, path.length - 1)];
      ctx.save();
      ctx.translate(pos.x, pos.y);

      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
      grd.addColorStop(0, 'rgba(34, 197, 94, 0.18)');
      grd.addColorStop(1, 'rgba(34, 197, 94, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(0, 0, rR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.rotate(pos.angle);
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(rR - 4, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawScanLines(ctx, 0.015);

    const coverage = Math.min(100, Math.round((trailEnd / path.length) * 94));
    ctx.fillStyle = 'rgba(34, 197, 94, 0.5)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Coverage: ${coverage}%`, 745, 30);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });
  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 4 — DRONE
// ════════════════════════════════════════════════════════════

function drone(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  svgBg(svg, '#060810');

  // Background layers
  svg.appendChild(el('rect', { x: 0, y: 360, width: W, height: 140, fill: '#0e1025' }));
  for (let i = 0; i < 9; i++) {
    const bx = 20 + i * 95 + (i * 17) % 30;
    const bh = 35 + (i * 37) % 70;
    svg.appendChild(el('rect', { x: bx, y: 360 - bh, width: 25 + (i * 13) % 25, height: bh + 140, fill: '#0c0e20', rx: 2 }));
  }
  svg.appendChild(el('rect', { x: 0, y: 440, width: W, height: 60, fill: '#0e1025' }));

  const obstacle = el('rect', { x: 900, y: 190, width: 45, height: 150, rx: 4, fill: '#1a1540', stroke: '#2a2060', 'stroke-width': 1 });
  svg.appendChild(obstacle);

  const dg = el('g', { transform: 'translate(350, 200)' });
  dg.appendChild(el('polygon', { points: '-28,18 28,18 8,110 -8,110', fill: 'rgba(0, 212, 255, 0.06)', stroke: 'rgba(0, 212, 255, 0.15)', 'stroke-width': 0.5 }));
  dg.appendChild(el('polygon', { points: '45,-2 45,-8 130,25 130,32', fill: 'rgba(0, 212, 255, 0.04)', stroke: 'rgba(0, 212, 255, 0.1)', 'stroke-width': 0.5 }));
  dg.appendChild(el('rect', { x: -32, y: -7, width: 64, height: 14, rx: 4, fill: '#282a45', stroke: '#3a3d60', 'stroke-width': 0.8 }));
  dg.appendChild(el('line', { x1: -32, y1: 0, x2: -55, y2: -18, stroke: '#3a3d60', 'stroke-width': 2 }));
  dg.appendChild(el('line', { x1: 32, y1: 0, x2: 55, y2: -18, stroke: '#3a3d60', 'stroke-width': 2 }));
  dg.appendChild(el('ellipse', { cx: -55, cy: -20, rx: 16, ry: 2.5, fill: 'rgba(255,255,255,0.12)' }));
  dg.appendChild(el('ellipse', { cx: 55, cy: -20, rx: 16, ry: 2.5, fill: 'rgba(255,255,255,0.12)' }));
  dg.appendChild(el('circle', { cx: 0, cy: -9, r: 2.5, fill: '#4CAF50' }));
  dg.appendChild(txt(0, -28, 'GPS \u25cf', 9, '#4CAF50', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(dg);

  const wg = el('g', { opacity: 0 });
  for (let i = 0; i < 4; i++) {
    const wy = 160 + i * 28;
    wg.appendChild(el('line', { x1: 140, y1: wy, x2: 200, y2: wy, stroke: '#445', 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
    wg.appendChild(el('polygon', { points: `200,${wy - 3} 208,${wy} 200,${wy + 3}`, fill: '#445' }));
  }
  wg.appendChild(txt(170, 148, 'WIND', 9, '#445'));
  svg.appendChild(wg);

  const tl = gsap.timeline();
  tl.to(dg, { attr: { transform: 'translate(350, 194)' }, duration: 0.07, ease: 'sine.inOut' })
    .to(dg, { attr: { transform: 'translate(350, 206)' }, duration: 0.07, ease: 'sine.inOut' })
    .to(wg, { attr: { opacity: 1 }, duration: 0.04 }, 0.16)
    .to(dg, { attr: { transform: 'translate(395, 210)' }, duration: 0.1, ease: 'power2.out' }, 0.18)
    .to(dg, { attr: { transform: 'translate(350, 200)' }, duration: 0.1, ease: 'power2.inOut' }, 0.32)
    .to(wg, { attr: { opacity: 0 }, duration: 0.04 }, 0.42)
    .to(obstacle, { attr: { x: 480 }, duration: 0.12, ease: 'power2.out' }, 0.5)
    .to(dg, { attr: { transform: 'translate(350, 120)' }, duration: 0.12, ease: 'power2.inOut' }, 0.58)
    .to(dg, { attr: { transform: 'translate(540, 120)' }, duration: 0.14, ease: 'none' }, 0.72)
    .to(dg, { attr: { transform: 'translate(540, 200)' }, duration: 0.1, ease: 'power2.inOut' }, 0.88);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 5 — WAREHOUSE ROBOTS
// ════════════════════════════════════════════════════════════

function warehouse(container: HTMLElement): gsap.core.Timeline {
  const { ctx } = makeCanvas(container);
  const gridSize = 40, cols = 18, rows = 11, ox = 40, oy = 25;

  interface WP { x: number; y: number }
  interface Bot { path: WP[]; hl: boolean }

  function gp(c: number, r: number): WP { return { x: ox + c * gridSize + gridSize / 2, y: oy + r * gridSize + gridSize / 2 }; }
  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

  const bots: Bot[] = [
    { path: [gp(2, 2), gp(2, 8), gp(10, 8), gp(10, 3), gp(2, 3), gp(2, 2)], hl: true },
    { path: [gp(5, 1), gp(5, 5), gp(12, 5), gp(12, 1)], hl: false },
    { path: [gp(14, 9), gp(14, 4), gp(8, 4), gp(8, 9)], hl: false },
    { path: [gp(16, 2), gp(16, 7), gp(11, 7), gp(11, 2)], hl: false },
    { path: [gp(1, 6), gp(7, 6), gp(7, 1), gp(1, 1)], hl: false },
    { path: [gp(9, 9), gp(15, 9), gp(15, 2), gp(9, 2)], hl: false },
    { path: [gp(3, 4), gp(3, 9), gp(13, 9), gp(13, 4)], hl: false },
    { path: [gp(6, 3), gp(6, 7), gp(16, 7), gp(16, 3)], hl: false },
  ];

  function getPos(bot: Bot, p: number): WP {
    const n = bot.path.length;
    const sf = p * n, si = Math.floor(sf) % n, st = sf - Math.floor(sf);
    const f = bot.path[si], t = bot.path[(si + 1) % n];
    return { x: lerp(f.x, t.x, st), y: lerp(f.y, t.y, st) };
  }

  const progress = { value: 0 };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#08091a';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = 'rgba(255,255,255,0.025)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(ox + c * gridSize, oy); ctx.lineTo(ox + c * gridSize, oy + rows * gridSize); ctx.stroke(); }
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(ox, oy + r * gridSize); ctx.lineTo(ox + cols * gridSize, oy + r * gridSize); ctx.stroke(); }

    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    for (const [sc, sr, sw, sh] of [[4,1,2,3],[7,1,2,3],[10,5,2,3],[13,1,2,3],[4,6,2,3]]) {
      ctx.fillRect(ox + sc * gridSize + 3, oy + sr * gridSize + 3, sw * gridSize - 6, sh * gridSize - 6);
    }

    const p = progress.value;

    // Highlighted trail
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const steps = Math.floor(p * 80);
    for (let i = 0; i <= steps; i++) {
      const pos = getPos(bots[0], i / 80);
      if (i === 0) ctx.moveTo(pos.x, pos.y); else ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    for (const bot of bots) {
      const pos = getPos(bot, p);
      if (bot.hl) {
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 22);
        grd.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
        grd.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = bot.hl ? '#06b6d4' : '#3a3d60';
      ctx.fillRect(pos.x - 7, pos.y - 7, 14, 14);
      if (bot.hl && p > 0.3 && p < 0.7) {
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(pos.x - 11, pos.y - 11, 22, 22);
      }
    }

    drawScanLines(ctx, 0.012);

    ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Active robots: ${bots.length}`, 750, H - 10);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });
  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 6 — SELF-DRIVING CAR L2
// ════════════════════════════════════════════════════════════

function selfDrivingL2(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  const skyGrad = el('linearGradient', { id: 'sky6', x1: 0, y1: 0, x2: 0, y2: 1 });
  skyGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#14162a' }));
  skyGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#0a0c1a' }));
  defs.appendChild(skyGrad);

  svgBg(svg, '#0a0c1a');
  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: 250, fill: 'url(#sky6)' }));
  svg.appendChild(el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#12142a' }));

  const laneL = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#1e2040', 'stroke-width': 2, 'stroke-dasharray': '10 8' });
  const laneR = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#1e2040', 'stroke-width': 2, 'stroke-dasharray': '10 8' });
  svg.appendChild(laneL);
  svg.appendChild(laneR);
  svg.appendChild(el('line', { x1: 400, y1: 250, x2: 400, y2: 500, stroke: '#252850', 'stroke-width': 2, 'stroke-dasharray': '12 10' }));

  const cars = [[365, 280, 30, 20], [420, 310, 35, 22], [310, 340, 40, 25]];
  cars.forEach(([cx, cy, cw, ch]) => svg.appendChild(el('rect', { x: cx, y: cy, width: cw, height: ch, rx: 3, fill: '#282a45' })));

  const bbs = cars.map(([cx, cy, cw, ch]) => {
    const bb = el('rect', { x: cx - 5, y: cy - 5, width: cw + 10, height: ch + 10, rx: 2, fill: 'none', stroke: '#f59e0b', 'stroke-width': 1.5, opacity: 0 });
    svg.appendChild(bb);
    return bb;
  });

  const olL = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#f59e0b', 'stroke-width': 1.5, opacity: 0 });
  const olR = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#f59e0b', 'stroke-width': 1.5, opacity: 0 });
  svg.appendChild(olL);
  svg.appendChild(olR);

  const pathCurve = el('path', { d: 'M400,500 C400,420 395,350 400,280', fill: 'none', stroke: '#4CAF50', 'stroke-width': 2, 'stroke-dasharray': '6 4', opacity: 0 });
  svg.appendChild(pathCurve);

  const badge = el('g', { transform: 'translate(650, 42)', opacity: 0 });
  badge.appendChild(el('rect', { x: -72, y: -16, width: 144, height: 32, rx: 6, fill: 'rgba(245, 158, 11, 0.15)', stroke: '#f59e0b', 'stroke-width': 1 }));
  badge.appendChild(txt(0, 5, 'HUMAN REQUIRED', 10, '#f59e0b', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(badge);

  const dataLabel = txt(400, 488, '', 9, 'rgba(245, 158, 11, 0.35)', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(dataLabel);

  const tl = gsap.timeline();
  tl.to({}, { duration: 0.08 })
    .to(bbs, { attr: { opacity: 1 }, duration: 0.1, stagger: 0.03, ease: 'power2.out' }, 0.08)
    .call(() => { dataLabel.textContent = 'Detecting vehicles...'; }, [], 0.1)
    .to([olL, olR], { attr: { opacity: 0.6 }, duration: 0.1, stagger: 0.03 }, 0.28)
    .call(() => { dataLabel.textContent = 'Tracking lane boundaries'; }, [], 0.33)
    .to(pathCurve, { attr: { opacity: 0.7 }, duration: 0.1 }, 0.48)
    .call(() => { dataLabel.textContent = 'Path planned \u2014 monitoring...'; }, [], 0.53)
    .to(badge, { opacity: 1, duration: 0.08 }, 0.63)
    .to(badge, { opacity: 0.6, duration: 0.06, yoyo: true, repeat: 5, ease: 'power1.inOut' }, 0.72);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 7 — SELF-DRIVING CAR L4
// ════════════════════════════════════════════════════════════

function selfDrivingL4(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  svgBg(svg, '#0a0c1a');

  svg.appendChild(el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#12142a' }));
  svg.appendChild(el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#22c55e', 'stroke-width': 1.5, opacity: 0.4 }));
  svg.appendChild(el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#22c55e', 'stroke-width': 1.5, opacity: 0.4 }));
  svg.appendChild(el('line', { x1: 400, y1: 250, x2: 400, y2: 500, stroke: '#252850', 'stroke-width': 2, 'stroke-dasharray': '12 10' }));

  svg.appendChild(el('rect', { x: 365, y: 280, width: 30, height: 20, rx: 3, fill: '#282a45' }));
  svg.appendChild(el('rect', { x: 420, y: 310, width: 35, height: 22, rx: 3, fill: '#282a45' }));
  svg.appendChild(el('rect', { x: 360, y: 275, width: 40, height: 30, rx: 2, fill: 'none', stroke: '#22c55e', 'stroke-width': 1.5 }));
  svg.appendChild(el('rect', { x: 415, y: 305, width: 45, height: 32, rx: 2, fill: 'none', stroke: '#22c55e', 'stroke-width': 1.5 }));

  const pedG = el('g', { transform: 'translate(280, 360)' });
  pedG.appendChild(el('circle', { cx: 0, cy: -10, r: 5, fill: '#666' }));
  pedG.appendChild(el('rect', { x: -3, y: -5, width: 6, height: 14, rx: 2, fill: '#666' }));
  svg.appendChild(pedG);
  const pedArc = el('path', { d: 'M280,360 Q260,340 250,330 M280,360 Q290,340 300,330 M280,360 Q280,340 280,320', fill: 'none', stroke: '#fbbf24', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(pedArc);

  const cyG = el('g', { transform: 'translate(480, 380)', opacity: 0 });
  cyG.appendChild(el('circle', { cx: 0, cy: 0, r: 7, fill: 'none', stroke: '#666', 'stroke-width': 1.5 }));
  cyG.appendChild(el('circle', { cx: 0, cy: -11, r: 3.5, fill: '#666' }));
  svg.appendChild(cyG);
  const cyCone = el('path', { d: 'M480,380 L440,320 L460,310 L500,310 L520,320 Z', fill: 'rgba(251, 191, 36, 0.08)', stroke: '#fbbf24', 'stroke-width': 0.8, 'stroke-dasharray': '4 3', opacity: 0 });
  svg.appendChild(cyCone);

  const lidar = el('g', { opacity: 0 });
  for (let i = 0; i < 90; i++) {
    lidar.appendChild(el('circle', { cx: 200 + Math.random() * 400, cy: 250 + Math.random() * 200, r: 0.8, fill: '#a855f7', opacity: 0.25 + Math.random() * 0.5 }));
  }
  svg.appendChild(lidar);

  const oldBadge = el('g', { transform: 'translate(650, 42)' });
  oldBadge.appendChild(el('rect', { x: -72, y: -16, width: 144, height: 32, rx: 6, fill: 'rgba(245, 158, 11, 0.15)', stroke: '#f59e0b', 'stroke-width': 1 }));
  oldBadge.appendChild(txt(0, 5, 'HUMAN REQUIRED', 10, '#f59e0b', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(oldBadge);

  const newBadge = el('g', { transform: 'translate(650, 42)', opacity: 0 });
  newBadge.appendChild(el('rect', { x: -82, y: -16, width: 164, height: 32, rx: 6, fill: 'rgba(34, 197, 94, 0.15)', stroke: '#22c55e', 'stroke-width': 1 }));
  newBadge.appendChild(txt(0, 5, 'FULLY AUTONOMOUS', 10, '#22c55e', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(newBadge);

  const tl = gsap.timeline();
  tl.to(oldBadge, { opacity: 0, duration: 0.08 }, 0.08)
    .to(newBadge, { opacity: 1, duration: 0.08 }, 0.18)
    .to(lidar, { attr: { opacity: 0.5 }, duration: 0.12 }, 0.28)
    .to(pedArc, { attr: { opacity: 0.7 }, duration: 0.1 }, 0.44)
    .to(cyG, { attr: { opacity: 1 }, duration: 0.08 }, 0.58)
    .to(cyCone, { attr: { opacity: 1 }, duration: 0.1 }, 0.64)
    .to({}, { duration: 0.22 });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 8 — SURGICAL ROBOT
// ════════════════════════════════════════════════════════════

function surgicalRobot(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  svgBg(svg, '#080a18');

  // Operating field glow
  const defs = svgDefs(svg);
  addBlur(defs, 'opGlow', 25);
  svg.appendChild(el('ellipse', { cx: 400, cy: 320, rx: 140, ry: 50, fill: '#3b82f6', opacity: 0.04, filter: 'url(#opGlow)' }));

  svg.appendChild(el('ellipse', { cx: 400, cy: 320, rx: 110, ry: 38, fill: '#1a0e1e', stroke: '#2a1530', 'stroke-width': 1 }));
  svg.appendChild(el('line', { x1: 340, y1: 320, x2: 460, y2: 320, stroke: '#4a1530', 'stroke-width': 1.5 }));

  const sutures = el('g', { opacity: 0 });
  for (let i = 0; i < 7; i++) {
    const sx = 345 + i * 17;
    sutures.appendChild(el('line', { x1: sx, y1: 313, x2: sx + 4, y2: 327, stroke: '#3b82f6', 'stroke-width': 0.8 }));
    sutures.appendChild(el('circle', { cx: sx + 2, cy: 313, r: 1, fill: '#3b82f6' }));
  }
  svg.appendChild(sutures);

  function makeArm(tx: number) {
    const arm = el('g', { transform: `translate(${tx}, 90)` });
    arm.appendChild(el('rect', { x: -5, y: 0, width: 10, height: 80, rx: 5, fill: '#282a45', stroke: '#3a3d60', 'stroke-width': 0.8 }));
    arm.appendChild(el('circle', { cx: 0, cy: 80, r: 7, fill: '#333', stroke: '#555', 'stroke-width': 0.8 }));
    arm.appendChild(el('rect', { x: -4, y: 82, width: 8, height: 80, rx: 4, fill: '#1e2040', stroke: '#3a3d60', 'stroke-width': 0.8 }));
    arm.appendChild(el('line', { x1: -5, y1: 162, x2: -10, y2: 180, stroke: '#3b82f6', 'stroke-width': 1.2 }));
    arm.appendChild(el('line', { x1: 5, y1: 162, x2: 10, y2: 180, stroke: '#3b82f6', 'stroke-width': 1.2 }));
    return arm;
  }

  const arm1 = makeArm(240);
  const arm2 = makeArm(560);
  arm2.appendChild(el('path', { d: 'M-2,162 C-2,162 -14,178 -9,192 C-4,206 4,206 9,192 C14,178 2,162 2,162', fill: 'none', stroke: '#bbb', 'stroke-width': 1.2 }));
  svg.appendChild(arm1);
  svg.appendChild(arm2);

  // Tremor inset
  const inset = el('g', { transform: 'translate(60, 35)', opacity: 0 });
  inset.appendChild(el('rect', { x: 0, y: 0, width: 210, height: 105, rx: 8, fill: 'rgba(0,0,0,0.5)', stroke: '#1e2040', 'stroke-width': 1 }));
  inset.appendChild(txt(105, 18, 'Tremor Comparison', 9, '#555'));
  let hp = 'M18,58';
  for (let i = 1; i <= 32; i++) hp += ` L${18 + i * 5.4},${58 + Math.sin(i * 1.5) * 5 + Math.sin(i * 4.2) * 2.5}`;
  inset.appendChild(el('path', { d: hp, fill: 'none', stroke: '#ff6b35', 'stroke-width': 1.2, opacity: 0.7 }));
  inset.appendChild(txt(28, 92, 'Human', 8, '#ff6b35', 'start'));
  inset.appendChild(el('line', { x1: 18, y1: 58, x2: 190, y2: 58, stroke: '#3b82f6', 'stroke-width': 1.2 }));
  inset.appendChild(txt(140, 92, 'Robot', 8, '#3b82f6', 'start'));
  svg.appendChild(inset);

  const magRing = el('circle', { cx: 400, cy: 320, r: 55, fill: 'none', stroke: 'rgba(59, 130, 246, 0.25)', 'stroke-width': 1, 'stroke-dasharray': '3 4', opacity: 0 });
  svg.appendChild(magRing);
  const magLabel = txt(400, 392, '10\u00d7 MAGNIFICATION', 9, 'rgba(59, 130, 246, 0.4)', 'middle', 'JetBrains Mono, monospace');
  magLabel.setAttribute('opacity', '0');
  svg.appendChild(magLabel);

  const tl = gsap.timeline();
  tl.to(arm1, { attr: { transform: 'translate(305, 110)' }, duration: 0.18, ease: 'power2.inOut' }, 0)
    .to(arm2, { attr: { transform: 'translate(495, 110)' }, duration: 0.18, ease: 'power2.inOut' }, 0)
    .to(magRing, { attr: { opacity: 1 }, duration: 0.08 }, 0.2)
    .to(magLabel, { attr: { opacity: 1 }, duration: 0.08 }, 0.2)
    .to(arm2, { attr: { transform: 'translate(485, 105)' }, duration: 0.12, ease: 'sine.inOut' }, 0.32)
    .to(arm2, { attr: { transform: 'translate(505, 112)' }, duration: 0.12, ease: 'sine.inOut' }, 0.46)
    .to(sutures, { attr: { opacity: 1 }, duration: 0.12 }, 0.42)
    .to(inset, { attr: { opacity: 1 }, duration: 0.12 }, 0.62);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 9 — MARS ROVER
// ════════════════════════════════════════════════════════════

function marsRover(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  const defs = svgDefs(svg);
  const mg = el('linearGradient', { id: 'marsG', x1: 0, y1: 0, x2: 0, y2: 1 });
  mg.appendChild(el('stop', { offset: '0%', 'stop-color': '#150600' }));
  mg.appendChild(el('stop', { offset: '100%', 'stop-color': '#2a0e04' }));
  defs.appendChild(mg);
  addBlur(defs, 'marsGlow', 12);

  svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#marsG)' }));

  // Distant mountains
  svg.appendChild(el('path', { d: 'M0,340 Q80,310 160,330 Q250,345 320,315 Q400,290 480,320 Q560,340 640,310 Q720,295 800,325 L800,360 L0,360 Z', fill: '#2a0e04' }));

  // Terrain
  svg.appendChild(el('path', { d: 'M0,370 Q100,355 200,365 Q300,375 350,360 Q450,345 500,365 Q600,380 700,355 Q750,350 800,365 L800,500 L0,500 Z', fill: '#3d1a0a' }));

  // Rocks with variation
  for (const [cx, cy, rx, ry] of [[120, 382, 14, 7], [580, 370, 11, 5], [420, 378, 7, 4], [700, 375, 9, 5], [300, 380, 6, 3]]) {
    svg.appendChild(el('ellipse', { cx, cy, rx, ry, fill: '#4a2010' }));
  }

  // Rover
  const rover = el('g', { transform: 'translate(250, 352)' });
  rover.appendChild(el('rect', { x: -25, y: -20, width: 50, height: 18, rx: 4, fill: '#777', stroke: '#999', 'stroke-width': 0.5 }));
  rover.appendChild(el('line', { x1: 0, y1: -20, x2: 0, y2: -40, stroke: '#888', 'stroke-width': 1.5 }));
  rover.appendChild(el('rect', { x: -6, y: -44, width: 12, height: 6, rx: 2, fill: '#999' }));
  rover.appendChild(el('circle', { cx: 3, cy: -41, r: 2, fill: '#f97316' }));
  rover.appendChild(el('circle', { cx: -18, cy: 2, r: 6, fill: '#555', stroke: '#777', 'stroke-width': 1 }));
  rover.appendChild(el('circle', { cx: 0, cy: 3, r: 5, fill: '#555', stroke: '#777', 'stroke-width': 1 }));
  rover.appendChild(el('circle', { cx: 18, cy: 2, r: 6, fill: '#555', stroke: '#777', 'stroke-width': 1 }));
  rover.appendChild(el('rect', { x: -20, y: -26, width: 40, height: 4, rx: 1, fill: '#1e40af', stroke: '#2563eb', 'stroke-width': 0.5 }));
  svg.appendChild(rover);

  // Signal elements
  const sigGroup = el('g', { opacity: 0 });
  const sigDot = el('circle', { cx: 250, cy: 345, r: 3, fill: '#f97316' });
  sigGroup.appendChild(sigDot);
  for (let i = 1; i <= 3; i++) sigGroup.appendChild(el('circle', { cx: 250, cy: 345 - i * 10, r: 2 + i * 1.5, fill: 'none', stroke: '#f97316', 'stroke-width': 0.5, opacity: 1 - i * 0.25 }));
  svg.appendChild(sigGroup);

  const sigLine = el('line', { x1: 250, y1: 345, x2: 250, y2: 345, stroke: '#f97316', 'stroke-width': 0.8, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(sigLine);

  const earthDot = el('circle', { cx: 250, cy: 28, r: 4, fill: '#3b82f6', opacity: 0 });
  svg.appendChild(earthDot);
  const earthLbl = txt(250, 18, 'EARTH', 7, '#3b82f6', 'middle', 'JetBrains Mono, monospace');
  earthLbl.setAttribute('opacity', '0');
  svg.appendChild(earthLbl);

  const delayMin = 4 + Math.floor(Math.random() * 20);
  const delaySec = Math.floor(Math.random() * 60);
  const cdText = txt(600, 50, '', 13, '#f97316', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(cdText);
  const statusText = txt(400, 475, '', 10, 'rgba(249, 115, 22, 0.5)', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(statusText);

  // Interactive button
  const btn = el('g', { transform: 'translate(610, 435)', opacity: 0 });
  const btnBg = el('rect', { x: -62, y: -15, width: 124, height: 30, rx: 6, fill: 'rgba(249, 115, 22, 0.12)', stroke: 'rgba(249, 115, 22, 0.35)', 'stroke-width': 1 });
  btn.appendChild(btnBg);
  btn.appendChild(txt(0, 5, 'SEND COMMAND', 9, '#f97316', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(btn);

  let sent = false;
  (btn as SVGElement).style.cursor = 'pointer';
  (btn as SVGElement).style.pointerEvents = 'all';

  btn.addEventListener('mouseenter', () => {
    if (!sent) gsap.to(btnBg, { attr: { fill: 'rgba(249, 115, 22, 0.25)' }, duration: 0.2 });
  });
  btn.addEventListener('mouseleave', () => {
    if (!sent) gsap.to(btnBg, { attr: { fill: 'rgba(249, 115, 22, 0.12)' }, duration: 0.2 });
  });

  btn.addEventListener('click', () => {
    if (sent) return;
    sent = true;
    (btn as SVGElement).style.pointerEvents = 'none';
    gsap.to(btnBg, { attr: { opacity: 0.3 }, duration: 0.3 });

    const ctl = gsap.timeline();
    ctl.call(() => { statusText.textContent = 'Transmitting command\u2026'; })
      .to(sigGroup, { opacity: 1, duration: 0.3 })
      .to(sigDot, { attr: { cy: 28 }, duration: 2.5, ease: 'power1.in' })
      .call(() => { statusText.textContent = `Signal travel time: ${delayMin}m ${delaySec}s\u2026`; });

    let ticks = 10;
    const iv = setInterval(() => {
      ticks--;
      cdText.textContent = `${delayMin}m ${(delaySec + 10 - ticks) % 60}s`;
      if (ticks <= 0) {
        clearInterval(iv);
        gsap.to(cdText, {
          duration: 0.8,
          onUpdate() {
            const pp = this.progress();
            cdText.textContent = `${delayMin}m ${Math.floor((delaySec + 10 + pp * 50) % 60)}s`;
          },
          onComplete() {
            cdText.textContent = 'Command received!';
            statusText.textContent = 'Executing: DRIVE_FORWARD 1m';
            gsap.to(rover, { attr: { transform: 'translate(330, 352)' }, duration: 1.8, ease: 'power2.inOut' });
          },
        });
      }
    }, 1000);
  });

  const tl = gsap.timeline();
  tl.call(() => { statusText.textContent = 'Perseverance \u2014 Sol\u2009847 \u2014 Jezero Crater'; })
    .to(earthDot, { attr: { opacity: 0.6 }, duration: 0.08 }, 0.12)
    .to(earthLbl, { attr: { opacity: 0.4 }, duration: 0.08 }, 0.12)
    .to(sigLine, { attr: { opacity: 0.2, y2: 28 }, duration: 0.1 }, 0.22)
    .to(btn, { attr: { opacity: 1 }, duration: 0.08 }, 0.28)
    .call(() => { if (!sent) statusText.textContent = `Signal delay: ${delayMin}m ${delaySec}s one-way`; }, [], 0.48)
    .to(sigGroup, { opacity: 1, duration: 0.04 }, 0.58)
    .to(sigDot, { attr: { cy: 28 }, duration: 0.14 }, 0.58)
    .call(() => { if (!sent) { cdText.textContent = 'Command received'; statusText.textContent = 'Executing: DRIVE_FORWARD 1m'; } }, [], 0.74)
    .to(rover, { attr: { transform: 'translate(350, 352)' }, duration: 0.18, ease: 'power2.inOut' }, 0.78);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 10 — STARLINK
// ════════════════════════════════════════════════════════════

function starlink(container: HTMLElement): gsap.core.Timeline {
  const { ctx } = makeCanvas(container);
  const ecx = 400, ecy = 360, eR = 115;

  interface Sat { oR: number; a: number; spd: number }
  const maxS = 130;
  const sats: Sat[] = [];
  for (let i = 0; i < maxS; i++) sats.push({ oR: eR + 28 + Math.random() * 85, a: Math.random() * Math.PI * 2, spd: (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1) });

  // Deterministic stars
  const bgStars: [number, number, number][] = [];
  let seed = 42;
  for (let i = 0; i < 80; i++) {
    seed = (seed * 16807) % 2147483647;
    const sx = seed % W;
    seed = (seed * 16807) % 2147483647;
    const sy = seed % H;
    bgStars.push([sx, sy, 0.08 + (seed % 25) / 100]);
  }

  const progress = { value: 0 };

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#040410';
    ctx.fillRect(0, 0, W, H);

    for (const [sx, sy, sb] of bgStars) { ctx.fillStyle = `rgba(255,255,255,${sb})`; ctx.fillRect(sx, sy, 1, 1); }

    const p = progress.value;
    const vis = Math.floor(p * maxS);

    // Earth glow
    const eg = ctx.createRadialGradient(ecx, ecy, eR - 10, ecx, ecy, eR + 45);
    eg.addColorStop(0, 'rgba(30, 70, 160, 0.25)');
    eg.addColorStop(1, 'rgba(30, 70, 160, 0)');
    ctx.fillStyle = eg;
    ctx.beginPath();
    ctx.arc(ecx, ecy, eR + 45, 0, Math.PI * 2);
    ctx.fill();

    const ef = ctx.createRadialGradient(ecx - 18, ecy - 18, 8, ecx, ecy, eR);
    ef.addColorStop(0, '#1a4488');
    ef.addColorStop(0.5, '#0d2550');
    ef.addColorStop(1, '#061530');
    ctx.fillStyle = ef;
    ctx.beginPath();
    ctx.arc(ecx, ecy, eR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 0.5;
    for (const r of [eR + 35, eR + 60, eR + 85]) { ctx.beginPath(); ctx.arc(ecx, ecy, r, 0, Math.PI * 2); ctx.stroke(); }

    for (let i = 0; i < vis; i++) {
      const s = sats[i];
      const a = s.a + p * s.spd * 3;
      const sx = ecx + Math.cos(a) * s.oR;
      const sy = ecy + Math.sin(a) * s.oR * 0.38;
      if (Math.sin(a) > 0.3 && s.oR < eR + 48) continue;

      const flash = Math.sin(p * 55 + i * 7) > 0.93;
      if (flash) {
        ctx.fillStyle = 'rgba(129, 140, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = flash ? '#818cf8' : 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.3, 0, Math.PI * 2);
      ctx.fill();

      if (i > 0 && i % 7 === 0) {
        const j = i - 1;
        const a2 = sats[j].a + p * sats[j].spd * 3;
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.08)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ecx + Math.cos(a2) * sats[j].oR, ecy + Math.sin(a2) * sats[j].oR * 0.38);
        ctx.stroke();
      }
    }

    drawScanLines(ctx, 0.01);

    ctx.fillStyle = 'rgba(129, 140, 248, 0.5)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Satellites: ${vis.toLocaleString()}`, 770, 26);
    ctx.fillStyle = 'rgba(249, 115, 22, 0.35)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`Debris tracked: ${Math.floor(p * 30000).toLocaleString()}`, 770, 44);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });
  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 11 — ALPHAFOLD
// ════════════════════════════════════════════════════════════

function alphaFold(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG();
  container.appendChild(svg);
  svgBg(svg, '#080612');

  const n = 22;
  const residues: SVGCircleElement[] = [];
  const bonds: SVGLineElement[] = [];
  const sx = 60, sy = 240;
  const colors = ['#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'];

  const folded: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 3.2;
    const r = 65 + Math.sin(i * 0.5) * 28;
    folded.push({ x: 360 + Math.cos(a) * r, y: 240 + Math.sin(a) * r * 0.55 + (i - n / 2) * 2.5 });
  }

  const cg = el('g', {});
  for (let i = 0; i < n; i++) {
    const lx = sx + i * 30;
    if (i > 0) {
      const b = el('line', { x1: sx + (i - 1) * 30, y1: sy, x2: lx, y2: sy, stroke: '#2a1e50', 'stroke-width': 2 }) as unknown as SVGLineElement;
      cg.appendChild(b);
      bonds.push(b);
    }
    const c = el('circle', { cx: lx, cy: sy, r: 7, fill: colors[i % colors.length], stroke: 'rgba(255,255,255,0.15)', 'stroke-width': 0.5, opacity: 0.85 }) as unknown as SVGCircleElement;
    cg.appendChild(c);
    residues.push(c);
  }
  svg.appendChild(cg);

  // Progress bars
  const bg1 = el('g', { transform: 'translate(70, 438)' });
  bg1.appendChild(el('rect', { x: 0, y: 0, width: 300, height: 7, rx: 3.5, fill: '#140e25' }));
  const aiBar = el('rect', { x: 0, y: 0, width: 0, height: 7, rx: 3.5, fill: '#a855f7' });
  bg1.appendChild(aiBar);
  bg1.appendChild(txt(150, -10, 'AlphaFold', 9, '#a855f7'));
  svg.appendChild(bg1);

  const bg2 = el('g', { transform: 'translate(430, 438)' });
  bg2.appendChild(el('rect', { x: 0, y: 0, width: 300, height: 7, rx: 3.5, fill: '#140e25' }));
  const labBar = el('rect', { x: 0, y: 0, width: 0, height: 7, rx: 3.5, fill: '#ff6b35', opacity: 0.5 });
  bg2.appendChild(labBar);
  bg2.appendChild(txt(150, -10, 'Lab Experiment', 9, '#ff6b35'));
  svg.appendChild(bg2);

  const aiPct = txt(70, 462, '0%', 10, '#a855f7', 'start', 'JetBrains Mono, monospace');
  const labPct = txt(430, 462, '0%', 10, 'rgba(255, 107, 53, 0.5)', 'start', 'JetBrains Mono, monospace');
  svg.appendChild(aiPct);
  svg.appendChild(labPct);

  const tl = gsap.timeline();

  residues.forEach((r, i) => {
    const t = folded[i];
    tl.to(r, { attr: { cx: t.x, cy: t.y }, duration: 0.45, ease: 'power2.inOut' }, 0.08 + i * 0.018);
  });
  bonds.forEach((b, i) => {
    const f = folded[i], t = folded[i + 1];
    tl.to(b, { attr: { x1: f.x, y1: f.y, x2: t.x, y2: t.y }, duration: 0.45, ease: 'power2.inOut' }, 0.08 + i * 0.018);
  });

  tl.to(aiBar, { attr: { width: 300 }, duration: 0.35, ease: 'power2.out' }, 0.3)
    .to(labBar, { attr: { width: 7 }, duration: 0.35, ease: 'none' }, 0.3)
    .call(() => { aiPct.textContent = '25%'; labPct.textContent = '0.1%'; }, [], 0.38)
    .call(() => { aiPct.textContent = '50%'; labPct.textContent = '0.2%'; }, [], 0.48)
    .call(() => { aiPct.textContent = '75%'; labPct.textContent = '0.4%'; }, [], 0.58)
    .call(() => { aiPct.textContent = '100%'; labPct.textContent = '0.7%'; }, [], 0.68);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 12 — VON NEUMANN PROBE
// ════════════════════════════════════════════════════════════

function vonNeumann(container: HTMLElement): gsap.core.Timeline {
  const { ctx } = makeCanvas(container);

  const bgStars: [number, number, number][] = [];
  for (let i = 0; i < 180; i++) bgStars.push([Math.random() * W, Math.random() * H, 0.08 + Math.random() * 0.35]);

  interface PN { sx: number; sy: number; ex: number; ey: number; d: number; sp: number; children: PN[] }

  function build(x: number, y: number, a: number, d: number, sp: number): PN {
    const len = Math.max(18, 78 - d * 10);
    const ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
    const n: PN = { sx: x, sy: y, ex, ey, d, sp, children: [] };
    if (d < 6) {
      const spread = 0.38 + (d * 17 % 7) * 0.06;
      const cs = sp + (1 - sp) * 0.14;
      n.children.push(build(ex, ey, a - spread, d + 1, cs));
      n.children.push(build(ex, ey, a + spread, d + 1, cs));
    }
    return n;
  }

  const tree = build(90, 410, -Math.PI * 0.35, 0, 0);
  const progress = { value: 0 };

  function drawN(n: PN) {
    const p = progress.value;
    if (p < n.sp) return;
    const lp = Math.min(1, (p - n.sp) / (1 - n.sp) * 3);
    const dx = n.sx + (n.ex - n.sx) * lp, dy = n.sy + (n.ey - n.sy) * lp;

    const a = Math.max(0.08, 0.55 - n.d * 0.07);
    ctx.strokeStyle = `rgba(251, 191, 36, ${a})`;
    ctx.lineWidth = Math.max(0.4, 2.2 - n.d * 0.28);
    ctx.beginPath();
    ctx.moveTo(n.sx, n.sy);
    ctx.lineTo(dx, dy);
    ctx.stroke();

    if (lp > 0.8) {
      const da = (lp - 0.8) * 5;
      ctx.fillStyle = `rgba(251, 191, 36, ${da * 0.7})`;
      ctx.beginPath();
      ctx.arc(dx, dy, Math.max(1, 2.8 - n.d * 0.3), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(251, 191, 36, ${da * 0.15})`;
      ctx.beginPath();
      ctx.arc(dx, dy, Math.max(2, 7 - n.d * 0.7), 0, Math.PI * 2);
      ctx.fill();
    }

    if (lp >= 1 && n.d < 6) {
      ctx.fillStyle = 'rgba(120, 90, 50, 0.4)';
      ctx.beginPath();
      ctx.arc(n.ex, n.ey, Math.max(1.5, 3.5 - n.d * 0.35), 0, Math.PI * 2);
      ctx.fill();
    }
    if (lp >= 0.9) for (const c of n.children) drawN(c);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#020206';
    ctx.fillRect(0, 0, W, H);
    for (const [sx, sy, sb] of bgStars) { ctx.fillStyle = `rgba(255,255,255,${sb})`; ctx.fillRect(sx, sy, 1, 1); }

    const p = progress.value;
    const es = Math.max(0.08, 1 - p * 0.85);
    const er = 22 * es;
    if (er > 1.5) {
      const eg = ctx.createRadialGradient(75, 425, 0, 75, 425, er);
      eg.addColorStop(0, '#2255aa');
      eg.addColorStop(1, '#0a1530');
      ctx.fillStyle = eg;
      ctx.beginPath();
      ctx.arc(75, 425, er, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(200, 220, 255, 0.4)';
      ctx.font = '8px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Earth', 75, 425 + er + 10);
    }

    drawN(tree);

    let count = 0;
    (function cv(n: PN) { if (progress.value >= n.sp) { count++; for (const c of n.children) cv(c); } })(tree);

    drawScanLines(ctx, 0.008);

    ctx.fillStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Probes: ${count}`, 770, 24);
    ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillText(`T + ${Math.floor(p * 5_000_000).toLocaleString()} years`, 770, 42);
  }

  draw();
  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'power1.in' });
  return tl;
}
