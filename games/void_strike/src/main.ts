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
  TransformNode,
  ParticleSystem,
  Texture,
} from '@babylonjs/core';

import type { PlayerState, GameState, WeaponState, Enemy, Pickup } from './types';
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
} from './particles';
import { createDamagePostProcess } from './postprocess';
import {
  initHUD, updateHUD, addKillFeedEntry,
  showDamageVignette, showHitMarker, showWaveAnnounce,
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
let damagePostProcess: any;
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
let keysHeld = new Set<string>();
let keysJustPressed = new Set<string>();
let scrollDelta = 0;
let weaponModel: TransformNode | null = null;
let frameCount = 0;

let dashCooldown = 0;
let dashTimer = 0;
let dashDirection = Vector3.Zero();
let slideCooldown = 0;
let slideTimer = 0;
let slideDirection = Vector3.Zero();
let grenadeCount = MAX_GRENADES;
let lastStreakAnnounce = 0;

// ── Initialization ──
async function init(): Promise<void> {
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  engine = new Engine(canvas, false, { stencil: false, antialias: false });
  engine.setHardwareScalingLevel(1);

  scene = new Scene(engine);
  scene.collisionsEnabled = true;
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = true;
  scene.blockMaterialDirtyMechanism = true;
  scene.skipPointerMovePicking = true;
  scene.skipPointerDownPicking = true;
  scene.skipPointerUpPicking = true;

  camera = new FreeCamera('fpsCam', new Vector3(0, PLAYER_HEIGHT, -30), scene);
  camera.minZ = 0.1;
  camera.maxZ = 300;
  camera.fov = 1.1;
  camera.inertia = 0;
  camera.angularSensibility = 99999999;
  camera.speed = 0;
  camera.checkCollisions = false;
  scene.activeCamera = camera;

  mapData = buildMap(scene);

  damagePostProcess = createDamagePostProcess(scene, camera);

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
    const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;

    fpsCounter++;
    fpsTimer += dt;
    if (fpsTimer >= 1) {
      displayFps = fpsCounter;
      fpsCounter = 0;
      fpsTimer -= 1;
    }

    if (gameState?.phase === 'playing') {
      updateGame(dt);
    }

    frameCount++;
    scene.render();

    keysJustPressed.clear();
    mouseJustPressed = false;
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
    if (e.button === 0) {
      mouseDown = true;
      mouseJustPressed = true;
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) mouseDown = false;
  });

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
  });
}

let weaponModels: TransformNode[] = [];
let weaponSwitchTimer = 0;
const WEAPON_SWITCH_TIME = 0.3;
let prevWeaponIdx = 0;

const WEAPON_COLORS: Color3[] = [
  new Color3(0.15, 0.85, 0.55),
  new Color3(0.2, 0.5, 1),
  new Color3(0.95, 0.2, 0.3),
  new Color3(1, 0.6, 0.1),
];

