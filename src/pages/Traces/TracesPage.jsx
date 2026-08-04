import { Activity, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import TraceMetrics from "../../components/traces/TraceMetrics";
import TraceTree from "../../components/traces/TraceTree";
import NodeDetailsModal from "../../components/traces/NodeDetailsModal";
import useTraces from "../../hooks/useTraces";

export default function TracesPage() {
  const { activeTrace, error, loadTraces, loading, metrics, selectTrace, traces } = useTraces();
  const [selectedNode, setSelectedNode] = useState(null);
  const [runtimeLive, setRuntimeLive] = useState(false);
  const nodes = useMemo(() => normalizeNodes(activeTrace?.nodes), [activeTrace]);

  useEffect(() => {
    if (!activeTrace && traces[0]?.trace_id && !loading) {
      selectTrace(traces[0].trace_id);
    }
  }, [activeTrace, loading, selectTrace, traces]);

  useEffect(() => {
    async function refreshLiveTrace() {
      const latestTraces = await loadTraces();
      if (latestTraces[0]?.trace_id) await selectTrace(latestTraces[0].trace_id);
    }

    function handleRuntimeExecution(event) {
      setRuntimeLive(Boolean(event.detail?.active));
      refreshLiveTrace();
    }

    window.addEventListener("careerpilot:runtime-execution", handleRuntimeExecution);
    return () => window.removeEventListener("careerpilot:runtime-execution", handleRuntimeExecution);
  }, [loadTraces, selectTrace]);

  useEffect(() => {
    if (!runtimeLive) return undefined;
    const poll = async () => {
      const latestTraces = await loadTraces();
      if (latestTraces[0]?.trace_id) await selectTrace(latestTraces[0].trace_id);
    };
    const interval = window.setInterval(poll, 1200);
    return () => window.clearInterval(interval);
  }, [loadTraces, runtimeLive, selectTrace]);

  async function refresh() {
    await loadTraces();
    if (activeTrace?.trace_id) await selectTrace(activeTrace.trace_id);
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 pb-8">
      <header className="border-b border-[var(--cp-border)] pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
              <Activity size={18} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">AI Runtime</h1>
              <p className="mt-1 text-xs text-[var(--cp-text-muted)]">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgb(52_211_153_/_0.8)]" />
                {activeTrace ? "Live execution observability" : "Waiting for runtime activity"}
              </p>
            </div>
          </div>
          <button type="button" onClick={refresh} className="inline-flex items-center gap-2 rounded-lg border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] px-3 py-2 text-xs text-[var(--cp-text-secondary)] transition hover:border-cyan-500/30 hover:text-cyan-300">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </header>

      {error && <div className="trace-error-card"><div><p className="font-semibold">Runtime unavailable</p><p className="mt-1 text-sm text-red-200">{error}</p></div><button onClick={loadTraces} type="button">Retry</button></div>}

      {activeTrace ? (
        <>
          <TraceMetrics metrics={metrics} />
          <TraceTree nodes={nodes} onSelect={setSelectedNode} runtimeLive={runtimeLive} selectedNodeId={selectedNode?.node_id} />
          <NodeDetailsModal node={selectedNode} onClose={() => setSelectedNode(null)} />
        </>
      ) : (
        <div className="trace-empty-state"><span className="trace-empty-orbit" /><h2>No Runtime Available</h2><p>Run CareerPilot once and its execution graph will appear here.</p></div>
      )}
    </div>
  );
}

function normalizeNodes(nodes) {
  return Array.isArray(nodes) ? Object.fromEntries(nodes.map((node) => [node.node_id, node])) : nodes ?? {};
}
