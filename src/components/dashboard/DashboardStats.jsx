import { MessageSquare, Briefcase, Brain, BookOpen } from "lucide-react";

import { useDashboardContext } from "../../context/DashboardContext";

export default function DashboardStats() {
  const { dashboard, loading } = useDashboardContext();

  const stats = dashboard?.stats;

  const cards = [
    {
      title: "Conversations",
      value: stats?.conversations ?? 0,
      icon: MessageSquare,
    },
    {
      title: "Applications",
      value: stats?.applications ?? 0,
      icon: Briefcase,
    },
    {
      title: "Skills",
      value: stats?.skills ?? 0,
      icon: BookOpen,
    },
    {
      title: "Memories",
      value: stats?.memories ?? 0,
      icon: Brain,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border
              border-[var(--cp-border)]
              bg-[var(--cp-bg-secondary)]
              p-6
              shadow-lg
              transition
              hover:border-cyan-500/50
              hover:shadow-cyan-500/10
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--cp-text-muted)]">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {loading ? "—" : card.value}
                </h2>
              </div>

              <div className="rounded-2xl bg-cyan-500/10 p-4">
                <Icon size={28} className="text-cyan-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
