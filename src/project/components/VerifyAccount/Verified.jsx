import { CompanyPage } from "../../pages/CompanyPage/CompanyPage"
import { ProfessionalPage } from "../../pages/ProfessionalPage/ProfessionalPage"


export const Verified = ({user}) => {

    //* Hay que cambiar el <ProfessionalComponent /> por el <ProfessionalPage />

  return (
    <div>
        {user.type === 2 ? <ProfessionalPage /> : <CompanyPage />}
    </div>
  )
}