function buildWeaponModel(scene: Scene): void {
  weaponModel = new TransformNode('weaponRoot', scene);
  weaponModel.parent = camera;
  weaponModels = [];

  const gunMat = new StandardMaterial('gunMat', scene);
  gunMat.diffuseColor = new Color3(0.18, 0.19, 0.22);
  gunMat.specularColor = new Color3(0.35, 0.35, 0.4);
  gunMat.specularPower = 64;
  gunMat.freeze();

  const gunDark = new StandardMaterial('gunDark', scene);
  gunDark.diffuseColor = new Color3(0.1, 0.1, 0.12);
  gunDark.specularColor = new Color3(0.2, 0.2, 0.25);
  gunDark.specularPower = 48;
  gunDark.freeze();

  const gunLight = new StandardMaterial('gunLight', scene);
  gunLight.diffuseColor = new Color3(0.3, 0.32, 0.36);
  gunLight.specularColor = new Color3(0.4, 0.4, 0.45);
  gunLight.specularPower = 80;
  gunLight.freeze();

  for (let w = 0; w < 4; w++) {
    const model = new TransformNode(`weaponModel_${w}`, scene);
    model.parent = weaponModel;
    model.setEnabled(w === 0);

    const glowMat = new StandardMaterial(`gunGlow_${w}`, scene);
    glowMat.diffuseColor = WEAPON_COLORS[w];
    glowMat.emissiveColor = WEAPON_COLORS[w].scale(0.5);
    glowMat.specularColor = Color3.Black();
    glowMat.freeze();

    const accentMat = new StandardMaterial(`gunAccent_${w}`, scene);
    accentMat.diffuseColor = WEAPON_COLORS[w].scale(0.5);
    accentMat.specularColor = new Color3(0.3, 0.3, 0.3);
    accentMat.specularPower = 48;
    accentMat.freeze();

    const p = (name: string, opts: any, pos: Vector3, mat: StandardMaterial, rot?: Vector3): Mesh => {
      const mesh = MeshBuilder.CreateBox(`${name}_${w}`, opts, scene);
      mesh.position = pos;
      if (rot) mesh.rotation = rot;
      mesh.parent = model;
      mesh.material = mat;
      mesh.isPickable = false;
      return mesh;
    };
    const cyl = (name: string, opts: any, pos: Vector3, mat: StandardMaterial, rot?: Vector3): Mesh => {
      const mesh = MeshBuilder.CreateCylinder(`${name}_${w}`, opts, scene);
      mesh.position = pos;
      if (rot) mesh.rotation = rot;
      mesh.parent = model;
      mesh.material = mat;
      mesh.isPickable = false;
      return mesh;
    };

    const ox = 0.25;
    switch (w) {
      case 0: {
        // PULSE RIFLE - sleek sci-fi assault rifle
        p('receiver', { width: 0.1, height: 0.1, depth: 0.28 }, new Vector3(ox, -0.2, 0.22), gunMat);
        p('receiverTop', { width: 0.08, height: 0.03, depth: 0.32 }, new Vector3(ox, -0.15, 0.24), gunLight);
        p('barrel', { width: 0.045, height: 0.045, depth: 0.42 }, new Vector3(ox, -0.18, 0.47), gunDark);
        p('barrelShroud', { width: 0.065, height: 0.065, depth: 0.2 }, new Vector3(ox, -0.18, 0.56), gunMat);
        p('muzzleBrake', { width: 0.055, height: 0.055, depth: 0.04 }, new Vector3(ox, -0.18, 0.68), gunLight);
        p('handguard', { width: 0.07, height: 0.06, depth: 0.15 }, new Vector3(ox, -0.22, 0.4), gunMat);
        p('grip', { width: 0.04, height: 0.12, depth: 0.04 }, new Vector3(ox, -0.3, 0.17), gunDark, new Vector3(0.25, 0, 0));
        p('triggerGuard', { width: 0.04, height: 0.01, depth: 0.08 }, new Vector3(ox, -0.26, 0.2), gunDark);
        p('stock', { width: 0.04, height: 0.065, depth: 0.16 }, new Vector3(ox, -0.19, 0.0), gunMat);
        p('stockPad', { width: 0.05, height: 0.07, depth: 0.02 }, new Vector3(ox, -0.19, -0.08), gunLight);
        p('mag', { width: 0.035, height: 0.1, depth: 0.06 }, new Vector3(ox, -0.3, 0.27), gunDark);
        p('magWell', { width: 0.05, height: 0.03, depth: 0.07 }, new Vector3(ox, -0.24, 0.27), gunMat);
        // Glow accents
        p('energyLine', { width: 0.105, height: 0.01, depth: 0.25 }, new Vector3(ox, -0.145, 0.28), glowMat);
        p('barrelGlow', { width: 0.015, height: 0.015, depth: 0.18 }, new Vector3(ox, -0.155, 0.56), glowMat);
        p('sightDot', { width: 0.015, height: 0.015, depth: 0.015 }, new Vector3(ox, -0.13, 0.5), glowMat);
        // Iron sights
        p('rearSight', { width: 0.04, height: 0.025, depth: 0.015 }, new Vector3(ox, -0.13, 0.15), gunDark);
        p('frontSight', { width: 0.015, height: 0.03, depth: 0.01 }, new Vector3(ox, -0.13, 0.58), gunDark);
        break;
      }
      case 1: {
        // PLASMA SHOTGUN - wide, aggressive double barrel
        p('receiver', { width: 0.14, height: 0.11, depth: 0.22 }, new Vector3(ox, -0.2, 0.18), gunMat);
        p('receiverPlate', { width: 0.15, height: 0.03, depth: 0.24 }, new Vector3(ox, -0.14, 0.19), gunLight);
        cyl('barrel1', { height: 0.35, diameter: 0.045, tessellation: 8 }, new Vector3(ox - 0.035, -0.17, 0.42), gunDark, new Vector3(Math.PI / 2, 0, 0));
        cyl('barrel2', { height: 0.35, diameter: 0.045, tessellation: 8 }, new Vector3(ox + 0.035, -0.17, 0.42), gunDark, new Vector3(Math.PI / 2, 0, 0));
        p('barrelHousing', { width: 0.13, height: 0.07, depth: 0.15 }, new Vector3(ox, -0.17, 0.35), gunMat);
        p('muzzle1', { width: 0.055, height: 0.055, depth: 0.02 }, new Vector3(ox - 0.035, -0.17, 0.6), accentMat);
        p('muzzle2', { width: 0.055, height: 0.055, depth: 0.02 }, new Vector3(ox + 0.035, -0.17, 0.6), accentMat);
        p('grip', { width: 0.055, height: 0.14, depth: 0.05 }, new Vector3(ox, -0.32, 0.13), gunDark, new Vector3(0.2, 0, 0));
        p('pumpHandle', { width: 0.08, height: 0.04, depth: 0.1 }, new Vector3(ox, -0.24, 0.38), accentMat);
        p('stock', { width: 0.06, height: 0.08, depth: 0.1 }, new Vector3(ox, -0.2, 0.0), gunMat);
        // Glow accents
        p('plasmaVent1', { width: 0.14, height: 0.015, depth: 0.06 }, new Vector3(ox, -0.135, 0.3), glowMat);
        p('plasmaVent2', { width: 0.08, height: 0.015, depth: 0.04 }, new Vector3(ox, -0.135, 0.45), glowMat);
        p('shellGlow', { width: 0.04, height: 0.04, depth: 0.015 }, new Vector3(ox, -0.2, 0.3), glowMat);
        break;
      }
      case 2: {
        // RAIL SNIPER - long, sleek, precision weapon
        cyl('barrel', { height: 0.7, diameter: 0.035, tessellation: 8 }, new Vector3(ox, -0.17, 0.5), gunDark, new Vector3(Math.PI / 2, 0, 0));
        p('barrelShroud', { width: 0.05, height: 0.05, depth: 0.4 }, new Vector3(ox, -0.17, 0.6), gunMat);
        p('receiver', { width: 0.08, height: 0.085, depth: 0.2 }, new Vector3(ox, -0.19, 0.16), gunMat);
        p('receiverExtend', { width: 0.06, height: 0.06, depth: 0.12 }, new Vector3(ox, -0.18, 0.3), gunLight);
        p('grip', { width: 0.035, height: 0.12, depth: 0.035 }, new Vector3(ox, -0.29, 0.13), gunDark, new Vector3(0.25, 0, 0));
        p('triggerGuard', { width: 0.035, height: 0.01, depth: 0.07 }, new Vector3(ox, -0.25, 0.15), gunDark);
        p('stock', { width: 0.035, height: 0.05, depth: 0.22 }, new Vector3(ox, -0.18, -0.04), gunMat);
        p('stockCheek', { width: 0.04, height: 0.03, depth: 0.08 }, new Vector3(ox, -0.155, -0.05), gunLight);
        p('bipodL', { width: 0.01, height: 0.08, depth: 0.01 }, new Vector3(ox - 0.04, -0.26, 0.4), gunDark, new Vector3(0, 0, 0.3));
        p('bipodR', { width: 0.01, height: 0.08, depth: 0.01 }, new Vector3(ox + 0.04, -0.26, 0.4), gunDark, new Vector3(0, 0, -0.3));
        // Scope
        cyl('scope', { height: 0.12, diameter: 0.04, tessellation: 8 }, new Vector3(ox, -0.1, 0.33), gunDark, new Vector3(Math.PI / 2, 0, 0));
        p('scopeBody', { width: 0.035, height: 0.035, depth: 0.08 }, new Vector3(ox, -0.1, 0.33), gunMat);
        p('scopeLens', { width: 0.035, height: 0.035, depth: 0.01 }, new Vector3(ox, -0.1, 0.38), glowMat);
        p('scopeMount', { width: 0.02, height: 0.02, depth: 0.06 }, new Vector3(ox, -0.12, 0.33), gunDark);
        // Rail accents
        p('rail1', { width: 0.008, height: 0.008, depth: 0.55 }, new Vector3(ox - 0.028, -0.15, 0.5), glowMat);
        p('rail2', { width: 0.008, height: 0.008, depth: 0.55 }, new Vector3(ox + 0.028, -0.15, 0.5), glowMat);
        p('muzzleFlare', { width: 0.045, height: 0.045, depth: 0.015 }, new Vector3(ox, -0.17, 0.86), glowMat);
        break;
      }
      case 3: {
        // HAVOC LAUNCHER - chunky sci-fi rocket launcher
        cyl('tube', { height: 0.48, diameter: 0.09, tessellation: 10 }, new Vector3(ox, -0.16, 0.42), gunDark, new Vector3(Math.PI / 2, 0, 0));
        p('tubeHousing', { width: 0.11, height: 0.11, depth: 0.35 }, new Vector3(ox, -0.16, 0.35), gunMat);
        p('receiver', { width: 0.12, height: 0.13, depth: 0.18 }, new Vector3(ox, -0.2, 0.12), gunMat);
        p('receiverTop', { width: 0.1, height: 0.03, depth: 0.2 }, new Vector3(ox, -0.13, 0.13), gunLight);
        p('grip', { width: 0.05, height: 0.14, depth: 0.05 }, new Vector3(ox, -0.33, 0.1), gunDark, new Vector3(0.2, 0, 0));
        p('foregrip', { width: 0.04, height: 0.06, depth: 0.06 }, new Vector3(ox, -0.25, 0.35), gunDark);
        p('topHandle', { width: 0.04, height: 0.04, depth: 0.1 }, new Vector3(ox, -0.1, 0.28), gunMat);
        p('handlePost1', { width: 0.015, height: 0.03, depth: 0.015 }, new Vector3(ox, -0.12, 0.23), gunDark);
        p('handlePost2', { width: 0.015, height: 0.03, depth: 0.015 }, new Vector3(ox, -0.12, 0.33), gunDark);
        // Muzzle ring
        p('muzzleRing', { width: 0.12, height: 0.12, depth: 0.02 }, new Vector3(ox, -0.16, 0.66), accentMat);
        p('muzzleInner', { width: 0.08, height: 0.08, depth: 0.02 }, new Vector3(ox, -0.16, 0.665), gunDark);
        // Vents and glow
        p('vent1', { width: 0.02, height: 0.12, depth: 0.03 }, new Vector3(ox - 0.06, -0.16, 0.5), accentMat);
        p('vent2', { width: 0.02, height: 0.12, depth: 0.03 }, new Vector3(ox + 0.06, -0.16, 0.5), accentMat);
        p('ventGlow1', { width: 0.015, height: 0.08, depth: 0.025 }, new Vector3(ox - 0.06, -0.16, 0.5), glowMat);
        p('ventGlow2', { width: 0.015, height: 0.08, depth: 0.025 }, new Vector3(ox + 0.06, -0.16, 0.5), glowMat);
        p('rearGlow', { width: 0.06, height: 0.06, depth: 0.015 }, new Vector3(ox, -0.16, 0.17), glowMat);
        p('energyStrip', { width: 0.12, height: 0.012, depth: 0.2 }, new Vector3(ox, -0.1, 0.4), glowMat);
        break;
      }
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
  };

  gameState = {
    phase: 'playing',
    wave: 0,
    enemiesRemaining: 0,
    enemiesInWave: 0,
    waveTimer: 2,
    spawnTimer: 0,
    totalKills: 0,
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

  setupPickups();

  camera.position = player.position.clone();
  camera.rotation.set(0, 0, 0);

  grenades.forEach(g => g.mesh.dispose());
  grenades = [];

  damageIntensity = 0;
  screenShakeIntensity = 0;
  recoilRecovery = { x: 0, y: 0 };
  dashCooldown = 0;
  dashTimer = 0;
  slideCooldown = 0;
  slideTimer = 0;
  grenadeCount = MAX_GRENADES;
  lastStreakAnnounce = 0;

  const canvas = engine.getRenderingCanvas()!;
  canvas.requestPointerLock();

  Audio.playWaveStart();
}

function setupPickups(): void {
  pickups.forEach(p => {
    p.mesh.dispose();
  });
  pickups = [];

  const pickupColors: Record<string, Color3> = {
    health: new Color3(0.15, 0.9, 0.35),
    armor: new Color3(0.2, 0.5, 1),
    ammo: new Color3(1, 0.75, 0.1),
  };

  const pickupMats: Record<string, StandardMaterial> = {};
  for (const [key, color] of Object.entries(pickupColors)) {
    const mat = new StandardMaterial(`pickupMat_${key}`, scene);
    mat.diffuseColor = color;
    mat.emissiveColor = color.scale(0.5);
    mat.specularColor = Color3.Black();
    mat.freeze();
    pickupMats[key] = mat;
  }

  const pickupBaseMat = new StandardMaterial('pickupBase', scene);
  pickupBaseMat.diffuseColor = new Color3(0.15, 0.16, 0.2);
  pickupBaseMat.specularColor = new Color3(0.25, 0.25, 0.3);
  pickupBaseMat.specularPower = 48;
  pickupBaseMat.freeze();

  mapData.pickupLocations.forEach((pos, i) => {
    const types: Array<'health' | 'armor' | 'ammo'> = ['health', 'armor', 'ammo'];
    const type = types[i % 3];
    const values: Record<string, number> = {
      health: 25,
      armor: 25,
      ammo: 0,
    };

    const core = MeshBuilder.CreateBox(`pickup_${i}`, { width: 0.45, height: 0.45, depth: 0.45 }, scene);
    core.position = pos.add(new Vector3(0, 0.7, 0));
    core.material = pickupMats[type];
    core.checkCollisions = false;
    core.isPickable = false;

    const frame = MeshBuilder.CreateBox(`pickupFrame_${i}`, { width: 0.6, height: 0.6, depth: 0.6 }, scene);
    frame.parent = core;
    frame.position = Vector3.Zero();
    frame.material = pickupBaseMat;
    frame.checkCollisions = false;
    frame.isPickable = false;

    const ring = MeshBuilder.CreateTorus(`pickupRing_${i}`, { diameter: 0.8, thickness: 0.04, tessellation: 12 }, scene);
    ring.parent = core;
    ring.position = Vector3.Zero();
    ring.material = pickupMats[type];
    ring.checkCollisions = false;
    ring.isPickable = false;

    pickups.push({
      mesh: core,
      type,
      value: values[type],
      respawnTimer: 0,
      active: true,
      position: pos,
    });
  });
}

// ── Game Loop ──
function updateGame(dt: number): void {
  if (!player.alive) {
    return;
  }

  updatePlayerMovement(dt);
  updatePlayerLook(dt);
  updateAbilities(dt);
  updateWeapons(dt);
  updateEnemies(dt);
  updateProjectiles(dt);
  updateGrenades(dt);
  updatePickups(dt);
  updateWaveSystem(dt);
  updateEffects(dt);
  updateWeaponModel(dt);

  if (frameCount % 3 === 0) {
    updateMinimap();
    updateAbilityHUD();
  }

  updateHUD(player, weapons[currentWeaponIdx], gameState, displayFps, weapons);
}

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

  if (dashTimer > 0) {
    dashTimer -= dt;
    player.velocity.x = dashDirection.x * DASH_SPEED;
    player.velocity.z = dashDirection.z * DASH_SPEED;
  } else if (slideTimer > 0) {
    slideTimer -= dt;
    const slideFalloff = slideTimer / SLIDE_DURATION;
    player.velocity.x = slideDirection.x * SLIDE_SPEED * slideFalloff;
    player.velocity.z = slideDirection.z * SLIDE_SPEED * slideFalloff;
    camera.fov = 1.1 + (1 - slideFalloff) * 0.1;
  } else {
    camera.fov += (1.1 - camera.fov) * 0.1;
    const speed = MOVE_SPEED * (player.sprinting ? SPRINT_MULTIPLIER : 1);
    const targetVelX = moveDir.x * speed;
    const targetVelZ = moveDir.z * speed;

    const accel = player.grounded ? 20 : 5;
    player.velocity.x += (targetVelX - player.velocity.x) * Math.min(1, accel * dt);
    player.velocity.z += (targetVelZ - player.velocity.z) * Math.min(1, accel * dt);
  }

  player.velocity.y += GRAVITY * dt;

  if ((keysJustPressed.has(' ') || keysJustPressed.has('space')) && player.grounded) {
    player.velocity.y = JUMP_FORCE;
    player.grounded = false;
    Audio.playJump();
  }

  player.position.addInPlace(player.velocity.scale(dt));

  if (player.position.y <= PLAYER_HEIGHT) {
    if (!player.grounded && player.velocity.y < -3) {
      Audio.playLand();
    }
    player.position.y = PLAYER_HEIGHT;
    player.velocity.y = 0;
    player.grounded = true;
  }

  const px = player.position.x;
  const pz = player.position.z;
  if (Math.abs(px) < 8 && Math.abs(pz) < 8 && player.position.y < PLAYER_HEIGHT + 2 && player.position.y > PLAYER_HEIGHT) {
    if (player.velocity.y < 0) {
      player.position.y = PLAYER_HEIGHT + 2;
      player.velocity.y = 0;
      player.grounded = true;
    }
  }

  const perchCorners: [number, number][] = [[-60, -60], [60, -60], [-60, 60], [60, 60]];
  for (const [cx, cz] of perchCorners) {
    if (Math.abs(px - cx) < 4 && Math.abs(pz - cz) < 4 && player.position.y < PLAYER_HEIGHT + 8 && player.position.y > PLAYER_HEIGHT + 6) {
      if (player.velocity.y < 0) {
        player.position.y = PLAYER_HEIGHT + 8;
        player.velocity.y = 0;
        player.grounded = true;
      }
    }
  }

  const bound = 78;
  player.position.x = Math.max(-bound, Math.min(bound, player.position.x));
  player.position.z = Math.max(-bound, Math.min(bound, player.position.z));

  camera.position.copyFrom(player.position);

  if (slideTimer > 0) {
    camera.position.y -= 0.6;
  }

  if (isMoving && player.grounded && dashTimer <= 0 && slideTimer <= 0) {
    const bobSpeed = player.sprinting ? HEAD_BOB_SPEED * 1.5 : HEAD_BOB_SPEED;
    headBobPhase += dt * bobSpeed;
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

  if (screenShakeIntensity > 0) {
    camera.position.x += (Math.random() - 0.5) * screenShakeIntensity * 0.15;
    camera.position.y += (Math.random() - 0.5) * screenShakeIntensity * 0.1;
  }
}

function updatePlayerLook(dt: number): void {
  if (!pointerLocked) return;

  camera.rotation.y += mouseMovementX * MOUSE_SENSITIVITY;
  camera.rotation.x += mouseMovementY * MOUSE_SENSITIVITY;
  camera.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, camera.rotation.x));

  if (recoilRecovery.x !== 0) {
    const recoveryRate = 5 * dt;
    const rx = recoilRecovery.x * recoveryRate;
    const ry = recoilRecovery.y * recoveryRate;
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

function updateWeapons(dt: number): void {
  for (let i = 1; i <= 4; i++) {
    if (keysJustPressed.has(i.toString())) {
      switchWeapon(i - 1);
    }
  }
  if (scrollDelta !== 0) {
    const newIdx = (currentWeaponIdx + Math.sign(scrollDelta) + weapons.length) % weapons.length;
    switchWeapon(newIdx);
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
    if (weapon.reloadTimer <= 0) {
      finishReload(weapon);
    }
  }

  weapon.fireTimer = Math.max(0, weapon.fireTimer - dt);

  const canFire = weapon.fireTimer <= 0 && !weapon.reloading && weapon.currentAmmo > 0;
  if (canFire) {
    if (weapon.def.automatic && mouseDown) {
      fireWeapon(weapon);
    } else if (!weapon.def.automatic && mouseJustPressed) {
      fireWeapon(weapon);
    }
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
  weapon.currentAmmo--;
  weapon.fireTimer = 1 / weapon.def.fireRate;

  Audio.playGunshot(weapon.def.slot);

  const muzzlePos = camera.position.add(camera.getDirection(Vector3.Forward()).scale(1.5))
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
      fireHitscan(weapon, muzzlePos);
    }
  } else {
    fireProjectile(weapon, muzzlePos);
  }
}

function fireHitscan(weapon: WeaponState, muzzlePos: Vector3): void {
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
    for (const part of enemy.bodyParts) {
      const boundInfo = part.getBoundingInfo();
      if (!boundInfo) continue;
      const intersect = ray.intersectsBoxMinMax(
        boundInfo.boundingBox.minimumWorld,
        boundInfo.boundingBox.maximumWorld,
      );
      if (intersect) {
        const d = Vector3.Distance(camera.position, part.absolutePosition);
        if (d < hitDist) {
          hitDist = d;
          hitEnemy = enemy;
          hitHeadshot = part.metadata?.isHead === true;
          hitPoint = camera.position.add(dir.scale(d));
        }
      }
    }
  }

  const worldPick = scene.pickWithRay(ray, (mesh) => {
    return mesh.checkCollisions && mesh.isPickable !== false;
  });

  if (worldPick?.hit && worldPick.distance < hitDist) {
    hitEnemy = null;
    hitPoint = worldPick.pickedPoint!;
    createBulletImpact(scene, hitPoint, worldPick.getNormal(true) || Vector3.Up());
  }

  createTracer(scene, muzzlePos, hitPoint);

  if (hitEnemy) {
    const actualDamage = hitHeadshot ? weapon.def.damage * weapon.def.headshotMultiplier : weapon.def.damage;
    const result = damageEnemy(hitEnemy, actualDamage, hitHeadshot);
    createBloodEffect(scene, hitPoint, dir);

    if (hitHeadshot) {
      Audio.playHeadshot();
      showHitMarker();
    } else {
      Audio.playHit();
      showHitMarker();
    }

    if (result.killed) {
      onEnemyKilled(hitEnemy, hitHeadshot);
    }
  }
}

