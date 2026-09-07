import '../styles/Badge.css';

function Badge({ color, children }) {
  return (
    <span className={`fh-badge fh-badge--${color}`}>
      {children}
    </span>
  );
}

export default Badge;
