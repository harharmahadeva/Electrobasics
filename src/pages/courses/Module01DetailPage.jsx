import "./Module01DetailPage.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, RotateCw, Wrench, Shield, LayoutGrid, Zap, Info, Lock, Star, Clock } from "lucide-react";
import ModuleTopBar from "../../components/module-detail/ModuleTopBar/ModuleTopBar";
import ModuleSidebar from "../../components/module-detail/ModuleSidebar/ModuleSidebar";
import RightWidgets from "../../components/module-detail/RightWidgets/RightWidgets";
import LessonRow from "../../components/module-detail/LessonRow/LessonRow";
import { useProgress } from "../../context/ProgressContext";
import { useToast } from "../../context/ToastContext";
import { module01 } from "../../data/module01";

const LEARN_ICONS = { Shield, Wrench, LayoutGrid, Zap };

export default function Module01DetailPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { isLessonComplete, getLessonXpEarned } = useProgress();
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

  function handleStartLesson(lesson) {
    if (lesson.id === "BE-001") {
      navigate("/learn/BE-001");
    } else {
      showToast(`${lesson.id} content is coming soon!`, "info");
    }
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
                <button className="m01-primary-btn" onClick={() => navigate("/learn/BE-001")}>
                  <Play size={16} fill="currentColor" /> {primaryLabel}
                </button>
                <button className="m01-secondary-btn" onClick={() => navigate("/learn/BE-001")}>
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

          <div className="m01-unlock-banner">
            <Lock size={16} />
            Complete all lessons in this module to unlock <strong>{m.nextModule}</strong>
          </div>
        </main>

        <RightWidgets module={moduleWithProgress} />
      </div>
    </div>
  );
}
