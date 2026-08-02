import api from "./api";

//------------------------------------------------------
// Traces
//------------------------------------------------------

export async function getTraces() {
  const response = await api.get("/traces");

  return response.data;
}

export async function getTrace(traceId) {
  const response = await api.get(`/traces/${traceId}`);

  return response.data;
}

export async function getTraceMetrics(traceId) {
  const response = await api.get(`/traces/${traceId}/metrics`);

  return response.data;
}

export function getTraceExportUrl(traceId, format) {
  return `${api.defaults.baseURL}/traces/${traceId}/export/${format}`;
}
