import clsx from "clsx";

export default function Card({
  children,
  hover = false,
  padding = true,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        `
          relative
          overflow-hidden
          rounded-3xl
          border
          border-[var(--cp-border)]
          bg-[var(--cp-bg-secondary)]
          backdrop-blur-xl
          shadow-sm
        `,

        padding && "p-6",

        hover &&
          `
            transition-all
            duration-300
            ease-out
            hover:-translate-y-1
            hover:border-cyan-500/40
            hover:shadow-2xl
            hover:shadow-cyan-500/10
          `,

        className,
      )}
      {...props}
    >
      {/* Glass highlight */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />

      {/* Glow on hover */}

      {hover && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-300
            hover:opacity-100
            bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_70%)]
          "
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
