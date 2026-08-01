import { createContext, useContext, useEffect, useState } from "react";

import { getProfile, updateProfile, getNotes } from "../services/memoryService";

const MemoryContext = createContext(null);

export function MemoryProvider({ children }) {
  //------------------------------------------------------
  // State
  //------------------------------------------------------

  const [profile, setProfile] = useState("");

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  //------------------------------------------------------
  // Load profile
  //------------------------------------------------------

  async function loadProfile() {
    try {
      setLoading(true);

      const response = await getProfile();

      setProfile(response.content ?? "");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------
  // Load notes
  //------------------------------------------------------

  async function loadNotes(query = "") {
    try {
      setLoading(true);

      const response = await getNotes(query);

      setNotes(response.notes ?? []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------
  // Save profile
  //------------------------------------------------------

  async function saveProfile(content) {
    try {
      setSaving(true);

      await updateProfile(content);

      setProfile(content);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  //------------------------------------------------------
  // Initial Load
  //------------------------------------------------------

  useEffect(() => {
    loadProfile();
    loadNotes();
  }, []);

  //------------------------------------------------------

  const value = {
    profile,
    notes,
    loading,
    saving,
    error,

    setProfile,

    loadProfile,
    loadNotes,
    saveProfile,
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
}

export function useMemoryContext() {
  return useContext(MemoryContext);
}
