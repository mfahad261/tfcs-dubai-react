import { waLink } from '../lib/whatsapp';

/** Link that opens WhatsApp with a pre-filled message in a new tab. */
export default function WhatsAppLink({ message, children, ...rest }) {
  return (
    <a href={waLink(message)} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
