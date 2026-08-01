export default function Logo() {
  return (
    <div className="flex h-[72px] items-center justify-center border-b border-[var(--cp-border)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cp-accent)] text-lg font-bold text-white">
          C
        </div>

        <div>
          <h2 className="text-lg font-bold">CareerPilot</h2>

          <p className="text-xs text-[var(--cp-text-muted)]">
            AI Career Assistant
          </p>
        </div>
      </div>
    </div>
  );
}
