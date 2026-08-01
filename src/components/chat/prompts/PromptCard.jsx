import { motion } from "framer-motion";

import { Card } from "../../common";

export default function PromptCard({ title, description, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
      <Card hover className="cursor-pointer">
        <Icon size={28} className="mb-4 text-cyan-400" />

        <h3 className="mb-2 font-semibold">{title}</h3>

        <p className="text-sm text-[var(--cp-text-muted)]">{description}</p>
      </Card>
    </motion.div>
  );
}
