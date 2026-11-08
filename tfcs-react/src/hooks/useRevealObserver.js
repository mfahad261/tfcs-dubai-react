import { useEffect } from 'react';
import { prefersReducedMotion } from './useMediaQuery';

const REVEAL = '.rv:not(.in),.reveal-img:not(.in),.steps:not(.in),.proc:not(.in),.svc-grid:not(.in)';
const COUNT = '[data-count]:not([data-done])';

/**
 * Site-wide scroll reveal and number count-up.
 * Any element with class `rv`, `reveal-img`, `steps`, `proc` or `svc-grid` gets `.in`
 * when it scrolls into view. Elements with `data-count="15"` count up from 0.
 * Works for content added later too (it watches the DOM).
 */
export function useRevealObserver() {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const to = Number(el.dataset.count);
          countIo.unobserve(el);
          el.dataset.done = '1';
          let t0 = null;
          const step = (t) => {
            if (!t0) t0 = t;
            const p = Math.min(1, (t - t0) / (reduce ? 1 : 1400));
            el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );

    let raf = 0;
    const scan = () => {
      raf = 0;
      document.querySelectorAll(REVEAL).forEach((el) => io.observe(el));
      document.querySelectorAll(COUNT).forEach((el) => countIo.observe(el));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(scan);
    };

    scan();
    const mo = new MutationObserver(schedule);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      countIo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}
