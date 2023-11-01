import { projectAPI } from "../api/projectAPI";

export const validateUser = async (id) => {
  try {
    await projectAPI.post(`/admin/valid/${id}`);
    return;
  } catch (error) {
    alert(error.message);
  }
};
