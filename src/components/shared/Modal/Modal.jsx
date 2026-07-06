import "./Modal.css";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, closeLabel = "Close", className = "" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="eb-modal-backdrop" onClick={onClose}>
      <div className={`eb-modal-card ${className}`.trim()} onClick={(e) => e.stopPropagation()}>
        <div className="eb-modal-header">
          {title && <h2>{title}</h2>}
          <button className="eb-modal-close" onClick={onClose} aria-label={closeLabel}>
            <X size={18} />
          </button>
        </div>
        <div className="eb-modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
