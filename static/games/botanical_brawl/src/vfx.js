import * as THREE from 'three';

// ── Particle Pool ──

const POOL_SIZE = 300;
const poolGeo = new THREE.SphereGeometry(1, 5, 5);
let pool = [];
let activeParticles = [];

export function initParticlePool(scene) {
  for (let i = 0; i < POOL_SIZE; i++) {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.3,
      emissive: 0xffffff, emissiveIntensity: 0.15,
    });
    const mesh = new THREE.Mesh(poolGeo, mat);
    mesh.visible = false;
    scene.add(mesh);
    pool.push(mesh);
  }
}

function grabParticle() {
  if (pool.length > 0) return pool.pop();
  if (activeParticles.length > 0) {
    const oldest = activeParticles.shift();
    oldest.mesh.visible = false;
    return oldest.mesh;
  }
  return null;
}

function releaseParticle(mesh) {
  mesh.visible = false;
  pool.push(mesh);
}

export function spawnBurst(pos, color, count = 8) {
  for (let i = 0; i < count; i++) {
    const mesh = grabParticle();
    if (!mesh) return;
    mesh.material.color.setHex(color);
    mesh.material.emissive.setHex(color);
    mesh.material.emissiveIntensity = 0.2;
    const s = 0.07 + Math.random() * 0.09;
    mesh.scale.set(s, s, s);
    mesh.position.copy(pos);
    mesh.visible = true;
    activeParticles.push({
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        0.1 + Math.random() * 0.22,
        (Math.random() - 0.5) * 0.3,
      ),
      life: 40 + Math.random() * 30,
      maxLife: 40 + Math.random() * 30,
    });
  }
}

export function updateParticles(dt60 = 1) {
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.mesh.position.addScaledVector(p.vel, dt60);
    p.vel.y -= 0.008 * dt60;
    p.life -= dt60;
    const decay = Math.pow(0.96, dt60);
    p.mesh.scale.multiplyScalar(decay);
    if (p.maxLife) {
      p.mesh.material.emissiveIntensity = 0.2 * (p.life / p.maxLife);
    }
    if (p.life <= 0) {
      releaseParticle(p.mesh);
      activeParticles.splice(i, 1);
    }
  }
}

// ── Two-Stage Death Effect ──

let deathAnims = [];

export function spawnDeathEffect(scene, pos, color, isBoss = false) {
  const count = isBoss ? 30 : 18;
  for (let i = 0; i < count; i++) {
    const mesh = grabParticle();
    if (!mesh) break;
    const particleColor = i < count * 0.6 ? color : 0xFFFFFF;
    mesh.material.color.setHex(particleColor);
    mesh.material.emissive.setHex(particleColor);
    mesh.material.emissiveIntensity = 0.3;
    const s = isBoss ? 0.12 + Math.random() * 0.18 : 0.08 + Math.random() * 0.12;
    mesh.scale.set(s, s, s);
    mesh.position.copy(pos);
    mesh.visible = true;
    const speed = isBoss ? 0.5 : 0.35;
    const life = 50 + Math.random() * 35;
    activeParticles.push({
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * speed,
        0.15 + Math.random() * 0.35,
        (Math.random() - 0.5) * speed,
      ),
      life,
      maxLife: life,
    });
  }
  spawnShockwave(scene, pos, isBoss ? 3.5 : 1.4);
}

// ── Shockwave Ring ──

let shockwaves = [];

export function spawnShockwave(scene, pos, maxRadius) {
  const geo = new THREE.RingGeometry(0.1, 0.3, 24);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff, transparent: true, opacity: 0.7, side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(geo, mat);
  ring.position.set(pos.x, 0.05, pos.z);
  ring.rotation.x = -Math.PI / 2;
  scene.add(ring);
  shockwaves.push({ mesh: ring, scene, life: 1.0, maxRadius });
}

export function updateShockwaves(dt60 = 1) {
  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i];
    sw.life -= 0.04 * dt60;
    const t = 1 - sw.life;
    const r = t * sw.maxRadius;
    sw.mesh.scale.set(r, r, 1);
    sw.mesh.material.opacity = sw.life * 0.7;
    if (sw.life <= 0) {
      sw.scene.remove(sw.mesh);
      sw.mesh.geometry.dispose();
      sw.mesh.material.dispose();
      shockwaves.splice(i, 1);
    }
  }
}

// ── Floating Damage Numbers ──

let dmgContainer = null;

export function initDamageNumbers() {
  dmgContainer = document.getElementById('dmg-numbers');
}

export function spawnDamageNumber(pos, camera, damage, isCrit = false) {
  if (!dmgContainer) return;
  const screenPos = pos.clone();
  screenPos.project(camera);
  const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

  const el = document.createElement('div');
  el.className = 'dmg-num' + (isCrit ? ' crit' : '');
  el.textContent = damage;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  dmgContainer.appendChild(el);
  requestAnimationFrame(() => el.classList.add('float'));
  setTimeout(() => el.remove(), 800);
}

// ── Projectile Trails ──

