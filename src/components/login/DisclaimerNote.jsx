import "./DisclaimerNote.css";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function DisclaimerNote() {
  const { t } = useTranslation();

  return (
    <div className="disclaimer-note">
      <ShieldCheck size={18} />
      <div>
        <strong>{t("evaluationTitle")}</strong>
        <p>{t("evaluationBody")}</p>
      </div>
    </div>
  );
}
