import { services } from '../../data/services';

/** Endless scrolling strip of service names (the list is doubled for a seamless loop). */
export default function ServiceTicker() {
  const row = (
    <div>
      {services.map((s) => (
        <span key={s.slug}>
          {s.name}
          <svg aria-hidden="true">
            <use href="#spark" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker" aria-hidden="true">
      <div className="tr">
        {row}
        {row}
      </div>
    </div>
  );
}
