import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@mui/material/styles';
// import { Card, CardContent, Button, Typography, Drawer, Divider } from '@material-ui';
// import FilterListIcon from '@material-ui/icons/FilterList';
import { Card, CardContent, Button, Typography, Drawer, Divider } from '@mui/material';

// Estilos con Material UI
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: theme.spacing(3),
//   },
//   filterButton: {
//     alignSelf: 'flex-start',
//   },
//   filterDrawer: {
//     width: 250,
//   },
//   card: {
//     backgroundColor: theme.palette.persianBlue,
//     margin: theme.spacing(1),
//   },
//   footer: {
//     marginTop: 'auto',
//     padding: theme.spacing(3),
//   },
// }));

export const SearchPage = () => {
  const classes = useStyles();
  const { termino } = useParams();
  const allProjects = useSelector((state) => state.allProjects);
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  
  // Renderizado del componente
  return (
    <div className={classes.root}>
      {/* Filtro en móviles */}
      <Button 
        className={classes.filterButton}
        // startIcon={<FilterListIcon />}
        onClick={() => setDrawerOpen(true)}
      >
        Filtros
      </Button>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        classes={{ paper: classes.filterDrawer }}
      >
        {/* Aquí irían los componentes de los filtros */}
      </Drawer>

      {/* Tarjetas de proyectos */}
      {allProjects.map((project) => (
        <Card key={project.id} className={classes.card}>
          <CardContent>
            <Typography variant="h6">{project.nombre}</Typography>
            {/* Otros detalles del proyecto */}
          </CardContent>
        </Card>
      ))}

      <footer className={classes.footer}>
        <a href="#">Términos y Condiciones</a>
        <Divider orientation="vertical" flexItem />
        <a href="#">Política de Privacidad</a>
        {/* Y así sucesivamente para los otros enlaces */}
      </footer>
    </div>
  );
}