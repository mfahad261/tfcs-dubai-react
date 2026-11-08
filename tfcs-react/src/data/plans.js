/** AMC (annual maintenance contract) plans, grouped by audience. */
export const planGroups = [
  {
    key: 'home',
    label: 'Homes and villas',
    topTier: 'Estate',
    plans: [
      {
        name: 'Essential',
        text: 'Apartments that need reliable regular upkeep.',
        freq: '2 visits a month',
        features: ['Scheduled general cleaning', 'Same team where possible', 'WhatsApp booking changes'],
      },
      {
        name: 'Complete',
        text: 'Families and villas that want everything handled.',
        freq: 'Weekly visits',
        features: ['Weekly cleaning', 'Quarterly deep clean', 'Priority same-day support', 'Dedicated account manager'],
        featured: true,
      },
      {
        name: 'Estate',
        text: 'Large villas and luxury homes.',
        freq: 'Tailored schedule',
        features: [
          'Everything in Complete',
          'Carpet shampoo wash',
          'Upholstery and mattress care',
          'Window and facade cleaning',
        ],
      },
    ],
  },
  {
    key: 'biz',
    label: 'Offices and buildings',
    topTier: 'Building',
    plans: [
      {
        name: 'Essential',
        text: 'Small offices and retail units.',
        freq: 'Weekly visits',
        features: ['After-hours cleaning', 'Washrooms and pantry', 'Monthly quality check'],
      },
      {
        name: 'Complete',
        text: 'Offices, clinics and showrooms.',
        freq: 'Daily or nightly',
        features: ['Daily cleaning', 'Scheduled deep cleans', 'Priority support', 'Dedicated account manager'],
        featured: true,
      },
      {
        name: 'Building',
        text: 'Towers, warehouses and managed portfolios.',
        freq: 'Tailored schedule',
        features: [
          'Lobbies, common areas and car parks',
          'Window and facade cleaning',
          'Warehouse and floor deep cleans',
          'Service-level reporting',
        ],
      },
    ],
  },
];

/** Comparison table rows: [feature, essential, complete, top tier] */
export const planCompare = [
  ['Fixed monthly pricing', true, true, true],
  ['Scheduled regular cleaning', true, true, true],
  ['Priority same-day support', false, true, true],
  ['Scheduled deep cleans', false, true, true],
  ['AC duct and coil cleaning', false, false, true],
  ['Marble polishing and technical care', false, false, true],
  ['Dedicated account manager', false, true, true],
];

export const amcAudience = [
  'Villa owners',
  'Apartment residents',
  'Office managers',
  'Facility management companies',
  'Real estate agencies',
  'Airbnb and holiday-home hosts',
  'Building owners',
  'Retail and showrooms',
  'Clinics',
  'Warehouses',
];
