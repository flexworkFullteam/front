import { Box, Typography } from "@mui/material"


export const PopUpPersonalData = ({handleClose}) => {
  return (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            p: 2,
            backgroundColor: "white"
        }}
    >
        <Box onClick={handleClose}
            sx={{
                display: "flex",
                width: "100%",
                cursor: "pointer",
                fontSize: "1.5rem",
                color: "black",
                fontWeight: "600",
                ml: 2,
            }}
        >
            X
        </Box>
            
        <Typography
            fontFamily="Barlow Condensed"
            // fontWeight="600"
            variant="h3"
            sx={{ mb: 2.5 }}
            fontSize={["1.5rem"]}
        >
            Por favor, ve a "mi cuenta" y completa tus datos personales para continuar.
        </Typography>
    </Box>
  )
}
