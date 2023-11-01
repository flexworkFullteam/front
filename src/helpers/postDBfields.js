import { projectAPI } from "../api/projectAPI";

export const postDBfields = async (route, id, data) => {
  try {
    await projectAPI.post(`${route}/${id}`, data);
    return alert("Campo creado satisfactoriamente");
  } catch (error) {}
};
