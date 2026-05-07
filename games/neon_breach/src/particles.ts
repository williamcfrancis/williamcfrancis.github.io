import {
  Scene,
  Vector3,
  Color3,
  Color4,
  ParticleSystem,
  GPUParticleSystem,
  IParticleSystem,
  Texture,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  Engine,
} from '@babylonjs/core';

let particleTextureUrl: string | null = null;
let cachedParticleTex: Texture | null = null;
let cachedParticleScene: Scene | null = null;

function getParticleTextureUrl(): string {
  if (particleTextureUrl) return particleTextureUrl;
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.3)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  particleTextureUrl = c.toDataURL();
  return particleTextureUrl;
}

function getParticleTexture(scene: Scene): Texture {
  if (cachedParticleTex && cachedParticleScene === scene) {
    return cachedParticleTex;
  }
  cachedParticleScene = scene;
  cachedParticleTex = new Texture(getParticleTextureUrl(), scene);
  return cachedParticleTex;
}

// ── ParticleSystem pool ──
// Each entry is a ring of ParticleSystems for a given effect kind. Acquiring
// rotates to the next slot, calls reset() to clear stragglers, then returns
// it for the caller to reconfigure (color/direction/etc) and start. This
// avoids the per-burst `new ParticleSystem` + GL buffer allocation that
// dominates muzzle/impact/blood frame cost.
type Ring = { slots: ParticleSystem[]; next: number };
const rings = new Map<string, Ring>();

function ring(scene: Scene, key: string, capacity: number, size: number): ParticleSystem {
  let r = rings.get(key);
  if (!r) {
    const slots: ParticleSystem[] = [];
    for (let i = 0; i < size; i++) {
      const ps = new ParticleSystem(`${key}_${i}`, capacity, scene);
      ps.particleTexture = getParticleTexture(scene);
      slots.push(ps);
    }
    r = { slots, next: 0 };
    rings.set(key, r);
  }
  const ps = r.slots[r.next];
  r.next = (r.next + 1) % r.slots.length;
  ps.reset();
  return ps;
}

export function createMuzzleFlash(scene: Scene, position: Vector3, direction: Vector3, scale: number): void {
  const ps = ring(scene, 'muzzle', 24, 6);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.03;
  ps.maxLifeTime = 0.08;
  ps.minSize = 0.15 * scale;
  ps.maxSize = 0.4 * scale;
  ps.emitRate = 500;
  ps.color1 = new Color4(0, 1, 0.9, 1);
  ps.color2 = new Color4(0.5, 0.2, 1, 0.8);
  ps.colorDead = new Color4(0, 0.3, 0.5, 0);
  ps.direction1 = direction.add(new Vector3(-0.3, -0.3, -0.3));
  ps.direction2 = direction.add(new Vector3(0.3, 0.3, 0.3));
  ps.minEmitPower = 2;
  ps.maxEmitPower = 5;
  ps.gravity = Vector3.Zero();
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = false;
  ps.start();
}

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const ps = ring(scene, 'impact', 20, 8);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.1;
  ps.maxLifeTime = 0.3;
  ps.minSize = 0.05;
  ps.maxSize = 0.15;
  ps.emitRate = 200;
  ps.color1 = new Color4(1, 0.6, 0.2, 1);
  ps.color2 = new Color4(0, 0.8, 1, 0.8);
  ps.colorDead = new Color4(0, 0, 0, 0);
  ps.direction1 = normal.add(new Vector3(-0.5, 0, -0.5));
  ps.direction2 = normal.add(new Vector3(0.5, 0.5, 0.5));
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.gravity = new Vector3(0, -15, 0);
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.08;
  ps.disposeOnStop = false;
  ps.start();
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const ps = ring(scene, 'blood', 28, 6);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.15;
  ps.maxLifeTime = 0.4;
  ps.minSize = 0.08;
  ps.maxSize = 0.2;
  ps.emitRate = 300;
  ps.color1 = new Color4(1, 0.1, 0.3, 1);
  ps.color2 = new Color4(0.8, 0, 0.6, 0.8);
  ps.colorDead = new Color4(0.3, 0, 0.1, 0);
  ps.direction1 = direction.scale(0.5).add(new Vector3(-0.5, 0, -0.5));
  ps.direction2 = direction.scale(0.5).add(new Vector3(0.5, 0.5, 0.5));
  ps.minEmitPower = 3;
  ps.maxEmitPower = 10;
  ps.gravity = new Vector3(0, -12, 0);
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.06;
  ps.disposeOnStop = false;
  ps.start();
}

