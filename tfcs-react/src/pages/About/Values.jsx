const VALUES = [
  ['Premium quality', 'Every clean meets our detailed quality checklist, with supervisor oversight on every job.'],
  ['Trust and safety', 'Background-verified staff and family-safe products you can rely on in your home.'],
  ['Reliability', 'On-time arrival, consistent results and responsive support on WhatsApp and phone.'],
];

export default function Values() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">Our values</span>
            <h2 className="h-l">Quality, trust and reliability.</h2>
          </div>
        </div>
        <div className="values rv">
          {VALUES.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
