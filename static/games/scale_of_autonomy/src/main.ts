import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createVignette } from './vignettes';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════════════════════════
// LEVEL DATA
// ════════════════════════════════════════════════════════════

export interface LevelData {
  id: number;
  title: string;
  year: string;
  accent: string;
  stats: { label: string; value: string }[];
  annotation: string;
}

const ACCENT_COLORS = [
  '#ff6633', '#3b82f6', '#22c55e', '#00d4ff', '#06b6d4',
  '#f59e0b', '#22c55e', '#3b82f6', '#f97316', '#818cf8',
  '#a855f7', '#fbbf24',
];

export const LEVELS: LevelData[] = [
  {
    id: 1, title: 'The Thermostat', year: '1883', accent: ACCENT_COLORS[0],
    stats: [
      { label: 'Sensors', value: '1' },
      { label: 'Decisions/sec', value: '0.01' },
      { label: 'Planning horizon', value: 'NOW' },
    ],
    annotation: 'The first closed-loop controller. Invented by Warren Johnson in 1883. It has one sensor, one rule: \u201Ctoo cold \u2192 heat on; too warm \u2192 heat off.\u201D This is autonomy at its simplest \u2014 and it\u2019s in every building on Earth.',
  },
  {
    id: 2, title: 'Cruise Control', year: '1958', accent: ACCENT_COLORS[1],
    stats: [
      { label: 'Sensors', value: '1 (speed)' },
      { label: 'Decisions/sec', value: '10' },
      { label: 'Planning horizon', value: '1 second' },
    ],
    annotation: 'A PID controller \u2014 the backbone of industrial automation. It doesn\u2019t know about hills, traffic, or weather. It only knows the gap between desired speed and actual speed.',
  },
  {
    id: 3, title: 'The Roomba', year: '2002', accent: ACCENT_COLORS[2],
    stats: [
      { label: 'Sensors', value: '6 (bump, cliff, IR)' },
      { label: 'Decisions/sec', value: '50' },
      { label: 'Planning horizon', value: '0.1 seconds' },
    ],
    annotation: 'No map. No memory. Just bump-and-turn with a slight spiral bias. The first Roomba had less processing power than a digital watch \u2014 yet it cleans 90% of a room through emergent coverage.',
  },
  {
    id: 4, title: 'The Drone', year: '2013', accent: ACCENT_COLORS[3],
    stats: [
      { label: 'Sensors', value: '20+ (IMU, GPS, cameras\u2026)' },
      { label: 'Decisions/sec', value: '1,000' },
      { label: 'Planning horizon', value: '2 seconds' },
    ],
    annotation: 'Fusing 20 sensors at 1,000\u2009Hz to hold a position in 3D space within centimeters. The IMU alone makes 6,000 measurements per second. A human pilot couldn\u2019t react this fast.',
  },
  {
    id: 5, title: 'Warehouse Robots', year: '2012', accent: ACCENT_COLORS[4],
    stats: [
      { label: 'Sensors', value: 'Floor markers + IR + central planner' },
      { label: 'Robots coordinated', value: '800+' },
      { label: 'Decisions', value: 'Centrally orchestrated' },
    ],
    annotation: '800 robots in a single warehouse, inches apart, zero collisions. The secret: a central traffic planner assigns every path. No robot decides for itself. It\u2019s autonomy through obedience.',
  },
  {
    id: 6, title: 'Self-Driving Car \u2014 Level\u00a02', year: '2016', accent: ACCENT_COLORS[5],
    stats: [
      { label: 'Sensors', value: '8 cameras, 12 ultrasonics, radar' },
      { label: 'Data', value: '1.5\u2009TB/day' },
      { label: 'Planning horizon', value: '5 seconds' },
      { label: 'Requires', value: 'Human supervision' },
    ],
    annotation: 'It perceives the world in astonishing detail \u2014 but it doesn\u2019t understand it. L2 autonomy means the car can steer, accelerate, and brake, but a human must be ready to take over at any moment. The hardest part of self-driving isn\u2019t the common case \u2014 it\u2019s the 0.01%.',
  },
  {
    id: 7, title: 'Self-Driving Car \u2014 Level\u00a04', year: '2020', accent: ACCENT_COLORS[6],
    stats: [
      { label: 'Sensors', value: '29 cameras, 5 LiDAR, 6 radar' },
      { label: 'Decision cycle', value: '10\u2009ms' },
      { label: 'Autonomous miles', value: '25+ million' },
      { label: 'Planning horizon', value: '8 seconds' },
    ],
    annotation: 'The human is gone from the loop. Every 10 milliseconds, the car predicts the future positions of every agent in the scene, simulates thousands of possible trajectories, and picks the safest one. 25 million miles driven. Fewer accidents per mile than human drivers.',
  },
  {
    id: 8, title: 'Surgical Robot', year: '2000', accent: ACCENT_COLORS[7],
    stats: [
      { label: 'Degrees of freedom', value: '7 per arm' },
      { label: 'Tremor filtering', value: '1,000\u2009Hz' },
      { label: 'Magnification', value: '10\u00d7' },
      { label: 'Incision precision', value: '1\u2009mm' },
    ],
    annotation: 'The da Vinci system doesn\u2019t decide what to do \u2014 a human surgeon controls it. But it filters out hand tremors at 1,000\u2009Hz, scales movements down 5:1, and provides a 10\u00d7 magnified 3D view. It\u2019s autonomy in service of human skill \u2014 a cyborg surgeon.',
  },
  {
    id: 9, title: 'Mars Rover', year: '2021', accent: ACCENT_COLORS[8],
    stats: [
      { label: 'Signal delay', value: '4\u201324\u2009min one-way' },
      { label: 'Autonomous driving', value: '200\u2009m/day' },
      { label: 'Computing', value: '200\u2009MHz RAD750' },
      { label: 'Planned for', value: '90 sols \u2192 lasted 1,000+' },
    ],
    annotation: 'At 24 minutes each way, a simple \u201Cdrive forward 1 meter\u201D command takes 48 minutes to confirm. Every day, Perseverance must plan its own route across terrain it\u2019s never seen. If something goes wrong, help is at least 4 minutes away \u2014 traveling at the speed of light. It is the loneliest robot in the solar system.',
  },
  {
    id: 10, title: 'Satellite Constellation', year: '2019\u2013', accent: ACCENT_COLORS[9],
    stats: [
      { label: 'Active satellites', value: '6,000+' },
      { label: 'Maneuvers/month', value: 'Thousands' },
      { label: 'Coordination', value: 'Laser crosslinks' },
      { label: 'Debris tracked', value: '30,000+ objects' },
    ],
    annotation: 'There is no ground controller joysticking 6,000 satellites. Each one tracks its own orbit, monitors collision risk with 30,000 pieces of space debris, and fires its thruster autonomously to dodge. They talk to each other at the speed of light via laser crosslinks. It\u2019s a self-organizing swarm in low Earth orbit.',
  },
  {
    id: 11, title: 'Autonomous Scientific Discovery', year: '2020', accent: ACCENT_COLORS[10],
    stats: [
      { label: 'Predictions', value: '200M protein structures' },
      { label: 'Traditional method', value: 'Months\u2013years each' },
      { label: 'AlphaFold', value: 'Seconds' },
      { label: 'Accuracy', value: 'Rivals X-ray crystallography' },
    ],
    annotation: 'AlphaFold didn\u2019t just speed up science. It made obsolete a type of work that won Nobel Prizes. When a system can autonomously make scientific discoveries faster than humans can design experiments, we\u2019ve crossed a threshold that has no historical precedent.',
  },
  {
    id: 12, title: 'Von Neumann Probe', year: 'Theoretical', accent: ACCENT_COLORS[11],
    stats: [
      { label: 'Sensors', value: 'Self-designed' },
      { label: 'Decisions/sec', value: 'All of them' },
      { label: 'Planning horizon', value: 'Geological time' },
      { label: 'Humans required', value: '0' },
    ],
    annotation: 'A machine that travels to another star system, mines raw materials, builds a copy of itself, and sends that copy onward. Repeat. In a few million years \u2014 a blink in cosmic time \u2014 every star in the galaxy has been visited. Mathematician John von Neumann proved this is theoretically possible in 1948. No one has built one. Yet.',
  },
];

