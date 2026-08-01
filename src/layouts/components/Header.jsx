import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import useSidebar from "../../hooks/useSidebar";
import { pageTitles } from "../../utils/pageTitle";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  const location = useLocation();

  const title = pageTitles[location.pathname] ?? "CareerPilot";

  return (
    <header className="flex h-[var(--cp-header-height)] items-center justify-between border-b border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 hover:bg-[var(--cp-bg-tertiary)] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold">{title}</h1>

          <p className="text-sm text-[var(--cp-text-muted)]">CareerPilot</p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
