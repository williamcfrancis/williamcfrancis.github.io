import {
  Scene,
  Camera,
  PostProcess,
  Effect,
  DefaultRenderingPipeline,
  Color3,
  Color4,
  SSAO2RenderingPipeline,
} from '@babylonjs/core';

export function setupPostProcessing(scene: Scene, camera: Camera): DefaultRenderingPipeline {
  const pipeline = new DefaultRenderingPipeline('defaultPipeline', true, scene, [camera]);

  // Bloom
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.4;
  pipeline.bloomWeight = 0.5;
  pipeline.bloomKernel = 64;
  pipeline.bloomScale = 0.5;

  // Tone mapping
  pipeline.imageProcessingEnabled = true;
  pipeline.imageProcessing.toneMappingEnabled = true;
  pipeline.imageProcessing.toneMappingType = 1; // ACES
  pipeline.imageProcessing.contrast = 1.3;
  pipeline.imageProcessing.exposure = 1.1;

  // Vignette
  pipeline.imageProcessing.vignetteEnabled = true;
  pipeline.imageProcessing.vignetteWeight = 1.5;
  pipeline.imageProcessing.vignetteColor = new Color4(0, 0.02, 0.05, 1);
  pipeline.imageProcessing.vignetteStretch = 0;

  // Chromatic aberration
  pipeline.chromaticAberrationEnabled = true;
  pipeline.chromaticAberration.aberrationAmount = 15;
  pipeline.chromaticAberration.radialIntensity = 0.8;

  // Grain
  pipeline.grainEnabled = true;
  pipeline.grain.intensity = 8;
  pipeline.grain.animated = true;

  // Sharpen
  pipeline.sharpenEnabled = true;
  pipeline.sharpen.edgeAmount = 0.2;
  pipeline.sharpen.colorAmount = 1;

  // Anti-aliasing
  pipeline.fxaaEnabled = true;

  return pipeline;
}

export function createDamagePostProcess(scene: Scene, camera: Camera): PostProcess {
  Effect.ShadersStore['damageFragmentShader'] = `
    precision highp float;
    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float intensity;
    uniform float time;

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);

      // Red vignette
      vec2 center = vUV - 0.5;
      float dist = length(center);
      float vignette = smoothstep(0.2, 0.8, dist);
      color.rgb = mix(color.rgb, vec3(0.5, 0.0, 0.0), vignette * intensity * 0.6);

      // Slight desaturation
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, vec3(gray), intensity * 0.3);

      // Slight blur effect via UV distortion
      float distortion = intensity * 0.003 * sin(time * 10.0 + vUV.y * 20.0);
      vec4 distorted = texture2D(textureSampler, vUV + vec2(distortion, 0.0));
      color.rgb = mix(color.rgb, distorted.rgb, intensity * 0.2);

      gl_FragColor = color;
    }
  `;

  const pp = new PostProcess('damage', 'damage', ['intensity', 'time'], null, 1.0, camera);
  let currentIntensity = 0;

  pp.onApply = (effect) => {
    effect.setFloat('intensity', currentIntensity);
    effect.setFloat('time', performance.now() * 0.001);
  };

  (pp as any).setDamageIntensity = (v: number) => { currentIntensity = v; };
  return pp;
}
