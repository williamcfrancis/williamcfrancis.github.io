import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  Ray,
  Mesh,
  MeshBuilder,
  Color3,
  Color4,
  StandardMaterial,
  PBRMaterial,
  TransformNode,
  ParticleSystem,
  Texture,
} from '@babylonjs/core';

import type { PlayerState, GameState, WeaponState, Enemy, Pickup, StyleKill } from './types';
import { createAllWeapons } from './weapons';
import { buildMap, type MapData } from './map';
import { ENEMY_TYPES, spawnEnemy, updateEnemy, damageEnemy, cleanupEnemy } from './enemies';
import {
  createMuzzleFlash,
  createBulletImpact,
  createBloodEffect,
  createExplosion,
  createTracer,
  createEnemyTracer,
  createPickupGlow,
  createGrappleBeam,
  createEMPBlast,
  createBeamEffect,
  createWallRunTrail,
} from './particles';
import { setupPostProcessing, createDamagePostProcess, createBulletTimePostProcess } from './postprocess';
import {
  initHUD, updateHUD, addKillFeedEntry,
  showDamageVignette, showHitMarker, showWaveAnnounce,
  showBossAnnounce, showStylePopup,
  showGameOver, hideGameOver,
  showHUD, hideHUD, showMenu, hideMenu,
} from './hud';
import * as Audio from './audio';

// ── Constants ──
const GRAVITY = -25;
const JUMP_FORCE = 10;
const MOVE_SPEED = 12;
const SPRINT_MULTIPLIER = 1.6;
const MOUSE_SENSITIVITY = 0.002;
const PLAYER_HEIGHT = 1.8;
const PLAYER_RADIUS = 0.4;
const HEAD_BOB_SPEED = 12;
const HEAD_BOB_AMOUNT = 0.04;
const WEAPON_SWAY_AMOUNT = 0.002;
const FOOTSTEP_INTERVAL = 0.35;
const DAMAGE_RECOVERY_RATE = 0.5;
const PICKUP_RESPAWN_TIME = 15;
const WAVE_DELAY = 5;
const BASE_ENEMIES_PER_WAVE = 4;
const BOSS_WAVE_INTERVAL = 5;
const DASH_SPEED = 35;
const DASH_DURATION = 0.18;
const DASH_COOLDOWN = 3;
const SLIDE_SPEED = 20;
const SLIDE_DURATION = 0.6;
const SLIDE_COOLDOWN = 2;
const GRENADE_SPEED = 30;
const GRENADE_DAMAGE = 80;
const GRENADE_RADIUS = 8;
const GRENADE_FUSE = 2;
const MAX_GRENADES = 3;
const WALL_RUN_DURATION = 1.2;
const WALL_RUN_SPEED = 14;
const WALL_JUMP_FORCE = 12;
const WALL_JUMP_AWAY = 8;
const GRAPPLE_RANGE = 50;
const GRAPPLE_PULL_SPEED = 25;
const GRAPPLE_COOLDOWN = 4;
const BULLET_TIME_SCALE = 0.3;
const BULLET_TIME_DRAIN = 20;
const BULLET_TIME_RECHARGE = 8;
const MAX_BT_ENERGY = 100;
const COMBO_TIMEOUT = 4;
const MAX_AIR_JUMPS = 1;
const OVERDRIVE_DURATION = 10;

const STYLE_DEFS: StyleKill[] = [
  { type: 'headshot', label: 'HEADSHOT', bonus: 50 },
  { type: 'airborne', label: 'AERIAL KILL', bonus: 30 },
  { type: 'wallrun', label: 'WALL RIDER', bonus: 40 },
  { type: 'grapple', label: 'GRAPPLE KILL', bonus: 40 },
  { type: 'multikill', label: 'MULTI KILL', bonus: 60 },
  { type: 'longshot', label: 'LONG SHOT', bonus: 35 },
  { type: 'explosion', label: 'EXPLOSIVE', bonus: 25 },
];

// ── State ──
let engine: Engine;
let scene: Scene;
let camera: FreeCamera;
let mapData: MapData;
let player: PlayerState;
let gameState: GameState;
let weapons: WeaponState[];
let currentWeaponIdx = 0;
let enemies: Enemy[] = [];
let pickups: Pickup[] = [];
let projectiles: { mesh: Mesh; velocity: Vector3; damage: number; radius: number; timer: number; trail: ParticleSystem | null }[] = [];
let grenades: { mesh: Mesh; velocity: Vector3; timer: number; bounces: number }[] = [];
let damagePost: { setDamageIntensity: (v: number) => void } | null = null;
let btPost: { setActive: (v: boolean) => void } | null = null;
let damageIntensity = 0;
let screenShakeIntensity = 0;
let headBobPhase = 0;
let footstepTimer = 0;
let pointerLocked = false;
let recoilRecovery = { x: 0, y: 0 };
let weaponSwayX = 0;
let weaponSwayY = 0;
let lastFrameTime = 0;
let fpsCounter = 0;
let fpsTimer = 0;
let displayFps = 0;
let mouseMovementX = 0;
let mouseMovementY = 0;
let mouseDown = false;
let mouseJustPressed = false;
let rightMouseDown = false;
let rightMouseJustPressed = false;
let keysHeld = new Set<string>();
let keysJustPressed = new Set<string>();
let scrollDelta = 0;
let weaponModel: TransformNode | null = null;

let dashCooldown = 0;
let dashTimer = 0;
let dashDirection = Vector3.Zero();
let slideCooldown = 0;
let slideTimer = 0;
let slideDirection = Vector3.Zero();
let grenadeCount = MAX_GRENADES;
let lastStreakAnnounce = 0;
let grappleCooldown = 0;
let grappleBeamMesh: Mesh | null = null;
let multiKillTimer = 0;
let multiKillCount = 0;
let wallRunTrailTimer = 0;

// ── Initialization ──
async function init(): Promise<void> {
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  engine = new Engine(canvas, true, { stencil: true, antialias: true });
  // Cap pixel ratio to 1 — full DPR + heavy post-processing tanks framerate on retina/4K displays.
  // setHardwareScalingLevel(N) renders at 1/N native pixels, then upscales.
  const dpr = window.devicePixelRatio || 1;
  engine.setHardwareScalingLevel(Math.max(1, dpr));

  scene = new Scene(engine);
  scene.collisionsEnabled = true;

  camera = new FreeCamera('fpsCam', new Vector3(0, PLAYER_HEIGHT, -30), scene);
  camera.minZ = 0.1;
  camera.maxZ = 500;
  camera.fov = 1.1;
  camera.inertia = 0;
  camera.angularSensibility = 99999999;
  camera.speed = 0;
  camera.checkCollisions = false;
  scene.activeCamera = camera;

  mapData = buildMap(scene);
  setupPostProcessing(scene, camera);
  damagePost = createDamagePostProcess(scene, camera);
  btPost = createBulletTimePostProcess(scene, camera);

  buildWeaponModel(scene);
  setupInput(canvas);
  initHUD();

  showMenu();
  hideHUD();

  document.getElementById('play-btn')!.addEventListener('click', startGame);
  document.getElementById('restart-btn')!.addEventListener('click', () => {
    hideGameOver();
    startGame();
  });

  engine.runRenderLoop(() => {
    const now = performance.now();
    const rawDt = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;

    fpsCounter++;
    fpsTimer += rawDt;
    if (fpsTimer >= 1) {
      displayFps = fpsCounter;
      fpsCounter = 0;
      fpsTimer -= 1;
    }

    if (gameState?.phase === 'playing') {
      const ts = gameState.timeScale ?? 1;
      updateGame(rawDt * ts, rawDt);
    }

    scene.render();

    keysJustPressed.clear();
    mouseJustPressed = false;
    rightMouseJustPressed = false;
    mouseMovementX = 0;
    mouseMovementY = 0;
    scrollDelta = 0;
  });

  window.addEventListener('resize', () => engine.resize());
}

function setupInput(canvas: HTMLCanvasElement): void {
  canvas.addEventListener('click', () => {
    if (!pointerLocked && gameState?.phase === 'playing') {
      canvas.requestPointerLock();
    }
  });

  document.addEventListener('pointerlockchange', () => {
    pointerLocked = document.pointerLockElement !== null;
  });

  document.addEventListener('mousemove', (e) => {
    if (pointerLocked) {
      mouseMovementX += e.movementX;
      mouseMovementY += e.movementY;
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) { mouseDown = true; mouseJustPressed = true; }
    if (e.button === 2) { rightMouseDown = true; rightMouseJustPressed = true; }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) mouseDown = false;
    if (e.button === 2) rightMouseDown = false;
  });

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (!keysHeld.has(k)) keysJustPressed.add(k);
    keysHeld.add(k);
    if (k === 'tab') e.preventDefault();
  });

  document.addEventListener('keyup', (e) => {
    keysHeld.delete(e.key.toLowerCase());
  });

  document.addEventListener('wheel', (e) => {
    scrollDelta += Math.sign(e.deltaY);
  });

  window.addEventListener('blur', () => {
    keysHeld.clear();
    mouseDown = false;
    rightMouseDown = false;
  });
}

// ── Weapon View Models ──
let weaponModels: TransformNode[] = [];
let weaponSwitchTimer = 0;
const WEAPON_SWITCH_TIME = 0.3;
let prevWeaponIdx = 0;

