import { BookOpen } from "lucide-react";

import { useDashboardContext } from "../../context/DashboardContext";

export default function DashboardRecentSkills() {
  const { dashboard, loading } = useDashboardContext();

  const skills = dashboard?.recent_skills ?? [];

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
          <BookOpen size={22} className="text-cyan-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Recent Skills</h2>

          <p className="mt-3 leading-6 text-sm text-[var(--cp-text-muted)]">
            Latest procedural skills available to CareerPilot.
          </p>
        </div>
      </div>

      {/* Loading */}

      {loading && (
        <div className="py-8 text-center text-[var(--cp-text-muted)]">
          Loading skills...
        </div>
      )}

      {/* Empty */}

      {!loading && skills.length === 0 && (
        <div className="py-8 text-center text-[var(--cp-text-muted)]">
          No skills found.
        </div>
      )}

      {/* Skills */}

      {!loading && skills.length > 0 && (
        <div className="mt-8 space-y-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-[var(--cp-border)]
                bg-[var(--cp-bg-primary)]
                p-4
                transition
                hover:border-cyan-500/40
              "
            >
              <h3 className="font-semibold">{skill.name}</h3>

              <p className="mt-2 text-sm leading-6 text-[var(--cp-text-muted)]">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
