import { g as r, h as n } from "./index-bfRfrXxY.js";
class d {
  constructor() {
    this.supportCascades = false;
  }
  loadCubeData() {
    throw ".env not supported in Cube.";
  }
  loadData(e, t, o) {
    const s = new Uint8Array(e.buffer, e.byteOffset, e.byteLength), a = r(s);
    o(a.width, a.height, t.generateMipMaps, false, () => {
      n(t, s);
    });
  }
}
export {
  d as _TGATextureLoader
};
