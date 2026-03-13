import {
  Scene,
  Vector3,
  ParticleSystem,
  Texture,
  Color4,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';

function createCircleTexture(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const c = canvas.getContext('2d')!;
  const grad = c.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = grad;
  c.fillRect(0, 0, 32, 32);
  return canvas.toDataURL();
}

let cachedTexture: Texture | null = null;

function getCircleTexture(scene: Scene): Texture {
  if (!cachedTexture) {
    cachedTexture = new Texture(createCircleTexture(), scene);
  }
  return cachedTexture;
}

export function createMuzzleFlash(scene: Scene, position: Vector3, direction: Vector3, scale = 1): void {
  const ps = new ParticleSystem('muzzle', 15, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(4).add(new Vector3(-1, -1, -1));
  ps.direction2 = direction.scale(8).add(new Vector3(1, 1, 1));
  ps.minLifeTime = 0.02;
  ps.maxLifeTime = 0.06;
  ps.minSize = 0.1 * scale;
  ps.maxSize = 0.25 * scale;
  ps.emitRate = 300;
  ps.color1 = new Color4(1, 0.9, 0.5, 1);
  ps.color2 = new Color4(1, 0.6, 0.1, 1);
  ps.colorDead = new Color4(1, 0.3, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.gravity = new Vector3(0, -2, 0);
  ps.targetStopDuration = 0.04;
  ps.disposeOnStop = true;
  ps.start();
}

const MAX_DECALS = 30;
const _activeDecals: { mesh: Mesh; mat: StandardMaterial; timer: ReturnType<typeof setTimeout> }[] = [];

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const ps = new ParticleSystem('impact', 10, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  const reflected = normal.scale(2);
  ps.direction1 = reflected.add(new Vector3(-1, 0, -1));
  ps.direction2 = reflected.add(new Vector3(1, 2, 1));
  ps.minLifeTime = 0.08;
  ps.maxLifeTime = 0.2;
  ps.minSize = 0.02;
  ps.maxSize = 0.06;
  ps.emitRate = 200;
  ps.color1 = new Color4(1, 0.8, 0.3, 1);
  ps.color2 = new Color4(0.5, 0.5, 0.5, 1);
  ps.colorDead = new Color4(0.2, 0.2, 0.2, 0);
  ps.minEmitPower = 2;
  ps.maxEmitPower = 6;
  ps.gravity = new Vector3(0, -10, 0);
  ps.targetStopDuration = 0.04;
  ps.disposeOnStop = true;
  ps.start();

  // Evict oldest decal if at cap
  if (_activeDecals.length >= MAX_DECALS) {
    const old = _activeDecals.shift()!;
    clearTimeout(old.timer);
    old.mesh.dispose();
    old.mat.dispose();
  }

  const decal = MeshBuilder.CreateDisc('decal', { radius: 0.15, tessellation: 6 }, scene);
  decal.position = position.add(normal.scale(0.01));
  decal.lookAt(position.add(normal));
  const decalMat = new StandardMaterial('decalMat', scene);
  decalMat.diffuseColor = new Color3(0.05, 0.05, 0.05);
  decalMat.emissiveColor = new Color3(0.3, 0.15, 0);
  decalMat.alpha = 0.7;
  decalMat.freeze();
  decal.material = decalMat;
  decal.checkCollisions = false;
  decal.isPickable = false;

  const entry = { mesh: decal, mat: decalMat, timer: setTimeout(() => {
    decal.dispose();
    decalMat.dispose();
    const idx = _activeDecals.indexOf(entry);
    if (idx !== -1) _activeDecals.splice(idx, 1);
  }, 1500) };
  _activeDecals.push(entry);
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const ps = new ParticleSystem('blood', 12, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(-3).add(new Vector3(-2, 0, -2));
  ps.direction2 = direction.scale(-1).add(new Vector3(2, 3, 2));
  ps.minLifeTime = 0.1;
  ps.maxLifeTime = 0.25;
  ps.minSize = 0.04;
  ps.maxSize = 0.1;
  ps.emitRate = 250;
  ps.color1 = new Color4(1, 0.3, 0, 1);
  ps.color2 = new Color4(1, 0.1, 0.1, 1);
  ps.colorDead = new Color4(0.5, 0, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.gravity = new Vector3(0, -15, 0);
  ps.targetStopDuration = 0.03;
  ps.disposeOnStop = true;
  ps.start();
}

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  // Core flash
  const flash = MeshBuilder.CreateSphere('expFlash', { diameter: radius * 0.5, segments: 6 }, scene);
  flash.position = position.clone();
  flash.isPickable = false;
  const flashMat = new StandardMaterial('expFlashMat', scene);
  flashMat.emissiveColor = new Color3(1, 0.8, 0.2);
  flashMat.disableLighting = true;
  flash.material = flashMat;

  // Fireball particles (combined fire+smoke)
  const fire = new ParticleSystem('explosion', 40, scene);
  fire.particleTexture = getCircleTexture(scene);
  fire.emitter = position.clone();
  fire.createSphereEmitter(radius * 0.3);
  fire.minLifeTime = 0.15;
  fire.maxLifeTime = 0.5;
  fire.minSize = 0.4;
  fire.maxSize = 1.2;
  fire.emitRate = 300;
  fire.color1 = new Color4(1, 0.7, 0.1, 1);
  fire.color2 = new Color4(1, 0.3, 0, 1);
  fire.colorDead = new Color4(0.15, 0.08, 0, 0);
  fire.minEmitPower = 5;
  fire.maxEmitPower = 12;
  fire.gravity = new Vector3(0, 5, 0);
  fire.blendMode = ParticleSystem.BLENDMODE_ADD;
  fire.targetStopDuration = 0.08;
  fire.disposeOnStop = true;
  fire.start();

  // Sparks
  const sparks = new ParticleSystem('sparks', 25, scene);
  sparks.particleTexture = getCircleTexture(scene);
  sparks.emitter = position.clone();
  sparks.createSphereEmitter(0.5);
  sparks.minLifeTime = 0.2;
  sparks.maxLifeTime = 0.5;
  sparks.minSize = 0.03;
  sparks.maxSize = 0.06;
  sparks.emitRate = 350;
  sparks.color1 = new Color4(1, 1, 0.5, 1);
  sparks.color2 = new Color4(1, 0.6, 0.1, 1);
  sparks.colorDead = new Color4(1, 0.2, 0, 0);
  sparks.minEmitPower = 8;
  sparks.maxEmitPower = 20;
  sparks.gravity = new Vector3(0, -15, 0);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.targetStopDuration = 0.06;
  sparks.disposeOnStop = true;
  sparks.start();

  setTimeout(() => {
    flash.dispose();
    flashMat.dispose();
  }, 80);
}

let _tracerMat: StandardMaterial | null = null;
let _enemyTracerMat: StandardMaterial | null = null;

export function createTracer(scene: Scene, start: Vector3, end: Vector3, color = new Color3(0, 1, 0.8)): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const midpoint = start.add(dir.scale(0.5));

  const tracer = MeshBuilder.CreateCylinder('tracer', {
    height: dist,
    diameter: 0.03,
    tessellation: 3,
  }, scene);
  tracer.position = midpoint;
  tracer.lookAt(end);
  tracer.rotation.x += Math.PI / 2;
  tracer.isPickable = false;
  tracer.checkCollisions = false;

  if (!_tracerMat) {
    _tracerMat = new StandardMaterial('tracerMatShared', scene);
    _tracerMat.emissiveColor = color;
    _tracerMat.disableLighting = true;
    _tracerMat.alpha = 0.6;
    _tracerMat.freeze();
  }
  tracer.material = _tracerMat;

  setTimeout(() => { tracer.dispose(); }, 60);
}

export function createEnemyTracer(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const midpoint = start.add(dir.scale(0.5));

  const tracer = MeshBuilder.CreateCylinder('eTracer', {
    height: dist,
    diameter: 0.03,
    tessellation: 3,
  }, scene);
  tracer.position = midpoint;
  tracer.lookAt(end);
  tracer.rotation.x += Math.PI / 2;
  tracer.isPickable = false;
  tracer.checkCollisions = false;

  if (!_enemyTracerMat) {
    _enemyTracerMat = new StandardMaterial('eTracerMatShared', scene);
    _enemyTracerMat.emissiveColor = new Color3(1, 0.3, 0.1);
    _enemyTracerMat.disableLighting = true;
    _enemyTracerMat.alpha = 0.6;
    _enemyTracerMat.freeze();
  }
  tracer.material = _enemyTracerMat;

  setTimeout(() => { tracer.dispose(); }, 60);
}

export function createPickupGlow(scene: Scene, position: Vector3, color: Color3): ParticleSystem {
  const ps = new ParticleSystem('pickupGlow', 8, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.5;
  ps.maxLifeTime = 1.2;
  ps.minSize = 0.1;
  ps.maxSize = 0.25;
  ps.emitRate = 5;
  ps.color1 = new Color4(color.r, color.g, color.b, 0.6);
  ps.color2 = new Color4(color.r, color.g, color.b, 0.3);
  ps.colorDead = new Color4(color.r, color.g, color.b, 0);
  ps.minEmitPower = 0.5;
  ps.maxEmitPower = 1.5;
  ps.direction1 = new Vector3(-0.3, 1, -0.3);
  ps.direction2 = new Vector3(0.3, 2, 0.3);
  ps.gravity = new Vector3(0, -0.5, 0);
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.start();
  return ps;
}
