import { Filter } from "lucide-react";

import { TRACE_STATUSES } from "../../constants/trace";

import TraceSearch from "./TraceSearch";
import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceSidebar({
  activeTraceId,
  category,
  filter,
  onCategoryChange,
  onFilterChange,
  onSearchChange,
  onSelect,
  search,
  traces,
}) {
  return (
    <aside className="flex min-h-[28rem] flex-col rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)]">
      <div className="border-b border-[var(--cp-border)] p-4">
        <div className="mb-4 flex items-center gap-2 font-semibold">
          <Filter size={17} />

          Traces
        </div>

        <TraceSearch value={search} onChange={onSearchChange} />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className={`trace-filter ${filter === "all" ? "trace-filter-active" : ""}`}
            onClick={() => onFilterChange("all")}
            type="button"
          >
            All
          </button>

          {TRACE_STATUSES.map((status) => (
            <button
              className={`trace-filter ${filter === status ? "trace-filter-active" : ""}`}
              key={status}
              onClick={() => onFilterChange(status)}
              type="button"
            >
              {status}
            </button>
          ))}
        </div>

        <select
          className="mt-3 w-full rounded-xl border border-[var(--cp-border)] bg-[var(--cp-bg-primary)] px-3 py-2 text-sm text-[var(--cp-text-muted)] outline-none focus:border-cyan-500"
          onChange={(event) => onCategoryChange(event.target.value)}
          value={category}
        >
          <option value="all">All categories</option>
          <option value="LLM">LLM</option>
          <option value="Tool">Tool</option>
          <option value="Retriever">Retriever</option>
          <option value="Memory">Memory</option>
          <option value="Safety">Safety</option>
          <option value="Planner">Planner</option>
          <option value="WorkingMemory">Working Memory</option>
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {traces.map((trace) => (
          <button
            className={`mb-1 w-full rounded-xl p-3 text-left transition hover:bg-[var(--cp-bg-tertiary)] ${
              activeTraceId === trace.trace_id ? "bg-cyan-500/10" : ""
            }`}
            key={trace.trace_id}
            onClick={() => onSelect(trace.trace_id)}
            type="button"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-xs text-[var(--cp-text-muted)]">
                {trace.trace_id.slice(0, 12)}
              </span>

              <TraceStatusBadge status={trace.status} />
            </div>

            <div className="mt-2 text-sm text-[var(--cp-text-muted)]">
              {trace.node_count} nodes · {trace.duration_ms?.toFixed(0) ?? "—"} ms
            </div>
          </button>
        ))}

        {traces.length === 0 && (
          <p className="p-4 text-center text-sm text-[var(--cp-text-muted)]">
            No matching traces.
          </p>
        )}
      </div>
    </aside>
  );
}
