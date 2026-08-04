import { Outlet } from "react-router-dom";

import Header from "./Header";
import PageContainer from "./PageContainer";

import ChatWorkspace from "../../components/chat/layout/ChatWorkspace";

export default function MainContent() {
  return (
    <main
      className="
        flex
        h-full
        min-w-0
        overflow-hidden
        bg-[var(--cp-bg-primary)]
      "
    >
      {/* ================================================= */}
      {/* CENTER WORKSPACE */}
      {/* ================================================= */}

      <section
        className="
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        <Header />

        <PageContainer className="flex-1">
          <Outlet />
        </PageContainer>
      </section>

      {/* ================================================= */}
      {/* RIGHT AI CHAT */}
      {/* ================================================= */}

      <aside
        className="
          hidden
          xl:flex
          xl:w-[430px]
          2xl:w-[460px]
          shrink-0
          flex-col
          overflow-hidden
          border-l
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
        "
      >
        {/* Chat Header */}

        <div
          className="
            flex
            h-[72px]
            shrink-0
            items-center
            border-b
            border-[var(--cp-border)]
            px-6
          "
        >
          <div>
            <h2 className="text-lg font-semibold">AI Chat</h2>

            <p className="text-xs text-[var(--cp-text-muted)]">
              CareerPilot Assistant
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <ChatWorkspace />
        </div>
      </aside>
    </main>
  );
}
