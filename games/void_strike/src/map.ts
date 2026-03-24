import {
  Scene,
  MeshBuilder,
  Vector3,
  Color3,
  Color4,
  Mesh,
  HemisphericLight,
  DirectionalLight,
  StandardMaterial,
  Texture,
  GlowLayer,
  ShadowGenerator,
  PointLight,
} from '@babylonjs/core';

const ARENA_SIZE = 80;
const WALL_HEIGHT = 12;

function makeStdMat(scene: Scene, name: string, color: Color3, emissive?: Color3): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = new Color3(0.15, 0.15, 0.15);
  if (emissive) mat.emissiveColor = emissive;
  mat.freeze();
  return mat;
}

function makeMetalMat(scene: Scene, name: string, color: Color3, specPower = 64): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.specularColor = new Color3(0.4, 0.4, 0.45);
  mat.specularPower = specPower;
  mat.freeze();
  return mat;
}

function makeGlowMat(scene: Scene, name: string, color: Color3, intensity = 0.6): StandardMaterial {
  const mat = new StandardMaterial(name, scene);
  mat.diffuseColor = color;
  mat.emissiveColor = color.scale(intensity);
  mat.specularColor = Color3.Black();
  mat.freeze();
  return mat;
}

function createProceduralSkybox(scene: Scene): void {
  const skybox = MeshBuilder.CreateBox('skybox', { size: 600 }, scene);
  const skyMat = new StandardMaterial('skyMat', scene);
  skyMat.backFaceCulling = false;
  skyMat.disableLighting = true;
  skyMat.diffuseColor = Color3.Black();
  skyMat.specularColor = Color3.Black();
  skyMat.emissiveColor = new Color3(0.02, 0.03, 0.06);
  skyMat.freeze();
  skybox.material = skyMat;
  skybox.infiniteDistance = true;
  skybox.isPickable = false;
  skybox.checkCollisions = false;
}

function createFloorTexture(scene: Scene): Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#3a3e46';
  ctx.fillRect(0, 0, size, size);

  const tileSize = 64;
  ctx.strokeStyle = '#2e3138';
  ctx.lineWidth = 2;
  for (let x = 0; x <= size; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  for (let x = 0; x < size; x += tileSize) {
    for (let y = 0; y < size; y += tileSize) {
      const brightness = 0.96 + Math.random() * 0.08;
      ctx.fillStyle = `rgba(${Math.floor(58 * brightness)}, ${Math.floor(62 * brightness)}, ${Math.floor(70 * brightness)}, 0.4)`;
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

      if (Math.random() > 0.7) {
        ctx.fillStyle = 'rgba(80, 200, 160, 0.04)';
        ctx.fillRect(x + 4, y + 4, tileSize - 8, 2);
      }
    }
  }

  const tex = new Texture(canvas.toDataURL(), scene);
  tex.uScale = 10;
  tex.vScale = 10;
  return tex;
}

function createWallTexture(scene: Scene): Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#4a4e56';
  ctx.fillRect(0, 0, size, size);

  const panelH = 64;
  ctx.strokeStyle = '#3e4248';
  ctx.lineWidth = 2;
  for (let y = 0; y <= size; y += panelH) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
  for (let x = 0; x <= size; x += panelH) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  for (let x = 0; x < size; x += panelH) {
    for (let y = 0; y < size; y += panelH) {
      ctx.fillStyle = `rgba(60, 64, 72, ${0.2 + Math.random() * 0.3})`;
      ctx.fillRect(x + 3, y + 3, panelH - 6, panelH - 6);
      ctx.strokeStyle = '#555a62';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 3, y + 3, panelH - 6, panelH - 6);

      if (Math.random() > 0.6) {
        ctx.fillStyle = 'rgba(100, 110, 120, 0.3)';
        const bw = 10 + Math.random() * 20;
        ctx.fillRect(x + panelH / 2 - bw / 2, y + panelH - 10, bw, 4);
      }
    }
  }

  const tex = new Texture(canvas.toDataURL(), scene);
  tex.uScale = 4;
  tex.vScale = 2;
  return tex;
}

export interface MapData {
  meshes: Mesh[];
  spawnPoints: Vector3[];
  pickupLocations: Vector3[];
  shadowGenerator: ShadowGenerator | null;
  navMeshBounds: { min: Vector3; max: Vector3 };
  animatedMeshes: { mesh: Mesh; rotSpeed: Vector3; bobSpeed: number; bobAmount: number; baseY: number }[];
  glowLayer: GlowLayer | null;
}

