import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";

export default function NoteCard({ note }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="
        rounded-2xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-6
        transition-all
        hover:border-cyan-500
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 size={18} className="text-cyan-400" />

            <h3 className="text-lg font-semibold">
              {note.company || "General Memory"}
            </h3>
          </div>
        </div>

        {typeof note.score === "number" && (
          <div
            className="
              rounded-full
              bg-cyan-500/10
              px-3
              py-1
              text-sm
              font-medium
              text-cyan-400
            "
          >
            {(note.score * 100).toFixed(0)}%
          </div>
        )}
      </div>

      {/* Memory */}

      <p className="mt-5 whitespace-pre-wrap leading-7 text-[var(--cp-text-muted)]">
        {note.text}
      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center gap-2 border-t border-[var(--cp-border)] pt-4 text-sm text-[var(--cp-text-muted)]">
        <Sparkles size={15} />
        Semantic Memory
      </div>
    </motion.article>
  );
}
