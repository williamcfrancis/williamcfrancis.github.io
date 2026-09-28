import * as THREE from 'three';
import type { Level, LevelContext } from './Level';

const dissolveVertex = `
  varying vec3 vWorldPos;
  varying vec3 vLocalPos;
  void main() {
    vLocalPos = position;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const dissolveFragment = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uDissolve;
  uniform float uTime;
  varying vec3 vLocalPos;
  varying vec3 vWorldPos;

  // Cheap hash-based noise
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    return fract((p.x + p.y) * p.z * 31.0);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }

  void main() {
    float n = noise(vLocalPos * 14.0 + vec3(uTime * 0.5));
    if (n < uDissolve) discard;
    float edge = smoothstep(uDissolve, uDissolve + 0.08, n);
    vec3 glow = mix(vec3(0.31, 0.80, 0.77), uColor, edge);
    gl_FragColor = vec4(glow, uOpacity);
  }
`;

export class ModelLevel implements Level {
  private scene!: THREE.Scene;
  private group: THREE.Group;
  private layers: THREE.Mesh[] = [];
  private layerMats: THREE.ShaderMaterial[] = [];
  private edges: THREE.LineSegments[] = [];
  private embedMesh!: THREE.Mesh;
  private headMesh!: THREE.Mesh;
  private pulseMesh!: THREE.Mesh;
  private time = 0;
  private layerCount = 12;
  private reducedMotion = false;

  constructor(_unused1?: any, _unused2?: any, _unused3?: any) {
    this.group = new THREE.Group();
  }

  init(ctx: LevelContext) {
    this.scene = ctx.scene;
    this.reducedMotion = ctx.reducedMotion;

    const layerH = 0.1;
    const layerGap = 0.2;
    const totalH = this.layerCount * (layerH + layerGap);
    const startY = -totalH / 2;

    const geo = new THREE.BoxGeometry(2.8, layerH, 0.15);
    const edgeGeo = new THREE.EdgesGeometry(geo);

    for (let i = 0; i < this.layerCount; i++) {
      const hue = 0.47 + i * 0.008;
      const color = new THREE.Color().setHSL(hue, 0.6, 0.32);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: color },
          uOpacity: { value: 0.7 },
          uDissolve: { value: 0 },
          uTime: { value: 0 },
        },
        vertexShader: dissolveVertex,
        fragmentShader: dissolveFragment,
        transparent: true,
      });
      this.layerMats.push(mat);

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = startY + i * (layerH + layerGap);
      this.layers.push(mesh);
      this.group.add(mesh);

      const edge = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.2 })
      );
      edge.position.copy(mesh.position);
      this.edges.push(edge);
      this.group.add(edge);
    }

    const embedGeo = new THREE.BoxGeometry(2.8, 0.12, 0.15);
    const embedMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x1a4a3a),
      transparent: true, opacity: 0.6,
    });
    this.embedMesh = new THREE.Mesh(embedGeo, embedMat);
    this.embedMesh.position.y = startY - layerGap * 1.8;
    this.group.add(this.embedMesh);

    const headGeo = new THREE.BoxGeometry(2.8, 0.12, 0.15);
    const headMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x4a3a1a),
      transparent: true, opacity: 0.6,
    });
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.y = startY + this.layerCount * (layerH + layerGap) + layerGap * 0.3;
    this.group.add(this.headMesh);

    const pulseGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xf4c542,
      transparent: true, opacity: 0.8,
    });
    this.pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    this.group.add(this.pulseMesh);

    const connGeo = new THREE.BufferGeometry();
    const connPositions = new Float32Array(this.layerCount * 2 * 3);
    for (let i = 0; i < this.layerCount; i++) {
      const y = startY + i * (layerH + layerGap);
      connPositions[i * 6] = 0;
      connPositions[i * 6 + 1] = y - layerGap * 0.4;
      connPositions[i * 6 + 2] = 0;
      connPositions[i * 6 + 3] = 0;
      connPositions[i * 6 + 4] = y + layerH + layerGap * 0.1;
      connPositions[i * 6 + 5] = 0;
    }
    connGeo.setAttribute('position', new THREE.BufferAttribute(connPositions, 3));
    const connMat = new THREE.LineBasicMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.08 });
    const connLines = new THREE.LineSegments(connGeo, connMat);
    this.group.add(connLines);

    this.scene.add(this.group);
    this.group.visible = false;
  }

  update(dt: number, _localZoom: number, opacity: number) {
    this.time += dt;
    this.group.visible = opacity > 0.01;
    if (!this.group.visible) return;

    // Dissolve based on opacity — boxes fragment as they fade
    const dissolve = Math.max(0, 1 - opacity * 1.4);

    for (let i = 0; i < this.layers.length; i++) {
      const mat = this.layerMats[i];
      const pulse = this.reducedMotion ? 0 : Math.sin(this.time * 2 - i * 0.4);
      mat.uniforms.uTime.value = this.time;
      mat.uniforms.uDissolve.value = dissolve;
      mat.uniforms.uOpacity.value = opacity * (0.55 + pulse * 0.15);
      const c = mat.uniforms.uColor.value as THREE.Color;
      c.setHSL(0.47 + i * 0.008, 0.6, 0.32 + pulse * 0.06);

      const edgeMat = this.edges[i].material as THREE.LineBasicMaterial;
      edgeMat.opacity = opacity * (0.18 + pulse * 0.08) * (1 - dissolve);
    }

    (this.embedMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5 * (1 - dissolve);
    (this.headMesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.5 * (1 - dissolve);

    const layerH = 0.1;
    const layerGap = 0.2;
    const totalH = this.layerCount * (layerH + layerGap);
    const startY = -totalH / 2;
    const endY = startY + totalH;
    const pulseT = (this.time * 0.4) % 1;
    const pulseY = startY + pulseT * totalH * 1.1;
    this.pulseMesh.position.set(0, pulseY, 0.15);
    (this.pulseMesh.material as THREE.MeshBasicMaterial).opacity = opacity *
      (pulseY > startY && pulseY < endY ? 0.7 : 0) * (1 - dissolve);

    if (!this.reducedMotion) {
      this.group.rotation.y = Math.sin(this.time * 0.12) * 0.12;
      this.group.rotation.x = Math.sin(this.time * 0.08) * 0.03;
    } else {
      this.group.rotation.set(0, 0, 0);
    }
  }

  exit() {
    this.group.visible = false;
  }

  render(_opacity: number) {}
}
