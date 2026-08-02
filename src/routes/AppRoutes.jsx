import { Routes, Route } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import ChatPage from "../pages/Chat/ChatPage";
import ApplicationsPage from "../pages/Applications/ApplicationsPage";
import MemoryPage from "../pages/Memory/MemoryPage";
import SkillsPage from "../pages/Skills/SkillsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import TracesPage from "../pages/Traces/TracesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />

        <Route path="/chat" element={<ChatPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/memory" element={<MemoryPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/traces" element={<TracesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
