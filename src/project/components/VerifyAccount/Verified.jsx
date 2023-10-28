import { CompanyPage } from "../../pages/CompanyPage/CompanyPage"
import ProfessionalComponent from "../Account/ProfessionalComponent"


export const Verified = ({user}) => {

    //* Hay que cambiar el <ProfessionalComponent /> por el <ProfessionalPage />

  return (
    <div>
        {user.type === 2 ? <ProfessionalComponent /> : <CompanyPage />}
    </div>
  )
}
