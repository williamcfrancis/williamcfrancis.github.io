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
    color: def.color, roughness: 0.3, metalness: 0.05,
    emissive: def.color, emissiveIntensity: 0.04,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.scale.y = 0.78;
  g.add(body);

  // Eye whites (bigger, goofier)
  const er = def.radius * 0.22;
  const whiteGeo = new THREE.SphereGeometry(er, 8, 8);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xFAFAFA, roughness: 0.3 });
  const pupilGeo = new THREE.SphereGeometry(er * 0.55, 7, 7);
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A });
  const shineGeo = new THREE.SphereGeometry(er * 0.2, 5, 5);
  const shineMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 });
  [-1, 1].forEach((s) => {
    const w = new THREE.Mesh(whiteGeo, whiteMat);
    w.position.set(s * def.radius * 0.3, def.radius * 0.18, def.radius * 0.7);
    g.add(w);
    const p = new THREE.Mesh(pupilGeo, pupilMat);
    p.position.set(s * def.radius * 0.3, def.radius * 0.18, def.radius * 0.82);
    g.add(p);
    const sh = new THREE.Mesh(shineGeo, shineMat);
    sh.position.set(s * def.radius * 0.3 + er * 0.25, def.radius * 0.26, def.radius * 0.86);
    g.add(sh);
  });

  // Eyebrow ridges for expression
  const browMat = new THREE.MeshStandardMaterial({ color: def.color, roughness: 0.5 });
  [-1, 1].forEach((s) => {
    const brow = new THREE.Mesh(new THREE.CylinderGeometry(er * 0.15, er * 0.15, def.radius * 0.3, 4), browMat);
    brow.position.set(s * def.radius * 0.3, def.radius * 0.38, def.radius * 0.68);
    brow.rotation.z = s * 0.3;
    brow.rotation.x = -0.2;
    g.add(brow);
  });

  // Mouth
  const mouthGeo = new THREE.TorusGeometry(def.radius * 0.15, 0.03, 6, 12, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -def.radius * 0.05, def.radius * 0.75);
  mouth.rotation.x = -0.3;
  mouth.rotation.z = Math.PI;
  g.add(mouth);

  // Type-specific quirky details
  if (def.name === 'sprout') {
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x66BB6A, roughness: 0.5 });
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(def.radius * 0.25, 5, 5), leafMat);
    leaf.position.set(0, def.radius * 0.55, 0);
    leaf.scale.set(1, 0.5, 1);
    g.add(leaf);
  }

  if (def.name === 'gourd') {
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.03, 0.2, 4), stemMat);
    stem.position.set(0, def.radius * 0.6, 0);
    stem.rotation.z = 0.3;
    g.add(stem);
    const curlMat = new THREE.MeshStandardMaterial({ color: 0x66BB6A });
    const curl = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 4, 8, Math.PI), curlMat);
    curl.position.set(0.05, def.radius * 0.72, 0);
    curl.rotation.x = Math.PI / 2;
    g.add(curl);
  }

  if (def.name === 'bloom') {
    const petalColors = [0xE040FB, 0xF06292, 0xBA68C8];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const petalMat = new THREE.MeshStandardMaterial({
        color: petalColors[i % petalColors.length], roughness: 0.4,
        emissive: petalColors[i % petalColors.length], emissiveIntensity: 0.06,
      });
      const petal = new THREE.Mesh(new THREE.SphereGeometry(def.radius * 0.2, 5, 5), petalMat);
      petal.position.set(Math.cos(a) * def.radius * 0.7, def.radius * 0.45, Math.sin(a) * def.radius * 0.7);
      petal.scale.set(1, 0.5, 1);
      g.add(petal);
    }
  }

  if (def.name === 'thorn') {
    const spikeMat = new THREE.MeshStandardMaterial({ color: 0x6D4C41, roughness: 0.6 });
    for (let i = 0; i < 7; i++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 4), spikeMat);
      const a = (i / 7) * Math.PI * 2;
      spike.position.set(Math.cos(a) * def.radius * 0.85, def.radius * 0.25, Math.sin(a) * def.radius * 0.85);
      spike.lookAt(spike.position.clone().multiplyScalar(1.5));
      g.add(spike);
    }
  }

  if (def.name === 'bramble') {
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x33691E });
    for (let i = 0; i < 4; i++) {
      const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.015, 0.45, 4), vineMat);
      const a = (i / 4) * Math.PI * 2;
      vine.position.set(Math.cos(a) * def.radius * 0.55, def.radius * 0.5, Math.sin(a) * def.radius * 0.55);
      vine.rotation.z = (Math.random() - 0.5) * 0.8;
      g.add(vine);
    }
    const thornyMat = new THREE.MeshStandardMaterial({ color: 0x1B5E20 });
    for (let i = 0; i < 3; i++) {
      const thorn = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 3), thornyMat);
      const a = Math.random() * Math.PI * 2;
      thorn.position.set(Math.cos(a) * def.radius * 0.7, def.radius * 0.35, Math.sin(a) * def.radius * 0.7);
      g.add(thorn);
    }
  }

  // Shadow blob for each enemy
  const shadowGeo = new THREE.CircleGeometry(def.radius * 0.8, 12);
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12 });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
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

  const bodyGeo = new THREE.SphereGeometry(radius, 20, 16);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xFF8A65, roughness: 0.25, metalness: 0.1,
    emissive: 0xFF8A65, emissiveIntensity: 0.06,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.castShadow = true;
  body.scale.y = 0.78;
  g.add(body);

  // Goofy oversized eyes
  const er = radius * 0.22;
  const whiteGeo = new THREE.SphereGeometry(er, 8, 8);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xFAFAFA, roughness: 0.3 });
  const pupilGeo = new THREE.SphereGeometry(er * 0.6, 7, 7);
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A });
  const shineGeo = new THREE.SphereGeometry(er * 0.22, 5, 5);
  const shineMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, emissiveIntensity: 0.5 });
  [-1, 1].forEach((s) => {
    const w = new THREE.Mesh(whiteGeo, whiteMat);
    w.position.set(s * radius * 0.28, radius * 0.25, radius * 0.65);
    g.add(w);
    const p = new THREE.Mesh(pupilGeo, pupilMat);
    p.position.set(s * radius * 0.28, radius * 0.25, radius * 0.78);
    g.add(p);
    const sh = new THREE.Mesh(shineGeo, shineMat);
    sh.position.set(s * radius * 0.28 + er * 0.2, radius * 0.33, radius * 0.82);
    g.add(sh);
  });

  // Angry eyebrows
  const browMat = new THREE.MeshStandardMaterial({ color: 0xBF360C });
  [-1, 1].forEach((s) => {
    const brow = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, radius * 0.35, 4), browMat);
    brow.position.set(s * radius * 0.28, radius * 0.45, radius * 0.62);
    brow.rotation.z = s * -0.4;
    g.add(brow);
  });

  // Grumpy mouth
  const mouthGeo = new THREE.TorusGeometry(radius * 0.18, 0.05, 6, 12, Math.PI);
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x4E342E });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -radius * 0.1, radius * 0.7);
  mouth.rotation.z = Math.PI;
  mouth.rotation.x = -0.2;
  g.add(mouth);

  // Crown
  const crownMat = new THREE.MeshStandardMaterial({ color: 0xFFD54F, emissive: 0xFFA000, emissiveIntensity: 0.3 });
  for (let i = 0; i < 5; i++) {
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.7, 5), crownMat);
    const a = (i / 5) * Math.PI - Math.PI / 2;
    spike.position.set(Math.sin(a) * radius * 0.5, radius * 0.78, Math.cos(a) * radius * 0.3);
    g.add(spike);
  }

  // Crown gems
  const gemColors = [0xE53935, 0x2196F3, 0x4CAF50];
  for (let i = 0; i < 3; i++) {
    const gemMat = new THREE.MeshStandardMaterial({
      color: gemColors[i], emissive: gemColors[i], emissiveIntensity: 0.3, roughness: 0.2,
    });
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), gemMat);
    const a = ((i + 0.5) / 3) * Math.PI - Math.PI / 2;
    gem.position.set(Math.sin(a) * radius * 0.52, radius * 0.68, Math.cos(a) * radius * 0.32);
    g.add(gem);
  }

  // Boss shadow
  const shadowGeo = new THREE.CircleGeometry(radius * 1.2, 16);
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.15 });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
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
      e.body.material.emissive.setHex(0xFFFFFF);
      e.body.material.emissiveIntensity = 0.6;
    } else {
      e.body.material.emissive.setHex(e.originalColor);
      e.body.material.emissiveIntensity = 0.04;
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
      boss.body.material.emissive.setHex(0xFF4444);
      boss.body.material.emissiveIntensity = 0.4;
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
        boss.body.material.emissive.setHex(boss.originalColor);
        boss.body.material.emissiveIntensity = 0.04;
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

      spawnBurst(boss.mesh.position, 0xFF8A65, 14);
      spawnShockwave(scene, boss.mesh.position, 5);

      boss.slamCooldown = 5000;
      boss.aiState = 'chase';
      boss.aiTimer = 1500;
      boss.body.material.emissive.setHex(boss.originalColor);
      boss.body.material.emissiveIntensity = 0.04;
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
