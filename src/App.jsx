// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/auth/Login";
import DashboardLayout from "./components/layout/DashboardLayout";

import CampaignWizard from "./pages/CampaignWizard"; // your main send-message flow
import BanksPage from "./pages/BanksPage";
import TemplatesPage from "./pages/TemplatesPage";
import CampaignsPage from "./pages/CampaignsPage";
import ReportsPage from "./pages/ReportsPage";

export default function App() {
  const [auth, setAuth] = useState(Boolean(localStorage.getItem("token")));

  if (!auth) {
    return <Login setAuth={setAuth} />;
  }

  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/contacts" />} />
          <Route path="/dashboard/contacts" element={<CampaignWizard />} />
          <Route path="/dashboard/banks" element={<BanksPage />} />
          <Route path="/dashboard/templates" element={<TemplatesPage />} />
          <Route path="/dashboard/campaigns" element={<CampaignsPage />} />
          <Route path="/dashboard/reports" element={<ReportsPage />} />
          <Route path="*" element={<Navigate to="/dashboard/contacts" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}