import {
  Scene,
  Camera,
  DefaultRenderingPipeline,
  PostProcess,
  Effect,
  ImageProcessingConfiguration,
  ColorCurves,
} from '@babylonjs/core';

export function setupPostProcessing(scene: Scene, camera: Camera): DefaultRenderingPipeline {
  const pipeline = new DefaultRenderingPipeline('default', false, scene, [camera]);

  // Tighter, brighter bloom: higher threshold + smaller kernel + larger scale
  // = fewer pixels qualify, less blur smear, sharper neon highlights for the same cost.
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.7;
  pipeline.bloomWeight = 0.6;
  pipeline.bloomKernel = 16;
  pipeline.bloomScale = 0.5;

  pipeline.chromaticAberrationEnabled = false;
  pipeline.grainEnabled = false;
  pipeline.sharpenEnabled = false;

  pipeline.fxaaEnabled = true;

  if (pipeline.imageProcessing) {
    const ip = pipeline.imageProcessing;
    ip.contrast = 1.1;
    ip.exposure = 1.2;
    ip.toneMappingEnabled = true;
    ip.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;

    // Neon split-tone: cyan in shadows, magenta in highlights.
    const curves = new ColorCurves();
    curves.shadowsHue = 200;
    curves.shadowsDensity = 18;
    curves.shadowsSaturation = 12;
    curves.midtonesHue = 280;
    curves.midtonesDensity = 4;
    curves.highlightsHue = 320;
    curves.highlightsDensity = 14;
    curves.highlightsSaturation = 10;
    ip.colorCurves = curves;
    ip.colorCurvesEnabled = true;

    ip.vignetteEnabled = true;
    ip.vignetteWeight = 0.4;
    ip.vignetteCentreX = 0.5;
    ip.vignetteCentreY = 0.5;
    ip.vignetteStretch = 0.4;
  }

  return pipeline;
}

// Damage post lazily attaches the first time we get a non-zero intensity, and
// detaches when the flash decays back to zero. The cost of the pass is a full
// fullscreen draw, even for the early-return shader path; lifecycle keeps it
// out of the pipeline when the player isn't taking hits.
export function createDamagePostProcess(scene: Scene, camera: Camera): { setDamageIntensity: (v: number) => void } {
  let damageIntensity = 0;
  let pp: PostProcess | null = null;

  Effect.ShadersStore['damageFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float intensity;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);
      vec2 center = vUV - 0.5;
      float dist = length(center);

      float vignette = smoothstep(0.3, 0.9, dist) * intensity;
      color.rgb = mix(color.rgb, vec3(0.85, 0.05, 0.1), vignette * 0.65);

      float aberration = intensity * 0.01;
      float r = texture2D(textureSampler, vUV + center * aberration).r;
      float b = texture2D(textureSampler, vUV - center * aberration).b;
      color.r = mix(color.r, r, intensity * 0.55);
      color.b = mix(color.b, b, intensity * 0.55);

      gl_FragColor = color;
    }
  `;

  const ensureAttached = (): void => {
    if (pp) return;
    pp = new PostProcess('damage', 'damage', ['intensity'], null, 1.0, camera);
    pp.onApply = (effect) => effect.setFloat('intensity', damageIntensity);
  };

  const detach = (): void => {
    if (!pp) return;
    pp.dispose();
    pp = null;
  };

  return {
    setDamageIntensity: (v: number) => {
      damageIntensity = v;
      if (v > 0.01) ensureAttached();
      else detach();
    },
  };
}

export function createBulletTimePostProcess(scene: Scene, camera: Camera): { setActive: (v: boolean) => void } {
  let active = false;
  let pp: PostProcess | null = null;
  let startTime = 0;

  Effect.ShadersStore['btimeFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float time;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, vec3(gray * 0.55, gray * 0.8, gray * 1.25), 0.4);
      float scan = sin(vUV.y * 420.0 + time * 2.0) * 0.018;
      color.rgb += scan;
      gl_FragColor = color;
    }
  `;

  return {
    setActive: (v: boolean) => {
      if (v === active) return;
      active = v;
      if (active) {
        startTime = performance.now() * 0.001;
        pp = new PostProcess('btime', 'btime', ['time'], null, 1.0, camera);
        pp.onApply = (effect) => effect.setFloat('time', performance.now() * 0.001 - startTime);
      } else if (pp) {
        pp.dispose();
        pp = null;
      }
    },
  };
}