const WEAPON_GLOW_COLORS: Color3[] = [
  new Color3(0, 1, 0.8),
  new Color3(0.2, 0.6, 1),
  new Color3(1, 0.2, 0.5),
  new Color3(1, 0.5, 0.1),
  new Color3(0.6, 0.1, 1),
];

function buildWeaponModel(_scene: Scene): void {
  weaponModel = new TransformNode('weaponRoot', _scene);
  weaponModel.parent = camera;
  weaponModels = [];

  for (let w = 0; w < 5; w++) {
    const model = new TransformNode(`weaponModel_${w}`, _scene);
    model.parent = weaponModel;
    model.setEnabled(w === 0);

    const gunMat = new PBRMaterial(`gunMat_${w}`, _scene);
    gunMat.albedoColor = new Color3(0.2, 0.18, 0.22);
    gunMat.roughness = 0.6;
    gunMat.metallic = 0.2;

    const glowColor = WEAPON_GLOW_COLORS[w];
    const glowMat = new PBRMaterial(`gunGlow_${w}`, _scene);
    glowMat.albedoColor = glowColor.scale(0.1);
    glowMat.emissiveColor = glowColor;
    glowMat.emissiveIntensity = 2;
    glowMat.roughness = 0.3;
    glowMat.metallic = 0.3;

    const part = (name: string, opts: any, pos: Vector3, mat: PBRMaterial, rot?: Vector3): Mesh => {
      const m = MeshBuilder.CreateBox(`${name}_${w}`, opts, _scene);
      m.position = pos;
      if (rot) m.rotation = rot;
      m.parent = model;
      m.material = mat;
      m.isPickable = false;
      return m;
    };

    switch (w) {
      case 0:
        part('barrel', { width: 0.05, height: 0.05, depth: 0.5 }, new Vector3(0.25, -0.18, 0.45), gunMat);
        part('body', { width: 0.1, height: 0.11, depth: 0.28 }, new Vector3(0.25, -0.2, 0.25), gunMat);
        part('grip', { width: 0.05, height: 0.13, depth: 0.05 }, new Vector3(0.25, -0.2, 0.18), gunMat, new Vector3(0.3, 0, 0));
        part('stock', { width: 0.04, height: 0.06, depth: 0.15 }, new Vector3(0.25, -0.19, 0.03), gunMat);
        part('mag', { width: 0.04, height: 0.09, depth: 0.07 }, new Vector3(0.25, -0.3, 0.28), gunMat);
        part('accent1', { width: 0.12, height: 0.015, depth: 0.3 }, new Vector3(0.25, -0.14, 0.3), glowMat);
        part('accent2', { width: 0.015, height: 0.06, depth: 0.04 }, new Vector3(0.25, -0.18, 0.68), glowMat);
        part('sight', { width: 0.03, height: 0.035, depth: 0.04 }, new Vector3(0.25, -0.125, 0.4), gunMat);
        break;
      case 1:
        part('barrel1', { width: 0.04, height: 0.04, depth: 0.35 }, new Vector3(0.22, -0.17, 0.4), gunMat);
        part('barrel2', { width: 0.04, height: 0.04, depth: 0.35 }, new Vector3(0.28, -0.17, 0.4), gunMat);
        part('body', { width: 0.14, height: 0.12, depth: 0.25 }, new Vector3(0.25, -0.2, 0.2), gunMat);
        part('grip', { width: 0.06, height: 0.14, depth: 0.06 }, new Vector3(0.25, -0.32, 0.15), gunMat, new Vector3(0.2, 0, 0));
        part('pump', { width: 0.08, height: 0.05, depth: 0.12 }, new Vector3(0.25, -0.24, 0.35), glowMat);
        part('accent', { width: 0.16, height: 0.02, depth: 0.06 }, new Vector3(0.25, -0.13, 0.3), glowMat);
        part('muzzle', { width: 0.12, height: 0.08, depth: 0.03 }, new Vector3(0.25, -0.17, 0.58), glowMat);
        break;
      case 2:
        part('barrel', { width: 0.035, height: 0.035, depth: 0.7 }, new Vector3(0.25, -0.17, 0.5), gunMat);
        part('body', { width: 0.08, height: 0.09, depth: 0.22 }, new Vector3(0.25, -0.19, 0.18), gunMat);
        part('grip', { width: 0.04, height: 0.12, depth: 0.04 }, new Vector3(0.25, -0.29, 0.15), gunMat, new Vector3(0.3, 0, 0));
        part('stock', { width: 0.04, height: 0.05, depth: 0.2 }, new Vector3(0.25, -0.18, -0.02), gunMat);
        part('scope', { width: 0.04, height: 0.04, depth: 0.1 }, new Vector3(0.25, -0.11, 0.35), gunMat);
        part('scopeLens', { width: 0.035, height: 0.035, depth: 0.015 }, new Vector3(0.25, -0.11, 0.405), glowMat);
        part('rail1', { width: 0.01, height: 0.01, depth: 0.6 }, new Vector3(0.22, -0.15, 0.45), glowMat);
        part('rail2', { width: 0.01, height: 0.01, depth: 0.6 }, new Vector3(0.28, -0.15, 0.45), glowMat);
        part('chargeRing', { width: 0.06, height: 0.06, depth: 0.015 }, new Vector3(0.25, -0.17, 0.82), glowMat);
        break;
      case 3:
        part('tube', { width: 0.09, height: 0.09, depth: 0.45 }, new Vector3(0.25, -0.16, 0.4), gunMat);
        part('body', { width: 0.13, height: 0.14, depth: 0.2 }, new Vector3(0.25, -0.2, 0.15), gunMat);
        part('grip', { width: 0.06, height: 0.15, depth: 0.06 }, new Vector3(0.25, -0.34, 0.12), gunMat, new Vector3(0.25, 0, 0));
        part('handle', { width: 0.04, height: 0.06, depth: 0.08 }, new Vector3(0.25, -0.12, 0.3), gunMat);
        part('muzzle', { width: 0.11, height: 0.11, depth: 0.03 }, new Vector3(0.25, -0.16, 0.63), glowMat);
        part('vent1', { width: 0.02, height: 0.12, depth: 0.04 }, new Vector3(0.19, -0.16, 0.5), glowMat);
        part('vent2', { width: 0.02, height: 0.12, depth: 0.04 }, new Vector3(0.31, -0.16, 0.5), glowMat);
        part('warhead', { width: 0.05, height: 0.05, depth: 0.05 }, new Vector3(0.25, -0.16, 0.66), glowMat);
        break;
      case 4:
        part('barrel', { width: 0.04, height: 0.04, depth: 0.3 }, new Vector3(0.25, -0.18, 0.38), gunMat);
        part('body', { width: 0.09, height: 0.1, depth: 0.2 }, new Vector3(0.25, -0.2, 0.2), gunMat);
        part('grip', { width: 0.045, height: 0.11, depth: 0.045 }, new Vector3(0.25, -0.3, 0.18), gunMat, new Vector3(0.3, 0, 0));
        part('mag', { width: 0.035, height: 0.08, depth: 0.05 }, new Vector3(0.25, -0.3, 0.25), gunMat);
        part('accent1', { width: 0.11, height: 0.012, depth: 0.22 }, new Vector3(0.25, -0.145, 0.25), glowMat);
        part('coil1', { width: 0.06, height: 0.06, depth: 0.015 }, new Vector3(0.25, -0.18, 0.5), glowMat);
        part('coil2', { width: 0.06, height: 0.06, depth: 0.015 }, new Vector3(0.25, -0.18, 0.55), glowMat);
        break;
    }

    weaponModels.push(model);
  }
}

// ── Game Start ──
function startGame(): void {
  hideMenu();
  hideGameOver();
  showHUD();

  player = {
    health: 100,
    maxHealth: 100,
    armor: 0,
    maxArmor: 50,
    position: new Vector3(0, PLAYER_HEIGHT, -30),
    velocity: new Vector3(0, 0, 0),
    grounded: true,
    sprinting: false,
    score: 0,
    kills: 0,
    deaths: 0,
    streak: 0,
    alive: true,
    wallRunning: false,
    wallRunSide: 0,
    wallRunTimer: 0,
    doubleJumped: false,
    airJumpsLeft: MAX_AIR_JUMPS,
    grappling: false,
    grapplePoint: null,
    grappleLength: 0,
    bulletTimeActive: false,
    bulletTimeEnergy: MAX_BT_ENERGY,
    comboMultiplier: 1,
    comboTimer: 0,
    stylePoints: 0,
    lastKillWasAirborne: false,
    lastKillWasWallRun: false,
    overdriveTimer: 0,
  };

  gameState = {
    phase: 'playing',
    wave: 0,
    enemiesRemaining: 0,
    enemiesInWave: 0,
    waveTimer: 2,
    spawnTimer: 0,
    totalKills: 0,
    bossActive: false,
    timeScale: 1,
    difficulty: 1,
  };

  weapons = createAllWeapons();
  currentWeaponIdx = 0;
  weapons[0].equipped = true;

  enemies.forEach(e => cleanupEnemy(e));
  enemies = [];

  projectiles.forEach(p => {
    if (p.trail) { p.trail.stop(); p.trail.dispose(); }
    p.mesh.dispose();
  });
  projectiles = [];

  grenades.forEach(g => g.mesh.dispose());
  grenades = [];

  setupPickups();

  camera.position = player.position.clone();
  camera.rotation.set(0, 0, 0);

  damageIntensity = 0;
  screenShakeIntensity = 0;
  recoilRecovery = { x: 0, y: 0 };
  dashCooldown = 0;
  dashTimer = 0;
  slideCooldown = 0;
  slideTimer = 0;
  grenadeCount = MAX_GRENADES;
  lastStreakAnnounce = 0;
  grappleCooldown = 0;
  multiKillTimer = 0;
  multiKillCount = 0;
  if (grappleBeamMesh) { grappleBeamMesh.dispose(); grappleBeamMesh = null; }

  const canvas = engine.getRenderingCanvas()!;
  canvas.requestPointerLock();

  Audio.playWaveStart();
}

