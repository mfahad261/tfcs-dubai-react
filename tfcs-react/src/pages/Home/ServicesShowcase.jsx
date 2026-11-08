import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { serviceBySlug, services } from '../../data/services';
import { featuredServices } from '../../data/home';
import { pad2 } from '../../lib/format';
import { tilt } from '../../hooks/usePointerFx';
import Icon from '../../components/Icon';

/** Home page service cards (swipeable on phones). */
export default function ServicesShowcase() {
  const bar = useRef(null);

  const onScroll = (e) => {
    const g = e.currentTarget;
    const max = g.scrollWidth - g.clientWidth;
    bar.current?.style.setProperty('--sp', `${(17 + (max > 0 ? g.scrollLeft / max : 0) * 83).toFixed(1)}%`);
  };

  return (
    <section className="sec sec-mist">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">Our services</span>
            <h2 className="h-l">From deep cleaning to AMC contracts.</h2>
          </div>
          <div className="rv d1">
            <p className="lede">
              Complete cleaning and technical services for homes and businesses, all delivered by our own supervised
              team.
            </p>
            <p style={{ marginTop: 22 }}>
              <Link className="link" to="/services">
                See all {services.length} services <Icon name="i-arrow" />
              </Link>
            </p>
          </div>
        </div>

        <div className="svc-grid" onScroll={onScroll}>
          {featuredServices.map((f, i) => {
            const s = serviceBySlug[f.slug];
            return (
              <Link key={s.slug} className="svc-card" to={`/services/${s.slug}`} style={{ '--i': i }} {...tilt}>
                <div className="ph">
                  <img loading="lazy" src={s.image} alt={s.alt} />
                  <span className="num">{pad2(s.index + 1)}</span>
                  {f.badge && <span className="tag">{f.badge}</span>}
                  <span className="peek">{f.peek}</span>
                  <span className="sic">
                    <Icon name={s.icon} />
                  </span>
                  <span className="glare" />
                </div>
                <div className="bd">
                  <h3>{s.name}</h3>
                  <p>{s.tagline}.</p>
                  <span className="more">
                    <span>
                      <i>View service</i>
                      <i>View service</i>
                    </span>
                    <span className="arr">
                      <Icon name="i-arrow" />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="swipe-hint" aria-hidden="true">
          <span>Swipe</span>
          <i>
            <b ref={bar} />
          </i>
          <span>{featuredServices.length} services</span>
        </div>
      </div>
    </section>
  );
}
