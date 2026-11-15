import { site } from '../../src/data/site.js';

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

const dubaiTime = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' }).format(new Date());

const niceDate = (iso) =>
  new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(
    new Date(`${iso}T00:00:00Z`)
  );

/** Any accepted UAE mobile format as 9715XXXXXXXX. */
const internationalPhone = (phone) => `971${phone.replace(/\D/g, '').replace(/^(971|0)/, '')}`;

function layout(heading, rows, footerNote, intro = '') {
  const body = rows
    .map(
      ([label, valueHtml]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #E6ECF1;color:#566574;font-size:13px;width:130px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #E6ECF1;color:#0B1F2E;font-size:14px">${valueHtml}</td>
        </tr>`
    )
    .join('');

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#F3F3F1;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;border-collapse:separate;overflow:hidden">
      <tr><td style="background:#0D3553;padding:20px 24px;color:#fff;font-size:18px;font-weight:bold">${escapeHtml(heading)}</td></tr>
      ${intro ? `<tr><td style="padding:22px 24px 6px;color:#0B1F2E;font-size:15px;line-height:1.6">${escapeHtml(intro)}</td></tr>` : ''}
      <tr><td style="padding:12px"><table role="presentation" width="100%" cellspacing="0">${body}</table></td></tr>
      <tr><td style="padding:14px 24px;color:#6F7F8D;font-size:12px">${escapeHtml(footerNote)}</td></tr>
    </table>
  </body>
</html>`;
}

const textBlock = (heading, rows, footerNote, intro = '') =>
  `${heading}\n\n${intro ? `${intro}\n\n` : ''}${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\n${footerNote}`;

/** Sent to the customer, only when they gave an email address. */
export function customerConfirmationEmail(b) {
  const firstName = b.name.split(/\s+/)[0];
  const intro = `Hi ${firstName}, thank you for contacting ${site.brand}. We have received your quote request and our team will get back to you shortly with a clear scope and price.`;
  const footer = `${site.name}, ${site.address.base}, Dubai. ${site.availability}.`;
  const help = `Reply to this email, call ${site.phone.international} or WhatsApp us.`;

  const plain = [
    ['Service', b.service],
    ['Property', b.propertyType],
    ['Preferred date', `${niceDate(b.date)}, ${b.slot}`],
    ['Area', b.area],
    ...(b.notes ? [['Your notes', b.notes]] : []),
    ['Need help', help],
  ];

  const html = plain.map(([label, value]) =>
    label === 'Need help'
      ? [
          label,
          `Reply to this email, call <a href="tel:${site.phone.tel}">${escapeHtml(site.phone.international)}</a> or <a href="https://wa.me/${site.whatsapp}">WhatsApp us</a>.`,
        ]
      : [label, escapeHtml(value).replace(/\r?\n/g, '<br>')]
  );

  return {
    subject: `We received your quote request | ${site.brand}`,
    html: layout('Your quote request', html, footer, intro),
    text: textBlock('Your quote request', plain, footer, intro),
  };
}

export function bookingEmail(b) {
  const phone = internationalPhone(b.phone);
  const footer = `Sent from the website quote form on ${dubaiTime()} (Dubai time).`;
  const when = `${niceDate(b.date)}, ${b.slot}`;

  const plain = [
    ['Name', b.name],
    ['Phone', b.phone],
    ['Email', b.email || 'Not provided'],
    ['Service', b.service],
    ['Property', b.propertyType],
    ['When', when],
    ['Area', b.area],
    ['Details', b.notes || 'None'],
  ];

  const html = plain.map(([label, value]) => {
    if (label === 'Phone') {
      return [label, `<a href="tel:+${phone}">${escapeHtml(value)}</a> &nbsp;|&nbsp; <a href="https://wa.me/${phone}">WhatsApp</a>`];
    }
    if (label === 'Email' && b.email) {
      return [label, `<a href="mailto:${escapeHtml(b.email)}">${escapeHtml(b.email)}</a>`];
    }
    return [label, escapeHtml(value).replace(/\r?\n/g, '<br>')];
  });

  return {
    subject: `New quote request: ${b.service} from ${b.name}`,
    html: layout('New quote request', html, footer),
    text: textBlock('New quote request', plain, footer),
  };
}

export function newsletterEmail({ email }) {
  const footer = `Sent from the website footer form on ${dubaiTime()} (Dubai time).`;
  const plain = [['Email', email]];
  return {
    subject: `New newsletter subscriber: ${email}`,
    html: layout('New newsletter subscriber', [['Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`]], footer),
    text: textBlock('New newsletter subscriber', plain, footer),
  };
}
