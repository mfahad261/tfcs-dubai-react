import { pad2 } from '../../lib/format';

const ITEMS = [
  ['Licensed and verified', 'Every team member is trained and background-checked.'],
  ['Family safe', 'Child-safe and pet-safe products used by default.'],
  ['Fast response', 'Same-day and next-day booking via WhatsApp or phone.'],
  ['Transparent pricing', 'Free quotes with no hidden fees.'],
  ['AMC solutions', 'Annual contracts for offices, buildings and villas.'],
];

export default function Differentiators() {
  return (
    <section className="sec sec-deep on-dark">
      <div className="wrap faq">
        <div className="side rv">
          <span className="label">What sets us apart</span>
          <h2 className="h-l" style={{ marginTop: 18 }}>
            Five things clients rely on.
          </h2>
        </div>
        <ol className="tl rv d1">
          {ITEMS.map(([title, text], i) => (
            <li key={title}>
              <span className="yr">{pad2(i + 1)}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
