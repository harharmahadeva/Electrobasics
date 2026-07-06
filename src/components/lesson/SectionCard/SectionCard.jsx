import "./SectionCard.css";
import {
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  FlaskConical,
  HelpCircle,
  Image,
  Lightbulb,
  Lock,
  MousePointerClick,
  Target,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ICONS = {
  Target,
  BookOpen,
  Lightbulb,
  Cpu,
  Image,
  MousePointerClick,
  FlaskConical,
  TriangleAlert,
  Wrench,
  BookMarked,
  HelpCircle,
  ClipboardCheck,
};

const STATUS = {
  completed: { en: "Review", hi: "दोहराएँ" },
  current: { en: "Start Section", hi: "खंड शुरू करें" },
  continue: { en: "Continue Section", hi: "खंड जारी रखें" },
  locked: { en: "Locked", hi: "Locked" },
};

function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

export default function SectionCard({ section, unlocked, complete, started = false, onClick }) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language?.startsWith("hi");
  const pickLang = (value, fallback = "") => {
    if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
    return value || fallback;
  };
  const Icon = ICONS[section.icon];
  const isCurrent = unlocked && !complete;
  const state = complete ? "complete" : isCurrent ? "current" : "locked";
  const currentLabel = started ? STATUS.continue : STATUS.current;

  return (
    <div className={`section-card is-${state}`} onClick={onClick}>
      <div className="sc-icon">
        {complete ? <CheckCircle2 size={20} /> : unlocked ? <Icon size={20} /> : <Lock size={18} />}
      </div>
      <strong>
        {section.order}. {pickLang(section.shortTitle)}
      </strong>
      <span className="sc-status-chip">
        {complete ? pickLang(STATUS.completed) : isCurrent ? pickLang(currentLabel) : pickLang(STATUS.locked)}
      </span>
    </div>
  );
}
