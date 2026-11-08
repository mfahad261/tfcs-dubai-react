import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { prefersReducedMotion } from '../hooks/useMediaQuery';
import { LogoMark } from '../components/Logo';

/** Opening animation: logo reveal, then the two panels split open. */
export default function Intro() {
  const { setReady } = useApp();
  const [visible, setVisible] = useState(() => !prefersReducedMotion());
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.body.classList.add('ready');
      setReady(true);
      return;
    }
    const t1 = setTimeout(() => {
      ref.current?.classList.add('open');
      document.body.classList.add('ready');
      setReady(true);
    }, 1150);
    const t2 = setTimeout(() => setVisible(false), 1150 + 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setReady]);

  if (!visible) return null;
  return (
    <div id="intro" ref={ref} aria-hidden="true">
      <div className="p t" />
      <div className="p b" />
      <div className="mark">
        <div>
          <div className="word">
            <LogoMark />
          </div>
          <div className="rule" />
        </div>
      </div>
    </div>
  );
}
