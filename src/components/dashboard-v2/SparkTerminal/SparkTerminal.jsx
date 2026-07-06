import SparkWidget from "../../spark/SparkWidget";
import { useSpark } from "../../../context/SparkContext";
import { SPARK_KNOWLEDGE, mergeKnowledgeBuckets } from "../../../data/sparkKnowledge";

export default function SparkTerminal() {
  const { openSpark } = useSpark();
  const sparkContext = {
    source: "dashboard",
    moduleId: "module-01",
    moduleTitle: "Welcome & Electronics Lab",
    lessonId: "BE-001",
    lessonTitle: "Welcome to ElectroBasics",
    sectionTitle: "Dashboard help",
    textSummary: "Help the learner continue Module 01 or understand BE-001.",
    imageCaption: "Dashboard preview",
    knowledge: mergeKnowledgeBuckets(SPARK_KNOWLEDGE.module01, SPARK_KNOWLEDGE.be001),
  };

  return <SparkWidget context={sparkContext} onOpen={() => openSpark(sparkContext)} />;
}
