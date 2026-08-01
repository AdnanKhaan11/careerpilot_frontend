import { motion } from "framer-motion";

export default function PageContainer({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.25,
      }}
      className="mx-auto w-full max-w-[var(--cp-content-max-width)] p-6"
    >
      {children}
    </motion.section>
  );
}
