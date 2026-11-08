/**
 * Business details used across the whole site.
 * Change a value here and it updates everywhere (nav, footer, contact page, schema).
 */
export const site = {
  // Live website address, no trailing slash. Update this when a custom domain is connected.
  url: 'https://tfcs-dubai.netlify.app',

  brand: 'TFCS',
  name: 'TFCS Technical & Cleaning Services',
  legalName: 'Technical and Cleaning Services LLC',

  phone: {
    display: '058 632 4989',
    international: '+971 58 632 4989',
    tel: '+971586324989',
  },

  // WhatsApp number in international format, digits only (used for wa.me links)
  whatsapp: '971586324989',

  email: 'info@finestcleandubai.com',

  address: {
    full: 'Empire Heights Tower B - Dubai Fountain St - Business Bay - Dubai - United Arab Emirates',
    street: 'Empire Heights Tower B, Dubai Fountain St',
    locality: 'Business Bay, Dubai',
    country: 'AE',
    base: 'Business Bay',
  },

  mapsUrl: 'https://maps.google.com/?q=Empire+Heights+Tower+B+Dubai+Fountain+St+Business+Bay+Dubai',

  availability: 'Available 7 days a week',

  developer: {
    name: 'Qodexaa',
    url: 'https://qodexaa.com/',
  },
};

export const defaultWhatsAppMessage = 'Hello TFCS, I would like to request a free quote for cleaning services.';
