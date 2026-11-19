#!/usr/bin/env node
'use strict';
/**
 * Minimal local preview server for ./dist (no dependencies).
 *   node scripts/serve.js [--port 4321] [--watch]
 * --watch rebuilds the site when content/, lib/ or src/ change.
 * Mirrors production behaviour: clean URLs (/blog/x/ → /blog/x/index.html)
 * and dist/404.html for missing paths. Development use only.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const argPort = process.argv.indexOf('--port');
const PORT = Number(process.env.PORT || (argPort > -1 ? process.argv[argPort + 1] : 4321));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function send(res, status, file) {
  res.writeHead(status, {
    'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-cache',
  });
  fs.createReadStream(file).pipe(res);
}

http
  .createServer((req, res) => {
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400).end('Bad request');
      return;
    }
    // Prevent path traversal outside dist/.
    const target = path.normalize(path.join(DIST, urlPath));
    if (!target.startsWith(DIST)) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    let file = target;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!urlPath.endsWith('/')) {
        res.writeHead(301, { Location: urlPath + '/' }).end();
        return;
      }
      file = path.join(file, 'index.html');
    }
    if (fs.existsSync(file)) return send(res, 200, file);
    return send(res, 404, path.join(DIST, '404.html'));
  })
  .listen(PORT, () => console.log(`  Bastion Brief preview → http://localhost:${PORT}`));

if (process.argv.includes('--watch')) {
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      execFile(process.execPath, [path.join(ROOT, 'build.js')], (err, out, errOut) => {
        process.stdout.write(out);
        if (err) process.stderr.write(errOut);
      });
    }, 150);
  };
  for (const dir of ['content', 'lib', 'src']) {
    fs.watch(path.join(ROOT, dir), { recursive: true }, rebuild);
  }
  console.log('  Watching content/, lib/ and src/ for changes…');
}
