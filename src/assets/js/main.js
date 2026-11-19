/**
 * Bastion Brief — site behaviour.
 * Progressive enhancement only: every page is fully readable without JS.
 */
import { loadIndex, search, highlightInto, resultCard } from './search.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const body = document.body;

/* ------------------------------------------------------------ Header state */
const header = $('[data-header]');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ------------------------------------------------------------ Topics menu */
const menuBtn = $('[data-menu-btn]');
const menu = $('[data-menu]');
function setMenu(open) {
  if (!menuBtn || !menu) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  if (open) {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-visible'));
  } else {
    menu.classList.remove('is-visible');
    setTimeout(() => {
      if (menuBtn.getAttribute('aria-expanded') === 'false') menu.hidden = true;
    }, 220);
  }
}
if (menuBtn) {
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });
  menu.addEventListener('focusout', (e) => {
    if (!menu.contains(e.relatedTarget) && e.relatedTarget !== menuBtn) setMenu(false);
  });
}

/* ------------------------------------------------------------ Mobile nav */
const mToggle = $('[data-mobile-toggle]');
const mNav = $('[data-mobile-nav]');
function setMobile(open) {
  if (!mToggle || !mNav) return;
  mToggle.setAttribute('aria-expanded', String(open));
  mToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  header.classList.toggle('is-open', open);
  body.classList.toggle('is-locked', open);
  if (open) {
    mNav.hidden = false;
    requestAnimationFrame(() => mNav.classList.add('is-visible'));
  } else {
    mNav.classList.remove('is-visible');
    setTimeout(() => {
      if (mToggle.getAttribute('aria-expanded') === 'false') mNav.hidden = true;
    }, 250);
  }
}
if (mToggle) {
  mToggle.addEventListener('click', () => setMobile(mToggle.getAttribute('aria-expanded') !== 'true'));
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => e.matches && setMobile(false));
}

/* ------------------------------------------------------------ Search overlay */
const overlay = $('[data-search-overlay]');
const ovInput = $('[data-search-input]');
const ovResults = $('[data-search-results]');
const ovHints = $('[data-search-hints]');
let lastFocus = null;
let activeIdx = -1;

function openSearch() {
  if (!overlay) return;
  lastFocus = document.activeElement;
  overlay.hidden = false;
  body.classList.add('is-locked');
  ovInput.focus(); // synchronous, so fast typists never lose keystrokes
  requestAnimationFrame(() => overlay.classList.add('is-visible'));
  loadIndex().catch(() => {});
}
function closeSearch() {
  if (!overlay || overlay.hidden) return;
  overlay.classList.remove('is-visible');
  body.classList.remove('is-locked');
  setTimeout(() => (overlay.hidden = true), 250);
  if (lastFocus) lastFocus.focus();
}
$$('[data-search-open]').forEach((b) => b.addEventListener('click', openSearch));
$$('[data-search-close]').forEach((b) => b.addEventListener('click', closeSearch));

function renderOverlay(q) {
  ovResults.replaceChildren();
  activeIdx = -1;
  const trimmed = q.trim();
  ovHints.hidden = !!trimmed;
  if (!trimmed) return;
  loadIndex()
    .then((items) => {
      if (ovInput.value.trim() !== trimmed) return;
      const res = search(items, trimmed, 6);
      ovResults.replaceChildren();
      if (!res.length) {
        const p = document.createElement('p');
        p.className = 'sr-empty';
        p.textContent = `No matches for “${trimmed}”. Try a broader term like “phishing” or “password”.`;
        ovResults.appendChild(p);
        return;
      }
      res.forEach((it) => {
        const a = document.createElement('a');
        a.className = 'sr-result';
        a.href = it.u;
        const img = document.createElement('img');
        img.src = it.img;
        img.alt = '';
        img.width = 72;
        img.height = 40;
        const div = document.createElement('div');
        const strong = document.createElement('strong');
        highlightInto(strong, it.t, trimmed);
        const small = document.createElement('small');
        small.textContent = `${it.c} · ${it.r} min read`;
        div.append(strong, small);
        a.append(img, div);
        ovResults.appendChild(a);
      });
      const all = document.createElement('a');
      all.className = 'sr-all';
      all.href = `/search/?q=${encodeURIComponent(trimmed)}`;
      all.textContent = `See all results for “${trimmed}” →`;
      ovResults.appendChild(all);
    })
    .catch(() => {
      const p = document.createElement('p');
      p.className = 'sr-empty';
      p.textContent = 'Search is temporarily unavailable. Press Enter to try the full search page.';
      ovResults.replaceChildren(p);
    });
}
if (ovInput) {
  let t;
  ovInput.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => renderOverlay(ovInput.value), 90);
  });
  ovInput.addEventListener('keydown', (e) => {
    const items = $$('a', ovResults);
    if (!items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx));
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && activeIdx > -1) {
      e.preventDefault();
      items[activeIdx].click();
    }
  });
}

