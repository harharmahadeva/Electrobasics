import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Lock, User } from "lucide-react";
import useLogin from "../../hooks/useLogin";
import DisclaimerNote from "./DisclaimerNote";

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, error, signIn } = useLogin();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await signIn(username, password);
    if (user) navigate("/dashboard");
  }

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <div className="login-card-header">
        <div>
          <h1>{t("welcome")}</h1>
          <p className="login-sub">{t("loginSub")}</p>
        </div>
      </div>

      <div className="login-fields">
        <label className="field-label">{t("username")}</label>
        <div className="field-row">
          <User size={16} />
          <input
            type="text"
            placeholder={t("usernamePlaceholder")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <label className="field-label">{t("password")}</label>
        <div className="field-row">
          <Lock size={16} />
          <input
            type="password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="signin-btn" disabled={loading}>
          {loading ? "..." : t("signIn")}
        </button>

        <DisclaimerNote />
        <p className="login-card-copyright">&copy; 2026 OranjeRaksha. All rights reserved.</p>
      </div>
    </form>
  );
}
