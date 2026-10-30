"use strict";

/**
 * Precision Touchpad Lab
 * 纯前端、零依赖。直接双击 index.html 即可运行（file:// 下除 HID 外均可用）。
 *
 * 手势模型：
 *  - 两指（Pointer Events，pointerType === "touch"）→ 捏合缩放 + 旋转；
 *  - 触控板被系统合成鼠标时，浏览器只发 wheel / Ctrl+wheel：
 *      Ctrl+wheel  → 捏合缩放（Windows 触控板的双指捏合在 Chromium 里正是这个信号）
 *  - 键盘兜底：+ / - / [ / ] / 0 / R / F
 */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const deg = (rad) => (rad * 180) / Math.PI;
  const rad = (d) => (d * Math.PI) / 180;
  const now = () => (performance && performance.now ? performance.now() : Date.now());

  const state = {
    scale: 1,
    rotation: 0,
    tx: 0,
    ty: 0,
    mode: "pinch", // pinch | rotate | both
    pointers: new Map(), // pointerId -> {x, y, pressure, width, height, kind}
    maxPointers: 0,
    dragStart: null,
    gestureActive: false,
    gestureStart: null,
    lastCentroid: null,
    lastDistance: null,
    lastAngle: null,
    pinchDone: false,
    rotateDone: false,
    pressureSeen: new Set(),
    pressureMin: Infinity,
    pressureMax: -Infinity,
    precisionHits: { size: 0, pressure: 0, tilt: 0, touch: 0 },
    touchSeen: false,
    eventCount: 0,
    eventWindow: [],
    rate: 0,
    log: [],
    lastTransformUpdate: 0,
    renderQueued: false,
    verdictLevel: "unknown",
    tests: { precision: "idle", pinch: "idle", rotate: "idle", pressure: "idle", trajectory: "idle" },
    smoothness: { points: 0, jumpCount: 0, maxJump: 0, maxAllowedJump: 0 },
    trail: { x: null, y: null, points: 0 },
    capi: {},
    reportText: "",
    userAgent: navigator.userAgent,
    platform: navigator.userAgentData?.platform || navigator.platform || "—",
    bornAt: Date.now(),
  };

  /* ------------------------------------------------------------------ */
  /* DOM                                                                 */
  /* ------------------------------------------------------------------ */
  const dom = {
    stage: $("#stage"),
    stageCard: $("#stage-card"),
    object: $("#transform-object"),
    pointersLayer: $("#pointers-layer"),
    trailLayer: $("#trail-layer"),
    overlay: $("#stage-overlay"),
    overlayBadge: $("#overlay-badge"),
    overlayHint: $("#overlay-hint"),
    hudScale: $("#hud-scale"),
    hudRotate: $("#hud-rotate"),
    hudPointers: $("#hud-pointers"),
    log: $("#log"),
    tests: $("#tests"),
    progress: $("#test-progress"),
    verdict: $("#verdict"),
    verdictTitle: $("#verdict-title"),
    verdictDesc: $("#verdict-desc"),
    verdictSub: $("#verdict-sub"),
    meterPrecision: $("#meter-precision"),
    meterGesture: $("#meter-gesture"),
    meterSmooth: $("#meter-smooth"),
    meterPrecisionVal: $("#meter-precision-val"),
    meterGestureVal: $("#meter-gesture-val"),
    meterSmoothVal: $("#meter-smooth-val"),
    scoreValue: $("#score-value"),
    scoreGrade: $("#score-grade"),
    scoreCaption: $("#score-caption"),
    appleRows: $("#apple-rows"),
    appleSummary: $("#apple-summary"),
    chipPointer: $("#chip-pointer .dot"),
    chipTouch: $("#chip-touch .dot"),
    chipGesture: $("#chip-gesture .dot"),
    chipHid: $("#chip-hid .dot"),
    fpType: $("#fp-pointer-type"),
    fpSize: $("#fp-size"),
    fpPressure: $("#fp-pressure"),
    fpTilt: $("#fp-tilt"),
    fpMaxPointers: $("#fp-max-pointers"),
    fpRate: $("#fp-rate"),
    fpDpr: $("#fp-dpr"),
    fpPlatform: $("#fp-platform"),
    report: $("#report"),
    reportText: $("#report-text"),
    btnCopy: $("#btn-copy"),
    help: $("#help-dialog"),
  };

  /* ------------------------------------------------------------------ */
  /* Logging                                                             */
  /* ------------------------------------------------------------------ */
  const LOG_LIMIT = 80;

  function log(kind, label, detail) {
    const t = new Date();
    const stamp = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(
      t.getSeconds()
    ).padStart(2, "0")}.${String(t.getMilliseconds()).padStart(3, "0")}`;
    state.log.push({ stamp, kind, label, detail: String(detail ?? "") });
    if (state.log.length > LOG_LIMIT) state.log.shift();
    renderLog();
  }

  function renderLog() {
    if (!dom.log) return;
    const frag = document.createDocumentFragment();
    for (const e of state.log) {
      const li = document.createElement("li");
      li.dataset.kind = e.kind;
      const time = document.createElement("time");
      time.textContent = e.stamp;
      const b = document.createElement("b");
      b.textContent = e.label;
      const span = document.createElement("span");
      span.textContent = e.detail;
      li.append(time, b, span);
      frag.append(li);
    }
    dom.log.replaceChildren(frag);
    dom.log.scrollTop = dom.log.scrollHeight;
  }

  /* ------------------------------------------------------------------ */
  /* Transform                                                           */
  /* ------------------------------------------------------------------ */
  function applyTransform(smooth = false) {
    const s = clamp(state.scale, 0.2, 8);
    const r = state.rotation;
    dom.object.style.transform = `translate(-50%, -50%) translate(${state.tx}px, ${state.ty}px) scale(${s}) rotate(${r}deg)`;
    dom.object.classList.toggle("is-testing", !smooth);
    dom.hudScale.textContent = `${s.toFixed(2)}×`;
    dom.hudRotate.textContent = `${r.toFixed(1)}°`;
    dom.hudPointers.textContent = String(state.pointers.size);
  }

  function scheduleTransform(smooth = false) {
    if (state.renderQueued) return;
    state.renderQueued = true;
    requestAnimationFrame(() => {
      state.renderQueued = false;
      applyTransform(smooth);
    });
  }

  function resetTransform(announce = true) {
    state.scale = 1;
    state.rotation = 0;
    state.tx = 0;
    state.ty = 0;
    applyTransform();
    if (announce) log("gesture", "reset", "缩放 1.00× / 旋转 0.0°");
  }

  /* ------------------------------------------------------------------ */
  /* Pointer rendering                                                   */
  /* ------------------------------------------------------------------ */
  function ensureDot(id, kind) {
    let dot = dom.pointersLayer.querySelector(`[data-pointer="${id}"]`);
    if (!dot) {
      dot = document.createElement("div");
      dot.className = "pointer-dot";
      dot.dataset.pointer = String(id);
      dot.dataset.kind = kind;
      dom.pointersLayer.append(dot);
    }
    return dot;
  }

  function drawPointer(p) {
    const rect = dom.stage.getBoundingClientRect();
    const dot = ensureDot(p.id, p.kind);
    dot.style.left = `${p.x - rect.left}px`;
    dot.style.top = `${p.y - rect.top}px`;
    const size = p.width || 8;
    dot.style.setProperty("--dot-scale", String(clamp(size / 12, 0.6, 2.4)));
  }

  function clearPointerDots() {
    dom.pointersLayer.replaceChildren();
  }

  /* ------------------------------------------------------------------ */
  /* Trail rendering (单指轨迹)                                          */
  /* ------------------------------------------------------------------ */
  function trailCtx() {
    const c = dom.trailLayer;
    if (!c) return null;
    const ctx = c.getContext("2d");
    return ctx;
  }

  function resizeTrail() {
    const c = dom.trailLayer;
    if (!c) return;
    const rect = dom.stage.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
      clearTrail();
    }
  }

  function clearTrail() {
    const c = dom.trailLayer;
    if (!c) return;
    const ctx = trailCtx();
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    state.trail.x = null;
    state.trail.y = null;
  }

  /** 单指移动时绘制会自然淡出的“彗尾”轨迹 */
  function drawTrail(p) {
    const c = dom.trailLayer;
    if (!c) return;
    const ctx = trailCtx();
    if (!ctx) return;
    const rect = dom.stage.getBoundingClientRect();
    const wantW = Math.max(1, Math.round(rect.width * Math.min(window.devicePixelRatio || 1, 2)));
    if (c.width !== wantW) {
      // 尺寸变化时重设画布（会清空轨迹），本帧跳过绘制
      resizeTrail();
      return;
    }
    const dpr = c.width / Math.max(1, rect.width);
    const x = (p.x - rect.left) * dpr;
    const y = (p.y - rect.top) * dpr;

    // 逐步擦除旧轨迹，形成淡出效果
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.055)";
    ctx.fillRect(0, 0, c.width, c.height);

    if (state.trail.x !== null) {
      ctx.globalCompositeOperation = "lighter";
      const grad = ctx.createLinearGradient(state.trail.x, state.trail.y, x, y);
      grad.addColorStop(0, "rgba(34, 211, 238, 0.95)");
      grad.addColorStop(0.6, "rgba(129, 140, 248, 0.9)");
      grad.addColorStop(1, "rgba(244, 114, 182, 0.92)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.6 * dpr;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(129, 140, 248, 0.85)";
      ctx.shadowBlur = 9 * dpr;
      ctx.beginPath();
      ctx.moveTo(state.trail.x, state.trail.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.shadowBlur = 0;
      state.trail.points += 1;
    }

    state.trail.x = x;
    state.trail.y = y;
  }

  /* ------------------------------------------------------------------ */
  /* Gesture math                                                        */
  /* ------------------------------------------------------------------ */
  function centroid() {
    let x = 0;
    let y = 0;
    let n = 0;
    for (const p of state.pointers.values()) {
      x += p.x;
      y += p.y;
      n += 1;
    }
    return n ? { x: x / n, y: y / n, n } : null;
  }

  function twoPointers() {
    if (state.pointers.size !== 2) return null;
    return Array.from(state.pointers.values()).slice(0, 2);
  }

  function measure(pair) {
    const [a, b] = pair;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy) || 1;
    const angle = Math.atan2(dy, dx); // -π..π
    return {
      centroid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      distance,
      angle,
      // 双指连线是无向的：把方向归一到 (-90°, 90°]，避免两指跨过水平轴时 180° 跳变
      orientation: normDeg(angToDeg(angle)),
      dx,
      dy,
    };
  }

  const angToDeg = (a) => (a * 180) / Math.PI;

  /** 归一化角度差到 (-90°, 90°] */
  function normDeg(delta) {
    let d = delta % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    if (d > 90) d -= 180;
    if (d <= -90) d += 180;
    return d;
  }

  function beginGesture(pair, source) {
    const m = measure(pair);
    state.gestureActive = true;
    state.gestureStart = {
      ...m,
      scale: state.scale,
      rotation: state.rotation,
      tx: state.tx,
      ty: state.ty,
      source,
      startedAt: now(),
      peakScale: state.scale,
      peakRotation: state.rotation,
      lastOrientation: m.orientation,
      rotAccum: 0,
    };
    state.lastDistance = m.distance;
    state.lastAngle = m.angle;
    state.lastCentroid = m.centroid;
    dom.overlay.classList.add("is-hidden");
    log("gesture", "两指手势", `开始 · 间距 ${m.distance.toFixed(0)}px · 角度 ${deg(m.angle).toFixed(1)}°`);
  }

  function updateGesture(pair) {
    if (!state.gestureStart) return;
    const start = state.gestureStart;
    const m = measure(pair);

    // 旋转：对无向连线角度做增量累加，跨过 ±90° 时也不会翻转
    const dOrient = normDeg(m.orientation - start.lastOrientation);
    start.lastOrientation = m.orientation;
    start.rotAccum += dOrient;
    const dAngle = start.rotAccum;

    const distanceDelta = m.distance / start.distance;
    const nextScale = start.scale * distanceDelta;
    const nextRotation = start.rotation + dAngle;

    if (state.mode === "pinch" || state.mode === "both") {
      state.scale = clamp(nextScale, 0.2, 8);
    }
    if (state.mode === "rotate" || state.mode === "both") {
      state.rotation = nextRotation;
    } else {
      state.rotation = start.rotation;
    }

    // 平移：两指整体拖动
    const rect = dom.stage.getBoundingClientRect();
    const cx = m.centroid.x - rect.left - rect.width / 2;
    const cy = m.centroid.y - rect.top - rect.height / 2;
    const scx = start.centroid.x - rect.left - rect.width / 2;
    const scy = start.centroid.y - rect.top - rect.height / 2;
    state.tx = start.tx + (cx - scx);
    state.ty = start.ty + (cy - scy);

    const scaleDelta = Math.abs(state.scale - start.scale);
    const rotDelta = Math.abs(state.rotation - start.rotation);
    start.peakScale = Math.max(start.peakScale, state.scale);
    start.peakRotation = Math.max(start.peakRotation, state.rotation);
    state.lastDistance = m.distance;
    state.lastAngle = m.angle;
    state.lastCentroid = m.centroid;

    scheduleTransform(false);

    if (scaleDelta >= 0.18 || rotDelta >= 12) {
      markGestureProgress(scaleDelta, rotDelta);
    }
  }

  function markGestureProgress(scaleDelta, rotDelta) {
    if (scaleDelta >= 0.18 && !state.pinchDone) {
      state.pinchDone = true;
      setTest("pinch", "pass", "通过");
      log("good", "捏合", `缩放幅度 ${scaleDelta.toFixed(2)} ≥ 0.18`);
    }
    if (rotDelta >= 12 && !state.rotateDone) {
      state.rotateDone = true;
      setTest("rotate", "pass", "通过");
      log("good", "旋转", `旋转幅度 ${rotDelta.toFixed(1)}° ≥ 12°`);
    }
    if (state.pinchDone && state.rotateDone) {
      toastOverlay("双指手势可用", "缩放与旋转均已达到通过阈值");
    }
  }

  function endGesture(reason = "抬起") {
    if (!state.gestureActive) return;
    const start = state.gestureStart;
    state.gestureActive = false;
    if (start) {
      const dur = now() - start.startedAt;
      log(
        "gesture",
        "两指手势",
        `结束 · ${reason} · 用时 ${Math.round(dur)}ms · 缩放 ${state.scale.toFixed(2)}× · 旋转 ${state.rotation.toFixed(1)}°`
      );
    }
    state.gestureStart = null;
    state.lastDistance = null;
    state.lastAngle = null;
    state.lastCentroid = null;
  }

  /* ------------------------------------------------------------------ */
  /* Tests / verdict                                                     */
  /* ------------------------------------------------------------------ */
  const TEST_LABEL = {
    precision: "精准指针检测",
    pinch: "双指捏合",
    rotate: "双指旋转",
    pressure: "压力 / 接触面积",
    trajectory: "单指轨迹平滑度",
  };

  function setTest(name, status, text) {
    if (!(name in state.tests)) return;
    if (state.tests[name] === "pass" && status !== "pass") return;
    state.tests[name] = status;
    const li = dom.tests.querySelector(`[data-test="${name}"]`);
    const icon = li?.querySelector(".test-icon");
    const badge = li?.querySelector(".test-state");
    if (icon) icon.dataset.status = status;
    if (badge) {
      badge.dataset.status = status;
      badge.textContent = text;
    }
    updateProgress();
    updateVerdict();
  }

  function updateProgress() {
    const vals = Object.values(state.tests);
    const done = vals.filter((s) => s === "pass" || s === "warn" || s === "fail").length;
    if (dom.progress) dom.progress.textContent = `${done} / ${vals.length}`;
  }

  function gestureCoverage() {
    let score = 0;
    if (state.tests.pinch === "pass") score += 50;
    else if (state.tests.pinch === "warn") score += 25;
    if (state.tests.rotate === "pass") score += 50;
    else if (state.tests.rotate === "warn") score += 25;
    return score;
  }

  function precisionScore() {
    const p = state.precisionHits;
    let score = 0;
    if (p.size > 0) score += 34;
    if (p.pressure > 0) score += 24;
    if (p.tilt > 0) score += 14;
    if (p.touch > 0) score += 14;
    if (state.maxPointers >= 2) score += 14;
    return Math.min(100, score);
  }

  function smoothScore() {
    const s = state.smoothness;
    if (!s.points) return 0;
    const jumpPart = s.maxJump > 0 ? Math.max(0, 100 - (s.jumpCount / Math.max(1, s.points)) * 600) : 92;
    const coverage = clamp((s.points / 240) * 100, 0, 100);
    return Math.round(jumpPart * 0.55 + coverage * 0.45);
  }

  /* ------------------------------------------------------------------ */
  /* Quality score & Apple baseline                                      */
  /* ------------------------------------------------------------------ */
  const APPLE = {
    name: "MacBook Pro",
    // 参考分值：以 MacBook Pro 玻璃压感触控板的典型表现归一化到 0–100
    refScore: 98,
    rows: [
      { key: "precision", label: "精准信号", weight: 22, baseline: 100, hint: "直接上报触点面积 / 压力" },
      { key: "gesture", label: "手势覆盖", weight: 22, baseline: 100, hint: "捏合 + 旋转原生可用" },
      { key: "smooth", label: "轨迹连续", weight: 18, baseline: 96, hint: "低延迟、无断线" },
      { key: "rate", label: "采样率", weight: 16, baseline: 95, hint: "约 100–125 Hz" },
      { key: "pointers", label: "多点触控", weight: 10, baseline: 100, hint: "最多五指引发的系统手势" },
      { key: "pressure", label: "压力分层", weight: 12, baseline: 92, hint: "Force Touch 连续压力" },
    ],
  };

  function rateScore() {
    const r = state.rate;
    if (!r) return 0;
    if (r >= 110) return 100;
    if (r >= 90) return 92;
    if (r >= 70) return 82;
    if (r >= 55) return 70;
    if (r >= 40) return 55;
    if (r >= 25) return 40;
    return 20;
  }

  function pointersScore() {
    const n = state.maxPointers;
    if (n >= 5) return 100;
    if (n === 4) return 88;
    if (n === 3) return 72;
    if (n === 2) return 55;
    if (n === 1) return 30;
    return 0;
  }

  function pressureScore() {
    const n = state.pressureSeen.size;
    if (n >= 10) return 100;
    if (n >= 8) return 94;
    if (n >= 5) return 82;
    if (n >= 3) return 62;
    if (n === 2) return 45;
    if (n === 1) return 18;
    return 0;
  }

  function metricRows() {
    const values = {
      precision: precisionScore(),
      gesture: gestureCoverage(),
      smooth: smoothScore(),
      rate: rateScore(),
      pointers: pointersScore(),
      pressure: pressureScore(),
    };
    const measured = {
      precision: state.touchSeen,
      gesture: state.tests.pinch !== "idle" || state.tests.rotate !== "idle",
      smooth: state.smoothness.points >= 24,
      rate: state.eventCount >= 24,
      pointers: state.maxPointers >= 1,
      pressure: state.pressureSeen.size >= 1,
    };
    return APPLE.rows.map((row) => ({
      ...row,
      value: Math.round(values[row.key]),
      measured: Boolean(measured[row.key]),
    }));
  }

  function qualityScore() {
    const rows = metricRows();
    let weighted = 0;
    let weightSum = 0;
    for (const row of rows) {
      if (!row.measured) continue;
      weighted += row.value * row.weight;
      weightSum += row.weight;
    }
    return {
      rows,
      score: weightSum ? Math.round(weighted / weightSum) : 0,
      measuredCount: rows.filter((row) => row.measured).length,
      weightSum,
    };
  }

  function gradeOf(score, measuredCount) {
    if (measuredCount < 2) return { grade: "none", label: "等待测试" };
    if (score >= 90) return { grade: "S", label: "旗舰级，接近苹果水准" };
    if (score >= 80) return { grade: "A", label: "优秀，精准触控板第一梯队" };
    if (score >= 68) return { grade: "B", label: "良好，日常使用够用" };
    if (score >= 52) return { grade: "C", label: "一般，有明显短板" };
    return { grade: "D", label: "基础水平，接近普通鼠标" };
  }

  /** 差距最大的两项（缺分从多到少） */
  function gapList(rows) {
    return rows
      .filter((row) => row.measured)
      .map((row) => ({ ...row, deficit: row.baseline - row.value }))
      .filter((row) => row.deficit >= 8)
      .sort((a, b) => b.deficit - a.deficit)
      .slice(0, 2);
  }

  function gapText(rows) {
    const gaps = gapList(rows);
    if (!rows.some((row) => row.measured)) return "";
    if (!gaps.length) return "各项都贴近苹果基线，没有明显短板。";
    return `和苹果差距主要在：${gaps.map((g) => `${g.label}（${g.value}/${g.baseline}）`).join("、")}。`;
  }

  function initAppleRows() {
    if (!dom.appleRows || dom.appleRows.childElementCount) return;
    const frag = document.createDocumentFragment();
    for (const row of APPLE.rows) {
      const wrap = document.createElement("div");
      wrap.className = "cmp-row";
      wrap.dataset.key = row.key;

      const head = document.createElement("div");
      head.className = "cmp-head";

      const name = document.createElement("span");
      name.className = "cmp-name";
      name.append(document.createTextNode(row.label));
      const hint = document.createElement("em");
      hint.textContent = row.hint;
      name.append(hint);

      const vals = document.createElement("span");
      vals.className = "cmp-vals";
      const mine = document.createElement("b");
      mine.textContent = "待测";
      const sep = document.createTextNode("/ ");
      const ref = document.createElement("i");
      ref.textContent = String(row.baseline);
      vals.append(mine, sep, ref);

      head.append(name, vals);

      const bar = document.createElement("div");
      bar.className = "cmp-bar";
      const fill = document.createElement("span");
      fill.className = "cmp-fill";
      const mark = document.createElement("span");
      mark.className = "cmp-mark";
      mark.style.left = `${row.baseline}%`;
      bar.append(fill, mark);

      wrap.append(head, bar);
      frag.append(wrap);
    }
    dom.appleRows.append(frag);
  }

  function renderApple(q) {
    if (!dom.appleRows) return;
    for (const row of q.rows) {
      const node = dom.appleRows.querySelector(`[data-key="${row.key}"]`);
      if (!node) continue;
      node.classList.toggle("is-pending", !row.measured);
      node.dataset.delta = row.measured ? String(row.value - row.baseline) : "";
      const fill = node.querySelector(".cmp-fill");
      const val = node.querySelector(".cmp-vals b");
      if (fill) fill.style.width = row.measured ? `${row.value}%` : "0%";
      if (val) val.textContent = row.measured ? String(row.value) : "待测";
    }
    if (dom.appleSummary) {
      const text = gapText(q.rows);
      dom.appleSummary.textContent =
        q.measuredCount < 2
          ? "完成左侧测试后，这里会给出与 MacBook Pro 触控板的逐项差距。"
          : text;
    }
  }

  function updateVerdict() {
    const precision = precisionScore();
    const gesture = gestureCoverage();
    const smooth = smoothScore();

    if (dom.meterPrecision) {
      dom.meterPrecision.style.width = `${precision}%`;
      dom.meterGesture.style.width = `${gesture}%`;
      dom.meterSmooth.style.width = `${smooth}%`;
      dom.meterPrecisionVal.textContent = `${precision}%`;
      dom.meterGestureVal.textContent = `${gesture}%`;
      dom.meterSmoothVal.textContent = `${smooth}%`;
    }

    const q = qualityScore();
    const g = gradeOf(q.score, q.measuredCount);
    renderApple(q);

    if (dom.scoreValue) {
      dom.scoreValue.textContent = q.measuredCount >= 2 ? String(q.score) : "--";
    }
    if (dom.scoreGrade) {
      dom.scoreGrade.dataset.grade = g.grade;
      dom.scoreGrade.textContent = g.grade === "none" ? "—" : g.grade;
    }
    if (dom.scoreCaption) {
      dom.scoreCaption.textContent =
        q.measuredCount >= 2
          ? `已测 ${q.measuredCount} / 6 项 · 约等于 ${APPLE.name} 的 ${Math.round((q.score / APPLE.refScore) * 100)}%`
          : "按「测试项」逐项完成，实时计算素质评分";
    }

    let level = "unknown";
    let title = "等待测试";
    let desc = "把两根手指放在上方测试区，先试一次捏合缩放。";

    if (q.measuredCount >= 2) {
      title = `${g.grade} 级 · ${g.label}`;
      if (state.tests.pinch === "pass" && state.tests.rotate === "pass") {
        level = g.grade === "S" || g.grade === "A" ? "precision" : "likely";
        desc = `浏览器已识别到精准双指手势（捏合 + 旋转均通过）。${gapText(q.rows)}`;
      } else if (state.tests.pinch === "pass" || state.tests.rotate === "pass") {
        level = "likely";
        desc = `只通过了一部分双指手势，继续补测旋转或捏合会更准。${gapText(q.rows)}`;
      } else if (precision > 0) {
        level = "likely";
        desc = `有精准设备信号，但捏合 / 旋转还没通过，可能被系统合成为鼠标滚轮。${gapText(q.rows)}`;
      } else {
        level = "basic";
        desc = `当前只看到鼠标级信号，触控板可能未启用精准触控板模式。${gapText(q.rows)}`;
      }
    }

    state.verdictLevel = level;
    if (dom.verdict) dom.verdict.dataset.level = level;
    if (dom.verdictTitle) dom.verdictTitle.textContent = title;
    if (dom.verdictDesc) dom.verdictDesc.textContent = desc;
    if (dom.verdictSub) {
      dom.verdictSub.textContent = q.measuredCount >= 2 ? `已测 ${q.measuredCount} / 6` : "未开始";
    }
    state.quality = q;
    state.grade = g;
  }

  function toastOverlay(title, hint, timeout = 2600) {
    if (!dom.overlayBadge || !dom.overlayHint) return;
    dom.overlay.classList.remove("is-hidden");
    dom.overlayBadge.textContent = title;
    dom.overlayHint.textContent = hint || "";
    dom.overlay.style.opacity = "1";
    clearTimeout(state._toastTimer);
    state._toastTimer = setTimeout(() => {
      if (!state.pointers.size && !state.gestureActive) {
        dom.overlay.classList.add("is-hidden");
      }
    }, timeout);
  }

  /* ------------------------------------------------------------------ */
  /* Event rate                                                          */
  /* ------------------------------------------------------------------ */
  function trackRate() {
    const t = now();
    state.eventWindow.push(t);
    while (state.eventWindow.length && t - state.eventWindow[0] > 1000) state.eventWindow.shift();
    state.eventCount += 1;
    if (state.eventCount % 8 === 0) {
      state.rate = state.eventWindow.length;
      if (dom.fpRate) dom.fpRate.textContent = `${state.rate} /s`;
      updateVerdict();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Pointer handlers                                                    */
  /* ------------------------------------------------------------------ */
  function onPointerDown(ev) {
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    state.touchSeen = true;
    trackRate();
    const p = {
      id: ev.pointerId,
      x: ev.clientX,
      y: ev.clientY,
      kind: ev.pointerType || "mouse",
      width: ev.width || 0,
      height: ev.height || 0,
      pressure: ev.pressure || 0,
      tiltX: ev.tiltX || 0,
      tiltY: ev.tiltY || 0,
      startedAt: now(),
    };
    state.pointers.set(ev.pointerId, p);
    if (state.pointers.size === 1) {
      // 新的一笔：不要和上一笔的终点连成一条线
      state.trail.x = null;
      state.trail.y = null;
    }
    try {
      dom.stage.setPointerCapture?.(ev.pointerId);
    } catch {
      // 合成事件（自动化测试）没有活跃指针，忽略即可
    }
    drawPointer(p);
    state.maxPointers = Math.max(state.maxPointers, state.pointers.size);
    if (dom.fpMaxPointers) dom.fpMaxPointers.textContent = String(state.maxPointers);
    dom.stage.classList.add("is-grabbing");

    inspectPrecision(ev);
    log(
      "input",
      "pointerdown",
      `${p.kind} · id=${p.id} · ${Math.round(p.x)},${Math.round(p.y)} · w/h=${p.width.toFixed(1)}/${p.height.toFixed(1)} · p=${p.pressure.toFixed(2)}`
    );

    if (state.pointers.size === 2) {
      const pair = twoPointers();
      if (pair) beginGesture(pair, "pointer");
    } else if (state.pointers.size > 2) {
      // 3 指以上：只保留前两个作为手势参考，其余忽略
      log("input", "多指", `触点 ${state.pointers.size}，仅使用前两指`);
    }
  }

  function onPointerMove(ev) {
    const p = state.pointers.get(ev.pointerId);
    if (!p) return;
    trackRate();
    const dx = ev.clientX - p.x;
    const dy = ev.clientY - p.y;
    p.x = ev.clientX;
    p.y = ev.clientY;
    p.pressure = ev.pressure || p.pressure;
    p.width = ev.width || p.width;
    p.height = ev.height || p.height;
    p.tiltX = ev.tiltX || p.tiltX;
    p.tiltY = ev.tiltY || p.tiltY;
    drawPointer(p);
    inspectPrecision(ev);

    if (state.pointers.size === 1) {
      trackTrajectory(p, dx, dy, ev);
    } else if (state.pointers.size >= 2) {
      const pair = twoPointers();
      if (!pair) return;
      if (!state.gestureActive) beginGesture(pair, "pointer");
      updateGesture(pair);
    }
  }

  function onPointerUp(ev) {
    const p = state.pointers.get(ev.pointerId);
    if (!p) return;
    trackRate();
    state.pointers.delete(ev.pointerId);
    dom.pointersLayer.querySelector(`[data-pointer="${ev.pointerId}"]`)?.remove();
    try {
      dom.stage.releasePointerCapture?.(ev.pointerId);
    } catch {
      /* noop */
    }
    if (!state.pointers.size) dom.stage.classList.remove("is-grabbing");
    log("input", "pointerup", `${p.kind} · id=${p.id}`);
    buildFingerprint();
    if (state.pointers.size < 2) endGesture("抬起");
    updateVerdict();
    if (!state.pointers.size && !state.gestureActive) {
      // 手势结束 1.2s 后重新显示提示
      clearTimeout(state._hintTimer);
      state._hintTimer = setTimeout(() => {
        if (!state.pointers.size) {
          dom.overlay.classList.remove("is-hidden");
        }
      }, 1200);
    }
  }

  function onPointerCancel(ev) {
    if (!state.pointers.has(ev.pointerId)) return;
    const p = state.pointers.get(ev.pointerId);
    state.pointers.delete(ev.pointerId);
    dom.pointersLayer.querySelector(`[data-pointer="${ev.pointerId}"]`)?.remove();
    log("input", "pointercancel", `${p.kind} · id=${p.id}`);
    if (state.pointers.size < 2) endGesture("取消");
  }

  /* ------------------------------------------------------------------ */
  /* Precision inspection                                                */
  /* ------------------------------------------------------------------ */
  function inspectPrecision(ev) {
    if (ev.pointerType === "touch") state.precisionHits.touch = 1;
    const w = ev.width || 0;
    const h = ev.height || 0;
    if (w > 0 && h > 0) {
      if (state.precisionHits.size === 0) {
        log("good", "精准信号", `接触面积 w/h = ${w.toFixed(1)}×${h.toFixed(1)}`);
      }
      state.precisionHits.size = Math.max(state.precisionHits.size, 1);
    }
    const pressure = ev.pressure || 0;
    if (pressure > 0 && pressure !== 0.5) {
      state.precisionHits.pressure = 1;
      state.pressureMin = Math.min(state.pressureMin, pressure);
      state.pressureMax = Math.max(state.pressureMax, pressure);
      state.pressureSeen.add(Math.round(pressure * 20));
      if (state.pressureSeen.size >= 3) {
        setTest("pressure", "pass", "通过");
      } else {
        setTest("pressure", "warn", `${state.pressureSeen.size}/3`);
      }
    }
    if (ev.tiltX || ev.tiltY) state.precisionHits.tilt = 1;

    if (dom.fpType) dom.fpType.textContent = ev.pointerType || "—";
    if (dom.fpSize) dom.fpSize.textContent = w > 0 ? `${w.toFixed(1)} × ${h.toFixed(1)}` : "—";
    if (dom.fpPressure) {
      const range =
        Number.isFinite(state.pressureMin) && state.pressureMax > state.pressureMin
          ? ` (${state.pressureMin.toFixed(2)}–${state.pressureMax.toFixed(2)})`
          : "";
      dom.fpPressure.textContent = pressure > 0 ? `${pressure.toFixed(2)}${range}` : "—";
    }
    if (dom.fpTilt) dom.fpTilt.textContent = ev.tiltX || ev.tiltY ? `${ev.tiltX}° / ${ev.tiltY}°` : "—";

    if (state.precisionHits.touch || state.precisionHits.size) {
      setTest("precision", "pass", "通过");
    } else if (ev.pointerType === "mouse") {
      // 只有鼠标信号时给出警告，但不覆盖已有通过
      if (state.tests.precision === "idle") setTest("precision", "warn", "仅鼠标");
    }
    updateVerdict();
  }

  function buildFingerprint() {
    if (dom.fpMaxPointers) dom.fpMaxPointers.textContent = String(state.maxPointers);
    if (dom.fpDpr) dom.fpDpr.textContent = String(window.devicePixelRatio || 1);
    if (dom.fpPlatform) dom.fpPlatform.textContent = state.platform;
  }

  /* ------------------------------------------------------------------ */
  /* Trajectory smoothness                                               */
  /* ------------------------------------------------------------------ */
  function trackTrajectory(p, dx, dy, ev) {
    const s = state.smoothness;
    const step = Math.hypot(dx, dy);
    s.points += 1;
    drawTrail(p);
    // 单帧内位移超过 120px 视为可疑断点（触控板高采样率下几乎不会发生）
    if (step > 120) {
      s.jumpCount += 1;
      if (step > s.maxJump) s.maxJump = step;
    }
    if (ev.getCoalescedEvents) {
      const coalesced = ev.getCoalescedEvents?.() || [];
      if (coalesced.length > 1) {
        logOnce("coalesced", "合并事件", `getCoalescedEvents() 返回 ${coalesced.length} 个采样点`);
      }
    }
    if (s.points >= 120 && state.tests.trajectory === "idle") {
      const score = smoothScore();
      setTest("trajectory", score >= 80 ? "pass" : "warn", score >= 80 ? "通过" : `${score}%`);
      log("good", "轨迹", `采样 ${s.points} 点 · 断点 ${s.jumpCount} · 平滑度 ${score}%`);
    }
  }

  function logOnce(key, label, detail) {
    if (!state._loggedOnce) state._loggedOnce = new Set();
    if (state._loggedOnce.has(key)) return;
    state._loggedOnce.add(key);
    log("good", label, detail);
  }

  /* ------------------------------------------------------------------ */
  /* Wheel / trackpad synthesized gestures                               */
  /* ------------------------------------------------------------------ */
  function onWheel(ev) {
    // Windows 精准触控板双指捏合在 Chromium 中通常表现为 Ctrl + wheel
    if (ev.ctrlKey) {
      ev.preventDefault();
      trackRate();
      const factor = Math.exp(-ev.deltaY * 0.0022);
      state.scale = clamp(state.scale * factor, 0.2, 8);
      scheduleTransform(true);
      if (!state._wheelGesture) {
        state._wheelGesture = true;
        log("gesture", "Ctrl+滚轮", "识别为触控板捏合 → 缩放");
        dom.overlay.classList.add("is-hidden");
      }
      clearTimeout(state._wheelTimer);
      state._wheelTimer = setTimeout(() => {
        state._wheelGesture = false;
      }, 220);
      const delta = Math.abs(Math.log(state.scale));
      if (delta > 0.12) {
        if (state.tests.pinch !== "pass") {
          setTest("pinch", "pass", "通过");
          log("good", "捏合", `滚轮捏合 · 当前 ${state.scale.toFixed(2)}×`);
        }
      }
      updateVerdict();
      return;
    }

    // 普通滚轮：不拦截，避免破坏页面滚动
    if (state.precisionHits.touch || state.precisionHits.size) {
      logOnce("wheelpassive", "滚轮", `deltaY=${ev.deltaY.toFixed(1)} · mode=${ev.deltaMode}`);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Keyboard fallback                                                   */
  /* ------------------------------------------------------------------ */
  function onKeyDown(ev) {
    if (ev.target instanceof HTMLElement && /input|textarea|select/i.test(ev.target.tagName)) return;
    let handled = true;
    switch (ev.key) {
      case "=":
      case "+":
        state.scale = clamp(state.scale * 1.12, 0.2, 8);
        break;
      case "-":
      case "_":
        state.scale = clamp(state.scale / 1.12, 0.2, 8);
        break;
      case "[":
        state.rotation -= 5;
        break;
      case "]":
        state.rotation += 5;
        break;
      case "0":
      case "r":
      case "R":
        resetTransform();
        handled = true;
        break;
      case "f":
      case "F":
        toggleFullscreen();
        break;
      case "Escape":
        dom.report.hidden = true;
        break;
      default:
        handled = false;
    }
    if (handled) {
      applyTransform();
      ev.preventDefault();
    }
  }

  function toggleFullscreen() {
    const on = document.body.classList.toggle("is-fullscreen");
    log("gesture", "视图", on ? "进入全屏测试视图" : "退出全屏测试视图");
  }

  /* ------------------------------------------------------------------ */
  /* Report                                                              */
  /* ------------------------------------------------------------------ */
  function buildReport() {
    const tests = Object.entries(state.tests)
      .map(([k, v]) => `  ${TEST_LABEL[k]}：${v === "pass" ? "通过" : v === "warn" ? "部分" : v === "fail" ? "未通过" : "待测"}`)
      .join("\n");
    const q = state.quality || qualityScore();
    const g = state.grade || gradeOf(q.score, q.measuredCount);
    const cmp = q.rows
      .map((row) => {
        const mine = row.measured ? `${row.value}` : "待测";
        const delta = row.measured ? row.value - row.baseline : 0;
        const sign = !row.measured ? " " : delta > 0 ? "+" : delta < 0 ? "-" : "=";
        const diff = row.measured ? `${sign}${Math.abs(delta)}` : "";
        return `  ${row.label.padEnd(6, "　")} ${String(mine).padStart(4)} / ${String(row.baseline).padStart(3)}  权重 ${row.weight}%  ${diff}`;
      })
      .join("\n");
    return [
      "Precision Touchpad Lab — 触控板素质报告",
      `生成时间：${new Date().toLocaleString("zh-CN")}`,
      `平台：${state.platform}`,
      `UA：${state.userAgent}`,
      "",
      `综合评分：${q.measuredCount >= 2 ? `${q.score} / 100（${g.grade} 级，${g.label}）` : "测试未完成"}`,
      `已测维度：${q.measuredCount} / 6`,
      "判定：" + (state.verdictLevel === "precision"
        ? "精准触控板（Precision Touchpad）"
        : state.verdictLevel === "likely"
          ? "疑似精准触控板 / 部分手势可用"
          : state.verdictLevel === "basic"
            ? "未检测到精准触控板"
            : "未完成测试"),
      `精准信号得分：${precisionScore()}%   手势覆盖：${gestureCoverage()}%   轨迹平滑：${smoothScore()}%`,
      "",
      "对标 MacBook Pro（参考分 98）：",
      cmp,
      `  ${gapText(q.rows)}`,
      "",
      "测试项：",
      tests,
      "",
      "硬件指纹：",
      `  指针类型：${dom.fpType?.textContent || "—"}`,
      `  接触面积：${dom.fpSize?.textContent || "—"}`,
      `  压力：${dom.fpPressure?.textContent || "—"}`,
      `  最大触点：${state.maxPointers}`,
      `  事件频率：${state.rate} /s`,
      `  devicePixelRatio：${window.devicePixelRatio || 1}`,
      "",
      `精准信号命中：touch=${state.precisionHits.touch} size=${state.precisionHits.size} pressure=${state.precisionHits.pressure} tilt=${state.precisionHits.tilt}`,
      `手势结果：scale=${state.scale.toFixed(2)}× rotation=${state.rotation.toFixed(1)}°`,
      `轨迹采样：${state.smoothness.points} 点，断点 ${state.smoothness.jumpCount} 次`,
    ].join("\n");
  }

  function openReport() {
    state.reportText = buildReport();
    dom.reportText.textContent = state.reportText;
    dom.report.hidden = false;
    dom.btnCopy.disabled = false;
    updateVerdict();
    log("good", "报告", "已生成诊断报告");
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(state.reportText || buildReport());
      dom.btnCopy.textContent = "已复制";
      setTimeout(() => (dom.btnCopy.textContent = "复制"), 1500);
    } catch {
      log("bad", "复制", "剪贴板不可用，请手动选择报告文本");
    }
  }

  /* ------------------------------------------------------------------ */
  /* Capability probe                                                    */
  /* ------------------------------------------------------------------ */
  function setDot(el, stateName) {
    if (!el) return;
    el.dataset.state = stateName;
  }

  function probe() {
    const hasPointer = "PointerEvent" in window;
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasGesture = "ongesturestart" in window || "GestureEvent" in window;
    const hasHid = "hid" in navigator;

    state.capi = { hasPointer, hasTouch, hasGesture, hasHid };
    setDot(dom.chipPointer, hasPointer ? "on" : "off");
    setDot(dom.chipTouch, hasTouch ? "on" : "warn");
    setDot(dom.chipGesture, hasGesture ? "on" : "off");
    setDot(dom.chipHid, hasHid ? "on" : "off");

    buildFingerprint();
    log(
      "input",
      "环境",
      `Pointer=${hasPointer} Touch=${hasTouch} Gesture=${hasGesture} HID=${hasHid} · maxTouchPoints=${navigator.maxTouchPoints}`
    );

    if (navigator.userAgentData?.getHighEntropyValues) {
      navigator.userAgentData
        .getHighEntropyValues(["platform", "platformVersion", "architecture", "model"])
        .then((v) => {
          state.platform = v.platform || state.platform;
          if (dom.fpPlatform) dom.fpPlatform.textContent = state.platform;
          log("input", "高熵", `platform=${v.platform} ${v.platformVersion || ""} ${v.architecture || ""}`);
        })
        .catch(() => {});
    }
  }

  /* ------------------------------------------------------------------ */
  /* Wiring                                                              */
  /* ------------------------------------------------------------------ */
  function setMode(mode) {
    state.mode = mode;
    $$(".tab").forEach((tab) => {
      const active = tab.dataset.gesture === mode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    const text = { pinch: "捏合缩放", rotate: "旋转", both: "缩放 + 旋转" }[mode];
    dom.overlayBadge.textContent = `双指${text}`;
    log("gesture", "模式", `切换为「${text}」`);
  }

  function init() {
    probe();
    initAppleRows();
    applyTransform(true);
    updateVerdict();
    updateProgress();

    dom.stage.addEventListener("pointerdown", onPointerDown);
    dom.stage.addEventListener("pointermove", onPointerMove);
    dom.stage.addEventListener("pointerup", onPointerUp);
    dom.stage.addEventListener("pointercancel", onPointerCancel);
    dom.stage.addEventListener("lostpointercapture", (ev) => {
      if (state.pointers.has(ev.pointerId)) onPointerCancel(ev);
    });
    dom.stage.addEventListener("wheel", onWheel, { passive: false });
    dom.stage.addEventListener("contextmenu", (ev) => ev.preventDefault());
    dom.stage.addEventListener("gesturestart", (ev) => ev.preventDefault());

    $$(".tab").forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.gesture)));
    $("#btn-reset").addEventListener("click", () => resetTransform());
    $("#btn-fullscreen").addEventListener("click", toggleFullscreen);
    $("#btn-help").addEventListener("click", () => dom.help.showModal());
    $("#btn-report").addEventListener("click", openReport);
    $("#btn-copy").addEventListener("click", copyReport);
    $("#btn-close-report").addEventListener("click", () => (dom.report.hidden = true));
    $("#btn-clear-log").addEventListener("click", () => {
      state.log = [];
      renderLog();
    });

    document.addEventListener("keydown", onKeyDown);

    // 页面不可见时结束手势，避免卡住
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        state.pointers.clear();
        clearPointerDots();
        endGesture("页面隐藏");
      }
    });

    log("good", "就绪", "把两根手指放在测试区，做捏合或旋转");
    toastOverlay("准备就绪", "把两根手指放在触控板上做捏合、张开或旋转手势", 4000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
