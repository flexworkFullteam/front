import { projectAPI } from "../api/projectAPI";
import { useDispatch, useSelector } from "react-redux";
import { onChecking, onClearEvents, onLogin, onLogout, onRegister } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  
    const startLogin = async ({email, password}) => {
      try {
          dispatch(onChecking());
          const {data} = await projectAPI.post("/user/login", { email, password});
          localStorage.setItem("token", data.token);

          const {user} = data;

          if(user) {
            dispatch(onLogin(user))
          }else{
            dispatch(onLogout())
          }

      } catch (error) {
        alert(error.errorMessage)
        dispatch(onLogout('Error al iniciar sesión'))
      }
    }
    


    const startRegister = async ({email, password, name, type}) => {
      try {
          dispatch(onChecking());
          const {data} = await projectAPI.post("/user", {email,  password,  name,  type})

          if(data.id) {
            dispatch(onRegister(data))
          }
          

      } catch (error) {
        alert(error.errorMessage)
        dispatch(onLogout('Error al registrar usuario'))
      }
    }

    const startLogout = async () => {
      localStorage.clear();
      dispatch(onClearEvents())
      dispatch(onLogout());
    }

    const startCreateProfessional = async (professional) => {
      try {
        // dispatch(onChecking());
        const {data} = await projectAPI.post("/user/professional", professional);
        // dispatch(onRegister(data)); // TODO: revisar
      } catch (error) {
        alert(error.errorMessage)
        dispatch(onLogout('Error al crear profesional'))
      }
    }

    const startCreateCompany = async (company) => {
      try {
        // dispatch(onChecking());
        const {data} = await projectAPI.post("/user/company", company);
        // dispatch(onRegister(data)); // TODO: revisar
      } catch (error) {
        alert(error.errorMessage)
        dispatch(onLogout('Error al crear empresa'))
      }
    }
  
  return {
    //propiedades
    user,
    status,
    errorMessage,
    //metodos
    startLogin,
    startRegister,
    startLogout,
  };
};

