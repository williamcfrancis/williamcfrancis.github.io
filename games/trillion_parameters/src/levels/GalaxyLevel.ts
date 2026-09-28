import * as THREE from 'three';
import type { Level, LevelContext } from './Level';

const vertexShader = `
  attribute float size;
  attribute float brightness;
  attribute float category;

  varying float vBrightness;
  varying float vCategory;

  void main() {
    vBrightness = brightness;
    vCategory = category;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  uniform float uFadeFromCenter;
  varying float vBrightness;
  varying float vCategory;

  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float dist = length(d);
    if (dist > 0.45) discard;
    float alpha = smoothstep(0.45, 0.0, dist) * vBrightness;

    vec3 teal  = vec3(0.306, 0.804, 0.769);
    vec3 violet = vec3(0.55, 0.45, 0.95);
    vec3 white = vec3(1.0);
    vec3 base;
    if (vCategory < 0.5) base = teal;
    else if (vCategory < 1.5) base = mix(teal, violet, 0.6);
    else base = mix(teal, white, 0.5);
    vec3 color = mix(base, white, vBrightness * 0.3);

    float a = alpha * 0.7 * uOpacity * uFadeFromCenter;
    gl_FragColor = vec4(color * a, a);
  }
`;

export class GalaxyLevel implements Level {
  private scene!: THREE.Scene;
  private group: THREE.Group;
  private points: THREE.Points | null = null;
  private constellation: THREE.LineSegments | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private time = 0;
  private particleCount = 120000;
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private rotX = 0;
  private rotY = 0;
  private targetRotX = 0;
  private targetRotY = 0;
  private hasDragged = false;
  private dragHintEl: HTMLElement | null = null;
  private hintShown = false;
  private hintTimer = 0;
  private reducedMotion = false;

  constructor(_unused1?: any, _unused2?: any, _unused3?: any) {
    this.group = new THREE.Group();
  }

  init(ctx: LevelContext) {
    this.scene = ctx.scene;
    this.reducedMotion = ctx.reducedMotion;

    const desiredCount = ctx.perf.tier >= 2 ? 60000 : ctx.perf.tier >= 1 ? 90000 : 120000;
    this.particleCount = desiredCount;

    const positions = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    const brightnesses = new Float32Array(this.particleCount);
    const categories = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const armAngle = Math.floor(Math.random() * 3) * (Math.PI * 2 / 3);
      const spiralR = Math.pow(Math.random(), 0.6) * 8;
      const spiralAngle = armAngle + spiralR * 0.5 + (Math.random() - 0.5) * 0.8;

      const useSpiral = Math.random() < 0.7;

      if (useSpiral) {
        const scatter = 0.3 + spiralR * 0.08;
        positions[i * 3] = Math.cos(spiralAngle) * spiralR + (Math.random() - 0.5) * scatter;
        positions[i * 3 + 1] = (Math.random() - 0.5) * scatter * 0.5;
        positions[i * 3 + 2] = Math.sin(spiralAngle) * spiralR + (Math.random() - 0.5) * scatter;
      } else {
        const r = Math.pow(Math.random(), 0.5) * 10;
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      sizes[i] = 0.5 + Math.random() * 2;
      const distFromCenter = Math.sqrt(
        positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2
      );
      brightnesses[i] = Math.max(0.1, 1 - distFromCenter / 10 + Math.random() * 0.3);

      // 0 = attention (teal), 1 = FFN (violet), 2 = embedding (white)
      const cat = Math.random();
      categories[i] = cat < 0.55 ? 0 : cat < 0.92 ? 1 : 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('brightness', new THREE.BufferAttribute(brightnesses, 1));
    geo.setAttribute('category', new THREE.BufferAttribute(categories, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 1.0 },
        uFadeFromCenter: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.group.add(this.points);

    // Constellation lines — subtle web connecting the brightest stars.
    // Adds the "planetarium" feel without significant cost.
    const brightest: { idx: number; b: number; x: number; y: number; z: number }[] = [];
    for (let i = 0; i < this.particleCount; i++) {
      if (brightnesses[i] > 0.85) {
        brightest.push({
          idx: i,
          b: brightnesses[i],
          x: positions[i * 3],
          y: positions[i * 3 + 1],
          z: positions[i * 3 + 2],
        });
      }
      if (brightest.length >= 220) break;
    }
    const linePositions: number[] = [];
    const maxConn = 2;
    const maxDist = 1.6;
    for (let i = 0; i < brightest.length; i++) {
      const a = brightest[i];
      const cands: { j: number; d: number }[] = [];
      for (let j = 0; j < brightest.length; j++) {
        if (i === j) continue;
        const b = brightest[j];
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < maxDist) cands.push({ j, d });
      }
      cands.sort((p, q) => p.d - q.d);
      for (let k = 0; k < Math.min(maxConn, cands.length); k++) {
        const b = brightest[cands[k].j];
        if (b.idx < a.idx) continue; // dedupe pairs
        linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }
    }
    if (linePositions.length > 0) {
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xa8e6cf,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      this.constellation = new THREE.LineSegments(lineGeo, lineMat);
      this.constellation.frustumCulled = false;
      this.group.add(this.constellation);
    }

    this.scene.add(this.group);
    this.group.visible = false;

    this.dragHintEl = document.getElementById('galaxy-hint');

    window.addEventListener('mousedown', (e) => {
      if (!this.group.visible) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest('#ui-layer, #scrubber, #help-modal, #loading-screen, .back-btn')) return;
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.targetRotY += (e.clientX - this.dragStartX) * 0.003;
      this.targetRotX += (e.clientY - this.dragStartY) * 0.003;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      if (!this.hasDragged) {
        this.hasDragged = true;
        if (this.dragHintEl) this.dragHintEl.classList.remove('visible');
      }
    });
    window.addEventListener('mouseup', () => { this.isDragging = false; });
  }

