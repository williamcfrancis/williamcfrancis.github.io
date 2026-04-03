(function() {
  const a = document.createElement("link").relList;
  if (a && a.supports && a.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) u(o);
  new MutationObserver((o) => {
    for (const e of o) if (e.type === "childList") for (const l of e.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && u(l);
  }).observe(document, { childList: true, subtree: true });
  function i(o) {
    const e = {};
    return o.integrity && (e.integrity = o.integrity), o.referrerPolicy && (e.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? e.credentials = "include" : o.crossOrigin === "anonymous" ? e.credentials = "omit" : e.credentials = "same-origin", e;
  }
  function u(o) {
    if (o.ep) return;
    o.ep = true;
    const e = i(o);
    fetch(o.href, e);
  }
})();
function O(n) {
  return [...n.toUpperCase()].map((a) => String.fromCodePoint(a.charCodeAt(0) + 127397)).join("");
}
const mi = [{ code: "en", name: "English", nativeName: "English", countryCode: "GB" }, { code: "ja", name: "Japanese", nativeName: "\u65E5\u672C\u8A9E", countryCode: "JP", nonLatin: true }, { code: "sw", name: "Swahili", nativeName: "Kiswahili", countryCode: "KE" }, { code: "ar", name: "Arabic", nativeName: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", countryCode: "SA", rtl: true, nonLatin: true }, { code: "hi", name: "Hindi", nativeName: "\u0939\u093F\u0928\u094D\u0926\u0940", countryCode: "IN", nonLatin: true }, { code: "ko", name: "Korean", nativeName: "\uD55C\uAD6D\uC5B4", countryCode: "KR", nonLatin: true }, { code: "is", name: "Icelandic", nativeName: "\xCDslenska", countryCode: "IS" }, { code: "vi", name: "Vietnamese", nativeName: "Ti\u1EBFng Vi\u1EC7t", countryCode: "VN" }, { code: "tr", name: "Turkish", nativeName: "T\xFCrk\xE7e", countryCode: "TR" }, { code: "el", name: "Greek", nativeName: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC", countryCode: "GR", nonLatin: true }, { code: "th", name: "Thai", nativeName: "\u0E44\u0E17\u0E22", countryCode: "TH", nonLatin: true }, { code: "he", name: "Hebrew", nativeName: "\u05E2\u05D1\u05E8\u05D9\u05EA", countryCode: "IL", rtl: true, nonLatin: true }, { code: "yo", name: "Yoruba", nativeName: "Yor\xF9b\xE1", countryCode: "NG" }, { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", countryCode: "ID" }, { code: "hu", name: "Hungarian", nativeName: "Magyar", countryCode: "HU" }, { code: "fa", name: "Farsi", nativeName: "\u0641\u0627\u0631\u0633\u06CC", countryCode: "IR", rtl: true, nonLatin: true }, { code: "zh-CN", name: "Chinese", nativeName: "\u4E2D\u6587", countryCode: "CN", nonLatin: true }, { code: "zu", name: "Zulu", nativeName: "isiZulu", countryCode: "ZA" }, { code: "pt", name: "Portuguese", nativeName: "Portugu\xEAs", countryCode: "PT" }, { code: "ru", name: "Russian", nativeName: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", countryCode: "RU", nonLatin: true }, { code: "fr", name: "French", nativeName: "Fran\xE7ais", countryCode: "FR" }, { code: "de", name: "German", nativeName: "Deutsch", countryCode: "DE" }, { code: "es", name: "Spanish", nativeName: "Espa\xF1ol", countryCode: "ES" }, { code: "it", name: "Italian", nativeName: "Italiano", countryCode: "IT" }, { code: "nl", name: "Dutch", nativeName: "Nederlands", countryCode: "NL" }, { code: "pl", name: "Polish", nativeName: "Polski", countryCode: "PL" }, { code: "uk", name: "Ukrainian", nativeName: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430", countryCode: "UA", nonLatin: true }, { code: "cs", name: "Czech", nativeName: "\u010Ce\u0161tina", countryCode: "CZ" }, { code: "ro", name: "Romanian", nativeName: "Rom\xE2n\u0103", countryCode: "RO" }, { code: "sv", name: "Swedish", nativeName: "Svenska", countryCode: "SE" }, { code: "da", name: "Danish", nativeName: "Dansk", countryCode: "DK" }, { code: "fi", name: "Finnish", nativeName: "Suomi", countryCode: "FI" }, { code: "no", name: "Norwegian", nativeName: "Norsk", countryCode: "NO" }, { code: "bg", name: "Bulgarian", nativeName: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438", countryCode: "BG", nonLatin: true }, { code: "hr", name: "Croatian", nativeName: "Hrvatski", countryCode: "HR" }, { code: "sk", name: "Slovak", nativeName: "Sloven\u010Dina", countryCode: "SK" }, { code: "sl", name: "Slovenian", nativeName: "Sloven\u0161\u010Dina", countryCode: "SI" }, { code: "et", name: "Estonian", nativeName: "Eesti", countryCode: "EE" }, { code: "lv", name: "Latvian", nativeName: "Latvie\u0161u", countryCode: "LV" }, { code: "lt", name: "Lithuanian", nativeName: "Lietuvi\u0173", countryCode: "LT" }, { code: "ka", name: "Georgian", nativeName: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8", countryCode: "GE", nonLatin: true }, { code: "hy", name: "Armenian", nativeName: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", countryCode: "AM", nonLatin: true }, { code: "bn", name: "Bengali", nativeName: "\u09AC\u09BE\u0982\u09B2\u09BE", countryCode: "BD", nonLatin: true }, { code: "ta", name: "Tamil", nativeName: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD", countryCode: "LK", nonLatin: true }, { code: "te", name: "Telugu", nativeName: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41", countryCode: "IN", nonLatin: true }, { code: "ml", name: "Malayalam", nativeName: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02", countryCode: "IN", nonLatin: true }, { code: "my", name: "Myanmar", nativeName: "\u1019\u103C\u1014\u103A\u1019\u102C", countryCode: "MM", nonLatin: true }, { code: "km", name: "Khmer", nativeName: "\u1781\u17D2\u1798\u17C2\u179A", countryCode: "KH", nonLatin: true }, { code: "lo", name: "Lao", nativeName: "\u0EA5\u0EB2\u0EA7", countryCode: "LA", nonLatin: true }, { code: "ne", name: "Nepali", nativeName: "\u0928\u0947\u092A\u093E\u0932\u0940", countryCode: "NP", nonLatin: true }, { code: "mn", name: "Mongolian", nativeName: "\u041C\u043E\u043D\u0433\u043E\u043B", countryCode: "MN", nonLatin: true }, { code: "ms", name: "Malay", nativeName: "Melayu", countryCode: "MY" }, { code: "tl", name: "Filipino", nativeName: "Filipino", countryCode: "PH" }, { code: "ur", name: "Urdu", nativeName: "\u0627\u0631\u062F\u0648", countryCode: "PK", rtl: true, nonLatin: true }, { code: "am", name: "Amharic", nativeName: "\u12A0\u121B\u122D\u129B", countryCode: "ET", nonLatin: true }, { code: "ha", name: "Hausa", nativeName: "Hausa", countryCode: "NE" }, { code: "ig", name: "Igbo", nativeName: "Igbo", countryCode: "NG" }, { code: "mg", name: "Malagasy", nativeName: "Malagasy", countryCode: "MG" }, { code: "so", name: "Somali", nativeName: "Soomaali", countryCode: "SO" }, { code: "sq", name: "Albanian", nativeName: "Shqip", countryCode: "AL" }, { code: "cy", name: "Welsh", nativeName: "Cymraeg", countryCode: "GB" }, { code: "ga", name: "Irish", nativeName: "Gaeilge", countryCode: "IE" }, { code: "mt", name: "Maltese", nativeName: "Malti", countryCode: "MT" }, { code: "la", name: "Latin", nativeName: "Latina", countryCode: "VA" }, { code: "az", name: "Azerbaijani", nativeName: "Az\u0259rbaycan", countryCode: "AZ" }, { code: "kk", name: "Kazakh", nativeName: "\u049A\u0430\u0437\u0430\u049B", countryCode: "KZ", nonLatin: true }, { code: "uz", name: "Uzbek", nativeName: "O'zbek", countryCode: "UZ" }, { code: "mi", name: "Maori", nativeName: "Te Reo M\u0101ori", countryCode: "NZ" }];
function Ia(n) {
  return mi.find((a) => a.code === n);
}
const ku = ["en", "ja", "sw", "ar", "hi", "ko", "is", "vi", "tr", "el", "th", "he", "yo", "id", "hu", "fa", "zh-CN", "zu", "pt", "ru", "en"], Pu = ["en", "ja", "sw", "ar", "hi", "ko", "is", "vi", "tr", "el", "th", "he", "yo", "id", "hu", "fa", "zh-CN", "zu", "pt", "ru", "fr", "bn", "ka", "am", "lo", "mn", "cs", "fi", "sq", "cy", "ta", "km", "my", "ur", "bg", "ro", "ms", "tl", "ne", "az", "kk", "et", "lv", "lt", "mg", "so", "ga", "mt", "la", "mi", "en"], Eu = ku.map(Ia), Vi = Pu.map(Ia);
function Ku(n, a, i, u) {
  let o = [...a];
  function e() {
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
          <button class="btn-primary" id="cust-save">Save chain (${o.length} languages)</button>
        </div>
      </div>
    `;
    const l = n.querySelector("#chain-list"), h = n.querySelector("#add-lang-select");
    o.forEach((g, L) => {
      const c = L === 0 || L === o.length - 1, r = document.createElement("div");
      r.className = "chain-item" + (c ? " fixed" : ""), r.draggable = !c, r.dataset.index = String(L), r.innerHTML = `
        <span class="drag-handle">${c ? "" : "\u22EE\u22EE"}</span>
        <span class="ci-flag">${O(g.countryCode)}</span>
        <span class="ci-name">${g.name}</span>
        <span class="ci-native">${g.nativeName}</span>
        ${c ? '<span class="ci-fixed">fixed</span>' : `<button class="ci-remove" data-idx="${L}">\u2715</button>`}
      `, l.appendChild(r);
    });
    const d = new Set(o.map((g) => g.code));
    mi.filter((g) => !d.has(g.code)).forEach((g) => {
      const L = document.createElement("option");
      L.value = g.code, L.textContent = `${O(g.countryCode)} ${g.name} (${g.nativeName})`, h.appendChild(L);
    });
    let t = null;
    l.addEventListener("dragstart", (g) => {
      const L = g.target.closest(".chain-item");
      L && (t = parseInt(L.dataset.index), L.classList.add("dragging"), g.dataTransfer.effectAllowed = "move");
    }), l.addEventListener("dragend", (g) => {
      const L = g.target.closest(".chain-item");
      L && L.classList.remove("dragging"), t = null, l.querySelectorAll(".chain-item").forEach((c) => c.classList.remove("drag-over"));
    }), l.addEventListener("dragover", (g) => {
      g.preventDefault(), g.dataTransfer.dropEffect = "move";
      const L = g.target.closest(".chain-item");
      if (!L) return;
      const c = parseInt(L.dataset.index);
      c === 0 || c === o.length - 1 || (l.querySelectorAll(".chain-item").forEach((r) => r.classList.remove("drag-over")), L.classList.add("drag-over"));
    }), l.addEventListener("drop", (g) => {
      if (g.preventDefault(), t === null) return;
      const L = g.target.closest(".chain-item");
      if (!L) return;
      const c = parseInt(L.dataset.index);
      if (c === 0 || c === o.length - 1 || t === c) return;
      const [r] = o.splice(t, 1);
      o.splice(c, 0, r), e();
    }), l.addEventListener("click", (g) => {
      const L = g.target.closest(".ci-remove");
      if (!L || o.length <= 5) return;
      const c = parseInt(L.dataset.idx);
      o.splice(c, 1), e();
    }), h.addEventListener("change", () => {
      const g = h.value;
      if (!g) return;
      const L = mi.find((c) => c.code === g);
      L && (o.splice(o.length - 1, 0, L), e());
    }), n.querySelector("#cust-close").addEventListener("click", u), n.querySelector("#cust-cancel").addEventListener("click", u), n.querySelector("#cust-save").addEventListener("click", () => {
      o.length < 5 || i(o);
    });
  }
  e();
}
const Wu = ["The early bird catches the worm", "I can't believe it's not butter", "To be or not to be, that is the question", "Whoever fights monsters should see to it that in the process they do not become a monster", "All that glitters is not gold", "A journey of a thousand miles begins with a single step", "The grass is always greener on the other side", "Actions speak louder than words", "Every cloud has a silver lining", "Curiosity killed the cat but satisfaction brought it back", "The pen is mightier than the sword", "You miss 100% of the shots you never take", "Not all those who wander are lost", "In the middle of difficulty lies opportunity", "Time flies like an arrow, fruit flies like a banana", "I think therefore I am"];
function Ru(n) {
  const a = [...Wu];
  for (let i = a.length - 1; i > 0; i--) {
    const u = Math.floor(Math.random() * (i + 1));
    [a[i], a[u]] = [a[u], a[i]];
  }
  return a.slice(0, n);
}
function Au(n, a) {
  let i = [...Eu], u = false;
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
  const o = n.querySelector("#sentence-input"), e = n.querySelector("#fake-cursor"), l = n.querySelector("#translate-btn"), h = n.querySelector("#customize-btn"), d = n.querySelector("#chaos-btn"), t = n.querySelector("#chain-preview"), g = n.querySelector("#suggestion-buttons"), L = n.querySelector("#customize-overlay");
  Ru(4).forEach((Y) => {
    const D = document.createElement("button");
    D.className = "suggestion-btn", D.textContent = `"${Y}"`, D.addEventListener("click", () => {
      o.value = Y, o.dispatchEvent(new Event("input")), o.focus();
    }), g.appendChild(D);
  });
  function c() {
    const D = (u ? Vi : i).map((X) => `<span class="chain-flag" title="${X.name}">${O(X.countryCode)}</span>`);
    t.innerHTML = D.join('<span class="chain-arrow">\u2192</span>');
  }
  c(), o.addEventListener("input", () => {
    const Y = o.value.trim().length > 0;
    l.disabled = !Y, e.classList.toggle("hidden", Y);
  }), o.addEventListener("focus", () => {
    o.value.trim().length === 0 && e.classList.remove("hidden");
  }), o.addEventListener("blur", () => {
    o.value.trim().length === 0 && e.classList.remove("hidden");
  }), o.focus(), l.addEventListener("click", () => {
    const Y = o.value.trim();
    Y && (l.disabled = true, l.textContent = "Translating\u2026", a(Y, u ? [...Vi] : [...i]));
  }), o.addEventListener("keydown", (Y) => {
    Y.key === "Enter" && !Y.shiftKey && (Y.preventDefault(), l.click());
  }), d.addEventListener("click", () => {
    u = !u, d.classList.toggle("active", u), d.innerHTML = u ? '<span class="chaos-icon">&#9760;</span> Chaos mode ON (50 languages)' : '<span class="chaos-icon">&#9760;</span> Chaos mode', c();
  });
  function r() {
    L.classList.add("hidden");
  }
  h.addEventListener("click", () => {
    L.classList.remove("hidden"), Ku(L, i, (Y) => {
      i = Y, u = false, d.classList.remove("active"), d.innerHTML = '<span class="chaos-icon">&#9760;</span> Chaos mode', c(), r();
    }, r);
  }), document.addEventListener("keydown", (Y) => {
    Y.key === "Escape" && !L.classList.contains("hidden") && r();
  });
}
async function di(n, a, i) {
  const u = await fetch("/.netlify/functions/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: n, sourceLang: a, targetLang: i }) });
  if (!u.ok) {
    const o = await u.json().catch(() => ({ error: "Translation failed" }));
    throw new Error(o.error || `HTTP ${u.status}`);
  }
  return u.json();
}
function zu(n, a) {
  const i = n.length, u = a.length, o = Array.from({ length: i + 1 }, () => Array(u + 1).fill(0));
  for (let e = 0; e <= i; e++) o[e][0] = e;
  for (let e = 0; e <= u; e++) o[0][e] = e;
  for (let e = 1; e <= i; e++) for (let l = 1; l <= u; l++) o[e][l] = n[e - 1] === a[l - 1] ? o[e - 1][l - 1] : 1 + Math.min(o[e - 1][l - 1], o[e - 1][l], o[e][l - 1]);
  return o[i][u];
}
function Qi(n) {
  return n.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean);
}
function Ou(n, a) {
  const i = Qi(n), u = new Set(Qi(a));
  return i.length === 0 ? 0 : i.filter((e) => u.has(e)).length / i.length;
}
function na(n, a) {
  const i = Ou(n, a), u = Math.max(n.length, a.length), o = u > 0 ? zu(n.toLowerCase(), a.toLowerCase()) / u : 0, e = 0.6 * (1 - i) + 0.4 * o;
  return Math.min(1, Math.max(0, e));
}
function ju(n, a) {
  const i = new Set(Qi(a));
  return n.split(/\s+/).map((u) => ({ word: u, preserved: i.has(u.toLowerCase().replace(/[^\w]/g, "")) }));
}
var Iu = ["\0", "", "", "", "", "", "", "\x07", "\b", "	", `
`, "\v", "\f", "\r", "", "", "", "", "", "", "", "", "", "", "", "", "", "\x1B", "", "", "", "", " ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", "\x7F", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, " ", "!", "C/", "PS", "$?", "Y=", "|", "SS", '"', "(c)", "a", "<<", "!", null, "(r)", "-", "deg", "+-", "2", "3", "'", "u", "P", "*", ",", "1", "o", ">>", "1/4", "1/2", "3/4", "?", "A", "A", "A", "A", "A", "A", "AE", "C", "E", "E", "E", "E", "I", "I", "I", "I", "D", "N", "O", "O", "O", "O", "O", "x", "O", "U", "U", "U", "U", "U", "Th", "ss", "a", "a", "a", "a", "a", "a", "ae", "c", "e", "e", "e", "e", "i", "i", "i", "i", "d", "n", "o", "o", "o", "o", "o", "/", "o", "u", "u", "u", "u", "y", "th", "y"], Uu = ["A", "a", "A", "a", "A", "a", "C", "c", "C", "c", "C", "c", "C", "c", "D", "d", "D", "d", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "G", "g", "G", "g", "G", "g", "G", "g", "H", "h", "H", "h", "I", "i", "I", "i", "I", "i", "I", "i", "I", "i", "IJ", "ij", "J", "j", "K", "k", "k", "L", "l", "L", "l", "L", "l", "L", "l", "L", "l", "N", "n", "N", "n", "N", "n", "'n", "NG", "ng", "O", "o", "O", "o", "O", "o", "OE", "oe", "R", "r", "R", "r", "R", "r", "S", "s", "S", "s", "S", "s", "S", "s", "T", "t", "T", "t", "T", "t", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "W", "w", "Y", "y", "Y", "Z", "z", "Z", "z", "Z", "z", "s", "b", "B", "B", "b", "6", "6", "O", "C", "c", "D", "D", "D", "d", "d", "3", "@", "E", "F", "f", "G", "G", "hv", "I", "I", "K", "k", "l", "l", "W", "N", "n", "O", "O", "o", "OI", "oi", "P", "p", "YR", "2", "2", "SH", "sh", "t", "T", "t", "T", "U", "u", "Y", "V", "Y", "y", "Z", "z", "ZH", "ZH", "zh", "zh", "2", "5", "5", "ts", "w", "|", "||", "|=", "!", "DZ", "Dz", "dz", "LJ", "Lj", "lj", "NJ", "Nj", "nj", "A", "a", "I", "i", "O", "o", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "@", "A", "a", "A", "a", "AE", "ae", "G", "g", "G", "g", "K", "k", "O", "o", "O", "o", "ZH", "zh", "j", "DZ", "D", "dz", "G", "g", "HV", "W", "N", "n", "A", "a", "AE", "ae", "O", "o"], $u = ["A", "a", "A", "a", "E", "e", "E", "e", "I", "i", "I", "i", "O", "o", "O", "o", "R", "r", "R", "r", "U", "u", "U", "u", "S", "s", "T", "t", "Y", "y", "H", "h", "N", "d", "OU", "ou", "Z", "z", "A", "a", "E", "e", "O", "o", "O", "o", "O", "o", "O", "o", "Y", "y", "l", "n", "t", "j", "db", "qp", "A", "C", "c", "L", "T", "s", "z", "?", "?", "B", "U", "V", "E", "e", "J", "j", "Q", "q", "R", "r", "Y", "y", "a", "a", "a", "b", "o", "c", "d", "d", "e", "@", "@", "e", "e", "e", "e", "j", "g", "g", "g", "g", "u", "Y", "h", "h", "i", "i", "I", "l", "l", "l", "lZ", "W", "W", "m", "n", "n", "n", "o", "OE", "O", "F", "R", "R", "R", "R", "r", "r", "R", "R", "R", "s", "S", "j", "S", "S", "t", "t", "U", "U", "v", "^", "W", "Y", "Y", "z", "z", "Z", "Z", "?", "?", "?", "C", "@", "B", "E", "G", "H", "j", "k", "L", "q", "?", "?", "dz", "dZ", "dz", "ts", "tS", "tC", "fN", "ls", "lz", "WW", "]]", "h", "h", "k", "h", "j", "r", "r", "r", "r", "w", "y", "'", '"', "`", "'", "`", "`", "'", "?", "?", "<", ">", "^", "V", "^", "V", "'", "-", "/", "\\", ",", "_", "\\", "/", ":", ".", "`", "'", "^", "V", "+", "-", "V", ".", "@", ",", "~", '"', "R", "X", "G", "l", "s", "x", "?", null, null, null, null, null, null, null, "V", "=", '"'], qu = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "'", ",", null, null, null, null, null, null, null, null, "?", null, null, null, null, null, null, null, "A", ";", "E", "I", "I", null, "O", null, "U", "O", "I", "A", "V", "G", "D", "E", "Z", "I", "Th", "I", "K", "L", "M", "N", "X", "O", "P", "R", null, "S", "T", "Y", "F", "H", "Ps", "O", "I", "Y", "a", "e", "i", "i", "y", "a", "v", "g", "d", "e", "z", "i", "th", "i", "k", "l", "m", "n", "x", "o", "p", "r", "s", "s", "t", "y", "f", "h", "ps", "o", "i", "y", "o", "y", "o", null, "b", "th", "U", "U", "U", "ph", "p", "&", null, null, "St", "st", "W", "w", "Q", "q", "Sp", "sp", "Sh", "sh", "F", "f", "Kh", "kh", "H", "h", "G", "g", "CH", "ch", "Ti", "ti", "k", "r", "c", "j"], Vu = ["Jo", "Yo", "Dj", "Gj", "Ie", "Dz", "I", "Yi", "J", "Lj", "Nj", "Tsh", "Kj", "I", "U", "Dzh", "A", "B", "V", "G", "D", "E", "Zh", "Z", "I", "Y", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "F", "H", "C", "Ch", "Sh", "Shch", null, "Y", null, "E", "Yu", "Ya", "a", "b", "v", "g", "d", "e", "zh", "z", "i", "y", "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "f", "h", "c", "ch", "sh", "shch", null, "y", null, "e", "yu", "ya", "je", "yo", "dj", "gj", "ie", "dz", "i", "yi", "j", "lj", "nj", "tsh", "kj", "i", "u", "dzh", "O", "o", "E", "e", "Ie", "ie", "E", "e", "Ie", "ie", "O", "o", "Io", "io", "Ks", "ks", "Ps", "ps", "F", "f", "Y", "y", "Y", "y", "u", "u", "O", "o", "O", "o", "Ot", "ot", "Q", "q", "*1000*", null, null, null, null, null, "*100.000*", "*1.000.000*", null, null, '"', '"', "R'", "r'", "G'", "g'", "G'", "g'", "G'", "g'", "Zh'", "zh'", "Z'", "z'", "K'", "k'", "K'", "k'", "K'", "k'", "K'", "k'", "N'", "n'", "Ng", "ng", "P'", "p'", "Kh", "kh", "S'", "s'", "T'", "t'", "U", "u", "U'", "u'", "Kh'", "kh'", "Tts", "tts", "Ch'", "ch'", "Ch'", "ch'", "H", "h", "Ch", "ch", "Ch'", "ch'", "`", "Zh", "zh", "K'", "k'", null, null, "N'", "n'", null, null, "Ch", "ch", null, null, null, "a", "a", "A", "a", "Ae", "ae", "Ie", "ie", "@", "@", "@", "@", "Zh", "zh", "Z", "z", "Dz", "dz", "I", "i", "I", "i", "O", "o", "O", "o", "O", "o", "E", "e", "U", "u", "U", "u", "U", "u", "Ch", "ch", null, null, "Y", "y"], ne = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "B", "G", "D", "E", "Z", "E", "E", "T`", "Zh", "I", "L", "Kh", "Ts", "K", "H", "Dz", "Gh", "Ch", "M", "Y", "N", "Sh", "O", "Ch`", "P", "J", "Rh", "S", "V", "T", "R", "Ts`", "W", "P`", "K`", "O", "F", null, null, "<", "'", "/", "!", ",", "?", ".", null, "a", "b", "g", "d", "e", "z", "e", "e", "t`", "zh", "i", "l", "kh", "ts", "k", "h", "dz", "gh", "ch", "m", "y", "n", "sh", "o", "ch`", "p", "j", "rh", "s", "v", "t", "r", "ts`", "w", "p`", "k`", "o", "f", "ew", null, ".", "-", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "@", "e", "a", "o", "i", "e", "e", "a", "a", "o", null, "u", "'", null, null, null, null, null, null, ":", null, null, null, null, null, null, null, null, null, null, null, null, null, "b", "g", "d", "h", "v", "z", "kh", "t", "y", "k", "k", "l", "m", "m", "n", "n", "s", "`", "p", "p", "ts", "ts", "q", "r", "sh", "t", null, null, null, null, null, "V", "oy", "i", "'", '"'], ie = [null, null, null, null, null, null, null, null, null, null, null, null, ",", null, null, null, null, null, null, null, null, null, null, null, null, null, null, ";", null, null, null, "?", null, null, "a", "'", "w'", null, "y'", null, "b", "@", "t", "th", "j", "H", "kh", "d", "dh", "r", "z", "s", "sh", "S", "D", "T", "Z", "aa", "G", null, null, null, null, null, null, "f", "q", "k", "l", "m", "n", "h", "w", "~", "y", "an", "un", "in", "a", "u", "i", "W", null, null, "'", "'", null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "%", ".", ",", "*", null, null, null, "'", "'", "'", null, "'", "'w", "'u", "'y", "tt", "tth", "b", "t", "T", "p", "th", "bh", "'h", "H", "ny", "dy", "H", "ch", "cch", "dd", "D", "D", "Dt", "dh", "ddh", "d", "D", "D", "rr", "R", "R", "R", "R", "R", "R", "j", "R", "S", "S", "S", "S", "S", "T", "GH", "F", "F", "F", "v", "f", "ph", "Q", "Q", "kh", "k", "K", "K", "ng", "K", "g", "G", "N", "G", "G", "G", "L", "L", "L", "L", "N", "N", "N", "N", "N", "h", "Ch", "hy", "h", "H", "@", "W", "oe", "oe", "u", "yu", "yu", "W", "v", "y", "Y", "Y", "W", null, null, "y", "y'", ".", "ae", null, null, null, null, null, null, null, "@", "#", null, null, null, null, null, null, null, null, null, null, "^", null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Sh", "D", "Gh", "&", "+m"], ae = ["//", "/", ",", "!", "!", "-", ",", ",", ";", "?", "~", "{", "}", "*", null, null, "'", null, "b", "g", "g", "d", "d", "h", "w", "z", "H", "t", "t", "y", "yh", "k", "l", "m", "n", "s", "s", "`", "p", "p", "S", "q", "r", "sh", "t", null, null, null, "a", "a", "a", "A", "A", "A", "e", "e", "e", "E", "i", "i", "u", "u", "u", "o", null, "`", "'", null, null, "X", "Q", "@", "@", "|", "+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "h", "sh", "n", "r", "b", "L", "k", "'", "v", "m", "f", "dh", "th", "l", "g", "ny", "s", "d", "z", "t", "y", "p", "j", "ch", "tt", "hh", "kh", "th", "z", "sh", "s", "d", "t", "z", "`", "gh", "q", "w", "a", "aa", "i", "ee", "u", "oo", "e", "ey", "o", "oa"], ue = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", "eN", "e", "e", "ai", "oN", "o", "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "nnn", "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "l", "lll", "v", "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", "RR", "eN", "e", "e", "ai", "oN", "o", "o", "au", null, null, null, "AUM", "'", "'", "`", "'", null, null, null, "q", "khh", "ghh", "z", "dddh", "rh", "f", "yy", "RR", "LL", "L", "LL", " / ", " // ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "RR", null, null, "e", "ai", null, null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", null, "l", null, null, null, "sh", "ss", "s", "h", null, null, "'", null, "aa", "i", "ii", "u", "uu", "R", "RR", null, null, "e", "ai", null, null, "o", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, "rr", "rh", null, "yy", "RR", "LL", "L", "LL", null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "r'", "r`", "Rs", "Rs", "1/", "2/", "3/", "4/", " 1 - 1/", "/16"], ee = [null, null, "N", null, null, "a", "aa", "i", "ii", "u", "uu", null, null, null, null, "ee", "ai", null, null, "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bb", "m", "y", "r", null, "l", "ll", null, "v", "sh", null, "s", "h", null, null, "'", null, "aa", "i", "ii", "u", "uu", null, null, null, null, "ee", "ai", null, null, "oo", "au", null, null, null, null, null, null, null, null, null, null, null, null, "khh", "ghh", "z", "rr", null, "f", null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "N", "H", null, null, "G.E.O.", null, null, null, null, null, null, null, null, null, null, null, null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", null, "eN", null, "e", "ai", "oN", null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "ya", "r", null, "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", "RR", "eN", null, "e", "ai", "oN", null, "o", "au", null, null, null, "AUM", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "RR", null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], oe = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, null, "e", "ai", null, null, "o", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", null, "l", "ll", null, null, "sh", "ss", "s", "h", null, null, "'", "'", "aa", "i", "ii", "u", "uu", "R", null, null, null, "e", "ai", null, null, "o", "au", null, null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, "rr", "rh", null, "yy", "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", null, null, null, "e", "ee", "ai", null, "o", "oo", "au", "k", null, null, null, "ng", "c", null, "j", null, "ny", "tt", null, null, null, "nn", "t", null, null, null, "n", "nnn", "p", null, null, null, "m", "y", "r", "rr", "l", "ll", "lll", "v", null, "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", null, null, null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+10+", "+100+", "+1000+"], le = [null, "N", "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, null, null, null, null, null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", null, "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, "+", "+", null, null, null, null, null, null, null, "lll", null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], te = [null, null, "N", "H", null, "a", "aa", "i", "ii", "u", "uu", "R", "L", null, "e", "ee", "ai", null, "o", "oo", "au", "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", null, "p", "ph", "b", "bh", "m", "y", "r", "rr", "l", "ll", "lll", "v", "sh", "ss", "s", "h", null, null, null, null, "aa", "i", "ii", "u", "uu", "R", null, null, "e", "ee", "ai", null, "o", "oo", "au", null, null, null, null, null, null, null, null, null, null, "+", null, null, null, null, null, null, null, null, "RR", "LL", null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "N", "H", null, "a", "aa", "ae", "aae", "i", "ii", "u", "uu", "R", "RR", "L", "LL", "e", "ee", "ai", "o", "oo", "au", null, null, null, "k", "kh", "g", "gh", "ng", "nng", "c", "ch", "j", "jh", "ny", "jny", "nyj", "tt", "tth", "dd", "ddh", "nn", "nndd", "t", "th", "d", "dh", "n", null, "nd", "p", "ph", "b", "bh", "m", "mb", "y", "r", null, "l", null, null, "v", "sh", "ss", "s", "h", "ll", "f", null, null, null, null, null, null, null, null, "aa", "ae", "aae", "i", "ii", "u", null, "uu", null, "R", "e", "ee", "ai", "o", "oo", "au", "L", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "RR", "LL", " . "], he = [null, "k", "kh", "kh", "kh", "kh", "kh", "ng", "cch", "ch", "ch", "ch", "ch", "y", "d", "t", "th", "th", "th", "n", "d", "t", "th", "th", "th", "n", "b", "p", "ph", "f", "ph", "f", "ph", "m", "y", "r", "R", "l", "L", "w", "s", "s", "s", "h", "l", "`", "h", "~", "a", "a", "aa", "am", "i", "ii", "ue", "uue", "u", "uu", "'", null, null, null, null, "Bh.", "e", "ae", "o", "ai", "ai", "ao", "+", null, null, null, null, null, null, "M", null, " * ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " // ", " /// ", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", null, "kh", null, null, "ng", "ch", null, "s", null, null, "ny", null, null, null, null, null, null, "d", "h", "th", "th", null, "n", "b", "p", "ph", "f", "ph", "f", null, "m", "y", "r", null, "l", null, "w", null, null, "s", "h", null, "`", null, "~", "a", null, "aa", "am", "i", "ii", "y", "yy", "u", "uu", null, "o", "l", "ny", null, null, "e", "ei", "o", "ay", "ai", null, "+", null, null, null, null, null, null, "M", null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, "hn", "hm"], ge = ["AUM", null, null, null, null, null, null, null, " // ", " * ", null, "-", " / ", " / ", " // ", " -/ ", " +/ ", " X/ ", " /XX/ ", " /X/ ", ",", null, null, null, null, null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".5", "1.5", "2.5", "3.5", "4.5", "5.5", "6.5", "7.5", "8.5", "-.5", "+", "*", "^", "_", null, "~", null, "]", "[[", "]]", null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", null, "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "ts", "tsh", "dz", "dzh", "w", "zh", "z", "'", "y", "r", "l", "sh", "ssh", "s", "h", "a", "kss", "r", null, null, null, null, null, null, "aa", "i", "ii", "u", "uu", "R", "RR", "L", "LL", "e", "ee", "o", "oo", "M", "H", "i", "ii", null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", null, "ny", "tt", "tth", "dd", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "ts", "tsh", "dz", "dzh", "w", "zh", "z", "'", "y", "r", "l", "sh", "ss", "s", "h", "a", "kss", "w", "y", "r", null, "X", " :X: ", " /O/ ", " /o/ ", " \\o\\ ", " (O) "], re = ["k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "nny", "tt", "tth", "dd", "ddh", "nn", "tt", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "w", "s", "h", "ll", "a", null, "i", "ii", "u", "uu", "e", null, "o", "au", null, "aa", "i", "ii", "u", "uu", "e", "ai", null, null, null, "N", "'", ":", null, null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " / ", " // ", "n*", "r*", "l*", "e*", "sh", "ss", "R", "RR", "L", "LL", "R", "RR", "L", "LL", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "B", "G", "D", "E", "V", "Z", "T`", "I", "K", "L", "M", "N", "O", "P", "Zh", "R", "S", "T", "U", "P`", "K`", "G'", "Q", "Sh", "Ch`", "C`", "Z'", "C", "Ch", "X", "J", "H", "E", "Y", "W", "Xh", "OE", null, null, null, null, null, null, null, null, null, null, "a", "b", "g", "d", "e", "v", "z", "t`", "i", "k", "l", "m", "n", "o", "p", "zh", "r", "s", "t", "u", "p`", "k`", "g'", "q", "sh", "ch`", "c`", "z'", "c", "ch", "x", "j", "h", "e", "y", "w", "xh", "oe", "f", null, null, null, null, " // "], se = ["g", "gg", "n", "d", "dd", "r", "m", "b", "bb", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", "ng", "nn", "nd", "nb", "dg", "rn", "rr", "rh", "rN", "mb", "mN", "bg", "bn", null, "bs", "bsg", "bst", "bsb", "bss", "bsj", "bj", "bc", "bt", "bp", "bN", "bbN", "sg", "sn", "sd", "sr", "sm", "sb", "sbg", "sss", "s", "sj", "sc", "sk", "st", "sp", "sh", null, null, null, null, "Z", "g", "d", "m", "b", "s", "Z", null, "j", "c", "t", "p", "N", "j", null, null, null, null, "ck", "ch", null, null, "pb", "pN", "hh", "Q", null, null, null, null, null, null, null, "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i", "a-o", "a-u", "ya-o", "ya-yo", "eo-o", "eo-u", "eo-eu", "yeo-o", "yeo-u", "o-eo", "o-e", "o-ye", "o-o", "o-u", "yo-ya", "yo-yae", "yo-yeo", "yo-o", "yo-i", "u-a", "u-ae", "u-eo-eu", "u-ye", "u-u", "yu-a", "yu-eo", "yu-e", "yu-yeo", "yu-ye", "yu-u", "yu-i", "eu-u", "eu-eu", "yi-u", "i-a", "i-ya", "i-o", "i-u", "i-eu", "i-U", "U", "U-eo", "U-u", "U-i", "UU", null, null, null, null, null, "g", "gg", "gs", "n", "nj", "nh", "d", "l", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "c", "k", "t", "p", "h", "gl", "gsg", "ng", "nd", "ns", "nZ", "nt", "dg", "tl", "lgs", "ln", "ld", "lth", "ll", "lmg", "lms", "lbs", "lbh", "rNp", "lss", "lZ", "lk", "lQ", "mg", "ml", "mb", "ms", "mss", "mZ", "mc", "mh", "mN", "bl", "bp", "ph", "pN", "sg", "sd", "sl", "sb", "Z", "g", "ss", null, "kh", "N", "Ns", "NZ", "pb", "pN", "hn", "hl", "hm", "hb", "Q"], de = ["ha", "hu", "hi", "haa", "hee", "he", "ho", null, "la", "lu", "li", "laa", "lee", "le", "lo", "lwa", "hha", "hhu", "hhi", "hhaa", "hhee", "hhe", "hho", "hhwa", "ma", "mu", "mi", "maa", "mee", "me", "mo", "mwa", "sza", "szu", "szi", "szaa", "szee", "sze", "szo", "szwa", "ra", "ru", "ri", "raa", "ree", "re", "ro", "rwa", "sa", "su", "si", "saa", "see", "se", "so", "swa", "sha", "shu", "shi", "shaa", "shee", "she", "sho", "shwa", "qa", "qu", "qi", "qaa", "qee", "qe", "qo", null, "qwa", null, "qwi", "qwaa", "qwee", "qwe", null, null, "qha", "qhu", "qhi", "qhaa", "qhee", "qhe", "qho", null, "qhwa", null, "qhwi", "qhwaa", "qhwee", "qhwe", null, null, "ba", "bu", "bi", "baa", "bee", "be", "bo", "bwa", "va", "vu", "vi", "vaa", "vee", "ve", "vo", "vwa", "ta", "tu", "ti", "taa", "tee", "te", "to", "twa", "ca", "cu", "ci", "caa", "cee", "ce", "co", "cwa", "xa", "xu", "xi", "xaa", "xee", "xe", "xo", null, "xwa", null, "xwi", "xwaa", "xwee", "xwe", null, null, "na", "nu", "ni", "naa", "nee", "ne", "no", "nwa", "nya", "nyu", "nyi", "nyaa", "nyee", "nye", "nyo", "nywa", "'a", "'u", null, "'aa", "'ee", "'e", "'o", "'wa", "ka", "ku", "ki", "kaa", "kee", "ke", "ko", null, "kwa", null, "kwi", "kwaa", "kwee", "kwe", null, null, "kxa", "kxu", "kxi", "kxaa", "kxee", "kxe", "kxo", null, "kxwa", null, "kxwi", "kxwaa", "kxwee", "kxwe", null, null, "wa", "wu", "wi", "waa", "wee", "we", "wo", null, "`a", "`u", "`i", "`aa", "`ee", "`e", "`o", null, "za", "zu", "zi", "zaa", "zee", "ze", "zo", "zwa", "zha", "zhu", "zhi", "zhaa", "zhee", "zhe", "zho", "zhwa", "ya", "yu", "yi", "yaa", "yee", "ye", "yo", null, "da", "du", "di", "daa", "dee", "de", "do", "dwa", "dda", "ddu", "ddi", "ddaa", "ddee", "dde", "ddo", "ddwa"], ce = ["ja", "ju", "ji", "jaa", "jee", "je", "jo", "jwa", "ga", "gu", "gi", "gaa", "gee", "ge", "go", null, "gwa", null, "gwi", "gwaa", "gwee", "gwe", null, null, "gga", "ggu", "ggi", "ggaa", "ggee", "gge", "ggo", null, "tha", "thu", "thi", "thaa", "thee", "the", "tho", "thwa", "cha", "chu", "chi", "chaa", "chee", "che", "cho", "chwa", "pha", "phu", "phi", "phaa", "phee", "phe", "pho", "phwa", "tsa", "tsu", "tsi", "tsaa", "tsee", "tse", "tso", "tswa", "tza", "tzu", "tzi", "tzaa", "tzee", "tze", "tzo", null, "fa", "fu", "fi", "faa", "fee", "fe", "fo", "fwa", "pa", "pu", "pi", "paa", "pee", "pe", "po", "pwa", "rya", "mya", "fya", null, null, null, null, null, null, " ", ".", ",", ";", ":", ":: ", "?", "//", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+", "20+", "30+", "40+", "50+", "60+", "70+", "80+", "90+", "100+", "10,000+", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "a", "e", "i", "o", "u", "v", "ga", "ka", "ge", "gi", "go", "gu", "gv", "ha", "he", "hi", "ho", "hu", "hv", "la", "le", "li", "lo", "lu", "lv", "ma", "me", "mi", "mo", "mu", "na", "hna", "nah", "ne", "ni", "no", "nu", "nv", "qua", "que", "qui", "quo", "quu", "quv", "sa", "s", "se", "si", "so", "su", "sv", "da", "ta", "de", "te", "di", "ti", "do", "du", "dv", "dla", "tla", "tle", "tli", "tlo", "tlu", "tlv", "tsa", "tse", "tsi", "tso", "tsu", "tsv", "wa", "we", "wi", "wo", "wu", "wv", "ya", "ye", "yi", "yo", "yu", "yv"], Ye = [null, "ai", "aai", "i", "ii", "u", "uu", "oo", "ee", "i", "a", "aa", "we", "we", "wi", "wi", "wii", "wii", "wo", "wo", "woo", "woo", "woo", "wa", "wa", "waa", "waa", "waa", "ai", "w", "'", "t", "k", "sh", "s", "n", "w", "n", null, "w", "c", "?", "l", "en", "in", "on", "an", "pai", "paai", "pi", "pii", "pu", "puu", "poo", "hee", "hi", "pa", "paa", "pwe", "pwe", "pwi", "pwi", "pwii", "pwii", "pwo", "pwo", "pwoo", "pwoo", "pwa", "pwa", "pwaa", "pwaa", "pwaa", "p", "p", "h", "tai", "taai", "ti", "tii", "tu", "tuu", "too", "dee", "di", "ta", "taa", "twe", "twe", "twi", "twi", "twii", "twii", "two", "two", "twoo", "twoo", "twa", "twa", "twaa", "twaa", "twaa", "t", "tte", "tti", "tto", "tta", "kai", "kaai", "ki", "kii", "ku", "kuu", "koo", "ka", "kaa", "kwe", "kwe", "kwi", "kwi", "kwii", "kwii", "kwo", "kwo", "kwoo", "kwoo", "kwa", "kwa", "kwaa", "kwaa", "kwaa", "k", "kw", "keh", "kih", "koh", "kah", "gai", "caai", "gi", "gii", "gu", "guu", "coo", "ga", "gaa", "cwe", "cwe", "cwi", "cwi", "cwii", "cwii", "cwo", "cwo", "cwoo", "cwoo", "cwa", "cwa", "cwaa", "cwaa", "cwaa", "g", "th", "mai", "maai", "mi", "mii", "mu", "muu", "moo", "ma", "maa", "mwe", "mwe", "mwi", "mwi", "mwii", "mwii", "mwo", "mwo", "mwoo", "mwoo", "mwa", "mwa", "mwaa", "mwaa", "mwaa", "m", "m", "mh", "m", "m", "nai", "naai", "ni", "nii", "nu", "nuu", "noo", "na", "naa", "nwe", "nwe", "nwa", "nwa", "nwaa", "nwaa", "nwaa", "n", "ng", "nh", "lai", "laai", "li", "lii", "lu", "luu", "loo", "la", "laa", "lwe", "lwe", "lwi", "lwi", "lwii", "lwii", "lwo", "lwo", "lwoo", "lwoo", "lwa", "lwa", "lwaa", "lwaa", "l", "l", "l", "sai", "saai", "si", "sii", "su", "suu", "soo", "sa", "saa", "swe", "swe", "swi", "swi", "swii", "swii", "swo", "swo", "swoo", "swoo"], Le = ["swa", "swa", "swaa", "swaa", "swaa", "s", "s", "sw", "s", "sk", "skw", "sW", "spwa", "stwa", "skwa", "scwa", "she", "shi", "shii", "sho", "shoo", "sha", "shaa", "shwe", "shwe", "shwi", "shwi", "shwii", "shwii", "shwo", "shwo", "shwoo", "shwoo", "shwa", "shwa", "shwaa", "shwaa", "sh", "jai", "yaai", "ji", "jii", "ju", "juu", "yoo", "ja", "jaa", "ywe", "ywe", "ywi", "ywi", "ywii", "ywii", "ywo", "ywo", "ywoo", "ywoo", "ywa", "ywa", "ywaa", "ywaa", "ywaa", "j", "y", "y", "yi", "re", "rai", "le", "raai", "ri", "rii", "ru", "ruu", "lo", "ra", "raa", "la", "rwaa", "rwaa", "r", "r", "r", "vai", "faai", "vi", "vii", "vu", "vuu", "va", "vaa", "fwaa", "fwaa", "v", "the", "the", "thi", "thi", "thii", "thii", "tho", "thoo", "tha", "thaa", "thwaa", "thwaa", "th", "tthe", "tthi", "ttho", "ttha", "tth", "tye", "tyi", "tyo", "tya", "he", "hi", "hii", "ho", "hoo", "ha", "haa", "h", "h", "hk", "qaai", "qi", "qii", "qu", "quu", "qa", "qaa", "q", "tlhe", "tlhi", "tlho", "tlha", "re", "ri", "ro", "ra", "ngaai", "ngi", "ngii", "ngu", "nguu", "nga", "ngaa", "ng", "nng", "she", "shi", "sho", "sha", "the", "thi", "tho", "tha", "th", "lhi", "lhii", "lho", "lhoo", "lha", "lhaa", "lh", "the", "thi", "thii", "tho", "thoo", "tha", "thaa", "th", "b", "e", "i", "o", "a", "we", "wi", "wo", "wa", "ne", "ni", "no", "na", "ke", "ki", "ko", "ka", "he", "hi", "ho", "ha", "ghu", "gho", "ghe", "ghee", "ghi", "gha", "ru", "ro", "re", "ree", "ri", "ra", "wu", "wo", "we", "wee", "wi", "wa", "hwu", "hwo", "hwe", "hwee", "hwi", "hwa", "thu", "tho", "the", "thee", "thi", "tha", "ttu", "tto", "tte", "ttee", "tti", "tta", "pu", "po", "pe", "pee", "pi", "pa", "p", "gu", "go", "ge", "gee", "gi", "ga", "khu", "kho", "khe", "khee", "khi", "kha", "kku", "kko", "kke", "kkee", "kki"], Ze = ["kka", "kk", "nu", "no", "ne", "nee", "ni", "na", "mu", "mo", "me", "mee", "mi", "ma", "yu", "yo", "ye", "yee", "yi", "ya", "ju", "ju", "jo", "je", "jee", "ji", "ji", "ja", "jju", "jjo", "jje", "jjee", "jji", "jja", "lu", "lo", "le", "lee", "li", "la", "dlu", "dlo", "dle", "dlee", "dli", "dla", "lhu", "lho", "lhe", "lhee", "lhi", "lha", "tlhu", "tlho", "tlhe", "tlhee", "tlhi", "tlha", "tlu", "tlo", "tle", "tlee", "tli", "tla", "zu", "zo", "ze", "zee", "zi", "za", "z", "z", "dzu", "dzo", "dze", "dzee", "dzi", "dza", "su", "so", "se", "see", "si", "sa", "shu", "sho", "she", "shee", "shi", "sha", "sh", "tsu", "tso", "tse", "tsee", "tsi", "tsa", "chu", "cho", "che", "chee", "chi", "cha", "ttsu", "ttso", "ttse", "ttsee", "ttsi", "ttsa", "X", ".", "qai", "ngai", "nngi", "nngii", "nngo", "nngoo", "nnga", "nngaa", null, null, null, null, null, null, null, null, null, " ", "b", "l", "f", "s", "n", "h", "d", "t", "c", "q", "m", "g", "ng", "z", "r", "a", "o", "u", "e", "i", "ch", "th", "ph", "p", "x", "p", "<", ">", null, null, null, "f", "v", "u", "yr", "y", "w", "th", "th", "a", "o", "ac", "ae", "o", "o", "o", "oe", "on", "r", "k", "c", "k", "g", "ng", "g", "g", "w", "h", "h", "h", "h", "n", "n", "n", "i", "e", "j", "g", "ae", "a", "eo", "p", "z", "s", "s", "s", "c", "z", "t", "t", "d", "b", "b", "p", "p", "e", "m", "m", "m", "l", "l", "ng", "ng", "d", "o", "ear", "ior", "qu", "qu", "qu", "s", "yr", "yr", "yr", "q", "x", ".", ":", "+", "17", "18", "19"], Ce = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "k", "kh", "g", "gh", "ng", "c", "ch", "j", "jh", "ny", "t", "tth", "d", "ddh", "nn", "t", "th", "d", "dh", "n", "p", "ph", "b", "bh", "m", "y", "r", "l", "v", "sh", "ss", "s", "h", "l", "q", "a", "aa", "i", "ii", "u", "uk", "uu", "uuv", "ry", "ryy", "ly", "lyy", "e", "ai", "oo", "oo", "au", "a", "aa", "aa", "i", "ii", "y", "yy", "u", "uu", "ua", "oe", "ya", "ie", "e", "ae", "ai", "oo", "au", "M", "H", "a`", null, null, null, "r", null, "!", null, null, null, null, null, ".", " // ", ":", "+", "++", " * ", " /// ", "KR", "'", null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], Se = [" @ ", " ... ", ",", ". ", ": ", " // ", null, "-", ",", ". ", null, null, null, null, null, null, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, "a", "e", "i", "o", "u", "O", "U", "ee", "n", "ng", "b", "p", "q", "g", "m", "l", "s", "sh", "t", "d", "ch", "j", "y", "r", "w", "f", "k", "kha", "ts", "z", "h", "zr", "lh", "zh", "ch", "-", "e", "i", "o", "u", "O", "U", "ng", "b", "p", "q", "g", "m", "t", "d", "ch", "j", "ts", "y", "w", "k", "g", "h", "jy", "ny", "dz", "e", "i", "iy", "U", "u", "ng", "k", "g", "h", "p", "sh", "t", "d", "j", "f", "g", "h", "ts", "z", "r", "ch", "zh", "i", "k", "r", "f", "zh", null, null, null, null, null, null, null, null, null, "H", "X", "W", "M", " 3 ", " 333 ", "a", "i", "k", "ng", "c", "tt", "tth", "dd", "nn", "t", "d", "p", "ph", "ss", "zh", "z", "a", "t", "zh", "gh", "ng", "c", "jh", "tta", "ddh", "t", "dh", "ss", "cy", "zh", "z", "u", "y", "bh", "'"], fe = ["A", "a", "B", "b", "B", "b", "B", "b", "C", "c", "D", "d", "D", "d", "D", "d", "D", "d", "D", "d", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "F", "f", "G", "g", "H", "h", "H", "h", "H", "h", "H", "h", "H", "h", "I", "i", "I", "i", "K", "k", "K", "k", "K", "k", "L", "l", "L", "l", "L", "l", "L", "l", "M", "m", "M", "m", "M", "m", "N", "n", "N", "n", "N", "n", "N", "n", "O", "o", "O", "o", "O", "o", "O", "o", "P", "p", "P", "p", "R", "r", "R", "r", "R", "r", "R", "r", "S", "s", "S", "s", "S", "s", "S", "s", "S", "s", "T", "t", "T", "t", "T", "t", "T", "t", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "V", "v", "V", "v", "W", "w", "W", "w", "W", "w", "W", "w", "W", "w", "X", "x", "X", "x", "Y", "y", "Z", "z", "Z", "z", "Z", "z", "h", "t", "w", "y", "a", "S", null, null, null, null, "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "I", "i", "I", "i", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "Y", "y", "Y", "y", "Y", "y", "Y", "y"], Je = ["a", "a", "a", "a", "a", "a", "a", "a", "A", "A", "A", "A", "A", "A", "A", "A", "e", "e", "e", "e", "e", "e", null, null, "E", "E", "E", "E", "E", "E", null, null, "e", "e", "e", "e", "e", "e", "e", "e", "E", "E", "E", "E", "E", "E", "E", "E", "i", "i", "i", "i", "i", "i", "i", "i", "I", "I", "I", "I", "I", "I", "I", "I", "o", "o", "o", "o", "o", "o", null, null, "O", "O", "O", "O", "O", "O", null, null, "u", "u", "u", "u", "u", "u", "u", "u", null, "U", null, "U", null, "U", null, "U", "o", "o", "o", "o", "o", "o", "o", "o", "O", "O", "O", "O", "O", "O", "O", "O", "a", "a", "e", "e", "e", "e", "i", "i", "o", "o", "u", "u", "o", "o", null, null, "a", "a", "a", "a", "a", "a", "a", "a", "A", "A", "A", "A", "A", "A", "A", "A", "e", "e", "e", "e", "e", "e", "e", "e", "E", "E", "E", "E", "E", "E", "E", "E", "o", "o", "o", "o", "o", "o", "o", "o", "O", "O", "O", "O", "O", "O", "O", "O", "a", "a", "a", "a", "a", null, "a", "a", "A", "A", "A", "A", "A", "'", "i", "'", "~", '"~', "e", "e", "e", null, "e", "e", "E", "E", "E", "E", "E", "'`", "''", "'~", "i", "i", "i", "i", null, null, "i", "i", "I", "I", "I", "I", null, "`'", "`'", "`~", "u", "u", "u", "u", "R", "R", "u", "u", "U", "U", "U", "U", "R", '"`', `"'`, "`", null, null, "o", "o", "o", null, "o", "o", "O", "O", "O", "O", "O", "'", "`"], De = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", null, null, null, null, "-", "-", "-", "-", "--", "--", "||", "_", "'", "'", ",", "'", '"', '"', ",,", '"', "+", "++", "*", "*>", ".", "..", "...", ".", `
`, `

`, null, null, null, null, null, " ", "%0", "%00", "'", "''", "'''", "`", "``", "```", "^", "<", ">", "*", "!!", "!?", "-", "_", "-", "^", "***", "--", "/", "-[", "]-", null, "?!", "!?", "7", "PP", "(]", "[)", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "0", null, null, null, "4", "5", "6", "7", "8", "9", "+", "-", "=", "(", ")", "n", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "=", "(", ")", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "ECU", "CL", "Cr", "FF", "L", "mil", "N", "Pts", "Rs", "W", "NS", "D", "EU", "K", "T", "Dr"], Xe = [null, null, "C", null, null, null, null, null, null, null, "g", "H", "H", "H", "h", null, "I", "I", "L", "l", "lb", "N", "no", "(p)", "P", "P", "Q", "R", "R", "R", null, null, "(sm)", "(tel)", "(tm)", null, "Z", null, null, "mho", "Z", null, null, null, "B", "C", "e", "e", null, "F", null, "M", "o", null, null, null, null, "i", "Q", "(fax)", "pi", null, null, "Pi", null, "G", "L", "L", "Y", "D", "d", "e", "i", "j", null, null, "per", null, null, null, null, null, null, " 1/3 ", " 2/3 ", " 1/5 ", " 2/5 ", " 3/5 ", " 4/5 ", " 1/6 ", " 5/6 ", " 1/8 ", " 3/8 ", " 5/8 ", " 7/8 ", " 1/", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "L", "C", "D", "M", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "l", "c", "d", "m", "(D", "D)", "((|))", ")", null, null, null, null, null, null, null, null, null, null, null, null, "-", "|", "-", "|", "-", "|", "\\", "/", "\\", "/", "-", "-", "~", "~", "-", "|", "-", "|", "-", "-", "-", "|", "-", "|", "|", "-", "-", "-", "-", "-", "-", "|", "|", "|", "|", "|", "|", "|", "^", "V", "\\", "=", "V", "^", "-", "-", "|", "|", "-", "-", "|", "|", "=", "|", "=", "=", "|", "=", "|", "=", "=", "=", "=", "=", "=", "|", "=", "|", "=", "|", "\\", "/", "\\", "/", "=", "=", "~", "~", "|", "|", "-", "|", "-", "|", "-", "-", "-", "|", "-", "|", "|", "|", "|", "|", "|", "|", "-", "\\", "\\", "|"], pe = ["-", "-", "|", "|", "-", "-", "|", "|", "-", "-", "|", "|", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "|", "|", "-", "|", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "/", "\\", "X", "-", "|", "-", "|", "-", "|", "-", "|", "-", "|", "-", "|", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "-", "|", null, null, null, null, null, null, null, null, null, null, "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "#", "^", "^", "^", "^", ">", ">", ">", ">", ">", ">", "V", "V", "V", "V", "<", "<", "<", "<", "<", "<", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "#", "#", "#", "#", "#", "^", "^", "^", "O", "#", "#", "#", "#", "#", "#", "#", "#"], Te = [" ", "a", "1", "b", "'", "k", "2", "l", "@", "c", "i", "f", "/", "m", "s", "p", '"', "e", "3", "h", "9", "o", "6", "r", "^", "d", "j", "g", ">", "n", "t", "q", ",", "*", "5", "<", "-", "u", "8", "v", ".", "%", "[", "$", "+", "x", "!", "&", ";", ":", "4", "\\", "0", "z", "7", "(", "_", "?", "w", "]", "#", "y", ")", "=", "[d7]", "[d17]", "[d27]", "[d127]", "[d37]", "[d137]", "[d237]", "[d1237]", "[d47]", "[d147]", "[d247]", "[d1247]", "[d347]", "[d1347]", "[d2347]", "[d12347]", "[d57]", "[d157]", "[d257]", "[d1257]", "[d357]", "[d1357]", "[d2357]", "[d12357]", "[d457]", "[d1457]", "[d2457]", "[d12457]", "[d3457]", "[d13457]", "[d23457]", "[d123457]", "[d67]", "[d167]", "[d267]", "[d1267]", "[d367]", "[d1367]", "[d2367]", "[d12367]", "[d467]", "[d1467]", "[d2467]", "[d12467]", "[d3467]", "[d13467]", "[d23467]", "[d123467]", "[d567]", "[d1567]", "[d2567]", "[d12567]", "[d3567]", "[d13567]", "[d23567]", "[d123567]", "[d4567]", "[d14567]", "[d24567]", "[d124567]", "[d34567]", "[d134567]", "[d234567]", "[d1234567]", "[d8]", "[d18]", "[d28]", "[d128]", "[d38]", "[d138]", "[d238]", "[d1238]", "[d48]", "[d148]", "[d248]", "[d1248]", "[d348]", "[d1348]", "[d2348]", "[d12348]", "[d58]", "[d158]", "[d258]", "[d1258]", "[d358]", "[d1358]", "[d2358]", "[d12358]", "[d458]", "[d1458]", "[d2458]", "[d12458]", "[d3458]", "[d13458]", "[d23458]", "[d123458]", "[d68]", "[d168]", "[d268]", "[d1268]", "[d368]", "[d1368]", "[d2368]", "[d12368]", "[d468]", "[d1468]", "[d2468]", "[d12468]", "[d3468]", "[d13468]", "[d23468]", "[d123468]", "[d568]", "[d1568]", "[d2568]", "[d12568]", "[d3568]", "[d13568]", "[d23568]", "[d123568]", "[d4568]", "[d14568]", "[d24568]", "[d124568]", "[d34568]", "[d134568]", "[d234568]", "[d1234568]", "[d78]", "[d178]", "[d278]", "[d1278]", "[d378]", "[d1378]", "[d2378]", "[d12378]", "[d478]", "[d1478]", "[d2478]", "[d12478]", "[d3478]", "[d13478]", "[d23478]", "[d123478]", "[d578]", "[d1578]", "[d2578]", "[d12578]", "[d3578]", "[d13578]", "[d23578]", "[d123578]", "[d4578]", "[d14578]", "[d24578]", "[d124578]", "[d34578]", "[d134578]", "[d234578]", "[d1234578]", "[d678]", "[d1678]", "[d2678]", "[d12678]", "[d3678]", "[d13678]", "[d23678]", "[d123678]", "[d4678]", "[d14678]", "[d24678]", "[d124678]", "[d34678]", "[d134678]", "[d234678]", "[d1234678]", "[d5678]", "[d15678]", "[d25678]", "[d125678]", "[d35678]", "[d135678]", "[d235678]", "[d1235678]", "[d45678]", "[d145678]", "[d245678]", "[d1245678]", "[d345678]", "[d1345678]", "[d2345678]", "[d12345678]"], He = [" ", ",", ". ", '"', "[JIS]", '"', "/", "0", "<", "> ", "<<", ">> ", "[", "] ", "{", "} ", "[(", ")] ", "@", "X ", "[", "] ", "[[", "]] ", "((", ")) ", "[[", "]] ", "~ ", "``", "''", ",,", "@", "1", "2", "3", "4", "5", "6", "7", "8", "9", null, null, null, null, null, null, "~", "+", "+", "+", "+", null, "@", " // ", "+10+", "+20+", "+30+", null, null, null, null, null, null, "a", "a", "i", "i", "u", "u", "e", "e", "o", "o", "ka", "ga", "ki", "gi", "ku", "gu", "ke", "ge", "ko", "go", "sa", "za", "si", "zi", "su", "zu", "se", "ze", "so", "zo", "ta", "da", "ti", "di", "tu", "tu", "du", "te", "de", "to", "do", "na", "ni", "nu", "ne", "no", "ha", "ba", "pa", "hi", "bi", "pi", "hu", "bu", "pu", "he", "be", "pe", "ho", "bo", "po", "ma", "mi", "mu", "me", "mo", "ya", "ya", "yu", "yu", "yo", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wa", "wi", "we", "wo", "n", "vu", null, null, null, null, null, null, null, null, '"', '"', null, null, "a", "a", "i", "i", "u", "u", "e", "e", "o", "o", "ka", "ga", "ki", "gi", "ku", "gu", "ke", "ge", "ko", "go", "sa", "za", "si", "zi", "su", "zu", "se", "ze", "so", "zo", "ta", "da", "ti", "di", "tu", "tu", "du", "te", "de", "to", "do", "na", "ni", "nu", "ne", "no", "ha", "ba", "pa", "hi", "bi", "pi", "hu", "bu", "pu", "he", "be", "pe", "ho", "bo", "po", "ma", "mi", "mu", "me", "mo", "ya", "ya", "yu", "yu", "yo", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wa", "wi", "we", "wo", "n", "vu", "ka", "ke", "va", "vi", "ve", "vo", null, null, '"', '"'], _e = [null, null, null, null, null, "B", "P", "M", "F", "D", "T", "N", "L", "G", "K", "H", "J", "Q", "X", "ZH", "CH", "SH", "R", "Z", "C", "S", "A", "O", "E", "EH", "AI", "EI", "AU", "OU", "AN", "EN", "ANG", "ENG", "ER", "I", "U", "IU", "V", "NG", "GN", null, null, null, null, "g", "gg", "gs", "n", "nj", "nh", "d", "dd", "r", "lg", "lm", "lb", "ls", "lt", "lp", "rh", "m", "b", "bb", "bs", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i", null, "nn", "nd", "ns", "nZ", "lgs", "ld", "lbs", "lZ", "lQ", "mb", "ms", "mZ", "mN", "bg", null, "bsg", "bst", "bj", "bt", "bN", "bbN", "sg", "sn", "sd", "sb", "sj", "Z", null, "N", "Ns", "NZ", "pN", "hh", "Q", "yo-ya", "yo-yae", "yo-i", "yu-yeo", "yu-ye", "yu-i", "U", "U-i", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "BU", "ZI", "JI", "GU", "EE", "ENN", "OO", "ONN", "IR", "ANN", "INN", "UNN", "IM", "NGG", "AINN", "AUNN", "AM", "OM", "ONG", "INNN", "P", "T", "K", "H"], ye = ["(g)", "(n)", "(d)", "(r)", "(m)", "(b)", "(s)", "()", "(j)", "(c)", "(k)", "(t)", "(p)", "(h)", "(ga)", "(na)", "(da)", "(ra)", "(ma)", "(ba)", "(sa)", "(a)", "(ja)", "(ca)", "(ka)", "(ta)", "(pa)", "(ha)", "(ju)", null, null, null, "(1) ", "(2) ", "(3) ", "(4) ", "(5) ", "(6) ", "(7) ", "(8) ", "(9) ", "(10) ", "(Yue) ", "(Huo) ", "(Shui) ", "(Mu) ", "(Jin) ", "(Tu) ", "(Ri) ", "(Zhu) ", "(You) ", "(She) ", "(Ming) ", "(Te) ", "(Cai) ", "(Zhu) ", "(Lao) ", "(Dai) ", "(Hu) ", "(Xue) ", "(Jian) ", "(Qi) ", "(Zi) ", "(Xie) ", "(Ji) ", "(Xiu) ", "<<", ">>", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "(g)", "(n)", "(d)", "(r)", "(m)", "(b)", "(s)", "()", "(j)", "(c)", "(k)", "(t)", "(p)", "(h)", "(ga)", "(na)", "(da)", "(ra)", "(ma)", "(ba)", "(sa)", "(a)", "(ja)", "(ca)", "(ka)", "(ta)", "(pa)", "(ha)", null, null, null, "KIS ", "(1) ", "(2) ", "(3) ", "(4) ", "(5) ", "(6) ", "(7) ", "(8) ", "(9) ", "(10) ", "(Yue) ", "(Huo) ", "(Shui) ", "(Mu) ", "(Jin) ", "(Tu) ", "(Ri) ", "(Zhu) ", "(You) ", "(She) ", "(Ming) ", "(Te) ", "(Cai) ", "(Zhu) ", "(Lao) ", "(Mi) ", "(Nan) ", "(Nu) ", "(Shi) ", "(You) ", "(Yin) ", "(Zhu) ", "(Xiang) ", "(Xiu) ", "(Xie) ", "(Zheng) ", "(Shang) ", "(Zhong) ", "(Xia) ", "(Zuo) ", "(You) ", "(Yi) ", "(Zong) ", "(Xue) ", "(Jian) ", "(Qi) ", "(Zi) ", "(Xie) ", "(Ye) ", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "1M", "2M", "3M", "4M", "5M", "6M", "7M", "8M", "9M", "10M", "11M", "12M", null, null, null, null, "a", "i", "u", "u", "o", "ka", "ki", "ku", "ke", "ko", "sa", "si", "su", "se", "so", "ta", "ti", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "hu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wi", "we", "wo"], me = ["apartment", "alpha", "ampere", "are", "inning", "inch", "won", "escudo", "acre", "ounce", "ohm", "kai-ri", "carat", "calorie", "gallon", "gamma", "giga", "guinea", "curie", "guilder", "kilo", "kilogram", "kilometer", "kilowatt", "gram", "gram ton", "cruzeiro", "krone", "case", "koruna", "co-op", "cycle", "centime", "shilling", "centi", "cent", "dozen", "desi", "dollar", "ton", "nano", "knot", "heights", "percent", "parts", "barrel", "piaster", "picul", "pico", "building", "farad", "feet", "bushel", "franc", "hectare", "peso", "pfennig", "hertz", "pence", "page", "beta", "point", "volt", "hon", "pound", "hall", "horn", "micro", "mile", "mach", "mark", "mansion", "micron", "milli", "millibar", "mega", "megaton", "meter", "yard", "yard", "yuan", "liter", "lira", "rupee", "ruble", "rem", "roentgen", "watt", "0h", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h", "HPA", "da", "AU", "bar", "oV", "pc", null, null, null, null, "Heisei", "Syouwa", "Taisyou", "Meiji", "Inc.", "pA", "nA", "microamp", "mA", "kA", "kB", "MB", "GB", "cal", "kcal", "pF", "nF", "microFarad", "microgram", "mg", "kg", "Hz", "kHz", "MHz", "GHz", "THz", "microliter", "ml", "dl", "kl", "fm", "nm", "micrometer", "mm", "cm", "km", "mm^2", "cm^2", "m^2", "km^2", "mm^4", "cm^3", "m^3", "km^3", "m/s", "m/s^2", "Pa", "kPa", "MPa", "GPa", "rad", "rad/s", "rad/s^2", "ps", "ns", "microsecond", "ms", "pV", "nV", "microvolt", "mV", "kV", "MV", "pW", "nW", "microwatt", "mW", "kW", "MW", "kOhm", "MOhm", "a.m.", "Bq", "cc", "cd", "C/kg", "Co.", "dB", "Gy", "ha", "HP", "in", "K.K.", "KM", "kt", "lm", "ln", "log", "lx", "mb", "mil", "mol", "pH", "p.m.", "PPM", "PR", "sr", "Sv", "Wb", null, null, "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d", "13d", "14d", "15d", "16d", "17d", "18d", "19d", "20d", "21d", "22d", "23d", "24d", "25d", "26d", "27d", "28d", "29d", "30d", "31d"], Qe = ["Yi", "Ding", "Kao", "Qi", "Shang", "Xia", null, "Wan", "Zhang", "San", "Shang", "Xia", "Ji", "Bu", "Yu", "Mian", "Gai", "Chou", "Chou", "Zhuan", "Qie", "Pi", "Shi", "Shi", "Qiu", "Bing", "Ye", "Cong", "Dong", "Si", "Cheng", "Diu", "Qiu", "Liang", "Diu", "You", "Liang", "Yan", "Bing", "Sang", "Gun", "Jiu", "Ge", "Ya", "Qiang", "Zhong", "Ji", "Jie", "Feng", "Guan", "Chuan", "Chan", "Lin", "Zhuo", "Zhu", "Ha", "Wan", "Dan", "Wei", "Zhu", "Jing", "Li", "Ju", "Pie", "Fu", "Yi", "Yi", "Nai", "Shime", "Jiu", "Jiu", "Zhe", "Me", "Yi", null, "Zhi", "Wu", "Zha", "Hu", "Fa", "Le", "Zhong", "Ping", "Pang", "Qiao", "Hu", "Guai", "Cheng", "Cheng", "Yi", "Yin", null, "Mie", "Jiu", "Qi", "Ye", "Xi", "Xiang", "Gai", "Diu", "Hal", null, "Shu", "Twul", "Shi", "Ji", "Nang", "Jia", "Kel", "Shi", null, "Ol", "Mai", "Luan", "Cal", "Ru", "Xue", "Yan", "Fu", "Sha", "Na", "Gan", "Sol", "El", "Cwul", null, "Gan", "Chi", "Gui", "Gan", "Luan", "Lin", "Yi", "Jue", "Liao", "Ma", "Yu", "Zheng", "Shi", "Shi", "Er", "Chu", "Yu", "Yu", "Yu", "Yun", "Hu", "Qi", "Wu", "Jing", "Si", "Sui", "Gen", "Gen", "Ya", "Xie", "Ya", "Qi", "Ya", "Ji", "Tou", "Wang", "Kang", "Ta", "Jiao", "Hai", "Yi", "Chan", "Heng", "Mu", null, "Xiang", "Jing", "Ting", "Liang", "Xiang", "Jing", "Ye", "Qin", "Bo", "You", "Xie", "Dan", "Lian", "Duo", "Wei", "Ren", "Ren", "Ji", "La", "Wang", "Yi", "Shi", "Ren", "Le", "Ding", "Ze", "Jin", "Pu", "Chou", "Ba", "Zhang", "Jin", "Jie", "Bing", "Reng", "Cong", "Fo", "San", "Lun", "Sya", "Cang", "Zi", "Shi", "Ta", "Zhang", "Fu", "Xian", "Xian", "Tuo", "Hong", "Tong", "Ren", "Qian", "Gan", "Yi", "Di", "Dai", "Ling", "Yi", "Chao", "Chang", "Sa", null, "Yi", "Mu", "Men", "Ren", "Jia", "Chao", "Yang", "Qian", "Zhong", "Pi", "Wan", "Wu", "Jian", "Jie", "Yao", "Feng", "Cang", "Ren", "Wang", "Fen", "Di", "Fang"], we = ["Zhong", "Qi", "Pei", "Yu", "Diao", "Dun", "Wen", "Yi", "Xin", "Kang", "Yi", "Ji", "Ai", "Wu", "Ji", "Fu", "Fa", "Xiu", "Jin", "Bei", "Dan", "Fu", "Tang", "Zhong", "You", "Huo", "Hui", "Yu", "Cui", "Chuan", "San", "Wei", "Chuan", "Che", "Ya", "Xian", "Shang", "Chang", "Lun", "Cang", "Xun", "Xin", "Wei", "Zhu", null, "Xuan", "Nu", "Bo", "Gu", "Ni", "Ni", "Xie", "Ban", "Xu", "Ling", "Zhou", "Shen", "Qu", "Si", "Beng", "Si", "Jia", "Pi", "Yi", "Si", "Ai", "Zheng", "Dian", "Han", "Mai", "Dan", "Zhu", "Bu", "Qu", "Bi", "Shao", "Ci", "Wei", "Di", "Zhu", "Zuo", "You", "Yang", "Ti", "Zhan", "He", "Bi", "Tuo", "She", "Yu", "Yi", "Fo", "Zuo", "Kou", "Ning", "Tong", "Ni", "Xuan", "Qu", "Yong", "Wa", "Qian", null, "Ka", null, "Pei", "Huai", "He", "Lao", "Xiang", "Ge", "Yang", "Bai", "Fa", "Ming", "Jia", "Er", "Bing", "Ji", "Hen", "Huo", "Gui", "Quan", "Tiao", "Jiao", "Ci", "Yi", "Shi", "Xing", "Shen", "Tuo", "Kan", "Zhi", "Gai", "Lai", "Yi", "Chi", "Kua", "Guang", "Li", "Yin", "Shi", "Mi", "Zhu", "Xu", "You", "An", "Lu", "Mou", "Er", "Lun", "Tong", "Cha", "Chi", "Xun", "Gong", "Zhou", "Yi", "Ru", "Jian", "Xia", "Jia", "Zai", "Lu", "Ko", "Jiao", "Zhen", "Ce", "Qiao", "Kuai", "Chai", "Ning", "Nong", "Jin", "Wu", "Hou", "Jiong", "Cheng", "Zhen", "Zuo", "Chou", "Qin", "Lu", "Ju", "Shu", "Ting", "Shen", "Tuo", "Bo", "Nan", "Hao", "Bian", "Tui", "Yu", "Xi", "Cu", "E", "Qiu", "Xu", "Kuang", "Ku", "Wu", "Jun", "Yi", "Fu", "Lang", "Zu", "Qiao", "Li", "Yong", "Hun", "Jing", "Xian", "San", "Pai", "Su", "Fu", "Xi", "Li", "Fu", "Ping", "Bao", "Yu", "Si", "Xia", "Xin", "Xiu", "Yu", "Ti", "Che", "Chou", null, "Yan", "Lia", "Li", "Lai", null, "Jian", "Xiu", "Fu", "He", "Ju", "Xiao", "Pai", "Jian", "Biao", "Chu", "Fei", "Feng", "Ya", "An", "Bei", "Yu", "Xin", "Bi", "Jian"], Me = ["Chang", "Chi", "Bing", "Zan", "Yao", "Cui", "Lia", "Wan", "Lai", "Cang", "Zong", "Ge", "Guan", "Bei", "Tian", "Shu", "Shu", "Men", "Dao", "Tan", "Jue", "Chui", "Xing", "Peng", "Tang", "Hou", "Yi", "Qi", "Ti", "Gan", "Jing", "Jie", "Sui", "Chang", "Jie", "Fang", "Zhi", "Kong", "Juan", "Zong", "Ju", "Qian", "Ni", "Lun", "Zhuo", "Wei", "Luo", "Song", "Leng", "Hun", "Dong", "Zi", "Ben", "Wu", "Ju", "Nai", "Cai", "Jian", "Zhai", "Ye", "Zhi", "Sha", "Qing", null, "Ying", "Cheng", "Jian", "Yan", "Nuan", "Zhong", "Chun", "Jia", "Jie", "Wei", "Yu", "Bing", "Ruo", "Ti", "Wei", "Pian", "Yan", "Feng", "Tang", "Wo", "E", "Xie", "Che", "Sheng", "Kan", "Di", "Zuo", "Cha", "Ting", "Bei", "Ye", "Huang", "Yao", "Zhan", "Chou", "Yan", "You", "Jian", "Xu", "Zha", "Ci", "Fu", "Bi", "Zhi", "Zong", "Mian", "Ji", "Yi", "Xie", "Xun", "Si", "Duan", "Ce", "Zhen", "Ou", "Tou", "Tou", "Bei", "Za", "Lu", "Jie", "Wei", "Fen", "Chang", "Gui", "Sou", "Zhi", "Su", "Xia", "Fu", "Yuan", "Rong", "Li", "Ru", "Yun", "Gou", "Ma", "Bang", "Dian", "Tang", "Hao", "Jie", "Xi", "Shan", "Qian", "Jue", "Cang", "Chu", "San", "Bei", "Xiao", "Yong", "Yao", "Tan", "Suo", "Yang", "Fa", "Bing", "Jia", "Dai", "Zai", "Tang", null, "Bin", "Chu", "Nuo", "Can", "Lei", "Cui", "Yong", "Zao", "Zong", "Peng", "Song", "Ao", "Chuan", "Yu", "Zhai", "Cou", "Shang", "Qiang", "Jing", "Chi", "Sha", "Han", "Zhang", "Qing", "Yan", "Di", "Xi", "Lu", "Bei", "Piao", "Jin", "Lian", "Lu", "Man", "Qian", "Xian", "Tan", "Ying", "Dong", "Zhuan", "Xiang", "Shan", "Qiao", "Jiong", "Tui", "Zun", "Pu", "Xi", "Lao", "Chang", "Guang", "Liao", "Qi", "Deng", "Chan", "Wei", "Ji", "Fan", "Hui", "Chuan", "Jian", "Dan", "Jiao", "Jiu", "Seng", "Fen", "Xian", "Jue", "E", "Jiao", "Jian", "Tong", "Lin", "Bo", "Gu", null, "Su", "Xian", "Jiang", "Min", "Ye", "Jin", "Jia", "Qiao", "Pi", "Feng", "Zhou", "Ai", "Sai"], Be = ["Yi", "Jun", "Nong", "Chan", "Yi", "Dang", "Jing", "Xuan", "Kuai", "Jian", "Chu", "Dan", "Jiao", "Sha", "Zai", null, "Bin", "An", "Ru", "Tai", "Chou", "Chai", "Lan", "Ni", "Jin", "Qian", "Meng", "Wu", "Ning", "Qiong", "Ni", "Chang", "Lie", "Lei", "Lu", "Kuang", "Bao", "Du", "Biao", "Zan", "Zhi", "Si", "You", "Hao", "Chen", "Chen", "Li", "Teng", "Wei", "Long", "Chu", "Chan", "Rang", "Shu", "Hui", "Li", "Luo", "Zan", "Nuo", "Tang", "Yan", "Lei", "Nang", "Er", "Wu", "Yun", "Zan", "Yuan", "Xiong", "Chong", "Zhao", "Xiong", "Xian", "Guang", "Dui", "Ke", "Dui", "Mian", "Tu", "Chang", "Er", "Dui", "Er", "Xin", "Tu", "Si", "Yan", "Yan", "Shi", "Shi", "Dang", "Qian", "Dou", "Fen", "Mao", "Shen", "Dou", "Bai", "Jing", "Li", "Huang", "Ru", "Wang", "Nei", "Quan", "Liang", "Yu", "Ba", "Gong", "Liu", "Xi", null, "Lan", "Gong", "Tian", "Guan", "Xing", "Bing", "Qi", "Ju", "Dian", "Zi", "Ppwun", "Yang", "Jian", "Shou", "Ji", "Yi", "Ji", "Chan", "Jiong", "Mao", "Ran", "Nei", "Yuan", "Mao", "Gang", "Ran", "Ce", "Jiong", "Ce", "Zai", "Gua", "Jiong", "Mao", "Zhou", "Mou", "Gou", "Xu", "Mian", "Mi", "Rong", "Yin", "Xie", "Kan", "Jun", "Nong", "Yi", "Mi", "Shi", "Guan", "Meng", "Zhong", "Ju", "Yuan", "Ming", "Kou", "Lam", "Fu", "Xie", "Mi", "Bing", "Dong", "Tai", "Gang", "Feng", "Bing", "Hu", "Chong", "Jue", "Hu", "Kuang", "Ye", "Leng", "Pan", "Fu", "Min", "Dong", "Xian", "Lie", "Xia", "Jian", "Jing", "Shu", "Mei", "Tu", "Qi", "Gu", "Zhun", "Song", "Jing", "Liang", "Qing", "Diao", "Ling", "Dong", "Gan", "Jian", "Yin", "Cou", "Yi", "Li", "Cang", "Ming", "Zhuen", "Cui", "Si", "Duo", "Jin", "Lin", "Lin", "Ning", "Xi", "Du", "Ji", "Fan", "Fan", "Fan", "Feng", "Ju", "Chu", "Tako", "Feng", "Mok", "Ci", "Fu", "Feng", "Ping", "Feng", "Kai", "Huang", "Kai", "Gan", "Deng", "Ping", "Qu", "Xiong", "Kuai", "Tu", "Ao", "Chu", "Ji", "Dang", "Han", "Han", "Zao"], be = ["Dao", "Diao", "Dao", "Ren", "Ren", "Chuang", "Fen", "Qie", "Yi", "Ji", "Kan", "Qian", "Cun", "Chu", "Wen", "Ji", "Dan", "Xing", "Hua", "Wan", "Jue", "Li", "Yue", "Lie", "Liu", "Ze", "Gang", "Chuang", "Fu", "Chu", "Qu", "Ju", "Shan", "Min", "Ling", "Zhong", "Pan", "Bie", "Jie", "Jie", "Bao", "Li", "Shan", "Bie", "Chan", "Jing", "Gua", "Gen", "Dao", "Chuang", "Kui", "Ku", "Duo", "Er", "Zhi", "Shua", "Quan", "Cha", "Ci", "Ke", "Jie", "Gui", "Ci", "Gui", "Kai", "Duo", "Ji", "Ti", "Jing", "Lou", "Gen", "Ze", "Yuan", "Cuo", "Xue", "Ke", "La", "Qian", "Cha", "Chuang", "Gua", "Jian", "Cuo", "Li", "Ti", "Fei", "Pou", "Chan", "Qi", "Chuang", "Zi", "Gang", "Wan", "Bo", "Ji", "Duo", "Qing", "Yan", "Zhuo", "Jian", "Ji", "Bo", "Yan", "Ju", "Huo", "Sheng", "Jian", "Duo", "Duan", "Wu", "Gua", "Fu", "Sheng", "Jian", "Ge", "Zha", "Kai", "Chuang", "Juan", "Chan", "Tuan", "Lu", "Li", "Fou", "Shan", "Piao", "Kou", "Jiao", "Gua", "Qiao", "Jue", "Hua", "Zha", "Zhuo", "Lian", "Ju", "Pi", "Liu", "Gui", "Jiao", "Gui", "Jian", "Jian", "Tang", "Huo", "Ji", "Jian", "Yi", "Jian", "Zhi", "Chan", "Cuan", "Mo", "Li", "Zhu", "Li", "Ya", "Quan", "Ban", "Gong", "Jia", "Wu", "Mai", "Lie", "Jin", "Keng", "Xie", "Zhi", "Dong", "Zhu", "Nu", "Jie", "Qu", "Shao", "Yi", "Zhu", "Miao", "Li", "Jing", "Lao", "Lao", "Juan", "Kou", "Yang", "Wa", "Xiao", "Mou", "Kuang", "Jie", "Lie", "He", "Shi", "Ke", "Jing", "Hao", "Bo", "Min", "Chi", "Lang", "Yong", "Yong", "Mian", "Ke", "Xun", "Juan", "Qing", "Lu", "Pou", "Meng", "Lai", "Le", "Kai", "Mian", "Dong", "Xu", "Xu", "Kan", "Wu", "Yi", "Xun", "Weng", "Sheng", "Lao", "Mu", "Lu", "Piao", "Shi", "Ji", "Qin", "Qiang", "Jiao", "Quan", "Yang", "Yi", "Jue", "Fan", "Juan", "Tong", "Ju", "Dan", "Xie", "Mai", "Xun", "Xun", "Lu", "Li", "Che", "Rang", "Quan", "Bao", "Shao", "Yun", "Jiu", "Bao", "Gou", "Wu"], xe = ["Yun", "Mwun", "Nay", "Gai", "Gai", "Bao", "Cong", null, "Xiong", "Peng", "Ju", "Tao", "Ge", "Pu", "An", "Pao", "Fu", "Gong", "Da", "Jiu", "Qiong", "Bi", "Hua", "Bei", "Nao", "Chi", "Fang", "Jiu", "Yi", "Za", "Jiang", "Kang", "Jiang", "Kuang", "Hu", "Xia", "Qu", "Bian", "Gui", "Qie", "Zang", "Kuang", "Fei", "Hu", "Tou", "Gui", "Gui", "Hui", "Dan", "Gui", "Lian", "Lian", "Suan", "Du", "Jiu", "Qu", "Xi", "Pi", "Qu", "Yi", "Qia", "Yan", "Bian", "Ni", "Qu", "Shi", "Xin", "Qian", "Nian", "Sa", "Zu", "Sheng", "Wu", "Hui", "Ban", "Shi", "Xi", "Wan", "Hua", "Xie", "Wan", "Bei", "Zu", "Zhuo", "Xie", "Dan", "Mai", "Nan", "Dan", "Ji", "Bo", "Shuai", "Bu", "Kuang", "Bian", "Bu", "Zhan", "Qia", "Lu", "You", "Lu", "Xi", "Gua", "Wo", "Xie", "Jie", "Jie", "Wei", "Ang", "Qiong", "Zhi", "Mao", "Yin", "Wei", "Shao", "Ji", "Que", "Luan", "Shi", "Juan", "Xie", "Xu", "Jin", "Que", "Wu", "Ji", "E", "Qing", "Xi", null, "Han", "Zhan", "E", "Ting", "Li", "Zhe", "Han", "Li", "Ya", "Ya", "Yan", "She", "Zhi", "Zha", "Pang", null, "He", "Ya", "Zhi", "Ce", "Pang", "Ti", "Li", "She", "Hou", "Ting", "Zui", "Cuo", "Fei", "Yuan", "Ce", "Yuan", "Xiang", "Yan", "Li", "Jue", "Sha", "Dian", "Chu", "Jiu", "Qin", "Ao", "Gui", "Yan", "Si", "Li", "Chang", "Lan", "Li", "Yan", "Yan", "Yuan", "Si", "Gong", "Lin", "Qiu", "Qu", "Qu", "Uk", "Lei", "Du", "Xian", "Zhuan", "San", "Can", "Can", "Can", "Can", "Ai", "Dai", "You", "Cha", "Ji", "You", "Shuang", "Fan", "Shou", "Guai", "Ba", "Fa", "Ruo", "Shi", "Shu", "Zhuo", "Qu", "Shou", "Bian", "Xu", "Jia", "Pan", "Sou", "Gao", "Wei", "Sou", "Die", "Rui", "Cong", "Kou", "Gu", "Ju", "Ling", "Gua", "Tao", "Kou", "Zhi", "Jiao", "Zhao", "Ba", "Ding", "Ke", "Tai", "Chi", "Shi", "You", "Qiu", "Po", "Ye", "Hao", "Si", "Tan", "Chi", "Le", "Diao", "Ji", null, "Hong"], Fe = ["Mie", "Xu", "Mang", "Chi", "Ge", "Xuan", "Yao", "Zi", "He", "Ji", "Diao", "Cun", "Tong", "Ming", "Hou", "Li", "Tu", "Xiang", "Zha", "Xia", "Ye", "Lu", "A", "Ma", "Ou", "Xue", "Yi", "Jun", "Chou", "Lin", "Tun", "Yin", "Fei", "Bi", "Qin", "Qin", "Jie", "Bu", "Fou", "Ba", "Dun", "Fen", "E", "Han", "Ting", "Hang", "Shun", "Qi", "Hong", "Zhi", "Shen", "Wu", "Wu", "Chao", "Ne", "Xue", "Xi", "Chui", "Dou", "Wen", "Hou", "Ou", "Wu", "Gao", "Ya", "Jun", "Lu", "E", "Ge", "Mei", "Ai", "Qi", "Cheng", "Wu", "Gao", "Fu", "Jiao", "Hong", "Chi", "Sheng", "Ne", "Tun", "Fu", "Yi", "Dai", "Ou", "Li", "Bai", "Yuan", "Kuai", null, "Qiang", "Wu", "E", "Shi", "Quan", "Pen", "Wen", "Ni", "M", "Ling", "Ran", "You", "Di", "Zhou", "Shi", "Zhou", "Tie", "Xi", "Yi", "Qi", "Ping", "Zi", "Gu", "Zi", "Wei", "Xu", "He", "Nao", "Xia", "Pei", "Yi", "Xiao", "Shen", "Hu", "Ming", "Da", "Qu", "Ju", "Gem", "Za", "Tuo", "Duo", "Pou", "Pao", "Bi", "Fu", "Yang", "He", "Zha", "He", "Hai", "Jiu", "Yong", "Fu", "Que", "Zhou", "Wa", "Ka", "Gu", "Ka", "Zuo", "Bu", "Long", "Dong", "Ning", "Tha", "Si", "Xian", "Huo", "Qi", "Er", "E", "Guang", "Zha", "Xi", "Yi", "Lie", "Zi", "Mie", "Mi", "Zhi", "Yao", "Ji", "Zhou", "Ge", "Shuai", "Zan", "Xiao", "Ke", "Hui", "Kua", "Huai", "Tao", "Xian", "E", "Xuan", "Xiu", "Wai", "Yan", "Lao", "Yi", "Ai", "Pin", "Shen", "Tong", "Hong", "Xiong", "Chi", "Wa", "Ha", "Zai", "Yu", "Di", "Pai", "Xiang", "Ai", "Hen", "Kuang", "Ya", "Da", "Xiao", "Bi", "Yue", null, "Hua", "Sasou", "Kuai", "Duo", null, "Ji", "Nong", "Mou", "Yo", "Hao", "Yuan", "Long", "Pou", "Mang", "Ge", "E", "Chi", "Shao", "Li", "Na", "Zu", "He", "Ku", "Xiao", "Xian", "Lao", "Bo", "Zhe", "Zha", "Liang", "Ba", "Mie", "Le", "Sui", "Fou", "Bu", "Han", "Heng", "Geng", "Shuo", "Ge"], Ge = ["You", "Yan", "Gu", "Gu", "Bai", "Han", "Suo", "Chun", "Yi", "Ai", "Jia", "Tu", "Xian", "Huan", "Li", "Xi", "Tang", "Zuo", "Qiu", "Che", "Wu", "Zao", "Ya", "Dou", "Qi", "Di", "Qin", "Ma", "Mal", "Hong", "Dou", "Kes", "Lao", "Liang", "Suo", "Zao", "Huan", "Lang", "Sha", "Ji", "Zuo", "Wo", "Feng", "Yin", "Hu", "Qi", "Shou", "Wei", "Shua", "Chang", "Er", "Li", "Qiang", "An", "Jie", "Yo", "Nian", "Yu", "Tian", "Lai", "Sha", "Xi", "Tuo", "Hu", "Ai", "Zhou", "Nou", "Ken", "Zhuo", "Zhuo", "Shang", "Di", "Heng", "Lan", "A", "Xiao", "Xiang", "Tun", "Wu", "Wen", "Cui", "Sha", "Hu", "Qi", "Qi", "Tao", "Dan", "Dan", "Ye", "Zi", "Bi", "Cui", "Chuo", "He", "Ya", "Qi", "Zhe", "Pei", "Liang", "Xian", "Pi", "Sha", "La", "Ze", "Qing", "Gua", "Pa", "Zhe", "Se", "Zhuan", "Nie", "Guo", "Luo", "Yan", "Di", "Quan", "Tan", "Bo", "Ding", "Lang", "Xiao", null, "Tang", "Chi", "Ti", "An", "Jiu", "Dan", "Ke", "Yong", "Wei", "Nan", "Shan", "Yu", "Zhe", "La", "Jie", "Hou", "Han", "Die", "Zhou", "Chai", "Wai", "Re", "Yu", "Yin", "Zan", "Yao", "Wo", "Mian", "Hu", "Yun", "Chuan", "Hui", "Huan", "Huan", "Xi", "He", "Ji", "Kui", "Zhong", "Wei", "Sha", "Xu", "Huang", "Du", "Nie", "Xuan", "Liang", "Yu", "Sang", "Chi", "Qiao", "Yan", "Dan", "Pen", "Can", "Li", "Yo", "Zha", "Wei", "Miao", "Ying", "Pen", "Phos", "Kui", "Xi", "Yu", "Jie", "Lou", "Ku", "Sao", "Huo", "Ti", "Yao", "He", "A", "Xiu", "Qiang", "Se", "Yong", "Su", "Hong", "Xie", "Yi", "Suo", "Ma", "Cha", "Hai", "Ke", "Ta", "Sang", "Tian", "Ru", "Sou", "Wa", "Ji", "Pang", "Wu", "Xian", "Shi", "Ge", "Zi", "Jie", "Luo", "Weng", "Wa", "Si", "Chi", "Hao", "Suo", "Jia", "Hai", "Suo", "Qin", "Nie", "He", "Cis", "Sai", "Ng", "Ge", "Na", "Dia", "Ai", null, "Tong", "Bi", "Ao", "Ao", "Lian", "Cui", "Zhe", "Mo", "Sou", "Sou", "Tan"], ve = ["Di", "Qi", "Jiao", "Chong", "Jiao", "Kai", "Tan", "San", "Cao", "Jia", "Ai", "Xiao", "Piao", "Lou", "Ga", "Gu", "Xiao", "Hu", "Hui", "Guo", "Ou", "Xian", "Ze", "Chang", "Xu", "Po", "De", "Ma", "Ma", "Hu", "Lei", "Du", "Ga", "Tang", "Ye", "Beng", "Ying", "Saai", "Jiao", "Mi", "Xiao", "Hua", "Mai", "Ran", "Zuo", "Peng", "Lao", "Xiao", "Ji", "Zhu", "Chao", "Kui", "Zui", "Xiao", "Si", "Hao", "Fu", "Liao", "Qiao", "Xi", "Xiu", "Tan", "Tan", "Mo", "Xun", "E", "Zun", "Fan", "Chi", "Hui", "Zan", "Chuang", "Cu", "Dan", "Yu", "Tun", "Cheng", "Jiao", "Ye", "Xi", "Qi", "Hao", "Lian", "Xu", "Deng", "Hui", "Yin", "Pu", "Jue", "Qin", "Xun", "Nie", "Lu", "Si", "Yan", "Ying", "Da", "Dan", "Yu", "Zhou", "Jin", "Nong", "Yue", "Hui", "Qi", "E", "Zao", "Yi", "Shi", "Jiao", "Yuan", "Ai", "Yong", "Jue", "Kuai", "Yu", "Pen", "Dao", "Ge", "Xin", "Dun", "Dang", "Sin", "Sai", "Pi", "Pi", "Yin", "Zui", "Ning", "Di", "Lan", "Ta", "Huo", "Ru", "Hao", "Xia", "Ya", "Duo", "Xi", "Chou", "Ji", "Jin", "Hao", "Ti", "Chang", null, null, "Ca", "Ti", "Lu", "Hui", "Bo", "You", "Nie", "Yin", "Hu", "Mo", "Huang", "Zhe", "Li", "Liu", "Haai", "Nang", "Xiao", "Mo", "Yan", "Li", "Lu", "Long", "Fu", "Dan", "Chen", "Pin", "Pi", "Xiang", "Huo", "Mo", "Xi", "Duo", "Ku", "Yan", "Chan", "Ying", "Rang", "Dian", "La", "Ta", "Xiao", "Jiao", "Chuo", "Huan", "Huo", "Zhuan", "Nie", "Xiao", "Ca", "Li", "Chan", "Chai", "Li", "Yi", "Luo", "Nang", "Zan", "Su", "Xi", "So", "Jian", "Za", "Zhu", "Lan", "Nie", "Nang", null, null, "Wei", "Hui", "Yin", "Qiu", "Si", "Nin", "Jian", "Hui", "Xin", "Yin", "Nan", "Tuan", "Tuan", "Dun", "Kang", "Yuan", "Jiong", "Pian", "Yun", "Cong", "Hu", "Hui", "Yuan", "You", "Guo", "Kun", "Cong", "Wei", "Tu", "Wei", "Lun", "Guo", "Qun", "Ri", "Ling", "Gu", "Guo", "Tai", "Guo", "Tu", "You"], Ne = ["Guo", "Yin", "Hun", "Pu", "Yu", "Han", "Yuan", "Lun", "Quan", "Yu", "Qing", "Guo", "Chuan", "Wei", "Yuan", "Quan", "Ku", "Fu", "Yuan", "Yuan", "E", "Tu", "Tu", "Tu", "Tuan", "Lue", "Hui", "Yi", "Yuan", "Luan", "Luan", "Tu", "Ya", "Tu", "Ting", "Sheng", "Pu", "Lu", "Iri", "Ya", "Zai", "Wei", "Ge", "Yu", "Wu", "Gui", "Pi", "Yi", "Di", "Qian", "Qian", "Zhen", "Zhuo", "Dang", "Qia", "Akutsu", "Yama", "Kuang", "Chang", "Qi", "Nie", "Mo", "Ji", "Jia", "Zhi", "Zhi", "Ban", "Xun", "Tou", "Qin", "Fen", "Jun", "Keng", "Tun", "Fang", "Fen", "Ben", "Tan", "Kan", "Pi", "Zuo", "Keng", "Bi", "Xing", "Di", "Jing", "Ji", "Kuai", "Di", "Jing", "Jian", "Tan", "Li", "Ba", "Wu", "Fen", "Zhui", "Po", "Pan", "Tang", "Kun", "Qu", "Tan", "Zhi", "Tuo", "Gan", "Ping", "Dian", "Gua", "Ni", "Tai", "Pi", "Jiong", "Yang", "Fo", "Ao", "Liu", "Qiu", "Mu", "Ke", "Gou", "Xue", "Ba", "Chi", "Che", "Ling", "Zhu", "Fu", "Hu", "Zhi", "Chui", "La", "Long", "Long", "Lu", "Ao", "Tay", "Pao", null, "Xing", "Dong", "Ji", "Ke", "Lu", "Ci", "Chi", "Lei", "Gai", "Yin", "Hou", "Dui", "Zhao", "Fu", "Guang", "Yao", "Duo", "Duo", "Gui", "Cha", "Yang", "Yin", "Fa", "Gou", "Yuan", "Die", "Xie", "Ken", "Jiong", "Shou", "E", "Ha", "Dian", "Hong", "Wu", "Kua", null, "Tao", "Dang", "Kai", "Gake", "Nao", "An", "Xing", "Xian", "Huan", "Bang", "Pei", "Ba", "Yi", "Yin", "Han", "Xu", "Chui", "Cen", "Geng", "Ai", "Peng", "Fang", "Que", "Yong", "Xun", "Jia", "Di", "Mai", "Lang", "Xuan", "Cheng", "Yan", "Jin", "Zhe", "Lei", "Lie", "Bu", "Cheng", "Gomi", "Bu", "Shi", "Xun", "Guo", "Jiong", "Ye", "Nian", "Di", "Yu", "Bu", "Ya", "Juan", "Sui", "Pi", "Cheng", "Wan", "Ju", "Lun", "Zheng", "Kong", "Chong", "Dong", "Dai", "Tan", "An", "Cai", "Shu", "Beng", "Kan", "Zhi", "Duo", "Yi", "Zhi", "Yi", "Pei", "Ji", "Zhun", "Qi", "Sao", "Ju", "Ni"], ke = ["Ku", "Ke", "Tang", "Kun", "Ni", "Jian", "Dui", "Jin", "Gang", "Yu", "E", "Peng", "Gu", "Tu", "Leng", null, "Ya", "Qian", null, "An", null, "Duo", "Nao", "Tu", "Cheng", "Yin", "Hun", "Bi", "Lian", "Guo", "Die", "Zhuan", "Hou", "Bao", "Bao", "Yu", "Di", "Mao", "Jie", "Ruan", "E", "Geng", "Kan", "Zong", "Yu", "Huang", "E", "Yao", "Yan", "Bao", "Ji", "Mei", "Chang", "Du", "Tuo", "Yin", "Feng", "Zhong", "Jie", "Zhen", "Feng", "Gang", "Chuan", "Jian", "Pyeng", "Toride", "Xiang", "Huang", "Leng", "Duan", null, "Xuan", "Ji", "Ji", "Kuai", "Ying", "Ta", "Cheng", "Yong", "Kai", "Su", "Su", "Shi", "Mi", "Ta", "Weng", "Cheng", "Tu", "Tang", "Que", "Zhong", "Li", "Peng", "Bang", "Sai", "Zang", "Dui", "Tian", "Wu", "Cheng", "Xun", "Ge", "Zhen", "Ai", "Gong", "Yan", "Kan", "Tian", "Yuan", "Wen", "Xie", "Liu", "Ama", "Lang", "Chang", "Peng", "Beng", "Chen", "Cu", "Lu", "Ou", "Qian", "Mei", "Mo", "Zhuan", "Shuang", "Shu", "Lou", "Chi", "Man", "Biao", "Jing", "Qi", "Shu", "Di", "Zhang", "Kan", "Yong", "Dian", "Chen", "Zhi", "Xi", "Guo", "Qiang", "Jin", "Di", "Shang", "Mu", "Cui", "Yan", "Ta", "Zeng", "Qi", "Qiang", "Liang", null, "Zhui", "Qiao", "Zeng", "Xu", "Shan", "Shan", "Ba", "Pu", "Kuai", "Dong", "Fan", "Que", "Mo", "Dun", "Dun", "Dun", "Di", "Sheng", "Duo", "Duo", "Tan", "Deng", "Wu", "Fen", "Huang", "Tan", "Da", "Ye", "Sho", "Mama", "Yu", "Qiang", "Ji", "Qiao", "Ken", "Yi", "Pi", "Bi", "Dian", "Jiang", "Ye", "Yong", "Bo", "Tan", "Lan", "Ju", "Huai", "Dang", "Rang", "Qian", "Xun", "Lan", "Xi", "He", "Ai", "Ya", "Dao", "Hao", "Ruan", "Mama", "Lei", "Kuang", "Lu", "Yan", "Tan", "Wei", "Huai", "Long", "Long", "Rui", "Li", "Lin", "Rang", "Ten", "Xun", "Yan", "Lei", "Ba", null, "Shi", "Ren", null, "Zhuang", "Zhuang", "Sheng", "Yi", "Mai", "Ke", "Zhu", "Zhuang", "Hu", "Hu", "Kun", "Yi", "Hu", "Xu", "Kun", "Shou", "Mang", "Zun"], Pe = ["Shou", "Yi", "Zhi", "Gu", "Chu", "Jiang", "Feng", "Bei", "Cay", "Bian", "Sui", "Qun", "Ling", "Fu", "Zuo", "Xia", "Xiong", null, "Nao", "Xia", "Kui", "Xi", "Wai", "Yuan", "Mao", "Su", "Duo", "Duo", "Ye", "Qing", "Uys", "Gou", "Gou", "Qi", "Meng", "Meng", "Yin", "Huo", "Chen", "Da", "Ze", "Tian", "Tai", "Fu", "Guai", "Yao", "Yang", "Hang", "Gao", "Shi", "Ben", "Tai", "Tou", "Yan", "Bi", "Yi", "Kua", "Jia", "Duo", "Kwu", "Kuang", "Yun", "Jia", "Pa", "En", "Lian", "Huan", "Di", "Yan", "Pao", "Quan", "Qi", "Nai", "Feng", "Xie", "Fen", "Dian", null, "Kui", "Zou", "Huan", "Qi", "Kai", "Zha", "Ben", "Yi", "Jiang", "Tao", "Zang", "Ben", "Xi", "Xiang", "Fei", "Diao", "Xun", "Keng", "Dian", "Ao", "She", "Weng", "Pan", "Ao", "Wu", "Ao", "Jiang", "Lian", "Duo", "Yun", "Jiang", "Shi", "Fen", "Huo", "Bi", "Lian", "Duo", "Nu", "Nu", "Ding", "Nai", "Qian", "Jian", "Ta", "Jiu", "Nan", "Cha", "Hao", "Xian", "Fan", "Ji", "Shuo", "Ru", "Fei", "Wang", "Hong", "Zhuang", "Fu", "Ma", "Dan", "Ren", "Fu", "Jing", "Yan", "Xie", "Wen", "Zhong", "Pa", "Du", "Ji", "Keng", "Zhong", "Yao", "Jin", "Yun", "Miao", "Pei", "Shi", "Yue", "Zhuang", "Niu", "Yan", "Na", "Xin", "Fen", "Bi", "Yu", "Tuo", "Feng", "Yuan", "Fang", "Wu", "Yu", "Gui", "Du", "Ba", "Ni", "Zhou", "Zhuo", "Zhao", "Da", "Nai", "Yuan", "Tou", "Xuan", "Zhi", "E", "Mei", "Mo", "Qi", "Bi", "Shen", "Qie", "E", "He", "Xu", "Fa", "Zheng", "Min", "Ban", "Mu", "Fu", "Ling", "Zi", "Zi", "Shi", "Ran", "Shan", "Yang", "Man", "Jie", "Gu", "Si", "Xing", "Wei", "Zi", "Ju", "Shan", "Pin", "Ren", "Yao", "Tong", "Jiang", "Shu", "Ji", "Gai", "Shang", "Kuo", "Juan", "Jiao", "Gou", "Mu", "Jian", "Jian", "Yi", "Nian", "Zhi", "Ji", "Ji", "Xian", "Heng", "Guang", "Jun", "Kua", "Yan", "Ming", "Lie", "Pei", "Yan", "You", "Yan", "Cha", "Shen", "Yin", "Chi", "Gui", "Quan", "Zi"], Ee = ["Song", "Wei", "Hong", "Wa", "Lou", "Ya", "Rao", "Jiao", "Luan", "Ping", "Xian", "Shao", "Li", "Cheng", "Xiao", "Mang", "Fu", "Suo", "Wu", "Wei", "Ke", "Lai", "Chuo", "Ding", "Niang", "Xing", "Nan", "Yu", "Nuo", "Pei", "Nei", "Juan", "Shen", "Zhi", "Han", "Di", "Zhuang", "E", "Pin", "Tui", "Han", "Mian", "Wu", "Yan", "Wu", "Xi", "Yan", "Yu", "Si", "Yu", "Wa", null, "Xian", "Ju", "Qu", "Shui", "Qi", "Xian", "Zhui", "Dong", "Chang", "Lu", "Ai", "E", "E", "Lou", "Mian", "Cong", "Pou", "Ju", "Po", "Cai", "Ding", "Wan", "Biao", "Xiao", "Shu", "Qi", "Hui", "Fu", "E", "Wo", "Tan", "Fei", "Wei", "Jie", "Tian", "Ni", "Quan", "Jing", "Hun", "Jing", "Qian", "Dian", "Xing", "Hu", "Wa", "Lai", "Bi", "Yin", "Chou", "Chuo", "Fu", "Jing", "Lun", "Yan", "Lan", "Kun", "Yin", "Ya", "Ju", "Li", "Dian", "Xian", "Hwa", "Hua", "Ying", "Chan", "Shen", "Ting", "Dang", "Yao", "Wu", "Nan", "Ruo", "Jia", "Tou", "Xu", "Yu", "Wei", "Ti", "Rou", "Mei", "Dan", "Ruan", "Qin", "Hui", "Wu", "Qian", "Chun", "Mao", "Fu", "Jie", "Duan", "Xi", "Zhong", "Mei", "Huang", "Mian", "An", "Ying", "Xuan", "Jie", "Wei", "Mei", "Yuan", "Zhen", "Qiu", "Ti", "Xie", "Tuo", "Lian", "Mao", "Ran", "Si", "Pian", "Wei", "Wa", "Jiu", "Hu", "Ao", null, "Bou", "Xu", "Tou", "Gui", "Zou", "Yao", "Pi", "Xi", "Yuan", "Ying", "Rong", "Ru", "Chi", "Liu", "Mei", "Pan", "Ao", "Ma", "Gou", "Kui", "Qin", "Jia", "Sao", "Zhen", "Yuan", "Cha", "Yong", "Ming", "Ying", "Ji", "Su", "Niao", "Xian", "Tao", "Pang", "Lang", "Nao", "Bao", "Ai", "Pi", "Pin", "Yi", "Piao", "Yu", "Lei", "Xuan", "Man", "Yi", "Zhang", "Kang", "Yong", "Ni", "Li", "Di", "Gui", "Yan", "Jin", "Zhuan", "Chang", "Ce", "Han", "Nen", "Lao", "Mo", "Zhe", "Hu", "Hu", "Ao", "Nen", "Qiang", "Ma", "Pie", "Gu", "Wu", "Jiao", "Tuo", "Zhan", "Mao", "Xian", "Xian", "Mo", "Liao", "Lian", "Hua"], Ke = ["Gui", "Deng", "Zhi", "Xu", "Yi", "Hua", "Xi", "Hui", "Rao", "Xi", "Yan", "Chan", "Jiao", "Mei", "Fan", "Fan", "Xian", "Yi", "Wei", "Jiao", "Fu", "Shi", "Bi", "Shan", "Sui", "Qiang", "Lian", "Huan", "Xin", "Niao", "Dong", "Yi", "Can", "Ai", "Niang", "Neng", "Ma", "Tiao", "Chou", "Jin", "Ci", "Yu", "Pin", "Yong", "Xu", "Nai", "Yan", "Tai", "Ying", "Can", "Niao", "Wo", "Ying", "Mian", "Kaka", "Ma", "Shen", "Xing", "Ni", "Du", "Liu", "Yuan", "Lan", "Yan", "Shuang", "Ling", "Jiao", "Niang", "Lan", "Xian", "Ying", "Shuang", "Shuai", "Quan", "Mi", "Li", "Luan", "Yan", "Zhu", "Lan", "Zi", "Jie", "Jue", "Jue", "Kong", "Yun", "Zi", "Zi", "Cun", "Sun", "Fu", "Bei", "Zi", "Xiao", "Xin", "Meng", "Si", "Tai", "Bao", "Ji", "Gu", "Nu", "Xue", null, "Zhuan", "Hai", "Luan", "Sun", "Huai", "Mie", "Cong", "Qian", "Shu", "Chan", "Ya", "Zi", "Ni", "Fu", "Zi", "Li", "Xue", "Bo", "Ru", "Lai", "Nie", "Nie", "Ying", "Luan", "Mian", "Ning", "Rong", "Ta", "Gui", "Zhai", "Qiong", "Yu", "Shou", "An", "Tu", "Song", "Wan", "Rou", "Yao", "Hong", "Yi", "Jing", "Zhun", "Mi", "Zhu", "Dang", "Hong", "Zong", "Guan", "Zhou", "Ding", "Wan", "Yi", "Bao", "Shi", "Shi", "Chong", "Shen", "Ke", "Xuan", "Shi", "You", "Huan", "Yi", "Tiao", "Shi", "Xian", "Gong", "Cheng", "Qun", "Gong", "Xiao", "Zai", "Zha", "Bao", "Hai", "Yan", "Xiao", "Jia", "Shen", "Chen", "Rong", "Huang", "Mi", "Kou", "Kuan", "Bin", "Su", "Cai", "Zan", "Ji", "Yuan", "Ji", "Yin", "Mi", "Kou", "Qing", "Que", "Zhen", "Jian", "Fu", "Ning", "Bing", "Huan", "Mei", "Qin", "Han", "Yu", "Shi", "Ning", "Qin", "Ning", "Zhi", "Yu", "Bao", "Kuan", "Ning", "Qin", "Mo", "Cha", "Ju", "Gua", "Qin", "Hu", "Wu", "Liao", "Shi", "Zhu", "Zhai", "Shen", "Wei", "Xie", "Kuan", "Hui", "Liao", "Jun", "Huan", "Yi", "Yi", "Bao", "Qin", "Chong", "Bao", "Feng", "Cun", "Dui", "Si", "Xun", "Dao", "Lu", "Dui", "Shou"], We = ["Po", "Feng", "Zhuan", "Fu", "She", "Ke", "Jiang", "Jiang", "Zhuan", "Wei", "Zun", "Xun", "Shu", "Dui", "Dao", "Xiao", "Ji", "Shao", "Er", "Er", "Er", "Ga", "Jian", "Shu", "Chen", "Shang", "Shang", "Mo", "Ga", "Chang", "Liao", "Xian", "Xian", null, "Wang", "Wang", "You", "Liao", "Liao", "Yao", "Mang", "Wang", "Wang", "Wang", "Ga", "Yao", "Duo", "Kui", "Zhong", "Jiu", "Gan", "Gu", "Gan", "Tui", "Gan", "Gan", "Shi", "Yin", "Chi", "Kao", "Ni", "Jin", "Wei", "Niao", "Ju", "Pi", "Ceng", "Xi", "Bi", "Ju", "Jie", "Tian", "Qu", "Ti", "Jie", "Wu", "Diao", "Shi", "Shi", "Ping", "Ji", "Xie", "Chen", "Xi", "Ni", "Zhan", "Xi", null, "Man", "E", "Lou", "Ping", "Ti", "Fei", "Shu", "Xie", "Tu", "Lu", "Lu", "Xi", "Ceng", "Lu", "Ju", "Xie", "Ju", "Jue", "Liao", "Jue", "Shu", "Xi", "Che", "Tun", "Ni", "Shan", null, "Xian", "Li", "Xue", "Nata", null, "Long", "Yi", "Qi", "Ren", "Wu", "Han", "Shen", "Yu", "Chu", "Sui", "Qi", null, "Yue", "Ban", "Yao", "Ang", "Ya", "Wu", "Jie", "E", "Ji", "Qian", "Fen", "Yuan", "Qi", "Cen", "Qian", "Qi", "Cha", "Jie", "Qu", "Gang", "Xian", "Ao", "Lan", "Dao", "Ba", "Zuo", "Zuo", "Yang", "Ju", "Gang", "Ke", "Gou", "Xue", "Bei", "Li", "Tiao", "Ju", "Yan", "Fu", "Xiu", "Jia", "Ling", "Tuo", "Pei", "You", "Dai", "Kuang", "Yue", "Qu", "Hu", "Po", "Min", "An", "Tiao", "Ling", "Chi", "Yuri", "Dong", "Cem", "Kui", "Xiu", "Mao", "Tong", "Xue", "Yi", "Kura", "He", "Ke", "Luo", "E", "Fu", "Xun", "Die", "Lu", "An", "Er", "Gai", "Quan", "Tong", "Yi", "Mu", "Shi", "An", "Wei", "Hu", "Zhi", "Mi", "Li", "Ji", "Tong", "Wei", "You", "Sang", "Xia", "Li", "Yao", "Jiao", "Zheng", "Luan", "Jiao", "E", "E", "Yu", "Ye", "Bu", "Qiao", "Qun", "Feng", "Feng", "Nao", "Li", "You", "Xian", "Hong", "Dao", "Shen", "Cheng", "Tu", "Geng", "Jun", "Hao", "Xia", "Yin", "Yu"], Re = ["Lang", "Kan", "Lao", "Lai", "Xian", "Que", "Kong", "Chong", "Chong", "Ta", "Lin", "Hua", "Ju", "Lai", "Qi", "Min", "Kun", "Kun", "Zu", "Gu", "Cui", "Ya", "Ya", "Gang", "Lun", "Lun", "Leng", "Jue", "Duo", "Zheng", "Guo", "Yin", "Dong", "Han", "Zheng", "Wei", "Yao", "Pi", "Yan", "Song", "Jie", "Beng", "Zu", "Jue", "Dong", "Zhan", "Gu", "Yin", null, "Ze", "Huang", "Yu", "Wei", "Yang", "Feng", "Qiu", "Dun", "Ti", "Yi", "Zhi", "Shi", "Zai", "Yao", "E", "Zhu", "Kan", "Lu", "Yan", "Mei", "Gan", "Ji", "Ji", "Huan", "Ting", "Sheng", "Mei", "Qian", "Wu", "Yu", "Zong", "Lan", "Jue", "Yan", "Yan", "Wei", "Zong", "Cha", "Sui", "Rong", "Yamashina", "Qin", "Yu", "Kewashii", "Lou", "Tu", "Dui", "Xi", "Weng", "Cang", "Dang", "Hong", "Jie", "Ai", "Liu", "Wu", "Song", "Qiao", "Zi", "Wei", "Beng", "Dian", "Cuo", "Qian", "Yong", "Nie", "Cuo", "Ji", null, "Tao", "Song", "Zong", "Jiang", "Liao", "Kang", "Chan", "Die", "Cen", "Ding", "Tu", "Lou", "Zhang", "Zhan", "Zhan", "Ao", "Cao", "Qu", "Qiang", "Zui", "Zui", "Dao", "Dao", "Xi", "Yu", "Bo", "Long", "Xiang", "Ceng", "Bo", "Qin", "Jiao", "Yan", "Lao", "Zhan", "Lin", "Liao", "Liao", "Jin", "Deng", "Duo", "Zun", "Jiao", "Gui", "Yao", "Qiao", "Yao", "Jue", "Zhan", "Yi", "Xue", "Nao", "Ye", "Ye", "Yi", "E", "Xian", "Ji", "Xie", "Ke", "Xi", "Di", "Ao", "Zui", null, "Ni", "Rong", "Dao", "Ling", "Za", "Yu", "Yue", "Yin", null, "Jie", "Li", "Sui", "Long", "Long", "Dian", "Ying", "Xi", "Ju", "Chan", "Ying", "Kui", "Yan", "Wei", "Nao", "Quan", "Chao", "Cuan", "Luan", "Dian", "Dian", null, "Yan", "Yan", "Yan", "Nao", "Yan", "Chuan", "Gui", "Chuan", "Zhou", "Huang", "Jing", "Xun", "Chao", "Chao", "Lie", "Gong", "Zuo", "Qiao", "Ju", "Gong", "Kek", "Wu", "Pwu", "Pwu", "Chai", "Qiu", "Qiu", "Ji", "Yi", "Si", "Ba", "Zhi", "Zhao", "Xiang", "Yi", "Jin", "Xun", "Juan", "Phas", "Xun", "Jin", "Fu"], Ae = ["Za", "Bi", "Shi", "Bu", "Ding", "Shuai", "Fan", "Nie", "Shi", "Fen", "Pa", "Zhi", "Xi", "Hu", "Dan", "Wei", "Zhang", "Tang", "Dai", "Ma", "Pei", "Pa", "Tie", "Fu", "Lian", "Zhi", "Zhou", "Bo", "Zhi", "Di", "Mo", "Yi", "Yi", "Ping", "Qia", "Juan", "Ru", "Shuai", "Dai", "Zheng", "Shui", "Qiao", "Zhen", "Shi", "Qun", "Xi", "Bang", "Dai", "Gui", "Chou", "Ping", "Zhang", "Sha", "Wan", "Dai", "Wei", "Chang", "Sha", "Qi", "Ze", "Guo", "Mao", "Du", "Hou", "Zheng", "Xu", "Mi", "Wei", "Wo", "Fu", "Yi", "Bang", "Ping", "Tazuna", "Gong", "Pan", "Huang", "Dao", "Mi", "Jia", "Teng", "Hui", "Zhong", "Shan", "Man", "Mu", "Biao", "Guo", "Ze", "Mu", "Bang", "Zhang", "Jiong", "Chan", "Fu", "Zhi", "Hu", "Fan", "Chuang", "Bi", "Hei", null, "Mi", "Qiao", "Chan", "Fen", "Meng", "Bang", "Chou", "Mie", "Chu", "Jie", "Xian", "Lan", "Gan", "Ping", "Nian", "Qian", "Bing", "Bing", "Xing", "Gan", "Yao", "Huan", "You", "You", "Ji", "Guang", "Pi", "Ting", "Ze", "Guang", "Zhuang", "Mo", "Qing", "Bi", "Qin", "Dun", "Chuang", "Gui", "Ya", "Bai", "Jie", "Xu", "Lu", "Wu", null, "Ku", "Ying", "Di", "Pao", "Dian", "Ya", "Miao", "Geng", "Ci", "Fu", "Tong", "Pang", "Fei", "Xiang", "Yi", "Zhi", "Tiao", "Zhi", "Xiu", "Du", "Zuo", "Xiao", "Tu", "Gui", "Ku", "Pang", "Ting", "You", "Bu", "Ding", "Cheng", "Lai", "Bei", "Ji", "An", "Shu", "Kang", "Yong", "Tuo", "Song", "Shu", "Qing", "Yu", "Yu", "Miao", "Sou", "Ce", "Xiang", "Fei", "Jiu", "He", "Hui", "Liu", "Sha", "Lian", "Lang", "Sou", "Jian", "Pou", "Qing", "Jiu", "Jiu", "Qin", "Ao", "Kuo", "Lou", "Yin", "Liao", "Dai", "Lu", "Yi", "Chu", "Chan", "Tu", "Si", "Xin", "Miao", "Chang", "Wu", "Fei", "Guang", "Koc", "Kuai", "Bi", "Qiang", "Xie", "Lin", "Lin", "Liao", "Lu", null, "Ying", "Xian", "Ting", "Yong", "Li", "Ting", "Yin", "Xun", "Yan", "Ting", "Di", "Po", "Jian", "Hui", "Nai", "Hui", "Gong", "Nian"], ze = ["Kai", "Bian", "Yi", "Qi", "Nong", "Fen", "Ju", "Yan", "Yi", "Zang", "Bi", "Yi", "Yi", "Er", "San", "Shi", "Er", "Shi", "Shi", "Gong", "Diao", "Yin", "Hu", "Fu", "Hong", "Wu", "Tui", "Chi", "Jiang", "Ba", "Shen", "Di", "Zhang", "Jue", "Tao", "Fu", "Di", "Mi", "Xian", "Hu", "Chao", "Nu", "Jing", "Zhen", "Yi", "Mi", "Quan", "Wan", "Shao", "Ruo", "Xuan", "Jing", "Dun", "Zhang", "Jiang", "Qiang", "Peng", "Dan", "Qiang", "Bi", "Bi", "She", "Dan", "Jian", "Gou", "Sei", "Fa", "Bi", "Kou", "Nagi", "Bie", "Xiao", "Dan", "Kuo", "Qiang", "Hong", "Mi", "Kuo", "Wan", "Jue", "Ji", "Ji", "Gui", "Dang", "Lu", "Lu", "Tuan", "Hui", "Zhi", "Hui", "Hui", "Yi", "Yi", "Yi", "Yi", "Huo", "Huo", "Shan", "Xing", "Wen", "Tong", "Yan", "Yan", "Yu", "Chi", "Cai", "Biao", "Diao", "Bin", "Peng", "Yong", "Piao", "Zhang", "Ying", "Chi", "Chi", "Zhuo", "Tuo", "Ji", "Pang", "Zhong", "Yi", "Wang", "Che", "Bi", "Chi", "Ling", "Fu", "Wang", "Zheng", "Cu", "Wang", "Jing", "Dai", "Xi", "Xun", "Hen", "Yang", "Huai", "Lu", "Hou", "Wa", "Cheng", "Zhi", "Xu", "Jing", "Tu", "Cong", null, "Lai", "Cong", "De", "Pai", "Xi", null, "Qi", "Chang", "Zhi", "Cong", "Zhou", "Lai", "Yu", "Xie", "Jie", "Jian", "Chi", "Jia", "Bian", "Huang", "Fu", "Xun", "Wei", "Pang", "Yao", "Wei", "Xi", "Zheng", "Piao", "Chi", "De", "Zheng", "Zheng", "Bie", "De", "Chong", "Che", "Jiao", "Wei", "Jiao", "Hui", "Mei", "Long", "Xiang", "Bao", "Qu", "Xin", "Shu", "Bi", "Yi", "Le", "Ren", "Dao", "Ding", "Gai", "Ji", "Ren", "Ren", "Chan", "Tan", "Te", "Te", "Gan", "Qi", "Shi", "Cun", "Zhi", "Wang", "Mang", "Xi", "Fan", "Ying", "Tian", "Min", "Min", "Zhong", "Chong", "Wu", "Ji", "Wu", "Xi", "Ye", "You", "Wan", "Cong", "Zhong", "Kuai", "Yu", "Bian", "Zhi", "Qi", "Cui", "Chen", "Tai", "Tun", "Qian", "Nian", "Hun", "Xiong", "Niu", "Wang", "Xian", "Xin", "Kang", "Hu", "Kai", "Fen"], Oe = ["Huai", "Tai", "Song", "Wu", "Ou", "Chang", "Chuang", "Ju", "Yi", "Bao", "Chao", "Min", "Pei", "Zuo", "Zen", "Yang", "Kou", "Ban", "Nu", "Nao", "Zheng", "Pa", "Bu", "Tie", "Gu", "Hu", "Ju", "Da", "Lian", "Si", "Chou", "Di", "Dai", "Yi", "Tu", "You", "Fu", "Ji", "Peng", "Xing", "Yuan", "Ni", "Guai", "Fu", "Xi", "Bi", "You", "Qie", "Xuan", "Cong", "Bing", "Huang", "Xu", "Chu", "Pi", "Xi", "Xi", "Tan", "Koraeru", "Zong", "Dui", null, "Ki", "Yi", "Chi", "Ren", "Xun", "Shi", "Xi", "Lao", "Heng", "Kuang", "Mu", "Zhi", "Xie", "Lian", "Tiao", "Huang", "Die", "Hao", "Kong", "Gui", "Heng", "Xi", "Xiao", "Shu", "S", "Kua", "Qiu", "Yang", "Hui", "Hui", "Chi", "Jia", "Yi", "Xiong", "Guai", "Lin", "Hui", "Zi", "Xu", "Chi", "Xiang", "Nu", "Hen", "En", "Ke", "Tong", "Tian", "Gong", "Quan", "Xi", "Qia", "Yue", "Peng", "Ken", "De", "Hui", "E", "Kyuu", "Tong", "Yan", "Kai", "Ce", "Nao", "Yun", "Mang", "Yong", "Yong", "Yuan", "Pi", "Kun", "Qiao", "Yue", "Yu", "Yu", "Jie", "Xi", "Zhe", "Lin", "Ti", "Han", "Hao", "Qie", "Ti", "Bu", "Yi", "Qian", "Hui", "Xi", "Bei", "Man", "Yi", "Heng", "Song", "Quan", "Cheng", "Hui", "Wu", "Wu", "You", "Li", "Liang", "Huan", "Cong", "Yi", "Yue", "Li", "Nin", "Nao", "E", "Que", "Xuan", "Qian", "Wu", "Min", "Cong", "Fei", "Bei", "Duo", "Cui", "Chang", "Men", "Li", "Ji", "Guan", "Guan", "Xing", "Dao", "Qi", "Kong", "Tian", "Lun", "Xi", "Kan", "Kun", "Ni", "Qing", "Chou", "Dun", "Guo", "Chan", "Liang", "Wan", "Yuan", "Jin", "Ji", "Lin", "Yu", "Huo", "He", "Quan", "Tan", "Ti", "Ti", "Nie", "Wang", "Chuo", "Bu", "Hun", "Xi", "Tang", "Xin", "Wei", "Hui", "E", "Rui", "Zong", "Jian", "Yong", "Dian", "Ju", "Can", "Cheng", "De", "Bei", "Qie", "Can", "Dan", "Guan", "Duo", "Nao", "Yun", "Xiang", "Zhui", "Die", "Huang", "Chun", "Qiong", "Re", "Xing", "Ce", "Bian", "Hun", "Zong", "Ti"], je = ["Qiao", "Chou", "Bei", "Xuan", "Wei", "Ge", "Qian", "Wei", "Yu", "Yu", "Bi", "Xuan", "Huan", "Min", "Bi", "Yi", "Mian", "Yong", "Kai", "Dang", "Yin", "E", "Chen", "Mou", "Ke", "Ke", "Yu", "Ai", "Qie", "Yan", "Nuo", "Gan", "Yun", "Zong", "Sai", "Leng", "Fen", null, "Kui", "Kui", "Que", "Gong", "Yun", "Su", "Su", "Qi", "Yao", "Song", "Huang", "Ji", "Gu", "Ju", "Chuang", "Ni", "Xie", "Kai", "Zheng", "Yong", "Cao", "Sun", "Shen", "Bo", "Kai", "Yuan", "Xie", "Hun", "Yong", "Yang", "Li", "Sao", "Tao", "Yin", "Ci", "Xu", "Qian", "Tai", "Huang", "Yun", "Shen", "Ming", null, "She", "Cong", "Piao", "Mo", "Mu", "Guo", "Chi", "Can", "Can", "Can", "Cui", "Min", "Te", "Zhang", "Tong", "Ao", "Shuang", "Man", "Guan", "Que", "Zao", "Jiu", "Hui", "Kai", "Lian", "Ou", "Song", "Jin", "Yin", "Lu", "Shang", "Wei", "Tuan", "Man", "Qian", "She", "Yong", "Qing", "Kang", "Di", "Zhi", "Lou", "Juan", "Qi", "Qi", "Yu", "Ping", "Liao", "Cong", "You", "Chong", "Zhi", "Tong", "Cheng", "Qi", "Qu", "Peng", "Bei", "Bie", "Chun", "Jiao", "Zeng", "Chi", "Lian", "Ping", "Kui", "Hui", "Qiao", "Cheng", "Yin", "Yin", "Xi", "Xi", "Dan", "Tan", "Duo", "Dui", "Dui", "Su", "Jue", "Ce", "Xiao", "Fan", "Fen", "Lao", "Lao", "Chong", "Han", "Qi", "Xian", "Min", "Jing", "Liao", "Wu", "Can", "Jue", "Cu", "Xian", "Tan", "Sheng", "Pi", "Yi", "Chu", "Xian", "Nao", "Dan", "Tan", "Jing", "Song", "Han", "Jiao", "Wai", "Huan", "Dong", "Qin", "Qin", "Qu", "Cao", "Ken", "Xie", "Ying", "Ao", "Mao", "Yi", "Lin", "Se", "Jun", "Huai", "Men", "Lan", "Ai", "Lin", "Yan", "Gua", "Xia", "Chi", "Yu", "Yin", "Dai", "Meng", "Ai", "Meng", "Dui", "Qi", "Mo", "Lan", "Men", "Chou", "Zhi", "Nuo", "Nuo", "Yan", "Yang", "Bo", "Zhi", "Kuang", "Kuang", "You", "Fu", "Liu", "Mie", "Cheng", null, "Chan", "Meng", "Lan", "Huai", "Xuan", "Rang", "Chan", "Ji", "Ju", "Huan", "She", "Yi"], Ie = ["Lian", "Nan", "Mi", "Tang", "Jue", "Gang", "Gang", "Gang", "Ge", "Yue", "Wu", "Jian", "Xu", "Shu", "Rong", "Xi", "Cheng", "Wo", "Jie", "Ge", "Jian", "Qiang", "Huo", "Qiang", "Zhan", "Dong", "Qi", "Jia", "Die", "Zei", "Jia", "Ji", "Shi", "Kan", "Ji", "Kui", "Gai", "Deng", "Zhan", "Chuang", "Ge", "Jian", "Jie", "Yu", "Jian", "Yan", "Lu", "Xi", "Zhan", "Xi", "Xi", "Chuo", "Dai", "Qu", "Hu", "Hu", "Hu", "E", "Shi", "Li", "Mao", "Hu", "Li", "Fang", "Suo", "Bian", "Dian", "Jiong", "Shang", "Yi", "Yi", "Shan", "Hu", "Fei", "Yan", "Shou", "T", "Cai", "Zha", "Qiu", "Le", "Bu", "Ba", "Da", "Reng", "Fu", "Hameru", "Zai", "Tuo", "Zhang", "Diao", "Kang", "Yu", "Ku", "Han", "Shen", "Cha", "Yi", "Gu", "Kou", "Wu", "Tuo", "Qian", "Zhi", "Ren", "Kuo", "Men", "Sao", "Yang", "Niu", "Ban", "Che", "Rao", "Xi", "Qian", "Ban", "Jia", "Yu", "Fu", "Ao", "Xi", "Pi", "Zhi", "Zi", "E", "Dun", "Zhao", "Cheng", "Ji", "Yan", "Kuang", "Bian", "Chao", "Ju", "Wen", "Hu", "Yue", "Jue", "Ba", "Qin", "Zhen", "Zheng", "Yun", "Wan", "Nu", "Yi", "Shu", "Zhua", "Pou", "Tou", "Dou", "Kang", "Zhe", "Pou", "Fu", "Pao", "Ba", "Ao", "Ze", "Tuan", "Kou", "Lun", "Qiang", null, "Hu", "Bao", "Bing", "Zhi", "Peng", "Tan", "Pu", "Pi", "Tai", "Yao", "Zhen", "Zha", "Yang", "Bao", "He", "Ni", "Yi", "Di", "Chi", "Pi", "Za", "Mo", "Mo", "Shen", "Ya", "Chou", "Qu", "Min", "Chu", "Jia", "Fu", "Zhan", "Zhu", "Dan", "Chai", "Mu", "Nian", "La", "Fu", "Pao", "Ban", "Pai", "Ling", "Na", "Guai", "Qian", "Ju", "Tuo", "Ba", "Tuo", "Tuo", "Ao", "Ju", "Zhuo", "Pan", "Zhao", "Bai", "Bai", "Di", "Ni", "Ju", "Kuo", "Long", "Jian", null, "Yong", "Lan", "Ning", "Bo", "Ze", "Qian", "Hen", "Gua", "Shi", "Jie", "Zheng", "Nin", "Gong", "Gong", "Quan", "Shuan", "Cun", "Zan", "Kao", "Chi", "Xie", "Ce", "Hui", "Pin", "Zhuai", "Shi", "Na"], Ue = ["Bo", "Chi", "Gua", "Zhi", "Kuo", "Duo", "Duo", "Zhi", "Qie", "An", "Nong", "Zhen", "Ge", "Jiao", "Ku", "Dong", "Ru", "Tiao", "Lie", "Zha", "Lu", "Die", "Wa", "Jue", "Mushiru", "Ju", "Zhi", "Luan", "Ya", "Zhua", "Ta", "Xie", "Nao", "Dang", "Jiao", "Zheng", "Ji", "Hui", "Xun", "Ku", "Ai", "Tuo", "Nuo", "Cuo", "Bo", "Geng", "Ti", "Zhen", "Cheng", "Suo", "Suo", "Keng", "Mei", "Long", "Ju", "Peng", "Jian", "Yi", "Ting", "Shan", "Nuo", "Wan", "Xie", "Cha", "Feng", "Jiao", "Wu", "Jun", "Jiu", "Tong", "Kun", "Huo", "Tu", "Zhuo", "Pou", "Le", "Ba", "Han", "Shao", "Nie", "Juan", "Ze", "Song", "Ye", "Jue", "Bu", "Huan", "Bu", "Zun", "Yi", "Zhai", "Lu", "Sou", "Tuo", "Lao", "Sun", "Bang", "Jian", "Huan", "Dao", null, "Wan", "Qin", "Peng", "She", "Lie", "Min", "Men", "Fu", "Bai", "Ju", "Dao", "Wo", "Ai", "Juan", "Yue", "Zong", "Chen", "Chui", "Jie", "Tu", "Ben", "Na", "Nian", "Nuo", "Zu", "Wo", "Xi", "Xian", "Cheng", "Dian", "Sao", "Lun", "Qing", "Gang", "Duo", "Shou", "Diao", "Pou", "Di", "Zhang", "Gun", "Ji", "Tao", "Qia", "Qi", "Pai", "Shu", "Qian", "Ling", "Yi", "Ya", "Jue", "Zheng", "Liang", "Gua", "Yi", "Huo", "Shan", "Zheng", "Lue", "Cai", "Tan", "Che", "Bing", "Jie", "Ti", "Kong", "Tui", "Yan", "Cuo", "Zou", "Ju", "Tian", "Qian", "Ken", "Bai", "Shou", "Jie", "Lu", "Guo", "Haba", null, "Zhi", "Dan", "Mang", "Xian", "Sao", "Guan", "Peng", "Yuan", "Nuo", "Jian", "Zhen", "Jiu", "Jian", "Yu", "Yan", "Kui", "Nan", "Hong", "Rou", "Pi", "Wei", "Sai", "Zou", "Xuan", "Miao", "Ti", "Nie", "Cha", "Shi", "Zong", "Zhen", "Yi", "Shun", "Heng", "Bian", "Yang", "Huan", "Yan", "Zuan", "An", "Xu", "Ya", "Wo", "Ke", "Chuai", "Ji", "Ti", "La", "La", "Cheng", "Kai", "Jiu", "Jiu", "Tu", "Jie", "Hui", "Geng", "Chong", "Shuo", "She", "Xie", "Yuan", "Qian", "Ye", "Cha", "Zha", "Bei", "Yao", null, null, "Lan", "Wen", "Qin"], $e = ["Chan", "Ge", "Lou", "Zong", "Geng", "Jiao", "Gou", "Qin", "Yong", "Que", "Chou", "Chi", "Zhan", "Sun", "Sun", "Bo", "Chu", "Rong", "Beng", "Cuo", "Sao", "Ke", "Yao", "Dao", "Zhi", "Nu", "Xie", "Jian", "Sou", "Qiu", "Gao", "Xian", "Shuo", "Sang", "Jin", "Mie", "E", "Chui", "Nuo", "Shan", "Ta", "Jie", "Tang", "Pan", "Ban", "Da", "Li", "Tao", "Hu", "Zhi", "Wa", "Xia", "Qian", "Wen", "Qiang", "Tian", "Zhen", "E", "Xi", "Nuo", "Quan", "Cha", "Zha", "Ge", "Wu", "En", "She", "Kang", "She", "Shu", "Bai", "Yao", "Bin", "Sou", "Tan", "Sa", "Chan", "Suo", "Liao", "Chong", "Chuang", "Guo", "Bing", "Feng", "Shuai", "Di", "Qi", "Sou", "Zhai", "Lian", "Tang", "Chi", "Guan", "Lu", "Luo", "Lou", "Zong", "Gai", "Hu", "Zha", "Chuang", "Tang", "Hua", "Cui", "Nai", "Mo", "Jiang", "Gui", "Ying", "Zhi", "Ao", "Zhi", "Nie", "Man", "Shan", "Kou", "Shu", "Suo", "Tuan", "Jiao", "Mo", "Mo", "Zhe", "Xian", "Keng", "Piao", "Jiang", "Yin", "Gou", "Qian", "Lue", "Ji", "Ying", "Jue", "Pie", "Pie", "Lao", "Dun", "Xian", "Ruan", "Kui", "Zan", "Yi", "Xun", "Cheng", "Cheng", "Sa", "Nao", "Heng", "Si", "Qian", "Huang", "Da", "Zun", "Nian", "Lin", "Zheng", "Hui", "Zhuang", "Jiao", "Ji", "Cao", "Dan", "Dan", "Che", "Bo", "Che", "Jue", "Xiao", "Liao", "Ben", "Fu", "Qiao", "Bo", "Cuo", "Zhuo", "Zhuan", "Tuo", "Pu", "Qin", "Dun", "Nian", null, "Xie", "Lu", "Jiao", "Cuan", "Ta", "Han", "Qiao", "Zhua", "Jian", "Gan", "Yong", "Lei", "Kuo", "Lu", "Shan", "Zhuo", "Ze", "Pu", "Chuo", "Ji", "Dang", "Suo", "Cao", "Qing", "Jing", "Huan", "Jie", "Qin", "Kuai", "Dan", "Xi", "Ge", "Pi", "Bo", "Ao", "Ju", "Ye", null, "Mang", "Sou", "Mi", "Ji", "Tai", "Zhuo", "Dao", "Xing", "Lan", "Ca", "Ju", "Ye", "Ru", "Ye", "Ye", "Ni", "Hu", "Ji", "Bin", "Ning", "Ge", "Zhi", "Jie", "Kuo", "Mo", "Jian", "Xie", "Lie", "Tan", "Bai", "Sou", "Lu", "Lue", "Rao", "Zhi"], qe = ["Pan", "Yang", "Lei", "Sa", "Shu", "Zan", "Nian", "Xian", "Jun", "Huo", "Li", "La", "Han", "Ying", "Lu", "Long", "Qian", "Qian", "Zan", "Qian", "Lan", "San", "Ying", "Mei", "Rang", "Chan", null, "Cuan", "Xi", "She", "Luo", "Jun", "Mi", "Li", "Zan", "Luan", "Tan", "Zuan", "Li", "Dian", "Wa", "Dang", "Jiao", "Jue", "Lan", "Li", "Nang", "Zhi", "Gui", "Gui", "Qi", "Xin", "Pu", "Sui", "Shou", "Kao", "You", "Gai", "Yi", "Gong", "Gan", "Ban", "Fang", "Zheng", "Bo", "Dian", "Kou", "Min", "Wu", "Gu", "He", "Ce", "Xiao", "Mi", "Chu", "Ge", "Di", "Xu", "Jiao", "Min", "Chen", "Jiu", "Zhen", "Duo", "Yu", "Chi", "Ao", "Bai", "Xu", "Jiao", "Duo", "Lian", "Nie", "Bi", "Chang", "Dian", "Duo", "Yi", "Gan", "San", "Ke", "Yan", "Dun", "Qi", "Dou", "Xiao", "Duo", "Jiao", "Jing", "Yang", "Xia", "Min", "Shu", "Ai", "Qiao", "Ai", "Zheng", "Di", "Zhen", "Fu", "Shu", "Liao", "Qu", "Xiong", "Xi", "Jiao", "Sen", "Jiao", "Zhuo", "Yi", "Lian", "Bi", "Li", "Xiao", "Xiao", "Wen", "Xue", "Qi", "Qi", "Zhai", "Bin", "Jue", "Zhai", null, "Fei", "Ban", "Ban", "Lan", "Yu", "Lan", "Wei", "Dou", "Sheng", "Liao", "Jia", "Hu", "Xie", "Jia", "Yu", "Zhen", "Jiao", "Wo", "Tou", "Chu", "Jin", "Chi", "Yin", "Fu", "Qiang", "Zhan", "Qu", "Zhuo", "Zhan", "Duan", "Zhuo", "Si", "Xin", "Zhuo", "Zhuo", "Qin", "Lin", "Zhuo", "Chu", "Duan", "Zhu", "Fang", "Xie", "Hang", "Yu", "Shi", "Pei", "You", "Mye", "Pang", "Qi", "Zhan", "Mao", "Lu", "Pei", "Pi", "Liu", "Fu", "Fang", "Xuan", "Jing", "Jing", "Ni", "Zu", "Zhao", "Yi", "Liu", "Shao", "Jian", "Es", "Yi", "Qi", "Zhi", "Fan", "Piao", "Fan", "Zhan", "Guai", "Sui", "Yu", "Wu", "Ji", "Ji", "Ji", "Huo", "Ri", "Dan", "Jiu", "Zhi", "Zao", "Xie", "Tiao", "Xun", "Xu", "Xu", "Xu", "Gan", "Han", "Tai", "Di", "Xu", "Chan", "Shi", "Kuang", "Yang", "Shi", "Wang", "Min", "Min", "Tun", "Chun", "Wu"], Ve = ["Yun", "Bei", "Ang", "Ze", "Ban", "Jie", "Kun", "Sheng", "Hu", "Fang", "Hao", "Gui", "Chang", "Xuan", "Ming", "Hun", "Fen", "Qin", "Hu", "Yi", "Xi", "Xin", "Yan", "Ze", "Fang", "Tan", "Shen", "Ju", "Yang", "Zan", "Bing", "Xing", "Ying", "Xuan", "Pei", "Zhen", "Ling", "Chun", "Hao", "Mei", "Zuo", "Mo", "Bian", "Xu", "Hun", "Zhao", "Zong", "Shi", "Shi", "Yu", "Fei", "Die", "Mao", "Ni", "Chang", "Wen", "Dong", "Ai", "Bing", "Ang", "Zhou", "Long", "Xian", "Kuang", "Tiao", "Chao", "Shi", "Huang", "Huang", "Xuan", "Kui", "Xu", "Jiao", "Jin", "Zhi", "Jin", "Shang", "Tong", "Hong", "Yan", "Gai", "Xiang", "Shai", "Xiao", "Ye", "Yun", "Hui", "Han", "Han", "Jun", "Wan", "Xian", "Kun", "Zhou", "Xi", "Cheng", "Sheng", "Bu", "Zhe", "Zhe", "Wu", "Han", "Hui", "Hao", "Chen", "Wan", "Tian", "Zhuo", "Zui", "Zhou", "Pu", "Jing", "Xi", "Shan", "Yi", "Xi", "Qing", "Qi", "Jing", "Gui", "Zhen", "Yi", "Zhi", "An", "Wan", "Lin", "Liang", "Chang", "Wang", "Xiao", "Zan", "Hi", "Xuan", "Xuan", "Yi", "Xia", "Yun", "Hui", "Fu", "Min", "Kui", "He", "Ying", "Du", "Wei", "Shu", "Qing", "Mao", "Nan", "Jian", "Nuan", "An", "Yang", "Chun", "Yao", "Suo", "Jin", "Ming", "Jiao", "Kai", "Gao", "Weng", "Chang", "Qi", "Hao", "Yan", "Li", "Ai", "Ji", "Gui", "Men", "Zan", "Xie", "Hao", "Mu", "Mo", "Cong", "Ni", "Zhang", "Hui", "Bao", "Han", "Xuan", "Chuan", "Liao", "Xian", "Dan", "Jing", "Pie", "Lin", "Tun", "Xi", "Yi", "Ji", "Huang", "Tai", "Ye", "Ye", "Li", "Tan", "Tong", "Xiao", "Fei", "Qin", "Zhao", "Hao", "Yi", "Xiang", "Xing", "Sen", "Jiao", "Bao", "Jing", "Yian", "Ai", "Ye", "Ru", "Shu", "Meng", "Xun", "Yao", "Pu", "Li", "Chen", "Kuang", "Die", null, "Yan", "Huo", "Lu", "Xi", "Rong", "Long", "Nang", "Luo", "Luan", "Shai", "Tang", "Yan", "Chu", "Yue", "Yue", "Qu", "Yi", "Geng", "Ye", "Hu", "He", "Shu", "Cao", "Cao", "Noboru", "Man", "Ceng", "Ceng", "Ti"], no = ["Zui", "Can", "Xu", "Hui", "Yin", "Qie", "Fen", "Pi", "Yue", "You", "Ruan", "Peng", "Ban", "Fu", "Ling", "Fei", "Qu", null, "Nu", "Tiao", "Shuo", "Zhen", "Lang", "Lang", "Juan", "Ming", "Huang", "Wang", "Tun", "Zhao", "Ji", "Qi", "Ying", "Zong", "Wang", "Tong", "Lang", null, "Meng", "Long", "Mu", "Deng", "Wei", "Mo", "Ben", "Zha", "Zhu", "Shu", null, "Zhu", "Ren", "Ba", "Po", "Duo", "Duo", "Dao", "Li", "Qiu", "Ji", "Jiu", "Bi", "Xiu", "Ting", "Ci", "Sha", "Eburi", "Za", "Quan", "Qian", "Yu", "Gan", "Wu", "Cha", "Shan", "Xun", "Fan", "Wu", "Zi", "Li", "Xing", "Cai", "Cun", "Ren", "Shao", "Tuo", "Di", "Zhang", "Mang", "Chi", "Yi", "Gu", "Gong", "Du", "Yi", "Qi", "Shu", "Gang", "Tiao", "Moku", "Soma", "Tochi", "Lai", "Sugi", "Mang", "Yang", "Ma", "Miao", "Si", "Yuan", "Hang", "Fei", "Bei", "Jie", "Dong", "Gao", "Yao", "Xian", "Chu", "Qun", "Pa", "Shu", "Hua", "Xin", "Chou", "Zhu", "Chou", "Song", "Ban", "Song", "Ji", "Yue", "Jin", "Gou", "Ji", "Mao", "Pi", "Bi", "Wang", "Ang", "Fang", "Fen", "Yi", "Fu", "Nan", "Xi", "Hu", "Ya", "Dou", "Xun", "Zhen", "Yao", "Lin", "Rui", "E", "Mei", "Zhao", "Guo", "Zhi", "Cong", "Yun", "Waku", "Dou", "Shu", "Zao", null, "Li", "Haze", "Jian", "Cheng", "Matsu", "Qiang", "Feng", "Nan", "Xiao", "Xian", "Ku", "Ping", "Yi", "Xi", "Zhi", "Guai", "Xiao", "Jia", "Jia", "Gou", "Fu", "Mo", "Yi", "Ye", "Ye", "Shi", "Nie", "Bi", "Duo", "Yi", "Ling", "Bing", "Ni", "La", "He", "Pan", "Fan", "Zhong", "Dai", "Ci", "Yang", "Fu", "Bo", "Mou", "Gan", "Qi", "Ran", "Rou", "Mao", "Zhao", "Song", "Zhe", "Xia", "You", "Shen", "Ju", "Tuo", "Zuo", "Nan", "Ning", "Yong", "Di", "Zhi", "Zha", "Cha", "Dan", "Gu", "Pu", "Jiu", "Ao", "Fu", "Jian", "Bo", "Duo", "Ke", "Nai", "Zhu", "Bi", "Liu", "Chai", "Zha", "Si", "Zhu", "Pei", "Shi", "Guai", "Cha", "Yao", "Jue", "Jiu", "Shi"], io = ["Zhi", "Liu", "Mei", "Hoy", "Rong", "Zha", null, "Biao", "Zhan", "Jie", "Long", "Dong", "Lu", "Sayng", "Li", "Lan", "Yong", "Shu", "Xun", "Shuan", "Qi", "Zhen", "Qi", "Li", "Yi", "Xiang", "Zhen", "Li", "Su", "Gua", "Kan", "Bing", "Ren", "Xiao", "Bo", "Ren", "Bing", "Zi", "Chou", "Yi", "Jie", "Xu", "Zhu", "Jian", "Zui", "Er", "Er", "You", "Fa", "Gong", "Kao", "Lao", "Zhan", "Li", "Yin", "Yang", "He", "Gen", "Zhi", "Chi", "Ge", "Zai", "Luan", "Fu", "Jie", "Hang", "Gui", "Tao", "Guang", "Wei", "Kuang", "Ru", "An", "An", "Juan", "Yi", "Zhuo", "Ku", "Zhi", "Qiong", "Tong", "Sang", "Sang", "Huan", "Jie", "Jiu", "Xue", "Duo", "Zhui", "Yu", "Zan", "Kasei", "Ying", "Masu", null, "Zhan", "Ya", "Nao", "Zhen", "Dang", "Qi", "Qiao", "Hua", "Kuai", "Jiang", "Zhuang", "Xun", "Suo", "Sha", "Zhen", "Bei", "Ting", "Gua", "Jing", "Bo", "Ben", "Fu", "Rui", "Tong", "Jue", "Xi", "Lang", "Liu", "Feng", "Qi", "Wen", "Jun", "Gan", "Cu", "Liang", "Qiu", "Ting", "You", "Mei", "Bang", "Long", "Peng", "Zhuang", "Di", "Xuan", "Tu", "Zao", "Ao", "Gu", "Bi", "Di", "Han", "Zi", "Zhi", "Ren", "Bei", "Geng", "Jian", "Huan", "Wan", "Nuo", "Jia", "Tiao", "Ji", "Xiao", "Lu", "Huan", "Shao", "Cen", "Fen", "Song", "Meng", "Wu", "Li", "Li", "Dou", "Cen", "Ying", "Suo", "Ju", "Ti", "Jie", "Kun", "Zhuo", "Shu", "Chan", "Fan", "Wei", "Jing", "Li", "Bing", "Fumoto", "Shikimi", "Tao", "Zhi", "Lai", "Lian", "Jian", "Zhuo", "Ling", "Li", "Qi", "Bing", "Zhun", "Cong", "Qian", "Mian", "Qi", "Qi", "Cai", "Gun", "Chan", "Te", "Fei", "Pai", "Bang", "Pou", "Hun", "Zong", "Cheng", "Zao", "Ji", "Li", "Peng", "Yu", "Yu", "Gu", "Hun", "Dong", "Tang", "Gang", "Wang", "Di", "Xi", "Fan", "Cheng", "Zhan", "Qi", "Yuan", "Yan", "Yu", "Quan", "Yi", "Sen", "Ren", "Chui", "Leng", "Qi", "Zhuo", "Fu", "Ke", "Lai", "Zou", "Zou", "Zhuo", "Guan", "Fen", "Fen", "Chen", "Qiong", "Nie"], ao = ["Wan", "Guo", "Lu", "Hao", "Jie", "Yi", "Chou", "Ju", "Ju", "Cheng", "Zuo", "Liang", "Qiang", "Zhi", "Zhui", "Ya", "Ju", "Bei", "Jiao", "Zhuo", "Zi", "Bin", "Peng", "Ding", "Chu", "Chang", "Kunugi", "Momiji", "Jian", "Gui", "Xi", "Du", "Qian", "Kunugi", "Soko", "Shide", "Luo", "Zhi", "Ken", "Myeng", "Tafu", null, "Peng", "Zhan", null, "Tuo", "Sen", "Duo", "Ye", "Fou", "Wei", "Wei", "Duan", "Jia", "Zong", "Jian", "Yi", "Shen", "Xi", "Yan", "Yan", "Chuan", "Zhan", "Chun", "Yu", "He", "Zha", "Wo", "Pian", "Bi", "Yao", "Huo", "Xu", "Ruo", "Yang", "La", "Yan", "Ben", "Hun", "Kui", "Jie", "Kui", "Si", "Feng", "Xie", "Tuo", "Zhi", "Jian", "Mu", "Mao", "Chu", "Hu", "Hu", "Lian", "Leng", "Ting", "Nan", "Yu", "You", "Mei", "Song", "Xuan", "Xuan", "Ying", "Zhen", "Pian", "Ye", "Ji", "Jie", "Ye", "Chu", "Shun", "Yu", "Cou", "Wei", "Mei", "Di", "Ji", "Jie", "Kai", "Qiu", "Ying", "Rou", "Heng", "Lou", "Le", "Hazou", "Katsura", "Pin", "Muro", "Gai", "Tan", "Lan", "Yun", "Yu", "Chen", "Lu", "Ju", "Sakaki", null, "Pi", "Xie", "Jia", "Yi", "Zhan", "Fu", "Nai", "Mi", "Lang", "Rong", "Gu", "Jian", "Ju", "Ta", "Yao", "Zhen", "Bang", "Sha", "Yuan", "Zi", "Ming", "Su", "Jia", "Yao", "Jie", "Huang", "Gan", "Fei", "Zha", "Qian", "Ma", "Sun", "Yuan", "Xie", "Rong", "Shi", "Zhi", "Cui", "Yun", "Ting", "Liu", "Rong", "Tang", "Que", "Zhai", "Si", "Sheng", "Ta", "Ke", "Xi", "Gu", "Qi", "Kao", "Gao", "Sun", "Pan", "Tao", "Ge", "Xun", "Dian", "Nou", "Ji", "Shuo", "Gou", "Chui", "Qiang", "Cha", "Qian", "Huai", "Mei", "Xu", "Gang", "Gao", "Zhuo", "Tuo", "Hashi", "Yang", "Dian", "Jia", "Jian", "Zui", "Kashi", "Ori", "Bin", "Zhu", null, "Xi", "Qi", "Lian", "Hui", "Yong", "Qian", "Guo", "Gai", "Gai", "Tuan", "Hua", "Cu", "Sen", "Cui", "Beng", "You", "Hu", "Jiang", "Hu", "Huan", "Kui", "Yi", "Nie", "Gao", "Kang", "Gui", "Gui", "Cao", "Man", "Jin"], uo = ["Di", "Zhuang", "Le", "Lang", "Chen", "Cong", "Li", "Xiu", "Qing", "Shuang", "Fan", "Tong", "Guan", "Ji", "Suo", "Lei", "Lu", "Liang", "Mi", "Lou", "Chao", "Su", "Ke", "Shu", "Tang", "Biao", "Lu", "Jiu", "Shu", "Zha", "Shu", "Zhang", "Men", "Mo", "Niao", "Yang", "Tiao", "Peng", "Zhu", "Sha", "Xi", "Quan", "Heng", "Jian", "Cong", null, "Hokuso", "Qiang", "Tara", "Ying", "Er", "Xin", "Zhi", "Qiao", "Zui", "Cong", "Pu", "Shu", "Hua", "Kui", "Zhen", "Zun", "Yue", "Zhan", "Xi", "Xun", "Dian", "Fa", "Gan", "Mo", "Wu", "Qiao", "Nao", "Lin", "Liu", "Qiao", "Xian", "Run", "Fan", "Zhan", "Tuo", "Lao", "Yun", "Shun", "Tui", "Cheng", "Tang", "Meng", "Ju", "Cheng", "Su", "Jue", "Jue", "Tan", "Hui", "Ji", "Nuo", "Xiang", "Tuo", "Ning", "Rui", "Zhu", "Chuang", "Zeng", "Fen", "Qiong", "Ran", "Heng", "Cen", "Gu", "Liu", "Lao", "Gao", "Chu", "Zusa", "Nude", "Ca", "San", "Ji", "Dou", "Shou", "Lu", null, null, "Yuan", "Ta", "Shu", "Jiang", "Tan", "Lin", "Nong", "Yin", "Xi", "Sui", "Shan", "Zui", "Xuan", "Cheng", "Gan", "Ju", "Zui", "Yi", "Qin", "Pu", "Yan", "Lei", "Feng", "Hui", "Dang", "Ji", "Sui", "Bo", "Bi", "Ding", "Chu", "Zhua", "Kuai", "Ji", "Jie", "Jia", "Qing", "Zhe", "Jian", "Qiang", "Dao", "Yi", "Biao", "Song", "She", "Lin", "Kunugi", "Cha", "Meng", "Yin", "Tao", "Tai", "Mian", "Qi", "Toan", "Bin", "Huo", "Ji", "Qian", "Mi", "Ning", "Yi", "Gao", "Jian", "Yin", "Er", "Qing", "Yan", "Qi", "Mi", "Zhao", "Gui", "Chun", "Ji", "Kui", "Po", "Deng", "Chu", null, "Mian", "You", "Zhi", "Guang", "Qian", "Lei", "Lei", "Sa", "Lu", "Li", "Cuan", "Lu", "Mie", "Hui", "Ou", "Lu", "Jie", "Gao", "Du", "Yuan", "Li", "Fei", "Zhuo", "Sou", "Lian", "Tamo", "Chu", null, "Zhu", "Lu", "Yan", "Li", "Zhu", "Chen", "Jie", "E", "Su", "Huai", "Nie", "Yu", "Long", "Lai", null, "Xian", "Kwi", "Ju", "Xiao", "Ling", "Ying", "Jian", "Yin", "You", "Ying"], eo = ["Xiang", "Nong", "Bo", "Chan", "Lan", "Ju", "Shuang", "She", "Wei", "Cong", "Quan", "Qu", "Cang", null, "Yu", "Luo", "Li", "Zan", "Luan", "Dang", "Jue", "Em", "Lan", "Lan", "Zhu", "Lei", "Li", "Ba", "Nang", "Yu", "Ling", "Tsuki", "Qian", "Ci", "Huan", "Xin", "Yu", "Yu", "Qian", "Ou", "Xu", "Chao", "Chu", "Chi", "Kai", "Yi", "Jue", "Xi", "Xu", "Xia", "Yu", "Kuai", "Lang", "Kuan", "Shuo", "Xi", "Ai", "Yi", "Qi", "Hu", "Chi", "Qin", "Kuan", "Kan", "Kuan", "Kan", "Chuan", "Sha", "Gua", "Yin", "Xin", "Xie", "Yu", "Qian", "Xiao", "Yi", "Ge", "Wu", "Tan", "Jin", "Ou", "Hu", "Ti", "Huan", "Xu", "Pen", "Xi", "Xiao", "Xu", "Xi", "Sen", "Lian", "Chu", "Yi", "Kan", "Yu", "Chuo", "Huan", "Zhi", "Zheng", "Ci", "Bu", "Wu", "Qi", "Bu", "Bu", "Wai", "Ju", "Qian", "Chi", "Se", "Chi", "Se", "Zhong", "Sui", "Sui", "Li", "Cuo", "Yu", "Li", "Gui", "Dai", "Dai", "Si", "Jian", "Zhe", "Mo", "Mo", "Yao", "Mo", "Cu", "Yang", "Tian", "Sheng", "Dai", "Shang", "Xu", "Xun", "Shu", "Can", "Jue", "Piao", "Qia", "Qiu", "Su", "Qing", "Yun", "Lian", "Yi", "Fou", "Zhi", "Ye", "Can", "Hun", "Dan", "Ji", "Ye", "Zhen", "Yun", "Wen", "Chou", "Bin", "Ti", "Jin", "Shang", "Yin", "Diao", "Cu", "Hui", "Cuan", "Yi", "Dan", "Du", "Jiang", "Lian", "Bin", "Du", "Tsukusu", "Jian", "Shu", "Ou", "Duan", "Zhu", "Yin", "Qing", "Yi", "Sha", "Que", "Ke", "Yao", "Jun", "Dian", "Hui", "Hui", "Gu", "Que", "Ji", "Yi", "Ou", "Hui", "Duan", "Yi", "Xiao", "Wu", "Guan", "Mu", "Mei", "Mei", "Ai", "Zuo", "Du", "Yu", "Bi", "Bi", "Bi", "Pi", "Pi", "Bi", "Chan", "Mao", null, null, "Pu", "Mushiru", "Jia", "Zhan", "Sai", "Mu", "Tuo", "Xun", "Er", "Rong", "Xian", "Ju", "Mu", "Hao", "Qiu", "Dou", "Mushiru", "Tan", "Pei", "Ju", "Duo", "Cui", "Bi", "San", null, "Mao", "Sui", "Yu", "Yu", "Tuo", "He", "Jian", "Ta", "San"], oo = ["Lu", "Mu", "Li", "Tong", "Rong", "Chang", "Pu", "Luo", "Zhan", "Sao", "Zhan", "Meng", "Luo", "Qu", "Die", "Shi", "Di", "Min", "Jue", "Mang", "Qi", "Pie", "Nai", "Qi", "Dao", "Xian", "Chuan", "Fen", "Ri", "Nei", null, "Fu", "Shen", "Dong", "Qing", "Qi", "Yin", "Xi", "Hai", "Yang", "An", "Ya", "Ke", "Qing", "Ya", "Dong", "Dan", "Lu", "Qing", "Yang", "Yun", "Yun", "Shui", "San", "Zheng", "Bing", "Yong", "Dang", "Shitamizu", "Le", "Ni", "Tun", "Fan", "Gui", "Ting", "Zhi", "Qiu", "Bin", "Ze", "Mian", "Cuan", "Hui", "Diao", "Han", "Cha", "Zhuo", "Chuan", "Wan", "Fan", "Dai", "Xi", "Tuo", "Mang", "Qiu", "Qi", "Shan", "Pai", "Han", "Qian", "Wu", "Wu", "Xun", "Si", "Ru", "Gong", "Jiang", "Chi", "Wu", "Tsuchi", null, "Tang", "Zhi", "Chi", "Qian", "Mi", "Yu", "Wang", "Qing", "Jing", "Rui", "Jun", "Hong", "Tai", "Quan", "Ji", "Bian", "Bian", "Gan", "Wen", "Zhong", "Fang", "Xiong", "Jue", "Hang", "Niou", "Qi", "Fen", "Xu", "Xu", "Qin", "Yi", "Wo", "Yun", "Yuan", "Hang", "Yan", "Shen", "Chen", "Dan", "You", "Dun", "Hu", "Huo", "Qie", "Mu", "Rou", "Mei", "Ta", "Mian", "Wu", "Chong", "Tian", "Bi", "Sha", "Zhi", "Pei", "Pan", "Zhui", "Za", "Gou", "Liu", "Mei", "Ze", "Feng", "Ou", "Li", "Lun", "Cang", "Feng", "Wei", "Hu", "Mo", "Mei", "Shu", "Ju", "Zan", "Tuo", "Tuo", "Tuo", "He", "Li", "Mi", "Yi", "Fa", "Fei", "You", "Tian", "Zhi", "Zhao", "Gu", "Zhan", "Yan", "Si", "Kuang", "Jiong", "Ju", "Xie", "Qiu", "Yi", "Jia", "Zhong", "Quan", "Bo", "Hui", "Mi", "Ben", "Zhuo", "Chu", "Le", "You", "Gu", "Hong", "Gan", "Fa", "Mao", "Si", "Hu", "Ping", "Ci", "Fan", "Chi", "Su", "Ning", "Cheng", "Ling", "Pao", "Bo", "Qi", "Si", "Ni", "Ju", "Yue", "Zhu", "Sheng", "Lei", "Xuan", "Xue", "Fu", "Pan", "Min", "Tai", "Yang", "Ji", "Yong", "Guan", "Beng", "Xue", "Long", "Lu", null, "Bo", "Xie", "Po", "Ze", "Jing", "Yin"], lo = ["Zhou", "Ji", "Yi", "Hui", "Hui", "Zui", "Cheng", "Yin", "Wei", "Hou", "Jian", "Yang", "Lie", "Si", "Ji", "Er", "Xing", "Fu", "Sa", "Suo", "Zhi", "Yin", "Wu", "Xi", "Kao", "Zhu", "Jiang", "Luo", null, "An", "Dong", "Yi", "Mou", "Lei", "Yi", "Mi", "Quan", "Jin", "Mo", "Wei", "Xiao", "Xie", "Hong", "Xu", "Shuo", "Kuang", "Tao", "Qie", "Ju", "Er", "Zhou", "Ru", "Ping", "Xun", "Xiong", "Zhi", "Guang", "Huan", "Ming", "Huo", "Wa", "Qia", "Pai", "Wu", "Qu", "Liu", "Yi", "Jia", "Jing", "Qian", "Jiang", "Jiao", "Cheng", "Shi", "Zhuo", "Ce", "Pal", "Kuai", "Ji", "Liu", "Chan", "Hun", "Hu", "Nong", "Xun", "Jin", "Lie", "Qiu", "Wei", "Zhe", "Jun", "Han", "Bang", "Mang", "Zhuo", "You", "Xi", "Bo", "Dou", "Wan", "Hong", "Yi", "Pu", "Ying", "Lan", "Hao", "Lang", "Han", "Li", "Geng", "Fu", "Wu", "Lian", "Chun", "Feng", "Yi", "Yu", "Tong", "Lao", "Hai", "Jin", "Jia", "Chong", "Weng", "Mei", "Sui", "Cheng", "Pei", "Xian", "Shen", "Tu", "Kun", "Pin", "Nie", "Han", "Jing", "Xiao", "She", "Nian", "Tu", "Yong", "Xiao", "Xian", "Ting", "E", "Su", "Tun", "Juan", "Cen", "Ti", "Li", "Shui", "Si", "Lei", "Shui", "Tao", "Du", "Lao", "Lai", "Lian", "Wei", "Wo", "Yun", "Huan", "Di", null, "Run", "Jian", "Zhang", "Se", "Fu", "Guan", "Xing", "Shou", "Shuan", "Ya", "Chuo", "Zhang", "Ye", "Kong", "Wo", "Han", "Tuo", "Dong", "He", "Wo", "Ju", "Gan", "Liang", "Hun", "Ta", "Zhuo", "Dian", "Qie", "De", "Juan", "Zi", "Xi", "Yao", "Qi", "Gu", "Guo", "Han", "Lin", "Tang", "Zhou", "Peng", "Hao", "Chang", "Shu", "Qi", "Fang", "Chi", "Lu", "Nao", "Ju", "Tao", "Cong", "Lei", "Zhi", "Peng", "Fei", "Song", "Tian", "Pi", "Dan", "Yu", "Ni", "Yu", "Lu", "Gan", "Mi", "Jing", "Ling", "Lun", "Yin", "Cui", "Qu", "Huai", "Yu", "Nian", "Shen", "Piao", "Chun", "Wa", "Yuan", "Lai", "Hun", "Qing", "Yan", "Qian", "Tian", "Miao", "Zhi", "Yin", "Mi"], to = ["Ben", "Yuan", "Wen", "Re", "Fei", "Qing", "Yuan", "Ke", "Ji", "She", "Yuan", "Shibui", "Lu", "Zi", "Du", null, "Jian", "Min", "Pi", "Tani", "Yu", "Yuan", "Shen", "Shen", "Rou", "Huan", "Zhu", "Jian", "Nuan", "Yu", "Qiu", "Ting", "Qu", "Du", "Feng", "Zha", "Bo", "Wo", "Wo", "Di", "Wei", "Wen", "Ru", "Xie", "Ce", "Wei", "Ge", "Gang", "Yan", "Hong", "Xuan", "Mi", "Ke", "Mao", "Ying", "Yan", "You", "Hong", "Miao", "Xing", "Mei", "Zai", "Hun", "Nai", "Kui", "Shi", "E", "Pai", "Mei", "Lian", "Qi", "Qi", "Mei", "Tian", "Cou", "Wei", "Can", "Tuan", "Mian", "Hui", "Mo", "Xu", "Ji", "Pen", "Jian", "Jian", "Hu", "Feng", "Xiang", "Yi", "Yin", "Zhan", "Shi", "Jie", "Cheng", "Huang", "Tan", "Yu", "Bi", "Min", "Shi", "Tu", "Sheng", "Yong", "Qu", "Zhong", "Suei", "Jiu", "Jiao", "Qiou", "Yin", "Tang", "Long", "Huo", "Yuan", "Nan", "Ban", "You", "Quan", "Chui", "Liang", "Chan", "Yan", "Chun", "Nie", "Zi", "Wan", "Shi", "Man", "Ying", "Ratsu", "Kui", null, "Jian", "Xu", "Lu", "Gui", "Gai", null, null, "Po", "Jin", "Gui", "Tang", "Yuan", "Suo", "Yuan", "Lian", "Yao", "Meng", "Zhun", "Sheng", "Ke", "Tai", "Da", "Wa", "Liu", "Gou", "Sao", "Ming", "Zha", "Shi", "Yi", "Lun", "Ma", "Pu", "Wei", "Li", "Cai", "Wu", "Xi", "Wen", "Qiang", "Ze", "Shi", "Su", "Yi", "Zhen", "Sou", "Yun", "Xiu", "Yin", "Rong", "Hun", "Su", "Su", "Ni", "Ta", "Shi", "Ru", "Wei", "Pan", "Chu", "Chu", "Pang", "Weng", "Cang", "Mie", "He", "Dian", "Hao", "Huang", "Xi", "Zi", "Di", "Zhi", "Ying", "Fu", "Jie", "Hua", "Ge", "Zi", "Tao", "Teng", "Sui", "Bi", "Jiao", "Hui", "Gun", "Yin", "Gao", "Long", "Zhi", "Yan", "She", "Man", "Ying", "Chun", "Lu", "Lan", "Luan", null, "Bin", "Tan", "Yu", "Sou", "Hu", "Bi", "Biao", "Zhi", "Jiang", "Kou", "Shen", "Shang", "Di", "Mi", "Ao", "Lu", "Hu", "Hu", "You", "Chan", "Fan", "Yong", "Gun", "Man"], ho = ["Qing", "Yu", "Piao", "Ji", "Ya", "Jiao", "Qi", "Xi", "Ji", "Lu", "Lu", "Long", "Jin", "Guo", "Cong", "Lou", "Zhi", "Gai", "Qiang", "Li", "Yan", "Cao", "Jiao", "Cong", "Qun", "Tuan", "Ou", "Teng", "Ye", "Xi", "Mi", "Tang", "Mo", "Shang", "Han", "Lian", "Lan", "Wa", "Li", "Qian", "Feng", "Xuan", "Yi", "Man", "Zi", "Mang", "Kang", "Lei", "Peng", "Shu", "Zhang", "Zhang", "Chong", "Xu", "Huan", "Kuo", "Jian", "Yan", "Chuang", "Liao", "Cui", "Ti", "Yang", "Jiang", "Cong", "Ying", "Hong", "Xun", "Shu", "Guan", "Ying", "Xiao", null, null, "Xu", "Lian", "Zhi", "Wei", "Pi", "Jue", "Jiao", "Po", "Dang", "Hui", "Jie", "Wu", "Pa", "Ji", "Pan", "Gui", "Xiao", "Qian", "Qian", "Xi", "Lu", "Xi", "Xuan", "Dun", "Huang", "Min", "Run", "Su", "Liao", "Zhen", "Zhong", "Yi", "Di", "Wan", "Dan", "Tan", "Chao", "Xun", "Kui", "Yie", "Shao", "Tu", "Zhu", "San", "Hei", "Bi", "Shan", "Chan", "Chan", "Shu", "Tong", "Pu", "Lin", "Wei", "Se", "Se", "Cheng", "Jiong", "Cheng", "Hua", "Jiao", "Lao", "Che", "Gan", "Cun", "Heng", "Si", "Shu", "Peng", "Han", "Yun", "Liu", "Hong", "Fu", "Hao", "He", "Xian", "Jian", "Shan", "Xi", "Oki", null, "Lan", null, "Yu", "Lin", "Min", "Zao", "Dang", "Wan", "Ze", "Xie", "Yu", "Li", "Shi", "Xue", "Ling", "Man", "Zi", "Yong", "Kuai", "Can", "Lian", "Dian", "Ye", "Ao", "Huan", "Zhen", "Chan", "Man", "Dan", "Dan", "Yi", "Sui", "Pi", "Ju", "Ta", "Qin", "Ji", "Zhuo", "Lian", "Nong", "Guo", "Jin", "Fen", "Se", "Ji", "Sui", "Hui", "Chu", "Ta", "Song", "Ding", null, "Zhu", "Lai", "Bin", "Lian", "Mi", "Shi", "Shu", "Mi", "Ning", "Ying", "Ying", "Meng", "Jin", "Qi", "Pi", "Ji", "Hao", "Ru", "Zui", "Wo", "Tao", "Yin", "Yin", "Dui", "Ci", "Huo", "Jing", "Lan", "Jun", "Ai", "Pu", "Zhuo", "Wei", "Bin", "Gu", "Qian", "Xing", "Hama", "Kuo", "Fei", null, "Boku", "Jian", "Wei", "Luo", "Zan", "Lu", "Li"], go = ["You", "Yang", "Lu", "Si", "Jie", "Ying", "Du", "Wang", "Hui", "Xie", "Pan", "Shen", "Biao", "Chan", "Mo", "Liu", "Jian", "Pu", "Se", "Cheng", "Gu", "Bin", "Huo", "Xian", "Lu", "Qin", "Han", "Ying", "Yong", "Li", "Jing", "Xiao", "Ying", "Sui", "Wei", "Xie", "Huai", "Hao", "Zhu", "Long", "Lai", "Dui", "Fan", "Hu", "Lai", null, null, "Ying", "Mi", "Ji", "Lian", "Jian", "Ying", "Fen", "Lin", "Yi", "Jian", "Yue", "Chan", "Dai", "Rang", "Jian", "Lan", "Fan", "Shuang", "Yuan", "Zhuo", "Feng", "She", "Lei", "Lan", "Cong", "Qu", "Yong", "Qian", "Fa", "Guan", "Que", "Yan", "Hao", "Hyeng", "Sa", "Zan", "Luan", "Yan", "Li", "Mi", "Shan", "Tan", "Dang", "Jiao", "Chan", null, "Hao", "Ba", "Zhu", "Lan", "Lan", "Nang", "Wan", "Luan", "Xun", "Xian", "Yan", "Gan", "Yan", "Yu", "Huo", "Si", "Mie", "Guang", "Deng", "Hui", "Xiao", "Xiao", "Hu", "Hong", "Ling", "Zao", "Zhuan", "Jiu", "Zha", "Xie", "Chi", "Zhuo", "Zai", "Zai", "Can", "Yang", "Qi", "Zhong", "Fen", "Niu", "Jiong", "Wen", "Po", "Yi", "Lu", "Chui", "Pi", "Kai", "Pan", "Yan", "Kai", "Pang", "Mu", "Chao", "Liao", "Gui", "Kang", "Tun", "Guang", "Xin", "Zhi", "Guang", "Guang", "Wei", "Qiang", null, "Da", "Xia", "Zheng", "Zhu", "Ke", "Zhao", "Fu", "Ba", "Duo", "Duo", "Ling", "Zhuo", "Xuan", "Ju", "Tan", "Pao", "Jiong", "Pao", "Tai", "Tai", "Bing", "Yang", "Tong", "Han", "Zhu", "Zha", "Dian", "Wei", "Shi", "Lian", "Chi", "Huang", null, "Hu", "Shuo", "Lan", "Jing", "Jiao", "Xu", "Xing", "Quan", "Lie", "Huan", "Yang", "Xiao", "Xiu", "Xian", "Yin", "Wu", "Zhou", "Yao", "Shi", "Wei", "Tong", "Xue", "Zai", "Kai", "Hong", "Luo", "Xia", "Zhu", "Xuan", "Zheng", "Po", "Yan", "Hui", "Guang", "Zhe", "Hui", "Kao", null, "Fan", "Shao", "Ye", "Hui", null, "Tang", "Jin", "Re", null, "Xi", "Fu", "Jiong", "Che", "Pu", "Jing", "Zhuo", "Ting", "Wan", "Hai", "Peng", "Lang", "Shan", "Hu", "Feng", "Chi", "Rong"], ro = ["Hu", "Xi", "Shu", "He", "Xun", "Ku", "Jue", "Xiao", "Xi", "Yan", "Han", "Zhuang", "Jun", "Di", "Xie", "Ji", "Wu", null, null, "Han", "Yan", "Huan", "Men", "Ju", "Chou", "Bei", "Fen", "Lin", "Kun", "Hun", "Tun", "Xi", "Cui", "Wu", "Hong", "Ju", "Fu", "Wo", "Jiao", "Cong", "Feng", "Ping", "Qiong", "Ruo", "Xi", "Qiong", "Xin", "Zhuo", "Yan", "Yan", "Yi", "Jue", "Yu", "Gang", "Ran", "Pi", "Gu", null, "Sheng", "Chang", "Shao", null, null, null, null, "Chen", "He", "Kui", "Zhong", "Duan", "Xia", "Hui", "Feng", "Lian", "Xuan", "Xing", "Huang", "Jiao", "Jian", "Bi", "Ying", "Zhu", "Wei", "Tuan", "Tian", "Xi", "Nuan", "Nuan", "Chan", "Yan", "Jiong", "Jiong", "Yu", "Mei", "Sha", "Wei", "Ye", "Xin", "Qiong", "Rou", "Mei", "Huan", "Xu", "Zhao", "Wei", "Fan", "Qiu", "Sui", "Yang", "Lie", "Zhu", "Jie", "Gao", "Gua", "Bao", "Hu", "Yun", "Xia", null, null, "Bian", "Gou", "Tui", "Tang", "Chao", "Shan", "N", "Bo", "Huang", "Xie", "Xi", "Wu", "Xi", "Yun", "He", "He", "Xi", "Yun", "Xiong", "Nai", "Shan", "Qiong", "Yao", "Xun", "Mi", "Lian", "Ying", "Wen", "Rong", "Oozutsu", null, "Qiang", "Liu", "Xi", "Bi", "Biao", "Zong", "Lu", "Jian", "Shou", "Yi", "Lou", "Feng", "Sui", "Yi", "Tong", "Jue", "Zong", "Yun", "Hu", "Yi", "Zhi", "Ao", "Wei", "Liao", "Han", "Ou", "Re", "Jiong", "Man", null, "Shang", "Cuan", "Zeng", "Jian", "Xi", "Xi", "Xi", "Yi", "Xiao", "Chi", "Huang", "Chan", "Ye", "Qian", "Ran", "Yan", "Xian", "Qiao", "Zun", "Deng", "Dun", "Shen", "Jiao", "Fen", "Si", "Liao", "Yu", "Lin", "Tong", "Shao", "Fen", "Fan", "Yan", "Xun", "Lan", "Mei", "Tang", "Yi", "Jing", "Men", null, null, "Ying", "Yu", "Yi", "Xue", "Lan", "Tai", "Zao", "Can", "Sui", "Xi", "Que", "Cong", "Lian", "Hui", "Zhu", "Xie", "Ling", "Wei", "Yi", "Xie", "Zhao", "Hui", "Tatsu", "Nung", "Lan", "Ru", "Xian", "Kao", "Xun", "Jin", "Chou", "Chou", "Yao"], so = ["He", "Lan", "Biao", "Rong", "Li", "Mo", "Bao", "Ruo", "Lu", "La", "Ao", "Xun", "Kuang", "Shuo", null, "Li", "Lu", "Jue", "Liao", "Yan", "Xi", "Xie", "Long", "Ye", null, "Rang", "Yue", "Lan", "Cong", "Jue", "Tong", "Guan", null, "Che", "Mi", "Tang", "Lan", "Zhu", null, "Ling", "Cuan", "Yu", "Zhua", "Tsumekanmuri", "Pa", "Zheng", "Pao", "Cheng", "Yuan", "Ai", "Wei", null, "Jue", "Jue", "Fu", "Ye", "Ba", "Die", "Ye", "Yao", "Zu", "Shuang", "Er", "Qiang", "Chuang", "Ge", "Zang", "Die", "Qiang", "Yong", "Qiang", "Pian", "Ban", "Pan", "Shao", "Jian", "Pai", "Du", "Chuang", "Tou", "Zha", "Bian", "Die", "Bang", "Bo", "Chuang", "You", null, "Du", "Ya", "Cheng", "Niu", "Ushihen", "Pin", "Jiu", "Mou", "Tuo", "Mu", "Lao", "Ren", "Mang", "Fang", "Mao", "Mu", "Gang", "Wu", "Yan", "Ge", "Bei", "Si", "Jian", "Gu", "You", "Ge", "Sheng", "Mu", "Di", "Qian", "Quan", "Quan", "Zi", "Te", "Xi", "Mang", "Keng", "Qian", "Wu", "Gu", "Xi", "Li", "Li", "Pou", "Ji", "Gang", "Zhi", "Ben", "Quan", "Run", "Du", "Ju", "Jia", "Jian", "Feng", "Pian", "Ke", "Ju", "Kao", "Chu", "Xi", "Bei", "Luo", "Jie", "Ma", "San", "Wei", "Li", "Dun", "Tong", null, "Jiang", "Ikenie", "Li", "Du", "Lie", "Pi", "Piao", "Bao", "Xi", "Chou", "Wei", "Kui", "Chou", "Quan", "Fan", "Ba", "Fan", "Qiu", "Ji", "Cai", "Chuo", "An", "Jie", "Zhuang", "Guang", "Ma", "You", "Kang", "Bo", "Hou", "Ya", "Yin", "Huan", "Zhuang", "Yun", "Kuang", "Niu", "Di", "Qing", "Zhong", "Mu", "Bei", "Pi", "Ju", "Ni", "Sheng", "Pao", "Xia", "Tuo", "Hu", "Ling", "Fei", "Pi", "Ni", "Ao", "You", "Gou", "Yue", "Ju", "Dan", "Po", "Gu", "Xian", "Ning", "Huan", "Hen", "Jiao", "He", "Zhao", "Ji", "Xun", "Shan", "Ta", "Rong", "Shou", "Tong", "Lao", "Du", "Xia", "Shi", "Hua", "Zheng", "Yu", "Sun", "Yu", "Bi", "Mang", "Xi", "Juan", "Li", "Xia", "Yin", "Suan", "Lang", "Bei", "Zhi", "Yan"], co = ["Sha", "Li", "Han", "Xian", "Jing", "Pai", "Fei", "Yao", "Ba", "Qi", "Ni", "Biao", "Yin", "Lai", "Xi", "Jian", "Qiang", "Kun", "Yan", "Guo", "Zong", "Mi", "Chang", "Yi", "Zhi", "Zheng", "Ya", "Meng", "Cai", "Cu", "She", "Kari", "Cen", "Luo", "Hu", "Zong", "Ji", "Wei", "Feng", "Wo", "Yuan", "Xing", "Zhu", "Mao", "Wei", "Yuan", "Xian", "Tuan", "Ya", "Nao", "Xie", "Jia", "Hou", "Bian", "You", "You", "Mei", "Zha", "Yao", "Sun", "Bo", "Ming", "Hua", "Yuan", "Sou", "Ma", "Yuan", "Dai", "Yu", "Shi", "Hao", null, "Yi", "Zhen", "Chuang", "Hao", "Man", "Jing", "Jiang", "Mu", "Zhang", "Chan", "Ao", "Ao", "Hao", "Cui", "Fen", "Jue", "Bi", "Bi", "Huang", "Pu", "Lin", "Yu", "Tong", "Yao", "Liao", "Shuo", "Xiao", "Swu", "Ton", "Xi", "Ge", "Juan", "Du", "Hui", "Kuai", "Xian", "Xie", "Ta", "Xian", "Xun", "Ning", "Pin", "Huo", "Nou", "Meng", "Lie", "Nao", "Guang", "Shou", "Lu", "Ta", "Xian", "Mi", "Rang", "Huan", "Nao", "Luo", "Xian", "Qi", "Jue", "Xuan", "Miao", "Zi", "Lu", "Lu", "Yu", "Su", "Wang", "Qiu", "Ga", "Ding", "Le", "Ba", "Ji", "Hong", "Di", "Quan", "Gan", "Jiu", "Yu", "Ji", "Yu", "Yang", "Ma", "Gong", "Wu", "Fu", "Wen", "Jie", "Ya", "Fen", "Bian", "Beng", "Yue", "Jue", "Yun", "Jue", "Wan", "Jian", "Mei", "Dan", "Pi", "Wei", "Huan", "Xian", "Qiang", "Ling", "Dai", "Yi", "An", "Ping", "Dian", "Fu", "Xuan", "Xi", "Bo", "Ci", "Gou", "Jia", "Shao", "Po", "Ci", "Ke", "Ran", "Sheng", "Shen", "Yi", "Zu", "Jia", "Min", "Shan", "Liu", "Bi", "Zhen", "Zhen", "Jue", "Fa", "Long", "Jin", "Jiao", "Jian", "Li", "Guang", "Xian", "Zhou", "Gong", "Yan", "Xiu", "Yang", "Xu", "Luo", "Su", "Zhu", "Qin", "Ken", "Xun", "Bao", "Er", "Xiang", "Yao", "Xia", "Heng", "Gui", "Chong", "Xu", "Ban", "Pei", null, "Dang", "Ei", "Hun", "Wen", "E", "Cheng", "Ti", "Wu", "Wu", "Cheng", "Jun", "Mei", "Bei", "Ting", "Xian", "Chuo"], Yo = ["Han", "Xuan", "Yan", "Qiu", "Quan", "Lang", "Li", "Xiu", "Fu", "Liu", "Ye", "Xi", "Ling", "Li", "Jin", "Lian", "Suo", "Chiisai", null, "Wan", "Dian", "Pin", "Zhan", "Cui", "Min", "Yu", "Ju", "Chen", "Lai", "Wen", "Sheng", "Wei", "Dian", "Chu", "Zhuo", "Pei", "Cheng", "Hu", "Qi", "E", "Kun", "Chang", "Qi", "Beng", "Wan", "Lu", "Cong", "Guan", "Yan", "Diao", "Bei", "Lin", "Qin", "Pi", "Pa", "Que", "Zhuo", "Qin", "Fa", null, "Qiong", "Du", "Jie", "Hun", "Yu", "Mao", "Mei", "Chun", "Xuan", "Ti", "Xing", "Dai", "Rou", "Min", "Zhen", "Wei", "Ruan", "Huan", "Jie", "Chuan", "Jian", "Zhuan", "Yang", "Lian", "Quan", "Xia", "Duan", "Yuan", "Ye", "Nao", "Hu", "Ying", "Yu", "Huang", "Rui", "Se", "Liu", "Shi", "Rong", "Suo", "Yao", "Wen", "Wu", "Jin", "Jin", "Ying", "Ma", "Tao", "Liu", "Tang", "Li", "Lang", "Gui", "Zhen", "Qiang", "Cuo", "Jue", "Zhao", "Yao", "Ai", "Bin", "Tu", "Chang", "Kun", "Zhuan", "Cong", "Jin", "Yi", "Cui", "Cong", "Qi", "Li", "Ying", "Suo", "Qiu", "Xuan", "Ao", "Lian", "Man", "Zhang", "Yin", null, "Ying", "Zhi", "Lu", "Wu", "Deng", "Xiou", "Zeng", "Xun", "Qu", "Dang", "Lin", "Liao", "Qiong", "Su", "Huang", "Gui", "Pu", "Jing", "Fan", "Jin", "Liu", "Ji", null, "Jing", "Ai", "Bi", "Can", "Qu", "Zao", "Dang", "Jiao", "Gun", "Tan", "Hui", "Huan", "Se", "Sui", "Tian", null, "Yu", "Jin", "Lu", "Bin", "Shou", "Wen", "Zui", "Lan", "Xi", "Ji", "Xuan", "Ruan", "Huo", "Gai", "Lei", "Du", "Li", "Zhi", "Rou", "Li", "Zan", "Qiong", "Zhe", "Gui", "Sui", "La", "Long", "Lu", "Li", "Zan", "Lan", "Ying", "Mi", "Xiang", "Xi", "Guan", "Dao", "Zan", "Huan", "Gua", "Bo", "Die", "Bao", "Hu", "Zhi", "Piao", "Ban", "Rang", "Li", "Wa", "Dekaguramu", "Jiang", "Qian", "Fan", "Pen", "Fang", "Dan", "Weng", "Ou", "Deshiguramu", "Miriguramu", "Thon", "Hu", "Ling", "Yi", "Ping", "Ci", "Hekutogura", "Juan", "Chang", "Chi", "Sarake", "Dang", "Meng", "Pou"], Lo = ["Zhui", "Ping", "Bian", "Zhou", "Zhen", "Senchigura", "Ci", "Ying", "Qi", "Xian", "Lou", "Di", "Ou", "Meng", "Zhuan", "Peng", "Lin", "Zeng", "Wu", "Pi", "Dan", "Weng", "Ying", "Yan", "Gan", "Dai", "Shen", "Tian", "Tian", "Han", "Chang", "Sheng", "Qing", "Sheng", "Chan", "Chan", "Rui", "Sheng", "Su", "Sen", "Yong", "Shuai", "Lu", "Fu", "Yong", "Beng", "Feng", "Ning", "Tian", "You", "Jia", "Shen", "Zha", "Dian", "Fu", "Nan", "Dian", "Ping", "Ting", "Hua", "Ting", "Quan", "Zi", "Meng", "Bi", "Qi", "Liu", "Xun", "Liu", "Chang", "Mu", "Yun", "Fan", "Fu", "Geng", "Tian", "Jie", "Jie", "Quan", "Wei", "Fu", "Tian", "Mu", "Tap", "Pan", "Jiang", "Wa", "Da", "Nan", "Liu", "Ben", "Zhen", "Chu", "Mu", "Mu", "Ce", "Cen", "Gai", "Bi", "Da", "Zhi", "Lue", "Qi", "Lue", "Pan", "Kesa", "Fan", "Hua", "Yu", "Yu", "Mu", "Jun", "Yi", "Liu", "Yu", "Die", "Chou", "Hua", "Dang", "Chuo", "Ji", "Wan", "Jiang", "Sheng", "Chang", "Tuan", "Lei", "Ji", "Cha", "Liu", "Tatamu", "Tuan", "Lin", "Jiang", "Jiang", "Chou", "Bo", "Die", "Die", "Pi", "Nie", "Dan", "Shu", "Shu", "Zhi", "Yi", "Chuang", "Nai", "Ding", "Bi", "Jie", "Liao", "Gong", "Ge", "Jiu", "Zhou", "Xia", "Shan", "Xu", "Nue", "Li", "Yang", "Chen", "You", "Ba", "Jie", "Jue", "Zhi", "Xia", "Cui", "Bi", "Yi", "Li", "Zong", "Chuang", "Feng", "Zhu", "Pao", "Pi", "Gan", "Ke", "Ci", "Xie", "Qi", "Dan", "Zhen", "Fa", "Zhi", "Teng", "Ju", "Ji", "Fei", "Qu", "Dian", "Jia", "Xian", "Cha", "Bing", "Ni", "Zheng", "Yong", "Jing", "Quan", "Chong", "Tong", "Yi", "Kai", "Wei", "Hui", "Duo", "Yang", "Chi", "Zhi", "Hen", "Ya", "Mei", "Dou", "Jing", "Xiao", "Tong", "Tu", "Mang", "Pi", "Xiao", "Suan", "Pu", "Li", "Zhi", "Cuo", "Duo", "Wu", "Sha", "Lao", "Shou", "Huan", "Xian", "Yi", "Peng", "Zhang", "Guan", "Tan", "Fei", "Ma", "Lin", "Chi", "Ji", "Dian", "An", "Chi", "Bi", "Bei", "Min", "Gu", "Dui", "E", "Wei"], Zo = ["Yu", "Cui", "Ya", "Zhu", "Cu", "Dan", "Shen", "Zhung", "Ji", "Yu", "Hou", "Feng", "La", "Yang", "Shen", "Tu", "Yu", "Gua", "Wen", "Huan", "Ku", "Jia", "Yin", "Yi", "Lu", "Sao", "Jue", "Chi", "Xi", "Guan", "Yi", "Wen", "Ji", "Chuang", "Ban", "Lei", "Liu", "Chai", "Shou", "Nue", "Dian", "Da", "Pie", "Tan", "Zhang", "Biao", "Shen", "Cu", "Luo", "Yi", "Zong", "Chou", "Zhang", "Zhai", "Sou", "Suo", "Que", "Diao", "Lou", "Lu", "Mo", "Jin", "Yin", "Ying", "Huang", "Fu", "Liao", "Long", "Qiao", "Liu", "Lao", "Xian", "Fei", "Dan", "Yin", "He", "Ai", "Ban", "Xian", "Guan", "Guai", "Nong", "Yu", "Wei", "Yi", "Yong", "Pi", "Lei", "Li", "Shu", "Dan", "Lin", "Dian", "Lin", "Lai", "Pie", "Ji", "Chi", "Yang", "Xian", "Jie", "Zheng", null, "Li", "Huo", "Lai", "Shaku", "Dian", "Xian", "Ying", "Yin", "Qu", "Yong", "Tan", "Dian", "Luo", "Luan", "Luan", "Bo", null, "Gui", "Po", "Fa", "Deng", "Fa", "Bai", "Bai", "Qie", "Bi", "Zao", "Zao", "Mao", "De", "Pa", "Jie", "Huang", "Gui", "Ci", "Ling", "Gao", "Mo", "Ji", "Jiao", "Peng", "Gao", "Ai", "E", "Hao", "Han", "Bi", "Wan", "Chou", "Qian", "Xi", "Ai", "Jiong", "Hao", "Huang", "Hao", "Ze", "Cui", "Hao", "Xiao", "Ye", "Po", "Hao", "Jiao", "Ai", "Xing", "Huang", "Li", "Piao", "He", "Jiao", "Pi", "Gan", "Pao", "Zhou", "Jun", "Qiu", "Cun", "Que", "Zha", "Gu", "Jun", "Jun", "Zhou", "Zha", "Gu", "Zhan", "Du", "Min", "Qi", "Ying", "Yu", "Bei", "Zhao", "Zhong", "Pen", "He", "Ying", "He", "Yi", "Bo", "Wan", "He", "Ang", "Zhan", "Yan", "Jian", "He", "Yu", "Kui", "Fan", "Gai", "Dao", "Pan", "Fu", "Qiu", "Sheng", "Dao", "Lu", "Zhan", "Meng", "Li", "Jin", "Xu", "Jian", "Pan", "Guan", "An", "Lu", "Shu", "Zhou", "Dang", "An", "Gu", "Li", "Mu", "Cheng", "Gan", "Xu", "Mang", "Mang", "Zhi", "Qi", "Ruan", "Tian", "Xiang", "Dun", "Xin", "Xi", "Pan", "Feng", "Dun", "Min"], Co = ["Ming", "Sheng", "Shi", "Yun", "Mian", "Pan", "Fang", "Miao", "Dan", "Mei", "Mao", "Kan", "Xian", "Ou", "Shi", "Yang", "Zheng", "Yao", "Shen", "Huo", "Da", "Zhen", "Kuang", "Ju", "Shen", "Chi", "Sheng", "Mei", "Mo", "Zhu", "Zhen", "Zhen", "Mian", "Di", "Yuan", "Die", "Yi", "Zi", "Zi", "Chao", "Zha", "Xuan", "Bing", "Mi", "Long", "Sui", "Dong", "Mi", "Die", "Yi", "Er", "Ming", "Xuan", "Chi", "Kuang", "Juan", "Mou", "Zhen", "Tiao", "Yang", "Yan", "Mo", "Zhong", "Mai", "Zhao", "Zheng", "Mei", "Jun", "Shao", "Han", "Huan", "Di", "Cheng", "Cuo", "Juan", "E", "Wan", "Xian", "Xi", "Kun", "Lai", "Jian", "Shan", "Tian", "Hun", "Wan", "Ling", "Shi", "Qiong", "Lie", "Yai", "Jing", "Zheng", "Li", "Lai", "Sui", "Juan", "Shui", "Sui", "Du", "Bi", "Bi", "Mu", "Hun", "Ni", "Lu", "Yi", "Jie", "Cai", "Zhou", "Yu", "Hun", "Ma", "Xia", "Xing", "Xi", "Gun", "Cai", "Chun", "Jian", "Mei", "Du", "Hou", "Xuan", "Ti", "Kui", "Gao", "Rui", "Mou", "Xu", "Fa", "Wen", "Miao", "Chou", "Kui", "Mi", "Weng", "Kou", "Dang", "Chen", "Ke", "Sou", "Xia", "Qiong", "Mao", "Ming", "Man", "Shui", "Ze", "Zhang", "Yi", "Diao", "Ou", "Mo", "Shun", "Cong", "Lou", "Chi", "Man", "Piao", "Cheng", "Ji", "Meng", null, "Run", "Pie", "Xi", "Qiao", "Pu", "Zhu", "Deng", "Shen", "Shun", "Liao", "Che", "Xian", "Kan", "Ye", "Xu", "Tong", "Mou", "Lin", "Kui", "Xian", "Ye", "Ai", "Hui", "Zhan", "Jian", "Gu", "Zhao", "Qu", "Wei", "Chou", "Sao", "Ning", "Xun", "Yao", "Huo", "Meng", "Mian", "Bin", "Mian", "Li", "Kuang", "Jue", "Xuan", "Mian", "Huo", "Lu", "Meng", "Long", "Guan", "Man", "Xi", "Chu", "Tang", "Kan", "Zhu", "Mao", "Jin", "Lin", "Yu", "Shuo", "Ce", "Jue", "Shi", "Yi", "Shen", "Zhi", "Hou", "Shen", "Ying", "Ju", "Zhou", "Jiao", "Cuo", "Duan", "Ai", "Jiao", "Zeng", "Huo", "Bai", "Shi", "Ding", "Qi", "Ji", "Zi", "Gan", "Wu", "Tuo", "Ku", "Qiang", "Xi", "Fan", "Kuang"], So = ["Dang", "Ma", "Sha", "Dan", "Jue", "Li", "Fu", "Min", "Nuo", "Huo", "Kang", "Zhi", "Qi", "Kan", "Jie", "Fen", "E", "Ya", "Pi", "Zhe", "Yan", "Sui", "Zhuan", "Che", "Dun", "Pan", "Yan", null, "Feng", "Fa", "Mo", "Zha", "Qu", "Yu", "Luo", "Tuo", "Tuo", "Di", "Zhai", "Zhen", "Ai", "Fei", "Mu", "Zhu", "Li", "Bian", "Nu", "Ping", "Peng", "Ling", "Pao", "Le", "Po", "Bo", "Po", "Shen", "Za", "Nuo", "Li", "Long", "Tong", null, "Li", "Aragane", "Chu", "Keng", "Quan", "Zhu", "Kuang", "Huo", "E", "Nao", "Jia", "Lu", "Wei", "Ai", "Luo", "Ken", "Xing", "Yan", "Tong", "Peng", "Xi", null, "Hong", "Shuo", "Xia", "Qiao", null, "Wei", "Qiao", null, "Keng", "Xiao", "Que", "Chan", "Lang", "Hong", "Yu", "Xiao", "Xia", "Mang", "Long", "Iong", "Che", "Che", "E", "Liu", "Ying", "Mang", "Que", "Yan", "Sha", "Kun", "Yu", null, "Kaki", "Lu", "Chen", "Jian", "Nue", "Song", "Zhuo", "Keng", "Peng", "Yan", "Zhui", "Kong", "Ceng", "Qi", "Zong", "Qing", "Lin", "Jun", "Bo", "Ding", "Min", "Diao", "Jian", "He", "Lu", "Ai", "Sui", "Que", "Ling", "Bei", "Yin", "Dui", "Wu", "Qi", "Lun", "Wan", "Dian", "Gang", "Pei", "Qi", "Chen", "Ruan", "Yan", "Die", "Ding", "Du", "Tuo", "Jie", "Ying", "Bian", "Ke", "Bi", "Wei", "Shuo", "Zhen", "Duan", "Xia", "Dang", "Ti", "Nao", "Peng", "Jian", "Di", "Tan", "Cha", "Seki", "Qi", null, "Feng", "Xuan", "Que", "Que", "Ma", "Gong", "Nian", "Su", "E", "Ci", "Liu", "Si", "Tang", "Bang", "Hua", "Pi", "Wei", "Sang", "Lei", "Cuo", "Zhen", "Xia", "Qi", "Lian", "Pan", "Wei", "Yun", "Dui", "Zhe", "Ke", "La", null, "Qing", "Gun", "Zhuan", "Chan", "Qi", "Ao", "Peng", "Lu", "Lu", "Kan", "Qiang", "Chen", "Yin", "Lei", "Biao", "Qi", "Mo", "Qi", "Cui", "Zong", "Qing", "Chuo", null, "Ji", "Shan", "Lao", "Qu", "Zeng", "Deng", "Jian", "Xi", "Lin", "Ding", "Dian", "Huang", "Pan", "Za", "Qiao", "Di", "Li"], fo = ["Tani", "Jiao", null, "Zhang", "Qiao", "Dun", "Xian", "Yu", "Zhui", "He", "Huo", "Zhai", "Lei", "Ke", "Chu", "Ji", "Que", "Dang", "Yi", "Jiang", "Pi", "Pi", "Yu", "Pin", "Qi", "Ai", "Kai", "Jian", "Yu", "Ruan", "Meng", "Pao", "Ci", null, null, "Mie", "Ca", "Xian", "Kuang", "Lei", "Lei", "Zhi", "Li", "Li", "Fan", "Que", "Pao", "Ying", "Li", "Long", "Long", "Mo", "Bo", "Shuang", "Guan", "Lan", "Zan", "Yan", "Shi", "Shi", "Li", "Reng", "She", "Yue", "Si", "Qi", "Ta", "Ma", "Xie", "Xian", "Xian", "Zhi", "Qi", "Zhi", "Beng", "Dui", "Zhong", null, "Yi", "Shi", "You", "Zhi", "Tiao", "Fu", "Fu", "Mi", "Zu", "Zhi", "Suan", "Mei", "Zuo", "Qu", "Hu", "Zhu", "Shen", "Sui", "Ci", "Chai", "Mi", "Lu", "Yu", "Xiang", "Wu", "Tiao", "Piao", "Zhu", "Gui", "Xia", "Zhi", "Ji", "Gao", "Zhen", "Gao", "Shui", "Jin", "Chen", "Gai", "Kun", "Di", "Dao", "Huo", "Tao", "Qi", "Gu", "Guan", "Zui", "Ling", "Lu", "Bing", "Jin", "Dao", "Zhi", "Lu", "Shan", "Bei", "Zhe", "Hui", "You", "Xi", "Yin", "Zi", "Huo", "Zhen", "Fu", "Yuan", "Wu", "Xian", "Yang", "Ti", "Yi", "Mei", "Si", "Di", null, "Zhuo", "Zhen", "Yong", "Ji", "Gao", "Tang", "Si", "Ma", "Ta", null, "Xuan", "Qi", "Yu", "Xi", "Ji", "Si", "Chan", "Tan", "Kuai", "Sui", "Li", "Nong", "Ni", "Dao", "Li", "Rang", "Yue", "Ti", "Zan", "Lei", "Rou", "Yu", "Yu", "Chi", "Xie", "Qin", "He", "Tu", "Xiu", "Si", "Ren", "Tu", "Zi", "Cha", "Gan", "Yi", "Xian", "Bing", "Nian", "Qiu", "Qiu", "Zhong", "Fen", "Hao", "Yun", "Ke", "Miao", "Zhi", "Geng", "Bi", "Zhi", "Yu", "Mi", "Ku", "Ban", "Pi", "Ni", "Li", "You", "Zu", "Pi", "Ba", "Ling", "Mo", "Cheng", "Nian", "Qin", "Yang", "Zuo", "Zhi", "Zhi", "Shu", "Ju", "Zi", "Huo", "Ji", "Cheng", "Tong", "Zhi", "Huo", "He", "Yin", "Zi", "Zhi", "Jie", "Ren", "Du", "Yi", "Zhu", "Hui", "Nong", "Fu"], Jo = ["Xi", "Kao", "Lang", "Fu", "Ze", "Shui", "Lu", "Kun", "Gan", "Geng", "Ti", "Cheng", "Tu", "Shao", "Shui", "Ya", "Lun", "Lu", "Gu", "Zuo", "Ren", "Zhun", "Bang", "Bai", "Ji", "Zhi", "Zhi", "Kun", "Leng", "Peng", "Ke", "Bing", "Chou", "Zu", "Yu", "Su", "Lue", null, "Yi", "Xi", "Bian", "Ji", "Fu", "Bi", "Nuo", "Jie", "Zhong", "Zong", "Xu", "Cheng", "Dao", "Wen", "Lian", "Zi", "Yu", "Ji", "Xu", "Zhen", "Zhi", "Dao", "Jia", "Ji", "Gao", "Gao", "Gu", "Rong", "Sui", "You", "Ji", "Kang", "Mu", "Shan", "Men", "Zhi", "Ji", "Lu", "Su", "Ji", "Ying", "Wen", "Qiu", "Se", null, "Yi", "Huang", "Qie", "Ji", "Sui", "Xiao", "Pu", "Jiao", "Zhuo", "Tong", "Sai", "Lu", "Sui", "Nong", "Se", "Hui", "Rang", "Nuo", "Yu", "Bin", "Ji", "Tui", "Wen", "Cheng", "Huo", "Gong", "Lu", "Biao", null, "Rang", "Zhuo", "Li", "Zan", "Xue", "Wa", "Jiu", "Qiong", "Xi", "Qiong", "Kong", "Yu", "Sen", "Jing", "Yao", "Chuan", "Zhun", "Tu", "Lao", "Qie", "Zhai", "Yao", "Bian", "Bao", "Yao", "Bing", "Wa", "Zhu", "Jiao", "Qiao", "Diao", "Wu", "Gui", "Yao", "Zhi", "Chuang", "Yao", "Tiao", "Jiao", "Chuang", "Jiong", "Xiao", "Cheng", "Kou", "Cuan", "Wo", "Dan", "Ku", "Ke", "Zhui", "Xu", "Su", "Guan", "Kui", "Dou", null, "Yin", "Wo", "Wa", "Ya", "Yu", "Ju", "Qiong", "Yao", "Yao", "Tiao", "Chao", "Yu", "Tian", "Diao", "Ju", "Liao", "Xi", "Wu", "Kui", "Chuang", "Zhao", null, "Kuan", "Long", "Cheng", "Cui", "Piao", "Zao", "Cuan", "Qiao", "Qiong", "Dou", "Zao", "Long", "Qie", "Li", "Chu", "Shi", "Fou", "Qian", "Chu", "Hong", "Qi", "Qian", "Gong", "Shi", "Shu", "Miao", "Ju", "Zhan", "Zhu", "Ling", "Long", "Bing", "Jing", "Jing", "Zhang", "Yi", "Si", "Jun", "Hong", "Tong", "Song", "Jing", "Diao", "Yi", "Shu", "Jing", "Qu", "Jie", "Ping", "Duan", "Shao", "Zhuan", "Ceng", "Deng", "Cui", "Huai", "Jing", "Kan", "Jing", "Zhu", "Zhu", "Le", "Peng", "Yu", "Chi", "Gan"], Do = ["Mang", "Zhu", "Utsubo", "Du", "Ji", "Xiao", "Ba", "Suan", "Ji", "Zhen", "Zhao", "Sun", "Ya", "Zhui", "Yuan", "Hu", "Gang", "Xiao", "Cen", "Pi", "Bi", "Jian", "Yi", "Dong", "Shan", "Sheng", "Xia", "Di", "Zhu", "Na", "Chi", "Gu", "Li", "Qie", "Min", "Bao", "Tiao", "Si", "Fu", "Ce", "Ben", "Pei", "Da", "Zi", "Di", "Ling", "Ze", "Nu", "Fu", "Gou", "Fan", "Jia", "Ge", "Fan", "Shi", "Mao", "Po", "Sey", "Jian", "Qiong", "Long", "Souke", "Bian", "Luo", "Gui", "Qu", "Chi", "Yin", "Yao", "Xian", "Bi", "Qiong", "Gua", "Deng", "Jiao", "Jin", "Quan", "Sun", "Ru", "Fa", "Kuang", "Zhu", "Tong", "Ji", "Da", "Xing", "Ce", "Zhong", "Kou", "Lai", "Bi", "Shai", "Dang", "Zheng", "Ce", "Fu", "Yun", "Tu", "Pa", "Li", "Lang", "Ju", "Guan", "Jian", "Han", "Tong", "Xia", "Zhi", "Cheng", "Suan", "Shi", "Zhu", "Zuo", "Xiao", "Shao", "Ting", "Ce", "Yan", "Gao", "Kuai", "Gan", "Chou", "Kago", "Gang", "Yun", "O", "Qian", "Xiao", "Jian", "Pu", "Lai", "Zou", "Bi", "Bi", "Bi", "Ge", "Chi", "Guai", "Yu", "Jian", "Zhao", "Gu", "Chi", "Zheng", "Jing", "Sha", "Zhou", "Lu", "Bo", "Ji", "Lin", "Suan", "Jun", "Fu", "Zha", "Gu", "Kong", "Qian", "Quan", "Jun", "Chui", "Guan", "Yuan", "Ce", "Ju", "Bo", "Ze", "Qie", "Tuo", "Luo", "Dan", "Xiao", "Ruo", "Jian", "Xuan", "Bian", "Sun", "Xiang", "Xian", "Ping", "Zhen", "Sheng", "Hu", "Shi", "Zhu", "Yue", "Chun", "Lu", "Wu", "Dong", "Xiao", "Ji", "Jie", "Huang", "Xing", "Mei", "Fan", "Chui", "Zhuan", "Pian", "Feng", "Zhu", "Hong", "Qie", "Hou", "Qiu", "Miao", "Qian", null, "Kui", "Sik", "Lou", "Yun", "He", "Tang", "Yue", "Chou", "Gao", "Fei", "Ruo", "Zheng", "Gou", "Nie", "Qian", "Xiao", "Cuan", "Gong", "Pang", "Du", "Li", "Bi", "Zhuo", "Chu", "Shai", "Chi", "Zhu", "Qiang", "Long", "Lan", "Jian", "Bu", "Li", "Hui", "Bi", "Di", "Cong", "Yan", "Peng", "Sen", "Zhuan", "Pai", "Piao", "Dou", "Yu", "Mie", "Zhuan"], Xo = ["Ze", "Xi", "Guo", "Yi", "Hu", "Chan", "Kou", "Cu", "Ping", "Chou", "Ji", "Gui", "Su", "Lou", "Zha", "Lu", "Nian", "Suo", "Cuan", "Sasara", "Suo", "Le", "Duan", "Yana", "Xiao", "Bo", "Mi", "Si", "Dang", "Liao", "Dan", "Dian", "Fu", "Jian", "Min", "Kui", "Dai", "Qiao", "Deng", "Huang", "Sun", "Lao", "Zan", "Xiao", "Du", "Shi", "Zan", null, "Pai", "Hata", "Pai", "Gan", "Ju", "Du", "Lu", "Yan", "Bo", "Dang", "Sai", "Ke", "Long", "Qian", "Lian", "Bo", "Zhou", "Lai", null, "Lan", "Kui", "Yu", "Yue", "Hao", "Zhen", "Tai", "Ti", "Mi", "Chou", "Ji", null, "Hata", "Teng", "Zhuan", "Zhou", "Fan", "Sou", "Zhou", "Kuji", "Zhuo", "Teng", "Lu", "Lu", "Jian", "Tuo", "Ying", "Yu", "Lai", "Long", "Shinshi", "Lian", "Lan", "Qian", "Yue", "Zhong", "Qu", "Lian", "Bian", "Duan", "Zuan", "Li", "Si", "Luo", "Ying", "Yue", "Zhuo", "Xu", "Mi", "Di", "Fan", "Shen", "Zhe", "Shen", "Nu", "Xie", "Lei", "Xian", "Zi", "Ni", "Cun", null, "Qian", "Kume", "Bi", "Ban", "Wu", "Sha", "Kang", "Rou", "Fen", "Bi", "Cui", null, "Li", "Chi", "Nukamiso", "Ro", "Ba", "Li", "Gan", "Ju", "Po", "Mo", "Cu", "Nian", "Zhou", "Li", "Su", "Tiao", "Li", "Qi", "Su", "Hong", "Tong", "Zi", "Ce", "Yue", "Zhou", "Lin", "Zhuang", "Bai", null, "Fen", "Ji", null, "Sukumo", "Liang", "Xian", "Fu", "Liang", "Can", "Geng", "Li", "Yue", "Lu", "Ju", "Qi", "Cui", "Bai", "Zhang", "Lin", "Zong", "Jing", "Guo", "Kouji", "San", "San", "Tang", "Bian", "Rou", "Mian", "Hou", "Xu", "Zong", "Hu", "Jian", "Zan", "Ci", "Li", "Xie", "Fu", "Ni", "Bei", "Gu", "Xiu", "Gao", "Tang", "Qiu", "Sukumo", "Cao", "Zhuang", "Tang", "Mi", "San", "Fen", "Zao", "Kang", "Jiang", "Mo", "San", "San", "Nuo", "Xi", "Liang", "Jiang", "Kuai", "Bo", "Huan", null, "Zong", "Xian", "Nuo", "Tuan", "Nie", "Li", "Zuo", "Di", "Nie", "Tiao", "Lan", "Mi", "Jiao", "Jiu", "Xi", "Gong", "Zheng", "Jiu", "You"], po = ["Ji", "Cha", "Zhou", "Xun", "Yue", "Hong", "Yu", "He", "Wan", "Ren", "Wen", "Wen", "Qiu", "Na", "Zi", "Tou", "Niu", "Fou", "Jie", "Shu", "Chun", "Pi", "Yin", "Sha", "Hong", "Zhi", "Ji", "Fen", "Yun", "Ren", "Dan", "Jin", "Su", "Fang", "Suo", "Cui", "Jiu", "Zha", "Kinu", "Jin", "Fu", "Zhi", "Ci", "Zi", "Chou", "Hong", "Zha", "Lei", "Xi", "Fu", "Xie", "Shen", "Bei", "Zhu", "Qu", "Ling", "Zhu", "Shao", "Gan", "Yang", "Fu", "Tuo", "Zhen", "Dai", "Zhuo", "Shi", "Zhong", "Xian", "Zu", "Jiong", "Ban", "Ju", "Mo", "Shu", "Zui", "Wata", "Jing", "Ren", "Heng", "Xie", "Jie", "Zhu", "Chou", "Gua", "Bai", "Jue", "Kuang", "Hu", "Ci", "Geng", "Geng", "Tao", "Xie", "Ku", "Jiao", "Quan", "Gai", "Luo", "Xuan", "Bing", "Xian", "Fu", "Gei", "Tong", "Rong", "Tiao", "Yin", "Lei", "Xie", "Quan", "Xu", "Lun", "Die", "Tong", "Si", "Jiang", "Xiang", "Hui", "Jue", "Zhi", "Jian", "Juan", "Chi", "Mian", "Zhen", "Lu", "Cheng", "Qiu", "Shu", "Bang", "Tong", "Xiao", "Wan", "Qin", "Geng", "Xiu", "Ti", "Xiu", "Xie", "Hong", "Xi", "Fu", "Ting", "Sui", "Dui", "Kun", "Fu", "Jing", "Hu", "Zhi", "Yan", "Jiong", "Feng", "Ji", "Sok", "Kase", "Zong", "Lin", "Duo", "Li", "Lu", "Liang", "Chou", "Quan", "Shao", "Qi", "Qi", "Zhun", "Qi", "Wan", "Qian", "Xian", "Shou", "Wei", "Qi", "Tao", "Wan", "Gang", "Wang", "Beng", "Zhui", "Cai", "Guo", "Cui", "Lun", "Liu", "Qi", "Zhan", "Bei", "Chuo", "Ling", "Mian", "Qi", "Qie", "Tan", "Zong", "Gun", "Zou", "Yi", "Zi", "Xing", "Liang", "Jin", "Fei", "Rui", "Min", "Yu", "Zong", "Fan", "Lu", "Xu", "Yingl", "Zhang", "Kasuri", "Xu", "Xiang", "Jian", "Ke", "Xian", "Ruan", "Mian", "Qi", "Duan", "Zhong", "Di", "Min", "Miao", "Yuan", "Xie", "Bao", "Si", "Qiu", "Bian", "Huan", "Geng", "Cong", "Mian", "Wei", "Fu", "Wei", "Yu", "Gou", "Miao", "Xie", "Lian", "Zong", "Bian", "Yun", "Yin", "Ti", "Gua", "Zhi", "Yun", "Cheng", "Chan", "Dai"], To = ["Xia", "Yuan", "Zong", "Xu", "Nawa", "Odoshi", "Geng", "Sen", "Ying", "Jin", "Yi", "Zhui", "Ni", "Bang", "Gu", "Pan", "Zhou", "Jian", "Cuo", "Quan", "Shuang", "Yun", "Xia", "Shuai", "Xi", "Rong", "Tao", "Fu", "Yun", "Zhen", "Gao", "Ru", "Hu", "Zai", "Teng", "Xian", "Su", "Zhen", "Zong", "Tao", "Horo", "Cai", "Bi", "Feng", "Cu", "Li", "Suo", "Yin", "Xi", "Zong", "Lei", "Zhuan", "Qian", "Man", "Zhi", "Lu", "Mo", "Piao", "Lian", "Mi", "Xuan", "Zong", "Ji", "Shan", "Sui", "Fan", "Shuai", "Beng", "Yi", "Sao", "Mou", "Zhou", "Qiang", "Hun", "Sem", "Xi", "Jung", "Xiu", "Ran", "Xuan", "Hui", "Qiao", "Zeng", "Zuo", "Zhi", "Shan", "San", "Lin", "Yu", "Fan", "Liao", "Chuo", "Zun", "Jian", "Rao", "Chan", "Rui", "Xiu", "Hui", "Hua", "Zuan", "Xi", "Qiang", "Un", "Da", "Sheng", "Hui", "Xi", "Se", "Jian", "Jiang", "Huan", "Zao", "Cong", "Jie", "Jiao", "Bo", "Chan", "Yi", "Nao", "Sui", "Yi", "Shai", "Xu", "Ji", "Bin", "Qian", "Lan", "Pu", "Xun", "Zuan", "Qi", "Peng", "Li", "Mo", "Lei", "Xie", "Zuan", "Kuang", "You", "Xu", "Lei", "Xian", "Chan", "Kou", "Lu", "Chan", "Ying", "Cai", "Xiang", "Xian", "Zui", "Zuan", "Luo", "Xi", "Dao", "Lan", "Lei", "Lian", "Si", "Jiu", "Yu", "Hong", "Zhou", "Xian", "He", "Yue", "Ji", "Wan", "Kuang", "Ji", "Ren", "Wei", "Yun", "Hong", "Chun", "Pi", "Sha", "Gang", "Na", "Ren", "Zong", "Lun", "Fen", "Zhi", "Wen", "Fang", "Zhu", "Yin", "Niu", "Shu", "Xian", "Gan", "Xie", "Fu", "Lian", "Zu", "Shen", "Xi", "Zhi", "Zhong", "Zhou", "Ban", "Fu", "Zhuo", "Shao", "Yi", "Jing", "Dai", "Bang", "Rong", "Jie", "Ku", "Rao", "Die", "Heng", "Hui", "Gei", "Xuan", "Jiang", "Luo", "Jue", "Jiao", "Tong", "Geng", "Xiao", "Juan", "Xiu", "Xi", "Sui", "Tao", "Ji", "Ti", "Ji", "Xu", "Ling", null, "Xu", "Qi", "Fei", "Chuo", "Zhang", "Gun", "Sheng", "Wei", "Mian", "Shou", "Beng", "Chou", "Tao", "Liu", "Quan", "Zong", "Zhan", "Wan", "Lu"], Ho = ["Zhui", "Zi", "Ke", "Xiang", "Jian", "Mian", "Lan", "Ti", "Miao", "Qi", "Yun", "Hui", "Si", "Duo", "Duan", "Bian", "Xian", "Gou", "Zhui", "Huan", "Di", "Lu", "Bian", "Min", "Yuan", "Jin", "Fu", "Ru", "Zhen", "Feng", "Shuai", "Gao", "Chan", "Li", "Yi", "Jian", "Bin", "Piao", "Man", "Lei", "Ying", "Suo", "Mou", "Sao", "Xie", "Liao", "Shan", "Zeng", "Jiang", "Qian", "Zao", "Huan", "Jiao", "Zuan", "Fou", "Xie", "Gang", "Fou", "Que", "Fou", "Kaakeru", "Bo", "Ping", "Hou", null, "Gang", "Ying", "Ying", "Qing", "Xia", "Guan", "Zun", "Tan", "Chang", "Qi", "Weng", "Ying", "Lei", "Tan", "Lu", "Guan", "Wang", "Wang", "Gang", "Wang", "Han", null, "Luo", "Fu", "Mi", "Fa", "Gu", "Zhu", "Ju", "Mao", "Gu", "Min", "Gang", "Ba", "Gua", "Ti", "Juan", "Fu", "Lin", "Yan", "Zhao", "Zui", "Gua", "Zhuo", "Yu", "Zhi", "An", "Fa", "Nan", "Shu", "Si", "Pi", "Ma", "Liu", "Ba", "Fa", "Li", "Chao", "Wei", "Bi", "Ji", "Zeng", "Tong", "Liu", "Ji", "Juan", "Mi", "Zhao", "Luo", "Pi", "Ji", "Ji", "Luan", "Yang", "Mie", "Qiang", "Ta", "Mei", "Yang", "You", "You", "Fen", "Ba", "Gao", "Yang", "Gu", "Qiang", "Zang", "Gao", "Ling", "Yi", "Zhu", "Di", "Xiu", "Qian", "Yi", "Xian", "Rong", "Qun", "Qun", "Qian", "Huan", "Zui", "Xian", "Yi", "Yashinau", "Qiang", "Xian", "Yu", "Geng", "Jie", "Tang", "Yuan", "Xi", "Fan", "Shan", "Fen", "Shan", "Lian", "Lei", "Geng", "Nou", "Qiang", "Chan", "Yu", "Gong", "Yi", "Chong", "Weng", "Fen", "Hong", "Chi", "Chi", "Cui", "Fu", "Xia", "Pen", "Yi", "La", "Yi", "Pi", "Ling", "Liu", "Zhi", "Qu", "Xi", "Xie", "Xiang", "Xi", "Xi", "Qi", "Qiao", "Hui", "Hui", "Xiao", "Se", "Hong", "Jiang", "Di", "Cui", "Fei", "Tao", "Sha", "Chi", "Zhu", "Jian", "Xuan", "Shi", "Pian", "Zong", "Wan", "Hui", "Hou", "He", "He", "Han", "Ao", "Piao", "Yi", "Lian", "Qu", null, "Lin", "Pen", "Qiao", "Ao", "Fan", "Yi", "Hui", "Xuan", "Dao"], _o = ["Yao", "Lao", null, "Kao", "Mao", "Zhe", "Qi", "Gou", "Gou", "Gou", "Die", "Die", "Er", "Shua", "Ruan", "Er", "Nai", "Zhuan", "Lei", "Ting", "Zi", "Geng", "Chao", "Hao", "Yun", "Pa", "Pi", "Chi", "Si", "Chu", "Jia", "Ju", "He", "Chu", "Lao", "Lun", "Ji", "Tang", "Ou", "Lou", "Nou", "Gou", "Pang", "Ze", "Lou", "Ji", "Lao", "Huo", "You", "Mo", "Huai", "Er", "Zhe", "Ting", "Ye", "Da", "Song", "Qin", "Yun", "Chi", "Dan", "Dan", "Hong", "Geng", "Zhi", null, "Nie", "Dan", "Zhen", "Che", "Ling", "Zheng", "You", "Wa", "Liao", "Long", "Zhi", "Ning", "Tiao", "Er", "Ya", "Die", "Gua", null, "Lian", "Hao", "Sheng", "Lie", "Pin", "Jing", "Ju", "Bi", "Di", "Guo", "Wen", "Xu", "Ping", "Cong", "Shikato", null, "Ting", "Yu", "Cong", "Kui", "Tsuraneru", "Kui", "Cong", "Lian", "Weng", "Kui", "Lian", "Lian", "Cong", "Ao", "Sheng", "Song", "Ting", "Kui", "Nie", "Zhi", "Dan", "Ning", "Qie", "Ji", "Ting", "Ting", "Long", "Yu", "Yu", "Zhao", "Si", "Su", "Yi", "Su", "Si", "Zhao", "Zhao", "Rou", "Yi", "Le", "Ji", "Qiu", "Ken", "Cao", "Ge", "Di", "Huan", "Huang", "Yi", "Ren", "Xiao", "Ru", "Zhou", "Yuan", "Du", "Gang", "Rong", "Gan", "Cha", "Wo", "Chang", "Gu", "Zhi", "Han", "Fu", "Fei", "Fen", "Pei", "Pang", "Jian", "Fang", "Zhun", "You", "Na", "Hang", "Ken", "Ran", "Gong", "Yu", "Wen", "Yao", "Jin", "Pi", "Qian", "Xi", "Xi", "Fei", "Ken", "Jing", "Tai", "Shen", "Zhong", "Zhang", "Xie", "Shen", "Wei", "Zhou", "Die", "Dan", "Fei", "Ba", "Bo", "Qu", "Tian", "Bei", "Gua", "Tai", "Zi", "Ku", "Zhi", "Ni", "Ping", "Zi", "Fu", "Pang", "Zhen", "Xian", "Zuo", "Pei", "Jia", "Sheng", "Zhi", "Bao", "Mu", "Qu", "Hu", "Ke", "Yi", "Yin", "Xu", "Yang", "Long", "Dong", "Ka", "Lu", "Jing", "Nu", "Yan", "Pang", "Kua", "Yi", "Guang", "Gai", "Ge", "Dong", "Zhi", "Xiao", "Xiong", "Xiong", "Er", "E", "Xing", "Pian", "Neng", "Zi", "Gui"], yo = ["Cheng", "Tiao", "Zhi", "Cui", "Mei", "Xie", "Cui", "Xie", "Mo", "Mai", "Ji", "Obiyaakasu", null, "Kuai", "Sa", "Zang", "Qi", "Nao", "Mi", "Nong", "Luan", "Wan", "Bo", "Wen", "Guan", "Qiu", "Jiao", "Jing", "Rou", "Heng", "Cuo", "Lie", "Shan", "Ting", "Mei", "Chun", "Shen", "Xie", "De", "Zui", "Cu", "Xiu", "Xin", "Tuo", "Pao", "Cheng", "Nei", "Fu", "Dou", "Tuo", "Niao", "Noy", "Pi", "Gu", "Gua", "Li", "Lian", "Zhang", "Cui", "Jie", "Liang", "Zhou", "Pi", "Biao", "Lun", "Pian", "Guo", "Kui", "Chui", "Dan", "Tian", "Nei", "Jing", "Jie", "La", "Yi", "An", "Ren", "Shen", "Chuo", "Fu", "Fu", "Ju", "Fei", "Qiang", "Wan", "Dong", "Pi", "Guo", "Zong", "Ding", "Wu", "Mei", "Ruan", "Zhuan", "Zhi", "Cou", "Gua", "Ou", "Di", "An", "Xing", "Nao", "Yu", "Chuan", "Nan", "Yun", "Zhong", "Rou", "E", "Sai", "Tu", "Yao", "Jian", "Wei", "Jiao", "Yu", "Jia", "Duan", "Bi", "Chang", "Fu", "Xian", "Ni", "Mian", "Wa", "Teng", "Tui", "Bang", "Qian", "Lu", "Wa", "Sou", "Tang", "Su", "Zhui", "Ge", "Yi", "Bo", "Liao", "Ji", "Pi", "Xie", "Gao", "Lu", "Bin", "Ou", "Chang", "Lu", "Guo", "Pang", "Chuai", "Piao", "Jiang", "Fu", "Tang", "Mo", "Xi", "Zhuan", "Lu", "Jiao", "Ying", "Lu", "Zhi", "Tara", "Chun", "Lian", "Tong", "Peng", "Ni", "Zha", "Liao", "Cui", "Gui", "Xiao", "Teng", "Fan", "Zhi", "Jiao", "Shan", "Wu", "Cui", "Run", "Xiang", "Sui", "Fen", "Ying", "Tan", "Zhua", "Dan", "Kuai", "Nong", "Tun", "Lian", "Bi", "Yong", "Jue", "Chu", "Yi", "Juan", "La", "Lian", "Sao", "Tun", "Gu", "Qi", "Cui", "Bin", "Xun", "Ru", "Huo", "Zang", "Xian", "Biao", "Xing", "Kuan", "La", "Yan", "Lu", "Huo", "Zang", "Luo", "Qu", "Zang", "Luan", "Ni", "Zang", "Chen", "Qian", "Wo", "Guang", "Zang", "Lin", "Guang", "Zi", "Jiao", "Nie", "Chou", "Ji", "Gao", "Chou", "Mian", "Nie", "Zhi", "Zhi", "Ge", "Jian", "Die", "Zhi", "Xiu", "Tai", "Zhen", "Jiu", "Xian", "Yu", "Cha"], mo = ["Yao", "Yu", "Chong", "Xi", "Xi", "Jiu", "Yu", "Yu", "Xing", "Ju", "Jiu", "Xin", "She", "She", "Yadoru", "Jiu", "Shi", "Tan", "Shu", "Shi", "Tian", "Dan", "Pu", "Pu", "Guan", "Hua", "Tan", "Chuan", "Shun", "Xia", "Wu", "Zhou", "Dao", "Gang", "Shan", "Yi", null, "Pa", "Tai", "Fan", "Ban", "Chuan", "Hang", "Fang", "Ban", "Que", "Hesaki", "Zhong", "Jian", "Cang", "Ling", "Zhu", "Ze", "Duo", "Bo", "Xian", "Ge", "Chuan", "Jia", "Lu", "Hong", "Pang", "Xi", null, "Fu", "Zao", "Feng", "Li", "Shao", "Yu", "Lang", "Ting", null, "Wei", "Bo", "Meng", "Nian", "Ju", "Huang", "Shou", "Zong", "Bian", "Mao", "Die", null, "Bang", "Cha", "Yi", "Sao", "Cang", "Cao", "Lou", "Dai", "Sori", "Yao", "Tong", "Yofune", "Dang", "Tan", "Lu", "Yi", "Jie", "Jian", "Huo", "Meng", "Qi", "Lu", "Lu", "Chan", "Shuang", "Gen", "Liang", "Jian", "Jian", "Se", "Yan", "Fu", "Ping", "Yan", "Yan", "Cao", "Cao", "Yi", "Le", "Ting", "Qiu", "Ai", "Nai", "Tiao", "Jiao", "Jie", "Peng", "Wan", "Yi", "Chai", "Mian", "Mie", "Gan", "Qian", "Yu", "Yu", "Shuo", "Qiong", "Tu", "Xia", "Qi", "Mang", "Zi", "Hui", "Sui", "Zhi", "Xiang", "Bi", "Fu", "Tun", "Wei", "Wu", "Zhi", "Qi", "Shan", "Wen", "Qian", "Ren", "Fou", "Kou", "Jie", "Lu", "Xu", "Ji", "Qin", "Qi", "Yuan", "Fen", "Ba", "Rui", "Xin", "Ji", "Hua", "Hua", "Fang", "Wu", "Jue", "Gou", "Zhi", "Yun", "Qin", "Ao", "Chu", "Mao", "Ya", "Fei", "Reng", "Hang", "Cong", "Yin", "You", "Bian", "Yi", "Susa", "Wei", "Li", "Pi", "E", "Xian", "Chang", "Cang", "Meng", "Su", "Yi", "Yuan", "Ran", "Ling", "Tai", "Tiao", "Di", "Miao", "Qiong", "Li", "Yong", "Ke", "Mu", "Pei", "Bao", "Gou", "Min", "Yi", "Yi", "Ju", "Pi", "Ruo", "Ku", "Zhu", "Ni", "Bo", "Bing", "Shan", "Qiu", "Yao", "Xian", "Ben", "Hong", "Ying", "Zha", "Dong", "Ju", "Die", "Nie", "Gan", "Hu", "Ping", "Mei", "Fu", "Sheng", "Gu", "Bi", "Wei"], Qo = ["Fu", "Zhuo", "Mao", "Fan", "Qie", "Mao", "Mao", "Ba", "Zi", "Mo", "Zi", "Di", "Chi", "Ji", "Jing", "Long", null, "Niao", null, "Xue", "Ying", "Qiong", "Ge", "Ming", "Li", "Rong", "Yin", "Gen", "Qian", "Chai", "Chen", "Yu", "Xiu", "Zi", "Lie", "Wu", "Ji", "Kui", "Ce", "Chong", "Ci", "Gou", "Guang", "Mang", "Chi", "Jiao", "Jiao", "Fu", "Yu", "Zhu", "Zi", "Jiang", "Hui", "Yin", "Cha", "Fa", "Rong", "Ru", "Chong", "Mang", "Tong", "Zhong", null, "Zhu", "Xun", "Huan", "Kua", "Quan", "Gai", "Da", "Jing", "Xing", "Quan", "Cao", "Jing", "Er", "An", "Shou", "Chi", "Ren", "Jian", "Ti", "Huang", "Ping", "Li", "Jin", "Lao", "Shu", "Zhuang", "Da", "Jia", "Rao", "Bi", "Ze", "Qiao", "Hui", "Qi", "Dang", null, "Rong", "Hun", "Ying", "Luo", "Ying", "Xun", "Jin", "Sun", "Yin", "Mai", "Hong", "Zhou", "Yao", "Du", "Wei", "Chu", "Dou", "Fu", "Ren", "Yin", "He", "Bi", "Bu", "Yun", "Di", "Tu", "Sui", "Sui", "Cheng", "Chen", "Wu", "Bie", "Xi", "Geng", "Li", "Fu", "Zhu", "Mo", "Li", "Zhuang", "Ji", "Duo", "Qiu", "Sha", "Suo", "Chen", "Feng", "Ju", "Mei", "Meng", "Xing", "Jing", "Che", "Xin", "Jun", "Yan", "Ting", "Diao", "Cuo", "Wan", "Han", "You", "Cuo", "Jia", "Wang", "You", "Niu", "Shao", "Xian", "Lang", "Fu", "E", "Mo", "Wen", "Jie", "Nan", "Mu", "Kan", "Lai", "Lian", "Shi", "Wo", "Usagi", "Lian", "Huo", "You", "Ying", "Ying", "Nuc", "Chun", "Mang", "Mang", "Ci", "Wan", "Jing", "Di", "Qu", "Dong", "Jian", "Zou", "Gu", "La", "Lu", "Ju", "Wei", "Jun", "Nie", "Kun", "He", "Pu", "Zi", "Gao", "Guo", "Fu", "Lun", "Chang", "Chou", "Song", "Chui", "Zhan", "Men", "Cai", "Ba", "Li", "Tu", "Bo", "Han", "Bao", "Qin", "Juan", "Xi", "Qin", "Di", "Jie", "Pu", "Dang", "Jin", "Zhao", "Tai", "Geng", "Hua", "Gu", "Ling", "Fei", "Jin", "An", "Wang", "Beng", "Zhou", "Yan", "Ju", "Jian", "Lin", "Tan", "Shu", "Tian", "Dao"], wo = ["Hu", "Qi", "He", "Cui", "Tao", "Chun", "Bei", "Chang", "Huan", "Fei", "Lai", "Qi", "Meng", "Ping", "Wei", "Dan", "Sha", "Huan", "Yan", "Yi", "Tiao", "Qi", "Wan", "Ce", "Nai", "Kutabireru", "Tuo", "Jiu", "Tie", "Luo", null, null, "Meng", null, "Yaji", null, "Ying", "Ying", "Ying", "Xiao", "Sa", "Qiu", "Ke", "Xiang", "Wan", "Yu", "Yu", "Fu", "Lian", "Xuan", "Yuan", "Nan", "Ze", "Wo", "Chun", "Xiao", "Yu", "Pian", "Mao", "An", "E", "Luo", "Ying", "Huo", "Gua", "Jiang", "Mian", "Zuo", "Zuo", "Ju", "Bao", "Rou", "Xi", "Xie", "An", "Qu", "Jian", "Fu", "Lu", "Jing", "Pen", "Feng", "Hong", "Hong", "Hou", "Yan", "Tu", "Zhu", "Zi", "Xiang", "Shen", "Ge", "Jie", "Jing", "Mi", "Huang", "Shen", "Pu", "Gai", "Dong", "Zhou", "Qian", "Wei", "Bo", "Wei", "Pa", "Ji", "Hu", "Zang", "Jia", "Duan", "Yao", "Jun", "Cong", "Quan", "Wei", "Xian", "Kui", "Ting", "Hun", "Xi", "Shi", "Qi", "Lan", "Zong", "Yao", "Yuan", "Mei", "Yun", "Shu", "Di", "Zhuan", "Guan", "Sukumo", "Xue", "Chan", "Kai", "Kui", null, "Jiang", "Lou", "Wei", "Pai", null, "Sou", "Yin", "Shi", "Chun", "Shi", "Yun", "Zhen", "Lang", "Nu", "Meng", "He", "Que", "Suan", "Yuan", "Li", "Ju", "Xi", "Pang", "Chu", "Xu", "Tu", "Liu", "Wo", "Zhen", "Qian", "Zu", "Po", "Cuo", "Yuan", "Chu", "Yu", "Kuai", "Pan", "Pu", "Pu", "Na", "Shuo", "Xi", "Fen", "Yun", "Zheng", "Jian", "Ji", "Ruo", "Cang", "En", "Mi", "Hao", "Sun", "Zhen", "Ming", "Sou", "Xu", "Liu", "Xi", "Gu", "Lang", "Rong", "Weng", "Gai", "Cuo", "Shi", "Tang", "Luo", "Ru", "Suo", "Xian", "Bei", "Yao", "Gui", "Bi", "Zong", "Gun", "Za", "Xiu", "Ce", "Hai", "Lan", null, "Ji", "Li", "Can", "Lang", "Yu", null, "Ying", "Mo", "Diao", "Tiao", "Mao", "Tong", "Zhu", "Peng", "An", "Lian", "Cong", "Xi", "Ping", "Qiu", "Jin", "Chun", "Jie", "Wei", "Tui", "Cao", "Yu", "Yi", "Ji", "Liao", "Bi", "Lu", "Su"], Mo = ["Bu", "Zhang", "Luo", "Jiang", "Man", "Yan", "Ling", "Ji", "Piao", "Gun", "Han", "Di", "Su", "Lu", "She", "Shang", "Di", "Mie", "Xun", "Man", "Bo", "Di", "Cuo", "Zhe", "Sen", "Xuan", "Wei", "Hu", "Ao", "Mi", "Lou", "Cu", "Zhong", "Cai", "Po", "Jiang", "Mi", "Cong", "Niao", "Hui", "Jun", "Yin", "Jian", "Yan", "Shu", "Yin", "Kui", "Chen", "Hu", "Sha", "Kou", "Qian", "Ma", "Zang", "Sonoko", "Qiang", "Dou", "Lian", "Lin", "Kou", "Ai", "Bi", "Li", "Wei", "Ji", "Xun", "Sheng", "Fan", "Meng", "Ou", "Chan", "Dian", "Xun", "Jiao", "Rui", "Rui", "Lei", "Yu", "Qiao", "Chu", "Hua", "Jian", "Mai", "Yun", "Bao", "You", "Qu", "Lu", "Rao", "Hui", "E", "Teng", "Fei", "Jue", "Zui", "Fa", "Ru", "Fen", "Kui", "Shun", "Rui", "Ya", "Xu", "Fu", "Jue", "Dang", "Wu", "Tong", "Si", "Xiao", "Xi", "Long", "Yun", null, "Qi", "Jian", "Yun", "Sun", "Ling", "Yu", "Xia", "Yong", "Ji", "Hong", "Si", "Nong", "Lei", "Xuan", "Yun", "Yu", "Xi", "Hao", "Bo", "Hao", "Ai", "Wei", "Hui", "Wei", "Ji", "Ci", "Xiang", "Luan", "Mie", "Yi", "Leng", "Jiang", "Can", "Shen", "Qiang", "Lian", "Ke", "Yuan", "Da", "Ti", "Tang", "Xie", "Bi", "Zhan", "Sun", "Lian", "Fan", "Ding", "Jie", "Gu", "Xie", "Shu", "Jian", "Kao", "Hong", "Sa", "Xin", "Xun", "Yao", "Hie", "Sou", "Shu", "Xun", "Dui", "Pin", "Wei", "Neng", "Chou", "Mai", "Ru", "Piao", "Tai", "Qi", "Zao", "Chen", "Zhen", "Er", "Ni", "Ying", "Gao", "Cong", "Xiao", "Qi", "Fa", "Jian", "Xu", "Kui", "Jie", "Bian", "Diao", "Mi", "Lan", "Jin", "Cang", "Miao", "Qiong", "Qie", "Xian", null, "Ou", "Xian", "Su", "Lu", "Yi", "Xu", "Xie", "Li", "Yi", "La", "Lei", "Xiao", "Di", "Zhi", "Bei", "Teng", "Yao", "Mo", "Huan", "Piao", "Fan", "Sou", "Tan", "Tui", "Qiong", "Qiao", "Wei", "Liu", "Hui", null, "Gao", "Yun", null, "Li", "Shu", "Chu", "Ai", "Lin", "Zao", "Xuan", "Chen", "Lai", "Huo"], Bo = ["Tuo", "Wu", "Rui", "Rui", "Qi", "Heng", "Lu", "Su", "Tui", "Mang", "Yun", "Pin", "Yu", "Xun", "Ji", "Jiong", "Xian", "Mo", "Hagi", "Su", "Jiong", null, "Nie", "Bo", "Rang", "Yi", "Xian", "Yu", "Ju", "Lian", "Lian", "Yin", "Qiang", "Ying", "Long", "Tong", "Wei", "Yue", "Ling", "Qu", "Yao", "Fan", "Mi", "Lan", "Kui", "Lan", "Ji", "Dang", "Katsura", "Lei", "Lei", "Hua", "Feng", "Zhi", "Wei", "Kui", "Zhan", "Huai", "Li", "Ji", "Mi", "Lei", "Huai", "Luo", "Ji", "Kui", "Lu", "Jian", "San", null, "Lei", "Quan", "Xiao", "Yi", "Luan", "Men", "Bie", "Hu", "Hu", "Lu", "Nue", "Lu", "Si", "Xiao", "Qian", "Chu", "Hu", "Xu", "Cuo", "Fu", "Xu", "Xu", "Lu", "Hu", "Yu", "Hao", "Jiao", "Ju", "Guo", "Bao", "Yan", "Zhan", "Zhan", "Kui", "Ban", "Xi", "Shu", "Chong", "Qiu", "Diao", "Ji", "Qiu", "Cheng", "Shi", null, "Di", "Zhe", "She", "Yu", "Gan", "Zi", "Hong", "Hui", "Meng", "Ge", "Sui", "Xia", "Chai", "Shi", "Yi", "Ma", "Xiang", "Fang", "E", "Pa", "Chi", "Qian", "Wen", "Wen", "Rui", "Bang", "Bi", "Yue", "Yue", "Jun", "Qi", "Ran", "Yin", "Qi", "Tian", "Yuan", "Jue", "Hui", "Qin", "Qi", "Zhong", "Ya", "Ci", "Mu", "Wang", "Fen", "Fen", "Hang", "Gong", "Zao", "Fu", "Ran", "Jie", "Fu", "Chi", "Dou", "Piao", "Xian", "Ni", "Te", "Qiu", "You", "Zha", "Ping", "Chi", "You", "He", "Han", "Ju", "Li", "Fu", "Ran", "Zha", "Gou", "Pi", "Bo", "Xian", "Zhu", "Diao", "Bie", "Bing", "Gu", "Ran", "Qu", "She", "Tie", "Ling", "Gu", "Dan", "Gu", "Ying", "Li", "Cheng", "Qu", "Mou", "Ge", "Ci", "Hui", "Hui", "Mang", "Fu", "Yang", "Wa", "Lie", "Zhu", "Yi", "Xian", "Kuo", "Jiao", "Li", "Yi", "Ping", "Ji", "Ha", "She", "Yi", "Wang", "Mo", "Qiong", "Qie", "Gui", "Gong", "Zhi", "Man", "Ebi", "Zhi", "Jia", "Rao", "Si", "Qi", "Xing", "Lie", "Qiu", "Shao", "Yong", "Jia", "Shui", "Che", "Bai", "E", "Han"], bo = ["Shu", "Xuan", "Feng", "Shen", "Zhen", "Fu", "Xian", "Zhe", "Wu", "Fu", "Li", "Lang", "Bi", "Chu", "Yuan", "You", "Jie", "Dan", "Yan", "Ting", "Dian", "Shui", "Hui", "Gua", "Zhi", "Song", "Fei", "Ju", "Mi", "Qi", "Qi", "Yu", "Jun", "Zha", "Meng", "Qiang", "Si", "Xi", "Lun", "Li", "Die", "Tiao", "Tao", "Kun", "Gan", "Han", "Yu", "Bang", "Fei", "Pi", "Wei", "Dun", "Yi", "Yuan", "Su", "Quan", "Qian", "Rui", "Ni", "Qing", "Wei", "Liang", "Guo", "Wan", "Dong", "E", "Ban", "Di", "Wang", "Can", "Yang", "Ying", "Guo", "Chan", null, "La", "Ke", "Ji", "He", "Ting", "Mai", "Xu", "Mian", "Yu", "Jie", "Shi", "Xuan", "Huang", "Yan", "Bian", "Rou", "Wei", "Fu", "Yuan", "Mei", "Wei", "Fu", "Ruan", "Xie", "You", "Qiu", "Mao", "Xia", "Ying", "Shi", "Chong", "Tang", "Zhu", "Zong", "Ti", "Fu", "Yuan", "Hui", "Meng", "La", "Du", "Hu", "Qiu", "Die", "Li", "Gua", "Yun", "Ju", "Nan", "Lou", "Qun", "Rong", "Ying", "Jiang", null, "Lang", "Pang", "Si", "Xi", "Ci", "Xi", "Yuan", "Weng", "Lian", "Sou", "Ban", "Rong", "Rong", "Ji", "Wu", "Qiu", "Han", "Qin", "Yi", "Bi", "Hua", "Tang", "Yi", "Du", "Nai", "He", "Hu", "Hui", "Ma", "Ming", "Yi", "Wen", "Ying", "Teng", "Yu", "Cang", "So", "Ebi", "Man", null, "Shang", "Zhe", "Cao", "Chi", "Di", "Ao", "Lu", "Wei", "Zhi", "Tang", "Chen", "Piao", "Qu", "Pi", "Yu", "Jian", "Luo", "Lou", "Qin", "Zhong", "Yin", "Jiang", "Shuai", "Wen", "Jiao", "Wan", "Zhi", "Zhe", "Ma", "Ma", "Guo", "Liu", "Mao", "Xi", "Cong", "Li", "Man", "Xiao", "Kamakiri", "Zhang", "Mang", "Xiang", "Mo", "Zui", "Si", "Qiu", "Te", "Zhi", "Peng", "Peng", "Jiao", "Qu", "Bie", "Liao", "Pan", "Gui", "Xi", "Ji", "Zhuan", "Huang", "Fei", "Lao", "Jue", "Jue", "Hui", "Yin", "Chan", "Jiao", "Shan", "Rao", "Xiao", "Mou", "Chong", "Xun", "Si", null, "Cheng", "Dang", "Li", "Xie", "Shan", "Yi", "Jing", "Da", "Chan", "Qi"], xo = ["Ci", "Xiang", "She", "Luo", "Qin", "Ying", "Chai", "Li", "Ze", "Xuan", "Lian", "Zhu", "Ze", "Xie", "Mang", "Xie", "Qi", "Rong", "Jian", "Meng", "Hao", "Ruan", "Huo", "Zhuo", "Jie", "Bin", "He", "Mie", "Fan", "Lei", "Jie", "La", "Mi", "Li", "Chun", "Li", "Qiu", "Nie", "Lu", "Du", "Xiao", "Zhu", "Long", "Li", "Long", "Feng", "Ye", "Beng", "Shang", "Gu", "Juan", "Ying", null, "Xi", "Can", "Qu", "Quan", "Du", "Can", "Man", "Jue", "Jie", "Zhu", "Zha", "Xie", "Huang", "Niu", "Pei", "Nu", "Xin", "Zhong", "Mo", "Er", "Ke", "Mie", "Xi", "Xing", "Yan", "Kan", "Yuan", null, "Ling", "Xuan", "Shu", "Xian", "Tong", "Long", "Jie", "Xian", "Ya", "Hu", "Wei", "Dao", "Chong", "Wei", "Dao", "Zhun", "Heng", "Qu", "Yi", "Yi", "Bu", "Gan", "Yu", "Biao", "Cha", "Yi", "Shan", "Chen", "Fu", "Gun", "Fen", "Shuai", "Jie", "Na", "Zhong", "Dan", "Ri", "Zhong", "Zhong", "Xie", "Qi", "Xie", "Ran", "Zhi", "Ren", "Qin", "Jin", "Jun", "Yuan", "Mei", "Chai", "Ao", "Niao", "Hui", "Ran", "Jia", "Tuo", "Ling", "Dai", "Bao", "Pao", "Yao", "Zuo", "Bi", "Shao", "Tan", "Ju", "He", "Shu", "Xiu", "Zhen", "Yi", "Pa", "Bo", "Di", "Wa", "Fu", "Gun", "Zhi", "Zhi", "Ran", "Pan", "Yi", "Mao", "Tuo", "Na", "Kou", "Xian", "Chan", "Qu", "Bei", "Gun", "Xi", "Ne", "Bo", "Horo", "Fu", "Yi", "Chi", "Ku", "Ren", "Jiang", "Jia", "Cun", "Mo", "Jie", "Er", "Luo", "Ru", "Zhu", "Gui", "Yin", "Cai", "Lie", "Kamishimo", "Yuki", "Zhuang", "Dang", null, "Kun", "Ken", "Niao", "Shu", "Jia", "Kun", "Cheng", "Li", "Juan", "Shen", "Pou", "Ge", "Yi", "Yu", "Zhen", "Liu", "Qiu", "Qun", "Ji", "Yi", "Bu", "Zhuang", "Shui", "Sha", "Qun", "Li", "Lian", "Lian", "Ku", "Jian", "Fou", "Chan", "Bi", "Gun", "Tao", "Yuan", "Ling", "Chi", "Chang", "Chou", "Duo", "Biao", "Liang", "Chang", "Pei", "Pei", "Fei", "Yuan", "Luo", "Guo", "Yan", "Du", "Xi", "Zhi", "Ju", "Qi"], Fo = ["Ji", "Zhi", "Gua", "Ken", "Che", "Ti", "Ti", "Fu", "Chong", "Xie", "Bian", "Die", "Kun", "Duan", "Xiu", "Xiu", "He", "Yuan", "Bao", "Bao", "Fu", "Yu", "Tuan", "Yan", "Hui", "Bei", "Chu", "Lu", "Ena", "Hitoe", "Yun", "Da", "Gou", "Da", "Huai", "Rong", "Yuan", "Ru", "Nai", "Jiong", "Suo", "Ban", "Tun", "Chi", "Sang", "Niao", "Ying", "Jie", "Qian", "Huai", "Ku", "Lian", "Bao", "Li", "Zhe", "Shi", "Lu", "Yi", "Die", "Xie", "Xian", "Wei", "Biao", "Cao", "Ji", "Jiang", "Sen", "Bao", "Xiang", "Chihaya", "Pu", "Jian", "Zhuan", "Jian", "Zui", "Ji", "Dan", "Za", "Fan", "Bo", "Xiang", "Xin", "Bie", "Rao", "Man", "Lan", "Ao", "Duo", "Gui", "Cao", "Sui", "Nong", "Chan", "Lian", "Bi", "Jin", "Dang", "Shu", "Tan", "Bi", "Lan", "Pu", "Ru", "Zhi", null, "Shu", "Wa", "Shi", "Bai", "Xie", "Bo", "Chen", "Lai", "Long", "Xi", "Xian", "Lan", "Zhe", "Dai", "Tasuki", "Zan", "Shi", "Jian", "Pan", "Yi", "Ran", "Ya", "Xi", "Xi", "Yao", "Feng", "Tan", null, "Biao", "Fu", "Ba", "He", "Ji", "Ji", "Jian", "Guan", "Bian", "Yan", "Gui", "Jue", "Pian", "Mao", "Mi", "Mi", "Mie", "Shi", "Si", "Zhan", "Luo", "Jue", "Mi", "Tiao", "Lian", "Yao", "Zhi", "Jun", "Xi", "Shan", "Wei", "Xi", "Tian", "Yu", "Lan", "E", "Du", "Qin", "Pang", "Ji", "Ming", "Ying", "Gou", "Qu", "Zhan", "Jin", "Guan", "Deng", "Jian", "Luo", "Qu", "Jian", "Wei", "Jue", "Qu", "Luo", "Lan", "Shen", "Di", "Guan", "Jian", "Guan", "Yan", "Gui", "Mi", "Shi", "Zhan", "Lan", "Jue", "Ji", "Xi", "Di", "Tian", "Yu", "Gou", "Jin", "Qu", "Jiao", "Jiu", "Jin", "Cu", "Jue", "Zhi", "Chao", "Ji", "Gu", "Dan", "Zui", "Di", "Shang", "Hua", "Quan", "Ge", "Chi", "Jie", "Gui", "Gong", "Chu", "Jie", "Hun", "Qiu", "Xing", "Su", "Ni", "Ji", "Lu", "Zhi", "Zha", "Bi", "Xing", "Hu", "Shang", "Gong", "Zhi", "Xue", "Chu", "Xi", "Yi", "Lu", "Jue", "Xi", "Yan", "Xi"], Go = ["Yan", "Yan", "Ding", "Fu", "Qiu", "Qiu", "Jiao", "Hong", "Ji", "Fan", "Xun", "Diao", "Hong", "Cha", "Tao", "Xu", "Jie", "Yi", "Ren", "Xun", "Yin", "Shan", "Qi", "Tuo", "Ji", "Xun", "Yin", "E", "Fen", "Ya", "Yao", "Song", "Shen", "Yin", "Xin", "Jue", "Xiao", "Ne", "Chen", "You", "Zhi", "Xiong", "Fang", "Xin", "Chao", "She", "Xian", "Sha", "Tun", "Xu", "Yi", "Yi", "Su", "Chi", "He", "Shen", "He", "Xu", "Zhen", "Zhu", "Zheng", "Gou", "Zi", "Zi", "Zhan", "Gu", "Fu", "Quan", "Die", "Ling", "Di", "Yang", "Li", "Nao", "Pan", "Zhou", "Gan", "Yi", "Ju", "Ao", "Zha", "Tuo", "Yi", "Qu", "Zhao", "Ping", "Bi", "Xiong", "Qu", "Ba", "Da", "Zu", "Tao", "Zhu", "Ci", "Zhe", "Yong", "Xu", "Xun", "Yi", "Huang", "He", "Shi", "Cha", "Jiao", "Shi", "Hen", "Cha", "Gou", "Gui", "Quan", "Hui", "Jie", "Hua", "Gai", "Xiang", "Wei", "Shen", "Chou", "Tong", "Mi", "Zhan", "Ming", "E", "Hui", "Yan", "Xiong", "Gua", "Er", "Beng", "Tiao", "Chi", "Lei", "Zhu", "Kuang", "Kua", "Wu", "Yu", "Teng", "Ji", "Zhi", "Ren", "Su", "Lang", "E", "Kuang", "E", "Shi", "Ting", "Dan", "Bo", "Chan", "You", "Heng", "Qiao", "Qin", "Shua", "An", "Yu", "Xiao", "Cheng", "Jie", "Xian", "Wu", "Wu", "Gao", "Song", "Pu", "Hui", "Jing", "Shuo", "Zhen", "Shuo", "Du", "Yasashi", "Chang", "Shui", "Jie", "Ke", "Qu", "Cong", "Xiao", "Sui", "Wang", "Xuan", "Fei", "Chi", "Ta", "Yi", "Na", "Yin", "Diao", "Pi", "Chuo", "Chan", "Chen", "Zhun", "Ji", "Qi", "Tan", "Zhui", "Wei", "Ju", "Qing", "Jian", "Zheng", "Ze", "Zou", "Qian", "Zhuo", "Liang", "Jian", "Zhu", "Hao", "Lun", "Shen", "Biao", "Huai", "Pian", "Yu", "Die", "Xu", "Pian", "Shi", "Xuan", "Shi", "Hun", "Hua", "E", "Zhong", "Di", "Xie", "Fu", "Pu", "Ting", "Jian", "Qi", "Yu", "Zi", "Chuan", "Xi", "Hui", "Yin", "An", "Xian", "Nan", "Chen", "Feng", "Zhu", "Yang", "Yan", "Heng", "Xuan", "Ge", "Nuo", "Qi"], vo = ["Mou", "Ye", "Wei", null, "Teng", "Zou", "Shan", "Jian", "Bo", "Ku", "Huang", "Huo", "Ge", "Ying", "Mi", "Xiao", "Mi", "Xi", "Qiang", "Chen", "Nue", "Ti", "Su", "Bang", "Chi", "Qian", "Shi", "Jiang", "Yuan", "Xie", "Xue", "Tao", "Yao", "Yao", null, "Yu", "Biao", "Cong", "Qing", "Li", "Mo", "Mo", "Shang", "Zhe", "Miu", "Jian", "Ze", "Jie", "Lian", "Lou", "Can", "Ou", "Guan", "Xi", "Zhuo", "Ao", "Ao", "Jin", "Zhe", "Yi", "Hu", "Jiang", "Man", "Chao", "Han", "Hua", "Chan", "Xu", "Zeng", "Se", "Xi", "She", "Dui", "Zheng", "Nao", "Lan", "E", "Ying", "Jue", "Ji", "Zun", "Jiao", "Bo", "Hui", "Zhuan", "Mu", "Zen", "Zha", "Shi", "Qiao", "Tan", "Zen", "Pu", "Sheng", "Xuan", "Zao", "Tan", "Dang", "Sui", "Qian", "Ji", "Jiao", "Jing", "Lian", "Nou", "Yi", "Ai", "Zhan", "Pi", "Hui", "Hua", "Yi", "Yi", "Shan", "Rang", "Nou", "Qian", "Zhui", "Ta", "Hu", "Zhou", "Hao", "Ye", "Ying", "Jian", "Yu", "Jian", "Hui", "Du", "Zhe", "Xuan", "Zan", "Lei", "Shen", "Wei", "Chan", "Li", "Yi", "Bian", "Zhe", "Yan", "E", "Chou", "Wei", "Chou", "Yao", "Chan", "Rang", "Yin", "Lan", "Chen", "Huo", "Zhe", "Huan", "Zan", "Yi", "Dang", "Zhan", "Yan", "Du", "Yan", "Ji", "Ding", "Fu", "Ren", "Ji", "Jie", "Hong", "Tao", "Rang", "Shan", "Qi", "Tuo", "Xun", "Yi", "Xun", "Ji", "Ren", "Jiang", "Hui", "Ou", "Ju", "Ya", "Ne", "Xu", "E", "Lun", "Xiong", "Song", "Feng", "She", "Fang", "Jue", "Zheng", "Gu", "He", "Ping", "Zu", "Shi", "Xiong", "Zha", "Su", "Zhen", "Di", "Zou", "Ci", "Qu", "Zhao", "Bi", "Yi", "Yi", "Kuang", "Lei", "Shi", "Gua", "Shi", "Jie", "Hui", "Cheng", "Zhu", "Shen", "Hua", "Dan", "Gou", "Quan", "Gui", "Xun", "Yi", "Zheng", "Gai", "Xiang", "Cha", "Hun", "Xu", "Zhou", "Jie", "Wu", "Yu", "Qiao", "Wu", "Gao", "You", "Hui", "Kuang", "Shuo", "Song", "Ai", "Qing", "Zhu", "Zou", "Nuo", "Du", "Zhuo", "Fei", "Ke", "Wei"], No = ["Yu", "Shui", "Shen", "Diao", "Chan", "Liang", "Zhun", "Sui", "Tan", "Shen", "Yi", "Mou", "Chen", "Die", "Huang", "Jian", "Xie", "Nue", "Ye", "Wei", "E", "Yu", "Xuan", "Chan", "Zi", "An", "Yan", "Di", "Mi", "Pian", "Xu", "Mo", "Dang", "Su", "Xie", "Yao", "Bang", "Shi", "Qian", "Mi", "Jin", "Man", "Zhe", "Jian", "Miu", "Tan", "Zen", "Qiao", "Lan", "Pu", "Jue", "Yan", "Qian", "Zhan", "Chen", "Gu", "Qian", "Hong", "Xia", "Jue", "Hong", "Han", "Hong", "Xi", "Xi", "Huo", "Liao", "Han", "Du", "Long", "Dou", "Jiang", "Qi", "Shi", "Li", "Deng", "Wan", "Bi", "Shu", "Xian", "Feng", "Zhi", "Zhi", "Yan", "Yan", "Shi", "Chu", "Hui", "Tun", "Yi", "Tun", "Yi", "Jian", "Ba", "Hou", "E", "Cu", "Xiang", "Huan", "Jian", "Ken", "Gai", "Qu", "Fu", "Xi", "Bin", "Hao", "Yu", "Zhu", "Jia", null, "Xi", "Bo", "Wen", "Huan", "Bin", "Di", "Zong", "Fen", "Yi", "Zhi", "Bao", "Chai", "Han", "Pi", "Na", "Pi", "Gou", "Na", "You", "Diao", "Mo", "Si", "Xiu", "Huan", "Kun", "He", "He", "Mo", "Han", "Mao", "Li", "Ni", "Bi", "Yu", "Jia", "Tuan", "Mao", "Pi", "Xi", "E", "Ju", "Mo", "Chu", "Tan", "Huan", "Jue", "Bei", "Zhen", "Yuan", "Fu", "Cai", "Gong", "Te", "Yi", "Hang", "Wan", "Pin", "Huo", "Fan", "Tan", "Guan", "Ze", "Zhi", "Er", "Zhu", "Shi", "Bi", "Zi", "Er", "Gui", "Pian", "Bian", "Mai", "Dai", "Sheng", "Kuang", "Fei", "Tie", "Yi", "Chi", "Mao", "He", "Bi", "Lu", "Ren", "Hui", "Gai", "Pian", "Zi", "Jia", "Xu", "Zei", "Jiao", "Gai", "Zang", "Jian", "Ying", "Xun", "Zhen", "She", "Bin", "Bin", "Qiu", "She", "Chuan", "Zang", "Zhou", "Lai", "Zan", "Si", "Chen", "Shang", "Tian", "Pei", "Geng", "Xian", "Mai", "Jian", "Sui", "Fu", "Tan", "Cong", "Cong", "Zhi", "Ji", "Zhang", "Du", "Jin", "Xiong", "Shun", "Yun", "Bao", "Zai", "Lai", "Feng", "Cang", "Ji", "Sheng", "Ai", "Zhuan", "Fu", "Gou", "Sai", "Ze", "Liao"], ko = ["Wei", "Bai", "Chen", "Zhuan", "Zhi", "Zhui", "Biao", "Yun", "Zeng", "Tan", "Zan", "Yan", null, "Shan", "Wan", "Ying", "Jin", "Gan", "Xian", "Zang", "Bi", "Du", "Shu", "Yan", null, "Xuan", "Long", "Gan", "Zang", "Bei", "Zhen", "Fu", "Yuan", "Gong", "Cai", "Ze", "Xian", "Bai", "Zhang", "Huo", "Zhi", "Fan", "Tan", "Pin", "Bian", "Gou", "Zhu", "Guan", "Er", "Jian", "Bi", "Shi", "Tie", "Gui", "Kuang", "Dai", "Mao", "Fei", "He", "Yi", "Zei", "Zhi", "Jia", "Hui", "Zi", "Ren", "Lu", "Zang", "Zi", "Gai", "Jin", "Qiu", "Zhen", "Lai", "She", "Fu", "Du", "Ji", "Shu", "Shang", "Si", "Bi", "Zhou", "Geng", "Pei", "Tan", "Lai", "Feng", "Zhui", "Fu", "Zhuan", "Sai", "Ze", "Yan", "Zan", "Yun", "Zeng", "Shan", "Ying", "Gan", "Chi", "Xi", "She", "Nan", "Xiong", "Xi", "Cheng", "He", "Cheng", "Zhe", "Xia", "Tang", "Zou", "Zou", "Li", "Jiu", "Fu", "Zhao", "Gan", "Qi", "Shan", "Qiong", "Qin", "Xian", "Ci", "Jue", "Qin", "Chi", "Ci", "Chen", "Chen", "Die", "Ju", "Chao", "Di", "Se", "Zhan", "Zhu", "Yue", "Qu", "Jie", "Chi", "Chu", "Gua", "Xue", "Ci", "Tiao", "Duo", "Lie", "Gan", "Suo", "Cu", "Xi", "Zhao", "Su", "Yin", "Ju", "Jian", "Que", "Tang", "Chuo", "Cui", "Lu", "Qu", "Dang", "Qiu", "Zi", "Ti", "Qu", "Chi", "Huang", "Qiao", "Qiao", "Yao", "Zao", "Ti", null, "Zan", "Zan", "Zu", "Pa", "Bao", "Ku", "Ke", "Dun", "Jue", "Fu", "Chen", "Jian", "Fang", "Zhi", "Sa", "Yue", "Pa", "Qi", "Yue", "Qiang", "Tuo", "Tai", "Yi", "Nian", "Ling", "Mei", "Ba", "Die", "Ku", "Tuo", "Jia", "Ci", "Pao", "Qia", "Zhu", "Ju", "Die", "Zhi", "Fu", "Pan", "Ju", "Shan", "Bo", "Ni", "Ju", "Li", "Gen", "Yi", "Ji", "Dai", "Xian", "Jiao", "Duo", "Zhu", "Zhuan", "Kua", "Zhuai", "Gui", "Qiong", "Kui", "Xiang", "Chi", "Lu", "Beng", "Zhi", "Jia", "Tiao", "Cai", "Jian", "Ta", "Qiao", "Bi", "Xian", "Duo", "Ji", "Ju", "Ji", "Shu", "Tu"], Po = ["Chu", "Jing", "Nie", "Xiao", "Bo", "Chi", "Qun", "Mou", "Shu", "Lang", "Yong", "Jiao", "Chou", "Qiao", null, "Ta", "Jian", "Qi", "Wo", "Wei", "Zhuo", "Jie", "Ji", "Nie", "Ju", "Ju", "Lun", "Lu", "Leng", "Huai", "Ju", "Chi", "Wan", "Quan", "Ti", "Bo", "Zu", "Qie", "Ji", "Cu", "Zong", "Cai", "Zong", "Peng", "Zhi", "Zheng", "Dian", "Zhi", "Yu", "Duo", "Dun", "Chun", "Yong", "Zhong", "Di", "Zhe", "Chen", "Chuai", "Jian", "Gua", "Tang", "Ju", "Fu", "Zu", "Die", "Pian", "Rou", "Nuo", "Ti", "Cha", "Tui", "Jian", "Dao", "Cuo", "Xi", "Ta", "Qiang", "Zhan", "Dian", "Ti", "Ji", "Nie", "Man", "Liu", "Zhan", "Bi", "Chong", "Lu", "Liao", "Cu", "Tang", "Dai", "Suo", "Xi", "Kui", "Ji", "Zhi", "Qiang", "Di", "Man", "Zong", "Lian", "Beng", "Zao", "Nian", "Bie", "Tui", "Ju", "Deng", "Ceng", "Xian", "Fan", "Chu", "Zhong", "Dun", "Bo", "Cu", "Zu", "Jue", "Jue", "Lin", "Ta", "Qiao", "Qiao", "Pu", "Liao", "Dun", "Cuan", "Kuang", "Zao", "Ta", "Bi", "Bi", "Zhu", "Ju", "Chu", "Qiao", "Dun", "Chou", "Ji", "Wu", "Yue", "Nian", "Lin", "Lie", "Zhi", "Li", "Zhi", "Chan", "Chu", "Duan", "Wei", "Long", "Lin", "Xian", "Wei", "Zuan", "Lan", "Xie", "Rang", "Xie", "Nie", "Ta", "Qu", "Jie", "Cuan", "Zuan", "Xi", "Kui", "Jue", "Lin", "Shen", "Gong", "Dan", "Segare", "Qu", "Ti", "Duo", "Duo", "Gong", "Lang", "Nerau", "Luo", "Ai", "Ji", "Ju", "Tang", "Utsuke", null, "Yan", "Shitsuke", "Kang", "Qu", "Lou", "Lao", "Tuo", "Zhi", "Yagate", "Ti", "Dao", "Yagate", "Yu", "Che", "Ya", "Gui", "Jun", "Wei", "Yue", "Xin", "Di", "Xuan", "Fan", "Ren", "Shan", "Qiang", "Shu", "Tun", "Chen", "Dai", "E", "Na", "Qi", "Mao", "Ruan", "Ren", "Fan", "Zhuan", "Hong", "Hu", "Qu", "Huang", "Di", "Ling", "Dai", "Ao", "Zhen", "Fan", "Kuang", "Ang", "Peng", "Bei", "Gu", "Ku", "Pao", "Zhu", "Rong", "E", "Ba", "Zhou", "Zhi", "Yao", "Ke", "Yi", "Qing", "Shi", "Ping"], Eo = ["Er", "Qiong", "Ju", "Jiao", "Guang", "Lu", "Kai", "Quan", "Zhou", "Zai", "Zhi", "She", "Liang", "Yu", "Shao", "You", "Huan", "Yun", "Zhe", "Wan", "Fu", "Qing", "Zhou", "Ni", "Ling", "Zhe", "Zhan", "Liang", "Zi", "Hui", "Wang", "Chuo", "Guo", "Kan", "Yi", "Peng", "Qian", "Gun", "Nian", "Pian", "Guan", "Bei", "Lun", "Pai", "Liang", "Ruan", "Rou", "Ji", "Yang", "Xian", "Chuan", "Cou", "Qun", "Ge", "You", "Hong", "Shu", "Fu", "Zi", "Fu", "Wen", "Ben", "Zhan", "Yu", "Wen", "Tao", "Gu", "Zhen", "Xia", "Yuan", "Lu", "Jiu", "Chao", "Zhuan", "Wei", "Hun", "Sori", "Che", "Jiao", "Zhan", "Pu", "Lao", "Fen", "Fan", "Lin", "Ge", "Se", "Kan", "Huan", "Yi", "Ji", "Dui", "Er", "Yu", "Xian", "Hong", "Lei", "Pei", "Li", "Li", "Lu", "Lin", "Che", "Ya", "Gui", "Xuan", "Di", "Ren", "Zhuan", "E", "Lun", "Ruan", "Hong", "Ku", "Ke", "Lu", "Zhou", "Zhi", "Yi", "Hu", "Zhen", "Li", "Yao", "Qing", "Shi", "Zai", "Zhi", "Jiao", "Zhou", "Quan", "Lu", "Jiao", "Zhe", "Fu", "Liang", "Nian", "Bei", "Hui", "Gun", "Wang", "Liang", "Chuo", "Zi", "Cou", "Fu", "Ji", "Wen", "Shu", "Pei", "Yuan", "Xia", "Zhan", "Lu", "Che", "Lin", "Xin", "Gu", "Ci", "Ci", "Pi", "Zui", "Bian", "La", "La", "Ci", "Xue", "Ban", "Bian", "Bian", "Bian", null, "Bian", "Ban", "Ci", "Bian", "Bian", "Chen", "Ru", "Nong", "Nong", "Zhen", "Chuo", "Chuo", "Suberu", "Reng", "Bian", "Bian", "Sip", "Ip", "Liao", "Da", "Chan", "Gan", "Qian", "Yu", "Yu", "Qi", "Xun", "Yi", "Guo", "Mai", "Qi", "Za", "Wang", "Jia", "Zhun", "Ying", "Ti", "Yun", "Jin", "Hang", "Ya", "Fan", "Wu", "Da", "E", "Huan", "Zhe", "Totemo", "Jin", "Yuan", "Wei", "Lian", "Chi", "Che", "Ni", "Tiao", "Zhi", "Yi", "Jiong", "Jia", "Chen", "Dai", "Er", "Di", "Po", "Wang", "Die", "Ze", "Tao", "Shu", "Tuo", "Kep", "Jing", "Hui", "Tong", "You", "Mi", "Beng", "Ji", "Nai", "Yi", "Jie", "Zhui", "Lie", "Xun"], Ko = ["Tui", "Song", "Gua", "Tao", "Pang", "Hou", "Ni", "Dun", "Jiong", "Xuan", "Xun", "Bu", "You", "Xiao", "Qiu", "Tou", "Zhu", "Qiu", "Di", "Di", "Tu", "Jing", "Ti", "Dou", "Yi", "Zhe", "Tong", "Guang", "Wu", "Shi", "Cheng", "Su", "Zao", "Qun", "Feng", "Lian", "Suo", "Hui", "Li", "Sako", "Lai", "Ben", "Cuo", "Jue", "Beng", "Huan", "Dai", "Lu", "You", "Zhou", "Jin", "Yu", "Chuo", "Kui", "Wei", "Ti", "Yi", "Da", "Yuan", "Luo", "Bi", "Nuo", "Yu", "Dang", "Sui", "Dun", "Sui", "Yan", "Chuan", "Chi", "Ti", "Yu", "Shi", "Zhen", "You", "Yun", "E", "Bian", "Guo", "E", "Xia", "Huang", "Qiu", "Dao", "Da", "Wei", "Appare", "Yi", "Gou", "Yao", "Chu", "Liu", "Xun", "Ta", "Di", "Chi", "Yuan", "Su", "Ta", "Qian", null, "Yao", "Guan", "Zhang", "Ao", "Shi", "Ce", "Chi", "Su", "Zao", "Zhe", "Dun", "Di", "Lou", "Chi", "Cuo", "Lin", "Zun", "Rao", "Qian", "Xuan", "Yu", "Yi", "Wu", "Liao", "Ju", "Shi", "Bi", "Yao", "Mai", "Xie", "Sui", "Huan", "Zhan", "Teng", "Er", "Miao", "Bian", "Bian", "La", "Li", "Yuan", "Yao", "Luo", "Li", "Yi", "Ting", "Deng", "Qi", "Yong", "Shan", "Han", "Yu", "Mang", "Ru", "Qiong", null, "Kuang", "Fu", "Kang", "Bin", "Fang", "Xing", "Na", "Xin", "Shen", "Bang", "Yuan", "Cun", "Huo", "Xie", "Bang", "Wu", "Ju", "You", "Han", "Tai", "Qiu", "Bi", "Pei", "Bing", "Shao", "Bei", "Wa", "Di", "Zou", "Ye", "Lin", "Kuang", "Gui", "Zhu", "Shi", "Ku", "Yu", "Gai", "Ge", "Xi", "Zhi", "Ji", "Xun", "Hou", "Xing", "Jiao", "Xi", "Gui", "Nuo", "Lang", "Jia", "Kuai", "Zheng", "Otoko", "Yun", "Yan", "Cheng", "Dou", "Chi", "Lu", "Fu", "Wu", "Fu", "Gao", "Hao", "Lang", "Jia", "Geng", "Jun", "Ying", "Bo", "Xi", "Bei", "Li", "Yun", "Bu", "Xiao", "Qi", "Pi", "Qing", "Guo", "Zhou", "Tan", "Zou", "Ping", "Lai", "Ni", "Chen", "You", "Bu", "Xiang", "Dan", "Ju", "Yong", "Qiao", "Yi", "Du", "Yan", "Mei"], Wo = ["Ruo", "Bei", "E", "Yu", "Juan", "Yu", "Yun", "Hou", "Kui", "Xiang", "Xiang", "Sou", "Tang", "Ming", "Xi", "Ru", "Chu", "Zi", "Zou", "Ju", "Wu", "Xiang", "Yun", "Hao", "Yong", "Bi", "Mo", "Chao", "Fu", "Liao", "Yin", "Zhuan", "Hu", "Qiao", "Yan", "Zhang", "Fan", "Qiao", "Xu", "Deng", "Bi", "Xin", "Bi", "Ceng", "Wei", "Zheng", "Mao", "Shan", "Lin", "Po", "Dan", "Meng", "Ye", "Cao", "Kuai", "Feng", "Meng", "Zou", "Kuang", "Lian", "Zan", "Chan", "You", "Qi", "Yan", "Chan", "Zan", "Ling", "Huan", "Xi", "Feng", "Zan", "Li", "You", "Ding", "Qiu", "Zhuo", "Pei", "Zhou", "Yi", "Hang", "Yu", "Jiu", "Yan", "Zui", "Mao", "Dan", "Xu", "Tou", "Zhen", "Fen", "Sakenomoto", null, "Yun", "Tai", "Tian", "Qia", "Tuo", "Zuo", "Han", "Gu", "Su", "Po", "Chou", "Zai", "Ming", "Luo", "Chuo", "Chou", "You", "Tong", "Zhi", "Xian", "Jiang", "Cheng", "Yin", "Tu", "Xiao", "Mei", "Ku", "Suan", "Lei", "Pu", "Zui", "Hai", "Yan", "Xi", "Niang", "Wei", "Lu", "Lan", "Yan", "Tao", "Pei", "Zhan", "Chun", "Tan", "Zui", "Chuo", "Cu", "Kun", "Ti", "Mian", "Du", "Hu", "Xu", "Xing", "Tan", "Jiu", "Chun", "Yun", "Po", "Ke", "Sou", "Mi", "Quan", "Chou", "Cuo", "Yun", "Yong", "Ang", "Zha", "Hai", "Tang", "Jiang", "Piao", "Shan", "Yu", "Li", "Zao", "Lao", "Yi", "Jiang", "Pu", "Jiao", "Xi", "Tan", "Po", "Nong", "Yi", "Li", "Ju", "Jiao", "Yi", "Niang", "Ru", "Xun", "Chou", "Yan", "Ling", "Mi", "Mi", "Niang", "Xin", "Jiao", "Xi", "Mi", "Yan", "Bian", "Cai", "Shi", "You", "Shi", "Shi", "Li", "Chong", "Ye", "Liang", "Li", "Jin", "Jin", "Qiu", "Yi", "Diao", "Dao", "Zhao", "Ding", "Po", "Qiu", "He", "Fu", "Zhen", "Zhi", "Ba", "Luan", "Fu", "Nai", "Diao", "Shan", "Qiao", "Kou", "Chuan", "Zi", "Fan", "Yu", "Hua", "Han", "Gong", "Qi", "Mang", "Ri", "Di", "Si", "Xi", "Yi", "Chai", "Shi", "Tu", "Xi", "Nu", "Qian", "Ishiyumi", "Jian", "Pi", "Ye", "Yin"], Ro = ["Ba", "Fang", "Chen", "Xing", "Tou", "Yue", "Yan", "Fu", "Pi", "Na", "Xin", "E", "Jue", "Dun", "Gou", "Yin", "Qian", "Ban", "Ji", "Ren", "Chao", "Niu", "Fen", "Yun", "Ji", "Qin", "Pi", "Guo", "Hong", "Yin", "Jun", "Shi", "Yi", "Zhong", "Nie", "Gai", "Ri", "Huo", "Tai", "Kang", "Habaki", "Irori", "Ngaak", null, "Duo", "Zi", "Ni", "Tu", "Shi", "Min", "Gu", "E", "Ling", "Bing", "Yi", "Gu", "Ba", "Pi", "Yu", "Si", "Zuo", "Bu", "You", "Dian", "Jia", "Zhen", "Shi", "Shi", "Tie", "Ju", "Zhan", "Shi", "She", "Xuan", "Zhao", "Bao", "He", "Bi", "Sheng", "Chu", "Shi", "Bo", "Zhu", "Chi", "Za", "Po", "Tong", "Qian", "Fu", "Zhai", "Liu", "Qian", "Fu", "Li", "Yue", "Pi", "Yang", "Ban", "Bo", "Jie", "Gou", "Shu", "Zheng", "Mu", "Ni", "Nie", "Di", "Jia", "Mu", "Dan", "Shen", "Yi", "Si", "Kuang", "Ka", "Bei", "Jian", "Tong", "Xing", "Hong", "Jiao", "Chi", "Er", "Ge", "Bing", "Shi", "Mou", "Jia", "Yin", "Jun", "Zhou", "Chong", "Shang", "Tong", "Mo", "Lei", "Ji", "Yu", "Xu", "Ren", "Zun", "Zhi", "Qiong", "Shan", "Chi", "Xian", "Xing", "Quan", "Pi", "Tie", "Zhu", "Hou", "Ming", "Kua", "Yao", "Xian", "Xian", "Xiu", "Jun", "Cha", "Lao", "Ji", "Pi", "Ru", "Mi", "Yi", "Yin", "Guang", "An", "Diou", "You", "Se", "Kao", "Qian", "Luan", "Kasugai", "Ai", "Diao", "Han", "Rui", "Shi", "Keng", "Qiu", "Xiao", "Zhe", "Xiu", "Zang", "Ti", "Cuo", "Gua", "Gong", "Zhong", "Dou", "Lu", "Mei", "Lang", "Wan", "Xin", "Yun", "Bei", "Wu", "Su", "Yu", "Chan", "Ting", "Bo", "Han", "Jia", "Hong", "Cuan", "Feng", "Chan", "Wan", "Zhi", "Si", "Xuan", "Wu", "Wu", "Tiao", "Gong", "Zhuo", "Lue", "Xing", "Qian", "Shen", "Han", "Lue", "Xie", "Chu", "Zheng", "Ju", "Xian", "Tie", "Mang", "Pu", "Li", "Pan", "Rui", "Cheng", "Gao", "Li", "Te", "Pyeng", "Zhu", null, "Tu", "Liu", "Zui", "Ju", "Chang", "Yuan", "Jian", "Gang", "Diao", "Tao", "Chang"], Ao = ["Lun", "Kua", "Ling", "Bei", "Lu", "Li", "Qiang", "Pou", "Juan", "Min", "Zui", "Peng", "An", "Pi", "Xian", "Ya", "Zhui", "Lei", "A", "Kong", "Ta", "Kun", "Du", "Wei", "Chui", "Zi", "Zheng", "Ben", "Nie", "Cong", "Qun", "Tan", "Ding", "Qi", "Qian", "Zhuo", "Qi", "Yu", "Jin", "Guan", "Mao", "Chang", "Tian", "Xi", "Lian", "Tao", "Gu", "Cuo", "Shu", "Zhen", "Lu", "Meng", "Lu", "Hua", "Biao", "Ga", "Lai", "Ken", "Kazari", "Bu", "Nai", "Wan", "Zan", null, "De", "Xian", null, "Huo", "Liang", null, "Men", "Kai", "Ying", "Di", "Lian", "Guo", "Xian", "Du", "Tu", "Wei", "Cong", "Fu", "Rou", "Ji", "E", "Rou", "Chen", "Ti", "Zha", "Hong", "Yang", "Duan", "Xia", "Yu", "Keng", "Xing", "Huang", "Wei", "Fu", "Zhao", "Cha", "Qie", "She", "Hong", "Kui", "Tian", "Mou", "Qiao", "Qiao", "Hou", "Tou", "Cong", "Huan", "Ye", "Min", "Jian", "Duan", "Jian", "Song", "Kui", "Hu", "Xuan", "Duo", "Jie", "Zhen", "Bian", "Zhong", "Zi", "Xiu", "Ye", "Mei", "Pai", "Ai", "Jie", null, "Mei", "Chuo", "Ta", "Bang", "Xia", "Lian", "Suo", "Xi", "Liu", "Zu", "Ye", "Nou", "Weng", "Rong", "Tang", "Suo", "Qiang", "Ge", "Shuo", "Chui", "Bo", "Pan", "Sa", "Bi", "Sang", "Gang", "Zi", "Wu", "Ying", "Huang", "Tiao", "Liu", "Kai", "Sun", "Sha", "Sou", "Wan", "Hao", "Zhen", "Zhen", "Luo", "Yi", "Yuan", "Tang", "Nie", "Xi", "Jia", "Ge", "Ma", "Juan", "Kasugai", "Habaki", "Suo", null, null, null, "Na", "Lu", "Suo", "Ou", "Zu", "Tuan", "Xiu", "Guan", "Xuan", "Lian", "Shou", "Ao", "Man", "Mo", "Luo", "Bi", "Wei", "Liu", "Di", "Qiao", "Cong", "Yi", "Lu", "Ao", "Keng", "Qiang", "Cui", "Qi", "Chang", "Tang", "Man", "Yong", "Chan", "Feng", "Jing", "Biao", "Shu", "Lou", "Xiu", "Cong", "Long", "Zan", "Jian", "Cao", "Li", "Xia", "Xi", "Kang", null, "Beng", null, null, "Zheng", "Lu", "Hua", "Ji", "Pu", "Hui", "Qiang", "Po", "Lin", "Suo", "Xiu", "San", "Cheng"], zo = ["Kui", "Si", "Liu", "Nao", "Heng", "Pie", "Sui", "Fan", "Qiao", "Quan", "Yang", "Tang", "Xiang", "Jue", "Jiao", "Zun", "Liao", "Jie", "Lao", "Dui", "Tan", "Zan", "Ji", "Jian", "Zhong", "Deng", "Ya", "Ying", "Dui", "Jue", "Nou", "Ti", "Pu", "Tie", null, null, "Ding", "Shan", "Kai", "Jian", "Fei", "Sui", "Lu", "Juan", "Hui", "Yu", "Lian", "Zhuo", "Qiao", "Qian", "Zhuo", "Lei", "Bi", "Tie", "Huan", "Ye", "Duo", "Guo", "Dang", "Ju", "Fen", "Da", "Bei", "Yi", "Ai", "Zong", "Xun", "Diao", "Zhu", "Heng", "Zhui", "Ji", "Nie", "Ta", "Huo", "Qing", "Bin", "Ying", "Kui", "Ning", "Xu", "Jian", "Jian", "Yari", "Cha", "Zhi", "Mie", "Li", "Lei", "Ji", "Zuan", "Kuang", "Shang", "Peng", "La", "Du", "Shuo", "Chuo", "Lu", "Biao", "Bao", "Lu", null, null, "Long", "E", "Lu", "Xin", "Jian", "Lan", "Bo", "Jian", "Yao", "Chan", "Xiang", "Jian", "Xi", "Guan", "Cang", "Nie", "Lei", "Cuan", "Qu", "Pan", "Luo", "Zuan", "Luan", "Zao", "Nie", "Jue", "Tang", "Shu", "Lan", "Jin", "Qiu", "Yi", "Zhen", "Ding", "Zhao", "Po", "Diao", "Tu", "Qian", "Chuan", "Shan", "Ji", "Fan", "Diao", "Men", "Nu", "Xi", "Chai", "Xing", "Gai", "Bu", "Tai", "Ju", "Dun", "Chao", "Zhong", "Na", "Bei", "Gang", "Ban", "Qian", "Yao", "Qin", "Jun", "Wu", "Gou", "Kang", "Fang", "Huo", "Tou", "Niu", "Ba", "Yu", "Qian", "Zheng", "Qian", "Gu", "Bo", "E", "Po", "Bu", "Ba", "Yue", "Zuan", "Mu", "Dan", "Jia", "Dian", "You", "Tie", "Bo", "Ling", "Shuo", "Qian", "Liu", "Bao", "Shi", "Xuan", "She", "Bi", "Ni", "Pi", "Duo", "Xing", "Kao", "Lao", "Er", "Mang", "Ya", "You", "Cheng", "Jia", "Ye", "Nao", "Zhi", "Dang", "Tong", "Lu", "Diao", "Yin", "Kai", "Zha", "Zhu", "Xian", "Ting", "Diu", "Xian", "Hua", "Quan", "Sha", "Jia", "Yao", "Ge", "Ming", "Zheng", "Se", "Jiao", "Yi", "Chan", "Chong", "Tang", "An", "Yin", "Ru", "Zhu", "Lao", "Pu", "Wu", "Lai", "Te", "Lian", "Keng"], Oo = ["Xiao", "Suo", "Li", "Zheng", "Chu", "Guo", "Gao", "Tie", "Xiu", "Cuo", "Lue", "Feng", "Xin", "Liu", "Kai", "Jian", "Rui", "Ti", "Lang", "Qian", "Ju", "A", "Qiang", "Duo", "Tian", "Cuo", "Mao", "Ben", "Qi", "De", "Kua", "Kun", "Chang", "Xi", "Gu", "Luo", "Chui", "Zhui", "Jin", "Zhi", "Xian", "Juan", "Huo", "Pou", "Tan", "Ding", "Jian", "Ju", "Meng", "Zi", "Qie", "Ying", "Kai", "Qiang", "Song", "E", "Cha", "Qiao", "Zhong", "Duan", "Sou", "Huang", "Huan", "Ai", "Du", "Mei", "Lou", "Zi", "Fei", "Mei", "Mo", "Zhen", "Bo", "Ge", "Nie", "Tang", "Juan", "Nie", "Na", "Liu", "Hao", "Bang", "Yi", "Jia", "Bin", "Rong", "Biao", "Tang", "Man", "Luo", "Beng", "Yong", "Jing", "Di", "Zu", "Xuan", "Liu", "Tan", "Jue", "Liao", "Pu", "Lu", "Dui", "Lan", "Pu", "Cuan", "Qiang", "Deng", "Huo", "Lei", "Huan", "Zhuo", "Lian", "Yi", "Cha", "Biao", "La", "Chan", "Xiang", "Chang", "Chang", "Jiu", "Ao", "Die", "Qu", "Liao", "Mi", "Chang", "Men", "Ma", "Shuan", "Shan", "Huo", "Men", "Yan", "Bi", "Han", "Bi", "San", "Kai", "Kang", "Beng", "Hong", "Run", "San", "Xian", "Xian", "Jian", "Min", "Xia", "Yuru", "Dou", "Zha", "Nao", "Jian", "Peng", "Xia", "Ling", "Bian", "Bi", "Run", "He", "Guan", "Ge", "Ge", "Fa", "Chu", "Hong", "Gui", "Min", "Se", "Kun", "Lang", "Lu", "Ting", "Sha", "Ju", "Yue", "Yue", "Chan", "Qu", "Lin", "Chang", "Shai", "Kun", "Yan", "Min", "Yan", "E", "Hun", "Yu", "Wen", "Xiang", "Bao", "Xiang", "Qu", "Yao", "Wen", "Ban", "An", "Wei", "Yin", "Kuo", "Que", "Lan", "Du", null, "Phwung", "Tian", "Nie", "Ta", "Kai", "He", "Que", "Chuang", "Guan", "Dou", "Qi", "Kui", "Tang", "Guan", "Piao", "Kan", "Xi", "Hui", "Chan", "Pi", "Dang", "Huan", "Ta", "Wen", null, "Men", "Shuan", "Shan", "Yan", "Han", "Bi", "Wen", "Chuang", "Run", "Wei", "Xian", "Hong", "Jian", "Min", "Kang", "Men", "Zha", "Nao", "Gui", "Wen", "Ta", "Min", "Lu", "Kai"], jo = ["Fa", "Ge", "He", "Kun", "Jiu", "Yue", "Lang", "Du", "Yu", "Yan", "Chang", "Xi", "Wen", "Hun", "Yan", "E", "Chan", "Lan", "Qu", "Hui", "Kuo", "Que", "Ge", "Tian", "Ta", "Que", "Kan", "Huan", "Fu", "Fu", "Le", "Dui", "Xin", "Qian", "Wu", "Yi", "Tuo", "Yin", "Yang", "Dou", "E", "Sheng", "Ban", "Pei", "Keng", "Yun", "Ruan", "Zhi", "Pi", "Jing", "Fang", "Yang", "Yin", "Zhen", "Jie", "Cheng", "E", "Qu", "Di", "Zu", "Zuo", "Dian", "Ling", "A", "Tuo", "Tuo", "Po", "Bing", "Fu", "Ji", "Lu", "Long", "Chen", "Xing", "Duo", "Lou", "Mo", "Jiang", "Shu", "Duo", "Xian", "Er", "Gui", "Yu", "Gai", "Shan", "Xun", "Qiao", "Xing", "Chun", "Fu", "Bi", "Xia", "Shan", "Sheng", "Zhi", "Pu", "Dou", "Yuan", "Zhen", "Chu", "Xian", "Tou", "Nie", "Yun", "Xian", "Pei", "Pei", "Zou", "Yi", "Dui", "Lun", "Yin", "Ju", "Chui", "Chen", "Pi", "Ling", "Tao", "Xian", "Lu", "Sheng", "Xian", "Yin", "Zhu", "Yang", "Reng", "Shan", "Chong", "Yan", "Yin", "Yu", "Ti", "Yu", "Long", "Wei", "Wei", "Nie", "Dui", "Sui", "An", "Huang", "Jie", "Sui", "Yin", "Gai", "Yan", "Hui", "Ge", "Yun", "Wu", "Wei", "Ai", "Xi", "Tang", "Ji", "Zhang", "Dao", "Ao", "Xi", "Yin", null, "Rao", "Lin", "Tui", "Deng", "Pi", "Sui", "Sui", "Yu", "Xian", "Fen", "Ni", "Er", "Ji", "Dao", "Xi", "Yin", "E", "Hui", "Long", "Xi", "Li", "Li", "Li", "Zhui", "He", "Zhi", "Zhun", "Jun", "Nan", "Yi", "Que", "Yan", "Qian", "Ya", "Xiong", "Ya", "Ji", "Gu", "Huan", "Zhi", "Gou", "Jun", "Ci", "Yong", "Ju", "Chu", "Hu", "Za", "Luo", "Yu", "Chou", "Diao", "Sui", "Han", "Huo", "Shuang", "Guan", "Chu", "Za", "Yong", "Ji", "Xi", "Chou", "Liu", "Li", "Nan", "Xue", "Za", "Ji", "Ji", "Yu", "Yu", "Xue", "Na", "Fou", "Se", "Mu", "Wen", "Fen", "Pang", "Yun", "Li", "Li", "Ang", "Ling", "Lei", "An", "Bao", "Meng", "Dian", "Dang", "Xing", "Wu", "Zhao"], Io = ["Xu", "Ji", "Mu", "Chen", "Xiao", "Zha", "Ting", "Zhen", "Pei", "Mei", "Ling", "Qi", "Chou", "Huo", "Sha", "Fei", "Weng", "Zhan", "Yin", "Ni", "Chou", "Tun", "Lin", null, "Dong", "Ying", "Wu", "Ling", "Shuang", "Ling", "Xia", "Hong", "Yin", "Mo", "Mai", "Yun", "Liu", "Meng", "Bin", "Wu", "Wei", "Huo", "Yin", "Xi", "Yi", "Ai", "Dan", "Deng", "Xian", "Yu", "Lu", "Long", "Dai", "Ji", "Pang", "Yang", "Ba", "Pi", "Wei", null, "Xi", "Ji", "Mai", "Meng", "Meng", "Lei", "Li", "Huo", "Ai", "Fei", "Dai", "Long", "Ling", "Ai", "Feng", "Li", "Bao", null, "He", "He", "Bing", "Qing", "Qing", "Jing", "Tian", "Zhen", "Jing", "Cheng", "Qing", "Jing", "Jing", "Dian", "Jing", "Tian", "Fei", "Fei", "Kao", "Mi", "Mian", "Mian", "Pao", "Ye", "Tian", "Hui", "Ye", "Ge", "Ding", "Cha", "Jian", "Ren", "Di", "Du", "Wu", "Ren", "Qin", "Jin", "Xue", "Niu", "Ba", "Yin", "Sa", "Na", "Mo", "Zu", "Da", "Ban", "Yi", "Yao", "Tao", "Tuo", "Jia", "Hong", "Pao", "Yang", "Tomo", "Yin", "Jia", "Tao", "Ji", "Xie", "An", "An", "Hen", "Gong", "Kohaze", "Da", "Qiao", "Ting", "Wan", "Ying", "Sui", "Tiao", "Qiao", "Xuan", "Kong", "Beng", "Ta", "Zhang", "Bing", "Kuo", "Ju", "La", "Xie", "Rou", "Bang", "Yi", "Qiu", "Qiu", "He", "Xiao", "Mu", "Ju", "Jian", "Bian", "Di", "Jian", "On", "Tao", "Gou", "Ta", "Bei", "Xie", "Pan", "Ge", "Bi", "Kuo", "Tang", "Lou", "Gui", "Qiao", "Xue", "Ji", "Jian", "Jiang", "Chan", "Da", "Huo", "Xian", "Qian", "Du", "Wa", "Jian", "Lan", "Wei", "Ren", "Fu", "Mei", "Juan", "Ge", "Wei", "Qiao", "Han", "Chang", null, "Rou", "Xun", "She", "Wei", "Ge", "Bei", "Tao", "Gou", "Yun", null, "Bi", "Wei", "Hui", "Du", "Wa", "Du", "Wei", "Ren", "Fu", "Han", "Wei", "Yun", "Tao", "Jiu", "Jiu", "Xian", "Xie", "Xian", "Ji", "Yin", "Za", "Yun", "Shao", "Le", "Peng", "Heng", "Ying", "Yun", "Peng", "Yin", "Yin", "Xiang"], Uo = ["Hu", "Ye", "Ding", "Qing", "Pan", "Xiang", "Shun", "Han", "Xu", "Yi", "Xu", "Gu", "Song", "Kui", "Qi", "Hang", "Yu", "Wan", "Ban", "Dun", "Di", "Dan", "Pan", "Po", "Ling", "Ce", "Jing", "Lei", "He", "Qiao", "E", "E", "Wei", "Jie", "Gua", "Shen", "Yi", "Shen", "Hai", "Dui", "Pian", "Ping", "Lei", "Fu", "Jia", "Tou", "Hui", "Kui", "Jia", "Le", "Tian", "Cheng", "Ying", "Jun", "Hu", "Han", "Jing", "Tui", "Tui", "Pin", "Lai", "Tui", "Zi", "Zi", "Chui", "Ding", "Lai", "Yan", "Han", "Jian", "Ke", "Cui", "Jiong", "Qin", "Yi", "Sai", "Ti", "E", "E", "Yan", "Hun", "Kan", "Yong", "Zhuan", "Yan", "Xian", "Xin", "Yi", "Yuan", "Sang", "Dian", "Dian", "Jiang", "Ku", "Lei", "Liao", "Piao", "Yi", "Man", "Qi", "Rao", "Hao", "Qiao", "Gu", "Xun", "Qian", "Hui", "Zhan", "Ru", "Hong", "Bin", "Xian", "Pin", "Lu", "Lan", "Nie", "Quan", "Ye", "Ding", "Qing", "Han", "Xiang", "Shun", "Xu", "Xu", "Wan", "Gu", "Dun", "Qi", "Ban", "Song", "Hang", "Yu", "Lu", "Ling", "Po", "Jing", "Jie", "Jia", "Tian", "Han", "Ying", "Jiong", "Hai", "Yi", "Pin", "Hui", "Tui", "Han", "Ying", "Ying", "Ke", "Ti", "Yong", "E", "Zhuan", "Yan", "E", "Nie", "Man", "Dian", "Sang", "Hao", "Lei", "Zhan", "Ru", "Pin", "Quan", "Feng", "Biao", "Oroshi", "Fu", "Xia", "Zhan", "Biao", "Sa", "Ba", "Tai", "Lie", "Gua", "Xuan", "Shao", "Ju", "Bi", "Si", "Wei", "Yang", "Yao", "Sou", "Kai", "Sao", "Fan", "Liu", "Xi", "Liao", "Piao", "Piao", "Liu", "Biao", "Biao", "Biao", "Liao", null, "Se", "Feng", "Biao", "Feng", "Yang", "Zhan", "Biao", "Sa", "Ju", "Si", "Sou", "Yao", "Liu", "Piao", "Biao", "Biao", "Fei", "Fan", "Fei", "Fei", "Shi", "Shi", "Can", "Ji", "Ding", "Si", "Tuo", "Zhan", "Sun", "Xiang", "Tun", "Ren", "Yu", "Juan", "Chi", "Yin", "Fan", "Fan", "Sun", "Yin", "Zhu", "Yi", "Zhai", "Bi", "Jie", "Tao", "Liu", "Ci", "Tie", "Si", "Bao", "Shi", "Duo"], $o = ["Hai", "Ren", "Tian", "Jiao", "Jia", "Bing", "Yao", "Tong", "Ci", "Xiang", "Yang", "Yang", "Er", "Yan", "Le", "Yi", "Can", "Bo", "Nei", "E", "Bu", "Jun", "Dou", "Su", "Yu", "Shi", "Yao", "Hun", "Guo", "Shi", "Jian", "Zhui", "Bing", "Xian", "Bu", "Ye", "Tan", "Fei", "Zhang", "Wei", "Guan", "E", "Nuan", "Hun", "Hu", "Huang", "Tie", "Hui", "Jian", "Hou", "He", "Xing", "Fen", "Wei", "Gu", "Cha", "Song", "Tang", "Bo", "Gao", "Xi", "Kui", "Liu", "Sou", "Tao", "Ye", "Yun", "Mo", "Tang", "Man", "Bi", "Yu", "Xiu", "Jin", "San", "Kui", "Zhuan", "Shan", "Chi", "Dan", "Yi", "Ji", "Rao", "Cheng", "Yong", "Tao", "Hui", "Xiang", "Zhan", "Fen", "Hai", "Meng", "Yan", "Mo", "Chan", "Xiang", "Luo", "Zuan", "Nang", "Shi", "Ding", "Ji", "Tuo", "Xing", "Tun", "Xi", "Ren", "Yu", "Chi", "Fan", "Yin", "Jian", "Shi", "Bao", "Si", "Duo", "Yi", "Er", "Rao", "Xiang", "Jia", "Le", "Jiao", "Yi", "Bing", "Bo", "Dou", "E", "Yu", "Nei", "Jun", "Guo", "Hun", "Xian", "Guan", "Cha", "Kui", "Gu", "Sou", "Chan", "Ye", "Mo", "Bo", "Liu", "Xiu", "Jin", "Man", "San", "Zhuan", "Nang", "Shou", "Kui", "Guo", "Xiang", "Fen", "Ba", "Ni", "Bi", "Bo", "Tu", "Han", "Fei", "Jian", "An", "Ai", "Fu", "Xian", "Wen", "Xin", "Fen", "Bin", "Xing", "Ma", "Yu", "Feng", "Han", "Di", "Tuo", "Tuo", "Chi", "Xun", "Zhu", "Zhi", "Pei", "Xin", "Ri", "Sa", "Yin", "Wen", "Zhi", "Dan", "Lu", "You", "Bo", "Bao", "Kuai", "Tuo", "Yi", "Qu", null, "Qu", "Jiong", "Bo", "Zhao", "Yuan", "Peng", "Zhou", "Ju", "Zhu", "Nu", "Ju", "Pi", "Zang", "Jia", "Ling", "Zhen", "Tai", "Fu", "Yang", "Shi", "Bi", "Tuo", "Tuo", "Si", "Liu", "Ma", "Pian", "Tao", "Zhi", "Rong", "Teng", "Dong", "Xun", "Quan", "Shen", "Jiong", "Er", "Hai", "Bo", "Zhu", "Yin", "Luo", "Shuu", "Dan", "Xie", "Liu", "Ju", "Song", "Qin", "Mang", "Liang", "Han", "Tu", "Xuan", "Tui", "Jun"], qo = ["E", "Cheng", "Xin", "Ai", "Lu", "Zhui", "Zhou", "She", "Pian", "Kun", "Tao", "Lai", "Zong", "Ke", "Qi", "Qi", "Yan", "Fei", "Sao", "Yan", "Jie", "Yao", "Wu", "Pian", "Cong", "Pian", "Qian", "Fei", "Huang", "Jian", "Huo", "Yu", "Ti", "Quan", "Xia", "Zong", "Kui", "Rou", "Si", "Gua", "Tuo", "Kui", "Sou", "Qian", "Cheng", "Zhi", "Liu", "Pang", "Teng", "Xi", "Cao", "Du", "Yan", "Yuan", "Zou", "Sao", "Shan", "Li", "Zhi", "Shuang", "Lu", "Xi", "Luo", "Zhang", "Mo", "Ao", "Can", "Piao", "Cong", "Qu", "Bi", "Zhi", "Yu", "Xu", "Hua", "Bo", "Su", "Xiao", "Lin", "Chan", "Dun", "Liu", "Tuo", "Zeng", "Tan", "Jiao", "Tie", "Yan", "Luo", "Zhan", "Jing", "Yi", "Ye", "Tuo", "Bin", "Zou", "Yan", "Peng", "Lu", "Teng", "Xiang", "Ji", "Shuang", "Ju", "Xi", "Huan", "Li", "Biao", "Ma", "Yu", "Tuo", "Xun", "Chi", "Qu", "Ri", "Bo", "Lu", "Zang", "Shi", "Si", "Fu", "Ju", "Zou", "Zhu", "Tuo", "Nu", "Jia", "Yi", "Tai", "Xiao", "Ma", "Yin", "Jiao", "Hua", "Luo", "Hai", "Pian", "Biao", "Li", "Cheng", "Yan", "Xin", "Qin", "Jun", "Qi", "Qi", "Ke", "Zhui", "Zong", "Su", "Can", "Pian", "Zhi", "Kui", "Sao", "Wu", "Ao", "Liu", "Qian", "Shan", "Piao", "Luo", "Cong", "Chan", "Zou", "Ji", "Shuang", "Xiang", "Gu", "Wei", "Wei", "Wei", "Yu", "Gan", "Yi", "Ang", "Tou", "Xie", "Bao", "Bi", "Chi", "Ti", "Di", "Ku", "Hai", "Qiao", "Gou", "Kua", "Ge", "Tui", "Geng", "Pian", "Bi", "Ke", "Ka", "Yu", "Sui", "Lou", "Bo", "Xiao", "Pang", "Bo", "Ci", "Kuan", "Bin", "Mo", "Liao", "Lou", "Nao", "Du", "Zang", "Sui", "Ti", "Bin", "Kuan", "Lu", "Gao", "Gao", "Qiao", "Kao", "Qiao", "Lao", "Zao", "Biao", "Kun", "Kun", "Ti", "Fang", "Xiu", "Ran", "Mao", "Dan", "Kun", "Bin", "Fa", "Tiao", "Peng", "Zi", "Fa", "Ran", "Ti", "Pao", "Pi", "Mao", "Fu", "Er", "Rong", "Qu", "Gong", "Xiu", "Gua", "Ji", "Peng", "Zhua", "Shao", "Sha"], Vo = ["Ti", "Li", "Bin", "Zong", "Ti", "Peng", "Song", "Zheng", "Quan", "Zong", "Shun", "Jian", "Duo", "Hu", "La", "Jiu", "Qi", "Lian", "Zhen", "Bin", "Peng", "Mo", "San", "Man", "Man", "Seng", "Xu", "Lie", "Qian", "Qian", "Nong", "Huan", "Kuai", "Ning", "Bin", "Lie", "Rang", "Dou", "Dou", "Nao", "Hong", "Xi", "Dou", "Han", "Dou", "Dou", "Jiu", "Chang", "Yu", "Yu", "Li", "Juan", "Fu", "Qian", "Gui", "Zong", "Liu", "Gui", "Shang", "Yu", "Gui", "Mei", "Ji", "Qi", "Jie", "Kui", "Hun", "Ba", "Po", "Mei", "Xu", "Yan", "Xiao", "Liang", "Yu", "Tui", "Qi", "Wang", "Liang", "Wei", "Jian", "Chi", "Piao", "Bi", "Mo", "Ji", "Xu", "Chou", "Yan", "Zhan", "Yu", "Dao", "Ren", "Ji", "Eri", "Gong", "Tuo", "Diao", "Ji", "Xu", "E", "E", "Sha", "Hang", "Tun", "Mo", "Jie", "Shen", "Fan", "Yuan", "Bi", "Lu", "Wen", "Hu", "Lu", "Za", "Fang", "Fen", "Na", "You", "Namazu", "Todo", "He", "Xia", "Qu", "Han", "Pi", "Ling", "Tuo", "Bo", "Qiu", "Ping", "Fu", "Bi", "Ji", "Wei", "Ju", "Diao", "Bo", "You", "Gun", "Pi", "Nian", "Xing", "Tai", "Bao", "Fu", "Zha", "Ju", "Gu", "Kajika", "Tong", null, "Ta", "Jie", "Shu", "Hou", "Xiang", "Er", "An", "Wei", "Tiao", "Zhu", "Yin", "Lie", "Luo", "Tong", "Yi", "Qi", "Bing", "Wei", "Jiao", "Bu", "Gui", "Xian", "Ge", "Hui", "Bora", "Mate", "Kao", "Gori", "Duo", "Jun", "Ti", "Man", "Xiao", "Za", "Sha", "Qin", "Yu", "Nei", "Zhe", "Gun", "Geng", "Su", "Wu", "Qiu", "Ting", "Fu", "Wan", "You", "Li", "Sha", "Sha", "Gao", "Meng", "Ugui", "Asari", "Subashiri", "Kazunoko", "Yong", "Ni", "Zi", "Qi", "Qing", "Xiang", "Nei", "Chun", "Ji", "Diao", "Qie", "Gu", "Zhou", "Dong", "Lai", "Fei", "Ni", "Yi", "Kun", "Lu", "Jiu", "Chang", "Jing", "Lun", "Ling", "Zou", "Li", "Meng", "Zong", "Zhi", "Nian", "Shachi", "Dojou", "Sukesou", "Shi", "Shen", "Hun", "Shi", "Hou", "Xing", "Zhu", "La", "Zong", "Ji", "Bian", "Bian"], nl = ["Huan", "Quan", "Ze", "Wei", "Wei", "Yu", "Qun", "Rou", "Die", "Huang", "Lian", "Yan", "Qiu", "Qiu", "Jian", "Bi", "E", "Yang", "Fu", "Sai", "Jian", "Xia", "Tuo", "Hu", "Muroaji", "Ruo", "Haraka", "Wen", "Jian", "Hao", "Wu", "Fang", "Sao", "Liu", "Ma", "Shi", "Shi", "Yin", "Z", "Teng", "Ta", "Yao", "Ge", "Rong", "Qian", "Qi", "Wen", "Ruo", "Hatahata", "Lian", "Ao", "Le", "Hui", "Min", "Ji", "Tiao", "Qu", "Jian", "Sao", "Man", "Xi", "Qiu", "Biao", "Ji", "Ji", "Zhu", "Jiang", "Qiu", "Zhuan", "Yong", "Zhang", "Kang", "Xue", "Bie", "Jue", "Qu", "Xiang", "Bo", "Jiao", "Xun", "Su", "Huang", "Zun", "Shan", "Shan", "Fan", "Jue", "Lin", "Xun", "Miao", "Xi", "Eso", "Kyou", "Fen", "Guan", "Hou", "Kuai", "Zei", "Sao", "Zhan", "Gan", "Gui", "Sheng", "Li", "Chang", "Hatahata", "Shiira", "Mutsu", "Ru", "Ji", "Xu", "Huo", "Shiira", "Li", "Lie", "Li", "Mie", "Zhen", "Xiang", "E", "Lu", "Guan", "Li", "Xian", "Yu", "Dao", "Ji", "You", "Tun", "Lu", "Fang", "Ba", "He", "Bo", "Ping", "Nian", "Lu", "You", "Zha", "Fu", "Bo", "Bao", "Hou", "Pi", "Tai", "Gui", "Jie", "Kao", "Wei", "Er", "Tong", "Ze", "Hou", "Kuai", "Ji", "Jiao", "Xian", "Za", "Xiang", "Xun", "Geng", "Li", "Lian", "Jian", "Li", "Shi", "Tiao", "Gun", "Sha", "Wan", "Jun", "Ji", "Yong", "Qing", "Ling", "Qi", "Zou", "Fei", "Kun", "Chang", "Gu", "Ni", "Nian", "Diao", "Jing", "Shen", "Shi", "Zi", "Fen", "Die", "Bi", "Chang", "Shi", "Wen", "Wei", "Sai", "E", "Qiu", "Fu", "Huang", "Quan", "Jiang", "Bian", "Sao", "Ao", "Qi", "Ta", "Yin", "Yao", "Fang", "Jian", "Le", "Biao", "Xue", "Bie", "Man", "Min", "Yong", "Wei", "Xi", "Jue", "Shan", "Lin", "Zun", "Huo", "Gan", "Li", "Zhan", "Guan", "Niao", "Yi", "Fu", "Li", "Jiu", "Bu", "Yan", "Fu", "Diao", "Ji", "Feng", "Nio", "Gan", "Shi", "Feng", "Ming", "Bao", "Yuan", "Zhi", "Hu", "Qin", "Fu", "Fen", "Wen", "Jian", "Shi", "Yu"], il = ["Fou", "Yiao", "Jue", "Jue", "Pi", "Huan", "Zhen", "Bao", "Yan", "Ya", "Zheng", "Fang", "Feng", "Wen", "Ou", "Te", "Jia", "Nu", "Ling", "Mie", "Fu", "Tuo", "Wen", "Li", "Bian", "Zhi", "Ge", "Yuan", "Zi", "Qu", "Xiao", "Zhi", "Dan", "Ju", "You", "Gu", "Zhong", "Yu", "Yang", "Rong", "Ya", "Tie", "Yu", "Shigi", "Ying", "Zhui", "Wu", "Er", "Gua", "Ai", "Zhi", "Yan", "Heng", "Jiao", "Ji", "Lie", "Zhu", "Ren", "Yi", "Hong", "Luo", "Ru", "Mou", "Ge", "Ren", "Jiao", "Xiu", "Zhou", "Zhi", "Luo", "Chidori", "Toki", "Ten", "Luan", "Jia", "Ji", "Yu", "Huan", "Tuo", "Bu", "Wu", "Juan", "Yu", "Bo", "Xun", "Xun", "Bi", "Xi", "Jun", "Ju", "Tu", "Jing", "Ti", "E", "E", "Kuang", "Hu", "Wu", "Shen", "Lai", "Ikaruga", "Kakesu", "Lu", "Ping", "Shu", "Fu", "An", "Zhao", "Peng", "Qin", "Qian", "Bei", "Diao", "Lu", "Que", "Jian", "Ju", "Tu", "Ya", "Yuan", "Qi", "Li", "Ye", "Zhui", "Kong", "Zhui", "Kun", "Sheng", "Qi", "Jing", "Yi", "Yi", "Jing", "Zi", "Lai", "Dong", "Qi", "Chun", "Geng", "Ju", "Qu", "Isuka", "Kikuitadaki", "Ji", "Shu", null, "Chi", "Miao", "Rou", "An", "Qiu", "Ti", "Hu", "Ti", "E", "Jie", "Mao", "Fu", "Chun", "Tu", "Yan", "He", "Yuan", "Pian", "Yun", "Mei", "Hu", "Ying", "Dun", "Mu", "Ju", "Tsugumi", "Cang", "Fang", "Gu", "Ying", "Yuan", "Xuan", "Weng", "Shi", "He", "Chu", "Tang", "Xia", "Ruo", "Liu", "Ji", "Gu", "Jian", "Zhun", "Han", "Zi", "Zi", "Ni", "Yao", "Yan", "Ji", "Li", "Tian", "Kou", "Ti", "Ti", "Ni", "Tu", "Ma", "Jiao", "Gao", "Tian", "Chen", "Li", "Zhuan", "Zhe", "Ao", "Yao", "Yi", "Ou", "Chi", "Zhi", "Liao", "Rong", "Lou", "Bi", "Shuang", "Zhuo", "Yu", "Wu", "Jue", "Yin", "Quan", "Si", "Jiao", "Yi", "Hua", "Bi", "Ying", "Su", "Huang", "Fan", "Jiao", "Liao", "Yan", "Kao", "Jiu", "Xian", "Xian", "Tu", "Mai", "Zun", "Yu", "Ying", "Lu", "Tuan", "Xian", "Xue", "Yi", "Pi"], al = ["Shu", "Luo", "Qi", "Yi", "Ji", "Zhe", "Yu", "Zhan", "Ye", "Yang", "Pi", "Ning", "Huo", "Mi", "Ying", "Meng", "Di", "Yue", "Yu", "Lei", "Bao", "Lu", "He", "Long", "Shuang", "Yue", "Ying", "Guan", "Qu", "Li", "Luan", "Niao", "Jiu", "Ji", "Yuan", "Ming", "Shi", "Ou", "Ya", "Cang", "Bao", "Zhen", "Gu", "Dong", "Lu", "Ya", "Xiao", "Yang", "Ling", "Zhi", "Qu", "Yuan", "Xue", "Tuo", "Si", "Zhi", "Er", "Gua", "Xiu", "Heng", "Zhou", "Ge", "Luan", "Hong", "Wu", "Bo", "Li", "Juan", "Hu", "E", "Yu", "Xian", "Ti", "Wu", "Que", "Miao", "An", "Kun", "Bei", "Peng", "Qian", "Chun", "Geng", "Yuan", "Su", "Hu", "He", "E", "Gu", "Qiu", "Zi", "Mei", "Mu", "Ni", "Yao", "Weng", "Liu", "Ji", "Ni", "Jian", "He", "Yi", "Ying", "Zhe", "Liao", "Liao", "Jiao", "Jiu", "Yu", "Lu", "Xuan", "Zhan", "Ying", "Huo", "Meng", "Guan", "Shuang", "Lu", "Jin", "Ling", "Jian", "Xian", "Cuo", "Jian", "Jian", "Yan", "Cuo", "Lu", "You", "Cu", "Ji", "Biao", "Cu", "Biao", "Zhu", "Jun", "Zhu", "Jian", "Mi", "Mi", "Wu", "Liu", "Chen", "Jun", "Lin", "Ni", "Qi", "Lu", "Jiu", "Jun", "Jing", "Li", "Xiang", "Yan", "Jia", "Mi", "Li", "She", "Zhang", "Lin", "Jing", "Ji", "Ling", "Yan", "Cu", "Mai", "Mai", "Ge", "Chao", "Fu", "Mian", "Mian", "Fu", "Pao", "Qu", "Qu", "Mou", "Fu", "Xian", "Lai", "Qu", "Mian", null, "Feng", "Fu", "Qu", "Mian", "Ma", "Mo", "Mo", "Hui", "Ma", "Zou", "Nen", "Fen", "Huang", "Huang", "Jin", "Guang", "Tian", "Tou", "Heng", "Xi", "Kuang", "Heng", "Shu", "Li", "Nian", "Chi", "Hei", "Hei", "Yi", "Qian", "Dan", "Xi", "Tuan", "Mo", "Mo", "Qian", "Dai", "Chu", "You", "Dian", "Yi", "Xia", "Yan", "Qu", "Mei", "Yan", "Jing", "Yu", "Li", "Dang", "Du", "Can", "Yin", "An", "Yan", "Tan", "An", "Zhen", "Dai", "Can", "Yi", "Mei", "Dan", "Yan", "Du", "Lu", "Zhi", "Fen", "Fu", "Fu", "Min", "Min", "Yuan"], ul = ["Cu", "Qu", "Chao", "Wa", "Zhu", "Zhi", "Mang", "Ao", "Bie", "Tuo", "Bi", "Yuan", "Chao", "Tuo", "Ding", "Mi", "Nai", "Ding", "Zi", "Gu", "Gu", "Dong", "Fen", "Tao", "Yuan", "Pi", "Chang", "Gao", "Qi", "Yuan", "Tang", "Teng", "Shu", "Shu", "Fen", "Fei", "Wen", "Ba", "Diao", "Tuo", "Tong", "Qu", "Sheng", "Shi", "You", "Shi", "Ting", "Wu", "Nian", "Jing", "Hun", "Ju", "Yan", "Tu", "Ti", "Xi", "Xian", "Yan", "Lei", "Bi", "Yao", "Qiu", "Han", "Wu", "Wu", "Hou", "Xi", "Ge", "Zha", "Xiu", "Weng", "Zha", "Nong", "Nang", "Qi", "Zhai", "Ji", "Zi", "Ji", "Ji", "Qi", "Ji", "Chi", "Chen", "Chen", "He", "Ya", "Ken", "Xie", "Pao", "Cuo", "Shi", "Zi", "Chi", "Nian", "Ju", "Tiao", "Ling", "Ling", "Chu", "Quan", "Xie", "Ken", "Nie", "Jiu", "Yao", "Chuo", "Kun", "Yu", "Chu", "Yi", "Ni", "Cuo", "Zou", "Qu", "Nen", "Xian", "Ou", "E", "Wo", "Yi", "Chuo", "Zou", "Dian", "Chu", "Jin", "Ya", "Chi", "Chen", "He", "Ken", "Ju", "Ling", "Pao", "Tiao", "Zi", "Ken", "Yu", "Chuo", "Qu", "Wo", "Long", "Pang", "Gong", "Pang", "Yan", "Long", "Long", "Gong", "Kan", "Ta", "Ling", "Ta", "Long", "Gong", "Kan", "Gui", "Qiu", "Bie", "Gui", "Yue", "Chui", "He", "Jue", "Xie", "Yu"], el = ["it", "ix", "i", "ip", "iet", "iex", "ie", "iep", "at", "ax", "a", "ap", "uox", "uo", "uop", "ot", "ox", "o", "op", "ex", "e", "wu", "bit", "bix", "bi", "bip", "biet", "biex", "bie", "biep", "bat", "bax", "ba", "bap", "buox", "buo", "buop", "bot", "box", "bo", "bop", "bex", "be", "bep", "but", "bux", "bu", "bup", "burx", "bur", "byt", "byx", "by", "byp", "byrx", "byr", "pit", "pix", "pi", "pip", "piex", "pie", "piep", "pat", "pax", "pa", "pap", "puox", "puo", "puop", "pot", "pox", "po", "pop", "put", "pux", "pu", "pup", "purx", "pur", "pyt", "pyx", "py", "pyp", "pyrx", "pyr", "bbit", "bbix", "bbi", "bbip", "bbiet", "bbiex", "bbie", "bbiep", "bbat", "bbax", "bba", "bbap", "bbuox", "bbuo", "bbuop", "bbot", "bbox", "bbo", "bbop", "bbex", "bbe", "bbep", "bbut", "bbux", "bbu", "bbup", "bburx", "bbur", "bbyt", "bbyx", "bby", "bbyp", "nbit", "nbix", "nbi", "nbip", "nbiex", "nbie", "nbiep", "nbat", "nbax", "nba", "nbap", "nbot", "nbox", "nbo", "nbop", "nbut", "nbux", "nbu", "nbup", "nburx", "nbur", "nbyt", "nbyx", "nby", "nbyp", "nbyrx", "nbyr", "hmit", "hmix", "hmi", "hmip", "hmiex", "hmie", "hmiep", "hmat", "hmax", "hma", "hmap", "hmuox", "hmuo", "hmuop", "hmot", "hmox", "hmo", "hmop", "hmut", "hmux", "hmu", "hmup", "hmurx", "hmur", "hmyx", "hmy", "hmyp", "hmyrx", "hmyr", "mit", "mix", "mi", "mip", "miex", "mie", "miep", "mat", "max", "ma", "map", "muot", "muox", "muo", "muop", "mot", "mox", "mo", "mop", "mex", "me", "mut", "mux", "mu", "mup", "murx", "mur", "myt", "myx", "my", "myp", "fit", "fix", "fi", "fip", "fat", "fax", "fa", "fap", "fox", "fo", "fop", "fut", "fux", "fu", "fup", "furx", "fur", "fyt", "fyx", "fy", "fyp", "vit", "vix", "vi", "vip", "viet", "viex", "vie", "viep", "vat", "vax", "va", "vap", "vot", "vox", "vo", "vop", "vex", "vep", "vut", "vux", "vu", "vup", "vurx", "vur", "vyt", "vyx", "vy", "vyp", "vyrx", "vyr"], ol = ["dit", "dix", "di", "dip", "diex", "die", "diep", "dat", "dax", "da", "dap", "duox", "duo", "dot", "dox", "do", "dop", "dex", "de", "dep", "dut", "dux", "du", "dup", "durx", "dur", "tit", "tix", "ti", "tip", "tiex", "tie", "tiep", "tat", "tax", "ta", "tap", "tuot", "tuox", "tuo", "tuop", "tot", "tox", "to", "top", "tex", "te", "tep", "tut", "tux", "tu", "tup", "turx", "tur", "ddit", "ddix", "ddi", "ddip", "ddiex", "ddie", "ddiep", "ddat", "ddax", "dda", "ddap", "dduox", "dduo", "dduop", "ddot", "ddox", "ddo", "ddop", "ddex", "dde", "ddep", "ddut", "ddux", "ddu", "ddup", "ddurx", "ddur", "ndit", "ndix", "ndi", "ndip", "ndiex", "ndie", "ndat", "ndax", "nda", "ndap", "ndot", "ndox", "ndo", "ndop", "ndex", "nde", "ndep", "ndut", "ndux", "ndu", "ndup", "ndurx", "ndur", "hnit", "hnix", "hni", "hnip", "hniet", "hniex", "hnie", "hniep", "hnat", "hnax", "hna", "hnap", "hnuox", "hnuo", "hnot", "hnox", "hnop", "hnex", "hne", "hnep", "hnut", "nit", "nix", "ni", "nip", "niex", "nie", "niep", "nax", "na", "nap", "nuox", "nuo", "nuop", "not", "nox", "no", "nop", "nex", "ne", "nep", "nut", "nux", "nu", "nup", "nurx", "nur", "hlit", "hlix", "hli", "hlip", "hliex", "hlie", "hliep", "hlat", "hlax", "hla", "hlap", "hluox", "hluo", "hluop", "hlox", "hlo", "hlop", "hlex", "hle", "hlep", "hlut", "hlux", "hlu", "hlup", "hlurx", "hlur", "hlyt", "hlyx", "hly", "hlyp", "hlyrx", "hlyr", "lit", "lix", "li", "lip", "liet", "liex", "lie", "liep", "lat", "lax", "la", "lap", "luot", "luox", "luo", "luop", "lot", "lox", "lo", "lop", "lex", "le", "lep", "lut", "lux", "lu", "lup", "lurx", "lur", "lyt", "lyx", "ly", "lyp", "lyrx", "lyr", "git", "gix", "gi", "gip", "giet", "giex", "gie", "giep", "gat", "gax", "ga", "gap", "guot", "guox", "guo", "guop", "got", "gox", "go", "gop", "get", "gex", "ge", "gep", "gut", "gux", "gu", "gup", "gurx", "gur", "kit", "kix", "ki", "kip", "kiex", "kie", "kiep", "kat"], ll = ["kax", "ka", "kap", "kuox", "kuo", "kuop", "kot", "kox", "ko", "kop", "ket", "kex", "ke", "kep", "kut", "kux", "ku", "kup", "kurx", "kur", "ggit", "ggix", "ggi", "ggiex", "ggie", "ggiep", "ggat", "ggax", "gga", "ggap", "gguot", "gguox", "gguo", "gguop", "ggot", "ggox", "ggo", "ggop", "gget", "ggex", "gge", "ggep", "ggut", "ggux", "ggu", "ggup", "ggurx", "ggur", "mgiex", "mgie", "mgat", "mgax", "mga", "mgap", "mguox", "mguo", "mguop", "mgot", "mgox", "mgo", "mgop", "mgex", "mge", "mgep", "mgut", "mgux", "mgu", "mgup", "mgurx", "mgur", "hxit", "hxix", "hxi", "hxip", "hxiet", "hxiex", "hxie", "hxiep", "hxat", "hxax", "hxa", "hxap", "hxuot", "hxuox", "hxuo", "hxuop", "hxot", "hxox", "hxo", "hxop", "hxex", "hxe", "hxep", "ngiex", "ngie", "ngiep", "ngat", "ngax", "nga", "ngap", "nguot", "nguox", "nguo", "ngot", "ngox", "ngo", "ngop", "ngex", "nge", "ngep", "hit", "hiex", "hie", "hat", "hax", "ha", "hap", "huot", "huox", "huo", "huop", "hot", "hox", "ho", "hop", "hex", "he", "hep", "wat", "wax", "wa", "wap", "wuox", "wuo", "wuop", "wox", "wo", "wop", "wex", "we", "wep", "zit", "zix", "zi", "zip", "ziex", "zie", "ziep", "zat", "zax", "za", "zap", "zuox", "zuo", "zuop", "zot", "zox", "zo", "zop", "zex", "ze", "zep", "zut", "zux", "zu", "zup", "zurx", "zur", "zyt", "zyx", "zy", "zyp", "zyrx", "zyr", "cit", "cix", "ci", "cip", "ciet", "ciex", "cie", "ciep", "cat", "cax", "ca", "cap", "cuox", "cuo", "cuop", "cot", "cox", "co", "cop", "cex", "ce", "cep", "cut", "cux", "cu", "cup", "curx", "cur", "cyt", "cyx", "cy", "cyp", "cyrx", "cyr", "zzit", "zzix", "zzi", "zzip", "zziet", "zziex", "zzie", "zziep", "zzat", "zzax", "zza", "zzap", "zzox", "zzo", "zzop", "zzex", "zze", "zzep", "zzux", "zzu", "zzup", "zzurx", "zzur", "zzyt", "zzyx", "zzy", "zzyp", "zzyrx", "zzyr", "nzit", "nzix", "nzi", "nzip", "nziex", "nzie", "nziep", "nzat", "nzax", "nza", "nzap", "nzuox", "nzuo", "nzox", "nzop", "nzex", "nze", "nzux", "nzu"], tl = ["nzup", "nzurx", "nzur", "nzyt", "nzyx", "nzy", "nzyp", "nzyrx", "nzyr", "sit", "six", "si", "sip", "siex", "sie", "siep", "sat", "sax", "sa", "sap", "suox", "suo", "suop", "sot", "sox", "so", "sop", "sex", "se", "sep", "sut", "sux", "su", "sup", "surx", "sur", "syt", "syx", "sy", "syp", "syrx", "syr", "ssit", "ssix", "ssi", "ssip", "ssiex", "ssie", "ssiep", "ssat", "ssax", "ssa", "ssap", "ssot", "ssox", "sso", "ssop", "ssex", "sse", "ssep", "ssut", "ssux", "ssu", "ssup", "ssyt", "ssyx", "ssy", "ssyp", "ssyrx", "ssyr", "zhat", "zhax", "zha", "zhap", "zhuox", "zhuo", "zhuop", "zhot", "zhox", "zho", "zhop", "zhet", "zhex", "zhe", "zhep", "zhut", "zhux", "zhu", "zhup", "zhurx", "zhur", "zhyt", "zhyx", "zhy", "zhyp", "zhyrx", "zhyr", "chat", "chax", "cha", "chap", "chuot", "chuox", "chuo", "chuop", "chot", "chox", "cho", "chop", "chet", "chex", "che", "chep", "chux", "chu", "chup", "churx", "chur", "chyt", "chyx", "chy", "chyp", "chyrx", "chyr", "rrax", "rra", "rruox", "rruo", "rrot", "rrox", "rro", "rrop", "rret", "rrex", "rre", "rrep", "rrut", "rrux", "rru", "rrup", "rrurx", "rrur", "rryt", "rryx", "rry", "rryp", "rryrx", "rryr", "nrat", "nrax", "nra", "nrap", "nrox", "nro", "nrop", "nret", "nrex", "nre", "nrep", "nrut", "nrux", "nru", "nrup", "nrurx", "nrur", "nryt", "nryx", "nry", "nryp", "nryrx", "nryr", "shat", "shax", "sha", "shap", "shuox", "shuo", "shuop", "shot", "shox", "sho", "shop", "shet", "shex", "she", "shep", "shut", "shux", "shu", "shup", "shurx", "shur", "shyt", "shyx", "shy", "shyp", "shyrx", "shyr", "rat", "rax", "ra", "rap", "ruox", "ruo", "ruop", "rot", "rox", "ro", "rop", "rex", "re", "rep", "rut", "rux", "ru", "rup", "rurx", "rur", "ryt", "ryx", "ry", "ryp", "ryrx", "ryr", "jit", "jix", "ji", "jip", "jiet", "jiex", "jie", "jiep", "juot", "juox", "juo", "juop", "jot", "jox", "jo", "jop", "jut", "jux", "ju", "jup", "jurx", "jur", "jyt", "jyx", "jy", "jyp", "jyrx", "jyr", "qit", "qix", "qi", "qip"], hl = ["qiet", "qiex", "qie", "qiep", "quot", "quox", "quo", "quop", "qot", "qox", "qo", "qop", "qut", "qux", "qu", "qup", "qurx", "qur", "qyt", "qyx", "qy", "qyp", "qyrx", "qyr", "jjit", "jjix", "jji", "jjip", "jjiet", "jjiex", "jjie", "jjiep", "jjuox", "jjuo", "jjuop", "jjot", "jjox", "jjo", "jjop", "jjut", "jjux", "jju", "jjup", "jjurx", "jjur", "jjyt", "jjyx", "jjy", "jjyp", "njit", "njix", "nji", "njip", "njiet", "njiex", "njie", "njiep", "njuox", "njuo", "njot", "njox", "njo", "njop", "njux", "nju", "njup", "njurx", "njur", "njyt", "njyx", "njy", "njyp", "njyrx", "njyr", "nyit", "nyix", "nyi", "nyip", "nyiet", "nyiex", "nyie", "nyiep", "nyuox", "nyuo", "nyuop", "nyot", "nyox", "nyo", "nyop", "nyut", "nyux", "nyu", "nyup", "xit", "xix", "xi", "xip", "xiet", "xiex", "xie", "xiep", "xuox", "xuo", "xot", "xox", "xo", "xop", "xyt", "xyx", "xy", "xyp", "xyrx", "xyr", "yit", "yix", "yi", "yip", "yiet", "yiex", "yie", "yiep", "yuot", "yuox", "yuo", "yuop", "yot", "yox", "yo", "yop", "yut", "yux", "yu", "yup", "yurx", "yur", "yyt", "yyx", "yy", "yyp", "yyrx", "yyr", null, null, null, "Qot", "Li", "Kit", "Nyip", "Cyp", "Ssi", "Ggop", "Gep", "Mi", "Hxit", "Lyr", "Bbut", "Mop", "Yo", "Put", "Hxuo", "Tat", "Ga", null, null, "Ddur", "Bur", "Gguo", "Nyop", "Tu", "Op", "Jjut", "Zot", "Pyt", "Hmo", "Yit", "Vur", "Shy", "Vep", "Za", "Jo", null, "Jjy", "Got", "Jjie", "Wo", "Du", "Shur", "Lie", "Cy", "Cuop", "Cip", "Hxop", "Shat", null, "Shop", "Che", "Zziet", null, "Ke"], gl = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "A", "a", "A", "a", "HENG", "heng", "TZ", "tz", "3", "3", "4", "4", "4", "4", "F", "S", "AA", "aa", "AO", "ao", "AU", "au", "AV", "av", "AV-", "av-", "AY", "ay", "C", "c", "K", "k", "K", "k", "K", "k", "L", "l", "L", "l", "O", "o", "O", "o", "OO", "oo", "P", "p", "P", "p", "P", "p", "Q", "q", "Q", "q", "R", "r", "R", "r", "V", "v", "VY", "vy", "Z", "z", "TH", "th", "TH", "th", "Y", "y", "ET", "et", "IS", "is", "CON", "con", "US", "us", "dum", "lum", "num", "rum", "RUM", "tum", "um", "D", "d", "F", "f", "G", "G", "g", "L", "l", "R", "r", "S", "s", "T", "t", "^", ":", "=", "'", "'", "H", "l", ".", "N", "n", "C", "c", "c", "h", "B", "b", "F", "f", "AE", "ae", "OE", "oe", "UE", "ue", "G", "g", "K", "k", "N", "n", "R", "r", "S", "s", "H", "E", "G", "L", "I", "Q", "K", "T", "J", "CHI", "B", "b", "O", "o", "U", "u", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "I", "H", "oe", "M", "F", "P", "M", "I", "M1"], rl = ["Kay", "Kayng", "Ke", "Ko", "Kol", "Koc", "Kwi", "Kwi", "Kyun", "Kul", "Kum", "Na", "Na", "Na", "La", "Na", "Na", "Na", "Na", "Na", "Nak", "Nak", "Nak", "Nak", "Nak", "Nak", "Nak", "Nan", "Nan", "Nan", "Nan", "Nan", "Nan", "Nam", "Nam", "Nam", "Nam", "Nap", "Nap", "Nap", "Nang", "Nang", "Nang", "Nang", "Nang", "Nay", "Nayng", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "No", "Nok", "Nok", "Nok", "Nok", "Nok", "Nok", "Non", "Nong", "Nong", "Nong", "Nong", "Noy", "Noy", "Noy", "Noy", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nwu", "Nuk", "Nuk", "Num", "Nung", "Nung", "Nung", "Nung", "Nung", "Twu", "La", "Lak", "Lak", "Lan", "Lyeng", "Lo", "Lyul", "Li", "Pey", "Pen", "Pyen", "Pwu", "Pwul", "Pi", "Sak", "Sak", "Sam", "Sayk", "Sayng", "Sep", "Sey", "Sway", "Sin", "Sim", "Sip", "Ya", "Yak", "Yak", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Yang", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Ye", "Yek", "Yek", "Yek", "Yek", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yen", "Yel", "Yel", "Yel", "Yel", "Yel", "Yel", "Yem", "Yem", "Yem", "Yem", "Yem", "Yep", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yeng", "Yey", "Yey", "Yey", "Yey", "O", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yo", "Yong", "Wun", "Wen", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yu", "Yuk", "Yuk", "Yuk", "Yun", "Yun", "Yun", "Yun", "Yul", "Yul", "Yul", "Yul", "Yung", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "I", "Ik", "Ik", "In", "In", "In", "In", "In", "In", "In", "Im", "Im", "Im", "Ip", "Ip", "Ip", "Cang", "Cek", "Ci", "Cip", "Cha", "Chek"], sl = ["Chey", "Thak", "Thak", "Thang", "Thayk", "Thong", "Pho", "Phok", "Hang", "Hang", "Hyen", "Hwak", "Wu", "Huo", null, null, "Zhong", null, "Qing", null, null, "Xi", "Zhu", "Yi", "Li", "Shen", "Xiang", "Fu", "Jing", "Jing", "Yu", null, "Hagi", null, "Zhu", null, null, "Yi", "Du", null, null, null, "Fan", "Si", "Guan"], dl = ["ff", "fi", "fl", "ffi", "ffl", "st", "st", null, null, null, null, null, null, null, null, null, null, null, null, "mn", "me", "mi", "vn", "mkh", null, null, null, null, null, "yi", null, "ay", "`", null, "d", "h", "k", "l", "m", "m", "t", "+", "sh", "s", "sh", "s", "a", "a", null, "b", "g", "d", "h", "v", "z", null, "t", "y", "k", "k", "l", null, "l", null, "n", "n", null, "p", "p", null, "ts", "ts", "r", "sh", "t", "vo", "b", "k", "p", "l"], cl = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "~", null, null, null, null, null, null, null, null, null, null, null, null, "..", "--", "-", "_", "_", "(", ") ", "{", "} ", "[", "] ", "[(", ")] ", "<<", ">> ", "<", "> ", "[", "] ", "{", "}", null, null, null, null, null, null, null, null, null, null, null, ",", ",", ".", null, ";", ":", "?", "!", "-", "(", ")", "{", "}", "{", "}", "#", "&", "*", "+", "-", "<", ">", "=", null, "\\", "$", "%", "@"], Yl = [null, "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", null, null, ".", "[", "]", ",", "*", "wo", "a", "i", "u", "e", "o", "ya", "yu", "yo", "tu", "+", "a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "si", "su", "se", "so", "ta", "ti", "tu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "hu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "n", ":", ";", null, "g", "gg", "gs", "n", "nj", "nh", "d", "dd", "r", "lg", "lm", "lb", "ls", "lt", "lp", "rh", "m", "b", "bb", "bs", "s", "ss", null, "j", "jj", "c", "k", "t", "p", "h", null, null, null, "a", "ae", "ya", "yae", "eo", "e", null, null, "yeo", "ye", "o", "wa", "wae", "oe", null, null, "yo", "u", "weo", "we", "wi", "yu", null, null, "eu", "yi", "i", null, null, null, "/C", "PS", "!", "-", "|", "Y=", "W=", null, "|", "-", "|", "-", "|", "#", "O", null, null, null, null, null, null, null, null, null, null, "{", "|", "}"], Ll = ["g", "gg", "n", "d", "dd", "r", "m", "b", "bb", "s", "ss", "", "j", "jj", "c", "k", "t", "p", "h"], Zl = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "weo", "we", "wi", "yu", "eu", "yi", "i"], Cl = ["", "g", "gg", "gs", "n", "nj", "nh", "d", "l", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "c", "k", "t", "p", "h"], s = [];
s[0] = Iu;
s[1] = Uu;
s[2] = $u;
s[3] = qu;
s[4] = Vu;
s[5] = ne;
s[6] = ie;
s[7] = ae;
s[9] = ue;
s[10] = ee;
s[11] = oe;
s[12] = le;
s[13] = te;
s[14] = he;
s[15] = ge;
s[16] = re;
s[17] = se;
s[18] = de;
s[19] = ce;
s[20] = Ye;
s[21] = Le;
s[22] = Ze;
s[23] = Ce;
s[24] = Se;
s[30] = fe;
s[31] = Je;
s[32] = De;
s[33] = Xe;
s[37] = pe;
s[40] = Te;
s[48] = He;
s[49] = _e;
s[50] = ye;
s[51] = me;
s[78] = Qe;
s[79] = we;
s[80] = Me;
s[81] = Be;
s[82] = be;
s[83] = xe;
s[84] = Fe;
s[85] = Ge;
s[86] = ve;
s[87] = Ne;
s[88] = ke;
s[89] = Pe;
s[90] = Ee;
s[91] = Ke;
s[92] = We;
s[93] = Re;
s[94] = Ae;
s[95] = ze;
s[96] = Oe;
s[97] = je;
s[98] = Ie;
s[99] = Ue;
s[100] = $e;
s[101] = qe;
s[102] = Ve;
s[103] = no;
s[104] = io;
s[105] = ao;
s[106] = uo;
s[107] = eo;
s[108] = oo;
s[109] = lo;
s[110] = to;
s[111] = ho;
s[112] = go;
s[113] = ro;
s[114] = so;
s[115] = co;
s[116] = Yo;
s[117] = Lo;
s[118] = Zo;
s[119] = Co;
s[120] = So;
s[121] = fo;
s[122] = Jo;
s[123] = Do;
s[124] = Xo;
s[125] = po;
s[126] = To;
s[127] = Ho;
s[128] = _o;
s[129] = yo;
s[130] = mo;
s[131] = Qo;
s[132] = wo;
s[133] = Mo;
s[134] = Bo;
s[135] = bo;
s[136] = xo;
s[137] = Fo;
s[138] = Go;
s[139] = vo;
s[140] = No;
s[141] = ko;
s[142] = Po;
s[143] = Eo;
s[144] = Ko;
s[145] = Wo;
s[146] = Ro;
s[147] = Ao;
s[148] = zo;
s[149] = Oo;
s[150] = jo;
s[151] = Io;
s[152] = Uo;
s[153] = $o;
s[154] = qo;
s[155] = Vo;
s[156] = nl;
s[157] = il;
s[158] = al;
s[159] = ul;
s[160] = el;
s[161] = ol;
s[162] = ll;
s[163] = tl;
s[164] = hl;
s[167] = gl;
s[249] = rl;
s[250] = sl;
s[251] = dl;
s[254] = cl;
s[255] = Yl;
var Pi = {};
for (let n = 0; n < s.length; n++) {
  let a = s[n];
  if (a) for (let i = 0; i < a.length; i++) {
    let u = a[i];
    u && (Pi[String.fromCharCode((n << 8) + i)] = u);
  }
}
for (let n = 44032; n <= 55203; n++) {
  let a = n - 44032;
  Pi[String.fromCharCode(n)] = Ll[a / 588 | 0] + Zl[a % 588 / 28 | 0] + Cl[a % 28];
}
var Sl = /[-[\]/{}()*+?.\\^$|]/g, fl = /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFC\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A]/, Jl = /[\s!-#%-*,-/:;?@[-\]_{}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDFFF]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Fn = { Left: -1, Middle: 0, Right: 1 };
function Ei(n) {
  return (n || "").replace(Sl, "\\$&");
}
function ia(n) {
  return fl.test(n);
}
function Dl(n) {
  return Jl.test(n);
}
function P(n) {
  if (Array.isArray(n)) return n.map((a) => P(a));
  if (n instanceof Date) return new Date(n.valueOf());
  if (n instanceof RegExp) return new RegExp(n.source, n.flags);
  if (n !== null && typeof n == "object") {
    let a = {};
    for (let i in n) Object.hasOwn(n, i) && (a[i] = P(n[i]));
    return a;
  }
  return n;
}
function Xl(n, a) {
  let i = [];
  for (let e of a) {
    let l = n.indexOf(e);
    for (; l > -1; ) i.push([l, l + e.length - 1]), l = n.indexOf(e, l + 1);
  }
  let u = i.sort((e, l) => e[0] - l[0] || e[1] - l[1]);
  i = [];
  let o;
  for (let e of u) !o || e[0] > o[1] + 1 ? (o = e, i.push(o)) : e[1] > o[1] && (o[1] = e[1]);
  return i;
}
function pl(n, a) {
  return n < a[0] ? Fn.Left : n > a[1] ? Fn.Right : Fn.Middle;
}
function aa(n, a) {
  if (a.length === 0) return false;
  let i = 0, u = a.length - 1;
  for (; i <= u; ) {
    let o = i + u >>> 1, e = pl(n, a[o]);
    if (e === Fn.Middle) return true;
    e === Fn.Left ? u = o - 1 : i = o + 1;
  }
  return false;
}
function Ua(n, a, i, u = []) {
  let o = u.length ? new RegExp(u.map(Ei).join("|"), "g") : null, e = new RegExp(a.source, `${a.flags.replace("g", "")}g`), l = "", h = 0;
  for (; ; ) {
    let d = e.exec(n), t = "", g = 0;
    if (d) {
      for (; ; ) {
        let L = o == null ? void 0 : o.exec(d[0]);
        if (L && o) t += L.index > g ? i : "", t += L[0], g = o.lastIndex;
        else {
          t += d[0].length > g ? i : "";
          break;
        }
      }
      l += n.substring(h, d.index) + t, h = e.lastIndex;
    } else {
      l += n.substring(h, n.length);
      break;
    }
  }
  return l;
}
var Tl = /[\uD800-\uDBFF]/, Hl = /[\uDC00-\uDFFF]/, _l = /[^\s\S]/, wi = { ignore: [], replace: [], replaceAfter: [], trim: false, unknown: "", fixChineseSpacing: true }, $a = class {
  get options() {
    return P({ ...wi, ...this.confOptions });
  }
  constructor(n = P(wi), a = Pi) {
    this.confOptions = n, this.defaultMap = a, this.map = a;
  }
  config(n, a = false) {
    return a && (this.confOptions = {}), n && typeof n == "object" && (this.confOptions = P(n)), this.confOptions;
  }
  codeMapReplace(n, a, i = []) {
    let u = 0, o = "", e = a.fixChineseSpacing && ia(n), l = false;
    for (let h = 0; h < n.length; h++) {
      let d = Tl.test(n[h]) && Hl.test(n[h + 1]) ? n[h] + n[h + 1] : n[h], t, g = false;
      aa(u, i) || d.length === 2 && aa(u + 1, i) ? (t = d, i.find((L) => L[1] >= u && L[0] === u) || (g = true)) : t = this.map[d] || a.unknown || "", e && (l && !g && !Dl(t) && (t = ` ${t}`), l = !!t && ia(d)), o += t, u += d.length, h += d.length - 1;
    }
    return o;
  }
  formatReplaceOption(n) {
    if (Array.isArray(n)) return P(n);
    let a = [];
    for (let i in n) Object.hasOwn(n, i) && a.push([i, n[i]]);
    return a;
  }
  replaceString(n, a, i = []) {
    let u = P(a), o = n;
    for (let e of u) {
      switch (true) {
        case e[0] instanceof RegExp:
          e[0] = new RegExp(e[0].source, `${e[0].flags.replace("g", "")}g`);
          break;
        case (typeof e[0] == "string" && e[0].length > 0):
          e[0] = new RegExp(Ei(e[0]), "g");
          break;
        default:
          e[0] = _l;
      }
      o = Ua(o, e[0], e[1], i);
    }
    return o;
  }
  setData(n, a = false) {
    if (a && (this.map = P(this.defaultMap)), n && typeof n == "object" && Object.keys(n).length) {
      this.map = P(this.map);
      for (let i in n) Object.hasOwn(n, i) && i.length < 3 && i <= "\u{10FFFF}" && (this.map[i] = n[i]);
    }
    return this.map;
  }
  transliterate(n, a) {
    let i = typeof a == "object" ? a : {}, u = P({ ...this.options, ...i }), o = typeof n == "string" ? n : String(n), e = this.formatReplaceOption(u.replace);
    e.length && (o = this.replaceString(o, e, u.ignore));
    let l = u.ignore && u.ignore.length > 0 ? Xl(o, u.ignore) : [];
    o = this.codeMapReplace(o, u, l), u.trim && (o = o.trim());
    let h = this.formatReplaceOption(u.replaceAfter);
    return h.length && (o = this.replaceString(o, h)), o;
  }
}, yl = { ...P(wi), allowedChars: "a-zA-Z0-9-_.~", lowercase: true, separator: "-", uppercase: false, fixChineseSpacing: true }, ml = class extends $a {
  get options() {
    return P({ ...yl, ...this.confOptions });
  }
  config(n, a = false) {
    return a && (this.confOptions = {}), n && typeof n == "object" && (this.confOptions = P(n)), this.confOptions;
  }
  slugify(n, a) {
    let i = typeof a == "object" ? a : {}, u = P({ ...this.options, ...i }), o = u.separator ? Ei(u.separator) : "", e = this.transliterate(n, u);
    return e = Ua(e, new RegExp(`[^${u.allowedChars}]+`, "g"), u.separator ?? "-", u.ignore ?? []), o && (e = e.replace(new RegExp(`${o}+`, "g"), u.separator), e = e.replace(new RegExp(`^${o}+|${o}+$`, "g"), "")), u.lowercase && (e = e.toLowerCase()), u.uppercase && (e = e.toUpperCase()), e;
  }
}, Tn = new $a(), Ki = Tn.transliterate.bind(Tn);
Ki.config = Tn.config.bind(Tn);
Ki.setData = Tn.setData.bind(Tn);
var Hn = new ml(), qa = Hn.slugify.bind(Hn);
qa.config = Hn.config.bind(Hn);
qa.setData = Hn.setData.bind(Hn);
function sn(n) {
  return new Promise((a) => setTimeout(a, n));
}
function Ql(n) {
  const a = document.createElement("div");
  return a.textContent = n, a.innerHTML;
}
const ci = [{ threshold: 0.05, messages: ["The meaning holds.", "Remarkably faithful.", "Unchanged."] }, { threshold: 0.15, messages: ["A subtle shift.", "Almost there.", "Close, but not quite."] }, { threshold: 0.3, messages: ["The words are wandering.", "A quiet reinterpretation.", "Drifting."] }, { threshold: 0.5, messages: ["The meaning is splitting.", "Something changed along the way.", "A different story now."] }, { threshold: 0.7, messages: ["Barely recognizable.", "The original is fading.", "A new sentence is forming."] }, { threshold: 1, messages: ["An entirely new thought.", "The original is a distant memory.", "Completely transformed."] }];
function wl(n) {
  for (const a of ci) if (n <= a.threshold) return a.messages[Math.floor(Math.random() * a.messages.length)];
  return ci[ci.length - 1].messages[0];
}
const Ml = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Bl(n, a, i, u, o) {
  var _a2;
  const e = i.length - 1;
  let l = false, h = false;
  n.innerHTML = `
    <div class="journey" role="region" aria-label="Translation journey" aria-live="polite">
      <div class="drift-meter">
        <div class="drift-label">
          <span id="drift-pct">0%</span> drift
        </div>
        <div class="drift-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
          <div class="drift-fill" id="drift-fill"></div>
        </div>
        <div class="drift-reaction hidden" id="drift-reaction"></div>
      </div>

      <div class="translation-display">
        <div class="current-lang" id="current-lang">
          <span class="lang-flag" id="lang-flag">${O(i[0].countryCode)}</span>
          <span class="lang-name" id="lang-name">${i[0].name}</span>
          <span class="step-badge" id="step-badge">START</span>
        </div>
        <div class="translation-text-wrapper">
          <div class="translation-text" id="ttext">${Ql(a)}</div>
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
          ${i.map((J, p) => `
            <div class="station${p === 0 ? " completed" : ""}" id="st-${p}">
              ${p > 0 ? '<div class="station-connector"></div>' : ""}
              <div class="station-node${p === 0 ? " active done" : ""}">
                <span class="station-flag">${O(J.countryCode)}</span>
                <span class="station-check${p === 0 ? "" : " hidden"}">&#10003;</span>
              </div>
              <div class="station-label">${J.name}</div>
            </div>`).join("")}
        </div>
      </div>

      <div class="journey-footer">
        <span id="step-counter">0</span> / ${e} translations
        <div class="journey-controls">
          <button class="btn-ghost btn-small" id="skip-btn" aria-label="Skip to results">Skip to end</button>
          <button class="btn-ghost btn-small" id="cancel-btn" aria-label="Cancel and go back">&larr; Cancel</button>
        </div>
      </div>

      <div class="journey-error hidden" id="journey-error" role="alert">
        <span class="error-text" id="error-text"></span>
        <button class="btn-small btn-secondary" id="retry-btn">Retry</button>
      </div>
    </div>
  `;
  const d = n.querySelector("#drift-fill"), t = n.querySelector(".drift-bar"), g = n.querySelector("#drift-pct"), L = n.querySelector("#drift-reaction"), c = n.querySelector("#ttext"), r = n.querySelector("#shimmer"), Y = n.querySelector("#translit"), D = n.querySelector("#back-trans"), X = n.querySelector("#back-trans-text"), S = n.querySelector("#lang-flag"), Q = n.querySelector("#lang-name"), T = n.querySelector("#step-badge"), Z = n.querySelector("#step-counter"), m = n.querySelector("#journey-error"), b = n.querySelector("#error-text");
  n.querySelector("#cancel-btn").addEventListener("click", () => {
    l = true, o == null ? void 0 : o();
  }), n.querySelector("#skip-btn").addEventListener("click", () => {
    h = true;
  });
  const C = [];
  let M = false, H = null;
  function f(J) {
    return new Promise((p) => {
      b.textContent = J, m.classList.remove("hidden"), H = () => {
        m.classList.add("hidden"), p();
      };
    });
  }
  n.querySelector("#retry-btn").addEventListener("click", () => {
    H == null ? void 0 : H();
  });
  async function _(J, p, v, N = 3) {
    for (let z = 1; z <= N; z++) {
      if (l) throw new Error("cancelled");
      try {
        return await di(J, p, v);
      } catch {
        if (z === N) return await f("Translation failed. Check your connection."), di(J, p, v);
        await sn(1e3 * z);
      }
    }
    throw new Error("unreachable");
  }
  async function q() {
    let J = a;
    for (let p = 0; p < e; p++) {
      if (l) return;
      const v = i[p], N = i[p + 1];
      try {
        J = (await _(J, v.code, N.code)).translatedText;
        const G = { language: N, text: J, transliteration: N.nonLatin ? xl(J) : void 0, backTranslation: "", driftScore: (p + 1) / e };
        C.push(G), N.code === "en" ? (G.backTranslation = J, G.driftScore = na(a, J)) : di(J, N.code, "en").then((V) => {
          G.backTranslation = V.translatedText, G.driftScore = na(a, V.translatedText);
        }).catch(() => {
        });
      } catch (z) {
        if (l) return;
        console.error(`Step ${p} failed:`, z), C.push({ language: N, text: J, backTranslation: "", driftScore: (p + 1) / e });
      }
    }
    M = true;
  }
  async function qn() {
    var _a3, _b;
    for (let p = 0; p < e; p++) {
      if (l) return;
      for (; C.length <= p && !M; ) await sn(150);
      if (C.length <= p) break;
      h ? Jn(C[p], p) : await vu(C[p], p);
    }
    if (l) return;
    await sn(h ? 200 : 800);
    const J = C.slice();
    u({ original: a, chain: i, steps: J, finalText: ((_a3 = J[J.length - 1]) == null ? void 0 : _a3.text) ?? a, totalDrift: ((_b = J[J.length - 1]) == null ? void 0 : _b.driftScore) ?? 0, timestamp: Date.now() });
  }
  async function fn(J, p) {
    const v = Date.now();
    for (; !J.backTranslation && Date.now() - v < p; ) await sn(100);
  }
  function Jn(J, p) {
    const v = n.querySelector(`#st-${p + 1}`), N = n.querySelector(`#st-${p}`), z = v.querySelector(".station-node");
    N.classList.add("completed");
    const G = N.querySelector(".station-check");
    G && G.classList.remove("hidden"), z.classList.add("done"), v.classList.add("completed"), v.querySelector(".station-check").classList.remove("hidden"), S.textContent = O(J.language.countryCode), Q.textContent = J.language.name, T.textContent = `${p + 1} / ${e}`, c.textContent = J.text, Z.textContent = String(p + 1);
    const V = J.driftScore;
    d.style.width = `${V * 100}%`, g.textContent = `${Math.round(V * 100)}%`;
  }
  const Gu = ((_a2 = i[i.length - 1]) == null ? void 0 : _a2.code) === "en";
  async function vu(J, p) {
    const v = n.querySelector(`#st-${p + 1}`), N = n.querySelector(`#st-${p}`), z = p === e - 1, G = Ml();
    v.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }), S.textContent = O(J.language.countryCode), Q.textContent = J.language.name, T.textContent = `${p + 1} / ${e}`, G || (S.classList.remove("bounce"), S.offsetWidth, S.classList.add("bounce"));
    const V = v.querySelector(".station-node");
    V.classList.add("active"), r.classList.remove("hidden"), c.classList.add("fading"), Y.classList.add("hidden"), D.classList.add("hidden"), await sn(G ? 200 : 700), r.classList.add("hidden"), c.classList.remove("fading"), c.dir = J.language.rtl ? "rtl" : "ltr", G ? c.textContent = J.text : await ua(c, J.text), J.transliteration && J.transliteration !== J.text && (Y.textContent = J.transliteration, Y.classList.remove("hidden")), !(z && Gu) && (await fn(J, 2e3), J.backTranslation && (X.textContent = "", D.classList.remove("hidden"), D.classList.remove("back-trans-pop"), D.offsetWidth, D.classList.add("back-trans-pop"), G ? X.textContent = `"${J.backTranslation}"` : await ua(X, `"${J.backTranslation}"`)));
    const on = J.driftScore;
    d.style.width = `${on * 100}%`, t.setAttribute("aria-valuenow", String(Math.round(on * 100))), g.textContent = `${Math.round(on * 100)}%`, on < 0.33 ? d.style.background = "#4ecdc4" : on < 0.66 ? d.style.background = "linear-gradient(90deg, #4ecdc4, #f7dc6f)" : d.style.background = "linear-gradient(90deg, #f7dc6f, #ff6b6b)";
    const Nu = wl(on);
    L.textContent = Nu, L.classList.remove("hidden", "reaction-pop"), L.offsetWidth, L.classList.add("reaction-pop"), on > 0.4 && !G && bl(n.querySelector(".translation-display"), on), N.classList.add("completed");
    const qi = N.querySelector(".station-check");
    qi && qi.classList.remove("hidden"), V.classList.remove("active"), V.classList.add("done"), v.classList.add("completed"), v.querySelector(".station-check").classList.remove("hidden"), Z.textContent = String(p + 1), await sn(G ? 200 : 800);
  }
  q(), qn();
}
function bl(n, a) {
  const i = a > 0.7 ? 5 : 3;
  for (let u = 0; u < i; u++) {
    const o = document.createElement("span");
    o.className = "drift-orb", o.style.left = `${15 + Math.random() * 70}%`, o.style.animationDelay = `${Math.random() * 0.5}s`, o.style.setProperty("--orb-x", `${(Math.random() - 0.5) * 60}px`);
    const e = a > 0.7 ? "0" : "45";
    o.style.setProperty("--orb-hue", e), n.appendChild(o), setTimeout(() => o.remove(), 1800);
  }
}
async function ua(n, a) {
  n.textContent = "";
  const i = [...a], u = Math.max(18, Math.min(55, 1e3 / i.length));
  for (const o of i) n.textContent += o, await sn(u);
}
function xl(n) {
  try {
    const a = Ki(n);
    return a !== n ? a : void 0;
  } catch {
    return;
  }
}
async function Fl(n) {
  const a = Math.round(n.totalDrift * 100), i = { title: "Lost in Translation", text: `"${n.original}" \u2192 "${n.finalText}" (${a}% lost in translation)`, url: window.location.href };
  if (navigator.share) try {
    await navigator.share(i);
    return;
  } catch {
  }
  await Va(`${i.text}

${i.url}`);
}
async function Va(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const a = document.createElement("textarea");
    a.value = n, a.style.cssText = "position:fixed;opacity:0", document.body.appendChild(a), a.select(), document.execCommand("copy"), document.body.removeChild(a);
  }
}
function Gl(n) {
  const a = Math.round(n.totalDrift * 100), i = 800, u = 520, o = 40, e = document.createElement("canvas");
  e.width = i, e.height = u;
  const l = e.getContext("2d"), h = l.createLinearGradient(0, 0, 0, u);
  h.addColorStop(0, "#0a0a1a"), h.addColorStop(1, "#1a1a3e"), l.fillStyle = h, l.fillRect(0, 0, i, u), l.textAlign = "center", l.fillStyle = "#8888aa", l.font = "600 14px Inter, sans-serif", l.fillText("LOST IN TRANSLATION", i / 2, o + 16), l.fillStyle = "#f0f0f5", l.font = "400 20px Inter, sans-serif", ea(l, `\u201C${n.original}\u201D`, i / 2, o + 62, i - o * 2, 26);
  const d = o + 140;
  l.font = "20px sans-serif", l.fillStyle = "#4ecdc4", l.fillText("\u2193", i / 2, d);
  const t = n.chain.map((r) => O(r.countryCode)).join(" ");
  l.font = "12px sans-serif", l.fillStyle = "#555577";
  const g = t.length > 100 ? t.slice(0, 100) + "\u2026" : t;
  l.fillText(g, i / 2, d + 28), l.fillStyle = "#ffd700", l.font = "700 22px Inter, sans-serif", ea(l, `\u201C${n.finalText}\u201D`, i / 2, d + 80, i - o * 2, 28);
  const L = u - 110, c = a > 66 ? "#ff6b6b" : a > 33 ? "#f7dc6f" : "#4ecdc4";
  l.fillStyle = c, l.font = "700 52px Inter, sans-serif", l.fillText(`${a}%`, i / 2, L), l.fillStyle = "#8888aa", l.font = "400 16px Inter, sans-serif", l.fillText("lost in translation", i / 2, L + 28), l.fillStyle = "#333355", l.font = "400 11px Inter, sans-serif", l.fillText("Lost in Translation \u2014 williamcfrancis.netlify.app", i / 2, u - 14), e.toBlob((r) => {
    if (!r) return;
    const Y = URL.createObjectURL(r), D = document.createElement("a");
    D.href = Y, D.download = "lost-in-translation.png", D.click(), URL.revokeObjectURL(Y);
  }, "image/png");
}
function ea(n, a, i, u, o, e) {
  const l = a.split(" ");
  let h = "", d = u;
  for (const t of l) {
    const g = h ? `${h} ${t}` : t;
    n.measureText(g).width > o && h ? (n.fillText(h, i, d), h = t, d += e) : h = g;
  }
  n.fillText(h, i, d);
}
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
const vl = 4, oa = 0, la = 1, Nl = 2;
function Qn(n) {
  let a = n.length;
  for (; --a >= 0; ) n[a] = 0;
}
const kl = 0, nu = 1, Pl = 2, El = 3, Kl = 258, Wi = 29, On = 256, kn = On + 1 + Wi, pn = 30, Ri = 19, iu = 2 * kn + 1, dn = 15, Yi = 16, Wl = 7, Ai = 256, au = 16, uu = 17, eu = 18, Mi = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), ei = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), Rl = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), ou = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Al = 512, an = new Array((kn + 2) * 2);
Qn(an);
const Gn = new Array(pn * 2);
Qn(Gn);
const Pn = new Array(Al);
Qn(Pn);
const En = new Array(Kl - El + 1);
Qn(En);
const zi = new Array(Wi);
Qn(zi);
const li = new Array(pn);
Qn(li);
function Li(n, a, i, u, o) {
  this.static_tree = n, this.extra_bits = a, this.extra_base = i, this.elems = u, this.max_length = o, this.has_stree = n && n.length;
}
let lu, tu, hu;
function Zi(n, a) {
  this.dyn_tree = n, this.max_code = 0, this.stat_desc = a;
}
const gu = (n) => n < 256 ? Pn[n] : Pn[256 + (n >>> 7)], Kn = (n, a) => {
  n.pending_buf[n.pending++] = a & 255, n.pending_buf[n.pending++] = a >>> 8 & 255;
}, E = (n, a, i) => {
  n.bi_valid > Yi - i ? (n.bi_buf |= a << n.bi_valid & 65535, Kn(n, n.bi_buf), n.bi_buf = a >> Yi - n.bi_valid, n.bi_valid += i - Yi) : (n.bi_buf |= a << n.bi_valid & 65535, n.bi_valid += i);
}, I = (n, a, i) => {
  E(n, i[a * 2], i[a * 2 + 1]);
}, ru = (n, a) => {
  let i = 0;
  do
    i |= n & 1, n >>>= 1, i <<= 1;
  while (--a > 0);
  return i >>> 1;
}, zl = (n) => {
  n.bi_valid === 16 ? (Kn(n, n.bi_buf), n.bi_buf = 0, n.bi_valid = 0) : n.bi_valid >= 8 && (n.pending_buf[n.pending++] = n.bi_buf & 255, n.bi_buf >>= 8, n.bi_valid -= 8);
}, Ol = (n, a) => {
  const i = a.dyn_tree, u = a.max_code, o = a.stat_desc.static_tree, e = a.stat_desc.has_stree, l = a.stat_desc.extra_bits, h = a.stat_desc.extra_base, d = a.stat_desc.max_length;
  let t, g, L, c, r, Y, D = 0;
  for (c = 0; c <= dn; c++) n.bl_count[c] = 0;
  for (i[n.heap[n.heap_max] * 2 + 1] = 0, t = n.heap_max + 1; t < iu; t++) g = n.heap[t], c = i[i[g * 2 + 1] * 2 + 1] + 1, c > d && (c = d, D++), i[g * 2 + 1] = c, !(g > u) && (n.bl_count[c]++, r = 0, g >= h && (r = l[g - h]), Y = i[g * 2], n.opt_len += Y * (c + r), e && (n.static_len += Y * (o[g * 2 + 1] + r)));
  if (D !== 0) {
    do {
      for (c = d - 1; n.bl_count[c] === 0; ) c--;
      n.bl_count[c]--, n.bl_count[c + 1] += 2, n.bl_count[d]--, D -= 2;
    } while (D > 0);
    for (c = d; c !== 0; c--) for (g = n.bl_count[c]; g !== 0; ) L = n.heap[--t], !(L > u) && (i[L * 2 + 1] !== c && (n.opt_len += (c - i[L * 2 + 1]) * i[L * 2], i[L * 2 + 1] = c), g--);
  }
}, su = (n, a, i) => {
  const u = new Array(dn + 1);
  let o = 0, e, l;
  for (e = 1; e <= dn; e++) o = o + i[e - 1] << 1, u[e] = o;
  for (l = 0; l <= a; l++) {
    let h = n[l * 2 + 1];
    h !== 0 && (n[l * 2] = ru(u[h]++, h));
  }
}, jl = () => {
  let n, a, i, u, o;
  const e = new Array(dn + 1);
  for (i = 0, u = 0; u < Wi - 1; u++) for (zi[u] = i, n = 0; n < 1 << Mi[u]; n++) En[i++] = u;
  for (En[i - 1] = u, o = 0, u = 0; u < 16; u++) for (li[u] = o, n = 0; n < 1 << ei[u]; n++) Pn[o++] = u;
  for (o >>= 7; u < pn; u++) for (li[u] = o << 7, n = 0; n < 1 << ei[u] - 7; n++) Pn[256 + o++] = u;
  for (a = 0; a <= dn; a++) e[a] = 0;
  for (n = 0; n <= 143; ) an[n * 2 + 1] = 8, n++, e[8]++;
  for (; n <= 255; ) an[n * 2 + 1] = 9, n++, e[9]++;
  for (; n <= 279; ) an[n * 2 + 1] = 7, n++, e[7]++;
  for (; n <= 287; ) an[n * 2 + 1] = 8, n++, e[8]++;
  for (su(an, kn + 1, e), n = 0; n < pn; n++) Gn[n * 2 + 1] = 5, Gn[n * 2] = ru(n, 5);
  lu = new Li(an, Mi, On + 1, kn, dn), tu = new Li(Gn, ei, 0, pn, dn), hu = new Li(new Array(0), Rl, 0, Ri, Wl);
}, du = (n) => {
  let a;
  for (a = 0; a < kn; a++) n.dyn_ltree[a * 2] = 0;
  for (a = 0; a < pn; a++) n.dyn_dtree[a * 2] = 0;
  for (a = 0; a < Ri; a++) n.bl_tree[a * 2] = 0;
  n.dyn_ltree[Ai * 2] = 1, n.opt_len = n.static_len = 0, n.sym_next = n.matches = 0;
}, cu = (n) => {
  n.bi_valid > 8 ? Kn(n, n.bi_buf) : n.bi_valid > 0 && (n.pending_buf[n.pending++] = n.bi_buf), n.bi_buf = 0, n.bi_valid = 0;
}, ta = (n, a, i, u) => {
  const o = a * 2, e = i * 2;
  return n[o] < n[e] || n[o] === n[e] && u[a] <= u[i];
}, Ci = (n, a, i) => {
  const u = n.heap[i];
  let o = i << 1;
  for (; o <= n.heap_len && (o < n.heap_len && ta(a, n.heap[o + 1], n.heap[o], n.depth) && o++, !ta(a, u, n.heap[o], n.depth)); ) n.heap[i] = n.heap[o], i = o, o <<= 1;
  n.heap[i] = u;
}, ha = (n, a, i) => {
  let u, o, e = 0, l, h;
  if (n.sym_next !== 0) do
    u = n.pending_buf[n.sym_buf + e++] & 255, u += (n.pending_buf[n.sym_buf + e++] & 255) << 8, o = n.pending_buf[n.sym_buf + e++], u === 0 ? I(n, o, a) : (l = En[o], I(n, l + On + 1, a), h = Mi[l], h !== 0 && (o -= zi[l], E(n, o, h)), u--, l = gu(u), I(n, l, i), h = ei[l], h !== 0 && (u -= li[l], E(n, u, h)));
  while (e < n.sym_next);
  I(n, Ai, a);
}, Bi = (n, a) => {
  const i = a.dyn_tree, u = a.stat_desc.static_tree, o = a.stat_desc.has_stree, e = a.stat_desc.elems;
  let l, h, d = -1, t;
  for (n.heap_len = 0, n.heap_max = iu, l = 0; l < e; l++) i[l * 2] !== 0 ? (n.heap[++n.heap_len] = d = l, n.depth[l] = 0) : i[l * 2 + 1] = 0;
  for (; n.heap_len < 2; ) t = n.heap[++n.heap_len] = d < 2 ? ++d : 0, i[t * 2] = 1, n.depth[t] = 0, n.opt_len--, o && (n.static_len -= u[t * 2 + 1]);
  for (a.max_code = d, l = n.heap_len >> 1; l >= 1; l--) Ci(n, i, l);
  t = e;
  do
    l = n.heap[1], n.heap[1] = n.heap[n.heap_len--], Ci(n, i, 1), h = n.heap[1], n.heap[--n.heap_max] = l, n.heap[--n.heap_max] = h, i[t * 2] = i[l * 2] + i[h * 2], n.depth[t] = (n.depth[l] >= n.depth[h] ? n.depth[l] : n.depth[h]) + 1, i[l * 2 + 1] = i[h * 2 + 1] = t, n.heap[1] = t++, Ci(n, i, 1);
  while (n.heap_len >= 2);
  n.heap[--n.heap_max] = n.heap[1], Ol(n, a), su(i, d, n.bl_count);
}, ga = (n, a, i) => {
  let u, o = -1, e, l = a[1], h = 0, d = 7, t = 4;
  for (l === 0 && (d = 138, t = 3), a[(i + 1) * 2 + 1] = 65535, u = 0; u <= i; u++) e = l, l = a[(u + 1) * 2 + 1], !(++h < d && e === l) && (h < t ? n.bl_tree[e * 2] += h : e !== 0 ? (e !== o && n.bl_tree[e * 2]++, n.bl_tree[au * 2]++) : h <= 10 ? n.bl_tree[uu * 2]++ : n.bl_tree[eu * 2]++, h = 0, o = e, l === 0 ? (d = 138, t = 3) : e === l ? (d = 6, t = 3) : (d = 7, t = 4));
}, ra = (n, a, i) => {
  let u, o = -1, e, l = a[1], h = 0, d = 7, t = 4;
  for (l === 0 && (d = 138, t = 3), u = 0; u <= i; u++) if (e = l, l = a[(u + 1) * 2 + 1], !(++h < d && e === l)) {
    if (h < t) do
      I(n, e, n.bl_tree);
    while (--h !== 0);
    else e !== 0 ? (e !== o && (I(n, e, n.bl_tree), h--), I(n, au, n.bl_tree), E(n, h - 3, 2)) : h <= 10 ? (I(n, uu, n.bl_tree), E(n, h - 3, 3)) : (I(n, eu, n.bl_tree), E(n, h - 11, 7));
    h = 0, o = e, l === 0 ? (d = 138, t = 3) : e === l ? (d = 6, t = 3) : (d = 7, t = 4);
  }
}, Il = (n) => {
  let a;
  for (ga(n, n.dyn_ltree, n.l_desc.max_code), ga(n, n.dyn_dtree, n.d_desc.max_code), Bi(n, n.bl_desc), a = Ri - 1; a >= 3 && n.bl_tree[ou[a] * 2 + 1] === 0; a--) ;
  return n.opt_len += 3 * (a + 1) + 5 + 5 + 4, a;
}, Ul = (n, a, i, u) => {
  let o;
  for (E(n, a - 257, 5), E(n, i - 1, 5), E(n, u - 4, 4), o = 0; o < u; o++) E(n, n.bl_tree[ou[o] * 2 + 1], 3);
  ra(n, n.dyn_ltree, a - 1), ra(n, n.dyn_dtree, i - 1);
}, $l = (n) => {
  let a = 4093624447, i;
  for (i = 0; i <= 31; i++, a >>>= 1) if (a & 1 && n.dyn_ltree[i * 2] !== 0) return oa;
  if (n.dyn_ltree[18] !== 0 || n.dyn_ltree[20] !== 0 || n.dyn_ltree[26] !== 0) return la;
  for (i = 32; i < On; i++) if (n.dyn_ltree[i * 2] !== 0) return la;
  return oa;
};
let sa = false;
const ql = (n) => {
  sa || (jl(), sa = true), n.l_desc = new Zi(n.dyn_ltree, lu), n.d_desc = new Zi(n.dyn_dtree, tu), n.bl_desc = new Zi(n.bl_tree, hu), n.bi_buf = 0, n.bi_valid = 0, du(n);
}, Yu = (n, a, i, u) => {
  E(n, (kl << 1) + (u ? 1 : 0), 3), cu(n), Kn(n, i), Kn(n, ~i), i && n.pending_buf.set(n.window.subarray(a, a + i), n.pending), n.pending += i;
}, Vl = (n) => {
  E(n, nu << 1, 3), I(n, Ai, an), zl(n);
}, nt = (n, a, i, u) => {
  let o, e, l = 0;
  n.level > 0 ? (n.strm.data_type === Nl && (n.strm.data_type = $l(n)), Bi(n, n.l_desc), Bi(n, n.d_desc), l = Il(n), o = n.opt_len + 3 + 7 >>> 3, e = n.static_len + 3 + 7 >>> 3, e <= o && (o = e)) : o = e = i + 5, i + 4 <= o && a !== -1 ? Yu(n, a, i, u) : n.strategy === vl || e === o ? (E(n, (nu << 1) + (u ? 1 : 0), 3), ha(n, an, Gn)) : (E(n, (Pl << 1) + (u ? 1 : 0), 3), Ul(n, n.l_desc.max_code + 1, n.d_desc.max_code + 1, l + 1), ha(n, n.dyn_ltree, n.dyn_dtree)), du(n), u && cu(n);
}, it = (n, a, i) => (n.pending_buf[n.sym_buf + n.sym_next++] = a, n.pending_buf[n.sym_buf + n.sym_next++] = a >> 8, n.pending_buf[n.sym_buf + n.sym_next++] = i, a === 0 ? n.dyn_ltree[i * 2]++ : (n.matches++, a--, n.dyn_ltree[(En[i] + On + 1) * 2]++, n.dyn_dtree[gu(a) * 2]++), n.sym_next === n.sym_end);
var at = ql, ut = Yu, et = nt, ot = it, lt = Vl, tt = { _tr_init: at, _tr_stored_block: ut, _tr_flush_block: et, _tr_tally: ot, _tr_align: lt };
const ht = (n, a, i, u) => {
  let o = n & 65535 | 0, e = n >>> 16 & 65535 | 0, l = 0;
  for (; i !== 0; ) {
    l = i > 2e3 ? 2e3 : i, i -= l;
    do
      o = o + a[u++] | 0, e = e + o | 0;
    while (--l);
    o %= 65521, e %= 65521;
  }
  return o | e << 16 | 0;
};
var Wn = ht;
const gt = () => {
  let n, a = [];
  for (var i = 0; i < 256; i++) {
    n = i;
    for (var u = 0; u < 8; u++) n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
    a[i] = n;
  }
  return a;
}, rt = new Uint32Array(gt()), st = (n, a, i, u) => {
  const o = rt, e = u + i;
  n ^= -1;
  for (let l = u; l < e; l++) n = n >>> 8 ^ o[(n ^ a[l]) & 255];
  return n ^ -1;
};
var x = st, Ln = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }, jn = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
const { _tr_init: dt, _tr_stored_block: bi, _tr_flush_block: ct, _tr_tally: hn, _tr_align: Yt } = tt, { Z_NO_FLUSH: gn, Z_PARTIAL_FLUSH: Lt, Z_FULL_FLUSH: Zt, Z_FINISH: R, Z_BLOCK: da, Z_OK: F, Z_STREAM_END: ca, Z_STREAM_ERROR: U, Z_DATA_ERROR: Ct, Z_BUF_ERROR: Si, Z_DEFAULT_COMPRESSION: St, Z_FILTERED: ft, Z_HUFFMAN_ONLY: Vn, Z_RLE: Jt, Z_FIXED: Dt, Z_DEFAULT_STRATEGY: Xt, Z_UNKNOWN: pt, Z_DEFLATED: gi } = jn, Tt = 9, Ht = 15, _t = 8, yt = 29, mt = 256, xi = mt + 1 + yt, Qt = 30, wt = 19, Mt = 2 * xi + 1, Bt = 15, y = 3, tn = 258, $ = tn + y + 1, bt = 32, _n = 42, Oi = 57, Fi = 69, Gi = 73, vi = 91, Ni = 103, cn = 113, bn = 666, k = 1, wn = 2, Zn = 3, Mn = 4, xt = 3, Yn = (n, a) => (n.msg = Ln[a], a), Ya = (n) => n * 2 - (n > 4 ? 9 : 0), ln = (n) => {
  let a = n.length;
  for (; --a >= 0; ) n[a] = 0;
}, Ft = (n) => {
  let a, i, u, o = n.w_size;
  a = n.hash_size, u = a;
  do
    i = n.head[--u], n.head[u] = i >= o ? i - o : 0;
  while (--a);
  a = o, u = a;
  do
    i = n.prev[--u], n.prev[u] = i >= o ? i - o : 0;
  while (--a);
};
let Gt = (n, a, i) => (a << n.hash_shift ^ i) & n.hash_mask, rn = Gt;
const K = (n) => {
  const a = n.state;
  let i = a.pending;
  i > n.avail_out && (i = n.avail_out), i !== 0 && (n.output.set(a.pending_buf.subarray(a.pending_out, a.pending_out + i), n.next_out), n.next_out += i, a.pending_out += i, n.total_out += i, n.avail_out -= i, a.pending -= i, a.pending === 0 && (a.pending_out = 0));
}, W = (n, a) => {
  ct(n, n.block_start >= 0 ? n.block_start : -1, n.strstart - n.block_start, a), n.block_start = n.strstart, K(n.strm);
}, w = (n, a) => {
  n.pending_buf[n.pending++] = a;
}, Bn = (n, a) => {
  n.pending_buf[n.pending++] = a >>> 8 & 255, n.pending_buf[n.pending++] = a & 255;
}, ki = (n, a, i, u) => {
  let o = n.avail_in;
  return o > u && (o = u), o === 0 ? 0 : (n.avail_in -= o, a.set(n.input.subarray(n.next_in, n.next_in + o), i), n.state.wrap === 1 ? n.adler = Wn(n.adler, a, o, i) : n.state.wrap === 2 && (n.adler = x(n.adler, a, o, i)), n.next_in += o, n.total_in += o, o);
}, Lu = (n, a) => {
  let i = n.max_chain_length, u = n.strstart, o, e, l = n.prev_length, h = n.nice_match;
  const d = n.strstart > n.w_size - $ ? n.strstart - (n.w_size - $) : 0, t = n.window, g = n.w_mask, L = n.prev, c = n.strstart + tn;
  let r = t[u + l - 1], Y = t[u + l];
  n.prev_length >= n.good_match && (i >>= 2), h > n.lookahead && (h = n.lookahead);
  do
    if (o = a, !(t[o + l] !== Y || t[o + l - 1] !== r || t[o] !== t[u] || t[++o] !== t[u + 1])) {
      u += 2, o++;
      do
        ;
      while (t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && t[++u] === t[++o] && u < c);
      if (e = tn - (c - u), u = c - tn, e > l) {
        if (n.match_start = a, l = e, e >= h) break;
        r = t[u + l - 1], Y = t[u + l];
      }
    }
  while ((a = L[a & g]) > d && --i !== 0);
  return l <= n.lookahead ? l : n.lookahead;
}, yn = (n) => {
  const a = n.w_size;
  let i, u, o;
  do {
    if (u = n.window_size - n.lookahead - n.strstart, n.strstart >= a + (a - $) && (n.window.set(n.window.subarray(a, a + a - u), 0), n.match_start -= a, n.strstart -= a, n.block_start -= a, n.insert > n.strstart && (n.insert = n.strstart), Ft(n), u += a), n.strm.avail_in === 0) break;
    if (i = ki(n.strm, n.window, n.strstart + n.lookahead, u), n.lookahead += i, n.lookahead + n.insert >= y) for (o = n.strstart - n.insert, n.ins_h = n.window[o], n.ins_h = rn(n, n.ins_h, n.window[o + 1]); n.insert && (n.ins_h = rn(n, n.ins_h, n.window[o + y - 1]), n.prev[o & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = o, o++, n.insert--, !(n.lookahead + n.insert < y)); ) ;
  } while (n.lookahead < $ && n.strm.avail_in !== 0);
}, Zu = (n, a) => {
  let i = n.pending_buf_size - 5 > n.w_size ? n.w_size : n.pending_buf_size - 5, u, o, e, l = 0, h = n.strm.avail_in;
  do {
    if (u = 65535, e = n.bi_valid + 42 >> 3, n.strm.avail_out < e || (e = n.strm.avail_out - e, o = n.strstart - n.block_start, u > o + n.strm.avail_in && (u = o + n.strm.avail_in), u > e && (u = e), u < i && (u === 0 && a !== R || a === gn || u !== o + n.strm.avail_in))) break;
    l = a === R && u === o + n.strm.avail_in ? 1 : 0, bi(n, 0, 0, l), n.pending_buf[n.pending - 4] = u, n.pending_buf[n.pending - 3] = u >> 8, n.pending_buf[n.pending - 2] = ~u, n.pending_buf[n.pending - 1] = ~u >> 8, K(n.strm), o && (o > u && (o = u), n.strm.output.set(n.window.subarray(n.block_start, n.block_start + o), n.strm.next_out), n.strm.next_out += o, n.strm.avail_out -= o, n.strm.total_out += o, n.block_start += o, u -= o), u && (ki(n.strm, n.strm.output, n.strm.next_out, u), n.strm.next_out += u, n.strm.avail_out -= u, n.strm.total_out += u);
  } while (l === 0);
  return h -= n.strm.avail_in, h && (h >= n.w_size ? (n.matches = 2, n.window.set(n.strm.input.subarray(n.strm.next_in - n.w_size, n.strm.next_in), 0), n.strstart = n.w_size, n.insert = n.strstart) : (n.window_size - n.strstart <= h && (n.strstart -= n.w_size, n.window.set(n.window.subarray(n.w_size, n.w_size + n.strstart), 0), n.matches < 2 && n.matches++, n.insert > n.strstart && (n.insert = n.strstart)), n.window.set(n.strm.input.subarray(n.strm.next_in - h, n.strm.next_in), n.strstart), n.strstart += h, n.insert += h > n.w_size - n.insert ? n.w_size - n.insert : h), n.block_start = n.strstart), n.high_water < n.strstart && (n.high_water = n.strstart), l ? Mn : a !== gn && a !== R && n.strm.avail_in === 0 && n.strstart === n.block_start ? wn : (e = n.window_size - n.strstart, n.strm.avail_in > e && n.block_start >= n.w_size && (n.block_start -= n.w_size, n.strstart -= n.w_size, n.window.set(n.window.subarray(n.w_size, n.w_size + n.strstart), 0), n.matches < 2 && n.matches++, e += n.w_size, n.insert > n.strstart && (n.insert = n.strstart)), e > n.strm.avail_in && (e = n.strm.avail_in), e && (ki(n.strm, n.window, n.strstart, e), n.strstart += e, n.insert += e > n.w_size - n.insert ? n.w_size - n.insert : e), n.high_water < n.strstart && (n.high_water = n.strstart), e = n.bi_valid + 42 >> 3, e = n.pending_buf_size - e > 65535 ? 65535 : n.pending_buf_size - e, i = e > n.w_size ? n.w_size : e, o = n.strstart - n.block_start, (o >= i || (o || a === R) && a !== gn && n.strm.avail_in === 0 && o <= e) && (u = o > e ? e : o, l = a === R && n.strm.avail_in === 0 && u === o ? 1 : 0, bi(n, n.block_start, u, l), n.block_start += u, K(n.strm)), l ? Zn : k);
}, fi = (n, a) => {
  let i, u;
  for (; ; ) {
    if (n.lookahead < $) {
      if (yn(n), n.lookahead < $ && a === gn) return k;
      if (n.lookahead === 0) break;
    }
    if (i = 0, n.lookahead >= y && (n.ins_h = rn(n, n.ins_h, n.window[n.strstart + y - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart), i !== 0 && n.strstart - i <= n.w_size - $ && (n.match_length = Lu(n, i)), n.match_length >= y) if (u = hn(n, n.strstart - n.match_start, n.match_length - y), n.lookahead -= n.match_length, n.match_length <= n.max_lazy_match && n.lookahead >= y) {
      n.match_length--;
      do
        n.strstart++, n.ins_h = rn(n, n.ins_h, n.window[n.strstart + y - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart;
      while (--n.match_length !== 0);
      n.strstart++;
    } else n.strstart += n.match_length, n.match_length = 0, n.ins_h = n.window[n.strstart], n.ins_h = rn(n, n.ins_h, n.window[n.strstart + 1]);
    else u = hn(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++;
    if (u && (W(n, false), n.strm.avail_out === 0)) return k;
  }
  return n.insert = n.strstart < y - 1 ? n.strstart : y - 1, a === R ? (W(n, true), n.strm.avail_out === 0 ? Zn : Mn) : n.sym_next && (W(n, false), n.strm.avail_out === 0) ? k : wn;
}, Dn = (n, a) => {
  let i, u, o;
  for (; ; ) {
    if (n.lookahead < $) {
      if (yn(n), n.lookahead < $ && a === gn) return k;
      if (n.lookahead === 0) break;
    }
    if (i = 0, n.lookahead >= y && (n.ins_h = rn(n, n.ins_h, n.window[n.strstart + y - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart), n.prev_length = n.match_length, n.prev_match = n.match_start, n.match_length = y - 1, i !== 0 && n.prev_length < n.max_lazy_match && n.strstart - i <= n.w_size - $ && (n.match_length = Lu(n, i), n.match_length <= 5 && (n.strategy === ft || n.match_length === y && n.strstart - n.match_start > 4096) && (n.match_length = y - 1)), n.prev_length >= y && n.match_length <= n.prev_length) {
      o = n.strstart + n.lookahead - y, u = hn(n, n.strstart - 1 - n.prev_match, n.prev_length - y), n.lookahead -= n.prev_length - 1, n.prev_length -= 2;
      do
        ++n.strstart <= o && (n.ins_h = rn(n, n.ins_h, n.window[n.strstart + y - 1]), i = n.prev[n.strstart & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = n.strstart);
      while (--n.prev_length !== 0);
      if (n.match_available = 0, n.match_length = y - 1, n.strstart++, u && (W(n, false), n.strm.avail_out === 0)) return k;
    } else if (n.match_available) {
      if (u = hn(n, 0, n.window[n.strstart - 1]), u && W(n, false), n.strstart++, n.lookahead--, n.strm.avail_out === 0) return k;
    } else n.match_available = 1, n.strstart++, n.lookahead--;
  }
  return n.match_available && (u = hn(n, 0, n.window[n.strstart - 1]), n.match_available = 0), n.insert = n.strstart < y - 1 ? n.strstart : y - 1, a === R ? (W(n, true), n.strm.avail_out === 0 ? Zn : Mn) : n.sym_next && (W(n, false), n.strm.avail_out === 0) ? k : wn;
}, vt = (n, a) => {
  let i, u, o, e;
  const l = n.window;
  for (; ; ) {
    if (n.lookahead <= tn) {
      if (yn(n), n.lookahead <= tn && a === gn) return k;
      if (n.lookahead === 0) break;
    }
    if (n.match_length = 0, n.lookahead >= y && n.strstart > 0 && (o = n.strstart - 1, u = l[o], u === l[++o] && u === l[++o] && u === l[++o])) {
      e = n.strstart + tn;
      do
        ;
      while (u === l[++o] && u === l[++o] && u === l[++o] && u === l[++o] && u === l[++o] && u === l[++o] && u === l[++o] && u === l[++o] && o < e);
      n.match_length = tn - (e - o), n.match_length > n.lookahead && (n.match_length = n.lookahead);
    }
    if (n.match_length >= y ? (i = hn(n, 1, n.match_length - y), n.lookahead -= n.match_length, n.strstart += n.match_length, n.match_length = 0) : (i = hn(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++), i && (W(n, false), n.strm.avail_out === 0)) return k;
  }
  return n.insert = 0, a === R ? (W(n, true), n.strm.avail_out === 0 ? Zn : Mn) : n.sym_next && (W(n, false), n.strm.avail_out === 0) ? k : wn;
}, Nt = (n, a) => {
  let i;
  for (; ; ) {
    if (n.lookahead === 0 && (yn(n), n.lookahead === 0)) {
      if (a === gn) return k;
      break;
    }
    if (n.match_length = 0, i = hn(n, 0, n.window[n.strstart]), n.lookahead--, n.strstart++, i && (W(n, false), n.strm.avail_out === 0)) return k;
  }
  return n.insert = 0, a === R ? (W(n, true), n.strm.avail_out === 0 ? Zn : Mn) : n.sym_next && (W(n, false), n.strm.avail_out === 0) ? k : wn;
};
function j(n, a, i, u, o) {
  this.good_length = n, this.max_lazy = a, this.nice_length = i, this.max_chain = u, this.func = o;
}
const xn = [new j(0, 0, 0, 0, Zu), new j(4, 4, 8, 4, fi), new j(4, 5, 16, 8, fi), new j(4, 6, 32, 32, fi), new j(4, 4, 16, 16, Dn), new j(8, 16, 32, 32, Dn), new j(8, 16, 128, 128, Dn), new j(8, 32, 128, 256, Dn), new j(32, 128, 258, 1024, Dn), new j(32, 258, 258, 4096, Dn)], kt = (n) => {
  n.window_size = 2 * n.w_size, ln(n.head), n.max_lazy_match = xn[n.level].max_lazy, n.good_match = xn[n.level].good_length, n.nice_match = xn[n.level].nice_length, n.max_chain_length = xn[n.level].max_chain, n.strstart = 0, n.block_start = 0, n.lookahead = 0, n.insert = 0, n.match_length = n.prev_length = y - 1, n.match_available = 0, n.ins_h = 0;
};
function Pt() {
  this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = gi, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(Mt * 2), this.dyn_dtree = new Uint16Array((2 * Qt + 1) * 2), this.bl_tree = new Uint16Array((2 * wt + 1) * 2), ln(this.dyn_ltree), ln(this.dyn_dtree), ln(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(Bt + 1), this.heap = new Uint16Array(2 * xi + 1), ln(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(2 * xi + 1), ln(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
const In = (n) => {
  if (!n) return 1;
  const a = n.state;
  return !a || a.strm !== n || a.status !== _n && a.status !== Oi && a.status !== Fi && a.status !== Gi && a.status !== vi && a.status !== Ni && a.status !== cn && a.status !== bn ? 1 : 0;
}, Cu = (n) => {
  if (In(n)) return Yn(n, U);
  n.total_in = n.total_out = 0, n.data_type = pt;
  const a = n.state;
  return a.pending = 0, a.pending_out = 0, a.wrap < 0 && (a.wrap = -a.wrap), a.status = a.wrap === 2 ? Oi : a.wrap ? _n : cn, n.adler = a.wrap === 2 ? 0 : 1, a.last_flush = -2, dt(a), F;
}, Su = (n) => {
  const a = Cu(n);
  return a === F && kt(n.state), a;
}, Et = (n, a) => In(n) || n.state.wrap !== 2 ? U : (n.state.gzhead = a, F), fu = (n, a, i, u, o, e) => {
  if (!n) return U;
  let l = 1;
  if (a === St && (a = 6), u < 0 ? (l = 0, u = -u) : u > 15 && (l = 2, u -= 16), o < 1 || o > Tt || i !== gi || u < 8 || u > 15 || a < 0 || a > 9 || e < 0 || e > Dt || u === 8 && l !== 1) return Yn(n, U);
  u === 8 && (u = 9);
  const h = new Pt();
  return n.state = h, h.strm = n, h.status = _n, h.wrap = l, h.gzhead = null, h.w_bits = u, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.hash_bits = o + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + y - 1) / y), h.window = new Uint8Array(h.w_size * 2), h.head = new Uint16Array(h.hash_size), h.prev = new Uint16Array(h.w_size), h.lit_bufsize = 1 << o + 6, h.pending_buf_size = h.lit_bufsize * 4, h.pending_buf = new Uint8Array(h.pending_buf_size), h.sym_buf = h.lit_bufsize, h.sym_end = (h.lit_bufsize - 1) * 3, h.level = a, h.strategy = e, h.method = i, Su(n);
}, Kt = (n, a) => fu(n, a, gi, Ht, _t, Xt), Wt = (n, a) => {
  if (In(n) || a > da || a < 0) return n ? Yn(n, U) : U;
  const i = n.state;
  if (!n.output || n.avail_in !== 0 && !n.input || i.status === bn && a !== R) return Yn(n, n.avail_out === 0 ? Si : U);
  const u = i.last_flush;
  if (i.last_flush = a, i.pending !== 0) {
    if (K(n), n.avail_out === 0) return i.last_flush = -1, F;
  } else if (n.avail_in === 0 && Ya(a) <= Ya(u) && a !== R) return Yn(n, Si);
  if (i.status === bn && n.avail_in !== 0) return Yn(n, Si);
  if (i.status === _n && i.wrap === 0 && (i.status = cn), i.status === _n) {
    let o = gi + (i.w_bits - 8 << 4) << 8, e = -1;
    if (i.strategy >= Vn || i.level < 2 ? e = 0 : i.level < 6 ? e = 1 : i.level === 6 ? e = 2 : e = 3, o |= e << 6, i.strstart !== 0 && (o |= bt), o += 31 - o % 31, Bn(i, o), i.strstart !== 0 && (Bn(i, n.adler >>> 16), Bn(i, n.adler & 65535)), n.adler = 1, i.status = cn, K(n), i.pending !== 0) return i.last_flush = -1, F;
  }
  if (i.status === Oi) {
    if (n.adler = 0, w(i, 31), w(i, 139), w(i, 8), i.gzhead) w(i, (i.gzhead.text ? 1 : 0) + (i.gzhead.hcrc ? 2 : 0) + (i.gzhead.extra ? 4 : 0) + (i.gzhead.name ? 8 : 0) + (i.gzhead.comment ? 16 : 0)), w(i, i.gzhead.time & 255), w(i, i.gzhead.time >> 8 & 255), w(i, i.gzhead.time >> 16 & 255), w(i, i.gzhead.time >> 24 & 255), w(i, i.level === 9 ? 2 : i.strategy >= Vn || i.level < 2 ? 4 : 0), w(i, i.gzhead.os & 255), i.gzhead.extra && i.gzhead.extra.length && (w(i, i.gzhead.extra.length & 255), w(i, i.gzhead.extra.length >> 8 & 255)), i.gzhead.hcrc && (n.adler = x(n.adler, i.pending_buf, i.pending, 0)), i.gzindex = 0, i.status = Fi;
    else if (w(i, 0), w(i, 0), w(i, 0), w(i, 0), w(i, 0), w(i, i.level === 9 ? 2 : i.strategy >= Vn || i.level < 2 ? 4 : 0), w(i, xt), i.status = cn, K(n), i.pending !== 0) return i.last_flush = -1, F;
  }
  if (i.status === Fi) {
    if (i.gzhead.extra) {
      let o = i.pending, e = (i.gzhead.extra.length & 65535) - i.gzindex;
      for (; i.pending + e > i.pending_buf_size; ) {
        let h = i.pending_buf_size - i.pending;
        if (i.pending_buf.set(i.gzhead.extra.subarray(i.gzindex, i.gzindex + h), i.pending), i.pending = i.pending_buf_size, i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o)), i.gzindex += h, K(n), i.pending !== 0) return i.last_flush = -1, F;
        o = 0, e -= h;
      }
      let l = new Uint8Array(i.gzhead.extra);
      i.pending_buf.set(l.subarray(i.gzindex, i.gzindex + e), i.pending), i.pending += e, i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o)), i.gzindex = 0;
    }
    i.status = Gi;
  }
  if (i.status === Gi) {
    if (i.gzhead.name) {
      let o = i.pending, e;
      do {
        if (i.pending === i.pending_buf_size) {
          if (i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o)), K(n), i.pending !== 0) return i.last_flush = -1, F;
          o = 0;
        }
        i.gzindex < i.gzhead.name.length ? e = i.gzhead.name.charCodeAt(i.gzindex++) & 255 : e = 0, w(i, e);
      } while (e !== 0);
      i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o)), i.gzindex = 0;
    }
    i.status = vi;
  }
  if (i.status === vi) {
    if (i.gzhead.comment) {
      let o = i.pending, e;
      do {
        if (i.pending === i.pending_buf_size) {
          if (i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o)), K(n), i.pending !== 0) return i.last_flush = -1, F;
          o = 0;
        }
        i.gzindex < i.gzhead.comment.length ? e = i.gzhead.comment.charCodeAt(i.gzindex++) & 255 : e = 0, w(i, e);
      } while (e !== 0);
      i.gzhead.hcrc && i.pending > o && (n.adler = x(n.adler, i.pending_buf, i.pending - o, o));
    }
    i.status = Ni;
  }
  if (i.status === Ni) {
    if (i.gzhead.hcrc) {
      if (i.pending + 2 > i.pending_buf_size && (K(n), i.pending !== 0)) return i.last_flush = -1, F;
      w(i, n.adler & 255), w(i, n.adler >> 8 & 255), n.adler = 0;
    }
    if (i.status = cn, K(n), i.pending !== 0) return i.last_flush = -1, F;
  }
  if (n.avail_in !== 0 || i.lookahead !== 0 || a !== gn && i.status !== bn) {
    let o = i.level === 0 ? Zu(i, a) : i.strategy === Vn ? Nt(i, a) : i.strategy === Jt ? vt(i, a) : xn[i.level].func(i, a);
    if ((o === Zn || o === Mn) && (i.status = bn), o === k || o === Zn) return n.avail_out === 0 && (i.last_flush = -1), F;
    if (o === wn && (a === Lt ? Yt(i) : a !== da && (bi(i, 0, 0, false), a === Zt && (ln(i.head), i.lookahead === 0 && (i.strstart = 0, i.block_start = 0, i.insert = 0))), K(n), n.avail_out === 0)) return i.last_flush = -1, F;
  }
  return a !== R ? F : i.wrap <= 0 ? ca : (i.wrap === 2 ? (w(i, n.adler & 255), w(i, n.adler >> 8 & 255), w(i, n.adler >> 16 & 255), w(i, n.adler >> 24 & 255), w(i, n.total_in & 255), w(i, n.total_in >> 8 & 255), w(i, n.total_in >> 16 & 255), w(i, n.total_in >> 24 & 255)) : (Bn(i, n.adler >>> 16), Bn(i, n.adler & 65535)), K(n), i.wrap > 0 && (i.wrap = -i.wrap), i.pending !== 0 ? F : ca);
}, Rt = (n) => {
  if (In(n)) return U;
  const a = n.state.status;
  return n.state = null, a === cn ? Yn(n, Ct) : F;
}, At = (n, a) => {
  let i = a.length;
  if (In(n)) return U;
  const u = n.state, o = u.wrap;
  if (o === 2 || o === 1 && u.status !== _n || u.lookahead) return U;
  if (o === 1 && (n.adler = Wn(n.adler, a, i, 0)), u.wrap = 0, i >= u.w_size) {
    o === 0 && (ln(u.head), u.strstart = 0, u.block_start = 0, u.insert = 0);
    let d = new Uint8Array(u.w_size);
    d.set(a.subarray(i - u.w_size, i), 0), a = d, i = u.w_size;
  }
  const e = n.avail_in, l = n.next_in, h = n.input;
  for (n.avail_in = i, n.next_in = 0, n.input = a, yn(u); u.lookahead >= y; ) {
    let d = u.strstart, t = u.lookahead - (y - 1);
    do
      u.ins_h = rn(u, u.ins_h, u.window[d + y - 1]), u.prev[d & u.w_mask] = u.head[u.ins_h], u.head[u.ins_h] = d, d++;
    while (--t);
    u.strstart = d, u.lookahead = y - 1, yn(u);
  }
  return u.strstart += u.lookahead, u.block_start = u.strstart, u.insert = u.lookahead, u.lookahead = 0, u.match_length = u.prev_length = y - 1, u.match_available = 0, n.next_in = l, n.input = h, n.avail_in = e, u.wrap = o, F;
};
var zt = Kt, Ot = fu, jt = Su, It = Cu, Ut = Et, $t = Wt, qt = Rt, Vt = At, nh = "pako deflate (from Nodeca project)", vn = { deflateInit: zt, deflateInit2: Ot, deflateReset: jt, deflateResetKeep: It, deflateSetHeader: Ut, deflate: $t, deflateEnd: qt, deflateSetDictionary: Vt, deflateInfo: nh };
const ih = (n, a) => Object.prototype.hasOwnProperty.call(n, a);
var ah = function(n) {
  const a = Array.prototype.slice.call(arguments, 1);
  for (; a.length; ) {
    const i = a.shift();
    if (i) {
      if (typeof i != "object") throw new TypeError(i + "must be non-object");
      for (const u in i) ih(i, u) && (n[u] = i[u]);
    }
  }
  return n;
}, uh = (n) => {
  let a = 0;
  for (let u = 0, o = n.length; u < o; u++) a += n[u].length;
  const i = new Uint8Array(a);
  for (let u = 0, o = 0, e = n.length; u < e; u++) {
    let l = n[u];
    i.set(l, o), o += l.length;
  }
  return i;
}, ri = { assign: ah, flattenChunks: uh };
let Ju = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  Ju = false;
}
const Rn = new Uint8Array(256);
for (let n = 0; n < 256; n++) Rn[n] = n >= 252 ? 6 : n >= 248 ? 5 : n >= 240 ? 4 : n >= 224 ? 3 : n >= 192 ? 2 : 1;
Rn[254] = Rn[254] = 1;
var eh = (n) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(n);
  let a, i, u, o, e, l = n.length, h = 0;
  for (o = 0; o < l; o++) i = n.charCodeAt(o), (i & 64512) === 55296 && o + 1 < l && (u = n.charCodeAt(o + 1), (u & 64512) === 56320 && (i = 65536 + (i - 55296 << 10) + (u - 56320), o++)), h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
  for (a = new Uint8Array(h), e = 0, o = 0; e < h; o++) i = n.charCodeAt(o), (i & 64512) === 55296 && o + 1 < l && (u = n.charCodeAt(o + 1), (u & 64512) === 56320 && (i = 65536 + (i - 55296 << 10) + (u - 56320), o++)), i < 128 ? a[e++] = i : i < 2048 ? (a[e++] = 192 | i >>> 6, a[e++] = 128 | i & 63) : i < 65536 ? (a[e++] = 224 | i >>> 12, a[e++] = 128 | i >>> 6 & 63, a[e++] = 128 | i & 63) : (a[e++] = 240 | i >>> 18, a[e++] = 128 | i >>> 12 & 63, a[e++] = 128 | i >>> 6 & 63, a[e++] = 128 | i & 63);
  return a;
};
const oh = (n, a) => {
  if (a < 65534 && n.subarray && Ju) return String.fromCharCode.apply(null, n.length === a ? n : n.subarray(0, a));
  let i = "";
  for (let u = 0; u < a; u++) i += String.fromCharCode(n[u]);
  return i;
};
var lh = (n, a) => {
  const i = a || n.length;
  if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(n.subarray(0, a));
  let u, o;
  const e = new Array(i * 2);
  for (o = 0, u = 0; u < i; ) {
    let l = n[u++];
    if (l < 128) {
      e[o++] = l;
      continue;
    }
    let h = Rn[l];
    if (h > 4) {
      e[o++] = 65533, u += h - 1;
      continue;
    }
    for (l &= h === 2 ? 31 : h === 3 ? 15 : 7; h > 1 && u < i; ) l = l << 6 | n[u++] & 63, h--;
    if (h > 1) {
      e[o++] = 65533;
      continue;
    }
    l < 65536 ? e[o++] = l : (l -= 65536, e[o++] = 55296 | l >> 10 & 1023, e[o++] = 56320 | l & 1023);
  }
  return oh(e, o);
}, th = (n, a) => {
  a = a || n.length, a > n.length && (a = n.length);
  let i = a - 1;
  for (; i >= 0 && (n[i] & 192) === 128; ) i--;
  return i < 0 || i === 0 ? a : i + Rn[n[i]] > a ? i : a;
}, An = { string2buf: eh, buf2string: lh, utf8border: th };
function hh() {
  this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var Du = hh;
const Xu = Object.prototype.toString, { Z_NO_FLUSH: gh, Z_SYNC_FLUSH: rh, Z_FULL_FLUSH: sh, Z_FINISH: dh, Z_OK: ti, Z_STREAM_END: ch, Z_DEFAULT_COMPRESSION: Yh, Z_DEFAULT_STRATEGY: Lh, Z_DEFLATED: Zh } = jn;
function Un(n) {
  this.options = ri.assign({ level: Yh, method: Zh, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: Lh }, n || {});
  let a = this.options;
  a.raw && a.windowBits > 0 ? a.windowBits = -a.windowBits : a.gzip && a.windowBits > 0 && a.windowBits < 16 && (a.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new Du(), this.strm.avail_out = 0;
  let i = vn.deflateInit2(this.strm, a.level, a.method, a.windowBits, a.memLevel, a.strategy);
  if (i !== ti) throw new Error(Ln[i]);
  if (a.header && vn.deflateSetHeader(this.strm, a.header), a.dictionary) {
    let u;
    if (typeof a.dictionary == "string" ? u = An.string2buf(a.dictionary) : Xu.call(a.dictionary) === "[object ArrayBuffer]" ? u = new Uint8Array(a.dictionary) : u = a.dictionary, i = vn.deflateSetDictionary(this.strm, u), i !== ti) throw new Error(Ln[i]);
    this._dict_set = true;
  }
}
Un.prototype.push = function(n, a) {
  const i = this.strm, u = this.options.chunkSize;
  let o, e;
  if (this.ended) return false;
  for (a === ~~a ? e = a : e = a === true ? dh : gh, typeof n == "string" ? i.input = An.string2buf(n) : Xu.call(n) === "[object ArrayBuffer]" ? i.input = new Uint8Array(n) : i.input = n, i.next_in = 0, i.avail_in = i.input.length; ; ) {
    if (i.avail_out === 0 && (i.output = new Uint8Array(u), i.next_out = 0, i.avail_out = u), (e === rh || e === sh) && i.avail_out <= 6) {
      this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
      continue;
    }
    if (o = vn.deflate(i, e), o === ch) return i.next_out > 0 && this.onData(i.output.subarray(0, i.next_out)), o = vn.deflateEnd(this.strm), this.onEnd(o), this.ended = true, o === ti;
    if (i.avail_out === 0) {
      this.onData(i.output);
      continue;
    }
    if (e > 0 && i.next_out > 0) {
      this.onData(i.output.subarray(0, i.next_out)), i.avail_out = 0;
      continue;
    }
    if (i.avail_in === 0) break;
  }
  return true;
};
Un.prototype.onData = function(n) {
  this.chunks.push(n);
};
Un.prototype.onEnd = function(n) {
  n === ti && (this.result = ri.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
};
function ji(n, a) {
  const i = new Un(a);
  if (i.push(n, true), i.err) throw i.msg || Ln[i.err];
  return i.result;
}
function Ch(n, a) {
  return a = a || {}, a.raw = true, ji(n, a);
}
function Sh(n, a) {
  return a = a || {}, a.gzip = true, ji(n, a);
}
var fh = Un, Jh = ji, Dh = Ch, Xh = Sh, ph = { Deflate: fh, deflate: Jh, deflateRaw: Dh, gzip: Xh };
const ni = 16209, Th = 16191;
var Hh = function(a, i) {
  let u, o, e, l, h, d, t, g, L, c, r, Y, D, X, S, Q, T, Z, m, b, C, M, H, f;
  const _ = a.state;
  u = a.next_in, H = a.input, o = u + (a.avail_in - 5), e = a.next_out, f = a.output, l = e - (i - a.avail_out), h = e + (a.avail_out - 257), d = _.dmax, t = _.wsize, g = _.whave, L = _.wnext, c = _.window, r = _.hold, Y = _.bits, D = _.lencode, X = _.distcode, S = (1 << _.lenbits) - 1, Q = (1 << _.distbits) - 1;
  n: do {
    Y < 15 && (r += H[u++] << Y, Y += 8, r += H[u++] << Y, Y += 8), T = D[r & S];
    i: for (; ; ) {
      if (Z = T >>> 24, r >>>= Z, Y -= Z, Z = T >>> 16 & 255, Z === 0) f[e++] = T & 65535;
      else if (Z & 16) {
        m = T & 65535, Z &= 15, Z && (Y < Z && (r += H[u++] << Y, Y += 8), m += r & (1 << Z) - 1, r >>>= Z, Y -= Z), Y < 15 && (r += H[u++] << Y, Y += 8, r += H[u++] << Y, Y += 8), T = X[r & Q];
        a: for (; ; ) {
          if (Z = T >>> 24, r >>>= Z, Y -= Z, Z = T >>> 16 & 255, Z & 16) {
            if (b = T & 65535, Z &= 15, Y < Z && (r += H[u++] << Y, Y += 8, Y < Z && (r += H[u++] << Y, Y += 8)), b += r & (1 << Z) - 1, b > d) {
              a.msg = "invalid distance too far back", _.mode = ni;
              break n;
            }
            if (r >>>= Z, Y -= Z, Z = e - l, b > Z) {
              if (Z = b - Z, Z > g && _.sane) {
                a.msg = "invalid distance too far back", _.mode = ni;
                break n;
              }
              if (C = 0, M = c, L === 0) {
                if (C += t - Z, Z < m) {
                  m -= Z;
                  do
                    f[e++] = c[C++];
                  while (--Z);
                  C = e - b, M = f;
                }
              } else if (L < Z) {
                if (C += t + L - Z, Z -= L, Z < m) {
                  m -= Z;
                  do
                    f[e++] = c[C++];
                  while (--Z);
                  if (C = 0, L < m) {
                    Z = L, m -= Z;
                    do
                      f[e++] = c[C++];
                    while (--Z);
                    C = e - b, M = f;
                  }
                }
              } else if (C += L - Z, Z < m) {
                m -= Z;
                do
                  f[e++] = c[C++];
                while (--Z);
                C = e - b, M = f;
              }
              for (; m > 2; ) f[e++] = M[C++], f[e++] = M[C++], f[e++] = M[C++], m -= 3;
              m && (f[e++] = M[C++], m > 1 && (f[e++] = M[C++]));
            } else {
              C = e - b;
              do
                f[e++] = f[C++], f[e++] = f[C++], f[e++] = f[C++], m -= 3;
              while (m > 2);
              m && (f[e++] = f[C++], m > 1 && (f[e++] = f[C++]));
            }
          } else if ((Z & 64) === 0) {
            T = X[(T & 65535) + (r & (1 << Z) - 1)];
            continue a;
          } else {
            a.msg = "invalid distance code", _.mode = ni;
            break n;
          }
          break;
        }
      } else if ((Z & 64) === 0) {
        T = D[(T & 65535) + (r & (1 << Z) - 1)];
        continue i;
      } else if (Z & 32) {
        _.mode = Th;
        break n;
      } else {
        a.msg = "invalid literal/length code", _.mode = ni;
        break n;
      }
      break;
    }
  } while (u < o && e < h);
  m = Y >> 3, u -= m, Y -= m << 3, r &= (1 << Y) - 1, a.next_in = u, a.next_out = e, a.avail_in = u < o ? 5 + (o - u) : 5 - (u - o), a.avail_out = e < h ? 257 + (h - e) : 257 - (e - h), _.hold = r, _.bits = Y;
};
const Xn = 15, La = 852, Za = 592, Ca = 0, Ji = 1, Sa = 2, _h = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]), yh = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]), mh = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]), Qh = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]), wh = (n, a, i, u, o, e, l, h) => {
  const d = h.bits;
  let t = 0, g = 0, L = 0, c = 0, r = 0, Y = 0, D = 0, X = 0, S = 0, Q = 0, T, Z, m, b, C, M = null, H;
  const f = new Uint16Array(Xn + 1), _ = new Uint16Array(Xn + 1);
  let q = null, qn, fn, Jn;
  for (t = 0; t <= Xn; t++) f[t] = 0;
  for (g = 0; g < u; g++) f[a[i + g]]++;
  for (r = d, c = Xn; c >= 1 && f[c] === 0; c--) ;
  if (r > c && (r = c), c === 0) return o[e++] = 1 << 24 | 64 << 16 | 0, o[e++] = 1 << 24 | 64 << 16 | 0, h.bits = 1, 0;
  for (L = 1; L < c && f[L] === 0; L++) ;
  for (r < L && (r = L), X = 1, t = 1; t <= Xn; t++) if (X <<= 1, X -= f[t], X < 0) return -1;
  if (X > 0 && (n === Ca || c !== 1)) return -1;
  for (_[1] = 0, t = 1; t < Xn; t++) _[t + 1] = _[t] + f[t];
  for (g = 0; g < u; g++) a[i + g] !== 0 && (l[_[a[i + g]]++] = g);
  if (n === Ca ? (M = q = l, H = 20) : n === Ji ? (M = _h, q = yh, H = 257) : (M = mh, q = Qh, H = 0), Q = 0, g = 0, t = L, C = e, Y = r, D = 0, m = -1, S = 1 << r, b = S - 1, n === Ji && S > La || n === Sa && S > Za) return 1;
  for (; ; ) {
    qn = t - D, l[g] + 1 < H ? (fn = 0, Jn = l[g]) : l[g] >= H ? (fn = q[l[g] - H], Jn = M[l[g] - H]) : (fn = 96, Jn = 0), T = 1 << t - D, Z = 1 << Y, L = Z;
    do
      Z -= T, o[C + (Q >> D) + Z] = qn << 24 | fn << 16 | Jn | 0;
    while (Z !== 0);
    for (T = 1 << t - 1; Q & T; ) T >>= 1;
    if (T !== 0 ? (Q &= T - 1, Q += T) : Q = 0, g++, --f[t] === 0) {
      if (t === c) break;
      t = a[i + l[g]];
    }
    if (t > r && (Q & b) !== m) {
      for (D === 0 && (D = r), C += L, Y = t - D, X = 1 << Y; Y + D < c && (X -= f[Y + D], !(X <= 0)); ) Y++, X <<= 1;
      if (S += 1 << Y, n === Ji && S > La || n === Sa && S > Za) return 1;
      m = Q & b, o[m] = r << 24 | Y << 16 | C - e | 0;
    }
  }
  return Q !== 0 && (o[C + Q] = t - D << 24 | 64 << 16 | 0), h.bits = r, 0;
};
var Nn = wh;
const Mh = 0, pu = 1, Tu = 2, { Z_FINISH: fa, Z_BLOCK: Bh, Z_TREES: ii, Z_OK: Cn, Z_STREAM_END: bh, Z_NEED_DICT: xh, Z_STREAM_ERROR: A, Z_DATA_ERROR: Hu, Z_MEM_ERROR: _u, Z_BUF_ERROR: Fh, Z_DEFLATED: Ja } = jn, si = 16180, Da = 16181, Xa = 16182, pa = 16183, Ta = 16184, Ha = 16185, _a = 16186, ya = 16187, ma = 16188, Qa = 16189, hi = 16190, nn = 16191, Di = 16192, wa = 16193, Xi = 16194, Ma = 16195, Ba = 16196, ba = 16197, xa = 16198, ai = 16199, ui = 16200, Fa = 16201, Ga = 16202, va = 16203, Na = 16204, ka = 16205, pi = 16206, Pa = 16207, Ea = 16208, B = 16209, yu = 16210, mu = 16211, Gh = 852, vh = 592, Nh = 15, kh = Nh, Ka = (n) => (n >>> 24 & 255) + (n >>> 8 & 65280) + ((n & 65280) << 8) + ((n & 255) << 24);
function Ph() {
  this.strm = null, this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
const Sn = (n) => {
  if (!n) return 1;
  const a = n.state;
  return !a || a.strm !== n || a.mode < si || a.mode > mu ? 1 : 0;
}, Qu = (n) => {
  if (Sn(n)) return A;
  const a = n.state;
  return n.total_in = n.total_out = a.total = 0, n.msg = "", a.wrap && (n.adler = a.wrap & 1), a.mode = si, a.last = 0, a.havedict = 0, a.flags = -1, a.dmax = 32768, a.head = null, a.hold = 0, a.bits = 0, a.lencode = a.lendyn = new Int32Array(Gh), a.distcode = a.distdyn = new Int32Array(vh), a.sane = 1, a.back = -1, Cn;
}, wu = (n) => {
  if (Sn(n)) return A;
  const a = n.state;
  return a.wsize = 0, a.whave = 0, a.wnext = 0, Qu(n);
}, Mu = (n, a) => {
  let i;
  if (Sn(n)) return A;
  const u = n.state;
  return a < 0 ? (i = 0, a = -a) : (i = (a >> 4) + 5, a < 48 && (a &= 15)), a && (a < 8 || a > 15) ? A : (u.window !== null && u.wbits !== a && (u.window = null), u.wrap = i, u.wbits = a, wu(n));
}, Bu = (n, a) => {
  if (!n) return A;
  const i = new Ph();
  n.state = i, i.strm = n, i.window = null, i.mode = si;
  const u = Mu(n, a);
  return u !== Cn && (n.state = null), u;
}, Eh = (n) => Bu(n, kh);
let Wa = true, Ti, Hi;
const Kh = (n) => {
  if (Wa) {
    Ti = new Int32Array(512), Hi = new Int32Array(32);
    let a = 0;
    for (; a < 144; ) n.lens[a++] = 8;
    for (; a < 256; ) n.lens[a++] = 9;
    for (; a < 280; ) n.lens[a++] = 7;
    for (; a < 288; ) n.lens[a++] = 8;
    for (Nn(pu, n.lens, 0, 288, Ti, 0, n.work, { bits: 9 }), a = 0; a < 32; ) n.lens[a++] = 5;
    Nn(Tu, n.lens, 0, 32, Hi, 0, n.work, { bits: 5 }), Wa = false;
  }
  n.lencode = Ti, n.lenbits = 9, n.distcode = Hi, n.distbits = 5;
}, bu = (n, a, i, u) => {
  let o;
  const e = n.state;
  return e.window === null && (e.wsize = 1 << e.wbits, e.wnext = 0, e.whave = 0, e.window = new Uint8Array(e.wsize)), u >= e.wsize ? (e.window.set(a.subarray(i - e.wsize, i), 0), e.wnext = 0, e.whave = e.wsize) : (o = e.wsize - e.wnext, o > u && (o = u), e.window.set(a.subarray(i - u, i - u + o), e.wnext), u -= o, u ? (e.window.set(a.subarray(i - u, i), 0), e.wnext = u, e.whave = e.wsize) : (e.wnext += o, e.wnext === e.wsize && (e.wnext = 0), e.whave < e.wsize && (e.whave += o))), 0;
}, Wh = (n, a) => {
  let i, u, o, e, l, h, d, t, g, L, c, r, Y, D, X = 0, S, Q, T, Z, m, b, C, M;
  const H = new Uint8Array(4);
  let f, _;
  const q = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (Sn(n) || !n.output || !n.input && n.avail_in !== 0) return A;
  i = n.state, i.mode === nn && (i.mode = Di), l = n.next_out, o = n.output, d = n.avail_out, e = n.next_in, u = n.input, h = n.avail_in, t = i.hold, g = i.bits, L = h, c = d, M = Cn;
  n: for (; ; ) switch (i.mode) {
    case si:
      if (i.wrap === 0) {
        i.mode = Di;
        break;
      }
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if (i.wrap & 2 && t === 35615) {
        i.wbits === 0 && (i.wbits = 15), i.check = 0, H[0] = t & 255, H[1] = t >>> 8 & 255, i.check = x(i.check, H, 2, 0), t = 0, g = 0, i.mode = Da;
        break;
      }
      if (i.head && (i.head.done = false), !(i.wrap & 1) || (((t & 255) << 8) + (t >> 8)) % 31) {
        n.msg = "incorrect header check", i.mode = B;
        break;
      }
      if ((t & 15) !== Ja) {
        n.msg = "unknown compression method", i.mode = B;
        break;
      }
      if (t >>>= 4, g -= 4, C = (t & 15) + 8, i.wbits === 0 && (i.wbits = C), C > 15 || C > i.wbits) {
        n.msg = "invalid window size", i.mode = B;
        break;
      }
      i.dmax = 1 << i.wbits, i.flags = 0, n.adler = i.check = 1, i.mode = t & 512 ? Qa : nn, t = 0, g = 0;
      break;
    case Da:
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if (i.flags = t, (i.flags & 255) !== Ja) {
        n.msg = "unknown compression method", i.mode = B;
        break;
      }
      if (i.flags & 57344) {
        n.msg = "unknown header flags set", i.mode = B;
        break;
      }
      i.head && (i.head.text = t >> 8 & 1), i.flags & 512 && i.wrap & 4 && (H[0] = t & 255, H[1] = t >>> 8 & 255, i.check = x(i.check, H, 2, 0)), t = 0, g = 0, i.mode = Xa;
    case Xa:
      for (; g < 32; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      i.head && (i.head.time = t), i.flags & 512 && i.wrap & 4 && (H[0] = t & 255, H[1] = t >>> 8 & 255, H[2] = t >>> 16 & 255, H[3] = t >>> 24 & 255, i.check = x(i.check, H, 4, 0)), t = 0, g = 0, i.mode = pa;
    case pa:
      for (; g < 16; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      i.head && (i.head.xflags = t & 255, i.head.os = t >> 8), i.flags & 512 && i.wrap & 4 && (H[0] = t & 255, H[1] = t >>> 8 & 255, i.check = x(i.check, H, 2, 0)), t = 0, g = 0, i.mode = Ta;
    case Ta:
      if (i.flags & 1024) {
        for (; g < 16; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        i.length = t, i.head && (i.head.extra_len = t), i.flags & 512 && i.wrap & 4 && (H[0] = t & 255, H[1] = t >>> 8 & 255, i.check = x(i.check, H, 2, 0)), t = 0, g = 0;
      } else i.head && (i.head.extra = null);
      i.mode = Ha;
    case Ha:
      if (i.flags & 1024 && (r = i.length, r > h && (r = h), r && (i.head && (C = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Uint8Array(i.head.extra_len)), i.head.extra.set(u.subarray(e, e + r), C)), i.flags & 512 && i.wrap & 4 && (i.check = x(i.check, u, r, e)), h -= r, e += r, i.length -= r), i.length)) break n;
      i.length = 0, i.mode = _a;
    case _a:
      if (i.flags & 2048) {
        if (h === 0) break n;
        r = 0;
        do
          C = u[e + r++], i.head && C && i.length < 65536 && (i.head.name += String.fromCharCode(C));
        while (C && r < h);
        if (i.flags & 512 && i.wrap & 4 && (i.check = x(i.check, u, r, e)), h -= r, e += r, C) break n;
      } else i.head && (i.head.name = null);
      i.length = 0, i.mode = ya;
    case ya:
      if (i.flags & 4096) {
        if (h === 0) break n;
        r = 0;
        do
          C = u[e + r++], i.head && C && i.length < 65536 && (i.head.comment += String.fromCharCode(C));
        while (C && r < h);
        if (i.flags & 512 && i.wrap & 4 && (i.check = x(i.check, u, r, e)), h -= r, e += r, C) break n;
      } else i.head && (i.head.comment = null);
      i.mode = ma;
    case ma:
      if (i.flags & 512) {
        for (; g < 16; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        if (i.wrap & 4 && t !== (i.check & 65535)) {
          n.msg = "header crc mismatch", i.mode = B;
          break;
        }
        t = 0, g = 0;
      }
      i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = true), n.adler = i.check = 0, i.mode = nn;
      break;
    case Qa:
      for (; g < 32; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      n.adler = i.check = Ka(t), t = 0, g = 0, i.mode = hi;
    case hi:
      if (i.havedict === 0) return n.next_out = l, n.avail_out = d, n.next_in = e, n.avail_in = h, i.hold = t, i.bits = g, xh;
      n.adler = i.check = 1, i.mode = nn;
    case nn:
      if (a === Bh || a === ii) break n;
    case Di:
      if (i.last) {
        t >>>= g & 7, g -= g & 7, i.mode = pi;
        break;
      }
      for (; g < 3; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      switch (i.last = t & 1, t >>>= 1, g -= 1, t & 3) {
        case 0:
          i.mode = wa;
          break;
        case 1:
          if (Kh(i), i.mode = ai, a === ii) {
            t >>>= 2, g -= 2;
            break n;
          }
          break;
        case 2:
          i.mode = Ba;
          break;
        case 3:
          n.msg = "invalid block type", i.mode = B;
      }
      t >>>= 2, g -= 2;
      break;
    case wa:
      for (t >>>= g & 7, g -= g & 7; g < 32; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if ((t & 65535) !== (t >>> 16 ^ 65535)) {
        n.msg = "invalid stored block lengths", i.mode = B;
        break;
      }
      if (i.length = t & 65535, t = 0, g = 0, i.mode = Xi, a === ii) break n;
    case Xi:
      i.mode = Ma;
    case Ma:
      if (r = i.length, r) {
        if (r > h && (r = h), r > d && (r = d), r === 0) break n;
        o.set(u.subarray(e, e + r), l), h -= r, e += r, d -= r, l += r, i.length -= r;
        break;
      }
      i.mode = nn;
      break;
    case Ba:
      for (; g < 14; ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if (i.nlen = (t & 31) + 257, t >>>= 5, g -= 5, i.ndist = (t & 31) + 1, t >>>= 5, g -= 5, i.ncode = (t & 15) + 4, t >>>= 4, g -= 4, i.nlen > 286 || i.ndist > 30) {
        n.msg = "too many length or distance symbols", i.mode = B;
        break;
      }
      i.have = 0, i.mode = ba;
    case ba:
      for (; i.have < i.ncode; ) {
        for (; g < 3; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        i.lens[q[i.have++]] = t & 7, t >>>= 3, g -= 3;
      }
      for (; i.have < 19; ) i.lens[q[i.have++]] = 0;
      if (i.lencode = i.lendyn, i.lenbits = 7, f = { bits: i.lenbits }, M = Nn(Mh, i.lens, 0, 19, i.lencode, 0, i.work, f), i.lenbits = f.bits, M) {
        n.msg = "invalid code lengths set", i.mode = B;
        break;
      }
      i.have = 0, i.mode = xa;
    case xa:
      for (; i.have < i.nlen + i.ndist; ) {
        for (; X = i.lencode[t & (1 << i.lenbits) - 1], S = X >>> 24, Q = X >>> 16 & 255, T = X & 65535, !(S <= g); ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        if (T < 16) t >>>= S, g -= S, i.lens[i.have++] = T;
        else {
          if (T === 16) {
            for (_ = S + 2; g < _; ) {
              if (h === 0) break n;
              h--, t += u[e++] << g, g += 8;
            }
            if (t >>>= S, g -= S, i.have === 0) {
              n.msg = "invalid bit length repeat", i.mode = B;
              break;
            }
            C = i.lens[i.have - 1], r = 3 + (t & 3), t >>>= 2, g -= 2;
          } else if (T === 17) {
            for (_ = S + 3; g < _; ) {
              if (h === 0) break n;
              h--, t += u[e++] << g, g += 8;
            }
            t >>>= S, g -= S, C = 0, r = 3 + (t & 7), t >>>= 3, g -= 3;
          } else {
            for (_ = S + 7; g < _; ) {
              if (h === 0) break n;
              h--, t += u[e++] << g, g += 8;
            }
            t >>>= S, g -= S, C = 0, r = 11 + (t & 127), t >>>= 7, g -= 7;
          }
          if (i.have + r > i.nlen + i.ndist) {
            n.msg = "invalid bit length repeat", i.mode = B;
            break;
          }
          for (; r--; ) i.lens[i.have++] = C;
        }
      }
      if (i.mode === B) break;
      if (i.lens[256] === 0) {
        n.msg = "invalid code -- missing end-of-block", i.mode = B;
        break;
      }
      if (i.lenbits = 9, f = { bits: i.lenbits }, M = Nn(pu, i.lens, 0, i.nlen, i.lencode, 0, i.work, f), i.lenbits = f.bits, M) {
        n.msg = "invalid literal/lengths set", i.mode = B;
        break;
      }
      if (i.distbits = 6, i.distcode = i.distdyn, f = { bits: i.distbits }, M = Nn(Tu, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, f), i.distbits = f.bits, M) {
        n.msg = "invalid distances set", i.mode = B;
        break;
      }
      if (i.mode = ai, a === ii) break n;
    case ai:
      i.mode = ui;
    case ui:
      if (h >= 6 && d >= 258) {
        n.next_out = l, n.avail_out = d, n.next_in = e, n.avail_in = h, i.hold = t, i.bits = g, Hh(n, c), l = n.next_out, o = n.output, d = n.avail_out, e = n.next_in, u = n.input, h = n.avail_in, t = i.hold, g = i.bits, i.mode === nn && (i.back = -1);
        break;
      }
      for (i.back = 0; X = i.lencode[t & (1 << i.lenbits) - 1], S = X >>> 24, Q = X >>> 16 & 255, T = X & 65535, !(S <= g); ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if (Q && (Q & 240) === 0) {
        for (Z = S, m = Q, b = T; X = i.lencode[b + ((t & (1 << Z + m) - 1) >> Z)], S = X >>> 24, Q = X >>> 16 & 255, T = X & 65535, !(Z + S <= g); ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        t >>>= Z, g -= Z, i.back += Z;
      }
      if (t >>>= S, g -= S, i.back += S, i.length = T, Q === 0) {
        i.mode = ka;
        break;
      }
      if (Q & 32) {
        i.back = -1, i.mode = nn;
        break;
      }
      if (Q & 64) {
        n.msg = "invalid literal/length code", i.mode = B;
        break;
      }
      i.extra = Q & 15, i.mode = Fa;
    case Fa:
      if (i.extra) {
        for (_ = i.extra; g < _; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        i.length += t & (1 << i.extra) - 1, t >>>= i.extra, g -= i.extra, i.back += i.extra;
      }
      i.was = i.length, i.mode = Ga;
    case Ga:
      for (; X = i.distcode[t & (1 << i.distbits) - 1], S = X >>> 24, Q = X >>> 16 & 255, T = X & 65535, !(S <= g); ) {
        if (h === 0) break n;
        h--, t += u[e++] << g, g += 8;
      }
      if ((Q & 240) === 0) {
        for (Z = S, m = Q, b = T; X = i.distcode[b + ((t & (1 << Z + m) - 1) >> Z)], S = X >>> 24, Q = X >>> 16 & 255, T = X & 65535, !(Z + S <= g); ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        t >>>= Z, g -= Z, i.back += Z;
      }
      if (t >>>= S, g -= S, i.back += S, Q & 64) {
        n.msg = "invalid distance code", i.mode = B;
        break;
      }
      i.offset = T, i.extra = Q & 15, i.mode = va;
    case va:
      if (i.extra) {
        for (_ = i.extra; g < _; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        i.offset += t & (1 << i.extra) - 1, t >>>= i.extra, g -= i.extra, i.back += i.extra;
      }
      if (i.offset > i.dmax) {
        n.msg = "invalid distance too far back", i.mode = B;
        break;
      }
      i.mode = Na;
    case Na:
      if (d === 0) break n;
      if (r = c - d, i.offset > r) {
        if (r = i.offset - r, r > i.whave && i.sane) {
          n.msg = "invalid distance too far back", i.mode = B;
          break;
        }
        r > i.wnext ? (r -= i.wnext, Y = i.wsize - r) : Y = i.wnext - r, r > i.length && (r = i.length), D = i.window;
      } else D = o, Y = l - i.offset, r = i.length;
      r > d && (r = d), d -= r, i.length -= r;
      do
        o[l++] = D[Y++];
      while (--r);
      i.length === 0 && (i.mode = ui);
      break;
    case ka:
      if (d === 0) break n;
      o[l++] = i.length, d--, i.mode = ui;
      break;
    case pi:
      if (i.wrap) {
        for (; g < 32; ) {
          if (h === 0) break n;
          h--, t |= u[e++] << g, g += 8;
        }
        if (c -= d, n.total_out += c, i.total += c, i.wrap & 4 && c && (n.adler = i.check = i.flags ? x(i.check, o, c, l - c) : Wn(i.check, o, c, l - c)), c = d, i.wrap & 4 && (i.flags ? t : Ka(t)) !== i.check) {
          n.msg = "incorrect data check", i.mode = B;
          break;
        }
        t = 0, g = 0;
      }
      i.mode = Pa;
    case Pa:
      if (i.wrap && i.flags) {
        for (; g < 32; ) {
          if (h === 0) break n;
          h--, t += u[e++] << g, g += 8;
        }
        if (i.wrap & 4 && t !== (i.total & 4294967295)) {
          n.msg = "incorrect length check", i.mode = B;
          break;
        }
        t = 0, g = 0;
      }
      i.mode = Ea;
    case Ea:
      M = bh;
      break n;
    case B:
      M = Hu;
      break n;
    case yu:
      return _u;
    case mu:
    default:
      return A;
  }
  return n.next_out = l, n.avail_out = d, n.next_in = e, n.avail_in = h, i.hold = t, i.bits = g, (i.wsize || c !== n.avail_out && i.mode < B && (i.mode < pi || a !== fa)) && bu(n, n.output, n.next_out, c - n.avail_out), L -= n.avail_in, c -= n.avail_out, n.total_in += L, n.total_out += c, i.total += c, i.wrap & 4 && c && (n.adler = i.check = i.flags ? x(i.check, o, c, n.next_out - c) : Wn(i.check, o, c, n.next_out - c)), n.data_type = i.bits + (i.last ? 64 : 0) + (i.mode === nn ? 128 : 0) + (i.mode === ai || i.mode === Xi ? 256 : 0), (L === 0 && c === 0 || a === fa) && M === Cn && (M = Fh), M;
}, Rh = (n) => {
  if (Sn(n)) return A;
  let a = n.state;
  return a.window && (a.window = null), n.state = null, Cn;
}, Ah = (n, a) => {
  if (Sn(n)) return A;
  const i = n.state;
  return (i.wrap & 2) === 0 ? A : (i.head = a, a.done = false, Cn);
}, zh = (n, a) => {
  const i = a.length;
  let u, o, e;
  return Sn(n) || (u = n.state, u.wrap !== 0 && u.mode !== hi) ? A : u.mode === hi && (o = 1, o = Wn(o, a, i, 0), o !== u.check) ? Hu : (e = bu(n, a, i, i), e ? (u.mode = yu, _u) : (u.havedict = 1, Cn));
};
var Oh = wu, jh = Mu, Ih = Qu, Uh = Eh, $h = Bu, qh = Wh, Vh = Rh, ng = Ah, ig = zh, ag = "pako inflate (from Nodeca project)", un = { inflateReset: Oh, inflateReset2: jh, inflateResetKeep: Ih, inflateInit: Uh, inflateInit2: $h, inflate: qh, inflateEnd: Vh, inflateGetHeader: ng, inflateSetDictionary: ig, inflateInfo: ag };
function ug() {
  this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
}
var eg = ug;
const xu = Object.prototype.toString, { Z_NO_FLUSH: og, Z_FINISH: lg, Z_OK: zn, Z_STREAM_END: _i, Z_NEED_DICT: yi, Z_STREAM_ERROR: tg, Z_DATA_ERROR: Ra, Z_MEM_ERROR: hg } = jn;
function $n(n) {
  this.options = ri.assign({ chunkSize: 1024 * 64, windowBits: 15, to: "" }, n || {});
  const a = this.options;
  a.raw && a.windowBits >= 0 && a.windowBits < 16 && (a.windowBits = -a.windowBits, a.windowBits === 0 && (a.windowBits = -15)), a.windowBits >= 0 && a.windowBits < 16 && !(n && n.windowBits) && (a.windowBits += 32), a.windowBits > 15 && a.windowBits < 48 && (a.windowBits & 15) === 0 && (a.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new Du(), this.strm.avail_out = 0;
  let i = un.inflateInit2(this.strm, a.windowBits);
  if (i !== zn) throw new Error(Ln[i]);
  if (this.header = new eg(), un.inflateGetHeader(this.strm, this.header), a.dictionary && (typeof a.dictionary == "string" ? a.dictionary = An.string2buf(a.dictionary) : xu.call(a.dictionary) === "[object ArrayBuffer]" && (a.dictionary = new Uint8Array(a.dictionary)), a.raw && (i = un.inflateSetDictionary(this.strm, a.dictionary), i !== zn))) throw new Error(Ln[i]);
}
$n.prototype.push = function(n, a) {
  const i = this.strm, u = this.options.chunkSize, o = this.options.dictionary;
  let e, l, h;
  if (this.ended) return false;
  for (a === ~~a ? l = a : l = a === true ? lg : og, xu.call(n) === "[object ArrayBuffer]" ? i.input = new Uint8Array(n) : i.input = n, i.next_in = 0, i.avail_in = i.input.length; ; ) {
    for (i.avail_out === 0 && (i.output = new Uint8Array(u), i.next_out = 0, i.avail_out = u), e = un.inflate(i, l), e === yi && o && (e = un.inflateSetDictionary(i, o), e === zn ? e = un.inflate(i, l) : e === Ra && (e = yi)); i.avail_in > 0 && e === _i && i.state.wrap > 0 && n[i.next_in] !== 0; ) un.inflateReset(i), e = un.inflate(i, l);
    switch (e) {
      case tg:
      case Ra:
      case yi:
      case hg:
        return this.onEnd(e), this.ended = true, false;
    }
    if (h = i.avail_out, i.next_out && (i.avail_out === 0 || e === _i)) if (this.options.to === "string") {
      let d = An.utf8border(i.output, i.next_out), t = i.next_out - d, g = An.buf2string(i.output, d);
      i.next_out = t, i.avail_out = u - t, t && i.output.set(i.output.subarray(d, d + t), 0), this.onData(g);
    } else this.onData(i.output.length === i.next_out ? i.output : i.output.subarray(0, i.next_out));
    if (!(e === zn && h === 0)) {
      if (e === _i) return e = un.inflateEnd(this.strm), this.onEnd(e), this.ended = true, true;
      if (i.avail_in === 0) break;
    }
  }
  return true;
};
$n.prototype.onData = function(n) {
  this.chunks.push(n);
};
$n.prototype.onEnd = function(n) {
  n === zn && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = ri.flattenChunks(this.chunks)), this.chunks = [], this.err = n, this.msg = this.strm.msg;
};
function Ii(n, a) {
  const i = new $n(a);
  if (i.push(n), i.err) throw i.msg || Ln[i.err];
  return i.result;
}
function gg(n, a) {
  return a = a || {}, a.raw = true, Ii(n, a);
}
var rg = $n, sg = Ii, dg = gg, cg = Ii, Yg = { Inflate: rg, inflate: sg, inflateRaw: dg, ungzip: cg };
const { Deflate: Lg, deflate: Zg, deflateRaw: Cg, gzip: Sg } = ph, { Inflate: fg, inflate: Jg, inflateRaw: Dg, ungzip: Xg } = Yg;
var pg = Lg, Tg = Zg, Hg = Cg, _g = Sg, yg = fg, mg = Jg, Qg = Dg, wg = Xg, Mg = jn, Fu = { Deflate: pg, deflate: Tg, deflateRaw: Hg, gzip: _g, Inflate: yg, inflate: mg, inflateRaw: Qg, ungzip: wg, constants: Mg };
const oi = "lost_in_translation_cache";
function Bg(n) {
  try {
    return JSON.parse(localStorage.getItem(oi) || "{}")[n.toLowerCase().trim()] || null;
  } catch {
    return null;
  }
}
const Aa = 50, za = 4e6;
function bg(n) {
  try {
    const a = JSON.parse(localStorage.getItem(oi) || "{}"), i = n.original.toLowerCase().trim();
    a[i] = n;
    const u = Object.entries(a);
    u.length > Aa && u.sort((e, l) => (e[1].timestamp ?? 0) - (l[1].timestamp ?? 0)).slice(0, u.length - Aa).forEach(([e]) => delete a[e]);
    const o = JSON.stringify(a);
    if (o.length > za) {
      const e = Object.entries(a).sort((l, h) => (l[1].timestamp ?? 0) - (h[1].timestamp ?? 0));
      for (; e.length > 1 && JSON.stringify(Object.fromEntries(e)).length > za; ) e.shift();
      localStorage.setItem(oi, JSON.stringify(Object.fromEntries(e)));
    } else localStorage.setItem(oi, o);
  } catch {
  }
}
function xg(n) {
  const a = JSON.stringify(n), i = Fu.deflate(new TextEncoder().encode(a));
  return btoa(String.fromCharCode(...i)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function Fg(n) {
  try {
    const a = n.replace(/-/g, "+").replace(/_/g, "/"), i = a + "=".repeat((4 - a.length % 4) % 4), u = atob(i), o = new Uint8Array([...u].map((h) => h.charCodeAt(0))), e = Fu.inflate(o), l = new TextDecoder().decode(e);
    return JSON.parse(l);
  } catch {
    return null;
  }
}
function Gg(n) {
  const a = xg(n);
  window.history.replaceState(null, "", `#${a}`);
}
function vg() {
  const n = window.location.hash.slice(1);
  return n ? Fg(n) : null;
}
function en(n) {
  const a = document.createElement("div");
  return a.textContent = n, a.innerHTML;
}
function Ng(n) {
  return n === 0 ? { label: "Perfect preservation", className: "verdict-perfect" } : n <= 15 ? { label: "Remarkably faithful", className: "verdict-low" } : n <= 40 ? { label: "Noticeably altered", className: "verdict-mid" } : n <= 70 ? { label: "Heavily distorted", className: "verdict-high" } : { label: "Completely transformed", className: "verdict-extreme" };
}
function kg(n, a, i) {
  bg(a), Gg(a);
  const u = Math.round(a.totalDrift * 100), o = ju(a.original, a.finalText), e = a.original.trim().split(/\s+/).length === 1, l = a.original.toLowerCase().trim() === a.finalText.toLowerCase().trim(), h = Ng(u), d = o.map(({ word: r, preserved: Y }) => `<span class="${Y ? "word-preserved" : "word-changed"}">${en(r)}</span>`).join(" ");
  let t = "";
  if (e && a.steps.length > 0) {
    const r = a.steps.find((Y) => Y.backTranslation && Y.backTranslation.toLowerCase() !== a.original.toLowerCase());
    (r == null ? void 0 : r.backTranslation) && (t = `&ldquo;${en(a.original)}&rdquo; in ${r.language.name} translates to &ldquo;${en(r.text)}&rdquo; which means &ldquo;${en(r.backTranslation)}&rdquo; in English.`);
  }
  n.innerHTML = `
    <div class="reveal" role="region" aria-label="Translation results">
      <div class="reveal-header">
        ${l ? `<div class="perfect-badge fade-in-up">Perfect translation</div>
               <p class="perfect-msg fade-in-up">This sentence survived ${a.chain.length - 1} languages unscathed. That is extremely rare.</p>` : ""}

        <div class="comparison-card fade-in-up">
          <div class="comp-label">Original</div>
          <div class="comp-original">&ldquo;${en(a.original)}&rdquo;</div>

          <div class="flag-trail-mini" aria-label="${a.chain.length} languages traversed">
            ${a.chain.map((r) => `<span title="${r.name}">${O(r.countryCode)}</span>`).join(" ")}
          </div>

          <div class="comp-label gold">After ${a.chain.length - 1} translations</div>
          <div class="comp-final">&ldquo;${en(a.finalText)}&rdquo;</div>

          <div class="word-highlight">${d}</div>

          <div class="drift-score-card">
            <div class="drift-number" id="drift-counter" aria-label="${u} percent drift">0%</div>
            <div class="drift-caption">lost in translation</div>
            <div class="drift-verdict ${h.className}">${h.label}</div>
          </div>
        </div>

        ${e && t ? `<div class="fun-fact fade-in-up">${t}</div>` : ""}
      </div>

      <div class="journey-timeline fade-in-up">
        <h3>The Journey</h3>
        <div class="timeline" id="timeline"></div>
      </div>

      <div class="share-section fade-in-up">
        <button class="btn-primary" id="share-btn">Share result</button>
        <button class="btn-secondary" id="copy-btn">Copy to clipboard</button>
        <button class="btn-secondary" id="dl-btn">Download as image</button>
        <button class="btn-ghost" id="restart-btn">&larr; Try another sentence</button>
      </div>
    </div>
  `, Pg(n.querySelector("#drift-counter"), u);
  const g = n.querySelector("#timeline"), L = Oa(O(a.chain[0].countryCode), a.chain[0].name, a.original, void 0, 0, true);
  g.appendChild(L), a.steps.forEach((r) => {
    const Y = r.language.code === "en";
    g.appendChild(Oa(O(r.language.countryCode), r.language.name, r.text, r.transliteration, r.driftScore, false, r.language.rtl, Y ? void 0 : r.backTranslation));
  }), g.querySelectorAll(".tl-entry").forEach((r, Y) => {
    r.style.animationDelay = `${Y * 80}ms`;
  }), n.querySelector("#share-btn").addEventListener("click", () => Fl(a)), n.querySelector("#copy-btn").addEventListener("click", async () => {
    const r = `"${a.original}" \u2192 "${a.finalText}" (${u}% lost in translation)

Try it: ${window.location.href}`;
    await Va(r);
    const Y = n.querySelector("#copy-btn"), D = Y.textContent;
    Y.textContent = "Copied!", setTimeout(() => Y.textContent = D, 2e3);
  }), n.querySelector("#dl-btn").addEventListener("click", () => Gl(a)), n.querySelector("#restart-btn").addEventListener("click", () => {
    window.history.replaceState(null, "", window.location.pathname), i();
  });
}
function Pg(n, a) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    n.textContent = `${a}%`;
    return;
  }
  const i = 1200, u = performance.now();
  function o(e) {
    const l = e - u, h = Math.min(l / i, 1), d = 1 - Math.pow(1 - h, 3), t = Math.round(d * a);
    n.textContent = `${t}%`, h < 1 && requestAnimationFrame(o);
  }
  requestAnimationFrame(o);
}
function Oa(n, a, i, u, o, e, l, h) {
  const d = document.createElement("div");
  d.className = `tl-entry${e ? " tl-original" : ""} fade-in-up`;
  const t = !e && h, g = o > 0.66 ? "#ff6b6b" : o > 0.33 ? "#f7dc6f" : "#4ecdc4";
  return d.innerHTML = `
    <div class="tl-marker">
      <span class="tl-flag">${n}</span>
      <div class="tl-line"></div>
    </div>
    <div class="tl-content">
      <div class="tl-lang">${a}${e ? " (Original)" : ""}</div>
      <div class="tl-text" ${l ? 'dir="rtl"' : ""}>${en(i)}</div>
      ${u ? `<div class="tl-translit">${en(u)}</div>` : ""}
      ${t ? `<div class="tl-back-translation">\u2192 English: &ldquo;${en(h)}&rdquo;</div>` : ""}
      ${e ? "" : `<div class="tl-drift" style="color:${g}">${Math.round(o * 100)}% drift</div>`}
    </div>
  `, d;
}
const mn = document.getElementById("app"), ja = vg();
ja ? $i(ja) : Ui();
function Ui() {
  mn.innerHTML = "", Au(mn, (n, a) => {
    const i = Bg(n);
    i && i.chain.length === a.length && i.chain.every((u, o) => u.code === a[o].code) ? $i(i) : Eg(n, a);
  });
}
function Eg(n, a) {
  mn.innerHTML = "", Bl(mn, n, a, (i) => {
    $i(i);
  }, () => {
    Ui();
  });
}
function $i(n) {
  mn.innerHTML = "", kg(mn, n, () => {
    window.history.replaceState(null, "", window.location.pathname), Ui();
  });
}
