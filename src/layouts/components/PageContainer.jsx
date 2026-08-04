import { motion } from "framer-motion";

export default function PageContainer({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`
        flex-1
        min-w-0
        overflow-y-auto
        overflow-x-hidden
        bg-[var(--cp-bg-primary)]
        ${className}
      `}
    >
      <div
        className="
          w-full
          min-h-full
          px-6
          py-6
          lg:px-8
          xl:px-10
        "
      >
        {children}
      </div>
    </motion.section>
  );
}
