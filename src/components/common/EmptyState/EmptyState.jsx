import { motion } from "framer-motion";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {Icon && <Icon size={56} className="mb-6 text-cyan-400" />}

      <h2 className="mb-3 text-2xl font-semibold">{title}</h2>

      <p className="mb-8 max-w-lg text-[var(--cp-text-muted)]">{description}</p>

      {children}
    </motion.div>
  );
}
