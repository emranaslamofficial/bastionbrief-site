'use strict';
/**
 * Page builders. Each returns a context object consumed by components.layout().
 */
const { esc } = require('./markdown');
const { logoMark } = require('./art');
const C = require('./components');
const { icon } = C;

/* ================================================================ Schema */
function orgSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': site.url + '/#organization',
    name: site.name,
    url: site.url + '/',
    logo: { '@type': 'ImageObject', url: site.url + '/logo-512.png', width: 512, height: 512 },
    description: site.description,
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  };
}
function websiteSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': site.url + '/#website',
    name: site.name,
    url: site.url + '/',
    inLanguage: site.lang,
    publisher: { '@id': site.url + '/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: site.url + '/search/?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}
function itemListSchema(site, articles, name) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: site.url + a.url })),
  };
}

/* ================================================================ Home */
const HOME_FAQ = [
  {
    q: 'Is Bastion Brief free to read?',
    a: 'Yes. Every article, guide and checklist on Bastion Brief is free to read. We do not run paywalls or ad trackers.',
  },
  {
    q: 'Do you teach people how to hack accounts?',
    a: 'No. We explain how attacks work at the level a defender needs — enough to recognise them, prevent them and respond — but we never publish step-by-step instructions for gaining unauthorised access to accounts or systems. When we cover ethical hacking, we focus on authorised testing, the law and legal practice environments.',
  },
  {
    q: 'Who writes the articles?',
    a: 'Articles are researched and maintained by the Bastion Brief editorial team. We work from primary sources such as platform help centres, NIST and OWASP guidance and national cybersecurity agencies, and we update articles when those sources change.',
  },
  {
    q: 'I think my account has been hacked. Where should I start?',
    a: 'Start with our step-by-step guide on what to do if your online account has been hacked. It walks through regaining access, removing the intruder, and checking what else might be affected, in the order that matters most.',
    link: '/blog/what-to-do-if-account-hacked/',
  },
  {
    q: 'Is following your advice enough to make me completely secure?',
    a: 'No single source can guarantee security. Our guides cover the protections that stop the most common attacks, but every situation is different. For business systems or legal matters, consult a qualified professional.',
  },
  {
    q: 'Can I suggest a topic or report a mistake?',
    a: 'Please do. Use the contact page to suggest a topic or flag something that looks wrong or out of date. Corrections are taken seriously and reflected in the article’s updated date.',
    link: '/contact/',
  },
];

function heroVisual() {
  const shield = 'M120 14 L212 50 V132 C212 196 172 242 120 266 C68 242 28 196 28 132 V50 Z';
  return `<div class="hero-visual" aria-hidden="true">
  <canvas class="hero-visual__canvas" data-network></canvas>
  <div class="hero-visual__scene" data-parallax>
    <div class="ring ring--1"></div>
    <div class="ring ring--2"><span class="ring__dot"></span></div>
    <div class="ring ring--3"><span class="ring__dot ring__dot--b"></span></div>
    <div class="shield3d">
      <svg class="shield3d__layer shield3d__layer--back" viewBox="0 0 240 280"><defs><linearGradient id="hs1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#62e6c4" stop-opacity=".5"/><stop offset="1" stop-color="#8b93ff" stop-opacity=".2"/></linearGradient></defs><path d="${shield}" fill="none" stroke="url(#hs1)" stroke-width="2"/></svg>
      <svg class="shield3d__layer shield3d__layer--mid" viewBox="0 0 240 280"><defs><linearGradient id="hs2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb4ff" stop-opacity=".22"/><stop offset="1" stop-color="#62e6c4" stop-opacity=".05"/></linearGradient><linearGradient id="hs3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".5"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".06"/><stop offset="1" stop-color="#ffffff" stop-opacity=".22"/></linearGradient></defs><path d="${shield}" fill="url(#hs2)" stroke="url(#hs3)" stroke-width="1.5"/></svg>
      <svg class="shield3d__layer shield3d__layer--front" viewBox="0 0 240 280"><defs><linearGradient id="hs4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#62e6c4"/><stop offset="1" stop-color="#8b93ff"/></linearGradient></defs><g transform="translate(120 142) scale(3.4) translate(-16 -16.6)">${logoMark(32, 'hero-lm').replace(/<svg[^>]*>|<\/svg>/g, '').replace(/stroke-width="1.7"/, 'stroke-width="1.1"')}</g><circle cx="120" cy="142" r="9" fill="#05070b"/><path d="M116 148 h8 l-1.5 14 h-5 z" fill="#05070b"/></svg>
    </div>
    <div class="float-chip float-chip--a"><span class="float-chip__icon">${icon('fingerprint', 'icon--sm')}</span><span><strong>Two-factor</strong><small>Authenticator app on</small></span></div>
    <div class="float-chip float-chip--b"><span class="float-chip__icon float-chip__icon--warn">${icon('alert', 'icon--sm')}</span><span><strong>Lookalike domain</strong><small>examp1e-login.net</small></span></div>
    <div class="float-chip float-chip--c"><span class="float-chip__icon">${icon('key', 'icon--sm')}</span><span><strong>Password</strong><small>Unique · 22 characters</small></span></div>
  </div>
</div>`;
}