export function createWallRunTrail(scene: Scene, position: Vector3): void {
  const ps = ring(scene, 'wrTrail', 12, 4);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.1;
  ps.maxLifeTime = 0.25;
  ps.minSize = 0.05;
  ps.maxSize = 0.15;
  ps.emitRate = 200;
  ps.color1 = new Color4(0, 1, 0.8, 0.6);
  ps.color2 = new Color4(0, 0.5, 1, 0.4);
  ps.colorDead = new Color4(0, 0, 0, 0);
  ps.direction1 = new Vector3(-0.3, -0.5, -0.3);
  ps.direction2 = new Vector3(0.3, 0, 0.3);
  ps.minEmitPower = 0.5;
  ps.maxEmitPower = 1.5;
  ps.gravity = Vector3.Zero();
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = false;
  ps.start();
}

// Big-burst effects — explosion + EMP — go on GPU when the engine supports
// transform feedback. CPU update for 130+ particles per blast was the
// dominant frame-spike on hits. Falls back to CPU ParticleSystem otherwise.
const supportsGPU = (scene: Scene): boolean => {
  try { return GPUParticleSystem.IsSupported && (scene.getEngine() as Engine).webGLVersion >= 2; }
  catch { return false; }
};

function makeGPUOrCPU(scene: Scene, name: string, capacity: number): IParticleSystem {
  if (supportsGPU(scene)) {
    const ps = new GPUParticleSystem(name, { capacity }, scene);
    ps.particleTexture = getParticleTexture(scene);
    return ps;
  }
  const ps = new ParticleSystem(name, capacity, scene);
  ps.particleTexture = getParticleTexture(scene);
  return ps;
}

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  const scale = radius / 6;

  const flash = makeGPUOrCPU(scene, 'expFlash', 32);
  flash.emitter = position.clone();
  flash.minLifeTime = 0.08;
  flash.maxLifeTime = 0.2;
  flash.minSize = 1 * scale;
  flash.maxSize = 3 * scale;
  flash.emitRate = 500;
  flash.color1 = new Color4(1, 0.8, 0.3, 1);
  flash.color2 = new Color4(1, 0.4, 0, 0.8);
  flash.colorDead = new Color4(0.5, 0.1, 0, 0);
  flash.minEmitPower = 0;
  flash.maxEmitPower = 2;
  flash.blendMode = ParticleSystem.BLENDMODE_ADD;
  flash.targetStopDuration = 0.1;
  flash.disposeOnStop = true;
  flash.start();

  const debris = makeGPUOrCPU(scene, 'expDebris', 64) as ParticleSystem;
  debris.emitter = position.clone();
  debris.minLifeTime = 0.3;
  debris.maxLifeTime = 0.8;
  debris.minSize = 0.1 * scale;
  debris.maxSize = 0.5 * scale;
  debris.emitRate = 500;
  debris.color1 = new Color4(1, 0.5, 0, 1);
  debris.color2 = new Color4(0.8, 0.2, 0, 0.6);
  debris.colorDead = new Color4(0.2, 0.05, 0, 0);
  debris.direction1 = new Vector3(-1, -0.5, -1).scale(scale);
  debris.direction2 = new Vector3(1, 2, 1).scale(scale);
  debris.minEmitPower = 5 * scale;
  debris.maxEmitPower = 15 * scale;
  debris.gravity = new Vector3(0, -15, 0);
  debris.blendMode = ParticleSystem.BLENDMODE_ADD;
  debris.targetStopDuration = 0.15;
  debris.disposeOnStop = true;
  debris.start();

  // Smoke stays on CPU — it's small (<= 20 particles) and uses a different
  // blend mode that works the same on both paths anyway.
  const smoke = new ParticleSystem('expSmoke', 20, scene);
  smoke.particleTexture = getParticleTexture(scene);
  smoke.emitter = position.clone();
  smoke.minLifeTime = 0.5;
  smoke.maxLifeTime = 1.2;
  smoke.minSize = 1 * scale;
  smoke.maxSize = 3 * scale;
  smoke.emitRate = 100;
  smoke.color1 = new Color4(0.3, 0.15, 0, 0.4);
  smoke.color2 = new Color4(0.2, 0.1, 0.05, 0.3);
  smoke.colorDead = new Color4(0.1, 0.05, 0, 0);
  smoke.direction1 = new Vector3(-1, 0, -1);
  smoke.direction2 = new Vector3(1, 3, 1);
  smoke.minEmitPower = 2;
  smoke.maxEmitPower = 6;
  smoke.gravity = new Vector3(0, 2, 0);
  smoke.blendMode = ParticleSystem.BLENDMODE_STANDARD;
  smoke.targetStopDuration = 0.2;
  smoke.disposeOnStop = true;
  smoke.start();
}