function setupPickups(): void {
  pickups.forEach(p => p.mesh.dispose());
  pickups = [];

  const typeRotation: Pickup['type'][] = ['health', 'armor', 'ammo', 'grenade', 'overdrive'];
  const colors: Record<string, Color3> = {
    health: new Color3(0.1, 1, 0.3),
    armor: new Color3(0.2, 0.5, 1),
    ammo: new Color3(1, 0.8, 0),
    grenade: new Color3(1, 0.4, 0.1),
    overdrive: new Color3(1, 0.7, 0),
  };
  const values: Record<string, number> = {
    health: 25, armor: 25, ammo: 0, grenade: 1, overdrive: OVERDRIVE_DURATION,
  };

  mapData.pickupLocations.forEach((pos, i) => {
    const type = typeRotation[i % typeRotation.length];
    const color = colors[type];
    const mesh = MeshBuilder.CreateBox(`pickup_${i}`, { width: 0.6, height: 0.6, depth: 0.6 }, scene);
    mesh.position = pos.add(new Vector3(0, 0.5, 0));
    const mat = new PBRMaterial(`pickupMat_${i}`, scene);
    mat.albedoColor = color.scale(0.3);
    mat.emissiveColor = color;
    mat.emissiveIntensity = 2;
    mat.roughness = 0.3;
    mat.metallic = 0.2;
    mesh.material = mat;
    mesh.checkCollisions = false;
    mesh.isPickable = false;
    createPickupGlow(scene, pos.add(new Vector3(0, 0.5, 0)), color);

    pickups.push({ mesh, type, value: values[type], respawnTimer: 0, active: true, position: pos });
  });
}

// ── Main Game Loop ──
function updateGame(dt: number, rawDt: number): void {
  if (!player.alive) return;

  updatePlayerMovement(dt);
  updatePlayerLook(dt);
  updateAbilities(dt, rawDt);
  updateWeapons(dt);
  updateEnemiesLoop(dt);
  updateProjectilesLoop(dt);
  updateGrenadesLoop(dt);
  updatePickupsLoop(dt);
  updateWaveSystem(dt);
  updateComboSystem(dt);
  updateEffects(dt);
  updateWeaponModel(dt);
  updateMinimap();

  updateHUD(player, weapons[currentWeaponIdx], gameState, displayFps, weapons);
  updateAbilityHUD();
  updateMovementIndicator();
  updateOverdriveHUD();
}

// ── Player Movement ──
function updatePlayerMovement(dt: number): void {
  const forward = camera.getDirection(Vector3.Forward());
  forward.y = 0;
  forward.normalize();
  const right = camera.getDirection(Vector3.Right());
  right.y = 0;
  right.normalize();

  let moveDir = Vector3.Zero();
  if (keysHeld.has('w')) moveDir.addInPlace(forward);
  if (keysHeld.has('s')) moveDir.subtractInPlace(forward);
  if (keysHeld.has('d')) moveDir.addInPlace(right);
  if (keysHeld.has('a')) moveDir.subtractInPlace(right);

  const isMoving = moveDir.length() > 0.1;
  if (isMoving) moveDir.normalize();

  player.sprinting = keysHeld.has('shift') && isMoving && keysHeld.has('w');

  // Grapple pull
  if (player.grappling && player.grapplePoint) {
    const toGrapple = player.grapplePoint.subtract(player.position);
    const dist = toGrapple.length();
    if (dist < 2) {
      releaseGrapple();
    } else {
      const pullDir = toGrapple.normalize();
      player.velocity = pullDir.scale(GRAPPLE_PULL_SPEED);
      player.velocity.y = Math.max(player.velocity.y, 5);
    }
  }
  // Dash override
  else if (dashTimer > 0) {
    dashTimer -= dt;
    player.velocity.x = dashDirection.x * DASH_SPEED;
    player.velocity.z = dashDirection.z * DASH_SPEED;
  }
  // Slide override
  else if (slideTimer > 0) {
    slideTimer -= dt;
    const falloff = slideTimer / SLIDE_DURATION;
    player.velocity.x = slideDirection.x * SLIDE_SPEED * falloff;
    player.velocity.z = slideDirection.z * SLIDE_SPEED * falloff;
    camera.fov = 1.1 + (1 - falloff) * 0.1;
  }
  // Wall running
  else if (player.wallRunning) {
    player.velocity.y = Math.max(player.velocity.y, -1);
    player.velocity.x = forward.x * WALL_RUN_SPEED;
    player.velocity.z = forward.z * WALL_RUN_SPEED;
  }
  // Normal movement
  else {
    camera.fov += (1.1 - camera.fov) * 0.1;
    const speed = MOVE_SPEED * (player.sprinting ? SPRINT_MULTIPLIER : 1);
    const targetVelX = moveDir.x * speed;
    const targetVelZ = moveDir.z * speed;
    const accel = player.grounded ? 20 : 5;
    player.velocity.x += (targetVelX - player.velocity.x) * Math.min(1, accel * dt);
    player.velocity.z += (targetVelZ - player.velocity.z) * Math.min(1, accel * dt);
  }

  // Gravity (reduced during wall run / grapple)
  if (!player.grappling) {
    const grav = player.wallRunning ? GRAVITY * 0.15 : GRAVITY;
    player.velocity.y += grav * dt;
  }

  // Jump / double jump
  if (keysJustPressed.has(' ') || keysJustPressed.has('space')) {
    if (player.wallRunning) {
      const wallNormalX = player.wallRunSide > 0 ? -1 : 1;
      const wallNormal = right.scale(wallNormalX);
      player.velocity = forward.scale(WALL_JUMP_FORCE).add(wallNormal.scale(WALL_JUMP_AWAY)).add(new Vector3(0, JUMP_FORCE, 0));
      player.wallRunning = false;
      player.airJumpsLeft = MAX_AIR_JUMPS;
      Audio.playJump();
    } else if (player.grounded) {
      player.velocity.y = JUMP_FORCE;
      player.grounded = false;
      player.airJumpsLeft = MAX_AIR_JUMPS;
      player.doubleJumped = false;
      Audio.playJump();
    } else if (player.airJumpsLeft > 0) {
      player.velocity.y = JUMP_FORCE * 0.85;
      player.airJumpsLeft--;
      player.doubleJumped = true;
      Audio.playDoubleJump();
    }
  }

  player.position.addInPlace(player.velocity.scale(dt));

  // Ground check
  if (player.position.y <= PLAYER_HEIGHT) {
    if (!player.grounded && player.velocity.y < -3) Audio.playLand();
    player.position.y = PLAYER_HEIGHT;
    player.velocity.y = 0;
    player.grounded = true;
    player.wallRunning = false;
    player.airJumpsLeft = MAX_AIR_JUMPS;
    player.doubleJumped = false;
  }

  // Center platform (y=2, 16×16)
  if (Math.abs(player.position.x) < 8 && Math.abs(player.position.z) < 8
    && player.position.y < PLAYER_HEIGHT + 2 && player.position.y > PLAYER_HEIGHT) {
    if (player.velocity.y < 0) {
      player.position.y = PLAYER_HEIGHT + 2;
      player.velocity.y = 0;
      player.grounded = true;
    }
  }

  // Map platforms
  for (const plat of mapData.platforms) {
    const hW = plat.width / 2;
    const hD = plat.depth / 2;
    if (Math.abs(player.position.x - plat.position.x) < hW
      && Math.abs(player.position.z - plat.position.z) < hD
      && player.position.y < plat.position.y + plat.height + PLAYER_HEIGHT
      && player.position.y > plat.position.y + plat.height) {
      if (player.velocity.y < 0) {
        player.position.y = plat.position.y + plat.height + PLAYER_HEIGHT;
        player.velocity.y = 0;
        player.grounded = true;
      }
    }
  }

  // Boundary clamp
  const bound = 78;
  player.position.x = Math.max(-bound, Math.min(bound, player.position.x));
  player.position.z = Math.max(-bound, Math.min(bound, player.position.z));

  camera.position.copyFrom(player.position);
  if (slideTimer > 0) camera.position.y -= 0.6;

  // Wall run check (only when airborne and sprinting forward)
  if (!player.grounded && !player.grappling && (player.sprinting || keysHeld.has('w'))) {
    checkWallRun(dt);
  } else if (player.wallRunning && player.grounded) {
    player.wallRunning = false;
  }

  // Wall run timer
  if (player.wallRunning) {
    player.wallRunTimer -= dt;
    wallRunTrailTimer -= dt;
    if (wallRunTrailTimer <= 0) {
      createWallRunTrail(scene, player.position);
      wallRunTrailTimer = 0.1;
    }
    if (player.wallRunTimer <= 0) player.wallRunning = false;
  }

  // Camera tilt during wall run
  const targetTilt = player.wallRunning ? player.wallRunSide * -0.12 : 0;
  camera.rotation.z += (targetTilt - camera.rotation.z) * 0.15;

  // Head bob
  if (isMoving && player.grounded && dashTimer <= 0 && slideTimer <= 0) {
    const bobSpd = player.sprinting ? HEAD_BOB_SPEED * 1.5 : HEAD_BOB_SPEED;
    headBobPhase += dt * bobSpd;
    camera.position.y += Math.sin(headBobPhase) * HEAD_BOB_AMOUNT;
    camera.position.x += Math.cos(headBobPhase * 0.5) * HEAD_BOB_AMOUNT * 0.3;

    footstepTimer -= dt;
    if (footstepTimer <= 0) {
      footstepTimer = player.sprinting ? FOOTSTEP_INTERVAL * 0.7 : FOOTSTEP_INTERVAL;
      Audio.playFootstep();
    }
  } else {
    headBobPhase = 0;
    footstepTimer = 0;
  }

  // Screen shake
  if (screenShakeIntensity > 0) {
    camera.position.x += (Math.random() - 0.5) * screenShakeIntensity * 0.15;
    camera.position.y += (Math.random() - 0.5) * screenShakeIntensity * 0.1;
  }

  // Grapple beam visual
  if (player.grappling && player.grapplePoint) {
    if (grappleBeamMesh) grappleBeamMesh.dispose();
    grappleBeamMesh = createGrappleBeam(scene, camera.position, player.grapplePoint);
  } else if (grappleBeamMesh) {
    grappleBeamMesh.dispose();
    grappleBeamMesh = null;
  }
}

