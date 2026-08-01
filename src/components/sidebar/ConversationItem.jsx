import { Pencil, Trash2 } from "lucide-react";

export default function ConversationItem({
  conversation,
  active,
  onClick,
  onRename,
  onDelete,
}) {
  return (
    <div
      className={`group rounded-xl transition-all duration-200 ${
        active
          ? "bg-cyan-500/15 border border-cyan-500"
          : "hover:bg-[var(--cp-bg-secondary)]"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-3 text-left"
      >
        <span className="truncate">{conversation.title}</span>

        <div className="flex opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();

              const title = prompt("Rename conversation", conversation.title);

              if (title?.trim()) {
                onRename(title);
              }
            }}
          >
            <Pencil size={16} />
          </button>

          <button
            className="ml-2"
            onClick={(e) => {
              e.stopPropagation();

              if (confirm("Delete this conversation?")) {
                onDelete();
              }
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </button>
    </div>
  );
}
