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
        "rounded-2xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)]",

        padding && "p-6",

        hover &&
          "transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl",

        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
