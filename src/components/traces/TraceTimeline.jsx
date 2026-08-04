import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Clock3, ArrowRight } from "lucide-react";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceTimeline({
  autoScroll,
  nodes,
  onSelect,
  selectedNodeId,
}) {
  const activeNodeRef = useRef(null);

  const timelineNodes = Object.values(nodes ?? {}).sort((left, right) =>
    (left.started_at ?? "").localeCompare(right.started_at ?? ""),
  );

  const longestDuration = Math.max(
    ...timelineNodes.map((node) => Number(node.duration_ms) || 0),
    1,
  );

  useEffect(() => {
    if (!autoScroll) return;

    activeNodeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [autoScroll, selectedNodeId, timelineNodes.length]);

  return (
    <section
      className="
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        overflow-hidden
      "
    >
      {/* Header */}

      <div className="border-b border-[var(--cp-border)] px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Execution Timeline</h2>

            <p className="mt-1 text-sm text-[var(--cp-text-muted)]">
              Runtime execution order
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-cyan-500/10
              px-3
              py-2
              text-xs
              font-medium
              text-cyan-300
            "
          >
            {timelineNodes.length} Nodes
          </div>
        </div>
      </div>

      {/* Timeline */}

      <div className="trace-timeline px-5 py-4">
        {timelineNodes.map((node, index) => (
          <motion.button
            key={node.node_id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: index * 0.03,
            }}
            onClick={() => onSelect(node)}
            ref={
              node.status === "running" || selectedNodeId === node.node_id
                ? activeNodeRef
                : null
            }
            type="button"
            className={`
              trace-timeline-item
              ${
                selectedNodeId === node.node_id
                  ? "trace-timeline-item-active"
                  : ""
              }
            `}
          >
            {/* Left */}

            <div className="flex items-center gap-4 flex-1 min-w-0">
              <span
                className={`
                  trace-timeline-marker
                  trace-timeline-${node.status}
                `}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold">
                    {node.name}
                  </h3>

                  <ArrowRight
                    size={13}
                    className="text-[var(--cp-text-muted)]"
                  />
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-[var(--cp-text-muted)]">
                  <Clock3 size={13} />

                  <span>{node.duration_ms?.toFixed(0) ?? "—"} ms</span>
                </div>

                <div
                  className="
                    mt-3
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-[var(--cp-bg-primary)]
                  "
                >
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-sky-500
                      to-blue-500
                    "
                    style={{
                      width: `${Math.max(
                        ((Number(node.duration_ms) || 0) / longestDuration) *
                          100,
                        8,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right */}

            <TraceStatusBadge status={node.status} />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
