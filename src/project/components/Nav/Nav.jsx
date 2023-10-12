import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../../assets/logo.png";
import styles from "./Nav.module.css";

export const Nav = () => {
  return (
    <AppBar position="static" color="persianBlue">
      <Toolbar className={styles.navContainer}>
        <Link to="/">
          <img src={logo} alt="flexwork logo" className={styles.logoImage} />{" "}
        </Link>
        <div className={styles.buttonsContainer}>
          <Link>
            <Button
              variant="contained"
              color="aliceBlue"
              className={styles.createAccountButton}
            >
              Crear cuenta
            </Button>
          </Link>
          <Link to="">
            <Button
              variant="contained"
              color="pear"
              className={styles.ingresarButton}
            >
              Ingresar
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
