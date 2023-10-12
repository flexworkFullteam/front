import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Footer } from "../components/Footer/Footer";
import { SearchBar } from "../components/Searchbar/Searchbar";
import styles from "./HomePage.module.css";
import recurso3 from "../../assets/Recurso3.png";

export const HomePage = () => {
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
            <Typography fontFamily="Nunito Sans" fontWeight="400" variant="h4">
              Empeza ya!
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
            <Typography fontFamily="Nunito Sans" fontWeight="400" variant="h4">
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
              Create una cuenta y encontrá el trabajo que buscás
            </Typography>
            <Typography
              fontFamily="Nunito Sans"
              fontWeight="400"
              variant="body"
            >
              <ul>
                <li>
                  Ingresá en la opción Crear cuenta, escribí tus datos y
                  confirmalos.
                </li>
                <li>
                  Completá la información principal de tu perfil a través de las
                  preguntas por pasos que te haremos Inmediatamente después de
                  que te registres.
                </li>
                <li>
                  Postulate a los trabajos que más te interesen y seguí el
                  proceso de tus postulaciones.
                </li>
                <li>
                  Recordá mantener tu información actualizada desde la sección
                  de tu perfil.
                </li>
              </ul>
            </Typography>
            <Button
              variant="contained"
              color="verdigris"
              className={styles.ingresarButton}
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
      <Footer />
    </>
  );
};
