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
import { startForgeAnimation, stopForgeAnimation } from './forge-bg.js';

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
  terrain: { walls: [], holes: [] },
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
skyGrad.addColorStop(0, '#3A7BC8');
skyGrad.addColorStop(0.15, '#4A90D9');
skyGrad.addColorStop(0.3, '#6AADE6');
skyGrad.addColorStop(0.45, '#8CC5EE');
skyGrad.addColorStop(0.6, '#B0D8F2');
skyGrad.addColorStop(0.72, '#C8E5E8');
skyGrad.addColorStop(0.82, '#D4EDDA');
skyGrad.addColorStop(0.92, '#E0F2E0');
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

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;
els.canvas.appendChild(renderer.domElement);

// ── Lighting (no shadows for performance) ──

const sun = new THREE.DirectionalLight(0xFFF5E0, 2.0);
sun.position.set(12, 24, 10);
scene.add(sun);
scene.add(new THREE.AmbientLight(0xFFE8D6, 0.7));
scene.add(new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.5));

const fillLight = new THREE.DirectionalLight(0xFFE0B2, 0.35);
fillLight.position.set(-10, 8, -8);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0xFFCCDD, 0.2);
rimLight.position.set(0, 4, -15);
scene.add(rimLight);

const warmGround = new THREE.PointLight(0xFFE8B0, 0.3, 30);
warmGround.position.set(0, 0.5, 0);
scene.add(warmGround);

// ── World ──

