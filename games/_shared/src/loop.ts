export interface LoopCallbacks {
  /** Fixed-rate update (called 0-N times per frame at exactly `dt` seconds). */
  update(dt: number): void;
  /** Variable-rate render (called once per frame with interpolation alpha 0-1). */
  render(alpha: number): void;
}

export interface LoopHandle {
  /** Start the loop. No-op if already running. */
  start(): void;
  /** Stop the loop. No-op if already stopped. */
  stop(): void;
  /** True while the loop is actively ticking. */
  readonly running: boolean;
  /** Measured frames-per-second (updated every second). */
  readonly fps: number;
}

/**
 * Create a fixed-timestep game loop with variable rendering.
 *
 * @param callbacks  update() and render() to call each frame
 * @param tickRate   Fixed updates per second (default 60)
 *
 * Usage:
 *   const loop = createLoop({ update(dt) { ... }, render(alpha) { ... } });
 *   loop.start();
 *   // later:
 *   loop.stop();
 */
export function createLoop(callbacks: LoopCallbacks, tickRate = 60): LoopHandle {
  const dt = 1 / tickRate;
  const maxAccum = dt * 5;
  let accum = 0;
  let lastTime = 0;
  let rafId = 0;
  let running = false;
  let fps = 0;
  let frameCount = 0;
  let fpsTimer = 0;

  function frame(now: number) {
    rafId = requestAnimationFrame(frame);
    if (lastTime === 0) lastTime = now;
    const elapsed = Math.min((now - lastTime) / 1000, maxAccum);
    lastTime = now;
    accum += elapsed;

    while (accum >= dt) {
      callbacks.update(dt);
      accum -= dt;
    }

    callbacks.render(accum / dt);

    frameCount++;
    fpsTimer += elapsed;
    if (fpsTimer >= 1) {
      fps = frameCount;
      frameCount = 0;
      fpsTimer -= 1;
    }
  }

  return {
    start() {
      if (running) return;
      running = true;
      lastTime = 0;
      accum = 0;
      frameCount = 0;
      fpsTimer = 0;
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
    },
    get running() {
      return running;
    },
    get fps() {
      return fps;
    },
  };
}
