import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "./Menu";
import { SearchBar } from "../Searchbar/Searchbar";
import { Toolbar, Button, AppBar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.png";
import styles from "./Nav.module.css";

export const Nav = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppBar position="static" color="persianBlue">
      <Toolbar className={styles.navContainer}>
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="flexwork logo"
          className={styles.logoImage}
        />
        {(pathname.startsWith("/search") || pathname.startsWith("/detail")) && (
          <SearchBar />
        )}
        {status === "not-authenticated" && (
          <div className={styles.buttonsContainer}>
            <Link to={"auth/registerprof"}>
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
            <Link to={"auth/loginprof"}>
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
        )}
        {status === "authenticated" && <Menu />}
      </Toolbar>
    </AppBar>
  );
};
