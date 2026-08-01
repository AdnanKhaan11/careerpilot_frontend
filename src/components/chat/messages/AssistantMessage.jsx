import MessageBubble from "./MessageBubble";

export default function AssistantMessage({ message }) {
  return (
    <MessageBubble
      role="assistant"
      content={message.content}
      streaming={message.streaming}
    />
  );
}
