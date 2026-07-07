import "./ModuleSidebar.css";
import { useNavigate } from "react-router-dom";
import SparkWidget from "../../spark/SparkWidget";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../../data/sparkKnowledge";
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

export default function ModuleSidebar({ active = "All Modules", onHelp }) {
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

      <SparkWidget
        context={{
          source: "module",
          moduleId: "module-01",
          moduleTitle: "Welcome & Electronics Lab",
          lessonId: "BE-001",
          lessonTitle: "Welcome to ElectroBasics",
          sectionTitle: "Need help",
          textSummary: "Ask Spark for help with the module, tools, safety, or next steps.",
          imageCaption: "Module sidebar help",
          teacherScript: "Module 01 is a beginner orientation module focused on safety, tools and the next small step.",
          knowledge: mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001),
        }}
        onOpen={onHelp}
      />
    </aside>
  );
}
