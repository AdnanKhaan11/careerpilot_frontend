import { CalendarClock, Clock3, Database, FileJson } from "lucide-react";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceDetails({ node, trace }) {
  if (!node && !trace) {
    return (
      <aside
        className="
          sticky
          top-6
          rounded-3xl
          border
          border-dashed
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          p-8
          text-center
        "
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Database className="text-cyan-400" size={28} />
        </div>

        <h3 className="text-lg font-semibold">No node selected</h3>

        <p className="mt-2 text-sm text-[var(--cp-text-muted)]">
          Select any execution node from the timeline or execution graph to
          inspect its runtime details.
        </p>
      </aside>
    );
  }

  const subject = node ?? trace;

  return (
    <aside
      className="
        sticky
        top-6
        overflow-hidden
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
      "
    >
      {/* Header */}

      <div
        className="
          border-b
          border-[var(--cp-border)]
          bg-gradient-to-r
          from-cyan-500/10
          via-transparent
          to-transparent
          p-6
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              {node ? node.category : "TRACE"}
            </p>

            <h2 className="mt-2 break-words text-xl font-bold">
              {node ? node.name : trace.name}
            </h2>
          </div>

          <TraceStatusBadge status={subject.status} />
        </div>
      </div>

      {/* Runtime */}

      <div className="space-y-3 border-b border-[var(--cp-border)] p-6">
        <Detail
          icon={CalendarClock}
          label="Started"
          value={subject.started_at}
        />

        <Detail
          icon={CalendarClock}
          label="Finished"
          value={subject.finished_at}
        />

        <Detail
          icon={Clock3}
          label="Duration"
          value={
            subject.duration_ms != null
              ? `${subject.duration_ms.toFixed(0)} ms`
              : "—"
          }
        />
      </div>

      <div className="space-y-6 p-6">
        <DataBlock icon={Database} label="Metadata" value={subject.metadata} />

        {node && <DataBlock icon={FileJson} label="Input" value={node.input} />}

        {node && (
          <DataBlock icon={FileJson} label="Output" value={node.output} />
        )}

        {node?.error && (
          <DataBlock error icon={FileJson} label="Error" value={node.error} />
        )}
      </div>
    </aside>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-primary)]
        px-4
        py-3
      "
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-cyan-500/10 p-2">
          <Icon size={15} className="text-cyan-400" />
        </div>

        <span className="text-sm text-[var(--cp-text-muted)]">{label}</span>
      </div>

      <span className="text-right text-xs font-medium text-[var(--cp-text-primary)]">
        {value ?? "—"}
      </span>
    </div>
  );
}

function DataBlock({ error = false, icon: Icon, label, value }) {
  if (value === undefined || value === null) return null;

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`
            rounded-lg
            p-2
            ${
              error
                ? "bg-red-500/10 text-red-400"
                : "bg-cyan-500/10 text-cyan-400"
            }
          `}
        >
          <Icon size={15} />
        </div>

        <h3 className={`font-semibold ${error ? "text-red-300" : ""}`}>
          {label}
        </h3>
      </div>

      <pre
        className={`
          max-h-72
          overflow-auto
          rounded-2xl
          border
          p-4
          text-xs
          leading-6

          ${
            error
              ? `
                border-red-500/20
                bg-red-950/20
                text-red-200
              `
              : `
                border-[var(--cp-border)]
                bg-[var(--cp-bg-primary)]
                text-[var(--cp-text-secondary)]
              `
          }
        `}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    </section>
  );
}
