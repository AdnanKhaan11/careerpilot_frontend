import { createContext, useContext, useEffect, useState } from "react";

import {
  getTrace,
  getTraceMetrics,
  getTraces,
} from "../services/traceService";

const TraceContext = createContext(null);

export function TraceProvider({ children }) {
  const [traces, setTraces] = useState([]);

  const [activeTrace, setActiveTrace] = useState(null);

  const [metrics, setMetrics] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function loadTraces() {
    try {
      setLoading(true);

      setError("");

      const response = await getTraces();

      setTraces(Array.isArray(response) ? response : []);
    } catch (error) {
      setTraces([]);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function selectTrace(traceId) {
    try {
      setLoading(true);

      setError("");

      const [trace, traceMetrics] = await Promise.all([
        getTrace(traceId),
        getTraceMetrics(traceId),
      ]);

      setActiveTrace(trace);

      setMetrics(traceMetrics);
    } catch (error) {
      setActiveTrace(null);

      setMetrics(null);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTraces();
  }, []);

  return (
    <TraceContext.Provider
      value={{
        traces,
        activeTrace,
        metrics,
        loading,
        error,
        loadTraces,
        selectTrace,
      }}
    >
      {children}
    </TraceContext.Provider>
  );
}

export function useTraceContext() {
  return useContext(TraceContext);
}
