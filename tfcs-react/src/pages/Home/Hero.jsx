import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/banners/hero.webp';
import deepImg from '../../assets/services/deep.webp';
import carpetImg from '../../assets/services/carpet.webp';
import { site } from '../../data/site';
import { services } from '../../data/services';
import { useApp } from '../../context/AppContext';
import { tilt } from '../../hooks/usePointerFx';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';
import WhatsAppLink from '../../components/WhatsAppLink';

/** Home hero: headline, CTAs, before/after photo with parallax. */
export default function Hero() {
  const { ready } = useApp();
  const [settled, setSettled] = useState(false);
  const imgWrap = useRef(null);

  // After the entrance animation, drop the image transition so parallax is smooth
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setSettled(true), 2200);
    return () => clearTimeout(t);
  }, [ready]);

  // Subtle parallax on desktop
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = imgWrap.current;
      if (!el) return;
      if (window.innerWidth <= 860) el.style.setProperty('--py', '0px');
      else el.style.setProperty('--py', `${(Math.min(window.scrollY, 1200) * 0.16).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={`sh${settled ? ' settled' : ''}`} id="sh" aria-label="Introduction">
      <div className="sh-media">
        <div className="sh-img" ref={imgWrap}>
          <img
            src={heroImg}
            width="1599"
            height="984"
            alt="TFCS cleaner restoring a dusty Dubai apartment living room, dusty on the left and freshly cleaned on the right"
            fetchPriority="high"
          />
          <span className="cx-chip after">
            <i />
            After TFCS
          </span>
          <span className="cx-chip before">
            <i />
            Before
          </span>
        </div>
        <div className="sh-glass up" style={{ '--d': 7 }}>
          <span className="dot" aria-hidden="true" />
          <div>
            <b>Booking 7 days a week</b>
            <small>Free quotes on WhatsApp</small>
          </div>
        </div>
      </div>

      <div className="wrap sh-in">
        <div className="sh-copy">
          <span className="sh-tag sl" style={{ '--d': 0 }}>
            Cleaning services in Dubai
          </span>
          <h1 className="sh-h">
            <span className="sl" style={{ '--d': 1 }}>
              We keep Dubai
            </span>
            <span className="sl" style={{ '--d': 2 }}>
              spaces <em>spotless</em>
            </span>
            <span className="sl" style={{ '--d': 3 }}>
              and fresh.
            </span>
          </h1>
          <p className="sh-p sl" style={{ '--d': 4 }}>
            Deep cleaning, carpets, upholstery, windows, facades, AC ducts and water tanks for homes, offices, shops and warehouses.
            One supervised team, across every Dubai community.
          </p>
          <div className="sh-cta sl" style={{ '--d': 5 }}>
            <WhatsAppLink className="btn btn-green">
              Get a free quote <Icon name="i-arrow" />
            </WhatsAppLink>
            <a className="sh-call" href={`tel:${site.phone.tel}`}>
              <span className="ring">
                <Icon name="i-phone" />
              </span>
              <span>
                <small>Call us now</small>
                {site.phone.display}
              </span>
            </a>
          </div>

          <div className="sh-cards">
            <Link className="sh-thumb up" style={{ '--d': 6 }} to="/services/deep-cleaning-dubai" {...tilt}>
              <img src={deepImg} alt="" />
              <span className="ic">
                <Icon name="i-spray" />
              </span>
              <b>Deep cleaning</b>
              <span className="glare" />
            </Link>
            <Link className="sh-thumb up" style={{ '--d': 7 }} to="/services/carpet-shampoo-cleaning" {...tilt}>
              <img src={carpetImg} alt="" />
              <span className="ic">
                <Icon name="i-rug" />
              </span>
              <b>Carpet shampoo</b>
              <span className="glare" />
            </Link>
            <Link className="sh-stat up" style={{ '--d': 8 }} to="/services" {...tilt}>
              <b>{services.length}</b>
              <span>
                Services, one team<small>Homes and businesses</small>
              </span>
              <span className="go" aria-hidden="true">
                <Icon name="i-arrow" />
              </span>
              <span className="glare" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
