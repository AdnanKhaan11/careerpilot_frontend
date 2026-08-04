import { motion } from "framer-motion";

export default function PromptCard({ title, description, icon: Icon }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.15 }}
      className="
        group
        flex
        w-full
        items-start
        gap-4
        rounded-2xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-primary)]
        p-4
        text-left
        transition-all
        duration-200
        hover:border-cyan-500/30
        hover:bg-[var(--cp-bg-tertiary)]
      "
    >
      {/* Icon */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-cyan-500/10
          text-cyan-400
          transition-all
          group-hover:bg-cyan-500/20
        "
      >
        <Icon size={20} />
      </div>

      {/* Content */}

      <div className="min-w-0 flex-1">
        <h3
          className="
            text-sm
            font-semibold
            text-[var(--cp-text-primary)]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-1
            line-clamp-2
            text-xs
            leading-6
            text-[var(--cp-text-muted)]
          "
        >
          {description}
        </p>
      </div>
    </motion.button>
  );
}