function createRocketTrailTexture(): string {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 16;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 16, 16);
  return c.toDataURL();
}

let rocketTrailTextureUrl: string | null = null;
let rocketTrailTexture: Texture | null = null;

function fireProjectile(weapon: WeaponState, muzzlePos: Vector3): void {
  const spread = weapon.def.spread;
  const dir = camera.getDirection(Vector3.Forward()).add(new Vector3(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread,
  )).normalize();

  const rocket = MeshBuilder.CreateSphere('rocket', { diameter: 0.3, segments: 4 }, scene);
  rocket.position = muzzlePos.clone();
  const mat = new StandardMaterial('rocketMat', scene);
  mat.emissiveColor = new Color3(1, 0.5, 0.1);
  mat.disableLighting = true;
  rocket.material = mat;
  rocket.checkCollisions = false;
  rocket.isPickable = false;

  if (!rocketTrailTextureUrl) rocketTrailTextureUrl = createRocketTrailTexture();
  if (!rocketTrailTexture) rocketTrailTexture = new Texture(rocketTrailTextureUrl, scene);
  const trail = new ParticleSystem('rocketTrail', 20, scene);
  trail.particleTexture = rocketTrailTexture;
  trail.emitter = rocket;
  trail.minLifeTime = 0.08;
  trail.maxLifeTime = 0.2;
  trail.minSize = 0.08;
  trail.maxSize = 0.2;
  trail.emitRate = 40;
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
    damage: weapon.def.damage,
    radius: weapon.def.explosionRadius!,
    timer: 5,
    trail,
  });
}

