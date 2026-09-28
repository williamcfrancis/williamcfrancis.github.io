import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { repoRoot } from './games.mjs';

const directory = path.resolve(repoRoot, 'public');
if (!existsSync(path.join(directory, 'index.html'))) {
  throw new Error('Build the site first with npm run build.');
}
const port = Number(process.env.PORT || 1313);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.wasm': 'application/wasm', '.pdf': 'application/pdf',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg', '.wav': 'audio/wav',
};
createServer((request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(directory, `.${pathname}`);
    if (file !== directory && !file.startsWith(directory + path.sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: `${pathname}/${url.search}` }).end();
        return;
      }
      file = path.join(file, 'index.html');
    }
    if (!existsSync(file) || !statSync(file).isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(400).end('Bad request');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}/ (static files; no Netlify functions)`);
});
