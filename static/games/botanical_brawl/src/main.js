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

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9FD5E8);
scene.fog = new THREE.FogExp2(0x9FD5E8, 0.012);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 120);
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

// ── Lighting ──

const sun = new THREE.DirectionalLight(0xFFF5E0, 1.6);
sun.position.set(12, 22, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -26; sun.shadow.camera.right = 26;
sun.shadow.camera.top = 26; sun.shadow.camera.bottom = -26;
sun.shadow.camera.near = 1; sun.shadow.camera.far = 60;
sun.shadow.bias = -0.001;
scene.add(sun);
scene.add(new THREE.AmbientLight(0xFFE8D6, 0.55));
scene.add(new THREE.HemisphereLight(0x87CEEB, 0x6B8E23, 0.35));

// ── World ──

function buildWorld() {
  const topGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS, 1.2, 48);
  const topMat = new THREE.MeshStandardMaterial({ color: 0x7EC850, roughness: 0.85 });
  const top = new THREE.Mesh(topGeo, topMat);
  top.position.y = -0.6; top.receiveShadow = true;
  scene.add(top);

  const sideGeo = new THREE.CylinderGeometry(ISLAND_RADIUS, ISLAND_RADIUS - 3, 4, 48);
  const sideMat = new THREE.MeshStandardMaterial({ color: 0x8B6E2F, roughness: 0.92 });
  const side = new THREE.Mesh(sideGeo, sideMat);
  side.position.y = -3.2;
  scene.add(side);

  const coneGeo = new THREE.ConeGeometry(ISLAND_RADIUS - 3, 6, 48);
  const cone = new THREE.Mesh(coneGeo, sideMat);
  cone.position.y = -8.2; cone.rotation.x = Math.PI;
  scene.add(cone);

  // Water plane
  const waterGeo = new THREE.PlaneGeometry(120, 120);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x4FC3F7, transparent: true, opacity: 0.35,
    roughness: 0.1, metalness: 0.2,
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -10;
  scene.add(water);

  // Grass tufts
  const grassColors = [0x6DBF47, 0x85D660, 0x55A630];
  for (let i = 0; i < 60; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * (ISLAND_RADIUS - 1.5);
    const geo = new THREE.ConeGeometry(0.12, 0.35 + Math.random() * 0.25, 4);
    const mat = new THREE.MeshStandardMaterial({ color: grassColors[Math.floor(Math.random() * 3)], roughness: 0.8 });
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
      color: flowerColors[Math.floor(Math.random() * flowerColors.length)], roughness: 0.5,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(Math.cos(a) * r, 0.12, Math.sin(a) * r);
    scene.add(m);
  }

  // Decorative trees
  const treeMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50, roughness: 0.7 });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x795548, roughness: 0.9 });
  const treePositions = [
    [ISLAND_RADIUS - 2, 0, 3], [-ISLAND_RADIUS + 3, 0, -2],
    [5, 0, ISLAND_RADIUS - 2], [-4, 0, -ISLAND_RADIUS + 2],
  ];
  for (const [tx, , tz] of treePositions) {
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.2, 6), trunkMat);
    trunk.position.set(tx, 0.6, tz);
    scene.add(trunk);
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.7, 8, 8), treeMat);
    canopy.position.set(tx, 1.6, tz);
    canopy.castShadow = true;
    scene.add(canopy);
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
    g.position.set(-40 + Math.random() * 80, 14 + Math.random() * 8, -30 + Math.random() * 60);
    scene.add(g);
    state.clouds.push({ mesh: g, speed: 0.005 + Math.random() * 0.01 });
  }
}

// ── Player ──

let playerGroup;
let playerHat;

function buildPlayer() {
  playerGroup = new THREE.Group();

  const bodyGeo = new THREE.CapsuleGeometry(0.42, 0.55, 8, 16);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x98D8C8, roughness: 0.4 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  playerGroup.add(body);

  const hatGeo = new THREE.ConeGeometry(0.25, 0.35, 6);
  const hatMat = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
  playerHat = new THREE.Mesh(hatGeo, hatMat);
  playerHat.position.y = 0.65;
  playerGroup.add(playerHat);

  const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(eyeGeo, eyeMat);
    eye.position.set(s * 0.16, 0.18, 0.38);
    playerGroup.add(eye);
  });

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

