import { Button } from "@mui/material";
import React from "react";

export const NavCompany = () => {
  return (
    <div>
      <AppBar position="static" color="persianBlue">
        <Toolbar className={styles.navContainer}>
          <Button>Datos personales</Button>
          <Button>Proyectos</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
