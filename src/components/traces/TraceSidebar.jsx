import { Activity, Filter } from "lucide-react";

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
    <aside
      className="
        flex
        h-[calc(100vh-170px)]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        shadow-xl
      "
    >
      {/* Header */}

      <div
        className="
          sticky
          top-0
          z-20
          border-b
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          p-5
          backdrop-blur-xl
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Activity size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Runtime Sessions</h2>

            <p className="text-xs text-[var(--cp-text-muted)]">
              {traces.length} executions
            </p>
          </div>
        </div>

        <TraceSearch value={search} onChange={onSearchChange} />

        {/* Status Filters */}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className={`trace-filter ${
              filter === "all" ? "trace-filter-active" : ""
            }`}
          >
            All
          </button>

          {TRACE_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => onFilterChange(status)}
              className={`trace-filter ${
                filter === status ? "trace-filter-active" : ""
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Category */}

        <div className="relative mt-5">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--cp-text-muted)]"
          />

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-[var(--cp-border)]
              bg-[var(--cp-bg-primary)]
              py-2.5
              pl-10
              pr-4
              text-sm
              outline-none
              transition-all
              duration-200
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20
            "
          >
            <option value="all">All Categories</option>
            <option value="LLM">LLM</option>
            <option value="Tool">Tool</option>
            <option value="Retriever">Retriever</option>
            <option value="Memory">Memory</option>
            <option value="WorkingMemory">Working Memory</option>
            <option value="Planner">Planner</option>
            <option value="Safety">Safety</option>
          </select>
        </div>
      </div>

      {/* Trace List */}

      <div className="flex-1 overflow-y-auto p-4">
        {traces.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <Activity size={34} className="mx-auto mb-3 text-cyan-500/40" />

              <p className="text-sm text-[var(--cp-text-muted)]">
                No runtime sessions found.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {traces.map((trace) => {
              const active = activeTraceId === trace.trace_id;

              return (
                <button
                  key={trace.trace_id}
                  type="button"
                  onClick={() => onSelect(trace.trace_id)}
                  className={`
                    group
                    w-full
                    rounded-2xl
                    border
                    p-4
                    text-left
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          border-cyan-500/40
                          bg-cyan-500/10
                          shadow-lg
                          shadow-cyan-500/10
                        `
                        : `
                          border-[var(--cp-border)]
                          bg-[var(--cp-bg-primary)]
                          hover:-translate-y-0.5
                          hover:border-cyan-500/30
                          hover:bg-[var(--cp-bg-tertiary)]
                        `
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold">
                        {trace.name || "Untitled Runtime"}
                      </h3>

                      <p className="mt-1 truncate text-xs text-[var(--cp-text-muted)]">
                        {trace.trace_id}
                      </p>
                    </div>

                    <TraceStatusBadge status={trace.status} />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-[var(--cp-text-muted)]">
                    <span>{trace.node_count ?? 0} Nodes</span>

                    <span>
                      {trace.duration_ms
                        ? `${trace.duration_ms.toFixed(0)} ms`
                        : "—"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
