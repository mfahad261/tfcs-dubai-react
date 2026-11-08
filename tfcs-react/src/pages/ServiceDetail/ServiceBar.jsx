import { site } from '../../data/site';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

/** Sticky call / WhatsApp bar on phones while viewing a service. */
export default function ServiceBar({ service, quoteMessage }) {
  return (
    <div className="sd-bar">
      <a className="btn btn-ghost" href={`tel:${site.phone.tel}`} aria-label="Call TFCS">
        <Icon name="i-phone" />
      </a>
      <WhatsAppLink className="btn btn-green" message={quoteMessage}>
        <Icon name="i-wa" />
        <span>Free quote: {service.name}</span>
      </WhatsAppLink>
    </div>
  );
}
