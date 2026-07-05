import "./WeeklyGoal.css";
import { useTranslation } from "react-i18next";
import { Target } from "lucide-react";

const DONE = 4;
const TOTAL = 7;
const DEG = 206;

export default function WeeklyGoal() {
  const { t } = useTranslation();

  return (
    <div className="weekly-goal">
      <div className="wg-label">
        <Target size={16} /> {t("weeklyGoal")}
      </div>

      <div className="wg-ring-wrap">
        <div
          className="wg-ring"
          style={{ background: `conic-gradient(var(--eb-purple) ${DEG}deg, rgba(255,255,255,.06) 0)` }}
        >
          <div className="wg-ring-inner">
            <strong>
              {DONE} <span>/ {TOTAL}</span>
            </strong>
            <small>{t("lessons")}</small>
          </div>
        </div>
      </div>

      <p>{t("doingGreat")}</p>
      <button>{t("viewGoals")} →</button>
    </div>
  );
}
