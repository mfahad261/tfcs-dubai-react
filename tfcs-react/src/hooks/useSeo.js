import { useEffect } from 'react';
import { metaTags, seoFor } from '../lib/seo';

/** Keeps the page title, meta tags, canonical link and JSON-LD in step with the current path. */
export function useSeo(pathname) {
  useEffect(() => {
    const seo = seoFor(pathname);
    document.title = seo.title;

    metaTags(seo).forEach(([attr, key, content]) => {
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (content === null) {
        tag?.remove();
        return;
      }
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = seo.canonical;
    } else {
      canonical?.remove();
    }

    let ld = document.getElementById('page-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'page-jsonld';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(seo.jsonLd);
  }, [pathname]);
}
