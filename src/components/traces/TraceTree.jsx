import { motion } from "framer-motion";
import { Brain, Cpu, Database, GitBranch, ShieldCheck, Sparkles, Wrench } from "lucide-react";

import { TRACE_CATEGORY_LABELS, TRACE_STATUS_LABELS } from "../../constants/trace";

const categoryIcons = { LLM: Brain, Tool: Wrench, Retriever: Database, Memory: Database, WorkingMemory: Cpu, Planner: GitBranch, Safety: ShieldCheck };
const nodeWidth = 188;
const nodeHeight = 66;

export default function TraceTree({ nodes, onSelect, runtimeLive, selectedNodeId }) {
  const graph = createGraph(Object.values(nodes ?? {}));
  const isLive = runtimeLive && graph.nodes.some(({ node }) => node.status === "running");

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] shadow-xl">
      <div className="relative flex items-end justify-between border-b border-[var(--cp-border)] px-5 py-4">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">Architecture</p><h2 className="mt-1 text-base font-semibold">Runtime execution graph</h2></div>
        <span className="text-xs text-[var(--cp-text-muted)]">{graph.nodes.length} nodes</span>
      </div>

      {graph.nodes.length === 0 ? <div className="flex h-64 items-center justify-center text-sm text-[var(--cp-text-muted)]">No execution graph available.</div> : (
        <div className={`trace-runtime-canvas overflow-auto p-4 ${isLive ? "trace-runtime-live" : ""}`}>
          <div className="relative mx-auto" style={{ height: graph.height, minWidth: graph.width, width: graph.width }}>
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${graph.width} ${graph.height}`} preserveAspectRatio="none">
              <defs><linearGradient id="runtime-edge" x1="0" x2="1"><stop stopColor="#22d3ee" stopOpacity=".18" /><stop offset=".5" stopColor="#22d3ee" stopOpacity=".72" /><stop offset="1" stopColor="#38bdf8" stopOpacity=".2" /></linearGradient><marker id="runtime-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#22d3ee" fillOpacity=".7" /></marker></defs>
              {graph.edges.map((edge) => <GraphEdge key={`${edge.from}-${edge.to}`} edge={edge} graph={graph} />)}
            </svg>
            {graph.nodes.map((graphNode, index) => <GraphNode key={graphNode.node.node_id} graphNode={graphNode} index={index} isLive={isLive} onSelect={onSelect} selected={selectedNodeId === graphNode.node.node_id} />)}
          </div>
        </div>
      )}
    </section>
  );
}

function createGraph(items) {
  const ordered = [...items].sort((a, b) => (a.started_at ?? "").localeCompare(b.started_at ?? ""));
  let mainDepth = 0;
  let topCount = 0;
  let bottomCount = 0;
  const nodes = ordered.map((node, index) => {
    const lane = getLane(node, index);
    const branchX = 70 + Math.max(mainDepth, 1) * 172;
    if (lane === "top") return { node, lane, x: branchX, y: 42 + topCount++ * 82 };
    if (lane === "bottom") return { node, lane, x: branchX, y: 292 + bottomCount++ * 82 };
    return { node, lane: "main", x: 44 + mainDepth++ * 172, y: 172 };
  });
  const nodeIds = new Set(nodes.map(({ node }) => node.node_id));
  const edges = [];
  let lastMain = null;
  let pendingBranches = [];

  nodes.forEach((graphNode) => {
    const { node } = graphNode;
    const parents = [node.parent_id, node.parent_node_id, node.parent].flat().filter((id) => nodeIds.has(id));
    if (parents.length) {
      parents.forEach((from) => edges.push({ from, to: node.node_id }));
    } else if (graphNode.lane !== "main" && lastMain) {
      edges.push({ from: lastMain.node.node_id, to: node.node_id });
      pendingBranches.push(graphNode);
    } else if (graphNode.lane === "main" && lastMain) {
      edges.push({ from: lastMain.node.node_id, to: node.node_id });
      pendingBranches.forEach((branch) => edges.push({ from: branch.node.node_id, to: node.node_id }));
      pendingBranches = [];
    }
    if (graphNode.lane === "main") lastMain = graphNode;
  });

  return { nodes, edges, height: Math.max(440, 390 + Math.max(bottomCount - 1, 0) * 82), width: Math.max(900, 110 + mainDepth * 172) };
}

function getLane(node, index) {
  if (index === 0) return "main";
  if (["Memory", "WorkingMemory", "Retriever", "Embedding", "Ranking"].includes(node.category)) return "top";
  if (["Tool", "Safety"].includes(node.category)) return "bottom";
  return "main";
}

function GraphEdge({ edge, graph }) {
  const source = graph.nodes.find(({ node }) => node.node_id === edge.from);
  const target = graph.nodes.find(({ node }) => node.node_id === edge.to);
  if (!source || !target) return null;
  const sourceCenterY = source.y + nodeHeight / 2;
  const targetCenterY = target.y + nodeHeight / 2;
  const targetIsBelow = target.y >= source.y + nodeHeight;
  const targetIsAbove = target.y + nodeHeight <= source.y;
  const startX = targetIsBelow || targetIsAbove ? source.x + nodeWidth / 2 : source.x + nodeWidth;
  const startY = targetIsBelow ? source.y + nodeHeight : targetIsAbove ? source.y : sourceCenterY;
  const endX = targetIsBelow || targetIsAbove ? target.x + nodeWidth / 2 : target.x;
  const endY = targetIsBelow ? target.y : targetIsAbove ? target.y + nodeHeight : targetCenterY;
  const horizontal = !targetIsBelow && !targetIsAbove;
  const distance = horizontal ? endX - startX : endY - startY;
  const control = Math.max(34, Math.abs(distance) * .42) * Math.sign(distance || 1);
  const path = horizontal
    ? `M ${startX} ${startY} C ${startX + control} ${startY}, ${endX - control} ${endY}, ${endX} ${endY}`
    : `M ${startX} ${startY} C ${startX} ${startY + control}, ${endX} ${endY - control}, ${endX} ${endY}`;
  return <path d={path} markerEnd="url(#runtime-arrow)" className="trace-runtime-edge" />;
}

function GraphNode({ graphNode, index, isLive, onSelect, selected }) {
  const { node, x, y } = graphNode;
  const Icon = categoryIcons[node.category] ?? Sparkles;
  const status = node.status ?? "waiting";
  return (
    <motion.button initial={isLive ? { opacity: 0, scale: .96 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .22, delay: index * .04 }} type="button" onClick={() => onSelect(node)} style={{ left: x, top: y, width: nodeWidth, minHeight: nodeHeight }} className={`trace-runtime-node trace-runtime-node-${status} ${selected ? "trace-runtime-node-selected" : ""}`}>
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-300"><Icon size={14} /><i className={`trace-runtime-status trace-runtime-status-${status}`} /></span>
      <span className="min-w-0 flex-1 text-left"><span className="block truncate text-xs font-semibold">{node.name ?? "Runtime node"}</span><span className="mt-0.5 block truncate text-[10px] text-[var(--cp-text-muted)]">{TRACE_CATEGORY_LABELS[node.category] ?? node.category ?? "Runtime"}</span></span>
      <span className="absolute bottom-1.5 right-2 text-[9px] uppercase tracking-wide text-[var(--cp-text-muted)]">{node.duration_ms != null ? `${Number(node.duration_ms).toFixed(0)} ms` : TRACE_STATUS_LABELS[status] ?? "Waiting"}</span>
    </motion.button>
  );
}
