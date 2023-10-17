import React from "react";
import { Container, Typography, Box } from "@mui/material";
import RegisterUser from "../components/formProfesional/RegisterUser";



export const RegisterUserPage = () => {
  return (
    <Container sx={{ mt: 5 }}>
        <Box sx={{ marginLeft: 3 }}>
        <Typography
          variant="h4"
          fontWeight="semi bold"
          color="pear.main"
          sx={{ mb: 2 }}
        >
          Crea tu cuenta en FlexWork!
        </Typography>
      </Box>
      <RegisterUser/>
    </Container>
  );
};
