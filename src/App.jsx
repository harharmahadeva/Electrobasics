import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardV2 from "./pages/dashboard-v2/DashboardV2";
import AllModulesPage from "./pages/courses/AllModulesPage";
import ModuleDetailPage from "./pages/courses/ModuleDetailPage";
import Module01DetailPage from "./pages/courses/Module01DetailPage";
import LessonPage from "./pages/lessons/LessonPage";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import AppLayout from "./components/layout/AppLayout";
import PlaceholderProgressPage from "./pages/PlaceholderProgressPage";
import SparkPage from "./pages/spark/SparkPage";
import { SparkProvider } from "./context/SparkContext";
import { ProgressProvider } from "./context/ProgressContext";
import { useAuth } from "./context/AuthContext";

function HomeRedirect() {
  const { ready, isAuthenticated } = useAuth();
  if (!ready) return null;
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

function PublicRoute({ children }) {
  const { ready, isAuthenticated } = useAuth();
  if (!ready) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function ProtectedRoute({ children }) {
  const { ready, isAuthenticated } = useAuth();
  const location = useLocation();
  if (!ready) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <SparkProvider>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route
              path="/modules/module-01"
              element={<ProtectedRoute><Module01DetailPage /></ProtectedRoute>}
            />
            <Route
              path="/courses/module-01"
              element={<ProtectedRoute><Module01DetailPage /></ProtectedRoute>}
            />
            <Route path="/learn/BE-001" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
            <Route
              path="/learn/BE-001/section/:sectionId"
              element={<ProtectedRoute><LessonPage /></ProtectedRoute>}
            />
            <Route
              path="/learn/BE-002"
              element={<ProtectedRoute><PlaceholderProgressPage title="BE-002: Electronics Lab Safety" kind="be002" /></ProtectedRoute>}
            />
            <Route
              path="/modules/module-01/review"
              element={<ProtectedRoute><ComingSoon title="Module 01 Review" /></ProtectedRoute>}
            />
            <Route
              path="/modules/module-02"
              element={<ProtectedRoute><PlaceholderProgressPage title="Module 02: Electronics Tools" kind="module02" /></ProtectedRoute>}
            />

            <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<DashboardV2 />} />
              <Route path="/modules" element={<AllModulesPage />} />
              <Route path="/courses" element={<AllModulesPage />} />
              <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
              <Route path="/lesson" element={<ComingSoon title="Lesson View" />} />
              <Route path="/quiz" element={<ComingSoon title="Quiz" />} />
              <Route path="/result" element={<ComingSoon title="Test Result" />} />
              <Route path="/review" element={<ComingSoon title="MCQ Review" />} />
              <Route path="/notes" element={<ComingSoon title="Notes" />} />
              <Route path="/spark" element={<SparkPage />} />
              <Route path="/continue-lesson" element={<ComingSoon title="Continue Lesson" />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </SparkProvider>
      </ProgressProvider>
    </BrowserRouter>
  );
}
