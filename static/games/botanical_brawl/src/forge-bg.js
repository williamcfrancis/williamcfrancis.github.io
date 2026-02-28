// Physics-based word rain for the forge overlay background

const GRAVITY = 540;
const RESTITUTION = 0.48;
const FRICTION = 0.78;
const MAX_BODIES = 55;
const SPAWN_RATE = 7;

function wp(c, ...w) { return w.map(t => ({ t, c })); }

const WORD_POOL = [
  ...wp('#FF4500', 'FIRE','FLAME','INFERNO','BLAZE','EMBER','LAVA','MAGMA','VOLCANO','SCORCH'),
  ...wp('#00BFFF', 'ICE','FROST','FROZEN','BLIZZARD','GLACIAL','ARCTIC','SNOWBALL','HAIL'),
  ...wp('#FFFF00', 'LIGHTNING','THUNDER','ELECTRIC','BOLT','SPARK','ZAP','SHOCK'),
  ...wp('#2196F3', 'WATER','WAVE','OCEAN','SPLASH','RAIN','TSUNAMI','STEAM'),
  ...wp('#795548', 'EARTH','ROCK','STONE','BOULDER','SAND','MUD'),
  ...wp('#B2EBF2', 'WIND','GUST','TORNADO','CYCLONE','HURRICANE'),
  ...wp('#9C27B0', 'DARK','SHADOW','VOID','ABYSS','NIGHTMARE','CURSED'),
  ...wp('#FFFFE0', 'LIGHT','HOLY','DIVINE','ANGEL','CELESTIAL','RADIANT'),
  ...wp('#FFD600', 'SOLAR','SUN','GOLD','GOLDEN','STELLAR','STAR','CROWN'),
  ...wp('#7986CB', 'LUNAR','MOON','COSMIC','GALAXY','NEBULA'),
  ...wp('#76FF03', 'POISON','TOXIC','VENOM','ACID','SLIME','GOO'),
  ...wp('#4CAF50', 'NATURE','LEAF','VINE','TREE','ROOT','BAMBOO','MOSS','CACTUS'),
  ...wp('#FF69B4', 'FLOWER','ROSE','RAINBOW','SPARKLE','CUTE','KAWAII','PINK','PETAL'),
  ...wp('#FF3D00', 'DRAGON','PHOENIX','KABOOM','EXPLODE','NUKE','YEET'),
  ...wp('#78909C', 'WOLF','SHARK','ROBOT','MECH','STEEL','SHIELD'),
  ...wp('#FFEB3B', 'DUCK','BANANA','BEE','RAPID','FAST','YELLOW','LEMON'),
  ...wp('#E040FB', 'MAGIC','SPELL','ARCANE','CRYSTAL','MYSTIC','PORTAL','ENCHANT'),
  ...wp('#E91E63', 'LOVE','CHERRY','CRIMSON','DEMON','DEVIL','HEART'),
  ...wp('#FF9800', 'PIZZA','BURGER','TACO','CANNON','ROCKET','ORANGE'),
  ...wp('#7B1FA2', 'PURPLE','WITCH','SORCERY','AMETHYST','VIOLET'),
  ...wp('#00BCD4', 'CYBER','PLASMA','TURQUOISE','TEAL','LASER','BEAM'),
  ...wp('#8D6E63', 'WOOD','HAMMER','AXE','BEAR','HEAVY','ANCIENT'),
  ...wp('#B0BEC5', 'SILVER','BLADE','KATANA','DAGGER','KNIFE','SNIPER'),
  ...wp('#F44336', 'RED','ANGRY','FURIOUS','DEADLY','LETHAL','MEGA'),
  ...wp('#2196F3', 'BLUE','SAPPHIRE','NAVY','DEEP'),
  ...wp('#212121', 'BLACK','OBSIDIAN','NINJA','STEALTH','SHADOW'),
  ...wp('#FFFFFF', 'WHITE','SNOW','GHOST','ANGEL'),
  ...wp('#FF80AB', 'CUPCAKE','CANDY','LOLLIPOP','GUMMY','FLUFFY','BUNNY'),
  ...wp('#FFD54F', 'CHEESE','HONEY','COIN','TRUMPET','HORN','POPCORN'),
  ...wp('#00E676', 'HACK','MATRIX','VIRUS','PIXEL','GLITCH'),
  ...wp('#FF5722', 'MISSILE','BAZOOKA','FIREWORK','BONK','SHOTGUN'),
  ...wp('#7C4DFF', 'QUANTUM','WARP','ARCANE','MYTHIC','EPIC'),
  ...wp('#A1887F', 'FEATHER','GENTLE','BONE','SKULL','CALM'),
  ...wp('#C6FF00', 'TENNIS','NEON','DISCO','TURBO','HYPER'),
  ...wp('#1565C0', 'WHALE','TIDAL','TRIDENT','OCTOPUS'),
  ...wp('#FF1744', 'LEGENDARY','ULTRA','SUPER','CHAOS'),
  ...wp('#FF6F00', 'BASKETBALL','FOOTBALL','BASEBALL','HOCKEY'),
  ...wp('#689F38', 'TEA','EMERALD','FROG','TURTLE','GREEN'),
  ...wp('#D500F9', 'UNICORN','PEGASUS','JELLYFISH','BUTTERFLY'),
  ...wp('#5D4037', 'COFFEE','CHOCOLATE','COCONUT','TREBUCHET'),
  ...wp('#81D4FA', 'BUBBLE','BOUNCE','PING','PONG','PINBALL','SPRING'),
  ...wp('#FF8A65', 'CAT','PUPPY','KITTEN','PENGUIN','CRAB'),
  ...wp('#90A4AE', 'GUN','PISTOL','RIFLE','RAILGUN','GATLING'),
  ...wp('#BCAAA4', 'PIANO','VIOLIN','GUITAR','DRUM','FLUTE','MUSIC'),
  ...wp('#EF5350', 'CHILI','PEPPER','SPICY','SCORPION','SNAKE'),
  ...wp('#FFC107', 'WAFFLE','PANCAKE','EGG','PINEAPPLE','SODA','JUICE'),
];

