import { Brain, Coins, Database, Wrench } from "lucide-react";

export default function TraceMetrics({ metrics }) {
  const cards = [
    { title: "LLM Calls", value: metrics?.llm_count ?? 0, subtitle: "Model invocations", icon: Brain },
    { title: "Tool Calls", value: metrics?.tool_count ?? 0, subtitle: "External tools", icon: Wrench },
    { title: "Memory", value: getMemoryCount(metrics), subtitle: "Memory operations", icon: Database },
    { title: "Tokens", value: getTokenCount(metrics).toLocaleString(), subtitle: "Consumed", icon: Coins },
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

function getMemoryCount(metrics) {
  return firstNumber([
    metrics?.memory_count,
    metrics?.memory_operations,
    metrics?.memory?.count,
    metrics?.memory?.total,
    metrics?.memory_usage?.total,
    sum(metrics?.memory_lookups, metrics?.memory_writes, metrics?.memory_retrieved),
  ]);
}

function getTokenCount(metrics) {
  const usage = metrics?.token_usage ?? metrics?.tokens ?? metrics?.usage;
  return firstNumber([
    usage?.total_tokens,
    usage?.total,
    metrics?.total_tokens,
    sum(usage?.prompt_tokens, usage?.completion_tokens),
    sum(usage?.input_tokens, usage?.output_tokens),
  ]);
}

function firstNumber(values) {
  const numericValues = values.filter((value) => Number.isFinite(Number(value)));
  return numericValues.find((value) => Number(value) > 0) ?? numericValues[0] ?? 0;
}

function sum(...values) {
  return values.every((value) => Number.isFinite(Number(value)))
    ? values.reduce((total, value) => total + Number(value), 0)
    : undefined;
}
