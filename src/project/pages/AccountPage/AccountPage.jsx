import { useSelector } from "react-redux";
import ProfessionalComponent from "../../components/Account/ProfessionalComponent";
import { CompanyPage } from "../../pages/CompanyPage/CompanyPage";

export const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* <ProfessionalComponent/> */}
      {/* <CompanyComponent/> */}

      {user.type === 2 ? <ProfessionalComponent /> : <CompanyPage />}
    </div>
  );
};
