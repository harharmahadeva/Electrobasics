import "./CourseLibrary.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";

const ACCENTS = { basic: "amber", analog: "green", digital: "cyan", sensors: "purple" };

export default function CourseLibrary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const courses = t("courses", { returnObjects: true });

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
              onClick={() => navigate("/lesson")}
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
