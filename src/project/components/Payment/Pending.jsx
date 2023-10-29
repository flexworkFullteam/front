import { useNavigate } from "react-router-dom";
import "./Pending.css"


export const Pending = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home")
  }
  return (
    <div>
      <div className="pending_cont">
        <div className='pending_display'>
          <h1>Tu pago esta pendiente</h1>
          <h2>Tuvimos problemas para procesar tu pago</h2>
          <h3>Estamos intentando procesar tu pago, esto puede demorar te enviaremos un mail con el resultado.</h3>
          <button className='succes_back' onClick={goHome}>Volver al sitio</button>
        </div>    
      </div>
    </div>
  )
}
