import { sendBookingEmail } from '../services/email.service.js';

export async function createBooking(req, res) {
  const { website, ...booking } = req.body;

  // A filled honeypot means a bot. Report success so it does not try again.
  if (!website) await sendBookingEmail(booking);

  res.status(201).json({ ok: true, message: 'Your quote request has been sent.' });
}
