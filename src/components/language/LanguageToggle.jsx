import "./LanguageToggle.css";
import { useTranslation } from "react-i18next";

export default function LanguageToggle({ size = "md", full = false }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className={`lang-toggle lang-toggle--${size}`}>
      <button
        className={lang === "en" ? "active" : ""}
        onClick={() => i18n.changeLanguage("en")}
      >
        EN{full ? "  English" : ""}
      </button>
      <button
        className={lang === "hi" ? "active" : ""}
        onClick={() => i18n.changeLanguage("hi")}
      >
        HI{full ? "  हिंदी" : ""}
      </button>
    </div>
  );
}
