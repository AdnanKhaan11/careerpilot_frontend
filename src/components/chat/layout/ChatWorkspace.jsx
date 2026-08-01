import { useChatContext } from "../../../context/ChatContext";

import WelcomeHero from "./WelcomeHero";
import PromptGrid from "../prompts/PromptGrid";
import MessageList from "../messages/MessageList";
import ChatComposer from "../input/ChatComposer";

export default function ChatWorkspace() {
  const { messages } = useChatContext();

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <>
            <WelcomeHero />

            <PromptGrid />
          </>
        ) : (
          <MessageList />
        )}
      </div>

      <div className="sticky bottom-0 mt-8 bg-[var(--cp-bg-primary)] pt-4">
        <ChatComposer />
      </div>
    </div>
  );
}
