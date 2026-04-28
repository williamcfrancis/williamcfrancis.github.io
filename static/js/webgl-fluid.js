/*
MIT License

Copyright (c) 2017 Pavel Dobryakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* Vendored from https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
 * Local patches:
 *   A) (removed — dat.GUI is re-enabled; see glassy CSS overrides in games-page.css)
 *   B) promo / app-store DOM + ga() references guarded for null (games page has none)
 *   C) mousedown/mousemove/touchstart/touchmove listeners moved from canvas to window;
 *      offsetX/Y -> clientX/Y so clicks pass through a pointer-events:none canvas
 *   D) visibilitychange pause + mobile resolution downscale + reduced-motion pause
 *      appended at end of file
 */

'use strict';

/* ---------- Patch F10: optional OffscreenCanvas + Web Worker mode ----------
 * Set `window.FLUID_USE_WORKER = true` BEFORE this script loads to move the
 * fluid sim into a dedicated worker. On a busy page this saves 5–15 ms/frame
 * by isolating WebGL render work from the main thread (Hugo, Bootstrap, the
 * cat companion's DOM updates). When the flag is off (default), this block
 * is a no-op and the existing main-thread code below runs unchanged.
 *
 * Implementation: webgl-fluid-worker.js stubs the DOM/window APIs we touch,
 * then importScripts() this file inside the worker so there's a single
 * source of truth. The flag-check below ALSO short-circuits the bootstrap
 * inside that imported context (`typeof importScripts !== 'function'`) — we
 * only want to spawn a worker from the main thread.
 *
 * Browser support: Chrome 69+, Firefox 105+, Safari 16.4+. Falls back
 * silently to main-thread mode on browsers without OffscreenCanvas. */
if (typeof window !== 'undefined'
    && window.FLUID_USE_WORKER === true
    && typeof importScripts !== 'function'
    && typeof OffscreenCanvas !== 'undefined'
    && typeof HTMLCanvasElement !== 'undefined'
    && 'transferControlToOffscreen' in HTMLCanvasElement.prototype) {
    (function _bootFluidWorker () {
        const _canvas = document.getElementsByTagName('canvas')[0];
        if (!_canvas) return;
        let offscreen;
        try { offscreen = _canvas.transferControlToOffscreen(); }
        catch (err) {
            console.warn('[fluid] transferControlToOffscreen failed; falling back to main-thread', err);
            return;
        }
        // From here on, the canvas is dead to the main thread (you can't
        // create a new context on a transferred canvas). Commit to worker
        // mode regardless of subsequent failures — never let main-thread try
        // to claim a dead canvas, which would throw later in getWebGLContext.
        window.__fluidWorkerEngaged = true;
        // Discover this script's URL so we can resolve the worker URL alongside
        // it. With <script defer> document.currentScript is null at execution
        // time — fall back to a query selector for any script tag mentioning us.
        let scriptUrl = '';
        try { scriptUrl = (document.currentScript && document.currentScript.src) || ''; } catch (_) {}
        if (!scriptUrl) {
            const scripts = document.querySelectorAll('script[src*="webgl-fluid"]');
            // Prefer non-worker entries (filter out webgl-fluid-worker.js if present)
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scripts[i].src.indexOf('webgl-fluid-worker') === -1) {
                    scriptUrl = scripts[i].src; break;
                }
            }
            if (!scriptUrl && scripts.length) scriptUrl = scripts[scripts.length - 1].src;
        }
        if (!scriptUrl) {
            console.warn('[fluid] could not locate own script URL; aborting worker bootstrap');
            return;
        }
        const workerUrl = scriptUrl.replace(/webgl-fluid\.js(\?.*)?$/, 'webgl-fluid-worker.js$1');

        let worker;
        try { worker = new Worker(workerUrl); }
        catch (err) {
            console.warn('[fluid] worker creation failed; falling back to main-thread', err);
            return;
        }
        worker.addEventListener('error', function (err) {
            console.warn('[fluid] worker error', (err && err.message) || err);
        });
        worker.addEventListener('message', function (ev) {
            if (ev.data && ev.data.type === 'error') console.warn('[fluid] worker init error', ev.data.message);
        });

        const send = function (msg, transfers) { worker.postMessage(msg, transfers || []); };
        send({
            type: 'init',
            canvas: offscreen,
            scriptUrl: scriptUrl,
            dpr: window.devicePixelRatio || 1,
            maxDPR: window.FLUID_MAX_DPR || 2.0,
            clientW: _canvas.clientWidth,
            clientH: _canvas.clientHeight,
            reducedMotion: window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)').matches : false,
            isMobile: /Mobi|Android/i.test(navigator.userAgent),
        }, [offscreen]);

        // DPR / reduced-motion change forwarding
        if (window.matchMedia) {
            const rm = matchMedia('(prefers-reduced-motion: reduce)');
            rm.addEventListener('change', function () { send({ type: 'reducedmotion', value: rm.matches }); });
            (function _watchDPR () {
                matchMedia('(resolution: ' + (window.devicePixelRatio || 1) + 'dppx)')
                    .addEventListener('change', function () {
                        send({ type: 'dpr', value: window.devicePixelRatio || 1 });
                        _watchDPR();
                    }, { once: true });
            })();
        }

        // Resize observer (main thread observes; worker can't see DOM layout)
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(function (es) {
                const e = es[0];
                const box = e.contentBoxSize
                    ? (Array.isArray(e.contentBoxSize) ? e.contentBoxSize[0] : e.contentBoxSize)
                    : null;
                send({
                    type: 'resize',
                    clientW: box ? box.inlineSize : e.contentRect.width,
                    clientH: box ? box.blockSize  : e.contentRect.height,
                });
            }).observe(_canvas);
        } else {
            window.addEventListener('resize', function () {
                send({ type: 'resize', clientW: _canvas.clientWidth, clientH: _canvas.clientHeight });
            });
        }

        // Visibility (worker rAF still throttled by browser when hidden, but we
        // explicitly pause too — same behavior as main-thread Patch D).
        document.addEventListener('visibilitychange', function () {
            send({ type: 'visibility', hidden: document.hidden });
        });

        // Input forwarding — mirrors Patch C: window listeners (not canvas) so
        // pointer-events:none on the canvas doesn't swallow events.
        window.addEventListener('mousedown', function (e) { send({ type: 'mousedown', x: e.clientX, y: e.clientY, button: e.button }); });
        window.addEventListener('mousemove', function (e) { send({ type: 'mousemove', x: e.clientX, y: e.clientY }); });
        window.addEventListener('mouseup',   function ()  { send({ type: 'mouseup' }); });
        window.addEventListener('touchstart', function (e) {
            const t = [];
            for (let i = 0; i < e.targetTouches.length; i++) t.push({ id: e.targetTouches[i].identifier, x: e.targetTouches[i].pageX, y: e.targetTouches[i].pageY });
            send({ type: 'touchstart', touches: t });
        }, { passive: true });
        window.addEventListener('touchmove', function (e) {
            const t = [];
            for (let i = 0; i < e.targetTouches.length; i++) t.push({ id: e.targetTouches[i].identifier, x: e.targetTouches[i].pageX, y: e.targetTouches[i].pageY });
            send({ type: 'touchmove', touches: t });
        }, { passive: true });
        window.addEventListener('touchend', function (e) {
            const t = [];
            for (let i = 0; i < e.changedTouches.length; i++) t.push({ id: e.changedTouches[i].identifier });
            send({ type: 'touchend', touches: t });
        });
        window.addEventListener('keydown', function (e) { send({ type: 'keydown', code: e.code, key: e.key }); });

        // Public API — same shape as the main-thread implementations defined
        // toward the bottom of _runFluidMain. games-extras.js calls these.
        window.fluidSplatScreen = function (clientX, clientY, prevClientX, prevClientY) {
            send({ type: 'splatScreen', clientX: clientX, clientY: clientY, prevClientX: prevClientX, prevClientY: prevClientY });
        };
        window.fluidSetActive = function (active) {
            send({ type: 'setActive', active: !!active });
        };
        window.__fluidWorker = worker;
        // (__fluidWorkerEngaged was set right after transferControlToOffscreen
        // — see comment above; it must stay true even if listener registration
        // partially fails, otherwise main-thread would try to use a dead canvas.)
    })();
}

