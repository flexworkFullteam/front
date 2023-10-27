import React from "react";
import { Link } from "react-router-dom";
import LoginUser from "../components/formProfesional/LoginUser";
import { Container, Typography, Box } from "@mui/material";

export const LoginProfePage = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ marginLeft: 3 }}>
        <Typography
          variant="h4"
          fontWeight="semi bold"
          color="pear.main"
          sx={{ mb: 2 }}
        >
          Ingresa a tu cuenta
        </Typography>
        <Typography
          variant="body"
          fontWeight="bold"
          fontFamily="Nunito Sans"
          color="persianBlue.main"
        >
          Accede y encuentra el proyecto que buscas!{" "}
        </Typography>
      </Box>
      <LoginUser />
      <h4>
        ¿No tienes cuenta?{" "}
        {<Link to="/auth/register">Registrate</Link>}
      </h4>
    </Container>
  );
};
