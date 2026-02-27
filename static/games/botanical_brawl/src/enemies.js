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

function buildEnemyMesh(def) {
  const g = new THREE.Group();
  const bodyGeo = new THREE.SphereGeometry(def.radius, 16, 12);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: def.color, roughness: 0.35, metalness: 0.05,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.scale.y = 0.78;
  g.add(body);

  const er = def.radius * 0.2;
  const eyeGeo = new THREE.SphereGeometry(er, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const whiteGeo = new THREE.SphereGeometry(er * 0.5, 6, 6);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.4 });
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(eyeGeo, eyeMat);
    e.position.set(s * def.radius * 0.32, def.radius * 0.15, def.radius * 0.72);
    g.add(e);
    const w = new THREE.Mesh(whiteGeo, whiteMat);
    w.position.set(s * def.radius * 0.32 + er * 0.2, def.radius * 0.25, def.radius * 0.78);
    g.add(w);
  });

  const mouthGeo = new THREE.TorusGeometry(def.radius * 0.15, 0.03, 6, 12, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -def.radius * 0.05, def.radius * 0.75);
  mouth.rotation.x = -0.3;
  mouth.rotation.z = Math.PI;
  g.add(mouth);

  if (def.name === 'thorn') {
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0x6D4C41 });
    for (let i = 0; i < 5; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 4), spikeMat);
      const a = (i / 5) * Math.PI * 2;
      spike.position.set(Math.cos(a) * def.radius * 0.8, def.radius * 0.3, Math.sin(a) * def.radius * 0.8);
      spike.rotation.z = Math.cos(a) * 0.5;
      g.add(spike);
    }
  }

  if (def.name === 'bramble') {
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x33691E });
    for (let i = 0; i < 3; i++) {
      const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 0.5, 4), vineMat);
      const a = (i / 3) * Math.PI * 2;
      vine.position.set(Math.cos(a) * def.radius * 0.6, def.radius * 0.5, Math.sin(a) * def.radius * 0.6);
      vine.rotation.z = (Math.random() - 0.5) * 0.8;
      g.add(vine);
    }
  }

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

  const bodyGeo = new THREE.SphereGeometry(radius, 20, 16);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xFF8A65, roughness: 0.3, metalness: 0.1,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.scale.y = 0.78;
  g.add(body);

  const er = radius * 0.18;
  const eyeGeo = new THREE.SphereGeometry(er, 8, 8);
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  [-1, 1].forEach((s) => {
    const e = new THREE.Mesh(eyeGeo, eyeMat);
    e.position.set(s * radius * 0.3, radius * 0.2, radius * 0.7);
    g.add(e);
  });

  const crownMat = new THREE.MeshStandardMaterial({ color: 0xFFD54F, emissive: 0xFFA000, emissiveIntensity: 0.3 });
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 5), crownMat);
    const a = (i / 5) * Math.PI - Math.PI / 2;
    spike.position.set(Math.sin(a) * radius * 0.5, radius * 0.75, Math.cos(a) * radius * 0.3);
    g.add(spike);
  }

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
  const geo = new THREE.ConeGeometry(0.1, 0.3, 5);
  const mat = new THREE.MeshStandardMaterial({ color: 0x6D4C41, roughness: 0.5 });
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

export function updateEnemyProjectiles(state, scene, islandRadius) {
  for (let i = state.enemyProjectiles.length - 1; i >= 0; i--) {
    const p = state.enemyProjectiles[i];
    const toPlayer = new THREE.Vector3().subVectors(state.playerPos, p.mesh.position).setY(0).normalize();
    p.vel.add(toPlayer.multiplyScalar(p.homing));
    p.vel.setY(0).normalize().multiplyScalar(0.08);
    p.mesh.position.add(p.vel);
    p.mesh.lookAt(p.mesh.position.clone().add(p.vel));
    p.life--;

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

export function updateEnemies(state, scene, camera, islandRadius) {
  const now = performance.now();

  for (const e of state.enemies) {
    if (e.isBoss) {
      updateBossAI(e, state, scene, now);
    } else if (e.type === 'thorn') {
      const dist = distXZ(e.mesh.position, state.playerPos);
      if (dist > 8) {
        const dir = new THREE.Vector3().subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
        e.mesh.position.addScaledVector(dir, e.speed);
      } else if (dist < 6) {
        const away = new THREE.Vector3().subVectors(e.mesh.position, state.playerPos).setY(0).normalize();
        e.mesh.position.addScaledVector(away, e.speed * 0.5);
      }
      if (now - e.lastShot > 2000) {
        e.lastShot = now;
        fireThornProjectile(scene, e, state.playerPos, state);
      }
    } else {
      const dir = new THREE.Vector3().subVectors(state.playerPos, e.mesh.position).setY(0).normalize();
      e.mesh.position.addScaledVector(dir, e.speed);
    }

    e.phase += 0.07;
    e.mesh.position.y = e.radius * 0.78 + Math.abs(Math.sin(e.phase)) * 0.35;
    const t = Math.sin(e.phase);
    e.body.scale.y = 0.78 + t * 0.12;
    e.body.scale.x = 1.0 - t * 0.06;
    e.body.scale.z = 1.0 - t * 0.06;

    e.mesh.lookAt(state.playerPos.x, e.mesh.position.y, state.playerPos.z);

    if (now < e.flashUntil) {
      e.body.material.emissive.setHex(0xFFFFFF);
      e.body.material.emissiveIntensity = 0.6;
    } else {
      e.body.material.emissive.setHex(0x000000);
      e.body.material.emissiveIntensity = 0;
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

function updateBossAI(boss, state, scene, now) {
  boss.aiTimer -= 16;

  switch (boss.aiState) {
    case 'chase':
      {
        const dir = new THREE.Vector3().subVectors(state.playerPos, boss.mesh.position).setY(0).normalize();
        boss.mesh.position.addScaledVector(dir, boss.speed);

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
      boss.body.material.emissive.setHex(0xFF4444);
      boss.body.material.emissiveIntensity = 0.4;
      if (boss.aiTimer <= 0) {
        boss.aiState = 'charging';
        boss.aiTimer = 400;
      }
      break;

    case 'charging':
      boss.mesh.position.addScaledVector(boss.chargeDir, boss.speed * 5);
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
      if (boss.aiTimer <= 0 || distXZ(boss.mesh.position, new THREE.Vector3()) > 20) {
        boss.aiState = 'chase';
        boss.aiTimer = 1000;
        boss.body.material.emissive.setHex(0x000000);
        boss.body.material.emissiveIntensity = 0;
      }
      break;

    case 'slam_windup':
      boss.body.scale.y = 0.78 + Math.sin(now * 0.02) * 0.15;
      boss.body.material.emissive.setHex(0xFF8800);
      boss.body.material.emissiveIntensity = 0.5;
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

      spawnBurst(boss.mesh.position, 0xFF8A65, 12);
      spawnShockwave(scene, boss.mesh.position, 5);

      boss.slamCooldown = 5000;
      boss.aiState = 'chase';
      boss.aiTimer = 1500;
      boss.body.material.emissive.setHex(0x000000);
      boss.body.material.emissiveIntensity = 0;
      break;
  }

  if (boss.slamCooldown > 0) boss.slamCooldown -= 16;
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
