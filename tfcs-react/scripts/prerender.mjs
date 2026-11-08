/**
 * Runs after the Vite build. Writes a real HTML file for every page, so search
 * engines get the full content and correct tags, plus sitemap.xml and robots.txt.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = resolve('dist');
const ssrDir = resolve('.ssr');
const { renderHead, renderPage, site, sitePaths } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const template = await readFile(join(dist, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) {
  throw new Error('index.html is missing the prerender markers');
}

const build = (url) =>
  template.replace(SEO_BLOCK, () => renderHead(url)).replace(ROOT, () => `<div id="root">${renderPage(url)}</div>`);

const fileFor = (url) => join(dist, url === '/' ? 'index.html' : `${url.slice(1)}.html`);

for (const url of sitePaths) {
  const file = fileFor(url);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, build(url));
}
await writeFile(join(dist, '404.html'), build('/404'));

const entries = sitePaths.map((url) => `  <url><loc>${site.url}${url}</loc></url>`).join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${sitePaths.length} pages, 404.html, sitemap.xml and robots.txt`);
