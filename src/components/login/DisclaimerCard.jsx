export default function DisclaimerCard() {
  return (
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
  );
}