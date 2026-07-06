/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { loadProgressRows, upsertProgressRows } from "../services/supabaseClient";
import { SECTIONS } from "../data/be001";

const LEGACY_STORAGE_KEY = "eb-progress";
const STORAGE_PREFIX = "eb-progress";
const ProgressContext = createContext(null);
const VALID_BE001_SECTIONS = new Set(SECTIONS.map((section) => section.id));

function getUserStorageKey(userId) {
  return userId ? `${STORAGE_PREFIX}:${String(userId).trim().toLowerCase()}` : null;
}

function readStorage(key) {
  if (!key) return {};
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeStorage(key, progress) {
  if (!key) return false;
  try {
    localStorage.setItem(key, JSON.stringify(progress || {}));
    return true;
  } catch {
    return false;
  }
}

function migrateLegacyProgress(userId) {
  const userKey = getUserStorageKey(userId);
  if (!userKey || localStorage.getItem(userKey)) return;
  const legacy = readStorage(LEGACY_STORAGE_KEY);
  if (Object.keys(legacy).length) {
    writeStorage(userKey, normalizeProgress(legacy));
  }
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function getCompletedLessons(progress) {
  return Object.values(progress || {}).filter((lesson) => lesson?.lessonComplete).length;
}

function normalizeEntry(lessonId, entry = {}, completedLessons = 0) {
  const xp = Number(entry.xp ?? entry.xpEarned ?? 0);
  return {
    moduleId: entry.moduleId || "module-01",
    lessonId: entry.lessonId || lessonId,
    sectionId: entry.sectionId || "",
    route: entry.route || "",
    completedSections: toArray(entry.completedSections),
    completedLessons: Number(entry.completedLessons || completedLessons || 0),
    xp,
    xpEarned: xp,
    lessonComplete: Boolean(entry.lessonComplete),
    updatedAt: entry.updatedAt || new Date().toISOString(),
  };
}

function normalizeProgress(progress = {}) {
  const completedLessons = getCompletedLessons(progress);
  return Object.entries(progress || {}).reduce((acc, [lessonId, entry]) => {
    if (!lessonId || !entry) return acc;
    acc[lessonId] = normalizeEntry(lessonId, entry, completedLessons);
    return acc;
  }, {});
}

function rowsToProgress(rows = []) {
  const progress = rows.reduce((acc, row) => {
    if (!row?.lesson_id && !row?.lessonId) return acc;
    const lessonId = row.lesson_id || row.lessonId;
    acc[lessonId] = normalizeEntry(lessonId, {
      moduleId: row.module_id || row.moduleId,
      lessonId,
      sectionId: row.section_id || row.sectionId,
      route: row.route,
      completedSections: row.completed_sections || row.completedSections,
      completedLessons: row.completed_lessons || row.completedLessons,
      xp: row.xp ?? row.xpEarned,
      lessonComplete: row.lesson_complete ?? row.lessonComplete,
      updatedAt: row.updated_at || row.updatedAt,
    });
    return acc;
  }, {});

  return normalizeProgress(progress);
}

function progressToRows(progress, userId) {
  if (!userId) return [];
  const normalized = normalizeProgress(progress);
  const completedLessons = getCompletedLessons(normalized);

  return Object.values(normalized).map((lesson) => ({
    user_id: userId,
    module_id: lesson.moduleId || "module-01",
    lesson_id: lesson.lessonId,
    section_id: lesson.sectionId || "",
    route: getValidResumeRoute(lesson) || "",
    completed_sections: lesson.completedSections || [],
    completed_lessons: completedLessons,
    xp: lesson.xp ?? lesson.xpEarned ?? 0,
    lesson_complete: Boolean(lesson.lessonComplete),
    updated_at: lesson.updatedAt || new Date().toISOString(),
  }));
}

function getValidResumeRoute(entry) {
  if (!entry) return "";
  if (entry.lessonId === "BE-001") {
    if (entry.sectionId && VALID_BE001_SECTIONS.has(entry.sectionId)) {
      return `/learn/BE-001/section/${entry.sectionId}`;
    }
    if (entry.route === "/learn/BE-001") return entry.route;
    return "/learn/BE-001";
  }
  if (entry.lessonId === "BE-002") return "/learn/BE-002";
  if (entry.route?.startsWith("/modules/")) return entry.route;
  return "";
}

function updateCompletedLessonCounts(progress) {
  const completedLessons = getCompletedLessons(progress);
  return Object.entries(progress).reduce((acc, [lessonId, entry]) => {
    acc[lessonId] = normalizeEntry(lessonId, { ...entry, completedLessons }, completedLessons);
    return acc;
  }, {});
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
    current.completedLessons === next.completedLessons &&
    current.lessonComplete === next.lessonComplete &&
    current.xp === next.xp;

  if (same) return prev;
  return updateCompletedLessonCounts({ ...prev, [lessonId]: next });
}

function getLatestEntry(progress) {
  return Object.values(progress || {})
    .filter(Boolean)
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))[0];
}

function getDefaultResumeRoute(progress) {
  const latest = getLatestEntry(progress);
  if (!latest) return "/modules/module-01";
  if (latest.lessonId === "BE-001" && latest.lessonComplete) return "/learn/BE-002";
  return getValidResumeRoute(latest) || "/modules/module-01";
}

