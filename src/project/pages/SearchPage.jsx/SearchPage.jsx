import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, CardContent, Button, Typography, Drawer, Divider, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, IconButton, useMediaQuery, useTheme, styled, Pagination } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon, Close as CloseIcon } from '@mui/icons-material';

// Resto de tus importaciones y estilos

export const SearchPage = () => {
  const { term } = useParams();
  const { allProjects } = useSelector((state) => state.project);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filters, setFilters] = useState({
    date: '',
    level: '',
    workload: '',
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
    <Box display="flex" flexDirection="row" minHeight="100vh" padding={'3em'}>

<Box style={{ width: '30%', padding: theme.spacing(3) }}>
        {/* Agrega tus selecciones (selects) y otros elementos en este espacio */}
        <Typography variant="h5" component="h2">
          Filtros
        </Typography>
        <Divider />
        <Box mt={2}>
          <FormControl fullWidth>
            <InputLabel id="date-label">Fecha</InputLabel>
            <Select labelId="date-label" id="date" value={filters.date} onChange={(event) => setFilters({ ...filters, date: event.target.value })}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
            </Select>
          </FormControl>
          </ Box>
      </Box>

      <Box style={{ width: '70%' }} padding={theme.spacing(3)}>
        {visibleProjects.map((project) => (
          <Card key={project.id} style={{ marginBottom: '1rem' }}>
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
          <Pagination count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>


    </Box>
  );
};
