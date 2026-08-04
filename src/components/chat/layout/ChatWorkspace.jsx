import { useChatContext } from "../../../context/ChatContext";

import WelcomeHero from "./WelcomeHero";
import PromptGrid from "../prompts/PromptGrid";
import MessageList from "../messages/MessageList";
import ChatComposer from "../input/ChatComposer";

export default function ChatWorkspace() {
  const { messages } = useChatContext();

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--cp-bg-secondary)]">
      {/* ============================== */}
      {/* Conversation */}
      {/* ============================== */}

      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div
            className="
              flex
              min-h-full
              flex-col
              justify-center
              px-6
              py-10
            "
          >
            <div className="mx-auto w-full max-w-xl">
              <WelcomeHero />

              <div className="mt-8">
                <PromptGrid />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="
              mx-auto
              w-full
              max-w-3xl
              px-6
              py-8
            "
          >
            <MessageList />
          </div>
        )}
      </div>

      {/* ============================== */}
      {/* Composer */}
      {/* ============================== */}

      <div
        className="
          shrink-0
          border-t
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          px-5
          py-5
        "
      >
        <div className="mx-auto w-full max-w-3xl">
          <ChatComposer />
        </div>
      </div>
    </div>
  );
}
