# TFCS Dubai website (React + Vite)

Front-end for **TFCS Technical & Cleaning Services**, Dubai.
Built with React 19, React Router 7 and Vite 7. No UI library: the design is plain CSS.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist: one HTML file per page, sitemap.xml, robots.txt
npm run preview   # test the production build locally
```

Needs Node.js 18 or newer.

## Folder structure

Organised by page: to change something on a page, open that page's folder.

```
public/                   favicon, robots.txt, _redirects (old URL redirects), og-image.jpg (social sharing)
src/
  pages/                  one folder per page, holding the page and all its sections
    Home/                 Home.jsx + Hero, QuoteBar, BeforeAfter, Testimonials, ...
    Services/             Services.jsx + ServicesHero, ServiceExplorer (filter list), ...
    ServiceDetail/        ServiceDetail.jsx + hero, includes, process, FAQ, more services
    Amc/                  Amc.jsx + PlanCards
    Areas/                Areas.jsx + AreaGrid
    About/                About.jsx + AboutStory, Differentiators, Values
    Contact/              Contact.jsx + QuoteForm, ContactCard
    NotFound/             404 page
  layout/                 parts on every page: Header, MegaMenu, MobileMenu, Footer,
                          CtaBand, FloatingActions, Intro, RouteTransition (page curtain)
  components/             small pieces reused everywhere: Icon, IconSprite (all icons),
                          Logo, WhatsAppLink, Accordion
  data/                   ALL text and content (see below)
  assets/                 images: banners/, gallery/, logo/, services/
  context/                shared state: intro ready, toast messages, booking preset
  hooks/                  scroll reveal, SEO tags, media queries, hover effects
  lib/                    helpers: WhatsApp links, backend API, validation, formatting
  style/                  global CSS split into ordered files (index.css imports them)
  App.jsx                 routes and site layout
  main.jsx                entry point
```

## Editing content

You rarely need to touch components. Edit the files in `src/data/`:

| File | What it controls |
| --- | --- |
| `site.js` | phone, WhatsApp number, email, address, Google Maps link, developer credit |
| `services.js` | every service: name, text, photo, icon, what's included, process, FAQs |
| `home.js` | home cards, before/after jobs, checklist, reviews, why-us, FAQs |
| `areas.js` | areas list, home coverage band, footer areas |
| `plans.js` | AMC plans and the comparison table |
| `navigation.js` | main menu |

Adding a service to `services.js` automatically adds it to the mega menu, mobile menu,
services page, ticker, footer, booking dropdowns and gives it its own page.

**Before/after photos:** in `data/home.js`, set `before:` on a job to a real "before" photo.
Jobs without one show the after photo with a "dirty" filter.

**Reviews:** the reviews in `data/home.js` are placeholders. Replace them with real ones.

## Routes

`/`, `/services`, `/services/:slug`, `/amc`, `/areas`, `/about`, `/contact`.
Old links from the single-file site (`/#/services/...`) redirect automatically.

## Backend hook (email)

Bookings work today without a backend: the quote form opens WhatsApp with all the details.

When the backend is ready:

1. Copy `.env.example` to `.env` and set `VITE_API_URL` (for example `http://localhost:5000/api`).
2. The form will also `POST {VITE_API_URL}/booking` with:
   ```json
   { "service", "propertyType", "date", "slot", "name", "phone", "email", "area", "notes", "submittedAt" }
   ```
   The newsletter form posts `{ "email" }` to `{VITE_API_URL}/newsletter`.
3. All of this lives in `src/lib/api.js`. The form has a hidden honeypot field (`website`) to stop bots.

Never put secret keys (email API keys, SMTP passwords) in this front-end or in `VITE_` variables:
anything starting with `VITE_` is visible in the browser. Keep them on the backend.

## Deploying to Netlify

`netlify.toml` is included: build command `npm run build`, and publish folder `dist`.
Every page is built as its own HTML file, so deep links work on refresh and unknown URLs return a real 404.
Page titles and descriptions live in `src/data/seo.js`. Update `url` in `src/data/site.js` if the domain changes.
Add `VITE_API_URL` under Site configuration → Environment variables when you have a backend.

---
Website by [Qodexaa](https://qodexaa.com/).
