import "./ActivityTimeline.css";
import { useTranslation } from "react-i18next";
import { Signal, CheckCircle2, ClipboardCheck, PlayCircle } from "lucide-react";

const ICONS = { check: CheckCircle2, quiz: ClipboardCheck, play: PlayCircle };

export default function ActivityTimeline() {
  const { t } = useTranslation();
  const activities = t("activities", { returnObjects: true });

  return (
    <div className="activity-timeline">
      <div className="at-label">
        <Signal size={16} /> {t("activityTimeline")}
      </div>

      <div className="at-list">
        {activities.map((a) => {
          const Icon = ICONS[a.icon];
          return (
            <div className="at-item" key={a.key}>
              <span className={`at-icon at-icon--${a.icon}`}>
                <Icon size={15} />
              </span>
              <div className="at-text">
                <strong>{a.title}</strong>
                <small>{a.sub}</small>
              </div>
              <span className="at-time">{a.time}</span>
            </div>
          );
        })}
      </div>

      <a href="#" className="at-view-all">
        {t("viewFullActivity")} →
      </a>
    </div>
  );
}
