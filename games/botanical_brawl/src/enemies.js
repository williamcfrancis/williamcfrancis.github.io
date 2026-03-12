import * as THREE from 'three';
import { hitSound, deathSound, playerHitSound, bossRoarSound } from './audio.js';
import {
  spawnBurst, spawnDeathEffect, spawnDamageNumber, spawnShockwave,
  createEnemyHpBar, removeEnemyHpBar,
} from './vfx.js';
import { spawnDebris } from './debris.ts';

// ── Enemy Definitions ──

const SLIME_DEFS = [
  { weight: 0.45, radius: 0.45, hp: 30,  speed: 0.04,  dmg: 8,  color: 0x90EE90, name: 'sprout', minWave: 1 },
  { weight: 0.22, radius: 0.65, hp: 70,  speed: 0.028, dmg: 14, color: 0xFFCC80, name: 'gourd',  minWave: 1 },
  { weight: 0.13, radius: 0.90, hp: 140, speed: 0.018, dmg: 22, color: 0xCE93D8, name: 'bloom',  minWave: 1 },
  { weight: 0.12, radius: 0.38, hp: 40,  speed: 0.022, dmg: 6,  color: 0xA1887F, name: 'thorn',  minWave: 3 },
  { weight: 0.08, radius: 0.80, hp: 100, speed: 0.015, dmg: 16, color: 0x558B2F, name: 'bramble', minWave: 5 },
  { weight: 0.04, radius: 0.55, hp: 90,  speed: 0.012, dmg: 10, color: 0x4A90D9, name: 'sentinel', minWave: 6 },
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

const _enemyGeoCache = {};

function _getEnemyGeos(def) {
  if (_enemyGeoCache[def.name]) return _enemyGeoCache[def.name];

  const geos = {
    body: new THREE.SphereGeometry(def.radius, 10, 8),
    shadow: new THREE.CircleGeometry(def.radius * 0.7, 6),
  };

  if (def.name === 'sprout') {
    geos.leaf = new THREE.ConeGeometry(def.radius * 0.2, def.radius * 0.3, 3);
  } else if (def.name === 'gourd') {
    geos.stem = new THREE.CylinderGeometry(0.04, 0.03, 0.2, 3);
  } else if (def.name === 'thorn') {
    geos.spike = new THREE.ConeGeometry(0.05, 0.15, 3);
  } else if (def.name === 'bloom') {
    geos.petal = new THREE.SphereGeometry(def.radius * 0.18, 4, 3);
  } else if (def.name === 'sentinel') {
    geos.core = new THREE.OctahedronGeometry(def.radius * 0.7, 0);
    geos.shell = new THREE.OctahedronGeometry(def.radius, 0);
    geos.orb = new THREE.SphereGeometry(0.06, 4, 4);
  }

  _enemyGeoCache[def.name] = geos;
  return geos;
}

const _accentMats = {
  sproutLeaf: new THREE.MeshLambertMaterial({ color: 0x66BB6A }),
  gourdStem: new THREE.MeshLambertMaterial({ color: 0x5D4037 }),
  thornSpike: new THREE.MeshLambertMaterial({ color: 0x6D4C41 }),
  bloomPetal: new THREE.MeshLambertMaterial({ color: 0xE040FB }),
  sentinelOrb: new THREE.MeshBasicMaterial({ color: 0xFF4444 }),
};

function buildEnemyMesh(def) {
  const geos = _getEnemyGeos(def);
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshLambertMaterial({ color: def.color });
  const body = new THREE.Mesh(geos.body, bodyMat);
  body.scale.y = 0.78;
  g.add(body);

  const er = def.radius * 0.18;
  [-1, 1].forEach((s) => {
    const eye = new THREE.Mesh(_sharedEyeGeo, _sharedEyeMat);
    eye.scale.setScalar(er);
    eye.position.set(s * def.radius * 0.3, def.radius * 0.18, def.radius * 0.78);
    g.add(eye);
  });

  if (def.name === 'sprout') {
    const leaf = new THREE.Mesh(geos.leaf, _accentMats.sproutLeaf);
    leaf.position.y = def.radius * 0.55;
    g.add(leaf);
  } else if (def.name === 'gourd') {
    const stem = new THREE.Mesh(geos.stem, _accentMats.gourdStem);
    stem.position.set(0, def.radius * 0.6, 0);
    stem.rotation.z = 0.3;
    g.add(stem);
  } else if (def.name === 'thorn') {
    for (let i = 0; i < 4; i++) {
      const spike = new THREE.Mesh(geos.spike, _accentMats.thornSpike);
      const a = (i / 4) * Math.PI * 2;
      spike.position.set(Math.cos(a) * def.radius * 0.8, def.radius * 0.3, Math.sin(a) * def.radius * 0.8);
      g.add(spike);
    }
  } else if (def.name === 'bloom') {
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const petal = new THREE.Mesh(geos.petal, _accentMats.bloomPetal);
      petal.position.set(Math.cos(a) * def.radius * 0.65, def.radius * 0.4, Math.sin(a) * def.radius * 0.65);
      petal.scale.y = 0.5;
      g.add(petal);
    }
  } else if (def.name === 'sentinel') {
    g.remove(body);
    const coreMat = new THREE.MeshLambertMaterial({ color: 0x4A90D9, emissive: 0x1A3060, emissiveIntensity: 0.4 });
    const core = new THREE.Mesh(geos.core, coreMat);
    core.rotation.y = Math.PI / 4;
    g.add(core);
    const shellMat = new THREE.MeshLambertMaterial({ color: 0x80B8E8, transparent: true, opacity: 0.45 });
    const shell = new THREE.Mesh(geos.shell, shellMat);
    g.add(shell);
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      const orb = new THREE.Mesh(geos.orb, _accentMats.sentinelOrb);
      orb.position.set(Math.cos(a) * def.radius * 0.9, 0, Math.sin(a) * def.radius * 0.9);
      g.add(orb);
    }
    return { group: g, body: core };
  }

  const shadow = new THREE.Mesh(geos.shadow, _sharedShadowMat);
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

