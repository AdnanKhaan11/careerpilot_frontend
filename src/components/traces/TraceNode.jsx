import { ChevronDown, ChevronRight } from "lucide-react";

import { TRACE_CATEGORY_LABELS } from "../../constants/trace";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceNode({
  expanded,
  node,
  nodes,
  onSelect,
  onToggle,
  selectedNodeId,
}) {
  const children = node.children
    .map((childId) => nodes[childId])
    .filter(Boolean);

  const isExpanded = expanded.has(node.node_id);

  return (
    <li className="trace-node">
      <div
        className={`flex items-center gap-2 rounded-xl p-2 transition ${
          selectedNodeId === node.node_id ? "bg-cyan-500/10" : "hover:bg-[var(--cp-bg-tertiary)]"
        }`}
      >
        {children.length > 0 ? (
          <button
            aria-label={isExpanded ? "Collapse node" : "Expand node"}
            className="rounded p-1 text-[var(--cp-text-muted)] hover:bg-[var(--cp-bg-primary)]"
            onClick={() => onToggle(node.node_id)}
            type="button"
          >
            {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </button>
        ) : (
          <span className="w-6" />
        )}

        <button
          className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
          onClick={() => onSelect(node)}
          type="button"
        >
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{node.name}</span>

            <span className="block text-xs text-[var(--cp-text-muted)]">
              {TRACE_CATEGORY_LABELS[node.category] ?? node.category}
            </span>
          </span>

          <TraceStatusBadge status={node.status} />
        </button>
      </div>

      {children.length > 0 && isExpanded && (
        <ul className="ml-5 border-l border-[var(--cp-border)] pl-2">
          {children.map((child) => (
            <TraceNode
              expanded={expanded}
              key={child.node_id}
              node={child}
              nodes={nodes}
              onSelect={onSelect}
              onToggle={onToggle}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