// ════════════════════════════════════════════════════════════
// DOM CREATION
// ════════════════════════════════════════════════════════════

function createLoadingScreen(): HTMLElement {
  const loader = document.createElement('div');
  loader.id = 'loading-screen';
  loader.innerHTML = `<div class="loader-ring"></div><p class="loader-text">Loading</p>`;
  document.body.appendChild(loader);
  return loader;
}

function createIntro(): HTMLElement {
  const s = document.createElement('section');
  s.id = 'intro';
  s.className = 'intro-section';
  s.innerHTML = `
    <h1 class="main-title">The Scale of<br>Autonomy</h1>
    <p class="subtitle">From thermostats to starships. Scroll to ascend.</p>
    <div class="scroll-indicator">
      <span class="scroll-label">Scroll to begin</span>
      <svg class="scroll-chevrons" viewBox="0 0 24 36" width="20" height="30">
        <path d="M4 6 L12 14 L20 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.25"/>
        <path d="M4 15 L12 23 L20 15" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M4 24 L12 32 L20 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  `;
  return s;
}

function createLevelSection(level: LevelData): HTMLElement {
  const s = document.createElement('section');
  s.id = `level-${level.id}`;
  s.className = 'level-section';
  s.style.setProperty('--level-accent', level.accent);
  s.innerHTML = `
    <div class="level-content">
      <div class="vignette-area" id="vignette-${level.id}"></div>
      <div class="level-info">
        <div class="level-header">
          <span class="level-number">Level ${level.id}</span>
          <h2 class="level-title">${level.title}</h2>
          <span class="level-year">${level.year}</span>
        </div>
        <div class="stat-card">
          ${level.stats.map((st) => `<div class="stat"><span class="stat-label">${st.label}</span><span class="stat-value">${st.value}</span></div>`).join('')}
        </div>
        <p class="annotation">${level.annotation}</p>
      </div>
    </div>
  `;
  return s;
}

