import "./SparkConsole.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Image, MessageCircle, Send, Sparkles, X, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  buildSparkOpeningReply,
  buildSparkReply,
  normalizeSparkContext,
  pickSparkText,
  summarizeSparkText,
} from "./sparkUtils";

const LABELS = {
  title: { en: "Spark AI Console", hi: "Spark AI Console" },
  subtitle: { en: "Scanner Online", hi: "\u0938\u094D\u0915\u0948\u0928\u0930 \u0913\u0928" },
  context: { en: "Context", hi: "\u0938\u0902\u0926\u0930\u094D\u092D" },
  source: { en: "Source", hi: "\u0938\u094D\u0930\u094B\u0924" },
  module: { en: "Module", hi: "\u092E\u0949\u0921\u094D\u092F\u0942\u0932" },
  lesson: { en: "Lesson", hi: "\u092A\u093E\u0920" },
  section: { en: "Section", hi: "\u0916\u0902\u0921" },
  ready: { en: "Scanner Online", hi: "\u0938\u094D\u0915\u0948\u0928\u0930 \u0913\u0928" },
  imageCaption: { en: "Image caption", hi: "\u091A\u093F\u0924\u094D\u0930" },
  summary: { en: "Section summary", hi: "\u0938\u093E\u0930" },
  askPlaceholder: { en: "Ask your doubt", hi: "\u0938\u0935\u093E\u0932 \u0932\u093F\u0916\u0947\u0902" },
  cannedTitle: { en: "Spark response", hi: "Spark \u091C\u0935\u093E\u092C" },
  close: { en: "Close", hi: "\u092C\u0902\u0926" },
  send: { en: "Send", hi: "\u092D\u0947\u091C\u0947\u0902" },
  simple: { en: "Simple", hi: "\u0938\u0930\u0932" },
  example: { en: "Example", hi: "\u0909\u0926\u093E\u0939\u0930\u0923" },
  quiz: { en: "Quiz", hi: "\u0915\u094D\u0935\u093F\u091C" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

function labelFrom(value, isHindi, fallback = "") {
  if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
  return value || fallback;
}

function getPreviewReply(context, isHindi) {
  return buildSparkOpeningReply(context, isHindi);
}

export default function SparkConsole({
  open,
  onClose,
  context = {},
  fullPage = false,
  mode = "panel",
  compact = false,
  onOpen,
  messages,
  onSend,
}) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const normalizedContext = useMemo(() => normalizeSparkContext(context), [context]);
  const openingReply = useMemo(() => getPreviewReply(normalizedContext, isHindi), [isHindi, normalizedContext]);

  const [localMessages, setLocalMessages] = useState([{ role: "spark", text: openingReply }]);
  const [localDraft, setLocalDraft] = useState("");
  const [showContext, setShowContext] = useState(false);
  const draftRef = useRef(null);
  const controlledMessages = messages !== undefined;
  const activeMessages = controlledMessages ? messages : localMessages;

  useEffect(() => {
    if (controlledMessages) return;
    setLocalMessages([{ role: "spark", text: openingReply }]);
    setShowContext(false);
  }, [controlledMessages, openingReply]);

  useEffect(() => {
    if (!open && !fullPage) return;
    draftRef.current?.focus?.();
  }, [open, fullPage]);

  useEffect(() => {
    if (!open || fullPage || mode === "card") return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullPage, mode, onClose, open]);

  function label(key) {
    return labelFrom(LABELS[key], isHindi, key);
  }

  function updateDraft(value) {
    setLocalDraft(value);
  }

  function pushMessage(text) {
    const reply = buildSparkReply(normalizedContext, text, isHindi);
    if (onSend) {
      onSend(text);
      return;
    }
    setLocalMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "spark", text: reply },
    ]);
  }

  function sendMessage(value = localDraft) {
    const text = String(value || "").trim();
    if (!text) return;
    pushMessage(text);
    setLocalDraft("");
  }

  function renderWidget() {
    const widgetLine = isHindi ? "à¤‡à¤¸ à¤ªà¤¾à¤  à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚ Spark à¤¸à¥‡ à¤ªà¥‚à¤›à¥‡à¤‚à¥¤" : "Ask Spark about this lesson.";
    return (
      <>
        <div className="spark-header">
          <div className="spark-title">
            <div>
              <h2>{label("title")}</h2>
            </div>
          </div>
          <span className="spark-status">
            <Zap size={13} /> {label("ready")}
          </span>
        </div>

        <div className="spark-scanner" aria-hidden="true">
          <span />
        </div>

        <p className="spark-widget-line">{widgetLine}</p>

        <div className="spark-widget-footer">
          <div className="spark-widget-input">
            <span>{widgetLine}</span>
            <button
              type="button"
              onClick={() => onOpen?.()}
              aria-label={label("askPlaceholder")}
            >
              <MessageCircle size={15} />
            </button>
          </div>
        </div>
      </>
    );
  }

  function content() {
    const leadMessage = activeMessages?.[0]?.text || openingReply;
    return (
      <>
        <div className="spark-header">
          <div className="spark-title">
            <span className="spark-dot" aria-hidden="true">
              <Zap size={14} />
            </span>
            <div>
              <h2>{label("title")}</h2>
              <p>{label("subtitle")}</p>
            </div>
          </div>
          <span className="spark-status">
            <Zap size={13} /> {label("ready")}
          </span>
          {!compact && mode !== "card" && !fullPage && (
            <button type="button" className="spark-close" onClick={onClose} aria-label={label("close")}>
              <X size={18} />
            </button>
          )}
        </div>

        <div className="spark-scanner spark-scanner--header" aria-hidden="true">
          <span />
        </div>

        <div className="spark-bubble spark-bubble--lead">
          <strong>{label("cannedTitle")}</strong>
          <p>{leadMessage}</p>
        </div>

        <div className="spark-context-accordion">
          <button
            type="button"
            className="spark-context-toggle"
            onClick={() => setShowContext((prev) => !prev)}
            aria-expanded={showContext}
          >
            <Sparkles size={14} />
            <span>{label("context")}</span>
          </button>

          <div className={`spark-context ${showContext ? "is-open" : ""}`}>
            <div className="spark-context-grid">
              {normalizedContext.source && (
                <span>
                  <strong>{label("source")}:</strong> {normalizedContext.source}
                </span>
              )}
              {normalizedContext.moduleId && (
                <span>
                  <strong>{label("module")}:</strong> {normalizedContext.moduleId}
                  {normalizedContext.moduleTitle ? ` - ${pickSparkText(normalizedContext.moduleTitle, isHindi)}` : ""}
                </span>
              )}
              {normalizedContext.lessonId && (
                <span>
                  <strong>{label("lesson")}:</strong> {normalizedContext.lessonId}
                  {normalizedContext.lessonTitle ? ` - ${pickSparkText(normalizedContext.lessonTitle, isHindi)}` : ""}
                </span>
              )}
              {normalizedContext.sectionId && (
                <span>
                  <strong>{label("section")}:</strong> {normalizedContext.sectionId}
                </span>
              )}
            </div>

            {normalizedContext.sectionTitle && (
              <p className="spark-context-main">{pickSparkText(normalizedContext.sectionTitle, isHindi)}</p>
            )}

            {normalizedContext.textSummary && (
              <p>
                <strong>{label("summary")}:</strong> {summarizeSparkText(pickSparkText(normalizedContext.textSummary, isHindi), 220)}
              </p>
            )}

            {normalizedContext.imageCaption && (
              <p className="spark-image-caption">
                <Image size={15} />
                <span>
                  <strong>{label("imageCaption")}:</strong> {pickSparkText(normalizedContext.imageCaption, isHindi)}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="spark-message-list" aria-live="polite">
          {activeMessages?.slice(1).map((message, index) => (
            <div
              key={`${message.role}-${index}-${message.text.slice(0, 12)}`}
              className={`spark-message spark-message--${message.role}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <form
          className="spark-input"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <textarea
            ref={draftRef}
            rows={2}
            value={localDraft}
            onChange={(event) => updateDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder={label("askPlaceholder")}
            aria-label={label("askPlaceholder")}
          />
          <button type="submit" aria-label={label("send")}>
            <Send size={16} />
          </button>
        </form>

        <div className="spark-prompts">
          <button type="button" onClick={() => sendMessage(isHindi ? "à¤‡à¤¸à¤•à¥‹ à¤¸à¤°à¤² à¤¶à¤¬à¥à¤¦à¥‹à¤‚ à¤®à¥‡à¤‚ à¤¸à¤®à¤à¤¾à¤‡à¤" : "Explain this in simple words")}>
            {label("simple")}
          </button>
          <button type="button" onClick={() => sendMessage(isHindi ? "à¤®à¥à¤à¥‡ à¤à¤• à¤‰à¤¦à¤¾à¤¹à¤°à¤£ à¤¦à¥€à¤œà¤¿à¤" : "Give me one example")}>
            {label("example")}
          </button>
          <button type="button" onClick={() => sendMessage(isHindi ? "à¤®à¥à¤à¥‡ à¤à¤• à¤•à¥à¤µà¤¿à¤œà¤¼ à¤¦à¥€à¤œà¤¿à¤" : "Give me a quiz")}>
            {label("quiz")}
          </button>
        </div>
      </>
    );
  }

  if (mode === "widget" || mode === "card") {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`spark-widget ${compact ? "is-compact" : ""}`}
        onClick={() => onOpen?.()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen?.();
          }
        }}
      >
        {renderWidget()}
      </div>
    );
  }

  if (!open && !fullPage) return null;

  const body = (
    <div
      className={fullPage ? "spark-panel spark-panel-page" : "spark-panel"}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {content()}
    </div>
  );

  if (fullPage) return body;

  return createPortal(
    <div className="spark-panel-backdrop" onClick={onClose}>
      {body}
    </div>,
    document.body
  );
}