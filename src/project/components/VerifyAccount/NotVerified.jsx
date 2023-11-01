import { Typography, Box } from "@mui/material";

export const NotVerified = () => {
  return (
    <Box sx={{ textAlign: "center", margin: "10% auto 28% ", backgroundColor: "white", width: "75%", padding: "5% 0 5% 0", borderRadius: "4px", boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);" }}>
      <Typography variant='h4' fontFamily='Nunito Sans' component='span'>
        Debe verificar su email para poder continuar con sus datos personales
      </Typography>
    </Box>
  );
};
