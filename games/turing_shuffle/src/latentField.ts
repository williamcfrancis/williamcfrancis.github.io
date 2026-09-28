/**
 * The Latent Field — generative ambient background for The Turing Shuffle.
 *
 * A drifting cloud of token-like glyph particles connected by faint lines,
 * evoking the latent space of a language model. The field reacts to game
 * state: gravitates toward the passage card while reading, polarizes toward
 * orange/cyan as the user leans human/AI, ripples on answer, flows in
 * parallel currents during a streak, and quiets into a constellation on the
 * reveal screen.
 */

type FieldMode = 'idle' | 'reading' | 'reveal';
type BiasSide = 'human' | 'ai' | 'neutral';
type PulseKind = 'correct' | 'incorrect' | 'human' | 'ai';
type RGB = [number, number, number];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  baseAlpha: number;
  tint: number;
  phase: number;
}

interface Pulse {
  x: number;
  y: number;
  age: number;
  lifetime: number;
  maxRadius: number;
  color: RGB;
}

const GLYPHS = [
  '·', '·', '·', '·', '·', '·', '·',
  '∂', '∇', '∑', '∞', '◇', '○',
  'a', 'e', 'i', 'o', 't', 'n', 's', 'r',
];

const NEUTRAL_RGB: RGB = [168, 200, 240];
const AI_RGB: RGB = [45, 212, 191];
const HUMAN_RGB: RGB = [249, 115, 22];
const INCORRECT_RGB: RGB = [248, 113, 113];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let pulses: Pulse[] = [];

let mode: FieldMode = 'idle';
let streakActive = false;
let biasWeight = 0;
let biasSide: BiasSide = 'neutral';
let readingTarget: { x: number; y: number } | null = null;

let rafId = 0;
let lastT = 0;
let width = 0;
let height = 0;
let dpr = 1;
let running = false;
let reduced = false;
let initialized = false;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function lerpColor(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function tintColor(tint: number): RGB {
  if (tint > 0) return lerpColor(NEUTRAL_RGB, HUMAN_RGB, Math.min(1, tint));
  if (tint < 0) return lerpColor(NEUTRAL_RGB, AI_RGB, Math.min(1, -tint));
  return NEUTRAL_RGB;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function makeParticle(): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: rand(-0.05, 0.05),
    vy: rand(-0.05, 0.05),
    char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    size: rand(9, 16),
    baseAlpha: rand(0.18, 0.42),
    tint: 0,
    phase: Math.random() * Math.PI * 2,
  };
}

function targetParticleCount(): number {
  if (width < 600) return 50;
  if (width < 1100) return 90;
  return 130;
}

function resize() {
  if (!canvas || !ctx) return;
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const target = targetParticleCount();
  while (particles.length < target) particles.push(makeParticle());
  while (particles.length > target) particles.pop();
  if (!running) render(performance.now());
}

function step(dt: number) {
  const tNow = performance.now() / 1000;
  const targetTint =
    biasSide === 'human' ? biasWeight :
    biasSide === 'ai' ? -biasWeight : 0;

  const streakAngle = streakActive ? tNow * 0.08 : 0;
  const streakVx = Math.cos(streakAngle) * 0.18;
  const streakVy = Math.sin(streakAngle) * 0.18;

  const damping = mode === 'reveal' ? 0.97 : 0.96;
  const speedCap = mode === 'reveal' ? 0.9 : 1.6;

  for (const p of particles) {
    p.tint = lerp(p.tint, targetTint, 0.025);

    // Curl-noise-ish flow field
    const scale = 0.0022;
    const fx = Math.sin(p.y * scale + tNow * 0.35) * 0.045;
    const fy = Math.cos(p.x * scale + tNow * 0.35) * 0.045;
    p.vx += fx;
    p.vy += fy;

    // Soft center attraction (idle / reading default)
    if (mode !== 'reveal') {
      const cx = width / 2;
      const cy = height / 2;
      p.vx += (cx - p.x) * 0.0000085 * dt;
      p.vy += (cy - p.y) * 0.0000085 * dt;
    }

    // Gentle gravitation toward passage card while reading
    if (mode === 'reading' && readingTarget) {
      const dx = readingTarget.x - p.x;
      const dy = readingTarget.y - p.y;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq) || 1;
      // Falls off with distance — close particles barely pull
      const force = 0.000018 * Math.min(1, dist / 400);
      p.vx += (dx / dist) * force * dt;
      p.vy += (dy / dist) * force * dt;
      // Slight tangential push for orbital feel — prevents pile-up
      p.vx += (-dy / dist) * 0.0000045 * dt;
      p.vy += (dx / dist) * 0.0000045 * dt;
    }

    // Streak — align velocities into parallel current
    if (streakActive) {
      p.vx = lerp(p.vx, streakVx, 0.012);
      p.vy = lerp(p.vy, streakVy, 0.012);
    }

    // Bias positional drift — particles sort toward their leaning side
    const tintMag = Math.abs(p.tint);
    if (tintMag > 0.05) {
      const sideTarget = p.tint > 0 ? width * 0.72 : width * 0.28;
      p.vx += (sideTarget - p.x) * 0.0000035 * tintMag * dt;
    }

    // Pulse impulses
    for (const pulse of pulses) {
      const dx = p.x - pulse.x;
      const dy = p.y - pulse.y;
      const dist = Math.hypot(dx, dy) || 1;
      const progress = pulse.age / pulse.lifetime;
      const radius = easeOutCubic(progress) * pulse.maxRadius;
      const ringWidth = 70;
      const distFromRing = Math.abs(dist - radius);
      if (distFromRing < ringWidth) {
        const strength = (1 - distFromRing / ringWidth) * (1 - progress) * 0.55;
        p.vx += (dx / dist) * strength;
        p.vy += (dy / dist) * strength;
      }
    }

    p.vx *= damping;
    p.vy *= damping;

    const speed = Math.hypot(p.vx, p.vy);
    if (speed > speedCap) {
      p.vx = (p.vx / speed) * speedCap;
      p.vy = (p.vy / speed) * speedCap;
    }

    p.x += p.vx * dt * 0.06;
    p.y += p.vy * dt * 0.06;

    if (p.x < -30) p.x = width + 30;
    if (p.x > width + 30) p.x = -30;
    if (p.y < -30) p.y = height + 30;
    if (p.y > height + 30) p.y = -30;

    p.phase += dt * 0.0012;
  }

  for (const pulse of pulses) pulse.age += dt;
  pulses = pulses.filter((p) => p.age < p.lifetime);
}

