import { projectAPI } from "../api/projectAPI";

export const getCandidateById = async (id) => {
  try {
    const { data } = await projectAPI.get(`/project/${id}/postulate`);
    console.log(data);
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const acceptCandidate = async (projectID, professionalId) => {
  try {
    await projectAPI.put(`/project/${projectId}/accepted/${professionalId}`);
  } catch (error) {
    alert(error.message);
  }
};
