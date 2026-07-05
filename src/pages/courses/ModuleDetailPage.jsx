import "./ModuleDetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Lock,
  Trophy,
  Home,
  Wrench,
  Lightbulb,
  Cpu,
  CircuitBoard,
  Gauge,
  Rocket,
  GraduationCap,
} from "lucide-react";
import { MODULES } from "../../data/modules";

const ICONS = { Home, Wrench, Lightbulb, Cpu, CircuitBoard, Gauge, Rocket, GraduationCap };
const DIFFICULTY_COLORS = { 1: "green", 2: "blue", 3: "amber", 4: "red" };

export default function ModuleDetailPage() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const module = MODULES.find((m) => m.n === moduleId);

  if (!module) {
    return (
      <div className="module-detail">
        <p>Module not found.</p>
      </div>
    );
  }

  const Icon = ICONS[module.icon];
  const difficultyColor = DIFFICULTY_COLORS[module.difficultyLevel];
  const xpReward = module.lessonList.length * 100;

  return (
    <div className="module-detail">
      <button className="md-back" onClick={() => navigate("/modules")}>
        <ArrowLeft size={18} /> Module Details
      </button>

      <div className={`md-hero accent-${module.accent}`}>
        <div className="md-hero-top">
          <div className="md-hero-icon">
            <Icon size={24} />
          </div>
          <span className="md-hero-number">{module.n}</span>
        </div>

        <h1>{module.title}</h1>
        <small>{module.lessons} Lessons</small>

        <div className="md-hero-meta">
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

        <p className="md-category">
          Category: <strong>{module.category}</strong>
        </p>

        <p className="md-description">{module.description}</p>
      </div>

      <h2 className="md-lessons-title">Lessons in this Module</h2>

      <div className="md-lessons-list">
        {module.lessonList.map((lesson, i) => (
          <div className={`md-lesson-row status-${lesson.status}`} key={lesson.title}>
            <span className="md-lesson-number">{String(i + 1).padStart(2, "0")}</span>
            <span className="md-lesson-title">{lesson.title}</span>
            <span className="md-lesson-difficulty">{lesson.difficulty}</span>
            {lesson.status === "done" && <CheckCircle2 size={18} className="md-lesson-icon icon-done" />}
            {lesson.status === "current" && <ChevronRight size={18} className="md-lesson-icon icon-current" />}
            {lesson.status === "locked" && <Lock size={16} className="md-lesson-icon icon-locked" />}
          </div>
        ))}
      </div>

      <div className="md-footer">
        <div className="md-footer-text">
          <Trophy size={20} />
          <span>Complete all {module.lessonList.length} lessons to master this module!</span>
        </div>
        <div className="md-xp">
          <small>XP Reward</small>
          <strong>+{xpReward}</strong>
        </div>
      </div>
    </div>
  );
}
