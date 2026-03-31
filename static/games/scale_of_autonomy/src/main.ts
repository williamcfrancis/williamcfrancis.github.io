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
  stats: { label: string; value: string }[];
  annotation: string;
}

export const LEVELS: LevelData[] = [
  {
    id: 1,
    title: 'The Thermostat',
    year: '1883',
    stats: [
      { label: 'Sensors', value: '1' },
      { label: 'Decisions/sec', value: '0.01' },
      { label: 'Planning horizon', value: 'NOW' },
    ],
    annotation:
      'The first closed-loop controller. Invented by Warren Johnson in 1883. It has one sensor, one rule: "too cold → heat on; too warm → heat off." This is autonomy at its simplest — and it\'s in every building on Earth.',
  },
  {
    id: 2,
    title: 'Cruise Control',
    year: '1958',
    stats: [
      { label: 'Sensors', value: '1 (speed)' },
      { label: 'Decisions/sec', value: '10' },
      { label: 'Planning horizon', value: '1 second' },
    ],
    annotation:
      'A PID controller — the backbone of industrial automation. It doesn\'t know about hills, traffic, or weather. It only knows the gap between desired speed and actual speed.',
  },
  {
    id: 3,
    title: 'The Roomba',
    year: '2002',
    stats: [
      { label: 'Sensors', value: '6 (bump, cliff, IR)' },
      { label: 'Decisions/sec', value: '50' },
      { label: 'Planning horizon', value: '0.1 seconds' },
    ],
    annotation:
      'No map. No memory. Just bump-and-turn with a slight spiral bias. The first Roomba had less processing power than a digital watch — yet it cleans 90% of a room through emergent coverage.',
  },
  {
    id: 4,
    title: 'The Drone',
    year: '2013',
    stats: [
      { label: 'Sensors', value: '20+ (IMU, GPS, cameras…)' },
      { label: 'Decisions/sec', value: '1,000' },
      { label: 'Planning horizon', value: '2 seconds' },
    ],
    annotation:
      'Fusing 20 sensors at 1,000 Hz to hold a position in 3D space within centimeters. The IMU alone makes 6,000 measurements per second. A human pilot couldn\'t react this fast.',
  },
  {
    id: 5,
    title: 'Warehouse Robots',
    year: '2012',
    stats: [
      { label: 'Sensors', value: 'Floor markers + IR + central planner' },
      { label: 'Robots coordinated', value: '800+' },
      { label: 'Decisions', value: 'Centrally orchestrated' },
    ],
    annotation:
      '800 robots in a single warehouse, inches apart, zero collisions. The secret: a central traffic planner assigns every path. No robot decides for itself. It\'s autonomy through obedience.',
  },
  {
    id: 6,
    title: 'Self-Driving Car — Level 2',
    year: '2016',
    stats: [
      { label: 'Sensors', value: '8 cameras, 12 ultrasonics, radar' },
      { label: 'Data', value: '1.5 TB/day' },
      { label: 'Planning horizon', value: '5 seconds' },
      { label: 'Requires', value: 'Human supervision' },
    ],
    annotation:
      'It perceives the world in astonishing detail — but it doesn\'t understand it. L2 autonomy means the car can steer, accelerate, and brake, but a human must be ready to take over at any moment. The hardest part of self-driving isn\'t the common case — it\'s the 0.01%.',
  },
  {
    id: 7,
    title: 'Self-Driving Car — Level 4',
    year: '2020',
    stats: [
      { label: 'Sensors', value: '29 cameras, 5 LiDAR, 6 radar' },
      { label: 'Decision cycle', value: '10 ms' },
      { label: 'Autonomous miles', value: '25+ million' },
      { label: 'Planning horizon', value: '8 seconds' },
    ],
    annotation:
      'The human is gone from the loop. Every 10 milliseconds, the car predicts the future positions of every agent in the scene, simulates thousands of possible trajectories, and picks the safest one. 25 million miles driven. Fewer accidents per mile than human drivers.',
  },
  {
    id: 8,
    title: 'Surgical Robot',
    year: '2000',
    stats: [
      { label: 'Degrees of freedom', value: '7 per arm' },
      { label: 'Tremor filtering', value: '1,000 Hz' },
      { label: 'Magnification', value: '10×' },
      { label: 'Incision precision', value: '1 mm' },
    ],
    annotation:
      'The da Vinci system doesn\'t decide what to do — a human surgeon controls it. But it filters out hand tremors at 1,000 Hz, scales movements down 5:1, and provides a 10× magnified 3D view. It\'s autonomy in service of human skill — a cyborg surgeon.',
  },
  {
    id: 9,
    title: 'Mars Rover',
    year: '2021',
    stats: [
      { label: 'Signal delay', value: '4–24 min one-way' },
      { label: 'Autonomous driving', value: '200 m/day' },
      { label: 'Computing', value: '200 MHz RAD750' },
      { label: 'Planned for', value: '90 sols → lasted 1,000+' },
    ],
    annotation:
      'At 24 minutes each way, a simple "drive forward 1 meter" command takes 48 minutes to confirm. Every day, Perseverance must plan its own route across terrain it\'s never seen. If something goes wrong, help is at least 4 minutes away — traveling at the speed of light. It is the loneliest robot in the solar system.',
  },
  {
    id: 10,
    title: 'Satellite Constellation',
    year: '2019–',
    stats: [
      { label: 'Active satellites', value: '6,000+' },
      { label: 'Maneuvers/month', value: 'Thousands' },
      { label: 'Coordination', value: 'Laser crosslinks' },
      { label: 'Debris tracked', value: '30,000+ objects' },
    ],
    annotation:
      'There is no ground controller joysticking 6,000 satellites. Each one tracks its own orbit, monitors collision risk with 30,000 pieces of space debris, and fires its thruster autonomously to dodge. They talk to each other at the speed of light via laser crosslinks. It\'s a self-organizing swarm in low Earth orbit.',
  },
  {
    id: 11,
    title: 'Autonomous Scientific Discovery',
    year: '2020',
    stats: [
      { label: 'Predictions', value: '200M protein structures' },
      { label: 'Traditional method', value: 'Months–years each' },
      { label: 'AlphaFold', value: 'Seconds' },
      { label: 'Accuracy', value: 'Rivals X-ray crystallography' },
    ],
    annotation:
      'AlphaFold didn\'t just speed up science. It made obsolete a type of work that won Nobel Prizes. When a system can autonomously make scientific discoveries faster than humans can design experiments, we\'ve crossed a threshold that has no historical precedent.',
  },
  {
    id: 12,
    title: 'Von Neumann Probe',
    year: 'Theoretical',
    stats: [
      { label: 'Sensors', value: 'Self-designed' },
      { label: 'Decisions/sec', value: 'All of them' },
      { label: 'Planning horizon', value: 'Geological time' },
      { label: 'Humans required', value: '0' },
    ],
    annotation:
      'A machine that travels to another star system, mines raw materials, builds a copy of itself, and sends that copy onward. Repeat. In a few million years — a blink in cosmic time — every star in the galaxy has been visited. Mathematician John von Neumann proved this is theoretically possible in 1948. No one has built one. Yet.',
  },
];

