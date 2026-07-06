import "./LessonRow.css";
import { Clock, Star, Lock, Play, CheckCircle2 } from "lucide-react";

export default function LessonRow({ lesson, onStart }) {
  const locked = lesson.status === "locked";
  const complete = lesson.status === "complete";

  return (
    <div
      className={`lesson-row ${locked ? "is-locked" : ""} ${complete ? "is-complete" : ""}`}
      onClick={locked ? onStart : undefined}
    >
      <span className="lr-number">
        {complete ? <CheckCircle2 size={16} /> : String(lesson.order).padStart(2, "0")}
      </span>

      <div className={`lr-thumb thumb-${lesson.id}`} />

      <div className="lr-info">
        <div className="lr-id-row">
          <span className="lr-id">{lesson.id}</span>
          <strong>{lesson.title}</strong>
        </div>
        <small className="lr-hindi">{lesson.hindiTitle}</small>
      </div>

      <div className="lr-meta">
        <span className="lr-meta-item">
          <Clock size={13} /> {lesson.durationMinutes} min
        </span>
        <span className="lr-meta-item lr-xp">
          <Star size={13} /> {lesson.xp} XP
        </span>
        <span className="lr-difficulty">{lesson.difficulty}</span>
      </div>

      <div className="lr-badge">
        <small>Badge</small>
        <span>{lesson.badge}</span>
      </div>

      <div className="lr-action">
        {locked ? (
          <div className="lr-locked-btn">
            <Lock size={14} /> Locked
            <small>{lesson.unlockRequirement ? `Complete previous lesson` : ""}</small>
          </div>
        ) : (
          <button className="lr-start-btn" onClick={onStart}>
            <Play size={14} fill="currentColor" /> {complete ? "Review Lesson" : lesson.button}
          </button>
        )}
      </div>
    </div>
  );
}
