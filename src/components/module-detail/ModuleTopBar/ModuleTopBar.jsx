import "./ModuleTopBar.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Bell, ChevronDown } from "lucide-react";
import LanguageToggle from "../../language/LanguageToggle";
import { useAuth } from "../../../context/AuthContext";

export default function ModuleTopBar() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onClickOutside(event) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target)) return;
      setMenuOpen(false);
    }

    function onEscape(event) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function handleSignOut() {
    signOut();
    setMenuOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="module-topbar">
      <div className="mtb-inner">
        <div className="mtb-logo" onClick={() => navigate("/dashboard")}>
          <div className="mtb-logo-icon">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <span>ElectroBasics</span>
          </div>
        </div>

        <div className="mtb-right">
          <LanguageToggle size="md" />

          <button className="mtb-bell">
            <Bell size={18} />
            <span className="mtb-badge">3</span>
          </button>

          <div className="mtb-profile-wrap" ref={menuRef}>
            <button type="button" className="mtb-profile" onClick={() => setMenuOpen((prev) => !prev)}>
              <div className="mtb-avatar">{user?.name ? user.name.slice(0, 2).toUpperCase() : "SN"}</div>
              <div>
                <strong>{user?.name || "Sandeep"}</strong>
              </div>
              <ChevronDown size={16} />
            </button>

            {menuOpen && (
              <div className="mtb-profile-menu">
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}>
                  Dashboard
                </button>
                <button type="button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
