import "./AllModulesPage.css";
import { useNavigate } from "react-router-dom";
import {
  Grid2x2,
  BookOpen,
  TrendingUp,
  Target,
  Star,
  Zap,
  Wrench,
  Cpu,
  Share2,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import ModuleCard from "../../components/courses/ModuleCard/ModuleCard";
import MobileModuleCard from "../../components/courses/MobileModuleCard/MobileModuleCard";
import { MODULES, TOTAL_LESSONS, TOTAL_MODULES, CATEGORY_GUIDE } from "../../data/modules";
import { usePageHeader } from "../../context/PageHeaderContext";
import { useProgress } from "../../context/ProgressContext";

const GUIDE_ICONS = { Zap, Wrench, Cpu, Share2, GraduationCap };

export default function AllModulesPage() {
  const navigate = useNavigate();
  const { isLessonComplete } = useProgress();
  const module01Complete = ["BE-001", "BE-002", "BE-003", "BE-004"].every((id) => isLessonComplete(id));
  const modulesWithStatus = MODULES.map((module) => ({
    ...module,
    status: module.n === "01" ? "available" : module.n === "02" && module01Complete ? "available" : "locked",
    lockReason: module.n === "02" ? "Complete Module 01 to unlock." : "Complete previous modules to unlock.",
  }));

  usePageHeader(
    "ALL MODULES OVERVIEW",
    `${TOTAL_LESSONS} LESSONS • ${TOTAL_MODULES} MODULES • STEP-BY-STEP FROM ZERO TO HERO`
  );

  return (
    <div className="all-modules">
      <h1 className="am-mobile-title eb-mob">All Modules</h1>

      <div className="am-overview-card eb-desk">
        <div className="am-overview-left">
          <div className="am-overview-icon">
            <Grid2x2 size={26} />
          </div>
          <div>
            <h2>ALL {TOTAL_MODULES} MODULES</h2>
            <p>Complete curriculum to take you from beginner to electronics expert</p>
          </div>
        </div>

        <div className="am-stats">
          <div className="am-stat accent-blue">
            <BookOpen size={20} />
            <div>
              <strong>{TOTAL_LESSONS}</strong>
              <span>Total Lessons</span>
            </div>
          </div>
          <div className="am-stat accent-green">
            <TrendingUp size={20} />
            <div>
              <strong>{TOTAL_MODULES}</strong>
              <span>Modules</span>
            </div>
          </div>
          <div className="am-stat accent-purple">
            <Target size={20} />
            <div>
              <strong>{CATEGORY_GUIDE.length}</strong>
              <span>Categories</span>
            </div>
          </div>
          <div className="am-stat accent-amber">
            <Star size={20} />
            <div>
              <strong>Beginner to Expert</strong>
              <span>Learning Path</span>
            </div>
          </div>
        </div>
      </div>

      <div className="am-mobile-stats eb-mob">
        <div className="am-stat accent-blue">
          <BookOpen size={20} />
          <div>
            <strong>{TOTAL_LESSONS}</strong>
            <span>Lessons</span>
          </div>
        </div>
        <div className="am-stat accent-green">
          <TrendingUp size={20} />
          <div>
            <strong>{TOTAL_MODULES}</strong>
            <span>Modules</span>
          </div>
        </div>
        <div className="am-stat accent-purple">
          <Target size={20} />
          <div>
            <strong>{CATEGORY_GUIDE.length}</strong>
            <span>Categories</span>
          </div>
        </div>
      </div>

      <button className="am-learning-path-card eb-mob" onClick={() => navigate("/modules/module-01")}>
        <Star size={20} />
        <div>
          <strong>Learning Path</strong>
          <span>Beginner to Expert</span>
        </div>
        <ChevronRight size={18} />
      </button>

      <div className="am-grid eb-desk">
        {modulesWithStatus.map((m) => (
          <ModuleCard key={m.n} module={m} onClick={() => navigate(m.route)} />
        ))}
      </div>

      <div className="am-mobile-list eb-mob">
        {modulesWithStatus.map((m) => (
          <MobileModuleCard key={m.n} module={m} />
        ))}
      </div>

      <div className="am-category-guide">
        <div className="am-guide-header">
          <Target size={18} />
          <div>
            <strong>CATEGORY GUIDE</strong>
            <p>Our curriculum is organized into {CATEGORY_GUIDE.length} main categories to ensure a well-rounded learning experience.</p>
          </div>
        </div>

        <div className="am-guide-list">
          {CATEGORY_GUIDE.map((c) => {
            const Icon = GUIDE_ICONS[c.icon];
            return (
              <div className={`am-guide-item accent-${c.accent}`} key={c.name}>
                <Icon size={20} />
                <div>
                  <strong>{c.name}</strong>
                  <small>{c.description}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="am-tip-bar">
        <Lightbulb size={18} />
        <p>
          <strong>LEARNING PATH TIP:</strong> Follow the modules in order from 01 to {String(TOTAL_MODULES).padStart(2, "0")} for the
          best learning experience. Each module builds on the previous one!
        </p>
        <button onClick={() => navigate("/modules/module-01")}>
          Start Learning Now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
