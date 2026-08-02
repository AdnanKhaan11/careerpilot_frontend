import api from "./api";

//------------------------------------------------------
// Get Skills
//------------------------------------------------------

export async function getSkills() {
  const response = await api.get("/skills");

  return response.data;
}

//------------------------------------------------------
// Create Skill
//------------------------------------------------------

export async function createSkill(payload) {
  const response = await api.post("/skills", payload);

  return response.data;
}
