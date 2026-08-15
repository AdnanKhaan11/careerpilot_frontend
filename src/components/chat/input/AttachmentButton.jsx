import { useRef } from "react";
import { Paperclip } from "lucide-react";

import { ATTACHMENTS } from "../../../constants/ui";

export default function AttachmentButton({
  onFilesSelected,
  disabled = false,
  count = 0,
}) {
  const inputRef = useRef(null);

  const openPicker = () => inputRef.current?.click();

  const handleChange = (event) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length) {
      onFilesSelected?.(files);
    }

    // Reset so selecting the exact same file again still fires onChange.
    event.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ATTACHMENTS.ACCEPT}
        onChange={handleChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={openPicker}
        disabled={disabled}
        aria-label="Attach a document"
        title="Attach a document"
        className="
          relative
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-[var(--cp-border)]
          transition
          hover:bg-[var(--cp-bg-tertiary)]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <Paperclip size={18} />

        {count > 0 && (
          <span
            className="
              absolute
              -right-1.5
              -top-1.5
              flex
              h-4
              min-w-4
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              px-1
              text-[10px]
              font-semibold
              text-white
            "
          >
            {count}
          </span>
        )}
      </button>
    </>
  );
}
