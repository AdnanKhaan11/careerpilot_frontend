import { useCallback, useEffect, useRef, useState } from "react";
import { Save, Loader2, Brain } from "lucide-react";

import { useMemoryContext } from "../../context/MemoryContext";

export default function ProfileEditor() {
  const { profile, profileLoading, saveProfile, saving } = useMemoryContext();

  //------------------------------------------------------

  const [draft, setDraft] = useState("");

  const [dirty, setDirty] = useState(false);

  const textareaRef = useRef(null);

  //------------------------------------------------------

  useEffect(() => {
    setDraft(profile);
    setDirty(false);
  }, [profile]);

  //------------------------------------------------------

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 420)}px`;
  }, []);

  //------------------------------------------------------

  useEffect(() => {
    resizeTextarea();
  }, [draft, resizeTextarea]);

  //------------------------------------------------------

  function handleChange(event) {
    const value = event.target.value;

    setDraft(value);

    setDirty(value !== profile);
  }

  //------------------------------------------------------

  async function handleSave() {
    if (!dirty || saving) return;

    await saveProfile(draft);

    setDirty(false);
  }

  //------------------------------------------------------

  function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault();

      handleSave();
    }
  }

  //------------------------------------------------------

  return (
    <section
      className="
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-7
        shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-7 flex items-start justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white">
            <Brain size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Long-Term Memory</h2>

            <p className="mt-1 text-sm text-[var(--cp-text-muted)]">
              Everything CareerPilot permanently remembers about you.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!dirty || saving}
          className="
            flex
            min-w-[130px]
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-cyan-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-cyan-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save
            </>
          )}
        </button>
      </div>

      {/* Editor */}

      <textarea
        ref={textareaRef}
        value={draft}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={profileLoading || saving}
        placeholder={`Example:

Name: Adnan Khan
Target Role: AI Engineer
Preferred Country: Saudi Arabia
Preferred Location: Remote
Experience: Machine Learning
Skills: Python, PyTorch, FastAPI
Career Goal: AI Engineer

Write anything you want CareerPilot to remember permanently.`}
        className="
          min-h-[420px]
          w-full
          resize-none
          overflow-hidden
          rounded-2xl
          border
          border-[var(--cp-border)]
          bg-[var(--cp-bg-primary)]
          p-6
          font-mono
          leading-8
          outline-none
          transition
          focus:border-cyan-500
          disabled:opacity-60
        "
      />

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="text-[var(--cp-text-muted)]">
          {draft.length.toLocaleString()} characters
        </div>

        <div
          className={
            dirty ? "font-medium text-yellow-400" : "font-medium text-green-400"
          }
        >
          {dirty ? "Unsaved changes" : "All changes saved"}
        </div>
      </div>
    </section>
  );
}
