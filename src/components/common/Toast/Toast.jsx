import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ open, message }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -25,
          }}
          className="fixed right-6 top-6 z-50 rounded-xl border border-cyan-500/30 bg-[var(--cp-bg-secondary)] px-5 py-3 shadow-xl"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
