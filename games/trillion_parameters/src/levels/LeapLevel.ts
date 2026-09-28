import * as THREE from 'three';
import type { Level, LevelContext } from './Level';

const vertexShader = `
  attribute float cityIndex;
  attribute float sparkleSeed;
  attribute float subCluster;

  uniform float uTime;
  uniform float uMorphToGalaxy;
  uniform float uPerfTier;
  uniform float uCity1Vis;
  uniform float uCity2Vis;
  uniform float uCity3Vis;

  varying float vCityIndex;
  varying float vCityVis;
  varying float vSparkle;
  varying float vSubCluster;

  void main() {
    vCityIndex = cityIndex;
    vSubCluster = subCluster;

    float vis = 0.0;
    if (cityIndex < 0.5) vis = uCity1Vis;
    else if (cityIndex < 1.5) vis = uCity2Vis;
    else vis = uCity3Vis;
    vCityVis = vis;

    vec3 pos = position;

    // Subtle spiral twist around z, per city
    float spinSpeed = 0.08 + cityIndex * 0.02;
    float angle = uTime * spinSpeed;
    float c = cos(angle);
    float s = sin(angle);
    pos.xy = mat2(c, -s, s, c) * pos.xy;

    // Morph outward to spherical halo for hand-off to Galaxy
    if (uMorphToGalaxy > 0.001) {
      vec3 dir = normalize(pos + vec3(0.001));
      vec3 halo = dir * 12.0;
      pos = mix(pos, halo, uMorphToGalaxy);
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    float baseSize = 1.4 + cityIndex * 0.35;
    float sparkle = uPerfTier > 1.5 ? 0.0 : sin(uTime * 2.0 + sparkleSeed) * 0.35;
    vSparkle = sparkle;

    gl_PointSize = baseSize * (320.0 / -mvPosition.z) * (1.0 + sparkle);
    gl_PointSize = clamp(gl_PointSize, 0.5, 80.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uOpacity;
  varying float vCityIndex;
  varying float vCityVis;
  varying float vSparkle;
  varying float vSubCluster;

  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float dist = length(d);
    if (dist > 0.45) discard;

    float alpha = smoothstep(0.45, 0.0, dist);

    vec3 cool = vec3(0.50, 0.92, 0.88);   // teal
    vec3 mid  = vec3(0.66, 0.94, 0.82);   // mint
    vec3 warm = vec3(0.96, 0.78, 0.40);   // gold
    vec3 color;
    if (vCityIndex < 0.5) color = mix(cool, vec3(1.0), 0.35);
    else if (vCityIndex < 1.5) color = mix(cool, mid, 0.6);
    else color = mix(mid, warm, 0.6 + vSubCluster * 0.3);

    color += vec3(vSparkle * 0.4);

    float a = alpha * vCityVis * uOpacity;
    gl_FragColor = vec4(color * a, a);
  }
`;

export class LeapLevel implements Level {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private group: THREE.Group;
  private points: THREE.Points | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private time = 0;
  private cameraSnapshot = new THREE.Vector3(0, 0, 5);
  private setSubLabel: ((s: string) => void) | null = null;
  private setParamTarget: ((n: number) => void) | null = null;
  private morphToGalaxy = 0;
  private perfTier = 0;

  constructor(_unused1?: any, _unused2?: any, _unused3?: any) {
    this.group = new THREE.Group();
  }

