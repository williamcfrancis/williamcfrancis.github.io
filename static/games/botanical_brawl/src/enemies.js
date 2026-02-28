import * as THREE from 'three';
import { hitSound, deathSound, playerHitSound, bossRoarSound } from './audio.js';
import {
  spawnBurst, spawnDeathEffect, spawnDamageNumber, spawnShockwave,
  createEnemyHpBar, removeEnemyHpBar,
} from './vfx.js';

// ── Enemy Definitions ──

const SLIME_DEFS = [
  { weight: 0.45, radius: 0.45, hp: 30,  speed: 0.04,  dmg: 8,  color: 0x90EE90, name: 'sprout', minWave: 1 },
  { weight: 0.22, radius: 0.65, hp: 70,  speed: 0.028, dmg: 14, color: 0xFFCC80, name: 'gourd',  minWave: 1 },
  { weight: 0.13, radius: 0.90, hp: 140, speed: 0.018, dmg: 22, color: 0xCE93D8, name: 'bloom',  minWave: 1 },
  { weight: 0.12, radius: 0.38, hp: 40,  speed: 0.022, dmg: 6,  color: 0xA1887F, name: 'thorn',  minWave: 3 },
  { weight: 0.08, radius: 0.80, hp: 100, speed: 0.015, dmg: 16, color: 0x558B2F, name: 'bramble', minWave: 5 },
];

function pickSlimeDef(wave) {
  const available = SLIME_DEFS.filter(d => wave >= d.minWave);
  const totalW = available.reduce((s, d) => s + d.weight, 0);
  let r = Math.random() * totalW;
  for (const d of available) {
    r -= d.weight;
    if (r <= 0) return d;
  }
  return available[0];
}

const _sharedEyeGeo = new THREE.SphereGeometry(1, 5, 5);
const _sharedEyeMat = new THREE.MeshBasicMaterial({ color: 0x222222 });
const _sharedShadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12 });

function buildEnemyMesh(def) {
  const g = new THREE.Group();
  const bodyGeo = new THREE.SphereGeometry(def.radius, 10, 8);
  const bodyMat = new THREE.MeshLambertMaterial({ color: def.color });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.y = 0.78;
  g.add(body);

  // Eyes
  const er = def.radius * 0.18;
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(_sharedEyeGeo, _sharedEyeMat);
    eye.scale.setScalar(er);
    eye.position.set(s * def.radius * 0.3, def.radius * 0.18, def.radius * 0.78);
    g.add(eye);
  });

  // Type-specific accent (1 extra mesh max)
  if (def.name === 'sprout') {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(def.radius * 0.2, def.radius * 0.3, 3),
      new THREE.MeshLambertMaterial({ color: 0x66BB6A }));
    leaf.position.y = def.radius * 0.55;
    g.add(leaf);
  } else if (def.name === 'gourd') {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.2, 3),
      new THREE.MeshLambertMaterial({ color: 0x5D4037 }));
    stem.position.set(0, def.radius * 0.6, 0);
    stem.rotation.z = 0.3;
    g.add(stem);
  } else if (def.name === 'thorn') {
    const spikeMat = new THREE.MeshLambertMaterial({ color: 0x6D4C41 });
    for (let i = 0; i < 4; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.15, 3), spikeMat);
      const a = (i / 4) * Math.PI * 2;
      spike.position.set(Math.cos(a) * def.radius * 0.8, def.radius * 0.3, Math.sin(a) * def.radius * 0.8);
      g.add(spike);
    }
  } else if (def.name === 'bloom') {
    const petalMat = new THREE.MeshLambertMaterial({ color: 0xE040FB });
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.SphereGeometry(def.radius * 0.18, 4, 3), petalMat);
      petal.position.set(Math.cos(a) * def.radius * 0.65, def.radius * 0.4, Math.sin(a) * def.radius * 0.65);
      petal.scale.y = 0.5;
      g.add(petal);
    }
  }

  // Shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(def.radius * 0.7, 6), _sharedShadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -def.radius * 0.75;
  g.add(shadow);

  return { group: g, body };
}

// ── Spawning ──

