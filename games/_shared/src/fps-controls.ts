interface FpsControlOptions {
  canvas: HTMLCanvasElement;
  onLook: (deltaX: number, deltaY: number) => void;
  onButtons?: (buttons: number, pressedButtons: number) => void;
  onPause: (paused: boolean) => void;
  onResetInput: () => void;
}

/** Mouse capture is optional: a declined request must never strand a player. */
export function createFpsControls({ canvas, onLook, onButtons, onPause, onResetInput }: FpsControlOptions) {
  let mode: 'locked' | 'drag' | null = null;
  let lastMode: 'locked' | 'drag' = 'locked';
  let running = false;
  let capturePending = false;
  let captureAttempt = 0;
  let captureTimer: ReturnType<typeof setTimeout> | undefined;
  let lastPointer: { x: number; y: number } | null = null;
  let activePointer: number | null = null;
  let heldButtons = 0;

  const panel = document.createElement('section');
  panel.className = 'fps-control-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'fps-control-title');
  panel.setAttribute('aria-describedby', 'fps-control-message');
  const box = document.createElement('div');
  box.className = 'fps-control-box';
  const title = document.createElement('h2');
  title.id = 'fps-control-title';
  const message = document.createElement('p');
  message.id = 'fps-control-message';
  message.setAttribute('aria-live', 'polite');
  const actions = document.createElement('div');
  actions.className = 'fps-control-actions';
  const dragButton = document.createElement('button');
  dragButton.type = 'button';
  dragButton.textContent = 'Use drag controls';
  const captureButton = document.createElement('button');
  captureButton.type = 'button';
  captureButton.textContent = 'Try mouse capture';
  actions.append(dragButton, captureButton);
  box.append(title, message, actions);
  panel.append(box);

  const hint = document.createElement('div');
  hint.className = 'fps-control-hint';
  hint.hidden = true;
  const hintText = document.createElement('span');
  hintText.textContent = 'Drag to aim + fire · Arrow keys aim · P or Esc pauses';
  const retryButton = document.createElement('button');
  retryButton.type = 'button';
  retryButton.textContent = 'Capture mouse';
  hint.append(hintText, retryButton);
  document.body.append(panel, hint);
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'Game view');

  function resetInput() {
    lastPointer = null;
    activePointer = null;
    heldButtons = 0;
    onResetInput();
  }

  function updateButtons(buttons: number) {
    const pressed = buttons & ~heldButtons;
    if (buttons !== heldButtons) onButtons?.(buttons, pressed);
    heldButtons = buttons;
    return pressed;
  }

  function clearPending() {
    captureAttempt++;
    capturePending = false;
    clearTimeout(captureTimer);
    captureTimer = undefined;
    captureButton.disabled = false;
  }

  function releaseCapture() {
    if (document.pointerLockElement !== canvas) return;
    try {
      Promise.resolve(document.exitPointerLock()).catch(() => {});
    } catch { /* A browser may already have released capture on blur. */ }
  }

  function pause(heading = 'Paused', detail = 'Resume with mouse capture, or use drag controls. Your game is paused.') {
    if (!running) return;
    clearPending();
    mode = null;
    resetInput();
    onPause(true);
    hint.hidden = true;
    title.textContent = heading;
    message.textContent = detail;
    panel.hidden = false;
    dragButton.textContent = lastMode === 'drag' ? 'Resume drag controls' : 'Use drag controls';
    releaseCapture();
    if (!document.hidden) dragButton.focus({ preventScroll: true });
  }

  function activate(nextMode: 'locked' | 'drag') {
    if (!running) return;
    clearPending();
    mode = nextMode;
    lastMode = nextMode;
    resetInput();
    panel.hidden = true;
    hint.hidden = nextMode !== 'drag';
    onPause(false);
    canvas.focus({ preventScroll: true });
  }

  function captureFailed() {
    if (!capturePending || !running || document.pointerLockElement === canvas) return;
    pause('Mouse capture unavailable', 'This browser could not capture the mouse. Use drag controls to aim and fire, or try mouse capture again. Your game is paused.');
  }

  function requestCapture() {
    if (!running || capturePending) return;
    pause('Mouse controls', 'Waiting for mouse capture. You can also play with drag controls.');
    capturePending = true;
    captureButton.disabled = true;
    const attempt = ++captureAttempt;
    const rejectCurrentAttempt = () => { if (attempt === captureAttempt) captureFailed(); };
    captureTimer = setTimeout(rejectCurrentAttempt, 5000);
    try {
      if (typeof canvas.requestPointerLock !== 'function') {
        captureFailed();
        return;
      }
      // Older browsers return void; newer ones return a rejecting Promise.
      Promise.resolve(canvas.requestPointerLock()).catch(rejectCurrentAttempt);
    } catch {
      captureFailed();
    }
  }

  dragButton.addEventListener('click', () => activate('drag'));
  captureButton.addEventListener('click', requestCapture);
  retryButton.addEventListener('click', requestCapture);
  document.addEventListener('pointerlockerror', captureFailed);
  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === canvas) {
      if (running && capturePending) activate('locked');
      else if (mode !== 'locked') releaseCapture();
    } else if (mode === 'locked') {
      pause('Paused', 'Mouse capture was released. Resume when you are ready.');
    }
  });
  // Babylon prevents the default pointerdown action, which can suppress the
  // compatibility mouse events. Use pointer events for both captured and drag aim.
  canvas.addEventListener('pointerdown', (event) => {
    if (!mode || (activePointer !== null && activePointer !== event.pointerId)) return;
    activePointer = event.pointerId;
    updateButtons(event.buttons);
    if (mode === 'drag' && (event.buttons & 1)) {
      lastPointer = { x: event.clientX, y: event.clientY };
    }
  });
  document.addEventListener('pointermove', (event) => {
    if (mode && activePointer === event.pointerId) {
      // Chorded mouse buttons change via pointermove, without another pointerdown.
      const pressed = updateButtons(event.buttons);
      if (mode === 'drag' && (pressed & 1)) lastPointer = { x: event.clientX, y: event.clientY };
      if (!(event.buttons & 1)) lastPointer = null;
    }
    if (mode === 'locked') {
      onLook(event.movementX, event.movementY);
    } else if (mode === 'drag' && activePointer === event.pointerId && (event.buttons & 1) && lastPointer) {
      onLook(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      lastPointer = { x: event.clientX, y: event.clientY };
    }
  });
  document.addEventListener('pointerup', (event) => {
    if (activePointer !== event.pointerId) return;
    updateButtons(0);
    lastPointer = null;
    activePointer = null;
  });
  document.addEventListener('pointercancel', (event) => {
    if (activePointer === event.pointerId) resetInput();
  });
  document.addEventListener('keydown', (event) => {
    if (!mode || event.repeat || !['p', 'escape'].includes(event.key.toLowerCase())) return;
    if (event.key.toLowerCase() === 'p') event.preventDefault();
    pause();
  });
  window.addEventListener('blur', () => { if (mode || capturePending) pause(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && (mode || capturePending)) pause();
  });

  return {
    get active() { return mode !== null; },
    get dragMode() { return mode === 'drag'; },
    start() {
      running = true;
      if (lastMode === 'drag') activate('drag');
      else requestCapture();
    },
    stop() {
      running = false;
      mode = null;
      clearPending();
      resetInput();
      panel.hidden = true;
      hint.hidden = true;
      releaseCapture();
    },
  };
}
