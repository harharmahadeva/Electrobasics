import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bell, Sun, Zap } from "lucide-react";
import LanguageToggle from "../../language/LanguageToggle";
import { usePageHeaderValue } from "../../../context/PageHeaderContext";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const pageHeader = usePageHeaderValue();
  const header = pageHeader?.header;
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
    <>
      <header className="eb-header eb-desk">
        <div className="eb-header-inner">
          <div className="eb-logo" onClick={() => navigate("/dashboard")}>
            <div className="eb-logo-icon">
              <Zap size={20} fill="currentColor" />
            </div>
            <span>ElectroBasics</span>
          </div>

          {header ? (
            <div className="eb-page-title">
              <h1>{header.title}</h1>
              {header.subtitle && <p>{header.subtitle}</p>}
            </div>
          ) : (
            <div className="eb-header-spacer" aria-hidden="true" />
          )}

          <LanguageToggle size="md" />

          <div className="eb-right">
            <button className="eb-icon-btn">
              <Bell size={18} />
              <span className="eb-badge">3</span>
            </button>

            <button className="eb-icon-btn">
              <Sun size={18} />
            </button>

            <div className="profile-menu-wrap" ref={menuRef}>
              <button className="profile" onClick={() => setMenuOpen((prev) => !prev)} type="button">
                <div className="avatar">SN</div>
                <div>
                  <strong>{user?.name || "Sandeep"}</strong>
                  <small>{t("level")}</small>
                </div>
              </button>

              {menuOpen && (
                <div className="profile-menu">
                  <button type="button" onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}>
                    {t("dashboard", "Dashboard")}
                  </button>
                  <button type="button" onClick={handleSignOut}>{t("signOut", "Sign Out")}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <header className="eb-header-mobile eb-mob">
        <div className="eb-logo" onClick={() => navigate("/dashboard")}>
          <div className="eb-logo-icon eb-logo-icon--sm">
            <Zap size={16} fill="currentColor" />
          </div>
          <span>ElectroBasics</span>
        </div>

        <div className="eb-right">
          <LanguageToggle size="sm" />

          <button className="eb-icon-btn eb-icon-btn--sm">
            <Bell size={16} />
            <span className="eb-badge">3</span>
          </button>

          <div className="profile-menu-wrap profile-menu-wrap--mobile" ref={menuRef}>
            <button className="avatar avatar--sm" onClick={() => setMenuOpen((prev) => !prev)} type="button">
              SN
            </button>
            {menuOpen && (
              <div className="profile-menu profile-menu--mobile">
                <button type="button" onClick={() => { setMenuOpen(false); navigate("/dashboard"); }}>
                  {t("dashboard", "Dashboard")}
                </button>
                <button type="button" onClick={handleSignOut}>{t("signOut", "Sign Out")}</button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
