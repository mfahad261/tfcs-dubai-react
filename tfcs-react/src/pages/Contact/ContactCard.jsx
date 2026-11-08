import { site } from '../../data/site';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

export default function ContactCard() {
  return (
    <aside className="aside">
      <div className="cinfo rv d1">
        <span className="open">{site.availability}</span>
        <div className="r">
          <Icon name="i-phone" />
          <div>
            <a href={`tel:${site.phone.tel}`}>
              <b>{site.phone.international}</b>
            </a>
            <small>{site.availability}</small>
          </div>
        </div>
        <div className="r">
          <Icon name="i-wa" />
          <div>
            <WhatsAppLink>
              <b>Chat on WhatsApp</b>
            </WhatsAppLink>
            <small>Fastest way to get a quote</small>
          </div>
        </div>
        <div className="r">
          <Icon name="i-mail" />
          <div>
            <a href={`mailto:${site.email}`}>
              <b>{site.email}</b>
            </a>
            <small>For contracts and documents</small>
          </div>
        </div>
        <div className="r">
          <Icon name="i-pin" />
          <div>
            <b>{site.address.full}</b>
            <small>Visit or call us</small>
          </div>
        </div>
        <a className="btn btn-deep" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="i-pin" />
          Open in Google Maps
        </a>
      </div>
    </aside>
  );
}
