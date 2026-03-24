import {
  Scene,
  Vector3,
  MeshBuilder,
  Mesh,
  TransformNode,
  StandardMaterial,
  Color3,
  Ray,
} from '@babylonjs/core';
import type { Enemy, EnemyType, PlayerState } from './types';

export const ENEMY_TYPES: EnemyType[] = [
  {
    name: 'Drone',
    health: 40,
    speed: 6,
    damage: 8,
    fireRate: 1.5,
    accuracy: 0.08,
    scoreValue: 50,
    color: [0, 0.8, 0.6],
    scale: 0.8,
    behavior: 'rush',
  },
  {
    name: 'Sentinel',
    health: 80,
    speed: 4,
    damage: 12,
    fireRate: 2,
    accuracy: 0.05,
    scoreValue: 100,
    color: [0.2, 0.4, 1],
    scale: 1,
    behavior: 'strafe',
  },
  {
    name: 'Juggernaut',
    health: 200,
    speed: 2.5,
    damage: 25,
    fireRate: 0.8,
    accuracy: 0.1,
    scoreValue: 200,
    color: [1, 0.2, 0.2],
    scale: 1.4,
    behavior: 'rush',
  },
  {
    name: 'Phantom',
    health: 60,
    speed: 7,
    damage: 15,
    fireRate: 1,
    accuracy: 0.03,
    scoreValue: 150,
    color: [0.6, 0, 1],
    scale: 0.9,
    behavior: 'flank',
  },
  {
    name: 'Overwatch',
    health: 50,
    speed: 2,
    damage: 30,
    fireRate: 0.6,
    accuracy: 0.01,
    scoreValue: 175,
    color: [1, 0.8, 0],
    scale: 0.85,
    behavior: 'snipe',
  },
];

const _matCache = new Map<string, StandardMaterial>();

function getEnemyMat(scene: Scene, color: [number, number, number], variant: 'body' | 'head' | 'armor' | 'glow' | 'dark'): StandardMaterial {
  const key = `${color.join(',')}_${variant}`;
  let mat = _matCache.get(key);
  if (mat) return mat;

  mat = new StandardMaterial('eMat_' + key, scene);
  const c = new Color3(color[0], color[1], color[2]);

  switch (variant) {
    case 'body':
      mat.diffuseColor = new Color3(0.2, 0.22, 0.25);
      mat.specularColor = new Color3(0.25, 0.25, 0.3);
      mat.specularPower = 32;
      break;
    case 'head':
      mat.diffuseColor = c.scale(0.7);
      mat.emissiveColor = c.scale(0.15);
      mat.specularColor = new Color3(0.3, 0.3, 0.35);
      mat.specularPower = 48;
      break;
    case 'armor':
      mat.diffuseColor = c.scale(0.4);
      mat.specularColor = new Color3(0.35, 0.35, 0.4);
      mat.specularPower = 64;
      break;
    case 'glow':
      mat.diffuseColor = c;
      mat.emissiveColor = c.scale(0.6);
      mat.specularColor = Color3.Black();
      break;
    case 'dark':
      mat.diffuseColor = new Color3(0.12, 0.13, 0.16);
      mat.specularColor = new Color3(0.15, 0.15, 0.18);
      mat.specularPower = 24;
      break;
  }

  mat.freeze();
  _matCache.set(key, mat);
  return mat;
}

