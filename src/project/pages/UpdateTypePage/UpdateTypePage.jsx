import React, { useState } from "react";
import { MenuItem, Select, Typography, Button } from "@mui/material";
import { projectAPI } from "../../../api/projectAPI";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const UpdateTypePage = () => {
  const [selectedType, setSelectedType] = useState();
  const { user } = useAuthStore();

  const handleClick = async () => {
    console.log("Valor seleccionado:", selectedType);
    try {
      const { data } = await projectAPI.put(`/user/${user.id}`, {
        type: selectedType,
      });
      //desesctructurar del put el token y los datos para enviarlos al local storage y al login
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Typography variant="h6">¿Qué tipo de usuario eres?</Typography>
      <Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        sx={{ width: "200px", marginTop: "10px" }}
      >
        <MenuItem value="2">Profesional</MenuItem>
        <MenuItem value="3">Empresa</MenuItem>
      </Select>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ marginTop: "20px" }}
      >
        Enviar
      </Button>
    </div>
  );
};
