import { CompanyPage } from "../../pages/CompanyPage/CompanyPage"
import { ProfessionalPage } from "../../pages/ProfessionalPage/ProfessionalPage"


export const Verified = ({user}) => {


  return (
    <div>
        {user.type === 2 ? <ProfessionalPage /> : <CompanyPage />}
    </div>
  )
}