function _runFluidMain () {

// Stub analytics so ga() calls are silent no-ops on our site.
if (typeof window !== 'undefined' && typeof window.ga !== 'function') {
    window.ga = function () {};
}

// Mobile promo section (guarded — these elements don't exist on the games page).

const promoPopup = document.getElementsByClassName('promo')[0];
const promoPopupClose = document.getElementsByClassName('promo-close')[0];

if (promoPopup && isMobile()) {
    setTimeout(() => {
        promoPopup.style.display = 'table';
    }, 20000);
}

if (promoPopupClose) {
    promoPopupClose.addEventListener('click', e => {
        if (promoPopup) promoPopup.style.display = 'none';
    });
}

const appleLink = document.getElementById('apple_link');
if (appleLink) {
    appleLink.addEventListener('click', e => {
        ga('send', 'event', 'link promo', 'app');
        window.open('https://apps.apple.com/us/app/fluid-simulation/id1443124993');
    });
}

const googleLink = document.getElementById('google_link');
if (googleLink) {
    googleLink.addEventListener('click', e => {
        ga('send', 'event', 'link promo', 'app');
        window.open('https://play.google.com/store/apps/details?id=games.paveldogreat.fluidsimfree');
    });
}

// Simulation section

const canvas = document.getElementsByTagName('canvas')[0];

/* ---------- Patch E: per-frame allocation + reflow elimination ----------
 * Caches DPR / client dimensions / aspect ratio so the per-frame update loop
 * never reads layout-dependent DOM properties (which force a style flush) and
 * never recomputes values that change only on resize / monitor change.
 *
 * DPR is clamped to FLUID_MAX_DPR (default 2.0). On DPR=3 displays this drops
 * the composite/bloom/sunrays render area from 9× to 4× CSS pixels — a 2.25×
 * cut to display-pass GPU cost. The actual sim quality (DYE_RESOLUTION=1024)
 * is unaffected; the upsample 1024→screen is a hardware bilinear filter and
 * indistinguishable to the eye above DPR=2. Set window.FLUID_MAX_DPR =
 * Infinity before this script loads to opt out.
 *
 * Critical correctness invariant: pointer.texcoordX = posX / canvas.width.
 * Both numerator (posX) and denominator (canvas.width) come from
 * scaleByPixelRatio, so the DPR factor cancels — splat alignment is preserved
 * regardless of clamp value. */
window.FLUID_MAX_DPR = window.FLUID_MAX_DPR || 2.0;
// _targetDPR is the ceiling (device DPR clamped to FLUID_MAX_DPR).
// _cachedDPR is the *currently effective* DPR — Patch F8 (below) may pull it
// down toward 1.0 when the GPU can't keep up, then step it back toward the
// ceiling when frames are healthy again.
let _targetDPR = Math.min(window.devicePixelRatio || 1, window.FLUID_MAX_DPR);
let _cachedDPR = _targetDPR;
let pendingResize = true;
let cachedClientW = canvas.clientWidth;
let cachedClientH = canvas.clientHeight;
let cachedAspectRatio = 1;
function _refreshDPR () {
    // Page zoom / monitor change: reset both ceiling and current. Adaptive
    // state restarts from a clean slate at the new device DPR.
    _targetDPR = Math.min(window.devicePixelRatio || 1, window.FLUID_MAX_DPR);
    _cachedDPR = _targetDPR;
    pendingResize = true;
    // matchMedia DPR queries are one-shot per breakpoint — re-arm after each fire.
    if (window.matchMedia)
        matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`)
            .addEventListener('change', _refreshDPR, { once: true });
}
// Patch F10: expose for the worker harness — DPR matchMedia change events
// don't fire inside a worker, so the harness pokes us when main posts a 'dpr'
// update (after the user zooms / drags between monitors).
if (typeof window !== 'undefined') window.__fluidPokeDPR = _refreshDPR;
if (window.matchMedia)
    matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`)
        .addEventListener('change', _refreshDPR, { once: true });

if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(es => {
        const e = es[0];
        const box = e.contentBoxSize
            ? (Array.isArray(e.contentBoxSize) ? e.contentBoxSize[0] : e.contentBoxSize)
            : null;
        cachedClientW = box ? box.inlineSize : e.contentRect.width;
        cachedClientH = box ? box.blockSize  : e.contentRect.height;
        pendingResize = true;
    }).observe(canvas);
} else {
    // Fallback: keep the old behavior on ancient browsers (no ResizeObserver).
    window.addEventListener('resize', () => {
        cachedClientW = canvas.clientWidth;
        cachedClientH = canvas.clientHeight;
        pendingResize = true;
    });
}