let canvas, ctx;
let animId = null;
let lastTime = 0;
let bodies = [];
let spawnAccum = 0;
let hero = { x: 0, y: 0, vx: 55, dir: 1, phase: 0 };
let draining = false;
let drainTimer = 0;
let groundY = 0;
let bgFlowers = [];
let bgClouds = [];

function initBgDecor() {
  bgFlowers = [];
  bgClouds = [];
  const W = canvas.width;
  for (let i = 0; i < 25; i++) {
    bgFlowers.push({
      x: Math.random() * W,
      y: groundY + 2 + Math.random() * 20,
      c: ['#FF69B4','#FFB7C5','#DDA0DD','#FFD700','#FFA07A','#FF6F61','#E040FB'][i % 7],
      r: 2 + Math.random() * 2.5,
    });
  }
  for (let i = 0; i < 4; i++) {
    bgClouds.push({
      x: Math.random() * W,
      y: 30 + Math.random() * 60,
      w: 60 + Math.random() * 50,
      speed: 8 + Math.random() * 12,
    });
  }
}

export function startForgeAnimation(cvs) {
  canvas = cvs;
  ctx = cvs.getContext('2d');
  doResize();
  bodies = [];
  lastTime = 0;
  spawnAccum = 0;
  draining = false;
  drainTimer = 0;
  hero.x = canvas.width / 2;
  hero.dir = 1;
  hero.phase = 0;
  initBgDecor();
  window.addEventListener('resize', doResize);
  animId = requestAnimationFrame(loop);
}

export function stopForgeAnimation() {
  if (animId) cancelAnimationFrame(animId);
  animId = null;
  window.removeEventListener('resize', doResize);
}

function doResize() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  groundY = canvas.height * 0.86;
  hero.y = groundY - 30;
  initBgDecor();
}

function loop(ts) {
  animId = requestAnimationFrame(loop);
  if (!lastTime) lastTime = ts;
  const dt = Math.min((ts - lastTime) / 1000, 0.04);
  lastTime = ts;
  update(dt);
  render();
}

