import { prefersReducedMotion } from './useMediaQuery';

const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * 3D tilt + glare for cards. Spread on the element:
 *   <a {...tilt} className="svc-card">
 * Sets --rx, --ry, --mx, --my which the CSS uses.
 */
export const tilt = {
  onPointerMove(e) {
    if (!fine() || prefersReducedMotion()) return;
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
    c.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
    c.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    c.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  },
};

/** Spotlight that follows the cursor (sets --mx / --my in px). */
export const spotlight = {
  onPointerMove(e) {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
  },
};
