import { Box, CircularProgress } from "@mui/material";

export const LoadingComponent = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "white" }}>
      <CircularProgress color='secondary' sx={{ m: "auto" }} />
    </Box>
  );
};
