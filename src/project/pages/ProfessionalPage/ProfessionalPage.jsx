import { useSelector } from "react-redux";
import { NavCompany } from "../../components/NavCompany/NavCompany";
import { PostulatedProjects } from "../../components/Projects/PostulatedProjects";
import ProfessionalComponent from "../../components/Account/ProfessionalComponent";
import NewPassword from "../../components/NewPassword/NewPassword";
export const ProfessionalPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      <NavCompany />
      {/* {isComponent === "proyectos" ? <PostulatedProjects /> : <ProfessionalComponent />} */}
      {isComponent === "proyectos" && <PostulatedProjects /> }
      {isComponent === "datos personales" && <ProfessionalComponent /> }
      {isComponent === "cambiar contraseña" && <NewPassword/>}
    </>
  );
};
