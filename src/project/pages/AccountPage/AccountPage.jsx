import { useSelector } from "react-redux";
// import ProfessionalComponent from "../../components/Account/ProfessionalComponent";
// import { CompanyPage } from "../../pages/CompanyPage/CompanyPage";
import { NotVerified } from "../../components/VerifyAccount/NotVerified";
import { Verified } from "../../components/VerifyAccount/Verified";

export const AccountPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* <ProfessionalComponent/> */}
      {/* <CompanyComponent/> */}

      {user.valid === true ? <Verified user={user} /> : <NotVerified />}
    </div>
  );
};
