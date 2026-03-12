/* intro.js — Animated intro sequence for Wizard Duel
 *
 * Loaded BEFORE main.js. Only defines functions/data — never executes at
 * parse time. All references to globals (ctx, W, H, gameState) resolve at
 * call time once main.js has run.
 */

const INTRO_KEY = 'wizard_duel_intro_seen';

// ── Self-contained particle system ──────────────────────────────────────

let introParticles = [];

function _spawnIP(x, y, vx, vy, color, life, size, drag) {
  introParticles.push({ x, y, vx, vy, color, life, maxLife: life, size, drag: drag ?? 0.99 });
}

function _burstIP(x, y, count, color, speed, life, size) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = speed * (0.3 + Math.random() * 0.7);
    _spawnIP(
      x, y,
      Math.cos(a) * s, Math.sin(a) * s,
      color,
      life * (0.5 + Math.random() * 0.5),
      size * (0.5 + Math.random()),
    );
  }
}

function _updateIP(dt) {
  for (let i = introParticles.length - 1; i >= 0; i--) {
    const p = introParticles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= Math.pow(p.drag, dt);
    p.vy *= Math.pow(p.drag, dt);
    p.life -= dt;
    if (p.life <= 0) introParticles.splice(i, 1);
  }
}

function _renderIP() {
  for (const p of introParticles) {
    const a = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = a;
    ctx.save();
    ctx.shadowColor = p.color;
    ctx.shadowBlur = p.size * 3;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

// ── Starfield ───────────────────────────────────────────────────────────

let _introStars = [];

function _initStars() {
  _introStars = [];
  for (let i = 0; i < 150; i++) {
    _introStars.push({
      x: Math.random() * 960,
      y: Math.random() * 540,
      brightness: 0.2 + Math.random() * 0.8,
      sz: Math.random() < 0.2 ? 2 : 1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.03,
    });
  }
}

function _renderStars() {
  for (const s of _introStars) {
    s.phase += s.speed;
    const flicker = 0.6 + Math.sin(s.phase) * 0.4;
    ctx.globalAlpha = s.brightness * flicker;
    ctx.fillStyle = '#fff';
    ctx.fillRect(s.x, s.y, s.sz, s.sz);
  }
  ctx.globalAlpha = 1;
}

// ── Simplified wizard drawing ───────────────────────────────────────────

function _drawWizard(x, y, scale, facing, robe, trim) {
  const s = scale;
  const f = facing;

  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(0, 0, 12 * s, 3 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#5a4030';
  ctx.fillRect(-5 * s, -8 * s, 4 * s, 8 * s);
  ctx.fillRect(1 * s, -8 * s, 4 * s, 8 * s);

  ctx.fillStyle = robe;
  ctx.fillRect(-10 * s, -28 * s, 20 * s, 22 * s);

  ctx.fillStyle = trim;
  ctx.fillRect(-10 * s, -28 * s, 20 * s, 3 * s);
  ctx.fillRect(-10 * s, -8 * s, 20 * s, 2 * s);

  ctx.fillStyle = robe;
  ctx.fillRect(-7 * s, -38 * s, 14 * s, 12 * s);

  ctx.fillStyle = trim;
  ctx.beginPath();
  ctx.moveTo(-3 * s * f, -38 * s);
  ctx.lineTo(8 * s * f, -38 * s);
  ctx.lineTo(3 * s * f, -50 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f4d2b7';
  ctx.fillRect(-5 * s, -35 * s, 10 * s, 7 * s);

  ctx.fillStyle = '#3b2f3a';
  ctx.fillRect(-3 * s, -33 * s, 2 * s, 2 * s);
  ctx.fillRect(1 * s, -33 * s, 2 * s, 2 * s);

  ctx.restore();
}

// ── Goblin pixel sprite ─────────────────────────────────────────────────

const _GOBLIN_ROWS = [
  '..EE....EE..',
  '..GGGGGGGE..',
  '..GGGGGGGG..',
  '..GYYGGYGG..',
  '..GGGGGGGG..',
  '..GGMMMGGG..',
  '...GGGGGG...',
  '..RRRRRRRR..',
  '..RRRRRRRR..',
  '.RRRRRRRRRR.',
  '.RRRRRRRRRR.',
  '..RRRRRRRR..',
  '...RR..RR...',
  '...RR..RR...',
];

const _GOBLIN_PAL = { G: '#4a8c4a', Y: '#ffff00', M: '#2a4a2a', R: '#6b3fa0', E: '#3a7a3a' };

function _drawGoblin(x, y, px) {
  const rows = _GOBLIN_ROWS;
  const h = rows.length;
  const w = rows[0].length;
  const ox = x - (w * px) / 2;
  const oy = y - (h * px) / 2;
  for (let ry = 0; ry < h; ry++) {
    for (let rx = 0; rx < w; rx++) {
      const ch = rows[ry][rx];
      if (ch === '.') continue;
      ctx.fillStyle = _GOBLIN_PAL[ch] || '#fff';
      ctx.fillRect(ox + rx * px, oy + ry * px, px, px);
    }
  }
}

// ── Forge / anvil ───────────────────────────────────────────────────────

function _drawForge(x, y, s, glow) {
  ctx.save();
  ctx.shadowColor = '#ff6600';
  ctx.shadowBlur = 20 * glow;

  ctx.fillStyle = '#4a4a5a';
  ctx.fillRect(x - 20 * s, y, 40 * s, 12 * s);
  ctx.fillRect(x - 25 * s, y + 12 * s, 50 * s, 6 * s);

  ctx.fillStyle = '#6a6a7a';
  ctx.fillRect(x - 20 * s, y, 40 * s, 3 * s);

  ctx.globalAlpha = glow;
  ctx.fillStyle = '#ff8800';
  ctx.fillRect(x - 8 * s, y - 4 * s, 16 * s, 5 * s);
  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(x - 5 * s, y - 3 * s, 10 * s, 3 * s);
  ctx.globalAlpha = 1;

  ctx.restore();
}

// ── Sample weapons for Scene 4 ──────────────────────────────────────────

const _WEAPONS = [
  {
    name: 'rubber duck',
    rows: [
      '..AAA..',
      '.AABBA.',
      'AABCBA.',
      '.AABBA.',
      '..ADA..',
      '..AAA..',
      '..A.A..',
    ],
    pal: { A: '#FFD700', B: '#FFA500', C: '#333', D: '#FF6347' },
  },
  {
    name: 'cursed toaster',
    rows: [
      'AAAAAAA',
      'ABBBBBA',
      'ACCCCCA',
      'ACCCCCA',
      'ABBBBBA',
      'AAAAAAA',
      '.DD.DD.',
    ],
    pal: { A: '#888', B: '#AAA', C: '#FF4444', D: '#666' },
  },
  {
    name: 'sentient burrito',
    rows: [
      '..AAA..',
      '.AABBA.',
      'AACCBA.',
      'AADCBA.',
      '.AABBA.',
      '..AAA..',
      '.......',
    ],
    pal: { A: '#D2B48C', B: '#8B7355', C: '#228B22', D: '#FF6347' },
  },
];

function _drawWeapon(weapon, x, y, px) {
  const rows = weapon.rows;
  const grid = rows.length;
  const ox = x - (grid * px) / 2;
  const oy = y - (grid * px) / 2;
  for (let ry = 0; ry < grid; ry++) {
    for (let rx = 0; rx < grid; rx++) {
      const ch = rows[ry][rx];
      if (ch === '.') continue;
      ctx.fillStyle = weapon.pal[ch] || '#fff';
      ctx.fillRect(ox + rx * px, oy + ry * px, px, px);
    }
  }
}

// ── Cinematic text helper ───────────────────────────────────────────────

function _drawText(text, y, alpha, size, color) {
  if (alpha <= 0) return;
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = size + 'px "VT323", monospace';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(text, W / 2, y);
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(text, W / 2, y);
  ctx.restore();
  ctx.globalAlpha = 1;
}

// ── Gradient helper ─────────────────────────────────────────────────────

function _bg(top, mid, bot) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, top);
  g.addColorStop(0.5, mid);
  g.addColorStop(1, bot);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

// ── Platform helper ─────────────────────────────────────────────────────

function _drawPlatforms(platforms, alpha) {
  ctx.globalAlpha = alpha;
  for (const p of platforms) {
    ctx.save();
    ctx.shadowColor = '#00ffcc';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'rgba(20,20,40,0.85)';
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = '#00ffcc';
    ctx.fillRect(p.x, p.y, p.w, 2);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(p.x, p.y + p.h - 1, p.w, 1);
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

// ═════════════════════════════════════════════════════════════════════════
//  INTRO STATE
// ═════════════════════════════════════════════════════════════════════════

let _intro = null;

function _freshIntro() {
  return {
    sceneIdx: 0,
    sceneTimer: 0,
    globalTimer: 0,
    flashAlpha: 0,

    // Scene 1
    wizGlow: 0,
    arcT: 0,

    // Scene 2
    platAlpha: 0,
    wizY: [-100, -100],
    landed: false,
    shake: 0,

    // Scene 3
    gobAlpha: 0,
    forgeGlow: 0,
    vortex: 0,
    txtPhase: 0,

    // Scene 4
    curWord: 0,
    wordT: 0,
    wordPhase: 'text',
    wordAlpha: 0,
    weapAlpha: 0,

    // Scene 5
    pulseR: 0,
    titleScale: 0,
    finalFade: 0,
  };
}

// ── Scene table ─────────────────────────────────────────────────────────

const _SCENES = [
  { id: 'rivalry',    dur: 300 },
  { id: 'banishment', dur: 300 },
  { id: 'goblin',     dur: 420 },
  { id: 'weapons',    dur: 300 },
  { id: 'duel',       dur: 300 },
];

// ═════════════════════════════════════════════════════════════════════════
//  PUBLIC API  (called from main.js)
// ═════════════════════════════════════════════════════════════════════════

function isIntroSeen() {
  try { return !!localStorage.getItem(INTRO_KEY); } catch { return false; }
}

function markIntroSeen() {
  try { localStorage.setItem(INTRO_KEY, '1'); } catch { /* noop */ }
}

function startIntro() {
  _intro = _freshIntro();
  introParticles = [];
  _initStars();
}

function skipIntro() {
  markIntroSeen();
  introParticles = [];
  _intro = null;
  gameState = 'title';
}

function updateIntro(dt) {
  if (!_intro) return;
  const s = _intro;
  s.globalTimer += dt;
  s.sceneTimer += dt;

  _updateIP(dt);

  const scene = _SCENES[s.sceneIdx];
  if (!scene) { skipIntro(); return; }

  switch (scene.id) {
    case 'rivalry':    _upRivalry(s, dt);    break;
    case 'banishment': _upBanishment(s, dt); break;
    case 'goblin':     _upGoblin(s, dt);     break;
    case 'weapons':    _upWeapons(s, dt);    break;
    case 'duel':       _upDuel(s, dt);       break;
  }

  if (s.sceneTimer >= scene.dur) {
    s.sceneIdx++;
    s.sceneTimer = 0;
    if (s.sceneIdx >= _SCENES.length) { skipIntro(); return; }
    s.flashAlpha = 0.8;
  }
}

function renderIntro() {
  if (!_intro) return;
  const s = _intro;
  const scene = _SCENES[s.sceneIdx];
  if (!scene) return;

  ctx.fillStyle = '#0a0012';
  ctx.fillRect(0, 0, W, H);

  switch (scene.id) {
    case 'rivalry':    _drRivalry(s);    break;
    case 'banishment': _drBanishment(s); break;
    case 'goblin':     _drGoblin(s);     break;
    case 'weapons':    _drWeapons(s);    break;
    case 'duel':       _drDuel(s);       break;
  }

  _renderIP();

  if (s.sceneTimer < 30) {
    ctx.globalAlpha = 1 - s.sceneTimer / 30;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }

  if (s.flashAlpha > 0) {
    ctx.globalAlpha = s.flashAlpha;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
    s.flashAlpha *= 0.9;
    if (s.flashAlpha < 0.01) s.flashAlpha = 0;
  }

  ctx.globalAlpha = 0.25 + Math.sin(s.globalTimer * 0.05) * 0.1;
  ctx.font = '14px "VT323", monospace';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = '#555';
  ctx.fillText('PRESS SPACE TO SKIP', W - 15, H - 10);
  ctx.globalAlpha = 1;
}

// ═════════════════════════════════════════════════════════════════════════
//  SCENE 1 — THE RIVALRY
// ═════════════════════════════════════════════════════════════════════════

function _upRivalry(s, dt) {
  s.wizGlow = Math.min(1, s.sceneTimer / 60);
  s.arcT += dt;

  if (s.sceneTimer > 40 && Math.random() < 0.3) {
    const mx = W / 2, my = H * 0.48;
    const colors = ['#ff00ff', '#00ffcc', '#ffcc00', '#8844ff'];
    _spawnIP(
      mx + (Math.random() - 0.5) * 90,
      my + (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2 - 0.5,
      colors[Math.floor(Math.random() * colors.length)],
      25 + Math.random() * 20,
      2 + Math.random() * 2,
    );
  }
}

function _drRivalry(s) {
  _bg('#0a0020', '#150030', '#0a0015');
  _renderStars();

  const zoom = 1 + s.sceneTimer * 0.0002;
  ctx.save();
  ctx.translate(W / 2, H / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-W / 2, -H / 2);

  ctx.globalAlpha = Math.min(1, s.sceneTimer / 60);
  _drawWizard(W * 0.35, H * 0.62, 1.2, 1, '#c04080', '#ffc8e0');
  _drawWizard(W * 0.65, H * 0.62, 1.2, -1, '#4070c0', '#c0d8ff');
  ctx.globalAlpha = 1;

  if (s.sceneTimer > 40) {
    const aAlpha = Math.min(1, (s.sceneTimer - 40) / 40);
    ctx.globalAlpha = aAlpha * (0.4 + Math.sin(s.arcT * 0.3) * 0.3);
    ctx.save();
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ff88ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const sx = W * 0.42, ex = W * 0.58, my = H * 0.48;
    ctx.moveTo(sx, my);
    for (let t = 0; t <= 1; t += 0.04) {
      ctx.lineTo(
        sx + (ex - sx) * t,
        my + Math.sin(t * 8 + s.arcT * 0.5) * 14 * Math.sin(t * Math.PI),
      );
    }
    ctx.stroke();

    ctx.strokeStyle = '#00ffcc';
    ctx.beginPath();
    ctx.moveTo(sx, my + 4);
    for (let t = 0; t <= 1; t += 0.04) {
      ctx.lineTo(
        sx + (ex - sx) * t,
        my + 4 + Math.sin(t * 6 - s.arcT * 0.4) * 10 * Math.sin(t * Math.PI),
      );
    }
    ctx.stroke();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  ctx.restore();

  const ta = s.sceneTimer > 80 ? Math.min(1, (s.sceneTimer - 80) / 60) : 0;
  _drawText('In the halls of the Arcane Academy,', H * 0.82, ta, 22, '#bbaadd');
  _drawText('two rivals have feuded for centuries...', H * 0.88, ta * 0.9, 22, '#bbaadd');
}

// ═════════════════════════════════════════════════════════════════════════
//  SCENE 2 — THE BANISHMENT
// ═════════════════════════════════════════════════════════════════════════

const _S2_PLATS = [
  { x: 100, y: 324, w: 200, h: 14 },
  { x: 660, y: 324, w: 200, h: 14 },
  { x: 350, y: 243, w: 260, h: 14 },
];

function _upBanishment(s, dt) {
  s.platAlpha = Math.min(1, s.sceneTimer / 80);

  const dropStart = 60, dropDur = 80;
  if (s.sceneTimer > dropStart) {
    const t = Math.min(1, (s.sceneTimer - dropStart) / dropDur);
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const landY = 322;
    s.wizY[0] = -60 + ease * (landY + 60);
    s.wizY[1] = -60 + ease * (landY + 60);

    if (t >= 0.95 && !s.landed) {
      s.landed = true;
      s.shake = 8;
      _burstIP(200, 322, 14, '#ffcc88', 2.5, 25, 2);
      _burstIP(760, 322, 14, '#88ccff', 2.5, 25, 2);
    }
  }

  if (s.shake > 0.3) s.shake *= 0.9;
  else s.shake = 0;
}

function _drBanishment(s) {
  _bg('#0d0020', '#1a0033', '#0a0015');
  _renderStars();

  ctx.save();
  if (s.shake > 0.3) {
    ctx.translate((Math.random() - 0.5) * s.shake, (Math.random() - 0.5) * s.shake);
  }

  _drawPlatforms(_S2_PLATS, s.platAlpha);

  if (s.sceneTimer > 60) {
    _drawWizard(200, s.wizY[0], 1.0, 1, '#c04080', '#ffc8e0');
    _drawWizard(760, s.wizY[1], 1.0, -1, '#4070c0', '#c0d8ff');
  }

  ctx.restore();

  const ta = s.sceneTimer > 140 ? Math.min(1, (s.sceneTimer - 140) / 60) : 0;
  _drawText('Banished to the Chaos Arenas', H * 0.78, ta, 24, '#ff88cc');
  _drawText('by the Academy Council...', H * 0.85, ta * 0.9, 22, '#ff88cc');
}

// ═════════════════════════════════════════════════════════════════════════
//  SCENE 3 — THE CHAOS GOBLIN
// ═════════════════════════════════════════════════════════════════════════

function _upGoblin(s, dt) {
  s.gobAlpha = Math.min(1, s.sceneTimer / 100);
  s.forgeGlow = 0.5 + Math.sin(s.sceneTimer * 0.06) * 0.3;
  s.vortex += dt * 0.04;
  s.txtPhase = s.sceneTimer > 210 ? 1 : 0;

  if (s.sceneTimer > 30 && Math.random() < 0.4) {
    const a = s.vortex + Math.random() * Math.PI * 2;
    const r = 55 + Math.random() * 50;
    const colors = ['#ff00ff', '#8800ff', '#ff44aa', '#cc00ff'];
    _spawnIP(
      W / 2 + Math.cos(a) * r,
      H * 0.42 + Math.sin(a) * r * 0.5,
      -Math.sin(a) * 1.5,
      Math.cos(a) * 0.8,
      colors[Math.floor(Math.random() * colors.length)],
      28 + Math.random() * 20,
      1.5 + Math.random() * 1.5,
    );
  }

  if (s.sceneTimer > 80 && Math.random() < 0.25) {
    _spawnIP(
      W / 2 + (Math.random() - 0.5) * 24,
      H * 0.58,
      (Math.random() - 0.5) * 2,
      -1 - Math.random() * 2,
      Math.random() < 0.5 ? '#ffcc00' : '#ff6600',
      18 + Math.random() * 14,
      2,
    );
  }
}

function _drGoblin(s) {
  _bg('#0a0018', '#1a0030', '#0d0015');
  _renderStars();

  ctx.save();
  ctx.globalAlpha = s.forgeGlow * s.gobAlpha * 0.3;
  const fg = ctx.createRadialGradient(W / 2, H * 0.55, 10, W / 2, H * 0.55, 130);
  fg.addColorStop(0, '#ff8800');
  fg.addColorStop(0.5, 'rgba(255,68,0,0.15)');
  fg.addColorStop(1, 'transparent');
  ctx.fillStyle = fg;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  ctx.globalAlpha = s.gobAlpha;
  _drawForge(W / 2, H * 0.56, 1.5, s.forgeGlow);

  ctx.save();
  ctx.shadowColor = '#00ff88';
  ctx.shadowBlur = 15 * s.gobAlpha;
  _drawGoblin(W / 2, H * 0.36, 4);
  ctx.restore();
  ctx.globalAlpha = 1;

  if (s.txtPhase === 0) {
    const a1 = s.sceneTimer > 60 ? Math.min(1, (s.sceneTimer - 60) / 60) : 0;
    _drawText('A Chaos Goblin offers a forbidden gift...', H * 0.74, a1, 22, '#88ff88');
    _drawText('the Spell Forge.', H * 0.81, a1 * 0.8, 24, '#ffcc00');
  } else {
    const a2 = Math.min(1, (s.sceneTimer - 210) / 60);
    _drawText('Imagine anything.', H * 0.74, a2, 26, '#00ffcc');
    _drawText('The Forge will make it real.', H * 0.82, a2 * 0.8, 24, '#ff88ff');
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  SCENE 4 — WORDS TO WEAPONS
// ═════════════════════════════════════════════════════════════════════════

const _WORDS = ['rubber duck', 'cursed toaster', 'sentient burrito'];

function _upWeapons(s, dt) {
  s.wordT += dt;
  const dur = 95;

  s.curWord = Math.min(_WORDS.length - 1, Math.floor(s.wordT / dur));
  const local = s.wordT % dur;

  if (local < 30) {
    s.wordPhase = 'text';
    s.wordAlpha = Math.min(1, local / 15);
    s.weapAlpha = 0;
  } else if (local < 52) {
    s.wordPhase = 'dissolve';
    s.wordAlpha = Math.max(0, 1 - (local - 30) / 15);
    s.weapAlpha = 0;

    if (Math.random() < 0.6) {
      _spawnIP(
        W / 2 + (Math.random() - 0.5) * 110,
        H * 0.42 + (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        Math.random() < 0.5 ? '#ffcc00' : '#ff00ff',
        18,
        2,
      );
    }
  } else {
    s.wordPhase = 'weapon';
    s.wordAlpha = 0;
    s.weapAlpha = Math.min(1, (local - 52) / 15);
  }
}

function _drWeapons(s) {
  _bg('#0d0020', '#150030', '#0a0012');
  _renderStars();

  const word = _WORDS[s.curWord] || _WORDS[0];
  const weap = _WEAPONS[s.curWord] || _WEAPONS[0];

  if (s.wordAlpha > 0) {
    ctx.globalAlpha = s.wordAlpha;
    ctx.save();
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '36px "VT323", monospace';
    ctx.fillStyle = '#ff88ff';
    ctx.fillText('"' + word + '"', W / 2, H * 0.42);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  if (s.weapAlpha > 0) {
    ctx.globalAlpha = s.weapAlpha;
    ctx.save();
    ctx.shadowColor = '#ffcc00';
    ctx.shadowBlur = 20;
    _drawWeapon(weap, W / 2, H * 0.42, 8);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  const dAlpha = s.sceneTimer > 30 ? 0.5 : s.sceneTimer / 60;
  _drawText('Every defeat fuels a new creation...', H * 0.7, dAlpha, 18, '#886699');
}

// ═════════════════════════════════════════════════════════════════════════
//  SCENE 5 — THE DUEL BEGINS
// ═════════════════════════════════════════════════════════════════════════

const _S5_PLATS = [
  { x: 80, y: 324, w: 180, h: 14 },
  { x: 700, y: 324, w: 180, h: 14 },
  { x: 370, y: 259, w: 220, h: 14 },
];

function _upDuel(s, dt) {
  if (s.sceneTimer > 60) s.pulseR = Math.min(500, (s.sceneTimer - 60) * 3);
  if (s.sceneTimer > 100) s.titleScale = Math.min(1, (s.sceneTimer - 100) / 60);
  if (s.sceneTimer > 240) s.finalFade = Math.min(1, (s.sceneTimer - 240) / 50);

  if (s.sceneTimer > 50 && s.sceneTimer < 200 && Math.random() < 0.5) {
    const a = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 28;
    const colors = ['#00ffcc', '#ff00ff', '#ffcc00'];
    _spawnIP(
      W / 2 + Math.cos(a) * r,
      H * 0.45 + Math.sin(a) * r * 0.6,
      Math.cos(a) * 3,
      Math.sin(a) * 2,
      colors[Math.floor(Math.random() * colors.length)],
      35,
      2.5,
    );
  }
}

function _drDuel(s) {
  _bg('#0a0020', '#1a0035', '#0d0018');
  _renderStars();

  _drawPlatforms(_S5_PLATS, 1);

  _drawWizard(200, 322, 1.1, 1, '#c04080', '#ffc8e0');
  _drawWizard(760, 322, 1.1, -1, '#4070c0', '#c0d8ff');

  if (s.pulseR > 0 && s.pulseR < 500) {
    const pAlpha = Math.max(0, 1 - s.pulseR / 500);
    ctx.globalAlpha = pAlpha * 0.4;
    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(W / 2, H * 0.45, s.pulseR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  if (s.titleScale > 0) {
    const sc = 0.3 + s.titleScale * 0.7;
    const al = Math.min(1, s.titleScale * 1.5);
    ctx.save();
    ctx.translate(W / 2, H * 0.3);
    ctx.scale(sc, sc);
    ctx.globalAlpha = al;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '54px "VT323", monospace';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 6;
    ctx.strokeText('THE ETERNAL DUEL BEGINS', 0, 0);
    ctx.fillStyle = '#00ffcc';
    ctx.shadowColor = '#00ffcc';
    ctx.shadowBlur = 30;
    ctx.fillText('THE ETERNAL DUEL BEGINS', 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  if (s.finalFade > 0) {
    ctx.globalAlpha = s.finalFade;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
}
