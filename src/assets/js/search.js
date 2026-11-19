/**
 * Client-side search over /search-index.json (built at compile time).
 * Matches title, tags, category, headings, description and body text.
 * All rendering uses DOM APIs + textContent — no innerHTML with user input.
 */
let indexPromise = null;

const STOP = new Set(['a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'how', 'what', 'do', 'does', 'my', 'your', 'i', 'it', 'with', 'can', 'be', 'from', 'by', 'vs']);
const ALIASES = {
  '2fa': ['twofactor'],
  mfa: ['twofactor', 'multifactor'],
  otp: ['twofactor', 'authenticator'],
  wifi: ['wifi', 'network'],
  ig: ['instagram'],
  insta: ['instagram'],
  fb: ['facebook'],
  meta: ['facebook', 'instagram'],
  pentest: ['penetration'],
  pentesting: ['penetration'],
  virus: ['malware'],
  scam: ['phishing', 'scam'],
  pw: ['password'],
  vpn: ['vpn', 'wifi'],
};

export function normalize(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/([a-z0-9])-(?=[a-z0-9])/g, '$1');
}
function stem(w) {
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith('es')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}
export function tokenize(q) {
  return normalize(q)
    .split(/[^a-z0-9]+/)
    .filter((t) => t && (t.length > 1 || /\d/.test(t)) && !STOP.has(t))
    .slice(0, 8);
}

export function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch('/search-index.json', { credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error('Index unavailable');
        return r.json();
      })
      .then((items) =>
        items.map((it) => ({
          ...it,
          _t: normalize(it.t),
          _k: normalize(it.k.join(' ')),
          _c: normalize(it.cs.join(' ')),
          _h: normalize(it.h.join(' ')),
          _d: normalize(it.d),
          _x: normalize(it.x),
        }))
      )
      .catch((e) => {
        indexPromise = null;
        throw e;
      });
  }
  return indexPromise;
}

function scoreToken(it, tok) {
  const variants = [tok, stem(tok), ...(ALIASES[tok] || [])];
  let best = 0;
  for (const v of variants) {
    if (!v) continue;
    const wordRe = new RegExp(`(^|[^a-z0-9])${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    let s = 0;
    if (wordRe.test(it._t)) s += 12;
    else if (it._t.includes(v)) s += 6;
    if (it._k.includes(v)) s += 7;
    if (it._c.includes(v)) s += 6;
    if (it._h.includes(v)) s += 4;
    if (it._d.includes(v)) s += 3;
    if (it._x.includes(v)) s += 1.5;
    best = Math.max(best, s);
  }
  return best;
}

export function search(items, query, limit = 50) {
  const toks = tokenize(query);
  if (!toks.length) return [];
  const scored = items.map((it) => {
    const per = toks.map((t) => scoreToken(it, t));
    const matched = per.filter((s) => s > 0).length;
    const total = per.reduce((a, b) => a + b, 0);
    return { it, matched, score: total };
  });
  // If some articles match every term, show only those (precise AND search).
  // Otherwise fall back to articles matching at least half of the terms.
  const all = scored.filter((s) => s.matched === toks.length);
  const pool = all.length ? all : scored.filter((s) => s.matched >= Math.ceil(toks.length / 2) && s.matched > 0);
  return pool
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || (a.it.dt < b.it.dt ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.it);
}

/** Append `text` into `el`, wrapping query matches in <mark>. Safe: text nodes only. */
export function highlightInto(el, text, query) {
  const toks = tokenize(query)
    .filter((t) => t.length > 1)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!toks.length) {
    el.textContent = text;
    return el;
  }
  const re = new RegExp(`(${toks.join('|')})`, 'gi');
  let last = 0;
  String(text).replace(re, (m, _g, offset) => {
    if (offset > last) el.appendChild(document.createTextNode(text.slice(last, offset)));
    const mark = document.createElement('mark');
    mark.textContent = m;
    el.appendChild(mark);
    last = offset + m.length;
    return m;
  });
  if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  return el;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fmtDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Full result card used on /search/. Mirrors the server-rendered article card. */
export function resultCard(it, query) {
  const art = document.createElement('article');
  art.className = 'card';
  const media = document.createElement('div');
  media.className = 'card__media';
  const img = document.createElement('img');
  img.src = it.img;
  img.alt = '';
  img.width = 1200;
  img.height = 675;
  img.loading = 'lazy';
  img.decoding = 'async';
  media.appendChild(img);
  const body = document.createElement('div');
  body.className = 'card__body';
  const meta = document.createElement('div');
  meta.className = 'card__meta';
  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = it.c;
  const read = document.createElement('span');
  read.className = 'card__read';
  read.textContent = `${it.r} min read`;
  meta.append(badge, read);
  const h = document.createElement('h2');
  h.className = 'card__title';
  const a = document.createElement('a');
  a.href = it.u;
  highlightInto(a, it.t, query);
  h.appendChild(a);
  const p = document.createElement('p');
  p.className = 'card__excerpt';
  highlightInto(p, it.d, query);
  const foot = document.createElement('div');
  foot.className = 'card__foot';
  const time = document.createElement('time');
  time.dateTime = it.dt;
  time.textContent = fmtDate(it.dt);
  foot.appendChild(time);
  body.append(meta, h, p, foot);
  art.append(media, body);
  return art;
}
