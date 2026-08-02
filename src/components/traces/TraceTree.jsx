import TraceNode from "./TraceNode";

export default function TraceTree({
  expanded,
  nodes,
  onSelect,
  onToggle,
  selectedNodeId,
}) {
  const roots = Object.values(nodes).filter(
    (node) => !node.parent_node_id || !nodes[node.parent_node_id],
  );

  return (
    <section className="rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-4">
      <h2 className="mb-3 font-semibold">Execution tree</h2>

      {roots.length > 0 ? (
        <ul>
          {roots.map((node) => (
            <TraceNode
              expanded={expanded}
              key={node.node_id}
              node={node}
              nodes={nodes}
              onSelect={onSelect}
              onToggle={onToggle}
              selectedNodeId={selectedNodeId}
            />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--cp-text-muted)]">No execution nodes recorded.</p>
      )}
    </section>
  );
}
