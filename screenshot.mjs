import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:\\Users\\milin\\AppData\\Local\\Temp\\puppeteer-test\\node_modules\\puppeteer');
import { readdir, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const dir   = join(__dirname, 'temporary screenshots');

async function nextN() {
  try {
    const files = await readdir(dir);
    const nums = files.map(f => f.match(/^screenshot-(\d+)/)).filter(Boolean).map(m => +m[1]);
    return nums.length ? Math.max(...nums) + 1 : 1;
  } catch { return 1; }
}

(async () => {
  await mkdir(dir, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));
  const n = await nextN();
  const name = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
  const out  = join(dir, name);
  await page.screenshot({ path: out, fullPage: false });
  await browser.close();
  console.log('Saved:', out);
})();
