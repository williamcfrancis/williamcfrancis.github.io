import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createVignette } from './vignettes';
import { ACCENTS, AS_OF, REDUCED_MOTION } from './tokens';
import { IdleManager } from './idle';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

// ════════════════════════════════════════════════════════════
// LEVEL DATA
// Every numeric or attributed claim cites a source rendered in
// the closing citations panel.
// ════════════════════════════════════════════════════════════

export interface Stat { label: string; value: string; asOf?: string; }
export interface Source { claim: string; cite: string; url?: string; }
export interface LevelData {
  id: number;
  title: string;
  year: string;
  accent: string;
  stats: Stat[];
  annotation: string;
  sources: Source[];
}

export const LEVELS: LevelData[] = [
  {
    id: 1, title: 'The Thermostat', year: '1883', accent: ACCENTS[0].fill,
    stats: [
      { label: 'Sensors', value: '1' },
      { label: 'Decisions/sec', value: '~0.01' },
      { label: 'Planning horizon', value: 'NOW' },
    ],
    annotation: 'The first closed-loop controller. In 1883, Warren S. Johnson patented the electric room thermostat. One sensor, one rule: too cold \u2192 heat on; too warm \u2192 heat off. The same idea \u2014 sense, compare, act \u2014 quietly runs nearly every climate-controlled building on Earth.',
    sources: [
      { claim: 'Warren S. Johnson\u2019s 1883 electric thermostat (US Patent 281,884).', cite: 'U.S. Patent No. 281,884', url: 'https://patents.google.com/patent/US281884' },
      { claim: 'Thermostats as a canonical closed-loop controller.', cite: 'Bennett, S. (1996). A brief history of automatic control. IEEE Control Systems Magazine.' },
    ],
  },
  {
    id: 2, title: 'Cruise Control', year: '1958', accent: ACCENTS[1].fill,
    stats: [
      { label: 'Sensors', value: '1 (speed)' },
      { label: 'Decisions/sec', value: '~10' },
      { label: 'Planning horizon', value: '1 second' },
    ],
    annotation: 'A PID controller \u2014 the workhorse of industrial control. It doesn\u2019t know about hills, traffic, or weather. It only knows the gap between the set speed and the actual speed, and pushes the throttle to close that gap. Chrysler shipped the first modern automotive cruise control on the 1958 Imperial.',
    sources: [
      { claim: '1958 Chrysler Imperial: first modern automotive cruise control (Auto-Pilot).', cite: 'Chrysler Corporation press materials, 1958.' },
      { claim: 'PID control underpins most industrial automation.', cite: '\u00C5str\u00F6m & H\u00E4gglund (2006), Advanced PID Control. ISA.' },
    ],
  },
  {
    id: 3, title: 'The Roomba', year: '2002', accent: ACCENTS[2].fill,
    stats: [
      { label: 'Sensors', value: '6 (bump, cliff, IR)' },
      { label: 'Decisions/sec', value: '~50' },
      { label: 'Planning horizon', value: '0.1 seconds' },
    ],
    annotation: 'No map. No memory. Just bump-and-turn with a slight spiral bias. The original Roomba ran on a microcontroller modest by even 2002 standards \u2014 and yet, given enough time, randomized motion covers most of a room. Coverage is emergent, not designed.',
    sources: [
      { claim: 'iRobot Roomba launched in September 2002.', cite: 'iRobot Corp., \u201CHistory of the Roomba.\u201D', url: 'https://www.irobot.com/about-irobot' },
      { claim: 'Original Roomba\u2019s reactive (no-map) coverage strategy.', cite: 'Jones, J. (2006). Robots at the tipping point. IEEE Robotics & Automation Magazine.' },
    ],
  },
  {
    id: 4, title: 'The Drone', year: '2013', accent: ACCENTS[3].fill,
    stats: [
      { label: 'Sensors', value: '20+ (IMU, GPS, cameras\u2026)' },
      { label: 'Decisions/sec', value: '~1,000' },
      { label: 'Planning horizon', value: '~2 seconds' },
    ],
    annotation: 'Consumer-grade quadcopters arrived around 2013 (DJI Phantom 1) and brought aerospace-grade attitude control to a $700 toy. A modern drone fuses dozens of sensor streams roughly a thousand times a second to hold position to within centimeters \u2014 faster than any human pilot can react.',
    sources: [
      { claim: 'DJI Phantom 1 launched January 2013.', cite: 'DJI Technology Co., 2013 product launch.' },
      { claim: 'Quadrotor flight control loops typically run at 500\u20131,000 Hz.', cite: 'Mahony, Kumar, Corke (2012). Multirotor aerial vehicles. IEEE Robotics & Automation Magazine.' },
    ],
  },
  {
    id: 5, title: 'Warehouse Robots', year: '2012', accent: ACCENTS[4].fill,
    stats: [
      { label: 'Sensors', value: 'Floor markers + IR + central planner' },
      { label: 'Robots per facility', value: '1,000+' },
      { label: 'Decisions', value: 'Centrally orchestrated' },
    ],
    annotation: 'Over a thousand mobile robots can share a single warehouse floor, inches apart, because none of them decides for itself. A central traffic planner assigns every path. Collisions are vanishingly rare \u2014 not by chance, but by construction. It is autonomy through obedience.',
    sources: [
      { claim: 'Amazon acquired Kiva Systems in 2012 for $775M; deployment scaled to 750k+ robots fleetwide by 2024.', cite: 'Amazon press release, March 2012; Amazon Robotics 2024 update.' },
      { claim: 'Centralized fleet management architecture for AGV warehouses.', cite: 'Wurman, D\u2019Andrea, Mountz (2008). Coordinating hundreds of cooperative, autonomous vehicles in warehouses. AI Magazine.' },
    ],
  },
  {
    id: 6, title: 'Self-Driving Car \u2014 Level\u00a02', year: '2016', accent: ACCENTS[5].fill,
    stats: [
      { label: 'Sensors', value: '8 cameras, 12 ultrasonics, radar (HW2.5\u2013HW3)' },
      { label: 'Data', value: '~1.5\u2009TB/day' },
      { label: 'Planning horizon', value: '~5 seconds' },
      { label: 'Requires', value: 'Human supervision' },
    ],
    annotation: 'It perceives the world in astonishing detail \u2014 but it does not understand it. SAE Level\u00a02 means the car can steer, accelerate, and brake on its own, but a human must be ready to take over at any moment. The hardest part of driving isn\u2019t the common case. It\u2019s the 0.01%.',
    sources: [
      { claim: 'SAE Level\u00a02 definition: combined lateral & longitudinal control with continuous human supervision.', cite: 'SAE J3016 (2021 revision).', url: 'https://www.sae.org/standards/content/j3016_202104/' },
      { claim: 'Tesla Autopilot HW2.5/HW3 sensor configuration (2016\u20132021).', cite: 'Tesla Motors Inc., Autopilot hardware specification (archived).' },
    ],
  },
  {
    id: 7, title: 'Self-Driving Car \u2014 Level\u00a04', year: '2020 \u2192 present', accent: ACCENTS[6].fill,
    stats: [
      { label: 'Sensors', value: '29 cameras, 5 lidars, 6 radars (Waymo 5th-gen)' },
      { label: 'Decision cycle', value: '~10\u2009ms' },
      { label: 'Rider-only miles', value: '70M+', asOf: AS_OF },
      { label: 'Planning horizon', value: '~8 seconds' },
    ],
    annotation: 'In 2020, Waymo carried its first rider-only passengers in a small Phoenix geofence. Six years on, the same kind of L4 service runs in Phoenix, San Francisco, Los Angeles, and Austin \u2014 still geofenced, still mapped to the centimeter. Within those areas, Waymo reports about 80% fewer airbag-deployment crashes per mile than the human-driver benchmark for the same regions. Outside those areas, the human is still the driver.',
    sources: [
      { claim: 'Waymo One launched fully driverless rides in metro Phoenix in October 2020; service expanded to SF (2023), LA (2024), and Austin (2024).', cite: 'Waymo company blog, 2020\u20132024.', url: 'https://waymo.com/blog/' },
      { claim: 'Waymo 5th-generation Driver: 29 cameras, 5 lidars, 6 radars.', cite: 'Waymo Driver hardware overview.', url: 'https://waymo.com/waymo-driver/' },
      { claim: 'Within Waymo\u2019s operating areas: ~80% fewer airbag-deployment crashes per mile vs. human-driver benchmark.', cite: 'Swiss Re & Waymo joint study (2023, updated 2025).', url: 'https://waymo.com/safety/' },
      { claim: 'Cumulative rider-only autonomous miles passed 50M in late 2025; 70M+ as of mid-2026.', cite: 'Waymo public mile counter.' },
    ],
  },
  {
    id: 8, title: 'Surgical Robot', year: '2000', accent: ACCENTS[7].fill,
    stats: [
      { label: 'Degrees of freedom', value: '7 per arm' },
      { label: 'Tremor filtering', value: '1,000\u2009Hz' },
      { label: 'Magnification', value: '10\u00d7 3D' },
      { label: 'Motion scaling', value: 'up to 5:1' },
    ],
    annotation: 'The da Vinci system does not decide what to do \u2014 a human surgeon controls every motion. But it filters hand tremors at 1,000\u2009Hz, scales 5\u2009cm of surgeon movement down to 1\u2009cm of instrument movement, and renders the field in 10\u00d7 stereoscopic 3D. It is autonomy in service of human skill: a cyborg surgeon.',
    sources: [
      { claim: 'da Vinci Surgical System received FDA clearance in July 2000.', cite: 'U.S. FDA 510(k) clearance K002489.', url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K002489' },
      { claim: '7 DoF per EndoWrist, 1,000\u2009Hz tremor filtering, 10\u00d7 stereo magnification, configurable motion scaling.', cite: 'Intuitive Surgical Inc., da Vinci Xi system specification.' },
    ],
  },
  {
    id: 9, title: 'Mars Rover', year: '2021 \u2192 present', accent: ACCENTS[8].fill,
    stats: [
      { label: 'Signal delay', value: '4\u201324\u2009min one-way' },
      { label: 'Autonomous driving', value: 'up to 200\u2009m/sol' },
      { label: 'Computing', value: '200\u2009MHz RAD750' },
      { label: 'Mission duration', value: '1,500+ sols', asOf: AS_OF },
    ],
    annotation: 'A simple \u201Cdrive forward 1\u2009m\u201D command can take 48 minutes to confirm round-trip. So Perseverance plans its own path across terrain it has never seen, every sol. If something goes wrong, help is at least 4 minutes away \u2014 traveling at the speed of light. It is the loneliest robot in the solar system.',
    sources: [
      { claim: 'Perseverance landed in Jezero Crater on 18 February 2021 and exceeded its prime mission.', cite: 'NASA JPL Perseverance mission page.', url: 'https://mars.nasa.gov/mars2020/' },
      { claim: 'AutoNav onboard navigation; ~200\u2009m/sol typical autonomous drives.', cite: 'Verma et al. (2023). Autonomous robotics on Mars. Science Robotics.' },
      { claim: '200\u2009MHz BAE RAD750 single-board computer.', cite: 'BAE Systems RAD750 product datasheet.' },
    ],
  },
  {
    id: 10, title: 'Satellite Constellation', year: '2019 \u2192 present', accent: ACCENTS[9].fill,
    stats: [
      { label: 'Active Starlink satellites', value: '7,500+', asOf: AS_OF },
      { label: 'Maneuvers / 6 mo', value: '50,000+' },
      { label: 'Coordination', value: 'Laser inter-sat links' },
      { label: 'Tracked debris objects', value: '35,000+', asOf: AS_OF },
    ],
    annotation: 'No ground controller is joysticking 7,500 satellites. Each one tracks its own orbit, monitors collision risk against tens of thousands of debris objects, and fires its ion thruster autonomously to dodge. They talk to each other at the speed of light over laser inter-satellite links. It is a self-organizing swarm in low Earth orbit.',
    sources: [
      { claim: 'Starlink first operational launch in May 2019; v2 mini and laser-equipped satellites since 2023.', cite: 'SpaceX Starlink launch history.', url: 'https://www.spacex.com/launches/' },
      { claim: 'Active Starlink satellite count tracked publicly via TLE catalogues.', cite: 'CelesTrak (Kelso, T.S.).', url: 'https://celestrak.org/NORAD/elements/' },
      { claim: '~50,000 automated collision-avoidance maneuvers per six-month reporting window.', cite: 'SpaceX semi-annual Starlink constellation reports to FCC.', url: 'https://www.fcc.gov/' },
      { claim: 'U.S. Space Surveillance Network tracks ~35,000 objects \u226510\u2009cm.', cite: 'ESA Space Environment Report 2024.', url: 'https://www.esa.int/Space_Safety/Space_Debris' },
    ],
  },
  {
    id: 11, title: 'Autonomous Scientific Discovery', year: '2020 \u2192 2024', accent: ACCENTS[10].fill,
    stats: [
      { label: 'Predicted structures', value: '200M+', asOf: AS_OF },
      { label: 'Traditional method', value: 'Months\u2013years each' },
      { label: 'AlphaFold runtime', value: 'Seconds\u2013minutes' },
      { label: 'Median accuracy', value: 'Rivals X-ray crystallography' },
    ],
    annotation: 'AlphaFold 2 (2020) didn\u2019t just speed up structural biology \u2014 it folded almost every protein known to science in under a year. AlphaFold 3 (2024) extended the same trick to protein\u2013ligand and protein\u2013nucleic-acid complexes. When a system can autonomously make discoveries faster than humans can design experiments, the role of the experiment changes too.',
    sources: [
      { claim: 'AlphaFold 2 published November 2020; CASP14 demonstration.', cite: 'Jumper et al. (2021). Highly accurate protein structure prediction with AlphaFold. Nature 596:583\u2013589.', url: 'https://doi.org/10.1038/s41586-021-03819-2' },
      { claim: 'AlphaFold 3 launched May 2024; supports protein\u2013ligand & nucleic acids.', cite: 'Abramson et al. (2024). Accurate structure prediction of biomolecular interactions with AlphaFold 3. Nature 630:493\u2013500.', url: 'https://doi.org/10.1038/s41586-024-07487-w' },
      { claim: '200M+ predicted structures hosted in the AlphaFold Protein Structure Database.', cite: 'EMBL-EBI AlphaFold DB.', url: 'https://alphafold.ebi.ac.uk/' },
    ],
  },
  {
    id: 12, title: 'Von Neumann Probe', year: 'Theoretical', accent: ACCENTS[11].fill,
    stats: [
      { label: 'Sensors', value: 'Self-designed' },
      { label: 'Decisions/sec', value: 'All of them' },
      { label: 'Planning horizon', value: 'Geological time' },
      { label: 'Humans required', value: '0' },
    ],
    annotation: 'A machine that travels to another star system, mines raw material, builds a copy of itself, and sends the copy onward. Repeat. In a few million years \u2014 a blink in cosmic time \u2014 every star in the galaxy has been visited. John von Neumann\u2019s 1948 theory of self-reproducing automata established that a machine can in principle build a copy of itself. The interstellar-probe extension was popularized later, most explicitly by Frank Tipler in 1980. No one has built one. Yet.',
    sources: [
      { claim: 'Self-reproducing automata, presented at the Hixon Symposium (1948), published 1966.', cite: 'von Neumann, J. (1966). Theory of Self-Reproducing Automata. (A. Burks, ed.) Univ. of Illinois Press.' },
      { claim: 'Interstellar self-replicating probe argument.', cite: 'Tipler, F.J. (1980). Extraterrestrial intelligent beings do not exist. QJRAS 21:267\u2013281.' },
      { claim: 'Galaxy-colonization timescales of ~10\u2076 years for self-replicating probes.', cite: 'Bracewell, R.N. (1960); also Hart (1975), Tipler (1980).' },
    ],
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
    <p class="subtitle">From thermostats to starships. Twelve worlds, one common idea: a machine deciding for itself.</p>
    <p class="framing">A scale, not a standard. We borrow ideas from SAE J3016 (cars), Sheridan &amp; Verplank (1978), and Parasuraman, Sheridan &amp; Wickens (2000). The ordering you\u2019ll see is our own.</p>
    <p class="framing-fine">Levels 1\u20135 are deterministic automation. Levels 6\u201312 are adaptive autonomy. We use the broader term throughout.</p>
    <div class="intro-meta">
      <span class="intro-meta-item">12 levels</span>
      <span class="intro-meta-dot">\u00b7</span>
      <span class="intro-meta-item">~10 minutes</span>
      <span class="intro-meta-dot">\u00b7</span>
      <span class="intro-meta-item">Scroll, or press 1\u20139, 0, \u2013, =</span>
    </div>
    <div class="scroll-indicator">
      <span class="scroll-label">Scroll to begin</span>
      <svg class="scroll-chevrons" viewBox="0 0 24 36" width="20" height="30" aria-hidden="true">
        <path d="M4 6 L12 14 L20 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.25"/>
        <path d="M4 15 L12 23 L20 15" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M4 24 L12 32 L20 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  `;
  return s;
}

function renderStats(stats: Stat[]): string {
  return stats.map((st) => {
    const asOf = st.asOf ? `<span class="stat-asof">as of ${st.asOf}</span>` : '';
    return `<div class="stat"><span class="stat-label">${st.label}</span><span class="stat-value">${st.value}</span>${asOf}</div>`;
  }).join('');
}

function createLevelSection(level: LevelData): HTMLElement {
  const s = document.createElement('section');
  s.id = `level-${level.id}`;
  s.className = 'level-section';
  s.style.setProperty('--level-accent', level.accent);
  s.setAttribute('aria-labelledby', `level-${level.id}-title`);
  s.innerHTML = `
    <div class="level-content">
      <div class="vignette-area" id="vignette-${level.id}" role="img" aria-label="Visual depiction of ${level.title}"></div>
      <div class="level-info">
        <div class="level-header">
          <span class="level-number">Level ${level.id}</span>
          <h2 class="level-title" id="level-${level.id}-title">${level.title}</h2>
          <span class="level-year">${level.year}</span>
        </div>
        <div class="stat-card">${renderStats(level.stats)}</div>
        <p class="annotation">${level.annotation}</p>
      </div>
    </div>
  `;
  return s;
}

function createTransition(nextLevel: LevelData): HTMLElement {
  const d = document.createElement('div');
  d.className = 'transition-zone';
  d.setAttribute('aria-hidden', 'true');
  d.innerHTML = `
    <div class="transition-line"></div>
    <div class="transition-badge">${nextLevel.id}</div>
    <span class="upcoming-title">${nextLevel.title}</span>
  `;
  return d;
}

function renderCitations(): string {
  const items = LEVELS.map((l) => {
    const lines = l.sources.map((s) => {
      const link = s.url ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.cite}</a>` : s.cite;
      return `<li><span class="cite-claim">${s.claim}</span><span class="cite-source">${link}</span></li>`;
    }).join('');
    return `<section class="cite-block"><h3>Level ${l.id} \u00b7 ${l.title} <span class="cite-year">${l.year}</span></h3><ul>${lines}</ul></section>`;
  }).join('');
  return items;
}