function home(g) {
  const { site, articles, categories, catCount } = g;
  const featured = articles.filter((a) => a.featured).slice(0, 3);
  const featuredSlugs = new Set(featured.map((a) => a.slug));
  const latest = articles.filter((a) => !featuredSlugs.has(a.slug)).slice(0, 6);
  const essentials = [...articles].filter((a) => a.essential).sort((a, b) => b.words - a.words).slice(0, 6);
  const topicStrip = ['cybersecurity', 'privacy', 'ethical-hacking', 'online-safety', 'phishing-social-engineering', 'password-security', 'social-media-security', 'malware', 'network-security'];

  const learn = [
    { i: 'hook', t: 'Recognise attacks early', d: 'Learn the patterns behind phishing, fake login pages and manipulation so convincing messages stop working on you.', href: '/category/phishing-social-engineering/' },
    { i: 'lock', t: 'Lock down your accounts', d: 'Strong passwords, password managers and two-factor authentication — set up properly, in the right order.', href: '/category/password-security/' },
    { i: 'eye', t: 'Take back your privacy', d: 'Reduce what platforms, data brokers and strangers can learn about you, without leaving the internet.', href: '/category/privacy/' },
    { i: 'terminal', t: 'Understand ethical hacking', d: 'How authorised security testing works, where the legal lines sit, and how professionals learn legally.', href: '/category/ethical-hacking/' },
    { i: 'radar', t: 'Respond with a plan', d: 'Calm, ordered steps for when an account is compromised, a device is lost, or something just feels wrong.', href: '/blog/what-to-do-if-account-hacked/' },
    { i: 'smartphone', t: 'Secure your devices', d: 'Practical protection for the phone in your pocket and the laptop on your desk, on any network.', href: '/category/online-safety/' },
  ];

  const content = `
<section class="hero">
  <div class="hero__bg" aria-hidden="true"><div class="hero__grid"></div><div class="hero__glow hero__glow--a"></div><div class="hero__glow hero__glow--b"></div></div>
  <div class="container hero__inner">
    <div class="hero__copy">
      <p class="eyebrow eyebrow--pill">${icon('shieldCheck', 'icon--sm')} Cybersecurity education</p>
      <h1 class="hero__title">Understand the threats. <em>Protect what matters.</em></h1>
      <p class="hero__lead">Practical, research-backed guides on phishing, account security, privacy and ethical hacking — written so you can recognise real attacks and know exactly what to do about them.</p>
      <div class="hero__actions">
        <a class="btn btn--primary btn--lg" href="/guides/">Explore security guides ${icon('arrowRight', 'icon--sm')}</a>
        <a class="btn btn--ghost btn--lg" href="/blog/">Browse latest articles</a>
      </div>
      <ul class="hero__trust">
        <li>${icon('book', 'icon--sm')} ${articles.length} in-depth guides</li>
        <li>${icon('shieldCheck', 'icon--sm')} Defensive &amp; educational</li>
        <li>${icon('refresh', 'icon--sm')} Reviewed when platforms change</li>
      </ul>
    </div>
    ${heroVisual()}
  </div>
</section>

<section class="topic-strip" aria-label="Main topics">
  <div class="container">
    <ul class="topic-strip__list">
      ${topicStrip
        .map((s) => categories.find((c) => c.slug === s))
        .map((c) => `<li><a href="/category/${c.slug}/">${C.catIcon(c, 'icon--sm')}${esc(c.name)}</a></li>`)
        .join('')}
    </ul>
  </div>
</section>

<section class="section" aria-labelledby="featured-title">
  <div class="container">
    <div class="section-head reveal">
      <div><p class="eyebrow">Featured</p><h2 id="featured-title" class="section-title">Start with the essentials</h2></div>
      <a class="text-link" href="/blog/">All articles ${icon('arrowRight', 'icon--sm')}</a>
    </div>
    <div class="featured-grid">
      ${featured.map((a, i) => C.articleCard(a, { variant: i === 0 ? 'feature' : 'stack', eager: i === 0 })).join('')}
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="latest-title">
  <div class="container">
    <div class="section-head reveal">
      <div><p class="eyebrow">Latest</p><h2 id="latest-title" class="section-title">Fresh from the briefing room</h2></div>
      <a class="text-link" href="/blog/">View the archive ${icon('arrowRight', 'icon--sm')}</a>
    </div>
    <div class="card-grid">${latest.map((a) => C.articleCard(a)).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="guides-title">
  <div class="container split">
    <div class="split__intro reveal">
      <p class="eyebrow">Long-form guides</p>
      <h2 id="guides-title" class="section-title">Our most comprehensive guides</h2>
      <p class="section-lead">Deep, structured explainers you can return to. Each one covers a topic end to end — how the threat works, how to spot it, and how to defend against it.</p>
      <a class="btn btn--ghost" href="/guides/">See learning paths ${icon('arrowRight', 'icon--sm')}</a>
    </div>
    <ol class="list">${essentials.map((a, i) => C.listItem(a, i + 1)).join('')}</ol>
  </div>
</section>

<section class="section section--tint" aria-labelledby="topics-title">
  <div class="container">
    <div class="section-head reveal">
      <div><p class="eyebrow">Topics</p><h2 id="topics-title" class="section-title">Explore by subject</h2></div>
      <a class="text-link" href="/categories/">All categories ${icon('arrowRight', 'icon--sm')}</a>
    </div>
    <div class="cat-grid">${categories.map((c) => C.categoryCard(c, catCount[c.slug])).join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="ahead-title">
  <div class="container">
    <div class="ahead reveal">
      <div class="ahead__copy">
        <p class="eyebrow">Stay ahead of threats</p>
        <h2 id="ahead-title" class="ahead__title">Attackers rely on you being in a hurry. <em>We help you slow down.</em></h2>
        <p>Almost every account takeover we write about starts the same way: a message that creates pressure, a link that looks almost right, a password that was used somewhere else. Knowing the pattern is most of the defence.</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="/blog/how-phishing-attacks-work/">Learn how phishing works ${icon('arrowRight', 'icon--sm')}</a>
          <a class="btn btn--ghost" href="/blog/cybersecurity-checklist-for-beginners/">Get the beginner checklist</a>
        </div>
      </div>
      <div class="ahead__stack" aria-hidden="true">
        <div class="stack-card stack-card--1"><span class="stack-card__tag stack-card__tag--warn">${icon('alert', 'icon--xs')} Urgent</span><strong>“Your account will be disabled in 24 hours”</strong><small>Pressure is the oldest trick there is.</small></div>
        <div class="stack-card stack-card--2"><span class="stack-card__tag">${icon('link', 'icon--xs')} Check the domain</span><strong>login.instagram.com.verify-help.co</strong><small>Read it from the right: this page lives on verify-help.co, not Instagram.</small></div>
        <div class="stack-card stack-card--3"><span class="stack-card__tag stack-card__tag--ok">${icon('shieldCheck', 'icon--xs')} Protected</span><strong>Passkey or authenticator required</strong><small>A stolen password alone is no longer enough.</small></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="learn-title">
  <div class="container">
    <div class="section-head section-head--center reveal">
      <div><p class="eyebrow">What you will learn</p><h2 id="learn-title" class="section-title">Security knowledge that holds up in real life</h2>
      <p class="section-lead">No fear-mongering and no jargon for its own sake. Just the understanding you need to make good decisions online.</p></div>
    </div>
    <div class="learn-grid">
      ${learn
        .map(
          (l) =>
            `<a class="learn-card reveal" href="${l.href}"><span class="learn-card__icon">${icon(l.i)}</span><h3>${esc(l.t)}</h3><p>${esc(l.d)}</p><span class="text-link">Explore ${icon('arrowRight', 'icon--sm')}</span></a>`
        )
        .join('')}
    </div>
  </div>
</section>

${C.newsletterSection('home')}

<section class="section" aria-labelledby="home-faq">
  <div class="container container--narrow">
    ${C.faqBlock(HOME_FAQ.map((f) => ({ q: f.q, answerText: f.a, answerHtml: `<p>${esc(f.a)}${f.link ? ` <a href="${f.link}">Read more</a>.` : ''}</p>` })), 'Questions readers ask us', 'home-faq')}
  </div>
</section>

${C.ctaBand({
  title: 'Explore the <em>cybersecurity library</em>',
  text: `${articles.length} in-depth articles across ${categories.length} topics, all written for defenders.`,
  primary: { href: '/blog/', label: 'Browse all articles' },
  secondary: { href: '/categories/', label: 'View categories' },
})}`;

  return {
    path: '/',
    title: site.name,
    description: site.description,
    bodyClass: 'page-home',
    jsonld: [orgSchema(site), websiteSchema(site), C.faqSchema(HOME_FAQ.map((f) => ({ q: f.q, answerText: f.a })))],
    content,
  };
}

