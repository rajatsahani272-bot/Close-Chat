
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./Modal.css";

export default function Modal({
  open,
  onClose,
  title,
  children,
  className = ""
}) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="ui-modal__backdrop" onMouseDown={onClose}>
      <section
        className={`ui-modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || "Dialog"}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="ui-modal__header">
          <h2>{title}</h2>
          <button
            type="button"
            className="ui-modal__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={19} />
          </button>
        </header>

        <div className="ui-modal__body">{children}</div>
      </section>
    </div>,
    document.body
  );
}
