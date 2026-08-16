import { Brain } from "lucide-react";

import { useSkillsContext } from "../../context/SkillsContext";

import CreateSkillForm from "../../components/skills/CreateSkillForm";
import SkillsList from "../../components/skills/SkillsList";

export default function SkillsPage() {
  const { error } = useSkillsContext();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Skills</h1>

          <p className="mt-1 text-[var(--cp-text-muted)]">
            Manage CareerPilot procedural skills.
          </p>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      {/* Form */}

      <CreateSkillForm />

      {/* List */}

      <SkillsList />
    </div>
  );
}