export function spawnEnemy(scene, state, spawnEdge) {
  const def = pickSlimeDef(state.wave);
  const angle = Math.random() * Math.PI * 2;
  const { group, body } = buildEnemyMesh(def);

  group.position.set(
    Math.cos(angle) * spawnEdge,
    def.radius * 0.78,
    Math.sin(angle) * spawnEdge,
  );
  scene.add(group);

  const waveScale = 1 + (state.wave - 1) * 0.12;
  const enemy = {
    mesh: group, body,
    hp: Math.round(def.hp * waveScale),
    maxHp: Math.round(def.hp * waveScale),
    speed: def.speed + state.wave * 0.002,
    radius: def.radius,
    contactDmg: Math.round(def.dmg + state.wave * 1.5),
    phase: Math.random() * Math.PI * 2,
    flashUntil: 0,
    originalColor: def.color,
    type: def.name,
    lastShot: 0,
    isBoss: false,
  };

  createEnemyHpBar(scene, enemy);
  state.enemies.push(enemy);
}

// ── Boss ──

export function spawnBoss(scene, state, spawnEdge) {
  const radius = 2.0;
  const waveScale = 1 + (state.wave - 1) * 0.1;
  const g = new THREE.Group();

  const bodyGeo = new THREE.SphereGeometry(radius, 12, 10);
  const bodyMat = new THREE.MeshLambertMaterial({ color: 0xFF8A65 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.y = 0.78;
  g.add(body);

  // Eyes
  const er = radius * 0.2;
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(_sharedEyeGeo, _sharedEyeMat);
    eye.scale.setScalar(er);
    eye.position.set(s * radius * 0.28, radius * 0.25, radius * 0.75);
    g.add(eye);
  });

  // Crown spikes
  const crownMat = new THREE.MeshLambertMaterial({ color: 0xFFD54F });
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.6, 4), crownMat);
    const a = (i / 5) * Math.PI - Math.PI / 2;
    spike.position.set(Math.sin(a) * radius * 0.5, radius * 0.75, Math.cos(a) * radius * 0.3);
    g.add(spike);
  }

  // Shadow
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(radius, 8), _sharedShadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -radius * 0.75;
  g.add(shadow);

  const angle = Math.random() * Math.PI * 2;
  g.position.set(Math.cos(angle) * spawnEdge, radius * 0.78, Math.sin(angle) * spawnEdge);
  scene.add(g);

  const boss = {
    mesh: g, body,
    hp: Math.round(600 * waveScale),
    maxHp: Math.round(600 * waveScale),
    speed: 0.025 + state.wave * 0.001,
    radius,
    contactDmg: Math.round(35 + state.wave * 2),
    phase: 0,
    flashUntil: 0,
    originalColor: 0xFF8A65,
    type: 'boss',
    isBoss: true,
    lastShot: 0,
    aiState: 'chase',
    aiTimer: 0,
    chargeDir: new THREE.Vector3(),
    slamCooldown: 0,
  };

  createEnemyHpBar(scene, boss);
  state.enemies.push(boss);
  state.boss = boss;
  bossRoarSound();
  return boss;
}

// ── Thorn Projectiles ──