function spawnWord() {
  const entry = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
  const fontSize = 12 + Math.random() * 12;
  ctx.font = `bold ${fontSize}px Quicksand, sans-serif`;
  const tw = ctx.measureText(entry.t).width;
  const w = tw + 12;
  const h = fontSize + 8;

  bodies.push({
    x: 10 + Math.random() * (canvas.width - 20 - w),
    y: -h - Math.random() * 150,
    vx: (Math.random() - 0.5) * 50,
    vy: 20 + Math.random() * 50,
    w, h,
    rot: (Math.random() - 0.5) * 0.3,
    avel: (Math.random() - 0.5) * 1.5,
    text: entry.t,
    color: entry.c,
    fontSize,
    squash: 1,
    squashT: 0,
  });
}

function update(dt) {
  spawnAccum += dt;
  const interval = 1 / SPAWN_RATE;
  while (spawnAccum >= interval && bodies.length < MAX_BODIES) {
    spawnWord();
    spawnAccum -= interval;
  }
  if (spawnAccum > interval * 2) spawnAccum = 0;

  hero.phase += dt * 3.5;
  hero.x += hero.vx * hero.dir * dt;
  if (hero.x > canvas.width - 50) hero.dir = -1;
  if (hero.x < 50) hero.dir = 1;
  hero.y = groundY - 30 + Math.sin(hero.phase) * 2.5;

  for (const c of bgClouds) {
    c.x += c.speed * dt;
    if (c.x > canvas.width + c.w) c.x = -c.w;
  }

  const gndY = draining ? canvas.height + 400 : groundY;

  for (const b of bodies) {
    b.vy += GRAVITY * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.rot += b.avel * dt;

    if (b.squashT > 0) {
      b.squashT -= dt;
      b.squash = 1 - 0.28 * (b.squashT / 0.12);
      if (b.squashT <= 0) { b.squash = 1; b.squashT = 0; }
    }

    // Ground
    if (b.y + b.h > gndY) {
      b.y = gndY - b.h;
      if (Math.abs(b.vy) > 25) b.squashT = 0.12;
      b.vy = -Math.abs(b.vy) * RESTITUTION;
      b.vx *= FRICTION;
      b.avel *= 0.7;
      if (Math.abs(b.vy) < 12) b.vy = 0;
    }

    // Walls
    if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * RESTITUTION; b.avel += 1; }
    if (b.x + b.w > canvas.width) { b.x = canvas.width - b.w; b.vx = -Math.abs(b.vx) * RESTITUTION; b.avel -= 1; }

    // Protagonist collision (circle vs rect)
    heroCollide(b);
  }

  // Word-word collision
  for (let i = 0; i < bodies.length; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < bodies.length; j++) {
      const b = bodies[j];
      if (Math.abs(a.y - b.y) > a.h + b.h) continue;
      const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ox <= 0 || oy <= 0) continue;

      if (oy < ox) {
        const sign = a.y < b.y ? -1 : 1;
        a.y += sign * oy * 0.45;
        b.y -= sign * oy * 0.45;
        const avg = (a.vy + b.vy) * 0.5;
        a.vy = avg + (a.vy - avg) * -RESTITUTION * 0.4;
        b.vy = avg + (b.vy - avg) * -RESTITUTION * 0.4;
      } else {
        const sign = a.x < b.x ? -1 : 1;
        a.x += sign * ox * 0.45;
        b.x -= sign * ox * 0.45;
        const avg = (a.vx + b.vx) * 0.5;
        a.vx = avg + (a.vx - avg) * -RESTITUTION * 0.4;
        b.vx = avg + (b.vx - avg) * -RESTITUTION * 0.4;
      }
    }
  }

  // Pile check
  if (!draining) {
    let minY = gndY;
    for (const b of bodies) {
      if (Math.abs(b.vy) < 5 && b.y < minY) minY = b.y;
    }
    if (gndY - minY > canvas.height * 0.25 && bodies.length > 15) {
      draining = true;
      drainTimer = 3.0;
    }
  } else {
    drainTimer -= dt;
    bodies = bodies.filter(b => b.y < canvas.height + 500);
    if (drainTimer <= 0 && bodies.length < 3) {
      bodies = [];
      draining = false;
      spawnAccum = 0;
    }
  }
}

