import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Database,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import {
  TRACE_CATEGORY_LABELS,
  TRACE_STATUS_LABELS,
} from "../../constants/trace";

const categoryIcons = {
  LLM: Brain,
  Tool: Wrench,
  Retriever: Database,
  Memory: Database,
  WorkingMemory: Cpu,
  Planner: GitBranch,
  Safety: ShieldCheck,
};
const nodeWidth = 188;
const nodeHeight = 66;
// Must stay bigger than nodeWidth, otherwise consecutive main-lane nodes overlap
// and the connecting arrow between them gets rendered UNDER the node cards (invisible).
const mainStepX = nodeWidth + 60;
// Padding around each lane's nodes when drawing its background region panel.
const lanePaddingX = 26;
const lanePaddingY = 22;

const laneLabels = {
  top: "Context & Memory",
  main: "Reasoning Flow",
  bottom: "Tools & Actions",
};

export default function TraceTree({
  nodes,
  onSelect,
  runtimeLive,
  selectedNodeId,
}) {
  const graph = createGraph(Object.values(nodes ?? {}));
  const isLive =
    runtimeLive && graph.nodes.some(({ node }) => node.status === "running");

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] shadow-xl">
      <div className="relative flex items-end justify-between border-b border-[var(--cp-border)] px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Architecture
          </p>
          <h2 className="mt-1 text-base font-semibold">
            Runtime execution graph
          </h2>
        </div>
        <span className="text-xs text-[var(--cp-text-muted)]">
          {graph.nodes.length} nodes
        </span>
      </div>

      {graph.nodes.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-[var(--cp-text-muted)]">
          No execution graph available.
        </div>
      ) : (
        <div
          className={`trace-runtime-canvas overflow-auto p-4 ${isLive ? "trace-runtime-live" : ""}`}
        >
          <div
            className="relative mx-auto"
            style={{
              height: graph.height,
              minWidth: graph.width,
              width: graph.width,
            }}
          >
            {/* Lane region panels — draws the "boxed section" architecture-diagram look */}
            {Object.entries(graph.laneBoxes).map(([lane, box]) => (
              <div
                key={lane}
                className={`trace-runtime-lane trace-runtime-lane-${lane}`}
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.width,
                  height: box.height,
                }}
              >
                <span className="trace-runtime-lane-label">
                  {laneLabels[lane]}
                </span>
              </div>
            ))}

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${graph.width} ${graph.height}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="runtime-edge" x1="0" x2="1">
                  <stop stopColor="#22d3ee" stopOpacity=".55" />
                  <stop offset=".5" stopColor="#22d3ee" stopOpacity=".95" />
                  <stop offset="1" stopColor="#38bdf8" stopOpacity=".6" />
                </linearGradient>
                <linearGradient id="runtime-edge-branch" x1="0" x2="1">
                  <stop stopColor="#a855f7" stopOpacity=".3" />
                  <stop offset=".5" stopColor="#a855f7" stopOpacity=".75" />
                  <stop offset="1" stopColor="#22d3ee" stopOpacity=".35" />
                </linearGradient>
                <marker
                  id="runtime-arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M0,0 L10,5 L0,10 Z"
                    fill="#22d3ee"
                    fillOpacity=".9"
                  />
                </marker>
                <marker
                  id="runtime-arrow-branch"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M0,0 L10,5 L0,10 Z"
                    fill="#a855f7"
                    fillOpacity=".8"
                  />
                </marker>
              </defs>
              {graph.edges.map((edge) => (
                <GraphEdge
                  key={`${edge.from}-${edge.to}`}
                  edge={edge}
                  graph={graph}
                />
              ))}
            </svg>
            {graph.nodes.map((graphNode, index) => (
              <GraphNode
                key={graphNode.node.node_id}
                graphNode={graphNode}
                index={index}
                isLive={isLive}
                onSelect={onSelect}
                selected={selectedNodeId === graphNode.node.node_id}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function createGraph(items) {
  const ordered = [...items].sort((a, b) =>
    (a.started_at ?? "").localeCompare(b.started_at ?? ""),
  );
  let mainDepth = 0;
  let topCount = 0;
  let bottomCount = 0;
  const nodes = ordered.map((node, index) => {
    const lane = getLane(node, index);
    const branchX = 70 + Math.max(mainDepth, 1) * mainStepX;
    if (lane === "top")
      return { node, lane, x: branchX, y: 42 + topCount++ * 82 };
    if (lane === "bottom")
      return { node, lane, x: branchX, y: 292 + bottomCount++ * 82 };
    return { node, lane: "main", x: 44 + mainDepth++ * mainStepX, y: 172 };
  });
  const nodeIds = new Set(nodes.map(({ node }) => node.node_id));
  const edges = [];
  const edgeIds = new Set();
  let lastMain = null;
  let pendingBranches = [];

  function addEdge(from, to) {
    if (!from || !to || from === to) return;
    const id = `${from}-${to}`;
    if (edgeIds.has(id)) return;
    edgeIds.add(id);
    edges.push({ from, to });
  }

  nodes.forEach((graphNode) => {
    const { node } = graphNode;
    const parents = [node.parent_id, node.parent_node_id, node.parent]
      .flat()
      .filter((id) => nodeIds.has(id));
    if (parents.length) {
      parents.forEach((from) => addEdge(from, node.node_id));
    }
    if (graphNode.lane !== "main" && lastMain) {
      addEdge(lastMain.node.node_id, node.node_id);
      pendingBranches.push(graphNode);
    } else if (graphNode.lane === "main" && lastMain) {
      addEdge(lastMain.node.node_id, node.node_id);
      pendingBranches.forEach((branch) =>
        addEdge(branch.node.node_id, node.node_id),
      );
      pendingBranches = [];
    }
    if (graphNode.lane === "main") lastMain = graphNode;
  });

  const laneBoxes = {};
  ["top", "main", "bottom"].forEach((lane) => {
    const laneNodes = nodes.filter((n) => n.lane === lane);
    if (!laneNodes.length) return;
    const minX = Math.min(...laneNodes.map((n) => n.x));
    const maxX = Math.max(...laneNodes.map((n) => n.x)) + nodeWidth;
    const minY = Math.min(...laneNodes.map((n) => n.y));
    const maxY = Math.max(...laneNodes.map((n) => n.y)) + nodeHeight;
    laneBoxes[lane] = {
      x: minX - lanePaddingX,
      y: minY - lanePaddingY,
      width: maxX - minX + lanePaddingX * 2,
      height: maxY - minY + lanePaddingY * 2,
    };
  });

  return {
    nodes,
    edges,
    laneBoxes,
    height: Math.max(440, 390 + Math.max(bottomCount - 1, 0) * 82),
    width: Math.max(900, 110 + mainDepth * mainStepX),
  };
}

function getLane(node, index) {
  if (index === 0) return "main";
  if (
    ["Memory", "WorkingMemory", "Retriever", "Embedding", "Ranking"].includes(
      node.category,
    )
  )
    return "top";
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
  const startX =
    targetIsBelow || targetIsAbove
      ? source.x + nodeWidth / 2
      : source.x + nodeWidth;
  const startY = targetIsBelow
    ? source.y + nodeHeight
    : targetIsAbove
      ? source.y
      : sourceCenterY;
  const endX =
    targetIsBelow || targetIsAbove ? target.x + nodeWidth / 2 : target.x;
  const endY = targetIsBelow
    ? target.y
    : targetIsAbove
      ? target.y + nodeHeight
      : targetCenterY;
  const horizontal = !targetIsBelow && !targetIsAbove;
  const distance = horizontal ? endX - startX : endY - startY;
  const control =
    Math.max(34, Math.abs(distance) * 0.42) * Math.sign(distance || 1);
  const path = horizontal
    ? `M ${startX} ${startY} C ${startX + control} ${startY}, ${endX - control} ${endY}, ${endX} ${endY}`
    : `M ${startX} ${startY} C ${startX} ${startY + control}, ${endX} ${endY - control}, ${endX} ${endY}`;
  // Straight main-flow edges render solid; edges touching a branch (tool/memory) lane render dashed —
  // mirrors the "core path vs conditional path" convention from a typical architecture diagram.
  const isBranch = source.lane !== "main" || target.lane !== "main";
  return (
    <path
      d={path}
      markerEnd={
        isBranch ? "url(#runtime-arrow-branch)" : "url(#runtime-arrow)"
      }
      className={`trace-runtime-edge ${isBranch ? "trace-runtime-edge-branch" : "trace-runtime-edge-main"}`}
    />
  );
}

function GraphNode({ graphNode, index, isLive, onSelect, selected }) {
  const { node, x, y } = graphNode;
  const Icon = categoryIcons[node.category] ?? Sparkles;
  const status = node.status ?? "waiting";
  return (
    <motion.button
      initial={isLive ? { opacity: 0, scale: 0.96 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      type="button"
      onClick={() => onSelect(node)}
      style={{ left: x, top: y, width: nodeWidth, minHeight: nodeHeight }}
      className={`trace-runtime-node trace-runtime-node-${status} ${selected ? "trace-runtime-node-selected" : ""}`}
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
        <Icon size={14} />
        <i className={`trace-runtime-status trace-runtime-status-${status}`} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-xs font-semibold">
          {node.name ?? "Runtime node"}
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-[var(--cp-text-muted)]">
          {TRACE_CATEGORY_LABELS[node.category] ?? node.category ?? "Runtime"}
        </span>
      </span>
      <span className="absolute bottom-1.5 right-2 text-[9px] uppercase tracking-wide text-[var(--cp-text-muted)]">
        {node.duration_ms != null
          ? `${Number(node.duration_ms).toFixed(0)} ms`
          : (TRACE_STATUS_LABELS[status] ?? "Waiting")}
      </span>
    </motion.button>
  );
}
