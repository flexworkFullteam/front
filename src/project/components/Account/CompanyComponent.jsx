import { useForm } from "react-hook-form";
import {
  Grid,
  Typography,
  Button,
  Container,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import style from "./generalStyles.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useState } from "react";

export const CompanyComponent = () => {

  const { startUploadingFiles,startUpdateCompany, startCreateCompany, user } = useAuthStore();
  const [image, setImage] = useState("https://pbs.twimg.com/media/CsE52kDXYAAGsfy.jpg");

  console.log("inicio:", user);
  console.log("user.languages", user.languages);
  console.log("defaultValue", user.languages?.[0] || "");
  console.log("user.languages", user.id_nationality);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: {
        telefono: 995598899,
      },
    },
  });

  const onClick = async () => {
    const cloudResp = await startUploadingFiles(image);
    setImage(cloudResp);
  };

  const onSubmit = handleSubmit((data) => {
    // console.log("DataCompany", data)
    if (user.id && user.company_id) {
      startUpdateCompany({ ...data, userId: user.company_id, imagen: image });
    } else {
      startCreateCompany({ ...data, userId: user.id, imagen: image });
    }
    // reset();
  });

  if (image) {
    console.log("image", image);
  }

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
                defaultValue={user.businessName || ""}
              />
              {errors.businessName && (
                <p className={style.errors}>{errors.businessName.message}</p>
              )}

              <InputLabel>Industria</InputLabel>
              <TextField
                placeholder="Industria"
                id="activityType"
                type="text"
                fullWidth
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
              {errors.activityType && (
                <p className={style.errors}>{errors.activityType.message}</p>
              )}

              <InputLabel>Fecha de inicio</InputLabel>
              <TextField
                placeholder="Fecha de inicio"
                id="startDate"
                fullWidth
                type="text"
                {...register("startDate")}
                defaultValue={user.startDate || ""}
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
                defaultValue={user.fiscalAddress || ""}
              />
              {errors.fiscalAddress && (
                <p className={style.errors}>{errors.fiscalAddress.message}</p>
              )}

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
                defaultValue={user.legalRepresentative || ""}
              />

              {errors.legalRepresentative && (
                <p className={style.errors}>
                  {errors.legalRepresentative.message}
                </p>
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
                defaultValue={user.bankAccount || ""}
              />
              {errors.bankAccount && (
                <p className={style.errors}>{errors.bankAccount.message}</p>
              )}

              <InputLabel>Nacionalidad</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("nationalityId", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.id_nationality}
                  defaultValue={user.id_nationality || ""}
                >
                  <MenuItem value={"68b5e79b-b57c-49ad-8d75-70be6ce616db"}>
                    Peru
                  </MenuItem>
                  <MenuItem value={2}>Brasil</MenuItem>
                  <MenuItem value={3}>Chile</MenuItem>
                </Select>
                {errors.nationalityId && (
                  <p className={style.errors}>{errors.nationalityId.message}</p>
                )}
              </FormControl>

              <InputLabel>Idiomas</InputLabel>
              <FormControl fullWidth>
                <Select
                  {...register("languages.0", {
                    required: "Este campo es requerido",
                  })}
                  error={errors.languages?.[0]}
                  defaultValue={user.languages?.[0] || ""}
                >
                  <MenuItem value={"395e5136-497e-4f85-8b7d-6715aec3f933"}>
                    Español
                  </MenuItem>
                  <MenuItem value={2}>Inglés</MenuItem>
                  <MenuItem value={3}>Portugués</MenuItem>
                </Select>
                {errors.languages?.[0] && (
                  <p className={style.errors}>
                    {errors.languages?.[0].message}
                  </p>
                )}
              </FormControl>

              <InputLabel>RUC</InputLabel>
              <TextField
                placeholder="RUC"
                id="ruc"
                type="number"
                fullWidth
                {...register("ruc", {
                  required: "Este campo es requerido",
                })}
                defaultValue={user.ruc || ""}
              />
              {errors.ruc && (
                <p className={style.errors}>{errors.ruc.message}</p>
              )}
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
                defaultValue={user.contactData ? user.contactData.nombre : ""}
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
                defaultValue={user.contactData ? user.contactData.telefono : ""}
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
                defaultValue={user.contactData ? user.contactData.email : ""}
              />
              {/* {errors.data?.email && ( <p className={style.errors}>{errors.data?.email.message}</p>)} */}

              <InputLabel>Horario</InputLabel>
              <TextField
                placeholder="Horario"
                id="horario"
                type="text"
                fullWidth
                {...register("data.horario")}
                defaultValue={
                  user.contactData ? user.contactData.horario : "9-6pm"
                }
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
                  },
                })}
                defaultValue={user.contactData ? user.contactData.contacto : ""}
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
