import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography, Modal, Pagination, Box, Checkbox, FormControlLabel} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { Candidates } from "../Candidates/Candidates";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useProjectStore } from "../../../hooks/useProjectStore";
import { CreateProject } from "../CreateProject/CreateProject";
import { getCompanyProjects } from "../../../helpers/projectsAsync";
import styles from "./Project.module.css";
import { finishProject } from "../../../helpers/finishProject";


export const Projects = () => {
  const { deleteProject } = useProjectStore();
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [id, setId] = useState(1);
  const [companyProjects, setCompanyProjects] = useState();
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState(0);
  const [pagado, setPagado] = useState(false); 
  const [checkedFinalizado, setCheckedFinalizado] = useState(false);
  const [checkedNoFinalizado, setCheckedNoFinalizado] = useState(false);

  const { user } = useAuthStore();

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
  
    if (name === 'finalizado') {
      setCheckedFinalizado(checked);
    } else if (name === 'noFinalizado') {
      setCheckedNoFinalizado(checked);
    }
  
    filterProjects();
  };
  
  const filterProjects = () => {
    let filteredProjects = companyProjects;
  
    if (checkedFinalizado) {
      filteredProjects = filteredProjects.filter(project => project.finalizado === true);
    }
  
    if (checkedNoFinalizado) {
      filteredProjects = filteredProjects.filter(project => project.finalizado === false);
    }
  
    setCompanyProjects(filteredProjects);
  };

  const handleOpen = (id, title, salary, pagado) => {
    setId(id);
    setTitle(title);
    setSalary(salary);
    setPagado(pagado);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCreateOpen(false);
    callProjects();
  };

  const handleFinishProject = async(id) => {
    await finishProject(id);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    callProjects();
  };

  const handleDetail = (url) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = url;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const pageCount = Math.ceil(companyProjects?.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProjects = companyProjects?.slice(startIndex, endIndex);

  const callProjects = async () => {
    const data = await getCompanyProjects(user.company_id);
    setCompanyProjects(data);
  };
  useEffect(() => {
    if (user && user.company_id) {
      callProjects();
    }
  }, [user]);

  return (
    <div>
      {setOpen && (
        <Modal open={open} onClose={handleClose}>
          <div>
            <Candidates handleClose={handleClose} id={id} title={title} salary={salary} user={user} pagado={pagado} />
          </div>
        </Modal>
      )}

      {setOpen && (
        <Modal open={createOpen} onClose={() => setCreateOpen(false)}>
          <div>
            <CreateProject handleClose={handleClose} callProjects={callProjects} />
          </div>
        </Modal>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          margin: "1% auto",
        }}
      >
        <Typography variant='h4'>Proyectos</Typography>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedFinalizado}
              onChange={handleCheckboxChange}
              name="finalizado"
              color="primary"
            />
          }
          label="Finalizado"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedNoFinalizado}
              onChange={handleCheckboxChange}
              name="noFinalizado"
              color="primary"
            />
          }
          label="No Finalizado"
        />
      </div>


        <Button variant='contained' color='persianBlue' onClick={() => setCreateOpen(true)} disabled={!user.typevalid}>
          <Typography fontFamily='Nunito Sans' fontWeight='400' color='aliceblue'>
            Crear proyectos
          </Typography>
        </Button>
      </div>
      {companyProjects ? (
        visibleProjects.map((project) => (
          <Card
            key={project.id}
            sx={{
              width: "75%",
              m: "1rem auto",
              ":hover": { cursor: "pointer" },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <div className={styles.cardLeft} onClick={() => handleDetail(`/detail/${project.id}`)}>
                <Typography variant='h5' component='h2' fontFamily='Nunito Sans' fontWeight='400'>
                  {project.title}
                </Typography>
                <Typography color='textSecondary' sx={{ textTransform: "capitalize" }}></Typography>
                <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400'>
                  {project.description}
                </Typography>
              </div>

              <div className={styles.cardRight}>
                <Button onClick={() => handleOpen(project.id, project.title, project.salary, project.pagado)}>Ver postulantes</Button>

                {project.state ? <DeleteIcon onClick={() => handleDelete(project.id)} /> : <ReplayRoundedIcon onClick={() => handleDelete(project.id)} />}
                <Button
                  onClick={() => handleFinishProject(project.id)}
                  disabled={!project.pagado}
                >Finalizar Proyecto</Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Cargando candidatos...</p>
      )}
      <Box mt={3} mb={3} display='flex' justifyContent='center'>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </div>
  );
};
