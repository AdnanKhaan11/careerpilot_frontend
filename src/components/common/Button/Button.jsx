import clsx from "clsx";

const variants = {
  primary: "bg-cyan-500 hover:bg-cyan-400 text-white",

  secondary:
    "bg-[var(--cp-bg-secondary)] border border-[var(--cp-border)] hover:bg-[var(--cp-bg-tertiary)]",

  ghost: "hover:bg-[var(--cp-bg-tertiary)]",

  danger: "bg-red-500 hover:bg-red-400 text-white",

  success: "bg-green-600 hover:bg-green-500 text-white",
};

const sizes = {
  sm: "h-9 px-3 text-sm",

  md: "h-11 px-5",

  lg: "h-12 px-7 text-lg",
};

export default function Button({
  children,

  variant = "primary",

  size = "md",

  fullWidth = false,

  loading = false,

  icon,

  className,

  ...props
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        loading && "cursor-not-allowed opacity-60",

        className,
      )}
      disabled={loading}
      {...props}
    >
      {icon}

      {children}
    </button>
  );
}
