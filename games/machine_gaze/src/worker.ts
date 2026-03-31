import {
  pipeline,
  env,
  type DepthEstimationPipeline,
  type ObjectDetectionPipeline,
  type ImageSegmentationPipeline,
} from '@huggingface/transformers';

env.allowLocalModels = false;

let depthPipe: DepthEstimationPipeline | null = null;
let objectsPipe: ObjectDetectionPipeline | null = null;
let segmentsPipe: ImageSegmentationPipeline | null = null;

function onProgress(info: {
  status: string;
  file?: string;
  progress?: number;
  loaded?: number;
  total?: number;
}) {
  if (info.status === 'progress' && info.progress !== undefined) {
    self.postMessage({
      type: 'download-progress',
      file: info.file ?? '',
      progress: info.progress,
      loaded: info.loaded ?? 0,
      total: info.total ?? 0,
    });
  }
}

async function loadPipelines() {
  if (depthPipe) return;
  [depthPipe, objectsPipe, segmentsPipe] = await Promise.all([
    pipeline('depth-estimation', 'Xenova/depth-anything-small-hf', {
      progress_callback: onProgress,
    }) as Promise<DepthEstimationPipeline>,
    pipeline('object-detection', 'Xenova/detr-resnet-50', {
      progress_callback: onProgress,
    }) as Promise<ObjectDetectionPipeline>,
    pipeline('image-segmentation', 'Xenova/detr-resnet-50-panoptic', {
      progress_callback: onProgress,
    }) as Promise<ImageSegmentationPipeline>,
  ]);
}

function normalizeTo255(data: ArrayLike<number>): Uint8Array {
  const out = new Uint8Array(data.length);
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i < data.length; i++) {
    if (data[i] < min) min = data[i];
    if (data[i] > max) max = data[i];
  }
  if (max <= 1 && min >= 0) {
    for (let i = 0; i < data.length; i++) out[i] = Math.round(data[i] * 255);
  } else if (max > 255 || min < 0) {
    const range = max - min || 1;
    for (let i = 0; i < data.length; i++)
      out[i] = Math.round(((data[i] - min) / range) * 255);
  } else {
    for (let i = 0; i < data.length; i++) out[i] = Math.round(data[i]);
  }
  return out;
}

function normalizeMask(data: ArrayLike<number>): Uint8Array {
  const out = new Uint8Array(data.length);
  let maxVal = 0;
  const sampleLen = Math.min(200, data.length);
  for (let i = 0; i < sampleLen; i++) {
    if (data[i] > maxVal) maxVal = data[i];
  }
  const threshold = maxVal <= 1 ? 0.5 : 128;
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] > threshold ? 255 : 0;
  }
  return out;
}

self.onmessage = async (e: MessageEvent) => {
  if (e.data.type !== 'process') return;
  const { imageDataUrl } = e.data;

  try {
    await loadPipelines();
    self.postMessage({ type: 'models-ready' });

    await Promise.all([
      (async () => {
        const result = await depthPipe!(imageDataUrl);
        const raw = (result as any).depth ?? result;
        self.postMessage({
          type: 'task-complete',
          task: 'depth',
          data: {
            depthData: normalizeTo255(raw.data),
            width: raw.width,
            height: raw.height,
          },
        });
      })(),
      (async () => {
        const result = await objectsPipe!(imageDataUrl, {
          threshold: 0.5,
          percentage: true,
        });
        const list = Array.isArray(result) ? result : [result];
        self.postMessage({
          type: 'task-complete',
          task: 'objects',
          data: {
            objects: list
              .filter((o: any) => o.score >= 0.5)
              .map((o: any) => ({
                label: o.label,
                score: o.score,
                box: o.box,
              })),
          },
        });
      })(),
      (async () => {
        const result = await segmentsPipe!(imageDataUrl);
        const list = Array.isArray(result) ? result : [result];
        self.postMessage({
          type: 'task-complete',
          task: 'segments',
          data: {
            segments: list.map((seg: any) => ({
              label: seg.label,
              score: seg.score,
              maskData: normalizeMask(seg.mask.data),
              width: seg.mask.width,
              height: seg.mask.height,
            })),
          },
        });
      })(),
    ]);

    self.postMessage({ type: 'all-complete' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    self.postMessage({ type: 'error', message });
  }
};
