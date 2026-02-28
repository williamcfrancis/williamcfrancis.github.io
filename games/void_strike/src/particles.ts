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
  Animation,
} from '@babylonjs/core';

function createCircleTexture(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const c = canvas.getContext('2d')!;
  const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = grad;
  c.fillRect(0, 0, 64, 64);
  return canvas.toDataURL();
}

let circleTextureUrl: string | null = null;

function getCircleTexture(scene: Scene): Texture {
  if (!circleTextureUrl) circleTextureUrl = createCircleTexture();
  return new Texture(circleTextureUrl, scene);
}

export function createMuzzleFlash(scene: Scene, position: Vector3, direction: Vector3, scale = 1): void {
  const ps = new ParticleSystem('muzzle', 30, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(4).add(new Vector3(-1, -1, -1));
  ps.direction2 = direction.scale(8).add(new Vector3(1, 1, 1));
  ps.minLifeTime = 0.02;
  ps.maxLifeTime = 0.08;
  ps.minSize = 0.1 * scale;
  ps.maxSize = 0.3 * scale;
  ps.emitRate = 500;
  ps.color1 = new Color4(1, 0.9, 0.5, 1);
  ps.color2 = new Color4(1, 0.6, 0.1, 1);
  ps.colorDead = new Color4(1, 0.3, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.gravity = new Vector3(0, -2, 0);
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = true;
  ps.start();

  // Flash light sphere
  const flash = MeshBuilder.CreateSphere('flash', { diameter: 0.4 * scale }, scene);
  flash.position = position.clone();
  const mat = new StandardMaterial('flashMat', scene);
  mat.emissiveColor = new Color3(1, 0.8, 0.3);
  mat.disableLighting = true;
  mat.alpha = 0.8;
  flash.material = mat;

  setTimeout(() => {
    flash.dispose();
    mat.dispose();
  }, 50);
}

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const ps = new ParticleSystem('impact', 20, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  const reflected = normal.scale(2);
  ps.direction1 = reflected.add(new Vector3(-1, 0, -1));
  ps.direction2 = reflected.add(new Vector3(1, 2, 1));
  ps.minLifeTime = 0.1;
  ps.maxLifeTime = 0.3;
  ps.minSize = 0.02;
  ps.maxSize = 0.08;
  ps.emitRate = 300;
  ps.color1 = new Color4(1, 0.8, 0.3, 1);
  ps.color2 = new Color4(0.5, 0.5, 0.5, 1);
  ps.colorDead = new Color4(0.2, 0.2, 0.2, 0);
  ps.minEmitPower = 2;
  ps.maxEmitPower = 6;
  ps.gravity = new Vector3(0, -10, 0);
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = true;
  ps.start();

  // Impact decal (small dark spot)
  const decal = MeshBuilder.CreateDisc('decal', { radius: 0.15, tessellation: 8 }, scene);
  decal.position = position.add(normal.scale(0.01));
  decal.lookAt(position.add(normal));
  const decalMat = new StandardMaterial('decalMat', scene);
  decalMat.diffuseColor = new Color3(0.05, 0.05, 0.05);
  decalMat.emissiveColor = new Color3(0.3, 0.15, 0);
  decalMat.alpha = 0.7;
  decal.material = decalMat;
  decal.checkCollisions = false;

  setTimeout(() => {
    decal.dispose();
    decalMat.dispose();
  }, 5000);
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const ps = new ParticleSystem('blood', 25, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.direction1 = direction.scale(-3).add(new Vector3(-2, 0, -2));
  ps.direction2 = direction.scale(-1).add(new Vector3(2, 3, 2));
  ps.minLifeTime = 0.15;
  ps.maxLifeTime = 0.4;
  ps.minSize = 0.04;
  ps.maxSize = 0.12;
  ps.emitRate = 400;
  ps.color1 = new Color4(1, 0.3, 0, 1);
  ps.color2 = new Color4(1, 0.1, 0.1, 1);
  ps.colorDead = new Color4(0.5, 0, 0, 0);
  ps.minEmitPower = 3;
  ps.maxEmitPower = 8;
  ps.gravity = new Vector3(0, -15, 0);
  ps.targetStopDuration = 0.04;
  ps.disposeOnStop = true;
  ps.start();
}

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  // Core flash
  const flash = MeshBuilder.CreateSphere('expFlash', { diameter: radius * 0.6 }, scene);
  flash.position = position.clone();
  const flashMat = new StandardMaterial('expFlashMat', scene);
  flashMat.emissiveColor = new Color3(1, 0.8, 0.2);
  flashMat.disableLighting = true;
  flash.material = flashMat;

  // Fireball particles
  const fire = new ParticleSystem('explosion', 80, scene);
  fire.particleTexture = getCircleTexture(scene);
  fire.emitter = position.clone();
  fire.createSphereEmitter(radius * 0.3);
  fire.minLifeTime = 0.2;
  fire.maxLifeTime = 0.6;
  fire.minSize = 0.5;
  fire.maxSize = 1.5;
  fire.emitRate = 500;
  fire.color1 = new Color4(1, 0.7, 0.1, 1);
  fire.color2 = new Color4(1, 0.3, 0, 1);
  fire.colorDead = new Color4(0.3, 0.1, 0, 0);
  fire.minEmitPower = 5;
  fire.maxEmitPower = 15;
  fire.gravity = new Vector3(0, 5, 0);
  fire.blendMode = ParticleSystem.BLENDMODE_ADD;
  fire.targetStopDuration = 0.1;
  fire.disposeOnStop = true;
  fire.start();

  // Smoke
  const smoke = new ParticleSystem('smoke', 40, scene);
  smoke.particleTexture = getCircleTexture(scene);
  smoke.emitter = position.clone();
  smoke.createSphereEmitter(radius * 0.5);
  smoke.minLifeTime = 0.5;
  smoke.maxLifeTime = 1.5;
  smoke.minSize = 0.8;
  smoke.maxSize = 2.5;
  smoke.emitRate = 200;
  smoke.color1 = new Color4(0.3, 0.3, 0.3, 0.5);
  smoke.color2 = new Color4(0.15, 0.15, 0.15, 0.3);
  smoke.colorDead = new Color4(0.05, 0.05, 0.05, 0);
  smoke.minEmitPower = 3;
  smoke.maxEmitPower = 8;
  smoke.gravity = new Vector3(0, 3, 0);
  smoke.targetStopDuration = 0.15;
  smoke.disposeOnStop = true;
  smoke.start();

  // Sparks
  const sparks = new ParticleSystem('sparks', 50, scene);
  sparks.particleTexture = getCircleTexture(scene);
  sparks.emitter = position.clone();
  sparks.createSphereEmitter(0.5);
  sparks.minLifeTime = 0.3;
  sparks.maxLifeTime = 0.8;
  sparks.minSize = 0.03;
  sparks.maxSize = 0.08;
  sparks.emitRate = 600;
  sparks.color1 = new Color4(1, 1, 0.5, 1);
  sparks.color2 = new Color4(1, 0.6, 0.1, 1);
  sparks.colorDead = new Color4(1, 0.2, 0, 0);
  sparks.minEmitPower = 10;
  sparks.maxEmitPower = 25;
  sparks.gravity = new Vector3(0, -15, 0);
  sparks.blendMode = ParticleSystem.BLENDMODE_ADD;
  sparks.targetStopDuration = 0.08;
  sparks.disposeOnStop = true;
  sparks.start();

  // Shockwave ring
  const ring = MeshBuilder.CreateTorus('shockwave', { diameter: 1, thickness: 0.3, tessellation: 32 }, scene);
  ring.position = position.clone();
  ring.position.y = 0.2;
  const ringMat = new StandardMaterial('shockMat', scene);
  ringMat.emissiveColor = new Color3(1, 0.6, 0.1);
  ringMat.disableLighting = true;
  ringMat.alpha = 0.6;
  ring.material = ringMat;

  const scaleAnim = new Animation('shockScale', 'scaling', 60, Animation.ANIMATIONTYPE_VECTOR3);
  scaleAnim.setKeys([
    { frame: 0, value: new Vector3(1, 1, 1) },
    { frame: 20, value: new Vector3(radius * 2, 0.5, radius * 2) },
  ]);
  ring.animations = [scaleAnim];
  scene.beginAnimation(ring, 0, 20, false, 1, () => {
    ring.dispose();
    ringMat.dispose();
  });

  setTimeout(() => {
    flash.dispose();
    flashMat.dispose();
  }, 100);
}

export function createTracer(scene: Scene, start: Vector3, end: Vector3, color = new Color3(0, 1, 0.8)): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const midpoint = start.add(dir.scale(0.5));

  const tracer = MeshBuilder.CreateCylinder('tracer', {
    height: dist,
    diameter: 0.03,
    tessellation: 4,
  }, scene);
  tracer.position = midpoint;
  tracer.lookAt(end);
  tracer.rotation.x += Math.PI / 2;

  const mat = new StandardMaterial('tracerMat', scene);
  mat.emissiveColor = color;
  mat.disableLighting = true;
  mat.alpha = 0.6;
  tracer.material = mat;
  tracer.checkCollisions = false;

  setTimeout(() => {
    tracer.dispose();
    mat.dispose();
  }, 80);
}

export function createEnemyTracer(scene: Scene, start: Vector3, end: Vector3): void {
  createTracer(scene, start, end, new Color3(1, 0.3, 0.1));
}

export function createPickupGlow(scene: Scene, position: Vector3, color: Color3): ParticleSystem {
  const ps = new ParticleSystem('pickupGlow', 15, scene);
  ps.particleTexture = getCircleTexture(scene);
  ps.emitter = position.clone();
  ps.minLifeTime = 0.5;
  ps.maxLifeTime = 1.5;
  ps.minSize = 0.1;
  ps.maxSize = 0.3;
  ps.emitRate = 10;
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
