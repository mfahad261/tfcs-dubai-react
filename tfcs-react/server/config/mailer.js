import nodemailer from 'nodemailer';
import { env } from './env.js';

export const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.secure,
  auth: { user: env.smtp.user, pass: env.smtp.pass },
  pool: true,
  maxConnections: 2,
  // Hostinger can take several seconds to accept a message, so allow up to a minute.
  connectionTimeout: 15_000,
  greetingTimeout: 15_000,
  socketTimeout: 60_000,
});

/** Hostinger only accepts mail whose From address is the mailbox that logged in. */
export const senderAddress = { name: env.mail.fromName, address: env.smtp.user };
