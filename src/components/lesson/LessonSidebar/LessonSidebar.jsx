import "./LessonSidebar.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { useProgress } from "../../../context/ProgressContext";

export default function LessonSidebar({ module, currentLessonId, onHelp }) {
  const navigate = useNavigate();
  const { isLessonComplete } = useProgress();

  return (
    <aside className="lesson-sidebar">
      <button className="ls-back" onClick={() => navigate("/modules/module-01")}>
        <ArrowLeft size={15} /> Back to Module
      </button>

      <div className="ls-module-summary">
        <strong>Module {module.number}</strong>
        <span>{module.title}</span>
        <small>{module.lessonCount} Lessons</small>
      </div>

      <div className="ls-lesson-list">
        {module.lessons.map((l, i) => {
          const isCurrent = l.id === currentLessonId;
          const isComplete = isLessonComplete(l.id);
          const isLocked = !isComplete && i > 0 && !isLessonComplete(module.lessons[i - 1].id);
          return (
            <div
              key={l.id}
              className={`ls-lesson-item ${isCurrent ? "is-current" : ""} ${isLocked ? "is-locked" : ""} ${isComplete ? "is-complete" : ""}`}
            >
              {isLocked ? <Lock size={13} /> : isComplete ? <CheckCircle2 size={13} /> : null}
              <span>
                {l.id} {l.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="ls-help-card" onClick={onHelp}>
        <strong>Need Help?</strong>
        <span>Ask Spark AI anytime!</span>
      </div>
    </aside>
  );
}
