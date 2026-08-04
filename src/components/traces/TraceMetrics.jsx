import { Brain, Coins, Database, Wrench } from "lucide-react";

export default function TraceMetrics({ metrics }) {
  const cards = [
    { title: "LLM Calls", value: metrics?.llm_count ?? 0, subtitle: "Model invocations", icon: Brain },
    { title: "Tool Calls", value: metrics?.tool_count ?? 0, subtitle: "External tools", icon: Wrench },
    { title: "Memory", value: metrics?.memory_count ?? 0, subtitle: "Memory operations", icon: Database },
    { title: "Tokens", value: (metrics?.token_usage?.total_tokens ?? 0).toLocaleString(), subtitle: "Consumed", icon: Coins },
  ];

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(145px,1fr))] gap-3">
      {cards.map(({ icon: Icon, subtitle, title, value }) => (
        <article
          key={title}
          className="group flex h-28 items-start justify-between rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4 transition hover:-translate-y-0.5 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--cp-text-muted)]">{title}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-[11px] text-[var(--cp-text-muted)]">{subtitle}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
            <Icon size={17} />
          </div>
        </article>
      ))}
    </section>
  );
}
