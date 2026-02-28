import * as THREE from 'three';
import {
  initAudio, dashSound, waveCompleteSound,
  startMusic, stopMusic, updateMusicIntensity,
  setVolumes, getVolumes,
} from './audio.js';
import {
  initParticlePool, updateParticles, updateShockwaves,
  createPollenSystem, updatePollen, initDamageNumbers,
  updateEnemyHpBars, clearAllVfx,
} from './vfx.js';
import {
  spawnEnemy, spawnBoss, updateEnemies, updateEnemyProjectiles,
  damageEnemy, clearEnemies,
} from './enemies.js';
import {
  trySpawnPickup, updatePickups, updateBuffs, clearPickups,
} from './pickups.js';
import {
  fireProjectile, updateProjectiles, handleForge, clearProjectiles,
  createDefaultWeapon,
} from './weapons.js';
import {
  updateHUD, updateBossHpBar, updateMinimap,
  initTutorial, updateTutorial,
  renderGallery, renderHighScores,
} from './hud.js';
import {
  getHighScores, saveHighScore, isNewBest, getWeaponGallery,
} from './persistence.js';

// ── Constants ──

const ISLAND_RADIUS = 18;
const PLAYER_SPEED = 0.16;
const PLAYER_MAX_HP = 100;
const ENEMY_BASE_COUNT = 6;
const ENEMY_PER_WAVE = 3;
const SPAWN_EDGE = ISLAND_RADIUS + 3;
const DASH_DURATION = 300;
const DASH_COOLDOWN = 1500;
const DASH_SPEED_MULT = 4;

// ── State ──

const state = {
  playerPos: new THREE.Vector3(0, 0, 0),
  playerHp: PLAYER_MAX_HP,
  iframesUntil: 0,
  dashCooldownUntil: 0,
  dashUntil: 0,
  dashDir: new THREE.Vector3(),
  moveDistance: 0,
  speedMultiplier: 1,
  damageMultiplier: 1,
  activeBuffs: [],

  weapons: [createDefaultWeapon()],
  activeWeaponIdx: 0,
  pollen: 1,
  forgeTargetSlot: null,

  score: 0,
  kills: 0,
  wave: 0,
  enemiesRemaining: 0,
  waveActive: false,
  isBossWave: false,
  boss: null,

  enemies: [],
  projectiles: [],
  enemyProjectiles: [],
  pickups: [],

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
  tutorialStep: 0,

  clouds: [],
  dt: 1 / 60,
  dt60: 1,
  _water: null,
  _grasses: [],
  _trees: [],
};

// ── DOM Refs ──

const $ = (s) => document.querySelector(s);
const els = {
  canvas: $('#game-canvas-container'),
  titleScreen: $('#title-screen'),
  hud: $('#hud'),
  hpFill: $('#hp-fill'),
  hpText: $('#hp-text'),
  scoreText: $('#score-text'),
  waveText: $('#wave-text'),
  pollenText: $('#pollen-text'),
  weaponSlots: $('#weapon-slots'),
  buffsContainer: $('#buffs-container'),
  dashCd: $('#dash-cd'),
  waveBanner: $('#wave-banner'),
  forgeOverlay: $('#forge-overlay'),
  forgeInput: $('#forge-input'),
  forgeBtn: $('#btn-forge'),
  forgeStatus: $('#forge-status'),
  btnResume: $('#btn-resume'),
  forgeSlotBtns: document.querySelectorAll('.forge-slot-btn'),
  gameoverScreen: $('#gameover-screen'),
  statScore: $('#stat-score'),
  statWave: $('#stat-wave'),
  statKills: $('#stat-kills'),
  newBestLabel: $('#new-best'),
  bossHpBar: $('#boss-hp-bar'),
  bossHpFill: $('#boss-hp-fill'),
  bossHpName: $('#boss-hp-name'),
  minimapCanvas: $('#minimap-canvas'),
  pauseOverlay: $('#pause-overlay'),
  settingsMaster: $('#vol-master'),
  settingsSfx: $('#vol-sfx'),
  settingsMusic: $('#vol-music'),
  galleryModal: $('#gallery-modal'),
  galleryGrid: $('#gallery-grid'),
  scoresModal: $('#scores-modal'),
  scoresList: $('#scores-list'),
  tutorialHint: $('#tutorial-hint'),
  touchControls: $('#touch-controls'),
};

// ── Three.js Setup ──

const skyCanvas = document.createElement('canvas');
skyCanvas.width = 2;
skyCanvas.height = 512;
const skyCtx = skyCanvas.getContext('2d');
const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 512);
skyGrad.addColorStop(0, '#4A90D9');
skyGrad.addColorStop(0.35, '#7EC8E3');
skyGrad.addColorStop(0.6, '#B5DFF0');
skyGrad.addColorStop(0.85, '#D4EDDA');
skyGrad.addColorStop(1.0, '#E8F5E9');
skyCtx.fillStyle = skyGrad;
skyCtx.fillRect(0, 0, 2, 512);
const skyTex = new THREE.CanvasTexture(skyCanvas);