function buildWorld() {
  // Shared cheap materials
  const grassMat = new THREE.MeshLambertMaterial({ color: 0x6DBF47 });
  const dirtMat = new THREE.MeshLambertMaterial({ color: 0x8B6E2F });
  const darkDirtMat = new THREE.MeshLambertMaterial({ color: 0x6B5220 });

  // ── Island ──
  const top = new THREE.Mesh(new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, 1.2, 32), grassMat);
  top.position.y = -0.6;
  scene.add(top);

  const clearing = new THREE.Mesh(new THREE.CircleGeometry(2.5, 16), new THREE.MeshLambertMaterial({ color: 0x9B8B6B }));
  clearing.rotation.x = -Math.PI / 2;
  clearing.position.y = 0.02;
  scene.add(clearing);

  // Color rings for visual depth
  const ringDefs = [
    { inner: ISLAND_RADIUS - 2, outer: ISLAND_RADIUS, color: 0x55A630 },
    { inner: ISLAND_RADIUS - 5, outer: ISLAND_RADIUS - 2, color: 0x62B83C },
    { inner: ISLAND_RADIUS - 9, outer: ISLAND_RADIUS - 5, color: 0x6DBF47 },
    { inner: 6, outer: ISLAND_RADIUS - 9, color: 0x78C853 },
    { inner: 2.5, outer: 6, color: 0x7EC850 },
  ];
  ringDefs.forEach((rd, i) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(rd.inner, rd.outer, 32),
      new THREE.MeshLambertMaterial({ color: rd.color, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.012 + i * 0.001;
    scene.add(ring);
  });

  // Scattered ground patches (lighter/darker grass)
  const patchColors = [0x85D660, 0x55A630, 0x7EC850, 0x4CAF50, 0x8BD46A];
  for (let i = 0; i < 15; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * (ISLAND_RADIUS - 5);
    const patch = new THREE.Mesh(
      new THREE.CircleGeometry(0.6 + Math.random() * 1.2, 7),
      new THREE.MeshLambertMaterial({ color: patchColors[i % patchColors.length] }),
    );
    patch.rotation.x = -Math.PI / 2;
    patch.position.set(Math.cos(a) * r, 0.013, Math.sin(a) * r);
    scene.add(patch);
  }

  // Dirt path (winding from center outward)
  const pathMat = new THREE.MeshLambertMaterial({ color: 0xA89070 });
  for (let i = 0; i < 8; i++) {
    const t = i / 8;
    const pathAngle = t * Math.PI * 0.8 + 0.5;
    const pathR = 3 + t * 10;
    const pathPiece = new THREE.Mesh(new THREE.CircleGeometry(0.4 + t * 0.3, 6), pathMat);
    pathPiece.rotation.x = -Math.PI / 2;
    pathPiece.position.set(Math.cos(pathAngle) * pathR, 0.014, Math.sin(pathAngle) * pathR);
    scene.add(pathPiece);
  }

  const side = new THREE.Mesh(new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS - 2, 3, 32), dirtMat);
  side.position.y = -2.7;
  scene.add(side);

  const under = new THREE.Mesh(new THREE.CylinderGeometry(ISLAND_RADIUS - 2, ISLAND_RADIUS - 4, 3, 24), darkDirtMat);
  under.position.y = -5.5;
  scene.add(under);

  const cone = new THREE.Mesh(new THREE.ConeGeometry(ISLAND_RADIUS - 4, 5, 24), darkDirtMat);
  cone.position.y = -8.5;
  cone.rotation.x = Math.PI;
  scene.add(cone);

  // ── Water ──
  const waterMat = new THREE.MeshLambertMaterial({ color: 0x3BA8D8, transparent: true, opacity: 0.5 });
  state._water = new THREE.Mesh(new THREE.PlaneGeometry(300, 300), waterMat);
  state._water.rotation.x = -Math.PI / 2;
  state._water.position.y = -9.5;
  scene.add(state._water);

  // ── Grass tufts (reduced, shared geo+mat) ──
  const grassGeo = new THREE.ConeGeometry(0.08, 0.35, 3);
  const grassMats = [
    new THREE.MeshLambertMaterial({ color: 0x6DBF47 }),
    new THREE.MeshLambertMaterial({ color: 0x85D660 }),
    new THREE.MeshLambertMaterial({ color: 0x55A630 }),
  ];
  for (let i = 0; i < 30; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * (ISLAND_RADIUS - 3);
    const m = new THREE.Mesh(grassGeo, grassMats[i % 3]);
    m.position.set(Math.cos(a) * r, 0.17, Math.sin(a) * r);
    scene.add(m);
  }

  // ── Flowers (varied, with stems) ──
  const flowerColors = [0xFF69B4, 0xFFB7C5, 0xDDA0DD, 0xFFD700, 0xFFA07A, 0xFF6F61, 0xE040FB, 0x81D4FA, 0xFFAB91];
  const flowerMats = flowerColors.map(c => new THREE.MeshLambertMaterial({ color: c }));
  const stemMat = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
  const flowerGeo = new THREE.SphereGeometry(0.08, 4, 4);
  const stemGeo = new THREE.CylinderGeometry(0.01, 0.015, 0.2, 3);
  for (let i = 0; i < 28; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 3 + Math.random() * (ISLAND_RADIUS - 4);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.set(x, 0.1, z);
    scene.add(stem);
    const bloom = new THREE.Mesh(flowerGeo, flowerMats[i % flowerMats.length]);
    bloom.position.set(x, 0.22, z);
    const s = 0.8 + Math.random() * 0.6;
    bloom.scale.set(s, s * 0.7, s);
    scene.add(bloom);
  }

  // Small decorative mushrooms
  const mushroomCapMat = new THREE.MeshLambertMaterial({ color: 0xE53935 });
  const mushroomStemMat = new THREE.MeshLambertMaterial({ color: 0xFFF8E1 });
  const mushroomDotMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  for (let i = 0; i < 5; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 4 + Math.random() * (ISLAND_RADIUS - 6);
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const mStem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.12, 4), mushroomStemMat);
    mStem.position.set(x, 0.06, z);
    scene.add(mStem);
    const mCap = new THREE.Mesh(new THREE.SphereGeometry(0.08, 5, 4, 0, Math.PI * 2, 0, Math.PI / 2), mushroomCapMat);
    mCap.position.set(x, 0.12, z);
    scene.add(mCap);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 3, 3), mushroomDotMat);
    dot.position.set(x + 0.03, 0.16, z);
    scene.add(dot);
  }

  // ── Trees (4, simple) ──
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x6D4C41 });
  const canopyMat = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.2, 5);
  const canopyGeo = new THREE.SphereGeometry(0.8, 6, 5);
  const treePositions = [[ISLAND_RADIUS - 2, 3], [-ISLAND_RADIUS + 3, -2], [5, ISLAND_RADIUS - 2], [-4, -ISLAND_RADIUS + 2]];
  for (const [tx, tz] of treePositions) {
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(tx, 0.6, tz);
    scene.add(trunk);
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(tx, 1.6, tz);
    scene.add(canopy);
  }

  // ── Distant background scenery (mountains, floating islands) ──
  buildDistantScenery();

  // ── Clouds (far above play area, won't obscure view) ──
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
  const cloudGeo = new THREE.SphereGeometry(1, 5, 4);
  for (let i = 0; i < 8; i++) {
    const g = new THREE.Group();
    const blobs = 2 + Math.floor(Math.random() * 2);
    for (let j = 0; j < blobs; j++) {
      const m = new THREE.Mesh(cloudGeo, cloudMat);
      const s = 1.5 + Math.random() * 2;
      m.scale.set(s, s * 0.35, s);
      m.position.set(j * 2.2 - blobs, 0, Math.random() * 0.5);
      g.add(m);
    }
    g.position.set(-60 + Math.random() * 120, 35 + Math.random() * 15, -60 + Math.random() * 40);
    scene.add(g);
    state.clouds.push({ mesh: g, speed: 0.003 + Math.random() * 0.005 });
  }
}

