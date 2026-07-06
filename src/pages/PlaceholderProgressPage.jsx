import "./ComingSoon.css";
import { Link } from "react-router-dom";
import { CheckCircle2, Lock } from "lucide-react";
import { useProgress } from "../context/ProgressContext";

export default function PlaceholderProgressPage({ title, kind }) {
  const { isLessonComplete } = useProgress();
  const be001Complete = isLessonComplete("BE-001");
  const module01Complete = ["BE-001", "BE-002", "BE-003", "BE-004"].every((id) => isLessonComplete(id));
  const unlocked = kind === "be002" ? be001Complete : module01Complete;
  const lockedMessage =
    kind === "be002"
      ? "Locked. Complete BE-001 first to unlock this screen."
      : "Locked. Complete all 4 lessons in Module 01 to unlock this module.";

  return (
    <div className="coming-soon">
      <div className="coming-soon-card">
        {unlocked ? <CheckCircle2 size={32} /> : <Lock size={32} />}
        <h1>{title}</h1>
        <p>
          {unlocked
            ? "Unlocked. The full lesson content will be added in the next content pass."
            : lockedMessage}
        </p>
        <Link className="placeholder-link" to={unlocked ? "/modules/module-01" : "/learn/BE-001"}>
          {unlocked ? "Back to Module 01" : "Go to BE-001"}
        </Link>
      </div>
    </div>
  );
}
