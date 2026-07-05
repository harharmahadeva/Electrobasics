import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardV2 from "./pages/dashboard-v2/DashboardV2";
import AllModulesPage from "./pages/courses/AllModulesPage";
import ModuleDetailPage from "./pages/courses/ModuleDetailPage";
import Module01DetailPage from "./pages/courses/Module01DetailPage";
import LessonPage from "./pages/lessons/LessonPage";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/modules/module-01" element={<Module01DetailPage />} />
        <Route path="/learn/BE-001" element={<LessonPage />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardV2 />} />
          <Route path="/modules" element={<AllModulesPage />} />
          <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
          <Route path="/lesson" element={<ComingSoon title="Lesson View" />} />
          <Route path="/quiz" element={<ComingSoon title="Quiz" />} />
          <Route path="/result" element={<ComingSoon title="Test Result" />} />
          <Route path="/review" element={<ComingSoon title="MCQ Review" />} />
          <Route path="/notes" element={<ComingSoon title="Notes" />} />
          <Route path="/spark" element={<ComingSoon title="Spark AI" />} />
          <Route path="/continue-lesson" element={<ComingSoon title="Continue Lesson" />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}