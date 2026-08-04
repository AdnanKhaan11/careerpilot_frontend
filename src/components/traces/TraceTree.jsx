import { motion } from "framer-motion";
import {
  Brain,
  Wrench,
  Database,
  ShieldCheck,
  GitBranch,
  Cpu,
  Sparkles,
} from "lucide-react";

import { TRACE_CATEGORY_LABELS } from "../../constants/trace";
import TraceStatusBadge from "./TraceStatusBadge";

const categoryIcons = {
  LLM: Brain,
  Tool: Wrench,
  Retriever: Database,
  Memory: Database,
  WorkingMemory: Cpu,
  Planner: GitBranch,
  Safety: ShieldCheck,
};

export default function TraceTree({
  nodes,
  onSelect,
  replayStep,
  selectedNodeId,
}) {
  const flowNodes = Object.values(nodes).sort((a, b) =>
    (a.started_at ?? "").localeCompare(b.started_at ?? ""),
  );

  return (
    <section className="rounded-3xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Execution Flow</h2>

          <p className="mt-1 text-sm text-[var(--cp-text-muted)]">
            Visual execution path of the AI runtime.
          </p>
        </div>

        {replayStep !== null && (
          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-300">
            Step {Math.min(replayStep, flowNodes.length)} / {flowNodes.length}
          </div>
        )}
      </div>

      {flowNodes.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-[var(--cp-border)] text-[var(--cp-text-muted)]">
          No execution graph available.
        </div>
      ) : (
        <div className="trace-graph">
          {flowNodes.map((node, index) => {
            const Icon = categoryIcons[node.category] ?? Sparkles;

            const replayCurrent =
              replayStep !== null && replayStep === index + 1;

            const replayPending = replayStep !== null && replayStep <= index;

            const status = replayPending ? "waiting" : node.status;

            return (
              <div key={node.node_id} className="trace-graph-step">
                <motion.button
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                  }}
                  onClick={() => onSelect(node)}
                  type="button"
                  className={`
                    trace-graph-node
                    trace-graph-${status}
                    trace-category-${String(node.category ?? "").toLowerCase()}
                    ${
                      selectedNodeId === node.node_id
                        ? "trace-graph-node-active"
                        : ""
                    }
                    ${replayCurrent ? "trace-graph-node-replaying" : ""}
                  `}
                >
                  {/* LEFT SIDE */}

                  <div className="flex min-w-0 flex-1 items-center gap-5">
                    {/* STEP */}

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-cyan-500/20
                        bg-cyan-500/10
                        text-sm
                        font-bold
                        text-cyan-300
                      "
                    >
                      {index + 1}
                    </div>

                    {/* ICON */}

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[var(--cp-border)]
                        bg-[var(--cp-bg-primary)]
                      "
                    >
                      <Icon size={22} />
                    </div>

                    {/* NODE INFO */}

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-base font-semibold">
                        {node.name}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span
                          className="
                            rounded-full
                            bg-cyan-500/10
                            px-2.5
                            py-1
                            text-[11px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-cyan-300
                          "
                        >
                          {TRACE_CATEGORY_LABELS[node.category] ??
                            node.category ??
                            "Runtime"}
                        </span>

                        <span className="truncate text-xs text-[var(--cp-text-muted)]">
                          {node.node_id}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}

                  <div className="flex items-center gap-5">
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatDuration(node.duration_ms)}

                        <span className="ml-1 text-xs font-normal text-[var(--cp-text-muted)]">
                          ms
                        </span>
                      </div>

                      <div className="mt-1 text-xs text-[var(--cp-text-muted)]">
                        Execution Time
                      </div>
                    </div>

                    <TraceStatusBadge status={status} />
                  </div>
                </motion.button>

                {index !== flowNodes.length - 1 && (
                  <div className="trace-graph-connector" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function formatDuration(value) {
  const duration = Number(value);

  return Number.isFinite(duration) ? duration.toFixed(0) : "—";
}
