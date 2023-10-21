import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Pagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useProjectStore } from "../../../hooks/useProjectStore";
import styles from "./Project.module.css";
import { useNavigate } from "react-router-dom";
import { Candidates } from "../Candidates/Candidates";

export const Projects = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { allProjects } = useProjectStore();

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const pageCount = Math.ceil(allProjects.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProjects = allProjects.slice(startIndex, endIndex);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div>
          <Candidates handleClose={handleClose} />
        </div>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
          margin: "1% auto",
        }}
      >
        <Typography variant="h4">Proyectos</Typography>

        <Button
          variant="contained"
          color="persianBlue"
          onClick={() => navigate()}
        >
          <Typography
            fontFamily="Nunito Sans"
            fontWeight="400"
            color="aliceblue"
          >
            Crear proyectos
          </Typography>
        </Button>
      </div>

      {visibleProjects.map((project) => (
        <Card
          key={project.id}
          sx={{ width: "75%", m: "1rem auto", ":hover": { cursor: "pointer" } }}
        >
          {/*onClick */}
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <div
              className={styles.cardLeft}
              onClick={() => navigate(`/detail/${project.id}`)}
            >
              <Typography
                variant="h5"
                component="h2"
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                {project.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ textTransform: "capitalize" }}
              ></Typography>
              <Typography
                variant="body2"
                component="p"
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                {project.description}
              </Typography>
            </div>

            <div className={styles.cardRight}>
              <Button onClick={handleOpen}>Ver postulantes</Button>

              <DeleteIcon />
            </div>
          </CardContent>
        </Card>
      ))}
      <Box mt={3} mb={3} display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </div>
  );
};
