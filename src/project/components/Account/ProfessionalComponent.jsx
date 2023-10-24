import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {Grid, Typography, Button, Container, Stack, TextField, 
  InputLabel, MenuItem, Checkbox, FormControlLabel, FormControl, Select} from '@mui/material';
import style from "./generalStyles.module.css";
import { useAuthStore } from '../../../hooks/useAuthStore';

const ProfessionalComponent = () => {

  const { user, startCreateProfessional, startUploadingFiles } = useAuthStore();
  // console.log(user.id);

  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClick = () => {
    const resp = startUploadingFiles(image);
    setImage(resp);
  }

  const onSubmit = handleSubmit((data) => {
    // console.log(data); // Aquí puedes manejar los datos del formulario.
    startCreateProfessional({...data, userId: user.id, image: image });
    //  reset(); //! Esto limpia el formulario (opcional).
  });

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 4 }} fontWeight="semi bold" color="persianBlue.main">
        Información Profesional
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <InputLabel>Nombre</InputLabel>
            <TextField
              placeholder="Nombre"
              id="name"
              type="text"
              fullWidth
              {...register('data.name', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.name && <p className={style.errors}>{errors.name.message}</p>}

            <InputLabel>Apellido</InputLabel>
            <TextField
              placeholder="Apellido"
              id="lastname"
              type="text"
              fullWidth
              {...register('data.lastname', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.lastname && <p className={style.errors}>{errors.lastname.message}</p>}

            <InputLabel>Edad</InputLabel>
            <TextField
              placeholder="Edad"
              id="age"
              type="number"
              fullWidth
              {...register('data.age', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.age && <p className={style.errors}>{errors.age.message}</p>}

            <InputLabel>DNI</InputLabel>
            <TextField
              placeholder="DNI"
              id="dni"
              type="number"
              fullWidth
              {...register('data.dni', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.dni && <p className={style.errors}>{errors.dni.message}</p>}

            <InputLabel>Fecha de inicio</InputLabel>
            <TextField
              placeholder="Fecha de inicio"
              id="date_start"
              type="date"
              fullWidth
              {...register('experience.0.date_start', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.experience?.[0]?.date_start && <p className={style.errors}>{errors.experience?.[0]?.date_start.message}</p>}

            <InputLabel>Fecha de fin</InputLabel>
            <TextField
              placeholder="Fecha de fin"
              id="date_end"
              type="date"
              fullWidth
              {...register('experience.0.date_end', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.experience?.[0]?.date_end && <p className={style.errors}>{errors.experience?.[0]?.date_end.message}</p>}

            <InputLabel>Empresa</InputLabel>
            <TextField
              placeholder="Empresa"
              id="company"
              type="text"
              fullWidth
              {...register('experience.0.company', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.experience?.[0]?.company && <p className={style.errors}>{errors.experience?.[0]?.company.message}</p>}

            <InputLabel>Descripción</InputLabel>
            <TextField
              placeholder="Descripción"
              id="description"
              type="text"
              fullWidth
              {...register('experience.0.description', {
                required: 'Este campo es requerido',
              })}
            />
            {errors.experience?.[0]?.description && <p className={style.errors}>{errors.experience?.[0]?.description.message}</p>}

            <InputLabel>Educacion</InputLabel>
            <TextField
              placeholder='Año de Fin'
              id='year_end'
              type="date" fullWidth
              {...register("education.0.year_end", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                pattern: {
                  value: /^(?!\s)[0-9\s]+/,
                  message: 'El año no es válido'
                }
              })}
            />

            <InputLabel>Titulo</InputLabel>
            <TextField
              placeholder='Titulo'
              id='degree'
              type="text" fullWidth
              {...register("education.0.degree", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                pattern: {
                  value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                  message: 'El Degree no es válido'
                }
              })}
            />

            <InputLabel>Institucion</InputLabel>
            <TextField
              placeholder='Institucion'
              id='institution'
              type="text" fullWidth
              {...register("education.0.institution", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                pattern: {
                  value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                  message: 'La institucion no es válido'
                }
              })}
            />

            <InputLabel>Nacionalidad</InputLabel>
            <FormControl fullWidth>
              <Select
                {...register('id_nationality', {
                  required: 'Este campo es requerido',
                })}
                error={errors.id_nationality}
              >
                <MenuItem value={1}>Peru</MenuItem>
                <MenuItem value={2}>Brasil</MenuItem>
                <MenuItem value={3}>Chile</MenuItem> 
              </Select>
              {errors.id_nationality && <p className={style.errors}>{errors.id_nationality.message}</p>}
            </FormControl>

            <InputLabel>Idiomas</InputLabel>
            <FormControl fullWidth>
              <Select
                {...register('languages.0', {
                  required: 'Este campo es requerido',
                })}
                error={errors.languages?.[0]}
              >
                <MenuItem value={1}>Español</MenuItem>
                <MenuItem value={2}>Inglés</MenuItem>
                <MenuItem value={3}>Portugués</MenuItem>
              </Select>
              {errors.languages?.[0] && <p className={style.errors}>{errors.languages?.[0].message}</p>}
            </FormControl>

            <InputLabel>Habilidades de desarrollo</InputLabel>
            <FormControl fullWidth>
              <Select
                {...register('itskills.0', {
                  required: 'Este campo es requerido',
                })}
                error={errors.itskills?.[0]}
              >
                <MenuItem value={1}>React</MenuItem>
                <MenuItem value={2}>Node.js</MenuItem>
                <MenuItem value={3}>Express</MenuItem>
              </Select>
              {errors.itskills?.[0] && <p className={style.errors}>{errors.itskills?.[0].message}</p>}
            </FormControl>

            <InputLabel>Información adicional</InputLabel>
            <TextField
              placeholder="Información adicional"
              id="extra_information"
              type="text"
              fullWidth
              {...register('extra_information')}
            />

            <InputLabel>Portfolio</InputLabel>
            <TextField
              placeholder="Portfolio"
              id="portfolio"
              type="text"
              fullWidth
              {...register('portfolio')}
            />

            <InputLabel>CCI</InputLabel>
            <TextField
              placeholder="CCI"
              id="cci"
              type="text"
              fullWidth
              {...register('cci')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={5}>
            <InputLabel>Imagen</InputLabel>
            <TextField
              placeholder="Imagen"
              id="image"
              type="file"
              fullWidth
              onChange={(e) => setImage(e.target.files[0])}
            />
            <Button variant="contained" color="pear" type="button" sx={{ margin: 2 }} onClick={onClick}>
              <Typography fontFamily="Nunito Sans" fontWeight="bold" color="persianBlue.main">
                Subir
              </Typography>
            </Button>
          </Grid>
        </Grid>

          {/* Añade otros campos, como experiencia, educación, idiomas, habilidades, etc. */}
        </Stack>

        <Button variant="contained" color="pear" type="submit" sx={{ margin: 2 }}>
          <Typography fontFamily="Nunito Sans" fontWeight="bold" color="persianBlue.main">
            Enviar
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default ProfessionalComponent;