/* ================================================================ Blog listing */
function blogPage(g, pageNum, totalPages, pageArticles) {
  const { site, articles, categories } = g;
  const path = pageNum === 1 ? '/blog/' : `/blog/page/${pageNum}/`;
  const featured = articles.find((a) => a.featured);
  const picks = articles.filter((a) => a.essential).slice(0, 5);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog/' }];
  if (pageNum > 1) crumbs.push({ name: `Page ${pageNum}`, path });

  const filters = `<div class="filters" role="navigation" aria-label="Filter by category">
    <a class="filter is-active" href="/blog/" aria-current="page">All</a>
    ${categories.map((c) => `<a class="filter" href="/category/${c.slug}/">${esc(c.name)}</a>`).join('')}
  </div>`;

  const content = `
${C.pageHero({
  eyebrow: 'The archive',
  title: pageNum === 1 ? 'Cybersecurity articles &amp; explainers' : `Articles — page ${pageNum} of ${totalPages}`,
  lead: 'Defensive security guides, threat explainers and step-by-step tutorials. Filter by topic or search the whole library.',
  crumbs,
  extra: `<form class="inline-search" action="/search/" method="get" role="search"><label class="sr-only" for="q-blog">Search articles</label>${icon('search')}<input id="q-blog" name="q" type="search" placeholder="Search by title, keyword or topic" maxlength="80" autocomplete="off"><button class="btn btn--primary btn--sm" type="submit">Search</button></form>`,
})}
<section class="section section--tight">
  <div class="container">
    ${filters}
    ${pageNum === 1 && featured ? `<div class="blog-feature">${C.articleCard(featured, { variant: 'wide', h: 'h2', eager: true })}</div>` : ''}
    <div class="blog-layout">
      <div>
        <h2 class="section-title section-title--sm">${pageNum === 1 ? 'Latest articles' : 'More articles'}</h2>
        <div class="card-grid card-grid--2">${pageArticles.map((a) => C.articleCard(a)).join('')}</div>
        ${C.pagination(pageNum, totalPages, '/blog/')}
      </div>
      <aside class="sidebar" aria-label="Editor’s picks and topics">
        <div class="sidebar__box">
          <h2 class="sidebar__title">Editor’s picks</h2>
          <ol class="mini-list">${picks.map((a, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><a href="${a.url}">${esc(a.title)}</a></li>`).join('')}</ol>
        </div>
        <div class="sidebar__box">
          <h2 class="sidebar__title">Topics</h2>
          <ul class="tag-cloud">${categories.map((c) => `<li><a href="/category/${c.slug}/">${esc(c.name)} <span>${g.catCount[c.slug]}</span></a></li>`).join('')}</ul>
        </div>
        <div class="sidebar__box sidebar__box--accent">
          <h2 class="sidebar__title">Weekly briefing</h2>
          <p>Practical security guidance in your inbox.</p>
          ${C.newsletterForm('sidebar')}
        </div>
      </aside>
    </div>
  </div>
</section>`;

  return {
    path,
    title: pageNum === 1 ? 'Cybersecurity Articles & Explainers' : `Cybersecurity Articles — Page ${pageNum}`,
    description:
      pageNum === 1
        ? 'Browse every Bastion Brief article: phishing awareness, account and password security, privacy, malware, network security and ethical hacking explainers.'
        : `Page ${pageNum} of the Bastion Brief archive of defensive cybersecurity articles and guides.`,
    jsonld: [C.breadcrumbSchema(crumbs, site.url), itemListSchema(site, pageArticles, 'Bastion Brief articles')],
    content,
  };
}

/* ================================================================ Categories */
function categoriesIndex(g) {
  const { site, categories, catCount, articles } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Categories', path: '/categories/' }];
  const blocks = categories
    .map((c) => {
      const list = articles.filter((a) => a.allCategories.includes(c.slug)).slice(0, 3);
      return `<article class="cat-row reveal" data-cat="${c.slug}">
  <div class="cat-row__head"><span class="cat-card__icon">${C.catIcon(c)}</span><div><h2><a href="/category/${c.slug}/">${esc(c.name)}</a></h2><p>${esc(c.description)}</p></div></div>
  <ul class="cat-row__list">${list.map((a) => `<li><a href="${a.url}">${esc(a.title)}</a><span>${a.readingTime} min</span></li>`).join('')}</ul>
  <a class="text-link" href="/category/${c.slug}/">All ${catCount[c.slug]} ${esc(c.name)} articles ${icon('arrowRight', 'icon--sm')}</a>
