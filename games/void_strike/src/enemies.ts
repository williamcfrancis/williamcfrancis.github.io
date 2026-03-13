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

function getEnemyMat(scene: Scene, color: [number, number, number], highlight: boolean): StandardMaterial {
  const key = `${color.join(',')}_${highlight}`;
  let mat = _matCache.get(key);
  if (mat) return mat;

  mat = new StandardMaterial('eMat_' + key, scene);
  if (highlight) {
    mat.diffuseColor = new Color3(color[0], color[1], color[2]);
    mat.emissiveColor = new Color3(color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
  } else {
    mat.diffuseColor = new Color3(color[0] * 0.5, color[1] * 0.5, color[2] * 0.5);
  }
  mat.specularColor = Color3.Black();
  mat.freeze();
  _matCache.set(key, mat);
  return mat;
}

export function spawnEnemy(scene: Scene, type: EnemyType, position: Vector3): Enemy {
  const root = new TransformNode('enemy_' + Math.random(), scene);
  root.position = position.clone();

  const bodyParts: Mesh[] = [];
  const s = type.scale;

  const bodyMat = getEnemyMat(scene, type.color, false);
  const headMat = getEnemyMat(scene, type.color, true);

  const torso = MeshBuilder.CreateBox('torso', { width: 0.8 * s, height: 1.2 * s, depth: 0.5 * s }, scene);
  torso.position.y = 1.1 * s;
  torso.parent = root;
  torso.material = bodyMat;
  bodyParts.push(torso);

  const head = MeshBuilder.CreateSphere('head', { diameter: 0.45 * s, segments: 6 }, scene);
  head.position.y = 2 * s;
  head.parent = root;
  head.material = headMat;
  head.metadata = { isHead: true };
  bodyParts.push(head);

  const visor = MeshBuilder.CreateBox('visor', { width: 0.35 * s, height: 0.1 * s, depth: 0.3 * s }, scene);
  visor.position.y = 2 * s;
  visor.position.z = 0.15 * s;
  visor.parent = root;
  visor.material = headMat;
  bodyParts.push(visor);

  for (const side of [-1, 1]) {
    const leg = MeshBuilder.CreateBox('leg', { width: 0.25 * s, height: 0.9 * s, depth: 0.3 * s }, scene);
    leg.position = new Vector3(side * 0.25 * s, 0.45 * s, 0);
    leg.parent = root;
    leg.material = bodyMat;
    bodyParts.push(leg);
  }

  for (const side of [-1, 1]) {
    const arm = MeshBuilder.CreateBox('arm', { width: 0.2 * s, height: 0.8 * s, depth: 0.25 * s }, scene);
    arm.position = new Vector3(side * 0.55 * s, 1.1 * s, 0);
    arm.parent = root;
    arm.material = bodyMat;
    bodyParts.push(arm);
  }

  for (const side of [-1, 1]) {
    const shoulder = MeshBuilder.CreateBox('shoulder', { width: 0.35 * s, height: 0.15 * s, depth: 0.4 * s }, scene);
    shoulder.position = new Vector3(side * 0.55 * s, 1.7 * s, 0);
    shoulder.parent = root;
    shoulder.material = headMat;
    bodyParts.push(shoulder);
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
    const bodyMat = getEnemyMat(scene, enemy.type.color, false);
    const headMat = getEnemyMat(scene, enemy.type.color, true);
    enemy.bodyParts.forEach(part => {
      part.material = (part.metadata?.isHead || part.name === 'visor' || part.name === 'shoulder') ? headMat : bodyMat;
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
    enemy.bodyParts.forEach((part, i) => {
      if (part.name === 'leg') {
        part.rotation.x = Math.sin(time + i * Math.PI) * 0.4 * (walkSpeed / enemy.type.speed);
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
