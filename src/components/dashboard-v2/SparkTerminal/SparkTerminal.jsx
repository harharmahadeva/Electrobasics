import "./SparkTerminal.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bot, Send } from "lucide-react";

export default function SparkTerminal() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="spark-terminal" onClick={() => navigate("/spark")}>
      <div className="st-label">
        <Bot size={16} /> {t("sparkTitle")}
      </div>

      <div className="st-chat">
        <div className="st-bubble">{t("sparkMsg")}</div>
        <div className="st-avatar" />
      </div>

      <div className="st-input" onClick={(e) => e.stopPropagation()}>
        <span>{t("askPlaceholder")}</span>
        <span className="st-send">
          <Send size={16} />
        </span>
      </div>

      <div className="st-prompts">
        <span>{t("chipOhm")}</span>
        <span>{t("chipSeries")}</span>
        <span>{t("chipVoltage")}</span>
      </div>
    </div>
  );
}
