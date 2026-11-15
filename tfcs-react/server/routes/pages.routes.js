import { existsSync } from 'node:fs';
import { join } from 'node:path';
import express, { Router } from 'express';
import { env } from '../config/env.js';

const ONE_YEAR = 31_536_000;

export const pageRoutes = Router();

pageRoutes.get('/services/window-faucet-cleaning', (req, res) => res.redirect(301, '/services/window-facade-cleaning'));

pageRoutes.use(
  express.static(env.clientDist, {
    extensions: ['html'],
    redirect: false, // /services is both a page and a folder, handled below
    setHeaders(res, filePath) {
      const hashedAsset = /[\\/]assets[\\/]/.test(filePath);
      res.setHeader('Cache-Control', hashedAsset ? `public, max-age=${ONE_YEAR}, immutable` : 'no-cache');
    },
  })
);

/**
 * The build writes one HTML file per route (index.html, about.html,
 * services/water-tank-cleaning.html). Send the matching one, or the 404 page.
 */
pageRoutes.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  const route = req.path.replace(/^\/+|\/+$/g, '') || 'index';
  const file = `${route}.html`;

  if (!route.includes('..') && existsSync(join(env.clientDist, file))) {
    res.set('Cache-Control', 'no-cache').sendFile(file, { root: env.clientDist });
    return;
  }

  if (existsSync(join(env.clientDist, '404.html'))) {
    res.status(404).sendFile('404.html', { root: env.clientDist });
    return;
  }

  res.status(503).type('text').send('The website has not been built yet. Run: npm run build');
});
