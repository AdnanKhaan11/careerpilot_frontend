import { motion } from "framer-motion";

export default function WelcomeHero() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 text-center"
    >
      <h1 className="mb-4 text-5xl font-bold">{greeting}</h1>

      <p className="mx-auto max-w-2xl text-lg text-[var(--cp-text-muted)]">
        Your AI Career Operating System. Build resumes, prepare for interviews,
        discover jobs, and grow your career.
      </p>
    </motion.section>
  );
}
