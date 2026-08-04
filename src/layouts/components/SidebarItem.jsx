import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function SidebarItem({ icon: Icon, title, path }) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <motion.div
          whileHover={{
            x: 4,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className={`
            group
            relative
            flex
            items-center
            gap-4
            overflow-hidden
            rounded-2xl
            px-4
            py-3
            transition-all
            duration-300

            ${
              isActive
                ? `
                  border
                  border-cyan-500/20
                  bg-gradient-to-r
                  from-cyan-500/15
                  via-cyan-500/8
                  to-transparent
                  text-white
                  shadow-lg
                  shadow-cyan-500/10
                `
                : `
                  border
                  border-transparent
                  text-[var(--cp-text-secondary)]
                  hover:border-[var(--cp-border)]
                  hover:bg-[var(--cp-bg-secondary)]
                  hover:text-[var(--cp-text-primary)]
                `
            }
          `}
        >
          {/* Active Indicator */}

          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="
                absolute
                left-0
                top-2
                bottom-2
                w-1
                rounded-full
                bg-cyan-400
              "
            />
          )}

          {/* Icon */}

          <div
            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-cyan-500/15 text-cyan-300"
                  : "bg-[var(--cp-bg-tertiary)] group-hover:bg-cyan-500/10"
              }
            `}
          >
            <Icon size={19} />
          </div>

          {/* Title */}

          <span
            className="
              flex-1
              truncate
              text-[15px]
              font-medium
            "
          >
            {title}
          </span>

          {/* Hover Dot */}

          {!isActive && (
            <div
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                opacity-0
                transition-all
                duration-300
                group-hover:opacity-100
              "
            />
          )}
        </motion.div>
      )}
    </NavLink>
  );
}
