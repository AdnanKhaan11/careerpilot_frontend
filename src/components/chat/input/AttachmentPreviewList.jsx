import { File, X } from "lucide-react";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AttachmentPreviewList({ files, onRemove }) {
  if (!files.length) return null;

  return (
    <div className="flex flex-wrap gap-2 border-b border-[var(--cp-border)] px-4 pb-3 pt-4">
      {files.map((file, index) => (
        <div
          key={`${file.name}-${index}`}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-tertiary)]
            py-1.5
            pl-2.5
            pr-1.5
            text-xs
          "
        >
          <File size={14} className="shrink-0 text-cyan-400" />

          <span className="max-w-[9rem] truncate font-medium">{file.name}</span>

          <span className="text-[var(--cp-text-muted)]">
            {formatSize(file.size)}
          </span>

          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label={`Remove ${file.name}`}
            className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-md
              text-[var(--cp-text-muted)]
              transition
              hover:bg-[var(--cp-bg-quaternary)]
              hover:text-[var(--cp-text-primary)]
            "
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
}
