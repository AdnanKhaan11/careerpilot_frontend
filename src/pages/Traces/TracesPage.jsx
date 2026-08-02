import { Activity } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  const [replayStep, setReplayStep] = useState(null);

  const nodes = useMemo(() => normalizeNodes(activeTrace?.nodes), [activeTrace]);

  const visibleTraces = useMemo(() => {
    const query = search.trim().toLowerCase();

    return traces.filter((trace) => {
      const matchesFilter = filter === "all" || trace.status === filter;
      const matchesCategory = category === "all" || trace.category === category || trace.categories?.includes(category);
      const searchableNodes = Object.values(trace.nodes ?? {});
      const matchesSearch = !query || [trace.trace_id, trace.name, trace.conversation_id, trace.status, ...searchableNodes.flatMap((node) => [node.name, node.category, node.tool_name])]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

      return matchesFilter && matchesCategory && matchesSearch;
    });
  }, [category, filter, search, traces]);

  useEffect(() => {
    if (replayStep === null) return undefined;

    if (replayStep > Object.keys(nodes).length) {
      const timeout = window.setTimeout(() => setReplayStep(null), 700);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => setReplayStep((step) => step + 1), 500);
    return () => window.clearTimeout(timeout);
  }, [nodes, replayStep]);

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

  function replay() {
    if (Object.keys(nodes).length > 0) setReplayStep(1);
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
          onReplay={replay}
          onToggleAutoScroll={() => setAutoScroll((value) => !value)}
        />
      </header>

      {error && (
        <div className="trace-error-card mb-5">
          <div>
            <p className="font-semibold">Trace data is unavailable</p>
            <p className="mt-1 text-sm text-red-200/80">{error}</p>
          </div>

          <button onClick={loadTraces} type="button">Retry</button>
        </div>
      )}

      <div className="trace-page-grid">
        <TraceSidebar
          activeTraceId={activeTrace?.trace_id}
          category={category}
          filter={filter}
          onCategoryChange={setCategory}
          onFilterChange={setFilter}
          onSearchChange={setSearch}
          onSelect={handleSelectTrace}
          search={search}
          traces={visibleTraces}
        />

        <div className="min-w-0 space-y-5">
          {loading && !activeTrace ? (
            <div className="trace-loading-state" aria-label="Loading traces"><span /><span /><span /><span /></div>
          ) : activeTrace ? (
            <>
              <TraceMetrics metrics={metrics} nodeCount={Object.keys(nodes).length} />

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
                <TraceTimeline autoScroll={autoScroll} nodes={nodes} onSelect={setSelectedNode} selectedNodeId={selectedNode?.node_id} />
                <TraceDetails node={selectedNode} trace={activeTrace} />
              </div>

              <TraceTree expanded={expanded} nodes={nodes} onSelect={setSelectedNode} onToggle={toggleNode} replayStep={replayStep} selectedNodeId={selectedNode?.node_id} />
            </>
          ) : (
            <div className="trace-empty-state"><span className="trace-empty-orbit" /><h2>No traces yet</h2><p>When CareerPilot runs, its execution graph and runtime details will appear here.</p></div>
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
