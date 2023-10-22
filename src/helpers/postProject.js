import { projectAPI } from "../api/projectAPI";

export const postProject = async (data) => {
  try {
    await projectAPI.post(`/project`, data);
    return alert("Proyecto creado satisfactoriamente");
  } catch (error) {
    alert(error.message);
  }
};
