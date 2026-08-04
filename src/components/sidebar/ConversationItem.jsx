import { motion } from "framer-motion";
import { MessageSquare, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function ConversationItem({
  conversation,
  active,
  onClick,
  onRename,
  onDelete,
}) {
  const [showActions, setShowActions] = useState(false);

  function handleRename(event) {
    event.stopPropagation();

    const title = window.prompt("Rename conversation", conversation.title);

    if (title && title.trim()) {
      onRename(title.trim());
    }
  }

  function handleDelete(event) {
    event.stopPropagation();

    if (
      window.confirm(
        `Delete "${conversation.title}"?\n\nThis action cannot be undone.`,
      )
    ) {
      onDelete();
    }
  }

  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.18 }}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-300

        ${
          active
            ? `
              border-cyan-500/30
              bg-gradient-to-r
              from-cyan-500/15
              to-transparent
              shadow-lg
              shadow-cyan-500/10
            `
            : `
              border-transparent
              hover:border-[var(--cp-border)]
              hover:bg-[var(--cp-bg-secondary)]
            `
        }
      `}
    >
      {active && (
        <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-cyan-400" />
      )}

      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[var(--cp-bg-tertiary)]
            text-cyan-400
          "
        >
          <MessageSquare size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-[var(--cp-text-primary)]">
            {conversation.title}
          </h3>

          <p className="mt-1 truncate text-xs text-[var(--cp-text-muted)]">
            Click to continue this conversation
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <button
            onClick={(e) => e.stopPropagation()}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              transition
              hover:bg-[var(--cp-bg-tertiary)]
            "
          >
            <MoreHorizontal size={17} />
          </button>

          {showActions && (
            <div
              className="
                absolute
                right-0
                top-10
                z-50
                w-36
                overflow-hidden
                rounded-xl
                border
                border-[var(--cp-border)]
                bg-[var(--cp-bg-secondary)]
                shadow-2xl
              "
            >
              <button
                onClick={handleRename}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  hover:bg-[var(--cp-bg-tertiary)]
                "
              >
                <Pencil size={15} />
                Rename
              </button>

              <button
                onClick={handleDelete}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-red-400
                  hover:bg-red-500/10
                "
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          )}
        </div>
      </button>
    </motion.div>
  );
}