function createOutro(): HTMLElement {
  const s = document.createElement('section');
  s.id = 'outro';
  s.className = 'outro-section';
  s.innerHTML = `
    <p class="outro-text">The spectrum of autonomy isn\u2019t about replacing humans. It\u2019s about extending what\u2019s possible \u2014 from a thermostat that keeps you warm to a probe that may outlive our sun.</p>
    <div class="outro-actions">
      <button class="btn-top">Back to top</button>
      <button class="btn-share">Share</button>
      <button class="btn-cite" aria-expanded="false" aria-controls="citations-panel">Citations &amp; sources</button>
    </div>
    <div id="citations-panel" class="citations-panel" hidden>
      <div class="citations-head">
        <p class="citations-intro">Every numeric or attributed claim in this exhibit, with the source we relied on. Last verified ${AS_OF}.</p>
      </div>
      <div class="citations-body">${renderCitations()}</div>
    </div>
    <p class="outro-meta">Last updated ${AS_OF}. Figures for living systems (Waymo, Starlink, AlphaFold) drift between updates.</p>
  `;
  return s;
}

// ════════════════════════════════════════════════════════════
// PARTICLE BACKGROUND
// ════════════════════════════════════════════════════════════

function initParticles(): void {
  if (REDUCED_MOTION) return;
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.setAttribute('aria-hidden', 'true');
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
// AUTONOMY METER (desktop) + MOBILE PROGRESS BAR
// ════════════════════════════════════════════════════════════

function initMeter(): void {
  const meter = document.createElement('div');
  meter.id = 'autonomy-meter';
  meter.setAttribute('aria-hidden', 'true');
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

  // Mobile progress bar (visible <= 960px via CSS)
  const mob = document.createElement('div');
  mob.id = 'mobile-progress';
  mob.setAttribute('aria-hidden', 'true');
  mob.innerHTML = `
    <div class="mp-fill" id="mp-fill"></div>
    <div class="mp-caption">
      <span class="mp-num" id="mp-num">Level 1 of ${LEVELS.length}</span>
      <span class="mp-name" id="mp-name">${LEVELS[0].title}</span>
    </div>
  `;
  document.body.appendChild(mob);

  const mpFill = document.getElementById('mp-fill')!;
  const mpNum = document.getElementById('mp-num')!;
  const mpName = document.getElementById('mp-name')!;

  ScrollTrigger.create({
    trigger: '#level-1',
    endTrigger: '#outro',
    start: 'top center',
    end: 'top center',
    onUpdate: (self) => {
      const p = self.progress;
      fill.style.height = `${p * 100}%`;
      mpFill.style.width = `${p * 100}%`;
      const cur = Math.min(LEVELS.length, Math.max(1, Math.floor(p * LEVELS.length) + 1));
      const curLevel = LEVELS[cur - 1];
      LEVELS.forEach((l) => {
        const tick = document.getElementById(`meter-tick-${l.id}`);
        if (tick) tick.classList.toggle('active', l.id === cur);
      });
      mpNum.textContent = `Level ${cur} of ${LEVELS.length}`;
      mpName.textContent = curLevel.title;
      mob.style.setProperty('--mp-accent', curLevel.accent);
    },
  });
}

// ════════════════════════════════════════════════════════════
// TOP PROGRESS BAR
// ════════════════════════════════════════════════════════════

function initProgressBar(): void {
  const bar = document.createElement('div');
  bar.className = 'top-progress';
  bar.setAttribute('aria-hidden', 'true');
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
        target.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
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

    const infoChildren = section.querySelectorAll('.level-header, .stat-card, .annotation');
    masterTl.from(infoChildren, {
      y: 25,
      opacity: 0,
      stagger: 0.04,
      duration: 0.12,
      ease: 'power2.out',
    }, 0);

    const vignetteTl = createVignette(level.id, vignetteContainer, section);
    masterTl.add(vignetteTl, 0);

    if (REDUCED_MOTION) {
      // No pinning, no scrub: just play once when the section enters.
      masterTl.progress(1);
      gsap.from(section, { opacity: 0, duration: 0.2, scrollTrigger: { trigger: section, start: 'top 80%' } });
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=1200',
        pin: true,
        scrub: 1,
        animation: masterTl,
      });
    }
  });

  const outroTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#outro',
      start: 'top 70%',
      end: 'top 20%',
      scrub: REDUCED_MOTION ? false : 1,
    },
  });
  outroTl.from('.outro-text', { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' })
    .from('.outro-actions', { y: 20, opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.3);
}

// ════════════════════════════════════════════════════════════
// CITATIONS PANEL TOGGLE
// ════════════════════════════════════════════════════════════

function initCitations(): void {
  const btn = document.querySelector<HTMLButtonElement>('.btn-cite');
  const panel = document.getElementById('citations-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
    if (!expanded) panel.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'start' });
  });
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════

