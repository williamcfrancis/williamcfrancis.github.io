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

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

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

  function scheduleCat() {
    var cat = createCat();
    document.body.appendChild(cat.root);
    window.gamesCat = catApi(cat);

    function tick() {
      if (document.hidden) {
        setTimeout(tick, 4000);
        return;
      }
      if (cat.state.scenesPaused) {
        setTimeout(tick, 4000);
        return;
      }
      runCatScene(cat).then(function () {
        var nextDelay = 14000 + Math.random() * 26000; // 14–40 s gap
        setTimeout(tick, nextDelay);
      });
    }
    setTimeout(tick, 9000 + Math.random() * 9000); // first appearance after 9–18 s
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
        lastSplatX: undefined,
        lastSplatY: undefined,
        animTimer: null,
        scenesPaused: false,
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
    paintTrail(cat);
  }

  function paintTrail(cat) {
    if (typeof window.fluidSplatScreen !== 'function') return;
    var s = cat.state;
    if (s.lastSplatX === undefined) {
      s.lastSplatX = s.x; s.lastSplatY = s.y;
      return;
    }
    var dx = s.x - s.lastSplatX;
    var dy = s.y - s.lastSplatY;
    if (dx * dx + dy * dy < 6) {
      s.lastSplatX = s.x; s.lastSplatY = s.y;
      return;
    }
    // Splat at body center (~16 px above feet) for a cleaner trail.
    var cx = s.x;
    var cy = s.y - 16;
    var pcx = s.lastSplatX;
    var pcy = s.lastSplatY - 16;
    window.fluidSplatScreen(cx, cy, pcx, pcy);
    s.lastSplatX = s.x; s.lastSplatY = s.y;
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

  // Cycle through frames of an animation at the given period.
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
    cat.state.animTimer = setInterval(function () {
      i = (i + 1) % frames.length;
      setSprite(cat, name, i);
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
    });
  }

  // ------------------ Scene composition ------------------

  function runCatScene(cat) {
    return new Promise(function (resolve) {
      cat.root.classList.add('is-active');

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

      // Anchor trail BEFORE first place so we don't draw a streak from offscreen.
      cat.state.lastSplatX = startX;
      cat.state.lastSplatY = startY;
      placeCat(cat, startX, startY);

      var roll = Math.random();
      var scene;
      if (roll < 0.35) {
        // Casual stroll, sometimes diagonal.
        var endY = minY + Math.random() * (maxY - minY);
        var endX = enterLeft ? w + pad : -pad;
        var dist = Math.hypot(endX - startX, endY - startY);
        scene = walkTo(cat, startX, startY, endX, endY, dist / 0.20, 200);
      } else if (roll < 0.55) {
        // Brisker pass — frames swap faster, motion is faster.
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
        // After fade-out, snap offscreen and clear trail anchor so the next
        // placement doesn't paint a long streak from the cat's last spot.
        setTimeout(function () {
          cat.state.lastSplatX = undefined;
          cat.state.lastSplatY = undefined;
          placeCat(cat, -9999, -9999);
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

    return walkTo(cat, startX, startY, stopX, stopY, entryDist / entrySpeed, entryFrame)
      .then(function () { return idleSequence(cat, stopX, stopY, w); })
      .then(function () {
        // Decide exit: 25% turn-around, otherwise continue same direction.
        var exitLeft = Math.random() < 0.25 ? enterLeft : !enterLeft;
        var exitX = exitLeft ? -100 : w + 100;
        var exitY = minY + Math.random() * (maxY - minY);
        var exitDist = Math.hypot(exitX - stopX, exitY - stopY);
        var exitFast = Math.random() < 0.5;
        return walkTo(
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
        return holdAnim(cat, a.name, a.dur, a.period);
      });
    });
    return promise;
  }

  // ------------------ Public API ------------------
  // Exposed as window.gamesCat once the cat is mounted. Lets external code
  // drive the cat — e.g. trigger a sleep scene from a game over screen, or
  // walk it to a specific point of interest.
  function catApi(cat) {
    return {
      // Direct DOM controls.
      show: function () { cat.root.classList.add('is-active'); },
      hide: function () { cat.root.classList.remove('is-active'); },

      // Pause / resume the auto-scheduled wandering scenes (manual control).
      pauseScenes:  function () { cat.state.scenesPaused = true; },
      resumeScenes: function () { cat.state.scenesPaused = false; },

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

      // Snap to a location with no animation. Resets the trail anchor so a
      // subsequent moveTo doesn't paint a streak from the previous spot.
      placeAt: function (x, y) {
        cat.state.lastSplatX = x;
        cat.state.lastSplatY = y;
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
})();
