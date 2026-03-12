const W = 960, H = 540;
const GRAVITY = 0.42;
const PLAYER_SPEED = 3.2;
const JUMP_FORCE = -9.5;
const GROUND_ACCEL = 0.34;
const AIR_ACCEL = 0.18;
const GROUND_FRICTION = 0.82;
const AIR_FRICTION = 0.97;
const COYOTE_FRAMES = 7;
const JUMP_BUFFER_FRAMES = 7;
const JUMP_CUT = 0.52;
const MAX_FALL_SPEED = 15;
const MAX_GROUND_SPEED = 8;
const MAX_AIR_SPEED = 7;
const BULLET_SPEED = 7;
const FIRE_COOLDOWN = 22;
const PW = 26, PH = 38;
const BULLET_R = 4;
const MAX_HP = 100;
const ROUNDS_PER_GAME = 5;
const KILL_Y = H + 60;
const HOMING_MIN_TURN_PER_TICK = 0.008;
const HOMING_MAX_TURN_PER_TICK = 0.06;
const HOMING_FUEL_BASE = 36;
const HOMING_FUEL_SCALE = 70;
const PROFILE_KEY = 'wishforge_profile_v1';
const CODEX_LIMIT = 40;

const TRIPPY_URLS = [
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1604076913837-52ab5f6a4c07?w=960&h=540&fit=crop&q=50',
  'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=960&h=540&fit=crop&q=50',
];
const KILL_PHRASES = [
  'OBLITERATED!', 'DEMOLISHED!', 'YEETED!', 'ABSOLUTELY COOKED!',
  'SKILL ISSUE!', 'GET REKT!', 'FATALITY!', 'BONK!',
  'EMOTIONAL DAMAGE!', 'WIZARD DOWN!', 'WAND BROKEN!',
  'SPELL FAILED SUCCESSFULLY!', 'SMOKED!', 'OUTPLAYED!',
  'UNHINGED!', 'CHAOS REIGNS!', 'CRITICAL HIT TO DIGNITY!',
  'SENT TO THE SHADOW REALM!', 'DELETED!', 'VAPORIZED!',
];
let trippyImages = [];
let trippyLoaded = false;
let currentBgImage = null;
let bgHuePhase = 0;
let screenFlash = 0;
let screenFlashColor = '#fff';
let announcements = [];
let comboCount = [0, 0];

const LEVELS = [
  {
    name: 'CLASSIC DOJO',
    platforms: [
      { x: 0, y: 468, w: 370, h: 24 },
      { x: 590, y: 468, w: 370, h: 24 },
      { x: 350, y: 370, w: 260, h: 14 },
      { x: 80, y: 275, w: 190, h: 14 },
      { x: 690, y: 275, w: 190, h: 14 },
      { x: 390, y: 175, w: 180, h: 14 },
    ],
    spawns: [{ x: 160, y: 420 }, { x: 800, y: 420 }],
    theme: { top: '#00ffcc', bottom: '#ff00ff', fill: 'rgba(20, 20, 40, 0.85)', glow: '#00ffff', detail: 'rgba(0, 255, 180, 0.18)' },
  },
  {
    name: 'SKY ISLANDS',
    platforms: [
      { x: 60, y: 440, w: 140, h: 14 },
      { x: 760, y: 440, w: 140, h: 14 },
      { x: 300, y: 385, w: 120, h: 14 },
      { x: 540, y: 385, w: 120, h: 14 },
      { x: 140, y: 310, w: 110, h: 14 },
      { x: 710, y: 310, w: 110, h: 14 },
      { x: 420, y: 290, w: 120, h: 14 },
      { x: 240, y: 210, w: 100, h: 14 },
      { x: 620, y: 210, w: 100, h: 14 },
      { x: 420, y: 140, w: 120, h: 14 },
    ],
    spawns: [{ x: 130, y: 390 }, { x: 830, y: 390 }],
    theme: { top: '#88ccff', bottom: '#ffffff', fill: 'rgba(10, 20, 50, 0.9)', glow: '#4488ff', detail: 'rgba(100, 180, 255, 0.15)' },
  },
  {
    name: 'LAVA PIT',
    platforms: [
      { x: 0, y: 468, w: 280, h: 24 },
      { x: 680, y: 468, w: 280, h: 24 },
      { x: 10, y: 345, w: 130, h: 14 },
      { x: 820, y: 345, w: 130, h: 14 },
      { x: 220, y: 310, w: 150, h: 14 },
      { x: 590, y: 310, w: 150, h: 14 },
      { x: 380, y: 195, w: 200, h: 14 },
      { x: 420, y: 430, w: 120, h: 14 },
    ],
    spawns: [{ x: 140, y: 420 }, { x: 820, y: 420 }],
    theme: { top: '#ff4400', bottom: '#ffcc00', fill: 'rgba(40, 10, 5, 0.9)', glow: '#ff6600', detail: 'rgba(255, 100, 0, 0.18)' },
  },
  {
    name: 'STAIRWAY TO CHAOS',
    platforms: [
      { x: 30, y: 475, w: 200, h: 18 },
      { x: 380, y: 480, w: 200, h: 18 },
      { x: 730, y: 405, w: 200, h: 14 },
      { x: 80, y: 340, w: 180, h: 14 },
      { x: 700, y: 270, w: 180, h: 14 },
      { x: 140, y: 200, w: 170, h: 14 },
      { x: 640, y: 140, w: 170, h: 14 },
      { x: 350, y: 340, w: 260, h: 14 },
    ],
    spawns: [{ x: 130, y: 425 }, { x: 830, y: 355 }],
    theme: { top: '#44ff44', bottom: '#00cc66', fill: 'rgba(5, 25, 5, 0.9)', glow: '#00ff44', detail: 'rgba(0, 255, 100, 0.15)' },
  },
  {
    name: 'THE COLOSSEUM',
    platforms: [
      { x: 0, y: 480, w: 960, h: 24 },
      { x: 350, y: 330, w: 260, h: 14 },
      { x: 60, y: 210, w: 150, h: 14 },
      { x: 750, y: 210, w: 150, h: 14 },
    ],
    spawns: [{ x: 160, y: 430 }, { x: 800, y: 430 }],
    theme: { top: '#ffcc00', bottom: '#ff8800', fill: 'rgba(35, 25, 5, 0.9)', glow: '#ffaa00', detail: 'rgba(255, 200, 50, 0.15)' },
  },
  {
    name: 'NEON LATTICE',
    platforms: [
      { x: 40, y: 460, w: 110, h: 12 },
      { x: 230, y: 460, w: 110, h: 12 },
      { x: 420, y: 460, w: 110, h: 12 },
      { x: 620, y: 460, w: 110, h: 12 },
      { x: 810, y: 460, w: 110, h: 12 },
      { x: 135, y: 365, w: 110, h: 12 },
      { x: 330, y: 365, w: 110, h: 12 },
      { x: 525, y: 365, w: 110, h: 12 },
      { x: 715, y: 365, w: 110, h: 12 },
      { x: 40, y: 270, w: 110, h: 12 },
      { x: 230, y: 270, w: 110, h: 12 },
      { x: 420, y: 270, w: 110, h: 12 },
      { x: 620, y: 270, w: 110, h: 12 },
      { x: 810, y: 270, w: 110, h: 12 },
      { x: 330, y: 175, w: 110, h: 12 },
      { x: 525, y: 175, w: 110, h: 12 },
    ],
    spawns: [{ x: 95, y: 410 }, { x: 865, y: 410 }],
    theme: { top: '#cc44ff', bottom: '#8800ff', fill: 'rgba(20, 5, 35, 0.9)', glow: '#aa00ff', detail: 'rgba(180, 50, 255, 0.15)' },
  },
  {
    name: 'TWIN TOWERS',
    platforms: [
      { x: 30, y: 475, w: 210, h: 20 },
      { x: 720, y: 475, w: 210, h: 20 },
      { x: 50, y: 380, w: 170, h: 14 },
      { x: 740, y: 380, w: 170, h: 14 },
      { x: 70, y: 285, w: 140, h: 14 },
      { x: 750, y: 285, w: 140, h: 14 },
      { x: 90, y: 190, w: 120, h: 14 },
      { x: 750, y: 190, w: 120, h: 14 },
      { x: 390, y: 330, w: 180, h: 14 },
    ],
    spawns: [{ x: 135, y: 425 }, { x: 825, y: 425 }],
    theme: { top: '#00ffcc', bottom: '#0088aa', fill: 'rgba(5, 20, 30, 0.9)', glow: '#00ccaa', detail: 'rgba(0, 220, 180, 0.15)' },
  },
  {
    name: 'THE FUNNEL',
    platforms: [
      { x: 0, y: 280, w: 180, h: 14 },
      { x: 780, y: 280, w: 180, h: 14 },
      { x: 120, y: 345, w: 160, h: 14 },
      { x: 680, y: 345, w: 160, h: 14 },
      { x: 245, y: 410, w: 140, h: 14 },
      { x: 575, y: 410, w: 140, h: 14 },
      { x: 400, y: 210, w: 160, h: 14 },
      { x: 380, y: 475, w: 200, h: 20 },
    ],
    spawns: [{ x: 90, y: 230 }, { x: 870, y: 230 }],
    theme: { top: '#ff3366', bottom: '#ff0044', fill: 'rgba(35, 5, 15, 0.9)', glow: '#ff2244', detail: 'rgba(255, 50, 80, 0.15)' },
  },
];

let PLATFORMS = LEVELS[0].platforms;
let WALLS = [
  { x: -12, y: -100, w: 12, h: H + 200 },
  { x: W, y: -100, w: 12, h: H + 200 },
];
let SPAWNS = LEVELS[0].spawns;
let currentLevel = LEVELS[0];
let lastLevelIndex = -1;
const SEASONAL_OMENS = [
  { id: 'vernal-calm', name: 'Vernal Calm', desc: 'Balanced skies. No global twist.', color: '#d4c4f2', gravityMult: 1, bulletSpeedMult: 1, fireRateMult: 1, knockbackMult: 1, bounceBonus: 0, windForce: 0 },
  { id: 'moon-glide', name: 'Moon Glide', desc: 'Low gravity and softer landings.', color: '#c7d9ff', gravityMult: 0.84, bulletSpeedMult: 1, fireRateMult: 1, knockbackMult: 1, bounceBonus: 0, windForce: 0 },
  { id: 'mana-storm', name: 'Mana Storm', desc: 'Shots come out faster and fly hotter.', color: '#ffd3ad', gravityMult: 1, bulletSpeedMult: 1.14, fireRateMult: 1.12, knockbackMult: 1, bounceBonus: 0, windForce: 0 },
  { id: 'trickster-mirror', name: 'Trickster Mirror', desc: 'Projectiles rebound more and shove harder.', color: '#f8b7d0', gravityMult: 1, bulletSpeedMult: 1, fireRateMult: 1, knockbackMult: 1.16, bounceBonus: 1, windForce: 0 },
  { id: 'petal-gale', name: 'Petal Gale', desc: 'A playful sidewind bends movement and shots.', color: '#b8ebcf', gravityMult: 1, bulletSpeedMult: 0.98, fireRateMult: 1, knockbackMult: 1, bounceBonus: 0, windForce: 0.55 },
];

const DEFAULT_WEAPON = {
  name: 'Wish Twig',
  quip: 'A humble branch eager for destiny.',
  tradeoff: 'Balanced starter.',
  weapon_kind: 'wand',
  fantasy_flair: 'soft starlight',
  bullet_size: 1,
  bullet_speed: 1,
  bullet_damage: 1,
  bullet_count: 1,
  bullet_spread: 0,
  bullet_bounces: 0,
  bullet_homing: 0,
  fire_rate: 1,
  move_speed: 1,
  jump_power: 1,
  player_gravity: 1,
  player_size: 1,
  on_bounce_split: 0,
  knockback_power: 1,
  hp_bonus: 0,
  regen: 0,
  trail_style: 'sparkle',
  impact_style: 'sparkles',
  sound_profile: 'twig',
  projectile_shape: 'orb',
  trail_density: 1,
  effect_intensity: 1,
  sound_pitch: 1,
  sound_release: 1,
  status_slow: 0,
  status_slow_duration: 0,
  status_dot_dps: 0,
  status_dot_duration: 0,
  status_stun_duration: 0,
  lifesteal: 0,
  splash_radius: 0,
  splash_damage_mult: 0.4,
  cloud_radius: 0,
  cloud_duration: 0,
  cloud_dps: 0,
  cloud_slow: 0,
  projectile_growth: 0,
  pierce_walls: 0,
  ground_avoidance: 0,
  steering: 0,
  self_damage_on_shoot: 0,
  projectile_color: '#ffd37b',
  trail_color: '#ffe6b9',
  impact_color: '#fff4d7',
  glow_color: '#ffe7b0',
  pixel_rows: [
    '..AAA..',
    '.ABBBA.',
    '..ACD..',
    '..ACD..',
    '..ACD..',
    '...DD..',
    '...F...',
  ],
  palette: {
    A: '#f9e2a1',
    B: '#d9a55d',
    C: '#b87844',
    D: '#8c5f3f',
    E: '#fff1d6',
    F: '#5b4133',
    G: '#d9c0a1',
    H: '#f3d8b7',
    I: '#fff8ef',
    J: '#4f352b',
    K: '#e2c8a5',
    L: '#f8e4c3',
  },
  projectile_rows: [
    '.......',
    '..AAA..',
    '.AAAAA.',
    '.AAAAA.',
    '.AAAAA.',
    '..AAA..',
    '.......',
  ],
  projectile_palette: {
    A: '#fff3bf',
    B: '#ffd37b',
    C: '#ffe9b0',
    D: '#8c5f3f',
    E: '#fff1d6',
    F: '#5b4133',
    G: '#d9c0a1',
    H: '#f3d8b7',
    I: '#fff8ef',
    J: '#4f352b',
    K: '#e2c8a5',
    L: '#f8e4c3',
  },
};

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;

