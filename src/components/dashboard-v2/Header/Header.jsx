import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Bell, Sun, Zap } from "lucide-react";
import LanguageToggle from "../../language/LanguageToggle";
import { usePageHeaderValue } from "../../../context/PageHeaderContext";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageHeader = usePageHeaderValue();
  const header = pageHeader?.header;

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
            <div className="eb-search">
              <Search size={16} />
              <span className="eb-search-placeholder">{t("search")}</span>
              <kbd>⌘K</kbd>
            </div>
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

            <div className="profile" onClick={() => navigate("/")}>
              <div className="avatar">SN</div>
              <div>
                <strong>Sandeep</strong>
                <small>{t("level")}</small>
              </div>
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

          <div className="avatar avatar--sm" onClick={() => navigate("/")}>
            SN
          </div>
        </div>
      </header>
    </>
  );
}
