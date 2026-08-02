import { createContext, useContext, useEffect, useState } from "react";

import {
  getSettings,
  updateSettings,
  deleteApiKey,
  deleteEmbeddingApiKey,
} from "../services/settingsService";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  //------------------------------------------------------
  // State
  //------------------------------------------------------

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  //------------------------------------------------------
  // Load Settings
  //------------------------------------------------------

  async function loadSettings() {
    try {
      setLoading(true);

      setError("");

      const response = await getSettings();

      setSettings(response.settings);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------
  // Save Settings
  //------------------------------------------------------

  async function saveSettings(updatedSettings) {
    try {
      setSaving(true);

      setError("");

      const response = await updateSettings(updatedSettings);

      setSettings(response.settings);

      return response.settings;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setSaving(false);
    }
  }

  //------------------------------------------------------
  // Delete LLM API Key
  //------------------------------------------------------

  async function removeApiKey() {
    try {
      await deleteApiKey();

      await loadSettings();
    } catch (error) {
      setError(error.message);
    }
  }

  //------------------------------------------------------
  // Delete Embedding API Key
  //------------------------------------------------------

  async function removeEmbeddingApiKey() {
    try {
      await deleteEmbeddingApiKey();

      await loadSettings();
    } catch (error) {
      setError(error.message);
    }
  }

  //------------------------------------------------------
  // Initial Load
  //------------------------------------------------------

  useEffect(() => {
    loadSettings();
  }, []);

  //------------------------------------------------------

  const value = {
    settings,

    loading,

    saving,

    error,

    setSettings,

    loadSettings,

    saveSettings,

    removeApiKey,

    removeEmbeddingApiKey,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  return useContext(SettingsContext);
}
