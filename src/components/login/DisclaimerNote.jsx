import "./DisclaimerNote.css";
import { ShieldAlert } from "lucide-react";

export default function DisclaimerNote() {
  return (
    <div className="disclaimer-note">
      <ShieldAlert size={18} />
      <div>
        <strong>Evaluation Build</strong>
        <p>
          This application is for evaluation and testing purposes only. Not
          for public distribution.
        </p>
      </div>
    </div>
  );
}
