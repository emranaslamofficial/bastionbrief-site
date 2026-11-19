'use strict';
/**
 * Generated brand artwork: logo mark, favicon and per-article cover art.
 * Everything is deterministic SVG (seeded by slug) so covers stay visually
 * consistent, weigh a few KB, and never rely on random stock photography.
 */

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}
const r1 = (n) => Math.round(n * 10) / 10;

/* ---------- Logo: a five-bastion star fort, the shape of layered defence ---------- */
function fortPoints(cx, cy, scale) {
  const pts = [];
  const P = (deg, r) => {
    const a = (deg * Math.PI) / 180;
    pts.push(`${r1(cx + Math.cos(a) * r * scale)},${r1(cy + Math.sin(a) * r * scale)}`);
  };
  for (let k = 0; k < 5; k++) {
    const t = -90 + 72 * k;
    P(t - 24, 8.2);
    P(t - 15, 10.6);
    P(t, 15);
    P(t + 15, 10.6);
    P(t + 24, 8.2);
  }
  return pts.join(' ');
}

/* ---------- Logo: split two-tone shield with a keyhole ----------
   Iris left half, mint right half, keyhole cut through the middle.
   Drawn in a 32×32 box; `hole` is the keyhole colour (matches the background). */
const SHIELD = 'M16 3.5 L26.5 7.3 V15 C26.5 21.3 22.1 26.1 16 28.5 C9.9 26.1 5.5 21.3 5.5 15 V7.3 Z';
const SHIELD_RIGHT = 'M16 3.5 L26.5 7.3 V15 C26.5 21.3 22.1 26.1 16 28.5 Z';
function markShapes(hole = '#05070b') {
  return `<path d="${SHIELD}" fill="#8b93ff"/><path d="${SHIELD_RIGHT}" fill="#62e6c4"/><circle cx="16" cy="13.3" r="2.9" fill="${hole}"/><path d="M14.45 15.2 h3.1 l0.85 5.9 h-4.8 Z" fill="${hole}"/>`;
}

function logoMark(size = 32) {
  return `<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">${markShapes()}</svg>`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#0a0d14"/><g transform="translate(16 16) scale(1.08) translate(-16 -16)">${markShapes('#0a0d14')}</g></svg>`;
}

/* ---------- Motifs (drawn around 0,0 within roughly ±150) ---------- */
function gearPath(teeth, rOuter, rInner) {
  const pts = [];
  const step = (Math.PI * 2) / (teeth * 4);
  for (let i = 0; i < teeth * 4; i++) {
    const r = i % 4 < 2 ? rOuter : rInner;
    pts.push(`${r1(Math.cos(i * step) * r)},${r1(Math.sin(i * step) * r)}`);
  }
  return `M${pts.join(' L')}Z`;
}

