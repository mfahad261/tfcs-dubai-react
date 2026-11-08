export default function ServiceProcess({ service }) {
  return (
    <section className="sec sec-mist">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">How it works</span>
            <h2 className="h-l">Your {service.short}, step by step.</h2>
          </div>
          <p className="lede rv d1">
            Book on WhatsApp, by phone or online. We confirm the scope and price before anything starts.
          </p>
        </div>
        <div className="proc">
          {service.process.map((p, k) => (
            <div key={p.title}>
              <span className="dot">{k + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
