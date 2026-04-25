/* Games page extras:
 *   1. Small minimize/maximize icon button pinned to the Fluid Controls header
 *      (the full-width "— Minimize" bar is hidden via CSS and replaced with this).
 *   2. A "Click & drag anywhere" hint floating just above the controls panel,
 *      with a subtle cursor-arc glyph. Fades out once the user has dragged.
 *   3. A periodic cat companion (oneko.js sprite art by adryd325, MIT licensed
 *      — github.com/adryd325/oneko.js) that traverses the viewport in any of 8
 *      directions, sometimes stopping to sit, scratch, sleep, or look around,
 *      and drives a fluid trail via window.fluidSplatScreen.
 *
 *  The cat itself is the canonical 256×128 oneko spritesheet (8×4 cells of
 *  32×32) rendered as a CSS background. A custom controller picks scenes,
 *  animates position, swaps the directional sprite to match the velocity
 *  vector, and exposes window.gamesCat for external control of position and
 *  triggered animations.
 */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;
  if (!document.querySelector('.games-page')) return;

  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    // dat.GUI is mounted by webgl-fluid.js asynchronously after WebGL setup.
    // Poll briefly; give up after ~5s in case WebGL isn't available.
    var tries = 0;
    var iv = setInterval(function () {
      var panel = document.querySelector('.dg.main');
      var container = document.querySelector('.dg.ac');
      tries++;
      if (panel && container) {
        clearInterval(iv);
        injectHint();
        injectMinMaxButton(panel);
      } else if (tries > 100) {
        clearInterval(iv);
        injectHint();
      }
    }, 50);

    if (!reduceMotion) scheduleCat();
  }

  // ---------- Click & drag hint ----------
  function injectHint() {
    if (document.querySelector('.fluid-hint')) return;

    var hint = document.createElement('div');
    hint.className = 'fluid-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML =
      '<span class="fluid-hint-ico">' +
      '  <svg viewBox="0 0 28 24" width="22" height="20">' +
      '    <path d="M4 16 Q9 6 20 4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2 3" stroke-linecap="round"/>' +
      '    <path d="M16 2 L22 4 L19 9 Z" fill="currentColor"/>' +
      '    <circle cx="4" cy="16" r="2.2" fill="currentColor"/>' +
      '  </svg>' +
      '</span>' +
      '<span class="fluid-hint-text">Click &amp; drag anywhere &mdash; it&rsquo;s fun</span>';
    document.body.appendChild(hint);

    var dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      hint.classList.add('is-dismissed');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      setTimeout(function () { hint.remove(); }, 700);
    }
    function onMove(e) { if (e.buttons) dismiss(); }
    function onTouch() { dismiss(); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
  }

  // ---------- Small minimize / maximize button on the panel header ----------
  function injectMinMaxButton(panel) {
    if (panel.querySelector('.dg-min-toggle')) return;
    var closeBtn = panel.querySelector('.close-button');
    if (!closeBtn) return;

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'dg-min-toggle';
    toggle.innerHTML = '<span class="dg-min-icon" aria-hidden="true"></span>';
    panel.appendChild(toggle);

    function sync() {
      var ul = panel.querySelector('ul');
      var closed = !!(ul && ul.classList.contains('closed'));
      toggle.classList.toggle('is-closed', closed);
      toggle.setAttribute(
        'aria-label',
        closed ? 'Maximize fluid controls' : 'Minimize fluid controls'
      );
      toggle.setAttribute('title', closed ? 'Maximize' : 'Minimize');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      closeBtn.click();
      requestAnimationFrame(sync);
    });

    sync();
  }

  // =========================================================================
  // CAT COMPANION (oneko.gif sprite renderer)
  // =========================================================================
  // Spritesheet (256×128, 8×4 cells of 32×32) is rendered at 2× via CSS
  // background-image with image-rendering: pixelated. Each named animation
  // maps to one or more [col, row] frames as negative cell offsets, matching
  // the convention from oneko.js (source/license: static/img/oneko.gif).
  //
  // Anchor point is the cat's feet at display-px (32, 56) — a 64×64 sprite
  // with paws roughly at row 28/32 of the source cell. translate the wrapper
  // by (worldX - 32, worldY - 56) so a scene anchors the cat to the ground.

  var SPRITE_CELL  = 32;
  var SPRITE_SCALE = 2;
  var SPRITE_SIZE  = SPRITE_CELL * SPRITE_SCALE; // 64
  var FOOT_OFFSET_X = 32;
  var FOOT_OFFSET_Y = 56;

  // Cell coordinates are negative offsets matching oneko.js convention
  // (background-position: col * -32px, row * -32px at 1×).
  var SPRITES = {
    idle:         [[-3, -3]],
    alert:        [[-7, -3]],
    scratchSelf:  [[-5,  0], [-6,  0], [-7,  0]],
    scratchWallN: [[ 0,  0], [ 0, -1]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4,  0], [-4, -1]],
    tired:        [[-3, -2]],
    sleeping:     [[-2,  0], [-2, -1]],
    N:  [[-1, -2], [-1, -3]],
    NE: [[ 0, -2], [ 0, -3]],
    E:  [[-3,  0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S:  [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W:  [[-4, -2], [-4, -3]],
    NW: [[-1,  0], [-1, -1]],
  };

  // Short, contextual things the cat can "say". Each key holds a small bag
  // and pickFromBag rotates without immediate repeats. Keep messages ≤ 12
  // chars so the bubble fits without wrapping at small viewport widths.
  var BUBBLE_BAG = {
    hello:  ['*meow*', 'hi', 'oh hi'],
    pause:  ['...', 'hm?', '*sniff*'],
    cursor: ['hi', '?', '*purr*'],
    card:   ['ooh', 'this one?', 'nice'],
    tired:  ['*yawn*'],
    sleep:  ['zzz...'],
    wake:   ['hm?', '*stretch*'],
  };

  function scheduleCat() {
    var cat = createCat();
    document.body.appendChild(cat.root);
    window.gamesCat = catApi(cat);

    // Behavior layer install: input tracking, hover watchers, cursor head-turn
    // tick, and a visibilitychange hook to clean up bubbles + queued scenes
    // when the page is hidden.
    installInputTracking(cat);
    installCardWatchers(cat);
    setInterval(function () { cursorAwarenessTick(cat); }, 250);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) return;
      if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
      if (cat.state.bubbleTimer) {
        clearTimeout(cat.state.bubbleTimer);
        cat.state.bubbleTimer = null;
      }
      if (cat.state.hoverTimer) {
        clearTimeout(cat.state.hoverTimer);
        cat.state.hoverTimer = null;
      }
      cat.state.queuedCard = null;
    });

    function tick() {
      if (document.hidden) {
        setTimeout(tick, 4000);
        return;
      }
      if (cat.state.scenesPaused) {
        setTimeout(tick, 4000);
        return;
      }
      // Idle-timeout sleep: if no input for 75 s, escalate to a sleep scene
      // (which suspends until input arrives), then resume normal scheduling.
      var idleMs = Date.now() - cat.state.lastInputTs;
      if (idleMs >= 75000 && !cat.state.isSleeping) {
        sleepUntilWoken(cat).then(function () {
          setTimeout(tick, 2000 + Math.random() * 4000);
        });
        return;
      }
      runCatScene(cat).then(function () {
        var nextDelay = 14000 + Math.random() * 26000; // 14–40 s gap
        setTimeout(tick, nextDelay);
      });
    }
    setTimeout(tick, 4000 + Math.random() * 2000); // first appearance after 4–6 s
  }

  function createCat() {
    var wrap = document.createElement('div');
    wrap.className = 'games-cat';
    wrap.setAttribute('aria-hidden', 'true');

    var cat = {
      root: wrap,
      state: {
        x: -9999, y: -9999,
        sprite: 'idle',
        frame: 0,
        animTimer: null,
        scenesPaused: false,
        // ----- Behavior layer -----
        cursor: { x: 0, y: 0, has: false },
        lastInputTs: Date.now(),
        hoverTimer: null,
        queuedCard: null,
        isWalking: false,
        isSleeping: false,
        sceneActive: false,
        cursorLooking: false,
        cursorRestoreAt: 0,
        cursorGreeted: false,
        hasGreeted: false,
        pendingWake: null,
        bubble: null,
        bubbleTimer: null,
        bagState: {},
      },
    };

    setSprite(cat, 'idle', 0);
    placeCat(cat, -9999, -9999);
    return cat;
  }

  // ------------------ Sprite + position primitives ------------------

  function setSprite(cat, name, frame) {
    var frames = SPRITES[name];
    if (!frames) return;
    var f = frames[frame % frames.length];
    cat.state.sprite = name;
    cat.state.frame = frame;
    // backgroundSize is set in CSS to (8 cells × scale × cell)px = 512×256.
    // So a -3 cell offset maps to -3 × 32 × 2 = -192px on the rendered image.
    var px = f[0] * SPRITE_CELL * SPRITE_SCALE;
    var py = f[1] * SPRITE_CELL * SPRITE_SCALE;
    cat.root.style.backgroundPosition = px + 'px ' + py + 'px';
  }

  function placeCat(cat, x, y) {
    cat.state.x = x;
    cat.state.y = y;
    cat.root.style.transform =
      'translate(' + (x - FOOT_OFFSET_X) + 'px,' + (y - FOOT_OFFSET_Y) + 'px)';
  }

  // Single directional splat at the cat's body center. The fluid sim derives
  // splat velocity from (current - prev), so passing a non-zero (dirX,dirY)
  // makes the puff visibly fly away from the cat — useful for making the
  // splat read as if the cat is causing it (clawing, swatting, startling).
  function paintSplat(cat, dirX, dirY, mag) {
    if (typeof window.fluidSplatScreen !== 'function') return;
    if (cat.state.x < 0 || cat.state.x > window.innerWidth) return;
    mag = mag || 28;
    var cx = cat.state.x;
    var cy = cat.state.y - 16; // body center, ~16 px above feet
    var len = Math.hypot(dirX, dirY) || 1;
    var nx = dirX / len;
    var ny = dirY / len;
    window.fluidSplatScreen(cx + nx * mag, cy + ny * mag, cx, cy);
  }

  // Splats are intentionally only emitted from sprites that LOOK like the
  // cat is making them — claw strokes (scratchSelf, scratchWall*) and the
  // mid-walk startle (alert). Walking and idle never paint.
  function splatForSprite(cat, name) {
    if (name === 'scratchSelf') {
      var ang = Math.random() * Math.PI * 2;
      paintSplat(cat, Math.cos(ang), Math.sin(ang) - 0.4, 22);
    } else if (name === 'scratchWallE') {
      paintSplat(cat, 1, -0.25, 38);
    } else if (name === 'scratchWallW') {
      paintSplat(cat, -1, -0.25, 38);
    } else if (name === 'scratchWallN') {
      paintSplat(cat, 0, -1, 36);
    } else if (name === 'scratchWallS') {
      paintSplat(cat, 0, 1, 28);
    }
  }

  // Map a velocity vector to one of the 8 baked walking sprites.
  function dirFromVector(dx, dy) {
    var deg = Math.atan2(dy, dx) * 180 / Math.PI; // 0 = E, 90 = S
    if (deg < -157.5 || deg >= 157.5) return 'W';
    if (deg < -112.5) return 'NW';
    if (deg < -67.5)  return 'N';
    if (deg < -22.5)  return 'NE';
    if (deg < 22.5)   return 'E';
    if (deg < 67.5)   return 'SE';
    if (deg < 112.5)  return 'S';
    return 'SW';
  }

  // ------------------ Animation core ------------------

  function animate(durationMs, stepFn) {
    return new Promise(function (resolve) {
      var start = null;
      function frame(t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / durationMs, 1);
        stepFn(p, t);
        if (p < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function stopAnim(cat) {
    if (cat.state.animTimer) {
      clearInterval(cat.state.animTimer);
      cat.state.animTimer = null;
    }
  }

  // Cycle through frames of an animation at the given period. For sprite
  // names the user perceives as "the cat is making a splash" (scratches),
  // emit one fluid splat at the start and one per completed cycle. Walking
  // sprites and idle never paint — that ran the screen ragged.
  function loopAnim(cat, name, periodMs) {
    stopAnim(cat);
    var frames = SPRITES[name];
    if (!frames) return;
    if (frames.length === 1) {
      setSprite(cat, name, 0);
      return;
    }
    var i = 0;
    setSprite(cat, name, i);
    splatForSprite(cat, name);
    cat.state.animTimer = setInterval(function () {
      i = (i + 1) % frames.length;
      setSprite(cat, name, i);
      if (i === 0) splatForSprite(cat, name);
    }, periodMs);
  }

  // Hold a looping animation for durationMs, then stop.
  function holdAnim(cat, name, durationMs, periodMs) {
    loopAnim(cat, name, periodMs);
    return new Promise(function (resolve) {
      setTimeout(function () {
        stopAnim(cat);
        resolve();
      }, durationMs);
    });
  }

  // Walk from (x0,y0) → (x1,y1) using the directional sprite that best
  // matches the velocity vector. Frames advance at periodMs (lower = faster).
  function walkTo(cat, x0, y0, x1, y1, durationMs, periodMs) {
    var dx = x1 - x0;
    var dy = y1 - y0;
    if (dx === 0 && dy === 0) {
      placeCat(cat, x1, y1);
      return Promise.resolve();
    }
    cat.state.isWalking = true;
    var dirName = dirFromVector(dx, dy);
    var frames  = SPRITES[dirName];
    var fIdx = 0;
    setSprite(cat, dirName, fIdx);
    var lastSwap = 0;
    return animate(durationMs, function (p, now) {
      if (!lastSwap) lastSwap = now;
      placeCat(cat, lerp(x0, x1, p), lerp(y0, y1, p));
      if (now - lastSwap >= periodMs) {
        fIdx = (fIdx + 1) % frames.length;
        setSprite(cat, dirName, fIdx);
        lastSwap = now;
      }
    }).then(function () {
      cat.state.isWalking = false;
    });
  }

  // Wraps walkTo with a chance to insert a single mid-walk pause: the cat
  // stops near the path's midpoint, plays "alert" briefly (sometimes with a
  // bubble), then continues. Probability scales with walk duration so a
  // long stroll usually pauses, but a short hop never does. Keep raw
  // walkTo for the brisk-pass scene and the public `moveTo` API where
  // predictable timing matters.
  function walkToInterruptible(cat, x0, y0, x1, y1, durationMs, periodMs) {
    var dist = Math.hypot(x1 - x0, y1 - y0);
    if (dist < 380 || durationMs < 2200) {
      return walkTo(cat, x0, y0, x1, y1, durationMs, periodMs);
    }
    var seconds = durationMs / 1000;
    var pauseProb = 1 - Math.pow(1 - 0.18, seconds); // ~18 %/s, compounded
    if (Math.random() > pauseProb) {
      return walkTo(cat, x0, y0, x1, y1, durationMs, periodMs);
    }
    var t = 0.30 + Math.random() * 0.40;
    var midX = lerp(x0, x1, t) + (Math.random() - 0.5) * 26;
    var midY = lerp(y0, y1, t) + (Math.random() - 0.5) * 18;
    var pauseDur = 700 + Math.random() * 400;

    return walkTo(cat, x0, y0, midX, midY, durationMs * t, periodMs)
      .then(function () {
        if (Math.random() < 0.4) {
          sayBubble(cat, pickFromBag(cat, 'pause'), { duration: 1100 });
        }
        // One startle puff at the moment the cat snaps to "alert" — reads
        // as "something made it perk up" rather than a continuous trail.
        paintSplat(cat, 0, -1, 18);
        return holdAnim(cat, 'alert', pauseDur, 220);
      })
      .then(function () {
        return walkTo(cat, midX, midY, x1, y1, durationMs * (1 - t), periodMs);
      });
  }

  // ------------------ Scene composition ------------------

  function runCatScene(cat) {
    // If the user has been hovering a game card long enough to queue a visit,
    // hand the wheel to the card-companion scene instead of rolling.
    if (cat.state.queuedCard) {
      var card = cat.state.queuedCard;
      cat.state.queuedCard = null;
      cat.state.sceneActive = true;
      return cardCompanionScene(cat, card).then(function () {
        cat.state.sceneActive = false;
      });
    }

    return new Promise(function (resolve) {
      cat.state.sceneActive = true;
      cat.root.classList.add('is-active');

      // First scene of the page session gets a tiny greeting bubble.
      if (!cat.state.hasGreeted) {
        cat.state.hasGreeted = true;
        setTimeout(function () {
          if (!cat.state.scenesPaused && !document.hidden) {
            sayBubble(cat, pickFromBag(cat, 'hello'), { duration: 1500 });
          }
        }, 700);
      }

      var w = window.innerWidth;
      var h = window.innerHeight;
      var pad = 100;
      // Keep the cat in the lower-middle band of the viewport so it doesn't
      // fight the section header or run under the dat.GUI panel.
      var minY = Math.max(220, h * 0.34);
      var maxY = Math.max(minY + 80, h * 0.86);

      var enterLeft = Math.random() < 0.5;
      var startX = enterLeft ? -pad : w + pad;
      var startY = minY + Math.random() * (maxY - minY);

      placeCat(cat, startX, startY);

      var roll = Math.random();
      var scene;
      if (roll < 0.35) {
        // Casual stroll, sometimes diagonal — with a chance of a mid-walk pause.
        var endY = minY + Math.random() * (maxY - minY);
        var endX = enterLeft ? w + pad : -pad;
        var dist = Math.hypot(endX - startX, endY - startY);
        scene = walkToInterruptible(cat, startX, startY, endX, endY, dist / 0.20, 200);
      } else if (roll < 0.55) {
        // Brisker pass — frames swap faster, motion is faster, no pauses.
        var endY2 = minY + Math.random() * (maxY - minY);
        var endX2 = enterLeft ? w + pad : -pad;
        var dist2 = Math.hypot(endX2 - startX, endY2 - startY);
        scene = walkTo(cat, startX, startY, endX2, endY2, dist2 / 0.34, 110);
      } else {
        // Linger: walk to a stop, do something cat-like, walk out.
        scene = lingerScene(cat, startX, startY, enterLeft, w, minY, maxY);
      }

      scene.then(function () {
        stopAnim(cat);
        cat.root.classList.remove('is-active');
        if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
        // After fade-out, snap the cat offscreen.
        setTimeout(function () {
          placeCat(cat, -9999, -9999);
          cat.state.sceneActive = false;
          resolve();
        }, 360);
      });
    });
  }

  function lingerScene(cat, startX, startY, enterLeft, w, minY, maxY) {
    var stopX = w * (0.22 + Math.random() * 0.56);
    var stopY = minY + Math.random() * (maxY - minY);
    // Make sure stop is roughly forward of the entry, not behind it.
    if (enterLeft  && stopX < startX + 200) stopX = startX + 200 + Math.random() * 220;
    if (!enterLeft && stopX > startX - 200) stopX = startX - 200 - Math.random() * 220;

    var entryDist = Math.hypot(stopX - startX, stopY - startY);
    var entryFast = Math.random() < 0.35;
    var entrySpeed = entryFast ? 0.32 : 0.20;
    var entryFrame = entryFast ? 110 : 200;

    return walkToInterruptible(cat, startX, startY, stopX, stopY, entryDist / entrySpeed, entryFrame)
      .then(function () { return idleSequence(cat, stopX, stopY, w); })
      .then(function () {
        // Decide exit: 25% turn-around, otherwise continue same direction.
        var exitLeft = Math.random() < 0.25 ? enterLeft : !enterLeft;
        var exitX = exitLeft ? -100 : w + 100;
        var exitY = minY + Math.random() * (maxY - minY);
        var exitDist = Math.hypot(exitX - stopX, exitY - stopY);
        var exitFast = Math.random() < 0.5;
        var exitWalk = exitFast ? walkTo : walkToInterruptible;
        return exitWalk(
          cat, stopX, stopY, exitX, exitY,
          exitDist / (exitFast ? 0.34 : 0.20),
          exitFast ? 110 : 200
        );
      });
  }

  function idleSequence(cat, x, y, w) {
    var actions = [];
    // Cat almost always perks up first ("alert" pose) when it stops.
    if (Math.random() < 0.78) actions.push({ name: 'alert', dur: 800 + Math.random() * 600, period: 220 });

    var roll = Math.random();
    if (roll < 0.30) {
      // Self-grooming.
      actions.push({ name: 'scratchSelf', dur: 2200 + Math.random() * 1100, period: 220 });
    } else if (roll < 0.55) {
      // Get tired, take a nap.
      actions.push({ name: 'tired',    dur: 700  + Math.random() * 400,  period: 240 });
      actions.push({ name: 'sleeping', dur: 3200 + Math.random() * 1800, period: 380 });
    } else if (roll < 0.78) {
      // Scratch the nearest "wall" — pick side from screen position.
      var wallDir = (x > w / 2) ? 'E' : 'W';
      actions.push({ name: 'scratchWall' + wallDir, dur: 1700 + Math.random() * 900, period: 220 });
    } else {
      // Sit, look, sit again.
      actions.push({ name: 'idle',  dur: 900,  period: 200 });
      actions.push({ name: 'alert', dur: 750,  period: 200 });
      actions.push({ name: 'idle',  dur: 700,  period: 200 });
    }

    if (Math.random() < 0.4) actions.push({ name: 'idle', dur: 600, period: 200 });

    var promise = Promise.resolve();
    actions.forEach(function (a) {
      promise = promise.then(function () {
        placeCat(cat, x, y); // re-anchor between behaviours
        if (a.name === 'tired') {
          sayBubble(cat, pickFromBag(cat, 'tired'),  { duration: Math.min(1500, a.dur - 100) });
        } else if (a.name === 'sleeping') {
          sayBubble(cat, pickFromBag(cat, 'sleep'),  { duration: Math.min(2400, a.dur - 400) });
        }
        return holdAnim(cat, a.name, a.dur, a.period);
      });
    });
    return promise;
  }

  // =========================================================================
  // BEHAVIOR LAYER
  // =========================================================================
  // Cursor awareness, card-hover companion, idle-timeout sleep, speech
  // bubbles. All listeners are passive and rAF-throttled. Every behavior
  // gates on `cat.state.scenesPaused`, `document.hidden`, and respects
  // prefers-reduced-motion (which prevents the cat from being created at all).

  function pickFromBag(cat, key) {
    var bag = BUBBLE_BAG[key];
    if (!bag || !bag.length) return '';
    if (bag.length === 1) return bag[0];
    var state = cat.state.bagState;
    var last = state[key];
    var idx;
    do { idx = Math.floor(Math.random() * bag.length); }
    while (idx === last);
    state[key] = idx;
    return bag[idx];
  }

  // Lazily creates the bubble element as a child of the cat wrapper so its
  // transform inherits — the bubble follows the cat for free, and `is-active`
  // fades both at once.
  function buildBubble(cat) {
    if (cat.state.bubble) return cat.state.bubble;
    var b = document.createElement('div');
    b.className = 'games-cat-bubble';
    b.setAttribute('aria-hidden', 'true');
    cat.root.appendChild(b);
    cat.state.bubble = b;
    return b;
  }

  // Show a short message in a pixel-styled bubble above the cat. The bubble's
  // tail flips between center / left / right depending on cat's screen-x so
  // it doesn't get clipped at the viewport edges. Subsequent calls replace
  // any visible message (single-slot queue, no overlapping bubbles).
  function sayBubble(cat, text, opts) {
    if (!text) return;
    if (document.hidden) return;
    if (!cat || cat.state.scenesPaused) return;
    opts = opts || {};
    var b = buildBubble(cat);
    b.textContent = text;

    // Position / tail based on cat's horizontal screen position.
    var w = window.innerWidth;
    var x = cat.state.x;
    b.classList.remove('tail-left', 'tail-right');
    if (x < 90) {
      b.classList.add('tail-left');
      b.style.left = '8px';
      b.style.transform = 'translate(0, -100%)';
    } else if (x > w - 90) {
      b.classList.add('tail-right');
      b.style.left = '56px';
      b.style.transform = 'translate(-100%, -100%)';
    } else {
      b.style.left = '32px';
      b.style.transform = 'translate(-50%, -100%)';
    }

    // Force a reflow so the opacity transition runs even when text changes
    // back-to-back (otherwise replacing text in the same frame skips the
    // fade).
    /* eslint-disable no-unused-expressions */
    b.offsetHeight;
    /* eslint-enable no-unused-expressions */

    b.classList.add('is-visible');

    if (cat.state.bubbleTimer) clearTimeout(cat.state.bubbleTimer);
    var dur = opts.duration || 1600;
    cat.state.bubbleTimer = setTimeout(function () {
      b.classList.remove('is-visible');
      cat.state.bubbleTimer = null;
    }, dur);
  }

  // ----- Input tracking (cursor + last-input timestamp) -----
  // One throttled pointermove + lightweight activity listeners feed the
  // sleep escalation timer and the cursor-awareness tick.
  function installInputTracking(cat) {
    var rafPending = false;
    var pendingX = 0, pendingY = 0;
    function flush() {
      rafPending = false;
      cat.state.cursor.x = pendingX;
      cat.state.cursor.y = pendingY;
      cat.state.cursor.has = true;
      cat.state.lastInputTs = Date.now();
      if (cat.state.isSleeping && cat.state.pendingWake) {
        var wake = cat.state.pendingWake;
        cat.state.pendingWake = null;
        wake();
      }
    }
    function onPointerMove(e) {
      pendingX = e.clientX; pendingY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(flush);
    }
    function onActivity() {
      cat.state.lastInputTs = Date.now();
      if (cat.state.isSleeping && cat.state.pendingWake) {
        var wake = cat.state.pendingWake;
        cat.state.pendingWake = null;
        wake();
      }
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onActivity,    { passive: true });
    window.addEventListener('keydown',     onActivity,    { passive: true });
    window.addEventListener('touchstart',  onActivity,    { passive: true });
    window.addEventListener('scroll',      onActivity,    { passive: true });
  }

  // 8-direction sprite names that we may swap between for "head-turn".
  var DIRECTIONAL = { N: 1, NE: 1, E: 1, SE: 1, S: 1, SW: 1, W: 1, NW: 1 };

  // While the cat is presenting an idle pose (not walking, sleeping, or
  // mid-action), if the cursor enters a ~280 px radius around its body, the
  // sprite swaps to the directional walk-frame[0] facing the cursor — a
  // "head-turn". When the cursor leaves the radius for 200 ms, restore
  // 'idle'. Never overrides motion sprites mid-walk or mid-action.
  function cursorAwarenessTick(cat) {
    if (cat.state.scenesPaused) return;
    if (document.hidden) return;
    if (!cat.state.cursor.has) return;
    if (cat.state.isWalking) return;
    if (cat.state.isSleeping) return;
    if (cat.state.x < 0 || cat.state.x > window.innerWidth + 1) return;

    var sprite = cat.state.sprite;
    // Only hijack when cat is showing the static 'idle', or while we already
    // swapped to a directional pose ourselves and it's still showing.
    var ours = cat.state.cursorLooking && DIRECTIONAL[sprite];
    if (sprite !== 'idle' && !ours) {
      // Some other animation took over (tired, scratch, etc.) — drop our
      // claim so we don't try to restore later.
      cat.state.cursorLooking = false;
      cat.state.cursorRestoreAt = 0;
      return;
    }

    var dx = cat.state.cursor.x - cat.state.x;
    var dy = cat.state.cursor.y - (cat.state.y - 16); // body center
    var dist2 = dx * dx + dy * dy;
    var nearR2 = 280 * 280;

    if (dist2 < nearR2) {
      var dir = dirFromVector(dx, dy);
      if (cat.state.sprite !== dir) {
        stopAnim(cat);
        setSprite(cat, dir, 0);
        cat.state.cursorLooking = true;
        if (!cat.state.cursorGreeted && Math.random() < 0.5) {
          cat.state.cursorGreeted = true;
          sayBubble(cat, pickFromBag(cat, 'cursor'), { duration: 1300 });
          setTimeout(function () { cat.state.cursorGreeted = false; }, 9000);
        }
      }
      cat.state.cursorRestoreAt = 0;
    } else if (cat.state.cursorLooking) {
      if (!cat.state.cursorRestoreAt) {
        cat.state.cursorRestoreAt = Date.now();
      } else if (Date.now() - cat.state.cursorRestoreAt > 200) {
        setSprite(cat, 'idle', 0);
        cat.state.cursorLooking = false;
        cat.state.cursorRestoreAt = 0;
      }
    }
  }

  // ----- Card-hover companion -----
  // Hovering a `.game-preview-link` for 1.4 s queues a one-shot scene where
  // the cat trots over to the card and looks at it. Cancellable on
  // mouseleave. The scene runs on the next tick, replacing whatever roll
  // would have been picked.
  function installCardWatchers(cat) {
    var grid = document.querySelector('.personal-card-grid');
    if (!grid) return;
    grid.addEventListener('mouseover', function (e) {
      var link = e.target.closest && e.target.closest('.game-preview-link');
      if (!link) return;
      if (cat.state.hoverTimer) clearTimeout(cat.state.hoverTimer);
      cat.state.hoverTimer = setTimeout(function () {
        cat.state.hoverTimer = null;
        if (cat.state.sceneActive) return;
        if (cat.state.isSleeping) return;
        if (cat.state.scenesPaused) return;
        if (document.hidden) return;
        cat.state.queuedCard = link.closest('.game-card') || link;
      }, 1400);
    });
    grid.addEventListener('mouseout', function (e) {
      var link = e.target.closest && e.target.closest('.game-preview-link');
      if (!link) return;
      var rel = e.relatedTarget;
      if (rel && link.contains(rel)) return;
      if (cat.state.hoverTimer) {
        clearTimeout(cat.state.hoverTimer);
        cat.state.hoverTimer = null;
      }
    });
  }

  function cardCompanionScene(cat, cardEl) {
    return new Promise(function (resolve) {
      if (!cardEl || !document.body.contains(cardEl)) {
        resolve();
        return;
      }
      var rect = cardEl.getBoundingClientRect();
      var w = window.innerWidth;
      var h = window.innerHeight;
      var minY = Math.max(220, h * 0.34);
      var maxY = Math.max(minY + 80, h * 0.86);

      var targetX = rect.left + rect.width / 2;
      var targetY = Math.min(maxY, Math.max(minY, rect.bottom + 70));

      var enterLeft = targetX < w / 2;
      var startX = enterLeft ? -100 : w + 100;
      var startY = targetY + (Math.random() - 0.5) * 60;
      placeCat(cat, startX, startY);
      cat.root.classList.add('is-active');

      var dist = Math.hypot(targetX - startX, targetY - startY);
      walkToInterruptible(cat, startX, startY, targetX, targetY, dist / 0.26, 150)
        .then(function () {
          var lookDir = dirFromVector(0, -1); // look up at the card
          stopAnim(cat);
          setSprite(cat, lookDir, 0);
          sayBubble(cat, pickFromBag(cat, 'card'), { duration: 1500 });
          return holdAnim(cat, 'alert', 1700, 220);
        })
        .then(function () {
          return holdAnim(cat, 'idle', 1100, 220);
        })
        .then(function () {
          var exitX = enterLeft ? w + 100 : -100;
          var exitY = minY + Math.random() * (maxY - minY);
          var exitDist = Math.hypot(exitX - targetX, exitY - targetY);
          return walkTo(cat, targetX, targetY, exitX, exitY, exitDist / 0.22, 180);
        })
        .then(function () {
          stopAnim(cat);
          cat.root.classList.remove('is-active');
          if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
          setTimeout(function () {
            placeCat(cat, -9999, -9999);
            resolve();
          }, 360);
        });
    });
  }

  // ----- Idle-timeout sleep -----
  // When `lastInputTs` is older than 75 s, swap the next scene roll for a
  // sleep scene: walk to a quiet spot, get tired, then sleep until any
  // input wakes the cat. The wake handshake uses `cat.state.pendingWake`,
  // which the input-tracker resolves on the next pointermove/keydown.
  function sleepUntilWoken(cat) {
    return new Promise(function (resolve) {
      cat.state.isSleeping = true;
      cat.state.sceneActive = true;
      var w = window.innerWidth;
      var h = window.innerHeight;
      var minY = Math.max(220, h * 0.34);
      var maxY = Math.max(minY + 80, h * 0.86);

      var enterLeft = Math.random() < 0.5;
      var startX = enterLeft ? -100 : w + 100;
      var startY = minY + (maxY - minY) * (0.5 + Math.random() * 0.4);
      placeCat(cat, startX, startY);
      cat.root.classList.add('is-active');

      var sleepX = w * (0.20 + Math.random() * 0.60);
      var sleepY = minY + (maxY - minY) * (0.65 + Math.random() * 0.30);
      var dist = Math.hypot(sleepX - startX, sleepY - startY);

      walkToInterruptible(cat, startX, startY, sleepX, sleepY, dist / 0.18, 220)
        .then(function () {
          sayBubble(cat, pickFromBag(cat, 'tired'), { duration: 1400 });
          return holdAnim(cat, 'tired', 1100, 240);
        })
        .then(function () {
          sayBubble(cat, pickFromBag(cat, 'sleep'), { duration: 4000 });
          loopAnim(cat, 'sleeping', 380);
          return new Promise(function (wake) {
            cat.state.pendingWake = wake;
          });
        })
        .then(function () {
          stopAnim(cat);
          cat.state.isSleeping = false;
          if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
          sayBubble(cat, pickFromBag(cat, 'wake'), { duration: 1300 });
          return holdAnim(cat, 'alert', 800, 220);
        })
        .then(function () {
          cat.root.classList.remove('is-active');
          if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
          setTimeout(function () {
            placeCat(cat, -9999, -9999);
            cat.state.sceneActive = false;
            resolve();
          }, 360);
        });
    });
  }

  // ------------------ Public API ------------------
  // Exposed as window.gamesCat once the cat is mounted. Lets external code
  // drive the cat — e.g. trigger a sleep scene from a game over screen, or
  // walk it to a specific point of interest.
  function catApi(cat) {
    return {
      // Direct DOM controls.
      show: function () { cat.root.classList.add('is-active'); },
      hide: function () {
        cat.root.classList.remove('is-active');
        if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
      },

      // Pause / resume the auto-scheduled wandering scenes (manual control).
      pauseScenes:  function () {
        cat.state.scenesPaused = true;
        if (cat.state.bubble) cat.state.bubble.classList.remove('is-visible');
        if (cat.state.bubbleTimer) {
          clearTimeout(cat.state.bubbleTimer);
          cat.state.bubbleTimer = null;
        }
        if (cat.state.hoverTimer) {
          clearTimeout(cat.state.hoverTimer);
          cat.state.hoverTimer = null;
        }
        cat.state.queuedCard = null;
      },
      resumeScenes: function () { cat.state.scenesPaused = false; },

      // Show a short message in a pixel-styled bubble above the cat. Truncates
      // to a sensible length to avoid clipping at the viewport edges.
      say: function (text, durationMs) {
        if (typeof text !== 'string' || !text) return;
        var trimmed = text.length > 20 ? text.slice(0, 20) : text;
        sayBubble(cat, trimmed, { duration: durationMs || 1600 });
      },

      // If the cat is in a sleep scene, wake it on demand (otherwise no-op).
      wakeUp: function () {
        if (cat.state.pendingWake) {
          var w = cat.state.pendingWake;
          cat.state.pendingWake = null;
          w();
        }
      },

      // Move with a directional walk sprite. opts.speed (px/ms, default 0.20)
      // or opts.duration (ms) sets pace; opts.frameMs sets frame swap rate.
      // Returns a Promise that resolves when motion completes.
      moveTo: function (x, y, opts) {
        opts = opts || {};
        var x0 = cat.state.x;
        var y0 = cat.state.y;
        var dist = Math.hypot(x - x0, y - y0);
        var dur = opts.duration || dist / (opts.speed || 0.20);
        var frameMs = opts.frameMs || 200;
        cat.root.classList.add('is-active');
        return walkTo(cat, x0, y0, x, y, dur, frameMs);
      },

      // Snap to a location with no animation.
      placeAt: function (x, y) {
        placeCat(cat, x, y);
      },

      // Play a named animation in place for durationMs. Resolves when done.
      // Available names: see `sprites` array below.
      play: function (name, durationMs, frameMs) {
        if (!SPRITES[name]) return Promise.resolve();
        cat.root.classList.add('is-active');
        return holdAnim(cat, name, durationMs || 2000, frameMs || 200);
      },

      // Set a single frame, no animation loop. Useful for static poses.
      setFrame: function (name, frameIndex) {
        if (!SPRITES[name]) return;
        stopAnim(cat);
        setSprite(cat, name, frameIndex || 0);
      },

      // Inspect / extend.
      sprites: Object.keys(SPRITES),
      get position() { return { x: cat.state.x, y: cat.state.y }; },
    };
  }

  // Entry point — placed at the end of the IIFE so all `var` initializers
  // (SPRITES, BUBBLE_BAG, etc.) have run before init() reaches them via
  // scheduleCat → createCat → setSprite. With `defer`, the script evaluates
  // after parsing so document.readyState is 'interactive' here, not 'loading'.
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
