import DisclaimerCard from "./DisclaimerCard";

export default function LoginForm() {
  return (
    <form className="login-card">
      <h2>Welcome Back!</h2>

      <div className="form-title">
        <span></span>
        <p>Student Login</p>
        <span></span>
      </div>

      <label className="input-row">
        <span>👤</span>
        <input type="text" maxLength="5" placeholder="5 Digit Student Code" />
      </label>

      <label className="input-row">
        <span>🔒</span>
        <input type="password" placeholder="Password" />
        <button type="button" className="icon-btn">👁</button>
      </label>

      <label className="remember-row">
        <input type="checkbox" />
        <span>Remember me</span>
      </label>

      <button type="button" className="primary-btn">
        Start Learning
      </button>

      <button type="button" className="secondary-btn">
        Continue Previous Lesson
      </button>

      <div className="separator"></div>

      <DisclaimerCard />
    </form>
  );
}