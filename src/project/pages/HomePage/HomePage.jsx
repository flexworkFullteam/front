import { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { SearchBar } from "../../components/Searchbar/Searchbar";
import styles from "./HomePage.module.css";
import recurso3 from "../../../assets/Recurso3.png";
import { useNavigate, Link } from "react-router-dom";
import { useProjectStore } from "../../../hooks/useProjectStore";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useDbTableStore } from "../../../hooks/useDbTableStore";

export const HomePage = () => {
  const navigate = useNavigate();

  const { startLoadingProject } = useProjectStore();
  const { startLoginWithToken, status } = useAuthStore();
  const { getField, getType, getExp_req, getNationality, getLanguage, getItSkills } = useDbTableStore();

  useEffect(() => {
    startLoadingProject();
    startLoginWithToken();
    getField();
    getType();
    getExp_req();
    getNationality();
    getLanguage();
    getItSkills();
  }, []);
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.flexChild}>
            <Typography fontFamily='Barlow Condensed' fontWeight='600' variant='h3'>
              EL NUEVO MARKETPLACE PARA BUSCAR PROYECTOS
            </Typography>
            <Typography fontFamily='Nunito Sans' fontWeight='400' variant='h5' sx={{ mb: 2.5 }}>
              Empieza ya!
              {status === "not-authenticated" && (
                <Button variant='contained' color='pear' className={styles.ingresarButton} onClick={() => navigate("/auth/register")} sx={{ ml: "2%" }}>
                  <Typography color='persianBlue.main' fontFamily='Nunito Sans' fontWeight='400'>
                    Crear cuenta!
                  </Typography>
                </Button>
              )}
            </Typography>
            <SearchBar />
          </div>
        </div>
      </div>
      <div className={styles.hero2}>
        <div className={styles.heroContainer}>
          <div className={styles.flexChild}>
            <Typography fontFamily='Barlow Condensed' fontWeight='600' variant='h4'>
              Crea una cuenta y encuentra el trabajo que buscas
            </Typography>
            <Typography fontFamily='Nunito Sans' fontWeight='400' variant='body'>
              <ul>
                <li>Ingresa en la opción Crear cuenta, escribe tus datos y confirmalos.</li>
                <li>Completa la información principal de tu perfil a través de las preguntas por pasos que te haremos Inmediatamente después de que te registres.</li>
                <li>Postulate a los trabajos que más te interesen y sigue el proceso de tus postulaciones.</li>
                <li>Recuerda mantener tu información actualizada desde la sección de tu perfil.</li>
              </ul>
            </Typography>
          </div>
          <div className={styles.flexChild}>
            <img src={recurso3} alt='recurso 3' />
          </div>
        </div>
      </div>
    </>
  );
};
