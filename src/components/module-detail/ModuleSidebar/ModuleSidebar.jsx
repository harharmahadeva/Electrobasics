import "./ModuleSidebar.css";
import { useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  BookOpen,
  Compass,
  Bot,
  Trophy,
  BarChart3,
  Wrench,
  Users,
  Settings,
} from "lucide-react";

const ITEMS = [
  { label: "Dashboard", icon: Home, to: "/dashboard" },
  { label: "All Modules", icon: LayoutGrid, to: "/modules" },
  { label: "Learn", icon: BookOpen, to: "/lesson" },
  { label: "Explore", icon: Compass, to: "/lesson" },
  { label: "Spark AI", icon: Bot, to: "/spark" },
  { label: "Achievements", icon: Trophy, to: "/dashboard" },
  { label: "Leaderboards", icon: BarChart3, to: "/dashboard" },
  { label: "Lab Tools", icon: Wrench, to: "/lesson" },
  { label: "Community", icon: Users, to: "/dashboard" },
  { label: "Settings", icon: Settings, to: "/dashboard" },
];

export default function ModuleSidebar({ active = "All Modules" }) {
  const navigate = useNavigate();

  return (
    <aside className="module-sidebar">
      <nav className="ms-nav">
        {ITEMS.map((item) => (
          <button
            key={item.label}
            className={item.label === active ? "active" : ""}
            onClick={() => navigate(item.to)}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="ms-help-card">
        <div className="ms-help-avatar" />
        <div>
          <strong>Need Help?</strong>
          <span>Ask Spark AI anytime!</span>
        </div>
      </div>
    </aside>
  );
}
