import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../../assets/logo.png";
import styles from "./Nav.module.css";
import { Typography } from "@mui/material";

export const Nav = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="persianBlue">
      <Toolbar className={styles.navContainer}>
        <img
          onClick={handleClick}
          src={logo}
          alt="flexwork logo"
          className={styles.logoImage}
        />
        <div className={styles.buttonsContainer}>
          <Link>
            <Button
              variant="contained"
              color="aliceBlue"
              className={styles.createAccountButton}
            >
              <Typography fontFamily="Nunito Sans" fontWeight="400">
                Crear cuenta
              </Typography>
            </Button>
          </Link>
          <Link to="">
            <Button
              variant="contained"
              color="pear"
              className={styles.ingresarButton}
            >
              <Typography fontFamily="Nunito Sans" fontWeight="400">
                Ingresar
              </Typography>
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};
