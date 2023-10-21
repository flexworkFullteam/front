import { projectAPI } from "../api/projectAPI";

export const getCompanyProjects = async (id) => {
  try {
    const { data } = await projectAPI.get(`/projects/${id}`);
    return data;
  } catch (error) {
    alert(error.message);
  }
};
