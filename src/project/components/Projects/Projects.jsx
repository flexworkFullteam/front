import { Button, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useProjectStore } from "../../../hooks/useProjectStore";

export const Projects = () => {
  const { allProjects } = useProjectStore();

  return (
    <div>
      <Typography variant="h4">Proyectos</Typography>

      <Button>Crear proyectos</Button>

      {allProjects.map((project) => (
        <Card
          key={project.id}
          sx={{ mb: "1rem", ":hover": { cursor: "pointer" } }}
        >
          {/*onClick */}
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <div className={styles.cardLeft}>
              <Typography
                variant="h5"
                component="h2"
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                {project.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{ textTransform: "capitalize" }}
              ></Typography>
              <Typography
                variant="body2"
                component="p"
                fontFamily="Nunito Sans"
                fontWeight="400"
              >
                {project.description}
              </Typography>
            </div>

            <div className={styles.cardRight}>
              <Button>Ver postulantes</Button>

              <DeleteIcon />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
