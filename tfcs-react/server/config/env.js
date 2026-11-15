import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const serverDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

dotenv.config({ path: resolve(serverDir, '.env'), quiet: true });

const clean = (value, fallback = '') => (value ?? fallback).trim();
const list = (value) => clean(value).split(',').map((item) => item.trim()).filter(Boolean);

const smtpPort = Number(clean(process.env.SMTP_PORT, '465'));

const mailbox = clean(process.env.SMTP_USER, 'info@tfcstechnicalandcleaningservices.com');

export const env = {
  isProduction: clean(process.env.NODE_ENV) === 'production',
  port: Number(clean(process.env.PORT, '5000')),
  trustProxy: Number(clean(process.env.TRUST_PROXY, '1')),
  clientDist: resolve(serverDir, '..', 'dist'),
  clientOrigins: list(process.env.CLIENT_ORIGINS),
  canonicalHost: clean(process.env.CANONICAL_HOST).toLowerCase(),
  smtp: {
    host: clean(process.env.SMTP_HOST, 'smtp.hostinger.com'),
    port: smtpPort,
    // Port 465 uses SSL from the first byte. Port 587 upgrades with STARTTLS instead.
    secure: clean(process.env.SMTP_SECURE, smtpPort === 465 ? 'true' : 'false') === 'true',
    user: mailbox,
    // Not trimmed: a mailbox password may legitimately start or end with a space.
    pass: process.env.SMTP_PASS ?? '',
  },
  mail: {
    fromName: clean(process.env.MAIL_FROM_NAME, 'TFCS Website'),
    to: clean(process.env.MAIL_TO, mailbox),
  },
};

export const isMailConfigured = Boolean(env.smtp.user && env.smtp.pass);