function updateProjectiles(dt: number): void {
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
        explodeProjectile(expPos, proj.damage, proj.radius);
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
        explodeProjectile(proj.mesh.position, proj.damage, proj.radius);
        if (proj.trail) { proj.trail.stop(); proj.trail.dispose(); }
        proj.mesh.dispose();
        projectiles.splice(i, 1);
        break;
      }
    }
  }
}

function explodeProjectile(pos: Vector3, damage: number, radius: number): void {
  createExplosion(scene, pos, radius);
  Audio.playExplosion();
  screenShakeIntensity = 2;

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const d = Vector3.Distance(pos, enemy.position.add(new Vector3(0, 1, 0)));
    if (d < radius) {
      const falloff = 1 - d / radius;
      const result = damageEnemy(enemy, damage * falloff, false);
      if (result.killed) {
        onEnemyKilled(enemy, false);
      }
    }
  }

  const playerDist = Vector3.Distance(pos, player.position);
  if (playerDist < radius) {
    const falloff = 1 - playerDist / radius;
    damagePlayer(damage * falloff * 0.3);
  }
}

function onEnemyKilled(enemy: Enemy, headshot: boolean): void {
  player.kills++;
  player.streak++;
  const scoreMultiplier = Math.min(4, 1 + Math.floor(player.streak / 3) * 0.5);
  let scoreGain = Math.round(enemy.type.scoreValue * scoreMultiplier);
  if (headshot) scoreGain = Math.round(scoreGain * 1.5);
  player.score += scoreGain;
  gameState.totalKills++;

  Audio.playKill();

  let feedText = `Eliminated ${enemy.type.name} +${scoreGain}`;
  let feedColor = '#44cc88';
  if (headshot) {
    feedText += ' HEADSHOT';
    feedColor = '#ff3333';
  }
  if (player.streak >= 3) {
    feedText += ` (${player.streak}x STREAK)`;
    feedColor = '#ffaa00';
  }
  addKillFeedEntry(feedText, feedColor);
  checkStreakRewards();
}

