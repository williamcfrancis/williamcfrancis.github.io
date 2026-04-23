/* Games page extras:
 *   1. Small minimize/maximize icon button pinned to the Fluid Controls header
 *      (the full-width "— Minimize" bar is hidden via CSS and replaced with this).
 *   2. A "Click & drag anywhere" hint floating just above the controls panel,
 *      with a subtle cursor-arc glyph. Fades out once the user has dragged.
 *   3. Every 30 seconds a cat hops across the viewport; the fluid sim paints
 *      a trail along its trajectory by calling window.fluidSplatScreen.
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
        // No panel — still show the hint; drag works regardless of the panel.
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

  // ---------- Periodic cat with fluid trail ----------
  function scheduleCat() {
    var cat = document.createElement('div');
    cat.className = 'games-cat';
    cat.setAttribute('aria-hidden', 'true');
    cat.innerHTML = catSvg();
    cat.style.transform = 'translate(-400px, -400px)';
    document.body.appendChild(cat);

    var FIRST_DELAY = 30000;
    var INTERVAL = 30000;

    function run() {
      if (!document.hidden) jumpCat(cat);
      setTimeout(run, INTERVAL);
    }
    setTimeout(run, FIRST_DELAY);
  }

  function jumpCat(cat) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var leftToRight = Math.random() > 0.5;
    var pad = 140;
    var startX = leftToRight ? -pad : w + pad;
    var endX   = leftToRight ? w + pad : -pad;
    var baseY  = h * (0.35 + Math.random() * 0.35);
    var arc    = 120 + Math.random() * 180;
    var duration = 2400;
    var size = 60;

    cat.classList.add('is-active');

    var startTime = null;
    var prevCx = startX + size / 2;
    var prevCy = baseY + size / 2;

    function step(t) {
      if (startTime === null) startTime = t;
      var p = Math.min((t - startTime) / duration, 1);
      var x = startX + (endX - startX) * p;
      var y = baseY - Math.sin(p * Math.PI) * arc;
      var tilt = (leftToRight ? 1 : -1) * Math.cos(p * Math.PI) * 16;
      var flip = leftToRight ? 1 : -1;
      cat.style.transform =
        'translate(' + x + 'px, ' + y + 'px) scaleX(' + flip + ') rotate(' + tilt + 'deg)';

      var cx = x + size / 2;
      var cy = y + size / 2;
      if (typeof window.fluidSplatScreen === 'function') {
        window.fluidSplatScreen(cx, cy, prevCx, prevCy);
      }
      prevCx = cx;
      prevCy = cy;

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        cat.classList.remove('is-active');
      }
    }
    requestAnimationFrame(step);
  }

  function catSvg() {
    return (
      '<svg viewBox="0 0 72 60" width="60" height="50" aria-hidden="true">' +
      '  <defs>' +
      '    <linearGradient id="cat-body-grad" x1="0" y1="0" x2="0" y2="1">' +
      '      <stop offset="0%" stop-color="#ffffff"/>' +
      '      <stop offset="100%" stop-color="#d8defa"/>' +
      '    </linearGradient>' +
      '  </defs>' +
      '  <g>' +
      '    <polygon points="14,14 22,26 20,8"  fill="url(#cat-body-grad)"/>' +
      '    <polygon points="54,14 46,26 48,8"  fill="url(#cat-body-grad)"/>' +
      '    <polygon points="17,11 20,18 16,14" fill="#ff8fb8"/>' +
      '    <polygon points="51,11 48,18 52,14" fill="#ff8fb8"/>' +
      '    <ellipse cx="36" cy="34" rx="24" ry="19" fill="url(#cat-body-grad)"/>' +
      '    <path d="M57,38 Q68,30 64,18 Q62,26 58,28 Z" fill="url(#cat-body-grad)"/>' +
      '    <ellipse cx="28" cy="32" rx="2.2" ry="3" fill="#1a1330"/>' +
      '    <ellipse cx="44" cy="32" rx="2.2" ry="3" fill="#1a1330"/>' +
      '    <circle cx="27.3" cy="31" r="0.7" fill="#fff"/>' +
      '    <circle cx="43.3" cy="31" r="0.7" fill="#fff"/>' +
      '    <polygon points="34,38 38,38 36,41" fill="#ff8fb8"/>' +
      '    <path d="M36,41 Q33,44 30,42 M36,41 Q39,44 42,42" stroke="#1a1330" stroke-width="1" fill="none" stroke-linecap="round"/>' +
      '    <g stroke="#1a1330" stroke-width="0.8" stroke-linecap="round">' +
      '      <line x1="22" y1="37" x2="12" y2="35"/>' +
      '      <line x1="22" y1="39" x2="12" y2="40"/>' +
      '      <line x1="50" y1="37" x2="60" y2="35"/>' +
      '      <line x1="50" y1="39" x2="60" y2="40"/>' +
      '    </g>' +
      '  </g>' +
      '</svg>'
    );
  }
})();
