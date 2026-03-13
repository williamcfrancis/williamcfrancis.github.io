import * as THREE from 'three';

// ── Particle Pool ──

const POOL_SIZE = 150;
const poolGeo = new THREE.SphereGeometry(1, 4, 4);
let pool = [];
let activeParticles = [];

export function initParticlePool(scene) {
  for (let i = 0; i < POOL_SIZE; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(poolGeo, mat);
    mesh.visible = false;
    scene.add(mesh);
    pool.push(mesh);
  }
  _initSwPool(scene);
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
      life: 30 + Math.random() * 20,
    });
  }
}

export function updateParticles(dt60 = 1) {
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    p.mesh.position.addScaledVector(p.vel, dt60);
    p.vel.y -= 0.008 * dt60;
    p.life -= dt60;
    p.mesh.scale.multiplyScalar(Math.pow(0.96, dt60));
    if (p.life <= 0) {
      releaseParticle(p.mesh);
      activeParticles[i] = activeParticles[activeParticles.length - 1];
      activeParticles.pop();
    }
  }
}

// ── Two-Stage Death Effect ──

let deathAnims = [];

export function spawnDeathEffect(scene, pos, color, isBoss = false) {
  const count = isBoss ? 16 : 10;
  for (let i = 0; i < count; i++) {
    const mesh = grabParticle();
    if (!mesh) break;
    mesh.material.color.setHex(i < count * 0.6 ? color : 0xFFFFFF);
    const s = isBoss ? 0.12 + Math.random() * 0.15 : 0.08 + Math.random() * 0.1;
    mesh.scale.set(s, s, s);
    mesh.position.copy(pos);
    mesh.visible = true;
    const speed = isBoss ? 0.45 : 0.3;
    activeParticles.push({
      mesh,
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * speed,
        0.15 + Math.random() * 0.3,
        (Math.random() - 0.5) * speed,
      ),
      life: 35 + Math.random() * 25,
    });
  }
  spawnShockwave(scene, pos, isBoss ? 3.0 : 1.2);
}

// ── Shockwave Ring (pooled) ──

const SW_POOL_SIZE = 6;
const _swGeo = new THREE.RingGeometry(0.1, 0.3, 24);
let _swPool = [];
let shockwaves = [];

function _initSwPool(scene) {
  for (let i = 0; i < SW_POOL_SIZE; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.7, side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(_swGeo, mat);
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    scene.add(ring);
    _swPool.push(ring);
  }
}

export function spawnShockwave(scene, pos, maxRadius) {
  if (_swPool.length === 0 && shockwaves.length > 0) {
    const oldest = shockwaves.shift();
    oldest.mesh.visible = false;
    _swPool.push(oldest.mesh);
  }
  const ring = _swPool.length > 0 ? _swPool.pop() : null;
  if (!ring) return;
  ring.position.set(pos.x, 0.05, pos.z);
  ring.scale.set(1, 1, 1);
  ring.material.opacity = 0.7;
  ring.visible = true;
  shockwaves.push({ mesh: ring, life: 1.0, maxRadius });
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
      sw.mesh.visible = false;
      _swPool.push(sw.mesh);
      shockwaves[i] = shockwaves[shockwaves.length - 1];
      shockwaves.pop();
    }
  }
}

// ── Floating Damage Numbers (pooled) ──

const DMG_POOL_SIZE = 16;
let dmgContainer = null;
let _dmgPool = [];
let _dmgNextIdx = 0;
const _dmgScreenPos = new THREE.Vector3();

export function initDamageNumbers() {
  dmgContainer = document.getElementById('dmg-numbers');
  if (!dmgContainer) return;
  for (let i = 0; i < DMG_POOL_SIZE; i++) {
    const el = document.createElement('div');
    el.className = 'dmg-num';
    el.style.display = 'none';
    dmgContainer.appendChild(el);
    _dmgPool.push(el);
  }
}

