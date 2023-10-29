import { useSelector } from "react-redux";
import { NavCompany } from "../../components/NavCompany/NavCompany";
import { PostulatedProjects } from "../../components/Projects/PostulatedProjects";
import ProfessionalComponent from "../../components/Account/ProfessionalComponent";
export const ProfessionalPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      <NavCompany />
      {
        isComponent === "proyectos" ? <PostulatedProjects /> : < ProfessionalComponent/> 
      }
    </>
  );
};
