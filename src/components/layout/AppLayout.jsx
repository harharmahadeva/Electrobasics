import "./AppLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../dashboard-v2/Header/Header";
import BottomNav from "../navigation/BottomNav";
import { PageHeaderProvider } from "../../context/PageHeaderContext";
import InactivityReminder from "../session/InactivityReminder";

export default function AppLayout() {
  return (
    <PageHeaderProvider>
      <div className="eb-shell">
        <div className="eb-shell-grid" />
        <div className="eb-shell-body">
          <Header />
          <Outlet />
          <footer className="eb-shell-footer">
            <span>Copyright © 2026 ElectroBasics. All rights reserved.</span>
          </footer>
          <InactivityReminder />
        </div>
        <BottomNav />
      </div>
    </PageHeaderProvider>
  );
}
