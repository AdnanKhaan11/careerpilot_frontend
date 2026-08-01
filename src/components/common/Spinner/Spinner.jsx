export default function Spinner({ size = 20 }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
