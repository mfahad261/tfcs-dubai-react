import { Link } from 'react-router-dom';
import { site } from '../data/site';

/** TFCS logo (colours follow the --lb / --lg CSS variables). */
export function LogoMark(props) {
  return (
    <svg role="img" aria-hidden="true" {...props}>
      <use href="#logo" />
    </svg>
  );
}

export default function Logo({ label = `${site.name}, home` }) {
  return (
    <Link className="logo" to="/" aria-label={label}>
      <LogoMark />
      <span className="sr">{site.name}</span>
    </Link>
  );
}
