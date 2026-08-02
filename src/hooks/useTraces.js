import { useTraceContext } from "../context/TraceContext";

export default function useTraces() {
  const context = useTraceContext();

  if (!context) {
    throw new Error("useTraces must be used within a TraceProvider.");
  }

  return context;
}
