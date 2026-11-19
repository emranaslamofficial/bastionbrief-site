'use strict';
/**
 * Reusable UI components. Every function returns an HTML string.
 * Dynamic text is always passed through esc() — never interpolate raw input.
 */
const { esc } = require('./markdown');
const { logoMark } = require('./art');

/* ---------------------------------------------------------------- Icons */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/>',
  shieldCheck: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M15 8l2 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  hook: '<path d="M12 2v11a4 4 0 1 1-8 0v-1"/><path d="M4 12 2 14"/><rect x="13" y="13" width="9" height="7" rx="1.5"/><path d="m13 14 4.5 3 4.5-3"/>',
  wifi: '<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16.1a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/>',
  bug: '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M12 20v-9M3 13h5M16 13h5M4 7l4 3M20 7l-4 3M4 19l4-2M20 19l-4-2M9.5 6.5 8 3M14.5 6.5 16 3"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3M12 15h6"/>',
  radar: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><path d="M12 12 19 5"/><circle cx="12" cy="12" r="1.5"/>',
  steps: '<rect x="3" y="3" width="18" height="5" rx="1.5"/><rect x="3" y="10" width="18" height="5" rx="1.5"/><rect x="3" y="17" width="18" height="4" rx="1.5"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  fingerprint: '<path d="M12 11v3a8 8 0 0 1-1.5 4.7M7.5 4.8A8 8 0 0 1 20 11v1.5M4 15.5c.6-1.3 1-2.8 1-4.5a7 7 0 0 1 1.1-3.8M16 12.5V14a12 12 0 0 1-1 4.8M8.5 12A3.5 3.5 0 0 1 15.5 11"/>',
  smartphone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
  rss: '<path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>',
  x: '<path d="M4 4l16 16M20 4 4 20"/>',
  linkedin: '<rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/>',
  facebook: '<path d="M15 3h-2a4 4 0 0 0-4 4v3H7v4h2v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z"/>',
  reddit: '<circle cx="12" cy="14" r="7"/><circle cx="18.5" cy="5.5" r="1.5"/><path d="M12 7l1-4 5 2.5M9 13h.01M15 13h.01M9.5 16.5c1.5 1 3.5 1 5 0"/>',
  youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
};

const CATEGORY_ICON = {
  shield: 'shieldCheck',
  terminal: 'terminal',
  chat: 'chat',
  eye: 'eye',
  radar: 'radar',
  hook: 'hook',
  bug: 'bug',
  wifi: 'wifi',
  key: 'key',
  steps: 'steps',
  tools: 'tools',
};

function icon(name, cls = '') {
  return `<svg class="icon${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.shield}</svg>`;
}
const catIcon = (cat, cls) => icon(CATEGORY_ICON[cat.motif] || 'shield', cls);

/* ---------------------------------------------------------------- Helpers */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function fmtDate(iso, long = false) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${(long ? MONTHS_LONG : MONTHS)[m - 1]} ${d}, ${y}`;
}

/* ---------------------------------------------------------------- Layout */
function layout(ctx) {
  const { site, assets } = ctx.global;
  const title = ctx.title === site.name ? `${site.name} — ${site.tagline}` : `${ctx.title} | ${site.name}`;
  const canonical = site.url + ctx.path;
  const ogImage = site.url + (ctx.ogImage || '/og/default.png');
  const jsonld = (ctx.jsonld || [])
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  const articleMeta = ctx.article
    ? `<meta property="article:published_time" content="${ctx.article.date}T08:00:00Z">
<meta property="article:modified_time" content="${ctx.article.updated}T08:00:00Z">
<meta property="article:section" content="${esc(ctx.article.categoryObj.name)}">
${ctx.article.tags.map((t) => `<meta property="article:tag" content="${esc(t)}">`).join('\n')}`
    : '';

  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(ctx.description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${ctx.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta property="og:type" content="${ctx.article ? 'article' : 'website'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(ctx.ogTitle || ctx.title)}">
<meta property="og:description" content="${esc(ctx.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(ctx.ogTitle || ctx.title)}">
${articleMeta}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ctx.ogTitle || ctx.title)}">
<meta name="twitter:description" content="${esc(ctx.description)}">
<meta name="twitter:image" content="${ogImage}">
${site.twitterHandle ? `<meta name="twitter:site" content="${esc(site.twitterHandle)}">` : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="alternate" type="application/rss+xml" title="${esc(site.name)} — latest articles" href="/feed.xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="/assets/css/main.css?v=${assets.css}">
${ctx.preloadImage ? `<link rel="preload" as="image" href="${ctx.preloadImage}">` : ''}
${jsonld}
<script type="module" src="/assets/js/main.js?v=${assets.js}"></script>
</head>
<body class="${ctx.bodyClass || ''}" data-nl-endpoint="${esc(site.forms.newsletterEndpoint)}">
<a class="skip-link" href="#main">Skip to main content</a>
${header(ctx)}
<main id="main" tabindex="-1">
${ctx.content}
</main>
${footer(ctx)}
${searchOverlay()}
</body>
</html>`;
}

