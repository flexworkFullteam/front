import { useSelector } from "react-redux";
import { CompanyComponent } from "../../components/Account/CompanyComponent";
import { Projects } from "../../components/Projects/Projects";
import { NavCompany } from "../../components/NavCompany/NavCompany";

export const CompanyPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      <NavCompany />
      {
        isComponent === "proyectos" ? <Projects /> : <CompanyComponent /> // otro mas para pasa de pagos?
      }
    </>
  );
};
