import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { planGroups, planCompare } from '../../data/plans';
import { useBooking } from '../../context/BookingContext';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

/** AMC plan cards with Homes / Offices toggle, plus the comparison table. */
export default function PlanCards() {
  const { presetService } = useBooking();
  const [groupKey, setGroupKey] = useState(planGroups[0].key);
  const [shownKey, setShownKey] = useState(planGroups[0].key);
  const [fading, setFading] = useState(false);
  const timer = useRef();

  const switchTo = (key) => {
    setGroupKey(key);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setShownKey(key);
        setFading(false);
      },
      prefersReducedMotion() ? 0 : 220
    );
  };

  const group = planGroups.find((g) => g.key === shownKey);
  const bookAmc = () => presetService('AMC contract');

  return (
    <section className="sec">
      <div className="wrap">
        <div className="ptoggle" role="group" aria-label="Contract type">
          {planGroups.map((g) => (
            <button key={g.key} type="button" aria-pressed={g.key === groupKey} onClick={() => switchTo(g.key)}>
              {g.label}
            </button>
          ))}
        </div>

        <div className="plans rv" style={{ transition: 'opacity .25s', opacity: fading ? 0 : 1 }}>
          {group.plans.map((p) => (
            <article key={p.name} className={`plan${p.featured ? ' feat' : ''}`}>
              <div className="top">
                <h3 className="h-s">{p.name}</h3>
                {p.featured && <span>Most chosen</span>}
              </div>
              <p>{p.text}</p>
              <div className="amt">
                <b style={{ fontSize: 40 }}>{p.freq}</b>
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Icon name="i-tick" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link className={`btn ${p.featured ? 'btn-green' : 'btn-line'}`} to="/contact" onClick={bookAmc}>
                Request a quote
              </Link>
            </article>
          ))}
        </div>

        <div className="addons">
          <div className="rv">
            <span className="label">Compare</span>
            <h2 className="h-m" style={{ marginTop: 16 }}>
              What each contract includes.
            </h2>
            <p className="lede" style={{ marginTop: 16 }}>
              Every contract is tailored after a free site visit. This is a starting point for the conversation.
            </p>
            <Link className="btn btn-deep" to="/contact" onClick={bookAmc} style={{ marginTop: 28 }}>
              Request an AMC quote
            </Link>
          </div>
          <div className="tscroll rv d1">
            <table className="cmp">
              <thead>
                <tr>
                  <th>Included</th>
                  <th>Essential</th>
                  <th>Complete</th>
                  <th>{group.topTier}</th>
                </tr>
              </thead>
              <tbody>
                {planCompare.map(([feature, ...cells]) => (
                  <tr key={feature}>
                    <td>{feature}</td>
                    {cells.map((yes, i) =>
                      yes ? (
                        <td key={i}>
                          <Icon name="i-tick" />
                        </td>
                      ) : (
                        <td key={i} className="no">
                          –
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
