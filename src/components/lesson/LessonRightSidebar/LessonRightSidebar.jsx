import "./LessonRightSidebar.css";
import { Bot, Star, Lock, CheckCircle2 } from "lucide-react";

export default function LessonRightSidebar({ lesson, checklist, completedCount }) {
  return (
    <aside className="lrs">
      <div className="lrs-card">
        <div className="lrs-title lrs-title-cyan">
          <Bot size={16} /> SPARK AI
        </div>
        <div className="lrs-spark-row">
          <p className="lrs-spark-msg">Hi Sandeep! I&apos;m Spark. Need help with this lesson?</p>
          <div className="lrs-spark-avatar" />
        </div>
        <div className="lrs-spark-input">
          <span>Ask Spark anything...</span>
          <button aria-label="Send">
            <Bot size={14} />
          </button>
        </div>
      </div>

      <div className="lrs-card">
        <div className="lrs-title">LESSON CHECKLIST</div>
        <div className="lrs-checklist">
          {checklist.map((item, i) => {
            const done = i < completedCount;
            const current = i === completedCount;
            return (
              <div key={item} className="lrs-check-item">
                {done ? (
                  <CheckCircle2 size={16} className="lrs-check-done" />
                ) : (
                  <span className={`lrs-check-circle ${current ? "is-current" : ""}`} />
                )}
                <span className={done || current ? "" : "lrs-check-locked"}>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lrs-card">
        <div className="lrs-title lrs-title-yellow">
          <Star size={16} /> XP REWARD
        </div>
        <p className="lrs-xp-text">Complete this lesson to earn</p>
        <strong className="lrs-xp-value">{lesson.xp} XP</strong>
      </div>

      <div className="lrs-card">
        <div className="lrs-title">NEXT LESSON PREVIEW</div>
        <div className="lrs-next-lesson">
          <span className="lrs-next-id">{lesson.nextLesson.id}</span>
          <strong>{lesson.nextLesson.title}</strong>
          <p>Unlocks after completing this lesson.</p>
          <span className="lrs-next-status">
            <Lock size={12} /> Locked
          </span>
        </div>
      </div>
    </aside>
  );
}
