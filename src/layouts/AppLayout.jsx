import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import MainContent from "./components/MainContent";

export default function AppLayout() {
  return (
    <div
      className="
        flex
        h-full
        overflow-hidden
        bg-[var(--cp-bg-primary)]
        text-[var(--cp-text-primary)]
      "
    >
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main Workspace */}
      <MainContent />
    </div>
  );
}
