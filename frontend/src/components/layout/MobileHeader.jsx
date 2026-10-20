
import { Menu, MessageCircle } from "lucide-react";
import "./MobileHeader.css";

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="mobile-header">
      <button
        type="button"
        className="mobile-header__menu"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>

      <div className="mobile-header__brand">
        <MessageCircle size={20} />
        <span>Private</span>
      </div>

      <span className="mobile-header__spacer" />
    </header>
  );
}
