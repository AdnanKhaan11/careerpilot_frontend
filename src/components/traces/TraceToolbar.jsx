import { ChevronDown, ChevronUp, FileCode2, FileText, Play, RefreshCw, ScrollText } from "lucide-react";

import { getTraceExportUrl } from "../../services/traceService";

export default function TraceToolbar({
  activeTraceId,
  autoScroll,
  onCollapseAll,
  onExpandAll,
  onRefresh,
  onReplay,
  onToggleAutoScroll,
}) {
  function exportTrace(format) {
    if (!activeTraceId) return;

    window.open(getTraceExportUrl(activeTraceId, format), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToolbarButton icon={RefreshCw} label="Refresh" onClick={onRefresh} />

      <ToolbarButton icon={ChevronUp} label="Collapse all" onClick={onCollapseAll} />

      <ToolbarButton icon={ChevronDown} label="Expand all" onClick={onExpandAll} />

      <ToolbarButton
        active={autoScroll}
        icon={ScrollText}
        label="Auto scroll"
        onClick={onToggleAutoScroll}
      />

      <ToolbarButton disabled={!activeTraceId} icon={Play} label="Replay" onClick={onReplay} />

      <ToolbarButton disabled={!activeTraceId} icon={FileCode2} label="Export JSON" onClick={() => exportTrace("json")} />

      <ToolbarButton disabled={!activeTraceId} icon={FileText} label="Export HTML" onClick={() => exportTrace("html")} />
    </div>
  );
}

function ToolbarButton({ active = false, disabled = false, icon: Icon, label, onClick }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition hover:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
          : "border-[var(--cp-border)] bg-[var(--cp-bg-secondary)]"
      }`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon size={15} />

      {label}
    </button>
  );
}