/* ---------------------------------------------------------------- Header */
function header(ctx) {
  const { categories } = ctx.global;
  const p = ctx.path;
  const cur = (href) => (p === href || (href !== '/' && p.startsWith(href)) ? ' aria-current="page"' : '');
  const topicsActive = p.startsWith('/category/') || p === '/categories/';
  const mega = categories
    .map(
      (c) =>
        `<li><a class="mega__link" href="/category/${c.slug}/"><span class="mega__icon">${catIcon(c)}</span><span><strong>${esc(c.name)}</strong><small>${esc(c.description)}</small></span></a></li>`
    )
    .join('');
  const mobileCats = categories.map((c) => `<li><a href="/category/${c.slug}/">${catIcon(c)}${esc(c.name)}</a></li>`).join('');

  return `<header class="site-header" data-header>
  <div class="container header__inner">
    <a class="brand" href="/" aria-label="${esc(ctx.global.site.name)} — home">${logoMark(30, 'lm-h')}<span class="brand__name">Bastion<span>Brief</span></span></a>
    <nav class="nav" aria-label="Primary">
      <ul class="nav__list">
        <li><a class="nav__link" href="/blog/"${cur('/blog/')}>Articles</a></li>
        <li class="nav__item--menu">
          <button class="nav__link nav__menu-btn${topicsActive ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="topics-menu" data-menu-btn>Topics ${icon('chevronDown', 'icon--sm')}</button>
          <div class="mega" id="topics-menu" data-menu hidden>
            <ul class="mega__grid">${mega}</ul>
            <div class="mega__foot"><a href="/categories/">Browse all categories ${icon('arrowRight', 'icon--sm')}</a><a href="/guides/">Learning paths ${icon('arrowRight', 'icon--sm')}</a></div>
          </div>
        </li>
        <li><a class="nav__link" href="/guides/"${cur('/guides/')}>Guides</a></li>
        <li><a class="nav__link" href="/about/"${cur('/about/')}>About</a></li>
        <li><a class="nav__link" href="/contact/"${cur('/contact/')}>Contact</a></li>
      </ul>
    </nav>
    <div class="header__actions">
      <button class="search-trigger" type="button" data-search-open aria-label="Search articles">${icon('search')}<span class="search-trigger__label">Search</span><kbd>Ctrl K</kbd></button>
      <a class="btn btn--primary btn--sm header__cta" href="/newsletter/">Subscribe</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu" data-mobile-toggle><span></span><span></span></button>
    </div>
  </div>
</header>
<!-- Mobile nav lives outside <header>: the header's backdrop-filter would otherwise
     become the containing block for this fixed panel and collapse it. -->
<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile" data-mobile-nav hidden>
    <div class="mobile-nav__inner">
      <form class="mobile-nav__search" action="/search/" method="get" role="search">
        <label class="sr-only" for="q-mobile">Search articles</label>
        ${icon('search')}<input id="q-mobile" name="q" type="search" placeholder="Search guides and topics" autocomplete="off" maxlength="80">
      </form>
      <ul class="mobile-nav__main">
        <li><a href="/">Home</a></li>
        <li><a href="/blog/">Articles</a></li>
        <li><a href="/guides/">Guides &amp; learning paths</a></li>
        <li><a href="/categories/">All categories</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
      <p class="mobile-nav__label">Topics</p>
      <ul class="mobile-nav__cats">${mobileCats}</ul>
      <a class="btn btn--primary btn--block" href="/newsletter/">Subscribe to the briefing</a>
    </div>
</nav>`;
}

