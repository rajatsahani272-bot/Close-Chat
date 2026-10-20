
import { NavLink } from "react-router-dom";
import { MessageCircle, Users, UserPlus, Search, X } from "lucide-react";
import "./Sidebar.css";

const navigation = [
  { to: "/chat", label: "Messages", icon: MessageCircle },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/requests", label: "Requests", icon: UserPlus },
  { to: "/search", label: "Find people", icon: Search }
];

export default function Sidebar({ mobileOpen = false, onClose }) {
  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        className={`sidebar__backdrop ${mobileOpen ? "is-visible" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-icon">
            <MessageCircle size={21} />
          </div>

          <span className="sidebar__brand-name">Private</span>

          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <p className="sidebar__section-label">WORKSPACE</p>

        <nav className="sidebar__nav" aria-label="Main navigation">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span className="sidebar__footer-dot" />
          <span>Private conversations</span>
        </div>
      </aside>
    </>
  );
}
