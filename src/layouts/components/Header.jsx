import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import useSidebar from "../../hooks/useSidebar";
import { pageTitles } from "../../utils/pageTitle";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  const location = useLocation();

  const title = pageTitles[location.pathname] ?? "CareerPilot";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[72px]
        shrink-0
        items-center
        justify-between
        border-b
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]/95
        px-6
        backdrop-blur-xl
      "
    >
      {/* Left */}

      <div className="flex items-center gap-5">
        <button
          onClick={toggleSidebar}
          className="
            rounded-xl
            p-2
            transition
            hover:bg-[var(--cp-bg-tertiary)]
            lg:hidden
          "
        >
          <Menu size={21} />
        </button>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

          <p className="mt-0.5 text-xs text-[var(--cp-text-muted)]">
            AI Career Operating System
          </p>
        </div>
      </div>

      {/* Search */}

      <div className="hidden w-full max-w-lg px-10 xl:block">
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-primary)]
            px-4
            py-2.5
            transition
            focus-within:border-cyan-500/40
          "
        >
          <Search size={17} className="text-[var(--cp-text-muted)]" />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-[var(--cp-text-muted)]
            "
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <button
          className="
            rounded-xl
            p-2.5
            transition
            hover:bg-[var(--cp-bg-tertiary)]
          "
        >
          <Bell size={18} />
        </button>

        <ThemeToggle />

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-cyan-500
            font-semibold
            text-white
            shadow-lg
          "
        >
          A
        </div>
      </div>
    </header>
  );
}
