/**
 * Canny-style edge detection operating entirely on CPU via canvas ImageData.
 * Pipeline: grayscale → Gaussian blur (3×3) → Sobel gradients → non-max
 * suppression → hysteresis thresholding.
 */
export function detectEdges(imageData: ImageData): ImageData {
  const { width: w, height: h, data } = imageData;

  const gray = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const j = i * 4;
    gray[i] = 0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
  }

  const blurred = gaussianBlur3x3(gray, w, h);

  const gx = new Float32Array(w * h);
  const gy = new Float32Array(w * h);
  const mag = new Float32Array(w * h);
  const dir = new Float32Array(w * h);

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const tl = blurred[(y - 1) * w + (x - 1)];
      const tc = blurred[(y - 1) * w + x];
      const tr = blurred[(y - 1) * w + (x + 1)];
      const ml = blurred[y * w + (x - 1)];
      const mr = blurred[y * w + (x + 1)];
      const bl = blurred[(y + 1) * w + (x - 1)];
      const bc = blurred[(y + 1) * w + x];
      const br = blurred[(y + 1) * w + (x + 1)];

      gx[idx] = -tl + tr - 2 * ml + 2 * mr - bl + br;
      gy[idx] = -tl - 2 * tc - tr + bl + 2 * bc + br;
      mag[idx] = Math.sqrt(gx[idx] * gx[idx] + gy[idx] * gy[idx]);
      dir[idx] = Math.atan2(gy[idx], gx[idx]);
    }
  }

  const nms = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const angle = ((dir[idx] * 180) / Math.PI + 180) % 180;
      let m1 = 0;
      let m2 = 0;

      if (angle < 22.5 || angle >= 157.5) {
        m1 = mag[idx - 1];
        m2 = mag[idx + 1];
      } else if (angle < 67.5) {
        m1 = mag[(y - 1) * w + (x + 1)];
        m2 = mag[(y + 1) * w + (x - 1)];
      } else if (angle < 112.5) {
        m1 = mag[(y - 1) * w + x];
        m2 = mag[(y + 1) * w + x];
      } else {
        m1 = mag[(y - 1) * w + (x - 1)];
        m2 = mag[(y + 1) * w + (x + 1)];
      }

      nms[idx] = mag[idx] >= m1 && mag[idx] >= m2 ? mag[idx] : 0;
    }
  }

  let sum = 0;
  let count = 0;
  for (let i = 0; i < w * h; i++) {
    if (nms[i] > 0) {
      sum += nms[i];
      count++;
    }
  }
  const mean = count > 0 ? sum / count : 50;
  const lo = mean * 0.4;
  const hi = mean * 1.1;

  // 0 = non-edge, 1 = weak, 2 = strong
  const strength = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    if (nms[i] >= hi) strength[i] = 2;
    else if (nms[i] >= lo) strength[i] = 1;
  }

  const result = new Uint8Array(w * h);
  const stack: number[] = [];

  for (let i = 0; i < w * h; i++) {
    if (strength[i] === 2) {
      result[i] = 255;
      stack.push(i);
    }
  }

  while (stack.length > 0) {
    const idx = stack.pop()!;
    const cy = (idx / w) | 0;
    const cx = idx % w;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const ny = cy + dy;
        const nx = cx + dx;
        if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
          const ni = ny * w + nx;
          if (strength[ni] === 1 && result[ni] === 0) {
            result[ni] = 255;
            stack.push(ni);
          }
        }
      }
    }
  }

  const output = new ImageData(w, h);
  for (let i = 0; i < w * h; i++) {
    const v = result[i];
    output.data[i * 4] = v;
    output.data[i * 4 + 1] = v;
    output.data[i * 4 + 2] = v;
    output.data[i * 4 + 3] = v;
  }
  return output;
}

function gaussianBlur3x3(
  src: Float32Array,
  w: number,
  h: number,
): Float32Array {
  const out = new Float32Array(w * h);
  // Kernel [1 2 1; 2 4 2; 1 2 1] / 16
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      out[y * w + x] =
        (src[(y - 1) * w + (x - 1)] +
          2 * src[(y - 1) * w + x] +
          src[(y - 1) * w + (x + 1)] +
          2 * src[y * w + (x - 1)] +
          4 * src[y * w + x] +
          2 * src[y * w + (x + 1)] +
          src[(y + 1) * w + (x - 1)] +
          2 * src[(y + 1) * w + x] +
          src[(y + 1) * w + (x + 1)]) /
        16;
    }
  }
  return out;
}