const scene = new THREE.Scene();
scene.background = skyTex;
scene.fog = new THREE.FogExp2(0xB5DFF0, 0.009);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.set(0, 28, 22);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
els.canvas.appendChild(renderer.domElement);

// ── Lighting ──

const sun = new THREE.DirectionalLight(0xFFF5E0, 1.8);
sun.position.set(12, 24, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -26; sun.shadow.camera.right = 26;
sun.shadow.camera.top = 26; sun.shadow.camera.bottom = -26;
sun.shadow.camera.near = 1; sun.shadow.camera.far = 60;
sun.shadow.bias = -0.001;
sun.shadow.normalBias = 0.02;
scene.add(sun);
scene.add(new THREE.AmbientLight(0xFFE8D6, 0.5));
scene.add(new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.4));

const fillLight = new THREE.DirectionalLight(0xFFE0B2, 0.3);
fillLight.position.set(-10, 8, -8);
scene.add(fillLight);

// ── World ──

function buildWorld() {
  // ── Island surface with lush detail ──
  const topGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, 1.2, 64);
  const topMat = new THREE.MeshStandardMaterial({ color: 0x6DBF47, roughness: 0.82 });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = -0.6;
  top.receiveShadow = true;
  scene.add(top);

  // Grass rim ring for depth
  const rimGeo = new THREE.TorusGeometry(ISLAND_RADIUS - 0.15, 0.3, 8, 64);
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x4EA832, roughness: 0.9 });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.01;
  scene.add(rim);

  // Central clearing / spawning area
  const clearingGeo = new THREE.CircleGeometry(2.8, 32);
  const clearingMat = new THREE.MeshStandardMaterial({ color: 0x9B8B6B, roughness: 0.95 });
  const clearing = new THREE.Mesh(clearingGeo, clearingMat);
  clearing.rotation.x = -Math.PI / 2;
  clearing.position.y = 0.02;
  clearing.receiveShadow = true;
  scene.add(clearing);

  // Dirt side
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x8B6E2F, roughness: 0.92 });
  const sideGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS - 2, 3, 64);
  const side = new THREE.Mesh(sideGeo, sideMat);
  side.position.y = -2.7;
  scene.add(side);

  // Deeper earth layer
  const darkDirtMat = new THREE.MeshStandardMaterial({ color: 0x6B5220, roughness: 0.95 });
  const underGeo = new THREE.CylinderGeometry(ISLAND_RADIUS - 2, ISLAND_RADIUS - 4, 3, 48);
  const under = new THREE.Mesh(underGeo, darkDirtMat);
  under.position.y = -5.5;
  scene.add(under);

  const coneGeo = new THREE.ConeGeometry(ISLAND_RADIUS - 4, 5, 48);
  const cone = new THREE.Mesh(coneGeo, darkDirtMat);
  cone.position.y = -8.5;
  cone.rotation.x = Math.PI;
  scene.add(cone);

  // Dangling roots
  const rootMat = new THREE.MeshStandardMaterial({ color: 0x5D4037, roughness: 0.9 });
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2 + Math.random() * 0.3;
    const r = ISLAND_RADIUS - 3 + Math.random() * 2;
    const len = 1.2 + Math.random() * 2.5;
    const root = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.015, len, 4), rootMat);
    root.position.set(Math.cos(a) * r, -4 - len / 2, Math.sin(a) * r);
    root.rotation.z = (Math.random() - 0.5) * 0.5;
    root.rotation.x = (Math.random() - 0.5) * 0.4;
    scene.add(root);
  }

  // ── Water with gentle animation ──
  const waterGeo = new THREE.PlaneGeometry(200, 200, 1, 1);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x3BA8D8, transparent: true, opacity: 0.45,
    roughness: 0.05, metalness: 0.35,
  });
  state._water = new THREE.Mesh(waterGeo, waterMat);
  state._water.rotation.x = -Math.PI / 2;
  state._water.position.y = -9.5;
  scene.add(state._water);

  // Secondary water layer for depth
  const deepWaterGeo = new THREE.PlaneGeometry(200, 200, 1, 1);
  const deepWaterMat = new THREE.MeshStandardMaterial({
    color: 0x1B6CA8, transparent: true, opacity: 0.3,
    roughness: 0.1, metalness: 0.2,
  });
  const deepWater = new THREE.Mesh(deepWaterGeo, deepWaterMat);
  deepWater.rotation.x = -Math.PI / 2;
  deepWater.position.y = -10.5;
  scene.add(deepWater);

  // ── Grass tufts with wind animation data ──
  const grassColors = [0x6DBF47, 0x85D660, 0x55A630, 0x7BC850, 0x4E9E30];
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * (ISLAND_RADIUS - 2.5);
    const h = 0.25 + Math.random() * 0.35;
    const w = 0.06 + Math.random() * 0.06;
    const geo = new THREE.ConeGeometry(w, h, 4);
    const mat = new THREE.MeshStandardMaterial({
      color: grassColors[Math.floor(Math.random() * grassColors.length)], roughness: 0.8,
    });
    const m = new THREE.Mesh(geo, mat);
    const px = Math.cos(a) * r;
    const pz = Math.sin(a) * r;
    m.position.set(px, h / 2, pz);
    scene.add(m);
    state._grasses.push({ mesh: m, phase: Math.random() * Math.PI * 2 });
  }

  // ── Flowers with stems ──
  const flowerColors = [0xFF69B4, 0xFFB7C5, 0xDDA0DD, 0xFFD700, 0xFFA07A, 0xFF6F61, 0xE040FB, 0x81D4FA];
  const stemMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.8 });
  for (let i = 0; i < 45; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 2.5 + Math.random() * (ISLAND_RADIUS - 4);
    const stemH = 0.15 + Math.random() * 0.25;
    const px = Math.cos(a) * r;
    const pz = Math.sin(a) * r;

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.018, stemH, 4), stemMat);
    stem.position.set(px, stemH / 2, pz);
    scene.add(stem);

    const bloomR = 0.05 + Math.random() * 0.06;
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const petalMat = new THREE.MeshStandardMaterial({
      color, roughness: 0.4, emissive: color, emissiveIntensity: 0.08,
    });
    const petal = new THREE.Mesh(new THREE.SphereGeometry(bloomR, 6, 6), petalMat);
    petal.position.set(px, stemH + bloomR * 0.4, pz);
    scene.add(petal);

    if (Math.random() > 0.5) {
      const petal2 = new THREE.Mesh(new THREE.SphereGeometry(bloomR * 0.6, 5, 5), petalMat);
      petal2.position.set(px + bloomR * 0.6, stemH + bloomR * 0.1, pz);
      scene.add(petal2);
    }
  }

  // ── Trees with layered canopy ──
  const treePositions = [
    [ISLAND_RADIUS - 2.5, 3], [-ISLAND_RADIUS + 3.5, -2],
    [5, ISLAND_RADIUS - 2.5], [-4.5, -ISLAND_RADIUS + 2.5],
    [ISLAND_RADIUS - 5, -ISLAND_RADIUS + 6], [-ISLAND_RADIUS + 6, ISLAND_RADIUS - 5],
  ];
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6D4C41, roughness: 0.9 });
  const canopyColors = [0x4CAF50, 0x66BB6A, 0x43A047, 0x388E3C];
  for (const [tx, tz] of treePositions) {
    const trunkH = 1.0 + Math.random() * 0.5;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, trunkH, 6), trunkMat);
    trunk.position.set(tx, trunkH / 2, tz);
    trunk.castShadow = true;
    scene.add(trunk);

    const canopyGroup = new THREE.Group();
    const layers = 2 + Math.floor(Math.random() * 2);
    for (let j = 0; j < layers; j++) {
      const cr = 0.45 + Math.random() * 0.35;
      const cMat = new THREE.MeshStandardMaterial({
        color: canopyColors[j % canopyColors.length], roughness: 0.7,
      });
      const c = new THREE.Mesh(new THREE.SphereGeometry(cr, 8, 6), cMat);
      c.position.set((Math.random() - 0.5) * 0.4, j * 0.28, (Math.random() - 0.5) * 0.4);
      c.castShadow = true;
      canopyGroup.add(c);
    }
    canopyGroup.position.set(tx, trunkH + 0.25, tz);
    scene.add(canopyGroup);
    state._trees.push({ canopy: canopyGroup, phase: Math.random() * Math.PI * 2 });
  }

  // ── Stones / pebbles ──
  const stoneMats = [
    new THREE.MeshStandardMaterial({ color: 0x9E9E9E, roughness: 0.85 }),
    new THREE.MeshStandardMaterial({ color: 0x8D8D8D, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({ color: 0xA8A090, roughness: 0.88 }),
  ];
  for (let i = 0; i < 18; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * (ISLAND_RADIUS - 4);
    const s = 0.07 + Math.random() * 0.14;
    const geo = new THREE.DodecahedronGeometry(s, 0);
    const m = new THREE.Mesh(geo, stoneMats[Math.floor(Math.random() * stoneMats.length)]);
    m.position.set(Math.cos(a) * r, s * 0.3, Math.sin(a) * r);
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    scene.add(m);
  }

  // ── Mushrooms (quirky detail) ──
  const mushCapMat = new THREE.MeshStandardMaterial({ color: 0xE53935, roughness: 0.5, emissive: 0xE53935, emissiveIntensity: 0.05 });
  const mushStemMat = new THREE.MeshStandardMaterial({ color: 0xFFF8E1, roughness: 0.7 });
  const mushDotMat = new THREE.MeshStandardMaterial({ color: 0xFFF9C4, roughness: 0.4 });
  for (let i = 0; i < 6; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * (ISLAND_RADIUS - 6);
    const px = Math.cos(a) * r;
    const pz = Math.sin(a) * r;
    const scale = 0.6 + Math.random() * 0.5;

    const mStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * scale, 0.06 * scale, 0.15 * scale, 6), mushStemMat);
    mStem.position.set(px, 0.075 * scale, pz);
    scene.add(mStem);

    const mCap = new THREE.Mesh(new THREE.SphereGeometry(0.1 * scale, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), mushCapMat);
    mCap.position.set(px, 0.14 * scale, pz);
    scene.add(mCap);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02 * scale, 4, 4), mushDotMat);
    dot.position.set(px + 0.04 * scale, 0.18 * scale, pz + 0.02 * scale);
    scene.add(dot);
  }

  // ── Clouds ──
  for (let i = 0; i < 12; i++) {
    const g = new THREE.Group();
    const cMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF, roughness: 1, transparent: true, opacity: 0.72,
      emissive: 0xFFFFFF, emissiveIntensity: 0.04,
    });
    const blobs = 3 + Math.floor(Math.random() * 3);
    for (let j = 0; j < blobs; j++) {
      const s = 1.5 + Math.random() * 2.5;
      const geo = new THREE.SphereGeometry(s, 7, 6);
      const m = new THREE.Mesh(geo, cMat);
      m.position.set(j * 1.8 - blobs * 0.9, Math.random() * 0.6, Math.random() * 1.0);
      m.scale.y = 0.42;
      g.add(m);
    }
    g.position.set(-50 + Math.random() * 100, 15 + Math.random() * 10, -35 + Math.random() * 70);
    scene.add(g);
    state.clouds.push({ mesh: g, speed: 0.004 + Math.random() * 0.008 });
  }
}

