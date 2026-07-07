import "./SparkDoubtBubble.css";
import { MessageCircle, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSpark } from "../../context/SparkContext";

const LABELS = {
  ask: { en: "Ask Spark", hi: "Spark से पूछें" },
  clear: { en: "Clear Doubt", hi: "डाउट दूर करें" },
  title: { en: "Spark AI Console", hi: "स्पार्क AI कंसोल" },
  ready: { en: "Scanner Online", hi: "स्कैनर ऑनलाइन" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

function pickLabel(value, isHindi, fallback = "") {
  if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
  return value || fallback;
}

export default function SparkDoubtBubble({ context = {}, onOpen, className = "", title, subtitle, mode = "floating" }) {
  const { i18n } = useTranslation();
  const spark = useSpark();
  const isHindi = i18n.language?.startsWith("hi");

  const handleOpen = onOpen || (() => spark.openSpark(context));
  const mainLabel = title ? pickLabel(title, isHindi) : pickLabel(LABELS.clear, isHindi);
  const subLabel = subtitle ? pickLabel(subtitle, isHindi) : pickLabel(LABELS.ask, isHindi);

  return (
    <button
      type="button"
      className={`spark-doubt-bubble ${mode === "inline" ? "is-inline" : "is-floating"} ${className}`}
      onClick={handleOpen}
    >
      <span className="spark-doubt-bubble__scan" aria-hidden="true">
        <span />
      </span>
      <span className="spark-doubt-bubble__inner">
        <span className="spark-doubt-bubble__icon" aria-hidden="true">
          <Sparkles size={12} />
        </span>
        <span className="spark-doubt-bubble__copy">
          <strong>{mainLabel}</strong>
          <span>{subLabel}</span>
        </span>
        <span className="spark-doubt-bubble__action" aria-hidden="true">
          <MessageCircle size={12} />
        </span>
      </span>
      <span className="spark-doubt-bubble__status" aria-hidden="true">
        <Zap size={10} /> {pickLabel(LABELS.ready, isHindi)}
      </span>
    </button>
  );
}