let gameState = 'title';
let players = [];
let playerWeapons = [DEFAULT_WEAPON, DEFAULT_WEAPON];
let bullets = [];
let particles = [];
let hazardFields = [];
let fireflies = [];
let butterflies = [];
let cloudWisps = [];
let muzzleFlashes = [];
let score = [0, 0];
let roundNum = 0;
let countdownVal = 0;
let countdownTimer = 0;
let compileLoser = -1;
let compileTimer = 0;
let compileSubmitted = false;
let compileResult = null;
let roundWinner = -1;
let shakeAmount = 0;
let slowMo = 0;
let lastTime = 0;
let bgCanvas = null;
let windPhase = 0;
let wishforgeProfile = loadProfile();
let activeOmen = SEASONAL_OMENS[0];
let currentRunStats = createRunStats();
let lastRunSummary = null;

function createRunStats() {
  return {
    shapes: new Set(),
    trails: new Set(),
    impacts: new Set(),
    sounds: new Set(),
    names: new Set(),
    flairs: new Set(),
    wishesByPlayer: [[], []],
    closeRounds: 0,
    roundWinners: [],
  };
}

function defaultProfile() {
  return {
    arcana: 0,
    totalMatches: 0,
    totalWishes: 0,
    bestStyleScore: 0,
    relicCodex: [],
    milestones: {
      shapeTrifecta: false,
      flairCollector: false,
      skyDancer: false,
    },
    lastOmenId: 'vernal-calm',
  };
}

function loadProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
    const base = defaultProfile();
    const merged = { ...base, ...(parsed || {}) };
    merged.arcana = Math.max(0, Math.floor(Number(merged.arcana) || 0));
    merged.totalMatches = Math.max(0, Math.floor(Number(merged.totalMatches) || 0));
    merged.totalWishes = Math.max(0, Math.floor(Number(merged.totalWishes) || 0));
    merged.bestStyleScore = Math.max(0, Math.floor(Number(merged.bestStyleScore) || 0));
    merged.relicCodex = Array.isArray(merged.relicCodex) ? merged.relicCodex.slice(0, CODEX_LIMIT) : [];
    merged.milestones = { ...base.milestones, ...(merged.milestones || {}) };
    merged.lastOmenId = String(merged.lastOmenId || base.lastOmenId);
    return merged;
  } catch {
    return defaultProfile();
  }
}

function saveProfile() {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(wishforgeProfile));
  } catch (err) {
    console.warn('[FWT] Profile save failed:', err?.message || err);
  }
}

function pickSeasonalOmen() {
  const pool = SEASONAL_OMENS.filter(o => o.id !== wishforgeProfile.lastOmenId);
  const source = pool.length ? pool : SEASONAL_OMENS;
  const omen = source[Math.floor(Math.random() * source.length)] || SEASONAL_OMENS[0];
  wishforgeProfile.lastOmenId = omen.id;
  saveProfile();
  return omen;
}

