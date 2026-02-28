import * as THREE from 'three';
import { pickupCollectSound } from './audio.js';
import { spawnBurst } from './vfx.js';

const PICKUP_DEFS = [
  { type: 'heart',  weight: 0.50, color: 0xFF6B6B, label: '+20 HP' },
  { type: 'speed',  weight: 0.25, color: 0x42A5F5, label: 'Speed!' },
  { type: 'damage', weight: 0.25, color: 0xFFA726, label: 'Power!' },
];

function pickType() {
  let r = Math.random();
  for (const d of PICKUP_DEFS) {
    r -= d.weight;
    if (r <= 0) return d;
  }
  return PICKUP_DEFS[0];
}

export function trySpawnPickup(scene, pos, state, dropChance = 0.20) {
  if (Math.random() > dropChance) return;
  const def = pickType();

  const geo = def.type === 'heart'
    ? new THREE.SphereGeometry(0.25, 8, 8)
    : new THREE.OctahedronGeometry(0.22, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: def.color, emissive: def.color, emissiveIntensity: 0.3, roughness: 0.3,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos);
  mesh.position.y = 0.6;
  mesh.castShadow = true;
  scene.add(mesh);

  state.pickups.push({
    mesh, type: def.type, color: def.color, label: def.label,
    spawnTime: performance.now(),
    phase: Math.random() * Math.PI * 2,
  });
}

export function updatePickups(state, scene, maxHp) {
  const now = performance.now();
  const dt60 = state.dt60;

  for (let i = state.pickups.length - 1; i >= 0; i--) {
    const p = state.pickups[i];
    const age = now - p.spawnTime;

    p.phase += 0.05 * dt60;
    p.mesh.position.y = 0.6 + Math.sin(p.phase) * 0.15;
    p.mesh.rotation.y += 0.03 * dt60;

    if (age > 7000) {
      p.mesh.visible = Math.floor(now / 120) % 2 === 0;
    }

    if (age > 10000) {
      scene.remove(p.mesh);
      state.pickups.splice(i, 1);
      continue;
    }

    const dx = p.mesh.position.x - state.playerPos.x;
    const dz = p.mesh.position.z - state.playerPos.z;
    if (Math.sqrt(dx * dx + dz * dz) < 1.0) {
      collectPickup(p, state, maxHp);
      spawnBurst(p.mesh.position, p.color, 6);
      scene.remove(p.mesh);
      state.pickups.splice(i, 1);
    }
  }
}

function collectPickup(pickup, state, maxHp) {
  pickupCollectSound();

  switch (pickup.type) {
    case 'heart':
      state.playerHp = Math.min(maxHp, state.playerHp + 20);
      break;
    case 'speed':
      addBuff(state, 'speed', 8000);
      break;
    case 'damage':
      addBuff(state, 'damage', 8000);
      break;
  }
}

function addBuff(state, type, duration) {
  state.activeBuffs = state.activeBuffs.filter(b => b.type !== type);
  state.activeBuffs.push({ type, until: performance.now() + duration });
}

export function updateBuffs(state) {
  const now = performance.now();
  state.activeBuffs = state.activeBuffs.filter(b => b.until > now);
  state.speedMultiplier = state.activeBuffs.some(b => b.type === 'speed') ? 1.5 : 1.0;
  state.damageMultiplier = state.activeBuffs.some(b => b.type === 'damage') ? 1.5 : 1.0;
}

export function clearPickups(state, scene) {
  for (const p of state.pickups) scene.remove(p.mesh);
  state.pickups.length = 0;
  state.activeBuffs.length = 0;
  state.speedMultiplier = 1;
  state.damageMultiplier = 1;
}