function buildDistantScenery() {
  // Mountains around the horizon
  const mtColors = [0x6B8E7B, 0x5D7E6E, 0x7A9E8B, 0x4A6E5A, 0x8BAE9B];
  const mtGeo = new THREE.ConeGeometry(1, 1, 5);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
    const dist = 55 + Math.random() * 25;
    const height = 8 + Math.random() * 18;
    const width = 6 + Math.random() * 10;
    const mat = new THREE.MeshLambertMaterial({ color: mtColors[i % mtColors.length] });
    const mt = new THREE.Mesh(mtGeo, mat);
    mt.position.set(Math.cos(a) * dist, -9 + height * 0.3, Math.sin(a) * dist);
    mt.scale.set(width, height, width);
    scene.add(mt);

    if (Math.random() > 0.5) {
      const snowMat = new THREE.MeshBasicMaterial({ color: 0xE8F0E8, transparent: true, opacity: 0.6 });
      const snow = new THREE.Mesh(new THREE.ConeGeometry(1, 0.3, 5), snowMat);
      snow.position.set(Math.cos(a) * dist, -9 + height * 0.75, Math.sin(a) * dist);
      snow.scale.set(width * 0.5, height * 0.3, width * 0.5);
      scene.add(snow);
    }
  }

  // Distant floating mini-islands
  const miniIslandMat = new THREE.MeshLambertMaterial({ color: 0x7EC850 });
  const miniDirtMat = new THREE.MeshLambertMaterial({ color: 0x8B6E2F });
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 35 + Math.random() * 20;
    const y = -4 + Math.random() * 8;
    const sz = 1.5 + Math.random() * 2.5;
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(sz, sz, 0.5, 8), miniIslandMat));
    const sub = new THREE.Mesh(new THREE.ConeGeometry(sz * 0.8, sz * 1.5, 8), miniDirtMat);
    sub.position.y = -sz * 0.8;
    sub.rotation.x = Math.PI;
    g.add(sub);
    // Tiny tree on some
    if (Math.random() > 0.4) {
      const tt = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.5, 4), new THREE.MeshLambertMaterial({ color: 0x6D4C41 }));
      tt.position.y = 0.5;
      g.add(tt);
      const tc = new THREE.Mesh(new THREE.SphereGeometry(0.3, 4, 3), new THREE.MeshLambertMaterial({ color: 0x4CAF50 }));
      tc.position.y = 0.9;
      g.add(tc);
    }
    g.position.set(Math.cos(a) * dist, y, Math.sin(a) * dist);
    scene.add(g);
  }

  // Distant birds (simple V shapes)
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
  for (let i = 0; i < 4; i++) {
    const a = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 20;
    const g = new THREE.Group();
    [-1, 1].forEach(s => {
      const wing = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.05), birdMat);
      wing.rotation.z = s * 0.4;
      wing.position.x = s * 0.25;
      g.add(wing);
    });
    g.position.set(Math.cos(a) * dist, 12 + Math.random() * 10, Math.sin(a) * dist);
    g.rotation.y = Math.random() * Math.PI * 2;
    scene.add(g);
  }
}

