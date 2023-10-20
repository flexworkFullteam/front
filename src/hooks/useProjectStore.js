import { useDispatch, useSelector } from "react-redux";
import { onLoadingProjects, onGetAllProjects, onAddProject} from "../store/project/projectSlice";
import { projectAPI } from "../api/projectAPI";

export const useProjectStore = () => {
  const dispatch = useDispatch();
  const { projects, allProjects, isLoading } = useSelector((state) => state.project);

  const startLoadingProject = async () => {
    try {
      dispatch(onLoadingProjects());
      const { data } = await projectAPI(`/projects`);
      dispatch(onGetAllProjects(data));
    } catch (error) {
      alert(error.message);
    }
  };

  const startAddProject = async (project) => {    
    try {
      dispatch(onLoadingProjects());
      const { data } = await projectAPI.post(`/project`, project);
      dispatch(onAddProject(data));

    } catch (error) {
      alert(error.message);
    }  
  }

  return {
    //propiedades
    projects,
    allProjects,
    isLoading,

    //metodos
    startLoadingProject,
    startAddProject,
  };
};
