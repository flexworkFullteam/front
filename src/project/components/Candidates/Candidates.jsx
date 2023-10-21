import { Card, CardContent, Typography, Box, Pagination } from "@mui/material";
import {
  CheckRounded as CheckRoundedIcon,
  CloseRounded as CloseRoundedIcon,
} from "@mui/icons-material/";
import candidateJSON from "../../../utils/candidates.json";
import styles from "./Candidates.module.css";
import { useState } from "react";

export const Candidates = ({ handleClose }) => {
  const allCandidates = candidateJSON;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const pageCount = Math.ceil(allCandidates.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleCandidates = allCandidates.slice(startIndex, endIndex);

  return (
    <div className={styles.candidatesContainer}>
      <div className={styles.topContainer}>
        <CloseRoundedIcon
          className={styles.closeButton}
          onClick={handleClose}
        />
        <Typography variant="h4" sx={{ mb: "1rem", textAlign: "center" }}>
          Postulantes
        </Typography>
      </div>

      {visibleCandidates.map((candidate) => (
        <Card
          key={candidate.id}
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
                {`${candidate.data.name} ${candidate.data.lastname}`}
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
                {candidate.experience[0].description}
              </Typography>
            </div>

            <div className={styles.cardRight}>
              <CloseRoundedIcon />
              <CheckRoundedIcon />
            </div>
          </CardContent>
        </Card>
      ))}
      <Box mt={0.5} mb={0.5} display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </div>
  );
};
