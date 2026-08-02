import { useEffect, useState } from "react";
import { Database, Save, Loader2 } from "lucide-react";

import { useSettingsContext } from "../../context/SettingsContext";

export default function EmbeddingSection() {
  const { settings, saveSettings, saving } = useSettingsContext();

  //------------------------------------------------------

  const [form, setForm] = useState({
    embedding_provider: "",
    embedding_model: "",
    embedding_api_key: "",
  });

  //------------------------------------------------------

  useEffect(() => {
    if (!settings) return;

    setForm({
      embedding_provider: settings.embedding_provider ?? "",
      embedding_model: settings.embedding_model ?? "",
      embedding_api_key: "",
    });
  }, [settings]);

  //------------------------------------------------------

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  //------------------------------------------------------

  async function handleSave() {
    await saveSettings(form);
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
            <Database size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Embedding Model</h2>

            <p className="text-sm text-[var(--cp-text-muted)]">
              Configure the embedding provider used for semantic search and
              memory.
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

      {/* Form */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Provider */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Embedding Provider
          </label>

          <input
            name="embedding_provider"
            value={form.embedding_provider}
            onChange={handleChange}
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

        {/* Model */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Embedding Model
          </label>

          <input
            name="embedding_model"
            value={form.embedding_model}
            onChange={handleChange}
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

        {/* API Key */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Embedding API Key
          </label>

          <input
            type="password"
            name="embedding_api_key"
            value={form.embedding_api_key}
            onChange={handleChange}
            placeholder={
              settings.has_embedding_api_key
                ? "Embedding API key already configured"
                : "Enter embedding API key"
            }
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

          {settings.has_embedding_api_key && (
            <p className="mt-2 text-sm text-green-400">
              ✓ Embedding API key configured
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
