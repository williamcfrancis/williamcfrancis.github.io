import * as THREE from 'three';
import {
  initAudio, shootSound, hitSound, deathSound,
  forgeCompleteSound, playerHitSound,
} from './audio.js';

// ─────────────────────────── Constants ───────────────────────────
const ISLAND_RADIUS = 18;
const PLAYER_SPEED = 0.16;
const PLAYER_MAX_HP = 100;
const FIRE_COOLDOWN_BASE = 180;
const ENEMY_BASE_COUNT = 6;
const ENEMY_PER_WAVE = 3;
const IFRAMES_DURATION = 800;
const SPAWN_EDGE = ISLAND_RADIUS + 3;

// ─────────────────────────── State ───────────────────────────────
const state = {
  playerPos: new THREE.Vector3(0, 0, 0),
  playerHp: PLAYER_MAX_HP,
  iframesUntil: 0,

  weapon: {
    speed: 1.0,
    damage: 40,
    scale: 1.0,
    bounces: 0,
    audioFreq: 520,
    audioType: 'sine',
    spriteTex: null,
    name: 'Starter Orb',
  },

  score: 0,
  kills: 0,
  wave: 0,
  enemiesRemaining: 0,
  waveActive: false,

  enemies: [],
  projectiles: [],
  particles: [],
  clouds: [],

  keys: {},
  mouse: new THREE.Vector2(),
  mouseWorld: new THREE.Vector3(),
  mouseDown: false,
  lastShot: 0,

  paused: false,
  gameOver: false,
  started: false,
  shakeUntil: 0,
  shakeMag: 0,
};

// ─────────────────────────── Refs ────────────────────────────────
const $ = (s) => document.querySelector(s);
const els = {
  canvas: $('#game-canvas-container'),
  titleScreen: $('#title-screen'),
  hud: $('#hud'),
  hpFill: $('#hp-fill'),
  hpText: $('#hp-text'),
  scoreText: $('#score-text'),
  waveText: $('#wave-text'),
  weaponName: $('#weapon-name'),
  weaponDot: $('#weapon-dot'),
  waveBanner: $('#wave-banner'),
  forgeOverlay: $('#forge-overlay'),
  forgeInput: $('#forge-input'),
  forgeBtn: $('#btn-forge'),
  forgeStatus: $('#forge-status'),
  btnResume: $('#btn-resume'),
  gameoverScreen: $('#gameover-screen'),
  statScore: $('#stat-score'),
  statWave: $('#stat-wave'),
  statKills: $('#stat-kills'),
};

// ─────────────────────────── Three.js Setup ──────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9FD5E8);
scene.fog = new THREE.FogExp2(0x9FD5E8, 0.012);

const camera = new THREE.PerspectiveCamera(
  48, window.innerWidth / window.innerHeight, 0.1, 120,
);
camera.position.set(0, 28, 22);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
els.canvas.appendChild(renderer.domElement);

