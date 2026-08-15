import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

import navigation from "../../data/navigation";
import SidebarItem from "./SidebarItem";

const EXPANDED_WIDTH = 290;
const COLLAPSED_WIDTH = 88;

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="
        relative
        hidden
        lg:flex
        lg:flex-col

        shrink-0
        overflow-hidden

        border-r
        border-[var(--cp-border)]
        bg-[var(--cp-bg-primary)]
      "
    >
      {/* ========================= */}
      {/* Collapse / Expand Toggle */}
      {/* ========================= */}

      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="
          absolute
          -right-4
          top-9
          z-10

          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center

          rounded-full
          border
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          text-[var(--cp-text-secondary)]
          shadow-lg

          transition-colors
          duration-200
          hover:border-cyan-500/50
          hover:bg-[var(--cp-bg-tertiary)]
          hover:text-cyan-300
        "
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* ========================= */}
      {/* Logo */}
      {/* ========================= */}

      <div className="border-b border-[var(--cp-border)] px-7 py-7">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
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

          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h1 className="text-xl font-bold tracking-tight">
                  CareerPilot
                </h1>

                <p className="text-sm text-[var(--cp-text-muted)]">
                  AI Career OS
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ========================= */}
      {/* Navigation */}
      {/* ========================= */}

      <nav className="shrink-0 px-4 py-5">
        <div className="space-y-2">
          {navigation.map((item) => (
            <SidebarItem key={item.id} {...item} collapsed={isCollapsed} />
          ))}
        </div>
      </nav>

      {/* ========================= */}
      {/* Footer */}
      {/* ========================= */}

      {!isCollapsed && (
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
      )}
    </motion.aside>
  );
}
