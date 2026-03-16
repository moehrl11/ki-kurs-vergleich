import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

createServer((req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';

  let filePath = join(DIST, url);

  // Clean URLs: /ratgeber/artikel → /ratgeber/artikel/index.html
  if (!existsSync(filePath)) {
    filePath = join(DIST, url, 'index.html');
  }

  // 404 fallback
  if (!existsSync(filePath)) {
    filePath = join(DIST, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(existsSync(filePath) ? readFileSync(filePath) : '<h1>404</h1>');
    return;
  }

  const ext = extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(readFileSync(filePath));

}).listen(PORT, () => {
  console.log(`KI-Kompass läuft auf Port ${PORT}`);
});}

  // 404 Fallback
  if (!existsSync(filePath)) {
    filePath = join(DIST, '404.html');
    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('404 Not Found');
      return;
    }
  }

  const ext = extname(filePath);
  const contentType = MIME[ext] || 'text/plain';
  res.writeHead(200, { 'Content-Type': contentType });
  res.end(readFileSync(filePath));

}).listen(PORT, () => {
  console.log(`KI-Kompass läuft auf Port ${PORT}`);
});
