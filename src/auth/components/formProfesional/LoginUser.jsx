import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Box, Button, Container, Stack, TextField, InputAdornment,Typography } from '@mui/material';
import { Google, LinkedIn } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import style from './StylesProfesional.module.css';
import {useAuthStore} from '../../../hooks/useAuthStore'

const LoginUser = () => {

  const { startLogin, user,  status, errorMessage } = useAuthStore();
  const { register,reset, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const { email, contraseña } = data;

    // Llama a la función de inicio de sesión del custom hook
    await startLogin({ email, password: contraseña });

    console.log(user);
    console.log(status);
    // console.log(errorMessage);

    reset();
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container sx={{pt:4}}>

      <Stack spacing={2}>
        <Button variant="contained" startIcon={<Google />} color="persianBlue" sx={{ width: '270px' }} >
          Ingresar con Google
        </Button>
        <Button variant="outlined" startIcon={<LinkedIn />} color="persianBlue" sx={{ width: '270px' }}>
          Ingresar con LinkedIn
        </Button>
      </Stack>
      <br />


      <form onSubmit={onSubmit}>
        <Stack spacing={2} >
          <label>Email</label>
          <TextField
            sx={{width: '400px' }}
            placeholder='Email'
            variant="outlined"
            type="email"
            {...register('email', {
              required: {
                value: true,
                message: 'Es un campo obligatorio',
              },
              pattern: {
                value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                message: 'Email no válido',
              },
            })}
          />
          {errors.email && <p className={style.errorsP}>{errors.email.message}</p>}

          <label>Contraseña</label>
          <TextField
            sx={{width: '400px' }}
            placeholder='Contraseña'
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('contraseña', {
              required: {
                value: true,
                message: 'Es un campo obligatorio',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    color="persianBlue"
                    size="small"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {errors.contraseña && <p className={style.errorsP}>{errors.contraseña.message}</p>}

          <Button variant="contained" color="pear" type="submit" sx={{width: '140px'}}>
          <Typography fontFamily="Nunito Sans" fontWeight="bold"  color='persianBlue.main'>Ingresar </Typography>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default LoginUser 