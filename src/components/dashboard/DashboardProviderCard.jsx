import { Cpu, CheckCircle2 } from "lucide-react";

import { useDashboardContext } from "../../context/DashboardContext";

export default function DashboardProviderCard() {
  const { dashboard, loading } = useDashboardContext();

  return (
    <section
      className="
        flex
        h-full
        flex-col
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-8
        shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
          <Cpu size={26} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">AI Provider</h2>

          <p className="mt-2 text-sm leading-6 text-[var(--cp-text-muted)]">
            Current language model configuration
          </p>
        </div>
      </div>

      {/* Content */}

      <div className="mt-10 space-y-8">
        <div>
          <p className="mb-2 text-sm text-[var(--cp-text-muted)]">Provider</p>

          <p className="break-all text-lg font-semibold">
            {loading ? "Loading..." : dashboard?.provider || "-"}
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm text-[var(--cp-text-muted)]">Model</p>

          <p className="break-words text-lg font-semibold leading-7">
            {loading ? "Loading..." : dashboard?.model || "-"}
          </p>
        </div>
      </div>

      {/* Status */}

      <div className="mt-auto pt-10">
        <div className="inline-flex items-center gap-3 rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-400">
          <CheckCircle2 size={18} />

          <span className="font-medium">Connected</span>
        </div>
      </div>
    </section>
  );
}
