
import { NavLink } from "react-router-dom";
import { MessageCircle, Users, UserPlus } from "lucide-react";
import "./MobileNavigation.css";

const items = [
  { to: "/chat", label: "Messages", icon: MessageCircle },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/requests", label: "Requests", icon: UserPlus }
];

export default function MobileNavigation() {
  return (
    <nav className="mobile-navigation" aria-label="Mobile navigation">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mobile-navigation__item ${isActive ? "is-active" : ""}`
          }
        >
          <Icon size={20} strokeWidth={1.8} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
