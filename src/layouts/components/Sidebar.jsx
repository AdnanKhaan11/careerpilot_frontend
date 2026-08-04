import { Sparkles } from "lucide-react";

import navigation from "../../data/navigation";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex
        lg:flex-col

        w-[var(--cp-sidebar-width)]
        shrink-0

        border-r
        border-[var(--cp-border)]
        bg-[var(--cp-bg-primary)]
      "
    >
      {/* ========================= */}
      {/* Logo */}
      {/* ========================= */}

      <div className="border-b border-[var(--cp-border)] px-7 py-7">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-500
              to-sky-600
              text-white
              shadow-lg
            "
          >
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">CareerPilot</h1>

            <p className="text-sm text-[var(--cp-text-muted)]">AI Career OS</p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Navigation */}
      {/* ========================= */}

      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-5
        "
      >
        <div className="space-y-2">
          {navigation.map((item) => (
            <SidebarItem key={item.id} {...item} />
          ))}
        </div>
      </nav>

      {/* ========================= */}
      {/* Footer */}
      {/* ========================= */}

      <div className="border-t border-[var(--cp-border)] p-5">
        <div
          className="
            rounded-2xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-secondary)]
            p-4
          "
        >
          <h3 className="font-semibold">CareerPilot v1.0</h3>

          <p className="mt-2 text-xs leading-5 text-[var(--cp-text-muted)]">
            AI Runtime Monitoring
          </p>
        </div>
      </div>
    </aside>
  );
}
