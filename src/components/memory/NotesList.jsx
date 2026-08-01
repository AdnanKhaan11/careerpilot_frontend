import { motion } from "framer-motion";

import NoteCard from "./NoteCard";

export default function NotesList({ notes = [], loading = false }) {
  //------------------------------------------------------

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
            }}
            className="
              h-36
              rounded-2xl
              border
              border-[var(--cp-border)]
              bg-[var(--cp-bg-secondary)]
            "
          />
        ))}
      </div>
    );
  }

  //------------------------------------------------------

  if (notes.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          py-20
          text-center
        "
      >
        <h3 className="text-xl font-semibold">
          No semantic memories matched your search.
        </h3>

        <p className="mt-2 text-[var(--cp-text-muted)]">
          CareerPilot hasn't stored anything yet.
        </p>
      </div>
    );
  }

  //------------------------------------------------------

  return (
    <div className="space-y-5">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
