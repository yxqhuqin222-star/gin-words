// 云函数 wordProgress：单词卡学习进度读写（CloudBase PostgreSQL）
// 部署为 Web 函数（HTTP），由 scf_bootstrap 启动本 HTTP server。
// 服务端使用 app.rdb()（PostgREST/Supabase 风格）读写 word_progress 表。
const http = require('http');
const cloudbase = require('@cloudbase/node-sdk');
const ENV = 'xiaoqin-d0g0prppaa09e675e';

const app = cloudbase.init({ env: ENV });
const db = app.rdb({ database: 'public' });

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === 'string' && req.body.length) {
      try { return resolve(JSON.parse(req.body)); } catch (e) { /* fallthrough */ }
    }
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { resolve({}); }
    });
  });
}

function send(res, obj) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.statusCode = 204; return res.end(); }
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return send(res, { ok: false, error: 'method not allowed' });
  }

  try {
    const event = await readBody(req);
    const { action = 'get', uid, mastered } = event || {};
    if (!uid) return send(res, { ok: false, error: 'uid required' });

    if (action === 'get') {
      const r = await db.from('word_progress').select().eq('uid', uid);
      const row = r.data && r.data[0];
      return send(res, { ok: true, mastered: row ? (row.mastered || []) : [] });
    }

    if (action === 'set') {
      const list = Array.isArray(mastered) ? mastered : [];
      const r = await db.from('word_progress').upsert({ uid, mastered: list });
      return send(res, { ok: true, status: r.status, data: r.data });
    }

    return send(res, { ok: false, error: 'unknown action: ' + action });
  } catch (e) {
    return send(res, { ok: false, error: String((e && e.message) || e) });
  }
});

const port = 9000;
server.listen(port, () => console.log('wordProgress listening on', port));
