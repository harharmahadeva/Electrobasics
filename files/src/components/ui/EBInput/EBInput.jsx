import "./EBInput.css";

export function EBInput({ label, id, className = "", ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className={`eb-input ${className}`.trim()} htmlFor={inputId}>
      {label && <span>{label}</span>}
      <input id={inputId} {...props} />
    </label>
  );
}