</article>`;
    })
    .join('');
  return {
    path: '/categories/',
    title: 'Cybersecurity Topics & Categories',
    description: 'Browse Bastion Brief by topic: cybersecurity basics, ethical hacking, social media security, privacy, phishing, malware, network and password security.',
    jsonld: [C.breadcrumbSchema(crumbs, site.url)],
    content: `${C.pageHero({ eyebrow: 'Topics', title: 'Every topic we cover', lead: `${categories.length} categories, from first principles to hands-on tutorials. Pick a subject and go as deep as you like.`, crumbs })}
<section class="section section--tight"><div class="container"><div class="cat-rows">${blocks}</div></div></section>
${C.newsletterSection('cats')}`,
  };
}

function categoryPage(g, cat) {
  const { site, categories, articles, catCount } = g;
  const list = articles.filter((a) => a.allCategories.includes(cat.slug));
  const path = `/category/${cat.slug}/`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Categories', path: '/categories/' }, { name: cat.name, path }];
  const others = categories.filter((c) => c.slug !== cat.slug).slice(0, 4);
  return {
    path,
    title: `${cat.name} Guides & Articles`,
    description: `${cat.description} ${list.length} defensive, beginner-friendly ${list.length === 1 ? 'guide' : 'guides'} from Bastion Brief.`,
    jsonld: [
      C.breadcrumbSchema(crumbs, site.url),
      { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${cat.name} — ${site.name}`, description: cat.description, url: site.url + path },
      itemListSchema(site, list, `${cat.name} articles`),
    ],
    content: `${C.pageHero({
      eyebrow: `${C.catIcon(cat, 'icon--sm')} Category`,
      title: esc(cat.name),
      lead: esc(cat.intro),
      crumbs,
      cls: 'page-hero--cat',
      extra: `<p class="page-hero__meta">${list.length} ${list.length === 1 ? 'article' : 'articles'} · ${list.reduce((s, a) => s + a.readingTime, 0)} minutes of reading</p>`,
    })}
<section class="section section--tight" data-cat="${cat.slug}">
  <div class="container">
    <div class="filters" role="navigation" aria-label="Filter by category">
      <a class="filter" href="/blog/">All</a>
      ${categories.map((c) => `<a class="filter${c.slug === cat.slug ? ' is-active" aria-current="page' : ''}" href="/category/${c.slug}/">${esc(c.name)}</a>`).join('')}
    </div>
    <div class="card-grid">${list.map((a, i) => C.articleCard(a, { h: 'h2', eager: i < 2 })).join('')}</div>
  </div>
</section>
<section class="section section--tint" aria-labelledby="other-cats">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">Keep exploring</p><h2 id="other-cats" class="section-title">Related topics</h2></div></div>
    <div class="cat-grid cat-grid--4">${others.map((c) => C.categoryCard(c, catCount[c.slug])).join('')}</div>
  </div>
</section>
${C.newsletterSection('cat')}`,
  };
}

/* ================================================================ Article */
function articlePage(g, a) {
  const { site, authors } = g;
  const author = authors.find((x) => x.slug === a.author);
  const cat = a.categoryObj;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/blog/' },
    { name: cat.name, path: `/category/${cat.slug}/` },
    { name: a.title, path: a.url },
  ];
  const fullUrl = site.url + a.url;
  const updated = a.updated !== a.date;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': fullUrl + '#article',
    headline: a.title,
    description: a.description,
    image: [site.url + a.ogImage],
    datePublished: `${a.date}T08:00:00Z`,
    dateModified: `${a.updated}T08:00:00Z`,
    author: { '@type': author.type || 'Person', name: author.name, url: `${site.url}/author/${author.slug}/` },
    publisher: { '@id': site.url + '/#organization' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    articleSection: cat.name,
    keywords: a.tags.join(', '),
    wordCount: a.words,
    timeRequired: `PT${a.readingTime}M`,
    inLanguage: site.lang,
    isAccessibleForFree: true,
  };
  const jsonld = [C.breadcrumbSchema(crumbs, site.url), schema, orgSchema(site)];
  if (a.faq.length) jsonld.push(C.faqSchema(a.faq));

  const tocHtml = C.toc(a.headings);
  const content = `
<div class="progress" aria-hidden="true"><span data-progress></span></div>
<article class="article" data-cat="${cat.slug}">
  <header class="article__header">
    <div class="article__bg" aria-hidden="true"></div>
    <div class="container container--article">
      ${C.breadcrumbs(crumbs)}
      <a class="badge" href="/category/${cat.slug}/">${C.catIcon(cat, 'icon--xs')} ${esc(cat.name)}</a>
      <h1 class="article__title">${esc(a.title)}</h1>
      <p class="article__dek">${esc(a.intro || a.description)}</p>
      <div class="article__meta">
        <a class="byline" href="/author/${author.slug}/">${C.avatar(author)}<span><small>By</small> ${esc(author.name)}</span></a>
        <span class="meta-item">${icon('calendar', 'icon--sm')} <span><small>Published</small> <time datetime="${a.date}">${C.fmtDate(a.date, true)}</time></span></span>
        ${updated ? `<span class="meta-item">${icon('refresh', 'icon--sm')} <span><small>Updated</small> <time datetime="${a.updated}">${C.fmtDate(a.updated, true)}</time></span></span>` : ''}
        <span class="meta-item">${icon('clock', 'icon--sm')} <span><small>Reading time</small> ${a.readingTime} min</span></span>
      </div>
    </div>
  </header>
  <div class="container container--article">
    <figure class="article__hero">
      <img src="${a.image}" alt="${esc(a.imageAlt)}" width="1200" height="675" fetchpriority="high" decoding="async">
    </figure>
  </div>
  <div class="container article__layout">
    <aside class="article__aside">
      ${tocHtml ? `<details class="toc-mobile"><summary>${icon('layers', 'icon--sm')} Table of contents</summary>${tocHtml}</details><div class="toc-desktop">${tocHtml}</div>` : ''}
      <div class="article__aside-share">${C.shareButtons(fullUrl, a.title)}</div>
    </aside>
    <div class="article__main">
      <div class="prose" data-prose>
        ${a.html}
      </div>
      ${C.faqBlock(a.faq)}
      <aside class="edu-note" aria-label="Educational purpose">
        ${icon('shieldCheck')}
        <p><strong>Educational purpose.</strong> This article is published for defensive security education. It describes threats so readers can recognise and prevent them, and does not provide instructions for unauthorised access. See our <a href="/disclaimer/">disclaimer</a>.</p>
      </aside>
      <div class="article__foot">
        <ul class="tags" aria-label="Tags">${a.tags.map((t) => `<li><a href="/search/?q=${encodeURIComponent(t)}">#${esc(t)}</a></li>`).join('')}</ul>
        ${C.shareButtons(fullUrl, a.title)}
      </div>
      ${C.authorBox(author)}
      <nav class="post-nav" aria-label="More articles">
        ${a.prev ? `<a class="post-nav__link" href="${a.prev.url}" rel="prev"><small>${icon('arrowLeft', 'icon--sm')} Previous article</small><span>${esc(a.prev.title)}</span></a>` : '<span></span>'}
        ${a.next ? `<a class="post-nav__link post-nav__link--next" href="${a.next.url}" rel="next"><small>Next article ${icon('arrowRight', 'icon--sm')}</small><span>${esc(a.next.title)}</span></a>` : '<span></span>'}
      </nav>
    </div>
  </div>
