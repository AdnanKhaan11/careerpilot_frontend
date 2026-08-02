import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceTimeline({ autoScroll, nodes, onSelect, selectedNodeId }) {
  const activeNodeRef = useRef(null);

  const timelineNodes = Object.values(nodes ?? {}).sort((left, right) =>
    (left.started_at ?? "").localeCompare(right.started_at ?? ""),
  );
  const longestDuration = Math.max(...timelineNodes.map((node) => Number(node.duration_ms) || 0), 1);

  useEffect(() => {
    if (!autoScroll) return;

    activeNodeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [autoScroll, selectedNodeId, timelineNodes.length]);

  return (
    <section className="rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4">
      <h2 className="mb-4 font-semibold">Timeline</h2>

      <div className="trace-timeline">
        {timelineNodes.map((node) => (
          <motion.button
            className={`trace-timeline-item trace-timeline-category-${String(node.category ?? "runtime").toLowerCase()} ${
              selectedNodeId === node.node_id ? "trace-timeline-item-active" : ""
            }`}
            initial={{ opacity: 0, y: 8 }}
            key={node.node_id}
            onClick={() => onSelect(node)}
            ref={node.status === "running" || selectedNodeId === node.node_id ? activeNodeRef : null}
            transition={{ duration: 0.2 }}
            type="button"
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className={`trace-timeline-marker trace-timeline-${node.status}`} />

            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-sm font-medium">{node.name}</span>

              <span className="text-xs text-[var(--cp-text-muted)]">
                {node.duration_ms?.toFixed(0) ?? "—"} ms
              </span>

              <span className="trace-timeline-duration" aria-hidden="true">
                <span style={{ width: `${Math.max(((Number(node.duration_ms) || 0) / longestDuration) * 100, 8)}%` }} />
              </span>
            </span>

            <TraceStatusBadge status={node.status} />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
