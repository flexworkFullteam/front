import { projectAPI } from "../api/projectAPI";
import Swal from 'sweetalert2';

export const postDBfields = async (route, id, data) => {
  try {
    await projectAPI.post(`${route}/${id}`, data);
    return Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Campo creado satisfactoriamente',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (error) {}
};
