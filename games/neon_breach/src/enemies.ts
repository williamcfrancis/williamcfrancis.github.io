import {
  Scene,
  Vector3,
  Mesh,
  MeshBuilder,
  Color3,
  PBRMaterial,
  TransformNode,
  StandardMaterial,
  GlowLayer,
} from '@babylonjs/core';
import type { Enemy, EnemyType, PlayerState } from './types';

const FLASH_WHITE = new Color3(1, 1, 1);

export const ENEMY_TYPES: EnemyType[] = [
  {
    name: 'Drone',
    health: 60,
    speed: 7,
    damage: 8,
    fireRate: 1.5,
    accuracy: 0.6,
    scoreValue: 100,
    color: [0, 0.8, 1],
    emissiveColor: [0, 0.6, 0.8],
    scale: 1,
    behavior: 'rush',
  },
  {
    name: 'Sentinel',
    health: 100,
    speed: 5,
    damage: 14,
    fireRate: 1.2,
    accuracy: 0.75,
    scoreValue: 150,
    color: [1, 0.3, 0.5],
    emissiveColor: [0.8, 0.1, 0.3],
    scale: 1.1,
    behavior: 'strafe',
  },
  {
    name: 'Marksman',
    health: 70,
    speed: 3,
    damage: 25,
    fireRate: 0.6,
    accuracy: 0.9,
    scoreValue: 200,
    color: [1, 0, 0.6],
    emissiveColor: [0.8, 0, 0.5],
    scale: 1,
    behavior: 'snipe',
  },
  {
    name: 'Stalker',
    health: 80,
    speed: 9,
    damage: 12,
    fireRate: 1.8,
    accuracy: 0.65,
    scoreValue: 175,
    color: [0.5, 0.1, 1],
    emissiveColor: [0.4, 0, 0.8],
    scale: 0.9,
    behavior: 'flank',
  },
  {
    name: 'Wasp',
    health: 50,
    speed: 11,
    damage: 10,
    fireRate: 2,
    accuracy: 0.55,
    scoreValue: 175,
    color: [1, 0.5, 0],
    emissiveColor: [0.8, 0.3, 0],
    scale: 0.8,
    behavior: 'fly',
  },
  {
    name: 'NEXUS CORE',
    health: 1200,
    speed: 4,
    damage: 30,
    fireRate: 2.5,
    accuracy: 0.8,
    scoreValue: 2000,
    color: [1, 0.2, 0.2],
    emissiveColor: [1, 0.1, 0.1],
    scale: 2.5,
    behavior: 'boss',
    isBoss: true,
    abilities: ['shield', 'slam', 'summon', 'barrage'],
  },
];

