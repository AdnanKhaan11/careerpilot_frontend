import { useEffect, useState } from "react";
import { Briefcase, Save, Loader2 } from "lucide-react";

import { useSettingsContext } from "../../context/SettingsContext";

const AVAILABLE_PLATFORMS = [
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "Wellfound",
  "Google Jobs",
];

export default function JobSearchSection() {
  const { settings, saveSettings, saving } = useSettingsContext();

  //------------------------------------------------------

  const [location, setLocation] = useState("");

  const [platforms, setPlatforms] = useState([]);

  //------------------------------------------------------

  useEffect(() => {
    if (!settings) return;

    setLocation(settings.job_search_default_location ?? "");

    setPlatforms(settings.job_search_platforms ?? []);
  }, [settings]);

  //------------------------------------------------------

  function togglePlatform(platform) {
    setPlatforms((previous) =>
      previous.includes(platform)
        ? previous.filter((item) => item !== platform)
        : [...previous, platform],
    );
  }

  //------------------------------------------------------

  async function handleSave() {
    await saveSettings({
      job_search_platforms: platforms,
      job_search_default_location: location,
    });
  }

  //------------------------------------------------------

  if (!settings) return null;

  return (
    <section
      className="
        rounded-3xl
        border
        border-[var(--cp-border)]
        bg-[var(--cp-bg-secondary)]
        p-6
        shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-600 p-3 text-white">
            <Briefcase size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Job Search</h2>

            <p className="text-sm text-[var(--cp-text-muted)]">
              Configure where CareerPilot searches for jobs.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-cyan-600
            px-5
            py-3
            text-white
            transition
            hover:bg-cyan-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} />
              Save
            </>
          )}
        </button>
      </div>

      {/* Platforms */}

      <div className="mb-8">
        <label className="mb-3 block text-sm font-medium">Job Platforms</label>

        <div className="flex flex-wrap gap-3">
          {AVAILABLE_PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => togglePlatform(platform)}
              className={`rounded-xl border px-4 py-2 transition ${
                platforms.includes(platform)
                  ? "border-cyan-500 bg-cyan-600 text-white"
                  : "border-[var(--cp-border)] bg-[var(--cp-bg-primary)] hover:border-cyan-500"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Default Location */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Default Location
        </label>

        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="e.g. Pakistan, Remote, Dubai..."
          className="
            w-full
            rounded-xl
            border
            border-[var(--cp-border)]
            bg-[var(--cp-bg-primary)]
            px-4
            py-3
            outline-none
            transition
            focus:border-cyan-500
          "
        />
      </div>
    </section>
  );
}
