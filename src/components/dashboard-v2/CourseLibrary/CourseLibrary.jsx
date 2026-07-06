import "./CourseLibrary.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";
import { useProgress } from "../../../context/ProgressContext";

const ACCENTS = { basic: "amber", analog: "green", digital: "cyan", sensors: "purple" };

export default function CourseLibrary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { progress, isLessonComplete } = useProgress();
  const courses = t("courses", { returnObjects: true });
  const be001Started = Boolean(progress["BE-001"]?.completedSections?.length);

  function getCourseRoute(course) {
    if (course.key !== "basic") return "/modules";
    if (isLessonComplete("BE-001")) return "/learn/BE-002";
    if (be001Started) return "/learn/BE-001";
    return "/modules/module-01";
  }

  return (
    <div className="course-library">
      <div className="crl-header">
        <div className="crl-label">
          <Package size={16} /> {t("courseLibrary")}
        </div>
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("/modules"); }}>
          {t("viewAll")}
        </a>
      </div>

      <div className="crl-grid">
        {courses.map((c) => {
          const accent = ACCENTS[c.key];
          return (
            <div
              key={c.key}
              className={`crl-card accent-${accent}`}
              onClick={() => navigate(getCourseRoute(c))}
            >
              <div className="crl-thumb" />
              <h4>{c.name}</h4>
              <small>{c.lessons}</small>
              <div className="crl-progress">
                <div style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
