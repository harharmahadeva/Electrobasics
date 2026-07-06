import "./LoginPage.css";
import { BookOpen, Cpu, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "../components/language/LanguageToggle";
import LoginForm from "../components/login/LoginForm";

const HERO_POINTS = [
  { icon: BookOpen, label: { en: "Interactive Lessons", hi: "इंटरैक्टिव पाठ" } },
  { icon: Cpu, label: { en: "Real Simulations", hi: "वास्तविक सिमुलेशन" } },
  { icon: Sparkles, label: { en: "AI Assistant (Spark)", hi: "AI सहायक (Spark)" } },
  { icon: Zap, label: { en: "Build Projects", hi: "प्रोजेक्ट बनाएं" } },
];

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const pickLang = (value) => (isHindi ? value.hi || value.en : value.en || value.hi);

  return (
    <div className="eb-shell login-page login-screen">
      <div className="eb-shell-grid" />

      <div className="login-overlay" aria-hidden="true" />

      <div className="login-layout">
        <div className="login-hero-panel">
          <div className="login-brand">
            <div className="login-logo-icon">
              <Zap size={26} fill="currentColor" />
            </div>
            <div>
              <span className="login-brand-name">ElectroBasics</span>
              <span className="login-brand-subtitle">{t("loginPlatformSubtitle")}</span>
            </div>
          </div>

          <div className="login-hero-copy">
            <h1>
              <span>Learn.</span>
              <span>Build.</span>
              <span>Innovate.</span>
            </h1>
            <p>{t("loginHeroBody")}</p>
          </div>

          <div className="login-hero-points">
            {HERO_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div className="login-hero-point" key={point.label.en}>
                  <Icon size={18} />
                  <span>{pickLang(point.label)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="login-panel-wrap">
          <div className="login-lang-float">
            <LanguageToggle size="md" full />
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="login-footer">© 2026 OranjeRaksha. All rights reserved.</div>
    </div>
  );
}