function damagePlayer(damage: number): void {
  let remaining = damage;

  if (player.armor > 0) {
    const armorAbsorb = Math.min(player.armor, remaining * 0.6);
    player.armor -= armorAbsorb;
    remaining -= armorAbsorb;
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

function updateEnemies(dt: number): void {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];

    updateEnemy(
      enemy,
      player.position,
      player,
      dt,
      scene,
      (origin, dir, damage) => {
        Audio.playEnemyShoot();
        const endPoint = origin.add(dir.scale(100));
        createEnemyTracer(scene, origin, endPoint);

        const toPlayer = player.position.subtract(origin);
        const dist = toPlayer.length();
        const toPlayerDir = toPlayer.scale(1 / Math.max(dist, 0.001));
        const dot = Vector3.Dot(toPlayerDir, dir);
        const hitRadius = PLAYER_RADIUS + (dist * 0.02);

        if (dot > 0.95 && dist < 80) {
          const cross = Vector3.Cross(toPlayer, dir);
          const perpDist = cross.length() / dir.length();
          if (perpDist < hitRadius) {
            damagePlayer(damage);
          }
        }
      },
    );

    if (!enemy.alive && enemy.deathTimer > 1) {
      cleanupEnemy(enemy);
      enemies.splice(i, 1);
    }
  }
}

