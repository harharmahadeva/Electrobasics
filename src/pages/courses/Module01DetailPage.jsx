import "./Module01DetailPage.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, RotateCw, Wrench, Shield, LayoutGrid, Zap, Info, Lock, Star, Clock } from "lucide-react";
import { useState } from "react";
import ModuleTopBar from "../../components/module-detail/ModuleTopBar/ModuleTopBar";
import ModuleSidebar from "../../components/module-detail/ModuleSidebar/ModuleSidebar";
import RightWidgets from "../../components/module-detail/RightWidgets/RightWidgets";
import LessonRow from "../../components/module-detail/LessonRow/LessonRow";
import SparkDoubtBubble from "../../components/spark/SparkDoubtBubble";
import Modal from "../../components/shared/Modal/Modal";
import BottomNav from "../../components/navigation/BottomNav";
import { useProgress } from "../../context/ProgressContext";
import { useToast } from "../../context/ToastContext";
import { useSpark } from "../../context/SparkContext";
import { module01 } from "../../data/module01";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../data/sparkKnowledge";

const LEARN_ICONS = { Shield, Wrench, LayoutGrid, Zap };

export default function Module01DetailPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { isLessonComplete, getLessonXpEarned } = useProgress();
  const [activeModal, setActiveModal] = useState(null);
  const { openSpark } = useSpark();
  const m = module01;

  const lessonsWithStatus = m.lessons.map((lesson, i) => {
    const complete = isLessonComplete(lesson.id);
    const prevComplete = i === 0 || isLessonComplete(m.lessons[i - 1].id);
    return { ...lesson, complete, status: complete ? "complete" : prevComplete ? "available" : "locked" };
  });

  const completedLessons = lessonsWithStatus.filter((l) => l.complete).length;
  const xpEarned = m.lessons.reduce((sum, l) => sum + getLessonXpEarned(l.id), 0);
  const percent = Math.round((completedLessons / m.lessonCount) * 100);
  const moduleWithProgress = {
    ...m,
    progress: { completedLessons, totalLessons: m.lessonCount, percent, xpEarned },
  };

  const hasProgress = completedLessons > 0;
  const allComplete = completedLessons === m.lessonCount;
  const primaryLabel = allComplete ? "Review Module" : hasProgress ? "Continue Module" : "Start Module";
  const nextIncompleteLesson = lessonsWithStatus.find((lesson) => !lesson.complete);

  function routeForLesson(lesson) {
    return lesson.id === "BE-001" ? "/learn/BE-001" : `/learn/${lesson.id}`;
  }

  function handleStartModule() {
    if (allComplete) {
      navigate("/modules/module-01/review");
      return;
    }
    navigate(routeForLesson(nextIncompleteLesson || lessonsWithStatus[0]));
  }

  function handleStartLesson(lesson) {
    if (lesson.status === "locked") {
      showToast(`${lesson.unlockRequirement} first to unlock this lesson.`);
      return;
    }
    navigate(routeForLesson(lesson));
  }

  function handleUnlockBanner() {
    if (!allComplete) {
      showToast("Complete all 4 lessons in Module 01 to unlock Module 02.");
      return;
    }
    navigate("/modules/module-02");
  }

  function launchSpark(source = "module", extra = {}) {
    const knowledge = mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001);
    openSpark({
      source,
      moduleId: m.id,
      moduleTitle: m.title,
      lessonId: "BE-001",
      lessonTitle: "Welcome to ElectroBasics",
      sectionTitle: m.title,
      textSummary: m.overview,
      imageCaption: source === "image" ? m.description : m.sparkMessage,
      teacherScript: m.sparkMessage || m.overview || m.description,
      knowledge,
      ...extra,
    });
  }

  return (
    <div className="module01-page">
      <ModuleTopBar />

      <div className="m01-body">
        <ModuleSidebar active="All Modules" />

        <main className="m01-main">
          <button className="m01-back" onClick={() => navigate("/modules")}>
            <ArrowLeft size={16} /> Back to All Modules
          </button>

          <div className="m01-hero">
            <div className="m01-hero-left">
              <div className="m01-hero-top">
                <div className="m01-hero-icon">
                  <Wrench size={44} />
                </div>
                <span className="m01-number">{m.number}</span>
                <div>
                  <h1>{m.title}</h1>
                  <p className="m01-hindi">{m.hindiTitle}</p>
                </div>
              </div>

              <div className="m01-badges">
                <span className="m01-badge badge-blue">{m.lessonCount} Lessons</span>
                <span className="m01-badge badge-green">{m.difficulty}</span>
                <span className="m01-badge badge-purple">{m.category}</span>
                <span className="m01-estimate">
                  <Clock size={14} /> {m.estimatedMinutes} min (Est.)
                </span>
              </div>

              <p className="m01-description">{m.description}</p>

              <div className="m01-actions">
                <button className="m01-primary-btn" onClick={handleStartModule}>
                  <Play size={16} fill="currentColor" /> {primaryLabel}
                </button>
                <button className="m01-secondary-btn" onClick={handleStartModule}>
                  <RotateCw size={15} />
                  <span>
                    Continue Module
                    <small>Resume from last lesson</small>
                  </span>
                </button>
              </div>
            </div>

            <div className="m01-hero-image" />
          </div>

          <div className="m01-info-row">
            <div className="m01-info-card m01-overview-card">
              <div className="m01-overview-text">
                <div className="m01-info-title info-cyan">
                  <Info size={16} /> MODULE OVERVIEW
                </div>
                <p>{m.overview}</p>
              </div>
              <div className="m01-overview-thumb" />
            </div>

            <div className="m01-info-card">
              <div className="m01-info-title info-purple">
                <Star size={16} /> WHAT YOU'LL LEARN
              </div>
              <ul className="m01-learn-list">
                {m.whatYoullLearn.map((item) => {
                  const Icon = LEARN_ICONS[item.icon];
                  return (
                    <li key={item.text}>
                      <Icon size={15} />
                      {item.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="m01-lessons-card">
            <h2>Lessons in This Module</h2>
            <div className="m01-lessons-list">
              {lessonsWithStatus.map((lesson) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  onStart={() => handleStartLesson(lesson)}
                />
              ))}
            </div>
          </div>

          <button className="m01-unlock-banner" onClick={handleUnlockBanner}>
            <Lock size={16} />
            Complete all lessons in this module to unlock <strong>{m.nextModule}</strong>
          </button>
        </main>

        <RightWidgets
          module={moduleWithProgress}
          onProgress={() => setActiveModal("progress")}
          onReward={() => setActiveModal("reward")}
        />
      </div>

      <SparkDoubtBubble onOpen={() => launchSpark("module")} />

      <Modal open={activeModal === "progress"} onClose={() => setActiveModal(null)} title="Module 01 Progress">
        <div className="m01-modal-list">
          <p>Completed: {completedLessons} / {m.lessonCount} Lessons</p>
          <p>XP: {xpEarned} / {m.totalXP} XP</p>
          {lessonsWithStatus.map((lesson) => (
            <div key={lesson.id}>
              <strong>{lesson.id}</strong>
              <span>{lesson.complete ? "Completed" : lesson.status === "available" ? "Available" : "Locked"}</span>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={activeModal === "reward"} onClose={() => setActiveModal(null)} title="Reward for Completion">
        <div className="m01-modal-list">
          <p>Complete all 4 lessons to earn:</p>
          <p><strong>Lab Beginner Badge</strong></p>
          <p><strong>+{m.rewardXP} XP</strong></p>
          {m.lessons.map((lesson) => (
            <div key={lesson.id}>
              <strong>{lesson.id}</strong>
              <span>{isLessonComplete(lesson.id) ? "Complete" : "Required"}</span>
            </div>
          ))}
        </div>
      </Modal>
      <BottomNav />
    </div>
  );
}
