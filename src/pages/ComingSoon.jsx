import "./ComingSoon.css";

export default function ComingSoon({ title }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-card">
        <h1>{title}</h1>
        <p>This screen is coming in Phase 2.</p>
      </div>
    </div>
  );
}
