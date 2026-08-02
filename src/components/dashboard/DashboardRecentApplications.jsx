import { Briefcase } from "lucide-react";

import { useDashboardContext } from "../../context/DashboardContext";
import StatusBadge from "../application/StatusBadge";

export default function DashboardRecentApplications() {
  const { dashboard, loading } = useDashboardContext();

  const applications = dashboard?.recent_applications ?? [];

  return (
    <section
      className="
       min-h-[430px]
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-6
        shadow-lg
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-500/10 p-3">
          <Briefcase size={22} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Recent Applications</h2>

          <p className="mt-3 text-sm leading-6  text-[var(--cp-text-muted)]">
            Your latest job applications
          </p>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div className="py-8 text-center text-[var(--cp-text-muted)]">
          Loading applications...
        </div>
      )}

      {/* Empty */}

      {!loading && applications.length === 0 && (
        <div className="py-8 text-center text-[var(--cp-text-muted)]">
          No applications found.
        </div>
      )}

      {/* Table */}

      {!loading && applications.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--cp-border)] text-left text-sm text-[var(--cp-text-muted)]">
                <th className="pb-3">Company</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Applied</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application, index) => (
                <tr
                  key={index}
                  className="border-b border-[var(--cp-border)] last:border-none"
                >
                  <td className="py-4 font-medium">{application.company}</td>

                  <td>{application.role}</td>

                  <td>
                    <StatusBadge status={application.status} />
                  </td>

                  <td className="text-[var(--cp-text-muted)]">
                    {application.date_applied}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
