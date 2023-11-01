import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Container, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAuthStore } from '../../../hooks/useAuthStore';
import { projectAPI } from '../../../api/projectAPI';
import style from "./NewPassword.module.css";



const NewPassword = () => {

  const { user } = useAuthStore();
  const {register,handleSubmit,formState: { errors },reset} = useForm();
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const updatePassword = async (dataUser) => {
    try {
      console.log("Me llega:",dataUser);
      const { data } = await projectAPI.post(`/user/password`, dataUser);
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Contraseña actualizada con éxito',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  };


  const onSubmit = handleSubmit((data) => {
    console.log("Data", data, "user id", user.id);
    updatePassword({ ...data, userId: user.id });
    //  reset(); //! Esto limpia el formulario (opcional).
  });
  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "2.5% 0 2.5% 0",
        mt: "5%",
        mb: "5%",
        boxShadow: "5px 5px 10px #000",
        width: "30%"
      }}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={2} sx={{ ml: 4 }}>
          <InputLabel >Contraseña Actual </InputLabel>
          <TextField
            sx={{ width: "90%" }}
            placeholder='Contraseña'
            variant='outlined'
            type={showPassword1 ? "password" : "text"}
            {...register("currentPassword", {
              required: {
                value: true,
                message: "Es un campo obligatorio",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button variant='text' color='persianBlue' size='small' onClick={togglePasswordVisibility}>
                    {showPassword1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {errors.currentPassword && <p className={style.errorsP}>{errors.currentPassword.message}</p>}


          <InputLabel>Nueva contraseña</InputLabel>
          <TextField
            sx={{ width: "90%" }}
            placeholder='Contraseña'
            variant='outlined'
            type={showPassword2 ? "password" : "text"}
            {...register("newPassword", {
              required: {
                value: true,
                message: "Es un campo obligatorio",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button variant='text' color='persianBlue' size='small' onClick={togglePasswordVisibility2}>
                    {showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {errors.newPassword && <p className={style.errorsP}>{errors.newPassword.message}</p>}

          <Button variant='contained' color='pear' type='submit' sx={{ width: "30%" }}>
            <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
              Cambiar
            </Typography>
          </Button>
        </Stack>
      </form>


    </Container>
  )
}

export default NewPassword