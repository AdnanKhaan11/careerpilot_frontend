import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { ModalProvider } from "./ModalContext";
import { ChatProvider } from "./ChatContext";
import { MemoryProvider } from "./MemoryContext";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <ChatProvider>
            <MemoryProvider>{children}</MemoryProvider>
          </ChatProvider>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
