import styles from "./Footer.module.css";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.footerContainer}>
          <a href="https://www.facebook.com">
            <div className={styles.iconCircle}>
              <FacebookIcon className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.twitter.com">
            <div className={styles.iconCircle}>
              <TwitterIcon className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.linkedin.com">
            <div className={styles.iconCircle}>
              <LinkedInIcon className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.instagram.com">
            <div className={styles.iconCircle}>
              <InstagramIcon className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
        </div>
        <Typography fontFamily="Nunito Sans" fontWeight="400">
          <div className={styles.links}>
            <a href="/terminos">Terminos y Condiciones</a> -
            <a href="/privacidad">Política de Privacidad</a> -
            <a href="/faq">Preguntas Frecuentes</a> -
            <a href="/empleo">Ofertas de Empleo</a>
          </div>
        </Typography>
      </div>
    </footer>
  );
};
