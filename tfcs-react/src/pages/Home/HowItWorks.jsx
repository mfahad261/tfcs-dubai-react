import { steps } from '../../data/home';

export default function HowItWorks() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="head">
          <div className="rv">
            <span className="label">How it works</span>
            <h2 className="h-l">A free quote in minutes. A spotless space the same day.</h2>
          </div>
          <p className="lede rv d1">
            WhatsApp is the fastest way to reach us. Send a few photos and we&apos;ll reply with a clear scope and
            price.
          </p>
        </div>
        <div className="steps rv">
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="n">{i + 1}</span>
              <h3 className="h-s">{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
