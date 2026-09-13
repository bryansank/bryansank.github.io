/**
 * Recorre index.html, asigna data-t="clave" a los textos bilingües que aún no
 * la tengan, y regenera content/textos.json con TODOS los textos (los ya
 * marcados conservan su clave).
 *
 *   node content/extraer.js
 *
 * El HTML es la fuente de verdad para este script. Para el camino contrario
 * (JSON -> HTML), usa aplicar.js.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index.html");
const JSON_OUT = path.join(__dirname, "textos.json");

let h = fs.readFileSync(HTML, "utf8");

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

const secs = [];
{ const secRe = /<section id="([^"]+)"/g; let sm; while ((sm = secRe.exec(h))) secs.push({ at: sm.index, id: sm[1] }); }
const sectionAt = pos => { let s = "general"; for (const x of secs) { if (x.at <= pos) s = x.id; else break; } return s; };

const entries = {};
const counters = {};
const used = new Set();
// primera pasada: reservar las claves ya presentes
{ const k = /data-t="([^"]+)"/g; let m; while ((m = k.exec(h))) used.add(m[1]); }
const nextKey = section => {
  do { counters[section] = (counters[section] || 0) + 1; }
  while (used.has(`${section}.${String(counters[section]).padStart(2, "0")}`));
  const key = `${section}.${String(counters[section]).padStart(2, "0")}`;
  used.add(key); return key;
};

let out = "", cursor = 0, lastKey = null, added = 0;
const tagRe = /<(span|div|p|ul|li|b|em|h2|h3)\s+lang="(es|en)"(\s+data-t="([^"]+)")?\s*>/g;
let m;
while ((m = tagRe.exec(h))) {
  const [full, tag, lang, , existing] = m;
  const start = m.index;
  const end = closeOf(h, start, tag);
  if (end < 0) continue;
  const innerStart = start + full.length;
  const inner = h.slice(innerStart, end);
  if (!inner.trim()) { tagRe.lastIndex = innerStart; continue; }

  let key = existing;
  if (!key) {
    if (lang === "en" && lastKey && entries[lastKey] && !entries[lastKey].en) key = lastKey;
    else key = nextKey(sectionAt(start));
    added++;
    out += h.slice(cursor, start) + full.replace(/>$/, ` data-t="${key}">`);
    cursor = innerStart;
  }
  entries[key] = entries[key] || { es: "", en: "" };
  entries[key][lang] = inner;
  if (lang === "es") lastKey = key;
  tagRe.lastIndex = innerStart;
}
out += h.slice(cursor);

fs.writeFileSync(HTML, out);
fs.writeFileSync(JSON_OUT, JSON.stringify(entries, null, 2) + "\n");
const total = Object.keys(entries).length;
const incompletos = Object.keys(entries).filter(k => !entries[k].es || !entries[k].en);
console.log(`${total} textos en el JSON (${added} marcados por primera vez)`);
if (incompletos.length) console.log("faltan traducciones en:", incompletos.join(", "));

// Guarda: una clave debe usarse exactamente 2 veces (una por idioma).
// Si se repite más, dos textos distintos comparten clave y aplicar.js
// sobrescribiría uno con el otro.
const uso = {};
(out.match(/data-t="[^"]*"/g) || []).forEach(k => uso[k] = (uso[k] || 0) + 1);
const duplicadas = Object.entries(uso).filter(([, n]) => n !== 2);
if (duplicadas.length) {
  console.error("\n⚠  CLAVES MAL USADAS (deberían aparecer 2 veces, una por idioma):");
  duplicadas.forEach(([k, n]) => console.error(`   ${k} aparece ${n} vez/veces`));
  console.error("   Corrige el HTML antes de ejecutar aplicar.js o perderás texto.\n");
  process.exitCode = 1;
}
