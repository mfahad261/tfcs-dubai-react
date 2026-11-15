import { sendNewsletterEmail } from '../services/email.service.js';

export async function subscribe(req, res) {
  const { website, email } = req.body;

  if (!website) await sendNewsletterEmail({ email });

  res.status(201).json({ ok: true, message: 'Thanks for subscribing.' });
}
