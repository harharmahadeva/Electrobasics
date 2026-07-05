import "./SectionCard.css";
import {
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
  Lock,
  CheckCircle2,
} from "lucide-react";

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

export default function SectionCard({ section, unlocked, complete, onClick }) {
  const Icon = ICONS[section.icon];
  const isCurrent = unlocked && !complete;
  const state = complete ? "complete" : isCurrent ? "current" : "locked";

  return (
    <div className={`section-card is-${state}`} onClick={onClick}>
      <div className="sc-icon">
        {complete ? <CheckCircle2 size={20} /> : unlocked ? <Icon size={20} /> : <Lock size={18} />}
      </div>
      <strong>
        {section.order}. {section.shortTitle}
      </strong>
      <span className="sc-status-chip">
        {complete ? "Completed" : isCurrent ? "Current" : "Locked"}
      </span>
    </div>
  );
}
