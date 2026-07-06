import "./LessonSidebar.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProgress } from "../../../context/ProgressContext";

const LABELS = {
  back: { en: "Back to Module", hi: "मॉड्यूल पर वापस" },
  module: { en: "Module", hi: "मॉड्यूल" },
  lessons: { en: "Lessons", hi: "पाठ" },
  help: { en: "Need Help?", hi: "मदद चाहिए?" },
  ask: { en: "Ask Spark AI anytime!", hi: "कभी भी स्पार्क AI से पूछें!" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

export default function LessonSidebar({ module, currentLessonId, onHelp }) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { isLessonComplete } = useProgress();
  const isHindi = i18n.language?.startsWith("hi");
  const pickLang = (value, fallback = "") => {
    if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
    return value || fallback;
  };
  const label = (key) => pickLang(LABELS[key], key);

  return (
    <aside className="lesson-sidebar">
      <button className="ls-back" onClick={() => navigate("/modules/module-01")}>
        <ArrowLeft size={15} /> {label("back")}
      </button>

      <div className="ls-module-summary">
        <strong>{label("module")} {module.number}</strong>
        <span>{isHindi ? module.hindiTitle || module.title : module.title}</span>
        <small>{module.lessonCount} {label("lessons")}</small>
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
                {l.id} {isHindi ? l.hindiTitle || l.title : l.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="ls-help-card" onClick={onHelp}>
        <strong>{label("help")}</strong>
        <span>{label("ask")}</span>
      </div>
    </aside>
  );
}
