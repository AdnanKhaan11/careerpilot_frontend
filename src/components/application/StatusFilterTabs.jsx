import { useApplicationsContext } from "../../context/ApplicationsContext";

const STATUS = ["", "Applied", "Interview", "Offer", "Rejected", "Withdrawn"];

export default function StatusFilterTabs() {
  const { statusFilter, setStatusFilter, loadApplications } =
    useApplicationsContext();

  //----------------------------------------------------

  async function handleClick(status) {
    setStatusFilter(status);

    await loadApplications(status);
  }

  //----------------------------------------------------

  return (
    <div className="flex flex-wrap gap-3">
      {STATUS.map((status) => {
        const active = status === statusFilter;

        return (
          <button
            key={status || "all"}
            onClick={() => handleClick(status)}
            className={`rounded-xl px-4 py-2 transition ${
              active
                ? "bg-cyan-600 text-white"
                : "border border-[var(--cp-border)] hover:border-cyan-500"
            }`}
          >
            {status || "All"}
          </button>
        );
      })}
    </div>
  );
}
