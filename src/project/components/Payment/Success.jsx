import { useParams, useNavigate } from "react-router-dom"


export const Success = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home")
  }

  return (
    <div>
        <div className='success_background'>
            <div className='success_display'>
                <h1>¡Tu pago fue recibido!</h1>
                <h2>Ahora podemos comenzar el trabajo</h2>
                <h3>Le enviaremos al trabajador tu informacion para ponerlos en contacto.</h3>
                <button className='succes_back' onClick={goHome}>Volver al sitio</button>
            </div>
        </div>
    </div>
  )
}