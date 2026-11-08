import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { pad2 } from '../lib/format';
import Icon from '../components/Icon';
import WhatsAppLink from '../components/WhatsAppLink';

/** Desktop "Services" dropdown with a live preview of the hovered service. */
export default function MegaMenu({ open, currentPath, onNavigate }) {
  const [active, setActive] = useState(0); // highlighted item + preview image
  const [shown, setShown] = useState(0); // preview text (changes after a short fade)
  const [switching, setSwitching] = useState(false);
  const timer = useRef();

  const preview = (k) => {
    if (k === active) return;
    setActive(k);
    setSwitching(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(k);
      setSwitching(false);
    }, 160);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  const s = services[shown];

  return (
    <div id="mega" aria-hidden={!open}>
      <div className="shell">
        <div className="wrap mgrid">
          <div className="mlist">
            {services.map((sv, k) => {
              const to = `/services/${sv.slug}`;
              const cls = ['mi', k === active && 'on', currentPath === to && 'cur'].filter(Boolean).join(' ');
              return (
                <Link
                  key={sv.slug}
                  className={cls}
                  to={to}
                  style={{ '--i': k }}
                  tabIndex={open ? undefined : -1}
                  onMouseEnter={() => preview(k)}
                  onFocus={() => preview(k)}
                  onClick={onNavigate}
                >
                  <span className="ic">
                    <Icon name={sv.icon} />
                  </span>
                  <span>
                    <b>{sv.name}</b>
                    <small>{sv.tagline}</small>
                  </span>
                  <span className="n">{pad2(k + 1)}</span>
                </Link>
              );
            })}
          </div>

          <div className={`mprev${switching ? ' sw' : ''}`}>
            <svg className="spark" aria-hidden="true">
              <use href="#spark" />
            </svg>
            <div className="ph">
              {services.map((sv, k) => (
                <img key={sv.slug} className={k === active ? 'on' : undefined} loading="lazy" src={sv.image} alt="" />
              ))}
            </div>
            <div className="bd">
              <span className="k">
                Service {pad2(shown + 1)} of {pad2(services.length)}
              </span>
              <h4>{s.name}</h4>
              <p>{s.lede}</p>
              <Link className="go" to={`/services/${s.slug}`} tabIndex={open ? undefined : -1} onClick={onNavigate}>
                View service <Icon name="i-arrow" />
              </Link>
            </div>
          </div>

          <div className="mfoot">
            <span>Not sure which service you need? Send us a photo and we&apos;ll tell you.</span>
            <span className="ml">
              <WhatsAppLink tabIndex={open ? undefined : -1}>
                <Icon name="i-wa" />
                WhatsApp us
              </WhatsAppLink>
              <Link to="/services" tabIndex={open ? undefined : -1} onClick={onNavigate}>
                All services <Icon name="i-arrow" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