// Active-program + texture-unit binding caches. Avoid redundant gl.useProgram
// (called twice per splat) and gl.activeTexture+bindTexture (called 20× in
// the pressure solver loop). Invalidated in initFramebuffers and resizeFBO
// because those create fresh GL textures that may reuse old GPU object slots.
let _activeGLProgram = null;
const _texUnitBindings = [];

// Render-dirty flag: when PAUSED, skip render() to avoid running bloom +
// sunrays + display passes for a frozen frame. Set true on pause→active
// transitions and on visibilitychange→visible so the next paused frame still
// renders one fresh frame before stopping.
let _renderDirty = true;

/* ---------- Patch F: adaptive bloom/sunrays cadence ----------
 * Bloom = ~17 fullscreen passes (1 prefilter + 8 down + 7 up + 1 final).
 * Sunrays = 4 passes. On healthy hardware this fits inside a 16 ms budget
 * and we update every frame. When the rolling 8-frame avg exceeds 22 ms
 * (slow GPU, many splats, etc.) we update bloom/sunrays only every other
 * frame and reuse the cached FBOs. Bloom is a low-frequency signal (already
 * blurred 8× in a pyramid) so temporal reuse is invisible at default
 * settings; the win is ~0.8–2.5 ms per slow frame, which often pushes us
 * back below 16 ms.
 */
const _frameTimes = [16, 16, 16, 16, 16, 16, 16, 16];
let _frameIdx = 0;
let _frameTimeAvg = 16;
let _bloomToggle = 0;
let _bloomThisFrame = true;     // gates applyBloom + applySunrays in render()

/* ---------- Patch F8: adaptive DPR fallback ----------
 * If frame time stays high after Patch F's bloom dimming, the GPU has
 * sustained pressure that temporal tricks can't hide. Drop the canvas backing
 * resolution in 0.25 DPR steps (never below 1.0) until frames recover. When
 * we're back below 14 ms avg sustained, step DPR back up toward the original
 * ceiling. Asymmetric thresholds (drop at 25 ms, raise at 14 ms) plus a 3 s
 * cooldown create the hysteresis needed to avoid oscillation between two
 * close DPR values. Each step triggers framebuffer reinit on the next frame
 * via the existing pendingResize plumbing in resizeCanvas().
 *
 * On DPR=1 displays this is a no-op (_targetDPR=1.0, no headroom to drop).
 * Only kicks in when the device has retina pixels AND the GPU can't afford
 * them — exactly the failure mode we want to catch. */
const _F8_MIN_DPR = 1.0;
const _F8_DROP_THRESHOLD_MS = 25;   // > 40 fps avg → hold; < 40 fps avg → drop
const _F8_RAISE_THRESHOLD_MS = 14;  // > 71 fps avg → step DPR back up
const _F8_COOLDOWN_MS = 3000;
let _f8LastChange = 0;

resizeCanvas();

let config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1024,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 1,
    VELOCITY_DISSIPATION: 0.2,
    PRESSURE: 0.8,
    PRESSURE_ITERATIONS: 20,
    CURL: 30,
    SPLAT_RADIUS: 0.25,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLORFUL: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0, g: 0, b: 0 },
    TRANSPARENT: false,
    BLOOM: true,
    BLOOM_ITERATIONS: 8,
    BLOOM_RESOLUTION: 256,
    BLOOM_INTENSITY: 0.8,
    BLOOM_THRESHOLD: 0.6,
    BLOOM_SOFT_KNEE: 0.7,
    SUNRAYS: true,
    SUNRAYS_RESOLUTION: 196,
    SUNRAYS_WEIGHT: 1.0,
}

function pointerPrototype () {
    this.id = -1;
    this.texcoordX = 0;
    this.texcoordY = 0;
    this.prevTexcoordX = 0;
    this.prevTexcoordY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.down = false;
    this.moved = false;
    this.color = [30, 0, 300];
}

let pointers = [];
let splatStack = [];
pointers.push(new pointerPrototype());

const { gl, ext } = getWebGLContext(canvas);

if (isMobile()) {
    config.DYE_RESOLUTION = 512;
}
if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 512;
    config.SHADING = false;
    config.BLOOM = false;
    config.SUNRAYS = false;
}
// Patch G1: honor prefers-reduced-motion. Bloom (~17 fullscreen passes),
// sunrays + sunrays-blur (~4 passes), and the dithering sample in the display
// shader are the visually busy parts of the fluid. Disabling them for users
// who opted into reduced motion is both an accessibility win and a major perf
// win — drops ~22 fullscreen passes/frame, often >5 ms on integrated GPUs.
// SHADING (the directional lighting on dye edges) stays — it's a subtle look
// cue, not "motion." Re-evaluated live via the media-query change listener.
// Patch F10: hoist _applyReducedMotion to function scope so the worker
// harness can poke it via window.__fluidPokeReducedMotion when main posts
// a 'reducedmotion' update (matchMedia 'change' doesn't fire in workers).
let _applyReducedMotion = function () {};
if (window.matchMedia) {
    const _reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    _applyReducedMotion = function () {
        if (_reducedMotion.matches) {
            config.BLOOM = false;
            config.SUNRAYS = false;
        }
    };
    _applyReducedMotion();
    _reducedMotion.addEventListener('change', _applyReducedMotion);
}
if (typeof window !== 'undefined') window.__fluidPokeReducedMotion = function () { _applyReducedMotion(); };

