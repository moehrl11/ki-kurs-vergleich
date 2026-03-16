import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

async function serveFile(res, filePath) {
  try {
    const data = await readFile(filePath);
    const mime = MIME[extname(filePath)] ?? 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`);
  let pathname = decodeURIComponent(url.pathname);

  // Trailing slash → try index.html
  if (pathname.endsWith('/')) pathname += 'index.html';

  let filePath = join(DIST, pathname);

  // Direct file hit
  if (await serveFile(res, filePath)) return;

  // Astro static output: /vergleich → /vergleich/index.html
  if (await serveFile(res, join(DIST, pathname, 'index.html'))) return;

  // 404
  const notFound = await serveFile(res, join(DIST, '404.html'));
  if (!notFound) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
