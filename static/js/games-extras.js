/* Games page extras:
 *   1. Small minimize/maximize icon button pinned to the Fluid Controls header
 *      (the full-width "— Minimize" bar is hidden via CSS and replaced with this).
 *   2. A "Click & drag anywhere" hint floating just above the controls panel,
 *      with a subtle cursor-arc glyph. Fades out once the user has dragged.
 *   3. A periodic cat companion that walks, trots, bounds, sits, looks around,
 *      grooms, and stretches across the page — paws-on-ground driving a fluid
 *      trail via window.fluidSplatScreen.
 *
 *  The cat is built as a rigged SVG (head, ears, eyes, body, tail, four legs
 *  with hip+knee joints) so each part can animate independently. A scene
 *  picker chooses between simple traversals and lingering visits where the
 *  cat stops, behaves like a cat for a few seconds, then leaves.
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
  // CAT COMPANION
  // =========================================================================

  // Wrapper sizing: 84 x 56 css px, viewBox 120 x 80. Foot ground line in
  // viewBox is y≈72, which maps to wrapper pixel (42, 50). We keep the cat's
  // feet anchored at world (x, y) by translating the wrapper to (x-42, y-50)
  // and setting transform-origin: 42px 50px — so rotation/scale pivot at the
  // feet just like a real cat planting its paws.
  var FOOT_OFFSET_X = 42;
  var FOOT_OFFSET_Y = 50;

  function scheduleCat() {
    var cat = createCat();
    document.body.appendChild(cat.root);

    // Background ambient idle animation (blink, ear twitch, breathing) runs
    // while the cat is on screen. Started/stopped per scene.

    function tick() {
      if (document.hidden) {
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
    wrap.innerHTML = catSvg();

    var legs = {};
    var legNodes = wrap.querySelectorAll('.cat-leg');
    for (var i = 0; i < legNodes.length; i++) {
      var n = legNodes[i];
      var key = n.classList.contains('cat-leg-bn') ? 'bn'
              : n.classList.contains('cat-leg-bf') ? 'bf'
              : n.classList.contains('cat-leg-fn') ? 'fn' : 'ff';
      legs[key] = {
        root:  n,
        thigh: n.querySelector('.cat-leg-thigh'),
        shin:  n.querySelector('.cat-leg-shin'),
      };
    }

    var cat = {
      root:    wrap,
      catRoot: wrap.querySelector('.cat-root'),
      body:    wrap.querySelector('.cat-body'),
      head:    wrap.querySelector('.cat-head'),
      tail:    wrap.querySelector('.cat-tail'),
      tailPath:wrap.querySelector('.cat-tail-curve'),
      tailStripes: wrap.querySelector('.cat-tail-stripes'),
      earBN:   wrap.querySelector('.cat-ear-bn'),
      earBF:   wrap.querySelector('.cat-ear-bf'),
      eyeShapes: wrap.querySelectorAll('.cat-eye-shape'),
      pupils:    wrap.querySelectorAll('.cat-pupil'),
      glints:    wrap.querySelectorAll('.cat-glint'),
      legs:    legs,
      state: {
        x: -9999, y: -9999,
        facing: 1,
        lastSplatX: undefined,
        lastSplatY: undefined,
        blinkPhase: 0,
        blinkTimer: null,
        earTimer: null,
        running: false,
      },
    };

    placeCat(cat, -9999, -9999, { facing: 1 });
    resetPose(cat);
    return cat;
  }

  // ------------------ Pose helpers ------------------

  function placeCat(cat, x, y, opts) {
    opts = opts || {};
    var s = cat.state;
    s.x = x;
    s.y = y;
    if (opts.facing !== undefined) s.facing = opts.facing;

    var rot = opts.rotation || 0;
    var scale = opts.scale || 1;

    cat.root.style.transform =
      'translate(' + (x - FOOT_OFFSET_X) + 'px,' + (y - FOOT_OFFSET_Y) + 'px) ' +
      'rotate(' + rot + 'deg) ' +
      (scale !== 1 ? 'scale(' + scale + ')' : '');

    // Mirror the cat-root group around viewBox x=60 to flip facing direction.
    cat.catRoot.setAttribute(
      'transform',
      s.facing < 0 ? 'translate(120 0) scale(-1 1)' : ''
    );

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
    // Splat at body center (~14 px above feet) for a cleaner trail.
    var cx = s.x;
    var cy = s.y - 14;
    var pcx = s.lastSplatX;
    var pcy = s.lastSplatY - 14;
    window.fluidSplatScreen(cx, cy, pcx, pcy);
    s.lastSplatX = s.x; s.lastSplatY = s.y;
  }

  function setLeg(leg, hipDeg, kneeDeg) {
    leg.thigh.setAttribute('transform', 'rotate(' + hipDeg.toFixed(2) + ')');
    leg.shin.setAttribute(
      'transform',
      'translate(0 9) rotate(' + kneeDeg.toFixed(2) + ')'
    );
  }

  // body translation (dy) and tilt (degrees) around its rough centre.
  function setBodyPose(cat, dy, tiltDeg) {
    var t = '';
    if (dy)      t += 'translate(0 ' + dy.toFixed(2) + ') ';
    if (tiltDeg) t += 'rotate(' + tiltDeg.toFixed(2) + ' 55 50) ';
    cat.body.setAttribute('transform', t);
  }

  function setHead(cat, dx, dy, deg) {
    var hx = 87 + (dx || 0);
    var hy = 40 + (dy || 0);
    var t = 'translate(' + hx.toFixed(2) + ' ' + hy.toFixed(2) + ')';
    if (deg) t += ' rotate(' + deg.toFixed(2) + ')';
    cat.head.setAttribute('transform', t);
  }

  function setTail(cat, deg, curl) {
    // Base tail anchor at viewBox (30, 52); rotate around that point.
    var t = 'translate(30 52) rotate(' + (deg || 0).toFixed(2) + ')';
    cat.tail.setAttribute('transform', t);
    if (curl !== undefined && cat.tailPath) {
      // Lerp the tail curve between a relaxed S and a tighter curl.
      // curl ∈ [0, 1] where 0 = relaxed, 1 = wrapped.
      var c = Math.max(0, Math.min(1, curl));
      var d =
        'M0,0 ' +
        'C ' + lerp(-6,  -3, c).toFixed(2) + ',' + lerp(-2,   2, c).toFixed(2) +
        ' ' + lerp(-14, -8, c).toFixed(2) + ',' + lerp(-8,   6, c).toFixed(2) +
        ' ' + lerp(-16, -2, c).toFixed(2) + ',' + lerp(-18,  4, c).toFixed(2) +
        ' C ' + lerp(-16, 4, c).toFixed(2) + ',' + lerp(-22, -4, c).toFixed(2) +
        ' ' + lerp(-10, 8, c).toFixed(2) + ',' + lerp(-24, -10, c).toFixed(2) +
        ' ' + lerp(-8,  6, c).toFixed(2) + ',' + lerp(-22, -14, c).toFixed(2);
      cat.tailPath.setAttribute('d', d);
      if (cat.tailStripes) cat.tailStripes.setAttribute('d', d);
    }
  }

  function setEar(cat, side, deg) {
    var ear = side === 'bn' ? cat.earBN : cat.earBF;
    var base = side === 'bn' ? 'translate(6 -10)' : 'translate(-4 -8)';
    ear.setAttribute('transform', base + ' rotate(' + deg.toFixed(2) + ')');
  }

  function setBlink(cat, phase) {
    // phase 0 = open, 1 = fully closed
    var p = Math.max(0, Math.min(1, phase));
    var ry = 2.3 * (1 - p) + 0.05 * p;
    for (var i = 0; i < cat.eyeShapes.length; i++) {
      cat.eyeShapes[i].setAttribute('ry', ry.toFixed(3));
    }
    var dimP = 1 - p;
    for (var j = 0; j < cat.pupils.length; j++) {
      cat.pupils[j].setAttribute('opacity', (0.7 * dimP).toFixed(3));
    }
    for (var k = 0; k < cat.glints.length; k++) {
      cat.glints[k].setAttribute('opacity', dimP.toFixed(3));
    }
    cat.state.blinkPhase = p;
  }

  function resetPose(cat) {
    setLeg(cat.legs.bn, 0, 0);
    setLeg(cat.legs.bf, 0, 0);
    setLeg(cat.legs.fn, 0, 0);
    setLeg(cat.legs.ff, 0, 0);
    setBodyPose(cat, 0, 0);
    setHead(cat, 0, 0, 0);
    setTail(cat, 0, 0);
    setEar(cat, 'bn', 0);
    setEar(cat, 'bf', 0);
    setBlink(cat, 0);
  }

  // ------------------ Ambient timers ------------------

  function startAmbient(cat) {
    cat.state.running = true;

    function blink() {
      var start = performance.now();
      var dur = 140;
      function step(now) {
        if (!cat.state.running) return;
        var p = Math.min((now - start) / dur, 1);
        // 0..0.5 close, 0.5..1 open
        var phase = p < 0.5 ? p * 2 : 2 - p * 2;
        setBlink(cat, phase);
        if (p < 1) requestAnimationFrame(step);
        else {
          setBlink(cat, 0);
          // Sometimes do a quick double blink.
          var nextDelay = (Math.random() < 0.18)
            ? 200 + Math.random() * 150
            : 1800 + Math.random() * 4500;
          cat.state.blinkTimer = setTimeout(blink, nextDelay);
        }
      }
      requestAnimationFrame(step);
    }
    cat.state.blinkTimer = setTimeout(blink, 900 + Math.random() * 1800);

    function earTwitch() {
      var side = Math.random() < 0.5 ? 'bn' : 'bf';
      var amp = 14 + Math.random() * 10;
      var dur = 220 + Math.random() * 120;
      var start = performance.now();
      function step(now) {
        if (!cat.state.running) return;
        var p = Math.min((now - start) / dur, 1);
        // Quick flick — fast out, slower return.
        var v = p < 0.35 ? -amp * (p / 0.35) : -amp * (1 - (p - 0.35) / 0.65);
        setEar(cat, side, v);
        if (p < 1) requestAnimationFrame(step);
        else {
          setEar(cat, side, 0);
          cat.state.earTimer = setTimeout(earTwitch, 2400 + Math.random() * 4500);
        }
      }
      requestAnimationFrame(step);
    }
    cat.state.earTimer = setTimeout(earTwitch, 2200 + Math.random() * 3000);
  }

  function stopAmbient(cat) {
    cat.state.running = false;
    if (cat.state.blinkTimer) clearTimeout(cat.state.blinkTimer);
    if (cat.state.earTimer)   clearTimeout(cat.state.earTimer);
    cat.state.blinkTimer = null;
    cat.state.earTimer   = null;
    setBlink(cat, 0);
    setEar(cat, 'bn', 0);
    setEar(cat, 'bf', 0);
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
  function easeOut(t)    { return 1 - Math.pow(1 - t, 2); }
  function easeIn(t)     { return t * t; }
  function easeInOut(t)  { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function smoothstep(t) { return t * t * (3 - 2 * t); }

  // ------------------ Walk / trot ------------------

  function walk(cat, x0, x1, y0, dir, durationMs, gait) {
    // gait: 'walk' | 'trot' | 'creep'
    var phaseHz   = gait === 'trot' ? 3.4 : (gait === 'creep' ? 1.0 : 1.9);
    var hipAmp    = gait === 'trot' ? 36  : (gait === 'creep' ? 18  : 26);
    var kneeAmp   = gait === 'trot' ? 30  : (gait === 'creep' ? 12  : 20);
    var bobAmp    = gait === 'trot' ? 1.6 : (gait === 'creep' ? 0.4 : 0.8);
    var tailSwish = gait === 'trot' ? 12  : (gait === 'creep' ? 16  : 8);
    var bodyTilt  = gait === 'trot' ? 3   : 0;
    var headBobAmp = gait === 'trot' ? 0.6 : 0.3;

    // Lateral-sequence walk (cat) vs diagonal trot.
    var phases = gait === 'trot'
      ? { bn: 0.0, ff: 0.0, bf: 0.5, fn: 0.5 }     // diagonal pairs
      : { bn: 0.0, ff: 0.25, bf: 0.5, fn: 0.75 };  // lateral sequence

    return animate(durationMs, function (p, now) {
      var x = x0 + (x1 - x0) * p;
      var phase = (now / 1000) * phaseHz;
      var bob = Math.sin(phase * Math.PI * 4) * bobAmp;  // 2× leg cycle
      var y = y0 + bob;

      Object.keys(phases).forEach(function (k) {
        var lp = (phase + phases[k]) % 1;
        var theta = lp * Math.PI * 2;
        // Hip cycle: foot plants forward (-amp) at theta=0, sweeps back through
        // 0 (mid-stance) to +amp (lift), then swings forward in the air.
        // Symmetric in SVG-local space — parent mirror handles facing.
        var hipDeg = -Math.cos(theta) * hipAmp;
        // Knee bend peaks during swing (theta π → 2π) so the paw clears
        // the ground when returning forward.
        var kneeDeg = Math.max(0, -Math.sin(theta)) * kneeAmp;
        setLeg(cat.legs[k], hipDeg, kneeDeg);
      });

      // Tail swishes counter to leg cycle for natural balance.
      setTail(cat, Math.sin(phase * Math.PI * 2) * tailSwish);

      setBodyPose(cat, bob, bodyTilt * dir);

      // Head bobs subtly counter to body to look balanced.
      setHead(cat, 0, -bob * 0.5 + headBobAmp, 0);

      placeCat(cat, x, y, { facing: dir });
    });
  }

  // ------------------ Bound (single hop) ------------------

  function bound(cat, x0, x1, baseY, arc, dir, durationMs) {
    return animate(durationMs, function (p) {
      var x = x0 + (x1 - x0) * p;
      // Vertical arc: launches around p≈0.18, peaks at 0.5, lands at 0.82.
      var flight = Math.max(0, Math.sin(Math.max(0, Math.min(1, (p - 0.15) / 0.7)) * Math.PI));
      var y = baseY - flight * arc;

      var hipBN, hipBF, hipFN, hipFF;
      var kneeBN, kneeBF, kneeFN, kneeFF;
      var bodyDip = 0;
      var bodyTiltDeg = 0;

      // Sign convention (svg-local, no `* dir` — parent mirror handles facing):
      //   back leg hip:  POSITIVE = foot pulls back behind cat (push-off)
      //                  NEGATIVE = foot tucks forward under body (gather)
      //   front leg hip: POSITIVE = foot pulls back under chest (gather)
      //                  NEGATIVE = foot reaches forward (plant on landing)
      if (p < 0.15) {
        // Crouch — all four legs flex; weight gathers low.
        var k = p / 0.15;
        bodyDip     = 4 * k;
        bodyTiltDeg = -7 * k * dir;
        hipBN  = -16 * k;          // back leg tucks forward under body
        hipBF  = -14 * k;
        hipFN  =  10 * k;          // front leg tucks back under chest
        hipFF  =   8 * k;
        kneeBN = 36 * k;
        kneeBF = 32 * k;
        kneeFN = 24 * k;
        kneeFF = 22 * k;
      } else if (p < 0.32) {
        // Push-off — back legs explode behind, body pitches forward.
        var k2 = (p - 0.15) / 0.17;
        bodyDip     = 4 - 7 * k2;
        bodyTiltDeg = (-7 + 22 * k2) * dir;
        hipBN  = -16 + 56 * k2;    // -16 → +40 (foot kicks back)
        hipBF  = -14 + 50 * k2;
        hipFN  =  10 + 16 * k2;    // tucks further (forearms close to chest)
        hipFF  =   8 + 14 * k2;
        kneeBN = 36 - 28 * k2;
        kneeBF = 32 - 24 * k2;
        kneeFN = 24 + 30 * k2;     // tighter tuck during push-off
        kneeFF = 22 + 28 * k2;
      } else if (p < 0.68) {
        // Flight — legs trail/tuck, body roughly horizontal.
        var k3 = (p - 0.32) / 0.36;
        bodyDip     = -3;
        bodyTiltDeg = (15 - 20 * k3) * dir;
        hipBN  = 40 - 36 * k3;     // back legs trail behind, drift back to neutral
        hipBF  = 36 - 32 * k3;
        hipFN  = 26 - 38 * k3;     // forearms swing from tucked back → reaching forward
        hipFF  = 22 - 36 * k3;
        kneeBN = 8;
        kneeBF = 10;
        kneeFN = 54 - 32 * k3;
        kneeFF = 50 - 30 * k3;
      } else if (p < 0.88) {
        // Reach — front legs extend forward to plant; back legs swing forward.
        var k4 = (p - 0.68) / 0.20;
        bodyDip     = -3 + 5 * k4;
        bodyTiltDeg = (-5 + 14 * k4) * dir;
        hipBN  = 4 - 8 * k4;       // back legs swing forward to gather under
        hipBF  = 4 - 6 * k4;
        hipFN  = -12 - 14 * k4;    // front legs reach FORWARD (foot ahead of hip)
        hipFF  = -12 - 12 * k4;
        kneeBN = 0;
        kneeBF = 4;
        kneeFN = 22 - 14 * k4;     // front knees straighten as paw extends
        kneeFF = 20 - 12 * k4;
      } else {
        // Land + absorb — front knees flex, body squishes.
        var k5 = (p - 0.88) / 0.12;
        var spring = Math.sin(k5 * Math.PI);
        bodyDip     = 2 + 3 * spring;
        bodyTiltDeg = (9 - 9 * k5) * dir;
        hipBN  = -4;
        hipBF  = -2;
        hipFN  = -26 + 16 * k5;    // front legs unweight as cat passes over
        hipFF  = -24 + 14 * k5;
        kneeBN = 6 + 10 * spring;
        kneeBF = 6 + 10 * spring;
        kneeFN = 8 + 24 * spring;  // big absorb bend at impact
        kneeFF = 8 + 22 * spring;
      }

      setLeg(cat.legs.bn, hipBN, kneeBN);
      setLeg(cat.legs.bf, hipBF, kneeBF);
      setLeg(cat.legs.fn, hipFN, kneeFN);
      setLeg(cat.legs.ff, hipFF, kneeFF);

      setBodyPose(cat, bodyDip, bodyTiltDeg);

      // Tail extends behind during flight, whips on landing. Symmetric in
      // svg-local — large negative rotation lays the tail along the body.
      var tailDeg = -8 - 36 * Math.sin(p * Math.PI);
      setTail(cat, tailDeg);

      // Head: lifts up at peak, drops on landing.
      setHead(cat, 0, bodyDip * 0.4 - 1.5 * Math.sin(p * Math.PI), 0);

      // Ears flatten slightly during fast flight.
      var earBack = -10 * Math.sin(p * Math.PI);
      setEar(cat, 'bn', earBack);
      setEar(cat, 'bf', earBack);

      placeCat(cat, x, baseY - flight * arc, { facing: dir });
    }).then(function () {
      // Restore ear baseline (ambient timer can take it from here).
      setEar(cat, 'bn', 0);
      setEar(cat, 'bf', 0);
    });
  }

  function boundSequence(cat, x0, x1, baseY, dir, hops) {
    var step = (x1 - x0) / hops;
    var i = 0;
    function next() {
      if (i >= hops) return Promise.resolve();
      var sx = x0 + i * step;
      var ex = sx + step;
      var arc = 90 + Math.random() * 70;
      var dur = 620 + Math.random() * 220;
      i++;
      return bound(cat, sx, ex, baseY, arc, dir, dur).then(next);
    }
    return next();
  }

  // ------------------ Idle behaviours ------------------

  function pause(cat, durationMs, x, y, dir) {
    return animate(durationMs, function (p, now) {
      var breath = Math.sin((now / 600)) * 0.35;
      setBodyPose(cat, breath, 0);
      setHead(cat, 0, -breath * 0.3, 0);
      setTail(cat, Math.sin(now / 700) * 3);
      setLeg(cat.legs.bn, 0, 0);
      setLeg(cat.legs.bf, 0, 0);
      setLeg(cat.legs.fn, 0, 0);
      setLeg(cat.legs.ff, 0, 0);
      placeCat(cat, x, y + breath, { facing: dir });
    });
  }

  // Head rotation has `* dir`: positive svg rotation is clockwise → for a
  // right-facing cat the chin tilts forward-down; the parent mirror flips
  // that so a negative-svg rotation reads the same way for a left-facing
  // cat. This lets us specify rotations in screen-relative degrees.
  function lookAround(cat, x, y, dir) {
    var sequence = [
      { dur: 320, from:   0, to: -14 },  // turn back
      { dur: 460, from: -14, to: -14 },
      { dur: 380, from: -14, to:  16 },
      { dur: 520, from:  16, to:  16 },
      { dur: 340, from:  16, to:   0 },
    ];
    var promise = Promise.resolve();
    sequence.forEach(function (seg, idx) {
      promise = promise.then(function () {
        return animate(seg.dur, function (p, now) {
          var k = idx % 2 === 0 ? smoothstep(p) : 1; // hold steps don't ease
          var degScreen = lerp(seg.from, seg.to, k);
          var breath = Math.sin((now / 700)) * 0.35;
          setHead(cat, 0, -breath * 0.3, degScreen * dir);
          setBodyPose(cat, breath, 0);
          setTail(cat, Math.sin(now / 600) * 4);
          placeCat(cat, x, y + breath, { facing: dir });
        });
      });
    });
    return promise;
  }

  // Sit pose constants (svg-local, symmetric):
  //   back hip POSITIVE → folds under tail
  //   knee bend POSITIVE → lower leg curls forward under body
  //   body tilt has `* dir` so the rear settles down regardless of facing.
  var SIT_BACK_HIP = 30, SIT_BACK_KNEE = 85;
  var SIT_BACK_HIP_2 = 28, SIT_BACK_KNEE_2 = 80;
  var SIT_BODY_DIP = 1.6, SIT_BODY_TILT = -4;
  var SIT_HEAD_DY = -1;
  var SIT_TAIL_DEG = -14, SIT_TAIL_CURL = 0.4;

  function sitDown(cat, x, y, dir) {
    return animate(520, function (p) {
      var k = easeInOut(p);
      setLeg(cat.legs.bn, SIT_BACK_HIP   * k, SIT_BACK_KNEE   * k);
      setLeg(cat.legs.bf, SIT_BACK_HIP_2 * k, SIT_BACK_KNEE_2 * k);
      setLeg(cat.legs.fn, 0, 0);
      setLeg(cat.legs.ff, 0, 0);
      setBodyPose(cat, SIT_BODY_DIP * k, SIT_BODY_TILT * k * dir);
      setHead(cat, 0, SIT_HEAD_DY * k, 0);
      setTail(cat, SIT_TAIL_DEG * k, SIT_TAIL_CURL * k);
      placeCat(cat, x, y, { facing: dir });
    });
  }

  function sitIdle(cat, durationMs, x, y, dir) {
    return animate(durationMs, function (p, now) {
      var breath = Math.sin((now / 720)) * 0.4;
      setBodyPose(cat, SIT_BODY_DIP + breath, SIT_BODY_TILT * dir);
      setHead(cat, 0, SIT_HEAD_DY - breath * 0.3, 0);
      setLeg(cat.legs.bn, SIT_BACK_HIP,   SIT_BACK_KNEE);
      setLeg(cat.legs.bf, SIT_BACK_HIP_2, SIT_BACK_KNEE_2);
      setLeg(cat.legs.fn, 0, 0);
      setLeg(cat.legs.ff, 0, 0);
      // Tail flicks: subtle high-frequency swish modulated by a slow envelope.
      var twitch = Math.sin(now / 260) * (0.5 + 0.5 * Math.sin(now / 1700));
      setTail(cat, SIT_TAIL_DEG + twitch * 6, SIT_TAIL_CURL);
      placeCat(cat, x, y, { facing: dir });
    });
  }

  function standUp(cat, x, y, dir) {
    return animate(450, function (p) {
      var k = 1 - easeInOut(p);
      setLeg(cat.legs.bn, SIT_BACK_HIP   * k, SIT_BACK_KNEE   * k);
      setLeg(cat.legs.bf, SIT_BACK_HIP_2 * k, SIT_BACK_KNEE_2 * k);
      setLeg(cat.legs.fn, 0, 0);
      setLeg(cat.legs.ff, 0, 0);
      setBodyPose(cat, SIT_BODY_DIP * k, SIT_BODY_TILT * k * dir);
      setHead(cat, 0, SIT_HEAD_DY * k, 0);
      setTail(cat, SIT_TAIL_DEG * k, SIT_TAIL_CURL * k);
      placeCat(cat, x, y, { facing: dir });
    });
  }

  function groomPaw(cat, x, y, dir) {
    // Sit, then lift the near front leg toward the face and "lick" it.
    return animate(2600, function (p, now) {
      // Hold the sit pose underneath.
      setBodyPose(cat, SIT_BODY_DIP, SIT_BODY_TILT * dir);
      setLeg(cat.legs.bn, SIT_BACK_HIP,   SIT_BACK_KNEE);
      setLeg(cat.legs.bf, SIT_BACK_HIP_2, SIT_BACK_KNEE_2);
      setLeg(cat.legs.ff, 0, 0);

      // Envelope: 0..0.18 raise, 0.18..0.78 hold-and-lick, 0.78..1 lower.
      var lift;
      if (p < 0.18) lift = easeOut(p / 0.18);
      else if (p < 0.78) lift = 1;
      else lift = 1 - easeIn((p - 0.78) / 0.22);

      // Front-near leg lifts up toward the face. Hip negative = foot moves
      // forward in svg-local; knee bends sharply to fold the lower leg up.
      setLeg(cat.legs.fn, -78 * lift, 95 * lift);

      // Head dips down and tilts toward the paw — `* dir` keeps the tilt
      // consistent in screen space when the cat faces the other way.
      var lickWob = lift > 0.4 ? Math.sin(now / 65) * 1.4 * lift : 0;
      setHead(cat, 0, 4 * lift, (-22 * lift + lickWob) * dir);

      // Tail flicks gently while grooming.
      setTail(cat, SIT_TAIL_DEG + Math.sin(now / 350) * 4, SIT_TAIL_CURL);

      placeCat(cat, x, y, { facing: dir });
    });
  }

  function stretch(cat, x, y, dir) {
    // Classic downward-dog stretch: front paws reach forward, haunches high.
    return animate(2000, function (p) {
      var k = p < 0.55
        ? easeInOut(p / 0.55)
        : 1 - easeInOut((p - 0.55) / 0.45);

      // Front legs reach forward (foot well ahead of hip — hip very negative).
      setLeg(cat.legs.fn, -52 * k, 22 * k);
      setLeg(cat.legs.ff, -50 * k, 20 * k);
      // Back legs straighten under haunches.
      setLeg(cat.legs.bn,  -8 * k,  2 * k);
      setLeg(cat.legs.bf,  -8 * k,  2 * k);
      // Body droops in the middle, head dips low.
      setBodyPose(cat, 5 * k, 0);
      setHead(cat, 0, 7 * k, 8 * k * dir);
      // Tail held high.
      setTail(cat, 30 * k, 0);

      placeCat(cat, x, y - 1 * k, { facing: dir });
    });
  }

  // ------------------ Scene composition ------------------

  function runCatScene(cat) {
    return new Promise(function (resolve) {
      resetPose(cat);
      cat.root.classList.add('is-active');
      startAmbient(cat);

      var w = window.innerWidth;
      var h = window.innerHeight;
      var dir = Math.random() > 0.5 ? 1 : -1;
      var pad = 110;
      // Keep cat below the marquee/header, above bottom margin.
      var minY = Math.max(220, h * 0.34);
      var maxY = Math.max(minY + 60, h * 0.86);
      var baseY = minY + Math.random() * (maxY - minY);

      var startX = dir > 0 ? -pad : w + pad;
      var endX   = dir > 0 ? w + pad : -pad;
      // Anchor the trail at the entry point BEFORE placing the cat — otherwise
      // paintTrail would splat a line from wherever the cat was last hidden.
      cat.state.lastSplatX = startX;
      cat.state.lastSplatY = baseY;
      placeCat(cat, startX, baseY, { facing: dir });

      var roll = Math.random();
      var scene;
      if (roll < 0.22) {
        scene = walk(cat, startX, endX, baseY, dir, 6500 + Math.random() * 2200, 'walk');
      } else if (roll < 0.42) {
        scene = walk(cat, startX, endX, baseY, dir, 3200 + Math.random() * 1100, 'trot');
      } else if (roll < 0.65) {
        scene = boundPass(cat, startX, endX, baseY, dir);
      } else {
        scene = lingerScene(cat, startX, endX, baseY, dir, w);
      }

      scene.then(function () {
        cat.root.classList.remove('is-active');
        stopAmbient(cat);
        // After fade-out, snap offscreen so the next placement doesn't peek.
        // Clearing the trail anchor first prevents painting a long streak
        // from the cat's last on-screen position to (-9999, -9999).
        setTimeout(function () {
          cat.state.lastSplatX = undefined;
          cat.state.lastSplatY = undefined;
          placeCat(cat, -9999, -9999, { facing: 1 });
          resolve();
        }, 360);
      });
    });
  }

  function boundPass(cat, startX, endX, baseY, dir) {
    var hops = 2 + Math.floor(Math.random() * 3); // 2–4 hops
    return boundSequence(cat, startX, endX, baseY, dir, hops);
  }

  function lingerScene(cat, startX, endX, baseY, dir, w) {
    // Walk in to a stop point, do 1–3 idle behaviours, then leave.
    var stopX = w * (0.22 + Math.random() * 0.56);
    // Make sure the stop point is in the direction of motion.
    if (dir > 0 && stopX < startX + 200) stopX = startX + 200 + Math.random() * 200;
    if (dir < 0 && stopX > startX - 200) stopX = startX - 200 - Math.random() * 200;

    var entryGait = Math.random() < 0.65 ? 'walk' : 'trot';
    var entryDur  = entryGait === 'trot' ? 1900 : 2800;

    return walk(cat, startX, stopX, baseY, dir, entryDur, entryGait)
      .then(function () { return pause(cat, 400 + Math.random() * 300, stopX, baseY, dir); })
      .then(function () { return idleSequence(cat, stopX, baseY, dir); })
      .then(function () {
        // Decide exit: 25% of the time turn around and leave the way it came.
        var exitDir = Math.random() < 0.25 ? -dir : dir;
        var exitX   = exitDir > 0 ? Math.abs(endX) + 50 : -(Math.abs(endX) + 50);
        var exitRoll = Math.random();
        if (exitRoll < 0.45) {
          var hops = 2 + Math.floor(Math.random() * 3);
          return boundSequence(cat, stopX, exitX, baseY, exitDir, hops);
        }
        var exitGait = exitRoll < 0.78 ? 'trot' : 'walk';
        var exitDur  = exitGait === 'trot' ? 2400 : 3600;
        return walk(cat, stopX, exitX, baseY, exitDir, exitDur, exitGait);
      });
  }

  function idleSequence(cat, x, y, dir) {
    var actions = [];
    // Almost always look around first.
    if (Math.random() < 0.85) actions.push('look');

    var roll = Math.random();
    if (roll < 0.35) {
      // Sit + groom.
      actions.push('sit');
      if (Math.random() < 0.7) actions.push('groom');
      else actions.push('sitIdle');
      actions.push('stand');
    } else if (roll < 0.55) {
      // Sit briefly.
      actions.push('sit');
      actions.push('sitIdle');
      actions.push('stand');
    } else if (roll < 0.78) {
      // Stretch.
      actions.push('stretch');
    } else {
      // Just look around again — restless cat.
      actions.push('look');
    }

    // Optional second look at the end.
    if (Math.random() < 0.4) actions.push('look');

    var promise = Promise.resolve();
    actions.forEach(function (a) {
      promise = promise.then(function () {
        switch (a) {
          case 'look':    return lookAround(cat, x, y, dir);
          case 'sit':     return sitDown(cat, x, y, dir);
          case 'stand':   return standUp(cat, x, y, dir);
          case 'sitIdle': return sitIdle(cat, 1600 + Math.random() * 1800, x, y, dir);
          case 'groom':   return groomPaw(cat, x, y, dir);
          case 'stretch': return stretch(cat, x, y, dir);
        }
        return null;
      });
    });
    return promise;
  }

  // =========================================================================
  // SVG markup
  // =========================================================================
  function catSvg() {
    return [
      '<svg class="cat-svg" viewBox="0 0 120 80" width="84" height="56" aria-hidden="true">',
      '  <defs>',
      '    <linearGradient id="cat-fur" x1="0" y1="0" x2="0" y2="1">',
      '      <stop offset="0%"   stop-color="#ffffff"/>',
      '      <stop offset="60%"  stop-color="#eef0fa"/>',
      '      <stop offset="100%" stop-color="#c8d0ee"/>',
      '    </linearGradient>',
      '    <linearGradient id="cat-belly" x1="0" y1="0" x2="0" y2="1">',
      '      <stop offset="0%"   stop-color="#fff8fb"/>',
      '      <stop offset="100%" stop-color="#e6e9fb"/>',
      '    </linearGradient>',
      '    <radialGradient id="cat-ear-pink" cx="0.5" cy="0.7" r="0.6">',
      '      <stop offset="0%"   stop-color="#ffb1ce"/>',
      '      <stop offset="100%" stop-color="#ff5e98"/>',
      '    </radialGradient>',
      '  </defs>',
      '  <g class="cat-root">',

      // Tail — drawn first so it sits behind the body.
      '    <g class="cat-tail" transform="translate(30 52)">',
      '      <path class="cat-tail-curve" d="M0,0 C -6,-2 -14,-8 -16,-18 C -16,-22 -10,-24 -8,-22"',
      '            fill="none" stroke="url(#cat-fur)" stroke-width="6" stroke-linecap="round"/>',
      '      <path class="cat-tail-stripes" d="M0,0 C -6,-2 -14,-8 -16,-18 C -16,-22 -10,-24 -8,-22"',
      '            fill="none" stroke="#aab2d4" stroke-width="0.7" stroke-linecap="round"',
      '            stroke-dasharray="1.6 4" opacity="0.45"/>',
      '    </g>',

      // Far-side legs (slightly muted, behind body). Both shifted a few
      // units toward the tail relative to their near-side partners — a
      // small perspective trick that hints at depth without going full 3/4.
      legSvg('cat-leg-bf', 39, 51, '#cdd5f0', '#bcc4e6', 5, 4.2, false),
      legSvg('cat-leg-ff', 71, 51, '#cdd5f0', '#bcc4e6', 5, 4.2, false),

      // Body.
      '    <g class="cat-body">',
      '      <ellipse cx="37" cy="50" rx="14.5" ry="13.2" fill="url(#cat-fur)"/>',
      '      <ellipse cx="60" cy="48" rx="28"   ry="11"   fill="url(#cat-fur)"/>',
      '      <g stroke="#a3acd0" stroke-width="0.8" stroke-linecap="round" opacity="0.4" fill="none">',
      '        <path d="M44,40 q3,-1.6 6,0"/>',
      '        <path d="M52,38.5 q3,-1.6 6,0"/>',
      '        <path d="M60,38 q3,-1.6 6,0"/>',
      '        <path d="M68,38.5 q3,-1.6 6,0"/>',
      '        <path d="M76,40 q3,-1.6 6,0"/>',
      '      </g>',
      '      <ellipse cx="56" cy="55" rx="22" ry="5" fill="url(#cat-belly)" opacity="0.85"/>',
      '    </g>',

      // Near-side legs (in front of body).
      legSvg('cat-leg-bn', 43, 52, 'url(#cat-fur)', '#d4dbf5', 5.5, 4.5, true),
      legSvg('cat-leg-fn', 75, 52, 'url(#cat-fur)', '#d4dbf5', 5.5, 4.5, true),

      // Head — translates to keep its centre near (90, 42).
      '    <g class="cat-head" transform="translate(87 40)">',
      '      <g class="cat-ear cat-ear-bf" transform="translate(-4 -8)">',
      '        <polygon points="0,0 4,-10 8,-1" fill="url(#cat-fur)"/>',
      '        <polygon points="2,-1 4,-7 6,-2" fill="url(#cat-ear-pink)"/>',
      '      </g>',
      '      <g class="cat-ear cat-ear-bn" transform="translate(6 -10)">',
      '        <polygon points="0,0 5,-11 9,-1" fill="url(#cat-fur)"/>',
      '        <polygon points="2,-1 5,-8 7,-2" fill="url(#cat-ear-pink)"/>',
      '      </g>',
      '      <ellipse cx="3" cy="2" rx="11" ry="10" fill="url(#cat-fur)"/>',
      '      <g stroke="#a3acd0" stroke-width="0.7" stroke-linecap="round" fill="none" opacity="0.5">',
      '        <path d="M-1,-3 q-1,-2 -2,-3"/>',
      '        <path d="M3,-4 q0,-2 0,-3"/>',
      '        <path d="M7,-3 q1,-2 2,-3"/>',
      '      </g>',
      '      <ellipse cx="3" cy="6" rx="8" ry="3.6" fill="url(#cat-fur)"/>',
      '      <g class="cat-eyes">',
      '        <g class="cat-eye cat-eye-bf">',
      '          <ellipse class="cat-eye-shape" cx="-1.5" cy="1.2" rx="1.7" ry="2.3" fill="#1a1330"/>',
      '          <ellipse class="cat-pupil"     cx="-1.5" cy="1.2" rx="0.55" ry="2" fill="#5dffd0" opacity="0.7"/>',
      '          <circle  class="cat-glint"     cx="-1.9" cy="0.3" r="0.5" fill="#fff"/>',
      '        </g>',
      '        <g class="cat-eye cat-eye-bn">',
      '          <ellipse class="cat-eye-shape" cx="6"   cy="1.2" rx="1.7" ry="2.3" fill="#1a1330"/>',
      '          <ellipse class="cat-pupil"     cx="6"   cy="1.2" rx="0.55" ry="2" fill="#5dffd0" opacity="0.7"/>',
      '          <circle  class="cat-glint"     cx="5.6" cy="0.3" r="0.5" fill="#fff"/>',
      '        </g>',
      '      </g>',
      '      <path d="M1.6,4.8 L4.4,4.8 L3,6.2 Z" fill="#ff7da9"/>',
      '      <path d="M3,6.2 q-0.9,1.6 -2.4,1.3 M3,6.2 q0.9,1.6 2.4,1.3"',
      '            stroke="#1a1330" stroke-width="0.7" fill="none" stroke-linecap="round"/>',
      '      <g class="cat-whiskers" stroke="#1a1330" stroke-width="0.4" stroke-linecap="round" opacity="0.7">',
      '        <line x1="-3" y1="4.4" x2="-10" y2="3.4"/>',
      '        <line x1="-3" y1="5.6" x2="-10" y2="5.8"/>',
      '        <line x1="-3" y1="6.8" x2="-10" y2="8.4"/>',
      '        <line x1="9"  y1="4.4" x2="16"  y2="3.4"/>',
      '        <line x1="9"  y1="5.6" x2="16"  y2="5.8"/>',
      '        <line x1="9"  y1="6.8" x2="16"  y2="8.4"/>',
      '      </g>',
      '    </g>',
      '  </g>',
      '</svg>',
    ].join('\n');
  }

  function legSvg(cls, hx, hy, stroke, pawFill, thigh, shin, withToes) {
    var toes = withToes
      ? '<line x1="-1.5" y1="11" x2="-1.5" y2="11.8" stroke="#1a1330" stroke-width="0.5" stroke-linecap="round"/>' +
        '<line x1="0"    y1="11" x2="0"    y2="11.8" stroke="#1a1330" stroke-width="0.5" stroke-linecap="round"/>' +
        '<line x1="1.5"  y1="11" x2="1.5"  y2="11.8" stroke="#1a1330" stroke-width="0.5" stroke-linecap="round"/>'
      : '';
    var pawCy = withToes ? 11 : 10.4;
    var pawRX = withToes ? 3.4 : 3;
    var pawRY = withToes ? 2 : 1.7;
    return [
      '    <g class="cat-leg ' + cls + '" transform="translate(' + hx + ' ' + hy + ')">',
      '      <g class="cat-leg-thigh">',
      '        <line x1="0" y1="0" x2="0" y2="9" stroke="' + stroke + '" stroke-width="' + thigh + '" stroke-linecap="round"/>',
      '        <g class="cat-leg-shin" transform="translate(0 9)">',
      '          <line x1="0" y1="0" x2="0" y2="9" stroke="' + stroke + '" stroke-width="' + shin + '" stroke-linecap="round"/>',
      '          <ellipse cx="0" cy="' + pawCy + '" rx="' + pawRX + '" ry="' + pawRY + '" fill="' + pawFill + '"/>',
      toes ? '          ' + toes : '',
      '        </g>',
      '      </g>',
      '    </g>',
    ].filter(Boolean).join('\n');
  }
})();
