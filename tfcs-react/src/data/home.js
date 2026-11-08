import livingAfter from '../assets/gallery/living-after.webp';
import livingBefore from '../assets/gallery/living-before.webp';
import deep from '../assets/services/deep.webp';
import office from '../assets/services/office.webp';
import commercial from '../assets/services/commercial.webp';
import carpet from '../assets/services/carpet.webp';
import warehouse from '../assets/services/warehouse.webp';

/** Services featured on the home page grid, in display order. */
export const featuredServices = [
  {
    slug: 'deep-cleaning-dubai',
    badge: 'Most requested',
    peek: 'A complete top-to-bottom clean for villas and family homes.',
  },
  { slug: 'apartment-deep-cleaning', peek: 'A full deep clean for studios, apartments and penthouses.' },
  { slug: 'office-deep-cleaning', peek: 'A thorough reset for offices of every size.' },
  {
    slug: 'commercial-deep-cleaning-dubai',
    peek: 'Intensive deep cleaning for retail stores, clinics, restaurants, gyms and showrooms, scheduled after hours so your business keeps running.',
  },
  {
    slug: 'carpet-shampoo-cleaning',
    peek: 'Deep shampoo washing that lifts embedded dust, sand, stains and odours from wall-to-wall carpets and rugs, and brings back their colour and softness.',
  },
  {
    slug: 'upholstery-cleaning',
    peek: 'Fabric-safe deep cleaning for sofas, armchairs, dining chairs, mattresses and headboards.',
  },
];

/**
 * Before / after slider jobs.
 * When `before` is missing, the after photo is shown with a "dirty" filter.
 * Add real before photos as you get them.
 */
export const transformations = [
  {
    label: 'Kitchen deep clean',
    service: 'Deep cleaning',
    after: deep,
    before: null,
    beforeText: 'Greasy cabinets, stained countertops',
    afterText: 'Sparkling surfaces, sanitised appliances',
  },
  {
    label: 'Apartment living room',
    service: 'Apartment deep clean',
    after: livingAfter,
    before: livingBefore,
    beforeText: 'Dusty furniture, dull floors',
    afterText: 'Fresh upholstery, polished marble floors',
  },
  {
    label: 'Office workspace',
    service: 'Office deep clean',
    after: office,
    before: null,
    beforeText: 'Cluttered desks, dusty monitors',
    afterText: 'Sanitised workstations, clean common areas',
  },
  {
    label: 'Bathroom restoration',
    service: 'Deep cleaning',
    after: commercial,
    before: null,
    beforeText: 'Soap scum, hard water stains',
    afterText: 'Gleaming tiles, fresh fixtures',
  },
  {
    label: 'Carpet revival',
    service: 'Carpet shampoo wash',
    after: carpet,
    before: null,
    beforeText: 'Stained, matted fibres',
    afterText: 'Restored colour, soft texture',
  },
  {
    label: 'Warehouse floor',
    service: 'Warehouse deep clean',
    after: warehouse,
    before: null,
    beforeText: 'Dust, debris and tyre marks',
    afterText: 'Scrubbed floors, clean racking',
  },
];

/** Quality checklist tabs. */
export const checklist = [
  {
    key: 'kitchen',
    label: 'Kitchen',
    items: [
      ['Hob, hood and filters', 'Degreased, filters soaked and rinsed'],
      ['Oven, fridge and freezer', 'Cleaned inside and out'],
      ['Cabinets and drawers', 'Inside, outside, tops and handles'],
      ['Sink and taps', 'Descaled and polished'],
      ['Tiles and grout', 'Scrubbed along every line'],
    ],
  },
  {
    key: 'bath',
    label: 'Bathrooms',
    items: [
      ['Shower glass', 'Soap scum and hard-water stains removed'],
      ['Grout and silicone', 'Scrubbed, rinsed and mould treated'],
      ['Taps and fittings', 'Descaled and polished'],
      ['Toilet and basin', 'Disinfected, including the base'],
      ['Mirrors and cabinets', 'Streak-free, inside and out'],
    ],
  },
  {
    key: 'bed',
    label: 'Bedrooms',
    items: [
      ['Wardrobes', 'Tops, rails, shelves and doors'],
      ['Under the bed', 'Moved, vacuumed and mopped'],
      ['Headboards and frames', 'Dusted and wiped'],
      ['Mattress', 'Vacuumed, with steam cleaning on request'],
      ['Blinds and curtains', 'Dusted slat by slat'],
    ],
  },
  {
    key: 'living',
    label: 'Living areas',
    items: [
      ['Skirting and sockets', 'Wiped by hand, room by room'],
      ['AC grilles and vents', 'Dusted and wiped'],
      ['Light fittings', 'Dusted, bulbs included'],
      ['Sofas and cushions', 'Vacuumed, cushions turned'],
      ['Marble and tile floors', 'Mopped with the right product for the stone'],
    ],
  },
];

