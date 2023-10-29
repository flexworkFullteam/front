import { projectAPI } from "../api/projectAPI";

export const getProfessionalById = async (id) => {
  try {
    const { data } = await projectAPI.get(`/professional/${id}`);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
