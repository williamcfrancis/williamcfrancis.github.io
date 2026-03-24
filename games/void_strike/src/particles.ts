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
  grad.addColorStop(0.6, 'rgba(255,255,255,0.3)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = grad;
  c.fillRect(0, 0, 32, 32);
  return canvas.toDataURL();
}

function createSparkTexture(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const c = canvas.getContext('2d')!;
  const grad = c.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.2, 'rgba(255,255,200,0.9)');
  grad.addColorStop(0.5, 'rgba(255,200,100,0.4)');
  grad.addColorStop(1, 'rgba(255,100,0,0)');
  c.fillStyle = grad;
  c.fillRect(0, 0, 16, 16);
  return canvas.toDataURL();
}

let cachedTexture: Texture | null = null;
let cachedSparkTexture: Texture | null = null;

function getCircleTexture(scene: Scene): Texture {
  if (!cachedTexture) {
    cachedTexture = new Texture(createCircleTexture(), scene);
  }
  return cachedTexture;
}

function getSparkTexture(scene: Scene): Texture {
  if (!cachedSparkTexture) {
    cachedSparkTexture = new Texture(createSparkTexture(), scene);
  }
  return cachedSparkTexture;
}

export function createMuzzleFlash(scene: Scene, position: Vector3, direction: Vector3, scale = 1): void {
  const ps = new ParticleSystem('muzzle', 12, scene);
  ps.particleTexture = getSparkTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(6).add(new Vector3(-1.5, -1.5, -1.5));
  ps.direction2 = direction.scale(12).add(new Vector3(1.5, 1.5, 1.5));
  ps.minLifeTime = 0.02;
  ps.maxLifeTime = 0.06;
  ps.minSize = 0.06 * scale;
  ps.maxSize = 0.22 * scale;
  ps.emitRate = 350;
  ps.color1 = new Color4(1, 0.95, 0.7, 1);
  ps.color2 = new Color4(1, 0.65, 0.15, 1);
  ps.colorDead = new Color4(1, 0.3, 0, 0);
  ps.minEmitPower = 4;
  ps.maxEmitPower = 10;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.04;
  ps.disposeOnStop = true;
  ps.start();

  const flash = new ParticleSystem('muzzleCore', 4, scene);
  flash.particleTexture = getCircleTexture(scene);
  flash.emitter = position.clone();
  flash.direction1 = direction.scale(2);
  flash.direction2 = direction.scale(4);
  flash.minLifeTime = 0.01;
  flash.maxLifeTime = 0.03;
  flash.minSize = 0.15 * scale;
  flash.maxSize = 0.35 * scale;
  flash.emitRate = 200;
  flash.color1 = new Color4(1, 1, 1, 1);
  flash.color2 = new Color4(1, 0.9, 0.6, 1);
  flash.colorDead = new Color4(1, 0.5, 0, 0);
  flash.minEmitPower = 1;
  flash.maxEmitPower = 3;
  flash.blendMode = ParticleSystem.BLENDMODE_ADD;
  flash.targetStopDuration = 0.02;
  flash.disposeOnStop = true;
  flash.start();
}