const MOTIFS = {
  shield: `<path class="m-fill" d="M0 -135 L110 -92 V-5 C110 70 62 118 0 142 C-62 118 -110 70 -110 -5 V-92 Z"/><path class="m-line" d="M0 -135 L110 -92 V-5 C110 70 62 118 0 142 C-62 118 -110 70 -110 -5 V-92 Z"/><path class="m-line m-thin" d="M0 -100 L78 -70 V-5 C78 48 44 84 0 104 C-44 84 -78 48 -78 -5 V-70 Z"/><path class="m-line m-bold" d="M-42 2 L-10 34 L48 -28"/>`,
  lock: `<rect class="m-fill" x="-105" y="-20" width="210" height="160" rx="26"/><rect class="m-line" x="-105" y="-20" width="210" height="160" rx="26"/><path class="m-line" d="M-62 -20 V-62 a62 62 0 0 1 124 0 V-20"/><circle class="m-dot" cx="0" cy="48" r="16"/><path class="m-line" d="M0 60 V96"/>`,
  terminal: `<rect class="m-fill" x="-150" y="-105" width="300" height="210" rx="22"/><rect class="m-line" x="-150" y="-105" width="300" height="210" rx="22"/><path class="m-line m-thin" d="M-150 -62 H150"/><circle class="m-dot" cx="-122" cy="-84" r="6"/><circle class="m-dot" cx="-100" cy="-84" r="6"/><circle class="m-dot" cx="-78" cy="-84" r="6"/><path class="m-line m-bold" d="M-112 -20 L-78 8 L-112 36"/><path class="m-line m-bold" d="M-56 40 H20"/><path class="m-line m-thin" d="M-112 72 H110"/>`,
  chat: `<path class="m-fill" d="M-150 -110 h200 a28 28 0 0 1 28 28 v92 a28 28 0 0 1 -28 28 h-120 l-46 38 v-38 h-34 a28 28 0 0 1 -28 -28 v-92 a28 28 0 0 1 28 -28z"/><path class="m-line" d="M-150 -110 h200 a28 28 0 0 1 28 28 v92 a28 28 0 0 1 -28 28 h-120 l-46 38 v-38 h-34 a28 28 0 0 1 -28 -28 v-92 a28 28 0 0 1 28 -28z"/><path class="m-line m-thin" d="M0 52 h0 M40 60 h92 a26 26 0 0 1 26 26 v56 a26 26 0 0 1 -26 26 h-14 v32 l-40 -32 h-38 a26 26 0 0 1 -26 -26"/><circle class="m-dot" cx="-92" cy="-36" r="9"/><circle class="m-dot" cx="-50" cy="-36" r="9"/><circle class="m-dot" cx="-8" cy="-36" r="9"/>`,
  eye: `<path class="m-fill" d="M-160 0 C-100 -92 100 -92 160 0 C100 92 -100 92 -160 0 Z"/><path class="m-line" d="M-160 0 C-100 -92 100 -92 160 0 C100 92 -100 92 -160 0 Z"/><circle class="m-line" cx="0" cy="0" r="50"/><circle class="m-dot" cx="0" cy="0" r="18"/><path class="m-line m-bold" d="M-120 -112 L120 112"/>`,
  radar: `<circle class="m-fill" cx="0" cy="0" r="140"/><circle class="m-line" cx="0" cy="0" r="140"/><circle class="m-line m-thin" cx="0" cy="0" r="94"/><circle class="m-line m-thin" cx="0" cy="0" r="48"/><path class="m-line m-thin" d="M-140 0 H140 M0 -140 V140"/><path class="m-sweep" d="M0 0 L0 -140 A140 140 0 0 1 121 -70 Z"/><circle class="m-dot" cx="52" cy="-78" r="8"/><circle class="m-dot" cx="-70" cy="40" r="6"/>`,
  hook: `<rect class="m-fill" x="-150" y="-60" width="270" height="180" rx="18"/><rect class="m-line" x="-150" y="-60" width="270" height="180" rx="18"/><path class="m-line" d="M-150 -44 L-15 52 L120 -44"/><path class="m-line m-bold" d="M70 -190 V-96 a40 40 0 1 1 -80 0 v-12"/><path class="m-line m-bold" d="M-10 -108 l-14 18"/>`,
  bug: `<path class="m-fill" d="M0 -150 L130 -75 V75 L0 150 L-130 75 V-75 Z"/><path class="m-line m-thin" d="M0 -150 L130 -75 V75 L0 150 L-130 75 V-75 Z"/><ellipse class="m-line" cx="0" cy="18" rx="46" ry="64"/><circle class="m-line" cx="0" cy="-62" r="24"/><path class="m-line" d="M-46 -6 H-86 M46 -6 H86 M-46 30 H-90 M46 30 H90 M-40 64 L-74 92 M40 64 L74 92 M-14 -84 L-30 -108 M14 -84 L30 -108 M0 -40 V82"/>`,
  wifi: `<path class="m-line m-thin" d="M-170 -40 A240 240 0 0 1 170 -40"/><path class="m-line" d="M-122 4 A172 172 0 0 1 122 4"/><path class="m-line" d="M-74 48 A104 104 0 0 1 74 48"/><circle class="m-dot" cx="0" cy="104" r="18"/><path class="m-fill" d="M0 -150 L44 -134 V-104 C44 -82 24 -66 0 -58 C-24 -66 -44 -82 -44 -104 V-134 Z"/><path class="m-line m-thin" d="M0 -150 L44 -134 V-104 C44 -82 24 -66 0 -58 C-24 -66 -44 -82 -44 -104 V-134 Z"/>`,
  key: `<circle class="m-fill" cx="-78" cy="0" r="68"/><circle class="m-line" cx="-78" cy="0" r="68"/><circle class="m-line m-thin" cx="-78" cy="0" r="22"/><path class="m-line m-bold" d="M-10 0 H160 M118 0 V44 M150 0 V30"/>`,
  steps: `<rect class="m-fill" x="-130" y="-120" width="260" height="70" rx="16"/><rect class="m-line" x="-130" y="-120" width="260" height="70" rx="16"/><rect class="m-fill" x="-130" y="-30" width="260" height="70" rx="16"/><rect class="m-line" x="-130" y="-30" width="260" height="70" rx="16"/><rect class="m-fill" x="-130" y="60" width="260" height="70" rx="16"/><rect class="m-line m-thin" x="-130" y="60" width="260" height="70" rx="16"/><path class="m-line m-bold" d="M-100 -86 l12 12 l22 -24 M-100 4 l12 12 l22 -24"/><path class="m-line m-thin" d="M-40 -85 H90 M-40 5 H70 M-100 95 H60"/>`,
  tools: `<path class="m-fill" d="${gearPath(10, 120, 100)}"/><path class="m-line" d="${gearPath(10, 120, 100)}"/><circle class="m-line m-thin" cx="0" cy="0" r="62"/><circle class="m-dot" cx="0" cy="0" r="20"/>`,
};

