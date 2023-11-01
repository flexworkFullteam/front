import Swal from "sweetalert2";
import { projectAPI } from "../api/projectAPI";

export const getCandidateByProjectId = async (id) => {
  try {
    const { data } = await projectAPI.get(`/project/${id}/postulate`);
    return data;
  } catch (error) {
    // alert(error.message);
  }
};

export const acceptCandidate = async (projectID, professionalID) => {
  try {
    await projectAPI.put(`/project/${projectID}/accepted/${professionalID}`);
  } catch (error) {
   Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Error al aceptar al candidato",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const refuseCandidate = async (projectID, professionalID) => {
  try {
    await projectAPI.put(`/project/${projectID}/refuced/${professionalID}`);
  } catch (error) {
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "Error al rechazar al candidato",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

export const applyCandidate = async (professionalID, projectID) => {
  try {
    await projectAPI.put(`/professional/${professionalID}/${projectID}`);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Tu postulacion esta siendo enviada",
      showConfirmButton: false,
      timer: 1500,
    });

  } catch (error) {
    alert(error.response.data.message);
    // console.log(error.response.data.message);
    Swal.fire({
      position: 'top-center',
      icon: 'error',
      title: error.response.data.message,
      showConfirmButton: false,
      timer: 1500
  })

  }
};
