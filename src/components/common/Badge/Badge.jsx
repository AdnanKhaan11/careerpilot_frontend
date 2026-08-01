import clsx from "clsx";

const variants = {
  primary: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",

  success: "bg-green-500/15 text-green-400 border-green-500/30",

  warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",

  danger: "bg-red-500/15 text-red-400 border-red-500/30",

  gray: "bg-white/5 text-gray-300 border-white/10",
};

export default function Badge({ children, variant = "primary", className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
