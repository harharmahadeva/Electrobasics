import "./SparkWidget.css";
import SparkConsole from "./SparkConsole";
import { useSpark } from "../../context/SparkContext";

export default function SparkWidget(props) {
  const spark = useSpark();
  const handleOpen = props.onOpen || (() => spark.openSpark(props.context || {}));
  return <SparkConsole mode="widget" compact {...props} onOpen={handleOpen} />;
}
