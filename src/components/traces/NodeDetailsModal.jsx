import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Braces, Clock3, Database, FileText, X } from "lucide-react";

import { TRACE_CATEGORY_LABELS, TRACE_STATUS_LABELS } from "../../constants/trace";

export default function NodeDetailsModal({ node, onClose }) {
  useEffect(() => {
    if (!node) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [node, onClose]);

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.button aria-label="Close node details" type="button" className="fixed inset-0 z-[200] cursor-default bg-slate-950/55 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.section role="dialog" aria-modal="true" aria-labelledby="node-details-title" initial={{ opacity: 0, scale: .97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 12 }} transition={{ duration: .18 }} className="fixed left-1/2 top-1/2 z-[210] flex max-h-[min(760px,calc(100vh-4rem))] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] shadow-2xl shadow-black/50">
            <header className="flex shrink-0 items-start justify-between border-b border-[var(--cp-border)] bg-[var(--cp-bg-primary)]/60 px-5 py-4">
              <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-cyan-400">Runtime node</p><h2 id="node-details-title" className="mt-1 truncate text-lg font-semibold">{node.name ?? "Runtime node"}</h2><p className="mt-1 text-xs text-[var(--cp-text-muted)]">{TRACE_CATEGORY_LABELS[node.category] ?? node.category ?? "Runtime"} · {TRACE_STATUS_LABELS[node.status] ?? node.status ?? "Waiting"}</p></div>
              <button type="button" onClick={onClose} className="rounded-lg border border-[var(--cp-border)] p-2 text-[var(--cp-text-muted)] transition hover:border-cyan-500/30 hover:text-cyan-300"><X size={16} /></button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="grid gap-3 sm:grid-cols-3"><Meta label="Category" value={TRACE_CATEGORY_LABELS[node.category] ?? node.category ?? "—"} /><Meta label="Status" value={TRACE_STATUS_LABELS[node.status] ?? node.status ?? "Waiting"} /><Meta label="Duration" value={node.duration_ms != null ? `${Number(node.duration_ms).toFixed(0)} ms` : "—"} /></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2"><Meta icon={Clock3} label="Started" value={node.started_at ?? "—"} /><Meta icon={Clock3} label="Finished" value={node.finished_at ?? "—"} /></div>
              <div className="mt-5 space-y-4"><Payload icon={FileText} label="Input" value={node.input} /><Payload icon={Braces} label="Output" value={node.output} /><Payload icon={Database} label="Metadata" value={node.metadata} />{node.error && <Payload error icon={Braces} label="Error" value={node.error} />}</div>
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}

function Meta({ icon: Icon, label, value }) { return <div className="rounded-xl border border-[var(--cp-border)] bg-[var(--cp-bg-primary)] p-3"><p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--cp-text-muted)]">{Icon && <Icon size={12} />}{label}</p><p className="mt-1 break-words text-xs font-medium text-[var(--cp-text-secondary)]">{value}</p></div>; }
function Payload({ error = false, icon: Icon, label, value }) { if (value === undefined || value === null) return null; return <section><h3 className={`mb-2 flex items-center gap-2 text-xs font-semibold ${error ? "text-red-300" : "text-[var(--cp-text-primary)]"}`}><Icon size={14} />{label}</h3><pre className={`max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-xl border p-3 text-xs leading-5 ${error ? "border-red-500/30 bg-red-950/20 text-red-100" : "border-[var(--cp-border)] bg-[var(--cp-bg-primary)] text-[var(--cp-text-secondary)]"}`}>{typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}</pre></section>; }