// ─────────────────────────── Lighting ────────────────────────────
const sun = new THREE.DirectionalLight(0xFFF5E0, 1.6);
sun.position.set(12, 22, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -26;
sun.shadow.camera.right = 26;
sun.shadow.camera.top = 26;
sun.shadow.camera.bottom = -26;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 60;
sun.shadow.bias = -0.001;
scene.add(sun);

scene.add(new THREE.AmbientLight(0xFFE8D6, 0.55));
scene.add(new THREE.HemisphereLight(0x87CEEB, 0x6B8E23, 0.35));

// ─────────────────────────── World ───────────────────────────────
function buildWorld() {
  // Island top
  const topGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, 1.2, 48);
  const topMat = new THREE.MeshStandardMaterial({ color: 0x7EC850, roughness: 0.85 });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = -0.6;
  top.receiveShadow = true;
  scene.add(top);

  // Island sides
  const sideGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS - 3, 4, 48);
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x8B6E2F, roughness: 0.92 });
  const side = new THREE.Mesh(sideGeo, sideMat);
  side.position.y = -3.2;
  scene.add(side);

  // Underside cone
  const coneGeo = new THREE.ConeGeometry(ISLAND_RADIUS - 3, 6, 48);
  const cone = new THREE.Mesh(coneGeo, sideMat);
  cone.position.y = -8.2;
  cone.rotation.x = Math.PI;
  scene.add(cone);

  // Grass tufts
  const grassColors = [0x6DBF47, 0x85D660, 0x55A630];
  for (let i = 0; i < 60; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * (ISLAND_RADIUS - 1.5);
    const geo = new THREE.ConeGeometry(0.12, 0.35 + Math.random() * 0.25, 4);
    const mat = new THREE.MeshStandardMaterial({
      color: grassColors[Math.floor(Math.random() * 3)],
      roughness: 0.8,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(a) * r, 0.15, Math.sin(a) * r);
    scene.add(m);
  }

  // Flowers
  const flowerColors = [0xFF69B4, 0xFFB7C5, 0xDDA0DD, 0xFFD700, 0xFFA07A, 0xFF6F61];
  for (let i = 0; i < 35; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * (ISLAND_RADIUS - 3);
    const geo = new THREE.SphereGeometry(0.12 + Math.random() * 0.08, 6, 6);
    const mat = new THREE.MeshStandardMaterial({
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
      roughness: 0.5,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(a) * r, 0.12, Math.sin(a) * r);
    scene.add(m);
  }

  // Clouds
  for (let i = 0; i < 10; i++) {
    const g = new THREE.Group();
    const cMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 1, transparent: true, opacity: 0.7 });
    const blobs = 2 + Math.floor(Math.random() * 3);
    for (let j = 0; j < blobs; j++) {
      const s = 1.2 + Math.random() * 2.0;
      const geo = new THREE.SphereGeometry(s, 8, 8);
      const m = new THREE.Mesh(geo, cMat);
      m.position.set(j * 1.6 - blobs * 0.8, Math.random() * 0.5, Math.random() * 0.8);
      m.scale.y = 0.5;
      g.add(m);
    }
    g.position.set(
      -40 + Math.random() * 80,
      14 + Math.random() * 8,
      -30 + Math.random() * 60,
    );
    scene.add(g);
    state.clouds.push({ mesh: g, speed: 0.005 + Math.random() * 0.01 });
  }
}

// ─────────────────────────── Player ──────────────────────────────
let playerGroup;

function buildPlayer() {
  playerGroup = new THREE.Group();

  // Body
  const bodyGeo = new THREE.CapsuleGeometry(0.42, 0.55, 8, 16);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x98D8C8, roughness: 0.4 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  playerGroup.add(body);

  // Hat (little leaf)
  const hatGeo = new THREE.ConeGeometry(0.25, 0.35, 6);
  const hatMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
  const hat = new THREE.Mesh(hatGeo, hatMat);
  hat.position.y = 0.65;
  playerGroup.add(hat);

  // Eyes
  const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(s * 0.16, 0.18, 0.38);
    playerGroup.add(eye);
  });

  // Cheeks
  const cheekGeo = new THREE.SphereGeometry(0.06, 6, 6);
  const cheekMat = new THREE.MeshStandardMaterial({ color: 0xFFB7B2, emissive: 0xFFB7B2, emissiveIntensity: 0.3 });
  [-1, 1].forEach((s) => {
    const c = new THREE.Mesh(cheekGeo, cheekMat);
    c.position.set(s * 0.28, 0.06, 0.34);
    playerGroup.add(c);
  });

  playerGroup.position.set(0, 0.7, 0);
  scene.add(playerGroup);
}

// ─────────────────────────── Enemies ─────────────────────────────
const SLIME_DEFS = [
  { weight: 0.55, radius: 0.45, hp: 30, speed: 0.04, dmg: 8, color: 0x90EE90, name: 'sprout' },
  { weight: 0.30, radius: 0.65, hp: 70, speed: 0.028, dmg: 14, color: 0xFFCC80, name: 'gourd' },
  { weight: 0.15, radius: 0.90, hp: 140, speed: 0.018, dmg: 22, color: 0xCE93D8, name: 'bloom' },
];

