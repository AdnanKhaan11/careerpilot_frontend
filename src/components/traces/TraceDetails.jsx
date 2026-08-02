import { Clock3 } from "lucide-react";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceDetails({ node, trace }) {
  if (!node && !trace) {
    return (
      <aside className="rounded-2xl border border-dashed border-[var(--cp-border)] p-5 text-sm text-[var(--cp-text-muted)]">
        Select a trace node to inspect its details.
      </aside>
    );
  }

  const subject = node ?? trace;

  return (
    <aside className="min-w-0 rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--cp-text-muted)]">
            {node ? node.category : "Trace"}
          </p>

          <h2 className="mt-1 break-words text-lg font-semibold">
            {node ? node.name : trace.name}
          </h2>
        </div>

        <TraceStatusBadge status={subject.status} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <Detail label="Started" value={subject.started_at} />
        <Detail label="Finished" value={subject.finished_at} />
        <Detail label="Duration" value={subject.duration_ms ? `${subject.duration_ms.toFixed(0)} ms` : "—"} />
      </div>

      <DataBlock label="Metadata" value={subject.metadata} />

      {node && <DataBlock label="Input" value={node.input} />}

      {node && <DataBlock label="Output" value={node.output} />}

      {node?.error && <DataBlock label="Error" value={node.error} error />}
    </aside>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[var(--cp-text-muted)]">
      <span>{label}</span>

      <span className="flex items-center gap-1 text-right text-xs text-[var(--cp-text-primary)]">
        <Clock3 size={13} />

        {value ?? "—"}
      </span>
    </div>
  );
}

function DataBlock({ error = false, label, value }) {
  if (value === null || value === undefined) return null;

  return (
    <div className="mt-5">
      <h3 className={`mb-2 text-sm font-semibold ${error ? "text-red-300" : ""}`}>{label}</h3>

      <pre className="max-h-48 overflow-auto rounded-xl bg-[var(--cp-bg-primary)] p-3 text-xs leading-5 text-[var(--cp-text-muted)]">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
}