// ── Terrain ──

const wallMats = [
  new THREE.MeshLambertMaterial({ color: 0x8B8682 }),
  new THREE.MeshLambertMaterial({ color: 0x7A7570 }),
  new THREE.MeshLambertMaterial({ color: 0x9C9488 }),
];
const wallTopMat = new THREE.MeshLambertMaterial({ color: 0x6D8B5E });

function addWall(x, z, hw, hd) {
  const dist = Math.sqrt(x * x + z * z);
  if (dist + Math.max(hw, hd) > ISLAND_RADIUS - 2) return;
  if (dist < 3) return;

  const height = 1.0 + Math.random() * 0.4;
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(hw * 2, height, hd * 2),
    wallMats[Math.floor(Math.random() * wallMats.length)],
  );
  body.position.y = height / 2;
  group.add(body);

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(hw * 2 + 0.1, 0.08, hd * 2 + 0.1),
    wallTopMat,
  );
  top.position.y = height + 0.04;
  group.add(top);

  if (Math.random() > 0.5) {
    const vineMat = new THREE.MeshLambertMaterial({ color: 0x4CAF50 });
    const vine = new THREE.Mesh(new THREE.SphereGeometry(0.12, 4, 3), vineMat);
    vine.position.set(hw * (Math.random() > 0.5 ? 1 : -1), height * 0.6, hd * (Math.random() > 0.5 ? 1 : -1));
    vine.scale.y = 1.5;
    group.add(vine);
  }

  group.position.set(x, 0, z);
  scene.add(group);
  state.terrain.walls.push({ mesh: group, x, z, hw, hd, height });
}

function addHole(x, z, radius) {
  const dist = Math.sqrt(x * x + z * z);
  if (dist + radius > ISLAND_RADIUS - 2) return;
  if (dist < 4) return;

  const group = new THREE.Group();

  const pit = new THREE.Mesh(
    new THREE.CircleGeometry(radius, 16),
    new THREE.MeshBasicMaterial({ color: 0x1a1208 }),
  );
  pit.rotation.x = -Math.PI / 2;
  pit.position.y = 0.01;
  group.add(pit);

  const rim = new THREE.Mesh(
    new THREE.RingGeometry(radius - 0.05, radius + 0.2, 16),
    new THREE.MeshLambertMaterial({ color: 0x5D4020, side: THREE.DoubleSide }),
  );
  rim.rotation.x = -Math.PI / 2;
  rim.position.y = 0.02;
  group.add(rim);

  const crackMat = new THREE.MeshBasicMaterial({ color: 0x2a1e0a });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + Math.random();
    const crack = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, radius * 0.4),
      crackMat,
    );
    crack.rotation.x = -Math.PI / 2;
    crack.rotation.z = a;
    crack.position.set(
      Math.cos(a) * (radius + 0.15),
      0.015,
      Math.sin(a) * (radius + 0.15),
    );
    group.add(crack);
  }

  group.position.set(x, 0, z);
  scene.add(group);
  state.terrain.holes.push({ mesh: group, x, z, radius });
}

function buildInitialTerrain() {
  addWall(7, 2, 1.5, 0.35);
  addWall(-5, -6, 0.35, 1.2);
}

function addTerrainForWave(wave) {
  if (wave <= 2) return;
  if (wave % 3 !== 0) return;
  if (state.terrain.walls.length + state.terrain.holes.length > 10) return;

  const angle = Math.random() * Math.PI * 2;
  const dist = 5 + Math.random() * 8;
  const x = Math.cos(angle) * dist;
  const z = Math.sin(angle) * dist;

  if (Math.random() < 0.55) {
    const isLong = Math.random() > 0.5;
    addWall(x, z, isLong ? 1.0 + Math.random() * 1.2 : 0.3 + Math.random() * 0.3, isLong ? 0.3 + Math.random() * 0.3 : 1.0 + Math.random() * 1.2);
  } else {
    addHole(x, z, 0.7 + Math.random() * 0.6);
  }
}