function pickSlimeDef() {
  let r = Math.random();
  for (const d of SLIME_DEFS) {
    r -= d.weight;
    if (r <= 0) return d;
  }
  return SLIME_DEFS[0];
}

function spawnEnemy() {
  const def = pickSlimeDef();
  const angle = Math.random() * Math.PI * 2;
  const g = new THREE.Group();

  // Body
  const bodyGeo = new THREE.SphereGeometry(def.radius, 16, 12);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: def.color, roughness: 0.35, metalness: 0.05,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.scale.y = 0.78;
  g.add(body);

  // Eyes
  const er = def.radius * 0.2;
  const eyeGeo = new THREE.SphereGeometry(er, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const whiteGeo = new THREE.SphereGeometry(er * 0.5, 6, 6);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.4 });
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(eyeGeo, eyeMat);
    e.position.set(s * def.radius * 0.32, def.radius * 0.15, def.radius * 0.72);
    g.add(e);
    const w = new THREE.Mesh(whiteGeo, whiteMat);
    w.position.set(s * def.radius * 0.32 + er * 0.2, def.radius * 0.25, def.radius * 0.78);
    g.add(w);
  });

  // Mouth
  const mouthGeo = new THREE.TorusGeometry(def.radius * 0.15, 0.03, 6, 12, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -def.radius * 0.05, def.radius * 0.75);
  mouth.rotation.x = -0.3;
  mouth.rotation.z = Math.PI;
  g.add(mouth);

  g.position.set(
    Math.cos(angle) * SPAWN_EDGE,
    def.radius * 0.78,
    Math.sin(angle) * SPAWN_EDGE,
  );

  scene.add(g);

  const waveScale = 1 + (state.wave - 1) * 0.12;
  state.enemies.push({
    mesh: g,
    body,
    hp: Math.round(def.hp * waveScale),
    maxHp: Math.round(def.hp * waveScale),
    speed: def.speed + state.wave * 0.002,
    radius: def.radius,
    contactDmg: Math.round(def.dmg + state.wave * 1.5),
    phase: Math.random() * Math.PI * 2,
    flashUntil: 0,
    originalColor: def.color,
  });
}

// ─────────────────────────── Projectiles ─────────────────────────
function fireProjectile() {
  const now = performance.now();
  const cooldown = FIRE_COOLDOWN_BASE / Math.max(state.weapon.speed, 0.3);
  if (now - state.lastShot < cooldown) return;
  state.lastShot = now;

  const dir = new THREE.Vector3()
    .subVectors(state.mouseWorld, state.playerPos)
    .setY(0)
    .normalize();
  if (dir.length() < 0.01) dir.set(0, 0, -1);

  const s = state.weapon.scale;
  let mesh;
  if (state.weapon.spriteTex) {
    const mat = new THREE.SpriteMaterial({ map: state.weapon.spriteTex, transparent: true });
    mesh = new THREE.Sprite(mat);
    mesh.scale.set(s * 1.2, s * 1.2, 1);
  } else {
    const geo = new THREE.SphereGeometry(0.22 * s, 10, 10);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xFFD54F, emissive: 0xFFA000, emissiveIntensity: 0.5, roughness: 0.25,
    });
    mesh = new THREE.Mesh(geo, mat);
  }

  mesh.position.copy(state.playerPos);
  mesh.position.y = 0.6;
  scene.add(mesh);

  shootSound(state.weapon.audioFreq, state.weapon.audioType);

  state.projectiles.push({
    mesh,
    vel: dir.clone().multiplyScalar(0.35 * state.weapon.speed),
    damage: state.weapon.damage,
    radius: 0.22 * s,
    bouncesLeft: state.weapon.bounces,
    life: 400,
  });
}

