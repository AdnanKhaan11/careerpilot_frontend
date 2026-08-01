import {
  Briefcase,
  Clock3,
  MessageSquare,
  Trophy,
  XCircle,
} from "lucide-react";

import { useApplicationsContext } from "../../context/ApplicationsContext";

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-5
        transition
        hover:border-cyan-500
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--cp-text-muted)]">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsStats() {
  const { applications } = useApplicationsContext();

  const total = applications.length;

  const applied = applications.filter((a) => a.status === "Applied").length;

  const interview = applications.filter((a) => a.status === "Interview").length;

  const offer = applications.filter((a) => a.status === "Offer").length;

  const rejected = applications.filter((a) => a.status === "Rejected").length;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total"
        value={total}
        icon={Briefcase}
        color="bg-cyan-500/15 text-cyan-400"
      />

      <StatCard
        title="Applied"
        value={applied}
        icon={Clock3}
        color="bg-blue-500/15 text-blue-400"
      />

      <StatCard
        title="Interview"
        value={interview}
        icon={MessageSquare}
        color="bg-yellow-500/15 text-yellow-400"
      />

      <StatCard
        title="Offers"
        value={offer}
        icon={Trophy}
        color="bg-green-500/15 text-green-400"
      />

      <StatCard
        title="Rejected"
        value={rejected}
        icon={XCircle}
        color="bg-red-500/15 text-red-400"
      />
    </div>
  );
}
