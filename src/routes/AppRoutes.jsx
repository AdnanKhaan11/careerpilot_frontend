import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import ApplicationsPage from "../pages/Applications/ApplicationsPage";
import MemoryPage from "../pages/Memory/MemoryPage";
import SkillsPage from "../pages/Skills/SkillsPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import TracesPage from "../pages/Traces/TracesPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* ===================================================== */}
        {/* AI Runtime becomes the application's home page */}
        {/* ===================================================== */}

        <Route path="/" element={<TracesPage />} />

        {/* ===================================================== */}
        {/* Workspace */}
        {/* ===================================================== */}

        <Route path="/traces" element={<Navigate to="/" replace />} />

        <Route path="/memory" element={<MemoryPage />} />

        <Route path="/skills" element={<SkillsPage />} />

        <Route path="/applications" element={<ApplicationsPage />} />

        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
