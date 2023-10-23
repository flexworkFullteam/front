import { projectAPI } from "../api/projectAPI";

export const getCandidateById = async (id) => {
  try {
    const { data } = await projectAPI.get(`/project/${id}/postulate`);
    return data;
  } catch (error) {
    alert(error.message);
  }
};

export const acceptCandidate = async (projectID, professionalID) => {
  try {
    await projectAPI.put(`/project/${projectID}/accepted/${professionalID}`);
  } catch (error) {
    alert(error.message);
  }
};

export const refuseCandidate = async (projectID, professionalID) => {
  try {
    await projectAPI.put(`/project/${projectID}/refuced/${professionalID}`);
  } catch (error) {
    alert(error.message);
  }
};

export const applyCandidate = async (professionalID, projectID) => {
  try {
    await projectAPI.put(`/professional/${professionalID}/${projectID}`);
  } catch (error) {
    alert(error.message);
  }
};
