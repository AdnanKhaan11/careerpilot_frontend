import { useChatContext } from "../../../context/ChatContext";
import useAutoScroll from "../../../hooks/useAutoScroll";

import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

export default function MessageList() {
  const { messages } = useChatContext();

  const bottomRef = useAutoScroll(messages);

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-[var(--cp-text-primary)]">
            Start a Conversation
          </h3>

          <p className="mt-2 text-sm text-[var(--cp-text-secondary)]">
            Ask CareerPilot anything about your career, resume, skills, jobs,
            learning roadmap, or applications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        flex
        w-full
        max-w-4xl
        flex-col
        gap-8
        pb-8
      "
    >
      {messages.map((message, index) =>
        message.role === "user" ? (
          <UserMessage key={message.id ?? index} message={message} />
        ) : (
          <AssistantMessage key={message.id ?? index} message={message} />
        ),
      )}

      <div ref={bottomRef} className="h-2" />
    </div>
  );
}
