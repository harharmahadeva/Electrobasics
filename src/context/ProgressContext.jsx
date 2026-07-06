import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { loadProgressRows, upsertProgressRows } from "../services/supabaseClient";

const STORAGE_KEY = "eb-progress";
const ProgressContext = createContext(null);

function loadLocalProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore quota / storage failures and keep app working.
  }
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeEntry(lessonId, entry = {}) {
  return {
    moduleId: entry.moduleId || "",
    lessonId: entry.lessonId || lessonId,
    sectionId: entry.sectionId || "",
    route: entry.route || "",
    completedSections: toArray(entry.completedSections),
    lessonComplete: Boolean(entry.lessonComplete),
    xpEarned: Number(entry.xpEarned || entry.xp || 0),
    completedLessons: Number(entry.completedLessons || 0),
    updatedAt: entry.updatedAt || new Date().toISOString(),
  };
}

function rowsToProgress(rows = []) {
  return rows.reduce((acc, row) => {
    if (!row?.lesson_id && !row?.lessonId) return acc;
    const lessonId = row.lesson_id || row.lessonId;
    acc[lessonId] = normalizeEntry(lessonId, {
      moduleId: row.module_id || row.moduleId,
      lessonId,
      sectionId: row.section_id || row.sectionId,
      route: row.route,
      completedSections: row.completed_sections || row.completedSections,
      lessonComplete: row.lesson_complete ?? row.lessonComplete,
      xpEarned: row.xp ?? row.xpEarned,
      completedLessons: row.completed_lessons || row.completedLessons,
      updatedAt: row.updated_at || row.updatedAt,
    });
    return acc;
  }, {});
}

function progressToRows(progress, userId) {
  const completedLessons = Object.values(progress).filter((lesson) => lesson.lessonComplete).length;

  return Object.values(progress).map((lesson) => ({
    user_id: userId,
    module_id: lesson.moduleId || "module-01",
    lesson_id: lesson.lessonId,
    section_id: lesson.sectionId || "",
    route: lesson.route || "",
    completed_sections: lesson.completedSections || [],
    completed_lessons: completedLessons,
    xp: lesson.xpEarned || 0,
    lesson_complete: Boolean(lesson.lessonComplete),
    updated_at: lesson.updatedAt || new Date().toISOString(),
  }));
}

function updateEntry(prev, lessonId, patch) {
  const current = prev[lessonId] || normalizeEntry(lessonId);
  const nextPatch = typeof patch === "function" ? patch(current) : patch;
  const next = normalizeEntry(lessonId, {
    ...current,
    ...nextPatch,
    updatedAt: new Date().toISOString(),
  });

  const same =
    JSON.stringify(current.completedSections) === JSON.stringify(next.completedSections) &&
    current.moduleId === next.moduleId &&
    current.sectionId === next.sectionId &&
    current.route === next.route &&
    current.lessonComplete === next.lessonComplete &&
    current.xpEarned === next.xpEarned;

  if (same) return prev;
  return { ...prev, [lessonId]: next };
}

function getLatestEntry(progress) {
  return Object.values(progress)
    .filter(Boolean)
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))[0];
}

function getDefaultResumeRoute(progress) {
  const latest = getLatestEntry(progress);
  if (!latest) return "/modules/module-01";
  if (latest.lessonId === "BE-001" && latest.lessonComplete) return "/learn/BE-002";
  return latest.route || "/modules/module-01";
}

