import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";

import { ChatProvider } from "./ChatContext";
import { MemoryProvider } from "./MemoryContext";
import { ApplicationsProvider } from "./ApplicationsContext";
import { SettingsProvider } from "./SettingsContext";
import { SkillsProvider } from "./SkillsContext";
import { DashboardProvider } from "./DashboardContext";
import { TraceProvider } from "./TraceContext";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <ChatProvider>
            <DashboardProvider>
              <MemoryProvider>
                <ApplicationsProvider>
                  <SkillsProvider>
                    <SettingsProvider>
                      <TraceProvider>{children}</TraceProvider>
                    </SettingsProvider>
                  </SkillsProvider>
                </ApplicationsProvider>
              </MemoryProvider>
            </DashboardProvider>
          </ChatProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
