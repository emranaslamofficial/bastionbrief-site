#!/usr/bin/env node
'use strict';
/**
 * Renders raster brand assets with a locally installed Chromium browser
 * (Chrome, Edge or Chromium) in headless mode. Output goes to src/static/,
 * so it is committed with the source and deployment never needs a browser.
 *
 *   npm run images        (then rebuilds the site)
 *
 * Generates: favicon-32.png, apple-touch-icon.png, icon-192.png, logo-512.png,
 *            og/default.png and og/<slug>.png for every article (1200×630).
 * Override the browser path with CHROME_PATH=/path/to/chrome.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { parseFrontMatter } = require('../lib/markdown');
const { articleArt, fortPoints } = require('../lib/art');
const categories = require('../content/categories');
const site = require('../content/site');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'src', 'static');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'bb-img-'));

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const BROWSER = CANDIDATES.find((p) => fs.existsSync(p));
if (!BROWSER) {
  console.error('No Chrome/Edge/Chromium found. Set CHROME_PATH and try again.');
  process.exit(1);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function shot(html, out, w, h) {
  const file = path.join(TMP, path.basename(out) + '.html');
  fs.writeFileSync(file, html);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(
    BROWSER,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--default-background-color=00000000',
      '--virtual-time-budget=4000',
      `--user-data-dir=${path.join(TMP, 'profile')}`,
      `--window-size=${w},${h}`,
      `--screenshot=${out}`,
      'file:///' + file.replace(/\\/g, '/'),
    ],
    { stdio: 'ignore', timeout: 60000 }
  );
  if (!fs.existsSync(out)) throw new Error('Screenshot failed for ' + out);
}

const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Inter+Tight:wght@600;700&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&display=block">';
const fortSvg = (size, rounded, bg = true) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#62e6c4"/><stop offset="1" stop-color="#8b93ff"/></linearGradient></defs>${bg ? `<rect width="32" height="32" rx="${rounded}" fill="#0a0d14"/>` : ''}<polygon points="${fortPoints(16, 16.8, 0.92)}" fill="none" stroke="url(#g)" stroke-width="1.9" stroke-linejoin="round"/><polygon points="${fortPoints(16, 16.8, 0.42)}" fill="url(#g)"/></svg>`;

function iconPage(size, rounded) {
  return `<!doctype html><html><body style="margin:0;background:transparent">${fortSvg(size, rounded)}</body></html>`;
}

function ogPage({ title, label, art }) {
  return `<!doctype html><html><head>${FONTS}<style>
  *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;background:#05070b;color:#eef1f6;font-family:Inter,'Segoe UI',sans-serif;position:relative}
  .art{position:absolute;right:-160px;top:-22px;width:1120px;height:630px;opacity:.95}
  .art svg{width:100%;height:100%}.art svg text,.art svg rect[height="3"]{display:none}
  .shade{position:absolute;inset:0;background:linear-gradient(90deg,#05070b 0%,#05070b 42%,rgba(5,7,11,.75) 62%,rgba(5,7,11,0) 85%)}
  .wrap{position:absolute;left:72px;top:64px;bottom:64px;width:690px;display:flex;flex-direction:column}
  .brand{display:flex;align-items:center;gap:14px;font-family:'Inter Tight';font-weight:700;font-size:30px;letter-spacing:-.03em}
  .brand i{font-family:'Instrument Serif';font-weight:400;color:#62e6c4;font-size:32px;letter-spacing:0}
  .label{margin-top:auto;font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:#62e6c4}
  h1{margin:18px 0 0;font-family:'Inter Tight';font-weight:600;font-size:${title.length > 70 ? 50 : title.length > 48 ? 56 : 66}px;line-height:1.06;letter-spacing:-.035em}
  .bar{margin-top:30px;width:90px;height:5px;border-radius:5px;background:linear-gradient(90deg,#62e6c4,#8b93ff)}
  </style></head><body><div class="art">${art}</div><div class="shade"></div>
  <div class="wrap"><div class="brand">${fortSvg(44, 10, false)}<span>Bastion <i>Brief</i></span></div><div class="label">${esc(label)}</div><h1>${esc(title)}</h1><div class="bar"></div></div></body></html>`;
}

console.log(`Using ${BROWSER}`);
shot(iconPage(32, 7), path.join(OUT, 'favicon-32.png'), 32, 32);
shot(iconPage(180, 0), path.join(OUT, 'apple-touch-icon.png'), 180, 180);
shot(iconPage(192, 7), path.join(OUT, 'icon-192.png'), 192, 192);
shot(iconPage(512, 7), path.join(OUT, 'logo-512.png'), 512, 512);
console.log('  ✔ icons');

const defaultArt = articleArt({ slug: 'bastion-brief-default', title: site.name }, { ...categories[0], name: 'Cybersecurity education' });
shot(ogPage({ title: 'Understand the threats. Protect what matters.', label: 'Cybersecurity education', art: defaultArt }), path.join(OUT, 'og', 'default.png'), 1200, 630);

const dir = path.join(ROOT, 'content', 'articles');
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const { data } = parseFrontMatter(fs.readFileSync(path.join(dir, f), 'utf8'));
  const cat = categories.find((c) => c.slug === data.category);
  shot(ogPage({ title: data.title, label: cat.name, art: articleArt(data, cat) }), path.join(OUT, 'og', `${data.slug}.png`), 1200, 630);
  console.log(`  ✔ og/${data.slug}.png`);
}
fs.rmSync(TMP, { recursive: true, force: true });
