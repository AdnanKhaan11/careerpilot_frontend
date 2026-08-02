import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";

import { TRACE_STATUS_LABELS } from "../../constants/trace";

export default function TraceStatusBadge({ status }) {
  const styles = {
    waiting: "border-slate-500/30 bg-slate-500/10 text-slate-300",
    running: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    failed: "border-red-500/30 bg-red-500/10 text-red-300",
    cancelled: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  };

  const icons = {
    waiting: CircleDashed,
    running: CircleDashed,
    success: CheckCircle2,
    failed: XCircle,
    cancelled: XCircle,
  };

  const Icon = icons[status] ?? CircleDashed;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? styles.waiting
      }`}
    >
      <Icon className={status === "running" ? "trace-status-spin" : ""} size={13} />

      {TRACE_STATUS_LABELS[status] ?? "Waiting"}
    </span>
  );
}
