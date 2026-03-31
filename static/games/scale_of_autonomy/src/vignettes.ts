import gsap from 'gsap';

// ════════════════════════════════════════════════════════════
// SVG HELPERS
// ════════════════════════════════════════════════════════════

const NS = 'http://www.w3.org/2000/svg';

function makeSVG(w: number, h: number): SVGSVGElement {
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.style.width = '100%';
  svg.style.height = '100%';
  return svg;
}

function el(tag: string, attrs: Record<string, string | number>): SVGElement {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs))
    e.setAttribute(k, String(v));
  return e;
}

function text(
  x: number,
  y: number,
  content: string,
  size: number,
  color = '#fff',
  anchor = 'middle',
  family = 'Inter, sans-serif',
): SVGTextElement {
  const t = el('text', {
    x,
    y,
    fill: color,
    'font-size': size,
    'text-anchor': anchor,
    'font-family': family,
  }) as SVGTextElement;
  t.textContent = content;
  return t;
}

// ════════════════════════════════════════════════════════════
// DISPATCHER
// ════════════════════════════════════════════════════════════

export function createVignette(
  levelId: number,
  container: HTMLElement,
): gsap.core.Timeline {
  const fns: Record<number, (c: HTMLElement) => gsap.core.Timeline> = {
    1: thermostat,
    2: cruiseControl,
    3: roomba,
    4: drone,
    5: warehouse,
    6: selfDrivingL2,
    7: selfDrivingL4,
    8: surgicalRobot,
    9: marsRover,
    10: starlink,
    11: alphaFold,
    12: vonNeumann,
  };
  return (fns[levelId] ?? fallback)(container);
}

function fallback(container: HTMLElement): gsap.core.Timeline {
  container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-size:1.2rem;">Vignette</div>';
  return gsap.timeline();
}

// ════════════════════════════════════════════════════════════
// LEVEL 1 — THERMOSTAT
// ════════════════════════════════════════════════════════════

