import * as THREE from 'three';
import { shootSound, forgeCompleteSound, bounceSound } from './audio.js';
import { spawnTrail } from './vfx.js';
import { saveWeaponToGallery } from './persistence.js';

// ── Rarity System ──

const RARITY_DEFS = {
  common:    { label: 'Common',    color: '#9E9E9E', hex: 0x9E9E9E, glow: 0 },
  uncommon:  { label: 'Uncommon',  color: '#4CAF50', hex: 0x4CAF50, glow: 0.15 },
  rare:      { label: 'Rare',      color: '#2196F3', hex: 0x2196F3, glow: 0.3 },
  legendary: { label: 'Legendary', color: '#FF9800', hex: 0xFF9800, glow: 0.5 },
};

export function computeRarity(weapon) {
  const score = (weapon.speed * 20) + (weapon.damage * 0.5) + (weapon.bounces * 30) + (weapon.scale * 10);
  if (score >= 120) return 'legendary';
  if (score >= 80) return 'rare';
  if (score >= 50) return 'uncommon';
  return 'common';
}

export function getRarityDef(rarity) {
  return RARITY_DEFS[rarity] || RARITY_DEFS.common;
}

// ── Default weapon factory ──

export function createDefaultWeapon() {
  return {
    speed: 1.0, damage: 40, scale: 1.0, bounces: 0,
    audioFreq: 520, audioType: 'sine',
    spriteTex: null, spriteDataUrl: null,
    name: 'Starter Orb', rarity: 'common',
  };
}

// ── Projectile Firing ──

export function fireProjectile(scene, state) {
  const now = performance.now();
  const weapon = state.weapons[state.activeWeaponIdx];
  const cooldown = 180 / Math.max(weapon.speed, 0.3);
  if (now - state.lastShot < cooldown) return;
  state.lastShot = now;

  const dir = new THREE.Vector3()
    .subVectors(state.mouseWorld, state.playerPos).setY(0).normalize();
  if (dir.length() < 0.01) dir.set(0, 0, -1);

  const s = weapon.scale;
  const effectiveDmg = Math.round(weapon.damage * state.damageMultiplier);
  let mesh;

  if (weapon.spriteTex) {
    const mat = new THREE.SpriteMaterial({ map: weapon.spriteTex, transparent: true });
    mesh = new THREE.Sprite(mat);
    mesh.scale.set(s * 1.2, s * 1.2, 1);
  } else {
    const geo = new THREE.SphereGeometry(0.22 * s, 10, 10);
    const rarityDef = getRarityDef(weapon.rarity);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xFFD54F, emissive: 0xFFA000,
      emissiveIntensity: 0.5 + rarityDef.glow,
      roughness: 0.25,
    });
    mesh = new THREE.Mesh(geo, mat);
  }

  mesh.position.copy(state.playerPos);
  mesh.position.y = 0.6;
  scene.add(mesh);

  shootSound(weapon.audioFreq, weapon.audioType);

  state.projectiles.push({
    mesh,
    vel: dir.clone().multiplyScalar(0.35 * weapon.speed),
    damage: effectiveDmg,
    radius: 0.22 * s,
    bouncesLeft: weapon.bounces,
    life: 400,
    trailColor: weapon.spriteTex ? 0xFFD54F : (getRarityDef(weapon.rarity).hex || 0xFFD54F),
    trailCounter: 0,
  });
}

// ── Projectile Update ──

const _projNorm = new THREE.Vector3();

