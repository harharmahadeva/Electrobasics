import { EBButton } from "./components/ui/EBButton/EBButton.jsx";
import { EBCard } from "./components/ui/EBCard/EBCard.jsx";
import { EBInput } from "./components/ui/EBInput/EBInput.jsx";

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero-grid">
        <EBCard className="hero-card">
          <p className="eyebrow">Milestone M1 · Design System</p>
          <h1>⚡ ElectroBasics</h1>
          <p className="hero-copy">
            Learn electronics through visuals, practice, Spark guidance, and real understanding.
          </p>
          <div className="demo-actions">
            <EBButton>Start Learning</EBButton>
            <EBButton variant="secondary">View Lessons</EBButton>
          </div>
        </EBCard>

        <EBCard className="spark-preview">
          <div className="spark-orb" aria-hidden="true">
            <span />
          </div>
          <p className="eyebrow">Spark AI Tutor</p>
          <h2>Ready to teach.</h2>
          <p>
            Spark will guide students with voice, hints, questions, and calm explanations.
          </p>
          <EBInput label="Student Code Preview" placeholder="12345" maxLength={5} />
        </EBCard>
      </section>
    </main>
  );
}
