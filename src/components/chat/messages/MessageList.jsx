import { useChatContext } from "../../../context/ChatContext";
import useAutoScroll from "../../../hooks/useAutoScroll";

import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

export default function MessageList() {
  const { messages } = useChatContext();

  //----------------------------------------------------
  // Auto scroll whenever messages update
  //----------------------------------------------------

  const bottomRef = useAutoScroll(messages);

  //----------------------------------------------------

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-[var(--cp-text-muted)]">
        Start a new conversation.
      </div>
    );
  }

  //----------------------------------------------------

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={message.id ?? index} message={message} />
        ) : (
          <AssistantMessage key={message.id ?? index} message={message} />
        ),
      )}

      <div ref={bottomRef} />
    </div>
  );
}
