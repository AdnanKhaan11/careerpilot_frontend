import MessageBubble from "./MessageBubble";

export default function UserMessage({ message }) {
  return <MessageBubble role="user" content={message.content} />;
}
