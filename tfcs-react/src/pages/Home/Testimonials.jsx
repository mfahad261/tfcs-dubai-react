import { useState } from 'react';
import apartmentImg from '../../assets/services/apartment.webp';
import { testimonials } from '../../data/home';
import { pad2 } from '../../lib/format';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

/** Auto-rotating reviews. Pauses while hovered. */
export default function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar animation
  const n = testimonials.length;

  const go = (next) => {
    setI((next + n) % n);
    setCycle((c) => c + 1);
  };

  return (
    <section className="sec">
      <div
        className={`wrap quotes${paused ? ' paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="ph reveal-img">
          <img loading="lazy" src={apartmentImg} alt="A calm, tidy apartment living room" />
        </div>
        <div>
          <span className="label">What our Dubai clients say</span>
          <div className="qwrap" style={{ marginTop: 28 }}>
            {testimonials.map((t, k) => (
              <figure key={t.name} className={`q${k === i ? ' on' : ''}`} aria-hidden={k !== i}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="av">{t.name[0]}</span>
                  <div>
                    <b>{t.name}</b>
                    <br />
                    <span>{t.meta}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="qnav">
            <button className="arr" type="button" aria-label="Previous review" onClick={() => go(i - 1)}>
              <Icon name="i-left" />
            </button>
            <button className="arr" type="button" aria-label="Next review" onClick={() => go(i + 1)}>
              <Icon name="i-arrow" />
            </button>
            <span className="qcount">
              {pad2(i + 1)} / {pad2(n)}
            </span>
            <span className="qbar">
              <i key={cycle} className={reduce ? undefined : 'run'} onAnimationEnd={() => go(i + 1)} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
