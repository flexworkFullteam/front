import { Box, Button, Typography } from "@mui/material"
import { CheckRounded as CheckRoundedIcon, CloseRounded as CloseRoundedIcon } from "@mui/icons-material/";


export const PaymentConfirmation = ({onClose, id, title, salary, user }) => {


    const AcceptPayment = async() => {
        await startPayment({
        title: title,
        unit_price: salary,
        currency_id: "PEN",
        from: user.id,
        project: id
        });
    }

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
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                backgroundColor: "aliceblue",
                borderRadius: "1rem",
                padding: "1rem",
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

            <Button onClick={onClose}>
                Cancelar
            </Button>
            <Button onClick={AcceptPayment}>
                Aceptar
            </Button>
        </Box>
    </Box>
  )
}
