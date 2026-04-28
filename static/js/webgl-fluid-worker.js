/* webgl-fluid-worker.js — companion to webgl-fluid.js for FLUID_USE_WORKER mode.
 *
 * This file stubs the DOM / window APIs that webgl-fluid.js touches, then
 * importScripts() the main file so the simulation runs inside a Web Worker.
 * Single source of truth: future perf patches landing in webgl-fluid.js
 * propagate here automatically — no parallel maintenance.
 *
 * Activate by setting `window.FLUID_USE_WORKER = true` BEFORE webgl-fluid.js
 * loads on the main thread. webgl-fluid.js then transfers the canvas via
 * transferControlToOffscreen() and posts an `init` message to this worker.
 *
 * Browser support: Chrome 69+, Firefox 105+, Safari 16.4+. Falls back to
 * main-thread mode silently on unsupported browsers.
 */

'use strict';

// ---------- Globals expected by webgl-fluid.js ----------
self.window = self;
self.devicePixelRatio = 1;
self.FLUID_MAX_DPR = 2.0;

// ---------- Mutable state populated by the init message ----------
let _offscreenCanvas = null;
let _isMobile = false;
let _reducedMotion = false;
let _hidden = false;
let _booted = false;

// ---------- matchMedia stub ----------
// webgl-fluid.js queries: '(resolution: <N>dppx)', '(prefers-reduced-motion: reduce)',
// '(max-width: 720px)'. Returns the cached value; the listener stub captures
// 'change' callbacks for prefers-reduced-motion so the main thread can post a
// 'reducedmotion' update and we fire them here.
const _mqListeners = { reducedmotion: [] };
self.matchMedia = function (query) {
    let matches = false;
    let bucket = null;
    if (query.indexOf('prefers-reduced-motion') >= 0) {
        matches = _reducedMotion;
        bucket = 'reducedmotion';
    } else if (query.indexOf('max-width: 720px') >= 0) {
        matches = _isMobile;
    }
    // dppx queries: never simulate change events; main thread posts 'dpr'.
    return {
        matches: matches,
        addEventListener: function (event, fn) {
            if (bucket && event === 'change' && _mqListeners[bucket]) _mqListeners[bucket].push(fn);
        },
        removeEventListener: function () {},
        addListener: function () {},
        removeListener: function () {},
    };
};

// ---------- document stub ----------
let _visibilityListener = null;
self.document = {
    getElementsByTagName: function (tag) {
        return tag === 'canvas' && _offscreenCanvas ? [_offscreenCanvas] : [];
    },
    getElementsByClassName: function () { return []; },
    getElementById: function () { return null; },
    querySelectorAll: function () { return []; },
    addEventListener: function (type, fn) {
        if (type === 'visibilitychange') _visibilityListener = fn;
    },
    removeEventListener: function () {},
    body: { appendChild: function () {}, removeChild: function () {} },
    createElement: function (tag) {
        if (tag === 'canvas') return new OffscreenCanvas(1, 1);
        return { getContext: function () { return null; }, click: function () {}, style: {} };
    },
    get hidden () { return _hidden; },
    currentScript: null,
};

// ---------- dat.GUI no-op stub (webgl-fluid.js calls startGUI() at init) ----------
function _datNoop () {
    const f = {};
    f.add = function () { return f; };
    f.addFolder = function () { return f; };
    f.addColor = function () { return f; };
    f.close = function () {};
    f.listen = function () { return f; };
    f.onFinishChange = function () { return f; };
    f.onChange = function () { return f; };
    f.name = function () { return f; };
    f.step = function () { return f; };
    f.__li = { className: '', style: {} };
    f.domElement = { parentElement: { appendChild: function () {} } };
    return f;
}
self.dat = { GUI: function () { return _datNoop(); } };

// ---------- Image stub ----------
// createTextureAsync() uses `new Image()` to load a dithering texture from
// 'LDR_LLL1_0.png'. That asset isn't shipped on this site, so the load 404s
// even on the main thread and the texture stays as the fallback 1x1 white
// pixel. We reproduce that exactly: a no-op Image.
self.Image = function () { this.onload = null; this.src = ''; };

// ---------- window event-listener capture ----------
// webgl-fluid.js calls window.addEventListener('mousedown'/'mousemove'/etc).
// Capture those callbacks so 'mousedown'/'mousemove' messages from main can
// fire them with synthetic event objects. 'message' and other native worker
// events still bind to self normally.
const _winListeners = {
    mousedown: [], mousemove: [], mouseup: [],
    touchstart: [], touchmove: [], touchend: [],
    keydown: [], resize: [],
};
const _origSelfAdd = self.addEventListener.bind(self);
self.addEventListener = function (type, fn, opts) {
    if (type in _winListeners) { _winListeners[type].push(fn); return; }
    _origSelfAdd(type, fn, opts);
};

