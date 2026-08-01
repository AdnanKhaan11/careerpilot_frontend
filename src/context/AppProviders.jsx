import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";
import { ChatProvider } from "./ChatContext";
import { MemoryProvider } from "./MemoryContext";
import { ApplicationsProvider } from "./ApplicationsContext";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <ChatProvider>
            <MemoryProvider>
              <ApplicationsProvider>{children}</ApplicationsProvider>
            </MemoryProvider>
          </ChatProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
