import "./StreakCard.css";
import { Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StreakCard() {
  const { t } = useTranslation();

  return (
    <div className="streak-card">
      <Flame size={27} className="streak-icon" />
      <div>
        <div className="streak-value">12</div>
        <div className="streak-label">{t("dayStreak")}</div>
      </div>
    </div>
  );
}
