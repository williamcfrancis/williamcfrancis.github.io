import {
  Scene,
  Camera,
  PostProcess,
  Effect,
} from '@babylonjs/core';

export function setupPostProcessing(_scene: Scene, _camera: Camera): null {
  return null;
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

      // Subtle chromatic aberration on damage
      float aberration = intensity * 0.003;
      float r = texture2D(textureSampler, vUV + vec2(aberration, 0.0)).r;
      float b = texture2D(textureSampler, vUV - vec2(aberration, 0.0)).b;
      color.r = mix(color.r, r, intensity * 0.6);
      color.b = mix(color.b, b, intensity * 0.6);

      // Vignette
      vec2 center = vUV - 0.5;
      float dist = length(center);
      float vignette = smoothstep(0.15, 0.75, dist);
      color.rgb = mix(color.rgb, vec3(0.5, 0.0, 0.0), vignette * intensity * 0.55);

      // Desaturation
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, vec3(gray), intensity * 0.3);

      // Film grain on damage
      float grain = fract(sin(dot(vUV * time, vec2(12.9898, 78.233))) * 43758.5453);
      color.rgb += (grain - 0.5) * intensity * 0.06;

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
