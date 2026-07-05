import "./ProgressGauge.css";
import { useTranslation } from "react-i18next";
import { Gauge } from "lucide-react";

const PERCENT = 42;

export default function ProgressGauge() {
  const { t } = useTranslation();

  return (
    <div className="progress-gauge">
      <div className="pg-label">
        <Gauge size={16} /> {t("progressGauge")}
      </div>

      <div className="pg-ring-wrap">
        <div
          className="pg-ring"
          style={{ background: `conic-gradient(var(--eb-green) ${PERCENT * 3.6}deg, rgba(255,255,255,.06) 0)` }}
        >
          <div className="pg-ring-inner">
            <strong>
              {PERCENT}
              <span>%</span>
            </strong>
            <small>{t("overallProgress")}</small>
          </div>
        </div>
      </div>

      <div className="pg-stats">
        <div>
          <strong>18</strong>
          <span>{t("lessonsCompleted")}</span>
        </div>
        <div>
          <strong>7</strong>
          <span>{t("quizzesPassed")}</span>
        </div>
        <div>
          <strong>4h 32m</strong>
          <span>{t("timeLearned")}</span>
        </div>
      </div>
    </div>
  );
}
