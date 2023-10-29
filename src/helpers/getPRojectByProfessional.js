import { projectAPI } from "../api/projectAPI";

export const getProjectByProfessional = async (id) => {
  try {
    const { data } = await projectAPI.get(`/professional/${id}/projects`);
    return data;
  } catch (error) {}
};