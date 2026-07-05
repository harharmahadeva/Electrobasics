import "./RightWidgets.css";
import { Sparkles, BookOpen, Star, Clock, Gauge, LayoutGrid, Gift } from "lucide-react";

export default function RightWidgets({ module }) {
  const { progress } = module;
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (progress.percent / 100) * circumference;

  return (
    <aside className="right-widgets">
      <div className="rw-card">
        <div className="rw-title rw-title-cyan">
          <Gauge size={16} /> MODULE PROGRESS
        </div>

        <div className="rw-ring-wrap">
          <svg viewBox="0 0 100 100" className="rw-ring">
            <circle className="rw-ring-bg" cx="50" cy="50" r="46" />
            <circle
              className="rw-ring-fill"
              cx="50"
              cy="50"
              r="46"
              style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
            />
          </svg>
          <div className="rw-ring-text">
            <strong>{progress.percent}%</strong>
          </div>
        </div>
        <p className="rw-ring-caption">
          {progress.completedLessons} / {progress.totalLessons} Lessons Completed
        </p>

        <div className="rw-xp-row">
          <div>
            <strong>{progress.xpEarned} XP</strong>
            <span>Earned</span>
          </div>
          <div>
            <strong>{module.totalXP} XP</strong>
            <span>Total in Module</span>
          </div>
        </div>
      </div>

      <div className="rw-card">
        <div className="rw-title rw-title-yellow">
          <Sparkles size={16} /> SPARK SAYS
        </div>
        <div className="rw-spark-row">
          <p className="rw-spark-msg">{module.sparkMessage}</p>
          <div className="rw-spark-avatar" />
        </div>
      </div>

      <div className="rw-card">
        <div className="rw-title">MODULE SUMMARY</div>
        <div className="rw-summary-list">
          <div className="rw-summary-row">
            <span><BookOpen size={14} /> Total Lessons</span>
            <strong>{module.lessonCount}</strong>
          </div>
          <div className="rw-summary-row">
            <span><Star size={14} /> Total XP</span>
            <strong>{module.totalXP} XP</strong>
          </div>
          <div className="rw-summary-row">
            <span><Clock size={14} /> Estimated Time</span>
            <strong>{module.estimatedMinutes} min</strong>
          </div>
          <div className="rw-summary-row">
            <span><Gauge size={14} /> Difficulty</span>
            <strong className="rw-green">{module.difficulty}</strong>
          </div>
          <div className="rw-summary-row">
            <span><LayoutGrid size={14} /> Category</span>
            <strong className="rw-purple">{module.category}</strong>
          </div>
        </div>
      </div>

      <div className="rw-card rw-reward">
        <div className="rw-title rw-title-orange">
          <Gift size={16} /> REWARD FOR COMPLETION
        </div>
        <div className="rw-reward-row">
          <div className="rw-reward-badge" />
          <div>
            <strong>Lab Beginner Badge</strong>
            <span>+{module.rewardXP} XP</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