function heroCollide(b) {
  const hx = hero.x, hy = hero.y;
  const hr = 25;
  const bcx = b.x + b.w / 2, bcy = b.y + b.h / 2;
  const dx = bcx - hx, dy = bcy - hy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = hr + Math.max(b.w, b.h) * 0.45;
  if (dist < minDist && dist > 0.1) {
    const nx = dx / dist, ny = dy / dist;
    const relV = b.vx * nx + b.vy * ny;
    if (relV < 0) {
      b.vx -= 1.7 * relV * nx;
      b.vy -= 1.7 * relV * ny;
      b.avel += (Math.random() - 0.5) * 6;
      b.squashT = 0.1;
    }
    const overlap = minDist - dist;
    b.x += nx * overlap;
    b.y += ny * overlap;
  }
}

function roundRect(x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function render() {
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;

  // ── Sky ──
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
  sky.addColorStop(0, '#60B5E8');
  sky.addColorStop(0.6, '#A8D8EA');
  sky.addColorStop(1, '#D4EDDA');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Sun
  ctx.fillStyle = 'rgba(255,213,79,0.2)';
  ctx.beginPath(); ctx.arc(W * 0.82, H * 0.1, 70, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFD54F';
  ctx.beginPath(); ctx.arc(W * 0.82, H * 0.1, 30, 0, Math.PI * 2); ctx.fill();

  // Clouds
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  for (const c of bgClouds) {
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w * 0.5, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x - c.w * 0.2, c.y + 5, c.w * 0.35, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x + c.w * 0.25, c.y + 3, c.w * 0.3, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Distant hills
  ctx.fillStyle = '#8FBF7F';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.62);
  for (let x = 0; x <= W; x += 50) {
    ctx.lineTo(x, H * 0.62 + Math.sin(x * 0.007) * 35 + Math.cos(x * 0.013) * 18);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  ctx.fillStyle = '#7CB868';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.70);
  for (let x = 0; x <= W; x += 35) {
    ctx.lineTo(x, H * 0.70 + Math.sin(x * 0.011 + 1.5) * 22 + Math.cos(x * 0.019) * 12);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  // Distant trees
  for (let i = 0; i < 6; i++) {
    const tx = W * (0.08 + i * 0.17);
    const ty = H * 0.66 + Math.sin(i * 2.3) * 12;
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(tx - 2, ty, 4, 18);
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath(); ctx.arc(tx, ty - 6, 12, 0, Math.PI * 2); ctx.fill();
  }

  // Grass floor
  const grass = ctx.createLinearGradient(0, groundY - 8, 0, H);
  grass.addColorStop(0, '#6DBF47');
  grass.addColorStop(0.15, '#5BAF3A');
  grass.addColorStop(1, '#4E9E30');
  ctx.fillStyle = grass;
  ctx.fillRect(0, groundY - 4, W, H - groundY + 4);

  // Grass tufts
  ctx.fillStyle = '#5BAF3A';
  for (let x = 0; x < W; x += 12) {
    const h = 4 + Math.sin(x * 0.4) * 2.5;
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x + 2.5, groundY - h);
    ctx.lineTo(x + 5, groundY);
    ctx.fill();
  }

  // Flowers
  for (const f of bgFlowers) {
    ctx.fillStyle = f.c;
    ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
  }

  // Dirt line at edge
  ctx.fillStyle = '#8B6E2F';
  ctx.fillRect(0, groundY - 5, W, 3);

  // ── Fence posts (quirky garden detail) ──
  ctx.strokeStyle = '#8D6E63';
  ctx.lineWidth = 3;
  for (let x = 30; x < W; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, groundY - 2); ctx.lineTo(x, groundY - 22); ctx.stroke();
  }
  ctx.strokeStyle = '#A1887F';
  ctx.lineWidth = 2;
  const fenceY1 = groundY - 16, fenceY2 = groundY - 8;
  ctx.beginPath(); ctx.moveTo(0, fenceY1); ctx.lineTo(W, fenceY1); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, fenceY2); ctx.lineTo(W, fenceY2); ctx.stroke();

  // ── Word bodies ──
  for (const b of bodies) {
    ctx.save();
    ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
    ctx.rotate(b.rot);
    const sx = 1 + (1 - b.squash) * 0.3;
    const sy = b.squash;
    ctx.scale(sx, sy);

    ctx.globalAlpha = 0.92;
    ctx.fillStyle = b.color;
    ctx.beginPath();
    roundRect(-b.w / 2, -b.h / 2, b.w, b.h, b.h * 0.35);
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    roundRect(-b.w / 2, -b.h / 2, b.w, b.h, b.h * 0.35);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${b.fontSize}px Quicksand, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetY = 1;
    ctx.fillText(b.text, 0, 0.5);
    ctx.shadowColor = 'transparent';

    ctx.restore();
  }

  // ── Protagonist ──
  drawHero();
}