// ─────────────────────────── Particles ───────────────────────────
function spawnBurst(pos, color, count = 8) {
  for (let i = 0; i < count; i++) {
    const geo = new THREE.SphereGeometry(0.08 + Math.random() * 0.08, 4, 4);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5 });
    const m = new THREE.Mesh(geo, mat);
    m.position.copy(pos);
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      0.1 + Math.random() * 0.2,
      (Math.random() - 0.5) * 0.3,
    );
    scene.add(m);
    state.particles.push({ mesh: m, vel: v, life: 40 + Math.random() * 30 });
  }
}

// ─────────────────────────── Collision ────────────────────────────
function dist2D(a, b) {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

function updateProjectiles() {
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.mesh.position.add(p.vel);
    p.life--;

    // Island boundary bounce or destroy
    const pDist = dist2D(p.mesh.position, new THREE.Vector3(0, 0, 0));
    if (pDist > ISLAND_RADIUS) {
      if (p.bouncesLeft > 0) {
        p.bouncesLeft--;
        const norm = new THREE.Vector3(p.mesh.position.x, 0, p.mesh.position.z).normalize();
        const dot = p.vel.dot(norm);
        p.vel.sub(norm.multiplyScalar(2 * dot));
        const clamp = ISLAND_RADIUS - 0.2;
        const angle = Math.atan2(p.mesh.position.z, p.mesh.position.x);
        p.mesh.position.x = Math.cos(angle) * clamp;
        p.mesh.position.z = Math.sin(angle) * clamp;
      } else {
        p.life = 0;
      }
    }

    // Enemy hit check
    for (let j = state.enemies.length - 1; j >= 0; j--) {
      const e = state.enemies[j];
      if (dist2D(p.mesh.position, e.mesh.position) < p.radius + e.radius) {
        e.hp -= p.damage;
        e.flashUntil = performance.now() + 100;
        hitSound();
        spawnBurst(e.mesh.position, 0xFFFFFF, 4);

        if (e.hp <= 0) {
          deathSound();
          spawnBurst(e.mesh.position, e.originalColor, 12);
          scene.remove(e.mesh);
          state.enemies.splice(j, 1);
          state.score += 100 + state.wave * 10;
          state.kills++;
          state.enemiesRemaining--;
        }
        p.life = 0;
        break;
      }
    }

    if (p.life <= 0) {
      scene.remove(p.mesh);
      state.projectiles.splice(i, 1);
    }
  }
}

function updateEnemies() {
  const now = performance.now();
  for (const e of state.enemies) {
    // Move toward player
    const dir = new THREE.Vector3()
      .subVectors(state.playerPos, e.mesh.position)
      .setY(0)
      .normalize();
    e.mesh.position.addScaledVector(dir, e.speed);

    // Bounce animation
    e.phase += 0.07;
    e.mesh.position.y = e.radius * 0.78 + Math.abs(Math.sin(e.phase)) * 0.35;

    // Squash-stretch on bounce
    const t = Math.sin(e.phase);
    e.body.scale.y = 0.78 + t * 0.12;
    e.body.scale.x = 1.0 - t * 0.06;
    e.body.scale.z = 1.0 - t * 0.06;

    // Face player
    e.mesh.lookAt(state.playerPos.x, e.mesh.position.y, state.playerPos.z);

    // Flash white when hit
    if (now < e.flashUntil) {
      e.body.material.emissive.setHex(0xFFFFFF);
      e.body.material.emissiveIntensity = 0.6;
    } else {
      e.body.material.emissive.setHex(0x000000);
      e.body.material.emissiveIntensity = 0;
    }

    // Contact damage
    if (dist2D(e.mesh.position, state.playerPos) < e.radius + 0.5) {
      if (now > state.iframesUntil) {
        state.playerHp -= e.contactDmg;
        state.iframesUntil = now + IFRAMES_DURATION;
        state.shakeUntil = now + 200;
        state.shakeMag = 0.4;
        playerHitSound();
        spawnBurst(state.playerPos, 0xFF6F61, 6);
      }
    }
  }
}

function updateParticles() {
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const p = state.particles[i];
    p.mesh.position.add(p.vel);
    p.vel.y -= 0.008;
    p.life--;
    p.mesh.scale.multiplyScalar(0.96);
    if (p.life <= 0) {
      scene.remove(p.mesh);
      state.particles.splice(i, 1);
    }
  }
}

