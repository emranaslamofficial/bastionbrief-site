# Bastion Brief

**Defensive cybersecurity, clearly explained.**

Bastion Brief is a complete, production-ready cybersecurity education publication: 48 pages,
20 long-form articles (~33,000 words), working search, contact and newsletter forms ready for
integration, full technical SEO and a premium dark design system. It is built with a small,
dependency-free Node.js static site generator, so it is fast, secure and cheap to host anywhere.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Project structure](#2-project-structure)
3. [Brand identity](#3-brand-identity)
4. [Adding and editing articles](#4-adding-and-editing-articles)
5. [Connecting the forms](#5-connecting-the-contact-and-newsletter-forms)
6. [Deployment](#6-deployment)
7. [SEO checklist](#7-seo-checklist)
8. [Security](#8-security)
9. [Final testing report](#9-final-testing-report)
10. [Known limitations and next steps](#10-known-limitations-and-next-steps)

---

## 1. Quick start

Requirements: **Node.js 18 or newer**. There are no npm dependencies to install.

```bash
npm run dev          # build + local preview at http://localhost:4321, rebuilds on change
npm run build        # production build into ./dist
npm run stats        # build and print word count / reading time per article
npm run images       # re-render PNG icons + Open Graph images (needs Chrome or Edge), then build
```

`dist/` is the complete website. Upload it to any static host.

> Run only one build at a time. `npm run dev` already rebuilds on every change; running
> `npm run build` in a second terminal at the same moment can collide on Windows file locks.

## 2. Project structure

```
build.js                  Static site generator: renders pages, sitemap, RSS, search index, link check
content/
  site.js                 Brand name, domain, form endpoints, social links  ← edit this first
  categories.js           Category taxonomy (name, description, colours, illustration motif)
  authors.js              Author profiles
  articles/*.md           One Markdown file per article (front matter + body)
  pages/*.md              About, editorial policy and legal pages
lib/
  markdown.js             Safe Markdown renderer with callouts, checklists, flow diagrams, FAQ
  components.js           Reusable UI: layout, header, footer, cards, newsletter, TOC, FAQ, share…
  pages.js                Page templates: home, blog, categories, article, author, search, contact…
  art.js                  Logo mark, favicon and generated per-article cover art (SVG)
src/
  assets/css/main.css     Design system (tokens, components, responsive, motion)
  assets/js/main.js       Navigation, search overlay, forms, TOC, progress bar, tilt, reveal
  assets/js/search.js     Client-side search engine (no third-party service)
  assets/js/hero.js       Canvas network sphere (lazy-loaded on the home page only)
  static/                 Copied as-is: _headers, icons, og/*.png social images
scripts/
  serve.js                Zero-dependency preview server (+ --watch)
  render-images.js        Renders PNG icons and 1200×630 Open Graph cards with headless Chrome/Edge
```

### Generated pages

| Page | URL |
| --- | --- |
| Home | `/` |
| Blog (paginated) | `/blog/`, `/blog/page/2/` |
| Articles | `/blog/<slug>/` |
| Categories index / category pages | `/categories/`, `/category/<slug>/` |
| Guides & learning paths (resources) | `/guides/` |
| Search results | `/search/?q=…` |
| Author profile | `/author/editorial-team/` |
| Newsletter | `/newsletter/` |
| About, Editorial policy, Contact | `/about/`, `/editorial-policy/`, `/contact/` |
| Privacy, Terms, Disclaimer, Cookies | `/privacy-policy/`, `/terms/`, `/disclaimer/`, `/cookie-policy/` |
| 404 | `/404.html` |
| Machine files | `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/search-index.json`, `/site.webmanifest` |

## 3. Brand identity

### Name

**Bastion Brief.** A *bastion* is the angular projection of a star-shaped fort, designed so defenders
could cover every approach. A *brief* is what you give someone who needs to understand a situation
fast and act well. Together the name says "defence, explained clearly". It is short, alliterative,
easy to spell and not tied to a single platform or buzzword.

### Domain research (checked 19 November 2026)

Candidates were checked against Verisign's official `.com` registry (RDAP). "Not registered" means the
registry had no record at the time of the check. That is real evidence, but it is not a guarantee
you can buy the domain: it could be reserved or premium-priced, or registered since.

| Domain | Registry status at check |
| --- | --- |
| **bastionbrief.com** (selected) | Not registered |
| wardenlane.com | Not registered |
| bulwarkbrief.com | Not registered |
| keywardhq.com | Not registered |
| hardenedhq.com | Not registered |
| vigilwire.com, wardwise.com, keyhaven.com, shieldnote.com, threatwise.com, lockfield.com, ciphernest.com, wardline.com, cyberwarden.com and 20 others | Registered (unavailable) |

No trademark search was performed. Run a trademark check in your target markets before investing in the brand.

### Logo concept

A **split two-tone shield with a keyhole**: iris on the left, mint on the right, with the keyhole cut
through the centre. The halves stand for "understand the attack" and "stop the attack", and the
keyhole for access that is granted, never taken. It is bold and solid, so it stays legible at 16px
favicon size. On the home page, the hero's glass shield holds a large glowing version of the keyhole.
Source: `lib/art.js` (`markShapes`, `logoMark`, `faviconSvg`). The wordmark sets
"Bastion" in Inter Tight Bold and *Brief* in Instrument Serif Italic, in mint.

### Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#05070b` | Page background |
| `--bg-1` / `--bg-2` / `--bg-3` | `#080b11` / `#0c1018` / `#111722` | Raised surfaces |
| `--text` / `--text-2` / `--muted` | `#eef1f6` / `#c4cbd7` / `#8f99aa` | Text hierarchy (all pass WCAG AA on `--bg`) |
| `--mint` | `#62e6c4` | Primary accent, links, focus rings |
| `--iris` | `#8b93ff` | Secondary accent |
| `--sky` / `--amber` / `--rose` | `#7fd7ff` / `#f3b95f` / `#ff8a8a` | Info / warning / danger callouts |
| `--grad` | mint → iris, 120° | Primary buttons, rules, highlights |

Each category also has its own two-colour pair (`content/categories.js`), used in its illustrations and accents.

### Typography

| Role | Typeface |
| --- | --- |
| Headlines | Inter Tight 600–700, tight tracking |
| Editorial accents | Instrument Serif Italic (gradient text) |
| Body | Inter 400–600, 1.125rem / 1.78 line height in articles |
| Labels, metadata | JetBrains Mono 500, uppercase, wide tracking |

### Components

Buttons (`.btn--primary` gradient with sheen sweep, `.btn--ghost` glass, `--sm` / `--lg`), article
cards (feature, stack, wide, default, all with 3D tilt and cursor-following glow), category cards,
callouts (tip, note, warning, danger, takeaways, checklist), flow diagrams, tables, FAQ accordions,
pull quotes, author box, share bar, pagination, and newsletter and CTA bands. They are all defined in
`src/assets/css/main.css` and rendered by `lib/components.js`.

## 4. Adding and editing articles

Create `content/articles/<slug>.md`:

```markdown
---
title: How to Spot a Fake Delivery Text
seoTitle: Optional, different <title> tag (defaults to title)
slug: spot-fake-delivery-text
description: 140–160 characters for search results and social cards.
category: phishing-social-engineering
categories: online-safety, tutorials        # optional extra categories
tags: smishing, delivery scams, phishing
date: 2026-12-01
updated: 2026-12-15                         # optional; shown as "Updated"
featured: false                             # true = eligible for home page features
essential: false                            # true = "comprehensive guides" + editor's picks
intro: The standfirst shown under the H1.
---

Opening paragraph (styled as the lead)…

## A section heading (becomes part of the table of contents)
```

Then run `npm run build` (or keep `npm run dev` running). The build validates front matter, warns
about long descriptions, regenerates cover art, the sitemap, RSS and search index, and fails if any
internal link is broken.

To give the new article its own social card, run `npm run images`. Until you do, it uses `og/default.png`.

### Markdown features

| Syntax | Result |
| --- | --- |
| `## Heading` / `### Sub` | Anchored headings; H2s populate the table of contents |
| `[text](/blog/other-slug/)` | Internal link (checked at build time) |
| `[text](https://…)` | External link, opens in a new tab with `rel="noopener noreferrer"` |
| `> quote` | Large serif pull quote |
| `\| a \| b \|` tables | Responsive, scrollable, accessible table |
| `- [ ] item` | Interactive checklist |
| `:::tip Title` … `:::` | Callout. Types: `tip`, `note`, `warning`, `danger`, `takeaways`, `checklist` |
| `:::flow Title` + `- Label: text` lines | Numbered step diagram |
| `:::faq` + `Q:` / `A:` lines | FAQ section and FAQPage structured data |

All text is HTML-escaped, so raw HTML in Markdown is shown as text. That is deliberate.

### Internal linking

Link to two to five related articles naturally inside the body text. Related-article cards are
computed automatically from shared categories, shared tags and the links you write.

### Content rules

Keep every article defensive. Explain how an attack works only well enough to recognise and stop
it. Never include step-by-step instructions for unauthorised access. Don't invent statistics, quotes
or credentials. See `/editorial-policy/`.

### Adding a category or author

Add an entry to `content/categories.js` (choose a `motif`: shield, lock, terminal, chat, eye, radar,
hook, bug, wifi, key, steps, tools) or to `content/authors.js`, then reference it from front matter.
Only list real, verifiable credentials for authors.

## 5. Connecting the contact and newsletter forms

Both forms validate input in the browser, include a honeypot field, and the contact form also
applies a minimum-time-on-page check. **Until an endpoint is configured, they clearly tell the
visitor that nothing was sent.** They never fake a successful delivery.

1. Create an endpoint that accepts a JSON `POST` and returns 2xx on success. Options include
   Formspree, Basin, Getform, Buttondown, a Netlify, Vercel or Cloudflare function, or your own API.
2. Put the URLs in `content/site.js`:

   ```js
   forms: {
     contactEndpoint: 'https://your-endpoint.example/contact',
     newsletterEndpoint: 'https://your-endpoint.example/subscribe',
   },
   ```

3. Add the endpoint's origin to `connect-src` in `src/static/_headers` (and `vercel.json` if you use Vercel).
4. Rebuild and deploy.

**Payloads.** Contact sends `{ name, email, subject, message, page, elapsedMs }`. Newsletter sends `{ email, source }`.

**Server side, always** re-validate every field, enforce length limits, rate-limit by IP, reject
submissions where `elapsedMs < 3000`, escape values before putting them into emails, and use
double opt-in for the newsletter. Never trust client-side validation alone. Keep API keys on the
server, never in `content/site.js` (it is public).

## 6. Deployment

First set the production domain in `content/site.js` (`url: 'https://your-domain.com'`, no trailing
slash), then build. Canonical URLs, Open Graph tags, the sitemap, RSS and structured data all use it.

| Host | Settings |
| --- | --- |
| **Netlify** | Build command `node build.js`, publish directory `dist`. `_headers` is applied automatically. |
| **Cloudflare Pages** | Build command `node build.js`, output `dist`. `_headers` is applied automatically. |
| **Vercel** | Import the repo. `vercel.json` already sets the build, output and headers. |
| **GitHub Pages** | Build locally or in an Action, publish `dist/`. Headers can't be set, so consider Cloudflare in front. |
| **Any server (nginx/Apache)** | Upload `dist/`. Serve `index.html` for directories, set `404.html` as the error page, and copy the headers from `_headers` into your server config. |

After deploying:

1. Open `https://your-domain.com/robots.txt` and `/sitemap.xml` to confirm they load.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Check a few article URLs in Google's Rich Results Test and in a social-card preview tool.
4. Test the security headers with a header checker such as securityheaders.com.

## 7. SEO checklist

### Implemented

- [x] Semantic HTML5 landmarks and one H1 per page (verified on all 48 pages)
- [x] Logical H2/H3 hierarchy and an anchored table of contents on articles
- [x] Clean, descriptive URLs (`/blog/<slug>/`, `/category/<slug>/`)
- [x] Unique `<title>` and meta description on every page, descriptions ≤ 160 characters
- [x] Canonical URL on every page
- [x] Open Graph and Twitter/X card tags, with a 1200×630 PNG card for every article
- [x] `article:published_time`, `modified_time`, `section` and `tag` meta
- [x] XML sitemap with `lastmod`, plus `robots.txt` (search results page excluded)
- [x] RSS feed
- [x] JSON-LD: Organization, WebSite with SearchAction, BreadcrumbList, BlogPosting, FAQPage, CollectionPage, ItemList, ProfilePage and ContactPage (all validated as parseable)
- [x] Visible breadcrumbs on all inner pages
- [x] Author and editorial-policy pages, plus publish and update dates (E-E-A-T trust signals)
- [x] Contextual internal links in every article, related articles and previous/next links
- [x] Descriptive alt text on article hero images (decorative card thumbnails use empty alt)
- [x] Fast pages: no frameworks, under 10 KB of gzipped JavaScript in total (the hero canvas loads only on the home page; the search index downloads only when someone searches), ~16 KB gzipped CSS, lazy-loaded images with explicit dimensions
- [x] Search results page set to `noindex, follow`

### To do after launch

- [ ] Set the real domain in `content/site.js` and redeploy
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools, then submit the sitemap
- [ ] Self-host the fonts (e.g. download the woff2 files) to remove the Google Fonts request and tighten the CSP
- [ ] Add real social profiles to `content/site.js` (adds `sameAs` to the Organization schema)
- [ ] Review articles quarterly. Platform menus change, so bump `updated:` when you revise one
- [ ] Note: Google currently shows FAQ rich results only for a narrow set of sites, but the FAQ schema remains valid and harmless

## 8. Security

- **Strict Content-Security-Policy**: `script-src 'self'`, no inline scripts, no inline styles, no `eval`. Category colours are generated into the stylesheet so inline `style=""` isn't needed.
- HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, a strict referrer policy and a restrictive Permissions-Policy (`src/static/_headers`, `vercel.json`).
- **Output escaping**: the Markdown renderer escapes all text. Search and form messages are rendered with DOM APIs and `textContent`, never `innerHTML` with user input. A script-injection query in the search URL was tested and renders as harmless text.
- External links use `rel="noopener noreferrer"`. JSON-LD is serialised with `<` escaped.
- No secrets anywhere in the frontend. Form endpoints are public URLs by design.
- Honeypot fields and a minimum-time check on forms; server-side guidance is in section 5.
- The preview server blocks path traversal. It is for local use only; production is static hosting.
- No cookies, analytics or ad trackers.

## 9. Final testing report

Tested on 19 November 2026 in Chromium (desktop app browser) with emulated viewports, plus automated build checks.

| Area | Method | Result |
| --- | --- | --- |
| Build and internal links | Build-time crawler checks every `href`/`src` and `#anchor` across all pages | ✅ 0 broken internal links or assets |
| External links | All 63 external URLs requested by script; failures re-checked in a real browser | ✅ Fixed: 3 FTC pages had moved, 1 FTC page was removed, the PTES site is unreachable (link removed), and UK "Action Fraud" is now **Report Fraud** (reportfraud.police.uk), updated everywhere. ⚠ ico.org.uk sits behind a bot challenge, so it couldn't be auto-verified |
| Horizontal overflow | Every page loaded at 320, 375, 768, 1024 and 1280px | ✅ No overflow at any width (3 issues found and fixed) |
| One H1, meta description, canonical, valid JSON-LD, alt attributes, named links/buttons | Automated check of every page | ✅ All pass |
| Search | Ctrl+K overlay, typing, arrow keys + Enter, results page, alias terms ("2fa"), empty state, junk queries | ✅ Works. Ranking tightened so junk queries return the empty state |
| Script injection | `?q=<img src=x onerror=alert(1)>` | ✅ Rendered as escaped text, nothing executed |
| Contact form | Empty submit, invalid fields, valid submit with no endpoint, failing endpoint | ✅ Per-field errors with focus management; honest "not sent" notice; error state on server failure |
| Newsletter | Invalid email, valid email with no endpoint | ✅ Correct error and "not saved" notices |
| Desktop nav | Topics mega menu by click, Escape and outside click | ✅ |
| Mobile nav | Real taps at 375px | ✅ After fixes (below) |
| Reduced motion | `prefers-reduced-motion` disables animation, canvas renders one static frame | ✅ By design in CSS and JS |

### Bugs found during the audit and fixed

1. **Critical:** the hidden search overlay was still rendered (transparent) because CSS `display:flex` overrode the `hidden` attribute, so it **blocked every click and tap on the site**. Fixed with a global `[hidden]{display:none !important}`.
2. The mobile menu panel collapsed to zero height, because the header's `backdrop-filter` became the containing block for the fixed-position menu. Fixed by moving the menu outside `<header>`.
3. Typing immediately after Ctrl+K lost keystrokes. Fixed by focusing the input synchronously.
4. A screen-reader-only label inside a scrolling table widened the page on mobile. Fixed.
5. Category rows, the long "All … articles" links and the external-resources grid overflowed on narrow phones. Fixed.
6. Inline style attributes would have been blocked by the strict CSP. Replaced with generated CSS.
7. Seven meta descriptions were over 160 characters. Shortened.

## 10. Known limitations and next steps

- **Forms aren't connected yet.** Add endpoints (section 5). Until then, visitors are told honestly that nothing was sent.
- **Social links are empty** on purpose, because no accounts exist yet. Only the RSS link shows. Add real profiles in `content/site.js`.
- **No contact email** is configured. Add `contactEmail` if you want one displayed.
- **The author is the editorial team.** No individual experts were invented. Add real people with verifiable credentials to `content/authors.js` if you have them.
- **Legal pages are templates.** They name no legal entity, address or jurisdiction and must be reviewed by a qualified professional before you rely on them.
- **Platform instructions age.** Instagram and Facebook menu paths were written against current Accounts Center naming and will drift, so review them periodically.
- **Fonts load from Google Fonts.** This is disclosed in the privacy and cookie policies. Self-hosting improves privacy and performance.
- **Lighthouse and real-device testing** (physical iPhone and Android hardware, Safari, Firefox) should be repeated on the deployed site. Testing here used Chromium with emulated viewports.
