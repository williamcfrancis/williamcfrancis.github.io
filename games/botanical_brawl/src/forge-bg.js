// Physics-based word rain for the forge overlay background

const GRAVITY = 580;
const RESTITUTION = 0.52;
const FRICTION = 0.75;
const MAX_BODIES = 40;
const SPAWN_RATE = 5;
const HERO_SCALE = 4;
const COLLISION_ITERS = 4;

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

const SHAPES = ['hex', 'gem', 'shield', 'banner', 'leaf', 'tag'];

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
let bgButterflies = [];
let bgTime = 0;

function initBgDecor() {
  bgFlowers = [];
  bgClouds = [];
  bgButterflies = [];
  const W = canvas.width;
  for (let i = 0; i < 30; i++) {
    bgFlowers.push({
      x: Math.random() * W,
      y: groundY + 2 + Math.random() * 25,
      c: ['#FF69B4','#FFB7C5','#DDA0DD','#FFD700','#FFA07A','#FF6F61','#E040FB','#81D4FA','#A5D6A7'][i % 9],
      r: 2.5 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    });
  }
  for (let i = 0; i < 5; i++) {
    bgClouds.push({
      x: Math.random() * W,
      y: 25 + Math.random() * 50,
      w: 70 + Math.random() * 60,
      speed: 6 + Math.random() * 10,
      opacity: 0.4 + Math.random() * 0.3,
    });
  }
  for (let i = 0; i < 4; i++) {
    bgButterflies.push({
      x: 50 + Math.random() * (W - 100),
      y: groundY * 0.4 + Math.random() * groundY * 0.4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 1.2,
      c: ['#FF69B4','#FFD54F','#81D4FA','#CE93D8'][i % 4],
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
  bgTime = 0;
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
  hero.y = groundY - 28 * HERO_SCALE;
  initBgDecor();
}

function loop(ts) {
  animId = requestAnimationFrame(loop);
  if (!lastTime) lastTime = ts;
  const dt = Math.min((ts - lastTime) / 1000, 0.04);
  lastTime = ts;
  bgTime += dt;
  update(dt);
  render();
}

function spawnWord() {
  const entry = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
  const fontSize = 20 + Math.random() * 18;
  ctx.font = `bold ${fontSize}px Quicksand, sans-serif`;
  const tw = ctx.measureText(entry.t).width;
  const w = tw + 28;
  const h = fontSize + 18;

  bodies.push({
    x: 10 + Math.random() * (canvas.width - 20 - w),
    y: -h - Math.random() * 150,
    vx: (Math.random() - 0.5) * 50,
    vy: 20 + Math.random() * 50,
    w, h,
    rot: (Math.random() - 0.5) * 0.25,
    avel: (Math.random() - 0.5) * 1.2,
    text: entry.t,
    color: entry.c,
    fontSize,
    squash: 1,
    squashT: 0,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    mass: w * h,
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
  hero.y = groundY - 28 * HERO_SCALE + Math.sin(hero.phase) * 2.5;

  for (const c of bgClouds) {
    c.x += c.speed * dt;
    if (c.x > canvas.width + c.w) c.x = -c.w;
  }

  for (const bf of bgButterflies) {
    bf.phase += bf.speed * dt;
    bf.x += Math.sin(bf.phase * 0.7) * 30 * dt;
    bf.y += Math.cos(bf.phase) * 15 * dt;
    if (bf.x < 20) bf.x = 20;
    if (bf.x > canvas.width - 20) bf.x = canvas.width - 20;
    if (bf.y < 30) bf.y = 30;
    if (bf.y > groundY - 40) bf.y = groundY - 40;
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

    if (b.y + b.h > gndY) {
      b.y = gndY - b.h;
      if (Math.abs(b.vy) > 25) b.squashT = 0.12;
      b.vy = -Math.abs(b.vy) * RESTITUTION;
      b.vx *= FRICTION;
      b.avel *= 0.6;
      if (Math.abs(b.vy) < 12) b.vy = 0;
    }

    if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * RESTITUTION; b.avel += 0.8; }
    if (b.x + b.w > canvas.width) { b.x = canvas.width - b.w; b.vx = -Math.abs(b.vx) * RESTITUTION; b.avel -= 0.8; }

    heroCollide(b);
  }

  // Multi-pass collision for solid stacking
  for (let pass = 0; pass < COLLISION_ITERS; pass++) {
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      for (let j = i + 1; j < bodies.length; j++) {
        const b = bodies[j];
        if (Math.abs(a.y - b.y) > a.h + b.h) continue;
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox <= 0 || oy <= 0) continue;

        const totalMass = a.mass + b.mass;
        const aRatio = b.mass / totalMass;
        const bRatio = a.mass / totalMass;

        if (oy < ox) {
          const sign = a.y < b.y ? -1 : 1;
          a.y += sign * oy * aRatio;
          b.y -= sign * oy * bRatio;
          if (pass === 0) {
            const avg = (a.vy * a.mass + b.vy * b.mass) / totalMass;
            a.vy = avg + (a.vy - avg) * -RESTITUTION * 0.7;
            b.vy = avg + (b.vy - avg) * -RESTITUTION * 0.7;
            a.avel += (Math.random() - 0.5) * 0.3;
            b.avel += (Math.random() - 0.5) * 0.3;
            if (Math.abs(a.vy - b.vy) > 30) {
              a.squashT = 0.08;
              b.squashT = 0.08;
            }
          }
        } else {
          const sign = a.x < b.x ? -1 : 1;
          a.x += sign * ox * aRatio;
          b.x -= sign * ox * bRatio;
          if (pass === 0) {
            const avg = (a.vx * a.mass + b.vx * b.mass) / totalMass;
            a.vx = avg + (a.vx - avg) * -RESTITUTION * 0.7;
            b.vx = avg + (b.vx - avg) * -RESTITUTION * 0.7;
          }
        }
      }
    }
  }

  if (!draining) {
    let minY = gndY;
    for (const b of bodies) {
      if (Math.abs(b.vy) < 5 && b.y < minY) minY = b.y;
    }
    if (gndY - minY > canvas.height * 0.28 && bodies.length > 12) {
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
  const hr = 25 * HERO_SCALE;
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

// ── Shape drawing ──

function drawWordShape(x, y, w, h, shape) {
  ctx.beginPath();
  switch (shape) {
    case 'hex': {
      const ind = h * 0.38;
      ctx.moveTo(x + ind, y);
      ctx.lineTo(x + w - ind, y);
      ctx.lineTo(x + w, y + h / 2);
      ctx.lineTo(x + w - ind, y + h);
      ctx.lineTo(x + ind, y + h);
      ctx.lineTo(x, y + h / 2);
      ctx.closePath();
      break;
    }
    case 'gem': {
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w, y + h * 0.32);
      ctx.lineTo(x + w * 0.85, y + h);
      ctx.lineTo(x + w * 0.15, y + h);
      ctx.lineTo(x, y + h * 0.32);
      ctx.closePath();
      break;
    }
    case 'shield': {
      const r = Math.min(w, h) * 0.16;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h * 0.52);
      ctx.quadraticCurveTo(x + w, y + h * 0.82, x + w / 2, y + h);
      ctx.quadraticCurveTo(x, y + h * 0.82, x, y + h * 0.52);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
      break;
    }
    case 'banner': {
      const n = w * 0.06;
      ctx.moveTo(x, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w - n, y + h / 2);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x + n, y + h / 2);
      ctx.closePath();
      break;
    }
    case 'leaf': {
      ctx.moveTo(x + w * 0.15, y + h * 0.05);
      ctx.quadraticCurveTo(x + w * 0.5, y - h * 0.1, x + w * 0.85, y + h * 0.05);
      ctx.quadraticCurveTo(x + w * 1.08, y + h * 0.5, x + w * 0.85, y + h * 0.95);
      ctx.quadraticCurveTo(x + w * 0.5, y + h * 1.1, x + w * 0.15, y + h * 0.95);
      ctx.quadraticCurveTo(x - w * 0.08, y + h * 0.5, x + w * 0.15, y + h * 0.05);
      ctx.closePath();
      break;
    }
    default: { // tag
      const r = h * 0.22;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
      break;
    }
  }
}

// ── Rendering ──

function render() {
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;

  // ── Sky (richer gradient) ──
  const sky = ctx.createLinearGradient(0, 0, 0, H * 0.68);
  sky.addColorStop(0, '#4A96D9');
  sky.addColorStop(0.25, '#6BB3E8');
  sky.addColorStop(0.5, '#8EC8EE');
  sky.addColorStop(0.7, '#B8DDF0');
  sky.addColorStop(0.85, '#CCE8D8');
  sky.addColorStop(1, '#D4EDDA');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Sun with layered glow
  const sunX = W * 0.82, sunY = H * 0.1;
  ctx.fillStyle = 'rgba(255,235,150,0.06)';
  ctx.beginPath(); ctx.arc(sunX, sunY, 120, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,223,100,0.1)';
  ctx.beginPath(); ctx.arc(sunX, sunY, 80, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = 'rgba(255,213,79,0.2)';
  ctx.beginPath(); ctx.arc(sunX, sunY, 50, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFD54F';
  ctx.beginPath(); ctx.arc(sunX, sunY, 28, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFF9C4';
  ctx.beginPath(); ctx.arc(sunX, sunY, 14, 0, Math.PI * 2); ctx.fill();

  // Light rays
  ctx.save();
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = '#FFD54F';
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + bgTime * 0.02;
    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(a);
    ctx.fillRect(-3, 0, 6, 160);
    ctx.restore();
  }
  ctx.restore();

  // Clouds (softer, multi-layer)
  for (const c of bgClouds) {
    ctx.globalAlpha = c.opacity * 0.3;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w * 0.55, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = c.opacity;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, c.w * 0.45, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x - c.w * 0.22, c.y + 4, c.w * 0.32, 13, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(c.x + c.w * 0.25, c.y + 2, c.w * 0.28, 11, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Distant mountains (layered)
  const mtGrad1 = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.7);
  mtGrad1.addColorStop(0, '#7DAF9A');
  mtGrad1.addColorStop(1, '#8FBF7F');
  ctx.fillStyle = mtGrad1;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.58);
  for (let x = 0; x <= W; x += 40) {
    ctx.lineTo(x, H * 0.58 + Math.sin(x * 0.005) * 40 + Math.cos(x * 0.012) * 20);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  ctx.fillStyle = '#8FBF7F';
  ctx.beginPath();
  ctx.moveTo(0, H * 0.62);
  for (let x = 0; x <= W; x += 40) {
    ctx.lineTo(x, H * 0.62 + Math.sin(x * 0.007) * 32 + Math.cos(x * 0.013) * 16);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  const hillGrad = ctx.createLinearGradient(0, H * 0.68, 0, H * 0.82);
  hillGrad.addColorStop(0, '#7CB868');
  hillGrad.addColorStop(1, '#6DAE55');
  ctx.fillStyle = hillGrad;
  ctx.beginPath();
  ctx.moveTo(0, H * 0.70);
  for (let x = 0; x <= W; x += 30) {
    ctx.lineTo(x, H * 0.70 + Math.sin(x * 0.011 + 1.5) * 20 + Math.cos(x * 0.019) * 10);
  }
  ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();

  // Distant trees
  for (let i = 0; i < 8; i++) {
    const tx = W * (0.06 + i * 0.13);
    const ty = H * 0.66 + Math.sin(i * 2.3) * 10;
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(tx - 2, ty, 4, 16);
    const treeGrad = ctx.createRadialGradient(tx, ty - 4, 0, tx, ty - 4, 14);
    treeGrad.addColorStop(0, '#5BAF3A');
    treeGrad.addColorStop(1, '#388E3C');
    ctx.fillStyle = treeGrad;
    ctx.beginPath(); ctx.arc(tx, ty - 4, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.arc(tx - 3, ty - 7, 5, 0, Math.PI * 2); ctx.fill();
  }

  // Grass floor (richer gradient)
  const grass = ctx.createLinearGradient(0, groundY - 10, 0, H);
  grass.addColorStop(0, '#72C44D');
  grass.addColorStop(0.05, '#6DBF47');
  grass.addColorStop(0.2, '#5BAF3A');
  grass.addColorStop(0.6, '#4E9E30');
  grass.addColorStop(1, '#3D8A25');
  ctx.fillStyle = grass;
  ctx.fillRect(0, groundY - 4, W, H - groundY + 4);

  // Grass tufts (varied)
  for (let x = 0; x < W; x += 10) {
    const h = 4 + Math.sin(x * 0.4) * 2.5 + Math.sin(x * 0.17 + 2) * 1.5;
    ctx.fillStyle = x % 20 < 10 ? '#5BAF3A' : '#4DA032';
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.lineTo(x + 2, groundY - h);
    ctx.lineTo(x + 4.5, groundY);
    ctx.fill();
  }

  // Flowers (animated sway)
  for (const f of bgFlowers) {
    const sway = Math.sin(bgTime * 1.2 + f.phase) * 1.5;
    ctx.fillStyle = f.c;
    ctx.globalAlpha = 0.8;
    ctx.beginPath(); ctx.arc(f.x + sway, f.y, f.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.arc(f.x + sway - f.r * 0.2, f.y - f.r * 0.2, f.r * 0.4, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Dirt edge
  ctx.fillStyle = '#8B6E2F';
  ctx.fillRect(0, groundY - 5, W, 3);
  ctx.fillStyle = '#9E8040';
  ctx.fillRect(0, groundY - 4, W, 1);

  // Fence
  ctx.strokeStyle = '#8D6E63';
  ctx.lineWidth = 3;
  for (let x = 30; x < W; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, groundY - 2); ctx.lineTo(x, groundY - 24); ctx.stroke();
    ctx.fillStyle = '#A1887F';
    ctx.beginPath(); ctx.arc(x, groundY - 24, 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = '#A1887F';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, groundY - 18); ctx.lineTo(W, groundY - 18); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, groundY - 10); ctx.lineTo(W, groundY - 10); ctx.stroke();

  // Butterflies
  for (const bf of bgButterflies) {
    const wingA = Math.sin(bgTime * 6 + bf.phase) * 0.5;
    ctx.save();
    ctx.translate(bf.x, bf.y);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = bf.c;
    ctx.beginPath();
    ctx.ellipse(-4, 0, 5 * Math.abs(Math.cos(wingA)), 3, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(4, 0, 5 * Math.abs(Math.cos(wingA)), 3, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.fillRect(-0.5, -2, 1, 4);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ── Word bodies ──
  for (const b of bodies) {
    ctx.save();
    ctx.translate(b.x + b.w / 2, b.y + b.h / 2);
    ctx.rotate(b.rot);
    const sx = 1 + (1 - b.squash) * 0.3;
    const sy = b.squash;
    ctx.scale(sx, sy);

    const hw = b.w / 2, hh = b.h / 2;

    // Drop shadow
    ctx.save();
    ctx.translate(3, 4);
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#000';
    drawWordShape(-hw, -hh, b.w, b.h, b.shape);
    ctx.fill();
    ctx.restore();

    // Main fill
    ctx.globalAlpha = 0.96;
    ctx.fillStyle = b.color;
    drawWordShape(-hw, -hh, b.w, b.h, b.shape);
    ctx.fill();

    // Gradient overlay (highlight top, darken bottom)
    ctx.save();
    drawWordShape(-hw, -hh, b.w, b.h, b.shape);
    ctx.clip();
    const hlGrad = ctx.createLinearGradient(0, -hh, 0, hh);
    hlGrad.addColorStop(0, 'rgba(255,255,255,0.32)');
    hlGrad.addColorStop(0.4, 'rgba(255,255,255,0.08)');
    hlGrad.addColorStop(0.6, 'rgba(0,0,0,0)');
    hlGrad.addColorStop(1, 'rgba(0,0,0,0.14)');
    ctx.fillStyle = hlGrad;
    ctx.fillRect(-hw, -hh, b.w, b.h);
    ctx.restore();

    // Border
    ctx.globalAlpha = 1;
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.28)';
    drawWordShape(-hw, -hh, b.w, b.h, b.shape);
    ctx.stroke();

    // Inner highlight edge
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    drawWordShape(-hw + 3, -hh + 3, b.w - 6, b.h - 6, b.shape);
    ctx.stroke();

    // Text with outline
    ctx.globalAlpha = 1;
    ctx.font = `bold ${b.fontSize}px Quicksand, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 3.5;
    ctx.strokeText(b.text, 0, 1);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 1;
    ctx.fillText(b.text, 0, 1);
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
  ctx.scale(hero.dir * HERO_SCALE, HERO_SCALE);

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
  ctx.moveTo(-8, 26 + Math.max(0, lSwing));
  ctx.lineTo(-1, 26 + Math.max(0, lSwing));
  ctx.lineTo(-1, 29 + Math.max(0, lSwing));
  ctx.lineTo(-8, 29 + Math.max(0, lSwing));
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(2, 26 + Math.max(0, -lSwing));
  ctx.lineTo(9, 26 + Math.max(0, -lSwing));
  ctx.lineTo(9, 29 + Math.max(0, -lSwing));
  ctx.lineTo(2, 29 + Math.max(0, -lSwing));
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
  // Body highlight
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath();
  ctx.ellipse(-3, -4, 8, 12, -0.2, 0, Math.PI * 2);
  ctx.fill();

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
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  ctx.moveTo(-6, -16);
  ctx.lineTo(0, -34);
  ctx.lineTo(2, -16);
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
