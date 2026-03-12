import {
  Scene,
  Camera,
  DefaultRenderingPipeline,
  PostProcess,
  Effect,
} from '@babylonjs/core';

export function setupPostProcessing(scene: Scene, camera: Camera): DefaultRenderingPipeline {
  const pipeline = new DefaultRenderingPipeline('default', true, scene, [camera]);

  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.3;
  pipeline.bloomWeight = 0.6;
  pipeline.bloomKernel = 64;
  pipeline.bloomScale = 0.5;

  pipeline.chromaticAberrationEnabled = true;
  pipeline.chromaticAberration.aberrationAmount = 15;
  pipeline.chromaticAberration.radialIntensity = 0.5;

  pipeline.grainEnabled = true;
  pipeline.grain.intensity = 8;
  pipeline.grain.animated = true;

  pipeline.sharpenEnabled = true;
  pipeline.sharpen.edgeAmount = 0.2;

  pipeline.fxaaEnabled = true;

  if (pipeline.imageProcessing) {
    pipeline.imageProcessing.contrast = 1.3;
    pipeline.imageProcessing.exposure = 1.1;
    pipeline.imageProcessing.toneMappingEnabled = true;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 3;
    pipeline.imageProcessing.vignetteCentreX = 0;
    pipeline.imageProcessing.vignetteCentreY = 0;
    pipeline.imageProcessing.vignetteStretch = 0.5;
  }

  return pipeline;
}

export function createDamagePostProcess(scene: Scene, camera: Camera): { setDamageIntensity: (v: number) => void } {
  let damageIntensity = 0;

  Effect.ShadersStore['damageFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float intensity;
    uniform float time;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);

      vec2 center = vUV - 0.5;
      float dist = length(center);

      float vignette = smoothstep(0.3, 0.9, dist) * intensity;
      color.rgb = mix(color.rgb, vec3(0.8, 0.0, 0.0), vignette * 0.6);

      float aberration = intensity * 0.008;
      float r = texture2D(textureSampler, vUV + center * aberration).r;
      float b = texture2D(textureSampler, vUV - center * aberration).b;
      color.r = mix(color.r, r, intensity * 0.5);
      color.b = mix(color.b, b, intensity * 0.5);

      float scanline = sin(vUV.y * 800.0 + time * 10.0) * 0.02 * intensity;
      color.rgb += scanline;

      gl_FragColor = color;
    }
  `;

  const pp = new PostProcess('damage', 'damage', ['intensity', 'time'], null, 1.0, camera);
  pp.onApply = (effect) => {
    effect.setFloat('intensity', damageIntensity);
    effect.setFloat('time', performance.now() * 0.001);
  };

  return {
    setDamageIntensity: (v: number) => { damageIntensity = v; },
  };
}

export function createBulletTimePostProcess(scene: Scene, camera: Camera): { setActive: (v: boolean) => void } {
  let active = false;

  Effect.ShadersStore['btimeFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float active;
    uniform float time;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);

      if (active > 0.5) {
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(color.rgb, vec3(gray * 0.6, gray * 0.8, gray * 1.2), 0.35);

        vec2 center = vUV - 0.5;
        float dist = length(center);
        float radialBlur = dist * 0.003;
        vec4 blurred = vec4(0.0);
        for (int i = 0; i < 4; i++) {
          float t = float(i) / 4.0;
          blurred += texture2D(textureSampler, vUV + center * radialBlur * t);
        }
        blurred /= 4.0;
        color = mix(color, blurred, 0.3);

        float scan = sin(vUV.y * 400.0 + time * 2.0) * 0.015;
        color.rgb += scan;
      }

      gl_FragColor = color;
    }
  `;

  const pp = new PostProcess('btime', 'btime', ['active', 'time'], null, 1.0, camera);
  pp.onApply = (effect) => {
    effect.setFloat('active', active ? 1.0 : 0.0);
    effect.setFloat('time', performance.now() * 0.001);
  };

  return {
    setActive: (v: boolean) => { active = v; },
  };
}