// ── Player ──

let playerGroup;
let playerHat;
let playerShadow;

function buildPlayer() {
  playerGroup = new THREE.Group();

  const bodyGeo = new THREE.CapsuleGeometry(0.42, 0.55, 8, 16);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x98D8C8, roughness: 0.35, metalness: 0.05 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  playerGroup.add(body);

  // Leaf hat with sprout on top
  const hatGeo = new THREE.ConeGeometry(0.28, 0.32, 6);
  const hatMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.6 });
  playerHat = new THREE.Mesh(hatGeo, hatMat);
  playerHat.position.y = 0.65;
  playerGroup.add(playerHat);

  const sproutGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.15, 4);
  const sproutMat = new THREE.MeshStandardMaterial({ color: 0x66BB6A });
  const sprout = new THREE.Mesh(sproutGeo, sproutMat);
  sprout.position.y = 0.88;
  playerGroup.add(sprout);

  const leafGeo = new THREE.SphereGeometry(0.06, 5, 5);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x81C784, roughness: 0.5 });
  const leaf = new THREE.Mesh(leafGeo, leafMat);
  leaf.position.set(0.03, 0.96, 0);
  leaf.scale.set(1, 0.6, 1);
  playerGroup.add(leaf);

  // Eyes with shine
  const eyeGeo = new THREE.SphereGeometry(0.09, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
  const shineGeo = new THREE.SphereGeometry(0.03, 5, 5);
  const shineMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 });
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(s * 0.16, 0.2, 0.38);
    playerGroup.add(eye);
    const shine = new THREE.Mesh(shineGeo, shineMat);
    shine.position.set(s * 0.16 + 0.03, 0.24, 0.42);
    playerGroup.add(shine);
  });

  // Rosy cheeks
  const cheekGeo = new THREE.SphereGeometry(0.06, 6, 6);
  const cheekMat = new THREE.MeshStandardMaterial({ color: 0xFFB7B2, emissive: 0xFFB7B2, emissiveIntensity: 0.25 });
  [-1, 1].forEach((s) => {
    const c = new THREE.Mesh(cheekGeo, cheekMat);
    c.position.set(s * 0.28, 0.06, 0.34);
    playerGroup.add(c);
  });

  // Tiny smile
  const smileGeo = new THREE.TorusGeometry(0.06, 0.015, 4, 8, Math.PI);
  const smileMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
  const smile = new THREE.Mesh(smileGeo, smileMat);
  smile.position.set(0, 0.02, 0.4);
  smile.rotation.x = 0.2;
  playerGroup.add(smile);

  playerGroup.position.set(0, 0.7, 0);
  scene.add(playerGroup);

  // Shadow blob
  const shadowGeo = new THREE.CircleGeometry(0.45, 16);
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 });
  playerShadow = new THREE.Mesh(shadowGeo, shadowMat);
  playerShadow.rotation.x = -Math.PI / 2;
  playerShadow.position.y = 0.02;
  scene.add(playerShadow);
}

