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

  return (
    <div className={`module-card accent-${module.accent}`} onClick={onClick}>
      <div className="module-card-top">
        <span className="module-number">{module.n}</span>
        <div className="module-icon">
          <Icon size={26} />
        </div>
        <div>
          <h3>{module.title}</h3>
          <small>{module.lessons} Lessons</small>
        </div>
      </div>

      <div className="module-field">
        <span className="module-field-label">CATEGORY</span>
        <span className="module-category-pill">{module.category}</span>
      </div>

      <p className="module-description">{module.description}</p>

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
