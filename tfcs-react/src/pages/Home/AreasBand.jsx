import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import areasImg from '../../assets/banners/areas.webp';
import { site } from '../../data/site';
import { featuredAreas } from '../../data/areas';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

/** Dark coverage band with a parallax city photo. */
export default function AreasBand() {
  const img = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const onScroll = () => {
      const el = img.current;
      if (!el) return;
      const r = el.parentNode.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        el.style.transform = `translateY(${(-(r.top + r.height) / (window.innerHeight + r.height)) * 12}%)`;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="areas on-dark">
      <div className="bg">
        <img loading="lazy" ref={img} src={areasImg} alt="" />
      </div>
      <div className="wrap">
        <div className="rv">
          <span className="label">Coverage</span>
          <h2 className="h-l" style={{ margin: '18px 0 22px' }}>
            Every major Dubai community.
          </h2>
          <p className="lede">
            Our team is based in {site.address.base} and covers the whole city. Don&apos;t see your area? Message us on
            WhatsApp.
          </p>
          <p style={{ marginTop: 26 }}>
            <Link className="link" to="/areas" style={{ color: '#fff' }}>
              View all areas <Icon name="i-arrow" />
            </Link>
          </p>
        </div>
        <ul className="rv d1">
          {featuredAreas.map(([name, type]) => (
            <li key={name}>
              {name} <span>{type}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
