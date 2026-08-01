import StatusBadge from "./StatusBadge";

export default function ApplicationRow({ application }) {
  return (
    <tr className="border-t border-[var(--cp-border)] transition hover:bg-[var(--cp-bg-secondary)]">
      <td className="px-6 py-4 font-medium">{application.company}</td>

      <td className="px-6 py-4">{application.role}</td>

      <td className="px-6 py-4">
        <StatusBadge status={application.status} />
      </td>

      <td className="px-6 py-4 text-[var(--cp-text-muted)]">
        {application.date_applied}
      </td>
    </tr>
  );
}
