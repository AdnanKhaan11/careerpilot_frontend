import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { getProfile, updateProfile, getNotes } from "../services/memoryService";

const MemoryContext = createContext(null);

export function MemoryProvider({ children }) {
  //------------------------------------------------------
  // State
  //------------------------------------------------------

  const [profile, setProfile] = useState("");

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [profileLoading, setProfileLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  //------------------------------------------------------
  // Load profile
  //------------------------------------------------------

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      setProfileLoading(true);

      const response = await getProfile();

      setProfile(response.content ?? "");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);

      setProfileLoading(false);
    }
  }, []);

  //------------------------------------------------------
  // Load notes
  //------------------------------------------------------

  const loadNotes = useCallback(async (query = "") => {
    try {
      setLoading(true);

      const response = await getNotes(query);

      setNotes(response.notes ?? []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  //------------------------------------------------------
  // Save profile
  //------------------------------------------------------

  const saveProfile = useCallback(async (content) => {
    try {
      setSaving(true);

      await updateProfile(content);

      setProfile(content);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }, []);

  //------------------------------------------------------
  // Initial Load
  //------------------------------------------------------

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  //------------------------------------------------------

  const value = {
    profile,
    notes,
    loading,
    profileLoading,
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