/* ------------------------------------------------------------ Global keys */
document.addEventListener('keydown', (e) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
  if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    overlay.hidden ? openSearch() : closeSearch();
  } else if (e.key === '/' && !typing && overlay?.hidden) {
    e.preventDefault();
    openSearch();
  } else if (e.key === 'Escape') {
    if (overlay && !overlay.hidden) closeSearch();
    else if (mToggle?.getAttribute('aria-expanded') === 'true') {
      setMobile(false);
      mToggle.focus();
    } else if (menuBtn?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuBtn.focus();
    }
  } else if (e.key === 'Tab' && overlay && !overlay.hidden) {
    // Keep focus inside the dialog.
    const f = $$('input, a[href], button', $('.search-panel')).filter((el) => el.offsetParent !== null);
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

/* ------------------------------------------------------------ Search page */
const spResults = $('[data-search-page-results]');
if (spResults) {
  const input = $('[data-search-page-input]');
  const summary = $('[data-search-summary]');
  const empty = $('[data-search-empty]');
  const start = $('[data-search-start]');
  const q = (new URLSearchParams(location.search).get('q') || '').slice(0, 80);
  input.value = q;
  if (q.trim()) {
    document.title = `“${q}” — Search | Bastion Brief`;
    summary.textContent = 'Searching…';
    start.hidden = true;
    loadIndex()
      .then((items) => {
        const res = search(items, q);
        spResults.replaceChildren(...res.map((it) => resultCard(it, q)));
        summary.replaceChildren();
        const strong = document.createElement('strong');
        strong.textContent = `“${q}”`;
        summary.append(`${res.length} ${res.length === 1 ? 'result' : 'results'} for `, strong);
        empty.hidden = res.length > 0;
      })
      .catch(() => {
        summary.textContent = 'Search is temporarily unavailable. Please try again, or browse all articles.';
      });
  } else {
    summary.textContent = '';
  }
}

/* ------------------------------------------------------------ Reveal on scroll */
const reveals = $$('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove('is-pending');
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );
  const vh = window.innerHeight;
  reveals.forEach((el, i) => {
    if (el.getBoundingClientRect().top > vh * 0.92) {
      el.classList.add('is-pending');
      el.style.setProperty('--d', `${(i % 3) * 70}ms`);
      io.observe(el);
    }
  });
}

