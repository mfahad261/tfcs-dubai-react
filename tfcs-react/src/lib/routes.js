/** Is this nav item the current page? Service pages count as "Services". */
export function isActive(to, pathname) {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(`${to}/`);
}