</article>
<section class="section section--tint" aria-labelledby="related-title">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">Keep reading</p><h2 id="related-title" class="section-title">Related articles</h2></div><a class="text-link" href="/category/${cat.slug}/">More in ${esc(cat.name)} ${icon('arrowRight', 'icon--sm')}</a></div>
    <div class="card-grid">${a.related.map((r) => C.articleCard(r)).join('')}</div>
  </div>
</section>
${C.newsletterSection('article')}`;

  return {
    path: a.url,
    title: a.seoTitle || a.title,
    ogTitle: a.title,
    description: a.description,
    ogImage: a.ogImage,
    article: a,
    bodyClass: 'page-article',
    jsonld,
    content,
  };
}

/* ================================================================ Author */
function authorPage(g, author) {
  const { site, articles } = g;
  const list = articles.filter((a) => a.author === author.slug);
  const path = `/author/${author.slug}/`;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Authors', path: '/about/' }, { name: author.name, path }];
  return {
    path,
    title: `${author.name} — Author Profile`,
    description: `${author.bio}`,
    jsonld: [
      C.breadcrumbSchema(crumbs, site.url),
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: { '@type': author.type || 'Person', name: author.name, description: author.bio, url: site.url + path, knowsAbout: author.focus },
      },
    ],
    content: `
