import { Search } from "lucide-react";

export default function TraceSearch({ value, onChange }) {
  return (
    <label className="relative block">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cp-text-muted)]"
        size={16}
      />

      <input
        className="w-full rounded-xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] py-2 pl-9 pr-3 text-sm outline-none transition focus:border-cyan-500"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search trace, node, or conversation"
        value={value}
      />
    </label>
  );
}