function searchOverlay() {
  return `<div class="search-overlay" data-search-overlay hidden>
  <div class="search-overlay__backdrop" data-search-close></div>
  <div class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-panel-title">
    <h2 class="sr-only" id="search-panel-title">Search Bastion Brief</h2>
    <form class="search-panel__form" action="/search/" method="get" role="search">
      ${icon('search')}
      <label class="sr-only" for="q-overlay">Search articles</label>
      <input id="q-overlay" name="q" type="search" placeholder="Search threats, guides, topics…" autocomplete="off" spellcheck="false" maxlength="80" data-search-input aria-controls="search-panel-results">
      <button class="search-panel__close" type="button" data-search-close aria-label="Close search"><kbd>Esc</kbd></button>
    </form>
    <div class="search-panel__results" id="search-panel-results" data-search-results aria-live="polite"></div>
    <div class="search-panel__hints" data-search-hints>
      <p>Try a topic</p>
      <div class="chips">
        <a class="chip-link" href="/search/?q=phishing">Phishing</a>
        <a class="chip-link" href="/search/?q=instagram">Instagram</a>
        <a class="chip-link" href="/search/?q=two-factor">Two-factor</a>
        <a class="chip-link" href="/search/?q=password">Passwords</a>
        <a class="chip-link" href="/search/?q=malware">Malware</a>
        <a class="chip-link" href="/search/?q=privacy">Privacy</a>
      </div>
    </div>
  </div>
</div>`;
}

