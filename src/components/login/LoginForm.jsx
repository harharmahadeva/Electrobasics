import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import useLogin from "../../hooks/useLogin";

export default function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loading, error, signIn } = useLogin();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await signIn(userId, password);
    if (user) navigate("/dashboard");
  }

  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <h1>{t("welcome")} 👋</h1>
      <p className="login-sub">{t("loginSub")}</p>

      <label className="field-label">{t("userId")}</label>
      <div className="field-row">
        <User size={16} />
        <input
          type="text"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>

      <label className="field-label">{t("password")}</label>
      <div className="field-row">
        <Lock size={16} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="signin-btn" disabled={loading}>
        {loading ? "..." : t("signIn")}
      </button>
    </form>
  );
}
