import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { onLoadingProjects, onGetAllProjects, onAddProject, onSetActiveEvent } from "../store/project/projectSlice";
import { projectAPI } from "../api/projectAPI";
import { onChecking } from "../store/auth/authSlice";

export const useProjectStore = () => {
  const dispatch = useDispatch();
  const { projects, allProjects, isLoading, activeEvent } = useSelector((state) => state.project);

  const startLoadingProject = async () => {
    try {
      // dispatch(onChecking());
      dispatch(onLoadingProjects());
      const { data } = await projectAPI(`/projects`);
      dispatch(onGetAllProjects(data));
    } catch (error) {
      console.error(error);
      // Swal.fire({
      //   position: 'top-center',
      //   icon: 'error',
      //   title: error.message,
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    }
  };

  const startAddProject = async (project) => {
    try {
      dispatch(onLoadingProjects());
      const { data } = await projectAPI.post(`/project`, project);
      dispatch(onAddProject(data));
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Proyecto creado',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      // console.error(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  const getProjectById = async (id) => {
    try {
      const { data } = await projectAPI(`/project/${id}`);
      dispatch(onSetActiveEvent(data));
    } catch (error) {
      console.error(error.message);
      // Swal.fire({
      //   position: 'top-center',
      //   icon: 'error',
      //   title: error.message,
      //   showConfirmButton: false,
      //   timer: 1500
      // })
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectAPI.delete(`/project/${id}`);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Proyecto eliminado',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: "Error al eliminar el proyecto",
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  return {
    //propiedades
    projects,
    allProjects,
    isLoading,
    activeEvent,

    //metodos
    startLoadingProject,
    startAddProject,
    deleteProject,
    getProjectById,
  };
};
