import { Briefcase } from "lucide-react";

import ApplicationsStats from "../../components/application/ApplicationsStats";
import StatusFilterTabs from "../../components/application/StatusFilterTabs";
import ApplicationsTable from "../../components/application/ApplicationsTable";

export default function ApplicationsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-8">
      {/* ------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------ */}

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white">
          <Briefcase size={24} />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Applications</h1>

          <p className="mt-1 text-[var(--cp-text-muted)]">
            Track every application throughout your job search.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* Statistics */}
      {/* ------------------------------------------------ */}

      <ApplicationsStats />

      {/* ------------------------------------------------ */}
      {/* Status Filter */}
      {/* ------------------------------------------------ */}

      <StatusFilterTabs />

      {/* ------------------------------------------------ */}
      {/* Applications Table */}
      {/* ------------------------------------------------ */}

      <ApplicationsTable />
    </div>
  );
}
