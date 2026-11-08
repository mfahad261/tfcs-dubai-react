import { useRef, useState } from 'react';
import { transformations } from '../../data/home';
import { prefersReducedMotion } from '../../hooks/useMediaQuery';
import Icon from '../../components/Icon';

/** Drag-to-compare before/after slider with job tabs. */
export default function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const [pos, setPos] = useState(52);
  const [swapping, setSwapping] = useState(false);
  const timer = useRef();

  const pick = (i) => {
    setIndex(i);
    setSwapping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => {
        setShown(i);
        setPos(52);
        setSwapping(false);
      },
      prefersReducedMotion() ? 0 : 380
    );
  };

  const job = transformations[shown];

  return (
    <section className="sec sec-deep ba-sec on-dark">
      <div className="wrap">
        <div className="rv">
          <span className="label">Results</span>
          <h2 className="h-l">Before and after transformations.</h2>
          <p className="lede">Pick a job, then drag the line to see the difference across Dubai properties.</p>
          <div className="ba-tabs" role="tablist" aria-label="Transformations">
            {transformations.map((t, i) => (
              <button key={t.label} role="tab" aria-selected={i === index} onClick={() => pick(i)}>
                {t.label} <span>{t.service}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rv d1">
          <div className={`ba${swapping ? ' swap' : ''}${job.before ? ' real' : ''}`} style={{ '--pos': `${pos}%` }}>
            <img loading="lazy" src={job.after} alt={`${job.label} after cleaning by TFCS`} />
            <div className="before">
              <img loading="lazy" src={job.before || job.after} alt={`${job.label} before cleaning`} />
            </div>
            <span className="tg l">Before</span>
            <span className="tg r">After</span>
            <input
              type="range"
              min="0"
              max="100"
              value={pos}
              aria-label="Compare before and after"
              onChange={(e) => setPos(Number(e.target.value))}
            />
            <div className="handle" aria-hidden="true">
              <span className="knob">
                <Icon name="i-lr" />
              </span>
            </div>
          </div>
          <div className="ba-cmp" aria-live="polite">
            <div>
              <b>Before</b>
              <span>{job.beforeText}</span>
            </div>
            <div>
              <b>After</b>
              <span>{job.afterText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
