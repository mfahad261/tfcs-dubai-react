import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { numberWord, pad2 } from '../../lib/format';
import Icon from '../../components/Icon';

export default function ServicesHero() {
  return (
    <section className="sv-hero">
      <span className="glow" />
      <span className="glow g2" />
      <div className="wrap">
        <div className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Services</span>
        </div>
        <div className="top">
          <h1 className="h-xl">
            {numberWord(services.length)} services.
            <br />
            <span className="hl">One spotless standard.</span>
          </h1>
          <p className="lede">
            Deep cleaning for homes, offices, shops and warehouses across Dubai, plus specialist carpet, upholstery,
            window, facade, AC duct and water tank care. Pick a service to see exactly what is included.
          </p>
        </div>
        <nav className="jump" aria-label="Jump to a service">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              <Icon name={s.icon} />
              <span>
                <small>{pad2(i + 1)}</small>
                {s.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
