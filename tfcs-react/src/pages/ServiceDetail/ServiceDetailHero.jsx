import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { useBooking } from '../../context/BookingContext';
import { pad2 } from '../../lib/format';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

export default function ServiceDetailHero({ service, quoteMessage }) {
  const { presetService } = useBooking();
  const n = pad2(service.index + 1);

  return (
    <section className="sd-hero">
      <span className="glow" />
      <span className="big" aria-hidden="true">
        {n}
      </span>
      <div className="wrap">
        <div>
          <div className="crumb an">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>{service.name}</span>
          </div>
          <span className="sd-badge an" style={{ '--d': 1 }}>
            <span className="ic">
              <Icon name={service.icon} />
            </span>
            Service {n} of {pad2(services.length)}
          </span>
          <h1 className="an" style={{ '--d': 2 }}>
            {service.heading} <em>in Dubai</em>
          </h1>
          <p className="lede an" style={{ '--d': 3 }}>
            {service.lede}
          </p>
          <div className="sd-acts an" style={{ '--d': 4 }}>
            <WhatsAppLink className="btn btn-green" message={quoteMessage}>
              <Icon name="i-wa" />
              Get a free quote
            </WhatsAppLink>
            <Link className="btn btn-ghost" to="/contact" onClick={() => presetService(service.name)}>
              Book online <Icon name="i-arrow" />
            </Link>
          </div>
          <div className="sd-facts an" style={{ '--d': 5 }}>
            {service.facts.map((f) => (
              <div key={f.label}>
                <span>{f.label}</span>
                <b>{f.value}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="sd-media">
          <svg className="sd-spark" aria-hidden="true">
            <use href="#spark" />
          </svg>
          <svg className="sd-spark s2" aria-hidden="true">
            <use href="#spark" />
          </svg>
          <div className="ph">
            <img src={service.image} alt={service.alt} fetchPriority="high" />
          </div>
          <div className="sd-float">
            <span className="ic">
              <Icon name="i-bolt" />
            </span>
            <div>
              Same-day slots<small>Across every Dubai area</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