export function spawnTrail(pos, color) {
  const mesh = grabParticle();
  if (!mesh) return;
  mesh.material.color.setHex(color);
  mesh.material.emissive.setHex(color);
  mesh.material.emissiveIntensity = 0.35;
  const s = 0.06;
  mesh.scale.set(s, s, s);
  mesh.position.copy(pos);
  mesh.visible = true;
  activeParticles.push({ mesh, vel: new THREE.Vector3(0, 0, 0), life: 12, maxLife: 12 });
}

// ── Pollen / Firefly System ──

let pollenSprites = [];

export function createPollenSystem(scene) {
  const sizes = [0.03, 0.04, 0.05, 0.06];
  const colors = [
    { color: 0xFFF9C4, emissive: 0xFFF176 },
    { color: 0xFFE0B2, emissive: 0xFFCC80 },
    { color: 0xC8E6C9, emissive: 0xA5D6A7 },
    { color: 0xB3E5FC, emissive: 0x81D4FA },
  ];
  for (let i = 0; i < 28; i++) {
    const sizeIdx = Math.floor(Math.random() * sizes.length);
    const colIdx = Math.floor(Math.random() * colors.length);
    const geo = new THREE.SphereGeometry(sizes[sizeIdx], 5, 5);
    const mat = new THREE.MeshStandardMaterial({
      color: colors[colIdx].color,
      emissive: colors[colIdx].emissive,
      emissiveIntensity: 0.5 + Math.random() * 0.3,
      transparent: true,
      opacity: 0.65,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(
      (Math.random() - 0.5) * 32,
      0.8 + Math.random() * 5,
      (Math.random() - 0.5) * 32,
    );
    scene.add(m);
    pollenSprites.push({
      mesh: m,
      baseY: m.position.y,
      phase: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.007,
      speedZ: (Math.random() - 0.5) * 0.007,
      pulseSpeed: 0.8 + Math.random() * 0.8,
    });
  }
}

export function updatePollen(dt60 = 1) {
  for (const p of pollenSprites) {
    p.phase += 0.02 * dt60;
    p.mesh.position.y = p.baseY + Math.sin(p.phase) * 0.55;
    p.mesh.position.x += p.speedX * dt60;
    p.mesh.position.z += p.speedZ * dt60;
    p.mesh.material.opacity = 0.35 + Math.sin(p.phase * p.pulseSpeed) * 0.3;
    p.mesh.material.emissiveIntensity = 0.4 + Math.sin(p.phase * p.pulseSpeed) * 0.25;
    if (Math.abs(p.mesh.position.x) > 22) p.speedX *= -1;
    if (Math.abs(p.mesh.position.z) > 22) p.speedZ *= -1;
  }
}

// ── Enemy HP Bars ──

const hpBarGeo = new THREE.PlaneGeometry(1, 0.08);

export function createEnemyHpBar(scene, enemy) {
  const bgMat = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });
  const bg = new THREE.Mesh(hpBarGeo, bgMat);
  const fillMat = new THREE.MeshBasicMaterial({ color: 0x4CAF50 });
  const fill = new THREE.Mesh(hpBarGeo, fillMat);
  fill.position.z = 0.001;

  const group = new THREE.Group();
  group.add(bg);
  group.add(fill);
  group.visible = false;
  scene.add(group);
  enemy._hpBar = { group, fill, bg };
}

export function updateEnemyHpBars(enemies, camera) {
  for (const e of enemies) {
    if (!e._hpBar) continue;
    const bar = e._hpBar;
    const damaged = e.hp < e.maxHp;
    bar.group.visible = damaged;
    if (!damaged) continue;

    const pct = Math.max(0, e.hp / e.maxHp);
    bar.fill.scale.x = pct;
    bar.fill.position.x = (pct - 1) * 0.5;

    if (pct > 0.5) bar.fill.material.color.setHex(0x4CAF50);
    else if (pct > 0.25) bar.fill.material.color.setHex(0xFFA726);
    else bar.fill.material.color.setHex(0xE53935);

    const barWidth = e.radius * 2;
    bar.group.scale.set(barWidth, barWidth, 1);
    bar.group.position.set(
      e.mesh.position.x,
      e.mesh.position.y + e.radius + 0.4,
      e.mesh.position.z,
    );
    bar.group.lookAt(camera.position);
  }
}

export function removeEnemyHpBar(scene, enemy) {
  if (!enemy._hpBar) return;
  scene.remove(enemy._hpBar.group);
  enemy._hpBar.bg.material.dispose();
  enemy._hpBar.fill.material.dispose();
  enemy._hpBar = null;
}

// ── Cleanup for game reset ──

export function clearAllVfx(scene) {
  for (const p of activeParticles) releaseParticle(p.mesh);
  activeParticles.length = 0;
  for (const sw of shockwaves) {
    sw.scene.remove(sw.mesh);
    sw.mesh.geometry.dispose();
    sw.mesh.material.dispose();
  }
  shockwaves.length = 0;
  if (dmgContainer) dmgContainer.innerHTML = '';
}
