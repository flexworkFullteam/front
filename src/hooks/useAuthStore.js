import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { projectAPI } from "../api/projectAPI";
import { onChecking, onClearEvents, onLogin, onLogout, onRegister } from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const { loadingAccount } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    try {
      dispatch(onChecking());
      const { data } = await projectAPI.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      console.log(data);
      const { userMapped } = data;

      if (userMapped) {
        dispatch(onLogin(userMapped));
        alert("Bienvenido");
        navigate("/home");
      } else {
        dispatch(onLogout());
      }
    } catch (error) {
      alert(error.errorMessage);
      dispatch(onLogout("Error al iniciar sesión"));
    }
  };

  const startRegister = async ({ email, password, username, type }) => {
    console.log({ email, password, username, type });
    try {
      dispatch(onChecking());
      const { data } = await projectAPI.post("/user", {
        email,
        password,
        username,
        type,
      });
      // console.log(data)
      if (data.id) {
        dispatch(onRegister(data));
        alert("Usuario registrado");
        //! navigate("/login")
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert(error.message);
      dispatch(onLogout("Error al registrar usuario"));
    }
  };

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onClearEvents());
    dispatch(onLogout());
  };

  const startCreateProfessional = async (professional) => {
    try {
      // dispatch(onChecking());
      dispatch(setLoadingAccount(true));
      const { data } = await projectAPI.post("/professional", professional);
      dispatch(setLoadingAccount(false));
      alert("Datos personales guardados");
    } catch (error) {
      alert(error.errorMessage);
      dispatch(onLogout("Error al crear profesional"));
    }
  };

  const startCreateCompany = async (company) => {
    try {
      // dispatch(onChecking());
      dispatch(setLoadingAccount(true));
      const { data } = await projectAPI.post("/company", company);
      dispatch(setLoadingAccount(false));
      alert("Datos de empresa guardados");
    } catch (error) {
      alert(error.errorMessage);
      dispatch(onLogout("Error al crear empresa"));
    }
  };

      
  const startLoginWithToken = async () => {
    
    const token = localStorage.getItem("token");
    try {
      const {userId} = jwtDecode(token);
      // console.log(userId)
      const {data} = await projectAPI.get(`/user/${userId}`);
      console.log(data)
      dispatch(onLogin(data))

    } catch (error) {
      alert(error.errorMessage)
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
    startCreateProfessional,
    startCreateCompany,
    startLoginWithToken
  };
};
