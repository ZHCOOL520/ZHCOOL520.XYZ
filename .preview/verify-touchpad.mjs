import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;
const BASE = 'http://localhost:5173';
const OUT = path.resolve('.preview');
const profile = path.join(process.env.TEMP, 'dsh-chrome-verify-touchpad');
fs.rmSync(profile, { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1440,1000', 'about:blank'
], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitJson(url, tries = 100) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(url); if (r.ok) return await r.json(); } catch {}
    await sleep(200);
  }
  throw new Error('devtools not ready');
}
await waitJson(`http://127.0.0.1:${PORT}/json/version`);
const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let id = 0; const pending = new Map(); const events = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const { res, rej } = pending.get(msg.id); pending.delete(msg.id); msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result); }
  else if (msg.method) (events.get(msg.method) || []).forEach((fn) => fn(msg.params));
};
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
const once = (method, timeout = 20000) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('timeout ' + method)), timeout);
  const arr = events.get(method) || [];
  arr.push((p) => { clearTimeout(t); res(p); });
  events.set(method, arr);
});

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });

const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error('eval failed: ' + JSON.stringify(r.exceptionDetails).slice(0, 400));
  return r.result.value;
};
const navigate = async (url) => { const loaded = once('Page.loadEventFired'); await send('Page.navigate', { url }); await loaded; };

async function waitFor(expr, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try { if (await evalJs(expr)) return true; } catch {}
    await sleep(200);
  }
  return false;
}
const shot = async (file, extra = {}) => {
  const r = await send('Page.captureScreenshot', { format: 'png', ...extra });
  fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
};
const fullShot = async (file) => {
  const m = await send('Page.getLayoutMetrics');
  const w = Math.ceil(m.cssContentSize.width);
  const h = Math.min(Math.ceil(m.cssContentSize.height), 4500);
  await shot(file, { clip: { x: 0, y: 0, width: w, height: h, scale: 1 }, captureBeyondViewport: true });
};

const report = {};

// ---------- 1. React demo page ----------
await navigate(`${BASE}/precision-touchpad-lab`);
await waitFor(`!!document.querySelector('#root h1')`);
await sleep(1500);
await evalJs(`window.scrollTo({ top: 0, behavior: 'instant' }); 'ok'`);
await sleep(300);
report.reactPage = await evalJs(`(() => {
  const f = document.querySelector('#root iframe');
  let frame = { exists: !!f, src: f?.getAttribute('src'), title: null, hasText: null, bodyH: null };
  try {
    const d = f.contentDocument;
    frame.title = d?.title;
    frame.hasText = (d?.body?.innerText || '').includes('触控板');
    frame.bodyH = Math.round(d?.body?.getBoundingClientRect().height || 0);
  } catch (e) { frame.error = String(e); }
  return {
    h1: document.querySelector('#root h1')?.textContent,
    canonical: document.querySelector('link[rel=canonical]')?.href,
    title: document.title,
    iframe: frame,
    sections: [...document.querySelectorAll('#root h2')].map(h => h.textContent.trim()).slice(0, 8),
    iframeRect: (() => { const r = f.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; })()
  };
})()`);
await fullShot('touchpad-react-full.png');

// ---------- 2. static demo page + pointer events ----------
await navigate(`${BASE}/precision-touchpad-lab/index.html`);
await waitFor(`!!document.querySelector('#stage')`);
await sleep(1000);
report.staticPage = await evalJs(`(() => {
  const stage = document.querySelector('#stage');
  const r = stage.getBoundingClientRect();
  return {
    title: document.title,
    h1text: (document.querySelector('h1')?.textContent || '').trim().slice(0, 60),
    stage: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
    tests: [...document.querySelectorAll('.test')].map(t => t.dataset.test),
    grade: document.querySelector('#score-grade')?.textContent,
    pointerType0: document.querySelector('#fp-pointer-type')?.textContent
  };
})()`);

