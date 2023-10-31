import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Stack, TextField, InputAdornment, Typography, InputLabel, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { Google, LinkedIn } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import style from "./StylesProfesional.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/auth/authSlice";
import { projectAPI } from "../../../api/projectAPI";

const RegisterUser = () => {
  const { startRegister, user } = useAuthStore();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    const { email, contraseña, username, type } = data;

    // Llama a la función de inicio de sesión del custom hook
    await startRegister({ email, password: contraseña, username, type: +type });

    reset();
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ---------- Auth0 --------------

  const { loginWithPopup, logout, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const handleLoginSubmission = async () => {
    try {
      await loginWithPopup(); // This will open a popup for Auth0 login
      const tokenClaims = await getIdTokenClaims(); // Get token claims after successful login
      // Sending the tokenClaims object to the backend
      const response = await projectAPI.post("/user/auth0/loginOrSignup", tokenClaims);
      // console.log(response.data.user);
      dispatch(onLogin(response.data.user));
      // Logging the response from the backend
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  // -------------------------------

  return (
    <Container sx={{ pt: 1 }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={0.5}>
          <InputLabel>Nombre de usuario</InputLabel>
          <TextField
            placeholder='Nombre de usuario'
            id='username'
            type='text'
            sx={{ width: "35%" }}
            {...register("username", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              pattern: {
                value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                message: "El nombre no es válido",
              },
            })}
          />
          {errors.username && <p className={style.errorsP}>{errors.username.message}</p>}

          <InputLabel>Email</InputLabel>
          <TextField
            sx={{ width: "35%" }}
            placeholder='Email'
            variant='outlined'
            type='email'
            {...register("email", {
              required: {
                value: true,
                message: "Es un campo obligatorio",
              },
              pattern: {
                value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <p className={style.errorsP}>{errors.email.message}</p>}

          <InputLabel>Tipo de cuenta</InputLabel>
          <TextField sx={{ width: "35%" }} select id='type' name='type' defaultValue='2' {...register("type")}>
            <MenuItem value='2'>Profesional</MenuItem>
            <MenuItem value='3'>Empresa</MenuItem>
          </TextField>

          <InputLabel>Contraseña</InputLabel>
          <TextField
            sx={{ width: "35%" }}
            placeholder='Contraseña'
            variant='outlined'
            type={showPassword ? "text" : "password"}
            {...register("contraseña", {
              required: {
                value: true,
                message: "Es un campo obligatorio",
              },
              pattern: {
                value: /^(?=\S{6,}$)/,
                message: "La contraseña debe contener al menos 6 carácteres, sin espacios en blanco",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button variant='text' color='persianBlue' size='small' onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {errors.contraseña && <p className={style.errorsP}>{errors.contraseña.message}</p>}

          <FormControlLabel
            control={
              <Checkbox
                name="aceptaTerminos"
                {...register("aceptaTerminos", {
                  required: "Acepta los términos y condiciones",
                })}
              />
            }
            label="Acepto los términos y condiciones"
          />
          {errors.aceptaTerminos && (
            <p className={style.errors}>{errors.aceptaTerminos.message}</p>
          )}

          <div style={{ display: "flex", gap: "1%", marginTop: "1.5%" }}>
            <Button variant='contained' color='pear' type='submit' sx={{ width: "15%" }}>
              <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
                Ingresar
              </Typography>
            </Button>
            <Button variant='contained' startIcon={<Google />} color='persianBlue' sx={{ width: "15%" }} onClick={handleLoginSubmission}>
              Ingresa con Google
            </Button>
          </div>
        </Stack>
      </form>
    </Container>
  );
};

export default RegisterUser;