function drawHero() {
  const x = hero.x, y = hero.y;
  const walk = hero.phase * 2;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(hero.dir, 1);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.beginPath();
  ctx.ellipse(0, 28, 16, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs
  const lSwing = Math.sin(walk) * 6;
  ctx.fillStyle = '#7BC8B8';
  ctx.fillRect(-7, 17, 5, 10 + lSwing);
  ctx.fillRect(3, 17, 5, 10 - lSwing);

  // Feet
  ctx.fillStyle = '#795548';
  ctx.beginPath();
  roundRect(-8, 26 + Math.max(0, lSwing), 7, 3, 1.5);
  ctx.fill();
  ctx.beginPath();
  roundRect(2, 26 + Math.max(0, -lSwing), 7, 3, 1.5);
  ctx.fill();

  // Body
  ctx.fillStyle = '#98D8C8';
  ctx.beginPath();
  ctx.ellipse(0, 2, 15, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#7BC8B8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 2, 15, 20, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Arms
  const aSwing = Math.sin(walk + Math.PI) * 12;
  ctx.strokeStyle = '#98D8C8';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-13, 2); ctx.lineTo(-18, 12 + aSwing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(13, 2); ctx.lineTo(18, 12 - aSwing); ctx.stroke();

  // Hands
  ctx.fillStyle = '#98D8C8';
  ctx.beginPath(); ctx.arc(-18, 12 + aSwing, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(18, 12 - aSwing, 3, 0, Math.PI * 2); ctx.fill();

  // Hat
  ctx.fillStyle = '#4CAF50';
  ctx.beginPath();
  ctx.moveTo(-12, -16);
  ctx.lineTo(0, -38);
  ctx.lineTo(12, -16);
  ctx.closePath();
  ctx.fill();

  // Hat brim
  ctx.fillStyle = '#388E3C';
  ctx.beginPath();
  ctx.ellipse(0, -16, 14, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sprout
  ctx.strokeStyle = '#66BB6A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.quadraticCurveTo(6 + Math.sin(hero.phase * 2) * 3, -46, 4, -50);
  ctx.stroke();
  ctx.fillStyle = '#81C784';
  ctx.beginPath(); ctx.arc(4, -50, 3.5, 0, Math.PI * 2); ctx.fill();

  // Eyes
  ctx.fillStyle = '#222222';
  ctx.beginPath(); ctx.arc(-5, -6, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(6, -6, 4, 0, Math.PI * 2); ctx.fill();
  // Eye shines
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath(); ctx.arc(-3.5, -7.5, 1.8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(7.5, -7.5, 1.8, 0, Math.PI * 2); ctx.fill();

  // Cheeks
  ctx.fillStyle = 'rgba(255,183,178,0.55)';
  ctx.beginPath(); ctx.arc(-11, 0, 4, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(11, 0, 4, 0, Math.PI * 2); ctx.fill();

  // Smile
  ctx.strokeStyle = '#5D4037';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(0.5, 0, 4.5, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.restore();
}