// ── Input ──

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

  if (!state.started || state.gameOver) return;

  if (e.key === ' ') {
    e.preventDefault();
    if (!state.paused) toggleForge();
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    if (els.forgeOverlay.style.display === 'flex') {
      toggleForge();
    } else {
      togglePause();
    }
  }

  // Weapon switching
  if (e.key >= '1' && e.key <= '3') {
    const idx = parseInt(e.key) - 1;
    if (idx < state.weapons.length) state.activeWeaponIdx = idx;
  }

  // Dash
  if (e.key === 'shift' && !state.paused) {
    tryDash();
  }
});

window.addEventListener('keyup', (e) => { state.keys[e.key.toLowerCase()] = false; });

window.addEventListener('wheel', (e) => {
  if (!state.started || state.paused || state.gameOver) return;
  if (e.deltaY > 0) {
    state.activeWeaponIdx = (state.activeWeaponIdx + 1) % state.weapons.length;
  } else {
    state.activeWeaponIdx = (state.activeWeaponIdx - 1 + state.weapons.length) % state.weapons.length;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('contextmenu', (e) => e.preventDefault());

// ── Mobile Touch Controls ──

let touchJoystick = { active: false, startX: 0, startY: 0, dx: 0, dy: 0 };
let touchFire = { active: false, x: 0, y: 0 };
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function initTouchControls() {
  if (!isMobile || !els.touchControls) return;
  els.touchControls.style.display = 'block';

  const leftZone = document.getElementById('touch-left');
  const rightZone = document.getElementById('touch-right');

  if (leftZone) {
    leftZone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      touchJoystick.active = true;
      touchJoystick.startX = t.clientX;
      touchJoystick.startY = t.clientY;
      touchJoystick.dx = 0; touchJoystick.dy = 0;
    });
    leftZone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      touchJoystick.dx = (t.clientX - touchJoystick.startX) / 50;
      touchJoystick.dy = (t.clientY - touchJoystick.startY) / 50;
      const len = Math.sqrt(touchJoystick.dx ** 2 + touchJoystick.dy ** 2);
      if (len > 1) { touchJoystick.dx /= len; touchJoystick.dy /= len; }
    });
    leftZone.addEventListener('touchend', () => {
      touchJoystick.active = false;
      touchJoystick.dx = 0; touchJoystick.dy = 0;
    });
  }

  if (rightZone) {
    rightZone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      touchFire.active = true;
      const t = e.changedTouches[0];
      touchFire.x = t.clientX; touchFire.y = t.clientY;
      updateTouchAim(t.clientX, t.clientY);
    });
    rightZone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      touchFire.x = t.clientX; touchFire.y = t.clientY;
      updateTouchAim(t.clientX, t.clientY);
    });
    rightZone.addEventListener('touchend', () => { touchFire.active = false; });
  }
}

