import { Activity } from "lucide-react";
import { useMemo, useState } from "react";

import TraceDetails from "../../components/traces/TraceDetails";
import TraceMetrics from "../../components/traces/TraceMetrics";
import TraceSidebar from "../../components/traces/TraceSidebar";
import TraceTimeline from "../../components/traces/TraceTimeline";
import TraceToolbar from "../../components/traces/TraceToolbar";
import TraceTree from "../../components/traces/TraceTree";
import useTraces from "../../hooks/useTraces";

export default function TracesPage() {
  const { activeTrace, error, loadTraces, loading, metrics, selectTrace, traces } = useTraces();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);

  const nodes = useMemo(() => normalizeNodes(activeTrace?.nodes), [activeTrace]);

  const visibleTraces = useMemo(() => {
    const query = search.trim().toLowerCase();

    return traces.filter((trace) => {
      const matchesFilter = filter === "all" || trace.status === filter;
      const matchesSearch = !query || [trace.trace_id, trace.name, trace.conversation_id]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  }, [filter, search, traces]);

  function toggleNode(nodeId) {
    setExpanded((current) => {
      const next = new Set(current);
      next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
      return next;
    });
  }

  async function handleSelectTrace(traceId) {
    setSelectedNode(null);
    setExpanded(new Set());
    await selectTrace(traceId);
  }

  async function refresh() {
    await loadTraces();

    if (activeTrace?.trace_id) await selectTrace(activeTrace.trace_id);
  }

  return (
    <div className="mx-auto w-full max-w-7xl py-4">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-500/20">
            <Activity size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Traces</h1>
            <p className="mt-1 text-sm text-[var(--cp-text-muted)]">Inspect each runtime execution from start to finish.</p>
          </div>
        </div>

        <TraceToolbar
          activeTraceId={activeTrace?.trace_id}
          autoScroll={autoScroll}
          onCollapseAll={() => setExpanded(new Set())}
          onExpandAll={() => setExpanded(new Set(Object.keys(nodes)))}
          onRefresh={refresh}
          onToggleAutoScroll={() => setAutoScroll((value) => !value)}
        />
      </header>

      {error && <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div>}

      <div className="trace-page-grid">
        <TraceSidebar
          activeTraceId={activeTrace?.trace_id}
          filter={filter}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
          onSelect={handleSelectTrace}
          search={search}
          traces={visibleTraces}
        />

        <div className="min-w-0 space-y-5">
          {loading && !activeTrace ? (
            <div className="rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-10 text-center text-sm text-[var(--cp-text-muted)]">Loading traces...</div>
          ) : activeTrace ? (
            <>
              <TraceMetrics metrics={metrics} nodeCount={Object.keys(nodes).length} />

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                <TraceTimeline autoScroll={autoScroll} nodes={nodes} onSelect={setSelectedNode} selectedNodeId={selectedNode?.node_id} />
                <TraceDetails node={selectedNode} trace={activeTrace} />
              </div>

              <TraceTree expanded={expanded} nodes={nodes} onSelect={setSelectedNode} onToggle={toggleNode} selectedNodeId={selectedNode?.node_id} />
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--cp-border)] p-10 text-center text-sm text-[var(--cp-text-muted)]">Select a trace to inspect its execution.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function normalizeNodes(nodes) {
  if (Array.isArray(nodes)) return Object.fromEntries(nodes.map((node) => [node.node_id, node]));

  return nodes ?? {};
}