export function updateProjectiles(state, scene, islandRadius, damageEnemyFn, camera) {
  const dt60 = state.dt60;
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.mesh.position.addScaledVector(p.vel, dt60);
    p.life -= dt60;

    p.trailCounter += dt60;
    if (p.trailCounter >= 3) {
      p.trailCounter -= 3;
      spawnTrail(p.mesh.position, p.trailColor);
    }

    const pDist = Math.sqrt(p.mesh.position.x ** 2 + p.mesh.position.z ** 2);
    if (pDist > islandRadius) {
      if (p.bouncesLeft > 0) {
        p.bouncesLeft--;
        bounceSound();
        _projNorm.set(p.mesh.position.x, 0, p.mesh.position.z).normalize();
        const dot = p.vel.dot(_projNorm);
        p.vel.sub(_projNorm.multiplyScalar(2 * dot));
        const clampR = islandRadius - 0.2;
        const angle = Math.atan2(p.mesh.position.z, p.mesh.position.x);
        p.mesh.position.x = Math.cos(angle) * clampR;
        p.mesh.position.z = Math.sin(angle) * clampR;
      } else {
        p.life = 0;
      }
    }

    for (let j = state.enemies.length - 1; j >= 0; j--) {
      const e = state.enemies[j];
      const dx = p.mesh.position.x - e.mesh.position.x;
      const dz = p.mesh.position.z - e.mesh.position.z;
      if (Math.sqrt(dx * dx + dz * dz) < p.radius + e.radius) {
        const wasBounced = p.bouncesLeft < (state.weapons[state.activeWeaponIdx].bounces || 0);
        damageEnemyFn(e, p.damage, state, scene, camera, wasBounced);
        p.life = 0;
        break;
      }
    }

    if (p.life <= 0) {
      scene.remove(p.mesh);
      state.projectiles.splice(i, 1);
    }
  }
}

// ── Forge ──

export async function handleForge(state, els) {
  const text = els.forgeInput.value.trim();
  if (!text) return;

  if (state.pollen <= 0) {
    els.forgeStatus.textContent = 'Not enough Pollen! Complete waves to earn more.';
    els.forgeStatus.className = 'forge-status error';
    return;
  }

  els.forgeBtn.disabled = true;
  els.forgeStatus.textContent = 'Forging your weapon...';
  els.forgeStatus.className = 'forge-status';

  let weapon;
  try {
    const data = await requestForgeStats(text);
    const raw = data.result || '';

    const get = (key, fb) => {
      const m = raw.match(new RegExp(`<${key}:\\s*([^>]+)>`));
      return m ? m[1].trim() : fb;
    };

    weapon = {
      speed: clamp(parseFloat(get('speed', '1.0')), 0.1, 5),
      damage: clamp(parseInt(get('damage', '40'), 10), 10, 500),
      scale: clamp(parseFloat(get('scale', '1.0')), 0.5, 5),
      bounces: clamp(parseInt(get('bounces', '0'), 10), 0, 5),
      audioFreq: clamp(parseInt(get('audio_freq', '520'), 10), 200, 1200),
      audioType: ['sine', 'triangle'].includes(get('audio_type', 'sine')) ? get('audio_type', 'sine') : 'sine',
      spriteTex: null,
      spriteDataUrl: null,
      name: text.length > 28 ? text.slice(0, 25) + '...' : text,
      rarity: 'common',
    };
  } catch (err) {
    console.error(err);
    els.forgeStatus.textContent = 'Forge failed — using fallback parameters.';
    els.forgeStatus.className = 'forge-status error';

    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    hash = Math.abs(hash);

    weapon = {
      speed: 0.5 + (hash % 40) / 10,
      damage: 20 + (hash % 200),
      scale: 0.5 + (hash % 30) / 10,
      bounces: hash % 4,
      audioFreq: 300 + (hash % 700),
      audioType: hash % 2 === 0 ? 'sine' : 'triangle',
      spriteTex: null,
      spriteDataUrl: null,
      name: text.length > 28 ? text.slice(0, 25) + '...' : text,
      rarity: 'common',
    };
  }

  weapon.rarity = computeRarity(weapon);
  state.pollen--;

  const slotIdx = state.forgeTargetSlot != null ? state.forgeTargetSlot : state.activeWeaponIdx;
  if (slotIdx >= state.weapons.length) {
    state.weapons.push(weapon);
  } else {
    state.weapons[slotIdx] = weapon;
  }
  state.activeWeaponIdx = slotIdx;

  els.forgeStatus.textContent = 'Conjuring visuals...';
  await loadWeaponSprite(text, weapon);

  forgeCompleteSound();

  const rarityDef = getRarityDef(weapon.rarity);
  els.forgeStatus.innerHTML =
    `Forged! <span style="color:${rarityDef.color};font-weight:700">[${rarityDef.label}]</span> ` +
    `SPD:${weapon.speed.toFixed(1)} DMG:${weapon.damage} BNC:${weapon.bounces}`;
  els.forgeStatus.className = 'forge-status success';

  saveWeaponToGallery(weapon);
  els.forgeBtn.disabled = false;
}

// ── Sprite Loading with Improved Background Removal ──