function checkWallRun(dt: number): void {
  if (player.wallRunning) return;

  const rightDir = camera.getDirection(Vector3.Right());
  rightDir.y = 0;
  rightDir.normalize();

  const sides = [
    { dir: rightDir, side: 1 },
    { dir: rightDir.scale(-1), side: -1 },
  ];

  for (const { dir, side } of sides) {
    const ray = new Ray(player.position, dir, 1.2);
    for (const surface of mapData.wallRunSurfaces) {
      const pick = ray.intersectsMesh(surface as any);
      if (pick.hit) {
        player.wallRunning = true;
        player.wallRunSide = side;
        player.wallRunTimer = WALL_RUN_DURATION;
        player.airJumpsLeft = MAX_AIR_JUMPS;
        Audio.playWallRun();
        return;
      }
    }
  }
}

// ── Player Look ──
function updatePlayerLook(dt: number): void {
  if (!pointerLocked) return;

  camera.rotation.y += mouseMovementX * MOUSE_SENSITIVITY;
  camera.rotation.x += mouseMovementY * MOUSE_SENSITIVITY;
  camera.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, camera.rotation.x));

  if (recoilRecovery.x !== 0) {
    const rate = 5 * dt;
    const rx = recoilRecovery.x * rate;
    const ry = recoilRecovery.y * rate;
    camera.rotation.x -= rx;
    camera.rotation.y -= ry;
    recoilRecovery.x -= rx;
    recoilRecovery.y -= ry;
    if (Math.abs(recoilRecovery.x) < 0.0001) recoilRecovery.x = 0;
    if (Math.abs(recoilRecovery.y) < 0.0001) recoilRecovery.y = 0;
  }

  weaponSwayX += (mouseMovementX * WEAPON_SWAY_AMOUNT - weaponSwayX) * 0.15;
  weaponSwayY += (mouseMovementY * WEAPON_SWAY_AMOUNT - weaponSwayY) * 0.15;
}

// ── Weapons ──
function updateWeapons(dt: number): void {
  for (let i = 1; i <= 5; i++) {
    if (keysJustPressed.has(i.toString())) switchWeapon(i - 1);
  }
  if (scrollDelta !== 0) {
    const idx = (currentWeaponIdx + Math.sign(scrollDelta) + weapons.length) % weapons.length;
    switchWeapon(idx);
  }

  const weapon = weapons[currentWeaponIdx];

  if (keysJustPressed.has('r') && !weapon.reloading && weapon.currentAmmo < weapon.def.magazineSize && weapon.reserveAmmo > 0) {
    startReload(weapon);
  }
  if (weapon.currentAmmo === 0 && !weapon.reloading && weapon.reserveAmmo > 0) {
    startReload(weapon);
  }

  if (weapon.reloading) {
    weapon.reloadTimer -= dt;
    if (weapon.reloadTimer <= 0) finishReload(weapon);
  }

  weapon.fireTimer = Math.max(0, weapon.fireTimer - dt);
  weapon.altFireCooldownTimer = Math.max(0, weapon.altFireCooldownTimer - dt);

  const canFire = weapon.fireTimer <= 0 && !weapon.reloading && weapon.currentAmmo > 0;
  if (canFire) {
    if (weapon.def.automatic && mouseDown) fireWeapon(weapon);
    else if (!weapon.def.automatic && mouseJustPressed) fireWeapon(weapon);
  }

  // Alt fire
  if (rightMouseJustPressed && weapon.altFireCooldownTimer <= 0 && !weapon.reloading) {
    performAltFire(weapon);
  }
}

function switchWeapon(idx: number): void {
  if (idx === currentWeaponIdx || idx < 0 || idx >= weapons.length) return;
  if (weaponSwitchTimer > 0) return;
  weapons[currentWeaponIdx].equipped = false;
  prevWeaponIdx = currentWeaponIdx;
  currentWeaponIdx = idx;
  weapons[currentWeaponIdx].equipped = true;
  weaponSwitchTimer = WEAPON_SWITCH_TIME;
  Audio.playReload();
}

function startReload(weapon: WeaponState): void {
  weapon.reloading = true;
  weapon.reloadTimer = weapon.def.reloadTime;
  Audio.playReload();
}

function finishReload(weapon: WeaponState): void {
  const needed = weapon.def.magazineSize - weapon.currentAmmo;
  const available = Math.min(needed, weapon.reserveAmmo);
  weapon.currentAmmo += available;
  weapon.reserveAmmo -= available;
  weapon.reloading = false;
}

function fireWeapon(weapon: WeaponState): void {
  const dmgMult = player.overdriveTimer > 0 ? 1.5 : 1;
  weapon.currentAmmo--;
  weapon.fireTimer = 1 / weapon.def.fireRate;

  Audio.playGunshot(weapon.def.slot);

  const muzzlePos = camera.position
    .add(camera.getDirection(Vector3.Forward()).scale(1.5))
    .add(camera.getDirection(Vector3.Right()).scale(0.3))
    .add(camera.getDirection(Vector3.Up()).scale(-0.15));

  createMuzzleFlash(scene, muzzlePos, camera.getDirection(Vector3.Forward()), weapon.def.muzzleFlashScale);

  const recoilX = weapon.def.recoilUp * (0.8 + Math.random() * 0.4);
  const recoilY = weapon.def.recoilSide * (Math.random() - 0.5) * 2;
  camera.rotation.x -= recoilX;
  camera.rotation.y += recoilY;
  recoilRecovery.x += recoilX;
  recoilRecovery.y -= recoilY;
  screenShakeIntensity = weapon.def.screenShake;

  if (weapon.def.type === 'hitscan') {
    for (let p = 0; p < weapon.def.projectilesPerShot; p++) {
      fireHitscan(weapon, muzzlePos, dmgMult);
    }
  } else {
    fireProjectile(weapon, muzzlePos, dmgMult);
  }
}

function performAltFire(weapon: WeaponState): void {
  weapon.altFireCooldownTimer = weapon.def.altFireCooldown;
  Audio.playAltFire(weapon.def.slot);

  const muzzlePos = camera.position
    .add(camera.getDirection(Vector3.Forward()).scale(1.5))
    .add(camera.getDirection(Vector3.Right()).scale(0.3));

  switch (weapon.def.altFireType) {
    case 'burst': {
      const burstCount = 3;
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          if (weapon.currentAmmo > 0) {
            weapon.currentAmmo--;
            fireHitscan(weapon, muzzlePos, 1);
            Audio.playGunshot(weapon.def.slot);
          }
        }, i * 60);
      }
      break;
    }
    case 'explosive': {
      if (weapon.currentAmmo >= 2) {
        weapon.currentAmmo -= 2;
        const dir = camera.getDirection(Vector3.Forward());
        const hitPoint = camera.position.add(dir.scale(weapon.def.range * 0.6));
        createExplosion(scene, hitPoint, 5);
        Audio.playExplosion();
        explosionDamage(hitPoint, weapon.def.damage * 2, 5);
      }
      break;
    }
    case 'emp': {
      createEMPBlast(scene, player.position, 12);
      for (const enemy of enemies) {
        if (!enemy.alive) continue;
        const d = Vector3.Distance(player.position, enemy.position);
        if (d < 12) {
          enemy.fireTimer += 3;
          const result = damageEnemy(enemy, 15, false);
          if (result.killed) onEnemyKilled(enemy, false, false);
        }
      }
      Audio.playExplosion();
      screenShakeIntensity = 0.5;
      break;
    }
    case 'beam': {
      const dir = camera.getDirection(Vector3.Forward());
      const endPt = camera.position.add(dir.scale(40));
      createBeamEffect(scene, muzzlePos, endPt);
      const ray = new Ray(camera.position, dir, 40);
      for (const enemy of enemies) {
        if (!enemy.alive) continue;
        for (const bp of enemy.bodyParts) {
          const bi = bp.getBoundingInfo();
          if (bi && ray.intersectsBoxMinMax(bi.boundingBox.minimumWorld, bi.boundingBox.maximumWorld)) {
            const result = damageEnemy(enemy, weapon.def.damage * 0.8, false);
            createBloodEffect(scene, enemy.position.add(new Vector3(0, 1, 0)), dir);
            if (result.killed) onEnemyKilled(enemy, false, false);
            break;
          }
        }
      }
      break;
    }
    case 'charge': {
      if (weapon.currentAmmo >= 3) {
        weapon.currentAmmo -= 3;
        fireHitscan(weapon, muzzlePos, 3);
      }
      break;
    }
  }
}

