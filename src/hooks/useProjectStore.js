import { useDispatch, useSelector } from "react-redux";
import { onLoadingProjects, onGetAllProjects} from "../store/project/projectSlice";
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

  

  return {
    //propiedades
    projects,
    allProjects,
    isLoading,

    //metodos
    startLoadingProject,
  };
};