function articleArt({ slug, title }, cat) {
  const rand = rng(hash(slug));
  const [c1, c2] = cat.colors;
  const id = 'a' + (hash(slug) % 100000);
  const mx = 820 + Math.round(rand() * 60);
  const my = 340 + Math.round(rand() * 30 - 15);
  const scale = (1 + rand() * 0.18).toFixed(2);
  const rot = Math.round(rand() * 360);

  // Constellation of nodes in the left/top area
  const nodes = [];
  for (let i = 0; i < 22; i++) nodes.push([Math.round(40 + rand() * 560), Math.round(40 + rand() * 595)]);
  let lines = '';
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]);
      if (d < 130) lines += `M${nodes[i][0]} ${nodes[i][1]}L${nodes[j][0]} ${nodes[j][1]}`;
    }
  }
  const dots = nodes.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 5 === 0 ? 3.2 : 1.8}"/>`).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="${title.replace(/[<>&"]/g, '')}"><defs>
<radialGradient id="${id}g1" cx="${mx / 12}%" cy="${my / 6.75}%" r="45%"><stop offset="0" stop-color="${c1}" stop-opacity=".34"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></radialGradient>
<radialGradient id="${id}g2" cx="10%" cy="95%" r="60%"><stop offset="0" stop-color="${c2}" stop-opacity=".26"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity=".22"/><stop offset="1" stop-color="${c2}" stop-opacity=".04"/></linearGradient>
<pattern id="${id}p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".045"/></pattern>
<filter id="${id}glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<style>.m-fill{fill:url(#${id}f)}.m-line{fill:none;stroke:url(#${id}s);stroke-width:6;stroke-linecap:round;stroke-linejoin:round}.m-thin{stroke-width:3;opacity:.7}.m-bold{stroke-width:9}.m-dot{fill:url(#${id}s)}.m-sweep{fill:url(#${id}s);opacity:.25}</style>
</defs>
<rect width="1200" height="675" fill="#070a10"/>
<rect width="1200" height="675" fill="url(#${id}p)"/>
<rect width="1200" height="675" fill="url(#${id}g2)"/>
<rect width="1200" height="675" fill="url(#${id}g1)"/>
<g fill="none" stroke="#ffffff" stroke-opacity=".07" transform="rotate(${rot} ${mx} ${my})"><circle cx="${mx}" cy="${my}" r="205" stroke-dasharray="2 10"/><circle cx="${mx}" cy="${my}" r="265"/><circle cx="${mx}" cy="${my}" r="335" stroke-dasharray="40 14"/></g>
<path d="${lines}" stroke="${c2}" stroke-opacity=".16" stroke-width="1"/>
<g fill="${c1}" fill-opacity=".55">${dots}</g>
<g transform="translate(${mx} ${my}) scale(${scale})" filter="url(#${id}glow)">${MOTIFS[cat.motif] || MOTIFS.shield}</g>
<text x="56" y="76" fill="#ffffff" fill-opacity=".5" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="20" letter-spacing="4">${cat.name.toUpperCase().replace(/&/g, '&amp;')}</text>
<rect x="56" y="96" width="64" height="3" rx="1.5" fill="url(#${id}s)"/>
</svg>`;
}

module.exports = { logoMark, faviconSvg, markShapes, articleArt, fortPoints, MOTIFS };
