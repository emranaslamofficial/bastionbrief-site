#!/usr/bin/env node
'use strict';
/**
 * Bastion Brief static site builder (zero dependencies).
 *
 *   node build.js          → builds ./dist
 *
 * Reads content/ (articles + pages in Markdown, config in JS), renders every
 * page with lib/ templates, writes sitemap, robots, RSS, search index, and
 * finally verifies that every internal link and asset resolves.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const { renderMarkdown, parseFrontMatter } = require('./lib/markdown');
const { articleArt, faviconSvg } = require('./lib/art');
const C = require('./lib/components');
const P = require('./lib/pages');

const site = require('./content/site');
const categories = require('./content/categories');
const authors = require('./content/authors');

const t0 = Date.now();
const errors = [];
const warn = [];

/* ---------------------------------------------------------- fs helpers */
function rmrf(p) {
  // Retries cover transient Windows file locks (e.g. a preview server reading dist/).
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true, maxRetries: 8, retryDelay: 150 });
}
function write(rel, data) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(d, { recursive: true });
      copyDir(s, d);
    } else fs.copyFileSync(s, d);
  }
}
const shortHash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);
const stripHtml = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim();

/* ---------------------------------------------------------- load articles */
const REQUIRED = ['title', 'slug', 'description', 'category', 'date'];
const articleDir = path.join(ROOT, 'content', 'articles');
const articles = fs
  .readdirSync(articleDir)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const { data, body } = parseFrontMatter(fs.readFileSync(path.join(articleDir, file), 'utf8'));
    for (const k of REQUIRED) if (!data[k]) errors.push(`${file}: missing front-matter "${k}"`);
    const cat = categories.find((c) => c.slug === data.category);
    if (!cat) errors.push(`${file}: unknown category "${data.category}"`);
    const extra = (data.categories || '').split(',').map((s) => s.trim()).filter(Boolean);
    extra.forEach((s) => !categories.find((c) => c.slug === s) && errors.push(`${file}: unknown extra category "${s}"`));
    if (data.description && data.description.length > 165) warn.push(`${file}: description is ${data.description.length} chars (aim for ≤ 160)`);
    const md = renderMarkdown(body);
    const text = stripHtml(md.html);
    const words = text.split(/\s+/).length + md.faq.reduce((s, f) => s + f.q.split(' ').length + f.answerText.split(' ').length, 0);
    return {
      ...data,
      file,
      author: data.author || 'editorial-team',
      updated: data.updated || data.date,
      tags: (data.tags || '').split(',').map((s) => s.trim()).filter(Boolean),
      categoryObj: cat || categories[0],
      allCategories: [data.category, ...extra],
      url: `/blog/${data.slug}/`,
      image: `/assets/img/articles/${data.slug}.svg`,
      imageAlt: data.imageAlt || `Abstract ${cat ? cat.name.toLowerCase() : 'security'} illustration for the article “${data.title}”`,
      ogImage: fs.existsSync(path.join(ROOT, 'src', 'static', 'og', `${data.slug}.png`)) ? `/og/${data.slug}.png` : '/og/default.png',
      html: md.html,
      headings: md.headings,
      faq: md.faq,
      links: md.links,
      text,
      words,
      readingTime: Math.max(1, Math.round(words / 230)),
      featured: data.featured === true,
      essential: data.essential === true,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
if (Object.keys(bySlug).length !== articles.length) errors.push('Duplicate article slugs found');

// Related: shared categories and tags, then recency. Prev/next by date.
articles.forEach((a, i) => {
  a.prev = articles[i + 1] || null; // older
  a.next = articles[i - 1] || null; // newer
  const scored = articles
    .filter((b) => b !== a)
    .map((b) => {
      let s = 0;
      if (b.category === a.category) s += 5;
      s += b.allCategories.filter((c) => a.allCategories.includes(c)).length * 2;
      s += b.tags.filter((t) => a.tags.includes(t)).length * 3;
      if (a.links.includes(b.url)) s += 2;
      return { b, s };
    })
    .sort((x, y) => y.s - x.s || (x.b.date < y.b.date ? 1 : -1));
  a.related = scored.slice(0, 3).map((x) => x.b);
});

const catCount = Object.fromEntries(categories.map((c) => [c.slug, articles.filter((a) => a.allCategories.includes(c.slug)).length]));
categories.forEach((c) => catCount[c.slug] === 0 && warn.push(`Category "${c.slug}" has no articles`));

/* ---------------------------------------------------------- load md pages */
const pageDir = path.join(ROOT, 'content', 'pages');
const mdPages = fs
  .readdirSync(pageDir)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const { data, body } = parseFrontMatter(fs.readFileSync(path.join(pageDir, file), 'utf8'));
    const md = renderMarkdown(body);
    return { data, path: `/${data.slug}/`, html: md.html, headings: md.headings };
  });

/* ---------------------------------------------------------- build */
rmrf(DIST);
fs.mkdirSync(DIST, { recursive: true });
copyDir(path.join(ROOT, 'src', 'static'), DIST);
copyDir(path.join(ROOT, 'src', 'assets'), path.join(DIST, 'assets'));

// Category colour tokens are generated into the stylesheet (no inline styles → strict CSP works).
const cssOut =
  fs.readFileSync(path.join(ROOT, 'src/assets/css/main.css'), 'utf8') +
  '\n/* Generated category tokens */\n' +
  categories.map((c) => `[data-cat="${c.slug}"]{--c1:${c.colors[0]};--c2:${c.colors[1]}}`).join('\n') +
  '\n';