startGUI();

function getWebGLContext (canvas) {
    // Patch F2: `desynchronized: true` skips the compositor frame-sync barrier
    // (Chrome lets the canvas swap independent of the page repaint, reducing
    // frame latency; tearing isn't visible on a continuous-motion fluid).
    // `powerPreference: 'high-performance'` hints hybrid-GPU laptops to use the
    // discrete GPU instead of integrated. Both attributes are silently ignored
    // on browsers that don't honor them.
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false, desynchronized: true, powerPreference: 'high-performance' };

    let gl = canvas.getContext('webgl2', params);
    const isWebGL2 = !!gl;
    if (!isWebGL2)
        gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);

    let halfFloat;
    let supportLinearFiltering;
    if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
    let formatRGBA;
    let formatRG;
    let formatR;

    if (isWebGL2)
    {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
    }
    else
    {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    ga('send', 'event', isWebGL2 ? 'webgl2' : 'webgl', formatRGBA == null ? 'not supported' : 'supported');

    return {
        gl,
        ext: {
            formatRGBA,
            formatRG,
            formatR,
            halfFloatTexType,
            supportLinearFiltering
        }
    };
}

function getSupportedFormat (gl, internalFormat, format, type)
{
    if (!supportRenderTextureFormat(gl, internalFormat, format, type))
    {
        switch (internalFormat)
        {
            case gl.R16F:
                return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
                return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
                return null;
        }
    }

    return {
        internalFormat,
        format
    }
}

function supportRenderTextureFormat (gl, internalFormat, format, type) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    return status == gl.FRAMEBUFFER_COMPLETE;
}

function startGUI () {
    var gui = new dat.GUI({ width: 300 });
    gui.add(config, 'DYE_RESOLUTION', { 'high': 1024, 'medium': 512, 'low': 256, 'very low': 128 }).name('quality').onFinishChange(initFramebuffers);
    gui.add(config, 'SIM_RESOLUTION', { '32': 32, '64': 64, '128': 128, '256': 256 }).name('sim resolution').onFinishChange(initFramebuffers);
    gui.add(config, 'DENSITY_DISSIPATION', 0, 4.0).name('density diffusion');
    gui.add(config, 'VELOCITY_DISSIPATION', 0, 4.0).name('velocity diffusion');
    gui.add(config, 'PRESSURE', 0.0, 1.0).name('pressure');
    gui.add(config, 'CURL', 0, 50).name('vorticity').step(1);
    gui.add(config, 'SPLAT_RADIUS', 0.01, 1.0).name('splat radius');
    gui.add(config, 'SHADING').name('shading').onFinishChange(updateKeywords);
    gui.add(config, 'COLORFUL').name('colorful');
    gui.add(config, 'PAUSED').name('paused').listen();

    gui.add({ fun: () => {
        splatStack.push(parseInt(Math.random() * 20) + 5);
    } }, 'fun').name('Random splats');

    let bloomFolder = gui.addFolder('Bloom');
    bloomFolder.add(config, 'BLOOM').name('enabled').onFinishChange(updateKeywords);
    bloomFolder.add(config, 'BLOOM_INTENSITY', 0.1, 2.0).name('intensity');
    bloomFolder.add(config, 'BLOOM_THRESHOLD', 0.0, 1.0).name('threshold');

    let sunraysFolder = gui.addFolder('Sunrays');
    sunraysFolder.add(config, 'SUNRAYS').name('enabled').onFinishChange(updateKeywords);
    sunraysFolder.add(config, 'SUNRAYS_WEIGHT', 0.3, 1.0).name('weight');

    let captureFolder = gui.addFolder('Capture');
    captureFolder.addColor(config, 'BACK_COLOR').name('background color');
    captureFolder.add(config, 'TRANSPARENT').name('transparent');
    captureFolder.add({ fun: captureScreenshot }, 'fun').name('take screenshot');

    let github = gui.add({ fun : () => {
        window.open('https://github.com/PavelDoGreat/WebGL-Fluid-Simulation');
        ga('send', 'event', 'link button', 'github');
    } }, 'fun').name('Github');
    github.__li.className = 'cr function bigFont';
    github.__li.style.borderLeft = '3px solid #8C8C8C';
    let githubIcon = document.createElement('span');
    github.domElement.parentElement.appendChild(githubIcon);
    githubIcon.className = 'icon github';

    let twitter = gui.add({ fun : () => {
        ga('send', 'event', 'link button', 'twitter');
        window.open('https://twitter.com/PavelDoGreat');
    } }, 'fun').name('Twitter');
    twitter.__li.className = 'cr function bigFont';
    twitter.__li.style.borderLeft = '3px solid #8C8C8C';
    let twitterIcon = document.createElement('span');
    twitter.domElement.parentElement.appendChild(twitterIcon);
    twitterIcon.className = 'icon twitter';

    let discord = gui.add({ fun : () => {
        ga('send', 'event', 'link button', 'discord');
        window.open('https://discordapp.com/invite/CeqZDDE');
    } }, 'fun').name('Discord');
    discord.__li.className = 'cr function bigFont';
    discord.__li.style.borderLeft = '3px solid #8C8C8C';
    let discordIcon = document.createElement('span');
    discord.domElement.parentElement.appendChild(discordIcon);
    discordIcon.className = 'icon discord';

    let app = gui.add({ fun : () => {
        ga('send', 'event', 'link button', 'app');
        window.open('http://onelink.to/5b58bn');
    } }, 'fun').name('Check out mobile app');
    app.__li.className = 'cr function appBigFont';
    app.__li.style.borderLeft = '3px solid #00FF7F';
    let appIcon = document.createElement('span');
    app.domElement.parentElement.appendChild(appIcon);
    appIcon.className = 'icon app';

    if (isMobile())
        gui.close();
}

