import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

import { useChatContext } from "../../../context/ChatContext";

import WelcomeHero from "./WelcomeHero";
import PromptGrid from "../prompts/PromptGrid";
import MessageList from "../messages/MessageList";
import ChatComposer from "../input/ChatComposer";

export default function ChatWorkspace() {
  const { conversations, loadConversation, messages, newConversation } = useChatContext();
  const [historyOpen, setHistoryOpen] = useState(false);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--cp-bg-secondary)]">
      <div className="relative shrink-0 border-b border-[var(--cp-border)] px-5 py-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={newConversation} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--cp-border)] bg-[var(--cp-bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--cp-text-secondary)] transition hover:border-cyan-500/30 hover:text-cyan-300"><Plus size={14} />New Chat</button>
          <button type="button" onClick={() => setHistoryOpen((open) => !open)} className="inline-flex items-center gap-1 rounded-lg border border-[var(--cp-border)] px-3 py-1.5 text-xs text-[var(--cp-text-muted)] transition hover:border-cyan-500/30 hover:text-[var(--cp-text-primary)]">History<ChevronDown size={13} /></button>
        </div>
        {historyOpen && <div className="absolute left-5 right-5 top-full z-20 mt-2 max-h-52 overflow-y-auto rounded-xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-1 shadow-xl">{conversations.length ? conversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => { loadConversation(conversation.id); setHistoryOpen(false); }} className="block w-full truncate rounded-lg px-3 py-2 text-left text-xs text-[var(--cp-text-secondary)] hover:bg-[var(--cp-bg-tertiary)]">{conversation.title || "Untitled conversation"}</button>) : <p className="px-3 py-2 text-xs text-[var(--cp-text-muted)]">No conversations yet.</p>}</div>}
      </div>
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
