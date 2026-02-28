export interface InputSnapshot {
  /** Currently held keys (lowercase, e.g. "w", "arrowup", " ") */
  keys: ReadonlySet<string>;
  /** Keys pressed THIS frame (not held from previous) */
  justPressed: ReadonlySet<string>;
  /** Keys released THIS frame */
  justReleased: ReadonlySet<string>;
  /** Mouse / primary pointer position in CSS pixels */
  pointer: { x: number; y: number };
  /** Whether the primary pointer button is down */
  pointerDown: boolean;
  /** First connected gamepad snapshot, or null */
  gamepad: GamepadSnapshot | null;
}

export interface GamepadSnapshot {
  leftStick: { x: number; y: number };
  rightStick: { x: number; y: number };
  buttons: readonly boolean[];
}

const DEADZONE = 0.15;

function applyDeadzone(v: number): number {
  return Math.abs(v) < DEADZONE ? 0 : v;
}

/**
 * Unified input manager for keyboard, mouse/touch, and gamepad.
 *
 * Usage:
 *   const input = createInput(canvas);
 *   // in game loop:
 *   const snap = input.poll();
 *   if (snap.keys.has('w')) { ... }
 *   // when done:
 *   input.destroy();
 */
export function createInput(target: HTMLElement = document.body) {
  const held = new Set<string>();
  const pressed = new Set<string>();
  const released = new Set<string>();
  let px = 0;
  let py = 0;
  let pDown = false;
  let locked = false;
  let lockDx = 0;
  let lockDy = 0;

  function onKeyDown(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    if (!held.has(k)) pressed.add(k);
    held.add(k);
  }
  function onKeyUp(e: KeyboardEvent) {
    const k = e.key.toLowerCase();
    held.delete(k);
    released.add(k);
  }
  function onPointerMove(e: PointerEvent) {
    if (document.pointerLockElement === target) {
      lockDx += e.movementX;
      lockDy += e.movementY;
    } else {
      px = e.clientX;
      py = e.clientY;
    }
  }
  function onPointerDown(e: PointerEvent) {
    if (e.button === 0) pDown = true;
  }
  function onPointerUp(e: PointerEvent) {
    if (e.button === 0) pDown = false;
  }
  function onBlur() {
    held.clear();
    pDown = false;
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  target.addEventListener('pointermove', onPointerMove);
  target.addEventListener('pointerdown', onPointerDown);
  target.addEventListener('pointerup', onPointerUp);
  window.addEventListener('blur', onBlur);

  function pollGamepad(): GamepadSnapshot | null {
    const gp = navigator.getGamepads?.()[0];
    if (!gp) return null;
    return {
      leftStick: { x: applyDeadzone(gp.axes[0] ?? 0), y: applyDeadzone(gp.axes[1] ?? 0) },
      rightStick: { x: applyDeadzone(gp.axes[2] ?? 0), y: applyDeadzone(gp.axes[3] ?? 0) },
      buttons: gp.buttons.map((b) => b.pressed),
    };
  }

  return {
    /**
     * Call once per frame to get the current input state.
     * Clears justPressed/justReleased for the next frame.
     */
    poll(): InputSnapshot {
      const snap: InputSnapshot = {
        keys: new Set(held),
        justPressed: new Set(pressed),
        justReleased: new Set(released),
        pointer: locked ? { x: lockDx, y: lockDy } : { x: px, y: py },
        pointerDown: pDown,
        gamepad: pollGamepad(),
      };
      pressed.clear();
      released.clear();
      lockDx = 0;
      lockDy = 0;
      return snap;
    },

    /** Request pointer lock on the target element. */
    requestPointerLock() {
      target.requestPointerLock();
      locked = true;
    },

    /** Exit pointer lock. */
    exitPointerLock() {
      document.exitPointerLock();
      locked = false;
    },

    /** Remove all event listeners. */
    destroy() {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      target.removeEventListener('pointermove', onPointerMove);
      target.removeEventListener('pointerdown', onPointerDown);
      target.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('blur', onBlur);
    },
  };
}
