import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { services } from '../data/services';
import { footerAreas } from '../data/areas';
import { useToast } from '../context/ToastContext';
import { isEmail } from '../lib/validation';
import { subscribeNewsletter } from '../lib/api';
import Logo from '../components/Logo';

export default function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast('Enter a valid email address to subscribe');
      e.currentTarget.querySelector('input')?.focus();
      return;
    }
    try {
      await subscribeNewsletter(email.trim());
      setEmail('');
      toast('Subscribed. Offers arrive once a season.');
    } catch {
      toast('Could not subscribe right now. Please try again.');
    }
  };

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Logo label={site.name} />
            <p className="legal">{site.legalName}</p>
            <p>
              Residential, commercial, specialist and technical cleaning across Dubai. Licensed professionals, same-day
              service and AMC contracts.
            </p>
            <p style={{ marginTop: 14 }}>
              {site.address.full}
              <br />
              <a href={`tel:${site.phone.tel}`}>{site.phone.international}</a>
            </p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Areas</h4>
            <ul>
              {footerAreas.map((a) => (
                <li key={a}>
                  <Link to="/areas">{a}</Link>
                </li>
              ))}
              <li>
                <Link to="/areas">All areas</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/amc">AMC contracts</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href={`tel:${site.phone.tel}`}>{site.phone.international}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
            <form className="news" noValidate onSubmit={subscribe}>
              <label className="sr" htmlFor="nmail">
                Email address
              </label>
              <input
                id="nmail"
                type="email"
                placeholder="Email for offers"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="fword" aria-hidden="true">
          {site.brand}
        </div>

        <div className="fbot">
          <span>
            © {new Date().getFullYear()} {site.legalName} ({site.brand}). All rights reserved.
          </span>
          <span>Privacy policy &nbsp;·&nbsp; Terms and conditions</span>
          <span className="fcredit">
            Website by{' '}
            <a href={site.developer.url} target="_blank" rel="noopener">
              {site.developer.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
