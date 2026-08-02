import { useNavigate } from "react-router-dom";

import {
  MessageSquare,
  Briefcase,
  Brain,
  BookOpen,
  Settings,
} from "lucide-react";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "New Chat",
      description: "Start a new AI conversation",
      icon: MessageSquare,
      path: "/",
    },
    {
      title: "Applications",
      description: "Manage job applications",
      icon: Briefcase,
      path: "/applications",
    },
    {
      title: "Memory",
      description: "View long-term memory",
      icon: Brain,
      path: "/memory",
    },
    {
      title: "Skills",
      description: "Browse procedural skills",
      icon: BookOpen,
      path: "/skills",
    },
    {
      title: "Settings",
      description: "Configure CareerPilot",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <section className="min-h-[430px] h-full rounded-3xl border border-[var(--cp-border)] bg-[var(--cp-bg-secondary)] p-6 shadow-lg">
      <div className="mb-10">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <p className="mt-1 text-sm text-[var(--cp-text-muted)]">
          Frequently used shortcuts.
        </p>
      </div>

      <div className="mt-2 grid gap-5 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="
                flex
                min-h-[120px]
                items-center
                gap-4
                rounded-2xl
                border
                border-[var(--cp-border)]
                bg-[var(--cp-bg-primary)]
                p-5
                text-left
                transition-all
                duration-200
                hover:-translate-y-1
                hover:border-cyan-500
                hover:shadow-xl
                hover:shadow-cyan-500/10
              "
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Icon size={24} className="text-cyan-400" />
              </div>

              <div>
                <h3 className="font-semibold">{action.title}</h3>

                <p className="mt-2 text-sm text-[var(--cp-text-muted)]">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
