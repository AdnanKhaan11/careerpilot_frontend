import { motion } from "framer-motion";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

import MarkdownRenderer from "../../markdown/MarkdownRenderer";

export default function MessageBubble({ role, content, streaming = false }) {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  //----------------------------------------------------------

  async function copyMessage() {
    if (!content) return;

    await navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  //----------------------------------------------------------

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.18,
      }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`w-full max-w-5xl ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        {/* ====================================================== */}
        {/* USER HEADER */}
        {/* ====================================================== */}

        {isUser && (
          <div className="mb-2 flex w-full justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--cp-text-muted)]">You</span>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white">
                <User size={15} />
              </div>
            </div>
          </div>
        )}

        {/* ====================================================== */}
        {/* ASSISTANT HEADER */}
        {/* ====================================================== */}

        {!isUser && (
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white">
              <Bot size={15} />
            </div>

            <span className="font-semibold">CareerPilot</span>
          </div>
        )}

        {/* ====================================================== */}
        {/* MESSAGE */}
        {/* ====================================================== */}

        <div
          className={`rounded-2xl px-5 py-4 leading-7 ${
            isUser
              ? "max-w-3xl bg-cyan-600 text-white"
              : "w-full border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)]"
          }`}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
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

        {/* ====================================================== */}
        {/* COPY BUTTON */}
        {/* ====================================================== */}

        {!isUser && content && (
          <div className="-mt-1 pr-4 flex justify-end">
            <button
              onClick={copyMessage}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--cp-text-muted)] transition hover:bg-[var(--cp-bg-tertiary)]"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} />
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