function render(t: number) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const connectThreshold = mode === 'reveal' ? 130 : 90;
  const lineAlphaScale = mode === 'reveal' ? 0.12 : 0.085;

  ctx.lineWidth = 0.6;
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distSq = dx * dx + dy * dy;
      const tSq = connectThreshold * connectThreshold;
      if (distSq < tSq) {
        const dist = Math.sqrt(distSq);
        const alpha = (1 - dist / connectThreshold) * lineAlphaScale;
        const tintAvg = (a.tint + b.tint) / 2;
        const [r, g, bl] = tintColor(tintAvg);
        ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const p of particles) {
    const breathe = 0.85 + 0.15 * Math.sin(p.phase * 1.5 + t * 0.001);
    const alpha = p.baseAlpha * breathe;
    const [r, g, bl] = tintColor(p.tint);
    ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${bl | 0}, ${alpha})`;
    ctx.font = `${p.size}px ui-monospace, "SF Mono", Menlo, Consolas, monospace`;
    ctx.fillText(p.char, p.x, p.y);
  }

  for (const pulse of pulses) {
    const progress = pulse.age / pulse.lifetime;
    const radius = easeOutCubic(progress) * pulse.maxRadius;
    const alpha = (1 - progress) * 0.55;
    const [r, g, b] = pulse.color;
    const inner = Math.max(0, radius - 80);
    const outer = radius + 40;
    const grad = ctx.createRadialGradient(pulse.x, pulse.y, inner, pulse.x, pulse.y, outer);
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
    grad.addColorStop(0.55, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(pulse.x, pulse.y, outer, 0, Math.PI * 2);
    ctx.fill();
  }
}

function tick(t: number) {
  if (!running) return;
  const dt = Math.min(50, t - lastT);
  lastT = t;
  step(dt);
  render(t);
  rafId = requestAnimationFrame(tick);
}

function start() {
  if (running || !ctx) return;
  lastT = performance.now();
  // Always paint one frame immediately so the field is visible even before
  // the first rAF tick (e.g. if the tab is hidden on load).
  render(lastT);
  if (reduced || document.hidden) return;
  running = true;
  rafId = requestAnimationFrame(tick);
}

function stop() {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
}

export function initLatentField(c: HTMLCanvasElement): void {
  if (initialized) return;
  canvas = c;
  ctx = c.getContext('2d');
  if (!ctx) return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduced = motion.matches;
  motion.addEventListener('change', () => {
    reduced = motion.matches;
    stop();
    pulses = [];
    start();
  });
  resize();

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 120);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  initialized = true;
  start();
}

export function setMode(m: FieldMode): void {
  mode = m;
  if (m !== 'reading') readingTarget = null;
}

export function setStreakActive(active: boolean): void {
  streakActive = active;
}

export function setBias(weight: number, side: BiasSide): void {
  biasWeight = clamp(weight, 0, 1);
  biasSide = weight === 0 ? 'neutral' : side;
}

export function setReadingTarget(x: number, y: number): void {
  readingTarget = { x, y };
}

export function fieldPulse(x: number, y: number, kind: PulseKind): void {
  if (reduced || document.hidden) return;
  let color: RGB;
  switch (kind) {
    case 'correct': color = AI_RGB; break;
    case 'incorrect': color = INCORRECT_RGB; break;
    case 'human': color = HUMAN_RGB; break;
    case 'ai': color = AI_RGB; break;
  }
  pulses.push({
    x, y,
    age: 0,
    lifetime: 1300,
    maxRadius: Math.max(width, height) * 0.7,
    color,
  });
}