function init(): void {
  if (REDUCED_MOTION) document.body.classList.add('reduced-motion');

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
  initCitations();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setupScrollAnimations();
      initKeyboard();
      IdleManager.begin();

      gsap.to(loadingScreen, {
        opacity: 0,
        duration: REDUCED_MOTION ? 0.1 : 0.6,
        ease: 'power2.inOut',
        onComplete: () => loadingScreen.remove(),
      });

      if (!REDUCED_MOTION) {
        gsap.from('.main-title', { opacity: 0, y: 40, duration: 1.2, delay: 0.4, ease: 'power3.out' });
        gsap.from('.subtitle', { opacity: 0, y: 25, duration: 1.0, delay: 0.7, ease: 'power3.out' });
        gsap.from('.framing', { opacity: 0, y: 18, duration: 0.9, delay: 0.95, ease: 'power3.out' });
        gsap.from('.framing-fine', { opacity: 0, y: 14, duration: 0.8, delay: 1.15, ease: 'power3.out' });
        gsap.from('.intro-meta', { opacity: 0, y: 12, duration: 0.7, delay: 1.35, ease: 'power3.out' });
        gsap.from('.scroll-indicator', { opacity: 0, y: 15, duration: 0.8, delay: 1.55, ease: 'power2.out' });
        gsap.to('.scroll-chevrons', { y: 8, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.8 });
      }
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('btn-top')) {
      window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
    }
    if (target.classList.contains('btn-share')) {
      if (navigator.share) {
        navigator.share({
          title: 'The Scale of Autonomy',
          text: 'From thermostats to starships \u2014 an interactive journey through every level of autonomous systems.',
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
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
