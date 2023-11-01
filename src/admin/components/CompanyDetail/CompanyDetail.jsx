import { useEffect, useState } from "react";
import { Paper, Typography, Pagination, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../../../helpers/getCompanyById";
import { getCompanyProjects } from "../../../helpers/projectsAsync";
import styles from "./CompanyDetail.module.css";

export const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState();
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 6;

  const callCompany = async () => {
    const companyData = await getCompanyById(id);
    const projectsData = await getCompanyProjects(id);

    setCompany(companyData);
    setProjects(projectsData);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDetail = (url) => {
    const base_url = window.location.origin;
    const newTab = window.open("", "_blank");
    newTab.location.href = `${base_url}/${url}`;
  };

  useEffect(() => {
    callCompany();
  }, []);

  return (
    <>
      {company && projects && (
        <Paper className={styles.container}>
          <div className={styles.leftContent}>
            <img className={styles.professionalImage} src={company.image} alt={company.id}></img>
            <Typography variant='h6' sx={{ textTransform: "capitalize", textAlign: "center" }} gutterBottom>
              {company.businessName}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Actividad: {company.activityType}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Fecha de inicio: {company.startDate}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Dirección fiscal: {company.fiscalAddress}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              RUC: {company.ruc}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Representante legal: {company.legalRepresentative}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Email de contacto: {company.contactData.email}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Nombre de contacto: {company.contactData.nombre}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Horario de contacto: {company.contactData.horario}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Teléfono de contacto: {company.contactData.telefono}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Nacionalidad: {company.id_nationality}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
              Cuenta bancaria: {company.bankAccount}
            </Typography>
            <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main' gutterBottom>
              Id: {company.id}
            </Typography>
            <Typography variant='body2' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
              Idiomas: {company.languages && company.languages.join(", ")}
            </Typography>
          </div>
          <div className={styles.rightContent}>
            <Typography variant='h6'>Proyectos</Typography>
            {projects && projects.length > 0 ? (
              <>
                {projects.map((project) => (
                  <Card sx={{ width: "100%", mb: "6px" }} key={project.id}>
                    <CardContent onClick={() => handleDetail(`project/detail/${project.id}`)} sx={{ cursor: "pointer" }}>
                      <Typography variant='subtitle1' fontWeight='600' fontFamily='Nunito Sans' color='persianBlue.main'>
                        {project.title}
                      </Typography>
                      <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
                        {project.id_company} - Estado: {project.finalizado ? "Finalizado" : "En progreso"}
                      </Typography>
                      <Typography variant='body2' fontWeight='400' fontFamily='Nunito Sans' color='persianBlue.main'>
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                <Pagination count={Math.ceil(projects.length / projectsPerPage)} page={page} onChange={handlePageChange} className={styles.pagination} />
              </>
            ) : null}
          </div>
        </Paper>
      )}
    </>
  );
};
