import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Button, Box, Grid, Typography } from "@mui/material";
import styles from "./CreateFields.module.css";
import { postDBfields } from "../../../helpers/postDBfields";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const CreateFields = () => {
  const [selectedValue, setSelectedValue] = useState("field");
  const [textValue, setTextValue] = useState("");
  const { user } = useAuthStore();

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleFormSubmit = () => {
    const data = { new_resource: textValue };
    postDBfields(selectedValue, user.id, data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
      }}
    >
      <Typography variant='h5' color='persianBlue.main' fontWeight='600'>
        Crea tus campos
      </Typography>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item>
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel id='demo-simple-select-label'>Seleccionar</InputLabel>
            <Select labelId='demo-simple-select-label' id='demo-simple-select' value={selectedValue} label='Seleccionar' onChange={handleSelectChange}>
              <MenuItem value='projetfields'>Area</MenuItem>
              <MenuItem value='projettype'>Tipo</MenuItem>
              <MenuItem value='experiencelevel'>Experiencia Requerida</MenuItem>
              <MenuItem value='nationality'>Nacionalidad</MenuItem>
              <MenuItem value='language'>Lenguaje</MenuItem>
              <MenuItem value='itskills'>Habilidades</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField id='outlined-basic' label='Texto' variant='outlined' sx={{ m: 1, width: "25ch" }} onChange={(e) => setTextValue(e.target.value)} />
        </Grid>
      </Grid>
      <Button className={styles.button} variant='contained' color='persianBlue' sx={{ m: 1 }} onClick={handleFormSubmit}>
        <Typography fontFamily='nunito sans'>Enviar</Typography>
      </Button>
    </Box>
  );
};
