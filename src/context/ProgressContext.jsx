import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "eb-progress";
const ProgressContext = createContext(null);

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeSection = useCallback((lessonId, sectionOrder) => {
    setProgress((prev) => {
      const lesson = prev[lessonId] || { completedSections: [] };
      if (lesson.completedSections.includes(sectionOrder)) return prev;
      return {
        ...prev,
        [lessonId]: {
          ...lesson,
          completedSections: [...lesson.completedSections, sectionOrder],
        },
      };
    });
  }, []);

  const isSectionComplete = useCallback(
    (lessonId, sectionOrder) =>
      Boolean(progress[lessonId]?.completedSections?.includes(sectionOrder)),
    [progress]
  );

  const isSectionUnlocked = useCallback(
    (lessonId, sectionOrder) =>
      sectionOrder === 1 || Boolean(progress[lessonId]?.completedSections?.includes(sectionOrder - 1)),
    [progress]
  );

  const completeLesson = useCallback((lessonId, xp) => {
    setProgress((prev) => {
      const lesson = prev[lessonId] || { completedSections: [] };
      if (lesson.lessonComplete) return prev;
      return {
        ...prev,
        [lessonId]: { ...lesson, lessonComplete: true, xpEarned: xp },
      };
    });
  }, []);

  const isLessonComplete = useCallback(
    (lessonId) => Boolean(progress[lessonId]?.lessonComplete),
    [progress]
  );

  const isLessonUnlocked = useCallback(
    (lessonId, previousLessonId) => !previousLessonId || isLessonComplete(previousLessonId),
    [isLessonComplete]
  );

  const getLessonXpEarned = useCallback(
    (lessonId) => progress[lessonId]?.xpEarned || 0,
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeSection,
        isSectionComplete,
        isSectionUnlocked,
        completeLesson,
        isLessonComplete,
        isLessonUnlocked,
        getLessonXpEarned,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
