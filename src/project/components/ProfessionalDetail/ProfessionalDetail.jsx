import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { getProfessionalById } from "../../../helpers/getProfessionalById";
import styles from "./ProfessionalDetail.module.css";

export const ProfessionalDetail = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState();

  const callProfessional = async () => {
    const data = await getProfessionalById(id);
    setProfessional(data);
  };

  useEffect(() => {
    callProfessional();
  }, []);

  return (
    <Grid
      container
      className={styles.professionalContainer}
      sx={{ width: "75%" }}
    >
      {professional ? (
        <Card className={styles.professionalCard}>
          <div className={styles.cardContainer}>
            <div className={styles.CardLeft}>
              <Typography
                variant="h4"
                sx={{ textTransform: "capitalize", textAlign: "center" }}
                fontFamily="Barlow Condensed"
                fontWeight="600"
              >
                {professional.data.name} {professional.data.lastname}
              </Typography>
              <img
                className={styles.professionalPhoto}
                src={professional.image}
                alt={professional.data.name.concat(
                  " " + professional.data.lastname
                )}
              ></img>
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Experiencia
              </Typography>
              {professional.experience.map((exp, index) => (
                <div key={index}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="600"
                  >
                    Compañia: {exp.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="400"
                    color="textSecondary"
                  >
                    {exp.date_start} - {exp.date_end}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="400"
                    color="textSecondary"
                  >
                    Descripción: {exp.description}
                  </Typography>
                </div>
              ))}
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Educación
              </Typography>
              {professional.education.map((edu, index) => (
                <div key={index}>
                  <Typography
                    variant="body1"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="600"
                  >
                    Título: {edu.degree}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="400"
                    color="textSecondary"
                  >
                    Finalizado en: {edu.year_end}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    fontFamily="Nunito Sans"
                    fontWeight="400"
                    color="textSecondary"
                  >
                    Institución: {edu.institution}
                  </Typography>
                </div>
              ))}
            </div>
            <div>
              <Typography variant="h5" gutterBottom>
                Informacion Adicional:
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
                color="textSecondary"
                sx={{ width: "20vw" }}
              >
                {professional.extra_information}
              </Typography>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <div>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                DNI: {professional.data.dni}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Edad: {professional.data.age}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Portafolio:
                <a href={professional.portfolio}> {professional.portfolio}</a>
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Nacionalidad: {professional.nationality}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Idiomas: {professional.languages.join(", ")}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Habilidades: {professional.itskills.join(", ")}
              </Typography>
            </div>
          </div>
        </Card>
      ) : (
        <p>Cargando Detalle del profesional</p>
      )}
    </Grid>
  );
};
