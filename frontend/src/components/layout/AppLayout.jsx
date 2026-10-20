
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MobileHeader from "./MobileHeader.jsx";
import MobileNavigation from "./MobileNavigation.jsx";
import "./AppLayout.css";

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="app-layout__main">
        <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />

        <main className="app-layout__content">
          <Outlet />
        </main>

        <MobileNavigation />
      </div>
    </div>
  );
}
