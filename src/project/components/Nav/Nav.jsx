import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "./Menu";
import { SearchBar } from "../Searchbar/Searchbar";
import { Toolbar, Button, AppBar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import logo from "../../../assets/logo.png";
import styles from "./Nav.module.css";

export const Nav = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function handleGoBack() {
    navigate(-1);
    // navigate("/home");
  }

  return (
    <AppBar position='static' color='persianBlue' sx={{ minHeight: "69px" }}>
      <Toolbar className={styles.navContainer}>
        {pathname.startsWith("/auth") && (
          <Button variant='contained' color='pear' sx={{ ml: -15 }} startIcon={<ArrowBackIosNewRoundedIcon sx={{ color: "persianBlue.main" }} />} onClick={handleGoBack}>
            <Typography fontFamily='Nunito Sans' fontWeight='400' color='persianBlue.main'>
              Go Back
            </Typography>
          </Button>
        )}

        <img onClick={() => navigate("/")} src={logo} alt='flexwork logo' className={styles.logoImage} />
        {(pathname.startsWith("/search") || pathname.startsWith("/detail")) && <SearchBar />}
        {status === "not-authenticated" && (
          <div className={styles.buttonsContainer}>
            <Link to={"auth/register"}>
              <Button variant='contained' color='aliceBlue' className={styles.createAccountButton}>
                <Typography fontFamily='Nunito Sans' fontWeight='400'>
                  Crear cuenta
                </Typography>
              </Button>
            </Link>
            <Link to={"auth/login"}>
              <Button variant='contained' color='pear' className={styles.ingresarButton}>
                <Typography fontFamily='Nunito Sans' fontWeight='400'>
                  Ingresar
                </Typography>
              </Button>
            </Link>

            {/* {pathname.endsWith("/loginProf") && (
              <Link to="/auth/loginComp">
                <Button variant="contained" sx={{ mr: -15 }} color="verdigris">
                  <Typography fontFamily="Nunito Sans" fontWeight="400">
                    Ingresar como empresa
                  </Typography>
                </Button>
              </Link>
            )} */}

            {pathname.endsWith("/loginComp") && (
              <Link to='/auth/login'>
                <Button variant='contained' sx={{ mr: -15 }} color='verdigris'>
                  <Typography fontFamily='Nunito Sans' fontWeight='400'>
                    Ingresar como profesional
                  </Typography>
                </Button>
              </Link>
            )}

            {pathname.endsWith("/registerProf") && (
              <Link to='/auth/registerComp'>
                <Button variant='contained' sx={{ mr: -15 }} color='verdigris'>
                  <Typography fontFamily='Nunito Sans' fontWeight='400'>
                    Registrar empresa
                  </Typography>
                </Button>
              </Link>
            )}

            {pathname.endsWith("/registerComp") && (
              <Link to='/auth/registerProf'>
                <Button variant='contained' sx={{ mr: -15 }} color='verdigris'>
                  <Typography fontFamily='Nunito Sans' fontWeight='400'>
                    registrar profesional
                  </Typography>
                </Button>
              </Link>
            )}
          </div>
        )}
        {status === "authenticated" && <Menu />}
      </Toolbar>
    </AppBar>
  );
};
