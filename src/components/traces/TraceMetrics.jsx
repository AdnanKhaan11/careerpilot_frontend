import { Activity, Clock3, Gauge, TriangleAlert } from "lucide-react";

export default function TraceMetrics({ metrics, nodeCount }) {
  const cards = [
    {
      label: "Total duration",
      value: metrics?.total_duration_ms?.toFixed(0) ?? "—",
      suffix: "ms",
      icon: Clock3,
    },
    {
      label: "Nodes",
      value: nodeCount ?? 0,
      suffix: "",
      icon: Activity,
    },
    {
      label: "Failed nodes",
      value: metrics?.failure_count ?? 0,
      suffix: "",
      icon: TriangleAlert,
    },
    {
      label: "Average latency",
      value: metrics?.average_latency_ms?.toFixed(0) ?? "—",
      suffix: "ms",
      icon: Gauge,
    },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ icon: Icon, label, suffix, value }) => (
        <div
          className="trace-metric-card rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4"
          key={label}
        >
          <div className="flex items-center justify-between text-[var(--cp-text-muted)]">
            <span className="text-sm">{label}</span>

            <Icon size={17} />
          </div>

          <div className="mt-3 text-2xl font-bold">
            {value}

            {suffix && <span className="ml-1 text-sm font-medium text-[var(--cp-text-muted)]">{suffix}</span>}
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4 sm:col-span-2 xl:col-span-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--cp-text-muted)]">
          <span>Slowest node: {metrics?.slowest_node_id ?? "—"}</span>

          <span>Tokens: {metrics?.token_usage?.total_tokens ?? 0}</span>

          <span>LLM calls: {metrics?.llm_count ?? 0}</span>

          <span>Tools: {metrics?.tool_count ?? 0}</span>
        </div>
      </div>
    </section>
  );
}
