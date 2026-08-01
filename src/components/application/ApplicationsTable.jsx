import { useApplicationsContext } from "../../context/ApplicationsContext";
import ApplicationRow from "./ApplicationRow";

export default function ApplicationsTable() {
  const { applications, loading } = useApplicationsContext();

  if (loading) {
    return (
      <div className="rounded-2xl border border-[var(--cp-border)] p-8 text-center">
        Loading applications...
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--cp-border)] p-10 text-center text-[var(--cp-text-muted)]">
        No applications found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--cp-border)]">
      <table className="w-full">
        <thead className="bg-[var(--cp-bg-secondary)]">
          <tr>
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Applied</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <ApplicationRow key={application.id} application={application} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
