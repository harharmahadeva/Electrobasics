import "./SparkDoubtBubble.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSpark } from "../../context/SparkContext";

const LABELS = {
  ask: { en: "Ask Spark", hi: "Spark से पूछें" },
  clear: { en: "Clear Doubt", hi: "डाउट दूर करें" },
  title: { en: "Spark AI Console", hi: "स्पार्क AI कंसोल" },
  ready: { en: "Scanner Online", hi: "स्कैनर ऑनलाइन" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

function pickLabel(value, isHindi, fallback = "") {
  if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
  return value || fallback;
}

const STORAGE_KEY = "eb-spark-orb-position-v1";
const MOBILE_BREAKPOINT = 700;
const DEFAULT_MARGIN = 32;

export default function SparkDoubtBubble({
  context = {},
  onOpen,
  className = "",
  title,
  subtitle,
  mode = "floating",
  dockOffset = 0,
}) {
  const { i18n } = useTranslation();
  const spark = useSpark();
  const isHindi = i18n.language?.startsWith("hi");
  const bubbleRef = useRef(null);
  const dragRef = useRef({ dragging: false, moved: false, pointerId: null, offsetX: 0, offsetY: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState(null);

  const handleOpen = onOpen || (() => spark.openSpark(context));
  const mainLabel = title ? pickLabel(title, isHindi) : pickLabel(LABELS.clear, isHindi);
  const subLabel = subtitle ? pickLabel(subtitle, isHindi) : pickLabel(LABELS.ask, isHindi);

  const isFloating = mode !== "inline";
  const bottomOffset = DEFAULT_MARGIN + Math.max(0, dockOffset);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const clamp = useMemo(() => (value, min, max) => Math.min(Math.max(value, min), max), []);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile || !isFloating) return;

    const stored = (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed.x !== "number" || typeof parsed.y !== "number") return null;
        return parsed;
      } catch {
        return null;
      }
    })();

    const bubble = bubbleRef.current;
    const width = bubble?.offsetWidth || 248;
    const height = bubble?.offsetHeight || 58;
    const maxX = Math.max(DEFAULT_MARGIN, window.innerWidth - width - DEFAULT_MARGIN);
    const maxY = Math.max(bottomOffset, window.innerHeight - height - bottomOffset);
    const defaultPosition = {
      x: clamp(window.innerWidth - width - DEFAULT_MARGIN, DEFAULT_MARGIN, maxX),
      y: clamp(window.innerHeight - height - bottomOffset, bottomOffset, maxY),
    };

    if (!stored) {
      setPosition(defaultPosition);
      return;
    }

    const insideBounds =
      stored.x >= DEFAULT_MARGIN &&
      stored.y >= DEFAULT_MARGIN &&
      stored.x <= maxX &&
      stored.y <= maxY;

    setPosition(insideBounds ? stored : defaultPosition);
  }, [clamp, isFloating, isMobile]);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile || !position) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    } catch {
      // ignore storage failures
    }
  }, [isMobile, position]);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile || !isFloating) return;

    const handleResize = () => {
      setPosition((prev) => {
        const bubble = bubbleRef.current;
        const width = bubble?.offsetWidth || 248;
        const height = bubble?.offsetHeight || 58;
        const maxX = Math.max(DEFAULT_MARGIN, window.innerWidth - width - DEFAULT_MARGIN);
        const maxY = Math.max(bottomOffset, window.innerHeight - height - bottomOffset);
        if (!prev) {
          return {
            x: clamp(window.innerWidth - width - DEFAULT_MARGIN, DEFAULT_MARGIN, maxX),
            y: clamp(window.innerHeight - height - bottomOffset, bottomOffset, maxY),
          };
        }
        const inBounds = prev.x >= DEFAULT_MARGIN && prev.y >= bottomOffset && prev.x <= maxX && prev.y <= maxY;
        if (inBounds) {
          return {
            x: clamp(prev.x, DEFAULT_MARGIN, maxX),
            y: clamp(prev.y, bottomOffset, maxY),
          };
        }
        return {
          x: clamp(window.innerWidth - width - DEFAULT_MARGIN, DEFAULT_MARGIN, maxX),
          y: clamp(window.innerHeight - height - bottomOffset, bottomOffset, maxY),
        };
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clamp, isFloating, isMobile]);

  function handlePointerDown(event) {
    if (!isFloating || isMobile || event.button !== 0) return;
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const rect = bubble.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      moved: false,
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    bubble.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragRef.current.dragging || dragRef.current.pointerId !== event.pointerId || isMobile) return;
    event.preventDefault();
    dragRef.current.moved = true;
    const bubble = bubbleRef.current;
    if (!bubble) return;
    const width = bubble.offsetWidth || 248;
    const height = bubble.offsetHeight || 58;
    const maxX = Math.max(DEFAULT_MARGIN, window.innerWidth - width - DEFAULT_MARGIN);
    const maxY = Math.max(bottomOffset, window.innerHeight - height - bottomOffset);
    const nextPosition = {
      x: clamp(event.clientX - dragRef.current.offsetX, DEFAULT_MARGIN, maxX),
      y: clamp(event.clientY - dragRef.current.offsetY, bottomOffset, maxY),
    };
    setPosition(nextPosition);
  }

  function handlePointerUp(event) {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const wasDragging = dragRef.current.moved;
    dragRef.current = { dragging: false, moved: false, pointerId: null, offsetX: 0, offsetY: 0 };
    if (!wasDragging) {
      handleOpen();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  }

  return (
    <button
      type="button"
      ref={bubbleRef}
      className={`spark-doubt-bubble ${isFloating ? "is-floating" : "is-inline"} ${isMobile ? "is-mobile" : "is-desktop"} ${className}`}
      style={
        isFloating && !isMobile && position
          ? { left: `${position.x}px`, top: `${position.y}px`, right: "auto", bottom: "auto" }
          : undefined
      }
      onClick={(event) => {
        if (dragRef.current.moved) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (!isFloating || isMobile) handleOpen();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onKeyDown={handleKeyDown}
    >
      <span className="spark-doubt-bubble__scan" aria-hidden="true">
        <span />
      </span>
      <span className="spark-doubt-bubble__inner">
        <span className="spark-doubt-bubble__icon" aria-hidden="true">
          <Sparkles size={12} />
        </span>
        <span className="spark-doubt-bubble__copy">
          <strong>{mainLabel}</strong>
          <span>{subLabel}</span>
        </span>
        <span className="spark-doubt-bubble__action" aria-hidden="true">
          <MessageCircle size={12} />
        </span>
      </span>
      <span className="spark-doubt-bubble__status" aria-hidden="true">
        <Zap size={10} /> {pickLabel(LABELS.ready, isHindi)}
      </span>
    </button>
  );
}
