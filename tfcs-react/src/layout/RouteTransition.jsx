import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitles } from '../data/navigation';
import { serviceBySlug } from '../data/services';
import { prefersReducedMotion } from '../hooks/useMediaQuery';

/**
 * Page-change curtain.
 * When the URL changes, a curtain slides up showing the next page name, the page
 * swaps underneath it, then the curtain slides away. Pages render from
 * `useDisplayLocation()` (the location currently on screen), not the URL.
 */
const DisplayLocationContext = createContext(null);
export const useDisplayLocation = () => useContext(DisplayLocationContext);

const IN_MS = 700;
const OUT_MS = 780;

function labelFor(pathname) {
  const m = pathname.match(/^\/services\/([\w-]+)\/?$/);
  if (m && serviceBySlug[m[1]]) return serviceBySlug[m[1]].name;
  return pageTitles[pathname.replace(/\/$/, '') || '/'] || 'TFCS';
}

export default function RouteTransition({ children }) {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const target = useRef(location);
  const shownRef = useRef(location);
  const busy = useRef(false);
  const curtain = useRef(null);
  const label = useRef(null);
  const timers = useRef([]);

  target.current = location;

  const swap = useCallback(() => {
    shownRef.current = target.current;
    setShown(target.current);
  }, []);

  const go = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const c = curtain.current;
    label.current.textContent = labelFor(target.current.pathname);
    c.classList.remove('out');
    void c.offsetWidth;
    c.classList.add('in');
    timers.current.push(
      setTimeout(() => {
        swap();
        c.classList.remove('in');
        c.classList.add('out');
        timers.current.push(
          setTimeout(() => {
            c.style.transition = 'none';
            c.classList.remove('out');
            void c.offsetWidth;
            c.style.transition = '';
            busy.current = false;
            if (target.current.pathname !== shownRef.current.pathname) go();
          }, OUT_MS)
        );
      }, IN_MS)
    );
  }, [swap]);

  useEffect(() => {
    if (location.pathname === shownRef.current.pathname) {
      if (location !== shownRef.current) swap();
      return;
    }
    if (prefersReducedMotion()) swap();
    else go();
  }, [location, go, swap]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // New page starts at the top
  const firstPaint = useRef(true);
  useLayoutEffect(() => {
    if (firstPaint.current) {
      firstPaint.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [shown.pathname]);

  return (
    <DisplayLocationContext.Provider value={shown}>
      <div id="curtain" ref={curtain} aria-hidden="true">
        <span className="t" ref={label}>
          TFCS
        </span>
      </div>
      {children}
    </DisplayLocationContext.Provider>
  );
}
