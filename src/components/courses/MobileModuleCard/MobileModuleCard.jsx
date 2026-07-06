import "./MobileModuleCard.css";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Wrench,
  Lightbulb,
  Cpu,
  CircuitBoard,
  Gauge,
  Rocket,
  GraduationCap,
  Atom,
  AudioWaveform,
  ChevronRight,
  Clock,
  Star,
  Lock,
  CheckCircle2,
} from "lucide-react";

const ICONS = {
  Home,
  Wrench,
  Lightbulb,
  Cpu,
  CircuitBoard,
  Gauge,
  Rocket,
  GraduationCap,
  Atom,
  AudioWaveform,
};

const DIFFICULTY_COLORS = { 1: "green", 2: "blue", 3: "amber", 4: "red" };

export default function MobileModuleCard({ module }) {
  const navigate = useNavigate();
  const Icon = ICONS[module.icon];
  const difficultyColor = DIFFICULTY_COLORS[module.difficultyLevel];
  const locked = module.status === "locked";
  const lessonCount = module.lessonCount || module.lessons;

  return (
    <div
      className={`mob-module-card accent-${module.accent} ${locked ? "is-locked" : "is-available"}`}
      onClick={() => navigate(module.route || `/modules/module-${module.n}`)}
    >
      <div className="mob-module-top">
        <span className="mob-module-number">{module.n}</span>
        <div className="mob-module-icon">
          <Icon size={20} />
        </div>
        <div className="mob-module-title">
          <h3>{module.title}</h3>
          <small>{lessonCount} Lessons</small>
        </div>
        <ChevronRight size={18} className="mob-module-chevron" />
      </div>

      <div className="mob-module-bottom">
        <span className={`mob-module-status module-status-${module.status}`}>
          {locked ? <Lock size={12} /> : <CheckCircle2 size={12} />}
          {locked ? "Locked" : "Available"}
        </span>
        <span className={`module-difficulty-pill difficulty-${difficultyColor}`}>
          {module.difficulty}
        </span>
        <span className="mob-module-stat"><Star size={12} /> {module.totalXP} XP</span>
        <span className="mob-module-stat"><Clock size={12} /> {module.estimatedMinutes} min</span>
        <div className="module-difficulty-dots">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={i <= module.difficultyLevel ? `dot-filled dot-${difficultyColor}` : "dot-empty"}
            />
          ))}
        </div>
        <span className="mob-module-category">Category: {module.category}</span>
      </div>
      {locked && module.lockReason && <p className="mob-module-lock-reason">{module.lockReason}</p>}
    </div>
  );
}
