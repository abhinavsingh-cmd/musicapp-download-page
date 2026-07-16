const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 8080;
const APK_PATH = path.join(__dirname, 'app.apk');

let apkSize = 0;
let apkHash = '';
let downloadCount = 0;
const COUNT_FILE = path.join(__dirname, '.download-count');

try {
  const buf = fs.readFileSync(APK_PATH);
  apkSize = buf.length;
  apkHash = crypto.createHash('sha256').update(buf).digest('hex');
} catch (e) {
  console.error('Could not read app.apk:', e.message);
}

try {
  downloadCount = parseInt(fs.readFileSync(COUNT_FILE, 'utf8'), 10) || 0;
} catch (e) {
  downloadCount = 0;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  if (req.url === '/meta') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({
      size: apkSize,
      sizeFormatted: (apkSize / (1024 * 1024)).toFixed(1) + ' MB',
      sha256: apkHash,
      sha256Short: apkHash.substring(0, 16) + '...' + apkHash.substring(48),
      downloads: downloadCount,
    }));
    return;
  }

  if (req.url === '/count') {
    downloadCount++;
    try { fs.writeFileSync(COUNT_FILE, downloadCount.toString()); } catch (e) {}
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify({ downloads: downloadCount }));
    return;
  }

  if (req.url === '/download') {
    fs.readFile(APK_PATH, (err, data) => {
      if (err) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, {
        'Content-Type': 'application/x-download',
        'Content-Disposition': 'attachment; filename="MusicApp-download"',
        'Content-Transfer-Encoding': 'binary',
        'Content-Length': data.length,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(data);
    });
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`APK: ${(apkSize / (1024 * 1024)).toFixed(1)} MB | SHA-256: ${apkHash.substring(0, 16)}...`);
});
