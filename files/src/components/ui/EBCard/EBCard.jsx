import "./EBCard.css";

export function EBCard({ children, className = "", ...props }) {
  return (
    <section className={`eb-card ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
