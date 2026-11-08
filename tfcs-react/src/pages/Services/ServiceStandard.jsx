import Icon from '../../components/Icon';

const ITEMS = [
  {
    icon: 'i-badge',
    title: 'Supervised every time',
    text: 'A team lead checks every job against our quality checklist.',
  },
  {
    icon: 'i-heart',
    title: 'Family and pet safe',
    text: 'Safe products are used by default in every home and office.',
  },
  { icon: 'i-clock', title: 'Same-day and after hours', text: 'Morning, evening and weekend slots across Dubai.' },
  { icon: 'i-shield', title: 'We make it right', text: 'If anything is missed, we come back and fix it.' },
];

export default function ServiceStandard() {
  return (
    <section className="sec sec-deep on-dark">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">Every service includes</span>
            <h2 className="h-l">The TFCS standard, on every job.</h2>
          </div>
          <p className="lede rv d1">
            Whichever service you book, you get the same supervised team, the same checklist and the same promise.
          </p>
        </div>
        <div className="pr-grid">
          {ITEMS.map((it, i) => (
            <div key={it.title} className={`rv${i % 3 ? ` d${i % 3}` : ''}`}>
              <Icon name={it.icon} />
              <h3>{it.title}</h3>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
