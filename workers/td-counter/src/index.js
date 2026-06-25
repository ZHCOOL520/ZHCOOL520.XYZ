// TD 计数器 - Cloudflare Worker (D1 版)
// 替代 KV 方案，D1 免费额度：500万读/天、10万写/天，完全够用

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    // 初始化表
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS counter (id INTEGER PRIMARY KEY DEFAULT 1, value INTEGER NOT NULL DEFAULT 0)
    `);
    await env.DB.exec(`INSERT OR IGNORE INTO counter (id, value) VALUES (1, 0)`);

    const getValue = async () => {
      const r = await env.DB.prepare('SELECT value FROM counter WHERE id = 1').all();
      return r.results[0]?.value || 0;
    };

    // GET /get - 获取当前计数
    if (path === '/get') {
      return new Response(JSON.stringify({ value: await getValue() }), { headers });
    }

    // POST /hit - 计数 +1（幂等兼容，仅做 +1）
    if (path === '/hit') {
      await env.DB.prepare('UPDATE counter SET value = value + 1 WHERE id = 1').run();
      return new Response(JSON.stringify({ value: await getValue() }), { headers });
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers });
  },
};
