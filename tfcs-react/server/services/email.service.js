import { env, isMailConfigured } from '../config/env.js';
import { senderAddress, transporter } from '../config/mailer.js';
import { AppError } from '../errors/AppError.js';
import { bookingEmail, customerConfirmationEmail, newsletterEmail } from '../templates/email.templates.js';

async function deliver(message, to = env.mail.to) {
  if (!isMailConfigured) {
    throw new AppError(503, 'Email is not available right now. Please contact us on WhatsApp.');
  }
  try {
    const started = Date.now();
    const info = await transporter.sendMail({ from: senderAddress, to, ...message });
    console.log(`[mail] sent ${info.messageId} in ${Date.now() - started}ms (${info.response})`);
  } catch (err) {
    console.error(`[mail] send failed (${err.code ?? 'unknown'}): ${err.message}`);
    throw new AppError(502, 'We could not send your message. Please try again or contact us on WhatsApp.');
  }
}

/**
 * Emails the request to the business (replying goes straight to the customer),
 * then a confirmation to the customer when they gave an email address.
 * A failed confirmation is logged but does not fail the request: the business already has it.
 */
export async function sendBookingEmail(booking) {
  await deliver({ ...bookingEmail(booking), replyTo: booking.email || undefined });
  if (!booking.email) return;
  try {
    await deliver({ ...customerConfirmationEmail(booking), headers: { 'Auto-Submitted': 'auto-replied' } }, booking.email);
  } catch {
    // Already logged by deliver()
  }
}

export const sendNewsletterEmail = (data) => deliver({ ...newsletterEmail(data), replyTo: data.email });

/** Startup check. Reports the problem without stopping the website. */
export async function checkMailConnection() {
  if (!isMailConfigured) {
    console.warn('[mail] SMTP_PASS is empty in server/.env, so emails are switched off.');
    return;
  }
  try {
    await transporter.verify();
    console.log(`[mail] connected to ${env.smtp.host}:${env.smtp.port} as ${env.smtp.user}`);
  } catch (err) {
    console.error(`[mail] could not connect (${err.code ?? 'unknown'}): ${err.message}`);
  }
}
