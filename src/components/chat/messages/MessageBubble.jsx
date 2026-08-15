import { motion } from "framer-motion";
import { Bot, User, Copy, Check, File as FileIcon } from "lucide-react";
import { useState } from "react";

import MarkdownRenderer from "../../markdown/MarkdownRenderer";

export default function MessageBubble({
  role,
  content,
  streaming = false,
  attachments = [],
}) {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  //----------------------------------------------------------

  async function copyMessage() {
    if (!content) return;

    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => setCopied(false), 1800);
  }

  //----------------------------------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="w-full max-w-3xl">
        {/* ======================== */}
        {/* Header */}
        {/* ======================== */}

        <div
          className={`mb-2 flex items-center gap-3 ${
            isUser ? "justify-end" : ""
          }`}
        >
          {!isUser ? (
            <>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                <Bot size={18} />
              </div>

              <span className="text-sm font-semibold">CareerPilot</span>
            </>
          ) : (
            <>
              <span className="text-sm text-[var(--cp-text-muted)]">You</span>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600 text-white">
                <User size={17} />
              </div>
            </>
          )}
        </div>

        {/* ======================== */}
        {/* Message */}
        {/* ======================== */}

        <div
          className={
            isUser
              ? `
                ml-auto
                max-w-[82%]
                rounded-2xl
                bg-[#0f6274]
                px-5
                py-4
                text-white
              `
              : `
                rounded-2xl
                bg-[var(--cp-bg-primary)]
                px-5
                py-4
              `
          }
        >
          {isUser ? (
            <div>
              {attachments?.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((file, index) => (
                    <span
                      key={`${file.name}-${index}`}
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-white/20
                        bg-white/10
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                      "
                    >
                      <FileIcon size={12} />
                      {file.name}
                    </span>
                  ))}
                </div>
              )}

              {content && (
                <div className="whitespace-pre-wrap break-words leading-7">
                  {content}
                </div>
              )}
            </div>
          ) : (
            <>
              <MarkdownRenderer>{content}</MarkdownRenderer>

              {streaming && (
                <motion.span
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                  }}
                  className="ml-1 inline-block text-cyan-400"
                >
                  ▋
                </motion.span>
              )}
            </>
          )}
        </div>

        {/* ======================== */}
        {/* Footer */}
        {/* ======================== */}

        {!isUser && content && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={copyMessage}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                px-2
                py-1
                text-xs
                text-[var(--cp-text-muted)]
                transition
                hover:bg-[var(--cp-bg-secondary)]
              "
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
