import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Pagination, Button, Modal } from "@mui/material";
import { CheckRounded as CheckRoundedIcon, CloseRounded as CloseRoundedIcon } from "@mui/icons-material/";
import styles from "./Candidates.module.css";
import { getCandidateByProjectId, acceptCandidate, refuseCandidate } from "../../../helpers/candidatesAsync";
import { startPayment } from "../../../helpers/startPayment";
import { PaymentConfirmation } from "../Payment/PaymentConfirmation";

export const Candidates = ({ handleClose, id, title, salary, user, pagado }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [candidates, setCandidates] = useState();
  const [visibleCandidates, setVisibleCandidates] = useState();
  const [pressedButton, setPressedButton] = useState("postulate");
  const [open, setOpen] = useState(false);
  //const { user } = useAuthStore();

  const onClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, value) => {

    setPage(value);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const pageCount = Math.ceil(candidates?.length / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const callCandidates = async () => {
    const data = await getCandidateByProjectId(id);
    setCandidates(data);
  };

  const setPayment = async () => {
    setOpen(true);
    // await startPayment({
    //   title: title,
    //   unit_price: salary,
    //   currency_id: "PEN",
    //   from: user.id,
    //   project: id
    // });
  }

  const accept = async (candidateId) => {
    await acceptCandidate(id, candidateId);
    // alert(candidateId);
    callCandidates();
  };

  const reject = async (candidateId) => {
    await refuseCandidate(id, candidateId);
    callCandidates();
  };

  const handleViewClick = (view) => {
    setPressedButton(view);
  };

  const handleDetail = (url) => {
    const newTab = window.open("", "_blank");
    newTab.location.href = url;
  };

  useEffect(() => {
    if (candidates) {
      switch (pressedButton) {
        case "accepted":
          setVisibleCandidates(candidates.accepted.slice(startIndex, endIndex));
          break;
        case "rejected":
          setVisibleCandidates(candidates.rejected.slice(startIndex, endIndex));
          break;
        case "postulate":
          setVisibleCandidates(candidates.postulate.slice(startIndex, endIndex));
          break;
        default:
          break;
      }
    }
  }, [pressedButton, candidates, page, perPage]);

  useEffect(() => {
    callCandidates();
  }, []);


  


  return (
    <div className={styles.candidatesContainer}>
      <div className={styles.topContainer}>
        <CloseRoundedIcon className={styles.closeButton} onClick={handleClose} />
        <Typography variant='h4' sx={{ mb: "1rem", textAlign: "center" }}>
          Postulantes
        </Typography>

        <div className={styles.postulateButtons}>
          {setOpen && (
            <Modal open={open} onClose={onClose}>
              <div>
                <PaymentConfirmation onClose={onClose} id={id} title={title} salary={salary} user={user} pagado={pagado}/>
              </div>
            </Modal>
          )}
          <Button
            variant='contained'
            onClick={() => handleViewClick("postulate")}
            sx={{
              backgroundColor: pressedButton === "postulate" ? "persianBlue.main" : "pear.main",
              color: pressedButton === "postulate" ? "aliceblue" : "persianBlue.main",
            }}
            disabled={!pagado}
          >
            <Typography variant='body2' fontFamily='Nunito Sans' fontWeight='400'>
              Postulados
            </Typography>
          </Button>

          <Button
            variant='contained'
            onClick={() => handleViewClick("accepted")}
            sx={{
              backgroundColor: pressedButton === "accepted" ? "persianBlue.main" : "pear.main",
              color: pressedButton === "accepted" ? "aliceblue" : "persianBlue.main",
            }}
            disabled={!pagado}
          >
            <Typography variant='body2' fontFamily='Nunito Sans' fontWeight='400'>
              Aceptados
            </Typography>
          </Button>

          <Button
            variant='contained'
            onClick={() => handleViewClick("rejected")}
            sx={{
              backgroundColor: pressedButton === "rejected" ? "persianBlue.main" : "pear.main",
              color: pressedButton === "rejected" ? "aliceblue" : "persianBlue.main",
            }}
            disabled={!pagado}
          >
            <Typography variant='body2' fontFamily='Nunito Sans' fontWeight='400'>
              Rechazados
            </Typography>
          </Button>
          
          <Button variant='contained' onClick={setPayment} disabled={pagado} >
            <Typography variant='body2' fontFamily='Nunito Sans' fontWeight='400'>
              Realizar Pago
            </Typography>
          </Button>
        </div>
      </div>
      {visibleCandidates && visibleCandidates.length > 0 ? (
        visibleCandidates?.map((candidate) => (
          <Card key={candidate.id} sx={{ mt: "1rem", mb: "1rem", ":hover": { cursor: "pointer" } }}>
            <CardContent sx={{ display: "flex", alignItems: "center", cursor: "default" }}>
              <div className={styles.cardLeft} onClick={() => handleDetail(`/professional/${candidate.id}`)}>
                <Typography variant='h5' component='h2' fontFamily='Nunito Sans' fontWeight='400'>
                  {`${candidate.data.name} ${candidate.data.lastname}`}
                </Typography>
                <Typography color='textSecondary' sx={{ textTransform: "capitalize" }}></Typography>
              </div>
              { pagado ? (
              <div className={styles.cardRight}>
                {
                  pressedButton === "postulate" && (
                    <>
                      <CloseRoundedIcon sx={{ cursor: "pointer" }} onClick={() => reject(candidate.id)} />
                      <CheckRoundedIcon sx={{ cursor: "pointer" }} onClick={() => accept(candidate.id)} />
                    </>
                )}
              </div>
              ) : (
                <div className={styles.cardRight}>
                  <CloseRoundedIcon sx={{ cursor: "pointer" }} onClick={() => alert('Debe realizar el pago')} />
                <CheckRoundedIcon sx={{ cursor: "pointer" }} onClick={() => alert('Debe realizar el pago')} />
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Cargando candidatos...</p>
      )}
      <Box mt={0.5} mb={0.5} display='flex' justifyContent='center'>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </div>
  );
};
