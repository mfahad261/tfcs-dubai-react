import { site } from '../data/site';
import { areas } from '../data/areas';
import { homeFaqs } from '../data/home';
import { services, serviceBySlug } from '../data/services';
import { notFoundMeta, pageMeta, serviceDescriptions } from '../data/seo';

const CONTEXT = 'https://schema.org';
const BUSINESS_ID = `${site.url}/#business`;
const OG_IMAGE = `${site.url}/og-image.jpg`;

const abs = (path) => `${site.url}${path}`;
const servicePath = (s) => `/services/${s.slug}`;

function businessJsonLd() {
  return {
    '@context': CONTEXT,
    '@type': 'HouseCleaningService',
    '@id': BUSINESS_ID,
    name: site.name,
    legalName: site.legalName,
    url: abs('/'),
    image: OG_IMAGE,
    telephone: site.phone.tel,
    email: site.email,
    hasMap: site.mapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.base}`,
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: site.address.country,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
    areaServed: [
      { '@type': 'City', name: 'Dubai' },
      ...areas.map((a) => ({ '@type': 'Place', name: `${a.name}, Dubai` })),
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cleaning and technical services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(servicePath(s)) },
      })),
    },
  };
}

const faqJsonLd = (faqs) => ({
  '@context': CONTEXT,
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

/** crumbs: [[name, path], ...] after Home */
const breadcrumbJsonLd = (crumbs) => ({
  '@context': CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...crumbs].map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: abs(path),
  })),
});

function serviceJsonLd(service, path, description) {
  return [
    {
      '@context': CONTEXT,
      '@type': 'Service',
      name: service.title,
      serviceType: service.name,
      description,
      url: abs(path),
      image: abs(service.image),
      areaServed: { '@type': 'City', name: 'Dubai' },
      provider: { '@id': BUSINESS_ID },
    },
    breadcrumbJsonLd([
      ['Services', '/services'],
      [service.name, path],
    ]),
    faqJsonLd(service.faqs),
  ];
}

/** Everything search engines need for a URL path. */
export function seoFor(rawPath) {
  const path = rawPath.replace(/\/+$/, '') || '/';
  const business = businessJsonLd();
  const slug = path.match(/^\/services\/([^/]+)$/)?.[1];
  const service = slug && serviceBySlug[slug];

  if (service) {
    const description = serviceDescriptions[slug] || service.lede;
    return {
      title: `${service.title} | TFCS`,
      description,
      canonical: abs(path),
      jsonLd: [business, ...serviceJsonLd(service, path, description)],
    };
  }

  const page = pageMeta[path];
  if (!page) return { ...notFoundMeta, noindex: true, jsonLd: [business] };

  const extra =
    path === '/'
      ? [{ '@context': CONTEXT, '@type': 'WebSite', name: site.name, url: abs('/') }, faqJsonLd(homeFaqs)]
      : [breadcrumbJsonLd([[page.crumb, path]])];

  return {
    title: page.title,
    description: page.description,
    canonical: abs(path),
    jsonLd: [business, ...extra],
  };
}

/** Meta tags for a page, shared by the build step and the browser. null means "no tag". */
export function metaTags(seo) {
  return [
    ['name', 'description', seo.description],
    ['name', 'robots', seo.noindex ? 'noindex' : null],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'og:url', seo.canonical ?? null],
    ['property', 'og:image', OG_IMAGE],
    ['name', 'twitter:title', seo.title],
    ['name', 'twitter:description', seo.description],
    ['name', 'twitter:image', OG_IMAGE],
  ];
}

/** Every indexable path, used for the static pages and the sitemap. */
export const sitePaths = [...Object.keys(pageMeta), ...services.map(servicePath)];