function updatePickups(dt: number): void {
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
      }

      if (consumed) {
        Audio.playPickup();
        addKillFeedEntry(`Picked up ${pickup.type}`, '#44cc88');
        pickup.active = false;
        pickup.mesh.setEnabled(false);
        pickup.respawnTimer = PICKUP_RESPAWN_TIME;
      }
    }
  }
}

function updateWaveSystem(dt: number): void {
  let aliveCount = 0;
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) aliveCount++;
  }

  if (gameState.enemiesRemaining <= 0 && aliveCount === 0) {
    gameState.waveTimer -= dt;

    if (gameState.waveTimer <= 0) {
      gameState.wave++;
      startWave(gameState.wave);
    }
  }

  if (gameState.enemiesRemaining > 0 && aliveCount < 12) {
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

  showWaveAnnounce(wave);
  Audio.playWaveStart();

  grenadeCount = Math.min(MAX_GRENADES, grenadeCount + 1);
  if (wave > 1) {
    player.health = Math.min(player.maxHealth, player.health + 15);
    player.score += wave * 50;
    addKillFeedEntry(`Wave ${wave} bonus: +${wave * 50} pts, +1 grenade, +15 HP`, '#44cc88');
  }

  addKillFeedEntry(`Wave ${wave} - ${enemyCount} enemies`, '#44cc88');
}