<section class="page-hero page-hero--author">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container">
    ${C.breadcrumbs(crumbs)}
    <div class="author-hero">
      ${C.avatar(author, 'xl')}
      <div>
        <p class="eyebrow">${esc(author.role)}</p>
        <h1 class="page-hero__title">${esc(author.name)}</h1>
        <p class="page-hero__lead">${esc(author.bio)}</p>
        <ul class="pill-list">${author.focus.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>
</section>
<section class="section section--tight">
  <div class="container split split--author">
    <div class="prose prose--compact reveal">
      <h2>About the desk</h2>
      ${author.longBio.map((p) => `<p>${esc(p)}</p>`).join('')}
      <p><a href="/editorial-policy/">Read our full editorial policy</a> or <a href="/contact/">get in touch</a> with corrections and suggestions.</p>
    </div>
    <div class="stat-panel reveal">
      <div><strong>${list.length}</strong><span>Articles published</span></div>
      <div><strong>${Math.round(list.reduce((s, a) => s + a.words, 0) / 1000)}k</strong><span>Words of guidance</span></div>
      <div><strong>${new Set(list.flatMap((a) => a.allCategories)).size}</strong><span>Topics covered</span></div>
    </div>
  </div>
</section>
<section class="section section--tint" aria-labelledby="author-articles">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">Archive</p><h2 id="author-articles" class="section-title">All articles</h2></div></div>
    <div class="card-grid">${list.map((a) => C.articleCard(a)).join('')}</div>
  </div>
</section>`,
  };
}

/* ================================================================ Search */
function searchPage(g) {
  const { site, categories } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Search', path: '/search/' }];
  return {
    path: '/search/',
    title: 'Search Articles',
    description: 'Search every Bastion Brief guide by title, keyword, category or topic.',
    noindex: true,
    jsonld: [C.breadcrumbSchema(crumbs, site.url)],
    content: `${C.pageHero({
      eyebrow: 'Search',
      title: 'Search the library',
      lead: 'Find guides by title, keyword, category or topic.',
      crumbs,
      extra: `<form class="inline-search inline-search--lg" action="/search/" method="get" role="search" data-search-page-form><label class="sr-only" for="q-page">Search articles</label>${icon('search')}<input id="q-page" name="q" type="search" placeholder="e.g. phishing, two-factor, Instagram" maxlength="80" autocomplete="off" spellcheck="false" data-search-page-input><button class="btn btn--primary" type="submit">Search</button></form>`,
    })}
<section class="section section--tight">
  <div class="container">
    <p class="search-summary" data-search-summary role="status" aria-live="polite"></p>
    <div class="card-grid" data-search-page-results></div>
    <div class="empty-state" data-search-empty hidden>
      <span class="empty-state__icon">${icon('search')}</span>
      <h2>No articles matched that search</h2>
      <p>Try a broader word, check the spelling, or browse a topic below.</p>
      <div class="chips chips--center">${categories.map((c) => `<a class="chip-link" href="/category/${c.slug}/">${esc(c.name)}</a>`).join('')}</div>
    </div>
    <div class="search-start" data-search-start>
      <h2 class="section-title section-title--sm">Popular searches</h2>
      <div class="chips">${['phishing', 'instagram', 'facebook', 'two-factor authentication', 'password manager', 'malware', 'public wi-fi', 'privacy', 'ethical hacking', 'penetration testing', 'hacked account', 'fake login page']
        .map((q) => `<a class="chip-link" href="/search/?q=${encodeURIComponent(q)}">${esc(q)}</a>`)
        .join('')}</div>
    </div>
    <noscript><p class="notice">Search needs JavaScript. You can still <a href="/blog/">browse all articles</a> or <a href="/categories/">explore by category</a>.</p></noscript>
  </div>
</section>`,
  };
}

/* ================================================================ Contact */
function contactPage(g) {
  const { site } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  const field = (id, label, input, hint = '') =>
    `<div class="field"><label for="${id}">${label} <span class="req" aria-hidden="true">*</span></label>${input}${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}<p class="field__error" id="${id}-error" aria-live="polite"></p></div>`;
  return {
    path: '/contact/',
    title: 'Contact Bastion Brief',
    description: 'Contact the Bastion Brief editorial team with corrections, topic suggestions or general questions about our cybersecurity guides.',
    jsonld: [C.breadcrumbSchema(crumbs, site.url), { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Bastion Brief', url: site.url + '/contact/' }],
    content: `${C.pageHero({ eyebrow: 'Contact', title: 'Get in touch', lead: 'Spotted something out of date, have a topic you want explained, or a question about one of our guides? We read every message.', crumbs })}
<section class="section section--tight">
  <div class="container contact">
    <div class="contact__form-wrap reveal">
      <form class="form" data-contact-form data-endpoint="${esc(site.forms.contactEndpoint)}" novalidate>
        <div class="form__row">
          ${field('c-name', 'Name', '<input class="input" id="c-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="100" aria-describedby="c-name-error">')}
          ${field('c-email', 'Email', '<input class="input" id="c-email" name="email" type="email" inputmode="email" autocomplete="email" required maxlength="254" aria-describedby="c-email-error">')}
        </div>
        ${field(
          'c-subject',
          'Subject',
          `<select class="input" id="c-subject" name="subject" required aria-describedby="c-subject-error"><option value="">Choose a subject</option><option>Correction or update to an article</option><option>Topic suggestion</option><option>Question about a guide</option><option>Accessibility issue</option><option>Something else</option></select>`
        )}
        ${field(
          'c-message',
          'Message',
          '<textarea class="input" id="c-message" name="message" rows="7" required minlength="20" maxlength="4000" aria-describedby="c-message-hint c-message-error" data-counter></textarea>',
          '<span data-counter-out>0</span> / 4000 characters · minimum 20'
        )}
        <div class="field field--check">
          <input type="checkbox" id="c-consent" name="consent" required aria-describedby="c-consent-error">
          <label for="c-consent">I understand my name, email and message will be used only to reply to this enquiry, as described in the <a href="/privacy-policy/">privacy policy</a>.</label>
          <p class="field__error" id="c-consent-error" aria-live="polite"></p>
        </div>
        <div class="hp-field" aria-hidden="true"><label for="c-website">Leave this field empty</label><input type="text" id="c-website" name="website" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="started" value="">
        <div class="alert" data-form-alert role="alert" hidden></div>
        <button class="btn btn--primary btn--lg" type="submit" data-submit><span>Send message</span>${icon('arrowRight', 'icon--sm')}</button>
        <p class="form__note">${icon('alert', 'icon--sm')} Please never send passwords, recovery codes or other sensitive account details. We will never ask for them.</p>
      </form>
    </div>
    <aside class="contact__aside reveal">
      <div class="info-card">
        <h2>${icon('book', 'icon--sm')} Corrections</h2>
        <p>Platforms change their settings and recovery flows often. If a step in one of our guides no longer matches what you see, tell us which article and what changed.</p>
      </div>
      <div class="info-card">
        <h2>${icon('sparkle', 'icon--sm')} Topic suggestions</h2>
        <p>We prioritise topics readers ask for. Explain the situation you want to understand and we will consider it for a future guide.</p>
      </div>
      <div class="info-card info-card--warn">
        <h2>${icon('alert', 'icon--sm')} Need help with a hacked account?</h2>
        <p>We cannot access or recover accounts on your behalf, and anyone online offering to “hack back” your account is very likely a scammer. Follow our <a href="/blog/what-to-do-if-account-hacked/">account recovery guide</a> and use the platform’s official recovery process.</p>
      </div>
      ${site.contactEmail ? `<div class="info-card"><h2>${icon('mail', 'icon--sm')} Email</h2><p><a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></p></div>` : ''}
    </aside>
  </div>
</section>`,
  };
}

/* ================================================================ Guides / resources */
const PATHS = [
  {
    title: 'Lock down your accounts',
    icon: 'lock',
    text: 'The five-step foundation that stops the majority of account takeovers. Do these in order.',
    slugs: ['how-to-create-strong-passwords', 'password-managers-explained', 'two-factor-authentication-explained', 'secure-instagram-account', 'cybersecurity-checklist-for-beginners'],
  },
  {
    title: 'Spot and stop phishing',
    icon: 'hook',
    text: 'Train your eye for manipulative messages, lookalike domains and fake login pages.',
    slugs: ['how-phishing-attacks-work', 'social-engineering-explained', 'how-to-identify-fake-login-page', 'common-cybersecurity-mistakes'],
  },
  {
    title: 'Social media safety',
    icon: 'chat',
    text: 'How Instagram and Facebook accounts are targeted, and how to protect — or recover — yours.',
    slugs: ['how-hackers-target-instagram-accounts', 'how-facebook-accounts-get-compromised', 'secure-instagram-account', 'recover-hacked-facebook-account'],
  },
  {
    title: 'When something goes wrong',
    icon: 'radar',
    text: 'A calm, ordered response for compromised accounts and infected devices.',
    slugs: ['what-to-do-if-account-hacked', 'recover-hacked-facebook-account', 'malware-explained'],
  },
  {
    title: 'Privacy and everyday devices',
    icon: 'smartphone',
    text: 'Reduce your data footprint and protect the devices and networks you use every day.',
    slugs: ['improve-online-privacy', 'protect-smartphone-from-cyber-threats', 'public-wifi-risks'],
  },
  {
    title: 'Getting started in ethical hacking',
    icon: 'terminal',
    text: 'What the profession involves, where the legal lines are, and how authorised testing works.',
    slugs: ['what-is-ethical-hacking', 'ethical-hacking-vs-black-hat-hacking', 'what-is-penetration-testing'],
  },
];

const EXTERNAL = [
  { name: 'CISA — Secure Our World', url: 'https://www.cisa.gov/secure-our-world', d: 'US Cybersecurity and Infrastructure Security Agency guidance for individuals and families.' },
  { name: 'NCSC — Cyber Aware', url: 'https://www.ncsc.gov.uk/cyberaware/home', d: 'The UK National Cyber Security Centre’s practical advice for staying secure online.' },
  { name: 'EFF — Surveillance Self-Defense', url: 'https://ssd.eff.org/', d: 'The Electronic Frontier Foundation’s guides to privacy, threat modelling and safer communication.' },
  { name: 'Have I Been Pwned', url: 'https://haveibeenpwned.com/', d: 'Check whether your email address has appeared in a known data breach.' },
  { name: 'OWASP', url: 'https://owasp.org/', d: 'Open, community-led resources on web application security, including the OWASP Top 10.' },
  { name: 'NIST Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-4/', d: 'The US standard behind modern password and authentication recommendations (SP 800-63).' },
  { name: 'FIDO Alliance — Passkeys', url: 'https://fidoalliance.org/passkeys/', d: 'The industry body’s explanation of passkeys and phishing-resistant sign-in.' },
  { name: 'Anti-Phishing Working Group', url: 'https://apwg.org/', d: 'Industry coalition tracking phishing trends; includes reporting guidance.' },
];

const GLOSSARY = [
  ['Two-factor authentication (2FA)', 'Signing in with something you know (a password) plus something you have or are (a phone, a security key, a fingerprint).'],
  ['Passkey', 'A phishing-resistant replacement for passwords based on public-key cryptography, stored on your device or password manager.'],
  ['Phishing', 'A message designed to trick you into revealing information, clicking a malicious link or sending money, usually by impersonating someone trusted.'],
  ['Social engineering', 'Manipulating people, rather than technology, into breaking normal security practices.'],
  ['Credential stuffing', 'Automated attempts to log in to many sites using usernames and passwords leaked from another breach.'],
  ['SIM swap', 'A fraud in which a criminal convinces a mobile carrier to move your phone number to a SIM card they control.'],
  ['Infostealer', 'Malware that quietly collects saved passwords, browser cookies and other data, then sends it to an attacker.'],
  ['Ransomware', 'Malware that encrypts or steals data and demands payment to restore access or prevent publication.'],
  ['Penetration test', 'An authorised, scoped simulation of an attack, performed to find and fix weaknesses before criminals exploit them.'],
  ['Vulnerability disclosure', 'The process of reporting a security weakness to the organisation responsible so it can be fixed.'],
  ['Evil twin', 'A rogue Wi-Fi access point set up to imitate a legitimate network.'],
  ['Data broker', 'A company that collects personal information from many sources and sells or licenses it to others.'],
];

function guidesPage(g) {
  const { site, bySlug } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides/' }];
  const paths = PATHS.map((p) => ({ ...p, slugs: p.slugs.filter((s) => bySlug[s]) })).filter((p) => p.slugs.length).map(
    (p, idx) => `<article class="path reveal">
  <div class="path__head"><span class="path__icon">${icon(p.icon)}</span><div><p class="path__num">Path ${String(idx + 1).padStart(2, '0')} · ${p.slugs.length} guides · ${p.slugs.reduce((s, x) => s + bySlug[x].readingTime, 0)} min</p><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div></div>
  <ol class="path__steps">${p.slugs
    .map((s) => bySlug[s])
    .map((a) => `<li><a href="${a.url}"><span>${esc(a.title)}</span><small>${a.readingTime} min</small></a></li>`)
    .join('')}</ol>
</article>`
  ).join('');

  return {
    path: '/guides/',
    title: 'Cybersecurity Guides & Learning Paths',
    description: 'Structured cybersecurity learning paths: secure your accounts, spot phishing, protect social media, respond to incidents and start learning ethical hacking legally.',
    jsonld: [C.breadcrumbSchema(crumbs, site.url)],
    content: `${C.pageHero({ eyebrow: 'Resources', title: 'Guides &amp; <em>learning paths</em>', lead: 'Curated reading orders that take you from “I should probably do something about this” to genuinely well protected. Each path builds on the last.', crumbs })}
<section class="section section--tight" aria-labelledby="paths-title">
  <div class="container">
    <h2 id="paths-title" class="sr-only">Learning paths</h2>
    <div class="paths">${paths}</div>
  </div>
</section>
<section class="section section--tint" aria-labelledby="glossary-title">
  <div class="container split">
    <div class="split__intro reveal">
      <p class="eyebrow">Glossary</p>
      <h2 id="glossary-title" class="section-title">Security terms, in plain English</h2>
      <p class="section-lead">The vocabulary you will meet most often in our guides and in security news.</p>
    </div>
    <dl class="glossary reveal">${GLOSSARY.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
  </div>
</section>
<section class="section" aria-labelledby="ext-title">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">Trusted external resources</p><h2 id="ext-title" class="section-title">Where we look things up</h2><p class="section-lead">Independent, authoritative sources we rely on in our own research. These links open in a new tab.</p></div></div>
    <div class="ext-grid">${EXTERNAL.map((e) => `<a class="ext-card reveal" href="${e.url}" target="_blank" rel="noopener noreferrer"><strong>${esc(e.name)} ${icon('arrowUpRight', 'icon--sm')}</strong><span>${esc(e.d)}</span><small>${esc(new URL(e.url).hostname.replace(/^www\./, ''))}</small></a>`).join('')}</div>
  </div>
</section>
${C.newsletterSection('guides')}`,
  };
}

/* ================================================================ Newsletter page */
function newsletterPage(g) {
  const { site, articles } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Newsletter', path: '/newsletter/' }];
  return {
    path: '/newsletter/',
    title: 'Subscribe to the Bastion Briefing',
    description: 'Get practical cybersecurity guides, privacy tips and security explainers from Bastion Brief delivered to your inbox.',
    jsonld: [C.breadcrumbSchema(crumbs, site.url)],
    content: `${C.pageHero({ eyebrow: 'Newsletter', title: 'The Bastion <em>Briefing</em>', lead: 'A considered email with our newest guides and the security changes worth knowing about. Written for people, not algorithms.', crumbs })}
${C.newsletterSection('page')}
<section class="section section--tight">
  <div class="container">
    <div class="feature-row">
      <div class="feature reveal">${icon('book')}<h2>New guides first</h2><p>Each new long-form guide, with a short summary of why it matters.</p></div>
      <div class="feature reveal">${icon('refresh')}<h2>What changed</h2><p>When a platform changes its security settings or recovery process, we tell you what to update.</p></div>
      <div class="feature reveal">${icon('lock')}<h2>Privacy respected</h2><p>Your email is used for the newsletter only. No selling, no sharing, one-click unsubscribe.</p></div>
    </div>
  </div>
</section>
<section class="section section--tint" aria-labelledby="nl-recent">
  <div class="container">
    <div class="section-head reveal"><div><p class="eyebrow">A taste of what we publish</p><h2 id="nl-recent" class="section-title">Recent guides</h2></div></div>
    <div class="card-grid">${articles.slice(0, 3).map((a) => C.articleCard(a)).join('')}</div>
  </div>
</section>`,
  };
}

/* ================================================================ Markdown pages (about, legal) */
function mdPage(g, page) {
  const { site } = g;
  const crumbs = [{ name: 'Home', path: '/' }, { name: page.data.title, path: page.path }];
  const isLegal = page.data.template === 'legal';
  const tocHtml = C.toc(page.headings);
  return {
    path: page.path,
    title: page.data.seoTitle || page.data.title,
    description: page.data.description,
    jsonld: [C.breadcrumbSchema(crumbs, site.url)],
    content: `${C.pageHero({
      eyebrow: page.data.eyebrow || (isLegal ? 'Legal' : ''),
      title: page.data.heading || esc(page.data.title),
      lead: page.data.lead ? esc(page.data.lead) : '',
      crumbs,
      extra: page.data.updated ? `<p class="page-hero__meta">${icon('refresh', 'icon--sm')} Last updated <time datetime="${page.data.updated}">${C.fmtDate(page.data.updated, true)}</time></p>` : '',
    })}
<section class="section section--tight">
  <div class="container doc-layout">
    ${tocHtml ? `<aside class="doc-layout__aside"><div class="toc-desktop">${tocHtml}</div></aside>` : ''}
    <div class="prose${isLegal ? ' prose--legal' : ''}">
      ${isLegal ? `<aside class="callout callout--note" aria-label="Template notice"><div class="callout__head">${icon('alert')}<strong>Template notice</strong></div><div class="callout__body"><p>This page is a starter template provided with the website. It has not been reviewed by a lawyer and does not name a legal entity, address or jurisdiction. The site owner must review and adapt it to their actual business, location and legal obligations before relying on it.</p></div></aside>` : ''}
      ${page.html}
    </div>
  </div>
</section>
${page.data.cta === false ? '' : C.ctaBand({ title: 'Explore the <em>cybersecurity library</em>', text: 'Defensive, practical guides for everyday security.', primary: { href: '/blog/', label: 'Browse articles' }, secondary: { href: '/guides/', label: 'Learning paths' } })}`,
  };
}

/* ================================================================ 404 */
function notFound(g) {
  const { articles } = g;
  return {
    path: '/404.html',
    title: 'Page not found',
    description: 'The page you were looking for could not be found.',
    noindex: true,
    content: `<section class="not-found">
  <div class="page-hero__bg" aria-hidden="true"></div>
  <div class="container container--narrow">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="page-hero__title">This page is <em>off the map</em></h1>
    <p class="page-hero__lead">The link may be outdated or mistyped. If you followed a link from an unexpected message, that is worth noticing too — check the address before entering anything.</p>
    <form class="inline-search inline-search--lg" action="/search/" method="get" role="search"><label class="sr-only" for="q-404">Search articles</label>${icon('search')}<input id="q-404" name="q" type="search" placeholder="Search the library" maxlength="80" autocomplete="off"><button class="btn btn--primary" type="submit">Search</button></form>
    <div class="hero__actions hero__actions--center"><a class="btn btn--ghost" href="/">Back to home</a><a class="btn btn--ghost" href="/blog/">All articles</a></div>
  </div>
</section>
<section class="section section--tint"><div class="container"><div class="section-head"><div><h2 class="section-title section-title--sm">Popular starting points</h2></div></div><div class="card-grid">${articles.filter((a) => a.essential).slice(0, 3).map((a) => C.articleCard(a)).join('')}</div></div></section>`,
  };
}

module.exports = {
  home,
  blogPage,
  categoriesIndex,
  categoryPage,
  articlePage,
  authorPage,
  searchPage,
  contactPage,
  guidesPage,
  newsletterPage,
  mdPage,
  notFound,
  orgSchema,
};
