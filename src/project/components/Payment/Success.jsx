import { Box, Button, Container, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"


export const Success = () => {

  const { id } = useParams();
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
        boxShadow: "0px 0px 12px 4px rgba(0,209,0,0.75)",
        width: "40%",
      }}
    >
      <Box sx={{ pl: 4 }}>
        <Typography variant="h4">¡Tu pago fue recibido!</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>Ahora podemos comenzar el trabajo</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Le enviaremos al trabajador tu informacion para ponerlos en contacto.</Typography>
        <Button variant='contained' color='pear' type='submit' sx={{ width: "30%", mt: 4 }} onClick={goHome}>
          <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Volver al sitio
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}