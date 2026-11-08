import { useState } from 'react';

/** FAQ accordion. Only one item open at a time; the first is open by default. */
export default function Accordion({ items, className = 'acc rv d1' }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={className}>
      {items.map((item, i) => (
        <div key={item.q} className={`acc-item${open === i ? ' open' : ''}`}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {item.q}
            <span className="pm" />
          </button>
          <div className="acc-body">
            <div>
              <p>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
