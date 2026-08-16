import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import PageContainer from "./PageContainer";

import ChatWorkspace from "../../components/chat/layout/ChatWorkspace";

// Must match the xl breakpoint the desktop chat rail appears at below.
const DESKTOP_RAIL_QUERY = "(min-width: 1280px)";

export default function MainContent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isChatRoute = pathname === "/chat";

  // /chat exists so mobile/tablet users (where the rail below is hidden) have
  // a way to reach the composer. If the viewport is already wide enough for
  // the rail — or gets resized past that point while /chat is open — bounce
  // back to the runtime home instead of leaving the user stuck in a
  // full-page chat view that no longer needs to exist.
  useEffect(() => {
    if (!isChatRoute) return undefined;

    const query = window.matchMedia(DESKTOP_RAIL_QUERY);

    if (query.matches) {
      navigate("/", { replace: true });
      return undefined;
    }

    const handleChange = (event) => {
      if (event.matches) navigate("/", { replace: true });
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [isChatRoute, navigate]);

  return (
    <main
      className="
        flex
        h-full
        min-w-0
        flex-1
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

        {isChatRoute ? (
          // The chat page needs a plain flex-fill container (matching the desktop
          // rail below) so ChatWorkspace can pin its composer at the bottom —
          // PageContainer's padded, independently-scrolling wrapper isn't a fit here.
          <div className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </div>
        ) : (
          <PageContainer className="flex-1">
            <Outlet />
          </PageContainer>
        )}
      </section>

      {/* ================================================= */}
      {/* RIGHT AI CHAT */}
      {/* ================================================= */}

      {!isChatRoute && (
        <>
          {/* Invisible spacer — reserves the chat rail's width in the normal
              flex flow so the center column stops in the right place, since
              the actual rail below is taken out of flow via position:fixed. */}
          <div
            aria-hidden="true"
            className="hidden shrink-0 xl:block xl:w-[430px] 2xl:w-[460px]"
          />

          <aside
            className="
              hidden
              xl:fixed
              xl:right-0
              xl:top-0
              xl:flex
              xl:h-full
              xl:w-[430px]
              2xl:w-[460px]
              z-20
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
        </>
      )}
    </main>
  );
}