function fireHitscan(weapon: WeaponState, muzzlePos: Vector3, dmgMult: number): void {
  const spread = weapon.def.spread;
  const dir = camera.getDirection(Vector3.Forward()).add(new Vector3(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
  )).normalize();

  const ray = new Ray(camera.position, dir, weapon.def.range);

  let hitEnemy: Enemy | null = null;
  let hitDist = weapon.def.range;
  let hitHeadshot = false;
  let hitPoint = camera.position.add(dir.scale(weapon.def.range));

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    for (const bp of enemy.bodyParts) {
      const bi = bp.getBoundingInfo();
      if (!bi) continue;
      if (ray.intersectsBoxMinMax(bi.boundingBox.minimumWorld, bi.boundingBox.maximumWorld)) {
        const d = Vector3.Distance(camera.position, bp.absolutePosition);
        if (d < hitDist) {
          hitDist = d;
          hitEnemy = enemy;
          hitHeadshot = bp.metadata?.isHead === true;
          hitPoint = camera.position.add(dir.scale(d));
        }
      }
    }
  }

  const worldPick = scene.pickWithRay(ray, (mesh) => mesh.checkCollisions && mesh.isPickable !== false);
  if (worldPick?.hit && worldPick.distance < hitDist) {
    hitEnemy = null;
    hitPoint = worldPick.pickedPoint!;
    createBulletImpact(scene, hitPoint, worldPick.getNormal(true) || Vector3.Up());
  }

  createTracer(scene, muzzlePos, hitPoint);

  if (hitEnemy) {
    const baseDmg = hitHeadshot ? weapon.def.damage * weapon.def.headshotMultiplier : weapon.def.damage;
    const result = damageEnemy(hitEnemy, baseDmg * dmgMult, hitHeadshot);
    createBloodEffect(scene, hitPoint, dir);

    if (hitHeadshot) {
      Audio.playHeadshot();
    } else {
      Audio.playHit();
    }
    showHitMarker();

    if (result.killed) {
      const isLongshot = hitDist > 40;
      onEnemyKilled(hitEnemy, hitHeadshot, isLongshot);
    }
  }
}

let rocketTrailTextureUrl: string | null = null;
let rocketTrailTexture: Texture | null = null;

function createRocketTrailTexture(): string {
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return c.toDataURL();
}

function getRocketTrailTexture(scene: Scene): Texture {
  if (rocketTrailTexture && !rocketTrailTexture.isDisposed()) return rocketTrailTexture;
  if (!rocketTrailTextureUrl) rocketTrailTextureUrl = createRocketTrailTexture();
  rocketTrailTexture = new Texture(rocketTrailTextureUrl, scene);
  return rocketTrailTexture;
}

function fireProjectile(weapon: WeaponState, muzzlePos: Vector3, dmgMult: number): void {
  const spread = weapon.def.spread;
  const dir = camera.getDirection(Vector3.Forward()).add(new Vector3(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
  )).normalize();

  const rocket = MeshBuilder.CreateSphere('rocket', { diameter: 0.3, segments: 6 }, scene);
  rocket.position = muzzlePos.clone();
  const mat = new StandardMaterial('rocketMat', scene);
  mat.emissiveColor = new Color3(1, 0.5, 0.1);
  mat.disableLighting = true;
  rocket.material = mat;
  rocket.checkCollisions = false;
  rocket.isPickable = false;

  const trail = new ParticleSystem('rocketTrail', 60, scene);
  trail.particleTexture = getRocketTrailTexture(scene);
  trail.emitter = rocket;
  trail.minLifeTime = 0.15;
  trail.maxLifeTime = 0.4;
  trail.minSize = 0.15;
  trail.maxSize = 0.4;
  trail.emitRate = 80;
  trail.color1 = new Color4(1, 0.6, 0.1, 0.8);
  trail.color2 = new Color4(1, 0.3, 0, 0.6);
  trail.colorDead = new Color4(0.3, 0.1, 0, 0);
  trail.direction1 = new Vector3(-0.5, -0.5, -0.5);
  trail.direction2 = new Vector3(0.5, 0.5, 0.5);
  trail.minEmitPower = 0.5;
  trail.maxEmitPower = 1.5;
  trail.gravity = new Vector3(0, 1, 0);
  trail.blendMode = ParticleSystem.BLENDMODE_ADD;
  trail.start();

  projectiles.push({
    mesh: rocket,
    velocity: dir.scale(weapon.def.projectileSpeed!),
    damage: weapon.def.damage * dmgMult,
    radius: weapon.def.explosionRadius!,
    timer: 5,
    trail,
  });
}

// ── Projectile Update ──
function updateProjectilesLoop(dt: number): void {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    proj.timer -= dt;
    const prevPos = proj.mesh.position.clone();
    proj.mesh.position.addInPlace(proj.velocity.scale(dt));
    proj.velocity.y += GRAVITY * 0.3 * dt;

    const dir = proj.mesh.position.subtract(prevPos);
    const dist = dir.length();
    if (dist > 0) {
      const ray = new Ray(prevPos, dir.normalize(), dist);
      const hit = scene.pickWithRay(ray, (mesh) => mesh.checkCollisions);
      if (hit?.hit || proj.timer <= 0) {
        const expPos = hit?.pickedPoint || proj.mesh.position;
        explosionDamage(expPos, proj.damage, proj.radius);
        createExplosion(scene, expPos, proj.radius);
        Audio.playExplosion();
        screenShakeIntensity = 2;
        if (proj.trail) { proj.trail.stop(); proj.trail.dispose(); }
        proj.mesh.dispose();
        projectiles.splice(i, 1);
        continue;
      }
    }

    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const d = Vector3.Distance(proj.mesh.position, enemy.position.add(new Vector3(0, 1, 0)));
      if (d < 1.5) {
        explosionDamage(proj.mesh.position, proj.damage, proj.radius);
        createExplosion(scene, proj.mesh.position, proj.radius);
        Audio.playExplosion();
        screenShakeIntensity = 2;
        if (proj.trail) { proj.trail.stop(); proj.trail.dispose(); }
        proj.mesh.dispose();
        projectiles.splice(i, 1);
        break;
      }
    }
  }
}

function explosionDamage(pos: Vector3, damage: number, radius: number): void {
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const d = Vector3.Distance(pos, enemy.position.add(new Vector3(0, 1, 0)));
    if (d < radius) {
      const falloff = 1 - d / radius;
      const result = damageEnemy(enemy, damage * falloff, false);
      if (result.killed) onEnemyKilled(enemy, false, false, true);
    }
  }
  const playerDist = Vector3.Distance(pos, player.position);
  if (playerDist < radius) {
    damagePlayer(damage * (1 - playerDist / radius) * 0.3);
  }
}

// ── Kill Handling ──
function onEnemyKilled(enemy: Enemy, headshot: boolean, longshot: boolean = false, explosion: boolean = false): void {
  player.kills++;
  player.streak++;
  player.comboTimer = COMBO_TIMEOUT;
  player.comboMultiplier = Math.min(4, 1 + player.streak * 0.25);

  multiKillCount++;
  multiKillTimer = 1.5;

  const scoreMultiplier = player.comboMultiplier;
  let scoreGain = Math.round(enemy.type.scoreValue * scoreMultiplier);
  if (headshot) scoreGain = Math.round(scoreGain * 1.5);
  player.score += scoreGain;
  gameState.totalKills++;

  Audio.playKill();

  let feedText = `Eliminated ${enemy.type.name} +${scoreGain}`;
  let feedColor = '#00ffc8';

  // Style kills
  const styles: string[] = [];
  if (headshot) {
    styles.push('HEADSHOT');
    feedColor = '#ff3333';
    awardStyle(STYLE_DEFS[0]);
  }
  if (!player.grounded) {
    player.lastKillWasAirborne = true;
    awardStyle(STYLE_DEFS[1]);
    styles.push('AERIAL');
  }
  if (player.wallRunning) {
    player.lastKillWasWallRun = true;
    awardStyle(STYLE_DEFS[2]);
    styles.push('WALLRUN');
  }
  if (player.grappling) {
    awardStyle(STYLE_DEFS[3]);
    styles.push('GRAPPLE');
  }
  if (multiKillCount >= 2) {
    awardStyle(STYLE_DEFS[4]);
    styles.push('MULTI');
  }
  if (longshot) {
    awardStyle(STYLE_DEFS[5]);
    styles.push('LONGSHOT');
  }
  if (explosion) {
    awardStyle(STYLE_DEFS[6]);
  }

  if (styles.length > 0) feedText += ' ' + styles.join(' ');
  if (player.streak >= 3) {
    feedText += ` (${player.streak}x STREAK)`;
    feedColor = '#ffaa00';
  }
  addKillFeedEntry(feedText, feedColor);
  checkStreakRewards();

  if (enemy.type.isBoss) {
    gameState.bossActive = false;
    Audio.playBossDeath();
    player.score += 500;
    addKillFeedEntry('BOSS DESTROYED +500', '#ff3333');
  }
}