  init(ctx: LevelContext) {
    this.scene = ctx.scene;
    this.camera = ctx.camera;
    this.setSubLabel = ctx.setSubLabel;
    this.setParamTarget = ctx.setParamTarget;
    this.perfTier = ctx.perf.tier;

    const cities = [
      { center: new THREE.Vector3(0, 0, 0),    count: 800,   spread: 0.4,  shape: 'cube' as const,    cityIdx: 0 },
      { center: new THREE.Vector3(0, 0, -25),  count: 6000,  spread: 4.0,  shape: 'spiral' as const,  cityIdx: 1 },
      { center: new THREE.Vector3(0, 0, -120), count: 12000, spread: 25.0, shape: 'moe' as const,     cityIdx: 2 },
    ];

    const total = cities.reduce((a, c) => a + c.count, 0);
    const positions = new Float32Array(total * 3);
    const cityIndexAttr = new Float32Array(total);
    const sparkleSeed = new Float32Array(total);
    const subCluster = new Float32Array(total);

    let cursor = 0;
    for (const city of cities) {
      for (let i = 0; i < city.count; i++) {
        let x = 0, y = 0, z = 0;
        let lump = 0;

        if (city.shape === 'cube') {
          x = (Math.random() - 0.5) * city.spread;
          y = (Math.random() - 0.5) * city.spread;
          z = (Math.random() - 0.5) * city.spread * 0.6;
        } else if (city.shape === 'spiral') {
          const r = Math.pow(Math.random(), 0.65) * city.spread;
          const arm = Math.floor(Math.random() * 3) * (Math.PI * 2 / 3);
          const ang = arm + r * 0.8 + (Math.random() - 0.5) * 0.6;
          const scatter = 0.2 + r * 0.05;
          x = Math.cos(ang) * r + (Math.random() - 0.5) * scatter;
          y = (Math.random() - 0.5) * scatter * 0.5;
          z = Math.sin(ang) * r + (Math.random() - 0.5) * scatter;
        } else {
          // 'moe' — asymmetric blob with sub-cluster lumps
          const lumpCount = 8;
          lump = Math.floor(Math.random() * lumpCount);
          const lumpAng = (lump / lumpCount) * Math.PI * 2;
          const lumpRadius = city.spread * 0.55;
          const lcx = Math.cos(lumpAng) * lumpRadius;
          const lcy = Math.sin(lumpAng * 0.7) * lumpRadius * 0.7;
          const lcz = Math.sin(lumpAng) * lumpRadius * 0.4;
          const lumpSize = city.spread * 0.35;
          x = lcx + (Math.random() - 0.5) * lumpSize;
          y = lcy + (Math.random() - 0.5) * lumpSize;
          z = lcz + (Math.random() - 0.5) * lumpSize;
        }

        positions[cursor * 3]     = city.center.x + x;
        positions[cursor * 3 + 1] = city.center.y + y;
        positions[cursor * 3 + 2] = city.center.z + z;
        cityIndexAttr[cursor] = city.cityIdx;
        sparkleSeed[cursor] = Math.random() * Math.PI * 2;
        subCluster[cursor] = lump / 8;
        cursor++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('cityIndex', new THREE.BufferAttribute(cityIndexAttr, 1));
    geo.setAttribute('sparkleSeed', new THREE.BufferAttribute(sparkleSeed, 1));
    geo.setAttribute('subCluster', new THREE.BufferAttribute(subCluster, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMorphToGalaxy: { value: 0 },
        uPerfTier: { value: this.perfTier },
        uCity1Vis: { value: 0 },
        uCity2Vis: { value: 0 },
        uCity3Vis: { value: 0 },
        uOpacity: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
    this.group.add(this.points);
    this.scene.add(this.group);
    this.group.visible = false;
  }

  enter() {
    this.cameraSnapshot.copy(this.camera.position);
  }

  exit() {
    this.group.visible = false;
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
    this.morphToGalaxy = 0;
    if (this.material) this.material.uniforms.uMorphToGalaxy.value = 0;
  }

  update(dt: number, localZoom: number, opacity: number) {
    this.time += dt;
    this.group.visible = opacity > 0.01;
    if (!this.group.visible || !this.material) return;

    // Camera schedule — smoothstep waypoints driven by localZoom
    const camZ = this.cameraZForZoom(localZoom);
    this.camera.position.set(0, 0, camZ);
    this.camera.lookAt(0, 0, camZ - 10);

    // City visibility based on camera Z relative to each city
    const cityZs = [0, -25, -120];
    const u = this.material.uniforms;
    const vis: number[] = [];
    for (let i = 0; i < 3; i++) {
      const dz = camZ - cityZs[i];
      const distFalloff = Math.exp(-Math.pow(dz / 30, 2) * 0.4);
      const inFront = dz > -2 ? 1 : Math.max(0, 1 + dz * 0.05);
      vis[i] = Math.max(0.05, Math.min(1, distFalloff * inFront + 0.15));
    }
    u.uCity1Vis.value = vis[0];
    u.uCity2Vis.value = vis[1];
    u.uCity3Vis.value = vis[2];

    // Morph to Galaxy at the very end
    this.morphToGalaxy = Math.max(0, Math.min(1, (localZoom - 0.93) / 0.07));
    u.uMorphToGalaxy.value = this.morphToGalaxy;

    u.uTime.value = this.time;
    u.uOpacity.value = opacity;
    u.uPerfTier.value = this.perfTier;

    // Sub-label + param target
    if (this.setSubLabel && this.setParamTarget) {
      if (localZoom < 0.25) {
        this.setSubLabel('GPT-2 — 124M parameters');
        this.setParamTarget(124000000);
      } else if (localZoom < 0.55) {
        this.setSubLabel('GPT-3 — 175B parameters (~1,400× GPT-2)');
        this.setParamTarget(175000000000);
      } else if (localZoom < 0.85) {
        this.setSubLabel('GPT-4 (estimated) — ~1.8T parameters (~14,500× GPT-2)');
        this.setParamTarget(1800000000000);
      } else {
        this.setSubLabel('Approaching the trillion-parameter horizon');
        this.setParamTarget(1800000000000);
      }
    }
  }

  private cameraZForZoom(localZoom: number): number {
    // Waypoints: localZoom → camera Z. We pull the camera back at the end so
    // Galaxy (at world origin) is in frame for the morph hand-off.
    const wp: [number, number][] = [
      [0.00,   8],
      [0.20,   2],
      [0.30,  -5],
      [0.50, -25],
      [0.65, -50],
      [0.82, -100],
      [0.92,  -20],
      [1.00,   5],
    ];
    if (localZoom <= wp[0][0]) return wp[0][1];
    if (localZoom >= wp[wp.length - 1][0]) return wp[wp.length - 1][1];
    for (let i = 0; i < wp.length - 1; i++) {
      const [za, ca] = wp[i];
      const [zb, cb] = wp[i + 1];
      if (localZoom >= za && localZoom <= zb) {
        const t = (localZoom - za) / (zb - za);
        const eased = t * t * (3 - 2 * t);
        return ca + (cb - ca) * eased;
      }
    }
    return wp[0][1];
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
