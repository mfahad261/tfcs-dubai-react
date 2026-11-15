# TFCS Dubai website

Website and email server for **TFCS Technical & Cleaning Services**, Dubai.
Website: React 19, React Router 7 and Vite 7, plain CSS. Server: Express 5 and Nodemailer.
One `package.json` holds the dependencies for both.

## Run it

```bash
npm install
cp server/.env.example server/.env   # then put the mailbox password in SMTP_PASS
npm run build       # website in /dist: one HTML file per page, sitemap.xml, robots.txt
npm start           # production server: website + email API on http://localhost:5000
```

While editing: `npm run dev` (website with live reload, http://localhost:5173) and,
to test the forms, `npm run dev:server` in a second terminal with `VITE_API_URL=/api` in `.env`.

Needs Node.js 20 or newer.

## Folder structure

Organised by page: to change something on a page, open that page's folder.

```
public/                   favicons, og-image.jpg (social sharing)
scripts/prerender.mjs     builds one HTML file per page after the Vite build
server/                   Express server: serves /dist and the email API (see below)
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

## Email server

`server/server.js` serves the built website and the email API on one address.

| Route | What it does |
| --- | --- |
| `POST /api/booking` | Quote form. Emails the request to the mailbox (Reply-To: the customer), then a confirmation to the customer if they gave an email. |
| `POST /api/newsletter` | Footer form. Emails the new subscriber to the mailbox. |
| `GET /api/health` | `{"ok":true,"email":"configured"}` when the mailbox password is set. |
| any page | The matching built page from `/dist`, or the 404 page. |

```
server/
  server.js        starts the server, security headers, shutdown
  config/          settings from server/.env, mail connection
  routes/          API routes and website pages
  controllers/     quote and newsletter handlers
  services/        sending email
  templates/       email layout (HTML and plain text)
  validators/      rules for every form field
  middleware/      rate limits, allowed websites, redirects, errors, logging
  errors/          error type shown to visitors
```

- Mail goes through `smtp.hostinger.com` port 465 (SSL) as `info@tfcstechnicalandcleaningservices.com`.
  All settings are in `server/.env` (see `server/.env.example`). That file is never committed.
- Protection: field validation, a hidden spam-trap field, 5 quote requests per visitor every 15 minutes,
  requests from other websites blocked, 20 KB request limit.
- If the password is missing or wrong, the website keeps working and the forms still open WhatsApp.
- The server log shows `[mail] connected ...` at start and `[mail] sent ...` for every email.

Never put secrets in the website code or in `VITE_` variables: anything starting with `VITE_` is visible in the browser.

## Production

```bash
npm install
npm run build
npm start
```

Set the values from `server/.env.example` as environment variables or in `server/.env`, and keep SSL on for the domain.
Page titles and descriptions live in `src/data/seo.js`. The domain is set by `url` in `src/data/site.js`.

---
Website by [Qodexaa](https://qodexaa.com/).