export function spawnEnemy(scene: Scene, type: EnemyType, position: Vector3): Enemy {
  const root = new TransformNode('enemy_' + Math.random(), scene);
  root.position = position.clone();

  const bodyParts: Mesh[] = [];
  const s = type.scale;

  const bodyMat = getEnemyMat(scene, type.color, 'body');
  const headMat = getEnemyMat(scene, type.color, 'head');
  const armorMat = getEnemyMat(scene, type.color, 'armor');
  const glowMat = getEnemyMat(scene, type.color, 'glow');
  const darkMat = getEnemyMat(scene, type.color, 'dark');

  const addPart = (name: string, mesh: Mesh, mat: StandardMaterial, isHead = false): Mesh => {
    mesh.parent = root;
    mesh.material = mat;
    mesh.isPickable = false;
    if (isHead) mesh.metadata = { isHead: true };
    bodyParts.push(mesh);
    return mesh;
  };

  // --- PELVIS / HIP ---
  const pelvis = MeshBuilder.CreateBox('pelvis', { width: 0.6 * s, height: 0.3 * s, depth: 0.35 * s }, scene);
  pelvis.position.y = 0.6 * s;
  addPart('pelvis', pelvis, darkMat);

  // --- TORSO (multi-segment) ---
  const torsoLower = MeshBuilder.CreateBox('torsoLower', { width: 0.75 * s, height: 0.5 * s, depth: 0.4 * s }, scene);
  torsoLower.position.y = 1.0 * s;
  addPart('torsoLower', torsoLower, bodyMat);

  const torsoUpper = MeshBuilder.CreateBox('torsoUpper', { width: 0.8 * s, height: 0.5 * s, depth: 0.42 * s }, scene);
  torsoUpper.position.y = 1.45 * s;
  addPart('torsoUpper', torsoUpper, bodyMat);

  // Chest armor plate
  const chestPlate = MeshBuilder.CreateBox('chestPlate', { width: 0.6 * s, height: 0.35 * s, depth: 0.08 * s }, scene);
  chestPlate.position = new Vector3(0, 1.45 * s, 0.22 * s);
  addPart('chestPlate', chestPlate, armorMat);

  // Glowing core on chest
  const core = MeshBuilder.CreateSphere('core', { diameter: 0.15 * s, segments: 6 }, scene);
  core.position = new Vector3(0, 1.35 * s, 0.28 * s);
  addPart('core', core, glowMat);

  // Back panel
  const backPanel = MeshBuilder.CreateBox('backPanel', { width: 0.5 * s, height: 0.3 * s, depth: 0.06 * s }, scene);
  backPanel.position = new Vector3(0, 1.5 * s, -0.22 * s);
  addPart('backPanel', backPanel, armorMat);

  // --- NECK ---
  const neck = MeshBuilder.CreateCylinder('neck', { height: 0.15 * s, diameter: 0.2 * s, tessellation: 6 }, scene);
  neck.position.y = 1.78 * s;
  addPart('neck', neck, darkMat);

  // --- HEAD ---
  const head = MeshBuilder.CreateBox('head', { width: 0.38 * s, height: 0.35 * s, depth: 0.35 * s }, scene);
  head.position.y = 2.03 * s;
  addPart('head', head, headMat, true);

  // Visor (glowing eye slit)
  const visor = MeshBuilder.CreateBox('visor', { width: 0.32 * s, height: 0.08 * s, depth: 0.06 * s }, scene);
  visor.position = new Vector3(0, 2.05 * s, 0.18 * s);
  addPart('visor', visor, glowMat);

  // Antenna / crest based on enemy type
  if (type.behavior === 'snipe') {
    const scope = MeshBuilder.CreateCylinder('scope', { height: 0.25 * s, diameter: 0.06 * s, tessellation: 6 }, scene);
    scope.position = new Vector3(0.15 * s, 2.15 * s, 0.1 * s);
    scope.rotation.x = Math.PI / 6;
    addPart('scope', scope, armorMat);

    const lens = MeshBuilder.CreateSphere('lens', { diameter: 0.08 * s, segments: 4 }, scene);
    lens.position = new Vector3(0.15 * s, 2.22 * s, 0.18 * s);
    addPart('lens', lens, glowMat);
  } else if (type.behavior === 'rush' && type.scale > 1) {
    // Juggernaut horns
    for (const side of [-1, 1]) {
      const horn = MeshBuilder.CreateCylinder('horn', { height: 0.25 * s, diameterTop: 0.03 * s, diameterBottom: 0.08 * s, tessellation: 5 }, scene);
      horn.position = new Vector3(side * 0.18 * s, 2.25 * s, 0);
      horn.rotation.z = side * -0.4;
      addPart('horn', horn, armorMat);
    }
  } else {
    const antenna = MeshBuilder.CreateCylinder('antenna', { height: 0.2 * s, diameter: 0.03 * s, tessellation: 4 }, scene);
    antenna.position = new Vector3(0.12 * s, 2.28 * s, 0);
    addPart('antenna', antenna, darkMat);

    const antennaTip = MeshBuilder.CreateSphere('antennaTip', { diameter: 0.06 * s, segments: 4 }, scene);
    antennaTip.position = new Vector3(0.12 * s, 2.4 * s, 0);
    addPart('antennaTip', antennaTip, glowMat);
  }

  // --- SHOULDERS ---
  for (const side of [-1, 1]) {
    const shoulderJoint = MeshBuilder.CreateSphere('shoulderJoint', { diameter: 0.22 * s, segments: 6 }, scene);
    shoulderJoint.position = new Vector3(side * 0.52 * s, 1.65 * s, 0);
    addPart('shoulderJoint', shoulderJoint, darkMat);

    const shoulderPad = MeshBuilder.CreateBox('shoulderPad', { width: 0.3 * s, height: 0.12 * s, depth: 0.35 * s }, scene);
    shoulderPad.position = new Vector3(side * 0.55 * s, 1.72 * s, 0);
    addPart('shoulderPad', shoulderPad, armorMat);

    // Upper arm
    const upperArm = MeshBuilder.CreateBox('upperArm', { width: 0.16 * s, height: 0.45 * s, depth: 0.18 * s }, scene);
    upperArm.position = new Vector3(side * 0.55 * s, 1.35 * s, 0);
    addPart('upperArm', upperArm, bodyMat);

    // Elbow joint
    const elbow = MeshBuilder.CreateSphere('elbow', { diameter: 0.14 * s, segments: 4 }, scene);
    elbow.position = new Vector3(side * 0.55 * s, 1.1 * s, 0);
    addPart('elbow', elbow, darkMat);

    // Forearm
    const forearm = MeshBuilder.CreateBox('forearm', { width: 0.14 * s, height: 0.35 * s, depth: 0.16 * s }, scene);
    forearm.position = new Vector3(side * 0.55 * s, 0.88 * s, 0.08 * s);
    addPart('forearm', forearm, bodyMat);

    // Hand/weapon mount
    if (side === 1) {
      const gunMount = MeshBuilder.CreateBox('gunMount', { width: 0.1 * s, height: 0.08 * s, depth: 0.3 * s }, scene);
      gunMount.position = new Vector3(side * 0.55 * s, 0.7 * s, 0.2 * s);
      addPart('gunMount', gunMount, darkMat);

      const barrel = MeshBuilder.CreateCylinder('eBarrel', { height: 0.25 * s, diameter: 0.06 * s, tessellation: 6 }, scene);
      barrel.position = new Vector3(side * 0.55 * s, 0.7 * s, 0.4 * s);
      barrel.rotation.x = Math.PI / 2;
      addPart('eBarrel', barrel, darkMat);

      const muzzle = MeshBuilder.CreateSphere('muzzle', { diameter: 0.08 * s, segments: 4 }, scene);
      muzzle.position = new Vector3(side * 0.55 * s, 0.7 * s, 0.52 * s);
      addPart('muzzle', muzzle, glowMat);
    }
  }

  // --- LEGS ---
  for (const side of [-1, 1]) {
    const hipJoint = MeshBuilder.CreateSphere('hipJoint', { diameter: 0.18 * s, segments: 4 }, scene);
    hipJoint.position = new Vector3(side * 0.22 * s, 0.5 * s, 0);
    addPart('hipJoint', hipJoint, darkMat);

    const thigh = MeshBuilder.CreateBox('leg', { width: 0.18 * s, height: 0.4 * s, depth: 0.2 * s }, scene);
    thigh.position = new Vector3(side * 0.22 * s, 0.28 * s, 0);
    addPart('thigh', thigh, bodyMat);

    const knee = MeshBuilder.CreateSphere('knee', { diameter: 0.14 * s, segments: 4 }, scene);
    knee.position = new Vector3(side * 0.22 * s, 0.08 * s, 0.04 * s);
    addPart('knee', knee, darkMat);

    const shin = MeshBuilder.CreateBox('leg', { width: 0.15 * s, height: 0.35 * s, depth: 0.18 * s }, scene);
    shin.position = new Vector3(side * 0.22 * s, -0.12 * s, 0.02 * s);
    addPart('shin', shin, bodyMat);

    // Shin armor
    const shinGuard = MeshBuilder.CreateBox('shinGuard', { width: 0.12 * s, height: 0.2 * s, depth: 0.06 * s }, scene);
    shinGuard.position = new Vector3(side * 0.22 * s, -0.08 * s, 0.12 * s);
    addPart('shinGuard', shinGuard, armorMat);

    const foot = MeshBuilder.CreateBox('foot', { width: 0.2 * s, height: 0.08 * s, depth: 0.28 * s }, scene);
    foot.position = new Vector3(side * 0.22 * s, -0.32 * s, 0.05 * s);
    addPart('foot', foot, darkMat);
  }

  // Type-specific extras
  if (type.behavior === 'rush' && type.scale > 1) {
    // Juggernaut: extra armor plates and back engine
    const backEngine = MeshBuilder.CreateCylinder('backEngine', { height: 0.3 * s, diameter: 0.25 * s, tessellation: 6 }, scene);
    backEngine.position = new Vector3(0, 1.2 * s, -0.28 * s);
    addPart('backEngine', backEngine, darkMat);

    const engineGlow = MeshBuilder.CreateSphere('engineGlow', { diameter: 0.18 * s, segments: 4 }, scene);
    engineGlow.position = new Vector3(0, 1.2 * s, -0.4 * s);
    addPart('engineGlow', engineGlow, glowMat);
  }

  if (type.behavior === 'flank') {
    for (const side of [-1, 1]) {
      const blade = MeshBuilder.CreateBox('blade', { width: 0.03 * s, height: 0.06 * s, depth: 0.35 * s }, scene);
      blade.position = new Vector3(side * 0.4 * s, 0.9 * s, 0.1 * s);
      addPart('blade', blade, glowMat);
    }
  }

  return {
    mesh: root,
    bodyParts,
    health: type.health,
    maxHealth: type.health,
    type,
    position: position.clone(),
    velocity: Vector3.Zero(),
    alive: true,
    fireTimer: Math.random() * 2,
    strafeDir: Math.random() > 0.5 ? 1 : -1,
    strafeTimer: 0,
    targetPos: position.clone(),
    alertLevel: 0,
    lastSeenPlayerPos: null,
    hitFlashTimer: 0,
    deathTimer: 0,
    _losTimer: 0,
    _cachedLos: false,
  };
}

