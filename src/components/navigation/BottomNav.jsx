import "./BottomNav.css";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, BookOpen, Bot, PenSquare, StickyNote } from "lucide-react";

const ITEMS = [
  { to: "/dashboard", icon: Home, key: "navHome" },
  { to: "/modules", icon: BookOpen, key: "navLessons" },
  { to: "/spark", icon: Bot, key: "navSpark" },
  { to: "/quiz", icon: PenSquare, key: "navQuiz" },
  { to: "/notes", icon: StickyNote, key: "navNotes" },
];

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="bottom-nav eb-mob">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <item.icon size={20} />
          <span>{t(item.key)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
