import { projectAPI } from "../api/projectAPI"
import Swal from 'sweetalert2';


export const finishProject = async(id) => {
    try {
        const {data} = await projectAPI.put(`/project/finish/${id}`);
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'El proyecto se ha finalizado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
    } catch (error) {
        console.log(error)
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500
        })
    }

}