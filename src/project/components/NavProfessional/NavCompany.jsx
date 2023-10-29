import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import styles from "./NavCompany.module.css";
import { setComponent } from "../../../store/ui/uiSlice";

export const NavProfessional = () => {
  const dispatch = useDispatch();

  const handleProjects = () => {
    dispatch(setComponent("proyectos"));
  };

  const handleData = () => {
    dispatch(setComponent("datos personales"));
  };

  return (
    <div>
      <AppBar position="static" color="verdigris">
        <Toolbar className={styles.navContainer}>
          <Button
            variant="contained"
            color="persianBlue"
            onClick={handleProjects}
          >
            <Typography
              fontFamily="Nunito Sans"
              fontWeight="400"
              color="aliceblue"
            >
              Proyectos
            </Typography>
          </Button>
          <Button variant="contained" color="persianBlue" onClick={handleData}>
            <Typography
              fontFamily="Nunito Sans"
              fontWeight="400"
              color="aliceblue"
            >
              Datos personales
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
