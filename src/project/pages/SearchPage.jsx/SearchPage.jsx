import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, Box, IconButton, useTheme, Pagination } from "@mui/material";
import { Close as CloseIcon, Place as PlaceIcon, Business as BusinessIcon } from "@mui/icons-material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import styles from "./SearchPage.module.css";
import { onOrderProjectsByLapse, onOrderProjectsBySalary, onDeleteFilters, onFilterProjectsByField, onFilterProjectsByExp, onFilterProjectsByType, onFilterProjectsByTerm } from "../../../store/project/projectSlice";
import { onSetActiveEvent } from "../../../store/project/projectSlice";
import { useProjectStore } from "../../../hooks/useProjectStore";
import { useDbTableStore } from "../../../hooks/useDbTableStore";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const { term } = useParams();
  const { projects } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const theme = useTheme();
  const [filters, setFilters] = useState({
    field: null,
    lapse: null,
    exp_req: null,
    salary: null,
    project_type: null,
  });

  const { field, type, exp_req, getField, getType, getExp_req } = useDbTableStore();

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

  const handleDeleteFilters = () => {
    dispatch(onDeleteFilters());
    setFilters({
      field: "",
      lapse: "",
      exp_req: "",
      salary: "",
      project_type: "",
    });
  };
  const handleEvent = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      [name]: value,
    });
    //console.log(name, " : ", value);
  };

  const handleDetail = (url) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = url;
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

  return (
    <Box display='flex' flexDirection='row' padding={"3em"}>
      <Box
        sx={{
          position: "sticky",
          top: "2%",
          padding: theme.spacing(3),
          width: "30%",
          height: "62vh",
          borderRadius: "5px",
          backgroundColor: "white",
          mt: 3,
          boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
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
        Filtros
        <Box mt={2}>
          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id='field-label'>Área</InputLabel>
            <Select
              labelId='field-label'
              id='field'
              name='field'
              value={filters.field}
              onChange={(event) => {
                handleEvent(event);
                dispatch(onFilterProjectsByField(event.target.value));
              }}
              sx={{ backgroundColor: "lightgray" }}
            >
              {field?.map((fieldOption) => (

                <MenuItem value={fieldOption.project_fields} key={fieldOption.id}>
                  {fieldOption.project_fields}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id='lapse-label'>Duracion</InputLabel>
            <Select
              labelId='lapse-label'
              id='lapse'
              name='lapse'
              value={filters.lapse}
              onChange={(event) => {
                handleEvent(event);
                dispatch(onOrderProjectsByLapse(event.target.value));
              }}
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value=''> - </MenuItem>
              <MenuItem value='asc'>Ascendente</MenuItem>
              <MenuItem value='desc'>Descendente</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id='exp_req-label'>Experiencia</InputLabel>
            <Select
              labelId='exp_req-label'
              id='exp_req'
              name='exp_req'
              value={filters.exp_req}
              onChange={(event) => {
                handleEvent(event);
                dispatch(onFilterProjectsByExp(event.target.value));
              }}
              sx={{ backgroundColor: "lightgray" }}
            >
              {exp_req?.map((expOption) => (

                <MenuItem value={expOption.experienceLevel} key={expOption.id}>
                  {expOption.experienceLevel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id='salary-label'>Salario</InputLabel>
            <Select
              labelId='salary-label'
              id='salary'
              name='salary'
              value={filters.salary}
              onChange={(event) => {
                handleEvent(event);
                dispatch(onOrderProjectsBySalary(event.target.value));
              }}
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value=''> - </MenuItem>
              <MenuItem value='asc'>Ascendente</MenuItem>
              <MenuItem value='desc'>Descendente</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id='project_type-label'>Cargo</InputLabel>
            <Select
              labelId='project_type-label'
              id='project_type'
              name='project_type'
              value={filters.project_type}
              onChange={(event) => {
                handleEvent(event);
                dispatch(onFilterProjectsByType(event.target.value));
              }}
              sx={{ backgroundColor: "lightgray" }}
            >
              {type?.map((typeOption) => (
                <MenuItem value={typeOption.project_type} key={typeOption.id}>
                  {typeOption.project_type}
                </MenuItem>
              ))}
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
            <DeleteOutlineRoundedIcon variant='contained' onClick={() => handleDeleteFilters()} color='aliceBlue' />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "70%" }} padding={theme.spacing(3)}>
        <Typography variant='h6' component='h1' sx={{ mb: "1rem" }}>
          {existingProjects.length} ofertas de proyectos para {term}
        </Typography>
        {visibleProjects?.map((project) => (
          <Card key={project.id} sx={{ mb: "1rem", ":hover": { cursor: "pointer" } }} onClick={() => handleDetail(`/detail/${project.id}`)}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <div className={styles.cardLeft}>
                <Typography variant='h5' component='h2' fontFamily='Nunito Sans' fontWeight='400'>
                  {project.title}
                </Typography>
                <Typography color='textSecondary' sx={{ textTransform: "capitalize" }}></Typography>
                <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400'>
                  {project.description}
                </Typography>
                <div className={styles.cardFields}>
                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400' fontSize='0.8rem'>
                    Salario: {project.salary}
                  </Typography>

                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400' fontSize='0.8rem'>
                    Lapso: {project.lapse}
                  </Typography>

                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400' fontSize='0.8rem'>
                    Experiencia: {project.exp_req}
                  </Typography>

                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400' fontSize='0.8rem'>
                    Cargo: {project.type}
                  </Typography>

                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='400' fontSize='0.8rem'>
                    Area: {project.field}
                  </Typography>
                </div>
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
                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='600' style={{ textTransform: "capitalize" }}>
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
                  <Typography variant='body2' component='p' fontFamily='Nunito Sans' fontWeight='600'>
                    {project.nation_id}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Box mt={3} display='flex' justifyContent='center'>
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>
    </Box>
  );
};
