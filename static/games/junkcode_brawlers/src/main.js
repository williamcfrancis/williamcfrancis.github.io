// ============================================================
//  IF IT COMPILES, IT KILLS — Game Engine
// ============================================================

const W = 960, H = 540;
const GRAVITY = 0.42;
const PLAYER_SPEED = 3.2;
const JUMP_FORCE = -9.5;
const BULLET_SPEED = 7;
const FIRE_COOLDOWN = 22;
const PW = 26, PH = 36;
const BULLET_R = 4;
const MAX_HP = 100;
const COMPILE_TIME = 20;
const WINS_NEEDED = 3;
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

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;

// --- State ---
let gameState = 'title';
let players = [];
let bullets = [];
let particles = [];
let ambientParticles = [];
let muzzleFlashes = [];
let score = [0, 0];
let roundNum = 0;
let countdownVal = 0;
let countdownTimer = 0;
let compileLoser = -1;
let compileTimer = 0;
let compileSubmitted = false;
let compileResult = null;
let roundOverTimer = 0;
let roundWinner = -1;
let gameOverTimer = 0;
let shakeAmount = 0;
let slowMo = 0;
let lastTime = 0;
let bgCanvas = null;
let frameCount = 0;

// --- Input ---
const keys = {};
const GAME_KEYS = new Set([
  'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
  ' ', 'f', '/', 'w', 'a', 's', 'd',
]);
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

// --- Audio (Web Audio API) ---
let audioCtx;
function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playSound(type) {
  ensureAudio();
  const t = audioCtx.currentTime;
  const g = audioCtx.createGain();
  g.connect(audioCtx.destination);
  if (type === 'shoot') {
    const o = audioCtx.createOscillator();
    o.type = 'square';
    o.frequency.setValueAtTime(600, t);
    o.frequency.exponentialRampToValueAtTime(200, t + 0.08);
    g.gain.setValueAtTime(0.12, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g); o.start(t); o.stop(t + 0.1);
  } else if (type === 'hit') {
    const o = audioCtx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(50, t + 0.15);
    g.gain.setValueAtTime(0.2, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    o.connect(g); o.start(t); o.stop(t + 0.15);
  } else if (type === 'bounce') {
    const o = audioCtx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(1200, t);
    o.frequency.exponentialRampToValueAtTime(400, t + 0.06);
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    o.connect(g); o.start(t); o.stop(t + 0.08);
  } else if (type === 'death') {
    const o = audioCtx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(30, t + 0.6);
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    o.connect(g); o.start(t); o.stop(t + 0.6);
  } else if (type === 'jump') {
    const o = audioCtx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(300, t);
    o.frequency.exponentialRampToValueAtTime(600, t + 0.1);
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    o.connect(g); o.start(t); o.stop(t + 0.12);
  }
}

// --- Particle system ---
function spawnParticles(x, y, count, color, speed, life) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.4 + Math.random() * 0.6);
    particles.push({
      x, y,
      vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.5,
      life: life * (0.5 + Math.random() * 0.5), maxLife: life,
      color, size: 1.5 + Math.random() * 3,
    });
  }
}
function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt; p.y += p.vy * dt;
    p.vy += 0.15 * dt;
    p.life -= dt;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

// --- Ambient particles ---
function initAmbientParticles() {
  ambientParticles = [];
  for (let i = 0; i < 35; i++) {
    ambientParticles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.2,
      size: 0.5 + Math.random() * 1.5,
      alpha: 0.1 + Math.random() * 0.25,
      color: Math.random() < 0.5 ? '#6688cc' : '#8866cc',
    });
  }
}
function updateAmbientParticles() {
  for (const p of ambientParticles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    if (p.x < -5) p.x = W + 5;
    if (p.x > W + 5) p.x = -5;
  }
}
function renderAmbientParticles() {
  for (const p of ambientParticles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }
  ctx.globalAlpha = 1;
}