export function spawnEnemy(scene: Scene, type: EnemyType, position: Vector3, glowLayer?: GlowLayer): Enemy {
  const root = new TransformNode(`enemy_${type.name}_${Date.now()}`, scene);
  root.position = position.clone();

  const bodyParts: Mesh[] = [];
  const c = type.color;
  const ec = type.emissiveColor;
  const s = type.scale;

  const bodyMat = new PBRMaterial(`eMat_body_${root.name}`, scene);
  bodyMat.albedoColor = new Color3(0.12, 0.1, 0.15);
  bodyMat.roughness = 0.7;
  bodyMat.metallic = 0.15;

  const glowMat = new PBRMaterial(`eMat_glow_${root.name}`, scene);
  glowMat.albedoColor = new Color3(c[0] * 0.2, c[1] * 0.2, c[2] * 0.2);
  glowMat.emissiveColor = new Color3(ec[0], ec[1], ec[2]);
  glowMat.emissiveIntensity = type.isBoss ? 4 : 2.5;
  glowMat.roughness = 0.3;
  glowMat.metallic = 0.3;

  // Hit flash now mutates emissive on the body+glow materials directly
  // instead of swapping mesh.material every frame; fewer dirty rebinds.
  const flashMaterials = [
    { mat: bodyMat, baseColor: bodyMat.emissiveColor.clone(), baseIntensity: bodyMat.emissiveIntensity },
    { mat: glowMat, baseColor: glowMat.emissiveColor.clone(), baseIntensity: glowMat.emissiveIntensity },
  ];

  const makePart = (name: string, opts: any, pos: Vector3, mat: PBRMaterial, isHead = false): Mesh => {
    const mesh = opts.diameter !== undefined
      ? MeshBuilder.CreateSphere(name, opts, scene)
      : MeshBuilder.CreateBox(name, opts, scene);
    mesh.position = pos.scale(s);
    mesh.scaling.setAll(s);
    mesh.parent = root;
    mesh.material = mat;
    mesh.isPickable = true;
    mesh.checkCollisions = false;
    mesh.metadata = { isHead, enemy: root.name };
    bodyParts.push(mesh);
    if (glowLayer && mat === glowMat) glowLayer.addIncludedOnlyMesh(mesh);
    return mesh;
  };

  if (type.isBoss) {
    // Boss: large, imposing, multi-part
    makePart('torso', { width: 2.5, height: 3, depth: 1.8 }, new Vector3(0, 2, 0), bodyMat);
    makePart('head', { diameter: 1.4, segments: 8 }, new Vector3(0, 4, 0), glowMat, true);
    makePart('shoulderL', { diameter: 1.2, segments: 6 }, new Vector3(-1.8, 3.2, 0), bodyMat);
    makePart('shoulderR', { diameter: 1.2, segments: 6 }, new Vector3(1.8, 3.2, 0), bodyMat);
    makePart('armL', { width: 0.5, height: 2, depth: 0.5 }, new Vector3(-2.2, 1.5, 0), bodyMat);
    makePart('armR', { width: 0.5, height: 2, depth: 0.5 }, new Vector3(2.2, 1.5, 0), bodyMat);
    makePart('legL', { width: 0.7, height: 2.5, depth: 0.7 }, new Vector3(-0.8, -0.5, 0), bodyMat);
    makePart('legR', { width: 0.7, height: 2.5, depth: 0.7 }, new Vector3(0.8, -0.5, 0), bodyMat);
    makePart('core', { diameter: 0.8, segments: 8 }, new Vector3(0, 2, 0.9), glowMat);
    makePart('visor', { width: 1.2, height: 0.3, depth: 0.1 }, new Vector3(0, 4.1, 0.6), glowMat);
    // Decorative armor plates
    makePart('plate1', { width: 1.5, height: 0.15, depth: 1 }, new Vector3(0, 3.5, 0), glowMat);
    makePart('plate2', { width: 0.15, height: 2, depth: 0.8 }, new Vector3(-1.4, 2, 0), glowMat);
    makePart('plate3', { width: 0.15, height: 2, depth: 0.8 }, new Vector3(1.4, 2, 0), glowMat);
  } else if (type.behavior === 'fly') {
    // Flying drone: compact, hovering
    makePart('body', { width: 0.8, height: 0.5, depth: 0.8 }, new Vector3(0, 1.5, 0), bodyMat);
    makePart('head', { diameter: 0.5, segments: 6 }, new Vector3(0, 1.9, 0), glowMat, true);
    makePart('wingL', { width: 1.2, height: 0.05, depth: 0.4 }, new Vector3(-0.8, 1.5, 0), bodyMat);
    makePart('wingR', { width: 1.2, height: 0.05, depth: 0.4 }, new Vector3(0.8, 1.5, 0), bodyMat);
    makePart('thruster', { diameter: 0.3, segments: 6 }, new Vector3(0, 1.1, 0), glowMat);
  } else {
    // Humanoid enemies
    makePart('torso', { width: 0.8, height: 1.2, depth: 0.5 }, new Vector3(0, 1.2, 0), bodyMat);
    makePart('head', { diameter: 0.5, segments: 8 }, new Vector3(0, 2.1, 0), bodyMat, true);
    makePart('visor', { width: 0.4, height: 0.15, depth: 0.08 }, new Vector3(0, 2.15, 0.22), glowMat, true);
    makePart('legL', { width: 0.25, height: 0.9, depth: 0.25 }, new Vector3(-0.2, 0.25, 0), bodyMat);
    makePart('legR', { width: 0.25, height: 0.9, depth: 0.25 }, new Vector3(0.2, 0.25, 0), bodyMat);
    makePart('armL', { width: 0.2, height: 0.8, depth: 0.2 }, new Vector3(-0.55, 1.1, 0), bodyMat);
    makePart('armR', { width: 0.2, height: 0.8, depth: 0.2 }, new Vector3(0.55, 1.1, 0), bodyMat);
    makePart('accent', { width: 0.9, height: 0.06, depth: 0.55 }, new Vector3(0, 1.6, 0), glowMat);
  }

  // Boss health bar
  let healthBarMesh: Mesh | undefined;
  if (type.isBoss) {
    const bar = MeshBuilder.CreatePlane('bossBar', { width: 4, height: 0.3 }, scene);
    bar.position = new Vector3(0, 6 * s, 0);
    bar.parent = root;
    bar.billboardMode = Mesh.BILLBOARDMODE_ALL;
    const barMat = new StandardMaterial('barMat', scene);
    barMat.emissiveColor = new Color3(1, 0, 0);
    barMat.disableLighting = true;
    bar.material = barMat;
    bar.isPickable = false;
    healthBarMesh = bar;
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
    fireTimer: 1 + Math.random() * 2,
    strafeDir: Math.random() > 0.5 ? 1 : -1,
    strafeTimer: 2 + Math.random() * 3,
    targetPos: position.clone(),
    alertLevel: 0,
    lastSeenPlayerPos: null,
    hitFlashTimer: 0,
    deathTimer: 0,
    bossPhase: 0,
    specialTimer: 5,
    shieldActive: false,
    healthBarMesh,
    flashMaterials,
  };
}

