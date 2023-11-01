import { useNavigate } from "react-router-dom";
import './Failure.css'
import { Box, Button, Container, Typography } from "@mui/material";

export const Failure = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home")
  }

  return (
    <Container
      sx={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "2.5% 0 2.5% 0",
        mt: "5%",
        mb: "5%",
        boxShadow: "0px 0px 12px 4px rgba(250,3,3,0.75)",
        width: "40%",
      }}
    >
      <Box sx={{ pl: 4 }}>
        <Typography variant="h4">Tu pago fue rechazado</Typography>
        <Typography variant="h5" sx={{mt:2}}>Por favor, revisa tus datos e intentalo de nuevo.</Typography>
        <Button variant='contained' color='pear' type='submit' sx={{ width: "30%", mt:4 }} onClick={goHome}>
          <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Volver al sitio
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}
