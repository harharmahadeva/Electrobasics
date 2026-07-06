import "./ContinueLearning.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Waves } from "lucide-react";
import { useProgress } from "../../../context/ProgressContext";

const LESSON_PREVIEW = "/assets/lessons/be001/be001-hero.png";

export default function ContinueLearning() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { progress, isLessonComplete, getResumeRoute } = useProgress();
  const [imageFailed, setImageFailed] = useState(false);
  const be001Started = Boolean(progress["BE-001"]?.completedSections?.length);
  const be001Complete = isLessonComplete("BE-001");
  const percent = be001Complete ? 100 : be001Started ? 42 : 12;
  const lessonId = be001Complete ? "BE-002" : "BE-001";
  const lessonTitle = be001Complete ? "Electronics Lab Safety" : "Welcome to ElectroBasics";
  const lessonSubtitle = be001Complete ? "Next lesson in Module 01" : "Module 01 - Orientation";

  return (
    <div className="continue-learning">
      <div className="cl-head">
        <div className="cl-label">
          <Waves size={16} /> {t("continueLearning")}
        </div>

        <div className="cl-info">
          <small>{lessonSubtitle}</small>
          <h3>
            {lessonId} {lessonTitle}
          </h3>
          <small>{be001Complete ? "Continue to unlock the next lesson" : "Pick up where you left off"}</small>
        </div>

        <div
          className="cl-ring"
          style={{ background: `conic-gradient(var(--eb-amber) ${percent * 3.6}deg, rgba(255,255,255,.07) 0)` }}
        >
          <div className="cl-ring-inner">
            <strong>
              {percent}
              <span>%</span>
            </strong>
            <small>{t("complete")}</small>
          </div>
        </div>
      </div>

      <div className={`cl-preview ${imageFailed ? "is-fallback" : ""}`}>
        {!imageFailed ? (
          <img src={LESSON_PREVIEW} alt={lessonTitle} onError={() => setImageFailed(true)} />
        ) : (
          <div className="cl-preview-fallback">
            <strong>{lessonId}</strong>
            <span>{lessonTitle}</span>
          </div>
        )}
      </div>

      <div className="cl-actions">
        <button className="cl-primary" onClick={() => navigate(getResumeRoute())}>
          {t("resumeLesson")} →
        </button>
        <button className="cl-secondary" onClick={() => navigate("/modules/module-01")}>
          {t("lessonInfo")}
        </button>
      </div>
    </div>
  );
}
