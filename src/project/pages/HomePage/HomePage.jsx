import { Typography, Button } from "@mui/material";
import { SearchBar } from "../../components/Searchbar/Searchbar";
import styles from "./HomePage.module.css";
import recurso3 from "../../../assets/Recurso3.png";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.flexChild}>
            <Typography
              fontFamily="Barlow Condensed"
              fontWeight="600"
              variant="h3"
            >
              EL NUEVO MARKETPLACE PARA BUSCAR PROYECTOS
            </Typography>
            <Typography
              fontFamily="Nunito Sans"
              fontWeight="400"
              variant="h5"
              sx={{ mb: 2.5 }}
            >
              Empieza ya!
            </Typography>
            <SearchBar />
          </div>
          <div className={styles.flexChild}>
            <Typography
              fontFamily="Barlow Condensed"
              fontWeight="600"
              variant="h3"
            >
              ENCUENTRA EL PROYECTO QUE NECESITAS
            </Typography>
            <Typography fontFamily="Nunito Sans" fontWeight="400" variant="h5">
              Conectamos a profesionales y empresas, permitiendo una gestión de
              proyectos más ágil y eficiente
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.hero2}>
        <div className={styles.heroContainer}>
          <div className={styles.flexChild}>
            <Typography
              fontFamily="Barlow Condensed"
              fontWeight="600"
              variant="h4"
            >
              Crea una cuenta y encuentra el trabajo que buscas
            </Typography>
            <Typography
              fontFamily="Nunito Sans"
              fontWeight="400"
              variant="body"
            >
              <ul>
                <li>
                  Ingresa en la opción Crear cuenta, escribe tus datos y
                  confirmalos.
                </li>
                <li>
                  Completa la información principal de tu perfil a través de las
                  preguntas por pasos que te haremos Inmediatamente después de
                  que te registres.
                </li>
                <li>
                  Postulate a los trabajos que más te interesen y sigue el
                  proceso de tus postulaciones.
                </li>
                <li>
                  Recuerda mantener tu información actualizada desde la sección
                  de tu perfil.
                </li>
              </ul>
            </Typography>
            <Button
              variant="contained"
              color="verdigris"
              className={styles.ingresarButton}
              onClick={() => navigate("/registerProf")}
            >
              <Typography
                color="aliceblue"
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                Crear cuenta
              </Typography>
            </Button>
          </div>
          <div className={styles.flexChild}>
            <img src={recurso3} alt="recurso 3" />
          </div>
        </div>
      </div>
    </>
  );
};
