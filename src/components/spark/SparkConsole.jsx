import "./SparkConsole.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Send, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  buildSparkOpeningReply,
  buildSparkReply,
  normalizeSparkContext,
} from "./sparkUtils";

const LABELS = {
  askPlaceholder: { en: "Ask your doubt", hi: "सवाल लिखें" },
  close: { en: "Close", hi: "बंद" },
  send: { en: "Send", hi: "भेजें" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

function labelFrom(value, isHindi, fallback = "") {
  if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
  return value || fallback;
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
  const openingReply = useMemo(() => buildSparkOpeningReply(normalizedContext, isHindi), [isHindi, normalizedContext]);

  const [localMessages, setLocalMessages] = useState([{ role: "spark", text: openingReply }]);
  const [localDraft, setLocalDraft] = useState("");
  const draftRef = useRef(null);
  const controlledMessages = messages !== undefined;
  const activeMessages = controlledMessages ? messages : localMessages;

  useEffect(() => {
    if (controlledMessages) return;
    setLocalMessages([{ role: "spark", text: openingReply }]);
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
    return (
      <div className="spark-widget-scanner" aria-hidden="true">
        <span className="spark-widget-scanner__light" />
        <span className="spark-widget-scanner__label">Clear Doubt</span>
      </div>
    );
  }

  function content() {
    const leadMessage = activeMessages?.[0]?.text || openingReply;
    return (
      <div className="spark-dialog-shell">
        <button type="button" className="spark-close" onClick={onClose} aria-label={label("close")}>
          <X size={15} />
        </button>

        <div className="spark-scanner spark-scanner--header" aria-hidden="true">
          <span className="spark-scanner__light" />
        </div>

        <div className="spark-message-list" aria-live="polite">
          <div className="spark-message spark-message--spark spark-message--lead">
            {leadMessage}
          </div>
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
            onChange={(event) => setLocalDraft(event.target.value)}
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
            <Send size={15} />
          </button>
        </form>
      </div>
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
