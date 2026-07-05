import "./Achievements.css";
import { useTranslation } from "react-i18next";
import { Award, Sigma, CalendarCheck, Hexagon } from "lucide-react";

const ICONS = { ohm: Sigma, calendar: CalendarCheck, hex: Hexagon };

export default function Achievements() {
  const { t } = useTranslation();
  const achievements = t("achievements", { returnObjects: true });

  return (
    <div className="achievements">
      <div className="ach-header">
        <div className="ach-label">
          <Award size={16} /> {t("achievementsLabel")}
        </div>
        <a href="#">{t("viewAll")}</a>
      </div>

      <div className="ach-list">
        {achievements.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <div className="ach-item" key={a.key}>
              <span className="ach-icon">
                <Icon size={18} />
              </span>
              <div>
                <strong>{a.title}</strong>
                <small>{a.sub}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
