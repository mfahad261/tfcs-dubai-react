/** Main navigation. `title` is used for the browser tab and the page-change curtain. */
export const mainNav = [
  { to: '/', label: 'Home', title: 'TFCS' },
  { to: '/services', label: 'Services', title: 'Services', hasMega: true },
  { to: '/amc', label: 'AMC contracts', title: 'AMC contracts' },
  { to: '/areas', label: 'Areas', title: 'Areas' },
  { to: '/about', label: 'About', title: 'About' },
  { to: '/contact', label: 'Contact', title: 'Free quote' },
];

export const pageTitles = Object.fromEntries(mainNav.map((n) => [n.to, n.title]));
