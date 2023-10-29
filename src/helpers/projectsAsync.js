import { projectAPI } from "../api/projectAPI";

export const getProjectByProfessional = async (id) => {
  try {
    const { data } = await projectAPI.get(`/professional/${id}/projects`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectById = async (id) => {
  try {
    const { data } = await projectAPI.get(`/project/${id}/`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postProject = async (data) => {
  try {
    await projectAPI.post(`/project`, data);
    return alert("Proyecto creado satisfactoriamente");
  } catch (error) {
    alert(error.message);
  }
};

export const getCompanyProjects = async (id) => {
  try {
    const { data } = await projectAPI.get(`/projects/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
