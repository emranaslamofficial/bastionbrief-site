/**
 * Hero "network sphere" — lightweight Canvas 2D version.
 *
 * Performance design:
 *  - Points sit on a Fibonacci sphere; neighbour pairs are computed once
 *    (rotation preserves distance).
 *  - Links and dots are grouped into a few depth buckets, so each frame
 *    issues ~8 draw calls instead of hundreds.
 *  - Capped at 30 fps, pixel ratio capped at 1.5.
 *  - Pauses when off-screen, when the tab is hidden, and while the page is
 *    being scrolled. Renders one static frame for reduced motion, Save-Data
 *    or low-power devices.
 */
export function initNetwork(canvas) {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 760px)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
  const staticOnly = reduce || saveData || lowPower;

  const N = small ? 70 : 110;
  const BUCKETS = 4;
  const FRAME_MS = 1000 / 30;

  const pts = new Float32Array(N * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    pts[i * 3] = Math.cos(golden * i) * r;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = Math.sin(golden * i) * r;
  }
  const linkList = [];
  const maxD2 = (small ? 0.42 : 0.36) ** 2;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = pts[i * 3] - pts[j * 3];
      const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
      const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < maxD2) linkList.push(i, j);
    }
  }
  const links = Uint16Array.from(linkList);

  // Pre-built styles per depth bucket (0 = front, 3 = back).
  const lineStyles = [];
  const dotStyles = [];
  for (let b = 0; b < BUCKETS; b++) {
    const front = 1 - b / (BUCKETS - 1);
    lineStyles.push(b < BUCKETS / 2 ? `rgba(98,230,196,${(0.06 + front * 0.2).toFixed(3)})` : `rgba(139,147,255,${(0.04 + front * 0.14).toFixed(3)})`);
    dotStyles.push(b < BUCKETS / 2 ? `rgba(158,245,222,${(0.3 + front * 0.7).toFixed(3)})` : `rgba(160,166,255,${(0.18 + front * 0.35).toFixed(3)})`);
  }
  const dotSize = [2.2, 1.7, 1.2, 0.9];

  let w = 0;
  let h = 0;
  let angle = 0.6;
  let tilt = -0.35;
  let raf = 0;
  let lastFrame = 0;
  let visible = true;
  let scrolling = false;
  let scrollTimer = 0;
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const pb = new Uint8Array(N);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 1;
    draw();
  }

  function draw() {
    const R = Math.min(w, h) * 0.43;
    const cx = w / 2;
    const cy = h / 2;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    for (let i = 0; i < N; i++) {
      const x = pts[i * 3];
      const y = pts[i * 3 + 1];
      const z = pts[i * 3 + 2];
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const y1 = y * ct - z1 * st;
      const z2 = y * st + z1 * ct; // -1 front … 1 back
      const persp = 2.6 / (2.6 + z2);
      px[i] = cx + x1 * R * persp;
      py[i] = cy + y1 * R * persp;
      pb[i] = Math.min(BUCKETS - 1, ((z2 + 1) / 2) * BUCKETS) | 0;
    }
    ctx.clearRect(0, 0, w, h);
    // One path per bucket for all links.
    for (let b = BUCKETS - 1; b >= 0; b--) {
      ctx.beginPath();
      for (let k = 0; k < links.length; k += 2) {
        const a = links[k];
        const c = links[k + 1];
        if (Math.max(pb[a], pb[c]) !== b) continue;
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[c], py[c]);
      }
      ctx.strokeStyle = lineStyles[b];
      ctx.stroke();
    }
    // One path per bucket for all dots (squares are much cheaper than arcs).
    for (let b = BUCKETS - 1; b >= 0; b--) {
      ctx.beginPath();
      const s = dotSize[b];
      for (let i = 0; i < N; i++) if (pb[i] === b) ctx.rect(px[i] - s / 2, py[i] - s / 2, s, s);
      ctx.fillStyle = dotStyles[b];
      ctx.fill();
    }
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    const dt = t - lastFrame;
    if (dt < FRAME_MS) return;
    lastFrame = t;
    angle += 0.0026 * Math.min(dt / FRAME_MS, 3);
    draw();
  }
  function start() {
    if (staticOnly || raf || !visible || scrolling || document.hidden) return;
    lastFrame = performance.now();
    raf = requestAnimationFrame(loop);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  let resizeTimer = 0;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }).observe(canvas);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  // Free the main thread for smooth scrolling: pause while scrolling, resume after.
  window.addEventListener(
    'scroll',
    () => {
      if (!scrolling) {
        scrolling = true;
        stop();
      }
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
        start();
      }, 160);
    },
    { passive: true }
  );

  resize();
  start();
}
