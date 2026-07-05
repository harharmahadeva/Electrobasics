import "./LoginPage.css";
import { Zap } from "lucide-react";
import LanguageToggle from "../components/language/LanguageToggle";
import LoginForm from "../components/login/LoginForm";
import DisclaimerNote from "../components/login/DisclaimerNote";

export default function LoginPage() {
  return (
    <div className="eb-shell login-page">
      <div className="eb-shell-grid" />

      <div className="login-lang-toggle">
        <LanguageToggle size="md" full />
      </div>

      <div className="login-content">
        <div className="login-logo">
          <div className="login-logo-icon">
            <Zap size={24} fill="currentColor" />
          </div>
          <span>ElectroBasics</span>
        </div>

        <LoginForm />
        <DisclaimerNote />
        <p className="login-copyright">© 2026 OranjeRaksha. All rights reserved.</p>
      </div>
    </div>
  );
}
