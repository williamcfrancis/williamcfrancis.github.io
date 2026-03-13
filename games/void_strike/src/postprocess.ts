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

    void main(void) {
      vec4 color = texture2D(textureSampler, vUV);
      vec2 center = vUV - 0.5;
      float dist = length(center);
      float vignette = smoothstep(0.2, 0.8, dist);
      color.rgb = mix(color.rgb, vec3(0.6, 0.0, 0.0), vignette * intensity * 0.5);
      float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      color.rgb = mix(color.rgb, vec3(gray), intensity * 0.25);
      gl_FragColor = color;
    }
  `;

  const pp = new PostProcess('damage', 'damage', ['intensity'], null, 1.0, camera);
  let currentIntensity = 0;

  pp.onApply = (effect) => {
    effect.setFloat('intensity', currentIntensity);
  };

  (pp as any).setDamageIntensity = (v: number) => { currentIntensity = v; };
  return pp;
}
