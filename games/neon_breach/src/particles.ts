import {
  Scene,
  Vector3,
  Color3,
  Color4,
  ParticleSystem,
  Texture,
  MeshBuilder,
  Mesh,
  StandardMaterial,
} from '@babylonjs/core';

let particleTextureUrl: string | null = null;

function getParticleTexture(): string {
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

export function createMuzzleFlash(scene: Scene, position: Vector3, direction: Vector3, scale: number): void {
  const ps = new ParticleSystem('muzzle', 20, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = true;
  ps.start();
}

export function createBulletImpact(scene: Scene, position: Vector3, normal: Vector3): void {
  const ps = new ParticleSystem('impact', 15, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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
  ps.disposeOnStop = true;
  ps.start();
}

export function createBloodEffect(scene: Scene, position: Vector3, direction: Vector3): void {
  const ps = new ParticleSystem('blood', 20, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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
  ps.disposeOnStop = true;
  ps.start();
}

export function createExplosion(scene: Scene, position: Vector3, radius: number): void {
  const scale = radius / 6;

  // Core flash
  const flash = new ParticleSystem('expFlash', 30, scene);
  flash.particleTexture = new Texture(getParticleTexture(), scene);
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

  // Outer debris
  const debris = new ParticleSystem('expDebris', 50, scene);
  debris.particleTexture = new Texture(getParticleTexture(), scene);
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

  // Smoke ring
  const smoke = new ParticleSystem('expSmoke', 20, scene);
  smoke.particleTexture = new Texture(getParticleTexture(), scene);
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

export function createTracer(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  if (dist < 0.1) return;

  const mid = start.add(dir.scale(0.5));
  const tracer = MeshBuilder.CreateBox('tracer', { width: 0.03, height: 0.03, depth: dist }, scene);
  tracer.position = mid;
  tracer.lookAt(end);
  tracer.isPickable = false;

  const mat = new StandardMaterial('tracerMat', scene);
  mat.emissiveColor = new Color3(0, 1, 0.8);
  mat.disableLighting = true;
  mat.alpha = 0.6;
  tracer.material = mat;

  let life = 0.08;
  const obs = scene.onBeforeRenderObservable.add(() => {
    life -= scene.getEngine().getDeltaTime() / 1000;
    mat.alpha = Math.max(0, life / 0.08) * 0.6;
    if (life <= 0) {
      scene.onBeforeRenderObservable.remove(obs);
      mat.dispose();
      tracer.dispose();
    }
  });
}

export function createEnemyTracer(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = Math.min(dir.length(), 100);
  if (dist < 0.1) return;
  const actualEnd = start.add(dir.normalize().scale(dist));

  const mid = start.add(actualEnd.subtract(start).scale(0.5));
  const tracer = MeshBuilder.CreateBox('eTracer', { width: 0.025, height: 0.025, depth: dist }, scene);
  tracer.position = mid;
  tracer.lookAt(actualEnd);
  tracer.isPickable = false;

  const mat = new StandardMaterial('eTracerMat', scene);
  mat.emissiveColor = new Color3(1, 0.2, 0.4);
  mat.disableLighting = true;
  mat.alpha = 0.5;
  tracer.material = mat;

  let life = 0.1;
  const obs = scene.onBeforeRenderObservable.add(() => {
    life -= scene.getEngine().getDeltaTime() / 1000;
    mat.alpha = Math.max(0, life / 0.1) * 0.5;
    if (life <= 0) {
      scene.onBeforeRenderObservable.remove(obs);
      mat.dispose();
      tracer.dispose();
    }
  });
}

export function createPickupGlow(scene: Scene, position: Vector3, color: Color3): void {
  const ps = new ParticleSystem('pickupGlow', 15, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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

export function createGrappleBeam(scene: Scene, start: Vector3, end: Vector3): Mesh {
  const dir = end.subtract(start);
  const dist = dir.length();
  const mid = start.add(dir.scale(0.5));

  const beam = MeshBuilder.CreateBox('grappleBeam', { width: 0.04, height: 0.04, depth: dist }, scene);
  beam.position = mid;
  beam.lookAt(end);
  beam.isPickable = false;

  const mat = new StandardMaterial('grappleMat', scene);
  mat.emissiveColor = new Color3(0, 1, 0.8);
  mat.disableLighting = true;
  mat.alpha = 0.8;
  beam.material = mat;

  return beam;
}

export function createEMPBlast(scene: Scene, position: Vector3, radius: number): void {
  const ps = new ParticleSystem('emp', 80, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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

export function createBeamEffect(scene: Scene, start: Vector3, end: Vector3): void {
  const dir = end.subtract(start);
  const dist = dir.length();
  const mid = start.add(dir.scale(0.5));

  const beam = MeshBuilder.CreateBox('beamFX', { width: 0.15, height: 0.15, depth: dist }, scene);
  beam.position = mid;
  beam.lookAt(end);
  beam.isPickable = false;

  const mat = new StandardMaterial('beamMat', scene);
  mat.emissiveColor = new Color3(0.5, 0, 1);
  mat.disableLighting = true;
  mat.alpha = 0.9;
  beam.material = mat;

  // Glow around beam
  const glow = MeshBuilder.CreateBox('beamGlow', { width: 0.4, height: 0.4, depth: dist }, scene);
  glow.position = mid;
  glow.lookAt(end);
  glow.isPickable = false;

  const glowMat = new StandardMaterial('beamGlowMat', scene);
  glowMat.emissiveColor = new Color3(0.3, 0, 0.8);
  glowMat.disableLighting = true;
  glowMat.alpha = 0.3;
  glow.material = glowMat;

  let life = 0.2;
  const obs = scene.onBeforeRenderObservable.add(() => {
    life -= scene.getEngine().getDeltaTime() / 1000;
    const t = Math.max(0, life / 0.2);
    mat.alpha = t * 0.9;
    glowMat.alpha = t * 0.3;
    if (life <= 0) {
      scene.onBeforeRenderObservable.remove(obs);
      mat.dispose();
      beam.dispose();
      glowMat.dispose();
      glow.dispose();
    }
  });
}

export function createWallRunTrail(scene: Scene, position: Vector3): void {
  const ps = new ParticleSystem('wrTrail', 10, scene);
  ps.particleTexture = new Texture(getParticleTexture(), scene);
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
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.targetStopDuration = 0.05;
  ps.disposeOnStop = true;
  ps.start();
}
