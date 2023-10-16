import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import styles from "./DetailPage.module.css";

export const DetailPage = () => {
  const { id } = useParams();
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { allProjects } = useSelector((state) => state.project); //* Esto no deberia ir realmente

  const filteredProject = allProjects.find((project) => project.id === +id);

  console.log(filteredProject);

  useEffect(() => {
    // dispacth(getProjectById(id)) //! falta crear la accion
  }, []);

  return (
    <Grid container>
      <Grid
        className={styles.infoCompany}
        item
        display="flex"
        justifyContent="space-between"
        sx={{}}
      >
        <Box display="flex" sx={{ ml: "2% ", flexDirection: "row" }}>
          <img
            className={styles.companyLogo}
            src={filteredProject.imagen}
            alt={filteredProject.company.nombre}
          />
          <div className={styles.titleCompanyContainer}>
            <Typography
              fontFamily="Barlow Condensed"
              fontWeight="600"
              color="persianBlue.main"
              fontSize="1.25rem"
            >
              {filteredProject.titulo}
            </Typography>
            <Link>
              <Typography
                fontFamily="Nunito Sans"
                fontWeight="400"
                color="persianBlue.main"
                fontSize="1rem"
                sx={{ textTransform: "lowercase" }}
              >
                {filteredProject.company.nombre}
              </Typography>
            </Link>
          </div>
        </Box>

        <Box
          display="flex"
          sx={{ boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)", mr: "2% " }}
        >
          {status === "authenticated" && (
            <Button variant="contained" color="pear">
              <Typography
                fontFamily="Nunito Sans"
                fontWeight="400"
                color="persianBlue.main"
              >
                Postularme
              </Typography>
            </Button>
          )}
        </Box>
      </Grid>
      <div className={styles.infoContainer}>
        <Card
          sx={{
            mb: "1rem",
            width: "59%",
            ":hover": { cursor: "pointer" },
            minHeight: "51vh",
          }}
        >
          <CardContent display="flex" sx={{ width: "90%", m: "0 auto" }}>
            <Typography
              color="textSecondary"
              fontFamily="Nunito Sans"
              fontWeight="400"
            >
              Duración: {filteredProject.lapso} dias - Área:{" "}
              {filteredProject.tipo_Actividad}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              sx={{ mt: "2%" }}
              fontFamily="Nunito Sans"
              fontWeight="400"
            >
              {filteredProject.descripcion}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{ mb: "1rem", width: "39%", ":hover": { cursor: "pointer" } }}
        >
          <CardContent display="flex" sx={{ width: "90%", m: "0 auto" }}>
            <Typography
              variant="h5"
              component="h2"
              fontFamily="Nunito Sans"
              fontWeight="600"
            >
              {filteredProject.company.nombre}
            </Typography>
            <Typography
              color="textSecondary"
              fontFamily="Nunito Sans"
              fontWeight="400"
            >
              {filteredProject.company.email}
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mt: "2%" }}
              fontFamily="Nunito Sans"
              fontWeight="600"
            >
              Reseñas de la empresa
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
};
