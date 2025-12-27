// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./components/auth/Login";
import DashboardLayout from "./components/layout/DashboardLayout";

import CampaignWizard from "./pages/CampaignWizard";
import BanksPage from "./pages/BanksPage";
import TemplatesPage from "./pages/TemplatesPage";
import CampaignsPage from "./pages/CampaignsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  const [auth, setAuth] = useState(false); // Start as false

  // Check token on mount AND whenever localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setAuth(!!token);
    };

    checkAuth(); // Initial check

    // Listen for storage changes (in case multiple tabs)
    window.addEventListener("storage", checkAuth);

    // Optional: Listen for custom event (we'll trigger it on logout)
    window.addEventListener("logout", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("logout", checkAuth);
    };
  }, []);

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/contacts" replace />} />
          <Route path="/dashboard/contacts" element={<CampaignWizard />} />
          <Route path="/dashboard/banks" element={<BanksPage />} />
          <Route path="/dashboard/templates" element={<TemplatesPage />} />
          <Route path="/dashboard/campaigns" element={<CampaignsPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/dashboard/contacts" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}