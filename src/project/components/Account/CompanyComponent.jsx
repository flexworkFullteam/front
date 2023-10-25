import { useForm } from "react-hook-form";
import { Grid, Typography, Button, Container, Stack, TextField, InputLabel, MenuItem, Select } from "@mui/material";
import style from "./generalStyles.module.css";
import { useAuthStore } from '../../../hooks/useAuthStore';


export const CompanyComponent = () => {

  const {startUploadingFiles, startCreateCompany, user } = useAuthStore();

  const [image, setImage] = React.useState();
  
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues:{
      userId: user?.id
    }
  });
  
  const onClick = async() => {
    const cloudResp = await startUploadingFiles(image);
    setImage(cloudResp);
  }

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    startCreateCompany({...data, image: image});
    // reset();
  });

  if(image){console.log('image', image)}

  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        mb: "2%",
        boxShadow: "5px 5px 10px #000",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 5, mt: 5 }}
        fontWeight="semi bold"
        color="pear.main"
      >
        Mi cuenta
      </Typography>

      <form onSubmit={onSubmit}>
        <Stack spacing={3}>

          <Typography
            variant="h6"
            fontFamily="Nunito Sans"
            fontWeight="bold"
            color="persianBlue.main"
          >
            Completa los datos de la empresa
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <InputLabel>Nombre de la empresa</InputLabel>
              <TextField
                placeholder="Nombre de la empresa"
                id="businessName"
                type="text"
                fullWidth
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
              />
              {errors.businessName && (<p className={style.errors}>{errors.businessName.message}</p>)}

              <InputLabel>Industria</InputLabel>
              <TextField
                select
                id="activityType"
                fullWidth
                name="activityType"
                defaultValue="1"
                {...register("activityType")}
              >
                <MenuItem value="1"> Servicios</MenuItem>
              </TextField>

              <InputLabel>Fecha de inicio</InputLabel>
              <TextField
                placeholder="Fecha de inicio"
                id="startDate"
                fullWidth
                type='date'
                {...register("startDate")}
                defaultValue="2023-10-19"
              />

              <InputLabel>Dirección Fiscal</InputLabel>
              <TextField
                placeholder="fiscalAddress"
                id="fiscalAddress"
                type="text"
                fullWidth
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
              />
              {errors.fiscalAddress && (<p className={style.errors}>{errors.fiscalAddress.message}</p>)}

              <InputLabel>Representante Legal</InputLabel>
              <TextField
                placeholder="Representante Legal"
                id="legalRepresentative"
                type="text"
                fullWidth
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
              />

              {errors.legalRepresentative && (
                <p className={style.errors}>{errors.legalRepresentative.message}</p>
              )}

              <InputLabel>Cuenta de banco</InputLabel>
              <TextField
                placeholder="Cuenta de banco"
                id="bankAccount"
                type="text"
                fullWidth
                {...register("bankAccount", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Ingresa solo números",
                  },
                })}
              />
              {errors.bankAccount && (
                <p className={style.errors}>{errors.bankAccount.message}</p>
              )}

              <InputLabel>Nacionalidad</InputLabel>
              <TextField
                select
                id="nationality"
                fullWidth
                name="nationality"
                defaultValue="1"
                {...register("nationality")}
              >
                <MenuItem value="1"> Mexicana</MenuItem>
              </TextField>

              <InputLabel>Idiomas</InputLabel>
              <Select
                fullWidth
                {...register("languages")}
                multiple
                defaultValue={[1]}
              >
                <MenuItem value={1}>Español</MenuItem>
                <MenuItem value={2}>Inglés</MenuItem>
                <MenuItem value={3}>Aleman</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={4}>

              <InputLabel>Nombre</InputLabel>
              <TextField
                placeholder="Nombre"
                type="text"
                fullWidth
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
              />
              {/* {errors.data?.nombre && (<p className={style.errors}>{errors.data?.nombre.message}</p>)} */}

              <InputLabel>Teléfono</InputLabel>
              <TextField
                placeholder="Teléfono"
                id="telefono"
                type="text"
                fullWidth
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
              />
              {/* {errors.data?.telefono && (<p className={style.errors}>{errors.data?.telefono.message}</p>)} */}

              <InputLabel>Email</InputLabel>
              <TextField
                placeholder="Email"
                id="email"
                type="email"
                fullWidth
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
              />
              {/* {errors.data?.email && ( <p className={style.errors}>{errors.data?.email.message}</p>)} */}

              <InputLabel>Horario</InputLabel>
              <TextField
                placeholder="Horario"
                id="horario"
                type="text"
                fullWidth
                {...register("data.horario")}
                defaultValue="9-6pm"
              />

              <InputLabel>Contacto</InputLabel>
              <TextField
                placeholder="Contacto"
                id="contacto"
                type="text"
                fullWidth
                {...register("data.contacto", {
                  required: {
                    value: true,
                    message: "Es un campo obligatorio",
                  }
                })}
              />
              {/* {errors.data?.contacto && (<p className={style.errors}>{errors.data?.contacto.message}</p>)} */}
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
            Guardar cambios
          </Typography>
        </Button>
      </form>
    </Container>
  );
};

export default CompanyComponent;
