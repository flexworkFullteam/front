import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {Grid, Typography, Button, Container, Stack, TextField, 
  InputLabel, MenuItem, Checkbox, FormControlLabel, FormControl, Select} from '@mui/material';
import style from "./generalStyles.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useDbTableStore } from "../../../hooks/useDbTableStore";

const ProfessionalComponent = () => {

  const { user, startCreateProfessional, startUploadingFiles, startUpdateProfessional } = useAuthStore();
  const [image, setImage] = useState("https://pbs.twimg.com/media/CsE52kDXYAAGsfy.jpg");

  const { nationality, language, itSkills } = useDbTableStore();
  const { getExp_req, getNationality, getItSkills } = useDbTableStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClick = async() => {
    const cloudResp = await startUploadingFiles(image);
    setImage(cloudResp);
  }

  const onSubmit = handleSubmit((data) => {
    console.log("Data", data);
    // console.log({...data, userId: user.id, image: image }); // Aquí puedes manejar los datos del formulario.
    if (user.id && (user.userId || user.professional_id)) {
      let id;
      user.userId ? id= user.id : id = user.professional_id;
      startUpdateProfessional({ ...data, user: user.id, image: image }, id)
    } else {
      startCreateProfessional({ ...data, user: user.id, image: image });
    }
    //  reset(); //! Esto limpia el formulario (opcional).
  });

  if(image){console.log('image', image)}

  useEffect(() => {
    getNationality();
    getItSkills();
    getExp_req();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4 }}
        fontWeight="semi bold"
        color="persianBlue.main"
      >
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
                defaultValue={user.data ? user.data.name : ''}
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
                defaultValue={user.data ? user.data.lastname : ''}
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
                defaultValue={user.data ? user.data.age : ''}
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
                defaultValue={user.data ? user.data.dni : ''}
              />
              {errors.dni && <p className={style.errors}>{errors.dni.message}</p>}

              <InputLabel>Fecha de inicio</InputLabel>
              <TextField
                placeholder="Fecha de inicio"
                id="date_start"
                type="text"
                fullWidth
                {...register('experience.0.date_start', {
                  required: 'Este campo es requerido',
                })}
                defaultValue={user.experience?.[0]?.date_start || ''}
              />
              {errors.experience?.[0]?.date_start && <p className={style.errors}>{errors.experience?.[0]?.date_start.message}</p>}

              <InputLabel>Fecha de fin</InputLabel>
              <TextField
                placeholder="Fecha de fin"
                id="date_end"
                type="text"
                fullWidth
                {...register('experience.0.date_end', {
                  required: 'Este campo es requerido',
                })}
                defaultValue={user.experience?.[0]?.date_end || ''}
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
                defaultValue={user.experience?.[0]?.company || ''}
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
                defaultValue={user.experience?.[0]?.description || ''}
              />
              {errors.experience?.[0]?.description && <p className={style.errors}>{errors.experience?.[0]?.description.message}</p>}

            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={5}>
              <InputLabel>Educacion</InputLabel>
              <TextField
                placeholder='Año de Fin'
                id='year_end'
                type="text" fullWidth
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
                defaultValue={user.education?.[0]?.year_end || ''}
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
                defaultValue={user.education?.[0]?.degree || ''}
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
                defaultValue={user.education?.[0]?.institution || ''}
              />

              <InputLabel>Nacionalidad</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("id_nationality", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.id_nationality}
                >
                  {nationality.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nationality}
                    </MenuItem>
                  ))}
                </Select>
                {errors.id_nationality && (
                  <p className={style.errors}>
                    {errors.id_nationality.message}
                  </p>
                )}
              </FormControl>

              <InputLabel>Idiomas</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("languages.0", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.languages?.[0]}
                >
                  {language.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.language}
                    </MenuItem>
                  ))}
                </Select>
                {errors.languages?.[0] && (
                  <p className={style.errors}>
                    {errors.languages?.[0].message}
                  </p>
                )}
              </FormControl>

              <InputLabel>Habilidades de desarrollo</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("itskills.0", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.itskills?.[0]}
                >
                  {itSkills.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.it_skill}
                    </MenuItem>
                  ))}
                </Select>
                {errors.itskills?.[0] && (
                  <p className={style.errors}>{errors.itskills?.[0].message}</p>
                )}
              </FormControl>

              <InputLabel>Información adicional</InputLabel>
              <TextField
                placeholder="Información adicional"
                id="extra_information"
                type="text"
                fullWidth
                {...register('extra_information')}
                defaultValue={user.extra_information || ''}
              />

              <InputLabel>Portfolio</InputLabel>
              <TextField
                placeholder="Portfolio"
                id="portfolio"
                type="text"
                fullWidth
                {...register('portfolio')}
                defaultValue={user.portfolio || ''}
              />

              <InputLabel>CCI</InputLabel>
              <TextField
                placeholder="CCI"
                id="cci"
                type="text"
                fullWidth
                {...register('cci')}
                defaultValue={user.cci || ''}
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
              <Button
                variant="contained"
                color="pear"
                type="button"
                sx={{ margin: 2 }}
                onClick={onClick}
              >
                <Typography
                  fontFamily="Nunito Sans"
                  fontWeight="bold"
                  color="persianBlue.main"
                >
                  Subir
                </Typography>
              </Button>
            </Grid>
          </Grid>

          {/* Añade otros campos, como experiencia, educación, idiomas, habilidades, etc. */}
        </Stack>

        <Button
          variant="contained"
          color="pear"
          type="submit"
          sx={{ margin: 2 }}
        >
          <Typography
            fontFamily="Nunito Sans"
            fontWeight="bold"
            color="persianBlue.main"
          >
            Enviar
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default ProfessionalComponent;