function isMobile () {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function captureScreenshot () {
    let res = getResolution(config.CAPTURE_RESOLUTION);
    let target = createFBO(res.width, res.height, ext.formatRGBA.internalFormat, ext.formatRGBA.format, ext.halfFloatTexType, gl.NEAREST);
    render(target);

    let texture = framebufferToTexture(target);
    texture = normalizeTexture(texture, target.width, target.height);

    let captureCanvas = textureToCanvas(texture, target.width, target.height);
    let datauri = captureCanvas.toDataURL();
    downloadURI('fluid.png', datauri);
    URL.revokeObjectURL(datauri);
}

function framebufferToTexture (target) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    let length = target.width * target.height * 4;
    let texture = new Float32Array(length);
    gl.readPixels(0, 0, target.width, target.height, gl.RGBA, gl.FLOAT, texture);
    return texture;
}

function normalizeTexture (texture, width, height) {
    let result = new Uint8Array(texture.length);
    let id = 0;
    for (let i = height - 1; i >= 0; i--) {
        for (let j = 0; j < width; j++) {
            let nid = i * width * 4 + j * 4;
            result[nid + 0] = clamp01(texture[id + 0]) * 255;
            result[nid + 1] = clamp01(texture[id + 1]) * 255;
            result[nid + 2] = clamp01(texture[id + 2]) * 255;
            result[nid + 3] = clamp01(texture[id + 3]) * 255;
            id += 4;
        }
    }
    return result;
}

function clamp01 (input) {
    return Math.min(Math.max(input, 0), 1);
}

function textureToCanvas (texture, width, height) {
    let captureCanvas = document.createElement('canvas');
    let ctx = captureCanvas.getContext('2d');
    captureCanvas.width = width;
    captureCanvas.height = height;

    let imageData = ctx.createImageData(width, height);
    imageData.data.set(texture);
    ctx.putImageData(imageData, 0, 0);

    return captureCanvas;
}

function downloadURI (filename, uri) {
    let link = document.createElement('a');
    link.download = filename;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

class Material {
    constructor (vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
    }

    setKeywords (keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++)
            hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null)
        {
            let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = createProgram(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program);
        this.activeProgram = program;
    }

    bind () {
        // Patch E: skip redundant gl.useProgram. _activeGLProgram is module-level
        // and only mutated here + in Program.bind below (audited: no other callers).
        if (_activeGLProgram === this.activeProgram) return;
        gl.useProgram(this.activeProgram);
        _activeGLProgram = this.activeProgram;
    }
}

class Program {
    constructor (vertexShader, fragmentShader) {
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
    }

    bind () {
        // Patch E: skip redundant gl.useProgram. See Material.bind comment above.
        if (_activeGLProgram === this.program) return;
        gl.useProgram(this.program);
        _activeGLProgram = this.program;
    }
}

function createProgram (vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));

    return program;
}

function getUniforms (program) {
    let uniforms = [];
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i).name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
}

function compileShader (type, source, keywords) {
    source = addKeywords(source, keywords);

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));

    return shader;
};

function addKeywords (source, keywords) {
    if (keywords == null) return source;
    let keywordsString = '';
    keywords.forEach(keyword => {
        keywordsString += '#define ' + keyword + '\n';
    });
    return keywordsString + source;
}

const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);

const blurVertexShader = compileShader(gl.VERTEX_SHADER, `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`);

const blurShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`);

const copyShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`);

const clearShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`);

const colorShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`);

const checkerboardShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`);

const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`;

const bloomPrefilterShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`);

const bloomBlurShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`);

const bloomFinalShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`);

const sunraysMaskShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`);

const sunraysShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`);

const splatShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`);

const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,
    ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
);

const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`);

const curlShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`);

const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`);

const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`);

