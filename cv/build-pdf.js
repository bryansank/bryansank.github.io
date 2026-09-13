const path = require("path");
const fs = require("fs");

const PW = process.env.PLAYWRIGHT_PATH || "playwright";
const CHROME = process.env.CHROME_PATH;
const playwright = require(PW);

const root = path.resolve(__dirname, "..");
const out = path.join(root, "assets", "files");
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await playwright.chromium.launch({ headless: true, executablePath: CHROME });
  const page = await browser.newPage();
  for (const [lang, name] of [["es", "CV-Bryan-Key-2026-ES.pdf"], ["en", "CV-Bryan-Key-2026-EN.pdf"]]) {
    await page.goto("file://" + path.join(__dirname, lang + ".html"), { waitUntil: "networkidle" });
    await page.pdf({ path: path.join(out, name), format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log("ok", name);
  }
  await browser.close();
})();
