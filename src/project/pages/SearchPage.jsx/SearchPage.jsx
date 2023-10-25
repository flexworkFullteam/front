import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  useTheme,
  Pagination,
} from "@mui/material";
import {
  Close as CloseIcon,
  Place as PlaceIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import styles from "./SearchPage.module.css";
import {
  onOrderProjectsByLapse,
  onOrderProjectsBySalary,
  onDeleteFilters,
  onFilterProjectsByField,
  onFilterProjectsByExp,
  onFilterProjectsByType,
  onFilterProjectsByTerm,
} from "../../../store/project/projectSlice";
import { onSetActiveEvent } from "../../../store/project/projectSlice";
import { useProjectStore } from "../../../hooks/useProjectStore";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { term } = useParams();
  const { projects } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const theme = useTheme();
  const [filters, setFilters] = useState({
    date: "",
    level: "",
    workload: "",
  });

  const { startLoadingProject } = useProjectStore();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDelete = () => {
    dispatch(onDeleteFilters());
    navigate("/search");
  };

  const handleDetail = (project) => {
    dispatch(onSetActiveEvent(project));
    localStorage.setItem("detail", JSON.stringify(project));
    navigate(`/detail/${project.id}`);
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const existingProjects = projects.filter((project) => project.state === true);
  const pageCount = Math.ceil(existingProjects.length / perPage);
  const visibleProjects = existingProjects.slice(startIndex, endIndex);

  useEffect(() => {
    if (!term === false) {
      dispatch(onFilterProjectsByTerm(term));
    }
  }, [term]);

  useEffect(() => {
    startLoadingProject();
  }, []);

  return (
    <Box display="flex" flexDirection="row" padding={"3em"}>
      <Box
        sx={{
          width: "30%",
          padding: theme.spacing(3),
          height: "100vh",
          borderRadius: "5px",
          backgroundColor: "white",
          mt: 3,
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      >
        {term && (
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                color: "#f0f5ff",
                backgroundColor: "blue",
                display: "flex",
                alignItems: "center",
                padding: "0 0 0 2%",
                borderRadius: "4px",
              }}
            >
              <Typography>{term}</Typography>
              <IconButton onClick={handleDelete}>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
        )}

        <Box mt={2}>
          <FormControl fullWidth sx={{ mb: "1.5rem", mt: "1rem" }}>
            <InputLabel id="field-label">Área</InputLabel>
            <Select
              labelId="field-label"
              id="field"
              name="field"
              value={filters.field}
              onChange={(event) =>
                dispatch(onFilterProjectsByField(event.target.value))
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="recursos humanos">Recursos humanos</MenuItem>
              <MenuItem value="contabilidad">Contabilidad</MenuItem>
              <MenuItem value="administracion">Administracion</MenuItem>
              <MenuItem value="it">IT</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="lapse-label">Duracion</InputLabel>
            <Select
              labelId="lapse-label"
              id="lapse"
              value={filters.lapse}
              onChange={(event) =>
                dispatch(onOrderProjectsByLapse(event.target.value))
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value=""> - </MenuItem>
              <MenuItem value="asc">Ascendente</MenuItem>
              <MenuItem value="desc">Descendente</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="exp_req-label">Experiencia</InputLabel>
            <Select
              labelId="exp_req-label"
              id="exp_req"
              value={filters.exp_req}
              onChange={(event) =>
                dispatch(onFilterProjectsByExp(event.target.value))
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="semi-Senior">Semi-Senior</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
              <MenuItem value="tech-lead">Tech-Lead</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="salary-label">Salario</InputLabel>
            <Select
              labelId="salary-label"
              id="salary"
              value={filters.salary}
              onChange={(event) =>
                dispatch(onOrderProjectsBySalary(event.target.value))
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value=""> - </MenuItem>
              <MenuItem value="asc">Ascendente</MenuItem>
              <MenuItem value="desc">Descendente</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="project_type-label">Cargo</InputLabel>
            <Select
              labelId="project_type-label"
              id="project_type"
              value={filters.project_type}
              onChange={(event) =>
                dispatch(onFilterProjectsByType(event.target.value))
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="software engineer">Software engineer</MenuItem>
              <MenuItem value="full-stack developer">
                Full-stack developer
              </MenuItem>
              <MenuItem value="tech manager">Tech manager</MenuItem>
              <MenuItem value="contador">Contador</MenuItem>
              <MenuItem value="vendedor">Vendedor</MenuItem>
              <MenuItem value="gerente">Gerente</MenuItem>
              <MenuItem value="abogado">Abogado</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              backgroundColor: "red",
              marginLeft: "50%",
              transform: "translateX(-50%)",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <DeleteOutlineRoundedIcon
              variant="contained"
              onClick={() => dispatch(onDeleteFilters())}
              color="aliceBlue"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "70%" }} padding={theme.spacing(3)}>
        <Typography variant="h6" component="h1" sx={{ mb: "1rem" }}>
          {projects.length} ofertas de proyectos para {term}
        </Typography>
        {visibleProjects.map((project) => (
          <Card
            key={project.id}
            sx={{ mb: "1rem", ":hover": { cursor: "pointer" } }}
            onClick={() => handleDetail(project)}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <div className={styles.cardLeft}>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30%",
                  }}
                >
                  <BusinessIcon style={{ marginRight: "10px" }} />
                  <Typography
                    variant="body2"
                    component="p"
                    fontFamily="Nunito Sans"
                    fontWeight="600"
                    style={{ textTransform: "capitalize" }}
                  >
                    {project.exp_req}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "30%",
                  }}
                >
                  <PlaceIcon style={{ marginRight: "10px" }} />
                  <Typography
                    variant="body2"
                    component="p"
                    fontFamily="Nunito Sans"
                    fontWeight="600"
                  >
                    {project.location}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};