export function createEMPBlast(scene: Scene, position: Vector3, radius: number): void {
  const ps = makeGPUOrCPU(scene, 'emp', 96) as ParticleSystem;
  ps.emitter = position.clone();
  ps.minLifeTime = 0.2;
  ps.maxLifeTime = 0.5;
  ps.minSize = 0.3;
  ps.maxSize = 1;
  ps.emitRate = 500;
  ps.color1 = new Color4(0, 0.5, 1, 0.8);
  ps.color2 = new Color4(0.5, 0, 1, 0.6);
  ps.colorDead = new Color4(0, 0, 0.2, 0);
  ps.direction1 = new Vector3(-1, -0.5, -1).scale(radius / 3);
  ps.direction2 = new Vector3(1, 1, 1).scale(radius / 3);
  ps.minEmitPower = 5;
  ps.maxEmitPower = 15;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.15;
  ps.disposeOnStop = true;
  ps.start();
}

// ── Tracer pool ──
// Box meshes get pooled instead of created/disposed per shot. Each tracer is
// a thin emissive box that fades over its lifetime via a single onBeforeRender
// observer; positions are written each frame for the active set.
type Tracer = { mesh: Mesh; mat: StandardMaterial; life: number; lifeMax: number; available: boolean };
let playerTracers: Tracer[] | null = null;
let enemyTracers: Tracer[] | null = null;
let tracerObserver = false;

function ensureTracerPools(scene: Scene): void {
  if (playerTracers && enemyTracers) return;
  playerTracers = makeTracerPool(scene, 24, 0.03, new Color3(0, 1, 0.8));
  enemyTracers = makeTracerPool(scene, 24, 0.025, new Color3(1, 0.2, 0.4));
  if (!tracerObserver) {
    scene.onBeforeRenderObservable.add(() => {
      const dt = scene.getEngine().getDeltaTime() / 1000;
      stepTracers(playerTracers!, dt);
      stepTracers(enemyTracers!, dt);
    });
    tracerObserver = true;
  }
}