async function loadWeaponSprite(prompt, weapon) {
  const encoded = encodeURIComponent(prompt.replace(/\s+/g, '+'));
  const url = `https://image.pollinations.ai/prompt/cute+vibrant+colorful+2D+pixel+art+${encoded}+item+game+sprite+isolated+on+solid+black+background`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Sprite API returned ${res.status}`);
    const blob = await res.blob();
    const img = await blobToImage(blob);
    applyProcessedSpriteFromImage(img, weapon);
  } catch (err) {
    console.warn('[forge] Sprite service unavailable, using local fallback sprite.', err);
    applyLocalFallbackSprite(prompt, weapon);
  }
}

// ── Clear ──

export function clearProjectiles(state, scene) {
  for (const p of state.projectiles) scene.remove(p.mesh);
  state.projectiles.length = 0;
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

async function requestForgeStats(prompt) {
  const endpoints = ['/.netlify/functions/forge', '/netlify/functions/forge'];
  let lastErr;

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        lastErr = new Error(`Forge API ${endpoint} returned ${res.status}`);
        continue;
      }
      return await res.json();
    } catch (err) {
      lastErr = err;
    }
  }

  throw lastErr || new Error('Forge API request failed');
}

function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode sprite image blob'));
    };
    img.src = url;
  });
}

function applyProcessedSpriteFromImage(img, weapon) {
  const cvs = document.createElement('canvas');
  cvs.width = img.width;
  cvs.height = img.height;
  const ctx = cvs.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const id = ctx.getImageData(0, 0, cvs.width, cvs.height);
  const d = id.data;
  const w = cvs.width;
  const h = cvs.height;

  const visited = new Uint8Array(w * h);
  const bgColor = { r: d[0], g: d[1], b: d[2] };
  const tolerance = 50;
  const queue = [];

  const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
  for (const [cx, cy] of corners) {
    const ci = cy * w + cx;
    if (!visited[ci]) {
      queue.push(ci);
      visited[ci] = 1;
    }
  }

  while (queue.length > 0) {
    const idx = queue.shift();
    const pi = idx * 4;
    const dr = Math.abs(d[pi] - bgColor.r);
    const dg = Math.abs(d[pi + 1] - bgColor.g);
    const db = Math.abs(d[pi + 2] - bgColor.b);
    if (dr + dg + db < tolerance) {
      d[pi + 3] = 0;
      const x = idx % w;
      const y = (idx - x) / w;
      for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const ni = ny * w + nx;
          if (!visited[ni]) {
            visited[ni] = 1;
            queue.push(ni);
          }
        }
      }
    }
  }

  ctx.putImageData(id, 0, 0);

  const cvs2 = document.createElement('canvas');
  cvs2.width = w + 4;
  cvs2.height = h + 4;
  const ctx2 = cvs2.getContext('2d');
  ctx2.shadowColor = 'rgba(255,255,255,0.6)';
  ctx2.shadowBlur = 3;
  ctx2.drawImage(cvs, 2, 2);
  ctx2.shadowBlur = 0;
  ctx2.drawImage(cvs, 2, 2);

  const tex = new THREE.CanvasTexture(cvs2);
  tex.needsUpdate = true;
  weapon.spriteTex = tex;

  try {
    weapon.spriteDataUrl = cvs2.toDataURL('image/png');
  } catch {}
}

function applyLocalFallbackSprite(prompt, weapon) {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) hash = ((hash << 5) - hash + prompt.charCodeAt(i)) | 0;
  hash = Math.abs(hash);

  const hue = hash % 360;
  const cvs = document.createElement('canvas');
  cvs.width = 64;
  cvs.height = 64;
  const ctx = cvs.getContext('2d');

  ctx.clearRect(0, 0, 64, 64);
  ctx.fillStyle = `hsl(${hue} 80% 60%)`;
  ctx.beginPath();
  ctx.arc(32, 32, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.strokeStyle = `hsl(${(hue + 120) % 360} 80% 55%)`;
  ctx.beginPath();
  ctx.moveTo(18, 44);
  ctx.lineTo(46, 20);
  ctx.stroke();

  ctx.fillRect(27, 12, 10, 10);
  ctx.fillRect(40, 28, 8, 8);

  const tex = new THREE.CanvasTexture(cvs);
  tex.needsUpdate = true;
  weapon.spriteTex = tex;

  try {
    weapon.spriteDataUrl = cvs.toDataURL('image/png');
  } catch {}
}
