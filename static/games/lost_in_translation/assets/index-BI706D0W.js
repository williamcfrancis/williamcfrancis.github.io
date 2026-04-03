(function() {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
  new MutationObserver((e) => {
    for (const o of e) if (o.type === "childList") for (const t of o.addedNodes) t.tagName === "LINK" && t.rel === "modulepreload" && u(t);
  }).observe(document, { childList: true, subtree: true });
  function i(e) {
    const o = {};
    return e.integrity && (o.integrity = e.integrity), e.referrerPolicy && (o.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? o.credentials = "include" : e.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function u(e) {
    if (e.ep) return;
    e.ep = true;
    const o = i(e);
    fetch(e.href, o);
  }
})();
function R(n) {
  return [...n.toUpperCase()].map((a) => String.fromCodePoint(a.charCodeAt(0) + 127397)).join("");
}
const Si = [{ code: "en", name: "English", nativeName: "English", countryCode: "GB" }, { code: "ja", name: "Japanese", nativeName: "\u65E5\u672C\u8A9E", countryCode: "JP", nonLatin: true }, { code: "sw", name: "Swahili", nativeName: "Kiswahili", countryCode: "KE" }, { code: "ar", name: "Arabic", nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", countryCode: "SA", rtl: true, nonLatin: true }, { code: "hi", name: "Hindi", nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940", countryCode: "IN", nonLatin: true }, { code: "ko", name: "Korean", nativeName: "\uD55C\uAD6D\uC5B4", countryCode: "KR", nonLatin: true }, { code: "is", name: "Icelandic", nativeName: "\xCDslenska", countryCode: "IS" }, { code: "vi", name: "Vietnamese", nativeName: "Ti\u1EBFng Vi\u1EC7t", countryCode: "VN" }, { code: "tr", name: "Turkish", nativeName: "T\xFCrk\xE7e", countryCode: "TR" }, { code: "el", name: "Greek", nativeName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", countryCode: "GR", nonLatin: true }, { code: "th", name: "Thai", nativeName: "\u0E44\u0E17\u0E22", countryCode: "TH", nonLatin: true }, { code: "he", name: "Hebrew", nativeName: "\u05E2\u05D1\u05E8\u05D9\u05EA", countryCode: "IL", rtl: true, nonLatin: true }, { code: "yo", name: "Yoruba", nativeName: "Yor\xF9b\xE1", countryCode: "NG" }, { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", countryCode: "ID" }, { code: "hu", name: "Hungarian", nativeName: "Magyar", countryCode: "HU" }, { code: "fa", name: "Farsi", nativeName: "\u0641\u0627\u0631\u0633\u06CC", countryCode: "IR", rtl: true, nonLatin: true }, { code: "zh-CN", name: "Chinese", nativeName: "\u4E2D\u6587", countryCode: "CN", nonLatin: true }, { code: "zu", name: "Zulu", nativeName: "isiZulu", countryCode: "ZA" }, { code: "pt", name: "Portuguese", nativeName: "Portugu\xEAs", countryCode: "PT" }, { code: "ru", name: "Russian", nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", countryCode: "RU", nonLatin: true }, { code: "fr", name: "French", nativeName: "Fran\xE7ais", countryCode: "FR" }, { code: "de", name: "German", nativeName: "Deutsch", countryCode: "DE" }, { code: "es", name: "Spanish", nativeName: "Espa\xF1ol", countryCode: "ES" }, { code: "it", name: "Italian", nativeName: "Italiano", countryCode: "IT" }, { code: "nl", name: "Dutch", nativeName: "Nederlands", countryCode: "NL" }, { code: "pl", name: "Polish", nativeName: "Polski", countryCode: "PL" }, { code: "uk", name: "Ukrainian", nativeName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", countryCode: "UA", nonLatin: true }, { code: "cs", name: "Czech", nativeName: "\u010Ce\u0161tina", countryCode: "CZ" }, { code: "ro", name: "Romanian", nativeName: "Rom\xE2n\u0103", countryCode: "RO" }, { code: "sv", name: "Swedish", nativeName: "Svenska", countryCode: "SE" }, { code: "da", name: "Danish", nativeName: "Dansk", countryCode: "DK" }, { code: "fi", name: "Finnish", nativeName: "Suomi", countryCode: "FI" }, { code: "no", name: "Norwegian", nativeName: "Norsk", countryCode: "NO" }, { code: "bg", name: "Bulgarian", nativeName: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", countryCode: "BG", nonLatin: true }, { code: "hr", name: "Croatian", nativeName: "Hrvatski", countryCode: "HR" }, { code: "sk", name: "Slovak", nativeName: "Sloven\u010Dina", countryCode: "SK" }, { code: "sl", name: "Slovenian", nativeName: "Sloven\u0161\u010Dina", countryCode: "SI" }, { code: "et", name: "Estonian", nativeName: "Eesti", countryCode: "EE" }, { code: "lv", name: "Latvian", nativeName: "Latvie\u0161u", countryCode: "LV" }, { code: "lt", name: "Lithuanian", nativeName: "Lietuvi\u0173", countryCode: "LT" }, { code: "ka", name: "Georgian", nativeName: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8", countryCode: "GE", nonLatin: true }, { code: "hy", name: "Armenian", nativeName: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", countryCode: "AM", nonLatin: true }, { code: "bn", name: "Bengali", nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE", countryCode: "BD", nonLatin: true }, { code: "ta", name: "Tamil", nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", countryCode: "LK", nonLatin: true }, { code: "te", name: "Telugu", nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", countryCode: "IN", nonLatin: true }, { code: "ml", name: "Malayalam", nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02", countryCode: "IN", nonLatin: true }, { code: "my", name: "Myanmar", nativeName: "\u1019\u103C\u1014\u103A\u1019\u102C", countryCode: "MM", nonLatin: true }, { code: "km", name: "Khmer", nativeName: "\u1781\u17D2\u1798\u17C2\u179A", countryCode: "KH", nonLatin: true }, { code: "lo", name: "Lao", nativeName: "\u0EA5\u0EB2\u0EA7", countryCode: "LA", nonLatin: true }, { code: "ne", name: "Nepali", nativeName: "\u0928\u0947\u092A\u093E\u0932\u0940", countryCode: "NP", nonLatin: true }, { code: "mn", name: "Mongolian", nativeName: "\u041C\u043E\u043D\u0433\u043E\u043B", countryCode: "MN", nonLatin: true }, { code: "ms", name: "Malay", nativeName: "Melayu", countryCode: "MY" }, { code: "tl", name: "Filipino", nativeName: "Filipino", countryCode: "PH" }, { code: "ur", name: "Urdu", nativeName: "\u0627\u0631\u062F\u0648", countryCode: "PK", rtl: true, nonLatin: true }, { code: "am", name: "Amharic", nativeName: "\u12A0\u121B\u122D\u129B", countryCode: "ET", nonLatin: true }, { code: "ha", name: "Hausa", nativeName: "Hausa", countryCode: "NE" }, { code: "ig", name: "Igbo", nativeName: "Igbo", countryCode: "NG" }, { code: "mg", name: "Malagasy", nativeName: "Malagasy", countryCode: "MG" }, { code: "so", name: "Somali", nativeName: "Soomaali", countryCode: "SO" }, { code: "sq", name: "Albanian", nativeName: "Shqip", countryCode: "AL" }, { code: "cy", name: "Welsh", nativeName: "Cymraeg", countryCode: "GB" }, { code: "ga", name: "Irish", nativeName: "Gaeilge", countryCode: "IE" }, { code: "mt", name: "Maltese", nativeName: "Malti", countryCode: "MT" }, { code: "la", name: "Latin", nativeName: "Latina", countryCode: "VA" }, { code: "az", name: "Azerbaijani", nativeName: "Az\u0259rbaycan", countryCode: "AZ" }, { code: "kk", name: "Kazakh", nativeName: "\u049A\u0430\u0437\u0430\u049B", countryCode: "KZ", nonLatin: true }, { code: "uz", name: "Uzbek", nativeName: "O'zbek", countryCode: "UZ" }, { code: "mi", name: "Maori", nativeName: "Te Reo M\u0101ori", countryCode: "NZ" }];
function Na(n) {
  return Si.find((a) => a.code === n);
}
const Hu = ["en", "ja", "sw", "ar", "hi", "ko", "is", "vi", "tr", "el", "th", "he", "yo", "id", "hu", "fa", "zh-CN", "zu", "pt", "ru", "en"], _u = ["en", "ja", "sw", "ar", "hi", "ko", "is", "vi", "tr", "el", "th", "he", "yo", "id", "hu", "fa", "zh-CN", "zu", "pt", "ru", "fr", "bn", "ka", "am", "lo", "mn", "cs", "fi", "sq", "cy", "ta", "km", "my", "ur", "bg", "ro", "ms", "tl", "ne", "az", "kk", "et", "lv", "lt", "mg", "so", "ga", "mt", "la", "mi", "en"], Qu = Hu.map(Na), Ei = _u.map(Na);
function yu(n, a, i, u) {
  let e = [...a];
  function o() {
    n.innerHTML = `
      <div class="customize-panel">
        <div class="customize-header">
          <h2>Customize Language Chain</h2>
          <button class="close-btn" id="cust-close">\u2715</button>
        </div>
        <p class="customize-hint">
          Drag to reorder. First and last must be English. Minimum 5 languages.
        </p>
        <div class="chain-list" id="chain-list"></div>
        <div class="add-language">
          <select id="add-lang-select">
            <option value="">+ Add a language\u2026</option>
          </select>
        </div>
        <div class="customize-actions">
          <button class="btn-secondary" id="cust-cancel">Cancel</button>
          <button class="btn-primary" id="cust-save">Save chain (${e.length} languages)</button>
        </div>
      </div>
    `;
    const t = n.querySelector("#chain-list"), h = n.querySelector("#add-lang-select");
    e.forEach((g, c) => {
      const d = c === 0 || c === e.length - 1, r = document.createElement("div");
      r.className = "chain-item" + (d ? " fixed" : ""), r.draggable = !d, r.dataset.index = String(c), r.innerHTML = `
        <span class="drag-handle">${d ? "" : "\u22EE\u22EE"}</span>
        <span class="ci-flag">${R(g.countryCode)}</span>
        <span class="ci-name">${g.name}</span>
        <span class="ci-native">${g.nativeName}</span>
        ${d ? '<span class="ci-fixed">fixed</span>' : `<button class="ci-remove" data-idx="${c}">\u2715</button>`}
      `, t.appendChild(r);
    });
    const Y = new Set(e.map((g) => g.code));
    Si.filter((g) => !Y.has(g.code)).forEach((g) => {
      const c = document.createElement("option");
      c.value = g.code, c.textContent = `${R(g.countryCode)} ${g.name} (${g.nativeName})`, h.appendChild(c);
    });
    let l = null;
    t.addEventListener("dragstart", (g) => {
      const c = g.target.closest(".chain-item");
      c && (l = parseInt(c.dataset.index), c.classList.add("dragging"), g.dataTransfer.effectAllowed = "move");
    }), t.addEventListener("dragend", (g) => {
      const c = g.target.closest(".chain-item");
      c && c.classList.remove("dragging"), l = null, t.querySelectorAll(".chain-item").forEach((d) => d.classList.remove("drag-over"));
    }), t.addEventListener("dragover", (g) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move";
      const c = g.target.closest(".chain-item");
      if (!c) return;
      const d = parseInt(c.dataset.index);
      d === 0 || d === e.length - 1 || (t.querySelectorAll(".chain-item").forEach((r) => r.classList.remove("drag-over")), c.classList.add("drag-over"));
    }), t.addEventListener("drop", (g) => {
      if (g.preventDefault(), l === null) return;
      const c = g.target.closest(".chain-item");
      if (!c) return;
      const d = parseInt(c.dataset.index);
      if (d === 0 || d === e.length - 1 || l === d) return;
      const [r] = e.splice(l, 1);
      e.splice(d, 0, r), o();
    }), t.addEventListener("click", (g) => {
      const c = g.target.closest(".ci-remove");
      if (!c || e.length <= 5) return;
      const d = parseInt(c.dataset.idx);
      e.splice(d, 1), o();
    }), h.addEventListener("change", () => {
      const g = h.value;
      if (!g) return;
      const c = Si.find((d) => d.code === g);
      c && (e.splice(e.length - 1, 0, c), o());
    }), n.querySelector("#cust-close").addEventListener("click", u), n.querySelector("#cust-cancel").addEventListener("click", u), n.querySelector("#cust-save").addEventListener("click", () => {
      e.length < 5 || i(e);
    });
  }
  o();
}
const Mu = ["The early bird catches the worm", "I can't believe it's not butter", "To be or not to be, that is the question", "Whoever fights monsters should see to it that in the process they do not become a monster"];
function mu(n, a) {
  let i = [...Qu], u = false;
  n.innerHTML = `
    <div class="landing">
      <div class="landing-content">
        <h1 class="title">Lost in Translation</h1>
        <div class="input-wrapper">
          <textarea
            id="sentence-input"
            rows="2"
            maxlength="500"
            spellcheck="false"
            placeholder=""
          ></textarea>
          <div class="cursor-blink" id="fake-cursor"></div>
        </div>
        <p class="subtitle">
          Type a sentence. Watch it travel through 20 languages and back.
          See what survives.
        </p>
        <div class="actions">
          <button id="translate-btn" class="btn-primary" disabled>Translate</button>
          <button id="customize-btn" class="btn-secondary">Customize chain</button>
          <button id="chaos-btn" class="btn-chaos">
            <span class="chaos-icon">&#9760;</span> Chaos mode
          </button>
        </div>
        <div class="chain-preview" id="chain-preview"></div>
        <div class="suggestions">
          <p class="suggestions-label">Or try one of these:</p>
          <div class="suggestion-buttons" id="suggestion-buttons"></div>
        </div>
      </div>
      <div id="customize-overlay" class="customize-overlay hidden"></div>
    </div>
  `;
  const e = n.querySelector("#sentence-input"), o = n.querySelector("#fake-cursor"), t = n.querySelector("#translate-btn"), h = n.querySelector("#customize-btn"), Y = n.querySelector("#chaos-btn"), l = n.querySelector("#chain-preview"), g = n.querySelector("#suggestion-buttons"), c = n.querySelector("#customize-overlay");
  Mu.forEach((r) => {
    const C = document.createElement("button");
    C.className = "suggestion-btn", C.textContent = `"${r}"`, C.addEventListener("click", () => {
      e.value = r, e.dispatchEvent(new Event("input")), e.focus();
    }), g.appendChild(C);
  });
  function d() {
    const C = (u ? Ei : i).map((y) => `<span class="chain-flag" title="${y.name}">${R(y.countryCode)}</span>`);
    l.innerHTML = C.join('<span class="chain-arrow">\u2192</span>');
  }
  d(), e.addEventListener("input", () => {
    const r = e.value.trim().length > 0;
    t.disabled = !r, o.classList.toggle("hidden", r);
  }), e.addEventListener("focus", () => {
    e.value.trim().length === 0 && o.classList.remove("hidden");
  }), e.addEventListener("blur", () => {
    e.value.trim().length === 0 && o.classList.remove("hidden");
  }), e.focus(), t.addEventListener("click", () => {
    const r = e.value.trim();
    r && a(r, u ? [...Ei] : [...i]);
  }), e.addEventListener("keydown", (r) => {
    r.key === "Enter" && !r.shiftKey && (r.preventDefault(), t.click());
  }), Y.addEventListener("click", () => {
    u = !u, Y.classList.toggle("active", u), Y.innerHTML = u ? '<span class="chaos-icon">&#9760;</span> Chaos mode ON (50 languages)' : '<span class="chaos-icon">&#9760;</span> Chaos mode', d();
  }), h.addEventListener("click", () => {
    c.classList.remove("hidden"), yu(c, i, (r) => {
      i = r, u = false, Y.classList.remove("active"), Y.innerHTML = '<span class="chaos-icon">&#9760;</span> Chaos mode', d(), c.classList.add("hidden");
    }, () => c.classList.add("hidden"));
  });
}
async function Wi(n, a, i) {
  const u = await fetch("/.netlify/functions/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: n, sourceLang: a, targetLang: i }) });
  if (!u.ok) {
    const e = await u.json().catch(() => ({ error: "Translation failed" }));
    throw new Error(e.error || `HTTP ${u.status}`);
  }
  return u.json();
}
function wu(n, a) {
  const i = n.length, u = a.length, e = Array.from({ length: i + 1 }, () => Array(u + 1).fill(0));
  for (let o = 0; o <= i; o++) e[o][0] = o;
  for (let o = 0; o <= u; o++) e[0][o] = o;
  for (let o = 1; o <= i; o++) for (let t = 1; t <= u; t++) e[o][t] = n[o - 1] === a[t - 1] ? e[o - 1][t - 1] : 1 + Math.min(e[o - 1][t - 1], e[o - 1][t], e[o][t - 1]);
  return e[i][u];
}
function Ji(n) {
  return n.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
}
function Bu(n, a) {
  const i = Ji(n), u = new Set(Ji(a));
  return i.length === 0 ? 0 : i.filter((o) => u.has(o)).length / i.length;
}
function Fu(n, a) {
  const i = Bu(n, a), u = Math.max(n.length, a.length), e = u > 0 ? wu(n.toLowerCase(), a.toLowerCase()) / u : 0, o = 0.6 * (1 - i) + 0.4 * e;
  return Math.min(1, Math.max(0, o));
}
function bu(n, a) {
  const i = new Set(Ji(a));
  return n.split(/\s+/).map((u) => ({ word: u, preserved: i.has(u.toLowerCase().replace(/[^\w]/g, "")) }));
}
var xu = ["\0", "", "", "", "", "", "", "\x07", "\b", "	", `
`, "\v", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "\x1B", "", "", "", "", " ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\x7F", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, " ", "!", "C/", "PS", "$?", "Y=", "|", "SS", '"', "(c)", "a", "<<", "!", null, "(r)", "-", "deg", "+-", "2", "3", "'", "u", "P", "*", ",", "1", "o", ">>", "1/4", "1/2", "3/4", "?", "A", "A", "A", "A", "A", "A", "AE", "C", "E", "E", "E", "E", "I", "I", "I", "I", "D", "N", "O", "O", "O", "O", "O", "x", "O", "U", "U", "U", "U", "U", "Th", "ss", "a", "a", "a", "a", "a", "a", "ae", "c", "e", "e", "e", "e", "i", "i", "i", "i", "d", "n", "o", "o", "o", "o", "o", "/", "o", "u", "u", "u", "u", "y", "th", "y"], Gu = ["A", "a", "A", "a", "A", "a", "C", "c", "C", "c", "C", "c", "C", "c", "D", "d", "D", "d", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "G", "g", "G", "g", "G", "g", "G", "g", "H", "h", "H", "h", "I", "i", "I", "i", "I", "i", "I", "i", "I", "i", "IJ", "ij", "J", "j", "K", "k", "k", "L", "l", "L", "l", "L", "l", "L", "l", "L", "l", "N", "n", "N", "n", "N", "n", "'n", "NG", "ng", "O", "o", "O", "o", "O", "o", "OE", "oe", "R", "r", "R", "r", "R", "r", "S", "s", "S", "s", "S", "s", "S", "s", "T", "t", "T", "t", "T", "t", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "W", "w", "Y", "y", "Y", "Z", "z", "Z", "z", "Z", "z", "s", "b", "B", "B", "b", "6", "6", "O", "C", "c", "D", "D", "D", "d", "d", "3", "@", "E", "F", "f", "G", "G", "hv", "I", "I", "K", "k", "l", "l", "W", "N", "n", "O", "O", "o", "OI", "oi", "P", "p", "YR", "2", "2", "SH", "sh", "t", "T", "t", "T", "U", "u", "Y", "V", "Y", "y", "Z", "z", "ZH", "ZH", "zh", "zh", "2", "5", "5", "ts", "w", "|", "||", "|=", "!", "DZ", "Dz", "dz", "LJ", "Lj", "lj", "NJ", "Nj", "nj", "A", "a", "I", "i", "O", "o", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "@", "A", "a", "A", "a", "AE", "ae", "G", "g", "G", "g", "K", "k", "O", "o", "O", "o", "ZH", "zh", "j", "DZ", "D", "dz", "G", "g", "HV", "W", "N", "n", "A", "a", "AE", "ae", "O", "o"], Nu = ["A", "a", "A", "a", "E", "e", "E", "e", "I", "i", "I", "i", "O", "o", "O", "o", "R", "r", "R", "r", "U", "u", "U", "u", "S", "s", "T", "t", "Y", "y", "H", "h", "N", "d", "OU", "ou", "Z", "z", "A", "a", "E", "e", "O", "o", "O", "o", "O", "o", "O", "o", "Y", "y", "l", "n", "t", "j", "db", "qp", "A", "C", "c", "L", "T", "s", "z", "?", "?", "B", "U", "V", "E", "e", "J", "j", "Q", "q", "R", "r", "Y", "y", "a", "a", "a", "b", "o", "c", "d", "d", "e", "@", "@", "e", "e", "e", "e", "j", "g", "g", "g", "g", "u", "Y", "h", "h", "i", "i", "I", "l", "l", "l", "lZ", "W", "W", "m", "n", "n", "n", "o", "OE", "O", "F", "R", "R", "R", "R", "r", "r", "R", "R", "R", "s", "S", "j", "S", "S", "t", "t", "U", "U", "v", "^", "W", "Y", "Y", "z", "z", "Z", "Z", "?", "?", "?", "C", "@", "B", "E", "G", "H", "j", "k", "L", "q", "?", "?", "dz", "dZ", "dz", "ts", "tS", "tC", "fN", "ls", "lz", "WW", "]]", "h", "h", "k", "h", "j", "r", "r", "r", "r", "w", "y", "'", '"', "`", "'", "`", "`", "'", "?", "?", "<", ">", "^", "V", "^", "V", "'", "-", "/", "\\", ",", "_", "\\", "/", ":", ".", "`", "'", "^", "V", "+", "-", "V", ".", "@", ",", "~", '"', "R", "X", "G", "l", "s", "x", "?", null, null, null, null, null, null, null, "V", "=", '"'], vu = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "'", ",", null, null, null, null, null, null, null, null, "?", null, null, null, null, null, null, null, "A", ";", "E", "I", "I", null, "O", null, "U", "O", "I", "A", "V", "G", "D", "E", "Z", "I", "Th", "I", "K", "L", "M", "N", "X", "O", "P", "R", null, "S", "T", "Y", "F", "H", "Ps", "O", "I", "Y", "a", "e", "i", "i", "y", "a", "v", "g", "d", "e", "z", "i", "th", "i", "k", "l", "m", "n", "x", "o", "p", "r", "s", "s", "t", "y", "f", "h", "ps", "o", "i", "y", "o", "y", "o", null, "b", "th", "U", "U", "U", "ph", "p", "&", null, null, "St", "st", "W", "w", "Q", "q", "Sp", "sp", "Sh", "sh", "F", "f", "Kh", "kh", "H", "h", "G", "g", "CH", "ch", "Ti", "ti", "k", "r", "c", "j"], ku = ["Jo", "Yo", "Dj", "Gj", "Ie", "Dz", "I", "Yi", "J", "Lj", "Nj", "Tsh", "Kj", "I", "U", "Dzh", "A", "B", "V", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "H", "C", "Ch", "Sh", "Shch", null, "Y", null, "E", "Yu", "Ya", "a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "ch", "sh", "shch", null, "y", null, "e", "yu", "ya", "je", "yo", "dj", "gj", "ie", "dz", "i", "yi", "j", "lj", "nj", "tsh", "kj", "i", "u", "dzh", "O", "o", "E", "e", "Ie", "ie", "E", "e", "Ie", "ie", "O", "o", "Io", "io", "Ks", "ks", "Ps", "ps", "F", "f", "Y", "y", "Y", "y", "u", "u", "O", "o", "O", "o", "Ot", "ot", "Q", "q", "*1000*", null, null, null, null, null, "*100.000*", "*1.000.000*", null, null, '"', '"', "R'", "r'", "G'", "g'", "G'", "g'", "G'", "g'", "Zh'", "zh'", "Z'", "z'", "K'", "k'", "K'", "k'", "K'", "k'", "K'", "k'", "N'", "n'", "Ng", "ng", "P'", "p'", "Kh", "kh", "S'", "s'", "T'", "t'", "U", "u", "U'", "u'", "Kh'", "kh'", "Tts", "tts", "Ch'", "ch'", "Ch'", "ch'", "H", "h", "Ch", "ch", "Ch'", "ch'", "`", "Zh", "zh", "K'", "k'", null, null, "N'", "n'", null, null, "Ch", "ch", null, null, null, "a", "a", "A", "a", "Ae", "ae", "Ie", "ie", "@", "@", "@", "@", "Zh", "zh", "Z", "z", "Dz", "dz", "I", "i", "I", "i", "O", "o", "O", "o", "O", "o", "E", "e", "U", "u", "U", "u", "U", "u", "Ch", "ch", null, null, "Y", "y"], Pu = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "B", "G", "D", "E", "Z", "E", "E", "T`", "Zh", "I", "L", "Kh", "Ts", "K", "H", "Dz", "Gh", "Ch", "M", "Y", "N", "Sh", "O", "Ch`", "P", "J", "Rh", "S", "V", "T", "R", "Ts`", "W", "P`", "K`", "O", "F", null, null, "<", "'", "/", "!", ",", "?", ".", null, "a", "b", "g", "d", "e", "z", "e", "e", "t`", "zh", "i", "l", "kh", "ts", "k", "h", "dz", "gh", "ch", "m", "y", "n", "sh", "o", "ch`", "p", "j", "rh", "s", "v", "t", "r", "ts`", "w", "p`", "k`", "o", "f", "ew", null, ".", "-", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "@", "e", "a", "o", "i", "e", "e", "a", "a", "o", null, "u", "'", null, null, null, null, null, null, ":", null, null, null, null, null, null, null, null, null, null, null, null, null, "b", "g", "d", "h", "v", "z", "kh", "t", "y", "k", "k", "l", "m", "m", "n", "n", "s", "`", "p", "p", "ts", "ts", "q", "r", "sh", "t", null, null, null, null, null, "V", "oy", "i", "'", '"'], Ku = [null, null, null, null, null, null, null, null, null, null, null, null, ",", null, null, null, null, null, null, null, null, null, null, null, null, null, null, ";", null, null, null, "?", null, null, "a", "'", "w'", null, "y'", null, "b", "@", "t", "th", "j", "H", "kh", "d", "dh", "r", "z", "s", "sh", "S", "D", "T", "Z", "aa", "G", null, null, null, null, null, null, "f", "q", "k", "l", "m", "n", "h", "w", "~", "y", "an", "un", "in", "a", "u", "i", "W", null, null, "'", "'", null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "%", ".", ",", "*", null, null, null, "'", "'", "'", null, "'", "'w", "'u", "'y", "tt", "tth", "b", "t", "T", "p", "th", "bh", "'h", "H", "ny", "dy", "H", "ch", "cch", "dd", "D", "D", "Dt", "dh", "ddh", "d", "D", "D", "rr", "R", "R", "R", "R", "R", "R", "j", "R", "S", "S", "S", "S", "S", "T", "GH", "F", "F", "F", "v", "f", "ph", "Q", "Q", "kh", "k", "K", "K", "ng", "K", "g", "G", "N", "G", "G", "G", "L", "L", "L", "L", "N", "N", "N", "N", "N", "h", "Ch", "hy", "h", "H", "@", "W", "oe", "oe", "u", "yu", "yu", "W", "v", "y", "Y", "Y", "W", null, null, "y", "y'", ".", "ae", null, null, null, null, null, null, null, "@", "#", null, null, null, null, null, null, null, null, null, null, "^", null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Sh", "D", "Gh", "&", "+m"], Eu = ["//", "/", ",", "!", "!", "-", ",", ",", ";", "?", "~", "{", "}", "*", null, null, "'", null, "b", "g", "g", "d", "d", "h", "w", "z", "H", "t", "t", "y", "yh", "k", "l", "m", "n", "s", "s", "`", "p", "p", "S", "q", "r", "sh", "t", null, null, null, "a", "a", "a", "A", "A", "A", "e", "e", "e", "E", "i", "i", "u", "u", "u", "o", null, "`", "'", null, null, "X", "Q", "@", "@", "|", "+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "h", "sh", "n", "r", "b", "L", "k", "'", "v", "m", "f", "dh", "th", "l", "g", "ny", "s", "d", "z", "t", "y", "p", "j", "ch", "tt", "hh", "kh", "th", "z", "sh", "s", "d", "t", "z", "`", "gh", "q", "w", "a", "aa", "i", "ee", "u", "oo", "e", "ey", "o", "oa"], Wu = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", "eN", "e", "e", "ai", "oN", "o", "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "nnn", "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "l", "lll", "v", "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", "RR", "eN", "e", "e", "ai", "oN", "o", "o", "au", null, null, null, "AUM", "'", "'", "`", "'", null, null, null, "q", "khh", "ghh", "z", "dddh", "rh", "f", "yy", "RR", "LL", "L", "LL", " / ", " // ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "RR", null, null, "e", "ai", null, null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", null, "l", null, null, null, "sh", "ss", "s", "h", null, null, "'", null, "aa", "i", "ii", "u", "uu", "R", "RR", null, null, "e", "ai", null, null, "o", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, "rr", "rh", null, "yy", "RR", "LL", "L", "LL", null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "r'", "r`", "Rs", "Rs", "1/", "2/", "3/", "4/", " 1 - 1/", "/16"], Ru = [null, null, "N", null, null, "a", "aa", "i", "ii", "u", "uu", null, null, null, null, "ee", "ai", null, null, "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bb", "m", "y", "r", null, "l", "ll", null, "v", "sh", null, "s", "h", null, null, "'", null, "aa", "i", "ii", "u", "uu", null, null, null, null, "ee", "ai", null, null, "oo", "au", null, null, null, null, null, null, null, null, null, null, null, null, "khh", "ghh", "z", "rr", null, "f", null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "N", "H", null, null, "G.E.O.", null, null, null, null, null, null, null, null, null, null, null, null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", null, "eN", null, "e", "ai", "oN", null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "ya", "r", null, "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", "RR", "eN", null, "e", "ai", "oN", null, "o", "au", null, null, null, "AUM", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "RR", null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], Au = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, null, "e", "ai", null, null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", null, "l", "ll", null, null, "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", null, null, null, "e", "ai", null, null, "o", "au", null, null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, "rr", "rh", null, "yy", "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", null, null, null, "e", "ee", "ai", null, "o", "oo", "au", "k", null, null, null, "ng", "c", null, "j", null, "ny", "tt", null, null, null, "nn", "t", null, null, null, "n", "nnn", "p", null, null, null, "m", "y", "r", "rr", "l", "ll", "lll", "v", null, "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", null, null, null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+10+", "+100+", "+1000+"], zu = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, null, null, null, null, null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, null, null, null, "lll", null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], Ou = [null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", "lll", "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", null, null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, null, null, null, null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "ae", "aae", "i", "ii", "u", "uu", "R", "RR", "L", "LL", "e", "ee", "ai", "o", "oo", "au", null, null, null, "k", "kh", "g", "gh", "ng", "nng", "c", "ch", "j", "jh", "ny", "jny", "nyj", "tt", "tth", "dd", "ddh", "nn", "nndd", "t", "th", "d", "dh", "n", null, "nd", "p", "ph", "b", "bh", "m", "mb", "y", "r", null, "l", null, null, "v", "sh", "ss", "s", "h", "ll", "f", null, null, null, null, null, null, null, null, "aa", "ae", "aae", "i", "ii", "u", null, "uu", null, "R", "e", "ee", "ai", "o", "oo", "au", "L", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "RR", "LL", " . "], ju = [null, "k", "kh", "kh", "kh", "kh", "kh", "ng", "cch", "ch", "ch", "ch", "ch", "y", "d", "t", "th", "th", "th", "n", "d", "t", "th", "th", "th", "n", "b", "p", "ph", "f", "ph", "f", "ph", "m", "y", "r", "R", "l", "L", "w", "s", "s", "s", "h", "l", "`", "h", "~", "a", "a", "aa", "am", "i", "ii", "ue", "uue", "u", "uu", "'", null, null, null, null, "Bh.", "e", "ae", "o", "ai", "ai", "ao", "+", null, null, null, null, null, null, "M", null, " * ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " // ", " /// ", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", null, "kh", null, null, "ng", "ch", null, "s", null, null, "ny", null, null, null, null, null, null, "d", "h", "th", "th", null, "n", "b", "p", "ph", "f", "ph", "f", null, "m", "y", "r", null, "l", null, "w", null, null, "s", "h", null, "`", null, "~", "a", null, "aa", "am", "i", "ii", "y", "yy", "u", "uu", null, "o", "l", "ny", null, null, "e", "ei", "o", "ay", "ai", null, "+", null, null, null, null, null, null, "M", null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, "hn", "hm"], Iu = ["AUM", null, null, null, null, null, null, null, " // ", " * ", null, "-", " / ", " / ", " // ", " -/ ", " +/ ", " X/ ", " /XX/ ", " /X/ ", ",", null, null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".5", "1.5", "2.5", "3.5", "4.5", "5.5", "6.5", "7.5", "8.5", "-.5", "+", "*", "^", "_", null, "~", null, "]", "[[", "]]", null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", null, "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "ts", "tsh", "dz", "dzh", "w", "zh", "z", "'", "y", "r", "l", "sh", "ssh", "s", "h", "a", "kss", "r", null, null, null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", "L", "LL", "e", "ee", "o", "oo", "M", "H", "i", "ii", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", null, "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "ts", "tsh", "dz", "dzh", "w", "zh", "z", "'", "y", "r", "l", "sh", "ss", "s", "h", "a", "kss", "w", "y", "r", null, "X", " :X: ", " /O/ ", " /o/ ", " \\o\\ ", " (O) "], Uu = ["k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "nny", "tt", "tth", "dd", "ddh", "nn", "tt", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "w", "s", "h", "ll", "a", null, "i", "ii", "u", "uu", "e", null, "o", "au", null, "aa", "i", "ii", "u", "uu", "e", "ai", null, null, null, "N", "'", ":", null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " / ", " // ", "n*", "r*", "l*", "e*", "sh", "ss", "R", "RR", "L", "LL", "R", "RR", "L", "LL", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "B", "G", "D", "E", "V", "Z", "T`", "I", "K", "L", "M", "N", "O", "P", "Zh", "R", "S", "T", "U", "P`", "K`", "G'", "Q", "Sh", "Ch`", "C`", "Z'", "C", "Ch", "X", "J", "H", "E", "Y", "W", "Xh", "OE", null, null, null, null, null, null, null, null, null, null, "a", "b", "g", "d", "e", "v", "z", "t`", "i", "k", "l", "m", "n", "o", "p", "zh", "r", "s", "t", "u", "p`", "k`", "g'", "q", "sh", "ch`", "c`", "z'", "c", "ch", "x", "j", "h", "e", "y", "w", "xh", "oe", "f", null, null, null, null, " // "], $u = ["g", "gg", "n", "d", "dd", "r", "m", "b", "bb", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", "ng", "nn", "nd", "nb", "dg", "rn", "rr", "rh", "rN", "mb", "mN", "bg", "bn", null, "bs", "bsg", "bst", "bsb", "bss", "bsj", "bj", "bc", "bt", "bp", "bN", "bbN", "sg", "sn", "sd", "sr", "sm", "sb", "sbg", "sss", "s", "sj", "sc", "sk", "st", "sp", "sh", null, null, null, null, "Z", "g", "d", "m", "b", "s", "Z", null, "j", "c", "t", "p", "N", "j", null, null, null, null, "ck", "ch", null, null, "pb", "pN", "hh", "Q", null, null, null, null, null, null, null, "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i", "a-o", "a-u", "ya-o", "ya-yo", "eo-o", "eo-u", "eo-eu", "yeo-o", "yeo-u", "o-eo", "o-e", "o-ye", "o-o", "o-u", "yo-ya", "yo-yae", "yo-yeo", "yo-o", "yo-i", "u-a", "u-ae", "u-eo-eu", "u-ye", "u-u", "yu-a", "yu-eo", "yu-e", "yu-yeo", "yu-ye", "yu-u", "yu-i", "eu-u", "eu-eu", "yi-u", "i-a", "i-ya", "i-o", "i-u", "i-eu", "i-U", "U", "U-eo", "U-u", "U-i", "UU", null, null, null, null, null, "g", "gg", "gs", "n", "nj", "nh", "d", "l", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "c", "k", "t", "p", "h", "gl", "gsg", "ng", "nd", "ns", "nZ", "nt", "dg", "tl", "lgs", "ln", "ld", "lth", "ll", "lmg", "lms", "lbs", "lbh", "rNp", "lss", "lZ", "lk", "lQ", "mg", "ml", "mb", "ms", "mss", "mZ", "mc", "mh", "mN", "bl", "bp", "ph", "pN", "sg", "sd", "sl", "sb", "Z", "g", "ss", null, "kh", "N", "Ns", "NZ", "pb", "pN", "hn", "hl", "hm", "hb", "Q"], qu = ["ha", "hu", "hi", "haa", "hee", "he", "ho", null, "la", "lu", "li", "laa", "lee", "le", "lo", "lwa", "hha", "hhu", "hhi", "hhaa", "hhee", "hhe", "hho", "hhwa", "ma", "mu", "mi", "maa", "mee", "me", "mo", "mwa", "sza", "szu", "szi", "szaa", "szee", "sze", "szo", "szwa", "ra", "ru", "ri", "raa", "ree", "re", "ro", "rwa", "sa", "su", "si", "saa", "see", "se", "so", "swa", "sha", "shu", "shi", "shaa", "shee", "she", "sho", "shwa", "qa", "qu", "qi", "qaa", "qee", "qe", "qo", null, "qwa", null, "qwi", "qwaa", "qwee", "qwe", null, null, "qha", "qhu", "qhi", "qhaa", "qhee", "qhe", "qho", null, "qhwa", null, "qhwi", "qhwaa", "qhwee", "qhwe", null, null, "ba", "bu", "bi", "baa", "bee", "be", "bo", "bwa", "va", "vu", "vi", "vaa", "vee", "ve", "vo", "vwa", "ta", "tu", "ti", "taa", "tee", "te", "to", "twa", "ca", "cu", "ci", "caa", "cee", "ce", "co", "cwa", "xa", "xu", "xi", "xaa", "xee", "xe", "xo", null, "xwa", null, "xwi", "xwaa", "xwee", "xwe", null, null, "na", "nu", "ni", "naa", "nee", "ne", "no", "nwa", "nya", "nyu", "nyi", "nyaa", "nyee", "nye", "nyo", "nywa", "'a", "'u", null, "'aa", "'ee", "'e", "'o", "'wa", "ka", "ku", "ki", "kaa", "kee", "ke", "ko", null, "kwa", null, "kwi", "kwaa", "kwee", "kwe", null, null, "kxa", "kxu", "kxi", "kxaa", "kxee", "kxe", "kxo", null, "kxwa", null, "kxwi", "kxwaa", "kxwee", "kxwe", null, null, "wa", "wu", "wi", "waa", "wee", "we", "wo", null, "`a", "`u", "`i", "`aa", "`ee", "`e", "`o", null, "za", "zu", "zi", "zaa", "zee", "ze", "zo", "zwa", "zha", "zhu", "zhi", "zhaa", "zhee", "zhe", "zho", "zhwa", "ya", "yu", "yi", "yaa", "yee", "ye", "yo", null, "da", "du", "di", "daa", "dee", "de", "do", "dwa", "dda", "ddu", "ddi", "ddaa", "ddee", "dde", "ddo", "ddwa"], Vu = ["ja", "ju", "ji", "jaa", "jee", "je", "jo", "jwa", "ga", "gu", "gi", "gaa", "gee", "ge", "go", null, "gwa", null, "gwi", "gwaa", "gwee", "gwe", null, null, "gga", "ggu", "ggi", "ggaa", "ggee", "gge", "ggo", null, "tha", "thu", "thi", "thaa", "thee", "the", "tho", "thwa", "cha", "chu", "chi", "chaa", "chee", "che", "cho", "chwa", "pha", "phu", "phi", "phaa", "phee", "phe", "pho", "phwa", "tsa", "tsu", "tsi", "tsaa", "tsee", "tse", "tso", "tswa", "tza", "tzu", "tzi", "tzaa", "tzee", "tze", "tzo", null, "fa", "fu", "fi", "faa", "fee", "fe", "fo", "fwa", "pa", "pu", "pi", "paa", "pee", "pe", "po", "pwa", "rya", "mya", "fya", null, null, null, null, null, null, " ", ".", ",", ";", ":", ":: ", "?", "//", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+", "20+", "30+", "40+", "50+", "60+", "70+", "80+", "90+", "100+", "10,000+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "a", "e", "i", "o", "u", "v", "ga", "ka", "ge", "gi", "go", "gu", "gv", "ha", "he", "hi", "ho", "hu", "hv", "la", "le", "li", "lo", "lu", "lv", "ma", "me", "mi", "mo", "mu", "na", "hna", "nah", "ne", "ni", "no", "nu", "nv", "qua", "que", "qui", "quo", "quu", "quv", "sa", "s", "se", "si", "so", "su", "sv", "da", "ta", "de", "te", "di", "ti", "do", "du", "dv", "dla", "tla", "tle", "tli", "tlo", "tlu", "tlv", "tsa", "tse", "tsi", "tso", "tsu", "tsv", "wa", "we", "wi", "wo", "wu", "wv", "ya", "ye", "yi", "yo", "yu", "yv"], ne = [null, "ai", "aai", "i", "ii", "u", "uu", "oo", "ee", "i", "a", "aa", "we", "we", "wi", "wi", "wii", "wii", "wo", "wo", "woo", "woo", "woo", "wa", "wa", "waa", "waa", "waa", "ai", "w", "'", "t", "k", "sh", "s", "n", "w", "n", null, "w", "c", "?", "l", "en", "in", "on", "an", "pai", "paai", "pi", "pii", "pu", "puu", "poo", "hee", "hi", "pa", "paa", "pwe", "pwe", "pwi", "pwi", "pwii", "pwii", "pwo", "pwo", "pwoo", "pwoo", "pwa", "pwa", "pwaa", "pwaa", "pwaa", "p", "p", "h", "tai", "taai", "ti", "tii", "tu", "tuu", "too", "dee", "di", "ta", "taa", "twe", "twe", "twi", "twi", "twii", "twii", "two", "two", "twoo", "twoo", "twa", "twa", "twaa", "twaa", "twaa", "t", "tte", "tti", "tto", "tta", "kai", "kaai", "ki", "kii", "ku", "kuu", "koo", "ka", "kaa", "kwe", "kwe", "kwi", "kwi", "kwii", "kwii", "kwo", "kwo", "kwoo", "kwoo", "kwa", "kwa", "kwaa", "kwaa", "kwaa", "k", "kw", "keh", "kih", "koh", "kah", "gai", "caai", "gi", "gii", "gu", "guu", "coo", "ga", "gaa", "cwe", "cwe", "cwi", "cwi", "cwii", "cwii", "cwo", "cwo", "cwoo", "cwoo", "cwa", "cwa", "cwaa", "cwaa", "cwaa", "g", "th", "mai", "maai", "mi", "mii", "mu", "muu", "moo", "ma", "maa", "mwe", "mwe", "mwi", "mwi", "mwii", "mwii", "mwo", "mwo", "mwoo", "mwoo", "mwa", "mwa", "mwaa", "mwaa", "mwaa", "m", "m", "mh", "m", "m", "nai", "naai", "ni", "nii", "nu", "nuu", "noo", "na", "naa", "nwe", "nwe", "nwa", "nwa", "nwaa", "nwaa", "nwaa", "n", "ng", "nh", "lai", "laai", "li", "lii", "lu", "luu", "loo", "la", "laa", "lwe", "lwe", "lwi", "lwi", "lwii", "lwii", "lwo", "lwo", "lwoo", "lwoo", "lwa", "lwa", "lwaa", "lwaa", "l", "l", "l", "sai", "saai", "si", "sii", "su", "suu", "soo", "sa", "saa", "swe", "swe", "swi", "swi", "swii", "swii", "swo", "swo", "swoo", "swoo"], ie = ["swa", "swa", "swaa", "swaa", "swaa", "s", "s", "sw", "s", "sk", "skw", "sW", "spwa", "stwa", "skwa", "scwa", "she", "shi", "shii", "sho", "shoo", "sha", "shaa", "shwe", "shwe", "shwi", "shwi", "shwii", "shwii", "shwo", "shwo", "shwoo", "shwoo", "shwa", "shwa", "shwaa", "shwaa", "sh", "jai", "yaai", "ji", "jii", "ju", "juu", "yoo", "ja", "jaa", "ywe", "ywe", "ywi", "ywi", "ywii", "ywii", "ywo", "ywo", "ywoo", "ywoo", "ywa", "ywa", "ywaa", "ywaa", "ywaa", "j", "y", "y", "yi", "re", "rai", "le", "raai", "ri", "rii", "ru", "ruu", "lo", "ra", "raa", "la", "rwaa", "rwaa", "r", "r", "r", "vai", "faai", "vi", "vii", "vu", "vuu", "va", "vaa", "fwaa", "fwaa", "v", "the", "the", "thi", "thi", "thii", "thii", "tho", "thoo", "tha", "thaa", "thwaa", "thwaa", "th", "tthe", "tthi", "ttho", "ttha", "tth", "tye", "tyi", "tyo", "tya", "he", "hi", "hii", "ho", "hoo", "ha", "haa", "h", "h", "hk", "qaai", "qi", "qii", "qu", "quu", "qa", "qaa", "q", "tlhe", "tlhi", "tlho", "tlha", "re", "ri", "ro", "ra", "ngaai", "ngi", "ngii", "ngu", "nguu", "nga", "ngaa", "ng", "nng", "she", "shi", "sho", "sha", "the", "thi", "tho", "tha", "th", "lhi", "lhii", "lho", "lhoo", "lha", "lhaa", "lh", "the", "thi", "thii", "tho", "thoo", "tha", "thaa", "th", "b", "e", "i", "o", "a", "we", "wi", "wo", "wa", "ne", "ni", "no", "na", "ke", "ki", "ko", "ka", "he", "hi", "ho", "ha", "ghu", "gho", "ghe", "ghee", "ghi", "gha", "ru", "ro", "re", "ree", "ri", "ra", "wu", "wo", "we", "wee", "wi", "wa", "hwu", "hwo", "hwe", "hwee", "hwi", "hwa", "thu", "tho", "the", "thee", "thi", "tha", "ttu", "tto", "tte", "ttee", "tti", "tta", "pu", "po", "pe", "pee", "pi", "pa", "p", "gu", "go", "ge", "gee", "gi", "ga", "khu", "kho", "khe", "khee", "khi", "kha", "kku", "kko", "kke", "kkee", "kki"], ae = ["kka", "kk", "nu", "no", "ne", "nee", "ni", "na", "mu", "mo", "me", "mee", "mi", "ma", "yu", "yo", "ye", "yee", "yi", "ya", "ju", "ju", "jo", "je", "jee", "ji", "ji", "ja", "jju", "jjo", "jje", "jjee", "jji", "jja", "lu", "lo", "le", "lee", "li", "la", "dlu", "dlo", "dle", "dlee", "dli", "dla", "lhu", "lho", "lhe", "lhee", "lhi", "lha", "tlhu", "tlho", "tlhe", "tlhee", "tlhi", "tlha", "tlu", "tlo", "tle", "tlee", "tli", "tla", "zu", "zo", "ze", "zee", "zi", "za", "z", "z", "dzu", "dzo", "dze", "dzee", "dzi", "dza", "su", "so", "se", "see", "si", "sa", "shu", "sho", "she", "shee", "shi", "sha", "sh", "tsu", "tso", "tse", "tsee", "tsi", "tsa", "chu", "cho", "che", "chee", "chi", "cha", "ttsu", "ttso", "ttse", "ttsee", "ttsi", "ttsa", "X", ".", "qai", "ngai", "nngi", "nngii", "nngo", "nngoo", "nnga", "nngaa", null, null, null, null, null, null, null, null, null, " ", "b", "l", "f", "s", "n", "h", "d", "t", "c", "q", "m", "g", "ng", "z", "r", "a", "o", "u", "e", "i", "ch", "th", "ph", "p", "x", "p", "<", ">", null, null, null, "f", "v", "u", "yr", "y", "w", "th", "th", "a", "o", "ac", "ae", "o", "o", "o", "oe", "on", "r", "k", "c", "k", "g", "ng", "g", "g", "w", "h", "h", "h", "h", "n", "n", "n", "i", "e", "j", "g", "ae", "a", "eo", "p", "z", "s", "s", "s", "c", "z", "t", "t", "d", "b", "b", "p", "p", "e", "m", "m", "m", "l", "l", "ng", "ng", "d", "o", "ear", "ior", "qu", "qu", "qu", "s", "yr", "yr", "yr", "q", "x", ".", ":", "+", "17", "18", "19"], ue = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "t", "tth", "d", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "ss", "s", "h", "l", "q", "a", "aa", "i", "ii", "u", "uk", "uu", "uuv", "ry", "ryy", "ly", "lyy", "e", "ai", "oo", "oo", "au", "a", "aa", "aa", "i", "ii", "y", "yy", "u", "uu", "ua", "oe", "ya", "ie", "e", "ae", "ai", "oo", "au", "M", "H", "a`", null, null, null, "r", null, "!", null, null, null, null, null, ".", " // ", ":", "+", "++", " * ", " /// ", "KR", "'", null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], ee = [" @ ", " ... ", ",", ". ", ": ", " // ", null, "-", ",", ". ", null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, "a", "e", "i", "o", "u", "O", "U", "ee", "n", "ng", "b", "p", "q", "g", "m", "l", "s", "sh", "t", "d", "ch", "j", "y", "r", "w", "f", "k", "kha", "ts", "z", "h", "zr", "lh", "zh", "ch", "-", "e", "i", "o", "u", "O", "U", "ng", "b", "p", "q", "g", "m", "t", "d", "ch", "j", "ts", "y", "w", "k", "g", "h", "jy", "ny", "dz", "e", "i", "iy", "U", "u", "ng", "k", "g", "h", "p", "sh", "t", "d", "j", "f", "g", "h", "ts", "z", "r", "ch", "zh", "i", "k", "r", "f", "zh", null, null, null, null, null, null, null, null, null, "H", "X", "W", "M", " 3 ", " 333 ", "a", "i", "k", "ng", "c", "tt", "tth", "dd", "nn", "t", "d", "p", "ph", "ss", "zh", "z", "a", "t", "zh", "gh", "ng", "c", "jh", "tta", "ddh", "t", "dh", "ss", "cy", "zh", "z", "u", "y", "bh", "'"], oe = ["A", "a", "B", "b", "B", "b", "B", "b", "C", "c", "D", "d", "D", "d", "D", "d", "D", "d", "D", "d", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "F", "f", "G", "g", "H", "h", "H", "h", "H", "h", "H", "h", "H", "h", "I", "i", "I", "i", "K", "k", "K", "k", "K", "k", "L", "l", "L", "l", "L", "l", "L", "l", "M", "m", "M", "m", "M", "m", "N", "n", "N", "n", "N", "n", "N", "n", "O", "o", "O", "o", "O", "o", "O", "o", "P", "p", "P", "p", "R", "r", "R", "r", "R", "r", "R", "r", "S", "s", "S", "s", "S", "s", "S", "s", "S", "s", "T", "t", "T", "t", "T", "t", "T", "t", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "V", "v", "V", "v", "W", "w", "W", "w", "W", "w", "W", "w", "W", "w", "X", "x", "X", "x", "Y", "y", "Z", "z", "Z", "z", "Z", "z", "h", "t", "w", "y", "a", "S", null, null, null, null, "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "I", "i", "I", "i", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "Y", "y", "Y", "y", "Y", "y", "Y", "y"], le = ["a", "a", "a", "a", "a", "a", "a", "a", "A", "A", "A", "A", "A", "A", "A", "A", "e", "e", "e", "e", "e", "e", null, null, "E", "E", "E", "E", "E", "E", null, null, "e", "e", "e", "e", "e", "e", "e", "e", "E", "E", "E", "E", "E", "E", "E", "E", "i", "i", "i", "i", "i", "i", "i", "i", "I", "I", "I", "I", "I", "I", "I", "I", "o", "o", "o", "o", "o", "o", null, null, "O", "O", "O", "O", "O", "O", null, null, "u", "u", "u", "u", "u", "u", "u", "u", null, "U", null, "U", null, "U", null, "U", "o", "o", "o", "o", "o", "o", "o", "o", "O", "O", "O", "O", "O", "O", "O", "O", "a", "a", "e", "e", "e", "e", "i", "i", "o", "o", "u", "u", "o", "o", null, null, "a", "a", "a", "a", "a", "a", "a", "a", "A", "A", "A", "A", "A", "A", "A", "A", "e", "e", "e", "e", "e", "e", "e", "e", "E", "E", "E", "E", "E", "E", "E", "E", "o", "o", "o", "o", "o", "o", "o", "o", "O", "O", "O", "O", "O", "O", "O", "O", "a", "a", "a", "a", "a", null, "a", "a", "A", "A", "A", "A", "A", "'", "i", "'", "~", '"~', "e", "e", "e", null, "e", "e", "E", "E", "E", "E", "E", "'`", "''", "'~", "i", "i", "i", "i", null, null, "i", "i", "I", "I", "I", "I", null, "`'", "`'", "`~", "u", "u", "u", "u", "R", "R", "u", "u", "U", "U", "U", "U", "R", '"`', `"'`, "`", null, null, "o", "o", "o", null, "o", "o", "O", "O", "O", "O", "O", "'", "`"], te = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", null, null, null, null, "-", "-", "-", "-", "--", "--", "||", "_", "'", "'", ",", "'", '"', '"', ",,", '"', "+", "++", "*", "*>", ".", "..", "...", ".", `
`, `

`, null, null, null, null, null, " ", "%0", "%00", "'", "''", "'''", "`", "``", "```", "^", "<", ">", "*", "!!", "!?", "-", "_", "-", "^", "***", "--", "/", "-[", "]-", null, "?!", "!?", "7", "PP", "(]", "[)", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "0", null, null, null, "4", "5", "6", "7", "8", "9", "+", "-", "=", "(", ")", "n", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "=", "(", ")", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "ECU", "CL", "Cr", "FF", "L", "mil", "N", "Pts", "Rs", "W", "NS", "D", "EU", "K", "T", "Dr"], he = [null, null, "C", null, null, null, null, null, null, null, "g", "H", "H", "H", "h", null, "I", "I", "L", "l", "lb", "N", "no", "(p)", "P", "P", "Q", "R", "R", "R", null, null, "(sm)", "(tel)", "(tm)", null, "Z", null, null, "mho", "Z", null, null, null, "B", "C", "e", "e", null, "F", null, "M", "o", null, null, null, null, "i", "Q", "(fax)", "pi", null, null, "Pi", null, "G", "L", "L", "Y", "D", "d", "e", "i", "j", null, null, "per", null, null, null, null, null, null, " 1/3 ", " 2/3 ", " 1/5 ", " 2/5 ", " 3/5 ", " 4/5 ", " 1/6 ", " 5/6 ", " 1/8 ", " 3/8 ", " 5/8 ", " 7/8 ", " 1/", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "L", "C", "D", "M", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "l", "c", "d", "m", "(D", "D)", "((|))", ")", null, null, null, null, null, null, null, null, null, null, null, null, "-", "|", "-", "|", "-", "|", "\\", "/", "\\", "/", "-", "-", "~", "~", "-", "|", "-", "|", "-", "-", "-", "|", "-", "|", "|", "-", "-", "-", "-", "-", "-", "|", "|", "|", "|", "|", "|", "|", "^", "V", "\\", "=", "V", "^", "-", "-", "|", "|", "-", "-", "|", "|", "=", "|", "=", "=", "|", "=", "|", "=", "=", "=", "=", "=", "=", "|", "=", "|", "=", "|", "\\", "/", "\\", "/", "=", "=", "~", "~", "|", "|", "-", "|", "-", "|", "-", "-", "-", "|", "-", "|", "|", "|", "|", "|", "|", "|", "-", "\\", "\\", "|"], ge = ["-", "-", "|", "|", "-", "-", "|", "|", "-", "-", "|", "|", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "|", "|", "-", "|", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "/", "\\", "X", "-", "|", "-", "|", "-", "|", "-", "|", "-", "|", "-", "|", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "-", "|", null, null, null, null, null, null, null, null, null, null, "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "^", "^", "^", "^", ">", ">", ">", ">", ">", ">", "V", "V", "V", "V", "<", "<", "<", "<", "<", "<", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "#", "#", "#", "#", "#", "^", "^", "^", "O", "#", "#", "#", "#", "#", "#", "#", "#"], re = [" ", "a", "1", "b", "'", "k", "2", "l", "@", "c", "i", "f", "/", "m", "s", "p", '"', "e", "3", "h", "9", "o", "6", "r", "^", "d", "j", "g", ">", "n", "t", "q", ",", "*", "5", "<", "-", "u", "8", "v", ".", "%", "[", "$", "+", "x", "!", "&", ";", ":", "4", "\\", "0", "z", "7", "(", "_", "?", "w", "]", "#", "y", ")", "=", "[d7]", "[d17]", "[d27]", "[d127]", "[d37]", "[d137]", "[d237]", "[d1237]", "[d47]", "[d147]", "[d247]", "[d1247]", "[d347]", "[d1347]", "[d2347]", "[d12347]", "[d57]", "[d157]", "[d257]", "[d1257]", "[d357]", "[d1357]", "[d2357]", "[d12357]", "[d457]", "[d1457]", "[d2457]", "[d12457]", "[d3457]", "[d13457]", "[d23457]", "[d123457]", "[d67]", "[d167]", "[d267]", "[d1267]", "[d367]", "[d1367]", "[d2367]", "[d12367]", "[d467]", "[d1467]", "[d2467]", "[d12467]", "[d3467]", "[d13467]", "[d23467]", "[d123467]", "[d567]", "[d1567]", "[d2567]", "[d12567]", "[d3567]", "[d13567]", "[d23567]", "[d123567]", "[d4567]", "[d14567]", "[d24567]", "[d124567]", "[d34567]", "[d134567]", "[d234567]", "[d1234567]", "[d8]", "[d18]", "[d28]", "[d128]", "[d38]", "[d138]", "[d238]", "[d1238]", "[d48]", "[d148]", "[d248]", "[d1248]", "[d348]", "[d1348]", "[d2348]", "[d12348]", "[d58]", "[d158]", "[d258]", "[d1258]", "[d358]", "[d1358]", "[d2358]", "[d12358]", "[d458]", "[d1458]", "[d2458]", "[d12458]", "[d3458]", "[d13458]", "[d23458]", "[d123458]", "[d68]", "[d168]", "[d268]", "[d1268]", "[d368]", "[d1368]", "[d2368]", "[d12368]", "[d468]", "[d1468]", "[d2468]", "[d12468]", "[d3468]", "[d13468]", "[d23468]", "[d123468]", "[d568]", "[d1568]", "[d2568]", "[d12568]", "[d3568]", "[d13568]", "[d23568]", "[d123568]", "[d4568]", "[d14568]", "[d24568]", "[d124568]", "[d34568]", "[d134568]", "[d234568]", "[d1234568]", "[d78]", "[d178]", "[d278]", "[d1278]", "[d378]", "[d1378]", "[d2378]", "[d12378]", "[d478]", "[d1478]", "[d2478]", "[d12478]", "[d3478]", "[d13478]", "[d23478]", "[d123478]", "[d578]", "[d1578]", "[d2578]", "[d12578]", "[d3578]", "[d13578]", "[d23578]", "[d123578]", "[d4578]", "[d14578]", "[d24578]", "[d124578]", "[d34578]", "[d134578]", "[d234578]", "[d1234578]", "[d678]", "[d1678]", "[d2678]", "[d12678]", "[d3678]", "[d13678]", "[d23678]", "[d123678]", "[d4678]", "[d14678]", "[d24678]", "[d124678]", "[d34678]", "[d134678]", "[d234678]", "[d1234678]", "[d5678]", "[d15678]", "[d25678]", "[d125678]", "[d35678]", "[d135678]", "[d235678]", "[d1235678]", "[d45678]", "[d145678]", "[d245678]", "[d1245678]", "[d345678]", "[d1345678]", "[d2345678]", "[d12345678]"], se = [" ", ",", ". ", '"', "[JIS]", '"', "/", "0", "<", "> ", "<<", ">> ", "[", "] ", "{", "} ", "[(", ")] ", "@", "X ", "[", "] ", "[[", "]] ", "((", ")) ", "[[", "]] ", "~ ", "``", "''", ",,", "@", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, "~", "+", "+", "+", "+", null, "@", " // ", "+10+", "+20+", "+30+", null, null, null, null, null, null, "a", "a", "i", "i", "u", "u", "e", "e", "o", "o", "ka", "ga", "ki", "gi", "ku", "gu", "ke", "ge", "ko", "go", "sa", "za", "si", "zi", "su", "zu", "se", "ze", "so", "zo", "ta", "da", "ti", "di", "tu", "tu", "du", "te", "de", "to", "do", "na", "ni", "nu", "ne", "no", "ha", "ba", "pa", "hi", "bi", "pi", "hu", "bu", "pu", "he", "be", "pe", "ho", "bo", "po", "ma", "mi", "mu", "me", "mo", "ya", "ya", "yu", "yu", "yo", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wa", "wi", "we", "wo", "n", "vu", null, null, null, null, null, null, null, null, '"', '"', null, null, "a", "a", "i", "i", "u", "u", "e", "e", "o", "o", "ka", "ga", "ki", "gi", "ku", "gu", "ke", "ge", "ko", "go", "sa", "za", "si", "zi", "su", "zu", "se", "ze", "so", "zo", "ta", "da", "ti", "di", "tu", "tu", "du", "te", "de", "to", "do", "na", "ni", "nu", "ne", "no", "ha", "ba", "pa", "hi", "bi", "pi", "hu", "bu", "pu", "he", "be", "pe", "ho", "bo", "po", "ma", "mi", "mu", "me", "mo", "ya", "ya", "yu", "yu", "yo", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wa", "wi", "we", "wo", "n", "vu", "ka", "ke", "va", "vi", "ve", "vo", null, null, '"', '"'], de = [null, null, null, null, null, "B", "P", "M", "F", "D", "T", "N", "L", "G", "K", "H", "J", "Q", "X", "ZH", "CH", "SH", "R", "Z", "C", "S", "A", "O", "E", "EH", "AI", "EI", "AU", "OU", "AN", "EN", "ANG", "ENG", "ER", "I", "U", "IU", "V", "NG", "GN", null, null, null, null, "g", "gg", "gs", "n", "nj", "nh", "d", "dd", "r", "lg", "lm", "lb", "ls", "lt", "lp", "rh", "m", "b", "bb", "bs", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i", null, "nn", "nd", "ns", "nZ", "lgs", "ld", "lbs", "lZ", "lQ", "mb", "ms", "mZ", "mN", "bg", null, "bsg", "bst", "bj", "bt", "bN", "bbN", "sg", "sn", "sd", "sb", "sj", "Z", null, "N", "Ns", "NZ", "pN", "hh", "Q", "yo-ya", "yo-yae", "yo-i", "yu-yeo", "yu-ye", "yu-i", "U", "U-i", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "BU", "ZI", "JI", "GU", "EE", "ENN", "OO", "ONN", "IR", "ANN", "INN", "UNN", "IM", "NGG", "AINN", "AUNN", "AM", "OM", "ONG", "INNN", "P", "T", "K", "H"], Ye = ["(g)", "(n)", "(d)", "(r)", "(m)", "(b)", "(s)", "()", "(j)", "(c)", "(k)", "(t)", "(p)", "(h)", "(ga)", "(na)", "(da)", "(ra)", "(ma)", "(ba)", "(sa)", "(a)", "(ja)", "(ca)", "(ka)", "(ta)", "(pa)", "(ha)", "(ju)", null, null, null, "(1) ", "(2) ", "(3) ", "(4) ", "(5) ", "(6) ", "(7) ", "(8) ", "(9) ", "(10) ", "(Yue) ", "(Huo) ", "(Shui) ", "(Mu) ", "(Jin) ", "(Tu) ", "(Ri) ", "(Zhu) ", "(You) ", "(She) ", "(Ming) ", "(Te) ", "(Cai) ", "(Zhu) ", "(Lao) ", "(Dai) ", "(Hu) ", "(Xue) ", "(Jian) ", "(Qi) ", "(Zi) ", "(Xie) ", "(Ji) ", "(Xiu) ", "<<", ">>", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "(g)", "(n)", "(d)", "(r)", "(m)", "(b)", "(s)", "()", "(j)", "(c)", "(k)", "(t)", "(p)", "(h)", "(ga)", "(na)", "(da)", "(ra)", "(ma)", "(ba)", "(sa)", "(a)", "(ja)", "(ca)", "(ka)", "(ta)", "(pa)", "(ha)", null, null, null, "KIS ", "(1) ", "(2) ", "(3) ", "(4) ", "(5) ", "(6) ", "(7) ", "(8) ", "(9) ", "(10) ", "(Yue) ", "(Huo) ", "(Shui) ", "(Mu) ", "(Jin) ", "(Tu) ", "(Ri) ", "(Zhu) ", "(You) ", "(She) ", "(Ming) ", "(Te) ", "(Cai) ", "(Zhu) ", "(Lao) ", "(Mi) ", "(Nan) ", "(Nu) ", "(Shi) ", "(You) ", "(Yin) ", "(Zhu) ", "(Xiang) ", "(Xiu) ", "(Xie) ", "(Zheng) ", "(Shang) ", "(Zhong) ", "(Xia) ", "(Zuo) ", "(You) ", "(Yi) ", "(Zong) ", "(Xue) ", "(Jian) ", "(Qi) ", "(Zi) ", "(Xie) ", "(Ye) ", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "1M", "2M", "3M", "4M", "5M", "6M", "7M", "8M", "9M", "10M", "11M", "12M", null, null, null, null, "a", "i", "u", "u", "o", "ka", "ki", "ku", "ke", "ko", "sa", "si", "su", "se", "so", "ta", "ti", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "hu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wi", "we", "wo"], ce = ["apartment", "alpha", "ampere", "are", "inning", "inch", "won", "escudo", "acre", "ounce", "ohm", "kai-ri", "carat", "calorie", "gallon", "gamma", "giga", "guinea", "curie", "guilder", "kilo", "kilogram", "kilometer", "kilowatt", "gram", "gram ton", "cruzeiro", "krone", "case", "koruna", "co-op", "cycle", "centime", "shilling", "centi", "cent", "dozen", "desi", "dollar", "ton", "nano", "knot", "heights", "percent", "parts", "barrel", "piaster", "picul", "pico", "building", "farad", "feet", "bushel", "franc", "hectare", "peso", "pfennig", "hertz", "pence", "page", "beta", "point", "volt", "hon", "pound", "hall", "horn", "micro", "mile", "mach", "mark", "mansion", "micron", "milli", "millibar", "mega", "megaton", "meter", "yard", "yard", "yuan", "liter", "lira", "rupee", "ruble", "rem", "roentgen", "watt", "0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h", "HPA", "da", "AU", "bar", "oV", "pc", null, null, null, null, "Heisei", "Syouwa", "Taisyou", "Meiji", "Inc.", "pA", "nA", "microamp", "mA", "kA", "kB", "MB", "GB", "cal", "kcal", "pF", "nF", "microFarad", "microgram", "mg", "kg", "Hz", "kHz", "MHz", "GHz", "THz", "microliter", "ml", "dl", "kl", "fm", "nm", "micrometer", "mm", "cm", "km", "mm^2", "cm^2", "m^2", "km^2", "mm^4", "cm^3", "m^3", "km^3", "m/s", "m/s^2", "Pa", "kPa", "MPa", "GPa", "rad", "rad/s", "rad/s^2", "ps", "ns", "microsecond", "ms", "pV", "nV", "microvolt", "mV", "kV", "MV", "pW", "nW", "microwatt", "mW", "kW", "MW", "kOhm", "MOhm", "a.m.", "Bq", "cc", "cd", "C/kg", "Co.", "dB", "Gy", "ha", "HP", "in", "K.K.", "KM", "kt", "lm", "ln", "log", "lx", "mb", "mil", "mol", "pH", "p.m.", "PPM", "PR", "sr", "Sv", "Wb", null, null, "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d", "13d", "14d", "15d", "16d", "17d", "18d", "19d", "20d", "21d", "22d", "23d", "24d", "25d", "26d", "27d", "28d", "29d", "30d", "31d"], Le = ["Yi", "Ding", "Kao", "Qi", "Shang", "Xia", null, "Wan", "Zhang", "San", "Shang", "Xia", "Ji", "Bu", "Yu", "Mian", "Gai", "Chou", "Chou", "Zhuan", "Qie", "Pi", "Shi", "Shi", "Qiu", "Bing", "Ye", "Cong", "Dong", "Si", "Cheng", "Diu", "Qiu", "Liang", "Diu", "You", "Liang", "Yan", "Bing", "Sang", "Gun", "Jiu", "Ge", "Ya", "Qiang", "Zhong", "Ji", "Jie", "Feng", "Guan", "Chuan", "Chan", "Lin", "Zhuo", "Zhu", "Ha", "Wan", "Dan", "Wei", "Zhu", "Jing", "Li", "Ju", "Pie", "Fu", "Yi", "Yi", "Nai", "Shime", "Jiu", "Jiu", "Zhe", "Me", "Yi", null, "Zhi", "Wu", "Zha", "Hu", "Fa", "Le", "Zhong", "Ping", "Pang", "Qiao", "Hu", "Guai", "Cheng", "Cheng", "Yi", "Yin", null, "Mie", "Jiu", "Qi", "Ye", "Xi", "Xiang", "Gai", "Diu", "Hal", null, "Shu", "Twul", "Shi", "Ji", "Nang", "Jia", "Kel", "Shi", null, "Ol", "Mai", "Luan", "Cal", "Ru", "Xue", "Yan", "Fu", "Sha", "Na", "Gan", "Sol", "El", "Cwul", null, "Gan", "Chi", "Gui", "Gan", "Luan", "Lin", "Yi", "Jue", "Liao", "Ma", "Yu", "Zheng", "Shi", "Shi", "Er", "Chu", "Yu", "Yu", "Yu", "Yun", "Hu", "Qi", "Wu", "Jing", "Si", "Sui", "Gen", "Gen", "Ya", "Xie", "Ya", "Qi", "Ya", "Ji", "Tou", "Wang", "Kang", "Ta", "Jiao", "Hai", "Yi", "Chan", "Heng", "Mu", null, "Xiang", "Jing", "Ting", "Liang", "Xiang", "Jing", "Ye", "Qin", "Bo", "You", "Xie", "Dan", "Lian", "Duo", "Wei", "Ren", "Ren", "Ji", "La", "Wang", "Yi", "Shi", "Ren", "Le", "Ding", "Ze", "Jin", "Pu", "Chou", "Ba", "Zhang", "Jin", "Jie", "Bing", "Reng", "Cong", "Fo", "San", "Lun", "Sya", "Cang", "Zi", "Shi", "Ta", "Zhang", "Fu", "Xian", "Xian", "Tuo", "Hong", "Tong", "Ren", "Qian", "Gan", "Yi", "Di", "Dai", "Ling", "Yi", "Chao", "Chang", "Sa", null, "Yi", "Mu", "Men", "Ren", "Jia", "Chao", "Yang", "Qian", "Zhong", "Pi", "Wan", "Wu", "Jian", "Jie", "Yao", "Feng", "Cang", "Ren", "Wang", "Fen", "Di", "Fang"], Ze = ["Zhong", "Qi", "Pei", "Yu", "Diao", "Dun", "Wen", "Yi", "Xin", "Kang", "Yi", "Ji", "Ai", "Wu", "Ji", "Fu", "Fa", "Xiu", "Jin", "Bei", "Dan", "Fu", "Tang", "Zhong", "You", "Huo", "Hui", "Yu", "Cui", "Chuan", "San", "Wei", "Chuan", "Che", "Ya", "Xian", "Shang", "Chang", "Lun", "Cang", "Xun", "Xin", "Wei", "Zhu", null, "Xuan", "Nu", "Bo", "Gu", "Ni", "Ni", "Xie", "Ban", "Xu", "Ling", "Zhou", "Shen", "Qu", "Si", "Beng", "Si", "Jia", "Pi", "Yi", "Si", "Ai", "Zheng", "Dian", "Han", "Mai", "Dan", "Zhu", "Bu", "Qu", "Bi", "Shao", "Ci", "Wei", "Di", "Zhu", "Zuo", "You", "Yang", "Ti", "Zhan", "He", "Bi", "Tuo", "She", "Yu", "Yi", "Fo", "Zuo", "Kou", "Ning", "Tong", "Ni", "Xuan", "Qu", "Yong", "Wa", "Qian", null, "Ka", null, "Pei", "Huai", "He", "Lao", "Xiang", "Ge", "Yang", "Bai", "Fa", "Ming", "Jia", "Er", "Bing", "Ji", "Hen", "Huo", "Gui", "Quan", "Tiao", "Jiao", "Ci", "Yi", "Shi", "Xing", "Shen", "Tuo", "Kan", "Zhi", "Gai", "Lai", "Yi", "Chi", "Kua", "Guang", "Li", "Yin", "Shi", "Mi", "Zhu", "Xu", "You", "An", "Lu", "Mou", "Er", "Lun", "Tong", "Cha", "Chi", "Xun", "Gong", "Zhou", "Yi", "Ru", "Jian", "Xia", "Jia", "Zai", "Lu", "Ko", "Jiao", "Zhen", "Ce", "Qiao", "Kuai", "Chai", "Ning", "Nong", "Jin", "Wu", "Hou", "Jiong", "Cheng", "Zhen", "Zuo", "Chou", "Qin", "Lu", "Ju", "Shu", "Ting", "Shen", "Tuo", "Bo", "Nan", "Hao", "Bian", "Tui", "Yu", "Xi", "Cu", "E", "Qiu", "Xu", "Kuang", "Ku", "Wu", "Jun", "Yi", "Fu", "Lang", "Zu", "Qiao", "Li", "Yong", "Hun", "Jing", "Xian", "San", "Pai", "Su", "Fu", "Xi", "Li", "Fu", "Ping", "Bao", "Yu", "Si", "Xia", "Xin", "Xiu", "Yu", "Ti", "Che", "Chou", null, "Yan", "Lia", "Li", "Lai", null, "Jian", "Xiu", "Fu", "He", "Ju", "Xiao", "Pai", "Jian", "Biao", "Chu", "Fei", "Feng", "Ya", "An", "Bei", "Yu", "Xin", "Bi", "Jian"], Ce = ["Chang", "Chi", "Bing", "Zan", "Yao", "Cui", "Lia", "Wan", "Lai", "Cang", "Zong", "Ge", "Guan", "Bei", "Tian", "Shu", "Shu", "Men", "Dao", "Tan", "Jue", "Chui", "Xing", "Peng", "Tang", "Hou", "Yi", "Qi", "Ti", "Gan", "Jing", "Jie", "Sui", "Chang", "Jie", "Fang", "Zhi", "Kong", "Juan", "Zong", "Ju", "Qian", "Ni", "Lun", "Zhuo", "Wei", "Luo", "Song", "Leng", "Hun", "Dong", "Zi", "Ben", "Wu", "Ju", "Nai", "Cai", "Jian", "Zhai", "Ye", "Zhi", "Sha", "Qing", null, "Ying", "Cheng", "Jian", "Yan", "Nuan", "Zhong", "Chun", "Jia", "Jie", "Wei", "Yu", "Bing", "Ruo", "Ti", "Wei", "Pian", "Yan", "Feng", "Tang", "Wo", "E", "Xie", "Che", "Sheng", "Kan", "Di", "Zuo", "Cha", "Ting", "Bei", "Ye", "Huang", "Yao", "Zhan", "Chou", "Yan", "You", "Jian", "Xu", "Zha", "Ci", "Fu", "Bi", "Zhi", "Zong", "Mian", "Ji", "Yi", "Xie", "Xun", "Si", "Duan", "Ce", "Zhen", "Ou", "Tou", "Tou", "Bei", "Za", "Lu", "Jie", "Wei", "Fen", "Chang", "Gui", "Sou", "Zhi", "Su", "Xia", "Fu", "Yuan", "Rong", "Li", "Ru", "Yun", "Gou", "Ma", "Bang", "Dian", "Tang", "Hao", "Jie", "Xi", "Shan", "Qian", "Jue", "Cang", "Chu", "San", "Bei", "Xiao", "Yong", "Yao", "Tan", "Suo", "Yang", "Fa", "Bing", "Jia", "Dai", "Zai", "Tang", null, "Bin", "Chu", "Nuo", "Can", "Lei", "Cui", "Yong", "Zao", "Zong", "Peng", "Song", "Ao", "Chuan", "Yu", "Zhai", "Cou", "Shang", "Qiang", "Jing", "Chi", "Sha", "Han", "Zhang", "Qing", "Yan", "Di", "Xi", "Lu", "Bei", "Piao", "Jin", "Lian", "Lu", "Man", "Qian", "Xian", "Tan", "Ying", "Dong", "Zhuan", "Xiang", "Shan", "Qiao", "Jiong", "Tui", "Zun", "Pu", "Xi", "Lao", "Chang", "Guang", "Liao", "Qi", "Deng", "Chan", "Wei", "Ji", "Fan", "Hui", "Chuan", "Jian", "Dan", "Jiao", "Jiu", "Seng", "Fen", "Xian", "Jue", "E", "Jiao", "Jian", "Tong", "Lin", "Bo", "Gu", null, "Su", "Xian", "Jiang", "Min", "Ye", "Jin", "Jia", "Qiao", "Pi", "Feng", "Zhou", "Ai", "Sai"], Se = ["Yi", "Jun", "Nong", "Chan", "Yi", "Dang", "Jing", "Xuan", "Kuai", "Jian", "Chu", "Dan", "Jiao", "Sha", "Zai", null, "Bin", "An", "Ru", "Tai", "Chou", "Chai", "Lan", "Ni", "Jin", "Qian", "Meng", "Wu", "Ning", "Qiong", "Ni", "Chang", "Lie", "Lei", "Lu", "Kuang", "Bao", "Du", "Biao", "Zan", "Zhi", "Si", "You", "Hao", "Chen", "Chen", "Li", "Teng", "Wei", "Long", "Chu", "Chan", "Rang", "Shu", "Hui", "Li", "Luo", "Zan", "Nuo", "Tang", "Yan", "Lei", "Nang", "Er", "Wu", "Yun", "Zan", "Yuan", "Xiong", "Chong", "Zhao", "Xiong", "Xian", "Guang", "Dui", "Ke", "Dui", "Mian", "Tu", "Chang", "Er", "Dui", "Er", "Xin", "Tu", "Si", "Yan", "Yan", "Shi", "Shi", "Dang", "Qian", "Dou", "Fen", "Mao", "Shen", "Dou", "Bai", "Jing", "Li", "Huang", "Ru", "Wang", "Nei", "Quan", "Liang", "Yu", "Ba", "Gong", "Liu", "Xi", null, "Lan", "Gong", "Tian", "Guan", "Xing", "Bing", "Qi", "Ju", "Dian", "Zi", "Ppwun", "Yang", "Jian", "Shou", "Ji", "Yi", "Ji", "Chan", "Jiong", "Mao", "Ran", "Nei", "Yuan", "Mao", "Gang", "Ran", "Ce", "Jiong", "Ce", "Zai", "Gua", "Jiong", "Mao", "Zhou", "Mou", "Gou", "Xu", "Mian", "Mi", "Rong", "Yin", "Xie", "Kan", "Jun", "Nong", "Yi", "Mi", "Shi", "Guan", "Meng", "Zhong", "Ju", "Yuan", "Ming", "Kou", "Lam", "Fu", "Xie", "Mi", "Bing", "Dong", "Tai", "Gang", "Feng", "Bing", "Hu", "Chong", "Jue", "Hu", "Kuang", "Ye", "Leng", "Pan", "Fu", "Min", "Dong", "Xian", "Lie", "Xia", "Jian", "Jing", "Shu", "Mei", "Tu", "Qi", "Gu", "Zhun", "Song", "Jing", "Liang", "Qing", "Diao", "Ling", "Dong", "Gan", "Jian", "Yin", "Cou", "Yi", "Li", "Cang", "Ming", "Zhuen", "Cui", "Si", "Duo", "Jin", "Lin", "Lin", "Ning", "Xi", "Du", "Ji", "Fan", "Fan", "Fan", "Feng", "Ju", "Chu", "Tako", "Feng", "Mok", "Ci", "Fu", "Feng", "Ping", "Feng", "Kai", "Huang", "Kai", "Gan", "Deng", "Ping", "Qu", "Xiong", "Kuai", "Tu", "Ao", "Chu", "Ji", "Dang", "Han", "Han", "Zao"], Je = ["Dao", "Diao", "Dao", "Ren", "Ren", "Chuang", "Fen", "Qie", "Yi", "Ji", "Kan", "Qian", "Cun", "Chu", "Wen", "Ji", "Dan", "Xing", "Hua", "Wan", "Jue", "Li", "Yue", "Lie", "Liu", "Ze", "Gang", "Chuang", "Fu", "Chu", "Qu", "Ju", "Shan", "Min", "Ling", "Zhong", "Pan", "Bie", "Jie", "Jie", "Bao", "Li", "Shan", "Bie", "Chan", "Jing", "Gua", "Gen", "Dao", "Chuang", "Kui", "Ku", "Duo", "Er", "Zhi", "Shua", "Quan", "Cha", "Ci", "Ke", "Jie", "Gui", "Ci", "Gui", "Kai", "Duo", "Ji", "Ti", "Jing", "Lou", "Gen", "Ze", "Yuan", "Cuo", "Xue", "Ke", "La", "Qian", "Cha", "Chuang", "Gua", "Jian", "Cuo", "Li", "Ti", "Fei", "Pou", "Chan", "Qi", "Chuang", "Zi", "Gang", "Wan", "Bo", "Ji", "Duo", "Qing", "Yan", "Zhuo", "Jian", "Ji", "Bo", "Yan", "Ju", "Huo", "Sheng", "Jian", "Duo", "Duan", "Wu", "Gua", "Fu", "Sheng", "Jian", "Ge", "Zha", "Kai", "Chuang", "Juan", "Chan", "Tuan", "Lu", "Li", "Fou", "Shan", "Piao", "Kou", "Jiao", "Gua", "Qiao", "Jue", "Hua", "Zha", "Zhuo", "Lian", "Ju", "Pi", "Liu", "Gui", "Jiao", "Gui", "Jian", "Jian", "Tang", "Huo", "Ji", "Jian", "Yi", "Jian", "Zhi", "Chan", "Cuan", "Mo", "Li", "Zhu", "Li", "Ya", "Quan", "Ban", "Gong", "Jia", "Wu", "Mai", "Lie", "Jin", "Keng", "Xie", "Zhi", "Dong", "Zhu", "Nu", "Jie", "Qu", "Shao", "Yi", "Zhu", "Miao", "Li", "Jing", "Lao", "Lao", "Juan", "Kou", "Yang", "Wa", "Xiao", "Mou", "Kuang", "Jie", "Lie", "He", "Shi", "Ke", "Jing", "Hao", "Bo", "Min", "Chi", "Lang", "Yong", "Yong", "Mian", "Ke", "Xun", "Juan", "Qing", "Lu", "Pou", "Meng", "Lai", "Le", "Kai", "Mian", "Dong", "Xu", "Xu", "Kan", "Wu", "Yi", "Xun", "Weng", "Sheng", "Lao", "Mu", "Lu", "Piao", "Shi", "Ji", "Qin", "Qiang", "Jiao", "Quan", "Yang", "Yi", "Jue", "Fan", "Juan", "Tong", "Ju", "Dan", "Xie", "Mai", "Xun", "Xun", "Lu", "Li", "Che", "Rang", "Quan", "Bao", "Shao", "Yun", "Jiu", "Bao", "Gou", "Wu"], fe = ["Yun", "Mwun", "Nay", "Gai", "Gai", "Bao", "Cong", null, "Xiong", "Peng", "Ju", "Tao", "Ge", "Pu", "An", "Pao", "Fu", "Gong", "Da", "Jiu", "Qiong", "Bi", "Hua", "Bei", "Nao", "Chi", "Fang", "Jiu", "Yi", "Za", "Jiang", "Kang", "Jiang", "Kuang", "Hu", "Xia", "Qu", "Bian", "Gui", "Qie", "Zang", "Kuang", "Fei", "Hu", "Tou", "Gui", "Gui", "Hui", "Dan", "Gui", "Lian", "Lian", "Suan", "Du", "Jiu", "Qu", "Xi", "Pi", "Qu", "Yi", "Qia", "Yan", "Bian", "Ni", "Qu", "Shi", "Xin", "Qian", "Nian", "Sa", "Zu", "Sheng", "Wu", "Hui", "Ban", "Shi", "Xi", "Wan", "Hua", "Xie", "Wan", "Bei", "Zu", "Zhuo", "Xie", "Dan", "Mai", "Nan", "Dan", "Ji", "Bo", "Shuai", "Bu", "Kuang", "Bian", "Bu", "Zhan", "Qia", "Lu", "You", "Lu", "Xi", "Gua", "Wo", "Xie", "Jie", "Jie", "Wei", "Ang", "Qiong", "Zhi", "Mao", "Yin", "Wei", "Shao", "Ji", "Que", "Luan", "Shi", "Juan", "Xie", "Xu", "Jin", "Que", "Wu", "Ji", "E", "Qing", "Xi", null, "Han", "Zhan", "E", "Ting", "Li", "Zhe", "Han", "Li", "Ya", "Ya", "Yan", "She", "Zhi", "Zha", "Pang", null, "He", "Ya", "Zhi", "Ce", "Pang", "Ti", "Li", "She", "Hou", "Ting", "Zui", "Cuo", "Fei", "Yuan", "Ce", "Yuan", "Xiang", "Yan", "Li", "Jue", "Sha", "Dian", "Chu", "Jiu", "Qin", "Ao", "Gui", "Yan", "Si", "Li", "Chang", "Lan", "Li", "Yan", "Yan", "Yuan", "Si", "Gong", "Lin", "Qiu", "Qu", "Qu", "Uk", "Lei", "Du", "Xian", "Zhuan", "San", "Can", "Can", "Can", "Can", "Ai", "Dai", "You", "Cha", "Ji", "You", "Shuang", "Fan", "Shou", "Guai", "Ba", "Fa", "Ruo", "Shi", "Shu", "Zhuo", "Qu", "Shou", "Bian", "Xu", "Jia", "Pan", "Sou", "Gao", "Wei", "Sou", "Die", "Rui", "Cong", "Kou", "Gu", "Ju", "Ling", "Gua", "Tao", "Kou", "Zhi", "Jiao", "Zhao", "Ba", "Ding", "Ke", "Tai", "Chi", "Shi", "You", "Qiu", "Po", "Ye", "Hao", "Si", "Tan", "Chi", "Le", "Diao", "Ji", null, "Hong"], De = ["Mie", "Xu", "Mang", "Chi", "Ge", "Xuan", "Yao", "Zi", "He", "Ji", "Diao", "Cun", "Tong", "Ming", "Hou", "Li", "Tu", "Xiang", "Zha", "Xia", "Ye", "Lu", "A", "Ma", "Ou", "Xue", "Yi", "Jun", "Chou", "Lin", "Tun", "Yin", "Fei", "Bi", "Qin", "Qin", "Jie", "Bu", "Fou", "Ba", "Dun", "Fen", "E", "Han", "Ting", "Hang", "Shun", "Qi", "Hong", "Zhi", "Shen", "Wu", "Wu", "Chao", "Ne", "Xue", "Xi", "Chui", "Dou", "Wen", "Hou", "Ou", "Wu", "Gao", "Ya", "Jun", "Lu", "E", "Ge", "Mei", "Ai", "Qi", "Cheng", "Wu", "Gao", "Fu", "Jiao", "Hong", "Chi", "Sheng", "Ne", "Tun", "Fu", "Yi", "Dai", "Ou", "Li", "Bai", "Yuan", "Kuai", null, "Qiang", "Wu", "E", "Shi", "Quan", "Pen", "Wen", "Ni", "M", "Ling", "Ran", "You", "Di", "Zhou", "Shi", "Zhou", "Tie", "Xi", "Yi", "Qi", "Ping", "Zi", "Gu", "Zi", "Wei", "Xu", "He", "Nao", "Xia", "Pei", "Yi", "Xiao", "Shen", "Hu", "Ming", "Da", "Qu", "Ju", "Gem", "Za", "Tuo", "Duo", "Pou", "Pao", "Bi", "Fu", "Yang", "He", "Zha", "He", "Hai", "Jiu", "Yong", "Fu", "Que", "Zhou", "Wa", "Ka", "Gu", "Ka", "Zuo", "Bu", "Long", "Dong", "Ning", "Tha", "Si", "Xian", "Huo", "Qi", "Er", "E", "Guang", "Zha", "Xi", "Yi", "Lie", "Zi", "Mie", "Mi", "Zhi", "Yao", "Ji", "Zhou", "Ge", "Shuai", "Zan", "Xiao", "Ke", "Hui", "Kua", "Huai", "Tao", "Xian", "E", "Xuan", "Xiu", "Wai", "Yan", "Lao", "Yi", "Ai", "Pin", "Shen", "Tong", "Hong", "Xiong", "Chi", "Wa", "Ha", "Zai", "Yu", "Di", "Pai", "Xiang", "Ai", "Hen", "Kuang", "Ya", "Da", "Xiao", "Bi", "Yue", null, "Hua", "Sasou", "Kuai", "Duo", null, "Ji", "Nong", "Mou", "Yo", "Hao", "Yuan", "Long", "Pou", "Mang", "Ge", "E", "Chi", "Shao", "Li", "Na", "Zu", "He", "Ku", "Xiao", "Xian", "Lao", "Bo", "Zhe", "Zha", "Liang", "Ba", "Mie", "Le", "Sui", "Fou", "Bu", "Han", "Heng", "Geng", "Shuo", "Ge"], Xe = ["You", "Yan", "Gu", "Gu", "Bai", "Han", "Suo", "Chun", "Yi", "Ai", "Jia", "Tu", "Xian", "Huan", "Li", "Xi", "Tang", "Zuo", "Qiu", "Che", "Wu", "Zao", "Ya", "Dou", "Qi", "Di", "Qin", "Ma", "Mal", "Hong", "Dou", "Kes", "Lao", "Liang", "Suo", "Zao", "Huan", "Lang", "Sha", "Ji", "Zuo", "Wo", "Feng", "Yin", "Hu", "Qi", "Shou", "Wei", "Shua", "Chang", "Er", "Li", "Qiang", "An", "Jie", "Yo", "Nian", "Yu", "Tian", "Lai", "Sha", "Xi", "Tuo", "Hu", "Ai", "Zhou", "Nou", "Ken", "Zhuo", "Zhuo", "Shang", "Di", "Heng", "Lan", "A", "Xiao", "Xiang", "Tun", "Wu", "Wen", "Cui", "Sha", "Hu", "Qi", "Qi", "Tao", "Dan", "Dan", "Ye", "Zi", "Bi", "Cui", "Chuo", "He", "Ya", "Qi", "Zhe", "Pei", "Liang", "Xian", "Pi", "Sha", "La", "Ze", "Qing", "Gua", "Pa", "Zhe", "Se", "Zhuan", "Nie", "Guo", "Luo", "Yan", "Di", "Quan", "Tan", "Bo", "Ding", "Lang", "Xiao", null, "Tang", "Chi", "Ti", "An", "Jiu", "Dan", "Ke", "Yong", "Wei", "Nan", "Shan", "Yu", "Zhe", "La", "Jie", "Hou", "Han", "Die", "Zhou", "Chai", "Wai", "Re", "Yu", "Yin", "Zan", "Yao", "Wo", "Mian", "Hu", "Yun", "Chuan", "Hui", "Huan", "Huan", "Xi", "He", "Ji", "Kui", "Zhong", "Wei", "Sha", "Xu", "Huang", "Du", "Nie", "Xuan", "Liang", "Yu", "Sang", "Chi", "Qiao", "Yan", "Dan", "Pen", "Can", "Li", "Yo", "Zha", "Wei", "Miao", "Ying", "Pen", "Phos", "Kui", "Xi", "Yu", "Jie", "Lou", "Ku", "Sao", "Huo", "Ti", "Yao", "He", "A", "Xiu", "Qiang", "Se", "Yong", "Su", "Hong", "Xie", "Yi", "Suo", "Ma", "Cha", "Hai", "Ke", "Ta", "Sang", "Tian", "Ru", "Sou", "Wa", "Ji", "Pang", "Wu", "Xian", "Shi", "Ge", "Zi", "Jie", "Luo", "Weng", "Wa", "Si", "Chi", "Hao", "Suo", "Jia", "Hai", "Suo", "Qin", "Nie", "He", "Cis", "Sai", "Ng", "Ge", "Na", "Dia", "Ai", null, "Tong", "Bi", "Ao", "Ao", "Lian", "Cui", "Zhe", "Mo", "Sou", "Sou", "Tan"], pe = ["Di", "Qi", "Jiao", "Chong", "Jiao", "Kai", "Tan", "San", "Cao", "Jia", "Ai", "Xiao", "Piao", "Lou", "Ga", "Gu", "Xiao", "Hu", "Hui", "Guo", "Ou", "Xian", "Ze", "Chang", "Xu", "Po", "De", "Ma", "Ma", "Hu", "Lei", "Du", "Ga", "Tang", "Ye", "Beng", "Ying", "Saai", "Jiao", "Mi", "Xiao", "Hua", "Mai", "Ran", "Zuo", "Peng", "Lao", "Xiao", "Ji", "Zhu", "Chao", "Kui", "Zui", "Xiao", "Si", "Hao", "Fu", "Liao", "Qiao", "Xi", "Xiu", "Tan", "Tan", "Mo", "Xun", "E", "Zun", "Fan", "Chi", "Hui", "Zan", "Chuang", "Cu", "Dan", "Yu", "Tun", "Cheng", "Jiao", "Ye", "Xi", "Qi", "Hao", "Lian", "Xu", "Deng", "Hui", "Yin", "Pu", "Jue", "Qin", "Xun", "Nie", "Lu", "Si", "Yan", "Ying", "Da", "Dan", "Yu", "Zhou", "Jin", "Nong", "Yue", "Hui", "Qi", "E", "Zao", "Yi", "Shi", "Jiao", "Yuan", "Ai", "Yong", "Jue", "Kuai", "Yu", "Pen", "Dao", "Ge", "Xin", "Dun", "Dang", "Sin", "Sai", "Pi", "Pi", "Yin", "Zui", "Ning", "Di", "Lan", "Ta", "Huo", "Ru", "Hao", "Xia", "Ya", "Duo", "Xi", "Chou", "Ji", "Jin", "Hao", "Ti", "Chang", null, null, "Ca", "Ti", "Lu", "Hui", "Bo", "You", "Nie", "Yin", "Hu", "Mo", "Huang", "Zhe", "Li", "Liu", "Haai", "Nang", "Xiao", "Mo", "Yan", "Li", "Lu", "Long", "Fu", "Dan", "Chen", "Pin", "Pi", "Xiang", "Huo", "Mo", "Xi", "Duo", "Ku", "Yan", "Chan", "Ying", "Rang", "Dian", "La", "Ta", "Xiao", "Jiao", "Chuo", "Huan", "Huo", "Zhuan", "Nie", "Xiao", "Ca", "Li", "Chan", "Chai", "Li", "Yi", "Luo", "Nang", "Zan", "Su", "Xi", "So", "Jian", "Za", "Zhu", "Lan", "Nie", "Nang", null, null, "Wei", "Hui", "Yin", "Qiu", "Si", "Nin", "Jian", "Hui", "Xin", "Yin", "Nan", "Tuan", "Tuan", "Dun", "Kang", "Yuan", "Jiong", "Pian", "Yun", "Cong", "Hu", "Hui", "Yuan", "You", "Guo", "Kun", "Cong", "Wei", "Tu", "Wei", "Lun", "Guo", "Qun", "Ri", "Ling", "Gu", "Guo", "Tai", "Guo", "Tu", "You"], Te = ["Guo", "Yin", "Hun", "Pu", "Yu", "Han", "Yuan", "Lun", "Quan", "Yu", "Qing", "Guo", "Chuan", "Wei", "Yuan", "Quan", "Ku", "Fu", "Yuan", "Yuan", "E", "Tu", "Tu", "Tu", "Tuan", "Lue", "Hui", "Yi", "Yuan", "Luan", "Luan", "Tu", "Ya", "Tu", "Ting", "Sheng", "Pu", "Lu", "Iri", "Ya", "Zai", "Wei", "Ge", "Yu", "Wu", "Gui", "Pi", "Yi", "Di", "Qian", "Qian", "Zhen", "Zhuo", "Dang", "Qia", "Akutsu", "Yama", "Kuang", "Chang", "Qi", "Nie", "Mo", "Ji", "Jia", "Zhi", "Zhi", "Ban", "Xun", "Tou", "Qin", "Fen", "Jun", "Keng", "Tun", "Fang", "Fen", "Ben", "Tan", "Kan", "Pi", "Zuo", "Keng", "Bi", "Xing", "Di", "Jing", "Ji", "Kuai", "Di", "Jing", "Jian", "Tan", "Li", "Ba", "Wu", "Fen", "Zhui", "Po", "Pan", "Tang", "Kun", "Qu", "Tan", "Zhi", "Tuo", "Gan", "Ping", "Dian", "Gua", "Ni", "Tai", "Pi", "Jiong", "Yang", "Fo", "Ao", "Liu", "Qiu", "Mu", "Ke", "Gou", "Xue", "Ba", "Chi", "Che", "Ling", "Zhu", "Fu", "Hu", "Zhi", "Chui", "La", "Long", "Long", "Lu", "Ao", "Tay", "Pao", null, "Xing", "Dong", "Ji", "Ke", "Lu", "Ci", "Chi", "Lei", "Gai", "Yin", "Hou", "Dui", "Zhao", "Fu", "Guang", "Yao", "Duo", "Duo", "Gui", "Cha", "Yang", "Yin", "Fa", "Gou", "Yuan", "Die", "Xie", "Ken", "Jiong", "Shou", "E", "Ha", "Dian", "Hong", "Wu", "Kua", null, "Tao", "Dang", "Kai", "Gake", "Nao", "An", "Xing", "Xian", "Huan", "Bang", "Pei", "Ba", "Yi", "Yin", "Han", "Xu", "Chui", "Cen", "Geng", "Ai", "Peng", "Fang", "Que", "Yong", "Xun", "Jia", "Di", "Mai", "Lang", "Xuan", "Cheng", "Yan", "Jin", "Zhe", "Lei", "Lie", "Bu", "Cheng", "Gomi", "Bu", "Shi", "Xun", "Guo", "Jiong", "Ye", "Nian", "Di", "Yu", "Bu", "Ya", "Juan", "Sui", "Pi", "Cheng", "Wan", "Ju", "Lun", "Zheng", "Kong", "Chong", "Dong", "Dai", "Tan", "An", "Cai", "Shu", "Beng", "Kan", "Zhi", "Duo", "Yi", "Zhi", "Yi", "Pei", "Ji", "Zhun", "Qi", "Sao", "Ju", "Ni"], He = ["Ku", "Ke", "Tang", "Kun", "Ni", "Jian", "Dui", "Jin", "Gang", "Yu", "E", "Peng", "Gu", "Tu", "Leng", null, "Ya", "Qian", null, "An", null, "Duo", "Nao", "Tu", "Cheng", "Yin", "Hun", "Bi", "Lian", "Guo", "Die", "Zhuan", "Hou", "Bao", "Bao", "Yu", "Di", "Mao", "Jie", "Ruan", "E", "Geng", "Kan", "Zong", "Yu", "Huang", "E", "Yao", "Yan", "Bao", "Ji", "Mei", "Chang", "Du", "Tuo", "Yin", "Feng", "Zhong", "Jie", "Zhen", "Feng", "Gang", "Chuan", "Jian", "Pyeng", "Toride", "Xiang", "Huang", "Leng", "Duan", null, "Xuan", "Ji", "Ji", "Kuai", "Ying", "Ta", "Cheng", "Yong", "Kai", "Su", "Su", "Shi", "Mi", "Ta", "Weng", "Cheng", "Tu", "Tang", "Que", "Zhong", "Li", "Peng", "Bang", "Sai", "Zang", "Dui", "Tian", "Wu", "Cheng", "Xun", "Ge", "Zhen", "Ai", "Gong", "Yan", "Kan", "Tian", "Yuan", "Wen", "Xie", "Liu", "Ama", "Lang", "Chang", "Peng", "Beng", "Chen", "Cu", "Lu", "Ou", "Qian", "Mei", "Mo", "Zhuan", "Shuang", "Shu", "Lou", "Chi", "Man", "Biao", "Jing", "Qi", "Shu", "Di", "Zhang", "Kan", "Yong", "Dian", "Chen", "Zhi", "Xi", "Guo", "Qiang", "Jin", "Di", "Shang", "Mu", "Cui", "Yan", "Ta", "Zeng", "Qi", "Qiang", "Liang", null, "Zhui", "Qiao", "Zeng", "Xu", "Shan", "Shan", "Ba", "Pu", "Kuai", "Dong", "Fan", "Que", "Mo", "Dun", "Dun", "Dun", "Di", "Sheng", "Duo", "Duo", "Tan", "Deng", "Wu", "Fen", "Huang", "Tan", "Da", "Ye", "Sho", "Mama", "Yu", "Qiang", "Ji", "Qiao", "Ken", "Yi", "Pi", "Bi", "Dian", "Jiang", "Ye", "Yong", "Bo", "Tan", "Lan", "Ju", "Huai", "Dang", "Rang", "Qian", "Xun", "Lan", "Xi", "He", "Ai", "Ya", "Dao", "Hao", "Ruan", "Mama", "Lei", "Kuang", "Lu", "Yan", "Tan", "Wei", "Huai", "Long", "Long", "Rui", "Li", "Lin", "Rang", "Ten", "Xun", "Yan", "Lei", "Ba", null, "Shi", "Ren", null, "Zhuang", "Zhuang", "Sheng", "Yi", "Mai", "Ke", "Zhu", "Zhuang", "Hu", "Hu", "Kun", "Yi", "Hu", "Xu", "Kun", "Shou", "Mang", "Zun"], _e = ["Shou", "Yi", "Zhi", "Gu", "Chu", "Jiang", "Feng", "Bei", "Cay", "Bian", "Sui", "Qun", "Ling", "Fu", "Zuo", "Xia", "Xiong", null, "Nao", "Xia", "Kui", "Xi", "Wai", "Yuan", "Mao", "Su", "Duo", "Duo", "Ye", "Qing", "Uys", "Gou", "Gou", "Qi", "Meng", "Meng", "Yin", "Huo", "Chen", "Da", "Ze", "Tian", "Tai", "Fu", "Guai", "Yao", "Yang", "Hang", "Gao", "Shi", "Ben", "Tai", "Tou", "Yan", "Bi", "Yi", "Kua", "Jia", "Duo", "Kwu", "Kuang", "Yun", "Jia", "Pa", "En", "Lian", "Huan", "Di", "Yan", "Pao", "Quan", "Qi", "Nai", "Feng", "Xie", "Fen", "Dian", null, "Kui", "Zou", "Huan", "Qi", "Kai", "Zha", "Ben", "Yi", "Jiang", "Tao", "Zang", "Ben", "Xi", "Xiang", "Fei", "Diao", "Xun", "Keng", "Dian", "Ao", "She", "Weng", "Pan", "Ao", "Wu", "Ao", "Jiang", "Lian", "Duo", "Yun", "Jiang", "Shi", "Fen", "Huo", "Bi", "Lian", "Duo", "Nu", "Nu", "Ding", "Nai", "Qian", "Jian", "Ta", "Jiu", "Nan", "Cha", "Hao", "Xian", "Fan", "Ji", "Shuo", "Ru", "Fei", "Wang", "Hong", "Zhuang", "Fu", "Ma", "Dan", "Ren", "Fu", "Jing", "Yan", "Xie", "Wen", "Zhong", "Pa", "Du", "Ji", "Keng", "Zhong", "Yao", "Jin", "Yun", "Miao", "Pei", "Shi", "Yue", "Zhuang", "Niu", "Yan", "Na", "Xin", "Fen", "Bi", "Yu", "Tuo", "Feng", "Yuan", "Fang", "Wu", "Yu", "Gui", "Du", "Ba", "Ni", "Zhou", "Zhuo", "Zhao", "Da", "Nai", "Yuan", "Tou", "Xuan", "Zhi", "E", "Mei", "Mo", "Qi", "Bi", "Shen", "Qie", "E", "He", "Xu", "Fa", "Zheng", "Min", "Ban", "Mu", "Fu", "Ling", "Zi", "Zi", "Shi", "Ran", "Shan", "Yang", "Man", "Jie", "Gu", "Si", "Xing", "Wei", "Zi", "Ju", "Shan", "Pin", "Ren", "Yao", "Tong", "Jiang", "Shu", "Ji", "Gai", "Shang", "Kuo", "Juan", "Jiao", "Gou", "Mu", "Jian", "Jian", "Yi", "Nian", "Zhi", "Ji", "Ji", "Xian", "Heng", "Guang", "Jun", "Kua", "Yan", "Ming", "Lie", "Pei", "Yan", "You", "Yan", "Cha", "Shen", "Yin", "Chi", "Gui", "Quan", "Zi"], Qe = ["Song", "Wei", "Hong", "Wa", "Lou", "Ya", "Rao", "Jiao", "Luan", "Ping", "Xian", "Shao", "Li", "Cheng", "Xiao", "Mang", "Fu", "Suo", "Wu", "Wei", "Ke", "Lai", "Chuo", "Ding", "Niang", "Xing", "Nan", "Yu", "Nuo", "Pei", "Nei", "Juan", "Shen", "Zhi", "Han", "Di", "Zhuang", "E", "Pin", "Tui", "Han", "Mian", "Wu", "Yan", "Wu", "Xi", "Yan", "Yu", "Si", "Yu", "Wa", null, "Xian", "Ju", "Qu", "Shui", "Qi", "Xian", "Zhui", "Dong", "Chang", "Lu", "Ai", "E", "E", "Lou", "Mian", "Cong", "Pou", "Ju", "Po", "Cai", "Ding", "Wan", "Biao", "Xiao", "Shu", "Qi", "Hui", "Fu", "E", "Wo", "Tan", "Fei", "Wei", "Jie", "Tian", "Ni", "Quan", "Jing", "Hun", "Jing", "Qian", "Dian", "Xing", "Hu", "Wa", "Lai", "Bi", "Yin", "Chou", "Chuo", "Fu", "Jing", "Lun", "Yan", "Lan", "Kun", "Yin", "Ya", "Ju", "Li", "Dian", "Xian", "Hwa", "Hua", "Ying", "Chan", "Shen", "Ting", "Dang", "Yao", "Wu", "Nan", "Ruo", "Jia", "Tou", "Xu", "Yu", "Wei", "Ti", "Rou", "Mei", "Dan", "Ruan", "Qin", "Hui", "Wu", "Qian", "Chun", "Mao", "Fu", "Jie", "Duan", "Xi", "Zhong", "Mei", "Huang", "Mian", "An", "Ying", "Xuan", "Jie", "Wei", "Mei", "Yuan", "Zhen", "Qiu", "Ti", "Xie", "Tuo", "Lian", "Mao", "Ran", "Si", "Pian", "Wei", "Wa", "Jiu", "Hu", "Ao", null, "Bou", "Xu", "Tou", "Gui", "Zou", "Yao", "Pi", "Xi", "Yuan", "Ying", "Rong", "Ru", "Chi", "Liu", "Mei", "Pan", "Ao", "Ma", "Gou", "Kui", "Qin", "Jia", "Sao", "Zhen", "Yuan", "Cha", "Yong", "Ming", "Ying", "Ji", "Su", "Niao", "Xian", "Tao", "Pang", "Lang", "Nao", "Bao", "Ai", "Pi", "Pin", "Yi", "Piao", "Yu", "Lei", "Xuan", "Man", "Yi", "Zhang", "Kang", "Yong", "Ni", "Li", "Di", "Gui", "Yan", "Jin", "Zhuan", "Chang", "Ce", "Han", "Nen", "Lao", "Mo", "Zhe", "Hu", "Hu", "Ao", "Nen", "Qiang", "Ma", "Pie", "Gu", "Wu", "Jiao", "Tuo", "Zhan", "Mao", "Xian", "Xian", "Mo", "Liao", "Lian", "Hua"], ye = ["Gui", "Deng", "Zhi", "Xu", "Yi", "Hua", "Xi", "Hui", "Rao", "Xi", "Yan", "Chan", "Jiao", "Mei", "Fan", "Fan", "Xian", "Yi", "Wei", "Jiao", "Fu", "Shi", "Bi", "Shan", "Sui", "Qiang", "Lian", "Huan", "Xin", "Niao", "Dong", "Yi", "Can", "Ai", "Niang", "Neng", "Ma", "Tiao", "Chou", "Jin", "Ci", "Yu", "Pin", "Yong", "Xu", "Nai", "Yan", "Tai", "Ying", "Can", "Niao", "Wo", "Ying", "Mian", "Kaka", "Ma", "Shen", "Xing", "Ni", "Du", "Liu", "Yuan", "Lan", "Yan", "Shuang", "Ling", "Jiao", "Niang", "Lan", "Xian", "Ying", "Shuang", "Shuai", "Quan", "Mi", "Li", "Luan", "Yan", "Zhu", "Lan", "Zi", "Jie", "Jue", "Jue", "Kong", "Yun", "Zi", "Zi", "Cun", "Sun", "Fu", "Bei", "Zi", "Xiao", "Xin", "Meng", "Si", "Tai", "Bao", "Ji", "Gu", "Nu", "Xue", null, "Zhuan", "Hai", "Luan", "Sun", "Huai", "Mie", "Cong", "Qian", "Shu", "Chan", "Ya", "Zi", "Ni", "Fu", "Zi", "Li", "Xue", "Bo", "Ru", "Lai", "Nie", "Nie", "Ying", "Luan", "Mian", "Ning", "Rong", "Ta", "Gui", "Zhai", "Qiong", "Yu", "Shou", "An", "Tu", "Song", "Wan", "Rou", "Yao", "Hong", "Yi", "Jing", "Zhun", "Mi", "Zhu", "Dang", "Hong", "Zong", "Guan", "Zhou", "Ding", "Wan", "Yi", "Bao", "Shi", "Shi", "Chong", "Shen", "Ke", "Xuan", "Shi", "You", "Huan", "Yi", "Tiao", "Shi", "Xian", "Gong", "Cheng", "Qun", "Gong", "Xiao", "Zai", "Zha", "Bao", "Hai", "Yan", "Xiao", "Jia", "Shen", "Chen", "Rong", "Huang", "Mi", "Kou", "Kuan", "Bin", "Su", "Cai", "Zan", "Ji", "Yuan", "Ji", "Yin", "Mi", "Kou", "Qing", "Que", "Zhen", "Jian", "Fu", "Ning", "Bing", "Huan", "Mei", "Qin", "Han", "Yu", "Shi", "Ning", "Qin", "Ning", "Zhi", "Yu", "Bao", "Kuan", "Ning", "Qin", "Mo", "Cha", "Ju", "Gua", "Qin", "Hu", "Wu", "Liao", "Shi", "Zhu", "Zhai", "Shen", "Wei", "Xie", "Kuan", "Hui", "Liao", "Jun", "Huan", "Yi", "Yi", "Bao", "Qin", "Chong", "Bao", "Feng", "Cun", "Dui", "Si", "Xun", "Dao", "Lu", "Dui", "Shou"], Me = ["Po", "Feng", "Zhuan", "Fu", "She", "Ke", "Jiang", "Jiang", "Zhuan", "Wei", "Zun", "Xun", "Shu", "Dui", "Dao", "Xiao", "Ji", "Shao", "Er", "Er", "Er", "Ga", "Jian", "Shu", "Chen", "Shang", "Shang", "Mo", "Ga", "Chang", "Liao", "Xian", "Xian", null, "Wang", "Wang", "You", "Liao", "Liao", "Yao", "Mang", "Wang", "Wang", "Wang", "Ga", "Yao", "Duo", "Kui", "Zhong", "Jiu", "Gan", "Gu", "Gan", "Tui", "Gan", "Gan", "Shi", "Yin", "Chi", "Kao", "Ni", "Jin", "Wei", "Niao", "Ju", "Pi", "Ceng", "Xi", "Bi", "Ju", "Jie", "Tian", "Qu", "Ti", "Jie", "Wu", "Diao", "Shi", "Shi", "Ping", "Ji", "Xie", "Chen", "Xi", "Ni", "Zhan", "Xi", null, "Man", "E", "Lou", "Ping", "Ti", "Fei", "Shu", "Xie", "Tu", "Lu", "Lu", "Xi", "Ceng", "Lu", "Ju", "Xie", "Ju", "Jue", "Liao", "Jue", "Shu", "Xi", "Che", "Tun", "Ni", "Shan", null, "Xian", "Li", "Xue", "Nata", null, "Long", "Yi", "Qi", "Ren", "Wu", "Han", "Shen", "Yu", "Chu", "Sui", "Qi", null, "Yue", "Ban", "Yao", "Ang", "Ya", "Wu", "Jie", "E", "Ji", "Qian", "Fen", "Yuan", "Qi", "Cen", "Qian", "Qi", "Cha", "Jie", "Qu", "Gang", "Xian", "Ao", "Lan", "Dao", "Ba", "Zuo", "Zuo", "Yang", "Ju", "Gang", "Ke", "Gou", "Xue", "Bei", "Li", "Tiao", "Ju", "Yan", "Fu", "Xiu", "Jia", "Ling", "Tuo", "Pei", "You", "Dai", "Kuang", "Yue", "Qu", "Hu", "Po", "Min", "An", "Tiao", "Ling", "Chi", "Yuri", "Dong", "Cem", "Kui", "Xiu", "Mao", "Tong", "Xue", "Yi", "Kura", "He", "Ke", "Luo", "E", "Fu", "Xun", "Die", "Lu", "An", "Er", "Gai", "Quan", "Tong", "Yi", "Mu", "Shi", "An", "Wei", "Hu", "Zhi", "Mi", "Li", "Ji", "Tong", "Wei", "You", "Sang", "Xia", "Li", "Yao", "Jiao", "Zheng", "Luan", "Jiao", "E", "E", "Yu", "Ye", "Bu", "Qiao", "Qun", "Feng", "Feng", "Nao", "Li", "You", "Xian", "Hong", "Dao", "Shen", "Cheng", "Tu", "Geng", "Jun", "Hao", "Xia", "Yin", "Yu"], me = ["Lang", "Kan", "Lao", "Lai", "Xian", "Que", "Kong", "Chong", "Chong", "Ta", "Lin", "Hua", "Ju", "Lai", "Qi", "Min", "Kun", "Kun", "Zu", "Gu", "Cui", "Ya", "Ya", "Gang", "Lun", "Lun", "Leng", "Jue", "Duo", "Zheng", "Guo", "Yin", "Dong", "Han", "Zheng", "Wei", "Yao", "Pi", "Yan", "Song", "Jie", "Beng", "Zu", "Jue", "Dong", "Zhan", "Gu", "Yin", null, "Ze", "Huang", "Yu", "Wei", "Yang", "Feng", "Qiu", "Dun", "Ti", "Yi", "Zhi", "Shi", "Zai", "Yao", "E", "Zhu", "Kan", "Lu", "Yan", "Mei", "Gan", "Ji", "Ji", "Huan", "Ting", "Sheng", "Mei", "Qian", "Wu", "Yu", "Zong", "Lan", "Jue", "Yan", "Yan", "Wei", "Zong", "Cha", "Sui", "Rong", "Yamashina", "Qin", "Yu", "Kewashii", "Lou", "Tu", "Dui", "Xi", "Weng", "Cang", "Dang", "Hong", "Jie", "Ai", "Liu", "Wu", "Song", "Qiao", "Zi", "Wei", "Beng", "Dian", "Cuo", "Qian", "Yong", "Nie", "Cuo", "Ji", null, "Tao", "Song", "Zong", "Jiang", "Liao", "Kang", "Chan", "Die", "Cen", "Ding", "Tu", "Lou", "Zhang", "Zhan", "Zhan", "Ao", "Cao", "Qu", "Qiang", "Zui", "Zui", "Dao", "Dao", "Xi", "Yu", "Bo", "Long", "Xiang", "Ceng", "Bo", "Qin", "Jiao", "Yan", "Lao", "Zhan", "Lin", "Liao", "Liao", "Jin", "Deng", "Duo", "Zun", "Jiao", "Gui", "Yao", "Qiao", "Yao", "Jue", "Zhan", "Yi", "Xue", "Nao", "Ye", "Ye", "Yi", "E", "Xian", "Ji", "Xie", "Ke", "Xi", "Di", "Ao", "Zui", null, "Ni", "Rong", "Dao", "Ling", "Za", "Yu", "Yue", "Yin", null, "Jie", "Li", "Sui", "Long", "Long", "Dian", "Ying", "Xi", "Ju", "Chan", "Ying", "Kui", "Yan", "Wei", "Nao", "Quan", "Chao", "Cuan", "Luan", "Dian", "Dian", null, "Yan", "Yan", "Yan", "Nao", "Yan", "Chuan", "Gui", "Chuan", "Zhou", "Huang", "Jing", "Xun", "Chao", "Chao", "Lie", "Gong", "Zuo", "Qiao", "Ju", "Gong", "Kek", "Wu", "Pwu", "Pwu", "Chai", "Qiu", "Qiu", "Ji", "Yi", "Si", "Ba", "Zhi", "Zhao", "Xiang", "Yi", "Jin", "Xun", "Juan", "Phas", "Xun", "Jin", "Fu"], we = ["Za", "Bi", "Shi", "Bu", "Ding", "Shuai", "Fan", "Nie", "Shi", "Fen", "Pa", "Zhi", "Xi", "Hu", "Dan", "Wei", "Zhang", "Tang", "Dai", "Ma", "Pei", "Pa", "Tie", "Fu", "Lian", "Zhi", "Zhou", "Bo", "Zhi", "Di", "Mo", "Yi", "Yi", "Ping", "Qia", "Juan", "Ru", "Shuai", "Dai", "Zheng", "Shui", "Qiao", "Zhen", "Shi", "Qun", "Xi", "Bang", "Dai", "Gui", "Chou", "Ping", "Zhang", "Sha", "Wan", "Dai", "Wei", "Chang", "Sha", "Qi", "Ze", "Guo", "Mao", "Du", "Hou", "Zheng", "Xu", "Mi", "Wei", "Wo", "Fu", "Yi", "Bang", "Ping", "Tazuna", "Gong", "Pan", "Huang", "Dao", "Mi", "Jia", "Teng", "Hui", "Zhong", "Shan", "Man", "Mu", "Biao", "Guo", "Ze", "Mu", "Bang", "Zhang", "Jiong", "Chan", "Fu", "Zhi", "Hu", "Fan", "Chuang", "Bi", "Hei", null, "Mi", "Qiao", "Chan", "Fen", "Meng", "Bang", "Chou", "Mie", "Chu", "Jie", "Xian", "Lan", "Gan", "Ping", "Nian", "Qian", "Bing", "Bing", "Xing", "Gan", "Yao", "Huan", "You", "You", "Ji", "Guang", "Pi", "Ting", "Ze", "Guang", "Zhuang", "Mo", "Qing", "Bi", "Qin", "Dun", "Chuang", "Gui", "Ya", "Bai", "Jie", "Xu", "Lu", "Wu", null, "Ku", "Ying", "Di", "Pao", "Dian", "Ya", "Miao", "Geng", "Ci", "Fu", "Tong", "Pang", "Fei", "Xiang", "Yi", "Zhi", "Tiao", "Zhi", "Xiu", "Du", "Zuo", "Xiao", "Tu", "Gui", "Ku", "Pang", "Ting", "You", "Bu", "Ding", "Cheng", "Lai", "Bei", "Ji", "An", "Shu", "Kang", "Yong", "Tuo", "Song", "Shu", "Qing", "Yu", "Yu", "Miao", "Sou", "Ce", "Xiang", "Fei", "Jiu", "He", "Hui", "Liu", "Sha", "Lian", "Lang", "Sou", "Jian", "Pou", "Qing", "Jiu", "Jiu", "Qin", "Ao", "Kuo", "Lou", "Yin", "Liao", "Dai", "Lu", "Yi", "Chu", "Chan", "Tu", "Si", "Xin", "Miao", "Chang", "Wu", "Fei", "Guang", "Koc", "Kuai", "Bi", "Qiang", "Xie", "Lin", "Lin", "Liao", "Lu", null, "Ying", "Xian", "Ting", "Yong", "Li", "Ting", "Yin", "Xun", "Yan", "Ting", "Di", "Po", "Jian", "Hui", "Nai", "Hui", "Gong", "Nian"], Be = ["Kai", "Bian", "Yi", "Qi", "Nong", "Fen", "Ju", "Yan", "Yi", "Zang", "Bi", "Yi", "Yi", "Er", "San", "Shi", "Er", "Shi", "Shi", "Gong", "Diao", "Yin", "Hu", "Fu", "Hong", "Wu", "Tui", "Chi", "Jiang", "Ba", "Shen", "Di", "Zhang", "Jue", "Tao", "Fu", "Di", "Mi", "Xian", "Hu", "Chao", "Nu", "Jing", "Zhen", "Yi", "Mi", "Quan", "Wan", "Shao", "Ruo", "Xuan", "Jing", "Dun", "Zhang", "Jiang", "Qiang", "Peng", "Dan", "Qiang", "Bi", "Bi", "She", "Dan", "Jian", "Gou", "Sei", "Fa", "Bi", "Kou", "Nagi", "Bie", "Xiao", "Dan", "Kuo", "Qiang", "Hong", "Mi", "Kuo", "Wan", "Jue", "Ji", "Ji", "Gui", "Dang", "Lu", "Lu", "Tuan", "Hui", "Zhi", "Hui", "Hui", "Yi", "Yi", "Yi", "Yi", "Huo", "Huo", "Shan", "Xing", "Wen", "Tong", "Yan", "Yan", "Yu", "Chi", "Cai", "Biao", "Diao", "Bin", "Peng", "Yong", "Piao", "Zhang", "Ying", "Chi", "Chi", "Zhuo", "Tuo", "Ji", "Pang", "Zhong", "Yi", "Wang", "Che", "Bi", "Chi", "Ling", "Fu", "Wang", "Zheng", "Cu", "Wang", "Jing", "Dai", "Xi", "Xun", "Hen", "Yang", "Huai", "Lu", "Hou", "Wa", "Cheng", "Zhi", "Xu", "Jing", "Tu", "Cong", null, "Lai", "Cong", "De", "Pai", "Xi", null, "Qi", "Chang", "Zhi", "Cong", "Zhou", "Lai", "Yu", "Xie", "Jie", "Jian", "Chi", "Jia", "Bian", "Huang", "Fu", "Xun", "Wei", "Pang", "Yao", "Wei", "Xi", "Zheng", "Piao", "Chi", "De", "Zheng", "Zheng", "Bie", "De", "Chong", "Che", "Jiao", "Wei", "Jiao", "Hui", "Mei", "Long", "Xiang", "Bao", "Qu", "Xin", "Shu", "Bi", "Yi", "Le", "Ren", "Dao", "Ding", "Gai", "Ji", "Ren", "Ren", "Chan", "Tan", "Te", "Te", "Gan", "Qi", "Shi", "Cun", "Zhi", "Wang", "Mang", "Xi", "Fan", "Ying", "Tian", "Min", "Min", "Zhong", "Chong", "Wu", "Ji", "Wu", "Xi", "Ye", "You", "Wan", "Cong", "Zhong", "Kuai", "Yu", "Bian", "Zhi", "Qi", "Cui", "Chen", "Tai", "Tun", "Qian", "Nian", "Hun", "Xiong", "Niu", "Wang", "Xian", "Xin", "Kang", "Hu", "Kai", "Fen"], Fe = ["Huai", "Tai", "Song", "Wu", "Ou", "Chang", "Chuang", "Ju", "Yi", "Bao", "Chao", "Min", "Pei", "Zuo", "Zen", "Yang", "Kou", "Ban", "Nu", "Nao", "Zheng", "Pa", "Bu", "Tie", "Gu", "Hu", "Ju", "Da", "Lian", "Si", "Chou", "Di", "Dai", "Yi", "Tu", "You", "Fu", "Ji", "Peng", "Xing", "Yuan", "Ni", "Guai", "Fu", "Xi", "Bi", "You", "Qie", "Xuan", "Cong", "Bing", "Huang", "Xu", "Chu", "Pi", "Xi", "Xi", "Tan", "Koraeru", "Zong", "Dui", null, "Ki", "Yi", "Chi", "Ren", "Xun", "Shi", "Xi", "Lao", "Heng", "Kuang", "Mu", "Zhi", "Xie", "Lian", "Tiao", "Huang", "Die", "Hao", "Kong", "Gui", "Heng", "Xi", "Xiao", "Shu", "S", "Kua", "Qiu", "Yang", "Hui", "Hui", "Chi", "Jia", "Yi", "Xiong", "Guai", "Lin", "Hui", "Zi", "Xu", "Chi", "Xiang", "Nu", "Hen", "En", "Ke", "Tong", "Tian", "Gong", "Quan", "Xi", "Qia", "Yue", "Peng", "Ken", "De", "Hui", "E", "Kyuu", "Tong", "Yan", "Kai", "Ce", "Nao", "Yun", "Mang", "Yong", "Yong", "Yuan", "Pi", "Kun", "Qiao", "Yue", "Yu", "Yu", "Jie", "Xi", "Zhe", "Lin", "Ti", "Han", "Hao", "Qie", "Ti", "Bu", "Yi", "Qian", "Hui", "Xi", "Bei", "Man", "Yi", "Heng", "Song", "Quan", "Cheng", "Hui", "Wu", "Wu", "You", "Li", "Liang", "Huan", "Cong", "Yi", "Yue", "Li", "Nin", "Nao", "E", "Que", "Xuan", "Qian", "Wu", "Min", "Cong", "Fei", "Bei", "Duo", "Cui", "Chang", "Men", "Li", "Ji", "Guan", "Guan", "Xing", "Dao", "Qi", "Kong", "Tian", "Lun", "Xi", "Kan", "Kun", "Ni", "Qing", "Chou", "Dun", "Guo", "Chan", "Liang", "Wan", "Yuan", "Jin", "Ji", "Lin", "Yu", "Huo", "He", "Quan", "Tan", "Ti", "Ti", "Nie", "Wang", "Chuo", "Bu", "Hun", "Xi", "Tang", "Xin", "Wei", "Hui", "E", "Rui", "Zong", "Jian", "Yong", "Dian", "Ju", "Can", "Cheng", "De", "Bei", "Qie", "Can", "Dan", "Guan", "Duo", "Nao", "Yun", "Xiang", "Zhui", "Die", "Huang", "Chun", "Qiong", "Re", "Xing", "Ce", "Bian", "Hun", "Zong", "Ti"], be = ["Qiao", "Chou", "Bei", "Xuan", "Wei", "Ge", "Qian", "Wei", "Yu", "Yu", "Bi", "Xuan", "Huan", "Min", "Bi", "Yi", "Mian", "Yong", "Kai", "Dang", "Yin", "E", "Chen", "Mou", "Ke", "Ke", "Yu", "Ai", "Qie", "Yan", "Nuo", "Gan", "Yun", "Zong", "Sai", "Leng", "Fen", null, "Kui", "Kui", "Que", "Gong", "Yun", "Su", "Su", "Qi", "Yao", "Song", "Huang", "Ji", "Gu", "Ju", "Chuang", "Ni", "Xie", "Kai", "Zheng", "Yong", "Cao", "Sun", "Shen", "Bo", "Kai", "Yuan", "Xie", "Hun", "Yong", "Yang", "Li", "Sao", "Tao", "Yin", "Ci", "Xu", "Qian", "Tai", "Huang", "Yun", "Shen", "Ming", null, "She", "Cong", "Piao", "Mo", "Mu", "Guo", "Chi", "Can", "Can", "Can", "Cui", "Min", "Te", "Zhang", "Tong", "Ao", "Shuang", "Man", "Guan", "Que", "Zao", "Jiu", "Hui", "Kai", "Lian", "Ou", "Song", "Jin", "Yin", "Lu", "Shang", "Wei", "Tuan", "Man", "Qian", "She", "Yong", "Qing", "Kang", "Di", "Zhi", "Lou", "Juan", "Qi", "Qi", "Yu", "Ping", "Liao", "Cong", "You", "Chong", "Zhi", "Tong", "Cheng", "Qi", "Qu", "Peng", "Bei", "Bie", "Chun", "Jiao", "Zeng", "Chi", "Lian", "Ping", "Kui", "Hui", "Qiao", "Cheng", "Yin", "Yin", "Xi", "Xi", "Dan", "Tan", "Duo", "Dui", "Dui", "Su", "Jue", "Ce", "Xiao", "Fan", "Fen", "Lao", "Lao", "Chong", "Han", "Qi", "Xian", "Min", "Jing", "Liao", "Wu", "Can", "Jue", "Cu", "Xian", "Tan", "Sheng", "Pi", "Yi", "Chu", "Xian", "Nao", "Dan", "Tan", "Jing", "Song", "Han", "Jiao", "Wai", "Huan", "Dong", "Qin", "Qin", "Qu", "Cao", "Ken", "Xie", "Ying", "Ao", "Mao", "Yi", "Lin", "Se", "Jun", "Huai", "Men", "Lan", "Ai", "Lin", "Yan", "Gua", "Xia", "Chi", "Yu", "Yin", "Dai", "Meng", "Ai", "Meng", "Dui", "Qi", "Mo", "Lan", "Men", "Chou", "Zhi", "Nuo", "Nuo", "Yan", "Yang", "Bo", "Zhi", "Kuang", "Kuang", "You", "Fu", "Liu", "Mie", "Cheng", null, "Chan", "Meng", "Lan", "Huai", "Xuan", "Rang", "Chan", "Ji", "Ju", "Huan", "She", "Yi"], xe = ["Lian", "Nan", "Mi", "Tang", "Jue", "Gang", "Gang", "Gang", "Ge", "Yue", "Wu", "Jian", "Xu", "Shu", "Rong", "Xi", "Cheng", "Wo", "Jie", "Ge", "Jian", "Qiang", "Huo", "Qiang", "Zhan", "Dong", "Qi", "Jia", "Die", "Zei", "Jia", "Ji", "Shi", "Kan", "Ji", "Kui", "Gai", "Deng", "Zhan", "Chuang", "Ge", "Jian", "Jie", "Yu", "Jian", "Yan", "Lu", "Xi", "Zhan", "Xi", "Xi", "Chuo", "Dai", "Qu", "Hu", "Hu", "Hu", "E", "Shi", "Li", "Mao", "Hu", "Li", "Fang", "Suo", "Bian", "Dian", "Jiong", "Shang", "Yi", "Yi", "Shan", "Hu", "Fei", "Yan", "Shou", "T", "Cai", "Zha", "Qiu", "Le", "Bu", "Ba", "Da", "Reng", "Fu", "Hameru", "Zai", "Tuo", "Zhang", "Diao", "Kang", "Yu", "Ku", "Han", "Shen", "Cha", "Yi", "Gu", "Kou", "Wu", "Tuo", "Qian", "Zhi", "Ren", "Kuo", "Men", "Sao", "Yang", "Niu", "Ban", "Che", "Rao", "Xi", "Qian", "Ban", "Jia", "Yu", "Fu", "Ao", "Xi", "Pi", "Zhi", "Zi", "E", "Dun", "Zhao", "Cheng", "Ji", "Yan", "Kuang", "Bian", "Chao", "Ju", "Wen", "Hu", "Yue", "Jue", "Ba", "Qin", "Zhen", "Zheng", "Yun", "Wan", "Nu", "Yi", "Shu", "Zhua", "Pou", "Tou", "Dou", "Kang", "Zhe", "Pou", "Fu", "Pao", "Ba", "Ao", "Ze", "Tuan", "Kou", "Lun", "Qiang", null, "Hu", "Bao", "Bing", "Zhi", "Peng", "Tan", "Pu", "Pi", "Tai", "Yao", "Zhen", "Zha", "Yang", "Bao", "He", "Ni", "Yi", "Di", "Chi", "Pi", "Za", "Mo", "Mo", "Shen", "Ya", "Chou", "Qu", "Min", "Chu", "Jia", "Fu", "Zhan", "Zhu", "Dan", "Chai", "Mu", "Nian", "La", "Fu", "Pao", "Ban", "Pai", "Ling", "Na", "Guai", "Qian", "Ju", "Tuo", "Ba", "Tuo", "Tuo", "Ao", "Ju", "Zhuo", "Pan", "Zhao", "Bai", "Bai", "Di", "Ni", "Ju", "Kuo", "Long", "Jian", null, "Yong", "Lan", "Ning", "Bo", "Ze", "Qian", "Hen", "Gua", "Shi", "Jie", "Zheng", "Nin", "Gong", "Gong", "Quan", "Shuan", "Cun", "Zan", "Kao", "Chi", "Xie", "Ce", "Hui", "Pin", "Zhuai", "Shi", "Na"], Ge = ["Bo", "Chi", "Gua", "Zhi", "Kuo", "Duo", "Duo", "Zhi", "Qie", "An", "Nong", "Zhen", "Ge", "Jiao", "Ku", "Dong", "Ru", "Tiao", "Lie", "Zha", "Lu", "Die", "Wa", "Jue", "Mushiru", "Ju", "Zhi", "Luan", "Ya", "Zhua", "Ta", "Xie", "Nao", "Dang", "Jiao", "Zheng", "Ji", "Hui", "Xun", "Ku", "Ai", "Tuo", "Nuo", "Cuo", "Bo", "Geng", "Ti", "Zhen", "Cheng", "Suo", "Suo", "Keng", "Mei", "Long", "Ju", "Peng", "Jian", "Yi", "Ting", "Shan", "Nuo", "Wan", "Xie", "Cha", "Feng", "Jiao", "Wu", "Jun", "Jiu", "Tong", "Kun", "Huo", "Tu", "Zhuo", "Pou", "Le", "Ba", "Han", "Shao", "Nie", "Juan", "Ze", "Song", "Ye", "Jue", "Bu", "Huan", "Bu", "Zun", "Yi", "Zhai", "Lu", "Sou", "Tuo", "Lao", "Sun", "Bang", "Jian", "Huan", "Dao", null, "Wan", "Qin", "Peng", "She", "Lie", "Min", "Men", "Fu", "Bai", "Ju", "Dao", "Wo", "Ai", "Juan", "Yue", "Zong", "Chen", "Chui", "Jie", "Tu", "Ben", "Na", "Nian", "Nuo", "Zu", "Wo", "Xi", "Xian", "Cheng", "Dian", "Sao", "Lun", "Qing", "Gang", "Duo", "Shou", "Diao", "Pou", "Di", "Zhang", "Gun", "Ji", "Tao", "Qia", "Qi", "Pai", "Shu", "Qian", "Ling", "Yi", "Ya", "Jue", "Zheng", "Liang", "Gua", "Yi", "Huo", "Shan", "Zheng", "Lue", "Cai", "Tan", "Che", "Bing", "Jie", "Ti", "Kong", "Tui", "Yan", "Cuo", "Zou", "Ju", "Tian", "Qian", "Ken", "Bai", "Shou", "Jie", "Lu", "Guo", "Haba", null, "Zhi", "Dan", "Mang", "Xian", "Sao", "Guan", "Peng", "Yuan", "Nuo", "Jian", "Zhen", "Jiu", "Jian", "Yu", "Yan", "Kui", "Nan", "Hong", "Rou", "Pi", "Wei", "Sai", "Zou", "Xuan", "Miao", "Ti", "Nie", "Cha", "Shi", "Zong", "Zhen", "Yi", "Shun", "Heng", "Bian", "Yang", "Huan", "Yan", "Zuan", "An", "Xu", "Ya", "Wo", "Ke", "Chuai", "Ji", "Ti", "La", "La", "Cheng", "Kai", "Jiu", "Jiu", "Tu", "Jie", "Hui", "Geng", "Chong", "Shuo", "She", "Xie", "Yuan", "Qian", "Ye", "Cha", "Zha", "Bei", "Yao", null, null, "Lan", "Wen", "Qin"], Ne = ["Chan", "Ge", "Lou", "Zong", "Geng", "Jiao", "Gou", "Qin", "Yong", "Que", "Chou", "Chi", "Zhan", "Sun", "Sun", "Bo", "Chu", "Rong", "Beng", "Cuo", "Sao", "Ke", "Yao", "Dao", "Zhi", "Nu", "Xie", "Jian", "Sou", "Qiu", "Gao", "Xian", "Shuo", "Sang", "Jin", "Mie", "E", "Chui", "Nuo", "Shan", "Ta", "Jie", "Tang", "Pan", "Ban", "Da", "Li", "Tao", "Hu", "Zhi", "Wa", "Xia", "Qian", "Wen", "Qiang", "Tian", "Zhen", "E", "Xi", "Nuo", "Quan", "Cha", "Zha", "Ge", "Wu", "En", "She", "Kang", "She", "Shu", "Bai", "Yao", "Bin", "Sou", "Tan", "Sa", "Chan", "Suo", "Liao", "Chong", "Chuang", "Guo", "Bing", "Feng", "Shuai", "Di", "Qi", "Sou", "Zhai", "Lian", "Tang", "Chi", "Guan", "Lu", "Luo", "Lou", "Zong", "Gai", "Hu", "Zha", "Chuang", "Tang", "Hua", "Cui", "Nai", "Mo", "Jiang", "Gui", "Ying", "Zhi", "Ao", "Zhi", "Nie", "Man", "Shan", "Kou", "Shu", "Suo", "Tuan", "Jiao", "Mo", "Mo", "Zhe", "Xian", "Keng", "Piao", "Jiang", "Yin", "Gou", "Qian", "Lue", "Ji", "Ying", "Jue", "Pie", "Pie", "Lao", "Dun", "Xian", "Ruan", "Kui", "Zan", "Yi", "Xun", "Cheng", "Cheng", "Sa", "Nao", "Heng", "Si", "Qian", "Huang", "Da", "Zun", "Nian", "Lin", "Zheng", "Hui", "Zhuang", "Jiao", "Ji", "Cao", "Dan", "Dan", "Che", "Bo", "Che", "Jue", "Xiao", "Liao", "Ben", "Fu", "Qiao", "Bo", "Cuo", "Zhuo", "Zhuan", "Tuo", "Pu", "Qin", "Dun", "Nian", null, "Xie", "Lu", "Jiao", "Cuan", "Ta", "Han", "Qiao", "Zhua", "Jian", "Gan", "Yong", "Lei", "Kuo", "Lu", "Shan", "Zhuo", "Ze", "Pu", "Chuo", "Ji", "Dang", "Suo", "Cao", "Qing", "Jing", "Huan", "Jie", "Qin", "Kuai", "Dan", "Xi", "Ge", "Pi", "Bo", "Ao", "Ju", "Ye", null, "Mang", "Sou", "Mi", "Ji", "Tai", "Zhuo", "Dao", "Xing", "Lan", "Ca", "Ju", "Ye", "Ru", "Ye", "Ye", "Ni", "Hu", "Ji", "Bin", "Ning", "Ge", "Zhi", "Jie", "Kuo", "Mo", "Jian", "Xie", "Lie", "Tan", "Bai", "Sou", "Lu", "Lue", "Rao", "Zhi"], ve = ["Pan", "Yang", "Lei", "Sa", "Shu", "Zan", "Nian", "Xian", "Jun", "Huo", "Li", "La", "Han", "Ying", "Lu", "Long", "Qian", "Qian", "Zan", "Qian", "Lan", "San", "Ying", "Mei", "Rang", "Chan", null, "Cuan", "Xi", "She", "Luo", "Jun", "Mi", "Li", "Zan", "Luan", "Tan", "Zuan", "Li", "Dian", "Wa", "Dang", "Jiao", "Jue", "Lan", "Li", "Nang", "Zhi", "Gui", "Gui", "Qi", "Xin", "Pu", "Sui", "Shou", "Kao", "You", "Gai", "Yi", "Gong", "Gan", "Ban", "Fang", "Zheng", "Bo", "Dian", "Kou", "Min", "Wu", "Gu", "He", "Ce", "Xiao", "Mi", "Chu", "Ge", "Di", "Xu", "Jiao", "Min", "Chen", "Jiu", "Zhen", "Duo", "Yu", "Chi", "Ao", "Bai", "Xu", "Jiao", "Duo", "Lian", "Nie", "Bi", "Chang", "Dian", "Duo", "Yi", "Gan", "San", "Ke", "Yan", "Dun", "Qi", "Dou", "Xiao", "Duo", "Jiao", "Jing", "Yang", "Xia", "Min", "Shu", "Ai", "Qiao", "Ai", "Zheng", "Di", "Zhen", "Fu", "Shu", "Liao", "Qu", "Xiong", "Xi", "Jiao", "Sen", "Jiao", "Zhuo", "Yi", "Lian", "Bi", "Li", "Xiao", "Xiao", "Wen", "Xue", "Qi", "Qi", "Zhai", "Bin", "Jue", "Zhai", null, "Fei", "Ban", "Ban", "Lan", "Yu", "Lan", "Wei", "Dou", "Sheng", "Liao", "Jia", "Hu", "Xie", "Jia", "Yu", "Zhen", "Jiao", "Wo", "Tou", "Chu", "Jin", "Chi", "Yin", "Fu", "Qiang", "Zhan", "Qu", "Zhuo", "Zhan", "Duan", "Zhuo", "Si", "Xin", "Zhuo", "Zhuo", "Qin", "Lin", "Zhuo", "Chu", "Duan", "Zhu", "Fang", "Xie", "Hang", "Yu", "Shi", "Pei", "You", "Mye", "Pang", "Qi", "Zhan", "Mao", "Lu", "Pei", "Pi", "Liu", "Fu", "Fang", "Xuan", "Jing", "Jing", "Ni", "Zu", "Zhao", "Yi", "Liu", "Shao", "Jian", "Es", "Yi", "Qi", "Zhi", "Fan", "Piao", "Fan", "Zhan", "Guai", "Sui", "Yu", "Wu", "Ji", "Ji", "Ji", "Huo", "Ri", "Dan", "Jiu", "Zhi", "Zao", "Xie", "Tiao", "Xun", "Xu", "Xu", "Xu", "Gan", "Han", "Tai", "Di", "Xu", "Chan", "Shi", "Kuang", "Yang", "Shi", "Wang", "Min", "Min", "Tun", "Chun", "Wu"], ke = ["Yun", "Bei", "Ang", "Ze", "Ban", "Jie", "Kun", "Sheng", "Hu", "Fang", "Hao", "Gui", "Chang", "Xuan", "Ming", "Hun", "Fen", "Qin", "Hu", "Yi", "Xi", "Xin", "Yan", "Ze", "Fang", "Tan", "Shen", "Ju", "Yang", "Zan", "Bing", "Xing", "Ying", "Xuan", "Pei", "Zhen", "Ling", "Chun", "Hao", "Mei", "Zuo", "Mo", "Bian", "Xu", "Hun", "Zhao", "Zong", "Shi", "Shi", "Yu", "Fei", "Die", "Mao", "Ni", "Chang", "Wen", "Dong", "Ai", "Bing", "Ang", "Zhou", "Long", "Xian", "Kuang", "Tiao", "Chao", "Shi", "Huang", "Huang", "Xuan", "Kui", "Xu", "Jiao", "Jin", "Zhi", "Jin", "Shang", "Tong", "Hong", "Yan", "Gai", "Xiang", "Shai", "Xiao", "Ye", "Yun", "Hui", "Han", "Han", "Jun", "Wan", "Xian", "Kun", "Zhou", "Xi", "Cheng", "Sheng", "Bu", "Zhe", "Zhe", "Wu", "Han", "Hui", "Hao", "Chen", "Wan", "Tian", "Zhuo", "Zui", "Zhou", "Pu", "Jing", "Xi", "Shan", "Yi", "Xi", "Qing", "Qi", "Jing", "Gui", "Zhen", "Yi", "Zhi", "An", "Wan", "Lin", "Liang", "Chang", "Wang", "Xiao", "Zan", "Hi", "Xuan", "Xuan", "Yi", "Xia", "Yun", "Hui", "Fu", "Min", "Kui", "He", "Ying", "Du", "Wei", "Shu", "Qing", "Mao", "Nan", "Jian", "Nuan", "An", "Yang", "Chun", "Yao", "Suo", "Jin", "Ming", "Jiao", "Kai", "Gao", "Weng", "Chang", "Qi", "Hao", "Yan", "Li", "Ai", "Ji", "Gui", "Men", "Zan", "Xie", "Hao", "Mu", "Mo", "Cong", "Ni", "Zhang", "Hui", "Bao", "Han", "Xuan", "Chuan", "Liao", "Xian", "Dan", "Jing", "Pie", "Lin", "Tun", "Xi", "Yi", "Ji", "Huang", "Tai", "Ye", "Ye", "Li", "Tan", "Tong", "Xiao", "Fei", "Qin", "Zhao", "Hao", "Yi", "Xiang", "Xing", "Sen", "Jiao", "Bao", "Jing", "Yian", "Ai", "Ye", "Ru", "Shu", "Meng", "Xun", "Yao", "Pu", "Li", "Chen", "Kuang", "Die", null, "Yan", "Huo", "Lu", "Xi", "Rong", "Long", "Nang", "Luo", "Luan", "Shai", "Tang", "Yan", "Chu", "Yue", "Yue", "Qu", "Yi", "Geng", "Ye", "Hu", "He", "Shu", "Cao", "Cao", "Noboru", "Man", "Ceng", "Ceng", "Ti"], Pe = ["Zui", "Can", "Xu", "Hui", "Yin", "Qie", "Fen", "Pi", "Yue", "You", "Ruan", "Peng", "Ban", "Fu", "Ling", "Fei", "Qu", null, "Nu", "Tiao", "Shuo", "Zhen", "Lang", "Lang", "Juan", "Ming", "Huang", "Wang", "Tun", "Zhao", "Ji", "Qi", "Ying", "Zong", "Wang", "Tong", "Lang", null, "Meng", "Long", "Mu", "Deng", "Wei", "Mo", "Ben", "Zha", "Zhu", "Shu", null, "Zhu", "Ren", "Ba", "Po", "Duo", "Duo", "Dao", "Li", "Qiu", "Ji", "Jiu", "Bi", "Xiu", "Ting", "Ci", "Sha", "Eburi", "Za", "Quan", "Qian", "Yu", "Gan", "Wu", "Cha", "Shan", "Xun", "Fan", "Wu", "Zi", "Li", "Xing", "Cai", "Cun", "Ren", "Shao", "Tuo", "Di", "Zhang", "Mang", "Chi", "Yi", "Gu", "Gong", "Du", "Yi", "Qi", "Shu", "Gang", "Tiao", "Moku", "Soma", "Tochi", "Lai", "Sugi", "Mang", "Yang", "Ma", "Miao", "Si", "Yuan", "Hang", "Fei", "Bei", "Jie", "Dong", "Gao", "Yao", "Xian", "Chu", "Qun", "Pa", "Shu", "Hua", "Xin", "Chou", "Zhu", "Chou", "Song", "Ban", "Song", "Ji", "Yue", "Jin", "Gou", "Ji", "Mao", "Pi", "Bi", "Wang", "Ang", "Fang", "Fen", "Yi", "Fu", "Nan", "Xi", "Hu", "Ya", "Dou", "Xun", "Zhen", "Yao", "Lin", "Rui", "E", "Mei", "Zhao", "Guo", "Zhi", "Cong", "Yun", "Waku", "Dou", "Shu", "Zao", null, "Li", "Haze", "Jian", "Cheng", "Matsu", "Qiang", "Feng", "Nan", "Xiao", "Xian", "Ku", "Ping", "Yi", "Xi", "Zhi", "Guai", "Xiao", "Jia", "Jia", "Gou", "Fu", "Mo", "Yi", "Ye", "Ye", "Shi", "Nie", "Bi", "Duo", "Yi", "Ling", "Bing", "Ni", "La", "He", "Pan", "Fan", "Zhong", "Dai", "Ci", "Yang", "Fu", "Bo", "Mou", "Gan", "Qi", "Ran", "Rou", "Mao", "Zhao", "Song", "Zhe", "Xia", "You", "Shen", "Ju", "Tuo", "Zuo", "Nan", "Ning", "Yong", "Di", "Zhi", "Zha", "Cha", "Dan", "Gu", "Pu", "Jiu", "Ao", "Fu", "Jian", "Bo", "Duo", "Ke", "Nai", "Zhu", "Bi", "Liu", "Chai", "Zha", "Si", "Zhu", "Pei", "Shi", "Guai", "Cha", "Yao", "Jue", "Jiu", "Shi"], Ke = ["Zhi", "Liu", "Mei", "Hoy", "Rong", "Zha", null, "Biao", "Zhan", "Jie", "Long", "Dong", "Lu", "Sayng", "Li", "Lan", "Yong", "Shu", "Xun", "Shuan", "Qi", "Zhen", "Qi", "Li", "Yi", "Xiang", "Zhen", "Li", "Su", "Gua", "Kan", "Bing", "Ren", "Xiao", "Bo", "Ren", "Bing", "Zi", "Chou", "Yi", "Jie", "Xu", "Zhu", "Jian", "Zui", "Er", "Er", "You", "Fa", "Gong", "Kao", "Lao", "Zhan", "Li", "Yin", "Yang", "He", "Gen", "Zhi", "Chi", "Ge", "Zai", "Luan", "Fu", "Jie", "Hang", "Gui", "Tao", "Guang", "Wei", "Kuang", "Ru", "An", "An", "Juan", "Yi", "Zhuo", "Ku", "Zhi", "Qiong", "Tong", "Sang", "Sang", "Huan", "Jie", "Jiu", "Xue", "Duo", "Zhui", "Yu", "Zan", "Kasei", "Ying", "Masu", null, "Zhan", "Ya", "Nao", "Zhen", "Dang", "Qi", "Qiao", "Hua", "Kuai", "Jiang", "Zhuang", "Xun", "Suo", "Sha", "Zhen", "Bei", "Ting", "Gua", "Jing", "Bo", "Ben", "Fu", "Rui", "Tong", "Jue", "Xi", "Lang", "Liu", "Feng", "Qi", "Wen", "Jun", "Gan", "Cu", "Liang", "Qiu", "Ting", "You", "Mei", "Bang", "Long", "Peng", "Zhuang", "Di", "Xuan", "Tu", "Zao", "Ao", "Gu", "Bi", "Di", "Han", "Zi", "Zhi", "Ren", "Bei", "Geng", "Jian", "Huan", "Wan", "Nuo", "Jia", "Tiao", "Ji", "Xiao", "Lu", "Huan", "Shao", "Cen", "Fen", "Song", "Meng", "Wu", "Li", "Li", "Dou", "Cen", "Ying", "Suo", "Ju", "Ti", "Jie", "Kun", "Zhuo", "Shu", "Chan", "Fan", "Wei", "Jing", "Li", "Bing", "Fumoto", "Shikimi", "Tao", "Zhi", "Lai", "Lian", "Jian", "Zhuo", "Ling", "Li", "Qi", "Bing", "Zhun", "Cong", "Qian", "Mian", "Qi", "Qi", "Cai", "Gun", "Chan", "Te", "Fei", "Pai", "Bang", "Pou", "Hun", "Zong", "Cheng", "Zao", "Ji", "Li", "Peng", "Yu", "Yu", "Gu", "Hun", "Dong", "Tang", "Gang", "Wang", "Di", "Xi", "Fan", "Cheng", "Zhan", "Qi", "Yuan", "Yan", "Yu", "Quan", "Yi", "Sen", "Ren", "Chui", "Leng", "Qi", "Zhuo", "Fu", "Ke", "Lai", "Zou", "Zou", "Zhuo", "Guan", "Fen", "Fen", "Chen", "Qiong", "Nie"], Ee = ["Wan", "Guo", "Lu", "Hao", "Jie", "Yi", "Chou", "Ju", "Ju", "Cheng", "Zuo", "Liang", "Qiang", "Zhi", "Zhui", "Ya", "Ju", "Bei", "Jiao", "Zhuo", "Zi", "Bin", "Peng", "Ding", "Chu", "Chang", "Kunugi", "Momiji", "Jian", "Gui", "Xi", "Du", "Qian", "Kunugi", "Soko", "Shide", "Luo", "Zhi", "Ken", "Myeng", "Tafu", null, "Peng", "Zhan", null, "Tuo", "Sen", "Duo", "Ye", "Fou", "Wei", "Wei", "Duan", "Jia", "Zong", "Jian", "Yi", "Shen", "Xi", "Yan", "Yan", "Chuan", "Zhan", "Chun", "Yu", "He", "Zha", "Wo", "Pian", "Bi", "Yao", "Huo", "Xu", "Ruo", "Yang", "La", "Yan", "Ben", "Hun", "Kui", "Jie", "Kui", "Si", "Feng", "Xie", "Tuo", "Zhi", "Jian", "Mu", "Mao", "Chu", "Hu", "Hu", "Lian", "Leng", "Ting", "Nan", "Yu", "You", "Mei", "Song", "Xuan", "Xuan", "Ying", "Zhen", "Pian", "Ye", "Ji", "Jie", "Ye", "Chu", "Shun", "Yu", "Cou", "Wei", "Mei", "Di", "Ji", "Jie", "Kai", "Qiu", "Ying", "Rou", "Heng", "Lou", "Le", "Hazou", "Katsura", "Pin", "Muro", "Gai", "Tan", "Lan", "Yun", "Yu", "Chen", "Lu", "Ju", "Sakaki", null, "Pi", "Xie", "Jia", "Yi", "Zhan", "Fu", "Nai", "Mi", "Lang", "Rong", "Gu", "Jian", "Ju", "Ta", "Yao", "Zhen", "Bang", "Sha", "Yuan", "Zi", "Ming", "Su", "Jia", "Yao", "Jie", "Huang", "Gan", "Fei", "Zha", "Qian", "Ma", "Sun", "Yuan", "Xie", "Rong", "Shi", "Zhi", "Cui", "Yun", "Ting", "Liu", "Rong", "Tang", "Que", "Zhai", "Si", "Sheng", "Ta", "Ke", "Xi", "Gu", "Qi", "Kao", "Gao", "Sun", "Pan", "Tao", "Ge", "Xun", "Dian", "Nou", "Ji", "Shuo", "Gou", "Chui", "Qiang", "Cha", "Qian", "Huai", "Mei", "Xu", "Gang", "Gao", "Zhuo", "Tuo", "Hashi", "Yang", "Dian", "Jia", "Jian", "Zui", "Kashi", "Ori", "Bin", "Zhu", null, "Xi", "Qi", "Lian", "Hui", "Yong", "Qian", "Guo", "Gai", "Gai", "Tuan", "Hua", "Cu", "Sen", "Cui", "Beng", "You", "Hu", "Jiang", "Hu", "Huan", "Kui", "Yi", "Nie", "Gao", "Kang", "Gui", "Gui", "Cao", "Man", "Jin"], We = ["Di", "Zhuang", "Le", "Lang", "Chen", "Cong", "Li", "Xiu", "Qing", "Shuang", "Fan", "Tong", "Guan", "Ji", "Suo", "Lei", "Lu", "Liang", "Mi", "Lou", "Chao", "Su", "Ke", "Shu", "Tang", "Biao", "Lu", "Jiu", "Shu", "Zha", "Shu", "Zhang", "Men", "Mo", "Niao", "Yang", "Tiao", "Peng", "Zhu", "Sha", "Xi", "Quan", "Heng", "Jian", "Cong", null, "Hokuso", "Qiang", "Tara", "Ying", "Er", "Xin", "Zhi", "Qiao", "Zui", "Cong", "Pu", "Shu", "Hua", "Kui", "Zhen", "Zun", "Yue", "Zhan", "Xi", "Xun", "Dian", "Fa", "Gan", "Mo", "Wu", "Qiao", "Nao", "Lin", "Liu", "Qiao", "Xian", "Run", "Fan", "Zhan", "Tuo", "Lao", "Yun", "Shun", "Tui", "Cheng", "Tang", "Meng", "Ju", "Cheng", "Su", "Jue", "Jue", "Tan", "Hui", "Ji", "Nuo", "Xiang", "Tuo", "Ning", "Rui", "Zhu", "Chuang", "Zeng", "Fen", "Qiong", "Ran", "Heng", "Cen", "Gu", "Liu", "Lao", "Gao", "Chu", "Zusa", "Nude", "Ca", "San", "Ji", "Dou", "Shou", "Lu", null, null, "Yuan", "Ta", "Shu", "Jiang", "Tan", "Lin", "Nong", "Yin", "Xi", "Sui", "Shan", "Zui", "Xuan", "Cheng", "Gan", "Ju", "Zui", "Yi", "Qin", "Pu", "Yan", "Lei", "Feng", "Hui", "Dang", "Ji", "Sui", "Bo", "Bi", "Ding", "Chu", "Zhua", "Kuai", "Ji", "Jie", "Jia", "Qing", "Zhe", "Jian", "Qiang", "Dao", "Yi", "Biao", "Song", "She", "Lin", "Kunugi", "Cha", "Meng", "Yin", "Tao", "Tai", "Mian", "Qi", "Toan", "Bin", "Huo", "Ji", "Qian", "Mi", "Ning", "Yi", "Gao", "Jian", "Yin", "Er", "Qing", "Yan", "Qi", "Mi", "Zhao", "Gui", "Chun", "Ji", "Kui", "Po", "Deng", "Chu", null, "Mian", "You", "Zhi", "Guang", "Qian", "Lei", "Lei", "Sa", "Lu", "Li", "Cuan", "Lu", "Mie", "Hui", "Ou", "Lu", "Jie", "Gao", "Du", "Yuan", "Li", "Fei", "Zhuo", "Sou", "Lian", "Tamo", "Chu", null, "Zhu", "Lu", "Yan", "Li", "Zhu", "Chen", "Jie", "E", "Su", "Huai", "Nie", "Yu", "Long", "Lai", null, "Xian", "Kwi", "Ju", "Xiao", "Ling", "Ying", "Jian", "Yin", "You", "Ying"], Re = ["Xiang", "Nong", "Bo", "Chan", "Lan", "Ju", "Shuang", "She", "Wei", "Cong", "Quan", "Qu", "Cang", null, "Yu", "Luo", "Li", "Zan", "Luan", "Dang", "Jue", "Em", "Lan", "Lan", "Zhu", "Lei", "Li", "Ba", "Nang", "Yu", "Ling", "Tsuki", "Qian", "Ci", "Huan", "Xin", "Yu", "Yu", "Qian", "Ou", "Xu", "Chao", "Chu", "Chi", "Kai", "Yi", "Jue", "Xi", "Xu", "Xia", "Yu", "Kuai", "Lang", "Kuan", "Shuo", "Xi", "Ai", "Yi", "Qi", "Hu", "Chi", "Qin", "Kuan", "Kan", "Kuan", "Kan", "Chuan", "Sha", "Gua", "Yin", "Xin", "Xie", "Yu", "Qian", "Xiao", "Yi", "Ge", "Wu", "Tan", "Jin", "Ou", "Hu", "Ti", "Huan", "Xu", "Pen", "Xi", "Xiao", "Xu", "Xi", "Sen", "Lian", "Chu", "Yi", "Kan", "Yu", "Chuo", "Huan", "Zhi", "Zheng", "Ci", "Bu", "Wu", "Qi", "Bu", "Bu", "Wai", "Ju", "Qian", "Chi", "Se", "Chi", "Se", "Zhong", "Sui", "Sui", "Li", "Cuo", "Yu", "Li", "Gui", "Dai", "Dai", "Si", "Jian", "Zhe", "Mo", "Mo", "Yao", "Mo", "Cu", "Yang", "Tian", "Sheng", "Dai", "Shang", "Xu", "Xun", "Shu", "Can", "Jue", "Piao", "Qia", "Qiu", "Su", "Qing", "Yun", "Lian", "Yi", "Fou", "Zhi", "Ye", "Can", "Hun", "Dan", "Ji", "Ye", "Zhen", "Yun", "Wen", "Chou", "Bin", "Ti", "Jin", "Shang", "Yin", "Diao", "Cu", "Hui", "Cuan", "Yi", "Dan", "Du", "Jiang", "Lian", "Bin", "Du", "Tsukusu", "Jian", "Shu", "Ou", "Duan", "Zhu", "Yin", "Qing", "Yi", "Sha", "Que", "Ke", "Yao", "Jun", "Dian", "Hui", "Hui", "Gu", "Que", "Ji", "Yi", "Ou", "Hui", "Duan", "Yi", "Xiao", "Wu", "Guan", "Mu", "Mei", "Mei", "Ai", "Zuo", "Du", "Yu", "Bi", "Bi", "Bi", "Pi", "Pi", "Bi", "Chan", "Mao", null, null, "Pu", "Mushiru", "Jia", "Zhan", "Sai", "Mu", "Tuo", "Xun", "Er", "Rong", "Xian", "Ju", "Mu", "Hao", "Qiu", "Dou", "Mushiru", "Tan", "Pei", "Ju", "Duo", "Cui", "Bi", "San", null, "Mao", "Sui", "Yu", "Yu", "Tuo", "He", "Jian", "Ta", "San"], Ae = ["Lu", "Mu", "Li", "Tong", "Rong", "Chang", "Pu", "Luo", "Zhan", "Sao", "Zhan", "Meng", "Luo", "Qu", "Die", "Shi", "Di", "Min", "Jue", "Mang", "Qi", "Pie", "Nai", "Qi", "Dao", "Xian", "Chuan", "Fen", "Ri", "Nei", null, "Fu", "Shen", "Dong", "Qing", "Qi", "Yin", "Xi", "Hai", "Yang", "An", "Ya", "Ke", "Qing", "Ya", "Dong", "Dan", "Lu", "Qing", "Yang", "Yun", "Yun", "Shui", "San", "Zheng", "Bing", "Yong", "Dang", "Shitamizu", "Le", "Ni", "Tun", "Fan", "Gui", "Ting", "Zhi", "Qiu", "Bin", "Ze", "Mian", "Cuan", "Hui", "Diao", "Han", "Cha", "Zhuo", "Chuan", "Wan", "Fan", "Dai", "Xi", "Tuo", "Mang", "Qiu", "Qi", "Shan", "Pai", "Han", "Qian", "Wu", "Wu", "Xun", "Si", "Ru", "Gong", "Jiang", "Chi", "Wu", "Tsuchi", null, "Tang", "Zhi", "Chi", "Qian", "Mi", "Yu", "Wang", "Qing", "Jing", "Rui", "Jun", "Hong", "Tai", "Quan", "Ji", "Bian", "Bian", "Gan", "Wen", "Zhong", "Fang", "Xiong", "Jue", "Hang", "Niou", "Qi", "Fen", "Xu", "Xu", "Qin", "Yi", "Wo", "Yun", "Yuan", "Hang", "Yan", "Shen", "Chen", "Dan", "You", "Dun", "Hu", "Huo", "Qie", "Mu", "Rou", "Mei", "Ta", "Mian", "Wu", "Chong", "Tian", "Bi", "Sha", "Zhi", "Pei", "Pan", "Zhui", "Za", "Gou", "Liu", "Mei", "Ze", "Feng", "Ou", "Li", "Lun", "Cang", "Feng", "Wei", "Hu", "Mo", "Mei", "Shu", "Ju", "Zan", "Tuo", "Tuo", "Tuo", "He", "Li", "Mi", "Yi", "Fa", "Fei", "You", "Tian", "Zhi", "Zhao", "Gu", "Zhan", "Yan", "Si", "Kuang", "Jiong", "Ju", "Xie", "Qiu", "Yi", "Jia", "Zhong", "Quan", "Bo", "Hui", "Mi", "Ben", "Zhuo", "Chu", "Le", "You", "Gu", "Hong", "Gan", "Fa", "Mao", "Si", "Hu", "Ping", "Ci", "Fan", "Chi", "Su", "Ning", "Cheng", "Ling", "Pao", "Bo", "Qi", "Si", "Ni", "Ju", "Yue", "Zhu", "Sheng", "Lei", "Xuan", "Xue", "Fu", "Pan", "Min", "Tai", "Yang", "Ji", "Yong", "Guan", "Beng", "Xue", "Long", "Lu", null, "Bo", "Xie", "Po", "Ze", "Jing", "Yin"], ze = ["Zhou", "Ji", "Yi", "Hui", "Hui", "Zui", "Cheng", "Yin", "Wei", "Hou", "Jian", "Yang", "Lie", "Si", "Ji", "Er", "Xing", "Fu", "Sa", "Suo", "Zhi", "Yin", "Wu", "Xi", "Kao", "Zhu", "Jiang", "Luo", null, "An", "Dong", "Yi", "Mou", "Lei", "Yi", "Mi", "Quan", "Jin", "Mo", "Wei", "Xiao", "Xie", "Hong", "Xu", "Shuo", "Kuang", "Tao", "Qie", "Ju", "Er", "Zhou", "Ru", "Ping", "Xun", "Xiong", "Zhi", "Guang", "Huan", "Ming", "Huo", "Wa", "Qia", "Pai", "Wu", "Qu", "Liu", "Yi", "Jia", "Jing", "Qian", "Jiang", "Jiao", "Cheng", "Shi", "Zhuo", "Ce", "Pal", "Kuai", "Ji", "Liu", "Chan", "Hun", "Hu", "Nong", "Xun", "Jin", "Lie", "Qiu", "Wei", "Zhe", "Jun", "Han", "Bang", "Mang", "Zhuo", "You", "Xi", "Bo", "Dou", "Wan", "Hong", "Yi", "Pu", "Ying", "Lan", "Hao", "Lang", "Han", "Li", "Geng", "Fu", "Wu", "Lian", "Chun", "Feng", "Yi", "Yu", "Tong", "Lao", "Hai", "Jin", "Jia", "Chong", "Weng", "Mei", "Sui", "Cheng", "Pei", "Xian", "Shen", "Tu", "Kun", "Pin", "Nie", "Han", "Jing", "Xiao", "She", "Nian", "Tu", "Yong", "Xiao", "Xian", "Ting", "E", "Su", "Tun", "Juan", "Cen", "Ti", "Li", "Shui", "Si", "Lei", "Shui", "Tao", "Du", "Lao", "Lai", "Lian", "Wei", "Wo", "Yun", "Huan", "Di", null, "Run", "Jian", "Zhang", "Se", "Fu", "Guan", "Xing", "Shou", "Shuan", "Ya", "Chuo", "Zhang", "Ye", "Kong", "Wo", "Han", "Tuo", "Dong", "He", "Wo", "Ju", "Gan", "Liang", "Hun", "Ta", "Zhuo", "Dian", "Qie", "De", "Juan", "Zi", "Xi", "Yao", "Qi", "Gu", "Guo", "Han", "Lin", "Tang", "Zhou", "Peng", "Hao", "Chang", "Shu", "Qi", "Fang", "Chi", "Lu", "Nao", "Ju", "Tao", "Cong", "Lei", "Zhi", "Peng", "Fei", "Song", "Tian", "Pi", "Dan", "Yu", "Ni", "Yu", "Lu", "Gan", "Mi", "Jing", "Ling", "Lun", "Yin", "Cui", "Qu", "Huai", "Yu", "Nian", "Shen", "Piao", "Chun", "Wa", "Yuan", "Lai", "Hun", "Qing", "Yan", "Qian", "Tian", "Miao", "Zhi", "Yin", "Mi"], Oe = ["Ben", "Yuan", "Wen", "Re", "Fei", "Qing", "Yuan", "Ke", "Ji", "She", "Yuan", "Shibui", "Lu", "Zi", "Du", null, "Jian", "Min", "Pi", "Tani", "Yu", "Yuan", "Shen", "Shen", "Rou", "Huan", "Zhu", "Jian", "Nuan", "Yu", "Qiu", "Ting", "Qu", "Du", "Feng", "Zha", "Bo", "Wo", "Wo", "Di", "Wei", "Wen", "Ru", "Xie", "Ce", "Wei", "Ge", "Gang", "Yan", "Hong", "Xuan", "Mi", "Ke", "Mao", "Ying", "Yan", "You", "Hong", "Miao", "Xing", "Mei", "Zai", "Hun", "Nai", "Kui", "Shi", "E", "Pai", "Mei", "Lian", "Qi", "Qi", "Mei", "Tian", "Cou", "Wei", "Can", "Tuan", "Mian", "Hui", "Mo", "Xu", "Ji", "Pen", "Jian", "Jian", "Hu", "Feng", "Xiang", "Yi", "Yin", "Zhan", "Shi", "Jie", "Cheng", "Huang", "Tan", "Yu", "Bi", "Min", "Shi", "Tu", "Sheng", "Yong", "Qu", "Zhong", "Suei", "Jiu", "Jiao", "Qiou", "Yin", "Tang", "Long", "Huo", "Yuan", "Nan", "Ban", "You", "Quan", "Chui", "Liang", "Chan", "Yan", "Chun", "Nie", "Zi", "Wan", "Shi", "Man", "Ying", "Ratsu", "Kui", null, "Jian", "Xu", "Lu", "Gui", "Gai", null, null, "Po", "Jin", "Gui", "Tang", "Yuan", "Suo", "Yuan", "Lian", "Yao", "Meng", "Zhun", "Sheng", "Ke", "Tai", "Da", "Wa", "Liu", "Gou", "Sao", "Ming", "Zha", "Shi", "Yi", "Lun", "Ma", "Pu", "Wei", "Li", "Cai", "Wu", "Xi", "Wen", "Qiang", "Ze", "Shi", "Su", "Yi", "Zhen", "Sou", "Yun", "Xiu", "Yin", "Rong", "Hun", "Su", "Su", "Ni", "Ta", "Shi", "Ru", "Wei", "Pan", "Chu", "Chu", "Pang", "Weng", "Cang", "Mie", "He", "Dian", "Hao", "Huang", "Xi", "Zi", "Di", "Zhi", "Ying", "Fu", "Jie", "Hua", "Ge", "Zi", "Tao", "Teng", "Sui", "Bi", "Jiao", "Hui", "Gun", "Yin", "Gao", "Long", "Zhi", "Yan", "She", "Man", "Ying", "Chun", "Lu", "Lan", "Luan", null, "Bin", "Tan", "Yu", "Sou", "Hu", "Bi", "Biao", "Zhi", "Jiang", "Kou", "Shen", "Shang", "Di", "Mi", "Ao", "Lu", "Hu", "Hu", "You", "Chan", "Fan", "Yong", "Gun", "Man"], je = ["Qing", "Yu", "Piao", "Ji", "Ya", "Jiao", "Qi", "Xi", "Ji", "Lu", "Lu", "Long", "Jin", "Guo", "Cong", "Lou", "Zhi", "Gai", "Qiang", "Li", "Yan", "Cao", "Jiao", "Cong", "Qun", "Tuan", "Ou", "Teng", "Ye", "Xi", "Mi", "Tang", "Mo", "Shang", "Han", "Lian", "Lan", "Wa", "Li", "Qian", "Feng", "Xuan", "Yi", "Man", "Zi", "Mang", "Kang", "Lei", "Peng", "Shu", "Zhang", "Zhang", "Chong", "Xu", "Huan", "Kuo", "Jian", "Yan", "Chuang", "Liao", "Cui", "Ti", "Yang", "Jiang", "Cong", "Ying", "Hong", "Xun", "Shu", "Guan", "Ying", "Xiao", null, null, "Xu", "Lian", "Zhi", "Wei", "Pi", "Jue", "Jiao", "Po", "Dang", "Hui", "Jie", "Wu", "Pa", "Ji", "Pan", "Gui", "Xiao", "Qian", "Qian", "Xi", "Lu", "Xi", "Xuan", "Dun", "Huang", "Min", "Run", "Su", "Liao", "Zhen", "Zhong", "Yi", "Di", "Wan", "Dan", "Tan", "Chao", "Xun", "Kui", "Yie", "Shao", "Tu", "Zhu", "San", "Hei", "Bi", "Shan", "Chan", "Chan", "Shu", "Tong", "Pu", "Lin", "Wei", "Se", "Se", "Cheng", "Jiong", "Cheng", "Hua", "Jiao", "Lao", "Che", "Gan", "Cun", "Heng", "Si", "Shu", "Peng", "Han", "Yun", "Liu", "Hong", "Fu", "Hao", "He", "Xian", "Jian", "Shan", "Xi", "Oki", null, "Lan", null, "Yu", "Lin", "Min", "Zao", "Dang", "Wan", "Ze", "Xie", "Yu", "Li", "Shi", "Xue", "Ling", "Man", "Zi", "Yong", "Kuai", "Can", "Lian", "Dian", "Ye", "Ao", "Huan", "Zhen", "Chan", "Man", "Dan", "Dan", "Yi", "Sui", "Pi", "Ju", "Ta", "Qin", "Ji", "Zhuo", "Lian", "Nong", "Guo", "Jin", "Fen", "Se", "Ji", "Sui", "Hui", "Chu", "Ta", "Song", "Ding", null, "Zhu", "Lai", "Bin", "Lian", "Mi", "Shi", "Shu", "Mi", "Ning", "Ying", "Ying", "Meng", "Jin", "Qi", "Pi", "Ji", "Hao", "Ru", "Zui", "Wo", "Tao", "Yin", "Yin", "Dui", "Ci", "Huo", "Jing", "Lan", "Jun", "Ai", "Pu", "Zhuo", "Wei", "Bin", "Gu", "Qian", "Xing", "Hama", "Kuo", "Fei", null, "Boku", "Jian", "Wei", "Luo", "Zan", "Lu", "Li"], Ie = ["You", "Yang", "Lu", "Si", "Jie", "Ying", "Du", "Wang", "Hui", "Xie", "Pan", "Shen", "Biao", "Chan", "Mo", "Liu", "Jian", "Pu", "Se", "Cheng", "Gu", "Bin", "Huo", "Xian", "Lu", "Qin", "Han", "Ying", "Yong", "Li", "Jing", "Xiao", "Ying", "Sui", "Wei", "Xie", "Huai", "Hao", "Zhu", "Long", "Lai", "Dui", "Fan", "Hu", "Lai", null, null, "Ying", "Mi", "Ji", "Lian", "Jian", "Ying", "Fen", "Lin", "Yi", "Jian", "Yue", "Chan", "Dai", "Rang", "Jian", "Lan", "Fan", "Shuang", "Yuan", "Zhuo", "Feng", "She", "Lei", "Lan", "Cong", "Qu", "Yong", "Qian", "Fa", "Guan", "Que", "Yan", "Hao", "Hyeng", "Sa", "Zan", "Luan", "Yan", "Li", "Mi", "Shan", "Tan", "Dang", "Jiao", "Chan", null, "Hao", "Ba", "Zhu", "Lan", "Lan", "Nang", "Wan", "Luan", "Xun", "Xian", "Yan", "Gan", "Yan", "Yu", "Huo", "Si", "Mie", "Guang", "Deng", "Hui", "Xiao", "Xiao", "Hu", "Hong", "Ling", "Zao", "Zhuan", "Jiu", "Zha", "Xie", "Chi", "Zhuo", "Zai", "Zai", "Can", "Yang", "Qi", "Zhong", "Fen", "Niu", "Jiong", "Wen", "Po", "Yi", "Lu", "Chui", "Pi", "Kai", "Pan", "Yan", "Kai", "Pang", "Mu", "Chao", "Liao", "Gui", "Kang", "Tun", "Guang", "Xin", "Zhi", "Guang", "Guang", "Wei", "Qiang", null, "Da", "Xia", "Zheng", "Zhu", "Ke", "Zhao", "Fu", "Ba", "Duo", "Duo", "Ling", "Zhuo", "Xuan", "Ju", "Tan", "Pao", "Jiong", "Pao", "Tai", "Tai", "Bing", "Yang", "Tong", "Han", "Zhu", "Zha", "Dian", "Wei", "Shi", "Lian", "Chi", "Huang", null, "Hu", "Shuo", "Lan", "Jing", "Jiao", "Xu", "Xing", "Quan", "Lie", "Huan", "Yang", "Xiao", "Xiu", "Xian", "Yin", "Wu", "Zhou", "Yao", "Shi", "Wei", "Tong", "Xue", "Zai", "Kai", "Hong", "Luo", "Xia", "Zhu", "Xuan", "Zheng", "Po", "Yan", "Hui", "Guang", "Zhe", "Hui", "Kao", null, "Fan", "Shao", "Ye", "Hui", null, "Tang", "Jin", "Re", null, "Xi", "Fu", "Jiong", "Che", "Pu", "Jing", "Zhuo", "Ting", "Wan", "Hai", "Peng", "Lang", "Shan", "Hu", "Feng", "Chi", "Rong"], Ue = ["Hu", "Xi", "Shu", "He", "Xun", "Ku", "Jue", "Xiao", "Xi", "Yan", "Han", "Zhuang", "Jun", "Di", "Xie", "Ji", "Wu", null, null, "Han", "Yan", "Huan", "Men", "Ju", "Chou", "Bei", "Fen", "Lin", "Kun", "Hun", "Tun", "Xi", "Cui", "Wu", "Hong", "Ju", "Fu", "Wo", "Jiao", "Cong", "Feng", "Ping", "Qiong", "Ruo", "Xi", "Qiong", "Xin", "Zhuo", "Yan", "Yan", "Yi", "Jue", "Yu", "Gang", "Ran", "Pi", "Gu", null, "Sheng", "Chang", "Shao", null, null, null, null, "Chen", "He", "Kui", "Zhong", "Duan", "Xia", "Hui", "Feng", "Lian", "Xuan", "Xing", "Huang", "Jiao", "Jian", "Bi", "Ying", "Zhu", "Wei", "Tuan", "Tian", "Xi", "Nuan", "Nuan", "Chan", "Yan", "Jiong", "Jiong", "Yu", "Mei", "Sha", "Wei", "Ye", "Xin", "Qiong", "Rou", "Mei", "Huan", "Xu", "Zhao", "Wei", "Fan", "Qiu", "Sui", "Yang", "Lie", "Zhu", "Jie", "Gao", "Gua", "Bao", "Hu", "Yun", "Xia", null, null, "Bian", "Gou", "Tui", "Tang", "Chao", "Shan", "N", "Bo", "Huang", "Xie", "Xi", "Wu", "Xi", "Yun", "He", "He", "Xi", "Yun", "Xiong", "Nai", "Shan", "Qiong", "Yao", "Xun", "Mi", "Lian", "Ying", "Wen", "Rong", "Oozutsu", null, "Qiang", "Liu", "Xi", "Bi", "Biao", "Zong", "Lu", "Jian", "Shou", "Yi", "Lou", "Feng", "Sui", "Yi", "Tong", "Jue", "Zong", "Yun", "Hu", "Yi", "Zhi", "Ao", "Wei", "Liao", "Han", "Ou", "Re", "Jiong", "Man", null, "Shang", "Cuan", "Zeng", "Jian", "Xi", "Xi", "Xi", "Yi", "Xiao", "Chi", "Huang", "Chan", "Ye", "Qian", "Ran", "Yan", "Xian", "Qiao", "Zun", "Deng", "Dun", "Shen", "Jiao", "Fen", "Si", "Liao", "Yu", "Lin", "Tong", "Shao", "Fen", "Fan", "Yan", "Xun", "Lan", "Mei", "Tang", "Yi", "Jing", "Men", null, null, "Ying", "Yu", "Yi", "Xue", "Lan", "Tai", "Zao", "Can", "Sui", "Xi", "Que", "Cong", "Lian", "Hui", "Zhu", "Xie", "Ling", "Wei", "Yi", "Xie", "Zhao", "Hui", "Tatsu", "Nung", "Lan", "Ru", "Xian", "Kao", "Xun", "Jin", "Chou", "Chou", "Yao"], $e = ["He", "Lan", "Biao", "Rong", "Li", "Mo", "Bao", "Ruo", "Lu", "La", "Ao", "Xun", "Kuang", "Shuo", null, "Li", "Lu", "Jue", "Liao", "Yan", "Xi", "Xie", "Long", "Ye", null, "Rang", "Yue", "Lan", "Cong", "Jue", "Tong", "Guan", null, "Che", "Mi", "Tang", "Lan", "Zhu", null, "Ling", "Cuan", "Yu", "Zhua", "Tsumekanmuri", "Pa", "Zheng", "Pao", "Cheng", "Yuan", "Ai", "Wei", null, "Jue", "Jue", "Fu", "Ye", "Ba", "Die", "Ye", "Yao", "Zu", "Shuang", "Er", "Qiang", "Chuang", "Ge", "Zang", "Die", "Qiang", "Yong", "Qiang", "Pian", "Ban", "Pan", "Shao", "Jian", "Pai", "Du", "Chuang", "Tou", "Zha", "Bian", "Die", "Bang", "Bo", "Chuang", "You", null, "Du", "Ya", "Cheng", "Niu", "Ushihen", "Pin", "Jiu", "Mou", "Tuo", "Mu", "Lao", "Ren", "Mang", "Fang", "Mao", "Mu", "Gang", "Wu", "Yan", "Ge", "Bei", "Si", "Jian", "Gu", "You", "Ge", "Sheng", "Mu", "Di", "Qian", "Quan", "Quan", "Zi", "Te", "Xi", "Mang", "Keng", "Qian", "Wu", "Gu", "Xi", "Li", "Li", "Pou", "Ji", "Gang", "Zhi", "Ben", "Quan", "Run", "Du", "Ju", "Jia", "Jian", "Feng", "Pian", "Ke", "Ju", "Kao", "Chu", "Xi", "Bei", "Luo", "Jie", "Ma", "San", "Wei", "Li", "Dun", "Tong", null, "Jiang", "Ikenie", "Li", "Du", "Lie", "Pi", "Piao", "Bao", "Xi", "Chou", "Wei", "Kui", "Chou", "Quan", "Fan", "Ba", "Fan", "Qiu", "Ji", "Cai", "Chuo", "An", "Jie", "Zhuang", "Guang", "Ma", "You", "Kang", "Bo", "Hou", "Ya", "Yin", "Huan", "Zhuang", "Yun", "Kuang", "Niu", "Di", "Qing", "Zhong", "Mu", "Bei", "Pi", "Ju", "Ni", "Sheng", "Pao", "Xia", "Tuo", "Hu", "Ling", "Fei", "Pi", "Ni", "Ao", "You", "Gou", "Yue", "Ju", "Dan", "Po", "Gu", "Xian", "Ning", "Huan", "Hen", "Jiao", "He", "Zhao", "Ji", "Xun", "Shan", "Ta", "Rong", "Shou", "Tong", "Lao", "Du", "Xia", "Shi", "Hua", "Zheng", "Yu", "Sun", "Yu", "Bi", "Mang", "Xi", "Juan", "Li", "Xia", "Yin", "Suan", "Lang", "Bei", "Zhi", "Yan"], qe = ["Sha", "Li", "Han", "Xian", "Jing", "Pai", "Fei", "Yao", "Ba", "Qi", "Ni", "Biao", "Yin", "Lai", "Xi", "Jian", "Qiang", "Kun", "Yan", "Guo", "Zong", "Mi", "Chang", "Yi", "Zhi", "Zheng", "Ya", "Meng", "Cai", "Cu", "She", "Kari", "Cen", "Luo", "Hu", "Zong", "Ji", "Wei", "Feng", "Wo", "Yuan", "Xing", "Zhu", "Mao", "Wei", "Yuan", "Xian", "Tuan", "Ya", "Nao", "Xie", "Jia", "Hou", "Bian", "You", "You", "Mei", "Zha", "Yao", "Sun", "Bo", "Ming", "Hua", "Yuan", "Sou", "Ma", "Yuan", "Dai", "Yu", "Shi", "Hao", null, "Yi", "Zhen", "Chuang", "Hao", "Man", "Jing", "Jiang", "Mu", "Zhang", "Chan", "Ao", "Ao", "Hao", "Cui", "Fen", "Jue", "Bi", "Bi", "Huang", "Pu", "Lin", "Yu", "Tong", "Yao", "Liao", "Shuo", "Xiao", "Swu", "Ton", "Xi", "Ge", "Juan", "Du", "Hui", "Kuai", "Xian", "Xie", "Ta", "Xian", "Xun", "Ning", "Pin", "Huo", "Nou", "Meng", "Lie", "Nao", "Guang", "Shou", "Lu", "Ta", "Xian", "Mi", "Rang", "Huan", "Nao", "Luo", "Xian", "Qi", "Jue", "Xuan", "Miao", "Zi", "Lu", "Lu", "Yu", "Su", "Wang", "Qiu", "Ga", "Ding", "Le", "Ba", "Ji", "Hong", "Di", "Quan", "Gan", "Jiu", "Yu", "Ji", "Yu", "Yang", "Ma", "Gong", "Wu", "Fu", "Wen", "Jie", "Ya", "Fen", "Bian", "Beng", "Yue", "Jue", "Yun", "Jue", "Wan", "Jian", "Mei", "Dan", "Pi", "Wei", "Huan", "Xian", "Qiang", "Ling", "Dai", "Yi", "An", "Ping", "Dian", "Fu", "Xuan", "Xi", "Bo", "Ci", "Gou", "Jia", "Shao", "Po", "Ci", "Ke", "Ran", "Sheng", "Shen", "Yi", "Zu", "Jia", "Min", "Shan", "Liu", "Bi", "Zhen", "Zhen", "Jue", "Fa", "Long", "Jin", "Jiao", "Jian", "Li", "Guang", "Xian", "Zhou", "Gong", "Yan", "Xiu", "Yang", "Xu", "Luo", "Su", "Zhu", "Qin", "Ken", "Xun", "Bao", "Er", "Xiang", "Yao", "Xia", "Heng", "Gui", "Chong", "Xu", "Ban", "Pei", null, "Dang", "Ei", "Hun", "Wen", "E", "Cheng", "Ti", "Wu", "Wu", "Cheng", "Jun", "Mei", "Bei", "Ting", "Xian", "Chuo"], Ve = ["Han", "Xuan", "Yan", "Qiu", "Quan", "Lang", "Li", "Xiu", "Fu", "Liu", "Ye", "Xi", "Ling", "Li", "Jin", "Lian", "Suo", "Chiisai", null, "Wan", "Dian", "Pin", "Zhan", "Cui", "Min", "Yu", "Ju", "Chen", "Lai", "Wen", "Sheng", "Wei", "Dian", "Chu", "Zhuo", "Pei", "Cheng", "Hu", "Qi", "E", "Kun", "Chang", "Qi", "Beng", "Wan", "Lu", "Cong", "Guan", "Yan", "Diao", "Bei", "Lin", "Qin", "Pi", "Pa", "Que", "Zhuo", "Qin", "Fa", null, "Qiong", "Du", "Jie", "Hun", "Yu", "Mao", "Mei", "Chun", "Xuan", "Ti", "Xing", "Dai", "Rou", "Min", "Zhen", "Wei", "Ruan", "Huan", "Jie", "Chuan", "Jian", "Zhuan", "Yang", "Lian", "Quan", "Xia", "Duan", "Yuan", "Ye", "Nao", "Hu", "Ying", "Yu", "Huang", "Rui", "Se", "Liu", "Shi", "Rong", "Suo", "Yao", "Wen", "Wu", "Jin", "Jin", "Ying", "Ma", "Tao", "Liu", "Tang", "Li", "Lang", "Gui", "Zhen", "Qiang", "Cuo", "Jue", "Zhao", "Yao", "Ai", "Bin", "Tu", "Chang", "Kun", "Zhuan", "Cong", "Jin", "Yi", "Cui", "Cong", "Qi", "Li", "Ying", "Suo", "Qiu", "Xuan", "Ao", "Lian", "Man", "Zhang", "Yin", null, "Ying", "Zhi", "Lu", "Wu", "Deng", "Xiou", "Zeng", "Xun", "Qu", "Dang", "Lin", "Liao", "Qiong", "Su", "Huang", "Gui", "Pu", "Jing", "Fan", "Jin", "Liu", "Ji", null, "Jing", "Ai", "Bi", "Can", "Qu", "Zao", "Dang", "Jiao", "Gun", "Tan", "Hui", "Huan", "Se", "Sui", "Tian", null, "Yu", "Jin", "Lu", "Bin", "Shou", "Wen", "Zui", "Lan", "Xi", "Ji", "Xuan", "Ruan", "Huo", "Gai", "Lei", "Du", "Li", "Zhi", "Rou", "Li", "Zan", "Qiong", "Zhe", "Gui", "Sui", "La", "Long", "Lu", "Li", "Zan", "Lan", "Ying", "Mi", "Xiang", "Xi", "Guan", "Dao", "Zan", "Huan", "Gua", "Bo", "Die", "Bao", "Hu", "Zhi", "Piao", "Ban", "Rang", "Li", "Wa", "Dekaguramu", "Jiang", "Qian", "Fan", "Pen", "Fang", "Dan", "Weng", "Ou", "Deshiguramu", "Miriguramu", "Thon", "Hu", "Ling", "Yi", "Ping", "Ci", "Hekutogura", "Juan", "Chang", "Chi", "Sarake", "Dang", "Meng", "Pou"], no = ["Zhui", "Ping", "Bian", "Zhou", "Zhen", "Senchigura", "Ci", "Ying", "Qi", "Xian", "Lou", "Di", "Ou", "Meng", "Zhuan", "Peng", "Lin", "Zeng", "Wu", "Pi", "Dan", "Weng", "Ying", "Yan", "Gan", "Dai", "Shen", "Tian", "Tian", "Han", "Chang", "Sheng", "Qing", "Sheng", "Chan", "Chan", "Rui", "Sheng", "Su", "Sen", "Yong", "Shuai", "Lu", "Fu", "Yong", "Beng", "Feng", "Ning", "Tian", "You", "Jia", "Shen", "Zha", "Dian", "Fu", "Nan", "Dian", "Ping", "Ting", "Hua", "Ting", "Quan", "Zi", "Meng", "Bi", "Qi", "Liu", "Xun", "Liu", "Chang", "Mu", "Yun", "Fan", "Fu", "Geng", "Tian", "Jie", "Jie", "Quan", "Wei", "Fu", "Tian", "Mu", "Tap", "Pan", "Jiang", "Wa", "Da", "Nan", "Liu", "Ben", "Zhen", "Chu", "Mu", "Mu", "Ce", "Cen", "Gai", "Bi", "Da", "Zhi", "Lue", "Qi", "Lue", "Pan", "Kesa", "Fan", "Hua", "Yu", "Yu", "Mu", "Jun", "Yi", "Liu", "Yu", "Die", "Chou", "Hua", "Dang", "Chuo", "Ji", "Wan", "Jiang", "Sheng", "Chang", "Tuan", "Lei", "Ji", "Cha", "Liu", "Tatamu", "Tuan", "Lin", "Jiang", "Jiang", "Chou", "Bo", "Die", "Die", "Pi", "Nie", "Dan", "Shu", "Shu", "Zhi", "Yi", "Chuang", "Nai", "Ding", "Bi", "Jie", "Liao", "Gong", "Ge", "Jiu", "Zhou", "Xia", "Shan", "Xu", "Nue", "Li", "Yang", "Chen", "You", "Ba", "Jie", "Jue", "Zhi", "Xia", "Cui", "Bi", "Yi", "Li", "Zong", "Chuang", "Feng", "Zhu", "Pao", "Pi", "Gan", "Ke", "Ci", "Xie", "Qi", "Dan", "Zhen", "Fa", "Zhi", "Teng", "Ju", "Ji", "Fei", "Qu", "Dian", "Jia", "Xian", "Cha", "Bing", "Ni", "Zheng", "Yong", "Jing", "Quan", "Chong", "Tong", "Yi", "Kai", "Wei", "Hui", "Duo", "Yang", "Chi", "Zhi", "Hen", "Ya", "Mei", "Dou", "Jing", "Xiao", "Tong", "Tu", "Mang", "Pi", "Xiao", "Suan", "Pu", "Li", "Zhi", "Cuo", "Duo", "Wu", "Sha", "Lao", "Shou", "Huan", "Xian", "Yi", "Peng", "Zhang", "Guan", "Tan", "Fei", "Ma", "Lin", "Chi", "Ji", "Dian", "An", "Chi", "Bi", "Bei", "Min", "Gu", "Dui", "E", "Wei"], io = ["Yu", "Cui", "Ya", "Zhu", "Cu", "Dan", "Shen", "Zhung", "Ji", "Yu", "Hou", "Feng", "La", "Yang", "Shen", "Tu", "Yu", "Gua", "Wen", "Huan", "Ku", "Jia", "Yin", "Yi", "Lu", "Sao", "Jue", "Chi", "Xi", "Guan", "Yi", "Wen", "Ji", "Chuang", "Ban", "Lei", "Liu", "Chai", "Shou", "Nue", "Dian", "Da", "Pie", "Tan", "Zhang", "Biao", "Shen", "Cu", "Luo", "Yi", "Zong", "Chou", "Zhang", "Zhai", "Sou", "Suo", "Que", "Diao", "Lou", "Lu", "Mo", "Jin", "Yin", "Ying", "Huang", "Fu", "Liao", "Long", "Qiao", "Liu", "Lao", "Xian", "Fei", "Dan", "Yin", "He", "Ai", "Ban", "Xian", "Guan", "Guai", "Nong", "Yu", "Wei", "Yi", "Yong", "Pi", "Lei", "Li", "Shu", "Dan", "Lin", "Dian", "Lin", "Lai", "Pie", "Ji", "Chi", "Yang", "Xian", "Jie", "Zheng", null, "Li", "Huo", "Lai", "Shaku", "Dian", "Xian", "Ying", "Yin", "Qu", "Yong", "Tan", "Dian", "Luo", "Luan", "Luan", "Bo", null, "Gui", "Po", "Fa", "Deng", "Fa", "Bai", "Bai", "Qie", "Bi", "Zao", "Zao", "Mao", "De", "Pa", "Jie", "Huang", "Gui", "Ci", "Ling", "Gao", "Mo", "Ji", "Jiao", "Peng", "Gao", "Ai", "E", "Hao", "Han", "Bi", "Wan", "Chou", "Qian", "Xi", "Ai", "Jiong", "Hao", "Huang", "Hao", "Ze", "Cui", "Hao", "Xiao", "Ye", "Po", "Hao", "Jiao", "Ai", "Xing", "Huang", "Li", "Piao", "He", "Jiao", "Pi", "Gan", "Pao", "Zhou", "Jun", "Qiu", "Cun", "Que", "Zha", "Gu", "Jun", "Jun", "Zhou", "Zha", "Gu", "Zhan", "Du", "Min", "Qi", "Ying", "Yu", "Bei", "Zhao", "Zhong", "Pen", "He", "Ying", "He", "Yi", "Bo", "Wan", "He", "Ang", "Zhan", "Yan", "Jian", "He", "Yu", "Kui", "Fan", "Gai", "Dao", "Pan", "Fu", "Qiu", "Sheng", "Dao", "Lu", "Zhan", "Meng", "Li", "Jin", "Xu", "Jian", "Pan", "Guan", "An", "Lu", "Shu", "Zhou", "Dang", "An", "Gu", "Li", "Mu", "Cheng", "Gan", "Xu", "Mang", "Mang", "Zhi", "Qi", "Ruan", "Tian", "Xiang", "Dun", "Xin", "Xi", "Pan", "Feng", "Dun", "Min"], ao = ["Ming", "Sheng", "Shi", "Yun", "Mian", "Pan", "Fang", "Miao", "Dan", "Mei", "Mao", "Kan", "Xian", "Ou", "Shi", "Yang", "Zheng", "Yao", "Shen", "Huo", "Da", "Zhen", "Kuang", "Ju", "Shen", "Chi", "Sheng", "Mei", "Mo", "Zhu", "Zhen", "Zhen", "Mian", "Di", "Yuan", "Die", "Yi", "Zi", "Zi", "Chao", "Zha", "Xuan", "Bing", "Mi", "Long", "Sui", "Dong", "Mi", "Die", "Yi", "Er", "Ming", "Xuan", "Chi", "Kuang", "Juan", "Mou", "Zhen", "Tiao", "Yang", "Yan", "Mo", "Zhong", "Mai", "Zhao", "Zheng", "Mei", "Jun", "Shao", "Han", "Huan", "Di", "Cheng", "Cuo", "Juan", "E", "Wan", "Xian", "Xi", "Kun", "Lai", "Jian", "Shan", "Tian", "Hun", "Wan", "Ling", "Shi", "Qiong", "Lie", "Yai", "Jing", "Zheng", "Li", "Lai", "Sui", "Juan", "Shui", "Sui", "Du", "Bi", "Bi", "Mu", "Hun", "Ni", "Lu", "Yi", "Jie", "Cai", "Zhou", "Yu", "Hun", "Ma", "Xia", "Xing", "Xi", "Gun", "Cai", "Chun", "Jian", "Mei", "Du", "Hou", "Xuan", "Ti", "Kui", "Gao", "Rui", "Mou", "Xu", "Fa", "Wen", "Miao", "Chou", "Kui", "Mi", "Weng", "Kou", "Dang", "Chen", "Ke", "Sou", "Xia", "Qiong", "Mao", "Ming", "Man", "Shui", "Ze", "Zhang", "Yi", "Diao", "Ou", "Mo", "Shun", "Cong", "Lou", "Chi", "Man", "Piao", "Cheng", "Ji", "Meng", null, "Run", "Pie", "Xi", "Qiao", "Pu", "Zhu", "Deng", "Shen", "Shun", "Liao", "Che", "Xian", "Kan", "Ye", "Xu", "Tong", "Mou", "Lin", "Kui", "Xian", "Ye", "Ai", "Hui", "Zhan", "Jian", "Gu", "Zhao", "Qu", "Wei", "Chou", "Sao", "Ning", "Xun", "Yao", "Huo", "Meng", "Mian", "Bin", "Mian", "Li", "Kuang", "Jue", "Xuan", "Mian", "Huo", "Lu", "Meng", "Long", "Guan", "Man", "Xi", "Chu", "Tang", "Kan", "Zhu", "Mao", "Jin", "Lin", "Yu", "Shuo", "Ce", "Jue", "Shi", "Yi", "Shen", "Zhi", "Hou", "Shen", "Ying", "Ju", "Zhou", "Jiao", "Cuo", "Duan", "Ai", "Jiao", "Zeng", "Huo", "Bai", "Shi", "Ding", "Qi", "Ji", "Zi", "Gan", "Wu", "Tuo", "Ku", "Qiang", "Xi", "Fan", "Kuang"], uo = ["Dang", "Ma", "Sha", "Dan", "Jue", "Li", "Fu", "Min", "Nuo", "Huo", "Kang", "Zhi", "Qi", "Kan", "Jie", "Fen", "E", "Ya", "Pi", "Zhe", "Yan", "Sui", "Zhuan", "Che", "Dun", "Pan", "Yan", null, "Feng", "Fa", "Mo", "Zha", "Qu", "Yu", "Luo", "Tuo", "Tuo", "Di", "Zhai", "Zhen", "Ai", "Fei", "Mu", "Zhu", "Li", "Bian", "Nu", "Ping", "Peng", "Ling", "Pao", "Le", "Po", "Bo", "Po", "Shen", "Za", "Nuo", "Li", "Long", "Tong", null, "Li", "Aragane", "Chu", "Keng", "Quan", "Zhu", "Kuang", "Huo", "E", "Nao", "Jia", "Lu", "Wei", "Ai", "Luo", "Ken", "Xing", "Yan", "Tong", "Peng", "Xi", null, "Hong", "Shuo", "Xia", "Qiao", null, "Wei", "Qiao", null, "Keng", "Xiao", "Que", "Chan", "Lang", "Hong", "Yu", "Xiao", "Xia", "Mang", "Long", "Iong", "Che", "Che", "E", "Liu", "Ying", "Mang", "Que", "Yan", "Sha", "Kun", "Yu", null, "Kaki", "Lu", "Chen", "Jian", "Nue", "Song", "Zhuo", "Keng", "Peng", "Yan", "Zhui", "Kong", "Ceng", "Qi", "Zong", "Qing", "Lin", "Jun", "Bo", "Ding", "Min", "Diao", "Jian", "He", "Lu", "Ai", "Sui", "Que", "Ling", "Bei", "Yin", "Dui", "Wu", "Qi", "Lun", "Wan", "Dian", "Gang", "Pei", "Qi", "Chen", "Ruan", "Yan", "Die", "Ding", "Du", "Tuo", "Jie", "Ying", "Bian", "Ke", "Bi", "Wei", "Shuo", "Zhen", "Duan", "Xia", "Dang", "Ti", "Nao", "Peng", "Jian", "Di", "Tan", "Cha", "Seki", "Qi", null, "Feng", "Xuan", "Que", "Que", "Ma", "Gong", "Nian", "Su", "E", "Ci", "Liu", "Si", "Tang", "Bang", "Hua", "Pi", "Wei", "Sang", "Lei", "Cuo", "Zhen", "Xia", "Qi", "Lian", "Pan", "Wei", "Yun", "Dui", "Zhe", "Ke", "La", null, "Qing", "Gun", "Zhuan", "Chan", "Qi", "Ao", "Peng", "Lu", "Lu", "Kan", "Qiang", "Chen", "Yin", "Lei", "Biao", "Qi", "Mo", "Qi", "Cui", "Zong", "Qing", "Chuo", null, "Ji", "Shan", "Lao", "Qu", "Zeng", "Deng", "Jian", "Xi", "Lin", "Ding", "Dian", "Huang", "Pan", "Za", "Qiao", "Di", "Li"], eo = ["Tani", "Jiao", null, "Zhang", "Qiao", "Dun", "Xian", "Yu", "Zhui", "He", "Huo", "Zhai", "Lei", "Ke", "Chu", "Ji", "Que", "Dang", "Yi", "Jiang", "Pi", "Pi", "Yu", "Pin", "Qi", "Ai", "Kai", "Jian", "Yu", "Ruan", "Meng", "Pao", "Ci", null, null, "Mie", "Ca", "Xian", "Kuang", "Lei", "Lei", "Zhi", "Li", "Li", "Fan", "Que", "Pao", "Ying", "Li", "Long", "Long", "Mo", "Bo", "Shuang", "Guan", "Lan", "Zan", "Yan", "Shi", "Shi", "Li", "Reng", "She", "Yue", "Si", "Qi", "Ta", "Ma", "Xie", "Xian", "Xian", "Zhi", "Qi", "Zhi", "Beng", "Dui", "Zhong", null, "Yi", "Shi", "You", "Zhi", "Tiao", "Fu", "Fu", "Mi", "Zu", "Zhi", "Suan", "Mei", "Zuo", "Qu", "Hu", "Zhu", "Shen", "Sui", "Ci", "Chai", "Mi", "Lu", "Yu", "Xiang", "Wu", "Tiao", "Piao", "Zhu", "Gui", "Xia", "Zhi", "Ji", "Gao", "Zhen", "Gao", "Shui", "Jin", "Chen", "Gai", "Kun", "Di", "Dao", "Huo", "Tao", "Qi", "Gu", "Guan", "Zui", "Ling", "Lu", "Bing", "Jin", "Dao", "Zhi", "Lu", "Shan", "Bei", "Zhe", "Hui", "You", "Xi", "Yin", "Zi", "Huo", "Zhen", "Fu", "Yuan", "Wu", "Xian", "Yang", "Ti", "Yi", "Mei", "Si", "Di", null, "Zhuo", "Zhen", "Yong", "Ji", "Gao", "Tang", "Si", "Ma", "Ta", null, "Xuan", "Qi", "Yu", "Xi", "Ji", "Si", "Chan", "Tan", "Kuai", "Sui", "Li", "Nong", "Ni", "Dao", "Li", "Rang", "Yue", "Ti", "Zan", "Lei", "Rou", "Yu", "Yu", "Chi", "Xie", "Qin", "He", "Tu", "Xiu", "Si", "Ren", "Tu", "Zi", "Cha", "Gan", "Yi", "Xian", "Bing", "Nian", "Qiu", "Qiu", "Zhong", "Fen", "Hao", "Yun", "Ke", "Miao", "Zhi", "Geng", "Bi", "Zhi", "Yu", "Mi", "Ku", "Ban", "Pi", "Ni", "Li", "You", "Zu", "Pi", "Ba", "Ling", "Mo", "Cheng", "Nian", "Qin", "Yang", "Zuo", "Zhi", "Zhi", "Shu", "Ju", "Zi", "Huo", "Ji", "Cheng", "Tong", "Zhi", "Huo", "He", "Yin", "Zi", "Zhi", "Jie", "Ren", "Du", "Yi", "Zhu", "Hui", "Nong", "Fu"], oo = ["Xi", "Kao", "Lang", "Fu", "Ze", "Shui", "Lu", "Kun", "Gan", "Geng", "Ti", "Cheng", "Tu", "Shao", "Shui", "Ya", "Lun", "Lu", "Gu", "Zuo", "Ren", "Zhun", "Bang", "Bai", "Ji", "Zhi", "Zhi", "Kun", "Leng", "Peng", "Ke", "Bing", "Chou", "Zu", "Yu", "Su", "Lue", null, "Yi", "Xi", "Bian", "Ji", "Fu", "Bi", "Nuo", "Jie", "Zhong", "Zong", "Xu", "Cheng", "Dao", "Wen", "Lian", "Zi", "Yu", "Ji", "Xu", "Zhen", "Zhi", "Dao", "Jia", "Ji", "Gao", "Gao", "Gu", "Rong", "Sui", "You", "Ji", "Kang", "Mu", "Shan", "Men", "Zhi", "Ji", "Lu", "Su", "Ji", "Ying", "Wen", "Qiu", "Se", null, "Yi", "Huang", "Qie", "Ji", "Sui", "Xiao", "Pu", "Jiao", "Zhuo", "Tong", "Sai", "Lu", "Sui", "Nong", "Se", "Hui", "Rang", "Nuo", "Yu", "Bin", "Ji", "Tui", "Wen", "Cheng", "Huo", "Gong", "Lu", "Biao", null, "Rang", "Zhuo", "Li", "Zan", "Xue", "Wa", "Jiu", "Qiong", "Xi", "Qiong", "Kong", "Yu", "Sen", "Jing", "Yao", "Chuan", "Zhun", "Tu", "Lao", "Qie", "Zhai", "Yao", "Bian", "Bao", "Yao", "Bing", "Wa", "Zhu", "Jiao", "Qiao", "Diao", "Wu", "Gui", "Yao", "Zhi", "Chuang", "Yao", "Tiao", "Jiao", "Chuang", "Jiong", "Xiao", "Cheng", "Kou", "Cuan", "Wo", "Dan", "Ku", "Ke", "Zhui", "Xu", "Su", "Guan", "Kui", "Dou", null, "Yin", "Wo", "Wa", "Ya", "Yu", "Ju", "Qiong", "Yao", "Yao", "Tiao", "Chao", "Yu", "Tian", "Diao", "Ju", "Liao", "Xi", "Wu", "Kui", "Chuang", "Zhao", null, "Kuan", "Long", "Cheng", "Cui", "Piao", "Zao", "Cuan", "Qiao", "Qiong", "Dou", "Zao", "Long", "Qie", "Li", "Chu", "Shi", "Fou", "Qian", "Chu", "Hong", "Qi", "Qian", "Gong", "Shi", "Shu", "Miao", "Ju", "Zhan", "Zhu", "Ling", "Long", "Bing", "Jing", "Jing", "Zhang", "Yi", "Si", "Jun", "Hong", "Tong", "Song", "Jing", "Diao", "Yi", "Shu", "Jing", "Qu", "Jie", "Ping", "Duan", "Shao", "Zhuan", "Ceng", "Deng", "Cui", "Huai", "Jing", "Kan", "Jing", "Zhu", "Zhu", "Le", "Peng", "Yu", "Chi", "Gan"], lo = ["Mang", "Zhu", "Utsubo", "Du", "Ji", "Xiao", "Ba", "Suan", "Ji", "Zhen", "Zhao", "Sun", "Ya", "Zhui", "Yuan", "Hu", "Gang", "Xiao", "Cen", "Pi", "Bi", "Jian", "Yi", "Dong", "Shan", "Sheng", "Xia", "Di", "Zhu", "Na", "Chi", "Gu", "Li", "Qie", "Min", "Bao", "Tiao", "Si", "Fu", "Ce", "Ben", "Pei", "Da", "Zi", "Di", "Ling", "Ze", "Nu", "Fu", "Gou", "Fan", "Jia", "Ge", "Fan", "Shi", "Mao", "Po", "Sey", "Jian", "Qiong", "Long", "Souke", "Bian", "Luo", "Gui", "Qu", "Chi", "Yin", "Yao", "Xian", "Bi", "Qiong", "Gua", "Deng", "Jiao", "Jin", "Quan", "Sun", "Ru", "Fa", "Kuang", "Zhu", "Tong", "Ji", "Da", "Xing", "Ce", "Zhong", "Kou", "Lai", "Bi", "Shai", "Dang", "Zheng", "Ce", "Fu", "Yun", "Tu", "Pa", "Li", "Lang", "Ju", "Guan", "Jian", "Han", "Tong", "Xia", "Zhi", "Cheng", "Suan", "Shi", "Zhu", "Zuo", "Xiao", "Shao", "Ting", "Ce", "Yan", "Gao", "Kuai", "Gan", "Chou", "Kago", "Gang", "Yun", "O", "Qian", "Xiao", "Jian", "Pu", "Lai", "Zou", "Bi", "Bi", "Bi", "Ge", "Chi", "Guai", "Yu", "Jian", "Zhao", "Gu", "Chi", "Zheng", "Jing", "Sha", "Zhou", "Lu", "Bo", "Ji", "Lin", "Suan", "Jun", "Fu", "Zha", "Gu", "Kong", "Qian", "Quan", "Jun", "Chui", "Guan", "Yuan", "Ce", "Ju", "Bo", "Ze", "Qie", "Tuo", "Luo", "Dan", "Xiao", "Ruo", "Jian", "Xuan", "Bian", "Sun", "Xiang", "Xian", "Ping", "Zhen", "Sheng", "Hu", "Shi", "Zhu", "Yue", "Chun", "Lu", "Wu", "Dong", "Xiao", "Ji", "Jie", "Huang", "Xing", "Mei", "Fan", "Chui", "Zhuan", "Pian", "Feng", "Zhu", "Hong", "Qie", "Hou", "Qiu", "Miao", "Qian", null, "Kui", "Sik", "Lou", "Yun", "He", "Tang", "Yue", "Chou", "Gao", "Fei", "Ruo", "Zheng", "Gou", "Nie", "Qian", "Xiao", "Cuan", "Gong", "Pang", "Du", "Li", "Bi", "Zhuo", "Chu", "Shai", "Chi", "Zhu", "Qiang", "Long", "Lan", "Jian", "Bu", "Li", "Hui", "Bi", "Di", "Cong", "Yan", "Peng", "Sen", "Zhuan", "Pai", "Piao", "Dou", "Yu", "Mie", "Zhuan"], to = ["Ze", "Xi", "Guo", "Yi", "Hu", "Chan", "Kou", "Cu", "Ping", "Chou", "Ji", "Gui", "Su", "Lou", "Zha", "Lu", "Nian", "Suo", "Cuan", "Sasara", "Suo", "Le", "Duan", "Yana", "Xiao", "Bo", "Mi", "Si", "Dang", "Liao", "Dan", "Dian", "Fu", "Jian", "Min", "Kui", "Dai", "Qiao", "Deng", "Huang", "Sun", "Lao", "Zan", "Xiao", "Du", "Shi", "Zan", null, "Pai", "Hata", "Pai", "Gan", "Ju", "Du", "Lu", "Yan", "Bo", "Dang", "Sai", "Ke", "Long", "Qian", "Lian", "Bo", "Zhou", "Lai", null, "Lan", "Kui", "Yu", "Yue", "Hao", "Zhen", "Tai", "Ti", "Mi", "Chou", "Ji", null, "Hata", "Teng", "Zhuan", "Zhou", "Fan", "Sou", "Zhou", "Kuji", "Zhuo", "Teng", "Lu", "Lu", "Jian", "Tuo", "Ying", "Yu", "Lai", "Long", "Shinshi", "Lian", "Lan", "Qian", "Yue", "Zhong", "Qu", "Lian", "Bian", "Duan", "Zuan", "Li", "Si", "Luo", "Ying", "Yue", "Zhuo", "Xu", "Mi", "Di", "Fan", "Shen", "Zhe", "Shen", "Nu", "Xie", "Lei", "Xian", "Zi", "Ni", "Cun", null, "Qian", "Kume", "Bi", "Ban", "Wu", "Sha", "Kang", "Rou", "Fen", "Bi", "Cui", null, "Li", "Chi", "Nukamiso", "Ro", "Ba", "Li", "Gan", "Ju", "Po", "Mo", "Cu", "Nian", "Zhou", "Li", "Su", "Tiao", "Li", "Qi", "Su", "Hong", "Tong", "Zi", "Ce", "Yue", "Zhou", "Lin", "Zhuang", "Bai", null, "Fen", "Ji", null, "Sukumo", "Liang", "Xian", "Fu", "Liang", "Can", "Geng", "Li", "Yue", "Lu", "Ju", "Qi", "Cui", "Bai", "Zhang", "Lin", "Zong", "Jing", "Guo", "Kouji", "San", "San", "Tang", "Bian", "Rou", "Mian", "Hou", "Xu", "Zong", "Hu", "Jian", "Zan", "Ci", "Li", "Xie", "Fu", "Ni", "Bei", "Gu", "Xiu", "Gao", "Tang", "Qiu", "Sukumo", "Cao", "Zhuang", "Tang", "Mi", "San", "Fen", "Zao", "Kang", "Jiang", "Mo", "San", "San", "Nuo", "Xi", "Liang", "Jiang", "Kuai", "Bo", "Huan", null, "Zong", "Xian", "Nuo", "Tuan", "Nie", "Li", "Zuo", "Di", "Nie", "Tiao", "Lan", "Mi", "Jiao", "Jiu", "Xi", "Gong", "Zheng", "Jiu", "You"], ho = ["Ji", "Cha", "Zhou", "Xun", "Yue", "Hong", "Yu", "He", "Wan", "Ren", "Wen", "Wen", "Qiu", "Na", "Zi", "Tou", "Niu", "Fou", "Jie", "Shu", "Chun", "Pi", "Yin", "Sha", "Hong", "Zhi", "Ji", "Fen", "Yun", "Ren", "Dan", "Jin", "Su", "Fang", "Suo", "Cui", "Jiu", "Zha", "Kinu", "Jin", "Fu", "Zhi", "Ci", "Zi", "Chou", "Hong", "Zha", "Lei", "Xi", "Fu", "Xie", "Shen", "Bei", "Zhu", "Qu", "Ling", "Zhu", "Shao", "Gan", "Yang", "Fu", "Tuo", "Zhen", "Dai", "Zhuo", "Shi", "Zhong", "Xian", "Zu", "Jiong", "Ban", "Ju", "Mo", "Shu", "Zui", "Wata", "Jing", "Ren", "Heng", "Xie", "Jie", "Zhu", "Chou", "Gua", "Bai", "Jue", "Kuang", "Hu", "Ci", "Geng", "Geng", "Tao", "Xie", "Ku", "Jiao", "Quan", "Gai", "Luo", "Xuan", "Bing", "Xian", "Fu", "Gei", "Tong", "Rong", "Tiao", "Yin", "Lei", "Xie", "Quan", "Xu", "Lun", "Die", "Tong", "Si", "Jiang", "Xiang", "Hui", "Jue", "Zhi", "Jian", "Juan", "Chi", "Mian", "Zhen", "Lu", "Cheng", "Qiu", "Shu", "Bang", "Tong", "Xiao", "Wan", "Qin", "Geng", "Xiu", "Ti", "Xiu", "Xie", "Hong", "Xi", "Fu", "Ting", "Sui", "Dui", "Kun", "Fu", "Jing", "Hu", "Zhi", "Yan", "Jiong", "Feng", "Ji", "Sok", "Kase", "Zong", "Lin", "Duo", "Li", "Lu", "Liang", "Chou", "Quan", "Shao", "Qi", "Qi", "Zhun", "Qi", "Wan", "Qian", "Xian", "Shou", "Wei", "Qi", "Tao", "Wan", "Gang", "Wang", "Beng", "Zhui", "Cai", "Guo", "Cui", "Lun", "Liu", "Qi", "Zhan", "Bei", "Chuo", "Ling", "Mian", "Qi", "Qie", "Tan", "Zong", "Gun", "Zou", "Yi", "Zi", "Xing", "Liang", "Jin", "Fei", "Rui", "Min", "Yu", "Zong", "Fan", "Lu", "Xu", "Yingl", "Zhang", "Kasuri", "Xu", "Xiang", "Jian", "Ke", "Xian", "Ruan", "Mian", "Qi", "Duan", "Zhong", "Di", "Min", "Miao", "Yuan", "Xie", "Bao", "Si", "Qiu", "Bian", "Huan", "Geng", "Cong", "Mian", "Wei", "Fu", "Wei", "Yu", "Gou", "Miao", "Xie", "Lian", "Zong", "Bian", "Yun", "Yin", "Ti", "Gua", "Zhi", "Yun", "Cheng", "Chan", "Dai"], go = ["Xia", "Yuan", "Zong", "Xu", "Nawa", "Odoshi", "Geng", "Sen", "Ying", "Jin", "Yi", "Zhui", "Ni", "Bang", "Gu", "Pan", "Zhou", "Jian", "Cuo", "Quan", "Shuang", "Yun", "Xia", "Shuai", "Xi", "Rong", "Tao", "Fu", "Yun", "Zhen", "Gao", "Ru", "Hu", "Zai", "Teng", "Xian", "Su", "Zhen", "Zong", "Tao", "Horo", "Cai", "Bi", "Feng", "Cu", "Li", "Suo", "Yin", "Xi", "Zong", "Lei", "Zhuan", "Qian", "Man", "Zhi", "Lu", "Mo", "Piao", "Lian", "Mi", "Xuan", "Zong", "Ji", "Shan", "Sui", "Fan", "Shuai", "Beng", "Yi", "Sao", "Mou", "Zhou", "Qiang", "Hun", "Sem", "Xi", "Jung", "Xiu", "Ran", "Xuan", "Hui", "Qiao", "Zeng", "Zuo", "Zhi", "Shan", "San", "Lin", "Yu", "Fan", "Liao", "Chuo", "Zun", "Jian", "Rao", "Chan", "Rui", "Xiu", "Hui", "Hua", "Zuan", "Xi", "Qiang", "Un", "Da", "Sheng", "Hui", "Xi", "Se", "Jian", "Jiang", "Huan", "Zao", "Cong", "Jie", "Jiao", "Bo", "Chan", "Yi", "Nao", "Sui", "Yi", "Shai", "Xu", "Ji", "Bin", "Qian", "Lan", "Pu", "Xun", "Zuan", "Qi", "Peng", "Li", "Mo", "Lei", "Xie", "Zuan", "Kuang", "You", "Xu", "Lei", "Xian", "Chan", "Kou", "Lu", "Chan", "Ying", "Cai", "Xiang", "Xian", "Zui", "Zuan", "Luo", "Xi", "Dao", "Lan", "Lei", "Lian", "Si", "Jiu", "Yu", "Hong", "Zhou", "Xian", "He", "Yue", "Ji", "Wan", "Kuang", "Ji", "Ren", "Wei", "Yun", "Hong", "Chun", "Pi", "Sha", "Gang", "Na", "Ren", "Zong", "Lun", "Fen", "Zhi", "Wen", "Fang", "Zhu", "Yin", "Niu", "Shu", "Xian", "Gan", "Xie", "Fu", "Lian", "Zu", "Shen", "Xi", "Zhi", "Zhong", "Zhou", "Ban", "Fu", "Zhuo", "Shao", "Yi", "Jing", "Dai", "Bang", "Rong", "Jie", "Ku", "Rao", "Die", "Heng", "Hui", "Gei", "Xuan", "Jiang", "Luo", "Jue", "Jiao", "Tong", "Geng", "Xiao", "Juan", "Xiu", "Xi", "Sui", "Tao", "Ji", "Ti", "Ji", "Xu", "Ling", null, "Xu", "Qi", "Fei", "Chuo", "Zhang", "Gun", "Sheng", "Wei", "Mian", "Shou", "Beng", "Chou", "Tao", "Liu", "Quan", "Zong", "Zhan", "Wan", "Lu"], ro = ["Zhui", "Zi", "Ke", "Xiang", "Jian", "Mian", "Lan", "Ti", "Miao", "Qi", "Yun", "Hui", "Si", "Duo", "Duan", "Bian", "Xian", "Gou", "Zhui", "Huan", "Di", "Lu", "Bian", "Min", "Yuan", "Jin", "Fu", "Ru", "Zhen", "Feng", "Shuai", "Gao", "Chan", "Li", "Yi", "Jian", "Bin", "Piao", "Man", "Lei", "Ying", "Suo", "Mou", "Sao", "Xie", "Liao", "Shan", "Zeng", "Jiang", "Qian", "Zao", "Huan", "Jiao", "Zuan", "Fou", "Xie", "Gang", "Fou", "Que", "Fou", "Kaakeru", "Bo", "Ping", "Hou", null, "Gang", "Ying", "Ying", "Qing", "Xia", "Guan", "Zun", "Tan", "Chang", "Qi", "Weng", "Ying", "Lei", "Tan", "Lu", "Guan", "Wang", "Wang", "Gang", "Wang", "Han", null, "Luo", "Fu", "Mi", "Fa", "Gu", "Zhu", "Ju", "Mao", "Gu", "Min", "Gang", "Ba", "Gua", "Ti", "Juan", "Fu", "Lin", "Yan", "Zhao", "Zui", "Gua", "Zhuo", "Yu", "Zhi", "An", "Fa", "Nan", "Shu", "Si", "Pi", "Ma", "Liu", "Ba", "Fa", "Li", "Chao", "Wei", "Bi", "Ji", "Zeng", "Tong", "Liu", "Ji", "Juan", "Mi", "Zhao", "Luo", "Pi", "Ji", "Ji", "Luan", "Yang", "Mie", "Qiang", "Ta", "Mei", "Yang", "You", "You", "Fen", "Ba", "Gao", "Yang", "Gu", "Qiang", "Zang", "Gao", "Ling", "Yi", "Zhu", "Di", "Xiu", "Qian", "Yi", "Xian", "Rong", "Qun", "Qun", "Qian", "Huan", "Zui", "Xian", "Yi", "Yashinau", "Qiang", "Xian", "Yu", "Geng", "Jie", "Tang", "Yuan", "Xi", "Fan", "Shan", "Fen", "Shan", "Lian", "Lei", "Geng", "Nou", "Qiang", "Chan", "Yu", "Gong", "Yi", "Chong", "Weng", "Fen", "Hong", "Chi", "Chi", "Cui", "Fu", "Xia", "Pen", "Yi", "La", "Yi", "Pi", "Ling", "Liu", "Zhi", "Qu", "Xi", "Xie", "Xiang", "Xi", "Xi", "Qi", "Qiao", "Hui", "Hui", "Xiao", "Se", "Hong", "Jiang", "Di", "Cui", "Fei", "Tao", "Sha", "Chi", "Zhu", "Jian", "Xuan", "Shi", "Pian", "Zong", "Wan", "Hui", "Hou", "He", "He", "Han", "Ao", "Piao", "Yi", "Lian", "Qu", null, "Lin", "Pen", "Qiao", "Ao", "Fan", "Yi", "Hui", "Xuan", "Dao"], so = ["Yao", "Lao", null, "Kao", "Mao", "Zhe", "Qi", "Gou", "Gou", "Gou", "Die", "Die", "Er", "Shua", "Ruan", "Er", "Nai", "Zhuan", "Lei", "Ting", "Zi", "Geng", "Chao", "Hao", "Yun", "Pa", "Pi", "Chi", "Si", "Chu", "Jia", "Ju", "He", "Chu", "Lao", "Lun", "Ji", "Tang", "Ou", "Lou", "Nou", "Gou", "Pang", "Ze", "Lou", "Ji", "Lao", "Huo", "You", "Mo", "Huai", "Er", "Zhe", "Ting", "Ye", "Da", "Song", "Qin", "Yun", "Chi", "Dan", "Dan", "Hong", "Geng", "Zhi", null, "Nie", "Dan", "Zhen", "Che", "Ling", "Zheng", "You", "Wa", "Liao", "Long", "Zhi", "Ning", "Tiao", "Er", "Ya", "Die", "Gua", null, "Lian", "Hao", "Sheng", "Lie", "Pin", "Jing", "Ju", "Bi", "Di", "Guo", "Wen", "Xu", "Ping", "Cong", "Shikato", null, "Ting", "Yu", "Cong", "Kui", "Tsuraneru", "Kui", "Cong", "Lian", "Weng", "Kui", "Lian", "Lian", "Cong", "Ao", "Sheng", "Song", "Ting", "Kui", "Nie", "Zhi", "Dan", "Ning", "Qie", "Ji", "Ting", "Ting", "Long", "Yu", "Yu", "Zhao", "Si", "Su", "Yi", "Su", "Si", "Zhao", "Zhao", "Rou", "Yi", "Le", "Ji", "Qiu", "Ken", "Cao", "Ge", "Di", "Huan", "Huang", "Yi", "Ren", "Xiao", "Ru", "Zhou", "Yuan", "Du", "Gang", "Rong", "Gan", "Cha", "Wo", "Chang", "Gu", "Zhi", "Han", "Fu", "Fei", "Fen", "Pei", "Pang", "Jian", "Fang", "Zhun", "You", "Na", "Hang", "Ken", "Ran", "Gong", "Yu", "Wen", "Yao", "Jin", "Pi", "Qian", "Xi", "Xi", "Fei", "Ken", "Jing", "Tai", "Shen", "Zhong", "Zhang", "Xie", "Shen", "Wei", "Zhou", "Die", "Dan", "Fei", "Ba", "Bo", "Qu", "Tian", "Bei", "Gua", "Tai", "Zi", "Ku", "Zhi", "Ni", "Ping", "Zi", "Fu", "Pang", "Zhen", "Xian", "Zuo", "Pei", "Jia", "Sheng", "Zhi", "Bao", "Mu", "Qu", "Hu", "Ke", "Yi", "Yin", "Xu", "Yang", "Long", "Dong", "Ka", "Lu", "Jing", "Nu", "Yan", "Pang", "Kua", "Yi", "Guang", "Gai", "Ge", "Dong", "Zhi", "Xiao", "Xiong", "Xiong", "Er", "E", "Xing", "Pian", "Neng", "Zi", "Gui"], Yo = ["Cheng", "Tiao", "Zhi", "Cui", "Mei", "Xie", "Cui", "Xie", "Mo", "Mai", "Ji", "Obiyaakasu", null, "Kuai", "Sa", "Zang", "Qi", "Nao", "Mi", "Nong", "Luan", "Wan", "Bo", "Wen", "Guan", "Qiu", "Jiao", "Jing", "Rou", "Heng", "Cuo", "Lie", "Shan", "Ting", "Mei", "Chun", "Shen", "Xie", "De", "Zui", "Cu", "Xiu", "Xin", "Tuo", "Pao", "Cheng", "Nei", "Fu", "Dou", "Tuo", "Niao", "Noy", "Pi", "Gu", "Gua", "Li", "Lian", "Zhang", "Cui", "Jie", "Liang", "Zhou", "Pi", "Biao", "Lun", "Pian", "Guo", "Kui", "Chui", "Dan", "Tian", "Nei", "Jing", "Jie", "La", "Yi", "An", "Ren", "Shen", "Chuo", "Fu", "Fu", "Ju", "Fei", "Qiang", "Wan", "Dong", "Pi", "Guo", "Zong", "Ding", "Wu", "Mei", "Ruan", "Zhuan", "Zhi", "Cou", "Gua", "Ou", "Di", "An", "Xing", "Nao", "Yu", "Chuan", "Nan", "Yun", "Zhong", "Rou", "E", "Sai", "Tu", "Yao", "Jian", "Wei", "Jiao", "Yu", "Jia", "Duan", "Bi", "Chang", "Fu", "Xian", "Ni", "Mian", "Wa", "Teng", "Tui", "Bang", "Qian", "Lu", "Wa", "Sou", "Tang", "Su", "Zhui", "Ge", "Yi", "Bo", "Liao", "Ji", "Pi", "Xie", "Gao", "Lu", "Bin", "Ou", "Chang", "Lu", "Guo", "Pang", "Chuai", "Piao", "Jiang", "Fu", "Tang", "Mo", "Xi", "Zhuan", "Lu", "Jiao", "Ying", "Lu", "Zhi", "Tara", "Chun", "Lian", "Tong", "Peng", "Ni", "Zha", "Liao", "Cui", "Gui", "Xiao", "Teng", "Fan", "Zhi", "Jiao", "Shan", "Wu", "Cui", "Run", "Xiang", "Sui", "Fen", "Ying", "Tan", "Zhua", "Dan", "Kuai", "Nong", "Tun", "Lian", "Bi", "Yong", "Jue", "Chu", "Yi", "Juan", "La", "Lian", "Sao", "Tun", "Gu", "Qi", "Cui", "Bin", "Xun", "Ru", "Huo", "Zang", "Xian", "Biao", "Xing", "Kuan", "La", "Yan", "Lu", "Huo", "Zang", "Luo", "Qu", "Zang", "Luan", "Ni", "Zang", "Chen", "Qian", "Wo", "Guang", "Zang", "Lin", "Guang", "Zi", "Jiao", "Nie", "Chou", "Ji", "Gao", "Chou", "Mian", "Nie", "Zhi", "Zhi", "Ge", "Jian", "Die", "Zhi", "Xiu", "Tai", "Zhen", "Jiu", "Xian", "Yu", "Cha"], co = ["Yao", "Yu", "Chong", "Xi", "Xi", "Jiu", "Yu", "Yu", "Xing", "Ju", "Jiu", "Xin", "She", "She", "Yadoru", "Jiu", "Shi", "Tan", "Shu", "Shi", "Tian", "Dan", "Pu", "Pu", "Guan", "Hua", "Tan", "Chuan", "Shun", "Xia", "Wu", "Zhou", "Dao", "Gang", "Shan", "Yi", null, "Pa", "Tai", "Fan", "Ban", "Chuan", "Hang", "Fang", "Ban", "Que", "Hesaki", "Zhong", "Jian", "Cang", "Ling", "Zhu", "Ze", "Duo", "Bo", "Xian", "Ge", "Chuan", "Jia", "Lu", "Hong", "Pang", "Xi", null, "Fu", "Zao", "Feng", "Li", "Shao", "Yu", "Lang", "Ting", null, "Wei", "Bo", "Meng", "Nian", "Ju", "Huang", "Shou", "Zong", "Bian", "Mao", "Die", null, "Bang", "Cha", "Yi", "Sao", "Cang", "Cao", "Lou", "Dai", "Sori", "Yao", "Tong", "Yofune", "Dang", "Tan", "Lu", "Yi", "Jie", "Jian", "Huo", "Meng", "Qi", "Lu", "Lu", "Chan", "Shuang", "Gen", "Liang", "Jian", "Jian", "Se", "Yan", "Fu", "Ping", "Yan", "Yan", "Cao", "Cao", "Yi", "Le", "Ting", "Qiu", "Ai", "Nai", "Tiao", "Jiao", "Jie", "Peng", "Wan", "Yi", "Chai", "Mian", "Mie", "Gan", "Qian", "Yu", "Yu", "Shuo", "Qiong", "Tu", "Xia", "Qi", "Mang", "Zi", "Hui", "Sui", "Zhi", "Xiang", "Bi", "Fu", "Tun", "Wei", "Wu", "Zhi", "Qi", "Shan", "Wen", "Qian", "Ren", "Fou", "Kou", "Jie", "Lu", "Xu", "Ji", "Qin", "Qi", "Yuan", "Fen", "Ba", "Rui", "Xin", "Ji", "Hua", "Hua", "Fang", "Wu", "Jue", "Gou", "Zhi", "Yun", "Qin", "Ao", "Chu", "Mao", "Ya", "Fei", "Reng", "Hang", "Cong", "Yin", "You", "Bian", "Yi", "Susa", "Wei", "Li", "Pi", "E", "Xian", "Chang", "Cang", "Meng", "Su", "Yi", "Yuan", "Ran", "Ling", "Tai", "Tiao", "Di", "Miao", "Qiong", "Li", "Yong", "Ke", "Mu", "Pei", "Bao", "Gou", "Min", "Yi", "Yi", "Ju", "Pi", "Ruo", "Ku", "Zhu", "Ni", "Bo", "Bing", "Shan", "Qiu", "Yao", "Xian", "Ben", "Hong", "Ying", "Zha", "Dong", "Ju", "Die", "Nie", "Gan", "Hu", "Ping", "Mei", "Fu", "Sheng", "Gu", "Bi", "Wei"], Lo = ["Fu", "Zhuo", "Mao", "Fan", "Qie", "Mao", "Mao", "Ba", "Zi", "Mo", "Zi", "Di", "Chi", "Ji", "Jing", "Long", null, "Niao", null, "Xue", "Ying", "Qiong", "Ge", "Ming", "Li", "Rong", "Yin", "Gen", "Qian", "Chai", "Chen", "Yu", "Xiu", "Zi", "Lie", "Wu", "Ji", "Kui", "Ce", "Chong", "Ci", "Gou", "Guang", "Mang", "Chi", "Jiao", "Jiao", "Fu", "Yu", "Zhu", "Zi", "Jiang", "Hui", "Yin", "Cha", "Fa", "Rong", "Ru", "Chong", "Mang", "Tong", "Zhong", null, "Zhu", "Xun", "Huan", "Kua", "Quan", "Gai", "Da", "Jing", "Xing", "Quan", "Cao", "Jing", "Er", "An", "Shou", "Chi", "Ren", "Jian", "Ti", "Huang", "Ping", "Li", "Jin", "Lao", "Shu", "Zhuang", "Da", "Jia", "Rao", "Bi", "Ze", "Qiao", "Hui", "Qi", "Dang", null, "Rong", "Hun", "Ying", "Luo", "Ying", "Xun", "Jin", "Sun", "Yin", "Mai", "Hong", "Zhou", "Yao", "Du", "Wei", "Chu", "Dou", "Fu", "Ren", "Yin", "He", "Bi", "Bu", "Yun", "Di", "Tu", "Sui", "Sui", "Cheng", "Chen", "Wu", "Bie", "Xi", "Geng", "Li", "Fu", "Zhu", "Mo", "Li", "Zhuang", "Ji", "Duo", "Qiu", "Sha", "Suo", "Chen", "Feng", "Ju", "Mei", "Meng", "Xing", "Jing", "Che", "Xin", "Jun", "Yan", "Ting", "Diao", "Cuo", "Wan", "Han", "You", "Cuo", "Jia", "Wang", "You", "Niu", "Shao", "Xian", "Lang", "Fu", "E", "Mo", "Wen", "Jie", "Nan", "Mu", "Kan", "Lai", "Lian", "Shi", "Wo", "Usagi", "Lian", "Huo", "You", "Ying", "Ying", "Nuc", "Chun", "Mang", "Mang", "Ci", "Wan", "Jing", "Di", "Qu", "Dong", "Jian", "Zou", "Gu", "La", "Lu", "Ju", "Wei", "Jun", "Nie", "Kun", "He", "Pu", "Zi", "Gao", "Guo", "Fu", "Lun", "Chang", "Chou", "Song", "Chui", "Zhan", "Men", "Cai", "Ba", "Li", "Tu", "Bo", "Han", "Bao", "Qin", "Juan", "Xi", "Qin", "Di", "Jie", "Pu", "Dang", "Jin", "Zhao", "Tai", "Geng", "Hua", "Gu", "Ling", "Fei", "Jin", "An", "Wang", "Beng", "Zhou", "Yan", "Ju", "Jian", "Lin", "Tan", "Shu", "Tian", "Dao"], Zo = ["Hu", "Qi", "He", "Cui", "Tao", "Chun", "Bei", "Chang", "Huan", "Fei", "Lai", "Qi", "Meng", "Ping", "Wei", "Dan", "Sha", "Huan", "Yan", "Yi", "Tiao", "Qi", "Wan", "Ce", "Nai", "Kutabireru", "Tuo", "Jiu", "Tie", "Luo", null, null, "Meng", null, "Yaji", null, "Ying", "Ying", "Ying", "Xiao", "Sa", "Qiu", "Ke", "Xiang", "Wan", "Yu", "Yu", "Fu", "Lian", "Xuan", "Yuan", "Nan", "Ze", "Wo", "Chun", "Xiao", "Yu", "Pian", "Mao", "An", "E", "Luo", "Ying", "Huo", "Gua", "Jiang", "Mian", "Zuo", "Zuo", "Ju", "Bao", "Rou", "Xi", "Xie", "An", "Qu", "Jian", "Fu", "Lu", "Jing", "Pen", "Feng", "Hong", "Hong", "Hou", "Yan", "Tu", "Zhu", "Zi", "Xiang", "Shen", "Ge", "Jie", "Jing", "Mi", "Huang", "Shen", "Pu", "Gai", "Dong", "Zhou", "Qian", "Wei", "Bo", "Wei", "Pa", "Ji", "Hu", "Zang", "Jia", "Duan", "Yao", "Jun", "Cong", "Quan", "Wei", "Xian", "Kui", "Ting", "Hun", "Xi", "Shi", "Qi", "Lan", "Zong", "Yao", "Yuan", "Mei", "Yun", "Shu", "Di", "Zhuan", "Guan", "Sukumo", "Xue", "Chan", "Kai", "Kui", null, "Jiang", "Lou", "Wei", "Pai", null, "Sou", "Yin", "Shi", "Chun", "Shi", "Yun", "Zhen", "Lang", "Nu", "Meng", "He", "Que", "Suan", "Yuan", "Li", "Ju", "Xi", "Pang", "Chu", "Xu", "Tu", "Liu", "Wo", "Zhen", "Qian", "Zu", "Po", "Cuo", "Yuan", "Chu", "Yu", "Kuai", "Pan", "Pu", "Pu", "Na", "Shuo", "Xi", "Fen", "Yun", "Zheng", "Jian", "Ji", "Ruo", "Cang", "En", "Mi", "Hao", "Sun", "Zhen", "Ming", "Sou", "Xu", "Liu", "Xi", "Gu", "Lang", "Rong", "Weng", "Gai", "Cuo", "Shi", "Tang", "Luo", "Ru", "Suo", "Xian", "Bei", "Yao", "Gui", "Bi", "Zong", "Gun", "Za", "Xiu", "Ce", "Hai", "Lan", null, "Ji", "Li", "Can", "Lang", "Yu", null, "Ying", "Mo", "Diao", "Tiao", "Mao", "Tong", "Zhu", "Peng", "An", "Lian", "Cong", "Xi", "Ping", "Qiu", "Jin", "Chun", "Jie", "Wei", "Tui", "Cao", "Yu", "Yi", "Ji", "Liao", "Bi", "Lu", "Su"], Co = ["Bu", "Zhang", "Luo", "Jiang", "Man", "Yan", "Ling", "Ji", "Piao", "Gun", "Han", "Di", "Su", "Lu", "She", "Shang", "Di", "Mie", "Xun", "Man", "Bo", "Di", "Cuo", "Zhe", "Sen", "Xuan", "Wei", "Hu", "Ao", "Mi", "Lou", "Cu", "Zhong", "Cai", "Po", "Jiang", "Mi", "Cong", "Niao", "Hui", "Jun", "Yin", "Jian", "Yan", "Shu", "Yin", "Kui", "Chen", "Hu", "Sha", "Kou", "Qian", "Ma", "Zang", "Sonoko", "Qiang", "Dou", "Lian", "Lin", "Kou", "Ai", "Bi", "Li", "Wei", "Ji", "Xun", "Sheng", "Fan", "Meng", "Ou", "Chan", "Dian", "Xun", "Jiao", "Rui", "Rui", "Lei", "Yu", "Qiao", "Chu", "Hua", "Jian", "Mai", "Yun", "Bao", "You", "Qu", "Lu", "Rao", "Hui", "E", "Teng", "Fei", "Jue", "Zui", "Fa", "Ru", "Fen", "Kui", "Shun", "Rui", "Ya", "Xu", "Fu", "Jue", "Dang", "Wu", "Tong", "Si", "Xiao", "Xi", "Long", "Yun", null, "Qi", "Jian", "Yun", "Sun", "Ling", "Yu", "Xia", "Yong", "Ji", "Hong", "Si", "Nong", "Lei", "Xuan", "Yun", "Yu", "Xi", "Hao", "Bo", "Hao", "Ai", "Wei", "Hui", "Wei", "Ji", "Ci", "Xiang", "Luan", "Mie", "Yi", "Leng", "Jiang", "Can", "Shen", "Qiang", "Lian", "Ke", "Yuan", "Da", "Ti", "Tang", "Xie", "Bi", "Zhan", "Sun", "Lian", "Fan", "Ding", "Jie", "Gu", "Xie", "Shu", "Jian", "Kao", "Hong", "Sa", "Xin", "Xun", "Yao", "Hie", "Sou", "Shu", "Xun", "Dui", "Pin", "Wei", "Neng", "Chou", "Mai", "Ru", "Piao", "Tai", "Qi", "Zao", "Chen", "Zhen", "Er", "Ni", "Ying", "Gao", "Cong", "Xiao", "Qi", "Fa", "Jian", "Xu", "Kui", "Jie", "Bian", "Diao", "Mi", "Lan", "Jin", "Cang", "Miao", "Qiong", "Qie", "Xian", null, "Ou", "Xian", "Su", "Lu", "Yi", "Xu", "Xie", "Li", "Yi", "La", "Lei", "Xiao", "Di", "Zhi", "Bei", "Teng", "Yao", "Mo", "Huan", "Piao", "Fan", "Sou", "Tan", "Tui", "Qiong", "Qiao", "Wei", "Liu", "Hui", null, "Gao", "Yun", null, "Li", "Shu", "Chu", "Ai", "Lin", "Zao", "Xuan", "Chen", "Lai", "Huo"], So = ["Tuo", "Wu", "Rui", "Rui", "Qi", "Heng", "Lu", "Su", "Tui", "Mang", "Yun", "Pin", "Yu", "Xun", "Ji", "Jiong", "Xian", "Mo", "Hagi", "Su", "Jiong", null, "Nie", "Bo", "Rang", "Yi", "Xian", "Yu", "Ju", "Lian", "Lian", "Yin", "Qiang", "Ying", "Long", "Tong", "Wei", "Yue", "Ling", "Qu", "Yao", "Fan", "Mi", "Lan", "Kui", "Lan", "Ji", "Dang", "Katsura", "Lei", "Lei", "Hua", "Feng", "Zhi", "Wei", "Kui", "Zhan", "Huai", "Li", "Ji", "Mi", "Lei", "Huai", "Luo", "Ji", "Kui", "Lu", "Jian", "San", null, "Lei", "Quan", "Xiao", "Yi", "Luan", "Men", "Bie", "Hu", "Hu", "Lu", "Nue", "Lu", "Si", "Xiao", "Qian", "Chu", "Hu", "Xu", "Cuo", "Fu", "Xu", "Xu", "Lu", "Hu", "Yu", "Hao", "Jiao", "Ju", "Guo", "Bao", "Yan", "Zhan", "Zhan", "Kui", "Ban", "Xi", "Shu", "Chong", "Qiu", "Diao", "Ji", "Qiu", "Cheng", "Shi", null, "Di", "Zhe", "She", "Yu", "Gan", "Zi", "Hong", "Hui", "Meng", "Ge", "Sui", "Xia", "Chai", "Shi", "Yi", "Ma", "Xiang", "Fang", "E", "Pa", "Chi", "Qian", "Wen", "Wen", "Rui", "Bang", "Bi", "Yue", "Yue", "Jun", "Qi", "Ran", "Yin", "Qi", "Tian", "Yuan", "Jue", "Hui", "Qin", "Qi", "Zhong", "Ya", "Ci", "Mu", "Wang", "Fen", "Fen", "Hang", "Gong", "Zao", "Fu", "Ran", "Jie", "Fu", "Chi", "Dou", "Piao", "Xian", "Ni", "Te", "Qiu", "You", "Zha", "Ping", "Chi", "You", "He", "Han", "Ju", "Li", "Fu", "Ran", "Zha", "Gou", "Pi", "Bo", "Xian", "Zhu", "Diao", "Bie", "Bing", "Gu", "Ran", "Qu", "She", "Tie", "Ling", "Gu", "Dan", "Gu", "Ying", "Li", "Cheng", "Qu", "Mou", "Ge", "Ci", "Hui", "Hui", "Mang", "Fu", "Yang", "Wa", "Lie", "Zhu", "Yi", "Xian", "Kuo", "Jiao", "Li", "Yi", "Ping", "Ji", "Ha", "She", "Yi", "Wang", "Mo", "Qiong", "Qie", "Gui", "Gong", "Zhi", "Man", "Ebi", "Zhi", "Jia", "Rao", "Si", "Qi", "Xing", "Lie", "Qiu", "Shao", "Yong", "Jia", "Shui", "Che", "Bai", "E", "Han"], Jo = ["Shu", "Xuan", "Feng", "Shen", "Zhen", "Fu", "Xian", "Zhe", "Wu", "Fu", "Li", "Lang", "Bi", "Chu", "Yuan", "You", "Jie", "Dan", "Yan", "Ting", "Dian", "Shui", "Hui", "Gua", "Zhi", "Song", "Fei", "Ju", "Mi", "Qi", "Qi", "Yu", "Jun", "Zha", "Meng", "Qiang", "Si", "Xi", "Lun", "Li", "Die", "Tiao", "Tao", "Kun", "Gan", "Han", "Yu", "Bang", "Fei", "Pi", "Wei", "Dun", "Yi", "Yuan", "Su", "Quan", "Qian", "Rui", "Ni", "Qing", "Wei", "Liang", "Guo", "Wan", "Dong", "E", "Ban", "Di", "Wang", "Can", "Yang", "Ying", "Guo", "Chan", null, "La", "Ke", "Ji", "He", "Ting", "Mai", "Xu", "Mian", "Yu", "Jie", "Shi", "Xuan", "Huang", "Yan", "Bian", "Rou", "Wei", "Fu", "Yuan", "Mei", "Wei", "Fu", "Ruan", "Xie", "You", "Qiu", "Mao", "Xia", "Ying", "Shi", "Chong", "Tang", "Zhu", "Zong", "Ti", "Fu", "Yuan", "Hui", "Meng", "La", "Du", "Hu", "Qiu", "Die", "Li", "Gua", "Yun", "Ju", "Nan", "Lou", "Qun", "Rong", "Ying", "Jiang", null, "Lang", "Pang", "Si", "Xi", "Ci", "Xi", "Yuan", "Weng", "Lian", "Sou", "Ban", "Rong", "Rong", "Ji", "Wu", "Qiu", "Han", "Qin", "Yi", "Bi", "Hua", "Tang", "Yi", "Du", "Nai", "He", "Hu", "Hui", "Ma", "Ming", "Yi", "Wen", "Ying", "Teng", "Yu", "Cang", "So", "Ebi", "Man", null, "Shang", "Zhe", "Cao", "Chi", "Di", "Ao", "Lu", "Wei", "Zhi", "Tang", "Chen", "Piao", "Qu", "Pi", "Yu", "Jian", "Luo", "Lou", "Qin", "Zhong", "Yin", "Jiang", "Shuai", "Wen", "Jiao", "Wan", "Zhi", "Zhe", "Ma", "Ma", "Guo", "Liu", "Mao", "Xi", "Cong", "Li", "Man", "Xiao", "Kamakiri", "Zhang", "Mang", "Xiang", "Mo", "Zui", "Si", "Qiu", "Te", "Zhi", "Peng", "Peng", "Jiao", "Qu", "Bie", "Liao", "Pan", "Gui", "Xi", "Ji", "Zhuan", "Huang", "Fei", "Lao", "Jue", "Jue", "Hui", "Yin", "Chan", "Jiao", "Shan", "Rao", "Xiao", "Mou", "Chong", "Xun", "Si", null, "Cheng", "Dang", "Li", "Xie", "Shan", "Yi", "Jing", "Da", "Chan", "Qi"], fo = ["Ci", "Xiang", "She", "Luo", "Qin", "Ying", "Chai", "Li", "Ze", "Xuan", "Lian", "Zhu", "Ze", "Xie", "Mang", "Xie", "Qi", "Rong", "Jian", "Meng", "Hao", "Ruan", "Huo", "Zhuo", "Jie", "Bin", "He", "Mie", "Fan", "Lei", "Jie", "La", "Mi", "Li", "Chun", "Li", "Qiu", "Nie", "Lu", "Du", "Xiao", "Zhu", "Long", "Li", "Long", "Feng", "Ye", "Beng", "Shang", "Gu", "Juan", "Ying", null, "Xi", "Can", "Qu", "Quan", "Du", "Can", "Man", "Jue", "Jie", "Zhu", "Zha", "Xie", "Huang", "Niu", "Pei", "Nu", "Xin", "Zhong", "Mo", "Er", "Ke", "Mie", "Xi", "Xing", "Yan", "Kan", "Yuan", null, "Ling", "Xuan", "Shu", "Xian", "Tong", "Long", "Jie", "Xian", "Ya", "Hu", "Wei", "Dao", "Chong", "Wei", "Dao", "Zhun", "Heng", "Qu", "Yi", "Yi", "Bu", "Gan", "Yu", "Biao", "Cha", "Yi", "Shan", "Chen", "Fu", "Gun", "Fen", "Shuai", "Jie", "Na", "Zhong", "Dan", "Ri", "Zhong", "Zhong", "Xie", "Qi", "Xie", "Ran", "Zhi", "Ren", "Qin", "Jin", "Jun", "Yuan", "Mei", "Chai", "Ao", "Niao", "Hui", "Ran", "Jia", "Tuo", "Ling", "Dai", "Bao", "Pao", "Yao", "Zuo", "Bi", "Shao", "Tan", "Ju", "He", "Shu", "Xiu", "Zhen", "Yi", "Pa", "Bo", "Di", "Wa", "Fu", "Gun", "Zhi", "Zhi", "Ran", "Pan", "Yi", "Mao", "Tuo", "Na", "Kou", "Xian", "Chan", "Qu", "Bei", "Gun", "Xi", "Ne", "Bo", "Horo", "Fu", "Yi", "Chi", "Ku", "Ren", "Jiang", "Jia", "Cun", "Mo", "Jie", "Er", "Luo", "Ru", "Zhu", "Gui", "Yin", "Cai", "Lie", "Kamishimo", "Yuki", "Zhuang", "Dang", null, "Kun", "Ken", "Niao", "Shu", "Jia", "Kun", "Cheng", "Li", "Juan", "Shen", "Pou", "Ge", "Yi", "Yu", "Zhen", "Liu", "Qiu", "Qun", "Ji", "Yi", "Bu", "Zhuang", "Shui", "Sha", "Qun", "Li", "Lian", "Lian", "Ku", "Jian", "Fou", "Chan", "Bi", "Gun", "Tao", "Yuan", "Ling", "Chi", "Chang", "Chou", "Duo", "Biao", "Liang", "Chang", "Pei", "Pei", "Fei", "Yuan", "Luo", "Guo", "Yan", "Du", "Xi", "Zhi", "Ju", "Qi"], Do = ["Ji", "Zhi", "Gua", "Ken", "Che", "Ti", "Ti", "Fu", "Chong", "Xie", "Bian", "Die", "Kun", "Duan", "Xiu", "Xiu", "He", "Yuan", "Bao", "Bao", "Fu", "Yu", "Tuan", "Yan", "Hui", "Bei", "Chu", "Lu", "Ena", "Hitoe", "Yun", "Da", "Gou", "Da", "Huai", "Rong", "Yuan", "Ru", "Nai", "Jiong", "Suo", "Ban", "Tun", "Chi", "Sang", "Niao", "Ying", "Jie", "Qian", "Huai", "Ku", "Lian", "Bao", "Li", "Zhe", "Shi", "Lu", "Yi", "Die", "Xie", "Xian", "Wei", "Biao", "Cao", "Ji", "Jiang", "Sen", "Bao", "Xiang", "Chihaya", "Pu", "Jian", "Zhuan", "Jian", "Zui", "Ji", "Dan", "Za", "Fan", "Bo", "Xiang", "Xin", "Bie", "Rao", "Man", "Lan", "Ao", "Duo", "Gui", "Cao", "Sui", "Nong", "Chan", "Lian", "Bi", "Jin", "Dang", "Shu", "Tan", "Bi", "Lan", "Pu", "Ru", "Zhi", null, "Shu", "Wa", "Shi", "Bai", "Xie", "Bo", "Chen", "Lai", "Long", "Xi", "Xian", "Lan", "Zhe", "Dai", "Tasuki", "Zan", "Shi", "Jian", "Pan", "Yi", "Ran", "Ya", "Xi", "Xi", "Yao", "Feng", "Tan", null, "Biao", "Fu", "Ba", "He", "Ji", "Ji", "Jian", "Guan", "Bian", "Yan", "Gui", "Jue", "Pian", "Mao", "Mi", "Mi", "Mie", "Shi", "Si", "Zhan", "Luo", "Jue", "Mi", "Tiao", "Lian", "Yao", "Zhi", "Jun", "Xi", "Shan", "Wei", "Xi", "Tian", "Yu", "Lan", "E", "Du", "Qin", "Pang", "Ji", "Ming", "Ying", "Gou", "Qu", "Zhan", "Jin", "Guan", "Deng", "Jian", "Luo", "Qu", "Jian", "Wei", "Jue", "Qu", "Luo", "Lan", "Shen", "Di", "Guan", "Jian", "Guan", "Yan", "Gui", "Mi", "Shi", "Zhan", "Lan", "Jue", "Ji", "Xi", "Di", "Tian", "Yu", "Gou", "Jin", "Qu", "Jiao", "Jiu", "Jin", "Cu", "Jue", "Zhi", "Chao", "Ji", "Gu", "Dan", "Zui", "Di", "Shang", "Hua", "Quan", "Ge", "Chi", "Jie", "Gui", "Gong", "Chu", "Jie", "Hun", "Qiu", "Xing", "Su", "Ni", "Ji", "Lu", "Zhi", "Zha", "Bi", "Xing", "Hu", "Shang", "Gong", "Zhi", "Xue", "Chu", "Xi", "Yi", "Lu", "Jue", "Xi", "Yan", "Xi"], Xo = ["Yan", "Yan", "Ding", "Fu", "Qiu", "Qiu", "Jiao", "Hong", "Ji", "Fan", "Xun", "Diao", "Hong", "Cha", "Tao", "Xu", "Jie", "Yi", "Ren", "Xun", "Yin", "Shan", "Qi", "Tuo", "Ji", "Xun", "Yin", "E", "Fen", "Ya", "Yao", "Song", "Shen", "Yin", "Xin", "Jue", "Xiao", "Ne", "Chen", "You", "Zhi", "Xiong", "Fang", "Xin", "Chao", "She", "Xian", "Sha", "Tun", "Xu", "Yi", "Yi", "Su", "Chi", "He", "Shen", "He", "Xu", "Zhen", "Zhu", "Zheng", "Gou", "Zi", "Zi", "Zhan", "Gu", "Fu", "Quan", "Die", "Ling", "Di", "Yang", "Li", "Nao", "Pan", "Zhou", "Gan", "Yi", "Ju", "Ao", "Zha", "Tuo", "Yi", "Qu", "Zhao", "Ping", "Bi", "Xiong", "Qu", "Ba", "Da", "Zu", "Tao", "Zhu", "Ci", "Zhe", "Yong", "Xu", "Xun", "Yi", "Huang", "He", "Shi", "Cha", "Jiao", "Shi", "Hen", "Cha", "Gou", "Gui", "Quan", "Hui", "Jie", "Hua", "Gai", "Xiang", "Wei", "Shen", "Chou", "Tong", "Mi", "Zhan", "Ming", "E", "Hui", "Yan", "Xiong", "Gua", "Er", "Beng", "Tiao", "Chi", "Lei", "Zhu", "Kuang", "Kua", "Wu", "Yu", "Teng", "Ji", "Zhi", "Ren", "Su", "Lang", "E", "Kuang", "E", "Shi", "Ting", "Dan", "Bo", "Chan", "You", "Heng", "Qiao", "Qin", "Shua", "An", "Yu", "Xiao", "Cheng", "Jie", "Xian", "Wu", "Wu", "Gao", "Song", "Pu", "Hui", "Jing", "Shuo", "Zhen", "Shuo", "Du", "Yasashi", "Chang", "Shui", "Jie", "Ke", "Qu", "Cong", "Xiao", "Sui", "Wang", "Xuan", "Fei", "Chi", "Ta", "Yi", "Na", "Yin", "Diao", "Pi", "Chuo", "Chan", "Chen", "Zhun", "Ji", "Qi", "Tan", "Zhui", "Wei", "Ju", "Qing", "Jian", "Zheng", "Ze", "Zou", "Qian", "Zhuo", "Liang", "Jian", "Zhu", "Hao", "Lun", "Shen", "Biao", "Huai", "Pian", "Yu", "Die", "Xu", "Pian", "Shi", "Xuan", "Shi", "Hun", "Hua", "E", "Zhong", "Di", "Xie", "Fu", "Pu", "Ting", "Jian", "Qi", "Yu", "Zi", "Chuan", "Xi", "Hui", "Yin", "An", "Xian", "Nan", "Chen", "Feng", "Zhu", "Yang", "Yan", "Heng", "Xuan", "Ge", "Nuo", "Qi"], po = ["Mou", "Ye", "Wei", null, "Teng", "Zou", "Shan", "Jian", "Bo", "Ku", "Huang", "Huo", "Ge", "Ying", "Mi", "Xiao", "Mi", "Xi", "Qiang", "Chen", "Nue", "Ti", "Su", "Bang", "Chi", "Qian", "Shi", "Jiang", "Yuan", "Xie", "Xue", "Tao", "Yao", "Yao", null, "Yu", "Biao", "Cong", "Qing", "Li", "Mo", "Mo", "Shang", "Zhe", "Miu", "Jian", "Ze", "Jie", "Lian", "Lou", "Can", "Ou", "Guan", "Xi", "Zhuo", "Ao", "Ao", "Jin", "Zhe", "Yi", "Hu", "Jiang", "Man", "Chao", "Han", "Hua", "Chan", "Xu", "Zeng", "Se", "Xi", "She", "Dui", "Zheng", "Nao", "Lan", "E", "Ying", "Jue", "Ji", "Zun", "Jiao", "Bo", "Hui", "Zhuan", "Mu", "Zen", "Zha", "Shi", "Qiao", "Tan", "Zen", "Pu", "Sheng", "Xuan", "Zao", "Tan", "Dang", "Sui", "Qian", "Ji", "Jiao", "Jing", "Lian", "Nou", "Yi", "Ai", "Zhan", "Pi", "Hui", "Hua", "Yi", "Yi", "Shan", "Rang", "Nou", "Qian", "Zhui", "Ta", "Hu", "Zhou", "Hao", "Ye", "Ying", "Jian", "Yu", "Jian", "Hui", "Du", "Zhe", "Xuan", "Zan", "Lei", "Shen", "Wei", "Chan", "Li", "Yi", "Bian", "Zhe", "Yan", "E", "Chou", "Wei", "Chou", "Yao", "Chan", "Rang", "Yin", "Lan", "Chen", "Huo", "Zhe", "Huan", "Zan", "Yi", "Dang", "Zhan", "Yan", "Du", "Yan", "Ji", "Ding", "Fu", "Ren", "Ji", "Jie", "Hong", "Tao", "Rang", "Shan", "Qi", "Tuo", "Xun", "Yi", "Xun", "Ji", "Ren", "Jiang", "Hui", "Ou", "Ju", "Ya", "Ne", "Xu", "E", "Lun", "Xiong", "Song", "Feng", "She", "Fang", "Jue", "Zheng", "Gu", "He", "Ping", "Zu", "Shi", "Xiong", "Zha", "Su", "Zhen", "Di", "Zou", "Ci", "Qu", "Zhao", "Bi", "Yi", "Yi", "Kuang", "Lei", "Shi", "Gua", "Shi", "Jie", "Hui", "Cheng", "Zhu", "Shen", "Hua", "Dan", "Gou", "Quan", "Gui", "Xun", "Yi", "Zheng", "Gai", "Xiang", "Cha", "Hun", "Xu", "Zhou", "Jie", "Wu", "Yu", "Qiao", "Wu", "Gao", "You", "Hui", "Kuang", "Shuo", "Song", "Ai", "Qing", "Zhu", "Zou", "Nuo", "Du", "Zhuo", "Fei", "Ke", "Wei"], To = ["Yu", "Shui", "Shen", "Diao", "Chan", "Liang", "Zhun", "Sui", "Tan", "Shen", "Yi", "Mou", "Chen", "Die", "Huang", "Jian", "Xie", "Nue", "Ye", "Wei", "E", "Yu", "Xuan", "Chan", "Zi", "An", "Yan", "Di", "Mi", "Pian", "Xu", "Mo", "Dang", "Su", "Xie", "Yao", "Bang", "Shi", "Qian", "Mi", "Jin", "Man", "Zhe", "Jian", "Miu", "Tan", "Zen", "Qiao", "Lan", "Pu", "Jue", "Yan", "Qian", "Zhan", "Chen", "Gu", "Qian", "Hong", "Xia", "Jue", "Hong", "Han", "Hong", "Xi", "Xi", "Huo", "Liao", "Han", "Du", "Long", "Dou", "Jiang", "Qi", "Shi", "Li", "Deng", "Wan", "Bi", "Shu", "Xian", "Feng", "Zhi", "Zhi", "Yan", "Yan", "Shi", "Chu", "Hui", "Tun", "Yi", "Tun", "Yi", "Jian", "Ba", "Hou", "E", "Cu", "Xiang", "Huan", "Jian", "Ken", "Gai", "Qu", "Fu", "Xi", "Bin", "Hao", "Yu", "Zhu", "Jia", null, "Xi", "Bo", "Wen", "Huan", "Bin", "Di", "Zong", "Fen", "Yi", "Zhi", "Bao", "Chai", "Han", "Pi", "Na", "Pi", "Gou", "Na", "You", "Diao", "Mo", "Si", "Xiu", "Huan", "Kun", "He", "He", "Mo", "Han", "Mao", "Li", "Ni", "Bi", "Yu", "Jia", "Tuan", "Mao", "Pi", "Xi", "E", "Ju", "Mo", "Chu", "Tan", "Huan", "Jue", "Bei", "Zhen", "Yuan", "Fu", "Cai", "Gong", "Te", "Yi", "Hang", "Wan", "Pin", "Huo", "Fan", "Tan", "Guan", "Ze", "Zhi", "Er", "Zhu", "Shi", "Bi", "Zi", "Er", "Gui", "Pian", "Bian", "Mai", "Dai", "Sheng", "Kuang", "Fei", "Tie", "Yi", "Chi", "Mao", "He", "Bi", "Lu", "Ren", "Hui", "Gai", "Pian", "Zi", "Jia", "Xu", "Zei", "Jiao", "Gai", "Zang", "Jian", "Ying", "Xun", "Zhen", "She", "Bin", "Bin", "Qiu", "She", "Chuan", "Zang", "Zhou", "Lai", "Zan", "Si", "Chen", "Shang", "Tian", "Pei", "Geng", "Xian", "Mai", "Jian", "Sui", "Fu", "Tan", "Cong", "Cong", "Zhi", "Ji", "Zhang", "Du", "Jin", "Xiong", "Shun", "Yun", "Bao", "Zai", "Lai", "Feng", "Cang", "Ji", "Sheng", "Ai", "Zhuan", "Fu", "Gou", "Sai", "Ze", "Liao"], Ho = ["Wei", "Bai", "Chen", "Zhuan", "Zhi", "Zhui", "Biao", "Yun", "Zeng", "Tan", "Zan", "Yan", null, "Shan", "Wan", "Ying", "Jin", "Gan", "Xian", "Zang", "Bi", "Du", "Shu", "Yan", null, "Xuan", "Long", "Gan", "Zang", "Bei", "Zhen", "Fu", "Yuan", "Gong", "Cai", "Ze", "Xian", "Bai", "Zhang", "Huo", "Zhi", "Fan", "Tan", "Pin", "Bian", "Gou", "Zhu", "Guan", "Er", "Jian", "Bi", "Shi", "Tie", "Gui", "Kuang", "Dai", "Mao", "Fei", "He", "Yi", "Zei", "Zhi", "Jia", "Hui", "Zi", "Ren", "Lu", "Zang", "Zi", "Gai", "Jin", "Qiu", "Zhen", "Lai", "She", "Fu", "Du", "Ji", "Shu", "Shang", "Si", "Bi", "Zhou", "Geng", "Pei", "Tan", "Lai", "Feng", "Zhui", "Fu", "Zhuan", "Sai", "Ze", "Yan", "Zan", "Yun", "Zeng", "Shan", "Ying", "Gan", "Chi", "Xi", "She", "Nan", "Xiong", "Xi", "Cheng", "He", "Cheng", "Zhe", "Xia", "Tang", "Zou", "Zou", "Li", "Jiu", "Fu", "Zhao", "Gan", "Qi", "Shan", "Qiong", "Qin", "Xian", "Ci", "Jue", "Qin", "Chi", "Ci", "Chen", "Chen", "Die", "Ju", "Chao", "Di", "Se", "Zhan", "Zhu", "Yue", "Qu", "Jie", "Chi", "Chu", "Gua", "Xue", "Ci", "Tiao", "Duo", "Lie", "Gan", "Suo", "Cu", "Xi", "Zhao", "Su", "Yin", "Ju", "Jian", "Que", "Tang", "Chuo", "Cui", "Lu", "Qu", "Dang", "Qiu", "Zi", "Ti", "Qu", "Chi", "Huang", "Qiao", "Qiao", "Yao", "Zao", "Ti", null, "Zan", "Zan", "Zu", "Pa", "Bao", "Ku", "Ke", "Dun", "Jue", "Fu", "Chen", "Jian", "Fang", "Zhi", "Sa", "Yue", "Pa", "Qi", "Yue", "Qiang", "Tuo", "Tai", "Yi", "Nian", "Ling", "Mei", "Ba", "Die", "Ku", "Tuo", "Jia", "Ci", "Pao", "Qia", "Zhu", "Ju", "Die", "Zhi", "Fu", "Pan", "Ju", "Shan", "Bo", "Ni", "Ju", "Li", "Gen", "Yi", "Ji", "Dai", "Xian", "Jiao", "Duo", "Zhu", "Zhuan", "Kua", "Zhuai", "Gui", "Qiong", "Kui", "Xiang", "Chi", "Lu", "Beng", "Zhi", "Jia", "Tiao", "Cai", "Jian", "Ta", "Qiao", "Bi", "Xian", "Duo", "Ji", "Ju", "Ji", "Shu", "Tu"], _o = ["Chu", "Jing", "Nie", "Xiao", "Bo", "Chi", "Qun", "Mou", "Shu", "Lang", "Yong", "Jiao", "Chou", "Qiao", null, "Ta", "Jian", "Qi", "Wo", "Wei", "Zhuo", "Jie", "Ji", "Nie", "Ju", "Ju", "Lun", "Lu", "Leng", "Huai", "Ju", "Chi", "Wan", "Quan", "Ti", "Bo", "Zu", "Qie", "Ji", "Cu", "Zong", "Cai", "Zong", "Peng", "Zhi", "Zheng", "Dian", "Zhi", "Yu", "Duo", "Dun", "Chun", "Yong", "Zhong", "Di", "Zhe", "Chen", "Chuai", "Jian", "Gua", "Tang", "Ju", "Fu", "Zu", "Die", "Pian", "Rou", "Nuo", "Ti", "Cha", "Tui", "Jian", "Dao", "Cuo", "Xi", "Ta", "Qiang", "Zhan", "Dian", "Ti", "Ji", "Nie", "Man", "Liu", "Zhan", "Bi", "Chong", "Lu", "Liao", "Cu", "Tang", "Dai", "Suo", "Xi", "Kui", "Ji", "Zhi", "Qiang", "Di", "Man", "Zong", "Lian", "Beng", "Zao", "Nian", "Bie", "Tui", "Ju", "Deng", "Ceng", "Xian", "Fan", "Chu", "Zhong", "Dun", "Bo", "Cu", "Zu", "Jue", "Jue", "Lin", "Ta", "Qiao", "Qiao", "Pu", "Liao", "Dun", "Cuan", "Kuang", "Zao", "Ta", "Bi", "Bi", "Zhu", "Ju", "Chu", "Qiao", "Dun", "Chou", "Ji", "Wu", "Yue", "Nian", "Lin", "Lie", "Zhi", "Li", "Zhi", "Chan", "Chu", "Duan", "Wei", "Long", "Lin", "Xian", "Wei", "Zuan", "Lan", "Xie", "Rang", "Xie", "Nie", "Ta", "Qu", "Jie", "Cuan", "Zuan", "Xi", "Kui", "Jue", "Lin", "Shen", "Gong", "Dan", "Segare", "Qu", "Ti", "Duo", "Duo", "Gong", "Lang", "Nerau", "Luo", "Ai", "Ji", "Ju", "Tang", "Utsuke", null, "Yan", "Shitsuke", "Kang", "Qu", "Lou", "Lao", "Tuo", "Zhi", "Yagate", "Ti", "Dao", "Yagate", "Yu", "Che", "Ya", "Gui", "Jun", "Wei", "Yue", "Xin", "Di", "Xuan", "Fan", "Ren", "Shan", "Qiang", "Shu", "Tun", "Chen", "Dai", "E", "Na", "Qi", "Mao", "Ruan", "Ren", "Fan", "Zhuan", "Hong", "Hu", "Qu", "Huang", "Di", "Ling", "Dai", "Ao", "Zhen", "Fan", "Kuang", "Ang", "Peng", "Bei", "Gu", "Ku", "Pao", "Zhu", "Rong", "E", "Ba", "Zhou", "Zhi", "Yao", "Ke", "Yi", "Qing", "Shi", "Ping"], Qo = ["Er", "Qiong", "Ju", "Jiao", "Guang", "Lu", "Kai", "Quan", "Zhou", "Zai", "Zhi", "She", "Liang", "Yu", "Shao", "You", "Huan", "Yun", "Zhe", "Wan", "Fu", "Qing", "Zhou", "Ni", "Ling", "Zhe", "Zhan", "Liang", "Zi", "Hui", "Wang", "Chuo", "Guo", "Kan", "Yi", "Peng", "Qian", "Gun", "Nian", "Pian", "Guan", "Bei", "Lun", "Pai", "Liang", "Ruan", "Rou", "Ji", "Yang", "Xian", "Chuan", "Cou", "Qun", "Ge", "You", "Hong", "Shu", "Fu", "Zi", "Fu", "Wen", "Ben", "Zhan", "Yu", "Wen", "Tao", "Gu", "Zhen", "Xia", "Yuan", "Lu", "Jiu", "Chao", "Zhuan", "Wei", "Hun", "Sori", "Che", "Jiao", "Zhan", "Pu", "Lao", "Fen", "Fan", "Lin", "Ge", "Se", "Kan", "Huan", "Yi", "Ji", "Dui", "Er", "Yu", "Xian", "Hong", "Lei", "Pei", "Li", "Li", "Lu", "Lin", "Che", "Ya", "Gui", "Xuan", "Di", "Ren", "Zhuan", "E", "Lun", "Ruan", "Hong", "Ku", "Ke", "Lu", "Zhou", "Zhi", "Yi", "Hu", "Zhen", "Li", "Yao", "Qing", "Shi", "Zai", "Zhi", "Jiao", "Zhou", "Quan", "Lu", "Jiao", "Zhe", "Fu", "Liang", "Nian", "Bei", "Hui", "Gun", "Wang", "Liang", "Chuo", "Zi", "Cou", "Fu", "Ji", "Wen", "Shu", "Pei", "Yuan", "Xia", "Zhan", "Lu", "Che", "Lin", "Xin", "Gu", "Ci", "Ci", "Pi", "Zui", "Bian", "La", "La", "Ci", "Xue", "Ban", "Bian", "Bian", "Bian", null, "Bian", "Ban", "Ci", "Bian", "Bian", "Chen", "Ru", "Nong", "Nong", "Zhen", "Chuo", "Chuo", "Suberu", "Reng", "Bian", "Bian", "Sip", "Ip", "Liao", "Da", "Chan", "Gan", "Qian", "Yu", "Yu", "Qi", "Xun", "Yi", "Guo", "Mai", "Qi", "Za", "Wang", "Jia", "Zhun", "Ying", "Ti", "Yun", "Jin", "Hang", "Ya", "Fan", "Wu", "Da", "E", "Huan", "Zhe", "Totemo", "Jin", "Yuan", "Wei", "Lian", "Chi", "Che", "Ni", "Tiao", "Zhi", "Yi", "Jiong", "Jia", "Chen", "Dai", "Er", "Di", "Po", "Wang", "Die", "Ze", "Tao", "Shu", "Tuo", "Kep", "Jing", "Hui", "Tong", "You", "Mi", "Beng", "Ji", "Nai", "Yi", "Jie", "Zhui", "Lie", "Xun"], yo = ["Tui", "Song", "Gua", "Tao", "Pang", "Hou", "Ni", "Dun", "Jiong", "Xuan", "Xun", "Bu", "You", "Xiao", "Qiu", "Tou", "Zhu", "Qiu", "Di", "Di", "Tu", "Jing", "Ti", "Dou", "Yi", "Zhe", "Tong", "Guang", "Wu", "Shi", "Cheng", "Su", "Zao", "Qun", "Feng", "Lian", "Suo", "Hui", "Li", "Sako", "Lai", "Ben", "Cuo", "Jue", "Beng", "Huan", "Dai", "Lu", "You", "Zhou", "Jin", "Yu", "Chuo", "Kui", "Wei", "Ti", "Yi", "Da", "Yuan", "Luo", "Bi", "Nuo", "Yu", "Dang", "Sui", "Dun", "Sui", "Yan", "Chuan", "Chi", "Ti", "Yu", "Shi", "Zhen", "You", "Yun", "E", "Bian", "Guo", "E", "Xia", "Huang", "Qiu", "Dao", "Da", "Wei", "Appare", "Yi", "Gou", "Yao", "Chu", "Liu", "Xun", "Ta", "Di", "Chi", "Yuan", "Su", "Ta", "Qian", null, "Yao", "Guan", "Zhang", "Ao", "Shi", "Ce", "Chi", "Su", "Zao", "Zhe", "Dun", "Di", "Lou", "Chi", "Cuo", "Lin", "Zun", "Rao", "Qian", "Xuan", "Yu", "Yi", "Wu", "Liao", "Ju", "Shi", "Bi", "Yao", "Mai", "Xie", "Sui", "Huan", "Zhan", "Teng", "Er", "Miao", "Bian", "Bian", "La", "Li", "Yuan", "Yao", "Luo", "Li", "Yi", "Ting", "Deng", "Qi", "Yong", "Shan", "Han", "Yu", "Mang", "Ru", "Qiong", null, "Kuang", "Fu", "Kang", "Bin", "Fang", "Xing", "Na", "Xin", "Shen", "Bang", "Yuan", "Cun", "Huo", "Xie", "Bang", "Wu", "Ju", "You", "Han", "Tai", "Qiu", "Bi", "Pei", "Bing", "Shao", "Bei", "Wa", "Di", "Zou", "Ye", "Lin", "Kuang", "Gui", "Zhu", "Shi", "Ku", "Yu", "Gai", "Ge", "Xi", "Zhi", "Ji", "Xun", "Hou", "Xing", "Jiao", "Xi", "Gui", "Nuo", "Lang", "Jia", "Kuai", "Zheng", "Otoko", "Yun", "Yan", "Cheng", "Dou", "Chi", "Lu", "Fu", "Wu", "Fu", "Gao", "Hao", "Lang", "Jia", "Geng", "Jun", "Ying", "Bo", "Xi", "Bei", "Li", "Yun", "Bu", "Xiao", "Qi", "Pi", "Qing", "Guo", "Zhou", "Tan", "Zou", "Ping", "Lai", "Ni", "Chen", "You", "Bu", "Xiang", "Dan", "Ju", "Yong", "Qiao", "Yi", "Du", "Yan", "Mei"], Mo = ["Ruo", "Bei", "E", "Yu", "Juan", "Yu", "Yun", "Hou", "Kui", "Xiang", "Xiang", "Sou", "Tang", "Ming", "Xi", "Ru", "Chu", "Zi", "Zou", "Ju", "Wu", "Xiang", "Yun", "Hao", "Yong", "Bi", "Mo", "Chao", "Fu", "Liao", "Yin", "Zhuan", "Hu", "Qiao", "Yan", "Zhang", "Fan", "Qiao", "Xu", "Deng", "Bi", "Xin", "Bi", "Ceng", "Wei", "Zheng", "Mao", "Shan", "Lin", "Po", "Dan", "Meng", "Ye", "Cao", "Kuai", "Feng", "Meng", "Zou", "Kuang", "Lian", "Zan", "Chan", "You", "Qi", "Yan", "Chan", "Zan", "Ling", "Huan", "Xi", "Feng", "Zan", "Li", "You", "Ding", "Qiu", "Zhuo", "Pei", "Zhou", "Yi", "Hang", "Yu", "Jiu", "Yan", "Zui", "Mao", "Dan", "Xu", "Tou", "Zhen", "Fen", "Sakenomoto", null, "Yun", "Tai", "Tian", "Qia", "Tuo", "Zuo", "Han", "Gu", "Su", "Po", "Chou", "Zai", "Ming", "Luo", "Chuo", "Chou", "You", "Tong", "Zhi", "Xian", "Jiang", "Cheng", "Yin", "Tu", "Xiao", "Mei", "Ku", "Suan", "Lei", "Pu", "Zui", "Hai", "Yan", "Xi", "Niang", "Wei", "Lu", "Lan", "Yan", "Tao", "Pei", "Zhan", "Chun", "Tan", "Zui", "Chuo", "Cu", "Kun", "Ti", "Mian", "Du", "Hu", "Xu", "Xing", "Tan", "Jiu", "Chun", "Yun", "Po", "Ke", "Sou", "Mi", "Quan", "Chou", "Cuo", "Yun", "Yong", "Ang", "Zha", "Hai", "Tang", "Jiang", "Piao", "Shan", "Yu", "Li", "Zao", "Lao", "Yi", "Jiang", "Pu", "Jiao", "Xi", "Tan", "Po", "Nong", "Yi", "Li", "Ju", "Jiao", "Yi", "Niang", "Ru", "Xun", "Chou", "Yan", "Ling", "Mi", "Mi", "Niang", "Xin", "Jiao", "Xi", "Mi", "Yan", "Bian", "Cai", "Shi", "You", "Shi", "Shi", "Li", "Chong", "Ye", "Liang", "Li", "Jin", "Jin", "Qiu", "Yi", "Diao", "Dao", "Zhao", "Ding", "Po", "Qiu", "He", "Fu", "Zhen", "Zhi", "Ba", "Luan", "Fu", "Nai", "Diao", "Shan", "Qiao", "Kou", "Chuan", "Zi", "Fan", "Yu", "Hua", "Han", "Gong", "Qi", "Mang", "Ri", "Di", "Si", "Xi", "Yi", "Chai", "Shi", "Tu", "Xi", "Nu", "Qian", "Ishiyumi", "Jian", "Pi", "Ye", "Yin"], mo = ["Ba", "Fang", "Chen", "Xing", "Tou", "Yue", "Yan", "Fu", "Pi", "Na", "Xin", "E", "Jue", "Dun", "Gou", "Yin", "Qian", "Ban", "Ji", "Ren", "Chao", "Niu", "Fen", "Yun", "Ji", "Qin", "Pi", "Guo", "Hong", "Yin", "Jun", "Shi", "Yi", "Zhong", "Nie", "Gai", "Ri", "Huo", "Tai", "Kang", "Habaki", "Irori", "Ngaak", null, "Duo", "Zi", "Ni", "Tu", "Shi", "Min", "Gu", "E", "Ling", "Bing", "Yi", "Gu", "Ba", "Pi", "Yu", "Si", "Zuo", "Bu", "You", "Dian", "Jia", "Zhen", "Shi", "Shi", "Tie", "Ju", "Zhan", "Shi", "She", "Xuan", "Zhao", "Bao", "He", "Bi", "Sheng", "Chu", "Shi", "Bo", "Zhu", "Chi", "Za", "Po", "Tong", "Qian", "Fu", "Zhai", "Liu", "Qian", "Fu", "Li", "Yue", "Pi", "Yang", "Ban", "Bo", "Jie", "Gou", "Shu", "Zheng", "Mu", "Ni", "Nie", "Di", "Jia", "Mu", "Dan", "Shen", "Yi", "Si", "Kuang", "Ka", "Bei", "Jian", "Tong", "Xing", "Hong", "Jiao", "Chi", "Er", "Ge", "Bing", "Shi", "Mou", "Jia", "Yin", "Jun", "Zhou", "Chong", "Shang", "Tong", "Mo", "Lei", "Ji", "Yu", "Xu", "Ren", "Zun", "Zhi", "Qiong", "Shan", "Chi", "Xian", "Xing", "Quan", "Pi", "Tie", "Zhu", "Hou", "Ming", "Kua", "Yao", "Xian", "Xian", "Xiu", "Jun", "Cha", "Lao", "Ji", "Pi", "Ru", "Mi", "Yi", "Yin", "Guang", "An", "Diou", "You", "Se", "Kao", "Qian", "Luan", "Kasugai", "Ai", "Diao", "Han", "Rui", "Shi", "Keng", "Qiu", "Xiao", "Zhe", "Xiu", "Zang", "Ti", "Cuo", "Gua", "Gong", "Zhong", "Dou", "Lu", "Mei", "Lang", "Wan", "Xin", "Yun", "Bei", "Wu", "Su", "Yu", "Chan", "Ting", "Bo", "Han", "Jia", "Hong", "Cuan", "Feng", "Chan", "Wan", "Zhi", "Si", "Xuan", "Wu", "Wu", "Tiao", "Gong", "Zhuo", "Lue", "Xing", "Qian", "Shen", "Han", "Lue", "Xie", "Chu", "Zheng", "Ju", "Xian", "Tie", "Mang", "Pu", "Li", "Pan", "Rui", "Cheng", "Gao", "Li", "Te", "Pyeng", "Zhu", null, "Tu", "Liu", "Zui", "Ju", "Chang", "Yuan", "Jian", "Gang", "Diao", "Tao", "Chang"], wo = ["Lun", "Kua", "Ling", "Bei", "Lu", "Li", "Qiang", "Pou", "Juan", "Min", "Zui", "Peng", "An", "Pi", "Xian", "Ya", "Zhui", "Lei", "A", "Kong", "Ta", "Kun", "Du", "Wei", "Chui", "Zi", "Zheng", "Ben", "Nie", "Cong", "Qun", "Tan", "Ding", "Qi", "Qian", "Zhuo", "Qi", "Yu", "Jin", "Guan", "Mao", "Chang", "Tian", "Xi", "Lian", "Tao", "Gu", "Cuo", "Shu", "Zhen", "Lu", "Meng", "Lu", "Hua", "Biao", "Ga", "Lai", "Ken", "Kazari", "Bu", "Nai", "Wan", "Zan", null, "De", "Xian", null, "Huo", "Liang", null, "Men", "Kai", "Ying", "Di", "Lian", "Guo", "Xian", "Du", "Tu", "Wei", "Cong", "Fu", "Rou", "Ji", "E", "Rou", "Chen", "Ti", "Zha", "Hong", "Yang", "Duan", "Xia", "Yu", "Keng", "Xing", "Huang", "Wei", "Fu", "Zhao", "Cha", "Qie", "She", "Hong", "Kui", "Tian", "Mou", "Qiao", "Qiao", "Hou", "Tou", "Cong", "Huan", "Ye", "Min", "Jian", "Duan", "Jian", "Song", "Kui", "Hu", "Xuan", "Duo", "Jie", "Zhen", "Bian", "Zhong", "Zi", "Xiu", "Ye", "Mei", "Pai", "Ai", "Jie", null, "Mei", "Chuo", "Ta", "Bang", "Xia", "Lian", "Suo", "Xi", "Liu", "Zu", "Ye", "Nou", "Weng", "Rong", "Tang", "Suo", "Qiang", "Ge", "Shuo", "Chui", "Bo", "Pan", "Sa", "Bi", "Sang", "Gang", "Zi", "Wu", "Ying", "Huang", "Tiao", "Liu", "Kai", "Sun", "Sha", "Sou", "Wan", "Hao", "Zhen", "Zhen", "Luo", "Yi", "Yuan", "Tang", "Nie", "Xi", "Jia", "Ge", "Ma", "Juan", "Kasugai", "Habaki", "Suo", null, null, null, "Na", "Lu", "Suo", "Ou", "Zu", "Tuan", "Xiu", "Guan", "Xuan", "Lian", "Shou", "Ao", "Man", "Mo", "Luo", "Bi", "Wei", "Liu", "Di", "Qiao", "Cong", "Yi", "Lu", "Ao", "Keng", "Qiang", "Cui", "Qi", "Chang", "Tang", "Man", "Yong", "Chan", "Feng", "Jing", "Biao", "Shu", "Lou", "Xiu", "Cong", "Long", "Zan", "Jian", "Cao", "Li", "Xia", "Xi", "Kang", null, "Beng", null, null, "Zheng", "Lu", "Hua", "Ji", "Pu", "Hui", "Qiang", "Po", "Lin", "Suo", "Xiu", "San", "Cheng"], Bo = ["Kui", "Si", "Liu", "Nao", "Heng", "Pie", "Sui", "Fan", "Qiao", "Quan", "Yang", "Tang", "Xiang", "Jue", "Jiao", "Zun", "Liao", "Jie", "Lao", "Dui", "Tan", "Zan", "Ji", "Jian", "Zhong", "Deng", "Ya", "Ying", "Dui", "Jue", "Nou", "Ti", "Pu", "Tie", null, null, "Ding", "Shan", "Kai", "Jian", "Fei", "Sui", "Lu", "Juan", "Hui", "Yu", "Lian", "Zhuo", "Qiao", "Qian", "Zhuo", "Lei", "Bi", "Tie", "Huan", "Ye", "Duo", "Guo", "Dang", "Ju", "Fen", "Da", "Bei", "Yi", "Ai", "Zong", "Xun", "Diao", "Zhu", "Heng", "Zhui", "Ji", "Nie", "Ta", "Huo", "Qing", "Bin", "Ying", "Kui", "Ning", "Xu", "Jian", "Jian", "Yari", "Cha", "Zhi", "Mie", "Li", "Lei", "Ji", "Zuan", "Kuang", "Shang", "Peng", "La", "Du", "Shuo", "Chuo", "Lu", "Biao", "Bao", "Lu", null, null, "Long", "E", "Lu", "Xin", "Jian", "Lan", "Bo", "Jian", "Yao", "Chan", "Xiang", "Jian", "Xi", "Guan", "Cang", "Nie", "Lei", "Cuan", "Qu", "Pan", "Luo", "Zuan", "Luan", "Zao", "Nie", "Jue", "Tang", "Shu", "Lan", "Jin", "Qiu", "Yi", "Zhen", "Ding", "Zhao", "Po", "Diao", "Tu", "Qian", "Chuan", "Shan", "Ji", "Fan", "Diao", "Men", "Nu", "Xi", "Chai", "Xing", "Gai", "Bu", "Tai", "Ju", "Dun", "Chao", "Zhong", "Na", "Bei", "Gang", "Ban", "Qian", "Yao", "Qin", "Jun", "Wu", "Gou", "Kang", "Fang", "Huo", "Tou", "Niu", "Ba", "Yu", "Qian", "Zheng", "Qian", "Gu", "Bo", "E", "Po", "Bu", "Ba", "Yue", "Zuan", "Mu", "Dan", "Jia", "Dian", "You", "Tie", "Bo", "Ling", "Shuo", "Qian", "Liu", "Bao", "Shi", "Xuan", "She", "Bi", "Ni", "Pi", "Duo", "Xing", "Kao", "Lao", "Er", "Mang", "Ya", "You", "Cheng", "Jia", "Ye", "Nao", "Zhi", "Dang", "Tong", "Lu", "Diao", "Yin", "Kai", "Zha", "Zhu", "Xian", "Ting", "Diu", "Xian", "Hua", "Quan", "Sha", "Jia", "Yao", "Ge", "Ming", "Zheng", "Se", "Jiao", "Yi", "Chan", "Chong", "Tang", "An", "Yin", "Ru", "Zhu", "Lao", "Pu", "Wu", "Lai", "Te", "Lian", "Keng"], Fo = ["Xiao", "Suo", "Li", "Zheng", "Chu", "Guo", "Gao", "Tie", "Xiu", "Cuo", "Lue", "Feng", "Xin", "Liu", "Kai", "Jian", "Rui", "Ti", "Lang", "Qian", "Ju", "A", "Qiang", "Duo", "Tian", "Cuo", "Mao", "Ben", "Qi", "De", "Kua", "Kun", "Chang", "Xi", "Gu", "Luo", "Chui", "Zhui", "Jin", "Zhi", "Xian", "Juan", "Huo", "Pou", "Tan", "Ding", "Jian", "Ju", "Meng", "Zi", "Qie", "Ying", "Kai", "Qiang", "Song", "E", "Cha", "Qiao", "Zhong", "Duan", "Sou", "Huang", "Huan", "Ai", "Du", "Mei", "Lou", "Zi", "Fei", "Mei", "Mo", "Zhen", "Bo", "Ge", "Nie", "Tang", "Juan", "Nie", "Na", "Liu", "Hao", "Bang", "Yi", "Jia", "Bin", "Rong", "Biao", "Tang", "Man", "Luo", "Beng", "Yong", "Jing", "Di", "Zu", "Xuan", "Liu", "Tan", "Jue", "Liao", "Pu", "Lu", "Dui", "Lan", "Pu", "Cuan", "Qiang", "Deng", "Huo", "Lei", "Huan", "Zhuo", "Lian", "Yi", "Cha", "Biao", "La", "Chan", "Xiang", "Chang", "Chang", "Jiu", "Ao", "Die", "Qu", "Liao", "Mi", "Chang", "Men", "Ma", "Shuan", "Shan", "Huo", "Men", "Yan", "Bi", "Han", "Bi", "San", "Kai", "Kang", "Beng", "Hong", "Run", "San", "Xian", "Xian", "Jian", "Min", "Xia", "Yuru", "Dou", "Zha", "Nao", "Jian", "Peng", "Xia", "Ling", "Bian", "Bi", "Run", "He", "Guan", "Ge", "Ge", "Fa", "Chu", "Hong", "Gui", "Min", "Se", "Kun", "Lang", "Lu", "Ting", "Sha", "Ju", "Yue", "Yue", "Chan", "Qu", "Lin", "Chang", "Shai", "Kun", "Yan", "Min", "Yan", "E", "Hun", "Yu", "Wen", "Xiang", "Bao", "Xiang", "Qu", "Yao", "Wen", "Ban", "An", "Wei", "Yin", "Kuo", "Que", "Lan", "Du", null, "Phwung", "Tian", "Nie", "Ta", "Kai", "He", "Que", "Chuang", "Guan", "Dou", "Qi", "Kui", "Tang", "Guan", "Piao", "Kan", "Xi", "Hui", "Chan", "Pi", "Dang", "Huan", "Ta", "Wen", null, "Men", "Shuan", "Shan", "Yan", "Han", "Bi", "Wen", "Chuang", "Run", "Wei", "Xian", "Hong", "Jian", "Min", "Kang", "Men", "Zha", "Nao", "Gui", "Wen", "Ta", "Min", "Lu", "Kai"], bo = ["Fa", "Ge", "He", "Kun", "Jiu", "Yue", "Lang", "Du", "Yu", "Yan", "Chang", "Xi", "Wen", "Hun", "Yan", "E", "Chan", "Lan", "Qu", "Hui", "Kuo", "Que", "Ge", "Tian", "Ta", "Que", "Kan", "Huan", "Fu", "Fu", "Le", "Dui", "Xin", "Qian", "Wu", "Yi", "Tuo", "Yin", "Yang", "Dou", "E", "Sheng", "Ban", "Pei", "Keng", "Yun", "Ruan", "Zhi", "Pi", "Jing", "Fang", "Yang", "Yin", "Zhen", "Jie", "Cheng", "E", "Qu", "Di", "Zu", "Zuo", "Dian", "Ling", "A", "Tuo", "Tuo", "Po", "Bing", "Fu", "Ji", "Lu", "Long", "Chen", "Xing", "Duo", "Lou", "Mo", "Jiang", "Shu", "Duo", "Xian", "Er", "Gui", "Yu", "Gai", "Shan", "Xun", "Qiao", "Xing", "Chun", "Fu", "Bi", "Xia", "Shan", "Sheng", "Zhi", "Pu", "Dou", "Yuan", "Zhen", "Chu", "Xian", "Tou", "Nie", "Yun", "Xian", "Pei", "Pei", "Zou", "Yi", "Dui", "Lun", "Yin", "Ju", "Chui", "Chen", "Pi", "Ling", "Tao", "Xian", "Lu", "Sheng", "Xian", "Yin", "Zhu", "Yang", "Reng", "Shan", "Chong", "Yan", "Yin", "Yu", "Ti", "Yu", "Long", "Wei", "Wei", "Nie", "Dui", "Sui", "An", "Huang", "Jie", "Sui", "Yin", "Gai", "Yan", "Hui", "Ge", "Yun", "Wu", "Wei", "Ai", "Xi", "Tang", "Ji", "Zhang", "Dao", "Ao", "Xi", "Yin", null, "Rao", "Lin", "Tui", "Deng", "Pi", "Sui", "Sui", "Yu", "Xian", "Fen", "Ni", "Er", "Ji", "Dao", "Xi", "Yin", "E", "Hui", "Long", "Xi", "Li", "Li", "Li", "Zhui", "He", "Zhi", "Zhun", "Jun", "Nan", "Yi", "Que", "Yan", "Qian", "Ya", "Xiong", "Ya", "Ji", "Gu", "Huan", "Zhi", "Gou", "Jun", "Ci", "Yong", "Ju", "Chu", "Hu", "Za", "Luo", "Yu", "Chou", "Diao", "Sui", "Han", "Huo", "Shuang", "Guan", "Chu", "Za", "Yong", "Ji", "Xi", "Chou", "Liu", "Li", "Nan", "Xue", "Za", "Ji", "Ji", "Yu", "Yu", "Xue", "Na", "Fou", "Se", "Mu", "Wen", "Fen", "Pang", "Yun", "Li", "Li", "Ang", "Ling", "Lei", "An", "Bao", "Meng", "Dian", "Dang", "Xing", "Wu", "Zhao"], xo = ["Xu", "Ji", "Mu", "Chen", "Xiao", "Zha", "Ting", "Zhen", "Pei", "Mei", "Ling", "Qi", "Chou", "Huo", "Sha", "Fei", "Weng", "Zhan", "Yin", "Ni", "Chou", "Tun", "Lin", null, "Dong", "Ying", "Wu", "Ling", "Shuang", "Ling", "Xia", "Hong", "Yin", "Mo", "Mai", "Yun", "Liu", "Meng", "Bin", "Wu", "Wei", "Huo", "Yin", "Xi", "Yi", "Ai", "Dan", "Deng", "Xian", "Yu", "Lu", "Long", "Dai", "Ji", "Pang", "Yang", "Ba", "Pi", "Wei", null, "Xi", "Ji", "Mai", "Meng", "Meng", "Lei", "Li", "Huo", "Ai", "Fei", "Dai", "Long", "Ling", "Ai", "Feng", "Li", "Bao", null, "He", "He", "Bing", "Qing", "Qing", "Jing", "Tian", "Zhen", "Jing", "Cheng", "Qing", "Jing", "Jing", "Dian", "Jing", "Tian", "Fei", "Fei", "Kao", "Mi", "Mian", "Mian", "Pao", "Ye", "Tian", "Hui", "Ye", "Ge", "Ding", "Cha", "Jian", "Ren", "Di", "Du", "Wu", "Ren", "Qin", "Jin", "Xue", "Niu", "Ba", "Yin", "Sa", "Na", "Mo", "Zu", "Da", "Ban", "Yi", "Yao", "Tao", "Tuo", "Jia", "Hong", "Pao", "Yang", "Tomo", "Yin", "Jia", "Tao", "Ji", "Xie", "An", "An", "Hen", "Gong", "Kohaze", "Da", "Qiao", "Ting", "Wan", "Ying", "Sui", "Tiao", "Qiao", "Xuan", "Kong", "Beng", "Ta", "Zhang", "Bing", "Kuo", "Ju", "La", "Xie", "Rou", "Bang", "Yi", "Qiu", "Qiu", "He", "Xiao", "Mu", "Ju", "Jian", "Bian", "Di", "Jian", "On", "Tao", "Gou", "Ta", "Bei", "Xie", "Pan", "Ge", "Bi", "Kuo", "Tang", "Lou", "Gui", "Qiao", "Xue", "Ji", "Jian", "Jiang", "Chan", "Da", "Huo", "Xian", "Qian", "Du", "Wa", "Jian", "Lan", "Wei", "Ren", "Fu", "Mei", "Juan", "Ge", "Wei", "Qiao", "Han", "Chang", null, "Rou", "Xun", "She", "Wei", "Ge", "Bei", "Tao", "Gou", "Yun", null, "Bi", "Wei", "Hui", "Du", "Wa", "Du", "Wei", "Ren", "Fu", "Han", "Wei", "Yun", "Tao", "Jiu", "Jiu", "Xian", "Xie", "Xian", "Ji", "Yin", "Za", "Yun", "Shao", "Le", "Peng", "Heng", "Ying", "Yun", "Peng", "Yin", "Yin", "Xiang"], Go = ["Hu", "Ye", "Ding", "Qing", "Pan", "Xiang", "Shun", "Han", "Xu", "Yi", "Xu", "Gu", "Song", "Kui", "Qi", "Hang", "Yu", "Wan", "Ban", "Dun", "Di", "Dan", "Pan", "Po", "Ling", "Ce", "Jing", "Lei", "He", "Qiao", "E", "E", "Wei", "Jie", "Gua", "Shen", "Yi", "Shen", "Hai", "Dui", "Pian", "Ping", "Lei", "Fu", "Jia", "Tou", "Hui", "Kui", "Jia", "Le", "Tian", "Cheng", "Ying", "Jun", "Hu", "Han", "Jing", "Tui", "Tui", "Pin", "Lai", "Tui", "Zi", "Zi", "Chui", "Ding", "Lai", "Yan", "Han", "Jian", "Ke", "Cui", "Jiong", "Qin", "Yi", "Sai", "Ti", "E", "E", "Yan", "Hun", "Kan", "Yong", "Zhuan", "Yan", "Xian", "Xin", "Yi", "Yuan", "Sang", "Dian", "Dian", "Jiang", "Ku", "Lei", "Liao", "Piao", "Yi", "Man", "Qi", "Rao", "Hao", "Qiao", "Gu", "Xun", "Qian", "Hui", "Zhan", "Ru", "Hong", "Bin", "Xian", "Pin", "Lu", "Lan", "Nie", "Quan", "Ye", "Ding", "Qing", "Han", "Xiang", "Shun", "Xu", "Xu", "Wan", "Gu", "Dun", "Qi", "Ban", "Song", "Hang", "Yu", "Lu", "Ling", "Po", "Jing", "Jie", "Jia", "Tian", "Han", "Ying", "Jiong", "Hai", "Yi", "Pin", "Hui", "Tui", "Han", "Ying", "Ying", "Ke", "Ti", "Yong", "E", "Zhuan", "Yan", "E", "Nie", "Man", "Dian", "Sang", "Hao", "Lei", "Zhan", "Ru", "Pin", "Quan", "Feng", "Biao", "Oroshi", "Fu", "Xia", "Zhan", "Biao", "Sa", "Ba", "Tai", "Lie", "Gua", "Xuan", "Shao", "Ju", "Bi", "Si", "Wei", "Yang", "Yao", "Sou", "Kai", "Sao", "Fan", "Liu", "Xi", "Liao", "Piao", "Piao", "Liu", "Biao", "Biao", "Biao", "Liao", null, "Se", "Feng", "Biao", "Feng", "Yang", "Zhan", "Biao", "Sa", "Ju", "Si", "Sou", "Yao", "Liu", "Piao", "Biao", "Biao", "Fei", "Fan", "Fei", "Fei", "Shi", "Shi", "Can", "Ji", "Ding", "Si", "Tuo", "Zhan", "Sun", "Xiang", "Tun", "Ren", "Yu", "Juan", "Chi", "Yin", "Fan", "Fan", "Sun", "Yin", "Zhu", "Yi", "Zhai", "Bi", "Jie", "Tao", "Liu", "Ci", "Tie", "Si", "Bao", "Shi", "Duo"], No = ["Hai", "Ren", "Tian", "Jiao", "Jia", "Bing", "Yao", "Tong", "Ci", "Xiang", "Yang", "Yang", "Er", "Yan", "Le", "Yi", "Can", "Bo", "Nei", "E", "Bu", "Jun", "Dou", "Su", "Yu", "Shi", "Yao", "Hun", "Guo", "Shi", "Jian", "Zhui", "Bing", "Xian", "Bu", "Ye", "Tan", "Fei", "Zhang", "Wei", "Guan", "E", "Nuan", "Hun", "Hu", "Huang", "Tie", "Hui", "Jian", "Hou", "He", "Xing", "Fen", "Wei", "Gu", "Cha", "Song", "Tang", "Bo", "Gao", "Xi", "Kui", "Liu", "Sou", "Tao", "Ye", "Yun", "Mo", "Tang", "Man", "Bi", "Yu", "Xiu", "Jin", "San", "Kui", "Zhuan", "Shan", "Chi", "Dan", "Yi", "Ji", "Rao", "Cheng", "Yong", "Tao", "Hui", "Xiang", "Zhan", "Fen", "Hai", "Meng", "Yan", "Mo", "Chan", "Xiang", "Luo", "Zuan", "Nang", "Shi", "Ding", "Ji", "Tuo", "Xing", "Tun", "Xi", "Ren", "Yu", "Chi", "Fan", "Yin", "Jian", "Shi", "Bao", "Si", "Duo", "Yi", "Er", "Rao", "Xiang", "Jia", "Le", "Jiao", "Yi", "Bing", "Bo", "Dou", "E", "Yu", "Nei", "Jun", "Guo", "Hun", "Xian", "Guan", "Cha", "Kui", "Gu", "Sou", "Chan", "Ye", "Mo", "Bo", "Liu", "Xiu", "Jin", "Man", "San", "Zhuan", "Nang", "Shou", "Kui", "Guo", "Xiang", "Fen", "Ba", "Ni", "Bi", "Bo", "Tu", "Han", "Fei", "Jian", "An", "Ai", "Fu", "Xian", "Wen", "Xin", "Fen", "Bin", "Xing", "Ma", "Yu", "Feng", "Han", "Di", "Tuo", "Tuo", "Chi", "Xun", "Zhu", "Zhi", "Pei", "Xin", "Ri", "Sa", "Yin", "Wen", "Zhi", "Dan", "Lu", "You", "Bo", "Bao", "Kuai", "Tuo", "Yi", "Qu", null, "Qu", "Jiong", "Bo", "Zhao", "Yuan", "Peng", "Zhou", "Ju", "Zhu", "Nu", "Ju", "Pi", "Zang", "Jia", "Ling", "Zhen", "Tai", "Fu", "Yang", "Shi", "Bi", "Tuo", "Tuo", "Si", "Liu", "Ma", "Pian", "Tao", "Zhi", "Rong", "Teng", "Dong", "Xun", "Quan", "Shen", "Jiong", "Er", "Hai", "Bo", "Zhu", "Yin", "Luo", "Shuu", "Dan", "Xie", "Liu", "Ju", "Song", "Qin", "Mang", "Liang", "Han", "Tu", "Xuan", "Tui", "Jun"], vo = ["E", "Cheng", "Xin", "Ai", "Lu", "Zhui", "Zhou", "She", "Pian", "Kun", "Tao", "Lai", "Zong", "Ke", "Qi", "Qi", "Yan", "Fei", "Sao", "Yan", "Jie", "Yao", "Wu", "Pian", "Cong", "Pian", "Qian", "Fei", "Huang", "Jian", "Huo", "Yu", "Ti", "Quan", "Xia", "Zong", "Kui", "Rou", "Si", "Gua", "Tuo", "Kui", "Sou", "Qian", "Cheng", "Zhi", "Liu", "Pang", "Teng", "Xi", "Cao", "Du", "Yan", "Yuan", "Zou", "Sao", "Shan", "Li", "Zhi", "Shuang", "Lu", "Xi", "Luo", "Zhang", "Mo", "Ao", "Can", "Piao", "Cong", "Qu", "Bi", "Zhi", "Yu", "Xu", "Hua", "Bo", "Su", "Xiao", "Lin", "Chan", "Dun", "Liu", "Tuo", "Zeng", "Tan", "Jiao", "Tie", "Yan", "Luo", "Zhan", "Jing", "Yi", "Ye", "Tuo", "Bin", "Zou", "Yan", "Peng", "Lu", "Teng", "Xiang", "Ji", "Shuang", "Ju", "Xi", "Huan", "Li", "Biao", "Ma", "Yu", "Tuo", "Xun", "Chi", "Qu", "Ri", "Bo", "Lu", "Zang", "Shi", "Si", "Fu", "Ju", "Zou", "Zhu", "Tuo", "Nu", "Jia", "Yi", "Tai", "Xiao", "Ma", "Yin", "Jiao", "Hua", "Luo", "Hai", "Pian", "Biao", "Li", "Cheng", "Yan", "Xin", "Qin", "Jun", "Qi", "Qi", "Ke", "Zhui", "Zong", "Su", "Can", "Pian", "Zhi", "Kui", "Sao", "Wu", "Ao", "Liu", "Qian", "Shan", "Piao", "Luo", "Cong", "Chan", "Zou", "Ji", "Shuang", "Xiang", "Gu", "Wei", "Wei", "Wei", "Yu", "Gan", "Yi", "Ang", "Tou", "Xie", "Bao", "Bi", "Chi", "Ti", "Di", "Ku", "Hai", "Qiao", "Gou", "Kua", "Ge", "Tui", "Geng", "Pian", "Bi", "Ke", "Ka", "Yu", "Sui", "Lou", "Bo", "Xiao", "Pang", "Bo", "Ci", "Kuan", "Bin", "Mo", "Liao", "Lou", "Nao", "Du", "Zang", "Sui", "Ti", "Bin", "Kuan", "Lu", "Gao", "Gao", "Qiao", "Kao", "Qiao", "Lao", "Zao", "Biao", "Kun", "Kun", "Ti", "Fang", "Xiu", "Ran", "Mao", "Dan", "Kun", "Bin", "Fa", "Tiao", "Peng", "Zi", "Fa", "Ran", "Ti", "Pao", "Pi", "Mao", "Fu", "Er", "Rong", "Qu", "Gong", "Xiu", "Gua", "Ji", "Peng", "Zhua", "Shao", "Sha"], ko = ["Ti", "Li", "Bin", "Zong", "Ti", "Peng", "Song", "Zheng", "Quan", "Zong", "Shun", "Jian", "Duo", "Hu", "La", "Jiu", "Qi", "Lian", "Zhen", "Bin", "Peng", "Mo", "San", "Man", "Man", "Seng", "Xu", "Lie", "Qian", "Qian", "Nong", "Huan", "Kuai", "Ning", "Bin", "Lie", "Rang", "Dou", "Dou", "Nao", "Hong", "Xi", "Dou", "Han", "Dou", "Dou", "Jiu", "Chang", "Yu", "Yu", "Li", "Juan", "Fu", "Qian", "Gui", "Zong", "Liu", "Gui", "Shang", "Yu", "Gui", "Mei", "Ji", "Qi", "Jie", "Kui", "Hun", "Ba", "Po", "Mei", "Xu", "Yan", "Xiao", "Liang", "Yu", "Tui", "Qi", "Wang", "Liang", "Wei", "Jian", "Chi", "Piao", "Bi", "Mo", "Ji", "Xu", "Chou", "Yan", "Zhan", "Yu", "Dao", "Ren", "Ji", "Eri", "Gong", "Tuo", "Diao", "Ji", "Xu", "E", "E", "Sha", "Hang", "Tun", "Mo", "Jie", "Shen", "Fan", "Yuan", "Bi", "Lu", "Wen", "Hu", "Lu", "Za", "Fang", "Fen", "Na", "You", "Namazu", "Todo", "He", "Xia", "Qu", "Han", "Pi", "Ling", "Tuo", "Bo", "Qiu", "Ping", "Fu", "Bi", "Ji", "Wei", "Ju", "Diao", "Bo", "You", "Gun", "Pi", "Nian", "Xing", "Tai", "Bao", "Fu", "Zha", "Ju", "Gu", "Kajika", "Tong", null, "Ta", "Jie", "Shu", "Hou", "Xiang", "Er", "An", "Wei", "Tiao", "Zhu", "Yin", "Lie", "Luo", "Tong", "Yi", "Qi", "Bing", "Wei", "Jiao", "Bu", "Gui", "Xian", "Ge", "Hui", "Bora", "Mate", "Kao", "Gori", "Duo", "Jun", "Ti", "Man", "Xiao", "Za", "Sha", "Qin", "Yu", "Nei", "Zhe", "Gun", "Geng", "Su", "Wu", "Qiu", "Ting", "Fu", "Wan", "You", "Li", "Sha", "Sha", "Gao", "Meng", "Ugui", "Asari", "Subashiri", "Kazunoko", "Yong", "Ni", "Zi", "Qi", "Qing", "Xiang", "Nei", "Chun", "Ji", "Diao", "Qie", "Gu", "Zhou", "Dong", "Lai", "Fei", "Ni", "Yi", "Kun", "Lu", "Jiu", "Chang", "Jing", "Lun", "Ling", "Zou", "Li", "Meng", "Zong", "Zhi", "Nian", "Shachi", "Dojou", "Sukesou", "Shi", "Shen", "Hun", "Shi", "Hou", "Xing", "Zhu", "La", "Zong", "Ji", "Bian", "Bian"], Po = ["Huan", "Quan", "Ze", "Wei", "Wei", "Yu", "Qun", "Rou", "Die", "Huang", "Lian", "Yan", "Qiu", "Qiu", "Jian", "Bi", "E", "Yang", "Fu", "Sai", "Jian", "Xia", "Tuo", "Hu", "Muroaji", "Ruo", "Haraka", "Wen", "Jian", "Hao", "Wu", "Fang", "Sao", "Liu", "Ma", "Shi", "Shi", "Yin", "Z", "Teng", "Ta", "Yao", "Ge", "Rong", "Qian", "Qi", "Wen", "Ruo", "Hatahata", "Lian", "Ao", "Le", "Hui", "Min", "Ji", "Tiao", "Qu", "Jian", "Sao", "Man", "Xi", "Qiu", "Biao", "Ji", "Ji", "Zhu", "Jiang", "Qiu", "Zhuan", "Yong", "Zhang", "Kang", "Xue", "Bie", "Jue", "Qu", "Xiang", "Bo", "Jiao", "Xun", "Su", "Huang", "Zun", "Shan", "Shan", "Fan", "Jue", "Lin", "Xun", "Miao", "Xi", "Eso", "Kyou", "Fen", "Guan", "Hou", "Kuai", "Zei", "Sao", "Zhan", "Gan", "Gui", "Sheng", "Li", "Chang", "Hatahata", "Shiira", "Mutsu", "Ru", "Ji", "Xu", "Huo", "Shiira", "Li", "Lie", "Li", "Mie", "Zhen", "Xiang", "E", "Lu", "Guan", "Li", "Xian", "Yu", "Dao", "Ji", "You", "Tun", "Lu", "Fang", "Ba", "He", "Bo", "Ping", "Nian", "Lu", "You", "Zha", "Fu", "Bo", "Bao", "Hou", "Pi", "Tai", "Gui", "Jie", "Kao", "Wei", "Er", "Tong", "Ze", "Hou", "Kuai", "Ji", "Jiao", "Xian", "Za", "Xiang", "Xun", "Geng", "Li", "Lian", "Jian", "Li", "Shi", "Tiao", "Gun", "Sha", "Wan", "Jun", "Ji", "Yong", "Qing", "Ling", "Qi", "Zou", "Fei", "Kun", "Chang", "Gu", "Ni", "Nian", "Diao", "Jing", "Shen", "Shi", "Zi", "Fen", "Die", "Bi", "Chang", "Shi", "Wen", "Wei", "Sai", "E", "Qiu", "Fu", "Huang", "Quan", "Jiang", "Bian", "Sao", "Ao", "Qi", "Ta", "Yin", "Yao", "Fang", "Jian", "Le", "Biao", "Xue", "Bie", "Man", "Min", "Yong", "Wei", "Xi", "Jue", "Shan", "Lin", "Zun", "Huo", "Gan", "Li", "Zhan", "Guan", "Niao", "Yi", "Fu", "Li", "Jiu", "Bu", "Yan", "Fu", "Diao", "Ji", "Feng", "Nio", "Gan", "Shi", "Feng", "Ming", "Bao", "Yuan", "Zhi", "Hu", "Qin", "Fu", "Fen", "Wen", "Jian", "Shi", "Yu"], Ko = ["Fou", "Yiao", "Jue", "Jue", "Pi", "Huan", "Zhen", "Bao", "Yan", "Ya", "Zheng", "Fang", "Feng", "Wen", "Ou", "Te", "Jia", "Nu", "Ling", "Mie", "Fu", "Tuo", "Wen", "Li", "Bian", "Zhi", "Ge", "Yuan", "Zi", "Qu", "Xiao", "Zhi", "Dan", "Ju", "You", "Gu", "Zhong", "Yu", "Yang", "Rong", "Ya", "Tie", "Yu", "Shigi", "Ying", "Zhui", "Wu", "Er", "Gua", "Ai", "Zhi", "Yan", "Heng", "Jiao", "Ji", "Lie", "Zhu", "Ren", "Yi", "Hong", "Luo", "Ru", "Mou", "Ge", "Ren", "Jiao", "Xiu", "Zhou", "Zhi", "Luo", "Chidori", "Toki", "Ten", "Luan", "Jia", "Ji", "Yu", "Huan", "Tuo", "Bu", "Wu", "Juan", "Yu", "Bo", "Xun", "Xun", "Bi", "Xi", "Jun", "Ju", "Tu", "Jing", "Ti", "E", "E", "Kuang", "Hu", "Wu", "Shen", "Lai", "Ikaruga", "Kakesu", "Lu", "Ping", "Shu", "Fu", "An", "Zhao", "Peng", "Qin", "Qian", "Bei", "Diao", "Lu", "Que", "Jian", "Ju", "Tu", "Ya", "Yuan", "Qi", "Li", "Ye", "Zhui", "Kong", "Zhui", "Kun", "Sheng", "Qi", "Jing", "Yi", "Yi", "Jing", "Zi", "Lai", "Dong", "Qi", "Chun", "Geng", "Ju", "Qu", "Isuka", "Kikuitadaki", "Ji", "Shu", null, "Chi", "Miao", "Rou", "An", "Qiu", "Ti", "Hu", "Ti", "E", "Jie", "Mao", "Fu", "Chun", "Tu", "Yan", "He", "Yuan", "Pian", "Yun", "Mei", "Hu", "Ying", "Dun", "Mu", "Ju", "Tsugumi", "Cang", "Fang", "Gu", "Ying", "Yuan", "Xuan", "Weng", "Shi", "He", "Chu", "Tang", "Xia", "Ruo", "Liu", "Ji", "Gu", "Jian", "Zhun", "Han", "Zi", "Zi", "Ni", "Yao", "Yan", "Ji", "Li", "Tian", "Kou", "Ti", "Ti", "Ni", "Tu", "Ma", "Jiao", "Gao", "Tian", "Chen", "Li", "Zhuan", "Zhe", "Ao", "Yao", "Yi", "Ou", "Chi", "Zhi", "Liao", "Rong", "Lou", "Bi", "Shuang", "Zhuo", "Yu", "Wu", "Jue", "Yin", "Quan", "Si", "Jiao", "Yi", "Hua", "Bi", "Ying", "Su", "Huang", "Fan", "Jiao", "Liao", "Yan", "Kao", "Jiu", "Xian", "Xian", "Tu", "Mai", "Zun", "Yu", "Ying", "Lu", "Tuan", "Xian", "Xue", "Yi", "Pi"], Eo = ["Shu", "Luo", "Qi", "Yi", "Ji", "Zhe", "Yu", "Zhan", "Ye", "Yang", "Pi", "Ning", "Huo", "Mi", "Ying", "Meng", "Di", "Yue", "Yu", "Lei", "Bao", "Lu", "He", "Long", "Shuang", "Yue", "Ying", "Guan", "Qu", "Li", "Luan", "Niao", "Jiu", "Ji", "Yuan", "Ming", "Shi", "Ou", "Ya", "Cang", "Bao", "Zhen", "Gu", "Dong", "Lu", "Ya", "Xiao", "Yang", "Ling", "Zhi", "Qu", "Yuan", "Xue", "Tuo", "Si", "Zhi", "Er", "Gua", "Xiu", "Heng", "Zhou", "Ge", "Luan", "Hong", "Wu", "Bo", "Li", "Juan", "Hu", "E", "Yu", "Xian", "Ti", "Wu", "Que", "Miao", "An", "Kun", "Bei", "Peng", "Qian", "Chun", "Geng", "Yuan", "Su", "Hu", "He", "E", "Gu", "Qiu", "Zi", "Mei", "Mu", "Ni", "Yao", "Weng", "Liu", "Ji", "Ni", "Jian", "He", "Yi", "Ying", "Zhe", "Liao", "Liao", "Jiao", "Jiu", "Yu", "Lu", "Xuan", "Zhan", "Ying", "Huo", "Meng", "Guan", "Shuang", "Lu", "Jin", "Ling", "Jian", "Xian", "Cuo", "Jian", "Jian", "Yan", "Cuo", "Lu", "You", "Cu", "Ji", "Biao", "Cu", "Biao", "Zhu", "Jun", "Zhu", "Jian", "Mi", "Mi", "Wu", "Liu", "Chen", "Jun", "Lin", "Ni", "Qi", "Lu", "Jiu", "Jun", "Jing", "Li", "Xiang", "Yan", "Jia", "Mi", "Li", "She", "Zhang", "Lin", "Jing", "Ji", "Ling", "Yan", "Cu", "Mai", "Mai", "Ge", "Chao", "Fu", "Mian", "Mian", "Fu", "Pao", "Qu", "Qu", "Mou", "Fu", "Xian", "Lai", "Qu", "Mian", null, "Feng", "Fu", "Qu", "Mian", "Ma", "Mo", "Mo", "Hui", "Ma", "Zou", "Nen", "Fen", "Huang", "Huang", "Jin", "Guang", "Tian", "Tou", "Heng", "Xi", "Kuang", "Heng", "Shu", "Li", "Nian", "Chi", "Hei", "Hei", "Yi", "Qian", "Dan", "Xi", "Tuan", "Mo", "Mo", "Qian", "Dai", "Chu", "You", "Dian", "Yi", "Xia", "Yan", "Qu", "Mei", "Yan", "Jing", "Yu", "Li", "Dang", "Du", "Can", "Yin", "An", "Yan", "Tan", "An", "Zhen", "Dai", "Can", "Yi", "Mei", "Dan", "Yan", "Du", "Lu", "Zhi", "Fen", "Fu", "Fu", "Min", "Min", "Yuan"], Wo = ["Cu", "Qu", "Chao", "Wa", "Zhu", "Zhi", "Mang", "Ao", "Bie", "Tuo", "Bi", "Yuan", "Chao", "Tuo", "Ding", "Mi", "Nai", "Ding", "Zi", "Gu", "Gu", "Dong", "Fen", "Tao", "Yuan", "Pi", "Chang", "Gao", "Qi", "Yuan", "Tang", "Teng", "Shu", "Shu", "Fen", "Fei", "Wen", "Ba", "Diao", "Tuo", "Tong", "Qu", "Sheng", "Shi", "You", "Shi", "Ting", "Wu", "Nian", "Jing", "Hun", "Ju", "Yan", "Tu", "Ti", "Xi", "Xian", "Yan", "Lei", "Bi", "Yao", "Qiu", "Han", "Wu", "Wu", "Hou", "Xi", "Ge", "Zha", "Xiu", "Weng", "Zha", "Nong", "Nang", "Qi", "Zhai", "Ji", "Zi", "Ji", "Ji", "Qi", "Ji", "Chi", "Chen", "Chen", "He", "Ya", "Ken", "Xie", "Pao", "Cuo", "Shi", "Zi", "Chi", "Nian", "Ju", "Tiao", "Ling", "Ling", "Chu", "Quan", "Xie", "Ken", "Nie", "Jiu", "Yao", "Chuo", "Kun", "Yu", "Chu", "Yi", "Ni", "Cuo", "Zou", "Qu", "Nen", "Xian", "Ou", "E", "Wo", "Yi", "Chuo", "Zou", "Dian", "Chu", "Jin", "Ya", "Chi", "Chen", "He", "Ken", "Ju", "Ling", "Pao", "Tiao", "Zi", "Ken", "Yu", "Chuo", "Qu", "Wo", "Long", "Pang", "Gong", "Pang", "Yan", "Long", "Long", "Gong", "Kan", "Ta", "Ling", "Ta", "Long", "Gong", "Kan", "Gui", "Qiu", "Bie", "Gui", "Yue", "Chui", "He", "Jue", "Xie", "Yu"], Ro = ["it", "ix", "i", "ip", "iet", "iex", "ie", "iep", "at", "ax", "a", "ap", "uox", "uo", "uop", "ot", "ox", "o", "op", "ex", "e", "wu", "bit", "bix", "bi", "bip", "biet", "biex", "bie", "biep", "bat", "bax", "ba", "bap", "buox", "buo", "buop", "bot", "box", "bo", "bop", "bex", "be", "bep", "but", "bux", "bu", "bup", "burx", "bur", "byt", "byx", "by", "byp", "byrx", "byr", "pit", "pix", "pi", "pip", "piex", "pie", "piep", "pat", "pax", "pa", "pap", "puox", "puo", "puop", "pot", "pox", "po", "pop", "put", "pux", "pu", "pup", "purx", "pur", "pyt", "pyx", "py", "pyp", "pyrx", "pyr", "bbit", "bbix", "bbi", "bbip", "bbiet", "bbiex", "bbie", "bbiep", "bbat", "bbax", "bba", "bbap", "bbuox", "bbuo", "bbuop", "bbot", "bbox", "bbo", "bbop", "bbex", "bbe", "bbep", "bbut", "bbux", "bbu", "bbup", "bburx", "bbur", "bbyt", "bbyx", "bby", "bbyp", "nbit", "nbix", "nbi", "nbip", "nbiex", "nbie", "nbiep", "nbat", "nbax", "nba", "nbap", "nbot", "nbox", "nbo", "nbop", "nbut", "nbux", "nbu", "nbup", "nburx", "nbur", "nbyt", "nbyx", "nby", "nbyp", "nbyrx", "nbyr", "hmit", "hmix", "hmi", "hmip", "hmiex", "hmie", "hmiep", "hmat", "hmax", "hma", "hmap", "hmuox", "hmuo", "hmuop", "hmot", "hmox", "hmo", "hmop", "hmut", "hmux", "hmu", "hmup", "hmurx", "hmur", "hmyx", "hmy", "hmyp", "hmyrx", "hmyr", "mit", "mix", "mi", "mip", "miex", "mie", "miep", "mat", "max", "ma", "map", "muot", "muox", "muo", "muop", "mot", "mox", "mo", "mop", "mex", "me", "mut", "mux", "mu", "mup", "murx", "mur", "myt", "myx", "my", "myp", "fit", "fix", "fi", "fip", "fat", "fax", "fa", "fap", "fox", "fo", "fop", "fut", "fux", "fu", "fup", "furx", "fur", "fyt", "fyx", "fy", "fyp", "vit", "vix", "vi", "vip", "viet", "viex", "vie", "viep", "vat", "vax", "va", "vap", "vot", "vox", "vo", "vop", "vex", "vep", "vut", "vux", "vu", "vup", "vurx", "vur", "vyt", "vyx", "vy", "vyp", "vyrx", "vyr"], Ao = ["dit", "dix", "di", "dip", "diex", "die", "diep", "dat", "dax", "da", "dap", "duox", "duo", "dot", "dox", "do", "dop", "dex", "de", "dep", "dut", "dux", "du", "dup", "durx", "dur", "tit", "tix", "ti", "tip", "tiex", "tie", "tiep", "tat", "tax", "ta", "tap", "tuot", "tuox", "tuo", "tuop", "tot", "tox", "to", "top", "tex", "te", "tep", "tut", "tux", "tu", "tup", "turx", "tur", "ddit", "ddix", "ddi", "ddip", "ddiex", "ddie", "ddiep", "ddat", "ddax", "dda", "ddap", "dduox", "dduo", "dduop", "ddot", "ddox", "ddo", "ddop", "ddex", "dde", "ddep", "ddut", "ddux", "ddu", "ddup", "ddurx", "ddur", "ndit", "ndix", "ndi", "ndip", "ndiex", "ndie", "ndat", "ndax", "nda", "ndap", "ndot", "ndox", "ndo", "ndop", "ndex", "nde", "ndep", "ndut", "ndux", "ndu", "ndup", "ndurx", "ndur", "hnit", "hnix", "hni", "hnip", "hniet", "hniex", "hnie", "hniep", "hnat", "hnax", "hna", "hnap", "hnuox", "hnuo", "hnot", "hnox", "hnop", "hnex", "hne", "hnep", "hnut", "nit", "nix", "ni", "nip", "niex", "nie", "niep", "nax", "na", "nap", "nuox", "nuo", "nuop", "not", "nox", "no", "nop", "nex", "ne", "nep", "nut", "nux", "nu", "nup", "nurx", "nur", "hlit", "hlix", "hli", "hlip", "hliex", "hlie", "hliep", "hlat", "hlax", "hla", "hlap", "hluox", "hluo", "hluop", "hlox", "hlo", "hlop", "hlex", "hle", "hlep", "hlut", "hlux", "hlu", "hlup", "hlurx", "hlur", "hlyt", "hlyx", "hly", "hlyp", "hlyrx", "hlyr", "lit", "lix", "li", "lip", "liet", "liex", "lie", "liep", "lat", "lax", "la", "lap", "luot", "luox", "luo", "luop", "lot", "lox", "lo", "lop", "lex", "le", "lep", "lut", "lux", "lu", "lup", "lurx", "lur", "lyt", "lyx", "ly", "lyp", "lyrx", "lyr", "git", "gix", "gi", "gip", "giet", "giex", "gie", "giep", "gat", "gax", "ga", "gap", "guot", "guox", "guo", "guop", "got", "gox", "go", "gop", "get", "gex", "ge", "gep", "gut", "gux", "gu", "gup", "gurx", "gur", "kit", "kix", "ki", "kip", "kiex", "kie", "kiep", "kat"], zo = ["kax", "ka", "kap", "kuox", "kuo", "kuop", "kot", "kox", "ko", "kop", "ket", "kex", "ke", "kep", "kut", "kux", "ku", "kup", "kurx", "kur", "ggit", "ggix", "ggi", "ggiex", "ggie", "ggiep", "ggat", "ggax", "gga", "ggap", "gguot", "gguox", "gguo", "gguop", "ggot", "ggox", "ggo", "ggop", "gget", "ggex", "gge", "ggep", "ggut", "ggux", "ggu", "ggup", "ggurx", "ggur", "mgiex", "mgie", "mgat", "mgax", "mga", "mgap", "mguox", "mguo", "mguop", "mgot", "mgox", "mgo", "mgop", "mgex", "mge", "mgep", "mgut", "mgux", "mgu", "mgup", "mgurx", "mgur", "hxit", "hxix", "hxi", "hxip", "hxiet", "hxiex", "hxie", "hxiep", "hxat", "hxax", "hxa", "hxap", "hxuot", "hxuox", "hxuo", "hxuop", "hxot", "hxox", "hxo", "hxop", "hxex", "hxe", "hxep", "ngiex", "ngie", "ngiep", "ngat", "ngax", "nga", "ngap", "nguot", "nguox", "nguo", "ngot", "ngox", "ngo", "ngop", "ngex", "nge", "ngep", "hit", "hiex", "hie", "hat", "hax", "ha", "hap", "huot", "huox", "huo", "huop", "hot", "hox", "ho", "hop", "hex", "he", "hep", "wat", "wax", "wa", "wap", "wuox", "wuo", "wuop", "wox", "wo", "wop", "wex", "we", "wep", "zit", "zix", "zi", "zip", "ziex", "zie", "ziep", "zat", "zax", "za", "zap", "zuox", "zuo", "zuop", "zot", "zox", "zo", "zop", "zex", "ze", "zep", "zut", "zux", "zu", "zup", "zurx", "zur", "zyt", "zyx", "zy", "zyp", "zyrx", "zyr", "cit", "cix", "ci", "cip", "ciet", "ciex", "cie", "ciep", "cat", "cax", "ca", "cap", "cuox", "cuo", "cuop", "cot", "cox", "co", "cop", "cex", "ce", "cep", "cut", "cux", "cu", "cup", "curx", "cur", "cyt", "cyx", "cy", "cyp", "cyrx", "cyr", "zzit", "zzix", "zzi", "zzip", "zziet", "zziex", "zzie", "zziep", "zzat", "zzax", "zza", "zzap", "zzox", "zzo", "zzop", "zzex", "zze", "zzep", "zzux", "zzu", "zzup", "zzurx", "zzur", "zzyt", "zzyx", "zzy", "zzyp", "zzyrx", "zzyr", "nzit", "nzix", "nzi", "nzip", "nziex", "nzie", "nziep", "nzat", "nzax", "nza", "nzap", "nzuox", "nzuo", "nzox", "nzop", "nzex", "nze", "nzux", "nzu"], Oo = ["nzup", "nzurx", "nzur", "nzyt", "nzyx", "nzy", "nzyp", "nzyrx", "nzyr", "sit", "six", "si", "sip", "siex", "sie", "siep", "sat", "sax", "sa", "sap", "suox", "suo", "suop", "sot", "sox", "so", "sop", "sex", "se", "sep", "sut", "sux", "su", "sup", "surx", "sur", "syt", "syx", "sy", "syp", "syrx", "syr", "ssit", "ssix", "ssi", "ssip", "ssiex", "ssie", "ssiep", "ssat", "ssax", "ssa", "ssap", "ssot", "ssox", "sso", "ssop", "ssex", "sse", "ssep", "ssut", "ssux", "ssu", "ssup", "ssyt", "ssyx", "ssy", "ssyp", "ssyrx", "ssyr", "zhat", "zhax", "zha", "zhap", "zhuox", "zhuo", "zhuop", "zhot", "zhox", "zho", "zhop", "zhet", "zhex", "zhe", "zhep", "zhut", "zhux", "zhu", "zhup", "zhurx", "zhur", "zhyt", "zhyx", "zhy", "zhyp", "zhyrx", "zhyr", "chat", "chax", "cha", "chap", "chuot", "chuox", "chuo", "chuop", "chot", "chox", "cho", "chop", "chet", "chex", "che", "chep", "chux", "chu", "chup", "churx", "chur", "chyt", "chyx", "chy", "chyp", "chyrx", "chyr", "rrax", "rra", "rruox", "rruo", "rrot", "rrox", "rro", "rrop", "rret", "rrex", "rre", "rrep", "rrut", "rrux", "rru", "rrup", "rrurx", "rrur", "rryt", "rryx", "rry", "rryp", "rryrx", "rryr", "nrat", "nrax", "nra", "nrap", "nrox", "nro", "nrop", "nret", "nrex", "nre", "nrep", "nrut", "nrux", "nru", "nrup", "nrurx", "nrur", "nryt", "nryx", "nry", "nryp", "nryrx", "nryr", "shat", "shax", "sha", "shap", "shuox", "shuo", "shuop", "shot", "shox", "sho", "shop", "shet", "shex", "she", "shep", "shut", "shux", "shu", "shup", "shurx", "shur", "shyt", "shyx", "shy", "shyp", "shyrx", "shyr", "rat", "rax", "ra", "rap", "ruox", "ruo", "ruop", "rot", "rox", "ro", "rop", "rex", "re", "rep", "rut", "rux", "ru", "rup", "rurx", "rur", "ryt", "ryx", "ry", "ryp", "ryrx", "ryr", "jit", "jix", "ji", "jip", "jiet", "jiex", "jie", "jiep", "juot", "juox", "juo", "juop", "jot", "jox", "jo", "jop", "jut", "jux", "ju", "jup", "jurx", "jur", "jyt", "jyx", "jy", "jyp", "jyrx", "jyr", "qit", "qix", "qi", "qip"], jo = ["qiet", "qiex", "qie", "qiep", "quot", "quox", "quo", "quop", "qot", "qox", "qo", "qop", "qut", "qux", "qu", "qup", "qurx", "qur", "qyt", "qyx", "qy", "qyp", "qyrx", "qyr", "jjit", "jjix", "jji", "jjip", "jjiet", "jjiex", "jjie", "jjiep", "jjuox", "jjuo", "jjuop", "jjot", "jjox", "jjo", "jjop", "jjut", "jjux", "jju", "jjup", "jjurx", "jjur", "jjyt", "jjyx", "jjy", "jjyp", "njit", "njix", "nji", "njip", "njiet", "njiex", "njie", "njiep", "njuox", "njuo", "njot", "njox", "njo", "njop", "njux", "nju", "njup", "njurx", "njur", "njyt", "njyx", "njy", "njyp", "njyrx", "njyr", "nyit", "nyix", "nyi", "nyip", "nyiet", "nyiex", "nyie", "nyiep", "nyuox", "nyuo", "nyuop", "nyot", "nyox", "nyo", "nyop", "nyut", "nyux", "nyu", "nyup", "xit", "xix", "xi", "xip", "xiet", "xiex", "xie", "xiep", "xuox", "xuo", "xot", "xox", "xo", "xop", "xyt", "xyx", "xy", "xyp", "xyrx", "xyr", "yit", "yix", "yi", "yip", "yiet", "yiex", "yie", "yiep", "yuot", "yuox", "yuo", "yuop", "yot", "yox", "yo", "yop", "yut", "yux", "yu", "yup", "yurx", "yur", "yyt", "yyx", "yy", "yyp", "yyrx", "yyr", null, null, null, "Qot", "Li", "Kit", "Nyip", "Cyp", "Ssi", "Ggop", "Gep", "Mi", "Hxit", "Lyr", "Bbut", "Mop", "Yo", "Put", "Hxuo", "Tat", "Ga", null, null, "Ddur", "Bur", "Gguo", "Nyop", "Tu", "Op", "Jjut", "Zot", "Pyt", "Hmo", "Yit", "Vur", "Shy", "Vep", "Za", "Jo", null, "Jjy", "Got", "Jjie", "Wo", "Du", "Shur", "Lie", "Cy", "Cuop", "Cip", "Hxop", "Shat", null, "Shop", "Che", "Zziet", null, "Ke"], Io = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "a", "A", "a", "HENG", "heng", "TZ", "tz", "3", "3", "4", "4", "4", "4", "F", "S", "AA", "aa", "AO", "ao", "AU", "au", "AV", "av", "AV-", "av-", "AY", "ay", "C", "c", "K", "k", "K", "k", "K", "k", "L", "l", "L", "l", "O", "o", "O", "o", "OO", "oo", "P", "p", "P", "p", "P", "p", "Q", "q", "Q", "q", "R", "r", "R", "r", "V", "v", "VY", "vy", "Z", "z", "TH", "th", "TH", "th", "Y", "y", "ET", "et", "IS", "is", "CON", "con", "US", "us", "dum", "lum", "num", "rum", "RUM", "tum", "um", "D", "d", "F", "f", "G", "G", "g", "L", "l", "R", "r", "S", "s", "T", "t", "^", ":", "=", "'", "'", "H", "l", ".", "N", "n", "C", "c", "c", "h", "B", "b", "F", "f", "AE", "ae", "OE", "oe", "UE", "ue", "G", "g", "K", "k", "N", "n", "R", "r", "S", "s", "H", "E", "G", "L", "I", "Q", "K", "T", "J", "CHI", "B", "b", "O", "o", "U", "u", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "I", "H", "oe", "M", "F", "P", "M", "I", "M1"], Uo = ["Kay", "Kayng", "Ke", "Ko", "Kol", "Koc", "Kwi", "Kwi", "Kyun", "Kul", "Kum", "Na", "Na", "Na", "La", "Na", "Na", "Na", "Na", "Na", "Nak", "Nak", "Nak", "Nak", "Nak", "Nak", "Nak", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nam", "Nam", "Nam", "Nam", "Nap", "Nap", "Nap", "Nang", "Nang", "Nang", "Nang", "Nang", "Nay", "Nayng", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "Nok", "Nok", "Nok", "Nok", "Nok", "Nok", "Non", "Nong", "Nong", "Nong", "Nong", "Noy", "Noy", "Noy", "Noy", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nuk", "Nuk", "Num", "Nung", "Nung", "Nung", "Nung", "Nung", "Twu", "La", "Lak", "Lak", "Lan", "Lyeng", "Lo", "Lyul", "Li", "Pey", "Pen", "Pyen", "Pwu", "Pwul", "Pi", "Sak", "Sak", "Sam", "Sayk", "Sayng", "Sep", "Sey", "Sway", "Sin", "Sim", "Sip", "Ya", "Yak", "Yak", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Yek", "Yek", "Yek", "Yek", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yel", "Yel", "Yel", "Yel", "Yel", "Yel", "Yem", "Yem", "Yem", "Yem", "Yem", "Yep", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yey", "Yey", "Yey", "Yey", "O", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yong", "Wun", "Wen", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yuk", "Yuk", "Yuk", "Yun", "Yun", "Yun", "Yun", "Yul", "Yul", "Yul", "Yul", "Yung", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "Ik", "Ik", "In", "In", "In", "In", "In", "In", "In", "Im", "Im", "Im", "Ip", "Ip", "Ip", "Cang", "Cek", "Ci", "Cip", "Cha", "Chek"], $o = ["Chey", "Thak", "Thak", "Thang", "Thayk", "Thong", "Pho", "Phok", "Hang", "Hang", "Hyen", "Hwak", "Wu", "Huo", null, null, "Zhong", null, "Qing", null, null, "Xi", "Zhu", "Yi", "Li", "Shen", "Xiang", "Fu", "Jing", "Jing", "Yu", null, "Hagi", null, "Zhu", null, null, "Yi", "Du", null, null, null, "Fan", "Si", "Guan"], qo = ["ff", "fi", "fl", "ffi", "ffl", "st", "st", null, null, null, null, null, null, null, null, null, null, null, null, "mn", "me", "mi", "vn", "mkh", null, null, null, null, null, "yi", null, "ay", "`", null, "d", "h", "k", "l", "m", "m", "t", "+", "sh", "s", "sh", "s", "a", "a", null, "b", "g", "d", "h", "v", "z", null, "t", "y", "k", "k", "l", null, "l", null, "n", "n", null, "p", "p", null, "ts", "ts", "r", "sh", "t", "vo", "b", "k", "p", "l"], Vo = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "~", null, null, null, null, null, null, null, null, null, null, null, null, "..", "--", "-", "_", "_", "(", ") ", "{", "} ", "[", "] ", "[(", ")] ", "<<", ">> ", "<", "> ", "[", "] ", "{", "}", null, null, null, null, null, null, null, null, null, null, null, ",", ",", ".", null, ";", ":", "?", "!", "-", "(", ")", "{", "}", "{", "}", "#", "&", "*", "+", "-", "<", ">", "=", null, "\\", "$", "%", "@"], nl = [null, "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", null, null, ".", "[", "]", ",", "*", "wo", "a", "i", "u", "e", "o", "ya", "yu", "yo", "tu", "+", "a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "si", "su", "se", "so", "ta", "ti", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "hu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "n", ":", ";", null, "g", "gg", "gs", "n", "nj", "nh", "d", "dd", "r", "lg", "lm", "lb", "ls", "lt", "lp", "rh", "m", "b", "bb", "bs", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", null, null, null, "a", "ae", "ya", "yae", "eo", "e", null, null, "yeo", "ye", "o", "wa", "wae", "oe", null, null, "yo", "u", "weo", "we", "wi", "yu", null, null, "eu", "yi", "i", null, null, null, "/C", "PS", "!", "-", "|", "Y=", "W=", null, "|", "-", "|", "-", "|", "#", "O", null, null, null, null, null, null, null, null, null, null, "{", "|", "}"], il = ["g", "gg", "n", "d", "dd", "r", "m", "b", "bb", "s", "ss", "", "j", "jj", "c", "k", "t", "p", "h"], al = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i"], ul = ["", "g", "gg", "gs", "n", "nj", "nh", "d", "l", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "c", "k", "t", "p", "h"], s = [];
s[0] = xu;
s[1] = Gu;
s[2] = Nu;
s[3] = vu;
s[4] = ku;
s[5] = Pu;
s[6] = Ku;
s[7] = Eu;
s[9] = Wu;
s[10] = Ru;
s[11] = Au;
s[12] = zu;
s[13] = Ou;
s[14] = ju;
s[15] = Iu;
s[16] = Uu;
s[17] = $u;
s[18] = qu;
s[19] = Vu;
s[20] = ne;
s[21] = ie;
s[22] = ae;
s[23] = ue;
s[24] = ee;
s[30] = oe;
s[31] = le;
s[32] = te;
s[33] = he;
s[37] = ge;
s[40] = re;
s[48] = se;
s[49] = de;
s[50] = Ye;
s[51] = ce;
s[78] = Le;
s[79] = Ze;
s[80] = Ce;
s[81] = Se;
s[82] = Je;
s[83] = fe;
s[84] = De;
s[85] = Xe;
s[86] = pe;
s[87] = Te;
s[88] = He;
s[89] = _e;
s[90] = Qe;
s[91] = ye;
s[92] = Me;
s[93] = me;
s[94] = we;
s[95] = Be;
s[96] = Fe;
s[97] = be;
s[98] = xe;
s[99] = Ge;
s[100] = Ne;
s[101] = ve;
s[102] = ke;
s[103] = Pe;
s[104] = Ke;
s[105] = Ee;
s[106] = We;
s[107] = Re;
s[108] = Ae;
s[109] = ze;
s[110] = Oe;
s[111] = je;
s[112] = Ie;
s[113] = Ue;
s[114] = $e;
s[115] = qe;
s[116] = Ve;
s[117] = no;
s[118] = io;
s[119] = ao;
s[120] = uo;
s[121] = eo;
s[122] = oo;
s[123] = lo;
s[124] = to;
s[125] = ho;
s[126] = go;
s[127] = ro;
s[128] = so;
s[129] = Yo;
s[130] = co;
s[131] = Lo;
s[132] = Zo;
s[133] = Co;
s[134] = So;
s[135] = Jo;
s[136] = fo;
s[137] = Do;
s[138] = Xo;
s[139] = po;
s[140] = To;
s[141] = Ho;
s[142] = _o;
s[143] = Qo;
s[144] = yo;
s[145] = Mo;
s[146] = mo;
s[147] = wo;
s[148] = Bo;
s[149] = Fo;
s[150] = bo;
s[151] = xo;
s[152] = Go;
s[153] = No;
s[154] = vo;
s[155] = ko;
s[156] = Po;
s[157] = Ko;
s[158] = Eo;
s[159] = Wo;
s[160] = Ro;
s[161] = Ao;
s[162] = zo;
s[163] = Oo;
s[164] = jo;
s[167] = Io;
s[249] = Uo;
s[250] = $o;
s[251] = qo;
s[254] = Vo;
s[255] = nl;
var wi = {};
for (let n = 0; n < s.length; n++) {
  let a = s[n];
  if (a) for (let i = 0; i < a.length; i++) {
    let u = a[i];
    u && (wi[String.fromCharCode((n << 8) + i)] = u);
  }
}
for (let n = 44032; n <= 55203; n++) {
  let a = n - 44032;
  wi[String.fromCharCode(n)] = il[a / 588 | 0] + al[a % 588 / 28 | 0] + ul[a % 28];
}
var el = /[-[\]/{}()*+?.\\^$|]/g, ol = /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]/, ll = /[\s!-#%-*,-/:;?@[-\]_{}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, yn = { Left: -1, Middle: 0, Right: 1 };
function Bi(n) {
  return (n || "").replace(el, "\\$&");
}
function Ri(n) {
  return ol.test(n);
}
function tl(n) {
  return ll.test(n);
}
function G(n) {
  if (Array.isArray(n)) return n.map((a) => G(a));
  if (n instanceof Date) return new Date(n.valueOf());
  if (n instanceof RegExp) return new RegExp(n.source, n.flags);
  if (n !== null && typeof n == "object") {
    let a = {};
    for (let i in n) Object.hasOwn(n, i) && (a[i] = G(n[i]));
    return a;
  }
  return n;
}
function hl(n, a) {
  let i = [];
  for (let o of a) {
    let t = n.indexOf(o);
    for (; t > -1; ) i.push([t, t + o.length - 1]), t = n.indexOf(o, t + 1);
  }
  let u = i.sort((o, t) => o[0] - t[0] || o[1] - t[1]);
  i = [];
  let e;
  for (let o of u) !e || o[0] > e[1] + 1 ? (e = o, i.push(e)) : o[1] > e[1] && (e[1] = o[1]);
  return i;
}
function gl(n, a) {
  return n < a[0] ? yn.Left : n > a[1] ? yn.Right : yn.Middle;
}
function Ai(n, a) {
  if (a.length === 0) return false;
  let i = 0, u = a.length - 1;
  for (; i <= u; ) {
    let e = i + u >>> 1, o = gl(n, a[e]);
    if (o === yn.Middle) return true;
    o === yn.Left ? u = e - 1 : i = e + 1;
  }
  return false;
}
function va(n, a, i, u = []) {
  let e = u.length ? new RegExp(u.map(Bi).join("|"), "g") : null, o = new RegExp(a.source, `${a.flags.replace("g", "")}g`), t = "", h = 0;
  for (; ; ) {
    let Y = o.exec(n), l = "", g = 0;
    if (Y) {
      for (; ; ) {
        let c = e == null ? void 0 : e.exec(Y[0]);
        if (c && e) l += c.index > g ? i : "", l += c[0], g = e.lastIndex;
        else {
          l += Y[0].length > g ? i : "";
          break;
        }
      }
      t += n.substring(h, Y.index) + l, h = o.lastIndex;
    } else {
      t += n.substring(h, n.length);
      break;
    }
  }
  return t;
}
var rl = /[\uD800-\uDBFF]/, sl = /[\uDC00-\uDFFF]/, dl = /[^\s\S]/, fi = { ignore: [], replace: [], replaceAfter: [], trim: false, unknown: "", fixChineseSpacing: true }, ka = class {
  get options() {
    return G({ ...fi, ...this.confOptions });
  }
  constructor(n = G(fi), a = wi) {
    this.confOptions = n, this.defaultMap = a, this.map = a;
  }
  config(n, a = false) {
    return a && (this.confOptions = {}), n && typeof n == "object" && (this.confOptions = G(n)), this.confOptions;
  }
  codeMapReplace(n, a, i = []) {
    let u = 0, e = "", o = a.fixChineseSpacing && Ri(n), t = false;
    for (let h = 0; h < n.length; h++) {
      let Y = rl.test(n[h]) && sl.test(n[h + 1]) ? n[h] + n[h + 1] : n[h], l, g = false;
      Ai(u, i) || Y.length === 2 && Ai(u + 1, i) ? (l = Y, i.find((c) => c[1] >= u && c[0] === u) || (g = true)) : l = this.map[Y] || a.unknown || "", o && (t && !g && !tl(l) && (l = ` ${l}`), t = !!l && Ri(Y)), e += l, u += Y.length, h += Y.length - 1;
    }
    return e;
  }
  formatReplaceOption(n) {
    if (Array.isArray(n)) return G(n);
    let a = [];
    for (let i in n) Object.hasOwn(n, i) && a.push([i, n[i]]);
    return a;
  }
  replaceString(n, a, i = []) {
    let u = G(a), e = n;
    for (let o of u) {
      switch (true) {
        case o[0] instanceof RegExp:
          o[0] = new RegExp(o[0].source, `${o[0].flags.replace("g", "")}g`);
          break;
        case (typeof o[0] == "string" && o[0].length > 0):
          o[0] = new RegExp(Bi(o[0]), "g");
          break;
        default:
          o[0] = dl;
      }
      e = va(e, o[0], o[1], i);
    }
    return e;
  }
  setData(n, a = false) {
    if (a && (this.map = G(this.defaultMap)), n && typeof n == "object" && Object.keys(n).length) {
      this.map = G(this.map);
      for (let i in n) Object.hasOwn(n, i) && i.length < 3 && i <= "\u{10FFFF}" && (this.map[i] = n[i]);
    }
    return this.map;
  }
  transliterate(n, a) {
    let i = typeof a == "object" ? a : {}, u = G({ ...this.options, ...i }), e = typeof n == "string" ? n : String(n), o = this.formatReplaceOption(u.replace);
    o.length && (e = this.replaceString(e, o, u.ignore));
    let t = u.ignore && u.ignore.length > 0 ? hl(e, u.ignore) : [];
    e = this.codeMapReplace(e, u, t), u.trim && (e = e.trim());
    let h = this.formatReplaceOption(u.replaceAfter);
    return h.length && (e = this.replaceString(e, h)), e;
  }
}, Yl = { ...G(fi), allowedChars: "a-zA-Z0-9-_.~", lowercase: true, separator: "-", uppercase: false, fixChineseSpacing: true }, cl = class extends ka {
  get options() {
    return G({ ...Yl, ...this.confOptions });
  }
  config(n, a = false) {
    return a && (this.confOptions = {}), n && typeof n == "object" && (this.confOptions = G(n)), this.confOptions;
  }
  slugify(n, a) {
    let i = typeof a == "object" ? a : {}, u = G({ ...this.options, ...i }), e = u.separator ? Bi(u.separator) : "", o = this.transliterate(n, u);
    return o = va(o, new RegExp(`[^${u.allowedChars}]+`, "g"), u.separator ?? "-", u.ignore ?? []), e && (o = o.replace(new RegExp(`${e}+`, "g"), u.separator), o = o.replace(new RegExp(`^${e}+|${e}+$`, "g"), "")), u.lowercase && (o = o.toLowerCase()), u.uppercase && (o = o.toUpperCase()), o;
  }
}, Cn = new ka(), Fi = Cn.transliterate.bind(Cn);
Fi.config = Cn.config.bind(Cn);
Fi.setData = Cn.setData.bind(Cn);
var Sn = new cl(), Pa = Sn.slugify.bind(Sn);
Pa.config = Sn.config.bind(Sn);
Pa.setData = Sn.setData.bind(Sn);
function Ln(n) {
  return new Promise((a) => setTimeout(a, n));
}
function zi(n) {
  const a = document.createElement("div");
  return a.textContent = n, a.innerHTML;
}
const ui = [{ threshold: 0.05, messages: ["Barely a scratch!", "Rock solid.", "Nailed it."] }, { threshold: 0.15, messages: ["Still holding up!", "Minor wobble.", "Close enough!"] }, { threshold: 0.3, messages: ["Getting creative...", "A little twist!", "Hmmm, interesting."] }, { threshold: 0.5, messages: ["Wait, what?", "Plot twist!", "That escalated.", "Oh no..."] }, { threshold: 0.7, messages: ["It's mutating!", "Unrecognizable!", "Total chaos."] }, { threshold: 1, messages: ["A completely new sentence.", "Reborn.", "Lost forever."] }];
function Ll(n) {
  for (const a of ui) if (n <= a.threshold) return a.messages[Math.floor(Math.random() * a.messages.length)];
  return ui[ui.length - 1].messages[0];
}
function Zl(n) {
  return n <= 0.05 ? "\u2728" : n <= 0.15 ? "\u{1F44D}" : n <= 0.3 ? "\u{1F914}" : n <= 0.5 ? "\u{1F632}" : n <= 0.7 ? "\u{1F92F}" : "\u{1F4A5}";
}
function Cl(n, a, i, u) {
  const e = i.length - 1;
  n.innerHTML = `
    <div class="journey">
      <div class="drift-meter">
        <div class="drift-label">
          <span id="drift-pct">0%</span> drift
        </div>
        <div class="drift-bar">
          <div class="drift-fill" id="drift-fill"></div>
        </div>
        <div class="drift-reaction hidden" id="drift-reaction"></div>
      </div>

      <div class="translation-display">
        <div class="current-lang" id="current-lang">
          <span class="lang-flag" id="lang-flag">${R(i[0].countryCode)}</span>
          <span class="lang-name" id="lang-name">${i[0].name}</span>
          <span class="step-badge" id="step-badge">START</span>
        </div>
        <div class="translation-text-wrapper">
          <div class="translation-text" id="ttext">${zi(a)}</div>
          <div class="shimmer-overlay hidden" id="shimmer"></div>
        </div>
        <div class="transliteration hidden" id="translit"></div>
        <div class="back-translation hidden" id="back-trans">
          <span class="back-trans-label">In English:</span>
          <span class="back-trans-text" id="back-trans-text"></span>
        </div>
      </div>

      <div class="station-track-wrapper">
        <div class="station-track" id="station-track">
          ${i.map((L, S) => `
            <div class="station${S === 0 ? " completed" : ""}" id="st-${S}">
              ${S > 0 ? '<div class="station-connector"></div>' : ""}
              <div class="station-node${S === 0 ? " active done" : ""}">
                <span class="station-flag">${R(L.countryCode)}</span>
                <span class="station-check${S === 0 ? "" : " hidden"}">&#10003;</span>
              </div>
              <div class="station-label">${L.name}</div>
            </div>`).join("")}
        </div>
      </div>

      <div class="journey-footer">
        <span id="step-counter">0</span> / ${e} translations
      </div>
    </div>
  `;
  const o = n.querySelector("#drift-fill"), t = n.querySelector("#drift-pct"), h = n.querySelector("#drift-reaction"), Y = n.querySelector("#ttext"), l = n.querySelector("#shimmer"), g = n.querySelector("#translit"), c = n.querySelector("#back-trans"), d = n.querySelector("#back-trans-text"), r = n.querySelector("#lang-flag"), C = n.querySelector("#lang-name"), y = n.querySelector("#step-badge"), T = n.querySelector("#step-counter"), f = [];
  let _ = false;
  async function p() {
    let L = a;
    for (let S = 0; S < e; S++) {
      const D = i[S], J = i[S + 1];
      try {
        L = (await Wi(L, D.code, J.code)).translatedText;
        const B = { language: J, text: L, transliteration: J.nonLatin ? Jl(L) : void 0, backTranslation: "", driftScore: (S + 1) / e };
        f.push(B), Wi(L, J.code, "en").then((un) => {
          B.backTranslation = un.translatedText, B.driftScore = Fu(a, un.translatedText);
        }).catch(() => {
        });
      } catch (X) {
        console.error(`Step ${S} failed:`, X), f.push({ language: J, text: L, backTranslation: "", driftScore: (S + 1) / e });
      }
    }
    _ = true;
  }
  async function Z() {
    var _a2, _b;
    for (let S = 0; S < e; S++) {
      for (; f.length <= S && !_; ) await Ln(150);
      if (f.length <= S) break;
      await w(f[S], S);
    }
    await Ln(800);
    const L = f.slice();
    u({ original: a, chain: i, steps: L, finalText: ((_a2 = L[L.length - 1]) == null ? void 0 : _a2.text) ?? a, totalDrift: ((_b = L[L.length - 1]) == null ? void 0 : _b.driftScore) ?? 0, timestamp: Date.now() });
  }
  async function Q(L, S) {
    const D = Date.now();
    for (; !L.backTranslation && Date.now() - D < S; ) await Ln(100);
  }
  async function w(L, S) {
    const D = n.querySelector(`#st-${S + 1}`), J = n.querySelector(`#st-${S}`);
    D.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }), r.textContent = R(L.language.countryCode), C.textContent = L.language.name, y.textContent = `${S + 1} / ${e}`, r.classList.remove("bounce"), r.offsetWidth, r.classList.add("bounce");
    const X = D.querySelector(".station-node");
    X.classList.add("active"), l.classList.remove("hidden"), Y.classList.add("fading"), g.classList.add("hidden"), c.classList.add("hidden"), await Ln(700), l.classList.add("hidden"), Y.classList.remove("fading"), Y.dir = L.language.rtl ? "rtl" : "ltr", await Oi(Y, L.text), L.transliteration && L.transliteration !== L.text && (g.textContent = L.transliteration, g.classList.remove("hidden")), await Q(L, 2e3), L.backTranslation && (d.textContent = "", c.classList.remove("hidden"), c.classList.remove("back-trans-pop"), c.offsetWidth, c.classList.add("back-trans-pop"), await Oi(d, `"${L.backTranslation}"`));
    const B = L.driftScore;
    o.style.width = `${B * 100}%`, t.textContent = `${Math.round(B * 100)}%`, B < 0.33 ? o.style.background = "#4ecdc4" : B < 0.66 ? o.style.background = "linear-gradient(90deg, #4ecdc4, #f7dc6f)" : o.style.background = "linear-gradient(90deg, #f7dc6f, #ff6b6b)";
    const un = Zl(B), dn = Ll(B);
    h.innerHTML = `<span class="reaction-emoji">${un}</span> ${zi(dn)}`, h.classList.remove("hidden", "reaction-pop"), h.offsetWidth, h.classList.add("reaction-pop"), B > 0.5 && Sl(n.querySelector(".translation-display")), J.classList.add("completed");
    const en = J.querySelector(".station-check");
    en && en.classList.remove("hidden"), X.classList.remove("active"), X.classList.add("done"), D.classList.add("completed"), D.querySelector(".station-check").classList.remove("hidden"), T.textContent = String(S + 1), await Ln(800);
  }
  p(), Z();
}
function Sl(n) {
  const a = ["\u2728", "\u{1F4AB}", "\u2B50", "\u{1F31F}", "\u26A1"];
  for (let i = 0; i < 6; i++) {
    const u = document.createElement("span");
    u.className = "drift-particle", u.textContent = a[Math.floor(Math.random() * a.length)], u.style.left = `${20 + Math.random() * 60}%`, u.style.animationDelay = `${Math.random() * 0.4}s`, u.style.setProperty("--drift-x", `${(Math.random() - 0.5) * 80}px`), n.appendChild(u), setTimeout(() => u.remove(), 1500);
  }
}
async function Oi(n, a) {
  n.textContent = "";
  const i = [...a], u = Math.max(18, Math.min(55, 1e3 / i.length));
  for (const e of i) n.textContent += e, await Ln(u);
}
function Jl(n) {
  try {
    const a = Fi(n);
    return a !== n ? a : void 0;
  } catch {
    return;
  }
}
async function fl(n) {
  const a = Math.round(n.totalDrift * 100), i = { title: "Lost in Translation", text: `"${n.original}" \u2192 "${n.finalText}" (${a}% lost in translation)`, url: window.location.href };
  if (navigator.share) try {
    await navigator.share(i);
    return;
  } catch {
  }
  await Ka(`${i.text}

${i.url}`);
}
async function Ka(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const a = document.createElement("textarea");
    a.value = n, a.style.cssText = "position:fixed;opacity:0", document.body.appendChild(a), a.select(), document.execCommand("copy"), document.body.removeChild(a);
  }
}
function Dl(n) {
  const a = Math.round(n.totalDrift * 100), i = 800, u = 520, e = 40, o = document.createElement("canvas");
  o.width = i, o.height = u;
  const t = o.getContext("2d"), h = t.createLinearGradient(0, 0, 0, u);
  h.addColorStop(0, "#0a0a1a"), h.addColorStop(1, "#1a1a3e"), t.fillStyle = h, t.fillRect(0, 0, i, u), t.textAlign = "center", t.fillStyle = "#8888aa", t.font = "600 14px Inter, sans-serif", t.fillText("LOST IN TRANSLATION", i / 2, e + 16), t.fillStyle = "#f0f0f5", t.font = "400 20px Inter, sans-serif", ji(t, `\u201C${n.original}\u201D`, i / 2, e + 62, i - e * 2, 26);
  const Y = e + 140;
  t.font = "20px sans-serif", t.fillStyle = "#4ecdc4", t.fillText("\u2193", i / 2, Y);
  const l = n.chain.map((r) => R(r.countryCode)).join(" ");
  t.font = "12px sans-serif", t.fillStyle = "#555577";
  const g = l.length > 100 ? l.slice(0, 100) + "\u2026" : l;
  t.fillText(g, i / 2, Y + 28), t.fillStyle = "#ffd700", t.font = "700 22px Inter, sans-serif", ji(t, `\u201C${n.finalText}\u201D`, i / 2, Y + 80, i - e * 2, 28);
  const c = u - 110, d = a > 66 ? "#ff6b6b" : a > 33 ? "#f7dc6f" : "#4ecdc4";
  t.fillStyle = d, t.font = "700 52px Inter, sans-serif", t.fillText(`${a}%`, i / 2, c), t.fillStyle = "#8888aa", t.font = "400 16px Inter, sans-serif", t.fillText("lost in translation", i / 2, c + 28), t.fillStyle = "#333355", t.font = "400 11px Inter, sans-serif", t.fillText("Lost in Translation \u2014 williamcfrancis.netlify.app", i / 2, u - 14), o.toBlob((r) => {
    if (!r) return;
    const C = URL.createObjectURL(r), y = document.createElement("a");
    y.href = C, y.download = "lost-in-translation.png", y.click(), URL.revokeObjectURL(C);
  }, "image/png");
}
function ji(n, a, i, u, e, o) {
  const t = a.split(" ");
  let h = "", Y = u;
  for (const l of t) {
    const g = h ? `${h} ${l}` : l;
    n.measureText(g).width > e && h ? (n.fillText(h, i, Y), h = l, Y += o) : h = g;
  }
  n.fillText(h, i, Y);
}
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const Xl = 4, Ii = 0, Ui = 1, pl = 2;
function Xn(n) {
  let a = n.length;
  for (; --a >= 0; ) n[a] = 0;
}
const Tl = 0, Ea = 1, Hl = 2, _l = 3, Ql = 258, bi = 29, Pn = 256, Bn = Pn + 1 + bi, Zn = 30, xi = 19, Wa = 2 * Bn + 1, on = 15, ei = 16, yl = 7, Gi = 256, Ra = 16, Aa = 17, za = 18, Di = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), Un = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), Ml = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), Oa = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), ml = 512, j = new Array((Bn + 2) * 2);
Xn(j);
const Mn = new Array(Zn * 2);
Xn(Mn);
const Fn = new Array(ml);
Xn(Fn);
const bn = new Array(Ql - _l + 1);
Xn(bn);
const Ni = new Array(bi);
Xn(Ni);
const $n = new Array(Zn);
Xn($n);
function oi(n, a, i, u, e) {
  this.static_tree = n, this.extra_bits = a, this.extra_base = i, this.elems = u, this.max_length = e, this.has_stree = n && n.length;
}
let ja, Ia, Ua;
function li(n, a) {
  this.dyn_tree = n, this.max_code = 0, this.stat_desc = a;
}
const $a = (n) => n < 256 ? Fn[n] : Fn[256 + (n >>> 7)], xn = (n, a) => {
  n.pending_buf[n.pending++] = a & 255, n.pending_buf[n.pending++] = a >>> 8 & 255;
}, N = (n, a, i) => {
  n.bi_valid > ei - i ? (n.bi_buf |= a << n.bi_valid & 65535, xn(n, n.bi_buf), n.bi_buf = a >> ei - n.bi_valid, n.bi_valid += i - ei) : (n.bi_buf |= a << n.bi_valid & 65535, n.bi_valid += i);
}, W = (n, a, i) => {
  N(n, i[a * 2], i[a * 2 + 1]);
}, qa = (n, a) => {
  let i = 0;
  do
    i |= n & 1, n >>>= 1, i <<= 1;
  while (--a > 0);
  return i >>> 1;
}, wl = (n) => {
  n.bi_valid === 16 ? (xn(n, n.bi_buf), n.bi_buf = 0, n.bi_valid = 0) : n.bi_valid >= 8 && (n.pending_buf[n.pending++] = n.bi_buf & 255, n.bi_buf >>= 8, n.bi_valid -= 8);
}, Bl = (n, a) => {
  const i = a.dyn_tree, u = a.max_code, e = a.stat_desc.static_tree, o = a.stat_desc.has_stree, t = a.stat_desc.extra_bits, h = a.stat_desc.extra_base, Y = a.stat_desc.max_length;
  let l, g, c, d, r, C, y = 0;
  for (d = 0; d <= on; d++) n.bl_count[d] = 0;
  for (i[n.heap[n.heap_max] * 2 + 1] = 0, l = n.heap_max + 1; l < Wa; l++) g = n.heap[l], d = i[i[g * 2 + 1] * 2 + 1] + 1, d > Y && (d = Y, y++), i[g * 2 + 1] = d, !(g > u) && (n.bl_count[d]++, r = 0, g >= h && (r = t[g - h]), C = i[g * 2], n.opt_len += C * (d + r), o && (n.static_len += C * (e[g * 2 + 1] + r)));
  if (y !== 0) {
    do {
      for (d = Y - 1; n.bl_count[d] === 0; ) d--;
      n.bl_count[d]--, n.bl_count[d + 1] += 2, n.bl_count[Y]--, y -= 2;
    } while (y > 0);
    for (d = Y; d !== 0; d--) for (g = n.bl_count[d]; g !== 0; ) c = n.heap[--l], !(c > u) && (i[c * 2 + 1] !== d && (n.opt_len += (d - i[c * 2 + 1]) * i[c * 2], i[c * 2 + 1] = d), g--);
  }
}, Va = (n, a, i) => {
  const u = new Array(on + 1);
  let e = 0, o, t;
  for (o = 1; o <= on; o++) e = e + i[o - 1] << 1, u[o] = e;
  for (t = 0; t <= a; t++) {
    let h = n[t * 2 + 1];
    h !== 0 && (n[t * 2] = qa(u[h]++, h));
  }
}, Fl = () => {
  let n, a, i, u, e;
  const o = new Array(on + 1);
  for (i = 0, u = 0; u < bi - 1; u++) for (Ni[u] = i, n = 0; n < 1 << Di[u]; n++) bn[i++] = u;
  for (bn[i - 1] = u, e = 0, u = 0; u < 16; u++) for ($n[u] = e, n = 0; n < 1 << Un[u]; n++) Fn[e++] = u;
  for (e >>= 7; u < Zn; u++) for ($n[u] = e << 7, n = 0; n < 1 << Un[u] - 7; n++) Fn[256 + e++] = u;
  for (a = 0; a <= on; a++) o[a] = 0;
  for (n = 0; n <= 143; ) j[n * 2 + 1] = 8, n++, o[8]++;
  for (; n <= 255; ) j[n * 2 + 1] = 9, n++, o[9]++;
  for (; n <= 279; ) j[n * 2 + 1] = 7, n++, o[7]++;
  for (; n <= 287; ) j[n * 2 + 1] = 8, n++, o[8]++;
  for (Va(j, Bn + 1, o), n = 0; n < Zn; n++) Mn[n * 2 + 1] = 5, Mn[n * 2] = qa(n, 5);
  ja = new oi(j, Di, Pn + 1, Bn, on), Ia = new oi(Mn, Un, 0, Zn, on), Ua = new oi(new Array(0), Ml, 0, xi, yl);
}, nu = (n) => {
  let a;
  for (a = 0; a < Bn; a++) n.dyn_ltree[a * 2] = 0;
  for (a = 0; a < Zn; a++) n.dyn_dtree[a * 2] = 0;
  for (a = 0; a < xi; a++) n.bl_tree[a * 2] = 0;
  n.dyn_ltree[Gi * 2] = 1, n.opt_len = n.static_len = 0, n.sym_next = n.matches = 0;
}, iu = (n) => {
  n.bi_valid > 8 ? xn(n, n.bi_buf) : n.bi_valid > 0 && (n.pending_buf[n.pending++] = n.bi_buf), n.bi_buf = 0, n.bi_valid = 0;
}, $i = (n, a, i, u) => {
  const e = a * 2, o = i * 2;
  return n[e] < n[o] || n[e] === n[o] && u[a] <= u[i];
}, ti = (n, a, i) => {
  const u = n.heap[i];
  let e = i << 1;
  for (; e <= n.heap_len && (e < n.heap_len && $i(a, n.heap[e + 1], n.heap[e], n.depth) && e++, !$i(a, u, n.heap[e], n.depth)); ) n.heap[i] = n.heap[e], i = e, e <<= 1;
  n.heap[i] = u;
}, qi = (n, a, i) => {
  let u, e, o = 0, t, h;
  if (n.sym_next !== 0) do
    u = n.pending_buf[n.sym_buf + o++] & 255, u += (n.pending_buf[n.sym_buf + o++] & 255) << 8, e = n.pending_buf[n.sym_buf + o++], u === 0 ? W(n, e, a) : (t = bn[e], W(n, t + Pn + 1, a), h = Di[t], h !== 0 && (e -= Ni[t], N(n, e, h)), u--, t = $a(u), W(n, t, i), h = Un[t], h !== 0 && (u -= $n[t], N(n, u, h)));
  while (o < n.sym_next);
  W(n, Gi, a);
}, Xi = (n, a) => {
  const i = a.dyn_tree, u = a.stat_desc.static_tree, e = a.stat_desc.has_stree, o = a.stat_desc.elems;
  let t, h, Y = -1, l;
  for (n.heap_len = 0, n.heap_max = Wa, t = 0; t < o; t++) i[t * 2] !== 0 ? (n.heap[++n.heap_len] = Y = t, n.depth[t] = 0) : i[t * 2 + 1] = 0;
  for (; n.heap_len < 2; ) l = n.heap[++n.heap_len] = Y < 2 ? ++Y : 0, i[l * 2] = 1, n.depth[l] = 0, n.opt_len--, e && (n.static_len -= u[l * 2 + 1]);
  for (a.max_code = Y, t = n.heap_len >> 1; t >= 1; t--) ti(n, i, t);
  l = o;
  do
    t = n.heap[1], n.heap[1] = n.heap[n.heap_len--], ti(n, i, 1), h = n.heap[1], n.heap[--n.heap_max] = t, n.heap[--n.heap_max] = h, i[l * 2] = i[t * 2] + i[h * 2], n.depth[l] = (n.depth[t] >= n.depth[h] ? n.depth[t] : n.depth[h]) + 1, i[t * 2 + 1] = i[h * 2 + 1] = l, n.heap[1] = l++, ti(n, i, 1);
  while (n.heap_len >= 2);
  n.heap[--n.heap_max] = n.heap[1], Bl(n, a), Va(i, Y, n.bl_count);
}, Vi = (n, a, i) => {
  let u, e = -1, o, t = a[1], h = 0, Y = 7, l = 4;
  for (t === 0 && (Y = 138, l = 3), a[(i + 1) * 2 + 1] = 65535, u = 0; u <= i; u++) o = t, t = a[(u + 1) * 2 + 1], !(++h < Y && o === t) && (h < l ? n.bl_tree[o * 2] += h : o !== 0 ? (o !== e && n.bl_tree[o * 2]++, n.bl_tree[Ra * 2]++) : h <= 10 ? n.bl_tree[Aa * 2]++ : n.bl_tree[za * 2]++, h = 0, e = o, t === 0 ? (Y = 138, l = 3) : o === t ? (Y = 6, l = 3) : (Y = 7, l = 4));
}, na = (n, a, i) => {
  let u, e = -1, o, t = a[1], h = 0, Y = 7, l = 4;
  for (t === 0 && (Y = 138, l = 3), u = 0; u <= i; u++) if (o = t, t = a[(u + 1) * 2 + 1], !(++h < Y && o === t)) {
    if (h < l) do
      W(n, o, n.bl_tree);
    while (--h !== 0);
    else o !== 0 ? (o !== e && (W(n, o, n.bl_tree), h--), W(n, Ra, n.bl_tree), N(n, h - 3, 2)) : h <= 10 ? (W(n, Aa, n.bl_tree), N(n, h - 3, 3)) : (W(n, za, n.bl_tree), N(n, h - 11, 7));
    h = 0, e = o, t === 0 ? (Y = 138, l = 3) : o === t ? (Y = 6, l = 3) : (Y = 7, l = 4);
  }
}, bl = (n) => {
  let a;
  for (Vi(n, n.dyn_ltree, n.l_desc.max_code), Vi(n, n.dyn_dtree, n.d_desc.max_code), Xi(n, n.bl_desc), a = xi - 1; a >= 3 && n.bl_tree[Oa[a] * 2 + 1] === 0; a--) ;
  return n.opt_len += 3 * (a + 1) + 5 + 5 + 4, a;
}, xl = (n, a, i, u) => {
  let e;
  for (N(n, a - 257, 5), N(n, i - 1, 5), N(n, u - 4, 4), e = 0; e < u; e++) N(n, n.bl_tree[Oa[e] * 2 + 1], 3);
  na(n, n.dyn_ltree, a - 1), na(n, n.dyn_dtree, i - 1);
}, Gl = (n) => {
  let a = 4093624447, i;
  for (i = 0; i <= 31; i++, a >>>= 1) if (a & 1 && n.dyn_ltree[i * 2] !== 0) return Ii;
  if (n.dyn_ltree[18] !== 0 || n.dyn_ltree[20] !== 0 || n.dyn_ltree[26] !== 0) return Ui;
  for (i = 32; i < Pn; i++) if (n.dyn_ltree[i * 2] !== 0) return Ui;
  return Ii;
};
let ia = false;
const Nl = (n) => {
  ia || (Fl(), ia = true), n.l_desc = new li(n.dyn_ltree, ja), n.d_desc = new li(n.dyn_dtree, Ia), n.bl_desc = new li(n.bl_tree, Ua), n.bi_buf = 0, n.bi_valid = 0, nu(n);
}, au = (n, a, i, u) => {
  N(n, (Tl << 1) + (u ? 1 : 0), 3), iu(n), xn(n, i), xn(n, ~i), i && n.pending_buf.set(n.window.subarray(a, a + i), n.pending), n.pending += i;
}, vl = (n) => {
  N(n, Ea << 1, 3), W(n, Gi, j), wl(n);
}, kl = (n, a, i, u) => {
  let e, o, t = 0;
  n.level > 0 ? (n.strm.data_type === pl && (n.strm.data_type = Gl(n)), Xi(n, n.l_desc), Xi(n, n.d_desc), t = bl(n), e = n.opt_len + 3 + 7 >>> 3, o = n.static_len + 3 + 7 >>> 3, o <= e && (e = o)) : e = o = i + 5, i + 4 <= e && a !== -1 ? au(n, a, i, u) : n.strategy === Xl || o === e ? (N(n, (Ea << 1) + (u ? 1 : 0), 3), qi(n, j, Mn)) : (N(n, (Hl << 1) + (u ? 1 : 0), 3), xl(n, n.l_desc.max_code + 1, n.d_desc.max_code + 1, t + 1), qi(n, n.dyn_ltree, n.dyn_dtree)), nu(n), u && iu(n);
}, Pl = (n, a, i) => (n.pending_buf[n.sym_buf + n.sym_next++] = a, n.pending_buf[n.sym_buf + n.sym_next++] = a >> 8, n.pending_buf[n.sym_buf + n.sym_next++] = i, a === 0 ? n.dyn_ltree[i * 2]++ : (n.matches++, a--, n.dyn_ltree[(bn[i] + Pn + 1) * 2]++, n.dyn_dtree[$a(a) * 2]++), n.sym_next === n.sym_end);
var Kl = Nl, El = au, Wl = kl, Rl = Pl, Al = vl, zl = { _tr_init: Kl, _tr_stored_block: El, _tr_flush_block: Wl, _tr_tally: Rl, _tr_align: Al };
const Ol = (n, a, i, u) => {
  let e = n & 65535 | 0, o = n >>> 16 & 65535 | 0, t = 0;
  for (; i !== 0; ) {
    t = i > 2e3 ? 2e3 : i, i -= t;
    do
      e = e + a[u++] | 0, o = o + e | 0;
    while (--t);
    e %= 65521, o %= 65521;
  }
  return e | o << 16 | 0;
};
var Gn = Ol;
const jl = () => {
  let n, a = [];
  for (var i = 0; i < 256; i++) {
    n = i;
    for (var u = 0; u < 8; u++) n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
    a[i] = n;
  }
  return a;
}, Il = new Uint32Array(jl()), Ul = (n, a, i, u) => {
  const e = Il, o = u + i;
  n ^= -1;
  for (let t = u; t < o; t++) n = n >>> 8 ^ e[(n ^ a[t]) & 255];
  return n ^ -1;
};
var F = Ul, hn = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }, Kn = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
const { _tr_init: $l, _tr_stored_block: pi, _tr_flush_block: ql, _tr_tally: V, _tr_align: Vl } = zl, { Z_NO_FLUSH: nn, Z_PARTIAL_FLUSH: nt, Z_FULL_FLUSH: it, Z_FINISH: P, Z_BLOCK: aa, Z_OK: b, Z_STREAM_END: ua, Z_STREAM_ERROR: A, Z_DATA_ERROR: at, Z_BUF_ERROR: hi, Z_DEFAULT_COMPRESSION: ut, Z_FILTERED: et, Z_HUFFMAN_ONLY: An, Z_RLE: ot, Z_FIXED: lt, Z_DEFAULT_STRATEGY: tt, Z_UNKNOWN: ht, Z_DEFLATED: ni } = Kn, gt = 9, rt = 15, st = 8, dt = 29, Yt = 256, Ti = Yt + 1 + dt, ct = 30, Lt = 19, Zt = 2 * Ti + 1, Ct = 15, H = 3, q = 258, z = q + H + 1, St = 32, Jn = 42, vi = 57, Hi = 69, _i = 73, Qi = 91, yi = 103, ln = 113, _n = 666, x = 1, pn = 2, gn = 3, Tn = 4, Jt = 3, tn = (n, a) => (n.msg = hn[a], a), ea = (n) => n * 2 - (n > 4 ? 9 : 0), $ = (n) => {
  let a = n.length;
  for (; --a >= 0; ) n[a] = 0;
}, ft = (n) => {
  let a, i, u, e = n.w_size;
  a = n.hash_size, u = a;
  do
    i = n.head[--u], n.head[u] = i >= e ? i - e : 0;
  while (--a);
  a = e, u = a;
  do
    i = n.prev[--u], n.prev[u] = i >= e ? i - e : 0;
  while (--a);
};
let Dt = (n, a, i) => (a << n.hash_shift ^ i) & n.hash_mask, an = Dt;
const v = (n) => {
  const a = n.state;
  let i = a.pending;
  i > n.avail_out && (i = n.avail_out), i !== 0 && (n.output.set(a.pending_buf.subarray(a.pending_out, a.pending_out + i), n.next_out), n.next_out += i, a.pending_out += i, n.total_out += i, n.avail_out -= i, a.pending -= i, a.pending === 0 && (a.pending_out = 0));
}, k = (n, a) => {
  ql(n, n.block_start >= 0 ? n.block_start : -1, n.strstart - n.block_start, a), n.block_start = n.strstart, v(n.strm);
}, M = (n, a) => {
  n.pending_buf[n.pending++] = a;
}, Hn = (n, a) => {
  n.pending_buf[n.pending++] = a >>> 8 & 255, n.pending_buf[n.pending++] = a & 255;
}, Mi = (n, a, i, u) => {
  let e = n.avail_in;
  return e > u && (e = u), e === 0 ? 0 : (n.avail_in -= e, a.set(n.input.subarray(n.next_in, n.next_in + e), i), n.state.wrap === 1 ? n.adler = Gn(n.adler, a, e, i) : n.state.wrap === 2 && (n.adler = F(n.adler, a, e, i)), n.next_in += e, n.total_in += e, e);
}, uu = (n, a) => {
  let i = n.max_chain_length, u = n.strstart, e, o, t = n.prev_length, h = n.nice_match;
  const Y = n.strstart > n.w_size - z ? n.strstart - (n.w_size - z) : 0, l = n.window, g = n.w_mask, c = n.prev, d = n.strstart + q;
  let r = l[u + t - 1], C = l[u + t];
  n.prev_length >= n.good_match && (i >>= 2), h > n.lookahead && (h = n.lookahead);
  do
    if (e = a, !(l[e + t] !== C || l[e + t - 1] !== r || l[e] !== l[u] || l[++e] !== l[u + 1])) {
      u += 2, e++;
      do
        ;
      while (l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && l[++u] === l[++e] && u < d);
      if (o = q - (d - u), u = d - q, o > t) {
        if (n.match_start = a, t = o, o >= h) break;
        r = l[u + t - 1], C = l[u + t];
      }
    }
  while ((a = c[a & g]) > Y && --i !== 0);
  return t <= n.lookahead ? t : n.lookahead;
}, fn = (n) => {
  const a = n.w_size;
  let i, u, e;
  do {
    if (u = n.window_size - n.lookahead - n.strstart, n.strstart >= a + (a - z) && (n.window.set(n.window.subarray(a, a + a - u), 0), n.match_start -= a, n.strstart -= a, n.block_start -= a, n.insert > n.strstart && (n.insert = n.strstart), ft(n), u += a), n.strm.avail_in === 0) break;
    if (i = Mi(n.strm, n.window, n.strstart + n.lookahead, u), n.lookahead += i, n.lookahead + n.insert >= H) for (e = n.strstart - n.insert, n.ins_h = n.window[e], n.ins_h = an(n, n.ins_h, n.window[e + 1]); n.insert && (n.ins_h = an(n, n.ins_h, n.window[e + H - 1]), n.prev[e & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = e, e++, n.insert--, !(n.lookahead + n.insert < H)); ) ;
  } while (n.lookahead < z && n.strm.avail_in !== 0);
}, eu = (n, a) => {
  let i = n.pending_buf_size - 5 > n.w_size ? n.w_size : n.pending_buf_size - 5, u, e, o, t = 0, h = n.strm.avail_in;
  do {
    if (u = 65535, o = n.bi_valid + 42 >> 3, n.strm.avail_out < o || (o = n.strm.avail_out - o, e = n.strstart - n.block_start, u > e + n.strm.avail_in && (u = e + n.strm.avail_in), u > o && (u = o), u < i && (u === 0 && a !== P || a === nn || u !== e + n.strm.avail_in))) break;
    t = a === P && u === e + n.strm.avail_in ? 1 : 0, pi(n, 0, 0, t), n.pending_buf[n.pending - 4] = u, n.pending_buf[n.pending - 3] = u >> 8, n.pending_buf[n.pending - 2] = ~u, n.pending_buf[n.pending - 1] = ~u >> 8, v(n.strm), e && (e > u && (e = u), n.strm.output.set(n.window.subarray(n.block_start, n.block_start + e), n.strm.next_out), n.strm.next_out += e, n.strm.avail_out -= e, n.strm.total_out += e, n.block_start += e, u -= e), u && (Mi(n.strm, n.strm.output, n.strm.next_out, u), n.strm.next_out += u, n.strm.avail_out -= u, n.strm.total_out += u);
  } while (t === 0);
  return h -= n.strm.avail_in, h && (h >= n.w_size ? (n.matches = 2, n.window.set(n.strm.input.subarray(n.strm.next_in - n.w_size, n.strm.next_in), 0), n.strstart = n.w_size, n.insert = n.strstart) : (n.window_size - n.strstart <= h && (n.strstart -= n.w_size, n.window.set(n.window.subarray(n.w_size, n.w_size + n.strstart), 0), n.matches < 2 && n.matches++, n.insert > n.strstart && (n.insert = n.strstart)), n.window.set(n.strm.input.subarray(n.strm.next_in - h, n.strm.next_in), n.strstart), n.strstart += h, n.insert += h > n.w_size - n.insert ? n.w_size - n.insert : h), n.block_start = n.strstart), n.high_water < n.strstart && (n.high_water = n.strstart), t ? Tn : a !== nn && a !== P && n.strm.avail_in === 0 && n.strstart === n.block_start ? pn : (o = n.window_size - n.strstart, n.strm.avail_in > o && n.block_start >= n.w_size && (n.block_start -= n.w_size, n.strstart -= n.w_size, n.window.set(n.window.subarray(n.w_size, n.w_size + n.strstart), 0), n.matches < 2 && n.matches++, o += n.w_size, n.insert > n.strstart && (n.insert = n.strstart)), o > n.strm.avail_in && (o = n.strm.avail_in), o && (Mi(n.strm, n.window, n.strstart, o), n.strstart += o, n.insert += o > n.w_size - n.insert ? n.w_size - n.insert : o), n.high_water < n.strstart && (n.high_water = n.strstart), o = n.bi_valid + 42 >> 3, o = n.pending_buf_size - o > 65535 ? 65535 : n.pending_buf_size - o, i = o > n.w_size ? n.w_size : o, e = n.strstart - n.block_start, (e >= i || (e || a === P) && a !== nn && n.strm.avail_in === 0 && e <= o) && (u = e > o ? o : e, t = a === P && n.strm.avail_in === 0 && u === e ? 1 : 0, pi(n, n.block_start, u, t), n.block_start += u, v(n.strm)), t ? gn : x);
}, gi = (n, a) => {
  let i, u;
  for (; ; ) {
    if (n.lookahead < z) {
      if (fn(n), n.lookahead < z && a === nn) return x;
      if (n.lookahead === 0) break;
    }
    if (i = 0, n.lookahead >= H && (n.ins_h = an(n, n.ins_h, n.window[n.strstart + H - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart), i !== 0 && n.strstart - i <= n.w_size - z && (n.match_length = uu(n, i)), n.match_length >= H) if (u = V(n, n.strstart - n.match_start, n.match_length - H), n.lookahead -= n.match_length, n.match_length <= n.max_lazy_match && n.lookahead >= H) {
      n.match_length--;
      do
        n.strstart++, n.ins_h = an(n, n.ins_h, n.window[n.strstart + H - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart;
      while (--n.match_length !== 0);
      n.strstart++;
    } else n.strstart += n.match_length, n.match_length = 0, n.ins_h = n.window[n.strstart], n.ins_h = an(n, n.ins_h, n.window[n.strstart + 1]);
    else u = V(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++;
    if (u && (k(n, false), n.strm.avail_out === 0)) return x;
  }
  return n.insert = n.strstart < H - 1 ? n.strstart : H - 1, a === P ? (k(n, true), n.strm.avail_out === 0 ? gn : Tn) : n.sym_next && (k(n, false), n.strm.avail_out === 0) ? x : pn;
}, Yn = (n, a) => {
  let i, u, e;
  for (; ; ) {
    if (n.lookahead < z) {
      if (fn(n), n.lookahead < z && a === nn) return x;
      if (n.lookahead === 0) break;
    }
    if (i = 0, n.lookahead >= H && (n.ins_h = an(n, n.ins_h, n.window[n.strstart + H - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart), n.prev_length = n.match_length, n.prev_match = n.match_start, n.match_length = H - 1, i !== 0 && n.prev_length < n.max_lazy_match && n.strstart - i <= n.w_size - z && (n.match_length = uu(n, i), n.match_length <= 5 && (n.strategy === et || n.match_length === H && n.strstart - n.match_start > 4096) && (n.match_length = H - 1)), n.prev_length >= H && n.match_length <= n.prev_length) {
      e = n.strstart + n.lookahead - H, u = V(n, n.strstart - 1 - n.prev_match, n.prev_length - H), n.lookahead -= n.prev_length - 1, n.prev_length -= 2;
      do
        ++n.strstart <= e && (n.ins_h = an(n, n.ins_h, n.window[n.strstart + H - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart);
      while (--n.prev_length !== 0);
      if (n.match_available = 0, n.match_length = H - 1, n.strstart++, u && (k(n, false), n.strm.avail_out === 0)) return x;
    } else if (n.match_available) {
      if (u = V(n, 0, n.window[n.strstart - 1]), u && k(n, false), n.strstart++, n.lookahead--, n.strm.avail_out === 0) return x;
    } else n.match_available = 1, n.strstart++, n.lookahead--;
  }
  return n.match_available && (u = V(n, 0, n.window[n.strstart - 1]), n.match_available = 0), n.insert = n.strstart < H - 1 ? n.strstart : H - 1, a === P ? (k(n, true), n.strm.avail_out === 0 ? gn : Tn) : n.sym_next && (k(n, false), n.strm.avail_out === 0) ? x : pn;
}, Xt = (n, a) => {
  let i, u, e, o;
  const t = n.window;
  for (; ; ) {
    if (n.lookahead <= q) {
      if (fn(n), n.lookahead <= q && a === nn) return x;
      if (n.lookahead === 0) break;
    }
    if (n.match_length = 0, n.lookahead >= H && n.strstart > 0 && (e = n.strstart - 1, u = t[e], u === t[++e] && u === t[++e] && u === t[++e])) {
      o = n.strstart + q;
      do
        ;
      while (u === t[++e] && u === t[++e] && u === t[++e] && u === t[++e] && u === t[++e] && u === t[++e] && u === t[++e] && u === t[++e] && e < o);
      n.match_length = q - (o - e), n.match_length > n.lookahead && (n.match_length = n.lookahead);
    }
    if (n.match_length >= H ? (i = V(n, 1, n.match_length - H), n.lookahead -= n.match_length, n.strstart += n.match_length, n.match_length = 0) : (i = V(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++), i && (k(n, false), n.strm.avail_out === 0)) return x;
  }
  return n.insert = 0, a === P ? (k(n, true), n.strm.avail_out === 0 ? gn : Tn) : n.sym_next && (k(n, false), n.strm.avail_out === 0) ? x : pn;
}, pt = (n, a) => {
  let i;
  for (; ; ) {
    if (n.lookahead === 0 && (fn(n), n.lookahead === 0)) {
      if (a === nn) return x;
      break;
    }
    if (n.match_length = 0, i = V(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++, i && (k(n, false), n.strm.avail_out === 0)) return x;
  }
  return n.insert = 0, a === P ? (k(n, true), n.strm.avail_out === 0 ? gn : Tn) : n.sym_next && (k(n, false), n.strm.avail_out === 0) ? x : pn;
};
function E(n, a, i, u, e) {
  this.good_length = n, this.max_lazy = a, this.nice_length = i, this.max_chain = u, this.func = e;
}
const Qn = [new E(0, 0, 0, 0, eu), new E(4, 4, 8, 4, gi), new E(4, 5, 16, 8, gi), new E(4, 6, 32, 32, gi), new E(4, 4, 16, 16, Yn), new E(8, 16, 32, 32, Yn), new E(8, 16, 128, 128, Yn), new E(8, 32, 128, 256, Yn), new E(32, 128, 258, 1024, Yn), new E(32, 258, 258, 4096, Yn)], Tt = (n) => {
  n.window_size = 2 * n.w_size, $(n.head), n.max_lazy_match = Qn[n.level].max_lazy, n.good_match = Qn[n.level].good_length, n.nice_match = Qn[n.level].nice_length, n.max_chain_length = Qn[n.level].max_chain, n.strstart = 0, n.block_start = 0, n.lookahead = 0, n.insert = 0, n.match_length = n.prev_length = H - 1, n.match_available = 0, n.ins_h = 0;
};
function Ht() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ni, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Zt * 2), this.dyn_dtree = new Uint16Array((2 * ct + 1) * 2), this.bl_tree = new Uint16Array((2 * Lt + 1) * 2), $(this.dyn_ltree), $(this.dyn_dtree), $(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Ct + 1), this.heap = new Uint16Array(2 * Ti + 1), $(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * Ti + 1), $(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const En = (n) => {
  if (!n) return 1;
  const a = n.state;
  return !a || a.strm !== n || a.status !== Jn && a.status !== vi && a.status !== Hi && a.status !== _i && a.status !== Qi && a.status !== yi && a.status !== ln && a.status !== _n ? 1 : 0;
}, ou = (n) => {
  if (En(n)) return tn(n, A);
  n.total_in = n.total_out = 0, n.data_type = ht;
  const a = n.state;
  return a.pending = 0, a.pending_out = 0, a.wrap < 0 && (a.wrap = -a.wrap), a.status = a.wrap === 2 ? vi : a.wrap ? Jn : ln, n.adler = a.wrap === 2 ? 0 : 1, a.last_flush = -2, $l(a), b;
}, lu = (n) => {
  const a = ou(n);
  return a === b && Tt(n.state), a;
}, _t = (n, a) => En(n) || n.state.wrap !== 2 ? A : (n.state.gzhead = a, b), tu = (n, a, i, u, e, o) => {
  if (!n) return A;
  let t = 1;
  if (a === ut && (a = 6), u < 0 ? (t = 0, u = -u) : u > 15 && (t = 2, u -= 16), e < 1 || e > gt || i !== ni || u < 8 || u > 15 || a < 0 || a > 9 || o < 0 || o > lt || u === 8 && t !== 1) return tn(n, A);
  u === 8 && (u = 9);
  const h = new Ht();
  return n.state = h, h.strm = n, h.status = Jn, h.wrap = t, h.gzhead = null, h.w_bits = u, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.hash_bits = e + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + H - 1) / H), h.window = new Uint8Array(h.w_size * 2), h.head = new Uint16Array(h.hash_size), h.prev = new Uint16Array(h.w_size), h.lit_bufsize = 1 << e + 6, h.pending_buf_size = h.lit_bufsize * 4, h.pending_buf = new Uint8Array(h.pending_buf_size), h.sym_buf = h.lit_bufsize, h.sym_end = (h.lit_bufsize - 1) * 3, h.level = a, h.strategy = o, h.method = i, lu(n);
}, Qt = (n, a) => tu(n, a, ni, rt, st, tt), yt = (n, a) => {
  if (En(n) || a > aa || a < 0) return n ? tn(n, A) : A;
  const i = n.state;
  if (!n.output || n.avail_in !== 0 && !n.input || i.status === _n && a !== P) return tn(n, n.avail_out === 0 ? hi : A);
  const u = i.last_flush;
  if (i.last_flush = a, i.pending !== 0) {
    if (v(n), n.avail_out === 0) return i.last_flush = -1, b;
  } else if (n.avail_in === 0 && ea(a) <= ea(u) && a !== P) return tn(n, hi);
  if (i.status === _n && n.avail_in !== 0) return tn(n, hi);
  if (i.status === Jn && i.wrap === 0 && (i.status = ln), i.status === Jn) {
    let e = ni + (i.w_bits - 8 << 4) << 8, o = -1;
    if (i.strategy >= An || i.level < 2 ? o = 0 : i.level < 6 ? o = 1 : i.level === 6 ? o = 2 : o = 3, e |= o << 6, i.strstart !== 0 && (e |= St), e += 31 - e % 31, Hn(i, e), i.strstart !== 0 && (Hn(i, n.adler >>> 16), Hn(i, n.adler & 65535)), n.adler = 1, i.status = ln, v(n), i.pending !== 0) return i.last_flush = -1, b;
  }
  if (i.status === vi) {
    if (n.adler = 0, M(i, 31), M(i, 139), M(i, 8), i.gzhead) M(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), M(i, i.gzhead.time & 255), M(i, i.gzhead.time >> 8 & 255), M(i, i.gzhead.time >> 16 & 255), M(i, i.gzhead.time >> 24 & 255), M(i, i.level === 9 ? 2 : i.strategy >= An || i.level < 2 ? 4 : 0), M(i, i.gzhead.os & 255), i.gzhead.extra && i.gzhead.extra.length && (M(i, i.gzhead.extra.length & 255), M(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (n.adler = F(n.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = Hi;
    else if (M(i, 0), M(i, 0), M(i, 0), M(i, 0), M(i, 0), M(i, i.level === 9 ? 2 : i.strategy >= An || i.level < 2 ? 4 : 0), M(i, Jt), i.status = ln, v(n), i.pending !== 0) return i.last_flush = -1, b;
  }
  if (i.status === Hi) {
    if (i.gzhead.extra) {
      let e = i.pending, o = (i.gzhead.extra.length & 65535) - i.gzindex;
      for (; i.pending + o > i.pending_buf_size; ) {
        let h = i.pending_buf_size - i.pending;
        if (i.pending_buf.set(i.gzhead.extra.subarray(i.gzindex, i.gzindex + h), i.pending), i.pending = i.pending_buf_size, i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e)), i.gzindex += h, v(n), i.pending !== 0) return i.last_flush = -1, b;
        e = 0, o -= h;
      }
      let t = new Uint8Array(i.gzhead.extra);
      i.pending_buf.set(t.subarray(i.gzindex, i.gzindex + o), i.pending), i.pending += o, i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e)), i.gzindex = 0;
    }
    i.status = _i;
  }
  if (i.status === _i) {
    if (i.gzhead.name) {
      let e = i.pending, o;
      do {
        if (i.pending === i.pending_buf_size) {
          if (i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e)), v(n), i.pending !== 0) return i.last_flush = -1, b;
          e = 0;
        }
        i.gzindex < i.gzhead.name.length ? o = i.gzhead.name.charCodeAt(i.gzindex++) & 255 : o = 0, M(i, o);
      } while (o !== 0);
      i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e)), i.gzindex = 0;
    }
    i.status = Qi;
  }
  if (i.status === Qi) {
    if (i.gzhead.comment) {
      let e = i.pending, o;
      do {
        if (i.pending === i.pending_buf_size) {
          if (i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e)), v(n), i.pending !== 0) return i.last_flush = -1, b;
          e = 0;
        }
        i.gzindex < i.gzhead.comment.length ? o = i.gzhead.comment.charCodeAt(i.gzindex++) & 255 : o = 0, M(i, o);
      } while (o !== 0);
      i.gzhead.hcrc && i.pending > e && (n.adler = F(n.adler, i.pending_buf, i.pending - e, e));
    }
    i.status = yi;
  }
  if (i.status === yi) {
    if (i.gzhead.hcrc) {
      if (i.pending + 2 > i.pending_buf_size && (v(n), i.pending !== 0)) return i.last_flush = -1, b;
      M(i, n.adler & 255), M(i, n.adler >> 8 & 255), n.adler = 0;
    }
    if (i.status = ln, v(n), i.pending !== 0) return i.last_flush = -1, b;
  }
  if (n.avail_in !== 0 || i.lookahead !== 0 || a !== nn && i.status !== _n) {
    let e = i.level === 0 ? eu(i, a) : i.strategy === An ? pt(i, a) : i.strategy === ot ? Xt(i, a) : Qn[i.level].func(i, a);
    if ((e === gn || e === Tn) && (i.status = _n), e === x || e === gn) return n.avail_out === 0 && (i.last_flush = -1), b;
    if (e === pn && (a === nt ? Vl(i) : a !== aa && (pi(i, 0, 0, false), a === it && ($(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), v(n), n.avail_out === 0)) return i.last_flush = -1, b;
  }
  return a !== P ? b : i.wrap <= 0 ? ua : (i.wrap === 2 ? (M(i, n.adler & 255), M(i, n.adler >> 8 & 255), M(i, n.adler >> 16 & 255), M(i, n.adler >> 24 & 255), M(i, n.total_in & 255), M(i, n.total_in >> 8 & 255), M(i, n.total_in >> 16 & 255), M(i, n.total_in >> 24 & 255)) : (Hn(i, n.adler >>> 16), Hn(i, n.adler & 65535)), v(n), i.wrap > 0 && (i.wrap = -i.wrap), i.pending !== 0 ? b : ua);
}, Mt = (n) => {
  if (En(n)) return A;
  const a = n.state.status;
  return n.state = null, a === ln ? tn(n, at) : b;
}, mt = (n, a) => {
  let i = a.length;
  if (En(n)) return A;
  const u = n.state, e = u.wrap;
  if (e === 2 || e === 1 && u.status !== Jn || u.lookahead) return A;
  if (e === 1 && (n.adler = Gn(n.adler, a, i, 0)), u.wrap = 0, i >= u.w_size) {
    e === 0 && ($(u.head), u.strstart = 0, u.block_start = 0, u.insert = 0);
    let Y = new Uint8Array(u.w_size);
    Y.set(a.subarray(i - u.w_size, i), 0), a = Y, i = u.w_size;
  }
  const o = n.avail_in, t = n.next_in, h = n.input;
  for (n.avail_in = i, n.next_in = 0, n.input = a, fn(u); u.lookahead >= H; ) {
    let Y = u.strstart, l = u.lookahead - (H - 1);
    do
      u.ins_h = an(u, u.ins_h, u.window[Y + H - 1]), u.prev[Y & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = Y, Y++;
    while (--l);
    u.strstart = Y, u.lookahead = H - 1, fn(u);
  }
  return u.strstart += u.lookahead, u.block_start = u.strstart, u.insert = u.lookahead, u.lookahead = 0, u.match_length = u.prev_length = H - 1, u.match_available = 0, n.next_in = t, n.input = h, n.avail_in = o, u.wrap = e, b;
};
var wt = Qt, Bt = tu, Ft = lu, bt = ou, xt = _t, Gt = yt, Nt = Mt, vt = mt, kt = "pako deflate (from Nodeca project)", mn = { deflateInit: wt, deflateInit2: Bt, deflateReset: Ft, deflateResetKeep: bt, deflateSetHeader: xt, deflate: Gt, deflateEnd: Nt, deflateSetDictionary: vt, deflateInfo: kt };
const Pt = (n, a) => Object.prototype.hasOwnProperty.call(n, a);
var Kt = function(n) {
  const a = Array.prototype.slice.call(arguments, 1);
  for (; a.length; ) {
    const i = a.shift();
    if (i) {
      if (typeof i != "object") throw new TypeError(i + "must be non-object");
      for (const u in i) Pt(i, u) && (n[u] = i[u]);
    }
  }
  return n;
}, Et = (n) => {
  let a = 0;
  for (let u = 0, e = n.length; u < e; u++) a += n[u].length;
  const i = new Uint8Array(a);
  for (let u = 0, e = 0, o = n.length; u < o; u++) {
    let t = n[u];
    i.set(t, e), e += t.length;
  }
  return i;
}, ii = { assign: Kt, flattenChunks: Et };
let hu = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  hu = false;
}
const Nn = new Uint8Array(256);
for (let n = 0; n < 256; n++) Nn[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
Nn[254] = Nn[254] = 1;
var Wt = (n) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(n);
  let a, i, u, e, o, t = n.length, h = 0;
  for (e = 0; e < t; e++) i = n.charCodeAt(e), (i & 64512) === 55296 && e + 1 < t && (u = n.charCodeAt(e + 1), (u & 64512) === 56320 && (i = 65536 + (i - 55296 << 10) + (u - 56320), e++)), h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
  for (a = new Uint8Array(h), o = 0, e = 0; o < h; e++) i = n.charCodeAt(e), (i & 64512) === 55296 && e + 1 < t && (u = n.charCodeAt(e + 1), (u & 64512) === 56320 && (i = 65536 + (i - 55296 << 10) + (u - 56320), e++)), i < 128 ? a[o++] = i : i < 2048 ? (a[o++] = 192 | i >>> 6, a[o++] = 128 | i & 63) : i < 65536 ? (a[o++] = 224 | i >>> 12, a[o++] = 128 | i >>> 6 & 63, a[o++] = 128 | i & 63) : (a[o++] = 240 | i >>> 18, a[o++] = 128 | i >>> 12 & 63, a[o++] = 128 | i >>> 6 & 63, a[o++] = 128 | i & 63);
  return a;
};
const Rt = (n, a) => {
  if (a < 65534 && n.subarray && hu) return String.fromCharCode.apply(null, n.length === a ? n : n.subarray(0, a));
  let i = "";
  for (let u = 0; u < a; u++) i += String.fromCharCode(n[u]);
  return i;
};
var At = (n, a) => {
  const i = a || n.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(n.subarray(0, a));
  let u, e;
  const o = new Array(i * 2);
  for (e = 0, u = 0; u < i; ) {
    let t = n[u++];
    if (t < 128) {
      o[e++] = t;
      continue;
    }
    let h = Nn[t];
    if (h > 4) {
      o[e++] = 65533, u += h - 1;
      continue;
    }
    for (t &= h === 2 ? 31 : h === 3 ? 15 : 7; h > 1 && u < i; ) t = t << 6 | n[u++] & 63, h--;
    if (h > 1) {
      o[e++] = 65533;
      continue;
    }
    t < 65536 ? o[e++] = t : (t -= 65536, o[e++] = 55296 | t >> 10 & 1023, o[e++] = 56320 | t & 1023);
  }
  return Rt(o, e);
}, zt = (n, a) => {
  a = a || n.length, a > n.length && (a = n.length);
  let i = a - 1;
  for (; i >= 0 && (n[i] & 192) === 128; ) i--;
  return i < 0 || i === 0 ? a : i + Nn[n[i]] > a ? i : a;
}, vn = { string2buf: Wt, buf2string: At, utf8border: zt };
function Ot() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var gu = Ot;
const ru = Object.prototype.toString, { Z_NO_FLUSH: jt, Z_SYNC_FLUSH: It, Z_FULL_FLUSH: Ut, Z_FINISH: $t, Z_OK: qn, Z_STREAM_END: qt, Z_DEFAULT_COMPRESSION: Vt, Z_DEFAULT_STRATEGY: nh, Z_DEFLATED: ih } = Kn;
function Wn(n) {
  this.options = ii.assign({ level: Vt, method: ih, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: nh }, n || {});
  let a = this.options;
  a.raw && a.windowBits > 0 ? a.windowBits = -a.windowBits : a.gzip && a.windowBits > 0 && a.windowBits < 16 && (a.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new gu(), this.strm.avail_out = 0;
  let i = mn.deflateInit2(this.strm, a.level, a.method, a.windowBits, a.memLevel, a.strategy);
  if (i !== qn) throw new Error(hn[i]);
  if (a.header && mn.deflateSetHeader(this.strm, a.header), a.dictionary) {
    let u;
    if (typeof a.dictionary == "string" ? u = vn.string2buf(a.dictionary) : ru.call(a.dictionary) === "[object ArrayBuffer]" ? u = new Uint8Array(a.dictionary) : u = a.dictionary, i = mn.deflateSetDictionary(this.strm, u), i !== qn) throw new Error(hn[i]);
    this._dict_set = true;
  }
}
Wn.prototype.push = function(n, a) {
  const i = this.strm, u = this.options.chunkSize;
  let e, o;
  if (this.ended) return false;
  for (a === ~~a ? o = a : o = a === true ? $t : jt, typeof n == "string" ? i.input = vn.string2buf(n) : ru.call(n) === "[object ArrayBuffer]" ? i.input = new Uint8Array(n) : i.input = n, i.next_in = 0, i.avail_in = i.input.length; ; ) {
    if (i.avail_out === 0 && (i.output = new Uint8Array(u), i.next_out = 0, i.avail_out = u), (o === It || o === Ut) && i.avail_out <= 6) {
      this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
      continue;
    }
    if (e = mn.deflate(i, o), e === qt) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), e = mn.deflateEnd(this.strm), this.onEnd(e), this.ended = true, e === qn;
    if (i.avail_out === 0) {
      this.onData(i.output);
      continue;
    }
    if (o > 0 && i.next_out > 0) {
      this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
      continue;
    }
    if (i.avail_in === 0) break;
  }
  return true;
};
Wn.prototype.onData = function(n) {
  this.chunks.push(n);
};
Wn.prototype.onEnd = function(n) {
  n === qn && (this.result = ii.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
};
function ki(n, a) {
  const i = new Wn(a);
  if (i.push(n, true), i.err) throw i.msg || hn[i.err];
  return i.result;
}
function ah(n, a) {
  return a = a || {}, a.raw = true, ki(n, a);
}
function uh(n, a) {
  return a = a || {}, a.gzip = true, ki(n, a);
}
var eh = Wn, oh = ki, lh = ah, th = uh, hh = { Deflate: eh, deflate: oh, deflateRaw: lh, gzip: th };
const zn = 16209, gh = 16191;
var rh = function(a, i) {
  let u, e, o, t, h, Y, l, g, c, d, r, C, y, T, f, _, p, Z, Q, w, L, S, D, J;
  const X = a.state;
  u = a.next_in, D = a.input, e = u + (a.avail_in - 5), o = a.next_out, J = a.output, t = o - (i - a.avail_out), h = o + (a.avail_out - 257), Y = X.dmax, l = X.wsize, g = X.whave, c = X.wnext, d = X.window, r = X.hold, C = X.bits, y = X.lencode, T = X.distcode, f = (1 << X.lenbits) - 1, _ = (1 << X.distbits) - 1;
  n: do {
    C < 15 && (r += D[u++] << C, C += 8, r += D[u++] << C, C += 8), p = y[r & f];
    i: for (; ; ) {
      if (Z = p >>> 24, r >>>= Z, C -= Z, Z = p >>> 16 & 255, Z === 0) J[o++] = p & 65535;
      else if (Z & 16) {
        Q = p & 65535, Z &= 15, Z && (C < Z && (r += D[u++] << C, C += 8), Q += r & (1 << Z) - 1, r >>>= Z, C -= Z), C < 15 && (r += D[u++] << C, C += 8, r += D[u++] << C, C += 8), p = T[r & _];
        a: for (; ; ) {
          if (Z = p >>> 24, r >>>= Z, C -= Z, Z = p >>> 16 & 255, Z & 16) {
            if (w = p & 65535, Z &= 15, C < Z && (r += D[u++] << C, C += 8, C < Z && (r += D[u++] << C, C += 8)), w += r & (1 << Z) - 1, w > Y) {
              a.msg = "invalid distance too far back", X.mode = zn;
              break n;
            }
            if (r >>>= Z, C -= Z, Z = o - t, w > Z) {
              if (Z = w - Z, Z > g && X.sane) {
                a.msg = "invalid distance too far back", X.mode = zn;
                break n;
              }
              if (L = 0, S = d, c === 0) {
                if (L += l - Z, Z < Q) {
                  Q -= Z;
                  do
                    J[o++] = d[L++];
                  while (--Z);
                  L = o - w, S = J;
                }
              } else if (c < Z) {
                if (L += l + c - Z, Z -= c, Z < Q) {
                  Q -= Z;
                  do
                    J[o++] = d[L++];
                  while (--Z);
                  if (L = 0, c < Q) {
                    Z = c, Q -= Z;
                    do
                      J[o++] = d[L++];
                    while (--Z);
                    L = o - w, S = J;
                  }
                }
              } else if (L += c - Z, Z < Q) {
                Q -= Z;
                do
                  J[o++] = d[L++];
                while (--Z);
                L = o - w, S = J;
              }
              for (; Q > 2; ) J[o++] = S[L++], J[o++] = S[L++], J[o++] = S[L++], Q -= 3;
              Q && (J[o++] = S[L++], Q > 1 && (J[o++] = S[L++]));
            } else {
              L = o - w;
              do
                J[o++] = J[L++], J[o++] = J[L++], J[o++] = J[L++], Q -= 3;
              while (Q > 2);
              Q && (J[o++] = J[L++], Q > 1 && (J[o++] = J[L++]));
            }
          } else if ((Z & 64) === 0) {
            p = T[(p & 65535) + (r & (1 << Z) - 1)];
            continue a;
          } else {
            a.msg = "invalid distance code", X.mode = zn;
            break n;
          }
          break;
        }
      } else if ((Z & 64) === 0) {
        p = y[(p & 65535) + (r & (1 << Z) - 1)];
        continue i;
      } else if (Z & 32) {
        X.mode = gh;
        break n;
      } else {
        a.msg = "invalid literal/length code", X.mode = zn;
        break n;
      }
      break;
    }
  } while (u < e && o < h);
  Q = C >> 3, u -= Q, C -= Q << 3, r &= (1 << C) - 1, a.next_in = u, a.next_out = o, a.avail_in = u < e ? 5 + (e - u) : 5 - (u - e), a.avail_out = o < h ? 257 + (h - o) : 257 - (o - h), X.hold = r, X.bits = C;
};
const cn = 15, oa = 852, la = 592, ta = 0, ri = 1, ha = 2, sh = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]), dh = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]), Yh = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]), ch = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]), Lh = (n, a, i, u, e, o, t, h) => {
  const Y = h.bits;
  let l = 0, g = 0, c = 0, d = 0, r = 0, C = 0, y = 0, T = 0, f = 0, _ = 0, p, Z, Q, w, L, S = null, D;
  const J = new Uint16Array(cn + 1), X = new Uint16Array(cn + 1);
  let B = null, un, dn, en;
  for (l = 0; l <= cn; l++) J[l] = 0;
  for (g = 0; g < u; g++) J[a[i + g]]++;
  for (r = Y, d = cn; d >= 1 && J[d] === 0; d--) ;
  if (r > d && (r = d), d === 0) return e[o++] = 1 << 24 | 64 << 16 | 0, e[o++] = 1 << 24 | 64 << 16 | 0, h.bits = 1, 0;
  for (c = 1; c < d && J[c] === 0; c++) ;
  for (r < c && (r = c), T = 1, l = 1; l <= cn; l++) if (T <<= 1, T -= J[l], T < 0) return -1;
  if (T > 0 && (n === ta || d !== 1)) return -1;
  for (X[1] = 0, l = 1; l < cn; l++) X[l + 1] = X[l] + J[l];
  for (g = 0; g < u; g++) a[i + g] !== 0 && (t[X[a[i + g]]++] = g);
  if (n === ta ? (S = B = t, D = 20) : n === ri ? (S = sh, B = dh, D = 257) : (S = Yh, B = ch, D = 0), _ = 0, g = 0, l = c, L = o, C = r, y = 0, Q = -1, f = 1 << r, w = f - 1, n === ri && f > oa || n === ha && f > la) return 1;
  for (; ; ) {
    un = l - y, t[g] + 1 < D ? (dn = 0, en = t[g]) : t[g] >= D ? (dn = B[t[g] - D], en = S[t[g] - D]) : (dn = 96, en = 0), p = 1 << l - y, Z = 1 << C, c = Z;
    do
      Z -= p, e[L + (_ >> y) + Z] = un << 24 | dn << 16 | en | 0;
    while (Z !== 0);
    for (p = 1 << l - 1; _ & p; ) p >>= 1;
    if (p !== 0 ? (_ &= p - 1, _ += p) : _ = 0, g++, --J[l] === 0) {
      if (l === d) break;
      l = a[i + t[g]];
    }
    if (l > r && (_ & w) !== Q) {
      for (y === 0 && (y = r), L += c, C = l - y, T = 1 << C; C + y < d && (T -= J[C + y], !(T <= 0)); ) C++, T <<= 1;
      if (f += 1 << C, n === ri && f > oa || n === ha && f > la) return 1;
      Q = _ & w, e[Q] = r << 24 | C << 16 | L - o | 0;
    }
  }
  return _ !== 0 && (e[L + _] = l - y << 24 | 64 << 16 | 0), h.bits = r, 0;
};
var wn = Lh;
const Zh = 0, su = 1, du = 2, { Z_FINISH: ga, Z_BLOCK: Ch, Z_TREES: On, Z_OK: rn, Z_STREAM_END: Sh, Z_NEED_DICT: Jh, Z_STREAM_ERROR: K, Z_DATA_ERROR: Yu, Z_MEM_ERROR: cu, Z_BUF_ERROR: fh, Z_DEFLATED: ra } = Kn, ai = 16180, sa = 16181, da = 16182, Ya = 16183, ca = 16184, La = 16185, Za = 16186, Ca = 16187, Sa = 16188, Ja = 16189, Vn = 16190, O = 16191, si = 16192, fa = 16193, di = 16194, Da = 16195, Xa = 16196, pa = 16197, Ta = 16198, jn = 16199, In = 16200, Ha = 16201, _a = 16202, Qa = 16203, ya = 16204, Ma = 16205, Yi = 16206, ma = 16207, wa = 16208, m = 16209, Lu = 16210, Zu = 16211, Dh = 852, Xh = 592, ph = 15, Th = ph, Ba = (n) => (n >>> 24 & 255) + (n >>> 8 & 65280) + ((n & 65280) << 8) + ((n & 255) << 24);
function Hh() {
  this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const sn = (n) => {
  if (!n) return 1;
  const a = n.state;
  return !a || a.strm !== n || a.mode < ai || a.mode > Zu ? 1 : 0;
}, Cu = (n) => {
  if (sn(n)) return K;
  const a = n.state;
  return n.total_in = n.total_out = a.total = 0, n.msg = "", a.wrap && (n.adler = a.wrap & 1), a.mode = ai, a.last = 0, a.havedict = 0, a.flags = -1, a.dmax = 32768, a.head = null, a.hold = 0, a.bits = 0, a.lencode = a.lendyn = new Int32Array(Dh), a.distcode = a.distdyn = new Int32Array(Xh), a.sane = 1, a.back = -1, rn;
}, Su = (n) => {
  if (sn(n)) return K;
  const a = n.state;
  return a.wsize = 0, a.whave = 0, a.wnext = 0, Cu(n);
}, Ju = (n, a) => {
  let i;
  if (sn(n)) return K;
  const u = n.state;
  return a < 0 ? (i = 0, a = -a) : (i = (a >> 4) + 5, a < 48 && (a &= 15)), a && (a < 8 || a > 15) ? K : (u.window !== null && u.wbits !== a && (u.window = null), u.wrap = i, u.wbits = a, Su(n));
}, fu = (n, a) => {
  if (!n) return K;
  const i = new Hh();
  n.state = i, i.strm = n, i.window = null, i.mode = ai;
  const u = Ju(n, a);
  return u !== rn && (n.state = null), u;
}, _h = (n) => fu(n, Th);
let Fa = true, ci, Li;
const Qh = (n) => {
  if (Fa) {
    ci = new Int32Array(512), Li = new Int32Array(32);
    let a = 0;
    for (; a < 144; ) n.lens[a++] = 8;
    for (; a < 256; ) n.lens[a++] = 9;
    for (; a < 280; ) n.lens[a++] = 7;
    for (; a < 288; ) n.lens[a++] = 8;
    for (wn(su, n.lens, 0, 288, ci, 0, n.work, { bits: 9 }), a = 0; a < 32; ) n.lens[a++] = 5;
    wn(du, n.lens, 0, 32, Li, 0, n.work, { bits: 5 }), Fa = false;
  }
  n.lencode = ci, n.lenbits = 9, n.distcode = Li, n.distbits = 5;
}, Du = (n, a, i, u) => {
  let e;
  const o = n.state;
  return o.window === null && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new Uint8Array(o.wsize)), u >= o.wsize ? (o.window.set(a.subarray(i - o.wsize, i), 0), o.wnext = 0, o.whave = o.wsize) : (e = o.wsize - o.wnext, e > u && (e = u), o.window.set(a.subarray(i - u, i - u + e), o.wnext), u -= e, u ? (o.window.set(a.subarray(i - u, i), 0), o.wnext = u, o.whave = o.wsize) : (o.wnext += e, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += e))), 0;
}, yh = (n, a) => {
  let i, u, e, o, t, h, Y, l, g, c, d, r, C, y, T = 0, f, _, p, Z, Q, w, L, S;
  const D = new Uint8Array(4);
  let J, X;
  const B = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (sn(n) || !n.output || !n.input && n.avail_in !== 0) return K;
  i = n.state, i.mode === O && (i.mode = si), t = n.next_out, e = n.output, Y = n.avail_out, o = n.next_in, u = n.input, h = n.avail_in, l = i.hold, g = i.bits, c = h, d = Y, S = rn;
  n: for (; ; ) switch (i.mode) {
    case ai:
      if (i.wrap === 0) {
        i.mode = si;
        break;
      }
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if (i.wrap & 2 && l === 35615) {
        i.wbits === 0 && (i.wbits = 15), i.check = 0, D[0] = l & 255, D[1] = l >>> 8 & 255, i.check = F(i.check, D, 2, 0), l = 0, g = 0, i.mode = sa;
        break;
      }
      if (i.head && (i.head.done = false), !(i.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
        n.msg = "incorrect header check", i.mode = m;
        break;
      }
      if ((l & 15) !== ra) {
        n.msg = "unknown compression method", i.mode = m;
        break;
      }
      if (l >>>= 4, g -= 4, L = (l & 15) + 8, i.wbits === 0 && (i.wbits = L), L > 15 || L > i.wbits) {
        n.msg = "invalid window size", i.mode = m;
        break;
      }
      i.dmax = 1 << i.wbits, i.flags = 0, n.adler = i.check = 1, i.mode = l & 512 ? Ja : O, l = 0, g = 0;
      break;
    case sa:
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if (i.flags = l, (i.flags & 255) !== ra) {
        n.msg = "unknown compression method", i.mode = m;
        break;
      }
      if (i.flags & 57344) {
        n.msg = "unknown header flags set", i.mode = m;
        break;
      }
      i.head && (i.head.text = l >> 8 & 1), i.flags & 512 && i.wrap & 4 && (D[0] = l & 255, D[1] = l >>> 8 & 255, i.check = F(i.check, D, 2, 0)), l = 0, g = 0, i.mode = da;
    case da:
      for (; g < 32; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      i.head && (i.head.time = l), i.flags & 512 && i.wrap & 4 && (D[0] = l & 255, D[1] = l >>> 8 & 255, D[2] = l >>> 16 & 255, D[3] = l >>> 24 & 255, i.check = F(i.check, D, 4, 0)), l = 0, g = 0, i.mode = Ya;
    case Ya:
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      i.head && (i.head.xflags = l & 255, i.head.os = l >> 8), i.flags & 512 && i.wrap & 4 && (D[0] = l & 255, D[1] = l >>> 8 & 255, i.check = F(i.check, D, 2, 0)), l = 0, g = 0, i.mode = ca;
    case ca:
      if (i.flags & 1024) {
        for (; g < 16; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        i.length = l, i.head && (i.head.extra_len = l), i.flags & 512 && i.wrap & 4 && (D[0] = l & 255, D[1] = l >>> 8 & 255, i.check = F(i.check, D, 2, 0)), l = 0, g = 0;
      } else i.head && (i.head.extra = null);
      i.mode = La;
    case La:
      if (i.flags & 1024 && (r = i.length, r > h && (r = h), r && (i.head && (L = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Uint8Array(i.head.extra_len)), i.head.extra.set(u.subarray(o, o + r), L)), i.flags & 512 && i.wrap & 4 && (i.check = F(i.check, u, r, o)), h -= r, o += r, i.length -= r), i.length)) break n;
      i.length = 0, i.mode = Za;
    case Za:
      if (i.flags & 2048) {
        if (h === 0) break n;
        r = 0;
        do
          L = u[o + r++], i.head && L && i.length < 65536 && (i.head.name += String.fromCharCode(L));
        while (L && r < h);
        if (i.flags & 512 && i.wrap & 4 && (i.check = F(i.check, u, r, o)), h -= r, o += r, L) break n;
      } else i.head && (i.head.name = null);
      i.length = 0, i.mode = Ca;
    case Ca:
      if (i.flags & 4096) {
        if (h === 0) break n;
        r = 0;
        do
          L = u[o + r++], i.head && L && i.length < 65536 && (i.head.comment += String.fromCharCode(L));
        while (L && r < h);
        if (i.flags & 512 && i.wrap & 4 && (i.check = F(i.check, u, r, o)), h -= r, o += r, L) break n;
      } else i.head && (i.head.comment = null);
      i.mode = Sa;
    case Sa:
      if (i.flags & 512) {
        for (; g < 16; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        if (i.wrap & 4 && l !== (i.check & 65535)) {
          n.msg = "header crc mismatch", i.mode = m;
          break;
        }
        l = 0, g = 0;
      }
      i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = true), n.adler = i.check = 0, i.mode = O;
      break;
    case Ja:
      for (; g < 32; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      n.adler = i.check = Ba(l), l = 0, g = 0, i.mode = Vn;
    case Vn:
      if (i.havedict === 0) return n.next_out = t, n.avail_out = Y, n.next_in = o, n.avail_in = h, i.hold = l, i.bits = g, Jh;
      n.adler = i.check = 1, i.mode = O;
    case O:
      if (a === Ch || a === On) break n;
    case si:
      if (i.last) {
        l >>>= g & 7, g -= g & 7, i.mode = Yi;
        break;
      }
      for (; g < 3; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      switch (i.last = l & 1, l >>>= 1, g -= 1, l & 3) {
        case 0:
          i.mode = fa;
          break;
        case 1:
          if (Qh(i), i.mode = jn, a === On) {
            l >>>= 2, g -= 2;
            break n;
          }
          break;
        case 2:
          i.mode = Xa;
          break;
        case 3:
          n.msg = "invalid block type", i.mode = m;
      }
      l >>>= 2, g -= 2;
      break;
    case fa:
      for (l >>>= g & 7, g -= g & 7; g < 32; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if ((l & 65535) !== (l >>> 16 ^ 65535)) {
        n.msg = "invalid stored block lengths", i.mode = m;
        break;
      }
      if (i.length = l & 65535, l = 0, g = 0, i.mode = di, a === On) break n;
    case di:
      i.mode = Da;
    case Da:
      if (r = i.length, r) {
        if (r > h && (r = h), r > Y && (r = Y), r === 0) break n;
        e.set(u.subarray(o, o + r), t), h -= r, o += r, Y -= r, t += r, i.length -= r;
        break;
      }
      i.mode = O;
      break;
    case Xa:
      for (; g < 14; ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if (i.nlen = (l & 31) + 257, l >>>= 5, g -= 5, i.ndist = (l & 31) + 1, l >>>= 5, g -= 5, i.ncode = (l & 15) + 4, l >>>= 4, g -= 4, i.nlen > 286 || i.ndist > 30) {
        n.msg = "too many length or distance symbols", i.mode = m;
        break;
      }
      i.have = 0, i.mode = pa;
    case pa:
      for (; i.have < i.ncode; ) {
        for (; g < 3; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        i.lens[B[i.have++]] = l & 7, l >>>= 3, g -= 3;
      }
      for (; i.have < 19; ) i.lens[B[i.have++]] = 0;
      if (i.lencode = i.lendyn, i.lenbits = 7, J = { bits: i.lenbits }, S = wn(Zh, i.lens, 0, 19, i.lencode, 0, i.work, J), i.lenbits = J.bits, S) {
        n.msg = "invalid code lengths set", i.mode = m;
        break;
      }
      i.have = 0, i.mode = Ta;
    case Ta:
      for (; i.have < i.nlen + i.ndist; ) {
        for (; T = i.lencode[l & (1 << i.lenbits) - 1], f = T >>> 24, _ = T >>> 16 & 255, p = T & 65535, !(f <= g); ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        if (p < 16) l >>>= f, g -= f, i.lens[i.have++] = p;
        else {
          if (p === 16) {
            for (X = f + 2; g < X; ) {
              if (h === 0) break n;
              h--, l += u[o++] << g, g += 8;
            }
            if (l >>>= f, g -= f, i.have === 0) {
              n.msg = "invalid bit length repeat", i.mode = m;
              break;
            }
            L = i.lens[i.have - 1], r = 3 + (l & 3), l >>>= 2, g -= 2;
          } else if (p === 17) {
            for (X = f + 3; g < X; ) {
              if (h === 0) break n;
              h--, l += u[o++] << g, g += 8;
            }
            l >>>= f, g -= f, L = 0, r = 3 + (l & 7), l >>>= 3, g -= 3;
          } else {
            for (X = f + 7; g < X; ) {
              if (h === 0) break n;
              h--, l += u[o++] << g, g += 8;
            }
            l >>>= f, g -= f, L = 0, r = 11 + (l & 127), l >>>= 7, g -= 7;
          }
          if (i.have + r > i.nlen + i.ndist) {
            n.msg = "invalid bit length repeat", i.mode = m;
            break;
          }
          for (; r--; ) i.lens[i.have++] = L;
        }
      }
      if (i.mode === m) break;
      if (i.lens[256] === 0) {
        n.msg = "invalid code -- missing end-of-block", i.mode = m;
        break;
      }
      if (i.lenbits = 9, J = { bits: i.lenbits }, S = wn(su, i.lens, 0, i.nlen, i.lencode, 0, i.work, J), i.lenbits = J.bits, S) {
        n.msg = "invalid literal/lengths set", i.mode = m;
        break;
      }
      if (i.distbits = 6, i.distcode = i.distdyn, J = { bits: i.distbits }, S = wn(du, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, J), i.distbits = J.bits, S) {
        n.msg = "invalid distances set", i.mode = m;
        break;
      }
      if (i.mode = jn, a === On) break n;
    case jn:
      i.mode = In;
    case In:
      if (h >= 6 && Y >= 258) {
        n.next_out = t, n.avail_out = Y, n.next_in = o, n.avail_in = h, i.hold = l, i.bits = g, rh(n, d), t = n.next_out, e = n.output, Y = n.avail_out, o = n.next_in, u = n.input, h = n.avail_in, l = i.hold, g = i.bits, i.mode === O && (i.back = -1);
        break;
      }
      for (i.back = 0; T = i.lencode[l & (1 << i.lenbits) - 1], f = T >>> 24, _ = T >>> 16 & 255, p = T & 65535, !(f <= g); ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if (_ && (_ & 240) === 0) {
        for (Z = f, Q = _, w = p; T = i.lencode[w + ((l & (1 << Z + Q) - 1) >> Z)], f = T >>> 24, _ = T >>> 16 & 255, p = T & 65535, !(Z + f <= g); ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        l >>>= Z, g -= Z, i.back += Z;
      }
      if (l >>>= f, g -= f, i.back += f, i.length = p, _ === 0) {
        i.mode = Ma;
        break;
      }
      if (_ & 32) {
        i.back = -1, i.mode = O;
        break;
      }
      if (_ & 64) {
        n.msg = "invalid literal/length code", i.mode = m;
        break;
      }
      i.extra = _ & 15, i.mode = Ha;
    case Ha:
      if (i.extra) {
        for (X = i.extra; g < X; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        i.length += l & (1 << i.extra) - 1, l >>>= i.extra, g -= i.extra, i.back += i.extra;
      }
      i.was = i.length, i.mode = _a;
    case _a:
      for (; T = i.distcode[l & (1 << i.distbits) - 1], f = T >>> 24, _ = T >>> 16 & 255, p = T & 65535, !(f <= g); ) {
        if (h === 0) break n;
        h--, l += u[o++] << g, g += 8;
      }
      if ((_ & 240) === 0) {
        for (Z = f, Q = _, w = p; T = i.distcode[w + ((l & (1 << Z + Q) - 1) >> Z)], f = T >>> 24, _ = T >>> 16 & 255, p = T & 65535, !(Z + f <= g); ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        l >>>= Z, g -= Z, i.back += Z;
      }
      if (l >>>= f, g -= f, i.back += f, _ & 64) {
        n.msg = "invalid distance code", i.mode = m;
        break;
      }
      i.offset = p, i.extra = _ & 15, i.mode = Qa;
    case Qa:
      if (i.extra) {
        for (X = i.extra; g < X; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        i.offset += l & (1 << i.extra) - 1, l >>>= i.extra, g -= i.extra, i.back += i.extra;
      }
      if (i.offset > i.dmax) {
        n.msg = "invalid distance too far back", i.mode = m;
        break;
      }
      i.mode = ya;
    case ya:
      if (Y === 0) break n;
      if (r = d - Y, i.offset > r) {
        if (r = i.offset - r, r > i.whave && i.sane) {
          n.msg = "invalid distance too far back", i.mode = m;
          break;
        }
        r > i.wnext ? (r -= i.wnext, C = i.wsize - r) : C = i.wnext - r, r > i.length && (r = i.length), y = i.window;
      } else y = e, C = t - i.offset, r = i.length;
      r > Y && (r = Y), Y -= r, i.length -= r;
      do
        e[t++] = y[C++];
      while (--r);
      i.length === 0 && (i.mode = In);
      break;
    case Ma:
      if (Y === 0) break n;
      e[t++] = i.length, Y--, i.mode = In;
      break;
    case Yi:
      if (i.wrap) {
        for (; g < 32; ) {
          if (h === 0) break n;
          h--, l |= u[o++] << g, g += 8;
        }
        if (d -= Y, n.total_out += d, i.total += d, i.wrap & 4 && d && (n.adler = i.check = i.flags ? F(i.check, e, d, t - d) : Gn(i.check, e, d, t - d)), d = Y, i.wrap & 4 && (i.flags ? l : Ba(l)) !== i.check) {
          n.msg = "incorrect data check", i.mode = m;
          break;
        }
        l = 0, g = 0;
      }
      i.mode = ma;
    case ma:
      if (i.wrap && i.flags) {
        for (; g < 32; ) {
          if (h === 0) break n;
          h--, l += u[o++] << g, g += 8;
        }
        if (i.wrap & 4 && l !== (i.total & 4294967295)) {
          n.msg = "incorrect length check", i.mode = m;
          break;
        }
        l = 0, g = 0;
      }
      i.mode = wa;
    case wa:
      S = Sh;
      break n;
    case m:
      S = Yu;
      break n;
    case Lu:
      return cu;
    case Zu:
    default:
      return K;
  }
  return n.next_out = t, n.avail_out = Y, n.next_in = o, n.avail_in = h, i.hold = l, i.bits = g, (i.wsize || d !== n.avail_out && i.mode < m && (i.mode < Yi || a !== ga)) && Du(n, n.output, n.next_out, d - n.avail_out), c -= n.avail_in, d -= n.avail_out, n.total_in += c, n.total_out += d, i.total += d, i.wrap & 4 && d && (n.adler = i.check = i.flags ? F(i.check, e, d, n.next_out - d) : Gn(i.check, e, d, n.next_out - d)), n.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === O ? 128 : 0) + (i.mode === jn || i.mode === di ? 256 : 0), (c === 0 && d === 0 || a === ga) && S === rn && (S = fh), S;
}, Mh = (n) => {
  if (sn(n)) return K;
  let a = n.state;
  return a.window && (a.window = null), n.state = null, rn;
}, mh = (n, a) => {
  if (sn(n)) return K;
  const i = n.state;
  return (i.wrap & 2) === 0 ? K : (i.head = a, a.done = false, rn);
}, wh = (n, a) => {
  const i = a.length;
  let u, e, o;
  return sn(n) || (u = n.state, u.wrap !== 0 && u.mode !== Vn) ? K : u.mode === Vn && (e = 1, e = Gn(e, a, i, 0), e !== u.check) ? Yu : (o = Du(n, a, i, i), o ? (u.mode = Lu, cu) : (u.havedict = 1, rn));
};
var Bh = Su, Fh = Ju, bh = Cu, xh = _h, Gh = fu, Nh = yh, vh = Mh, kh = mh, Ph = wh, Kh = "pako inflate (from Nodeca project)", I = { inflateReset: Bh, inflateReset2: Fh, inflateResetKeep: bh, inflateInit: xh, inflateInit2: Gh, inflate: Nh, inflateEnd: vh, inflateGetHeader: kh, inflateSetDictionary: Ph, inflateInfo: Kh };
function Eh() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
}
var Wh = Eh;
const Xu = Object.prototype.toString, { Z_NO_FLUSH: Rh, Z_FINISH: Ah, Z_OK: kn, Z_STREAM_END: Zi, Z_NEED_DICT: Ci, Z_STREAM_ERROR: zh, Z_DATA_ERROR: ba, Z_MEM_ERROR: Oh } = Kn;
function Rn(n) {
  this.options = ii.assign({ chunkSize: 1024 * 64, windowBits: 15, to: "" }, n || {});
  const a = this.options;
  a.raw && a.windowBits >= 0 && a.windowBits < 16 && (a.windowBits = -a.windowBits, a.windowBits === 0 && (a.windowBits = -15)), a.windowBits >= 0 && a.windowBits < 16 && !(n && n.windowBits) && (a.windowBits += 32), a.windowBits > 15 && a.windowBits < 48 && (a.windowBits & 15) === 0 && (a.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new gu(), this.strm.avail_out = 0;
  let i = I.inflateInit2(this.strm, a.windowBits);
  if (i !== kn) throw new Error(hn[i]);
  if (this.header = new Wh(), I.inflateGetHeader(this.strm, this.header), a.dictionary && (typeof a.dictionary == "string" ? a.dictionary = vn.string2buf(a.dictionary) : Xu.call(a.dictionary) === "[object ArrayBuffer]" && (a.dictionary = new Uint8Array(a.dictionary)), a.raw && (i = I.inflateSetDictionary(this.strm, a.dictionary), i !== kn))) throw new Error(hn[i]);
}
Rn.prototype.push = function(n, a) {
  const i = this.strm, u = this.options.chunkSize, e = this.options.dictionary;
  let o, t, h;
  if (this.ended) return false;
  for (a === ~~a ? t = a : t = a === true ? Ah : Rh, Xu.call(n) === "[object ArrayBuffer]" ? i.input = new Uint8Array(n) : i.input = n, i.next_in = 0, i.avail_in = i.input.length; ; ) {
    for (i.avail_out === 0 && (i.output = new Uint8Array(u), i.next_out = 0, i.avail_out = u), o = I.inflate(i, t), o === Ci && e && (o = I.inflateSetDictionary(i, e), o === kn ? o = I.inflate(i, t) : o === ba && (o = Ci)); i.avail_in > 0 && o === Zi && i.state.wrap > 0 && n[i.next_in] !== 0; ) I.inflateReset(i), o = I.inflate(i, t);
    switch (o) {
      case zh:
      case ba:
      case Ci:
      case Oh:
        return this.onEnd(o), this.ended = true, false;
    }
    if (h = i.avail_out, i.next_out && (i.avail_out === 0 || o === Zi)) if (this.options.to === "string") {
      let Y = vn.utf8border(i.output, i.next_out), l = i.next_out - Y, g = vn.buf2string(i.output, Y);
      i.next_out = l, i.avail_out = u - l, l && i.output.set(i.output.subarray(Y, Y + l), 0), this.onData(g);
    } else this.onData(i.output.length === i.next_out ? i.output : i.output.subarray(0, i.next_out));
    if (!(o === kn && h === 0)) {
      if (o === Zi) return o = I.inflateEnd(this.strm), this.onEnd(o), this.ended = true, true;
      if (i.avail_in === 0) break;
    }
  }
  return true;
};
Rn.prototype.onData = function(n) {
  this.chunks.push(n);
};
Rn.prototype.onEnd = function(n) {
  n === kn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ii.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
};
function Pi(n, a) {
  const i = new Rn(a);
  if (i.push(n), i.err) throw i.msg || hn[i.err];
  return i.result;
}
function jh(n, a) {
  return a = a || {}, a.raw = true, Pi(n, a);
}
var Ih = Rn, Uh = Pi, $h = jh, qh = Pi, Vh = { Inflate: Ih, inflate: Uh, inflateRaw: $h, ungzip: qh };
const { Deflate: ng, deflate: ig, deflateRaw: ag, gzip: ug } = hh, { Inflate: eg, inflate: og, inflateRaw: lg, ungzip: tg } = Vh;
var hg = ng, gg = ig, rg = ag, sg = ug, dg = eg, Yg = og, cg = lg, Lg = tg, Zg = Kn, pu = { Deflate: hg, deflate: gg, deflateRaw: rg, gzip: sg, Inflate: dg, inflate: Yg, inflateRaw: cg, ungzip: Lg, constants: Zg };
const mi = "lost_in_translation_cache";
function Cg(n) {
  try {
    return JSON.parse(localStorage.getItem(mi) || "{}")[n.toLowerCase().trim()] || null;
  } catch {
    return null;
  }
}
function Sg(n) {
  try {
    const a = JSON.parse(localStorage.getItem(mi) || "{}");
    a[n.original.toLowerCase().trim()] = n;
    const i = JSON.stringify(a);
    i.length < 5e6 && localStorage.setItem(mi, i);
  } catch {
  }
}
function Jg(n) {
  const a = JSON.stringify(n), i = pu.deflate(new TextEncoder().encode(a));
  return btoa(String.fromCharCode(...i)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fg(n) {
  try {
    const a = n.replace(/-/g, "+").replace(/_/g, "/"), i = a + "=".repeat((4 - a.length % 4) % 4), u = atob(i), e = new Uint8Array([...u].map((h) => h.charCodeAt(0))), o = pu.inflate(e), t = new TextDecoder().decode(o);
    return JSON.parse(t);
  } catch {
    return null;
  }
}
function Dg(n) {
  const a = Jg(n);
  window.history.replaceState(null, "", `#${a}`);
}
function Xg() {
  const n = window.location.hash.slice(1);
  return n ? fg(n) : null;
}
function U(n) {
  const a = document.createElement("div");
  return a.textContent = n, a.innerHTML;
}
function pg(n, a, i) {
  Sg(a), Dg(a);
  const u = Math.round(a.totalDrift * 100), e = bu(a.original, a.finalText), o = a.original.trim().split(/\s+/).length === 1, t = a.original.toLowerCase().trim() === a.finalText.toLowerCase().trim(), h = e.map(({ word: d, preserved: r }) => `<span class="${r ? "word-preserved" : "word-changed"}">${U(d)}</span>`).join(" ");
  let Y = "";
  if (o && a.steps.length > 0) {
    const d = a.steps.find((r) => r.backTranslation && r.backTranslation.toLowerCase() !== a.original.toLowerCase());
    (d == null ? void 0 : d.backTranslation) && (Y = `Fun fact: &ldquo;${U(a.original)}&rdquo; in ${d.language.name} translates to &ldquo;${U(d.text)}&rdquo; which means &ldquo;${U(d.backTranslation)}&rdquo; in English!`);
  }
  n.innerHTML = `
    <div class="reveal">
      <div class="reveal-header">
        ${t ? `<div class="perfect-badge">\u{1F389} Perfect translation!</div>
               <p class="perfect-msg">This sentence survived ${a.chain.length - 1} languages unscathed. That&rsquo;s extremely rare.</p>` : ""}

        <div class="comparison-card">
          <div class="comp-label">Original</div>
          <div class="comp-original">&ldquo;${U(a.original)}&rdquo;</div>

          <div class="flag-trail-mini">
            ${a.chain.map((d) => `<span title="${d.name}">${R(d.countryCode)}</span>`).join(" ")}
          </div>

          <div class="comp-label gold">After ${a.chain.length - 1} translations</div>
          <div class="comp-final">&ldquo;${U(a.finalText)}&rdquo;</div>

          <div class="word-highlight">${h}</div>

          <div class="drift-score-card">
            <div class="drift-number">${u}%</div>
            <div class="drift-caption">lost in translation</div>
          </div>
        </div>

        ${o && Y ? `<div class="fun-fact">${Y}</div>` : ""}
      </div>

      <div class="journey-timeline">
        <h3>The Journey</h3>
        <div class="timeline" id="timeline"></div>
      </div>

      <div class="share-section">
        <button class="btn-primary" id="share-btn">\u{1F4E4} Share result</button>
        <button class="btn-secondary" id="copy-btn">\u{1F4CB} Copy to clipboard</button>
        <button class="btn-secondary" id="dl-btn">\u{1F5BC} Download as image</button>
        <button class="btn-ghost" id="restart-btn">\u2190 Try another sentence</button>
      </div>
    </div>
  `;
  const l = n.querySelector("#timeline"), g = xa(R(a.chain[0].countryCode), a.chain[0].name, a.original, void 0, 0, true);
  l.appendChild(g), a.steps.forEach((d, r) => {
    l.appendChild(xa(R(d.language.countryCode), d.language.name, d.text, d.transliteration, d.driftScore, false, d.language.rtl, d.backTranslation));
  }), l.querySelectorAll(".tl-entry").forEach((d, r) => {
    d.style.animationDelay = `${r * 80}ms`;
  }), n.querySelector("#share-btn").addEventListener("click", () => fl(a)), n.querySelector("#copy-btn").addEventListener("click", async () => {
    const d = `"${a.original}" \u2192 "${a.finalText}" (${u}% lost in translation)

Try it: ${window.location.href}`;
    await Ka(d);
    const r = n.querySelector("#copy-btn");
    r.textContent = "\u2713 Copied!", setTimeout(() => r.textContent = "\u{1F4CB} Copy to clipboard", 2e3);
  }), n.querySelector("#dl-btn").addEventListener("click", () => Dl(a)), n.querySelector("#restart-btn").addEventListener("click", () => {
    window.history.replaceState(null, "", window.location.pathname), i();
  });
}
function xa(n, a, i, u, e, o, t, h) {
  const Y = document.createElement("div");
  Y.className = `tl-entry${o ? " tl-original" : ""} fade-in-up`;
  const l = !o && h, g = e > 0.66 ? "#ff6b6b" : e > 0.33 ? "#f7dc6f" : "#4ecdc4";
  return Y.innerHTML = `
    <div class="tl-marker">
      <span class="tl-flag">${n}</span>
      <div class="tl-line"></div>
    </div>
    <div class="tl-content">
      <div class="tl-lang">${a}${o ? " (Original)" : ""}</div>
      <div class="tl-text" ${t ? 'dir="rtl"' : ""}>${U(i)}</div>
      ${u ? `<div class="tl-translit">${U(u)}</div>` : ""}
      ${l ? `<div class="tl-back-translation">\u2192 English: &ldquo;${U(h)}&rdquo;</div>` : ""}
      ${o ? "" : `<div class="tl-drift" style="color:${g}">${Math.round(e * 100)}% drift</div>`}
    </div>
  `, Y;
}
const Dn = document.getElementById("app"), Ga = Xg();
Ga ? Ki(Ga) : Tu();
function Tu() {
  Dn.innerHTML = "", mu(Dn, (n, a) => {
    const i = Cg(n);
    i && i.chain.length === a.length && i.chain.every((u, e) => u.code === a[e].code) ? Ki(i) : Tg(n, a);
  });
}
function Tg(n, a) {
  Dn.innerHTML = "", Cl(Dn, n, a, (i) => {
    Ki(i);
  });
}
function Ki(n) {
  Dn.innerHTML = "", pg(Dn, n, () => {
    window.history.replaceState(null, "", window.location.pathname), Tu();
  });
}
