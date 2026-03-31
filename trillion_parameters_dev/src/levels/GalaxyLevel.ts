import * as THREE from 'three';
import type { Level } from './Level';

const vertexShader = `
  attribute float size;
  attribute float brightness;
  varying float vBrightness;

  void main() {
    vBrightness = brightness;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying float vBrightness;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vBrightness;
    vec3 teal = vec3(0.306, 0.804, 0.769);
    vec3 white = vec3(1.0);
    vec3 color = mix(teal, white, vBrightness * 0.3);
    gl_FragColor = vec4(color, alpha * 0.7 * uOpacity);
  }
`;

export class GalaxyLevel implements Level {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private points: THREE.Points | null = null;
  private time = 0;
  private particleCount = 120000;
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private rotX = 0;
  private rotY = 0;
  private targetRotX = 0;
  private targetRotY = 0;

  constructor(scene: THREE.Scene, _renderer: THREE.WebGLRenderer, _camera: THREE.Camera) {
    this.scene = scene;
    this.group = new THREE.Group();
    (this.group as any)._levelObject = true;
  }

  init() {
    const positions = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    const brightnesses = new Float32Array(this.particleCount);

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
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('brightness', new THREE.BufferAttribute(brightnesses, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(geo, mat);
    this.group.add(this.points);

    window.addEventListener('mousedown', (e) => {
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
    });
    window.addEventListener('mouseup', () => { this.isDragging = false; });
  }

  update(dt: number, _localZoom: number, opacity: number) {
    this.time += dt;

    this.scene.add(this.group);
    this.group.visible = opacity > 0.01;

    if (!this.isDragging) {
      this.targetRotY += dt * 0.05;
    }

    this.rotX += (this.targetRotX - this.rotX) * 0.05;
    this.rotY += (this.targetRotY - this.rotY) * 0.05;

    this.group.rotation.x = this.rotX;
    this.group.rotation.y = this.rotY;

    const breathe = 1 + Math.sin(this.time * 0.3) * 0.03;
    this.group.scale.set(breathe, breathe, breathe);

    if (this.points) {
      const mat = this.points.material as THREE.ShaderMaterial;
      mat.uniforms.uOpacity.value = opacity;
    }
  }

  render(_opacity: number) {}
}
