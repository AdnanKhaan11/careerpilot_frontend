import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        text-[var(--cp-text-primary)]
        shadow-sm
        transition-all
        duration-200
        hover:border-cyan-500/40
        hover:bg-[var(--cp-bg-tertiary)]
        hover:shadow-lg
      "
    >
      {isDark ? (
        <Sun size={19} className="text-amber-400" />
      ) : (
        <Moon size={19} className="text-slate-700 dark:text-slate-200" />
      )}
    </motion.button>
  );
}