// ════════════════════════════════════════════════════════════
// DOM CREATION
// ════════════════════════════════════════════════════════════

function createIntro(): HTMLElement {
  const s = document.createElement('section');
  s.id = 'intro';
  s.className = 'intro-section';
  s.innerHTML = `
    <h1 class="main-title">The Scale of Autonomy</h1>
    <p class="subtitle">From thermostats to starships. Scroll to ascend.</p>
    <div class="scroll-arrow">↓</div>
  `;
  return s;
}

function createLevelSection(level: LevelData): HTMLElement {
  const s = document.createElement('section');
  s.id = `level-${level.id}`;
  s.className = 'level-section';
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

function createTransition(fromId: number, toTitle: string): HTMLElement {
  const d = document.createElement('div');
  d.className = 'transition-zone';
  d.dataset.from = String(fromId);
  d.innerHTML = `<span class="upcoming-title">${toTitle}</span>`;
  return d;
}

function createOutro(): HTMLElement {
  const s = document.createElement('section');
  s.id = 'outro';
  s.className = 'outro-section';
  s.innerHTML = `
    <p class="outro-text">The spectrum of autonomy isn't about replacing humans. It's about extending what's possible — from a thermostat that keeps you warm to a probe that outlives our sun.</p>
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

  interface Particle {
    x: number;
    y: number;
    r: number;
    vy: number;
    vx: number;
    opacity: number;
  }

  const particles: Particle[] = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vy: -(Math.random() * 0.15 + 0.02),
      vx: (Math.random() - 0.5) * 0.08,
      opacity: Math.random() * 0.35 + 0.08,
    });
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const offset = scrollY * 0.1;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      const drawY =
        ((p.y - (offset % canvas.height)) % canvas.height + canvas.height) %
        canvas.height;

      ctx.beginPath();
      ctx.arc(p.x, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 200, 255, ${p.opacity})`;
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
      ${LEVELS.map(
        (l, i) => `
        <div class="meter-tick" id="meter-tick-${l.id}" style="bottom: ${(i / (LEVELS.length - 1)) * 100}%">
          <span class="meter-label">${l.title}</span>
        </div>
      `,
      ).join('')}
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
      const progress = self.progress;
      fill.style.height = `${progress * 100}%`;

      const currentLevel = Math.min(
        LEVELS.length,
        Math.floor(progress * LEVELS.length) + 1,
      );
      LEVELS.forEach((l) => {
        const tick = document.getElementById(`meter-tick-${l.id}`);
        if (tick) {
          if (l.id === currentLevel) {
            tick.classList.add('active');
          } else {
            tick.classList.remove('active');
          }
        }
      });
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
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      const el = document.getElementById(`level-${num}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === '0') {
      document.getElementById('level-10')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === '-') {
      document.getElementById('level-11')?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === '=') {
      document.getElementById('level-12')?.scrollIntoView({ behavior: 'smooth' });
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

    const tl = createVignette(level.id, vignetteContainer);

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=1200',
      pin: true,
      scrub: 1,
      animation: tl,
    });
  });

  // Outro fade-in
  gsap.to('.outro-text', {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: '#outro',
      start: 'top 70%',
      end: 'top 30%',
      scrub: 1,
    },
  });
  gsap.from('.outro-text', { y: 40 });
  gsap.to('.outro-actions', {
    opacity: 1,
    scrollTrigger: {
      trigger: '#outro',
      start: 'top 50%',
      end: 'top 20%',
      scrub: 1,
    },
  });
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════

function init(): void {
  const app = document.getElementById('app')!;

  app.appendChild(createIntro());

  LEVELS.forEach((level, i) => {
    if (i > 0) {
      app.appendChild(createTransition(LEVELS[i - 1].id, level.title));
    }
    app.appendChild(createLevelSection(level));
  });

  app.appendChild(createOutro());

  initParticles();
  initMeter();
  initBackgroundTransition();

  requestAnimationFrame(() => {
    setupScrollAnimations();
    initKeyboard();

    gsap.from('.main-title', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: 'power3.out',
    });
    gsap.from('.subtitle', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 0.5,
      ease: 'power3.out',
    });
    gsap.to('.scroll-arrow', {
      y: 15,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  });

  // Outro button handlers
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (target.classList.contains('btn-share')) {
      if (navigator.share) {
        navigator.share({
          title: 'The Scale of Autonomy',
          text: 'From thermostats to starships — an interactive journey through every level of autonomous systems.',
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        target.textContent = 'Link copied!';
        setTimeout(() => {
          target.textContent = 'Share';
        }, 2000);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
