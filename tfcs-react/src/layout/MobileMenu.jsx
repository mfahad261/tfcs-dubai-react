import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { mainNav } from '../data/navigation';
import { services } from '../data/services';
import { pad2 } from '../lib/format';
import Icon from '../components/Icon';
import WhatsAppLink from '../components/WhatsAppLink';
import { isActive } from '../lib/routes';

/** Full-screen menu on phones and tablets. */
export default function MobileMenu({ open, currentPath }) {
  const [subOpen, setSubOpen] = useState(false);
  const tab = open ? undefined : -1;

  return (
    <div id="menu" aria-hidden={!open}>
      <nav aria-label="Mobile">
        {mainNav.map((item, i) => {
          const cls = isActive(item.to, currentPath) ? 'active' : undefined;
          if (!item.hasMega) {
            return (
              <Link key={item.to} to={item.to} className={cls} tabIndex={tab}>
                {item.label} <small>{pad2(i + 1)}</small>
              </Link>
            );
          }
          return (
            <Fragment key={item.to}>
              <div className="mrow">
                <Link to={item.to} className={cls} tabIndex={tab}>
                  {item.label}
                </Link>
                <button
                  className="msub-t"
                  type="button"
                  aria-expanded={subOpen}
                  aria-controls="msub"
                  aria-label="Show services"
                  tabIndex={tab}
                  onClick={() => setSubOpen((o) => !o)}
                >
                  <Icon name="i-plus" />
                </button>
              </div>
              <div className={`msub${subOpen ? ' open' : ''}`} id="msub">
                <div>
                  {services.map((s, k) => {
                    const to = `/services/${s.slug}`;
                    return (
                      <Link
                        key={s.slug}
                        to={to}
                        className={currentPath === to ? 'cur' : undefined}
                        tabIndex={subOpen ? tab : -1}
                      >
                        <small>{pad2(k + 1)}</small>
                        {s.name}
                      </Link>
                    );
                  })}
                  <Link to="/services" className="all" tabIndex={subOpen ? tab : -1}>
                    All services <Icon name="i-arrow" />
                  </Link>
                </div>
              </div>
            </Fragment>
          );
        })}
      </nav>
      <div className="foot">
        <a className="btn btn-green" href={`tel:${site.phone.tel}`} tabIndex={tab}>
          <Icon name="i-phone" />
          Call {site.phone.international}
        </a>
        <WhatsAppLink className="btn btn-ghost" tabIndex={tab}>
          <Icon name="i-wa" />
          WhatsApp for a free quote
        </WhatsAppLink>
      </div>
    </div>
  );
}