function makeTracerPool(scene: Scene, size: number, thickness: number, color: Color3): Tracer[] {
  const out: Tracer[] = [];
  for (let i = 0; i < size; i++) {
    const mesh = MeshBuilder.CreateBox(`tracer_${color.r.toFixed(1)}_${i}`, { width: thickness, height: thickness, depth: 1 }, scene);
    mesh.isPickable = false;
    mesh.setEnabled(false);
    const mat = new StandardMaterial(`tracerMat_${i}`, scene);
    mat.emissiveColor = color;
    mat.disableLighting = true;
    mat.alpha = 0;
    mesh.material = mat;
    out.push({ mesh, mat, life: 0, lifeMax: 1, available: true });
  }
  return out;
}

function stepTracers(pool: Tracer[], dt: number): void {
  for (const t of pool) {
    if (t.available) continue;
    t.life -= dt;
    if (t.life <= 0) {
      t.mesh.setEnabled(false);
      t.mat.alpha = 0;
      t.available = true;
    } else {
      t.mat.alpha = (t.life / t.lifeMax) * 0.6;
    }
  }
}

function spawnTracer(pool: Tracer[], start: Vector3, end: Vector3, lifeMax: number, alpha: number): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  if (dist < 0.1) return;

  // First available slot, else clobber the oldest.
  let t = pool.find(x => x.available);
  if (!t) {
    t = pool.reduce((a, b) => a.life < b.life ? a : b);
  }
  t.available = false;
  t.life = lifeMax;
  t.lifeMax = lifeMax;
  t.mat.alpha = alpha;

  // Reuse: scale Z to match desired length, position at midpoint, lookAt end.
  t.mesh.scaling.z = dist;
  t.mesh.position.copyFrom(start.add(dir.scale(0.5)));
  t.mesh.lookAt(end);
  t.mesh.setEnabled(true);
}

export function createTracer(scene: Scene, start: Vector3, end: Vector3): void {
  ensureTracerPools(scene);
  spawnTracer(playerTracers!, start, end, 0.08, 0.6);
}

export function createEnemyTracer(scene: Scene, start: Vector3, end: Vector3): void {
  ensureTracerPools(scene);
  const dir = end.subtract(start);
  const len = Math.min(dir.length(), 100);
  const adjustedEnd = len < 100 ? end : start.add(dir.normalize().scale(100));
  spawnTracer(enemyTracers!, start, adjustedEnd, 0.1, 0.5);
}

export function createPickupGlow(scene: Scene, position: Vector3, color: Color3): void {
  const ps = new ParticleSystem('pickupGlow', 15, scene);
  ps.particleTexture = getParticleTexture(scene);
  ps.emitter = position;
  ps.minLifeTime = 0.5;
  ps.maxLifeTime = 1;
  ps.minSize = 0.05;
  ps.maxSize = 0.15;
  ps.emitRate = 10;
  ps.color1 = new Color4(color.r, color.g, color.b, 0.6);
  ps.color2 = new Color4(color.r * 0.5, color.g * 0.5, color.b * 0.5, 0.4);
  ps.colorDead = new Color4(0, 0, 0, 0);
  ps.direction1 = new Vector3(-0.2, 0.3, -0.2);
  ps.direction2 = new Vector3(0.2, 0.8, 0.2);
  ps.minEmitPower = 0.5;
  ps.maxEmitPower = 1;
  ps.gravity = new Vector3(0, -0.5, 0);
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.start();
}

// ── Pooled grapple beam ──
// Single persistent mesh shown/hidden when the grapple toggles, repositioned
// each frame the player is grappling. Avoids the dispose-and-rebuild churn
// the old code did every render tick.
let grappleBeamMesh: Mesh | null = null;
let grappleBeamMat: StandardMaterial | null = null;