write('assets/css/main.css', cssOut);

const assetHash = {
  css: shortHash(cssOut),
  js: shortHash(fs.readdirSync(path.join(ROOT, 'src/assets/js')).map((f) => fs.readFileSync(path.join(ROOT, 'src/assets/js', f), 'utf8')).join('')),
};

const G = { site, categories, authors, articles, bySlug, catCount, assets: assetHash };
const pages = [];
const emit = (ctx) => {
  ctx.global = G;
  const html = C.layout(ctx);
  const rel = ctx.path.endsWith('.html') ? ctx.path : path.join(ctx.path, 'index.html');
  write(rel, html);
  pages.push(ctx);
};

// Art
write('favicon.svg', faviconSvg());
articles.forEach((a) => write(`assets/img/articles/${a.slug}.svg`, articleArt(a, a.categoryObj)));

// Pages
emit(P.home(G));
const per = site.postsPerPage;
const blogList = articles.filter((a, i) => !(a.featured && a === articles.find((x) => x.featured)));
const totalPages = Math.max(1, Math.ceil(blogList.length / per));
for (let n = 1; n <= totalPages; n++) emit(P.blogPage(G, n, totalPages, blogList.slice((n - 1) * per, n * per)));
emit(P.categoriesIndex(G));
categories.forEach((c) => emit(P.categoryPage(G, c)));
articles.forEach((a) => emit(P.articlePage(G, a)));
authors.forEach((au) => emit(P.authorPage(G, au)));
emit(P.searchPage(G));
emit(P.contactPage(G));
emit(P.guidesPage(G));
emit(P.newsletterPage(G));
mdPages.forEach((p) => emit(P.mdPage(G, p)));
emit(P.notFound(G));

/* ---------------------------------------------------------- search index */
const index = articles.map((a) => ({
  t: a.title,
  u: a.url,
  d: a.description,
  c: a.categoryObj.name,
  cs: a.allCategories.map((s) => categories.find((c) => c.slug === s).name),
  k: a.tags,
  h: a.headings.map((h) => h.text),
  x: a.text.slice(0, 8000),
  r: a.readingTime,
  dt: a.date,
  img: a.image,
}));
write('search-index.json', JSON.stringify(index));

/* ---------------------------------------------------------- sitemap, robots, feed, manifest */
const indexable = pages.filter((p) => !p.noindex);
const lastmod = (p) => (p.article ? p.article.updated : articles[0].updated);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${p.path.match(/privacy|terms|disclaimer|cookie|about|editorial/) ? '2026-11-19' : lastmod(p)}</lastmod></url>`)
  .join('\n')}
</urlset>
`
);
write(
  'robots.txt',
  `# ${site.name}
User-agent: *
Allow: /
Disallow: /search/

Sitemap: ${site.url}/sitemap.xml
`
);
const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
write(
  'feed.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xmlEsc(site.name)}</title>
  <link>${site.url}/</link>
  <description>${xmlEsc(site.description)}</description>
  <language>${site.lang}</language>
  <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
  <lastBuildDate>${new Date(articles[0].updated + 'T08:00:00Z').toUTCString()}</lastBuildDate>
${articles
  .map(
    (a) => `  <item>
    <title>${xmlEsc(a.title)}</title>
    <link>${site.url}${a.url}</link>
    <guid isPermaLink="true">${site.url}${a.url}</guid>
    <pubDate>${new Date(a.date + 'T08:00:00Z').toUTCString()}</pubDate>
    <category>${xmlEsc(a.categoryObj.name)}</category>
    <description>${xmlEsc(a.description)}</description>
  </item>`
  )
  .join('\n')}
</channel>
</rss>
`
);
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      description: site.description,
      start_url: '/',
      display: 'standalone',
      background_color: site.themeColor,
      theme_color: site.themeColor,
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  )
);

/* ---------------------------------------------------------- link + asset check */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const missing = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const ref = m[1].replace(/&amp;/g, '&');
    if (ref.startsWith('#')) {
      if (ref.length > 1 && !ids.has(ref.slice(1))) missing.set(`${ref} (anchor)`, path.relative(DIST, file));
      continue;
    }
    if (!ref.startsWith('/') || ref.startsWith('//')) continue;
    const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
    const target = path.join(DIST, clean.endsWith('/') ? clean + 'index.html' : clean);
    if (!fs.existsSync(target)) missing.set(clean, path.relative(DIST, file));
  }
}
for (const [ref, from] of missing) errors.push(`Broken link/asset ${ref} (first seen in ${from})`);

/* ---------------------------------------------------------- report */
const totalWords = articles.reduce((s, a) => s + a.words, 0);
console.log(`\n  Bastion Brief build`);
console.log(`  ─────────────────────────────`);
console.log(`  Pages        ${pages.length}`);
console.log(`  Articles     ${articles.length}  (${totalWords.toLocaleString('en-US')} words, avg ${Math.round(totalWords / articles.length)})`);
console.log(`  Categories   ${categories.length}`);
console.log(`  Time         ${Date.now() - t0} ms`);
if (process.argv.includes('--stats')) {
  articles.forEach((a) => console.log(`    ${String(a.words).padStart(5)}w  ${a.readingTime}m  ${a.slug}`));
}
warn.forEach((w) => console.log(`  ⚠ ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`  ✖ ${e}`));
  console.error(`\n  Build finished with ${errors.length} error(s).\n`);
  process.exitCode = 1;
} else {
  console.log(`  ✔ All internal links and assets resolve.\n`);
}