// ─────────────────────────── Input ───────────────────────────────
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function onMouseMove(e) {
  state.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  state.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(state.mouse, camera);
  const hit = new THREE.Vector3();
  raycaster.ray.intersectPlane(groundPlane, hit);
  if (hit) state.mouseWorld.copy(hit);
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mousedown', (e) => { if (e.button === 0) state.mouseDown = true; });
window.addEventListener('mouseup', (e) => { if (e.button === 0) state.mouseDown = false; });
window.addEventListener('keydown', (e) => {
  state.keys[e.key.toLowerCase()] = true;
  if (e.key === ' ' && state.started && !state.gameOver) {
    e.preventDefault();
    toggleForge();
  }
});
window.addEventListener('keyup', (e) => { state.keys[e.key.toLowerCase()] = false; });
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener('contextmenu', (e) => e.preventDefault());

// ─────────────────────────── Movement ────────────────────────────
function updatePlayer() {
  const dir = new THREE.Vector3();
  if (state.keys['w'] || state.keys['arrowup']) dir.z -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) dir.z += 1;
  if (state.keys['a'] || state.keys['arrowleft']) dir.x -= 1;
  if (state.keys['d'] || state.keys['arrowright']) dir.x += 1;

  if (dir.length() > 0) {
    dir.normalize().multiplyScalar(PLAYER_SPEED);
    state.playerPos.add(dir);

    // Clamp to island
    const d = dist2D(state.playerPos, new THREE.Vector3(0, 0, 0));
    if (d > ISLAND_RADIUS - 1) {
      const a = Math.atan2(state.playerPos.z, state.playerPos.x);
      state.playerPos.x = Math.cos(a) * (ISLAND_RADIUS - 1);
      state.playerPos.z = Math.sin(a) * (ISLAND_RADIUS - 1);
    }
  }

  playerGroup.position.set(state.playerPos.x, 0.7, state.playerPos.z);

  // Face mouse
  const angle = Math.atan2(
    state.mouseWorld.x - state.playerPos.x,
    state.mouseWorld.z - state.playerPos.z,
  );
  playerGroup.rotation.y = angle;

  // Iframes blink
  const now = performance.now();
  if (now < state.iframesUntil) {
    playerGroup.visible = Math.floor(now / 80) % 2 === 0;
  } else {
    playerGroup.visible = true;
  }

  // Auto-fire
  if (state.mouseDown) fireProjectile();
}

// ─────────────────────────── Camera ──────────────────────────────
function updateCamera() {
  const target = new THREE.Vector3(
    state.playerPos.x * 0.4,
    0,
    state.playerPos.z * 0.4,
  );
  const desired = new THREE.Vector3(target.x, 28, target.z + 22);
  camera.position.lerp(desired, 0.06);
  camera.lookAt(target);

  // Screen shake
  const now = performance.now();
  if (now < state.shakeUntil) {
    const intensity = state.shakeMag * ((state.shakeUntil - now) / 200);
    camera.position.x += (Math.random() - 0.5) * intensity;
    camera.position.y += (Math.random() - 0.5) * intensity * 0.5;
  }
}

// ─────────────────────────── Clouds ──────────────────────────────
function updateClouds() {
  for (const c of state.clouds) {
    c.mesh.position.x += c.speed;
    if (c.mesh.position.x > 50) c.mesh.position.x = -50;
  }
}

// ─────────────────────────── Waves ───────────────────────────────
function startWave() {
  state.wave++;
  state.waveActive = true;
  const count = ENEMY_BASE_COUNT + (state.wave - 1) * ENEMY_PER_WAVE;
  state.enemiesRemaining = count;

  els.waveBanner.textContent = `~ Wave ${state.wave} ~`;
  els.waveBanner.classList.add('visible');
  setTimeout(() => els.waveBanner.classList.remove('visible'), 2000);

  // Stagger spawns
  let spawned = 0;
  const spawnInterval = setInterval(() => {
    if (state.gameOver) { clearInterval(spawnInterval); return; }
    if (spawned >= count) { clearInterval(spawnInterval); return; }
    spawnEnemy();
    spawned++;
  }, 350);
}