export function buildMap(scene: Scene): MapData {
  const allMeshes: Mesh[] = [];
  const spawnPoints: Vector3[] = [];
  const pickupLocations: Vector3[] = [];

  scene.clearColor = new Color4(0.04, 0.05, 0.08, 1);
  scene.ambientColor = new Color3(0.15, 0.15, 0.2);

  scene.fogMode = Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.006;
  scene.fogColor = new Color3(0.04, 0.06, 0.1);

  createProceduralSkybox(scene);

  const glowLayer = new GlowLayer('glow', scene, { mainTextureSamples: 1, blurKernelSize: 32 });
  glowLayer.intensity = 0.6;

  const hemi = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
  hemi.intensity = 0.45;
  hemi.diffuse = new Color3(0.6, 0.65, 0.8);
  hemi.groundColor = new Color3(0.1, 0.1, 0.15);

  const dirLight = new DirectionalLight('dir', new Vector3(-0.5, -1, 0.3).normalize(), scene);
  dirLight.intensity = 0.7;
  dirLight.diffuse = new Color3(0.7, 0.75, 1);

  const shadowGen = new ShadowGenerator(1024, dirLight);
  shadowGen.useBlurExponentialShadowMap = true;
  shadowGen.blurKernel = 16;
  shadowGen.setDarkness(0.6);

  const floorTex = createFloorTexture(scene);
  const floorMat = new StandardMaterial('floorMat', scene);
  floorMat.diffuseTexture = floorTex;
  floorMat.diffuseColor = new Color3(0.45, 0.48, 0.52);
  floorMat.specularColor = new Color3(0.15, 0.15, 0.2);
  floorMat.specularPower = 32;
  floorMat.freeze();

  const floor = MeshBuilder.CreateGround('floor', { width: ARENA_SIZE * 2, height: ARENA_SIZE * 2, subdivisions: 1 }, scene);
  floor.material = floorMat;
  floor.checkCollisions = true;
  floor.isPickable = false;
  floor.receiveShadows = true;
  allMeshes.push(floor);

  const edgeGlowMat = makeGlowMat(scene, 'edgeGlowCyan', new Color3(0.1, 0.8, 0.6), 0.5);
  const edgeGlowPurple = makeGlowMat(scene, 'edgeGlowPurple', new Color3(0.5, 0.2, 0.9), 0.5);

  const gridSpacing = 20;
  const gridMat = makeStdMat(scene, 'gridMat', new Color3(0.2, 0.22, 0.26));
  for (let x = -ARENA_SIZE; x <= ARENA_SIZE; x += gridSpacing) {
    const lineX = MeshBuilder.CreateBox('gx', { width: 0.06, height: 0.015, depth: ARENA_SIZE * 2 }, scene);
    lineX.position = new Vector3(x, 0.008, 0);
    lineX.material = gridMat;
    lineX.checkCollisions = false;
    lineX.isPickable = false;
    lineX.freezeWorldMatrix();
    allMeshes.push(lineX);

    const lineZ = MeshBuilder.CreateBox('gz', { width: ARENA_SIZE * 2, height: 0.015, depth: 0.06 }, scene);
    lineZ.position = new Vector3(0, 0.008, x);
    lineZ.material = gridMat;
    lineZ.checkCollisions = false;
    lineZ.isPickable = false;
    lineZ.freezeWorldMatrix();
    allMeshes.push(lineZ);
  }

  const wallTex = createWallTexture(scene);
  const wallMat = new StandardMaterial('wallMat', scene);
  wallMat.diffuseTexture = wallTex;
  wallMat.diffuseColor = new Color3(0.4, 0.42, 0.48);
  wallMat.specularColor = new Color3(0.12, 0.12, 0.15);
  wallMat.specularPower = 24;
  wallMat.freeze();

  const wallPositions: [number, number, number, number, number][] = [
    [0, WALL_HEIGHT / 2, -ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [0, WALL_HEIGHT / 2, ARENA_SIZE, ARENA_SIZE * 2, WALL_HEIGHT],
    [-ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
    [ARENA_SIZE, WALL_HEIGHT / 2, 0, WALL_HEIGHT, ARENA_SIZE * 2],
  ];

  const accentColors = [
    new Color3(0.1, 0.5, 0.9),
    new Color3(0.9, 0.15, 0.2),
    new Color3(0.1, 0.75, 0.4),
    new Color3(0.85, 0.55, 0.05),
  ];

  wallPositions.forEach(([x, y, z, w, d], i) => {
    const wall = MeshBuilder.CreateBox(`wall${i}`, { width: w + 1, height: WALL_HEIGHT, depth: d + 1 }, scene);
    wall.position = new Vector3(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    wall.receiveShadows = true;
    wall.freezeWorldMatrix();
    allMeshes.push(wall);

    const isXWall = w > d;
    const stripW = isXWall ? w : 0.15;
    const stripD = isXWall ? 0.15 : d;

    const bandTop = MeshBuilder.CreateBox(`bandTop${i}`, { width: stripW, height: 0.3, depth: stripD }, scene);
    bandTop.position = new Vector3(x, WALL_HEIGHT - 0.5, z);
    bandTop.material = makeGlowMat(scene, `bandTopMat${i}`, accentColors[i], 0.7);
    bandTop.checkCollisions = false;
    bandTop.isPickable = false;
    bandTop.freezeWorldMatrix();
    allMeshes.push(bandTop);

    const bandBot = MeshBuilder.CreateBox(`bandBot${i}`, { width: stripW, height: 0.15, depth: stripD }, scene);
    bandBot.position = new Vector3(x, 0.1, z);
    bandBot.material = makeGlowMat(scene, `bandBotMat${i}`, accentColors[i], 0.35);
    bandBot.checkCollisions = false;
    bandBot.isPickable = false;
    bandBot.freezeWorldMatrix();
    allMeshes.push(bandBot);

    const midBand = MeshBuilder.CreateBox(`bandMid${i}`, { width: stripW, height: 0.08, depth: stripD }, scene);
    midBand.position = new Vector3(x, WALL_HEIGHT * 0.45, z);
    midBand.material = makeGlowMat(scene, `bandMidMat${i}`, accentColors[i], 0.2);
    midBand.checkCollisions = false;
    midBand.isPickable = false;
    midBand.freezeWorldMatrix();
    allMeshes.push(midBand);
  });

  const centerMat = makeMetalMat(scene, 'centerMat', new Color3(0.38, 0.4, 0.45), 48);
  const centerPlatform = MeshBuilder.CreateBox('centerPlat', { width: 16, height: 2, depth: 16 }, scene);
  centerPlatform.position = new Vector3(0, 1, 0);
  centerPlatform.material = centerMat;
  centerPlatform.checkCollisions = true;
  centerPlatform.receiveShadows = true;
  shadowGen.addShadowCaster(centerPlatform);
  centerPlatform.freezeWorldMatrix();
  allMeshes.push(centerPlatform);

  for (const edge of [
    { w: 16, d: 0.12, x: 0, z: -8 },
    { w: 16, d: 0.12, x: 0, z: 8 },
    { w: 0.12, d: 16, x: -8, z: 0 },
    { w: 0.12, d: 16, x: 8, z: 0 },
  ]) {
    const strip = MeshBuilder.CreateBox('cEdge', { width: edge.w, height: 0.1, depth: edge.d }, scene);
    strip.position = new Vector3(edge.x, 2.06, edge.z);
    strip.material = edgeGlowMat;
    strip.checkCollisions = false;
    strip.isPickable = false;
    strip.freezeWorldMatrix();
    allMeshes.push(strip);
  }

  const pillarMat = makeMetalMat(scene, 'pillarMat', new Color3(0.42, 0.44, 0.5), 48);

  const centerPillar = MeshBuilder.CreateCylinder('centerPillar', { height: 18, diameter: 4, tessellation: 12 }, scene);
  centerPillar.position = new Vector3(0, 9, 0);
  centerPillar.material = pillarMat;
  centerPillar.checkCollisions = true;
  shadowGen.addShadowCaster(centerPillar);
  centerPillar.freezeWorldMatrix();
  allMeshes.push(centerPillar);

  const pillarGlow = MeshBuilder.CreateCylinder('cpGlow', { height: 16, diameter: 4.15, tessellation: 12 }, scene);
  pillarGlow.position = new Vector3(0, 9, 0);
  pillarGlow.material = makeGlowMat(scene, 'cpGlowMat', new Color3(0.1, 0.6, 0.5), 0.15);
  pillarGlow.checkCollisions = false;
  pillarGlow.isPickable = false;
  pillarGlow.freezeWorldMatrix();
  allMeshes.push(pillarGlow);

  for (let ring = 0; ring < 3; ring++) {
    const ringMesh = MeshBuilder.CreateTorus(`cpRing${ring}`, { diameter: 4.5, thickness: 0.12, tessellation: 16 }, scene);
    ringMesh.position = new Vector3(0, 4 + ring * 5, 0);
    ringMesh.material = edgeGlowMat;
    ringMesh.checkCollisions = false;
    ringMesh.isPickable = false;
    ringMesh.freezeWorldMatrix();
    allMeshes.push(ringMesh);
  }

  const rampMat = makeMetalMat(scene, 'rampMat', new Color3(0.36, 0.38, 0.42));
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
    ramp.receiveShadows = true;
    shadowGen.addShadowCaster(ramp);
    ramp.freezeWorldMatrix();
    allMeshes.push(ramp);

    const rampEdge = MeshBuilder.CreateBox(`rampEdge${i}`, { width: 4, height: 0.06, depth: 0.12 }, scene);
    rampEdge.position = ramp.position.clone();
    rampEdge.position.y += 0.2;
    rampEdge.rotation = ramp.rotation.clone();
    rampEdge.material = edgeGlowMat;
    rampEdge.checkCollisions = false;
    rampEdge.isPickable = false;
    rampEdge.freezeWorldMatrix();
    allMeshes.push(rampEdge);
  });

  const coverMat = makeMetalMat(scene, 'coverMat', new Color3(0.32, 0.35, 0.4), 32);
  const coverTrimMat = makeStdMat(scene, 'coverTrim', new Color3(0.25, 0.27, 0.32));
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
    cover.freezeWorldMatrix();
    allMeshes.push(cover);

    const topTrim = MeshBuilder.CreateBox(`coverTrim${i}`, { width: w + 0.1, height: 0.08, depth: d + 0.1 }, scene);
    topTrim.position = new Vector3(x, h * 2 + 0.04, z);
    topTrim.material = i % 2 === 0 ? edgeGlowMat : edgeGlowPurple;
    topTrim.checkCollisions = false;
    topTrim.isPickable = false;
    topTrim.freezeWorldMatrix();
    allMeshes.push(topTrim);

    if (w >= 5 || d >= 5) {
      const panelW = w > d ? w * 0.6 : 0.08;
      const panelD = w > d ? 0.08 : d * 0.6;
      const panelH = h * 0.4;
      const panel = MeshBuilder.CreateBox(`coverPanel${i}`, { width: panelW, height: panelH, depth: panelD }, scene);
      panel.position = new Vector3(x, h * 0.8, z + (w > d ? d / 2 + 0.04 : 0));
      panel.material = coverTrimMat;
      panel.checkCollisions = false;
      panel.isPickable = false;
      panel.freezeWorldMatrix();
      allMeshes.push(panel);
    }
  });

  const perchMat = makeMetalMat(scene, 'perchMat', new Color3(0.4, 0.42, 0.48), 48);
  const corners: [number, number][] = [[-60, -60], [60, -60], [-60, 60], [60, 60]];
  corners.forEach(([cx, cz], i) => {
    const support = MeshBuilder.CreateCylinder(`ps${i}`, { height: 8, diameter: 2, tessellation: 8 }, scene);
    support.position = new Vector3(cx, 4, cz);
    support.material = pillarMat;
    support.checkCollisions = true;
    shadowGen.addShadowCaster(support);
    support.freezeWorldMatrix();
    allMeshes.push(support);

    const supportRing = MeshBuilder.CreateTorus(`psRing${i}`, { diameter: 2.4, thickness: 0.1, tessellation: 12 }, scene);
    supportRing.position = new Vector3(cx, 7, cz);
    supportRing.material = edgeGlowMat;
    supportRing.checkCollisions = false;
    supportRing.isPickable = false;
    supportRing.freezeWorldMatrix();
    allMeshes.push(supportRing);

    const perch = MeshBuilder.CreateBox(`perch${i}`, { width: 8, height: 0.5, depth: 8 }, scene);
    perch.position = new Vector3(cx, 8, cz);
    perch.material = perchMat;
    perch.checkCollisions = true;
    perch.receiveShadows = true;
    shadowGen.addShadowCaster(perch);
    perch.freezeWorldMatrix();
    allMeshes.push(perch);

    for (const edge of [
      { w: 8, d: 0.08, ex: 0, ez: -4 },
      { w: 8, d: 0.08, ex: 0, ez: 4 },
      { w: 0.08, d: 8, ex: -4, ez: 0 },
      { w: 0.08, d: 8, ex: 4, ez: 0 },
    ]) {
      const pEdge = MeshBuilder.CreateBox(`pEdge${i}`, { width: edge.w, height: 0.06, depth: edge.d }, scene);
      pEdge.position = new Vector3(cx + edge.ex, 8.28, cz + edge.ez);
      pEdge.material = edgeGlowPurple;
      pEdge.checkCollisions = false;
      pEdge.isPickable = false;
      pEdge.freezeWorldMatrix();
      allMeshes.push(pEdge);
    }

    for (let side = 0; side < 4; side++) {
      const railing = MeshBuilder.CreateBox(`rail${i}_${side}`, { width: side < 2 ? 8 : 0.15, height: 1.5, depth: side < 2 ? 0.15 : 8 }, scene);
      const rxp = cx + (side === 2 ? -4 : side === 3 ? 4 : 0);
      const rzp = cz + (side === 0 ? -4 : side === 1 ? 4 : 0);
      railing.position = new Vector3(rxp, 9, rzp);
      railing.material = coverMat;
      railing.checkCollisions = true;
      railing.freezeWorldMatrix();
      allMeshes.push(railing);
    }

    const perchLight = new PointLight(`pLight${i}`, new Vector3(cx, 9.5, cz), scene);
    perchLight.diffuse = accentColors[i];
    perchLight.intensity = 0.5;
    perchLight.range = 15;

    spawnPoints.push(new Vector3(cx, 9, cz));
  });

  const pillarPositions: [number, number][] = [
    [-20, -40], [20, -40], [-20, 40], [20, 40],
    [-40, -20], [40, -20], [-40, 20], [40, 20],
    [-55, -25], [55, 25], [-25, -55], [25, 55],
  ];

  pillarPositions.forEach(([px, pz], i) => {
    const pillar = MeshBuilder.CreateCylinder(`pil${i}`, { height: 10, diameter: 2.5, tessellation: 10 }, scene);
    pillar.position = new Vector3(px, 5, pz);
    pillar.material = pillarMat;
    pillar.checkCollisions = true;
    shadowGen.addShadowCaster(pillar);
    pillar.freezeWorldMatrix();
    allMeshes.push(pillar);

    const pilRing = MeshBuilder.CreateTorus(`pilRing${i}`, { diameter: 2.8, thickness: 0.08, tessellation: 10 }, scene);
    pilRing.position = new Vector3(px, 1, pz);
    pilRing.material = i % 2 === 0 ? edgeGlowMat : edgeGlowPurple;
    pilRing.checkCollisions = false;
    pilRing.isPickable = false;
    pilRing.freezeWorldMatrix();
    allMeshes.push(pilRing);
  });

  const enemySpawns: [number, number][] = [
    [-65, -65], [65, -65], [-65, 65], [65, 65],
    [-65, 0], [65, 0], [0, -65], [0, 65],
    [-40, -40], [40, -40], [-40, 40], [40, 40],
  ];
  enemySpawns.forEach(([sx, sz]) => {
    spawnPoints.push(new Vector3(sx, 0.5, sz));
  });

  const pickupSpots: [number, number][] = [
    [0, 3], [-30, -30], [30, -30], [-30, 30], [30, 30],
    [-55, 0], [55, 0], [0, -55], [0, 55],
    [-15, -15], [15, 15], [-45, 45], [45, -45],
  ];
  pickupSpots.forEach(([px, pz]) => {
    pickupLocations.push(new Vector3(px, 0.5, pz));
  });

  return {
    meshes: allMeshes,
    spawnPoints,
    pickupLocations,
    shadowGenerator: shadowGen,
    navMeshBounds: {
      min: new Vector3(-ARENA_SIZE + 2, 0, -ARENA_SIZE + 2),
      max: new Vector3(ARENA_SIZE - 2, 0, ARENA_SIZE - 2),
    },
    animatedMeshes: [],
    glowLayer,
  };
}
