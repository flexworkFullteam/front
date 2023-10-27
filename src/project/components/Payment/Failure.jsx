import { useNavigate } from "react-router-dom";
import './Failure.css'

export const Failure = () => {
  const { navigate } = useNavigate();

  const goHome = () => {
    navigate("/home")
  }

    return (
      <div>
        {/* <Header/> */}
        <div className="failure_cont">
          <div className='failure_display'>
            <h1>Tu pago fue rechazado</h1>
            <h2>Por favor, revisa tus datos e intentalo de nuevo.</h2>
            <button className='succes_back' onClick={goHome}>Volver al sitio</button>
          </div>
        </div>
      </div>
  )
}