function thermostat(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  // Room backdrop
  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#12142a', rx: 0 }));

  // Wall line
  svg.appendChild(el('line', { x1: 0, y1: 380, x2: 800, y2: 380, stroke: '#1e2040', 'stroke-width': 2 }));

  // Thermometer
  const thermGroup = el('g', { transform: 'translate(180, 80)' });
  thermGroup.appendChild(el('rect', { x: 0, y: 0, width: 28, height: 240, rx: 14, fill: '#1e2040', stroke: '#2a2d55', 'stroke-width': 1.5 }));
  thermGroup.appendChild(el('circle', { cx: 14, cy: 270, r: 24, fill: '#ff4444' }));

  // Mercury column
  const mercury = el('rect', { x: 6, y: 180, width: 16, height: 60, rx: 8, fill: '#ff4444' });
  thermGroup.appendChild(mercury);

  // Tick marks
  for (let i = 0; i < 6; i++) {
    const ty = 20 + i * 40;
    thermGroup.appendChild(el('line', { x1: 30, y1: ty, x2: 40, y2: ty, stroke: '#2a2d55', 'stroke-width': 1 }));
  }

  const tempLabel = text(14, -10, '68°F', 18, '#aab', 'middle', 'JetBrains Mono, monospace');
  thermGroup.appendChild(tempLabel);
  svg.appendChild(thermGroup);

  // Switch
  const switchGroup = el('g', { transform: 'translate(380, 160)' });
  switchGroup.appendChild(el('rect', { x: 0, y: 0, width: 50, height: 90, rx: 25, fill: '#1a1c38', stroke: '#2a2d55', 'stroke-width': 1.5 }));
  const knob = el('circle', { cx: 25, cy: 62, r: 18, fill: '#555' });
  switchGroup.appendChild(knob);
  const switchLabel = text(25, -14, 'OFF', 13, '#666', 'middle', 'JetBrains Mono, monospace');
  switchGroup.appendChild(switchLabel);
  svg.appendChild(switchGroup);

  // Radiator
  const radGroup = el('g', { transform: 'translate(560, 160)' });
  for (let i = 0; i < 6; i++) {
    radGroup.appendChild(el('rect', { x: i * 22, y: 0, width: 14, height: 160, rx: 4, fill: '#222444', stroke: '#2a2d55', 'stroke-width': 1 }));
  }
  const radGlow = el('rect', { x: -10, y: -10, width: 150, height: 180, rx: 12, fill: '#ff4400', opacity: 0 });
  radGlow.setAttribute('filter', 'url(#blur1)');
  radGroup.appendChild(radGlow);
  svg.appendChild(radGroup);

  // Filter for glow
  const defs = el('defs', {});
  const blurFilter = el('filter', { id: 'blur1', x: '-50%', y: '-50%', width: '200%', height: '200%' });
  blurFilter.appendChild(el('feGaussianBlur', { stdDeviation: 20 }));
  defs.appendChild(blurFilter);
  svg.appendChild(defs);

  // Connection lines (dashed)
  const line1 = el('line', { x1: 220, y1: 220, x2: 380, y2: 220, stroke: '#00d4ff', 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0 });
  const line2 = el('line', { x1: 430, y1: 220, x2: 560, y2: 220, stroke: '#ff6633', 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0 });
  svg.appendChild(line1);
  svg.appendChild(line2);

  // Timeline
  const tl = gsap.timeline();

  // Cold phase — mercury drops
  tl.to(mercury, { attr: { y: 210, height: 30 }, duration: 0.15, ease: 'none' })
    .call(() => { tempLabel.textContent = '62°F'; }, [], 0.05)
    .call(() => { tempLabel.textContent = '60°F'; }, [], 0.12)
    // Signal from thermo to switch
    .to(line1, { opacity: 0.7, duration: 0.05 }, 0.15)
    // Switch ON
    .to(knob, { attr: { cy: 28 }, duration: 0.04 }, 0.2)
    .call(() => { (knob as SVGCircleElement).setAttribute('fill', '#4CAF50'); switchLabel.textContent = 'ON'; }, [], 0.2)
    // Signal from switch to radiator
    .to(line2, { opacity: 0.7, duration: 0.05 }, 0.25)
    // Radiator heats
    .to(radGlow, { attr: { opacity: 0.25 }, duration: 0.2, ease: 'power2.in' }, 0.28)
    // Mercury rises
    .to(mercury, { attr: { y: 120, height: 120 }, duration: 0.3, ease: 'none' }, 0.3)
    .call(() => { tempLabel.textContent = '65°F'; }, [], 0.4)
    .call(() => { tempLabel.textContent = '68°F'; }, [], 0.5)
    .call(() => { tempLabel.textContent = '72°F'; }, [], 0.6)
    // Too warm — switch OFF
    .to(line1, { opacity: 0.3, duration: 0.03 }, 0.65)
    .to(knob, { attr: { cy: 62 }, duration: 0.04 }, 0.68)
    .call(() => { (knob as SVGCircleElement).setAttribute('fill', '#555'); switchLabel.textContent = 'OFF'; }, [], 0.68)
    // Radiator cools
    .to(radGlow, { attr: { opacity: 0 }, duration: 0.15 }, 0.7)
    .to(line2, { opacity: 0, duration: 0.1 }, 0.7)
    .to(line1, { opacity: 0, duration: 0.1 }, 0.75)
    // Mercury settles
    .to(mercury, { attr: { y: 160, height: 80 }, duration: 0.15, ease: 'none' }, 0.8)
    .call(() => { tempLabel.textContent = '68°F'; }, [], 0.9);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 2 — CRUISE CONTROL
// ════════════════════════════════════════════════════════════

function cruiseControl(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#0e1025' }));

  // Road group that tilts
  const roadGroup = el('g', { transform: 'translate(0, 0)' });

  // Road surface
  roadGroup.appendChild(el('rect', { x: 0, y: 300, width: 800, height: 200, fill: '#1a1c30' }));
  // Road line
  const roadLine = el('line', { x1: 0, y1: 300, x2: 800, y2: 300, stroke: '#2a2d55', 'stroke-width': 2 });
  roadGroup.appendChild(roadLine);
  // Dashed center line
  for (let i = 0; i < 12; i++) {
    roadGroup.appendChild(el('rect', { x: 30 + i * 65, y: 388, width: 40, height: 4, rx: 2, fill: '#3a3d60' }));
  }
  svg.appendChild(roadGroup);

  // Car body
  const carGroup = el('g', { transform: 'translate(280, 310)' });
  carGroup.appendChild(el('rect', { x: 0, y: 20, width: 160, height: 50, rx: 8, fill: '#334' }));
  carGroup.appendChild(el('rect', { x: 20, y: 0, width: 110, height: 30, rx: 6, fill: '#2a2d45' }));
  // Wheels
  carGroup.appendChild(el('circle', { cx: 35, cy: 72, r: 14, fill: '#1a1c30', stroke: '#444', 'stroke-width': 2 }));
  carGroup.appendChild(el('circle', { cx: 130, cy: 72, r: 14, fill: '#1a1c30', stroke: '#444', 'stroke-width': 2 }));
  // Headlight
  const headlight = el('rect', { x: 155, y: 30, width: 8, height: 12, rx: 2, fill: '#ffcc44', opacity: 0.6 });
  carGroup.appendChild(headlight);
  // Engine glow
  const engineGlow = el('rect', { x: 20, y: 25, width: 100, height: 20, rx: 6, fill: '#00d4ff', opacity: 0 });
  engineGlow.setAttribute('filter', 'url(#blur2)');
  carGroup.appendChild(engineGlow);
  svg.appendChild(carGroup);

  // Speedometer
  const speedo = el('g', { transform: 'translate(650, 120)' });
  speedo.appendChild(el('circle', { cx: 0, cy: 0, r: 55, fill: 'none', stroke: '#2a2d55', 'stroke-width': 2 }));
  speedo.appendChild(el('circle', { cx: 0, cy: 0, r: 4, fill: '#fff' }));
  // Speed marks
  for (let i = 0; i <= 10; i++) {
    const angle = -Math.PI * 0.8 + (i / 10) * Math.PI * 1.6;
    const x1 = Math.cos(angle) * 45;
    const y1 = Math.sin(angle) * 45;
    const x2 = Math.cos(angle) * 50;
    const y2 = Math.sin(angle) * 50;
    speedo.appendChild(el('line', { x1, y1, x2, y2, stroke: '#555', 'stroke-width': 1.5 }));
  }
  // Needle (pointing at ~65mph position)
  const needleAngle = -Math.PI * 0.8 + 0.65 * Math.PI * 1.6;
  const needle = el('line', {
    x1: 0,
    y1: 0,
    x2: Math.cos(needleAngle) * 40,
    y2: Math.sin(needleAngle) * 40,
    stroke: '#ff4444',
    'stroke-width': 2,
    'stroke-linecap': 'round',
  });
  speedo.appendChild(needle);
  const speedText = text(0, 30, '65', 16, '#00d4ff', 'middle', 'JetBrains Mono, monospace');
  speedo.appendChild(speedText);
  const mphLabel = text(0, 46, 'MPH', 9, '#555');
  speedo.appendChild(mphLabel);
  svg.appendChild(speedo);

  // "SET" indicator
  const setInd = text(650, 200, 'SET: 65 MPH', 11, '#4CAF50', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(setInd);

  // Blur filter
  const defs = el('defs', {});
  const bf = el('filter', { id: 'blur2', x: '-50%', y: '-50%', width: '200%', height: '200%' });
  bf.appendChild(el('feGaussianBlur', { stdDeviation: 8 }));
  defs.appendChild(bf);
  svg.appendChild(defs);

  // Hill labels
  const hillLabel = text(400, 270, '', 14, 'rgba(255,255,255,0.3)', 'middle');
  svg.appendChild(hillLabel);

  const tl = gsap.timeline();

  // Flat road
  tl.set(hillLabel, { textContent: 'Flat road' })
    .to({}, { duration: 0.15 })
    // Uphill
    .call(() => { hillLabel.textContent = '▲ Uphill'; }, [], 0.15)
    .to(roadGroup, { attr: { transform: 'translate(0, 0) rotate(-4, 400, 400)' }, duration: 0.2, ease: 'power2.inOut' }, 0.15)
    .to(engineGlow, { attr: { opacity: 0.4 }, duration: 0.15 }, 0.2)
    // Hold uphill
    .to({}, { duration: 0.15 })
    // Downhill
    .call(() => { hillLabel.textContent = '▼ Downhill'; }, [], 0.5)
    .to(roadGroup, { attr: { transform: 'translate(0, 0) rotate(4, 400, 400)' }, duration: 0.2, ease: 'power2.inOut' }, 0.5)
    .to(engineGlow, { attr: { opacity: 0 }, duration: 0.15 }, 0.55)
    // Hold downhill
    .to({}, { duration: 0.1 })
    // Back to flat
    .call(() => { hillLabel.textContent = 'Flat road'; }, [], 0.8)
    .to(roadGroup, { attr: { transform: 'translate(0, 0) rotate(0, 400, 400)' }, duration: 0.15, ease: 'power2.inOut' }, 0.8);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 3 — ROOMBA
// ════════════════════════════════════════════════════════════

function roomba(container: HTMLElement): gsap.core.Timeline {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Room layout
  const walls = [
    { x: 40, y: 40, w: 720, h: 420 }, // outer room
  ];
  const furniture = [
    { x: 200, y: 80, w: 100, h: 60 },  // table
    { x: 500, y: 300, w: 80, h: 80 },   // chair
    { x: 100, y: 300, w: 60, h: 100 },  // shelf
    { x: 550, y: 80, w: 120, h: 50 },   // couch
  ];

  // Pre-compute roomba path using a simplified bump-and-turn
  interface Pos { x: number; y: number; angle: number; }
  const path: Pos[] = [];
  let rx = 400, ry = 250, ra = 0;
  const roombaR = 15;
  const steps = 600;

  for (let i = 0; i < steps; i++) {
    const dx = Math.cos(ra) * 3;
    const dy = Math.sin(ra) * 3;
    let nx = rx + dx;
    let ny = ry + dy;
    let bumped = false;

    // Wall collision
    if (nx - roombaR < 40 || nx + roombaR > 760 || ny - roombaR < 40 || ny + roombaR > 460) {
      bumped = true;
    }
    // Furniture collision
    for (const f of furniture) {
      if (nx + roombaR > f.x && nx - roombaR < f.x + f.w && ny + roombaR > f.y && ny - roombaR < f.y + f.h) {
        bumped = true;
        break;
      }
    }

    if (bumped) {
      ra += Math.PI * (0.3 + Math.random() * 0.9);
    } else {
      rx = nx;
      ry = ny;
      ra += 0.02; // slight spiral bias
    }
    path.push({ x: rx, y: ry, angle: ra });
  }

  const progress = { value: 0 };

  function draw() {
    ctx.clearRect(0, 0, 800, 500);

    // Background
    ctx.fillStyle = '#0e1025';
    ctx.fillRect(0, 0, 800, 500);

    // Room floor
    ctx.fillStyle = '#151730';
    ctx.fillRect(40, 40, 720, 420);

    // Cleaned trail
    const trailEnd = Math.floor(progress.value * path.length);
    ctx.fillStyle = 'rgba(0, 212, 255, 0.04)';
    for (let i = 0; i < trailEnd; i += 2) {
      ctx.beginPath();
      ctx.arc(path[i].x, path[i].y, roombaR + 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Furniture
    ctx.fillStyle = '#222444';
    ctx.strokeStyle = '#2a2d55';
    ctx.lineWidth = 1;
    for (const f of furniture) {
      ctx.fillRect(f.x, f.y, f.w, f.h);
      ctx.strokeRect(f.x, f.y, f.w, f.h);
    }

    // Walls
    ctx.strokeStyle = '#3a3d60';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 720, 420);

    // Roomba
    if (trailEnd > 0) {
      const pos = path[Math.min(trailEnd - 1, path.length - 1)];
      ctx.save();
      ctx.translate(pos.x, pos.y);

      // Glow
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
      grd.addColorStop(0, 'rgba(0, 212, 255, 0.15)');
      grd.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.arc(0, 0, roombaR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Direction indicator
      ctx.rotate(pos.angle);
      ctx.fillStyle = '#00d4ff';
      ctx.beginPath();
      ctx.arc(roombaR - 4, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Coverage percentage
    const coverage = Math.min(100, Math.round((trailEnd / path.length) * 95));
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.font = '13px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Coverage: ${coverage}%`, 740, 32);
  }

  draw();

  const tl = gsap.timeline({
    onUpdate: draw,
  });
  tl.to(progress, { value: 1, duration: 1, ease: 'none' });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 4 — DRONE
// ════════════════════════════════════════════════════════════

function drone(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#080a18' }));

  // Parallax sky layers
  const skyLayer1 = el('rect', { x: 0, y: 350, width: 800, height: 150, fill: '#111328', rx: 0 });
  const skyLayer2 = el('rect', { x: 0, y: 380, width: 800, height: 120, fill: '#161838', rx: 0 });
  svg.appendChild(skyLayer1);
  svg.appendChild(skyLayer2);

  // Trees/buildings (background)
  for (let i = 0; i < 8; i++) {
    const bx = 30 + i * 100 + Math.random() * 40;
    const bh = 40 + Math.random() * 80;
    svg.appendChild(el('rect', { x: bx, y: 350 - bh, width: 30 + Math.random() * 20, height: bh + 150, fill: '#1a1d35', rx: 3 }));
  }

  // Ground
  svg.appendChild(el('rect', { x: 0, y: 430, width: 800, height: 70, fill: '#1a1d35' }));

  // Obstacle that slides in
  const obstacle = el('rect', { x: 900, y: 200, width: 50, height: 140, rx: 5, fill: '#2a2050', stroke: '#4a3080', 'stroke-width': 1 });
  svg.appendChild(obstacle);

  // Drone body group
  const droneGroup = el('g', { transform: 'translate(350, 200)' });

  // Sensor cones
  const sensorDown = el('polygon', { points: '-30,20 30,20 10,120 -10,120', fill: 'rgba(0, 212, 255, 0.08)', stroke: 'rgba(0, 212, 255, 0.2)', 'stroke-width': 0.5 });
  const sensorFront = el('polygon', { points: '50,0 50,-10 140,30 140,40', fill: 'rgba(0, 212, 255, 0.06)', stroke: 'rgba(0, 212, 255, 0.15)', 'stroke-width': 0.5 });
  droneGroup.appendChild(sensorDown);
  droneGroup.appendChild(sensorFront);

  // Body
  droneGroup.appendChild(el('rect', { x: -35, y: -8, width: 70, height: 16, rx: 4, fill: '#333', stroke: '#555', 'stroke-width': 1 }));
  // Arms
  droneGroup.appendChild(el('line', { x1: -35, y1: 0, x2: -60, y2: -20, stroke: '#444', 'stroke-width': 2 }));
  droneGroup.appendChild(el('line', { x1: 35, y1: 0, x2: 60, y2: -20, stroke: '#444', 'stroke-width': 2 }));
  // Propellers
  const prop1 = el('ellipse', { cx: -60, cy: -22, rx: 18, ry: 3, fill: 'rgba(255,255,255,0.15)' });
  const prop2 = el('ellipse', { cx: 60, cy: -22, rx: 18, ry: 3, fill: 'rgba(255,255,255,0.15)' });
  droneGroup.appendChild(prop1);
  droneGroup.appendChild(prop2);
  // Status LED
  const led = el('circle', { cx: 0, cy: -10, r: 3, fill: '#4CAF50' });
  droneGroup.appendChild(led);
  // GPS indicator
  const gpsLabel = text(0, -30, 'GPS ●', 10, '#4CAF50', 'middle', 'JetBrains Mono, monospace');
  droneGroup.appendChild(gpsLabel);

  svg.appendChild(droneGroup);

  // Wind arrows
  const windGroup = el('g', { opacity: 0 });
  for (let i = 0; i < 4; i++) {
    const wy = 160 + i * 30;
    const arrow = el('line', { x1: 150, y1: wy, x2: 210, y2: wy, stroke: '#558', 'stroke-width': 1.5, 'stroke-dasharray': '6 4' });
    windGroup.appendChild(arrow);
    const arrowHead = el('polygon', { points: `210,${wy - 4} 220,${wy} 210,${wy + 4}`, fill: '#558' });
    windGroup.appendChild(arrowHead);
  }
  const windLabel = text(185, 145, 'WIND', 10, '#558');
  windGroup.appendChild(windLabel);
  svg.appendChild(windGroup);

  const tl = gsap.timeline();

  // Hovering, gentle bob
  tl.to(droneGroup, { attr: { transform: 'translate(350, 195)' }, duration: 0.08, ease: 'sine.inOut' })
    .to(droneGroup, { attr: { transform: 'translate(350, 205)' }, duration: 0.08, ease: 'sine.inOut' })
    // Wind appears and pushes drone right
    .to(windGroup, { attr: { opacity: 1 }, duration: 0.05 }, 0.18)
    .to(droneGroup, { attr: { transform: 'translate(400, 208)' }, duration: 0.12, ease: 'power2.out' }, 0.2)
    // Auto-correct back
    .to(droneGroup, { attr: { transform: 'translate(350, 200)' }, duration: 0.12, ease: 'power2.inOut' }, 0.35)
    .to(windGroup, { attr: { opacity: 0 }, duration: 0.05 }, 0.45)
    // Obstacle slides in
    .to(obstacle, { attr: { x: 480 }, duration: 0.15, ease: 'power2.out' }, 0.52)
    // Drone rises to avoid
    .to(droneGroup, { attr: { transform: 'translate(350, 120)' }, duration: 0.15, ease: 'power2.inOut' }, 0.6)
    // Drone passes over obstacle
    .to(droneGroup, { attr: { transform: 'translate(550, 120)' }, duration: 0.12, ease: 'none' }, 0.76)
    // Drone descends back
    .to(droneGroup, { attr: { transform: 'translate(550, 200)' }, duration: 0.1, ease: 'power2.inOut' }, 0.88);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 5 — WAREHOUSE ROBOTS
// ════════════════════════════════════════════════════════════

function warehouse(container: HTMLElement): gsap.core.Timeline {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Grid
  const gridSize = 40;
  const cols = 18;
  const rows = 11;
  const ox = 40;
  const oy = 25;

  // Robot paths (pre-computed waypoints)
  interface WP { x: number; y: number; }
  interface Bot { path: WP[]; color: string; highlight: boolean; carrying: boolean; }

  function gridPos(c: number, r: number): WP {
    return { x: ox + c * gridSize + gridSize / 2, y: oy + r * gridSize + gridSize / 2 };
  }

  const bots: Bot[] = [
    { path: [gridPos(2, 2), gridPos(2, 8), gridPos(10, 8), gridPos(10, 3), gridPos(2, 3), gridPos(2, 2)], color: '#00d4ff', highlight: true, carrying: false },
    { path: [gridPos(5, 1), gridPos(5, 5), gridPos(12, 5), gridPos(12, 1)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(14, 9), gridPos(14, 4), gridPos(8, 4), gridPos(8, 9)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(16, 2), gridPos(16, 7), gridPos(11, 7), gridPos(11, 2)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(1, 6), gridPos(7, 6), gridPos(7, 1), gridPos(1, 1)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(9, 9), gridPos(15, 9), gridPos(15, 2), gridPos(9, 2)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(3, 4), gridPos(3, 9), gridPos(13, 9), gridPos(13, 4)], color: '#555', highlight: false, carrying: false },
    { path: [gridPos(6, 3), gridPos(6, 7), gridPos(16, 7), gridPos(16, 3)], color: '#555', highlight: false, carrying: false },
  ];

  const progress = { value: 0 };

  function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  function getBotPos(bot: Bot, p: number): WP {
    const totalSegments = bot.path.length;
    const segF = p * totalSegments;
    const segIdx = Math.floor(segF) % totalSegments;
    const segT = segF - Math.floor(segF);
    const from = bot.path[segIdx];
    const to = bot.path[(segIdx + 1) % totalSegments];
    return { x: lerp(from.x, to.x, segT), y: lerp(from.y, to.y, segT) };
  }

  function draw() {
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillStyle = '#0a0c1a';
    ctx.fillRect(0, 0, 800, 500);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(ox + c * gridSize, oy);
      ctx.lineTo(ox + c * gridSize, oy + rows * gridSize);
      ctx.stroke();
    }
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(ox, oy + r * gridSize);
      ctx.lineTo(ox + cols * gridSize, oy + r * gridSize);
      ctx.stroke();
    }

    // Shelf areas (static)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    const shelves = [[4, 1, 2, 3], [7, 1, 2, 3], [10, 5, 2, 3], [13, 1, 2, 3], [4, 6, 2, 3]];
    for (const [sc, sr, sw, sh] of shelves) {
      ctx.fillRect(ox + sc * gridSize + 2, oy + sr * gridSize + 2, sw * gridSize - 4, sh * gridSize - 4);
    }

    const p = progress.value;

    // Highlighted robot trail
    const hlBot = bots[0];
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const trailSteps = Math.floor(p * 80);
    for (let i = 0; i <= trailSteps; i++) {
      const tp = (i / 80);
      const pos = getBotPos(hlBot, tp);
      if (i === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw all bots
    for (const bot of bots) {
      const pos = getBotPos(bot, p);
      const isHL = bot.highlight;

      if (isHL) {
        // Glow
        const grd = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 25);
        grd.addColorStop(0, 'rgba(0, 212, 255, 0.2)');
        grd.addColorStop(1, 'rgba(0, 212, 255, 0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = isHL ? '#00d4ff' : '#444';
      ctx.fillRect(pos.x - 8, pos.y - 8, 16, 16);

      if (isHL && p > 0.3 && p < 0.7) {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        ctx.fillRect(pos.x - 12, pos.y - 12, 24, 24);
      }
    }

    // Robot count
    ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Active robots: ${bots.length}`, 750, 490);
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
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#0a0c1a' }));

  // Sky gradient
  const defs = el('defs', {});
  const skyGrad = el('linearGradient', { id: 'skyGrad6', x1: 0, y1: 0, x2: 0, y2: 1 });
  skyGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#1a1c30' }));
  skyGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#0a0c1a' }));
  defs.appendChild(skyGrad);
  svg.appendChild(defs);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 250, fill: 'url(#skyGrad6)' }));

  // Road (perspective trapezoid)
  const road = el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#1a1c30' });
  svg.appendChild(road);

  // Lane markings
  const laneLeft = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#2a2d55', 'stroke-width': 2, 'stroke-dasharray': '10 8' });
  const laneRight = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#2a2d55', 'stroke-width': 2, 'stroke-dasharray': '10 8' });
  const laneCenter = el('line', { x1: 400, y1: 250, x2: 400, y2: 500, stroke: '#3a3d60', 'stroke-width': 2, 'stroke-dasharray': '12 10' });
  svg.appendChild(laneLeft);
  svg.appendChild(laneRight);
  svg.appendChild(laneCenter);

  // Cars ahead
  const car1 = el('rect', { x: 365, y: 280, width: 30, height: 20, rx: 3, fill: '#333' });
  const car2 = el('rect', { x: 420, y: 310, width: 35, height: 22, rx: 3, fill: '#333' });
  const car3 = el('rect', { x: 310, y: 340, width: 40, height: 25, rx: 3, fill: '#333' });
  svg.appendChild(car1);
  svg.appendChild(car2);
  svg.appendChild(car3);

  // Bounding boxes (initially invisible)
  const bb1 = el('rect', { x: 360, y: 275, width: 40, height: 30, rx: 2, fill: 'none', stroke: '#ff6b35', 'stroke-width': 1.5, opacity: 0 });
  const bb2 = el('rect', { x: 415, y: 305, width: 45, height: 32, rx: 2, fill: 'none', stroke: '#ff6b35', 'stroke-width': 1.5, opacity: 0 });
  const bb3 = el('rect', { x: 305, y: 335, width: 50, height: 35, rx: 2, fill: 'none', stroke: '#ff6b35', 'stroke-width': 1.5, opacity: 0 });
  svg.appendChild(bb1);
  svg.appendChild(bb2);
  svg.appendChild(bb3);

  // Lane overlay lines (traced in accent)
  const laneOverlayL = el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#00d4ff', 'stroke-width': 2, opacity: 0 });
  const laneOverlayR = el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#00d4ff', 'stroke-width': 2, opacity: 0 });
  svg.appendChild(laneOverlayL);
  svg.appendChild(laneOverlayR);

  // Predicted path
  const pathCurve = el('path', {
    d: 'M400,500 C400,420 395,350 400,280',
    fill: 'none',
    stroke: '#4CAF50',
    'stroke-width': 2,
    'stroke-dasharray': '6 4',
    opacity: 0,
  });
  svg.appendChild(pathCurve);

  // "HUMAN REQUIRED" badge
  const badge = el('g', { transform: 'translate(640, 40)' });
  const badgeBg = el('rect', { x: -70, y: -16, width: 140, height: 32, rx: 6, fill: 'rgba(255, 107, 53, 0.2)', stroke: '#ff6b35', 'stroke-width': 1 });
  badge.appendChild(badgeBg);
  const badgeText = text(0, 5, 'HUMAN REQUIRED', 11, '#ff6b35', 'middle', 'JetBrains Mono, monospace');
  badge.appendChild(badgeText);
  svg.appendChild(badge);

  // Data stream label
  const dataLabel = text(400, 490, '', 10, 'rgba(0, 212, 255, 0.4)', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(dataLabel);

  const tl = gsap.timeline();

  tl.set(badge, { opacity: 0 })
    // Scene appears
    .to({}, { duration: 0.1 })
    // Bounding boxes appear
    .to([bb1, bb2, bb3], { attr: { opacity: 1 }, duration: 0.12, stagger: 0.03, ease: 'power2.out' }, 0.1)
    .call(() => { dataLabel.textContent = 'Detecting vehicles...'; }, [], 0.12)
    // Lane lines traced
    .to([laneOverlayL, laneOverlayR], { attr: { opacity: 0.7 }, duration: 0.12, stagger: 0.03 }, 0.3)
    .call(() => { dataLabel.textContent = 'Tracking lane boundaries'; }, [], 0.35)
    // Predicted path
    .to(pathCurve, { attr: { opacity: 0.8 }, duration: 0.1 }, 0.5)
    .call(() => { dataLabel.textContent = 'Path planned — monitoring...'; }, [], 0.55)
    // Badge appears pulsing
    .to(badge, { opacity: 1, duration: 0.1 }, 0.65)
    .to(badgeBg, { attr: { fill: 'rgba(255, 107, 53, 0.35)' }, duration: 0.08, yoyo: true, repeat: 3 }, 0.7);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 7 — SELF-DRIVING CAR L4
// ════════════════════════════════════════════════════════════

function selfDrivingL4(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#0a0c1a' }));

  // Road
  svg.appendChild(el('polygon', { points: '250,250 550,250 800,500 0,500', fill: '#1a1c30' }));
  svg.appendChild(el('line', { x1: 310, y1: 250, x2: 100, y2: 500, stroke: '#00d4ff', 'stroke-width': 1.5, opacity: 0.5 }));
  svg.appendChild(el('line', { x1: 490, y1: 250, x2: 700, y2: 500, stroke: '#00d4ff', 'stroke-width': 1.5, opacity: 0.5 }));
  svg.appendChild(el('line', { x1: 400, y1: 250, x2: 400, y2: 500, stroke: '#3a3d60', 'stroke-width': 2, 'stroke-dasharray': '12 10' }));

  // Vehicles
  svg.appendChild(el('rect', { x: 365, y: 280, width: 30, height: 20, rx: 3, fill: '#333' }));
  svg.appendChild(el('rect', { x: 420, y: 310, width: 35, height: 22, rx: 3, fill: '#333' }));
  // Bounding boxes (pre-visible)
  svg.appendChild(el('rect', { x: 360, y: 275, width: 40, height: 30, rx: 2, fill: 'none', stroke: '#4CAF50', 'stroke-width': 1.5 }));
  svg.appendChild(el('rect', { x: 415, y: 305, width: 45, height: 32, rx: 2, fill: 'none', stroke: '#4CAF50', 'stroke-width': 1.5 }));

  // Pedestrian
  const pedGroup = el('g', { transform: 'translate(280, 360)' });
  pedGroup.appendChild(el('circle', { cx: 0, cy: -10, r: 5, fill: '#888' }));
  pedGroup.appendChild(el('rect', { x: -3, y: -5, width: 6, height: 15, rx: 2, fill: '#888' }));
  svg.appendChild(pedGroup);

  // Pedestrian prediction arcs
  const pedArc = el('path', {
    d: 'M280,360 Q260,340 250,330 M280,360 Q290,340 300,330 M280,360 Q280,340 280,320',
    fill: 'none',
    stroke: '#ffcc44',
    'stroke-width': 1,
    'stroke-dasharray': '3 3',
    opacity: 0,
  });
  svg.appendChild(pedArc);

  // Cyclist
  const cyclistGroup = el('g', { transform: 'translate(480, 380)', opacity: 0 });
  cyclistGroup.appendChild(el('circle', { cx: 0, cy: 0, r: 8, fill: 'none', stroke: '#888', 'stroke-width': 1.5 }));
  cyclistGroup.appendChild(el('circle', { cx: 0, cy: -12, r: 4, fill: '#888' }));
  svg.appendChild(cyclistGroup);

  // Cyclist prediction cone
  const cyclistCone = el('path', {
    d: 'M480,380 L440,320 L460,310 L500,310 L520,320 Z',
    fill: 'rgba(255, 204, 68, 0.1)',
    stroke: '#ffcc44',
    'stroke-width': 0.8,
    'stroke-dasharray': '4 3',
    opacity: 0,
  });
  svg.appendChild(cyclistCone);

  // LiDAR point cloud (dots)
  const lidarGroup = el('g', { opacity: 0 });
  for (let i = 0; i < 80; i++) {
    const px = 200 + Math.random() * 400;
    const py = 250 + Math.random() * 200;
    lidarGroup.appendChild(el('circle', { cx: px, cy: py, r: 1, fill: '#a855f7', opacity: 0.3 + Math.random() * 0.5 }));
  }
  svg.appendChild(lidarGroup);

  // Badge: starts as "HUMAN REQUIRED" fades to "FULLY AUTONOMOUS"
  const oldBadge = el('g', { transform: 'translate(640, 40)' });
  oldBadge.appendChild(el('rect', { x: -70, y: -16, width: 140, height: 32, rx: 6, fill: 'rgba(255, 107, 53, 0.2)', stroke: '#ff6b35', 'stroke-width': 1 }));
  oldBadge.appendChild(text(0, 5, 'HUMAN REQUIRED', 11, '#ff6b35', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(oldBadge);

  const newBadge = el('g', { transform: 'translate(640, 40)', opacity: 0 });
  newBadge.appendChild(el('rect', { x: -80, y: -16, width: 160, height: 32, rx: 6, fill: 'rgba(76, 175, 80, 0.2)', stroke: '#4CAF50', 'stroke-width': 1 }));
  newBadge.appendChild(text(0, 5, 'FULLY AUTONOMOUS', 11, '#4CAF50', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(newBadge);

  const tl = gsap.timeline();

  // Badge transition
  tl.to(oldBadge, { opacity: 0, duration: 0.1 }, 0.1)
    .to(newBadge, { opacity: 1, duration: 0.1 }, 0.2)
    // LiDAR points appear
    .to(lidarGroup, { attr: { opacity: 0.6 }, duration: 0.15 }, 0.3)
    // Pedestrian prediction arcs
    .to(pedArc, { attr: { opacity: 0.8 }, duration: 0.1 }, 0.45)
    // Cyclist appears with prediction cone
    .to(cyclistGroup, { attr: { opacity: 1 }, duration: 0.1 }, 0.6)
    .to(cyclistCone, { attr: { opacity: 1 }, duration: 0.12 }, 0.65)
    // Hold
    .to({}, { duration: 0.2 });

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 8 — SURGICAL ROBOT
// ════════════════════════════════════════════════════════════

function surgicalRobot(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#0a0c1a' }));

  // Tissue area
  svg.appendChild(el('ellipse', { cx: 400, cy: 320, rx: 120, ry: 40, fill: '#2a1520', stroke: '#4a2530', 'stroke-width': 1 }));
  // Incision line
  const incision = el('line', { x1: 340, y1: 320, x2: 460, y2: 320, stroke: '#661530', 'stroke-width': 2 });
  svg.appendChild(incision);

  // Suture points
  const sutureGroup = el('g', { opacity: 0 });
  for (let i = 0; i < 6; i++) {
    const sx = 350 + i * 20;
    sutureGroup.appendChild(el('line', { x1: sx, y1: 312, x2: sx + 5, y2: 328, stroke: '#00d4ff', 'stroke-width': 1 }));
  }
  svg.appendChild(sutureGroup);

  // Robot arm 1 (left)
  const arm1 = el('g', { transform: 'translate(250, 100)' });
  // Segments
  const seg1a = el('rect', { x: -5, y: 0, width: 10, height: 80, rx: 5, fill: '#333', stroke: '#555', 'stroke-width': 1 });
  arm1.appendChild(seg1a);
  const joint1 = el('circle', { cx: 0, cy: 80, r: 8, fill: '#444', stroke: '#666', 'stroke-width': 1 });
  arm1.appendChild(joint1);
  const seg1b = el('rect', { x: -4, y: 80, width: 8, height: 80, rx: 4, fill: '#2a2d45', stroke: '#555', 'stroke-width': 1 });
  arm1.appendChild(seg1b);
  // Gripper
  const grip1a = el('line', { x1: -6, y1: 160, x2: -12, y2: 180, stroke: '#00d4ff', 'stroke-width': 1.5 });
  const grip1b = el('line', { x1: 6, y1: 160, x2: 12, y2: 180, stroke: '#00d4ff', 'stroke-width': 1.5 });
  arm1.appendChild(grip1a);
  arm1.appendChild(grip1b);
  svg.appendChild(arm1);

  // Robot arm 2 (right)
  const arm2 = el('g', { transform: 'translate(550, 100)' });
  arm2.appendChild(el('rect', { x: -5, y: 0, width: 10, height: 80, rx: 5, fill: '#333', stroke: '#555', 'stroke-width': 1 }));
  arm2.appendChild(el('circle', { cx: 0, cy: 80, r: 8, fill: '#444', stroke: '#666', 'stroke-width': 1 }));
  arm2.appendChild(el('rect', { x: -4, y: 80, width: 8, height: 80, rx: 4, fill: '#2a2d45', stroke: '#555', 'stroke-width': 1 }));
  // Needle
  const needle = el('path', { d: 'M-2,160 C-2,160 -15,180 -10,195 C-5,210 5,210 10,195 C15,180 2,160 2,160', fill: 'none', stroke: '#ccc', 'stroke-width': 1.5 });
  arm2.appendChild(needle);
  svg.appendChild(arm2);

  // Tremor comparison inset
  const insetGroup = el('g', { transform: 'translate(80, 40)', opacity: 0 });
  insetGroup.appendChild(el('rect', { x: 0, y: 0, width: 200, height: 100, rx: 6, fill: 'rgba(0,0,0,0.5)', stroke: '#2a2d55', 'stroke-width': 1 }));
  insetGroup.appendChild(text(100, 18, 'Tremor Comparison', 10, '#888'));

  // Human hand line (shaky)
  let humanPath = 'M20,55';
  for (let i = 1; i <= 30; i++) {
    const hx = 20 + i * 5.3;
    const hy = 55 + (Math.sin(i * 1.5) * 6 + Math.random() * 4 - 2);
    humanPath += ` L${hx},${hy}`;
  }
  insetGroup.appendChild(el('path', { d: humanPath, fill: 'none', stroke: '#ff6b35', 'stroke-width': 1.5, opacity: 0.8 }));
  insetGroup.appendChild(text(30, 90, 'Human', 9, '#ff6b35', 'start'));

  // Robot output (smooth)
  const robotPath = `M20,55 L180,55`;
  insetGroup.appendChild(el('path', { d: robotPath, fill: 'none', stroke: '#00d4ff', 'stroke-width': 1.5 }));
  insetGroup.appendChild(text(130, 90, 'Robot', 9, '#00d4ff', 'start'));

  svg.appendChild(insetGroup);

  // Magnification ring
  const magRing = el('circle', { cx: 400, cy: 320, r: 60, fill: 'none', stroke: 'rgba(0, 212, 255, 0.3)', 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0 });
  svg.appendChild(magRing);
  const magLabel = text(400, 395, '10× MAGNIFICATION', 10, 'rgba(0, 212, 255, 0.5)', 'middle', 'JetBrains Mono, monospace');
  magLabel.setAttribute('opacity', '0');
  svg.appendChild(magLabel);

  const tl = gsap.timeline();

  // Arms approach tissue
  tl.to(arm1, { attr: { transform: 'translate(310, 120)' }, duration: 0.2, ease: 'power2.inOut' }, 0)
    .to(arm2, { attr: { transform: 'translate(490, 120)' }, duration: 0.2, ease: 'power2.inOut' }, 0)
    // Magnification appears
    .to(magRing, { attr: { opacity: 1 }, duration: 0.1 }, 0.2)
    .to(magLabel, { attr: { opacity: 1 }, duration: 0.1 }, 0.2)
    // Suturing
    .to(arm2, { attr: { transform: 'translate(480, 115)' }, duration: 0.15, ease: 'sine.inOut' }, 0.35)
    .to(arm2, { attr: { transform: 'translate(500, 120)' }, duration: 0.15, ease: 'sine.inOut' }, 0.5)
    .to(sutureGroup, { attr: { opacity: 1 }, duration: 0.15 }, 0.45)
    // Inset appears
    .to(insetGroup, { attr: { opacity: 1 }, duration: 0.15 }, 0.65);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 9 — MARS ROVER
// ════════════════════════════════════════════════════════════

function marsRover(container: HTMLElement): gsap.core.Timeline {
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  // Mars sky
  const defs = el('defs', {});
  const marsGrad = el('linearGradient', { id: 'marsGrad', x1: 0, y1: 0, x2: 0, y2: 1 });
  marsGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#1a0800' }));
  marsGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#2a1005' }));
  defs.appendChild(marsGrad);
  svg.appendChild(defs);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: 'url(#marsGrad)' }));

  // Mars terrain
  svg.appendChild(el('path', {
    d: 'M0,380 Q100,360 200,370 Q300,380 350,365 Q450,350 500,370 Q600,385 700,360 Q750,355 800,370 L800,500 L0,500 Z',
    fill: '#3d1a0a',
  }));
  // Rocks
  svg.appendChild(el('ellipse', { cx: 150, cy: 385, rx: 15, ry: 8, fill: '#4a2010' }));
  svg.appendChild(el('ellipse', { cx: 600, cy: 375, rx: 12, ry: 6, fill: '#4a2010' }));
  svg.appendChild(el('ellipse', { cx: 420, cy: 380, rx: 8, ry: 5, fill: '#4a2010' }));

  // Rover
  const roverGroup = el('g', { transform: 'translate(250, 355)' });
  // Body
  roverGroup.appendChild(el('rect', { x: -25, y: -20, width: 50, height: 18, rx: 4, fill: '#888', stroke: '#aaa', 'stroke-width': 0.5 }));
  // Mast
  roverGroup.appendChild(el('line', { x1: 0, y1: -20, x2: 0, y2: -40, stroke: '#999', 'stroke-width': 1.5 }));
  roverGroup.appendChild(el('rect', { x: -6, y: -44, width: 12, height: 6, rx: 2, fill: '#aaa' }));
  // Camera eye
  roverGroup.appendChild(el('circle', { cx: 3, cy: -41, r: 2, fill: '#00d4ff' }));
  // Wheels
  roverGroup.appendChild(el('circle', { cx: -18, cy: 2, r: 6, fill: '#666', stroke: '#888', 'stroke-width': 1 }));
  roverGroup.appendChild(el('circle', { cx: 18, cy: 2, r: 6, fill: '#666', stroke: '#888', 'stroke-width': 1 }));
  // Solar panel
  roverGroup.appendChild(el('rect', { x: -20, y: -26, width: 40, height: 4, rx: 1, fill: '#2244aa', stroke: '#3355cc', 'stroke-width': 0.5 }));
  svg.appendChild(roverGroup);

  // Signal pulse (initially invisible)
  const signalGroup = el('g', { opacity: 0 });
  const signalDot = el('circle', { cx: 250, cy: 350, r: 4, fill: '#ff8844' });
  signalGroup.appendChild(signalDot);
  // Signal rings
  for (let i = 1; i <= 3; i++) {
    signalGroup.appendChild(el('circle', {
      cx: 250, cy: 350 - i * 10, r: 3 + i * 2,
      fill: 'none', stroke: '#ff8844', 'stroke-width': 0.5, opacity: 1 - i * 0.25,
    }));
  }
  svg.appendChild(signalGroup);

  // Signal travel line
  const signalLine = el('line', { x1: 250, y1: 350, x2: 250, y2: 350, stroke: '#ff8844', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0 });
  svg.appendChild(signalLine);

  // Earth indicator (tiny dot at top)
  const earthDot = el('circle', { cx: 250, cy: 30, r: 4, fill: '#4488ff', opacity: 0 });
  svg.appendChild(earthDot);
  const earthLabel = text(250, 18, 'EARTH', 8, '#4488ff', 'middle', 'JetBrains Mono, monospace');
  earthLabel.setAttribute('opacity', '0');
  svg.appendChild(earthLabel);

  // Countdown display
  const delayMinutes = 4 + Math.floor(Math.random() * 20);
  const delaySeconds = Math.floor(Math.random() * 60);
  const countdownText = text(600, 50, '', 14, '#ff8844', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(countdownText);

  // Status text
  const statusText = text(400, 470, '', 11, 'rgba(255, 136, 68, 0.6)', 'middle', 'JetBrains Mono, monospace');
  svg.appendChild(statusText);

  // "SEND COMMAND" button (SVG-based)
  const btnGroup = el('g', { transform: 'translate(600, 430)', cursor: 'pointer', opacity: 0 });
  btnGroup.appendChild(el('rect', { x: -60, y: -14, width: 120, height: 28, rx: 5, fill: 'rgba(255, 100, 30, 0.15)', stroke: 'rgba(255, 130, 50, 0.4)', 'stroke-width': 1 }));
  btnGroup.appendChild(text(0, 5, 'SEND COMMAND', 10, '#ff8844', 'middle', 'JetBrains Mono, monospace'));
  svg.appendChild(btnGroup);

  // Interactive click handler for the Mars rover
  let commandSent = false;
  const btnEl = btnGroup as unknown as SVGGElement;
  btnEl.style.cursor = 'pointer';
  btnEl.style.pointerEvents = 'all';

  btnEl.addEventListener('click', () => {
    if (commandSent) return;
    commandSent = true;

    const countdownTl = gsap.timeline();
    countdownTl
      .set(statusText, { textContent: 'Transmitting command...' })
      .to(signalGroup, { opacity: 1, duration: 0.3 })
      .to(signalDot, { attr: { cy: 30 }, duration: 2, ease: 'power1.in' })
      .set(statusText, { textContent: `Signal travel time: ${delayMinutes}m ${delaySeconds}s...` })
      .to(countdownText, { duration: 0.1 }, '+=0.1');

    // Real-time countdown for 8 seconds
    let countSec = 8;
    const countInterval = setInterval(() => {
      countSec--;
      countdownText.textContent = `${delayMinutes}m ${delaySeconds - 8 + (8 - countSec)}s`;
      if (countSec <= 0) {
        clearInterval(countInterval);
        // Fast forward
        gsap.to(countdownText, {
          duration: 0.5,
          onUpdate: function () {
            const p = this.progress();
            const fwdSec = Math.floor(delaySeconds - 8 + 8 + p * (delaySeconds));
            countdownText.textContent = `${delayMinutes}m ${fwdSec % 60}s`;
          },
          onComplete: () => {
            countdownText.textContent = 'Command received!';
            statusText.textContent = 'Executing: DRIVE_FORWARD 1m';
            gsap.to(roverGroup, { attr: { transform: 'translate(320, 355)' }, duration: 1.5, ease: 'power2.inOut' });
          },
        });
      }
    }, 1000);
  });

  const tl = gsap.timeline();

  // Scene reveal
  tl.to({}, { duration: 0.1 })
    .set(statusText, { textContent: 'Perseverance — Sol 847 — Jezero Crater' })
    // Show earth indicator
    .to(earthDot, { attr: { opacity: 0.7 }, duration: 0.1 }, 0.15)
    .to(earthLabel, { attr: { opacity: 0.5 }, duration: 0.1 }, 0.15)
    // Signal line appears
    .to(signalLine, { attr: { opacity: 0.3, y2: 30 }, duration: 0.1 }, 0.25)
    // Show the button
    .to(btnGroup, { attr: { opacity: 1 }, duration: 0.1 }, 0.3)
    // Scroll-driven signal send (if user doesn't click)
    .call(() => {
      if (!commandSent) {
        statusText.textContent = `Signal delay: ${delayMinutes}m ${delaySeconds}s one-way`;
      }
    }, [], 0.5)
    // Scroll-driven rover movement
    .to(signalGroup, { opacity: 1, duration: 0.05 }, 0.6)
    .to(signalDot, { attr: { cy: 30 }, duration: 0.15 }, 0.6)
    .call(() => {
      if (!commandSent) {
        countdownText.textContent = 'Command received';
        statusText.textContent = 'Executing: DRIVE_FORWARD 1m';
      }
    }, [], 0.75)
    .to(roverGroup, { attr: { transform: 'translate(350, 355)' }, duration: 0.2, ease: 'power2.inOut' }, 0.8);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 10 — STARLINK
// ════════════════════════════════════════════════════════════

function starlink(container: HTMLElement): gsap.core.Timeline {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Earth
  const earthCx = 400;
  const earthCy = 350;
  const earthR = 120;

  // Satellites
  interface Sat {
    orbitR: number;
    angle: number;
    speed: number;
    flashTimer: number;
  }

  const sats: Sat[] = [];
  const maxSats = 120;
  for (let i = 0; i < maxSats; i++) {
    sats.push({
      orbitR: earthR + 30 + Math.random() * 80,
      angle: Math.random() * Math.PI * 2,
      speed: (0.3 + Math.random() * 0.7) * (Math.random() > 0.5 ? 1 : -1),
      flashTimer: 0,
    });
  }

  const progress = { value: 0 };

  function draw() {
    ctx.clearRect(0, 0, 800, 500);

    // Background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, 800, 500);

    // Stars
    const starSeed = 42;
    let s = starSeed;
    for (let i = 0; i < 60; i++) {
      s = (s * 16807) % 2147483647;
      const sx = (s % 800);
      s = (s * 16807) % 2147483647;
      const sy = (s % 500);
      ctx.fillStyle = `rgba(255,255,255,${0.1 + (s % 30) / 100})`;
      ctx.fillRect(sx, sy, 1, 1);
    }

    const p = progress.value;
    const visibleSats = Math.floor(p * maxSats);

    // Earth glow
    const earthGlow = ctx.createRadialGradient(earthCx, earthCy, earthR - 10, earthCx, earthCy, earthR + 40);
    earthGlow.addColorStop(0, 'rgba(30, 80, 180, 0.3)');
    earthGlow.addColorStop(1, 'rgba(30, 80, 180, 0)');
    ctx.fillStyle = earthGlow;
    ctx.beginPath();
    ctx.arc(earthCx, earthCy, earthR + 40, 0, Math.PI * 2);
    ctx.fill();

    // Earth
    const earthGrad = ctx.createRadialGradient(earthCx - 20, earthCy - 20, 10, earthCx, earthCy, earthR);
    earthGrad.addColorStop(0, '#1a4488');
    earthGrad.addColorStop(0.5, '#0e2a55');
    earthGrad.addColorStop(1, '#061530');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(earthCx, earthCy, earthR, 0, Math.PI * 2);
    ctx.fill();

    // Orbit lines (faint)
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (const r of [earthR + 40, earthR + 65, earthR + 90]) {
      ctx.beginPath();
      ctx.arc(earthCx, earthCy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Satellites
    for (let i = 0; i < visibleSats; i++) {
      const sat = sats[i];
      const a = sat.angle + p * sat.speed * 3;
      const sx = earthCx + Math.cos(a) * sat.orbitR;
      const sy = earthCy + Math.sin(a) * sat.orbitR * 0.4; // elliptical projection

      // Skip if behind Earth
      if (Math.sin(a) > 0.3 && sat.orbitR < earthR + 50) continue;

      // Flash for autonomous maneuver
      const isFlashing = Math.sin(p * 50 + i * 7) > 0.92;

      if (isFlashing) {
        ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(sx, sy, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = isFlashing ? '#00d4ff' : 'rgba(255,255,255,0.6)';
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Occasional laser link between nearby sats
      if (i > 0 && i % 8 === 0) {
        const j = i - 1;
        const a2 = sats[j].angle + p * sats[j].speed * 3;
        const sx2 = earthCx + Math.cos(a2) * sats[j].orbitR;
        const sy2 = earthCy + Math.sin(a2) * sats[j].orbitR * 0.4;
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx2, sy2);
        ctx.stroke();
      }
    }

    // Counter
    ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.font = '13px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Satellites: ${visibleSats.toLocaleString()}`, 770, 28);

    // Debris count
    const debrisCount = Math.floor(p * 30000);
    ctx.fillStyle = 'rgba(255, 107, 53, 0.4)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`Debris tracked: ${debrisCount.toLocaleString()}`, 770, 48);
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
  const svg = makeSVG(800, 500);
  container.appendChild(svg);

  svg.appendChild(el('rect', { x: 0, y: 0, width: 800, height: 500, fill: '#0a0815' }));

  // Amino acid chain (linear)
  const chainGroup = el('g', {});
  const numResidues = 20;
  const residues: SVGCircleElement[] = [];
  const bonds: SVGLineElement[] = [];

  // Linear positions
  const startX = 80;
  const startY = 250;

  // Target folded positions (a helix-like shape)
  const foldedPositions: { x: number; y: number }[] = [];
  for (let i = 0; i < numResidues; i++) {
    const angle = (i / numResidues) * Math.PI * 3;
    const radius = 60 + Math.sin(i * 0.5) * 30;
    foldedPositions.push({
      x: 350 + Math.cos(angle) * radius,
      y: 250 + Math.sin(angle) * radius * 0.6 + (i - numResidues / 2) * 3,
    });
  }

  // Colors for residues
  const colors = ['#a855f7', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'];

  for (let i = 0; i < numResidues; i++) {
    const lx = startX + i * 32;

    if (i > 0) {
      const bond = el('line', {
        x1: startX + (i - 1) * 32,
        y1: startY,
        x2: lx,
        y2: startY,
        stroke: '#3a2860',
        'stroke-width': 2,
      }) as unknown as SVGLineElement;
      chainGroup.appendChild(bond);
      bonds.push(bond);
    }

    const res = el('circle', {
      cx: lx,
      cy: startY,
      r: 8,
      fill: colors[i % colors.length],
      stroke: '#fff',
      'stroke-width': 0.5,
      opacity: 0.8,
    }) as unknown as SVGCircleElement;
    chainGroup.appendChild(res);
    residues.push(res);
  }
  svg.appendChild(chainGroup);

  // "3D Structure Solved" progress bar
  const barGroup = el('g', { transform: 'translate(80, 440)' });
  barGroup.appendChild(el('rect', { x: 0, y: 0, width: 300, height: 8, rx: 4, fill: '#1a1530' }));
  const aiBar = el('rect', { x: 0, y: 0, width: 0, height: 8, rx: 4, fill: '#a855f7' });
  barGroup.appendChild(aiBar);
  barGroup.appendChild(text(150, -8, 'AlphaFold', 10, '#a855f7'));
  svg.appendChild(barGroup);

  // Ghost "Lab experiment" bar
  const labGroup = el('g', { transform: 'translate(430, 440)' });
  labGroup.appendChild(el('rect', { x: 0, y: 0, width: 300, height: 8, rx: 4, fill: '#1a1530' }));
  const labBar = el('rect', { x: 0, y: 0, width: 0, height: 8, rx: 4, fill: '#ff6b35', opacity: 0.5 });
  labGroup.appendChild(labBar);
  labGroup.appendChild(text(150, -8, 'Lab Experiment', 10, '#ff6b35', 'middle'));
  svg.appendChild(labGroup);

  // Percentage labels
  const aiPct = text(80, 465, '0%', 11, '#a855f7', 'start', 'JetBrains Mono, monospace');
  const labPct = text(430, 465, '0%', 11, 'rgba(255, 107, 53, 0.5)', 'start', 'JetBrains Mono, monospace');
  svg.appendChild(aiPct);
  svg.appendChild(labPct);

  const tl = gsap.timeline();

  // Fold the protein
  residues.forEach((res, i) => {
    const target = foldedPositions[i];
    tl.to(res, { attr: { cx: target.x, cy: target.y }, duration: 0.5, ease: 'power2.inOut' }, 0.1 + i * 0.02);
  });

  bonds.forEach((bond, i) => {
    const from = foldedPositions[i];
    const to = foldedPositions[i + 1];
    tl.to(bond, { attr: { x1: from.x, y1: from.y, x2: to.x, y2: to.y }, duration: 0.5, ease: 'power2.inOut' }, 0.1 + i * 0.02);
  });

  // Progress bars animate
  tl.to(aiBar, { attr: { width: 300 }, duration: 0.4, ease: 'power2.out' }, 0.3)
    .to(labBar, { attr: { width: 8 }, duration: 0.4, ease: 'none' }, 0.3);

  // Update percentage text via callbacks
  tl.call(() => { aiPct.textContent = '25%'; labPct.textContent = '0.1%'; }, [], 0.4)
    .call(() => { aiPct.textContent = '50%'; labPct.textContent = '0.3%'; }, [], 0.5)
    .call(() => { aiPct.textContent = '75%'; labPct.textContent = '0.5%'; }, [], 0.6)
    .call(() => { aiPct.textContent = '100%'; labPct.textContent = '0.8%'; }, [], 0.7);

  return tl;
}

// ════════════════════════════════════════════════════════════
// LEVEL 12 — VON NEUMANN PROBE
// ════════════════════════════════════════════════════════════

function vonNeumann(container: HTMLElement): gsap.core.Timeline {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 500;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Starfield (static)
  interface Star { x: number; y: number; b: number; }
  const stars: Star[] = [];
  for (let i = 0; i < 150; i++) {
    stars.push({ x: Math.random() * 800, y: Math.random() * 500, b: 0.1 + Math.random() * 0.4 });
  }

  // Tree structure: each node is a probe that reaches an asteroid and splits
  interface ProbeNode {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    depth: number;
    startProgress: number; // when this branch starts growing (0-1)
    children: ProbeNode[];
  }

  function buildTree(x: number, y: number, angle: number, depth: number, startP: number): ProbeNode {
    const len = Math.max(20, 80 - depth * 10);
    const endX = x + Math.cos(angle) * len;
    const endY = y + Math.sin(angle) * len;
    const node: ProbeNode = {
      startX: x, startY: y, endX, endY,
      depth,
      startProgress: startP,
      children: [],
    };

    if (depth < 6) {
      const spread = 0.4 + Math.random() * 0.3;
      const childStart = startP + (1 - startP) * 0.15;
      node.children.push(buildTree(endX, endY, angle - spread, depth + 1, childStart));
      node.children.push(buildTree(endX, endY, angle + spread, depth + 1, childStart));
    }
    return node;
  }

  const tree = buildTree(100, 400, -Math.PI * 0.35, 0, 0);

  const progress = { value: 0 };

  function drawNode(node: ProbeNode) {
    const p = progress.value;
    if (p < node.startProgress) return;

    const localP = Math.min(1, (p - node.startProgress) / (1 - node.startProgress) * 3);
    const drawEndX = node.startX + (node.endX - node.startX) * localP;
    const drawEndY = node.startY + (node.endY - node.startY) * localP;

    // Line
    const alpha = Math.max(0.1, 0.6 - node.depth * 0.08);
    ctx.strokeStyle = `rgba(255, 200, 50, ${alpha})`;
    ctx.lineWidth = Math.max(0.5, 2.5 - node.depth * 0.3);
    ctx.beginPath();
    ctx.moveTo(node.startX, node.startY);
    ctx.lineTo(drawEndX, drawEndY);
    ctx.stroke();

    // Probe dot at end
    if (localP > 0.8) {
      const dotAlpha = (localP - 0.8) * 5;
      ctx.fillStyle = `rgba(255, 220, 80, ${dotAlpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(drawEndX, drawEndY, 3 - node.depth * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Glow
      ctx.fillStyle = `rgba(255, 200, 50, ${dotAlpha * 0.2})`;
      ctx.beginPath();
      ctx.arc(drawEndX, drawEndY, 8 - node.depth * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Asteroid at end (if arrived)
    if (localP >= 1 && node.depth < 6) {
      ctx.fillStyle = 'rgba(100, 80, 60, 0.5)';
      ctx.beginPath();
      ctx.arc(node.endX, node.endY, 4 - node.depth * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw children
    if (localP >= 0.9) {
      for (const child of node.children) {
        drawNode(child);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, 800, 500);

    // Background
    ctx.fillStyle = '#030308';
    ctx.fillRect(0, 0, 800, 500);

    // Stars
    for (const star of stars) {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.b})`;
      ctx.fillRect(star.x, star.y, 1, 1);
    }

    const p = progress.value;

    // Earth (shrinks as progress increases)
    const earthScale = Math.max(0.1, 1 - p * 0.8);
    const earthR = 25 * earthScale;
    if (earthR > 2) {
      const earthGrad = ctx.createRadialGradient(80, 420, 0, 80, 420, earthR);
      earthGrad.addColorStop(0, '#2255aa');
      earthGrad.addColorStop(1, '#0a1530');
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(80, 420, earthR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.font = '9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Earth', 80, 420 + earthR + 12);
    }

    // Draw the probe tree
    drawNode(tree);

    // Probe count
    let count = 0;
    function countVisible(node: ProbeNode) {
      if (progress.value >= node.startProgress) {
        count++;
        for (const c of node.children) countVisible(c);
      }
    }
    countVisible(tree);

    ctx.fillStyle = 'rgba(255, 200, 50, 0.6)';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`Probes: ${count}`, 770, 28);

    // Time scale
    const years = Math.floor(p * 5000000);
    ctx.fillStyle = 'rgba(255, 200, 50, 0.3)';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillText(`T + ${years.toLocaleString()} years`, 770, 48);
  }

  draw();

  const tl = gsap.timeline({ onUpdate: draw });
  tl.to(progress, { value: 1, duration: 1, ease: 'power1.in' });

  return tl;
}
