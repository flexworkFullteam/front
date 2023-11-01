import { useNavigate } from "react-router-dom";
import "./Pending.css"
import { Box, Button, Container, Typography } from "@mui/material";


export const Pending = () => {
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
        boxShadow: "0px 0px 16px 5px rgba(34,41,34,0.75)",
        width: "45%",
      }}
    >
      <Box sx={{ pl: 3 }}>
        <Typography variant="h4">Tu pago esta pendiente</Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>Tuvimos problemas para procesar tu pago</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>Estamos intentando procesar tu pago, esto puede demorar te enviaremos un mail con el resultado.</Typography>
        <Button variant='contained' color='pear' type='submit' sx={{ width: "30%", mt: 4 }} onClick={goHome}>
          <Typography fontFamily='Nunito Sans' fontWeight='bold' color='persianBlue.main'>
            Volver al sitio
          </Typography>
        </Button>
      </Box>
    </Container>
  )
}