function updateTouchAim(screenX, screenY) {
  state.mouse.x = (screenX / window.innerWidth) * 2 - 1;
  state.mouse.y = -(screenY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(state.mouse, camera);
  const hit = new THREE.Vector3();
  raycaster.ray.intersectPlane(groundPlane, hit);
  if (hit) state.mouseWorld.copy(hit);
}

// ── Dash ──

function tryDash() {
  const now = performance.now();
  if (now < state.dashCooldownUntil) return;

  const dir = new THREE.Vector3();
  if (state.keys['w'] || state.keys['arrowup']) dir.z -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) dir.z += 1;
  if (state.keys['a'] || state.keys['arrowleft']) dir.x -= 1;
  if (state.keys['d'] || state.keys['arrowright']) dir.x += 1;
  if (touchJoystick.active) { dir.x = touchJoystick.dx; dir.z = touchJoystick.dy; }
  if (dir.length() < 0.01) dir.set(0, 0, -1);
  dir.normalize();

  state.dashDir.copy(dir);
  state.dashUntil = now + DASH_DURATION;
  state.dashCooldownUntil = now + DASH_COOLDOWN;
  state.iframesUntil = Math.max(state.iframesUntil, now + DASH_DURATION);

  // Ghost effect
  const ghost = playerGroup.clone();
  ghost.traverse((c) => {
    if (c.isMesh) {
      c.material = c.material.clone();
      c.material.transparent = true;
      c.material.opacity = 0.4;
    }
  });
  ghost.position.copy(playerGroup.position);
  scene.add(ghost);
  let ghostLife = 15;
  const fadeGhost = () => {
    ghostLife--;
    ghost.traverse((c) => { if (c.isMesh) c.material.opacity *= 0.88; });
    if (ghostLife <= 0) {
      scene.remove(ghost);
    } else {
      requestAnimationFrame(fadeGhost);
    }
  };
  requestAnimationFrame(fadeGhost);

  dashSound();
}

// ── Player Update ──

const _playerDir = new THREE.Vector3();

