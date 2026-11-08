import { site, defaultWhatsAppMessage } from '../data/site';

/** Build a WhatsApp click-to-chat link with a pre-filled message. */
export function waLink(message = defaultWhatsAppMessage) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Open WhatsApp in a new tab. Call this directly inside a click/submit handler so it isn't blocked. */
export function openWhatsApp(message) {
  window.open(waLink(message), '_blank', 'noopener');
}
