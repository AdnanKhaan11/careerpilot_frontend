import { useState } from "react";

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);

  const closeSidebar = () => setIsOpen(false);

  const toggleSidebar = () => setIsOpen((previous) => !previous);

  return {
    isOpen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };
}
