/** Icon from the sprite in IconSprite.jsx. <Icon name="i-arrow" /> */
export default function Icon({ name, className = 'i', ...rest }) {
  return (
    <svg className={className} aria-hidden="true" {...rest}>
      <use href={`#${name}`} />
    </svg>
  );
}
