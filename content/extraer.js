/**
 * Extrae todos los textos bilingües de index.html a content/textos.json
 * y marca cada uno con data-t="clave" para poder devolverlos con aplicar.js
 *
 *   node content/extraer.js
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index.html");
const JSON_OUT = path.join(__dirname, "textos.json");

let h = fs.readFileSync(HTML, "utf8");

// Encuentra el cierre del tag que empieza en `open` (índice del "<"), contando anidamiento.
function closeOf(src, open, tag) {
  const openRe = new RegExp(`<${tag}\\b`, "g");
  const closeRe = new RegExp(`</${tag}>`, "g");
  let i = src.indexOf(">", open) + 1, depth = 1;
  while (depth > 0 && i < src.length) {
    openRe.lastIndex = i; closeRe.lastIndex = i;
    const o = openRe.exec(src), c = closeRe.exec(src);
    if (!c) return -1;
    if (o && o.index < c.index) { depth++; i = o.index + 1; }
    else { depth--; i = c.index + (depth === 0 ? 0 : 1); if (depth === 0) return c.index; }
  }
  return -1;
}

const entries = {};
const counters = {};
let out = "", cursor = 0, section = "general";
const tagRe = /<(span|div|p|ul|li|b|em|h2|h3)\s+lang="(es|en)"\s*>/g;
const secRe = /<section id="([^"]+)"/g;

// mapa posición -> sección
const secs = [];
let sm; while ((sm = secRe.exec(h))) secs.push({ at: sm.index, id: sm[1] });
const sectionAt = pos => { let s = "general"; for (const x of secs) { if (x.at <= pos) s = x.id; else break; } return s; };

let m;
while ((m = tagRe.exec(h))) {
  const [full, tag, lang] = m;
  const start = m.index;
  if (h.slice(start, start + full.length + 40).includes("data-t=")) continue;
  const end = closeOf(h, start, tag);
  if (end < 0) continue;
  const innerStart = start + full.length;
  const inner = h.slice(innerStart, end);
  if (!inner.trim()) continue;

  section = sectionAt(start);
  let key;
  if (lang === "es") {
    counters[section] = (counters[section] || 0) + 1;
    key = `${section}.${String(counters[section]).padStart(2, "0")}`;
    entries[key] = { es: inner, en: "" };
    lastKeyBySection = key;
  } else {
    // el "en" corresponde al último "es" emitido
    const keys = Object.keys(entries);
    key = keys[keys.length - 1];
    if (key && entries[key].en === "") entries[key].en = inner;
    else {
      counters[section] = (counters[section] || 0) + 1;
      key = `${section}.${String(counters[section]).padStart(2, "0")}`;
      entries[key] = { es: "", en: inner };
    }
  }

  const marked = full.replace(/>$/, ` data-t="${key}">`);
  out += h.slice(cursor, start) + marked;
  cursor = innerStart;
  tagRe.lastIndex = innerStart; // seguir buscando dentro por si hay anidados
}
out += h.slice(cursor);

fs.writeFileSync(HTML, out);
fs.writeFileSync(JSON_OUT, JSON.stringify(entries, null, 2) + "\n");
console.log(`marcados ${Object.keys(entries).length} textos -> content/textos.json`);
