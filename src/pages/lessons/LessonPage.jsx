import "./LessonPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, PartyPopper } from "lucide-react";
import ModuleTopBar from "../../components/module-detail/ModuleTopBar/ModuleTopBar";
import LessonSidebar from "../../components/lesson/LessonSidebar/LessonSidebar";
import LessonRightSidebar from "../../components/lesson/LessonRightSidebar/LessonRightSidebar";
import SectionCard from "../../components/lesson/SectionCard/SectionCard";
import SectionPlayer from "../../components/lesson/SectionPlayer/SectionPlayer";
import Modal from "../../components/shared/Modal/Modal";
import { useToast } from "../../context/ToastContext";
import { useProgress } from "../../context/ProgressContext";
import { module01 } from "../../data/module01";
import { be001, SECTIONS, LESSON_CHECKLIST } from "../../data/be001";

export default function LessonPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const {
    isSectionUnlocked,
    isSectionComplete,
    completeSection,
    completeLesson,
    isLessonComplete,
  } = useProgress();
  const [activeSection, setActiveSection] = useState(null);
  const [showCompletion, setShowCompletion] = useState(false);

  const completedCount = SECTIONS.filter((s) => isSectionComplete(be001.id, s.order)).length;
  const percent = Math.round((completedCount / SECTIONS.length) * 100);
  const lessonDone = isLessonComplete(be001.id);
  const nextSection = SECTIONS.find((s) => !isSectionComplete(be001.id, s.order)) || SECTIONS[SECTIONS.length - 1];

  function openSection(section) {
    if (!isSectionUnlocked(be001.id, section.order)) {
      showToast("Complete the previous section first.");
      return;
    }
    setActiveSection(section);
  }

  function handleMarkComplete() {
    completeSection(be001.id, activeSection.order);
  }

  function handleNext() {
    if (!isSectionComplete(be001.id, activeSection.order)) {
      showToast("Mark this section complete before moving to the next section.");
      return;
    }
    if (activeSection.order === SECTIONS.length) {
      completeLesson(be001.id, be001.xp);
      setActiveSection(null);
      setShowCompletion(true);
      return;
    }
    setActiveSection(SECTIONS[activeSection.order]);
  }

  return (
    <div className="lesson-page">
      <ModuleTopBar />

      <div className="lp-body">
        <LessonSidebar
          module={module01}
          currentLessonId={be001.id}
          onHelp={() => showToast("Spark AI panel coming soon.", "info")}
        />

        <main className="lp-main">
          <button className="lp-back" onClick={() => navigate("/modules/module-01")}>
            <ArrowLeft size={16} /> Back to Module
          </button>

          <div className="lp-header">
            <div className="lp-header-top">
              <span className="lp-chip">{be001.id}</span>
              <div>
                <h1>{be001.title}</h1>
                <p className="lp-hindi">{be001.hindiTitle}</p>
              </div>
            </div>

            <div className="lp-meta">
              <span>{be001.durationMinutes} min</span>
              <span>{be001.xp} XP</span>
              <span className="lp-meta-difficulty">{be001.difficulty}</span>
              <span>{be001.badge}</span>
            </div>

            <div className="lp-progress">
              <div className="lp-progress-labels">
                <span>Lesson Progress</span>
                <span>
                  {completedCount} / {SECTIONS.length} Sections &bull; {percent}%
                </span>
              </div>
              <div className="lp-progress-bar">
                <div style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>

          <div className="lp-hero">
            <div className="lp-hero-overlay">
              <small>
                Section {nextSection.order} of {SECTIONS.length}
              </small>
              <h2>{nextSection.title}</h2>
              <p>
                {lessonDone
                  ? "You've completed this lesson. Review any section anytime."
                  : "Let's understand why this lesson is important and what you will achieve in this lesson."}
              </p>
              <button className="lp-start-btn" onClick={() => openSection(nextSection)}>
                <Play size={16} fill="currentColor" /> {lessonDone ? "Review Section" : "Start Section"}
              </button>
            </div>
          </div>

          <div className="lp-section-grid">
            {SECTIONS.map((s) => (
              <SectionCard
                key={s.id}
                section={s}
                unlocked={isSectionUnlocked(be001.id, s.order)}
                complete={isSectionComplete(be001.id, s.order)}
                onClick={() => openSection(s)}
              />
            ))}
          </div>
        </main>

        <LessonRightSidebar lesson={be001} checklist={LESSON_CHECKLIST} completedCount={completedCount} />
      </div>

      <Modal
        open={Boolean(activeSection)}
        onClose={() => setActiveSection(null)}
        title={activeSection ? `${be001.id} · Section ${activeSection.order} of ${SECTIONS.length} · ${activeSection.title}` : ""}
      >
        {activeSection && (
          <SectionPlayer
            key={activeSection.id}
            section={activeSection}
            total={SECTIONS.length}
            isComplete={isSectionComplete(be001.id, activeSection.order)}
            onMarkComplete={handleMarkComplete}
            onNext={handleNext}
            onAskSpark={() => showToast(`Explain Section ${activeSection.order}: ${activeSection.title} in simple words.`, "info")}
          />
        )}
      </Modal>

      <Modal open={showCompletion} onClose={() => setShowCompletion(false)} title="🎉 Lesson Complete!">
        <div className="lp-completion">
          <p>{be001.id} {be001.title} completed.</p>
          <div className="lp-completion-rewards">
            <div>
              <strong>+{be001.xp} XP</strong>
              <span>Reward earned</span>
            </div>
            <div>
              <strong>{be001.badge}</strong>
              <span>Badge progress</span>
            </div>
          </div>
          <p className="lp-completion-next">
            Next unlocked: <strong>{be001.nextLesson.id} {be001.nextLesson.title}</strong>
          </p>
          <div className="lp-completion-actions">
            <button
              className="lp-primary-action"
              onClick={() => {
                showToast("BE-002 content is coming soon!", "info");
                setShowCompletion(false);
                navigate("/modules/module-01");
              }}
            >
              <PartyPopper size={16} /> Continue to BE-002
            </button>
            <button className="lp-secondary-action" onClick={() => { setShowCompletion(false); navigate("/modules/module-01"); }}>
              Back to Module
            </button>
            <button className="lp-secondary-action" onClick={() => setShowCompletion(false)}>
              Review Lesson
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
