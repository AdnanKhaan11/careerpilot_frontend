import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition-all
        duration-200

        ${
          isActive
            ? "bg-[var(--cp-accent)] text-white"
            : "text-[var(--cp-text-secondary)] hover:bg-[var(--cp-bg-tertiary)] hover:text-[var(--cp-text-primary)]"
        }
      `
      }
    >
      <Icon size={20} />

      <span>{title}</span>
    </NavLink>
  );
}
