import { projectAPI } from "../api/projectAPI"


export const finishProject = async(id) => {
    try {
        const {data} = await projectAPI.put(`/project/finish/${id}`);
        alert('El proyecto se ha finalizado correctamente');
    } catch (error) {
        console.log(error)
    }

}