/**
 * Hero "network sphere": ~170 points on a Fibonacci sphere, slowly rotating,
 * with links between near neighbours. Pure Canvas 2D — no WebGL library.
 * Neighbour pairs are computed once (rotation preserves distance), so each
 * frame is O(points + links). Pauses when off-screen or the tab is hidden and
 * renders a single static frame when the user prefers reduced motion.
 */
export function initNetwork(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 760px)').matches;
  const N = small ? 110 : 170;
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
  }
  const links = [];
  const maxD = small ? 0.36 : 0.3;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      const dz = pts[i][2] - pts[j][2];
      if (dx * dx + dy * dy + dz * dz < maxD * maxD) links.push(i, j);
    }
  }

  let w = 0;
  let h = 0;
  let dpr = 1;
  let angle = 0.6;
  let tilt = -0.35;
  let targetTilt = tilt;
  let raf = 0;
  let visible = true;
  const proj = new Float32Array(N * 3);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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
      const [x, y, z] = pts[i];
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const y1 = y * ct - z1 * st;
      const z2 = y * st + z1 * ct;
      const persp = 2.6 / (2.6 + z2);
      proj[i * 3] = cx + x1 * R * persp;
      proj[i * 3 + 1] = cy + y1 * R * persp;
      proj[i * 3 + 2] = z2;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (let k = 0; k < links.length; k += 2) {
      const a = links[k] * 3;
      const b = links[k + 1] * 3;
      const depth = (proj[a + 2] + proj[b + 2]) / 2; // -1 (front) … 1 (back)
      const alpha = 0.03 + (1 - (depth + 1) / 2) * 0.22;
      ctx.strokeStyle = depth < 0 ? `rgba(98,230,196,${alpha})` : `rgba(139,147,255,${alpha * 0.8})`;
      ctx.beginPath();
      ctx.moveTo(proj[a], proj[a + 1]);
      ctx.lineTo(proj[b], proj[b + 1]);
      ctx.stroke();
    }
    for (let i = 0; i < N; i++) {
      const z = proj[i * 3 + 2];
      const front = 1 - (z + 1) / 2;
      const size = 0.6 + front * 1.8;
      ctx.fillStyle = z < 0 ? `rgba(158,245,222,${0.25 + front * 0.75})` : `rgba(160,166,255,${0.15 + front * 0.4})`;
      ctx.beginPath();
      ctx.arc(proj[i * 3], proj[i * 3 + 1], size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    angle += 0.0016;
    tilt += (targetTilt - tilt) * 0.04;
    draw();
    raf = requestAnimationFrame(loop);
  }
  function start() {
    if (reduce || raf || !visible || document.hidden) return;
    raf = requestAnimationFrame(loop);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? start() : stop();
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener(
      'pointermove',
      (e) => {
        targetTilt = -0.35 + (e.clientY / window.innerHeight - 0.5) * 0.4;
      },
      { passive: true }
    );
  }
  resize();
  start();
}