function awardStyle(def: StyleKill): void {
  player.stylePoints += def.bonus;
  showStylePopup(def.label, '#ffaa00');
  Audio.playStylePoint();
}

// ── Player Damage ──
function damagePlayer(damage: number): void {
  let remaining = damage;
  if (player.armor > 0) {
    const absorb = Math.min(player.armor, remaining * 0.6);
    player.armor -= absorb;
    remaining -= absorb;
  }

  player.health -= remaining;
  damageIntensity = Math.min(1, damageIntensity + remaining / 40);
  showDamageVignette(damageIntensity);
  Audio.playDamage();
  screenShakeIntensity = Math.max(screenShakeIntensity, damage / 30);

  if (player.health <= 0) {
    player.health = 0;
    player.alive = false;
    player.deaths++;
    player.streak = 0;
    gameState.phase = 'gameover';
    Audio.playDeath();
    showGameOver(player.score, gameState.wave);
    hideHUD();
    document.exitPointerLock();
  }
}

// ── Enemies ──
function updateEnemiesLoop(dt: number): void {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];

    updateEnemy(enemy, player.position, player, dt, scene, (origin, dir, damage) => {
      Audio.playEnemyShoot();
      createEnemyTracer(scene, origin, origin.add(dir.scale(100)));

      const toPlayer = player.position.subtract(origin);
      const dist = toPlayer.length();
      const toPlayerDir = toPlayer.scale(1 / Math.max(dist, 0.001));
      const dot = Vector3.Dot(toPlayerDir, dir);
      const hitRadius = PLAYER_RADIUS + dist * 0.02;

      if (dot > 0.95 && dist < 80) {
        const cross = Vector3.Cross(toPlayer, dir);
        const perpDist = cross.length() / dir.length();
        if (perpDist < hitRadius) {
          damagePlayer(damage);
        }
      }
    });

    if (!enemy.alive && enemy.deathTimer > 1) {
      cleanupEnemy(enemy);
      enemies.splice(i, 1);
    }
  }
}

// ── Grenades ──
function updateGrenadesLoop(dt: number): void {
  for (let i = grenades.length - 1; i >= 0; i--) {
    const g = grenades[i];
    g.timer -= dt;
    g.velocity.y += GRAVITY * dt;

    g.mesh.position.addInPlace(g.velocity.scale(dt));

    if (g.mesh.position.y < 0.15) {
      g.mesh.position.y = 0.15;
      g.velocity.y = Math.abs(g.velocity.y) * 0.4;
      g.velocity.x *= 0.7;
      g.velocity.z *= 0.7;
      g.bounces++;
    }

    if (Math.abs(g.mesh.position.x) > 79) {
      g.velocity.x *= -0.5;
      g.mesh.position.x = Math.sign(g.mesh.position.x) * 79;
    }
    if (Math.abs(g.mesh.position.z) > 79) {
      g.velocity.z *= -0.5;
      g.mesh.position.z = Math.sign(g.mesh.position.z) * 79;
    }

    if (g.timer < 0.5) {
      const flash = Math.sin(g.timer * 30) > 0;
      (g.mesh.material as StandardMaterial).emissiveColor = flash ? new Color3(1, 0, 0) : new Color3(1, 0.3, 0);
    }

    if (g.timer <= 0) {
      createExplosion(scene, g.mesh.position, GRENADE_RADIUS);
      Audio.playExplosion();
      screenShakeIntensity = 1.5;
      explosionDamage(g.mesh.position, GRENADE_DAMAGE, GRENADE_RADIUS);
      g.mesh.dispose();
      grenades.splice(i, 1);
    }
  }
}

// ── Pickups ──
function updatePickupsLoop(dt: number): void {
  for (const pickup of pickups) {
    if (!pickup.active) {
      pickup.respawnTimer -= dt;
      if (pickup.respawnTimer <= 0) {
        pickup.active = true;
        pickup.mesh.setEnabled(true);
      }
      continue;
    }

    pickup.mesh.rotation.y += dt * 2;
    pickup.mesh.position.y = pickup.position.y + 0.5 + Math.sin(performance.now() * 0.003) * 0.15;

    const d = Vector3.Distance(
      new Vector3(player.position.x, 0, player.position.z),
      new Vector3(pickup.position.x, 0, pickup.position.z),
    );
    if (d < 2) {
      let consumed = false;
      switch (pickup.type) {
        case 'health':
          if (player.health < player.maxHealth) {
            player.health = Math.min(player.maxHealth, player.health + pickup.value);
            consumed = true;
          }
          break;
        case 'armor':
          if (player.armor < player.maxArmor) {
            player.armor = Math.min(player.maxArmor, player.armor + pickup.value);
            consumed = true;
          }
          break;
        case 'ammo':
          weapons.forEach(w => {
            w.reserveAmmo = Math.min(w.def.reserveAmmo, w.reserveAmmo + Math.ceil(w.def.magazineSize * 0.5));
          });
          consumed = true;
          break;
        case 'grenade':
          if (grenadeCount < MAX_GRENADES) {
            grenadeCount = Math.min(MAX_GRENADES, grenadeCount + pickup.value);
            consumed = true;
          }
          break;
        case 'overdrive':
          player.overdriveTimer = pickup.value;
          consumed = true;
          Audio.playOverdrive();
          addKillFeedEntry('OVERDRIVE ACTIVE! +50% damage', '#ffaa00');
          break;
      }

      if (consumed) {
        Audio.playPickup();
        if (pickup.type !== 'overdrive') addKillFeedEntry(`Picked up ${pickup.type}`, '#00ff88');
        pickup.active = false;
        pickup.mesh.setEnabled(false);
        pickup.respawnTimer = PICKUP_RESPAWN_TIME;
      }
    }
  }
}

// ── Wave System ──
function updateWaveSystem(dt: number): void {
  if (gameState.enemiesRemaining <= 0 && enemies.filter(e => e.alive).length === 0) {
    gameState.waveTimer -= dt;
    if (gameState.waveTimer <= 0) {
      gameState.wave++;
      startWave(gameState.wave);
    }
  }

  if (gameState.enemiesRemaining > 0 && enemies.filter(e => e.alive).length < 12) {
    gameState.spawnTimer -= dt;
    if (gameState.spawnTimer <= 0) {
      gameState.spawnTimer = 1.5 - Math.min(1, gameState.wave * 0.05);
      spawnNextEnemy();
    }
  }
}

function startWave(wave: number): void {
  const enemyCount = BASE_ENEMIES_PER_WAVE + Math.floor(wave * 1.5);
  gameState.enemiesInWave = enemyCount;
  gameState.enemiesRemaining = enemyCount;
  gameState.waveTimer = WAVE_DELAY;
  gameState.spawnTimer = 0;
  gameState.difficulty = 1 + (wave - 1) * 0.1;

  showWaveAnnounce(wave);
  Audio.playWaveStart();

  if (wave % BOSS_WAVE_INTERVAL === 0) {
    gameState.bossActive = true;
    showBossAnnounce();
    Audio.playBossSpawn();
  }

  grenadeCount = Math.min(MAX_GRENADES, grenadeCount + 1);
  if (wave > 1) {
    player.health = Math.min(player.maxHealth, player.health + 15);
    player.score += wave * 50;
    addKillFeedEntry(`Wave ${wave} bonus: +${wave * 50} pts, +1 grenade, +15 HP`, '#00ff88');
  }
  addKillFeedEntry(`Wave ${wave} - ${enemyCount} enemies`, '#00ffc8');
}

function spawnNextEnemy(): void {
  const isBossSpawn = gameState.bossActive && enemies.filter(e => e.alive && e.type.isBoss).length === 0;

  let type: typeof ENEMY_TYPES[number];
  if (isBossSpawn) {
    type = ENEMY_TYPES.find(t => t.isBoss) || ENEMY_TYPES[ENEMY_TYPES.length - 1];
  } else {
    const available = ENEMY_TYPES.filter((t, i) => {
      if (t.isBoss) return false;
      if (i === 0) return true;
      if (i === 1) return gameState.wave >= 2;
      if (i === 2) return gameState.wave >= 4;
      if (i === 3) return gameState.wave >= 3;
      if (i === 4) return gameState.wave >= 5;
      return false;
    });
    type = available[Math.floor(Math.random() * available.length)];
  }

  const validSpawns = mapData.spawnPoints.filter(sp => Vector3.Distance(sp, player.position) > 30);
  const spawnPos = validSpawns.length > 0
    ? validSpawns[Math.floor(Math.random() * validSpawns.length)]
    : mapData.spawnPoints[Math.floor(Math.random() * mapData.spawnPoints.length)];

  const scaled = { ...type };
  const waveMult = gameState.difficulty;
  scaled.health = Math.round(type.health * waveMult);
  scaled.damage = Math.round(type.damage * (1 + (gameState.wave - 1) * 0.05));
  scaled.speed = type.speed * (1 + (gameState.wave - 1) * 0.02);

  const enemy = spawnEnemy(scene, scaled, spawnPos.clone());
  if (mapData.shadowGenerator) {
    enemy.bodyParts.forEach(bp => mapData.shadowGenerator!.addShadowCaster(bp));
  }
  enemies.push(enemy);
  gameState.enemiesRemaining--;
}