/* ------------------------------------------------------------ Tilt + glow */
if (finePointer && !reduceMotion) {
  $$('.tilt').forEach((el) => {
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-4px)`;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
  const scene = $('[data-parallax]');
  if (scene) {
    const hero = scene.closest('.hero');
    let pending = 0;
    let lx = 0;
    let ly = 0;
    // Coalesce pointer events: at most one style update per animation frame.
    hero.addEventListener(
      'pointermove',
      (e) => {
        lx = e.clientX / window.innerWidth - 0.5;
        ly = e.clientY / window.innerHeight - 0.5;
        if (pending) return;
        pending = requestAnimationFrame(() => {
          pending = 0;
          scene.style.setProperty('--ry', `${(lx * 14).toFixed(2)}deg`);
          scene.style.setProperty('--rx', `${(-ly * 10).toFixed(2)}deg`);
        });
      },
      { passive: true }
    );
    hero.addEventListener('pointerleave', () => {
      scene.style.setProperty('--ry', '0deg');
      scene.style.setProperty('--rx', '0deg');
    });
  }
}

/* ------------------------------------------------------------ Hero network */
const net = $('[data-network]');
if (net) import('./hero.js').then((m) => m.initNetwork(net));

/* ------------------------------------------------------------ Reading progress + TOC */
const bar = $('[data-progress]');
const prose = $('[data-prose]');
if (bar && prose) {
  let ticking = false;
  const update = () => {
    const r = prose.getBoundingClientRect();
    const total = r.height - window.innerHeight * 0.6;
    const p = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
    bar.style.transform = `scaleX(${p})`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}
const tocLinks = $$('.toc-desktop .toc a');
if (tocLinks.length && 'IntersectionObserver' in window) {
  const map = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const heads = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          tocLinks.forEach((a) => a.classList.remove('is-active'));
          const link = map.get(e.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-15% 0px -70% 0px' }
  );
  heads.forEach((h) => io.observe(h));
}
$$('.toc-mobile a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));

/* ------------------------------------------------------------ Copy link */
$$('[data-copy-link]').forEach((btn) =>
  btn.addEventListener('click', async () => {
    const out = $('.share__copied', btn);
    try {
      await navigator.clipboard.writeText(btn.dataset.copyLink);
      out.textContent = 'Link copied';
    } catch {
      out.textContent = 'Copy failed';
    }
    setTimeout(() => (out.textContent = ''), 1800);
  })
);

/* ------------------------------------------------------------ Forms */
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const pageLoadedAt = Date.now();

async function postJSON(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
    credentials: 'omit',
    referrerPolicy: 'strict-origin-when-cross-origin',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}

// Newsletter
const nlEndpoint = body.dataset.nlEndpoint || '';
$$('[data-newsletter-form]').forEach((form) => {
  const input = $('input[type="email"]', form);
  const msg = $('.nl-form__msg', form);
  const btn = $('button[type="submit"]', form);
  const setMsg = (text, type) => {
    msg.textContent = text;
    msg.className = `nl-form__msg is-${type}`;
  };
  input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    msg.textContent = '';
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!email) {
      input.setAttribute('aria-invalid', 'true');
      setMsg('Please enter your email address.', 'error');
      return input.focus();
    }
    if (email.length > 254 || !EMAIL_RE.test(email)) {
      input.setAttribute('aria-invalid', 'true');
      setMsg('That email address doesn’t look right. Please check it.', 'error');
      return input.focus();
    }
    if ($('.hp-field', form).value) return; // bot
    if (!nlEndpoint) {
      setMsg('Thanks for your interest — sign-ups aren’t switched on yet, so your address was not saved. Please check back soon.', 'info');
      return;
    }
    btn.disabled = true;
    setMsg('Subscribing…', 'info');
    try {
      await postJSON(nlEndpoint, { email, source: location.pathname });
      setMsg('You’re subscribed. Check your inbox to confirm your address.', 'success');
      form.reset();
    } catch {
      setMsg('Something went wrong and you were not subscribed. Please try again in a moment.', 'error');
    } finally {
      btn.disabled = false;
    }
  });
});

// Contact
const contact = $('[data-contact-form]');
if (contact) {
  const alertBox = $('[data-form-alert]', contact);
  const submit = $('[data-submit]', contact);
  const counter = $('[data-counter]', contact);
  const counterOut = $('[data-counter-out]', contact);
  if (counter) counter.addEventListener('input', () => (counterOut.textContent = counter.value.length));

  const rules = {
    name: (v) => (v.trim().length < 2 ? 'Please enter your name (at least 2 characters).' : v.length > 100 ? 'Name must be 100 characters or fewer.' : ''),
    email: (v) => (!v.trim() ? 'Please enter your email address.' : !EMAIL_RE.test(v.trim()) ? 'Please enter a valid email address, like name@example.com.' : ''),
    subject: (v) => (!v ? 'Please choose a subject.' : ''),
    message: (v) =>
      v.trim().length < 20 ? `Please write at least 20 characters (currently ${v.trim().length}).` : v.length > 4000 ? 'Message must be 4,000 characters or fewer.' : '',
    consent: (_v, el) => (!el.checked ? 'Please confirm you have read how your details will be used.' : ''),
  };
  const validate = (el) => {
    const rule = rules[el.name];
    if (!rule) return true;
    const err = rule(el.value, el);
    const out = $(`#${el.id}-error`, contact);
    out.textContent = err;
    el.setAttribute('aria-invalid', err ? 'true' : 'false');
    return !err;
  };
  Object.keys(rules).forEach((name) => {
    const el = contact.elements[name];
    el.addEventListener('blur', () => el.value && validate(el));
    el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && validate(el));
    el.addEventListener('change', () => el.type === 'checkbox' && validate(el));
  });
  const show = (type, text) => {
    alertBox.hidden = false;
    alertBox.className = `alert alert--${type}`;
    alertBox.textContent = text;
  };

  contact.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.hidden = true;
    const fields = Object.keys(rules).map((n) => contact.elements[n]);
    const results = fields.map(validate);
    const firstBad = fields[results.indexOf(false)];
    if (firstBad) {
      firstBad.focus();
      show('error', 'Please fix the highlighted fields and try again.');
      return;
    }
    // Basic spam heuristics: honeypot + minimum time on page.
    if (contact.elements.website.value || Date.now() - pageLoadedAt < 3000) {
      show('error', 'Your message could not be sent. Please wait a moment and try again.');
      return;
    }
    const endpoint = contact.dataset.endpoint;
    if (!endpoint) {
      show(
        'info',
        'Your message is ready, but this contact form is not yet connected to a delivery service — so it has NOT been sent. Please try again later. Nothing you typed has been stored.'
      );
      return;
    }
    const data = {
      name: contact.elements.name.value.trim(),
      email: contact.elements.email.value.trim(),
      subject: contact.elements.subject.value,
      message: contact.elements.message.value.trim(),
      page: location.pathname,
      elapsedMs: Date.now() - pageLoadedAt,
    };
    submit.disabled = true;
    $('span', submit).textContent = 'Sending…';
    try {
      await postJSON(endpoint, data);
      show('success', 'Thank you — your message has been sent. We’ll reply to the email address you provided.');
      contact.reset();
      if (counterOut) counterOut.textContent = '0';
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
    } catch {
      show('error', 'Sorry, your message could not be sent because of a network or server problem. Please try again in a few minutes.');
    } finally {
      submit.disabled = false;
      $('span', submit).textContent = 'Send message';
    }
  });
}
