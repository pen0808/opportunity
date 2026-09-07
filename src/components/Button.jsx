import '../styles/Button.css';

function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button className={`fh-btn fh-btn--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
