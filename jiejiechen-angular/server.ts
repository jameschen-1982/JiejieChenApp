import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  server.disable('x-powered-by');
  server.use((_req, res, next) => {
    res.set({
      'Content-Security-Policy': "object-src 'none'; base-uri 'self'; frame-ancestors 'self'; form-action 'self'; upgrade-insecure-requests",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Strict-Transport-Security': 'max-age=31536000',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    });
    next();
  });
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine({ allowedHosts: ['www.jiejiechen.com'] });

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '/background/*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  );

  // All regular routes use the Angular engine
  server.get('/background', (req, res, next) => {
    const { originalUrl, baseUrl } = req;
    // Never allow a viewer-supplied Host or forwarded protocol to become the
    // origin used by Angular SSR. This endpoint has one canonical public host.
    const publicOrigin = 'https://www.jiejiechen.com';
    const renderUrl = new URL(originalUrl, publicOrigin);
    if (renderUrl.origin !== publicOrigin || !renderUrl.pathname.startsWith('/background')) {
      res.sendStatus(400);
      return;
    }

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: renderUrl.toString(),
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
