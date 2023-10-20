import { projectAPI } from "../api/projectAPI";
import { useDispatch, useSelector } from "react-redux";
import {} from "../store/auth/authSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { auth, onChecking, onLogin, onLogout, onRegister } = useSelector(
    (state) => state.auth
  );
  return {
    //propiedades
    //metodos
  };
};
