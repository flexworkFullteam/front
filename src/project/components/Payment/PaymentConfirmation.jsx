import { Box, Button, Typography } from "@mui/material"


export const PaymentConfirmation = () => {
  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
        }}
    >
        <Typography>
                Queremos recordarle que al aceptar al profesional, se le cobrará el monto de la comisión por el servicio.
        </Typography>

        <Typography>
                Si acepta, el profesional recibirá un mail el link de calendly para agendar una reunion.
        </Typography>

        <Typography>
                ¿Desea continuar?
        </Typography>

        <Button>
            Cancelar
        </Button>
        <Button>
            Aceptar
        </Button>
    </Box>
  )
}
