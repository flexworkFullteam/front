import { useParams } from "react-router-dom"


export const Success = () => {

  const {id} = useParams();
  
  return (
    <div>Success</div>
  )
}
