import MessageBubble from "./MessageBubble";

export default function AssistantMessage({ message }) {
  return (
    <div className="flex w-full justify-start">
      <div className="w-full max-w-4xl">
        <MessageBubble
          role="assistant"
          content={message.content}
          streaming={message.streaming}
        />
      </div>
    </div>
  );
}
