import { useSkillsContext } from "../../context/SkillsContext";

import SkillCard from "./SkillCard";

export default function SkillsList() {
  const { skills, loading } = useSkillsContext();

  if (loading) {
    return (
      <div className="py-16 text-center text-[var(--cp-text-muted)]">
        Loading skills...
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-[var(--cp-border)]
          p-12
          text-center
          text-[var(--cp-text-muted)]
        "
      >
        No skills available.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {skills.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </div>
  );
}
