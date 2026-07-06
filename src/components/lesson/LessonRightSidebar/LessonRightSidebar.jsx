import "./LessonRightSidebar.css";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SparkDoubtBubble from "../../spark/SparkDoubtBubble";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../../data/sparkKnowledge";

const LABELS = {
  sparkAi: { en: "SPARK AI", hi: "स्पार्क AI" },
  sparkMsg: { en: "Hi Sandeep! I'm Spark. Need help with this lesson?", hi: "नमस्ते Sandeep! मैं स्पार्क हूँ। इस पाठ में मदद चाहिए?" },
  askSpark: { en: "Ask Spark anything...", hi: "स्पार्क से कुछ भी पूछें..." },
  checklist: { en: "LESSON CHECKLIST", hi: "पाठ चेकलिस्ट" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

export default function LessonRightSidebar({ lesson, checklist, completedCount, onAskSpark }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const pickLang = (value, fallback = "") => {
    if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
    return value || fallback;
  };
  const label = (key) => pickLang(LABELS[key], key);

  return (
    <aside className="lrs">
      <div className="lrs-card">
        <SparkDoubtBubble
          mode="inline"
          context={{
            source: "lesson",
            moduleId: "module-01",
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            sectionTitle: lesson.title,
            textSummary: lesson.overview || lesson.description || "",
            imageCaption: lesson.sparkMessage || lesson.description || "",
            knowledge: mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001),
          }}
          onOpen={() =>
            onAskSpark?.({
              source: "lesson",
              moduleId: "module-01",
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              sectionTitle: lesson.title,
              textSummary: lesson.overview || lesson.description || "",
              imageCaption: lesson.sparkMessage || lesson.description || "",
              knowledge: mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001),
            })
          }
        />
      </div>

      <div className="lrs-card">
        <div className="lrs-title">{label("checklist")}</div>
        <div className="lrs-checklist">
          {checklist.map((item, i) => {
            const done = i < completedCount;
            const current = i === completedCount;
            return (
              <div key={pickLang(item)} className="lrs-check-item">
                {done ? (
                  <CheckCircle2 size={16} className="lrs-check-done" />
                ) : (
                  <span className={`lrs-check-circle ${current ? "is-current" : ""}`} />
                )}
                <span className={done || current ? "" : "lrs-check-locked"}>{pickLang(item)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
