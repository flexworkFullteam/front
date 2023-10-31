import { useSelector } from "react-redux";
import { CompanyComponent } from "../../components/Account/CompanyComponent";
import { Projects } from "../../components/Projects/Projects";
import { NavCompany } from "../../components/NavCompany/NavCompany";
import NewPassword from "../../components/NewPassword/NewPassword";

export const CompanyPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      <NavCompany />
      {/* {isComponent === "proyectos" ? <Projects /> : <CompanyComponent /> }  otro mas para pasa de pagos? */}
      {isComponent === "proyectos" && <Projects /> }
      {isComponent === "datos personales" && <CompanyComponent /> }
      {isComponent === "cambiar contraseña" && <NewPassword/>}
    </>
  );
};
