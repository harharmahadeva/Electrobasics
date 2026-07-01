import "./LoginPage.css";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="hero-panel">
        <header className="brand">
          <div className="brand-icon">⚡</div>
          <div>
            <h1>Electro<span>Basics</span></h1>
            <p>Interactive Electronics Learning Platform</p>
          </div>
        </header>

        <section className="hero-copy">
          <h2>
            Learn Electronics.
            <span>Build Confidence.</span>
          </h2>
          <p>
            Learn electronics using real components, practical examples,
            interactive quizzes and your AI tutor, Spark.
          </p>
        </section>

        <section className="spark-card">
          <div className="kitt-bar">
            <div className="kitt-leds"></div>
            <div className="kitt-light"></div>
          </div>

          <div className="spark-content">
            <div className="spark-avatar">🤖</div>
            <div>
              <h3>
                Spark <span>AI Tutor</span>
              </h3>
              <p>
                Hi! I’m Spark. I’ll guide you through every lesson step by step
                in English or Hindi.
              </p>
            </div>
          </div>
        </section>

        <footer className="hero-actions">
          <button>🌐 English | हिन्दी</button>
          <button>☀️ Light | 🌙 Dark</button>
        </footer>
      </section>

      <section className="login-panel">
        <div className="top-actions">
          <button>🌐 English | हिन्दी</button>
          <button>☀️ Light | 🌙 Dark</button>
        </div>

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
            📄 Continue Previous Lesson
          </button>

          <div className="separator"></div>

          <section className="disclaimer-card">
            <div className="shield">🛡️</div>
            <div>
              <h3>Evaluation Build</h3>
              <p>
                This application is for evaluation and testing purposes only.
                Not for public distribution.
              </p>
              <div className="version-row">
                <span></span>
                <strong>Version 0.1.0</strong>
                <span></span>
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}