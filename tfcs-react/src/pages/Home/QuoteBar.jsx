import { useState } from 'react';
import { bookingOptions } from '../../data/services';
import { waLink } from '../../lib/whatsapp';
import Icon from '../../components/Icon';

const PROPERTY = ['Apartment', 'Villa', 'Office', 'Commercial', 'Other'];
const WHEN = ['Today', 'Tomorrow', 'This week', "I'm flexible"];

/** Quick quote bar under the hero. Builds a WhatsApp message from the three choices. */
export default function QuoteBar() {
  const [type, setType] = useState(PROPERTY[0]);
  const [service, setService] = useState(bookingOptions[0]);
  const [when, setWhen] = useState('Tomorrow');

  const message = `Hello TFCS, I would like a free quote for ${service.toLowerCase()} (${type.toLowerCase()}), ${when
    .toLowerCase()
    .replace("i'm flexible", 'dates flexible')}.`;

  return (
    <section className="sh-q">
      <div className="wrap">
        <form className="bar" aria-label="Free quote request" onSubmit={(e) => e.preventDefault()}>
          <div className="cell">
            <label htmlFor="b-type">Property</label>
            <select id="b-type" value={type} onChange={(e) => setType(e.target.value)}>
              {PROPERTY.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="cell">
            <label htmlFor="b-svc">Service</label>
            <select id="b-svc" value={service} onChange={(e) => setService(e.target.value)}>
              {bookingOptions.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="cell">
            <label htmlFor="b-when">When</label>
            <select id="b-when" value={when} onChange={(e) => setWhen(e.target.value)}>
              {WHEN.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="go">
            <a className="btn btn-deep" id="b-go" href={waLink(message)} target="_blank" rel="noopener noreferrer">
              <Icon name="i-wa" />
              Get free quote
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
