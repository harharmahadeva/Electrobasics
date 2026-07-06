import "./ModuleTopBar.css";
import { useNavigate } from "react-router-dom";
import { Zap, Search, Flame, Trophy, Bell, ChevronDown } from "lucide-react";

export default function ModuleTopBar() {
  const navigate = useNavigate();

  return (
    <header className="module-topbar">
      <div className="mtb-inner">
        <div className="mtb-logo" onClick={() => navigate("/dashboard")}>
          <div className="mtb-logo-icon">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <span>ElectroBasics</span>
            <small>Learn &bull; Build &bull; Innovate</small>
          </div>
        </div>

        <div className="mtb-search">
          <Search size={16} />
          <span>Search lessons, topics, tools...</span>
          <kbd>Ctrl K</kbd>
        </div>

        <div className="mtb-right">
          <div className="mtb-widget">
            <Flame size={18} className="mtb-icon-orange" />
            <div>
              <strong>12</strong>
              <span>Day Streak</span>
            </div>
          </div>

          <div className="mtb-widget">
            <Trophy size={18} className="mtb-icon-yellow" />
            <div>
              <strong>450</strong>
              <span>Total XP</span>
            </div>
          </div>

          <button className="mtb-bell">
            <Bell size={18} />
            <span className="mtb-badge">3</span>
          </button>

          <div className="mtb-profile" onClick={() => navigate("/")}>
            <div className="mtb-avatar">SN</div>
            <div>
              <strong>Sandeep</strong>
              <small>Level 3</small>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