// ── Abilities ──
function updateAbilities(dt: number, rawDt: number): void {
  dashCooldown = Math.max(0, dashCooldown - dt);
  slideCooldown = Math.max(0, slideCooldown - dt);
  grappleCooldown = Math.max(0, grappleCooldown - dt);
  if (player.overdriveTimer > 0) player.overdriveTimer -= rawDt;

  // Multi-kill timer
  if (multiKillTimer > 0) {
    multiKillTimer -= dt;
    if (multiKillTimer <= 0) multiKillCount = 0;
  }

  // Dash (Q)
  if (keysJustPressed.has('q') && dashCooldown <= 0 && dashTimer <= 0) {
    const forward = camera.getDirection(Vector3.Forward());
    forward.y = 0; forward.normalize();
    const right = camera.getDirection(Vector3.Right());
    right.y = 0; right.normalize();

    let dir = Vector3.Zero();
    if (keysHeld.has('w')) dir.addInPlace(forward);
    if (keysHeld.has('s')) dir.subtractInPlace(forward);
    if (keysHeld.has('d')) dir.addInPlace(right);
    if (keysHeld.has('a')) dir.subtractInPlace(right);
    if (dir.length() < 0.1) dir = forward;
    dir.normalize();

    dashDirection = dir;
    dashTimer = DASH_DURATION;
    dashCooldown = DASH_COOLDOWN;
    Audio.playJump();
    screenShakeIntensity = 0.3;
  }

  // Slide (CTRL while sprinting)
  if (keysJustPressed.has('control') && player.sprinting && slideCooldown <= 0 && slideTimer <= 0 && player.grounded) {
    const forward = camera.getDirection(Vector3.Forward());
    forward.y = 0; forward.normalize();
    slideDirection = forward;
    slideTimer = SLIDE_DURATION;
    slideCooldown = SLIDE_COOLDOWN;
    Audio.playLand();
  }

  // Grapple (E)
  if (keysJustPressed.has('e')) {
    if (player.grappling) {
      releaseGrapple();
    } else if (grappleCooldown <= 0) {
      tryGrapple();
    }
  }

  // Bullet Time (F)
  if (keysJustPressed.has('f')) {
    if (player.bulletTimeActive) {
      deactivateBulletTime();
    } else if (player.bulletTimeEnergy > 10) {
      activateBulletTime();
    }
  }

  if (player.bulletTimeActive) {
    player.bulletTimeEnergy -= BULLET_TIME_DRAIN * rawDt;
    if (player.bulletTimeEnergy <= 0) {
      player.bulletTimeEnergy = 0;
      deactivateBulletTime();
    }
  } else {
    player.bulletTimeEnergy = Math.min(MAX_BT_ENERGY, player.bulletTimeEnergy + BULLET_TIME_RECHARGE * rawDt);
  }

  // Grenade (G)
  if (keysJustPressed.has('g') && grenadeCount > 0) {
    throwGrenade();
    grenadeCount--;
  }
}

function tryGrapple(): void {
  const camDir = camera.getDirection(Vector3.Forward());
  let bestPoint: Vector3 | null = null;
  let bestDot = 0.7;

  for (const gp of mapData.grapplePoints) {
    const toPoint = gp.subtract(camera.position);
    const dist = toPoint.length();
    if (dist > GRAPPLE_RANGE) continue;
    const dir = toPoint.normalize();
    const dot = Vector3.Dot(dir, camDir);
    if (dot > bestDot) {
      bestDot = dot;
      bestPoint = gp;
    }
  }

  if (bestPoint) {
    player.grappling = true;
    player.grapplePoint = bestPoint;
    player.grappleLength = Vector3.Distance(player.position, bestPoint);
    Audio.playGrappleHit();
  }
}

function releaseGrapple(): void {
  player.grappling = false;
  player.grapplePoint = null;
  grappleCooldown = GRAPPLE_COOLDOWN;
  player.airJumpsLeft = MAX_AIR_JUMPS;
  Audio.playGrappleRelease();
  if (grappleBeamMesh) { grappleBeamMesh.dispose(); grappleBeamMesh = null; }
}

function activateBulletTime(): void {
  player.bulletTimeActive = true;
  gameState.timeScale = BULLET_TIME_SCALE;
  btPost?.setActive(true);
  Audio.playBulletTime();
}

function deactivateBulletTime(): void {
  player.bulletTimeActive = false;
  gameState.timeScale = 1;
  btPost?.setActive(false);
  Audio.playBulletTimeEnd();
}

function throwGrenade(): void {
  const throwDir = camera.getDirection(Vector3.Forward()).add(new Vector3(0, 0.3, 0)).normalize();
  const startPos = camera.position.add(throwDir.scale(1.5));

  const grenade = MeshBuilder.CreateSphere('grenade', { diameter: 0.25, segments: 6 }, scene);
  grenade.position = startPos.clone();
  const mat = new StandardMaterial('grenadeMat', scene);
  mat.emissiveColor = new Color3(1, 0.3, 0);
  mat.disableLighting = true;
  grenade.material = mat;
  grenade.checkCollisions = false;
  grenade.isPickable = false;

  grenades.push({
    mesh: grenade,
    velocity: throwDir.scale(GRENADE_SPEED).add(player.velocity.scale(0.3)),
    timer: GRENADE_FUSE,
    bounces: 0,
  });

  Audio.playJump();
}

// ── Combo System ──
function updateComboSystem(dt: number): void {
  if (player.comboTimer > 0) {
    player.comboTimer -= dt;
    if (player.comboTimer <= 0) {
      player.comboMultiplier = 1;
      player.streak = 0;
      lastStreakAnnounce = 0;
    }
  }
}

function checkStreakRewards(): void {
  const banners: Record<number, string> = {
    3: 'TRIPLE KILL', 5: 'RAMPAGE', 7: 'UNSTOPPABLE', 10: 'GODLIKE', 15: 'LEGENDARY', 20: 'BEYOND GODLIKE',
  };

  const banner = banners[player.streak];
  if (banner && player.streak > lastStreakAnnounce) {
    lastStreakAnnounce = player.streak;
    const el = document.getElementById('streak-banner')!;
    el.textContent = banner;
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');

    Audio.playCombo(player.streak);

    if (player.streak === 5) {
      player.health = Math.min(player.maxHealth, player.health + 25);
      addKillFeedEntry('RAMPAGE! +25 Health', '#ffaa00');
    }
    if (player.streak === 7) {
      player.armor = Math.min(player.maxArmor, player.armor + 25);
      addKillFeedEntry('UNSTOPPABLE! +25 Armor', '#ffaa00');
    }
    if (player.streak === 10) {
      grenadeCount = Math.min(MAX_GRENADES, grenadeCount + 2);
      weapons.forEach(w => { w.reserveAmmo = w.def.reserveAmmo; });
      addKillFeedEntry('GODLIKE! Full Ammo + Grenades', '#ff3333');
    }
    if (player.streak >= 15) {
      player.health = player.maxHealth;
      player.armor = player.maxArmor;
      addKillFeedEntry('LEGENDARY! Full Restore', '#ff3333');
    }
  }
}

// ── Effects ──
function updateEffects(dt: number): void {
  damageIntensity = Math.max(0, damageIntensity - DAMAGE_RECOVERY_RATE * dt);
  damagePost?.setDamageIntensity(damageIntensity);
  screenShakeIntensity = Math.max(0, screenShakeIntensity - dt * 8);

  if (player.health < 20 && player.health > 0) {
    player.health = Math.min(20, player.health + dt * 2);
  }

  const t = performance.now() * 0.001;
  for (const anim of mapData.animatedMeshes) {
    anim.mesh.rotation.x += anim.rotSpeed.x * dt;
    anim.mesh.rotation.y += anim.rotSpeed.y * dt;
    anim.mesh.rotation.z += anim.rotSpeed.z * dt;
    anim.mesh.position.y = anim.baseY + Math.sin(t * anim.bobSpeed) * anim.bobAmount;
  }
}