function fireThornProjectile(scene, enemy, playerPos, state) {
  const dir = new THREE.Vector3().subVectors(playerPos, enemy.mesh.position).setY(0).normalize();
  const geo = new THREE.ConeGeometry(0.1, 0.3, 4);
  const mat = new THREE.MeshBasicMaterial({ color: 0x6D4C41 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(enemy.mesh.position);
  mesh.position.y = 0.5;
  mesh.rotation.x = Math.PI / 2;
  scene.add(mesh);

  state.enemyProjectiles.push({
    mesh,
    vel: dir.multiplyScalar(0.08),
    damage: Math.round(10 + state.wave * 1.2),
    life: 300,
    homing: 0.008,
    targetPos: playerPos,
  });
}

const _epToPlayer = new THREE.Vector3();
const _epLook = new THREE.Vector3();

export function updateEnemyProjectiles(state, scene, islandRadius) {
  const dt60 = state.dt60;
  for (let i = state.enemyProjectiles.length - 1; i >= 0; i--) {
    const p = state.enemyProjectiles[i];
    _epToPlayer.subVectors(state.playerPos, p.mesh.position).setY(0).normalize();
    p.vel.addScaledVector(_epToPlayer, p.homing * dt60);
    p.vel.setY(0).normalize().multiplyScalar(0.08);
    p.mesh.position.addScaledVector(p.vel, dt60);
    _epLook.copy(p.mesh.position).add(p.vel);
    p.mesh.lookAt(_epLook);
    p.life -= dt60;

    const dist = Math.sqrt(p.mesh.position.x ** 2 + p.mesh.position.z ** 2);
    if (dist > islandRadius + 2 || p.life <= 0) {
      scene.remove(p.mesh);
      state.enemyProjectiles.splice(i, 1);
      continue;
    }

    const dx = p.mesh.position.x - state.playerPos.x;
    const dz = p.mesh.position.z - state.playerPos.z;
    if (Math.sqrt(dx * dx + dz * dz) < 0.6) {
      const now = performance.now();
      if (now > state.iframesUntil) {
        state.playerHp -= p.damage;
        state.iframesUntil = now + 800;
        state.shakeUntil = now + 200;
        state.shakeMag = 0.3;
        playerHitSound();
        spawnBurst(state.playerPos, 0xFF6F61, 5);
      }
      scene.remove(p.mesh);
      state.enemyProjectiles.splice(i, 1);
    }
  }
}

// ── Update All Enemies ──

const _enemyDir = new THREE.Vector3();

export function updateEnemies(state, scene, camera, islandRadius) {
  const now = performance.now();
  const dt60 = state.dt60;

  for (const e of state.enemies) {
    if (e.isBoss) {
      updateBossAI(e, state, scene, now, dt60);
    } else if (e.type === 'thorn') {
      const dist = distXZ(e.mesh.position, state.playerPos);
      if (dist > 8) {
        _enemyDir.subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
        e.mesh.position.addScaledVector(_enemyDir, e.speed * dt60);
      } else if (dist < 6) {
        _enemyDir.subVectors(e.mesh.position, state.playerPos).setY(0).normalize();
        e.mesh.position.addScaledVector(_enemyDir, e.speed * 0.5 * dt60);
      }
      if (now - e.lastShot > 2000) {
        e.lastShot = now;
        fireThornProjectile(scene, e, state.playerPos, state);
      }
    } else {
      _enemyDir.subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
      e.mesh.position.addScaledVector(_enemyDir, e.speed * dt60);
    }

    e.phase += 0.07 * dt60;
    e.mesh.position.y = e.radius * 0.78 + Math.abs(Math.sin(e.phase)) * 0.35;
    const t = Math.sin(e.phase);
    e.body.scale.y = 0.78 + t * 0.14;
    e.body.scale.x = 1.0 - t * 0.07;
    e.body.scale.z = 1.0 - t * 0.07;

    e.mesh.lookAt(state.playerPos.x, e.mesh.position.y, state.playerPos.z);

    if (now < e.flashUntil) {
      e.body.material.color.setHex(0xFFFFFF);
    } else {
      e.body.material.color.setHex(e.originalColor);
    }

    if (!e.isBoss || e.aiState === 'chase') {
      if (distXZ(e.mesh.position, state.playerPos) < e.radius + 0.5) {
        if (now > state.iframesUntil) {
          state.playerHp -= e.contactDmg;
          state.iframesUntil = now + 800;
          state.shakeUntil = now + 200;
          state.shakeMag = 0.4;
          playerHitSound();
          spawnBurst(state.playerPos, 0xFF6F61, 6);
        }
      }
    }
  }
}

const _bossOrigin = new THREE.Vector3();

function updateBossAI(boss, state, scene, now, dt60 = 1) {
  const dtMs = dt60 * (1000 / 60);
  boss.aiTimer -= dtMs;

  switch (boss.aiState) {
    case 'chase':
      {
        _enemyDir.subVectors(state.playerPos, boss.mesh.position).setY(0).normalize();
        boss.mesh.position.addScaledVector(_enemyDir, boss.speed * dt60);

        if (boss.aiTimer <= 0) {
          const dist = distXZ(boss.mesh.position, state.playerPos);
          if (dist < 8 && boss.slamCooldown <= 0) {
            boss.aiState = 'slam_windup';
            boss.aiTimer = 600;
          } else if (dist > 5) {
            boss.aiState = 'charge_windup';
            boss.aiTimer = 400;
            boss.chargeDir.subVectors(state.playerPos, boss.mesh.position).setY(0).normalize();
          } else {
            boss.aiTimer = 500 + Math.random() * 500;
          }
        }
      }
      break;

    case 'charge_windup':
      boss.body.material.color.setHex(0xFF6644);
      if (boss.aiTimer <= 0) {
        boss.aiState = 'charging';
        boss.aiTimer = 400;
      }
      break;

    case 'charging':
      boss.mesh.position.addScaledVector(boss.chargeDir, boss.speed * 5 * dt60);
      if (distXZ(boss.mesh.position, state.playerPos) < boss.radius + 0.5) {
        if (now > state.iframesUntil) {
          state.playerHp -= boss.contactDmg * 2;
          state.iframesUntil = now + 800;
          state.shakeUntil = now + 300;
          state.shakeMag = 0.7;
          playerHitSound();
          spawnBurst(state.playerPos, 0xFF6F61, 10);
        }
      }
      _bossOrigin.set(0, 0, 0);
      if (boss.aiTimer <= 0 || distXZ(boss.mesh.position, _bossOrigin) > 20) {
        boss.aiState = 'chase';
        boss.aiTimer = 1000;
        boss.body.material.color.setHex(boss.originalColor);
      }
      break;

    case 'slam_windup':
      boss.body.scale.y = 0.78 + Math.sin(now * 0.02) * 0.15;
      boss.body.material.color.setHex(0xFF8800);
      if (boss.aiTimer <= 0) {
        boss.aiState = 'slam';
        boss.aiTimer = 100;
      }
      break;

    case 'slam':
      state.shakeUntil = now + 400;
      state.shakeMag = 0.6;

      const slamDist = distXZ(boss.mesh.position, state.playerPos);
      if (slamDist < 5 && slamDist > boss.radius) {
        if (now > state.iframesUntil) {
          state.playerHp -= Math.round(boss.contactDmg * 1.5);
          state.iframesUntil = now + 800;
          playerHitSound();
          spawnBurst(state.playerPos, 0xFF6F61, 8);
        }
      }

      spawnBurst(boss.mesh.position, 0xFF8A65, 14);
      spawnShockwave(scene, boss.mesh.position, 5);

      boss.slamCooldown = 5000;
      boss.aiState = 'chase';
      boss.aiTimer = 1500;
      boss.body.material.color.setHex(boss.originalColor);
      break;
  }

  if (boss.slamCooldown > 0) boss.slamCooldown -= dtMs;
}

// ── Handle enemy hit ──

export function damageEnemy(enemy, damage, state, scene, camera, isBounced = false) {
  enemy.hp -= damage;
  enemy.flashUntil = performance.now() + 100;
  hitSound();
  spawnBurst(enemy.mesh.position, 0xFFFFFF, 4);
  spawnDamageNumber(enemy.mesh.position, camera, damage, isBounced);

  if (enemy.hp <= 0) {
    killEnemy(enemy, state, scene);
    return true;
  }
  return false;
}

export function killEnemy(enemy, state, scene) {
  deathSound();
  spawnDeathEffect(scene, enemy.mesh.position, enemy.originalColor, enemy.isBoss);
  removeEnemyHpBar(scene, enemy);
  scene.remove(enemy.mesh);

  const idx = state.enemies.indexOf(enemy);
  if (idx >= 0) state.enemies.splice(idx, 1);

  state.score += enemy.isBoss ? state.wave * 500 : 100 + state.wave * 10;
  state.kills++;
  if (!enemy.isBoss) state.enemiesRemaining--;

  if (enemy.isBoss) {
    state.boss = null;
    state.isBossWave = false;
  }

  if (enemy.type === 'bramble') {
    for (let i = 0; i < 2; i++) {
      const sproutDef = SLIME_DEFS[0];
      const a = Math.random() * Math.PI * 2;
      const { group, body } = buildEnemyMesh(sproutDef);
      group.position.copy(enemy.mesh.position);
      group.position.x += Math.cos(a) * 1;
      group.position.z += Math.sin(a) * 1;
      group.position.y = sproutDef.radius * 0.78;
      scene.add(group);
      const waveScale = 1 + (state.wave - 1) * 0.12;
      const child = {
        mesh: group, body,
        hp: Math.round(sproutDef.hp * waveScale * 0.6),
        maxHp: Math.round(sproutDef.hp * waveScale * 0.6),
        speed: sproutDef.speed + state.wave * 0.002,
        radius: sproutDef.radius,
        contactDmg: Math.round(sproutDef.dmg + state.wave * 1.5),
        phase: Math.random() * Math.PI * 2,
        flashUntil: 0,
        originalColor: sproutDef.color,
        type: 'sprout',
        lastShot: 0,
        isBoss: false,
      };
      createEnemyHpBar(scene, child);
      state.enemies.push(child);
    }
  }

  return enemy;
}

// ── Clear ──

export function clearEnemies(state, scene) {
  for (const e of state.enemies) {
    removeEnemyHpBar(scene, e);
    scene.remove(e.mesh);
  }
  state.enemies.length = 0;
  for (const p of state.enemyProjectiles) scene.remove(p.mesh);
  state.enemyProjectiles.length = 0;
  state.boss = null;
}

function distXZ(a, b) {
  const dx = a.x - b.x, dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}
