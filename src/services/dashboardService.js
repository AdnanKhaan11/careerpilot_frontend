import api from "./api";

//------------------------------------------------------
// Dashboard
//------------------------------------------------------

export async function getDashboard() {
  const response = await api.get("/dashboard");

  return response.data;
}