const MAX_DECALS = 30;
const _activeDecals: { mesh: Mesh; timer: ReturnType<typeof setTimeout> }[] = [];
let _decalMat: StandardMaterial | null = null;

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const sparks = new ParticleSystem('impact', 10, scene);
  sparks.particleTexture = getSparkTexture(scene);
  sparks.emitter = position.clone();
  const reflected = normal.scale(3);
  sparks.direction1 = reflected.add(new Vector3(-1.5, 0, -1.5));
  sparks.direction2 = reflected.add(new Vector3(1.5, 3, 1.5));
  sparks.minLifeTime = 0.05;
  sparks.maxLifeTime = 0.2;
  sparks.minSize = 0.015;
  sparks.maxSize = 0.06;
  sparks.emitRate = 200;
  sparks.color1 = new Color4(1, 0.9, 0.5, 1);
  sparks.color2 = new Color4(1, 0.5, 0.2, 1);
  sparks.colorDead = new Color4(0.3, 0.15, 0, 0);
  sparks.minEmitPower = 3;
  sparks.maxEmitPower = 7;
  sparks.gravity = new Vector3(0, -15, 0);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.targetStopDuration = 0.04;
  sparks.disposeOnStop = true;
  sparks.start();

  const debris = new ParticleSystem('debris', 5, scene);
  debris.particleTexture = getCircleTexture(scene);
  debris.emitter = position.clone();
  debris.direction1 = reflected.add(new Vector3(-2, 0.5, -2));
  debris.direction2 = reflected.add(new Vector3(2, 2, 2));
  debris.minLifeTime = 0.1;
  debris.maxLifeTime = 0.3;
  debris.minSize = 0.02;
  debris.maxSize = 0.04;
  debris.emitRate = 100;
  debris.color1 = new Color4(0.5, 0.5, 0.5, 0.8);
  debris.color2 = new Color4(0.3, 0.3, 0.3, 0.6);
  debris.colorDead = new Color4(0.2, 0.2, 0.2, 0);
  debris.minEmitPower = 2;
  debris.maxEmitPower = 5;
  debris.gravity = new Vector3(0, -20, 0);
  debris.targetStopDuration = 0.04;
  debris.disposeOnStop = true;
  debris.start();

  if (_activeDecals.length >= MAX_DECALS) {
    const old = _activeDecals.shift()!;
    clearTimeout(old.timer);
    old.mesh.dispose();
  }

  if (!_decalMat) {
    _decalMat = new StandardMaterial('decalMat', scene);
    _decalMat.diffuseColor = new Color3(0.06, 0.06, 0.06);
    _decalMat.emissiveColor = new Color3(0.02, 0.01, 0);
    _decalMat.specularColor = Color3.Black();
    _decalMat.alpha = 0.7;
    _decalMat.freeze();
  }

  const decal = MeshBuilder.CreateDisc('decal', { radius: 0.14, tessellation: 5 }, scene);
  decal.position = position.add(normal.scale(0.01));
  decal.lookAt(position.add(normal));
  decal.material = _decalMat;
  decal.checkCollisions = false;
  decal.isPickable = false;

  const entry = { mesh: decal, timer: setTimeout(() => {
    decal.dispose();
    const idx = _activeDecals.indexOf(entry);
    if (idx !== -1) _activeDecals.splice(idx, 1);
  }, 3000) };
  _activeDecals.push(entry);
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const sparks = new ParticleSystem('blood', 12, scene);
  sparks.particleTexture = getCircleTexture(scene);
  sparks.emitter = position.clone();
  sparks.direction1 = direction.scale(-4).add(new Vector3(-2.5, 0, -2.5));
  sparks.direction2 = direction.scale(-1).add(new Vector3(2.5, 4, 2.5));
  sparks.minLifeTime = 0.08;
  sparks.maxLifeTime = 0.25;
  sparks.minSize = 0.03;
  sparks.maxSize = 0.1;
  sparks.emitRate = 300;
  sparks.color1 = new Color4(1, 0.5, 0.1, 1);
  sparks.color2 = new Color4(0.8, 0.2, 0.6, 1);
  sparks.colorDead = new Color4(0.3, 0.05, 0.1, 0);
  sparks.minEmitPower = 4;
  sparks.maxEmitPower = 8;
  sparks.gravity = new Vector3(0, -18, 0);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.targetStopDuration = 0.04;
  sparks.disposeOnStop = true;
  sparks.start();
}

