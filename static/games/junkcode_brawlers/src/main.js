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
const COMPILE_TIME = 60;
const ROUNDS_PER_GAME = 5;
const KILL_Y = H + 60;

const PLATFORMS = [
  { x: 0, y: 468, w: 370, h: 24 },
  { x: 590, y: 468, w: 370, h: 24 },
  { x: 350, y: 370, w: 260, h: 14 },
  { x: 80, y: 275, w: 190, h: 14 },
  { x: 690, y: 275, w: 190, h: 14 },
  { x: 390, y: 175, w: 180, h: 14 },
];
const WALLS = [
  { x: -12, y: -100, w: 12, h: H + 200 },
  { x: W, y: -100, w: 12, h: H + 200 },
];
const SPAWNS = [{ x: 160, y: 420 }, { x: 800, y: 420 }];

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

const keys = {};
const GAME_KEYS = new Set(['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'f', '/', 'w', 'a', 's', 'd']);
window.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  keys[k] = true;
  keys[e.code] = true;
  if (GAME_KEYS.has(k) && e.target.tagName !== 'INPUT') e.preventDefault();
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
function playSound(type, profile = 'chime', pitch = 1, release = 1, intensity = 1) {
  const p = clamp(pitch, 0.5, 2);
  const r = clamp(release, 0.5, 2);
  const g = clamp(intensity, 0.25, 2);
  if (type === 'jump') return quickTone('sine', 290, 0.12, 0.06);
  if (type === 'hit') return quickTone('triangle', 170, 0.14, 0.1);
  if (type === 'death') return quickTone('sawtooth', 220, 0.6, 0.18);
  if (type === 'bounce') return quickTone('sine', 700, 0.08, 0.05);

  const map = {
    chime: ['sine', 900, 0.1, 0.08],
    flute: ['triangle', 520, 0.09, 0.08],
    bell: ['sine', 720, 0.12, 0.09],
    bubble: ['sine', 440, 0.08, 0.07],
    twig: ['triangle', 310, 0.08, 0.06],
    horn: ['sawtooth', 260, 0.11, 0.08],
    pop: ['square', 620, 0.06, 0.06],
    crystal: ['sine', 1040, 0.15, 0.08],
    drum: ['sawtooth', 170, 0.1, 0.11],
    harp: ['triangle', 760, 0.2, 0.07],
    whoosh: ['sawtooth', 380, 0.07, 0.08],
    crackle: ['square', 820, 0.05, 0.06],
  };
  const [wave, freq, dur, gain] = map[profile] || map.chime;
  quickTone(wave, freq * p, dur * r, gain * g);
}

function spawnParticles(x, y, count, color, speed, life, style = 'dot') {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.4 + Math.random() * 0.7);
    particles.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 1.2,
      life: life * (0.55 + Math.random() * 0.6),
      maxLife: life,
      color,
      size: 1 + Math.random() * 2.5,
      style,
    });
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 0.1 * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function initFireflies() {
  fireflies = [];
  for (let i = 0; i < 45; i++) {
    fireflies.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
      phase: Math.random() * Math.PI * 2,
      color: Math.random() < 0.5 ? '#fff0a8' : '#ffd8f0',
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
  for (let i = 0; i < 16; i++) {
    butterflies.push({
      x: Math.random() * W,
      y: 180 + Math.random() * 260,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.35,
      wing: Math.random() * Math.PI * 2,
      color: Math.random() < 0.5 ? '#f6a3cd' : '#8cc5ff',
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
  for (const c of cloudWisps) {
    c.x += c.vx * dt * 0.2;
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
    const alpha = 0.2 + (Math.sin(f.phase) * 0.5 + 0.5) * 0.45;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = f.color;
    ctx.fillRect(f.x, f.y, 2, 2);
  }
  ctx.globalAlpha = 1;
}

function renderEnvironmentLife() {
  for (const c of cloudWisps) {
    ctx.globalAlpha = c.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w, c.h, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x + c.w * 0.45, c.y - 3, c.w * 0.55, c.h * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  for (const b of butterflies) {
    const flap = 0.6 + Math.sin(b.wing) * 0.4;
    ctx.fillStyle = b.color;
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.ellipse(b.x - 2, b.y, 2.5 + flap * 2.5, 1.6, -0.5, 0, Math.PI * 2);
    ctx.ellipse(b.x + 2, b.y, 2.5 + flap * 2.5, 1.6, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#5f4a55';
    ctx.fillRect(b.x - 0.5, b.y - 1.5, 1, 3);
  }
}

function spawnMuzzleFlash(x, y, color) {
  muzzleFlashes.push({ x, y, color, life: 7, maxLife: 7 });
}
function updateMuzzleFlashes(dt) {
  for (let i = muzzleFlashes.length - 1; i >= 0; i--) {
    muzzleFlashes[i].life -= dt;
    if (muzzleFlashes[i].life <= 0) muzzleFlashes.splice(i, 1);
  }
}
function renderMuzzleFlashes() {
  for (const f of muzzleFlashes) {
    const alpha = f.life / f.maxLife;
    const r = 5 + (1 - alpha) * 8;
    ctx.globalAlpha = alpha * 0.5;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(f.x, f.y, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.35;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    ctx.fill();
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
        spawnParticles(p.x, p.y, 24, p.trimColor, 4, 30, 'burst');
        continue;
      }
    }

    const slowMult = p.slowTimer > 0 ? Math.max(0.2, 1 - p.slowAmount) : 1;
    const isStunned = p.stunTimer > 0;
    const spd = PLAYER_SPEED * w.move_speed * slowMult;
    const grav = GRAVITY * w.player_gravity;

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
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const pw = PW * w.player_size;
    const ph = PH * w.player_size;
    p.grounded = false;

    for (const plat of PLATFORMS) {
      if (rectOverlap(p.x - pw / 2, p.y - ph, pw, ph, plat.x, plat.y, plat.w, plat.h)) {
        if (p.vy >= 0 && p.y - ph / 2 < plat.y) {
          p.y = plat.y;
          p.vy = 0;
          p.grounded = true;
        }
      }
    }

    if (!wasGrounded && p.grounded) {
      spawnParticles(p.x, p.y + 1, 4, '#f7e8d7', 1.1, 10, 'puff');
    }

    for (const wall of WALLS) {
      if (p.x - pw / 2 < wall.x + wall.w && p.x + pw / 2 > wall.x) {
        p.x = p.x < W / 2 ? wall.x + wall.w + pw / 2 : wall.x - pw / 2;
        p.vx = 0;
      }
    }

    if (p.fireCd > 0) p.fireCd -= dt;
    const shootKey = isStunned ? false : (p.idx === 0 ? keys.f : (keys['/'] || keys.Slash));
    if (shootKey && p.fireCd <= 0 && p.alive) {
      fireBullets(p);
      p.fireCd = FIRE_COOLDOWN / w.fire_rate;
    }

    if (w.regen > 0 && p.hp < p.maxHp) p.hp = Math.min(p.maxHp, p.hp + (w.regen / 60) * dt);
    if (!p.grounded && Math.random() < 0.26) spawnParticles(p.x, p.y, 1, p.trimColor, 0.8, 8, 'petal');

    if (p.y > KILL_Y) {
      p.alive = false;
      playSound('death');
      spawnParticles(p.x, H, 22, p.trimColor, 4, 40, 'burst');
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
      spawnParticles(p.x, p.y, 24, '#ffb3b3', 4, 30, 'burst');
      return;
    }
  }
  const count = w.bullet_count;
  const spread = w.bullet_spread;
  const baseAngle = p.facing === 1 ? 0 : Math.PI;
  playSound('shoot', w.sound_profile, w.sound_pitch, w.sound_release, w.effect_intensity);
  const muzzleX = p.x + p.facing * (PW * w.player_size / 2 + 10 * w.player_size);
  const muzzleY = p.y - PH * w.player_size * 0.62;
  spawnMuzzleFlash(muzzleX, muzzleY, w.glow_color);

  for (let i = 0; i < count; i++) {
    let angle = baseAngle;
    if (count > 1) {
      const frac = i / (count - 1) - 0.5;
      angle += frac * spread * Math.PI / 180;
    }
    const speed = BULLET_SPEED * w.bullet_speed;
    const r = BULLET_R * w.bullet_size;
    bullets.push({
      x: p.x + p.facing * (PW * w.player_size / 2 + r),
      y: p.y - PH * w.player_size * 0.55,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      owner: p.idx,
      r,
      damage: 10 * w.bullet_damage,
      bouncesLeft: w.bullet_bounces,
      homing: w.bullet_homing,
      onBounceSplit: w.on_bounce_split,
      knockback: w.knockback_power,
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

    if (b.homing > 0 || b.steering > 0) {
      const target = players[1 - b.owner];
      if (target?.alive) {
        const tx = target.x - b.x;
        const ty = (target.y - PH * target.weapon.player_size / 2) - b.y;
        const desired = Math.atan2(ty, tx);
        const current = Math.atan2(b.vy, b.vx);
        let diff = desired - current;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const turnRate = Math.max(b.homing, b.steering * 0.25);
        const turn = clamp(diff, -turnRate, turnRate);
        const angle = current + turn;
        const spd = Math.hypot(b.vx, b.vy);
        b.vx = Math.cos(angle) * spd;
        b.vy = Math.sin(angle) * spd;
      }
    }

    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 10) b.trail.shift();
    if (Math.random() < 0.34 * b.trailDensity) spawnTrailParticle(b);
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
      if (p.idx === b.owner || !p.alive) continue;
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
          spawnParticles(p.x, p.y - ph / 2, 30, p.trimColor, 5.8, 45, 'burst');
          slowMo = 40;
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
      spawnParticles(p.x, p.y - 10, 24, p.trimColor, 4, 30, 'burst');
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
        spawnParticles(p.x, p.y - 10, 24, p.trimColor, 4, 30, 'burst');
      }
    }
  }
}

function renderHazardFields() {
  for (const f of hazardFields) {
    const lifeFrac = Math.max(0.15, Math.min(1, f.timeLeft / 2));
    ctx.globalAlpha = 0.12 * lifeFrac;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.25 * lifeFrac;
    ctx.strokeStyle = f.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.radius * 0.85, 0, Math.PI * 2);
    ctx.stroke();
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

  const sky = c.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#ffd9f0');
  sky.addColorStop(0.45, '#cde9ff');
  sky.addColorStop(1, '#bdecc8');
  c.fillStyle = sky;
  c.fillRect(0, 0, W, H);

  c.fillStyle = 'rgba(255,255,255,0.5)';
  for (let i = 0; i < 16; i++) {
    const x = Math.random() * W;
    const y = 30 + Math.random() * 140;
    c.beginPath();
    c.ellipse(x, y, 28 + Math.random() * 30, 10 + Math.random() * 12, 0, 0, Math.PI * 2);
    c.fill();
  }

  c.fillStyle = '#95d29f';
  c.beginPath();
  c.moveTo(0, H);
  c.quadraticCurveTo(W * 0.2, H - 140, W * 0.35, H - 88);
  c.quadraticCurveTo(W * 0.5, H - 40, W * 0.7, H - 90);
  c.quadraticCurveTo(W * 0.85, H - 130, W, H - 70);
  c.lineTo(W, H);
  c.closePath();
  c.fill();

  c.fillStyle = '#7bbc8a';
  c.beginPath();
  c.moveTo(0, H);
  c.quadraticCurveTo(W * 0.16, H - 80, W * 0.38, H - 40);
  c.quadraticCurveTo(W * 0.6, H - 8, W * 0.82, H - 44);
  c.quadraticCurveTo(W * 0.9, H - 60, W, H - 36);
  c.lineTo(W, H);
  c.closePath();
  c.fill();

  for (const p of PLATFORMS) {
    c.fillStyle = '#8b6f5a';
    c.fillRect(p.x, p.y, p.w, p.h);
    c.fillStyle = '#73b86b';
    c.fillRect(p.x, p.y, p.w, 4);
    c.fillStyle = '#a88d74';
    for (let x = p.x + 10; x < p.x + p.w - 8; x += 18) c.fillRect(x, p.y + 6, 8, 2);
    c.fillStyle = 'rgba(255,255,255,0.25)';
    c.fillRect(p.x + 2, p.y + 1, p.w - 4, 1);
    for (let fx = p.x + 8; fx < p.x + p.w - 8; fx += 28) {
      if (Math.random() < 0.45) {
        c.fillStyle = '#f6d89e';
        c.fillRect(fx, p.y - 4, 2, 4);
        c.fillStyle = '#f4a4c8';
        c.fillRect(fx - 1, p.y - 6, 4, 2);
      }
    }
  }

  for (let i = 0; i < 60; i++) {
    const sx = Math.random() * W;
    const sy = 100 + Math.random() * (H - 170);
    c.fillStyle = `rgba(255,255,255,${0.08 + Math.random() * 0.2})`;
    c.fillRect(sx, sy, 1, 1);
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

  ctx.fillStyle = 'rgba(0,0,0,0.14)';
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + 3, pw * 0.52, 3, 0, 0, Math.PI * 2);
  ctx.fill();

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
  ctx.fillStyle = '#4f3b33';
  ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
  ctx.fillStyle = hpFrac > 0.5 ? '#5cbf72' : hpFrac > 0.25 ? '#f4ba55' : '#e56d75';
  ctx.fillRect(barX, barY, barW * hpFrac, barH);

  ctx.globalAlpha = 1;
}

function render() {
  ctx.save();
  const ox = (Math.random() - 0.5) * shakeAmount * 2;
  const oy = (Math.random() - 0.5) * shakeAmount * 2;
  shakeAmount *= 0.88;
  if (shakeAmount < 0.3) shakeAmount = 0;
  ctx.translate(ox, oy);

  ctx.drawImage(bgCanvas, 0, 0);
  renderEnvironmentLife();
  renderFireflies();
  renderHazardFields();
  renderMuzzleFlashes();

  for (const b of bullets) {
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < b.trail.length; i++) {
      const pt = b.trail[i];
      const frac = (i + 1) / b.trail.length;
      ctx.fillStyle = b.trailColor;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, b.r * frac * 0.55, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.save();
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.glowColor;
    ctx.shadowBlur = b.r * (3 + b.effectIntensity);
    drawProjectile(b);
    ctx.restore();
    ctx.globalAlpha = 0.8;
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
      ctx.stroke();
    } else if (p.style === 'petal' || p.style === 'leaf') {
      ctx.fillRect(p.x - p.size, p.y - p.size * 0.4, p.size * 2, p.size * 0.8);
    } else {
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
  }
  ctx.globalAlpha = 1;

  renderHud();
  ctx.restore();
}

function renderHud() {
  ctx.fillStyle = 'rgba(80, 56, 48, 0.55)';
  ctx.fillRect(0, 0, W, 38);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fillRect(0, 37, W, 1);

  const p1 = players[0], p2 = players[1];
  ctx.font = '18px "VT323", monospace';
  ctx.textBaseline = 'middle';

  if (p1) {
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffe0ee';
    ctx.fillText(`P1 HP ${Math.ceil(Math.max(0, p1.hp))}/${p1.maxHp}`, 10, 16);
    ctx.fillStyle = '#f6d7b2';
    ctx.fillText(`${p1.weapon.name}`, 10, 30);
  }
  if (p2) {
    ctx.textAlign = 'right';
    ctx.fillStyle = '#e6f0ff';
    ctx.fillText(`HP ${Math.ceil(Math.max(0, p2.hp))}/${p2.maxHp} P2`, W - 10, 16);
    ctx.fillStyle = '#f6d7b2';
    ctx.fillText(`${p2.weapon.name}`, W - 10, 30);
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff0a8';
  ctx.font = '24px "VT323", monospace';
  ctx.fillText(`${score[0]}  -  ${score[1]}`, W / 2, 16);
  ctx.fillStyle = '#6a5448';
  ctx.font = '14px "VT323", monospace';
  ctx.fillText(`Round ${Math.min(roundNum, ROUNDS_PER_GAME)}/${ROUNDS_PER_GAME}`, W / 2, 31);
}

function renderTitle() {
  ctx.drawImage(bgCanvas, 0, 0);
  renderFireflies();
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '54px "VT323", monospace';
  ctx.fillStyle = '#724d6d';
  ctx.fillText('WISHFORGE DUEL', W / 2, H * 0.24);
  ctx.font = '20px "VT323", monospace';
  ctx.fillStyle = '#7e5b4a';
  ctx.fillText('Two mages. One wish each round. Anything can become your next weapon.', W / 2, H * 0.34);
  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#8e5c76';
  ctx.fillText('P1: W/A/S/D + F', W / 2, H * 0.47);
  ctx.fillStyle = '#5a77a8';
  ctx.fillText('P2: Arrow Keys + /', W / 2, H * 0.53);
  ctx.font = '16px "VT323", monospace';
  ctx.fillStyle = '#6b5b4f';
  ctx.fillText('Lose a round -> enter the Wish Forge -> describe your dream (or silly) item.', W / 2, H * 0.65);
  ctx.fillText('The spirit builds a new 7x7 pixel relic with matching colors, sound, and effects.', W / 2, H * 0.70);
  ctx.fillText(`A full game is ${ROUNDS_PER_GAME} rounds. Highest score wins.`, W / 2, H * 0.75);
  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(114, 77, 109, ${0.45 + pulse * 0.55})`;
  ctx.font = '26px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO BEGIN ]', W / 2, H * 0.86);
}

function renderRoundOverDisplay() {
  render();
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '42px "VT323", monospace';
  ctx.fillStyle = players[roundWinner]?.robeColor || '#5a4a5e';
  ctx.fillText(`PLAYER ${roundWinner + 1} WON THE ROUND`, W / 2, H * 0.4);
  ctx.font = '22px "VT323", monospace';
  ctx.fillStyle = '#714f3d';
  ctx.fillText(`Score: ${score[0]} - ${score[1]} (${Math.min(roundNum, ROUNDS_PER_GAME)}/${ROUNDS_PER_GAME} rounds)`, W / 2, H * 0.52);
  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#6a5448';
  ctx.fillText('Press SPACE to continue', W / 2, H * 0.64);
}

function renderGameOver() {
  render();
  ctx.fillStyle = 'rgba(255,255,255,0.44)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const isDraw = score[0] === score[1];
  const winnerIdx = score[0] > score[1] ? 0 : 1;
  ctx.font = '50px "VT323", monospace';
  ctx.fillStyle = isDraw ? '#6d576a' : (players[winnerIdx]?.robeColor || '#6d576a');
  ctx.fillText(isDraw ? 'IT IS A DRAW!' : `PLAYER ${winnerIdx + 1} WINS!`, W / 2, H * 0.32);
  ctx.font = '28px "VT323", monospace';
  ctx.fillStyle = '#6d4d3f';
  ctx.fillText(`Final Score: ${score[0]} - ${score[1]}`, W / 2, H * 0.45);
  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#7a5e4f';
  ctx.fillText(`P1 final relic: ${players[0]?.weapon?.name || 'Wish Twig'}`, W / 2, H * 0.58);
  ctx.fillText(`P2 final relic: ${players[1]?.weapon?.name || 'Wish Twig'}`, W / 2, H * 0.63);
  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(114, 77, 109, ${0.45 + pulse * 0.55})`;
  ctx.font = '24px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO PLAY AGAIN ]', W / 2, H * 0.88);
}

function renderCountdown() {
  render();
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.fillRect(0, 0, W, H);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '80px "VT323", monospace';
  ctx.fillStyle = '#7d5075';
  ctx.fillText(countdownVal <= 0 ? 'DUEL!' : String(countdownVal), W / 2, H / 2);
}

const compilerOverlay = document.getElementById('compiler-overlay');
const compileInput = document.getElementById('compile-input');
const compileOutput = document.getElementById('compile-output');
const compileTimerEl = document.getElementById('compile-timer');
const compilePlayerLabel = document.getElementById('compile-player-label');
const compileModsDisplay = document.getElementById('compile-mods-display');
let compileInterval = null;

function startCompilerPhase(loserIdx) {
  compileLoser = loserIdx;
  compileTimer = COMPILE_TIME;
  compileSubmitted = false;
  compileResult = null;

  compilePlayerLabel.textContent = `PLAYER ${loserIdx + 1}`;
  compilePlayerLabel.style.color = players[loserIdx].robeColor;
  compileInput.value = '';
  compileInput.disabled = false;
  compileOutput.classList.add('hidden');
  compileOutput.innerHTML = '';
  compileTimerEl.textContent = String(COMPILE_TIME);
  compileModsDisplay.innerHTML = `<span style="color:#7e5e4f">Current relic:</span> <span class="existing-mod-tag">${players[loserIdx].weapon.name}</span>`;

  compilerOverlay.classList.remove('hidden');
  gameState = 'compiler';
  if (compileInterval) clearInterval(compileInterval);
  compileInterval = setInterval(compileTimerTick, 1000);
  setTimeout(() => compileInput.focus(), 100);
}
function compileTimerTick() {
  if (gameState !== 'compiler' || compileSubmitted) return;
  compileTimer--;
  compileTimerEl.textContent = String(Math.max(0, compileTimer));
  if (compileTimer <= 0) submitCompile();
}
function submitCompile() {
  if (compileSubmitted) return;
  compileSubmitted = true;
  const request = compileInput.value.trim() || 'surprise me with a whimsical magical relic';
  compileInput.disabled = true;
  compileOutput.classList.remove('hidden');
  compileOutput.innerHTML = `
    <div style="color:#7e5e4f">THE WISH FORGE HUMS: "${request.slice(0, 80)}${request.length > 80 ? '...' : ''}"</div>
    <div class="compiling-bar"><div class="compiling-bar-fill"></div></div>
  `;
  fetch('/.netlify/functions/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request, existingMods: [players[compileLoser].weapon], round: roundNum }),
  })
    .then(r => r.json())
    .then(data => {
      if (data._debug) console.warn('[Wish Forge] Debug:', data._debug);
      compileResult = normalizeWeapon(data.mod || DEFAULT_WEAPON);
      showCompileResult(compileResult);
    })
    .catch(err => {
      console.error('[Wish Forge] Error:', err);
      compileResult = DEFAULT_WEAPON;
      showCompileResult(compileResult);
    });
}
function showCompileResult(weapon) {
  compileOutput.innerHTML = `
    <div class="compile-mod-name">✨ ${weapon.name}</div>
    <div class="compile-mod-quip">"${weapon.quip}"</div>
    <div class="compile-mod-tradeoff">Tradeoff: ${weapon.tradeoff}</div>
    <div style="color:#7f6a5b; margin-top:8px; font-size:12px">Press SPACE to accept your wish and begin the next round</div>
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
  }
  compilerOverlay.classList.add('hidden');
  compileInput.disabled = false;
  if (compileInterval) { clearInterval(compileInterval); compileInterval = null; }
  startRound();
}

compileInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitCompile();
  }
  e.stopPropagation();
});
compileInput.addEventListener('keyup', e => e.stopPropagation());

function startGame() {
  score = [0, 0];
  roundNum = 0;
  playerWeapons = [DEFAULT_WEAPON, DEFAULT_WEAPON];
  players = [createPlayer(0), createPlayer(1)];
  initFireflies();
  initEnvironmentLife();
  renderBackground();
  startRound();
}
function startRound() {
  roundNum++;
  bullets = [];
  particles = [];
  hazardFields = [];
  muzzleFlashes = [];
  shakeAmount = 0;
  slowMo = 0;
  players[0] = createPlayer(0);
  players[1] = createPlayer(1);
  countdownVal = 3;
  countdownTimer = 0;
  gameState = 'countdown';
}
function advanceFromRoundOver() {
  if (roundNum >= ROUNDS_PER_GAME) {
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
  score[roundWinner]++;
  gameState = 'round_over_display';
}

function gameLoop(timestamp) {
  const rawDt = lastTime ? (timestamp - lastTime) / 16.67 : 1;
  lastTime = timestamp;
  const dt = slowMo > 0 ? rawDt * 0.3 : Math.min(rawDt, 3);
  if (slowMo > 0) slowMo -= rawDt;

  switch (gameState) {
    case 'title':
      renderTitle();
      break;
    case 'countdown':
      countdownTimer += rawDt;
      if (countdownTimer > 50) { countdownTimer = 0; countdownVal--; }
      if (countdownVal < 0) gameState = 'playing';
      updateEnvironmentLife(rawDt);
      updateFireflies();
      render();
      if (gameState === 'countdown') renderCountdown();
      break;
    case 'playing':
      updatePlayers(dt);
      updateBullets(dt);
      updateParticles(dt);
      updateHazardFields(dt);
      updateMuzzleFlashes(dt);
      updateEnvironmentLife(dt);
      updateFireflies();
      checkRoundEnd();
      render();
      break;
    case 'round_over_display':
      updateParticles(rawDt);
      updateHazardFields(rawDt);
      updateEnvironmentLife(rawDt);
      updateFireflies();
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
initFireflies();
initEnvironmentLife();
renderBackground();

gameState = 'title';
requestAnimationFrame(gameLoop);
