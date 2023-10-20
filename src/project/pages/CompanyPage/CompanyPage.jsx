import { CompanyComponent } from "../../components/Account/CompanyComponent";
import { Projects } from "../../components/Projects/Projects";

export const CompanyPage = () => {
  return (
    <>
      <NavCompany />
      {
        isComponent === "datos personales" ? <CompanyComponent /> : <Projects /> // otro mas para pasa de pagos?
      }
    </>
  );
};
