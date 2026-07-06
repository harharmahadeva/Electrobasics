import "./ModuleCard.css";
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

const DIFFICULTY_COLORS = {
  1: "green",
  2: "blue",
  3: "amber",
  4: "red",
};

export default function ModuleCard({ module, onClick }) {
  const Icon = ICONS[module.icon];
  const CategoryTypeIcon = ICONS[module.categoryTypeIcon];
  const difficultyColor = DIFFICULTY_COLORS[module.difficultyLevel];
  const locked = module.status === "locked";
  const lessonCount = module.lessonCount || module.lessons;

  return (
    <div className={`module-card accent-${module.accent} ${locked ? "is-locked" : "is-available"}`} onClick={onClick}>
      <div className="module-card-top">
        <span className="module-number">{module.n}</span>
        <div className="module-icon">
          <Icon size={26} />
        </div>
        <div>
          <h3>{module.title}</h3>
          <small>{lessonCount} Lessons</small>
        </div>
      </div>

      <div className={`module-status module-status-${module.status}`}>
        {locked ? <Lock size={13} /> : <CheckCircle2 size={13} />}
        {locked ? "Locked" : "Available"}
      </div>

      <div className="module-field">
        <span className="module-field-label">CATEGORY</span>
        <span className="module-category-pill">{module.category}</span>
      </div>

      <div className="module-stats-row">
        <span><Star size={13} /> {module.totalXP} XP</span>
        <span><Clock size={13} /> {module.estimatedMinutes} min</span>
      </div>

      <p className="module-description">{module.description}</p>
      {locked && module.lockReason && <p className="module-lock-reason">{module.lockReason}</p>}

      <div className="module-field">
        <span className="module-field-label">DIFFICULTY</span>
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
      </div>

      <div className="module-field module-category-type">
        <span className="module-field-label">CATEGORY TYPE</span>
        <span className="module-category-type-value">
          <CategoryTypeIcon size={14} />
          {module.categoryType}
        </span>
      </div>
    </div>
  );
}
