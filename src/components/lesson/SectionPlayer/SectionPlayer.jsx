import "./SectionPlayer.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import Modal from "../../shared/Modal/Modal";
import SparkWidget from "../../spark/SparkWidget";

const LABELS = {
  content: { en: "Lesson Text", hi: "पाठ सामग्री" },
  learningObjectives: { en: "Learning Objectives", hi: "सीखने के उद्देश्य" },
  realLifeExamples: { en: "Real-Life Examples", hi: "वास्तविक जीवन के उदाहरण" },
  keyPoints: { en: "Key Points", hi: "मुख्य बिंदु" },
  labSteps: { en: "Practical Lab Steps", hi: "प्रायोगिक लैब चरण" },
  safety: { en: "Safety Reminder", hi: "सुरक्षा याद रखें" },
  mistakes: { en: "Common Mistakes", hi: "सामान्य गलतियाँ" },
  troubleshooting: { en: "Problem-Solution Guide", hi: "समस्या-समाधान मार्गदर्शिका" },
  glossary: { en: "Glossary", hi: "शब्दावली" },
  quiz: { en: "Quiz", hi: "प्रश्नोत्तरी" },
  homework: { en: "Homework", hi: "गृहकार्य" },
  sparkSays: { en: "Spark Says", hi: "स्पार्क कहता है" },
  miniCheck: { en: "Mini Check", hi: "छोटी जाँच" },
  askSpark: { en: "Ask Spark", hi: "स्पार्क से पूछें" },
  complete: { en: "Mark Section Complete", hi: "खंड पूरा करें" },
  completeDone: { en: "Completed", hi: "पूरा हुआ" },
  previousSection: { en: "Previous Section", hi: "पिछला खंड" },
  reviewPrevious: { en: "Review Previous", hi: "पिछला दोहराएँ" },
  review: { en: "Review", hi: "दोहराएँ" },
  continueSection: { en: "Continue Section", hi: "खंड जारी रखें" },
  startSection: { en: "Start Section", hi: "खंड शुरू करें" },
  next: { en: "Next Section", hi: "अगला खंड" },
  assetPending: { en: "Asset pending", hi: "संसाधन प्रतीक्षारत" },
  openImage: { en: "Open image", hi: "चित्र खोलें" },
  close: { en: "Close", hi: "बंद करें" },
  wrong: { en: "Not quite. Check the correct answer above.", hi: "पूरी तरह सही नहीं। ऊपर सही उत्तर देखें।" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

function resolveImageUrl(value) {
  if (!value) return "";
  if (value.startsWith("/")) return value;
  return `/assets/lessons/be001/${value}`;
}

export default function SectionPlayer({
  section,
  total,
  isComplete,
  onMarkComplete,
  onNext,
  onPrevious,
  previousComplete = false,
  onAskSpark,
}) {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [quizSelections, setQuizSelections] = useState({});
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const isHindi = i18n.language?.startsWith("hi");

  function pickLang(value, fallback = "") {
    if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value;
    return value || fallback;
  }

  function label(key) {
    return pickLang(LABELS[key], key);
  }

  function languageArray(value) {
    const picked = pickLang(value, []);
    return Array.isArray(picked) ? picked : picked ? [picked] : [];
  }

  function keyFor(value, index) {
    const picked = pickLang(value, "");
    if (typeof picked === "string") return picked;
    return String(index);
  }

  function CardGrid({ title, items, renderItem, className = "" }) {
    if (!items?.length) return null;
    return (
      <div className="sp-block">
        <h4>{title}</h4>
        <div className={`sp-card-grid ${className}`}>
          {items.map((item, index) => (
            <div className="sp-info-card" key={keyFor(item.title || item.problem || item.mistake || item, index)}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const paragraphs = languageArray(section.paragraphs || {
    en: section.englishParagraphs || (section.english ? [section.english] : []),
    hi: section.hindiParagraphs || (section.hindi ? [section.hindi] : []),
  });
  const imageSrc = resolveImageUrl(section.image);
  const imageFit = section.imageFit || "cover";
  const isContain = imageFit === "contain";

  useEffect(() => {
    setImageFailed(false);
    setImageLoaded(false);
    setShowImageModal(false);
  }, [section.image]);

  return (
    <div className="sp">
      <div className="sp-stepper">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={n === section.order ? "sp-step is-current" : n < section.order ? "sp-step is-done" : "sp-step"}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="sp-columns">
        <div className="sp-visual-col">
          <div className={`sp-visual is-${imageFit} ${imageFailed ? "is-placeholder" : ""}`}>
            {!imageFailed && imageSrc && (
              <>
                <img
                  src={imageSrc}
                  alt={pickLang(section.caption, pickLang(section.title))}
                  className={`${imageLoaded ? "is-loaded" : "is-loading"} is-${imageFit}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageFailed(true)}
                />
                {imageLoaded && (
                  <button className="sp-image-open" onClick={() => setShowImageModal(true)}>
                    <ZoomIn size={14} /> {label("openImage")}
                  </button>
                )}
              </>
            )}
            {imageFailed && (
              <div className="sp-asset-placeholder">
                <span className="sp-asset-status">{label("assetPending")}</span>
                <p>{pickLang(section.caption)}</p>
              </div>
            )}
          </div>
        </div>

        <div className="sp-content-col">
          {!!paragraphs.length && (
            <div className={`sp-language-block ${isHindi ? "sp-hindi-block" : ""}`}>
              <h4>{label("content")}</h4>
              {paragraphs.map((item) => <p key={item}>{item}</p>)}
            </div>
          )}

          <CardGrid
            title={label("learningObjectives")}
            items={section.objectives}
            className="sp-objectives"
            renderItem={(objective, index) => (
              <>
                <strong>{index + 1}. {pickLang(objective.title)}</strong>
                <p>{pickLang(objective.body)}</p>
              </>
            )}
          />

          <CardGrid
            title={label("realLifeExamples")}
            items={languageArray(section.exampleCards)}
            renderItem={(example) => <p>{example}</p>}
          />

          {!!languageArray(section.keyPoints).length && (
            <div className="sp-block">
              <h4>{label("keyPoints")}</h4>
              <ul className="sp-keypoints">
                {languageArray(section.keyPoints).map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          )}

          {!!languageArray(section.labSteps).length && (
            <div className="sp-block">
              <h4>{label("labSteps")}</h4>
              <ol className="sp-check-list">
                {languageArray(section.labSteps).map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          )}

          {!!languageArray(section.safetyChecklist).length && (
            <div className="sp-block">
              <h4>{label("safety")}</h4>
              <ul className="sp-keypoints sp-safety-list">
                {languageArray(section.safetyChecklist).map((step) => <li key={step}>{step}</li>)}
              </ul>
            </div>
          )}

          <CardGrid
            title={label("mistakes")}
            items={section.mistakes}
            renderItem={(item) => (
              <>
                <strong>{pickLang(item.mistake)}</strong>
                <p>{pickLang(item.fix)}</p>
              </>
            )}
          />

          <CardGrid
            title={label("troubleshooting")}
            items={section.troubleshooting}
            renderItem={(item) => (
              <>
                <strong>{pickLang(item.problem)}</strong>
                <p>{pickLang(item.solution)}</p>
              </>
            )}
          />

          {section.glossary && (
            <div className="sp-block">
              <h4>{label("glossary")}</h4>
              <div className="sp-glossary">
                {section.glossary.map((item) => (
                  <div className="sp-glossary-item" key={pickLang(item.term)}>
                    <strong>{pickLang(item.term)}</strong>
                    <p>{pickLang(item.definition)}</p>
                    {item.example && <small>{pickLang(item.example)}</small>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.quizQuestions && (
            <div className="sp-block">
              <h4>{label("quiz")}</h4>
              <div className="sp-full-quiz">
                {section.quizQuestions.map((question, qIndex) => {
                  const chosen = quizSelections[qIndex];
                  const options = languageArray(question.options);
                  return (
                    <div className="sp-quiz-card" key={pickLang(question.question)}>
                      <strong>{qIndex + 1}. {pickLang(question.question)}</strong>
                      <div className="sp-mc-options">
                        {options.map((option, optionIndex) => (
                          <button
                            key={option}
                            className={
                              chosen === undefined
                                ? "sp-mc-option"
                                : optionIndex === question.correctIndex
                                ? "sp-mc-option is-correct"
                                : optionIndex === chosen
                                ? "sp-mc-option is-wrong"
                                : "sp-mc-option"
                            }
                            onClick={() => setQuizSelections((prev) => ({ ...prev, [qIndex]: optionIndex }))}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                          </button>
                        ))}
                      </div>
                      {chosen !== undefined && <p className="sp-mc-feedback">{pickLang(question.feedback)}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!!languageArray(section.homework).length && (
            <div className="sp-block">
              <h4>{label("homework")}</h4>
              <ol className="sp-homework sp-check-list">
                {languageArray(section.homework).map((item) => <li key={item}>{item}</li>)}
              </ol>
            </div>
          )}

          {section.achievement && (
            <div className="sp-achievement-card">
              <strong>{pickLang(section.achievement.title)}</strong>
              <p>{pickLang(section.achievement.message)}</p>
            </div>
          )}

          {section.sparkSays && (
            <SparkWidget
              context={{
                source: "section",
                moduleId: "module-01",
                lessonId: "BE-001",
                sectionId: section.id,
                sectionTitle: section.title,
                textSummary: section.paragraphs,
                imageCaption: section.caption,
              }}
              onOpen={() =>
                onAskSpark?.({
                  source: "section",
                  moduleId: "module-01",
                  lessonId: "BE-001",
                  sectionId: section.id,
                  sectionTitle: section.title,
                  textSummary: section.paragraphs,
                  imageCaption: section.caption,
                })
              }
            />
          )}

          {section.miniCheck && (
            <div className="sp-minicheck">
              <h4>{label("miniCheck")}</h4>
              <p>{pickLang(section.miniCheck.question)}</p>
              <div className="sp-mc-options">
                {languageArray(section.miniCheck.options).map((option, index) => (
                  <button
                    key={option}
                    className={
                      selected === null
                        ? "sp-mc-option"
                        : index === section.miniCheck.correctIndex
                        ? "sp-mc-option is-correct"
                        : index === selected
                        ? "sp-mc-option is-wrong"
                        : "sp-mc-option"
                    }
                    onClick={() => setSelected(index)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <p className="sp-mc-feedback">
                  {selected === section.miniCheck.correctIndex ? pickLang(section.miniCheck.feedback) : label("wrong")}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sp-actions">
        <div className="sp-actions-row sp-actions-row-top">
          {onPrevious ? (
            <button className="sp-secondary-btn" onClick={onPrevious}>
              <ChevronLeft size={16} /> {previousComplete ? label("reviewPrevious") : label("previousSection")}
            </button>
          ) : (
            <div className="sp-row-spacer" />
          )}

          <button className="sp-next-btn" onClick={onNext}>
            {label("next")} <ChevronRight size={16} />
          </button>
        </div>

        <div className="sp-actions-row sp-actions-row-bottom">
          <button
            className="sp-ask-spark"
            onClick={() =>
              onAskSpark?.({
                source: "section",
                moduleId: "module-01",
                lessonId: "BE-001",
                sectionId: section.id,
                sectionTitle: section.title,
                textSummary: section.paragraphs,
                imageCaption: section.caption,
              })
            }
          >
            <MessageCircle size={16} /> {label("askSpark")}
          </button>

          <button className={isComplete ? "sp-complete-btn is-done" : "sp-complete-btn"} onClick={onMarkComplete}>
            <CheckCircle2 size={16} /> {isComplete ? label("completeDone") : label("complete")}
          </button>
        </div>
      </div>

      <Modal
        open={showImageModal && !imageFailed}
        onClose={() => setShowImageModal(false)}
        title={pickLang(section.caption, pickLang(section.title))}
        closeLabel={label("close")}
      >
        <div className="sp-image-modal">
          <div className={`sp-image-modal-frame is-${imageFit}`}>
            <img
              className={`sp-image-modal-img is-${imageFit}`}
              src={imageSrc}
              alt={pickLang(section.caption, pickLang(section.title))}
            />
          </div>
          <div className="sp-image-modal-actions">
            <button
              type="button"
              className="sp-image-modal-ask"
              onClick={() =>
                onAskSpark?.({
                  source: "image",
                  moduleId: "module-01",
                  lessonId: "BE-001",
                  sectionId: section.id,
                  sectionTitle: section.title,
                  textSummary: section.paragraphs,
                  imageCaption: section.caption,
                })
              }
            >
              <MessageCircle size={16} /> {label("askSpark")}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
