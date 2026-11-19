'use strict';
/**
 * Bastion Brief — tiny, dependency-free Markdown renderer.
 *
 * Supports the subset the editorial team needs:
 *   ## / ### headings (auto ids, optional {#custom-id})
 *   paragraphs, **bold**, *italic*, `code`, [links](/path/)
 *   - unordered lists, 1. ordered lists, - [ ] checklists
 *   > pull quotes, | tables |, --- rules
 *   Containers:  :::tip Title  …  :::
 *     tip | note | warning | danger | takeaways | checklist | flow | faq
 *
 * All text is HTML-escaped before inline formatting is applied, so article
 * authors cannot inject raw HTML/script by accident.
 */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z#0-9]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const CALLOUT_ICONS = {
  tip: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
  note: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  warning: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
  danger: '<path d="M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z"/><path d="M12 8v4M12 16h.01"/>',
  takeaways: '<path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  checklist: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
};
const CALLOUT_TITLES = {
  tip: 'Security tip',
  note: 'Good to know',
  warning: 'Warning',
  danger: 'Red flag',
  takeaways: 'Key takeaways',
  checklist: 'Checklist',
};

function calloutIcon(type) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${CALLOUT_ICONS[type] || CALLOUT_ICONS.note}</svg>`;
}

function createRenderer() {
  const headings = [];
  const faq = [];
  const links = [];
  const usedIds = new Set();
  let checkboxCounter = 0;

  function uniqueId(base) {
    let id = base || 'section';
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  }

  function inline(text) {
    let s = esc(text);
    const codes = [];
    s = s.replace(/`([^`]+)`/g, (_, c) => {
      codes.push(c);
      return `\u0000${codes.length - 1}\u0000`;
    });
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
      links.push(href.replace(/&amp;/g, '&'));
      if (/^https?:\/\//.test(href)) {
        return `<a href="${href}" class="ext" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
      }
      return `<a href="${href}">${label}</a>`;
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\w)/g, '$1<em>$2</em>');
    s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
    return s;
  }

  const isBlockStart = (line) =>
    /^(#{2,4}\s|:::|>\s?|\||---\s*$|\s*([-*]|\d+\.)\s+)/.test(line);

  function renderList(items, ordered) {
    const isChecklist = items.every((t) => /^\[( |x)\]\s/i.test(t));
    if (isChecklist) {
      return (
        '<ul class="checklist">' +
        items
          .map((t) => {
            const checked = /^\[x\]/i.test(t);
            const id = `chk-${++checkboxCounter}`;
            return `<li><input type="checkbox" id="${id}"${checked ? ' checked' : ''}><label for="${id}">${inline(t.replace(/^\[( |x)\]\s/i, ''))}</label></li>`;
          })
          .join('') +
        '</ul>'
      );
    }
    const tag = ordered ? 'ol' : 'ul';
    return `<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`;
  }

  function renderTable(rows) {
    const cells = (r) =>
      r
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => c.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2).map(cells);
    return (
      '<div class="table-wrap" role="region" aria-label="Comparison table" tabindex="0"><table>' +
      `<thead><tr>${head.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead>` +
      `<tbody>${body
        .map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join('')}</tr>`)
        .join('')}</tbody></table></div>`
    );
  }

  function renderFlow(title, lines) {
    const steps = lines
      .filter((l) => /^\s*-\s+/.test(l))
      .map((l) => {
        const t = l.replace(/^\s*-\s+/, '');
        const idx = t.indexOf(':');
        return idx > -1 ? { label: t.slice(0, idx), desc: t.slice(idx + 1).trim() } : { label: t, desc: '' };
      });
    return (
      `<figure class="flow"${title ? ` aria-label="${esc(title)}"` : ''}>` +
      (title ? `<figcaption class="flow__title">${inline(title)}</figcaption>` : '') +
      '<ol class="flow__steps">' +
      steps
        .map(
          (s, i) =>
            `<li class="flow__step"><span class="flow__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><strong>${inline(s.label)}</strong>${s.desc ? `<p>${inline(s.desc)}</p>` : ''}</li>`
        )
        .join('') +
      '</ol></figure>'
    );
  }

  function parseFaq(lines) {
    let cur = null;
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      if (line.startsWith('Q:')) {
        cur = { q: line.slice(2).trim(), a: [] };
        faq.push(cur);
      } else if (line.startsWith('A:') && cur) {
        cur.a.push(line.slice(2).trim());
      } else if (cur) {
        cur.a.push(line);
      }
    }
    faq.forEach((f) => {
      if (Array.isArray(f.a)) {
        f.answerText = f.a.join(' ');
        f.answerHtml = `<p>${inline(f.answerText)}</p>`;
        delete f.a;
      }
    });
  }

  function render(src) {
    const lines = src.replace(/\r\n/g, '\n').split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim()) {
        i++;
        continue;
      }

      // Containers
      const open = line.match(/^:::(\w+)\s*(.*)$/);
      if (open) {
        const type = open[1];
        const title = open[2].trim();
        const inner = [];
        let depth = 1;
        i++;
        while (i < lines.length) {
          if (/^:::\w+/.test(lines[i])) depth++;
          else if (/^:::\s*$/.test(lines[i])) {
            depth--;
            if (depth === 0) break;
          }
          inner.push(lines[i]);
          i++;
        }
        i++; // skip closing :::
        if (type === 'faq') {
          parseFaq(inner);
        } else if (type === 'flow') {
          out.push(renderFlow(title, inner));
        } else {
          const label = title || CALLOUT_TITLES[type] || 'Note';
          out.push(
            `<aside class="callout callout--${type}" aria-label="${esc(label)}"><div class="callout__head">${calloutIcon(type)}<strong>${inline(label)}</strong></div><div class="callout__body">${render(inner.join('\n'))}</div></aside>`
          );
        }
        continue;
      }

      // Headings
      const h = line.match(/^(#{2,4})\s+(.*?)(?:\s*\{#([\w-]+)\})?\s*$/);
      if (h) {
        const level = h[1].length;
        const text = h[2];
        const id = uniqueId(h[3] || slugify(text));
        if (level <= 3) headings.push({ level, text: text.replace(/[*`]/g, ''), id });
        out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
        i++;
        continue;
      }

      if (/^---\s*$/.test(line)) {
        out.push('<hr>');
        i++;
        continue;
      }

      // Tables
      if (line.trim().startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++]);
        out.push(renderTable(rows));
        continue;
      }

      // Pull quote
      if (/^>\s?/.test(line)) {
        const q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
        const text = q.join(' ').trim();
        out.push(`<blockquote class="pullquote"><p>${inline(text)}</p></blockquote>`);
        continue;
      }

      // Lists
      const li = line.match(/^\s*([-*]|\d+\.)\s+(.*)$/);
      if (li) {
        const ordered = /\d+\./.test(li[1]);
        const items = [];
        while (i < lines.length) {
          const m = lines[i].match(/^\s*([-*]|\d+\.)\s+(.*)$/);
          if (m) {
            items.push(m[2]);
            i++;
          } else if (lines[i].trim() && /^\s{2,}\S/.test(lines[i]) && items.length) {
            items[items.length - 1] += ' ' + lines[i].trim();
            i++;
          } else break;
        }
        out.push(renderList(items, ordered));
        continue;
      }

      // Paragraph
      const para = [];
      while (i < lines.length && lines[i].trim() && !(para.length && isBlockStart(lines[i]))) {
        para.push(lines[i].trim());
        i++;
      }
      out.push(`<p>${inline(para.join(' '))}</p>`);
    }
    return out.join('\n');
  }

  return { render, headings, faq, links, inline };
}

function renderMarkdown(src) {
  const r = createRenderer();
  const html = r.render(src);
  return { html, headings: r.headings, faq: r.faq, links: r.links };
}

/** Parse a front-matter block delimited by --- lines. */
function parseFrontMatter(raw) {
  const src = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^".*"$/.test(v)) v = v.slice(1, -1);
    if (v === 'true') v = true;
    else if (v === 'false') v = false;
    data[kv[1]] = v;
  }
  return { data, body: m[2] };
}

function inlineOnly(text) {
  return createRenderer().inline(text);
}

module.exports = { renderMarkdown, parseFrontMatter, esc, slugify, inlineOnly };
