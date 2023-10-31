import { useDispatch, useSelector } from "react-redux";
import { NavAdmin } from "../components/NavAdmin/NavAdmin";
import { UserDetail } from "../components/UserDetail/UserDetail";
import { AdminComponent } from "../components/AdminComponent/AdminComponent";
import { useEffect } from "react";
import { setComponent } from "../../store/ui/uiSlice";

export const DashboardPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setComponent("usuarios"));
  }, []);

  return (
    <>
      <NavAdmin />
      {
        isComponent === "usuarios" ? <AdminComponent /> : <AdminComponent /> // otro mas para pasa de pagos?
      }
    </>
  );
};