let _hitFlashMat: StandardMaterial | null = null;

export function updateEnemy(
  enemy: Enemy,
  playerPos: Vector3,
  playerState: PlayerState,
  dt: number,
  scene: Scene,
  onEnemyShoot: (origin: Vector3, dir: Vector3, damage: number) => void,
): void {
  if (!enemy.alive) {
    enemy.deathTimer += dt;
    if (enemy.mesh) {
      const scale = Math.max(0, 1 - enemy.deathTimer * 2);
      enemy.mesh.scaling.setAll(scale);
      enemy.mesh.position.y -= dt * 2;
    }
    return;
  }

  enemy.hitFlashTimer = Math.max(0, enemy.hitFlashTimer - dt);

  if (enemy.hitFlashTimer > 0) {
    if (!_hitFlashMat) {
      _hitFlashMat = new StandardMaterial('hitFlash', scene);
      _hitFlashMat.emissiveColor = new Color3(1, 1, 1);
      _hitFlashMat.diffuseColor = new Color3(1, 1, 1);
      _hitFlashMat.specularColor = Color3.Black();
      _hitFlashMat.freeze();
    }
    enemy.bodyParts.forEach(part => { part.material = _hitFlashMat; });
  } else {
    const bodyMat = getEnemyMat(scene, enemy.type.color, 'body');
    const headMat = getEnemyMat(scene, enemy.type.color, 'head');
    const armorMat = getEnemyMat(scene, enemy.type.color, 'armor');
    const glowMat = getEnemyMat(scene, enemy.type.color, 'glow');
    const darkMat = getEnemyMat(scene, enemy.type.color, 'dark');

    enemy.bodyParts.forEach(part => {
      const n = part.name;
      if (part.metadata?.isHead) part.material = headMat;
      else if (n === 'visor' || n === 'core' || n === 'antennaTip' || n === 'muzzle' || n === 'engineGlow' || n === 'blade' || n === 'lens') part.material = glowMat;
      else if (n === 'chestPlate' || n === 'shoulderPad' || n === 'backPanel' || n === 'shinGuard' || n === 'horn' || n === 'scope') part.material = armorMat;
      else if (n === 'pelvis' || n === 'neck' || n === 'shoulderJoint' || n === 'elbow' || n === 'hipJoint' || n === 'knee' || n === 'foot' || n === 'gunMount' || n === 'eBarrel' || n === 'backEngine' || n === 'antenna') part.material = darkMat;
      else part.material = bodyMat;
    });
  }

  const toPlayer = playerPos.subtract(enemy.position);
  const distToPlayer = toPlayer.length();
  const dirToPlayer = toPlayer.normalize();

  enemy._losTimer -= dt;
  let canSeePlayer = enemy._cachedLos;
  if (enemy._losTimer <= 0) {
    enemy._losTimer = 0.25;
    const ray = new Ray(
      enemy.position.add(new Vector3(0, 1.5, 0)),
      dirToPlayer,
      distToPlayer,
    );
    const pick = scene.pickWithRay(ray, (mesh) => {
      return mesh.checkCollisions && !enemy.bodyParts.includes(mesh as Mesh);
    });
    canSeePlayer = !pick?.hit || pick.distance >= distToPlayer - 1;
    enemy._cachedLos = canSeePlayer;
  }

  if (canSeePlayer) {
    enemy.alertLevel = Math.min(1, enemy.alertLevel + dt * 2);
    enemy.lastSeenPlayerPos = playerPos.clone();
  } else {
    enemy.alertLevel = Math.max(0, enemy.alertLevel - dt * 0.5);
  }

  const targetAngle = Math.atan2(dirToPlayer.x, dirToPlayer.z);
  const currentAngle = enemy.mesh.rotation.y;
  let angleDiff = targetAngle - currentAngle;
  while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
  while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
  enemy.mesh.rotation.y += angleDiff * Math.min(1, dt * 8);

  const moveSpeed = enemy.type.speed * (0.5 + enemy.alertLevel * 0.5);

  switch (enemy.type.behavior) {
    case 'rush': {
      if (distToPlayer > 5) {
        enemy.velocity.x = dirToPlayer.x * moveSpeed;
        enemy.velocity.z = dirToPlayer.z * moveSpeed;
      } else {
        enemy.velocity.x *= 0.9;
        enemy.velocity.z *= 0.9;
      }
      break;
    }
    case 'strafe': {
      enemy.strafeTimer -= dt;
      if (enemy.strafeTimer <= 0) {
        enemy.strafeDir *= -1;
        enemy.strafeTimer = 1.5 + Math.random() * 2;
      }
      const strafeVec = new Vector3(-dirToPlayer.z, 0, dirToPlayer.x).scale(enemy.strafeDir);
      if (distToPlayer > 15) {
        enemy.velocity.x = (dirToPlayer.x * 0.6 + strafeVec.x * 0.4) * moveSpeed;
        enemy.velocity.z = (dirToPlayer.z * 0.6 + strafeVec.z * 0.4) * moveSpeed;
      } else if (distToPlayer < 8) {
        enemy.velocity.x = (-dirToPlayer.x * 0.3 + strafeVec.x * 0.7) * moveSpeed;
        enemy.velocity.z = (-dirToPlayer.z * 0.3 + strafeVec.z * 0.7) * moveSpeed;
      } else {
        enemy.velocity.x = strafeVec.x * moveSpeed;
        enemy.velocity.z = strafeVec.z * moveSpeed;
      }
      break;
    }
    case 'snipe': {
      const desiredDist = 35;
      if (distToPlayer < desiredDist - 5) {
        enemy.velocity.x = -dirToPlayer.x * moveSpeed;
        enemy.velocity.z = -dirToPlayer.z * moveSpeed;
      } else if (distToPlayer > desiredDist + 5) {
        enemy.velocity.x = dirToPlayer.x * moveSpeed * 0.5;
        enemy.velocity.z = dirToPlayer.z * moveSpeed * 0.5;
      } else {
        enemy.velocity.x *= 0.9;
        enemy.velocity.z *= 0.9;
      }
      break;
    }
    case 'flank': {
      const flankAngle = Math.PI * 0.6 * enemy.strafeDir;
      const flankDir = new Vector3(
        Math.sin(targetAngle + flankAngle),
        0,
        Math.cos(targetAngle + flankAngle),
      );
      if (distToPlayer > 10) {
        enemy.velocity.x = (dirToPlayer.x * 0.4 + flankDir.x * 0.6) * moveSpeed;
        enemy.velocity.z = (dirToPlayer.z * 0.4 + flankDir.z * 0.6) * moveSpeed;
      } else {
        enemy.velocity.x = flankDir.x * moveSpeed * 0.8;
        enemy.velocity.z = flankDir.z * moveSpeed * 0.8;
      }
      enemy.strafeTimer -= dt;
      if (enemy.strafeTimer <= 0) {
        enemy.strafeDir *= -1;
        enemy.strafeTimer = 2 + Math.random() * 3;
      }
      break;
    }
  }

  enemy.position.x += enemy.velocity.x * dt;
  enemy.position.z += enemy.velocity.z * dt;
  enemy.position.x = Math.max(-75, Math.min(75, enemy.position.x));
  enemy.position.z = Math.max(-75, Math.min(75, enemy.position.z));
  enemy.position.y = 0;

  enemy.mesh.position.copyFrom(enemy.position);

  const walkSpeed = new Vector3(enemy.velocity.x, 0, enemy.velocity.z).length();
  if (walkSpeed > 0.5) {
    const time = performance.now() * 0.006;
    const legAmplitude = 0.4 * (walkSpeed / enemy.type.speed);
    enemy.bodyParts.forEach((part, i) => {
      if (part.name === 'leg') {
        part.rotation.x = Math.sin(time + i * Math.PI) * legAmplitude;
      }
    });
  }

  // Subtle idle bob for the head
  if (enemy.alive) {
    const idleBob = Math.sin(performance.now() * 0.003) * 0.02;
    enemy.bodyParts.forEach(part => {
      if (part.metadata?.isHead) {
        part.position.y = 2.03 * enemy.type.scale + idleBob;
      }
    });
  }

  if (canSeePlayer && enemy.alertLevel > 0.3 && playerState.alive) {
    enemy.fireTimer -= dt;
    if (enemy.fireTimer <= 0) {
      enemy.fireTimer = 1 / enemy.type.fireRate;

      const shootOrigin = enemy.position.add(new Vector3(0, 1.5 * enemy.type.scale, 0));
      const shootDir = dirToPlayer.add(new Vector3(
        (Math.random() - 0.5) * enemy.type.accuracy,
        (Math.random() - 0.5) * enemy.type.accuracy * 0.5,
        (Math.random() - 0.5) * enemy.type.accuracy,
      )).normalize();

      onEnemyShoot(shootOrigin, shootDir, enemy.type.damage);
    }
  }
}

export function damageEnemy(enemy: Enemy, damage: number, headshot: boolean): { killed: boolean; headshot: boolean } {
  if (!enemy.alive) return { killed: false, headshot };

  const actualDamage = headshot ? damage * enemy.type.health / enemy.maxHealth : damage;
  enemy.health -= actualDamage;
  enemy.hitFlashTimer = 0.1;
  enemy.alertLevel = 1;

  if (enemy.health <= 0) {
    enemy.alive = false;
    enemy.health = 0;
    return { killed: true, headshot };
  }
  return { killed: false, headshot };
}

export function cleanupEnemy(enemy: Enemy) {
  enemy.bodyParts.forEach((part) => {
    part.dispose();
  });
  enemy.mesh.dispose();
}