function spawnNextEnemy(): void {
  const availableTypes = ENEMY_TYPES.filter((_, i) => {
    if (i === 0) return true;
    if (i === 1) return gameState.wave >= 2;
    if (i === 2) return gameState.wave >= 4;
    if (i === 3) return gameState.wave >= 3;
    if (i === 4) return gameState.wave >= 5;
    return false;
  });

  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

  const validSpawns = mapData.spawnPoints.filter(sp =>
    Vector3.Distance(sp, player.position) > 30,
  );
  const spawnPos = validSpawns.length > 0
    ? validSpawns[Math.floor(Math.random() * validSpawns.length)]
    : mapData.spawnPoints[Math.floor(Math.random() * mapData.spawnPoints.length)];

  const scaledType = { ...type };
  const waveMult = 1 + (gameState.wave - 1) * 0.1;
  scaledType.health = Math.round(type.health * waveMult);
  scaledType.damage = Math.round(type.damage * (1 + (gameState.wave - 1) * 0.05));
  scaledType.speed = type.speed * (1 + (gameState.wave - 1) * 0.02);

  const enemy = spawnEnemy(scene, scaledType, spawnPos.clone());
  enemies.push(enemy);
  gameState.enemiesRemaining--;
}

function updateAbilities(dt: number): void {
  dashCooldown = Math.max(0, dashCooldown - dt);
  slideCooldown = Math.max(0, slideCooldown - dt);

  if (keysJustPressed.has('q') && dashCooldown <= 0 && dashTimer <= 0) {
    const forward = camera.getDirection(Vector3.Forward());
    forward.y = 0;
    forward.normalize();
    const right = camera.getDirection(Vector3.Right());
    right.y = 0;
    right.normalize();

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

  if (keysJustPressed.has('control') && player.sprinting && slideCooldown <= 0 && slideTimer <= 0 && player.grounded) {
    const forward = camera.getDirection(Vector3.Forward());
    forward.y = 0;
    forward.normalize();
    slideDirection = forward;
    slideTimer = SLIDE_DURATION;
    slideCooldown = SLIDE_COOLDOWN;
    Audio.playLand();
  }

  if (keysJustPressed.has('g') && grenadeCount > 0) {
    throwGrenade();
    grenadeCount--;
  }
}

function throwGrenade(): void {
  const throwDir = camera.getDirection(Vector3.Forward()).add(new Vector3(0, 0.3, 0)).normalize();
  const startPos = camera.position.add(throwDir.scale(1.5));

  const grenade = MeshBuilder.CreateSphere('grenade', { diameter: 0.25, segments: 4 }, scene);
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

function updateGrenades(dt: number): void {
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
      const c = (g.mesh.material as StandardMaterial).emissiveColor;
      if (flash) { c.r = 1; c.g = 0; c.b = 0; }
      else { c.r = 1; c.g = 0.3; c.b = 0; }
    }

    if (g.timer <= 0) {
      createExplosion(scene, g.mesh.position, GRENADE_RADIUS);
      Audio.playExplosion();
      screenShakeIntensity = 1.5;

      for (const enemy of enemies) {
        if (!enemy.alive) continue;
        const d = Vector3.Distance(g.mesh.position, enemy.position.add(new Vector3(0, 1, 0)));
        if (d < GRENADE_RADIUS) {
          const falloff = 1 - d / GRENADE_RADIUS;
          const result = damageEnemy(enemy, GRENADE_DAMAGE * falloff, false);
          if (result.killed) {
            onEnemyKilled(enemy, false);
          }
        }
      }

      const playerDist = Vector3.Distance(g.mesh.position, player.position);
      if (playerDist < GRENADE_RADIUS) {
        damagePlayer(GRENADE_DAMAGE * (1 - playerDist / GRENADE_RADIUS) * 0.25);
      }

      g.mesh.dispose();
      grenades.splice(i, 1);
    }
  }
}