function updatePlayer() {
  const now = performance.now();
  const isDashing = now < state.dashUntil;

  const dir = new THREE.Vector3();
  if (state.keys['w'] || state.keys['arrowup']) dir.z -= 1;
  if (state.keys['s'] || state.keys['arrowdown']) dir.z += 1;
  if (state.keys['a'] || state.keys['arrowleft']) dir.x -= 1;
  if (state.keys['d'] || state.keys['arrowright']) dir.x += 1;

  if (touchJoystick.active) {
    dir.x = touchJoystick.dx;
    dir.z = touchJoystick.dy;
  }

  const isMoving = dir.length() > 0.01;

  if (isDashing) {
    state.playerPos.addScaledVector(state.dashDir, PLAYER_SPEED * DASH_SPEED_MULT);
  } else if (isMoving) {
    dir.normalize().multiplyScalar(PLAYER_SPEED * state.speedMultiplier);
    state.playerPos.add(dir);
    state.moveDistance += PLAYER_SPEED * state.speedMultiplier;
  }

  // Clamp to island
  const d = Math.sqrt(state.playerPos.x ** 2 + state.playerPos.z ** 2);
  if (d > ISLAND_RADIUS - 1) {
    const a = Math.atan2(state.playerPos.z, state.playerPos.x);
    state.playerPos.x = Math.cos(a) * (ISLAND_RADIUS - 1);
    state.playerPos.z = Math.sin(a) * (ISLAND_RADIUS - 1);
  }

  // Run animation: bob + tilt
  let bobY = 0.7;
  if (isMoving && !isDashing) {
    bobY += Math.sin(state.moveDistance * 8) * 0.06;
    const tilt = 0.08;
    playerGroup.rotation.z = Math.sin(state.moveDistance * 8) * tilt;
    if (playerHat) playerHat.rotation.z = Math.sin(state.moveDistance * 10) * 0.12;
  } else {
    playerGroup.rotation.z = 0;
    if (playerHat) playerHat.rotation.z = 0;
  }

  if (isDashing) {
    // Squash-stretch during dash
    playerGroup.scale.set(0.8, 1.2, 0.8);
    if (playerHat) playerHat.rotation.z = Math.sin(now * 0.05) * 0.3;
  } else {
    playerGroup.scale.set(1, 1, 1);
  }

  playerGroup.position.set(state.playerPos.x, bobY, state.playerPos.z);

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

function updateCamera() {
  const target = new THREE.Vector3(state.playerPos.x * 0.4, 0, state.playerPos.z * 0.4);
  const desired = new THREE.Vector3(target.x, 28, target.z + 22);
  camera.position.lerp(desired, 0.06);
  camera.lookAt(target);

  const now = performance.now();
  if (now < state.shakeUntil) {
    const intensity = state.shakeMag * ((state.shakeUntil - now) / 200);
    camera.position.x += (Math.random() - 0.5) * intensity;
    camera.position.y += (Math.random() - 0.5) * intensity * 0.5;
  }
}

// ── Clouds ──

function updateClouds() {
  for (const c of state.clouds) {
    c.mesh.position.x += c.speed;
    if (c.mesh.position.x > 50) c.mesh.position.x = -50;
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

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (!state.started || state.paused) {
    renderer.render(scene, camera);
    updateClouds();
    return;
  }

  updatePlayer();
  updateEnemies(state, scene, camera, ISLAND_RADIUS);
  updateEnemyProjectiles(state, scene, ISLAND_RADIUS);
  updateProjectiles(state, scene, ISLAND_RADIUS, damageEnemyWithPickups, camera);
  updatePickups(state, scene, PLAYER_MAX_HP);
  updateBuffs(state);
  updateParticles();
  updateShockwaves();
  updateEnemyHpBars(state.enemies, camera);
  updatePollen();
  updateClouds();
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

gameLoop();
