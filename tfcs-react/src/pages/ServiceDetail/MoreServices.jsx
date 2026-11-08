import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { pad2 } from '../../lib/format';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

/** "Other services" carousel plus previous / next links. */
export default function MoreServices({ service }) {
  const track = useRef(null);
  const i = service.index;
  const prev = services[(i + services.length - 1) % services.length];
  const next = services[(i + 1) % services.length];

  const scroll = (dir) => {
    const m = track.current;
    m.scrollBy({ left: dir * m.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section className="sec sec-mist">
      <div className="wrap">
        <div className="more-head">
          <div className="rv">
            <span className="label">Explore more</span>
            <h2 className="h-l" style={{ marginTop: 14 }}>
              Other services.
            </h2>
          </div>
          <div className="more-nav">
            <button type="button" aria-label="Scroll back" onClick={() => scroll(-1)}>
              <Icon name="i-left" />
            </button>
            <button type="button" aria-label="Scroll forward" onClick={() => scroll(1)}>
              <Icon name="i-arrow" />
            </button>
          </div>
        </div>

        <div className="more" id="more" ref={track}>
          {services.map((x, k) =>
            x.slug === service.slug ? null : (
              <Link key={x.slug} to={`/services/${x.slug}`}>
                <div className="ph">
                  <img loading="lazy" src={x.image} alt={x.alt} />
                  <span className="sic">
                    <Icon name={x.icon} />
                  </span>
                  <span className="nn">{pad2(k + 1)}</span>
                </div>
                <div>
                  <b>
                    {x.name}
                    <Icon name="i-arrow" />
                  </b>
                </div>
                <small>{x.tagline}</small>
              </Link>
            )
          )}
        </div>

        <nav className="pn" aria-label="Previous and next service" style={{ marginTop: 'clamp(48px,6vw,80px)' }}>
          <Link to={`/services/${prev.slug}`}>
            <span>
              <Icon name="i-left" />
              Previous service
            </span>
            <b>{prev.name}</b>
          </Link>
          <Link to={`/services/${next.slug}`}>
            <span>
              Next service
              <Icon name="i-arrow" />
            </span>
            <b>{next.name}</b>
          </Link>
        </nav>
      </div>
    </section>
  );
}