/* ---------------------------------------------------------------- Footer */
function footer(ctx) {
  const { site, categories } = ctx.global;
  const year = new Date().getFullYear();
  const social = [
    ...site.social.map((s) => ({ ...s, ext: true })),
    { label: 'RSS feed', url: '/feed.xml', icon: 'rss', ext: false },
  ];
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="brand" href="/" aria-label="${esc(site.name)} — home">${logoMark(30, 'lm-f')}<span class="brand__name">Bastion<span>Brief</span></span></a>
        <p>${esc(site.description)}</p>
        <ul class="footer__social" aria-label="Follow ${esc(site.name)}">
          ${social
            .map(
              (s) =>
                `<li><a href="${esc(s.url)}" aria-label="${esc(s.label)}"${s.ext ? ' target="_blank" rel="noopener noreferrer me"' : ''}>${icon(s.icon)}</a></li>`
            )
            .join('')}
        </ul>
      </div>
      <div class="footer__news">
        <h2 class="footer__heading">The weekly briefing</h2>
        <p>Practical security guides and privacy tips. No spam, unsubscribe any time.</p>
        ${newsletterForm('footer')}
      </div>
    </div>
    <div class="footer__cols">
      <nav aria-label="Explore"><h2 class="footer__heading">Explore</h2><ul>
        <li><a href="/blog/">All articles</a></li><li><a href="/guides/">Guides &amp; learning paths</a></li><li><a href="/categories/">Categories</a></li><li><a href="/search/">Search</a></li><li><a href="/newsletter/">Newsletter</a></li></ul></nav>
      <nav aria-label="Topics"><h2 class="footer__heading">Topics</h2><ul>
        ${categories.slice(0, 6).map((c) => `<li><a href="/category/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul></nav>
      <nav aria-label="More topics"><h2 class="footer__heading">More topics</h2><ul>
        ${categories.slice(6).map((c) => `<li><a href="/category/${c.slug}/">${esc(c.name)}</a></li>`).join('')}</ul></nav>
      <nav aria-label="Company"><h2 class="footer__heading">Bastion Brief</h2><ul>
        <li><a href="/about/">About</a></li><li><a href="/editorial-policy/">Editorial policy</a></li><li><a href="/author/editorial-team/">Editorial team</a></li><li><a href="/contact/">Contact</a></li></ul></nav>
      <nav aria-label="Legal"><h2 class="footer__heading">Legal</h2><ul>
        <li><a href="/privacy-policy/">Privacy policy</a></li><li><a href="/terms/">Terms &amp; conditions</a></li><li><a href="/disclaimer/">Disclaimer</a></li><li><a href="/cookie-policy/">Cookie policy</a></li></ul></nav>
    </div>
    <div class="footer__bottom">
      <p>&copy; ${year} ${esc(site.name)}. Educational content for defensive purposes only.</p>
      <p class="footer__note">${icon('shieldCheck', 'icon--sm')} No trackers. No ad scripts. Just articles.</p>
    </div>
  </div>
</footer>`;
}

/* ---------------------------------------------------------------- Newsletter */
function newsletterForm(id) {
  return `<form class="nl-form" data-newsletter-form novalidate>
  <div class="nl-form__row">
    <label class="sr-only" for="nl-email-${id}">Email address</label>
    <input class="input" id="nl-email-${id}" name="email" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" required maxlength="254" aria-describedby="nl-msg-${id}">
    <input class="hp-field" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button class="btn btn--primary" type="submit"><span>Subscribe</span>${icon('arrowRight', 'icon--sm')}</button>
  </div>
  <p class="nl-form__msg" id="nl-msg-${id}" role="status" aria-live="polite"></p>
</form>`;
}

function newsletterSection(id = 'main', { heading = 'h2' } = {}) {
  return `<section class="section newsletter" id="newsletter" aria-labelledby="nl-title-${id}">
  <div class="container">
    <div class="newsletter__card reveal">
      <div class="newsletter__glow" aria-hidden="true"></div>
      <div class="newsletter__copy">
        <p class="eyebrow">${icon('mail', 'icon--sm')} The Bastion Briefing</p>
        <${heading} class="newsletter__title" id="nl-title-${id}">Stay ahead of <em>cyber threats</em></${heading}>
        <p>Get practical cybersecurity guides, privacy tips and security explainers delivered to your inbox.</p>
        <ul class="newsletter__points">
          <li>${icon('check', 'icon--sm')} One considered email, not a firehose</li>
          <li>${icon('check', 'icon--sm')} Defensive, actionable advice</li>
          <li>${icon('check', 'icon--sm')} Unsubscribe in one click</li>
        </ul>
      </div>
      <div class="newsletter__form">
        ${newsletterForm(id)}
        <p class="newsletter__privacy">${icon('lock', 'icon--sm')} We only use your email to send the newsletter. Read our <a href="/privacy-policy/">privacy policy</a>.</p>
      </div>
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- Cards */
function articleCard(a, { variant = 'default', h = 'h3', eager = false } = {}) {
  const cat = a.categoryObj;
  return `<article class="card card--${variant}${variant === 'feature' ? '' : ' tilt'} reveal">
  <div class="card__media"><img src="${a.image}" alt="" width="1200" height="675" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>
  <div class="card__body">
    <div class="card__meta"><a class="badge" href="/category/${cat.slug}/">${esc(cat.name)}</a><span class="card__read">${icon('clock', 'icon--xs')} ${a.readingTime} min read</span></div>
    <${h} class="card__title"><a href="${a.url}">${esc(a.title)}</a></${h}>
    ${variant !== 'compact' ? `<p class="card__excerpt">${esc(a.description)}</p>` : ''}
    <div class="card__foot"><time datetime="${a.date}">${fmtDate(a.date)}</time><span class="card__arrow" aria-hidden="true">${icon('arrowUpRight', 'icon--sm')}</span></div>
  </div>
</article>`;
}

function listItem(a, n) {
  return `<li class="list-item reveal">
  <span class="list-item__num" aria-hidden="true">${String(n).padStart(2, '0')}</span>
  <div>
    <a class="badge badge--quiet" href="/category/${a.categoryObj.slug}/">${esc(a.categoryObj.name)}</a>
    <h3 class="list-item__title"><a href="${a.url}">${esc(a.title)}</a></h3>
    <p class="list-item__meta">${a.readingTime} min read · ${a.words.toLocaleString('en-US')} words</p>
  </div>
</li>`;
}

function categoryCard(cat, count) {
  return `<a class="cat-card tilt reveal" href="/category/${cat.slug}/" data-cat="${cat.slug}">
  <span class="cat-card__icon">${catIcon(cat)}</span>
  <span class="cat-card__name">${esc(cat.name)}</span>
  <span class="cat-card__desc">${esc(cat.description)}</span>
  <span class="cat-card__foot"><span>${count} ${count === 1 ? 'article' : 'articles'}</span>${icon('arrowRight', 'icon--sm')}</span>
</a>`;
}

/* ---------------------------------------------------------------- Breadcrumbs */
function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${esc(it.name)}</span></li>`
        : `<li><a href="${it.path}">${esc(it.name)}</a></li>`
    )
    .join('')}</ol></nav>`;
}
function breadcrumbSchema(items, siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: siteUrl + it.path })),
  };
}

/* ---------------------------------------------------------------- TOC / FAQ */
function toc(headings) {
  const h2s = headings.filter((h) => h.level === 2);
  if (h2s.length < 2) return '';
  return `<nav class="toc" aria-label="Table of contents" data-toc>
  <p class="toc__title">${icon('layers', 'icon--sm')} On this page</p>
  <ol>${h2s.map((h) => `<li><a href="#${h.id}">${esc(h.text)}</a></li>`).join('')}</ol>
</nav>`;
}

function faqBlock(faq, title = 'Frequently asked questions', id = 'faq') {
  if (!faq.length) return '';
  return `<section class="faq" aria-labelledby="${id}">
  <h2 id="${id}">${esc(title)}</h2>
  <div class="faq__list">${faq
    .map(
      (f, i) =>
        `<details class="faq__item"${i === 0 ? ' open' : ''}><summary><span>${esc(f.q)}</span><span class="faq__toggle" aria-hidden="true"></span></summary><div class="faq__answer">${f.answerHtml}</div></details>`
    )
    .join('')}</div>
</section>`;
}
function faqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.answerText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '') } })),
  };
}

/* ---------------------------------------------------------------- Author */
function avatar(author, size = 'md') {
  return `<span class="avatar avatar--${size}" aria-hidden="true">${logoMark(size === 'lg' ? 40 : 22, 'av-' + size)}</span>`;
}
function authorBox(author) {
  return `<aside class="author-box reveal" aria-label="About the author">
  ${avatar(author, 'lg')}
  <div>
    <p class="author-box__label">Written &amp; maintained by</p>
    <p class="author-box__name"><a href="/author/${author.slug}/">${esc(author.name)}</a></p>
    <p>${esc(author.bio)}</p>
    <a class="text-link" href="/editorial-policy/">How we research and review articles ${icon('arrowRight', 'icon--sm')}</a>
  </div>
</aside>`;
}

/* ---------------------------------------------------------------- Share */
function shareButtons(url, title) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'Share on X', icon: 'x', href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: 'Share on LinkedIn', icon: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'Share on Facebook', icon: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'Share on Reddit', icon: 'reddit', href: `https://www.reddit.com/submit?url=${u}&title=${t}` },
    { label: 'Share by email', icon: 'mail', href: `mailto:?subject=${t}&body=${u}`, self: true },
  ];
  return `<div class="share" aria-label="Share this article">
  <span class="share__label">Share</span>
  ${links
    .map(
      (l) =>
        `<a class="share__btn" href="${esc(l.href)}" aria-label="${l.label}"${l.self ? '' : ' target="_blank" rel="noopener noreferrer"'}>${icon(l.icon)}</a>`
    )
    .join('')}
  <button class="share__btn" type="button" data-copy-link="${esc(url)}" aria-label="Copy link to this article">${icon('link')}<span class="share__copied" role="status" aria-live="polite"></span></button>
</div>`;
}

