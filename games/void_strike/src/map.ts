import {
  Scene,
  MeshBuilder,
  Vector3,
  StandardMaterial,
  Color3,
  Mesh,
  PointLight,
  SpotLight,
  GlowLayer,
  ShadowGenerator,
  DirectionalLight,
  PBRMaterial,
  Texture,
  CubeTexture,
} from '@babylonjs/core';

const ARENA_SIZE = 80;
const WALL_HEIGHT = 12;

function makePBR(scene: Scene, name: string, color: Color3, rough = 0.8, metal = 0.1): PBRMaterial {
  const mat = new PBRMaterial(name, scene);
  mat.albedoColor = color;
  mat.roughness = rough;
  mat.metallic = metal;
  mat.environmentIntensity = 0.3;
  return mat;
}

function makeEmissiveMat(scene: Scene, name: string, color: Color3, intensity = 2): PBRMaterial {
  const mat = new PBRMaterial(name, scene);
  mat.albedoColor = Color3.Black();
  mat.emissiveColor = color;
  mat.emissiveIntensity = intensity;
  mat.roughness = 0.3;
  mat.metallic = 0.8;
  return mat;
}

function addNeonStrip(
  scene: Scene, pos: Vector3, size: Vector3,
  color: Color3, allMeshes: Mesh[]
) {
  const strip = MeshBuilder.CreateBox('neon', { width: size.x, height: size.y, depth: size.z }, scene);
  strip.position = pos;
  strip.material = makeEmissiveMat(scene, 'neonMat_' + Math.random(), color);
  strip.checkCollisions = false;
  allMeshes.push(strip);
}

export interface MapData {
  meshes: Mesh[];
  spawnPoints: Vector3[];
  pickupLocations: Vector3[];
  shadowGenerator: ShadowGenerator | null;
  navMeshBounds: { min: Vector3; max: Vector3 };
  animatedMeshes: { mesh: Mesh; rotSpeed: Vector3; bobSpeed: number; bobAmount: number; baseY: number }[];
}

