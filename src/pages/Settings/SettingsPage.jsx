import { Settings as SettingsIcon } from "lucide-react";

import { useSettingsContext } from "../../context/SettingsContext";

import ProviderSection from "../../components/settings/ProviderSection";
import EmbeddingSection from "../../components/settings/EmbeddingSection";
import JobSearchSection from "../../components/settings/JobSearchSection";
import DangerZoneSection from "../../components/settings/DangerZoneSection";

export default function SettingsPage() {
  const { loading, error } = useSettingsContext();

  //------------------------------------------------------

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-[var(--cp-text-muted)]">
          Loading settings...
        </div>
      </div>
    );
  }

  //------------------------------------------------------

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-8 py-8">
      {/* Header */}

      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-lg">
          <SettingsIcon size={28} />
        </div>

        <div>
          <h1 className="text-4xl font-bold">Settings</h1>

          <p className="mt-1 text-[var(--cp-text-muted)]">
            Configure your AI providers, embeddings and job search preferences.
          </p>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-red-300
          "
        >
          {error}
        </div>
      )}

      {/* Sections */}

      <ProviderSection />

      <EmbeddingSection />

      <JobSearchSection />

      <DangerZoneSection />
    </div>
  );
}