/* ---------------------------------------------------------------- Pagination */
function pagination(current, total, base) {
  if (total <= 1) return '';
  const href = (n) => (n === 1 ? base : `${base}page/${n}/`);
  let items = '';
  for (let n = 1; n <= total; n++) {
    items += n === current ? `<li><span class="page is-current" aria-current="page">${n}</span></li>` : `<li><a class="page" href="${href(n)}">${n}</a></li>`;
  }
  return `<nav class="pagination" aria-label="Pagination">
  ${current > 1 ? `<a class="page page--nav" href="${href(current - 1)}" rel="prev">${icon('arrowLeft', 'icon--sm')} <span>Newer</span></a>` : '<span class="page page--nav is-disabled" aria-hidden="true">' + icon('arrowLeft', 'icon--sm') + ' <span>Newer</span></span>'}
  <ol>${items}</ol>
  ${current < total ? `<a class="page page--nav" href="${href(current + 1)}" rel="next"><span>Older</span> ${icon('arrowRight', 'icon--sm')}</a>` : '<span class="page page--nav is-disabled" aria-hidden="true"><span>Older</span> ' + icon('arrowRight', 'icon--sm') + '</span>'}
</nav>`;
}

/* ---------------------------------------------------------------- Page hero */
function pageHero({ eyebrow, title, lead, crumbs, extra = '', cls = '' }) {
  return `<section class="page-hero ${cls}">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container">
    ${crumbs ? breadcrumbs(crumbs) : ''}
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
    <h1 class="page-hero__title">${title}</h1>
    ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;
}

function ctaBand({ title, text, primary, secondary }) {
  return `<section class="section">
  <div class="container">
    <div class="cta-band reveal">
      <div class="cta-band__grid" aria-hidden="true"></div>
      <div class="cta-band__copy">
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--primary btn--lg" href="${primary.href}">${esc(primary.label)} ${icon('arrowRight', 'icon--sm')}</a>
        ${secondary ? `<a class="btn btn--ghost btn--lg" href="${secondary.href}">${esc(secondary.label)}</a>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

module.exports = {
  icon,
  catIcon,
  fmtDate,
  layout,
  newsletterForm,
  newsletterSection,
  articleCard,
  listItem,
  categoryCard,
  breadcrumbs,
  breadcrumbSchema,
  toc,
  faqBlock,
  faqSchema,
  avatar,
  authorBox,
  shareButtons,
  pagination,
  pageHero,
  ctaBand,
};
