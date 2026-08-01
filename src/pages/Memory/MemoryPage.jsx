import { useEffect, useState } from "react";

import { useMemoryContext } from "../../context/MemoryContext";

import ProfileEditor from "../../components/memory/ProfileEditor";
import NotesList from "../../components/memory/NotesList";

export default function MemoryPage() {
  const { notes, loading, error, loadNotes } = useMemoryContext();

  const [query, setQuery] = useState("");

  //----------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      loadNotes(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, loadNotes]);

  //----------------------------------------------------

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-8">
      <header>
        <h1 className="text-4xl font-bold">Memory</h1>

        <p className="mt-2 text-[var(--cp-text-muted)]">
          Manage your long-term profile and searchable memories.
        </p>
      </header>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
          {error}
        </div>
      )}

      <ProfileEditor />

      <section className="space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memories..."
          className="
            w-full
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-secondary)]
            px-4
            py-3
            outline-none
            transition
            focus:border-cyan-500
          "
        />

        <NotesList notes={notes} loading={loading} />
      </section>
    </div>
  );
}
