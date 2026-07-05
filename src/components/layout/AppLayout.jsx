import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../dashboard-v2/Header/Header";
import BottomNav from "../navigation/BottomNav";
import { PageHeaderProvider } from "../../context/PageHeaderContext";

export default function AppLayout() {
  return (
    <PageHeaderProvider>
      <div className="eb-shell">
        <div className="eb-shell-grid" />
        <div className="eb-shell-body">
          <Header />
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </PageHeaderProvider>
  );
}