export function ProgressProvider({ children }) {
  const { user, ready } = useAuth();
  const [progress, setProgress] = useState(() => loadLocalProgress());
  const [remoteReadyForUser, setRemoteReadyForUser] = useState(null);
  const hydratedRef = useRef(false);
  const syncInFlightRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    setProgress(loadLocalProgress());
  }, []);

  useEffect(() => {
    saveLocalProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!ready) return;

    let cancelled = false;

    async function hydrateFromSupabase() {
      if (!user?.userId) {
        setRemoteReadyForUser(null);
        return;
      }

      try {
        const rows = await loadProgressRows(user.userId);
        if (cancelled) return;

        if (Array.isArray(rows) && rows.length) {
          setProgress(rowsToProgress(rows));
        }
      } catch {
        // Keep local fallback when remote sync is unavailable.
      } finally {
        if (!cancelled) {
          setRemoteReadyForUser(user.userId);
        }
      }
    }

    hydrateFromSupabase();
    return () => {
      cancelled = true;
    };
  }, [ready, user?.userId]);

  useEffect(() => {
    if (!ready || !remoteReadyForUser || !user?.userId || syncInFlightRef.current) return;

    let cancelled = false;
    const rows = progressToRows(progress, user.userId);

    async function sync() {
      if (!rows.length) return;
      syncInFlightRef.current = true;
      try {
        await upsertProgressRows(rows);
      } catch {
        // Keep localStorage as fallback.
      } finally {
        if (!cancelled) {
          syncInFlightRef.current = false;
        }
      }
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, [progress, ready, remoteReadyForUser, user?.userId]);

  const completeSection = useCallback((lessonId, sectionOrder, patch = {}) => {
    setProgress((prev) =>
      updateEntry(prev, lessonId, (current) => {
        const completedSections = Array.from(new Set([...(current.completedSections || []), sectionOrder]));
        return {
          ...current,
          ...patch,
          completedSections,
          lessonId,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const isSectionComplete = useCallback(
    (lessonId, sectionOrder) => Boolean(progress[lessonId]?.completedSections?.includes(sectionOrder)),
    [progress]
  );

  const isSectionUnlocked = useCallback(
    (lessonId, sectionOrder) => sectionOrder === 1 || Boolean(progress[lessonId]?.completedSections?.includes(sectionOrder - 1)),
    [progress]
  );

  const completeLesson = useCallback((lessonId, xp, route = "/learn/BE-002", patch = {}) => {
    setProgress((prev) =>
      updateEntry(prev, lessonId, (current) => ({
        ...current,
        ...patch,
        lessonComplete: true,
        xpEarned: xp,
        route,
        updatedAt: new Date().toISOString(),
      }))
    );
  }, []);

  const recordLessonRoute = useCallback((lessonId, patch = {}) => {
    setProgress((prev) =>
      updateEntry(prev, lessonId, (current) => ({
        ...current,
        ...patch,
        updatedAt: new Date().toISOString(),
      }))
    );
  }, []);

  const saveProgressNow = useCallback(async () => {
    saveLocalProgress(progress);
    if (!user?.userId) return false;
    try {
      await upsertProgressRows(progressToRows(progress, user.userId));
      return true;
    } catch {
      return false;
    }
  }, [progress, user?.userId]);

  const isLessonComplete = useCallback((lessonId) => Boolean(progress[lessonId]?.lessonComplete), [progress]);

  const isLessonUnlocked = useCallback(
    (lessonId, previousLessonId) => !previousLessonId || isLessonComplete(previousLessonId),
    [isLessonComplete]
  );

  const getLessonXpEarned = useCallback((lessonId) => progress[lessonId]?.xpEarned || 0, [progress]);

  const getResumeRoute = useCallback(() => getDefaultResumeRoute(progress), [progress]);

  const value = useMemo(
    () => ({
      progress,
      completeSection,
      isSectionComplete,
      isSectionUnlocked,
      completeLesson,
      isLessonComplete,
      isLessonUnlocked,
      getLessonXpEarned,
      getResumeRoute,
      recordLessonRoute,
      saveProgressNow,
    }),
    [
      completeLesson,
      completeSection,
      getLessonXpEarned,
      getResumeRoute,
      isLessonComplete,
      isLessonUnlocked,
      isSectionComplete,
      isSectionUnlocked,
      progress,
      recordLessonRoute,
      saveProgressNow,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