function checkWave() {
  if (!state.waveActive) return;
  if (state.enemiesRemaining <= 0 && state.enemies.length === 0) {
    state.waveActive = false;
    state.score += state.wave * 200;
    setTimeout(() => { if (!state.gameOver) startWave(); }, 2500);
  }
}

// ─────────────────────────── HUD ─────────────────────────────────
function updateHUD() {
  const pct = Math.max(0, state.playerHp / PLAYER_MAX_HP * 100);
  els.hpFill.style.width = pct + '%';
  if (pct > 50) els.hpFill.style.background = 'linear-gradient(90deg,#81C784,#4CAF50)';
  else if (pct > 25) els.hpFill.style.background = 'linear-gradient(90deg,#FFD54F,#FFA726)';
  else els.hpFill.style.background = 'linear-gradient(90deg,#EF9A9A,#E53935)';
  els.hpText.textContent = `${Math.max(0, state.playerHp)} / ${PLAYER_MAX_HP}`;
  els.scoreText.textContent = state.score.toLocaleString();
  els.waveText.textContent = `Wave ${state.wave}`;
}

// ─────────────────────────── Forge ───────────────────────────────
function toggleForge() {
  if (state.gameOver) return;
  state.paused = !state.paused;
  els.forgeOverlay.style.display = state.paused ? 'flex' : 'none';
  if (state.paused) {
    els.forgeInput.focus();
  }
}

async function handleForge() {
  const text = els.forgeInput.value.trim();
  if (!text) return;

  els.forgeBtn.disabled = true;
  els.forgeStatus.textContent = 'Forging your weapon...';
  els.forgeStatus.className = 'forge-status';

  try {
    // 1. Get physics from Gemini via Netlify Function
    const res = await fetch('/.netlify/functions/forge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text }),
    });

    if (!res.ok) throw new Error('Forge API returned ' + res.status);
    const data = await res.json();
    const raw = data.result || '';

    // Parse LLM flags with regex
    const get = (key, fallback) => {
      const m = raw.match(new RegExp(`<${key}:\\s*([^>]+)>`));
      return m ? m[1].trim() : fallback;
    };

    const speed = parseFloat(get('speed', '1.0'));
    const damage = parseInt(get('damage', '40'), 10);
    const scale = parseFloat(get('scale', '1.0'));
    const bounces = parseInt(get('bounces', '0'), 10);
    const audioFreq = parseInt(get('audio_freq', '520'), 10);
    const audioType = get('audio_type', 'sine');

    state.weapon.speed = Math.max(0.1, Math.min(5, speed));
    state.weapon.damage = Math.max(10, Math.min(500, damage));
    state.weapon.scale = Math.max(0.5, Math.min(5, scale));
    state.weapon.bounces = Math.max(0, Math.min(5, bounces));
    state.weapon.audioFreq = Math.max(200, Math.min(1200, audioFreq));
    state.weapon.audioType = ['sine', 'triangle'].includes(audioType) ? audioType : 'sine';
    state.weapon.name = text.length > 28 ? text.slice(0, 25) + '...' : text;

    els.weaponName.textContent = state.weapon.name;

    // 2. Load sprite from Pollinations
    els.forgeStatus.textContent = 'Conjuring visuals...';
    loadWeaponSprite(text);

    forgeCompleteSound();
    els.forgeStatus.textContent = `Forged! SPD:${state.weapon.speed.toFixed(1)} DMG:${state.weapon.damage} BNC:${state.weapon.bounces}`;
    els.forgeStatus.className = 'forge-status success';
  } catch (err) {
    console.error(err);
    els.forgeStatus.textContent = 'Forge failed — using fallback parameters.';
    els.forgeStatus.className = 'forge-status error';

    // Fallback: deterministic params from text hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    hash = Math.abs(hash);
    state.weapon.speed = 0.5 + (hash % 40) / 10;
    state.weapon.damage = 20 + (hash % 200);
    state.weapon.scale = 0.5 + (hash % 30) / 10;
    state.weapon.bounces = hash % 4;
    state.weapon.audioFreq = 300 + (hash % 700);
    state.weapon.audioType = hash % 2 === 0 ? 'sine' : 'triangle';
    state.weapon.name = text.length > 28 ? text.slice(0, 25) + '...' : text;
    els.weaponName.textContent = state.weapon.name;

    loadWeaponSprite(text);
  }

  els.forgeBtn.disabled = false;
}

