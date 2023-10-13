import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  Card,  CardContent,  Button,  Typography,  Drawer,  Divider,  Grid,  TextField,  
  FormControl,  InputLabel,  Select,  MenuItem,  Checkbox,  FormControlLabel,Box,  
  IconButton,  useMediaQuery,  useTheme,  styled, Pagination} from '@mui/material';
// import { Pagination } from '@mui/lab';
import { Search as SearchIcon, FilterList as FilterListIcon, Close as CloseIcon } from '@mui/icons-material';

const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: (theme) => theme.spacing(3),
});

const SearchInput = styled(TextField)({
  flexGrow: 1,
  marginRight: (theme) => theme.spacing(2),
});

const FilterButton = styled(IconButton)({
  marginLeft: 'auto',
});

const FilterDrawer = styled(Drawer)({
  width: 300,
  padding: (theme) => theme.spacing(3),
});

const FilterFormControl = styled(FormControl)({
  marginBottom: (theme) => theme.spacing(2),
  minWidth: 200,
});

const FilterCheckbox = styled(Checkbox)({
  padding: 0,
});

const Footer = styled('footer')({
  backgroundColor: (theme) => theme.palette.grey[200],
  padding: (theme) => theme.spacing(3),
  marginTop: 'auto',
});

export const SearchPageMobile = () => {
  const { term } = useParams();
  const {allProjects} = useSelector((state) => state.project);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    level: '',
    workload: '',
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? 'true' : '',
    }));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const filteredProjects = allProjects.filter((project) => {
    let match = true;
    if (filters.date && project.date !== filters.date) {
      match = false;
    }
    if (filters.level && project.level !== filters.level) {
      match = false;
    }
    if (filters.workload && project.workload !== filters.workload) {
      match = false;
    }
    return match;
  });

  const pageCount = Math.ceil(filteredProjects.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" padding={'3em'}>
      <Box flexGrow={1} padding={theme.spacing(3)}>
        <SearchBox>
          <SearchInput
            variant="outlined"
            placeholder="Buscar proyectos"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <FilterButton onClick={() => setFilterOpen(true)}>
            <FilterListIcon />
          </FilterButton>
        </SearchBox>
        <Grid container spacing={3}>
          {visibleProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <Card>
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
            </Grid>
          ))}
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>
      <FilterDrawer anchor="left" open={filterOpen} onClose={() => setFilterOpen(false)}>
        <div>
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          <Divider />
          <FilterFormControl>
            <InputLabel id="date-label">Fecha de publicación</InputLabel>
            <Select labelId="date-label" id="date" name="date" value={filters.date} onChange={handleFilterChange}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="hoy">Hoy</MenuItem>
              <MenuItem value="ayer">Ayer</MenuItem>
              <MenuItem value="esta-semana">Esta semana</MenuItem>
              <MenuItem value="este-mes">Este mes</MenuItem>
            </Select>
          </FilterFormControl>
          <FilterFormControl>
            <InputLabel id="level-label">Nivel laboral</InputLabel>
            <Select labelId="level-label" id="level" name="level" value={filters.level} onChange={handleFilterChange}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
              <MenuItem value="semi-senior">Semi-senior</MenuItem>
              <MenuItem value="senior">Senior</MenuItem>
            </Select>
          </FilterFormControl>
          <FilterFormControl>
            <InputLabel id="workload-label">Carga horaria</InputLabel>
            <Select
              labelId="workload-label"
              id="workload"
              name="workload"
              value={filters.workload}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="full-time">Full-time</MenuItem>
              <MenuItem value="part-time">Part-time</MenuItem>
              <MenuItem value="freelance">Freelance</MenuItem>
            </Select>
          </FilterFormControl>
          <FormControlLabel
            control={
              <FilterCheckbox
                checked={filters.remote === 'true'}
                onChange={handleCheckboxChange}
                name="remote"
              />
            }
            label="Trabajo remoto"
          />
          <FormControlLabel
            control={
              <FilterCheckbox
                checked={filters.benefits === 'true'}
                onChange={handleCheckboxChange}
                name="benefits"
              />
            }
            label="Beneficios"
          />
          <FormControlLabel
            control={
              <FilterCheckbox
                checked={filters.salary === 'true'}
                onChange={handleCheckboxChange}
                name="salary"
              />
            }
            label="Salario"
          />
        </div>
      </FilterDrawer>
      <Footer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Términos y Condiciones
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Política de Privacidad
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Condiciones de contratación
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Preguntas frecuentes
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Noticias
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Ofertas de Empleo
            </Typography>
          </Grid>
        </Grid>
      </Footer>
    </Box>
  );
};