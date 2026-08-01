import clsx from "clsx";

export default function Divider({ vertical = false, className }) {
  return (
    <div
      className={clsx(
        vertical ? "h-full w-px" : "h-px w-full",
        "bg-[var(--cp-border)]",
        className,
      )}
    />
  );
}