function loadWeaponSprite(prompt) {
  const encoded = encodeURIComponent(prompt.replace(/\s+/g, '+'));
  const url = `https://image.pollinations.ai/prompt/cute+vibrant+colorful+2D+pixel+art+${encoded}+item+game+sprite+isolated+on+solid+black+background`;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const cvs = document.createElement('canvas');
    cvs.width = img.width;
    cvs.height = img.height;
    const ctx = cvs.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const id = ctx.getImageData(0, 0, cvs.width, cvs.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] < 35 && d[i + 1] < 35 && d[i + 2] < 35) {
        d[i + 3] = 0;
      }
    }
    ctx.putImageData(id, 0, 0);

    const tex = new THREE.CanvasTexture(cvs);
    tex.needsUpdate = true;
    state.weapon.spriteTex = tex;
  };
  img.onerror = () => { state.weapon.spriteTex = null; };
  img.src = url;
}

// ─────────────────────────── Game Over ───────────────────────────
function triggerGameOver() {
  state.gameOver = true;
  state.paused = true;
  els.forgeOverlay.style.display = 'none';

  els.statScore.textContent = state.score.toLocaleString();
  els.statWave.textContent = state.wave;
  els.statKills.textContent = state.kills;
  els.gameoverScreen.style.display = 'flex';
}

function resetGame() {
  // Clear 3D objects
  [...state.enemies].forEach((e) => scene.remove(e.mesh));
  [...state.projectiles].forEach((p) => scene.remove(p.mesh));
  [...state.particles].forEach((p) => scene.remove(p.mesh));
  state.enemies.length = 0;
  state.projectiles.length = 0;
  state.particles.length = 0;

  state.playerPos.set(0, 0, 0);
  state.playerHp = PLAYER_MAX_HP;
  state.iframesUntil = 0;
  state.score = 0;
  state.kills = 0;
  state.wave = 0;
  state.waveActive = false;
  state.enemiesRemaining = 0;
  state.paused = false;
  state.gameOver = false;
  state.mouseDown = false;
  state.lastShot = 0;

  state.weapon = {
    speed: 1.0, damage: 40, scale: 1.0, bounces: 0,
    audioFreq: 520, audioType: 'sine', spriteTex: null, name: 'Starter Orb',
  };
  els.weaponName.textContent = 'Starter Orb';

  els.gameoverScreen.style.display = 'none';
  startWave();
}

// ─────────────────────────── Game Loop ───────────────────────────
function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (!state.started || state.paused) {
    renderer.render(scene, camera);
    updateClouds();
    return;
  }

  updatePlayer();
  updateEnemies();
  updateProjectiles();
  updateParticles();
  updateClouds();
  checkWave();
  updateHUD();
  updateCamera();

  if (state.playerHp <= 0 && !state.gameOver) {
    triggerGameOver();
  }

  renderer.render(scene, camera);
}

// ─────────────────────────── Init ────────────────────────────────
function startGame() {
  initAudio();
  state.started = true;
  els.titleScreen.style.display = 'none';
  els.hud.style.display = 'flex';
  startWave();
}

buildWorld();
buildPlayer();

$('#btn-start').addEventListener('click', startGame);
$('#btn-retry').addEventListener('click', resetGame);
els.forgeBtn.addEventListener('click', handleForge);
els.forgeInput.addEventListener('keydown', (e) => {
  e.stopPropagation();
  if (e.key === 'Enter') handleForge();
});
els.btnResume.addEventListener('click', toggleForge);

gameLoop();
