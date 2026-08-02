import { motion } from "framer-motion";

import { TRACE_CATEGORY_LABELS } from "../../constants/trace";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceTree({ nodes, onSelect, replayStep, selectedNodeId }) {
  const flowNodes = Object.values(nodes).sort((left, right) =>
    (left.started_at ?? "").localeCompare(right.started_at ?? ""),
  );

  return (
    <section className="rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Execution graph</h2>
          <p className="mt-1 text-xs text-[var(--cp-text-muted)]">Connected runtime flow</p>
        </div>

        {replayStep !== null && <span className="text-xs text-cyan-300">Replaying {Math.min(replayStep, flowNodes.length)}/{flowNodes.length}</span>}
      </div>

      {flowNodes.length > 0 ? (
        <div className="trace-graph" role="list">
          {flowNodes.map((node, index) => {
            const isReplayCurrent = replayStep !== null && replayStep === index + 1;
            const isReplayPending = replayStep !== null && replayStep <= index;

            return (
              <div className="trace-graph-step" key={node.node_id} role="listitem">
                <motion.button
                  className={`trace-graph-node trace-graph-${isReplayPending ? "waiting" : node.status} trace-category-${String(node.category ?? "runtime").toLowerCase()} ${selectedNodeId === node.node_id ? "trace-graph-node-active" : ""} ${isReplayCurrent ? "trace-graph-node-replaying" : ""}`}
                  initial={{ opacity: 0, scale: .96 }}
                  onClick={() => onSelect(node)}
                  transition={{ duration: .2, delay: index * .03 }}
                  type="button"
                  whileInView={{ opacity: 1, scale: 1 }}
                >
                  <span className="min-w-0 text-left">
                    <span className="block truncate text-sm font-semibold">{node.name}</span>
                    <span className="mt-1 block text-xs text-[var(--cp-text-muted)]">
                      {TRACE_CATEGORY_LABELS[node.category] ?? node.category ?? "Runtime"} · {formatDuration(node.duration_ms)} ms
                    </span>
                  </span>

                  <TraceStatusBadge status={isReplayPending ? "waiting" : node.status} />
                </motion.button>

                {index < flowNodes.length - 1 && <span className="trace-graph-connector" aria-hidden="true" />}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-[var(--cp-text-muted)]">No execution nodes recorded.</p>
      )}
    </section>
  );
}

function formatDuration(value) {
  const duration = Number(value);

  return Number.isFinite(duration) ? duration.toFixed(0) : "—";
}
