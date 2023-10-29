import { useSelector } from "react-redux";
import { NavCompany } from "../../components/NavCompany.jsx/NavCompany";
import { ProfessionalComponent } from "../../components/Account/ProfessionalComponent";
import { PostulatedProjects } from "../../components/Projects/PostulatedProjects";

export const ProfessionalPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      <NavCompany />
      {
        isComponent === "proyectos" ? <PostulatedProjects /> : <ProfessionalComponent /> 
      }
    </>
  );
};
