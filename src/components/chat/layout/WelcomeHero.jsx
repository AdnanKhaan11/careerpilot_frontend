import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WelcomeHero() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      {/* Small Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-cyan-500/20
          bg-cyan-500/10
          px-3
          py-1
          text-xs
          font-medium
          text-cyan-400
        "
      >
        <Sparkles size={14} />
        CareerPilot AI
      </div>

      {/* Greeting */}

      <h2
        className="
          mt-5
          text-3xl
          font-bold
          tracking-tight
        "
      >
        {greeting}
      </h2>

      {/* Description */}

      <p
        className="
          mt-3
          max-w-lg
          text-sm
          leading-7
          text-[var(--cp-text-secondary)]
        "
      >
        Ask questions, explore careers, use AI tools, retrieve memories, manage
        applications, and inspect every runtime decision from one intelligent
        workspace.
      </p>
    </motion.section>
  );
}
