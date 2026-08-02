import { createContext, useContext, useEffect, useState } from "react";

import { getSkills, createSkill } from "../services/skillService";

const SkillsContext = createContext(null);

export function SkillsProvider({ children }) {
  //------------------------------------------------------

  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  //------------------------------------------------------

  async function loadSkills() {
    try {
      setLoading(true);

      setError("");

      const response = await getSkills();

      setSkills(response.skills ?? []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------

  async function addSkill(payload) {
    try {
      setSaving(true);

      await createSkill(payload);

      await loadSkills();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  //------------------------------------------------------

  useEffect(() => {
    loadSkills();
  }, []);

  //------------------------------------------------------

  return (
    <SkillsContext.Provider
      value={{
        skills,
        loading,
        saving,
        error,

        loadSkills,
        addSkill,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
}

export function useSkillsContext() {
  return useContext(SkillsContext);
}