// ── Shared enemy projectile geometries ──

const _thornGeos = {
  spike: new THREE.ConeGeometry(0.06, 0.28, 5),
  barb: new THREE.ConeGeometry(0.03, 0.1, 3),
};
const _thornMats = {
  spike: new THREE.MeshLambertMaterial({ color: 0x5D4037 }),
  barb: new THREE.MeshLambertMaterial({ color: 0x795548 }),
};

const _sentinelGeos = {
  core: new THREE.SphereGeometry(0.12, 6, 6),
  glow: new THREE.SphereGeometry(0.18, 6, 6),
  ring: new THREE.TorusGeometry(0.15, 0.02, 4, 8),
};
const _sentinelMats = {
  core: new THREE.MeshBasicMaterial({ color: 0xFF2244 }),
  glow: new THREE.MeshBasicMaterial({ color: 0xFF4466, transparent: true, opacity: 0.35 }),
  ring: new THREE.MeshBasicMaterial({ color: 0xFF6688 }),
};

const _epDir = new THREE.Vector3();

function fireThornProjectile(scene, enemy, playerPos, state) {
  _epDir.subVectors(playerPos, enemy.mesh.position).setY(0).normalize();

  const group = new THREE.Group();
  const spike = new THREE.Mesh(_thornGeos.spike, _thornMats.spike);
  spike.rotation.x = Math.PI / 2;
  group.add(spike);
  const barb1 = new THREE.Mesh(_thornGeos.barb, _thornMats.barb);
  barb1.position.set(0.06, 0, 0.05);
  barb1.rotation.z = -0.5;
  barb1.rotation.x = Math.PI / 2;
  group.add(barb1);
  const barb2 = new THREE.Mesh(_thornGeos.barb, _thornMats.barb);
  barb2.position.set(-0.06, 0, 0.05);
  barb2.rotation.z = 0.5;
  barb2.rotation.x = Math.PI / 2;
  group.add(barb2);

  group.position.copy(enemy.mesh.position);
  group.position.y = 0.5;
  scene.add(group);

  const speed = 0.1 + state.wave * 0.002;
  state.enemyProjectiles.push({
    mesh: group,
    vel: _epDir.clone().multiplyScalar(speed),
    damage: Math.round(10 + state.wave * 1.2),
    life: 300,
    homing: 0,
    destructible: false,
  });
}

