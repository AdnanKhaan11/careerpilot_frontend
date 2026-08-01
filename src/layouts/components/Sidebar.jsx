import { Plus } from "lucide-react";

import navigation from "../../data/navigation";

import { useChatContext } from "../../context/ChatContext";

import SidebarItem from "./SidebarItem";
import ConversationItem from "../../components/sidebar/ConversationItem";

export default function Sidebar() {
  const {
    conversations,
    activeConversation,
    loadConversation,
    newConversation,
    updateConversationTitle,
    removeConversation,
  } = useChatContext();

  return (
    <aside
      className="
        hidden
        lg:flex
        w-80
        shrink-0
        flex-col
        border-r
        border-[var(--cp-border)]
        bg-[var(--cp-bg-primary)]
      "
    >
      {/* New Chat */}

      <div className="p-4">
        <button
          onClick={newConversation}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-white transition hover:bg-cyan-600"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Navigation */}

      <nav className="px-3 space-y-1">
        {navigation.map((item) => (
          <SidebarItem key={item.id} {...item} />
        ))}
      </nav>

      {/* Conversations */}

      <div className="mt-4 flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {(Array.isArray(conversations) ? conversations : []).map(
          (conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              active={activeConversation?.id === conversation.id}
              onClick={() => loadConversation(conversation.id)}
              onRename={(title) =>
                updateConversationTitle(conversation.id, title)
              }
              onDelete={() => removeConversation(conversation.id)}
            />
          ),
        )}
      </div>
    </aside>
  );
}