const blit = (() => {
    // Patch F1: wrap the static fullscreen quad in a VAO when WebGL2 is
    // available. The buffers + attribute pointers haven't changed since module
    // init, but each program switch in WebGL2 still incurs attribute-state
    // revalidation per draw (browser bookkeeping, not GPU work). Binding a VAO
    // once tells the driver/browser the attribute layout is fixed, eliminating
    // that revalidation. ~5–15 µs per draw × ~30–60 draws/frame.
    //
    // Patch G3: the original used drawElements(TRIANGLES, 6) over a 4-vert,
    // 6-index quad. TRIANGLE_STRIP renders the same quad with 4 vertices and
    // no index buffer — drops one bound buffer, one index fetch per vertex,
    // and ~5% draw cost on integrated GPUs. Vertex order BL/BR/TL/TR forms
    // two triangles via the strip rule; UVs (vUv = aPosition * 0.5 + 0.5)
    // interpolate identically across the screen.
    const _vao = gl.createVertexArray ? gl.createVertexArray() : null;
    if (_vao) gl.bindVertexArray(_vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    // VAO stays bound for the rest of the session — no other code path
    // touches vertex attributes, so we never need to re-bind.

    return (target, clear = false) => {
        if (target == null)
        {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
        else
        {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (clear)
        {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        // CHECK_FRAMEBUFFER_STATUS();
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); // Patch G3
    }
})();

function CHECK_FRAMEBUFFER_STATUS () {
    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (status != gl.FRAMEBUFFER_COMPLETE)
        console.trace("Framebuffer error: " + status);
}

let dye;
let velocity;
let divergence;
let curl;
let pressure;
let bloom;
let bloomFramebuffers = [];
let sunrays;
let sunraysTemp;

let ditheringTexture = createTextureAsync('LDR_LLL1_0.png');

const blurProgram            = new Program(blurVertexShader, blurShader);
const copyProgram            = new Program(baseVertexShader, copyShader);
const clearProgram           = new Program(baseVertexShader, clearShader);
const colorProgram           = new Program(baseVertexShader, colorShader);
const checkerboardProgram    = new Program(baseVertexShader, checkerboardShader);
const bloomPrefilterProgram  = new Program(baseVertexShader, bloomPrefilterShader);
const bloomBlurProgram       = new Program(baseVertexShader, bloomBlurShader);
const bloomFinalProgram      = new Program(baseVertexShader, bloomFinalShader);
const sunraysMaskProgram     = new Program(baseVertexShader, sunraysMaskShader);
const sunraysProgram         = new Program(baseVertexShader, sunraysShader);
const splatProgram           = new Program(baseVertexShader, splatShader);
const advectionProgram       = new Program(baseVertexShader, advectionShader);
const divergenceProgram      = new Program(baseVertexShader, divergenceShader);
const curlProgram            = new Program(baseVertexShader, curlShader);
const vorticityProgram       = new Program(baseVertexShader, vorticityShader);
const pressureProgram        = new Program(baseVertexShader, pressureShader);
const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);

const displayMaterial = new Material(baseVertexShader, displayShaderSource);

function initFramebuffers () {
    // Patch E: any/all FBO textures may be replaced below; invalidate the
    // texture-unit binding cache so stale entries don't suppress re-binding
    // of a fresh texture that happens to land on the same JS object slot.
    _texUnitBindings.length = 0;

    let simRes = getResolution(config.SIM_RESOLUTION);
    let dyeRes = getResolution(config.DYE_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba    = ext.formatRGBA;
    const rg      = ext.formatRG;
    const r       = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    if (dye == null)
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
    else
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    if (velocity == null)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
    else
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO      (simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl       = createFBO      (simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure   = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    initBloomFramebuffers();
    initSunraysFramebuffers();
}

function initBloomFramebuffers () {
    let res = getResolution(config.BLOOM_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);

    bloomFramebuffers.length = 0;
    for (let i = 0; i < config.BLOOM_ITERATIONS; i++)
    {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering);
        bloomFramebuffers.push(fbo);
    }
}

function initSunraysFramebuffers () {
    let res = getResolution(config.SUNRAYS_RESOLUTION);

    const texType = ext.halfFloatTexType;
    const r = ext.formatR;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    sunrays     = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
    sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
}

function createFBO (w, h, internalFormat, format, type, param) {
    gl.activeTexture(gl.TEXTURE0);
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    let fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let texelSizeX = 1.0 / w;
    let texelSizeY = 1.0 / h;

    return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach (id) {
            // Patch E: skip redundant activeTexture+bindTexture. The pressure
            // solver loop calls attach(1) 20× per frame; this drops 40 GL calls.
            // After pressure.swap() the texture pointer changes, so the cache
            // correctly misses and re-binds — no special-casing needed.
            if (_texUnitBindings[id] !== texture) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                _texUnitBindings[id] = texture;
            }
            return id;
        }
    };
}

function createDoubleFBO (w, h, internalFormat, format, type, param) {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);

    return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read () {
            return fbo1;
        },
        set read (value) {
            fbo1 = value;
        },
        get write () {
            return fbo2;
        },
        set write (value) {
            fbo2 = value;
        },
        swap () {
            let temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
        }
    }
}

function resizeFBO (target, w, h, internalFormat, format, type, param) {
    // Patch E: a fresh texture is about to be created; invalidate the
    // texture-unit cache so the old reference doesn't suppress re-binding.
    _texUnitBindings.length = 0;
    let newFBO = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFBO);
    return newFBO;
}

function resizeDoubleFBO (target, w, h, internalFormat, format, type, param) {
    if (target.width == w && target.height == h)
        return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
}

function createTextureAsync (url) {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));

    let obj = {
        texture,
        width: 1,
        height: 1,
        attach (id) {
            // Patch E: see createFBO.attach comment.
            if (_texUnitBindings[id] !== texture) {
                gl.activeTexture(gl.TEXTURE0 + id);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                _texUnitBindings[id] = texture;
            }
            return id;
        }
    };

    let image = new Image();
    image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    };
    image.src = url;

    return obj;
}

function updateKeywords () {
    let displayKeywords = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    if (config.BLOOM) displayKeywords.push("BLOOM");
    if (config.SUNRAYS) displayKeywords.push("SUNRAYS");
    displayMaterial.setKeywords(displayKeywords);
}

updateKeywords();
initFramebuffers();
multipleSplats(parseInt(Math.random() * 20) + 5);

// Patch F5: performance.now() is monotonic (won't go backward on NTP/DST
// adjust like Date.now() can) and µs-resolution. Slightly faster too.
let lastUpdateTime = performance.now();
let colorUpdateTimer = 0.0;
update();

function update () {
    // Patch F3: rolling 8-frame avg to decide whether to skip bloom/sunrays.
    // Measured at the *start* of the frame so we account for the previous
    // frame's full render+browser-composite latency. >22 ms = ~45 fps, well
    // below 60 fps target → engage bloom alternation.
    const frameStart = performance.now();
    _frameTimes[_frameIdx & 7] = frameStart - lastUpdateTime;
    _frameIdx++;
    if ((_frameIdx & 7) === 0) {
        let s = 0;
        for (let i = 0; i < 8; i++) s += _frameTimes[i];
        _frameTimeAvg = s * 0.125;

        // Patch F8: adaptive DPR adjustment. Only on the every-8-frame tick
        // so the cooldown is checked at most ~7 times/sec — cheap. The actual
        // resize takes effect on the *next* frame via pendingResize.
        if (frameStart - _f8LastChange > _F8_COOLDOWN_MS) {
            if (_frameTimeAvg > _F8_DROP_THRESHOLD_MS && _cachedDPR > _F8_MIN_DPR) {
                _cachedDPR = Math.max(_F8_MIN_DPR, _cachedDPR - 0.25);
                pendingResize = true;
                _f8LastChange = frameStart;
            } else if (_frameTimeAvg < _F8_RAISE_THRESHOLD_MS && _cachedDPR < _targetDPR) {
                _cachedDPR = Math.min(_targetDPR, _cachedDPR + 0.25);
                pendingResize = true;
                _f8LastChange = frameStart;
            }
        }
    }
    _bloomThisFrame = _frameTimeAvg < 22 || (_bloomToggle++ & 1) === 0;

    const dt = calcDeltaTime();
    if (resizeCanvas())
        initFramebuffers();
    updateColors(dt);
    applyInputs();
    if (!config.PAUSED) {
        step(dt);
        render(null);
    } else if (_renderDirty) {
        // Patch E: when paused, skip the bloom + sunrays + display passes
        // (saves 0.5–3 ms/frame on integrated GPUs). Render exactly one final
        // frame on a pause→active transition so the canvas reflects the most
        // recent state instead of a stale framebuffer.
        render(null);
        _renderDirty = false;
    }
    requestAnimationFrame(update);
}

