import "./Hero.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useProgress } from "../../../context/ProgressContext";
import { useSpark } from "../../../context/SparkContext";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../../data/sparkKnowledge";

export default function Hero() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { progress, getResumeRoute } = useProgress();
  const { openSpark } = useSpark();
  const isHindi = i18n.language?.startsWith("hi");

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const period = hour < 12 ? (isHindi ? "सुबह" : "morning") : hour < 18 ? (isHindi ? "दोपहर" : "afternoon") : (isHindi ? "शाम" : "evening");
    return isHindi ? `शुभ ${period}, संदीप` : `Good ${period}, Sandeep`;
  }, [isHindi]);

  const hasProgress = Boolean(Object.keys(progress || {}).length);
  const resumeRoute = getResumeRoute();

  function handleAskSpark() {
    openSpark({
      source: "dashboard",
      moduleId: "module-01",
      moduleTitle: "Welcome & Electronics Lab",
      lessonId: "BE-001",
      lessonTitle: "Welcome to ElectroBasics",
      sectionTitle: "Dashboard help",
      textSummary: "Continue Module 01 or resume the last BE-001 section from the dashboard.",
      teacherScript: "Module 01 starts with BE-001, safety, tools and small beginner steps.",
      knowledge: mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001),
    });
  }

  return (
    <section className="hero">
      <div className="hero-icon">
        <Zap size={30} fill="currentColor" />
      </div>

      <div className="hero-copy">
        <h1>{greeting}</h1>
        <p>{hasProgress ? (isHindi ? "जहाँ आपने छोड़ा था, वहीं से जारी रखें।" : "Continue where you left off.") : (isHindi ? "Module 01 से शुरुआत करें और Spark को साथ रखें।" : "Start Module 01 and keep Spark close.")}</p>
        <div className="hero-actions">
          <button type="button" className="hero-action hero-action--primary" onClick={() => navigate(resumeRoute)}>
            {hasProgress ? (isHindi ? "Continue Learning" : "Continue Learning") : (isHindi ? "Start Module 01" : "Start Module 01")}
          </button>
          {hasProgress && (
            <button type="button" className="hero-action" onClick={() => navigate(resumeRoute)}>
              {isHindi ? "अंतिम खंड जारी रखें" : "Resume Last Section"}
            </button>
          )}
          <button type="button" className="hero-action" onClick={handleAskSpark}>
            {isHindi ? "Spark से पूछें" : "Ask Spark"}
          </button>
        </div>
      </div>
    </section>
  );
}