  enter() {
    this.hintTimer = 0;
    this.hintShown = false;
  }

  update(dt: number, _localZoom: number, opacity: number) {
    this.time += dt;
    this.group.visible = opacity > 0.01;
    if (!this.group.visible) return;

    if (!this.isDragging) {
      this.targetRotY += dt * (this.reducedMotion ? 0.02 : 0.05);
    }

    const lerpFactor = this.reducedMotion ? 0.2 : 0.05;
    this.rotX += (this.targetRotX - this.rotX) * lerpFactor;
    this.rotY += (this.targetRotY - this.rotY) * lerpFactor;

    this.group.rotation.x = this.rotX;
    this.group.rotation.y = this.rotY;

    if (!this.reducedMotion) {
      const breathe = 1 + Math.sin(this.time * 0.3) * 0.03;
      this.group.scale.set(breathe, breathe, breathe);
    }

    if (this.material) {
      this.material.uniforms.uOpacity.value = opacity;
      const fadeIn = Math.min(1, opacity * 1.6);
      this.material.uniforms.uFadeFromCenter.value = fadeIn;
    }
    if (this.constellation) {
      const m = this.constellation.material as THREE.LineBasicMaterial;
      const breathe = this.reducedMotion ? 1 : (0.85 + 0.15 * Math.sin(this.time * 0.4));
      m.opacity = 0.07 * opacity * breathe;
    }

    if (!this.hasDragged && opacity > 0.6) {
      this.hintTimer += dt;
      if (!this.hintShown && this.hintTimer > 1.8 && this.dragHintEl) {
        this.dragHintEl.classList.add('visible');
        this.hintShown = true;
      }
    }
  }

  exit() {
    this.group.visible = false;
    this.isDragging = false;
    if (this.dragHintEl) this.dragHintEl.classList.remove('visible');
  }

  render(_opacity: number) {}

  cleanup() {
    if (this.points) {
      this.group.remove(this.points);
      this.points.geometry.dispose();
      (this.points.material as THREE.Material).dispose();
    }
  }
}
