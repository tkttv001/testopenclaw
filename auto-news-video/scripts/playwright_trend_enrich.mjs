import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'outputs');
const OUT_FILE = path.join(OUT, `playwright_trends_${new Date().toISOString().slice(0,10)}.json`);

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    // Graceful: if playwright missing, emit empty file and exit 0
    fs.writeFileSync(OUT_FILE, JSON.stringify({ source: 'playwright', trends: [], note: 'playwright package missing' }, null, 2));
    console.log(OUT_FILE);
    return;
  }

  const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium-browser' });
  const page = await browser.newPage();
  await page.goto('https://trends.google.com/trending?geo=VN', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);

  const trends = await page.evaluate(() => {
    const cands = Array.from(document.querySelectorAll('a, div, span'))
      .map((e) => (e.textContent || '').trim())
      .filter((t) => t.length >= 4 && t.length <= 80);
    const out = [];
    const seen = new Set();
    for (const t of cands) {
      const key = t.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
      if (out.length >= 30) break;
    }
    return out;
  });

  await browser.close();

  fs.writeFileSync(OUT_FILE, JSON.stringify({ source: 'playwright', trends }, null, 2));
  console.log(OUT_FILE);
}

main().catch((e) => {
  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify({ source: 'playwright', trends: [], error: String(e) }, null, 2));
  console.log(OUT_FILE);
  process.exit(0);
});
