import { projectAPI } from "../api/projectAPI";

export const GetAllProjects = async () => {
  try {
    const { data } = await projectAPI.get(`/projects`);
    return data;
  } catch (error) {}
};

export const GetAllCompanies = async () => {
  try {
    const { data } = await projectAPI.get(`/company`);
    return data;
  } catch (error) {}
};

export const GetAllProfessionals = async () => {
  try {
    const { data } = await projectAPI.get(`/professional`);
    return data;
  } catch (error) {}
};