function clearTerrain() {
  for (const w of state.terrain.walls) scene.remove(w.mesh);
  for (const h of state.terrain.holes) scene.remove(h.mesh);
  state.terrain.walls.length = 0;
  state.terrain.holes.length = 0;
}

// ── Player ──

let playerGroup;
let playerHat;
let playerShadow;

function buildPlayer() {
  playerGroup = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.42, 0.55, 4, 8),
    new THREE.MeshLambertMaterial({ color: 0x98D8C8 }),
  );
  playerGroup.add(body);

  playerHat = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.32, 5),
    new THREE.MeshLambertMaterial({ color: 0x4CAF50 }),
  );
  playerHat.position.y = 0.65;
  playerGroup.add(playerHat);

  // Sprout
  const sprout = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.15, 3),
    new THREE.MeshLambertMaterial({ color: 0x66BB6A }),
  );
  sprout.position.y = 0.88;
  playerGroup.add(sprout);

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const eyeGeo = new THREE.SphereGeometry(0.08, 5, 5);
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(s * 0.16, 0.2, 0.38);
    playerGroup.add(eye);
  });

  const cheekMat = new THREE.MeshBasicMaterial({ color: 0xFFB7B2 });
  const cheekGeo = new THREE.SphereGeometry(0.05, 4, 4);
  [-1, 1].forEach((s) => {
    const c = new THREE.Mesh(cheekGeo, cheekMat);
    c.position.set(s * 0.26, 0.06, 0.34);
    playerGroup.add(c);
  });

  playerGroup.position.set(0, 0.7, 0);
  scene.add(playerGroup);

  playerShadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.45, 8),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 }),
  );
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

  // Wall collision
  const playerRadius = 0.45;
  for (const wall of state.terrain.walls) {
    const wdx = state.playerPos.x - wall.x;
    const wdz = state.playerPos.z - wall.z;
    const overlapX = wall.hw + playerRadius - Math.abs(wdx);
    const overlapZ = wall.hd + playerRadius - Math.abs(wdz);
    if (overlapX > 0 && overlapZ > 0) {
      if (overlapX < overlapZ) {
        state.playerPos.x += (wdx > 0 ? 1 : -1) * overlapX;
      } else {
        state.playerPos.z += (wdz > 0 ? 1 : -1) * overlapZ;
      }
    }
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
    if (c.mesh.position.x > 70) c.mesh.position.x = -70;
  }
}

// ── World Animations (water only - grass/trees are static for perf) ──

function updateWorldAnimations() {
  if (state._water) {
    const t = performance.now() * 0.001;
    state._water.position.y = -9.5 + Math.sin(t * 0.5) * 0.1;
  }
}

// ── Wave System ──

function startWave() {
  state.wave++;
  state.waveActive = true;
  state.pollen = Math.min(3, state.pollen + 1);

  addTerrainForWave(state.wave);
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
    const bgCanvas = document.getElementById('forge-bg-canvas');
    if (bgCanvas) startForgeAnimation(bgCanvas);
  } else {
    stopForgeAnimation();
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
  stopForgeAnimation();
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
  clearTerrain();
  buildInitialTerrain();

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
  if (state.terrain.walls.length === 0) buildInitialTerrain();
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
  clearTerrain();
  if (els.pauseOverlay) els.pauseOverlay.style.display = 'none';
  els.gameoverScreen.style.display = 'none';
  els.hud.style.display = 'none';
  if (els.weaponSlots) els.weaponSlots.style.display = 'none';
  if (els.minimapCanvas) els.minimapCanvas.style.display = 'none';
  els.titleScreen.style.display = 'flex';
  state.started = false;
}

buildWorld();
buildInitialTerrain();
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
