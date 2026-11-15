import { Fragment } from 'react';
import { site } from '../data/site';

/**
 * The business email with line-break points between words, so the long
 * address wraps neatly on phones. Falls back to plain text if the break
 * points in site.js no longer match the email.
 */
export default function EmailText() {
  const parts = site.emailBreaks;
  if (!parts || parts.join('') !== site.email) return site.email;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </Fragment>
  ));
}
