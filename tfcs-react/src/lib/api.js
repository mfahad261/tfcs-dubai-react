/**
 * Backend hooks (placeholders).
 *
 * The site works today without a backend: bookings go to WhatsApp.
 * When you add the email backend, set VITE_API_URL in .env and these
 * functions will start POSTing to it. Nothing else in the UI needs to change.
 *
 *   POST {VITE_API_URL}/booking     body: booking object (see QuoteForm)
 *   POST {VITE_API_URL}/newsletter  body: { email }
 */
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const hasBackend = Boolean(API_URL);

async function post(path, body) {
  if (!API_URL) return { ok: true, skipped: true };
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json().catch(() => ({ ok: true }));
}

export const sendBooking = (booking) => post('/booking', booking);
export const subscribeNewsletter = (email) => post('/newsletter', { email });
