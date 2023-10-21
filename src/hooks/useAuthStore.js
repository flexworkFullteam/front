import { projectAPI } from "../api/projectAPI";
import { useDispatch, useSelector } from "react-redux";
import { onChecking, onClearEvents, onLogin, onLogout, onRegister } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const { loadingAccount } = useSelector((state) => state.ui);
  
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
    


    const startRegister = async ({email, password, username, type}) => {
      try {
          dispatch(onChecking());
          const {data} = await projectAPI.post("/user", {email,  password,  username,  type})

          if(data.id) {
            dispatch(onRegister(data))
          }
          

      } catch (error) {
        console.error("Error en el registro:", error);
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
        dispatch(setLoadingAccount(true))
        const {data} = await projectAPI.post("/professional", professional);
        dispatch(setLoadingAccount(false))
      } catch (error) {
        alert(error.errorMessage)
        dispatch(onLogout('Error al crear profesional'))
      }
    }

    const startCreateCompany = async (company) => {
      try {
        // dispatch(onChecking());
        dispatch(setLoadingAccount(true))
        const {data} = await projectAPI.post("/company", company);
        dispatch(setLoadingAccount(false))
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
    loadingAccount,
    //metodos
    startLogin,
    startRegister,
    startLogout,
  };
};

