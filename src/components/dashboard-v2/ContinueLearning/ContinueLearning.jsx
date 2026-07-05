import "./ContinueLearning.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Waves, Info } from "lucide-react";

const PERCENT = 42;

export default function ContinueLearning() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="continue-learning">
      <div className="cl-label">
        <Waves size={16} /> {t("continueLearning")}
      </div>

      <div className="cl-body">
        <div className="cl-info">
          <small>{t("lesson03")}</small>
          <h3>{t("ohmsLaw")}</h3>
          <small>{t("basicElec")}</small>
        </div>

        <div className="cl-ring" style={{ background: `conic-gradient(var(--eb-amber) ${PERCENT * 3.6}deg, rgba(255,255,255,.07) 0)` }}>
          <div className="cl-ring-inner">
            <strong>
              {PERCENT}
              <span>%</span>
            </strong>
            <small>{t("complete")}</small>
          </div>
        </div>
      </div>

      <div className="cl-placeholder" />

      <div className="cl-actions">
        <button className="cl-primary" onClick={() => navigate("/lesson")}>
          {t("resumeLesson")} →
        </button>
        <button className="cl-secondary" onClick={() => navigate("/continue-lesson")}>
          {t("lessonInfo")}
        </button>
      </div>
    </div>
  );
}
