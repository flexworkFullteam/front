import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  Card,  CardContent,  Button,  Typography,  FormControl,  InputLabel,  Select, 
  MenuItem,  Box,  IconButton,  useTheme,  Pagination
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";



export const SearchPage = () => {
  const { term } = useParams();
  const { allProjects } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const theme = useTheme();
  const [filters, setFilters] = useState({
    date: "",
    level: "",
    workload: "",
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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
        {
          term && (
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
              <IconButton>
                <CloseIcon />
              </IconButton>
            </div>
          </Box>
        )}

        <Box mt={2}>
          <FormControl fullWidth sx={{ mb: "1.5rem", mt: "1rem" }}>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select
              labelId="date-label"
              id="date"
              value={filters.date}
              onChange={(event) =>
                setFilters({ ...filters, date: event.target.value })
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select
              labelId="date-label"
              id="date"
              value={filters.date}
              onChange={(event) =>
                setFilters({ ...filters, date: event.target.value })
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select
              labelId="date-label"
              id="date"
              value={filters.date}
              onChange={(event) =>
                setFilters({ ...filters, date: event.target.value })
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select
              labelId="date-label"
              id="date"
              value={filters.date}
              onChange={(event) =>
                setFilters({ ...filters, date: event.target.value })
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: "1.5rem" }}>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select
              labelId="date-label"
              id="date"
              value={filters.date}
              onChange={(event) =>
                setFilters({ ...filters, date: event.target.value })
              }
              sx={{ backgroundColor: "lightgray" }}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
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
              onClick={() => setFilters({ date: "", level: "", workload: "" })}
              color="aliceBlue"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "70%" }} padding={theme.spacing(3)}>
        <Typography variant="h6" component="h1" sx={{ mb: "1rem" }}>
          {allProjects.length} ofertas de proyectos para {term}
        </Typography>
        {visibleProjects.map((project) => (
          <Card
            key={project.id}
            sx={{ mb: "1rem", ":hover": {cursor: "pointer"} }}
            onClick={() => navigate(`/detail/${project.id}`)}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                {project.titulo}
              </Typography>
              <Typography color="textSecondary">
                {project.date} - {project.level} - {project.workload}
              </Typography>
              <Typography variant="body2" component="p">
                {project.descripcion}
              </Typography>
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
