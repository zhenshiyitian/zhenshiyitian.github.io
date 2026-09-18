import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8000);
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/news.html', ['news.html', 'text/html; charset=utf-8']],
  ['/assets/css/home.css', ['assets/css/home.css', 'text/css; charset=utf-8']],
  ['/assets/css/news.css', ['assets/css/news.css', 'text/css; charset=utf-8']],
  ['/assets/js/home.js', ['assets/js/home.js', 'text/javascript; charset=utf-8']],
  ['/assets/img/home-favicon.svg', ['assets/img/home-favicon.svg', 'image/svg+xml']],
  ['/assets/img/pixel-avatar-sprite.svg', ['assets/img/pixel-avatar-sprite.svg', 'image/svg+xml']],
  ['/assets/img/pixel-cursor.svg', ['assets/img/pixel-cursor.svg', 'image/svg+xml']],
  ['/assets/img/card-coastal-hazards.svg', ['assets/img/card-coastal-hazards.svg', 'image/svg+xml']],
  ['/assets/img/card-tropical-cyclones.svg', ['assets/img/card-tropical-cyclones.svg', 'image/svg+xml']],
  ['/assets/img/card-compound-flooding.svg', ['assets/img/card-compound-flooding.svg', 'image/svg+xml']],
  ['/assets/img/card-storm-surge.svg', ['assets/img/card-storm-surge.svg', 'image/svg+xml']],
  ['/assets/img/card-infrastructure-resilience.svg', ['assets/img/card-infrastructure-resilience.svg', 'image/svg+xml']],
  ['/assets/img/news-cwra-2026.svg', ['assets/img/news-cwra-2026.svg', 'image/svg+xml']],
  ['/assets/img/news-phd-defense.svg', ['assets/img/news-phd-defense.svg', 'image/svg+xml']],
  ['/assets/img/news-rec-2024.svg', ['assets/img/news-rec-2024.svg', 'image/svg+xml']],
  ['/assets/img/news-jcss-2021.svg', ['assets/img/news-jcss-2021.svg', 'image/svg+xml']],
]);

const server = createServer(async (request, response) => {
  const entry = files.get(new URL(request.url, 'http://127.0.0.1').pathname);
  if (!entry) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  try {
    const body = await readFile(join(root, entry[0]));
    response.writeHead(200, { 'Content-Type': entry[1], 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Could not read the page.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Private preview: http://127.0.0.1:${port}`);
  console.log('Press Ctrl+C to stop.');
});
