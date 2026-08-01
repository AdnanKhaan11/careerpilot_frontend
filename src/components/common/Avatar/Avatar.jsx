import clsx from "clsx";

const sizes = {
  sm: "h-8 w-8 text-sm",

  md: "h-10 w-10 text-base",

  lg: "h-12 w-12 text-lg",

  xl: "h-16 w-16 text-xl",
};

export default function Avatar({
  name = "CareerPilot",
  image,
  size = "md",
  className,
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={clsx("rounded-full object-cover", sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-cyan-500 font-semibold text-white",
        sizes[size],
        className,
      )}
    >
      {initials}
    </div>
  );
}
