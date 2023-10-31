import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Grid, Typography, Button, Container, Stack, TextField, InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import style from "./generalStyles.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useDbTableStore } from "../../../hooks/useDbTableStore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

export const CompanyComponent = () => {
  const { startUploadingFiles, startUpdateCompany, startCreateCompany, user } = useAuthStore();
  const [imagen, setImagen] = useState();

  // console.log("inicio:", user);

  const { nationality, language } = useDbTableStore();
  const { getExp_req, getNationality } = useDbTableStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

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

  const onClick = async () => {
    const cloudResp = await startUploadingFiles(imagen);
    setImagen(cloudResp);
  };

  const onSubmit = handleSubmit(({ telefono, ...rest }) => {
    // console.log("DataCompany", rest);
    const parsedTelefono = parseInt(telefono, 10);
  
    if (user.id && user.company_id) {
      startUpdateCompany({ ...rest, telefono: parsedTelefono, userId: user.id, imagen: imagen });
    } else {
      startCreateCompany({ ...rest, telefono: parsedTelefono, userId: user.id, imagen: imagen });
      startCreateCompany({ ...rest, telefono: parsedTelefono, userId: user.id, imagen: imagen });
    }
    // reset();
  });
  const isFormEmpty = Object.keys(errors).length >= 1;

  if (imagen) {
    console.log("imagen", imagen);
  }
  if(user.image && !imagen){
    setImagen(user.image)
  }

  let idNacionality = nationality?.filter((item) => item.nationality == user.id_nationality);
  let idLenguages = language?.filter((item) => item.language == user.languages);
  // console.log("mis lenguages:", idLenguages[0].id);

  useEffect(() => {
    getNationality();
    getExp_req();
  }, []);

  return (
    <Container

    >
      <Typography variant='h4' sx={{ mb: 5, mt: 5 }} fontWeight='semi bold' color='pear.main'>
        Mi cuenta
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <Typography variant='h6' fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Completa los datos de la empresa
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className={style.divExperiencia}>
              <InputLabel sx={{ml:3}}>Nombre de la empresa</InputLabel>
              <TextField
                placeholder='Nombre de la empresa'
                id='businessName'
                type='text'
                sx={{width:'90%', ml:3}}
                {...register("businessName", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^(?!\s).*/,
                    message: "Este campo es requerido",
                  },
                })}
                defaultValue={user.businessName || ""}
              />
              {errors.businessName && <p className={style.errors}>{errors.businessName.message}</p>}

              <InputLabel sx={{ml:3}}>Industria</InputLabel>
              <TextField
                placeholder='Industria'
                id='activityType'
                type='text'
                sx={{width:'90%', ml:3}}
                {...register("activityType", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^(?!\s).*/,
                    message: "Este campo es requerido",
                  },
                })}
                defaultValue={user.activityType || ""}
              />
              {errors.activityType && <p className={style.errors}>{errors.activityType.message}</p>}

              <InputLabel sx={{ml:3}}>Fecha de inicio</InputLabel>
              <TextField placeholder='Fecha de inicio'
                id='startDate' sx={{width:'90%', ml:3}}
                type='text'
                {...register("startDate", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },

                })}
                defaultValue={user.startDate || ""}
              />
              {errors.startDate && <p className={style.errors}>{errors.startDate.message}</p>}

              <InputLabel sx={{ml:3}}>Dirección Fiscal</InputLabel>
              <TextField
                placeholder='fiscalAddress'
                id='fiscalAddress'
                type='text'
                sx={{width:'90%', ml:3}}
                {...register("fiscalAddress", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^(?!\s).*/,
                    message: "Este campo es requerido",
                  },
                })}
                defaultValue={user.fiscalAddress || ""}
              />
              {errors.fiscalAddress && <p className={style.errors}>{errors.fiscalAddress.message}</p>}

              <InputLabel sx={{ml:3}}>Representante Legal</InputLabel>
              <TextField
                placeholder='Representante Legal'
                id='legalRepresentative'
                type='text'
                sx={{width:'90%', ml:3}}
                {...register("legalRepresentative", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                    message: "El nombre no es válido",
                  },
                })}
                defaultValue={user.legalRepresentative || ""}
              />

              {errors.legalRepresentative && <p className={style.errors}>{errors.legalRepresentative.message}</p>}

              <InputLabel sx={{ml:3}}>Cuenta de banco</InputLabel>
              <TextField
                placeholder='Cuenta de banco'
                id='bankAccount'
                type='text'
                sx={{width:'90%', ml:3}}
                {...register("bankAccount", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^\S{8}$/,
                    message: "Debe contener 8 carácteres"
                  }
                })}
                defaultValue={user.bankAccount || ""}
              />
              {errors.bankAccount && <p className={style.errors}>{errors.bankAccount.message}</p>}

              <InputLabel sx={{ml:3}}>Nacionalidad</InputLabel>
              <FormControl sx={{width:'90%', ml:3}}>
                <Select
                  {...register("nationalityId", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.id_nationality}
                  defaultValue={idNacionality?.[0]?.id || ''}
                >
                  {nationality.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nationality}
                    </MenuItem>
                  ))}
                </Select>
                {errors.nationalityId && <p className={style.errors}>{errors.nationalityId.message}</p>}
              </FormControl>

              <InputLabel sx={{ml:3}}>Idiomas</InputLabel>
              <FormControl sx={{width:'90%', ml:3}}>
                <Select
                  {...register("languages.0", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.languages?.[0]}
                  defaultValue={idLenguages?.[0]?.id || ''}
                >
                  {language.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.language}
                    </MenuItem>
                  ))}
                </Select>
                {errors.languages?.[0] && <p className={style.errors}>{errors.languages?.[0].message}</p>}
              </FormControl>

              <InputLabel sx={{ml:3}}>RUC</InputLabel>
              <TextField
                placeholder='RUC'
                id='ruc'
                type='number'
                sx={{width:'90%', ml:3}}
                {...register("ruc", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^\S{11}$/,
                    message: "Debe contener 11 carácteres"
                  }
                })}
                defaultValue={user.ruc || ""}
              />
              {errors.ruc && <p className={style.errors}>{errors.ruc.message}</p>}
              </div>
            </Grid>

            <Grid item xs={1.6}></Grid>

            <Grid item xs={4}>
              <div className={style.divExperiencia}>
                <Typography variant="h6" fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom sx={{ mb: 2.5 }}>
                  Datos de contacto
                </Typography>
                <InputLabel sx={{ml:3}}>Nombre</InputLabel>
                <TextField
                  placeholder='Nombre'
                  type='text'
                  sx={{width:'90%', ml:3}}
                  {...register("data.nombre", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^(?!\s)[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+/,

                      message: "El nombre no es válido",
                    },
                  })}
                  defaultValue={user.contactData ? user.contactData.nombre : ""}
                />
                {errors.data?.nombre && (<p className={style.errors}>{errors.data?.nombre.message}</p>)}

                <InputLabel sx={{ml:3}}>Teléfono</InputLabel>
                <TextField
                  placeholder='Teléfono'
                  id='telefono'
                  type='number' //! Tipo Number
                  sx={{width:'90%', ml:3}}
                  {...register("data.telefono", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: "Ingresa solo números",
                    },
                  })}
                  defaultValue={user.contactData ? user.contactData.telefono : ""}
                />
                {errors.data?.telefono && (<p className={style.errors}>{errors.data?.telefono.message}</p>)}

                <InputLabel sx={{ml:3}}>Email</InputLabel>
                <TextField
                  placeholder='Email'
                  id='email'
                  type='email'
                  sx={{width:'90%', ml:3}}
                  {...register("data.email", {
                    required: {
                      value: true,
                      message: "Es un campo obligatorio",
                    },
                    pattern: {
                      value: /^[\w\.-]+@[\w\.-]+\.\w+$/,
                      message: "Email no válido",
                    },
                  })}
                  defaultValue={user.contactData ? user.contactData.email : ""}
                />
                {errors.data?.email && (<p className={style.errors}>{errors.data?.email.message}</p>)}

                <InputLabel sx={{ml:3}}>Horario</InputLabel>
                <TextField placeholder='Horario'
                  id='horario' type='text'
                  sx={{width:'90%', ml:3}} {...register("data.horario", {
                    required: {
                      value: true,
                      message: "Es un campo obligatorio",
                    },
                  })}
                  defaultValue={user.contactData ? user.contactData.horario : "9-6pm"}
                />
                {errors.data?.horario && (<p className={style.errors}>{errors.data?.horario.message}</p>)}

                <InputLabel sx={{ml:3}}>Contacto</InputLabel>
                <TextField
                  placeholder='Contacto'
                  id='contacto'
                  type='text'
                  sx={{width:'90%', ml:3}}
                  {...register("data.contacto", {
                    required: {
                      value: true,
                      message: "Es un campo obligatorio",
                    },
                  })}
                  defaultValue={user.contactData ? user.contactData.contacto : ""}
                />
                {errors.data?.contacto && (<p className={style.errors}>{errors.data?.contacto.message}</p>)}
              </div>
              <InputLabel sx={{ mt: 4 }}>Imagen</InputLabel>
              <Button component='label' variant='contained' color='pear' endIcon={<CloudUploadIcon />}>
                <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
                  Eliga una imagen
                </Typography>

                <VisuallyHiddenInput type='file' onChange={(e) => setImagen(e.target.files[0])} placeholder='Imagen' id='image' />

              </Button>
              <Button variant='contained' color='pear' type='button' sx={{ margin: 2 }} onClick={onClick}>
                <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
                  Subir
                </Typography>
              </Button>
               <div className={style.divImg}>
                  {imagen && <img src={imagen} alt="perfil" className={style.imgPerfil} />}
                </div>
            </Grid>
          </Grid>
        </Stack>

        <Button variant='contained' color='pear' type='submit' sx={{ margin: 2 }} disabled={isFormEmpty || !imagen}>
          <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Guardar cambios
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default CompanyComponent;
