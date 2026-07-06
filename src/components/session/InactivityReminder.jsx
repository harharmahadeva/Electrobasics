import "./InactivityReminder.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock3, Home, LogOut, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import Modal from "../shared/Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import { useProgress } from "../../context/ProgressContext";

const IDLE_MS = 10 * 60 * 1000;

export default function InactivityReminder() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { saveProgressNow, getResumeRoute } = useProgress();
  const [open, setOpen] = useState(false);
  const isHindi = i18n.language?.startsWith("hi");

  const copy = isHindi
    ? {
        title: "क्या आप अभी भी सीख रहे हैं?",
        lead: "आपकी प्रगति सुरक्षित कर दी गई है।",
        body: "आप कुछ समय से निष्क्रिय हैं। जहाँ से छोड़ा था वहीं से जारी रखें, डैशबोर्ड पर जाएँ, या साइन आउट करें।",
        continue: "सीखना जारी रखें",
        dashboard: "डैशबोर्ड पर जाएँ",
        signOut: "साइन आउट",
      }
    : {
        title: "Still learning?",
        lead: "Your progress has been saved.",
        body: "You have been inactive for a while. Continue from where you left off, go back to the dashboard, or sign out.",
        continue: "Continue Learning",
        dashboard: "Go to Dashboard",
        signOut: "Sign Out",
      };

  const actions = useMemo(
    () => ({
      continueLearning() {
        setOpen(false);
        navigate(getResumeRoute());
      },
      goDashboard() {
        setOpen(false);
        navigate("/dashboard");
      },
      async signOutNow() {
        await saveProgressNow();
        signOut();
        setOpen(false);
        navigate("/login", { replace: true });
      },
    }),
    [getResumeRoute, navigate, saveProgressNow, signOut]
  );

  useEffect(() => {
    let timeoutId = null;
    let mounted = true;

    const resetTimer = () => {
      if (open) return;
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(async () => {
        if (!mounted) return;
        await saveProgressNow();
        setOpen(true);
      }, IDLE_MS);
    };

    const activityEvents = ["mousedown", "mousemove", "keydown", "touchstart", "scroll", "focus"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      mounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [open, saveProgressNow]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title={copy.title} className="eb-modal-card--idle">
      <div className="eb-idle-reminder">
        <div className="eb-idle-reminder__icon">
          <Clock3 size={18} />
        </div>
        <p className="eb-idle-reminder__lead">{copy.lead}</p>
        <p className="eb-idle-reminder__body">{copy.body}</p>

        <div className="eb-idle-reminder__actions">
          <button type="button" className="eb-idle-reminder__primary" onClick={actions.continueLearning}>
            <Play size={16} /> {copy.continue}
          </button>
          <button type="button" className="eb-idle-reminder__secondary" onClick={actions.goDashboard}>
            <Home size={16} /> {copy.dashboard}
          </button>
          <button type="button" className="eb-idle-reminder__secondary" onClick={actions.signOutNow}>
            <LogOut size={16} /> {copy.signOut}
          </button>
        </div>
      </div>
    </Modal>
  );
}
