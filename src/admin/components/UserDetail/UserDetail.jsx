import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProfessionalById } from "../../../helpers/getProfessionalById";
import { getProjectByProfessional } from "../../../helpers/projectsAsync";
import { Card, CardContent, Paper, Typography, Pagination } from "@mui/material/";
import styles from "./UserDetail.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const UserDetail = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState();
  const [projects, setProjects] = useState();
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;
  const { user } = useAuthStore();

  const callProfessional = async () => {
    let userID = id;

    if (!id) {
      userID = user.professional_id;
    }
    const professionalData = await getProfessionalById(userID);
    const projectsData = await getProjectByProfessional(userID);

    setProfessional(professionalData);
    setProjects(projectsData);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDetail = (url) => {
    const add_url = "detail/";
    const base_url = window.location.origin;
    const newTab = window.open("", "_blank");
    if (!id) {
      newTab.location.href = `${base_url}/${add_url}${url}`;
    } else {
      newTab.location.href = `${base_url}/project/${add_url}${url}`;
    }
  };

  useEffect(() => {
    callProfessional();
  }, []);

  return (
    <>
      {professional && projects && (
        <Paper className={styles.container}>
          <div className={styles.leftContent}>
            <img className={styles.professionalImage} src={professional.image} alt={professional.id}></img>
            <Typography variant='h6' sx={{ textTransform: "capitalize", textAlign: "center" }} gutterBottom>
              {professional.data.name} {professional.data.lastname}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              DNI: {professional.data.dni}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Nacionalidad: {professional.nationality}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Edad: {professional.data.age}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Idiomas: {professional.languages && professional.languages.join(", ")}
            </Typography>

            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom>
              Edad: {professional.data.age}
            </Typography>
            <Typography variant='body2' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
              Educación:{" "}
            </Typography>
            {professional.education.map((edu) => (
              <div key={edu.degree}>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>{`Título: ${edu.degree}`}</Typography>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>{`Año de finalización: ${edu.year_end}`}</Typography>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>{`Institución: ${edu.institution}`}</Typography>
              </div>
            ))}
            <Typography variant='body2' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
              Experiencia:{" "}
            </Typography>
            {professional.experience.map((exp) => (
              <div key={exp.company}>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>{`Empresa: ${exp.company}`}</Typography>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>{`${exp.date_start} a ${exp.date_end}`}</Typography>
                <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom>
                  {exp.description}
                </Typography>
              </div>
            ))}
            <Typography variant='body2' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
              Portafolio:
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom>
              <a className={styles.link} href={professional.portfolio}>
                {professional.portfolio}
              </a>
            </Typography>
            <Typography variant='body2' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
              Información adicional:
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              {professional.extra_information}
            </Typography>
          </div>
          <div className={styles.rightContent}>
            <Typography variant='h6'>Postulaciones a proyectos</Typography>
            {projects.projects.map((project) => (
              <Card sx={{ width: "100%", mb: "6px" }} key={project.id}>
                <CardContent onClick={() => handleDetail(project.id)} sx={{ cursor: "pointer" }}>
                  <Typography variant='subtitle1' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
                    {project.title}
                  </Typography>
                  <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
                    {project.company} - Estado: {project.state}
                  </Typography>
                  <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Pagination count={Math.ceil(projects.projects.length / projectsPerPage)} page={page} onChange={handlePageChange} className={styles.pagination} />
          </div>
        </Paper>
      )}
    </>
  );
};

