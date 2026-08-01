export default function ComposerToolbar({ length }) {
  return (
    <div className="mt-3 flex items-center justify-between text-xs text-[var(--cp-text-muted)]">
      <span>Enter to send · Shift + Enter for new line</span>

      <span>{length} / 4000</span>
    </div>
  );
}
