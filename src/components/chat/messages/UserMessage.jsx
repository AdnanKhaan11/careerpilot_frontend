import MessageBubble from "./MessageBubble";

export default function UserMessage({ message }) {
  return (
    <div className="flex w-full justify-end">
      <div className="w-full max-w-3xl">
        <MessageBubble
          role="user"
          content={message.content}
          attachments={message.attachments}
        />
      </div>
    </div>
  );
}
