import { projectAPI } from "../api/projectAPI";

export const getCompanyById = async (id) => {
  try {
    const { data } = await projectAPI.get(`/company/${id}`);
    return data;
  } catch (error) {}
};