function calcDeltaTime () {
    // Patch F5: see lastUpdateTime init comment.
    let now = performance.now();
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
}

function resizeCanvas () {
    // Patch E: previous version read canvas.clientWidth/Height every frame,
    // which forces a layout flush. ResizeObserver (set up at module init)
    // toggles pendingResize when the canvas actually changes size, so the
    // common case is a single boolean check.
    if (!pendingResize) return false;
    pendingResize = false;
    let width  = scaleByPixelRatio(cachedClientW);
    let height = scaleByPixelRatio(cachedClientH);
    if (canvas.width != width || canvas.height != height) {
        canvas.width = width;
        canvas.height = height;
        cachedAspectRatio = canvas.width / canvas.height;
        return true;
    }
    return false;
}

function updateColors (dt) {
    if (!config.COLORFUL) return;

    colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
    if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach(p => {
            p.color = generateColor();
        });
    }
}

function applyInputs () {
    if (splatStack.length > 0)
        multipleSplats(splatStack.pop());

    pointers.forEach(p => {
        if (p.moved) {
            p.moved = false;
            splatPointer(p);
        }
    });
}

function step (dt) {
    gl.disable(gl.BLEND);

    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    let velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
}

function render (target) {
    // Patch F3: when running below ~45 fps, alternate-frame the bloom +
    // sunrays passes. The display pass below still samples the cached `bloom`
    // and `sunrays` FBOs from the previous frame — bloom is a heavily blurred
    // (8-level pyramid) low-frequency signal, so 30 Hz updates are visually
    // indistinguishable from 60 Hz at default thresholds. Composite cost
    // unchanged, generation cost halved on slow frames.
    if (config.BLOOM && _bloomThisFrame)
        applyBloom(dye.read, bloom);
    if (config.SUNRAYS && _bloomThisFrame) {
        applySunrays(dye.read, dye.write, sunrays);
        blur(sunrays, sunraysTemp, 1);
    }

    if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
    }
    else {
        gl.disable(gl.BLEND);
    }

    if (!config.TRANSPARENT)
        drawColor(target, normalizeColor(config.BACK_COLOR));
    if (target == null && config.TRANSPARENT)
        drawCheckerboard(target);
    drawDisplay(target);
}

function drawColor (target, color) {
    colorProgram.bind();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    blit(target);
}

function drawCheckerboard (target) {
    checkerboardProgram.bind();
    gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, cachedAspectRatio); // Patch E
    blit(target);
}

function drawDisplay (target) {
    let width = target == null ? gl.drawingBufferWidth : target.width;
    let height = target == null ? gl.drawingBufferHeight : target.height;

    displayMaterial.bind();
    if (config.SHADING)
        gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    if (config.BLOOM) {
        gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
        gl.uniform1i(displayMaterial.uniforms.uDithering, ditheringTexture.attach(2));
        let scale = getTextureScale(ditheringTexture, width, height);
        gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS)
        gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
    blit(target);
}

function applyBloom (source, destination) {
    if (bloomFramebuffers.length < 2)
        return;

    let last = destination;

    gl.disable(gl.BLEND);
    bloomPrefilterProgram.bind();
    let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
    let curve0 = config.BLOOM_THRESHOLD - knee;
    let curve1 = knee * 2;
    let curve2 = 0.25 / knee;
    gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, config.BLOOM_THRESHOLD);
    gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    blit(last);

    bloomBlurProgram.bind();
    for (let i = 0; i < bloomFramebuffers.length; i++) {
        let dest = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        blit(dest);
        last = dest;
    }

    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);

    for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex);
        last = baseTex;
    }

    gl.disable(gl.BLEND);
    bloomFinalProgram.bind();
    gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(bloomFinalProgram.uniforms.intensity, config.BLOOM_INTENSITY);
    blit(destination);
}

function applySunrays (source, mask, destination) {
    gl.disable(gl.BLEND);
    sunraysMaskProgram.bind();
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    blit(mask);

    sunraysProgram.bind();
    gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
    gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
    blit(destination);
}

function blur (target, temp, iterations) {
    blurProgram.bind();
    for (let i = 0; i < iterations; i++) {
        gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
        gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
        blit(temp);

        gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
        gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
        blit(target);
    }
}

function splatPointer (pointer) {
    let dx = pointer.deltaX * config.SPLAT_FORCE;
    let dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
}

function multipleSplats (amount) {
    for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
    }
}

function splat (x, y, dx, dy, color) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, cachedAspectRatio); // Patch E
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
}

function correctRadius (radius) {
    // Patch E: cachedAspectRatio is updated on resize.
    if (cachedAspectRatio > 1)
        radius *= cachedAspectRatio;
    return radius;
}

// Patch C: listeners moved from canvas -> window so clicks pass through a
// pointer-events:none canvas. Using clientX/Y (viewport coords) since the canvas
// is position:fixed; inset:0, so viewport coords map 1:1 onto canvas coords.
// Touch listeners are passive so they never block scrolling.
window.addEventListener('mousedown', e => {
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    // Patch E: pointers[0] is created at module init (line ~123) with id=-1
    // and nothing in this file ever mutates pointers[0].id away from -1.
    // Touch handlers use pointers[i+1], so pointers[0] is reserved for mouse.
    // (Keep .find() for touchend below — touch ids are arbitrary integers.)
    let pointer = pointers[0];
    updatePointerDownData(pointer, -1, posX, posY);
});

