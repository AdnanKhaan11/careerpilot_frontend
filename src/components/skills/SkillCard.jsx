import { Brain, FolderOpen } from "lucide-react";

export default function SkillCard({ skill }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-6
        transition
        hover:border-cyan-500
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-600 p-3 text-white">
          <Brain size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-lg">{skill.name}</h3>

          <p className="text-sm text-[var(--cp-text-muted)]">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Path */}

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          rounded-xl
          bg-[var(--cp-bg-primary)]
          p-3
          text-sm
          text-[var(--cp-text-muted)]
        "
      >
        <FolderOpen size={16} />

        {skill.path}
      </div>
    </div>
  );
}
