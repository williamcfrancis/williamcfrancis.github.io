import {
  Scene,
  Camera,
  DefaultRenderingPipeline,
  PostProcess,
  Effect,
} from '@babylonjs/core';

export function setupPostProcessing(scene: Scene, camera: Camera): DefaultRenderingPipeline {
  const pipeline = new DefaultRenderingPipeline('default', false, scene, [camera]);

  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.5;
  pipeline.bloomWeight = 0.4;
  pipeline.bloomKernel = 24;
  pipeline.bloomScale = 0.25;

  pipeline.chromaticAberrationEnabled = false;
  pipeline.grainEnabled = false;
  pipeline.sharpenEnabled = false;

  pipeline.fxaaEnabled = true;

  if (pipeline.imageProcessing) {
    pipeline.imageProcessing.contrast = 1.15;
    pipeline.imageProcessing.exposure = 1.1;
    pipeline.imageProcessing.toneMappingEnabled = true;
    pipeline.imageProcessing.vignetteEnabled = true;
    pipeline.imageProcessing.vignetteWeight = 0.6;
    pipeline.imageProcessing.vignetteCentreX = 0.5;
    pipeline.imageProcessing.vignetteCentreY = 0.5;
    pipeline.imageProcessing.vignetteStretch = 0.4;
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

      if (intensity < 0.01) {
        gl_FragColor = color;
        return;
      }

      vec2 center = vUV - 0.5;
      float dist = length(center);

      float vignette = smoothstep(0.3, 0.9, dist) * intensity;
      color.rgb = mix(color.rgb, vec3(0.8, 0.0, 0.0), vignette * 0.6);

      float aberration = intensity * 0.008;
      float r = texture2D(textureSampler, vUV + center * aberration).r;
      float b = texture2D(textureSampler, vUV - center * aberration).b;
      color.r = mix(color.r, r, intensity * 0.5);
      color.b = mix(color.b, b, intensity * 0.5);

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
    uniform float enabled;
    uniform float time;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);

      if (enabled < 0.5) {
        gl_FragColor = color;
        return;
      }

      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, vec3(gray * 0.6, gray * 0.8, gray * 1.2), 0.35);

      float scan = sin(vUV.y * 400.0 + time * 2.0) * 0.015;
      color.rgb += scan;

      gl_FragColor = color;
    }
  `;

  const pp = new PostProcess('btime', 'btime', ['enabled', 'time'], null, 1.0, camera);
  pp.onApply = (effect) => {
    effect.setFloat('enabled', active ? 1.0 : 0.0);
    effect.setFloat('time', performance.now() * 0.001);
  };

  return {
    setActive: (v: boolean) => { active = v; },
  };
}
