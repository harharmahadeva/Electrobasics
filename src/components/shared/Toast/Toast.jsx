import "./Toast.css";
import { useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";

export default function Toast({ message, type = "warning", onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3200);
    return () => clearTimeout(timer);
  }, [onDone]);

  const Icon = type === "info" ? Info : AlertTriangle;

  return (
    <div className={`eb-toast eb-toast--${type}`} role="status">
      <Icon size={16} />
      <span>{message}</span>
    </div>
  );
}