function updatePlayer() {
  const now = performance.now();
  const dt60 = state.dt60;
  const isDashing = now < state.dashUntil;

  _playerDir.set(0, 0, 0);
  if (state.keys['w'] || state.keys['arrowup']) _playerDir.z -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) _playerDir.z += 1;
  if (state.keys['a'] || state.keys['arrowleft']) _playerDir.x -= 1;
  if (state.keys['d'] || state.keys['arrowright']) _playerDir.x += 1;

  if (touchJoystick.active) {
    _playerDir.x = touchJoystick.dx;
    _playerDir.z = touchJoystick.dy;
  }

  const isMoving = _playerDir.length() > 0.01;

  if (isDashing) {
    state.playerPos.addScaledVector(state.dashDir, PLAYER_SPEED * DASH_SPEED_MULT * dt60);
  } else if (isMoving) {
    _playerDir.normalize().multiplyScalar(PLAYER_SPEED * state.speedMultiplier * dt60);
    state.playerPos.add(_playerDir);
    state.moveDistance += PLAYER_SPEED * state.speedMultiplier * dt60;
  }

  // Clamp to island
  const d = Math.sqrt(state.playerPos.x ** 2 + state.playerPos.z ** 2);
  if (d > ISLAND_RADIUS - 1) {
    const a = Math.atan2(state.playerPos.z, state.playerPos.x);
    state.playerPos.x = Math.cos(a) * (ISLAND_RADIUS - 1);
    state.playerPos.z = Math.sin(a) * (ISLAND_RADIUS - 1);
  }

  // Run animation: bob + tilt
  const breathe = Math.sin(now * 0.003) * 0.015;
  let bobY = 0.7 + breathe;
  if (isMoving && !isDashing) {
    bobY += Math.sin(state.moveDistance * 8) * 0.06;
    const tilt = 0.08;
    playerGroup.rotation.z = Math.sin(state.moveDistance * 8) * tilt;
    if (playerHat) playerHat.rotation.z = Math.sin(state.moveDistance * 10) * 0.12;
  } else {
    playerGroup.rotation.z = 0;
    if (playerHat) playerHat.rotation.z = Math.sin(now * 0.002) * 0.03;
  }

  if (isDashing) {
    playerGroup.scale.set(0.8, 1.2, 0.8);
    if (playerHat) playerHat.rotation.z = Math.sin(now * 0.05) * 0.3;
  } else {
    const scaleBreath = 1 + Math.sin(now * 0.003) * 0.012;
    playerGroup.scale.set(scaleBreath, 1.0 / scaleBreath, scaleBreath);
  }

  playerGroup.position.set(state.playerPos.x, bobY, state.playerPos.z);

  // Shadow follows player
  if (playerShadow) {
    playerShadow.position.set(state.playerPos.x, 0.02, state.playerPos.z);
  }

  const angle = Math.atan2(
    state.mouseWorld.x - state.playerPos.x,
    state.mouseWorld.z - state.playerPos.z,
  );
  playerGroup.rotation.y = angle;

  if (now < state.iframesUntil) {
    playerGroup.visible = Math.floor(now / 80) % 2 === 0;
  } else {
    playerGroup.visible = true;
  }

  if (state.mouseDown || touchFire.active) fireProjectile(scene, state);
}

// ── Camera ──

const _camTarget = new THREE.Vector3();
const _camDesired = new THREE.Vector3();

function updateCamera() {
  const dt60 = state.dt60;
  _camTarget.set(state.playerPos.x * 0.4, 0, state.playerPos.z * 0.4);
  _camDesired.set(_camTarget.x, 28, _camTarget.z + 22);
  const lerpFactor = 1 - Math.pow(0.94, dt60);
  camera.position.lerp(_camDesired, lerpFactor);
  camera.lookAt(_camTarget);

  const now = performance.now();
  if (now < state.shakeUntil) {
    const intensity = state.shakeMag * ((state.shakeUntil - now) / 200);
    camera.position.x += (Math.random() - 0.5) * intensity;
    camera.position.y += (Math.random() - 0.5) * intensity * 0.5;
  }
}

// ── Clouds ──

function updateClouds() {
  const dt60 = state.dt60;
  for (const c of state.clouds) {
    c.mesh.position.x += c.speed * dt60;
    if (c.mesh.position.x > 55) c.mesh.position.x = -55;
  }
}

// ── World Animations (water, grass, trees) ──

function updateWorldAnimations() {
  const t = performance.now() * 0.001;
  const dt60 = state.dt60;

  if (state._water) {
    state._water.position.y = -9.5 + Math.sin(t * 0.5) * 0.12;
    state._water.material.opacity = 0.42 + Math.sin(t * 0.3) * 0.04;
  }

  for (const g of state._grasses) {
    g.phase += 0.018 * dt60;
    g.mesh.rotation.z = Math.sin(g.phase + g.mesh.position.x * 0.3) * 0.12;
    g.mesh.rotation.x = Math.cos(g.phase * 0.7 + g.mesh.position.z * 0.2) * 0.04;
  }

  for (const tr of state._trees) {
    tr.phase += 0.008 * dt60;
    tr.canopy.rotation.z = Math.sin(tr.phase) * 0.025;
    tr.canopy.rotation.x = Math.cos(tr.phase * 0.7) * 0.018;
  }
}

// ── Wave System ──

function startWave() {
  state.wave++;
  state.waveActive = true;
  state.pollen = Math.min(3, state.pollen + 1);

  updateMusicIntensity(state.wave, false);

  const isBoss = state.wave % 5 === 0;
  state.isBossWave = isBoss;

  const count = isBoss ? 0 : ENEMY_BASE_COUNT + (state.wave - 1) * ENEMY_PER_WAVE;
  state.enemiesRemaining = count;

  els.waveBanner.textContent = isBoss ? `~ BOSS: Wave ${state.wave} ~` : `~ Wave ${state.wave} ~`;
  els.waveBanner.classList.add('visible');
  setTimeout(() => els.waveBanner.classList.remove('visible'), 2000);

  if (isBoss) {
    setTimeout(() => {
      if (!state.gameOver) {
        spawnBoss(scene, state, SPAWN_EDGE);
        updateMusicIntensity(state.wave, true);
      }
    }, 1000);
  } else {
    let spawned = 0;
    const spawnInterval = setInterval(() => {
      if (state.gameOver) { clearInterval(spawnInterval); return; }
      if (spawned >= count) { clearInterval(spawnInterval); return; }
      spawnEnemy(scene, state, SPAWN_EDGE);
      spawned++;
    }, 350);
  }
}

