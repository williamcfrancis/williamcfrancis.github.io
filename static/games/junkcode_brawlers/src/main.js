// ============================================================
//  JUNKCODE BRAWLERS — Game Engine
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
    if (b.trail.length > 8) b.trail.shift();

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
        bullets.splice(i, 1);
        if (p.hp <= 0) {
          p.hp = 0;
          p.alive = false;
          playSound('death');
          spawnParticles(p.x, p.y - ph/2, 30, p.accentColor, 6, 50);
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

  c.fillStyle = '#12121e';
  c.fillRect(0, 0, W, H);

  for (let i = 0; i < 60; i++) {
    c.fillStyle = `rgba(${30 + Math.random()*20}, ${25 + Math.random()*15}, ${35 + Math.random()*20}, 0.5)`;
    c.fillRect(Math.random()*W, Math.random()*H, 2 + Math.random()*6, 2 + Math.random()*6);
  }

  c.strokeStyle = '#1a1a28';
  c.lineWidth = 1;
  for (let x = 0; x < W; x += 48) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = 0; y < H; y += 48) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }

  const grd = c.createRadialGradient(W/2, H + 80, 50, W/2, H + 80, 500);
  grd.addColorStop(0, 'rgba(255, 120, 30, 0.08)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  c.fillStyle = grd;
  c.fillRect(0, 0, W, H);

  for (const plat of PLATFORMS) {
    c.fillStyle = '#2a2a3a';
    c.fillRect(plat.x, plat.y, plat.w, plat.h);
    c.fillStyle = '#3d3d50';
    c.fillRect(plat.x, plat.y, plat.w, 3);
    c.fillStyle = '#1a1a24';
    c.fillRect(plat.x, plat.y + plat.h - 2, plat.w, 2);
    for (let rx = plat.x + 12; rx < plat.x + plat.w - 6; rx += 24) {
      c.fillStyle = '#353548';
      c.fillRect(rx, plat.y + 5, 4, 4);
    }
  }

  const hsx = 5, hsh = 12;
  for (let sx = 0; sx < W; sx += hsx * 2) {
    c.fillStyle = (Math.floor(sx / (hsx*2)) % 2 === 0) ? '#c8a820' : '#222';
    c.fillRect(sx, H - hsh, hsx * 2, hsh);
  }
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

  for (const b of bullets) {
    ctx.globalAlpha = 0.3;
    for (let t = 0; t < b.trail.length; t++) {
      const pt = b.trail[t];
      const frac = t / b.trail.length;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, b.r * frac * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = b.color;
    ctx.shadowColor = b.color;
    ctx.shadowBlur = b.r * 3;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  for (const p of players) {
    if (!p.alive) continue;
    const ps = p.stats.playerSize;
    const pw = PW * ps, ph = PH * ps;
    const bx = p.x - pw/2, by = p.y - ph;
    const headH = ph * 0.45;
    const bodyH = ph * 0.55;

    if (p.damageTaken > 0) {
      ctx.globalAlpha = (Math.floor(p.damageTaken) % 4 < 2) ? 0.5 : 1;
      p.damageTaken -= 0.5;
    }

    ctx.fillStyle = '#2a2a32';
    ctx.fillRect(bx + 2, by + headH, pw - 4, bodyH);
    ctx.fillStyle = '#3a3a44';
    ctx.fillRect(bx + 4, by + headH + 2, pw - 8, bodyH - 4);

    const gunLen = 10 * ps;
    const gunY = by + headH + bodyH * 0.3;
    const gunX = p.facing === 1 ? bx + pw : bx;
    ctx.fillStyle = '#555';
    ctx.fillRect(
      p.facing === 1 ? gunX - 2 : gunX - gunLen + 2,
      gunY - 2 * ps,
      gunLen, 4 * ps
    );
    ctx.fillStyle = p.accentColor;
    const muzzleX = p.facing === 1 ? gunX + gunLen - 2 : gunX - gunLen + 2;
    ctx.fillRect(muzzleX - 1, gunY - 1 * ps, 2, 2 * ps);

    ctx.fillStyle = '#1a1a22';
    ctx.fillRect(bx, by, pw, headH);
    ctx.fillStyle = p.color;
    ctx.fillRect(bx + 2, by + 2, pw - 4, headH - 4);

    const screenColor = p.damageTaken > 5 ? '#ff4444' : p.eyeColor;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(bx + 4, by + 4, pw - 8, headH - 8);
    const eyeSize = 3 * ps;
    const eyeY = by + headH * 0.4;
    ctx.fillStyle = screenColor;
    ctx.fillRect(bx + pw * 0.25, eyeY, eyeSize, eyeSize);
    ctx.fillRect(bx + pw * 0.6, eyeY, eyeSize, eyeSize);

    ctx.globalAlpha = 1;

    const hpFrac = Math.max(0, p.hp / p.maxHp);
    const barW = 36, barH = 4;
    const barX = p.x - barW/2, barY = by - 10;
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = hpFrac > 0.5 ? '#22c55e' : hpFrac > 0.25 ? '#f5c842' : '#e94560';
    ctx.fillRect(barX, barY, barW * hpFrac, barH);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);
  }

  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
  }
  ctx.globalAlpha = 1;

  renderHud();
  ctx.restore();
}

