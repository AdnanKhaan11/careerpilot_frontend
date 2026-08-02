import { LayoutDashboard } from "lucide-react";

import { useDashboardContext } from "../../context/DashboardContext";

import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardProviderCard from "../../components/dashboard/DashboardProviderCard";
import DashboardRecentApplications from "../../components/dashboard/DashboardRecentApplications";
import DashboardRecentSkills from "../../components/dashboard/DashboardRecentSkills";
import QuickActions from "../../components/dashboard/QuickActions";

export default function DashboardPage() {
  const { dashboard, loading, error } = useDashboardContext();

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8">
      {/* Header */}

      <header className="mb-12">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg shadow-cyan-500/20">
            <LayoutDashboard size={28} />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

            <p className="mt-2 max-w-2xl text-base leading-7 text-[var(--cp-text-muted)]">
              Welcome back. Here's an overview of your CareerPilot workspace.
            </p>
          </div>
        </div>
      </header>

      {/* Error */}

      {error && (
        <div className="mb-10 rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="rounded-3xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-10 text-center">
          Loading dashboard...
        </div>
      )}

      {/* Dashboard */}

      {!loading && dashboard && (
        <main className="flex flex-col gap-12">
          {/* Stats */}

          <DashboardStats />

          {/* Applications + Provider */}

          <section>
            <div className="grid gap-8 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <DashboardRecentApplications />
              </div>

              <div>
                <DashboardProviderCard />
              </div>
            </div>
          </section>

          {/* Skills */}

          <section>
            <DashboardRecentSkills />
          </section>

          {/* Quick Actions */}

          <section>
            <QuickActions />
          </section>
        </main>
      )}
    </div>
  );
}