function fireSentinelProjectile(scene, enemy, playerPos, state) {
  _epDir.subVectors(playerPos, enemy.mesh.position).setY(0).normalize();

  const group = new THREE.Group();
  group.add(new THREE.Mesh(_sentinelGeos.core, _sentinelMats.core));
  group.add(new THREE.Mesh(_sentinelGeos.glow, _sentinelMats.glow));
  const ring = new THREE.Mesh(_sentinelGeos.ring, _sentinelMats.ring);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  group.position.copy(enemy.mesh.position);
  group.position.y = 0.8;
  scene.add(group);

  state.enemyProjectiles.push({
    mesh: group,
    vel: _epDir.clone().multiplyScalar(0.06),
    damage: Math.round(18 + state.wave * 1.5),
    life: 400,
    homing: 0.006,
    destructible: true,
    targetPos: playerPos,
    _ring: ring,
    _phase: 0,
  });
}

const _epToPlayer = new THREE.Vector3();
const _epLook = new THREE.Vector3();

export function updateEnemyProjectiles(state, scene, islandRadius) {
  const dt60 = state.dt60;
  for (let i = state.enemyProjectiles.length - 1; i >= 0; i--) {
    const p = state.enemyProjectiles[i];

    if (p.homing > 0) {
      _epToPlayer.subVectors(state.playerPos, p.mesh.position).setY(0).normalize();
      p.vel.addScaledVector(_epToPlayer, p.homing * dt60);
      const spd = p.vel.length();
      p.vel.setY(0).normalize().multiplyScalar(spd);
      if (p._ring) {
        p._phase = (p._phase || 0) + 0.1 * dt60;
        p._ring.rotation.z = p._phase;
      }
    }

    p.mesh.position.addScaledVector(p.vel, dt60);
    _epLook.copy(p.mesh.position).add(p.vel);
    p.mesh.lookAt(_epLook);
    p.life -= dt60;

    // Wall collision: enemy projectiles are destroyed by walls
    if (state.terrain) {
      let hitWall = false;
      for (const wall of state.terrain.walls) {
        const wdx = Math.abs(p.mesh.position.x - wall.x);
        const wdz = Math.abs(p.mesh.position.z - wall.z);
        if (wdx < wall.hw + 0.15 && wdz < wall.hd + 0.15) {
          hitWall = true;
          break;
        }
      }
      if (hitWall) {
        if (p.destructible) spawnBurst(p.mesh.position, 0xFF4466, 6);
        scene.remove(p.mesh);
        state.enemyProjectiles[i] = state.enemyProjectiles[state.enemyProjectiles.length - 1];
        state.enemyProjectiles.pop();
        continue;
      }
    }

    const dist = Math.sqrt(p.mesh.position.x ** 2 + p.mesh.position.z ** 2);
    if (dist > islandRadius + 2 || p.life <= 0) {
      scene.remove(p.mesh);
      state.enemyProjectiles[i] = state.enemyProjectiles[state.enemyProjectiles.length - 1];
      state.enemyProjectiles.pop();
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
      state.enemyProjectiles[i] = state.enemyProjectiles[state.enemyProjectiles.length - 1];
      state.enemyProjectiles.pop();
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
    } else if (e.type === 'sentinel') {
      const dist = distXZ(e.mesh.position, state.playerPos);
      if (dist > 10) {
        _enemyDir.subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
        e.mesh.position.addScaledVector(_enemyDir, e.speed * dt60);
      } else if (dist < 7) {
        _enemyDir.subVectors(e.mesh.position, state.playerPos).setY(0).normalize();
        e.mesh.position.addScaledVector(_enemyDir, e.speed * 0.6 * dt60);
      } else {
        const strafe = Math.sin(now * 0.001 + e.phase) * e.speed * 0.8;
        _enemyDir.subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
        e.mesh.position.x += _enemyDir.z * strafe * dt60;
        e.mesh.position.z -= _enemyDir.x * strafe * dt60;
      }
      e.mesh.rotation.y += 0.02 * dt60;
      if (now - e.lastShot > 3500) {
        e.lastShot = now;
        fireSentinelProjectile(scene, e, state.playerPos, state);
      }
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
    if (e.type === 'sentinel') {
      e.mesh.position.y = 1.5 + Math.sin(e.phase * 0.7) * 0.3;
    } else {
      e.mesh.position.y = e.radius * 0.78 + Math.abs(Math.sin(e.phase)) * 0.35;
      const t = Math.sin(e.phase);
      e.body.scale.y = 0.78 + t * 0.14;
      e.body.scale.x = 1.0 - t * 0.07;
      e.body.scale.z = 1.0 - t * 0.07;
    }

    if (e.type !== 'sentinel') {
      e.mesh.lookAt(state.playerPos.x, e.mesh.position.y, state.playerPos.z);
    }

    // Apply knockback velocity
    if (e.knockVx) {
      e.mesh.position.x += e.knockVx * dt60;
      e.knockVx *= Math.pow(0.84, dt60);
      if (Math.abs(e.knockVx) < 0.001) e.knockVx = 0;
    }
    if (e.knockVz) {
      e.mesh.position.z += e.knockVz * dt60;
      e.knockVz *= Math.pow(0.84, dt60);
      if (Math.abs(e.knockVz) < 0.001) e.knockVz = 0;
    }

    // Wall collision for enemies
    if (state.terrain) {
      for (const wall of state.terrain.walls) {
        const wdx = e.mesh.position.x - wall.x;
        const wdz = e.mesh.position.z - wall.z;
        const overlapX = wall.hw + e.radius - Math.abs(wdx);
        const overlapZ = wall.hd + e.radius - Math.abs(wdz);
        if (overlapX > 0 && overlapZ > 0) {
          if (overlapX < overlapZ) {
            e.mesh.position.x += (wdx > 0 ? 1 : -1) * overlapX;
          } else {
            e.mesh.position.z += (wdz > 0 ? 1 : -1) * overlapZ;
          }
        }
      }

      if (e.type !== 'sentinel') {
        for (const hole of state.terrain.holes) {
          const hDist = distXZ(e.mesh.position, { x: hole.x, z: hole.z });
          if (hDist < hole.radius * 0.8) {
            e.hp -= 0.3 * dt60;
          }
        }
      }
    }

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

const _knockDir = new THREE.Vector3();

export function damageEnemy(enemy, damage, state, scene, camera, isBounced = false) {
  enemy.hp -= damage;
  enemy.flashUntil = performance.now() + 100;
  hitSound();
  spawnBurst(enemy.mesh.position, 0xFFFFFF, 4);
  spawnDamageNumber(enemy.mesh.position, camera, damage, isBounced);

  // Knockback: push enemy away from player on hit
  _knockDir.subVectors(enemy.mesh.position, state.playerPos).setY(0);
  if (_knockDir.lengthSq() > 0.001) _knockDir.normalize();
  const kbForce = 0.1 * (enemy.isBoss ? 0.15 : 1);
  enemy.knockVx = (enemy.knockVx || 0) + _knockDir.x * kbForce;
  enemy.knockVz = (enemy.knockVz || 0) + _knockDir.z * kbForce;

  if (enemy.hp <= 0) {
    killEnemy(enemy, state, scene);
    return true;
  }
  return false;
}

export function killEnemy(enemy, state, scene) {
  deathSound();
  spawnDeathEffect(scene, enemy.mesh.position, enemy.originalColor, enemy.isBoss);
  spawnDebris(scene, enemy.mesh.position, enemy.originalColor, enemy.radius, enemy.isBoss);
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
