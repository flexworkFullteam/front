import { useEffect, useState } from "react";
import { GetAllProfessionals, GetAllProjects } from "../../../helpers/adminGetData";
import { Select, MenuItem, Pagination, Card, CardContent, Grid, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import styles from "./AdminComponent.module.css";

export const AdminComponent = () => {
  const [professionals, setProfessionals] = useState([]);
  const [projects, setProjects] = useState();
  const [selectedOption, setSelectedOption] = useState("professionals");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const callData = async () => {
    try {
      const professionalsData = await GetAllProfessionals();
      const projectsData = await GetAllProjects();
      setProfessionals(professionalsData);
      setProjects(projectsData);
    } catch (error) {}
  };

  const handleDetail = (url) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = url;
  };

  useEffect(() => {
    callData();
  }, []);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Select value={selectedOption} onChange={handleChange} className={styles.select}>
        <MenuItem value='professionals'>Profesionales</MenuItem>
        <MenuItem value='projects'>Proyectos</MenuItem>
      </Select>

      {selectedOption === "professionals" &&
        professionals &&
        professionals.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((professional) => (
          <Card key={professional.id} className={styles.card}>
            <CardContent onClick={() => handleDetail(`/user/detail/${professional.id}`)} sx={{ cursor: "pointer" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant='h5' component='div'>
                    {professional.data.name} {professional.data.lastname}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {professional.extra_information}
                  </Typography>
                </Grid>
                <Grid item xs={4} container justifyContent='flex-end' alignItems='center'>
                  <PlaceIcon sx={{ fontSize: 30, marginRight: 1 }} />
                  <Typography variant='body2' color='text.secondary'>
                    {professional.nationality}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}

      {selectedOption === "projects" &&
        projects &&
        projects.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((project) => (
          <Card key={project.id} className={styles.card}>
            <CardContent onClick={() => handleDetail(`/user/detail/${project.id}`)} sx={{ cursor: "pointer" }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography variant='h5' component='div'>
                    {project.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {project.id_company}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {project.description}
                  </Typography>
                </Grid>
                <Grid item xs={4} container justifyContent='flex-end' alignItems='center'>
                  <PlaceIcon sx={{ fontSize: 30, marginRight: 1 }} />
                  <Typography variant='body2' color='text.secondary'>
                    {project.nation_id}
                    {project.province_id && `, ${project.province_id}`}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      <Pagination className={styles.pagination} count={Math.ceil((selectedOption === "projects" ? projects?.length : professionals?.length) / itemsPerPage)} page={page} onChange={handlePageChange} />
    </div>
  );
};