function addCodexEntry(weapon) {
  const entry = {
    name: String(weapon?.name || 'Unknown Relic').slice(0, 40),
    shape: String(weapon?.projectile_shape || weapon?.shape || 'orb').slice(0, 16),
    trail: String(weapon?.trail_style || weapon?.trail || 'sparkle').slice(0, 16),
    impact: String(weapon?.impact_style || weapon?.impact || 'sparkles').slice(0, 16),
    sound: String(weapon?.sound_profile || weapon?.sound || 'chime').slice(0, 16),
    flair: String(weapon?.fantasy_flair || weapon?.flair || '').slice(0, 40),
    omen: activeOmen?.name || 'Vernal Calm',
  };
  const seen = new Set();
  const next = [entry, ...(wishforgeProfile.relicCodex || [])].filter((item) => {
    const key = `${item.name}|${item.shape}|${item.trail}|${item.sound}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  wishforgeProfile.relicCodex = next.slice(0, CODEX_LIMIT);
}

function trackWishForRun(playerIdx, weapon) {
  if (!weapon) return;
  const row = {
    name: weapon.name,
    shape: weapon.projectile_shape,
    trail: weapon.trail_style,
    impact: weapon.impact_style,
    sound: weapon.sound_profile,
    flair: weapon.fantasy_flair,
  };
  currentRunStats.wishesByPlayer[playerIdx].push(row);
  currentRunStats.shapes.add(row.shape);
  currentRunStats.trails.add(row.trail);
  currentRunStats.impacts.add(row.impact);
  currentRunStats.sounds.add(row.sound);
  currentRunStats.names.add(row.name.toLowerCase());
  if (row.flair) currentRunStats.flairs.add(row.flair.toLowerCase());
}

function computeStyleScore() {
  const s = currentRunStats;
  const coverageBonus = s.wishesByPlayer.every(list => list.length > 0) ? 10 : 0;
  return (
    s.shapes.size * 8 +
    s.trails.size * 7 +
    s.impacts.size * 7 +
    s.sounds.size * 6 +
    s.names.size * 4 +
    s.flairs.size * 5 +
    s.closeRounds * 3 +
    coverageBonus
  );
}

function finalizeMatchProgression() {
  const styleScore = computeStyleScore();
  const closeBonus = currentRunStats.closeRounds * 4;
  const styleBonus = Math.round(styleScore / 5);
  const baseArcana = 20 + Math.round(Math.abs(score[0] - score[1]) <= 1 ? 8 : 4);
  const arcanaGained = baseArcana + closeBonus + styleBonus;
  wishforgeProfile.arcana += arcanaGained;
  wishforgeProfile.totalMatches += 1;
  wishforgeProfile.totalWishes += currentRunStats.wishesByPlayer[0].length + currentRunStats.wishesByPlayer[1].length;
  wishforgeProfile.bestStyleScore = Math.max(wishforgeProfile.bestStyleScore, styleScore);
  if (currentRunStats.shapes.size >= 3) wishforgeProfile.milestones.shapeTrifecta = true;
  if (currentRunStats.flairs.size >= 5) wishforgeProfile.milestones.flairCollector = true;
  if (activeOmen.id === 'moon-glide' && currentRunStats.closeRounds >= 2) wishforgeProfile.milestones.skyDancer = true;
  for (const row of currentRunStats.wishesByPlayer[0]) addCodexEntry(row);
  for (const row of currentRunStats.wishesByPlayer[1]) addCodexEntry(row);
  saveProfile();
  lastRunSummary = {
    styleScore,
    arcanaGained,
    closeRounds: currentRunStats.closeRounds,
    omenName: activeOmen.name,
    wildestRelic: wishforgeProfile.relicCodex[0]?.name || 'Wish Twig',
  };
}

const keys = {};
const GAME_KEYS = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'f', '/', 'w', 'a', 's', 'd']);
window.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (isCodexOpen()) {
    if (k === 'c' || e.code === 'Escape') {
      e.preventDefault();
      toggleCodexOverlay(false);
    }
    return;
  }
  keys[k] = true;
  keys[e.code] = true;
  if (GAME_KEYS.has(k) && e.target.tagName !== 'INPUT') e.preventDefault();
  if (gameState === 'intro' && (e.code === 'Space' || e.key === ' ')) {
    e.preventDefault();
    skipIntro();
    return;
  }
  if ((k === 'c' || e.code === 'KeyC') && (gameState === 'title' || gameState === 'game_over')) {
    e.preventDefault();
    toggleCodexOverlay(true);
    return;
  }
  if (gameState === 'title' && (e.code === 'Space' || e.key === ' ')) startGame();
  if (gameState === 'game_over' && (e.code === 'Space' || e.key === ' ')) startGame();
  if (gameState === 'round_over_display' && (e.code === 'Space' || e.key === ' ')) advanceFromRoundOver();
});
window.addEventListener('keyup', e => {
  keys[e.key.toLowerCase()] = false;
  keys[e.code] = false;
  if (GAME_KEYS.has(e.key.toLowerCase()) && e.target.tagName !== 'INPUT') e.preventDefault();
});

let audioCtx;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function quickTone(type, freq, dur, gain = 0.08) {
  ensureAudio();
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.72), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + dur);
}
function playNoise(dur, gain = 0.12) {
  ensureAudio();
  const sz = Math.floor(audioCtx.sampleRate * dur);
  const buf = audioCtx.createBuffer(1, sz, audioCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < sz; i++) d[i] = Math.random() * 2 - 1;
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const g = audioCtx.createGain();
  const hp = audioCtx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 800;
  g.gain.setValueAtTime(gain, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  src.connect(hp);
  hp.connect(g);
  g.connect(audioCtx.destination);
  src.start();
}
function playBassHit() {
  ensureAudio();
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(80, t);
  o.frequency.exponentialRampToValueAtTime(30, t + 0.5);
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.5);
  const o2 = audioCtx.createOscillator();
  const g2 = audioCtx.createGain();
  o2.type = 'square';
  o2.frequency.setValueAtTime(55, t);
  o2.frequency.exponentialRampToValueAtTime(20, t + 0.4);
  g2.gain.setValueAtTime(0.12, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  o2.connect(g2);
  g2.connect(audioCtx.destination);
  o2.start(t);
  o2.stop(t + 0.4);
}
function playImpactCrunch() {
  ensureAudio();
  const t = audioCtx.currentTime;
  const comp = audioCtx.createDynamicsCompressor();
  comp.threshold.setValueAtTime(-10, t);
  comp.ratio.setValueAtTime(6, t);
  comp.attack.setValueAtTime(0.001, t);
  comp.release.setValueAtTime(0.04, t);
  const out = audioCtx.createGain();
  out.gain.setValueAtTime(0.25, t);
  comp.connect(out);
  out.connect(audioCtx.destination);
  const snapLen = 0.012;
  const snapBuf = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * snapLen), audioCtx.sampleRate);
  const sd = snapBuf.getChannelData(0);
  for (let i = 0; i < sd.length; i++) { const e = 1 - i / sd.length; sd[i] = (Math.random() * 2 - 1) * e * e * e; }
  const snapSrc = audioCtx.createBufferSource();
  snapSrc.buffer = snapBuf;
  const snapG = audioCtx.createGain();
  snapG.gain.setValueAtTime(0.9, t);
  const snapBP = audioCtx.createBiquadFilter();
  snapBP.type = 'bandpass';
  snapBP.frequency.setValueAtTime(1800 + Math.random() * 800, t);
  snapBP.Q.setValueAtTime(1.2, t);
  snapSrc.connect(snapBP);
  snapBP.connect(snapG);
  snapG.connect(comp);
  snapSrc.start(t);
  const thud = audioCtx.createOscillator();
  thud.type = 'sine';
  thud.frequency.setValueAtTime(120 + Math.random() * 60, t);
  thud.frequency.exponentialRampToValueAtTime(30, t + 0.07);
  const thudG = audioCtx.createGain();
  thudG.gain.setValueAtTime(0.6, t);
  thudG.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
  thud.connect(thudG);
  thudG.connect(comp);
  thud.start(t);
  thud.stop(t + 0.08);
}
function playDeathExplosion() {
  ensureAudio();
  const t = audioCtx.currentTime;
  const comp = audioCtx.createDynamicsCompressor();
  comp.threshold.setValueAtTime(-12, t);
  comp.ratio.setValueAtTime(5, t);
  comp.attack.setValueAtTime(0.001, t);
  comp.release.setValueAtTime(0.08, t);
  const out = audioCtx.createGain();
  out.gain.setValueAtTime(0.3, t);
  comp.connect(out);
  out.connect(audioCtx.destination);
  const boomLen = 0.02;
  const boomBuf = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * boomLen), audioCtx.sampleRate);
  const bd = boomBuf.getChannelData(0);
  for (let i = 0; i < bd.length; i++) { const e = 1 - i / bd.length; bd[i] = (Math.random() * 2 - 1) * e; }
  const boomSrc = audioCtx.createBufferSource();
  boomSrc.buffer = boomBuf;
  const boomG = audioCtx.createGain();
  boomG.gain.setValueAtTime(1.0, t);
  boomSrc.connect(boomG);
  boomG.connect(comp);
  boomSrc.start(t);
  const sub = audioCtx.createOscillator();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(80, t);
  sub.frequency.exponentialRampToValueAtTime(18, t + 0.5);
  const subG = audioCtx.createGain();
  subG.gain.setValueAtTime(0.7, t);
  subG.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  sub.connect(subG);
  subG.connect(comp);
  sub.start(t);
  sub.stop(t + 0.52);
  const rumLen = 0.35;
  const rumBuf = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * rumLen), audioCtx.sampleRate);
  const rd = rumBuf.getChannelData(0);
  for (let i = 0; i < rd.length; i++) rd[i] = Math.random() * 2 - 1;
  const rumSrc = audioCtx.createBufferSource();
  rumSrc.buffer = rumBuf;
  const rumG = audioCtx.createGain();
  rumG.gain.setValueAtTime(0.25, t);
  rumG.gain.exponentialRampToValueAtTime(0.001, t + rumLen);
  const rumLP = audioCtx.createBiquadFilter();
  rumLP.type = 'lowpass';
  rumLP.frequency.setValueAtTime(1200, t);
  rumLP.frequency.exponentialRampToValueAtTime(100, t + rumLen);
  rumSrc.connect(rumLP);
  rumLP.connect(rumG);
  rumG.connect(comp);
  rumSrc.start(t);
  const crunch = audioCtx.createOscillator();
  crunch.type = 'sawtooth';
  crunch.frequency.setValueAtTime(200, t);
  crunch.frequency.exponentialRampToValueAtTime(40, t + 0.3);
  const crunchG = audioCtx.createGain();
  crunchG.gain.setValueAtTime(0.15, t + 0.03);
  crunchG.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
  crunch.connect(crunchG);
  crunchG.connect(comp);
  crunch.start(t + 0.03);
  crunch.stop(t + 0.32);
}
function playJuicyShoot(profile, pitch, release, intensity) {
  ensureAudio();
  const t = audioCtx.currentTime;
  const vol = clamp(intensity, 0.25, 2);
  const p = clamp(pitch, 0.5, 2);
  const rel = clamp(release, 0.5, 2);

  const PROFILES = {
    chime:   { bodyFreq: 90,  toneFreq: 680,  toneWave: 'sine',     bodyDec: 0.06, toneDec: 0.12, noiseDec: 0.08, crackVol: 0.7, bodyVol: 0.5, toneVol: 0.4 },
    flute:   { bodyFreq: 75,  toneFreq: 420,  toneWave: 'triangle', bodyDec: 0.07, toneDec: 0.14, noiseDec: 0.06, crackVol: 0.5, bodyVol: 0.6, toneVol: 0.5 },
    bell:    { bodyFreq: 100, toneFreq: 800,  toneWave: 'sine',     bodyDec: 0.05, toneDec: 0.18, noiseDec: 0.07, crackVol: 0.6, bodyVol: 0.4, toneVol: 0.6 },
    bubble:  { bodyFreq: 65,  toneFreq: 350,  toneWave: 'sine',     bodyDec: 0.08, toneDec: 0.10, noiseDec: 0.05, crackVol: 0.4, bodyVol: 0.5, toneVol: 0.3 },
    twig:    { bodyFreq: 80,  toneFreq: 280,  toneWave: 'triangle', bodyDec: 0.05, toneDec: 0.08, noiseDec: 0.06, crackVol: 0.6, bodyVol: 0.5, toneVol: 0.3 },
    horn:    { bodyFreq: 70,  toneFreq: 220,  toneWave: 'sawtooth', bodyDec: 0.09, toneDec: 0.12, noiseDec: 0.08, crackVol: 0.8, bodyVol: 0.7, toneVol: 0.5 },
    pop:     { bodyFreq: 110, toneFreq: 520,  toneWave: 'square',   bodyDec: 0.03, toneDec: 0.06, noiseDec: 0.04, crackVol: 0.9, bodyVol: 0.4, toneVol: 0.3 },
    crystal: { bodyFreq: 95,  toneFreq: 1100, toneWave: 'sine',     bodyDec: 0.04, toneDec: 0.22, noiseDec: 0.06, crackVol: 0.5, bodyVol: 0.3, toneVol: 0.7 },
    drum:    { bodyFreq: 60,  toneFreq: 160,  toneWave: 'sawtooth', bodyDec: 0.10, toneDec: 0.08, noiseDec: 0.10, crackVol: 0.9, bodyVol: 0.8, toneVol: 0.4 },
    harp:    { bodyFreq: 85,  toneFreq: 620,  toneWave: 'triangle', bodyDec: 0.06, toneDec: 0.20, noiseDec: 0.05, crackVol: 0.4, bodyVol: 0.4, toneVol: 0.6 },
    whoosh:  { bodyFreq: 70,  toneFreq: 300,  toneWave: 'sawtooth', bodyDec: 0.07, toneDec: 0.07, noiseDec: 0.12, crackVol: 0.7, bodyVol: 0.5, toneVol: 0.3 },
    crackle: { bodyFreq: 100, toneFreq: 700,  toneWave: 'square',   bodyDec: 0.04, toneDec: 0.05, noiseDec: 0.08, crackVol: 1.0, bodyVol: 0.3, toneVol: 0.3 },
  };
  const cfg = PROFILES[profile] || PROFILES.chime;

  const comp = audioCtx.createDynamicsCompressor();
  comp.threshold.setValueAtTime(-14, t);
  comp.knee.setValueAtTime(6, t);
  comp.ratio.setValueAtTime(4, t);
  comp.attack.setValueAtTime(0.001, t);
  comp.release.setValueAtTime(0.06, t);
  const master = audioCtx.createGain();
  master.gain.setValueAtTime(0.22 * vol, t);
  comp.connect(master);
  master.connect(audioCtx.destination);

  const crackLen = 0.009;
  const crackBuf = audioCtx.createBuffer(1, Math.ceil(audioCtx.sampleRate * crackLen), audioCtx.sampleRate);
  const cd = crackBuf.getChannelData(0);
  for (let i = 0; i < cd.length; i++) {
    const env = 1 - (i / cd.length);
    cd[i] = (Math.random() * 2 - 1) * env * env;
  }
  const crackSrc = audioCtx.createBufferSource();
  crackSrc.buffer = crackBuf;
  const crackG = audioCtx.createGain();
  crackG.gain.setValueAtTime(cfg.crackVol * vol, t);
  const crackBP = audioCtx.createBiquadFilter();
  crackBP.type = 'bandpass';
  crackBP.frequency.setValueAtTime(3200 * p, t);
  crackBP.Q.setValueAtTime(0.7, t);
  crackSrc.connect(crackBP);
  crackBP.connect(crackG);
  crackG.connect(comp);
  crackSrc.start(t);

  const bodyDur = cfg.bodyDec * rel;
  const bodyOsc = audioCtx.createOscillator();
  bodyOsc.type = 'sine';
  bodyOsc.frequency.setValueAtTime(cfg.bodyFreq * p, t);
  bodyOsc.frequency.exponentialRampToValueAtTime(Math.max(20, cfg.bodyFreq * p * 0.28), t + bodyDur);
  const bodyG = audioCtx.createGain();
  bodyG.gain.setValueAtTime(cfg.bodyVol * vol, t);
  bodyG.gain.exponentialRampToValueAtTime(0.001, t + bodyDur);
  bodyOsc.connect(bodyG);
  bodyG.connect(comp);
  bodyOsc.start(t);
  bodyOsc.stop(t + bodyDur + 0.01);

  const toneDur = cfg.toneDec * rel;
  const toneOsc = audioCtx.createOscillator();
  toneOsc.type = cfg.toneWave;
  toneOsc.frequency.setValueAtTime(cfg.toneFreq * p, t);
  toneOsc.frequency.exponentialRampToValueAtTime(Math.max(40, cfg.toneFreq * p * 0.55), t + toneDur);
  const toneG = audioCtx.createGain();
  toneG.gain.setValueAtTime(cfg.toneVol * vol * 0.45, t);
  toneG.gain.exponentialRampToValueAtTime(0.001, t + toneDur);
  const toneLP = audioCtx.createBiquadFilter();
  toneLP.type = 'lowpass';
  toneLP.frequency.setValueAtTime(cfg.toneFreq * p * 2.5, t);
  toneLP.frequency.exponentialRampToValueAtTime(200, t + toneDur);
  toneOsc.connect(toneLP);
  toneLP.connect(toneG);
  toneG.connect(comp);
  toneOsc.start(t);
  toneOsc.stop(t + toneDur + 0.01);

  const noiseDur = cfg.noiseDec * rel;
  const nBufLen = Math.ceil(audioCtx.sampleRate * noiseDur);
  const nBuf = audioCtx.createBuffer(1, nBufLen, audioCtx.sampleRate);
  const nd = nBuf.getChannelData(0);
  for (let i = 0; i < nBufLen; i++) nd[i] = Math.random() * 2 - 1;
  const nSrc = audioCtx.createBufferSource();
  nSrc.buffer = nBuf;
  const nG = audioCtx.createGain();
  nG.gain.setValueAtTime(0.14 * vol, t);
  nG.gain.exponentialRampToValueAtTime(0.001, t + noiseDur);
  const nLP = audioCtx.createBiquadFilter();
  nLP.type = 'lowpass';
  nLP.frequency.setValueAtTime(2400 * p, t);
  nLP.frequency.exponentialRampToValueAtTime(250, t + noiseDur);
  const nHP = audioCtx.createBiquadFilter();
  nHP.type = 'highpass';
  nHP.frequency.setValueAtTime(350, t);
  nSrc.connect(nHP);
  nHP.connect(nLP);
  nLP.connect(nG);
  nG.connect(comp);
  nSrc.start(t);
}
function playSound(type, profile = 'chime', pitch = 1, release = 1, intensity = 1) {
  const p = clamp(pitch, 0.5, 2);
  const r = clamp(release, 0.5, 2);
  const g = clamp(intensity, 0.25, 2);
  if (type === 'jump') {
    quickTone('sine', 290, 0.12, 0.06);
    quickTone('triangle', 580, 0.06, 0.03);
    return;
  }
  if (type === 'hit') {
    playImpactCrunch();
    return;
  }
  if (type === 'death') {
    playDeathExplosion();
    return;
  }
  if (type === 'bounce') {
    quickTone('sine', 700 + Math.random() * 300, 0.08, 0.06);
    playNoise(0.03, 0.04);
    return;
  }
  playJuicyShoot(profile, p, r, g);
}
function loadTrippyImages() {
  let loaded = 0;
  TRIPPY_URLS.forEach((url, i) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      trippyImages[i] = img;
      loaded++;
      if (loaded >= 2 && !trippyLoaded) {
        trippyLoaded = true;
        pickNewBgImage();
        renderBackground();
      }
    };
    img.onerror = () => {
      loaded++;
    };
    img.src = url;
  });
}
function pickNewBgImage() {
  const valid = trippyImages.filter(Boolean);
  if (valid.length > 0) {
    let next;
    do {
      next = valid[Math.floor(Math.random() * valid.length)];
    } while (next === currentBgImage && valid.length > 1);
    currentBgImage = next;
  }
}
function spawnAnnouncement(text, color = '#ff4444') {
  announcements.push({
    text,
    x: W / 2 + (Math.random() - 0.5) * 200,
    y: H * 0.35,
    life: 90,
    maxLife: 90,
    color,
    vy: -1.5,
    scale: 0,
  });
}
function triggerScreenFlash(color = '#ffffff', amount = 12) {
  screenFlash = amount;
  screenFlashColor = color;
}

function spawnParticles(x, y, count, color, speed, life, style = 'dot') {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.4 + Math.random() * 0.7);
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 1.4,
      life: life * (0.55 + Math.random() * 0.6),
      maxLife: life,
      color,
      size: 1 + Math.random() * 2.5,
      style,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.3,
      drag: style === 'ember' ? 0.97 : style === 'smoke' ? 0.94 : 0.99,
    });
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.vx *= Math.pow(p.drag, dt);
    p.vy *= Math.pow(p.drag, dt);
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    const grav = p.style === 'smoke' ? -0.03 : p.style === 'ember' ? 0.06 : 0.12;
    p.vy += grav * dt;
    p.rot += p.rotV * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function initFireflies() {
  fireflies = [];
  const neonColors = ['#00ffcc', '#ff00ff', '#ffff00', '#00ccff', '#ff6600', '#88ff44'];
  for (let i = 0; i < 60; i++) {
    fireflies.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      color: neonColors[Math.floor(Math.random() * neonColors.length)],
    });
  }
}

function initEnvironmentLife() {
  butterflies = [];
  cloudWisps = [];
  for (let i = 0; i < 12; i++) {
    cloudWisps.push({
      x: Math.random() * W,
      y: 30 + Math.random() * 170,
      w: 34 + Math.random() * 42,
      h: 14 + Math.random() * 16,
      vx: 0.08 + Math.random() * 0.14,
      alpha: 0.08 + Math.random() * 0.14,
    });
  }
  const bflyColors = ['#ff00ff', '#00ffcc', '#ffcc00', '#ff4488', '#44ff88', '#8844ff'];
  for (let i = 0; i < 16; i++) {
    butterflies.push({
      x: Math.random() * W,
      y: 180 + Math.random() * 260,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.35,
      wing: Math.random() * Math.PI * 2,
      color: bflyColors[Math.floor(Math.random() * bflyColors.length)],
    });
  }
}

function updateFireflies() {
  for (const f of fireflies) {
    f.x += f.vx;
    f.y += f.vy;
    if (f.x < -5) f.x = W + 5;
    if (f.x > W + 5) f.x = -5;
    if (f.y < -5) f.y = H + 5;
    if (f.y > H + 5) f.y = -5;
    f.phase += 0.03;
  }
}

function updateEnvironmentLife(dt) {
  windPhase += dt * 0.01;
  const omenWind = activeOmen?.windForce || 0;
  for (const c of cloudWisps) {
    c.x += (c.vx + omenWind * 0.03) * dt * 0.2;
    if (c.x > W + c.w + 30) c.x = -c.w - 30;
  }
  for (const b of butterflies) {
    b.wing += dt * 0.18;
    b.x += (b.vx + Math.sin(b.wing * 0.7) * 0.08) * dt;
    b.y += (b.vy + Math.cos(b.wing * 0.9) * 0.06) * dt;
    if (b.x < -15) b.x = W + 15;
    if (b.x > W + 15) b.x = -15;
    if (b.y < 130) b.y = 130;
    if (b.y > H - 30) b.y = H - 30;
  }
}

function renderFireflies() {
  for (const f of fireflies) {
    const alpha = 0.25 + (Math.sin(f.phase) * 0.5 + 0.5) * 0.55;
    ctx.globalAlpha = alpha;
    ctx.save();
    ctx.shadowColor = f.color;
    ctx.shadowBlur = 8;
    ctx.fillStyle = f.color;
    ctx.fillRect(f.x, f.y, 2, 2);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function renderEnvironmentLife() {
  for (const c of cloudWisps) {
    ctx.globalAlpha = c.alpha * 0.4;
    ctx.save();
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'rgba(180, 100, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w, c.h, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x + c.w * 0.45, c.y - 3, c.w * 0.55, c.h * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  for (const b of butterflies) {
    const flap = 0.6 + Math.sin(b.wing) * 0.4;
    ctx.save();
    ctx.shadowColor = b.color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = b.color;
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.ellipse(b.x - 2, b.y, 2.5 + flap * 2.5, 1.6, -0.5, 0, Math.PI * 2);
    ctx.ellipse(b.x + 2, b.y, 2.5 + flap * 2.5, 1.6, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(b.x - 0.5, b.y - 1.5, 1, 3);
  }
}

function spawnMuzzleFlash(x, y, color, facing) {
  const sparkCount = 3 + Math.floor(Math.random() * 3);
  const sparks = [];
  for (let i = 0; i < sparkCount; i++) {
    const baseAng = facing === 1 ? 0 : Math.PI;
    const ang = baseAng + (Math.random() - 0.5) * 1.2;
    const spd = 2 + Math.random() * 4;
    sparks.push({ x: 0, y: 0, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - Math.random() * 1.5, life: 5 + Math.random() * 4 });
  }
  muzzleFlashes.push({ x, y, color, life: 8, maxLife: 8, facing: facing || 1, sparks });
}
function updateMuzzleFlashes(dt) {
  for (let i = muzzleFlashes.length - 1; i >= 0; i--) {
    const f = muzzleFlashes[i];
    f.life -= dt;
    for (const s of f.sparks) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.vy += 0.15 * dt;
      s.life -= dt;
    }
    if (f.life <= 0) muzzleFlashes.splice(i, 1);
  }
}
function renderMuzzleFlashes() {
  for (const f of muzzleFlashes) {
    const t = f.life / f.maxLife;
    const coreR = 3 + (1 - t) * 2;
    const flareR = 8 + (1 - t) * 12;
    const dirX = f.facing === 1 ? 1 : -1;

    ctx.save();
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 16 * t;
    ctx.globalAlpha = t * 0.85;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(f.x, f.y, coreR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.globalAlpha = t * 0.45;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.ellipse(f.x + dirX * flareR * 0.4, f.y, flareR, flareR * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = t * 0.2;
    ctx.fillStyle = '#fff8e0';
    ctx.beginPath();
    ctx.arc(f.x, f.y, flareR * 1.4, 0, Math.PI * 2);
    ctx.fill();

    for (const s of f.sparks) {
      if (s.life <= 0) continue;
      const sa = Math.min(1, s.life / 4);
      ctx.globalAlpha = sa * 0.9;
      ctx.fillStyle = '#fff';
      ctx.fillRect(f.x + s.x - 0.5, f.y + s.y - 0.5, 1.5, 1.5);
    }
  }
  ctx.globalAlpha = 1;
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function normalizeWeapon(w) {
  const weapon = { ...DEFAULT_WEAPON, ...(w || {}) };
  weapon.name = String(weapon.name || DEFAULT_WEAPON.name).slice(0, 60);
  weapon.quip = String(weapon.quip || DEFAULT_WEAPON.quip).slice(0, 150);
  weapon.tradeoff = String(weapon.tradeoff || DEFAULT_WEAPON.tradeoff).slice(0, 150);
  weapon.fantasy_flair = String(weapon.fantasy_flair || DEFAULT_WEAPON.fantasy_flair).slice(0, 120);
  weapon.bullet_size = clamp(Number(weapon.bullet_size) || 1, 0.2, 6);
  weapon.bullet_speed = clamp(Number(weapon.bullet_speed) || 1, 0.2, 3.5);
  weapon.bullet_damage = clamp(Number(weapon.bullet_damage) || 1, 0.2, 3.5);
  weapon.bullet_count = Math.round(clamp(Number(weapon.bullet_count) || 1, 1, 7));
  weapon.bullet_spread = clamp(Number(weapon.bullet_spread) || 0, 0, 50);
  weapon.bullet_bounces = Math.round(clamp(Number(weapon.bullet_bounces) || 0, 0, 6));
  weapon.bullet_homing = clamp(Number(weapon.bullet_homing) || 0, 0, 0.5);
  weapon.fire_rate = clamp(Number(weapon.fire_rate) || 1, 0.2, 3.5);
  weapon.move_speed = clamp(Number(weapon.move_speed) || 1, 0.25, 2.5);
  weapon.jump_power = clamp(Number(weapon.jump_power) || 1, 0.25, 2.5);
  weapon.player_gravity = clamp(Number(weapon.player_gravity) || 1, 0.25, 2.5);
  weapon.player_size = clamp(Number(weapon.player_size) || 1, 0.4, 2.2);
  weapon.on_bounce_split = Math.round(clamp(Number(weapon.on_bounce_split) || 0, 0, 4));
  weapon.knockback_power = clamp(Number(weapon.knockback_power) || 1, 0.3, 5);
  weapon.hp_bonus = Math.round(clamp(Number(weapon.hp_bonus) || 0, -40, 60));
  weapon.regen = clamp(Number(weapon.regen) || 0, 0, 4);
  weapon.projectile_shape = String(weapon.projectile_shape || 'orb').slice(0, 20).toLowerCase();
  weapon.trail_density = clamp(Number(weapon.trail_density) || 1, 0.2, 2);
  weapon.effect_intensity = clamp(Number(weapon.effect_intensity) || 1, 0.2, 2);
  weapon.sound_pitch = clamp(Number(weapon.sound_pitch) || 1, 0.5, 2);
  weapon.sound_release = clamp(Number(weapon.sound_release) || 1, 0.5, 2);
  weapon.status_slow = clamp(Number(weapon.status_slow) || 0, 0, 0.75);
  weapon.status_slow_duration = clamp(Number(weapon.status_slow_duration) || 0, 0, 4);
  weapon.status_dot_dps = clamp(Number(weapon.status_dot_dps) || 0, 0, 14);
  weapon.status_dot_duration = clamp(Number(weapon.status_dot_duration) || 0, 0, 7);
  weapon.status_stun_duration = clamp(Number(weapon.status_stun_duration) || 0, 0, 1.5);
  weapon.lifesteal = clamp(Number(weapon.lifesteal) || 0, 0, 1);
  weapon.splash_radius = clamp(Number(weapon.splash_radius) || 0, 0, 130);
  weapon.splash_damage_mult = clamp(Number(weapon.splash_damage_mult) || 0.4, 0, 1);
  weapon.cloud_radius = clamp(Number(weapon.cloud_radius) || 0, 0, 140);
  weapon.cloud_duration = clamp(Number(weapon.cloud_duration) || 0, 0, 6);
  weapon.cloud_dps = clamp(Number(weapon.cloud_dps) || 0, 0, 12);
  weapon.cloud_slow = clamp(Number(weapon.cloud_slow) || 0, 0, 0.6);
  weapon.projectile_growth = clamp(Number(weapon.projectile_growth) || 0, 0, 2);
  weapon.pierce_walls = clamp(Number(weapon.pierce_walls) || 0, 0, 1);
  weapon.ground_avoidance = clamp(Number(weapon.ground_avoidance) || 0, 0, 1);
  weapon.steering = clamp(Number(weapon.steering) || 0, 0, 1);
  weapon.self_damage_on_shoot = clamp(Number(weapon.self_damage_on_shoot) || 0, 0, 25);
  weapon.pixel_rows = normalizeRows(weapon.pixel_rows);
  weapon.projectile_rows = normalizeRows(weapon.projectile_rows);
  weapon.palette = normalizePalette(weapon.palette);
  weapon.projectile_palette = normalizePalette(weapon.projectile_palette);
  weapon.projectile_color = normalizeHex(weapon.projectile_color, '#ffd37b');
  weapon.trail_color = normalizeHex(weapon.trail_color, '#ffe6b9');
  weapon.impact_color = normalizeHex(weapon.impact_color, '#fff4d7');
  weapon.glow_color = normalizeHex(weapon.glow_color, weapon.projectile_color);
  return weapon;
}

function normalizeRows(rows) {
  const fallback = DEFAULT_WEAPON.pixel_rows;
  if (!Array.isArray(rows) || rows.length !== 7) return fallback;
  return rows.map((row, i) => {
    const r = String(row || '').toUpperCase().slice(0, 7).padEnd(7, '.').replace(/[^ABCDEFGHIJKL.]/g, '.');
    return r.length === 7 ? r : fallback[i];
  });
}
function normalizeHex(hex, fb) {
  const v = String(hex || '');
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v : fb;
}
function normalizePalette(pal) {
  return {
    A: normalizeHex(pal?.A, DEFAULT_WEAPON.palette.A),
    B: normalizeHex(pal?.B, DEFAULT_WEAPON.palette.B),
    C: normalizeHex(pal?.C, DEFAULT_WEAPON.palette.C),
    D: normalizeHex(pal?.D, DEFAULT_WEAPON.palette.D),
    E: normalizeHex(pal?.E, DEFAULT_WEAPON.palette.A),
    F: normalizeHex(pal?.F, DEFAULT_WEAPON.palette.B),
    G: normalizeHex(pal?.G, DEFAULT_WEAPON.palette.C),
    H: normalizeHex(pal?.H, DEFAULT_WEAPON.palette.D),
    I: normalizeHex(pal?.I, DEFAULT_WEAPON.palette.E),
    J: normalizeHex(pal?.J, DEFAULT_WEAPON.palette.F),
    K: normalizeHex(pal?.K, DEFAULT_WEAPON.palette.G),
    L: normalizeHex(pal?.L, DEFAULT_WEAPON.palette.H),
  };
}

function createPlayer(idx) {
  const sp = SPAWNS[idx];
  const weapon = normalizeWeapon(playerWeapons[idx]);
  const maxHp = MAX_HP + weapon.hp_bonus;
  return {
    idx,
    x: sp.x, y: sp.y,
    vx: 0, vy: 0,
    facing: idx === 0 ? 1 : -1,
    grounded: false,
    hp: maxHp,
    maxHp,
    fireCd: 0,
    jumpHeld: false,
    coyoteTimer: 0,
    jumpBufferTimer: 0,
    slowTimer: 0,
    slowAmount: 0,
    stunTimer: 0,
    dotTimer: 0,
    dotDps: 0,
    dotOwner: -1,
    weapon,
    alive: true,
    damageTaken: 0,
    robeColor: idx === 0 ? '#e88bb2' : '#80aef5',
    trimColor: idx === 0 ? '#ffd4e7' : '#d7e4ff',
    skinColor: '#f4d2b7',
    hairColor: idx === 0 ? '#9c6a54' : '#6b5d8e',
  };
}

function updatePlayers(dt) {
  for (const p of players) {
    if (!p.alive) continue;
    const wasGrounded = p.grounded;
    const w = p.weapon;
    if (p.slowTimer > 0) p.slowTimer = Math.max(0, p.slowTimer - dt / 60);
    if (p.stunTimer > 0) p.stunTimer = Math.max(0, p.stunTimer - dt / 60);
    if (p.dotTimer > 0) {
      const dotDt = dt / 60;
      p.dotTimer = Math.max(0, p.dotTimer - dotDt);
      p.hp -= p.dotDps * dotDt;
      if (p.hp <= 0) {
        p.hp = 0;
        p.alive = false;
        playSound('death');
        spawnParticles(p.x, p.y, 40, p.trimColor, 6, 40, 'burst');
        spawnParticles(p.x, p.y, 12, '#ff00ff', 4, 30, 'dot');
        spawnAnnouncement('POISONED!', '#88ff44');
        triggerScreenFlash('#88ff44', 10);
        continue;
      }
    }

    const slowMult = p.slowTimer > 0 ? Math.max(0.2, 1 - p.slowAmount) : 1;
    const isStunned = p.stunTimer > 0;
    const spd = PLAYER_SPEED * w.move_speed * slowMult;
    const grav = GRAVITY * w.player_gravity * (activeOmen?.gravityMult || 1);

    let moveDir = 0;
    if (p.idx === 0) {
      if (keys.a) moveDir = -1;
      if (keys.d) moveDir = 1;
    } else {
      if (keys.arrowleft) moveDir = -1;
      if (keys.arrowright) moveDir = 1;
    }

    const accel = p.grounded ? GROUND_ACCEL : AIR_ACCEL;
    const targetVx = isStunned ? 0 : moveDir * spd;
    const response = Math.min(1, accel * dt);
    p.vx += (targetVx - p.vx) * response;
    if (moveDir !== 0) p.facing = moveDir;
    p.vx *= p.grounded ? GROUND_FRICTION : AIR_FRICTION;
    const maxSpeed = p.grounded ? MAX_GROUND_SPEED * w.move_speed : MAX_AIR_SPEED * w.move_speed;
    p.vx = clamp(p.vx, -maxSpeed, maxSpeed);
    if (activeOmen?.windForce) p.vx += Math.sin(windPhase + p.idx * 1.9) * 0.012 * activeOmen.windForce * dt;

    const jumpKey = isStunned ? false : (p.idx === 0 ? keys.w : keys.arrowup);
    if (jumpKey && !p.jumpHeld) p.jumpBufferTimer = JUMP_BUFFER_FRAMES;
    if (!jumpKey && p.jumpHeld && p.vy < 0) p.vy *= JUMP_CUT;
    p.jumpHeld = !!jumpKey;

    if (p.grounded) p.coyoteTimer = COYOTE_FRAMES;
    else p.coyoteTimer = Math.max(0, p.coyoteTimer - dt);
    p.jumpBufferTimer = Math.max(0, p.jumpBufferTimer - dt);

    if (p.jumpBufferTimer > 0 && p.coyoteTimer > 0) {
      p.vy = JUMP_FORCE * w.jump_power;
      p.grounded = false;
      p.coyoteTimer = 0;
      p.jumpBufferTimer = 0;
      playSound('jump');
      spawnParticles(p.x, p.y, 4, '#fff5cc', 1.8, 10, 'spark');
    }

    const gravityScale = p.vy < 0 ? 0.92 : 1.08;
    p.vy += grav * gravityScale * dt;
    if (p.vy > MAX_FALL_SPEED) p.vy = MAX_FALL_SPEED;

    const pw = PW * w.player_size;
    const ph = PH * w.player_size;
    const prevX = p.x;
    const prevY = p.y;

    p.x += p.vx * dt;
    for (const plat of PLATFORMS) {
      if (!rectOverlap(p.x - pw / 2, p.y - ph, pw, ph, plat.x, plat.y, plat.w, plat.h)) continue;
      if (prevX + pw / 2 <= plat.x + 1) {
        p.x = plat.x - pw / 2;
        p.vx = 0;
      } else if (prevX - pw / 2 >= plat.x + plat.w - 1) {
        p.x = plat.x + plat.w + pw / 2;
        p.vx = 0;
      }
    }
    for (const wall of WALLS) {
      if (p.x - pw / 2 < wall.x + wall.w && p.x + pw / 2 > wall.x) {
        p.x = p.x < W / 2 ? wall.x + wall.w + pw / 2 : wall.x - pw / 2;
        p.vx = 0;
      }
    }

    p.y += p.vy * dt;
    p.grounded = false;
    for (const plat of PLATFORMS) {
      if (!rectOverlap(p.x - pw / 2, p.y - ph, pw, ph, plat.x, plat.y, plat.w, plat.h)) continue;
      if (prevY <= plat.y + 2) {
        p.y = plat.y;
        p.vy = 0;
        p.grounded = true;
      } else if (prevY - ph >= plat.y + plat.h - 2) {
        p.y = plat.y + plat.h + ph;
        p.vy = 0;
      }
    }

    if (!wasGrounded && p.grounded) {
      spawnParticles(p.x, p.y + 1, 4, '#f7e8d7', 1.1, 10, 'puff');
    }

    if (p.fireCd > 0) p.fireCd -= dt;
    const shootKey = isStunned ? false : (p.idx === 0 ? keys.f : (keys['/'] || keys.Slash));
    if (shootKey && p.fireCd <= 0 && p.alive) {
      fireBullets(p);
      p.fireCd = FIRE_COOLDOWN / Math.max(0.15, w.fire_rate * (activeOmen?.fireRateMult || 1));
    }

    if (w.regen > 0 && p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + (w.regen / 60) * dt);
    if (!p.grounded && Math.random() < 0.26) spawnParticles(p.x, p.y, 1, p.trimColor, 0.8, 8, 'petal');

    if (p.y > KILL_Y) {
      p.alive = false;
      playSound('death');
      spawnParticles(p.x, H, 40, p.trimColor, 6, 50, 'burst');
      spawnParticles(p.x, H, 15, '#00ffff', 5, 35, 'spark');
      spawnAnnouncement('YEETED OFF MAP!', '#00ffff');
      triggerScreenFlash('#ff4444', 12);
    }
  }
}

function fireBullets(p) {
  const w = p.weapon;
  if (w.self_damage_on_shoot > 0) {
    p.hp = Math.max(0, p.hp - w.self_damage_on_shoot);
    if (p.hp <= 0) {
      p.alive = false;
      playSound('death');
      spawnParticles(p.x, p.y, 40, '#ffb3b3', 6, 40, 'burst');
      spawnParticles(p.x, p.y, 12, '#ff4444', 4, 30, 'dot');
      spawnAnnouncement('SELF-DESTRUCT!', '#ff8800');
      triggerScreenFlash('#ff8800', 12);
      return;
    }
  }
  const count = w.bullet_count;
  const spread = w.bullet_spread;
  const baseAngle = p.facing === 1 ? 0 : Math.PI;
  playSound('shoot', w.sound_profile, w.sound_pitch, w.sound_release, w.effect_intensity);
  const muzzleX = p.x + p.facing * (PW * w.player_size / 2 + 10 * w.player_size);
  const muzzleY = p.y - PH * w.player_size * 0.62;
  spawnMuzzleFlash(muzzleX, muzzleY, w.glow_color, p.facing);
  const recoilStrength = 1.2 * w.bullet_damage * (1 / Math.max(0.5, w.fire_rate));
  p.vx -= p.facing * clamp(recoilStrength, 0.3, 3);
  spawnParticles(muzzleX, muzzleY, 2, '#ffeecc', 1.5, 6, 'spark');

  for (let i = 0; i < count; i++) {
    let angle = baseAngle;
    if (count > 1) {
      const frac = i / (count - 1) - 0.5;
      angle += frac * spread * Math.PI / 180;
    }
    const speed = BULLET_SPEED * w.bullet_speed * (activeOmen?.bulletSpeedMult || 1);
    const r = BULLET_R * w.bullet_size;
    const homingStrength = clamp(Math.max(w.bullet_homing, w.steering * 0.45), 0, 0.5);
    const homingTurnCap = clamp(
      HOMING_MIN_TURN_PER_TICK + homingStrength * 0.1,
      HOMING_MIN_TURN_PER_TICK,
      HOMING_MAX_TURN_PER_TICK,
    );
    const homingFuel = HOMING_FUEL_BASE + homingStrength * HOMING_FUEL_SCALE;
    bullets.push({
      x: p.x + p.facing * (PW * w.player_size / 2 + r),
      y: p.y - PH * w.player_size * 0.55,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      owner: p.idx,
      r,
      damage: 10 * w.bullet_damage,
      bouncesLeft: w.bullet_bounces + (activeOmen?.bounceBonus || 0),
      hasBounced: false,
      homing: w.bullet_homing,
      onBounceSplit: w.on_bounce_split,
      knockback: w.knockback_power * (activeOmen?.knockbackMult || 1),
      life: 300,
      color: w.projectile_color,
      trailColor: w.trail_color,
      glowColor: w.glow_color,
      impactColor: w.impact_color,
      trailStyle: w.trail_style,
      impactStyle: w.impact_style,
      projectileShape: w.projectile_shape,
      trailDensity: w.trail_density,
      effectIntensity: w.effect_intensity,
      projectileRows: w.projectile_rows,
      projectilePalette: w.projectile_palette,
      statusSlow: w.status_slow,
      statusSlowDuration: w.status_slow_duration,
      statusDotDps: w.status_dot_dps,
      statusDotDuration: w.status_dot_duration,
      statusStunDuration: w.status_stun_duration,
      lifesteal: w.lifesteal,
      splashRadius: w.splash_radius,
      splashDamageMult: w.splash_damage_mult,
      cloudRadius: w.cloud_radius,
      cloudDuration: w.cloud_duration,
      cloudDps: w.cloud_dps,
      cloudSlow: w.cloud_slow,
      projectileGrowth: w.projectile_growth,
      pierceWalls: w.pierce_walls,
      groundAvoidance: w.ground_avoidance,
      steering: w.steering,
      homingTurnCap,
      homingFuel,
      homingFuelStart: homingFuel,
      trail: [],
    });
  }
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.life -= dt;
    if (b.life <= 0) { bullets.splice(i, 1); continue; }
    if (b.projectileGrowth > 0) b.r = Math.min(26, b.r + (b.projectileGrowth * 0.02 * dt));

    if ((b.homing > 0 || b.steering > 0) && b.homingFuel > 0) {
      const target = players[1 - b.owner];
      if (target?.alive) {
        const tx = target.x - b.x;
        const ty = (target.y - PH * target.weapon.player_size / 2) - b.y;
        const dist = Math.hypot(tx, ty);
        const desired = Math.atan2(ty, tx);
        const current = Math.atan2(b.vy, b.vx);
        let diff = desired - current;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        const distanceFactor = clamp((dist - 35) / 220, 0.28, 1);
        const fuelFactor = clamp(b.homingFuel / Math.max(1, b.homingFuelStart), 0.2, 1);
        const behindPenalty = Math.abs(diff) > 1.8 ? 0.55 : 1;
        const maxTurn = b.homingTurnCap * dt * distanceFactor * fuelFactor * behindPenalty;
        const turn = clamp(diff, -maxTurn, maxTurn);
        const angle = current + turn;
        const spd = Math.hypot(b.vx, b.vy);
        b.vx = Math.cos(angle) * spd;
        b.vy = Math.sin(angle) * spd;
      }
      b.homingFuel = Math.max(0, b.homingFuel - dt);
    }

    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 10) b.trail.shift();
    if (Math.random() < 0.34 * b.trailDensity) spawnTrailParticle(b);
    if (activeOmen?.windForce) b.vx += Math.sin((windPhase + b.x * 0.002) * 1.3) * 0.008 * activeOmen.windForce * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.groundAvoidance > 0 && b.y > H - 70) b.vy -= 0.25 * b.groundAvoidance * dt;

    let bounced = false;
    for (const wall of WALLS) {
      if (b.x - b.r < wall.x + wall.w && b.x + b.r > wall.x && b.y > wall.y && b.y < wall.y + wall.h) {
        if (b.pierceWalls > 0) {
          continue;
        } else if (b.bouncesLeft > 0) {
          b.vx *= -1;
          b.x = b.x < W / 2 ? wall.x + wall.w + b.r : wall.x - b.r;
          b.bouncesLeft--;
          b.hasBounced = true;
          bounced = true;
          playSound('bounce');
          spawnParticles(b.x, b.y, 3, b.impactColor, 2, 12, 'spark');
        } else {
          bullets.splice(i, 1);
          continue;
        }
      }
    }
    for (const plat of PLATFORMS) {
      if (b.x + b.r > plat.x && b.x - b.r < plat.x + plat.w && b.y + b.r > plat.y && b.y - b.r < plat.y + plat.h) {
        if (b.pierceWalls > 0) {
          continue;
        } else if (b.bouncesLeft > 0) {
          const fromTop = b.y < plat.y + plat.h / 2;
          b.vy *= -1;
          b.y = fromTop ? plat.y - b.r : plat.y + plat.h + b.r;
          b.bouncesLeft--;
          b.hasBounced = true;
          bounced = true;
          playSound('bounce');
          spawnParticles(b.x, b.y, 3, b.impactColor, 1.8, 12, 'spark');
        } else {
          spawnImpactEffect(b.x, b.y, b.impactStyle, b.impactColor, b);
          bullets.splice(i, 1);
          continue;
        }
      }
    }

    if (bounced && b.onBounceSplit > 0) {
      for (let s = 0; s < b.onBounceSplit; s++) {
        const angle = Math.atan2(b.vy, b.vx) + (Math.random() - 0.5) * 1.4;
        const spd = Math.hypot(b.vx, b.vy) * 0.7;
        bullets.push({
          ...b,
          x: b.x,
          y: b.y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          r: b.r * 0.55,
          damage: b.damage * 0.35,
          bouncesLeft: 0,
          homing: b.homing * 0.5,
          onBounceSplit: 0,
          knockback: b.knockback * 0.5,
          life: 120,
          trail: [],
        });
      }
    }

    if (b.y < -60 || b.y > H + 60) { bullets.splice(i, 1); continue; }

    for (const p of players) {
      if ((p.idx === b.owner && !b.hasBounced) || !p.alive) continue;
      const pw = PW * p.weapon.player_size, ph = PH * p.weapon.player_size;
      if (b.x + b.r > p.x - pw / 2 && b.x - b.r < p.x + pw / 2 && b.y + b.r > p.y - ph && b.y - b.r < p.y) {
        p.hp -= b.damage;
        p.damageTaken = 10;
        const kb = b.knockback * 4;
        p.vx += b.vx > 0 ? kb : -kb;
        p.vy -= kb * 0.38;
        playSound('hit');
        shakeAmount = Math.max(shakeAmount, b.damage * 0.35);
        applyStatusEffects(p, b);
        if (b.splashRadius > 0) applyAreaDamage(b.x, b.y, b.splashRadius, b.damage * b.splashDamageMult, b.owner);
        if (b.lifesteal > 0) {
          const owner = players[b.owner];
          if (owner?.alive) owner.hp = Math.min(owner.maxHp, owner.hp + b.damage * b.lifesteal);
        }
        spawnImpactEffect(b.x, b.y, b.impactStyle, b.impactColor, b);
        bullets.splice(i, 1);
        if (p.hp <= 0) {
          p.hp = 0;
          p.alive = false;
          playSound('death');
          spawnParticles(p.x, p.y - ph / 2, 60, p.trimColor, 8, 65, 'burst');
          spawnParticles(p.x, p.y - ph / 2, 25, '#ffffff', 6, 40, 'spark');
          spawnParticles(p.x, p.y - ph / 2, 18, '#ff00ff', 7, 45, 'dot');
          spawnParticles(p.x, p.y - ph / 2, 10, p.robeColor, 4, 50, 'petal');
          spawnParticles(p.x, p.y - ph * 0.3, 8, '#ffcc44', 3, 30, 'ember');
          slowMo = 55;
          comboCount[b.owner]++;
          const phrase = KILL_PHRASES[Math.floor(Math.random() * KILL_PHRASES.length)];
          const killerColor = players[b.owner]?.trimColor || '#ff4444';
          spawnAnnouncement(phrase, killerColor);
          if (comboCount[b.owner] > 1) spawnAnnouncement(`${comboCount[b.owner]}x COMBO`, '#ffff00');
          triggerScreenFlash(killerColor, 15);
        }
        break;
      }
    }
  }
}

function spawnTrailParticle(b) {
  const map = {
    sparkle: 'spark',
    petals: 'petal',
    bubbles: 'bubble',
    smoke: 'smoke',
    leaf: 'leaf',
    rainbow: 'dot',
    ember: 'ember',
  };
  const count = b.trailDensity > 1.35 ? 2 : 1;
  spawnParticles(b.x, b.y, count, b.trailColor, 0.5 * b.effectIntensity, 10 * b.effectIntensity, map[b.trailStyle] || 'dot');
}
function applyStatusEffects(target, bullet) {
  if (bullet.statusSlow > 0 && bullet.statusSlowDuration > 0) {
    target.slowAmount = Math.max(target.slowAmount, bullet.statusSlow);
    target.slowTimer = Math.max(target.slowTimer, bullet.statusSlowDuration);
  }
  if (bullet.statusStunDuration > 0) {
    target.stunTimer = Math.max(target.stunTimer, bullet.statusStunDuration);
  }
  if (bullet.statusDotDps > 0 && bullet.statusDotDuration > 0) {
    target.dotDps = Math.max(target.dotDps, bullet.statusDotDps);
    target.dotTimer = Math.max(target.dotTimer, bullet.statusDotDuration);
    target.dotOwner = bullet.owner;
  }
}

function applyAreaDamage(x, y, radius, damage, ownerIdx) {
  for (const p of players) {
    if (!p.alive || p.idx === ownerIdx) continue;
    const dx = p.x - x;
    const dy = (p.y - PH * p.weapon.player_size * 0.5) - y;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) continue;
    const falloff = 1 - dist / Math.max(radius, 1);
    const dealt = damage * (0.4 + falloff * 0.6);
    p.hp -= dealt;
    p.damageTaken = 8;
    if (p.hp <= 0) {
      p.hp = 0;
      p.alive = false;
      playSound('death');
      spawnParticles(p.x, p.y - 10, 40, p.trimColor, 6, 40, 'burst');
      spawnParticles(p.x, p.y - 10, 12, '#ff8800', 4, 30, 'dot');
      spawnAnnouncement('SPLASH DAMAGE!', '#ff8800');
      triggerScreenFlash('#ff8800', 10);
    }
  }
}

function spawnHazardField(x, y, b) {
  if (b.cloudRadius <= 0 || b.cloudDuration <= 0 || (b.cloudDps <= 0 && b.cloudSlow <= 0)) return;
  hazardFields.push({
    x,
    y,
    owner: b.owner,
    radius: b.cloudRadius,
    timeLeft: b.cloudDuration,
    dps: b.cloudDps,
    slow: b.cloudSlow,
    color: b.trailColor,
  });
}

function spawnImpactEffect(x, y, style, color, bullet) {
  const count = style === 'burst' ? 12 : style === 'splash' ? 10 : style === 'puff' ? 8 : 7;
  spawnParticles(x, y, count, color, 3.5, 18, style);
  if (bullet) spawnHazardField(x, y, bullet);
}

function updateHazardFields(dt) {
  const sdt = dt / 60;
  for (let i = hazardFields.length - 1; i >= 0; i--) {
    const f = hazardFields[i];
    f.timeLeft -= sdt;
    if (f.timeLeft <= 0) {
      hazardFields.splice(i, 1);
      continue;
    }
    for (const p of players) {
      if (!p.alive || p.idx === f.owner) continue;
      const dx = p.x - f.x;
      const dy = (p.y - PH * p.weapon.player_size * 0.5) - f.y;
      if (dx * dx + dy * dy > f.radius * f.radius) continue;
      if (f.dps > 0) p.hp = Math.max(0, p.hp - f.dps * sdt);
      if (f.slow > 0) {
        p.slowAmount = Math.max(p.slowAmount, f.slow);
        p.slowTimer = Math.max(p.slowTimer, 0.12);
      }
      if (p.hp <= 0 && p.alive) {
        p.alive = false;
        playSound('death');
        spawnParticles(p.x, p.y - 10, 40, p.trimColor, 6, 40, 'burst');
        spawnParticles(p.x, p.y - 10, 12, '#ff00ff', 4, 30, 'dot');
        spawnAnnouncement('MELTED!', '#ff00ff');
        triggerScreenFlash('#ff00ff', 10);
      }
    }
  }
}

function renderHazardFields() {
  for (const f of hazardFields) {
    const lifeFrac = Math.max(0.15, Math.min(1, f.timeLeft / 2));
    ctx.save();
    ctx.shadowColor = f.color;
    ctx.shadowBlur = 20 * lifeFrac;
    ctx.globalAlpha = 0.18 * lifeFrac;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.35 * lifeFrac;
    ctx.strokeStyle = f.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function rectOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function renderBackground() {
  bgCanvas = document.createElement('canvas');
  bgCanvas.width = W;
  bgCanvas.height = H;
  const c = bgCanvas.getContext('2d');

  if (currentBgImage) {
    c.drawImage(currentBgImage, 0, 0, W, H);
    c.fillStyle = 'rgba(0, 0, 15, 0.32)';
    c.fillRect(0, 0, W, H);
    const vignette = c.createRadialGradient(W / 2, H / 2, W * 0.25, W / 2, H / 2, W * 0.7);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.45)');
    c.fillStyle = vignette;
    c.fillRect(0, 0, W, H);
  } else {
    const sky = c.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#1a0033');
    sky.addColorStop(0.3, '#2d0066');
    sky.addColorStop(0.6, '#0d0d3b');
    sky.addColorStop(1, '#000a1a');
    c.fillStyle = sky;
    c.fillRect(0, 0, W, H);
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const brightness = 0.2 + Math.random() * 0.8;
      c.fillStyle = `rgba(255,255,255,${brightness})`;
      c.fillRect(x, y, Math.random() < 0.3 ? 2 : 1, Math.random() < 0.3 ? 2 : 1);
    }
  }

  const theme = currentLevel.theme;
  for (const p of PLATFORMS) {
    c.save();
    c.shadowColor = theme.glow;
    c.shadowBlur = 14;
    c.fillStyle = theme.fill;
    c.fillRect(p.x, p.y, p.w, p.h);
    c.restore();
    c.fillStyle = theme.top;
    c.fillRect(p.x, p.y, p.w, 2);
    c.fillStyle = theme.bottom;
    c.fillRect(p.x, p.y + p.h - 1, p.w, 1);
    c.fillStyle = theme.detail;
    c.fillRect(p.x, p.y + 2, p.w, p.h - 3);
    for (let x = p.x + 6; x < p.x + p.w - 4; x += 14) {
      c.fillStyle = theme.detail;
      c.fillRect(x, p.y + 3, 1, p.h - 4);
    }
    c.save();
    c.shadowColor = theme.top;
    c.shadowBlur = 4;
    c.fillStyle = theme.top;
    c.fillRect(p.x, p.y, 2, p.h);
    c.fillRect(p.x + p.w - 2, p.y, 2, p.h);
    c.restore();
  }
}

function drawWeaponSprite(weapon, x, y, size, facing) {
  const rows = weapon.pixel_rows;
  const grid = rows.length;
  const pal = weapon.palette;
  const isFilled = (tx, ty) => {
    if (tx < 0 || tx > grid - 1 || ty < 0 || ty > grid - 1) return false;
    return rows[ty][tx] !== '.';
  };
  for (let ry = 0; ry < grid; ry++) {
    for (let rx = 0; rx < grid; rx++) {
      const ch = rows[ry][rx];
      if (ch === '.') continue;
      const drawX = facing === 1 ? x + rx * size : x + (grid - 1 - rx) * size;
      const drawY = y + ry * size;

      const hasHole =
        !isFilled(rx - 1, ry) ||
        !isFilled(rx + 1, ry) ||
        !isFilled(rx, ry - 1) ||
        !isFilled(rx, ry + 1);
      if (hasHole) {
        ctx.fillStyle = 'rgba(45, 32, 28, 0.45)';
        ctx.fillRect(drawX - 1, drawY - 1, size + 2, size + 2);
      }

      const color = pal[ch] || '#fff';
      ctx.fillStyle = color;
      ctx.fillRect(drawX, drawY, size, size);
    }
  }
}

function drawProjectile(b) {
  if (Array.isArray(b.projectileRows) && b.projectileRows.length === 7) {
    const cell = Math.max(1.1, b.r * 0.34);
    const half = (7 * cell) / 2;
    for (let ry = 0; ry < 7; ry++) {
      for (let rx = 0; rx < 7; rx++) {
        const key = b.projectileRows[ry][rx];
        if (!key || key === '.') continue;
        const col = b.projectilePalette?.[key] || b.color;
        ctx.fillStyle = col;
        ctx.fillRect(b.x - half + rx * cell, b.y - half + ry * cell, cell, cell);
      }
    }
    return;
  }

  const shape = b.projectileShape || 'orb';
  if (shape === 'star') {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5;
      const rr = i % 2 === 0 ? b.r : b.r * 0.45;
      const px = b.x + Math.cos(a) * rr;
      const py = b.y + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    return;
  }
  if (shape === 'shard' || shape === 'bolt' || shape === 'leaf') {
    const ang = Math.atan2(b.vy, b.vx);
    const tipX = b.x + Math.cos(ang) * b.r * 1.6;
    const tipY = b.y + Math.sin(ang) * b.r * 1.6;
    const lX = b.x + Math.cos(ang + 2.35) * b.r;
    const lY = b.y + Math.sin(ang + 2.35) * b.r;
    const rX = b.x + Math.cos(ang - 2.35) * b.r;
    const rY = b.y + Math.sin(ang - 2.35) * b.r;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(lX, lY);
    ctx.lineTo(rX, rY);
    ctx.closePath();
    ctx.fill();
    return;
  }
  if (shape === 'heart') {
    const rr = b.r * 0.9;
    ctx.beginPath();
    ctx.arc(b.x - rr * 0.45, b.y - rr * 0.2, rr * 0.45, 0, Math.PI * 2);
    ctx.arc(b.x + rr * 0.45, b.y - rr * 0.2, rr * 0.45, 0, Math.PI * 2);
    ctx.moveTo(b.x - rr, b.y - rr * 0.05);
    ctx.lineTo(b.x, b.y + rr * 1.05);
    ctx.lineTo(b.x + rr, b.y - rr * 0.05);
    ctx.closePath();
    ctx.fill();
    return;
  }
  if (shape === 'crescent') {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(b.x + b.r * 0.45, b.y - b.r * 0.1, b.r * 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    return;
  }
  if (shape === 'bubble') {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.28, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = b.color;
    return;
  }
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlayer(p) {
  const ps = p.weapon.player_size;
  const pw = PW * ps, ph = PH * ps;
  const stride = Math.min(1, Math.abs(p.vx) / (PLAYER_SPEED * Math.max(0.5, p.weapon.move_speed)));
  const bob = p.grounded ? Math.sin((p.x + windPhase * 40) * 0.18) * stride * 1.5 : Math.sin((p.y + windPhase * 25) * 0.1) * 1.3;
  const bx = p.x - pw / 2, by = p.y - ph + bob;

  if (p.damageTaken > 0) {
    ctx.globalAlpha = Math.floor(p.damageTaken) % 4 < 2 ? 0.5 : 1;
    p.damageTaken -= 0.45;
  }

  ctx.save();
  ctx.shadowColor = p.robeColor;
  ctx.shadowBlur = 12;
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + 3, pw * 0.52, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const hoodH = ph * 0.34;
  const torsoH = ph * 0.4;
  const legH = ph - hoodH - torsoH;
  const legW = pw * 0.24;
  const legY = by + hoodH + torsoH;
  const legSwing = p.grounded ? Math.sin((p.x + windPhase * 30) * 0.22) * stride * 1.4 : 0;

  ctx.fillStyle = '#6f533f';
  ctx.fillRect(p.x - legW - 2, legY + legSwing, legW, legH);
  ctx.fillRect(p.x + 2, legY - legSwing, legW, legH);
  ctx.fillStyle = '#4f392a';
  ctx.fillRect(p.x - legW - 2, legY + legSwing + legH - 4, legW, 4);
  ctx.fillRect(p.x + 2, legY - legSwing + legH - 4, legW, 4);

  ctx.fillStyle = p.robeColor;
  ctx.fillRect(bx + 2, by + hoodH, pw - 4, torsoH + 2);
  ctx.fillStyle = p.trimColor;
  ctx.fillRect(bx + 2, by + hoodH, pw - 4, 3);
  ctx.fillStyle = 'rgba(255,255,255,0.24)';
  ctx.fillRect(bx + pw * 0.24, by + hoodH + 6, pw * 0.52, 2);
  ctx.fillStyle = 'rgba(70, 42, 60, 0.35)';
  const capeWave = Math.sin((p.x + windPhase * 20) * 0.17 + (p.facing === 1 ? 0 : 1.7)) * 2;
  ctx.fillRect(bx + (p.facing === 1 ? -2 : pw - 2), by + hoodH + 2, 4, torsoH + 6 + capeWave);

  ctx.fillStyle = p.hairColor;
  ctx.fillRect(bx + 4, by + 2, pw - 8, hoodH - 3);
  ctx.fillStyle = p.trimColor;
  ctx.beginPath();
  if (p.facing === 1) {
    ctx.moveTo(bx + pw * 0.15, by + 2);
    ctx.lineTo(bx + pw * 0.75, by + 2);
    ctx.lineTo(bx + pw * 0.55, by - 8);
  } else {
    ctx.moveTo(bx + pw * 0.25, by + 2);
    ctx.lineTo(bx + pw * 0.85, by + 2);
    ctx.lineTo(bx + pw * 0.45, by - 8);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = p.skinColor;
  ctx.fillRect(bx + pw * 0.28, by + hoodH * 0.34, pw * 0.44, hoodH * 0.5);
  ctx.fillStyle = '#3b2f3a';
  const blink = Math.sin((performance.now() + p.idx * 370) * 0.01) > 0.95;
  ctx.fillRect(bx + pw * 0.36, by + hoodH * 0.5, 2, blink ? 1 : 2);
  ctx.fillRect(bx + pw * 0.58, by + hoodH * 0.5, 2, blink ? 1 : 2);
  ctx.fillStyle = p.trimColor;
  ctx.fillRect(bx + pw * 0.43, by + hoodH * 0.63, pw * 0.14, 1);

  const armY = by + hoodH + torsoH * 0.22 + legSwing * 0.5;
  const spriteSize = 2;
  const weaponW = p.weapon.pixel_rows.length * spriteSize;
  const weaponX = p.facing === 1 ? bx + pw + 2 : bx - (weaponW + 2);
  const weaponY = armY - 4;
  ctx.fillStyle = p.trimColor;
  if (p.facing === 1) ctx.fillRect(bx + pw, armY, 4, 5);
  else ctx.fillRect(bx - 4, armY, 4, 5);
  drawWeaponSprite(p.weapon, weaponX, weaponY, spriteSize, p.facing);

  const hpFrac = Math.max(0, p.hp / p.maxHp);
  const barW = 38, barH = 4;
  const barX = p.x - barW / 2, barY = by - 8;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
  const hpColor = hpFrac > 0.5 ? '#00ff88' : hpFrac > 0.25 ? '#ffcc00' : '#ff4444';
  ctx.save();
  ctx.shadowColor = hpColor;
  ctx.shadowBlur = 6;
  ctx.fillStyle = hpColor;
  ctx.fillRect(barX, barY, barW * hpFrac, barH);
  ctx.restore();

  ctx.globalAlpha = 1;
}

function updateAnnouncements(dt) {
  for (let i = announcements.length - 1; i >= 0; i--) {
    const a = announcements[i];
    a.life -= dt;
    a.y += a.vy * dt;
    a.scale = Math.min(1, a.scale + dt * 0.12);
    if (a.life <= 0) announcements.splice(i, 1);
  }
}
function renderAnnouncements() {
  for (const a of announcements) {
    const alpha = Math.min(1, a.life / (a.maxLife * 0.3));
    const scale = 0.5 + a.scale * 0.5;
    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 44px "VT323", monospace';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;
    ctx.strokeText(a.text, 0, 0);
    ctx.fillStyle = a.color;
    ctx.fillText(a.text, 0, 0);
    ctx.shadowColor = a.color;
    ctx.shadowBlur = 20;
    ctx.fillText(a.text, 0, 0);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function render() {
  ctx.save();
  const ox = (Math.random() - 0.5) * shakeAmount * 2;
  const oy = (Math.random() - 0.5) * shakeAmount * 2;
  shakeAmount *= 0.88;
  if (shakeAmount < 0.3) shakeAmount = 0;
  ctx.translate(ox, oy);

  bgHuePhase += 0.4;
  const hueAngle = Math.sin(bgHuePhase * 0.008) * 120;
  ctx.filter = `hue-rotate(${hueAngle}deg) saturate(1.35) brightness(0.92)`;
  ctx.drawImage(bgCanvas, 0, 0);
  ctx.filter = 'none';

  renderEnvironmentLife();
  renderFireflies();
  renderHazardFields();
  renderMuzzleFlashes();

  for (const b of bullets) {
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < b.trail.length; i++) {
      const pt = b.trail[i];
      const frac = (i + 1) / b.trail.length;
      ctx.fillStyle = b.trailColor;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, b.r * frac * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.glowColor;
    ctx.shadowBlur = b.r * (5 + b.effectIntensity * 2);
    drawProjectile(b);
    ctx.restore();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.44, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  for (const p of players) if (p.alive) drawPlayer(p);

  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    if (p.style === 'bubble') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size + 1, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (p.style === 'petal' || p.style === 'leaf') {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillRect(-p.size, -p.size * 0.35, p.size * 2, p.size * 0.7);
      ctx.restore();
    } else if (p.style === 'ember') {
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8 + alpha * 6;
      const flicker = 0.7 + Math.sin(p.life * 2.5) * 0.3;
      ctx.globalAlpha = alpha * flicker;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha * flicker * 0.5;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (p.style === 'smoke') {
      const expand = 1 + (1 - alpha) * 2.5;
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillStyle = '#aaaaaa';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * expand, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.save();
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.size * 3;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      ctx.restore();
    }
  }
  ctx.globalAlpha = 1;

  renderAnnouncements();

  if (screenFlash > 0) {
    ctx.globalAlpha = (screenFlash / 15) * 0.55;
    ctx.fillStyle = screenFlashColor;
    ctx.fillRect(-10, -10, W + 20, H + 20);
    ctx.globalAlpha = 1;
    screenFlash -= 1;
  }

  renderHud();
  ctx.restore();
}

function renderHud() {
  ctx.fillStyle = 'rgba(0, 0, 10, 0.7)';
  ctx.fillRect(0, 0, W, 52);
  ctx.fillStyle = 'rgba(0, 255, 200, 0.25)';
  ctx.fillRect(0, 51, W, 1);

  const p1 = players[0], p2 = players[1];
  ctx.font = '18px "VT323", monospace';
  ctx.textBaseline = 'middle';

  if (p1) {
    ctx.textAlign = 'left';
    const hpFrac1 = Math.max(0, p1.hp / p1.maxHp);
    ctx.fillStyle = hpFrac1 > 0.5 ? '#00ff88' : hpFrac1 > 0.25 ? '#ffcc00' : '#ff4444';
    ctx.fillText(`P1 HP ${Math.ceil(Math.max(0, p1.hp))}/${p1.maxHp}`, 10, 16);
    ctx.fillStyle = '#ff88cc';
    ctx.fillText(`${p1.weapon.name}`, 10, 34);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(10, 44, 140, 4);
    ctx.fillStyle = hpFrac1 > 0.5 ? '#00ff88' : hpFrac1 > 0.25 ? '#ffcc00' : '#ff4444';
    ctx.fillRect(10, 44, 140 * hpFrac1, 4);
  }
  if (p2) {
    ctx.textAlign = 'right';
    const hpFrac2 = Math.max(0, p2.hp / p2.maxHp);
    ctx.fillStyle = hpFrac2 > 0.5 ? '#00ff88' : hpFrac2 > 0.25 ? '#ffcc00' : '#ff4444';
    ctx.fillText(`HP ${Math.ceil(Math.max(0, p2.hp))}/${p2.maxHp} P2`, W - 10, 16);
    ctx.fillStyle = '#88ccff';
    ctx.fillText(`${p2.weapon.name}`, W - 10, 34);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(W - 150, 44, 140, 4);
    ctx.fillStyle = hpFrac2 > 0.5 ? '#00ff88' : hpFrac2 > 0.25 ? '#ffcc00' : '#ff4444';
    ctx.fillRect(W - 150 + 140 * (1 - hpFrac2), 44, 140 * hpFrac2, 4);
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = '28px "VT323", monospace';
  ctx.shadowColor = '#ff00ff';
  ctx.shadowBlur = 8;
  ctx.fillText(`${score[0]}  -  ${score[1]}`, W / 2, 16);
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '14px "VT323", monospace';
  ctx.fillText(`Round ${Math.min(roundNum, ROUNDS_PER_GAME)}/${ROUNDS_PER_GAME}`, W / 2, 32);
  ctx.font = '13px "VT323", monospace';
  ctx.fillStyle = currentLevel.theme.top;
  ctx.fillText(`${currentLevel.name}  |  ${activeOmen?.name || 'Vernal Calm'}`, W / 2, 45);
}

function renderTitle() {
  bgHuePhase += 0.6;
  const hueAngle = Math.sin(bgHuePhase * 0.008) * 180;
  ctx.filter = `hue-rotate(${hueAngle}deg) saturate(1.5) brightness(0.85)`;
  ctx.drawImage(bgCanvas, 0, 0);
  ctx.filter = 'none';
  renderFireflies();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const titlePulse = 1 + Math.sin(Date.now() / 600) * 0.04;
  ctx.save();
  ctx.translate(W / 2, H * 0.22);
  ctx.scale(titlePulse, titlePulse);
  ctx.font = '58px "VT323", monospace';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  ctx.strokeText('WIZARD DUEL', 0, 0);
  ctx.fillStyle = '#ff00cc';
  ctx.shadowColor = '#ff00ff';
  ctx.shadowBlur = 30;
  ctx.fillText('WIZARD DUEL', 0, 0);
  ctx.shadowBlur = 0;
  ctx.restore();

  ctx.font = '20px "VT323", monospace';
  ctx.fillStyle = '#00ffcc';
  ctx.shadowColor = '#00ffcc';
  ctx.shadowBlur = 10;
  ctx.fillText('Two unhinged wizards. One couch. Infinite questionable life choices.', W / 2, H * 0.34);
  ctx.shadowBlur = 0;

  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#ff88cc';
  ctx.fillText('P1: W/A/S/D + F   (attack)', W / 2, H * 0.47);
  ctx.fillStyle = '#88ccff';
  ctx.fillText('P2: Arrow Keys + /   (attack)', W / 2, H * 0.53);

  ctx.font = '16px "VT323", monospace';
  ctx.fillStyle = '#cccccc';
  ctx.fillText('Lose a round -> rage-forge ANY object into a weapon -> unleash chaos.', W / 2, H * 0.65);
  ctx.fillText('The chaos goblin builds a new pixel relic with matching colors, sound, and effects.', W / 2, H * 0.70);
  ctx.fillText(`Best of ${ROUNDS_PER_GAME} rounds. Most wins takes the couch.`, W / 2, H * 0.75);

  ctx.fillStyle = activeOmen?.color || '#8c7193';
  ctx.fillText(`Vibe Check: ${activeOmen?.name || 'Vernal Calm'} — ${activeOmen?.desc || ''}`, W / 2, H * 0.79);
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText(`Arcana: ${wishforgeProfile.arcana}  |  Press C to open Chaos Codex`, W / 2, H * 0.83);

  const pulse = 0.5 + Math.sin(Date.now() / 300) * 0.5;
  ctx.font = '28px "VT323", monospace';
  ctx.fillStyle = `rgba(0, 255, 200, ${0.5 + pulse * 0.5})`;
  ctx.shadowColor = '#00ffcc';
  ctx.shadowBlur = pulse * 20;
  ctx.fillText('[ PRESS SPACE TO DUEL ]', W / 2, H * 0.89);
  ctx.shadowBlur = 0;
}

function renderRoundOverDisplay() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '46px "VT323", monospace';
  const winColor = players[roundWinner]?.trimColor || '#ff00ff';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(`PLAYER ${roundWinner + 1} WINS THE ROUND`, W / 2, H * 0.38);
  ctx.fillStyle = winColor;
  ctx.shadowColor = winColor;
  ctx.shadowBlur = 20;
  ctx.fillText(`PLAYER ${roundWinner + 1} WINS THE ROUND`, W / 2, H * 0.38);
  ctx.shadowBlur = 0;
  ctx.font = '24px "VT323", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Score: ${score[0]} - ${score[1]} (${Math.min(roundNum, ROUNDS_PER_GAME)}/${ROUNDS_PER_GAME} rounds)`, W / 2, H * 0.52);
  ctx.font = '17px "VT323", monospace';
  ctx.fillStyle = activeOmen?.color || '#8b6c94';
  ctx.fillText(`Vibe: ${activeOmen?.name || 'Vernal Calm'}`, W / 2, H * 0.58);
  const pulse = 0.5 + Math.sin(Date.now() / 350) * 0.5;
  ctx.font = '20px "VT323", monospace';
  ctx.fillStyle = `rgba(0, 255, 200, ${0.5 + pulse * 0.5})`;
  ctx.fillText('Press SPACE to continue', W / 2, H * 0.66);
}

function renderGameOver() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const isDraw = score[0] === score[1];
  const winnerIdx = score[0] > score[1] ? 0 : 1;
  const winColor = isDraw ? '#ffff00' : (players[winnerIdx]?.trimColor || '#ff00ff');
  ctx.font = '54px "VT323", monospace';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 5;
  ctx.strokeText(isDraw ? 'MUTUAL DESTRUCTION!' : `PLAYER ${winnerIdx + 1} WINS!`, W / 2, H * 0.28);
  ctx.fillStyle = winColor;
  ctx.shadowColor = winColor;
  ctx.shadowBlur = 25;
  ctx.fillText(isDraw ? 'MUTUAL DESTRUCTION!' : `PLAYER ${winnerIdx + 1} WINS!`, W / 2, H * 0.28);
  ctx.shadowBlur = 0;
  ctx.font = '30px "VT323", monospace';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Final Score: ${score[0]} - ${score[1]}`, W / 2, H * 0.42);
  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#ff88cc';
  ctx.fillText(`P1 final weapon: ${players[0]?.weapon?.name || 'Wish Twig'}`, W / 2, H * 0.55);
  ctx.fillStyle = '#88ccff';
  ctx.fillText(`P2 final weapon: ${players[1]?.weapon?.name || 'Wish Twig'}`, W / 2, H * 0.60);
  if (lastRunSummary) {
    ctx.fillStyle = '#ccaaff';
    ctx.fillText(`Chaos score: ${lastRunSummary.styleScore}  |  Arcana +${lastRunSummary.arcanaGained}`, W / 2, H * 0.68);
    ctx.fillText(`Vibe: ${lastRunSummary.omenName}  |  Most unhinged relic: ${lastRunSummary.wildestRelic}`, W / 2, H * 0.73);
  }
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText('Press C for Chaos Codex', W / 2, H * 0.80);
  const pulse = 0.5 + Math.sin(Date.now() / 300) * 0.5;
  ctx.font = '26px "VT323", monospace';
  ctx.fillStyle = `rgba(0, 255, 200, ${0.5 + pulse * 0.5})`;
  ctx.shadowColor = '#00ffcc';
  ctx.shadowBlur = pulse * 15;
  ctx.fillText('[ PRESS SPACE TO PLAY AGAIN ]', W / 2, H * 0.88);
  ctx.shadowBlur = 0;
}

function renderCountdown() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lvlTheme = currentLevel.theme;
  ctx.font = '22px "VT323", monospace';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeText(currentLevel.name, W / 2, H * 0.3);
  ctx.fillStyle = lvlTheme.top;
  ctx.shadowColor = lvlTheme.glow;
  ctx.shadowBlur = 15;
  ctx.fillText(currentLevel.name, W / 2, H * 0.3);
  ctx.shadowBlur = 0;

  const text = countdownVal <= 0 ? 'FIGHT!' : String(countdownVal);
  const scale = 1 + (countdownVal <= 0 ? 0.15 : 0) * Math.sin(Date.now() / 100);
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(scale, scale);
  ctx.font = '90px "VT323", monospace';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 6;
  ctx.strokeText(text, 0, 0);
  ctx.fillStyle = countdownVal <= 0 ? '#00ffcc' : '#ffffff';
  ctx.shadowColor = countdownVal <= 0 ? '#00ffcc' : '#ff00ff';
  ctx.shadowBlur = 30;
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

const compilerOverlay = document.getElementById('compiler-overlay');
const compileInput = document.getElementById('compile-input');
const compileOutput = document.getElementById('compile-output');
const compileTimerEl = document.getElementById('compile-timer');
const compilePlayerLabel = document.getElementById('compile-player-label');
const compileModsDisplay = document.getElementById('compile-mods-display');
const codexOverlay = document.getElementById('codex-overlay');
const codexStats = document.getElementById('codex-stats');
const codexList = document.getElementById('codex-list');
let compileInterval = null;

function isCodexOpen() {
  return !!codexOverlay && !codexOverlay.classList.contains('hidden');
}

function updateCodexOverlay() {
  if (!codexStats || !codexList) return;
  const unlocked = Object.values(wishforgeProfile.milestones || {}).filter(Boolean).length;
  codexStats.innerHTML = `
    Arcana: ${wishforgeProfile.arcana} &nbsp;|&nbsp;
    Matches: ${wishforgeProfile.totalMatches} &nbsp;|&nbsp;
    Wishes forged: ${wishforgeProfile.totalWishes} &nbsp;|&nbsp;
    Best style score: ${wishforgeProfile.bestStyleScore} &nbsp;|&nbsp;
    Milestones unlocked: ${unlocked}/3
  `;
  const entries = (wishforgeProfile.relicCodex || []).slice(0, CODEX_LIMIT);
  if (!entries.length) {
    codexList.innerHTML = '<div class="codex-card"><div class="codex-card-name">No chaos recorded yet</div><div class="codex-card-meta">Get bonked, rage-forge something unhinged, and your codex will fill with regrets.</div></div>';
    return;
  }
  codexList.innerHTML = entries.map(entry => `
    <div class="codex-card">
      <div class="codex-card-name">${escapeHtml(entry.name)}</div>
      <div class="codex-card-meta">
        shape: ${escapeHtml(entry.shape)}<br/>
        trail: ${escapeHtml(entry.trail)}<br/>
        impact: ${escapeHtml(entry.impact)}<br/>
        sound: ${escapeHtml(entry.sound)}<br/>
        omen: ${escapeHtml(entry.omen || 'Vernal Calm')}
      </div>
    </div>
  `).join('');
}

function toggleCodexOverlay(forceOpen) {
  if (!codexOverlay) return;
  const shouldOpen = forceOpen ?? codexOverlay.classList.contains('hidden');
  if (shouldOpen) {
    updateCodexOverlay();
    codexOverlay.classList.remove('hidden');
  } else {
    codexOverlay.classList.add('hidden');
  }
}

function getMemoryEcho() {
  const recent = (wishforgeProfile.relicCodex || [])[0];
  if (!recent) return 'No previous chaos recorded. Time to make history.';
  return `Last abomination: ${recent.name} (${recent.shape}/${recent.trail}).`;
}

function startCompilerPhase(loserIdx) {
  compileLoser = loserIdx;
  compileSubmitted = false;
  compileResult = null;

  compilePlayerLabel.textContent = `PLAYER ${loserIdx + 1}`;
  compilePlayerLabel.style.color = players[loserIdx].robeColor;
  compileInput.value = '';
  compileInput.disabled = false;
  compileOutput.classList.add('hidden');
  compileOutput.classList.remove('compile-reveal');
  compileOutput.innerHTML = '';
  compileModsDisplay.innerHTML = `
    <span style="color:#00ffcc">Current weapon:</span> <span class="existing-mod-tag">${players[loserIdx].weapon.name}</span>
    <span class="existing-mod-tag" style="background:#f4e9ff;border-color:#d9c8eb;color:#6f4e80">Omen: ${activeOmen?.name || 'Vernal Calm'}</span>
    <div style="margin-top:4px;color:#8a6f5d">${escapeHtml(getMemoryEcho())}</div>
  `;

  compilerOverlay.classList.remove('hidden');
  gameState = 'compiler';
  if (compileInterval) { clearInterval(compileInterval); compileInterval = null; }
  setTimeout(() => compileInput.focus(), 100);
}
function compileTimerTick() {}
function submitCompile() {
  if (compileSubmitted) return;
  compileSubmitted = true;
  const request = compileInput.value.trim() || 'surprise me with a whimsical magical relic';
  compileInput.disabled = true;
  compileOutput.classList.remove('hidden');
  compileOutput.innerHTML = `
    <div style="color:#00ffcc">THE CHAOS GOBLIN CACKLES: "${request.slice(0, 120)}${request.length > 120 ? '...' : ''}"</div>
    <div class="compiling-bar"><div class="compiling-bar-fill"></div></div>
  `;
  fetch('/.netlify/functions/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request, existingMods: [players[compileLoser].weapon], round: roundNum }),
  })
    .then(r => r.json())
    .then(data => {
      if (data._debug) console.warn('[FWT] Debug:', data._debug);
      compileResult = normalizeWeapon(data.mod || DEFAULT_WEAPON);
      showCompileResult(compileResult);
    })
    .catch(err => {
      console.error('[FWT] Error:', err);
      compileResult = DEFAULT_WEAPON;
      showCompileResult(compileResult);
    });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildPixelPreviewHtml(rows, palette, title) {
  let cells = '';
  for (let y = 0; y < 7; y++) {
    const row = rows[y] || '.......';
    for (let x = 0; x < 7; x++) {
      const ch = row[x] || '.';
      const color = ch === '.' ? 'transparent' : (palette[ch] || '#ffffff');
      cells += `<span class="compile-pixel-cell" style="background:${escapeHtml(color)}"></span>`;
    }
  }
  return `
    <div class="compile-pixel-card">
      <div class="compile-pixel-title">${escapeHtml(title)}</div>
      <div class="compile-pixel-grid">${cells}</div>
    </div>
  `;
}

function buildTraitTags(weapon) {
  const tags = [];
  if (weapon.bullet_count > 1) tags.push(`${weapon.bullet_count}x volley`);
  if (weapon.bullet_spread >= 8) tags.push('spread');
  if (weapon.fire_rate >= 1.3) tags.push('rapid fire');
  if (weapon.bullet_damage >= 1.2) tags.push('heavy hit');
  if (weapon.bullet_bounces > 0) tags.push(`bounces ${weapon.bullet_bounces}`);
  if (weapon.on_bounce_split > 0) tags.push(`split ${weapon.on_bounce_split}`);
  if (weapon.status_slow > 0.05) tags.push('slow');
  if (weapon.status_dot_dps > 0.1) tags.push('damage over time');
  if (weapon.status_stun_duration > 0.05) tags.push('stun');
  if (weapon.lifesteal > 0.02) tags.push('lifesteal');
  if (weapon.splash_radius > 4) tags.push('splash');
  if (weapon.cloud_radius > 8) tags.push('hazard cloud');
  if (weapon.projectile_growth > 0.05) tags.push('growing shot');
  if (weapon.pierce_walls) tags.push('wall pierce');
  if (weapon.ground_avoidance > 0.05) tags.push('ground avoid');
  if (weapon.bullet_homing > 0.05 || weapon.steering > 0.05) tags.push('guided');
  if (weapon.self_damage_on_shoot > 0.05) tags.push('blood pact');
  if (weapon.hp_bonus >= 10) tags.push('extra hp');
  if (weapon.regen >= 0.3) tags.push('regen');
  if (weapon.move_speed <= 0.85) tags.push('slower wielder');
  if (weapon.fire_rate <= 0.8) tags.push('slow reload');
  if (weapon.player_size >= 1.2) tags.push('larger hitbox');
  return tags.slice(0, 8);
}

function showCompileResult(weapon) {
  const tags = buildTraitTags(weapon);
  const tagsHtml = tags.length
    ? tags.map(tag => `<span class="compile-trait-tag">${escapeHtml(tag)}</span>`).join('')
    : '<span class="compile-trait-empty">Pure style relic</span>';

  compileOutput.innerHTML = `
    <div class="compile-mod-name">✨ ${escapeHtml(weapon.name)}</div>
    <div class="compile-mod-quip">"${escapeHtml(weapon.quip)}"</div>
    <div class="compile-mod-tradeoff">Tradeoff: ${escapeHtml(weapon.tradeoff)}</div>
    <div style="color:#886699; margin-top:5px; font-size:12px">Current vibe: ${escapeHtml(activeOmen?.name || 'Vernal Calm')} — ${escapeHtml(activeOmen?.desc || '')}</div>
    <div class="compile-preview-row">
      ${buildPixelPreviewHtml(weapon.pixel_rows, weapon.palette, 'Relic')}
      ${buildPixelPreviewHtml(weapon.projectile_rows, weapon.projectile_palette, 'Projectile')}
    </div>
    <div class="compile-trait-row">${tagsHtml}</div>
    <div style="color:#00ffcc; margin-top:8px; font-size:12px">Press SPACE to unleash this monstrosity</div>
  `;
  const handleSpace = (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      window.removeEventListener('keydown', handleSpace);
      applyCompileAndStartRound();
    }
  };
  window.addEventListener('keydown', handleSpace);
}
function applyCompileAndStartRound() {
  if (compileResult && players[compileLoser]) {
    playerWeapons[compileLoser] = normalizeWeapon(compileResult);
    trackWishForRun(compileLoser, playerWeapons[compileLoser]);
  }
  compileInput.disabled = true;
  compileOutput.classList.add('compile-reveal');
  compileOutput.innerHTML += `<div style="margin-top:8px;color:#ff00ff">Chaos energy surges... your unhinged creation takes form...</div>`;
  if (compileInterval) { clearInterval(compileInterval); compileInterval = null; }
  setTimeout(() => {
    compilerOverlay.classList.add('hidden');
    compileOutput.classList.remove('compile-reveal');
    compileInput.disabled = false;
    startRound();
  }, 650);
}

compileInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitCompile();
  }
  e.stopPropagation();
});
compileInput.addEventListener('keyup', e => e.stopPropagation());
codexOverlay?.addEventListener('click', (e) => {
  if (e.target === codexOverlay) toggleCodexOverlay(false);
});

function loadLevel() {
  let idx;
  do {
    idx = Math.floor(Math.random() * LEVELS.length);
  } while (idx === lastLevelIndex && LEVELS.length > 1);
  lastLevelIndex = idx;
  currentLevel = LEVELS[idx];
  PLATFORMS = currentLevel.platforms;
  SPAWNS = currentLevel.spawns;
}

function startGame() {
  toggleCodexOverlay(false);
  score = [0, 0];
  roundNum = 0;
  playerWeapons = [DEFAULT_WEAPON, DEFAULT_WEAPON];
  activeOmen = pickSeasonalOmen();
  currentRunStats = createRunStats();
  lastRunSummary = null;
  loadLevel();
  players = [createPlayer(0), createPlayer(1)];
  initFireflies();
  initEnvironmentLife();
  renderBackground();
  startRound();
}
function startRound() {
  roundNum++;
  loadLevel();
  bullets = [];
  particles = [];
  hazardFields = [];
  muzzleFlashes = [];
  announcements = [];
  comboCount = [0, 0];
  shakeAmount = 0;
  slowMo = 0;
  players[0] = createPlayer(0);
  players[1] = createPlayer(1);
  pickNewBgImage();
  renderBackground();
  gameState = 'playing';
}
function advanceFromRoundOver() {
  if (roundNum >= ROUNDS_PER_GAME) {
    finalizeMatchProgression();
    gameState = 'game_over';
    return;
  }
  const loserIdx = 1 - roundWinner;
  startCompilerPhase(loserIdx);
}
function checkRoundEnd() {
  const alive0 = players[0].alive;
  const alive1 = players[1].alive;
  if (alive0 && alive1) return;
  roundWinner = !alive0 && !alive1 ? (Math.random() < 0.5 ? 0 : 1) : (alive0 ? 0 : 1);
  const hpGap = Math.abs((players[0]?.hp || 0) - (players[1]?.hp || 0));
  if (hpGap <= 18) currentRunStats.closeRounds++;
  currentRunStats.roundWinners.push(roundWinner);
  score[roundWinner]++;
  gameState = 'round_over_display';
}

function gameLoop(timestamp) {
  const rawDt = lastTime ? (timestamp - lastTime) / 16.67 : 1;
  lastTime = timestamp;
  const dt = slowMo > 0 ? rawDt * 0.3 : Math.min(rawDt, 3);
  if (slowMo > 0) slowMo -= rawDt;

  switch (gameState) {
    case 'intro':
      updateIntro(rawDt);
      renderIntro();
      break;
    case 'title':
      renderTitle();
      break;
    case 'countdown':
      gameState = 'playing';
      break;
    case 'playing':
      updatePlayers(dt);
      updateBullets(dt);
      updateParticles(dt);
      updateHazardFields(dt);
      updateMuzzleFlashes(dt);
      updateEnvironmentLife(dt);
      updateFireflies();
      updateAnnouncements(dt);
      checkRoundEnd();
      render();
      break;
    case 'round_over_display':
      updateParticles(rawDt);
      updateHazardFields(rawDt);
      updateEnvironmentLife(rawDt);
      updateFireflies();
      updateAnnouncements(rawDt);
      renderRoundOverDisplay();
      break;
    case 'compiler':
      updateHazardFields(rawDt);
      updateEnvironmentLife(rawDt);
      updateFireflies();
      render();
      break;
    case 'game_over':
      updateParticles(rawDt);
      updateHazardFields(rawDt);
      updateEnvironmentLife(rawDt);
      updateFireflies();
      renderGameOver();
      break;
  }
  requestAnimationFrame(gameLoop);
}

function resize() {
  const scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  canvas.style.width = `${W * scale}px`;
  canvas.style.height = `${H * scale}px`;
}
window.addEventListener('resize', resize);
resize();
loadLevel();
initFireflies();
initEnvironmentLife();
loadTrippyImages();
renderBackground();
updateCodexOverlay();

if (!isIntroSeen()) {
  startIntro();
  gameState = 'intro';
} else {
  gameState = 'title';
}
requestAnimationFrame(gameLoop);
