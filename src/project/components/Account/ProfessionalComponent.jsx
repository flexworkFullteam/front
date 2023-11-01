import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Grid, Typography, Button, Container, Stack, TextField, InputLabel, MenuItem, Checkbox, FormControlLabel, FormControl, Select } from "@mui/material";
import style from "./generalStyles.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useDbTableStore } from "../../../hooks/useDbTableStore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { onLogin } from "../../../store/auth/authSlice";

const ProfessionalComponent = () => {
  const { user, startCreateProfessional, startUploadingFiles, startUpdateProfessional } = useAuthStore();
  const [image, setImage] = useState();
  const dispatch = useDispatch();

  const { nationality, language, itSkills } = useDbTableStore();
  const { getExp_req, getNationality, getItSkills } = useDbTableStore();

  console.log("inicio Profesional:", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClick = async () => {
    const cloudResp = await startUploadingFiles(image);
    setImage(cloudResp);
    console.log(cloudResp);
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Data", data);
    // console.log({...data, userId: user.id, image: image }); // Aquí puedes manejar los datos del formulario.
    if (user.id && (user.userId || user.professional_id)) {
      let id;
      user.userId ? (id = user.id) : (id = user.professional_id);
      startUpdateProfessional({ ...data, user: user.id, image: image }, id);
    } else {
      startCreateProfessional({ ...data, user: user.id, image: image });
      // dispatch(onLogin({ ...user, image: image, valid: true }));
    }
    //  reset(); //! Esto limpia el formulario (opcional).
  });
  const isFormEmpty = Object.keys(errors).length >= 1;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  if (image) {
    console.log("image", image);
  }
  if (user.image && !image) {
    setImage(user.image);
  }

  let idSkills = itSkills?.filter((item) => item.it_skill == user.itskills);
  let idNacionality = nationality?.filter((item) => item.nationality == user.nationality);
  let idLenguages = language?.filter((item) => item.language == user.languages);
  // console.log("mis lenguages:", idLenguages[0]?.id);

  useEffect(() => {
    getNationality();
    getItSkills();
    getExp_req();
  }, []);

  if (user.image && !user.typevalid) {
    return (
      <Container sx={{ mt: 5, ml: 15 }}>
        <Typography variant='h4' sx={{ mb: 4 }} fontWeight='semi bold' color='persianBlue.main'>
          Información Profesional
        </Typography>
        <Typography variant='h6' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom sx={{ mb: 2.5 }}>
          Por favor, espere a que un administrador valide su cuenta.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, ml: 15 }}>
      <Typography variant='h4' sx={{ mb: 4 }} fontWeight='semi bold' color='persianBlue.main'>
        Información Profesional
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className={style.divExperiencia}>
                <Typography variant='h6' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom sx={{ mb: 2.5 }}>
                  Datos generales
                </Typography>
                <InputLabel sx={{ ml: 3 }}>Nombre</InputLabel>
                <TextField
                  placeholder='Nombre'
                  id='name'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("data.name", {
                    pattern: {
                      value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                      message: "Este campo es requerido",
                    },
                  })}
                  defaultValue={user.data ? user.data.name : ""}
                />
                {errors.data?.name && <p className={style.errors}>{errors.data?.name.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Apellido</InputLabel>
                <TextField
                  placeholder='Apellido'
                  id='lastname'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("data.lastname", {
                    pattern: {
                      value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                      message: "Este campo es requerido",
                    },
                  })}
                  defaultValue={user.data ? user.data.lastname : ""}
                />
                {errors.data?.lastname && <p className={style.errors}>{errors.data?.lastname.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Edad</InputLabel>
                <TextField
                  placeholder='Edad'
                  id='age'
                  type='number'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("data.age", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: "Ingresa solo números",
                    },
                  })}
                  defaultValue={user.data ? user.data.age : ""}
                />
                {errors.data?.age && <p className={style.errors}>{errors.data?.age.message}</p>}

                <InputLabel sx={{ ml: 3 }}>DNI</InputLabel>
                <TextField
                  placeholder='DNI'
                  id='dni'
                  type='number'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("data.dni", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^\S{8}$/,
                      message: "Debe contener 8 carácteres",
                    },
                  })}
                  defaultValue={user.data ? user.data.dni : ""}
                />
                {errors.data?.dni && <p className={style.errors}>{errors.data?.dni.message}</p>}

                <InputLabel sx={{ ml: 3 }}>CCI</InputLabel>
                <TextField
                  placeholder='CCI'
                  id='cci'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("cci", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^\S{11}$/,
                      message: "Debe contener 11 carácteres",
                    },
                  })}
                  defaultValue={user.cci || ""}
                />
                {errors.cci && <p className={style.errors}>{errors.cci.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Nacionalidad</InputLabel>
                <FormControl sx={{ width: "90%", ml: 3 }}>
                  <Select
                    {...register("nationality", {
                      required: "Este campo es requerido",
                    })}
                    error={errors.nationality}
                    defaultValue={idNacionality?.[0]?.id || ""}
                  >
                    {nationality.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.nationality}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.nationality && <p className={style.errors}>{errors.nationality.message}</p>}
                </FormControl>

                <InputLabel sx={{ ml: 3 }}>Idiomas</InputLabel>
                <FormControl sx={{ width: "90%", ml: 3 }}>
                  <Select
                    {...register("languages.0", {
                      required: "Este campo es requerido",
                    })}
                    error={errors.languages?.[0]}
                    defaultValue={idLenguages?.[0]?.id || ""}
                  >
                    {language.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.language}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.languages?.[0] && <p className={style.errors}>{errors.languages?.[0].message}</p>}
                </FormControl>

                <InputLabel sx={{ ml: 3 }}>Habilidades de desarrollo</InputLabel>
                <FormControl sx={{ width: "90%", ml: 3 }}>
                  <Select
                    {...register("itskill.0", {
                      required: "Este campo es requerido",
                    })}
                    error={errors.itskill?.[0]}
                    defaultValue={idSkills?.[0]?.id || ""}
                  >
                    {itSkills.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.it_skill}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.itskill?.[0] && <p className={style.errors}>{errors.itskill?.[0].message}</p>}
                </FormControl>

                <InputLabel sx={{ ml: 3 }}>Información adicional</InputLabel>
                <TextField
                  placeholder='Información adicional'
                  id='extra_information'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("extra_information", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  defaultValue={user.extra_information || ""}
                />
                {errors.extra_information && <p className={style.errors}>{errors.extra_information.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Portfolio</InputLabel>
                <TextField
                  placeholder='Portfolio'
                  id='portfolio'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("portfolio", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  defaultValue={user.portfolio || ""}
                />
                {errors.portfolio && <p className={style.errors}>{errors.portfolio.message}</p>}
              </div>
            </Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              <div className={style.divExperiencia}>
                <Typography variant='h6' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom sx={{ mb: 2.5 }}>
                  Educación
                </Typography>
                <InputLabel sx={{ ml: 3 }}>Titulo</InputLabel>
                <TextField
                  placeholder='Titulo'
                  id='degree'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("education.0.degree", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                      message: "El Degree no es válido",
                    },
                  })}
                  defaultValue={user.education?.[0]?.degree || ""}
                />
                {errors.education?.[0]?.degree && <p className={style.errors}> {errors.education?.[0]?.degree.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Institucion</InputLabel>
                <TextField
                  placeholder='Institucion'
                  id='institution'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("education.0.institution", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,
                      message: "La institucion no es válido",
                    },
                  })}
                  defaultValue={user.education?.[0]?.institution || ""}
                />
                {errors.education?.[0]?.institution && <p className={style.errors}> {errors.education?.[0]?.institution.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Año de finalización</InputLabel>
                <TextField
                  placeholder='Año de Fin'
                  id='year_end'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("education.0.year_end", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^(?!\s)[0-9\s]+/,
                      message: "El año no es válido",
                    },
                  })}
                  defaultValue={user.education?.[0]?.year_end || ""}
                />
                {errors.education?.[0]?.year_end && <p className={style.errors}> {errors.education?.[0]?.year_end.message}</p>}
              </div>
              <div className={style.divExperiencia}>
                <Typography variant='h6' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom sx={{ mb: 2.5 }}>
                  Experiencia previa
                </Typography>
                <InputLabel sx={{ ml: 3 }}>Empresa</InputLabel>
                <TextField
                  placeholder='Empresa'
                  id='company'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("experience.0.company", {
                    required: "Este campo es requerido",
                  })}
                  defaultValue={user.experience?.[0]?.company || ""}
                />
                {errors.experience?.[0]?.company && <p className={style.errors}>{errors.experience?.[0]?.company.message}</p>}
                <InputLabel sx={{ ml: 3 }}>Descripción del puesto</InputLabel>
                <TextField
                  placeholder='Descripción'
                  id='description'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("experience.0.description", {
                    required: "Este campo es requerido",
                  })}
                  defaultValue={user.experience?.[0]?.description || ""}
                />
                {errors.experience?.[0]?.description && <p className={style.errors}>{errors.experience?.[0]?.description.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Fecha de inicio</InputLabel>
                <TextField
                  placeholder='Fecha de inicio'
                  id='date_start'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("experience.0.date_start", {
                    required: "Este campo es requerido",
                  })}
                  defaultValue={user.experience?.[0]?.date_start || ""}
                />
                {errors.experience?.[0]?.date_start && <p className={style.errors}>{errors.experience?.[0]?.date_start.message}</p>}

                <InputLabel sx={{ ml: 3 }}>Fecha de fin</InputLabel>
                <TextField
                  placeholder='Fecha de fin'
                  id='date_end'
                  type='text'
                  sx={{ width: "90%", ml: 3 }}
                  {...register("experience.0.date_end", {
                    required: "Este campo es requerido",
                  })}
                  defaultValue={user.experience?.[0]?.date_end || ""}
                />
                {errors.experience?.[0]?.date_end && <p className={style.errors}>{errors.experience?.[0]?.date_end.message}</p>}
              </div>

              <InputLabel sx={{ mt: 5 }}>Imagen</InputLabel>

              <Button component='label' variant='contained' color='pear' endIcon={<CloudUploadIcon />}>
                <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
                  Eliga una imagen
                </Typography>
                <VisuallyHiddenInput type='file' onChange={(e) => setImage(e.target.files[0])} placeholder='Imagen' id='image' />
              </Button>
              <Button variant='contained' color='pear' type='button' sx={{ margin: 2 }} onClick={onClick}>
                <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
                  Subir
                </Typography>
              </Button>
              <div className={style.divImg}>{image && <img src={image} alt='perfil' className={style.imgPerfil} />}</div>
            </Grid>
          </Grid>

          {/* Añade otros campos, como experiencia, educación, idiomas, habilidades, etc. */}
        </Stack>

        <Button variant='contained' color='pear' type='submit' sx={{ ml: "1.5%", mt: "1%", mb: "4%" }} disabled={isFormEmpty || !image}>
          <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Enviar
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default ProfessionalComponent;
