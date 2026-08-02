import { ChevronDown, ChevronUp, EyeOff, Pin, PinOff, Radio } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useTraces from "../../hooks/useTraces";

import TraceStatusBadge from "./TraceStatusBadge";

export default function TraceBar() {
  const navigate = useNavigate();
  const { activeTrace, traces } = useTraces();
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pinned, setPinned] = useState(true);

  const trace = activeTrace ?? traces.find((item) => item.status === "running") ?? traces[0];
  const nodes = Object.values(trace?.nodes ?? {});
  const activeNode = nodes.find((node) => node.status === "running");

  if (hidden) {
    return (
      <button
        aria-label="Show trace bar"
        className="trace-bar-reveal"
        onClick={() => setHidden(false)}
        type="button"
      >
        <Radio size={16} />
      </button>
    );
  }

  return (
    <section className={`trace-bar ${collapsed ? "trace-bar-collapsed" : ""} ${pinned ? "trace-bar-pinned" : ""}`} onClick={() => collapsed && setCollapsed(false)} onDoubleClick={() => navigate("/traces")}>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className={`trace-bar-indicator ${trace?.status === "running" ? "trace-bar-indicator-running" : ""}`} />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{trace?.name ?? "No active trace"}</p>

          {!collapsed && (
            <p className="truncate text-xs text-[var(--cp-text-muted)]">
              {activeNode ? `Stage: ${activeNode.category ?? "Runtime"} · ${activeNode.name}` : "Runtime observability is ready"}
            </p>
          )}
        </div>

        {trace && <TraceStatusBadge status={trace.status} />}

        {!collapsed && trace?.duration_ms !== undefined && (
          <span className="hidden text-xs text-[var(--cp-text-muted)] sm:inline">
            {trace.duration_ms.toFixed(0)} ms
          </span>
        )}

        {!collapsed && nodes.length > 0 && (
          <div className="trace-bar-mini-graph" aria-label="Active trace progress">
            {nodes.slice(0, 8).map((node) => <span className={`trace-bar-mini-node trace-bar-mini-${node.status}`} key={node.node_id} title={node.name} />)}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <TraceBarButton
          icon={pinned ? Pin : PinOff}
          label={pinned ? "Unpin trace bar" : "Pin trace bar"}
          onClick={() => setPinned((value) => !value)}
        />
        <TraceBarButton
          icon={collapsed ? ChevronDown : ChevronUp}
          label={collapsed ? "Expand trace bar" : "Collapse trace bar"}
          onClick={() => setCollapsed((value) => !value)}
        />
        <TraceBarButton icon={EyeOff} label="Hide trace bar" onClick={() => setHidden(true)} />
      </div>
    </section>
  );
}

function TraceBarButton({ icon: Icon, label, onClick }) {
  return (
    <button aria-label={label} className="trace-bar-button" onClick={(event) => { event.stopPropagation(); onClick(); }} title={label} type="button">
      <Icon size={15} />
    </button>
  );
}
