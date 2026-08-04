import {
  Brain,
  Wrench,
  Database,
  Coins,
  Clock3,
  TrendingUp,
} from "lucide-react";

export default function TraceMetrics({ metrics }) {
  const cards = [
    {
      title: "LLM Calls",
      value: metrics?.llm_count ?? 0,
      subtitle: "Model invocations",
      icon: Brain,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      glow: "hover:border-violet-500/30 hover:shadow-violet-500/10",
    },
    {
      title: "Tool Calls",
      value: metrics?.tool_count ?? 0,
      subtitle: "External tools",
      icon: Wrench,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      glow: "hover:border-emerald-500/30 hover:shadow-emerald-500/10",
    },
    {
      title: "Memory",
      value: metrics?.memory_count ?? 0,
      subtitle: "Memory operations",
      icon: Database,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      glow: "hover:border-cyan-500/30 hover:shadow-cyan-500/10",
    },
    {
      title: "Tokens",
      value: (metrics?.token_usage?.total_tokens ?? 0).toLocaleString(),
      subtitle: "Consumed",
      icon: Coins,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      glow: "hover:border-amber-500/30 hover:shadow-amber-500/10",
    },
    {
      title: "Runtime",
      value:
        metrics?.total_duration_ms != null
          ? `${metrics.total_duration_ms.toFixed(0)} ms`
          : "—",
      subtitle: "Total execution",
      icon: Clock3,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-400",
      glow: "hover:border-rose-500/30 hover:shadow-rose-500/10",
    },
  ];

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] items-start gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[var(--cp-border)]
              bg-[var(--cp-bg-secondary)]
              flex
              h-[208px]
              flex-col
              p-6
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              ${card.glow}
            `}
          >
            {/* Glow */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-1
                bg-gradient-to-r
                from-transparent
                via-cyan-400/70
                to-transparent
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
            />

            {/* Header */}

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--cp-text-muted)]">
                  {card.title}
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  {card.value}
                </h2>

                <p className="mt-2 text-xs text-[var(--cp-text-muted)]">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  ${card.iconBg}
                `}
              >
                <Icon className={card.iconColor} size={22} />
              </div>
            </div>

            {/* Footer */}

            <div className="mt-auto flex items-center justify-between border-t border-[var(--cp-border)] pt-4">
              <span className="text-xs text-[var(--cp-text-muted)]">
                Runtime Metric
              </span>

              <TrendingUp
                size={16}
                className="text-cyan-400 opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
