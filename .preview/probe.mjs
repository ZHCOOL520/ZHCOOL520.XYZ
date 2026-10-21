import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9224;
const OUT = path.resolve('.preview');
const profile = path.join(process.env.TEMP, 'dsh-chrome-probe');
fs.rmSync(profile, { recursive: true, force: true });

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
  '--window-size=1440,1300', 'about:blank'
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
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1300, deviceScaleFactor: 1, mobile: false });
const loaded = once('Page.loadEventFired');
await send('Page.navigate', { url: 'http://localhost:5173/tz' });
await loaded;
await sleep(2000);
const evalJs = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result.value;
};

await evalJs(`(() => { const el = document.querySelector('#tz-community'); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'instant' }); return 'ok'; })()`);
await sleep(2500);

const stats = await evalJs(`(() => {
  const q = (s) => [...document.querySelectorAll(s)];
  return {
    comTitleOpacity: q('.tz-com-title').map(e => getComputedStyle(e).opacity),
    comCards: q('.tz-com-card').map(e => getComputedStyle(e).opacity),
    contactOpacity: q('.tz-contact-section').map(e => getComputedStyle(e).opacity),
    comSectionTop: document.querySelector('#tz-community')?.getBoundingClientRect().top,
    scrollY: window.scrollY,
    bodyH: document.body.scrollHeight,
    comCardsCount: q('.tz-com-card').length
  };
})()`);
const shot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(path.join(OUT, 'community.png'), Buffer.from(shot.data, 'base64'));
console.log(JSON.stringify(stats, null, 2));

ws.close();
chrome.kill();
setTimeout(() => process.exit(0), 300);
