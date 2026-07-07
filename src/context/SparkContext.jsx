import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SparkPanel from "../components/spark/SparkPanel";
import SparkDoubtBubble from "../components/spark/SparkDoubtBubble";
import {
  buildSparkOpeningReply,
  buildSparkReply,
  normalizeSparkContext,
} from "../components/spark/sparkUtils";

const SparkContext = createContext(null);

export function SparkProvider({ children }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isHindi = i18n.language?.startsWith("hi");
  const [state, setState] = useState({
    open: false,
    context: normalizeSparkContext(),
    messages: [],
    draft: "",
  });

  const openSpark = useCallback((context = {}, options = {}) => {
    const normalized = normalizeSparkContext(context);
    const prompt = String(options.prompt || "").trim();
    setState((prev) => {
      const sameContext =
        prev.context.source === normalized.source &&
        prev.context.moduleId === normalized.moduleId &&
        prev.context.lessonId === normalized.lessonId &&
        prev.context.sectionId === normalized.sectionId &&
        prev.context.imageCaption === normalized.imageCaption &&
        prev.context.teacherScript === normalized.teacherScript &&
        prev.context.knowledge === normalized.knowledge;

      if (sameContext && !prompt && prev.messages.length) {
        return {
          ...prev,
          open: true,
          context: normalized,
        };
      }

      const openingReply = buildSparkOpeningReply(normalized, isHindi);
      const messages = [{ role: "spark", text: openingReply }];

      if (prompt) {
        messages.push({ role: "user", text: prompt });
        messages.push({
          role: "spark",
          text: buildSparkReply(normalized, prompt, isHindi),
        });
      }

      return {
        open: true,
        context: normalized,
        messages,
        draft: options.sendImmediately || !prompt ? "" : prompt,
      };
    });
  }, [isHindi]);

  const closeSpark = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const setDraft = useCallback((value) => {
    setState((prev) => ({ ...prev, draft: value }));
  }, []);

  const sendSparkMessage = useCallback((value) => {
    const text = String(value || "").trim();
    if (!text) return;

    setState((prev) => {
      const reply = buildSparkReply(prev.context, text, isHindi);
      return {
        ...prev,
        open: true,
        messages: [
          ...prev.messages,
          { role: "user", text },
          { role: "spark", text: reply },
        ],
        draft: "",
      };
    });
  }, [isHindi]);

  const value = useMemo(() => ({
    ...state,
    openSpark,
    closeSpark,
    setDraft,
    sendSparkMessage,
  }), [closeSpark, openSpark, sendSparkMessage, setDraft, state]);

  const launcherContext = useMemo(() => {
    const pathname = location.pathname || "";
    if (pathname === "/spark" || pathname === "/login") return null;
    if (pathname.startsWith("/learn/BE-001/section/")) {
      const sectionId = pathname.split("/").pop();
      return normalizeSparkContext({
        source: "section",
        moduleId: "module-01",
        moduleTitle: "Welcome & Electronics Lab",
        lessonId: "BE-001",
        lessonTitle: "Welcome to ElectroBasics",
        sectionId,
      });
    }
    if (pathname.startsWith("/learn/BE-001")) {
      return normalizeSparkContext({
        source: "section",
        moduleId: "module-01",
        moduleTitle: "Welcome & Electronics Lab",
        lessonId: "BE-001",
        lessonTitle: "Welcome to ElectroBasics",
      });
    }
    if (pathname.startsWith("/modules/module-01") || pathname.startsWith("/courses/module-01")) {
      return normalizeSparkContext({
        source: "module",
        moduleId: "module-01",
        moduleTitle: "Welcome & Electronics Lab",
        lessonId: "BE-001",
        lessonTitle: "Welcome to ElectroBasics",
      });
    }
    if (pathname.startsWith("/modules") || pathname.startsWith("/courses")) {
      return normalizeSparkContext({
        source: "module",
        moduleId: "module-01",
        moduleTitle: "Welcome & Electronics Lab",
      });
    }
    return normalizeSparkContext({ source: "dashboard" });
  }, [location.pathname]);

  return (
    <SparkContext.Provider value={value}>
      {children}
      <SparkLauncher context={launcherContext} onOpen={() => openSpark(launcherContext || {})} />
      <SparkOverlay />
    </SparkContext.Provider>
  );
}

export function useSpark() {
  const value = useContext(SparkContext);
  if (!value) {
    return {
      open: false,
      context: normalizeSparkContext(),
      messages: [],
      draft: "",
      openSpark: () => {},
      closeSpark: () => {},
      setDraft: () => {},
      sendSparkMessage: () => {},
    };
  }
  return value;
}

function SparkOverlay() {
  const { open, context, messages, draft, closeSpark, setDraft, sendSparkMessage } = useSpark();
  const location = useLocation();

  if (location.pathname === "/spark") return null;

  return (
    <SparkPanel
      open={open}
      context={context}
      messages={messages}
      onSend={sendSparkMessage}
      onClose={closeSpark}
    />
  );
}

function SparkLauncher({ context, onOpen }) {
  if (!context) return null;
  return <SparkDoubtBubble context={context} onOpen={onOpen} />;
}