function checkWave() {
  if (!state.waveActive) return;

  if (state.isBossWave) {
    if (!state.boss || state.boss.hp <= 0) {
      if (state.enemies.length === 0) {
        waveComplete();
      }
    }
  } else {
    if (state.enemiesRemaining <= 0 && state.enemies.length === 0) {
      waveComplete();
    }
  }
}

function waveComplete() {
  state.waveActive = false;
  state.isBossWave = false;
  state.score += state.wave * 200;
  waveCompleteSound();
  setTimeout(() => { if (!state.gameOver) startWave(); }, 2500);
}

// ── Forge Toggle ──

function toggleForge() {
  if (state.gameOver) return;
  state.paused = !state.paused;
  els.forgeOverlay.style.display = state.paused ? 'flex' : 'none';
  if (state.paused) {
    els.forgeInput.focus();
    state.forgeTargetSlot = state.activeWeaponIdx;
    updateForgeSlotButtons();
  }
}

function updateForgeSlotButtons() {
  els.forgeSlotBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === (state.forgeTargetSlot ?? state.activeWeaponIdx));
    if (i < state.weapons.length) {
      btn.textContent = `${i + 1}: ${state.weapons[i].name}`;
    } else if (i === state.weapons.length && state.weapons.length < 3) {
      btn.textContent = `${i + 1}: [New Slot]`;
    } else {
      btn.textContent = `${i + 1}: [Locked]`;
      btn.disabled = true;
    }
  });
}

// ── Pause ──

function togglePause() {
  if (state.gameOver) return;
  state.paused = !state.paused;
  if (els.pauseOverlay) {
    els.pauseOverlay.style.display = state.paused ? 'flex' : 'none';
  }
  if (state.paused) {
    const v = getVolumes();
    if (els.settingsMaster) els.settingsMaster.value = v.master;
    if (els.settingsSfx) els.settingsSfx.value = v.sfx;
    if (els.settingsMusic) els.settingsMusic.value = v.music;
  }
}

// ── Game Over ──

function triggerGameOver() {
  state.gameOver = true;
  state.paused = true;
  els.forgeOverlay.style.display = 'none';
  if (els.pauseOverlay) els.pauseOverlay.style.display = 'none';
  stopMusic();

  els.statScore.textContent = state.score.toLocaleString();
  els.statWave.textContent = state.wave;
  els.statKills.textContent = state.kills;

  const best = isNewBest(state.score);
  if (els.newBestLabel) els.newBestLabel.style.display = best ? 'block' : 'none';

  saveHighScore(state.score, state.wave, state.kills);
  els.gameoverScreen.style.display = 'flex';
}

function resetGame() {
  clearEnemies(state, scene);
  clearProjectiles(state, scene);
  clearPickups(state, scene);
  clearAllVfx(scene);

  state.playerPos.set(0, 0, 0);
  state.playerHp = PLAYER_MAX_HP;
  state.iframesUntil = 0;
  state.dashCooldownUntil = 0;
  state.dashUntil = 0;
  state.moveDistance = 0;
  state.speedMultiplier = 1;
  state.damageMultiplier = 1;
  state.activeBuffs.length = 0;
  state.score = 0;
  state.kills = 0;
  state.wave = 0;
  state.waveActive = false;
  state.isBossWave = false;
  state.boss = null;
  state.enemiesRemaining = 0;
  state.paused = false;
  state.gameOver = false;
  state.mouseDown = false;
  state.lastShot = 0;
  state.pollen = 1;
  state.dt = 1 / 60;
  state.dt60 = 1;

  state.weapons = [createDefaultWeapon()];
  state.activeWeaponIdx = 0;

  els.gameoverScreen.style.display = 'none';
  startMusic();
  startWave();
}

// ── Initialization ──

function startGame() {
  initAudio();
  state.started = true;
  els.titleScreen.style.display = 'none';
  els.hud.style.display = 'flex';
  if (els.weaponSlots) els.weaponSlots.style.display = 'flex';
  if (els.minimapCanvas) els.minimapCanvas.style.display = 'block';
  startMusic();
  initTutorial(state);
  startWave();
}

function quitToTitle() {
  state.paused = false;
  state.gameOver = true;
  stopMusic();
  clearEnemies(state, scene);
  clearProjectiles(state, scene);
  clearPickups(state, scene);
  clearAllVfx(scene);
  if (els.pauseOverlay) els.pauseOverlay.style.display = 'none';
  els.gameoverScreen.style.display = 'none';
  els.hud.style.display = 'none';
  if (els.weaponSlots) els.weaponSlots.style.display = 'none';
  if (els.minimapCanvas) els.minimapCanvas.style.display = 'none';
  els.titleScreen.style.display = 'flex';
  state.started = false;
}

