import { Trash2, AlertTriangle } from "lucide-react";

import { useSettingsContext } from "../../context/SettingsContext";

export default function DangerZoneSection() {
  const { settings, removeApiKey, removeEmbeddingApiKey } =
    useSettingsContext();

  //------------------------------------------------------

  async function handleRemoveApiKey() {
    const confirmed = window.confirm("Remove the LLM API key?");

    if (!confirmed) return;

    await removeApiKey();
  }

  //------------------------------------------------------

  async function handleRemoveEmbeddingKey() {
    const confirmed = window.confirm("Remove the Embedding API key?");

    if (!confirmed) return;

    await removeEmbeddingApiKey();
  }

  //------------------------------------------------------

  if (!settings) return null;

  return (
    <section
      className="
        rounded-3xl
        border
        border-red-500/30
        bg-red-500/5
        p-6
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-red-600 p-3 text-white">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-red-300">Danger Zone</h2>

          <p className="text-sm text-[var(--cp-text-muted)]">
            These actions cannot be undone.
          </p>
        </div>
      </div>

      {/* Buttons */}

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={handleRemoveApiKey}
          disabled={!settings.has_api_key}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500
            px-5
            py-3
            text-red-400
            transition
            hover:bg-red-500/10
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Trash2 size={18} />
          Remove API Key
        </button>

        <button
          onClick={handleRemoveEmbeddingKey}
          disabled={!settings.has_embedding_api_key}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-red-500
            px-5
            py-3
            text-red-400
            transition
            hover:bg-red-500/10
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <Trash2 size={18} />
          Remove Embedding Key
        </button>
      </div>

      {/* Status */}

      <div className="mt-6 space-y-2 text-sm">
        <div>
          LLM API Key :
          <span
            className={`ml-2 font-medium ${
              settings.has_api_key ? "text-green-400" : "text-gray-500"
            }`}
          >
            {settings.has_api_key ? "Configured" : "Not Configured"}
          </span>
        </div>

        <div>
          Embedding API Key :
          <span
            className={`ml-2 font-medium ${
              settings.has_embedding_api_key
                ? "text-green-400"
                : "text-gray-500"
            }`}
          >
            {settings.has_embedding_api_key ? "Configured" : "Not Configured"}
          </span>
        </div>
      </div>
    </section>
  );
}
