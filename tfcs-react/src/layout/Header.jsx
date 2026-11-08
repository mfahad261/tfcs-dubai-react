import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site } from '../data/site';
import { mainNav } from '../data/navigation';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { useDisplayLocation } from './RouteTransition';
import { useFinePointer } from '../hooks/useMediaQuery';
import { isActive } from '../lib/routes';

export default function Header() {
  const { pathname: shownPath } = useDisplayLocation();
  const location = useLocation();
  const finePointer = useFinePointer();

  const navRef = useRef(null);
  const glassRef = useRef(null);
  const ddRef = useRef(null);
  const ddtRef = useRef(null);
  const hoverTimer = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Keep latest values for the scroll handler
  const state = useRef({ menuOpen, megaOpen });
  state.current = { menuOpen, megaOpen };

  /* ---------- mobile menu ---------- */
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.body.classList.toggle('locked', menuOpen);
  }, [menuOpen]);

  /* ---------- close everything when the URL changes ---------- */
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  /* ---------- scroll: solid background, hide on scroll down ---------- */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 60);
      const { menuOpen: m, megaOpen: g } = state.current;
      if (y > 600 && y > lastY + 2 && !m && !g) setHidden(true);
      else if (y < lastY - 2 || y <= 600) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- mega menu ---------- */
  const openMega = useCallback((open) => {
    setMegaOpen(open);
    if (open) setHidden(false);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      if (state.current.megaOpen) {
        setMegaOpen(false);
        ddtRef.current?.focus();
      }
    };
    const onDocClick = (e) => {
      if (state.current.megaOpen && ddRef.current && !ddRef.current.contains(e.target)) setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onDocClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  const ddHandlers = {
    onMouseEnter() {
      if (!finePointer) return;
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => openMega(true), 90);
    },
    onMouseLeave() {
      if (!finePointer) return;
      clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => openMega(false), 220);
    },
    onBlur(e) {
      if (!ddRef.current.contains(e.relatedTarget)) openMega(false);
    },
  };

  const toggleMega = () => {
    clearTimeout(hoverTimer.current);
    const next = !megaOpen;
    openMega(next);
    if (next) setTimeout(() => ddRef.current?.querySelector('#mega .mi')?.focus(), 0);
  };

  const navClass = ['nav', solid && 'solid', hidden && 'hide', megaOpen && 'mega-on'].filter(Boolean).join(' ');

  return (
    <>
      <header
        className={navClass}
        id="nav"
        ref={navRef}
        onPointerMove={(e) => {
          const g = glassRef.current;
          const r = g.getBoundingClientRect();
          g.style.setProperty('--gx', `${e.clientX - r.left}px`);
        }}
      >
        <span className="nav-glass" ref={glassRef} aria-hidden="true" />
        <div className="wrap nav-in">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {mainNav.map((item) => {
              const active = isActive(item.to, shownPath);
              const link = (
                <Link
                  key={item.to}
                  to={item.to}
                  className={active ? 'active' : undefined}
                  aria-current={shownPath === item.to ? 'page' : undefined}
                  onClick={() => openMega(false)}
                >
                  {item.label}
                </Link>
              );
              if (!item.hasMega) return link;
              return (
                <div className="dd" id="dd" ref={ddRef} key={item.to} {...ddHandlers}>
                  {link}
                  <button
                    className="dd-t"
                    id="ddt"
                    ref={ddtRef}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega"
                    aria-label="Show all services"
                    onClick={toggleMega}
                  >
                    <Icon name="i-down" />
                  </button>
                  <MegaMenu open={megaOpen} currentPath={shownPath} onNavigate={() => openMega(false)} />
                </div>
              );
            })}
          </nav>
          <div className="nav-right">
            <a className="nav-phone" href={`tel:${site.phone.tel}`}>
              <Icon name="i-phone" />
              {site.phone.display}
            </a>
            <Link className="btn btn-green btn-sm" to="/contact">
              Free quote
            </Link>
            <button
              className="burger"
              id="burger"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} currentPath={shownPath} />
    </>
  );
}