function updateWeaponModel(dt: number): void {
  if (!weaponModel) return;

  if (weaponSwitchTimer > 0) {
    weaponSwitchTimer -= dt;
    const progress = weaponSwitchTimer / WEAPON_SWITCH_TIME;
    if (progress > 0.5) {
      weaponModels.forEach((m, i) => m.setEnabled(i === prevWeaponIdx));
    } else {
      weaponModels.forEach((m, i) => m.setEnabled(i === currentWeaponIdx));
    }
  } else {
    weaponModels.forEach((m, i) => m.setEnabled(i === currentWeaponIdx));
  }

  const weapon = weapons[currentWeaponIdx];
  const swayX = weaponSwayX * 2;
  const swayY = weaponSwayY * 2;

  let bobX = 0, bobY = 0;
  const hSpeed = new Vector3(player.velocity.x, 0, player.velocity.z).length();
  if (player.grounded && hSpeed > 1) {
    const bobFreq = player.sprinting ? 14 : 10;
    const t = performance.now() * 0.001 * bobFreq;
    bobX = Math.cos(t) * 0.008;
    bobY = Math.abs(Math.sin(t)) * 0.006;
  }

  let reloadOffset = 0;
  if (weapon.reloading) {
    const progress = 1 - weapon.reloadTimer / weapon.def.reloadTime;
    reloadOffset = Math.sin(progress * Math.PI) * 0.15;
  }

  let switchOffset = 0;
  if (weaponSwitchTimer > 0) {
    switchOffset = Math.sin((weaponSwitchTimer / WEAPON_SWITCH_TIME) * Math.PI) * 0.4;
  }

  const fireKick = weapon.fireTimer > 0 ? weapon.fireTimer * weapon.def.recoilUp * 8 : 0;
  const dashTilt = dashTimer > 0 ? 0.15 : 0;
  const sprintTilt = player.sprinting ? 0.06 : 0;

  weaponModel.position.x = -swayX + bobX;
  weaponModel.position.y = -swayY + bobY - reloadOffset - switchOffset;
  weaponModel.position.z = -fireKick;
  weaponModel.rotation.x = swayY * 0.5 + dashTilt;
  weaponModel.rotation.y = -swayX * 0.5;
  weaponModel.rotation.z = -swayX * 0.3 + bobX * 2 - sprintTilt;
}

// ── Minimap ──
function updateMinimap(): void {
  const canvas = document.getElementById('minimap') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const mapScale = w / 180;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0, 10, 20, 0.8)';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(0, 255, 200, 0.08)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 8; i++) {
    const pos = (i / 8) * w;
    ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(w, pos); ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(0, 255, 200, 0.3)';
  ctx.lineWidth = 1;
  const bw = 160 * mapScale;
  ctx.strokeRect(w / 2 - bw / 2, h / 2 - bw / 2, bw, bw);

  const toScreen = (wx: number, wz: number): [number, number] => [w / 2 + wx * mapScale, h / 2 + wz * mapScale];

  // Center platform
  ctx.fillStyle = 'rgba(0, 255, 200, 0.15)';
  const [cx, cz] = toScreen(-8, -8);
  ctx.fillRect(cx, cz, 16 * mapScale, 16 * mapScale);

  // Grapple points
  ctx.fillStyle = 'rgba(0, 200, 255, 0.4)';
  for (const gp of mapData.grapplePoints) {
    const [gx, gz] = toScreen(gp.x, gp.z);
    ctx.beginPath();
    ctx.arc(gx, gz, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Enemies
  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const [ex, ez] = toScreen(enemy.position.x, enemy.position.z);
    const c = enemy.type.color;
    ctx.fillStyle = `rgba(${Math.floor(c[0] * 255)}, ${Math.floor(c[1] * 255)}, ${Math.floor(c[2] * 255)}, 0.9)`;
    ctx.beginPath();
    ctx.arc(ex, ez, enemy.type.isBoss ? 4 : 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pickups
  for (const pickup of pickups) {
    if (!pickup.active) continue;
    const [px, pz] = toScreen(pickup.position.x, pickup.position.z);
    const colors: Record<string, string> = {
      health: 'rgba(0, 255, 100, 0.6)',
      armor: 'rgba(50, 130, 255, 0.6)',
      ammo: 'rgba(255, 200, 0, 0.6)',
      grenade: 'rgba(255, 100, 25, 0.6)',
      overdrive: 'rgba(255, 180, 0, 0.6)',
    };
    ctx.fillStyle = colors[pickup.type] || 'rgba(255,255,255,0.4)';
    ctx.fillRect(px - 1.5, pz - 1.5, 3, 3);
  }

  // Player
  const [plx, plz] = toScreen(player.position.x, player.position.z);
  const angle = camera.rotation.y;
  ctx.save();
  ctx.translate(plx, plz);
  ctx.rotate(angle);
  ctx.fillStyle = '#00ffc8';
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.lineTo(-3.5, 4);
  ctx.lineTo(3.5, 4);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(0, 255, 200, 0.06)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-25, -50);
  ctx.lineTo(25, -50);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// ── HUD Helpers ──
function updateAbilityHUD(): void {
  const dashEl = document.getElementById('ability-dash')!;
  const dashCdEl = document.getElementById('dash-cd')!;
  const grappleEl = document.getElementById('ability-grapple')!;
  const grappleCdEl = document.getElementById('grapple-cd')!;
  const btimeEl = document.getElementById('ability-btime')!;
  const btimeCdEl = document.getElementById('btime-cd')!;
  const grenadeEl = document.getElementById('ability-grenade')!;
  const grenadeCdEl = document.getElementById('grenade-cd')!;
  const enemiesEl = document.getElementById('enemies-remaining')!;
  const btFill = document.getElementById('bt-energy-fill')!;

  // Dash
  if (dashCooldown <= 0 && dashTimer <= 0) {
    dashEl.classList.add('ready'); dashEl.classList.remove('active');
    dashCdEl.textContent = 'READY'; dashCdEl.classList.remove('on-cd');
  } else if (dashTimer > 0) {
    dashEl.classList.remove('ready'); dashEl.classList.add('active');
    dashCdEl.textContent = 'ACTIVE'; dashCdEl.classList.remove('on-cd');
  } else {
    dashEl.classList.remove('ready', 'active');
    dashCdEl.textContent = dashCooldown.toFixed(1) + 's'; dashCdEl.classList.add('on-cd');
  }

  // Grapple
  if (player.grappling) {
    grappleEl.classList.remove('ready'); grappleEl.classList.add('active');
    grappleCdEl.textContent = 'ACTIVE'; grappleCdEl.classList.remove('on-cd');
  } else if (grappleCooldown <= 0) {
    grappleEl.classList.add('ready'); grappleEl.classList.remove('active');
    grappleCdEl.textContent = 'READY'; grappleCdEl.classList.remove('on-cd');
  } else {
    grappleEl.classList.remove('ready', 'active');
    grappleCdEl.textContent = grappleCooldown.toFixed(1) + 's'; grappleCdEl.classList.add('on-cd');
  }

  // Bullet Time
  if (player.bulletTimeActive) {
    btimeEl.classList.remove('ready'); btimeEl.classList.add('active');
    btimeCdEl.textContent = 'ACTIVE'; btimeCdEl.classList.remove('on-cd');
  } else if (player.bulletTimeEnergy > 10) {
    btimeEl.classList.add('ready'); btimeEl.classList.remove('active');
    btimeCdEl.textContent = 'READY'; btimeCdEl.classList.remove('on-cd');
  } else {
    btimeEl.classList.remove('ready', 'active');
    btimeCdEl.textContent = 'LOW'; btimeCdEl.classList.add('on-cd');
  }

  // Grenade
  if (grenadeCount > 0) {
    grenadeEl.classList.add('ready');
    grenadeCdEl.textContent = `×${grenadeCount}`;
    grenadeCdEl.classList.remove('on-cd');
  } else {
    grenadeEl.classList.remove('ready');
    grenadeCdEl.textContent = '×0';
    grenadeCdEl.classList.add('on-cd');
  }

  // BT energy bar
  btFill.style.width = `${(player.bulletTimeEnergy / MAX_BT_ENERGY) * 100}%`;

  // Enemies remaining
  const alive = enemies.filter(e => e.alive).length;
  if (alive > 0 || gameState.enemiesRemaining > 0) {
    enemiesEl.textContent = `HOSTILES: ${alive + Math.max(0, gameState.enemiesRemaining)}`;
  } else {
    enemiesEl.textContent = '';
  }

  // Alt fire info
  const weapon = weapons[currentWeaponIdx];
  const altInfo = document.getElementById('alt-fire-info');
  if (altInfo) {
    const readyText = weapon.altFireCooldownTimer <= 0 ? '' : ` (${weapon.altFireCooldownTimer.toFixed(1)}s)`;
    altInfo.textContent = `RMB: ${weapon.def.altFireName}${readyText}`;
  }

  // Grapple reticle
  const reticle = document.getElementById('grapple-reticle')!;
  const camDir = camera.getDirection(Vector3.Forward());
  let showReticle = false;
  if (!player.grappling && grappleCooldown <= 0) {
    for (const gp of mapData.grapplePoints) {
      const toP = gp.subtract(camera.position);
      if (toP.length() < GRAPPLE_RANGE && Vector3.Dot(toP.normalize(), camDir) > 0.7) {
        showReticle = true;
        break;
      }
    }
  }
  reticle.classList.toggle('visible', showReticle);
}

function updateMovementIndicator(): void {
  const el = document.getElementById('movement-indicator')!;
  if (player.wallRunning) {
    el.textContent = '◆ WALL RUNNING';
    el.classList.add('active');
  } else if (player.grappling) {
    el.textContent = '◆ GRAPPLING';
    el.classList.add('active');
  } else if (slideTimer > 0) {
    el.textContent = '◆ SLIDING';
    el.classList.add('active');
  } else if (dashTimer > 0) {
    el.textContent = '◆ DASHING';
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
}

function updateOverdriveHUD(): void {
  const border = document.getElementById('overdrive-border')!;
  border.classList.toggle('active', player.overdriveTimer > 0);
}

// ── Boot ──
init().catch(console.error);