export function buildMap(scene: Scene): MapData {
  const allMeshes: Mesh[] = [];
  const spawnPoints: Vector3[] = [];
  const pickupLocations: Vector3[] = [];

  // Sky color
  scene.clearColor.set(0.01, 0.02, 0.05, 1);
  scene.ambientColor = new Color3(0.05, 0.08, 0.12);
  scene.fogMode = Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.008;
  scene.fogColor = new Color3(0.01, 0.02, 0.05);

  // Glow layer
  const glow = new GlowLayer('glow', scene);
  glow.intensity = 0.6;

  // Main directional light
  const dirLight = new DirectionalLight('dirLight', new Vector3(-0.5, -1, 0.3), scene);
  dirLight.intensity = 0.4;
  dirLight.diffuse = new Color3(0.3, 0.4, 0.6);

  const shadowGen = new ShadowGenerator(1024, dirLight);
  shadowGen.useBlurExponentialShadowMap = true;
  shadowGen.blurKernel = 16;

  // Floor
  const floorMat = makePBR(scene, 'floorMat', new Color3(0.06, 0.07, 0.1), 0.85, 0.2);
  const floor = MeshBuilder.CreateGround('floor', { width: ARENA_SIZE * 2, height: ARENA_SIZE * 2, subdivisions: 4 }, scene);
  floor.material = floorMat;
  floor.checkCollisions = true;
  floor.receiveShadows = true;
  allMeshes.push(floor);

  // Grid pattern on floor
  const gridMat = makePBR(scene, 'gridMat', new Color3(0.04, 0.05, 0.08), 0.9, 0.15);
  for (let x = -ARENA_SIZE; x < ARENA_SIZE; x += 10) {
    const lineX = MeshBuilder.CreateBox('gridX', { width: 0.05, height: 0.01, depth: ARENA_SIZE * 2 }, scene);
    lineX.position = new Vector3(x, 0.005, 0);
    lineX.material = makeEmissiveMat(scene, 'gridEmit' + x, new Color3(0, 0.15, 0.12), 0.5);
    lineX.checkCollisions = false;
    allMeshes.push(lineX);

    const lineZ = MeshBuilder.CreateBox('gridZ', { width: ARENA_SIZE * 2, height: 0.01, depth: 0.05 }, scene);
    lineZ.position = new Vector3(0, 0.005, x);
    lineZ.material = lineX.material;
    lineZ.checkCollisions = false;
    allMeshes.push(lineZ);
  }

  // Outer walls
  const wallMat = makePBR(scene, 'wallMat', new Color3(0.08, 0.1, 0.14), 0.7, 0.3);
  const wallPositions: [number, number, number, number, number][] = [
    [0, WALL_HEIGHT / 2, -ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [0, WALL_HEIGHT / 2, ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [-ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
    [ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
  ];

  wallPositions.forEach(([x, y, z, w, d], i) => {
    const wall = MeshBuilder.CreateBox(`wall${i}`, { width: w + 1, height: WALL_HEIGHT, depth: d + 1 }, scene);
    wall.position = new Vector3(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    wall.receiveShadows = true;
    allMeshes.push(wall);
  });

  // Neon accent strips on walls
  const neonColors = [
    new Color3(0, 1, 0.8),
    new Color3(0, 0.5, 1),
    new Color3(1, 0.2, 0.5),
    new Color3(0.5, 0, 1),
  ];

  wallPositions.forEach(([x, _y, z, w, d], i) => {
    const isXWall = w > d;
    const stripW = isXWall ? w : 0.1;
    const stripD = isXWall ? 0.1 : d;
    addNeonStrip(scene, new Vector3(x, 2, z), new Vector3(stripW, 0.15, stripD), neonColors[i % 4], allMeshes);
    addNeonStrip(scene, new Vector3(x, 8, z), new Vector3(stripW, 0.1, stripD), neonColors[(i + 2) % 4], allMeshes);
  });

  // Central structure - raised platform
  const centerMat = makePBR(scene, 'centerMat', new Color3(0.1, 0.12, 0.16), 0.6, 0.4);
  const centerPlatform = MeshBuilder.CreateBox('centerPlat', { width: 16, height: 2, depth: 16 }, scene);
  centerPlatform.position = new Vector3(0, 1, 0);
  centerPlatform.material = centerMat;
  centerPlatform.checkCollisions = true;
  centerPlatform.receiveShadows = true;
  shadowGen.addShadowCaster(centerPlatform);
  allMeshes.push(centerPlatform);

  // Center pillar
  const pillarMat = makePBR(scene, 'pillarMat', new Color3(0.12, 0.14, 0.18), 0.5, 0.5);
  const centerPillar = MeshBuilder.CreateCylinder('centerPillar', { height: 18, diameter: 4, tessellation: 8 }, scene);
  centerPillar.position = new Vector3(0, 9, 0);
  centerPillar.material = pillarMat;
  centerPillar.checkCollisions = true;
  shadowGen.addShadowCaster(centerPillar);
  allMeshes.push(centerPillar);

  // Neon rings on center pillar
  for (let h = 3; h <= 15; h += 4) {
    const ring = MeshBuilder.CreateTorus('ring' + h, { diameter: 5, thickness: 0.15, tessellation: 24 }, scene);
    ring.position = new Vector3(0, h, 0);
    ring.material = makeEmissiveMat(scene, 'ringMat' + h, new Color3(0, 1, 0.8), 3);
    ring.checkCollisions = false;
    allMeshes.push(ring);
  }

  // Ramps to center platform
  const rampMat = makePBR(scene, 'rampMat', new Color3(0.09, 0.11, 0.15), 0.7, 0.3);
  const rampAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
  rampAngles.forEach((angle, i) => {
    const ramp = MeshBuilder.CreateBox(`ramp${i}`, { width: 4, height: 0.3, depth: 10 }, scene);
    const rx = Math.sin(angle) * 12;
    const rz = Math.cos(angle) * 12;
    ramp.position = new Vector3(rx, 1, rz);
    ramp.rotation.x = Math.atan2(2, 10) * (Math.abs(Math.cos(angle)) > 0.5 ? -Math.sign(Math.cos(angle)) : 0);
    ramp.rotation.z = Math.atan2(2, 10) * (Math.abs(Math.sin(angle)) > 0.5 ? Math.sign(Math.sin(angle)) : 0);
    ramp.material = rampMat;
    ramp.checkCollisions = true;
    shadowGen.addShadowCaster(ramp);
    allMeshes.push(ramp);
  });

  // Cover structures around the arena
  const coverMat = makePBR(scene, 'coverMat', new Color3(0.1, 0.1, 0.14), 0.75, 0.25);
  const coverPositions: [number, number, number, number, number][] = [
    [-30, 2, -30, 6, 4],
    [30, 2, -30, 6, 4],
    [-30, 2, 30, 6, 4],
    [30, 2, 30, 6, 4],
    [-50, 1.5, 0, 8, 3],
    [50, 1.5, 0, 8, 3],
    [0, 1.5, -50, 3, 8],
    [0, 1.5, 50, 3, 8],
    [-20, 3, -15, 4, 6],
    [20, 3, 15, 4, 6],
    [-15, 2.5, 25, 5, 5],
    [15, 2.5, -25, 5, 5],
    [-45, 2, -45, 5, 4],
    [45, 2, 45, 5, 4],
    [-40, 1.5, 20, 3, 6],
    [40, 1.5, -20, 3, 6],
  ];

  coverPositions.forEach(([x, h, z, w, d], i) => {
    const cover = MeshBuilder.CreateBox(`cover${i}`, { width: w, height: h * 2, depth: d }, scene);
    cover.position = new Vector3(x, h, z);
    cover.material = coverMat;
    cover.checkCollisions = true;
    cover.receiveShadows = true;
    shadowGen.addShadowCaster(cover);
    allMeshes.push(cover);

    // Neon accent on top edge
    if (i % 3 === 0) {
      addNeonStrip(
        scene,
        new Vector3(x, h * 2 + 0.05, z),
        new Vector3(w + 0.2, 0.1, d + 0.2),
        neonColors[i % 4],
        allMeshes,
      );
    }
  });

  // Elevated sniper perches in corners
  const perchMat = makePBR(scene, 'perchMat', new Color3(0.08, 0.1, 0.16), 0.6, 0.4);
  const corners: [number, number][] = [[-60, -60], [60, -60], [-60, 60], [60, 60]];
  corners.forEach(([cx, cz], i) => {
    // Pillar support
    const support = MeshBuilder.CreateCylinder(`perchSupport${i}`, { height: 8, diameter: 2, tessellation: 6 }, scene);
    support.position = new Vector3(cx, 4, cz);
    support.material = pillarMat;
    support.checkCollisions = true;
    shadowGen.addShadowCaster(support);
    allMeshes.push(support);

    // Platform
    const perch = MeshBuilder.CreateBox(`perch${i}`, { width: 8, height: 0.5, depth: 8 }, scene);
    perch.position = new Vector3(cx, 8, cz);
    perch.material = perchMat;
    perch.checkCollisions = true;
    perch.receiveShadows = true;
    shadowGen.addShadowCaster(perch);
    allMeshes.push(perch);

    // Railings
    for (let side = 0; side < 4; side++) {
      const railing = MeshBuilder.CreateBox(`railing${i}_${side}`, { width: side < 2 ? 8 : 0.15, height: 1.5, depth: side < 2 ? 0.15 : 8 }, scene);
      const rx = cx + (side === 2 ? -4 : side === 3 ? 4 : 0);
      const rz = cz + (side === 0 ? -4 : side === 1 ? 4 : 0);
      railing.position = new Vector3(rx, 9, rz);
      railing.material = coverMat;
      railing.checkCollisions = true;
      allMeshes.push(railing);
    }

    spawnPoints.push(new Vector3(cx, 9, cz));
  });

  // Scattered pillars
  const pillarPositions: [number, number][] = [
    [-20, -40], [20, -40], [-20, 40], [20, 40],
    [-40, -20], [40, -20], [-40, 20], [40, 20],
    [-55, -25], [55, 25], [-25, -55], [25, 55],
  ];

  pillarPositions.forEach(([px, pz], i) => {
    const pillar = MeshBuilder.CreateCylinder(`pillar${i}`, { height: 10, diameter: 2.5, tessellation: 8 }, scene);
    pillar.position = new Vector3(px, 5, pz);
    pillar.material = pillarMat;
    pillar.checkCollisions = true;
    pillar.receiveShadows = true;
    shadowGen.addShadowCaster(pillar);
    allMeshes.push(pillar);

    // Glowing ring
    const pRing = MeshBuilder.CreateTorus(`pring${i}`, { diameter: 3, thickness: 0.1, tessellation: 16 }, scene);
    pRing.position = new Vector3(px, 6 + (i % 3) * 2, pz);
    pRing.material = makeEmissiveMat(scene, `pringMat${i}`, neonColors[i % 4], 2);
    pRing.checkCollisions = false;
    allMeshes.push(pRing);
  });

  // Point lights with neon colors for atmosphere
  const lightPositions: [number, number, number, Color3][] = [
    [-35, 6, -35, new Color3(0, 1, 0.8)],
    [35, 6, -35, new Color3(0, 0.5, 1)],
    [-35, 6, 35, new Color3(1, 0.2, 0.5)],
    [35, 6, 35, new Color3(0.5, 0, 1)],
    [0, 10, 0, new Color3(0, 1, 0.8)],
    [-55, 4, 0, new Color3(0, 0.8, 1)],
    [55, 4, 0, new Color3(1, 0, 0.6)],
    [0, 4, -55, new Color3(0.2, 0.4, 1)],
    [0, 4, 55, new Color3(0, 1, 0.4)],
  ];

  lightPositions.forEach(([lx, ly, lz, color], i) => {
    const light = new PointLight(`ptLight${i}`, new Vector3(lx, ly, lz), scene);
    light.diffuse = color;
    light.intensity = 15;
    light.range = 30;

    // Light orb mesh
    const orb = MeshBuilder.CreateSphere(`lightOrb${i}`, { diameter: 0.5, segments: 8 }, scene);
    orb.position = new Vector3(lx, ly, lz);
    orb.material = makeEmissiveMat(scene, `orbMat${i}`, color, 5);
    orb.checkCollisions = false;
    allMeshes.push(orb);
  });

  // Spawn points for enemies around the arena
  const enemySpawns: [number, number][] = [
    [-65, -65], [65, -65], [-65, 65], [65, 65],
    [-65, 0], [65, 0], [0, -65], [0, 65],
    [-40, -40], [40, -40], [-40, 40], [40, 40],
  ];
  enemySpawns.forEach(([sx, sz]) => {
    spawnPoints.push(new Vector3(sx, 0.5, sz));
  });

  // Pickup locations
  const pickupSpots: [number, number][] = [
    [0, 3], [-30, -30], [30, -30], [-30, 30], [30, 30],
    [-55, 0], [55, 0], [0, -55], [0, 55],
    [-15, -15], [15, 15], [-45, 45], [45, -45],
  ];
  pickupSpots.forEach(([px, pz]) => {
    pickupLocations.push(new Vector3(px, 0.5, pz));
  });

  // Animated decorative elements
  const animatedMeshes: MapData['animatedMeshes'] = [];

  // Floating hexagonal rings in the sky (animated rotation)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 45 + Math.random() * 20;
    const hex = MeshBuilder.CreateTorus(`skyHex${i}`, { diameter: 4 + Math.random() * 3, thickness: 0.1, tessellation: 6 }, scene);
    const yPos = 15 + Math.random() * 8;
    hex.position = new Vector3(
      Math.cos(angle) * radius,
      yPos,
      Math.sin(angle) * radius,
    );
    hex.rotation.x = Math.random() * Math.PI;
    hex.rotation.y = Math.random() * Math.PI;
    hex.material = makeEmissiveMat(scene, `skyHexMat${i}`, neonColors[i % 4], 1.5);
    hex.checkCollisions = false;
    allMeshes.push(hex);
    animatedMeshes.push({
      mesh: hex,
      rotSpeed: new Vector3(0.2 + Math.random() * 0.3, 0.5 + Math.random() * 0.5, 0.1 + Math.random() * 0.2),
      bobSpeed: 0.5 + Math.random() * 0.5,
      bobAmount: 0.5 + Math.random() * 0.5,
      baseY: yPos,
    });
  }

  // Rotating energy rings above cover positions
  const ringPositions: [number, number][] = [[-30, -30], [30, 30], [-50, 0], [50, 0], [0, -50], [0, 50]];
  ringPositions.forEach(([rx, rz], i) => {
    const ring = MeshBuilder.CreateTorus(`floatRing${i}`, { diameter: 3, thickness: 0.08, tessellation: 24 }, scene);
    const ry = 5 + Math.random() * 3;
    ring.position = new Vector3(rx, ry, rz);
    ring.material = makeEmissiveMat(scene, `floatRingMat${i}`, neonColors[i % 4], 2.5);
    ring.checkCollisions = false;
    allMeshes.push(ring);
    animatedMeshes.push({
      mesh: ring,
      rotSpeed: new Vector3(0, 1 + Math.random(), 0.5),
      bobSpeed: 0.8,
      bobAmount: 0.3,
      baseY: ry,
    });
  });

  // Central holographic pillar ring constellation
  for (let i = 0; i < 3; i++) {
    const holoRing = MeshBuilder.CreateTorus(`holoRing${i}`, { diameter: 6 + i * 2, thickness: 0.05, tessellation: 32 }, scene);
    const hry = 12 + i * 3;
    holoRing.position = new Vector3(0, hry, 0);
    holoRing.material = makeEmissiveMat(scene, `holoRingMat${i}`, new Color3(0, 1, 0.8), 3);
    holoRing.checkCollisions = false;
    allMeshes.push(holoRing);
    animatedMeshes.push({
      mesh: holoRing,
      rotSpeed: new Vector3(0.3 * (i + 1), 0.8 * (i % 2 === 0 ? 1 : -1), 0.1),
      bobSpeed: 0.3,
      bobAmount: 0.2,
      baseY: hry,
    });
  }

  return {
    meshes: allMeshes,
    spawnPoints,
    pickupLocations,
    shadowGenerator: shadowGen,
    navMeshBounds: {
      min: new Vector3(-ARENA_SIZE + 2, 0, -ARENA_SIZE + 2),
      max: new Vector3(ARENA_SIZE - 2, 0, ARENA_SIZE - 2),
    },
    animatedMeshes,
  };
}
