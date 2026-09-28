var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) e(r);
  new MutationObserver((r) => {
    for (const n of r) if (n.type === "childList") for (const o of n.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && e(o);
  }).observe(document, { childList: true, subtree: true });
  function i(r) {
    const n = {};
    return r.integrity && (n.integrity = r.integrity), r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? n.credentials = "include" : r.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n;
  }
  function e(r) {
    if (r.ep) return;
    r.ep = true;
    const n = i(r);
    fetch(r.href, n);
  }
})();
function ur(a17) {
  if (a17 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return a17;
}
function la(a17, t) {
  a17.prototype = Object.create(t.prototype), a17.prototype.constructor = a17, a17.__proto__ = t;
}
/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Oe = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } }, fn = { duration: 0.5, overwrite: false, delay: 0 }, Ko, Ut, pt, ze = 1e8, ft = 1 / ze, Po = Math.PI * 2, Ol = Po / 4, El = 0, ca = Math.sqrt, Ll = Math.cos, Dl = Math.sin, Gt = function(t) {
  return typeof t == "string";
}, vt = function(t) {
  return typeof t == "function";
}, mr = function(t) {
  return typeof t == "number";
}, jo = function(t) {
  return typeof t > "u";
}, or = function(t) {
  return typeof t == "object";
}, ge = function(t) {
  return t !== false;
}, ts = function() {
  return typeof window < "u";
}, Mn = function(t) {
  return vt(t) || Gt(t);
}, da = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, re = Array.isArray, Il = /random\([^)]+\)/g, $l = /,\s*/g, Ms = /(?:-?\.?\d|\.)+/gi, fa = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, wi = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, po = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, ua = /[+-]=-?[.\d]+/, Bl = /[^,'"\[\]\s]+/gi, Fl = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, mt, je, Ao, es, Ee = {}, Vn = {}, ha, pa = function(t) {
  return (Vn = Ei(t, Ee)) && xe;
}, rs = function(t, i) {
  return console.warn("Invalid property", t, "set to", i, "Missing plugin? gsap.registerPlugin()");
}, un = function(t, i) {
  return !i && console.warn(t);
}, ga = function(t, i) {
  return t && (Ee[t] = i) && Vn && (Vn[t] = i) || Ee;
}, hn = function() {
  return 0;
}, zl = { suppressEvents: true, isStart: true, kill: false }, Fn = { suppressEvents: true, kill: false }, Nl = { suppressEvents: true }, is = {}, Or = [], Ro = {}, _a, Me = {}, go = {}, Ss = 30, zn = [], ns = "", os = function(t) {
  var i = t[0], e, r;
  if (or(i) || vt(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
    for (r = zn.length; r-- && !zn[r].targetTest(i); ) ;
    e = zn[r];
  }
  for (r = t.length; r--; ) t[r] && (t[r]._gsap || (t[r]._gsap = new Fa(t[r], e))) || t.splice(r, 1);
  return t;
}, ei = function(t) {
  return t._gsap || os(Ne(t))[0]._gsap;
}, ma = function(t, i, e) {
  return (e = t[i]) && vt(e) ? t[i]() : jo(e) && t.getAttribute && t.getAttribute(i) || e;
}, _e = function(t, i) {
  return (t = t.split(",")).forEach(i) || t;
}, Mt = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, _t = function(t) {
  return Math.round(t * 1e7) / 1e7 || 0;
}, Mi = function(t, i) {
  var e = i.charAt(0), r = parseFloat(i.substr(2));
  return t = parseFloat(t), e === "+" ? t + r : e === "-" ? t - r : e === "*" ? t * r : t / r;
}, Gl = function(t, i) {
  for (var e = i.length, r = 0; t.indexOf(i[r]) < 0 && ++r < e; ) ;
  return r < e;
}, Jn = function() {
  var t = Or.length, i = Or.slice(0), e, r;
  for (Ro = {}, Or.length = 0, e = 0; e < t; e++) r = i[e], r && r._lazy && (r.render(r._lazy[0], r._lazy[1], true)._lazy = 0);
}, ss = function(t) {
  return !!(t._initted || t._startAt || t.add);
}, ya = function(t, i, e, r) {
  Or.length && !Ut && Jn(), t.render(i, e, !!(Ut && i < 0 && ss(t))), Or.length && !Ut && Jn();
}, xa = function(t) {
  var i = parseFloat(t);
  return (i || i === 0) && (t + "").match(Bl).length < 2 ? i : Gt(t) ? t.trim() : t;
}, ba = function(t) {
  return t;
}, Le = function(t, i) {
  for (var e in i) e in t || (t[e] = i[e]);
  return t;
}, Yl = function(t) {
  return function(i, e) {
    for (var r in e) r in i || r === "duration" && t || r === "ease" || (i[r] = e[r]);
  };
}, Ei = function(t, i) {
  for (var e in i) t[e] = i[e];
  return t;
}, Ts = function a(t, i) {
  for (var e in i) e !== "__proto__" && e !== "constructor" && e !== "prototype" && (t[e] = or(i[e]) ? a(t[e] || (t[e] = {}), i[e]) : i[e]);
  return t;
}, qn = function(t, i) {
  var e = {}, r;
  for (r in t) r in i || (e[r] = t[r]);
  return e;
}, Ki = function(t) {
  var i = t.parent || mt, e = t.keyframes ? Yl(re(t.keyframes)) : Le;
  if (ge(t.inherit)) for (; i; ) e(t, i.vars.defaults), i = i.parent || i._dp;
  return t;
}, Wl = function(t, i) {
  for (var e = t.length, r = e === i.length; r && e-- && t[e] === i[e]; ) ;
  return e < 0;
}, va = function(t, i, e, r, n) {
  var o = t[r], s;
  if (n) for (s = i[n]; o && o[n] > s; ) o = o._prev;
  return o ? (i._next = o._next, o._next = i) : (i._next = t[e], t[e] = i), i._next ? i._next._prev = i : t[r] = i, i._prev = o, i.parent = i._dp = t, i;
}, no = function(t, i, e, r) {
  e === void 0 && (e = "_first"), r === void 0 && (r = "_last");
  var n = i._prev, o = i._next;
  n ? n._next = o : t[e] === i && (t[e] = o), o ? o._prev = n : t[r] === i && (t[r] = n), i._next = i._prev = i.parent = null;
}, Dr = function(t, i) {
  t.parent && (!i || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0;
}, ri = function(t, i) {
  if (t && (!i || i._end > t._dur || i._start < 0)) for (var e = t; e; ) e._dirty = 1, e = e.parent;
  return t;
}, Xl = function(t) {
  for (var i = t.parent; i && i.parent; ) i._dirty = 1, i.totalDuration(), i = i.parent;
  return t;
}, Oo = function(t, i, e, r) {
  return t._startAt && (Ut ? t._startAt.revert(Fn) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(i, true, r));
}, Ul = function a2(t) {
  return !t || t._ts && a2(t.parent);
}, Ps = function(t) {
  return t._repeat ? Li(t._tTime, t = t.duration() + t._rDelay) * t : 0;
}, Li = function(t, i) {
  var e = Math.floor(t = _t(t / i));
  return t && e === t ? e - 1 : e;
}, Qn = function(t, i) {
  return (t - i._start) * i._ts + (i._ts >= 0 ? 0 : i._dirty ? i.totalDuration() : i._tDur);
}, oo = function(t) {
  return t._end = _t(t._start + (t._tDur / Math.abs(t._ts || t._rts || ft) || 0));
}, so = function(t, i) {
  var e = t._dp;
  return e && e.smoothChildTiming && t._ts && (t._start = _t(e._time - (t._ts > 0 ? i / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - i) / -t._ts)), oo(t), e._dirty || ri(e, t)), t;
}, wa = function(t, i) {
  var e;
  if ((i._time || !i._dur && i._initted || i._start < t._time && (i._dur || !i.add)) && (e = Qn(t.rawTime(), i), (!i._dur || vn(0, i.totalDuration(), e) - i._tTime > ft) && i.render(e, true)), ri(t, i)._dp && t._initted && t._time >= t._dur && t._ts) {
    if (t._dur < t.duration()) for (e = t; e._dp; ) e.rawTime() >= 0 && e.totalTime(e._tTime), e = e._dp;
    t._zTime = -ft;
  }
}, er = function(t, i, e, r) {
  return i.parent && Dr(i), i._start = _t((mr(e) ? e : e || t !== mt ? Ie(t, e, i) : t._time) + i._delay), i._end = _t(i._start + (i.totalDuration() / Math.abs(i.timeScale()) || 0)), va(t, i, "_first", "_last", t._sort ? "_start" : 0), Eo(i) || (t._recent = i), r || wa(t, i), t._ts < 0 && so(t, t._tTime), t;
}, Ca = function(t, i) {
  return (Ee.ScrollTrigger || rs("scrollTrigger", i)) && Ee.ScrollTrigger.create(i, t);
}, ka = function(t, i, e, r, n) {
  if (ls(t, i, n), !t._initted) return 1;
  if (!e && t._pt && !Ut && (t._dur && t.vars.lazy !== false || !t._dur && t.vars.lazy) && _a !== Te.frame) return Or.push(t), t._lazy = [n, r], 1;
}, Hl = function a3(t) {
  var i = t.parent;
  return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || a3(i));
}, Eo = function(t) {
  var i = t.data;
  return i === "isFromStart" || i === "isStart";
}, Vl = function(t, i, e, r) {
  var n = t.ratio, o = i < 0 || !i && (!t._start && Hl(t) && !(!t._initted && Eo(t)) || (t._ts < 0 || t._dp._ts < 0) && !Eo(t)) ? 0 : 1, s = t._rDelay, l = 0, c, d, p;
  if (s && t._repeat && (l = vn(0, t._tDur, i), d = Li(l, s), t._yoyo && d & 1 && (o = 1 - o), d !== Li(t._tTime, s) && (n = 1 - o, t.vars.repeatRefresh && t._initted && t.invalidate())), o !== n || Ut || r || t._zTime === ft || !i && t._zTime) {
    if (!t._initted && ka(t, i, r, e, l)) return;
    for (p = t._zTime, t._zTime = i || (e ? ft : 0), e || (e = i && !p), t.ratio = o, t._from && (o = 1 - o), t._time = 0, t._tTime = l, c = t._pt; c; ) c.r(o, c.d), c = c._next;
    i < 0 && Oo(t, i, e, true), t._onUpdate && !e && Ae(t, "onUpdate"), l && t._repeat && !e && t.parent && Ae(t, "onRepeat"), (i >= t._tDur || i < 0) && t.ratio === o && (o && Dr(t, 1), !e && !Ut && (Ae(t, o ? "onComplete" : "onReverseComplete", true), t._prom && t._prom()));
  } else t._zTime || (t._zTime = i);
}, Jl = function(t, i, e) {
  var r;
  if (e > i) for (r = t._first; r && r._start <= e; ) {
    if (r.data === "isPause" && r._start > i) return r;
    r = r._next;
  }
  else for (r = t._last; r && r._start >= e; ) {
    if (r.data === "isPause" && r._start < i) return r;
    r = r._prev;
  }
}, Di = function(t, i, e, r) {
  var n = t._repeat, o = _t(i) || 0, s = t._tTime / t._tDur;
  return s && !r && (t._time *= o / t._dur), t._dur = o, t._tDur = n ? n < 0 ? 1e10 : _t(o * (n + 1) + t._rDelay * n) : o, s > 0 && !r && so(t, t._tTime = t._tDur * s), t.parent && oo(t), e || ri(t.parent, t), t;
}, As = function(t) {
  return t instanceof pe ? ri(t) : Di(t, t._dur);
}, ql = { _start: 0, endTime: hn, totalDuration: hn }, Ie = function a4(t, i, e) {
  var r = t.labels, n = t._recent || ql, o = t.duration() >= ze ? n.endTime(false) : t._dur, s, l, c;
  return Gt(i) && (isNaN(i) || i in r) ? (l = i.charAt(0), c = i.substr(-1) === "%", s = i.indexOf("="), l === "<" || l === ">" ? (s >= 0 && (i = i.replace(/=/, "")), (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(i.substr(1)) || 0) * (c ? (s < 0 ? n : e).totalDuration() / 100 : 1)) : s < 0 ? (i in r || (r[i] = o), r[i]) : (l = parseFloat(i.charAt(s - 1) + i.substr(s + 1)), c && e && (l = l / 100 * (re(e) ? e[0] : e).totalDuration()), s > 1 ? a4(t, i.substr(0, s - 1), e) + l : o + l)) : i == null ? o : +i;
}, ji = function(t, i, e) {
  var r = mr(i[1]), n = (r ? 2 : 1) + (t < 2 ? 0 : 1), o = i[n], s, l;
  if (r && (o.duration = i[1]), o.parent = e, t) {
    for (s = o, l = e; l && !("immediateRender" in s); ) s = l.vars.defaults || {}, l = ge(l.vars.inherit) && l.parent;
    o.immediateRender = ge(s.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = i[n - 1];
  }
  return new Ot(i[0], o, i[n + 1]);
}, Fr = function(t, i) {
  return t || t === 0 ? i(t) : i;
}, vn = function(t, i, e) {
  return e < t ? t : e > i ? i : e;
}, te = function(t, i) {
  return !Gt(t) || !(i = Fl.exec(t)) ? "" : i[1];
}, Ql = function(t, i, e) {
  return Fr(e, function(r) {
    return vn(t, i, r);
  });
}, Lo = [].slice, Ma = function(t, i) {
  return t && or(t) && "length" in t && (!i && !t.length || t.length - 1 in t && or(t[0])) && !t.nodeType && t !== je;
}, Zl = function(t, i, e) {
  return e === void 0 && (e = []), t.forEach(function(r) {
    var n;
    return Gt(r) && !i || Ma(r, 1) ? (n = e).push.apply(n, Ne(r)) : e.push(r);
  }) || e;
}, Ne = function(t, i, e) {
  return pt && !i && pt.selector ? pt.selector(t) : Gt(t) && !e && (Ao || !Ii()) ? Lo.call((i || es).querySelectorAll(t), 0) : re(t) ? Zl(t, e) : Ma(t) ? Lo.call(t, 0) : t ? [t] : [];
}, Do = function(t) {
  return t = Ne(t)[0] || un("Invalid scope") || {}, function(i) {
    var e = t.current || t.nativeElement || t;
    return Ne(i, e.querySelectorAll ? e : e === t ? un("Invalid scope") || es.createElement("div") : t);
  };
}, Sa = function(t) {
  return t.sort(function() {
    return 0.5 - Math.random();
  });
}, Ta = function(t) {
  if (vt(t)) return t;
  var i = or(t) ? t : { each: t }, e = ii(i.ease), r = i.from || 0, n = parseFloat(i.base) || 0, o = {}, s = r > 0 && r < 1, l = isNaN(r) || s, c = i.axis, d = r, p = r;
  return Gt(r) ? d = p = { center: 0.5, edges: 0.5, end: 1 }[r] || 0 : !s && l && (d = r[0], p = r[1]), function(u, f, x) {
    var g = (x || i).length, b = o[g], k, w, m, _, C, S, v, y, T;
    if (!b) {
      if (T = i.grid === "auto" ? 0 : (i.grid || [1, ze])[1], !T) {
        for (v = -ze; v < (v = x[T++].getBoundingClientRect().left) && T < g; ) ;
        T < g && T--;
      }
      for (b = o[g] = [], k = l ? Math.min(T, g) * d - 0.5 : r % T, w = T === ze ? 0 : l ? g * p / T - 0.5 : r / T | 0, v = 0, y = ze, S = 0; S < g; S++) m = S % T - k, _ = w - (S / T | 0), b[S] = C = c ? Math.abs(c === "y" ? _ : m) : ca(m * m + _ * _), C > v && (v = C), C < y && (y = C);
      r === "random" && Sa(b), b.max = v - y, b.min = y, b.v = g = (parseFloat(i.amount) || parseFloat(i.each) * (T > g ? g - 1 : c ? c === "y" ? g / T : T : Math.max(T, g / T)) || 0) * (r === "edges" ? -1 : 1), b.b = g < 0 ? n - g : n, b.u = te(i.amount || i.each) || 0, e = e && g < 0 ? dc(e) : e;
    }
    return g = (b[u] - b.min) / b.max || 0, _t(b.b + (e ? e(g) : g) * b.v) + b.u;
  };
}, Io = function(t) {
  var i = Math.pow(10, ((t + "").split(".")[1] || "").length);
  return function(e) {
    var r = _t(Math.round(parseFloat(e) / t) * t * i);
    return (r - r % 1) / i + (mr(e) ? 0 : te(e));
  };
}, Pa = function(t, i) {
  var e = re(t), r, n;
  return !e && or(t) && (r = e = t.radius || ze, t.values ? (t = Ne(t.values), (n = !mr(t[0])) && (r *= r)) : t = Io(t.increment)), Fr(i, e ? vt(t) ? function(o) {
    return n = t(o), Math.abs(n - o) <= r ? n : o;
  } : function(o) {
    for (var s = parseFloat(n ? o.x : o), l = parseFloat(n ? o.y : 0), c = ze, d = 0, p = t.length, u, f; p--; ) n ? (u = t[p].x - s, f = t[p].y - l, u = u * u + f * f) : u = Math.abs(t[p] - s), u < c && (c = u, d = p);
    return d = !r || c <= r ? t[d] : o, n || d === o || mr(o) ? d : d + te(o);
  } : Io(t));
}, Aa = function(t, i, e, r) {
  return Fr(re(t) ? !i : e === true ? !!(e = 0) : !r, function() {
    return re(t) ? t[~~(Math.random() * t.length)] : (e = e || 1e-5) && (r = e < 1 ? Math.pow(10, (e + "").length - 2) : 1) && Math.floor(Math.round((t - e / 2 + Math.random() * (i - t + e * 0.99)) / e) * e * r) / r;
  });
}, Kl = function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
  return function(r) {
    return i.reduce(function(n, o) {
      return o(n);
    }, r);
  };
}, jl = function(t, i) {
  return function(e) {
    return t(parseFloat(e)) + (i || te(e));
  };
}, tc = function(t, i, e) {
  return Oa(t, i, 0, 1, e);
}, Ra = function(t, i, e) {
  return Fr(e, function(r) {
    return t[~~i(r)];
  });
}, ec = function a5(t, i, e) {
  var r = i - t;
  return re(t) ? Ra(t, a5(0, t.length), i) : Fr(e, function(n) {
    return (r + (n - t) % r) % r + t;
  });
}, rc = function a6(t, i, e) {
  var r = i - t, n = r * 2;
  return re(t) ? Ra(t, a6(0, t.length - 1), i) : Fr(e, function(o) {
    return o = (n + (o - t) % n) % n || 0, t + (o > r ? n - o : o);
  });
}, pn = function(t) {
  return t.replace(Il, function(i) {
    var e = i.indexOf("[") + 1, r = i.substring(e || 7, e ? i.indexOf("]") : i.length - 1).split($l);
    return Aa(e ? r : +r[0], e ? 0 : +r[1], +r[2] || 1e-5);
  });
}, Oa = function(t, i, e, r, n) {
  var o = i - t, s = r - e;
  return Fr(n, function(l) {
    return e + ((l - t) / o * s || 0);
  });
}, ic = function a7(t, i, e, r) {
  var n = isNaN(t + i) ? 0 : function(f) {
    return (1 - f) * t + f * i;
  };
  if (!n) {
    var o = Gt(t), s = {}, l, c, d, p, u;
    if (e === true && (r = 1) && (e = null), o) t = { p: t }, i = { p: i };
    else if (re(t) && !re(i)) {
      for (d = [], p = t.length, u = p - 2, c = 1; c < p; c++) d.push(a7(t[c - 1], t[c]));
      p--, n = function(x) {
        x *= p;
        var g = Math.min(u, ~~x);
        return d[g](x - g);
      }, e = i;
    } else r || (t = Ei(re(t) ? [] : {}, t));
    if (!d) {
      for (l in i) as.call(s, t, l, "get", i[l]);
      n = function(x) {
        return fs(x, s) || (o ? t.p : t);
      };
    }
  }
  return Fr(e, n);
}, Rs = function(t, i, e) {
  var r = t.labels, n = ze, o, s, l;
  for (o in r) s = r[o] - i, s < 0 == !!e && s && n > (s = Math.abs(s)) && (l = o, n = s);
  return l;
}, Ae = function(t, i, e) {
  var r = t.vars, n = r[i], o = pt, s = t._ctx, l, c, d;
  if (n) return l = r[i + "Params"], c = r.callbackScope || t, e && Or.length && Jn(), s && (pt = s), d = l ? n.apply(c, l) : n.call(c), pt = o, d;
}, Ui = function(t) {
  return Dr(t), t.scrollTrigger && t.scrollTrigger.kill(!!Ut), t.progress() < 1 && Ae(t, "onInterrupt"), t;
}, Ci, Ea = [], La = function(t) {
  if (t) if (t = !t.name && t.default || t, ts() || t.headless) {
    var i = t.name, e = vt(t), r = i && !e && t.init ? function() {
      this._props = [];
    } : t, n = { init: hn, render: fs, add: as, kill: bc, modifier: xc, rawVars: 0 }, o = { targetTest: 0, get: 0, getSetter: ds, aliases: {}, register: 0 };
    if (Ii(), t !== r) {
      if (Me[i]) return;
      Le(r, Le(qn(t, n), o)), Ei(r.prototype, Ei(n, qn(t, o))), Me[r.prop = i] = r, t.targetTest && (zn.push(r), is[i] = 1), i = (i === "css" ? "CSS" : i.charAt(0).toUpperCase() + i.substr(1)) + "Plugin";
    }
    ga(i, r), t.register && t.register(xe, r, me);
  } else Ea.push(t);
}, dt = 255, Hi = { aqua: [0, dt, dt], lime: [0, dt, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, dt], navy: [0, 0, 128], white: [dt, dt, dt], olive: [128, 128, 0], yellow: [dt, dt, 0], orange: [dt, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [dt, 0, 0], pink: [dt, 192, 203], cyan: [0, dt, dt], transparent: [dt, dt, dt, 0] }, _o = function(t, i, e) {
  return t += t < 0 ? 1 : t > 1 ? -1 : 0, (t * 6 < 1 ? i + (e - i) * t * 6 : t < 0.5 ? e : t * 3 < 2 ? i + (e - i) * (2 / 3 - t) * 6 : i) * dt + 0.5 | 0;
}, Da = function(t, i, e) {
  var r = t ? mr(t) ? [t >> 16, t >> 8 & dt, t & dt] : 0 : Hi.black, n, o, s, l, c, d, p, u, f, x;
  if (!r) {
    if (t.substr(-1) === "," && (t = t.substr(0, t.length - 1)), Hi[t]) r = Hi[t];
    else if (t.charAt(0) === "#") {
      if (t.length < 6 && (n = t.charAt(1), o = t.charAt(2), s = t.charAt(3), t = "#" + n + n + o + o + s + s + (t.length === 5 ? t.charAt(4) + t.charAt(4) : "")), t.length === 9) return r = parseInt(t.substr(1, 6), 16), [r >> 16, r >> 8 & dt, r & dt, parseInt(t.substr(7), 16) / 255];
      t = parseInt(t.substr(1), 16), r = [t >> 16, t >> 8 & dt, t & dt];
    } else if (t.substr(0, 3) === "hsl") {
      if (r = x = t.match(Ms), !i) l = +r[0] % 360 / 360, c = +r[1] / 100, d = +r[2] / 100, o = d <= 0.5 ? d * (c + 1) : d + c - d * c, n = d * 2 - o, r.length > 3 && (r[3] *= 1), r[0] = _o(l + 1 / 3, n, o), r[1] = _o(l, n, o), r[2] = _o(l - 1 / 3, n, o);
      else if (~t.indexOf("=")) return r = t.match(fa), e && r.length < 4 && (r[3] = 1), r;
    } else r = t.match(Ms) || Hi.transparent;
    r = r.map(Number);
  }
  return i && !x && (n = r[0] / dt, o = r[1] / dt, s = r[2] / dt, p = Math.max(n, o, s), u = Math.min(n, o, s), d = (p + u) / 2, p === u ? l = c = 0 : (f = p - u, c = d > 0.5 ? f / (2 - p - u) : f / (p + u), l = p === n ? (o - s) / f + (o < s ? 6 : 0) : p === o ? (s - n) / f + 2 : (n - o) / f + 4, l *= 60), r[0] = ~~(l + 0.5), r[1] = ~~(c * 100 + 0.5), r[2] = ~~(d * 100 + 0.5)), e && r.length < 4 && (r[3] = 1), r;
}, Ia = function(t) {
  var i = [], e = [], r = -1;
  return t.split(Er).forEach(function(n) {
    var o = n.match(wi) || [];
    i.push.apply(i, o), e.push(r += o.length + 1);
  }), i.c = e, i;
}, Os = function(t, i, e) {
  var r = "", n = (t + r).match(Er), o = i ? "hsla(" : "rgba(", s = 0, l, c, d, p;
  if (!n) return t;
  if (n = n.map(function(u) {
    return (u = Da(u, i, 1)) && o + (i ? u[0] + "," + u[1] + "%," + u[2] + "%," + u[3] : u.join(",")) + ")";
  }), e && (d = Ia(t), l = e.c, l.join(r) !== d.c.join(r))) for (c = t.replace(Er, "1").split(wi), p = c.length - 1; s < p; s++) r += c[s] + (~l.indexOf(s) ? n.shift() || o + "0,0,0,0)" : (d.length ? d : n.length ? n : e).shift());
  if (!c) for (c = t.split(Er), p = c.length - 1; s < p; s++) r += c[s] + n[s];
  return r + c[p];
}, Er = (function() {
  var a17 = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", t;
  for (t in Hi) a17 += "|" + t + "\\b";
  return new RegExp(a17 + ")", "gi");
})(), nc = /hsl[a]?\(/, $a = function(t) {
  var i = t.join(" "), e;
  if (Er.lastIndex = 0, Er.test(i)) return e = nc.test(i), t[1] = Os(t[1], e), t[0] = Os(t[0], e, Ia(t[1])), true;
}, gn, Te = (function() {
  var a17 = Date.now, t = 500, i = 33, e = a17(), r = e, n = 1e3 / 240, o = n, s = [], l, c, d, p, u, f, x = function g(b) {
    var k = a17() - r, w = b === true, m, _, C, S;
    if ((k > t || k < 0) && (e += k - i), r += k, C = r - e, m = C - o, (m > 0 || w) && (S = ++p.frame, u = C - p.time * 1e3, p.time = C = C / 1e3, o += m + (m >= n ? 4 : n - m), _ = 1), w || (l = c(g)), _) for (f = 0; f < s.length; f++) s[f](C, u, S, b);
  };
  return p = { time: 0, frame: 0, tick: function() {
    x(true);
  }, deltaRatio: function(b) {
    return u / (1e3 / (b || 60));
  }, wake: function() {
    ha && (!Ao && ts() && (je = Ao = window, es = je.document || {}, Ee.gsap = xe, (je.gsapVersions || (je.gsapVersions = [])).push(xe.version), pa(Vn || je.GreenSockGlobals || !je.gsap && je || {}), Ea.forEach(La)), d = typeof requestAnimationFrame < "u" && requestAnimationFrame, l && p.sleep(), c = d || function(b) {
      return setTimeout(b, o - p.time * 1e3 + 1 | 0);
    }, gn = 1, x(2));
  }, sleep: function() {
    (d ? cancelAnimationFrame : clearTimeout)(l), gn = 0, c = hn;
  }, lagSmoothing: function(b, k) {
    t = b || 1 / 0, i = Math.min(k || 33, t);
  }, fps: function(b) {
    n = 1e3 / (b || 240), o = p.time * 1e3 + n;
  }, add: function(b, k, w) {
    var m = k ? function(_, C, S, v) {
      b(_, C, S, v), p.remove(m);
    } : b;
    return p.remove(b), s[w ? "unshift" : "push"](m), Ii(), m;
  }, remove: function(b, k) {
    ~(k = s.indexOf(b)) && s.splice(k, 1) && f >= k && f--;
  }, _listeners: s }, p;
})(), Ii = function() {
  return !gn && Te.wake();
}, j = {}, oc = /^[\d.\-M][\d.\-,\s]/, sc = /["']/g, ac = function(t) {
  for (var i = {}, e = t.substr(1, t.length - 3).split(":"), r = e[0], n = 1, o = e.length, s, l, c; n < o; n++) l = e[n], s = n !== o - 1 ? l.lastIndexOf(",") : l.length, c = l.substr(0, s), i[r] = isNaN(c) ? c.replace(sc, "").trim() : +c, r = l.substr(s + 1).trim();
  return i;
}, lc = function(t) {
  var i = t.indexOf("(") + 1, e = t.indexOf(")"), r = t.indexOf("(", i);
  return t.substring(i, ~r && r < e ? t.indexOf(")", e + 1) : e);
}, cc = function(t) {
  var i = (t + "").split("("), e = j[i[0]];
  return e && i.length > 1 && e.config ? e.config.apply(null, ~t.indexOf("{") ? [ac(i[1])] : lc(t).split(",").map(xa)) : j._CE && oc.test(t) ? j._CE("", t) : e;
}, dc = function(t) {
  return function(i) {
    return 1 - t(1 - i);
  };
}, ii = function(t, i) {
  return t && (vt(t) ? t : j[t] || cc(t)) || i;
}, fi = function(t, i, e, r) {
  e === void 0 && (e = function(l) {
    return 1 - i(1 - l);
  }), r === void 0 && (r = function(l) {
    return l < 0.5 ? i(l * 2) / 2 : 1 - i((1 - l) * 2) / 2;
  });
  var n = { easeIn: i, easeOut: e, easeInOut: r }, o;
  return _e(t, function(s) {
    j[s] = Ee[s] = n, j[o = s.toLowerCase()] = e;
    for (var l in n) j[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = j[s + "." + l] = n[l];
  }), n;
}, Ba = function(t) {
  return function(i) {
    return i < 0.5 ? (1 - t(1 - i * 2)) / 2 : 0.5 + t((i - 0.5) * 2) / 2;
  };
}, mo = function a8(t, i, e) {
  var r = i >= 1 ? i : 1, n = (e || (t ? 0.3 : 0.45)) / (i < 1 ? i : 1), o = n / Po * (Math.asin(1 / r) || 0), s = function(d) {
    return d === 1 ? 1 : r * Math.pow(2, -10 * d) * Dl((d - o) * n) + 1;
  }, l = t === "out" ? s : t === "in" ? function(c) {
    return 1 - s(1 - c);
  } : Ba(s);
  return n = Po / n, l.config = function(c, d) {
    return a8(t, c, d);
  }, l;
}, yo = function a9(t, i) {
  i === void 0 && (i = 1.70158);
  var e = function(o) {
    return o ? --o * o * ((i + 1) * o + i) + 1 : 0;
  }, r = t === "out" ? e : t === "in" ? function(n) {
    return 1 - e(1 - n);
  } : Ba(e);
  return r.config = function(n) {
    return a9(t, n);
  }, r;
};
_e("Linear,Quad,Cubic,Quart,Quint,Strong", function(a17, t) {
  var i = t < 5 ? t + 1 : t;
  fi(a17 + ",Power" + (i - 1), t ? function(e) {
    return Math.pow(e, i);
  } : function(e) {
    return e;
  }, function(e) {
    return 1 - Math.pow(1 - e, i);
  }, function(e) {
    return e < 0.5 ? Math.pow(e * 2, i) / 2 : 1 - Math.pow((1 - e) * 2, i) / 2;
  });
});
j.Linear.easeNone = j.none = j.Linear.easeIn;
fi("Elastic", mo("in"), mo("out"), mo());
(function(a17, t) {
  var i = 1 / t, e = 2 * i, r = 2.5 * i, n = function(s) {
    return s < i ? a17 * s * s : s < e ? a17 * Math.pow(s - 1.5 / t, 2) + 0.75 : s < r ? a17 * (s -= 2.25 / t) * s + 0.9375 : a17 * Math.pow(s - 2.625 / t, 2) + 0.984375;
  };
  fi("Bounce", function(o) {
    return 1 - n(1 - o);
  }, n);
})(7.5625, 2.75);
fi("Expo", function(a17) {
  return Math.pow(2, 10 * (a17 - 1)) * a17 + a17 * a17 * a17 * a17 * a17 * a17 * (1 - a17);
});
fi("Circ", function(a17) {
  return -(ca(1 - a17 * a17) - 1);
});
fi("Sine", function(a17) {
  return a17 === 1 ? 1 : -Ll(a17 * Ol) + 1;
});
fi("Back", yo("in"), yo("out"), yo());
j.SteppedEase = j.steps = Ee.SteppedEase = { config: function(t, i) {
  t === void 0 && (t = 1);
  var e = 1 / t, r = t + (i ? 0 : 1), n = i ? 1 : 0, o = 1 - ft;
  return function(s) {
    return ((r * vn(0, o, s) | 0) + n) * e;
  };
} };
fn.ease = j["quad.out"];
_e("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(a17) {
  return ns += a17 + "," + a17 + "Params,";
});
var Fa = function(t, i) {
  this.id = El++, t._gsap = this, this.target = t, this.harness = i, this.get = i ? i.get : ma, this.set = i ? i.getSetter : ds;
}, _n = (function() {
  function a17(i) {
    this.vars = i, this._delay = +i.delay || 0, (this._repeat = i.repeat === 1 / 0 ? -2 : i.repeat || 0) && (this._rDelay = i.repeatDelay || 0, this._yoyo = !!i.yoyo || !!i.yoyoEase), this._ts = 1, Di(this, +i.duration, 1, 1), this.data = i.data, pt && (this._ctx = pt, pt.data.push(this)), gn || Te.wake();
  }
  var t = a17.prototype;
  return t.delay = function(e) {
    return e || e === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), this._delay = e, this) : this._delay;
  }, t.duration = function(e) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
  }, t.totalDuration = function(e) {
    return arguments.length ? (this._dirty = 0, Di(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, t.totalTime = function(e, r) {
    if (Ii(), !arguments.length) return this._tTime;
    var n = this._dp;
    if (n && n.smoothChildTiming && this._ts) {
      for (so(this, e), !n._dp || n.parent || wa(n, this); n && n.parent; ) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, true), n = n.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && e < this._tDur || this._ts < 0 && e > 0 || !this._tDur && !e) && er(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== e || !this._dur && !r || this._initted && Math.abs(this._zTime) === ft || !this._initted && this._dur && e || !e && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = e), ya(this, e, r)), this;
  }, t.time = function(e, r) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + Ps(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), r) : this._time;
  }, t.totalProgress = function(e, r) {
    return arguments.length ? this.totalTime(this.totalDuration() * e, r) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, t.progress = function(e, r) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - e : e) + Ps(this), r) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, t.iteration = function(e, r) {
    var n = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (e - 1) * n, r) : this._repeat ? Li(this._tTime, n) + 1 : 1;
  }, t.timeScale = function(e, r) {
    if (!arguments.length) return this._rts === -ft ? 0 : this._rts;
    if (this._rts === e) return this;
    var n = this.parent && this._ts ? Qn(this.parent._time, this) : this._tTime;
    return this._rts = +e || 0, this._ts = this._ps || e === -ft ? 0 : this._rts, this.totalTime(vn(-Math.abs(this._delay), this.totalDuration(), n), r !== false), oo(this), Xl(this);
  }, t.paused = function(e) {
    return arguments.length ? (this._ps !== e && (this._ps = e, e ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Ii(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== ft && (this._tTime -= ft)))), this) : this._ps;
  }, t.startTime = function(e) {
    if (arguments.length) {
      this._start = _t(e);
      var r = this.parent || this._dp;
      return r && (r._sort || !this.parent) && er(r, this, this._start - this._delay), this;
    }
    return this._start;
  }, t.endTime = function(e) {
    return this._start + (ge(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, t.rawTime = function(e) {
    var r = this.parent || this._dp;
    return r ? e && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Qn(r.rawTime(e), this) : this._tTime : this._tTime;
  }, t.revert = function(e) {
    e === void 0 && (e = Nl);
    var r = Ut;
    return Ut = e, ss(this) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), this.data !== "nested" && e.kill !== false && this.kill(), Ut = r, this;
  }, t.globalTime = function(e) {
    for (var r = this, n = arguments.length ? e : r.rawTime(); r; ) n = r._start + n / (Math.abs(r._ts) || 1), r = r._dp;
    return !this.parent && this._sat ? this._sat.globalTime(e) : n;
  }, t.repeat = function(e) {
    return arguments.length ? (this._repeat = e === 1 / 0 ? -2 : e, As(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, t.repeatDelay = function(e) {
    if (arguments.length) {
      var r = this._time;
      return this._rDelay = e, As(this), r ? this.time(r) : this;
    }
    return this._rDelay;
  }, t.yoyo = function(e) {
    return arguments.length ? (this._yoyo = e, this) : this._yoyo;
  }, t.seek = function(e, r) {
    return this.totalTime(Ie(this, e), ge(r));
  }, t.restart = function(e, r) {
    return this.play().totalTime(e ? -this._delay : 0, ge(r)), this._dur || (this._zTime = -ft), this;
  }, t.play = function(e, r) {
    return e != null && this.seek(e, r), this.reversed(false).paused(false);
  }, t.reverse = function(e, r) {
    return e != null && this.seek(e || this.totalDuration(), r), this.reversed(true).paused(false);
  }, t.pause = function(e, r) {
    return e != null && this.seek(e, r), this.paused(true);
  }, t.resume = function() {
    return this.paused(false);
  }, t.reversed = function(e) {
    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -ft : 0)), this) : this._rts < 0;
  }, t.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -ft, this;
  }, t.isActive = function() {
    var e = this.parent || this._dp, r = this._start, n;
    return !!(!e || this._ts && this._initted && e.isActive() && (n = e.rawTime(true)) >= r && n < this.endTime(true) - ft);
  }, t.eventCallback = function(e, r, n) {
    var o = this.vars;
    return arguments.length > 1 ? (r ? (o[e] = r, n && (o[e + "Params"] = n), e === "onUpdate" && (this._onUpdate = r)) : delete o[e], this) : o[e];
  }, t.then = function(e) {
    var r = this, n = r._prom;
    return new Promise(function(o) {
      var s = vt(e) ? e : ba, l = function() {
        var d = r.then;
        r.then = null, n && n(), vt(s) && (s = s(r)) && (s.then || s === r) && (r.then = d), o(s), r.then = d;
      };
      r._initted && r.totalProgress() === 1 && r._ts >= 0 || !r._tTime && r._ts < 0 ? l() : r._prom = l;
    });
  }, t.kill = function() {
    Ui(this);
  }, a17;
})();
Le(_n.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: false, parent: null, _initted: false, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -ft, _prom: 0, _ps: false, _rts: 1 });
var pe = (function(a17) {
  la(t, a17);
  function t(e, r) {
    var n;
    return e === void 0 && (e = {}), n = a17.call(this, e) || this, n.labels = {}, n.smoothChildTiming = !!e.smoothChildTiming, n.autoRemoveChildren = !!e.autoRemoveChildren, n._sort = ge(e.sortChildren), mt && er(e.parent || mt, ur(n), r), e.reversed && n.reverse(), e.paused && n.paused(true), e.scrollTrigger && Ca(ur(n), e.scrollTrigger), n;
  }
  var i = t.prototype;
  return i.to = function(r, n, o) {
    return ji(0, arguments, this), this;
  }, i.from = function(r, n, o) {
    return ji(1, arguments, this), this;
  }, i.fromTo = function(r, n, o, s) {
    return ji(2, arguments, this), this;
  }, i.set = function(r, n, o) {
    return n.duration = 0, n.parent = this, Ki(n).repeatDelay || (n.repeat = 0), n.immediateRender = !!n.immediateRender, new Ot(r, n, Ie(this, o), 1), this;
  }, i.call = function(r, n, o) {
    return er(this, Ot.delayedCall(0, r, n), o);
  }, i.staggerTo = function(r, n, o, s, l, c, d) {
    return o.duration = n, o.stagger = o.stagger || s, o.onComplete = c, o.onCompleteParams = d, o.parent = this, new Ot(r, o, Ie(this, l)), this;
  }, i.staggerFrom = function(r, n, o, s, l, c, d) {
    return o.runBackwards = 1, Ki(o).immediateRender = ge(o.immediateRender), this.staggerTo(r, n, o, s, l, c, d);
  }, i.staggerFromTo = function(r, n, o, s, l, c, d, p) {
    return s.startAt = o, Ki(s).immediateRender = ge(s.immediateRender), this.staggerTo(r, n, s, l, c, d, p);
  }, i.render = function(r, n, o) {
    var s = this._time, l = this._dirty ? this.totalDuration() : this._tDur, c = this._dur, d = r <= 0 ? 0 : _t(r), p = this._zTime < 0 != r < 0 && (this._initted || !c), u, f, x, g, b, k, w, m, _, C, S, v;
    if (this !== mt && d > l && r >= 0 && (d = l), d !== this._tTime || o || p) {
      if (s !== this._time && c && (d += this._time - s, r += this._time - s), u = d, _ = this._start, m = this._ts, k = !m, p && (c || (s = this._zTime), (r || !n) && (this._zTime = r)), this._repeat) {
        if (S = this._yoyo, b = c + this._rDelay, this._repeat < -1 && r < 0) return this.totalTime(b * 100 + r, n, o);
        if (u = _t(d % b), d === l ? (g = this._repeat, u = c) : (C = _t(d / b), g = ~~C, g && g === C && (u = c, g--), u > c && (u = c)), C = Li(this._tTime, b), !s && this._tTime && C !== g && this._tTime - C * b - this._dur <= 0 && (C = g), S && g & 1 && (u = c - u, v = 1), g !== C && !this._lock) {
          var y = S && C & 1, T = y === (S && g & 1);
          if (g < C && (y = !y), s = y ? 0 : d % c ? c : d, this._lock = 1, this.render(s || (v ? 0 : _t(g * b)), n, !c)._lock = 0, this._tTime = d, !n && this.parent && Ae(this, "onRepeat"), this.vars.repeatRefresh && !v && (this.invalidate()._lock = 1, C = g), s && s !== this._time || k !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
          if (c = this._dur, l = this._tDur, T && (this._lock = 2, s = y ? c : -1e-4, this.render(s, true), this.vars.repeatRefresh && !v && this.invalidate()), this._lock = 0, !this._ts && !k) return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (w = Jl(this, _t(s), _t(u)), w && (d -= u - (u = w._start))), this._tTime = d, this._time = u, this._act = !!m, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = r, s = 0), !s && d && c && !n && !C && (Ae(this, "onStart"), this._tTime !== d)) return this;
      if (u >= s && r >= 0) for (f = this._first; f; ) {
        if (x = f._next, (f._act || u >= f._start) && f._ts && w !== f) {
          if (f.parent !== this) return this.render(r, n, o);
          if (f.render(f._ts > 0 ? (u - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (u - f._start) * f._ts, n, o), u !== this._time || !this._ts && !k) {
            w = 0, x && (d += this._zTime = -ft);
            break;
          }
        }
        f = x;
      }
      else {
        f = this._last;
        for (var M = r < 0 ? r : u; f; ) {
          if (x = f._prev, (f._act || M <= f._end) && f._ts && w !== f) {
            if (f.parent !== this) return this.render(r, n, o);
            if (f.render(f._ts > 0 ? (M - f._start) * f._ts : (f._dirty ? f.totalDuration() : f._tDur) + (M - f._start) * f._ts, n, o || Ut && ss(f)), u !== this._time || !this._ts && !k) {
              w = 0, x && (d += this._zTime = M ? -ft : ft);
              break;
            }
          }
          f = x;
        }
      }
      if (w && !n && (this.pause(), w.render(u >= s ? 0 : -ft)._zTime = u >= s ? 1 : -1, this._ts)) return this._start = _, oo(this), this.render(r, n, o);
      this._onUpdate && !n && Ae(this, "onUpdate", true), (d === l && this._tTime >= this.totalDuration() || !d && s) && (_ === this._start || Math.abs(m) !== Math.abs(this._ts)) && (this._lock || ((r || !c) && (d === l && this._ts > 0 || !d && this._ts < 0) && Dr(this, 1), !n && !(r < 0 && !s) && (d || s || !l) && (Ae(this, d === l && r >= 0 ? "onComplete" : "onReverseComplete", true), this._prom && !(d < l && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, i.add = function(r, n) {
    var o = this;
    if (mr(n) || (n = Ie(this, n, r)), !(r instanceof _n)) {
      if (re(r)) return r.forEach(function(s) {
        return o.add(s, n);
      }), this;
      if (Gt(r)) return this.addLabel(r, n);
      if (vt(r)) r = Ot.delayedCall(0, r);
      else return this;
    }
    return this !== r ? er(this, r, n) : this;
  }, i.getChildren = function(r, n, o, s) {
    r === void 0 && (r = true), n === void 0 && (n = true), o === void 0 && (o = true), s === void 0 && (s = -ze);
    for (var l = [], c = this._first; c; ) c._start >= s && (c instanceof Ot ? n && l.push(c) : (o && l.push(c), r && l.push.apply(l, c.getChildren(true, n, o)))), c = c._next;
    return l;
  }, i.getById = function(r) {
    for (var n = this.getChildren(1, 1, 1), o = n.length; o--; ) if (n[o].vars.id === r) return n[o];
  }, i.remove = function(r) {
    return Gt(r) ? this.removeLabel(r) : vt(r) ? this.killTweensOf(r) : (r.parent === this && no(this, r), r === this._recent && (this._recent = this._last), ri(this));
  }, i.totalTime = function(r, n) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = _t(Te.time - (this._ts > 0 ? r / this._ts : (this.totalDuration() - r) / -this._ts))), a17.prototype.totalTime.call(this, r, n), this._forcing = 0, this) : this._tTime;
  }, i.addLabel = function(r, n) {
    return this.labels[r] = Ie(this, n), this;
  }, i.removeLabel = function(r) {
    return delete this.labels[r], this;
  }, i.addPause = function(r, n, o) {
    var s = Ot.delayedCall(0, n || hn, o);
    return s.data = "isPause", this._hasPause = 1, er(this, s, Ie(this, r));
  }, i.removePause = function(r) {
    var n = this._first;
    for (r = Ie(this, r); n; ) n._start === r && n.data === "isPause" && Dr(n), n = n._next;
  }, i.killTweensOf = function(r, n, o) {
    for (var s = this.getTweensOf(r, o), l = s.length; l--; ) Sr !== s[l] && s[l].kill(r, n);
    return this;
  }, i.getTweensOf = function(r, n) {
    for (var o = [], s = Ne(r), l = this._first, c = mr(n), d; l; ) l instanceof Ot ? Gl(l._targets, s) && (c ? (!Sr || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && o.push(l) : (d = l.getTweensOf(s, n)).length && o.push.apply(o, d), l = l._next;
    return o;
  }, i.tweenTo = function(r, n) {
    n = n || {};
    var o = this, s = Ie(o, r), l = n, c = l.startAt, d = l.onStart, p = l.onStartParams, u = l.immediateRender, f, x = Ot.to(o, Le({ ease: n.ease || "none", lazy: false, immediateRender: false, time: s, overwrite: "auto", duration: n.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale()) || ft, onStart: function() {
      if (o.pause(), !f) {
        var b = n.duration || Math.abs((s - (c && "time" in c ? c.time : o._time)) / o.timeScale());
        x._dur !== b && Di(x, b, 0, 1).render(x._time, true, true), f = 1;
      }
      d && d.apply(x, p || []);
    } }, n));
    return u ? x.render(0) : x;
  }, i.tweenFromTo = function(r, n, o) {
    return this.tweenTo(n, Le({ startAt: { time: Ie(this, r) } }, o));
  }, i.recent = function() {
    return this._recent;
  }, i.nextLabel = function(r) {
    return r === void 0 && (r = this._time), Rs(this, Ie(this, r));
  }, i.previousLabel = function(r) {
    return r === void 0 && (r = this._time), Rs(this, Ie(this, r), 1);
  }, i.currentLabel = function(r) {
    return arguments.length ? this.seek(r, true) : this.previousLabel(this._time + ft);
  }, i.shiftChildren = function(r, n, o) {
    o === void 0 && (o = 0);
    var s = this._first, l = this.labels, c;
    for (r = _t(r); s; ) s._start >= o && (s._start += r, s._end += r), s = s._next;
    if (n) for (c in l) l[c] >= o && (l[c] += r);
    return ri(this);
  }, i.invalidate = function(r) {
    var n = this._first;
    for (this._lock = 0; n; ) n.invalidate(r), n = n._next;
    return a17.prototype.invalidate.call(this, r);
  }, i.clear = function(r) {
    r === void 0 && (r = true);
    for (var n = this._first, o; n; ) o = n._next, this.remove(n), n = o;
    return this._dp && (this._time = this._tTime = this._pTime = 0), r && (this.labels = {}), ri(this);
  }, i.totalDuration = function(r) {
    var n = 0, o = this, s = o._last, l = ze, c, d, p;
    if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -r : r));
    if (o._dirty) {
      for (p = o.parent; s; ) c = s._prev, s._dirty && s.totalDuration(), d = s._start, d > l && o._sort && s._ts && !o._lock ? (o._lock = 1, er(o, s, d - s._delay, 1)._lock = 0) : l = d, d < 0 && s._ts && (n -= d, (!p && !o._dp || p && p.smoothChildTiming) && (o._start += _t(d / o._ts), o._time -= d, o._tTime -= d), o.shiftChildren(-d, false, -1 / 0), l = 0), s._end > n && s._ts && (n = s._end), s = c;
      Di(o, o === mt && o._time > n ? o._time : n, 1, 1), o._dirty = 0;
    }
    return o._tDur;
  }, t.updateRoot = function(r) {
    if (mt._ts && (ya(mt, Qn(r, mt)), _a = Te.frame), Te.frame >= Ss) {
      Ss += Oe.autoSleep || 120;
      var n = mt._first;
      if ((!n || !n._ts) && Oe.autoSleep && Te._listeners.length < 2) {
        for (; n && !n._ts; ) n = n._next;
        n || Te.sleep();
      }
    }
  }, t;
})(_n);
Le(pe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
var fc = function(t, i, e, r, n, o, s) {
  var l = new me(this._pt, t, i, 0, 1, Xa, null, n), c = 0, d = 0, p, u, f, x, g, b, k, w;
  for (l.b = e, l.e = r, e += "", r += "", (k = ~r.indexOf("random(")) && (r = pn(r)), o && (w = [e, r], o(w, t, i), e = w[0], r = w[1]), u = e.match(po) || []; p = po.exec(r); ) x = p[0], g = r.substring(c, p.index), f ? f = (f + 1) % 5 : g.substr(-5) === "rgba(" && (f = 1), x !== u[d++] && (b = parseFloat(u[d - 1]) || 0, l._pt = { _next: l._pt, p: g || d === 1 ? g : ",", s: b, c: x.charAt(1) === "=" ? Mi(b, x) - b : parseFloat(x) - b, m: f && f < 4 ? Math.round : 0 }, c = po.lastIndex);
  return l.c = c < r.length ? r.substring(c, r.length) : "", l.fp = s, (ua.test(r) || k) && (l.e = 0), this._pt = l, l;
}, as = function(t, i, e, r, n, o, s, l, c, d) {
  vt(r) && (r = r(n || 0, t, o));
  var p = t[i], u = e !== "get" ? e : vt(p) ? c ? t[i.indexOf("set") || !vt(t["get" + i.substr(3)]) ? i : "get" + i.substr(3)](c) : t[i]() : p, f = vt(p) ? c ? _c : Ya : cs, x;
  if (Gt(r) && (~r.indexOf("random(") && (r = pn(r)), r.charAt(1) === "=" && (x = Mi(u, r) + (te(u) || 0), (x || x === 0) && (r = x))), !d || u !== r || $o) return !isNaN(u * r) && r !== "" ? (x = new me(this._pt, t, i, +u || 0, r - (u || 0), typeof p == "boolean" ? yc : Wa, 0, f), c && (x.fp = c), s && x.modifier(s, this, t), this._pt = x) : (!p && !(i in t) && rs(i, r), fc.call(this, t, i, u, r, f, l || Oe.stringFilter, c));
}, uc = function(t, i, e, r, n) {
  if (vt(t) && (t = tn(t, n, i, e, r)), !or(t) || t.style && t.nodeType || re(t) || da(t)) return Gt(t) ? tn(t, n, i, e, r) : t;
  var o = {}, s;
  for (s in t) o[s] = tn(t[s], n, i, e, r);
  return o;
}, za = function(t, i, e, r, n, o) {
  var s, l, c, d;
  if (Me[t] && (s = new Me[t]()).init(n, s.rawVars ? i[t] : uc(i[t], r, n, o, e), e, r, o) !== false && (e._pt = l = new me(e._pt, n, t, 0, 1, s.render, s, 0, s.priority), e !== Ci)) for (c = e._ptLookup[e._targets.indexOf(n)], d = s._props.length; d--; ) c[s._props[d]] = l;
  return s;
}, Sr, $o, ls = function a10(t, i, e) {
  var r = t.vars, n = r.ease, o = r.startAt, s = r.immediateRender, l = r.lazy, c = r.onUpdate, d = r.runBackwards, p = r.yoyoEase, u = r.keyframes, f = r.autoRevert, x = t._dur, g = t._startAt, b = t._targets, k = t.parent, w = k && k.data === "nested" ? k.vars.targets : b, m = t._overwrite === "auto" && !Ko, _ = t.timeline, C = r.easeReverse || p, S, v, y, T, M, R, P, E, L, D, F, $, G;
  if (_ && (!u || !n) && (n = "none"), t._ease = ii(n, fn.ease), t._rEase = C && (ii(C) || t._ease), t._from = !_ && !!r.runBackwards, t._from && (t.ratio = 1), !_ || u && !r.stagger) {
    if (E = b[0] ? ei(b[0]).harness : 0, $ = E && r[E.prop], S = qn(r, is), g && (g._zTime < 0 && g.progress(1), i < 0 && d && s && !f ? g.render(-1, true) : g.revert(d && x ? Fn : zl), g._lazy = 0), o) {
      if (Dr(t._startAt = Ot.set(b, Le({ data: "isStart", overwrite: false, parent: k, immediateRender: true, lazy: !g && ge(l), startAt: null, delay: 0, onUpdate: c && function() {
        return Ae(t, "onUpdate");
      }, stagger: 0 }, o))), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Ut || !s && !f) && t._startAt.revert(Fn), s && x && i <= 0 && e <= 0) {
        i && (t._zTime = i);
        return;
      }
    } else if (d && x && !g) {
      if (i && (s = false), y = Le({ overwrite: false, data: "isFromStart", lazy: s && !g && ge(l), immediateRender: s, stagger: 0, parent: k }, S), $ && (y[E.prop] = $), Dr(t._startAt = Ot.set(b, y)), t._startAt._dp = 0, t._startAt._sat = t, i < 0 && (Ut ? t._startAt.revert(Fn) : t._startAt.render(-1, true)), t._zTime = i, !s) a10(t._startAt, ft, ft);
      else if (!i) return;
    }
    for (t._pt = t._ptCache = 0, l = x && ge(l) || l && !x, v = 0; v < b.length; v++) {
      if (M = b[v], P = M._gsap || os(b)[v]._gsap, t._ptLookup[v] = D = {}, Ro[P.id] && Or.length && Jn(), F = w === b ? v : w.indexOf(M), E && (L = new E()).init(M, $ || S, t, F, w) !== false && (t._pt = T = new me(t._pt, M, L.name, 0, 1, L.render, L, 0, L.priority), L._props.forEach(function(tt) {
        D[tt] = T;
      }), L.priority && (R = 1)), !E || $) for (y in S) Me[y] && (L = za(y, S, t, F, M, w)) ? L.priority && (R = 1) : D[y] = T = as.call(t, M, y, "get", S[y], F, w, 0, r.stringFilter);
      t._op && t._op[v] && t.kill(M, t._op[v]), m && t._pt && (Sr = t, mt.killTweensOf(M, D, t.globalTime(i)), G = !t.parent, Sr = 0), t._pt && l && (Ro[P.id] = 1);
    }
    R && Ua(t), t._onInit && t._onInit(t);
  }
  t._onUpdate = c, t._initted = (!t._op || t._pt) && !G, u && i <= 0 && _.render(ze, true, true);
}, hc = function(t, i, e, r, n, o, s, l) {
  var c = (t._pt && t._ptCache || (t._ptCache = {}))[i], d, p, u, f;
  if (!c) for (c = t._ptCache[i] = [], u = t._ptLookup, f = t._targets.length; f--; ) {
    if (d = u[f][i], d && d.d && d.d._pt) for (d = d.d._pt; d && d.p !== i && d.fp !== i; ) d = d._next;
    if (!d) return $o = 1, t.vars[i] = "+=0", ls(t, s), $o = 0, l ? un(i + " not eligible for reset. Try splitting into individual properties") : 1;
    c.push(d);
  }
  for (f = c.length; f--; ) p = c[f], d = p._pt || p, d.s = (r || r === 0) && !n ? r : d.s + (r || 0) + o * d.c, d.c = e - d.s, p.e && (p.e = Mt(e) + te(p.e)), p.b && (p.b = d.s + te(p.b));
}, pc = function(t, i) {
  var e = t[0] ? ei(t[0]).harness : 0, r = e && e.aliases, n, o, s, l;
  if (!r) return i;
  n = Ei({}, i);
  for (o in r) if (o in n) for (l = r[o].split(","), s = l.length; s--; ) n[l[s]] = n[o];
  return n;
}, gc = function(t, i, e, r) {
  var n = i.ease || r || "power1.inOut", o, s;
  if (re(i)) s = e[t] || (e[t] = []), i.forEach(function(l, c) {
    return s.push({ t: c / (i.length - 1) * 100, v: l, e: n });
  });
  else for (o in i) s = e[o] || (e[o] = []), o === "ease" || s.push({ t: parseFloat(t), v: i[o], e: n });
}, tn = function(t, i, e, r, n) {
  return vt(t) ? t.call(i, e, r, n) : Gt(t) && ~t.indexOf("random(") ? pn(t) : t;
}, Na = ns + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", Ga = {};
_e(Na + ",id,stagger,delay,duration,paused,scrollTrigger", function(a17) {
  return Ga[a17] = 1;
});
var Ot = (function(a17) {
  la(t, a17);
  function t(e, r, n, o) {
    var s;
    typeof r == "number" && (n.duration = r, r = n, n = null), s = a17.call(this, o ? r : Ki(r)) || this;
    var l = s.vars, c = l.duration, d = l.delay, p = l.immediateRender, u = l.stagger, f = l.overwrite, x = l.keyframes, g = l.defaults, b = l.scrollTrigger, k = r.parent || mt, w = (re(e) || da(e) ? mr(e[0]) : "length" in r) ? [e] : Ne(e), m, _, C, S, v, y, T, M;
    if (s._targets = w.length ? os(w) : un("GSAP target " + e + " not found. https://gsap.com", !Oe.nullTargetWarn) || [], s._ptLookup = [], s._overwrite = f, x || u || Mn(c) || Mn(d)) {
      r = s.vars;
      var R = r.easeReverse || r.yoyoEase;
      if (m = s.timeline = new pe({ data: "nested", defaults: g || {}, targets: k && k.data === "nested" ? k.vars.targets : w }), m.kill(), m.parent = m._dp = ur(s), m._start = 0, u || Mn(c) || Mn(d)) {
        if (S = w.length, T = u && Ta(u), or(u)) for (v in u) ~Na.indexOf(v) && (M || (M = {}), M[v] = u[v]);
        for (_ = 0; _ < S; _++) C = qn(r, Ga), C.stagger = 0, R && (C.easeReverse = R), M && Ei(C, M), y = w[_], C.duration = +tn(c, ur(s), _, y, w), C.delay = (+tn(d, ur(s), _, y, w) || 0) - s._delay, !u && S === 1 && C.delay && (s._delay = d = C.delay, s._start += d, C.delay = 0), m.to(y, C, T ? T(_, y, w) : 0), m._ease = j.none;
        m.duration() ? c = d = 0 : s.timeline = 0;
      } else if (x) {
        Ki(Le(m.vars.defaults, { ease: "none" })), m._ease = ii(x.ease || r.ease || "none");
        var P = 0, E, L, D;
        if (re(x)) x.forEach(function(F) {
          return m.to(w, F, ">");
        }), m.duration();
        else {
          C = {};
          for (v in x) v === "ease" || v === "easeEach" || gc(v, x[v], C, x.easeEach);
          for (v in C) for (E = C[v].sort(function(F, $) {
            return F.t - $.t;
          }), P = 0, _ = 0; _ < E.length; _++) L = E[_], D = { ease: L.e, duration: (L.t - (_ ? E[_ - 1].t : 0)) / 100 * c }, D[v] = L.v, m.to(w, D, P), P += D.duration;
          m.duration() < c && m.to({}, { duration: c - m.duration() });
        }
      }
      c || s.duration(c = m.duration());
    } else s.timeline = 0;
    return f === true && !Ko && (Sr = ur(s), mt.killTweensOf(w), Sr = 0), er(k, ur(s), n), r.reversed && s.reverse(), r.paused && s.paused(true), (p || !c && !x && s._start === _t(k._time) && ge(p) && Ul(ur(s)) && k.data !== "nested") && (s._tTime = -ft, s.render(Math.max(0, -d) || 0)), b && Ca(ur(s), b), s;
  }
  var i = t.prototype;
  return i.render = function(r, n, o) {
    var s = this._time, l = this._tDur, c = this._dur, d = r < 0, p = r > l - ft && !d ? l : r < ft ? 0 : r, u, f, x, g, b, k, w, m;
    if (!c) Vl(this, r, n, o);
    else if (p !== this._tTime || !r || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== d || this._lazy) {
      if (u = p, m = this.timeline, this._repeat) {
        if (g = c + this._rDelay, this._repeat < -1 && d) return this.totalTime(g * 100 + r, n, o);
        if (u = _t(p % g), p === l ? (x = this._repeat, u = c) : (b = _t(p / g), x = ~~b, x && x === b ? (u = c, x--) : u > c && (u = c)), k = this._yoyo && x & 1, k && (u = c - u), b = Li(this._tTime, g), u === s && !o && this._initted && x === b) return this._tTime = p, this;
        x !== b && this.vars.repeatRefresh && !k && !this._lock && u !== g && this._initted && (this._lock = o = 1, this.render(_t(g * x), true).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (ka(this, d ? r : u, o, n, p)) return this._tTime = 0, this;
        if (s !== this._time && !(o && this.vars.repeatRefresh && x !== b)) return this;
        if (c !== this._dur) return this.render(r, n, o);
      }
      if (this._rEase) {
        var _ = u < s;
        if (_ !== this._inv) {
          var C = _ ? s : c - s;
          this._inv = _, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = s, this._invRecip = C ? (_ ? -1 : 1) / C : 0, this._invScale = _ ? -this.ratio : 1 - this.ratio, this._invEase = _ ? this._rEase : this._ease;
        }
        this.ratio = w = this._invRatio + this._invScale * this._invEase((u - this._invTime) * this._invRecip);
      } else this.ratio = w = this._ease(u / c);
      if (this._from && (this.ratio = w = 1 - w), this._tTime = p, this._time = u, !this._act && this._ts && (this._act = 1, this._lazy = 0), !s && p && !n && !b && (Ae(this, "onStart"), this._tTime !== p)) return this;
      for (f = this._pt; f; ) f.r(w, f.d), f = f._next;
      m && m.render(r < 0 ? r : m._dur * m._ease(u / this._dur), n, o) || this._startAt && (this._zTime = r), this._onUpdate && !n && (d && Oo(this, r, n, o), Ae(this, "onUpdate")), this._repeat && x !== b && this.vars.onRepeat && !n && this.parent && Ae(this, "onRepeat"), (p === this._tDur || !p) && this._tTime === p && (d && !this._onUpdate && Oo(this, r, true, true), (r || !c) && (p === this._tDur && this._ts > 0 || !p && this._ts < 0) && Dr(this, 1), !n && !(d && !s) && (p || s || k) && (Ae(this, p === l ? "onComplete" : "onReverseComplete", true), this._prom && !(p < l && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, i.targets = function() {
    return this._targets;
  }, i.invalidate = function(r) {
    return (!r || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(r), a17.prototype.invalidate.call(this, r);
  }, i.resetTo = function(r, n, o, s, l) {
    gn || Te.wake(), this._ts || this.play();
    var c = Math.min(this._dur, (this._dp._time - this._start) * this._ts), d;
    return this._initted || ls(this, c), d = this._ease(c / this._dur), hc(this, r, n, o, s, d, c, l) ? this.resetTo(r, n, o, s, 1) : (so(this, 0), this.parent || va(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, i.kill = function(r, n) {
    if (n === void 0 && (n = "all"), !r && (!n || n === "all")) return this._lazy = this._pt = 0, this.parent ? Ui(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Ut), this;
    if (this.timeline) {
      var o = this.timeline.totalDuration();
      return this.timeline.killTweensOf(r, n, Sr && Sr.vars.overwrite !== true)._first || Ui(this), this.parent && o !== this.timeline.totalDuration() && Di(this, this._dur * this.timeline._tDur / o, 0, 1), this;
    }
    var s = this._targets, l = r ? Ne(r) : s, c = this._ptLookup, d = this._pt, p, u, f, x, g, b, k;
    if ((!n || n === "all") && Wl(s, l)) return n === "all" && (this._pt = 0), Ui(this);
    for (p = this._op = this._op || [], n !== "all" && (Gt(n) && (g = {}, _e(n, function(w) {
      return g[w] = 1;
    }), n = g), n = pc(s, n)), k = s.length; k--; ) if (~l.indexOf(s[k])) {
      u = c[k], n === "all" ? (p[k] = n, x = u, f = {}) : (f = p[k] = p[k] || {}, x = n);
      for (g in x) b = u && u[g], b && ((!("kill" in b.d) || b.d.kill(g) === true) && no(this, b, "_pt"), delete u[g]), f !== "all" && (f[g] = 1);
    }
    return this._initted && !this._pt && d && Ui(this), this;
  }, t.to = function(r, n) {
    return new t(r, n, arguments[2]);
  }, t.from = function(r, n) {
    return ji(1, arguments);
  }, t.delayedCall = function(r, n, o, s) {
    return new t(n, 0, { immediateRender: false, lazy: false, overwrite: false, delay: r, onComplete: n, onReverseComplete: n, onCompleteParams: o, onReverseCompleteParams: o, callbackScope: s });
  }, t.fromTo = function(r, n, o) {
    return ji(2, arguments);
  }, t.set = function(r, n) {
    return n.duration = 0, n.repeatDelay || (n.repeat = 0), new t(r, n);
  }, t.killTweensOf = function(r, n, o) {
    return mt.killTweensOf(r, n, o);
  }, t;
})(_n);
Le(Ot.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 });
_e("staggerTo,staggerFrom,staggerFromTo", function(a17) {
  Ot[a17] = function() {
    var t = new pe(), i = Lo.call(arguments, 0);
    return i.splice(a17 === "staggerFromTo" ? 5 : 4, 0, 0), t[a17].apply(t, i);
  };
});
var cs = function(t, i, e) {
  return t[i] = e;
}, Ya = function(t, i, e) {
  return t[i](e);
}, _c = function(t, i, e, r) {
  return t[i](r.fp, e);
}, mc = function(t, i, e) {
  return t.setAttribute(i, e);
}, ds = function(t, i) {
  return vt(t[i]) ? Ya : jo(t[i]) && t.setAttribute ? mc : cs;
}, Wa = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e6) / 1e6, i);
}, yc = function(t, i) {
  return i.set(i.t, i.p, !!(i.s + i.c * t), i);
}, Xa = function(t, i) {
  var e = i._pt, r = "";
  if (!t && i.b) r = i.b;
  else if (t === 1 && i.e) r = i.e;
  else {
    for (; e; ) r = e.p + (e.m ? e.m(e.s + e.c * t) : Math.round((e.s + e.c * t) * 1e4) / 1e4) + r, e = e._next;
    r += i.c;
  }
  i.set(i.t, i.p, r, i);
}, fs = function(t, i) {
  for (var e = i._pt; e; ) e.r(t, e.d), e = e._next;
}, xc = function(t, i, e, r) {
  for (var n = this._pt, o; n; ) o = n._next, n.p === r && n.modifier(t, i, e), n = o;
}, bc = function(t) {
  for (var i = this._pt, e, r; i; ) r = i._next, i.p === t && !i.op || i.op === t ? no(this, i, "_pt") : i.dep || (e = 1), i = r;
  return !e;
}, vc = function(t, i, e, r) {
  r.mSet(t, i, r.m.call(r.tween, e, r.mt), r);
}, Ua = function(t) {
  for (var i = t._pt, e, r, n, o; i; ) {
    for (e = i._next, r = n; r && r.pr > i.pr; ) r = r._next;
    (i._prev = r ? r._prev : o) ? i._prev._next = i : n = i, (i._next = r) ? r._prev = i : o = i, i = e;
  }
  t._pt = n;
}, me = (function() {
  function a17(i, e, r, n, o, s, l, c, d) {
    this.t = e, this.s = n, this.c = o, this.p = r, this.r = s || Wa, this.d = l || this, this.set = c || cs, this.pr = d || 0, this._next = i, i && (i._prev = this);
  }
  var t = a17.prototype;
  return t.modifier = function(e, r, n) {
    this.mSet = this.mSet || this.set, this.set = vc, this.m = e, this.mt = n, this.tween = r;
  }, a17;
})();
_e(ns + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(a17) {
  return is[a17] = 1;
});
Ee.TweenMax = Ee.TweenLite = Ot;
Ee.TimelineLite = Ee.TimelineMax = pe;
mt = new pe({ sortChildren: false, defaults: fn, autoRemoveChildren: true, id: "root", smoothChildTiming: true });
Oe.stringFilter = $a;
var ni = [], Nn = {}, wc = [], Es = 0, Cc = 0, xo = function(t) {
  return (Nn[t] || wc).map(function(i) {
    return i();
  });
}, Bo = function() {
  var t = Date.now(), i = [];
  t - Es > 2 && (xo("matchMediaInit"), ni.forEach(function(e) {
    var r = e.queries, n = e.conditions, o, s, l, c;
    for (s in r) o = je.matchMedia(r[s]).matches, o && (l = 1), o !== n[s] && (n[s] = o, c = 1);
    c && (e.revert(), l && i.push(e));
  }), xo("matchMediaRevert"), i.forEach(function(e) {
    return e.onMatch(e, function(r) {
      return e.add(null, r);
    });
  }), Es = t, xo("matchMedia"));
}, Ha = (function() {
  function a17(i, e) {
    this.selector = e && Do(e), this.data = [], this._r = [], this.isReverted = false, this.id = Cc++, i && this.add(i);
  }
  var t = a17.prototype;
  return t.add = function(e, r, n) {
    vt(e) && (n = r, r = e, e = vt);
    var o = this, s = function() {
      var c = pt, d = o.selector, p;
      return c && c !== o && c.data.push(o), n && (o.selector = Do(n)), pt = o, p = r.apply(o, arguments), vt(p) && o._r.push(p), pt = c, o.selector = d, o.isReverted = false, p;
    };
    return o.last = s, e === vt ? s(o, function(l) {
      return o.add(null, l);
    }) : e ? o[e] = s : s;
  }, t.ignore = function(e) {
    var r = pt;
    pt = null, e(this), pt = r;
  }, t.getTweens = function() {
    var e = [];
    return this.data.forEach(function(r) {
      return r instanceof a17 ? e.push.apply(e, r.getTweens()) : r instanceof Ot && !(r.parent && r.parent.data === "nested") && e.push(r);
    }), e;
  }, t.clear = function() {
    this._r.length = this.data.length = 0;
  }, t.kill = function(e, r) {
    var n = this;
    if (e ? (function() {
      for (var s = n.getTweens(), l = n.data.length, c; l--; ) c = n.data[l], c.data === "isFlip" && (c.revert(), c.getChildren(true, true, false).forEach(function(d) {
        return s.splice(s.indexOf(d), 1);
      }));
      for (s.map(function(d) {
        return { g: d._dur || d._delay || d._sat && !d._sat.vars.immediateRender ? d.globalTime(0) : -1 / 0, t: d };
      }).sort(function(d, p) {
        return p.g - d.g || -1 / 0;
      }).forEach(function(d) {
        return d.t.revert(e);
      }), l = n.data.length; l--; ) c = n.data[l], c instanceof pe ? c.data !== "nested" && (c.scrollTrigger && c.scrollTrigger.revert(), c.kill()) : !(c instanceof Ot) && c.revert && c.revert(e);
      n._r.forEach(function(d) {
        return d(e, n);
      }), n.isReverted = true;
    })() : this.data.forEach(function(s) {
      return s.kill && s.kill();
    }), this.clear(), r) for (var o = ni.length; o--; ) ni[o].id === this.id && ni.splice(o, 1);
  }, t.revert = function(e) {
    this.kill(e || {});
  }, a17;
})(), kc = (function() {
  function a17(i) {
    this.contexts = [], this.scope = i, pt && pt.data.push(this);
  }
  var t = a17.prototype;
  return t.add = function(e, r, n) {
    or(e) || (e = { matches: e });
    var o = new Ha(0, n || this.scope), s = o.conditions = {}, l, c, d;
    pt && !o.selector && (o.selector = pt.selector), this.contexts.push(o), r = o.add("onMatch", r), o.queries = e;
    for (c in e) c === "all" ? d = 1 : (l = je.matchMedia(e[c]), l && (ni.indexOf(o) < 0 && ni.push(o), (s[c] = l.matches) && (d = 1), l.addListener ? l.addListener(Bo) : l.addEventListener("change", Bo)));
    return d && r(o, function(p) {
      return o.add(null, p);
    }), this;
  }, t.revert = function(e) {
    this.kill(e || {});
  }, t.kill = function(e) {
    this.contexts.forEach(function(r) {
      return r.kill(e, true);
    });
  }, a17;
})(), Zn = { registerPlugin: function() {
  for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++) i[e] = arguments[e];
  i.forEach(function(r) {
    return La(r);
  });
}, timeline: function(t) {
  return new pe(t);
}, getTweensOf: function(t, i) {
  return mt.getTweensOf(t, i);
}, getProperty: function(t, i, e, r) {
  Gt(t) && (t = Ne(t)[0]);
  var n = ei(t || {}).get, o = e ? ba : xa;
  return e === "native" && (e = ""), t && (i ? o((Me[i] && Me[i].get || n)(t, i, e, r)) : function(s, l, c) {
    return o((Me[s] && Me[s].get || n)(t, s, l, c));
  });
}, quickSetter: function(t, i, e) {
  if (t = Ne(t), t.length > 1) {
    var r = t.map(function(d) {
      return xe.quickSetter(d, i, e);
    }), n = r.length;
    return function(d) {
      for (var p = n; p--; ) r[p](d);
    };
  }
  t = t[0] || {};
  var o = Me[i], s = ei(t), l = s.harness && (s.harness.aliases || {})[i] || i, c = o ? function(d) {
    var p = new o();
    Ci._pt = 0, p.init(t, e ? d + e : d, Ci, 0, [t]), p.render(1, p), Ci._pt && fs(1, Ci);
  } : s.set(t, l);
  return o ? c : function(d) {
    return c(t, l, e ? d + e : d, s, 1);
  };
}, quickTo: function(t, i, e) {
  var r, n = xe.to(t, Le((r = {}, r[i] = "+=0.1", r.paused = true, r.stagger = 0, r), e || {})), o = function(l, c, d) {
    return n.resetTo(i, l, c, d);
  };
  return o.tween = n, o;
}, isTweening: function(t) {
  return mt.getTweensOf(t, true).length > 0;
}, defaults: function(t) {
  return t && t.ease && (t.ease = ii(t.ease, fn.ease)), Ts(fn, t || {});
}, config: function(t) {
  return Ts(Oe, t || {});
}, registerEffect: function(t) {
  var i = t.name, e = t.effect, r = t.plugins, n = t.defaults, o = t.extendTimeline;
  (r || "").split(",").forEach(function(s) {
    return s && !Me[s] && !Ee[s] && un(i + " effect requires " + s + " plugin.");
  }), go[i] = function(s, l, c) {
    return e(Ne(s), Le(l || {}, n), c);
  }, o && (pe.prototype[i] = function(s, l, c) {
    return this.add(go[i](s, or(l) ? l : (c = l) && {}, this), c);
  });
}, registerEase: function(t, i) {
  j[t] = ii(i);
}, parseEase: function(t, i) {
  return arguments.length ? ii(t, i) : j;
}, getById: function(t) {
  return mt.getById(t);
}, exportRoot: function(t, i) {
  t === void 0 && (t = {});
  var e = new pe(t), r, n;
  for (e.smoothChildTiming = ge(t.smoothChildTiming), mt.remove(e), e._dp = 0, e._time = e._tTime = mt._time, r = mt._first; r; ) n = r._next, (i || !(!r._dur && r instanceof Ot && r.vars.onComplete === r._targets[0])) && er(e, r, r._start - r._delay), r = n;
  return er(mt, e, 0), e;
}, context: function(t, i) {
  return t ? new Ha(t, i) : pt;
}, matchMedia: function(t) {
  return new kc(t);
}, matchMediaRefresh: function() {
  return ni.forEach(function(t) {
    var i = t.conditions, e, r;
    for (r in i) i[r] && (i[r] = false, e = 1);
    e && t.revert();
  }) || Bo();
}, addEventListener: function(t, i) {
  var e = Nn[t] || (Nn[t] = []);
  ~e.indexOf(i) || e.push(i);
}, removeEventListener: function(t, i) {
  var e = Nn[t], r = e && e.indexOf(i);
  r >= 0 && e.splice(r, 1);
}, utils: { wrap: ec, wrapYoyo: rc, distribute: Ta, random: Aa, snap: Pa, normalize: tc, getUnit: te, clamp: Ql, splitColor: Da, toArray: Ne, selector: Do, mapRange: Oa, pipe: Kl, unitize: jl, interpolate: ic, shuffle: Sa }, install: pa, effects: go, ticker: Te, updateRoot: pe.updateRoot, plugins: Me, globalTimeline: mt, core: { PropTween: me, globals: ga, Tween: Ot, Timeline: pe, Animation: _n, getCache: ei, _removeLinkedListItem: no, reverting: function() {
  return Ut;
}, context: function(t) {
  return t && pt && (pt.data.push(t), t._ctx = pt), pt;
}, suppressOverwrites: function(t) {
  return Ko = t;
} } };
_e("to,from,fromTo,delayedCall,set,killTweensOf", function(a17) {
  return Zn[a17] = Ot[a17];
});
Te.add(pe.updateRoot);
Ci = Zn.to({}, { duration: 0 });
var Mc = function(t, i) {
  for (var e = t._pt; e && e.p !== i && e.op !== i && e.fp !== i; ) e = e._next;
  return e;
}, Sc = function(t, i) {
  var e = t._targets, r, n, o;
  for (r in i) for (n = e.length; n--; ) o = t._ptLookup[n][r], o && (o = o.d) && (o._pt && (o = Mc(o, r)), o && o.modifier && o.modifier(i[r], t, e[n], r));
}, bo = function(t, i) {
  return { name: t, headless: 1, rawVars: 1, init: function(r, n, o) {
    o._onInit = function(s) {
      var l, c;
      if (Gt(n) && (l = {}, _e(n, function(d) {
        return l[d] = 1;
      }), n = l), i) {
        l = {};
        for (c in n) l[c] = i(n[c]);
        n = l;
      }
      Sc(s, n);
    };
  } };
}, xe = Zn.registerPlugin({ name: "attr", init: function(t, i, e, r, n) {
  var o, s, l;
  this.tween = e;
  for (o in i) l = t.getAttribute(o) || "", s = this.add(t, "setAttribute", (l || 0) + "", i[o], r, n, 0, 0, o), s.op = o, s.b = l, this._props.push(o);
}, render: function(t, i) {
  for (var e = i._pt; e; ) Ut ? e.set(e.t, e.p, e.b, e) : e.r(t, e.d), e = e._next;
} }, { name: "endArray", headless: 1, init: function(t, i) {
  for (var e = i.length; e--; ) this.add(t, e, t[e] || 0, i[e], 0, 0, 0, 0, 0, 1);
} }, bo("roundProps", Io), bo("modifiers"), bo("snap", Pa)) || Zn;
Ot.version = pe.version = xe.version = "3.15.0";
ha = 1;
ts() && Ii();
j.Power0;
j.Power1;
j.Power2;
j.Power3;
j.Power4;
j.Linear;
j.Quad;
j.Cubic;
j.Quart;
j.Quint;
j.Strong;
j.Elastic;
j.Back;
j.SteppedEase;
j.Bounce;
j.Sine;
j.Expo;
j.Circ;
/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Ls, Tr, Si, us, jr, Ds, hs, Tc = function() {
  return typeof window < "u";
}, yr = {}, qr = 180 / Math.PI, Ti = Math.PI / 180, _i = Math.atan2, Is = 1e8, ps = /([A-Z])/g, Pc = /(left|right|width|margin|padding|x)/i, Ac = /[\s,\(]\S/, rr = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" }, Fo = function(t, i) {
  return i.set(i.t, i.p, Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Rc = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u, i);
}, Oc = function(t, i) {
  return i.set(i.t, i.p, t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, Ec = function(t, i) {
  return i.set(i.t, i.p, t === 1 ? i.e : t ? Math.round((i.s + i.c * t) * 1e4) / 1e4 + i.u : i.b, i);
}, Lc = function(t, i) {
  var e = i.s + i.c * t;
  i.set(i.t, i.p, ~~(e + (e < 0 ? -0.5 : 0.5)) + i.u, i);
}, Va = function(t, i) {
  return i.set(i.t, i.p, t ? i.e : i.b, i);
}, Ja = function(t, i) {
  return i.set(i.t, i.p, t !== 1 ? i.b : i.e, i);
}, Dc = function(t, i, e) {
  return t.style[i] = e;
}, Ic = function(t, i, e) {
  return t.style.setProperty(i, e);
}, $c = function(t, i, e) {
  return t._gsap[i] = e;
}, Bc = function(t, i, e) {
  return t._gsap.scaleX = t._gsap.scaleY = e;
}, Fc = function(t, i, e, r, n) {
  var o = t._gsap;
  o.scaleX = o.scaleY = e, o.renderTransform(n, o);
}, zc = function(t, i, e, r, n) {
  var o = t._gsap;
  o[i] = e, o.renderTransform(n, o);
}, yt = "transform", ye = yt + "Origin", Nc = function a11(t, i) {
  var e = this, r = this.target, n = r.style, o = r._gsap;
  if (t in yr && n) {
    if (this.tfm = this.tfm || {}, t !== "transform") t = rr[t] || t, ~t.indexOf(",") ? t.split(",").forEach(function(s) {
      return e.tfm[s] = hr(r, s);
    }) : this.tfm[t] = o.x ? o[t] : hr(r, t), t === ye && (this.tfm.zOrigin = o.zOrigin);
    else return rr.transform.split(",").forEach(function(s) {
      return a11.call(e, s, i);
    });
    if (this.props.indexOf(yt) >= 0) return;
    o.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ye, i, "")), t = yt;
  }
  (n || i) && this.props.push(t, i, n[t]);
}, qa = function(t) {
  t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
}, Gc = function() {
  var t = this.props, i = this.target, e = i.style, r = i._gsap, n, o;
  for (n = 0; n < t.length; n += 3) t[n + 1] ? t[n + 1] === 2 ? i[t[n]](t[n + 2]) : i[t[n]] = t[n + 2] : t[n + 2] ? e[t[n]] = t[n + 2] : e.removeProperty(t[n].substr(0, 2) === "--" ? t[n] : t[n].replace(ps, "-$1").toLowerCase());
  if (this.tfm) {
    for (o in this.tfm) r[o] = this.tfm[o];
    r.svg && (r.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), n = hs(), (!n || !n.isStart) && !e[yt] && (qa(e), r.zOrigin && e[ye] && (e[ye] += " " + r.zOrigin + "px", r.zOrigin = 0, r.renderTransform()), r.uncache = 1);
  }
}, Qa = function(t, i) {
  var e = { target: t, props: [], revert: Gc, save: Nc };
  return t._gsap || xe.core.getCache(t), i && t.style && t.nodeType && i.split(",").forEach(function(r) {
    return e.save(r);
  }), e;
}, Za, zo = function(t, i) {
  var e = Tr.createElementNS ? Tr.createElementNS((i || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : Tr.createElement(t);
  return e && e.style ? e : Tr.createElement(t);
}, Re = function a12(t, i, e) {
  var r = getComputedStyle(t);
  return r[i] || r.getPropertyValue(i.replace(ps, "-$1").toLowerCase()) || r.getPropertyValue(i) || !e && a12(t, $i(i) || i, 1) || "";
}, $s = "O,Moz,ms,Ms,Webkit".split(","), $i = function(t, i, e) {
  var r = i || jr, n = r.style, o = 5;
  if (t in n && !e) return t;
  for (t = t.charAt(0).toUpperCase() + t.substr(1); o-- && !($s[o] + t in n); ) ;
  return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? $s[o] : "") + t;
}, No = function() {
  Tc() && window.document && (Ls = window, Tr = Ls.document, Si = Tr.documentElement, jr = zo("div") || { style: {} }, zo("div"), yt = $i(yt), ye = yt + "Origin", jr.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Za = !!$i("perspective"), hs = xe.core.reverting, us = 1);
}, Bs = function(t) {
  var i = t.ownerSVGElement, e = zo("svg", i && i.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), r = t.cloneNode(true), n;
  r.style.display = "block", e.appendChild(r), Si.appendChild(e);
  try {
    n = r.getBBox();
  } catch {
  }
  return e.removeChild(r), Si.removeChild(e), n;
}, Fs = function(t, i) {
  for (var e = i.length; e--; ) if (t.hasAttribute(i[e])) return t.getAttribute(i[e]);
}, Ka = function(t) {
  var i, e;
  try {
    i = t.getBBox();
  } catch {
    i = Bs(t), e = 1;
  }
  return i && (i.width || i.height) || e || (i = Bs(t)), i && !i.width && !i.x && !i.y ? { x: +Fs(t, ["x", "cx", "x1"]) || 0, y: +Fs(t, ["y", "cy", "y1"]) || 0, width: 0, height: 0 } : i;
}, ja = function(t) {
  return !!(t.getCTM && (!t.parentNode || t.ownerSVGElement) && Ka(t));
}, Ir = function(t, i) {
  if (i) {
    var e = t.style, r;
    i in yr && i !== ye && (i = yt), e.removeProperty ? (r = i.substr(0, 2), (r === "ms" || i.substr(0, 6) === "webkit") && (i = "-" + i), e.removeProperty(r === "--" ? i : i.replace(ps, "-$1").toLowerCase())) : e.removeAttribute(i);
  }
}, Pr = function(t, i, e, r, n, o) {
  var s = new me(t._pt, i, e, 0, 1, o ? Ja : Va);
  return t._pt = s, s.b = r, s.e = n, t._props.push(e), s;
}, zs = { deg: 1, rad: 1, turn: 1 }, Yc = { grid: 1, flex: 1 }, $r = function a13(t, i, e, r) {
  var n = parseFloat(e) || 0, o = (e + "").trim().substr((n + "").length) || "px", s = jr.style, l = Pc.test(i), c = t.tagName.toLowerCase() === "svg", d = (c ? "client" : "offset") + (l ? "Width" : "Height"), p = 100, u = r === "px", f = r === "%", x, g, b, k;
  if (r === o || !n || zs[r] || zs[o]) return n;
  if (o !== "px" && !u && (n = a13(t, i, e, "px")), k = t.getCTM && ja(t), (f || o === "%") && (yr[i] || ~i.indexOf("adius"))) return x = k ? t.getBBox()[l ? "width" : "height"] : t[d], Mt(f ? n / x * p : n / 100 * x);
  if (s[l ? "width" : "height"] = p + (u ? o : r), g = r !== "rem" && ~i.indexOf("adius") || r === "em" && t.appendChild && !c ? t : t.parentNode, k && (g = (t.ownerSVGElement || {}).parentNode), (!g || g === Tr || !g.appendChild) && (g = Tr.body), b = g._gsap, b && f && b.width && l && b.time === Te.time && !b.uncache) return Mt(n / b.width * p);
  if (f && (i === "height" || i === "width")) {
    var w = t.style[i];
    t.style[i] = p + r, x = t[d], w ? t.style[i] = w : Ir(t, i);
  } else (f || o === "%") && !Yc[Re(g, "display")] && (s.position = Re(t, "position")), g === t && (s.position = "static"), g.appendChild(jr), x = jr[d], g.removeChild(jr), s.position = "absolute";
  return l && f && (b = ei(g), b.time = Te.time, b.width = g[d]), Mt(u ? x * n / p : x && n ? p / x * n : 0);
}, hr = function(t, i, e, r) {
  var n;
  return us || No(), i in rr && i !== "transform" && (i = rr[i], ~i.indexOf(",") && (i = i.split(",")[0])), yr[i] && i !== "transform" ? (n = yn(t, r), n = i !== "transformOrigin" ? n[i] : n.svg ? n.origin : jn(Re(t, ye)) + " " + n.zOrigin + "px") : (n = t.style[i], (!n || n === "auto" || r || ~(n + "").indexOf("calc(")) && (n = Kn[i] && Kn[i](t, i, e) || Re(t, i) || ma(t, i) || (i === "opacity" ? 1 : 0))), e && !~(n + "").trim().indexOf(" ") ? $r(t, i, n, e) + e : n;
}, Wc = function(t, i, e, r) {
  if (!e || e === "none") {
    var n = $i(i, t, 1), o = n && Re(t, n, 1);
    o && o !== e ? (i = n, e = o) : i === "borderColor" && (e = Re(t, "borderTopColor"));
  }
  var s = new me(this._pt, t.style, i, 0, 1, Xa), l = 0, c = 0, d, p, u, f, x, g, b, k, w, m, _, C;
  if (s.b = e, s.e = r, e += "", r += "", r.substring(0, 6) === "var(--" && (r = Re(t, r.substring(4, r.indexOf(")")))), r === "auto" && (g = t.style[i], t.style[i] = r, r = Re(t, i) || r, g ? t.style[i] = g : Ir(t, i)), d = [e, r], $a(d), e = d[0], r = d[1], u = e.match(wi) || [], C = r.match(wi) || [], C.length) {
    for (; p = wi.exec(r); ) b = p[0], w = r.substring(l, p.index), x ? x = (x + 1) % 5 : (w.substr(-5) === "rgba(" || w.substr(-5) === "hsla(") && (x = 1), b !== (g = u[c++] || "") && (f = parseFloat(g) || 0, _ = g.substr((f + "").length), b.charAt(1) === "=" && (b = Mi(f, b) + _), k = parseFloat(b), m = b.substr((k + "").length), l = wi.lastIndex - m.length, m || (m = m || Oe.units[i] || _, l === r.length && (r += m, s.e += m)), _ !== m && (f = $r(t, i, g, m) || 0), s._pt = { _next: s._pt, p: w || c === 1 ? w : ",", s: f, c: k - f, m: x && x < 4 || i === "zIndex" ? Math.round : 0 });
    s.c = l < r.length ? r.substring(l, r.length) : "";
  } else s.r = i === "display" && r === "none" ? Ja : Va;
  return ua.test(r) && (s.e = 0), this._pt = s, s;
}, Ns = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" }, Xc = function(t) {
  var i = t.split(" "), e = i[0], r = i[1] || "50%";
  return (e === "top" || e === "bottom" || r === "left" || r === "right") && (t = e, e = r, r = t), i[0] = Ns[e] || e, i[1] = Ns[r] || r, i.join(" ");
}, Uc = function(t, i) {
  if (i.tween && i.tween._time === i.tween._dur) {
    var e = i.t, r = e.style, n = i.u, o = e._gsap, s, l, c;
    if (n === "all" || n === true) r.cssText = "", l = 1;
    else for (n = n.split(","), c = n.length; --c > -1; ) s = n[c], yr[s] && (l = 1, s = s === "transformOrigin" ? ye : yt), Ir(e, s);
    l && (Ir(e, yt), o && (o.svg && e.removeAttribute("transform"), r.scale = r.rotate = r.translate = "none", yn(e, 1), o.uncache = 1, qa(r)));
  }
}, Kn = { clearProps: function(t, i, e, r, n) {
  if (n.data !== "isFromStart") {
    var o = t._pt = new me(t._pt, i, e, 0, 0, Uc);
    return o.u = r, o.pr = -10, o.tween = n, t._props.push(e), 1;
  }
} }, mn = [1, 0, 0, 1, 0, 0], tl = {}, el = function(t) {
  return t === "matrix(1, 0, 0, 1, 0, 0)" || t === "none" || !t;
}, Gs = function(t) {
  var i = Re(t, yt);
  return el(i) ? mn : i.substr(7).match(fa).map(Mt);
}, gs = function(t, i) {
  var e = t._gsap || ei(t), r = t.style, n = Gs(t), o, s, l, c;
  return e.svg && t.getAttribute("transform") ? (l = t.transform.baseVal.consolidate().matrix, n = [l.a, l.b, l.c, l.d, l.e, l.f], n.join(",") === "1,0,0,1,0,0" ? mn : n) : (n === mn && !t.offsetParent && t !== Si && !e.svg && (l = r.display, r.display = "block", o = t.parentNode, (!o || !t.offsetParent && !t.getBoundingClientRect().width) && (c = 1, s = t.nextElementSibling, Si.appendChild(t)), n = Gs(t), l ? r.display = l : Ir(t, "display"), c && (s ? o.insertBefore(t, s) : o ? o.appendChild(t) : Si.removeChild(t))), i && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n);
}, Go = function(t, i, e, r, n, o) {
  var s = t._gsap, l = n || gs(t, true), c = s.xOrigin || 0, d = s.yOrigin || 0, p = s.xOffset || 0, u = s.yOffset || 0, f = l[0], x = l[1], g = l[2], b = l[3], k = l[4], w = l[5], m = i.split(" "), _ = parseFloat(m[0]) || 0, C = parseFloat(m[1]) || 0, S, v, y, T;
  e ? l !== mn && (v = f * b - x * g) && (y = _ * (b / v) + C * (-g / v) + (g * w - b * k) / v, T = _ * (-x / v) + C * (f / v) - (f * w - x * k) / v, _ = y, C = T) : (S = Ka(t), _ = S.x + (~m[0].indexOf("%") ? _ / 100 * S.width : _), C = S.y + (~(m[1] || m[0]).indexOf("%") ? C / 100 * S.height : C)), r || r !== false && s.smooth ? (k = _ - c, w = C - d, s.xOffset = p + (k * f + w * g) - k, s.yOffset = u + (k * x + w * b) - w) : s.xOffset = s.yOffset = 0, s.xOrigin = _, s.yOrigin = C, s.smooth = !!r, s.origin = i, s.originIsAbsolute = !!e, t.style[ye] = "0px 0px", o && (Pr(o, s, "xOrigin", c, _), Pr(o, s, "yOrigin", d, C), Pr(o, s, "xOffset", p, s.xOffset), Pr(o, s, "yOffset", u, s.yOffset)), t.setAttribute("data-svg-origin", _ + " " + C);
}, yn = function(t, i) {
  var e = t._gsap || new Fa(t);
  if ("x" in e && !i && !e.uncache) return e;
  var r = t.style, n = e.scaleX < 0, o = "px", s = "deg", l = getComputedStyle(t), c = Re(t, ye) || "0", d, p, u, f, x, g, b, k, w, m, _, C, S, v, y, T, M, R, P, E, L, D, F, $, G, tt, A, Z, Tt, Ht, lt, Et;
  return d = p = u = g = b = k = w = m = _ = 0, f = x = 1, e.svg = !!(t.getCTM && ja(t)), l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (r[yt] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[yt] !== "none" ? l[yt] : "")), r.scale = r.rotate = r.translate = "none"), v = gs(t, e.svg), e.svg && (e.uncache ? (G = t.getBBox(), c = e.xOrigin - G.x + "px " + (e.yOrigin - G.y) + "px", $ = "") : $ = !i && t.getAttribute("data-svg-origin"), Go(t, $ || c, !!$ || e.originIsAbsolute, e.smooth !== false, v)), C = e.xOrigin || 0, S = e.yOrigin || 0, v !== mn && (R = v[0], P = v[1], E = v[2], L = v[3], d = D = v[4], p = F = v[5], v.length === 6 ? (f = Math.sqrt(R * R + P * P), x = Math.sqrt(L * L + E * E), g = R || P ? _i(P, R) * qr : 0, w = E || L ? _i(E, L) * qr + g : 0, w && (x *= Math.abs(Math.cos(w * Ti))), e.svg && (d -= C - (C * R + S * E), p -= S - (C * P + S * L))) : (Et = v[6], Ht = v[7], A = v[8], Z = v[9], Tt = v[10], lt = v[11], d = v[12], p = v[13], u = v[14], y = _i(Et, Tt), b = y * qr, y && (T = Math.cos(-y), M = Math.sin(-y), $ = D * T + A * M, G = F * T + Z * M, tt = Et * T + Tt * M, A = D * -M + A * T, Z = F * -M + Z * T, Tt = Et * -M + Tt * T, lt = Ht * -M + lt * T, D = $, F = G, Et = tt), y = _i(-E, Tt), k = y * qr, y && (T = Math.cos(-y), M = Math.sin(-y), $ = R * T - A * M, G = P * T - Z * M, tt = E * T - Tt * M, lt = L * M + lt * T, R = $, P = G, E = tt), y = _i(P, R), g = y * qr, y && (T = Math.cos(y), M = Math.sin(y), $ = R * T + P * M, G = D * T + F * M, P = P * T - R * M, F = F * T - D * M, R = $, D = G), b && Math.abs(b) + Math.abs(g) > 359.9 && (b = g = 0, k = 180 - k), f = Mt(Math.sqrt(R * R + P * P + E * E)), x = Mt(Math.sqrt(F * F + Et * Et)), y = _i(D, F), w = Math.abs(y) > 2e-4 ? y * qr : 0, _ = lt ? 1 / (lt < 0 ? -lt : lt) : 0), e.svg && ($ = t.getAttribute("transform"), e.forceCSS = t.setAttribute("transform", "") || !el(Re(t, yt)), $ && t.setAttribute("transform", $))), Math.abs(w) > 90 && Math.abs(w) < 270 && (n ? (f *= -1, w += g <= 0 ? 180 : -180, g += g <= 0 ? 180 : -180) : (x *= -1, w += w <= 0 ? 180 : -180)), i = i || e.uncache, e.x = d - ((e.xPercent = d && (!i && e.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-d) ? -50 : 0))) ? t.offsetWidth * e.xPercent / 100 : 0) + o, e.y = p - ((e.yPercent = p && (!i && e.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-p) ? -50 : 0))) ? t.offsetHeight * e.yPercent / 100 : 0) + o, e.z = u + o, e.scaleX = Mt(f), e.scaleY = Mt(x), e.rotation = Mt(g) + s, e.rotationX = Mt(b) + s, e.rotationY = Mt(k) + s, e.skewX = w + s, e.skewY = m + s, e.transformPerspective = _ + o, (e.zOrigin = parseFloat(c.split(" ")[2]) || !i && e.zOrigin || 0) && (r[ye] = jn(c)), e.xOffset = e.yOffset = 0, e.force3D = Oe.force3D, e.renderTransform = e.svg ? Vc : Za ? rl : Hc, e.uncache = 0, e;
}, jn = function(t) {
  return (t = t.split(" "))[0] + " " + t[1];
}, vo = function(t, i, e) {
  var r = te(i);
  return Mt(parseFloat(i) + parseFloat($r(t, "x", e + "px", r))) + r;
}, Hc = function(t, i) {
  i.z = "0px", i.rotationY = i.rotationX = "0deg", i.force3D = 0, rl(t, i);
}, Vr = "0deg", Yi = "0px", Jr = ") ", rl = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, s = e.y, l = e.z, c = e.rotation, d = e.rotationY, p = e.rotationX, u = e.skewX, f = e.skewY, x = e.scaleX, g = e.scaleY, b = e.transformPerspective, k = e.force3D, w = e.target, m = e.zOrigin, _ = "", C = k === "auto" && t && t !== 1 || k === true;
  if (m && (p !== Vr || d !== Vr)) {
    var S = parseFloat(d) * Ti, v = Math.sin(S), y = Math.cos(S), T;
    S = parseFloat(p) * Ti, T = Math.cos(S), o = vo(w, o, v * T * -m), s = vo(w, s, -Math.sin(S) * -m), l = vo(w, l, y * T * -m + m);
  }
  b !== Yi && (_ += "perspective(" + b + Jr), (r || n) && (_ += "translate(" + r + "%, " + n + "%) "), (C || o !== Yi || s !== Yi || l !== Yi) && (_ += l !== Yi || C ? "translate3d(" + o + ", " + s + ", " + l + ") " : "translate(" + o + ", " + s + Jr), c !== Vr && (_ += "rotate(" + c + Jr), d !== Vr && (_ += "rotateY(" + d + Jr), p !== Vr && (_ += "rotateX(" + p + Jr), (u !== Vr || f !== Vr) && (_ += "skew(" + u + ", " + f + Jr), (x !== 1 || g !== 1) && (_ += "scale(" + x + ", " + g + Jr), w.style[yt] = _ || "translate(0, 0)";
}, Vc = function(t, i) {
  var e = i || this, r = e.xPercent, n = e.yPercent, o = e.x, s = e.y, l = e.rotation, c = e.skewX, d = e.skewY, p = e.scaleX, u = e.scaleY, f = e.target, x = e.xOrigin, g = e.yOrigin, b = e.xOffset, k = e.yOffset, w = e.forceCSS, m = parseFloat(o), _ = parseFloat(s), C, S, v, y, T;
  l = parseFloat(l), c = parseFloat(c), d = parseFloat(d), d && (d = parseFloat(d), c += d, l += d), l || c ? (l *= Ti, c *= Ti, C = Math.cos(l) * p, S = Math.sin(l) * p, v = Math.sin(l - c) * -u, y = Math.cos(l - c) * u, c && (d *= Ti, T = Math.tan(c - d), T = Math.sqrt(1 + T * T), v *= T, y *= T, d && (T = Math.tan(d), T = Math.sqrt(1 + T * T), C *= T, S *= T)), C = Mt(C), S = Mt(S), v = Mt(v), y = Mt(y)) : (C = p, y = u, S = v = 0), (m && !~(o + "").indexOf("px") || _ && !~(s + "").indexOf("px")) && (m = $r(f, "x", o, "px"), _ = $r(f, "y", s, "px")), (x || g || b || k) && (m = Mt(m + x - (x * C + g * v) + b), _ = Mt(_ + g - (x * S + g * y) + k)), (r || n) && (T = f.getBBox(), m = Mt(m + r / 100 * T.width), _ = Mt(_ + n / 100 * T.height)), T = "matrix(" + C + "," + S + "," + v + "," + y + "," + m + "," + _ + ")", f.setAttribute("transform", T), w && (f.style[yt] = T);
}, Jc = function(t, i, e, r, n) {
  var o = 360, s = Gt(n), l = parseFloat(n) * (s && ~n.indexOf("rad") ? qr : 1), c = l - r, d = r + c + "deg", p, u;
  return s && (p = n.split("_")[1], p === "short" && (c %= o, c !== c % (o / 2) && (c += c < 0 ? o : -o)), p === "cw" && c < 0 ? c = (c + o * Is) % o - ~~(c / o) * o : p === "ccw" && c > 0 && (c = (c - o * Is) % o - ~~(c / o) * o)), t._pt = u = new me(t._pt, i, e, r, c, Rc), u.e = d, u.u = "deg", t._props.push(e), u;
}, Ys = function(t, i) {
  for (var e in i) t[e] = i[e];
  return t;
}, qc = function(t, i, e) {
  var r = Ys({}, e._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = e.style, s, l, c, d, p, u, f, x;
  r.svg ? (c = e.getAttribute("transform"), e.setAttribute("transform", ""), o[yt] = i, s = yn(e, 1), Ir(e, yt), e.setAttribute("transform", c)) : (c = getComputedStyle(e)[yt], o[yt] = i, s = yn(e, 1), o[yt] = c);
  for (l in yr) c = r[l], d = s[l], c !== d && n.indexOf(l) < 0 && (f = te(c), x = te(d), p = f !== x ? $r(e, l, c, x) : parseFloat(c), u = parseFloat(d), t._pt = new me(t._pt, s, l, p, u - p, Fo), t._pt.u = x || 0, t._props.push(l));
  Ys(s, r);
};
_e("padding,margin,Width,Radius", function(a17, t) {
  var i = "Top", e = "Right", r = "Bottom", n = "Left", o = (t < 3 ? [i, e, r, n] : [i + n, i + e, r + e, r + n]).map(function(s) {
    return t < 2 ? a17 + s : "border" + s + a17;
  });
  Kn[t > 1 ? "border" + a17 : a17] = function(s, l, c, d, p) {
    var u, f;
    if (arguments.length < 4) return u = o.map(function(x) {
      return hr(s, x, c);
    }), f = u.join(" "), f.split(u[0]).length === 5 ? u[0] : f;
    u = (d + "").split(" "), f = {}, o.forEach(function(x, g) {
      return f[x] = u[g] = u[g] || u[(g - 1) / 2 | 0];
    }), s.init(l, f, p);
  };
});
var il = { name: "css", register: No, targetTest: function(t) {
  return t.style && t.nodeType;
}, init: function(t, i, e, r, n) {
  var o = this._props, s = t.style, l = e.vars.startAt, c, d, p, u, f, x, g, b, k, w, m, _, C, S, v, y, T;
  us || No(), this.styles = this.styles || Qa(t), y = this.styles.props, this.tween = e;
  for (g in i) if (g !== "autoRound" && (d = i[g], !(Me[g] && za(g, i, e, r, t, n)))) {
    if (f = typeof d, x = Kn[g], f === "function" && (d = d.call(e, r, t, n), f = typeof d), f === "string" && ~d.indexOf("random(") && (d = pn(d)), x) x(this, t, g, d, e) && (v = 1);
    else if (g.substr(0, 2) === "--") c = (getComputedStyle(t).getPropertyValue(g) + "").trim(), d += "", Er.lastIndex = 0, Er.test(c) || (b = te(c), k = te(d), k ? b !== k && (c = $r(t, g, c, k) + k) : b && (d += b)), this.add(s, "setProperty", c, d, r, n, 0, 0, g), o.push(g), y.push(g, 0, s[g]);
    else if (f !== "undefined") {
      if (l && g in l ? (c = typeof l[g] == "function" ? l[g].call(e, r, t, n) : l[g], Gt(c) && ~c.indexOf("random(") && (c = pn(c)), te(c + "") || c === "auto" || (c += Oe.units[g] || te(hr(t, g)) || ""), (c + "").charAt(1) === "=" && (c = hr(t, g))) : c = hr(t, g), u = parseFloat(c), w = f === "string" && d.charAt(1) === "=" && d.substr(0, 2), w && (d = d.substr(2)), p = parseFloat(d), g in rr && (g === "autoAlpha" && (u === 1 && hr(t, "visibility") === "hidden" && p && (u = 0), y.push("visibility", 0, s.visibility), Pr(this, s, "visibility", u ? "inherit" : "hidden", p ? "inherit" : "hidden", !p)), g !== "scale" && g !== "transform" && (g = rr[g], ~g.indexOf(",") && (g = g.split(",")[0]))), m = g in yr, m) {
        if (this.styles.save(g), T = d, f === "string" && d.substring(0, 6) === "var(--") {
          if (d = Re(t, d.substring(4, d.indexOf(")"))), d.substring(0, 5) === "calc(") {
            var M = t.style.perspective;
            t.style.perspective = d, d = Re(t, "perspective"), M ? t.style.perspective = M : Ir(t, "perspective");
          }
          p = parseFloat(d);
        }
        if (_ || (C = t._gsap, C.renderTransform && !i.parseTransform || yn(t, i.parseTransform), S = i.smoothOrigin !== false && C.smooth, _ = this._pt = new me(this._pt, s, yt, 0, 1, C.renderTransform, C, 0, -1), _.dep = 1), g === "scale") this._pt = new me(this._pt, C, "scaleY", C.scaleY, (w ? Mi(C.scaleY, w + p) : p) - C.scaleY || 0, Fo), this._pt.u = 0, o.push("scaleY", g), g += "X";
        else if (g === "transformOrigin") {
          y.push(ye, 0, s[ye]), d = Xc(d), C.svg ? Go(t, d, 0, S, 0, this) : (k = parseFloat(d.split(" ")[2]) || 0, k !== C.zOrigin && Pr(this, C, "zOrigin", C.zOrigin, k), Pr(this, s, g, jn(c), jn(d)));
          continue;
        } else if (g === "svgOrigin") {
          Go(t, d, 1, S, 0, this);
          continue;
        } else if (g in tl) {
          Jc(this, C, g, u, w ? Mi(u, w + d) : d);
          continue;
        } else if (g === "smoothOrigin") {
          Pr(this, C, "smooth", C.smooth, d);
          continue;
        } else if (g === "force3D") {
          C[g] = d;
          continue;
        } else if (g === "transform") {
          qc(this, d, t);
          continue;
        }
      } else g in s || (g = $i(g) || g);
      if (m || (p || p === 0) && (u || u === 0) && !Ac.test(d) && g in s) b = (c + "").substr((u + "").length), p || (p = 0), k = te(d) || (g in Oe.units ? Oe.units[g] : b), b !== k && (u = $r(t, g, c, k)), this._pt = new me(this._pt, m ? C : s, g, u, (w ? Mi(u, w + p) : p) - u, !m && (k === "px" || g === "zIndex") && i.autoRound !== false ? Lc : Fo), this._pt.u = k || 0, m && T !== d ? (this._pt.b = c, this._pt.e = T, this._pt.r = Ec) : b !== k && k !== "%" && (this._pt.b = c, this._pt.r = Oc);
      else if (g in s) Wc.call(this, t, g, c, w ? w + d : d);
      else if (g in t) this.add(t, g, c || t[g], w ? w + d : d, r, n);
      else if (g !== "parseTransform") {
        rs(g, d);
        continue;
      }
      m || (g in s ? y.push(g, 0, s[g]) : typeof t[g] == "function" ? y.push(g, 2, t[g]()) : y.push(g, 1, c || t[g])), o.push(g);
    }
  }
  v && Ua(this);
}, render: function(t, i) {
  if (i.tween._time || !hs()) for (var e = i._pt; e; ) e.r(t, e.d), e = e._next;
  else i.styles.revert();
}, get: hr, aliases: rr, getSetter: function(t, i, e) {
  var r = rr[i];
  return r && r.indexOf(",") < 0 && (i = r), i in yr && i !== ye && (t._gsap.x || hr(t, "x")) ? e && Ds === e ? i === "scale" ? Bc : $c : (Ds = e || {}) && (i === "scale" ? Fc : zc) : t.style && !jo(t.style[i]) ? Dc : ~i.indexOf("-") ? Ic : ds(t, i);
}, core: { _removeProperty: Ir, _getMatrix: gs } };
xe.utils.checkPrefix = $i;
xe.core.getStyleSaver = Qa;
(function(a17, t, i, e) {
  var r = _e(a17 + "," + t + "," + i, function(n) {
    yr[n] = 1;
  });
  _e(t, function(n) {
    Oe.units[n] = "deg", tl[n] = 1;
  }), rr[r[13]] = a17 + "," + t, _e(e, function(n) {
    var o = n.split(":");
    rr[o[1]] = r[o[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_e("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(a17) {
  Oe.units[a17] = "px";
});
xe.registerPlugin(il);
var nt = xe.registerPlugin(il) || xe;
nt.core.Tween;
function Qc(a17, t) {
  for (var i = 0; i < t.length; i++) {
    var e = t[i];
    e.enumerable = e.enumerable || false, e.configurable = true, "value" in e && (e.writable = true), Object.defineProperty(a17, e.key, e);
  }
}
function Zc(a17, t, i) {
  return t && Qc(a17.prototype, t), a17;
}
/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Xt, Gn, Pe, Ar, Rr, Pi, nl, Qr, Ai, ol, gr, Je, sl, al = function() {
  return Xt || typeof window < "u" && (Xt = window.gsap) && Xt.registerPlugin && Xt;
}, ll = 1, ki = [], q = [], nr = [], en = Date.now, Yo = function(t, i) {
  return i;
}, Kc = function() {
  var t = Ai.core, i = t.bridge || {}, e = t._scrollers, r = t._proxies;
  e.push.apply(e, q), r.push.apply(r, nr), q = e, nr = r, Yo = function(o, s) {
    return i[o](s);
  };
}, Lr = function(t, i) {
  return ~nr.indexOf(t) && nr[nr.indexOf(t) + 1][i];
}, rn = function(t) {
  return !!~ol.indexOf(t);
}, ae = function(t, i, e, r, n) {
  return t.addEventListener(i, e, { passive: r !== false, capture: !!n });
}, se = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, Sn = "scrollLeft", Tn = "scrollTop", Wo = function() {
  return gr && gr.isPressed || q.cache++;
}, to = function(t, i) {
  var e = function r(n) {
    if (n || n === 0) {
      ll && (Pe.history.scrollRestoration = "manual");
      var o = gr && gr.isPressed;
      n = r.v = Math.round(n) || (gr && gr.iOS ? 1 : 0), t(n), r.cacheID = q.cache, o && Yo("ss", n);
    } else (i || q.cache !== r.cacheID || Yo("ref")) && (r.cacheID = q.cache, r.v = t());
    return r.v + r.offset;
  };
  return e.offset = 0, t && e;
}, fe = { s: Sn, p: "left", p2: "Left", os: "right", os2: "Right", d: "width", d2: "Width", a: "x", sc: to(function(a17) {
  return arguments.length ? Pe.scrollTo(a17, It.sc()) : Pe.pageXOffset || Ar[Sn] || Rr[Sn] || Pi[Sn] || 0;
}) }, It = { s: Tn, p: "top", p2: "Top", os: "bottom", os2: "Bottom", d: "height", d2: "Height", a: "y", op: fe, sc: to(function(a17) {
  return arguments.length ? Pe.scrollTo(fe.sc(), a17) : Pe.pageYOffset || Ar[Tn] || Rr[Tn] || Pi[Tn] || 0;
}) }, he = function(t, i) {
  return (i && i._ctx && i._ctx.selector || Xt.utils.toArray)(t)[0] || (typeof t == "string" && Xt.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
}, jc = function(t, i) {
  for (var e = i.length; e--; ) if (i[e] === t || i[e].contains(t)) return true;
  return false;
}, Br = function(t, i) {
  var e = i.s, r = i.sc;
  rn(t) && (t = Ar.scrollingElement || Rr);
  var n = q.indexOf(t), o = r === It.sc ? 1 : 2;
  !~n && (n = q.push(t) - 1), q[n + o] || ae(t, "scroll", Wo);
  var s = q[n + o], l = s || (q[n + o] = to(Lr(t, e), true) || (rn(t) ? r : to(function(c) {
    return arguments.length ? t[e] = c : t[e];
  })));
  return l.target = t, s || (l.smooth = Xt.getProperty(t, "scrollBehavior") === "smooth"), l;
}, Xo = function(t, i, e) {
  var r = t, n = t, o = en(), s = o, l = i || 50, c = Math.max(500, l * 3), d = function(x, g) {
    var b = en();
    g || b - o > l ? (n = r, r = x, s = o, o = b) : e ? r += x : r = n + (x - n) / (b - s) * (o - s);
  }, p = function() {
    n = r = e ? 0 : r, s = o = 0;
  }, u = function(x) {
    var g = s, b = n, k = en();
    return (x || x === 0) && x !== r && d(x), o === s || k - s > c ? 0 : (r + (e ? b : -b)) / ((e ? k : o) - g) * 1e3;
  };
  return { update: d, reset: p, getVelocity: u };
}, Wi = function(t, i) {
  return i && !t._gsapAllow && t.cancelable !== false && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Ws = function(t) {
  var i = Math.max.apply(Math, t), e = Math.min.apply(Math, t);
  return Math.abs(i) >= Math.abs(e) ? i : e;
}, cl = function() {
  Ai = Xt.core.globals().ScrollTrigger, Ai && Ai.core && Kc();
}, dl = function(t) {
  return Xt = t || al(), !Gn && Xt && typeof document < "u" && document.body && (Pe = window, Ar = document, Rr = Ar.documentElement, Pi = Ar.body, ol = [Pe, Ar, Rr, Pi], Xt.utils.clamp, sl = Xt.core.context || function() {
  }, Qr = "onpointerenter" in Pi ? "pointer" : "mouse", nl = St.isTouch = Pe.matchMedia && Pe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in Pe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Je = St.eventTypes = ("ontouchstart" in Rr ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Rr ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return ll = 0;
  }, 500), Gn = 1), Ai || cl(), Gn;
};
fe.op = It;
q.cache = 0;
var St = (function() {
  function a17(i) {
    this.init(i);
  }
  var t = a17.prototype;
  return t.init = function(e) {
    Gn || dl(Xt) || console.warn("Please gsap.registerPlugin(Observer)"), Ai || cl();
    var r = e.tolerance, n = e.dragMinimum, o = e.type, s = e.target, l = e.lineHeight, c = e.debounce, d = e.preventDefault, p = e.onStop, u = e.onStopDelay, f = e.ignore, x = e.wheelSpeed, g = e.event, b = e.onDragStart, k = e.onDragEnd, w = e.onDrag, m = e.onPress, _ = e.onRelease, C = e.onRight, S = e.onLeft, v = e.onUp, y = e.onDown, T = e.onChangeX, M = e.onChangeY, R = e.onChange, P = e.onToggleX, E = e.onToggleY, L = e.onHover, D = e.onHoverEnd, F = e.onMove, $ = e.ignoreCheck, G = e.isNormalizer, tt = e.onGestureStart, A = e.onGestureEnd, Z = e.onWheel, Tt = e.onEnable, Ht = e.onDisable, lt = e.onClick, Et = e.scrollSpeed, Vt = e.capture, Pt = e.allowClicks, ie = e.lockAxis, Jt = e.onLockAxis;
    this.target = s = he(s) || Rr, this.vars = e, f && (f = Xt.utils.toArray(f)), r = r || 1e-9, n = n || 0, x = x || 1, Et = Et || 1, o = o || "wheel,touch,pointer", c = c !== false, l || (l = parseFloat(Pe.getComputedStyle(Pi).lineHeight) || 22);
    var xr, ne, oe, et, wt, ue, be, O = this, ve = 0, ar = 0, br = e.passive || !d && e.passive !== false, xt = Br(s, fe), lr = Br(s, It), vr = xt(), Yr = lr(), $t = ~o.indexOf("touch") && !~o.indexOf("pointer") && Je[0] === "pointerdown", wr = rn(s), Ct = s.ownerDocument || Ar, We = [0, 0, 0], De = [0, 0, 0], cr = 0, Fi = function() {
      return cr = en();
    }, At = function(N, it) {
      return (O.event = N) && f && jc(N.target, f) || it && $t && N.pointerType !== "touch" || $ && $(N, it);
    }, wn = function() {
      O._vx.reset(), O._vy.reset(), ne.pause(), p && p(O);
    }, dr = function() {
      var N = O.deltaX = Ws(We), it = O.deltaY = Ws(De), I = Math.abs(N) >= r, Y = Math.abs(it) >= r;
      R && (I || Y) && R(O, N, it, We, De), I && (C && O.deltaX > 0 && C(O), S && O.deltaX < 0 && S(O), T && T(O), P && O.deltaX < 0 != ve < 0 && P(O), ve = O.deltaX, We[0] = We[1] = We[2] = 0), Y && (y && O.deltaY > 0 && y(O), v && O.deltaY < 0 && v(O), M && M(O), E && O.deltaY < 0 != ar < 0 && E(O), ar = O.deltaY, De[0] = De[1] = De[2] = 0), (et || oe) && (F && F(O), oe && (b && oe === 1 && b(O), w && w(O), oe = 0), et = false), ue && !(ue = false) && Jt && Jt(O), wt && (Z(O), wt = false), xr = 0;
    }, hi = function(N, it, I) {
      We[I] += N, De[I] += it, O._vx.update(N), O._vy.update(it), c ? xr || (xr = requestAnimationFrame(dr)) : dr();
    }, pi = function(N, it) {
      ie && !be && (O.axis = be = Math.abs(N) > Math.abs(it) ? "x" : "y", ue = true), be !== "y" && (We[2] += N, O._vx.update(N, true)), be !== "x" && (De[2] += it, O._vy.update(it, true)), c ? xr || (xr = requestAnimationFrame(dr)) : dr();
    }, Cr = function(N) {
      if (!At(N, 1)) {
        N = Wi(N, d);
        var it = N.clientX, I = N.clientY, Y = it - O.x, z = I - O.y, W = O.isDragging;
        O.x = it, O.y = I, (W || (Y || z) && (Math.abs(O.startX - it) >= n || Math.abs(O.startY - I) >= n)) && (oe || (oe = W ? 2 : 1), W || (O.isDragging = true), pi(Y, z));
      }
    }, Wr = O.onPress = function(X) {
      At(X, 1) || X && X.button || (O.axis = be = null, ne.pause(), O.isPressed = true, X = Wi(X), ve = ar = 0, O.startX = O.x = X.clientX, O.startY = O.y = X.clientY, O._vx.reset(), O._vy.reset(), ae(G ? s : Ct, Je[1], Cr, br, true), O.deltaX = O.deltaY = 0, m && m(O));
    }, Q = O.onRelease = function(X) {
      if (!At(X, 1)) {
        se(G ? s : Ct, Je[1], Cr, true);
        var N = !isNaN(O.y - O.startY), it = O.isDragging, I = it && (Math.abs(O.x - O.startX) > 3 || Math.abs(O.y - O.startY) > 3), Y = Wi(X);
        !I && N && (O._vx.reset(), O._vy.reset(), d && Pt && Xt.delayedCall(0.08, function() {
          if (en() - cr > 300 && !X.defaultPrevented) {
            if (X.target.click) X.target.click();
            else if (Ct.createEvent) {
              var z = Ct.createEvent("MouseEvents");
              z.initMouseEvent("click", true, true, Pe, 1, Y.screenX, Y.screenY, Y.clientX, Y.clientY, false, false, false, false, 0, null), X.target.dispatchEvent(z);
            }
          }
        })), O.isDragging = O.isGesturing = O.isPressed = false, p && it && !G && ne.restart(true), oe && dr(), k && it && k(O), _ && _(O, I);
      }
    }, Xr = function(N) {
      return N.touches && N.touches.length > 1 && (O.isGesturing = true) && tt(N, O.isDragging);
    }, Xe = function() {
      return (O.isGesturing = false) || A(O);
    }, Ue = function(N) {
      if (!At(N)) {
        var it = xt(), I = lr();
        hi((it - vr) * Et, (I - Yr) * Et, 1), vr = it, Yr = I, p && ne.restart(true);
      }
    }, He = function(N) {
      if (!At(N)) {
        N = Wi(N, d), Z && (wt = true);
        var it = (N.deltaMode === 1 ? l : N.deltaMode === 2 ? Pe.innerHeight : 1) * x;
        hi(N.deltaX * it, N.deltaY * it, 0), p && !G && ne.restart(true);
      }
    }, Ur = function(N) {
      if (!At(N)) {
        var it = N.clientX, I = N.clientY, Y = it - O.x, z = I - O.y;
        O.x = it, O.y = I, et = true, p && ne.restart(true), (Y || z) && pi(Y, z);
      }
    }, gi = function(N) {
      O.event = N, L(O);
    }, fr = function(N) {
      O.event = N, D(O);
    }, zi = function(N) {
      return At(N) || Wi(N, d) && lt(O);
    };
    ne = O._dc = Xt.delayedCall(u || 0.25, wn).pause(), O.deltaX = O.deltaY = 0, O._vx = Xo(0, 50, true), O._vy = Xo(0, 50, true), O.scrollX = xt, O.scrollY = lr, O.isDragging = O.isGesturing = O.isPressed = false, sl(this), O.enable = function(X) {
      return O.isEnabled || (ae(wr ? Ct : s, "scroll", Wo), o.indexOf("scroll") >= 0 && ae(wr ? Ct : s, "scroll", Ue, br, Vt), o.indexOf("wheel") >= 0 && ae(s, "wheel", He, br, Vt), (o.indexOf("touch") >= 0 && nl || o.indexOf("pointer") >= 0) && (ae(s, Je[0], Wr, br, Vt), ae(Ct, Je[2], Q), ae(Ct, Je[3], Q), Pt && ae(s, "click", Fi, true, true), lt && ae(s, "click", zi), tt && ae(Ct, "gesturestart", Xr), A && ae(Ct, "gestureend", Xe), L && ae(s, Qr + "enter", gi), D && ae(s, Qr + "leave", fr), F && ae(s, Qr + "move", Ur)), O.isEnabled = true, O.isDragging = O.isGesturing = O.isPressed = et = oe = false, O._vx.reset(), O._vy.reset(), vr = xt(), Yr = lr(), X && X.type && Wr(X), Tt && Tt(O)), O;
    }, O.disable = function() {
      O.isEnabled && (ki.filter(function(X) {
        return X !== O && rn(X.target);
      }).length || se(wr ? Ct : s, "scroll", Wo), O.isPressed && (O._vx.reset(), O._vy.reset(), se(G ? s : Ct, Je[1], Cr, true)), se(wr ? Ct : s, "scroll", Ue, Vt), se(s, "wheel", He, Vt), se(s, Je[0], Wr, Vt), se(Ct, Je[2], Q), se(Ct, Je[3], Q), se(s, "click", Fi, true), se(s, "click", zi), se(Ct, "gesturestart", Xr), se(Ct, "gestureend", Xe), se(s, Qr + "enter", gi), se(s, Qr + "leave", fr), se(s, Qr + "move", Ur), O.isEnabled = O.isPressed = O.isDragging = false, Ht && Ht(O));
    }, O.kill = O.revert = function() {
      O.disable();
      var X = ki.indexOf(O);
      X >= 0 && ki.splice(X, 1), gr === O && (gr = 0);
    }, ki.push(O), G && rn(s) && (gr = O), O.enable(g);
  }, Zc(a17, [{ key: "velocityX", get: function() {
    return this._vx.getVelocity();
  } }, { key: "velocityY", get: function() {
    return this._vy.getVelocity();
  } }]), a17;
})();
St.version = "3.15.0";
St.create = function(a17) {
  return new St(a17);
};
St.register = dl;
St.getAll = function() {
  return ki.slice();
};
St.getById = function(a17) {
  return ki.filter(function(t) {
    return t.vars.id === a17;
  })[0];
};
al() && Xt.registerPlugin(St);
/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var B, bi, J, st, Se, ot, _s, eo, xn, nn, Vi, Pn, Kt, ao, Uo, ce, Xs, Us, vi, fl, wo, ul, le, Ho, hl, pl, Mr, Vo, ms, Ri, ys, on, Jo, Co, An = 1, jt = Date.now, ko = jt(), Ge = 0, Ji = 0, Hs = function(t, i, e) {
  var r = ke(t) && (t.substr(0, 6) === "clamp(" || t.indexOf("max") > -1);
  return e["_" + i + "Clamp"] = r, r ? t.substr(6, t.length - 7) : t;
}, Vs = function(t, i) {
  return i && (!ke(t) || t.substr(0, 6) !== "clamp(") ? "clamp(" + t + ")" : t;
}, td = function a14() {
  return Ji && requestAnimationFrame(a14);
}, Js = function() {
  return ao = 1;
}, qs = function() {
  return ao = 0;
}, tr = function(t) {
  return t;
}, qi = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, gl = function() {
  return typeof window < "u";
}, _l = function() {
  return B || gl() && (B = window.gsap) && B.registerPlugin && B;
}, li = function(t) {
  return !!~_s.indexOf(t);
}, ml = function(t) {
  return (t === "Height" ? ys : J["inner" + t]) || Se["client" + t] || ot["client" + t];
}, yl = function(t) {
  return Lr(t, "getBoundingClientRect") || (li(t) ? function() {
    return Hn.width = J.innerWidth, Hn.height = ys, Hn;
  } : function() {
    return pr(t);
  });
}, ed = function(t, i, e) {
  var r = e.d, n = e.d2, o = e.a;
  return (o = Lr(t, "getBoundingClientRect")) ? function() {
    return o()[r];
  } : function() {
    return (i ? ml(n) : t["client" + n]) || 0;
  };
}, rd = function(t, i) {
  return !i || ~nr.indexOf(t) ? yl(t) : function() {
    return Hn;
  };
}, ir = function(t, i) {
  var e = i.s, r = i.d2, n = i.d, o = i.a;
  return Math.max(0, (e = "scroll" + r) && (o = Lr(t, e)) ? o() - yl(t)()[n] : li(t) ? (Se[e] || ot[e]) - ml(r) : t[e] - t["offset" + r]);
}, Rn = function(t, i) {
  for (var e = 0; e < vi.length; e += 3) (!i || ~i.indexOf(vi[e + 1])) && t(vi[e], vi[e + 1], vi[e + 2]);
}, ke = function(t) {
  return typeof t == "string";
}, ee = function(t) {
  return typeof t == "function";
}, Qi = function(t) {
  return typeof t == "number";
}, Zr = function(t) {
  return typeof t == "object";
}, Xi = function(t, i, e) {
  return t && t.progress(i ? 0 : 1) && e && t.pause();
}, mi = function(t, i, e) {
  if (t.enabled) {
    var r = t._ctx ? t._ctx.add(function() {
      return i(t, e);
    }) : i(t, e);
    r && r.totalTime && (t.callbackAnimation = r);
  }
}, yi = Math.abs, xl = "left", bl = "top", xs = "right", bs = "bottom", oi = "width", si = "height", sn = "Right", an = "Left", ln = "Top", cn = "Bottom", Rt = "padding", Be = "margin", Bi = "Width", vs = "Height", Dt = "px", Fe = function(t) {
  return J.getComputedStyle(t.nodeType === Node.DOCUMENT_NODE ? t.scrollingElement : t);
}, id = function(t) {
  var i = Fe(t).position;
  t.style.position = i === "absolute" || i === "fixed" ? i : "relative";
}, Qs = function(t, i) {
  for (var e in i) e in t || (t[e] = i[e]);
  return t;
}, pr = function(t, i) {
  var e = i && Fe(t)[Uo] !== "matrix(1, 0, 0, 1, 0, 0)" && B.to(t, { x: 0, y: 0, xPercent: 0, yPercent: 0, rotation: 0, rotationX: 0, rotationY: 0, scale: 1, skewX: 0, skewY: 0 }).progress(1), r = t.getBoundingClientRect ? t.getBoundingClientRect() : t.scrollingElement.getBoundingClientRect();
  return e && e.progress(0).kill(), r;
}, ro = function(t, i) {
  var e = i.d2;
  return t["offset" + e] || t["client" + e] || 0;
}, vl = function(t) {
  var i = [], e = t.labels, r = t.duration(), n;
  for (n in e) i.push(e[n] / r);
  return i;
}, nd = function(t) {
  return function(i) {
    return B.utils.snap(vl(t), i);
  };
}, ws = function(t) {
  var i = B.utils.snap(t), e = Array.isArray(t) && t.slice(0).sort(function(r, n) {
    return r - n;
  });
  return e ? function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var s;
    if (!n) return i(r);
    if (n > 0) {
      for (r -= o, s = 0; s < e.length; s++) if (e[s] >= r) return e[s];
      return e[s - 1];
    } else for (s = e.length, r += o; s--; ) if (e[s] <= r) return e[s];
    return e[0];
  } : function(r, n, o) {
    o === void 0 && (o = 1e-3);
    var s = i(r);
    return !n || Math.abs(s - r) < o || s - r < 0 == n < 0 ? s : i(n < 0 ? r - t : r + t);
  };
}, od = function(t) {
  return function(i, e) {
    return ws(vl(t))(i, e.direction);
  };
}, On = function(t, i, e, r) {
  return e.split(",").forEach(function(n) {
    return t(i, n, r);
  });
}, zt = function(t, i, e, r, n) {
  return t.addEventListener(i, e, { passive: !r, capture: !!n });
}, Ft = function(t, i, e, r) {
  return t.removeEventListener(i, e, !!r);
}, En = function(t, i, e) {
  e = e && e.wheelHandler, e && (t(i, "wheel", e), t(i, "touchmove", e));
}, Zs = { startColor: "green", endColor: "red", indent: 0, fontSize: "16px", fontWeight: "normal" }, Ln = { toggleActions: "play", anticipatePin: 0 }, io = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 }, Yn = function(t, i) {
  if (ke(t)) {
    var e = t.indexOf("="), r = ~e ? +(t.charAt(e - 1) + 1) * parseFloat(t.substr(e + 1)) : 0;
    ~e && (t.indexOf("%") > e && (r *= i / 100), t = t.substr(0, e - 1)), t = r + (t in io ? io[t] * i : ~t.indexOf("%") ? parseFloat(t) * i / 100 : parseFloat(t) || 0);
  }
  return t;
}, Dn = function(t, i, e, r, n, o, s, l) {
  var c = n.startColor, d = n.endColor, p = n.fontSize, u = n.indent, f = n.fontWeight, x = st.createElement("div"), g = li(e) || Lr(e, "pinType") === "fixed", b = t.indexOf("scroller") !== -1, k = g ? ot : e.tagName === "IFRAME" ? e.contentDocument.body : e, w = t.indexOf("start") !== -1, m = w ? c : d, _ = "border-color:" + m + ";font-size:" + p + ";color:" + m + ";font-weight:" + f + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return _ += "position:" + ((b || l) && g ? "fixed;" : "absolute;"), (b || l || !g) && (_ += (r === It ? xs : bs) + ":" + (o + parseFloat(u)) + "px;"), s && (_ += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), x._isStart = w, x.setAttribute("class", "gsap-marker-" + t + (i ? " marker-" + i : "")), x.style.cssText = _, x.innerText = i || i === 0 ? t + "-" + i : t, k.children[0] ? k.insertBefore(x, k.children[0]) : k.appendChild(x), x._offset = x["offset" + r.op.d2], Wn(x, 0, r, w), x;
}, Wn = function(t, i, e, r) {
  var n = { display: "block" }, o = e[r ? "os2" : "p2"], s = e[r ? "p2" : "os2"];
  t._isFlipped = r, n[e.a + "Percent"] = r ? -100 : 0, n[e.a] = r ? "1px" : 0, n["border" + o + Bi] = 1, n["border" + s + Bi] = 0, n[e.p] = i + "px", B.set(t, n);
}, V = [], qo = {}, bn, Ks = function() {
  return jt() - Ge > 34 && (bn || (bn = requestAnimationFrame(_r)));
}, xi = function() {
  (!le || !le.isPressed || le.startX > ot.clientWidth) && (q.cache++, le ? bn || (bn = requestAnimationFrame(_r)) : _r(), Ge || di("scrollStart"), Ge = jt());
}, Mo = function() {
  pl = J.innerWidth, hl = J.innerHeight;
}, Zi = function(t) {
  q.cache++, (t === true || !Kt && !ul && !st.fullscreenElement && !st.webkitFullscreenElement && (!Ho || pl !== J.innerWidth || Math.abs(J.innerHeight - hl) > J.innerHeight * 0.25)) && eo.restart(true);
}, ci = {}, sd = [], wl = function a15() {
  return Ft(H, "scrollEnd", a15) || ti(true);
}, di = function(t) {
  return ci[t] && ci[t].map(function(i) {
    return i();
  }) || sd;
}, Ce = [], Cl = function(t) {
  for (var i = 0; i < Ce.length; i += 5) (!t || Ce[i + 4] && Ce[i + 4].query === t) && (Ce[i].style.cssText = Ce[i + 1], Ce[i].getBBox && Ce[i].setAttribute("transform", Ce[i + 2] || ""), Ce[i + 3].uncache = 1);
}, kl = function() {
  return q.forEach(function(t) {
    return ee(t) && ++t.cacheID && (t.rec = t());
  });
}, Cs = function(t, i) {
  var e;
  for (ce = 0; ce < V.length; ce++) e = V[ce], e && (!i || e._ctx === i) && (t ? e.kill(1) : e.revert(true, true));
  on = true, i && Cl(i), i || di("revert");
}, Ml = function(t, i) {
  q.cache++, (i || !de) && q.forEach(function(e) {
    return ee(e) && e.cacheID++ && (e.rec = 0);
  }), ke(t) && (J.history.scrollRestoration = ms = t);
}, de, ai = 0, js, ad = function() {
  if (js !== ai) {
    var t = js = ai;
    requestAnimationFrame(function() {
      return t === ai && ti(true);
    });
  }
}, Sl = function() {
  ot.appendChild(Ri), ys = !le && Ri.offsetHeight || J.innerHeight, ot.removeChild(Ri);
}, ta = function(t) {
  return xn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(i) {
    return i.style.display = t ? "none" : "block";
  });
}, ti = function(t, i) {
  if (Se = st.documentElement, ot = st.body, _s = [J, st, Se, ot], Ge && !t && !on) {
    zt(H, "scrollEnd", wl);
    return;
  }
  Sl(), de = H.isRefreshing = true, on || kl();
  var e = di("refreshInit");
  fl && H.sort(), i || Cs(), q.forEach(function(r) {
    ee(r) && (r.smooth && (r.target.style.scrollBehavior = "auto"), r(0));
  }), V.slice(0).forEach(function(r) {
    return r.refresh();
  }), on = false, V.forEach(function(r) {
    if (r._subPinOffset && r.pin) {
      var n = r.vars.horizontal ? "offsetWidth" : "offsetHeight", o = r.pin[n];
      r.revert(true, 1), r.adjustPinSpacing(r.pin[n] - o), r.refresh();
    }
  }), Jo = 1, ta(true), V.forEach(function(r) {
    var n = ir(r.scroller, r._dir), o = r.vars.end === "max" || r._endClamp && r.end > n, s = r._startClamp && r.start >= n;
    (o || s) && r.setPositions(s ? n - 1 : r.start, o ? Math.max(s ? n : r.start + 1, n) : r.end, true);
  }), ta(false), Jo = 0, e.forEach(function(r) {
    return r && r.render && r.render(-1);
  }), q.forEach(function(r) {
    ee(r) && (r.smooth && requestAnimationFrame(function() {
      return r.target.style.scrollBehavior = "smooth";
    }), r.rec && r(r.rec));
  }), Ml(ms, 1), eo.pause(), ai++, de = 2, _r(2), V.forEach(function(r) {
    return ee(r.vars.onRefresh) && r.vars.onRefresh(r);
  }), de = H.isRefreshing = false, di("refresh");
}, Qo = 0, Xn = 1, dn, _r = function(t) {
  if (t === 2 || !de && !on) {
    H.isUpdating = true, dn && dn.update(0);
    var i = V.length, e = jt(), r = e - ko >= 50, n = i && V[0].scroll();
    if (Xn = Qo > n ? -1 : 1, de || (Qo = n), r && (Ge && !ao && e - Ge > 200 && (Ge = 0, di("scrollEnd")), Vi = ko, ko = e), Xn < 0) {
      for (ce = i; ce-- > 0; ) V[ce] && V[ce].update(0, r);
      Xn = 1;
    } else for (ce = 0; ce < i; ce++) V[ce] && V[ce].update(0, r);
    H.isUpdating = false;
  }
  bn = 0;
}, Zo = [xl, bl, bs, xs, Be + cn, Be + sn, Be + ln, Be + an, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Un = Zo.concat([oi, si, "boxSizing", "max" + Bi, "max" + vs, "position", Be, Rt, Rt + ln, Rt + sn, Rt + cn, Rt + an]), ld = function(t, i, e) {
  Oi(e);
  var r = t._gsap;
  if (r.spacerIsNative) Oi(r.spacerState);
  else if (t._gsap.swappedIn) {
    var n = i.parentNode;
    n && (n.insertBefore(t, i), n.removeChild(i));
  }
  t._gsap.swappedIn = false;
}, So = function(t, i, e, r) {
  if (!t._gsap.swappedIn) {
    for (var n = Zo.length, o = i.style, s = t.style, l; n--; ) l = Zo[n], o[l] = e[l];
    o.position = e.position === "absolute" ? "absolute" : "relative", e.display === "inline" && (o.display = "inline-block"), s[bs] = s[xs] = "auto", o.flexBasis = e.flexBasis || "auto", o.overflow = "visible", o.boxSizing = "border-box", o[oi] = ro(t, fe) + Dt, o[si] = ro(t, It) + Dt, o[Rt] = s[Be] = s[bl] = s[xl] = "0", Oi(r), s[oi] = s["max" + Bi] = e[oi], s[si] = s["max" + vs] = e[si], s[Rt] = e[Rt], t.parentNode !== i && (t.parentNode.insertBefore(i, t), i.appendChild(t)), t._gsap.swappedIn = true;
  }
}, cd = /([A-Z])/g, Oi = function(t) {
  if (t) {
    var i = t.t.style, e = t.length, r = 0, n, o;
    for ((t.t._gsap || B.core.getCache(t.t)).uncache = 1; r < e; r += 2) o = t[r + 1], n = t[r], o ? i[n] = o : i[n] && i.removeProperty(n.replace(cd, "-$1").toLowerCase());
  }
}, In = function(t) {
  for (var i = Un.length, e = t.style, r = [], n = 0; n < i; n++) r.push(Un[n], e[Un[n]]);
  return r.t = t, r;
}, dd = function(t, i, e) {
  for (var r = [], n = t.length, o = e ? 8 : 0, s; o < n; o += 2) s = t[o], r.push(s, s in i ? i[s] : t[o + 1]);
  return r.t = t.t, r;
}, Hn = { left: 0, top: 0 }, ea = function(t, i, e, r, n, o, s, l, c, d, p, u, f, x) {
  ee(t) && (t = t(l)), ke(t) && t.substr(0, 3) === "max" && (t = u + (t.charAt(4) === "=" ? Yn("0" + t.substr(3), e) : 0));
  var g = f ? f.time() : 0, b, k, w;
  if (f && f.seek(0), isNaN(t) || (t = +t), Qi(t)) f && (t = B.utils.mapRange(f.scrollTrigger.start, f.scrollTrigger.end, 0, u, t)), s && Wn(s, e, r, true);
  else {
    ee(i) && (i = i(l));
    var m = (t || "0").split(" "), _, C, S, v;
    w = he(i, l) || ot, _ = pr(w) || {}, (!_ || !_.left && !_.top) && Fe(w).display === "none" && (v = w.style.display, w.style.display = "block", _ = pr(w), v ? w.style.display = v : w.style.removeProperty("display")), C = Yn(m[0], _[r.d]), S = Yn(m[1] || "0", e), t = _[r.p] - c[r.p] - d + C + n - S, s && Wn(s, S, r, e - S < 20 || s._isStart && S > 20), e -= e - S;
  }
  if (x && (l[x] = t || -1e-3, t < 0 && (t = 0)), o) {
    var y = t + e, T = o._isStart;
    b = "scroll" + r.d2, Wn(o, y, r, T && y > 20 || !T && (p ? Math.max(ot[b], Se[b]) : o.parentNode[b]) <= y + 1), p && (c = pr(s), p && (o.style[r.op.p] = c[r.op.p] - r.op.m - o._offset + Dt));
  }
  return f && w && (b = pr(w), f.seek(u), k = pr(w), f._caScrollDist = b[r.p] - k[r.p], t = t / f._caScrollDist * u), f && f.seek(g), f ? t : Math.round(t);
}, fd = /(webkit|moz|length|cssText|inset)/i, ra = function(t, i, e, r) {
  if (t.parentNode !== i) {
    var n = t.style, o, s;
    if (i === ot) {
      t._stOrig = n.cssText, s = Fe(t);
      for (o in s) !+o && !fd.test(o) && s[o] && typeof n[o] == "string" && o !== "0" && (n[o] = s[o]);
      n.top = e, n.left = r;
    } else n.cssText = t._stOrig;
    B.core.getCache(t).uncache = 1, i.appendChild(t);
  }
}, Tl = function(t, i, e) {
  var r = i, n = r;
  return function(o) {
    var s = Math.round(t());
    return s !== r && s !== n && Math.abs(s - r) > 3 && Math.abs(s - n) > 3 && (o = s, e && e()), n = r, r = Math.round(o), r;
  };
}, $n = function(t, i, e) {
  var r = {};
  r[i.p] = "+=" + e, B.set(t, r);
}, ia = function(t, i) {
  var e = Br(t, i), r = "_scroll" + i.p2, n = function o(s, l, c, d, p) {
    var u = o.tween, f = l.onComplete, x = {};
    c = c || e();
    var g = Tl(e, c, function() {
      u.kill(), o.tween = 0;
    });
    return p = d && p || 0, d = d || s - c, u && u.kill(), l[r] = s, l.inherit = false, l.modifiers = x, x[r] = function() {
      return g(c + d * u.ratio + p * u.ratio * u.ratio);
    }, l.onUpdate = function() {
      q.cache++, o.tween && _r();
    }, l.onComplete = function() {
      o.tween = 0, f && f.call(u);
    }, u = o.tween = B.to(t, l), u;
  };
  return t[r] = e, e.wheelHandler = function() {
    return n.tween && n.tween.kill() && (n.tween = 0);
  }, zt(t, "wheel", e.wheelHandler), H.isTouch && zt(t, "touchmove", e.wheelHandler), n;
}, H = (function() {
  function a17(i, e) {
    bi || a17.register(B) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Vo(this), this.init(i, e);
  }
  var t = a17.prototype;
  return t.init = function(e, r) {
    if (this.progress = this.start = 0, this.vars && this.kill(true, true), !Ji) {
      this.update = this.refresh = this.kill = tr;
      return;
    }
    e = Qs(ke(e) || Qi(e) || e.nodeType ? { trigger: e } : e, Ln);
    var n = e, o = n.onUpdate, s = n.toggleClass, l = n.id, c = n.onToggle, d = n.onRefresh, p = n.scrub, u = n.trigger, f = n.pin, x = n.pinSpacing, g = n.invalidateOnRefresh, b = n.anticipatePin, k = n.onScrubComplete, w = n.onSnapComplete, m = n.once, _ = n.snap, C = n.pinReparent, S = n.pinSpacer, v = n.containerAnimation, y = n.fastScrollEnd, T = n.preventOverlaps, M = e.horizontal || e.containerAnimation && e.horizontal !== false ? fe : It, R = !p && p !== 0, P = he(e.scroller || J), E = B.core.getCache(P), L = li(P), D = ("pinType" in e ? e.pinType : Lr(P, "pinType") || L && "fixed") === "fixed", F = [e.onEnter, e.onLeave, e.onEnterBack, e.onLeaveBack], $ = R && e.toggleActions.split(" "), G = "markers" in e ? e.markers : Ln.markers, tt = L ? 0 : parseFloat(Fe(P)["border" + M.p2 + Bi]) || 0, A = this, Z = e.onRefreshInit && function() {
      return e.onRefreshInit(A);
    }, Tt = ed(P, L, M), Ht = rd(P, L), lt = 0, Et = 0, Vt = 0, Pt = Br(P, M), ie, Jt, xr, ne, oe, et, wt, ue, be, O, ve, ar, br, xt, lr, vr, Yr, $t, wr, Ct, We, De, cr, Fi, At, wn, dr, hi, pi, Cr, Wr, Q, Xr, Xe, Ue, He, Ur, gi, fr;
    if (A._startClamp = A._endClamp = false, A._dir = M, b *= 45, A.scroller = P, A.scroll = v ? v.time.bind(v) : Pt, ne = Pt(), A.vars = e, r = r || e.animation, "refreshPriority" in e && (fl = 1, e.refreshPriority === -9999 && (dn = A)), E.tweenScroll = E.tweenScroll || { top: ia(P, It), left: ia(P, fe) }, A.tweenTo = ie = E.tweenScroll[M.p], A.scrubDuration = function(I) {
      Xr = Qi(I) && I, Xr ? Q ? Q.duration(I) : Q = B.to(r, { ease: "expo", totalProgress: "+=0", inherit: false, duration: Xr, paused: true, onComplete: function() {
        return k && k(A);
      } }) : (Q && Q.progress(1).kill(), Q = 0);
    }, r && (r.vars.lazy = false, r._initted && !A.isReverted || r.vars.immediateRender !== false && e.immediateRender !== false && r.duration() && r.render(0, true, true), A.animation = r.pause(), r.scrollTrigger = A, A.scrubDuration(p), Cr = 0, l || (l = r.vars.id)), _ && ((!Zr(_) || _.push) && (_ = { snapTo: _ }), "scrollBehavior" in ot.style && B.set(L ? [ot, Se] : P, { scrollBehavior: "auto" }), q.forEach(function(I) {
      return ee(I) && I.target === (L ? st.scrollingElement || Se : P) && (I.smooth = false);
    }), xr = ee(_.snapTo) ? _.snapTo : _.snapTo === "labels" ? nd(r) : _.snapTo === "labelsDirectional" ? od(r) : _.directional !== false ? function(I, Y) {
      return ws(_.snapTo)(I, jt() - Et < 500 ? 0 : Y.direction);
    } : B.utils.snap(_.snapTo), Xe = _.duration || { min: 0.1, max: 2 }, Xe = Zr(Xe) ? nn(Xe.min, Xe.max) : nn(Xe, Xe), Ue = B.delayedCall(_.delay || Xr / 2 || 0.1, function() {
      var I = Pt(), Y = jt() - Et < 500, z = ie.tween;
      if ((Y || Math.abs(A.getVelocity()) < 10) && !z && !ao && lt !== I) {
        var W = (I - et) / xt, Bt = r && !R ? r.totalProgress() : W, K = Y ? 0 : (Bt - Wr) / (jt() - Vi) * 1e3 || 0, kt = B.utils.clamp(-W, 1 - W, yi(K / 2) * K / 0.185), qt = W + (_.inertia === false ? 0 : kt), bt, ut, ct = _, Ve = ct.onStart, gt = ct.onInterrupt, we = ct.onComplete;
        if (bt = xr(qt, A), Qi(bt) || (bt = qt), ut = Math.max(0, Math.round(et + bt * xt)), I <= wt && I >= et && ut !== I) {
          if (z && !z._initted && z.data <= yi(ut - I)) return;
          _.inertia === false && (kt = bt - W), ie(ut, { duration: Xe(yi(Math.max(yi(qt - Bt), yi(bt - Bt)) * 0.185 / K / 0.05 || 0)), ease: _.ease || "power3", data: yi(ut - I), onInterrupt: function() {
            return Ue.restart(true) && gt && mi(A, gt);
          }, onComplete: function() {
            A.update(), lt = Pt(), r && !R && (Q ? Q.resetTo("totalProgress", bt, r._tTime / r._tDur) : r.progress(bt)), Cr = Wr = r && !R ? r.totalProgress() : A.progress, w && w(A), we && mi(A, we);
          } }, I, kt * xt, ut - I - kt * xt), Ve && mi(A, Ve, ie.tween);
        }
      } else A.isActive && lt !== I && Ue.restart(true);
    }).pause()), l && (qo[l] = A), u = A.trigger = he(u || f !== true && f), fr = u && u._gsap && u._gsap.stRevert, fr && (fr = fr(A)), f = f === true ? u : he(f), ke(s) && (s = { targets: u, className: s }), f && (x === false || x === Be || (x = !x && f.parentNode && f.parentNode.style && Fe(f.parentNode).display === "flex" ? false : Rt), A.pin = f, Jt = B.core.getCache(f), Jt.spacer ? lr = Jt.pinState : (S && (S = he(S), S && !S.nodeType && (S = S.current || S.nativeElement), Jt.spacerIsNative = !!S, S && (Jt.spacerState = In(S))), Jt.spacer = $t = S || st.createElement("div"), $t.classList.add("pin-spacer"), l && $t.classList.add("pin-spacer-" + l), Jt.pinState = lr = In(f)), e.force3D !== false && B.set(f, { force3D: true }), A.spacer = $t = Jt.spacer, pi = Fe(f), Fi = pi[x + M.os2], Ct = B.getProperty(f), We = B.quickSetter(f, M.a, Dt), So(f, $t, pi), Yr = In(f)), G) {
      ar = Zr(G) ? Qs(G, Zs) : Zs, O = Dn("scroller-start", l, P, M, ar, 0), ve = Dn("scroller-end", l, P, M, ar, 0, O), wr = O["offset" + M.op.d2];
      var zi = he(Lr(P, "content") || P);
      ue = this.markerStart = Dn("start", l, zi, M, ar, wr, 0, v), be = this.markerEnd = Dn("end", l, zi, M, ar, wr, 0, v), v && (gi = B.quickSetter([ue, be], M.a, Dt)), !D && !(nr.length && Lr(P, "fixedMarkers") === true) && (id(L ? ot : P), B.set([O, ve], { force3D: true }), wn = B.quickSetter(O, M.a, Dt), hi = B.quickSetter(ve, M.a, Dt));
    }
    if (v) {
      var X = v.vars.onUpdate, N = v.vars.onUpdateParams;
      v.eventCallback("onUpdate", function() {
        A.update(0, 0, 1), X && X.apply(v, N || []);
      });
    }
    if (A.previous = function() {
      return V[V.indexOf(A) - 1];
    }, A.next = function() {
      return V[V.indexOf(A) + 1];
    }, A.revert = function(I, Y) {
      if (!Y) return A.kill(true);
      var z = I !== false || !A.enabled, W = Kt;
      z !== A.isReverted && (z && (He = Math.max(Pt(), A.scroll.rec || 0), Vt = A.progress, Ur = r && r.progress()), ue && [ue, be, O, ve].forEach(function(Bt) {
        return Bt.style.display = z ? "none" : "block";
      }), z && (Kt = A, A.update(z)), f && (!C || !A.isActive) && (z ? ld(f, $t, lr) : So(f, $t, Fe(f), At)), z || A.update(z), Kt = W, A.isReverted = z);
    }, A.refresh = function(I, Y, z, W) {
      if (!((Kt || !A.enabled) && !Y)) {
        if (f && I && Ge) {
          zt(a17, "scrollEnd", wl);
          return;
        }
        !de && Z && Z(A), Kt = A, ie.tween && !z && (ie.tween.kill(), ie.tween = 0), Q && Q.pause(), g && r && (r.revert({ kill: false }).invalidate(), r.getChildren ? r.getChildren(true, true, false).forEach(function(kr) {
          return kr.vars.immediateRender && kr.render(0, true, true);
        }) : r.vars.immediateRender && r.render(0, true, true)), A.isReverted || A.revert(true, true), A._subPinOffset = false;
        var Bt = Tt(), K = Ht(), kt = v ? v.duration() : ir(P, M), qt = xt <= 0.01 || !xt, bt = 0, ut = W || 0, ct = Zr(z) ? z.end : e.end, Ve = e.endTrigger || u, gt = Zr(z) ? z.start : e.start || (e.start === 0 || !u ? 0 : f ? "0 0" : "0 100%"), we = A.pinnedContainer = e.pinnedContainer && he(e.pinnedContainer, A), Qe = u && Math.max(0, V.indexOf(A)) || 0, Yt = Qe, Wt, Qt, Hr, Cn, Zt, Lt, Ze, ho, ks, Ni, Ke, Gi, kn;
        for (G && Zr(z) && (Gi = B.getProperty(O, M.p), kn = B.getProperty(ve, M.p)); Yt-- > 0; ) Lt = V[Yt], Lt.end || Lt.refresh(0, 1) || (Kt = A), Ze = Lt.pin, Ze && (Ze === u || Ze === f || Ze === we) && !Lt.isReverted && (Ni || (Ni = []), Ni.unshift(Lt), Lt.revert(true, true)), Lt !== V[Yt] && (Qe--, Yt--);
        for (ee(gt) && (gt = gt(A)), gt = Hs(gt, "start", A), et = ea(gt, u, Bt, M, Pt(), ue, O, A, K, tt, D, kt, v, A._startClamp && "_startClamp") || (f ? -1e-3 : 0), ee(ct) && (ct = ct(A)), ke(ct) && !ct.indexOf("+=") && (~ct.indexOf(" ") ? ct = (ke(gt) ? gt.split(" ")[0] : "") + ct : (bt = Yn(ct.substr(2), Bt), ct = ke(gt) ? gt : (v ? B.utils.mapRange(0, v.duration(), v.scrollTrigger.start, v.scrollTrigger.end, et) : et) + bt, Ve = u)), ct = Hs(ct, "end", A), wt = Math.max(et, ea(ct || (Ve ? "100% 0" : kt), Ve, Bt, M, Pt() + bt, be, ve, A, K, tt, D, kt, v, A._endClamp && "_endClamp")) || -1e-3, bt = 0, Yt = Qe; Yt--; ) Lt = V[Yt] || {}, Ze = Lt.pin, Ze && Lt.start - Lt._pinPush <= et && !v && Lt.end > 0 && (Wt = Lt.end - (A._startClamp ? Math.max(0, Lt.start) : Lt.start), (Ze === u && Lt.start - Lt._pinPush < et || Ze === we) && isNaN(gt) && (bt += Wt * (1 - Lt.progress)), Ze === f && (ut += Wt));
        if (et += bt, wt += bt, A._startClamp && (A._startClamp += bt), A._endClamp && !de && (A._endClamp = wt || -1e-3, wt = Math.min(wt, ir(P, M))), xt = wt - et || (et -= 0.01) && 1e-3, qt && (Vt = B.utils.clamp(0, 1, B.utils.normalize(et, wt, He))), A._pinPush = ut, ue && bt && (Wt = {}, Wt[M.a] = "+=" + bt, we && (Wt[M.p] = "-=" + Pt()), B.set([ue, be], Wt)), f && !(Jo && A.end >= ir(P, M))) Wt = Fe(f), Cn = M === It, Hr = Pt(), De = parseFloat(Ct(M.a)) + ut, !kt && wt > 1 && (Ke = (L ? st.scrollingElement || Se : P).style, Ke = { style: Ke, value: Ke["overflow" + M.a.toUpperCase()] }, L && Fe(ot)["overflow" + M.a.toUpperCase()] !== "scroll" && (Ke.style["overflow" + M.a.toUpperCase()] = "scroll")), So(f, $t, Wt), Yr = In(f), Qt = pr(f, true), ho = D && Br(P, Cn ? fe : It)(), x ? (At = [x + M.os2, xt + ut + Dt], At.t = $t, Yt = x === Rt ? ro(f, M) + xt + ut : 0, Yt && (At.push(M.d, Yt + Dt), $t.style.flexBasis !== "auto" && ($t.style.flexBasis = Yt + Dt)), Oi(At), we && V.forEach(function(kr) {
          kr.pin === we && kr.vars.pinSpacing !== false && (kr._subPinOffset = true);
        }), D && Pt(He)) : (Yt = ro(f, M), Yt && $t.style.flexBasis !== "auto" && ($t.style.flexBasis = Yt + Dt)), D && (Zt = { top: Qt.top + (Cn ? Hr - et : ho) + Dt, left: Qt.left + (Cn ? ho : Hr - et) + Dt, boxSizing: "border-box", position: "fixed" }, Zt[oi] = Zt["max" + Bi] = Math.ceil(Qt.width) + Dt, Zt[si] = Zt["max" + vs] = Math.ceil(Qt.height) + Dt, Zt[Be] = Zt[Be + ln] = Zt[Be + sn] = Zt[Be + cn] = Zt[Be + an] = "0", Zt[Rt] = Wt[Rt], Zt[Rt + ln] = Wt[Rt + ln], Zt[Rt + sn] = Wt[Rt + sn], Zt[Rt + cn] = Wt[Rt + cn], Zt[Rt + an] = Wt[Rt + an], vr = dd(lr, Zt, C), de && Pt(0)), r ? (ks = r._initted, wo(1), r.render(r.duration(), true, true), cr = Ct(M.a) - De + xt + ut, dr = Math.abs(xt - cr) > 1, D && dr && vr.splice(vr.length - 2, 2), r.render(0, true, true), ks || r.invalidate(true), r.parent || r.totalTime(r.totalTime()), wo(0)) : cr = xt, Ke && (Ke.value ? Ke.style["overflow" + M.a.toUpperCase()] = Ke.value : Ke.style.removeProperty("overflow-" + M.a));
        else if (u && Pt() && !v) for (Qt = u.parentNode; Qt && Qt !== ot; ) Qt._pinOffset && (et -= Qt._pinOffset, wt -= Qt._pinOffset), Qt = Qt.parentNode;
        Ni && Ni.forEach(function(kr) {
          return kr.revert(false, true);
        }), A.start = et, A.end = wt, ne = oe = de ? He : Pt(), !v && !de && (ne < He && Pt(He), A.scroll.rec = 0), A.revert(false, true), Et = jt(), Ue && (lt = -1, Ue.restart(true)), Kt = 0, r && R && (r._initted || Ur) && r.progress() !== Ur && r.progress(Ur || 0, true).render(r.time(), true, true), (qt || Vt !== A.progress || v || g || r && !r._initted) && (r && !R && (r._initted || Vt || r.vars.immediateRender !== false) && r.totalProgress(v && et < -1e-3 && !Vt ? B.utils.normalize(et, wt, 0) : Vt, true), A.progress = qt || (ne - et) / xt === Vt ? 0 : Vt), f && x && ($t._pinOffset = Math.round(A.progress * cr)), Q && Q.invalidate(), isNaN(Gi) || (Gi -= B.getProperty(O, M.p), kn -= B.getProperty(ve, M.p), $n(O, M, Gi), $n(ue, M, Gi - (W || 0)), $n(ve, M, kn), $n(be, M, kn - (W || 0))), qt && !de && A.update(), d && !de && !br && (br = true, d(A), br = false);
      }
    }, A.getVelocity = function() {
      return (Pt() - oe) / (jt() - Vi) * 1e3 || 0;
    }, A.endAnimation = function() {
      Xi(A.callbackAnimation), r && (Q ? Q.progress(1) : r.paused() ? R || Xi(r, A.direction < 0, 1) : Xi(r, r.reversed()));
    }, A.labelToScroll = function(I) {
      return r && r.labels && (et || A.refresh() || et) + r.labels[I] / r.duration() * xt || 0;
    }, A.getTrailing = function(I) {
      var Y = V.indexOf(A), z = A.direction > 0 ? V.slice(0, Y).reverse() : V.slice(Y + 1);
      return (ke(I) ? z.filter(function(W) {
        return W.vars.preventOverlaps === I;
      }) : z).filter(function(W) {
        return A.direction > 0 ? W.end <= et : W.start >= wt;
      });
    }, A.update = function(I, Y, z) {
      if (!(v && !z && !I)) {
        var W = de === true ? He : A.scroll(), Bt = I ? 0 : (W - et) / xt, K = Bt < 0 ? 0 : Bt > 1 ? 1 : Bt || 0, kt = A.progress, qt, bt, ut, ct, Ve, gt, we, Qe;
        if (Y && (oe = ne, ne = v ? Pt() : W, _ && (Wr = Cr, Cr = r && !R ? r.totalProgress() : K)), b && f && !Kt && !An && Ge && (!K && et < W + (W - oe) / (jt() - Vi) * b ? K = 1e-4 : K === 1 && wt > W + (W - oe) / (jt() - Vi) * b && (K = 0.9999)), K !== kt && A.enabled) {
          if (qt = A.isActive = !!K && K < 1, bt = !!kt && kt < 1, gt = qt !== bt, Ve = gt || !!K != !!kt, A.direction = K > kt ? 1 : -1, A.progress = K, Ve && !Kt && (ut = K && !kt ? 0 : K === 1 ? 1 : kt === 1 ? 2 : 3, R && (ct = !gt && $[ut + 1] !== "none" && $[ut + 1] || $[ut], Qe = r && (ct === "complete" || ct === "reset" || ct in r))), T && (gt || Qe) && (Qe || p || !r) && (ee(T) ? T(A) : A.getTrailing(T).forEach(function(Hr) {
            return Hr.endAnimation();
          })), R || (Q && !Kt && !An ? (Q._dp._time - Q._start !== Q._time && Q.render(Q._dp._time - Q._start), Q.resetTo ? Q.resetTo("totalProgress", K, r._tTime / r._tDur) : (Q.vars.totalProgress = K, Q.invalidate().restart())) : r && r.totalProgress(K, !!(Kt && (Et || I)))), f) {
            if (I && x && ($t.style[x + M.os2] = Fi), !D) We(qi(De + cr * K));
            else if (Ve) {
              if (we = !I && K > kt && wt + 1 > W && W + 1 >= ir(P, M), C) if (!I && (qt || we)) {
                var Yt = pr(f, true), Wt = W - et;
                ra(f, ot, Yt.top + (M === It ? Wt : 0) + Dt, Yt.left + (M === It ? 0 : Wt) + Dt);
              } else ra(f, $t);
              Oi(qt || we ? vr : Yr), dr && K < 1 && qt || We(De + (K === 1 && !we ? cr : 0));
            }
          }
          _ && !ie.tween && !Kt && !An && Ue.restart(true), s && (gt || m && K && (K < 1 || !Co)) && xn(s.targets).forEach(function(Hr) {
            return Hr.classList[qt || m ? "add" : "remove"](s.className);
          }), o && !R && !I && o(A), Ve && !Kt ? (R && (Qe && (ct === "complete" ? r.pause().totalProgress(1) : ct === "reset" ? r.restart(true).pause() : ct === "restart" ? r.restart(true) : r[ct]()), o && o(A)), (gt || !Co) && (c && gt && mi(A, c), F[ut] && mi(A, F[ut]), m && (K === 1 ? A.kill(false, 1) : F[ut] = 0), gt || (ut = K === 1 ? 1 : 3, F[ut] && mi(A, F[ut]))), y && !qt && Math.abs(A.getVelocity()) > (Qi(y) ? y : 2500) && (Xi(A.callbackAnimation), Q ? Q.progress(1) : Xi(r, ct === "reverse" ? 1 : !K, 1))) : R && o && !Kt && o(A);
        }
        if (hi) {
          var Qt = v ? W / v.duration() * (v._caScrollDist || 0) : W;
          wn(Qt + (O._isFlipped ? 1 : 0)), hi(Qt);
        }
        gi && gi(-W / v.duration() * (v._caScrollDist || 0));
      }
    }, A.enable = function(I, Y) {
      A.enabled || (A.enabled = true, zt(P, "resize", Zi), L || zt(P, "scroll", xi), Z && zt(a17, "refreshInit", Z), I !== false && (A.progress = Vt = 0, ne = oe = lt = Pt()), Y !== false && A.refresh());
    }, A.getTween = function(I) {
      return I && ie ? ie.tween : Q;
    }, A.setPositions = function(I, Y, z, W) {
      if (v) {
        var Bt = v.scrollTrigger, K = v.duration(), kt = Bt.end - Bt.start;
        I = Bt.start + kt * I / K, Y = Bt.start + kt * Y / K;
      }
      A.refresh(false, false, { start: Vs(I, z && !!A._startClamp), end: Vs(Y, z && !!A._endClamp) }, W), A.update();
    }, A.adjustPinSpacing = function(I) {
      if (At && I) {
        var Y = At.indexOf(M.d) + 1;
        At[Y] = parseFloat(At[Y]) + I + Dt, At[1] = parseFloat(At[1]) + I + Dt, Oi(At);
      }
    }, A.disable = function(I, Y) {
      if (I !== false && A.revert(true, true), A.enabled && (A.enabled = A.isActive = false, Y || Q && Q.pause(), He = 0, Jt && (Jt.uncache = 1), Z && Ft(a17, "refreshInit", Z), Ue && (Ue.pause(), ie.tween && ie.tween.kill() && (ie.tween = 0)), !L)) {
        for (var z = V.length; z--; ) if (V[z].scroller === P && V[z] !== A) return;
        Ft(P, "resize", Zi), L || Ft(P, "scroll", xi);
      }
    }, A.kill = function(I, Y) {
      A.disable(I, Y), Q && !Y && Q.kill(), l && delete qo[l];
      var z = V.indexOf(A);
      z >= 0 && V.splice(z, 1), z === ce && Xn > 0 && ce--, z = 0, V.forEach(function(W) {
        return W.scroller === A.scroller && (z = 1);
      }), z || de || (A.scroll.rec = 0), r && (r.scrollTrigger = null, I && r.revert({ kill: false }), Y || r.kill()), ue && [ue, be, O, ve].forEach(function(W) {
        return W.parentNode && W.parentNode.removeChild(W);
      }), dn === A && (dn = 0), f && (Jt && (Jt.uncache = 1), z = 0, V.forEach(function(W) {
        return W.pin === f && z++;
      }), z || (Jt.spacer = 0)), e.onKill && e.onKill(A);
    }, V.push(A), A.enable(false, false), fr && fr(A), r && r.add && !xt) {
      var it = A.update;
      A.update = function() {
        A.update = it, q.cache++, et || wt || A.refresh();
      }, B.delayedCall(0.01, A.update), xt = 0.01, et = wt = 0;
    } else A.refresh();
    f && ad();
  }, a17.register = function(e) {
    return bi || (B = e || _l(), gl() && window.document && a17.enable(), bi = Ji), bi;
  }, a17.defaults = function(e) {
    if (e) for (var r in e) Ln[r] = e[r];
    return Ln;
  }, a17.disable = function(e, r) {
    Ji = 0, V.forEach(function(o) {
      return o[r ? "kill" : "disable"](e);
    }), Ft(J, "wheel", xi), Ft(st, "scroll", xi), clearInterval(Pn), Ft(st, "touchcancel", tr), Ft(ot, "touchstart", tr), On(Ft, st, "pointerdown,touchstart,mousedown", Js), On(Ft, st, "pointerup,touchend,mouseup", qs), eo.kill(), Rn(Ft);
    for (var n = 0; n < q.length; n += 3) En(Ft, q[n], q[n + 1]), En(Ft, q[n], q[n + 2]);
  }, a17.enable = function() {
    if (J = window, st = document, Se = st.documentElement, ot = st.body, B) {
      if (xn = B.utils.toArray, nn = B.utils.clamp, Vo = B.core.context || tr, wo = B.core.suppressOverwrites || tr, ms = J.history.scrollRestoration || "auto", Qo = J.pageYOffset || 0, B.core.globals("ScrollTrigger", a17), ot) {
        Ji = 1, Ri = document.createElement("div"), Ri.style.height = "100vh", Ri.style.position = "absolute", Sl(), td(), St.register(B), a17.isTouch = St.isTouch, Mr = St.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ho = St.isTouch === 1, zt(J, "wheel", xi), _s = [J, st, Se, ot], B.matchMedia ? (a17.matchMedia = function(d) {
          var p = B.matchMedia(), u;
          for (u in d) p.add(u, d[u]);
          return p;
        }, B.addEventListener("matchMediaInit", function() {
          kl(), Cs();
        }), B.addEventListener("matchMediaRevert", function() {
          return Cl();
        }), B.addEventListener("matchMedia", function() {
          ti(0, 1), di("matchMedia");
        }), B.matchMedia().add("(orientation: portrait)", function() {
          return Mo(), Mo;
        })) : console.warn("Requires GSAP 3.11.0 or later"), Mo(), zt(st, "scroll", xi);
        var e = ot.hasAttribute("style"), r = ot.style, n = r.borderTopStyle, o = B.core.Animation.prototype, s, l;
        for (o.revert || Object.defineProperty(o, "revert", { value: function() {
          return this.time(-0.01, true);
        } }), r.borderTopStyle = "solid", s = pr(ot), It.m = Math.round(s.top + It.sc()) || 0, fe.m = Math.round(s.left + fe.sc()) || 0, n ? r.borderTopStyle = n : r.removeProperty("border-top-style"), e || (ot.setAttribute("style", ""), ot.removeAttribute("style")), Pn = setInterval(Ks, 250), B.delayedCall(0.5, function() {
          return An = 0;
        }), zt(st, "touchcancel", tr), zt(ot, "touchstart", tr), On(zt, st, "pointerdown,touchstart,mousedown", Js), On(zt, st, "pointerup,touchend,mouseup", qs), Uo = B.utils.checkPrefix("transform"), Un.push(Uo), bi = jt(), eo = B.delayedCall(0.2, ti).pause(), vi = [st, "visibilitychange", function() {
          var d = J.innerWidth, p = J.innerHeight;
          st.hidden ? (Xs = d, Us = p) : (Xs !== d || Us !== p) && Zi();
        }, st, "DOMContentLoaded", ti, J, "load", ti, J, "resize", Zi], Rn(zt), V.forEach(function(d) {
          return d.enable(0, 1);
        }), l = 0; l < q.length; l += 3) En(Ft, q[l], q[l + 1]), En(Ft, q[l], q[l + 2]);
      } else if (st) {
        var c = function d() {
          a17.enable(), st.removeEventListener("DOMContentLoaded", d);
        };
        st.addEventListener("DOMContentLoaded", c);
      }
    }
  }, a17.config = function(e) {
    "limitCallbacks" in e && (Co = !!e.limitCallbacks);
    var r = e.syncInterval;
    r && clearInterval(Pn) || (Pn = r) && setInterval(Ks, r), "ignoreMobileResize" in e && (Ho = a17.isTouch === 1 && e.ignoreMobileResize), "autoRefreshEvents" in e && (Rn(Ft) || Rn(zt, e.autoRefreshEvents || "none"), ul = (e.autoRefreshEvents + "").indexOf("resize") === -1);
  }, a17.scrollerProxy = function(e, r) {
    var n = he(e), o = q.indexOf(n), s = li(n);
    ~o && q.splice(o, s ? 6 : 2), r && (s ? nr.unshift(J, r, ot, r, Se, r) : nr.unshift(n, r));
  }, a17.clearMatchMedia = function(e) {
    V.forEach(function(r) {
      return r._ctx && r._ctx.query === e && r._ctx.kill(true, true);
    });
  }, a17.isInViewport = function(e, r, n) {
    var o = (ke(e) ? he(e) : e).getBoundingClientRect(), s = o[n ? oi : si] * r || 0;
    return n ? o.right - s > 0 && o.left + s < J.innerWidth : o.bottom - s > 0 && o.top + s < J.innerHeight;
  }, a17.positionInViewport = function(e, r, n) {
    ke(e) && (e = he(e));
    var o = e.getBoundingClientRect(), s = o[n ? oi : si], l = r == null ? s / 2 : r in io ? io[r] * s : ~r.indexOf("%") ? parseFloat(r) * s / 100 : parseFloat(r) || 0;
    return n ? (o.left + l) / J.innerWidth : (o.top + l) / J.innerHeight;
  }, a17.killAll = function(e) {
    if (V.slice(0).forEach(function(n) {
      return n.vars.id !== "ScrollSmoother" && n.kill();
    }), e !== true) {
      var r = ci.killAll || [];
      ci = {}, r.forEach(function(n) {
        return n();
      });
    }
  }, a17;
})();
H.version = "3.15.0";
H.saveStyles = function(a17) {
  return a17 ? xn(a17).forEach(function(t) {
    if (t && t.style) {
      var i = Ce.indexOf(t);
      i >= 0 && Ce.splice(i, 5), Ce.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), B.core.getCache(t), Vo());
    }
  }) : Ce;
};
H.revert = function(a17, t) {
  return Cs(!a17, t);
};
H.create = function(a17, t) {
  return new H(a17, t);
};
H.refresh = function(a17) {
  return a17 ? Zi(true) : (bi || H.register()) && ti(true);
};
H.update = function(a17) {
  return ++q.cache && _r(a17 === true ? 2 : 0);
};
H.clearScrollMemory = Ml;
H.maxScroll = function(a17, t) {
  return ir(a17, t ? fe : It);
};
H.getScrollFunc = function(a17, t) {
  return Br(he(a17), t ? fe : It);
};
H.getById = function(a17) {
  return qo[a17];
};
H.getAll = function() {
  return V.filter(function(a17) {
    return a17.vars.id !== "ScrollSmoother";
  });
};
H.isScrolling = function() {
  return !!Ge;
};
H.snapDirectional = ws;
H.addEventListener = function(a17, t) {
  var i = ci[a17] || (ci[a17] = []);
  ~i.indexOf(t) || i.push(t);
};
H.removeEventListener = function(a17, t) {
  var i = ci[a17], e = i && i.indexOf(t);
  e >= 0 && i.splice(e, 1);
};
H.batch = function(a17, t) {
  var i = [], e = {}, r = t.interval || 0.016, n = t.batchMax || 1e9, o = function(c, d) {
    var p = [], u = [], f = B.delayedCall(r, function() {
      d(p, u), p = [], u = [];
    }).pause();
    return function(x) {
      p.length || f.restart(true), p.push(x.trigger), u.push(x), n <= p.length && f.progress(1);
    };
  }, s;
  for (s in t) e[s] = s.substr(0, 2) === "on" && ee(t[s]) && s !== "onRefreshInit" ? o(s, t[s]) : t[s];
  return ee(n) && (n = n(), zt(H, "refresh", function() {
    return n = t.batchMax();
  })), xn(a17).forEach(function(l) {
    var c = {};
    for (s in e) c[s] = e[s];
    c.trigger = l, i.push(H.create(c));
  }), i;
};
var na = function(t, i, e, r) {
  return i > r ? t(r) : i < 0 && t(0), e > r ? (r - i) / (e - i) : e < 0 ? i / (i - e) : 1;
}, To = function a16(t, i) {
  i === true ? t.style.removeProperty("touch-action") : t.style.touchAction = i === true ? "auto" : i ? "pan-" + i + (St.isTouch ? " pinch-zoom" : "") : "none", t === Se && a16(ot, i);
}, Bn = { auto: 1, scroll: 1 }, ud = function(t) {
  var i = t.event, e = t.target, r = t.axis, n = (i.changedTouches ? i.changedTouches[0] : i).target, o = n._gsap || B.core.getCache(n), s = jt(), l;
  if (!o._isScrollT || s - o._isScrollT > 2e3) {
    for (; n && n !== ot && (n.scrollHeight <= n.clientHeight && n.scrollWidth <= n.clientWidth || !(Bn[(l = Fe(n)).overflowY] || Bn[l.overflowX])); ) n = n.parentNode;
    o._isScroll = n && n !== e && !li(n) && (Bn[(l = Fe(n)).overflowY] || Bn[l.overflowX]), o._isScrollT = s;
  }
  (o._isScroll || r === "x") && (i.stopPropagation(), i._gsapAllow = true);
}, Pl = function(t, i, e, r) {
  return St.create({ target: t, capture: true, debounce: false, lockAxis: true, type: i, onWheel: r = r && ud, onPress: r, onDrag: r, onScroll: r, onEnable: function() {
    return e && zt(st, St.eventTypes[0], sa, false, true);
  }, onDisable: function() {
    return Ft(st, St.eventTypes[0], sa, true);
  } });
}, hd = /(input|label|select|textarea)/i, oa, sa = function(t) {
  var i = hd.test(t.target.tagName);
  (i || oa) && (t._gsapAllow = true, oa = i);
}, pd = function(t) {
  Zr(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = true, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var i = t, e = i.normalizeScrollX, r = i.momentum, n = i.allowNestedScroll, o = i.onRelease, s, l, c = he(t.target) || Se, d = B.core.globals().ScrollSmoother, p = d && d.get(), u = Mr && (t.content && he(t.content) || p && t.content !== false && !p.smooth() && p.content()), f = Br(c, It), x = Br(c, fe), g = 1, b = (St.isTouch && J.visualViewport ? J.visualViewport.scale * J.visualViewport.width : J.outerWidth) / J.innerWidth, k = 0, w = ee(r) ? function() {
    return r(s);
  } : function() {
    return r || 2.8;
  }, m, _, C = Pl(c, t.type, true, n), S = function() {
    return _ = false;
  }, v = tr, y = tr, T = function() {
    l = ir(c, It), y = nn(Mr ? 1 : 0, l), e && (v = nn(0, ir(c, fe))), m = ai;
  }, M = function() {
    u._gsap.y = qi(parseFloat(u._gsap.y) + f.offset) + "px", u.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(u._gsap.y) + ", 0, 1)", f.offset = f.cacheID = 0;
  }, R = function() {
    if (_) {
      requestAnimationFrame(S);
      var G = qi(s.deltaY / 2), tt = y(f.v - G);
      if (u && tt !== f.v + f.offset) {
        f.offset = tt - f.v;
        var A = qi((parseFloat(u && u._gsap.y) || 0) - f.offset);
        u.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + A + ", 0, 1)", u._gsap.y = A + "px", f.cacheID = q.cache, _r();
      }
      return true;
    }
    f.offset && M(), _ = true;
  }, P, E, L, D, F = function() {
    T(), P.isActive() && P.vars.scrollY > l && (f() > l ? P.progress(1) && f(l) : P.resetTo("scrollY", l));
  };
  return u && B.set(u, { y: "+=0" }), t.ignoreCheck = function($) {
    return Mr && $.type === "touchmove" && R() || g > 1.05 && $.type !== "touchstart" || s.isGesturing || $.touches && $.touches.length > 1;
  }, t.onPress = function() {
    _ = false;
    var $ = g;
    g = qi((J.visualViewport && J.visualViewport.scale || 1) / b), P.pause(), $ !== g && To(c, g > 1.01 ? true : e ? false : "x"), E = x(), L = f(), T(), m = ai;
  }, t.onRelease = t.onGestureStart = function($, G) {
    if (f.offset && M(), !G) D.restart(true);
    else {
      q.cache++;
      var tt = w(), A, Z;
      e && (A = x(), Z = A + tt * 0.05 * -$.velocityX / 0.227, tt *= na(x, A, Z, ir(c, fe)), P.vars.scrollX = v(Z)), A = f(), Z = A + tt * 0.05 * -$.velocityY / 0.227, tt *= na(f, A, Z, ir(c, It)), P.vars.scrollY = y(Z), P.invalidate().duration(tt).play(0.01), (Mr && P.vars.scrollY >= l || A >= l - 1) && B.to({}, { onUpdate: F, duration: tt });
    }
    o && o($);
  }, t.onWheel = function() {
    P._ts && P.pause(), jt() - k > 1e3 && (m = 0, k = jt());
  }, t.onChange = function($, G, tt, A, Z) {
    if (ai !== m && T(), G && e && x(v(A[2] === G ? E + ($.startX - $.x) : x() + G - A[1])), tt) {
      f.offset && M();
      var Tt = Z[2] === tt, Ht = Tt ? L + $.startY - $.y : f() + tt - Z[1], lt = y(Ht);
      Tt && Ht !== lt && (L += lt - Ht), f(lt);
    }
    (tt || G) && _r();
  }, t.onEnable = function() {
    To(c, e ? false : "x"), H.addEventListener("refresh", F), zt(J, "resize", F), f.smooth && (f.target.style.scrollBehavior = "auto", f.smooth = x.smooth = false), C.enable();
  }, t.onDisable = function() {
    To(c, true), Ft(J, "resize", F), H.removeEventListener("refresh", F), C.kill();
  }, t.lockAxis = t.lockAxis !== false, s = new St(t), s.iOS = Mr, Mr && !f() && f(1), Mr && B.ticker.add(tr), D = s._dc, P = B.to(s, { ease: "power4", paused: true, inherit: false, scrollX: e ? "+=0.1" : "+=0", scrollY: "+=0.1", modifiers: { scrollY: Tl(f, f(), function() {
    return P.pause();
  }) }, onUpdate: _r, onComplete: D.vars.onComplete }), s;
};
H.sort = function(a17) {
  if (ee(a17)) return V.sort(a17);
  var t = J.pageYOffset || 0;
  return H.getAll().forEach(function(i) {
    return i._sortY = i.trigger ? t + i.trigger.getBoundingClientRect().top : i.start + J.innerHeight;
  }), V.sort(a17 || function(i, e) {
    return (i.vars.refreshPriority || 0) * -1e6 + (i.vars.containerAnimation ? 1e6 : i._sortY) - ((e.vars.containerAnimation ? 1e6 : e._sortY) + (e.vars.refreshPriority || 0) * -1e6);
  });
};
H.observe = function(a17) {
  return new St(a17);
};
H.normalizeScroll = function(a17) {
  if (typeof a17 > "u") return le;
  if (a17 === true && le) return le.enable();
  if (a17 === false) {
    le && le.kill(), le = a17;
    return;
  }
  var t = a17 instanceof St ? a17 : pd(a17);
  return le && le.target === t.target && le.kill(), li(t.target) && (le = t), t;
};
H.core = { _getVelocityProp: Xo, _inputObserver: Pl, _scrollers: q, _proxies: nr, bridge: { ss: function() {
  Ge || di("scrollStart"), Ge = jt();
}, ref: function() {
  return Kt;
} } };
_l() && B.registerPlugin(H);
const ht = [{ fill: "#ff8a4c", soft: "rgba(255, 138, 76, 0.32)", glow: "rgba(255, 138, 76, 0.18)", ink: "#ffb38a" }, { fill: "#e0a64b", soft: "rgba(224, 166, 75, 0.32)", glow: "rgba(224, 166, 75, 0.18)", ink: "#f0c47a" }, { fill: "#34d399", soft: "rgba(52, 211, 153, 0.32)", glow: "rgba(52, 211, 153, 0.18)", ink: "#7eecbf" }, { fill: "#22d3ee", soft: "rgba(34, 211, 238, 0.32)", glow: "rgba(34, 211, 238, 0.18)", ink: "#7ce8f5" }, { fill: "#06b6d4", soft: "rgba(6, 182, 212, 0.32)", glow: "rgba(6, 182, 212, 0.18)", ink: "#5fd5e8" }, { fill: "#f59e0b", soft: "rgba(245, 158, 11, 0.32)", glow: "rgba(245, 158, 11, 0.18)", ink: "#fac35d" }, { fill: "#10b981", soft: "rgba(16, 185, 129, 0.32)", glow: "rgba(16, 185, 129, 0.18)", ink: "#5fd9b0" }, { fill: "#60a5fa", soft: "rgba(96, 165, 250, 0.32)", glow: "rgba(96, 165, 250, 0.18)", ink: "#a3c7fc" }, { fill: "#f97316", soft: "rgba(249, 115, 22, 0.32)", glow: "rgba(249, 115, 22, 0.18)", ink: "#fba968" }, { fill: "#818cf8", soft: "rgba(129, 140, 248, 0.32)", glow: "rgba(129, 140, 248, 0.18)", ink: "#b4bbfb" }, { fill: "#a855f7", soft: "rgba(168, 85, 247, 0.32)", glow: "rgba(168, 85, 247, 0.18)", ink: "#cd96fb" }, { fill: "#fbbf24", soft: "rgba(251, 191, 36, 0.32)", glow: "rgba(251, 191, 36, 0.18)", ink: "#fcd57c" }], at = { standard: "power2.inOut", entrance: "power3.out" }, Kr = "2026-05", qe = typeof window > "u" ? false : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
class gd {
  constructor() {
    __publicField(this, "entries", /* @__PURE__ */ new Map());
    __publicField(this, "visibility", /* @__PURE__ */ new Map());
    __publicField(this, "active", null);
    __publicField(this, "rafId", 0);
    __publicField(this, "last", 0);
    __publicField(this, "start", 0);
    __publicField(this, "observer", null);
  }
  register(t, i, e) {
    this.entries.set(t, { hook: i, section: e }), this.attachObserver(), this.observer.observe(e);
  }
  unregister(t) {
    const i = this.entries.get(t);
    i && this.observer && this.observer.unobserve(i.section), this.entries.delete(t), this.visibility.delete(t), this.active === t && (this.active = null);
  }
  begin() {
    if (qe || this.rafId) return;
    this.start = performance.now(), this.last = this.start;
    const t = (i) => {
      const e = Math.min(0.05, (i - this.last) / 1e3);
      this.last = i;
      const r = (i - this.start) / 1e3;
      if (this.active !== null) {
        const n = this.entries.get(this.active);
        if (n) try {
          n.hook(r, e);
        } catch (o) {
          console.error(o);
        }
      }
      this.rafId = requestAnimationFrame(t);
    };
    this.rafId = requestAnimationFrame(t);
  }
  stop() {
    this.rafId && cancelAnimationFrame(this.rafId), this.rafId = 0;
  }
  attachObserver() {
    this.observer || (this.observer = new IntersectionObserver((t) => {
      for (const e of t) {
        const r = parseInt(e.target.id.replace("level-", ""));
        this.entries.has(r) && (e.isIntersecting && e.intersectionRatio > 0 ? this.visibility.set(r, e.intersectionRatio) : this.visibility.delete(r));
      }
      let i = null;
      for (const [e, r] of this.visibility) (!i || r > i.ratio) && (i = { id: e, ratio: r });
      this.active = (i == null ? void 0 : i.id) ?? null;
    }, { threshold: [0.25, 0.5, 0.75] }));
  }
}
const Al = new gd(), Rl = "http://www.w3.org/2000/svg", rt = 800, Nt = 500;
function zr() {
  const a17 = document.createElementNS(Rl, "svg");
  return a17.setAttribute("viewBox", `0 0 ${rt} ${Nt}`), a17.setAttribute("preserveAspectRatio", "xMidYMid meet"), a17.style.width = "100%", a17.style.height = "100%", a17;
}
function h(a17, t) {
  const i = document.createElementNS(Rl, a17);
  for (const [e, r] of Object.entries(t)) i.setAttribute(e, String(r));
  return i;
}
function U(a17, t, i, e, r = "#fff", n = "middle", o = "Inter, sans-serif") {
  const s = h("text", { x: a17, y: t, fill: r, "font-size": e, "text-anchor": n, "font-family": o });
  return s.textContent = i, s;
}
function lo(a17) {
  const t = document.createElement("canvas"), i = Math.min(window.devicePixelRatio || 1, 2);
  t.width = rt * i, t.height = Nt * i, a17.appendChild(t);
  const e = t.getContext("2d");
  return e.scale(i, i), { canvas: t, ctx: e };
}
function co(a17, t = 0.02) {
  a17.fillStyle = `rgba(255,255,255,${t})`;
  for (let i = 0; i < Nt; i += 4) a17.fillRect(0, i, rt, 1);
}
function ui(a17, t) {
  a17.appendChild(h("rect", { x: 0, y: 0, width: rt, height: Nt, fill: t }));
}
function Nr(a17) {
  const t = h("defs", {});
  return a17.appendChild(t), t;
}
function sr(a17, t, i) {
  const e = h("filter", { id: t, x: "-50%", y: "-50%", width: "200%", height: "200%" });
  e.appendChild(h("feGaussianBlur", { stdDeviation: i })), a17.appendChild(e);
}
function Gr(a17, t, i = 3, e = 2, r = 0.45) {
  const n = h("filter", { id: t, x: "-30%", y: "-30%", width: "160%", height: "160%" });
  n.appendChild(h("feGaussianBlur", { in: "SourceAlpha", stdDeviation: i })), n.appendChild(h("feOffset", { dx: 0, dy: e }));
  const o = h("feComponentTransfer", {}), s = h("feFuncA", { type: "linear", slope: r });
  o.appendChild(s), n.appendChild(o);
  const l = h("feMerge", {});
  l.appendChild(h("feMergeNode", {}));
  const c = h("feMergeNode", {});
  c.setAttribute("in", "SourceGraphic"), l.appendChild(c), n.appendChild(l), a17.appendChild(n);
}
function fo(a17, t) {
  const i = document.createElement("div");
  return i.className = "vignette-hint", i.textContent = t, a17.appendChild(i), i;
}
function uo(a17, t = 1800) {
  setTimeout(() => a17.classList.add("show"), t);
}
function Ye(a17, t, i) {
  qe || Al.register(a17, i, t);
}
function _d(a17, t, i) {
  return ({ 1: yd, 2: xd, 3: bd, 4: vd, 5: wd, 6: Cd, 7: kd, 8: Md, 9: Sd, 10: Td, 11: Pd, 12: Ad }[a17] ?? md)(t, i);
}
function md(a17, t) {
  return nt.timeline();
}
function yd(a17, t) {
  const i = ht[0], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "glow1", 22), sr(r, "glow1s", 8), Gr(r, "shadow1", 3, 2, 0.5);
  const n = h("linearGradient", { id: "mercuryG", x1: 0, y1: 0, x2: 0, y2: 1 });
  n.appendChild(h("stop", { offset: "0%", "stop-color": i.fill })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#a83a16" })), r.appendChild(n), ui(e, "#0e1025"), e.appendChild(h("line", { x1: 0, y1: 425, x2: rt, y2: 425, stroke: "#1a1d3a", "stroke-width": 1 })), e.appendChild(h("line", { x1: 0, y1: 426, x2: rt, y2: 426, stroke: "#0a0c1c", "stroke-width": 1 }));
  const o = h("g", { transform: "translate(150, 60)", filter: "url(#shadow1)" });
  o.appendChild(h("rect", { x: 0, y: 0, width: 30, height: 260, rx: 15, fill: "#181a35", stroke: "#252850", "stroke-width": 1 }));
  const s = h("radialGradient", { id: "bulbG", cx: "40%", cy: "40%", r: "60%" });
  s.appendChild(h("stop", { offset: "0%", "stop-color": "#ffb37a" })), s.appendChild(h("stop", { offset: "100%", "stop-color": i.fill })), r.appendChild(s), o.appendChild(h("circle", { cx: 15, cy: 290, r: 26, fill: "url(#bulbG)" }));
  const l = h("rect", { x: 7, y: 200, width: 16, height: 60, rx: 8, fill: "url(#mercuryG)" });
  o.appendChild(l);
  for (let P = 0; P < 7; P++) o.appendChild(h("line", { x1: 32, y1: 18 + P * 38, x2: 44, y2: 18 + P * 38, stroke: "#3a3d65", "stroke-width": 1 }));
  const c = U(15, -8, "68\xB0F", 17, "#aab3cc", "middle", "JetBrains Mono, monospace");
  o.appendChild(c), e.appendChild(o);
  const d = 410, p = 200, u = 78, f = h("g", { transform: `translate(${d}, ${p})`, filter: "url(#shadow1)" });
  f.appendChild(h("circle", { cx: 0, cy: 0, r: u + 6, fill: "#0e1228", stroke: "#22264a", "stroke-width": 1 })), f.appendChild(h("circle", { cx: 0, cy: 0, r: u, fill: "#141738", stroke: "#2c305c", "stroke-width": 1.5 }));
  for (let P = 0; P <= 24; P++) {
    const E = -Math.PI * 0.85 + P / 24 * Math.PI * 1.7, L = P % 6 === 0 ? u - 14 : u - 8;
    f.appendChild(h("line", { x1: Math.cos(E) * (u - 4), y1: Math.sin(E) * (u - 4), x2: Math.cos(E) * L, y2: Math.sin(E) * L, stroke: P % 6 === 0 ? "#5a5e8a" : "#2c305c", "stroke-width": P % 6 === 0 ? 1.5 : 1 }));
  }
  const x = h("line", { x1: 0, y1: 0, x2: 0, y2: -60, stroke: "#5fd9b0", "stroke-width": 2, "stroke-linecap": "round" });
  f.appendChild(x);
  const g = h("line", { x1: 0, y1: 0, x2: 0, y2: -56, stroke: i.fill, "stroke-width": 3, "stroke-linecap": "round" });
  f.appendChild(g), f.appendChild(h("circle", { cx: 0, cy: 0, r: 5, fill: "#fff" }));
  const b = U(0, u + 20, "SET 68\xB0", 9, "#5fd9b0", "middle", "JetBrains Mono, monospace");
  f.appendChild(b);
  const k = U(0, -u - 16, "68\xB0", 11, i.ink, "middle", "JetBrains Mono, monospace");
  f.appendChild(k);
  const w = h("circle", { cx: 0, cy: u / 2 + 4, r: 4, fill: "#444" });
  f.appendChild(w), e.appendChild(f);
  const m = h("g", { transform: "translate(580, 158)", filter: "url(#shadow1)" });
  for (let P = 0; P < 6; P++) m.appendChild(h("rect", { x: P * 24, y: 0, width: 16, height: 175, rx: 4, fill: "#1a1d38", stroke: "#2c305c", "stroke-width": 1 }));
  m.appendChild(h("rect", { x: -4, y: -8, width: 156, height: 8, rx: 2, fill: "#22264a" })), m.appendChild(h("rect", { x: -4, y: 175, width: 156, height: 8, rx: 2, fill: "#22264a" }));
  const _ = h("rect", { x: -25, y: -25, width: 184, height: 220, rx: 14, fill: i.fill, opacity: 0, filter: "url(#glow1)" });
  m.insertBefore(_, m.firstChild);
  const C = [];
  for (let P = 0; P < 3; P++) {
    const E = h("path", { d: "", stroke: i.fill, "stroke-width": 1, fill: "none", opacity: 0 });
    m.appendChild(E), C.push(E);
  }
  e.appendChild(m);
  const S = h("line", { x1: 200, y1: 200, x2: 332, y2: 200, stroke: "#7cd1ff", "stroke-width": 1.2, "stroke-dasharray": "4 4", opacity: 0 }), v = h("line", { x1: 488, y1: 200, x2: 580, y2: 200, stroke: i.fill, "stroke-width": 1.2, "stroke-dasharray": "4 4", opacity: 0 });
  e.appendChild(S), e.appendChild(v), e.appendChild(U(155, 410, "SENSOR", 11, "rgba(255,255,255,0.32)", "middle", "JetBrains Mono, monospace")), e.appendChild(U(410, 410, "CONTROLLER", 11, "rgba(255,255,255,0.32)", "middle", "JetBrains Mono, monospace")), e.appendChild(U(656, 410, "ACTUATOR", 11, "rgba(255,255,255,0.32)", "middle", "JetBrains Mono, monospace"));
  const y = fo(a17, "click dial to set target");
  uo(y, 2400);
  let T = 68;
  f.style.cursor = "pointer", f.style.pointerEvents = "all", f.addEventListener("click", (P) => {
    const E = e.getBoundingClientRect(), L = (P.clientX - E.left) * (rt / E.width) - d, D = (P.clientY - E.top) * (Nt / E.height) - p;
    let $ = (Math.atan2(D, L) + Math.PI * 0.85) / (Math.PI * 1.7);
    $ = Math.max(0, Math.min(1, $)), T = Math.round(50 + $ * 36);
    const G = -Math.PI * 0.85 + (T - 50) / 36 * Math.PI * 1.7;
    x.setAttribute("x2", String(Math.cos(G - Math.PI / 2) * (u - 18))), x.setAttribute("y2", String(Math.sin(G - Math.PI / 2) * (u - 18))), b.textContent = `SET ${T}\xB0`, y.classList.remove("show");
  });
  const M = nt.timeline();
  M.to(l, { attr: { y: 220, height: 35 }, duration: 0.18, ease: at.standard }).call(() => {
    c.textContent = "62\xB0F", k.textContent = "62\xB0";
  }, [], 0.06).call(() => {
    c.textContent = "59\xB0F", k.textContent = "59\xB0";
  }, [], 0.14).to(S, { opacity: 0.7, duration: 0.06 }, 0.16).call(() => {
    w.setAttribute("fill", "#5fd9b0");
  }, [], 0.2).to(v, { opacity: 0.7, duration: 0.06 }, 0.24).to(_, { attr: { opacity: 0.32 }, duration: 0.22, ease: at.entrance }, 0.28).to(l, { attr: { y: 110, height: 145 }, duration: 0.34, ease: at.standard }, 0.32).call(() => {
    c.textContent = "64\xB0F", k.textContent = "64\xB0";
  }, [], 0.42).call(() => {
    c.textContent = "68\xB0F", k.textContent = "68\xB0";
  }, [], 0.52).call(() => {
    c.textContent = "72\xB0F", k.textContent = "72\xB0";
  }, [], 0.62).to(S, { opacity: 0.3, duration: 0.04 }, 0.66).call(() => {
    w.setAttribute("fill", "#444");
  }, [], 0.68).to(_, { attr: { opacity: 0 }, duration: 0.18 }, 0.7).to(v, { opacity: 0, duration: 0.1 }, 0.74).to(S, { opacity: 0, duration: 0.1 }, 0.78).to(l, { attr: { y: 165, height: 90 }, duration: 0.16, ease: at.standard }, 0.82).call(() => {
    c.textContent = "68\xB0F", k.textContent = "68\xB0";
  }, [], 0.94);
  let R = 0;
  return Ye(1, t, (P) => {
    const E = T, L = 4, D = P * 0.18 % 1, F = E - L * 0.5 + Math.sin(D * Math.PI * 2) * L * 0.55 + Math.sin(P * 0.08) * 0.6;
    c.textContent = `${Math.round(F)}\xB0F`, k.textContent = `${Math.round(F)}\xB0`;
    const $ = Math.max(0, Math.min(1, (F - 50) / 36)), G = 20 + $ * 170;
    l.setAttribute("y", String(260 - G)), l.setAttribute("height", String(G));
    const tt = -Math.PI * 0.85 + $ * Math.PI * 1.7;
    g.setAttribute("x2", String(Math.cos(tt - Math.PI / 2) * (u - 22))), g.setAttribute("y2", String(Math.sin(tt - Math.PI / 2) * (u - 22)));
    const A = F < E - 0.5 ? 1 : F > E + 0.5 ? 0 : R;
    if (R = A, _.setAttribute("opacity", String(A ? 0.28 + Math.sin(P * 4) * 0.05 : 0)), w.setAttribute("fill", A ? "#5fd9b0" : "#444"), S.setAttribute("opacity", String(0.25 + Math.sin(P * 3) * 0.15)), v.setAttribute("opacity", String(A ? 0.4 + Math.sin(P * 3 + 1) * 0.2 : 0.05)), A) for (let Z = 0; Z < C.length; Z++) {
      const Tt = 25 + Z * 50;
      let Ht = `M 0 ${Tt}`;
      for (let lt = 0; lt <= 148; lt += 8) {
        const Et = Tt + Math.sin(lt * 0.06 + P * 2 + Z) * 2;
        Ht += ` L ${lt} ${Et}`;
      }
      C[Z].setAttribute("d", Ht), C[Z].setAttribute("opacity", "0.18");
    }
    else for (const Z of C) Z.setAttribute("opacity", "0");
  }), M;
}
function xd(a17, t) {
  const i = ht[1], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "glow2", 12), Gr(r, "shadow2", 4, 4, 0.55);
  const n = h("linearGradient", { id: "skyG2", x1: 0, y1: 0, x2: 0, y2: 1 });
  n.appendChild(h("stop", { offset: "0%", "stop-color": "#0d1129" })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#070914" })), r.appendChild(n), ui(e, "#070914");
  const o = h("rect", { x: 0, y: 0, width: rt, height: 320, fill: "url(#skyG2)" });
  e.appendChild(o);
  const s = h("path", { d: "M0,300 Q200,260 400,290 T800,275 L800,320 L0,320 Z", fill: "#0c1023", opacity: 0.7 });
  e.appendChild(s);
  const l = h("path", { d: "M0,310 Q150,285 350,305 T800,300 L800,320 L0,320 Z", fill: "#0e1126" });
  e.appendChild(l);
  const c = h("g", {});
  c.appendChild(h("rect", { x: 0, y: 320, width: rt, height: 180, fill: "#101428" })), c.appendChild(h("line", { x1: 0, y1: 320, x2: rt, y2: 320, stroke: "#222445", "stroke-width": 1.5 })), c.appendChild(h("line", { x1: 0, y1: 322, x2: rt, y2: 322, stroke: "#0c0e20", "stroke-width": 1 }));
  const d = h("g", {});
  for (let M = -1; M < 14; M++) d.appendChild(h("rect", { x: M * 62, y: 415, width: 36, height: 4, rx: 2, fill: "#3a3d65", opacity: 0.6 }));
  c.appendChild(d), e.appendChild(c);
  const u = h("g", { transform: "translate(280, 330)", filter: "url(#shadow2)" });
  u.appendChild(h("ellipse", { cx: 80, cy: 86, rx: 70, ry: 8, fill: "rgba(0,0,0,0.5)" })), u.appendChild(h("path", { d: "M0,52 L18,32 L142,32 L160,52 L160,72 L0,72 Z", fill: "#2a2d4d", stroke: "#3a3d65", "stroke-width": 1 })), u.appendChild(h("path", { d: "M22,32 L40,8 L120,8 L138,32 Z", fill: "#161830", stroke: "#3a3d65", "stroke-width": 1 })), u.appendChild(h("path", { d: "M28,28 L42,12 L118,12 L132,28 Z", fill: "rgba(120, 160, 220, 0.18)" })), u.appendChild(h("circle", { cx: 36, cy: 76, r: 13, fill: "#0a0a14", stroke: "#3a3d65", "stroke-width": 2 })), u.appendChild(h("circle", { cx: 124, cy: 76, r: 13, fill: "#0a0a14", stroke: "#3a3d65", "stroke-width": 2 })), u.appendChild(h("circle", { cx: 36, cy: 76, r: 5, fill: "#22264a" })), u.appendChild(h("circle", { cx: 124, cy: 76, r: 5, fill: "#22264a" }));
  const f = h("rect", { x: 156, y: 44, width: 8, height: 14, rx: 2, fill: "#ffd97a" });
  u.appendChild(f), u.appendChild(h("ellipse", { cx: 168, cy: 51, rx: 22, ry: 6, fill: "#ffd97a", opacity: 0.18, filter: "url(#glow2)" }));
  const x = h("rect", { x: 24, y: 38, width: 100, height: 16, rx: 6, fill: i.fill, opacity: 0, filter: "url(#glow2)" });
  u.appendChild(x), e.appendChild(u);
  const k = h("g", { transform: "translate(680, 130)", filter: "url(#shadow2)" });
  k.appendChild(h("circle", { cx: 0, cy: 0, r: 62, fill: "rgba(0,0,0,0.55)", stroke: "#22264a", "stroke-width": 1.5 })), k.appendChild(h("circle", { cx: 0, cy: 0, r: 4, fill: "#fff" }));
  for (let M = 0; M <= 10; M++) {
    const R = -Math.PI * 0.8 + M / 10 * Math.PI * 1.6;
    k.appendChild(h("line", { x1: Math.cos(R) * 48, y1: Math.sin(R) * 48, x2: Math.cos(R) * 56, y2: Math.sin(R) * 56, stroke: M === 0 || M === 10 ? "#5a5e8a" : "#3a3d65", "stroke-width": M % 2 === 0 ? 1.6 : 1 }));
  }
  const w = -Math.PI * 0.8 + 0.65 * Math.PI * 1.6;
  k.appendChild(h("line", { x1: Math.cos(w) * 44, y1: Math.sin(w) * 44, x2: Math.cos(w) * 58, y2: Math.sin(w) * 58, stroke: "#5fd9b0", "stroke-width": 2.5 }));
  const m = h("line", { x1: 0, y1: 0, x2: Math.cos(w) * 40, y2: Math.sin(w) * 40, stroke: i.fill, "stroke-width": 2.5, "stroke-linecap": "round" });
  k.appendChild(m), k.appendChild(U(0, 30, "65", 18, i.ink, "middle", "JetBrains Mono, monospace")), k.appendChild(U(0, 46, "MPH", 8, "#5a5e8a")), e.appendChild(k), e.appendChild(U(680, 220, "SET 65 \xB7 ACT 65", 10, "#5fd9b0", "middle", "JetBrains Mono, monospace"));
  const _ = U(680, 234, "", 9, i.ink, "middle", "JetBrains Mono, monospace");
  e.appendChild(_);
  const C = U(140, 290, "", 12, "rgba(255,255,255,0.4)", "middle", "JetBrains Mono, monospace");
  e.appendChild(C);
  let S = 65, v = 65;
  function y(M) {
    const R = Math.max(0, Math.min(1, (M - 0) / 100)), P = -Math.PI * 0.8 + R * Math.PI * 1.6;
    m.setAttribute("x2", String(Math.cos(P) * 40)), m.setAttribute("y2", String(Math.sin(P) * 40));
  }
  const T = nt.timeline();
  return T.set(C, { textContent: "flat road" }).to({}, { duration: 0.1 }).call(() => {
    C.textContent = "\u25B2 uphill \u2014 throttle up", _.textContent = "62 mph (closing)";
  }).to(s, { attr: { d: "M0,310 Q200,275 400,295 T800,290 L800,320 L0,320 Z" }, duration: 0.18, ease: at.standard }, 0.12).to(l, { attr: { d: "M0,316 Q150,290 350,310 T800,310 L800,320 L0,320 Z" }, duration: 0.18, ease: at.standard }, 0.12).to(u, { attr: { transform: "translate(280, 326) rotate(-2.2 80 50)" }, duration: 0.18, ease: at.standard }, 0.14).call(() => {
    y(58);
  }, [], 0.18).to(x, { attr: { opacity: 0.55 }, duration: 0.16 }, 0.18).call(() => {
    y(67);
  }, [], 0.32).call(() => {
    y(65), _.textContent = "65 mph (locked)";
  }, [], 0.42).to({}, { duration: 0.05 }).call(() => {
    C.textContent = "\u25BC downhill \u2014 ease off", _.textContent = "68 mph (braking)";
  }, [], 0.5).to(s, { attr: { d: "M0,295 Q200,255 400,285 T800,265 L800,320 L0,320 Z" }, duration: 0.18, ease: at.standard }, 0.5).to(l, { attr: { d: "M0,308 Q150,282 350,302 T800,294 L800,320 L0,320 Z" }, duration: 0.18, ease: at.standard }, 0.5).to(u, { attr: { transform: "translate(280, 332) rotate(2.2 80 50)" }, duration: 0.18, ease: at.standard }, 0.5).call(() => {
    y(70);
  }, [], 0.55).to(x, { attr: { opacity: 0 }, duration: 0.14 }, 0.54).call(() => {
    y(65), _.textContent = "65 mph (locked)";
  }, [], 0.7).to({}, { duration: 0.05 }).call(() => {
    C.textContent = "flat road", _.textContent = "65 mph (cruise)";
  }, [], 0.84).to(s, { attr: { d: "M0,300 Q200,260 400,290 T800,275 L800,320 L0,320 Z" }, duration: 0.16, ease: at.standard }, 0.84).to(l, { attr: { d: "M0,310 Q150,285 350,305 T800,300 L800,320 L0,320 Z" }, duration: 0.16, ease: at.standard }, 0.84).to(u, { attr: { transform: "translate(280, 330) rotate(0 80 50)" }, duration: 0.14, ease: at.standard }, 0.84), Ye(2, t, (M) => {
    const R = -(M * 90 % 62);
    d.setAttribute("transform", `translate(${R}, 0)`);
    const P = Math.sin(M * 0.15);
    v = S - P * 4 + Math.sin(M * 0.3) * 0.6, y(v), _.textContent = `${Math.round(v)} mph (cruise)`;
    const E = P * 2;
    s.setAttribute("transform", `translate(0, ${E})`);
  }), T;
}
function bd(a17, t) {
  const i = ht[2], { canvas: e, ctx: r } = lo(a17), n = [{ x: 180, y: 70, w: 130, h: 50, type: "sofa" }, { x: 540, y: 290, w: 90, h: 90, type: "table" }, { x: 100, y: 290, w: 60, h: 60, type: "chair" }, { x: 580, y: 80, w: 100, h: 50, type: "box" }];
  let o = [];
  function s(b = 400, k = 250) {
    o = [];
    let w = b, m = k, _ = Math.random() * Math.PI * 2;
    const C = 14;
    for (let S = 0; S < 720; S++) {
      const v = Math.cos(_) * 3, y = Math.sin(_) * 3, T = w + v, M = m + y;
      let R = T - C < 40 || T + C > 760 || M - C < 40 || M + C > 460;
      if (!R) {
        for (const P of n) if (T + C > P.x && T - C < P.x + P.w && M + C > P.y && M - C < P.y + P.h) {
          R = true;
          break;
        }
      }
      R ? _ += Math.PI * (0.3 + Math.random() * 0.9) : (w = T, m = M, _ += 0.018), o.push({ x: w, y: m, angle: _ });
    }
  }
  s();
  const l = { value: 0 };
  let c = 0, d = 0;
  function p(b) {
    if (r.save(), r.translate(b.x, b.y), r.fillStyle = "#1c1f3a", r.strokeStyle = "#2a2e58", r.lineWidth = 1.2, r.shadowColor = "rgba(0,0,0,0.4)", r.shadowBlur = 4, r.shadowOffsetY = 2, b.type === "sofa") {
      r.beginPath(), r.roundRect(0, 0, b.w, b.h, 6), r.fill(), r.stroke(), r.shadowBlur = 0, r.fillStyle = "#252850", r.beginPath(), r.roundRect(4, 4, b.w - 8, 12, 3), r.fill();
      const k = (b.w - 14) / 3;
      for (let w = 0; w < 3; w++) r.beginPath(), r.roundRect(5 + w * (k + 1), 18, k, b.h - 22, 4), r.fill();
    } else b.type === "chair" ? (r.beginPath(), r.roundRect(0, 0, b.w, b.h, 5), r.fill(), r.stroke(), r.shadowBlur = 0, r.fillStyle = "#252850", r.beginPath(), r.roundRect(4, 4, b.w - 8, 14, 3), r.fill()) : b.type === "table" ? (r.beginPath(), r.ellipse(b.w / 2, b.h / 2, b.w / 2 - 2, b.h / 2 - 2, 0, 0, Math.PI * 2), r.fill(), r.stroke(), r.shadowBlur = 0, r.strokeStyle = "#3a3d65", r.beginPath(), r.ellipse(b.w / 2, b.h / 2, b.w / 2 - 8, b.h / 2 - 8, 0, 0, Math.PI * 2), r.stroke()) : (r.beginPath(), r.roundRect(0, 0, b.w, b.h, 4), r.fill(), r.stroke());
    r.restore();
  }
  function u(b) {
    const k = Math.round(20 + b * 30), w = Math.round(180 + b * 25), m = Math.round(180 - b * 70);
    return `rgba(${k}, ${w}, ${m}, 0.07)`;
  }
  function f() {
    r.clearRect(0, 0, rt, Nt), r.fillStyle = "#0a0c1a", r.fillRect(0, 0, rt, Nt), r.fillStyle = "#0e1124", r.fillRect(40, 40, 720, 420), r.strokeStyle = "rgba(255,255,255,0.018)", r.lineWidth = 0.5;
    for (let _ = 60; _ < 460; _ += 40) r.beginPath(), r.moveTo(40, _), r.lineTo(760, _), r.stroke();
    const b = o.length, k = Math.min(b - 1, Math.floor(l.value * b) + d);
    for (let _ = 0; _ < k; _ += 2) {
      const C = _ / b;
      r.fillStyle = u(C), r.beginPath(), r.arc(o[_].x, o[_].y, 16, 0, Math.PI * 2), r.fill();
    }
    const w = Math.max(0, k - 50);
    r.strokeStyle = "rgba(120, 230, 180, 0.32)", r.lineWidth = 2.4, r.lineCap = "round", r.beginPath();
    for (let _ = w; _ < k; _++) _ === w ? r.moveTo(o[_].x, o[_].y) : r.lineTo(o[_].x, o[_].y);
    r.stroke();
    for (const _ of n) p(_);
    if (r.shadowBlur = 0, r.strokeStyle = "#2a2d55", r.lineWidth = 2, r.strokeRect(40, 40, 720, 420), k > 0) {
      const _ = o[Math.min(k - 1, b - 1)];
      r.save(), r.translate(_.x, _.y);
      const C = r.createRadialGradient(0, 0, 0, 0, 0, 30);
      C.addColorStop(0, "rgba(52, 211, 153, 0.28)"), C.addColorStop(1, "rgba(52, 211, 153, 0)"), r.fillStyle = C, r.beginPath(), r.arc(0, 0, 30, 0, Math.PI * 2), r.fill(), r.fillStyle = "#1f2236", r.shadowColor = "rgba(0,0,0,0.5)", r.shadowBlur = 6, r.shadowOffsetY = 2, r.beginPath(), r.arc(0, 0, 14, 0, Math.PI * 2), r.fill(), r.shadowBlur = 0, r.strokeStyle = i.fill, r.lineWidth = 1.6, r.beginPath(), r.arc(0, 0, 14, 0, Math.PI * 2), r.stroke(), r.fillStyle = "#2c3050", r.beginPath(), r.arc(0, 0, 8, 0, Math.PI * 2), r.fill();
      const S = 0.6 + 0.4 * Math.sin(l.value * 30 + d * 0.05);
      r.fillStyle = `rgba(120, 236, 191, ${S})`, r.beginPath(), r.arc(0, 0, 2.2, 0, Math.PI * 2), r.fill(), r.rotate(_.angle), r.fillStyle = i.ink, r.beginPath(), r.arc(11, 0, 2, 0, Math.PI * 2), r.fill(), r.restore();
    }
    co(r, 0.012);
    const m = Math.min(100, Math.round(k / b * 96));
    r.fillStyle = "rgba(120, 236, 191, 0.7)", r.font = "bold 13px JetBrains Mono, monospace", r.textAlign = "right", r.fillText(`Coverage: ${m}%`, 750, 30), r.fillStyle = "rgba(255,255,255,0.32)", r.font = "10px JetBrains Mono, monospace", r.fillText(`Furniture: ${n.length}`, 750, 48);
  }
  f();
  const x = nt.timeline({ onUpdate: f });
  x.to(l, { value: 1, duration: 1, ease: "none", onComplete: () => {
    c = o.length;
  } });
  const g = fo(a17, "click to drop furniture");
  return uo(g, 2400), e.style.cursor = "crosshair", e.addEventListener("click", (b) => {
    const k = e.getBoundingClientRect(), w = (b.clientX - k.left) * (rt / k.width), m = (b.clientY - k.top) * (Nt / k.height);
    if (w < 60 || w > 740 || m < 60 || m > 440) return;
    const _ = ["chair", "table", "box"], C = _[Math.floor(Math.random() * _.length)], S = C === "table" ? 80 : 60, v = C === "table" ? 80 : 60;
    n.push({ x: w - S / 2, y: m - v / 2, w: S, h: v, type: C }), s(w + 80, m), d = 0, g.classList.remove("show"), f();
  }), Ye(3, t, () => {
    if (d += 2, c > 0 && d > o.length * 1.5 && (d = Math.floor(o.length * 0.5), Math.random() < 0.5)) {
      const b = o[o.length - 1];
      s(b.x, b.y);
    }
    f();
  }), x;
}
function vd(a17, t) {
  const i = ht[3], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "glow4", 14), sr(r, "glow4s", 6), Gr(r, "shadow4", 4, 4, 0.55);
  const n = h("linearGradient", { id: "bldgG1", x1: 0, y1: 0, x2: 0, y2: 1 });
  n.appendChild(h("stop", { offset: "0%", "stop-color": "#0a0c1d" })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#0d0f24" })), r.appendChild(n);
  const o = h("linearGradient", { id: "bldgG2", x1: 0, y1: 0, x2: 0, y2: 1 });
  o.appendChild(h("stop", { offset: "0%", "stop-color": "#0d0f25" })), o.appendChild(h("stop", { offset: "100%", "stop-color": "#11132c" })), r.appendChild(o);
  const s = h("linearGradient", { id: "bldgG3", x1: 0, y1: 0, x2: 0, y2: 1 });
  s.appendChild(h("stop", { offset: "0%", "stop-color": "#11132e" })), s.appendChild(h("stop", { offset: "100%", "stop-color": "#161836" })), r.appendChild(s), ui(e, "#040610");
  const l = h("g", { opacity: 0.85 });
  for (let y = 0; y < 11; y++) {
    const T = -10 + y * 75 + y * 13 % 28, M = 25 + y * 23 % 50;
    l.appendChild(h("rect", { x: T, y: 380 - M, width: 22 + y * 7 % 18, height: M + 120, fill: "url(#bldgG1)", rx: 1 }));
  }
  e.appendChild(l);
  const c = h("g", {});
  for (let y = 0; y < 9; y++) {
    const T = 20 + y * 95 + y * 17 % 30, M = 35 + y * 37 % 70;
    c.appendChild(h("rect", { x: T, y: 400 - M, width: 28 + y * 11 % 24, height: M + 100, fill: "url(#bldgG2)", rx: 2 }));
    for (let R = 0; R < Math.floor(M / 10); R++) for (let P = 0; P < 3; P++) (y + R + P) % 5 === 0 && c.appendChild(h("rect", { x: T + 4 + P * 9, y: 400 - M + 4 + R * 10, width: 3, height: 3, fill: "#3a3d65", opacity: 0.5 }));
  }
  e.appendChild(c);
  const d = h("g", {});
  for (let y = 0; y < 5; y++) {
    const T = 60 + y * 175 + y * 23 % 40, M = 70 + y * 41 % 90;
    d.appendChild(h("rect", { x: T, y: 420 - M, width: 50 + y * 13 % 28, height: M + 80, fill: "url(#bldgG3)", rx: 2 }));
  }
  const p = [];
  for (const [y, T] of [[180, 350], [430, 332], [600, 360]]) {
    const M = h("circle", { cx: y, cy: T, r: 2.5, fill: "#ff6b35", opacity: 0.7 });
    d.appendChild(M), p.push(M);
  }
  e.appendChild(d), e.appendChild(h("rect", { x: 0, y: 460, width: rt, height: 40, fill: "#080a18" }));
  const u = h("g", { transform: "translate(370, 200)", filter: "url(#shadow4)" });
  u.appendChild(h("rect", { x: -32, y: -7, width: 64, height: 14, rx: 4, fill: "#252845", stroke: "#3a3d65", "stroke-width": 0.8 })), u.appendChild(h("circle", { cx: 0, cy: 0, r: 6, fill: "#1a1d35" })), u.appendChild(h("circle", { cx: 0, cy: 0, r: 2, fill: "#22c55e" })), u.appendChild(h("line", { x1: -28, y1: 0, x2: -55, y2: -22, stroke: "#3a3d65", "stroke-width": 2.5 })), u.appendChild(h("line", { x1: 28, y1: 0, x2: 55, y2: -22, stroke: "#3a3d65", "stroke-width": 2.5 })), u.appendChild(h("line", { x1: -28, y1: 0, x2: -55, y2: 22, stroke: "#3a3d65", "stroke-width": 2.5 })), u.appendChild(h("line", { x1: 28, y1: 0, x2: 55, y2: 22, stroke: "#3a3d65", "stroke-width": 2.5 }));
  const f = [];
  for (const [y, T] of [[-55, -22], [55, -22], [-55, 22], [55, 22]]) {
    const M = h("ellipse", { cx: y, cy: T, rx: 17, ry: 4, fill: "rgba(124, 232, 245, 0.28)" });
    u.appendChild(M), f.push(M), u.appendChild(h("circle", { cx: y, cy: T, r: 3.5, fill: "#1a1d35", stroke: "#3a3d65", "stroke-width": 0.6 }));
  }
  e.appendChild(u);
  const x = h("g", { transform: "translate(28, 28)", opacity: 0.85 });
  x.appendChild(h("rect", { x: 0, y: 0, width: 152, height: 50, rx: 4, fill: "rgba(0,0,0,0.5)", stroke: "rgba(34, 211, 238, 0.18)", "stroke-width": 1 })), x.appendChild(U(8, 16, "GPS LOCK", 9, "#22c55e", "start", "JetBrains Mono, monospace"));
  const g = U(8, 30, "lat 37.7749", 9, i.ink, "start", "JetBrains Mono, monospace"), b = U(8, 42, "lon -122.4194", 9, i.ink, "start", "JetBrains Mono, monospace");
  x.appendChild(g), x.appendChild(b), e.appendChild(x);
  const k = [];
  for (let y = 0; y < 12; y++) k.push({ x: Math.random() * rt, y: 100 + Math.random() * 200, vx: 0.5 + Math.random() * 1.2, o: 0.3 + Math.random() * 0.4 });
  const w = h("g", { opacity: 0 }), m = [];
  for (const y of k) {
    const T = h("line", { x1: y.x, y1: y.y, x2: y.x - 18, y2: y.y, stroke: "#7cd1ff", "stroke-width": 1, opacity: y.o });
    w.appendChild(T), m.push(T);
  }
  e.appendChild(w);
  const _ = h("g", { transform: "translate(-50, 180)", opacity: 0 });
  _.appendChild(h("path", { d: "M-8,0 Q-2,-5 0,0 Q2,-5 8,0 M-8,0 L0,3 L8,0", fill: "none", stroke: "#888", "stroke-width": 1.5, "stroke-linecap": "round" })), e.appendChild(_);
  const C = nt.timeline();
  C.to(u, { attr: { transform: "translate(370, 196)" }, duration: 0.08, ease: at.standard }).to(u, { attr: { transform: "translate(370, 204)" }, duration: 0.08, ease: at.standard }).to(w, { attr: { opacity: 0.7 }, duration: 0.05 }, 0.18).to(u, { attr: { transform: "translate(415, 208)" }, duration: 0.1, ease: at.standard }, 0.2).to(u, { attr: { transform: "translate(370, 200)" }, duration: 0.1, ease: at.standard }, 0.34).to(w, { attr: { opacity: 0 }, duration: 0.05 }, 0.44).to(_, { attr: { opacity: 1, transform: "translate(280, 175)" }, duration: 0.1 }, 0.54).to(_, { attr: { transform: "translate(420, 170)" }, duration: 0.18, ease: "none" }, 0.62).to(u, { attr: { transform: "translate(370, 145)" }, duration: 0.12, ease: at.standard }, 0.62).to(_, { attr: { transform: "translate(560, 168)" }, duration: 0.15, ease: "none" }, 0.78).to(_, { attr: { opacity: 0 }, duration: 0.06 }, 0.9).to(u, { attr: { transform: "translate(370, 200)" }, duration: 0.1, ease: at.standard }, 0.88);
  let S = 370, v = 200;
  return Ye(4, t, (y, T) => {
    S += (370 - S) * 0.08 + (Math.sin(y * 7) - Math.cos(y * 5)) * 0.3, v += (200 - v) * 0.08 + (Math.sin(y * 9) - Math.cos(y * 11)) * 0.25, u.setAttribute("transform", `translate(${S.toFixed(2)}, ${v.toFixed(2)})`);
    for (let R = 0; R < f.length; R++) {
      const P = 0.18 + Math.abs(Math.sin(y * 22 + R)) * 0.32;
      f[R].setAttribute("fill", `rgba(124, 232, 245, ${P.toFixed(3)})`);
    }
    w.setAttribute("opacity", String(0.35 + Math.sin(y * 0.3) * 0.15));
    for (let R = 0; R < k.length; R++) k[R].x += k[R].vx * T * 60 * 0.6, k[R].x > rt + 20 && (k[R].x = -20), m[R].setAttribute("x1", String(k[R].x)), m[R].setAttribute("x2", String(k[R].x - 18));
    for (let R = 0; R < p.length; R++) {
      const P = (y * 1.2 + R * 0.4) % 2;
      p[R].setAttribute("opacity", String(P < 0.15 ? 1 : 0.25));
    }
    const M = Math.floor(y * 100) % 10;
    g.textContent = `lat 37.774${M}`, b.textContent = "lon -122.4194";
  }), C;
}
function wd(a17, t) {
  const i = ht[4], { ctx: e } = lo(a17), r = 38, n = 19, o = 11, s = 35, l = 35;
  function c(k, w) {
    return { x: s + k * r + r / 2, y: l + w * r + r / 2 };
  }
  function d(k, w, m) {
    return k + (w - k) * m;
  }
  const p = [{ path: [c(2, 2), c(2, 8), c(10, 8), c(10, 3), c(2, 3), c(2, 2)], hl: true, col: i.fill, carry: true }, { path: [c(5, 1), c(5, 5), c(12, 5), c(12, 1)], hl: false, col: "#4a4d75", carry: true }, { path: [c(15, 9), c(15, 4), c(8, 4), c(8, 9)], hl: false, col: "#4a4d75", carry: false }, { path: [c(17, 2), c(17, 7), c(11, 7), c(11, 2)], hl: false, col: "#4a4d75", carry: true }, { path: [c(1, 6), c(7, 6), c(7, 1), c(1, 1)], hl: false, col: "#4a4d75", carry: false }, { path: [c(9, 9), c(15, 9), c(15, 2), c(9, 2)], hl: false, col: "#4a4d75", carry: true }, { path: [c(3, 4), c(3, 9), c(13, 9), c(13, 4)], hl: false, col: "#4a4d75", carry: false }, { path: [c(6, 3), c(6, 7), c(16, 7), c(16, 3)], hl: false, col: "#4a4d75", carry: true }];
  function u(k, w) {
    const m = k.path.length, _ = w * m, C = Math.floor(_) % m, S = _ - Math.floor(_), v = k.path[C], y = k.path[(C + 1) % m], T = d(v.x, y.x, S), M = d(v.y, y.y, S), R = Math.atan2(y.y - v.y, y.x - v.x);
    return { x: T, y: M, angle: R };
  }
  const f = { value: 0 };
  let x = 0;
  function g(k = 0) {
    e.clearRect(0, 0, rt, Nt), e.fillStyle = "#06081a", e.fillRect(0, 0, rt, Nt), e.strokeStyle = "rgba(255,255,255,0.025)", e.lineWidth = 0.5;
    for (let y = 0; y <= n; y++) e.beginPath(), e.moveTo(s + y * r, l), e.lineTo(s + y * r, l + o * r), e.stroke();
    for (let y = 0; y <= o; y++) e.beginPath(), e.moveTo(s, l + y * r), e.lineTo(s + n * r, l + y * r), e.stroke();
    e.fillStyle = "rgba(255,255,255,0.04)";
    for (const [y, T, M, R] of [[4, 1, 2, 3], [7, 1, 2, 3], [10, 5, 2, 3], [13, 1, 2, 3], [4, 6, 2, 3]]) e.fillRect(s + y * r + 3, l + T * r + 3, M * r - 6, R * r - 6);
    const w = (f.value + k * 0.05) % 1;
    e.strokeStyle = "rgba(6, 182, 212, 0.18)", e.lineWidth = 2, e.setLineDash([5, 5]), e.beginPath();
    const m = 80;
    for (let y = 0; y <= m; y++) {
      const T = u(p[0], y / m);
      y === 0 ? e.moveTo(T.x, T.y) : e.lineTo(T.x, T.y);
    }
    e.stroke(), e.setLineDash([]);
    const _ = 14, C = 14, S = 100, v = 24;
    e.fillStyle = "rgba(0,0,0,0.5)", e.strokeStyle = "rgba(6, 182, 212, 0.4)", e.lineWidth = 1, e.beginPath(), e.roundRect(_, C, S, v, 4), e.fill(), e.stroke(), e.fillStyle = i.ink, e.font = "10px JetBrains Mono, monospace", e.textAlign = "left", e.fillText("PLANNER", _ + 8, C + 16), e.fillStyle = `rgba(120, 220, 255, ${0.6 + 0.4 * Math.sin(k * 5)})`, e.beginPath(), e.arc(_ + S - 12, C + 12, 3, 0, Math.PI * 2), e.fill();
    for (let y = 0; y < p.length; y++) {
      const T = p[y], M = u(T, w);
      if ((Math.floor(k * 2) + y) % 7 === 0 && (e.strokeStyle = "rgba(6, 182, 212, 0.18)", e.lineWidth = 0.8, e.setLineDash([2, 4]), e.beginPath(), e.moveTo(_ + S / 2, C + v), e.lineTo(M.x, M.y), e.stroke(), e.setLineDash([])), T.hl) {
        const R = e.createRadialGradient(M.x, M.y, 0, M.x, M.y, 22);
        R.addColorStop(0, "rgba(6, 182, 212, 0.32)"), R.addColorStop(1, "rgba(6, 182, 212, 0)"), e.fillStyle = R, e.beginPath(), e.arc(M.x, M.y, 22, 0, Math.PI * 2), e.fill();
      }
      e.save(), e.translate(M.x, M.y), e.shadowColor = "rgba(0,0,0,0.5)", e.shadowBlur = 4, e.shadowOffsetY = 2, e.fillStyle = T.col, e.fillRect(-7, -7, 14, 14), e.shadowBlur = 0, e.rotate(M.angle), e.fillStyle = T.hl ? i.ink : "#7c80a8", e.beginPath(), e.moveTo(8, 0), e.lineTo(2, -3), e.lineTo(2, 3), e.closePath(), e.fill(), e.restore(), T.carry && (e.fillStyle = "#d97a3a", e.fillRect(M.x - 4, M.y - 11, 8, 5));
    }
    co(e, 0.012), e.fillStyle = "rgba(120, 220, 255, 0.7)", e.font = "bold 12px JetBrains Mono, monospace", e.textAlign = "right", e.fillText(`Active robots: ${p.length}`, 750, 24), e.fillStyle = "rgba(255,255,255,0.36)", e.font = "10px JetBrains Mono, monospace", e.fillText("1,000+ per facility \xB7 zero-collision design", 750, 42);
  }
  g();
  const b = nt.timeline({ onUpdate: () => g() });
  return b.to(f, { value: 1, duration: 1, ease: "none" }), Ye(5, t, (k) => {
    x = k, g(x);
  }), b;
}
function Cd(a17, t) {
  const i = ht[5], e = zr();
  a17.appendChild(e);
  const r = Nr(e), n = h("linearGradient", { id: "sky6", x1: 0, y1: 0, x2: 0, y2: 1 });
  n.appendChild(h("stop", { offset: "0%", "stop-color": "#181c34" })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#0a0c1a" })), r.appendChild(n), sr(r, "glow6", 12), Gr(r, "shadow6", 3, 3, 0.5);
  const o = h("linearGradient", { id: "uncG", x1: 0, y1: 0, x2: 0, y2: 1 });
  o.appendChild(h("stop", { offset: "0%", "stop-color": i.fill, "stop-opacity": 0.05 })), o.appendChild(h("stop", { offset: "100%", "stop-color": "#5fd9b0", "stop-opacity": 0.4 })), r.appendChild(o), ui(e, "#0a0c1a"), e.appendChild(h("rect", { x: 0, y: 0, width: rt, height: 250, fill: "url(#sky6)" }));
  for (let S = 0; S < 30; S++) e.appendChild(h("circle", { cx: Math.random() * rt, cy: Math.random() * 220, r: 0.7, fill: "#fff", opacity: 0.15 + Math.random() * 0.25 }));
  e.appendChild(h("path", { d: "M0,250 L40,230 L60,238 L90,220 L120,228 L150,210 L190,220 L220,232 L260,225 L290,235 L800,250 Z", fill: "#0c0e22" })), e.appendChild(h("polygon", { points: "250,250 550,250 800,500 0,500", fill: "#11132a" }));
  const s = h("line", { x1: 310, y1: 250, x2: 100, y2: 500, stroke: "#252850", "stroke-width": 2 }), l = h("line", { x1: 490, y1: 250, x2: 700, y2: 500, stroke: "#252850", "stroke-width": 2 }), c = h("g", {});
  for (let S = 0; S < 8; S++) c.appendChild(h("rect", { x: 397, y: 270 + S * 32, width: 6, height: 16, rx: 2, fill: "#3a3d65" }));
  e.appendChild(s), e.appendChild(l), e.appendChild(c);
  function d(S, v, y = 1, T = "#252845") {
    const M = h("g", { transform: `translate(${S}, ${v}) scale(${y})`, filter: "url(#shadow6)" });
    return M.appendChild(h("rect", { x: -16, y: -10, width: 32, height: 20, rx: 4, fill: T, stroke: "#3a3d65", "stroke-width": 0.8 })), M.appendChild(h("rect", { x: -10, y: -7, width: 20, height: 8, rx: 2, fill: "#0d0f24" })), M.appendChild(h("circle", { cx: -10, cy: 9, r: 1.6, fill: "#ffe07a" })), M.appendChild(h("circle", { cx: 10, cy: 9, r: 1.6, fill: "#ffe07a" })), M;
  }
  const p = [{ x: 380, y: 290, scale: 0.85 }, { x: 437, y: 320, scale: 1 }, { x: 330, y: 350, scale: 1.1 }];
  for (const S of p) e.appendChild(d(S.x, S.y, S.scale));
  function u(S, v, y, T) {
    const M = h("g", { opacity: 0 }), R = Math.min(y, T) * 0.35, P = 1.8, E = S - y / 2, L = v - T / 2, D = S + y / 2, F = v + T / 2, $ = [[E, L, E + R, L, E, L + R], [D, L, D - R, L, D, L + R], [E, F, E + R, F, E, F - R], [D, F, D - R, F, D, F - R]];
    for (const [G, tt, A, Z, Tt, Ht] of $) M.appendChild(h("line", { x1: G, y1: tt, x2: A, y2: Z, stroke: i.fill, "stroke-width": P, "stroke-linecap": "round" })), M.appendChild(h("line", { x1: G, y1: tt, x2: Tt, y2: Ht, stroke: i.fill, "stroke-width": P, "stroke-linecap": "round" }));
    return M;
  }
  const f = [];
  for (const S of p) {
    const v = 38 * S.scale, y = 26 * S.scale, T = u(S.x, S.y, v, y);
    e.appendChild(T), f.push(T);
  }
  const x = h("line", { x1: 310, y1: 250, x2: 100, y2: 500, stroke: i.fill, "stroke-width": 2, opacity: 0 }), g = h("line", { x1: 490, y1: 250, x2: 700, y2: 500, stroke: i.fill, "stroke-width": 2, opacity: 0 });
  e.appendChild(x), e.appendChild(g);
  const b = h("path", { d: "M380,500 L420,500 L412,260 L388,260 Z", fill: "url(#uncG)", opacity: 0 });
  e.appendChild(b);
  const k = h("path", { d: "M400,500 C400,420 395,350 400,260", fill: "none", stroke: "#5fd9b0", "stroke-width": 2, "stroke-dasharray": "6 4", opacity: 0 });
  e.appendChild(k);
  const w = h("g", { transform: "translate(685, 50)", opacity: 0 });
  w.appendChild(h("rect", { x: -76, y: -22, width: 152, height: 42, rx: 8, fill: "rgba(0,0,0,0.5)", stroke: i.fill, "stroke-width": 1.2 }));
  const m = h("g", { transform: "translate(-58, 0)" });
  m.appendChild(h("circle", { cx: 0, cy: 0, r: 11, fill: "none", stroke: i.fill, "stroke-width": 1.6 })), m.appendChild(h("circle", { cx: 0, cy: 0, r: 2.5, fill: i.fill })), m.appendChild(h("line", { x1: 0, y1: 0, x2: 0, y2: -8, stroke: i.fill, "stroke-width": 1.6 })), m.appendChild(h("line", { x1: 0, y1: 0, x2: -7, y2: 5, stroke: i.fill, "stroke-width": 1.6 })), m.appendChild(h("line", { x1: 0, y1: 0, x2: 7, y2: 5, stroke: i.fill, "stroke-width": 1.6 })), w.appendChild(m), w.appendChild(U(8, -3, "HANDS ON", 9, i.ink, "middle", "JetBrains Mono, monospace")), w.appendChild(U(8, 11, "L2 SUPERVISION", 7, "rgba(255,255,255,0.45)", "middle", "JetBrains Mono, monospace")), e.appendChild(w);
  const _ = U(400, 478, "", 10, i.ink, "middle", "JetBrains Mono, monospace");
  e.appendChild(_);
  const C = nt.timeline();
  return C.to({}, { duration: 0.06 }).to(f, { attr: { opacity: 1 }, duration: 0.1, stagger: 0.04, ease: at.entrance }, 0.06).call(() => {
    _.textContent = "detecting vehicles \u2014 3 tracks";
  }, [], 0.1).to([x, g], { attr: { opacity: 0.85 }, duration: 0.1, stagger: 0.04 }, 0.28).call(() => {
    _.textContent = "tracking lane boundaries";
  }, [], 0.34).to(b, { attr: { opacity: 0.85 }, duration: 0.12 }, 0.46).to(k, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.5).call(() => {
    _.textContent = "path planned \u2014 5s horizon \u2014 monitoring";
  }, [], 0.56).to(w, { opacity: 1, duration: 0.1 }, 0.66), Ye(6, t, (S) => {
    const v = S * 90 % 32;
    c.setAttribute("transform", `translate(0, ${v})`);
    for (const y of f) y.setAttribute("opacity", String(0.7 + Math.sin(S * 2) * 0.18));
    m.setAttribute("transform", `translate(-58, 0) rotate(${Math.sin(S * 0.8) * 12})`);
  }), C;
}
function kd(a17, t) {
  const i = ht[6], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "glow7", 12), Gr(r, "shadow7", 3, 3, 0.5), ui(e, "#0a0c1a");
  for (let R = 0; R < 25; R++) e.appendChild(h("circle", { cx: Math.random() * rt, cy: Math.random() * 200, r: 0.7, fill: "#fff", opacity: 0.1 + Math.random() * 0.2 }));
  e.appendChild(h("polygon", { points: "250,250 550,250 800,500 0,500", fill: "#11132a" })), e.appendChild(h("line", { x1: 310, y1: 250, x2: 100, y2: 500, stroke: i.fill, "stroke-width": 2, opacity: 0.55 })), e.appendChild(h("line", { x1: 490, y1: 250, x2: 700, y2: 500, stroke: i.fill, "stroke-width": 2, opacity: 0.55 }));
  const n = h("g", {});
  for (let R = 0; R < 8; R++) n.appendChild(h("rect", { x: 397, y: 270 + R * 32, width: 6, height: 16, rx: 2, fill: "#3a3d65" }));
  e.appendChild(n);
  const o = 400, s = 470, l = h("g", { transform: `translate(${o}, ${s})`, filter: "url(#shadow7)" });
  l.appendChild(h("rect", { x: -18, y: -12, width: 36, height: 22, rx: 4, fill: "#252845", stroke: "#3a3d65", "stroke-width": 0.8 })), l.appendChild(h("rect", { x: -12, y: -8, width: 24, height: 9, rx: 2, fill: "#0d0f24" })), l.appendChild(h("circle", { cx: -10, cy: -10, r: 1.6, fill: "#ffe07a" })), l.appendChild(h("circle", { cx: 10, cy: -10, r: 1.6, fill: "#ffe07a" })), l.appendChild(h("rect", { x: -3, y: -16, width: 6, height: 6, rx: 1, fill: "#5fd9b0" })), e.appendChild(l);
  const c = h("g", { opacity: 0, transform: `translate(${o}, ${s - 13})` });
  for (let R = 30; R <= 220; R += 22) c.appendChild(h("circle", { cx: 0, cy: 0, r: R, fill: "none", stroke: "#a78bfa", "stroke-width": 0.6, opacity: 0.18 }));
  for (let R = 0; R < 60; R++) {
    const P = -Math.PI + Math.random() * Math.PI, E = 30 + Math.random() * 200;
    c.appendChild(h("circle", { cx: Math.cos(P) * E, cy: Math.sin(P) * E * 0.7, r: 1.1, fill: "#c4b5fd", opacity: 0.35 + Math.random() * 0.5 }));
  }
  e.appendChild(c);
  function d(R, P, E, L, D = 6) {
    const F = h("g", { opacity: 0 });
    F.appendChild(h("rect", { x: R - E / 2, y: P - L / 2, width: E, height: L, fill: "none", stroke: i.fill, "stroke-width": 1.4 })), F.appendChild(h("rect", { x: R - E / 2 + D, y: P - L / 2 - D, width: E, height: L, fill: "none", stroke: i.fill, "stroke-width": 1, opacity: 0.65 }));
    for (const [$, G] of [[-E / 2, -L / 2], [E / 2, -L / 2], [-E / 2, L / 2], [E / 2, L / 2]]) F.appendChild(h("line", { x1: R + $, y1: P + G, x2: R + $ + D, y2: P + G - D, stroke: i.fill, "stroke-width": 0.9, opacity: 0.65 }));
    return F;
  }
  const p = [{ x: 380, y: 290, w: 30, h: 20, sx: 365, sy: 280, sw: 30, sh: 20 }, { x: 437, y: 320, w: 35, h: 22, sx: 420, sy: 310, sw: 35, sh: 22 }];
  for (const R of p) e.appendChild(h("rect", { x: R.sx, y: R.sy, width: R.sw, height: R.sh, rx: 3, fill: "#252845", stroke: "#3a3d65", "stroke-width": 0.8 }));
  const u = p.map((R) => {
    const P = d(R.x, R.y, R.w + 6, R.h + 6);
    return e.appendChild(P), P;
  }), f = 280, x = 360, g = h("polygon", { points: `${f},${x} ${f - 25},${x - 50} ${f + 25},${x - 50}`, fill: "rgba(251, 191, 36, 0.1)", stroke: "#fbbf24", "stroke-width": 0.8, "stroke-dasharray": "3 3", opacity: 0 });
  e.appendChild(g);
  const b = h("g", { transform: `translate(${f}, ${x})`, filter: "url(#shadow7)" });
  b.appendChild(h("ellipse", { cx: 0, cy: 0, rx: 5, ry: 7, fill: "#aaa" })), b.appendChild(h("circle", { cx: 0, cy: -3, r: 3.5, fill: "#ddd" })), e.appendChild(b);
  const k = h("g", { opacity: 0 });
  k.appendChild(h("line", { x1: f, y1: x - 8, x2: f, y2: x - 28, stroke: "#fbbf24", "stroke-width": 1.5, "stroke-linecap": "round" })), k.appendChild(h("polygon", { points: `${f - 3},${x - 25} ${f},${x - 30} ${f + 3},${x - 25}`, fill: "#fbbf24" })), e.appendChild(k);
  const w = 510, m = 380, _ = h("polygon", { points: `${w},${m} ${w - 20},${m - 70} ${w + 20},${m - 70}`, fill: "rgba(34, 211, 238, 0.1)", stroke: "#22d3ee", "stroke-width": 0.8, "stroke-dasharray": "3 3", opacity: 0 });
  e.appendChild(_);
  const C = h("g", { transform: `translate(${w}, ${m})`, opacity: 0, filter: "url(#shadow7)" });
  C.appendChild(h("ellipse", { cx: 0, cy: 0, rx: 4, ry: 8, fill: "#888" })), C.appendChild(h("circle", { cx: 0, cy: -10, r: 3, fill: "#bbb" })), C.appendChild(h("circle", { cx: 0, cy: 0, r: 12, fill: "none", stroke: "#666", "stroke-width": 0.8 })), e.appendChild(C);
  const S = h("g", { transform: "translate(685, 50)", opacity: 0 });
  S.appendChild(h("rect", { x: -82, y: -19, width: 164, height: 38, rx: 8, fill: "rgba(16, 185, 129, 0.18)", stroke: i.fill, "stroke-width": 1 })), S.appendChild(h("circle", { cx: -64, cy: 0, r: 5, fill: i.fill })), S.appendChild(U(2, -3, "L4 AUTONOMOUS", 9, i.ink, "middle", "JetBrains Mono, monospace")), S.appendChild(U(2, 10, "no driver \xB7 geofenced", 7, "rgba(255,255,255,0.5)", "middle", "JetBrains Mono, monospace")), e.appendChild(S);
  const v = U(400, 488, "", 10, i.ink, "middle", "JetBrains Mono, monospace");
  e.appendChild(v);
  const y = nt.timeline();
  y.to(c, { attr: { opacity: 0.6 }, duration: 0.16 }, 0.06).call(() => {
    v.textContent = "lidar scan \xB7 360\xB0 \xB7 10 ms";
  }, [], 0.1).to(u, { attr: { opacity: 1 }, duration: 0.1, stagger: 0.05, ease: at.entrance }, 0.22).call(() => {
    v.textContent = "tracking 4 agents \xB7 8s prediction";
  }, [], 0.34).to(k, { attr: { opacity: 1 }, duration: 0.08 }, 0.46).to(g, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.5).to(C, { attr: { opacity: 1 }, duration: 0.08 }, 0.6).to(_, { attr: { opacity: 0.85 }, duration: 0.1 }, 0.66).to(S, { attr: { opacity: 1 }, duration: 0.1 }, 0.78);
  const T = fo(a17, "click an agent to inspect");
  uo(T, 2400);
  function M(R, P) {
    R.style.cursor = "pointer", R.style.pointerEvents = "all", R.addEventListener("click", () => {
      v.textContent = P, nt.to(R, { attr: { opacity: 0.4 }, duration: 0.15, yoyo: true, repeat: 1 }), T.classList.remove("show");
    });
  }
  M(b, "pedestrian \xB7 1.2 m/s N \xB7 P(cross)=0.62"), M(C, "cyclist \xB7 5.8 m/s NW \xB7 P(turn)=0.18");
  for (let R = 0; R < p.length; R++) M(u[R], `vehicle ${R + 1} \xB7 12 m/s S \xB7 lane-keep`);
  return Ye(7, t, (R) => {
    const P = 1 + Math.sin(R * 0.8) * 0.04;
    c.setAttribute("transform", `translate(${o}, ${s - 13}) scale(${P.toFixed(3)})`), c.setAttribute("opacity", String(0.45 + Math.sin(R * 1.1) * 0.1)), b.setAttribute("transform", `translate(${f + Math.sin(R * 0.7) * 4}, ${x + Math.sin(R * 0.5) * 2})`);
    const E = R * 90 % 32;
    n.setAttribute("transform", `translate(0, ${E})`);
  }), y;
}
function Md(a17, t) {
  const i = ht[7], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "opGlow", 28), Gr(r, "shadow8", 3, 3, 0.5);
  const n = h("radialGradient", { id: "tissueG", cx: "50%", cy: "50%", r: "60%" });
  n.appendChild(h("stop", { offset: "0%", "stop-color": "#3d1820" })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#1a0a14" })), r.appendChild(n), ui(e, "#070918"), e.appendChild(h("ellipse", { cx: 400, cy: 320, rx: 150, ry: 56, fill: i.fill, opacity: 0.06, filter: "url(#opGlow)" })), e.appendChild(h("ellipse", { cx: 400, cy: 320, rx: 118, ry: 42, fill: "url(#tissueG)", stroke: "#2a1530", "stroke-width": 1 })), e.appendChild(h("path", { d: "M340,320 Q360,318 400,320 Q440,322 460,320", fill: "none", stroke: "#a8334a", "stroke-width": 1.4 }));
  const o = h("g", { opacity: 0, filter: "url(#shadow8)" });
  for (let w = 0; w < 7; w++) {
    const m = 348 + w * 17, _ = h("g", {});
    _.appendChild(h("path", { d: `M${m - 2},313 Q${m + 2},320 ${m + 4},327`, fill: "none", stroke: i.ink, "stroke-width": 1.6, "stroke-linecap": "round" })), _.appendChild(h("circle", { cx: m + 2, cy: 320, r: 1.6, fill: i.fill })), o.appendChild(_);
  }
  e.appendChild(o);
  function s(w, m) {
    const _ = h("g", { transform: `translate(${w}, 80)`, filter: "url(#shadow8)" });
    _.appendChild(h("rect", { x: -14, y: -10, width: 28, height: 12, rx: 3, fill: "#1c1f3a", stroke: "#3a3d65", "stroke-width": 0.8 })), _.appendChild(h("rect", { x: -6, y: 0, width: 12, height: 88, rx: 5, fill: "#252845", stroke: "#3a3d65", "stroke-width": 0.8 })), _.appendChild(h("circle", { cx: 0, cy: 88, r: 9, fill: "#1c1f3a", stroke: "#5a5e8a", "stroke-width": 1 })), _.appendChild(h("circle", { cx: 0, cy: 88, r: 4, fill: i.fill }));
    const C = m ? -8 : 8;
    _.appendChild(h("g", { transform: `rotate(${C} 0 88)` }));
    const S = h("g", { transform: `rotate(${C} 0 88)` });
    S.appendChild(h("rect", { x: -5, y: 88, width: 10, height: 88, rx: 4, fill: "#1c1f3a", stroke: "#3a3d65", "stroke-width": 0.8 })), S.appendChild(h("circle", { cx: 0, cy: 176, r: 7, fill: "#1c1f3a", stroke: "#5a5e8a", "stroke-width": 0.8 })), S.appendChild(h("circle", { cx: 0, cy: 176, r: 3, fill: i.fill }));
    const v = h("g", {});
    return v.appendChild(h("line", { x1: -3, y1: 176, x2: -8, y2: 198, stroke: i.fill, "stroke-width": 1.5 })), v.appendChild(h("line", { x1: 3, y1: 176, x2: 8, y2: 198, stroke: i.fill, "stroke-width": 1.5 })), S.appendChild(v), _.appendChild(S), { g: _, tip: v };
  }
  const l = s(260, false), c = s(540, true);
  e.appendChild(l.g), e.appendChild(c.g);
  const d = h("g", { transform: "translate(40, 30)", opacity: 0 });
  d.appendChild(h("rect", { x: 0, y: 0, width: 250, height: 130, rx: 8, fill: "rgba(0,0,0,0.6)", stroke: "#22264a", "stroke-width": 1 })), d.appendChild(U(125, 18, "TREMOR FILTER \xB7 1,000 Hz", 10, i.ink, "middle", "JetBrains Mono, monospace")), d.appendChild(h("line", { x1: 22, y1: 110, x2: 232, y2: 110, stroke: "#3a3d65", "stroke-width": 0.8 })), d.appendChild(h("line", { x1: 22, y1: 30, x2: 22, y2: 110, stroke: "#3a3d65", "stroke-width": 0.8 })), d.appendChild(U(125, 124, "time \u2192", 8, "#5a5e8a", "middle", "JetBrains Mono, monospace")), d.appendChild(U(8, 70, "\xB1 mm", 8, "#5a5e8a", "middle", "JetBrains Mono, monospace"));
  let p = "M22,68";
  for (let w = 1; w <= 42; w++) p += ` L${22 + w * 5},${68 + Math.sin(w * 1.1) * 12 + Math.sin(w * 4.2) * 4 + (Math.random() - 0.5) * 3}`;
  d.appendChild(h("path", { d: p, fill: "none", stroke: "#ff8055", "stroke-width": 1.4, opacity: 0.85 })), d.appendChild(U(28, 44, "surgeon", 9, "#ff8055", "start", "JetBrains Mono, monospace"));
  let u = "M22,68";
  for (let w = 1; w <= 42; w++) u += ` L${22 + w * 5},${68 + Math.sin(w * 0.5) * 1.5}`;
  const f = h("path", { d: u, fill: "none", stroke: i.fill, "stroke-width": 1.6 });
  d.appendChild(f), d.appendChild(U(150, 88, "robot", 9, i.fill, "start", "JetBrains Mono, monospace")), e.appendChild(d);
  const x = h("g", { transform: "translate(620, 410)", opacity: 0 });
  x.appendChild(h("rect", { x: -90, y: -28, width: 180, height: 56, rx: 8, fill: "rgba(0,0,0,0.55)", stroke: "#22264a", "stroke-width": 1 })), x.appendChild(U(0, -10, "5:1 motion scaling", 10, i.ink, "middle", "JetBrains Mono, monospace")), x.appendChild(h("rect", { x: -78, y: 4, width: 50, height: 6, rx: 1.5, fill: "#ff8055" })), x.appendChild(U(-53, 22, "hand 5cm", 7, "#ff8055", "middle", "JetBrains Mono, monospace")), x.appendChild(h("rect", { x: 28, y: 4, width: 10, height: 6, rx: 1.5, fill: i.fill })), x.appendChild(U(33, 22, "tool 1cm", 7, i.fill, "middle", "JetBrains Mono, monospace")), x.appendChild(h("path", { d: "M-26,7 L20,7 M14,3 L20,7 L14,11", fill: "none", stroke: "#888", "stroke-width": 1 })), e.appendChild(x);
  const g = h("circle", { cx: 400, cy: 320, r: 60, fill: "none", stroke: "rgba(96, 165, 250, 0.35)", "stroke-width": 1.2, "stroke-dasharray": "4 5", opacity: 0 });
  e.appendChild(g);
  const b = U(400, 396, "10\xD7 STEREO MAGNIFICATION", 9, i.ink, "middle", "JetBrains Mono, monospace");
  b.setAttribute("opacity", "0"), e.appendChild(b);
  const k = nt.timeline();
  return k.to(l.g, { attr: { transform: "translate(320, 100)" }, duration: 0.18, ease: at.standard }, 0).to(c.g, { attr: { transform: "translate(480, 100)" }, duration: 0.18, ease: at.standard }, 0).to(g, { attr: { opacity: 1 }, duration: 0.08 }, 0.2).to(b, { attr: { opacity: 1 }, duration: 0.08 }, 0.2).to(c.g, { attr: { transform: "translate(470, 95)" }, duration: 0.12, ease: at.standard }, 0.32).to(c.g, { attr: { transform: "translate(490, 102)" }, duration: 0.12, ease: at.standard }, 0.46).to(o, { attr: { opacity: 1 }, duration: 0.14 }, 0.42).to(d, { attr: { opacity: 1 }, duration: 0.12 }, 0.6).to(x, { attr: { opacity: 1 }, duration: 0.12 }, 0.74), Ye(8, t, (w) => {
    const m = Math.sin(w * 1.4) * 4, _ = Math.sin(w * 0.9) * 2;
    l.g.setAttribute("transform", `translate(${320 + m}, ${100 + _})`), c.g.setAttribute("transform", `translate(${480 - m}, ${100 - _})`);
  }), k;
}
function Sd(a17, t) {
  const i = ht[8], e = zr();
  a17.appendChild(e);
  const r = Nr(e), n = h("linearGradient", { id: "marsG", x1: 0, y1: 0, x2: 0, y2: 1 });
  n.appendChild(h("stop", { offset: "0%", "stop-color": "#2a0a02" })), n.appendChild(h("stop", { offset: "60%", "stop-color": "#3a1408" })), n.appendChild(h("stop", { offset: "100%", "stop-color": "#1a0500" })), r.appendChild(n), sr(r, "marsGlow", 14), Gr(r, "shadowM", 3, 3, 0.6);
  const o = h("pattern", { id: "marsTex", width: 12, height: 12, patternUnits: "userSpaceOnUse" });
  o.appendChild(h("rect", { x: 0, y: 0, width: 12, height: 12, fill: "#3d1a0a" })), o.appendChild(h("circle", { cx: 3, cy: 5, r: 1.2, fill: "#4a2010", opacity: 0.5 })), o.appendChild(h("circle", { cx: 9, cy: 9, r: 0.9, fill: "#2a1004", opacity: 0.6 })), o.appendChild(h("circle", { cx: 7, cy: 2, r: 0.6, fill: "#5a2410", opacity: 0.4 })), r.appendChild(o), e.appendChild(h("rect", { x: 0, y: 0, width: rt, height: Nt, fill: "url(#marsG)" })), e.appendChild(h("path", { d: "M0,330 L120,295 L180,310 L260,278 L340,300 L430,272 L520,302 L620,285 L720,308 L800,292 L800,360 L0,360 Z", fill: "#2a0e04", opacity: 0.9 })), e.appendChild(h("path", { d: "M0,348 L80,320 L160,340 L240,316 L320,338 L400,320 L490,344 L580,326 L670,346 L800,330 L800,370 L0,370 Z", fill: "#341210" })), e.appendChild(h("path", { d: "M0,372 Q120,360 240,374 Q360,390 480,372 Q600,358 720,374 L800,378 L800,500 L0,500 Z", fill: "url(#marsTex)" }));
  for (const [S, v, y, T] of [[120, 388, 16, 8], [580, 376, 13, 6], [420, 384, 9, 5], [700, 380, 11, 6], [300, 386, 7, 4], [220, 410, 14, 6], [510, 420, 10, 5]]) e.appendChild(h("ellipse", { cx: S, cy: v, rx: y, ry: T, fill: "#4a1f0a", stroke: "#5a2410", "stroke-width": 0.6 }));
  const s = h("g", { transform: "translate(250, 354)", filter: "url(#shadowM)" });
  s.appendChild(h("rect", { x: -28, y: -22, width: 56, height: 18, rx: 4, fill: "#888", stroke: "#aaa", "stroke-width": 0.6 })), s.appendChild(h("rect", { x: -18, y: -28, width: 36, height: 6, rx: 1, fill: "#1e40af", stroke: "#2563eb", "stroke-width": 0.5 })), s.appendChild(h("line", { x1: -2, y1: -22, x2: -2, y2: -46, stroke: "#999", "stroke-width": 1.6 })), s.appendChild(h("rect", { x: -10, y: -52, width: 18, height: 8, rx: 1.5, fill: "#aaa" })), s.appendChild(h("circle", { cx: -3, cy: -48, r: 2.2, fill: i.fill })), s.appendChild(h("circle", { cx: 4, cy: -48, r: 1.8, fill: "#444" })), s.appendChild(h("rect", { x: 16, y: -8, width: 12, height: 8, rx: 1, fill: "#5a5a5a" }));
  for (const S of [-22, -8, 6, 20]) s.appendChild(h("circle", { cx: S, cy: 4, r: 6, fill: "#444", stroke: "#666", "stroke-width": 1 })), s.appendChild(h("circle", { cx: S, cy: 4, r: 2.5, fill: "#222" }));
  s.appendChild(h("path", { d: "M-28,-12 L-42,-2 L-44,12", fill: "none", stroke: "#888", "stroke-width": 2, "stroke-linecap": "round" })), s.appendChild(h("circle", { cx: -44, cy: 12, r: 2, fill: i.fill })), e.appendChild(s);
  const l = [], c = h("g", { opacity: 0 });
  c.appendChild(h("circle", { cx: 250, cy: 320, r: 3, fill: i.fill }));
  for (let S = 1; S <= 4; S++) {
    const v = h("circle", { cx: 250, cy: 320, r: 2 + S * 4, fill: "none", stroke: i.fill, "stroke-width": 0.8, opacity: 1 - S * 0.18 });
    c.appendChild(v), l.push(v);
  }
  e.appendChild(c);
  const d = h("line", { x1: 250, y1: 318, x2: 250, y2: 30, stroke: i.fill, "stroke-width": 0.8, "stroke-dasharray": "3 4", opacity: 0 });
  e.appendChild(d);
  const p = h("circle", { cx: 250, cy: 28, r: 5, fill: "#3b82f6", opacity: 0 });
  e.appendChild(p);
  const u = h("circle", { cx: 250, cy: 28, r: 9, fill: "none", stroke: "#3b82f6", "stroke-width": 0.6, opacity: 0 });
  e.appendChild(u);
  const f = U(250, 14, "EARTH", 8, "#3b82f6", "middle", "JetBrains Mono, monospace");
  f.setAttribute("opacity", "0"), e.appendChild(f);
  const x = 4 + Math.floor(Math.random() * 20), g = Math.floor(Math.random() * 60), b = U(680, 50, "", 13, i.fill, "middle", "JetBrains Mono, monospace");
  e.appendChild(b);
  const k = U(400, 478, "", 10, i.ink, "middle", "JetBrains Mono, monospace");
  e.appendChild(k);
  const w = h("g", { transform: "translate(680, 432)", opacity: 0 }), m = h("rect", { x: -68, y: -16, width: 136, height: 32, rx: 6, fill: "rgba(249, 115, 22, 0.14)", stroke: i.fill, "stroke-width": 1.2 });
  w.appendChild(m), w.appendChild(U(0, 5, "SEND COMMAND", 10, i.fill, "middle", "JetBrains Mono, monospace")), e.appendChild(w);
  let _ = false;
  w.style.cursor = "pointer", w.style.pointerEvents = "all", w.addEventListener("mouseenter", () => {
    _ || nt.to(m, { attr: { fill: "rgba(249, 115, 22, 0.3)" }, duration: 0.2 });
  }), w.addEventListener("mouseleave", () => {
    _ || nt.to(m, { attr: { fill: "rgba(249, 115, 22, 0.14)" }, duration: 0.2 });
  }), w.addEventListener("click", () => {
    if (_) return;
    _ = true, w.style.pointerEvents = "none", nt.to(m, { attr: { opacity: 0.3 }, duration: 0.3 });
    const S = x * 60 + g;
    nt.timeline().call(() => {
      k.textContent = "transmitting command\u2026";
    }).to(c, { opacity: 1, duration: 0.3 }).to({ s: S }, { s: 0, duration: 2.4, ease: "power1.in", onUpdate() {
      const y = this.targets()[0].s, T = Math.floor(y / 60), M = Math.floor(y % 60);
      b.textContent = `${T}m ${String(M).padStart(2, "0")}s`;
    } }).call(() => {
      b.textContent = "received", k.textContent = "executing: DRIVE_FORWARD 1 m";
    }).to(s, { attr: { transform: "translate(330, 354)" }, duration: 1.6, ease: at.standard });
  });
  const C = nt.timeline();
  return C.call(() => {
    k.textContent = "Perseverance \xB7 Sol\xA01,547 \xB7 Jezero Crater";
  }).to(p, { attr: { opacity: 0.85 }, duration: 0.08 }, 0.1).to(u, { attr: { opacity: 0.5 }, duration: 0.08 }, 0.1).to(f, { attr: { opacity: 0.55 }, duration: 0.08 }, 0.1).to(d, { attr: { opacity: 0.28 }, duration: 0.1 }, 0.22).to(w, { attr: { opacity: 1 }, duration: 0.1 }, 0.3).call(() => {
    _ || (k.textContent = `signal delay: ${x}m ${g}s one-way`);
  }, [], 0.5).to(c, { opacity: 1, duration: 0.04 }, 0.6).call(() => {
    _ || (b.textContent = `${x}m ${g}s`);
  }, [], 0.6), Ye(9, t, (S) => {
    u.setAttribute("r", String(8 + Math.sin(S * 1.2) * 3)), u.setAttribute("opacity", String(0.3 + Math.abs(Math.sin(S * 1.2)) * 0.4));
    for (let v = 0; v < l.length; v++) {
      const y = (S * 0.6 + v * 0.22) % 1;
      l[v].setAttribute("r", String(2 + y * 18)), l[v].setAttribute("opacity", String((1 - y) * 0.5));
    }
    if (!_) {
      const v = Math.sin(S * 0.3) * 0.4;
      s.setAttribute("transform", `translate(${250 + v}, 354)`);
    }
  }), C;
}
function Td(a17, t) {
  const i = ht[9], { ctx: e } = lo(a17), r = 400, n = 360, o = 110, s = 420, l = [];
  for (let m = 0; m < s; m++) l.push({ oR: o + 20 + Math.random() * 110, a: Math.random() * Math.PI * 2, spd: (0.25 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1), tilt: 0.35 + Math.random() * 0.25, trail: [] });
  const c = [];
  for (let m = 0; m < 8; m++) c.push({ oR: o + 35 + Math.random() * 90, a: Math.random() * Math.PI * 2, spd: (0.4 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1), tilt: 0.3 + Math.random() * 0.25 });
  const d = [];
  let p = 42;
  function u() {
    return p = p * 16807 % 2147483647, p;
  }
  for (let m = 0; m < 110; m++) d.push([u() % rt, u() % Nt, 0.08 + u() % 30 / 120]);
  const f = [];
  for (let m = 0; m < 60; m++) {
    const _ = Math.random() * Math.PI * 2, C = Math.random() * o * 0.95;
    f.push([Math.cos(_) * C, Math.sin(_) * C, 0.02 + Math.random() * 0.06]);
  }
  function x(m) {
    const _ = e.createRadialGradient(r, n, o - 5, r, n, o + 30);
    _.addColorStop(0, "rgba(80, 140, 220, 0.5)"), _.addColorStop(0.4, "rgba(40, 90, 180, 0.18)"), _.addColorStop(1, "rgba(20, 50, 120, 0)"), e.fillStyle = _, e.beginPath(), e.arc(r, n, o + 30, 0, Math.PI * 2), e.fill();
    const C = e.createRadialGradient(r - 22, n - 22, 6, r, n, o);
    C.addColorStop(0, "#1e58a8"), C.addColorStop(0.45, "#0d2858"), C.addColorStop(0.85, "#08183a"), C.addColorStop(1, "#040b1e"), e.fillStyle = C, e.beginPath(), e.arc(r, n, o, 0, Math.PI * 2), e.fill(), e.save(), e.beginPath(), e.arc(r, n, o, 0, Math.PI * 2), e.clip(), e.fillStyle = "rgba(34, 100, 60, 0.45)", e.beginPath(), e.ellipse(r - 30, n - 18, 26, 18, 0.4, 0, Math.PI * 2), e.fill(), e.beginPath(), e.ellipse(r + 30, n + 12, 22, 16, -0.2, 0, Math.PI * 2), e.fill(), e.beginPath(), e.ellipse(r + 5, n + 38, 18, 12, 0.6, 0, Math.PI * 2), e.fill();
    const S = m * 4 % 360;
    for (const [y, T, M] of f) e.fillStyle = `rgba(255,255,255,${M})`, e.fillRect(r + y + S * 0.05 - 1, n + T - 1, 2, 2);
    const v = e.createLinearGradient(r + o - 40, n, r + o + 10, n);
    v.addColorStop(0, "rgba(0,0,0,0)"), v.addColorStop(0.6, "rgba(0,0,0,0.45)"), v.addColorStop(1, "rgba(0,0,0,0.85)"), e.fillStyle = v, e.beginPath(), e.arc(r, n, o, 0, Math.PI * 2), e.fill(), e.restore();
  }
  const g = { value: 0 };
  let b = 0;
  function k() {
    e.clearRect(0, 0, rt, Nt), e.fillStyle = "#040410", e.fillRect(0, 0, rt, Nt);
    for (const [v, y, T] of d) {
      const M = T * (0.7 + 0.3 * Math.sin(b * 2 + v * 0.05));
      e.fillStyle = `rgba(255,255,255,${M})`, e.fillRect(v, y, 1, 1);
    }
    x(b), e.strokeStyle = "rgba(255,255,255,0.025)", e.lineWidth = 0.5;
    for (const v of [o + 25, o + 55, o + 90]) e.beginPath(), e.ellipse(r, n, v, v * 0.4, 0, 0, Math.PI * 2), e.stroke();
    const m = g.value, _ = Math.max(20, Math.floor(m * s));
    for (let v = 0; v < _; v++) {
      const y = l[v], T = y.a + b * y.spd * 0.4 + m * y.spd * 1.2, M = r + Math.cos(T) * y.oR, R = n + Math.sin(T) * y.oR * y.tilt;
      if (Math.sin(T) > 0.3 && Math.hypot(M - r, (R - n) / y.tilt) < o + 5) continue;
      if (y.trail.push({ x: M, y: R }), y.trail.length > 12 && y.trail.shift(), y.trail.length > 3) {
        e.strokeStyle = "rgba(180, 200, 255, 0.18)", e.lineWidth = 0.7, e.beginPath();
        for (let E = 0; E < y.trail.length; E++) {
          const L = y.trail[E];
          E === 0 ? e.moveTo(L.x, L.y) : e.lineTo(L.x, L.y);
        }
        e.stroke();
      }
      const P = Math.sin(b * 4 + v * 1.7) > 0.95;
      if (P && (e.fillStyle = "rgba(180, 200, 255, 0.6)", e.beginPath(), e.arc(M, R, 4, 0, Math.PI * 2), e.fill()), e.fillStyle = P ? "#c4b5fd" : "rgba(220, 230, 255, 0.7)", e.fillRect(M - 0.8, R - 0.8, 1.6, 1.6), v < _ - 1 && (v + Math.floor(b * 2)) % 23 === 0) {
        const E = (v + 5) % _, L = l[E], D = L.a + b * L.spd * 0.4 + m * L.spd * 1.2, F = r + Math.cos(D) * L.oR, $ = n + Math.sin(D) * L.oR * L.tilt, G = Math.hypot(F - M, $ - R);
        G < 120 && (e.strokeStyle = `rgba(180, 200, 255, ${0.45 * (1 - G / 120)})`, e.lineWidth = 0.7, e.beginPath(), e.moveTo(M, R), e.lineTo(F, $), e.stroke());
      }
    }
    for (let v = 0; v < c.length; v++) {
      const y = c[v], T = y.a + b * y.spd * 0.4, M = r + Math.cos(T) * y.oR, R = n + Math.sin(T) * y.oR * y.tilt;
      e.fillStyle = "rgba(255, 80, 80, 0.55)", e.fillRect(M - 1, R - 1, 2, 2);
    }
    const C = b / 12 % 1;
    if (C < 0.15) {
      const v = Math.floor(b / 12 % s), y = l[v % _];
      if (y) {
        const T = y.a + b * y.spd * 0.4 + m * y.spd * 1.2, M = r + Math.cos(T) * y.oR, R = n + Math.sin(T) * y.oR * y.tilt;
        e.strokeStyle = `rgba(255, 80, 80, ${0.6 * (1 - C / 0.15)})`, e.lineWidth = 1, e.beginPath(), e.arc(M, R, 6 + C * 30, 0, Math.PI * 2), e.stroke();
      }
    }
    co(e, 0.012), e.fillStyle = i.ink, e.font = "bold 12px JetBrains Mono, monospace", e.textAlign = "right";
    const S = Math.min(7500, Math.floor(m * 7500));
    e.fillText(`Active satellites: ${S.toLocaleString()}`, 770, 26), e.fillStyle = "rgba(255, 100, 100, 0.55)", e.font = "10px JetBrains Mono, monospace", e.fillText(`Tracked debris: ${Math.min(35e3, Math.floor(m * 35e3)).toLocaleString()}`, 770, 44), e.fillStyle = "rgba(180, 200, 255, 0.45)", e.fillText("autonomous coordination via laser ISL", 770, 62);
  }
  k();
  const w = nt.timeline({ onUpdate: k });
  return w.to(g, { value: 1, duration: 1, ease: "none" }), Ye(10, t, (m) => {
    b = m, k();
  }), w;
}
function Pd(a17, t) {
  const i = ht[10], e = zr();
  a17.appendChild(e);
  const r = Nr(e);
  sr(r, "glow11", 8), Gr(r, "shadow11", 3, 2, 0.45);
  const n = h("pattern", { id: "mgrid", width: 40, height: 40, patternUnits: "userSpaceOnUse" });
  n.appendChild(h("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "rgba(168, 85, 247, 0.05)", "stroke-width": 0.5 })), r.appendChild(n), ui(e, "#0a0418"), e.appendChild(h("rect", { x: 0, y: 0, width: rt, height: Nt, fill: "url(#mgrid)" }));
  const o = 365, s = 320, l = 40, d = h("g", { transform: `translate(20, ${l})` });
  d.appendChild(h("rect", { x: 0, y: 0, width: o, height: s, rx: 10, fill: "rgba(255, 105, 60, 0.04)", stroke: "rgba(255, 105, 60, 0.2)", "stroke-width": 1 })), d.appendChild(U(o / 2, 22, "LAB \xB7 X-RAY CRYSTALLOGRAPHY", 10, "#ff8055", "middle", "JetBrains Mono, monospace"));
  const p = h("g", { transform: `translate(${o / 2}, ${s / 2 + 5})`, opacity: 0.35 });
  for (let P = 18; P <= 100; P += 14) for (let E = 0; E < Math.floor(P / 3); E++) {
    const L = E / Math.floor(P / 3) * Math.PI * 2, D = 0.3 + Math.random() * 0.5;
    p.appendChild(h("circle", { cx: Math.cos(L) * P, cy: Math.sin(L) * P, r: 1.2, fill: "#ff8055", opacity: D }));
  }
  d.appendChild(p), d.appendChild(U(o / 2, s - 30, "months \u2192 years", 9, "rgba(255, 105, 60, 0.65)", "middle", "JetBrains Mono, monospace")), d.appendChild(h("rect", { x: 30, y: s - 18, width: 305, height: 4, rx: 2, fill: "rgba(255, 105, 60, 0.15)" }));
  const u = h("rect", { x: 30, y: s - 18, width: 0, height: 4, rx: 2, fill: "#ff8055" });
  d.appendChild(u), e.appendChild(d);
  const x = h("g", { transform: `translate(415, ${l})`, filter: "url(#shadow11)" });
  x.appendChild(h("rect", { x: 0, y: 0, width: o, height: s, rx: 10, fill: "rgba(168, 85, 247, 0.04)", stroke: i.fill, "stroke-width": 1.2 })), x.appendChild(U(o / 2, 22, "ALPHAFOLD", 10, i.ink, "middle", "JetBrains Mono, monospace"));
  function g() {
    const P = [], E = o / 2, L = s / 2 + 5;
    for (let D = 0; D < 18; D++) {
      const F = D * 0.7;
      P.push({ x: E - 70 + Math.cos(F) * 14, y: L - 40 + D * 3, struct: "helix" });
    }
    for (let D = 0; D < 6; D++) P.push({ x: E - 70 + D * 5, y: L + 18 + Math.sin(D * 0.7) * 3, struct: "coil" });
    for (let D = 0; D < 10; D++) P.push({ x: E - 40 + D * 9, y: L + 24 + (D % 2 ? -4 : 4), struct: "sheet" });
    for (let D = 0; D < 5; D++) P.push({ x: E + 50 + D * 4, y: L + 26 - D * 4, struct: "coil" });
    for (let D = 0; D < 16; D++) {
      const F = D * 0.7;
      P.push({ x: E + 70 + Math.cos(F) * 12, y: L + 5 - D * 3, struct: "helix" });
    }
    return P;
  }
  const b = g(), k = h("g", {}), w = [];
  for (let P = 1; P < b.length; P++) {
    const E = b[P - 1], L = b[P], D = h("line", { x1: E.x, y1: E.y, x2: L.x, y2: L.y, stroke: "#3a1e64", "stroke-width": 1.5, opacity: 0 });
    k.appendChild(D), w.push(D);
  }
  function m(P) {
    return P === "helix" ? "#a855f7" : P === "sheet" ? "#fbbf24" : "#22d3ee";
  }
  const _ = [];
  for (let P = 0; P < b.length; P++) {
    const E = b[P], L = h("circle", { cx: E.x, cy: E.y, r: 3.5, fill: m(E.struct), stroke: "rgba(255,255,255,0.2)", "stroke-width": 0.4, opacity: 0 });
    k.appendChild(L), _.push(L);
  }
  x.appendChild(k), x.appendChild(U(o / 2, s - 46, "AlphaFold 3 \xB7 ligands & nucleic acids", 8, "rgba(168, 85, 247, 0.55)", "middle", "JetBrains Mono, monospace")), x.appendChild(U(o / 2, s - 30, "seconds \u2014 minutes", 9, i.ink, "middle", "JetBrains Mono, monospace")), x.appendChild(h("rect", { x: 30, y: s - 18, width: 305, height: 4, rx: 2, fill: "rgba(168, 85, 247, 0.15)" }));
  const C = h("rect", { x: 30, y: s - 18, width: 0, height: 4, rx: 2, fill: i.fill });
  x.appendChild(C);
  const S = h("g", { transform: `translate(${o - 90}, ${s - 70})` });
  for (const [P, E, L] of [[0, "helix", "helix"], [1, "sheet", "sheet"], [2, "coil", "coil"]]) S.appendChild(h("circle", { cx: 0, cy: P * 12, r: 3, fill: m(E) })), S.appendChild(U(8, P * 12 + 3, L, 7, "rgba(255,255,255,0.5)", "start", "JetBrains Mono, monospace"));
  x.appendChild(S), e.appendChild(x), e.appendChild(U(rt / 2, l + s + 30, "\u2022 same protein, two methods \u2022", 9, "rgba(255,255,255,0.4)", "middle", "JetBrains Mono, monospace")), e.appendChild(U(rt / 2, l + s + 50, "200M+ predicted structures (as of 2026)", 11, i.ink, "middle", "JetBrains Mono, monospace"));
  const v = nt.timeline();
  _.forEach((P, E) => v.to(P, { attr: { opacity: 1 }, duration: 0.04, ease: at.entrance }, 0.05 + E * 5e-3)), w.forEach((P, E) => v.to(P, { attr: { opacity: 0.7 }, duration: 0.04, ease: at.entrance }, 0.05 + E * 5e-3)), v.to(C, { attr: { width: 305 }, duration: 0.18, ease: at.standard }, 0.45), v.to(u, { attr: { width: 12 }, duration: 0.5, ease: "none" }, 0.45);
  let y = false;
  const T = fo(a17, "click a panel to compare");
  uo(T, 2400);
  function M(P) {
    P ? (d.setAttribute("opacity", "1"), x.setAttribute("opacity", "0.45")) : (d.setAttribute("opacity", "0.45"), x.setAttribute("opacity", "1")), T.classList.remove("show");
  }
  d.style.cursor = "pointer", d.style.pointerEvents = "all", d.addEventListener("click", () => {
    y = !y, M(y);
  }), x.style.cursor = "pointer", x.style.pointerEvents = "all", x.addEventListener("click", () => {
    y = false, M(false);
  }), M(false);
  const R = o / 2;
  return Ye(11, t, (P) => {
    const E = 1 + Math.sin(P * 0.6) * 0.04;
    k.setAttribute("transform", `translate(${R * (1 - E)}, 0) scale(${E}, 1)`), p.setAttribute("opacity", String(0.3 + Math.sin(P * 1.4) * 0.1));
  }), v;
}
function Ad(a17, t) {
  const i = ht[11], { ctx: e } = lo(a17), r = [];
  let n = 1729;
  function o() {
    return n = n * 16807 % 2147483647, n;
  }
  for (let m = 0; m < 220; m++) r.push({ x: o() % rt, y: o() % Nt, b: 0.06 + o() % 30 / 130, lit: 0 });
  const s = 80, l = 420;
  function c(m, _, C) {
    let S = -1, v = 1 / 0;
    for (let y = 0; y < r.length; y++) {
      if (C.has(y)) continue;
      const T = r[y].x - m, M = r[y].y - _, R = T * T + M * M;
      R < 3600 || R < v && (v = R, S = y);
    }
    return S < 0 ? null : { idx: S, star: r[S] };
  }
  function d(m, _, C, S, v) {
    const y = c(m, _, v);
    if (!y || C > 5) return { sx: m, sy: _, ex: m + 30, ey: _ - 30, d: C, sp: S, arrived: 1, children: [], targetIdx: -1 };
    v.add(y.idx);
    const T = { sx: m, sy: _, ex: y.star.x, ey: y.star.y, d: C, sp: S, arrived: 0, children: [], targetIdx: y.idx };
    if (C < 5) {
      const M = S + (1 - S) * 0.18, R = new Set(v);
      T.children.push(d(y.star.x, y.star.y, C + 1, M, R));
      const P = new Set(v);
      T.children.push(d(y.star.x, y.star.y, C + 1, M, P));
    }
    return T;
  }
  const p = d(s, l, 0, 0, /* @__PURE__ */ new Set()), u = { value: 0 };
  let f = 0;
  function x(m, _) {
    _(m);
    for (const C of m.children) x(C, _);
  }
  function g(m) {
    const _ = Math.min(1, u.value + f * 5e-3);
    if (_ < m.sp) return;
    const C = Math.min(1, (_ - m.sp) / 0.05), S = m.sx + (m.ex - m.sx) * C, v = m.sy + (m.ey - m.sy) * C;
    if (e.strokeStyle = `rgba(251, 191, 36, ${Math.max(0.05, 0.35 - m.d * 0.05)})`, e.lineWidth = Math.max(0.5, 1.6 - m.d * 0.18), e.beginPath(), e.moveTo(m.sx, m.sy), e.lineTo(S, v), e.stroke(), C < 1) e.fillStyle = "#fde68a", e.beginPath(), e.arc(S, v, Math.max(1.2, 2.5 - m.d * 0.25), 0, Math.PI * 2), e.fill(), e.fillStyle = "rgba(251, 191, 36, 0.35)", e.beginPath(), e.arc(S, v, Math.max(2, 5 - m.d * 0.4), 0, Math.PI * 2), e.fill();
    else {
      m.arrived = Math.min(1, m.arrived + 0.05), m.targetIdx >= 0 && (r[m.targetIdx].lit = Math.min(1, r[m.targetIdx].lit + 0.04));
      const y = (1 - m.arrived) * 14 + 3;
      if (e.strokeStyle = `rgba(251, 191, 36, ${m.arrived * 0.6})`, e.lineWidth = 1.2, e.beginPath(), e.arc(m.ex, m.ey, y, 0, Math.PI * 2), e.stroke(), m.children.length === 2 && m.arrived > 0.5) {
        const T = Math.min(1, (m.arrived - 0.5) / 0.5);
        for (const M of m.children) {
          const R = m.ex + (M.ex - m.ex) * 0.06 * T, P = m.ey + (M.ey - m.ey) * 0.06 * T;
          e.fillStyle = `rgba(251, 191, 36, ${T * 0.5})`, e.beginPath(), e.arc(R, P, 1.5, 0, Math.PI * 2), e.fill();
        }
      }
      for (const T of m.children) g(T);
    }
  }
  function b(m) {
    const _ = Math.max(0, Math.min(1, m));
    if (_ < 1e-3) return "0 years";
    const C = Math.pow(10, _ * 7);
    return C < 1e3 ? `${Math.floor(C).toLocaleString()} years` : C < 1e6 ? `${(C / 1e3).toFixed(1)}k years` : `${(C / 1e6).toFixed(2)}M years`;
  }
  function k() {
    e.clearRect(0, 0, rt, Nt), e.fillStyle = "#020208", e.fillRect(0, 0, rt, Nt);
    for (const v of r) {
      const y = v.b * (0.7 + 0.3 * Math.sin(f * 1.5 + v.x * 0.04)), T = v.lit;
      T > 0 ? (e.fillStyle = `rgba(251, 191, 36, ${T * 0.18})`, e.beginPath(), e.arc(v.x, v.y, 4, 0, Math.PI * 2), e.fill(), e.fillStyle = `rgba(255, 220, 120, ${y + T})`) : e.fillStyle = `rgba(255,255,255,${y})`, e.fillRect(v.x, v.y, 1.2, 1.2);
    }
    const m = e.createRadialGradient(s, l, 0, s, l, 18);
    m.addColorStop(0, "#3a8edd"), m.addColorStop(0.6, "#1955a8"), m.addColorStop(1, "#0a1530"), e.fillStyle = m, e.beginPath(), e.arc(s, l, 14 + Math.sin(f * 0.8) * 0.6, 0, Math.PI * 2), e.fill(), e.strokeStyle = `rgba(120, 180, 255, ${0.3 + Math.sin(f * 0.8) * 0.1})`, e.lineWidth = 1, e.beginPath(), e.arc(s, l, 17, 0, Math.PI * 2), e.stroke(), e.fillStyle = "rgba(200, 220, 255, 0.55)", e.font = "9px Inter, sans-serif", e.textAlign = "center", e.fillText("Earth", s, l + 30), e.fillStyle = "rgba(120, 180, 255, 0.4)", e.font = "7px JetBrains Mono, monospace", e.fillText("you are here", s, l + 42), g(p);
    const _ = Math.min(1, u.value + f * 5e-3);
    let C = 0, S = 0;
    x(p, (v) => {
      _ >= v.sp && C++;
    });
    for (const v of r) v.lit > 0.05 && S++;
    co(e, 8e-3), e.fillStyle = i.ink, e.font = "bold 12px JetBrains Mono, monospace", e.textAlign = "right", e.fillText(`Probes: ${C}`, 770, 26), e.fillStyle = "rgba(251, 191, 36, 0.55)", e.font = "10px JetBrains Mono, monospace", e.fillText(`Stars colonized: ${S}`, 770, 44), e.fillStyle = "rgba(255,255,255,0.4)", e.font = "10px JetBrains Mono, monospace", e.fillText(`T + ${b(_)}`, 770, 62);
  }
  k();
  const w = nt.timeline({ onUpdate: k });
  return w.to(u, { value: 1, duration: 1, ease: "power1.in" }), Ye(12, t, (m) => {
    f = m, k();
  }), w;
}
nt.registerPlugin(H);
const $e = [{ id: 1, title: "The Thermostat", year: "1883", accent: ht[0].fill, stats: [{ label: "Sensors", value: "1" }, { label: "Decisions/sec", value: "~0.01" }, { label: "Planning horizon", value: "NOW" }], annotation: "The first closed-loop controller. In 1883, Warren S. Johnson patented the electric room thermostat. One sensor, one rule: too cold \u2192 heat on; too warm \u2192 heat off. The same idea \u2014 sense, compare, act \u2014 quietly runs nearly every climate-controlled building on Earth.", sources: [{ claim: "Warren S. Johnson\u2019s 1883 electric thermostat (US Patent 281,884).", cite: "U.S. Patent No. 281,884", url: "https://patents.google.com/patent/US281884" }, { claim: "Thermostats as a canonical closed-loop controller.", cite: "Bennett, S. (1996). A brief history of automatic control. IEEE Control Systems Magazine." }] }, { id: 2, title: "Cruise Control", year: "1958", accent: ht[1].fill, stats: [{ label: "Sensors", value: "1 (speed)" }, { label: "Decisions/sec", value: "~10" }, { label: "Planning horizon", value: "1 second" }], annotation: "A PID controller \u2014 the workhorse of industrial control. It doesn\u2019t know about hills, traffic, or weather. It only knows the gap between the set speed and the actual speed, and pushes the throttle to close that gap. Chrysler shipped the first modern automotive cruise control on the 1958 Imperial.", sources: [{ claim: "1958 Chrysler Imperial: first modern automotive cruise control (Auto-Pilot).", cite: "Chrysler Corporation press materials, 1958." }, { claim: "PID control underpins most industrial automation.", cite: "\xC5str\xF6m & H\xE4gglund (2006), Advanced PID Control. ISA." }] }, { id: 3, title: "The Roomba", year: "2002", accent: ht[2].fill, stats: [{ label: "Sensors", value: "6 (bump, cliff, IR)" }, { label: "Decisions/sec", value: "~50" }, { label: "Planning horizon", value: "0.1 seconds" }], annotation: "No map. No memory. Just bump-and-turn with a slight spiral bias. The original Roomba ran on a microcontroller modest by even 2002 standards \u2014 and yet, given enough time, randomized motion covers most of a room. Coverage is emergent, not designed.", sources: [{ claim: "iRobot Roomba launched in September 2002.", cite: "iRobot Corp., \u201CHistory of the Roomba.\u201D", url: "https://www.irobot.com/about-irobot" }, { claim: "Original Roomba\u2019s reactive (no-map) coverage strategy.", cite: "Jones, J. (2006). Robots at the tipping point. IEEE Robotics & Automation Magazine." }] }, { id: 4, title: "The Drone", year: "2013", accent: ht[3].fill, stats: [{ label: "Sensors", value: "20+ (IMU, GPS, cameras\u2026)" }, { label: "Decisions/sec", value: "~1,000" }, { label: "Planning horizon", value: "~2 seconds" }], annotation: "Consumer-grade quadcopters arrived around 2013 (DJI Phantom 1) and brought aerospace-grade attitude control to a $700 toy. A modern drone fuses dozens of sensor streams roughly a thousand times a second to hold position to within centimeters \u2014 faster than any human pilot can react.", sources: [{ claim: "DJI Phantom 1 launched January 2013.", cite: "DJI Technology Co., 2013 product launch." }, { claim: "Quadrotor flight control loops typically run at 500\u20131,000 Hz.", cite: "Mahony, Kumar, Corke (2012). Multirotor aerial vehicles. IEEE Robotics & Automation Magazine." }] }, { id: 5, title: "Warehouse Robots", year: "2012", accent: ht[4].fill, stats: [{ label: "Sensors", value: "Floor markers + IR + central planner" }, { label: "Robots per facility", value: "1,000+" }, { label: "Decisions", value: "Centrally orchestrated" }], annotation: "Over a thousand mobile robots can share a single warehouse floor, inches apart, because none of them decides for itself. A central traffic planner assigns every path. Collisions are vanishingly rare \u2014 not by chance, but by construction. It is autonomy through obedience.", sources: [{ claim: "Amazon acquired Kiva Systems in 2012 for $775M; deployment scaled to 750k+ robots fleetwide by 2024.", cite: "Amazon press release, March 2012; Amazon Robotics 2024 update." }, { claim: "Centralized fleet management architecture for AGV warehouses.", cite: "Wurman, D\u2019Andrea, Mountz (2008). Coordinating hundreds of cooperative, autonomous vehicles in warehouses. AI Magazine." }] }, { id: 6, title: "Self-Driving Car \u2014 Level\xA02", year: "2016", accent: ht[5].fill, stats: [{ label: "Sensors", value: "8 cameras, 12 ultrasonics, radar (HW2.5\u2013HW3)" }, { label: "Data", value: "~1.5\u2009TB/day" }, { label: "Planning horizon", value: "~5 seconds" }, { label: "Requires", value: "Human supervision" }], annotation: "It perceives the world in astonishing detail \u2014 but it does not understand it. SAE Level\xA02 means the car can steer, accelerate, and brake on its own, but a human must be ready to take over at any moment. The hardest part of driving isn\u2019t the common case. It\u2019s the 0.01%.", sources: [{ claim: "SAE Level\xA02 definition: combined lateral & longitudinal control with continuous human supervision.", cite: "SAE J3016 (2021 revision).", url: "https://www.sae.org/standards/content/j3016_202104/" }, { claim: "Tesla Autopilot HW2.5/HW3 sensor configuration (2016\u20132021).", cite: "Tesla Motors Inc., Autopilot hardware specification (archived)." }] }, { id: 7, title: "Self-Driving Car \u2014 Level\xA04", year: "2020 \u2192 present", accent: ht[6].fill, stats: [{ label: "Sensors", value: "29 cameras, 5 lidars, 6 radars (Waymo 5th-gen)" }, { label: "Decision cycle", value: "~10\u2009ms" }, { label: "Rider-only miles", value: "70M+", asOf: Kr }, { label: "Planning horizon", value: "~8 seconds" }], annotation: "In 2020, Waymo carried its first rider-only passengers in a small Phoenix geofence. Six years on, the same kind of L4 service runs in Phoenix, San Francisco, Los Angeles, and Austin \u2014 still geofenced, still mapped to the centimeter. Within those areas, Waymo reports about 80% fewer airbag-deployment crashes per mile than the human-driver benchmark for the same regions. Outside those areas, the human is still the driver.", sources: [{ claim: "Waymo One launched fully driverless rides in metro Phoenix in October 2020; service expanded to SF (2023), LA (2024), and Austin (2024).", cite: "Waymo company blog, 2020\u20132024.", url: "https://waymo.com/blog/" }, { claim: "Waymo 5th-generation Driver: 29 cameras, 5 lidars, 6 radars.", cite: "Waymo Driver hardware overview.", url: "https://waymo.com/waymo-driver/" }, { claim: "Within Waymo\u2019s operating areas: ~80% fewer airbag-deployment crashes per mile vs. human-driver benchmark.", cite: "Swiss Re & Waymo joint study (2023, updated 2025).", url: "https://waymo.com/safety/" }, { claim: "Cumulative rider-only autonomous miles passed 50M in late 2025; 70M+ as of mid-2026.", cite: "Waymo public mile counter." }] }, { id: 8, title: "Surgical Robot", year: "2000", accent: ht[7].fill, stats: [{ label: "Degrees of freedom", value: "7 per arm" }, { label: "Tremor filtering", value: "1,000\u2009Hz" }, { label: "Magnification", value: "10\xD7 3D" }, { label: "Motion scaling", value: "up to 5:1" }], annotation: "The da Vinci system does not decide what to do \u2014 a human surgeon controls every motion. But it filters hand tremors at 1,000\u2009Hz, scales 5\u2009cm of surgeon movement down to 1\u2009cm of instrument movement, and renders the field in 10\xD7 stereoscopic 3D. It is autonomy in service of human skill: a cyborg surgeon.", sources: [{ claim: "da Vinci Surgical System received FDA clearance in July 2000.", cite: "U.S. FDA 510(k) clearance K002489.", url: "https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm?ID=K002489" }, { claim: "7 DoF per EndoWrist, 1,000\u2009Hz tremor filtering, 10\xD7 stereo magnification, configurable motion scaling.", cite: "Intuitive Surgical Inc., da Vinci Xi system specification." }] }, { id: 9, title: "Mars Rover", year: "2021 \u2192 present", accent: ht[8].fill, stats: [{ label: "Signal delay", value: "4\u201324\u2009min one-way" }, { label: "Autonomous driving", value: "up to 200\u2009m/sol" }, { label: "Computing", value: "200\u2009MHz RAD750" }, { label: "Mission duration", value: "1,500+ sols", asOf: Kr }], annotation: "A simple \u201Cdrive forward 1\u2009m\u201D command can take 48 minutes to confirm round-trip. So Perseverance plans its own path across terrain it has never seen, every sol. If something goes wrong, help is at least 4 minutes away \u2014 traveling at the speed of light. It is the loneliest robot in the solar system.", sources: [{ claim: "Perseverance landed in Jezero Crater on 18 February 2021 and exceeded its prime mission.", cite: "NASA JPL Perseverance mission page.", url: "https://mars.nasa.gov/mars2020/" }, { claim: "AutoNav onboard navigation; ~200\u2009m/sol typical autonomous drives.", cite: "Verma et al. (2023). Autonomous robotics on Mars. Science Robotics." }, { claim: "200\u2009MHz BAE RAD750 single-board computer.", cite: "BAE Systems RAD750 product datasheet." }] }, { id: 10, title: "Satellite Constellation", year: "2019 \u2192 present", accent: ht[9].fill, stats: [{ label: "Active Starlink satellites", value: "7,500+", asOf: Kr }, { label: "Maneuvers / 6 mo", value: "50,000+" }, { label: "Coordination", value: "Laser inter-sat links" }, { label: "Tracked debris objects", value: "35,000+", asOf: Kr }], annotation: "No ground controller is joysticking 7,500 satellites. Each one tracks its own orbit, monitors collision risk against tens of thousands of debris objects, and fires its ion thruster autonomously to dodge. They talk to each other at the speed of light over laser inter-satellite links. It is a self-organizing swarm in low Earth orbit.", sources: [{ claim: "Starlink first operational launch in May 2019; v2 mini and laser-equipped satellites since 2023.", cite: "SpaceX Starlink launch history.", url: "https://www.spacex.com/launches/" }, { claim: "Active Starlink satellite count tracked publicly via TLE catalogues.", cite: "CelesTrak (Kelso, T.S.).", url: "https://celestrak.org/NORAD/elements/" }, { claim: "~50,000 automated collision-avoidance maneuvers per six-month reporting window.", cite: "SpaceX semi-annual Starlink constellation reports to FCC.", url: "https://www.fcc.gov/" }, { claim: "U.S. Space Surveillance Network tracks ~35,000 objects \u226510\u2009cm.", cite: "ESA Space Environment Report 2024.", url: "https://www.esa.int/Space_Safety/Space_Debris" }] }, { id: 11, title: "Autonomous Scientific Discovery", year: "2020 \u2192 2024", accent: ht[10].fill, stats: [{ label: "Predicted structures", value: "200M+", asOf: Kr }, { label: "Traditional method", value: "Months\u2013years each" }, { label: "AlphaFold runtime", value: "Seconds\u2013minutes" }, { label: "Median accuracy", value: "Rivals X-ray crystallography" }], annotation: "AlphaFold 2 (2020) didn\u2019t just speed up structural biology \u2014 it folded almost every protein known to science in under a year. AlphaFold 3 (2024) extended the same trick to protein\u2013ligand and protein\u2013nucleic-acid complexes. When a system can autonomously make discoveries faster than humans can design experiments, the role of the experiment changes too.", sources: [{ claim: "AlphaFold 2 published November 2020; CASP14 demonstration.", cite: "Jumper et al. (2021). Highly accurate protein structure prediction with AlphaFold. Nature 596:583\u2013589.", url: "https://doi.org/10.1038/s41586-021-03819-2" }, { claim: "AlphaFold 3 launched May 2024; supports protein\u2013ligand & nucleic acids.", cite: "Abramson et al. (2024). Accurate structure prediction of biomolecular interactions with AlphaFold 3. Nature 630:493\u2013500.", url: "https://doi.org/10.1038/s41586-024-07487-w" }, { claim: "200M+ predicted structures hosted in the AlphaFold Protein Structure Database.", cite: "EMBL-EBI AlphaFold DB.", url: "https://alphafold.ebi.ac.uk/" }] }, { id: 12, title: "Von Neumann Probe", year: "Theoretical", accent: ht[11].fill, stats: [{ label: "Sensors", value: "Self-designed" }, { label: "Decisions/sec", value: "All of them" }, { label: "Planning horizon", value: "Geological time" }, { label: "Humans required", value: "0" }], annotation: "A machine that travels to another star system, mines raw material, builds a copy of itself, and sends the copy onward. Repeat. In a few million years \u2014 a blink in cosmic time \u2014 every star in the galaxy has been visited. John von Neumann\u2019s 1948 theory of self-reproducing automata established that a machine can in principle build a copy of itself. The interstellar-probe extension was popularized later, most explicitly by Frank Tipler in 1980. No one has built one. Yet.", sources: [{ claim: "Self-reproducing automata, presented at the Hixon Symposium (1948), published 1966.", cite: "von Neumann, J. (1966). Theory of Self-Reproducing Automata. (A. Burks, ed.) Univ. of Illinois Press." }, { claim: "Interstellar self-replicating probe argument.", cite: "Tipler, F.J. (1980). Extraterrestrial intelligent beings do not exist. QJRAS 21:267\u2013281." }, { claim: "Galaxy-colonization timescales of ~10\u2076 years for self-replicating probes.", cite: "Bracewell, R.N. (1960); also Hart (1975), Tipler (1980)." }] }];
function Rd() {
  const a17 = document.createElement("div");
  return a17.id = "loading-screen", a17.innerHTML = '<div class="loader-ring"></div><p class="loader-text">Loading</p>', document.body.appendChild(a17), a17;
}
function Od() {
  const a17 = document.createElement("section");
  return a17.id = "intro", a17.className = "intro-section", a17.innerHTML = `
    <h1 class="main-title">The Scale of<br>Autonomy</h1>
    <p class="subtitle">From thermostats to starships. Twelve worlds, one common idea: a machine deciding for itself.</p>
    <p class="framing">A scale, not a standard. We borrow ideas from SAE J3016 (cars), Sheridan &amp; Verplank (1978), and Parasuraman, Sheridan &amp; Wickens (2000). The ordering you\u2019ll see is our own.</p>
    <p class="framing-fine">Levels 1\u20135 are deterministic automation. Levels 6\u201312 are adaptive autonomy. We use the broader term throughout.</p>
    <div class="intro-meta">
      <span class="intro-meta-item">12 levels</span>
      <span class="intro-meta-dot">\xB7</span>
      <span class="intro-meta-item">~10 minutes</span>
      <span class="intro-meta-dot">\xB7</span>
      <span class="intro-meta-item">Scroll, or press 1\u20139, 0, \u2013, =</span>
    </div>
    <div class="scroll-indicator">
      <span class="scroll-label">Scroll to begin</span>
      <svg class="scroll-chevrons" viewBox="0 0 24 36" width="20" height="30" aria-hidden="true">
        <path d="M4 6 L12 14 L20 6" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.25"/>
        <path d="M4 15 L12 23 L20 15" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
        <path d="M4 24 L12 32 L20 24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  `, a17;
}
function Ed(a17) {
  return a17.map((t) => {
    const i = t.asOf ? `<span class="stat-asof">as of ${t.asOf}</span>` : "";
    return `<div class="stat"><span class="stat-label">${t.label}</span><span class="stat-value">${t.value}</span>${i}</div>`;
  }).join("");
}
function Ld(a17) {
  const t = document.createElement("section");
  return t.id = `level-${a17.id}`, t.className = "level-section", t.style.setProperty("--level-accent", a17.accent), t.setAttribute("aria-labelledby", `level-${a17.id}-title`), t.innerHTML = `
    <div class="level-content">
      <div class="vignette-area" id="vignette-${a17.id}" role="img" aria-label="Visual depiction of ${a17.title}"></div>
      <div class="level-info">
        <div class="level-header">
          <span class="level-number">Level ${a17.id}</span>
          <h2 class="level-title" id="level-${a17.id}-title">${a17.title}</h2>
          <span class="level-year">${a17.year}</span>
        </div>
        <div class="stat-card">${Ed(a17.stats)}</div>
        <p class="annotation">${a17.annotation}</p>
      </div>
    </div>
  `, t;
}
function Dd(a17) {
  const t = document.createElement("div");
  return t.className = "transition-zone", t.setAttribute("aria-hidden", "true"), t.innerHTML = `
    <div class="transition-line"></div>
    <div class="transition-badge">${a17.id}</div>
    <span class="upcoming-title">${a17.title}</span>
  `, t;
}
function Id() {
  return $e.map((t) => {
    const i = t.sources.map((e) => {
      const r = e.url ? `<a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.cite}</a>` : e.cite;
      return `<li><span class="cite-claim">${e.claim}</span><span class="cite-source">${r}</span></li>`;
    }).join("");
    return `<section class="cite-block"><h3>Level ${t.id} \xB7 ${t.title} <span class="cite-year">${t.year}</span></h3><ul>${i}</ul></section>`;
  }).join("");
}
function $d() {
  const a17 = document.createElement("section");
  return a17.id = "outro", a17.className = "outro-section", a17.innerHTML = `
    <p class="outro-text">The spectrum of autonomy isn\u2019t about replacing humans. It\u2019s about extending what\u2019s possible \u2014 from a thermostat that keeps you warm to a probe that may outlive our sun.</p>
    <div class="outro-actions">
      <button class="btn-top">Back to top</button>
      <button class="btn-share">Share</button>
      <button class="btn-cite" aria-expanded="false" aria-controls="citations-panel">Citations &amp; sources</button>
    </div>
    <div id="citations-panel" class="citations-panel" hidden>
      <div class="citations-head">
        <p class="citations-intro">Every numeric or attributed claim in this exhibit, with the source we relied on. Last verified ${Kr}.</p>
      </div>
      <div class="citations-body">${Id()}</div>
    </div>
    <p class="outro-meta">Last updated ${Kr}. Figures for living systems (Waymo, Starlink, AlphaFold) drift between updates.</p>
  `, a17;
}
function Bd() {
  if (qe) return;
  const a17 = document.createElement("canvas");
  a17.id = "particles", a17.setAttribute("aria-hidden", "true"), document.body.prepend(a17);
  const t = a17.getContext("2d"), i = Math.min(window.devicePixelRatio || 1, 2), e = [];
  function r() {
    a17.width = window.innerWidth * i, a17.height = window.innerHeight * i, t.setTransform(i, 0, 0, i, 0, 0);
  }
  r(), window.addEventListener("resize", r);
  const n = () => window.innerWidth, o = () => window.innerHeight;
  for (let c = 0; c < 200; c++) e.push({ x: Math.random() * n(), y: Math.random() * o(), r: Math.random() * 1.4 + 0.3, vy: -(Math.random() * 0.12 + 0.02), vx: (Math.random() - 0.5) * 0.06, o: Math.random() * 0.3 + 0.06 });
  let s = 0;
  window.addEventListener("scroll", () => {
    s = window.scrollY;
  }, { passive: true });
  function l() {
    const c = n(), d = o();
    t.clearRect(0, 0, c, d);
    const p = s * 0.1;
    for (const u of e) {
      u.x += u.vx, u.y += u.vy, u.y < -10 && (u.y = d + 10, u.x = Math.random() * c), u.x < -10 && (u.x = c + 10), u.x > c + 10 && (u.x = -10);
      const f = ((u.y - p % d) % d + d) % d;
      t.beginPath(), t.arc(u.x, f, u.r, 0, Math.PI * 2), t.fillStyle = `rgba(170,195,255,${u.o})`, t.fill();
    }
    requestAnimationFrame(l);
  }
  l();
}
function Fd() {
  const a17 = document.createElement("div");
  a17.id = "autonomy-meter", a17.setAttribute("aria-hidden", "true"), a17.innerHTML = `
    <div class="meter-track">
      <div class="meter-fill" id="meter-fill"></div>
      ${$e.map((o, s) => `
        <div class="meter-tick" id="meter-tick-${o.id}" style="bottom:${s / ($e.length - 1) * 100}%">
          <span class="meter-label">${o.title}</span>
        </div>
      `).join("")}
    </div>
  `, document.body.appendChild(a17);
  const t = document.getElementById("meter-fill"), i = document.createElement("div");
  i.id = "mobile-progress", i.setAttribute("aria-hidden", "true"), i.innerHTML = `
    <div class="mp-fill" id="mp-fill"></div>
    <div class="mp-caption">
      <span class="mp-num" id="mp-num">Level 1 of ${$e.length}</span>
      <span class="mp-name" id="mp-name">${$e[0].title}</span>
    </div>
  `, document.body.appendChild(i);
  const e = document.getElementById("mp-fill"), r = document.getElementById("mp-num"), n = document.getElementById("mp-name");
  H.create({ trigger: "#level-1", endTrigger: "#outro", start: "top center", end: "top center", onUpdate: (o) => {
    const s = o.progress;
    t.style.height = `${s * 100}%`, e.style.width = `${s * 100}%`;
    const l = Math.min($e.length, Math.max(1, Math.floor(s * $e.length) + 1)), c = $e[l - 1];
    $e.forEach((d) => {
      const p = document.getElementById(`meter-tick-${d.id}`);
      p && p.classList.toggle("active", d.id === l);
    }), r.textContent = `Level ${l} of ${$e.length}`, n.textContent = c.title, i.style.setProperty("--mp-accent", c.accent);
  } });
}
function zd() {
  const a17 = document.createElement("div");
  a17.className = "top-progress", a17.setAttribute("aria-hidden", "true"), document.body.appendChild(a17), H.create({ trigger: "#app", start: "top top", end: "bottom bottom", onUpdate: (t) => {
    a17.style.width = `${t.progress * 100}%`;
  } });
}
function Nd() {
  H.create({ trigger: "#app", start: "top top", end: "bottom bottom", onUpdate: (a17) => {
    const t = a17.progress, i = Math.round(11 - t * 6), e = Math.round(13 - t * 8), r = Math.round(23 - t * 7);
    document.body.style.backgroundColor = `rgb(${i},${e},${r})`;
  } });
}
function Gd() {
  document.addEventListener("keydown", (a17) => {
    if (a17.target instanceof HTMLInputElement || a17.target instanceof HTMLTextAreaElement || a17.metaKey || a17.ctrlKey || a17.altKey) return;
    let t = null;
    const i = parseInt(a17.key);
    if (i >= 1 && i <= 9 ? t = `level-${i}` : a17.key === "0" ? t = "level-10" : a17.key === "-" ? t = "level-11" : a17.key === "=" && (t = "level-12"), t) {
      const e = document.getElementById(t);
      e && e.scrollIntoView({ behavior: qe ? "auto" : "smooth" });
    }
  });
}
function Yd() {
  $e.forEach((t) => {
    const i = document.getElementById(`level-${t.id}`), e = document.getElementById(`vignette-${t.id}`);
    if (!i || !e) return;
    const r = nt.timeline(), n = i.querySelectorAll(".level-header, .stat-card, .annotation");
    r.from(n, { y: 25, opacity: 0, stagger: 0.04, duration: 0.12, ease: "power2.out" }, 0);
    const o = _d(t.id, e, i);
    r.add(o, 0), qe ? (r.progress(1), nt.from(i, { opacity: 0, duration: 0.2, scrollTrigger: { trigger: i, start: "top 80%" } })) : H.create({ trigger: i, start: "top top", end: "+=1200", pin: true, scrub: 1, animation: r });
  }), nt.timeline({ scrollTrigger: { trigger: "#outro", start: "top 70%", end: "top 20%", scrub: qe ? false : 1 } }).from(".outro-text", { y: 40, opacity: 0, duration: 0.6, ease: "power2.out" }).from(".outro-actions", { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, 0.3);
}
function Wd() {
  const a17 = document.querySelector(".btn-cite"), t = document.getElementById("citations-panel");
  !a17 || !t || a17.addEventListener("click", () => {
    const i = a17.getAttribute("aria-expanded") === "true";
    a17.setAttribute("aria-expanded", String(!i)), t.hidden = i, i || t.scrollIntoView({ behavior: qe ? "auto" : "smooth", block: "start" });
  });
}
function aa() {
  qe && document.body.classList.add("reduced-motion");
  const a17 = Rd(), t = document.getElementById("app");
  t.appendChild(Od()), $e.forEach((i, e) => {
    e > 0 && t.appendChild(Dd(i)), t.appendChild(Ld(i));
  }), t.appendChild($d()), Bd(), Fd(), zd(), Nd(), Wd(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      Yd(), Gd(), Al.begin(), nt.to(a17, { opacity: 0, duration: qe ? 0.1 : 0.6, ease: "power2.inOut", onComplete: () => a17.remove() }), qe || (nt.from(".main-title", { opacity: 0, y: 40, duration: 1.2, delay: 0.4, ease: "power3.out" }), nt.from(".subtitle", { opacity: 0, y: 25, duration: 1, delay: 0.7, ease: "power3.out" }), nt.from(".framing", { opacity: 0, y: 18, duration: 0.9, delay: 0.95, ease: "power3.out" }), nt.from(".framing-fine", { opacity: 0, y: 14, duration: 0.8, delay: 1.15, ease: "power3.out" }), nt.from(".intro-meta", { opacity: 0, y: 12, duration: 0.7, delay: 1.35, ease: "power3.out" }), nt.from(".scroll-indicator", { opacity: 0, y: 15, duration: 0.8, delay: 1.55, ease: "power2.out" }), nt.to(".scroll-chevrons", { y: 8, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8 }));
    });
  }), document.addEventListener("click", (i) => {
    const e = i.target;
    e.classList.contains("btn-top") && window.scrollTo({ top: 0, behavior: qe ? "auto" : "smooth" }), e.classList.contains("btn-share") && (navigator.share ? navigator.share({ title: "The Scale of Autonomy", text: "From thermostats to starships \u2014 an interactive journey through every level of autonomous systems.", url: window.location.href }) : navigator.clipboard && navigator.clipboard.writeText(window.location.href).then(() => {
      e.textContent = "Link copied!", setTimeout(() => {
        e.textContent = "Share";
      }, 2e3);
    }));
  });
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", aa) : aa();