const st = report.staticPage.stage;
const sx = st.x + st.w / 2, sy = st.y + st.h / 2;
const mouse = (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1, buttons: 1, ...extra });
await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: sx, y: sy, buttons: 0 });
await sleep(150);
await mouse('mousePressed', sx, sy);
await sleep(80);
for (let i = 1; i <= 12; i++) {
  await mouse('mouseMoved', sx + i * 18, sy + Math.sin(i / 2) * 40);
  await sleep(16);
}
report.duringPress = await evalJs(`({
  hudPointers: document.querySelector('#hud-pointers')?.textContent,
  pointerType: document.querySelector('#fp-pointer-type')?.textContent,
  hudRate: document.querySelector('#hud-rate')?.textContent,
  logLines: document.querySelectorAll('#log-list li').length
})`);
await mouse('mouseReleased', sx + 12 * 18, sy);
await sleep(1200);
report.afterRelease = await evalJs(`({
  hudPointers: document.querySelector('#hud-pointers')?.textContent,
  pointerType: document.querySelector('#fp-pointer-type')?.textContent,
  grade: document.querySelector('#score-grade')?.textContent,
  verdict: document.querySelector('#verdict')?.textContent?.trim().slice(0, 40),
  testStates: [...document.querySelectorAll('.test')].map(t => ({ k: t.dataset.test, s: t.querySelector('.test-state')?.textContent, st: t.querySelector('.test-state')?.dataset.status }))
})`);
await sleep(400);
await shot('touchpad-demo.png');

// ---------- 3. homepage projects section ----------
await navigate(`${BASE}/`);
await waitFor(`!!document.querySelector('#root h1')`);
await sleep(500);
for (let i = 0; i < 14; i++) { await evalJs(`window.scrollBy(0, 420)`); await sleep(220); }
const mounted = await waitFor(`document.querySelectorAll('#projects .project-card').length > 0`, 80);
await sleep(1000);
report.home = await evalJs(`(() => {
  const cards = [...document.querySelectorAll('#projects .project-card')];
  const target = cards.find(c => c.textContent.includes('Precision Touchpad Lab'));
  if (target) target.scrollIntoView({ block: 'center', behavior: 'instant' });
  const demoLinks = [...document.querySelectorAll('#projects .project-card a')].filter(a => a.textContent.includes('示例'));
  return {
    mounted: ${mounted},
    count: cards.length,
    demoLinks: demoLinks.map(a => a.getAttribute('href')),
    targetFound: !!target,
    targetText: target ? target.textContent.replace(/\\s+/g, ' ').trim().slice(0, 200) : null,
    githubButtons: [...document.querySelectorAll('#projects .project-card a')].filter(a => a.textContent.includes('源码')).length
  };
})()`);
await sleep(900);
await shot('touchpad-home.png');

// ---------- 4. project detail page ----------
await navigate(`${BASE}/projects/precision-touchpad-lab`);
await waitFor(`!!document.querySelector('h1')`);
await sleep(800);
report.detail = await evalJs(`(() => {
  const links = [...document.querySelectorAll('a')];
  const demo = links.find(a => a.textContent.includes('在线演示'));
  return {
    h1: document.querySelector('h1')?.textContent,
    hasDemoBtn: !!demo, demoHref: demo?.getAttribute('href'),
    hasGithubBtn: links.some(a => a.textContent.includes('在 GitHub 上查看源码')),
    h2s: [...document.querySelectorAll('h2')].map(h => h.textContent.trim().replace(/\\s+/g, ' ')),
    features: document.querySelectorAll('main li, #root li').length
  };
})()`);
await shot('touchpad-detail.png');

// ---------- 5. projects list page ----------
await navigate(`${BASE}/projects`);
await waitFor(`!!document.querySelector('#root h1')`);
await sleep(900);
report.list = await evalJs(`(() => {
  const demoLinks = [...document.querySelectorAll('a')].filter(a => a.textContent.includes('示例'));
  const zeroStars = [...document.querySelectorAll('#root span, #root div')].filter(e => /^⭐\\s*0$/.test(e.textContent.trim()));
  return {
    demoLinks: demoLinks.map(a => a.getAttribute('href')),
    starZeroBadges: zeroStars.length,
    touchpadLinks: [...document.querySelectorAll('a[href="/precision-touchpad-lab"]')].length,
    h1: document.querySelector('#root h1')?.textContent
  };
})()`);

console.log(JSON.stringify(report, null, 2));
ws.close();
chrome.kill();
setTimeout(() => process.exit(0), 300);
