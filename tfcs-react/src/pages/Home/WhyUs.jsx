import { whyUs } from '../../data/home';
import { spotlight } from '../../hooks/usePointerFx';
import Icon from '../../components/Icon';

export default function WhyUs() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="head one">
          <div className="rv">
            <span className="label">Why TFCS</span>
            <h2 className="h-l" style={{ maxWidth: '16em' }}>
              The premium choice for residents, businesses and property managers.
            </h2>
          </div>
        </div>
        <div className="why rv">
          {whyUs.map((w) => (
            <div key={w.title} {...spotlight}>
              <Icon name={w.icon} />
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
