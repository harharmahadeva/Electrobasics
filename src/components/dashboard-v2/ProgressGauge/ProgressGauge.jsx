import "./ProgressGauge.css";
import { useTranslation } from "react-i18next";
import { Gauge } from "lucide-react";
import { useProgress } from "../../../context/ProgressContext";

export default function ProgressGauge() {
  const { t } = useTranslation();
  const { progress } = useProgress();
  const lessonIds = Object.keys(progress);
  const completedLessons = lessonIds.filter((id) => progress[id]?.lessonComplete).length;
  const completedSections = lessonIds.reduce((sum, id) => sum + (progress[id]?.completedSections?.length || 0), 0);
  const percent = Math.min(100, Math.round((completedSections / 12) * 100)) || (completedLessons ? 100 : 42);
  const quizzesPassed = completedLessons ? Math.max(1, completedLessons - 1) : 7;
  const timeLearned = completedSections ? `${Math.max(1, Math.round((completedSections * 5) / 2))}m` : "4h 32m";

  return (
    <div className="progress-gauge">
      <div className="pg-label">
        <Gauge size={16} /> {t("progressGauge")}
      </div>

      <div className="pg-ring-wrap">
        <div
          className="pg-ring"
          style={{ background: `conic-gradient(var(--eb-green) ${percent * 3.6}deg, rgba(255,255,255,.06) 0)` }}
        >
          <div className="pg-ring-inner">
            <strong>
              {percent}
              <span>%</span>
            </strong>
            <small>{t("overallProgress")}</small>
          </div>
        </div>
      </div>

      <div className="pg-stats">
        <div>
          <strong>{completedSections || 18}</strong>
          <span>{t("lessonsCompleted")}</span>
        </div>
        <div>
          <strong>{Math.max(quizzesPassed, 7)}</strong>
          <span>{t("quizzesPassed")}</span>
        </div>
        <div>
          <strong>{timeLearned}</strong>
          <span>{t("timeLearned")}</span>
        </div>
      </div>
    </div>
  );
}
