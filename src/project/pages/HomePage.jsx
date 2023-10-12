import styles from "./HomePage.module.css";
import Typography from "@mui/material/Typography";

import SearchBar from "../components/Searchbar/Searchbar";

export const HomePage = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.flexChild}>
            <Typography variant="h2">
              El nuevo marketplace para buscar proyectos
            </Typography>
            <Typography variant="h3">Empeza ya!</Typography>
            <SearchBar />
          </div>
          <div className={styles.flexChild}>
            <Typography variant="h2">
              Encuentra el proyecto que necesitas
            </Typography>
            <Typography variant="h3">
              Conectamos a profesionales y empresas, permitiendo una gestión de
              proyectos más ágil y eficiente
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
