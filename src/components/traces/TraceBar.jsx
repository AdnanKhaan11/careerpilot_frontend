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
  const activeNode = Object.values(trace?.nodes ?? {}).find((node) => node.status === "running");

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
    <section className={`trace-bar ${pinned ? "trace-bar-pinned" : ""}`} onDoubleClick={() => navigate("/traces")}>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className={`trace-bar-indicator ${trace?.status === "running" ? "trace-bar-indicator-running" : ""}`} />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{trace?.name ?? "No active trace"}</p>

          {!collapsed && (
            <p className="truncate text-xs text-[var(--cp-text-muted)]">
              {activeNode ? `Active: ${activeNode.name}` : "Runtime observability is ready"}
            </p>
          )}
        </div>

        {trace && <TraceStatusBadge status={trace.status} />}

        {!collapsed && trace?.duration_ms !== undefined && (
          <span className="hidden text-xs text-[var(--cp-text-muted)] sm:inline">
            {trace.duration_ms.toFixed(0)} ms
          </span>
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
    <button aria-label={label} className="trace-bar-button" onClick={onClick} title={label} type="button">
      <Icon size={15} />
    </button>
  );
}
