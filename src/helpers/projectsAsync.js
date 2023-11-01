import { projectAPI } from "../api/projectAPI";
import Swal from 'sweetalert2';

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
    return Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Proyecto creado satisfactoriamente',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: error.message,
      showConfirmButton: false,
      timer: 1500
    })
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
