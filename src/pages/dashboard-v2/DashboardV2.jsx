import "./DashboardV2.css";

import Hero from "../../components/dashboard-v2/Hero/Hero";
import StreakCard from "../../components/dashboard-v2/StreakCard/StreakCard";
import LevelCard from "../../components/dashboard-v2/LevelCard/LevelCard";
import ContinueLearning from "../../components/dashboard-v2/ContinueLearning/ContinueLearning";
import SparkTerminal from "../../components/dashboard-v2/SparkTerminal/SparkTerminal";
import ProgressGauge from "../../components/dashboard-v2/ProgressGauge/ProgressGauge";
import CourseLibrary from "../../components/dashboard-v2/CourseLibrary/CourseLibrary";
import ActivityTimeline from "../../components/dashboard-v2/ActivityTimeline/ActivityTimeline";
import Achievements from "../../components/dashboard-v2/Achievements/Achievements";
import WeeklyGoal from "../../components/dashboard-v2/WeeklyGoal/WeeklyGoal";

export default function DashboardV2() {
  return (
    <main className="dashboard-v2">
      <div className="hero-row">
        <Hero />
        <StreakCard />
        <LevelCard />
      </div>

      <div className="main-row">
        <ContinueLearning />
        <SparkTerminal />
        <ProgressGauge />
      </div>

      <div className="bottom-row">
        <CourseLibrary />
        <ActivityTimeline />
        <Achievements />
        <WeeklyGoal />
      </div>
    </main>
  );
}
