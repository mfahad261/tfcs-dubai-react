/**
 * All services shown on the site. Add, remove or reorder services here and
 * every menu, list, form and page updates automatically.
 *
 * categories: used by the filter on the Services page (home, biz, fabric, glass)
 */
import deep from '../assets/services/deep.webp';
import windowImg from '../assets/services/window.webp';
import commercial from '../assets/services/commercial.webp';
import office from '../assets/services/office.webp';
import carpet from '../assets/services/carpet.webp';
import upholstery from '../assets/services/upholstery.webp';
import warehouse from '../assets/services/warehouse.webp';
import apartment from '../assets/services/apartment.webp';
import acDuct from '../assets/services/ac-duct.webp';
import waterTank from '../assets/services/water-tank.webp';

export const services = [
  {
    slug: 'deep-cleaning-dubai',
    name: 'Deep cleaning',
    short: 'deep clean',
    title: 'Deep Cleaning Service in Dubai',
    heading: 'Deep cleaning service',
    tagline: 'Top-to-bottom reset for any home',
    lede: 'A complete top-to-bottom clean for villas and family homes. Kitchens degreased, bathrooms descaled, and every surface, fitting and corner reset.',
    image: deep,
    alt: 'Cleaner wiping a kitchen sink during a deep clean',
    icon: 'i-spray',
    categories: ['home'],
    tags: ['Villas', 'Townhouses', 'Before guests arrive'],
    idealFor: ['Villas', 'Townhouses', 'Before guests arrive', 'Seasonal reset'],
    facts: [
      { label: 'Best for', value: 'Villas and family homes' },
      { label: 'Booking', value: 'Same-day or scheduled' },
      { label: 'Products', value: 'Family and pet safe' },
    ],
    includes: [
      'Kitchen degreasing: hob, hood and tiles',
      'Inside oven, fridge and microwave',
      'Bathrooms descaled and sanitised',
      'Cabinets and wardrobes inside and out',
      'Doors, frames, switches and handles',
      'Skirting, vents and AC grilles',
      'Balconies and terraces',
      'Floors scrubbed and mopped',
    ],
    process: [
      { title: 'Walkthrough and scope', text: 'We confirm rooms, priorities and access, then agree a clear price.' },
      { title: 'Dust top to bottom', text: 'Ceilings, fans, vents and high shelves first, so dust only falls once.' },
      {
        title: 'Degrease, descale, sanitise',
        text: 'Kitchens and bathrooms get specialist products and the most time.',
      },
      { title: 'Supervisor check', text: 'A team lead checks every room against our checklist before we leave.' },
    ],
    faqs: [
      {
        q: 'How long does a deep clean take?',
        a: 'It depends on the size and condition of the property. We confirm the team size and timing with your quote, so you know exactly what to expect.',
      },
      {
        q: 'Do I need to provide cleaning supplies?',
        a: 'No. Our team brings all equipment and family-safe, pet-safe products.',
      },
      {
        q: 'Do you move furniture?',
        a: 'We move light furniture to clean beneath and behind it. Heavy items can be moved on request.',
      },
    ],
  },
  {
    slug: 'window-facade-cleaning',
    name: 'Window and facade cleaning',
    short: 'window and facade clean',
    title: 'Window & Facade Cleaning in Dubai',
    heading: 'Window and facade cleaning',
    tagline: 'Streak-free glass and spotless building exteriors',
    lede: 'Streak-free windows, balcony doors and glass, plus exterior facade cleaning for villas, towers, offices and shopfronts. Dust, sand, water spots and pollution stains removed, so your building looks sharp from the street.',
    image: windowImg,
    alt: 'Cleaner squeegeeing a balcony window with a view of Dubai',
    icon: 'i-window',
    categories: ['home', 'biz', 'glass'],
    tags: ['Villas', 'Buildings', 'Shopfronts'],
    idealFor: ['Apartments and villas', 'Residential and commercial buildings', 'Offices', 'Restaurants and shops'],
    facts: [
      { label: 'Best for', value: 'Homes, buildings and shops' },
      { label: 'Booking', value: 'One-off or regular' },
      { label: 'Finish', value: 'Streak-free, stain-free' },
    ],
    includes: [
      'Windows inside and out',
      'Frames, tracks and sills',
      'Sliding and balcony doors',
      'Glass partitions and mirrors',
      'Exterior facade and curtain-wall glass',
      'Cladding, ACP panels and stone surfaces',
      'Hard-water, dust and pollution stain removal',
      'Hand-buffed streak-free finish',
    ],
    process: [
      {
        title: 'Survey the site',
        text: 'We check access, building height, glass and cladding types, and the level of staining before we start.',
      },
      { title: 'Frames and tracks first', text: 'Sand and dust are vacuumed out of tracks, sills and frames.' },
      {
        title: 'Wash and squeegee',
        text: 'Glass is washed with a purified solution and squeegeed edge to edge, while facade surfaces are cleaned with surface-safe products.',
      },
      {
        title: 'Detail and inspect',
        text: 'Glass edges are buffed by hand and the facade is checked for a streak-free, spot-free finish.',
      },
    ],
    faqs: [
      {
        q: 'Do you clean high-rise exterior windows and facades?',
        a: 'Yes. Tell us about your building and its access, and we will plan a safe method for the exterior glass and facade.',
      },
      {
        q: 'How often should windows and facades be cleaned in Dubai?',
        a: 'Dust and sand build up fast, so most homes book every few months, shopfronts usually book weekly, and building facades are often cleaned on a quarterly schedule.',
      },
      {
        q: 'What facade materials can you clean?',
        a: 'We clean glass curtain walls, aluminium composite (ACP) cladding, painted render and stone, using products that suit each surface.',
      },
    ],
  },
  {
    slug: 'commercial-deep-cleaning-dubai',
    name: 'Commercial deep cleaning',
    short: 'commercial deep clean',
    title: 'Commercial Deep Cleaning Service in Dubai',
    heading: 'Commercial deep cleaning service',
    tagline: 'Shops, clinics, restaurants and gyms',
    lede: 'Intensive deep cleaning for retail stores, clinics, restaurants, gyms and showrooms, scheduled after hours so your business keeps running.',
    image: commercial,
    alt: 'Cleaner working beside a glass door in a commercial space',
    icon: 'i-store',
    categories: ['biz'],
    tags: ['Retail stores', 'Clinics', 'Restaurants'],
    idealFor: ['Retail stores', 'Clinics', 'Restaurants', 'Gyms and showrooms'],
    facts: [
      { label: 'Best for', value: 'Shops, clinics and restaurants' },
      { label: 'Booking', value: 'After hours, any day' },
      { label: 'Option', value: 'One-off or AMC' },
    ],
    includes: [
      'High-touch points sanitised',
      'Floors machine-scrubbed',
      'Washrooms descaled and sanitised',
      'Kitchen and pantry degreasing',
      'Display units and fixtures',
      'Glass and shopfronts',
      'Ceiling vents and light fittings',
      'Waste removed and bins sanitised',
    ],
    process: [
      { title: 'Site survey', text: 'We walk the site with you, list every zone and agree the scope.' },
      { title: 'Schedule around you', text: 'Nights, early mornings or weekends, so trading is never disrupted.' },
      {
        title: 'Zone by zone',
        text: 'Front of house, back of house, washrooms and kitchens, each to its own checklist.',
      },
      { title: 'Sign-off walkthrough', text: 'Your manager walks the site with our supervisor before handover.' },
    ],
    faqs: [
      {
        q: 'Can you clean outside business hours?',
        a: 'Yes. We work nights, early mornings and weekends so customers and staff are never disturbed.',
      },
      {
        q: 'Do you offer contracts?',
        a: 'Yes. Book a one-off deep clean, or an AMC with scheduled visits and fixed monthly pricing.',
      },
      {
        q: 'Is your team vetted?',
        a: 'Every team member is trained and background-verified, and every job is supervised.',
      },
    ],
  },
  {
    slug: 'office-deep-cleaning',
    name: 'Office deep cleaning',
    short: 'office deep clean',
    title: 'Office Deep Cleaning in Dubai',
    heading: 'Office deep cleaning',
    tagline: 'Workstations, meeting rooms and pantries',
    lede: 'A thorough reset for offices of every size. Desks and electronics sanitised, floors and carpets refreshed, pantries and washrooms deep cleaned.',
    image: office,
    alt: 'Cleaning an office desk',
    icon: 'i-office',
    categories: ['biz'],
    tags: ['Offices', 'Co-working spaces', 'Agencies'],
    idealFor: ['Offices', 'Co-working spaces', 'Agencies', 'Medical offices'],
    facts: [
      { label: 'Best for', value: 'Offices of every size' },
      { label: 'Booking', value: 'Evenings and weekends' },
      { label: 'Option', value: 'One-off or AMC' },
    ],
    includes: [
      'Workstations and chairs sanitised',
      'Keyboards, phones and screens wiped',
      'Meeting rooms and glass walls',
      'Pantry, fridge and microwave',
      'Washrooms descaled',
      'Carpets vacuumed and spot-treated',
      'Partitions, doors and handles',
      'Bins emptied and sanitised',
    ],
    process: [
      {
        title: 'Floor plan walkthrough',
        text: 'We map desks, meeting rooms, pantries and washrooms with your admin team.',
      },
      { title: 'After-hours setup', text: 'The crew arrives after closing, so the next day starts in a fresh office.' },
      { title: 'Desk by desk', text: 'Workstations, chairs and electronics are cleaned and sanitised one by one.' },
      { title: 'Checklist sign-off', text: 'A supervisor checks each zone and confirms completion with you.' },
    ],
    faqs: [
      {
        q: 'Will cleaning disrupt our work?',
        a: 'No. We clean in the evenings or at weekends, so your team returns to a clean office.',
      },
      {
        q: 'Do you clean electronics safely?',
        a: 'Yes. Screens and devices are cleaned with dry microfibre and approved wipes. Liquid is never sprayed onto equipment.',
      },
      {
        q: 'Can we book regular cleaning afterwards?',
        a: 'Yes. After the deep clean we can set up daily or weekly cleaning, or an AMC.',
      },
    ],
  },
  {
    slug: 'carpet-shampoo-cleaning',
    name: 'Carpet shampoo wash',
    short: 'carpet shampoo wash',
    title: 'Carpet Shampoo Wash in Dubai',
    heading: 'Carpet shampoo wash',
    tagline: 'Deep shampoo, stain and odour removal',
    lede: 'Deep shampoo washing that lifts embedded dust, sand, stains and odours from wall-to-wall carpets and rugs, and brings back their colour and softness.',
    image: carpet,
    alt: 'Carpet being cleaned',
    icon: 'i-rug',
    categories: ['home', 'biz', 'fabric'],
    tags: ['Wall-to-wall carpet', 'Area rugs', 'Offices'],
    idealFor: ['Wall-to-wall carpet', 'Area rugs', 'Offices', 'Hotels and rentals'],
    facts: [
      { label: 'Best for', value: 'Carpets and rugs' },
      { label: 'Method', value: 'Shampoo and extraction' },
      { label: 'Products', value: 'Family and pet safe' },
    ],
    includes: [
      'Pre-vacuum to lift sand and dust',
      'Stain pre-treatment',
      'Shampoo scrub',
      'Hot-water extraction rinse',
      'Odour and pet treatment',
      'Rugs and runners',
      'Pile grooming',
      'Faster-drying finish',
    ],
    process: [
      {
        title: 'Inspect fibres and stains',
        text: 'We check the fibre and each stain, so the right treatment is used.',
      },
      { title: 'Vacuum and pre-treat', text: 'Dry soil and sand are lifted first, then stains are pre-treated.' },
      { title: 'Shampoo and extract', text: 'The carpet is shampooed, then rinsed with hot-water extraction.' },
      { title: 'Groom and dry', text: 'The pile is groomed and airflow is set up to speed up drying.' },
    ],
    faqs: [
      {
        q: 'How long does a carpet take to dry?',
        a: 'Usually a few hours, depending on the carpet and ventilation. High extraction removes most of the water.',
      },
      {
        q: 'Can every stain be removed?',
        a: 'Most common stains lift fully. Old or set-in stains are treated to fade as much as the fibre allows, and we tell you honestly before we start.',
      },
      {
        q: 'Is it safe for children and pets?',
        a: 'Yes. We use family-safe and pet-safe products and rinse them out thoroughly.',
      },
    ],
  },
  {
    slug: 'upholstery-cleaning',
    name: 'Upholstery cleaning',
    short: 'upholstery clean',
    title: 'Upholstery Cleaning in Dubai',
    heading: 'Upholstery cleaning',
    tagline: 'Sofas, chairs, mattresses and headboards',
    lede: 'Fabric-safe deep cleaning for sofas, armchairs, dining chairs, mattresses and headboards. Stains, body oils, dust mites and odours lifted, colours refreshed.',
    image: upholstery,
    alt: 'Cleaning an upholstered chair',
    icon: 'i-sofa',
    categories: ['home', 'fabric'],
    tags: ['Sofas', 'Mattresses', 'Dining chairs'],
    idealFor: ['Sofas', 'Mattresses', 'Dining chairs', 'Headboards'],
    facts: [
      { label: 'Best for', value: 'Sofas, chairs and mattresses' },
      { label: 'Method', value: 'Fabric-safe, on site' },
      { label: 'Products', value: 'Family and pet safe' },
    ],
    includes: [
      'Fabric test before cleaning',
      'Vacuum and dust-mite removal',
      'Stain pre-treatment',
      'Shampoo or steam clean',
      'Leather cleaned and conditioned',
      'Mattress sanitisation',
      'Cushions and headboards',
      'Deodorised finish',
    ],
    process: [
      { title: 'Fabric check', text: 'We read the care code and spot-test before any product touches the fabric.' },
      { title: 'Vacuum and pre-treat', text: 'Dust, crumbs and mites are removed, then stains are pre-treated.' },
      { title: 'Deep clean', text: 'Shampoo, steam or leather care, depending on the material.' },
      { title: 'Deodorise and dry', text: 'A fresh finish, then the piece is left to air-dry.' },
    ],
    faqs: [
      {
        q: 'Do you clean leather sofas?',
        a: 'Yes. Leather is cleaned with a pH-balanced cleaner, then conditioned to keep it soft.',
      },
      { q: 'Is everything done at my home?', a: 'Yes. Our team cleans on site, so nothing leaves your home.' },
      { q: 'When can I use the sofa again?', a: 'Usually after a few hours, once it is dry to the touch.' },
    ],
  },
  {
    slug: 'warehouse-deep-cleaning',
    name: 'Warehouse deep cleaning',
    short: 'warehouse deep clean',
    title: 'Warehouse Deep Cleaning in Dubai',
    heading: 'Warehouse deep cleaning',
    tagline: 'Floors, racking and loading bays',
    lede: 'Industrial deep cleaning for warehouses, storage units and logistics sites. Dust and debris cleared from racking and high levels, with machine scrubbing throughout.',
    image: warehouse,
    alt: 'Machine scrubbing a large floor',
    icon: 'i-warehouse',
    categories: ['biz'],
    tags: ['Warehouses', 'Logistics hubs', 'Storage units'],
    idealFor: ['Warehouses', 'Logistics hubs', 'Storage units', 'Workshops'],
    facts: [
      { label: 'Best for', value: 'Warehouses and storage' },
      { label: 'Booking', value: 'Around your shifts' },
      { label: 'Equipment', value: 'Industrial scrubbers' },
    ],
    includes: [
      'High-level dusting',
      'Racking and shelving wiped',
      'Machine floor scrubbing',
      'Oil and tyre-mark removal',
      'Loading bays and ramps',
      'On-site offices and washrooms',
      'Cobweb and debris removal',
      'Waste collected and removed',
    ],
    process: [
      { title: 'Survey and safety plan', text: 'We agree zones, access times and site safety rules with your team.' },
      { title: 'Protect and prepare', text: 'Stock is covered or moved, and working areas are marked off.' },
      { title: 'Top-down clean', text: 'High levels and racking first, then walls, then floors.' },
      { title: 'Scrub and sign-off', text: 'Floors are machine-scrubbed and the site is walked with your manager.' },
    ],
    faqs: [
      {
        q: 'Can you work around our operations?',
        a: 'Yes. We clean in zones or between shifts, so goods keep moving.',
      },
      {
        q: 'Do you bring your own machines?',
        a: 'Yes. Our team brings floor scrubbers, industrial vacuums and all access equipment needed.',
      },
      {
        q: 'How do you handle safety?',
        a: 'Our crew wears PPE and follows your site rules, with areas marked off while we work.',
      },
    ],
  },
  {
    slug: 'apartment-deep-cleaning',
    name: 'Apartment deep cleaning',
    short: 'apartment deep clean',
    title: 'Apartment Deep Cleaning in Dubai',
    heading: 'Apartment deep cleaning',
    tagline: 'Studios to penthouses, move-in ready',
    lede: 'A full deep clean for studios, apartments and penthouses. Perfect before moving in, after moving out, or whenever your home needs a complete reset.',
    image: apartment,
    alt: 'A calm, freshly cleaned apartment living room',
    icon: 'i-apt',
    categories: ['home'],
    tags: ['Move in', 'Move out', 'Airbnb hosts'],
    idealFor: ['Move in', 'Move out', 'Airbnb hosts', 'Studios to penthouses'],
    facts: [
      { label: 'Best for', value: 'Studios to penthouses' },
      { label: 'Booking', value: 'Same-day or scheduled' },
      { label: 'Ideal for', value: 'Moving in or out' },
    ],
    includes: [
      'Kitchen and appliances inside and out',
      'Bathrooms descaled',
      'Wardrobes inside and out',
      'Balcony and glass doors',
      'Windows, sills and tracks',
      'AC grilles and vents',
      'Light fittings and switches',
      'Floors and skirting',
    ],
    process: [
      {
        title: 'Book and confirm',
        text: 'Tell us the size and whether it is empty or furnished, and we confirm a slot.',
      },
      { title: 'Top-down dust', text: 'Ceilings, lights, AC grilles and wardrobe tops first.' },
      { title: 'Room by room', text: 'Kitchen and bathrooms deep cleaned, then bedrooms, living areas and balcony.' },
      { title: 'Handover check', text: 'Every room is checked so it is ready for you, your tenant or your landlord.' },
    ],
    faqs: [
      {
        q: 'Do I need to be home?',
        a: 'No. Many clients leave keys with the concierge or security, and we message you when we finish.',
      },
      {
        q: 'Will this help with my deposit?',
        a: 'Our move-out clean covers what landlords check most: kitchen, bathrooms, cabinets, floors and wall marks.',
      },
      {
        q: 'Do you clean empty and furnished apartments?',
        a: 'Both. Tell us which when you book, so we send the right team and equipment.',
      },
    ],
  },
  {
    slug: 'ac-duct-coil-cleaning',
    name: 'AC duct and coil cleaning',
    short: 'AC duct and coil clean',
    title: 'AC Duct & Coil Cleaning in Dubai',
    heading: 'AC duct and coil cleaning',
    tagline: 'Cleaner air, better cooling',
    lede: 'Deep cleaning of AC ducts, vents and coils to remove dust, mould and built-up grime. Better airflow, fresher air and an air conditioner that cools faster and works less.',
    image: acDuct,
    alt: 'Technician cleaning a ceiling AC duct vent',
    icon: 'i-ac',
    categories: ['home', 'biz'],
    tags: ['Apartments', 'Villas', 'Offices'],
    idealFor: ['Apartments', 'Villas', 'Offices', 'Clinics and shops'],
    facts: [
      { label: 'Best for', value: 'Homes and businesses' },
      { label: 'Booking', value: 'One-off or yearly' },
      { label: 'Result', value: 'Fresh air, better cooling' },
    ],
    includes: [
      'Supply and return duct cleaning',
      'Vents, grilles and diffusers',
      'Evaporator coil cleaning',
      'Condenser coil cleaning',
      'Filter wash or replacement advice',
      'Drain pan and drain line check',
      'Anti-bacterial sanitising',
      'Before and after inspection',
    ],
    process: [
      {
        title: 'Inspect the system',
        text: 'We check ducts, vents and coils and record the dust and mould level before we start.',
      },
      {
        title: 'Protect and open up',
        text: 'Floors and furniture are covered, then vent covers and access panels are carefully removed.',
      },
      {
        title: 'Brush, vacuum and wash',
        text: 'Ducts are agitated with rotating brushes under negative-pressure vacuum, and coils are cleaned with coil-safe solution.',
      },
      {
        title: 'Sanitise and test',
        text: 'Surfaces are sanitised, everything is reassembled, and we confirm airflow before we leave.',
      },
    ],
    faqs: [
      {
        q: 'How often should AC ducts and coils be cleaned?',
        a: 'In Dubai, most homes benefit from a duct clean every one to two years and coil cleaning every year, or more often for offices and homes with pets.',
      },
      {
        q: 'Will it make my AC cooler?',
        a: 'Clean coils and clear ducts let air move freely, so rooms cool faster and the unit works less. Many customers notice stronger airflow straight away.',
      },
      {
        q: 'Can you clean ducts in a rented apartment?',
        a: 'Yes. We work through the existing vents and access points, and put everything back as we found it. Check your building rules and we can help with the paperwork.',
      },
    ],
  },
  {
    slug: 'water-tank-cleaning',
    name: 'Water tank cleaning',
    short: 'water tank clean',
    title: 'Water Tank Cleaning in Dubai',
    heading: 'Water tank cleaning',
    tagline: 'Clean, safe water for every tap',
    lede: 'Complete cleaning and disinfection of rooftop and underground water tanks. Sludge, sediment, algae and bacteria removed, so the water reaching your kitchen and bathrooms is clean and safe.',
    image: waterTank,
    alt: 'TFCS technician cleaning a rooftop water tank with a pump and hose, Dubai skyline behind',
    icon: 'i-tank',
    categories: ['home', 'biz'],
    tags: ['Villas', 'Buildings', 'Restaurants'],
    idealFor: ['Villas and townhouses', 'Residential buildings', 'Offices and warehouses', 'Restaurants, clinics and schools'],
    facts: [
      { label: 'Best for', value: 'Villas and buildings' },
      { label: 'Booking', value: 'One-off or every 6 months' },
      { label: 'Result', value: 'Clean, disinfected water' },
    ],
    includes: [
      'Rooftop and underground tanks',
      'GRP, concrete and plastic tanks',
      'Full drain-down and sludge removal',
      'Walls, floor and ceiling scrubbed',
      'Algae and sediment removal',
      'Disinfection with approved chemicals',
      'Rinse and refill',
      'Lid, overflow and inlet check',
    ],
    process: [
      {
        title: 'Inspect and isolate',
        text: 'We check the tank condition, shut off the inlet and let you know how long the water will be off.',
      },
      {
        title: 'Drain and remove sludge',
        text: 'The tank is pumped down and settled sludge, sand and sediment are removed from the floor.',
      },
      {
        title: 'Scrub and disinfect',
        text: 'Walls, floor and ceiling are scrubbed by hand, then the whole tank is disinfected with approved, water-safe chemicals.',
      },
      {
        title: 'Rinse, refill and check',
        text: 'The tank is rinsed clean, refilled, and the lid, seals and overflow are checked before we leave.',
      },
    ],
    faqs: [
      {
        q: 'How often should a water tank be cleaned in Dubai?',
        a: 'Every six months is recommended for most homes and buildings, because heat, dust and sand speed up sediment and bacteria growth.',
      },
      {
        q: 'How long will I be without water?',
        a: 'Most villa tanks are cleaned and refilled in three to four hours. Larger building tanks take longer, and we can schedule the work for a quiet time of day.',
      },
      {
        q: 'Are the chemicals safe for drinking water?',
        a: 'Yes. We only use disinfectants approved for potable water tanks, and the tank is fully rinsed before it is refilled.',
      },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s, i) => [s.slug, { ...s, index: i }]));

/** Options for booking dropdowns: every service plus the extras. */
export const bookingOptions = [...services.map((s) => s.name), 'AMC contract'];
