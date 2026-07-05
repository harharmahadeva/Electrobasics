import "./LevelCard.css";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LevelCard() {
  const { t } = useTranslation();

  return (
    <div className="level-card">
      <div className="level-icon">
        <Star size={20} fill="currentColor" />
      </div>

      <div className="level-body">
        <div className="level-title">{t("level")}</div>
        <div className="level-sub">{t("novice")}</div>
        <div className="level-bar">
          <div style={{ width: "53%" }} />
        </div>
        <div className="level-xp">320 / 600 XP</div>
      </div>
    </div>
  );
}
