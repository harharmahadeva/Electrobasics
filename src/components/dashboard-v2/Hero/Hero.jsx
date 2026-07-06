import "./Hero.css";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-icon">
        <Zap size={30} fill="currentColor" />
      </div>

      <div className="hero-copy">
        <h1>{t("greeting")}</h1>
        <p>{t("greetingSub")}</p>
      </div>
    </section>
  );
}
