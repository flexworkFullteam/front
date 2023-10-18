import React from 'react'
import { useForm } from 'react-hook-form'
import { Grid, Typography, Button, Container, Stack, TextField, InputLabel, MenuItem, Checkbox, FormControlLabel, Box } from '@mui/material';
import style from "./CreateProject.module.css";

const CreateProject = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(data => {
        console.log(data);
        reset();
    });

    return (
        <Container sx={{ mt: 5 }}>

            <Typography variant='h4' sx={{ mb: 4 }}
                fontWeight="semi bold" color="persianBlue.main"> Crea tu proyecto</Typography>

            <form onSubmit={onSubmit}>
                <Stack spacing={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>

                            <InputLabel>Titulo</InputLabel>
                            <TextField
                                placeholder='Titulo'
                                id='title'
                                type="text" fullWidth
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    pattern: {
                                        value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                                        message: 'El nombre no es válido'
                                    }
                                })}
                            />
                            {errors.title && <p className={style.errors}>{errors.title.message}</p>}

                            <InputLabel>Descripción</InputLabel>
                            <TextField
                                placeholder='Descripción'
                                id='descripcion'
                                multiline
                                rows={3} // Puedes ajustar el número de filas
                                type="text" fullWidth
                                {...register("descripcion", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                })}
                            />
                            {errors.descripcion && <p className={style.errors}>{errors.descripcion.message}</p>}

                            
                            <InputLabel>Campo</InputLabel>
                            <TextField
                                select
                                id='field'
                                fullWidth
                                name="field"
                                defaultValue="1"
                                {...register("field")}
                            >
                                <MenuItem value="1">Marketing</MenuItem>
                            </TextField>

                            <InputLabel>Tipo</InputLabel>
                            <TextField
                                select
                                id='type'
                                fullWidth
                                name="type"
                                defaultValue="1"
                                {...register("type")}
                            >
                                <MenuItem value="1">software engineer</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={.5}></Grid>

                        <Grid item xs={5}>

                        <InputLabel>Localización</InputLabel>
                            <TextField
                                select
                                id='location'
                                fullWidth
                                name="location"
                                defaultValue="1"
                                {...register("location")}
                            >
                                <MenuItem value="1">México</MenuItem>
                            </TextField>

                            <InputLabel>Salario</InputLabel>
                            <TextField
                                placeholder='Salario'
                                id='salary'
                                type="text" fullWidth
                                {...register("salary", {
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
                            {errors.salary && <p className={style.errors}>{errors.salary.message}</p>}

                            
                            <InputLabel>Experiencia requerida</InputLabel>
                            <TextField
                                select
                                id='exp_req'
                                fullWidth
                                name="exp_req"
                                defaultValue="1"
                                {...register("exp_req")}
                            >
                                <MenuItem value="1">Semi-senior</MenuItem>
                            </TextField>

                            <InputLabel>Lapso</InputLabel>
                            <TextField
                                placeholder='Lapso'
                                id='lapse'
                                type="text" fullWidth
                                {...register("lapse", {
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
                            {errors.lapse && <p className={style.errors}>{errors.lapse.message}</p>}

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


                <Button variant="contained" color="pear" type="submit" sx={{ margin: 2}}>
                    <Typography fontFamily="Nunito Sans" fontWeight="bold" color='persianBlue.main'>Crear</Typography>
                </Button>
            </form>

        </Container>
    )
}

export default CreateProject