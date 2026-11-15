import { z } from 'zod';

/** Rejects line breaks and control characters, which have no place in single-line fields. */
const NO_CONTROL_CHARS = /^[^\p{Cc}]*$/u;
const UAE_MOBILE = /^(\+?971|0)?5\d{8}$/;

const line = (label, max) =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} is too long.`)
    .regex(NO_CONTROL_CHARS, `${label} contains invalid characters.`);

const email = z.string().trim().max(254, 'Email is too long.').email('Enter a valid email address.');

const isRealDate = (value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value);
};

export const bookingSchema = z.object({
  service: line('Service', 120),
  propertyType: line('Property type', 60),
  date: z
    .string({ error: 'Date is required.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date.')
    .refine(isRealDate, 'Enter a valid date.'),
  slot: line('Preferred time', 40),
  name: line('Full name', 120),
  phone: line('Phone', 30).refine(
    (value) => UAE_MOBILE.test(value.replace(/[\s-]/g, '')),
    'Enter a UAE mobile number, for example 050 123 4567.'
  ),
  email: z.union([z.literal(''), email]).default(''),
  area: line('Area', 80),
  notes: z.string().trim().max(2000, 'Details are too long.').default(''),
  website: z.string().max(200).optional(), // honeypot: real people leave this empty
});

export const newsletterSchema = z.object({
  email,
  website: z.string().max(200).optional(),
});
