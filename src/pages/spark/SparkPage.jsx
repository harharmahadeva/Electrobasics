import "./SparkPage.css";
import { useLocation } from "react-router-dom";
import SparkPanel from "../../components/spark/SparkPanel";
import { useSpark } from "../../context/SparkContext";

const DEFAULT_CONTEXT = {
  source: "lesson",
  moduleId: "module-01",
  moduleTitle: "Welcome & Electronics Lab",
  lessonId: "BE-001",
  lessonTitle: "Welcome to ElectroBasics",
  sectionTitle: "Welcome to ElectroBasics",
  textSummary: "Spark can help explain Module 01, BE-001 sections, lesson images, quiz questions and next steps.",
};

export default function SparkPage() {
  const location = useLocation();
  const { context: sharedContext, messages, sendSparkMessage } = useSpark();
  const context = location.state?.sparkContext || sharedContext || DEFAULT_CONTEXT;

  return (
    <div className="spark-page">
      <SparkPanel fullPage context={context} messages={messages} onSend={sendSparkMessage} />
    </div>
  );
}
