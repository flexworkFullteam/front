import { useDispatch, useSelector } from "react-redux";
import {
  onLoadingProjects,
  onGetAllProjects,
  onAddProject,
  onSetActiveEvent,
} from "../store/project/projectSlice";
import { projectAPI } from "../api/projectAPI";

export const useProjectStore = () => {
  const dispatch = useDispatch();
  const { projects, allProjects, isLoading, activeEvent } = useSelector(
    (state) => state.project
  );

  const startLoadingProject = async () => {
    try {
      dispatch(onLoadingProjects());
      const { data } = await projectAPI(`/projects`);
      dispatch(onGetAllProjects(data));
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  };

  const startAddProject = async (project) => {
    try {
      dispatch(onLoadingProjects());
      const { data } = await projectAPI.post(`/project`, project);
      dispatch(onAddProject(data));
      alert("Proyecto creado");
    } catch (error) {
      // console.error(error);
      alert(error.message);
    }
  };

  const getProjectById = async (id) => {
    try {
      const { data } = await projectAPI(`/project/${id}`);
      dispatch(onSetActiveEvent(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      await projectAPI.delete(`/project/${id}`);
    } catch (error) {
      alert(error.message);
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
