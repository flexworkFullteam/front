import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { Grid, Typography,Button, Container, Stack, TextField, InputAdornment, InputLabel, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Google, LinkedIn } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import style from "./generalStyles.module.css";

const ProffessionalComponent = () => {

    const { register,reset, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = handleSubmit(data => {
        console.log(data);
        reset();
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container sx={{ mt: 5 }}>

            <Typography variant='h4' sx={{ mb: 5 }}
                fontWeight="semi bold" color="pear.main"> Mi cuenta profesional</Typography>

            <form onSubmit={onSubmit}>
                <Stack spacing={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>

                            <InputLabel>Nombre(s)</InputLabel>
                            <TextField
                                placeholder='Nombre'
                                id='nombre'
                                type="text" fullWidth
                                {...register("nombre", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value:/^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                                        message: 'El nombre no es válido'
                                    }
                                })}
                            />
                            {errors.nombre && <p className={style.errorsP}>{errors.nombre.message}</p>}



                            <InputLabel>Apellido(s)</InputLabel>
                            <TextField
                                placeholder='Apellido'
                                id='apellido'
                                type="text" fullWidth
                                {...register("apellido", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                                        message: 'El apellido no es válido'
                                    }
                                })}
                            />
                            {errors.apellido && <p className={style.errorsP}>{errors.apellido.message}</p>}

                            <InputLabel>Tipo de documento</InputLabel>
                            <TextField
                                select
                                id='documento'
                                fullWidth
                                name="documento"
                                defaultValue="ine"
                                {...register("documento")}
                            >
                                <MenuItem value="pasaporte">Pasaporte</MenuItem>
                                <MenuItem value="licencia">Licencia de conducir</MenuItem>
                                <MenuItem value="rfc">R.F.C</MenuItem>
                                <MenuItem value="ine">Credencial de Elector</MenuItem>
                            </TextField>

                            <InputLabel>Número de documento</InputLabel>
                            <TextField
                                placeholder='Número de documento'
                                id='documentNumber'
                                type="text" fullWidth
                                {...register("documentNumber", {
                                    required: {
                                        value: true,
                                        message: 'Es un campo obligatorio',
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Debe introducir solo números',
                                    },
                                })}
                            />
                            {errors.documentNumber && <p className={style.errorsP}>{errors.documentNumber.message}</p>}


                        </Grid>

                        <Grid item xs={4}>

                            <InputLabel>Teléfono celular</InputLabel>
                            <TextField
                                placeholder='Teléfono celular'
                                id='telefono'
                                type="text" fullWidth
                                {...register("telefono", {
                                    required: {
                                        value: true,
                                        message: 'Es un campo obligatorio',
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Debe introducir solo números',
                                    },
                                })}
                            />
                            {errors.telefono && <p className={style.errorsP}>{errors.telefono.message}</p>}



                            <InputLabel>Email</InputLabel>
                            <TextField
                                placeholder='Email'
                                id='correo'
                                type="email" fullWidth
                                {...register("correo", {
                                    required: {
                                        value: true,
                                        message: 'Es un campo obligatorio',
                                    },
                                    pattern: {
                                        value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                                        message: 'Email no válido',
                                    }
                                })}
                            />
                            {errors.correo && <p className={style.errorsP}>{errors.correo.message}</p>}



                            <InputLabel>Contraseña</InputLabel>
                            <TextField
                                id='contraseña'
                                sx={{ width: '360px' }}
                                placeholder='Contraseña'
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                {...register('contraseña', {
                                    required: {
                                        value: true,
                                        message: 'Es un campo obligatorio',
                                    },
                                    pattern: {
                                        value: /^(?=\S{6,}$)/,
                                        message: 'La contraseña debe contener al menos 6 carácteres, sin espacios en blanco',
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

                        </Grid>
                    </Grid>


                    <FormControlLabel
                        control={
                            <Checkbox
                                name="aceptaTerminos"
                                {...register("aceptaTerminos", {
                                    required: "Acepta los términos y condiciones"
                                })}
                            />
                        }
                        label="Acepto los términos y condiciones"
                    />
                    {errors.aceptaTerminos && <p className={style.errorsP}>{errors.aceptaTerminos.message}</p>}
                </Stack>


                <Button variant="contained" color="pear" type="submit" sx={{ margin: 2 }}>
                    <Typography fontFamily="Nunito Sans" fontWeight="bold" color='persianBlue.main'>Guardar cambios</Typography>
                </Button>
            </form>

        </Container>
    )
}

export default ProffessionalComponent