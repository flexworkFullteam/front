import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setComponent } from "../../../store/ui/uiSlice";
import styles from "./NavAdmin.module.css";

export const NavAdmin = () => {
  const dispatch = useDispatch();

  const handleUsers = () => {
    dispatch(setComponent("usuarios"));
  };

  const handlePagos = () => {
    dispatch(setComponent("pagos"));
  };

  return (
    <div>
      <AppBar position='static' color='verdigris'>
        <Toolbar className={styles.navContainer}>
          <Button variant='contained' color='persianBlue' onClick={handleUsers}>
            <Typography fontFamily='Nunito Sans' fontWeight='400' color='aliceblue'>
              Usuarios
            </Typography>
          </Button>
          <Button variant='contained' color='persianBlue' onClick={handlePagos}>
            <Typography fontFamily='Nunito Sans' fontWeight='400' color='aliceblue'>
              Historial de pagos
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
