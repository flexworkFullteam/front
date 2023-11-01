import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';
import { projectAPI } from "../api/projectAPI";
import { onAddPersonalData, onChecking, onClearEvents, onLogin, onLogout, onRegister } from "../store/auth/authSlice";
import { fileUpload } from "../helpers/fileUpload";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { user, status, errorMessage } = useSelector((state) => state.auth);
  const { loadingAccount, setLoadingAccount } = useSelector((state) => state.ui);
  const navigate = useNavigate();

  const startLogin = async ({ email, password }) => {
    try {
      // dispatch(onChecking());
      const { data } = await projectAPI.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);

      console.log(data);
      const { userMapped } = data;

      if (userMapped) {
        setTimeout(() => {
          dispatch(onLogin(userMapped));
        }, 1000);

        navigate("/home");
      } else {
        dispatch(onLogout());
      }
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(onLogout("Error al iniciar sesión"));
    }
  };

  const startRegister = async ({ email, password, username, type }) => {
    console.log({ email, password, username, type });
    try {
      // dispatch(onChecking()); //Todo: Cambiar por un loading distinto, este te redirije al home
      const { data } = await projectAPI.post("/user", {
        email,
        password,
        username,
        type,
      });
      // console.log(data)
      if (data.id) {
        // dispatch(onRegister(data)); //Todo: Cambiar por un loading distinto, este te redirije al home
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Usuario registrado',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/auth/login");
      }
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
      console.error("Error en el registro:", error);
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
      // dispatch(setLoadingAccount(true));
      const { data } = await projectAPI.post("/professional", professional);
      console.log("Creado", data);
      dispatch(onAddPersonalData(data));
      // dispatch(setLoadingAccount(false));
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Datos personales guardados',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
      console.log(error);
      // dispatch(onLogout("Error al crear profesional"));
    }
  };

  const startUpdateProfessional = async (professional, id) => {
    try {
      const { data } = await projectAPI.put(`/professional/${id}`, professional);
      console.log("Prof actualizado", data);
      console.log(id);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Cambios guardados',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  const startCreateCompany = async (company) => {
    try {
      console.log("Company:", company);
      // dispatch(setLoadingAccount(true));
      // console.log(company);
      const { data } = await projectAPI.post("/company", company);
      console.log("Creado", data);
      dispatch(onAddPersonalData(data));
      // dispatch(setLoadingAccount(false));
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Datos de empresa guardados',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.errorMessage,
        showConfirmButton: false,
        timer: 1500
      })
      // dispatch(onLogout("Error al crear empresa"));
    }
  };

  const startUpdateCompany = async (company) => {
    try {
      const id = user.company_id;
      const { data } = await projectAPI.put(`/company/${id}`, company);
      console.log("Actualizando", data);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Cambios guardados',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  const startLoginWithToken = async () => {
    const token = localStorage.getItem("token");
    try {
      // dispatch(onChecking());
      const { userId } = jwtDecode(token);
      // console.log(userId)
      const { data } = await projectAPI.get(`/user/${userId}`);
      // console.log(data.userMapped)
      dispatch(onLogin(data.userMapped));
    } catch (error) {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  const startUploadingFiles = async (files) => {
    // dispatch(setSaving())
    const { secure_url } = await fileUpload(files);

    return secure_url;
  };

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
    startUpdateProfessional,
    startCreateCompany,
    startUpdateCompany,
    startLoginWithToken,
    startUploadingFiles,
  };
};