buildWorld();
buildPlayer();
initParticlePool(scene);
initDamageNumbers();
createPollenSystem(scene);

if (isMobile) initTouchControls();

// ── Event Bindings ──

$('#btn-start').addEventListener('click', startGame);
$('#btn-retry').addEventListener('click', resetGame);
els.forgeBtn.addEventListener('click', () => handleForge(state, els));
els.forgeInput.addEventListener('keydown', (e) => {
  e.stopPropagation();
  if (e.key === 'Enter') handleForge(state, els);
});
els.btnResume.addEventListener('click', toggleForge);

// Forge slot buttons
els.forgeSlotBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    if (i <= state.weapons.length && i < 3) {
      state.forgeTargetSlot = i;
      updateForgeSlotButtons();
    }
  });
});

// Pause overlay
if ($('#btn-pause-resume')) $('#btn-pause-resume').addEventListener('click', togglePause);
if ($('#btn-pause-quit')) {
  $('#btn-pause-quit').addEventListener('click', quitToTitle);
}

// Volume sliders
if (els.settingsMaster) {
  els.settingsMaster.addEventListener('input', () => {
    setVolumes(
      parseFloat(els.settingsMaster.value),
      parseFloat(els.settingsSfx.value),
      parseFloat(els.settingsMusic.value),
    );
  });
}
if (els.settingsSfx) {
  els.settingsSfx.addEventListener('input', () => {
    setVolumes(
      parseFloat(els.settingsMaster.value),
      parseFloat(els.settingsSfx.value),
      parseFloat(els.settingsMusic.value),
    );
  });
}
if (els.settingsMusic) {
  els.settingsMusic.addEventListener('input', () => {
    setVolumes(
      parseFloat(els.settingsMaster.value),
      parseFloat(els.settingsSfx.value),
      parseFloat(els.settingsMusic.value),
    );
  });
}

// Title screen modals
if ($('#btn-gallery')) {
  $('#btn-gallery').addEventListener('click', () => {
    renderGallery(els.galleryGrid, getWeaponGallery());
    if (els.galleryModal) els.galleryModal.style.display = 'flex';
  });
}
if ($('#btn-close-gallery')) {
  $('#btn-close-gallery').addEventListener('click', () => {
    if (els.galleryModal) els.galleryModal.style.display = 'none';
  });
}
if ($('#btn-scores')) {
  $('#btn-scores').addEventListener('click', () => {
    renderHighScores(els.scoresList, getHighScores());
    if (els.scoresModal) els.scoresModal.style.display = 'flex';
  });
}
if ($('#btn-close-scores')) {
  $('#btn-close-scores').addEventListener('click', () => {
    if (els.scoresModal) els.scoresModal.style.display = 'none';
  });
}

// Mobile forge button
if ($('#btn-touch-forge')) {
  $('#btn-touch-forge').addEventListener('click', () => {
    if (state.started && !state.gameOver) toggleForge();
  });
}
if ($('#btn-touch-dash')) {
  $('#btn-touch-dash').addEventListener('click', tryDash);
}

function damageEnemyWithPickups(enemy, damage, st, sc, cam, isBounced) {
  const pos = enemy.mesh.position.clone();
  const wasBoss = enemy.isBoss;
  const killed = damageEnemy(enemy, damage, st, sc, cam, isBounced);
  if (killed) {
    trySpawnPickup(scene, pos, state, wasBoss ? 1.0 : 0.2);
  }
  return killed;
}

// ── Game Loop ──

let _lastFrameTime = 0;

function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);

  if (!_lastFrameTime) _lastFrameTime = timestamp;
  const rawDt = (timestamp - _lastFrameTime) / 1000;
  _lastFrameTime = timestamp;
  state.dt = Math.min(rawDt, 0.05);
  state.dt60 = state.dt * 60;

  if (!state.started || state.paused) {
    renderer.render(scene, camera);
    updateClouds();
    updateWorldAnimations();
    return;
  }

  updatePlayer();
  updateEnemies(state, scene, camera, ISLAND_RADIUS);
  updateEnemyProjectiles(state, scene, ISLAND_RADIUS);
  updateProjectiles(state, scene, ISLAND_RADIUS, damageEnemyWithPickups, camera);
  updatePickups(state, scene, PLAYER_MAX_HP);
  updateBuffs(state);
  updateParticles(state.dt60);
  updateShockwaves(state.dt60);
  updateEnemyHpBars(state.enemies, camera);
  updatePollen(state.dt60);
  updateClouds();
  updateWorldAnimations();
  checkWave();
  updateHUD(state, els, PLAYER_MAX_HP);
  updateBossHpBar(state, els);
  updateMinimap(els.minimapCanvas, state, ISLAND_RADIUS);
  updateTutorial(state);
  updateCamera();

  if (state.playerHp <= 0 && !state.gameOver) {
    triggerGameOver();
  }

  renderer.render(scene, camera);
}

requestAnimationFrame(gameLoop);
