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
  const {
    activeTrace,
    error,
    loadTraces,
    loading,
    metrics,
    selectTrace,
    traces,
  } = useTraces();

  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  const [replayStep, setReplayStep] = useState(null);

  const nodes = useMemo(
    () => normalizeNodes(activeTrace?.nodes),
    [activeTrace],
  );

  const visibleTraces = useMemo(() => {
    const query = search.trim().toLowerCase();

    return traces.filter((trace) => {
      const matchesFilter = filter === "all" || trace.status === filter;

      const matchesCategory =
        category === "all" ||
        trace.category === category ||
        trace.categories?.includes(category);

      const searchableNodes = Object.values(trace.nodes ?? {});

      const matchesSearch =
        !query ||
        [
          trace.trace_id,
          trace.name,
          trace.conversation_id,
          trace.status,
          ...searchableNodes.flatMap((node) => [
            node.name,
            node.category,
            node.tool_name,
          ]),
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      return matchesFilter && matchesCategory && matchesSearch;
    });
  }, [category, filter, search, traces]);

  useEffect(() => {
    if (replayStep === null) return;

    if (replayStep > Object.keys(nodes).length) {
      const timeout = setTimeout(() => setReplayStep(null), 700);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setReplayStep((step) => step + 1);
    }, 500);

    return () => clearTimeout(timeout);
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

    if (activeTrace?.trace_id) {
      await selectTrace(activeTrace.trace_id);
    }
  }

  function replay() {
    if (Object.keys(nodes).length) {
      setReplayStep(1);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1800px] space-y-8 px-2 pb-10">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="rounded-3xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-7 shadow-xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/30">
              <Activity size={30} className="text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">AI Runtime</h1>

              <p className="mt-2 max-w-3xl text-sm text-[var(--cp-text-muted)]">
                Observe every planner, tool call, memory lookup, LLM request and
                execution path across the entire CareerPilot runtime.
              </p>
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
        </div>
      </section>

      {error && (
        <div className="trace-error-card">
          <div>
            <p className="font-semibold">Runtime unavailable</p>

            <p className="mt-1 text-sm text-red-200">{error}</p>
          </div>

          <button onClick={loadTraces} type="button">
            Retry
          </button>
        </div>
      )}

      <div className="trace-page-grid">
        {/* LEFT SIDEBAR */}

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

        {/* RIGHT CONTENT */}

        <div className="space-y-6 min-w-0">
          {loading && !activeTrace ? (
            <div className="trace-loading-state">
              <span />
              <span />
              <span />
              <span />
            </div>
          ) : activeTrace ? (
            <>
              <TraceMetrics
                metrics={metrics}
                nodeCount={Object.keys(nodes).length}
              />

              <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
                <TraceDetails node={selectedNode} trace={activeTrace} />

                <TraceTree
                  expanded={expanded}
                  nodes={nodes}
                  onSelect={setSelectedNode}
                  onToggle={toggleNode}
                  replayStep={replayStep}
                  selectedNodeId={selectedNode?.node_id}
                />
              </div>

              <TraceTimeline
                autoScroll={autoScroll}
                nodes={nodes}
                onSelect={setSelectedNode}
                selectedNodeId={selectedNode?.node_id}
              />
            </>
          ) : (
            <div className="trace-empty-state">
              <span className="trace-empty-orbit" />

              <h2>No Runtime Available</h2>

              <p>
                Run CareerPilot once and the entire execution graph will appear
                here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function normalizeNodes(nodes) {
  if (Array.isArray(nodes)) {
    return Object.fromEntries(nodes.map((node) => [node.node_id, node]));
  }

  return nodes ?? {};
}
