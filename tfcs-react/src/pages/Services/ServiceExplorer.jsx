import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../../data/services';
import { pad2 } from '../../lib/format';
import Icon from '../../components/Icon';

const FILTERS = [
  { key: 'all', label: 'All', icon: 'i-grid' },
  { key: 'home', label: 'Homes', icon: 'i-home' },
  { key: 'biz', label: 'Businesses', icon: 'i-store' },
  { key: 'fabric', label: 'Carpets and fabric', icon: 'i-sofa' },
  { key: 'glass', label: 'Windows and facades', icon: 'i-window' },
];

/**
 * Services list with category filter.
 * On desktop, a photo preview follows the cursor over the list.
 */
export default function ServiceExplorer() {
  const [filter, setFilter] = useState('all');
  const [hovered, setHovered] = useState(0);
  const [previewOn, setPreviewOn] = useState(false);

  const listRef = useRef(null);
  const previewRef = useRef(null);
  const motion = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });

  const matches = (s) => filter === 'all' || s.categories.includes(filter);
  const count = services.filter(matches).length;

  // Cursor-follow preview
  const place = () => {
    const m = motion.current;
    previewRef.current.style.transform = `translate3d(${m.x.toFixed(1)}px,${m.y.toFixed(1)}px,0)`;
  };
  const loop = () => {
    const m = motion.current;
    m.x += (m.tx - m.x) * 0.16;
    m.y += (m.ty - m.y) * 0.16;
    place();
    m.raf = Math.abs(m.tx - m.x) + Math.abs(m.ty - m.y) > 0.4 ? requestAnimationFrame(loop) : 0;
  };
  const listHandlers = {
    onMouseEnter(e) {
      const m = motion.current;
      m.x = m.tx = e.clientX;
      m.y = m.ty = e.clientY;
      place();
    },
    onMouseMove(e) {
      const m = motion.current;
      m.tx = e.clientX;
      m.ty = e.clientY;
      if (!m.raf) m.raf = requestAnimationFrame(loop);
    },
    onMouseLeave() {
      setPreviewOn(false);
    },
  };

  useEffect(() => {
    const onScroll = () => {
      if (listRef.current && !listRef.current.matches(':hover')) setPreviewOn(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const m = motion.current;
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(m.raf);
    };
  }, []);

  return (
    <section className="sec">
      <div className="wrap">
        <div className="pick" role="group" aria-label="Filter services">
          <span className="pick-l">What are you cleaning?</span>
          {FILTERS.map((f) => (
            <button key={f.key} type="button" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              <Icon name={f.icon} />
              {f.label}
            </button>
          ))}
          <span className="cnt" aria-live="polite">
            {filter === 'all' ? `${services.length} services` : `${count} of ${services.length} services match`}
          </span>
        </div>

        <div className="sx" ref={listRef} {...listHandlers}>
          {services.map((s, k) => (
            <Link
              key={s.slug}
              className={`sx-row${matches(s) ? '' : ' dim'}`}
              to={`/services/${s.slug}`}
              onMouseEnter={() => {
                setHovered(k);
                setPreviewOn(true);
              }}
            >
              <div className="n">
                {pad2(k + 1)}
                <Icon name={s.icon} />
              </div>
              <div className="th">
                <img loading="lazy" src={s.image} alt={s.alt} />
              </div>
              <div className="nm">
                <h2>{s.name}</h2>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <p className="t">{s.tagline}.</p>
              <span className="go" aria-hidden="true">
                <Icon name="i-arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div id="hoverImg" ref={previewRef} className={previewOn ? 'on' : undefined} aria-hidden="true">
        <div className="in">
          {services.map((s, k) => (
            <img key={s.slug} className={k === hovered ? 'on' : undefined} loading="lazy" src={s.image} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}
