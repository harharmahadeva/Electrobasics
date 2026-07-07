import "./LessonPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, PartyPopper, Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ModuleTopBar from "../../components/module-detail/ModuleTopBar/ModuleTopBar";
import LessonSidebar from "../../components/lesson/LessonSidebar/LessonSidebar";
import LessonRightSidebar from "../../components/lesson/LessonRightSidebar/LessonRightSidebar";
import SectionCard from "../../components/lesson/SectionCard/SectionCard";
import SectionPlayer from "../../components/lesson/SectionPlayer/SectionPlayer";
import Modal from "../../components/shared/Modal/Modal";
import BottomNav from "../../components/navigation/BottomNav";
import { useToast } from "../../context/ToastContext";
import { useProgress } from "../../context/ProgressContext";
import { useSpark } from "../../context/SparkContext";
import { module01 } from "../../data/module01";
import { be001, LESSON_CHECKLIST, SECTIONS } from "../../data/be001";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../data/sparkKnowledge";
import { getBe001TeacherScript } from "../../data/be001TeacherScripts";

const LABELS = {
  backToBe001: { en: "Back to BE-001", hi: "BE-001 पर वापस" },
  backToModule: { en: "Back to Module", hi: "मॉड्यूल पर वापस" },
  section: { en: "Section", hi: "खंड" },
  lessonComplete: { en: "Lesson Complete!", hi: "पाठ पूरा हुआ!" },
  completed: { en: "completed.", hi: "पूरा हुआ।" },
  rewardEarned: { en: "Reward earned", hi: "इनाम मिला" },
  badgeProgress: { en: "Badge progress", hi: "बैज प्रगति" },
  nextUnlocked: { en: "Next unlocked:", hi: "अगला अनलॉक हुआ:" },
  continueToBe002: { en: "Continue to BE-002", hi: "BE-002 जारी रखें" },
  reviewLesson: { en: "Review Lesson", hi: "पाठ दोहराएँ" },
  lessonProgress: { en: "Lesson Progress", hi: "पाठ प्रगति" },
  sections: { en: "Sections", hi: "खंड" },
  youCompleted: { en: "You have completed this lesson. Review any section anytime.", hi: "आपने यह पाठ पूरा कर लिया है। किसी भी खंड को कभी भी दोहरा सकते हैं।" },
  intro: { en: "Let's understand why this lesson is important and what you will achieve in this lesson.", hi: "आइए समझते हैं कि यह पाठ क्यों महत्वपूर्ण है और आप इसमें क्या सीखेंगे।" },
  reviewSection: { en: "Review Section", hi: "खंड दोहराएँ" },
  startSection: { en: "Start Section", hi: "खंड शुरू करें" },
  continueSection: { en: "Continue Section", hi: "खंड जारी रखें" },
  completePrevious: { en: "Complete the previous section first.", hi: "पहले पिछला खंड पूरा करें।" },
  markCompleteFirst: { en: "Mark this section complete before moving to the next section.", hi: "अगले खंड पर जाने से पहले इस खंड को पूरा चिह्नित करें।" },
  sparkPrompt: { en: "Explain Section", hi: "खंड समझाइए" },
  simpleWords: { en: "in simple words.", hi: "सरल भाषा में।" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

export default function LessonPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const showToast = useToast();
  const {
    progress,
    completeSection,
    completeLesson,
    recordLessonRoute,
    isLessonComplete,
  } = useProgress();
  const [showCompletion, setShowCompletion] = useState(false);
  const [optimisticCompletedSections, setOptimisticCompletedSections] = useState([]);
  const completedSectionsRef = useRef([]);
  const { openSpark } = useSpark();
  const isHindi = i18n.language?.startsWith("hi");
  const pickLang = (value, fallback = "") => {
    if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
    return value || fallback;
  };
  const label = (key) => pickLang(LABELS[key], key);

  const activeSection = sectionId ? SECTIONS.find((s) => s.id === sectionId) : null;
  const previousSection = activeSection && activeSection.order > 1 ? SECTIONS[activeSection.order - 2] : null;
  const storedCompletedSections = progress[be001.id]?.completedSections || [];
  const completedSectionOrders = Array.from(new Set([...storedCompletedSections, ...optimisticCompletedSections]));
  completedSectionsRef.current = completedSectionOrders;
  const isSectionCompleteNow = (order) => completedSectionOrders.includes(order);
  const isSectionCompleteLive = (order) => completedSectionsRef.current.includes(order);
  const isSectionUnlockedNow = (order) => order === 1 || isSectionCompleteNow(order - 1);
  const completedCount = SECTIONS.filter((s) => isSectionCompleteNow(s.order)).length;
  const percent = Math.round((completedCount / SECTIONS.length) * 100);
  const lessonDone = isLessonComplete(be001.id);
  const nextSection = SECTIONS.find((s) => !isSectionCompleteNow(s.order)) || SECTIONS[SECTIONS.length - 1];

  useEffect(() => {
    if (activeSection) {
      recordLessonRoute(be001.id, {
        moduleId: module01.id,
        lessonId: be001.id,
        sectionId: activeSection.id,
        route: `/learn/BE-001/section/${activeSection.id}`,
      });
      return;
    }

    recordLessonRoute(be001.id, {
      moduleId: module01.id,
      lessonId: be001.id,
      sectionId: "",
      route: "/learn/BE-001",
    });
  }, [activeSection, recordLessonRoute]);

  useEffect(() => {
    setOptimisticCompletedSections(storedCompletedSections);
  }, [storedCompletedSections.join(",")]);

  useEffect(() => {
    if (!sectionId) return;
    if (!activeSection) {
      navigate("/learn/BE-001", { replace: true });
      return;
    }
    if (!isSectionUnlockedNow(activeSection.order)) {
      showToast(label("completePrevious"));
      navigate("/learn/BE-001", { replace: true });
    }
  }, [activeSection, completedSectionOrders.join(","), navigate, sectionId, showToast]);

  function openSection(section) {
    if (!isSectionUnlockedNow(section.order)) {
      showToast(label("completePrevious"));
      return;
    }
    navigate(`/learn/BE-001/section/${section.id}`);
  }

  function handleContinueSection() {
    if (!activeSection) return;
    const isCurrentComplete = isSectionCompleteLive(activeSection.order);

    if (!isCurrentComplete) {
      setOptimisticCompletedSections((prev) =>
        prev.includes(activeSection.order) ? prev : [...prev, activeSection.order]
      );
      completedSectionsRef.current = Array.from(new Set([...completedSectionsRef.current, activeSection.order]));
      completeSection(be001.id, activeSection.order);
    }

    if (activeSection.order === SECTIONS.length) {
      completeLesson(be001.id, be001.xp, "/learn/BE-002", {
        moduleId: module01.id,
        lessonId: be001.id,
        sectionId: activeSection.id,
      });
      setShowCompletion(true);
      return;
    }
    const followingSection = SECTIONS[activeSection.order];
    navigate(`/learn/BE-001/section/${followingSection.id}`);
  }

  function launchSpark(source = "lesson", section = activeSection, extra = {}) {
    const sectionKnowledge = section?.id ? SPARK_KNOWLEDGE.sections[section.id] : null;
    const knowledge = mergeKnowledgeBuckets(
      SPARK_KNOWLEDGE.module01,
      SPARK_KNOWLEDGE.be001,
      sectionKnowledge
    );
    openSpark({
      source,
      moduleId: module01.id,
      moduleTitle: module01.title,
      lessonId: be001.id,
      lessonTitle: be001.title,
      sectionId: section?.id,
      sectionTitle: section?.title || be001.title,
      textSummary: section?.paragraphs || label("intro"),
      imageCaption: section?.caption,
      keyPoints: section?.keyPoints,
      miniCheck: section?.miniCheck,
      teacherScript: getBe001TeacherScript(section?.id || "section-01", isHindi),
      knowledge,
      ...extra,
    });
  }

  const completionModal = (
    <Modal open={showCompletion} onClose={() => setShowCompletion(false)} title={label("lessonComplete")}>
      <div className="lp-completion">
        <p>{be001.id} {pickLang(be001.title)} {label("completed")}</p>
        <div className="lp-completion-rewards">
          <div>
            <strong>+{be001.xp} XP</strong>
            <span>{label("rewardEarned")}</span>
          </div>
          <div>
            <strong>{pickLang(be001.badge)}</strong>
            <span>{label("badgeProgress")}</span>
          </div>
        </div>
        <p className="lp-completion-next">
          {label("nextUnlocked")} <strong>{be001.nextLesson.id} {pickLang(be001.nextLesson.title)}</strong>
        </p>
        <div className="lp-completion-actions">
          <button
            className="lp-primary-action"
            onClick={() => {
              setShowCompletion(false);
              navigate("/learn/BE-002");
            }}
          >
            <PartyPopper size={16} /> {label("continueToBe002")}
          </button>
          <button className="lp-secondary-action" onClick={() => { setShowCompletion(false); navigate("/modules/module-01"); }}>
            {label("backToModule")}
          </button>
          <button className="lp-secondary-action" onClick={() => setShowCompletion(false)}>
            {label("reviewLesson")}
          </button>
        </div>
      </div>
    </Modal>
  );

  if (activeSection) {
    return (
      <div className="lesson-page lp-player-page">
        <div className="lp-player-shell">
          <div className="lp-player-topbar">
            <button onClick={() => navigate("/learn/BE-001")}>
              <ArrowLeft size={16} /> {label("backToBe001")}
            </button>
            <div>
              <strong>{label("section")} {activeSection.order} / {SECTIONS.length}</strong>
              <span>{be001.id} {pickLang(be001.title)}</span>
            </div>
            <button aria-label="Close section" onClick={() => navigate("/learn/BE-001")}>
              <X size={16} />
            </button>
          </div>

          <SectionPlayer
            key={activeSection.id}
            section={activeSection}
            total={SECTIONS.length}
            isComplete={isSectionCompleteNow(activeSection.order)}
            onPrimaryAction={handleContinueSection}
            onPrevious={previousSection ? () => openSection(previousSection) : undefined}
            onAskSpark={(extra) => launchSpark("section", activeSection, extra)}
          />
        </div>
        {completionModal}
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <ModuleTopBar />

      <div className="lp-body">
        <LessonSidebar
          module={module01}
          currentLessonId={be001.id}
        />

        <main className="lp-main">
          <button className="lp-back" onClick={() => navigate("/modules/module-01")}>
            <ArrowLeft size={16} /> {label("backToModule")}
          </button>

          <div className="lp-header">
            <div className="lp-header-top">
              <span className="lp-chip">{be001.id}</span>
              <div>
                <h1>{pickLang(be001.title)}</h1>
                <p className="lp-hindi">{be001.id}</p>
              </div>
            </div>

            <div className="lp-meta">
              <span>{be001.durationMinutes} min</span>
              <span>{be001.xp} XP</span>
              <span className="lp-meta-difficulty">{pickLang(be001.difficulty)}</span>
              <span>{pickLang(be001.badge)}</span>
            </div>

            <div className="lp-progress">
              <div className="lp-progress-labels">
                <span>{label("lessonProgress")}</span>
                <span>{completedCount} / {SECTIONS.length} {label("sections")} - {percent}%</span>
              </div>
              <div className="lp-progress-bar">
                <div style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>

          <div className="lp-hero">
          <div className="lp-hero-overlay">
            <small>{label("section")} {nextSection.order} / {SECTIONS.length}</small>
            <h2>{pickLang(nextSection.title)}</h2>
            <p>
              {lessonDone
                ? label("youCompleted")
                : label("intro")}
            </p>
            <button className="lp-start-btn" onClick={() => openSection(nextSection)}>
              <Play size={16} fill="currentColor" />
              {lessonDone ? label("reviewSection") : completedCount > 0 ? label("continueSection") : label("startSection")}
            </button>
          </div>
        </div>

          <div className="lp-section-grid">
            {SECTIONS.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                unlocked={isSectionUnlockedNow(section.order)}
                complete={isSectionCompleteNow(section.order)}
                started={completedCount > 0}
                onClick={() => openSection(section)}
              />
            ))}
          </div>
        </main>

        <LessonRightSidebar
          lesson={be001}
          checklist={LESSON_CHECKLIST}
          completedCount={completedCount}
        />
      </div>

      {completionModal}
      <BottomNav />
    </div>
  );
}
