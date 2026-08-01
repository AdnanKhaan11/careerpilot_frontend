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
  // Auto resize textarea
  //----------------------------------------------------

  const autoResize = () => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  //----------------------------------------------------
  // Input change
  //----------------------------------------------------

  const handleChange = (event) => {
    setMessage(event.target.value);

    autoResize();
  };

  //----------------------------------------------------
  // Send message
  //----------------------------------------------------

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    const text = message;

    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "56px";
    }

    await submitMessage(text);
  };

  //----------------------------------------------------
  // Enter to send
  //----------------------------------------------------

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSend();
    }
  };

  //----------------------------------------------------

  return (
    <section
      className="
        mt-10
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-5
        shadow-xl
      "
    >
      <div className="flex gap-4">
        <AttachmentButton />

        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={4000}
          disabled={sending}
          placeholder="Ask CareerPilot anything..."
          className="
            min-h-[56px]
            flex-1
            resize-none
            bg-transparent
            outline-none
            placeholder:text-[var(--cp-text-muted)]
            disabled:opacity-60
          "
        />

        <SendButton
          disabled={!message.trim()}
          loading={sending}
          onClick={handleSend}
        />
      </div>

      <ComposerToolbar length={message.length} />
    </section>
  );
}
