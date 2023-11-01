import { projectAPI } from "../api/projectAPI";

export const getCandidateByProjectId = async (id) => {
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
    alert("tu postulacion esta siendo enviada")
  } catch (error) {
    alert(error.response.data.message);
    console.log(error.response.data.message);

  }
};