/**
 * Client reviews.
 * NOTE: replace these with real reviews (with permission) before launch.
 */
export const testimonials = [
  {
    quote:
      'Finest Clean transformed our apartment before our guests arrived. Spotless kitchen, bathrooms, and floors. Same-day booking was a lifesaver!',
    name: 'Sarah Al M.',
    meta: 'Dubai Marina, deep cleaning',
  },
  {
    quote:
      "We've used them monthly for our villa for over a year. Consistent quality, trustworthy team, and they always respect our home.",
    name: 'James R.',
    meta: 'Arabian Ranches, villa cleaning',
  },
  {
    quote:
      'Our office has never looked better. They clean after hours so we never notice disruption. The AMC contract saves us money too.',
    name: 'Fatima K.',
    meta: 'Business Bay, office cleaning',
  },
  {
    quote:
      'Premium service for our luxury villa. Marble polishing and deep cleaning were exceptional. Highly recommend for high-end properties.',
    name: 'David L.',
    meta: 'Palm Jumeirah, marble polishing',
  },
  {
    quote:
      'Move-out cleaning was thorough — got our full deposit back. Professional, punctual, and great communication on WhatsApp.',
    name: 'Aisha N.',
    meta: 'JVC, move-out cleaning',
  },
  {
    quote:
      'As an Airbnb host, I need fast turnovers. Finest Clean delivers every time. My guests always comment on how clean the apartment is.',
    name: 'Michael T.',
    meta: 'Downtown Dubai, apartment cleaning',
  },
];

export const whyUs = [
  {
    icon: 'i-badge',
    title: 'Premium quality standards',
    text: 'Every clean is supervised and checked against our detailed quality checklist.',
  },
  {
    icon: 'i-doc',
    title: 'Transparent pricing',
    text: 'No hidden fees. A free quote with a clear scope before we start.',
  },
  { icon: 'i-cal', title: 'Flexible scheduling', text: 'Evenings, weekends and same-day slots across Dubai.' },
  {
    icon: 'i-chat',
    title: 'Dedicated account support',
    text: 'WhatsApp and phone support for fast answers and bookings.',
  },
  {
    icon: 'i-build',
    title: 'AMC and corporate solutions',
    text: 'Annual contracts for offices, buildings and property managers.',
  },
  { icon: 'i-shield', title: 'Satisfaction guaranteed', text: 'Not happy? We come back and make it right.' },
];

export const steps = [
  {
    title: 'Request a free quote',
    text: 'Use the form above, call, or WhatsApp us with the property type and the service you need.',
  },
  {
    title: 'Confirm scope and time',
    text: 'We agree a clear scope and price with no hidden fees, and book a same-day, evening or weekend slot.',
  },
  {
    title: 'Supervised clean and check',
    text: "Our team cleans to the quality checklist. If anything isn't right, we come back and fix it.",
  },
];

export const homeFaqs = [
  {
    q: 'What areas in Dubai do you serve?',
    a: 'All Dubai areas, including Downtown, Dubai Marina, JVC, Business Bay, Palm Jumeirah, Arabian Ranches, JLT and more.',
  },
  {
    q: 'Do you offer same-day cleaning in Dubai?',
    a: 'Yes. Same-day slots are available across Dubai, subject to team availability. WhatsApp us early in the day for the best chance.',
  },
  {
    q: 'Are your cleaners licensed and background-checked?',
    a: 'Yes. Every team member is trained and background-verified, and every job is supervised against our quality checklist.',
  },
  {
    q: 'Are your cleaning products safe for children and pets?',
    a: 'Yes. We use family-safe, pet-safe products by default in every home.',
  },
  {
    q: 'How do I get a free quote?',
    a: 'Use the quote form, call +971 58 632 4989, or send a WhatsApp with your property type and the service you need. We reply within minutes.',
  },
  {
    q: 'Do you offer annual maintenance contracts (AMC)?',
    a: 'Yes. AMC contracts come with fixed monthly pricing, priority support and guaranteed service levels for homes, offices and buildings.',
  },
];
