import { site } from '../data/site';
import Icon from '../components/Icon';
import WhatsAppLink from '../components/WhatsAppLink';

/** "Ready for a spotless space?" band shown above the footer (hidden on Contact). */
export default function CtaBand() {
  return (
    <section className="cta" id="cta">
      <div className="wrap">
        <div className="rv">
          <h2 className="h-l">Ready for a spotless space?</h2>
          <p>Get your free quote today. Same-day service available across Dubai.</p>
        </div>
        <div className="acts rv d1">
          <WhatsAppLink className="btn btn-green">
            <Icon name="i-wa" />
            WhatsApp us
          </WhatsAppLink>
          <a className="btn btn-ghost" href={`tel:${site.phone.tel}`}>
            <Icon name="i-phone" />
            Call {site.phone.international}
          </a>
          <small>{site.availability}</small>
        </div>
      </div>
    </section>
  );
}
