import React, { useState } from "react";
import { MenuItem, Select, Typography, Button, Container, Stack } from "@mui/material";
import { projectAPI } from "../../../api/projectAPI";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/auth/authSlice";

export const UpdateTypePage = () => {
  const [selectedType, setSelectedType] = useState(2);  // Initialize with a valid value
  const { user } = useAuthStore();
  const dispatch = useDispatch();

  const handleClick = async () => {
    console.log("Valor seleccionado:", selectedType);
    try {
      const { data } = await projectAPI.put(`/user/auth0/register`, {
        userId: user.id,
        type: selectedType,
      });

      localStorage.setItem("token", data.token);
      dispatch(onLogin(data.user))

      window.location.reload();
    } catch (error) { }
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "2.5% 0 2.5% 0",
        mt: "5%",
        mb: "5%",
        boxShadow: "5px 5px 10px #000",
        width: "30%",
      }}
    >
    <Stack spacing={4}>
      <Typography variant="h6">¿Qué tipo de usuario eres?</Typography>
      <Select
      fullWidth
        value={selectedType}
        onChange={(e) => setSelectedType(parseInt(e.target.value, 10))}
        sx={{ marginTop: "10px" }}
      >
        <MenuItem value={2}>Profesional</MenuItem>
        <MenuItem value={3}>Empresa</MenuItem>
      </Select>
      </Stack>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ marginTop: "20px", width:'60%', ml:12}}
      >
        Enviar
      </Button>
    </Container>
  );
};