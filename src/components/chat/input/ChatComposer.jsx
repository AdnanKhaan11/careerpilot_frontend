import { useRef, useState } from "react";

import { useChatContext } from "../../../context/ChatContext";

import AttachmentButton from "./AttachmentButton";
import ComposerToolbar from "./ComposerToolbar";
import SendButton from "./SendButton";

export default function ChatComposer() {
  const { submitMessage, sending } = useChatContext();

  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);

  //----------------------------------------------------
  // Auto Resize
  //----------------------------------------------------

  const autoResize = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  //----------------------------------------------------

  const handleChange = (event) => {
    setMessage(event.target.value);
    autoResize();
  };

  //----------------------------------------------------

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    const text = message;

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
    }

    await submitMessage(text);
  };

  //----------------------------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  //----------------------------------------------------

  return (
    <section className="w-full">
      <div
        className="
          rounded-2xl
          border
          border-[var(--cp-border)]
          bg-[var(--cp-bg-primary)]
          shadow-lg
          transition-all
          duration-200
          focus-within:border-cyan-500/40
          focus-within:shadow-cyan-500/10
        "
      >
        {/* ============================ */}
        {/* Input */}
        {/* ============================ */}

        <div className="flex items-end gap-3 px-4 pt-4">
          <AttachmentButton />

          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={4000}
            disabled={sending}
            placeholder="Ask CareerPilot anything..."
            className="
              min-h-[52px]
              max-h-[180px]
              flex-1
              resize-none
              overflow-y-auto
              bg-transparent
              text-[15px]
              leading-7
              outline-none
              placeholder:text-[var(--cp-text-muted)]
            "
          />

          <SendButton
            disabled={!message.trim()}
            loading={sending}
            onClick={handleSend}
          />
        </div>

        {/* ============================ */}
        {/* Footer */}
        {/* ============================ */}

        <div className="flex items-center justify-between px-4 pb-3 pt-2">
          <ComposerToolbar length={message.length} />

          <span className="text-xs text-[var(--cp-text-muted)]">
            Enter ↵ · Shift+Enter for newline
          </span>
        </div>
      </div>
    </section>
  );
}
