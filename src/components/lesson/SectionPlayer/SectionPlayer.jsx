import "./SectionPlayer.css";
import { useState } from "react";
import { MessageCircle, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

export default function SectionPlayer({
  section,
  total,
  isComplete,
  onMarkComplete,
  onNext,
  onAskSpark,
}) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="sp">
      <div className="sp-stepper">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={
              n === section.order ? "sp-step is-current" : n < section.order ? "sp-step is-done" : "sp-step"
            }
          >
            {n}
          </span>
        ))}
      </div>

      <div className="sp-columns">
        <div className="sp-visual-col">
          <div className={`sp-visual thumb-${section.id}`} />
          {section.caption && <p className="sp-caption">{section.caption}</p>}
        </div>

        <div className="sp-content-col">
          <p className="sp-english">{section.english}</p>
          <p className="sp-hindi">{section.hindi}</p>

          {section.keyPoints && (
            <div className="sp-block">
              <h4>Key Points</h4>
              <ul className="sp-keypoints">
                {section.keyPoints.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {section.glossary && (
            <div className="sp-block">
              <h4>Glossary</h4>
              <div className="sp-glossary">
                {section.glossary.map((g) => (
                  <div className="sp-glossary-item" key={g.term}>
                    <strong>
                      {g.term} <span>| {g.hindi}</span>
                    </strong>
                    <p>{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.quizQA && (
            <div className="sp-block">
              <h4>Quiz Review</h4>
              <div className="sp-quiz-qa">
                {section.quizQA.map((qa, i) => (
                  <div className="sp-qa-item" key={qa.question}>
                    <strong>
                      {i + 1}. {qa.question}
                    </strong>
                    <p>{qa.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.homework && (
            <div className="sp-block">
              <h4>Homework</h4>
              <ol className="sp-homework">
                {section.homework.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ol>
            </div>
          )}

          {section.sparkSays && (
            <div className="sp-spark-card">
              <Sparkles size={16} />
              <p>{section.sparkSays}</p>
            </div>
          )}

          {section.miniCheck && (
            <div className="sp-minicheck">
              <h4>Mini Check</h4>
              <p>{section.miniCheck.question}</p>
              <div className="sp-mc-options">
                {section.miniCheck.options.map((opt, i) => (
                  <button
                    key={opt}
                    className={
                      selected === null
                        ? "sp-mc-option"
                        : i === section.miniCheck.correctIndex
                        ? "sp-mc-option is-correct"
                        : i === selected
                        ? "sp-mc-option is-wrong"
                        : "sp-mc-option"
                    }
                    onClick={() => setSelected(i)}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <p className="sp-mc-feedback">
                  {selected === section.miniCheck.correctIndex
                    ? section.miniCheck.feedback
                    : "Not quite — check the correct answer above."}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sp-actions">
        <button className="sp-ask-spark" onClick={onAskSpark}>
          <MessageCircle size={16} /> Ask Spark
        </button>

        <div className="sp-actions-right">
          <button
            className={isComplete ? "sp-complete-btn is-done" : "sp-complete-btn"}
            onClick={onMarkComplete}
          >
            <CheckCircle2 size={16} /> {isComplete ? "Section Complete" : "Mark Section Complete"}
          </button>

          <button className="sp-next-btn" onClick={onNext}>
            Next Section <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