function mergeProgress(localProgress, remoteProgress) {
  const merged = { ...normalizeProgress(localProgress) };
  Object.entries(normalizeProgress(remoteProgress)).forEach(([lessonId, remoteEntry]) => {
    const localEntry = merged[lessonId];
    if (!localEntry || new Date(remoteEntry.updatedAt || 0) > new Date(localEntry.updatedAt || 0)) {
      merged[lessonId] = remoteEntry;
    }
  });
  return updateCompletedLessonCounts(merged);
}

export function ProgressProvider({ children }) {
  const { user, ready } = useAuth();
  const userId = user?.userId || "";
  const [progress, setProgress] = useState(() => normalizeProgress(readStorage(getUserStorageKey(userId))));
  const [syncState, setSyncState] = useState(() => (navigator.onLine ? "synced" : "offline"));
  const [remoteReadyForUser, setRemoteReadyForUser] = useState(null);
  const storageKey = useMemo(() => getUserStorageKey(userId), [userId]);
  const syncInFlightRef = useRef(false);

  useEffect(() => {
    function updateOnlineState() {
      setSyncState((current) => {
        if (!navigator.onLine) return "offline";
        return current === "offline" ? "pending" : current;
      });
    }

    window.addEventListener("online", updateOnlineState);
    window.addEventListener("offline", updateOnlineState);
    updateOnlineState();

    return () => {
      window.removeEventListener("online", updateOnlineState);
      window.removeEventListener("offline", updateOnlineState);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!userId || !storageKey) {
      window.setTimeout(() => {
        setProgress({});
        setRemoteReadyForUser(null);
        setSyncState(navigator.onLine ? "synced" : "offline");
      }, 0);
      return;
    }

    migrateLegacyProgress(userId);
    window.setTimeout(() => {
      setProgress(normalizeProgress(readStorage(storageKey)));
      setRemoteReadyForUser(null);
      setSyncState(navigator.onLine ? "pending" : "offline");
    }, 0);
  }, [ready, storageKey, userId]);

  useEffect(() => {
    if (!ready || !userId || !storageKey) return;
    writeStorage(storageKey, normalizeProgress(progress));
  }, [progress, ready, storageKey, userId]);

  useEffect(() => {
    if (!ready || !userId || !storageKey) return;

    let cancelled = false;

    async function hydrateFromSupabase() {
      if (!navigator.onLine) {
        setRemoteReadyForUser(userId);
        setSyncState("offline");
        return;
      }

      try {
        const rows = await loadProgressRows(userId);
        if (cancelled) return;

        if (Array.isArray(rows) && rows.length) {
          setProgress((current) => mergeProgress(current, rowsToProgress(rows)));
        }
        setSyncState("pending");
      } catch {
        if (!cancelled) setSyncState("failed");
      } finally {
        if (!cancelled) setRemoteReadyForUser(userId);
      }
    }

    hydrateFromSupabase();
    return () => {
      cancelled = true;
    };
  }, [ready, storageKey, userId]);

  useEffect(() => {
    if (!ready || !remoteReadyForUser || !userId || syncInFlightRef.current) return;

    const rows = progressToRows(progress, userId);
    if (!rows.length) {
      window.setTimeout(() => setSyncState(navigator.onLine ? "synced" : "offline"), 0);
      return;
    }

    if (!navigator.onLine) {
      window.setTimeout(() => setSyncState("offline"), 0);
      return;
    }

    let cancelled = false;

    async function sync() {
      syncInFlightRef.current = true;
      setSyncState("pending");
      try {
        await upsertProgressRows(rows);
        if (!cancelled) setSyncState("synced");
      } catch {
        if (!cancelled) setSyncState("failed");
      } finally {
        if (!cancelled) syncInFlightRef.current = false;
      }
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, [progress, ready, remoteReadyForUser, userId]);

  const completeSection = useCallback((lessonId, sectionOrder, patch = {}) => {
    setProgress((prev) =>
      updateEntry(prev, lessonId, (current) => {
        const completedSections = Array.from(new Set([...(current.completedSections || []), sectionOrder]));
        return {
          ...current,
          ...patch,
          completedSections,
          lessonId,
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
        xp,
        xpEarned: xp,
        route,
      }))
    );
  }, []);

  const recordLessonRoute = useCallback((lessonId, patch = {}) => {
    setProgress((prev) =>
      updateEntry(prev, lessonId, (current) => ({
        ...current,
        ...patch,
      }))
    );
  }, []);

  const saveProgressNow = useCallback(async () => {
    const normalized = normalizeProgress(progress);
    writeStorage(storageKey, normalized);
    if (!userId || !navigator.onLine) {
      setSyncState("offline");
      return false;
    }

    setSyncState("pending");
    try {
      await upsertProgressRows(progressToRows(normalized, userId));
      setSyncState("synced");
      return true;
    } catch {
      setSyncState("failed");
      return false;
    }
  }, [progress, storageKey, userId]);

  const isLessonComplete = useCallback((lessonId) => Boolean(progress[lessonId]?.lessonComplete), [progress]);

  const isLessonUnlocked = useCallback(
    (lessonId, previousLessonId) => !previousLessonId || isLessonComplete(previousLessonId),
    [isLessonComplete]
  );

  const getLessonXpEarned = useCallback(
    (lessonId) => progress[lessonId]?.xp ?? progress[lessonId]?.xpEarned ?? 0,
    [progress]
  );

  const getResumeRoute = useCallback(() => getDefaultResumeRoute(progress), [progress]);

  const value = useMemo(
    () => ({
      progress,
      syncState,
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
      syncState,
    ]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
