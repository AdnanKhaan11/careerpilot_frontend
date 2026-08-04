import {
  ChevronDown,
  ChevronUp,
  FileCode2,
  FileText,
  Play,
  RefreshCw,
  ScrollText,
} from "lucide-react";

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

    window.open(
      getTraceExportUrl(activeTraceId, format),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-3
        rounded-2xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-2
        shadow-lg
      "
    >
      <ToolbarButton icon={RefreshCw} label="Refresh" onClick={onRefresh} />

      <ToolbarButton
        icon={ChevronUp}
        label="Collapse"
        onClick={onCollapseAll}
      />

      <ToolbarButton icon={ChevronDown} label="Expand" onClick={onExpandAll} />

      <ToolbarButton
        active={autoScroll}
        icon={ScrollText}
        label="Auto Scroll"
        onClick={onToggleAutoScroll}
      />

      <div className="mx-1 h-8 w-px bg-[var(--cp-border)]" />

      <ToolbarButton
        disabled={!activeTraceId}
        icon={Play}
        label="Replay"
        onClick={onReplay}
      />

      <ToolbarButton
        disabled={!activeTraceId}
        icon={FileCode2}
        label="JSON"
        onClick={() => exportTrace("json")}
      />

      <ToolbarButton
        disabled={!activeTraceId}
        icon={FileText}
        label="HTML"
        onClick={() => exportTrace("html")}
      />
    </div>
  );
}

function ToolbarButton({
  active = false,
  disabled = false,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        px-4
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-200

        ${
          active
            ? `
              border-cyan-500/40
              bg-cyan-500/10
              text-cyan-300
              shadow-lg
              shadow-cyan-500/10
            `
            : `
              border-transparent
              bg-[var(--cp-bg-primary)]
              text-[var(--cp-text-secondary)]
              hover:border-cyan-500/20
              hover:bg-[var(--cp-bg-tertiary)]
              hover:text-white
            `
        }

        disabled:pointer-events-none
        disabled:opacity-40
      `}
    >
      <Icon size={16} />

      <span>{label}</span>
    </button>
  );
}
