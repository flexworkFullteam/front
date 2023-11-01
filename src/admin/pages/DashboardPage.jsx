import { useDispatch, useSelector } from "react-redux";
import { NavAdmin } from "../components/NavAdmin/NavAdmin";
import { AdminComponent } from "../components/AdminComponent/AdminComponent";
import { useEffect } from "react";
import { setComponent } from "../../store/ui/uiSlice";
import { PaymentHistory } from "../components/PaymenHistory/PaymentHistory";
import { CreateFields } from "../components/CreateFields/CreateFields";

export const DashboardPage = () => {
  const { isComponent } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setComponent("usuarios"));
  }, []);

  let componentToDisplay;

  if (isComponent === "usuarios") {
    componentToDisplay = <AdminComponent />;
  } else if (isComponent === "pagos") {
    componentToDisplay = <PaymentHistory />;
  } else if (isComponent === "campos") {
    componentToDisplay = <CreateFields />;
  }
  return (
    <>
      <NavAdmin />
      {componentToDisplay}
    </>
  );
};
