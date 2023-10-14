import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { Grid, Typography, Button, Container, Stack, TextField, InputAdornment, InputLabel, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import style from './RegisterCompany.module.css';


const RegisterCompany = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = handleSubmit(data => {
        console.log(data);
        reset();
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container>
            <Typography variant='h4' sx={{ mb:5, mt:5 }}
                fontWeight="semi bold" color="pear.main"> Registra tu empresa en FlexWork</Typography>
            <Typography variant='h6' fontFamily="Nunito Sans" fontWeight="bold" color="persianBlue.main">Completa la información de usuario</Typography>

            <form onSubmit={onSubmit}>
                <Stack spacing={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>

                            <InputLabel>Nombre(s)</InputLabel>
                            <TextField
                                placeholder='Nombre'
                                id='nombreRepre'
                                type="text" fullWidth
                                {...register("nombreRepre", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                                        message: 'El nombre no es válido'
                                    },
                                })}
                            />
                            {/* {errors.nombre && <Typography variant='body' color='pear' mb={4}>{errors.nombre.message}</Typography>} */}
                            {errors.nombreRepre && <p className={style.errors}>{errors.nombreRepre.message}</p>}



                            <InputLabel>Apellido(s)</InputLabel>
                            <TextField
                                placeholder='Apellido'
                                id='apellidoRepre'
                                type="text" fullWidth
                                {...register("apellidoRepre", {
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
                            {errors.apellidoRepre && <p className={style.errors}>{errors.apellidoRepre.message}</p>}


                        </Grid>

                        <Grid item xs={4}>
                            <InputLabel>Email</InputLabel>
                            <TextField
                                placeholder='Email'
                                id='correoRepre'
                                type="email" fullWidth
                                {...register("correoRepre", {
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
                            {errors.correoRepre && <p className={style.errors}>{errors.correoRepre.message}</p>}



                            <InputLabel>Contraseña</InputLabel>
                            <TextField
                                id='contraseñaComp'
                                sx={{ width: '375px' }}
                                placeholder='Contraseña'
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                {...register('contraseñaComp', {
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
                            {errors.contraseñaComp && <p className={style.errors}>{errors.contraseñaComp.message}</p>}

                        </Grid>
                    </Grid>

                    
                    <Typography variant='h6' fontFamily="Nunito Sans" fontWeight="bold" color="persianBlue.main">Ingresa datos de la empresa</Typography>
                    <Grid container spacing={2} >
                        <Grid item xs={4}>

                            <InputLabel>Nombre de la empresa</InputLabel>
                            <TextField
                                placeholder='Nombre de la empresa'
                                id='nombreEmpresa'
                                type="text" fullWidth
                                {...register("nombreEmpresa", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern:{
                                        value:/^(?!\s).*/, 
                                        message: "Este campo es requerido"
                                    }
                                })}
                            />
                            {errors.nombreEmpresa && <p className={style.errors}>{errors.nombreEmpresa.message}</p>}

                            <InputLabel>Condición fiscal</InputLabel>
                            <TextField
                                select
                                id='condicion'
                                fullWidth
                                name="condicion"
                                defaultValue="rfcMoral"
                                {...register("condicion")}
                            >
                                <MenuItem value="rfcGeneral">RFC Genérico Público General</MenuItem>
                                <MenuItem value="rfcMoral">RFC Persona Moral</MenuItem>
                                <MenuItem value="rfcFisica">RFC Persona Física</MenuItem>
                            </TextField>

                            <InputLabel>Calle</InputLabel>
                            <TextField
                                placeholder='Calle'
                                id='calle'
                                type="text" fullWidth
                                {...register("calle", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern:{
                                        value:/^(?!\s).*/, 
                                        message: "Este campo es requerido"
                                    }
                                })}
                            />
                            {errors.calle && <p className={style.errors}>{errors.calle.message}</p>}

                            <InputLabel>Industria</InputLabel>
                            <TextField
                                select
                                id='industria'
                                fullWidth
                                name="industria"
                                defaultValue="rfcGeneral"
                                {...register("industria")}
                            >
                                <MenuItem value="rfcGeneral">RFC Genérico Público General</MenuItem>
                            </TextField>

                        </Grid>

                        <Grid item xs={4}>
                            <InputLabel>Razón Social</InputLabel>
                            <TextField
                                placeholder='Razón Social'
                                id='razon'
                                type="text" fullWidth
                                {...register("razon", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern:{
                                        value:/^(?!\s).*/, 
                                        message: "Este campo es requerido"
                                    }
                                })}
                            />
                            {errors.razon && <p className={style.errors}>{errors.razon.message}</p>}

                            <InputLabel>N°.Documento</InputLabel>
                            <TextField
                                placeholder='Documento'
                                id='documento'
                                type="text" fullWidth
                                {...register("documento", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Ingresa solo números"
                                    }
                                })}
                            />
                            {errors.documento && <p className={style.errors}>{errors.documento.message}</p>}

                            <InputLabel>Teléfono</InputLabel>
                            <TextField
                                placeholder='Teléfono'
                                id='telefono'
                                type="number" fullWidth
                                {...register("telefono", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: "Ingresa solo números"
                                    }
                                })}
                            />
                            {errors.telefono && <p className={style.errors}>{errors.telefono.message}</p>}

                            <InputLabel>Cantidad de empleados</InputLabel>
                            <TextField
                                select
                                id='empleados'
                                fullWidth
                                name="empleados"
                                defaultValue="1+"
                                {...register("empleados")}
                            >
                                <MenuItem value="1+">Entre 1 y 10</MenuItem>
                                <MenuItem value="11+">Entre 11 y 50</MenuItem>
                                <MenuItem value="51+">Entre 51 y 150</MenuItem>
                                <MenuItem value="151+">Entre 151 y 300</MenuItem>
                                <MenuItem value="301+">Entre 301 y 500</MenuItem>
                                <MenuItem value="501+">Entre 501 y 1000</MenuItem>
                                <MenuItem value="1001+">Entre 1001 y 5000</MenuItem>
                                <MenuItem value="5001+">Más de 5001</MenuItem>
                            </TextField>

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
                    {errors.aceptaTerminos && <p className={style.errors}>{errors.aceptaTerminos.message}</p>}
                </Stack>


                <Button variant="contained" color='pear' type="submit" sx={{ margin: 2 }}>
                    <Typography fontFamily="Nunito Sans" fontWeight="bold" color='persianBlue.main'>Crear cuenta </Typography>
                </Button>
            </form>

            <h4>¿Ya tienes cuenta? {<Link to='/auth/loginComp'>Ingresa</Link>}</h4>

        </Container>

    )
}

export default RegisterCompany