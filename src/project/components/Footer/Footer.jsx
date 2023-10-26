import styles from "./Footer.module.css";
import React from "react";
import { Instagram, LinkedIn, Twitter, Facebook } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.footerContainer}>
          <a href="https://www.facebook.com">
            <div className={styles.iconCircle}>
              <Facebook className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.twitter.com">
            <div className={styles.iconCircle}>
              <Twitter className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.linkedin.com">
            <div className={styles.iconCircle}>
              <LinkedIn className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
          <a href="https://www.instagram.com/flexwork_latam/">
            <div className={styles.iconCircle}>
              <Instagram className={styles.iconButton} color="aliceBlue" />
            </div>
          </a>
        </div>
        <div className={styles.links}>
          <Typography fontFamily="Nunito Sans" fontWeight="400">
            <a href="/terminos">Terminos y Condiciones</a> -
            <a href="/privacidad">Política de Privacidad</a> -
            <a href="/faq">Preguntas Frecuentes</a> -
            <a href="/empleo">Ofertas de Empleo</a>
          </Typography>
        </div>
      </div>
    </footer>
  );
};
