import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";

import { useSkillsContext } from "../../context/SkillsContext";

export default function CreateSkillForm() {
  const { addSkill, saving } = useSkillsContext();

  //------------------------------------------------------

  const [name, setName] = useState("");

  const [keywords, setKeywords] = useState("");

  const [instructions, setInstructions] = useState("");

  //------------------------------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    await addSkill({
      name,

      trigger_keywords: keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      instructions,
    });

    setName("");
    setKeywords("");
    setInstructions("");
  }

  //------------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-6
        shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Skill</h2>

        <p className="mt-1 text-sm text-[var(--cp-text-muted)]">
          Create a reusable procedural skill for CareerPilot.
        </p>
      </div>

      {/* Name */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">Skill Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="
            w-full
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-primary)]
            px-4
            py-3
            outline-none
            focus:border-cyan-500
          "
        />
      </div>

      {/* Keywords */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium">
          Trigger Keywords
        </label>

        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="interview, coding, resume"
          className="
            w-full
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-primary)]
            px-4
            py-3
            outline-none
            focus:border-cyan-500
          "
        />

        <p className="mt-2 text-xs text-[var(--cp-text-muted)]">
          Separate multiple keywords with commas.
        </p>
      </div>

      {/* Instructions */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Instructions</label>

        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          rows={10}
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-primary)]
            p-4
            outline-none
            focus:border-cyan-500
          "
        />
      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={saving}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-cyan-600
          px-5
          py-3
          text-white
          transition
          hover:bg-cyan-500
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {saving ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus size={18} />
            Create Skill
          </>
        )}
      </button>
    </form>
  );
}
