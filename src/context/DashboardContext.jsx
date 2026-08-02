import { createContext, useContext, useEffect, useState } from "react";

import { getDashboard } from "../services/dashboardService";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  //------------------------------------------------------
  // State
  //------------------------------------------------------

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  //------------------------------------------------------
  // Load Dashboard
  //------------------------------------------------------

  async function loadDashboard() {
    try {
      setLoading(true);

      setError("");

      const response = await getDashboard();

      setDashboard(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  //------------------------------------------------------

  useEffect(() => {
    loadDashboard();
  }, []);

  //------------------------------------------------------

  const value = {
    dashboard,

    loading,

    error,

    loadDashboard,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  return useContext(DashboardContext);
}
