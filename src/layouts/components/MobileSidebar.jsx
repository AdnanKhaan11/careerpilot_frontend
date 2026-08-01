import { AnimatePresence, motion } from "framer-motion";

import navigation from "../../data/navigation";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

import useSidebar from "../../hooks/useSidebar";

export default function MobileSidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

          <motion.aside
            className="fixed left-0 top-0 z-50 flex h-screen w-[280px] flex-col border-r border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] lg:hidden"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.25 }}
          >
            <Logo />

            <nav className="flex flex-1 flex-col gap-2 p-4">
              {navigation.map((item) => (
                <div key={item.id} onClick={closeSidebar}>
                  <SidebarItem {...item} />
                </div>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
