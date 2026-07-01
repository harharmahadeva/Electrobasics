import KittScanner from "./KittScanner";

export default function SparkCard() {
  return (
    <section className="spark-card">

      <KittScanner />

      <div className="spark-content">

        <div className="spark-avatar">
          🤖
        </div>

        <div>

          <h3>
            Spark
            <span>AI Tutor</span>
          </h3>

          <p>
            Hi! I'm Spark.
            <br />
            I'll guide you through every lesson step by step.
            <br />
            Learn. Practice. Understand.
          </p>

        </div>

      </div>

    </section>
  );
}