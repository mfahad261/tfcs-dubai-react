import { useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import WhatsAppLink from '../components/WhatsAppLink';
import { prefersReducedMotion } from '../hooks/useMediaQuery';

const RING = 163.4; // circumference of the progress ring

/**
 * Floating WhatsApp button + back-to-top button with scroll progress ring.
 * Also sets the body classes `show-top` and `sd-show` used by other fixed elements.
 */
export default function FloatingActions() {
  const ring = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.body.classList.toggle('show-top', y > 700);
      document.body.classList.toggle('sd-show', y > 420);
      if (ring.current) ring.current.style.strokeDashoffset = RING * (1 - (max > 0 ? y / max : 0));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const b = btn.current;
    b.classList.remove('fly');
    void b.offsetWidth;
    b.classList.add('fly');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <>
      <WhatsAppLink className="fab fab-wa" aria-label="Chat on WhatsApp">
        <Icon name="i-wa" />
      </WhatsAppLink>
      <button className="fab" id="toTop" ref={btn} type="button" aria-label="Back to top" onClick={toTop}>
        <svg className="ring" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r="26" stroke="#E3E9F0" />
          <circle ref={ring} cx="28" cy="28" r="26" stroke="#0D3553" strokeDasharray={RING} strokeDashoffset={RING} />
        </svg>
        <Icon name="i-up" />
      </button>
    </>
  );
}
