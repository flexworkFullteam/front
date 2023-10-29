import { useSelector } from "react-redux";
import { Projects } from "../../components/Projects/Projects";
import { NavCompany } from "../../components/NavCompany.jsx/NavCompany";

export const ProfessionalPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  return (
    <>
      {/* <NavProfessional />
      {
        isComponent === "proyectos" ? <Projects /> : <ProfessionalComponent /> // otro mas para pasa de pagos?
      } */}
    </>
  );
};