export function updateEnemy(
  enemy: Enemy,
  playerPos: Vector3,
  _player: PlayerState,
  dt: number,
  scene: Scene,
  onShoot: (origin: Vector3, dir: Vector3, damage: number) => void,
): void {
  if (!enemy.alive) {
    enemy.deathTimer += dt;
    const sinkRate = enemy.deathTimer * 0.5;
    enemy.mesh.position.y -= sinkRate * dt;
    enemy.bodyParts.forEach(p => {
      p.rotation.z += dt * 2;
    });
    return;
  }

  // Hit flash via emissive modulation. Faster than swapping `mesh.material`
  // each frame because Babylon doesn't have to re-bind material uniforms,
  // and it leaves the GlowLayer mesh-include list intact.
  if (enemy.hitFlashTimer > 0) {
    enemy.hitFlashTimer -= dt;
    const t = Math.max(0, enemy.hitFlashTimer / 0.08);
    for (const fm of enemy.flashMaterials) {
      Color3.LerpToRef(fm.baseColor, FLASH_WHITE, t, fm.mat.emissiveColor);
      fm.mat.emissiveIntensity = fm.baseIntensity + t * 4;
    }
    if (enemy.hitFlashTimer <= 0) {
      for (const fm of enemy.flashMaterials) {
        fm.mat.emissiveColor.copyFrom(fm.baseColor);
        fm.mat.emissiveIntensity = fm.baseIntensity;
      }
    }
  }

  const toPlayer = playerPos.subtract(enemy.position);
  const distToPlayer = toPlayer.length();
  const dirToPlayer = distToPlayer > 0.1 ? toPlayer.normalize() : Vector3.Forward();

  enemy.alertLevel = Math.min(1, enemy.alertLevel + dt * 0.5);
  enemy.lastSeenPlayerPos = playerPos.clone();

  // Face player
  const lookAngle = Math.atan2(dirToPlayer.x, dirToPlayer.z);
  let angleDiff = lookAngle - enemy.mesh.rotation.y;
  while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
  while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
  enemy.mesh.rotation.y += angleDiff * Math.min(1, dt * 8);

  // Movement behavior
  const moveSpeed = enemy.type.speed * (enemy.type.isBoss ? (1 + enemy.bossPhase * 0.15) : 1);

  switch (enemy.type.behavior) {
    case 'rush':
      if (distToPlayer > 8) {
        enemy.velocity = dirToPlayer.scale(moveSpeed);
      } else {
        enemy.velocity = Vector3.Zero();
      }
      break;

    case 'strafe':
      enemy.strafeTimer -= dt;
      if (enemy.strafeTimer <= 0) {
        enemy.strafeDir *= -1;
        enemy.strafeTimer = 2 + Math.random() * 2;
      }
      if (distToPlayer > 15) {
        enemy.velocity = dirToPlayer.scale(moveSpeed * 0.7);
      } else if (distToPlayer < 8) {
        enemy.velocity = dirToPlayer.scale(-moveSpeed * 0.5);
      } else {
        const right = new Vector3(-dirToPlayer.z, 0, dirToPlayer.x);
        enemy.velocity = right.scale(moveSpeed * enemy.strafeDir);
      }
      break;

    case 'snipe':
      if (distToPlayer < 30) {
        enemy.velocity = dirToPlayer.scale(-moveSpeed);
      } else if (distToPlayer > 50) {
        enemy.velocity = dirToPlayer.scale(moveSpeed * 0.5);
      } else {
        enemy.strafeTimer -= dt;
        if (enemy.strafeTimer <= 0) {
          enemy.strafeDir *= -1;
          enemy.strafeTimer = 3 + Math.random() * 3;
        }
        const right = new Vector3(-dirToPlayer.z, 0, dirToPlayer.x);
        enemy.velocity = right.scale(moveSpeed * 0.3 * enemy.strafeDir);
      }
      break;

    case 'flank':
      const flankAngle = Math.atan2(dirToPlayer.x, dirToPlayer.z) + (enemy.strafeDir > 0 ? 1.2 : -1.2);
      const flankDir = new Vector3(Math.sin(flankAngle), 0, Math.cos(flankAngle));
      if (distToPlayer > 12) {
        enemy.velocity = flankDir.scale(moveSpeed);
      } else {
        enemy.velocity = dirToPlayer.scale(-moveSpeed * 0.3).add(flankDir.scale(moveSpeed * 0.7));
      }
      enemy.strafeTimer -= dt;
      if (enemy.strafeTimer <= 0) {
        enemy.strafeDir *= -1;
        enemy.strafeTimer = 1.5 + Math.random() * 2;
      }
      break;

    case 'fly': {
      const targetY = 5 + Math.sin(performance.now() * 0.001 + enemy.strafeDir * 10) * 3;
      const flyTarget = new Vector3(
        playerPos.x + Math.sin(performance.now() * 0.002 * enemy.strafeDir) * 15,
        targetY,
        playerPos.z + Math.cos(performance.now() * 0.002 * enemy.strafeDir) * 15,
      );
      const toTarget = flyTarget.subtract(enemy.position);
      enemy.velocity = toTarget.normalize().scale(moveSpeed);
      break;
    }

    case 'boss':
      enemy.specialTimer -= dt;

      if (enemy.bossPhase === 0 && enemy.health < enemy.maxHealth * 0.6) {
        enemy.bossPhase = 1;
      }
      if (enemy.bossPhase === 1 && enemy.health < enemy.maxHealth * 0.3) {
        enemy.bossPhase = 2;
      }

      enemy.strafeTimer -= dt;
      if (enemy.strafeTimer <= 0) {
        enemy.strafeDir *= -1;
        enemy.strafeTimer = 2 + Math.random() * 3;
      }

      if (distToPlayer > 20) {
        enemy.velocity = dirToPlayer.scale(moveSpeed * 1.2);
      } else if (distToPlayer < 8) {
        enemy.velocity = dirToPlayer.scale(-moveSpeed * 0.5);
      } else {
        const right = new Vector3(-dirToPlayer.z, 0, dirToPlayer.x);
        enemy.velocity = right.scale(moveSpeed * enemy.strafeDir * 0.8);
      }
      break;
  }

  // Apply velocity
  enemy.velocity.y = 0;
  enemy.position.addInPlace(enemy.velocity.scale(dt));

  // Clamp to arena
  const bound = 85;
  enemy.position.x = Math.max(-bound, Math.min(bound, enemy.position.x));
  enemy.position.z = Math.max(-bound, Math.min(bound, enemy.position.z));

  // Keep flying enemies airborne
  if (enemy.type.behavior === 'fly') {
    enemy.position.y = Math.max(3, enemy.position.y);
  } else {
    enemy.position.y = Math.max(0, enemy.position.y);
  }

  enemy.mesh.position.copyFrom(enemy.position);

  // Boss health bar update
  if (enemy.healthBarMesh) {
    const hpRatio = enemy.health / enemy.maxHealth;
    enemy.healthBarMesh.scaling.x = Math.max(0.01, hpRatio);
    const barMat = enemy.healthBarMesh.material as StandardMaterial;
    if (hpRatio > 0.5) barMat.emissiveColor = new Color3(1 - (hpRatio - 0.5) * 2, 1, 0);
    else barMat.emissiveColor = new Color3(1, hpRatio * 2, 0);
  }

  // Shooting
  enemy.fireTimer -= dt * (enemy.type.isBoss ? (1 + enemy.bossPhase * 0.5) : 1);
  if (enemy.fireTimer <= 0 && distToPlayer < (enemy.type.behavior === 'snipe' ? 80 : 60)) {
    enemy.fireTimer = 1 / enemy.type.fireRate;

    const accuracy = enemy.type.accuracy * enemy.alertLevel;
    const shootDir = dirToPlayer.add(new Vector3(
      (Math.random() - 0.5) * (1 - accuracy) * 0.3,
      (Math.random() - 0.5) * (1 - accuracy) * 0.15,
      (Math.random() - 0.5) * (1 - accuracy) * 0.3,
    )).normalize();

    const shootOrigin = enemy.position.add(new Vector3(0, 1.5 * enemy.type.scale, 0));

    // Boss fires multiple shots
    if (enemy.type.isBoss) {
      const burstCount = 1 + enemy.bossPhase;
      for (let b = 0; b < burstCount; b++) {
        setTimeout(() => {
          const spread = 0.05 * (b + 1);
          const burstDir = shootDir.add(new Vector3(
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread * 0.5,
            (Math.random() - 0.5) * spread,
          )).normalize();
          onShoot(shootOrigin, burstDir, enemy.type.damage);
        }, b * 100);
      }
    } else {
      onShoot(shootOrigin, shootDir, enemy.type.damage);
    }
  }
}

export function damageEnemy(enemy: Enemy, damage: number, headshot: boolean): { killed: boolean } {
  if (!enemy.alive) return { killed: false };
  if (enemy.shieldActive) {
    damage *= 0.2;
  }

  enemy.health -= damage;
  enemy.hitFlashTimer = 0.08;

  if (enemy.health <= 0) {
    enemy.health = 0;
    enemy.alive = false;
    enemy.bodyParts.forEach(p => {
      p.isPickable = false;
    });
    return { killed: true };
  }
  return { killed: false };
}

export function cleanupEnemy(enemy: Enemy): void {
  enemy.bodyParts.forEach(p => {
    if (p.material) p.material.dispose();
    p.dispose();
  });
  if (enemy.healthBarMesh) {
    if (enemy.healthBarMesh.material) enemy.healthBarMesh.material.dispose();
    enemy.healthBarMesh.dispose();
  }
  enemy.mesh.dispose();
}