// --- Muzzle flashes ---
function spawnMuzzleFlash(x, y, color) {
  muzzleFlashes.push({ x, y, color, life: 6, maxLife: 6 });
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
    const r = 6 + (1 - alpha) * 10;
    ctx.globalAlpha = alpha * 0.6;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(f.x, f.y, r * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = alpha * 0.3;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// --- Modifier system ---
function baseStats() {
  return {
    bulletSize: 1, bulletSpeed: 1, bulletDamage: 1, bulletCount: 1,
    bulletSpread: 0, bulletBounces: 0, bulletHoming: 0,
    fireRate: 1, moveSpeed: 1, jumpPower: 1, playerGravity: 1,
    playerSize: 1, onBounceSplit: 0, knockbackPower: 1,
    hpBonus: 0, regen: 0,
  };
}
function computeStats(mods) {
  const s = baseStats();
  for (const m of mods) {
    s.bulletSize *= m.bullet_size ?? 1;
    s.bulletSpeed *= m.bullet_speed ?? 1;
    s.bulletDamage *= m.bullet_damage ?? 1;
    s.bulletCount += (Math.round(m.bullet_count ?? 1)) - 1;
    s.bulletSpread = Math.max(s.bulletSpread, m.bullet_spread ?? 0);
    s.bulletBounces += Math.round(m.bullet_bounces ?? 0);
    s.bulletHoming = Math.max(s.bulletHoming, m.bullet_homing ?? 0);
    s.fireRate *= m.fire_rate ?? 1;
    s.moveSpeed *= m.move_speed ?? 1;
    s.jumpPower *= m.jump_power ?? 1;
    s.playerGravity *= m.player_gravity ?? 1;
    s.playerSize *= m.player_size ?? 1;
    s.onBounceSplit += Math.round(m.on_bounce_split ?? 0);
    s.knockbackPower *= m.knockback_power ?? 1;
    s.hpBonus += Math.round(m.hp_bonus ?? 0);
    s.regen += m.regen ?? 0;
  }
  s.bulletSize = clamp(s.bulletSize, 0.15, 10);
  s.bulletSpeed = clamp(s.bulletSpeed, 0.1, 6);
  s.bulletDamage = clamp(s.bulletDamage, 0.1, 8);
  s.bulletCount = clamp(s.bulletCount, 1, 12);
  s.bulletBounces = clamp(s.bulletBounces, 0, 12);
  s.bulletHoming = clamp(s.bulletHoming, 0, 0.8);
  s.fireRate = clamp(s.fireRate, 0.1, 6);
  s.moveSpeed = clamp(s.moveSpeed, 0.15, 4);
  s.jumpPower = clamp(s.jumpPower, 0.15, 4);
  s.playerGravity = clamp(s.playerGravity, 0.15, 4);
  s.playerSize = clamp(s.playerSize, 0.3, 3);
  s.onBounceSplit = clamp(s.onBounceSplit, 0, 8);
  s.knockbackPower = clamp(s.knockbackPower, 0.2, 8);
  s.hpBonus = clamp(s.hpBonus, -60, 100);
  s.regen = clamp(s.regen, 0, 8);
  return s;
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

// --- Player creation ---
function createPlayer(idx) {
  const sp = SPAWNS[idx];
  const stats = computeStats(players[idx]?.mods || []);
  const maxHp = MAX_HP + stats.hpBonus;
  return {
    idx,
    x: sp.x, y: sp.y,
    vx: 0, vy: 0,
    facing: idx === 0 ? 1 : -1,
    grounded: false,
    hp: maxHp, maxHp,
    fireCd: 0,
    mods: players[idx]?.mods || [],
    stats,
    alive: true,
    damageTaken: 0,
    color: idx === 0 ? '#e8563a' : '#3a8ae8',
    accentColor: idx === 0 ? '#ff8844' : '#44aaff',
    eyeColor: idx === 0 ? '#ffcc44' : '#44eeff',
  };
}

// --- Player update ---
function updatePlayers(dt) {
  for (const p of players) {
    if (!p.alive) continue;
    const s = p.stats;
    const spd = PLAYER_SPEED * s.moveSpeed;
    const grav = GRAVITY * s.playerGravity;

    let moveDir = 0;
    if (p.idx === 0) {
      if (keys['a']) moveDir = -1;
      if (keys['d']) moveDir = 1;
    } else {
      if (keys['arrowleft']) moveDir = -1;
      if (keys['arrowright']) moveDir = 1;
    }

    if (moveDir !== 0) {
      p.vx = moveDir * spd;
      p.facing = moveDir;
    } else {
      p.vx *= 0.7;
    }

    let jumpKey = p.idx === 0 ? (keys['w']) : (keys['arrowup']);
    if (jumpKey && p.grounded) {
      p.vy = JUMP_FORCE * s.jumpPower;
      p.grounded = false;
      playSound('jump');
      spawnParticles(p.x, p.y, 4, '#aaa', 2, 12);
    }

    p.vy += grav * dt;
    if (p.vy > 14) p.vy = 14;

    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const pw = PW * s.playerSize;
    const ph = PH * s.playerSize;
    p.grounded = false;

    for (const plat of PLATFORMS) {
      if (rectOverlap(p.x - pw/2, p.y - ph, pw, ph, plat.x, plat.y, plat.w, plat.h)) {
        if (p.vy >= 0 && p.y - ph/2 < plat.y) {
          p.y = plat.y;
          p.vy = 0;
          p.grounded = true;
        }
      }
    }

    for (const wall of WALLS) {
      if (p.x - pw/2 < wall.x + wall.w && p.x + pw/2 > wall.x) {
        if (p.x < W/2) p.x = wall.x + wall.w + pw/2;
        else p.x = wall.x - pw/2;
        p.vx = 0;
      }
    }

    if (p.fireCd > 0) p.fireCd -= dt;
    let shootKey = p.idx === 0 ? keys['f'] : (keys['/'] || keys['Slash']);
    if (shootKey && p.fireCd <= 0 && p.alive) {
      fireBullets(p);
      p.fireCd = FIRE_COOLDOWN / s.fireRate;
    }

    if (s.regen > 0 && p.hp < p.maxHp) {
      p.hp = Math.min(p.maxHp, p.hp + s.regen / 60 * dt);
    }

    if (!p.grounded && Math.random() < 0.3) {
      spawnParticles(p.x, p.y + 2, 1, p.accentColor, 1, 8);
    }

    if (p.y > KILL_Y) {
      p.alive = false;
      playSound('death');
      spawnParticles(p.x, H, 20, p.accentColor, 5, 40);
    }
  }
}

function fireBullets(p) {
  const s = p.stats;
  const count = s.bulletCount;
  const totalSpread = s.bulletSpread;
  const baseAngle = p.facing === 1 ? 0 : Math.PI;
  playSound('shoot');

  const muzzleX = p.x + p.facing * (PW * s.playerSize / 2 + 12 * s.playerSize);
  const muzzleY = p.y - PH * s.playerSize * 0.55;
  spawnMuzzleFlash(muzzleX, muzzleY, p.accentColor);

  for (let i = 0; i < count; i++) {
    let angle = baseAngle;
    if (count > 1) {
      const frac = (i / (count - 1)) - 0.5;
      angle += (frac * totalSpread * Math.PI / 180);
    }
    const speed = BULLET_SPEED * s.bulletSpeed;
    const r = BULLET_R * s.bulletSize;
    bullets.push({
      x: p.x + p.facing * (PW * s.playerSize / 2 + r),
      y: p.y - PH * s.playerSize * 0.55,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      owner: p.idx,
      r,
      damage: 10 * s.bulletDamage,
      bouncesLeft: s.bulletBounces,
      homing: s.bulletHoming,
      onBounceSplit: s.onBounceSplit,
      knockback: s.knockbackPower,
      life: 300,
      color: p.accentColor,
      trail: [],
    });
  }
}

// --- Bullet update ---
function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.life -= dt;
    if (b.life <= 0) { bullets.splice(i, 1); continue; }

    if (b.homing > 0) {
      const target = players[1 - b.owner];
      if (target && target.alive) {
        const tx = target.x - b.x;
        const ty = (target.y - PH * target.stats.playerSize / 2) - b.y;
        const desired = Math.atan2(ty, tx);
        const current = Math.atan2(b.vy, b.vx);
        let diff = desired - current;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        const turn = clamp(diff, -b.homing, b.homing);
        const newAngle = current + turn;
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        b.vx = Math.cos(newAngle) * spd;
        b.vy = Math.sin(newAngle) * spd;
      }
    }

    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 10) b.trail.shift();

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    let bounced = false;
    for (const wall of WALLS) {
      if (b.x - b.r < wall.x + wall.w && b.x + b.r > wall.x && b.y > wall.y && b.y < wall.y + wall.h) {
        if (b.bouncesLeft > 0) {
          b.vx *= -1;
          b.x = b.x < W/2 ? wall.x + wall.w + b.r : wall.x - b.r;
          b.bouncesLeft--;
          bounced = true;
          playSound('bounce');
          spawnParticles(b.x, b.y, 3, '#ffaa44', 3, 15);
        } else {
          bullets.splice(i, 1); continue;
        }
      }
    }
    for (const plat of PLATFORMS) {
      if (b.x + b.r > plat.x && b.x - b.r < plat.x + plat.w &&
          b.y + b.r > plat.y && b.y - b.r < plat.y + plat.h) {
        if (b.bouncesLeft > 0) {
          const fromTop = b.y < plat.y + plat.h / 2;
          b.vy *= -1;
          b.y = fromTop ? plat.y - b.r : plat.y + plat.h + b.r;
          b.bouncesLeft--;
          bounced = true;
          playSound('bounce');
          spawnParticles(b.x, b.y, 3, '#ffaa44', 2, 15);
        } else {
          spawnParticles(b.x, b.y, 4, b.color, 2, 10);
          bullets.splice(i, 1); continue;
        }
      }
    }

    if (bounced && b.onBounceSplit > 0) {
      for (let s = 0; s < b.onBounceSplit; s++) {
        const angle = Math.atan2(b.vy, b.vx) + (Math.random() - 0.5) * 1.5;
        const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy) * 0.7;
        bullets.push({
          x: b.x, y: b.y,
          vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd,
          owner: b.owner, r: b.r * 0.5,
          damage: b.damage * 0.4, bouncesLeft: 0, homing: b.homing * 0.5,
          onBounceSplit: 0, knockback: b.knockback * 0.5,
          life: 120, color: b.color, trail: [],
        });
      }
    }

    if (b.y < -50 || b.y > H + 50) { bullets.splice(i, 1); continue; }

    for (const p of players) {
      if (p.idx === b.owner || !p.alive) continue;
      const ps = p.stats.playerSize;
      const pw = PW * ps, ph = PH * ps;
      if (b.x + b.r > p.x - pw/2 && b.x - b.r < p.x + pw/2 &&
          b.y + b.r > p.y - ph && b.y - b.r < p.y) {
        p.hp -= b.damage;
        p.damageTaken = 10;
        const kb = b.knockback * 4;
        p.vx += (b.vx > 0 ? kb : -kb);
        p.vy -= kb * 0.4;
        playSound('hit');
        shakeAmount = Math.max(shakeAmount, b.damage * 0.4);
        spawnParticles(b.x, b.y, 8, b.color, 4, 20);
        spawnParticles(b.x, b.y, 4, '#fff', 3, 10);
        bullets.splice(i, 1);
        if (p.hp <= 0) {
          p.hp = 0;
          p.alive = false;
          playSound('death');
          spawnParticles(p.x, p.y - ph/2, 30, p.accentColor, 6, 50);
          spawnParticles(p.x, p.y - ph/2, 15, '#fff', 4, 30);
          slowMo = 40;
        }
        break;
      }
    }
  }
}

function rectOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

// --- Background pre-render ---
function renderBackground() {
  bgCanvas = document.createElement('canvas');
  bgCanvas.width = W; bgCanvas.height = H;
  const c = bgCanvas.getContext('2d');

  const bgGrad = c.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, '#08081a');
  bgGrad.addColorStop(0.5, '#0d0d22');
  bgGrad.addColorStop(1, '#12101e');
  c.fillStyle = bgGrad;
  c.fillRect(0, 0, W, H);

  const neb1 = c.createRadialGradient(W * 0.2, H * 0.3, 20, W * 0.2, H * 0.3, 280);
  neb1.addColorStop(0, 'rgba(80, 40, 120, 0.12)');
  neb1.addColorStop(0.5, 'rgba(60, 30, 100, 0.06)');
  neb1.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = neb1;
  c.fillRect(0, 0, W, H);

  const neb2 = c.createRadialGradient(W * 0.8, H * 0.6, 20, W * 0.8, H * 0.6, 250);
  neb2.addColorStop(0, 'rgba(30, 60, 120, 0.10)');
  neb2.addColorStop(0.5, 'rgba(20, 40, 90, 0.05)');
  neb2.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = neb2;
  c.fillRect(0, 0, W, H);

  for (let i = 0; i < 120; i++) {
    const brightness = Math.random();
    const size = brightness > 0.85 ? 2 : 1;
    const alpha = 0.2 + brightness * 0.6;
    c.fillStyle = `rgba(${180 + Math.random() * 75}, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, ${alpha})`;
    c.fillRect(Math.floor(Math.random() * W), Math.floor(Math.random() * H), size, size);
  }

  c.strokeStyle = 'rgba(30, 35, 60, 0.25)';
  c.lineWidth = 1;
  for (let x = 0; x < W; x += 48) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = 0; y < H; y += 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
  c.fillStyle = 'rgba(50, 60, 100, 0.15)';
  for (let x = 0; x < W; x += 48) {
    for (let y = 0; y < H; y += 48) {
      c.fillRect(x - 1, y - 1, 2, 2);
    }
  }

  for (const plat of PLATFORMS) {
    c.fillStyle = '#1e1e2e';
    c.fillRect(plat.x, plat.y, plat.w, plat.h);

    const platGrad = c.createLinearGradient(plat.x, plat.y, plat.x, plat.y + plat.h);
    platGrad.addColorStop(0, 'rgba(60, 70, 100, 0.4)');
    platGrad.addColorStop(1, 'rgba(20, 20, 35, 0.4)');
    c.fillStyle = platGrad;
    c.fillRect(plat.x, plat.y, plat.w, plat.h);

    c.shadowColor = '#00ccaa';
    c.shadowBlur = 8;
    c.fillStyle = '#00ccaa';
    c.fillRect(plat.x, plat.y, plat.w, 2);
    c.shadowBlur = 0;

    c.fillStyle = 'rgba(0, 204, 170, 0.15)';
    c.fillRect(plat.x, plat.y + 2, plat.w, 3);

    c.fillStyle = '#111118';
    c.fillRect(plat.x, plat.y + plat.h - 2, plat.w, 2);

    for (let rx = plat.x + 16; rx < plat.x + plat.w - 8; rx += 32) {
      c.fillStyle = 'rgba(0, 204, 170, 0.08)';
      c.fillRect(rx, plat.y + 5, 6, 3);
      c.fillRect(rx + 10, plat.y + 5, 3, 3);
    }

    c.fillStyle = 'rgba(0, 204, 170, 0.2)';
    c.fillRect(plat.x, plat.y, 2, plat.h);
    c.fillRect(plat.x + plat.w - 2, plat.y, 2, plat.h);
  }

  const floorGrad = c.createLinearGradient(0, H - 20, 0, H);
  floorGrad.addColorStop(0, 'rgba(0,0,0,0)');
  floorGrad.addColorStop(0.4, 'rgba(200, 50, 20, 0.08)');
  floorGrad.addColorStop(1, 'rgba(255, 80, 20, 0.25)');
  c.fillStyle = floorGrad;
  c.fillRect(0, H - 20, W, 20);

  c.fillStyle = '#cc3311';
  c.shadowColor = '#ff4400';
  c.shadowBlur = 6;
  c.fillRect(0, H - 2, W, 2);
  c.shadowBlur = 0;
}

