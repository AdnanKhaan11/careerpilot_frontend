import { Paperclip } from "lucide-react";

export default function AttachmentButton() {
  return (
    <button
      className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      border
      border-[var(--cp-border)]
      hover:bg-[var(--cp-bg-tertiary)]
      transition
    "
    >
      <Paperclip size={18} />
    </button>
  );
}
