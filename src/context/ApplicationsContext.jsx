import { createContext, useContext, useEffect, useState } from "react";

import { getApplications } from "../services/applicationService";

const ApplicationsContext = createContext(null);

export function ApplicationsProvider({ children }) {
  //------------------------------------------------------
  // State
  //------------------------------------------------------

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  //------------------------------------------------------
  // Load Applications
  //------------------------------------------------------

  async function loadApplications(status = statusFilter) {
    try {
      setLoading(true);

      setError("");

      const response = await getApplications(status);

      setApplications(response.applications ?? []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------
  // Refresh
  //------------------------------------------------------

  async function refreshApplications() {
    await loadApplications(statusFilter);
  }

  //------------------------------------------------------
  // Initial Load
  //------------------------------------------------------

  useEffect(() => {
    loadApplications();
  }, []);

  //------------------------------------------------------

  const value = {
    applications,

    loading,

    error,

    statusFilter,

    setStatusFilter,

    loadApplications,

    refreshApplications,
  };

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export function useApplicationsContext() {
  return useContext(ApplicationsContext);
}
