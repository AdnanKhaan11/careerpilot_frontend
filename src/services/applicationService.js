import api from "./api";

//------------------------------------------------------
// Get Applications
//------------------------------------------------------

export async function getApplications(status = "") {
  const response = await api.get("/applications", {
    params: status
      ? {
          status,
        }
      : {},
  });

  return response.data;
}