function renderHud() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, W, 32);

  ctx.font = '18px "VT323", monospace';
  ctx.textBaseline = 'middle';

  const p1 = players[0], p2 = players[1];
  if (p1) {
    ctx.fillStyle = p1.color;
    ctx.textAlign = 'left';
    ctx.fillText(`P1  HP: ${Math.ceil(Math.max(0, p1.hp))}/${p1.maxHp}`, 10, 16);
    const modCount = p1.mods.length;
    if (modCount > 0) {
      ctx.fillStyle = '#886';
      ctx.fillText(`[${modCount} mod${modCount > 1 ? 's' : ''}]`, 180, 16);
    }
  }
  if (p2) {
    ctx.fillStyle = p2.color;
    ctx.textAlign = 'right';
    ctx.fillText(`HP: ${Math.ceil(Math.max(0, p2.hp))}/${p2.maxHp}  P2`, W - 10, 16);
    const modCount = p2.mods.length;
    if (modCount > 0) {
      ctx.fillStyle = '#886';
      ctx.fillText(`[${modCount} mod${modCount > 1 ? 's' : ''}]`, W - 180, 16);
    }
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5c842';
  ctx.font = '22px "VT323", monospace';
  ctx.fillText(`${score[0]}  -  ${score[1]}`, W/2, 16);

  ctx.fillStyle = '#444';
  ctx.font = '14px "VT323", monospace';
  ctx.fillText(`Round ${roundNum}`, W/2, 30);
}