export function setGrappleBeam(scene: Scene, start: Vector3, end: Vector3): Mesh {
  if (!grappleBeamMesh) {
    grappleBeamMesh = MeshBuilder.CreateBox('grappleBeam', { width: 0.04, height: 0.04, depth: 1 }, scene);
    grappleBeamMesh.isPickable = false;
    grappleBeamMat = new StandardMaterial('grappleBeamMat', scene);
    grappleBeamMat.emissiveColor = new Color3(0, 1, 0.8);
    grappleBeamMat.disableLighting = true;
    grappleBeamMat.alpha = 0.8;
    grappleBeamMesh.material = grappleBeamMat;
  }
  const dir = end.subtract(start);
  const dist = dir.length();
  grappleBeamMesh.scaling.z = dist;
  grappleBeamMesh.position.copyFrom(start.add(dir.scale(0.5)));
  grappleBeamMesh.lookAt(end);
  grappleBeamMesh.setEnabled(true);
  return grappleBeamMesh;
}

export function hideGrappleBeam(): void {
  if (grappleBeamMesh) grappleBeamMesh.setEnabled(false);
}

// Legacy export name used in older callsites; alias to setGrappleBeam.
export function createGrappleBeam(scene: Scene, start: Vector3, end: Vector3): Mesh {
  return setGrappleBeam(scene, start, end);
}

// ── Pooled beam effect ──
// Used by the VOLT SNIPER charged beam. Pooled because it can chain in rapid
// succession via the alt-fire cooldown mechanic.
type BeamSlot = { core: Mesh; coreMat: StandardMaterial; glow: Mesh; glowMat: StandardMaterial; life: number };
let beamPool: BeamSlot[] | null = null;
let beamObserver = false;

function ensureBeamPool(scene: Scene): void {
  if (beamPool) return;
  beamPool = [];
  for (let i = 0; i < 4; i++) {
    const core = MeshBuilder.CreateBox(`beamFX_${i}`, { width: 0.15, height: 0.15, depth: 1 }, scene);
    core.isPickable = false;
    core.setEnabled(false);
    const coreMat = new StandardMaterial(`beamMat_${i}`, scene);
    coreMat.emissiveColor = new Color3(0.5, 0, 1);
    coreMat.disableLighting = true;
    coreMat.alpha = 0;
    core.material = coreMat;

    const glow = MeshBuilder.CreateBox(`beamGlow_${i}`, { width: 0.4, height: 0.4, depth: 1 }, scene);
    glow.isPickable = false;
    glow.setEnabled(false);
    const glowMat = new StandardMaterial(`beamGlowMat_${i}`, scene);
    glowMat.emissiveColor = new Color3(0.3, 0, 0.8);
    glowMat.disableLighting = true;
    glowMat.alpha = 0;
    glow.material = glowMat;

    beamPool.push({ core, coreMat, glow, glowMat, life: 0 });
  }
  if (!beamObserver) {
    scene.onBeforeRenderObservable.add(() => {
      const dt = scene.getEngine().getDeltaTime() / 1000;
      for (const b of beamPool!) {
        if (b.life <= 0) continue;
        b.life -= dt;
        const t = Math.max(0, b.life / 0.2);
        b.coreMat.alpha = t * 0.9;
        b.glowMat.alpha = t * 0.3;
        if (b.life <= 0) {
          b.core.setEnabled(false);
          b.glow.setEnabled(false);
        }
      }
    });
    beamObserver = true;
  }
}

export function createBeamEffect(scene: Scene, start: Vector3, end: Vector3): void {
  ensureBeamPool(scene);
  const dir = end.subtract(start);
  const dist = dir.length();
  const mid = start.add(dir.scale(0.5));

  let slot = beamPool!.find(b => b.life <= 0);
  if (!slot) slot = beamPool!.reduce((a, b) => a.life < b.life ? a : b);
  slot.life = 0.2;
  slot.core.scaling.z = dist;
  slot.glow.scaling.z = dist;
  slot.core.position.copyFrom(mid);
  slot.glow.position.copyFrom(mid);
  slot.core.lookAt(end);
  slot.glow.lookAt(end);
  slot.core.setEnabled(true);
  slot.glow.setEnabled(true);
  slot.coreMat.alpha = 0.9;
  slot.glowMat.alpha = 0.3;
}
