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
  canvas.width = 16;
  canvas.height = 16;
  const c = canvas.getContext('2d')!;
  const grad = c.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = grad;
  c.fillRect(0, 0, 16, 16);
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
  const ps = new ParticleSystem('muzzle', 8, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(4).add(new Vector3(-1, -1, -1));
  ps.direction2 = direction.scale(8).add(new Vector3(1, 1, 1));
  ps.minLifeTime = 0.02;
  ps.maxLifeTime = 0.05;
  ps.minSize = 0.08 * scale;
  ps.maxSize = 0.2 * scale;
  ps.emitRate = 200;
  ps.color1 = new Color4(1, 0.9, 0.5, 1);
  ps.color2 = new Color4(1, 0.6, 0.1, 1);
  ps.colorDead = new Color4(1, 0.3, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.03;
  ps.disposeOnStop = true;
  ps.start();
}

const MAX_DECALS = 20;
const _activeDecals: { mesh: Mesh; timer: ReturnType<typeof setTimeout> }[] = [];
let _decalMat: StandardMaterial | null = null;

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const ps = new ParticleSystem('impact', 6, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  const reflected = normal.scale(2);
  ps.direction1 = reflected.add(new Vector3(-1, 0, -1));
  ps.direction2 = reflected.add(new Vector3(1, 2, 1));
  ps.minLifeTime = 0.05;
  ps.maxLifeTime = 0.15;
  ps.minSize = 0.02;
  ps.maxSize = 0.05;
  ps.emitRate = 150;
  ps.color1 = new Color4(1, 0.8, 0.3, 1);
  ps.color2 = new Color4(0.5, 0.5, 0.5, 1);
  ps.colorDead = new Color4(0.2, 0.2, 0.2, 0);
  ps.minEmitPower = 2;
  ps.maxEmitPower = 5;
  ps.gravity = new Vector3(0, -10, 0);
  ps.targetStopDuration = 0.03;
  ps.disposeOnStop = true;
  ps.start();

  if (_activeDecals.length >= MAX_DECALS) {
    const old = _activeDecals.shift()!;
    clearTimeout(old.timer);
    old.mesh.dispose();
  }

  if (!_decalMat) {
    _decalMat = new StandardMaterial('decalMat', scene);
    _decalMat.diffuseColor = new Color3(0.1, 0.1, 0.1);
    _decalMat.specularColor = Color3.Black();
    _decalMat.alpha = 0.6;
    _decalMat.freeze();
  }

  const decal = MeshBuilder.CreateDisc('decal', { radius: 0.12, tessellation: 4 }, scene);
  decal.position = position.add(normal.scale(0.01));
  decal.lookAt(position.add(normal));
  decal.material = _decalMat;
  decal.checkCollisions = false;
  decal.isPickable = false;

  const entry = { mesh: decal, timer: setTimeout(() => {
    decal.dispose();
    const idx = _activeDecals.indexOf(entry);
    if (idx !== -1) _activeDecals.splice(idx, 1);
  }, 2000) };
  _activeDecals.push(entry);
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const ps = new ParticleSystem('blood', 8, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(-3).add(new Vector3(-2, 0, -2));
  ps.direction2 = direction.scale(-1).add(new Vector3(2, 3, 2));
  ps.minLifeTime = 0.08;
  ps.maxLifeTime = 0.2;
  ps.minSize = 0.03;
  ps.maxSize = 0.08;
  ps.emitRate = 200;
  ps.color1 = new Color4(1, 0.3, 0, 1);
  ps.color2 = new Color4(1, 0.1, 0.1, 1);
  ps.colorDead = new Color4(0.5, 0, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 6;
  ps.gravity = new Vector3(0, -15, 0);
  ps.targetStopDuration = 0.03;
  ps.disposeOnStop = true;
  ps.start();
}

let _flashMat: StandardMaterial | null = null;

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  if (!_flashMat) {
    _flashMat = new StandardMaterial('expFlashMat', scene);
    _flashMat.emissiveColor = new Color3(1, 0.8, 0.2);
    _flashMat.disableLighting = true;
    _flashMat.freeze();
  }

  const flash = MeshBuilder.CreateSphere('expFlash', { diameter: radius * 0.4, segments: 4 }, scene);
  flash.position = position.clone();
  flash.isPickable = false;
  flash.material = _flashMat;

  const fire = new ParticleSystem('explosion', 25, scene);
  fire.particleTexture = getCircleTexture(scene);
  fire.emitter = position.clone();
  fire.createSphereEmitter(radius * 0.3);
  fire.minLifeTime = 0.1;
  fire.maxLifeTime = 0.35;
  fire.minSize = 0.3;
  fire.maxSize = 1.0;
  fire.emitRate = 200;
  fire.color1 = new Color4(1, 0.7, 0.1, 1);
  fire.color2 = new Color4(1, 0.3, 0, 1);
  fire.colorDead = new Color4(0.15, 0.08, 0, 0);
  fire.minEmitPower = 4;
  fire.maxEmitPower = 10;
  fire.gravity = new Vector3(0, 4, 0);
  fire.blendMode = ParticleSystem.BLENDMODE_ADD;
  fire.targetStopDuration = 0.06;
  fire.disposeOnStop = true;
  fire.start();

  setTimeout(() => { flash.dispose(); }, 70);
}

let _tracerMat: StandardMaterial | null = null;
let _enemyTracerMat: StandardMaterial | null = null;

export function createTracer(scene: Scene, start: Vector3, end: Vector3): void {
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
    _tracerMat = new StandardMaterial('tracerMat', scene);
    _tracerMat.emissiveColor = new Color3(1, 1, 0.6);
    _tracerMat.disableLighting = true;
    _tracerMat.alpha = 0.7;
    _tracerMat.freeze();
  }
  tracer.material = _tracerMat;

  setTimeout(() => { tracer.dispose(); }, 50);
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
    _enemyTracerMat = new StandardMaterial('eTracerMat', scene);
    _enemyTracerMat.emissiveColor = new Color3(1, 0.3, 0.1);
    _enemyTracerMat.disableLighting = true;
    _enemyTracerMat.alpha = 0.7;
    _enemyTracerMat.freeze();
  }
  tracer.material = _enemyTracerMat;

  setTimeout(() => { tracer.dispose(); }, 50);
}

export function createPickupGlow(_scene: Scene, _position: Vector3, _color: Color3): void {
  // No-op for performance
}
