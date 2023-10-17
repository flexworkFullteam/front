import {useSelector} from 'react-redux'
import ProffessionalComponent from '../../components/Account/ProffessionalComponent'
import CompanyComponent from '../../components/Account/CompanyComponent'

export const AccountPage = () => {

  const {user} = useSelector( state => state.auth)

  return (
    <div>
      {/* <ProffessionalComponent/> */}
      {/* <CompanyComponent/> */}
      
      { user.type === 2 ? <ProffessionalComponent/> : <CompanyComponent /> }
      
      </div>
  )
}
