import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import MainContent from "./components/MainContent";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[var(--cp-bg-primary)] text-[var(--cp-text-primary)]">
      <Sidebar />

      <MobileSidebar />

      <MainContent />
    </div>
  );
}
