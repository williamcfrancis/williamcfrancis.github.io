import {
  Engine,
  Scene,
  FreeCamera,
  Vector3,
  Ray,
  Mesh,
  MeshBuilder,
  Color3,
  StandardMaterial,
  PBRMaterial,
  TransformNode,
} from '@babylonjs/core';

import type { PlayerState, GameState, WeaponState, Enemy, Pickup, KillFeedEntry } from './types';
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
} from './particles';
import { setupPostProcessing, createDamagePostProcess } from './postprocess';
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
let projectiles: { mesh: Mesh; velocity: Vector3; damage: number; radius: number; timer: number }[] = [];
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
let keysHeld = new Set<string>();
let keysJustPressed = new Set<string>();
let scrollDelta = 0;
let weaponModel: TransformNode | null = null;

// ── Initialization ──
async function init(): Promise<void> {
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  engine = new Engine(canvas, true, { stencil: true, antialias: true });
  engine.setHardwareScalingLevel(1);

  scene = new Scene(engine);
  scene.collisionsEnabled = true;

  // Camera
  camera = new FreeCamera('fpsCam', new Vector3(0, PLAYER_HEIGHT, -30), scene);
  camera.minZ = 0.1;
  camera.maxZ = 500;
  camera.fov = 1.1;
  camera.inertia = 0;
  camera.angularSensibility = 99999999;
  camera.speed = 0;
  camera.checkCollisions = false;
  scene.activeCamera = camera;

  // Build map
  mapData = buildMap(scene);

  // Post-processing
  const pipeline = setupPostProcessing(scene, camera);
  damagePostProcess = createDamagePostProcess(scene, camera);

  // Build weapon view model
  buildWeaponModel(scene);

  // Input handlers
  setupInput(canvas);

  // Initialize HUD
  initHUD();

  // Start menu
  showMenu();
  hideHUD();

  // Menu buttons
  document.getElementById('play-btn')!.addEventListener('click', startGame);
  document.getElementById('restart-btn')!.addEventListener('click', () => {
    hideGameOver();
    startGame();
  });

  // Game loop
  engine.runRenderLoop(() => {
    const now = performance.now();
    const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;

    // FPS counter
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

    scene.render();

    keysJustPressed.clear();
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
    if (e.button === 0) mouseDown = true;
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

function buildWeaponModel(scene: Scene): void {
  weaponModel = new TransformNode('weaponModel', scene);
  weaponModel.parent = camera;

  const gunMat = new PBRMaterial('gunMat', scene);
  gunMat.albedoColor = new Color3(0.15, 0.15, 0.18);
  gunMat.roughness = 0.3;
  gunMat.metallic = 0.8;

  const glowMat = new PBRMaterial('gunGlow', scene);
  glowMat.albedoColor = new Color3(0, 0.1, 0.08);
  glowMat.emissiveColor = new Color3(0, 1, 0.8);
  glowMat.emissiveIntensity = 2;
  glowMat.roughness = 0.2;
  glowMat.metallic = 0.9;

  // Main barrel
  const barrel = MeshBuilder.CreateBox('barrel', { width: 0.06, height: 0.06, depth: 0.5 }, scene);
  barrel.position = new Vector3(0.25, -0.18, 0.45);
  barrel.parent = weaponModel;
  barrel.material = gunMat;
  barrel.isPickable = false;

  // Body
  const body = MeshBuilder.CreateBox('gunBody', { width: 0.1, height: 0.12, depth: 0.3 }, scene);
  body.position = new Vector3(0.25, -0.2, 0.25);
  body.parent = weaponModel;
  body.material = gunMat;
  body.isPickable = false;

  // Grip
  const grip = MeshBuilder.CreateBox('grip', { width: 0.06, height: 0.14, depth: 0.06 }, scene);
  grip.position = new Vector3(0.25, -0.3, 0.18);
  grip.rotation.x = 0.3;
  grip.parent = weaponModel;
  grip.material = gunMat;
  grip.isPickable = false;

  // Magazine
  const mag = MeshBuilder.CreateBox('mag', { width: 0.04, height: 0.1, depth: 0.08 }, scene);
  mag.position = new Vector3(0.25, -0.32, 0.28);
  mag.parent = weaponModel;
  mag.material = gunMat;
  mag.isPickable = false;

  // Glowing accents
  const accent1 = MeshBuilder.CreateBox('accent1', { width: 0.12, height: 0.02, depth: 0.32 }, scene);
  accent1.position = new Vector3(0.25, -0.14, 0.3);
  accent1.parent = weaponModel;
  accent1.material = glowMat;
  accent1.isPickable = false;

  const accent2 = MeshBuilder.CreateBox('accent2', { width: 0.02, height: 0.08, depth: 0.06 }, scene);
  accent2.position = new Vector3(0.25, -0.18, 0.68);
  accent2.parent = weaponModel;
  accent2.material = glowMat;
  accent2.isPickable = false;

  // Sight
  const sight = MeshBuilder.CreateBox('sight', { width: 0.04, height: 0.04, depth: 0.04 }, scene);
  sight.position = new Vector3(0.25, -0.12, 0.4);
  sight.parent = weaponModel;
  sight.material = gunMat;
  sight.isPickable = false;
}

// ── Game Start ──
function startGame(): void {
  hideMenu();
  hideGameOver();
  showHUD();

  // Reset player
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

  // Reset game state
  gameState = {
    phase: 'playing',
    wave: 0,
    enemiesRemaining: 0,
    enemiesInWave: 0,
    waveTimer: 2,
    spawnTimer: 0,
    totalKills: 0,
  };

  // Reset weapons
  weapons = createAllWeapons();
  currentWeaponIdx = 0;
  weapons[0].equipped = true;

  // Clear enemies
  enemies.forEach(e => cleanupEnemy(e));
  enemies = [];

  // Clear projectiles
  projectiles.forEach(p => p.mesh.dispose());
  projectiles = [];

  // Setup pickups
  setupPickups();

  // Reset camera
  camera.position = player.position.clone();
  camera.rotation.set(0, 0, 0);

  damageIntensity = 0;
  screenShakeIntensity = 0;
  recoilRecovery = { x: 0, y: 0 };

  // Request pointer lock
  const canvas = engine.getRenderingCanvas()!;
  canvas.requestPointerLock();

  Audio.playWaveStart();
}

function setupPickups(): void {
  pickups.forEach(p => {
    p.mesh.dispose();
  });
  pickups = [];

  mapData.pickupLocations.forEach((pos, i) => {
    const types: Array<'health' | 'armor' | 'ammo'> = ['health', 'armor', 'ammo'];
    const type = types[i % 3];
    const colors: Record<string, Color3> = {
      health: new Color3(0.1, 1, 0.3),
      armor: new Color3(0.2, 0.5, 1),
      ammo: new Color3(1, 0.8, 0),
    };
    const values: Record<string, number> = {
      health: 25,
      armor: 25,
      ammo: 0,
    };

    const mesh = MeshBuilder.CreateBox(`pickup_${i}`, { width: 0.6, height: 0.6, depth: 0.6 }, scene);
    mesh.position = pos.add(new Vector3(0, 0.5, 0));
    const mat = new PBRMaterial(`pickupMat_${i}`, scene);
    mat.albedoColor = colors[type].scale(0.3);
    mat.emissiveColor = colors[type];
    mat.emissiveIntensity = 2;
    mat.roughness = 0.2;
    mat.metallic = 0.8;
    mesh.material = mat;
    mesh.checkCollisions = false;
    mesh.isPickable = false;

    createPickupGlow(scene, pos.add(new Vector3(0, 0.5, 0)), colors[type]);

    pickups.push({
      mesh,
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
  updateWeapons(dt);
  updateEnemies(dt);
  updateProjectiles(dt);
  updatePickups(dt);
  updateWaveSystem(dt);
  updateEffects(dt);
  updateWeaponModel(dt);

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
  const speed = MOVE_SPEED * (player.sprinting ? SPRINT_MULTIPLIER : 1);
  const targetVelX = moveDir.x * speed;
  const targetVelZ = moveDir.z * speed;

  const accel = player.grounded ? 20 : 5;
  player.velocity.x += (targetVelX - player.velocity.x) * Math.min(1, accel * dt);
  player.velocity.z += (targetVelZ - player.velocity.z) * Math.min(1, accel * dt);

  // Gravity
  player.velocity.y += GRAVITY * dt;

  // Jump
  if ((keysJustPressed.has(' ') || keysJustPressed.has('space')) && player.grounded) {
    player.velocity.y = JUMP_FORCE;
    player.grounded = false;
    Audio.playJump();
  }

  // Apply velocity
  player.position.addInPlace(player.velocity.scale(dt));

  // Ground check
  if (player.position.y <= PLAYER_HEIGHT) {
    if (!player.grounded && player.velocity.y < -3) {
      Audio.playLand();
    }
    player.position.y = PLAYER_HEIGHT;
    player.velocity.y = 0;
    player.grounded = true;
  }

  // Simple collision with platform (center platform at y=2, 16x16)
  const px = player.position.x;
  const pz = player.position.z;
  if (Math.abs(px) < 8 && Math.abs(pz) < 8 && player.position.y < PLAYER_HEIGHT + 2 && player.position.y > PLAYER_HEIGHT) {
    if (player.velocity.y < 0) {
      player.position.y = PLAYER_HEIGHT + 2;
      player.velocity.y = 0;
      player.grounded = true;
    }
  }

  // Boundary clamp
  const bound = 78;
  player.position.x = Math.max(-bound, Math.min(bound, player.position.x));
  player.position.z = Math.max(-bound, Math.min(bound, player.position.z));

  camera.position.copyFrom(player.position);

  // Head bob
  if (isMoving && player.grounded) {
    const bobSpeed = player.sprinting ? HEAD_BOB_SPEED * 1.5 : HEAD_BOB_SPEED;
    headBobPhase += dt * bobSpeed;
    camera.position.y += Math.sin(headBobPhase) * HEAD_BOB_AMOUNT;
    camera.position.x += Math.cos(headBobPhase * 0.5) * HEAD_BOB_AMOUNT * 0.3;

    // Footstep sounds
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
}

function updatePlayerLook(dt: number): void {
  if (!pointerLocked) return;

  camera.rotation.y += mouseMovementX * MOUSE_SENSITIVITY;
  camera.rotation.x += mouseMovementY * MOUSE_SENSITIVITY;
  camera.rotation.x = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, camera.rotation.x));

  // Recoil recovery
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

  // Weapon sway from mouse movement
  weaponSwayX += (mouseMovementX * WEAPON_SWAY_AMOUNT - weaponSwayX) * 0.15;
  weaponSwayY += (mouseMovementY * WEAPON_SWAY_AMOUNT - weaponSwayY) * 0.15;
}

function updateWeapons(dt: number): void {
  // Weapon switching
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

  // Reload
  if (keysJustPressed.has('r') && !weapon.reloading && weapon.currentAmmo < weapon.def.magazineSize && weapon.reserveAmmo > 0) {
    startReload(weapon);
  }

  // Auto-reload on empty
  if (weapon.currentAmmo === 0 && !weapon.reloading && weapon.reserveAmmo > 0) {
    startReload(weapon);
  }

  // Update reload timer
  if (weapon.reloading) {
    weapon.reloadTimer -= dt;
    if (weapon.reloadTimer <= 0) {
      finishReload(weapon);
    }
  }

  // Fire timer
  weapon.fireTimer = Math.max(0, weapon.fireTimer - dt);

  // Firing
  if (mouseDown && weapon.fireTimer <= 0 && !weapon.reloading && weapon.currentAmmo > 0) {
    if (weapon.def.automatic || keysJustPressed.has('mousedown')) {
      fireWeapon(weapon);
    }
  }

  // For non-automatic, need to track mouse just pressed
  if (!weapon.def.automatic && mouseDown && weapon.fireTimer <= 0 && !weapon.reloading && weapon.currentAmmo > 0) {
    // handled via the fireTimer gate
  }
}

function switchWeapon(idx: number): void {
  if (idx === currentWeaponIdx || idx < 0 || idx >= weapons.length) return;
  weapons[currentWeaponIdx].equipped = false;
  currentWeaponIdx = idx;
  weapons[currentWeaponIdx].equipped = true;
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

  // Recoil
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

  // Check enemies first
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

  // Check world geometry
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

function fireProjectile(weapon: WeaponState, muzzlePos: Vector3): void {
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

  projectiles.push({
    mesh: rocket,
    velocity: dir.scale(weapon.def.projectileSpeed!),
    damage: weapon.def.damage,
    radius: weapon.def.explosionRadius!,
    timer: 5,
  });
}

function updateProjectiles(dt: number): void {
  for (let i = projectiles.length - 1; i >= 0; i--) {
    const proj = projectiles[i];
    proj.timer -= dt;

    const prevPos = proj.mesh.position.clone();
    proj.mesh.position.addInPlace(proj.velocity.scale(dt));
    proj.velocity.y += GRAVITY * 0.3 * dt;

    // Check collision with world
    const dir = proj.mesh.position.subtract(prevPos);
    const dist = dir.length();
    if (dist > 0) {
      const ray = new Ray(prevPos, dir.normalize(), dist);
      const hit = scene.pickWithRay(ray, (mesh) => mesh.checkCollisions);
      if (hit?.hit || proj.timer <= 0) {
        const expPos = hit?.pickedPoint || proj.mesh.position;
        explodeProjectile(expPos, proj.damage, proj.radius);
        proj.mesh.dispose();
        projectiles.splice(i, 1);
        continue;
      }
    }

    // Check collision with enemies
    for (const enemy of enemies) {
      if (!enemy.alive) continue;
      const d = Vector3.Distance(proj.mesh.position, enemy.position.add(new Vector3(0, 1, 0)));
      if (d < 1.5) {
        explodeProjectile(proj.mesh.position, proj.damage, proj.radius);
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

  // Damage enemies in radius
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

  // Damage player if close
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
  gameState.enemiesRemaining--;

  Audio.playKill();

  let feedText = `Eliminated ${enemy.type.name} +${scoreGain}`;
  let feedColor = '#00ffc8';
  if (headshot) {
    feedText += ' HEADSHOT';
    feedColor = '#ff3333';
  }
  if (player.streak >= 3) {
    feedText += ` (${player.streak}x STREAK)`;
    feedColor = '#ffaa00';
  }
  addKillFeedEntry(feedText, feedColor);
}

function damagePlayer(damage: number): void {
  let remaining = damage;

  // Armor absorbs 60% of damage
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

        // Check if enemy shot hits player
        const toPlayer = player.position.subtract(origin);
        const dot = Vector3.Dot(toPlayer.normalize(), dir);
        const dist = Vector3.Distance(origin, player.position);
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

    // Cleanup dead enemies after animation
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

    // Rotate pickup
    pickup.mesh.rotation.y += dt * 2;
    pickup.mesh.position.y = pickup.position.y + 0.5 + Math.sin(performance.now() * 0.003) * 0.15;

    // Check pickup collision with player
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
        addKillFeedEntry(`Picked up ${pickup.type}`, '#00ff88');
        pickup.active = false;
        pickup.mesh.setEnabled(false);
        pickup.respawnTimer = PICKUP_RESPAWN_TIME;
      }
    }
  }
}

function updateWaveSystem(dt: number): void {
  if (gameState.enemiesRemaining <= 0 && enemies.filter(e => e.alive).length === 0) {
    gameState.waveTimer -= dt;

    if (gameState.waveTimer <= 0) {
      gameState.wave++;
      startWave(gameState.wave);
    }
  }

  // Spawn queued enemies
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

  showWaveAnnounce(wave);
  Audio.playWaveStart();

  addKillFeedEntry(`Wave ${wave} - ${enemyCount} enemies`, '#00ffc8');
}

function spawnNextEnemy(): void {
  // Select enemy type based on wave
  const availableTypes = ENEMY_TYPES.filter((_, i) => {
    if (i === 0) return true;
    if (i === 1) return gameState.wave >= 2;
    if (i === 2) return gameState.wave >= 4;
    if (i === 3) return gameState.wave >= 3;
    if (i === 4) return gameState.wave >= 5;
    return false;
  });

  const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

  // Pick a spawn point far from player
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
  if (mapData.shadowGenerator) {
    enemy.bodyParts.forEach(part => {
      mapData.shadowGenerator!.addShadowCaster(part);
    });
  }
  enemies.push(enemy);
}

function updateEffects(dt: number): void {
  // Damage intensity fade
  damageIntensity = Math.max(0, damageIntensity - DAMAGE_RECOVERY_RATE * dt);
  if (damagePostProcess?.setDamageIntensity) {
    damagePostProcess.setDamageIntensity(damageIntensity);
  }

  // Screen shake decay
  screenShakeIntensity = Math.max(0, screenShakeIntensity - dt * 8);

  // Health regen at low health (very slow)
  if (player.health < 20 && player.health > 0) {
    player.health = Math.min(20, player.health + dt * 2);
  }
}

function updateWeaponModel(dt: number): void {
  if (!weaponModel) return;

  const weapon = weapons[currentWeaponIdx];

  // Base position with sway
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

  // Reload animation
  let reloadOffset = 0;
  if (weapon.reloading) {
    const progress = 1 - weapon.reloadTimer / weapon.def.reloadTime;
    reloadOffset = Math.sin(progress * Math.PI) * 0.15;
  }

  // Firing kick
  const fireKick = weapon.fireTimer > 0 ? weapon.fireTimer * weapon.def.recoilUp * 8 : 0;

  weaponModel.position.x = -swayX + bobX;
  weaponModel.position.y = -swayY + bobY - reloadOffset;
  weaponModel.position.z = -fireKick;

  // Weapon rotation sway
  weaponModel.rotation.x = swayY * 0.5;
  weaponModel.rotation.y = -swayX * 0.5;
  weaponModel.rotation.z = -swayX * 0.3 + bobX * 2;
}

// ── Boot ──
init().catch(console.error);