// --- Draw a single player ---
function drawPlayer(p) {
  const ps = p.stats.playerSize;
  const pw = PW * ps, ph = PH * ps;
  const bx = p.x - pw / 2, by = p.y - ph;

  const headH = Math.floor(ph * 0.38);
  const torsoH = Math.floor(ph * 0.37);
  const legH = ph - headH - torsoH;

  if (p.damageTaken > 0) {
    ctx.globalAlpha = (Math.floor(p.damageTaken) % 4 < 2) ? 0.5 : 1;
    p.damageTaken -= 0.5;
  }

  ctx.fillStyle = p.color;
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.ellipse(p.x, p.y + 2, pw * 0.5, 2.5 * ps, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = p.damageTaken > 0 ? ((Math.floor(p.damageTaken) % 4 < 2) ? 0.5 : 1) : 1;

  const legW = Math.floor(pw * 0.28);
  const legGap = Math.floor(pw * 0.12);
  const legX1 = Math.floor(p.x - legW - legGap / 2);
  const legX2 = Math.floor(p.x + legGap / 2);
  const legY = by + headH + torsoH;

  ctx.fillStyle = '#1a1a26';
  ctx.fillRect(legX1, legY, legW, legH);
  ctx.fillRect(legX2, legY, legW, legH);
  ctx.fillStyle = '#2a2a38';
  ctx.fillRect(legX1 + 1, legY, legW - 2, 2 * ps);
  ctx.fillRect(legX2 + 1, legY, legW - 2, 2 * ps);
  ctx.fillStyle = p.color;
  ctx.fillRect(legX1 - 1, legY + legH - 3 * ps, legW + 2, 3 * ps);
  ctx.fillRect(legX2 - 1, legY + legH - 3 * ps, legW + 2, 3 * ps);

  if (!p.grounded) {
    const flicker = 0.4 + Math.random() * 0.4;
    ctx.globalAlpha = flicker;
    const flameH = (3 + Math.random() * 5) * ps;
    ctx.fillStyle = p.accentColor;
    ctx.fillRect(legX1 + legW * 0.15, legY + legH, legW * 0.7, flameH);
    ctx.fillRect(legX2 + legW * 0.15, legY + legH, legW * 0.7, flameH);
    ctx.fillStyle = '#ffe8cc';
    ctx.fillRect(legX1 + legW * 0.3, legY + legH, legW * 0.4, flameH * 0.4);
    ctx.fillRect(legX2 + legW * 0.3, legY + legH, legW * 0.4, flameH * 0.4);
    ctx.globalAlpha = p.damageTaken > 0 ? ((Math.floor(p.damageTaken) % 4 < 2) ? 0.5 : 1) : 1;
  }

  const torsoY = by + headH;
  ctx.fillStyle = '#1c1c28';
  ctx.fillRect(bx + 2, torsoY, pw - 4, torsoH);

  ctx.fillStyle = p.color;
  ctx.globalAlpha = Math.min(ctx.globalAlpha || 1, 0.6);
  ctx.fillRect(bx - 1, torsoY, pw + 2, 3 * ps);
  ctx.globalAlpha = p.damageTaken > 0 ? ((Math.floor(p.damageTaken) % 4 < 2) ? 0.5 : 1) : 1;

  ctx.fillStyle = p.accentColor;
  ctx.fillRect(bx + pw * 0.3, torsoY + torsoH * 0.4, pw * 0.4, 2);

  ctx.save();
  ctx.fillStyle = p.accentColor;
  ctx.shadowColor = p.accentColor;
  ctx.shadowBlur = 5 * ps;
  ctx.fillRect(bx + pw / 2 - 1.5 * ps, torsoY + torsoH * 0.55, 3 * ps, 3 * ps);
  ctx.restore();

  const gunArmY = torsoY + torsoH * 0.2;
  const gunLen = 12 * ps;
  const armLen = 5 * ps;
  const gunBarrelH = 4 * ps;
  if (p.facing === 1) {
    ctx.fillStyle = '#2e2e3c';
    ctx.fillRect(bx + pw, gunArmY, armLen, 3 * ps);
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(bx + pw + armLen - 1, gunArmY - 1, gunLen, gunBarrelH);
    ctx.fillStyle = '#505060';
    ctx.fillRect(bx + pw + armLen + gunLen - 3, gunArmY, 3, gunBarrelH - 2);
    ctx.fillStyle = p.accentColor;
    ctx.fillRect(bx + pw + armLen + gunLen - 1, gunArmY + gunBarrelH * 0.2, 2, gunBarrelH * 0.5);
  } else {
    ctx.fillStyle = '#2e2e3c';
    ctx.fillRect(bx - armLen, gunArmY, armLen, 3 * ps);
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(bx - armLen - gunLen + 1, gunArmY - 1, gunLen, gunBarrelH);
    ctx.fillStyle = '#505060';
    ctx.fillRect(bx - armLen - gunLen + 1, gunArmY, 3, gunBarrelH - 2);
    ctx.fillStyle = p.accentColor;
    ctx.fillRect(bx - armLen - gunLen, gunArmY + gunBarrelH * 0.2, 2, gunBarrelH * 0.5);
  }

  if (p.facing === 1) {
    ctx.fillStyle = '#2e2e3c';
    ctx.fillRect(bx - 3, gunArmY + 3 * ps, 3, 3 * ps);
  } else {
    ctx.fillStyle = '#2e2e3c';
    ctx.fillRect(bx + pw, gunArmY + 3 * ps, 3, 3 * ps);
  }

  ctx.fillStyle = '#111118';
  ctx.fillRect(bx, by, pw, headH);
  ctx.fillStyle = p.color;
  ctx.fillRect(bx + 2, by + 2, pw - 4, headH - 3);

  const visorPad = 3 * ps;
  ctx.fillStyle = '#060610';
  ctx.fillRect(bx + visorPad, by + visorPad, pw - visorPad * 2, headH - visorPad * 2 - 1);

  const screenColor = p.damageTaken > 5 ? '#ff4444' : p.eyeColor;
  const eyeSize = 3 * ps;
  const eyeY = by + headH * 0.35;
  ctx.save();
  ctx.fillStyle = screenColor;
  ctx.shadowColor = screenColor;
  ctx.shadowBlur = 5 * ps;
  ctx.fillRect(bx + pw * 0.2, eyeY, eyeSize, eyeSize);
  ctx.fillRect(bx + pw * 0.58, eyeY, eyeSize, eyeSize);
  ctx.restore();

  ctx.fillStyle = 'rgba(255,255,255,0.025)';
  for (let sy = by + visorPad; sy < by + headH - visorPad; sy += 2) {
    ctx.fillRect(bx + visorPad, sy, pw - visorPad * 2, 1);
  }

  const antennaH = 5 * ps;
  ctx.fillStyle = '#555';
  ctx.fillRect(p.x - 0.5, by - antennaH, 1.5, antennaH);
  ctx.save();
  ctx.fillStyle = p.accentColor;
  ctx.shadowColor = p.accentColor;
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(p.x + 0.25, by - antennaH - 1, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.globalAlpha = 1;

  const hpFrac = Math.max(0, p.hp / p.maxHp);
  const barW = 34 * Math.max(1, ps * 0.8);
  const barH = 4;
  const barX = p.x - barW / 2, barY = by - antennaH - 8;
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(barX - 1, barY - 1, barW + 2, barH + 2);
  const hpColor = hpFrac > 0.5 ? '#22c55e' : hpFrac > 0.25 ? '#eab308' : '#ef4444';
  ctx.save();
  ctx.fillStyle = hpColor;
  ctx.shadowColor = hpColor;
  ctx.shadowBlur = 3;
  ctx.fillRect(barX, barY, barW * hpFrac, barH);
  ctx.restore();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX - 1, barY - 1, barW + 2, barH + 2);
}

// --- Main render ---
function render() {
  ctx.save();
  const ox = (Math.random() - 0.5) * shakeAmount * 2;
  const oy = (Math.random() - 0.5) * shakeAmount * 2;
  shakeAmount *= 0.88;
  if (shakeAmount < 0.3) shakeAmount = 0;
  ctx.translate(ox, oy);

  ctx.drawImage(bgCanvas, 0, 0);

  const floorPulse = 0.6 + Math.sin(frameCount * 0.03) * 0.4;
  ctx.fillStyle = `rgba(255, 60, 20, ${0.03 * floorPulse})`;
  ctx.fillRect(0, H - 16, W, 16);

  renderAmbientParticles();

  renderMuzzleFlashes();

  for (const b of bullets) {
    ctx.globalAlpha = 0.15;
    for (let t = 0; t < b.trail.length; t++) {
      const pt = b.trail[t];
      const frac = (t + 1) / b.trail.length;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, b.r * frac * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.save();
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = b.r * 4;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  for (const p of players) {
    if (!p.alive) continue;
    drawPlayer(p);
  }

  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    const s = p.size * (0.5 + alpha * 0.5);
    ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
  }
  ctx.globalAlpha = 1;

  renderHud();
  ctx.restore();
}

function renderHud() {
  ctx.fillStyle = 'rgba(6, 6, 16, 0.65)';
  ctx.fillRect(0, 0, W, 34);
  ctx.fillStyle = 'rgba(0, 204, 170, 0.08)';
  ctx.fillRect(0, 33, W, 1);

  ctx.font = '18px "VT323", monospace';
  ctx.textBaseline = 'middle';

  const p1 = players[0], p2 = players[1];
  if (p1) {
    ctx.fillStyle = p1.color;
    ctx.textAlign = 'left';
    const hp1 = Math.ceil(Math.max(0, p1.hp));
    ctx.fillText(`P1  HP: ${hp1}/${p1.maxHp}`, 12, 17);
    if (p1.mods.length > 0) {
      ctx.fillStyle = '#776633';
      ctx.fillText(`[${p1.mods.length} mod${p1.mods.length > 1 ? 's' : ''}]`, 180, 17);
    }
  }
  if (p2) {
    ctx.fillStyle = p2.color;
    ctx.textAlign = 'right';
    const hp2 = Math.ceil(Math.max(0, p2.hp));
    ctx.fillText(`HP: ${hp2}/${p2.maxHp}  P2`, W - 12, 17);
    if (p2.mods.length > 0) {
      ctx.fillStyle = '#776633';
      ctx.fillText(`[${p2.mods.length} mod${p2.mods.length > 1 ? 's' : ''}]`, W - 180, 17);
    }
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5c842';
  ctx.font = '22px "VT323", monospace';
  ctx.fillText(`${score[0]}  —  ${score[1]}`, W / 2, 15);

  ctx.fillStyle = '#444';
  ctx.font = '13px "VT323", monospace';
  ctx.fillText(`ROUND ${roundNum}`, W / 2, 29);
}

// --- Title Screen ---
function renderTitle() {
  ctx.fillStyle = '#080816';
  ctx.fillRect(0, 0, W, H);

  const neb1 = ctx.createRadialGradient(W * 0.25, H * 0.35, 10, W * 0.25, H * 0.35, 220);
  neb1.addColorStop(0, 'rgba(100, 40, 140, 0.10)');
  neb1.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = neb1;
  ctx.fillRect(0, 0, W, H);
  const neb2 = ctx.createRadialGradient(W * 0.75, H * 0.65, 10, W * 0.75, H * 0.65, 200);
  neb2.addColorStop(0, 'rgba(30, 60, 140, 0.08)');
  neb2.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = neb2;
  ctx.fillRect(0, 0, W, H);

  const t = Date.now() * 0.001;
  for (let i = 0; i < 50; i++) {
    const sx = ((i * 137.508) % W);
    const sy = ((i * 97.31 + Math.sin(t + i) * 3) % H);
    const bright = 0.15 + (Math.sin(t * 0.5 + i * 0.7) * 0.5 + 0.5) * 0.5;
    ctx.fillStyle = `rgba(200, 210, 255, ${bright})`;
    ctx.fillRect(sx, sy, bright > 0.4 ? 2 : 1, bright > 0.4 ? 2 : 1);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.save();
  ctx.font = '52px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.shadowColor = '#f5c842';
  ctx.shadowBlur = 25;
  ctx.fillText('IF IT COMPILES, IT KILLS', W / 2, H * 0.24);
  ctx.shadowBlur = 0;
  ctx.restore();

  ctx.font = '16px "VT323", monospace';
  ctx.fillStyle = '#00ccaa';
  ctx.fillText('1v1 Arena  ·  Type Any Weapon  ·  The AI Builds It  ·  All Bets Are Off', W / 2, H * 0.33);

  ctx.font = '17px "VT323", monospace';
  ctx.fillStyle = '#e8563a';
  ctx.fillText('PLAYER 1:  W/A/S/D to move  ·  F to shoot', W / 2, H * 0.46);
  ctx.fillStyle = '#3a8ae8';
  ctx.fillText('PLAYER 2:  Arrow Keys to move  ·  / to shoot', W / 2, H * 0.52);

  ctx.fillStyle = '#555';
  ctx.font = '15px "VT323", monospace';
  ctx.fillText('Lose a round  →  The Compiler opens  →  Describe ANYTHING', W / 2, H * 0.64);
  ctx.fillStyle = '#444';
  ctx.font = '14px "VT323", monospace';
  ctx.fillText('Banana cannon? Homing bees? Gravity hammer? If you can type it, it\'s yours.', W / 2, H * 0.70);

  ctx.fillStyle = '#333';
  ctx.font = '13px "VT323", monospace';
  ctx.fillText('Mods stack. Each round gets wilder. First to 3 wins.', W / 2, H * 0.77);

  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(245, 200, 66, ${0.45 + pulse * 0.55})`;
  ctx.font = '24px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO START ]', W / 2, H * 0.89);
}

// --- Round Over Display ---
function renderRoundOverDisplay() {
  render();
  ctx.fillStyle = 'rgba(6, 6, 20, 0.65)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const winner = players[roundWinner];
  ctx.save();
  ctx.font = '44px "VT323", monospace';
  ctx.fillStyle = winner ? winner.color : '#fff';
  ctx.shadowColor = winner ? winner.color : '#fff';
  ctx.shadowBlur = 15;
  ctx.fillText(`PLAYER ${roundWinner + 1} WINS THE ROUND`, W / 2, H * 0.4);
  ctx.restore();

  ctx.font = '22px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.fillText(`Score: ${score[0]} — ${score[1]}   (First to ${WINS_NEEDED})`, W / 2, H * 0.52);

  ctx.fillStyle = '#555';
  ctx.font = '17px "VT323", monospace';
  ctx.fillText('Press SPACE to continue', W / 2, H * 0.64);
}

// --- Game Over ---
function renderGameOver() {
  render();
  ctx.fillStyle = 'rgba(6, 6, 20, 0.8)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const winnerIdx = score[0] >= WINS_NEEDED ? 0 : 1;
  const wColor = players[winnerIdx]?.color || '#f5c842';

  ctx.save();
  ctx.font = '54px "VT323", monospace';
  ctx.fillStyle = wColor;
  ctx.shadowColor = wColor;
  ctx.shadowBlur = 25;
  ctx.fillText(`PLAYER ${winnerIdx + 1} WINS!`, W / 2, H * 0.32);
  ctx.restore();

  ctx.font = '28px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.fillText(`Final Score: ${score[0]} — ${score[1]}`, W / 2, H * 0.45);

  for (let pi = 0; pi < 2; pi++) {
    const p = players[pi];
    if (!p || p.mods.length === 0) continue;
    const baseX = pi === 0 ? W * 0.25 : W * 0.75;
    ctx.fillStyle = p.color;
    ctx.font = '18px "VT323", monospace';
    ctx.fillText(`P${pi + 1} Mods:`, baseX, H * 0.56);
    ctx.fillStyle = '#777';
    ctx.font = '14px "VT323", monospace';
    p.mods.forEach((m, i) => {
      ctx.fillText(m.name, baseX, H * 0.61 + i * 16);
    });
  }

  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(245, 200, 66, ${0.45 + pulse * 0.55})`;
  ctx.font = '22px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO PLAY AGAIN ]', W / 2, H * 0.88);
}

// --- Countdown ---
function renderCountdown() {
  render();
  ctx.fillStyle = 'rgba(6, 6, 20, 0.45)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const text = countdownVal <= 0 ? 'FIGHT!' : String(countdownVal);
  const scale = countdownVal <= 0 ? 1.1 + Math.sin(countdownTimer * 0.3) * 0.15 : 1;
  const size = Math.floor((countdownVal <= 0 ? 80 : 72) * scale);

  ctx.save();
  ctx.font = `${size}px "VT323", monospace`;
  ctx.fillStyle = countdownVal <= 0 ? '#ff6644' : '#f5c842';
  ctx.shadowColor = countdownVal <= 0 ? '#ff6644' : '#f5c842';
  ctx.shadowBlur = 30;
  ctx.fillText(text, W / 2, H / 2);
  ctx.restore();
}

// --- Compiler Phase ---
const compilerOverlay = document.getElementById('compiler-overlay');
const compileInput = document.getElementById('compile-input');
const compileOutput = document.getElementById('compile-output');
const compileTimerEl = document.getElementById('compile-timer');
const compilePlayerLabel = document.getElementById('compile-player-label');
const compileModsDisplay = document.getElementById('compile-mods-display');

function startCompilerPhase(loserIdx) {
  compileLoser = loserIdx;
  compileTimer = COMPILE_TIME;
  compileSubmitted = false;
  compileResult = null;

  compilePlayerLabel.textContent = `PLAYER ${loserIdx + 1}`;
  compilePlayerLabel.style.color = players[loserIdx].color;
  compileInput.value = '';
  compileOutput.classList.add('hidden');
  compileOutput.innerHTML = '';
  compileTimerEl.textContent = String(COMPILE_TIME);

  const existingMods = players[loserIdx].mods;
  if (existingMods.length > 0) {
    compileModsDisplay.innerHTML = '<span style="color:#555">Active mods: </span>' +
      existingMods.map(m => `<span class="existing-mod-tag">${m.name}</span>`).join('');
  } else {
    compileModsDisplay.innerHTML = '';
  }

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
let compileInterval = null;

function submitCompile() {
  if (compileSubmitted) return;
  compileSubmitted = true;
  const request = compileInput.value.trim() || 'give me something random and chaotic';
  compileInput.disabled = true;

  compileOutput.classList.remove('hidden');
  compileOutput.innerHTML = `
    <div style="color:#888">COMPILING: "${request.slice(0, 80)}${request.length > 80 ? '...' : ''}"</div>
    <div class="compiling-bar"><div class="compiling-bar-fill"></div></div>
  `;

  const existingMods = players[compileLoser]?.mods || [];
  fetch('/.netlify/functions/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ request, existingMods, round: roundNum }),
  })
    .then(r => r.json())
    .then(data => {
      if (data._debug) console.warn('[Compile] Debug:', data._debug);
      compileResult = data.mod;
      showCompileResult(data.mod);
    })
    .catch(err => {
      console.error('[Compile] Error:', err);
      const fallbacks = [
        { name:"Junk Code", quip:"Syntax error on line... everything.", bullet_size:1.5, bullet_speed:0.8, bullet_damage:1.2, bullet_count:2, bullet_spread:20, bullet_bounces:1, bullet_homing:0, fire_rate:1.1, move_speed:0.9, jump_power:1.1, player_gravity:1, player_size:1.1, on_bounce_split:0, knockback_power:1.2, hp_bonus:0, regen:0, tradeoff:"Unpredictable aim" },
      ];
      compileResult = fallbacks[0];
      showCompileResult(compileResult);
    });
}

function showCompileResult(mod) {
  compileOutput.innerHTML = `
    <div class="compile-mod-name">✓ ${mod.name}</div>
    <div class="compile-mod-quip">"${mod.quip}"</div>
    <div class="compile-mod-tradeoff">⚠ Tradeoff: ${mod.tradeoff}</div>
    <div style="color:#555; margin-top:8px; font-size:12px">Press SPACE to deploy and start next round</div>
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
    players[compileLoser].mods.push(compileResult);
  }
  compilerOverlay.classList.add('hidden');
  compileInput.disabled = false;
  if (compileInterval) { clearInterval(compileInterval); compileInterval = null; }
  startRound();
}

compileInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); submitCompile(); }
  e.stopPropagation();
});
compileInput.addEventListener('keyup', e => e.stopPropagation());

// --- Round & Game Flow ---
function startGame() {
  score = [0, 0];
  roundNum = 0;
  players = [createPlayer(0), createPlayer(1)];
  players[0].mods = [];
  players[1].mods = [];
  initAmbientParticles();
  renderBackground();
  startRound();
}

function startRound() {
  roundNum++;
  bullets = [];
  particles = [];
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
  if (score[0] >= WINS_NEEDED || score[1] >= WINS_NEEDED) {
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
  if (!alive0 && !alive1) {
    roundWinner = Math.random() < 0.5 ? 0 : 1;
  } else {
    roundWinner = alive0 ? 0 : 1;
  }
  score[roundWinner]++;
  gameState = 'round_over_display';
}

// --- Main Loop ---
function gameLoop(timestamp) {
  const rawDt = lastTime ? (timestamp - lastTime) / 16.67 : 1;
  lastTime = timestamp;
  const dt = slowMo > 0 ? rawDt * 0.3 : Math.min(rawDt, 3);
  if (slowMo > 0) slowMo -= rawDt;
  frameCount++;

  switch (gameState) {
    case 'title':
      renderTitle();
      break;

    case 'countdown':
      countdownTimer += rawDt;
      if (countdownTimer > 50) { countdownTimer = 0; countdownVal--; }
      if (countdownVal < 0) { gameState = 'playing'; }
      updateAmbientParticles();
      render();
      if (gameState === 'countdown') renderCountdown();
      break;

    case 'playing':
      updatePlayers(dt);
      updateBullets(dt);
      updateParticles(dt);
      updateMuzzleFlashes(dt);
      updateAmbientParticles();
      checkRoundEnd();
      render();
      break;

    case 'round_over_display':
      updateParticles(rawDt);
      updateAmbientParticles();
      renderRoundOverDisplay();
      break;

    case 'compiler':
      updateAmbientParticles();
      render();
      break;

    case 'game_over':
      updateParticles(rawDt);
      updateAmbientParticles();
      renderGameOver();
      break;
  }

  requestAnimationFrame(gameLoop);
}

// --- Resize ---
function resize() {
  const scaleX = window.innerWidth / W;
  const scaleY = window.innerHeight / H;
  const scale = Math.min(scaleX, scaleY);
  canvas.style.width = (W * scale) + 'px';
  canvas.style.height = (H * scale) + 'px';
}
window.addEventListener('resize', resize);
resize();

// --- Start ---
initAmbientParticles();
gameState = 'title';
requestAnimationFrame(gameLoop);
