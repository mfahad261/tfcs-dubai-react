import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { site } from './data/site';
import { metaTags, seoFor, sitePaths } from './lib/seo';

export { site, sitePaths };

export const renderPage = (url) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function renderHead(url) {
  const seo = seoFor(url);
  const tags = metaTags(seo)
    .filter(([, , content]) => content !== null)
    .map(([attr, key, content]) => `<meta ${attr}="${key}" content="${esc(content)}" />`);
  const jsonLd = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');
  return [
    `<title>${esc(seo.title)}</title>`,
    ...tags,
    seo.canonical ? `<link rel="canonical" href="${esc(seo.canonical)}" />` : '',
    `<script type="application/ld+json" id="page-jsonld">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}
