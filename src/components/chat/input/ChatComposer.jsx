import { useRef, useState } from "react";

import { useChatContext } from "../../../context/ChatContext";
import { useToast } from "../../../context/ToastContext";
import { ATTACHMENTS } from "../../../constants/ui";

import AttachmentButton from "./AttachmentButton";
import AttachmentPreviewList from "./AttachmentPreviewList";
import ComposerToolbar from "./ComposerToolbar";
import SendButton from "./SendButton";

export default function ChatComposer() {
  const { submitMessage, sending } = useChatContext();
  const { showToast } = useToast() ?? {};

  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

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
  // Attachments
  //----------------------------------------------------

  const handleFilesSelected = (files) => {
    const maxSizeBytes = ATTACHMENTS.MAX_FILE_SIZE_MB * 1024 * 1024;

    const accepted = [];

    for (const file of files) {
      if (file.size > maxSizeBytes) {
        showToast?.(
          `${file.name} is larger than ${ATTACHMENTS.MAX_FILE_SIZE_MB}MB.`,
          "error",
        );
        continue;
      }

      accepted.push(file);
    }

    setAttachments((previous) => {
      const combined = [...previous, ...accepted];

      if (combined.length > ATTACHMENTS.MAX_FILES) {
        showToast?.(
          `You can attach up to ${ATTACHMENTS.MAX_FILES} files at a time.`,
          "error",
        );
      }

      return combined.slice(0, ATTACHMENTS.MAX_FILES);
    });
  };

  const removeAttachment = (index) => {
    setAttachments((previous) => previous.filter((_, i) => i !== index));
  };

  //----------------------------------------------------

  const handleSend = async () => {
    if ((!message.trim() && attachments.length === 0) || sending) return;

    const text = message;
    const files = attachments;

    setMessage("");
    setAttachments([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "52px";
    }

    await submitMessage(text, files);
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
          focus-within:border-[var(--cp-border)]
        "
      >
        {/* ============================ */}
        {/* Attachment Previews */}
        {/* ============================ */}

        <AttachmentPreviewList
          files={attachments}
          onRemove={removeAttachment}
        />

        {/* ============================ */}
        {/* Input */}
        {/* ============================ */}

        <div className="flex items-end gap-3 px-4 pt-4">
          <AttachmentButton
            onFilesSelected={handleFilesSelected}
            disabled={sending || attachments.length >= ATTACHMENTS.MAX_FILES}
            count={attachments.length}
          />

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
              focus-visible:outline-none
              focus-visible:ring-0
              placeholder:text-[var(--cp-text-muted)]
            "
          />

          <SendButton
            disabled={!message.trim() && attachments.length === 0}
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