export function spawnDamageNumber(pos, camera, damage, isCrit = false) {
  if (!dmgContainer || _dmgPool.length === 0) return;
  _dmgScreenPos.copy(pos).project(camera);
  const x = (_dmgScreenPos.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-_dmgScreenPos.y * 0.5 + 0.5) * window.innerHeight;

  const el = _dmgPool[_dmgNextIdx % DMG_POOL_SIZE];
  _dmgNextIdx++;
  el.className = 'dmg-num' + (isCrit ? ' crit' : '');
  el.textContent = damage;
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.display = '';
  el.classList.remove('float');
  requestAnimationFrame(() => el.classList.add('float'));
  setTimeout(() => { el.style.display = 'none'; }, 800);
}

// ── Projectile Trails ──

export function spawnTrail(pos, color) {
  const mesh = grabParticle();
  if (!mesh) return;
  mesh.material.color.setHex(color);
  const s = 0.05;
  mesh.scale.set(s, s, s);
  mesh.position.copy(pos);
  mesh.visible = true;
  activeParticles.push({ mesh, vel: new THREE.Vector3(0, 0, 0), life: 10 });
}

// ── Pollen / Firefly System ──

let pollenSprites = [];

export function createPollenSystem(scene) {
  const geo = new THREE.SphereGeometry(0.04, 3, 3);
  const pollenColors = [0xFFF9C4, 0xFFE0B2, 0xC8E6C9];
  for (let i = 0; i < 10; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: pollenColors[i % pollenColors.length], transparent: true, opacity: 0.6,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set((Math.random() - 0.5) * 28, 1 + Math.random() * 4, (Math.random() - 0.5) * 28);
    scene.add(m);
    pollenSprites.push({
      mesh: m, baseY: m.position.y, phase: Math.random() * Math.PI * 2,
      speedX: (Math.random() - 0.5) * 0.006, speedZ: (Math.random() - 0.5) * 0.006,
    });
  }
}

export function updatePollen(dt60 = 1) {
  for (const p of pollenSprites) {
    p.phase += 0.02 * dt60;
    p.mesh.position.y = p.baseY + Math.sin(p.phase) * 0.5;
    p.mesh.position.x += p.speedX * dt60;
    p.mesh.position.z += p.speedZ * dt60;
    if (Math.abs(p.mesh.position.x) > 20) p.speedX *= -1;
    if (Math.abs(p.mesh.position.z) > 20) p.speedZ *= -1;
  }
}

// ── Enemy HP Bars ──

const hpBarGeo = new THREE.PlaneGeometry(1, 0.08);
const _hpBarBgMat = new THREE.MeshBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });
const _hpBarGreenMat = new THREE.MeshBasicMaterial({ color: 0x4CAF50 });
const _hpBarOrangeMat = new THREE.MeshBasicMaterial({ color: 0xFFA726 });
const _hpBarRedMat = new THREE.MeshBasicMaterial({ color: 0xE53935 });

export function createEnemyHpBar(scene, enemy) {
  const bg = new THREE.Mesh(hpBarGeo, _hpBarBgMat);
  const fill = new THREE.Mesh(hpBarGeo, _hpBarGreenMat);
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

    if (pct > 0.5) bar.fill.material = _hpBarGreenMat;
    else if (pct > 0.25) bar.fill.material = _hpBarOrangeMat;
    else bar.fill.material = _hpBarRedMat;

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
  enemy._hpBar = null;
}

// ── Cleanup for game reset ──

export function clearAllVfx(scene) {
  for (const p of activeParticles) releaseParticle(p.mesh);
  activeParticles.length = 0;
  for (const sw of shockwaves) {
    sw.mesh.visible = false;
    _swPool.push(sw.mesh);
  }
  shockwaves.length = 0;
  if (dmgContainer) {
    for (const el of _dmgPool) el.style.display = 'none';
    _dmgNextIdx = 0;
  }
}
