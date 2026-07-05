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

  return (
    <div
      className={`mob-module-card accent-${module.accent}`}
      onClick={() => navigate(`/modules/module-${module.n}`)}
    >
      <div className="mob-module-top">
        <span className="mob-module-number">{module.n}</span>
        <div className="mob-module-icon">
          <Icon size={20} />
        </div>
        <div className="mob-module-title">
          <h3>{module.title}</h3>
          <small>{module.lessons} Lessons</small>
        </div>
        <ChevronRight size={18} className="mob-module-chevron" />
      </div>

      <div className="mob-module-bottom">
        <span className={`module-difficulty-pill difficulty-${difficultyColor}`}>
          {module.difficulty}
        </span>
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
    </div>
  );
}