let _flashMat: StandardMaterial | null = null;

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  if (!_flashMat) {
    _flashMat = new StandardMaterial('expFlashMat', scene);
    _flashMat.emissiveColor = new Color3(1, 0.85, 0.3);
    _flashMat.disableLighting = true;
    _flashMat.freeze();
  }

  const flash = MeshBuilder.CreateSphere('expFlash', { diameter: radius * 0.4, segments: 6 }, scene);
  flash.position = position.clone();
  flash.isPickable = false;
  flash.material = _flashMat;

  const fireball = new ParticleSystem('explosion', 35, scene);
  fireball.particleTexture = getCircleTexture(scene);
  fireball.emitter = position.clone();
  fireball.createSphereEmitter(radius * 0.3);
  fireball.minLifeTime = 0.1;
  fireball.maxLifeTime = 0.4;
  fireball.minSize = 0.3;
  fireball.maxSize = 1.2;
  fireball.emitRate = 300;
  fireball.color1 = new Color4(1, 0.8, 0.2, 1);
  fireball.color2 = new Color4(1, 0.35, 0.05, 1);
  fireball.colorDead = new Color4(0.15, 0.05, 0, 0);
  fireball.minEmitPower = 5;
  fireball.maxEmitPower = 12;
  fireball.gravity = new Vector3(0, 5, 0);
  fireball.blendMode = ParticleSystem.BLENDMODE_ADD;
  fireball.targetStopDuration = 0.08;
  fireball.disposeOnStop = true;
  fireball.start();

  const smoke = new ParticleSystem('expSmoke', 15, scene);
  smoke.particleTexture = getCircleTexture(scene);
  smoke.emitter = position.clone();
  smoke.createSphereEmitter(radius * 0.2);
  smoke.minLifeTime = 0.3;
  smoke.maxLifeTime = 0.8;
  smoke.minSize = 0.5;
  smoke.maxSize = 1.5;
  smoke.emitRate = 100;
  smoke.color1 = new Color4(0.3, 0.25, 0.2, 0.4);
  smoke.color2 = new Color4(0.15, 0.12, 0.1, 0.3);
  smoke.colorDead = new Color4(0.05, 0.05, 0.05, 0);
  smoke.minEmitPower = 2;
  smoke.maxEmitPower = 6;
  smoke.gravity = new Vector3(0, 4, 0);
  smoke.targetStopDuration = 0.1;
  smoke.disposeOnStop = true;
  smoke.start();

  const sparks = new ParticleSystem('expSparks', 20, scene);
  sparks.particleTexture = getSparkTexture(scene);
  sparks.emitter = position.clone();
  sparks.createSphereEmitter(radius * 0.1);
  sparks.minLifeTime = 0.15;
  sparks.maxLifeTime = 0.5;
  sparks.minSize = 0.02;
  sparks.maxSize = 0.08;
  sparks.emitRate = 200;
  sparks.color1 = new Color4(1, 1, 0.6, 1);
  sparks.color2 = new Color4(1, 0.5, 0.1, 1);
  sparks.colorDead = new Color4(0.5, 0.2, 0, 0);
  sparks.minEmitPower = 8;
  sparks.maxEmitPower = 20;
  sparks.gravity = new Vector3(0, -12, 0);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.targetStopDuration = 0.06;
  sparks.disposeOnStop = true;
  sparks.start();

  setTimeout(() => { flash.dispose(); }, 80);
}

let _tracerMat: StandardMaterial | null = null;
let _enemyTracerMat: StandardMaterial | null = null;

export function createTracer(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const midpoint = start.add(dir.scale(0.5));

  const tracer = MeshBuilder.CreateCylinder('tracer', {
    height: dist,
    diameter: 0.025,
    tessellation: 3,
  }, scene);
  tracer.position = midpoint;
  tracer.lookAt(end);
  tracer.rotation.x += Math.PI / 2;
  tracer.isPickable = false;
  tracer.checkCollisions = false;

  if (!_tracerMat) {
    _tracerMat = new StandardMaterial('tracerMat', scene);
    _tracerMat.emissiveColor = new Color3(0.7, 1, 0.7);
    _tracerMat.disableLighting = true;
    _tracerMat.alpha = 0.8;
    _tracerMat.freeze();
  }
  tracer.material = _tracerMat;

  setTimeout(() => { tracer.dispose(); }, 40);
}

export function createEnemyTracer(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const midpoint = start.add(dir.scale(0.5));

  const tracer = MeshBuilder.CreateCylinder('eTracer', {
    height: dist,
    diameter: 0.025,
    tessellation: 3,
  }, scene);
  tracer.position = midpoint;
  tracer.lookAt(end);
  tracer.rotation.x += Math.PI / 2;
  tracer.isPickable = false;
  tracer.checkCollisions = false;

  if (!_enemyTracerMat) {
    _enemyTracerMat = new StandardMaterial('eTracerMat', scene);
    _enemyTracerMat.emissiveColor = new Color3(1, 0.25, 0.08);
    _enemyTracerMat.disableLighting = true;
    _enemyTracerMat.alpha = 0.8;
    _enemyTracerMat.freeze();
  }
  tracer.material = _enemyTracerMat;

  setTimeout(() => { tracer.dispose(); }, 40);
}

export function createPickupGlow(_scene: Scene, _position: Vector3, _color: Color3): void {
  // No-op for performance — glow layer handles emissive pickup glow
}