// --- Title Screen ---
function renderTitle() {
  ctx.fillStyle = '#0e0e18';
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `rgba(255, 130, 40, ${0.03 + Math.random() * 0.04})`;
    ctx.fillRect(Math.random()*W, Math.random()*H, 1 + Math.random()*3, 1 + Math.random()*3);
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '56px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.shadowColor = '#f5c842';
  ctx.shadowBlur = 20;
  ctx.fillText('JUNKCODE BRAWLERS', W/2, H * 0.28);
  ctx.shadowBlur = 0;

  ctx.font = '20px "VT323", monospace';
  ctx.fillStyle = '#666';
  ctx.fillText('1v1 Arena Shooter — Code Your Own Weapons', W/2, H * 0.38);

  ctx.font = '18px "VT323", monospace';
  ctx.fillStyle = '#e8563a';
  ctx.fillText('PLAYER 1:  W/A/S/D to move  •  F to shoot', W/2, H * 0.52);
  ctx.fillStyle = '#3a8ae8';
  ctx.fillText('PLAYER 2:  Arrow Keys to move  •  / to shoot', W/2, H * 0.58);

  ctx.fillStyle = '#555';
  ctx.font = '16px "VT323", monospace';
  ctx.fillText('Lose a round → Open the Compiler → Type your weapon mod', W/2, H * 0.68);
  ctx.fillText('The AI builds it. Mods stack. Chaos ensues.', W/2, H * 0.73);

  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(245, 200, 66, ${0.5 + pulse * 0.5})`;
  ctx.font = '24px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO START ]', W/2, H * 0.86);
}

// --- Round Over Display ---
function renderRoundOverDisplay() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '42px "VT323", monospace';
  const winner = players[roundWinner];
  ctx.fillStyle = winner ? winner.color : '#fff';
  ctx.fillText(`PLAYER ${roundWinner + 1} WINS THE ROUND`, W/2, H * 0.4);

  ctx.font = '20px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.fillText(`Score: ${score[0]} - ${score[1]}   (First to ${WINS_NEEDED})`, W/2, H * 0.5);

  ctx.fillStyle = '#666';
  ctx.font = '18px "VT323", monospace';
  ctx.fillText('Press SPACE to continue', W/2, H * 0.62);
}

// --- Game Over ---
function renderGameOver() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const winnerIdx = score[0] >= WINS_NEEDED ? 0 : 1;
  ctx.font = '52px "VT323", monospace';
  ctx.fillStyle = players[winnerIdx]?.color || '#f5c842';
  ctx.shadowColor = players[winnerIdx]?.color || '#f5c842';
  ctx.shadowBlur = 20;
  ctx.fillText(`PLAYER ${winnerIdx + 1} WINS!`, W/2, H * 0.35);
  ctx.shadowBlur = 0;

  ctx.font = '28px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.fillText(`Final Score: ${score[0]} - ${score[1]}`, W/2, H * 0.48);

  for (let pi = 0; pi < 2; pi++) {
    const p = players[pi];
    if (!p || p.mods.length === 0) continue;
    const baseX = pi === 0 ? W * 0.25 : W * 0.75;
    ctx.fillStyle = p.color;
    ctx.font = '18px "VT323", monospace';
    ctx.fillText(`P${pi + 1} Mods:`, baseX, H * 0.58);
    ctx.fillStyle = '#888';
    ctx.font = '14px "VT323", monospace';
    p.mods.forEach((m, i) => {
      ctx.fillText(m.name, baseX, H * 0.63 + i * 16);
    });
  }

  const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.5;
  ctx.fillStyle = `rgba(245, 200, 66, ${0.5 + pulse * 0.5})`;
  ctx.font = '22px "VT323", monospace';
  ctx.fillText('[ PRESS SPACE TO PLAY AGAIN ]', W/2, H * 0.88);
}

// --- Countdown ---
function renderCountdown() {
  render();
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '72px "VT323", monospace';
  ctx.fillStyle = '#f5c842';
  ctx.shadowColor = '#f5c842';
  ctx.shadowBlur = 30;
  ctx.fillText(countdownVal <= 0 ? 'FIGHT!' : String(countdownVal), W/2, H/2);
  ctx.shadowBlur = 0;
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
    <div style="color:#555; margin-top:8px; font-size:12px">Press SPACE to start next round</div>
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
  renderBackground();
  startRound();
}

function startRound() {
  roundNum++;
  bullets = [];
  particles = [];
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

  switch (gameState) {
    case 'title':
      renderTitle();
      break;

    case 'countdown':
      countdownTimer += rawDt;
      if (countdownTimer > 50) { countdownTimer = 0; countdownVal--; }
      if (countdownVal < 0) { gameState = 'playing'; }
      render();
      if (gameState === 'countdown') renderCountdown();
      break;

    case 'playing':
      updatePlayers(dt);
      updateBullets(dt);
      updateParticles(dt);
      checkRoundEnd();
      render();
      break;

    case 'round_over_display':
      updateParticles(rawDt);
      renderRoundOverDisplay();
      break;

    case 'compiler':
      render();
      break;

    case 'game_over':
      updateParticles(rawDt);
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
gameState = 'title';
requestAnimationFrame(gameLoop);