// ---------- ResizeObserver stub ----------
// webgl-fluid.js observes the canvas to detect CSS-size changes. Workers
// can't observe DOM elements; main thread observes and posts 'resize'.
let _roCallback = null;
self.ResizeObserver = function (cb) {
    _roCallback = cb;
    return { observe: function () {}, unobserve: function () {}, disconnect: function () {} };
};

// ---------- Init / runtime message handling ----------
_origSelfAdd('message', function (e) {
    const m = e.data;
    if (m.type === 'init' && !_booted) {
        _booted = true;
        _offscreenCanvas = m.canvas;
        // OffscreenCanvas natively has width/height (backing-store) but no
        // clientWidth/clientHeight (no CSS layout). webgl-fluid.js's
        // resizeCanvas reads these — fake them as the CSS pixel dimensions
        // posted from main. Writable so 'resize' messages can update.
        Object.defineProperty(_offscreenCanvas, 'clientWidth',  { value: m.clientW, writable: true, configurable: true });
        Object.defineProperty(_offscreenCanvas, 'clientHeight', { value: m.clientH, writable: true, configurable: true });
        self.devicePixelRatio = m.dpr || 1;
        self.FLUID_MAX_DPR = m.maxDPR || 2.0;
        _isMobile = !!m.isMobile;
        _reducedMotion = !!m.reducedMotion;
        // isMobile() inside webgl-fluid.js tests navigator.userAgent. If main
        // detected mobile, force the stub UA so the same branch is taken here.
        if (_isMobile && self.navigator) {
            try { Object.defineProperty(self.navigator, 'userAgent', { value: 'Mobile', configurable: true }); }
            catch (_) {}
        }
        try {
            importScripts(m.scriptUrl);
            self.postMessage({ type: 'ready' });
        } catch (err) {
            self.postMessage({ type: 'error', message: String((err && err.message) || err) });
        }
        return;
    }
    if (!_booted) return;
    switch (m.type) {
        case 'mousedown': _fire('mousedown', { clientX: m.x, clientY: m.y, button: m.button }); break;
        case 'mousemove': _fire('mousemove', { clientX: m.x, clientY: m.y }); break;
        case 'mouseup':   _fire('mouseup',   {}); break;
        case 'touchstart':
            _fire('touchstart', { targetTouches: m.touches.map(function (t) { return { identifier: t.id, pageX: t.x, pageY: t.y }; }) });
            break;
        case 'touchmove':
            _fire('touchmove', { targetTouches: m.touches.map(function (t) { return { identifier: t.id, pageX: t.x, pageY: t.y }; }) });
            break;
        case 'touchend':
            _fire('touchend', { changedTouches: m.touches.map(function (t) { return { identifier: t.id }; }) });
            break;
        case 'keydown': _fire('keydown', { code: m.code, key: m.key }); break;
        case 'resize':
            _offscreenCanvas.clientWidth  = m.clientW;
            _offscreenCanvas.clientHeight = m.clientH;
            if (_roCallback) {
                _roCallback([{
                    contentBoxSize: [{ inlineSize: m.clientW, blockSize: m.clientH }],
                    contentRect:   { width: m.clientW, height: m.clientH },
                    target: _offscreenCanvas,
                }]);
            }
            break;
        case 'dpr':
            self.devicePixelRatio = m.value;
            // _refreshDPR is exposed by webgl-fluid.js as window.__fluidPokeDPR
            // for exactly this purpose (matchMedia DPR breakpoints can't be
            // detected inside a worker).
            if (typeof self.__fluidPokeDPR === 'function') self.__fluidPokeDPR();
            break;
        case 'reducedmotion':
            _reducedMotion = m.value;
            // Fire any captured matchMedia listeners (Patch G1 attaches one).
            for (let i = 0; i < _mqListeners.reducedmotion.length; i++) {
                try { _mqListeners.reducedmotion[i]({ matches: m.value }); } catch (_) {}
            }
            // And the explicit poke (Patch G1's _applyReducedMotion).
            if (typeof self.__fluidPokeReducedMotion === 'function') self.__fluidPokeReducedMotion();
            break;
        case 'visibility':
            _hidden = m.hidden;
            if (_visibilityListener) { try { _visibilityListener({}); } catch (_) {} }
            break;
        case 'setActive':
            if (typeof self.fluidSetActive === 'function') self.fluidSetActive(m.active);
            break;
        case 'splatScreen':
            if (typeof self.fluidSplatScreen === 'function') {
                self.fluidSplatScreen(m.clientX, m.clientY, m.prevClientX, m.prevClientY);
            }
            break;
    }
});

function _fire (type, ev) {
    const list = _winListeners[type];
    if (!list) return;
    for (let i = 0; i < list.length; i++) {
        try { list[i](ev); } catch (_) { /* swallow — same as DOM listeners */ }
    }
}