function updateMinimap(): void {
  const canvas = document.getElementById('minimap') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  const mapScale = w / 180;

  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(30, 35, 45, 0.85)';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 8; i++) {
    const pos = (i / 8) * w;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(w, pos);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  const bx = (80 + 80) * mapScale;
  const by = (80 + 80) * mapScale;
  const bw = 160 * mapScale;
  ctx.strokeRect(w / 2 - bx / 2, h / 2 - by / 2, bw, bw);

  const toScreen = (worldX: number, worldZ: number): [number, number] => {
    return [w / 2 + worldX * mapScale, h / 2 + worldZ * mapScale];
  };

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  const [cx, cz] = toScreen(-8, -8);
  ctx.fillRect(cx, cz, 16 * mapScale, 16 * mapScale);

  ctx.fillStyle = 'rgba(150, 160, 170, 0.25)';
  const covers: [number, number, number, number][] = [
    [-30, -30, 6, 4], [30, -30, 6, 4], [-30, 30, 6, 4], [30, 30, 6, 4],
    [-50, 0, 8, 3], [50, 0, 8, 3], [0, -50, 3, 8], [0, 50, 3, 8],
  ];
  covers.forEach(([ox, oz, ow, od]) => {
    const [sx, sz] = toScreen(ox - ow / 2, oz - od / 2);
    ctx.fillRect(sx, sz, ow * mapScale, od * mapScale);
  });

  for (const enemy of enemies) {
    if (!enemy.alive) continue;
    const [ex, ez] = toScreen(enemy.position.x, enemy.position.z);
    const c = enemy.type.color;
    ctx.fillStyle = `rgba(${Math.floor(c[0] * 255)}, ${Math.floor(c[1] * 255)}, ${Math.floor(c[2] * 255)}, 0.9)`;
    ctx.beginPath();
    ctx.arc(ex, ez, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const pickup of pickups) {
    if (!pickup.active) continue;
    const [ppx, ppz] = toScreen(pickup.position.x, pickup.position.z);
    const colors: Record<string, string> = {
      health: 'rgba(50, 200, 80, 0.6)',
      armor: 'rgba(60, 130, 220, 0.6)',
      ammo: 'rgba(220, 180, 30, 0.6)',
    };
    ctx.fillStyle = colors[pickup.type];
    ctx.fillRect(ppx - 1.5, ppz - 1.5, 3, 3);
  }

  const [plx, plz] = toScreen(player.position.x, player.position.z);
  const angle = camera.rotation.y;

  ctx.save();
  ctx.translate(plx, plz);
  ctx.rotate(angle);
  ctx.fillStyle = '#44cc88';
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.lineTo(-3.5, 4);
  ctx.lineTo(3.5, 4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(68, 204, 136, 0.06)';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-25, -50);
  ctx.lineTo(25, -50);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function updateAbilityHUD(): void {
  const dashEl = document.getElementById('ability-dash')!;
  const dashCdEl = document.getElementById('dash-cd')!;
  const slideEl = document.getElementById('ability-slide')!;
  const slideCdEl = document.getElementById('slide-cd')!;
  const grenadeEl = document.getElementById('ability-grenade')!;
  const grenadeCdEl = document.getElementById('grenade-cd')!;
  const enemiesEl = document.getElementById('enemies-remaining')!;

  if (dashCooldown <= 0 && dashTimer <= 0) {
    dashEl.classList.add('ready');
    dashEl.classList.remove('active');
    dashCdEl.textContent = 'READY';
    dashCdEl.classList.remove('on-cd');
  } else if (dashTimer > 0) {
    dashEl.classList.remove('ready');
    dashEl.classList.add('active');
    dashCdEl.textContent = 'ACTIVE';
    dashCdEl.classList.remove('on-cd');
  } else {
    dashEl.classList.remove('ready', 'active');
    dashCdEl.textContent = dashCooldown.toFixed(1) + 's';
    dashCdEl.classList.add('on-cd');
  }

  if (slideCooldown <= 0 && slideTimer <= 0) {
    slideEl.classList.add('ready');
    slideEl.classList.remove('active');
    slideCdEl.textContent = 'READY';
    slideCdEl.classList.remove('on-cd');
  } else if (slideTimer > 0) {
    slideEl.classList.remove('ready');
    slideEl.classList.add('active');
    slideCdEl.textContent = 'ACTIVE';
    slideCdEl.classList.remove('on-cd');
  } else {
    slideEl.classList.remove('ready', 'active');
    slideCdEl.textContent = slideCooldown.toFixed(1) + 's';
    slideCdEl.classList.add('on-cd');
  }

  if (grenadeCount > 0) {
    grenadeEl.classList.add('ready');
    grenadeCdEl.textContent = `×${grenadeCount}`;
    grenadeCdEl.classList.remove('on-cd');
  } else {
    grenadeEl.classList.remove('ready');
    grenadeCdEl.textContent = '×0';
    grenadeCdEl.classList.add('on-cd');
  }

  const aliveEnemies = enemies.filter(e => e.alive).length;
  if (aliveEnemies > 0 || gameState.enemiesRemaining > 0) {
    enemiesEl.textContent = `HOSTILES: ${aliveEnemies + Math.max(0, gameState.enemiesRemaining - aliveEnemies)}`;
  } else {
    enemiesEl.textContent = '';
  }
}

function checkStreakRewards(): void {
  const streakBanners: Record<number, string> = {
    3: 'TRIPLE KILL',
    5: 'RAMPAGE',
    7: 'UNSTOPPABLE',
    10: 'GODLIKE',
    15: 'LEGENDARY',
    20: 'BEYOND GODLIKE',
  };

  const banner = streakBanners[player.streak];
  if (banner && player.streak > lastStreakAnnounce) {
    lastStreakAnnounce = player.streak;
    const el = document.getElementById('streak-banner')!;
    el.textContent = banner;
    el.classList.remove('active');
    void el.offsetWidth;
    el.classList.add('active');

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

function updateEffects(dt: number): void {
  damageIntensity = Math.max(0, damageIntensity - DAMAGE_RECOVERY_RATE * dt);
  if (damagePostProcess?.setDamageIntensity) {
    damagePostProcess.setDamageIntensity(damageIntensity);
  }

  screenShakeIntensity = Math.max(0, screenShakeIntensity - dt * 8);

  if (player.health < 20 && player.health > 0) {
    player.health = Math.min(20, player.health + dt * 2);
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

  let bobX = 0;
  let bobY = 0;

  const horizontalSpeed = new Vector3(player.velocity.x, 0, player.velocity.z).length();
  if (player.grounded && horizontalSpeed > 1) {
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
    const progress = weaponSwitchTimer / WEAPON_SWITCH_TIME;
    switchOffset = Math.sin(progress * Math.PI) * 0.4;
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

// ── Boot ──
init().catch(console.error);
