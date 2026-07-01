import "./EBButton.css";

export function EBButton({ children, variant = "primary", className = "", ...props }) {
  return (
    <button className={`eb-button eb-button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