window.addEventListener('mousemove', e => {
    let pointer = pointers[0];
    if (!pointer.down) return;
    let posX = scaleByPixelRatio(e.clientX);
    let posY = scaleByPixelRatio(e.clientY);
    updatePointerMoveData(pointer, posX, posY);
});

window.addEventListener('mouseup', () => {
    updatePointerUpData(pointers[0]);
});

window.addEventListener('touchstart', e => {
    const touches = e.targetTouches;
    while (touches.length >= pointers.length)
        pointers.push(new pointerPrototype());
    for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
    }
}, { passive: true });

window.addEventListener('touchmove', e => {
    const touches = e.targetTouches;
    for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i + 1];
        if (!pointer.down) continue;
        let posX = scaleByPixelRatio(touches[i].pageX);
        let posY = scaleByPixelRatio(touches[i].pageY);
        updatePointerMoveData(pointer, posX, posY);
    }
}, { passive: true });

window.addEventListener('touchend', e => {
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++)
    {
        let pointer = pointers.find(p => p.id == touches[i].identifier);
        if (pointer == null) continue;
        updatePointerUpData(pointer);
    }
});

window.addEventListener('keydown', e => {
    if (e.code === 'KeyP')
        config.PAUSED = !config.PAUSED;
    if (e.key === ' ')
        splatStack.push(parseInt(Math.random() * 20) + 5);
});

function updatePointerDownData (pointer, id, posX, posY) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
}

function updatePointerMoveData (pointer, posX, posY) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
}

function updatePointerUpData (pointer) {
    pointer.down = false;
}

function correctDeltaX (delta) {
    // Patch E: cached at canvas resize, see Patch E header comment.
    if (cachedAspectRatio < 1) delta *= cachedAspectRatio;
    return delta;
}

function correctDeltaY (delta) {
    // Patch E.
    if (cachedAspectRatio > 1) delta /= cachedAspectRatio;
    return delta;
}

function generateColor () {
    let c = HSVtoRGB(Math.random(), 1.0, 1.0);
    c.r *= 0.15;
    c.g *= 0.15;
    c.b *= 0.15;
    return c;
}

function HSVtoRGB (h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return {
        r,
        g,
        b
    };
}

function normalizeColor (input) {
    let output = {
        r: input.r / 255,
        g: input.g / 255,
        b: input.b / 255
    };
    return output;
}

function wrap (value, min, max) {
    let range = max - min;
    if (range == 0) return min;
    return (value - min) % range + min;
}

function getResolution (resolution) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1)
        aspectRatio = 1.0 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
    else
        return { width: min, height: max };
}

function getTextureScale (texture, width, height) {
    return {
        x: width / texture.width,
        y: height / texture.height
    };
}

function scaleByPixelRatio (input) {
    // Patch E: DPR is cached at module init and refreshed by a matchMedia
    // listener on monitor / zoom change. Reads here are hot — every pointer
    // event and every resize check calls in.
    return Math.floor(input * _cachedDPR);
}

function hashCode (s) {
    if (s.length == 0) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

/* ---------- Patch D: stability tweaks ---------- */

// Pause GPU work when the tab is not visible. Modern browsers throttle rAF
// for hidden tabs, but explicitly pausing the sim also zeroes shader dispatch.
document.addEventListener('visibilitychange', () => {
    config.PAUSED = document.hidden;
    // Patch E: on visible-again, force one render so the user sees the last
    // simulation state immediately rather than a (possibly cleared) buffer.
    if (!document.hidden) _renderDirty = true;
});

// Patch E: external pause control used by games-extras.js to auto-pause when
// the cat is sleeping AND the user has been idle. Wakes back up on any input.
window.fluidSetActive = function (active) {
    const wasPaused = config.PAUSED;
    config.PAUSED = !active;
    if (active && wasPaused) _renderDirty = true;
};

// Scale simulation resolution down on small screens so phones stay smooth.
// Desktop keeps the upstream defaults so the look matches the source demo.
if (window.matchMedia && window.matchMedia('(max-width: 720px)').matches) {
    config.SIM_RESOLUTION = 64;     // default 128
    config.DYE_RESOLUTION = 512;    // default 1024
    config.BLOOM_RESOLUTION = 128;  // default 256
    config.SUNRAYS_RESOLUTION = 128;// default 196
}

// Respect reduced-motion — pause immediately; the CSS fallback will show a
// static gradient background instead.
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    config.PAUSED = true;
}

// Expose a splat helper so outside scripts (e.g. the periodic cat companion)
// can paint a fluid trail from screen coordinates without faking mouse events
// — faking would hijack pointers[0] and fight a real user's cursor.
window.fluidSplatScreen = function (clientX, clientY, prevClientX, prevClientY) {
    if (!canvas || !canvas.width || !canvas.height) return;
    try {
        const posX = scaleByPixelRatio(clientX);
        const posY = scaleByPixelRatio(clientY);
        const prevPosX = scaleByPixelRatio(prevClientX);
        const prevPosY = scaleByPixelRatio(prevClientY);
        const texcoordX = posX / canvas.width;
        const texcoordY = 1.0 - posY / canvas.height;
        const prevTexcoordX = prevPosX / canvas.width;
        const prevTexcoordY = 1.0 - prevPosY / canvas.height;
        const deltaX = correctDeltaX(texcoordX - prevTexcoordX);
        const deltaY = correctDeltaY(texcoordY - prevTexcoordY);
        const dx = deltaX * config.SPLAT_FORCE;
        const dy = deltaY * config.SPLAT_FORCE;
        const color = generateColor();
        color.r *= 10.0;
        color.g *= 10.0;
        color.b *= 10.0;
        splat(texcoordX, texcoordY, dx, dy, color);
    } catch (e) { /* silent — sim may not have initialized (no WebGL) */ }
};

} // end _runFluidMain

// Patch F10: skip main-thread setup if the worker bootstrap above engaged.
// In all other contexts (flag off, browser unsupported, transfer failed,
// or running inside the worker via importScripts), run the sim normally.
if (typeof window === 'undefined' || !window.__fluidWorkerEngaged) {
    _runFluidMain();
}
