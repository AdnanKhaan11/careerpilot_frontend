import api from "./api";

//------------------------------------------------------
// Get Settings
//------------------------------------------------------

export async function getSettings() {
  const response = await api.get("/settings");

  return response.data;
}

//------------------------------------------------------
// Update Settings
//------------------------------------------------------

export async function updateSettings(payload) {
  const response = await api.patch("/settings", payload);

  return response.data;
}

//------------------------------------------------------
// Delete LLM API Key
//------------------------------------------------------

export async function deleteApiKey() {
  const response = await api.delete("/settings/api-key");

  return response.data;
}

//------------------------------------------------------
// Delete Embedding API Key
//------------------------------------------------------

export async function deleteEmbeddingApiKey() {
  const response = await api.delete("/settings/embedding-api-key");

  return response.data;
}