function createTransition(nextLevel: LevelData): HTMLElement {
  const d = document.createElement('div');
  d.className = 'transition-zone';
  d.innerHTML = `
    <div class="transition-line"></div>
    <div class="transition-badge">${nextLevel.id}</div>
    <span class="upcoming-title">${nextLevel.title}</span>
  `;
  return d;
}

function createOutro(): HTMLElement {
  const s = document.createElement('section');
  s.id = 'outro';
  s.className = 'outro-section';
  s.innerHTML = `
    <p class="outro-text">The spectrum of autonomy isn\u2019t about replacing humans. It\u2019s about extending what\u2019s possible \u2014 from a thermostat that keeps you warm to a probe that outlives our sun.</p>
    <div class="outro-actions">
      <button class="btn-top">Back to top</button>
      <button class="btn-share">Share</button>
    </div>
  `;
  return s;
}

// ════════════════════════════════════════════════════════════
// PARTICLE BACKGROUND
// ════════════════════════════════════════════════════════════

function initParticles(): void {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d')!;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  interface Particle { x: number; y: number; r: number; vy: number; vx: number; o: number; }
  const particles: Particle[] = [];

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const W = () => window.innerWidth;
  const H = () => window.innerHeight;

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 1.4 + 0.3,
      vy: -(Math.random() * 0.12 + 0.02),
      vx: (Math.random() - 0.5) * 0.06,
      o: Math.random() * 0.3 + 0.06,
    });
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function animate() {
    const w = W(), h = H();
    ctx.clearRect(0, 0, w, h);
    const offset = scrollY * 0.1;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const drawY = ((p.y - (offset % h)) % h + h) % h;
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(170,195,255,${p.o})`;
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ════════════════════════════════════════════════════════════
// AUTONOMY METER
// ════════════════════════════════════════════════════════════

function initMeter(): void {
  const meter = document.createElement('div');
  meter.id = 'autonomy-meter';
  meter.innerHTML = `
    <div class="meter-track">
      <div class="meter-fill" id="meter-fill"></div>
      ${LEVELS.map((l, i) => `
        <div class="meter-tick" id="meter-tick-${l.id}" style="bottom:${(i / (LEVELS.length - 1)) * 100}%">
          <span class="meter-label">${l.title}</span>
        </div>
      `).join('')}
    </div>
  `;
  document.body.appendChild(meter);

  const fill = document.getElementById('meter-fill')!;

  ScrollTrigger.create({
    trigger: '#level-1',
    endTrigger: '#outro',
    start: 'top center',
    end: 'top center',
    onUpdate: (self) => {
      const p = self.progress;
      fill.style.height = `${p * 100}%`;
      const cur = Math.min(LEVELS.length, Math.floor(p * LEVELS.length) + 1);
      LEVELS.forEach((l) => {
        const tick = document.getElementById(`meter-tick-${l.id}`);
        if (tick) tick.classList.toggle('active', l.id === cur);
      });
    },
  });
}

// ════════════════════════════════════════════════════════════
// TOP PROGRESS BAR
// ════════════════════════════════════════════════════════════

function initProgressBar(): void {
  const bar = document.createElement('div');
  bar.className = 'top-progress';
  document.body.appendChild(bar);

  ScrollTrigger.create({
    trigger: '#app',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      bar.style.width = `${self.progress * 100}%`;
    },
  });
}

// ════════════════════════════════════════════════════════════
// BACKGROUND COLOR
// ════════════════════════════════════════════════════════════

function initBackgroundTransition(): void {
  ScrollTrigger.create({
    trigger: '#app',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const p = self.progress;
      const r = Math.round(11 - p * 6);
      const g = Math.round(13 - p * 8);
      const b = Math.round(23 - p * 7);
      document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
    },
  });
}

// ════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ════════════════════════════════════════════════════════════

function initKeyboard(): void {
  document.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    let targetId: string | null = null;
    const n = parseInt(e.key);
    if (n >= 1 && n <= 9) targetId = `level-${n}`;
    else if (e.key === '0') targetId = 'level-10';
    else if (e.key === '-') targetId = 'level-11';
    else if (e.key === '=') targetId = 'level-12';

    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

// ════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ════════════════════════════════════════════════════════════

function setupScrollAnimations(): void {
  LEVELS.forEach((level) => {
    const section = document.getElementById(`level-${level.id}`);
    const vignetteContainer = document.getElementById(`vignette-${level.id}`);
    if (!section || !vignetteContainer) return;

    const masterTl = gsap.timeline();

    // Staggered reveal for level info elements
    const infoChildren = section.querySelectorAll('.level-header, .stat-card, .annotation');
    masterTl.from(infoChildren, {
      y: 25,
      opacity: 0,
      stagger: 0.04,
      duration: 0.12,
      ease: 'power2.out',
    }, 0);

    // Vignette animation
    const vignetteTl = createVignette(level.id, vignetteContainer);
    masterTl.add(vignetteTl, 0);

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=1200',
      pin: true,
      scrub: 1,
      animation: masterTl,
    });
  });

  // Outro
  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#outro',
      start: 'top 70%',
      end: 'top 20%',
      scrub: 1,
    },
  });
  outroTl.from('.outro-text', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' })
    .from('.outro-actions', { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.3);
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════

function init(): void {
  const loadingScreen = createLoadingScreen();
  const app = document.getElementById('app')!;

  app.appendChild(createIntro());

  LEVELS.forEach((level, i) => {
    if (i > 0) app.appendChild(createTransition(level));
    app.appendChild(createLevelSection(level));
  });

  app.appendChild(createOutro());

  initParticles();
  initMeter();
  initProgressBar();
  initBackgroundTransition();

  // Defer heavy work to next frame so loading screen shows
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setupScrollAnimations();
      initKeyboard();

      // Dismiss loading screen
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => loadingScreen.remove(),
      });

      // Intro animations (after loading screen fades)
      gsap.from('.main-title', { opacity: 0, y: 40, duration: 1.2, delay: 0.4, ease: 'power3.out' });
      gsap.from('.subtitle', { opacity: 0, y: 25, duration: 1.2, delay: 0.7, ease: 'power3.out' });
      gsap.from('.scroll-indicator', { opacity: 0, y: 15, duration: 1, delay: 1.2, ease: 'power2.out' });
      gsap.to('.scroll-chevrons', { y: 8, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    });
  });

  // Button handlers (delegated)
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (target.classList.contains('btn-share')) {
      if (navigator.share) {
        navigator.share({
          title: 'The Scale of Autonomy',
          text: 'From thermostats to starships \u2014 an interactive journey through every level of autonomous systems.',
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          target.textContent = 'Link copied!';
          setTimeout(() => { target.textContent = 'Share'; }, 2000);
        });
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
