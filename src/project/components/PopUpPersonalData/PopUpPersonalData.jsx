import { Box, Typography } from "@mui/material";

export const PopUpPersonalData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "25%",
        width: "75%",
        padding: "2% 0 1% 0",
        backgroundColor: "white",
        margin: "5% auto",
        borderRadius: "4px",
      }}
      aria-hidden='true'
    >
      <Typography fontFamily='Nunito sans' fontWeight='600' variant='h3' sx={{ mb: 4 }} fontSize={["1.5rem"]}>
        Completa tus datos personales para continuar.
      </Typography>
    </Box>
  );
};
