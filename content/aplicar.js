/**
 * Vuelca content/textos.json dentro de index.html.
 * Edita el JSON y ejecuta:
 *
 *   node content/aplicar.js
 *
 * El texto queda escrito en el HTML, así que el sitio sigue funcionando
 * sin JavaScript y Google lo indexa igual.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index.html");

const textos = JSON.parse(fs.readFileSync(path.join(__dirname, "textos.json"), "utf8"));
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

const re = /<(span|div|p|ul|li|b|em|h2|h3)\s+lang="(es|en)"\s+data-t="([^"]+)"\s*>/g;
let out = "", cursor = 0, changed = 0, missing = new Set(), m;
while ((m = re.exec(h))) {
  const [full, tag, lang, key] = m;
  const end = closeOf(h, m.index, tag);
  if (end < 0) continue;
  const innerStart = m.index + full.length;
  const entry = textos[key];
  if (!entry || typeof entry[lang] !== "string") { missing.add(key); continue; }
  const current = h.slice(innerStart, end);
  if (current !== entry[lang]) changed++;
  out += h.slice(cursor, innerStart) + entry[lang];
  cursor = end;
  re.lastIndex = end;
}
out += h.slice(cursor);

fs.writeFileSync(HTML, out);
console.log(`textos aplicados. cambiados: ${changed}`);
if (missing.size) console.log("sin entrada en el JSON:", [...missing].join(", "));
