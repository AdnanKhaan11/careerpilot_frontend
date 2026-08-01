import api from "./api";

//------------------------------------------------------
// Profile
//------------------------------------------------------

export async function getProfile() {
  const response = await api.get("/memory/profile");

  return response.data;
}

export async function updateProfile(content) {
  const response = await api.put("/memory/profile", {
    content,
  });

  return response.data;
}

//------------------------------------------------------
// Notes
//------------------------------------------------------

export async function getNotes(query = "") {
  const response = await api.get("/memory/notes", {
    params: {
      query,
    },
  });

  return response.data;
}
